this["eejs"] = this["eejs"] || {}; this["eejs"]["hocs"] =
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
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
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
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["BaseControl"], {
            label: label,
            id: id,
            className: className,
            help: help
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
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

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/entity-list-filter-bar.js":
/*!*********************************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/entity-list-filter-bar.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./style.css */ "./assets/src/higher-order-components/filter-bar/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_13__);









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
      return Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(setSearchText) ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["TextControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('search', 'event_espresso'),
        className: "ee-entity-list-filter-bar-search",
        value: searchText,
        onChange: setSearchText
      })) : null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "perPage", function (perPage, setPerPage) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["SelectControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('per page', 'event_espresso'),
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
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("label", {
        className: "screen-reader-text",
        htmlFor: "ee-list-view-btn-".concat(_this.props.instanceId)
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('list view', 'event_espresso')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["IconButton"], {
        id: "ee-list-view-btn-".concat(_this.props.instanceId),
        className: view === 'list' ? 'active-list' : '',
        icon: "editor-justify",
        tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('list view', 'event_espresso'),
        onClick: setListView
      }));
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "gridView", function (view, setGridView) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("label", {
        className: "screen-reader-text",
        htmlFor: "ee-grid-view-btn-".concat(_this.props.instanceId)
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('list view', 'event_espresso')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["IconButton"], {
        id: "ee-grid-view-btn-".concat(_this.props.instanceId),
        className: view === 'grid' ? 'active-list' : '',
        icon: "screenoptions",
        tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('grid view', 'event_espresso'),
        onClick: setGridView
      }));
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EntityListFilterBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          perPage = _this$props.perPage,
          view = _this$props.view,
          _this$props$searchTex = _this$props.searchText,
          searchText = _this$props$searchTex === void 0 ? '' : _this$props$searchTex,
          setSearchText = _this$props.setSearchText,
          setPerPage = _this$props.setPerPage,
          setListView = _this$props.setListView,
          setGridView = _this$props.setGridView;
      var entityFilters = this.props.entityFilters ? this.props.entityFilters : null;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "ee-entity-list-filter-bar-wrapper"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "ee-entity-list-filter-bar"
      }, entityFilters, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "ee-search-filter ee-filter-bar-filter"
      }, this.search(searchText, setSearchText))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "ee-entity-list-view-bar"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "ee-per-page-filter ee-filter-bar-filter"
      }, this.perPage(perPage, setPerPage)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
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

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_11__["withInstanceId"])(EntityListFilterBar));

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
module.exports = {"ee-entity-list-filter-bar-wrapper":"ee-entity-list-filter-bar-wrapper","ee-entity-list-filter-bar":"ee-entity-list-filter-bar","ee-entity-list-view-bar":"ee-entity-list-view-bar","ee-entity-list-filter-bar-perPage-select":"ee-entity-list-filter-bar-perPage-select","ee-filter-bar-filter":"ee-filter-bar-filter","ee-search-filter":"ee-search-filter","ee-per-page-filter":"ee-per-page-filter","ee-grid-view-filter":"ee-grid-view-filter","ee-list-view-filter":"ee-list-view-filter","ee-entity-list-view-options":"ee-entity-list-view-options","components-icon-button":"components-icon-button","active-list":"active-list","components-base-control__label":"components-base-control__label","components-select-control__input":"components-select-control__input","components-text-control__input":"components-text-control__input"};

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/with-entity-list-filter-bar.js":
/*!**************************************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/with-entity-list-filter-bar.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
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
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(_entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_13__["default"], {
          searchText: searchText,
          setSearchText: setSearchText,
          perPage: perPage,
          view: view,
          setPerPage: setPerPage,
          setListView: setListView,
          setGridView: setGridView
        }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["createElement"])(EntityList, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
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

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/with-entity-list-filter-state.js":
/*!****************************************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/with-entity-list-filter-state.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
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
    perPage: parseInt(store.getFilter('entity-list', 'perPage', perPage), 10),
    view: store.getFilter('entity-list', 'view', view)
  };
}), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_9__["withDispatch"])(function (dispatch) {
  var store = dispatch('eventespresso/filter-state');
  return {
    setSearchText: function setSearchText(searchText) {
      return store.setFilter('entity-list', 'searchText', searchText);
    },
    setPerPage: function setPerPage(perPage) {
      return store.setFilter('entity-list', 'perPage', parseInt(perPage, 10));
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
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(WrappedComponent, this.props);
      }
    }]);

    return _class;
  }(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["Component"]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_class, "propTypes", {
    entities: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object).isRequired
  }), _temp;
}]), 'withEntityListFilterState'));

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
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_12__);










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  warning__WEBPACK_IMPORTED_MODULE_11___default()(nextStateResponse && nextStateResponse.hasOwnProperty('convertedValues'), 'The propNameMap callback for the withMoney HOC should return an' + ' object with a "convertedValues" key.');

  if (nextStateResponse && nextStateResponse.hasOwnProperty('convertedValues')) {
    warning__WEBPACK_IMPORTED_MODULE_11___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isArray"])(nextStateResponse.convertedValues), 'The propNameMap callback for the withMoney HOC should return an ' + 'object with a "convertedValues" key that has an array' + ' of numbers as the value.');
  }

  warning__WEBPACK_IMPORTED_MODULE_11___default()(nextStateResponse && nextStateResponse.hasOwnProperty('props'), 'The propNameMap callback for the withMoneyHOC should return an' + ' object with a "props" key.');
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
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(EnhancedComponent, _Component);

      function EnhancedComponent() {
        var _getPrototypeOf2;

        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EnhancedComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(EnhancedComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "state", {
          convertedValues: []
        });

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getNextState", function (props) {
          var nextStateResponse,
              nextState = {},
              convertedValues = [];

          if (Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(propNameMap)) {
            nextStateResponse = propNameMap(props, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_12__["Money"]);
            validateNextState(nextStateResponse);

            if (nextStateResponse && nextStateResponse.props) {
              nextState = _objectSpread({}, nextStateResponse.props);
            }

            convertedValues = nextStateResponse.convertedValues || convertedValues;
          } else if (Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isArray"])(propNameMap)) {
            propNameMap.forEach(function (propName) {
              if (props[propName]) {
                nextState[propName] = new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_12__["Money"](props[propName], _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_12__["SiteCurrency"]);
                convertedValues.push(nextState[propName].toNumber());
              }
            });
          } else {
            warning__WEBPACK_IMPORTED_MODULE_11___default()(false, 'The propNameMap argument provided to withMoney must be either a' + ' function or an array');
          }

          nextState.convertedValues = convertedValues;
          return nextState;
        });

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "shouldUpdateStateWithConvertedValues", function (prevProps, prevState, nextState) {
          return !_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_10___default()(nextState.convertedValues, prevState.convertedValues) && nextState.convertedValues[0] !== prevState.convertedValues[0];
        });

        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EnhancedComponent, [{
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
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, this.state));
        }
      }]);

      return EnhancedComponent;
    }(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["Component"]);

    return EnhancedComponent;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (withMoney);

/***/ }),

/***/ "./assets/src/higher-order-components/pagination/index.js":
/*!****************************************************************!*\
  !*** ./assets/src/higher-order-components/pagination/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jw_react_pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jw-react-pagination */ "./node_modules/jw-react-pagination/lib/JwPagination.js");
/* harmony import */ var jw_react_pagination__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jw_react_pagination__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style.css */ "./assets/src/higher-order-components/pagination/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_9__);






/**
 * External imports
 */





/**
 * Internal dependencies
 */


/**
 * adds pagination to an "EntityList" component
 * and controls what entities are displayed
 *
 * @param {Object} paginationConfig
 * @param {Array} entities
 * @param {number} instanceId
 * @param {number|string} entitiesPerPage
 * @param {string} position
 * @param {Function} onPageChange
 * @param {Object} EntityList
 * @param {Object} otherProps
 * @return {Object} EntityList with added EntityPagination
 */

var EntityPagination = function EntityPagination(_ref) {
  var _ref$paginationConfig = _ref.paginationConfig,
      paginationConfig = _ref$paginationConfig === void 0 ? {} : _ref$paginationConfig,
      entities = _ref.entities,
      instanceId = _ref.instanceId,
      _ref$entitiesPerPage = _ref.entitiesPerPage,
      entitiesPerPage = _ref$entitiesPerPage === void 0 ? 10 : _ref$entitiesPerPage,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'top' : _ref$position,
      _ref$onPageChange = _ref.onPageChange,
      onPageChange = _ref$onPageChange === void 0 ? function () {
    return null;
  } : _ref$onPageChange,
      _ref$EntityList = _ref.EntityList,
      EntityList = _ref$EntityList === void 0 ? function () {
    return null;
  } : _ref$EntityList,
      otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref, ["paginationConfig", "entities", "instanceId", "entitiesPerPage", "position", "onPageChange", "EntityList"]);

  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useState"])(entities),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      pagedEntities = _useState2[0],
      setPagedEntities = _useState2[1];

  var currentEntities = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useRef"])(entities);
  var onPaginationChange = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (updatedPagedEntities) {
    setPagedEntities(updatedPagedEntities);
    onPageChange(updatedPagedEntities);
  }, [onPageChange]);
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    // because jwPagination uses the incoming entities array to determine
    // whether to recalculate the paged entities, we need to force
    // that array to change if entitiesPerPage changes.
    currentEntities.current = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(entities); // forces re-render because useEffect executes after initial
    // render calculation done.

    setPagedEntities([]);
  }, [entitiesPerPage, entities]);
  paginationConfig.labels = paginationConfig.labels && paginationConfig.labels.first && paginationConfig.labels.last && paginationConfig.labels.previous && paginationConfig.labels.next ? paginationConfig.labels : {
    first: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('First', 'event_espresso'),
    last: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Last', 'event_espresso'),
    previous: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Prev', 'event_espresso'),
    next: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Next', 'event_espresso')
  };
  var noResultsText = paginationConfig.noResultsText ? paginationConfig.noResultsText : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('no results found (try changing filters)', 'event_espresso');
  var returnAsProp = paginationConfig.returnAsProp ? paginationConfig.returnAsProp : false;
  var pagination = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function () {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])("div", {
      id: "ee-entity-pagination-".concat(instanceId),
      className: "ee-entity-pagination"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])(jw_react_pagination__WEBPACK_IMPORTED_MODULE_5___default.a, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      items: currentEntities.current,
      onChangePage: onPaginationChange,
      pageSize: parseInt(entitiesPerPage, 10)
    }, paginationConfig)));
  }, [instanceId, onPaginationChange, entities, entitiesPerPage, paginationConfig]);
  var topPagination = position === ('top' || false) ? pagination() : null;
  var bottomPagination = position === ('bottom' || false) ? pagination() : null;
  return returnAsProp ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])(EntityList, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    pagination: pagination(),
    entities: pagedEntities,
    noResultsText: noResultsText
  }, otherProps)) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["Fragment"], null, topPagination, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])(EntityList, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    entities: pagedEntities,
    noResultsText: noResultsText
  }, otherProps)), bottomPagination);
};

EntityPagination.propTypes = {
  paginationConfig: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.shape({
    returnAsProp: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
    noResultsText: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    labels: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.shape({
      first: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
      last: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
      previous: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
      next: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
    })
  }),
  entities: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.array.isRequired,
  instanceId: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number.isRequired,
  entitiesPerPage: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number]),
  position: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
};
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
  return Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__["createHigherOrderComponent"])(Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__["compose"])([_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__["withInstanceId"], function (EntityList) {
    return function (props) {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])(EntityPagination, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        paginationConfig: paginationConfig,
        EntityList: EntityList
      }));
    };
  }]), 'withEntityPagination');
});

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

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

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

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

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

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

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
/*!*****************************************!*\
  !*** external {"this":["eejs","i18n"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["i18n"]; }());

/***/ }),

/***/ "@eventespresso/validators":
/*!***********************************************!*\
  !*** external {"this":["eejs","validators"]} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["validators"]; }());

/***/ }),

/***/ "@eventespresso/value-objects":
/*!*************************************************!*\
  !*** external {"this":["eejs","valueObjects"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["valueObjects"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!*********************************************!*\
  !*** external {"this":["wp","components"]} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/compose":
/*!******************************************!*\
  !*** external {"this":["wp","compose"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["compose"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!***************************************!*\
  !*** external {"this":["wp","data"]} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/is-shallow-equal":
/*!*************************************************!*\
  !*** external {"this":["wp","isShallowEqual"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["isShallowEqual"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9iYXNlLWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9maWx0ZXItYmFyL2VudGl0eS1saXN0LWZpbHRlci1iYXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9maWx0ZXItYmFyL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvZmlsdGVyLWJhci9zdHlsZS5jc3M/MjFmMiIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2ZpbHRlci1iYXIvd2l0aC1lbnRpdHktbGlzdC1maWx0ZXItYmFyLmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvZmlsdGVyLWJhci93aXRoLWVudGl0eS1saXN0LWZpbHRlci1zdGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvbW9uZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9wYWdpbmF0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvcGFnaW5hdGlvbi9zdHlsZS5jc3M/NzBlMyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL3dpdGgtbGF0ZXN0LWNoZWNraW4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL2VlanMuaG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL2p3LXJlYWN0LXBhZ2luYXRpb24vbGliL0p3UGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImkxOG5cIl19Iiwid2VicGFjazovL2VlanMuaG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2YWx1ZU9iamVjdHNcIl19Iiwid2VicGFjazovL2VlanMuaG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImNvbXBvbmVudHNcIl19Iiwid2VicGFjazovL2VlanMuaG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImNvbXBvc2VcIl19Iiwid2VicGFjazovL2VlanMuaG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMuaG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImVsZW1lbnRcIl19Iiwid2VicGFjazovL2VlanMuaG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImlzU2hhbGxvd0VxdWFsXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvY3MvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Il0sIm5hbWVzIjpbImN1c3RvbUlkIiwiY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQiLCJjb21wb3NlIiwid2l0aEluc3RhbmNlSWQiLCJXcmFwcGVkQ29tcG9uZW50IiwicHJvcHMiLCJsYWJlbCIsImluc3RhbmNlSWQiLCJjbGFzc05hbWUiLCJoZWxwIiwiaWQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJkZWZhdWx0UHJvcHMiLCJFbnRpdHlMaXN0RmlsdGVyQmFyIiwic2VhcmNoVGV4dCIsInNldFNlYXJjaFRleHQiLCJpc0Z1bmN0aW9uIiwiX18iLCJwZXJQYWdlIiwic2V0UGVyUGFnZSIsInZhbHVlIiwidmlldyIsInNldExpc3RWaWV3Iiwic2V0R3JpZFZpZXciLCJlbnRpdHlGaWx0ZXJzIiwic2VhcmNoIiwibGlzdFZpZXciLCJncmlkVmlldyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIiwiUGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXIiLCJFbnRpdHlMaXN0IiwicGFnaW5hdGlvbkNvbmZpZyIsIndpdGhFbnRpdHlMaXN0RmlsdGVyQmFyIiwid2l0aEVudGl0eVBhZ2luYXRpb24iLCJQYWdpbmF0ZWRFbnRpdHlMaXN0V2l0aEZpbHRlckJhckFuZFN0YXRlIiwid2l0aEVudGl0eUxpc3RGaWx0ZXJTdGF0ZSIsImVudGl0aWVzIiwiZmlsdGVyIiwiZW50aXR5IiwiZW50aXR5TmFtZSIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsIm90aGVyUHJvcHMiLCJzZWFyY2hFbnRpdGllcyIsIndpdGhTZWxlY3QiLCJzZWxlY3QiLCJvd25Qcm9wcyIsInN0b3JlIiwiZ2V0RmlsdGVyIiwicGFyc2VJbnQiLCJ3aXRoRGlzcGF0Y2giLCJkaXNwYXRjaCIsInNldEZpbHRlciIsImFycmF5T2YiLCJ2YWxpZGF0ZU5leHRTdGF0ZSIsIm5leHRTdGF0ZVJlc3BvbnNlIiwid2FybmluZyIsImhhc093blByb3BlcnR5IiwiaXNBcnJheSIsImNvbnZlcnRlZFZhbHVlcyIsIndpdGhNb25leSIsInByb3BOYW1lTWFwIiwiRW5oYW5jZWRDb21wb25lbnQiLCJuZXh0U3RhdGUiLCJNb25leSIsImZvckVhY2giLCJwcm9wTmFtZSIsIlNpdGVDdXJyZW5jeSIsInB1c2giLCJ0b051bWJlciIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImlzU2hhbGxvd0VxdWFsQXJyYXlzIiwic2V0U3RhdGUiLCJnZXROZXh0U3RhdGUiLCJzaG91bGRVcGRhdGVTdGF0ZVdpdGhDb252ZXJ0ZWRWYWx1ZXMiLCJzdGF0ZSIsIkVudGl0eVBhZ2luYXRpb24iLCJlbnRpdGllc1BlclBhZ2UiLCJwb3NpdGlvbiIsIm9uUGFnZUNoYW5nZSIsInVzZVN0YXRlIiwicGFnZWRFbnRpdGllcyIsInNldFBhZ2VkRW50aXRpZXMiLCJjdXJyZW50RW50aXRpZXMiLCJ1c2VSZWYiLCJvblBhZ2luYXRpb25DaGFuZ2UiLCJ1c2VDYWxsYmFjayIsInVwZGF0ZWRQYWdlZEVudGl0aWVzIiwidXNlRWZmZWN0IiwiY3VycmVudCIsImxhYmVscyIsImZpcnN0IiwibGFzdCIsInByZXZpb3VzIiwibmV4dCIsIm5vUmVzdWx0c1RleHQiLCJyZXR1cm5Bc1Byb3AiLCJwYWdpbmF0aW9uIiwidG9wUGFnaW5hdGlvbiIsImJvdHRvbVBhZ2luYXRpb24iLCJwcm9wVHlwZXMiLCJzaGFwZSIsImJvb2wiLCJhcnJheSIsIndpdGhMYXRlc3RDaGVja2luIiwicmVnaXN0cmF0aW9uIiwiZGF0ZXRpbWVJZCIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwiZ2V0TGF0ZXN0Q2hlY2tpbiIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsImNoZWNrSW5FbnRpdHkiLCJjaGVja2luRW50aXR5IiwiaGFzUmVzb2x2ZWRDaGVja2luIiwidG9nZ2xlQ2hlY2tpbiIsIm9uQ2xpY2siXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7OztBQUdBO0FBS0E7QUFDQTtBQUVBOzs7O0FBR0E7QUFFZTtBQUFBLE1BQUVBLFFBQUYsdUVBQWEsRUFBYjtBQUFBLFNBQXFCQyxxRkFBMEIsQ0FDN0RDLGtFQUFPLENBQUUsQ0FDUkMsaUVBRFEsRUFFUixVQUFFQyxnQkFBRixFQUF3QjtBQUFBOztBQUN2QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGlDQWtCVTtBQUFBLDRCQU1KLEtBQUtDLEtBTkQ7QUFBQSxjQUVQQyxL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFxQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDLDRGQUE0RixTQUFNO0FBQzdJO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlrQkE7QUFDQTtBQUNB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LEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLDJDQUEyQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTFELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSxxQ0FBcUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FwRCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEsK0NBQStDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUQsYUFBYSxpQ0FBaUMsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28taG9jcy44MGI0ZTU5NDFkZWEzMDZiMTQ3NS5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBXb3JkUHJlc3MgSW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRjb21wb3NlLFxuXHRjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCxcblx0d2l0aEluc3RhbmNlSWQsXG59IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvbmVudHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgKCBjdXN0b21JZCA9ICcnICkgPT4gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdGNvbXBvc2UoIFtcblx0XHR3aXRoSW5zdGFuY2VJZCxcblx0XHQoIFdyYXBwZWRDb21wb25lbnQgKSA9PiB7XG5cdFx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdFx0XHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdFx0XHRcdGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHRcdGluc3RhbmNlSWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoIFtcblx0XHRcdFx0XHRcdFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRcdFx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHRcdF0gKSxcblx0XHRcdFx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHRcdFx0aGVscDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuXHRcdFx0XHRcdGxhYmVsOiBXcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcyAmJlxuXHRcdFx0XHRcdFx0V3JhcHBlZENvbXBvbmVudC5kZWZhdWx0UHJvcHMubGFiZWwgP1xuXHRcdFx0XHRcdFx0V3JhcHBlZENvbXBvbmVudC5kZWZhdWx0UHJvcHMubGFiZWwgOlxuXHRcdFx0XHRcdFx0JycsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmVuZGVyKCkge1xuXHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdGxhYmVsLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VJZCxcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSxcblx0XHRcdFx0XHRcdGhlbHAsXG5cdFx0XHRcdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBgaW5zcGVjdG9yLSR7IGN1c3RvbUlkIH0tY29udHJvbC0keyBpbnN0YW5jZUlkIH1gO1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8QmFzZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0bGFiZWw9eyBsYWJlbCB9XG5cdFx0XHRcdFx0XHRcdGlkPXsgaWQgfVxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9eyBjbGFzc05hbWUgfVxuXHRcdFx0XHRcdFx0XHRoZWxwPXsgaGVscCB9XG5cdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdDxXcmFwcGVkQ29tcG9uZW50IHsgLi4udGhpcy5wcm9wcyB9IGxhYmVsPXsgJycgfSBpZD17IGlkIH0gLz5cblx0XHRcdFx0XHRcdDwvQmFzZUNvbnRyb2w+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXHRdICksXG5cdCd3aXRoQmFzZUNvbnRyb2wnXG4pO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IENvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgSWNvbkJ1dHRvbiwgU2VsZWN0Q29udHJvbCwgVGV4dENvbnRyb2wgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgd2l0aEluc3RhbmNlSWQgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbi8qKlxuICogRW50aXR5TGlzdEZpbHRlckJhclxuICogYSBncm91cCBvZiBpbnB1dHMgZm9yIGNvbnRyb2xsaW5nIGhvdyBhIGxpc3Qgb2YgZW50aXRpZXMgaXMgZGlzcGxheWVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUZpbHRlcnMgYWRkaXRpb25hbCBlbnRpdHkgc3BlY2lmaWMgZmlsdGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IHBlclBhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRQZXJQYWdlIGNhbGxiYWNrIGZvciBwZXJQYWdlIGlucHV0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRMaXN0VmlldyBjYWxsYmFjayBmb3IgbGlzdCB2aWV3IGljb24gYnV0dG9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRHcmlkVmlldyBjYWxsYmFjayBmb3IgZ3JpZCB2aWV3IGljb24gYnV0dG9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IEVudGl0eUxpc3RGaWx0ZXJCYXJcbiAqL1xuY2xhc3MgRW50aXR5TGlzdEZpbHRlckJhciBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0ZW50aXR5RmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRwZXJQYWdlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0dmlldzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdHNldFBlclBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdFx0c2V0TGlzdFZpZXc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdFx0c2V0R3JpZFZpZXc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXh0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHNldFNlYXJjaFRleHRcblx0ICogQHJldHVybiB7T2JqZWN0fSByZW5kZXJlZCBzZWFyY2ggaW5wdXRcblx0ICovXG5cdHNlYXJjaCA9ICggc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dCApID0+IHtcblx0XHRyZXR1cm4gaXNGdW5jdGlvbiggc2V0U2VhcmNoVGV4dCApID8gKFxuXHRcdFx0PEZyYWdtZW50PlxuXHRcdFx0XHQ8VGV4dENvbnRyb2xcblx0XHRcdFx0XHRsYWJlbD17IF9fKCAnc2VhcmNoJywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyLXNlYXJjaFwiXG5cdFx0XHRcdFx0dmFsdWU9eyBzZWFyY2hUZXh0IH1cblx0XHRcdFx0XHRvbkNoYW5nZT17IHNldFNlYXJjaFRleHQgfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9GcmFnbWVudD5cblx0XHQpIDogbnVsbDtcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBlclBhZ2Vcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0UGVyUGFnZVxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlcmVkIHBlclBhZ2Ugc2VsZWN0IGlucHV0XG5cdCAqL1xuXHRwZXJQYWdlID0gKCBwZXJQYWdlLCBzZXRQZXJQYWdlICkgPT4gKFxuXHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRsYWJlbD17IF9fKCAncGVyIHBhZ2UnLCAnZXZlbnRfZXNwcmVzc28nICkgfVxuXHRcdFx0Y2xhc3NOYW1lPVwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci1wZXJQYWdlLXNlbGVjdFwiXG5cdFx0XHR2YWx1ZT17IHBlclBhZ2UgfVxuXHRcdFx0b3B0aW9ucz17IFtcblx0XHRcdFx0eyB2YWx1ZTogMiwgbGFiZWw6IDIgfSxcblx0XHRcdFx0eyB2YWx1ZTogNiwgbGFiZWw6IDYgfSxcblx0XHRcdFx0eyB2YWx1ZTogMTIsIGxhYmVsOiAxMiB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyNCwgbGFiZWw6IDI0IH0sXG5cdFx0XHRcdHsgdmFsdWU6IDQ4LCBsYWJlbDogNDggfSxcblx0XHRcdF0gfVxuXHRcdFx0b25DaGFuZ2U9eyBzZXRQZXJQYWdlIH1cblx0XHQvPlxuXHQpO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmlld1xuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRMaXN0Vmlld1xuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlcmVkIGxpc3QgdmlldyBpY29uIGJ1dHRvblxuXHQgKi9cblx0bGlzdFZpZXcgPSAoIHZpZXcsIHNldExpc3RWaWV3ICkgPT4gKFxuXHRcdDxGcmFnbWVudD5cblx0XHRcdDxsYWJlbFxuXHRcdFx0XHRjbGFzc05hbWU9XCJzY3JlZW4tcmVhZGVyLXRleHRcIlxuXHRcdFx0XHRodG1sRm9yPXsgYGVlLWxpc3Qtdmlldy1idG4tJHsgdGhpcy5wcm9wcy5pbnN0YW5jZUlkIH1gIH0+XG5cdFx0XHRcdHsgX18oICdsaXN0IHZpZXcnLCAnZXZlbnRfZXNwcmVzc28nICkgfVxuXHRcdFx0PC9sYWJlbD5cblx0XHRcdDxJY29uQnV0dG9uXG5cdFx0XHRcdGlkPXsgYGVlLWxpc3Qtdmlldy1idG4tJHsgdGhpcy5wcm9wcy5pbnN0YW5jZUlkIH1gIH1cblx0XHRcdFx0Y2xhc3NOYW1lPXsgdmlldyA9PT0gJ2xpc3QnID8gJ2FjdGl2ZS1saXN0JyA6ICcnIH1cblx0XHRcdFx0aWNvbj1cImVkaXRvci1qdXN0aWZ5XCJcblx0XHRcdFx0dG9vbHRpcD17IF9fKCAnbGlzdCB2aWV3JywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdFx0b25DbGljaz17IHNldExpc3RWaWV3IH1cblx0XHRcdC8+XG5cdFx0PC9GcmFnbWVudD5cblx0KTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZpZXdcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0R3JpZFZpZXdcblx0ICogQHJldHVybiB7T2JqZWN0fSByZW5kZXJlZCBncmlkIHZpZXcgaWNvbiBidXR0b25cblx0ICovXG5cdGdyaWRWaWV3ID0gKCB2aWV3LCBzZXRHcmlkVmlldyApID0+IChcblx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHQ8bGFiZWxcblx0XHRcdFx0Y2xhc3NOYW1lPVwic2NyZWVuLXJlYWRlci10ZXh0XCJcblx0XHRcdFx0aHRtbEZvcj17IGBlZS1ncmlkLXZpZXctYnRuLSR7IHRoaXMucHJvcHMuaW5zdGFuY2VJZCB9YCB9PlxuXHRcdFx0XHR7IF9fKCAnbGlzdCB2aWV3JywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdDwvbGFiZWw+XG5cdFx0XHQ8SWNvbkJ1dHRvblxuXHRcdFx0XHRpZD17IGBlZS1ncmlkLXZpZXctYnRuLSR7IHRoaXMucHJvcHMuaW5zdGFuY2VJZCB9YCB9XG5cdFx0XHRcdGNsYXNzTmFtZT17IHZpZXcgPT09ICdncmlkJyA/ICdhY3RpdmUtbGlzdCcgOiAnJyB9XG5cdFx0XHRcdGljb249XCJzY3JlZW5vcHRpb25zXCJcblx0XHRcdFx0dG9vbHRpcD17IF9fKCAnZ3JpZCB2aWV3JywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdFx0b25DbGljaz17IHNldEdyaWRWaWV3IH1cblx0XHRcdC8+XG5cdFx0PC9GcmFnbWVudD5cblx0KTtcblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0cGVyUGFnZSxcblx0XHRcdHZpZXcsXG5cdFx0XHRzZWFyY2hUZXh0ID0gJycsXG5cdFx0XHRzZXRTZWFyY2hUZXh0LFxuXHRcdFx0c2V0UGVyUGFnZSxcblx0XHRcdHNldExpc3RWaWV3LFxuXHRcdFx0c2V0R3JpZFZpZXcsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgZW50aXR5RmlsdGVycyA9IHRoaXMucHJvcHMuZW50aXR5RmlsdGVycyA/XG5cdFx0XHR0aGlzLnByb3BzLmVudGl0eUZpbHRlcnMgOlxuXHRcdFx0bnVsbDtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyLXdyYXBwZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyXCI+XG5cdFx0XHRcdFx0eyBlbnRpdHlGaWx0ZXJzIH1cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVlLXNlYXJjaC1maWx0ZXIgZWUtZmlsdGVyLWJhci1maWx0ZXJcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5zZWFyY2goIHNlYXJjaFRleHQsIHNldFNlYXJjaFRleHQgKSB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVlLWVudGl0eS1saXN0LXZpZXctYmFyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZS1wZXItcGFnZS1maWx0ZXIgZWUtZmlsdGVyLWJhci1maWx0ZXJcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5wZXJQYWdlKCBwZXJQYWdlLCBzZXRQZXJQYWdlICkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWUtdmlldy1maWx0ZXIgZWUtZmlsdGVyLWJhci1maWx0ZXJcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5saXN0Vmlldyggdmlldywgc2V0TGlzdFZpZXcgKSB9XG5cdFx0XHRcdFx0XHR7IHRoaXMuZ3JpZFZpZXcoIHZpZXcsIHNldEdyaWRWaWV3ICkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aEluc3RhbmNlSWQoIEVudGl0eUxpc3RGaWx0ZXJCYXIgKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHdpdGhFbnRpdHlQYWdpbmF0aW9uIH0gZnJvbSAnLi4vcGFnaW5hdGlvbic7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGRlZmF1bHQgYXMgd2l0aEVudGl0eUxpc3RGaWx0ZXJCYXIsXG59IGZyb20gJy4vd2l0aC1lbnRpdHktbGlzdC1maWx0ZXItYmFyJztcbmltcG9ydCB7XG5cdGRlZmF1bHQgYXMgd2l0aEVudGl0eUxpc3RGaWx0ZXJTdGF0ZSxcbn0gZnJvbSAnLi93aXRoLWVudGl0eS1saXN0LWZpbHRlci1zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBQYWdpbmF0ZWRFbnRpdHlMaXN0V2l0aEZpbHRlckJhciA9IChcblx0RW50aXR5TGlzdCxcblx0cGFnaW5hdGlvbkNvbmZpZyA9IHt9LFxuKSA9PiB3aXRoRW50aXR5TGlzdEZpbHRlckJhcihcblx0d2l0aEVudGl0eVBhZ2luYXRpb24oIHBhZ2luYXRpb25Db25maWcgKSggRW50aXR5TGlzdCApXG4pO1xuXG5leHBvcnQgY29uc3QgUGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXJBbmRTdGF0ZSA9IChcblx0RW50aXR5TGlzdCxcblx0cGFnaW5hdGlvbkNvbmZpZyA9IHt9LFxuKSA9PiB3aXRoRW50aXR5TGlzdEZpbHRlclN0YXRlKCB3aXRoRW50aXR5TGlzdEZpbHRlckJhcihcblx0d2l0aEVudGl0eVBhZ2luYXRpb24oIHBhZ2luYXRpb25Db25maWcgKSggRW50aXR5TGlzdCApXG4pICk7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgRW50aXR5TGlzdEZpbHRlckJhciB9IGZyb20gJy4vZW50aXR5LWxpc3QtZmlsdGVyLWJhcic7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci13cmFwcGVyXCI6XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyLXdyYXBwZXJcIixcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXJcIjpcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXJcIixcImVlLWVudGl0eS1saXN0LXZpZXctYmFyXCI6XCJlZS1lbnRpdHktbGlzdC12aWV3LWJhclwiLFwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci1wZXJQYWdlLXNlbGVjdFwiOlwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci1wZXJQYWdlLXNlbGVjdFwiLFwiZWUtZmlsdGVyLWJhci1maWx0ZXJcIjpcImVlLWZpbHRlci1iYXItZmlsdGVyXCIsXCJlZS1zZWFyY2gtZmlsdGVyXCI6XCJlZS1zZWFyY2gtZmlsdGVyXCIsXCJlZS1wZXItcGFnZS1maWx0ZXJcIjpcImVlLXBlci1wYWdlLWZpbHRlclwiLFwiZWUtZ3JpZC12aWV3LWZpbHRlclwiOlwiZWUtZ3JpZC12aWV3LWZpbHRlclwiLFwiZWUtbGlzdC12aWV3LWZpbHRlclwiOlwiZWUtbGlzdC12aWV3LWZpbHRlclwiLFwiZWUtZW50aXR5LWxpc3Qtdmlldy1vcHRpb25zXCI6XCJlZS1lbnRpdHktbGlzdC12aWV3LW9wdGlvbnNcIixcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIjpcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIixcImFjdGl2ZS1saXN0XCI6XCJhY3RpdmUtbGlzdFwiLFwiY29tcG9uZW50cy1iYXNlLWNvbnRyb2xfX2xhYmVsXCI6XCJjb21wb25lbnRzLWJhc2UtY29udHJvbF9fbGFiZWxcIixcImNvbXBvbmVudHMtc2VsZWN0LWNvbnRyb2xfX2lucHV0XCI6XCJjb21wb25lbnRzLXNlbGVjdC1jb250cm9sX19pbnB1dFwiLFwiY29tcG9uZW50cy10ZXh0LWNvbnRyb2xfX2lucHV0XCI6XCJjb21wb25lbnRzLXRleHQtY29udHJvbF9faW5wdXRcIn07IiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBkZWZhdWx0IGFzIEVudGl0eUxpc3RGaWx0ZXJCYXIgfSBmcm9tICcuL2VudGl0eS1saXN0LWZpbHRlci1iYXInO1xuXG4vKipcbiAqIHdpdGhFbnRpdHlMaXN0RmlsdGVyQmFyXG4gKiBIaWdoZXItT3JkZXItQ29tcG9uZW50IHRoYXQgd3JhcHMgYW4gRW50aXR5TGlzdCBjb21wb25lbnRcbiAqIGZvciBjaGFuZ2luZyBob3cgdGhlIEVudGl0eUxpc3QgaXMgdmlld2VkXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBFbnRpdHlMaXN0IHdpdGggYWRkZWQgRW50aXR5TGlzdEZpbHRlckJhclxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0KCBFbnRpdHlMaXN0ICkgPT4ge1xuXHRcdHJldHVybiBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0XHRzZWFyY2hFbnRpdGllcyA9ICggc2VhcmNoVGV4dCwgZW50aXRpZXMgKSA9PiB7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hUZXh0ICE9PSAnJyA/XG5cdFx0XHRcdFx0ZW50aXRpZXMuZmlsdGVyKCAoIGVudGl0eSApID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGVudGl0eU5hbWUgPSBlbnRpdHkubmFtZSA/IGVudGl0eS5uYW1lIDogJyc7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZW50aXR5TmFtZS50b0xvd2VyQ2FzZSgpLnNlYXJjaChcblx0XHRcdFx0XHRcdFx0c2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpICkgIT09IC0xO1xuXHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0ZW50aXRpZXM7XG5cdFx0XHR9O1xuXG5cdFx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcdGxldCB7IGVudGl0aWVzIH0gPSB0aGlzLnByb3BzO1xuXHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0c2VhcmNoVGV4dCxcblx0XHRcdFx0XHRzZXRTZWFyY2hUZXh0LFxuXHRcdFx0XHRcdHBlclBhZ2UsXG5cdFx0XHRcdFx0dmlldyxcblx0XHRcdFx0XHRzZXRQZXJQYWdlLFxuXHRcdFx0XHRcdHNldExpc3RWaWV3LFxuXHRcdFx0XHRcdHNldEdyaWRWaWV3LFxuXHRcdFx0XHRcdC4uLm90aGVyUHJvcHNcblx0XHRcdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0XHRcdGVudGl0aWVzID0gaXNGdW5jdGlvbiggc2V0U2VhcmNoVGV4dCApID9cblx0XHRcdFx0XHR0aGlzLnNlYXJjaEVudGl0aWVzKCBzZWFyY2hUZXh0LCBlbnRpdGllcyApIDpcblx0XHRcdFx0XHRlbnRpdGllcztcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdFx0XHQ8RW50aXR5TGlzdEZpbHRlckJhclxuXHRcdFx0XHRcdFx0XHRzZWFyY2hUZXh0PXsgc2VhcmNoVGV4dCB9XG5cdFx0XHRcdFx0XHRcdHNldFNlYXJjaFRleHQ9eyBzZXRTZWFyY2hUZXh0IH1cblx0XHRcdFx0XHRcdFx0cGVyUGFnZT17IHBlclBhZ2UgfVxuXHRcdFx0XHRcdFx0XHR2aWV3PXsgdmlldyB9XG5cdFx0XHRcdFx0XHRcdHNldFBlclBhZ2U9eyBzZXRQZXJQYWdlIH1cblx0XHRcdFx0XHRcdFx0c2V0TGlzdFZpZXc9eyBzZXRMaXN0VmlldyB9XG5cdFx0XHRcdFx0XHRcdHNldEdyaWRWaWV3PXsgc2V0R3JpZFZpZXcgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxFbnRpdHlMaXN0XG5cdFx0XHRcdFx0XHRcdGVudGl0aWVzPXsgZW50aXRpZXMgfVxuXHRcdFx0XHRcdFx0XHRlbnRpdGllc1BlclBhZ2U9eyBwZXJQYWdlIH1cblx0XHRcdFx0XHRcdFx0dmlldz17IHZpZXcgfVxuXHRcdFx0XHRcdFx0XHRub1Jlc3VsdHNUZXh0PXtcblx0XHRcdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0XHRcdCdubyByZXN1bHRzIGZvdW5kICh0cnkgY2hhbmdpbmcgZmlsdGVycyknLFxuXHRcdFx0XHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR7IC4uLm90aGVyUHJvcHMgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdCd3aXRoRW50aXR5TGlzdEZpbHRlckJhcidcbik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCwgY29tcG9zZSB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyB3aXRoU2VsZWN0LCB3aXRoRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIHdpdGhFbnRpdHlMaXN0RmlsdGVyU3RhdGVcbiAqIEhpZ2hlci1PcmRlci1Db21wb25lbnQgdGhhdCB3cmFwcyBhbiBcIkVudGl0eUxpc3RGaWx0ZXJCYXJcIiBjb21wb25lbnRcbiAqIGluIG9yZGVyIHRvIHByb3ZpZGUgc3RhdGUgbWFuYWdlbWVudCBmb3IgaXQgYW5kIGl0cyBjaGlsZHJlblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBXcmFwcGVkQ29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9IFdyYXBwZWRDb21wb25lbnQgd2l0aCBhZGRlZCBFbnRpdHlMaXN0RmlsdGVyU3RhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdGNvbXBvc2UoIFtcblx0XHR3aXRoU2VsZWN0KCAoIHNlbGVjdCwgb3duUHJvcHMgKSA9PiB7XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdHNlYXJjaFRleHQgPSAnJyxcblx0XHRcdFx0cGVyUGFnZSA9IDYsXG5cdFx0XHRcdHZpZXcgPSAnZ3JpZCcsXG5cdFx0XHR9ID0gb3duUHJvcHM7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vZmlsdGVyLXN0YXRlJyApO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2VhcmNoVGV4dDogc3RvcmUuZ2V0RmlsdGVyKFxuXHRcdFx0XHRcdCdlbnRpdHktbGlzdCcsXG5cdFx0XHRcdFx0J3NlYXJjaFRleHQnLFxuXHRcdFx0XHRcdHNlYXJjaFRleHRcblx0XHRcdFx0KSxcblx0XHRcdFx0cGVyUGFnZTogcGFyc2VJbnQoXG5cdFx0XHRcdFx0c3RvcmUuZ2V0RmlsdGVyKFxuXHRcdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHRcdCdwZXJQYWdlJyxcblx0XHRcdFx0XHRcdHBlclBhZ2Vcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdDEwXG5cdFx0XHRcdCksXG5cdFx0XHRcdHZpZXc6IHN0b3JlLmdldEZpbHRlcihcblx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdCd2aWV3Jyxcblx0XHRcdFx0XHR2aWV3XG5cdFx0XHRcdCksXG5cdFx0XHR9O1xuXHRcdH0gKSxcblx0XHR3aXRoRGlzcGF0Y2goICggZGlzcGF0Y2ggKSA9PiB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IGRpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9maWx0ZXItc3RhdGUnICk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzZXRTZWFyY2hUZXh0OiAoIHNlYXJjaFRleHQgKSA9PiBzdG9yZS5zZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQnc2VhcmNoVGV4dCcsXG5cdFx0XHRcdFx0c2VhcmNoVGV4dFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRzZXRQZXJQYWdlOiAoIHBlclBhZ2UgKSA9PiBzdG9yZS5zZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQncGVyUGFnZScsXG5cdFx0XHRcdFx0cGFyc2VJbnQoIHBlclBhZ2UsIDEwIClcblx0XHRcdFx0KSxcblx0XHRcdFx0c2V0TGlzdFZpZXc6ICgpID0+IHN0b3JlLnNldEZpbHRlcihcblx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdCd2aWV3Jyxcblx0XHRcdFx0XHQnbGlzdCdcblx0XHRcdFx0KSxcblx0XHRcdFx0c2V0R3JpZFZpZXc6ICgpID0+IHN0b3JlLnNldEZpbHRlcihcblx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdCd2aWV3Jyxcblx0XHRcdFx0XHQnZ3JpZCdcblx0XHRcdFx0KSxcblx0XHRcdH07XG5cdFx0fSApLFxuXHRcdCggV3JhcHBlZENvbXBvbmVudCApID0+IHtcblx0XHRcdHJldHVybiBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0XHRcdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0XHRcdFx0ZW50aXRpZXM6IFByb3BUeXBlcy5hcnJheU9mKCBQcm9wVHlwZXMub2JqZWN0ICkuaXNSZXF1aXJlZCxcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVuZGVyKCkge1xuXHRcdFx0XHRcdHJldHVybiA8V3JhcHBlZENvbXBvbmVudCB7IC4uLnRoaXMucHJvcHMgfSAvPjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXHRdICksXG5cdCd3aXRoRW50aXR5TGlzdEZpbHRlclN0YXRlJ1xuKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aEJhc2VDb250cm9sIH0gZnJvbSAnLi9iYXNlLWNvbnRyb2wnO1xuZXhwb3J0IHtcblx0UGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXIsXG5cdFBhZ2luYXRlZEVudGl0eUxpc3RXaXRoRmlsdGVyQmFyQW5kU3RhdGUsXG5cdEVudGl0eUxpc3RGaWx0ZXJCYXIsXG59IGZyb20gJy4vZmlsdGVyLWJhcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhFbnRpdHlQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aExhdGVzdENoZWNraW4gfSBmcm9tICcuL3dpdGgtbGF0ZXN0LWNoZWNraW4nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoTW9uZXkgfSBmcm9tICcuL21vbmV5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWxBcnJheXMgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgTW9uZXksIFNpdGVDdXJyZW5jeSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuXG4vKipcbiAqIFRoaXMgdmFsaWRhdGVzIHdoZXRoZXIgdGhlIG5leHRTdGF0ZVJlc3BvbnNlIGlzIGluIHRoZSBleHBlY3RlZCBzaGFwZS5cbiAqIElmIGFueSBvZiB0aGUgdmFsaWRhdGlvbiBmYWlscywgdGhlbiBhIGNvbnNvbGUuZXJyb3IgaXMgdHJpZ2dlcmVkICh2aWFcbiAqIHdhcm5pbmcpXG4gKlxuICogQHBhcmFtIHt7fX0gbmV4dFN0YXRlUmVzcG9uc2VcbiAqL1xuY29uc3QgdmFsaWRhdGVOZXh0U3RhdGUgPSAoIG5leHRTdGF0ZVJlc3BvbnNlICkgPT4ge1xuXHR3YXJuaW5nKFxuXHRcdG5leHRTdGF0ZVJlc3BvbnNlICYmXG5cdFx0bmV4dFN0YXRlUmVzcG9uc2UuaGFzT3duUHJvcGVydHkoICdjb252ZXJ0ZWRWYWx1ZXMnICksXG5cdFx0J1RoZSBwcm9wTmFtZU1hcCBjYWxsYmFjayBmb3IgdGhlIHdpdGhNb25leSBIT0Mgc2hvdWxkIHJldHVybiBhbicgK1xuXHRcdCcgb2JqZWN0IHdpdGggYSBcImNvbnZlcnRlZFZhbHVlc1wiIGtleS4nXG5cdCk7XG5cdGlmICggbmV4dFN0YXRlUmVzcG9uc2UgJiZcblx0XHRuZXh0U3RhdGVSZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSggJ2NvbnZlcnRlZFZhbHVlcycgKSApIHtcblx0XHR3YXJuaW5nKFxuXHRcdFx0aXNBcnJheSggbmV4dFN0YXRlUmVzcG9uc2UuY29udmVydGVkVmFsdWVzICksXG5cdFx0XHQnVGhlIHByb3BOYW1lTWFwIGNhbGxiYWNrIGZvciB0aGUgd2l0aE1vbmV5IEhPQyBzaG91bGQgcmV0dXJuIGFuICcgK1xuXHRcdFx0J29iamVjdCB3aXRoIGEgXCJjb252ZXJ0ZWRWYWx1ZXNcIiBrZXkgdGhhdCBoYXMgYW4gYXJyYXknICtcblx0XHRcdCcgb2YgbnVtYmVycyBhcyB0aGUgdmFsdWUuJ1xuXHRcdCk7XG5cdH1cblx0d2FybmluZyhcblx0XHRuZXh0U3RhdGVSZXNwb25zZSAmJiBuZXh0U3RhdGVSZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSggJ3Byb3BzJyApLFxuXHRcdCdUaGUgcHJvcE5hbWVNYXAgY2FsbGJhY2sgZm9yIHRoZSB3aXRoTW9uZXlIT0Mgc2hvdWxkIHJldHVybiBhbicgK1xuXHRcdCcgb2JqZWN0IHdpdGggYSBcInByb3BzXCIga2V5Lidcblx0KTtcbn07XG5cbi8qKlxuICogQSBoaWdoZXIgb3JkZXIgY29tcG9uZW50IHRoYXQgY29udmVydHMgYW55IHByb3BzIG1hdGNoaW5nIHRoZSBtYXAgcHJvdmlkZWRcbiAqIGFzIGFuIGFyZ3VtZW50IHRvIE1vbmV5IHZhbHVlIG9iamVjdHMgYW5kIHBhc3NlcyB0aGVtIHRvIHRoZSBXcmFwcGVkQ29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtBcnJheXxmdW5jdGlvbn0gcHJvcE5hbWVNYXBcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKCopOiBFbmhhbmNlZENvbXBvbmVudH0gIFJldHVybnMgYW4gZW5oYW5jZWQgY29tcG9uZW50IHdoZXJlXG4gKiBwcm9wcyB0aGF0IHJlcHJlc2VudCBtb25leSB2YWx1ZXMgaGF2ZSBiZWVuIGNvbnZlcnRlZCB0byBhIE1vbmV5IHZhbHVlIG9iamVjdFxuICovXG5jb25zdCB3aXRoTW9uZXkgPSAoIHByb3BOYW1lTWFwID0gW10gKSA9PiAoIFdyYXBwZWRDb21wb25lbnQgKSA9PiB7XG5cdGNsYXNzIEVuaGFuY2VkQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XHRzdGF0ZSA9IHtcblx0XHRcdGNvbnZlcnRlZFZhbHVlczogW10sXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgcHJvdmlkZXMgdGhlIG5leHQgc3RhdGUgb24gYW55IHByb3AgY2hhbmdlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHt7fX0gcHJvcHNcblx0XHQgKiBAcmV0dXJuIHt7fX0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV4dFN0YXRlIGZvciB0aGUgY29tcG9uZW50LlxuXHRcdCAqL1xuXHRcdGdldE5leHRTdGF0ZSA9ICggcHJvcHMgKSA9PiB7XG5cdFx0XHRsZXQgbmV4dFN0YXRlUmVzcG9uc2UsXG5cdFx0XHRcdG5leHRTdGF0ZSA9IHt9LFxuXHRcdFx0XHRjb252ZXJ0ZWRWYWx1ZXMgPSBbXTtcblx0XHRcdGlmICggaXNGdW5jdGlvbiggcHJvcE5hbWVNYXAgKSApIHtcblx0XHRcdFx0bmV4dFN0YXRlUmVzcG9uc2UgPSBwcm9wTmFtZU1hcCggcHJvcHMsIE1vbmV5ICk7XG5cdFx0XHRcdHZhbGlkYXRlTmV4dFN0YXRlKCBuZXh0U3RhdGVSZXNwb25zZSApO1xuXHRcdFx0XHRpZiAoIG5leHRTdGF0ZVJlc3BvbnNlICYmIG5leHRTdGF0ZVJlc3BvbnNlLnByb3BzICkge1xuXHRcdFx0XHRcdG5leHRTdGF0ZSA9IHsgLi4ubmV4dFN0YXRlUmVzcG9uc2UucHJvcHMgfTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb252ZXJ0ZWRWYWx1ZXMgPSBuZXh0U3RhdGVSZXNwb25zZS5jb252ZXJ0ZWRWYWx1ZXMgfHxcblx0XHRcdFx0XHRjb252ZXJ0ZWRWYWx1ZXM7XG5cdFx0XHR9IGVsc2UgaWYgKCBpc0FycmF5KCBwcm9wTmFtZU1hcCApICkge1xuXHRcdFx0XHRwcm9wTmFtZU1hcC5mb3JFYWNoKCAoIHByb3BOYW1lICkgPT4ge1xuXHRcdFx0XHRcdGlmICggcHJvcHNbIHByb3BOYW1lIF0gKSB7XG5cdFx0XHRcdFx0XHRuZXh0U3RhdGVbIHByb3BOYW1lIF0gPVxuXHRcdFx0XHRcdFx0XHRuZXcgTW9uZXkoXG5cdFx0XHRcdFx0XHRcdFx0cHJvcHNbIHByb3BOYW1lIF0sXG5cdFx0XHRcdFx0XHRcdFx0U2l0ZUN1cnJlbmN5XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRjb252ZXJ0ZWRWYWx1ZXMucHVzaChcblx0XHRcdFx0XHRcdFx0bmV4dFN0YXRlWyBwcm9wTmFtZSBdLnRvTnVtYmVyKClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3YXJuaW5nKFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdCdUaGUgcHJvcE5hbWVNYXAgYXJndW1lbnQgcHJvdmlkZWQgdG8gd2l0aE1vbmV5IG11c3QgYmUgZWl0aGVyIGEnICtcblx0XHRcdFx0XHQnIGZ1bmN0aW9uIG9yIGFuIGFycmF5J1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0bmV4dFN0YXRlLmNvbnZlcnRlZFZhbHVlcyA9IGNvbnZlcnRlZFZhbHVlcztcblx0XHRcdHJldHVybiBuZXh0U3RhdGU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENhbGN1bGF0ZXMgd2hldGhlciB0aGUgc3RhdGUgc2hvdWxkIGJlIHVwZGF0ZWQgdXNpbmcgdGhlIHByb3ZpZGVkXG5cdFx0ICogYXJndW1lbnRzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHt7fX0gcHJldlByb3BzXG5cdFx0ICogQHBhcmFtIHt7fX0gcHJldlN0YXRlXG5cdFx0ICogQHBhcmFtIHt7fX0gbmV4dFN0YXRlXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn0gIElmIGEgc2hhbGxvdyBjb21wYXJlIG9mIHByZXZTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXNcblx0XHQgKiBhbmQgbmV4dFN0YXRlLmNvbnZlcnRlZFZhbHVlcyBpcyBmYWxzZSwgdGhlbiB0aGlzIHJldHVybnMgdHJ1ZSB0b1xuXHRcdCAqIHNpZ25hbCBzdGF0ZSBzaG91bGQgYmUgdXBkYXRlZC5cblx0XHQgKi9cblx0XHRzaG91bGRVcGRhdGVTdGF0ZVdpdGhDb252ZXJ0ZWRWYWx1ZXMgPSAoXG5cdFx0XHRwcmV2UHJvcHMsXG5cdFx0XHRwcmV2U3RhdGUsXG5cdFx0XHRuZXh0U3RhdGVcblx0XHQpID0+IHtcblx0XHRcdHJldHVybiAhIGlzU2hhbGxvd0VxdWFsQXJyYXlzKFxuXHRcdFx0XHRuZXh0U3RhdGUuY29udmVydGVkVmFsdWVzLFxuXHRcdFx0XHRwcmV2U3RhdGUuY29udmVydGVkVmFsdWVzXG5cdFx0XHQpICYmXG5cdFx0XHRcdG5leHRTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXNbIDAgXSAhPT1cblx0XHRcdFx0cHJldlN0YXRlLmNvbnZlcnRlZFZhbHVlc1sgMCBdO1xuXHRcdH07XG5cblx0XHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoIHRoaXMuZ2V0TmV4dFN0YXRlKCB0aGlzLnByb3BzICkgKTtcblx0XHR9XG5cblx0XHRjb21wb25lbnREaWRVcGRhdGUoIHByZXZQcm9wcywgcHJldlN0YXRlICkge1xuXHRcdFx0Y29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXROZXh0U3RhdGUoIHRoaXMucHJvcHMgKTtcblx0XHRcdGlmICggdGhpcy5zaG91bGRVcGRhdGVTdGF0ZVdpdGhDb252ZXJ0ZWRWYWx1ZXMoXG5cdFx0XHRcdHByZXZQcm9wcyxcblx0XHRcdFx0cHJldlN0YXRlLFxuXHRcdFx0XHRuZXh0U3RhdGVcblx0XHRcdCkgKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoIG5leHRTdGF0ZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJlbmRlcigpIHtcblx0XHRcdHJldHVybiA8V3JhcHBlZENvbXBvbmVudCB7IC4uLnRoaXMucHJvcHMgfSB7IC4uLnRoaXMuc3RhdGUgfSAvPjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gRW5oYW5jZWRDb21wb25lbnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoTW9uZXk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IEp3UGFnaW5hdGlvbiBmcm9tICdqdy1yZWFjdC1wYWdpbmF0aW9uJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1xuXHRjb21wb3NlLFxuXHRjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCxcblx0d2l0aEluc3RhbmNlSWQsXG59IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBGcmFnbWVudCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuLyoqXG4gKiBhZGRzIHBhZ2luYXRpb24gdG8gYW4gXCJFbnRpdHlMaXN0XCIgY29tcG9uZW50XG4gKiBhbmQgY29udHJvbHMgd2hhdCBlbnRpdGllcyBhcmUgZGlzcGxheWVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhZ2luYXRpb25Db25maWdcbiAqIEBwYXJhbSB7QXJyYXl9IGVudGl0aWVzXG4gKiBAcGFyYW0ge251bWJlcn0gaW5zdGFuY2VJZFxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlbnRpdGllc1BlclBhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25QYWdlQ2hhbmdlXG4gKiBAcGFyYW0ge09iamVjdH0gRW50aXR5TGlzdFxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyUHJvcHNcbiAqIEByZXR1cm4ge09iamVjdH0gRW50aXR5TGlzdCB3aXRoIGFkZGVkIEVudGl0eVBhZ2luYXRpb25cbiAqL1xuY29uc3QgRW50aXR5UGFnaW5hdGlvbiA9ICgge1xuXHRwYWdpbmF0aW9uQ29uZmlnID0ge30sXG5cdGVudGl0aWVzLFxuXHRpbnN0YW5jZUlkLFxuXHRlbnRpdGllc1BlclBhZ2UgPSAxMCxcblx0cG9zaXRpb24gPSAndG9wJyxcblx0b25QYWdlQ2hhbmdlID0gKCkgPT4gbnVsbCxcblx0RW50aXR5TGlzdCA9ICgpID0+IG51bGwsXG5cdC4uLm90aGVyUHJvcHNcbn0gKSA9PiB7XG5cdGNvbnN0IFsgcGFnZWRFbnRpdGllcywgc2V0UGFnZWRFbnRpdGllcyBdID0gdXNlU3RhdGUoIGVudGl0aWVzICk7XG5cdGNvbnN0IGN1cnJlbnRFbnRpdGllcyA9IHVzZVJlZiggZW50aXRpZXMgKTtcblx0Y29uc3Qgb25QYWdpbmF0aW9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soICggdXBkYXRlZFBhZ2VkRW50aXRpZXMgKSA9PiB7XG5cdFx0c2V0UGFnZWRFbnRpdGllcyggdXBkYXRlZFBhZ2VkRW50aXRpZXMgKTtcblx0XHRvblBhZ2VDaGFuZ2UoIHVwZGF0ZWRQYWdlZEVudGl0aWVzICk7XG5cdH0sIFsgb25QYWdlQ2hhbmdlIF0gKTtcblx0dXNlRWZmZWN0KFxuXHRcdCgpID0+IHtcblx0XHRcdC8vIGJlY2F1c2UgandQYWdpbmF0aW9uIHVzZXMgdGhlIGluY29taW5nIGVudGl0aWVzIGFycmF5IHRvIGRldGVybWluZVxuXHRcdFx0Ly8gd2hldGhlciB0byByZWNhbGN1bGF0ZSB0aGUgcGFnZWQgZW50aXRpZXMsIHdlIG5lZWQgdG8gZm9yY2Vcblx0XHRcdC8vIHRoYXQgYXJyYXkgdG8gY2hhbmdlIGlmIGVudGl0aWVzUGVyUGFnZSBjaGFuZ2VzLlxuXHRcdFx0Y3VycmVudEVudGl0aWVzLmN1cnJlbnQgPSBbIC4uLmVudGl0aWVzIF07XG5cdFx0XHQvLyBmb3JjZXMgcmUtcmVuZGVyIGJlY2F1c2UgdXNlRWZmZWN0IGV4ZWN1dGVzIGFmdGVyIGluaXRpYWxcblx0XHRcdC8vIHJlbmRlciBjYWxjdWxhdGlvbiBkb25lLlxuXHRcdFx0c2V0UGFnZWRFbnRpdGllcyggW10gKTtcblx0XHR9LFxuXHRcdFsgZW50aXRpZXNQZXJQYWdlLCBlbnRpdGllcyBdXG5cdCk7XG5cdHBhZ2luYXRpb25Db25maWcubGFiZWxzID0gcGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMgJiZcblx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMuZmlyc3QgJiZcblx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMubGFzdCAmJlxuXHRwYWdpbmF0aW9uQ29uZmlnLmxhYmVscy5wcmV2aW91cyAmJlxuXHRwYWdpbmF0aW9uQ29uZmlnLmxhYmVscy5uZXh0ID9cblx0XHRwYWdpbmF0aW9uQ29uZmlnLmxhYmVscyA6XG5cdFx0e1xuXHRcdFx0Zmlyc3Q6IF9fKCAnRmlyc3QnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRsYXN0OiBfXyggJ0xhc3QnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRwcmV2aW91czogX18oICdQcmV2JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0bmV4dDogX18oICdOZXh0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdH07XG5cdGNvbnN0IG5vUmVzdWx0c1RleHQgPSBwYWdpbmF0aW9uQ29uZmlnLm5vUmVzdWx0c1RleHQgP1xuXHRcdHBhZ2luYXRpb25Db25maWcubm9SZXN1bHRzVGV4dCA6XG5cdFx0X18oXG5cdFx0XHQnbm8gcmVzdWx0cyBmb3VuZCAodHJ5IGNoYW5naW5nIGZpbHRlcnMpJyxcblx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHQpO1xuXHRjb25zdCByZXR1cm5Bc1Byb3AgPSBwYWdpbmF0aW9uQ29uZmlnLnJldHVybkFzUHJvcCA/XG5cdFx0cGFnaW5hdGlvbkNvbmZpZy5yZXR1cm5Bc1Byb3AgOlxuXHRcdGZhbHNlO1xuXHRjb25zdCBwYWdpbmF0aW9uID0gdXNlQ2FsbGJhY2soXG5cdFx0KCkgPT4gKFxuXHRcdFx0PGRpdiBpZD17IGBlZS1lbnRpdHktcGFnaW5hdGlvbi0keyBpbnN0YW5jZUlkIH1gIH1cblx0XHRcdFx0Y2xhc3NOYW1lPVwiZWUtZW50aXR5LXBhZ2luYXRpb25cIlxuXHRcdFx0PlxuXHRcdFx0XHQ8SndQYWdpbmF0aW9uXG5cdFx0XHRcdFx0aXRlbXM9eyBjdXJyZW50RW50aXRpZXMuY3VycmVudCB9XG5cdFx0XHRcdFx0b25DaGFuZ2VQYWdlPXsgb25QYWdpbmF0aW9uQ2hhbmdlIH1cblx0XHRcdFx0XHRwYWdlU2l6ZT17IHBhcnNlSW50KCBlbnRpdGllc1BlclBhZ2UsIDEwICkgfVxuXHRcdFx0XHRcdHsgLi4ucGFnaW5hdGlvbkNvbmZpZyB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpLFxuXHRcdFtcblx0XHRcdGluc3RhbmNlSWQsXG5cdFx0XHRvblBhZ2luYXRpb25DaGFuZ2UsXG5cdFx0XHRlbnRpdGllcyxcblx0XHRcdGVudGl0aWVzUGVyUGFnZSxcblx0XHRcdHBhZ2luYXRpb25Db25maWcsXG5cdFx0XVxuXHQpO1xuXHRjb25zdCB0b3BQYWdpbmF0aW9uID0gcG9zaXRpb24gPT09ICggJ3RvcCcgfHwgJ2JvdGgnICkgP1xuXHRcdHBhZ2luYXRpb24oKSA6XG5cdFx0bnVsbDtcblx0Y29uc3QgYm90dG9tUGFnaW5hdGlvbiA9IHBvc2l0aW9uID09PSAoICdib3R0b20nIHx8ICdib3RoJyApID9cblx0XHRwYWdpbmF0aW9uKCkgOlxuXHRcdG51bGw7XG5cdHJldHVybiByZXR1cm5Bc1Byb3AgPyAoXG5cdFx0PEVudGl0eUxpc3Rcblx0XHRcdHBhZ2luYXRpb249eyBwYWdpbmF0aW9uKCkgfVxuXHRcdFx0ZW50aXRpZXM9eyBwYWdlZEVudGl0aWVzIH1cblx0XHRcdG5vUmVzdWx0c1RleHQ9eyBub1Jlc3VsdHNUZXh0IH1cblx0XHRcdHsgLi4ub3RoZXJQcm9wcyB9XG5cdFx0Lz5cblx0KSA6IChcblx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHR7IHRvcFBhZ2luYXRpb24gfVxuXHRcdFx0PEVudGl0eUxpc3Rcblx0XHRcdFx0ZW50aXRpZXM9eyBwYWdlZEVudGl0aWVzIH1cblx0XHRcdFx0bm9SZXN1bHRzVGV4dD17IG5vUmVzdWx0c1RleHQgfVxuXHRcdFx0XHR7IC4uLm90aGVyUHJvcHMgfVxuXHRcdFx0Lz5cblx0XHRcdHsgYm90dG9tUGFnaW5hdGlvbiB9XG5cdFx0PC9GcmFnbWVudD5cblx0KTtcbn07XG5cbkVudGl0eVBhZ2luYXRpb24ucHJvcFR5cGVzID0ge1xuXHRwYWdpbmF0aW9uQ29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRyZXR1cm5Bc1Byb3A6IFByb3BUeXBlcy5ib29sLFxuXHRcdG5vUmVzdWx0c1RleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bGFiZWxzOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRcdGZpcnN0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0bGFzdDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdHByZXZpb3VzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0bmV4dDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR9ICksXG5cdH0gKSxcblx0ZW50aXRpZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuXHRpbnN0YW5jZUlkOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdGVudGl0aWVzUGVyUGFnZTogUHJvcFR5cGVzLm9uZU9mVHlwZSggW1xuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcblx0XSApLFxuXHRwb3NpdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbi8qKlxuICogd2l0aEVudGl0eVBhZ2luYXRpb25cbiAqIEhpZ2hlci1PcmRlci1Db21wb25lbnQgdGhhdCB3cmFwcyBhbiBcIkVudGl0eUxpc3RcIiBjb21wb25lbnRcbiAqIHdpdGggYW4gRW50aXR5UGFnaW5hdGlvbiBjb21wb25lbnQgdGhhdCBhZGRzIGEgcGFnaW5hdGlvbiBjb250YWluZXJcbiAqIGJlbG93IHRoZSBFbnRpdHlMaXN0IGFuZCBjb250cm9scyB3aGF0IGVudGl0aWVzIGFyZSBkaXNwbGF5ZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFnaW5hdGlvbkNvbmZpZ1xuICogQHJldHVybiB7T2JqZWN0fSBFbnRpdHlMaXN0IHdpdGggYWRkZWQgRW50aXR5UGFnaW5hdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCAoIHBhZ2luYXRpb25Db25maWcgPSB7fSApID0+IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KFxuXHRjb21wb3NlKCBbXG5cdFx0d2l0aEluc3RhbmNlSWQsXG5cdFx0KCBFbnRpdHlMaXN0ICkgPT4gKCBwcm9wcyApID0+IHtcblx0XHRcdHJldHVybiA8RW50aXR5UGFnaW5hdGlvblxuXHRcdFx0XHR7IC4uLnByb3BzIH1cblx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZz17IHBhZ2luYXRpb25Db25maWcgfVxuXHRcdFx0XHRFbnRpdHlMaXN0PXsgRW50aXR5TGlzdCB9XG5cdFx0XHQvPjtcblx0XHR9LFxuXHRdICksXG5cdCd3aXRoRW50aXR5UGFnaW5hdGlvbidcbik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiZWUtZW50aXR5LXBhZ2luYXRpb25cIjpcImVlLWVudGl0eS1wYWdpbmF0aW9uXCIsXCJwYWdpbmF0aW9uXCI6XCJwYWdpbmF0aW9uXCIsXCJkaXNhYmxlZFwiOlwiZGlzYWJsZWRcIixcImFjdGl2ZVwiOlwiYWN0aXZlXCJ9OyIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB3aXRoU2VsZWN0LCB3aXRoRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQsIGNvbXBvc2UgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBFeHBvc2VzIHByb3BlcnRpZXMgcmVsYXRlZCB0byB0aGUgbGF0ZXN0IGNoZWNrLWluIGVudGl0eSBmb3IgYSBnaXZlblxuICogcmVnaXN0cmF0aW9uIGFuZCBkYXRldGltZS5cbiAqXG4gKiBQcm9wZXJ0aWVzIHBhc3NlZCB0aHJvdWdoIHRvIHdyYXBwZWQgY29tcG9uZW50IGFyZTpcbiAqXG4gKiAtIGNoZWNrSW5FbnRpdHkge0Jhc2VFbnRpdHl8bnVsbH0gVGhlIGNoZWNrLWluIGVudGl0eSB0aGF0IGlzIHJlbGF0ZWQgdG8gdGhlXG4gKiBnaXZlbiByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lIGlkLlxuICogLSBoYXNSZXNvbHZlZENoZWNraW4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGNoZWNrLWluIGVudGl0eSBzZWxlY3RvciBoYXNcbiAqIHJlc29sdmVkLiAgVGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSBpdHMgcG9zc2libGUgdGhlcmUgaXMgbm8gZW50aXR5IGZvclxuICogdGhpcyByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lIGlmIHRoYXQgcmVnaXN0cmF0aW9uIGhhc24gbmV2ZXIgYmVlbiBjaGVja2VkXG4gKiBpbi5cbiAqIC0gb25DbGljayB7ZnVuY3Rpb259IEEgY2xpY2sgaGFuZGxlciB3aGljaCB3aGVuIGludm9rZWQsIHdpbGwgdG9nZ2xlIHRoZVxuICogY2hlY2staW4gc3RhdGUgZm9yIHRoZSBnaXZlbiByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lSWQuIE5vdGU6IHRoaXMgd2lsbFxuICogcmVwbGFjZSB0aGUgc3RvcmUgbGF0ZXN0Q2hlY2tpbiByZWNvcmQgaW4gdGhlIHN0YXRlIGZvciB0aGlzIGdpdmVuXG4gKiByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lIGlkIHdoaWNoIHdpbGwgZ2V0IHBpY2tlZCB1cCBieSB0aGUgYHdpdGhTZWxlY3RgXG4gKiBIT0MgaW4gdGhlIGNvbXBvc2VkIGNvbXBvbmVudC5cbiAqXG4gKiBAdHlwZSB7V1BDb21wb25lbnR9XG4gKi9cbmNvbnN0IHdpdGhMYXRlc3RDaGVja2luID0gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdGNvbXBvc2UoIFtcblx0XHR3aXRoU2VsZWN0KFxuXHRcdFx0KCBzZWxlY3QsIHsgcmVnaXN0cmF0aW9uLCBkYXRldGltZUlkIH0gKSA9PiB7XG5cdFx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbChcblx0XHRcdFx0XHRyZWdpc3RyYXRpb24sXG5cdFx0XHRcdFx0J3JlZ2lzdHJhdGlvbidcblx0XHRcdFx0KSApIHtcblx0XHRcdFx0XHRyZXR1cm4ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgeyBnZXRMYXRlc3RDaGVja2luIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0XHRcdGNvbnN0IGNoZWNrSW5FbnRpdHkgPSBnZXRMYXRlc3RDaGVja2luKFxuXHRcdFx0XHRcdHJlZ2lzdHJhdGlvbi5pZCxcblx0XHRcdFx0XHRkYXRldGltZUlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y2hlY2tpbkVudGl0eTogY2hlY2tJbkVudGl0eSB8fCBudWxsLFxuXHRcdFx0XHRcdGhhc1Jlc29sdmVkQ2hlY2tpbjogaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0XHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHRcdFx0XHQnZ2V0TGF0ZXN0Q2hlY2tpbicsXG5cdFx0XHRcdFx0XHRbIHJlZ2lzdHJhdGlvbi5pZCwgZGF0ZXRpbWVJZCBdXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHQpLFxuXHRcdHdpdGhEaXNwYXRjaChcblx0XHRcdCggZGlzcGF0Y2gsIHsgcmVnaXN0cmF0aW9uLCBkYXRldGltZUlkIH0gKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHsgdG9nZ2xlQ2hlY2tpbiB9ID0gZGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b25DbGljaygpIHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoXG5cdFx0XHRcdFx0XHRcdFx0cmVnaXN0cmF0aW9uLFxuXHRcdFx0XHRcdFx0XHRcdCdyZWdpc3RyYXRpb24nXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR0b2dnbGVDaGVja2luKCByZWdpc3RyYXRpb24uaWQsIGRhdGV0aW1lSWQgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdCksXG5cdF0gKSxcblx0J3dpdGhMYXRlc3RDaGVja2luJ1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aExhdGVzdENoZWNraW47XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlID0gcmVxdWlyZShcIi4vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICB2YXIga2V5LCBpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllczsiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJtb2R1bGUuZXhwb3J0cz1mdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiByKG4pe2lmKHRbbl0pcmV0dXJuIHRbbl0uZXhwb3J0czt2YXIgbz10W25dPXtpOm4sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtuXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxyKSxvLmw9ITAsby5leHBvcnRzfXJldHVybiByLm09ZSxyLmM9dCxyLmQ9ZnVuY3Rpb24oZSx0LG4pe3IubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpufSl9LHIucj1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxyLnQ9ZnVuY3Rpb24oZSx0KXtpZigxJnQmJihlPXIoZSkpLDgmdClyZXR1cm4gZTtpZig0JnQmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIG49T2JqZWN0LmNyZWF0ZShudWxsKTtpZihyLnIobiksT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmXCJzdHJpbmdcIiE9dHlwZW9mIGUpZm9yKHZhciBvIGluIGUpci5kKG4sbyxmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0uYmluZChudWxsLG8pKTtyZXR1cm4gbn0sci5uPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiByLmQodCxcImFcIix0KSx0fSxyLm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHIucD1cIlwiLHIoci5zPTApfShbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBuPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0xO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspe3ZhciByPWFyZ3VtZW50c1t0XTtmb3IodmFyIG4gaW4gcilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocixuKSYmKGVbbl09cltuXSl9cmV0dXJuIGV9LG89ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBuPXRbcl07bi5lbnVtZXJhYmxlPW4uZW51bWVyYWJsZXx8ITEsbi5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbiYmKG4ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4ua2V5LG4pfX1yZXR1cm4gZnVuY3Rpb24odCxyLG4pe3JldHVybiByJiZlKHQucHJvdG90eXBlLHIpLG4mJmUodCxuKSx0fX0oKSxhPWkocigxKSksdT1pKHIoNCkpLGw9aShyKDcpKTtmdW5jdGlvbiBpKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX12YXIgcz17aXRlbXM6dS5kZWZhdWx0LmFycmF5LmlzUmVxdWlyZWQsb25DaGFuZ2VQYWdlOnUuZGVmYXVsdC5mdW5jLmlzUmVxdWlyZWQsaW5pdGlhbFBhZ2U6dS5kZWZhdWx0Lm51bWJlcixwYWdlU2l6ZTp1LmRlZmF1bHQubnVtYmVyLG1heFBhZ2VzOnUuZGVmYXVsdC5udW1iZXIsbGFiZWxzOnUuZGVmYXVsdC5vYmplY3Qsc3R5bGVzOnUuZGVmYXVsdC5vYmplY3QsZGlzYWJsZURlZmF1bHRTdHlsZXM6dS5kZWZhdWx0LmJvb2x9LGM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlKXshZnVuY3Rpb24oZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLHQpO3ZhciByPWZ1bmN0aW9uKGUsdCl7aWYoIWUpdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO3JldHVybiF0fHxcIm9iamVjdFwiIT10eXBlb2YgdCYmXCJmdW5jdGlvblwiIT10eXBlb2YgdD9lOnR9KHRoaXMsKHQuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YodCkpLmNhbGwodGhpcyxlKSk7cmV0dXJuIHIuc3RhdGU9e3BhZ2VyOnt9fSxyLnN0eWxlcz17fSxlLmRpc2FibGVEZWZhdWx0U3R5bGVzfHwoci5zdHlsZXM9e3VsOnttYXJnaW46MCxwYWRkaW5nOjAsZGlzcGxheTpcImlubGluZS1ibG9ja1wifSxsaTp7bGlzdFN0eWxlOlwibm9uZVwiLGRpc3BsYXk6XCJpbmxpbmVcIix0ZXh0QWxpZ246XCJjZW50ZXJcIn0sYTp7Y3Vyc29yOlwicG9pbnRlclwiLHBhZGRpbmc6XCI2cHggMTJweFwiLGRpc3BsYXk6XCJibG9ja1wiLGZsb2F0OlwibGVmdFwifX0pLGUuc3R5bGVzJiYoci5zdHlsZXM9e3VsOm4oe30sci5zdHlsZXMudWwsZS5zdHlsZXMudWwpLGxpOm4oe30sci5zdHlsZXMubGksZS5zdHlsZXMubGkpLGE6bih7fSxyLnN0eWxlcy5hLGUuc3R5bGVzLmEpfSkscn1yZXR1cm4gZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0JiZudWxsIT09dCl0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIit0eXBlb2YgdCk7ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0JiZ0LnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOmUsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksdCYmKE9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3Quc2V0UHJvdG90eXBlT2YoZSx0KTplLl9fcHJvdG9fXz10KX0odCxhLmRlZmF1bHQuQ29tcG9uZW50KSxvKHQsW3trZXk6XCJjb21wb25lbnRXaWxsTW91bnRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMucHJvcHMuaXRlbXMmJnRoaXMucHJvcHMuaXRlbXMubGVuZ3RoJiZ0aGlzLnNldFBhZ2UodGhpcy5wcm9wcy5pbml0aWFsUGFnZSl9fSx7a2V5OlwiY29tcG9uZW50RGlkVXBkYXRlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt0aGlzLnByb3BzLml0ZW1zIT09ZS5pdGVtcyYmdGhpcy5zZXRQYWdlKHRoaXMucHJvcHMuaW5pdGlhbFBhZ2UpfX0se2tleTpcInNldFBhZ2VcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLnByb3BzLHI9dC5pdGVtcyxuPXQucGFnZVNpemUsbz10Lm1heFBhZ2VzLGE9dGhpcy5zdGF0ZS5wYWdlcjthPSgwLGwuZGVmYXVsdCkoci5sZW5ndGgsZSxuLG8pO3ZhciB1PXIuc2xpY2UoYS5zdGFydEluZGV4LGEuZW5kSW5kZXgrMSk7dGhpcy5zZXRTdGF0ZSh7cGFnZXI6YX0pLHRoaXMucHJvcHMub25DaGFuZ2VQYWdlKHUpfX0se2tleTpcInJlbmRlclwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PXRoaXMuc3RhdGUucGFnZXIscj10aGlzLnByb3BzLmxhYmVscyxuPXRoaXMuc3R5bGVzO3JldHVybiF0LnBhZ2VzfHx0LnBhZ2VzLmxlbmd0aDw9MT9udWxsOmEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwidWxcIix7Y2xhc3NOYW1lOlwicGFnaW5hdGlvblwiLHN0eWxlOm4udWx9LGEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIix7Y2xhc3NOYW1lOlwicGFnZS1pdGVtIGZpcnN0IFwiKygxPT09dC5jdXJyZW50UGFnZT9cImRpc2FibGVkXCI6XCJcIiksc3R5bGU6bi5saX0sYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIse2NsYXNzTmFtZTpcInBhZ2UtbGlua1wiLG9uQ2xpY2s6ZnVuY3Rpb24oKXtyZXR1cm4gZS5zZXRQYWdlKDEpfSxzdHlsZTpuLmF9LHIuZmlyc3QpKSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIse2NsYXNzTmFtZTpcInBhZ2UtaXRlbSBwcmV2aW91cyBcIisoMT09PXQuY3VycmVudFBhZ2U/XCJkaXNhYmxlZFwiOlwiXCIpLHN0eWxlOm4ubGl9LGEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLHtjbGFzc05hbWU6XCJwYWdlLWxpbmtcIixvbkNsaWNrOmZ1bmN0aW9uKCl7cmV0dXJuIGUuc2V0UGFnZSh0LmN1cnJlbnRQYWdlLTEpfSxzdHlsZTpuLmF9LHIucHJldmlvdXMpKSx0LnBhZ2VzLm1hcChmdW5jdGlvbihyLG8pe3JldHVybiBhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIse2tleTpvLGNsYXNzTmFtZTpcInBhZ2UtaXRlbSBwYWdlLW51bWJlciBcIisodC5jdXJyZW50UGFnZT09PXI/XCJhY3RpdmVcIjpcIlwiKSxzdHlsZTpuLmxpfSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIix7Y2xhc3NOYW1lOlwicGFnZS1saW5rXCIsb25DbGljazpmdW5jdGlvbigpe3JldHVybiBlLnNldFBhZ2Uocil9LHN0eWxlOm4uYX0scikpfSksYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLHtjbGFzc05hbWU6XCJwYWdlLWl0ZW0gbmV4dCBcIisodC5jdXJyZW50UGFnZT09PXQudG90YWxQYWdlcz9cImRpc2FibGVkXCI6XCJcIiksc3R5bGU6bi5saX0sYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIse2NsYXNzTmFtZTpcInBhZ2UtbGlua1wiLG9uQ2xpY2s6ZnVuY3Rpb24oKXtyZXR1cm4gZS5zZXRQYWdlKHQuY3VycmVudFBhZ2UrMSl9LHN0eWxlOm4uYX0sci5uZXh0KSksYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLHtjbGFzc05hbWU6XCJwYWdlLWl0ZW0gbGFzdCBcIisodC5jdXJyZW50UGFnZT09PXQudG90YWxQYWdlcz9cImRpc2FibGVkXCI6XCJcIiksc3R5bGU6bi5saX0sYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIse2NsYXNzTmFtZTpcInBhZ2UtbGlua1wiLG9uQ2xpY2s6ZnVuY3Rpb24oKXtyZXR1cm4gZS5zZXRQYWdlKHQudG90YWxQYWdlcyl9LHN0eWxlOm4uYX0sci5sYXN0KSkpfX1dKSx0fSgpO2MucHJvcFR5cGVzPXMsYy5kZWZhdWx0UHJvcHM9e2luaXRpYWxQYWdlOjEscGFnZVNpemU6MTAsbWF4UGFnZXM6MTAsbGFiZWxzOntmaXJzdDpcIkZpcnN0XCIsbGFzdDpcIkxhc3RcIixwcmV2aW91czpcIlByZXZpb3VzXCIsbmV4dDpcIk5leHRcIn19LHQuZGVmYXVsdD1jfSxmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPXIoMil9LGZ1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtcbi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC5wcm9kdWN0aW9uLm1pbi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovdmFyIG49cigzKSxvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmZvcixhPW8/U3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIik6NjAxMDMsdT1vP1N5bWJvbC5mb3IoXCJyZWFjdC5wb3J0YWxcIik6NjAxMDYsbD1vP1N5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKTo2MDEwNyxpPW8/U3ltYm9sLmZvcihcInJlYWN0LnN0cmljdF9tb2RlXCIpOjYwMTA4LHM9bz9TeW1ib2wuZm9yKFwicmVhY3QucHJvZmlsZXJcIik6NjAxMTQsYz1vP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm92aWRlclwiKTo2MDEwOSxmPW8/U3ltYm9sLmZvcihcInJlYWN0LmNvbnRleHRcIik6NjAxMTAscD1vP1N5bWJvbC5mb3IoXCJyZWFjdC5jb25jdXJyZW50X21vZGVcIik6NjAxMTEseT1vP1N5bWJvbC5mb3IoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKTo2MDExMixkPW8/U3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlXCIpOjYwMTEzLG09bz9TeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKTo2MDExNSxnPW8/U3ltYm9sLmZvcihcInJlYWN0LmxhenlcIik6NjAxMTYsYj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5pdGVyYXRvcjtmdW5jdGlvbiB2KGUpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLTEscj1cImh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9lcnJvci1kZWNvZGVyLmh0bWw/aW52YXJpYW50PVwiK2Usbj0wO248dDtuKyspcis9XCImYXJnc1tdPVwiK2VuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbbisxXSk7IWZ1bmN0aW9uKGUsdCxyLG4sbyxhLHUsbCl7aWYoIWUpe2lmKGU9dm9pZCAwLHZvaWQgMD09PXQpZT1FcnJvcihcIk1pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuXCIpO2Vsc2V7dmFyIGk9W3IsbixvLGEsdSxsXSxzPTA7KGU9RXJyb3IodC5yZXBsYWNlKC8lcy9nLGZ1bmN0aW9uKCl7cmV0dXJuIGlbcysrXX0pKSkubmFtZT1cIkludmFyaWFudCBWaW9sYXRpb25cIn10aHJvdyBlLmZyYW1lc1RvUG9wPTEsZX19KCExLFwiTWluaWZpZWQgUmVhY3QgZXJyb3IgI1wiK2UrXCI7IHZpc2l0ICVzIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCBmb3IgZnVsbCBlcnJvcnMgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4gXCIscil9dmFyIGg9e2lzTW91bnRlZDpmdW5jdGlvbigpe3JldHVybiExfSxlbnF1ZXVlRm9yY2VVcGRhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVSZXBsYWNlU3RhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVTZXRTdGF0ZTpmdW5jdGlvbigpe319LFA9e307ZnVuY3Rpb24gXyhlLHQscil7dGhpcy5wcm9wcz1lLHRoaXMuY29udGV4dD10LHRoaXMucmVmcz1QLHRoaXMudXBkYXRlcj1yfHxofWZ1bmN0aW9uIE8oKXt9ZnVuY3Rpb24gUyhlLHQscil7dGhpcy5wcm9wcz1lLHRoaXMuY29udGV4dD10LHRoaXMucmVmcz1QLHRoaXMudXBkYXRlcj1yfHxofV8ucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ9e30sXy5wcm90b3R5cGUuc2V0U3RhdGU9ZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiIT10eXBlb2YgZSYmXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9ZSYmdihcIjg1XCIpLHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcyxlLHQsXCJzZXRTdGF0ZVwiKX0sXy5wcm90b3R5cGUuZm9yY2VVcGRhdGU9ZnVuY3Rpb24oZSl7dGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLGUsXCJmb3JjZVVwZGF0ZVwiKX0sTy5wcm90b3R5cGU9Xy5wcm90b3R5cGU7dmFyIGs9Uy5wcm90b3R5cGU9bmV3IE87ay5jb25zdHJ1Y3Rvcj1TLG4oayxfLnByb3RvdHlwZSksay5pc1B1cmVSZWFjdENvbXBvbmVudD0hMDt2YXIgaj17Y3VycmVudDpudWxsfSx4PXtjdXJyZW50Om51bGx9LHc9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxFPXtrZXk6ITAscmVmOiEwLF9fc2VsZjohMCxfX3NvdXJjZTohMH07ZnVuY3Rpb24gQyhlLHQscil7dmFyIG49dm9pZCAwLG89e30sdT1udWxsLGw9bnVsbDtpZihudWxsIT10KWZvcihuIGluIHZvaWQgMCE9PXQucmVmJiYobD10LnJlZiksdm9pZCAwIT09dC5rZXkmJih1PVwiXCIrdC5rZXkpLHQpdy5jYWxsKHQsbikmJiFFLmhhc093blByb3BlcnR5KG4pJiYob1tuXT10W25dKTt2YXIgaT1hcmd1bWVudHMubGVuZ3RoLTI7aWYoMT09PWkpby5jaGlsZHJlbj1yO2Vsc2UgaWYoMTxpKXtmb3IodmFyIHM9QXJyYXkoaSksYz0wO2M8aTtjKyspc1tjXT1hcmd1bWVudHNbYysyXTtvLmNoaWxkcmVuPXN9aWYoZSYmZS5kZWZhdWx0UHJvcHMpZm9yKG4gaW4gaT1lLmRlZmF1bHRQcm9wcyl2b2lkIDA9PT1vW25dJiYob1tuXT1pW25dKTtyZXR1cm57JCR0eXBlb2Y6YSx0eXBlOmUsa2V5OnUscmVmOmwscHJvcHM6byxfb3duZXI6eC5jdXJyZW50fX1mdW5jdGlvbiBSKGUpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBlJiZudWxsIT09ZSYmZS4kJHR5cGVvZj09PWF9dmFyICQ9L1xcLysvZyxUPVtdO2Z1bmN0aW9uIE0oZSx0LHIsbil7aWYoVC5sZW5ndGgpe3ZhciBvPVQucG9wKCk7cmV0dXJuIG8ucmVzdWx0PWUsby5rZXlQcmVmaXg9dCxvLmZ1bmM9cixvLmNvbnRleHQ9bixvLmNvdW50PTAsb31yZXR1cm57cmVzdWx0OmUsa2V5UHJlZml4OnQsZnVuYzpyLGNvbnRleHQ6bixjb3VudDowfX1mdW5jdGlvbiBOKGUpe2UucmVzdWx0PW51bGwsZS5rZXlQcmVmaXg9bnVsbCxlLmZ1bmM9bnVsbCxlLmNvbnRleHQ9bnVsbCxlLmNvdW50PTAsMTA+VC5sZW5ndGgmJlQucHVzaChlKX1mdW5jdGlvbiBJKGUsdCxyKXtyZXR1cm4gbnVsbD09ZT8wOmZ1bmN0aW9uIGUodCxyLG4sbyl7dmFyIGw9dHlwZW9mIHQ7XCJ1bmRlZmluZWRcIiE9PWwmJlwiYm9vbGVhblwiIT09bHx8KHQ9bnVsbCk7dmFyIGk9ITE7aWYobnVsbD09PXQpaT0hMDtlbHNlIHN3aXRjaChsKXtjYXNlXCJzdHJpbmdcIjpjYXNlXCJudW1iZXJcIjppPSEwO2JyZWFrO2Nhc2VcIm9iamVjdFwiOnN3aXRjaCh0LiQkdHlwZW9mKXtjYXNlIGE6Y2FzZSB1Omk9ITB9fWlmKGkpcmV0dXJuIG4obyx0LFwiXCI9PT1yP1wiLlwiK0EodCwwKTpyKSwxO2lmKGk9MCxyPVwiXCI9PT1yP1wiLlwiOnIrXCI6XCIsQXJyYXkuaXNBcnJheSh0KSlmb3IodmFyIHM9MDtzPHQubGVuZ3RoO3MrKyl7dmFyIGM9citBKGw9dFtzXSxzKTtpKz1lKGwsYyxuLG8pfWVsc2UgaWYoYz1udWxsPT09dHx8XCJvYmplY3RcIiE9dHlwZW9mIHQ/bnVsbDpcImZ1bmN0aW9uXCI9PXR5cGVvZihjPWImJnRbYl18fHRbXCJAQGl0ZXJhdG9yXCJdKT9jOm51bGwsXCJmdW5jdGlvblwiPT10eXBlb2YgYylmb3IodD1jLmNhbGwodCkscz0wOyEobD10Lm5leHQoKSkuZG9uZTspaSs9ZShsPWwudmFsdWUsYz1yK0EobCxzKyspLG4sbyk7ZWxzZVwib2JqZWN0XCI9PT1sJiZ2KFwiMzFcIixcIltvYmplY3QgT2JqZWN0XVwiPT0obj1cIlwiK3QpP1wib2JqZWN0IHdpdGgga2V5cyB7XCIrT2JqZWN0LmtleXModCkuam9pbihcIiwgXCIpK1wifVwiOm4sXCJcIik7cmV0dXJuIGl9KGUsXCJcIix0LHIpfWZ1bmN0aW9uIEEoZSx0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZSYmbnVsbCE9PWUmJm51bGwhPWUua2V5P2Z1bmN0aW9uKGUpe3ZhciB0PXtcIj1cIjpcIj0wXCIsXCI6XCI6XCI9MlwifTtyZXR1cm5cIiRcIisoXCJcIitlKS5yZXBsYWNlKC9bPTpdL2csZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19KX0oZS5rZXkpOnQudG9TdHJpbmcoMzYpfWZ1bmN0aW9uIHEoZSx0KXtlLmZ1bmMuY2FsbChlLmNvbnRleHQsdCxlLmNvdW50KyspfWZ1bmN0aW9uIFUoZSx0LHIpe3ZhciBuPWUucmVzdWx0LG89ZS5rZXlQcmVmaXg7ZT1lLmZ1bmMuY2FsbChlLmNvbnRleHQsdCxlLmNvdW50KyspLEFycmF5LmlzQXJyYXkoZSk/RChlLG4scixmdW5jdGlvbihlKXtyZXR1cm4gZX0pOm51bGwhPWUmJihSKGUpJiYoZT1mdW5jdGlvbihlLHQpe3JldHVybnskJHR5cGVvZjphLHR5cGU6ZS50eXBlLGtleTp0LHJlZjplLnJlZixwcm9wczplLnByb3BzLF9vd25lcjplLl9vd25lcn19KGUsbysoIWUua2V5fHx0JiZ0LmtleT09PWUua2V5P1wiXCI6KFwiXCIrZS5rZXkpLnJlcGxhY2UoJCxcIiQmL1wiKStcIi9cIikrcikpLG4ucHVzaChlKSl9ZnVuY3Rpb24gRChlLHQscixuLG8pe3ZhciBhPVwiXCI7bnVsbCE9ciYmKGE9KFwiXCIrcikucmVwbGFjZSgkLFwiJCYvXCIpK1wiL1wiKSxJKGUsVSx0PU0odCxhLG4sbykpLE4odCl9ZnVuY3Rpb24gTCgpe3ZhciBlPWouY3VycmVudDtyZXR1cm4gbnVsbD09PWUmJnYoXCIzMjFcIiksZX12YXIgRj17Q2hpbGRyZW46e21hcDpmdW5jdGlvbihlLHQscil7aWYobnVsbD09ZSlyZXR1cm4gZTt2YXIgbj1bXTtyZXR1cm4gRChlLG4sbnVsbCx0LHIpLG59LGZvckVhY2g6ZnVuY3Rpb24oZSx0LHIpe2lmKG51bGw9PWUpcmV0dXJuIGU7SShlLHEsdD1NKG51bGwsbnVsbCx0LHIpKSxOKHQpfSxjb3VudDpmdW5jdGlvbihlKXtyZXR1cm4gSShlLGZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LG51bGwpfSx0b0FycmF5OmZ1bmN0aW9uKGUpe3ZhciB0PVtdO3JldHVybiBEKGUsdCxudWxsLGZ1bmN0aW9uKGUpe3JldHVybiBlfSksdH0sb25seTpmdW5jdGlvbihlKXtyZXR1cm4gUihlKXx8dihcIjE0M1wiKSxlfX0sY3JlYXRlUmVmOmZ1bmN0aW9uKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19LENvbXBvbmVudDpfLFB1cmVDb21wb25lbnQ6UyxjcmVhdGVDb250ZXh0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHZvaWQgMD09PXQmJih0PW51bGwpLChlPXskJHR5cGVvZjpmLF9jYWxjdWxhdGVDaGFuZ2VkQml0czp0LF9jdXJyZW50VmFsdWU6ZSxfY3VycmVudFZhbHVlMjplLF90aHJlYWRDb3VudDowLFByb3ZpZGVyOm51bGwsQ29uc3VtZXI6bnVsbH0pLlByb3ZpZGVyPXskJHR5cGVvZjpjLF9jb250ZXh0OmV9LGUuQ29uc3VtZXI9ZX0sZm9yd2FyZFJlZjpmdW5jdGlvbihlKXtyZXR1cm57JCR0eXBlb2Y6eSxyZW5kZXI6ZX19LGxhenk6ZnVuY3Rpb24oZSl7cmV0dXJueyQkdHlwZW9mOmcsX2N0b3I6ZSxfc3RhdHVzOi0xLF9yZXN1bHQ6bnVsbH19LG1lbW86ZnVuY3Rpb24oZSx0KXtyZXR1cm57JCR0eXBlb2Y6bSx0eXBlOmUsY29tcGFyZTp2b2lkIDA9PT10P251bGw6dH19LHVzZUNhbGxiYWNrOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwoKS51c2VDYWxsYmFjayhlLHQpfSx1c2VDb250ZXh0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwoKS51c2VDb250ZXh0KGUsdCl9LHVzZUVmZmVjdDpmdW5jdGlvbihlLHQpe3JldHVybiBMKCkudXNlRWZmZWN0KGUsdCl9LHVzZUltcGVyYXRpdmVIYW5kbGU6ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBMKCkudXNlSW1wZXJhdGl2ZUhhbmRsZShlLHQscil9LHVzZURlYnVnVmFsdWU6ZnVuY3Rpb24oKXt9LHVzZUxheW91dEVmZmVjdDpmdW5jdGlvbihlLHQpe3JldHVybiBMKCkudXNlTGF5b3V0RWZmZWN0KGUsdCl9LHVzZU1lbW86ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCgpLnVzZU1lbW8oZSx0KX0sdXNlUmVkdWNlcjpmdW5jdGlvbihlLHQscil7cmV0dXJuIEwoKS51c2VSZWR1Y2VyKGUsdCxyKX0sdXNlUmVmOmZ1bmN0aW9uKGUpe3JldHVybiBMKCkudXNlUmVmKGUpfSx1c2VTdGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gTCgpLnVzZVN0YXRlKGUpfSxGcmFnbWVudDpsLFN0cmljdE1vZGU6aSxTdXNwZW5zZTpkLGNyZWF0ZUVsZW1lbnQ6QyxjbG9uZUVsZW1lbnQ6ZnVuY3Rpb24oZSx0LHIpe251bGw9PWUmJnYoXCIyNjdcIixlKTt2YXIgbz12b2lkIDAsdT1uKHt9LGUucHJvcHMpLGw9ZS5rZXksaT1lLnJlZixzPWUuX293bmVyO2lmKG51bGwhPXQpe3ZvaWQgMCE9PXQucmVmJiYoaT10LnJlZixzPXguY3VycmVudCksdm9pZCAwIT09dC5rZXkmJihsPVwiXCIrdC5rZXkpO3ZhciBjPXZvaWQgMDtmb3IobyBpbiBlLnR5cGUmJmUudHlwZS5kZWZhdWx0UHJvcHMmJihjPWUudHlwZS5kZWZhdWx0UHJvcHMpLHQpdy5jYWxsKHQsbykmJiFFLmhhc093blByb3BlcnR5KG8pJiYodVtvXT12b2lkIDA9PT10W29dJiZ2b2lkIDAhPT1jP2Nbb106dFtvXSl9aWYoMT09PShvPWFyZ3VtZW50cy5sZW5ndGgtMikpdS5jaGlsZHJlbj1yO2Vsc2UgaWYoMTxvKXtjPUFycmF5KG8pO2Zvcih2YXIgZj0wO2Y8bztmKyspY1tmXT1hcmd1bWVudHNbZisyXTt1LmNoaWxkcmVuPWN9cmV0dXJueyQkdHlwZW9mOmEsdHlwZTplLnR5cGUsa2V5OmwscmVmOmkscHJvcHM6dSxfb3duZXI6c319LGNyZWF0ZUZhY3Rvcnk6ZnVuY3Rpb24oZSl7dmFyIHQ9Qy5iaW5kKG51bGwsZSk7cmV0dXJuIHQudHlwZT1lLHR9LGlzVmFsaWRFbGVtZW50OlIsdmVyc2lvbjpcIjE2LjguNlwiLHVuc3RhYmxlX0NvbmN1cnJlbnRNb2RlOnAsdW5zdGFibGVfUHJvZmlsZXI6cyxfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDp7UmVhY3RDdXJyZW50RGlzcGF0Y2hlcjpqLFJlYWN0Q3VycmVudE93bmVyOngsYXNzaWduOm59fSx6PXtkZWZhdWx0OkZ9LFY9eiYmRnx8ejtlLmV4cG9ydHM9Vi5kZWZhdWx0fHxWfSxmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7XG4vKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi92YXIgbj1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLG89T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxhPU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7ZS5leHBvcnRzPWZ1bmN0aW9uKCl7dHJ5e2lmKCFPYmplY3QuYXNzaWduKXJldHVybiExO3ZhciBlPW5ldyBTdHJpbmcoXCJhYmNcIik7aWYoZVs1XT1cImRlXCIsXCI1XCI9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKVswXSlyZXR1cm4hMTtmb3IodmFyIHQ9e30scj0wO3I8MTA7cisrKXRbXCJfXCIrU3RyaW5nLmZyb21DaGFyQ29kZShyKV09cjtpZihcIjAxMjM0NTY3ODlcIiE9PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHQpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0pLmpvaW4oXCJcIikpcmV0dXJuITE7dmFyIG49e307cmV0dXJuXCJhYmNkZWZnaGlqa2xtbm9wcXJzdFwiLnNwbGl0KFwiXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7bltlXT1lfSksXCJhYmNkZWZnaGlqa2xtbm9wcXJzdFwiPT09T2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSxuKSkuam9pbihcIlwiKX1jYXRjaChlKXtyZXR1cm4hMX19KCk/T2JqZWN0LmFzc2lnbjpmdW5jdGlvbihlLHQpe2Zvcih2YXIgcix1LGw9ZnVuY3Rpb24oZSl7aWYobnVsbD09ZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWRcIik7cmV0dXJuIE9iamVjdChlKX0oZSksaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe2Zvcih2YXIgcyBpbiByPU9iamVjdChhcmd1bWVudHNbaV0pKW8uY2FsbChyLHMpJiYobFtzXT1yW3NdKTtpZihuKXt1PW4ocik7Zm9yKHZhciBjPTA7Yzx1Lmxlbmd0aDtjKyspYS5jYWxsKHIsdVtjXSkmJihsW3VbY11dPXJbdVtjXV0pfX1yZXR1cm4gbH19LGZ1bmN0aW9uKGUsdCxyKXtlLmV4cG9ydHM9cig1KSgpfSxmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49cig2KTtmdW5jdGlvbiBvKCl7fWZ1bmN0aW9uIGEoKXt9YS5yZXNldFdhcm5pbmdDYWNoZT1vLGUuZXhwb3J0cz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LHIsbyxhLHUpe2lmKHUhPT1uKXt2YXIgbD1uZXcgRXJyb3IoXCJDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiBVc2UgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKCkgdG8gY2FsbCB0aGVtLiBSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzXCIpO3Rocm93IGwubmFtZT1cIkludmFyaWFudCBWaW9sYXRpb25cIixsfX1mdW5jdGlvbiB0KCl7cmV0dXJuIGV9ZS5pc1JlcXVpcmVkPWU7dmFyIHI9e2FycmF5OmUsYm9vbDplLGZ1bmM6ZSxudW1iZXI6ZSxvYmplY3Q6ZSxzdHJpbmc6ZSxzeW1ib2w6ZSxhbnk6ZSxhcnJheU9mOnQsZWxlbWVudDplLGVsZW1lbnRUeXBlOmUsaW5zdGFuY2VPZjp0LG5vZGU6ZSxvYmplY3RPZjp0LG9uZU9mOnQsb25lT2ZUeXBlOnQsc2hhcGU6dCxleGFjdDp0LGNoZWNrUHJvcFR5cGVzOmEscmVzZXRXYXJuaW5nQ2FjaGU6b307cmV0dXJuIHIuUHJvcFR5cGVzPXIscn19LGZ1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtlLmV4cG9ydHM9XCJTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRFwifSxmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxyLG4pe3ZvaWQgMD09PXQmJih0PTEpLHZvaWQgMD09PXImJihyPTEwKSx2b2lkIDA9PT1uJiYobj0xMCk7dmFyIG8sYSx1PU1hdGguY2VpbChlL3IpO2lmKHQ8MT90PTE6dD51JiYodD11KSx1PD1uKW89MSxhPXU7ZWxzZXt2YXIgbD1NYXRoLmZsb29yKG4vMiksaT1NYXRoLmNlaWwobi8yKS0xO3Q8PWw/KG89MSxhPW4pOnQraT49dT8obz11LW4rMSxhPXUpOihvPXQtbCxhPXQraSl9dmFyIHM9KHQtMSkqcixjPU1hdGgubWluKHMrci0xLGUtMSksZj1BcnJheS5mcm9tKEFycmF5KGErMS1vKS5rZXlzKCkpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gbytlfSk7cmV0dXJue3RvdGFsSXRlbXM6ZSxjdXJyZW50UGFnZTp0LHBhZ2VTaXplOnIsdG90YWxQYWdlczp1LHN0YXJ0UGFnZTpvLGVuZFBhZ2U6YSxzdGFydEluZGV4OnMsZW5kSW5kZXg6YyxwYWdlczpmfX19XSk7IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjguNlxuICogcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7XG52YXIgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUpO1xufVxuXG4vKipcbiAqIEZvcmtlZCBmcm9tIGZianMvd2FybmluZzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvZTY2YmEyMGFkNWJlNDMzZWI1NDQyM2YyYjA5N2Q4MjkzMjRkOWRlNi9wYWNrYWdlcy9mYmpzL3NyYy9fX2ZvcmtzX18vd2FybmluZy5qc1xuICpcbiAqIE9ubHkgY2hhbmdlIGlzIHdlIHVzZSBjb25zb2xlLndhcm4gaW5zdGVhZCBvZiBjb25zb2xlLmVycm9yLFxuICogYW5kIGRvIG5vdGhpbmcgd2hlbiAnY29uc29sZScgaXMgbm90IHN1cHBvcnRlZC5cbiAqIFRoaXMgcmVhbGx5IHNpbXBsaWZpZXMgdGhlIGNvZGUuXG4gKiAtLS1cbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bsb3dQcmlvcml0eVdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nJDEgPSBsb3dQcmlvcml0eVdhcm5pbmc7XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgJCR0eXBlb2ZUeXBlID0gdHlwZSAmJiB0eXBlLiQkdHlwZW9mO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCQkdHlwZW9mVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxudmFyIEFzeW5jTW9kZSA9IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbnZhciBDb25jdXJyZW50TW9kZSA9IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xudmFyIENvbnRleHRDb25zdW1lciA9IFJFQUNUX0NPTlRFWFRfVFlQRTtcbnZhciBDb250ZXh0UHJvdmlkZXIgPSBSRUFDVF9QUk9WSURFUl9UWVBFO1xudmFyIEVsZW1lbnQgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG52YXIgRm9yd2FyZFJlZiA9IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG52YXIgRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xudmFyIExhenkgPSBSRUFDVF9MQVpZX1RZUEU7XG52YXIgTWVtbyA9IFJFQUNUX01FTU9fVFlQRTtcbnZhciBQb3J0YWwgPSBSRUFDVF9QT1JUQUxfVFlQRTtcbnZhciBQcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG52YXIgU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG52YXIgU3VzcGVuc2UgPSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xuXG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTtcblxuLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5mdW5jdGlvbiBpc0FzeW5jTW9kZShvYmplY3QpIHtcbiAge1xuICAgIGlmICghaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUpIHtcbiAgICAgIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gdHJ1ZTtcbiAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMudHlwZU9mID0gdHlwZU9mO1xuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy5pc0FzeW5jTW9kZSA9IGlzQXN5bmNNb2RlO1xuZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlID0gaXNDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXIgPSBpc0NvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXIgPSBpc0NvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuaXNFbGVtZW50ID0gaXNFbGVtZW50O1xuZXhwb3J0cy5pc0ZvcndhcmRSZWYgPSBpc0ZvcndhcmRSZWY7XG5leHBvcnRzLmlzRnJhZ21lbnQgPSBpc0ZyYWdtZW50O1xuZXhwb3J0cy5pc0xhenkgPSBpc0xhenk7XG5leHBvcnRzLmlzTWVtbyA9IGlzTWVtbztcbmV4cG9ydHMuaXNQb3J0YWwgPSBpc1BvcnRhbDtcbmV4cG9ydHMuaXNQcm9maWxlciA9IGlzUHJvZmlsZXI7XG5leHBvcnRzLmlzU3RyaWN0TW9kZSA9IGlzU3RyaWN0TW9kZTtcbmV4cG9ydHMuaXNTdXNwZW5zZSA9IGlzU3VzcGVuc2U7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb25lbnRzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb3NlXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJpc1NoYWxsb3dFcXVhbFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImxvZGFzaFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
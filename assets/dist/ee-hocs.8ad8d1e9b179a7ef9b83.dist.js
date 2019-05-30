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

/***/ "./assets/src/higher-order-components/editor-modal/index.js":
/*!******************************************************************!*\
  !*** ./assets/src/higher-order-components/editor-modal/index.js ***!
  \******************************************************************/
/*! exports provided: withEditor, withEditorModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _with_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./with-editor */ "./assets/src/higher-order-components/editor-modal/with-editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditor", function() { return _with_editor__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _with_editor_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./with-editor-modal */ "./assets/src/higher-order-components/editor-modal/with-editor-modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditorModal", function() { return _with_editor_modal__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./assets/src/higher-order-components/editor-modal/style.css":
/*!*******************************************************************!*\
  !*** ./assets/src/higher-order-components/editor-modal/style.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"components-modal__frame":"components-modal__frame","ee-editor-modal":"ee-editor-modal","components-modal__content":"components-modal__content","components-modal__header":"components-modal__header","components-modal__header-heading":"components-modal__header-heading"};

/***/ }),

/***/ "./assets/src/higher-order-components/editor-modal/with-editor-modal.js":
/*!******************************************************************************!*\
  !*** ./assets/src/higher-order-components/editor-modal/with-editor-modal.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./assets/src/higher-order-components/editor-modal/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_5__);




/**
 * External Imports
 */



/**
 * Internal Imports
 */


/**
 * withEditorModal
 * HOC for wrapping a component with a WP Modal component
 *
 * @constructor
 * @param {Object} mainModalProps
 */

var withEditorModal = function withEditorModal(mainModalProps) {
  return function (WrappedComponent) {
    return function (_ref) {
      var editorOpen = _ref.editorOpen,
          _ref$toggleEditor = _ref.toggleEditor,
          toggleEditor = _ref$toggleEditor === void 0 ? function () {
        return null;
      } : _ref$toggleEditor,
          _ref$doRefresh = _ref.doRefresh,
          doRefresh = _ref$doRefresh === void 0 ? function () {
        return null;
      } : _ref$doRefresh,
          modalProps = _ref.modalProps,
          id = _ref.id,
          buttonLabel = _ref.buttonLabel,
          _ref$onClose = _ref.onClose,
          onClose = _ref$onClose === void 0 ? function () {
        return null;
      } : _ref$onClose,
          _ref$onOpen = _ref.onOpen,
          onOpen = _ref$onOpen === void 0 ? function () {
        return null;
      } : _ref$onOpen,
          passedProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["editorOpen", "toggleEditor", "doRefresh", "modalProps", "id", "buttonLabel", "onClose", "onOpen"]);

      Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
        if (editorOpen) {
          onOpen();
        }
      }, [editorOpen, onOpen]);
      var closeAction = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
        Object(lodash__WEBPACK_IMPORTED_MODULE_3__["flow"])([doRefresh, toggleEditor, onClose])();
      }, [toggleEditor, doRefresh, onClose]);
      modalProps = modalProps ? modalProps : mainModalProps;

      var _modalProps = modalProps,
          title = _modalProps.title,
          customClass = _modalProps.customClass,
          closeButtonLabel = _modalProps.closeButtonLabel,
          extraModalProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_modalProps, ["title", "customClass", "closeButtonLabel"]);

      id = id ? id : Object(lodash__WEBPACK_IMPORTED_MODULE_3__["uniqueId"])('ee-editor-modal-');
      buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
      return editorOpen ? React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__["Modal"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        id: id,
        title: title,
        className: "ee-editor-modal ".concat(customClass),
        onRequestClose: closeAction,
        closeButtonLabel: buttonLabel
      }, extraModalProps), React.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        editorOpen: editorOpen,
        toggleEditor: toggleEditor
      }, passedProps))) : null;
    };
  };
};

/* harmony default export */ __webpack_exports__["default"] = (withEditorModal);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/editor-modal/with-editor.js":
/*!************************************************************************!*\
  !*** ./assets/src/higher-order-components/editor-modal/with-editor.js ***!
  \************************************************************************/
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
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_9__);










/**
 * External imports
 */


/**
 * withEditor
 * controls toggling of the withEditorModal HOC
 * wraps the component that contains the withEditorModal
 *
 * @function
 */

var withEditor = Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_9__["createHigherOrderComponent"])(function (OriginalComponent) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(_temp, _Component);

    function _temp(props) {
      var _this;

      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, _temp);

      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(_temp).call(this, props));

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "toggleEditor", function () {
        _this.setState(function (prevState) {
          return {
            editorOpen: !prevState.editorOpen
          };
        });
      });

      _this.state = {
        editorOpen: false
      };
      return _this;
    }
    /**
     * opens and closes withEditorModal
     *
     * @function
     */


    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(_temp, [{
      key: "render",
      value: function render() {
        return React.createElement(OriginalComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
          editorOpen: this.state.editorOpen,
          toggleEditor: this.toggleEditor
        }));
      }
    }]);

    return _temp;
  }(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["Component"]), _temp;
}, 'withEditor');
/* harmony default export */ __webpack_exports__["default"] = (withEditor);
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
/*! exports provided: withBaseControl, withEditor, withEditorModal, PaginatedEntityListWithFilterBar, PaginatedEntityListWithFilterBarAndState, EntityListFilterBar, withMoney, withLatestCheckin, withEntityPagination, withFormContainerAndPlaceholder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./assets/src/higher-order-components/base-control.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withBaseControl", function() { return _base_control__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/higher-order-components/editor-modal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_1__["withEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_1__["withEditorModal"]; });

/* harmony import */ var _filter_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter-bar */ "./assets/src/higher-order-components/filter-bar/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginatedEntityListWithFilterBar", function() { return _filter_bar__WEBPACK_IMPORTED_MODULE_2__["PaginatedEntityListWithFilterBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginatedEntityListWithFilterBarAndState", function() { return _filter_bar__WEBPACK_IMPORTED_MODULE_2__["PaginatedEntityListWithFilterBarAndState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityListFilterBar", function() { return _filter_bar__WEBPACK_IMPORTED_MODULE_2__["EntityListFilterBar"]; });

/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./money */ "./assets/src/higher-order-components/money.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withMoney", function() { return _money__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _with_latest_checkin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./with-latest-checkin */ "./assets/src/higher-order-components/with-latest-checkin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withLatestCheckin", function() { return _with_latest_checkin__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pagination */ "./assets/src/higher-order-components/pagination/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEntityPagination", function() { return _pagination__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _with_form_container_and_placeholder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./with-form-container-and-placeholder */ "./assets/src/higher-order-components/with-form-container-and-placeholder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withFormContainerAndPlaceholder", function() { return _with_form_container_and_placeholder__WEBPACK_IMPORTED_MODULE_6__["default"]; });









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
!(function webpackMissingModule() { var e = new Error("Cannot find module 'jw-react-pagination'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
          }, React.createElement(!(function webpackMissingModule() { var e = new Error("Cannot find module 'jw-react-pagination'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
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

/***/ "./assets/src/higher-order-components/with-form-container-and-placeholder.js":
/*!***********************************************************************************!*\
  !*** ./assets/src/higher-order-components/with-form-container-and-placeholder.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_8__);








/**
 * External imports
 */



/**
 * withFormContainerAndPlaceholder
 * Higher-Order-Component that wraps an Espresso Form component
 * with a FormContainer component and adds a FormPlaceholder
 * for displaying a loading notice
 *
 * @param {Object} Form
 * @return {Object} Form with added FormContainer and FormPlaceholder
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__["createHigherOrderComponent"])(function (Form) {
  return (
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
              loading = _this$props.loading,
              notice = _this$props.notice,
              formProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default()(_this$props, ["loading", "notice"]);

          return React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, React.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_8__["FormPlaceholder"], {
            loading: loading,
            notice: notice
          }), React.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_8__["FormContainer"], {
            loading: loading
          }, React.createElement(Form, formProps)));
        }
      }]);

      return _class;
    }(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["Component"])
  );
}, 'withFormContainerAndPlaceholder'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

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

/***/ "@eventespresso/components":
/*!**********************************!*\
  !*** external "eejs.components" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.components;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvYmFzZS1jb250cm9sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9lZGl0b3ItbW9kYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2VkaXRvci1tb2RhbC9zdHlsZS5jc3M/MjQ2YyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvZWRpdG9yLW1vZGFsL3dpdGgtZWRpdG9yLW1vZGFsLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9lZGl0b3ItbW9kYWwvd2l0aC1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2ZpbHRlci1iYXIvZW50aXR5LWxpc3QtZmlsdGVyLWJhci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvZmlsdGVyLWJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvZmlsdGVyLWJhci9zdHlsZS5jc3M/MjFmMiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvZmlsdGVyLWJhci93aXRoLWVudGl0eS1saXN0LWZpbHRlci1iYXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2ZpbHRlci1iYXIvd2l0aC1lbnRpdHktbGlzdC1maWx0ZXItc3RhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9tb25leS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvcGFnaW5hdGlvbi9zdHlsZS5jc3M/NzBlMyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvd2l0aC1mb3JtLWNvbnRhaW5lci1hbmQtcGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL3dpdGgtbGF0ZXN0LWNoZWNraW4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwvYXJyYXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLmNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMuaTE4blwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52YWxpZGF0b3JzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZhbHVlT2JqZWN0c1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwid3AuY29tcG9uZW50c1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwid3AuY29tcG9zZVwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwid3AuZGF0YVwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwid3AuZWxlbWVudFwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJSZWFjdFwiIl0sIm5hbWVzIjpbImN1c3RvbUlkIiwiY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQiLCJjb21wb3NlIiwid2l0aEluc3RhbmNlSWQiLCJXcmFwcGVkQ29tcG9uZW50IiwicHJvcHMiLCJsYWJlbCIsImluc3RhbmNlSWQiLCJjbGFzc05hbWUiLCJoZWxwIiwiaWQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJkZWZhdWx0UHJvcHMiLCJ3aXRoRWRpdG9yTW9kYWwiLCJtYWluTW9kYWxQcm9wcyIsImVkaXRvck9wZW4iLCJ0b2dnbGVFZGl0b3IiLCJkb1JlZnJlc2giLCJtb2RhbFByb3BzIiwiYnV0dG9uTGFiZWwiLCJvbkNsb3NlIiwib25PcGVuIiwicGFzc2VkUHJvcHMiLCJ1c2VFZmZlY3QiLCJjbG9zZUFjdGlvbiIsInVzZUNhbGxiYWNrIiwiZmxvdyIsInRpdGxlIiwiY3VzdG9tQ2xhc3MiLCJjbG9zZUJ1dHRvbkxhYmVsIiwiZXh0cmFNb2RhbFByb3BzIiwidW5pcXVlSWQiLCJ3aXRoRWRpdG9yIiwiT3JpZ2luYWxDb21wb25lbnQiLCJzZXRTdGF0ZSIsInByZXZTdGF0ZSIsInN0YXRlIiwiRW50aXR5TGlzdEZpbHRlckJhciIsInNlYXJjaFRleHQiLCJzZXRTZWFyY2hUZXh0IiwiaXNGdW5jdGlvbiIsIl9fIiwicGVyUGFnZSIsInNldFBlclBhZ2UiLCJ2YWx1ZSIsInZpZXciLCJzZXRMaXN0VmlldyIsInNldEdyaWRWaWV3IiwiZW50aXR5RmlsdGVycyIsInNlYXJjaCIsImxpc3RWaWV3IiwiZ3JpZFZpZXciLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZnVuYyIsIlBhZ2luYXRlZEVudGl0eUxpc3RXaXRoRmlsdGVyQmFyIiwiRW50aXR5TGlzdCIsInBhZ2luYXRpb25Db25maWciLCJ3aXRoRW50aXR5TGlzdEZpbHRlckJhciIsIndpdGhFbnRpdHlQYWdpbmF0aW9uIiwiUGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXJBbmRTdGF0ZSIsIndpdGhFbnRpdHlMaXN0RmlsdGVyU3RhdGUiLCJlbnRpdGllcyIsImZpbHRlciIsImVudGl0eSIsImVudGl0eU5hbWUiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJvdGhlclByb3BzIiwic2VhcmNoRW50aXRpZXMiLCJ3aXRoU2VsZWN0Iiwic2VsZWN0Iiwib3duUHJvcHMiLCJzdG9yZSIsImdldEZpbHRlciIsInBhcnNlSW50Iiwid2l0aERpc3BhdGNoIiwiZGlzcGF0Y2giLCJzZXRGaWx0ZXIiLCJhcnJheU9mIiwidmFsaWRhdGVOZXh0U3RhdGUiLCJuZXh0U3RhdGVSZXNwb25zZSIsIndhcm5pbmciLCJoYXNPd25Qcm9wZXJ0eSIsImlzQXJyYXkiLCJjb252ZXJ0ZWRWYWx1ZXMiLCJ3aXRoTW9uZXkiLCJwcm9wTmFtZU1hcCIsIkVuaGFuY2VkQ29tcG9uZW50IiwibmV4dFN0YXRlIiwiTW9uZXkiLCJmb3JFYWNoIiwicHJvcE5hbWUiLCJTaXRlQ3VycmVuY3kiLCJwdXNoIiwidG9OdW1iZXIiLCJwcmV2UHJvcHMiLCJpc1NoYWxsb3dFcXVhbEFycmF5cyIsImdldE5leHRTdGF0ZSIsInNob3VsZFVwZGF0ZVN0YXRlV2l0aENvbnZlcnRlZFZhbHVlcyIsImVudGl0eVBhZ2UiLCJuZXh0UHJvcHMiLCJpc0VxdWFsIiwiZW50aXRpZXNQZXJQYWdlIiwicG9zaXRpb24iLCJsYWJlbHMiLCJmaXJzdCIsImxhc3QiLCJwcmV2aW91cyIsIm5leHQiLCJub1Jlc3VsdHNUZXh0IiwicmV0dXJuQXNQcm9wIiwicGFnaW5hdGlvbiIsIm9uUGFnaW5hdGlvbkNoYW5nZSIsInRvcFBhZ2luYXRpb24iLCJib3R0b21QYWdpbmF0aW9uIiwiYXJyYXkiLCJGb3JtIiwibG9hZGluZyIsIm5vdGljZSIsImZvcm1Qcm9wcyIsIndpdGhMYXRlc3RDaGVja2luIiwicmVnaXN0cmF0aW9uIiwiZGF0ZXRpbWVJZCIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwiZ2V0TGF0ZXN0Q2hlY2tpbiIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsImNoZWNrSW5FbnRpdHkiLCJjaGVja2luRW50aXR5IiwiaGFzUmVzb2x2ZWRDaGVja2luIiwidG9nZ2xlQ2hlY2tpbiIsIm9uQ2xpY2siXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7OztBQUdBO0FBS0E7QUFDQTtBQUVBOzs7O0FBR0E7QUFFZTtBQUFBLE1BQUVBLFFBQUYs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O0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFxQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDLDRGQUE0RixTQUFNO0FBQzdJO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzdEQSxpQzs7Ozs7Ozs7Ozs7QUNBQSwyQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSw0Qjs7Ozs7Ozs7Ozs7QUNBQSx5Qjs7Ozs7Ozs7Ozs7QUNBQSw0Qjs7Ozs7Ozs7Ozs7QUNBQSx3Qjs7Ozs7Ozs7Ozs7QUNBQSx1QiIsImZpbGUiOiJlZS1ob2NzLjhhZDhkMWU5YjE3OWE3ZWY5YjgzLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIFdvcmRQcmVzcyBJbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGNvbXBvc2UsXG5cdGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50LFxuXHR3aXRoSW5zdGFuY2VJZCxcbn0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBCYXNlQ29udHJvbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoIGN1c3RvbUlkID0gJycgKSA9PiBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0Y29tcG9zZSggW1xuXHRcdHdpdGhJbnN0YW5jZUlkLFxuXHRcdCggV3JhcHBlZENvbXBvbmVudCApID0+IHtcblx0XHRcdHJldHVybiBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0XHRcdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0XHRcdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHRcdFx0aW5zdGFuY2VJZDogUHJvcFR5cGVzLm9uZU9mVHlwZSggW1xuXHRcdFx0XHRcdFx0UHJvcFR5cGVzLm51bWJlcixcblx0XHRcdFx0XHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHRcdFx0XSApLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdFx0XHRoZWxwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0XHRcdFx0bGFiZWw6IFdyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzICYmXG5cdFx0XHRcdFx0XHRXcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcy5sYWJlbCA/XG5cdFx0XHRcdFx0XHRXcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcy5sYWJlbCA6XG5cdFx0XHRcdFx0XHQnJyxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0bGFiZWwsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZUlkLFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lLFxuXHRcdFx0XHRcdFx0aGVscCxcblx0XHRcdFx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRcdFx0XHRjb25zdCBpZCA9IGBpbnNwZWN0b3ItJHsgY3VzdG9tSWQgfS1jb250cm9sLSR7IGluc3RhbmNlSWQgfWA7XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxCYXNlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17IGxhYmVsIH1cblx0XHRcdFx0XHRcdFx0aWQ9eyBpZCB9XG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9XG5cdFx0XHRcdFx0XHRcdGhlbHA9eyBoZWxwIH1cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0PFdyYXBwZWRDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gbGFiZWw9eyAnJyB9IGlkPXsgaWQgfSAvPlxuXHRcdFx0XHRcdFx0PC9CYXNlQ29udHJvbD5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cdF0gKSxcblx0J3dpdGhCYXNlQ29udHJvbCdcbik7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhFZGl0b3IgfSBmcm9tICcuL3dpdGgtZWRpdG9yJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aEVkaXRvck1vZGFsIH0gZnJvbSAnLi93aXRoLWVkaXRvci1tb2RhbCc7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiY29tcG9uZW50cy1tb2RhbF9fZnJhbWVcIjpcImNvbXBvbmVudHMtbW9kYWxfX2ZyYW1lXCIsXCJlZS1lZGl0b3ItbW9kYWxcIjpcImVlLWVkaXRvci1tb2RhbFwiLFwiY29tcG9uZW50cy1tb2RhbF9fY29udGVudFwiOlwiY29tcG9uZW50cy1tb2RhbF9fY29udGVudFwiLFwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyXCI6XCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXJcIixcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlci1oZWFkaW5nXCI6XCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXItaGVhZGluZ1wifTsiLCIvKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyB1bmlxdWVJZCwgZmxvdyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5cbi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuLyoqXG4gKiB3aXRoRWRpdG9yTW9kYWxcbiAqIEhPQyBmb3Igd3JhcHBpbmcgYSBjb21wb25lbnQgd2l0aCBhIFdQIE1vZGFsIGNvbXBvbmVudFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG1haW5Nb2RhbFByb3BzXG4gKi9cbmNvbnN0IHdpdGhFZGl0b3JNb2RhbCA9ICggbWFpbk1vZGFsUHJvcHMgKSA9PiAoIFdyYXBwZWRDb21wb25lbnQgKSA9PlxuXHQoIHtcblx0XHRlZGl0b3JPcGVuLFxuXHRcdHRvZ2dsZUVkaXRvciA9ICgpID0+IG51bGwsXG5cdFx0ZG9SZWZyZXNoID0gKCkgPT4gbnVsbCxcblx0XHRtb2RhbFByb3BzLFxuXHRcdGlkLFxuXHRcdGJ1dHRvbkxhYmVsLFxuXHRcdG9uQ2xvc2UgPSAoKSA9PiBudWxsLFxuXHRcdG9uT3BlbiA9ICgpID0+IG51bGwsXG5cdFx0Li4ucGFzc2VkUHJvcHNcblx0fSApID0+IHtcblx0XHR1c2VFZmZlY3QoICgpID0+IHtcblx0XHRcdGlmICggZWRpdG9yT3BlbiApIHtcblx0XHRcdFx0b25PcGVuKCk7XG5cdFx0XHR9XG5cdFx0fSwgWyBlZGl0b3JPcGVuLCBvbk9wZW4gXSApO1xuXHRcdGNvbnN0IGNsb3NlQWN0aW9uID0gdXNlQ2FsbGJhY2soICgpID0+IHtcblx0XHRcdGZsb3coIFsgZG9SZWZyZXNoLCB0b2dnbGVFZGl0b3IsIG9uQ2xvc2UgXSApKCk7XG5cdFx0fSwgWyB0b2dnbGVFZGl0b3IsIGRvUmVmcmVzaCwgb25DbG9zZSBdICk7XG5cdFx0bW9kYWxQcm9wcyA9IG1vZGFsUHJvcHMgP1xuXHRcdFx0bW9kYWxQcm9wcyA6XG5cdFx0XHRtYWluTW9kYWxQcm9wcztcblx0XHRjb25zdCB7XG5cdFx0XHR0aXRsZSxcblx0XHRcdGN1c3RvbUNsYXNzLFxuXHRcdFx0Y2xvc2VCdXR0b25MYWJlbCxcblx0XHRcdC4uLmV4dHJhTW9kYWxQcm9wc1xuXHRcdH0gPSBtb2RhbFByb3BzO1xuXHRcdGlkID0gaWQgPyBpZCA6IHVuaXF1ZUlkKCAnZWUtZWRpdG9yLW1vZGFsLScgKTtcblx0XHRidXR0b25MYWJlbCA9IGJ1dHRvbkxhYmVsID8gYnV0dG9uTGFiZWwgOiBjbG9zZUJ1dHRvbkxhYmVsO1xuXHRcdHJldHVybiBlZGl0b3JPcGVuID8gKFxuXHRcdFx0PE1vZGFsXG5cdFx0XHRcdGlkPXsgaWQgfVxuXHRcdFx0XHR0aXRsZT17IHRpdGxlIH1cblx0XHRcdFx0Y2xhc3NOYW1lPXsgYGVlLWVkaXRvci1tb2RhbCAkeyBjdXN0b21DbGFzcyB9YCB9XG5cdFx0XHRcdG9uUmVxdWVzdENsb3NlPXsgY2xvc2VBY3Rpb24gfVxuXHRcdFx0XHRjbG9zZUJ1dHRvbkxhYmVsPXsgYnV0dG9uTGFiZWwgfVxuXHRcdFx0XHR7IC4uLmV4dHJhTW9kYWxQcm9wcyB9XG5cdFx0XHQ+XG5cdFx0XHRcdDxXcmFwcGVkQ29tcG9uZW50XG5cdFx0XHRcdFx0ZWRpdG9yT3Blbj17IGVkaXRvck9wZW4gfVxuXHRcdFx0XHRcdHRvZ2dsZUVkaXRvcj17IHRvZ2dsZUVkaXRvciB9XG5cdFx0XHRcdFx0eyAuLi5wYXNzZWRQcm9wcyB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L01vZGFsPlxuXHRcdCkgOiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVkaXRvck1vZGFsO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5cbi8qKlxuICogd2l0aEVkaXRvclxuICogY29udHJvbHMgdG9nZ2xpbmcgb2YgdGhlIHdpdGhFZGl0b3JNb2RhbCBIT0NcbiAqIHdyYXBzIHRoZSBjb21wb25lbnQgdGhhdCBjb250YWlucyB0aGUgd2l0aEVkaXRvck1vZGFsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHdpdGhFZGl0b3IgPSBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0KCBPcmlnaW5hbENvbXBvbmVudCApID0+IHtcblx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdFx0Y29uc3RydWN0b3IoIHByb3BzICkge1xuXHRcdFx0XHRzdXBlciggcHJvcHMgKTtcblx0XHRcdFx0dGhpcy5zdGF0ZSA9IHsgZWRpdG9yT3BlbjogZmFsc2UgfTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBvcGVucyBhbmQgY2xvc2VzIHdpdGhFZGl0b3JNb2RhbFxuXHRcdFx0ICpcblx0XHRcdCAqIEBmdW5jdGlvblxuXHRcdFx0ICovXG5cdFx0XHR0b2dnbGVFZGl0b3IgPSAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoICggcHJldlN0YXRlICkgPT4gKFxuXHRcdFx0XHRcdHsgZWRpdG9yT3BlbjogISBwcmV2U3RhdGUuZWRpdG9yT3BlbiB9XG5cdFx0XHRcdCkgKTtcblx0XHRcdH07XG5cblx0XHRcdHJlbmRlcigpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8T3JpZ2luYWxDb21wb25lbnRcblx0XHRcdFx0XHRcdHsgLi4udGhpcy5wcm9wcyB9XG5cdFx0XHRcdFx0XHRlZGl0b3JPcGVuPXsgdGhpcy5zdGF0ZS5lZGl0b3JPcGVuIH1cblx0XHRcdFx0XHRcdHRvZ2dsZUVkaXRvcj17IHRoaXMudG9nZ2xlRWRpdG9yIH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdCd3aXRoRWRpdG9yJ1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVkaXRvcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IEljb25CdXR0b24sIFNlbGVjdENvbnRyb2wsIFRleHRDb250cm9sIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb25lbnRzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG4vKipcbiAqIEVudGl0eUxpc3RGaWx0ZXJCYXJcbiAqIGEgZ3JvdXAgb2YgaW5wdXRzIGZvciBjb250cm9sbGluZyBob3cgYSBsaXN0IG9mIGVudGl0aWVzIGlzIGRpc3BsYXllZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlGaWx0ZXJzIGFkZGl0aW9uYWwgZW50aXR5IHNwZWNpZmljIGZpbHRlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBwZXJQYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlld1xuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0UGVyUGFnZSBjYWxsYmFjayBmb3IgcGVyUGFnZSBpbnB1dFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0TGlzdFZpZXcgY2FsbGJhY2sgZm9yIGxpc3QgdmlldyBpY29uIGJ1dHRvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0R3JpZFZpZXcgY2FsbGJhY2sgZm9yIGdyaWQgdmlldyBpY29uIGJ1dHRvblxuICogQHJldHVybiB7T2JqZWN0fSBFbnRpdHlMaXN0RmlsdGVyQmFyXG4gKi9cbmNsYXNzIEVudGl0eUxpc3RGaWx0ZXJCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdGVudGl0eUZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0cGVyUGFnZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdHZpZXc6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRzZXRQZXJQYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRcdHNldExpc3RWaWV3OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRcdHNldEdyaWRWaWV3OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGV4dFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRTZWFyY2hUZXh0XG5cdCAqIEByZXR1cm4ge09iamVjdH0gcmVuZGVyZWQgc2VhcmNoIGlucHV0XG5cdCAqL1xuXHRzZWFyY2ggPSAoIHNlYXJjaFRleHQsIHNldFNlYXJjaFRleHQgKSA9PiB7XG5cdFx0cmV0dXJuIGlzRnVuY3Rpb24oIHNldFNlYXJjaFRleHQgKSA/IChcblx0XHRcdDxGcmFnbWVudD5cblx0XHRcdFx0PFRleHRDb250cm9sXG5cdFx0XHRcdFx0bGFiZWw9eyBfXyggJ3NlYXJjaCcsICdldmVudF9lc3ByZXNzbycgKSB9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci1zZWFyY2hcIlxuXHRcdFx0XHRcdHZhbHVlPXsgc2VhcmNoVGV4dCB9XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyBzZXRTZWFyY2hUZXh0IH1cblx0XHRcdFx0Lz5cblx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0KSA6IG51bGw7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwZXJQYWdlXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHNldFBlclBhZ2Vcblx0ICogQHJldHVybiB7T2JqZWN0fSByZW5kZXJlZCBwZXJQYWdlIHNlbGVjdCBpbnB1dFxuXHQgKi9cblx0cGVyUGFnZSA9ICggcGVyUGFnZSwgc2V0UGVyUGFnZSApID0+IChcblx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0bGFiZWw9eyBfXyggJ3BlciBwYWdlJywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdGNsYXNzTmFtZT1cImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXItcGVyUGFnZS1zZWxlY3RcIlxuXHRcdFx0dmFsdWU9eyBwZXJQYWdlIH1cblx0XHRcdG9wdGlvbnM9eyBbXG5cdFx0XHRcdHsgdmFsdWU6IDIsIGxhYmVsOiAyIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDYsIGxhYmVsOiA2IH0sXG5cdFx0XHRcdHsgdmFsdWU6IDEyLCBsYWJlbDogMTIgfSxcblx0XHRcdFx0eyB2YWx1ZTogMjQsIGxhYmVsOiAyNCB9LFxuXHRcdFx0XHR7IHZhbHVlOiA0OCwgbGFiZWw6IDQ4IH0sXG5cdFx0XHRdIH1cblx0XHRcdG9uQ2hhbmdlPXsgc2V0UGVyUGFnZSB9XG5cdFx0Lz5cblx0KTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZpZXdcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0TGlzdFZpZXdcblx0ICogQHJldHVybiB7T2JqZWN0fSByZW5kZXJlZCBsaXN0IHZpZXcgaWNvbiBidXR0b25cblx0ICovXG5cdGxpc3RWaWV3ID0gKCB2aWV3LCBzZXRMaXN0VmlldyApID0+IChcblx0XHQ8SWNvbkJ1dHRvblxuXHRcdFx0Y2xhc3NOYW1lPXsgdmlldyA9PT0gJ2xpc3QnID8gJ2FjdGl2ZS1saXN0JyA6ICcnIH1cblx0XHRcdGljb249XCJlZGl0b3ItanVzdGlmeVwiXG5cdFx0XHR0b29sdGlwPXsgX18oICdsaXN0IHZpZXcnLCAnZXZlbnRfZXNwcmVzc28nICkgfVxuXHRcdFx0b25DbGljaz17IHNldExpc3RWaWV3IH1cblx0XHQvPlxuXHQpO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmlld1xuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRHcmlkVmlld1xuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlcmVkIGdyaWQgdmlldyBpY29uIGJ1dHRvblxuXHQgKi9cblx0Z3JpZFZpZXcgPSAoIHZpZXcsIHNldEdyaWRWaWV3ICkgPT4gKFxuXHRcdDxJY29uQnV0dG9uXG5cdFx0XHRjbGFzc05hbWU9eyB2aWV3ID09PSAnZ3JpZCcgPyAnYWN0aXZlLWxpc3QnIDogJycgfVxuXHRcdFx0aWNvbj1cInNjcmVlbm9wdGlvbnNcIlxuXHRcdFx0dG9vbHRpcD17IF9fKCAnZ3JpZCB2aWV3JywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdG9uQ2xpY2s9eyBzZXRHcmlkVmlldyB9XG5cdFx0Lz5cblx0KTtcblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0c2VhcmNoVGV4dCA9ICcnLFxuXHRcdFx0c2V0U2VhcmNoVGV4dCxcblx0XHRcdHBlclBhZ2UsXG5cdFx0XHR2aWV3LFxuXHRcdFx0c2V0UGVyUGFnZSxcblx0XHRcdHNldExpc3RWaWV3LFxuXHRcdFx0c2V0R3JpZFZpZXcsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgZW50aXR5RmlsdGVycyA9IHRoaXMucHJvcHMuZW50aXR5RmlsdGVycyA/XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXJcIj5cblx0XHRcdFx0eyB0aGlzLnByb3BzLmVudGl0eUZpbHRlcnMgfVxuXHRcdFx0PC9kaXY+IDpcblx0XHRcdG51bGw7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci13cmFwcGVyXCI+XG5cdFx0XHRcdHsgZW50aXR5RmlsdGVycyB9XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZWUtZW50aXR5LWxpc3Qtdmlldy1iYXJcIj5cblx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZS1zZWFyY2gtZmlsdGVyIGVlLWZpbHRlci1iYXItZmlsdGVyXCI+XG5cdFx0XHRcdFx0XHR7IHRoaXMuc2VhcmNoKCBzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0ICkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImVlLXBlci1wYWdlLWZpbHRlciBlZS1maWx0ZXItYmFyLWZpbHRlclwiPlxuXHRcdFx0XHRcdFx0eyB0aGlzLnBlclBhZ2UoIHBlclBhZ2UsIHNldFBlclBhZ2UgKSB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZWUtdmlldy1maWx0ZXIgZWUtZmlsdGVyLWJhci1maWx0ZXJcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5saXN0Vmlldyggdmlldywgc2V0TGlzdFZpZXcgKSB9XG5cdFx0XHRcdFx0XHR7IHRoaXMuZ3JpZFZpZXcoIHZpZXcsIHNldEdyaWRWaWV3ICkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXR5TGlzdEZpbHRlckJhcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHdpdGhFbnRpdHlQYWdpbmF0aW9uIH0gZnJvbSAnLi4vcGFnaW5hdGlvbic7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGRlZmF1bHQgYXMgd2l0aEVudGl0eUxpc3RGaWx0ZXJCYXIsXG59IGZyb20gJy4vd2l0aC1lbnRpdHktbGlzdC1maWx0ZXItYmFyJztcbmltcG9ydCB7XG5cdGRlZmF1bHQgYXMgd2l0aEVudGl0eUxpc3RGaWx0ZXJTdGF0ZSxcbn0gZnJvbSAnLi93aXRoLWVudGl0eS1saXN0LWZpbHRlci1zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBQYWdpbmF0ZWRFbnRpdHlMaXN0V2l0aEZpbHRlckJhciA9IChcblx0RW50aXR5TGlzdCxcblx0cGFnaW5hdGlvbkNvbmZpZyA9IHt9LFxuKSA9PiB3aXRoRW50aXR5TGlzdEZpbHRlckJhcihcblx0d2l0aEVudGl0eVBhZ2luYXRpb24oIHBhZ2luYXRpb25Db25maWcgKSggRW50aXR5TGlzdCApXG4pO1xuXG5leHBvcnQgY29uc3QgUGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXJBbmRTdGF0ZSA9IChcblx0RW50aXR5TGlzdCxcblx0cGFnaW5hdGlvbkNvbmZpZyA9IHt9LFxuKSA9PiB3aXRoRW50aXR5TGlzdEZpbHRlclN0YXRlKCB3aXRoRW50aXR5TGlzdEZpbHRlckJhcihcblx0d2l0aEVudGl0eVBhZ2luYXRpb24oIHBhZ2luYXRpb25Db25maWcgKSggRW50aXR5TGlzdCApXG4pICk7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgRW50aXR5TGlzdEZpbHRlckJhciB9IGZyb20gJy4vZW50aXR5LWxpc3QtZmlsdGVyLWJhcic7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci13cmFwcGVyXCI6XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyLXdyYXBwZXJcIixcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXJcIjpcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXJcIixcImVlLWVudGl0eS1saXN0LXZpZXctYmFyXCI6XCJlZS1lbnRpdHktbGlzdC12aWV3LWJhclwiLFwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci1wZXJQYWdlLXNlbGVjdFwiOlwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci1wZXJQYWdlLXNlbGVjdFwiLFwiZWUtZmlsdGVyLWJhci1maWx0ZXJcIjpcImVlLWZpbHRlci1iYXItZmlsdGVyXCIsXCJlZS1zZWFyY2gtZmlsdGVyXCI6XCJlZS1zZWFyY2gtZmlsdGVyXCIsXCJlZS1wZXItcGFnZS1maWx0ZXJcIjpcImVlLXBlci1wYWdlLWZpbHRlclwiLFwiZWUtZ3JpZC12aWV3LWZpbHRlclwiOlwiZWUtZ3JpZC12aWV3LWZpbHRlclwiLFwiZWUtbGlzdC12aWV3LWZpbHRlclwiOlwiZWUtbGlzdC12aWV3LWZpbHRlclwiLFwiY29tcG9uZW50cy1pY29uLWJ1dHRvblwiOlwiY29tcG9uZW50cy1pY29uLWJ1dHRvblwiLFwiYWN0aXZlLWxpc3RcIjpcImFjdGl2ZS1saXN0XCIsXCJjb21wb25lbnRzLWJhc2UtY29udHJvbF9fbGFiZWxcIjpcImNvbXBvbmVudHMtYmFzZS1jb250cm9sX19sYWJlbFwiLFwiY29tcG9uZW50cy10ZXh0LWNvbnRyb2xfX2lucHV0XCI6XCJjb21wb25lbnRzLXRleHQtY29udHJvbF9faW5wdXRcIixcImNvbXBvbmVudHMtc2VsZWN0LWNvbnRyb2xfX2lucHV0XCI6XCJjb21wb25lbnRzLXNlbGVjdC1jb250cm9sX19pbnB1dFwifTsiLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGRlZmF1bHQgYXMgRW50aXR5TGlzdEZpbHRlckJhciB9IGZyb20gJy4vZW50aXR5LWxpc3QtZmlsdGVyLWJhcic7XG5cbi8qKlxuICogd2l0aEVudGl0eUxpc3RGaWx0ZXJCYXJcbiAqIEhpZ2hlci1PcmRlci1Db21wb25lbnQgdGhhdCB3cmFwcyBhbiBFbnRpdHlMaXN0IGNvbXBvbmVudFxuICogZm9yIGNoYW5naW5nIGhvdyB0aGUgRW50aXR5TGlzdCBpcyB2aWV3ZWRcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IEVudGl0eUxpc3Qgd2l0aCBhZGRlZCBFbnRpdHlMaXN0RmlsdGVyQmFyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KFxuXHQoIEVudGl0eUxpc3QgKSA9PiB7XG5cdFx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XHRcdHNlYXJjaEVudGl0aWVzID0gKCBzZWFyY2hUZXh0LCBlbnRpdGllcyApID0+IHtcblx0XHRcdFx0cmV0dXJuIHNlYXJjaFRleHQgIT09ICcnID9cblx0XHRcdFx0XHRlbnRpdGllcy5maWx0ZXIoICggZW50aXR5ICkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgZW50aXR5TmFtZSA9IGVudGl0eS5uYW1lID8gZW50aXR5Lm5hbWUgOiAnJztcblx0XHRcdFx0XHRcdHJldHVybiBlbnRpdHlOYW1lLnRvTG93ZXJDYXNlKCkuc2VhcmNoKFxuXHRcdFx0XHRcdFx0XHRzZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCkgKSAhPT0gLTE7XG5cdFx0XHRcdFx0fSApIDpcblx0XHRcdFx0XHRlbnRpdGllcztcblx0XHRcdH07XG5cblx0XHRcdHJlbmRlcigpIHtcblx0XHRcdFx0bGV0IHsgZW50aXRpZXMgfSA9IHRoaXMucHJvcHM7XG5cdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRzZWFyY2hUZXh0LFxuXHRcdFx0XHRcdHNldFNlYXJjaFRleHQsXG5cdFx0XHRcdFx0cGVyUGFnZSxcblx0XHRcdFx0XHR2aWV3LFxuXHRcdFx0XHRcdHNldFBlclBhZ2UsXG5cdFx0XHRcdFx0c2V0TGlzdFZpZXcsXG5cdFx0XHRcdFx0c2V0R3JpZFZpZXcsXG5cdFx0XHRcdFx0Li4ub3RoZXJQcm9wc1xuXHRcdFx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRcdFx0ZW50aXRpZXMgPSBpc0Z1bmN0aW9uKCBzZXRTZWFyY2hUZXh0ICkgP1xuXHRcdFx0XHRcdHRoaXMuc2VhcmNoRW50aXRpZXMoIHNlYXJjaFRleHQsIGVudGl0aWVzICkgOlxuXHRcdFx0XHRcdGVudGl0aWVzO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxGcmFnbWVudD5cblx0XHRcdFx0XHRcdDxFbnRpdHlMaXN0RmlsdGVyQmFyXG5cdFx0XHRcdFx0XHRcdHNlYXJjaFRleHQ9eyBzZWFyY2hUZXh0IH1cblx0XHRcdFx0XHRcdFx0c2V0U2VhcmNoVGV4dD17IHNldFNlYXJjaFRleHQgfVxuXHRcdFx0XHRcdFx0XHRwZXJQYWdlPXsgcGVyUGFnZSB9XG5cdFx0XHRcdFx0XHRcdHZpZXc9eyB2aWV3IH1cblx0XHRcdFx0XHRcdFx0c2V0UGVyUGFnZT17IHNldFBlclBhZ2UgfVxuXHRcdFx0XHRcdFx0XHRzZXRMaXN0Vmlldz17IHNldExpc3RWaWV3IH1cblx0XHRcdFx0XHRcdFx0c2V0R3JpZFZpZXc9eyBzZXRHcmlkVmlldyB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PEVudGl0eUxpc3Rcblx0XHRcdFx0XHRcdFx0ZW50aXRpZXM9eyBlbnRpdGllcyB9XG5cdFx0XHRcdFx0XHRcdGVudGl0aWVzUGVyUGFnZT17IHBlclBhZ2UgfVxuXHRcdFx0XHRcdFx0XHR2aWV3PXsgdmlldyB9XG5cdFx0XHRcdFx0XHRcdG5vUmVzdWx0c1RleHQ9e1xuXHRcdFx0XHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0XHRcdFx0J25vIHJlc3VsdHMgZm91bmQgKHRyeSBjaGFuZ2luZyBmaWx0ZXJzKScsXG5cdFx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHsgLi4ub3RoZXJQcm9wcyB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSxcblx0J3dpdGhFbnRpdHlMaXN0RmlsdGVyQmFyJ1xuKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50LCBjb21wb3NlIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IHdpdGhTZWxlY3QsIHdpdGhEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogd2l0aEVudGl0eUxpc3RGaWx0ZXJTdGF0ZVxuICogSGlnaGVyLU9yZGVyLUNvbXBvbmVudCB0aGF0IHdyYXBzIGFuIFwiRW50aXR5TGlzdEZpbHRlckJhclwiIGNvbXBvbmVudFxuICogaW4gb3JkZXIgdG8gcHJvdmlkZSBzdGF0ZSBtYW5hZ2VtZW50IGZvciBpdCBhbmQgaXRzIGNoaWxkcmVuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFdyYXBwZWRDb21wb25lbnRcbiAqIEByZXR1cm4ge09iamVjdH0gV3JhcHBlZENvbXBvbmVudCB3aXRoIGFkZGVkIEVudGl0eUxpc3RGaWx0ZXJTdGF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0Y29tcG9zZSggW1xuXHRcdHdpdGhTZWxlY3QoICggc2VsZWN0LCBvd25Qcm9wcyApID0+IHtcblx0XHRcdGNvbnN0IHtcblx0XHRcdFx0c2VhcmNoVGV4dCA9ICcnLFxuXHRcdFx0XHRwZXJQYWdlID0gNixcblx0XHRcdFx0dmlldyA9ICdncmlkJyxcblx0XHRcdH0gPSBvd25Qcm9wcztcblx0XHRcdGNvbnN0IHN0b3JlID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9maWx0ZXItc3RhdGUnICk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzZWFyY2hUZXh0OiBzdG9yZS5nZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQnc2VhcmNoVGV4dCcsXG5cdFx0XHRcdFx0c2VhcmNoVGV4dFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRwZXJQYWdlOiBwYXJzZUludChcblx0XHRcdFx0XHRzdG9yZS5nZXRGaWx0ZXIoXG5cdFx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdFx0J3BlclBhZ2UnLFxuXHRcdFx0XHRcdFx0cGVyUGFnZVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KSxcblx0XHRcdFx0dmlldzogc3RvcmUuZ2V0RmlsdGVyKFxuXHRcdFx0XHRcdCdlbnRpdHktbGlzdCcsXG5cdFx0XHRcdFx0J3ZpZXcnLFxuXHRcdFx0XHRcdHZpZXdcblx0XHRcdFx0KSxcblx0XHRcdH07XG5cdFx0fSApLFxuXHRcdHdpdGhEaXNwYXRjaCggKCBkaXNwYXRjaCApID0+IHtcblx0XHRcdGNvbnN0IHN0b3JlID0gZGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2ZpbHRlci1zdGF0ZScgKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHNldFNlYXJjaFRleHQ6ICggc2VhcmNoVGV4dCApID0+IHN0b3JlLnNldEZpbHRlcihcblx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdCdzZWFyY2hUZXh0Jyxcblx0XHRcdFx0XHRzZWFyY2hUZXh0XG5cdFx0XHRcdCksXG5cdFx0XHRcdHNldFBlclBhZ2U6ICggcGVyUGFnZSApID0+IHN0b3JlLnNldEZpbHRlcihcblx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdCdwZXJQYWdlJyxcblx0XHRcdFx0XHRwYXJzZUludCggcGVyUGFnZSApXG5cdFx0XHRcdCksXG5cdFx0XHRcdHNldExpc3RWaWV3OiAoKSA9PiBzdG9yZS5zZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQndmlldycsXG5cdFx0XHRcdFx0J2xpc3QnXG5cdFx0XHRcdCksXG5cdFx0XHRcdHNldEdyaWRWaWV3OiAoKSA9PiBzdG9yZS5zZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQndmlldycsXG5cdFx0XHRcdFx0J2dyaWQnXG5cdFx0XHRcdCksXG5cdFx0XHR9O1xuXHRcdH0gKSxcblx0XHQoIFdyYXBwZWRDb21wb25lbnQgKSA9PiB7XG5cdFx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdFx0XHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdFx0XHRcdGVudGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlPZiggUHJvcFR5cGVzLm9iamVjdCApLmlzUmVxdWlyZWQsXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlbmRlcigpIHtcblx0XHRcdFx0XHRyZXR1cm4gPFdyYXBwZWRDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gLz47XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblx0XSApLFxuXHQnd2l0aEVudGl0eUxpc3RGaWx0ZXJTdGF0ZSdcbik7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhCYXNlQ29udHJvbCB9IGZyb20gJy4vYmFzZS1jb250cm9sJztcbmV4cG9ydCB7IHdpdGhFZGl0b3IsIHdpdGhFZGl0b3JNb2RhbCB9IGZyb20gJy4vZWRpdG9yLW1vZGFsJztcbmV4cG9ydCB7XG5cdFBhZ2luYXRlZEVudGl0eUxpc3RXaXRoRmlsdGVyQmFyLFxuXHRQYWdpbmF0ZWRFbnRpdHlMaXN0V2l0aEZpbHRlckJhckFuZFN0YXRlLFxuXHRFbnRpdHlMaXN0RmlsdGVyQmFyLFxufSBmcm9tICcuL2ZpbHRlci1iYXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoTW9uZXkgfSBmcm9tICcuL21vbmV5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aExhdGVzdENoZWNraW4gfSBmcm9tICcuL3dpdGgtbGF0ZXN0LWNoZWNraW4nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoRW50aXR5UGFnaW5hdGlvbiB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5leHBvcnQge1xuXHRkZWZhdWx0IGFzIHdpdGhGb3JtQ29udGFpbmVyQW5kUGxhY2Vob2xkZXIsXG59IGZyb20gJy4vd2l0aC1mb3JtLWNvbnRhaW5lci1hbmQtcGxhY2Vob2xkZXInO1xuXG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzQXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsQXJyYXlzIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IE1vbmV5LCBTaXRlQ3VycmVuY3kgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuLyoqXG4gKiBUaGlzIHZhbGlkYXRlcyB3aGV0aGVyIHRoZSBuZXh0U3RhdGVSZXNwb25zZSBpcyBpbiB0aGUgZXhwZWN0ZWQgc2hhcGUuXG4gKiBJZiBhbnkgb2YgdGhlIHZhbGlkYXRpb24gZmFpbHMsIHRoZW4gYSBjb25zb2xlLmVycm9yIGlzIHRyaWdnZXJlZCAodmlhXG4gKiB3YXJuaW5nKVxuICpcbiAqIEBwYXJhbSB7e319IG5leHRTdGF0ZVJlc3BvbnNlXG4gKi9cbmNvbnN0IHZhbGlkYXRlTmV4dFN0YXRlID0gKCBuZXh0U3RhdGVSZXNwb25zZSApID0+IHtcblx0d2FybmluZyhcblx0XHRuZXh0U3RhdGVSZXNwb25zZSAmJlxuXHRcdG5leHRTdGF0ZVJlc3BvbnNlLmhhc093blByb3BlcnR5KCAnY29udmVydGVkVmFsdWVzJyApLFxuXHRcdCdUaGUgcHJvcE5hbWVNYXAgY2FsbGJhY2sgZm9yIHRoZSB3aXRoTW9uZXkgSE9DIHNob3VsZCByZXR1cm4gYW4nICtcblx0XHQnIG9iamVjdCB3aXRoIGEgXCJjb252ZXJ0ZWRWYWx1ZXNcIiBrZXkuJ1xuXHQpO1xuXHRpZiAoIG5leHRTdGF0ZVJlc3BvbnNlICYmXG5cdFx0bmV4dFN0YXRlUmVzcG9uc2UuaGFzT3duUHJvcGVydHkoICdjb252ZXJ0ZWRWYWx1ZXMnICkgKSB7XG5cdFx0d2FybmluZyhcblx0XHRcdGlzQXJyYXkoIG5leHRTdGF0ZVJlc3BvbnNlLmNvbnZlcnRlZFZhbHVlcyApLFxuXHRcdFx0J1RoZSBwcm9wTmFtZU1hcCBjYWxsYmFjayBmb3IgdGhlIHdpdGhNb25leSBIT0Mgc2hvdWxkIHJldHVybiBhbiAnICtcblx0XHRcdCdvYmplY3Qgd2l0aCBhIFwiY29udmVydGVkVmFsdWVzXCIga2V5IHRoYXQgaGFzIGFuIGFycmF5JyArXG5cdFx0XHQnIG9mIG51bWJlcnMgYXMgdGhlIHZhbHVlLidcblx0XHQpO1xuXHR9XG5cdHdhcm5pbmcoXG5cdFx0bmV4dFN0YXRlUmVzcG9uc2UgJiYgbmV4dFN0YXRlUmVzcG9uc2UuaGFzT3duUHJvcGVydHkoICdwcm9wcycgKSxcblx0XHQnVGhlIHByb3BOYW1lTWFwIGNhbGxiYWNrIGZvciB0aGUgd2l0aE1vbmV5SE9DIHNob3VsZCByZXR1cm4gYW4nICtcblx0XHQnIG9iamVjdCB3aXRoIGEgXCJwcm9wc1wiIGtleS4nXG5cdCk7XG59O1xuXG4vKipcbiAqIEEgaGlnaGVyIG9yZGVyIGNvbXBvbmVudCB0aGF0IGNvbnZlcnRzIGFueSBwcm9wcyBtYXRjaGluZyB0aGUgbWFwIHByb3ZpZGVkXG4gKiBhcyBhbiBhcmd1bWVudCB0byBNb25leSB2YWx1ZSBvYmplY3RzIGFuZCBwYXNzZXMgdGhlbSB0byB0aGUgV3JhcHBlZENvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7QXJyYXl8ZnVuY3Rpb259IHByb3BOYW1lTWFwXG4gKiBAcmV0dXJuIHtmdW5jdGlvbigqKTogRW5oYW5jZWRDb21wb25lbnR9ICBSZXR1cm5zIGFuIGVuaGFuY2VkIGNvbXBvbmVudCB3aGVyZVxuICogcHJvcHMgdGhhdCByZXByZXNlbnQgbW9uZXkgdmFsdWVzIGhhdmUgYmVlbiBjb252ZXJ0ZWQgdG8gYSBNb25leSB2YWx1ZSBvYmplY3RcbiAqL1xuY29uc3Qgd2l0aE1vbmV5ID0gKCBwcm9wTmFtZU1hcCA9IFtdICkgPT4gKCBXcmFwcGVkQ29tcG9uZW50ICkgPT4ge1xuXHRjbGFzcyBFbmhhbmNlZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0c3RhdGUgPSB7XG5cdFx0XHRjb252ZXJ0ZWRWYWx1ZXM6IFtdLFxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBUaGlzIHByb3ZpZGVzIHRoZSBuZXh0IHN0YXRlIG9uIGFueSBwcm9wIGNoYW5nZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7e319IHByb3BzXG5cdFx0ICogQHJldHVybiB7e319IEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5leHRTdGF0ZSBmb3IgdGhlIGNvbXBvbmVudC5cblx0XHQgKi9cblx0XHRnZXROZXh0U3RhdGUgPSAoIHByb3BzICkgPT4ge1xuXHRcdFx0bGV0IG5leHRTdGF0ZVJlc3BvbnNlLFxuXHRcdFx0XHRuZXh0U3RhdGUgPSB7fSxcblx0XHRcdFx0Y29udmVydGVkVmFsdWVzID0gW107XG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24oIHByb3BOYW1lTWFwICkgKSB7XG5cdFx0XHRcdG5leHRTdGF0ZVJlc3BvbnNlID0gcHJvcE5hbWVNYXAoIHByb3BzLCBNb25leSApO1xuXHRcdFx0XHR2YWxpZGF0ZU5leHRTdGF0ZSggbmV4dFN0YXRlUmVzcG9uc2UgKTtcblx0XHRcdFx0aWYgKCBuZXh0U3RhdGVSZXNwb25zZSAmJiBuZXh0U3RhdGVSZXNwb25zZS5wcm9wcyApIHtcblx0XHRcdFx0XHRuZXh0U3RhdGUgPSB7IC4uLm5leHRTdGF0ZVJlc3BvbnNlLnByb3BzIH07XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udmVydGVkVmFsdWVzID0gbmV4dFN0YXRlUmVzcG9uc2UuY29udmVydGVkVmFsdWVzIHx8XG5cdFx0XHRcdFx0Y29udmVydGVkVmFsdWVzO1xuXHRcdFx0fSBlbHNlIGlmICggaXNBcnJheSggcHJvcE5hbWVNYXAgKSApIHtcblx0XHRcdFx0cHJvcE5hbWVNYXAuZm9yRWFjaCggKCBwcm9wTmFtZSApID0+IHtcblx0XHRcdFx0XHRpZiAoIHByb3BzWyBwcm9wTmFtZSBdICkge1xuXHRcdFx0XHRcdFx0bmV4dFN0YXRlWyBwcm9wTmFtZSBdID1cblx0XHRcdFx0XHRcdFx0bmV3IE1vbmV5KFxuXHRcdFx0XHRcdFx0XHRcdHByb3BzWyBwcm9wTmFtZSBdLFxuXHRcdFx0XHRcdFx0XHRcdFNpdGVDdXJyZW5jeVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0Y29udmVydGVkVmFsdWVzLnB1c2goXG5cdFx0XHRcdFx0XHRcdG5leHRTdGF0ZVsgcHJvcE5hbWUgXS50b051bWJlcigpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2FybmluZyhcblx0XHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHQnVGhlIHByb3BOYW1lTWFwIGFyZ3VtZW50IHByb3ZpZGVkIHRvIHdpdGhNb25leSBtdXN0IGJlIGVpdGhlciBhJyArXG5cdFx0XHRcdFx0JyBmdW5jdGlvbiBvciBhbiBhcnJheSdcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdG5leHRTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXMgPSBjb252ZXJ0ZWRWYWx1ZXM7XG5cdFx0XHRyZXR1cm4gbmV4dFN0YXRlO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDYWxjdWxhdGVzIHdoZXRoZXIgdGhlIHN0YXRlIHNob3VsZCBiZSB1cGRhdGVkIHVzaW5nIHRoZSBwcm92aWRlZFxuXHRcdCAqIGFyZ3VtZW50cy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7e319IHByZXZQcm9wc1xuXHRcdCAqIEBwYXJhbSB7e319IHByZXZTdGF0ZVxuXHRcdCAqIEBwYXJhbSB7e319IG5leHRTdGF0ZVxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBJZiBhIHNoYWxsb3cgY29tcGFyZSBvZiBwcmV2U3RhdGUuY29udmVydGVkVmFsdWVzXG5cdFx0ICogYW5kIG5leHRTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXMgaXMgZmFsc2UsIHRoZW4gdGhpcyByZXR1cm5zIHRydWUgdG9cblx0XHQgKiBzaWduYWwgc3RhdGUgc2hvdWxkIGJlIHVwZGF0ZWQuXG5cdFx0ICovXG5cdFx0c2hvdWxkVXBkYXRlU3RhdGVXaXRoQ29udmVydGVkVmFsdWVzID0gKFxuXHRcdFx0cHJldlByb3BzLFxuXHRcdFx0cHJldlN0YXRlLFxuXHRcdFx0bmV4dFN0YXRlXG5cdFx0KSA9PiB7XG5cdFx0XHRyZXR1cm4gISBpc1NoYWxsb3dFcXVhbEFycmF5cyhcblx0XHRcdFx0bmV4dFN0YXRlLmNvbnZlcnRlZFZhbHVlcyxcblx0XHRcdFx0cHJldlN0YXRlLmNvbnZlcnRlZFZhbHVlc1xuXHRcdFx0KSAmJlxuXHRcdFx0XHRuZXh0U3RhdGUuY29udmVydGVkVmFsdWVzWyAwIF0gIT09XG5cdFx0XHRcdHByZXZTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXNbIDAgXTtcblx0XHR9O1xuXG5cdFx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKCB0aGlzLmdldE5leHRTdGF0ZSggdGhpcy5wcm9wcyApICk7XG5cdFx0fVxuXG5cdFx0Y29tcG9uZW50RGlkVXBkYXRlKCBwcmV2UHJvcHMsIHByZXZTdGF0ZSApIHtcblx0XHRcdGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0TmV4dFN0YXRlKCB0aGlzLnByb3BzICk7XG5cdFx0XHRpZiAoIHRoaXMuc2hvdWxkVXBkYXRlU3RhdGVXaXRoQ29udmVydGVkVmFsdWVzKFxuXHRcdFx0XHRwcmV2UHJvcHMsXG5cdFx0XHRcdHByZXZTdGF0ZSxcblx0XHRcdFx0bmV4dFN0YXRlXG5cdFx0XHQpICkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKCBuZXh0U3RhdGUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gPFdyYXBwZWRDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0geyAuLi50aGlzLnN0YXRlIH0gLz47XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEVuaGFuY2VkQ29tcG9uZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aE1vbmV5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBKd1BhZ2luYXRpb24gZnJvbSAnanctcmVhY3QtcGFnaW5hdGlvbic7XG5pbXBvcnQge1xuXHRjb21wb3NlLFxuXHRjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCxcblx0d2l0aEluc3RhbmNlSWQsXG59IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG4vKipcbiAqIHdpdGhFbnRpdHlQYWdpbmF0aW9uXG4gKiBIaWdoZXItT3JkZXItQ29tcG9uZW50IHRoYXQgd3JhcHMgYW4gXCJFbnRpdHlMaXN0XCIgY29tcG9uZW50XG4gKiB3aXRoIGFuIEVudGl0eVBhZ2luYXRpb24gY29tcG9uZW50IHRoYXQgYWRkcyBhIHBhZ2luYXRpb24gY29udGFpbmVyXG4gKiBiZWxvdyB0aGUgRW50aXR5TGlzdCBhbmQgY29udHJvbHMgd2hhdCBlbnRpdGllcyBhcmUgZGlzcGxheWVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhZ2luYXRpb25Db25maWdcbiAqIEByZXR1cm4ge09iamVjdH0gRW50aXR5TGlzdCB3aXRoIGFkZGVkIEVudGl0eVBhZ2luYXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKCBwYWdpbmF0aW9uQ29uZmlnID0ge30gKSA9PiBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0Y29tcG9zZSggW1xuXHRcdHdpdGhJbnN0YW5jZUlkLFxuXHRcdCggRW50aXR5TGlzdCApID0+IHtcblx0XHRcdHJldHVybiBjbGFzcyBFbnRpdHlQYWdpbmF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XHRcdFx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRcdFx0XHRlbnRpdGllczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG5cdFx0XHRcdFx0aW5zdGFuY2VJZDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0XHRcdGVudGl0aWVzUGVyUGFnZTogUHJvcFR5cGVzLm9uZU9mVHlwZSggW1xuXHRcdFx0XHRcdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdFx0XHRcdFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRcdFx0XSApLFxuXHRcdFx0XHRcdHBvc2l0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcblx0XHRcdFx0XHRzdXBlciggcHJvcHMgKTtcblx0XHRcdFx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0XHRcdFx0ZW50aXR5UGFnZTogW10sXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEgKFxuXHRcdFx0XHRcdFx0aXNFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICkgJiZcblx0XHRcdFx0XHRcdGlzRXF1YWwoIG5leHRTdGF0ZS5lbnRpdHlQYWdlLCB0aGlzLnN0YXRlLmVudGl0eVBhZ2UgKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogQGZ1bmN0aW9uXG5cdFx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IGVudGl0eVBhZ2Vcblx0XHRcdFx0ICovXG5cdFx0XHRcdG9uUGFnaW5hdGlvbkNoYW5nZSA9ICggZW50aXR5UGFnZSApID0+IHtcblx0XHRcdFx0XHQvLyB1cGRhdGUgbG9jYWwgc3RhdGUgd2l0aCBuZXcgcGFnZSBvZiBpdGVtc1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoIHsgZW50aXR5UGFnZSB9ICk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmVuZGVyKCkge1xuXHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdGVudGl0aWVzLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VJZCxcblx0XHRcdFx0XHRcdGVudGl0aWVzUGVyUGFnZSA9IDEwLFxuXHRcdFx0XHRcdFx0cG9zaXRpb24gPSAndG9wJyxcblx0XHRcdFx0XHRcdC4uLm90aGVyUHJvcHNcblx0XHRcdFx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRcdFx0XHRwYWdpbmF0aW9uQ29uZmlnLmxhYmVscyA9IHBhZ2luYXRpb25Db25maWcubGFiZWxzICYmXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uQ29uZmlnLmxhYmVscy5maXJzdCAmJlxuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMubGFzdCAmJlxuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMucHJldmlvdXMgJiZcblx0XHRcdFx0XHRcdHBhZ2luYXRpb25Db25maWcubGFiZWxzLm5leHQgP1xuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMgOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRmaXJzdDogX18oICdGaXJzdCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdFx0XHRcdFx0bGFzdDogX18oICdMYXN0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0XHRcdFx0XHRwcmV2aW91czogX18oICdQcmV2JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0XHRcdFx0XHRuZXh0OiBfXyggJ05leHQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGNvbnN0IG5vUmVzdWx0c1RleHQgPSBwYWdpbmF0aW9uQ29uZmlnLm5vUmVzdWx0c1RleHQgP1xuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5ub1Jlc3VsdHNUZXh0IDpcblx0XHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0XHQnbm8gcmVzdWx0cyBmb3VuZCAodHJ5IGNoYW5naW5nIGZpbHRlcnMpJyxcblx0XHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRjb25zdCByZXR1cm5Bc1Byb3AgPSBwYWdpbmF0aW9uQ29uZmlnLnJldHVybkFzUHJvcCA/XG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uQ29uZmlnLnJldHVybkFzUHJvcCA6XG5cdFx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdFx0XHRjb25zdCBwYWdpbmF0aW9uID0gKFxuXHRcdFx0XHRcdFx0PGRpdiBpZD17IGBlZS1lbnRpdHktcGFnaW5hdGlvbi0keyBpbnN0YW5jZUlkIH1gIH1cblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZWUtZW50aXR5LXBhZ2luYXRpb25cIlxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHQ8SndQYWdpbmF0aW9uXG5cdFx0XHRcdFx0XHRcdFx0aXRlbXM9eyBlbnRpdGllcyB9XG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2VQYWdlPXsgdGhpcy5vblBhZ2luYXRpb25DaGFuZ2UgfVxuXHRcdFx0XHRcdFx0XHRcdHBhZ2VTaXplPXsgcGFyc2VJbnQoIGVudGl0aWVzUGVyUGFnZSApIH1cblx0XHRcdFx0XHRcdFx0XHR7IC4uLnBhZ2luYXRpb25Db25maWcgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRjb25zdCB0b3BQYWdpbmF0aW9uID0gcG9zaXRpb24gPT09ICggJ3RvcCcgfHwgJ2JvdGgnICkgP1xuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbiA6XG5cdFx0XHRcdFx0XHRudWxsO1xuXHRcdFx0XHRcdGNvbnN0IGJvdHRvbVBhZ2luYXRpb24gPSBwb3NpdGlvbiA9PT0gKCAnYm90dG9tJyB8fCAnYm90aCcgKSA/XG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uIDpcblx0XHRcdFx0XHRcdG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuIHJldHVybkFzUHJvcCA/IChcblx0XHRcdFx0XHRcdDxFbnRpdHlMaXN0XG5cdFx0XHRcdFx0XHRcdHBhZ2luYXRpb249eyBwYWdpbmF0aW9uIH1cblx0XHRcdFx0XHRcdFx0ZW50aXRpZXM9eyB0aGlzLnN0YXRlLmVudGl0eVBhZ2UgfVxuXHRcdFx0XHRcdFx0XHRub1Jlc3VsdHNUZXh0PXsgbm9SZXN1bHRzVGV4dCB9XG5cdFx0XHRcdFx0XHRcdHsgLi4ub3RoZXJQcm9wcyB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdCkgOiAoXG5cdFx0XHRcdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdFx0XHRcdHsgdG9wUGFnaW5hdGlvbiB9XG5cdFx0XHRcdFx0XHRcdDxFbnRpdHlMaXN0XG5cdFx0XHRcdFx0XHRcdFx0ZW50aXRpZXM9eyB0aGlzLnN0YXRlLmVudGl0eVBhZ2UgfVxuXHRcdFx0XHRcdFx0XHRcdG5vUmVzdWx0c1RleHQ9eyBub1Jlc3VsdHNUZXh0IH1cblx0XHRcdFx0XHRcdFx0XHR7IC4uLm90aGVyUHJvcHMgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHR7IGJvdHRvbVBhZ2luYXRpb24gfVxuXHRcdFx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cdF0gKSxcblx0J3dpdGhFbnRpdHlQYWdpbmF0aW9uJ1xuKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJlZS1lbnRpdHktcGFnaW5hdGlvblwiOlwiZWUtZW50aXR5LXBhZ2luYXRpb25cIixcInBhZ2luYXRpb25cIjpcInBhZ2luYXRpb25cIixcImRpc2FibGVkXCI6XCJkaXNhYmxlZFwiLFwiYWN0aXZlXCI6XCJhY3RpdmVcIn07IiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IENvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgRm9ybUNvbnRhaW5lciwgRm9ybVBsYWNlaG9sZGVyIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vY29tcG9uZW50cyc7XG5cbi8qKlxuICogd2l0aEZvcm1Db250YWluZXJBbmRQbGFjZWhvbGRlclxuICogSGlnaGVyLU9yZGVyLUNvbXBvbmVudCB0aGF0IHdyYXBzIGFuIEVzcHJlc3NvIEZvcm0gY29tcG9uZW50XG4gKiB3aXRoIGEgRm9ybUNvbnRhaW5lciBjb21wb25lbnQgYW5kIGFkZHMgYSBGb3JtUGxhY2Vob2xkZXJcbiAqIGZvciBkaXNwbGF5aW5nIGEgbG9hZGluZyBub3RpY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gRm9ybVxuICogQHJldHVybiB7T2JqZWN0fSBGb3JtIHdpdGggYWRkZWQgRm9ybUNvbnRhaW5lciBhbmQgRm9ybVBsYWNlaG9sZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KFxuXHQoIEZvcm0gKSA9PiB7XG5cdFx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XHRcdHJlbmRlcigpIHtcblx0XHRcdFx0Y29uc3QgeyBsb2FkaW5nLCBub3RpY2UsIC4uLmZvcm1Qcm9wcyB9ID0gdGhpcy5wcm9wcztcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdFx0XHQ8Rm9ybVBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0XHRcdGxvYWRpbmc9eyBsb2FkaW5nIH1cblx0XHRcdFx0XHRcdFx0bm90aWNlPXsgbm90aWNlIH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Rm9ybUNvbnRhaW5lciBsb2FkaW5nPXsgbG9hZGluZyB9PlxuXHRcdFx0XHRcdFx0XHQ8Rm9ybSB7IC4uLmZvcm1Qcm9wcyB9IC8+XG5cdFx0XHRcdFx0XHQ8L0Zvcm1Db250YWluZXI+XG5cdFx0XHRcdFx0PC9GcmFnbWVudD5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9LFxuXHQnd2l0aEZvcm1Db250YWluZXJBbmRQbGFjZWhvbGRlcidcbik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgd2l0aFNlbGVjdCwgd2l0aERpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50LCBjb21wb3NlIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogRXhwb3NlcyBwcm9wZXJ0aWVzIHJlbGF0ZWQgdG8gdGhlIGxhdGVzdCBjaGVjay1pbiBlbnRpdHkgZm9yIGEgZ2l2ZW5cbiAqIHJlZ2lzdHJhdGlvbiBhbmQgZGF0ZXRpbWUuXG4gKlxuICogUHJvcGVydGllcyBwYXNzZWQgdGhyb3VnaCB0byB3cmFwcGVkIGNvbXBvbmVudCBhcmU6XG4gKlxuICogLSBjaGVja0luRW50aXR5IHtCYXNlRW50aXR5fG51bGx9IFRoZSBjaGVjay1pbiBlbnRpdHkgdGhhdCBpcyByZWxhdGVkIHRvIHRoZVxuICogZ2l2ZW4gcmVnaXN0cmF0aW9uIGFuZCBkYXRldGltZSBpZC5cbiAqIC0gaGFzUmVzb2x2ZWRDaGVja2luIHtib29sZWFufSBXaGV0aGVyIHRoZSBjaGVjay1pbiBlbnRpdHkgc2VsZWN0b3IgaGFzXG4gKiByZXNvbHZlZC4gIFRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2UgaXRzIHBvc3NpYmxlIHRoZXJlIGlzIG5vIGVudGl0eSBmb3JcbiAqIHRoaXMgcmVnaXN0cmF0aW9uIGFuZCBkYXRldGltZSBpZiB0aGF0IHJlZ2lzdHJhdGlvbiBoYXNuIG5ldmVyIGJlZW4gY2hlY2tlZFxuICogaW4uXG4gKiAtIG9uQ2xpY2sge2Z1bmN0aW9ufSBBIGNsaWNrIGhhbmRsZXIgd2hpY2ggd2hlbiBpbnZva2VkLCB3aWxsIHRvZ2dsZSB0aGVcbiAqIGNoZWNrLWluIHN0YXRlIGZvciB0aGUgZ2l2ZW4gcmVnaXN0cmF0aW9uIGFuZCBkYXRldGltZUlkLiBOb3RlOiB0aGlzIHdpbGxcbiAqIHJlcGxhY2UgdGhlIHN0b3JlIGxhdGVzdENoZWNraW4gcmVjb3JkIGluIHRoZSBzdGF0ZSBmb3IgdGhpcyBnaXZlblxuICogcmVnaXN0cmF0aW9uIGFuZCBkYXRldGltZSBpZCB3aGljaCB3aWxsIGdldCBwaWNrZWQgdXAgYnkgdGhlIGB3aXRoU2VsZWN0YFxuICogSE9DIGluIHRoZSBjb21wb3NlZCBjb21wb25lbnQuXG4gKlxuICogQHR5cGUge1dQQ29tcG9uZW50fVxuICovXG5jb25zdCB3aXRoTGF0ZXN0Q2hlY2tpbiA9IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KFxuXHRjb21wb3NlKCBbXG5cdFx0d2l0aFNlbGVjdChcblx0XHRcdCggc2VsZWN0LCB7IHJlZ2lzdHJhdGlvbiwgZGF0ZXRpbWVJZCB9ICkgPT4ge1xuXHRcdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoXG5cdFx0XHRcdFx0cmVnaXN0cmF0aW9uLFxuXHRcdFx0XHRcdCdyZWdpc3RyYXRpb24nXG5cdFx0XHRcdCkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IHsgZ2V0TGF0ZXN0Q2hlY2tpbiB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdFx0XHRjb25zdCBjaGVja0luRW50aXR5ID0gZ2V0TGF0ZXN0Q2hlY2tpbihcblx0XHRcdFx0XHRyZWdpc3RyYXRpb24uaWQsXG5cdFx0XHRcdFx0ZGF0ZXRpbWVJZFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNoZWNraW5FbnRpdHk6IGNoZWNrSW5FbnRpdHkgfHwgbnVsbCxcblx0XHRcdFx0XHRoYXNSZXNvbHZlZENoZWNraW46IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdFx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0XHRcdFx0J2dldExhdGVzdENoZWNraW4nLFxuXHRcdFx0XHRcdFx0WyByZWdpc3RyYXRpb24uaWQsIGRhdGV0aW1lSWQgXVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0KSxcblx0XHR3aXRoRGlzcGF0Y2goXG5cdFx0XHQoIGRpc3BhdGNoLCB7IHJlZ2lzdHJhdGlvbiwgZGF0ZXRpbWVJZCB9ICkgPT4ge1xuXHRcdFx0XHRjb25zdCB7IHRvZ2dsZUNoZWNraW4gfSA9IGRpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdG9uQ2xpY2soKSB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKFxuXHRcdFx0XHRcdFx0XHRcdHJlZ2lzdHJhdGlvbixcblx0XHRcdFx0XHRcdFx0XHQncmVnaXN0cmF0aW9uJ1xuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dG9nZ2xlQ2hlY2tpbiggcmVnaXN0cmF0aW9uLmlkLCBkYXRldGltZUlkICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHQpLFxuXHRdICksXG5cdCd3aXRoTGF0ZXN0Q2hlY2tpbidcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhMYXRlc3RDaGVja2luO1xuIiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kczsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkOyIsInZhciBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlID0gcmVxdWlyZShcIi4vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICB2YXIga2V5LCBpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllczsiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSBzaGFsbG93IGVxdWFsLCBvciBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSBGaXJzdCBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gYiBTZWNvbmQgYXJyYXkgdG8gY29tcGFyZS5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSB0d28gYXJyYXlzIGFyZSBzaGFsbG93IGVxdWFsLlxuICovXG5mdW5jdGlvbiBpc1NoYWxsb3dFcXVhbEFycmF5cyggYSwgYiApIHtcblx0dmFyIGk7XG5cblx0aWYgKCBhID09PSBiICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKCBhLmxlbmd0aCAhPT0gYi5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zm9yICggaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrICkge1xuXHRcdGlmICggYVsgaSBdICE9PSBiWyBpIF0gKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTaGFsbG93RXF1YWxBcnJheXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzO1xuICovXG52YXIgaXNTaGFsbG93RXF1YWxPYmplY3RzID0gcmVxdWlyZSggJy4vb2JqZWN0cycgKTtcbnZhciBpc1NoYWxsb3dFcXVhbEFycmF5cyA9IHJlcXVpcmUoICcuL2FycmF5cycgKTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBvciBvYmplY3RzIGFyZSBzaGFsbG93IGVxdWFsLCBvciBmYWxzZVxuICogb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7KEFycmF5fE9iamVjdCl9IGEgRmlyc3Qgb2JqZWN0IG9yIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyhBcnJheXxPYmplY3QpfSBiIFNlY29uZCBvYmplY3Qgb3IgYXJyYXkgdG8gY29tcGFyZS5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSB0d28gdmFsdWVzIGFyZSBzaGFsbG93IGVxdWFsLlxuICovXG5mdW5jdGlvbiBpc1NoYWxsb3dFcXVhbCggYSwgYiApIHtcblx0aWYgKCBhICYmIGIgKSB7XG5cdFx0aWYgKCBhLmNvbnN0cnVjdG9yID09PSBPYmplY3QgJiYgYi5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ICkge1xuXHRcdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsT2JqZWN0cyggYSwgYiApO1xuXHRcdH0gZWxzZSBpZiAoIGlzQXJyYXkoIGEgKSAmJiBpc0FycmF5KCBiICkgKSB7XG5cdFx0XHRyZXR1cm4gaXNTaGFsbG93RXF1YWxBcnJheXMoIGEsIGIgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYSA9PT0gYjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NoYWxsb3dFcXVhbDtcbm1vZHVsZS5leHBvcnRzLmlzU2hhbGxvd0VxdWFsT2JqZWN0cyA9IGlzU2hhbGxvd0VxdWFsT2JqZWN0cztcbm1vZHVsZS5leHBvcnRzLmlzU2hhbGxvd0VxdWFsQXJyYXlzID0gaXNTaGFsbG93RXF1YWxBcnJheXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gT2JqZWN0LmtleXM7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gb2JqZWN0cyBhcmUgc2hhbGxvdyBlcXVhbCwgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIEZpcnN0IG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IGIgU2Vjb25kIG9iamVjdCB0byBjb21wYXJlLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIHR3byBvYmplY3RzIGFyZSBzaGFsbG93IGVxdWFsLlxuICovXG5mdW5jdGlvbiBpc1NoYWxsb3dFcXVhbE9iamVjdHMoIGEsIGIgKSB7XG5cdHZhciBhS2V5cywgYktleXMsIGksIGtleTtcblxuXHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhS2V5cyA9IGtleXMoIGEgKTtcblx0YktleXMgPSBrZXlzKCBiICk7XG5cblx0aWYgKCBhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpID0gMDtcblxuXHR3aGlsZSAoIGkgPCBhS2V5cy5sZW5ndGggKSB7XG5cdFx0a2V5ID0gYUtleXNbIGkgXTtcblx0XHRpZiAoIGFbIGtleSBdICE9PSBiWyBrZXkgXSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpKys7XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NoYWxsb3dFcXVhbE9iamVjdHM7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIHdhcm5pbmcgY2FjaGUgd2hlbiB0ZXN0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIVJlYWN0SXMuaXNWYWxpZEVsZW1lbnRUeXBlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50IHR5cGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudHMgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAnQSBjb21tb24gbWlzdGFrZSBpcyB0byB3cml0ZSBvbmVPZih4LCB5LCB6KSBpbnN0ZWFkIG9mIG9uZU9mKFt4LCB5LCB6XSkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMsIGZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3ltYm9sJykge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIFN0cmluZyhwcm9wVmFsdWUpICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChoYXMocHJvcFZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5jb21wb25lbnRzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5pMThuOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52YWxpZGF0b3JzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52YWx1ZU9iamVjdHM7IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5jb21wb25lbnRzOyIsIm1vZHVsZS5leHBvcnRzID0gd3AuY29tcG9zZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdwLmRhdGE7IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5lbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gbG9kYXNoOyIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7Il0sInNvdXJjZVJvb3QiOiIifQ==
this["eejs"] = this["eejs"] || {}; this["eejs"]["editorHocs"] =
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

/***/ "./assets/src/editor/hocs/editor-modal/index.js":
/*!******************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/index.js ***!
  \******************************************************/
/*! exports provided: withEditor, withEditorModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _with_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./with-editor */ "./assets/src/editor/hocs/editor-modal/with-editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditor", function() { return _with_editor__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _with_editor_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./with-editor-modal */ "./assets/src/editor/hocs/editor-modal/with-editor-modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditorModal", function() { return _with_editor_modal__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./assets/src/editor/hocs/editor-modal/style.css":
/*!*******************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/style.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"components-modal__screen-overlay":"components-modal__screen-overlay","ee-editor-modal-overlay":"ee-editor-modal-overlay","components-modal__frame":"components-modal__frame","ee-editor-modal":"ee-editor-modal","ee-editor-modal-tiny":"ee-editor-modal-tiny","ee-editor-modal-small":"ee-editor-modal-small","components-modal__header":"components-modal__header","components-icon-button":"components-icon-button","components-panel__body":"components-panel__body","components-panel__body-title":"components-panel__body-title","components-button":"components-button","components-modal__content":"components-modal__content","components-modal__header-heading":"components-modal__header-heading"};

/***/ }),

/***/ "./assets/src/editor/hocs/editor-modal/with-editor-modal.js":
/*!******************************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/with-editor-modal.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style.css */ "./assets/src/editor/hocs/editor-modal/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_8__);





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

var withEditorModal = Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__["createHigherOrderComponent"])(function (mainModalProps) {
  return function (WrappedComponent) {
    return function (_ref) {
      var _classNames;

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
          passedProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_ref, ["editorOpen", "toggleEditor", "doRefresh", "modalProps", "id", "buttonLabel", "onClose", "onOpen"]);

      Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
        if (editorOpen) {
          onOpen();
        }
      }, [editorOpen, onOpen]);
      var closeAction = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
        Object(lodash__WEBPACK_IMPORTED_MODULE_5__["flow"])([doRefresh, toggleEditor, onClose])();
      }, [toggleEditor, doRefresh, onClose]);
      modalProps = modalProps ? modalProps : mainModalProps;

      var _modalProps = modalProps,
          title = _modalProps.title,
          customClass = _modalProps.customClass,
          closeButtonLabel = _modalProps.closeButtonLabel,
          extraModalProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_modalProps, ["title", "customClass", "closeButtonLabel"]);

      buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
      var htmlClass = classnames__WEBPACK_IMPORTED_MODULE_4___default()((_classNames = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classNames, customClass, customClass), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classNames, 'ee-editor-modal', true), _classNames));
      return editorOpen ? React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Modal"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        id: id,
        title: title,
        className: htmlClass,
        onRequestClose: closeAction,
        closeButtonLabel: buttonLabel,
        overlayClassName: 'ee-editor-modal-overlay'
      }, extraModalProps), React.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        editorOpen: editorOpen,
        toggleEditor: toggleEditor
      }, passedProps))) : null;
    };
  };
}, 'withEditorModal');
/* harmony default export */ __webpack_exports__["default"] = (withEditorModal);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/editor/hocs/editor-modal/with-editor.js":
/*!************************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/with-editor.js ***!
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
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__);










/**
 * External imports
 */



var _window = window,
    confirm = _window.confirm;
/**
 * withEditor
 * controls toggling of the withEditorModal HOC
 * wraps the component that contains the withEditorModal
 *
 * @function
 * @param {string} closeEditorNotice 	message displayed if user attempts
 * 										to close modal when changes are not
 * 										yet saved. To override the appearance
 * 										of the closeEditorNotice, simply pass
 * 										an empty string for this prop
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

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "changesSaved", function () {
        var changesSaved = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _this.setState({
          changesSaved: changesSaved
        });
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "toggleEditor", function (event) {
        if (event && event.preventDefault) {
          event.preventDefault();
          event.stopPropagation();
        }

        _this.setState(function (prevState) {
          if (_this.state.closeEditorNotice !== '' && prevState.editorOpen && !prevState.changesSaved) {
            return {
              editorOpen: !confirm(_this.state.closeEditorNotice)
            };
          }

          return {
            editorOpen: !prevState.editorOpen
          };
        });
      });

      var closeEditorNotice = props.closeEditorNotice !== undefined ? props.closeEditorNotice : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__["__"])('Are you sure you want to close the Editor?%sAll unsaved changes will be lost!', 'event_espresso'), '\n\n');
      _this.state = {
        editorOpen: false,
        changesSaved: true,
        closeEditorNotice: closeEditorNotice
      };
      return _this;
    }
    /**
     * will mark that changes have been saved which allows the modal to
     * be closed without triggering the display of the closeEditorNotice
     *
     * @function
     * @param {boolean} changesSaved
     */


    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(_temp, [{
      key: "render",
      value: function render() {
        return React.createElement(OriginalComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
          editorOpen: this.state.editorOpen,
          toggleEditor: this.toggleEditor,
          changesSaved: this.changesSaved
        }));
      }
    }]);

    return _temp;
  }(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["Component"]), _temp;
}, 'withEditor');
/* harmony default export */ __webpack_exports__["default"] = (withEditor);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/editor/hocs/if-validators/if-valid-date-entity.js":
/*!**********************************************************************!*\
  !*** ./assets/src/editor/hocs/if-validators/if-valid-date-entity.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__["createHigherOrderComponent"])(Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__["ifCondition"])(function (_ref) {
  var dateEntity = _ref.dateEntity;
  return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(dateEntity, 'datetime');
}), 'ifValidDateEntity'));

/***/ }),

/***/ "./assets/src/editor/hocs/if-validators/index.js":
/*!*******************************************************!*\
  !*** ./assets/src/editor/hocs/if-validators/index.js ***!
  \*******************************************************/
/*! exports provided: ifValidDateEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _if_valid_date_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if-valid-date-entity */ "./assets/src/editor/hocs/if-validators/if-valid-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidDateEntity", function() { return _if_valid_date_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./assets/src/editor/hocs/index.js":
/*!*****************************************!*\
  !*** ./assets/src/editor/hocs/index.js ***!
  \*****************************************/
/*! exports provided: withEditor, withEditorModal, NotWithPostTypeCheck, ifValidDateEntity, withEventVenueEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/editor/hocs/editor-modal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["withEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["withEditorModal"]; });

/* harmony import */ var _if_validators___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-validators/ */ "./assets/src/editor/hocs/if-validators/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidDateEntity", function() { return _if_validators___WEBPACK_IMPORTED_MODULE_1__["ifValidDateEntity"]; });

/* harmony import */ var _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./not-with-post-type-check */ "./assets/src/editor/hocs/not-with-post-type-check/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotWithPostTypeCheck", function() { return _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _with_entity_hocs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./with-entity-hocs */ "./assets/src/editor/hocs/with-entity-hocs/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEventVenueEntity", function() { return _with_entity_hocs__WEBPACK_IMPORTED_MODULE_3__["withEventVenueEntity"]; });






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

/***/ "./assets/src/editor/hocs/with-entity-hocs/index.js":
/*!**********************************************************!*\
  !*** ./assets/src/editor/hocs/with-entity-hocs/index.js ***!
  \**********************************************************/
/*! exports provided: withEventVenueEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _with_event_venue_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./with-event-venue-entity */ "./assets/src/editor/hocs/with-entity-hocs/with-event-venue-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEventVenueEntity", function() { return _with_event_venue_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./assets/src/editor/hocs/with-entity-hocs/with-event-venue-entity.js":
/*!****************************************************************************!*\
  !*** ./assets/src/editor/hocs/with-entity-hocs/with-event-venue-entity.js ***!
  \****************************************************************************/
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



var DEFAULT_OBJECT = {
  venueEntity: null,
  venueEntityLoaded: false
};
/**
 * withEventVenueEntity
 * returns an object containing the following:
 *    venueEntity - the Venue Entity for the provided Event Entity
 *    venueEntityLoaded - boolean true if loading is complete
 *
 * @function
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__["createHigherOrderComponent"])(Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["withSelect"])(function (select, _ref) {
  var eventEntity = _ref.eventEntity;

  var _select = select('eventespresso/core'),
      getRelatedEntities = _select.getRelatedEntities;

  var _select2 = select('core/data'),
      hasFinishedResolution = _select2.hasFinishedResolution;

  if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(eventEntity, 'event')) {
    var venueEntity = getRelatedEntities(eventEntity, 'venue');
    var venueEntityLoaded = hasFinishedResolution('eventespresso/core', 'getRelatedEntities', [eventEntity, 'venue']);

    if (venueEntityLoaded) {
      venueEntity = Array.isArray(venueEntity) && venueEntity[0] && Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(venueEntity[0], 'venue') ? venueEntity[0] : null;
      return {
        venueEntity: venueEntity,
        venueEntityLoaded: venueEntityLoaded
      };
    }
  }

  return DEFAULT_OBJECT;
}), 'withEventVenueEntity'));

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

/***/ "classnames":
/*!********************************************************!*\
  !*** external {"this":["eejs","vendor","classnames"]} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["vendor"]["classnames"]; }());

/***/ }),

/***/ "lodash":
/*!**********************************!*\
  !*** external {"this":"lodash"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["lodash"]; }());

/***/ }),

/***/ "react":
/*!*********************************!*\
  !*** external {"this":"React"} ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvc3R5bGUuY3NzP2I3MzkiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvd2l0aC1lZGl0b3ItbW9kYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvd2l0aC1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pZi12YWxpZGF0b3JzL2lmLXZhbGlkLWRhdGUtZW50aXR5LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvaWYtdmFsaWRhdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3Mvbm90LXdpdGgtcG9zdC10eXBlLWNoZWNrL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3Mvd2l0aC1lbnRpdHktaG9jcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL3dpdGgtZW50aXR5LWhvY3Mvd2l0aC1ldmVudC12ZW51ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImkxOG5cIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiY29tcG9uZW50c1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiY29tcG9zZVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZGF0YVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZWxlbWVudFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcImNsYXNzbmFtZXNcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpcIlJlYWN0XCJ9Il0sIm5hbWVzIjpbIndpdGhFZGl0b3JNb2RhbCIsImNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IiwibWFpbk1vZGFsUHJvcHMiLCJXcmFwcGVkQ29tcG9uZW50IiwiZWRpdG9yT3BlbiIsInRvZ2dsZUVkaXRvciIsImRvUmVmcmVzaCIsIm1vZGFsUHJvcHMiLCJpZCIsImJ1dHRvbkxhYmVsIiwib25DbG9zZSIsIm9uT3BlbiIsInBhc3NlZFByb3BzIiwidXNlRWZmZWN0IiwiY2xvc2VBY3Rpb24iLCJ1c2VDYWxsYmFjayIsImZsb3ciLCJ0aXRsZSIsImN1c3RvbUNsYXNzIiwiY2xvc2VCdXR0b25MYWJlbCIsImV4dHJhTW9kYWxQcm9wcyIsImh0bWxDbGFzcyIsImNsYXNzTmFtZXMiLCJ3aW5kb3ciLCJjb25maXJtIiwid2l0aEVkaXRvciIsIk9yaWdpbmFsQ29tcG9uZW50IiwicHJvcHMiLCJjaGFuZ2VzU2F2ZWQiLCJzZXRTdGF0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2U3RhdGUiLCJzdGF0ZSIsImNsb3NlRWRpdG9yTm90aWNlIiwidW5kZWZpbmVkIiwic3ByaW50ZiIsIl9fIiwiQ29tcG9uZW50IiwiaWZDb25kaXRpb24iLCJkYXRlRW50aXR5IiwiaXNNb2RlbEVudGl0eU9mTW9kZWwiLCJOb3RXaXRoUG9zdFR5cGVDaGVjayIsInBvc3RUeXBlIiwiY2hpbGRyZW4iLCJleGNsdWRlZFBvc3RUeXBlU2x1Z3MiLCJpc0V4Y2x1ZGVkIiwic29tZSIsImNhc3RBcnJheSIsInR5cGUiLCJ3aXRoU2VsZWN0Iiwic2VsZWN0IiwiZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSIsIkRFRkFVTFRfT0JKRUNUIiwidmVudWVFbnRpdHkiLCJ2ZW51ZUVudGl0eUxvYWRlZCIsImV2ZW50RW50aXR5IiwiZ2V0UmVsYXRlZEVudGl0aWVzIiwiaGFzRmluaXNoZWRSZXNvbHV0aW9uIiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVB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Ozs7Ozs7OztBQ0ExRCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLHVEQUF1RCxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRFLGFBQWEsaUNBQWlDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBaEQsYUFBYSxnQ0FBZ0MsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28tZWRpdG9yLWhvY3MuODQ0MTg3NTljNmRjMjRiNDg3MWMuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aEVkaXRvciB9IGZyb20gJy4vd2l0aC1lZGl0b3InO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoRWRpdG9yTW9kYWwgfSBmcm9tICcuL3dpdGgtZWRpdG9yLW1vZGFsJztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJjb21wb25lbnRzLW1vZGFsX19zY3JlZW4tb3ZlcmxheVwiOlwiY29tcG9uZW50cy1tb2RhbF9fc2NyZWVuLW92ZXJsYXlcIixcImVlLWVkaXRvci1tb2RhbC1vdmVybGF5XCI6XCJlZS1lZGl0b3ItbW9kYWwtb3ZlcmxheVwiLFwiY29tcG9uZW50cy1tb2RhbF9fZnJhbWVcIjpcImNvbXBvbmVudHMtbW9kYWxfX2ZyYW1lXCIsXCJlZS1lZGl0b3ItbW9kYWxcIjpcImVlLWVkaXRvci1tb2RhbFwiLFwiZWUtZWRpdG9yLW1vZGFsLXRpbnlcIjpcImVlLWVkaXRvci1tb2RhbC10aW55XCIsXCJlZS1lZGl0b3ItbW9kYWwtc21hbGxcIjpcImVlLWVkaXRvci1tb2RhbC1zbWFsbFwiLFwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyXCI6XCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXJcIixcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIjpcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIixcImNvbXBvbmVudHMtcGFuZWxfX2JvZHlcIjpcImNvbXBvbmVudHMtcGFuZWxfX2JvZHlcIixcImNvbXBvbmVudHMtcGFuZWxfX2JvZHktdGl0bGVcIjpcImNvbXBvbmVudHMtcGFuZWxfX2JvZHktdGl0bGVcIixcImNvbXBvbmVudHMtYnV0dG9uXCI6XCJjb21wb25lbnRzLWJ1dHRvblwiLFwiY29tcG9uZW50cy1tb2RhbF9fY29udGVudFwiOlwiY29tcG9uZW50cy1tb2RhbF9fY29udGVudFwiLFwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyLWhlYWRpbmdcIjpcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlci1oZWFkaW5nXCJ9OyIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGZsb3cgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuLyoqXG4gKiB3aXRoRWRpdG9yTW9kYWxcbiAqIEhPQyBmb3Igd3JhcHBpbmcgYSBjb21wb25lbnQgd2l0aCBhIFdQIE1vZGFsIGNvbXBvbmVudFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG1haW5Nb2RhbFByb3BzXG4gKi9cbmNvbnN0IHdpdGhFZGl0b3JNb2RhbCA9IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KFxuXHQoIG1haW5Nb2RhbFByb3BzICkgPT4gKCBXcmFwcGVkQ29tcG9uZW50ICkgPT4gKCB7XG5cdFx0ZWRpdG9yT3Blbixcblx0XHR0b2dnbGVFZGl0b3IgPSAoKSA9PiBudWxsLFxuXHRcdGRvUmVmcmVzaCA9ICgpID0+IG51bGwsXG5cdFx0bW9kYWxQcm9wcyxcblx0XHRpZCxcblx0XHRidXR0b25MYWJlbCxcblx0XHRvbkNsb3NlID0gKCkgPT4gbnVsbCxcblx0XHRvbk9wZW4gPSAoKSA9PiBudWxsLFxuXHRcdC4uLnBhc3NlZFByb3BzXG5cdH0gKSA9PiB7XG5cdFx0dXNlRWZmZWN0KCAoKSA9PiB7XG5cdFx0XHRpZiAoIGVkaXRvck9wZW4gKSB7XG5cdFx0XHRcdG9uT3BlbigpO1xuXHRcdFx0fVxuXHRcdH0sIFsgZWRpdG9yT3Blbiwgb25PcGVuIF0gKTtcblx0XHRjb25zdCBjbG9zZUFjdGlvbiA9IHVzZUNhbGxiYWNrKCAoKSA9PiB7XG5cdFx0XHRmbG93KCBbIGRvUmVmcmVzaCwgdG9nZ2xlRWRpdG9yLCBvbkNsb3NlIF0gKSgpO1xuXHRcdH0sIFsgdG9nZ2xlRWRpdG9yLCBkb1JlZnJlc2gsIG9uQ2xvc2UgXSApO1xuXHRcdG1vZGFsUHJvcHMgPSBtb2RhbFByb3BzID9cblx0XHRcdG1vZGFsUHJvcHMgOlxuXHRcdFx0bWFpbk1vZGFsUHJvcHM7XG5cdFx0Y29uc3Qge1xuXHRcdFx0dGl0bGUsXG5cdFx0XHRjdXN0b21DbGFzcyxcblx0XHRcdGNsb3NlQnV0dG9uTGFiZWwsXG5cdFx0XHQuLi5leHRyYU1vZGFsUHJvcHNcblx0XHR9ID0gbW9kYWxQcm9wcztcblx0XHRidXR0b25MYWJlbCA9IGJ1dHRvbkxhYmVsID8gYnV0dG9uTGFiZWwgOiBjbG9zZUJ1dHRvbkxhYmVsO1xuXHRcdGNvbnN0IGh0bWxDbGFzcyA9IGNsYXNzTmFtZXMoIHtcblx0XHRcdFsgY3VzdG9tQ2xhc3MgXTogY3VzdG9tQ2xhc3MsXG5cdFx0XHQnZWUtZWRpdG9yLW1vZGFsJzogdHJ1ZSxcblx0XHR9ICk7XG5cdFx0cmV0dXJuIGVkaXRvck9wZW4gPyAoXG5cdFx0XHQ8TW9kYWxcblx0XHRcdFx0aWQ9eyBpZCB9XG5cdFx0XHRcdHRpdGxlPXsgdGl0bGUgfVxuXHRcdFx0XHRjbGFzc05hbWU9eyBodG1sQ2xhc3MgfVxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17IGNsb3NlQWN0aW9uIH1cblx0XHRcdFx0Y2xvc2VCdXR0b25MYWJlbD17IGJ1dHRvbkxhYmVsIH1cblx0XHRcdFx0b3ZlcmxheUNsYXNzTmFtZT17ICdlZS1lZGl0b3ItbW9kYWwtb3ZlcmxheScgfVxuXHRcdFx0XHR7IC4uLmV4dHJhTW9kYWxQcm9wcyB9XG5cdFx0XHQ+XG5cdFx0XHRcdDxXcmFwcGVkQ29tcG9uZW50XG5cdFx0XHRcdFx0ZWRpdG9yT3Blbj17IGVkaXRvck9wZW4gfVxuXHRcdFx0XHRcdHRvZ2dsZUVkaXRvcj17IHRvZ2dsZUVkaXRvciB9XG5cdFx0XHRcdFx0eyAuLi5wYXNzZWRQcm9wcyB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L01vZGFsPlxuXHRcdCkgOiBudWxsO1xuXHR9LFxuXHQnd2l0aEVkaXRvck1vZGFsJ1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVkaXRvck1vZGFsO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBfXywgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG5jb25zdCB7IGNvbmZpcm0gfSA9IHdpbmRvdztcblxuLyoqXG4gKiB3aXRoRWRpdG9yXG4gKiBjb250cm9scyB0b2dnbGluZyBvZiB0aGUgd2l0aEVkaXRvck1vZGFsIEhPQ1xuICogd3JhcHMgdGhlIGNvbXBvbmVudCB0aGF0IGNvbnRhaW5zIHRoZSB3aXRoRWRpdG9yTW9kYWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbG9zZUVkaXRvck5vdGljZSBcdG1lc3NhZ2UgZGlzcGxheWVkIGlmIHVzZXIgYXR0ZW1wdHNcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0dG8gY2xvc2UgbW9kYWwgd2hlbiBjaGFuZ2VzIGFyZSBub3RcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0eWV0IHNhdmVkLiBUbyBvdmVycmlkZSB0aGUgYXBwZWFyYW5jZVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRvZiB0aGUgY2xvc2VFZGl0b3JOb3RpY2UsIHNpbXBseSBwYXNzXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGFuIGVtcHR5IHN0cmluZyBmb3IgdGhpcyBwcm9wXG4gKi9cbmNvbnN0IHdpdGhFZGl0b3IgPSBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0KCBPcmlnaW5hbENvbXBvbmVudCApID0+IHtcblx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdFx0Y29uc3RydWN0b3IoIHByb3BzICkge1xuXHRcdFx0XHRzdXBlciggcHJvcHMgKTtcblx0XHRcdFx0Y29uc3QgY2xvc2VFZGl0b3JOb3RpY2UgPSBwcm9wcy5jbG9zZUVkaXRvck5vdGljZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0XHRwcm9wcy5jbG9zZUVkaXRvck5vdGljZSA6XG5cdFx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0XHQnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsb3NlIHRoZSBFZGl0b3I/JXNBbGwgdW5zYXZlZCBjaGFuZ2VzIHdpbGwgYmUgbG9zdCEnLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0J1xcblxcbidcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0XHRcdGVkaXRvck9wZW46IGZhbHNlLFxuXHRcdFx0XHRcdGNoYW5nZXNTYXZlZDogdHJ1ZSxcblx0XHRcdFx0XHRjbG9zZUVkaXRvck5vdGljZSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiB3aWxsIG1hcmsgdGhhdCBjaGFuZ2VzIGhhdmUgYmVlbiBzYXZlZCB3aGljaCBhbGxvd3MgdGhlIG1vZGFsIHRvXG5cdFx0XHQgKiBiZSBjbG9zZWQgd2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBkaXNwbGF5IG9mIHRoZSBjbG9zZUVkaXRvck5vdGljZVxuXHRcdFx0ICpcblx0XHRcdCAqIEBmdW5jdGlvblxuXHRcdFx0ICogQHBhcmFtIHtib29sZWFufSBjaGFuZ2VzU2F2ZWRcblx0XHRcdCAqL1xuXHRcdFx0Y2hhbmdlc1NhdmVkID0gKCBjaGFuZ2VzU2F2ZWQgPSBmYWxzZSApID0+IHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSggeyBjaGFuZ2VzU2F2ZWQgfSApO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBvcGVucyBhbmQgY2xvc2VzIHdpdGhFZGl0b3JNb2RhbFxuXHRcdFx0ICpcblx0XHRcdCAqIEBmdW5jdGlvblxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gY2xpY2sgZXZlbnRcblx0XHRcdCAqL1xuXHRcdFx0dG9nZ2xlRWRpdG9yID0gKCBldmVudCApID0+IHtcblx0XHRcdFx0aWYgKCBldmVudCAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoICggcHJldlN0YXRlICkgPT4ge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGUuY2xvc2VFZGl0b3JOb3RpY2UgIT09ICcnICYmXG5cdFx0XHRcdFx0XHRwcmV2U3RhdGUuZWRpdG9yT3BlbiAmJiAhIHByZXZTdGF0ZS5jaGFuZ2VzU2F2ZWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRlZGl0b3JPcGVuOiAhIGNvbmZpcm0oXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXRlLmNsb3NlRWRpdG9yTm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdHsgZWRpdG9yT3BlbjogISBwcmV2U3RhdGUuZWRpdG9yT3BlbiB9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fTtcblxuXHRcdFx0cmVuZGVyKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxPcmlnaW5hbENvbXBvbmVudFxuXHRcdFx0XHRcdFx0eyAuLi50aGlzLnByb3BzIH1cblx0XHRcdFx0XHRcdGVkaXRvck9wZW49eyB0aGlzLnN0YXRlLmVkaXRvck9wZW4gfVxuXHRcdFx0XHRcdFx0dG9nZ2xlRWRpdG9yPXsgdGhpcy50b2dnbGVFZGl0b3IgfVxuXHRcdFx0XHRcdFx0Y2hhbmdlc1NhdmVkPXsgdGhpcy5jaGFuZ2VzU2F2ZWQgfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSxcblx0J3dpdGhFZGl0b3InXG4pO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoRWRpdG9yO1xuIiwiaW1wb3J0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQsIGlmQ29uZGl0aW9uIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KFxuXHRpZkNvbmRpdGlvbihcblx0XHQoIHsgZGF0ZUVudGl0eSB9ICkgPT4gaXNNb2RlbEVudGl0eU9mTW9kZWwoXG5cdFx0XHRkYXRlRW50aXR5LFxuXHRcdFx0J2RhdGV0aW1lJ1xuXHRcdClcblx0KSxcblx0J2lmVmFsaWREYXRlRW50aXR5J1xuKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgaWZWYWxpZERhdGVFbnRpdHkgfSBmcm9tICcuL2lmLXZhbGlkLWRhdGUtZW50aXR5JztcbiIsImV4cG9ydCB7IHdpdGhFZGl0b3IsIHdpdGhFZGl0b3JNb2RhbCB9IGZyb20gJy4vZWRpdG9yLW1vZGFsJztcbmV4cG9ydCAqIGZyb20gJy4vaWYtdmFsaWRhdG9ycy8nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb3RXaXRoUG9zdFR5cGVDaGVjayB9IGZyb20gJy4vbm90LXdpdGgtcG9zdC10eXBlLWNoZWNrJztcbmV4cG9ydCAqIGZyb20gJy4vd2l0aC1lbnRpdHktaG9jcyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgc29tZSwgY2FzdEFycmF5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHdpdGggcmVuZGVycyBpdHMgb3duIGNoaWxkcmVuIG9seSBpZiB0aGUgY3VycmVudCBlZGl0b3IgcG9zdCB0eXBlXG4gKiBpcyBub3Qgb25lIG9mIHRoZSBnaXZlbiBgZXhjbHVkZWRQb3N0VHlwZVNsdWdzYCBwcm9wLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3N0VHlwZVxuICogQHBhcmFtIHtXUEVsZW1lbnR9IGNoaWxkcmVuXG4gKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBleGNsdWRlZFBvc3RUeXBlU2x1Z3NcbiAqIEByZXR1cm4gez9XUEVsZW1lbnR9IFJlbmRlcmVkIGVsZW1lbnQgb3IgbnVsbC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gTm90V2l0aFBvc3RUeXBlQ2hlY2soIHtcblx0cG9zdFR5cGUsXG5cdGNoaWxkcmVuLFxuXHRleGNsdWRlZFBvc3RUeXBlU2x1Z3MsXG59ICkge1xuXHRsZXQgaXNFeGNsdWRlZCA9IGZhbHNlO1xuXHRpZiAoIHBvc3RUeXBlICkge1xuXHRcdGlzRXhjbHVkZWQgPSBzb21lKFxuXHRcdFx0Y2FzdEFycmF5KCBleGNsdWRlZFBvc3RUeXBlU2x1Z3MgKSxcblx0XHRcdCggdHlwZSApID0+IHBvc3RUeXBlID09PSB0eXBlXG5cdFx0KTtcblx0fVxuXHRpZiAoIGlzRXhjbHVkZWQgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gY2hpbGRyZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRjb25zdCB7IGdldEVkaXRlZFBvc3RBdHRyaWJ1dGUgfSA9IHNlbGVjdCggJ2NvcmUvZWRpdG9yJyApO1xuXHRyZXR1cm4ge1xuXHRcdHBvc3RUeXBlOiBnZXRFZGl0ZWRQb3N0QXR0cmlidXRlKCAndHlwZScgKSxcblx0fTtcbn0gKSggTm90V2l0aFBvc3RUeXBlQ2hlY2sgKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aEV2ZW50VmVudWVFbnRpdHkgfSBmcm9tICcuL3dpdGgtZXZlbnQtdmVudWUtZW50aXR5JztcbiIsImltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVF9PQkpFQ1QgPSB7XG5cdHZlbnVlRW50aXR5OiBudWxsLFxuXHR2ZW51ZUVudGl0eUxvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIHdpdGhFdmVudFZlbnVlRW50aXR5XG4gKiByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmc6XG4gKiAgICB2ZW51ZUVudGl0eSAtIHRoZSBWZW51ZSBFbnRpdHkgZm9yIHRoZSBwcm92aWRlZCBFdmVudCBFbnRpdHlcbiAqICAgIHZlbnVlRW50aXR5TG9hZGVkIC0gYm9vbGVhbiB0cnVlIGlmIGxvYWRpbmcgaXMgY29tcGxldGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdHdpdGhTZWxlY3QoICggc2VsZWN0LCB7IGV2ZW50RW50aXR5IH0gKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RW50aXR5LCAnZXZlbnQnICkgKSB7XG5cdFx0XHRsZXQgdmVudWVFbnRpdHkgPSBnZXRSZWxhdGVkRW50aXRpZXMoXG5cdFx0XHRcdGV2ZW50RW50aXR5LFxuXHRcdFx0XHQndmVudWUnXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgdmVudWVFbnRpdHlMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFx0WyBldmVudEVudGl0eSwgJ3ZlbnVlJyBdXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCB2ZW51ZUVudGl0eUxvYWRlZCApIHtcblx0XHRcdFx0dmVudWVFbnRpdHkgPSBBcnJheS5pc0FycmF5KCB2ZW51ZUVudGl0eSApICYmIHZlbnVlRW50aXR5WyAwIF0gJiZcblx0XHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIHZlbnVlRW50aXR5WyAwIF0sICd2ZW51ZScgKSA/XG5cdFx0XHRcdFx0dmVudWVFbnRpdHlbIDAgXSA6XG5cdFx0XHRcdFx0bnVsbDtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR2ZW51ZUVudGl0eSxcblx0XHRcdFx0XHR2ZW51ZUVudGl0eUxvYWRlZCxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIERFRkFVTFRfT0JKRUNUO1xuXHR9ICksXG5cdCd3aXRoRXZlbnRWZW51ZUVudGl0eSdcbik7XG4iLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaTE4blwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb25lbnRzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb3NlXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcImNsYXNzbmFtZXNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
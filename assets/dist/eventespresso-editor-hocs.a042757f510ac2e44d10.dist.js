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
module.exports = {"components-modal__frame":"components-modal__frame","ee-editor-modal":"ee-editor-modal","ee-editor-modal-tiny":"ee-editor-modal-tiny","ee-editor-modal-small":"ee-editor-modal-small","components-modal__header":"components-modal__header","components-icon-button":"components-icon-button","components-modal__content":"components-modal__content","components-modal__header-heading":"components-modal__header-heading"};

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
        closeButtonLabel: buttonLabel
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

/***/ "./assets/src/editor/hocs/index.js":
/*!*****************************************!*\
  !*** ./assets/src/editor/hocs/index.js ***!
  \*****************************************/
/*! exports provided: withEditor, withEditorModal, NotWithPostTypeCheck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/editor/hocs/editor-modal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["withEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["withEditorModal"]; });

/* harmony import */ var _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not-with-post-type-check */ "./assets/src/editor/hocs/not-with-post-type-check/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotWithPostTypeCheck", function() { return _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_1__["default"]; });




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvc3R5bGUuY3NzP2I3MzkiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvd2l0aC1lZGl0b3ItbW9kYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvd2l0aC1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL25vdC13aXRoLXBvc3QtdHlwZS1jaGVjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiY29tcG9uZW50c1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiY29tcG9zZVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZGF0YVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZWxlbWVudFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcImNsYXNzbmFtZXNcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpcIlJlYWN0XCJ9Il0sIm5hbWVzIjpbIndpdGhFZGl0b3JNb2RhbCIsImNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IiwibWFpbk1vZGFsUHJvcHMiLCJXcmFwcGVkQ29tcG9uZW50IiwiZWRpdG9yT3BlbiIsInRvZ2dsZUVkaXRvciIsImRvUmVmcmVzaCIsIm1vZGFsUHJvcHMiLCJpZCIsImJ1dHRvbkxhYmVsIiwib25DbG9zZSIsIm9uT3BlbiIsInBhc3NlZFByb3BzIiwidXNlRWZmZWN0IiwiY2xvc2VBY3Rpb24iLCJ1c2VDYWxsYmFjayIsImZsb3ciLCJ0aXRsZSIsImN1c3RvbUNsYXNzIiwiY2xvc2VCdXR0b25MYWJlbCIsImV4dHJhTW9kYWxQcm9wcyIsImh0bWxDbGFzcyIsImNsYXNzTmFtZXMiLCJ3aW5kb3ciLCJjb25maXJtIiwid2l0aEVkaXRvciIsIk9yaWdpbmFsQ29tcG9uZW50IiwicHJvcHMiLCJjaGFuZ2VzU2F2ZWQiLCJzZXRTdGF0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2U3RhdGUiLCJzdGF0ZSIsImNsb3NlRWRpdG9yTm90aWNlIiwidW5kZWZpbmVkIiwic3ByaW50ZiIsIl9fIiwiQ29tcG9uZW50IiwiTm90V2l0aFBvc3RUeXBlQ2hlY2siLCJwb3N0VHlwZSIsImNoaWxkcmVuIiwiZXhjbHVkZWRQb3N0VHlwZVNsdWdzIiwiaXNFeGNsdWRlZCIsInNvbWUiLCJjYXN0QXJyYXkiLCJ0eXBlIiwid2l0aFNlbGVjdCIsInNlbGVjdCIsImdldEVkaXRlZFBvc3RBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0Esa0JBQWtCLDZaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEbEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUdBO0FBRUE7Ozs7Ozs7O0FBT0EsSUFBTUEsZUFBZSxHQUFHQyxxRkFBMEIsQ0FDakQsVUFBRUMsY0FBRjtBQUFBLFNBQXNCLFVBQUVDLGdCQUFGO0FBQUEsV0FBd0IsZ0JBVXZDO0FBQUE7O0FBQUEsVUFUTkMsVUFTTSxRQVROQSxVQVNNO0FBQUEs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dkQsYUFBYSxxQ0FBcUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FwRCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEsdURBQXVELEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEUsYUFBYSxpQ0FBaUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRCxhQUFhLGdDQUFnQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1lZGl0b3ItaG9jcy5hMDQyNzU3ZjUxMGFjMmU0NGQxMC5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoRWRpdG9yIH0gZnJvbSAnLi93aXRoLWVkaXRvcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhFZGl0b3JNb2RhbCB9IGZyb20gJy4vd2l0aC1lZGl0b3ItbW9kYWwnO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImNvbXBvbmVudHMtbW9kYWxfX2ZyYW1lXCI6XCJjb21wb25lbnRzLW1vZGFsX19mcmFtZVwiLFwiZWUtZWRpdG9yLW1vZGFsXCI6XCJlZS1lZGl0b3ItbW9kYWxcIixcImVlLWVkaXRvci1tb2RhbC10aW55XCI6XCJlZS1lZGl0b3ItbW9kYWwtdGlueVwiLFwiZWUtZWRpdG9yLW1vZGFsLXNtYWxsXCI6XCJlZS1lZGl0b3ItbW9kYWwtc21hbGxcIixcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlclwiOlwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyXCIsXCJjb21wb25lbnRzLWljb24tYnV0dG9uXCI6XCJjb21wb25lbnRzLWljb24tYnV0dG9uXCIsXCJjb21wb25lbnRzLW1vZGFsX19jb250ZW50XCI6XCJjb21wb25lbnRzLW1vZGFsX19jb250ZW50XCIsXCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXItaGVhZGluZ1wiOlwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyLWhlYWRpbmdcIn07IiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZmxvdyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG4vKipcbiAqIHdpdGhFZGl0b3JNb2RhbFxuICogSE9DIGZvciB3cmFwcGluZyBhIGNvbXBvbmVudCB3aXRoIGEgV1AgTW9kYWwgY29tcG9uZW50XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gbWFpbk1vZGFsUHJvcHNcbiAqL1xuY29uc3Qgd2l0aEVkaXRvck1vZGFsID0gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdCggbWFpbk1vZGFsUHJvcHMgKSA9PiAoIFdyYXBwZWRDb21wb25lbnQgKSA9PiAoIHtcblx0XHRlZGl0b3JPcGVuLFxuXHRcdHRvZ2dsZUVkaXRvciA9ICgpID0+IG51bGwsXG5cdFx0ZG9SZWZyZXNoID0gKCkgPT4gbnVsbCxcblx0XHRtb2RhbFByb3BzLFxuXHRcdGlkLFxuXHRcdGJ1dHRvbkxhYmVsLFxuXHRcdG9uQ2xvc2UgPSAoKSA9PiBudWxsLFxuXHRcdG9uT3BlbiA9ICgpID0+IG51bGwsXG5cdFx0Li4ucGFzc2VkUHJvcHNcblx0fSApID0+IHtcblx0XHR1c2VFZmZlY3QoICgpID0+IHtcblx0XHRcdGlmICggZWRpdG9yT3BlbiApIHtcblx0XHRcdFx0b25PcGVuKCk7XG5cdFx0XHR9XG5cdFx0fSwgWyBlZGl0b3JPcGVuLCBvbk9wZW4gXSApO1xuXHRcdGNvbnN0IGNsb3NlQWN0aW9uID0gdXNlQ2FsbGJhY2soICgpID0+IHtcblx0XHRcdGZsb3coIFsgZG9SZWZyZXNoLCB0b2dnbGVFZGl0b3IsIG9uQ2xvc2UgXSApKCk7XG5cdFx0fSwgWyB0b2dnbGVFZGl0b3IsIGRvUmVmcmVzaCwgb25DbG9zZSBdICk7XG5cdFx0bW9kYWxQcm9wcyA9IG1vZGFsUHJvcHMgP1xuXHRcdFx0bW9kYWxQcm9wcyA6XG5cdFx0XHRtYWluTW9kYWxQcm9wcztcblx0XHRjb25zdCB7XG5cdFx0XHR0aXRsZSxcblx0XHRcdGN1c3RvbUNsYXNzLFxuXHRcdFx0Y2xvc2VCdXR0b25MYWJlbCxcblx0XHRcdC4uLmV4dHJhTW9kYWxQcm9wc1xuXHRcdH0gPSBtb2RhbFByb3BzO1xuXHRcdGJ1dHRvbkxhYmVsID0gYnV0dG9uTGFiZWwgPyBidXR0b25MYWJlbCA6IGNsb3NlQnV0dG9uTGFiZWw7XG5cdFx0Y29uc3QgaHRtbENsYXNzID0gY2xhc3NOYW1lcygge1xuXHRcdFx0WyBjdXN0b21DbGFzcyBdOiBjdXN0b21DbGFzcyxcblx0XHRcdCdlZS1lZGl0b3ItbW9kYWwnOiB0cnVlLFxuXHRcdH0gKTtcblx0XHRyZXR1cm4gZWRpdG9yT3BlbiA/IChcblx0XHRcdDxNb2RhbFxuXHRcdFx0XHRpZD17IGlkIH1cblx0XHRcdFx0dGl0bGU9eyB0aXRsZSB9XG5cdFx0XHRcdGNsYXNzTmFtZT17IGh0bWxDbGFzcyB9XG5cdFx0XHRcdG9uUmVxdWVzdENsb3NlPXsgY2xvc2VBY3Rpb24gfVxuXHRcdFx0XHRjbG9zZUJ1dHRvbkxhYmVsPXsgYnV0dG9uTGFiZWwgfVxuXHRcdFx0XHR7IC4uLmV4dHJhTW9kYWxQcm9wcyB9XG5cdFx0XHQ+XG5cdFx0XHRcdDxXcmFwcGVkQ29tcG9uZW50XG5cdFx0XHRcdFx0ZWRpdG9yT3Blbj17IGVkaXRvck9wZW4gfVxuXHRcdFx0XHRcdHRvZ2dsZUVkaXRvcj17IHRvZ2dsZUVkaXRvciB9XG5cdFx0XHRcdFx0eyAuLi5wYXNzZWRQcm9wcyB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L01vZGFsPlxuXHRcdCkgOiBudWxsO1xuXHR9LFxuXHQnd2l0aEVkaXRvck1vZGFsJ1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVkaXRvck1vZGFsO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBfXywgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG5jb25zdCB7IGNvbmZpcm0gfSA9IHdpbmRvdztcblxuLyoqXG4gKiB3aXRoRWRpdG9yXG4gKiBjb250cm9scyB0b2dnbGluZyBvZiB0aGUgd2l0aEVkaXRvck1vZGFsIEhPQ1xuICogd3JhcHMgdGhlIGNvbXBvbmVudCB0aGF0IGNvbnRhaW5zIHRoZSB3aXRoRWRpdG9yTW9kYWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbG9zZUVkaXRvck5vdGljZSBcdG1lc3NhZ2UgZGlzcGxheWVkIGlmIHVzZXIgYXR0ZW1wdHNcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0dG8gY2xvc2UgbW9kYWwgd2hlbiBjaGFuZ2VzIGFyZSBub3RcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0eWV0IHNhdmVkLiBUbyBvdmVycmlkZSB0aGUgYXBwZWFyYW5jZVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRvZiB0aGUgY2xvc2VFZGl0b3JOb3RpY2UsIHNpbXBseSBwYXNzXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGFuIGVtcHR5IHN0cmluZyBmb3IgdGhpcyBwcm9wXG4gKi9cbmNvbnN0IHdpdGhFZGl0b3IgPSBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0KCBPcmlnaW5hbENvbXBvbmVudCApID0+IHtcblx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdFx0Y29uc3RydWN0b3IoIHByb3BzICkge1xuXHRcdFx0XHRzdXBlciggcHJvcHMgKTtcblx0XHRcdFx0Y29uc3QgY2xvc2VFZGl0b3JOb3RpY2UgPSBwcm9wcy5jbG9zZUVkaXRvck5vdGljZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0XHRwcm9wcy5jbG9zZUVkaXRvck5vdGljZSA6XG5cdFx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0XHQnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsb3NlIHRoZSBFZGl0b3I/JXNBbGwgdW5zYXZlZCBjaGFuZ2VzIHdpbGwgYmUgbG9zdCEnLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0J1xcblxcbidcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0XHRcdGVkaXRvck9wZW46IGZhbHNlLFxuXHRcdFx0XHRcdGNoYW5nZXNTYXZlZDogdHJ1ZSxcblx0XHRcdFx0XHRjbG9zZUVkaXRvck5vdGljZSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiB3aWxsIG1hcmsgdGhhdCBjaGFuZ2VzIGhhdmUgYmVlbiBzYXZlZCB3aGljaCBhbGxvd3MgdGhlIG1vZGFsIHRvXG5cdFx0XHQgKiBiZSBjbG9zZWQgd2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBkaXNwbGF5IG9mIHRoZSBjbG9zZUVkaXRvck5vdGljZVxuXHRcdFx0ICpcblx0XHRcdCAqIEBmdW5jdGlvblxuXHRcdFx0ICogQHBhcmFtIHtib29sZWFufSBjaGFuZ2VzU2F2ZWRcblx0XHRcdCAqL1xuXHRcdFx0Y2hhbmdlc1NhdmVkID0gKCBjaGFuZ2VzU2F2ZWQgPSBmYWxzZSApID0+IHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSggeyBjaGFuZ2VzU2F2ZWQgfSApO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBvcGVucyBhbmQgY2xvc2VzIHdpdGhFZGl0b3JNb2RhbFxuXHRcdFx0ICpcblx0XHRcdCAqIEBmdW5jdGlvblxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gY2xpY2sgZXZlbnRcblx0XHRcdCAqL1xuXHRcdFx0dG9nZ2xlRWRpdG9yID0gKCBldmVudCApID0+IHtcblx0XHRcdFx0aWYgKCBldmVudCAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoICggcHJldlN0YXRlICkgPT4ge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdHRoaXMuc3RhdGUuY2xvc2VFZGl0b3JOb3RpY2UgIT09ICcnICYmXG5cdFx0XHRcdFx0XHRwcmV2U3RhdGUuZWRpdG9yT3BlbiAmJiAhIHByZXZTdGF0ZS5jaGFuZ2VzU2F2ZWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRlZGl0b3JPcGVuOiAhIGNvbmZpcm0oXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXRlLmNsb3NlRWRpdG9yTm90aWNlXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdHsgZWRpdG9yT3BlbjogISBwcmV2U3RhdGUuZWRpdG9yT3BlbiB9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fTtcblxuXHRcdFx0cmVuZGVyKCkge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxPcmlnaW5hbENvbXBvbmVudFxuXHRcdFx0XHRcdFx0eyAuLi50aGlzLnByb3BzIH1cblx0XHRcdFx0XHRcdGVkaXRvck9wZW49eyB0aGlzLnN0YXRlLmVkaXRvck9wZW4gfVxuXHRcdFx0XHRcdFx0dG9nZ2xlRWRpdG9yPXsgdGhpcy50b2dnbGVFZGl0b3IgfVxuXHRcdFx0XHRcdFx0Y2hhbmdlc1NhdmVkPXsgdGhpcy5jaGFuZ2VzU2F2ZWQgfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSxcblx0J3dpdGhFZGl0b3InXG4pO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoRWRpdG9yO1xuIiwiZXhwb3J0IHsgd2l0aEVkaXRvciwgd2l0aEVkaXRvck1vZGFsIH0gZnJvbSAnLi9lZGl0b3ItbW9kYWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb3RXaXRoUG9zdFR5cGVDaGVjayB9IGZyb20gJy4vbm90LXdpdGgtcG9zdC10eXBlLWNoZWNrJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyBzb21lLCBjYXN0QXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgd2l0aFNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBjb21wb25lbnQgd2l0aCByZW5kZXJzIGl0cyBvd24gY2hpbGRyZW4gb2x5IGlmIHRoZSBjdXJyZW50IGVkaXRvciBwb3N0IHR5cGVcbiAqIGlzIG5vdCBvbmUgb2YgdGhlIGdpdmVuIGBleGNsdWRlZFBvc3RUeXBlU2x1Z3NgIHByb3AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBvc3RUeXBlXG4gKiBAcGFyYW0ge1dQRWxlbWVudH0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGV4Y2x1ZGVkUG9zdFR5cGVTbHVnc1xuICogQHJldHVybiB7P1dQRWxlbWVudH0gUmVuZGVyZWQgZWxlbWVudCBvciBudWxsLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBOb3RXaXRoUG9zdFR5cGVDaGVjaygge1xuXHRwb3N0VHlwZSxcblx0Y2hpbGRyZW4sXG5cdGV4Y2x1ZGVkUG9zdFR5cGVTbHVncyxcbn0gKSB7XG5cdGxldCBpc0V4Y2x1ZGVkID0gZmFsc2U7XG5cdGlmICggcG9zdFR5cGUgKSB7XG5cdFx0aXNFeGNsdWRlZCA9IHNvbWUoXG5cdFx0XHRjYXN0QXJyYXkoIGV4Y2x1ZGVkUG9zdFR5cGVTbHVncyApLFxuXHRcdFx0KCB0eXBlICkgPT4gcG9zdFR5cGUgPT09IHR5cGVcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFeGNsdWRlZCApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBjaGlsZHJlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdGNvbnN0IHsgZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSB9ID0gc2VsZWN0KCAnY29yZS9lZGl0b3InICk7XG5cdHJldHVybiB7XG5cdFx0cG9zdFR5cGU6IGdldEVkaXRlZFBvc3RBdHRyaWJ1dGUoICd0eXBlJyApLFxuXHR9O1xufSApKCBOb3RXaXRoUG9zdFR5cGVDaGVjayApO1xuIiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kczsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImNvbXBvbmVudHNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImNvbXBvc2VcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImRhdGFcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImVsZW1lbnRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wiY2xhc3NuYW1lc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImxvZGFzaFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
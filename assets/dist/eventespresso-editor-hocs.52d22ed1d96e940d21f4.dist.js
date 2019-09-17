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

/***/ "./assets/src/editor/hocs/editor-modal/editor-modal.js":
/*!*************************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/editor-modal.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style.css */ "./assets/src/editor/hocs/editor-modal/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _use_close_editor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./use-close-editor.js */ "./assets/src/editor/hocs/editor-modal/use-close-editor.js");
/* harmony import */ var _use_is_editor_open_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./use-is-editor-open.js */ "./assets/src/editor/hocs/editor-modal/use-is-editor-open.js");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External Imports
 */





/**
 * Internal Imports
 */




var _window = window,
    confirm = _window.confirm;

var nullFunc = function nullFunc() {
  return null;
};
/**
 * EditorModal
 * Wraps a component with a WP Modal component
 *
 * @constructor
 * @param {Object} WrappedComponent
 * @param {string} editorId
 * @param {string} editorTitle
 * @param {string} editorHtmlClass
 * @param {string} editorCloseButtonLabel
 * @param {Function} onEditorOpen
 * @param {Function} onEditorClose
 * @param {string} closeEditorNotice
 * @param {Object} extraModalProps
 * @return {Object} WrappedComponent with Editor Modal
 */


var EditorModal = function EditorModal(_ref) {
  var _classNames;

  var editorId = _ref.editorId,
      editorTitle = _ref.editorTitle,
      editorHtmlClass = _ref.editorHtmlClass,
      editorCloseButtonLabel = _ref.editorCloseButtonLabel,
      closeEditorNotice = _ref.closeEditorNotice,
      _ref$onEditorOpen = _ref.onEditorOpen,
      onEditorOpen = _ref$onEditorOpen === void 0 ? nullFunc : _ref$onEditorOpen,
      _ref$onEditorClose = _ref.onEditorClose,
      onEditorClose = _ref$onEditorClose === void 0 ? nullFunc : _ref$onEditorClose,
      _ref$extraModalProps = _ref.extraModalProps,
      extraModalProps = _ref$extraModalProps === void 0 ? {} : _ref$extraModalProps,
      children = _ref.children,
      passedProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref, ["editorId", "editorTitle", "editorHtmlClass", "editorCloseButtonLabel", "closeEditorNotice", "onEditorOpen", "onEditorClose", "extraModalProps", "children"]);

  // ref used for determining when modal has JUST been opened or closed
  // so that we know when to fire onEditorOpen() and onEditorClose()
  var editorOpened = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useRef"])(false);

  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useState"])(true),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      changesSaved = _useState2[0],
      setChangesSaved = _useState2[1];

  var isEditorOpen = Object(_use_is_editor_open_js__WEBPACK_IMPORTED_MODULE_11__["default"])(editorId);
  var closeEditor = Object(_use_close_editor_js__WEBPACK_IMPORTED_MODULE_10__["default"])(editorId); // trigger onEditorOpen event

  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    // if isEditorOpen was just toggled and is now "true"
    // but editorOpened has not been toggled yet and is still "false"
    // then we know the editor was JUST opened, so call onEditorOpen()
    if (isEditorOpen && !editorOpened.current) {
      if (typeof onEditorOpen === 'function') {
        onEditorOpen();
      }

      editorOpened.current = true;
    }
  }, [editorId, isEditorOpen, editorOpened.current, onEditorOpen]); // trigger onEditorClose event

  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    // then on first render after close,
    // we trigger the onEditorClose() event
    // and then set editorOpened state to false
    if (!isEditorOpen && editorOpened.current) {
      if (typeof onEditorClose === 'function') {
        onEditorClose();
      }

      editorOpened.current = false;
    }
  }, [editorId, isEditorOpen, editorOpened.current, onEditorClose]);
  closeEditorNotice = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useMemo"])(function () {
    return closeEditorNotice !== undefined ? closeEditorNotice : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Are you sure you want to close the Editor?%sAll unsaved changes will be lost!', 'event_espresso'), '\n\n');
  }, [closeEditorNotice]);
  var onRequestClose = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (click) {
    Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_7__["cancelClickEvent"])(click, 'EditorModal.onRequestClose()');

    if (!changesSaved && closeEditorNotice !== '') {
      if (confirm(closeEditorNotice)) {
        closeEditor();
      }
    } else {
      closeEditor();
    }
  }, [changesSaved, closeEditor, closeEditorNotice]);
  var htmlClass = classnames__WEBPACK_IMPORTED_MODULE_5___default()((_classNames = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classNames, editorHtmlClass, editorHtmlClass), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classNames, 'ee-editor-modal', true), _classNames));
  return isEditorOpen ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["Modal"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    title: editorTitle,
    className: htmlClass,
    onRequestClose: onRequestClose,
    closeButtonLabel: editorCloseButtonLabel,
    overlayClassName: 'ee-editor-modal-overlay',
    shouldCloseOnEsc: false,
    shouldCloseOnClickOutside: false
  }, extraModalProps), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["cloneElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["Children"].only(children, _objectSpread({
    isEditorOpen: isEditorOpen,
    changesSaved: setChangesSaved
  }, passedProps)))) : null;
};

/* harmony default export */ __webpack_exports__["default"] = (EditorModal);

/***/ }),

/***/ "./assets/src/editor/hocs/editor-modal/index.js":
/*!******************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/index.js ***!
  \******************************************************/
/*! exports provided: EditorModal, useCloseEditor, useIsEditorOpen, useOpenEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/editor/hocs/editor-modal/editor-modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _use_close_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-close-editor */ "./assets/src/editor/hocs/editor-modal/use-close-editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCloseEditor", function() { return _use_close_editor__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _use_is_editor_open__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-is-editor-open */ "./assets/src/editor/hocs/editor-modal/use-is-editor-open.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsEditorOpen", function() { return _use_is_editor_open__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _use_open_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-open-editor */ "./assets/src/editor/hocs/editor-modal/use-open-editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useOpenEditor", function() { return _use_open_editor__WEBPACK_IMPORTED_MODULE_3__["default"]; });






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

/***/ "./assets/src/editor/hocs/editor-modal/use-close-editor.js":
/*!*****************************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/use-close-editor.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External Imports
 */



/**
 * @function
 * @param {string} editorId
 * @return {Function} function for closing an editor
 */

var useCloseEditor = function useCloseEditor(editorId) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])('eventespresso/open-editor-state'),
      closeEditor = _useDispatch.closeEditor;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (click) {
    Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["cancelClickEvent"])(click, 'useCloseEditor');

    if (editorId) {
      closeEditor(editorId);
    }
  }, [editorId]);
};

/* harmony default export */ __webpack_exports__["default"] = (useCloseEditor);

/***/ }),

/***/ "./assets/src/editor/hocs/editor-modal/use-is-editor-open.js":
/*!*******************************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/use-is-editor-open.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External Imports
 */

/**
 * @function
 * @param {string} editorId
 * @return {boolean} true if editor is currently open
 */

var useIsEditorOpen = function useIsEditorOpen(editorId) {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    return select('eventespresso/open-editor-state').isEditorOpen(editorId);
  }, null);
};

/* harmony default export */ __webpack_exports__["default"] = (useIsEditorOpen);

/***/ }),

/***/ "./assets/src/editor/hocs/editor-modal/use-open-editor.js":
/*!****************************************************************!*\
  !*** ./assets/src/editor/hocs/editor-modal/use-open-editor.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External Imports
 */



/**
 * @function
 * @param {string} editorId
 * @return {Function} function for opening an editor
 */

var useOpenEditor = function useOpenEditor(editorId) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])('eventespresso/open-editor-state'),
      openEditor = _useDispatch.openEditor;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (click) {
    Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["cancelClickEvent"])(click, 'useOpenEditor');

    if (editorId) {
      openEditor(editorId);
    }
  }, [editorId]);
};

/* harmony default export */ __webpack_exports__["default"] = (useOpenEditor);

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


/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__["ifCondition"])(function (_ref) {
  var dateEntity = _ref.dateEntity;
  return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(dateEntity, 'datetime');
}));

/***/ }),

/***/ "./assets/src/editor/hocs/if-validators/if-valid-ticket-entity.js":
/*!************************************************************************!*\
  !*** ./assets/src/editor/hocs/if-validators/if-valid-ticket-entity.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__["ifCondition"])(function (_ref) {
  var ticketEntity = _ref.ticketEntity;
  return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(ticketEntity, 'ticket');
}));

/***/ }),

/***/ "./assets/src/editor/hocs/if-validators/index.js":
/*!*******************************************************!*\
  !*** ./assets/src/editor/hocs/if-validators/index.js ***!
  \*******************************************************/
/*! exports provided: ifValidDateEntity, ifValidTicketEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _if_valid_date_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if-valid-date-entity */ "./assets/src/editor/hocs/if-validators/if-valid-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidDateEntity", function() { return _if_valid_date_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _if_valid_ticket_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-valid-ticket-entity */ "./assets/src/editor/hocs/if-validators/if-valid-ticket-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidTicketEntity", function() { return _if_valid_ticket_entity__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./assets/src/editor/hocs/index.js":
/*!*****************************************!*\
  !*** ./assets/src/editor/hocs/index.js ***!
  \*****************************************/
/*! exports provided: NotWithPostTypeCheck, EditorModal, useCloseEditor, useIsEditorOpen, useOpenEditor, ifValidDateEntity, ifValidTicketEntity, withEventVenueEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/editor/hocs/editor-modal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["EditorModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCloseEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["useCloseEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsEditorOpen", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["useIsEditorOpen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useOpenEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["useOpenEditor"]; });

/* harmony import */ var _if_validators___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-validators/ */ "./assets/src/editor/hocs/if-validators/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidDateEntity", function() { return _if_validators___WEBPACK_IMPORTED_MODULE_1__["ifValidDateEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidTicketEntity", function() { return _if_validators___WEBPACK_IMPORTED_MODULE_1__["ifValidTicketEntity"]; });

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

/***/ "@eventespresso/i18n":
/*!*****************************************!*\
  !*** external {"this":["eejs","i18n"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["i18n"]; }());

/***/ }),

/***/ "@eventespresso/utils":
/*!******************************************!*\
  !*** external {"this":["eejs","utils"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["utils"]; }());

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvZWRpdG9yLW1vZGFsLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL3N0eWxlLmNzcz9iNzM5Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL3VzZS1jbG9zZS1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvdXNlLWlzLWVkaXRvci1vcGVuLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL3VzZS1vcGVuLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL2lmLXZhbGlkYXRvcnMvaWYtdmFsaWQtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pZi12YWxpZGF0b3JzL2lmLXZhbGlkLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pZi12YWxpZGF0b3JzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9ub3Qtd2l0aC1wb3N0LXR5cGUtY2hlY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy93aXRoLWVudGl0eS1ob2NzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3Mvd2l0aC1lbnRpdHktaG9jcy93aXRoLWV2ZW50LXZlbnVlLWVudGl0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJpMThuXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInV0aWxzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImNvbXBvbmVudHNcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImNvbXBvc2VcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImVsZW1lbnRcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJjbGFzc25hbWVzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Il0sIm5hbWVzIjpbIndpbmRvdyIsImNvbmZpcm0iLCJudWxsRnVuYyIsIkVkaXRvck1vZGFsIiwiZWRpdG9ySWQiLCJlZGl0b3JUaXRsZSIsImVkaXRvckh0bWxDbGFzcyIsImVkaXRvckNsb3NlQnV0dG9uTGFiZWwiLCJjbG9zZUVkaXRvck5vdGljZSIsIm9uRWRpdG9yT3BlbiIsIm9uRWRpdG9yQ2xvc2UiLCJleHRyYU1vZGFsUHJvcHMiLCJjaGlsZHJlbiIsInBhc3NlZFByb3BzIiwiZWRpdG9yT3BlbmVkIiwidXNlUmVmIiwidXNlU3RhdGUiLCJjaGFuZ2VzU2F2ZWQiLCJzZXRDaGFuZ2VzU2F2ZWQiLCJpc0VkaXRvck9wZW4iLCJ1c2VJc0VkaXRvck9wZW4iLCJjbG9zZUVkaXRvciIsInVzZUNsb3NlRWRpdG9yIiwidXNlRWZmZWN0IiwiY3VycmVudCIsInVzZU1lbW8iLCJ1bmRlZmluZWQiLCJzcHJpbnRmIiwiX18iLCJvblJlcXVlc3RDbG9zZSIsInVzZUNhbGxiYWNrIiwiY2xpY2siLCJjYW5jZWxDbGlja0V2ZW50IiwiaHRtbENsYXNzIiwiY2xhc3NOYW1lcyIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsInVzZURpc3BhdGNoIiwidXNlU2VsZWN0Iiwic2VsZWN0IiwidXNlT3BlbkVkaXRvciIsIm9wZW5FZGl0b3IiLCJpZkNvbmRpdGlvbiIsImRhdGVFbnRpdHkiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsInRpY2tldEVudGl0eSIsIk5vdFdpdGhQb3N0VHlwZUNoZWNrIiwicG9zdFR5cGUiLCJleGNsdWRlZFBvc3RUeXBlU2x1Z3MiLCJpc0V4Y2x1ZGVkIiwic29tZSIsImNhc3RBcnJheSIsInR5cGUiLCJ3aXRoU2VsZWN0IiwiZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSIsIkRFRkFVTFRfT0JKRUNUIiwidmVudWVFbnRpdHkiLCJ2ZW51ZUVudGl0eUxvYWRlZCIsImNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IiwiZXZlbnRFbnRpdHkiLCJnZXRSZWxhdGVkRW50aXRpZXMiLCJoYXNGaW5pc2hlZFJlc29sdXRpb24iLCJBcnJheSIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NB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Z0M7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEM7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSx1QkFBdUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQzs7Ozs7Ozs7Ozs7QUNmQSxxQkFBcUIsbUJBQU8sQ0FBQyxpRkFBa0I7O0FBRS9DLDJCQUEyQixtQkFBTyxDQUFDLDZGQUF3Qjs7QUFFM0Qsc0JBQXNCLG1CQUFPLENBQUMsbUZBQW1COztBQUVqRDtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7Ozs7Ozs7O0FDVkEsYUFBYSx1Q0FBdUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F0RCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSwyQ0FBMkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0ExRCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLHVEQUF1RCxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRFLGFBQWEsaUNBQWlDLEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLWVkaXRvci1ob2NzLjUyZDIyZWQxZDk2ZTk0MGQyMWY0LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuXHRDaGlsZHJlbixcblx0Y2xvbmVFbGVtZW50LFxuXHR1c2VDYWxsYmFjayxcblx0dXNlRWZmZWN0LFxuXHR1c2VNZW1vLFxuXHR1c2VSZWYsXG5cdHVzZVN0YXRlLFxufSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgY2FuY2VsQ2xpY2tFdmVudCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3V0aWxzJztcbmltcG9ydCB7IF9fLCBzcHJpbnRmIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB1c2VDbG9zZUVkaXRvciBmcm9tICcuL3VzZS1jbG9zZS1lZGl0b3IuanMnO1xuaW1wb3J0IHVzZUlzRWRpdG9yT3BlbiBmcm9tICcuL3VzZS1pcy1lZGl0b3Itb3Blbi5qcyc7XG5cbmNvbnN0IHsgY29uZmlybSB9ID0gd2luZG93O1xuY29uc3QgbnVsbEZ1bmMgPSAoKSA9PiBudWxsO1xuXG4vKipcbiAqIEVkaXRvck1vZGFsXG4gKiBXcmFwcyBhIGNvbXBvbmVudCB3aXRoIGEgV1AgTW9kYWwgY29tcG9uZW50XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gV3JhcHBlZENvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvcklkXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9yVGl0bGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBlZGl0b3JIdG1sQ2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBlZGl0b3JDbG9zZUJ1dHRvbkxhYmVsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkVkaXRvck9wZW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRWRpdG9yQ2xvc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbG9zZUVkaXRvck5vdGljZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dHJhTW9kYWxQcm9wc1xuICogQHJldHVybiB7T2JqZWN0fSBXcmFwcGVkQ29tcG9uZW50IHdpdGggRWRpdG9yIE1vZGFsXG4gKi9cbmNvbnN0IEVkaXRvck1vZGFsID0gKCB7XG5cdGVkaXRvcklkLFxuXHRlZGl0b3JUaXRsZSxcblx0ZWRpdG9ySHRtbENsYXNzLFxuXHRlZGl0b3JDbG9zZUJ1dHRvbkxhYmVsLFxuXHRjbG9zZUVkaXRvck5vdGljZSxcblx0b25FZGl0b3JPcGVuID0gbnVsbEZ1bmMsXG5cdG9uRWRpdG9yQ2xvc2UgPSBudWxsRnVuYyxcblx0ZXh0cmFNb2RhbFByb3BzID0ge30sXG5cdGNoaWxkcmVuLFxuXHQuLi5wYXNzZWRQcm9wc1xufSApID0+IHtcblx0Ly8gcmVmIHVzZWQgZm9yIGRldGVybWluaW5nIHdoZW4gbW9kYWwgaGFzIEpVU1QgYmVlbiBvcGVuZWQgb3IgY2xvc2VkXG5cdC8vIHNvIHRoYXQgd2Uga25vdyB3aGVuIHRvIGZpcmUgb25FZGl0b3JPcGVuKCkgYW5kIG9uRWRpdG9yQ2xvc2UoKVxuXHRjb25zdCBlZGl0b3JPcGVuZWQgPSB1c2VSZWYoIGZhbHNlICk7XG5cdGNvbnN0IFsgY2hhbmdlc1NhdmVkLCBzZXRDaGFuZ2VzU2F2ZWQgXSA9IHVzZVN0YXRlKCB0cnVlICk7XG5cdGNvbnN0IGlzRWRpdG9yT3BlbiA9IHVzZUlzRWRpdG9yT3BlbiggZWRpdG9ySWQgKTtcblx0Y29uc3QgY2xvc2VFZGl0b3IgPSB1c2VDbG9zZUVkaXRvciggZWRpdG9ySWQgKTtcblxuXHQvLyB0cmlnZ2VyIG9uRWRpdG9yT3BlbiBldmVudFxuXHR1c2VFZmZlY3QoICgpID0+IHtcblx0XHQvLyBpZiBpc0VkaXRvck9wZW4gd2FzIGp1c3QgdG9nZ2xlZCBhbmQgaXMgbm93IFwidHJ1ZVwiXG5cdFx0Ly8gYnV0IGVkaXRvck9wZW5lZCBoYXMgbm90IGJlZW4gdG9nZ2xlZCB5ZXQgYW5kIGlzIHN0aWxsIFwiZmFsc2VcIlxuXHRcdC8vIHRoZW4gd2Uga25vdyB0aGUgZWRpdG9yIHdhcyBKVVNUIG9wZW5lZCwgc28gY2FsbCBvbkVkaXRvck9wZW4oKVxuXHRcdGlmICggaXNFZGl0b3JPcGVuICYmICEgZWRpdG9yT3BlbmVkLmN1cnJlbnQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBvbkVkaXRvck9wZW4gPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdG9uRWRpdG9yT3BlbigpO1xuXHRcdFx0fVxuXHRcdFx0ZWRpdG9yT3BlbmVkLmN1cnJlbnQgPSB0cnVlO1xuXHRcdH1cblx0fSwgWyBlZGl0b3JJZCwgaXNFZGl0b3JPcGVuLCBlZGl0b3JPcGVuZWQuY3VycmVudCwgb25FZGl0b3JPcGVuIF0gKTtcblxuXHQvLyB0cmlnZ2VyIG9uRWRpdG9yQ2xvc2UgZXZlbnRcblx0dXNlRWZmZWN0KCAoKSA9PiB7XG5cdFx0Ly8gdGhlbiBvbiBmaXJzdCByZW5kZXIgYWZ0ZXIgY2xvc2UsXG5cdFx0Ly8gd2UgdHJpZ2dlciB0aGUgb25FZGl0b3JDbG9zZSgpIGV2ZW50XG5cdFx0Ly8gYW5kIHRoZW4gc2V0IGVkaXRvck9wZW5lZCBzdGF0ZSB0byBmYWxzZVxuXHRcdGlmICggISBpc0VkaXRvck9wZW4gJiYgZWRpdG9yT3BlbmVkLmN1cnJlbnQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBvbkVkaXRvckNsb3NlID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHRvbkVkaXRvckNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0XHRlZGl0b3JPcGVuZWQuY3VycmVudCA9IGZhbHNlO1xuXHRcdH1cblx0fSwgWyBlZGl0b3JJZCwgaXNFZGl0b3JPcGVuLCBlZGl0b3JPcGVuZWQuY3VycmVudCwgb25FZGl0b3JDbG9zZSBdICk7XG5cblx0Y2xvc2VFZGl0b3JOb3RpY2UgPSB1c2VNZW1vKFxuXHRcdCgpID0+IGNsb3NlRWRpdG9yTm90aWNlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0Y2xvc2VFZGl0b3JOb3RpY2UgOlxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbG9zZSB0aGUgRWRpdG9yPyVzQWxsIHVuc2F2ZWQgY2hhbmdlcyB3aWxsIGJlIGxvc3QhJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdCksXG5cdFx0XHRcdCdcXG5cXG4nXG5cdFx0XHQpLFxuXHRcdFsgY2xvc2VFZGl0b3JOb3RpY2UgXVxuXHQpO1xuXG5cdGNvbnN0IG9uUmVxdWVzdENsb3NlID0gdXNlQ2FsbGJhY2soICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2ssICdFZGl0b3JNb2RhbC5vblJlcXVlc3RDbG9zZSgpJyApO1xuXHRcdGlmICggISBjaGFuZ2VzU2F2ZWQgJiYgY2xvc2VFZGl0b3JOb3RpY2UgIT09ICcnICkge1xuXHRcdFx0aWYgKCBjb25maXJtKCBjbG9zZUVkaXRvck5vdGljZSApICkge1xuXHRcdFx0XHRjbG9zZUVkaXRvcigpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjbG9zZUVkaXRvcigpO1xuXHRcdH1cblx0fSwgW1xuXHRcdGNoYW5nZXNTYXZlZCxcblx0XHRjbG9zZUVkaXRvcixcblx0XHRjbG9zZUVkaXRvck5vdGljZSxcblx0XSApO1xuXG5cdGNvbnN0IGh0bWxDbGFzcyA9IGNsYXNzTmFtZXMoIHtcblx0XHRbIGVkaXRvckh0bWxDbGFzcyBdOiBlZGl0b3JIdG1sQ2xhc3MsXG5cdFx0J2VlLWVkaXRvci1tb2RhbCc6IHRydWUsXG5cdH0gKTtcblxuXHRyZXR1cm4gaXNFZGl0b3JPcGVuID8gKFxuXHRcdDxNb2RhbFxuXHRcdFx0dGl0bGU9eyBlZGl0b3JUaXRsZSB9XG5cdFx0XHRjbGFzc05hbWU9eyBodG1sQ2xhc3MgfVxuXHRcdFx0b25SZXF1ZXN0Q2xvc2U9eyBvblJlcXVlc3RDbG9zZSB9XG5cdFx0XHRjbG9zZUJ1dHRvbkxhYmVsPXsgZWRpdG9yQ2xvc2VCdXR0b25MYWJlbCB9XG5cdFx0XHRvdmVybGF5Q2xhc3NOYW1lPXsgJ2VlLWVkaXRvci1tb2RhbC1vdmVybGF5JyB9XG5cdFx0XHRzaG91bGRDbG9zZU9uRXNjPXsgZmFsc2UgfVxuXHRcdFx0c2hvdWxkQ2xvc2VPbkNsaWNrT3V0c2lkZT17IGZhbHNlIH1cblx0XHRcdHsgLi4uZXh0cmFNb2RhbFByb3BzIH1cblx0XHQ+XG5cdFx0XHR7XG5cdFx0XHRcdGNsb25lRWxlbWVudChcblx0XHRcdFx0XHRDaGlsZHJlbi5vbmx5KFxuXHRcdFx0XHRcdFx0Y2hpbGRyZW4sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlzRWRpdG9yT3Blbixcblx0XHRcdFx0XHRcdFx0Y2hhbmdlc1NhdmVkOiBzZXRDaGFuZ2VzU2F2ZWQsXG5cdFx0XHRcdFx0XHRcdC4uLnBhc3NlZFByb3BzLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdDwvTW9kYWw+XG5cdCkgOiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yTW9kYWw7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIEVkaXRvck1vZGFsIH0gZnJvbSAnLi9lZGl0b3ItbW9kYWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDbG9zZUVkaXRvciB9IGZyb20gJy4vdXNlLWNsb3NlLWVkaXRvcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUlzRWRpdG9yT3BlbiB9IGZyb20gJy4vdXNlLWlzLWVkaXRvci1vcGVuJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlT3BlbkVkaXRvciB9IGZyb20gJy4vdXNlLW9wZW4tZWRpdG9yJztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJjb21wb25lbnRzLW1vZGFsX19zY3JlZW4tb3ZlcmxheVwiOlwiY29tcG9uZW50cy1tb2RhbF9fc2NyZWVuLW92ZXJsYXlcIixcImVlLWVkaXRvci1tb2RhbC1vdmVybGF5XCI6XCJlZS1lZGl0b3ItbW9kYWwtb3ZlcmxheVwiLFwiY29tcG9uZW50cy1tb2RhbF9fZnJhbWVcIjpcImNvbXBvbmVudHMtbW9kYWxfX2ZyYW1lXCIsXCJlZS1lZGl0b3ItbW9kYWxcIjpcImVlLWVkaXRvci1tb2RhbFwiLFwiZWUtZWRpdG9yLW1vZGFsLXRpbnlcIjpcImVlLWVkaXRvci1tb2RhbC10aW55XCIsXCJlZS1lZGl0b3ItbW9kYWwtc21hbGxcIjpcImVlLWVkaXRvci1tb2RhbC1zbWFsbFwiLFwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyXCI6XCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXJcIixcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIjpcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIixcImNvbXBvbmVudHMtcGFuZWxfX2JvZHlcIjpcImNvbXBvbmVudHMtcGFuZWxfX2JvZHlcIixcImNvbXBvbmVudHMtcGFuZWxfX2JvZHktdGl0bGVcIjpcImNvbXBvbmVudHMtcGFuZWxfX2JvZHktdGl0bGVcIixcImNvbXBvbmVudHMtYnV0dG9uXCI6XCJjb21wb25lbnRzLWJ1dHRvblwiLFwiY29tcG9uZW50cy1tb2RhbF9fY29udGVudFwiOlwiY29tcG9uZW50cy1tb2RhbF9fY29udGVudFwiLFwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyLWhlYWRpbmdcIjpcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlci1oZWFkaW5nXCJ9OyIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvcklkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZnVuY3Rpb24gZm9yIGNsb3NpbmcgYW4gZWRpdG9yXG4gKi9cbmNvbnN0IHVzZUNsb3NlRWRpdG9yID0gKCBlZGl0b3JJZCApID0+IHtcblx0Y29uc3QgeyBjbG9zZUVkaXRvciB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL29wZW4tZWRpdG9yLXN0YXRlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2ssICd1c2VDbG9zZUVkaXRvcicgKTtcblx0XHRpZiAoIGVkaXRvcklkICkge1xuXHRcdFx0Y2xvc2VFZGl0b3IoIGVkaXRvcklkICk7XG5cdFx0fVxuXHR9LCBbIGVkaXRvcklkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNsb3NlRWRpdG9yO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9ySWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZWRpdG9yIGlzIGN1cnJlbnRseSBvcGVuXG4gKi9cbmNvbnN0IHVzZUlzRWRpdG9yT3BlbiA9ICggZWRpdG9ySWQgKSA9PiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRyZXR1cm4gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9vcGVuLWVkaXRvci1zdGF0ZScgKS5pc0VkaXRvck9wZW4oIGVkaXRvcklkICk7XG59LCBudWxsICk7XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUlzRWRpdG9yT3BlbjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvcklkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZnVuY3Rpb24gZm9yIG9wZW5pbmcgYW4gZWRpdG9yXG4gKi9cbmNvbnN0IHVzZU9wZW5FZGl0b3IgPSAoIGVkaXRvcklkICkgPT4ge1xuXHRjb25zdCB7IG9wZW5FZGl0b3IgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9vcGVuLWVkaXRvci1zdGF0ZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGNsaWNrICkgPT4ge1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrLCAndXNlT3BlbkVkaXRvcicgKTtcblx0XHRpZiAoIGVkaXRvcklkICkge1xuXHRcdFx0b3BlbkVkaXRvciggZWRpdG9ySWQgKTtcblx0XHR9XG5cdH0sIFsgZWRpdG9ySWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlT3BlbkVkaXRvcjtcbiIsImltcG9ydCB7IGlmQ29uZGl0aW9uIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGlmQ29uZGl0aW9uKCAoIHsgZGF0ZUVudGl0eSB9ICkgPT5cblx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGRhdGVFbnRpdHksICdkYXRldGltZScgKVxuKTtcbiIsImltcG9ydCB7IGlmQ29uZGl0aW9uIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGlmQ29uZGl0aW9uKCAoIHsgdGlja2V0RW50aXR5IH0gKSA9PlxuXHRpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApXG4pO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBpZlZhbGlkRGF0ZUVudGl0eSB9IGZyb20gJy4vaWYtdmFsaWQtZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBpZlZhbGlkVGlja2V0RW50aXR5IH0gZnJvbSAnLi9pZi12YWxpZC10aWNrZXQtZW50aXR5JztcbiIsImV4cG9ydCAqIGZyb20gJy4vZWRpdG9yLW1vZGFsJztcbmV4cG9ydCAqIGZyb20gJy4vaWYtdmFsaWRhdG9ycy8nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb3RXaXRoUG9zdFR5cGVDaGVjayB9IGZyb20gJy4vbm90LXdpdGgtcG9zdC10eXBlLWNoZWNrJztcbmV4cG9ydCAqIGZyb20gJy4vd2l0aC1lbnRpdHktaG9jcyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgc29tZSwgY2FzdEFycmF5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHdpdGggcmVuZGVycyBpdHMgb3duIGNoaWxkcmVuIG9seSBpZiB0aGUgY3VycmVudCBlZGl0b3IgcG9zdCB0eXBlXG4gKiBpcyBub3Qgb25lIG9mIHRoZSBnaXZlbiBgZXhjbHVkZWRQb3N0VHlwZVNsdWdzYCBwcm9wLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3N0VHlwZVxuICogQHBhcmFtIHtXUEVsZW1lbnR9IGNoaWxkcmVuXG4gKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBleGNsdWRlZFBvc3RUeXBlU2x1Z3NcbiAqIEByZXR1cm4gez9XUEVsZW1lbnR9IFJlbmRlcmVkIGVsZW1lbnQgb3IgbnVsbC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gTm90V2l0aFBvc3RUeXBlQ2hlY2soIHtcblx0cG9zdFR5cGUsXG5cdGNoaWxkcmVuLFxuXHRleGNsdWRlZFBvc3RUeXBlU2x1Z3MsXG59ICkge1xuXHRsZXQgaXNFeGNsdWRlZCA9IGZhbHNlO1xuXHRpZiAoIHBvc3RUeXBlICkge1xuXHRcdGlzRXhjbHVkZWQgPSBzb21lKFxuXHRcdFx0Y2FzdEFycmF5KCBleGNsdWRlZFBvc3RUeXBlU2x1Z3MgKSxcblx0XHRcdCggdHlwZSApID0+IHBvc3RUeXBlID09PSB0eXBlXG5cdFx0KTtcblx0fVxuXHRpZiAoIGlzRXhjbHVkZWQgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gY2hpbGRyZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRjb25zdCB7IGdldEVkaXRlZFBvc3RBdHRyaWJ1dGUgfSA9IHNlbGVjdCggJ2NvcmUvZWRpdG9yJyApO1xuXHRyZXR1cm4ge1xuXHRcdHBvc3RUeXBlOiBnZXRFZGl0ZWRQb3N0QXR0cmlidXRlKCAndHlwZScgKSxcblx0fTtcbn0gKSggTm90V2l0aFBvc3RUeXBlQ2hlY2sgKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aEV2ZW50VmVudWVFbnRpdHkgfSBmcm9tICcuL3dpdGgtZXZlbnQtdmVudWUtZW50aXR5JztcbiIsImltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVF9PQkpFQ1QgPSB7XG5cdHZlbnVlRW50aXR5OiBudWxsLFxuXHR2ZW51ZUVudGl0eUxvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIHdpdGhFdmVudFZlbnVlRW50aXR5XG4gKiByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmc6XG4gKiAgICB2ZW51ZUVudGl0eSAtIHRoZSBWZW51ZSBFbnRpdHkgZm9yIHRoZSBwcm92aWRlZCBFdmVudCBFbnRpdHlcbiAqICAgIHZlbnVlRW50aXR5TG9hZGVkIC0gYm9vbGVhbiB0cnVlIGlmIGxvYWRpbmcgaXMgY29tcGxldGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdHdpdGhTZWxlY3QoICggc2VsZWN0LCB7IGV2ZW50RW50aXR5IH0gKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RW50aXR5LCAnZXZlbnQnICkgKSB7XG5cdFx0XHRsZXQgdmVudWVFbnRpdHkgPSBnZXRSZWxhdGVkRW50aXRpZXMoXG5cdFx0XHRcdGV2ZW50RW50aXR5LFxuXHRcdFx0XHQndmVudWUnXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgdmVudWVFbnRpdHlMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFx0WyBldmVudEVudGl0eSwgJ3ZlbnVlJyBdXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCB2ZW51ZUVudGl0eUxvYWRlZCApIHtcblx0XHRcdFx0dmVudWVFbnRpdHkgPSBBcnJheS5pc0FycmF5KCB2ZW51ZUVudGl0eSApICYmIHZlbnVlRW50aXR5WyAwIF0gJiZcblx0XHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIHZlbnVlRW50aXR5WyAwIF0sICd2ZW51ZScgKSA/XG5cdFx0XHRcdFx0dmVudWVFbnRpdHlbIDAgXSA6XG5cdFx0XHRcdFx0bnVsbDtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR2ZW51ZUVudGl0eSxcblx0XHRcdFx0XHR2ZW51ZUVudGl0eUxvYWRlZCxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIERFRkFVTFRfT0JKRUNUO1xuXHR9ICksXG5cdCd3aXRoRXZlbnRWZW51ZUVudGl0eSdcbik7XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaTE4blwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ1dGlsc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb25lbnRzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb3NlXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcImNsYXNzbmFtZXNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
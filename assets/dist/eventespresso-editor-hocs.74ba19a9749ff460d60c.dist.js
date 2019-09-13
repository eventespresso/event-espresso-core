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
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__);
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
    Object(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["cancelClickEvent"])(click, 'EditorModal.onRequestClose()');

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
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__);
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
    Object(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["cancelClickEvent"])(click, 'useCloseEditor');

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
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__);
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
    Object(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["cancelClickEvent"])(click, 'useOpenEditor');

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

/***/ "@eventespresso/eejs":
/*!**********************************!*\
  !*** external {"this":["eejs"]} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]; }());

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvZWRpdG9yLW1vZGFsLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL3N0eWxlLmNzcz9iNzM5Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL3VzZS1jbG9zZS1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9lZGl0b3ItbW9kYWwvdXNlLWlzLWVkaXRvci1vcGVuLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvZWRpdG9yLW1vZGFsL3VzZS1vcGVuLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL2lmLXZhbGlkYXRvcnMvaWYtdmFsaWQtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pZi12YWxpZGF0b3JzL2lmLXZhbGlkLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pZi12YWxpZGF0b3JzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9ub3Qtd2l0aC1wb3N0LXR5cGUtY2hlY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy93aXRoLWVudGl0eS1ob2NzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3Mvd2l0aC1lbnRpdHktaG9jcy93aXRoLWV2ZW50LXZlbnVlLWVudGl0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImkxOG5cIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiY29tcG9uZW50c1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiY29tcG9zZVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZGF0YVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZWxlbWVudFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcImNsYXNzbmFtZXNcIl19Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iXSwibmFtZXMiOlsid2luZG93IiwiY29uZmlybSIsIm51bGxGdW5jIiwiRWRpdG9yTW9kYWwiLCJlZGl0b3JJZCIsImVkaXRvclRpdGxlIiwiZWRpdG9ySHRtbENsYXNzIiwiZWRpdG9yQ2xvc2VCdXR0b25MYWJlbCIsImNsb3NlRWRpdG9yTm90aWNlIiwib25FZGl0b3JPcGVuIiwib25FZGl0b3JDbG9zZSIsImV4dHJhTW9kYWxQcm9wcyIsImNoaWxkcmVuIiwicGFzc2VkUHJvcHMiLCJlZGl0b3JPcGVuZWQiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsImNoYW5nZXNTYXZlZCIsInNldENoYW5nZXNTYXZlZCIsImlzRWRpdG9yT3BlbiIsInVzZUlzRWRpdG9yT3BlbiIsImNsb3NlRWRpdG9yIiwidXNlQ2xvc2VFZGl0b3IiLCJ1c2VFZmZlY3QiLCJjdXJyZW50IiwidXNlTWVtbyIsInVuZGVmaW5lZCIsInNwcmludGYiLCJfXyIsIm9uUmVxdWVzdENsb3NlIiwidXNlQ2FsbGJhY2siLCJjbGljayIsImNhbmNlbENsaWNrRXZlbnQiLCJodG1sQ2xhc3MiLCJjbGFzc05hbWVzIiwiY2xvbmVFbGVtZW50IiwiQ2hpbGRyZW4iLCJvbmx5IiwidXNlRGlzcGF0Y2giLCJ1c2VTZWxlY3QiLCJzZWxlY3QiLCJ1c2VPcGVuRWRpdG9yIiwib3BlbkVkaXRvciIsImlmQ29uZGl0aW9uIiwiZGF0ZUVudGl0eSIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwidGlja2V0RW50aXR5IiwiTm90V2l0aFBvc3RUeXBlQ2hlY2siLCJwb3N0VHlwZSIsImV4Y2x1ZGVkUG9zdFR5cGVTbHVncyIsImlzRXhjbHVkZWQiLCJzb21lIiwiY2FzdEFycmF5IiwidHlwZSIsIndpdGhTZWxlY3QiLCJnZXRFZGl0ZWRQb3N0QXR0cmlidXRlIiwiREVGQVVMVF9PQkpFQ1QiLCJ2ZW51ZUVudGl0eSIsInZlbnVlRW50aXR5TG9hZGVkIiwiY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQiLCJldmVudEVudGl0eSIsImdldFJlbGF0ZWRFbnRpdGllcyIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsIkFycmF5IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFlLDZCQUE2QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQzs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLHVCQUF1QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDOzs7Ozs7Ozs7OztBQ2ZBLHFCQUFxQixtQkFBTyxDQUFDLGlGQUFrQjs7QUFFL0MsMkJBQTJCLG1CQUFPLENBQUMsNkZBQXdCOztBQUUzRCxzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7Ozs7QUNWQSxhQUFhLCtCQUErQixFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlDLGFBQWEsdUNBQXVDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLDJDQUEyQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTFELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSxxQ0FBcUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FwRCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEsdURBQXVELEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEUsYUFBYSxpQ0FBaUMsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28tZWRpdG9yLWhvY3MuNzRiYTE5YTk3NDlmZjQ2MGQ2MGMuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb25lbnRzJztcbmltcG9ydCB7XG5cdENoaWxkcmVuLFxuXHRjbG9uZUVsZW1lbnQsXG5cdHVzZUNhbGxiYWNrLFxuXHR1c2VFZmZlY3QsXG5cdHVzZU1lbW8sXG5cdHVzZVJlZixcblx0dXNlU3RhdGUsXG59IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBfXywgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgdXNlQ2xvc2VFZGl0b3IgZnJvbSAnLi91c2UtY2xvc2UtZWRpdG9yLmpzJztcbmltcG9ydCB1c2VJc0VkaXRvck9wZW4gZnJvbSAnLi91c2UtaXMtZWRpdG9yLW9wZW4uanMnO1xuXG5jb25zdCB7IGNvbmZpcm0gfSA9IHdpbmRvdztcbmNvbnN0IG51bGxGdW5jID0gKCkgPT4gbnVsbDtcblxuLyoqXG4gKiBFZGl0b3JNb2RhbFxuICogV3JhcHMgYSBjb21wb25lbnQgd2l0aCBhIFdQIE1vZGFsIGNvbXBvbmVudFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IFdyYXBwZWRDb21wb25lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlZGl0b3JJZFxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvclRpdGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9ySHRtbENsYXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9yQ2xvc2VCdXR0b25MYWJlbFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25FZGl0b3JPcGVuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkVkaXRvckNsb3NlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xvc2VFZGl0b3JOb3RpY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBleHRyYU1vZGFsUHJvcHNcbiAqIEByZXR1cm4ge09iamVjdH0gV3JhcHBlZENvbXBvbmVudCB3aXRoIEVkaXRvciBNb2RhbFxuICovXG5jb25zdCBFZGl0b3JNb2RhbCA9ICgge1xuXHRlZGl0b3JJZCxcblx0ZWRpdG9yVGl0bGUsXG5cdGVkaXRvckh0bWxDbGFzcyxcblx0ZWRpdG9yQ2xvc2VCdXR0b25MYWJlbCxcblx0Y2xvc2VFZGl0b3JOb3RpY2UsXG5cdG9uRWRpdG9yT3BlbiA9IG51bGxGdW5jLFxuXHRvbkVkaXRvckNsb3NlID0gbnVsbEZ1bmMsXG5cdGV4dHJhTW9kYWxQcm9wcyA9IHt9LFxuXHRjaGlsZHJlbixcblx0Li4ucGFzc2VkUHJvcHNcbn0gKSA9PiB7XG5cdC8vIHJlZiB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGVuIG1vZGFsIGhhcyBKVVNUIGJlZW4gb3BlbmVkIG9yIGNsb3NlZFxuXHQvLyBzbyB0aGF0IHdlIGtub3cgd2hlbiB0byBmaXJlIG9uRWRpdG9yT3BlbigpIGFuZCBvbkVkaXRvckNsb3NlKClcblx0Y29uc3QgZWRpdG9yT3BlbmVkID0gdXNlUmVmKCBmYWxzZSApO1xuXHRjb25zdCBbIGNoYW5nZXNTYXZlZCwgc2V0Q2hhbmdlc1NhdmVkIF0gPSB1c2VTdGF0ZSggdHJ1ZSApO1xuXHRjb25zdCBpc0VkaXRvck9wZW4gPSB1c2VJc0VkaXRvck9wZW4oIGVkaXRvcklkICk7XG5cdGNvbnN0IGNsb3NlRWRpdG9yID0gdXNlQ2xvc2VFZGl0b3IoIGVkaXRvcklkICk7XG5cblx0Ly8gdHJpZ2dlciBvbkVkaXRvck9wZW4gZXZlbnRcblx0dXNlRWZmZWN0KCAoKSA9PiB7XG5cdFx0Ly8gaWYgaXNFZGl0b3JPcGVuIHdhcyBqdXN0IHRvZ2dsZWQgYW5kIGlzIG5vdyBcInRydWVcIlxuXHRcdC8vIGJ1dCBlZGl0b3JPcGVuZWQgaGFzIG5vdCBiZWVuIHRvZ2dsZWQgeWV0IGFuZCBpcyBzdGlsbCBcImZhbHNlXCJcblx0XHQvLyB0aGVuIHdlIGtub3cgdGhlIGVkaXRvciB3YXMgSlVTVCBvcGVuZWQsIHNvIGNhbGwgb25FZGl0b3JPcGVuKClcblx0XHRpZiAoIGlzRWRpdG9yT3BlbiAmJiAhIGVkaXRvck9wZW5lZC5jdXJyZW50ICkge1xuXHRcdFx0aWYgKCB0eXBlb2Ygb25FZGl0b3JPcGVuID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHRvbkVkaXRvck9wZW4oKTtcblx0XHRcdH1cblx0XHRcdGVkaXRvck9wZW5lZC5jdXJyZW50ID0gdHJ1ZTtcblx0XHR9XG5cdH0sIFsgZWRpdG9ySWQsIGlzRWRpdG9yT3BlbiwgZWRpdG9yT3BlbmVkLmN1cnJlbnQsIG9uRWRpdG9yT3BlbiBdICk7XG5cblx0Ly8gdHJpZ2dlciBvbkVkaXRvckNsb3NlIGV2ZW50XG5cdHVzZUVmZmVjdCggKCkgPT4ge1xuXHRcdC8vIHRoZW4gb24gZmlyc3QgcmVuZGVyIGFmdGVyIGNsb3NlLFxuXHRcdC8vIHdlIHRyaWdnZXIgdGhlIG9uRWRpdG9yQ2xvc2UoKSBldmVudFxuXHRcdC8vIGFuZCB0aGVuIHNldCBlZGl0b3JPcGVuZWQgc3RhdGUgdG8gZmFsc2Vcblx0XHRpZiAoICEgaXNFZGl0b3JPcGVuICYmIGVkaXRvck9wZW5lZC5jdXJyZW50ICkge1xuXHRcdFx0aWYgKCB0eXBlb2Ygb25FZGl0b3JDbG9zZSA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0b25FZGl0b3JDbG9zZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWRpdG9yT3BlbmVkLmN1cnJlbnQgPSBmYWxzZTtcblx0XHR9XG5cdH0sIFsgZWRpdG9ySWQsIGlzRWRpdG9yT3BlbiwgZWRpdG9yT3BlbmVkLmN1cnJlbnQsIG9uRWRpdG9yQ2xvc2UgXSApO1xuXG5cdGNsb3NlRWRpdG9yTm90aWNlID0gdXNlTWVtbyhcblx0XHQoKSA9PiBjbG9zZUVkaXRvck5vdGljZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdGNsb3NlRWRpdG9yTm90aWNlIDpcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xvc2UgdGhlIEVkaXRvcj8lc0FsbCB1bnNhdmVkIGNoYW5nZXMgd2lsbCBiZSBsb3N0IScsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpLFxuXHRcdFx0XHQnXFxuXFxuJ1xuXHRcdFx0KSxcblx0XHRbIGNsb3NlRWRpdG9yTm90aWNlIF1cblx0KTtcblxuXHRjb25zdCBvblJlcXVlc3RDbG9zZSA9IHVzZUNhbGxiYWNrKCAoIGNsaWNrICkgPT4ge1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrLCAnRWRpdG9yTW9kYWwub25SZXF1ZXN0Q2xvc2UoKScgKTtcblx0XHRpZiAoICEgY2hhbmdlc1NhdmVkICYmIGNsb3NlRWRpdG9yTm90aWNlICE9PSAnJyApIHtcblx0XHRcdGlmICggY29uZmlybSggY2xvc2VFZGl0b3JOb3RpY2UgKSApIHtcblx0XHRcdFx0Y2xvc2VFZGl0b3IoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xvc2VFZGl0b3IoKTtcblx0XHR9XG5cdH0sIFtcblx0XHRjaGFuZ2VzU2F2ZWQsXG5cdFx0Y2xvc2VFZGl0b3IsXG5cdFx0Y2xvc2VFZGl0b3JOb3RpY2UsXG5cdF0gKTtcblxuXHRjb25zdCBodG1sQ2xhc3MgPSBjbGFzc05hbWVzKCB7XG5cdFx0WyBlZGl0b3JIdG1sQ2xhc3MgXTogZWRpdG9ySHRtbENsYXNzLFxuXHRcdCdlZS1lZGl0b3ItbW9kYWwnOiB0cnVlLFxuXHR9ICk7XG5cblx0cmV0dXJuIGlzRWRpdG9yT3BlbiA/IChcblx0XHQ8TW9kYWxcblx0XHRcdHRpdGxlPXsgZWRpdG9yVGl0bGUgfVxuXHRcdFx0Y2xhc3NOYW1lPXsgaHRtbENsYXNzIH1cblx0XHRcdG9uUmVxdWVzdENsb3NlPXsgb25SZXF1ZXN0Q2xvc2UgfVxuXHRcdFx0Y2xvc2VCdXR0b25MYWJlbD17IGVkaXRvckNsb3NlQnV0dG9uTGFiZWwgfVxuXHRcdFx0b3ZlcmxheUNsYXNzTmFtZT17ICdlZS1lZGl0b3ItbW9kYWwtb3ZlcmxheScgfVxuXHRcdFx0c2hvdWxkQ2xvc2VPbkVzYz17IGZhbHNlIH1cblx0XHRcdHNob3VsZENsb3NlT25DbGlja091dHNpZGU9eyBmYWxzZSB9XG5cdFx0XHR7IC4uLmV4dHJhTW9kYWxQcm9wcyB9XG5cdFx0PlxuXHRcdFx0e1xuXHRcdFx0XHRjbG9uZUVsZW1lbnQoXG5cdFx0XHRcdFx0Q2hpbGRyZW4ub25seShcblx0XHRcdFx0XHRcdGNoaWxkcmVuLFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpc0VkaXRvck9wZW4sXG5cdFx0XHRcdFx0XHRcdGNoYW5nZXNTYXZlZDogc2V0Q2hhbmdlc1NhdmVkLFxuXHRcdFx0XHRcdFx0XHQuLi5wYXNzZWRQcm9wcyxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHQ8L01vZGFsPlxuXHQpIDogbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvck1vZGFsO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBFZGl0b3JNb2RhbCB9IGZyb20gJy4vZWRpdG9yLW1vZGFsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ2xvc2VFZGl0b3IgfSBmcm9tICcuL3VzZS1jbG9zZS1lZGl0b3InO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VJc0VkaXRvck9wZW4gfSBmcm9tICcuL3VzZS1pcy1lZGl0b3Itb3Blbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZU9wZW5FZGl0b3IgfSBmcm9tICcuL3VzZS1vcGVuLWVkaXRvcic7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiY29tcG9uZW50cy1tb2RhbF9fc2NyZWVuLW92ZXJsYXlcIjpcImNvbXBvbmVudHMtbW9kYWxfX3NjcmVlbi1vdmVybGF5XCIsXCJlZS1lZGl0b3ItbW9kYWwtb3ZlcmxheVwiOlwiZWUtZWRpdG9yLW1vZGFsLW92ZXJsYXlcIixcImNvbXBvbmVudHMtbW9kYWxfX2ZyYW1lXCI6XCJjb21wb25lbnRzLW1vZGFsX19mcmFtZVwiLFwiZWUtZWRpdG9yLW1vZGFsXCI6XCJlZS1lZGl0b3ItbW9kYWxcIixcImVlLWVkaXRvci1tb2RhbC10aW55XCI6XCJlZS1lZGl0b3ItbW9kYWwtdGlueVwiLFwiZWUtZWRpdG9yLW1vZGFsLXNtYWxsXCI6XCJlZS1lZGl0b3ItbW9kYWwtc21hbGxcIixcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlclwiOlwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyXCIsXCJjb21wb25lbnRzLWljb24tYnV0dG9uXCI6XCJjb21wb25lbnRzLWljb24tYnV0dG9uXCIsXCJjb21wb25lbnRzLXBhbmVsX19ib2R5XCI6XCJjb21wb25lbnRzLXBhbmVsX19ib2R5XCIsXCJjb21wb25lbnRzLXBhbmVsX19ib2R5LXRpdGxlXCI6XCJjb21wb25lbnRzLXBhbmVsX19ib2R5LXRpdGxlXCIsXCJjb21wb25lbnRzLWJ1dHRvblwiOlwiY29tcG9uZW50cy1idXR0b25cIixcImNvbXBvbmVudHMtbW9kYWxfX2NvbnRlbnRcIjpcImNvbXBvbmVudHMtbW9kYWxfX2NvbnRlbnRcIixcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlci1oZWFkaW5nXCI6XCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXItaGVhZGluZ1wifTsiLCIvKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgY2FuY2VsQ2xpY2tFdmVudCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvcklkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZnVuY3Rpb24gZm9yIGNsb3NpbmcgYW4gZWRpdG9yXG4gKi9cbmNvbnN0IHVzZUNsb3NlRWRpdG9yID0gKCBlZGl0b3JJZCApID0+IHtcblx0Y29uc3QgeyBjbG9zZUVkaXRvciB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL29wZW4tZWRpdG9yLXN0YXRlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2ssICd1c2VDbG9zZUVkaXRvcicgKTtcblx0XHRpZiAoIGVkaXRvcklkICkge1xuXHRcdFx0Y2xvc2VFZGl0b3IoIGVkaXRvcklkICk7XG5cdFx0fVxuXHR9LCBbIGVkaXRvcklkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNsb3NlRWRpdG9yO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9ySWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZWRpdG9yIGlzIGN1cnJlbnRseSBvcGVuXG4gKi9cbmNvbnN0IHVzZUlzRWRpdG9yT3BlbiA9ICggZWRpdG9ySWQgKSA9PiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRyZXR1cm4gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9vcGVuLWVkaXRvci1zdGF0ZScgKS5pc0VkaXRvck9wZW4oIGVkaXRvcklkICk7XG59LCBudWxsICk7XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUlzRWRpdG9yT3BlbjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9ySWRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBmdW5jdGlvbiBmb3Igb3BlbmluZyBhbiBlZGl0b3JcbiAqL1xuY29uc3QgdXNlT3BlbkVkaXRvciA9ICggZWRpdG9ySWQgKSA9PiB7XG5cdGNvbnN0IHsgb3BlbkVkaXRvciB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL29wZW4tZWRpdG9yLXN0YXRlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2ssICd1c2VPcGVuRWRpdG9yJyApO1xuXHRcdGlmICggZWRpdG9ySWQgKSB7XG5cdFx0XHRvcGVuRWRpdG9yKCBlZGl0b3JJZCApO1xuXHRcdH1cblx0fSwgWyBlZGl0b3JJZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VPcGVuRWRpdG9yO1xuIiwiaW1wb3J0IHsgaWZDb25kaXRpb24gfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuZXhwb3J0IGRlZmF1bHQgaWZDb25kaXRpb24oICggeyBkYXRlRW50aXR5IH0gKSA9PlxuXHRpc01vZGVsRW50aXR5T2ZNb2RlbCggZGF0ZUVudGl0eSwgJ2RhdGV0aW1lJyApXG4pO1xuIiwiaW1wb3J0IHsgaWZDb25kaXRpb24gfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuZXhwb3J0IGRlZmF1bHQgaWZDb25kaXRpb24oICggeyB0aWNrZXRFbnRpdHkgfSApID0+XG5cdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXRFbnRpdHksICd0aWNrZXQnIClcbik7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIGlmVmFsaWREYXRlRW50aXR5IH0gZnJvbSAnLi9pZi12YWxpZC1kYXRlLWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGlmVmFsaWRUaWNrZXRFbnRpdHkgfSBmcm9tICcuL2lmLXZhbGlkLXRpY2tldC1lbnRpdHknO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9lZGl0b3ItbW9kYWwnO1xuZXhwb3J0ICogZnJvbSAnLi9pZi12YWxpZGF0b3JzLyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vdFdpdGhQb3N0VHlwZUNoZWNrIH0gZnJvbSAnLi9ub3Qtd2l0aC1wb3N0LXR5cGUtY2hlY2snO1xuZXhwb3J0ICogZnJvbSAnLi93aXRoLWVudGl0eS1ob2NzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyBzb21lLCBjYXN0QXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgd2l0aFNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBjb21wb25lbnQgd2l0aCByZW5kZXJzIGl0cyBvd24gY2hpbGRyZW4gb2x5IGlmIHRoZSBjdXJyZW50IGVkaXRvciBwb3N0IHR5cGVcbiAqIGlzIG5vdCBvbmUgb2YgdGhlIGdpdmVuIGBleGNsdWRlZFBvc3RUeXBlU2x1Z3NgIHByb3AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBvc3RUeXBlXG4gKiBAcGFyYW0ge1dQRWxlbWVudH0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGV4Y2x1ZGVkUG9zdFR5cGVTbHVnc1xuICogQHJldHVybiB7P1dQRWxlbWVudH0gUmVuZGVyZWQgZWxlbWVudCBvciBudWxsLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBOb3RXaXRoUG9zdFR5cGVDaGVjaygge1xuXHRwb3N0VHlwZSxcblx0Y2hpbGRyZW4sXG5cdGV4Y2x1ZGVkUG9zdFR5cGVTbHVncyxcbn0gKSB7XG5cdGxldCBpc0V4Y2x1ZGVkID0gZmFsc2U7XG5cdGlmICggcG9zdFR5cGUgKSB7XG5cdFx0aXNFeGNsdWRlZCA9IHNvbWUoXG5cdFx0XHRjYXN0QXJyYXkoIGV4Y2x1ZGVkUG9zdFR5cGVTbHVncyApLFxuXHRcdFx0KCB0eXBlICkgPT4gcG9zdFR5cGUgPT09IHR5cGVcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFeGNsdWRlZCApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBjaGlsZHJlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdGNvbnN0IHsgZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSB9ID0gc2VsZWN0KCAnY29yZS9lZGl0b3InICk7XG5cdHJldHVybiB7XG5cdFx0cG9zdFR5cGU6IGdldEVkaXRlZFBvc3RBdHRyaWJ1dGUoICd0eXBlJyApLFxuXHR9O1xufSApKCBOb3RXaXRoUG9zdFR5cGVDaGVjayApO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoRXZlbnRWZW51ZUVudGl0eSB9IGZyb20gJy4vd2l0aC1ldmVudC12ZW51ZS1lbnRpdHknO1xuIiwiaW1wb3J0IHsgd2l0aFNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBERUZBVUxUX09CSkVDVCA9IHtcblx0dmVudWVFbnRpdHk6IG51bGwsXG5cdHZlbnVlRW50aXR5TG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogd2l0aEV2ZW50VmVudWVFbnRpdHlcbiAqIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZzpcbiAqICAgIHZlbnVlRW50aXR5IC0gdGhlIFZlbnVlIEVudGl0eSBmb3IgdGhlIHByb3ZpZGVkIEV2ZW50IEVudGl0eVxuICogICAgdmVudWVFbnRpdHlMb2FkZWQgLSBib29sZWFuIHRydWUgaWYgbG9hZGluZyBpcyBjb21wbGV0ZVxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0d2l0aFNlbGVjdCggKCBzZWxlY3QsIHsgZXZlbnRFbnRpdHkgfSApID0+IHtcblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnRFbnRpdHksICdldmVudCcgKSApIHtcblx0XHRcdGxldCB2ZW51ZUVudGl0eSA9IGdldFJlbGF0ZWRFbnRpdGllcyhcblx0XHRcdFx0ZXZlbnRFbnRpdHksXG5cdFx0XHRcdCd2ZW51ZSdcblx0XHRcdCk7XG5cdFx0XHRjb25zdCB2ZW51ZUVudGl0eUxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0XHRbIGV2ZW50RW50aXR5LCAndmVudWUnIF1cblx0XHRcdCk7XG5cdFx0XHRpZiAoIHZlbnVlRW50aXR5TG9hZGVkICkge1xuXHRcdFx0XHR2ZW51ZUVudGl0eSA9IEFycmF5LmlzQXJyYXkoIHZlbnVlRW50aXR5ICkgJiYgdmVudWVFbnRpdHlbIDAgXSAmJlxuXHRcdFx0XHRpc01vZGVsRW50aXR5T2ZNb2RlbCggdmVudWVFbnRpdHlbIDAgXSwgJ3ZlbnVlJyApID9cblx0XHRcdFx0XHR2ZW51ZUVudGl0eVsgMCBdIDpcblx0XHRcdFx0XHRudWxsO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHZlbnVlRW50aXR5LFxuXHRcdFx0XHRcdHZlbnVlRW50aXR5TG9hZGVkLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gREVGQVVMVF9PQkpFQ1Q7XG5cdH0gKSxcblx0J3dpdGhFdmVudFZlbnVlRW50aXR5J1xuKTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kczsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaTE4blwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb25lbnRzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb3NlXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcImNsYXNzbmFtZXNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
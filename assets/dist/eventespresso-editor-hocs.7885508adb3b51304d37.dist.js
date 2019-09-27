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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/editor-hocs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/editor-hocs/editor-modal/editor-modal.js":
/*!*************************************************************!*\
  !*** ./assets/src/editor-hocs/editor-modal/editor-modal.js ***!
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
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style.css */ "./assets/src/editor-hocs/editor-modal/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _use_close_editor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./use-close-editor.js */ "./assets/src/editor-hocs/editor-modal/use-close-editor.js");
/* harmony import */ var _use_is_editor_open_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./use-is-editor-open.js */ "./assets/src/editor-hocs/editor-modal/use-is-editor-open.js");






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

  var isEditorOpen = Object(_use_is_editor_open_js__WEBPACK_IMPORTED_MODULE_10__["default"])(editorId);
  var closeEditor = Object(_use_close_editor_js__WEBPACK_IMPORTED_MODULE_9__["default"])(editorId); // trigger onEditorOpen event

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
    return closeEditorNotice !== undefined ? closeEditorNotice : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('Are you sure you want to close the Editor?%sAll unsaved changes will be lost!', 'event_espresso'), '\n\n');
  }, [closeEditorNotice]);
  var onRequestClose = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(function (click) {
    if (!changesSaved && closeEditorNotice !== '') {
      if (confirm(closeEditorNotice)) {
        closeEditor(click, 'EditorModal.onRequestClose()');
      }
    } else {
      closeEditor(click, 'EditorModal.onRequestClose()');
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

/***/ "./assets/src/editor-hocs/editor-modal/index.js":
/*!******************************************************!*\
  !*** ./assets/src/editor-hocs/editor-modal/index.js ***!
  \******************************************************/
/*! exports provided: EditorModal, useCloseEditor, useIsEditorOpen, useOpenEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/editor-hocs/editor-modal/editor-modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _use_close_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-close-editor */ "./assets/src/editor-hocs/editor-modal/use-close-editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCloseEditor", function() { return _use_close_editor__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _use_is_editor_open__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-is-editor-open */ "./assets/src/editor-hocs/editor-modal/use-is-editor-open.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsEditorOpen", function() { return _use_is_editor_open__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _use_open_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-open-editor */ "./assets/src/editor-hocs/editor-modal/use-open-editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useOpenEditor", function() { return _use_open_editor__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./assets/src/editor-hocs/editor-modal/style.css":
/*!*******************************************************!*\
  !*** ./assets/src/editor-hocs/editor-modal/style.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"components-modal__screen-overlay":"components-modal__screen-overlay","ee-editor-modal-overlay":"ee-editor-modal-overlay","components-modal__frame":"components-modal__frame","ee-editor-modal":"ee-editor-modal","ee-editor-modal-tiny":"ee-editor-modal-tiny","ee-editor-modal-small":"ee-editor-modal-small","components-modal__header":"components-modal__header","components-icon-button":"components-icon-button","components-panel__body":"components-panel__body","components-panel__body-title":"components-panel__body-title","components-button":"components-button","components-modal__content":"components-modal__content","components-modal__header-heading":"components-modal__header-heading"};

/***/ }),

/***/ "./assets/src/editor-hocs/editor-modal/use-close-editor.js":
/*!*****************************************************************!*\
  !*** ./assets/src/editor-hocs/editor-modal/use-close-editor.js ***!
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

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (click, src) {
    src = src ? src : editorId;
    Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["cancelClickEvent"])(click, src);

    if (editorId) {
      closeEditor(editorId);
    }
  }, [editorId]);
};

/* harmony default export */ __webpack_exports__["default"] = (useCloseEditor);

/***/ }),

/***/ "./assets/src/editor-hocs/editor-modal/use-is-editor-open.js":
/*!*******************************************************************!*\
  !*** ./assets/src/editor-hocs/editor-modal/use-is-editor-open.js ***!
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

/***/ "./assets/src/editor-hocs/editor-modal/use-open-editor.js":
/*!****************************************************************!*\
  !*** ./assets/src/editor-hocs/editor-modal/use-open-editor.js ***!
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

/***/ "./assets/src/editor-hocs/if-validators/if-valid-date-entity.js":
/*!**********************************************************************!*\
  !*** ./assets/src/editor-hocs/if-validators/if-valid-date-entity.js ***!
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

/***/ "./assets/src/editor-hocs/if-validators/if-valid-ticket-entity.js":
/*!************************************************************************!*\
  !*** ./assets/src/editor-hocs/if-validators/if-valid-ticket-entity.js ***!
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

/***/ "./assets/src/editor-hocs/if-validators/index.js":
/*!*******************************************************!*\
  !*** ./assets/src/editor-hocs/if-validators/index.js ***!
  \*******************************************************/
/*! exports provided: ifValidDateEntity, ifValidTicketEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _if_valid_date_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if-valid-date-entity */ "./assets/src/editor-hocs/if-validators/if-valid-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidDateEntity", function() { return _if_valid_date_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _if_valid_ticket_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-valid-ticket-entity */ "./assets/src/editor-hocs/if-validators/if-valid-ticket-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidTicketEntity", function() { return _if_valid_ticket_entity__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./assets/src/editor-hocs/index.js":
/*!*****************************************!*\
  !*** ./assets/src/editor-hocs/index.js ***!
  \*****************************************/
/*! exports provided: NotWithPostTypeCheck, EditorModal, useCloseEditor, useIsEditorOpen, useOpenEditor, ifValidDateEntity, ifValidTicketEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-modal */ "./assets/src/editor-hocs/editor-modal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorModal", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["EditorModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCloseEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["useCloseEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsEditorOpen", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["useIsEditorOpen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useOpenEditor", function() { return _editor_modal__WEBPACK_IMPORTED_MODULE_0__["useOpenEditor"]; });

/* harmony import */ var _if_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-validators */ "./assets/src/editor-hocs/if-validators/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidDateEntity", function() { return _if_validators__WEBPACK_IMPORTED_MODULE_1__["ifValidDateEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifValidTicketEntity", function() { return _if_validators__WEBPACK_IMPORTED_MODULE_1__["ifValidTicketEntity"]; });

/* harmony import */ var _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./not-with-post-type-check */ "./assets/src/editor-hocs/not-with-post-type-check/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotWithPostTypeCheck", function() { return _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./assets/src/editor-hocs/not-with-post-type-check/index.js":
/*!******************************************************************!*\
  !*** ./assets/src/editor-hocs/not-with-post-type-check/index.js ***!
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3ItaG9jcy9lZGl0b3ItbW9kYWwvZWRpdG9yLW1vZGFsLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yLWhvY3MvZWRpdG9yLW1vZGFsL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yLWhvY3MvZWRpdG9yLW1vZGFsL3N0eWxlLmNzcz8zN2FlIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yLWhvY3MvZWRpdG9yLW1vZGFsL3VzZS1jbG9zZS1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3ItaG9jcy9lZGl0b3ItbW9kYWwvdXNlLWlzLWVkaXRvci1vcGVuLmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yLWhvY3MvZWRpdG9yLW1vZGFsL3VzZS1vcGVuLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci1ob2NzL2lmLXZhbGlkYXRvcnMvaWYtdmFsaWQtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3ItaG9jcy9pZi12YWxpZGF0b3JzL2lmLXZhbGlkLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3ItaG9jcy9pZi12YWxpZGF0b3JzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yLWhvY3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3ItaG9jcy9ub3Qtd2l0aC1wb3N0LXR5cGUtY2hlY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ1dGlsc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2YWxpZGF0b3JzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJjb21wb25lbnRzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJjb21wb3NlXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJkYXRhXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJlbGVtZW50XCJdfSIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwiY2xhc3NuYW1lc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHtcInRoaXNcIjpcImxvZGFzaFwifSJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJjb25maXJtIiwibnVsbEZ1bmMiLCJFZGl0b3JNb2RhbCIsImVkaXRvcklkIiwiZWRpdG9yVGl0bGUiLCJlZGl0b3JIdG1sQ2xhc3MiLCJlZGl0b3JDbG9zZUJ1dHRvbkxhYmVsIiwiY2xvc2VFZGl0b3JOb3RpY2UiLCJvbkVkaXRvck9wZW4iLCJvbkVkaXRvckNsb3NlIiwiZXh0cmFNb2RhbFByb3BzIiwiY2hpbGRyZW4iLCJwYXNzZWRQcm9wcyIsImVkaXRvck9wZW5lZCIsInVzZVJlZiIsInVzZVN0YXRlIiwiY2hhbmdlc1NhdmVkIiwic2V0Q2hhbmdlc1NhdmVkIiwiaXNFZGl0b3JPcGVuIiwidXNlSXNFZGl0b3JPcGVuIiwiY2xvc2VFZGl0b3IiLCJ1c2VDbG9zZUVkaXRvciIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJ1c2VNZW1vIiwidW5kZWZpbmVkIiwic3ByaW50ZiIsIl9fIiwib25SZXF1ZXN0Q2xvc2UiLCJ1c2VDYWxsYmFjayIsImNsaWNrIiwiaHRtbENsYXNzIiwiY2xhc3NOYW1lcyIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsInVzZURpc3BhdGNoIiwic3JjIiwiY2FuY2VsQ2xpY2tFdmVudCIsInVzZVNlbGVjdCIsInNlbGVjdCIsInVzZU9wZW5FZGl0b3IiLCJvcGVuRWRpdG9yIiwiaWZDb25kaXRpb24iLCJkYXRlRW50aXR5IiwiaXNNb2RlbEVudGl0eU9mTW9kZWwiLCJ0aWNrZXRFbnRpdHkiLCJOb3RXaXRoUG9zdFR5cGVDaGVjayIsInBvc3RUeXBlIiwiZXhjbHVkZWRQb3N0VHlwZVNsdWdzIiwiaXNFeGNsdWRlZCIsInNvbWUiLCJjYXN0QXJyYXkiLCJ0eXBlIiwid2l0aFNlbGVjdCIsImdldEVkaXRlZFBvc3RBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7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QUFDQTtBQUNBOztBQUVBLGdDOzs7Ozs7Ozs7OztBQ1ZBLGFBQWEsdUNBQXVDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEsMkNBQTJDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBMUQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLHFDQUFxQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXBELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSx1REFBdUQsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F0RSxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1lZGl0b3ItaG9jcy43ODg1NTA4YWRiM2I1MTMwNGQzNy5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2VkaXRvci1ob2NzL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcblx0Q2hpbGRyZW4sXG5cdGNsb25lRWxlbWVudCxcblx0dXNlQ2FsbGJhY2ssXG5cdHVzZUVmZmVjdCxcblx0dXNlTWVtbyxcblx0dXNlUmVmLFxuXHR1c2VTdGF0ZSxcbn0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fLCBzcHJpbnRmIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB1c2VDbG9zZUVkaXRvciBmcm9tICcuL3VzZS1jbG9zZS1lZGl0b3IuanMnO1xuaW1wb3J0IHVzZUlzRWRpdG9yT3BlbiBmcm9tICcuL3VzZS1pcy1lZGl0b3Itb3Blbi5qcyc7XG5cbmNvbnN0IHsgY29uZmlybSB9ID0gd2luZG93O1xuY29uc3QgbnVsbEZ1bmMgPSAoKSA9PiBudWxsO1xuXG4vKipcbiAqIEVkaXRvck1vZGFsXG4gKiBXcmFwcyBhIGNvbXBvbmVudCB3aXRoIGEgV1AgTW9kYWwgY29tcG9uZW50XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gV3JhcHBlZENvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvcklkXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9yVGl0bGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBlZGl0b3JIdG1sQ2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBlZGl0b3JDbG9zZUJ1dHRvbkxhYmVsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkVkaXRvck9wZW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRWRpdG9yQ2xvc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbG9zZUVkaXRvck5vdGljZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dHJhTW9kYWxQcm9wc1xuICogQHJldHVybiB7T2JqZWN0fSBXcmFwcGVkQ29tcG9uZW50IHdpdGggRWRpdG9yIE1vZGFsXG4gKi9cbmNvbnN0IEVkaXRvck1vZGFsID0gKCB7XG5cdGVkaXRvcklkLFxuXHRlZGl0b3JUaXRsZSxcblx0ZWRpdG9ySHRtbENsYXNzLFxuXHRlZGl0b3JDbG9zZUJ1dHRvbkxhYmVsLFxuXHRjbG9zZUVkaXRvck5vdGljZSxcblx0b25FZGl0b3JPcGVuID0gbnVsbEZ1bmMsXG5cdG9uRWRpdG9yQ2xvc2UgPSBudWxsRnVuYyxcblx0ZXh0cmFNb2RhbFByb3BzID0ge30sXG5cdGNoaWxkcmVuLFxuXHQuLi5wYXNzZWRQcm9wc1xufSApID0+IHtcblx0Ly8gcmVmIHVzZWQgZm9yIGRldGVybWluaW5nIHdoZW4gbW9kYWwgaGFzIEpVU1QgYmVlbiBvcGVuZWQgb3IgY2xvc2VkXG5cdC8vIHNvIHRoYXQgd2Uga25vdyB3aGVuIHRvIGZpcmUgb25FZGl0b3JPcGVuKCkgYW5kIG9uRWRpdG9yQ2xvc2UoKVxuXHRjb25zdCBlZGl0b3JPcGVuZWQgPSB1c2VSZWYoIGZhbHNlICk7XG5cdGNvbnN0IFsgY2hhbmdlc1NhdmVkLCBzZXRDaGFuZ2VzU2F2ZWQgXSA9IHVzZVN0YXRlKCB0cnVlICk7XG5cdGNvbnN0IGlzRWRpdG9yT3BlbiA9IHVzZUlzRWRpdG9yT3BlbiggZWRpdG9ySWQgKTtcblx0Y29uc3QgY2xvc2VFZGl0b3IgPSB1c2VDbG9zZUVkaXRvciggZWRpdG9ySWQgKTtcblxuXHQvLyB0cmlnZ2VyIG9uRWRpdG9yT3BlbiBldmVudFxuXHR1c2VFZmZlY3QoICgpID0+IHtcblx0XHQvLyBpZiBpc0VkaXRvck9wZW4gd2FzIGp1c3QgdG9nZ2xlZCBhbmQgaXMgbm93IFwidHJ1ZVwiXG5cdFx0Ly8gYnV0IGVkaXRvck9wZW5lZCBoYXMgbm90IGJlZW4gdG9nZ2xlZCB5ZXQgYW5kIGlzIHN0aWxsIFwiZmFsc2VcIlxuXHRcdC8vIHRoZW4gd2Uga25vdyB0aGUgZWRpdG9yIHdhcyBKVVNUIG9wZW5lZCwgc28gY2FsbCBvbkVkaXRvck9wZW4oKVxuXHRcdGlmICggaXNFZGl0b3JPcGVuICYmICEgZWRpdG9yT3BlbmVkLmN1cnJlbnQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBvbkVkaXRvck9wZW4gPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdG9uRWRpdG9yT3BlbigpO1xuXHRcdFx0fVxuXHRcdFx0ZWRpdG9yT3BlbmVkLmN1cnJlbnQgPSB0cnVlO1xuXHRcdH1cblx0fSwgWyBlZGl0b3JJZCwgaXNFZGl0b3JPcGVuLCBlZGl0b3JPcGVuZWQuY3VycmVudCwgb25FZGl0b3JPcGVuIF0gKTtcblxuXHQvLyB0cmlnZ2VyIG9uRWRpdG9yQ2xvc2UgZXZlbnRcblx0dXNlRWZmZWN0KCAoKSA9PiB7XG5cdFx0Ly8gdGhlbiBvbiBmaXJzdCByZW5kZXIgYWZ0ZXIgY2xvc2UsXG5cdFx0Ly8gd2UgdHJpZ2dlciB0aGUgb25FZGl0b3JDbG9zZSgpIGV2ZW50XG5cdFx0Ly8gYW5kIHRoZW4gc2V0IGVkaXRvck9wZW5lZCBzdGF0ZSB0byBmYWxzZVxuXHRcdGlmICggISBpc0VkaXRvck9wZW4gJiYgZWRpdG9yT3BlbmVkLmN1cnJlbnQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBvbkVkaXRvckNsb3NlID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHRvbkVkaXRvckNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0XHRlZGl0b3JPcGVuZWQuY3VycmVudCA9IGZhbHNlO1xuXHRcdH1cblx0fSwgWyBlZGl0b3JJZCwgaXNFZGl0b3JPcGVuLCBlZGl0b3JPcGVuZWQuY3VycmVudCwgb25FZGl0b3JDbG9zZSBdICk7XG5cblx0Y2xvc2VFZGl0b3JOb3RpY2UgPSB1c2VNZW1vKFxuXHRcdCgpID0+IGNsb3NlRWRpdG9yTm90aWNlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0Y2xvc2VFZGl0b3JOb3RpY2UgOlxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbG9zZSB0aGUgRWRpdG9yPyVzQWxsIHVuc2F2ZWQgY2hhbmdlcyB3aWxsIGJlIGxvc3QhJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdCksXG5cdFx0XHRcdCdcXG5cXG4nXG5cdFx0XHQpLFxuXHRcdFsgY2xvc2VFZGl0b3JOb3RpY2UgXVxuXHQpO1xuXG5cdGNvbnN0IG9uUmVxdWVzdENsb3NlID0gdXNlQ2FsbGJhY2soICggY2xpY2sgKSA9PiB7XG5cdFx0aWYgKCAhIGNoYW5nZXNTYXZlZCAmJiBjbG9zZUVkaXRvck5vdGljZSAhPT0gJycgKSB7XG5cdFx0XHRpZiAoIGNvbmZpcm0oIGNsb3NlRWRpdG9yTm90aWNlICkgKSB7XG5cdFx0XHRcdGNsb3NlRWRpdG9yKCBjbGljaywgJ0VkaXRvck1vZGFsLm9uUmVxdWVzdENsb3NlKCknICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNsb3NlRWRpdG9yKCBjbGljaywgJ0VkaXRvck1vZGFsLm9uUmVxdWVzdENsb3NlKCknICk7XG5cdFx0fVxuXHR9LCBbXG5cdFx0Y2hhbmdlc1NhdmVkLFxuXHRcdGNsb3NlRWRpdG9yLFxuXHRcdGNsb3NlRWRpdG9yTm90aWNlLFxuXHRdICk7XG5cblx0Y29uc3QgaHRtbENsYXNzID0gY2xhc3NOYW1lcygge1xuXHRcdFsgZWRpdG9ySHRtbENsYXNzIF06IGVkaXRvckh0bWxDbGFzcyxcblx0XHQnZWUtZWRpdG9yLW1vZGFsJzogdHJ1ZSxcblx0fSApO1xuXG5cdHJldHVybiBpc0VkaXRvck9wZW4gPyAoXG5cdFx0PE1vZGFsXG5cdFx0XHR0aXRsZT17IGVkaXRvclRpdGxlIH1cblx0XHRcdGNsYXNzTmFtZT17IGh0bWxDbGFzcyB9XG5cdFx0XHRvblJlcXVlc3RDbG9zZT17IG9uUmVxdWVzdENsb3NlIH1cblx0XHRcdGNsb3NlQnV0dG9uTGFiZWw9eyBlZGl0b3JDbG9zZUJ1dHRvbkxhYmVsIH1cblx0XHRcdG92ZXJsYXlDbGFzc05hbWU9eyAnZWUtZWRpdG9yLW1vZGFsLW92ZXJsYXknIH1cblx0XHRcdHNob3VsZENsb3NlT25Fc2M9eyBmYWxzZSB9XG5cdFx0XHRzaG91bGRDbG9zZU9uQ2xpY2tPdXRzaWRlPXsgZmFsc2UgfVxuXHRcdFx0eyAuLi5leHRyYU1vZGFsUHJvcHMgfVxuXHRcdD5cblx0XHRcdHtcblx0XHRcdFx0Y2xvbmVFbGVtZW50KFxuXHRcdFx0XHRcdENoaWxkcmVuLm9ubHkoXG5cdFx0XHRcdFx0XHRjaGlsZHJlbixcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aXNFZGl0b3JPcGVuLFxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VzU2F2ZWQ6IHNldENoYW5nZXNTYXZlZCxcblx0XHRcdFx0XHRcdFx0Li4ucGFzc2VkUHJvcHMsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0PC9Nb2RhbD5cblx0KSA6IG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JNb2RhbDtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRWRpdG9yTW9kYWwgfSBmcm9tICcuL2VkaXRvci1tb2RhbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNsb3NlRWRpdG9yIH0gZnJvbSAnLi91c2UtY2xvc2UtZWRpdG9yJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlSXNFZGl0b3JPcGVuIH0gZnJvbSAnLi91c2UtaXMtZWRpdG9yLW9wZW4nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VPcGVuRWRpdG9yIH0gZnJvbSAnLi91c2Utb3Blbi1lZGl0b3InO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImNvbXBvbmVudHMtbW9kYWxfX3NjcmVlbi1vdmVybGF5XCI6XCJjb21wb25lbnRzLW1vZGFsX19zY3JlZW4tb3ZlcmxheVwiLFwiZWUtZWRpdG9yLW1vZGFsLW92ZXJsYXlcIjpcImVlLWVkaXRvci1tb2RhbC1vdmVybGF5XCIsXCJjb21wb25lbnRzLW1vZGFsX19mcmFtZVwiOlwiY29tcG9uZW50cy1tb2RhbF9fZnJhbWVcIixcImVlLWVkaXRvci1tb2RhbFwiOlwiZWUtZWRpdG9yLW1vZGFsXCIsXCJlZS1lZGl0b3ItbW9kYWwtdGlueVwiOlwiZWUtZWRpdG9yLW1vZGFsLXRpbnlcIixcImVlLWVkaXRvci1tb2RhbC1zbWFsbFwiOlwiZWUtZWRpdG9yLW1vZGFsLXNtYWxsXCIsXCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXJcIjpcImNvbXBvbmVudHMtbW9kYWxfX2hlYWRlclwiLFwiY29tcG9uZW50cy1pY29uLWJ1dHRvblwiOlwiY29tcG9uZW50cy1pY29uLWJ1dHRvblwiLFwiY29tcG9uZW50cy1wYW5lbF9fYm9keVwiOlwiY29tcG9uZW50cy1wYW5lbF9fYm9keVwiLFwiY29tcG9uZW50cy1wYW5lbF9fYm9keS10aXRsZVwiOlwiY29tcG9uZW50cy1wYW5lbF9fYm9keS10aXRsZVwiLFwiY29tcG9uZW50cy1idXR0b25cIjpcImNvbXBvbmVudHMtYnV0dG9uXCIsXCJjb21wb25lbnRzLW1vZGFsX19jb250ZW50XCI6XCJjb21wb25lbnRzLW1vZGFsX19jb250ZW50XCIsXCJjb21wb25lbnRzLW1vZGFsX19oZWFkZXItaGVhZGluZ1wiOlwiY29tcG9uZW50cy1tb2RhbF9faGVhZGVyLWhlYWRpbmdcIn07IiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9ySWRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBmdW5jdGlvbiBmb3IgY2xvc2luZyBhbiBlZGl0b3JcbiAqL1xuY29uc3QgdXNlQ2xvc2VFZGl0b3IgPSAoIGVkaXRvcklkICkgPT4ge1xuXHRjb25zdCB7IGNsb3NlRWRpdG9yIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vb3Blbi1lZGl0b3Itc3RhdGUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBjbGljaywgc3JjICkgPT4ge1xuXHRcdHNyYyA9IHNyYyA/IHNyYyA6IGVkaXRvcklkO1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrLCBzcmMgKTtcblx0XHRpZiAoIGVkaXRvcklkICkge1xuXHRcdFx0Y2xvc2VFZGl0b3IoIGVkaXRvcklkICk7XG5cdFx0fVxuXHR9LCBbIGVkaXRvcklkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNsb3NlRWRpdG9yO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZWRpdG9ySWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZWRpdG9yIGlzIGN1cnJlbnRseSBvcGVuXG4gKi9cbmNvbnN0IHVzZUlzRWRpdG9yT3BlbiA9ICggZWRpdG9ySWQgKSA9PiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRyZXR1cm4gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9vcGVuLWVkaXRvci1zdGF0ZScgKS5pc0VkaXRvck9wZW4oIGVkaXRvcklkICk7XG59LCBudWxsICk7XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUlzRWRpdG9yT3BlbjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGVkaXRvcklkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZnVuY3Rpb24gZm9yIG9wZW5pbmcgYW4gZWRpdG9yXG4gKi9cbmNvbnN0IHVzZU9wZW5FZGl0b3IgPSAoIGVkaXRvcklkICkgPT4ge1xuXHRjb25zdCB7IG9wZW5FZGl0b3IgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9vcGVuLWVkaXRvci1zdGF0ZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGNsaWNrICkgPT4ge1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrLCAndXNlT3BlbkVkaXRvcicgKTtcblx0XHRpZiAoIGVkaXRvcklkICkge1xuXHRcdFx0b3BlbkVkaXRvciggZWRpdG9ySWQgKTtcblx0XHR9XG5cdH0sIFsgZWRpdG9ySWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlT3BlbkVkaXRvcjtcbiIsImltcG9ydCB7IGlmQ29uZGl0aW9uIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGlmQ29uZGl0aW9uKCAoIHsgZGF0ZUVudGl0eSB9ICkgPT5cblx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGRhdGVFbnRpdHksICdkYXRldGltZScgKVxuKTtcbiIsImltcG9ydCB7IGlmQ29uZGl0aW9uIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGlmQ29uZGl0aW9uKCAoIHsgdGlja2V0RW50aXR5IH0gKSA9PlxuXHRpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApXG4pO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBpZlZhbGlkRGF0ZUVudGl0eSB9IGZyb20gJy4vaWYtdmFsaWQtZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBpZlZhbGlkVGlja2V0RW50aXR5IH0gZnJvbSAnLi9pZi12YWxpZC10aWNrZXQtZW50aXR5JztcbiIsImV4cG9ydCAqIGZyb20gJy4vZWRpdG9yLW1vZGFsJztcbmV4cG9ydCAqIGZyb20gJy4vaWYtdmFsaWRhdG9ycyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vdFdpdGhQb3N0VHlwZUNoZWNrIH0gZnJvbSAnLi9ub3Qtd2l0aC1wb3N0LXR5cGUtY2hlY2snO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IHNvbWUsIGNhc3RBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB3aXRoU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB3aXRoIHJlbmRlcnMgaXRzIG93biBjaGlsZHJlbiBvbHkgaWYgdGhlIGN1cnJlbnQgZWRpdG9yIHBvc3QgdHlwZVxuICogaXMgbm90IG9uZSBvZiB0aGUgZ2l2ZW4gYGV4Y2x1ZGVkUG9zdFR5cGVTbHVnc2AgcHJvcC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcG9zdFR5cGVcbiAqIEBwYXJhbSB7V1BFbGVtZW50fSBjaGlsZHJlblxuICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZXhjbHVkZWRQb3N0VHlwZVNsdWdzXG4gKiBAcmV0dXJuIHs/V1BFbGVtZW50fSBSZW5kZXJlZCBlbGVtZW50IG9yIG51bGwuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE5vdFdpdGhQb3N0VHlwZUNoZWNrKCB7XG5cdHBvc3RUeXBlLFxuXHRjaGlsZHJlbixcblx0ZXhjbHVkZWRQb3N0VHlwZVNsdWdzLFxufSApIHtcblx0bGV0IGlzRXhjbHVkZWQgPSBmYWxzZTtcblx0aWYgKCBwb3N0VHlwZSApIHtcblx0XHRpc0V4Y2x1ZGVkID0gc29tZShcblx0XHRcdGNhc3RBcnJheSggZXhjbHVkZWRQb3N0VHlwZVNsdWdzICksXG5cdFx0XHQoIHR5cGUgKSA9PiBwb3N0VHlwZSA9PT0gdHlwZVxuXHRcdCk7XG5cdH1cblx0aWYgKCBpc0V4Y2x1ZGVkICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIGNoaWxkcmVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0Y29uc3QgeyBnZXRFZGl0ZWRQb3N0QXR0cmlidXRlIH0gPSBzZWxlY3QoICdjb3JlL2VkaXRvcicgKTtcblx0cmV0dXJuIHtcblx0XHRwb3N0VHlwZTogZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSggJ3R5cGUnICksXG5cdH07XG59ICkoIE5vdFdpdGhQb3N0VHlwZUNoZWNrICk7XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaTE4blwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ1dGlsc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb25lbnRzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJjb21wb3NlXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcImNsYXNzbmFtZXNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
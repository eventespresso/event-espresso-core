var eejs = eejs || {}; eejs["components"] =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/components/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/components/form/select/build-options.js":
/*!************************************************************!*\
  !*** ./assets/src/components/form/select/build-options.js ***!
  \************************************************************/
/*! exports provided: OPTION_SELECT_ALL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPTION_SELECT_ALL", function() { return OPTION_SELECT_ALL; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */


/**
 * A default map used for mapping options for select.
 * @type {Object}
 */
var DEFAULT_MODEL_OPTIONS_MAP = {
	event: {
		label: 'EVT_name',
		value: 'EVT_ID'
	},
	datetime: {
		label: 'DTT_name',
		value: 'DTT_ID'
	},
	ticket: {
		label: 'TKT_name',
		value: 'TKT_ID'
	}
};

var OPTION_SELECT_ALL = 'ALL';

/**
 * Receives an array of event entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array } entities
 * @param { string } modelName
 * @param { string } addAllOptionLabel  If present then options array will be
 * 										prepended with an "ALL" option meaning
 * 										that all options are selected.
 * @param { Object } map
 * @return { Array }  Returns an array of simple objects formatted for any
 * select control that receives its options in the format of an array of objects
 * with label and value keys.
 */
var buildOptions = function buildOptions(entities, modelName) {
	var addAllOptionLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	var map = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_MODEL_OPTIONS_MAP;

	var MAP_FOR_MODEL = map[modelName] ? map[modelName] : false;
	var generatedOptions = entities && MAP_FOR_MODEL ? Object(lodash__WEBPACK_IMPORTED_MODULE_0__["reduce"])(entities, function (options, entity) {
		if (entity[MAP_FOR_MODEL.label] && entity[MAP_FOR_MODEL.value]) {
			options.push({
				label: entity[MAP_FOR_MODEL.label],
				value: entity[MAP_FOR_MODEL.value]
			});
		}
		return options;
	}, []) : [];
	if (entities && addAllOptionLabel !== '') {
		generatedOptions.unshift({
			label: addAllOptionLabel,
			value: OPTION_SELECT_ALL
		});
	}
	return generatedOptions;
};

/* harmony default export */ __webpack_exports__["default"] = (buildOptions);

/***/ }),

/***/ "./assets/src/components/form/select/default-select-configuration.js":
/*!***************************************************************************!*\
  !*** ./assets/src/components/form/select/default-select-configuration.js ***!
  \***************************************************************************/
/*! exports provided: REACT_SELECT_TYPES, REACT_SELECT_DEFAULTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_SELECT_TYPES", function() { return REACT_SELECT_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_SELECT_DEFAULTS", function() { return REACT_SELECT_DEFAULTS; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */



var REACT_SELECT_TYPES = {
	'aria-describedby': prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	'aria-label': prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	'aria-labelledby': prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	backspaceRemovesValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	blurInputOnSelect: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	captureMenuScroll: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	classNamePrefix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	closeMenuOnSelect: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	components: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
	controlShouldRenderValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	delimiter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	escapeClearsValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	filterOption: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	formatGroupLabel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	formatOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	getOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	getOptionValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	hideSelectedOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	inputValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	inputId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	instanceId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
	isClearable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	isOptionDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	isOptionSelected: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	isMulti: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	isSearchable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	loadingMessage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	minMenuHeight: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
	maxMenuHeight: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
	menuIsOpen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	menuPlacement: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['auto', 'bottom', 'top']),
	menuPosition: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['absolute', 'fixed']),
	menuPortalTarget: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element,
	menuShouldBlockScroll: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	menuShouldScrollIntoView: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	noOptionsMessage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onBlur: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onMenuOpen: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onMenuClose: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onMenuScrollToTop: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	onMenuScrollToBottom: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	openMenuOnFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	openMenuOnClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	options: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
	pageSize: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
	placeholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	screenReaderStatus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
	styles: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
		clearIndicator: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		container: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		control: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		dropdownIndicator: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		group: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		groupHeading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		indicatorsContainer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		indicatorSeparator: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		input: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		loadingIndicator: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		loadingMessageCSS: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		menu: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		menuList: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		menuPortal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		multiValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		multiValueLabel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		multiValueRemove: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		noOptionsMessageCSS: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		option: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		placeholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		singleValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
		valueContainer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func
	}),
	tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
	tabSelectsValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
	value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array])
};

var REACT_SELECT_DEFAULTS = {
	isClearable: true,
	isLoading: true,
	placeholder: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Select...', 'event_espresso')
};

/***/ }),

/***/ "./assets/src/components/form/select/index.js":
/*!****************************************************!*\
  !*** ./assets/src/components/form/select/index.js ***!
  \****************************************************/
/*! exports provided: ModelSelect, ModelEnhancedSelect, EventSelect, DatetimeSelect, TicketSelect, OPTION_SELECT_ALL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model-select */ "./assets/src/components/form/select/model-select.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModelSelect", function() { return _model_select__WEBPACK_IMPORTED_MODULE_0__["ModelSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModelEnhancedSelect", function() { return _model_select__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _model_selects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model-selects */ "./assets/src/components/form/select/model-selects/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventSelect", function() { return _model_selects__WEBPACK_IMPORTED_MODULE_1__["EventSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatetimeSelect", function() { return _model_selects__WEBPACK_IMPORTED_MODULE_1__["DatetimeSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TicketSelect", function() { return _model_selects__WEBPACK_IMPORTED_MODULE_1__["TicketSelect"]; });

/* harmony import */ var _build_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./build-options */ "./assets/src/components/form/select/build-options.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OPTION_SELECT_ALL", function() { return _build_options__WEBPACK_IMPORTED_MODULE_2__["OPTION_SELECT_ALL"]; });





/***/ }),

/***/ "./assets/src/components/form/select/model-select.js":
/*!***********************************************************!*\
  !*** ./assets/src/components/form/select/model-select.js ***!
  \***********************************************************/
/*! exports provided: ModelSelect, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelSelect", function() { return ModelSelect; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _build_options__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./build-options */ "./assets/src/components/form/select/build-options.js");
/* harmony import */ var _data_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../data/model */ "./assets/src/data/model/index.js");
/* harmony import */ var _default_select_configuration__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./default-select-configuration */ "./assets/src/components/form/select/default-select-configuration.js");






/**
 * External imports
 */





/**
 * WP dependencies
 */


/**
 * Internal imports
 */




/**
 * ModelSelect component.
 * This is a component that will generate a react-select input for a given
 * model and its entities (provided via props).
 *
 * @see https://deploy-preview-2289--react-select.netlify.com/props#prop-types
 *   for options that can be passed through via the selectConfiguration prop.
 *
 * @param { Object } selectConfiguration  An object containing options for the
 *                                          react-select component.
 * @param { Array } modelEntities          Array of model entities
 * @param { string } modelName              The name of the Model the entities
 *                                          belong to.
 * @param { function } mapOptionsCallback  This function will receive by
 *   default the modelEntities, the modelName (and any custom Map provided) and
 *   is expected to return an array of options to be used for the react-select
 *   component.
 * @param { Object } optionsEntityMap    If provided, it is expected to be a
 *   map of modelName fields to `label` and `value` keys used by
 *   `mapOptionsCallback`.
 */
var ModelSelect = function (_Component) {
	babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ModelSelect, _Component);

	function ModelSelect() {
		babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ModelSelect);

		return babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (ModelSelect.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default()(ModelSelect)).apply(this, arguments));
	}

	babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ModelSelect, [{
		key: 'getSelectLabel',
		value: function getSelectLabel() {
			var _props = this.props,
			    selectLabel = _props.selectLabel,
			    selectConfiguration = _props.selectConfiguration;

			return selectLabel ? React.createElement(
				'label',
				{ htmlFor: selectConfiguration.name },
				selectLabel
			) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Fragment"],
				null,
				this.getSelectLabel(),
				React.createElement(react_select__WEBPACK_IMPORTED_MODULE_6__["default"], this.state)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(props) {
			var selectConfiguration = props.selectConfiguration;

			var options = ModelSelect.getOptions(props);
			var updated = {
				options: options,
				value: ModelSelect.getOptionObjectForValue(selectConfiguration.defaultValue, options)
			};
			return babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _default_select_configuration__WEBPACK_IMPORTED_MODULE_13__["REACT_SELECT_DEFAULTS"], selectConfiguration, updated);
		}
	}, {
		key: 'getOptions',
		value: function getOptions(props) {
			var modelEntities = props.modelEntities,
			    modelName = props.modelName,
			    optionsEntityMap = props.optionsEntityMap,
			    mapOptionsCallback = props.mapOptionsCallback,
			    addAllOptionLabel = props.addAllOptionLabel;

			if (!Object(lodash__WEBPACK_IMPORTED_MODULE_8__["isEmpty"])(modelEntities)) {
				return optionsEntityMap !== null ? mapOptionsCallback(modelEntities, modelName, addAllOptionLabel, optionsEntityMap) : mapOptionsCallback(modelEntities, modelName, addAllOptionLabel);
			}
			return [];
		}
	}, {
		key: 'getOptionObjectForValue',
		value: function getOptionObjectForValue(value, options) {
			if (!Object(lodash__WEBPACK_IMPORTED_MODULE_8__["isEmpty"])(options)) {
				var match = Object(lodash__WEBPACK_IMPORTED_MODULE_8__["find"])(options, function (option) {
					return option.value === value;
				});
				return !Object(lodash__WEBPACK_IMPORTED_MODULE_8__["isUndefined"])(match) ? match : null;
			}
			return {};
		}
	}]);

	return ModelSelect;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/**
 * The ModelSelect Component wrapped in the `withSelect` higher order component.
 * This subscribes the ModelSelect component to the state maintained via the
 * eventespresso/lists store.
 */
ModelSelect.propTypes = {
	selectConfiguration: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.shape(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _default_select_configuration__WEBPACK_IMPORTED_MODULE_13__["REACT_SELECT_TYPES"])),
	modelEntities: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array,
	modelName: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.oneOf(_data_model__WEBPACK_IMPORTED_MODULE_12__["MODEL_NAMES"]),
	mapOptionsCallback: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
	optionsEntityMap: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object,
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
		order: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.oneOf(['asc', 'desc'])
	}),
	getQueryString: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
	selectLabel: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
	addAllOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string
};
ModelSelect.defaultProps = {
	selectConfiguration: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _default_select_configuration__WEBPACK_IMPORTED_MODULE_13__["REACT_SELECT_DEFAULTS"], {
		name: Object(lodash__WEBPACK_IMPORTED_MODULE_8__["uniqueId"])('model-select-')
	}),
	modelEntities: [],
	modelName: '',
	mapOptionsCallback: _build_options__WEBPACK_IMPORTED_MODULE_11__["default"],
	optionsEntityMap: null,
	queryData: {
		limit: 100,
		order: 'desc'
	},
	selectLabel: '',
	addAllOptionLabel: ''
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__["withSelect"])(function (select, ownProps) {
	var getQueryString = ownProps.getQueryString,
	    modelName = ownProps.modelName,
	    selectConfiguration = ownProps.selectConfiguration;

	var queryString = getQueryString(ownProps.queryData);

	var _select = select('eventespresso/lists'),
	    getItems = _select.getItems,
	    isRequestingItems = _select.isRequestingItems;

	return babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, ModelSelect.defaultProps, ownProps, {
		modelEntities: getItems(modelName, queryString),
		selectConfiguration: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, ModelSelect.defaultProps.selectConfiguration, selectConfiguration, {
			isLoading: isRequestingItems(modelName, queryString)
		})
	});
})(ModelSelect));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/form/select/model-selects/datetime.js":
/*!*********************************************************************!*\
  !*** ./assets/src/components/form/select/model-selects/datetime.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _model_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model-select */ "./assets/src/components/form/select/model-select.js");
/* harmony import */ var _data_model_datetime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../data/model/datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);






/**
 * Internal imports
 */



/**
 * External imports
 */




/**
 * Select Component for the Datetime Model.
 */

var DatetimeSelect = function (_Component) {
	babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(DatetimeSelect, _Component);

	function DatetimeSelect() {
		var _ref;

		var _temp, _this, _ret;

		babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, DatetimeSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_ref = DatetimeSelect.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default()(DatetimeSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			modelName: 'datetime'
		}, _temp), babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(_this, _ret);
	}

	babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(DatetimeSelect, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectedDatetimeId = _props.selectedDatetimeId,
			    onDatetimeSelect = _props.onDatetimeSelect;

			var selectOpts = {
				selectConfiguration: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
					defaultValue: selectedDatetimeId,
					onChange: onDatetimeSelect
				}, this.props.selectConfiguration)
			};
			var props = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, selectOpts, this.state);
			return React.createElement(_model_select__WEBPACK_IMPORTED_MODULE_6__["default"], props);
		}
	}]);

	return DatetimeSelect;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);

DatetimeSelect.defaultProps = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
	selectConfiguration: {
		loadingMessage: function loadingMessage() {
			return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Retrieving Datetimes.', 'event_espresso');
		},
		noOptionsMessage: function noOptionsMessage() {
			return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('No Datetimes.', 'event_espresso');
		},
		placeholder: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Datetime...', 'event_espresso')
	}
}, _data_model_datetime__WEBPACK_IMPORTED_MODULE_7__["defaultQueryData"], {
	getQueryString: _data_model_datetime__WEBPACK_IMPORTED_MODULE_7__["getQueryString"],
	selectLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Datetime', 'event_espresso'),
	addAllOptionLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('All Datetimes', 'event_espresso')
});
DatetimeSelect.propTypes = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _data_model_datetime__WEBPACK_IMPORTED_MODULE_7__["queryDataTypes"], {
	forEventId: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].number,
	selectedDatetimeId: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].number, prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].string]),
	onDatetimeSelect: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].func,
	selectLabel: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].string
});
/* harmony default export */ __webpack_exports__["default"] = (DatetimeSelect);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/form/select/model-selects/event.js":
/*!******************************************************************!*\
  !*** ./assets/src/components/form/select/model-selects/event.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _model_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model-select */ "./assets/src/components/form/select/model-select.js");
/* harmony import */ var _data_model_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../data/model/event */ "./assets/src/data/model/event/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);






/**
 * Internal imports
 */



/**
 * External imports
 */




/**
 * Select Component for the Event Model.
 */

var EventSelect = function (_Component) {
	babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(EventSelect, _Component);

	function EventSelect() {
		var _ref;

		var _temp, _this, _ret;

		babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, EventSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_ref = EventSelect.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default()(EventSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			modelName: 'event'
		}, _temp), babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(_this, _ret);
	}

	babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(EventSelect, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectedEventId = _props.selectedEventId,
			    onEventSelect = _props.onEventSelect;

			var selectOpts = {
				selectConfiguration: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
					defaultValue: selectedEventId,
					onChange: onEventSelect
				}, this.props.selectConfiguration)
			};
			var props = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, selectOpts, this.state);
			return React.createElement(_model_select__WEBPACK_IMPORTED_MODULE_6__["default"], props);
		}
	}]);

	return EventSelect;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);

EventSelect.defaultProps = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
	selectConfiguration: {
		loadingMessage: function loadingMessage() {
			return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Retrieving Events.', 'event_espresso');
		},
		noOptionsMessage: function noOptionsMessage() {
			return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('No Events.', 'event_espresso');
		},
		placeholder: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Event...', 'event_espresso')
	}
}, _data_model_event__WEBPACK_IMPORTED_MODULE_7__["defaultQueryData"], {
	getQueryString: _data_model_event__WEBPACK_IMPORTED_MODULE_7__["getQueryString"],
	selectLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Event', 'event_espresso')
});
EventSelect.propTypes = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _data_model_event__WEBPACK_IMPORTED_MODULE_7__["queryDataTypes"], {
	selectedEventId: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string]),
	onEventSelect: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
	selectLabel: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string
});
/* harmony default export */ __webpack_exports__["default"] = (EventSelect);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/form/select/model-selects/index.js":
/*!******************************************************************!*\
  !*** ./assets/src/components/form/select/model-selects/index.js ***!
  \******************************************************************/
/*! exports provided: EventSelect, DatetimeSelect, TicketSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event */ "./assets/src/components/form/select/model-selects/event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventSelect", function() { return _event__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datetime */ "./assets/src/components/form/select/model-selects/datetime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatetimeSelect", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ticket */ "./assets/src/components/form/select/model-selects/ticket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TicketSelect", function() { return _ticket__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./assets/src/components/form/select/model-selects/ticket.js":
/*!*******************************************************************!*\
  !*** ./assets/src/components/form/select/model-selects/ticket.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _model_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model-select */ "./assets/src/components/form/select/model-select.js");
/* harmony import */ var _data_model_ticket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../data/model/ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);






/**
 * Internal imports
 */



/**
 * External imports
 */




/**
 * Select Component for the Ticket Model.
 */

var TicketSelect = function (_Component) {
	babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TicketSelect, _Component);

	function TicketSelect() {
		var _ref;

		var _temp, _this, _ret;

		babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, TicketSelect);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_ref = TicketSelect.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_1___default()(TicketSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			modelName: 'ticket'
		}, _temp), babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(_this, _ret);
	}

	babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(TicketSelect, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectedTicketId = _props.selectedTicketId,
			    onTicketSelect = _props.onTicketSelect;

			var selectOpts = {
				selectConfiguration: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
					defaultValue: selectedTicketId,
					onChange: onTicketSelect
				}, this.props.selectConfiguration)
			};
			var props = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, selectOpts, this.state);
			return React.createElement(_model_select__WEBPACK_IMPORTED_MODULE_6__["default"], props);
		}
	}]);

	return TicketSelect;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);

TicketSelect.defaultProps = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
	selectConfiguration: {
		loadingMessage: function loadingMessage() {
			return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Retrieving Tickets.', 'event_espresso');
		},
		noOptionsMessage: function noOptionsMessage() {
			return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('No Tickets.', 'event_espresso');
		},
		placeholder: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Ticket...', 'event_espresso')
	}
}, _data_model_ticket__WEBPACK_IMPORTED_MODULE_7__["defaultQueryData"], {
	getQueryString: _data_model_ticket__WEBPACK_IMPORTED_MODULE_7__["getQueryString"],
	selectLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Ticket', 'event_espresso'),
	addAllOptionLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('All Tickets', 'event_espresso')
});
TicketSelect.propTypes = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _data_model_ticket__WEBPACK_IMPORTED_MODULE_7__["queryDataTypes"], {
	forEventId: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].number,
	forDatetimeId: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].number,
	selectedTicketId: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].number, prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].string]),
	onTicketSelect: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].func,
	selectLabel: prop_types__WEBPACK_IMPORTED_MODULE_10__["PropTypes"].string
});
/* harmony default export */ __webpack_exports__["default"] = (TicketSelect);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/index.js":
/*!****************************************!*\
  !*** ./assets/src/components/index.js ***!
  \****************************************/
/*! exports provided: QueryLimit, RegistrationStatusSelect, ModelSelect, ModelEnhancedSelect, EventSelect, DatetimeSelect, TicketSelect, OPTION_SELECT_ALL, AvatarImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query_limit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query/limit */ "./assets/src/components/query/limit/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryLimit", function() { return _query_limit__WEBPACK_IMPORTED_MODULE_0__["QueryLimit"]; });

/* harmony import */ var _form_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form/select */ "./assets/src/components/form/select/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModelSelect", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["ModelSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModelEnhancedSelect", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["ModelEnhancedSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventSelect", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["EventSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatetimeSelect", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["DatetimeSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TicketSelect", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["TicketSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OPTION_SELECT_ALL", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["OPTION_SELECT_ALL"]; });

/* harmony import */ var _selection_registration_status_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selection/registration-status-select */ "./assets/src/components/selection/registration-status-select/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegistrationStatusSelect", function() { return _selection_registration_status_select__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./assets/src/components/ui/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AvatarImage", function() { return _ui__WEBPACK_IMPORTED_MODULE_3__["AvatarImage"]; });

// query components

// selection components



// general ui components


/***/ }),

/***/ "./assets/src/components/query/limit/index.js":
/*!****************************************************!*\
  !*** ./assets/src/components/query/limit/index.js ***!
  \****************************************************/
/*! exports provided: QueryLimit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryLimit", function() { return QueryLimit; });
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 **/


var DEFAULT_LIMIT = 10;
var DEFAULT_LABEL = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Limit', 'event_espresso');
var DEFAULT_MIN = 1;
var DEFAULT_MAX = 100;

var QueryLimit = function QueryLimit(_ref) {
	var onLimitChange = _ref.onLimitChange,
	    _ref$limit = _ref.limit,
	    limit = _ref$limit === undefined ? DEFAULT_LIMIT : _ref$limit,
	    _ref$label = _ref.label,
	    label = _ref$label === undefined ? DEFAULT_LABEL : _ref$label,
	    _ref$min = _ref.min,
	    min = _ref$min === undefined ? DEFAULT_MIN : _ref$min,
	    _ref$max = _ref.max,
	    max = _ref$max === undefined ? DEFAULT_MAX : _ref$max;

	return !onLimitChange ? null : React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
		key: 'query-limit',
		value: limit,
		label: label,
		min: min,
		max: max,
		onChange: onLimitChange
	});
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/selection/registration-status-select/index.js":
/*!*****************************************************************************!*\
  !*** ./assets/src/components/selection/registration-status-select/index.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! querystringify */ "./node_modules/querystringify/index.js");
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(querystringify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./options */ "./assets/src/components/selection/registration-status-select/options.js");





/**
 * External dependencies
 */





/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


/**
 * RegistrationStatusSelect component.
 * Generates a registration status select input.
 *
 * @param {Array} regStatuses           An empty array or array of Status
 *                                    Entities. See prop-types for shape.
 * @param {function} onRegStatusSelect    The callback on selection of ticket.
 * @param {string} selectLabel        The label for the select input.
 * @param {number} selectedRegStatusId  The ID of the ticket to pre-select.
 * @param {boolean} isLoading            Whether or not the selector should
 *                                    start in a loading state
 * @return {Function}                    A pure component function.
 * @constructor
 */

var RegistrationStatusSelect = function (_Component) {
	babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RegistrationStatusSelect, _Component);

	function RegistrationStatusSelect() {
		babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, RegistrationStatusSelect);

		return babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (RegistrationStatusSelect.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(RegistrationStatusSelect)).apply(this, arguments));
	}

	babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(RegistrationStatusSelect, [{
		key: 'placeHolder',
		value: function placeHolder() {
			var _props = this.props,
			    isLoading = _props.isLoading,
			    selectLabel = _props.selectLabel;

			return React.createElement(
				_wordpress_element__WEBPACK_IMPORTED_MODULE_11__["Fragment"],
				null,
				React.createElement(
					_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["Placeholder"],
					{
						icon: 'clipboard',
						label: selectLabel
					},
					isLoading ? React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["Spinner"], null) : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Error loading Registration Statuses!', 'event_espresso')
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    regStatuses = _props2.regStatuses,
			    selectLabel = _props2.selectLabel,
			    selectedRegStatusId = _props2.selectedRegStatusId,
			    onRegStatusSelect = _props2.onRegStatusSelect,
			    addAllOption = _props2.addAllOption,
			    addAllOptionLabel = _props2.addAllOptionLabel;

			if (Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(regStatuses)) {
				return this.placeHolder();
			}
			return React.createElement(
				_wordpress_element__WEBPACK_IMPORTED_MODULE_11__["Fragment"],
				null,
				React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["SelectControl"], {
					label: selectLabel,
					value: selectedRegStatusId,
					options: Object(_options__WEBPACK_IMPORTED_MODULE_12__["registrationStatusSelectOptions"])(regStatuses, addAllOption, addAllOptionLabel),
					onChange: onRegStatusSelect
				})
			);
		}
	}]);

	return RegistrationStatusSelect;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_11__["Component"]);

/**
 * The RegistrationStatusSelect Component wrapped in the `withSelect` higher
 * order component. This subscribes the RegistrationStatusSelect component to
 * the state maintained via the eventespresso/lists store.
 */


RegistrationStatusSelect.propTypes = {
	regStatuses: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
		STS_ID: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number.isRequired,
		STS_code: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string.isRequired
	})),
	onRegStatusSelect: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
	selectLabel: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
	selectedRegStatusId: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
	isLoading: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
	addAllOption: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
	addAllOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
	attributes: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
		order: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.oneOf(['asc', 'desc'])
	})
};
RegistrationStatusSelect.defaultProps = {
	regStatuses: [],
	selectLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Select Registration Status', 'event_espresso'),
	selectedRegStatusId: 0,
	isLoading: true,
	addAllOption: true,
	addAllOptionLabel: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('All Registration Statuses', 'event_espresso'),
	attributes: {
		limit: 25,
		orderBy: 'STS_code',
		order: 'desc'
	}
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__["withSelect"])(function (select, ownProps) {
	var _ownProps$attributes = ownProps.attributes,
	    attributes = _ownProps$attributes === undefined ? RegistrationStatusSelect.defaultProps.attributes : _ownProps$attributes;
	var selectedRegStatusId = ownProps.selectedRegStatusId,
	    addAllOption = ownProps.addAllOption,
	    addAllOptionLabel = ownProps.addAllOptionLabel;

	var _select = select('eventespresso/lists'),
	    getRegistrationStatuss = _select.getRegistrationStatuss,
	    isRequestingRegistrationStatuss = _select.isRequestingRegistrationStatuss;

	var queryArgs = {
		limit: attributes.limit,
		order: attributes.order,
		order_by: attributes.orderBy
	};
	var queryString = Object(querystringify__WEBPACK_IMPORTED_MODULE_5__["stringify"])(Object(lodash__WEBPACK_IMPORTED_MODULE_6__["pickBy"])(queryArgs, function (value) {
		return !Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isUndefined"])(value);
	}));
	return {
		regStatuses: getRegistrationStatuss(queryString),
		isLoading: isRequestingRegistrationStatuss(queryString),
		selectedRegStatusId: selectedRegStatusId,
		addAllOption: addAllOption,
		addAllOptionLabel: addAllOptionLabel
	};
})(RegistrationStatusSelect));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/selection/registration-status-select/options.js":
/*!*******************************************************************************!*\
  !*** ./assets/src/components/selection/registration-status-select/options.js ***!
  \*******************************************************************************/
/*! exports provided: EE_OPTION_REG_STATUS_SELECT_ALL, registrationStatusSelectOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EE_OPTION_REG_STATUS_SELECT_ALL", function() { return EE_OPTION_REG_STATUS_SELECT_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registrationStatusSelectOptions", function() { return registrationStatusSelectOptions; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */


var EE_OPTION_REG_STATUS_SELECT_ALL = 'ALL_REG_STATUSES';

/**
 * Receives an array of registration status entities
 * and returns an array of simple objects
 * that can be passed along to the options array
 * used for the WordPress SelectControl component.
 *
 * @param { Array } regStatuses        An array of registration status entities
 * @param { boolean } addAllOption     If true, will prepend options array
 *                                     with an "ALL" option meaning that all
 *                                     statuses are essentially selected
 * @param { string } addAllOptionLabel label displayed for "ALL" option
 * @return { Array }                   Returns an array of simple objects
 *                                     formatted for the WordPress
 *                                     SelectControl component.
 */
var registrationStatusSelectOptions = function registrationStatusSelectOptions(regStatuses, addAllOption, addAllOptionLabel) {
	var regStatusOptions = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["reduce"])(regStatuses, function (options, status) {
		options.push({
			value: status.STS_ID,
			label: status.STS_code
		});
		return options;
	}, []);
	if (addAllOption === true) {
		regStatusOptions.unshift({
			value: EE_OPTION_REG_STATUS_SELECT_ALL,
			label: addAllOptionLabel
		});
	}
	return regStatusOptions;
};

/***/ }),

/***/ "./assets/src/components/ui/image/avatar.js":
/*!**************************************************!*\
  !*** ./assets/src/components/ui/image/avatar.js ***!
  \**************************************************/
/*! exports provided: AvatarImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvatarImage", function() { return AvatarImage; });
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);





/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/**
 * AvatarImage
 *
 * @constructor
 * @param {string} avatarUrl        gravatar URL
 * @param {string} avatarClass		base CSS class to apply
 * @param {number} avatarHeight		image height (default = 32px)
 * @param {number} avatarWidth 		image width (default = 32px)
 * @param {string} avatarAltText	image alt text
 * @return {Function}  				A pure component function.
 */
var AvatarImage = function (_Component) {
	babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AvatarImage, _Component);

	function AvatarImage() {
		babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AvatarImage);

		return babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (AvatarImage.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(AvatarImage)).apply(this, arguments));
	}

	babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AvatarImage, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    avatarUrl = _props.avatarUrl,
			    avatarClass = _props.avatarClass,
			    avatarHeight = _props.avatarHeight,
			    avatarWidth = _props.avatarWidth,
			    avatarAltText = _props.avatarAltText;

			return avatarUrl ? React.createElement(
				'div',
				{ className: avatarClass + '-image-wrap-div' },
				React.createElement('img', {
					className: avatarClass + '-avatar-img avatar',
					src: avatarUrl,
					height: avatarHeight,
					width: avatarWidth,
					alt: avatarAltText
				})
			) : null;
		}
	}]);

	return AvatarImage;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Component"]);
AvatarImage.propTypes = {
	avatarUrl: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
	avatarClass: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
	avatarHeight: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,
	avatarWidth: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,
	avatarAltText: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string
};
AvatarImage.defaultProps = {
	avatarUrl: '',
	avatarClass: 'contact',
	avatarHeight: 32,
	avatarWidth: 32,
	avatarAltText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('user avatar', 'event_espresso')
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/components/ui/image/index.js":
/*!*************************************************!*\
  !*** ./assets/src/components/ui/image/index.js ***!
  \*************************************************/
/*! exports provided: AvatarImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avatar */ "./assets/src/components/ui/image/avatar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AvatarImage", function() { return _avatar__WEBPACK_IMPORTED_MODULE_0__["AvatarImage"]; });



/***/ }),

/***/ "./assets/src/components/ui/index.js":
/*!*******************************************!*\
  !*** ./assets/src/components/ui/index.js ***!
  \*******************************************/
/*! exports provided: AvatarImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image */ "./assets/src/components/ui/image/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AvatarImage", function() { return _image__WEBPACK_IMPORTED_MODULE_0__["AvatarImage"]; });



/***/ }),

/***/ "./assets/src/data/model/base.js":
/*!***************************************!*\
  !*** ./assets/src/data/model/base.js ***!
  \***************************************/
/*! exports provided: QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return QUERY_ORDER_ASC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return QUERY_ORDER_DESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return ALLOWED_ORDER_VALUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN", function() { return GREATER_THAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN", function() { return LESS_THAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN_AND_EQUAL", function() { return GREATER_THAN_AND_EQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN_AND_EQUAL", function() { return LESS_THAN_AND_EQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! querystringify */ "./node_modules/querystringify/index.js");
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(querystringify__WEBPACK_IMPORTED_MODULE_1__);



var QUERY_ORDER_ASC = 'ASC';
var QUERY_ORDER_DESC = 'DESC';
var ALLOWED_ORDER_VALUES = ['asc', 'desc', 'ASC', 'DESC'];
var GREATER_THAN = encodeURIComponent('>');
var LESS_THAN = encodeURIComponent('<');
var GREATER_THAN_AND_EQUAL = encodeURIComponent('>=');
var LESS_THAN_AND_EQUAL = encodeURIComponent('<=');

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @param { function } whereConditions  A function for prepping the where
 * 										conditions from the queryData.
 * @param { function } mapOrderBy		A function for mapping incoming order_by
 * 										strings to the value needed for the
 * 										query_string.
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var whereConditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
		return null;
	};
	var mapOrderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (orderBy) {
		return orderBy;
	};

	var where = whereConditions(queryData);
	var limit = queryData.limit,
	    order = queryData.order,
	    orderBy = queryData.orderBy;

	var queryArgs = {
		limit: limit,
		order: order,
		order_by: mapOrderBy(orderBy)
	};
	var queryString = Object(querystringify__WEBPACK_IMPORTED_MODULE_1__["stringify"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["pickBy"])(queryArgs, function (value) {
		return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value);
	}));
	if (where) {
		queryString += '&' + where;
	}
	return queryString;
};

/***/ }),

/***/ "./assets/src/data/model/datetime/index.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/datetime/index.js ***!
  \*************************************************/
/*! exports provided: nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return nowDateAndTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External imports
 */






var nowDateAndTime = moment__WEBPACK_IMPORTED_MODULE_1___default()();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['DTT_name', 'DTT_ID', 'start_date', 'end_date']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"]),
		showExpired: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
		month: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.month
	})
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"],
		showExpired: false
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an event.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		start_date: 'DTT_EVT_start',
		end_date: 'DTT_EVT_end'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {number} forEventId  ID for Event to retrieve datetimes from
 * @param {boolean} showExpired  Whether or not to include expired events.
 * @param {string} month         Return events for the given month.  Can be any
 *                                 in any month format recognized by moment.
 * @return {string}             The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$forEventId = _ref.forEventId,
	    forEventId = _ref$forEventId === undefined ? 0 : _ref$forEventId,
	    _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? false : _ref$showExpired,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];
	if (!showExpired) {
		where.push('where[DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
	}
	if (month && month !== 'none') {
		where.push('where[DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[DTT_EVT_start][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN"] + '&where[DTT_EVT_end][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
	}
	if (parseInt(forEventId, 10) !== 0) {
		where.push('where[Event.EVT_ID]=' + forEventId);
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/default-model-state.js":
/*!******************************************************!*\
  !*** ./assets/src/data/model/default-model-state.js ***!
  \******************************************************/
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return DEFAULT_LISTS_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return DEFAULT_CORE_STATE; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./endpoints.js */ "./assets/src/data/model/endpoints.js");

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


/**
 * Receives an object map of modelName to endpoint and maps that to a default
 * map of modelName to empty array.
 *
 * @param { Object } modelNameEndpoints
 * @return { Object } An object of { { modelName } : [] }
 */
var mapToArrayValues = function mapToArrayValues(modelNameEndpoints) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["mapValues"])(modelNameEndpoints, function () {
    return [];
  });
};

/**
 * Receives an object map of modelName to endpoint and maps that to a default
 * map of modelName to empty object.
 *
 * @param { Object } modelNameEndpoints
 * @return { Object } An object of { { modelName } : {} }
 */
var mapToObjectValues = function mapToObjectValues(modelNameEndpoints) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["mapValues"])(modelNameEndpoints, function () {
    return {};
  });
};

/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */
var DEFAULT_LISTS_STATE = mapToArrayValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_2__["endpoints"]);

/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */
var DEFAULT_CORE_STATE = {
  entities: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_2__["endpoints"])),
  entityIds: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, DEFAULT_LISTS_STATE),
  dirty: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, DEFAULT_LISTS_STATE)
};

/***/ }),

/***/ "./assets/src/data/model/endpoints.js":
/*!********************************************!*\
  !*** ./assets/src/data/model/endpoints.js ***!
  \********************************************/
/*! exports provided: endpoints, getEndpoint, applyQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return endpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return getEndpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return applyQueryString; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/validators.js");
/**
 * External imports
 */


/**
 * Internal imports
 */


/**
 * All available endpoints exposed via the eejs.data global from the server.
 *
 * @type {{}}
 */
var _data$paths$collectio = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].paths.collection_endpoints,
    endpoints = _data$paths$collectio === undefined ? {} : _data$paths$collectio;

/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {Exception}
 */


var getEndpoint = function getEndpoint(modelName) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_1__["validateEntityHasKey"])(modelName, endpoints);
  return endpoints[modelName];
};

/**
 * Applies the provided queryString to the endpoint for the provided model name.
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */
var applyQueryString = function applyQueryString(modelName, queryString) {
  return getEndpoint(modelName) + '?' + queryString;
};

/***/ }),

/***/ "./assets/src/data/model/event/index.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/event/index.js ***!
  \**********************************************/
/*! exports provided: nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return nowDateAndTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External dependencies
 */




/**
 * Internal imports
 */


var nowDateAndTime = moment__WEBPACK_IMPORTED_MODULE_1___default()();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['EVT_name', 'EVT_ID', 'start_date', 'end_date', 'ticket_start', 'ticket_end']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"]),
		showExpired: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
		categorySlug: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
		month: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.month
	})
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"],
		showExpired: false
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an event.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		start_date: 'Datetime.DTT_EVT_start',
		end_date: 'Datetime.DTT_EVT_end',
		ticket_start: 'Datetime.Ticket.TKT_start_date',
		ticket_end: 'Datetime.Ticket.TKT_end_date'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired  Whether or not to include expired events.
 * @param {string} categorySlug  Return events for the given categorySlug
 * @param {string} month         Return events for the given month.
 * 								 Can be any month format recognized by moment.
 * @return {string}              The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? false : _ref$showExpired,
	    categorySlug = _ref.categorySlug,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];

	if (!showExpired) {
		where.push('where[Datetime.DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[Datetime.DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
	}
	if (categorySlug) {
		where.push('where[Term_Relationship.Term_Taxonomy.Term.slug]=' + categorySlug);
	}
	if (month && month !== 'none') {
		where.push('where[Datetime.DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[Datetime.DTT_EVT_start][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[Datetime.DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN"] + '&where[Datetime.DTT_EVT_end][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/index.js":
/*!****************************************!*\
  !*** ./assets/src/data/model/index.js ***!
  \****************************************/
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, endpoints, getEndpoint, applyQueryString, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, validateEntityHasKey, validateIsArray, validateIsNotEmpty, MODEL_NAMES, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_model_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-model-state */ "./assets/src/data/model/default-model-state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_LISTS_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CORE_STATE"]; });

/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoints */ "./assets/src/data/model/endpoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["endpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["getEndpoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["applyQueryString"]; });

/* harmony import */ var _primary_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primary-keys */ "./assets/src/data/model/primary-keys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["primaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["valuesForCombinedPrimaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["valueForPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getEntityPrimaryKeyValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["keyEntitiesByPrimaryKeyValue"]; });

/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/validators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateEntityHasKey", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["validateEntityHasKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateIsArray", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["validateIsArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateIsNotEmpty", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["validateIsNotEmpty"]; });

/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model-names */ "./assets/src/data/model/model-names.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _model_names__WEBPACK_IMPORTED_MODULE_4__["MODEL_NAMES"]; });

/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base */ "./assets/src/data/model/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["QUERY_ORDER_ASC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["QUERY_ORDER_DESC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["ALLOWED_ORDER_VALUES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["GREATER_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["LESS_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["GREATER_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["LESS_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["getQueryString"]; });








/***/ }),

/***/ "./assets/src/data/model/model-names.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/model-names.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony import */ var _primary_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primary-keys.js */ "./assets/src/data/model/primary-keys.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Internal imports
 */


/**
 * External imports
 */


/**
 * Returns an array of model names currently exposed for REST API request.
 */
var MODEL_NAMES = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["keys"])(_primary_keys_js__WEBPACK_IMPORTED_MODULE_0__["primaryKeys"]);

/***/ }),

/***/ "./assets/src/data/model/primary-keys.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/primary-keys.js ***!
  \***********************************************/
/*! exports provided: primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return primaryKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return valuesForCombinedPrimaryKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return valueForPrimaryKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return getPrimaryKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return getEntityPrimaryKeyValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return keyEntitiesByPrimaryKeyValue; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/validators.js");
/**
 * External imports
 */





/**
 * Internal imports
 */


/**
 * Exposes a map of modelname to primary key exposed by the eejs.data global
 * via the server.
 *
 * @type {{}}
 */
var _data$paths$primary_k = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].paths.primary_keys,
    primaryKeys = _data$paths$primary_k === undefined ? {} : _data$paths$primary_k;

/**
 * Returns the values for the given keys from the provided entity.
 * This function would be used for models that have combined primary keys
 * (delivered as an array).
 *
 * @type { memoized }
 * @return { string } The string representation for the values.
 * @throws { Exception }
 */


var valuesForCombinedPrimaryKeys = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (keys, entity) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateIsArray"])(keys);
  var primaryKey = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["reduce"])(keys, function (result, key) {
    Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateEntityHasKey"])(key, entity);
    return entity[result] + ':' + entity[key];
  });
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["trimEnd"])(primaryKey, ':');
});

/**
 * Returns the value for the given key from the provided entity.
 * This function would be used for models that have only one primary key.
 *
 * @type {memoized}
 * @return { number } The value for the key in the provided entity.
 * @throws { Exception }
 */
var valueForPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (key, entity) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateEntityHasKey"])(key, entity);
  return entity[key];
});

/**
 * Returns the primary key (or combined primary keys) from the available data.
 *
 * @type {memoized}
 * @return { string|Array }
 * @throws { Exception }
 */
var getPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateEntityHasKey"])(modelName, primaryKeys);
  return primaryKeys[modelName];
});

/**
 * Returns the values for the primary keys from the provided entity.
 *
 * @type {memoized}
 * @return { string }  If the model has only one primary key then the value will
 * be a simple string.  If the model has combined primary keys, then the value
 * will be as string in the format `%s.%s` for the primary key values.
 * @throws { Exception }
 */
var getEntityPrimaryKeyValues = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName, entity) {
  var keys = getPrimaryKey(modelName);
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isArray"])(keys) ? valuesForCombinedPrimaryKeys(keys, entity) : valueForPrimaryKey(keys, entity);
});

/**
 * This receives an array of entities and returns a collection of those same
 * entities indexed by the primary key value for each entity.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {*}  A collection indexed by the primary key values for each entity.
 * @throws { Exception }
 */
var keyEntitiesByPrimaryKeyValue = function keyEntitiesByPrimaryKeyValue(modelName) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateIsNotEmpty"])(entities, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided array of entities must not be empty', 'event_espresso'));
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateIsArray"])(entities);
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["keyBy"])(entities, function (entity) {
    return String(getEntityPrimaryKeyValues(modelName, entity));
  });
};

/***/ }),

/***/ "./assets/src/data/model/ticket/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/ticket/index.js ***!
  \***********************************************/
/*! exports provided: nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return nowDateAndTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External imports
 */






var nowDateAndTime = moment__WEBPACK_IMPORTED_MODULE_1___default()();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['TKT_name', 'TKT_ID', 'start_date', 'end_date']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"]),
		showExpired: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
		month: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.month
	})
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"],
		showExpired: false
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of a ticket.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		start_date: 'TKT_start_date',
		end_date: 'TKT_end_date'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an tickets endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired 	Whether or not to include expired tickets.
 * @param {string} month            Return tickets for the given month. Can be
 *                                	in any month format recognized by moment
 * @param {number} forEventId    	ID of Event to retrieve tickets for
 * @param {number} forDatetimeId    ID of Datetime to retrieve tickets for
 * @return {string}                	The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$forEventId = _ref.forEventId,
	    forEventId = _ref$forEventId === undefined ? 0 : _ref$forEventId,
	    _ref$forDatetimeId = _ref.forDatetimeId,
	    forDatetimeId = _ref$forDatetimeId === undefined ? 0 : _ref$forDatetimeId,
	    _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? false : _ref$showExpired,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];
	var GREATER_AND_EQUAL = encodeURIComponent('>=');
	var LESS_AND_EQUAL = encodeURIComponent('<=');

	if (!showExpired) {
		where.push('where[TKT_end_date**expired][]=>' + '&where[TKT_end_date**expired][]=' + nowDateAndTime.local().format());
	}
	if (month && month !== 'none') {
		where.push('where[TKT_start_date][]=' + GREATER_AND_EQUAL + '&where[TKT_start_date][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[TKT_end_date][]=' + LESS_AND_EQUAL + '&where[TKT_end_date][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
	}
	forEventId = parseInt(forEventId, 10);
	if (forEventId !== 0 && !isNaN(forEventId)) {
		where.push('where[Datetime.Event.EVT_ID]=' + forEventId);
	}
	forDatetimeId = parseInt(forDatetimeId, 10);
	if (forDatetimeId !== 0 && !isNaN(forDatetimeId)) {
		where.push('where[Datetime.DTT_ID]=' + forDatetimeId);
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/validators.js":
/*!*********************************************!*\
  !*** ./assets/src/data/model/validators.js ***!
  \*********************************************/
/*! exports provided: validateEntityHasKey, validateIsArray, validateIsNotEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEntityHasKey", function() { return validateEntityHasKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateIsArray", function() { return validateIsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateIsNotEmpty", function() { return validateIsNotEmpty; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports
 */




/**
 * Validates whether the given key exists in the provided entity object.
 * This is used when calling code wants an exception to be thrown.
 *
 * @param { string } key
 * @param { Object } entity
 * @param { string } message
 * @throws { Exception }  Throws an exception if the provided entity does not
 *                          have the given key.
 */
var validateEntityHasKey = function validateEntityHasKey(key, entity) {
	var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	if (message === '') {
		message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided entity (%s) does not have the given property (%s)', 'event_espresso'), entity, key);
	}
	if (!entity.hasOwnProperty(key)) {
		throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
	}
};

/**
 * Validates whether the given value is an array.
 *
 * @param {*} items
 * @param { string }  message
 * @throws { Exception } Throws an exception if the provided value is not an
 *                          array.
 */
var validateIsArray = function validateIsArray(items) {
	var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	if (message === '') {
		message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided value is not an array.', 'event_espresso');
	}
	if (!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isArray"])(items)) {
		throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
	}
};

/**
 * Validates whether the given value is empty or not.
 *
 * Call this validator when you want to make sure the value is NOT empty.
 *
 * @param {*} items
 * @param { string } message
 * @throws { Exception } Throws an exception if the provided value is empty.
 */
var validateIsNotEmpty = function validateIsNotEmpty(items) {
	var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	if (message === '') {
		message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided items must not be empty', 'event_espresso');
	}
	if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(items)) {
		throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
	}
};

/***/ }),

/***/ "./node_modules/@emotion/hash/dist/index.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/index.es.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash2_32_gc(str) {
  var l = str.length,
      h = l ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return (h >>> 0).toString(36);
}

/* harmony default export */ __webpack_exports__["default"] = (murmurhash2_32_gc);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/index.es.js":
/*!********************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/index.es.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/@emotion/stylis/dist/index.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/@emotion/stylis/dist/index.es.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var V = function ca(W) {
  function M(d, c, f, h, a) {
    for (var k = 0, b = 0, u = 0, l = 0, q, m, e, D = 0, y = 0, r, E = r = q = 0, n = 0, J = m = 0, t = 0, K = f.length, F = K - 1, w, g = "", p = "", G = "", H = "", A; n < K;) {
      e = f.charCodeAt(n);
      n === F && 0 !== b + l + u + k && (0 !== b && (e = 47 === b ? 10 : 47), l = u = k = 0, K++, F++);

      if (0 === b + l + u + k) {
        if (n === F && (0 < m && (g = g.replace(N, "")), 0 < g.trim().length)) {
          switch (e) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              g += f.charAt(n);
          }

          e = 59;
        }

        switch (e) {
          case 123:
            g = g.trim();
            q = g.charCodeAt(0);
            r = 1;

            for (t = ++n; n < K;) {
              e = f.charCodeAt(n);

              switch (e) {
                case 123:
                  r++;
                  break;

                case 125:
                  r--;
              }

              if (0 === r) break;
              n++;
            }

            e = f.substring(t, n);
            0 === q && (q = (g = g.replace(da, "").trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < m && (g = g.replace(N, ""));
                m = g.charCodeAt(1);

                switch (m) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                e = M(c, r, e, m, a + 1);
                t = e.length;
                0 < z && (r = X(O, g, J), A = I(3, e, r, c, B, x, t, m, a, h), g = r.join(""), void 0 !== A && 0 === (t = (e = A.trim()).length) && (m = 0, e = ""));
                if (0 < t) switch (m) {
                  case 115:
                    g = g.replace(ea, fa);

                  case 100:
                  case 109:
                  case 45:
                    e = g + "{" + e + "}";
                    break;

                  case 107:
                    g = g.replace(ha, "$1 $2");
                    e = g + "{" + e + "}";
                    e = 1 === v || 2 === v && L("@" + e, 3) ? "@-webkit-" + e + "@" + e : "@" + e;
                    break;

                  default:
                    e = g + e, 112 === h && (e = (p += e, ""));
                } else e = "";
                break;

              default:
                e = M(c, X(c, g, J), e, h, a + 1);
            }

            G += e;
            r = J = m = E = q = 0;
            g = "";
            e = f.charCodeAt(++n);
            break;

          case 125:
          case 59:
            g = (0 < m ? g.replace(N, "") : g).trim();
            if (1 < (t = g.length)) switch (0 === E && (q = g.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (g = g.replace(" ", ":")).length), 0 < z && void 0 !== (A = I(1, g, c, d, B, x, p.length, h, a, h)) && 0 === (t = (g = A.trim()).length) && (g = "\x00\x00"), q = g.charCodeAt(0), m = g.charCodeAt(1), q + m) {
              case 0:
                break;

              case 169:
              case 163:
                H += g + f.charAt(n);
                break;

              default:
                58 !== g.charCodeAt(t - 1) && (p += P(g, q, m, g.charCodeAt(2)));
            }
            J = m = E = q = 0;
            g = "";
            e = f.charCodeAt(++n);
        }
      }

      switch (e) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && (m = 1, g += "\x00");
          0 < z * Y && I(0, g, c, d, B, x, p.length, h, a, h);
          x = 1;
          B++;
          break;

        case 59:
        case 125:
          if (0 === b + l + u + k) {
            x++;
            break;
          }

        default:
          x++;
          w = f.charAt(n);

          switch (e) {
            case 9:
            case 32:
              if (0 === l + k + b) switch (D) {
                case 44:
                case 58:
                case 9:
                case 32:
                  w = "";
                  break;

                default:
                  32 !== e && (w = " ");
              }
              break;

            case 0:
              w = "\\0";
              break;

            case 12:
              w = "\\f";
              break;

            case 11:
              w = "\\v";
              break;

            case 38:
              0 === l + b + k && (m = J = 1, w = "\f" + w);
              break;

            case 108:
              if (0 === l + b + k + C && 0 < E) switch (n - E) {
                case 2:
                  112 === D && 58 === f.charCodeAt(n - 3) && (C = D);

                case 8:
                  111 === y && (C = y);
              }
              break;

            case 58:
              0 === l + b + k && (E = n);
              break;

            case 44:
              0 === b + u + l + k && (m = 1, w += "\r");
              break;

            case 34:
            case 39:
              0 === b && (l = l === e ? 0 : 0 === l ? e : l);
              break;

            case 91:
              0 === l + b + u && k++;
              break;

            case 93:
              0 === l + b + u && k--;
              break;

            case 41:
              0 === l + b + k && u--;
              break;

            case 40:
              if (0 === l + b + k) {
                if (0 === q) switch (2 * D + 3 * y) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                u++;
              }

              break;

            case 64:
              0 === b + u + l + k + E + r && (r = 1);
              break;

            case 42:
            case 47:
              if (!(0 < l + k + u)) switch (b) {
                case 0:
                  switch (2 * e + 3 * f.charCodeAt(n + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = n, b = 42;
                  }

                  break;

                case 42:
                  47 === e && 42 === D && (33 === f.charCodeAt(t + 2) && (p += f.substring(t, n + 1)), w = "", b = 0);
              }
          }

          0 === b && (g += w);
      }

      y = D;
      D = e;
      n++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < z && (A = I(2, p, r, d, B, x, t, h, a, h), void 0 !== A && 0 === (p = A).length)) return H + p + G;
      p = r.join(",") + "{" + p + "}";

      if (0 !== v * C) {
        2 !== v || L(p, 2) || (C = 0);

        switch (C) {
          case 111:
            p = p.replace(ia, ":-moz-$1") + p;
            break;

          case 112:
            p = p.replace(Q, "::-webkit-input-$1") + p.replace(Q, "::-moz-$1") + p.replace(Q, ":-ms-input-$1") + p;
        }

        C = 0;
      }
    }

    return H + p + G;
  }

  function X(d, c, f) {
    var h = c.trim().split(ja);
    c = h;
    var a = h.length,
        k = d.length;

    switch (k) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === k ? "" : d[0] + " "; b < a; ++b) {
          c[b] = Z(d, c[b], f, k).trim();
        }

        break;

      default:
        var u = b = 0;

        for (c = []; b < a; ++b) {
          for (var l = 0; l < k; ++l) {
            c[u++] = Z(d[l] + " ", h[b], f, k).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, f) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, "$1" + d.trim());

      case 58:
        switch (c.charCodeAt(1)) {
          case 103:
            break;

          default:
            return d.trim() + c.replace(F, "$1" + d.trim());
        }

      default:
        if (0 < 1 * f && 0 < c.indexOf("\f")) return c.replace(F, (58 === d.charCodeAt(0) ? "" : "$1") + d.trim());
    }

    return d + c;
  }

  function P(d, c, f, h) {
    var a = d + ";",
        k = 2 * c + 3 * f + 4 * h;

    if (944 === k) {
      d = a.indexOf(":", 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ";";
      return 1 === v || 2 === v && L(b, 1) ? "-webkit-" + b + b : b;
    }

    if (0 === v || 2 === v && !L(a, 1)) return a;

    switch (k) {
      case 1015:
        return 97 === a.charCodeAt(10) ? "-webkit-" + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? "-webkit-" + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? "-webkit-" + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return "-webkit-" + a + a;

      case 978:
        return "-webkit-" + a + "-moz-" + a + a;

      case 1019:
      case 983:
        return "-webkit-" + a + "-moz-" + a + "-ms-" + a + a;

      case 883:
        return 45 === a.charCodeAt(8) ? "-webkit-" + a + a : a;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return "-webkit-box-" + a.replace("-grow", "") + "-webkit-" + a + "-ms-" + a.replace("grow", "positive") + a;

          case 115:
            return "-webkit-" + a + "-ms-" + a.replace("shrink", "negative") + a;

          case 98:
            return "-webkit-" + a + "-ms-" + a.replace("basis", "preferred-size") + a;
        }
        return "-webkit-" + a + "-ms-" + a + a;

      case 964:
        return "-webkit-" + a + "-ms-flex-" + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
        return "-webkit-box-pack" + b + "-webkit-" + a + "-ms-flex-pack" + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ":-webkit-") + a.replace(aa, ":-moz-") + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf("-") + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, "tb");
            break;

          case 232:
            b = a.replace(G, "tb-rl");
            break;

          case 220:
            b = a.replace(G, "lr");
            break;

          default:
            return a;
        }

        return "-webkit-" + a + "-ms-" + b + a;

      case 1017:
        if (-1 === a.indexOf("sticky", 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(":", 7) + 1).trim();

        switch (k = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, "-webkit-" + b) + ";" + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, "-webkit-" + (102 < k ? "inline-" : "") + "box") + ";" + a.replace(b, "-webkit-" + b) + ";" + a.replace(b, "-ms-" + b + "box") + ";" + a;
        }

        return a + ";";

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace("-items", ""), "-webkit-" + a + "-webkit-box-" + b + "-ms-flex-" + b + a;

          case 115:
            return "-webkit-" + a + "-ms-flex-item-" + a.replace(ba, "") + a;

          default:
            return "-webkit-" + a + "-ms-flex-line-pack" + a.replace("align-content", "").replace(ba, "") + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(":") + 1)).charCodeAt(0) ? P(d.replace("stretch", "fill-available"), c, f, h).replace(":fill-available", ":stretch") : a.replace(b, "-webkit-" + b) + a.replace(b, "-moz-" + b.replace("fill-", "")) + a;
        break;

      case 962:
        if (a = "-webkit-" + a + (102 === a.charCodeAt(5) ? "-ms-" + a : "") + a, 211 === f + h && 105 === a.charCodeAt(13) && 0 < a.indexOf("transform", 10)) return a.substring(0, a.indexOf(";", 27) + 1).replace(ma, "$1-webkit-$2") + a;
    }

    return a;
  }

  function L(d, c) {
    var f = d.indexOf(1 === c ? ":" : "{"),
        h = d.substring(0, 3 !== c ? f : 10);
    f = d.substring(f + 1, d.length - 1);
    return H(2 !== c ? h : h.replace(na, "$1"), f, c);
  }

  function fa(d, c) {
    var f = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return f !== c + ";" ? f.replace(oa, " or ($1)").substring(4) : "(" + c + ")";
  }

  function I(d, c, f, h, a, k, b, u, l, q) {
    for (var m = 0, e = c, v; m < z; ++m) {
      switch (v = R[m].call(y, d, e, f, h, a, k, b, u, l, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          e = v;
      }
    }

    if (e !== c) return e;
  }

  function S(d) {
    switch (d) {
      case void 0:
      case null:
        z = R.length = 0;
        break;

      default:
        switch (d.constructor) {
          case Array:
            for (var c = 0, f = d.length; c < f; ++c) {
              S(d[c]);
            }

            break;

          case Function:
            R[z++] = d;
            break;

          case Boolean:
            Y = !!d | 0;
        }

    }

    return S;
  }

  function T(d) {
    d = d.prefix;
    void 0 !== d && (H = null, d ? "function" !== typeof d ? v = 1 : (v = 2, H = d) : v = 0);
    return T;
  }

  function y(d, c) {
    if (void 0 !== this && this.constructor === y) return ca(d);
    var f = d;
    33 > f.charCodeAt(0) && (f = f.trim());
    U = f;
    f = [U];

    if (0 < z) {
      var h = I(-1, c, f, f, B, x, 0, 0, 0, 0);
      void 0 !== h && "string" === typeof h && (c = h);
    }

    var a = M(O, f, c, 0, 0);
    0 < z && (h = I(-2, a, f, f, B, x, a.length, 0, 0, 0), void 0 !== h && (a = h));
    U = "";
    C = 0;
    x = B = 1;
    return a;
  }

  var da = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ja = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      ha = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ia = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      ea = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      x = 1,
      B = 1,
      C = 0,
      v = 1,
      O = [],
      R = [],
      z = 0,
      H = null,
      Y = 0,
      U = "";
  y.use = S;
  y.set = T;
  void 0 !== W && T(W);
  return y;
};

/* harmony default export */ __webpack_exports__["default"] = (V);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/index.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/index.es.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var index = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/assign.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ "./node_modules/core-js/library/fn/object/assign.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/create.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ "./node_modules/core-js/library/fn/object/create.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js":
/*!**********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/define-property.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/core-js/library/fn/object/define-property.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/get-prototype-of.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "./node_modules/core-js/library/fn/object/get-prototype-of.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/set-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/set-prototype-of.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "./node_modules/core-js/library/fn/object/set-prototype-of.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/symbol.js":
/*!******************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/symbol.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ "./node_modules/core-js/library/fn/symbol/index.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/symbol/iterator.js":
/*!***************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/symbol/iterator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "./node_modules/core-js/library/fn/symbol/iterator.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/classCallCheck.js":
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/classCallCheck.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/createClass.js":
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/createClass.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/extends.js":
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/extends.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(/*! ../core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
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

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/inherits.js":
/*!********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/inherits.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/babel-runtime/core-js/object/set-prototype-of.js");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(/*! ../core-js/object/create */ "./node_modules/babel-runtime/core-js/object/create.js");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js":
/*!*************************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/typeof.js":
/*!******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/typeof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/babel-runtime/core-js/symbol/iterator.js");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/babel-runtime/core-js/symbol.js");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/core-js/library/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/create.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.create */ "./node_modules/core-js/library/modules/es6.object.create.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/set-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ "./node_modules/core-js/library/modules/es6.object.set-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;


/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__(/*! ../../modules/es6.object.to-string */ "./node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es7.symbol.observable */ "./node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "./node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_cof.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_html.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_library.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-proto.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_uid.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/library/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.create.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/library/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/library/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/library/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/library/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/library/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "./node_modules/create-emotion/dist/index.es.js":
/*!******************************************************!*\
  !*** ./node_modules/create-emotion/dist/index.es.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/index.es.js");
/* harmony import */ var _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/stylis */ "./node_modules/@emotion/stylis/dist/index.es.js");
/* harmony import */ var stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! stylis-rule-sheet */ "./node_modules/stylis-rule-sheet/index.js");
/* harmony import */ var stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/index.es.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/index.es.js");






var hyphenateRegex = /[A-Z]|^ms/g;
var processStyleName = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (styleName) {
  return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});
var processStyleValue = function processStyleValue(key, value) {
  if (value == null || typeof value === 'boolean') {
    return '';
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_4__["default"][key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
  !isNaN(value) && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    return oldProcessStyleValue(key, value);
  };
}

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'function':
        toAdd = classnames([arg()]);
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};
var isBrowser = typeof document !== 'undefined';

/*

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side

// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function makeStyleTag(opts) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', opts.key || '');

  if (opts.nonce !== undefined) {
    tag.setAttribute('nonce', opts.nonce);
  }

  tag.appendChild(document.createTextNode('')) // $FlowFixMe
  ;
  (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
  return tag;
}

function _StyleSheet(options) {
  this.isSpeedy = "development" === 'production'; // the big drawback here is that the css won't be editable in devtools

  this.tags = [];
  this.ctr = 0;
  this.opts = options;
}

function _inject() {
  if (this.injected) {
    throw new Error('already injected!');
  }

  this.tags[0] = makeStyleTag(this.opts);
  this.injected = true;
}

function _speedy(bool) {
  if (this.ctr !== 0) {
    // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
    throw new Error("cannot change speedy now");
  }

  this.isSpeedy = !!bool;
}

function _insert(rule, sourceMap) {
  // this is the ultrafast version, works across browsers
  if (this.isSpeedy) {
    var tag = this.tags[this.tags.length - 1];
    var sheet = sheetForTag(tag);

    try {
      sheet.insertRule(rule, sheet.cssRules.length);
    } catch (e) {
      if (true) {
        console.warn('illegal rule', rule); // eslint-disable-line no-console
      }
    }
  } else {
    var _tag = makeStyleTag(this.opts);

    this.tags.push(_tag);

    _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
  }

  this.ctr++;

  if (this.ctr % 65000 === 0) {
    this.tags.push(makeStyleTag(this.opts));
  }
}

function _ref(tag) {
  return tag.parentNode.removeChild(tag);
}

function _flush() {
  // $FlowFixMe
  this.tags.forEach(_ref);
  this.tags = [];
  this.ctr = 0; // todo - look for remnants in document.styleSheets

  this.injected = false;
}

var StyleSheet =
/*#__PURE__*/
function () {
  var _proto = _StyleSheet.prototype;
  _proto.inject = _inject;
  _proto.speedy = _speedy;
  _proto.insert = _insert;
  _proto.flush = _flush;
  return _StyleSheet;
}();

function createEmotion(context, options) {
  if (context.__SECRET_EMOTION__ !== undefined) {
    return context.__SECRET_EMOTION__;
  }

  if (options === undefined) options = {};
  var key = options.key || 'css';

  if (true) {
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var current;

  function insertRule(rule) {
    current += rule;

    if (isBrowser) {
      sheet.insert(rule, currentSourceMap);
    }
  }

  var insertionPlugin = stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_2___default()(insertRule);
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var caches = {
    registered: {},
    inserted: {},
    nonce: options.nonce,
    key: key
  };
  var sheet = new StyleSheet(options);

  if (isBrowser) {
    // 🚀
    sheet.inject();
  }

  var stylis = new _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__["default"](stylisOptions);
  stylis.use(options.stylisPlugins)(insertionPlugin);
  var currentSourceMap = '';

  function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
    if (interpolation == null) {
      return '';
    }

    switch (typeof interpolation) {
      case 'boolean':
        return '';

      case 'function':
        if (interpolation.__emotion_styles !== undefined) {
          var selector = interpolation.toString();

          if (selector === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
          }

          return selector;
        }

        return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
        interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

      case 'object':
        return createStringFromObject.call(this, interpolation);

      default:
        var cached = caches.registered[interpolation];
        return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
    }
  }

  var objectToStringCache = new WeakMap();

  function createStringFromObject(obj) {
    if (objectToStringCache.has(obj)) {
      // $FlowFixMe
      return objectToStringCache.get(obj);
    }

    var string = '';

    function _ref(interpolation) {
      string += handleInterpolation.call(this, interpolation, false);
    }

    function _ref3(key) {
      function _ref2(value) {
        string += processStyleName(key) + ":" + processStyleValue(key, value) + ";";
      }

      if (typeof obj[key] !== 'object') {
        if (caches.registered[obj[key]] !== undefined) {
          string += key + "{" + caches.registered[obj[key]] + "}";
        } else {
          string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
        }
      } else {
        if (key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(obj[key]) && typeof obj[key][0] === 'string' && caches.registered[obj[key][0]] === undefined) {
          obj[key].forEach(_ref2);
        } else {
          string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
        }
      }
    }

    if (Array.isArray(obj)) {
      obj.forEach(_ref, this);
    } else {
      Object.keys(obj).forEach(_ref3, this);
    }

    objectToStringCache.set(obj, string);
    return string;
  }

  var name;
  var stylesWithLabel;
  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

  var createStyles = function createStyles(strings) {
    var stringMode = true;
    var styles = '';
    var identifierName = '';

    if (strings == null || strings.raw === undefined) {
      stringMode = false;
      styles += handleInterpolation.call(this, strings, false);
    } else {
      styles += strings[0];
    }

    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    interpolations.forEach(function (interpolation, i) {
      styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
      );

      if (stringMode === true && strings[i + 1] !== undefined) {
        styles += strings[i + 1];
      }
    }, this);
    stylesWithLabel = styles;
    styles = styles.replace(labelPattern, function (match, p1) {
      identifierName += "-" + p1;
      return '';
    });
    name = Object(_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles + identifierName) + identifierName;
    return styles;
  };

  if (true) {
    var sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
    var oldStylis = stylis;

    stylis = function stylis(selector, styles) {
      var result = sourceMapRegEx.exec(styles);
      currentSourceMap = result ? result[0] : '';
      oldStylis(selector, styles);
      currentSourceMap = '';
    };
  }

  function insert(scope, styles) {
    if (caches.inserted[name] === undefined) {
      current = '';
      stylis(scope, styles);
      caches.inserted[name] = current;
    }
  }

  var css = function css() {
    var styles = createStyles.apply(this, arguments);
    var selector = key + "-" + name;

    if (caches.registered[selector] === undefined) {
      caches.registered[selector] = stylesWithLabel;
    }

    insert("." + selector, styles);
    return selector;
  };

  var keyframes = function keyframes() {
    var styles = createStyles.apply(this, arguments);
    var animation = "animation-" + name;
    insert('', "@keyframes " + animation + "{" + styles + "}");
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    var styles = createStyles.apply(this, arguments);
    insert('', styles);
  };

  function getRegisteredStyles(registeredStyles, classNames) {
    var rawClassName = '';
    classNames.split(' ').forEach(function (className) {
      if (caches.registered[className] !== undefined) {
        registeredStyles.push(className);
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }

  function merge(className, sourceMap) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registeredStyles, className);

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles, sourceMap);
  }

  function cx() {
    for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      classNames[_key2] = arguments[_key2];
    }

    return merge(classnames(classNames));
  }

  function hydrateSingleId(id) {
    caches.inserted[id] = true;
  }

  function hydrate(ids) {
    ids.forEach(hydrateSingleId);
  }

  function flush() {
    if (isBrowser) {
      sheet.flush();
      sheet.inject();
    }

    caches.inserted = {};
    caches.registered = {};
  }

  function _ref4(node) {
    // $FlowFixMe
    sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

    node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
  }

  if (isBrowser) {
    var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
    Array.prototype.forEach.call(chunks, _ref4);
  }

  var emotion = {
    flush: flush,
    hydrate: hydrate,
    cx: cx,
    merge: merge,
    getRegisteredStyles: getRegisteredStyles,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    css: css,
    sheet: sheet,
    caches: caches
  };
  context.__SECRET_EMOTION__ = emotion;
  return emotion;
}

/* harmony default export */ __webpack_exports__["default"] = (createEmotion);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/emotion/dist/index.es.js":
/*!***********************************************!*\
  !*** ./node_modules/emotion/dist/index.es.js ***!
  \***********************************************/
/*! exports provided: flush, hydrate, cx, merge, getRegisteredStyles, injectGlobal, keyframes, css, sheet, caches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return hydrate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cx", function() { return cx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return getRegisteredStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return injectGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sheet", function() { return sheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caches", function() { return caches; });
/* harmony import */ var create_emotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! create-emotion */ "./node_modules/create-emotion/dist/index.es.js");


var context = typeof global !== 'undefined' ? global : {};

var _createEmotion = Object(create_emotion__WEBPACK_IMPORTED_MODULE_0__["default"])(context);
var flush = _createEmotion.flush;
var hydrate = _createEmotion.hydrate;
var cx = _createEmotion.cx;
var merge = _createEmotion.merge;
var getRegisteredStyles = _createEmotion.getRegisteredStyles;
var injectGlobal = _createEmotion.injectGlobal;
var keyframes = _createEmotion.keyframes;
var css = _createEmotion.css;
var sheet = _createEmotion.sheet;
var caches = _createEmotion.caches;


//# sourceMappingURL=index.es.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "./node_modules/fbjs/lib/invariant.js":
/*!********************************************!*\
  !*** ./node_modules/fbjs/lib/invariant.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "./node_modules/fbjs/lib/warning.js":
/*!******************************************!*\
  !*** ./node_modules/fbjs/lib/warning.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(/*! ./emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
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
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./node_modules/memize/index.js":
/*!**************************************!*\
  !*** ./node_modules/memize/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function memize( fn, options ) {
	var size = 0,
		maxSize, head, tail;

	if ( options && options.maxSize ) {
		maxSize = options.maxSize;
	}

	function memoized( /* ...args */ ) {
		var node = head,
			len = arguments.length,
			args, i;

		searchCache: while ( node ) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if ( node.args.length !== arguments.length ) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for ( i = 0; i < len; i++ ) {
				if ( node.args[ i ] !== arguments[ i ] ) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== head ) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if ( node === tail ) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				node.prev.next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				head.prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply( null, args )
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( head ) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if ( size === maxSize ) {
			tail = tail.prev;
			tail.next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};

	if ( false ) {}

	return memoized;
};


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

/***/ "./node_modules/performance-now/lib/performance-now.js":
/*!*************************************************************!*\
  !*** ./node_modules/performance-now/lib/performance-now.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


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



if (true) {
  var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "./node_modules/fbjs/lib/invariant.js");
  var warning = __webpack_require__(/*! fbjs/lib/warning */ "./node_modules/fbjs/lib/warning.js");
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
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
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
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



var emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js");
var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "./node_modules/fbjs/lib/invariant.js");
var warning = __webpack_require__(/*! fbjs/lib/warning */ "./node_modules/fbjs/lib/warning.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

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
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
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
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
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
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
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
        if (propValue.hasOwnProperty(key)) {
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
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
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
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
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

/***/ "./node_modules/querystringify/index.js":
/*!**********************************************!*\
  !*** ./node_modules/querystringify/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decode(part[1])] = decode(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),

/***/ "./node_modules/raf/index.js":
/*!***********************************!*\
  !*** ./node_modules/raf/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(/*! performance-now */ "./node_modules/performance-now/lib/performance-now.js")
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/react-input-autosize/lib/AutosizeInput.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-input-autosize/lib/AutosizeInput.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;

/***/ }),

/***/ "./node_modules/react-select/dist/react-select.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.es.js ***!
  \***********************************************************/
/*! exports provided: default, SelectBase, Async, AsyncCreatable, Creatable, createFilter, components, mergeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectBase", function() { return Select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncCreatable", function() { return AsyncCreatable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Creatable", function() { return Creatable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilter", function() { return createFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return mergeStyles; });
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.es.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! raf */ "./node_modules/raf/index.js");
/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(raf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_input_autosize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);







var diacritics = [{ base: 'A', letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { base: 'AA', letters: /[\uA732]/g }, { base: 'AE', letters: /[\u00C6\u01FC\u01E2]/g }, { base: 'AO', letters: /[\uA734]/g }, { base: 'AU', letters: /[\uA736]/g }, { base: 'AV', letters: /[\uA738\uA73A]/g }, { base: 'AY', letters: /[\uA73C]/g }, { base: 'B', letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { base: 'C', letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { base: 'D', letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { base: 'DZ', letters: /[\u01F1\u01C4]/g }, { base: 'Dz', letters: /[\u01F2\u01C5]/g }, { base: 'E', letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { base: 'F', letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { base: 'G', letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { base: 'H', letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { base: 'I', letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { base: 'J', letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { base: 'K', letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { base: 'L', letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { base: 'LJ', letters: /[\u01C7]/g }, { base: 'Lj', letters: /[\u01C8]/g }, { base: 'M', letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { base: 'N', letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { base: 'NJ', letters: /[\u01CA]/g }, { base: 'Nj', letters: /[\u01CB]/g }, { base: 'O', letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { base: 'OI', letters: /[\u01A2]/g }, { base: 'OO', letters: /[\uA74E]/g }, { base: 'OU', letters: /[\u0222]/g }, { base: 'P', letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { base: 'Q', letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { base: 'R', letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { base: 'S', letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { base: 'T', letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { base: 'TZ', letters: /[\uA728]/g }, { base: 'U', letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { base: 'V', letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { base: 'VY', letters: /[\uA760]/g }, { base: 'W', letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { base: 'X', letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { base: 'Y', letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { base: 'Z', letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { base: 'a', letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { base: 'aa', letters: /[\uA733]/g }, { base: 'ae', letters: /[\u00E6\u01FD\u01E3]/g }, { base: 'ao', letters: /[\uA735]/g }, { base: 'au', letters: /[\uA737]/g }, { base: 'av', letters: /[\uA739\uA73B]/g }, { base: 'ay', letters: /[\uA73D]/g }, { base: 'b', letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { base: 'c', letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { base: 'd', letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { base: 'dz', letters: /[\u01F3\u01C6]/g }, { base: 'e', letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { base: 'f', letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { base: 'g', letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { base: 'h', letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { base: 'hv', letters: /[\u0195]/g }, { base: 'i', letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { base: 'j', letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { base: 'k', letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { base: 'l', letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { base: 'lj', letters: /[\u01C9]/g }, { base: 'm', letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { base: 'n', letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { base: 'nj', letters: /[\u01CC]/g }, { base: 'o', letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { base: 'oi', letters: /[\u01A3]/g }, { base: 'ou', letters: /[\u0223]/g }, { base: 'oo', letters: /[\uA74F]/g }, { base: 'p', letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { base: 'q', letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { base: 'r', letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { base: 's', letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { base: 't', letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { base: 'tz', letters: /[\uA729]/g }, { base: 'u', letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { base: 'v', letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { base: 'vy', letters: /[\uA761]/g }, { base: 'w', letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { base: 'x', letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { base: 'y', letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { base: 'z', letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < diacritics.length; i++) {
		str = str.replace(diacritics[i].letters, diacritics[i].base);
	}
	return str;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
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
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};
var defaulStringify = function defaulStringify(option) {
  return option.label + ' ' + option.value;
};

var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    var _ignoreCase$ignoreAcc = _extends({
      ignoreCase: true,
      ignoreAccents: true,
      stringify: defaulStringify,
      trim: true,
      matchFrom: 'any'
    }, config),
        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
        stringify = _ignoreCase$ignoreAcc.stringify,
        trim = _ignoreCase$ignoreAcc.trim,
        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);
    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
      candidate = stripDiacritics(candidate);
    }
    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

var DummyInput = function (_Component) {
  inherits(DummyInput, _Component);

  function DummyInput() {
    classCallCheck(this, DummyInput);
    return possibleConstructorReturn(this, (DummyInput.__proto__ || Object.getPrototypeOf(DummyInput)).apply(this, arguments));
  }

  createClass(DummyInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          inProp = _props.in,
          out = _props.out,
          onExited = _props.onExited,
          appear = _props.appear,
          enter = _props.enter,
          exit = _props.exit,
          innerRef = _props.innerRef,
          props = objectWithoutProperties(_props, ['in', 'out', 'onExited', 'appear', 'enter', 'exit', 'innerRef']);

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('input', _extends({
        ref: innerRef
      }, props, {
        className: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])({
          // get rid of any default styles
          background: 0,
          border: 0,
          fontSize: 'inherit',
          outline: 0,
          padding: 0,

          // important! without `width` browsers won't allow focus
          width: 1,

          // remove cursor on desktop
          color: 'transparent',

          // remove cursor on mobile whilst maintaining "scroll into view" behaviour
          left: -100,
          opacity: 0,
          position: 'relative',
          transform: 'scale(0)'
        })
      }));
    }
  }]);
  return DummyInput;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var NodeResolver = function (_Component) {
  inherits(NodeResolver, _Component);

  function NodeResolver() {
    classCallCheck(this, NodeResolver);
    return possibleConstructorReturn(this, (NodeResolver.__proto__ || Object.getPrototypeOf(NodeResolver)).apply(this, arguments));
  }

  createClass(NodeResolver, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.innerRef(Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["findDOMNode"])(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.innerRef(null);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return NodeResolver;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];

var LOCK_STYLES = {
  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};

function preventTouchMove(e) {
  e.preventDefault();
}

function allowTouchMove(e) {
  e.stopPropagation();
}

function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;

  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var activeScrollLocks = 0;

var ScrollLock = function (_Component) {
  inherits(ScrollLock, _Component);

  function ScrollLock() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ScrollLock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ScrollLock.__proto__ || Object.getPrototypeOf(ScrollLock)).call.apply(_ref, [this].concat(args))), _this), _this.originalStyles = {}, _this.listenerOptions = {
      capture: false,
      passive: false
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ScrollLock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!canUseDOM) return;

      var _props = this.props,
          accountForScrollbars = _props.accountForScrollbars,
          touchScrollTarget = _props.touchScrollTarget;

      var target = document.body;
      var targetStyle = target && target.style;

      if (accountForScrollbars) {
        // store any styles already applied to the body
        STYLE_KEYS.forEach(function (key) {
          var val = targetStyle && targetStyle[key];
          _this2.originalStyles[key] = val;
        });
      }

      // apply the lock styles and padding if this is the first scroll lock
      if (accountForScrollbars && activeScrollLocks < 1) {
        var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
        var clientWidth = document.body ? document.body.clientWidth : 0;
        var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;

        Object.keys(LOCK_STYLES).forEach(function (key) {
          var val = LOCK_STYLES[key];
          if (targetStyle) {
            targetStyle[key] = val;
          }
        });

        if (targetStyle) {
          targetStyle.paddingRight = adjustedPadding + 'px';
        }
      }

      // account for touch devices
      if (target && isTouchDevice()) {
        // Mobile Safari ignores { overflow: hidden } declaration on the body.
        target.addEventListener('touchmove', preventTouchMove, this.listenerOptions);

        // Allow scroll on provided target
        if (touchScrollTarget) {
          touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
          touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
        }
      }

      // increment active scroll locks
      activeScrollLocks += 1;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      if (!canUseDOM) return;

      var _props2 = this.props,
          accountForScrollbars = _props2.accountForScrollbars,
          touchScrollTarget = _props2.touchScrollTarget;

      var target = document.body;
      var targetStyle = target && target.style;

      // safely decrement active scroll locks
      activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

      // reapply original body styles, if any
      if (accountForScrollbars && activeScrollLocks < 1) {
        STYLE_KEYS.forEach(function (key) {
          var val = _this3.originalStyles[key];
          if (targetStyle) {
            targetStyle[key] = val;
          }
        });
      }

      // remove touch listeners
      if (target && isTouchDevice()) {
        target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

        if (touchScrollTarget) {
          touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
          touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ScrollLock;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

ScrollLock.defaultProps = {
  accountForScrollbars: true
};

var createPrimitive = function createPrimitive(Tag) {
  return function (_ref) {
    var css$$1 = _ref.css,
        innerRef = _ref.innerRef,
        props = objectWithoutProperties(_ref, ['css', 'innerRef']);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Tag, _extends({ ref: innerRef, className: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(css$$1)
    }, props));
  };
};
var Div = createPrimitive('div');

// Assistive text to describe visual elements. Hidden for sighted users.
var A11yText = function A11yText(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('span', _extends({
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])({
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1
    })
  }, props));
};

function ScrollBlock() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Div,
    {
      className: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])({ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 })
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollLock, null)
  );
}

var ScrollCaptor = function (_Component) {
  inherits(ScrollCaptor, _Component);

  function ScrollCaptor() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ScrollCaptor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ScrollCaptor.__proto__ || Object.getPrototypeOf(ScrollCaptor)).call.apply(_ref, [this].concat(args))), _this), _this.isBottom = false, _this.isTop = false, _this.cancelScroll = function (event) {
      event.preventDefault();
      event.stopPropagation();
    }, _this.handleEventDelta = function (event, delta) {
      var _this$props = _this.props,
          onBottomArrive = _this$props.onBottomArrive,
          onBottomLeave = _this$props.onBottomLeave,
          onTopArrive = _this$props.onTopArrive,
          onTopLeave = _this$props.onTopLeave;
      var _this$scrollTarget = _this.scrollTarget,
          scrollTop = _this$scrollTarget.scrollTop,
          scrollHeight = _this$scrollTarget.scrollHeight,
          clientHeight = _this$scrollTarget.clientHeight;

      var target = _this.scrollTarget;
      var isDeltaPositive = delta > 0;
      var availableScroll = scrollHeight - clientHeight - scrollTop;
      var shouldCancelScroll = false;

      // reset bottom/top flags
      if (availableScroll > delta && _this.isBottom) {
        if (onBottomLeave) onBottomLeave(event);
        _this.isBottom = false;
      }
      if (isDeltaPositive && _this.isTop) {
        if (onTopLeave) onTopLeave(event);
        _this.isTop = false;
      }

      // bottom limit
      if (isDeltaPositive && delta > availableScroll) {
        if (onBottomArrive && !_this.isBottom) {
          onBottomArrive(event);
        }
        target.scrollTop = scrollHeight;
        shouldCancelScroll = true;
        _this.isBottom = true;

        // top limit
      } else if (!isDeltaPositive && -delta > scrollTop) {
        if (onTopArrive && !_this.isTop) {
          onTopArrive(event);
        }
        target.scrollTop = 0;
        shouldCancelScroll = true;
        _this.isTop = true;
      }

      // cancel scroll
      if (shouldCancelScroll) {
        _this.cancelScroll(event);
      }
    }, _this.onWheel = function (event) {
      _this.handleEventDelta(event, event.deltaY);
    }, _this.onTouchStart = function (event) {
      // set touch start so we can calculate touchmove delta
      _this.touchStart = event.changedTouches[0].clientY;
    }, _this.onTouchMove = function (event) {
      var deltaY = _this.touchStart - event.changedTouches[0].clientY;
      _this.handleEventDelta(event, deltaY);
    }, _this.getScrollTarget = function (ref) {
      _this.scrollTarget = ref;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ScrollCaptor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startListening(this.scrollTarget);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopListening(this.scrollTarget);
    }
  }, {
    key: 'startListening',
    value: function startListening(el) {
      // bail early if no scroll available
      if (el.scrollHeight <= el.clientHeight) return;

      // all the if statements are to appease Flow 😢
      if (typeof el.addEventListener === 'function') {
        el.addEventListener('wheel', this.onWheel, false);
      }
      if (typeof el.addEventListener === 'function') {
        el.addEventListener('touchstart', this.onTouchStart, false);
      }
      if (typeof el.addEventListener === 'function') {
        el.addEventListener('touchmove', this.onTouchMove, false);
      }
    }
  }, {
    key: 'stopListening',
    value: function stopListening(el) {
      // bail early if no scroll available
      if (el.scrollHeight <= el.clientHeight) return;

      // all the if statements are to appease Flow 😢
      if (typeof el.removeEventListener === 'function') {
        el.removeEventListener('wheel', this.onWheel, false);
      }
      if (typeof el.removeEventListener === 'function') {
        el.removeEventListener('touchstart', this.onTouchStart, false);
      }
      if (typeof el.removeEventListener === 'function') {
        el.removeEventListener('touchmove', this.onTouchMove, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        NodeResolver,
        { innerRef: this.getScrollTarget },
        this.props.children
      );
    }
  }]);
  return ScrollCaptor;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var ScrollCaptorSwitch = function (_Component2) {
  inherits(ScrollCaptorSwitch, _Component2);

  function ScrollCaptorSwitch() {
    classCallCheck(this, ScrollCaptorSwitch);
    return possibleConstructorReturn(this, (ScrollCaptorSwitch.__proto__ || Object.getPrototypeOf(ScrollCaptorSwitch)).apply(this, arguments));
  }

  createClass(ScrollCaptorSwitch, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isEnabled = _props.isEnabled,
          props = objectWithoutProperties(_props, ['isEnabled']);

      return isEnabled ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollCaptor, props) : this.props.children;
    }
  }]);
  return ScrollCaptorSwitch;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

ScrollCaptorSwitch.defaultProps = { isEnabled: true };

// ==============================
// NO OP
// ==============================

var noop = function noop() {};

// ==============================
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix, name) {
  return name ? prefix + '__' + name : prefix;
}

function classNames(prefix, cssKey, state, className) {
  var arr = [cssKey, className];
  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push('' + applyPrefixToName(prefix, key));
      }
    }
  }

  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
}
// ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) return [value];
  return [];
};

// ==============================
// Handle Input Change
// ==============================

function handleInputChange(inputValue, actionMeta, onInputChange) {
  if (onInputChange) {
    var newValue = onInputChange(inputValue, actionMeta);
    if (typeof newValue === 'string') return newValue;
  }
  return inputValue;
}

// ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].includes(el);
}

// Normalized scrollTo & scrollTop
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }
  return el.scrollTop;
}

function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }

  el.scrollTop = top;
}

// Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  var docEl = document.documentElement; // suck it, flow...

  if (style.position === 'fixed') return docEl;

  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return docEl;
}

// Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/
function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;

  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);
    if (currentTime < duration) {
      raf__WEBPACK_IMPORTED_MODULE_3___default()(animateScroll);
    } else {
      callback(element);
    }
  }
  animateScroll();
}

// Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

// ==============================
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  } catch (e) {
    return false;
  }
}

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};

var getOptionLabel = function getOptionLabel(option) {
  return option.label;
};

var getOptionValue = function getOptionValue(option) {
  return option.value;
};

var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

var borderRadius = 4;

var colors = {
  text: '#222',
  textLight: '#444',
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',

  neutral0: 'hsl(0, 0%, 100%)',
  neutral1: 'hsl(0, 0%, 99%)',
  neutral2: 'hsl(0, 0%, 98%)',
  neutral3: 'hsl(0, 0%, 97%)',
  neutral4: 'hsl(0, 0%, 96%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)',
  neutral100: 'hsl(0, 0%, 0%)',

  neutral1a: 'hsla(0, 0%, 0%, 0.01)',
  neutral2a: 'hsla(0, 0%, 0%, 0.02)',
  neutral3a: 'hsla(0, 0%, 0%, 0.03)',
  neutral4a: 'hsla(0, 0%, 0%, 0.04)',
  neutral5a: 'hsla(0, 0%, 0%, 0.05)',
  neutral10a: 'hsla(0, 0%, 0%, 0.1)',
  neutral20a: 'hsla(0, 0%, 0%, 0.2)',
  neutral30a: 'hsla(0, 0%, 0%, 0.3)',
  neutral40a: 'hsla(0, 0%, 0%, 0.4)',
  neutral50a: 'hsla(0, 0%, 0%, 0.5)',
  neutral60a: 'hsla(0, 0%, 0%, 0.6)',
  neutral70a: 'hsla(0, 0%, 0%, 0.7)',
  neutral80a: 'hsla(0, 0%, 0%, 0.8)',
  neutral90a: 'hsla(0, 0%, 0%, 0.9)'
};

var baseUnit = 4;

var spacing = {
  /* Used to calculate consistent margin/padding on elements */
  baseUnit: baseUnit,
  /* The minimum height of the control */
  controlHeight: 38,
  /* The amount of space between the control and menu */
  menuGutter: baseUnit * 2
};

// ==============================
// Root Container
// ==============================

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isRtl = _ref.isRtl;
  return {
    direction: isRtl ? 'rtl' : null,
    pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      isRtl = props.isRtl;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('container', props)), {
        '--is-disabled': isDisabled,
        '--is-rtl': isRtl
      }, className)
    }, innerProps),
    children
  );
};

// ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS() {
  return {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    padding: spacing.baseUnit / 2 + 'px ' + spacing.baseUnit * 2 + 'px',
    WebkitOverflowScrolling: 'touch',
    position: 'relative'
  };
};
var ValueContainer = function (_Component) {
  inherits(ValueContainer, _Component);

  function ValueContainer() {
    classCallCheck(this, ValueContainer);
    return possibleConstructorReturn(this, (ValueContainer.__proto__ || Object.getPrototypeOf(ValueContainer)).apply(this, arguments));
  }

  createClass(ValueContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          cx = _props.cx,
          isMulti = _props.isMulti,
          getStyles = _props.getStyles,
          hasValue = _props.hasValue;


      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        'div',
        {
          className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('valueContainer', this.props)), {
            'value-container': true,
            'value-container--is-multi': isMulti,
            'value-container--has-value': hasValue
          }, className)
        },
        children
      );
    }
  }]);
  return ValueContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

// ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles;


  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    {
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('indicatorsContainer', props)), {
        'indicators': true
      }, className)
    },
    children
  );
};

// ==============================
// Dropdown & Clear Icons
// ==============================

var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = objectWithoutProperties(_ref, ['size']);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('svg', _extends({
    height: size,
    width: size,
    viewBox: '0 0 20 20',
    className: /*#__PURE__*/ /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])({
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0
    })
  }, props));
};

var CrossIcon = function CrossIcon(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Svg,
    _extends({ size: 20, focusable: 'false', role: 'presentation' }, props),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('path', { d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' })
  );
};
var DownChevron = function DownChevron(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Svg,
    _extends({ size: 20, focusable: 'false', role: 'presentation' }, props),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('path', { d: 'M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' })
  );
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref2) {
  var isFocused = _ref2.isFocused;
  return {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: spacing.baseUnit * 2,
    transition: 'color 150ms',

    ':hover': {
      color: isFocused ? colors.neutral100 : colors.neutral40
    }
  };
};

var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var _props$children = props.children,
      children = _props$children === undefined ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(DownChevron, null) : _props$children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({}, innerProps, {
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('dropdownIndicator', props)), {
        'indicator': true,
        'dropdown-indicator': true
      }, className)
    }),
    children
  );
};

var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var _props$children2 = props.children,
      children = _props$children2 === undefined ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CrossIcon, null) : _props$children2,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({}, innerProps, {
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('clearIndicator', props)), {
        'indicator': true,
        'clear-indicator': true
      }, className)
    }),
    children
  );
};

// ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
  var isDisabled = _ref3.isDisabled;
  return {
    alignSelf: 'stretch',
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: spacing.baseUnit * 2,
    marginTop: spacing.baseUnit * 2,
    width: 1
  };
};

var IndicatorSeparator = function IndicatorSeparator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('span', _extends({}, innerProps, {
    className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('indicatorSeparator', props)), { 'indicator-separator': true }, className)
  }));
};

// ==============================
// Loading
// ==============================

var keyframesName = 'react-select-loading-indicator';

var loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
  var isFocused = _ref4.isFocused,
      size = _ref4.size;
  return {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: spacing.baseUnit * 2,
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  };
};

var LoadingDot = function LoadingDot(_ref5) {
  var color = _ref5.color,
      delay = _ref5.delay,
      offset = _ref5.offset;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('span', {
    css: {
      animationDuration: '1s',
      animationDelay: delay + 'ms',
      animationIterationCount: 'infinite',
      animationName: keyframesName,
      animationTimingFunction: 'ease-in-out',
      backgroundColor: color,
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    }
  });
};

// eslint-disable-next-line no-unused-expressions
Object(emotion__WEBPACK_IMPORTED_MODULE_0__["injectGlobal"])('@keyframes ', keyframesName, '{0%,80%,100%{opacity:0;}40%{opacity:1;}};');

var LoadingIndicator = function LoadingIndicator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFocused = props.isFocused,
      isRtl = props.isRtl;

  var color = isFocused ? colors.text : colors.neutral20;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({}, innerProps, {
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('loadingIndicator', props)), {
        'indicator': true,
        'loading-indicator': true
      }, className)
    }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LoadingDot, { color: color, delay: 0, offset: isRtl }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LoadingDot, { color: color, delay: 160, offset: true }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LoadingDot, { color: color, delay: 320, offset: !isRtl }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      A11yText,
      null,
      'Loading'
    )
  );
};
LoadingIndicator.defaultProps = { size: 4 };

var css$1 = function css$$1(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused;
  return {
    alignItems: 'center',
    backgroundColor: isDisabled ? colors.neutral5 : isFocused ? colors.neutral0 : colors.neutral2,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? '0 0 0 1px ' + colors.primary : null,
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',

    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
};

var Control = function Control(props) {
  var children = props.children,
      cx = props.cx,
      getStyles = props.getStyles,
      className = props.className,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      innerProps = props.innerProps;
  var innerRef = innerProps.innerRef,
      rest = objectWithoutProperties(innerProps, ['innerRef']);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      ref: innerRef,
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('control', props)), {
        'control': true,
        'control-is-disabled': isDisabled,
        'control-is-focused': isFocused
      }, className)
    }, rest),
    children
  );
};

var groupCSS = function groupCSS() {
  return {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};

var Group = function Group(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      Heading = props.Heading,
      headingProps = props.headingProps,
      label = props.label,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('group', props)), { 'group': true }, className)
    }, innerProps),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      Heading,
      _extends({ getStyles: getStyles, cx: cx }, headingProps),
      label
    ),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      'div',
      null,
      children
    )
  );
};

var groupHeadingCSS = function groupHeadingCSS() {
  return {
    color: '#999',
    cursor: 'default',
    display: 'block',
    fontSize: '75%',
    fontWeight: '500',
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  };
};

var GroupHeading = function GroupHeading(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      cleanProps = objectWithoutProperties(props, ['className', 'cx', 'getStyles']);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('div', _extends({
    className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('groupHeading', props)), { 'group-heading': true }, className)
  }, cleanProps));
};

var css$2 = function css$$1(_ref) {
  var isDisabled = _ref.isDisabled;
  return {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    visibility: isDisabled ? 'hidden' : 'visible',
    color: colors.text
  };
};
var inputStyle = function inputStyle(isHidden) {
  return {
    background: 0,
    border: 0,
    fontSize: 'inherit',
    opacity: isHidden ? 0 : 1,
    outline: 0,
    padding: 0,
    color: 'inherit'
  };
};

var Input$1 = function Input(_ref2) {
  var className = _ref2.className,
      cx = _ref2.cx,
      getStyles = _ref2.getStyles,
      innerRef = _ref2.innerRef,
      isHidden = _ref2.isHidden,
      isDisabled = _ref2.isDisabled,
      props = objectWithoutProperties(_ref2, ['className', 'cx', 'getStyles', 'innerRef', 'isHidden', 'isDisabled']);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    {
      className: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('input', props))
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_input_autosize__WEBPACK_IMPORTED_MODULE_4___default.a, _extends({
      className: cx(null, { 'input': true }, className),
      inputRef: innerRef,
      inputStyle: inputStyle(isHidden),
      disabled: isDisabled
    }, props))
  );
};

// ==============================
// Menu
// ==============================

// Get Menu Placement
// ------------------------------

function getMenuPlacement(_ref) {
  var maxHeight = _ref.maxHeight,
      menuEl = _ref.menuEl,
      minHeight = _ref.minHeight,
      placement = _ref.placement,
      shouldScroll = _ref.shouldScroll,
      isFixedPosition = _ref.isFixedPosition;

  var scrollParent = getScrollParent(menuEl);
  var defaultState = { placement: 'bottom', maxHeight: maxHeight };

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState;

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered

  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
      scrollHeight = _scrollParent$getBoun.height;

  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
      menuBottom = _menuEl$getBoundingCl.bottom,
      menuHeight = _menuEl$getBoundingCl.height,
      menuTop = _menuEl$getBoundingCl.top;

  // $FlowFixMe function returns above if there's no offsetParent


  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
      containerTop = _menuEl$offsetParent$.top;

  var viewHeight = window.innerHeight;
  var scrollTop = getScrollTop(scrollParent);
  var gutter = spacing.menuGutter;

  var viewSpaceAbove = containerTop - gutter;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;

  var scrollDown = menuBottom - viewHeight + scrollTop + gutter;
  var scrollUp = scrollTop + menuTop - gutter;
  var scrollDuration = 160;

  switch (placement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return { placement: 'bottom', maxHeight: maxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        return { placement: 'bottom', maxHeight: maxHeight };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        var constrainedHeight = isFixedPosition ? viewSpaceBelow - gutter : scrollSpaceBelow - gutter;

        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (placement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = maxHeight;

        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight = isFixedPosition ? viewSpaceAbove - gutter - spacing.controlHeight : scrollSpaceAbove - gutter - spacing.controlHeight;
        }

        return { placement: 'top', maxHeight: _constrainedHeight };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (placement === 'bottom') {
        scrollTo(scrollParent, scrollDown);
        return { placement: 'bottom', maxHeight: maxHeight };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return { placement: 'top', maxHeight: maxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return { placement: 'top', maxHeight: maxHeight };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = maxHeight;

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - gutter : scrollSpaceAbove - gutter;
        }

        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return { placement: 'bottom', maxHeight: maxHeight };
    default:
      throw new Error('Invalid placement provided "' + placement + '".');
  }

  // fulfil contract with flow: implicit return value of undefined
  return defaultState;
}

// Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = { bottom: 'top', top: 'bottom' };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};

var menuCSS = function menuCSS(_ref2) {
  var _ref3;

  var placement = _ref2.placement;
  return _ref3 = {}, defineProperty(_ref3, alignToControl(placement), '100%'), defineProperty(_ref3, 'backgroundColor', colors.neutral0), defineProperty(_ref3, 'borderRadius', borderRadius), defineProperty(_ref3, 'boxShadow', '0 0 0 1px ' + colors.neutral10a + ', 0 4px 11px ' + colors.neutral10a), defineProperty(_ref3, 'marginBottom', spacing.menuGutter), defineProperty(_ref3, 'marginTop', spacing.menuGutter), defineProperty(_ref3, 'position', 'absolute'), defineProperty(_ref3, 'width', '100%'), defineProperty(_ref3, 'zIndex', 1), _ref3;
};

var Menu = function (_Component) {
  inherits(Menu, _Component);

  function Menu() {
    var _ref4;

    var _temp, _this, _ret;

    classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref4 = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref4, [this].concat(args))), _this), _this.state = {
      maxHeight: _this.props.maxMenuHeight,
      placement: null
    }, _this.getPlacement = function (ref) {
      var _this$props = _this.props,
          minMenuHeight = _this$props.minMenuHeight,
          maxMenuHeight = _this$props.maxMenuHeight,
          menuPlacement = _this$props.menuPlacement,
          menuPosition = _this$props.menuPosition,
          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView;
      var getPortalPlacement = _this.context.getPortalPlacement;


      if (!ref) return;

      // DO NOT scroll if position is fixed
      var isFixedPosition = menuPosition === 'fixed';
      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;

      var state = getMenuPlacement({
        maxHeight: maxMenuHeight,
        menuEl: ref,
        minHeight: minMenuHeight,
        placement: menuPlacement,
        shouldScroll: shouldScroll,
        isFixedPosition: isFixedPosition
      });

      if (getPortalPlacement) getPortalPlacement(state);

      _this.setState(state);
    }, _this.getState = function () {
      var menuPlacement = _this.props.menuPlacement;

      var placement = _this.state.placement || coercePlacement(menuPlacement);

      return _extends({}, _this.props, { placement: placement, maxHeight: _this.state.maxHeight });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Menu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          cx = _props.cx,
          getStyles = _props.getStyles,
          innerProps = _props.innerProps;


      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        'div',
        _extends({
          className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('menu', this.getState())), {
            'menu': true
          }, className),
          ref: this.getPlacement
        }, innerProps),
        children
      );
    }
  }]);
  return Menu;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

Menu.contextTypes = {
  getPortalPlacement: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func
};

// ==============================
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref5) {
  var maxHeight = _ref5.maxHeight;
  return {
    maxHeight: maxHeight,
    overflowY: 'auto',
    paddingBottom: spacing.baseUnit,
    paddingTop: spacing.baseUnit,
    position: 'relative', // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  };
};
var MenuList = function MenuList(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isMulti = props.isMulti,
      innerProps = props.innerProps;
  var innerRef = innerProps.innerRef,
      rest = objectWithoutProperties(innerProps, ['innerRef']);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('menuList', props)), {
        'menu-list': true,
        'menu-list--is-multi': isMulti
      }, className),
      ref: innerRef
    }, rest),
    children
  );
};
var noticeCSS = function noticeCSS() {
  return {
    color: colors.neutral40,
    padding: spacing.baseUnit * 2 + 'px ' + spacing.baseUnit * 3 + 'px',
    textAlign: 'center'
  };
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;

var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('noOptionsMessage', props)), {
        'menu-notice': true,
        'menu-notice--no-options': true
      }, className)
    }, innerProps),
    children
  );
};
NoOptionsMessage.defaultProps = {
  children: 'No options'
};

var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('loadingMessage', props)), {
        'menu-notice': true,
        'menu-notice--loading': true
      }, className)
    }, innerProps),
    children
  );
};
LoadingMessage.defaultProps = {
  children: 'Loading...'
};

// ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref6) {
  var rect = _ref6.rect,
      offset = _ref6.offset,
      position = _ref6.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};

var MenuPortal = function (_Component2) {
  inherits(MenuPortal, _Component2);

  function MenuPortal() {
    var _ref7;

    var _temp2, _this2, _ret2;

    classCallCheck(this, MenuPortal);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = possibleConstructorReturn(this, (_ref7 = MenuPortal.__proto__ || Object.getPrototypeOf(MenuPortal)).call.apply(_ref7, [this].concat(args))), _this2), _this2.state = { placement: null }, _this2.getPortalPlacement = function (_ref8) {
      var placement = _ref8.placement;

      var initialPlacement = coercePlacement(_this2.props.menuPlacement);

      // avoid re-renders if the placement has not changed
      if (placement !== initialPlacement) {
        _this2.setState({ placement: placement });
      }
    }, _temp2), possibleConstructorReturn(_this2, _ret2);
  }

  createClass(MenuPortal, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        getPortalPlacement: this.getPortalPlacement
      };
    }

    // callback for occassions where the menu must "flip"

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          appendTo = _props2.appendTo,
          children = _props2.children,
          controlElement = _props2.controlElement,
          menuPlacement = _props2.menuPlacement,
          position = _props2.menuPosition,
          getStyles = _props2.getStyles;

      var isFixed = position === 'fixed';

      // bail early if required elements aren't present
      if (!appendTo && !isFixed || !controlElement) {
        return null;
      }

      var placement = this.state.placement || coercePlacement(menuPlacement);
      var rect = getBoundingClientObj(controlElement);
      var scrollDistance = isFixed ? 0 : window.pageYOffset;
      var offset = rect[placement] + scrollDistance;
      var state = { offset: offset, position: position, rect: rect };

      // same wrapper element whether fixed or portalled
      var menuWrapper = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        'div',
        {
          className: /*#__PURE__*/ /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('menuPortal', state))
        },
        children
      );

      return appendTo ? Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["createPortal"])(menuWrapper, appendTo) : menuWrapper;
    }
  }]);
  return MenuPortal;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);
MenuPortal.childContextTypes = {
  getPortalPlacement: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func
};

var multiValueCSS = function multiValueCSS() {
  return {
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    display: 'flex',
    margin: spacing.baseUnit / 2,
    minWidth: 0 // resolves flex/text-overflow bug
  };
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref) {
  var cropWithEllipsis = _ref.cropWithEllipsis;
  return {
    color: colors.text,
    fontSize: '85%',
    overflow: 'hidden',
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
    whiteSpace: 'nowrap'
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref2) {
  var isFocused = _ref2.isFocused;
  return {
    alignItems: 'center',
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused && colors.dangerLight,
    display: 'flex',
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  };
};

var MultiValueContainer = Div;
var MultiValueLabel = Div;

var MultiValueRemove = function (_Component) {
  inherits(MultiValueRemove, _Component);

  function MultiValueRemove() {
    classCallCheck(this, MultiValueRemove);
    return possibleConstructorReturn(this, (MultiValueRemove.__proto__ || Object.getPrototypeOf(MultiValueRemove)).apply(this, arguments));
  }

  createClass(MultiValueRemove, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          props = objectWithoutProperties(_props, ['children']);

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        Div,
        props,
        children
      );
    }
  }]);
  return MultiValueRemove;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

MultiValueRemove.defaultProps = {
  children: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CrossIcon, { size: 14 })
};

var MultiValue = function (_Component2) {
  inherits(MultiValue, _Component2);

  function MultiValue() {
    classCallCheck(this, MultiValue);
    return possibleConstructorReturn(this, (MultiValue.__proto__ || Object.getPrototypeOf(MultiValue)).apply(this, arguments));
  }

  createClass(MultiValue, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          components = _props2.components,
          cx = _props2.cx,
          getStyles = _props2.getStyles,
          innerProps = _props2.innerProps,
          isDisabled = _props2.isDisabled,
          removeProps = _props2.removeProps;

      var cn = {
        container: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('multiValue', this.props)), {
          'multi-value': true,
          'multi-value--is-disabled': isDisabled
        }, className),
        label: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('multiValueLabel', this.props)), {
          'multi-value__label': true
        }, className),
        remove: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('multiValueRemove', this.props)), {
          'multi-value__remove': true
        }, className)
      };
      var Container = components.Container,
          Label = components.Label,
          Remove = components.Remove;


      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        Container,
        _extends({
          className: cn.container
        }, innerProps),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          Label,
          { className: cn.label },
          children
        ),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Remove, _extends({ className: cn.remove }, removeProps))
      );
    }
  }]);
  return MultiValue;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

MultiValue.defaultProps = {
  cropWithEllipsis: true
};

var css$3 = function css$$1(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected;
  return {
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    padding: spacing.baseUnit * 2 + 'px ' + spacing.baseUnit * 3 + 'px',
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

    // provide some affordance on touch devices
    ':active': {
      backgroundColor: isSelected ? colors.primary : colors.primary50
    }
  };
};

var Option = function Option(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      innerProps = props.innerProps;
  var innerRef = innerProps.innerRef,
      rest = objectWithoutProperties(innerProps, ['innerRef']);

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      ref: innerRef,
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('option', props)), {
        'option': true,
        'option--is-disabled': isDisabled,
        'option--is-focused': isFocused,
        'option--is-selected': isSelected
      }, className)
    }, rest),
    children
  );
};

var css$4 = function css$$1() {
  return {
    color: colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};

var Placeholder = function Placeholder(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('placeholder', props)), {
        'placeholder': true
      }, className)
    }, innerProps),
    children
  );
};

var css$5 = function css$$1(_ref) {
  var isDisabled = _ref.isDisabled;
  return {
    color: isDisabled ? colors.neutral40 : colors.text,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    maxWidth: 'calc(100% - ' + spacing.baseUnit * 2 + 'px)',
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};

var SingleValue = function SingleValue(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      innerProps = props.innerProps;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    'div',
    _extends({
      className: cx( /*#__PURE__*/Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(getStyles('singleValue', props)), {
        'single-value': true,
        'single-value--is-disabled': isDisabled
      }, className)
    }, innerProps),
    children
  );
};

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input$1,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var defaultComponents = function defaultComponents(props) {
  return _extends({}, components, props.components);
};

var defaultStyles = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: css$1,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: css$2,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: css$3,
  placeholder: css$4,
  singleValue: css$5,
  valueContainer: valueContainerCSS
};

// Merge Utility
// Allows consumers to extend a base Select with additional styles

function mergeStyles(source) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // initialize with source styles
  var styles = _extends({}, source);

  // massage in target styles
  Object.keys(target).forEach(function (key) {
    if (source[key]) {
      styles[key] = function (rsCss, props) {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });

  return styles;
}

var defaultProps = {
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  closeMenuOnSelect: true,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  hideSelectedOptions: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return count + ' result' + (count !== 1 ? 's' : '') + ' available.';
  },
  styles: {},
  tabIndex: '0',
  tabSelectsValue: true
};

var instanceId = 1;

var Select = function (_Component) {
  inherits(Select, _Component);

  function Select(props) {
    classCallCheck(this, Select);

    var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value;

    _this.components = defaultComponents(props);
    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

    var selectValue = cleanValue(value);
    var menuOptions = _this.buildMenuOptions(props, selectValue);

    _this.state.menuOptions = menuOptions;
    _this.state.selectValue = selectValue;
    return _this;
  } // TODO


  createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startListeningToTouch();

      if (this.props.autoFocus) {
        this.focusInput();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          components$$1 = _props.components,
          options = _props.options,
          value = _props.value,
          inputValue = _props.inputValue;
      // re-cache custom components

      if (nextProps.components !== components$$1) {
        this.components = defaultComponents(nextProps);
      }
      // rebuild the menu options
      if (nextProps.value !== value || nextProps.options !== options || nextProps.inputValue !== inputValue) {
        var _selectValue = cleanValue(nextProps.value);
        var _menuOptions = this.buildMenuOptions(nextProps, _selectValue);
        var _focusedValue = this.getNextFocusedValue(_selectValue);
        var _focusedOption = this.getNextFocusedOption(_menuOptions.focusable);
        this.setState({ menuOptions: _menuOptions, selectValue: _selectValue, focusedOption: _focusedOption, focusedValue: _focusedValue });
      }
      // some updates should toggle the state of the input visibility
      if (this.inputIsHiddenAfterUpdate != null) {
        this.setState({
          inputIsHidden: this.inputIsHiddenAfterUpdate
        });
        delete this.inputIsHiddenAfterUpdate;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          isDisabled = _props2.isDisabled,
          menuIsOpen = _props2.menuIsOpen;
      var isFocused = this.state.isFocused;


      if (
      // ensure focus is restored correctly when the control becomes enabled
      isFocused && !isDisabled && prevProps.isDisabled ||
      // ensure focus is on the Input when the menu opens
      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
        this.focusInput();
      }

      // scroll the focused option into view if necessary
      if (this.menuRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        scrollIntoView(this.menuRef, this.focusedOptionRef);
      }
      this.scrollToFocusedOptionOnUpdate = false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopListeningToTouch();
    }

    // ==============================
    // Element Refs
    // ==============================

  }, {
    key: 'onMenuOpen',


    // ==============================
    // Consumer Handlers
    // ==============================

    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: 'onMenuClose',
    value: function onMenuClose() {
      this.onInputChange('', { action: 'menu-close' });
      this.props.onMenuClose();
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }

    // ==============================
    // Methods
    // ==============================

  }, {
    key: 'focusInput',
    value: function focusInput() {
      if (!this.input) return;
      this.input.focus();
    }
  }, {
    key: 'blurInput',
    value: function blurInput() {
      if (!this.input) return;
      this.input.blur();
    }

    // aliased for consumers

  }, {
    key: 'openMenu',
    value: function openMenu(focusOption) {
      var _state = this.state,
          menuOptions = _state.menuOptions,
          selectValue = _state.selectValue;
      var isMulti = this.props.isMulti;


      var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

      if (!isMulti) {
        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      this.scrollToFocusedOptionOnUpdate = true;
      this.inputIsHiddenAfterUpdate = false;
      this.onMenuOpen();
      this.setState({
        focusedValue: null,
        focusedOption: menuOptions.focusable[openAtIndex]
      });
    }
  }, {
    key: 'focusValue',
    value: function focusValue(direction) {
      var isMulti = this.props.isMulti;
      var _state2 = this.state,
          selectValue = _state2.selectValue,
          focusedValue = _state2.focusedValue;

      // Only multiselects support value focusing

      if (!isMulti) return;

      this.setState({
        focusedOption: null
      });

      var focusedIndex = focusedValue ? selectValue.indexOf(focusedValue) : -1;
      var lastIndex = selectValue.length - 1;
      var nextFocus = -1;
      if (!selectValue.length) return;

      switch (direction) {
        case 'previous':
          if (focusedIndex === 0) {
            // don't cycle from the start to the end
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            // if nothing is focused, focus the last value first
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }
          break;
        case 'next':
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }
          break;
      }

      this.setState({
        inputIsHidden: nextFocus === -1 ? false : true,
        focusedValue: selectValue[nextFocus]
      });
    }
  }, {
    key: 'focusOption',
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var pageSize = this.props.pageSize;
      var _state3 = this.state,
          focusedOption = _state3.focusedOption,
          menuOptions = _state3.menuOptions;

      var options = menuOptions.focusable;

      if (!options.length) return;
      var nextFocus = 0; // handles 'first'
      var focusedIndex = focusedOption ? options.indexOf(focusedOption) : -1;
      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus],
        focusedValue: null
      });
    }
  }, {
    key: 'getCommonProps',


    // ==============================
    // Getters
    // ==============================

    value: function getCommonProps() {
      var clearValue = this.clearValue,
          getStyles = this.getStyles,
          setValue = this.setValue,
          selectOption = this.selectOption,
          props = this.props;
      var className = props.className,
          classNamePrefix = props.classNamePrefix,
          isMulti = props.isMulti,
          isRtl = props.isRtl,
          options = props.options;
      var selectValue = this.state.selectValue;

      var hasValue = this.hasValue();
      var getValue = function getValue() {
        return selectValue;
      };
      var cxPrefix = classNamePrefix;
      if (className && classNamePrefix === undefined) {
        console.warn('\n        Warning: the behaviour of \'className\' has changed between 2.0.0-beta.2 and 2.0.0-beta.3.\n        You can now use className to specify the class name of the outer container, and classNamePrefix to enable our provided BEM class names for internal elements.\n        The className prop will have no effect on internal elements when 2.0.0 is released.\n      ');
        cxPrefix = className;
      }

      var cx = classNames.bind(null, cxPrefix);
      return {
        cx: cx,
        clearValue: clearValue,
        getStyles: getStyles,
        getValue: getValue,
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        setValue: setValue,
        selectProps: props
      };
    }
  }, {
    key: 'getNextFocusedValue',
    value: function getNextFocusedValue(nextSelectValue) {
      if (this.clearFocusValueOnUpdate) {
        this.clearFocusValueOnUpdate = false;
        return null;
      }
      var _state4 = this.state,
          focusedValue = _state4.focusedValue,
          lastSelectValue = _state4.selectValue;

      var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
      if (lastFocusedIndex > -1) {
        var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
        if (nextFocusedIndex > -1) {
          // the focused value is still in the selectValue, return it
          return focusedValue;
        } else if (lastFocusedIndex < nextSelectValue.length) {
          // the focusedValue is not present in the next selectValue array by
          // reference, so return the new value at the same index
          return nextSelectValue[lastFocusedIndex];
        }
      }
      return null;
    }
  }, {
    key: 'getNextFocusedOption',
    value: function getNextFocusedOption(options) {
      var lastFocusedOption = this.state.focusedOption;

      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
    }
  }, {
    key: 'getOptionLabel',
    value: function getOptionLabel$$1(data) {
      return this.props.getOptionLabel(data);
    }
  }, {
    key: 'getOptionValue',
    value: function getOptionValue$$1(data) {
      return this.props.getOptionValue(data);
    }
  }, {
    key: 'hasValue',


    // ==============================
    // Helpers
    // ==============================

    value: function hasValue() {
      var selectValue = this.state.selectValue;

      return selectValue.length > 0;
    }
  }, {
    key: 'hasOptions',
    value: function hasOptions() {
      return !!this.state.menuOptions.render.length;
    }
  }, {
    key: 'countOptions',
    value: function countOptions() {
      return this.state.menuOptions.focusable.length;
    }
  }, {
    key: 'isClearable',
    value: function isClearable() {
      var _props3 = this.props,
          isClearable = _props3.isClearable,
          isMulti = _props3.isMulti;

      // single select, by default, IS NOT clearable
      // multi select, by default, IS clearable

      if (isClearable === undefined) return isMulti;

      return isClearable;
    }
  }, {
    key: 'isOptionDisabled',
    value: function isOptionDisabled$$1(option) {
      return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option) : false;
    }
  }, {
    key: 'isOptionSelected',
    value: function isOptionSelected(option, selectValue) {
      var _this2 = this;

      if (selectValue.indexOf(option) > -1) return true;
      if (typeof this.props.isOptionSelected === 'function') {
        return this.props.isOptionSelected(option, selectValue);
      }
      var candidate = this.getOptionValue(option);
      return selectValue.some(function (i) {
        return _this2.getOptionValue(i) === candidate;
      });
    }
  }, {
    key: 'filterOption',
    value: function filterOption(option, inputValue) {
      return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
    }
  }, {
    key: 'formatOptionLabel',
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === 'function') {
        var _inputValue = this.props.inputValue;
        var _selectValue2 = this.state.selectValue;

        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue2
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: 'formatGroupLabel',
    value: function formatGroupLabel$$1(data) {
      return this.props.formatGroupLabel(data);
    }

    // ==============================
    // Mouse Handlers
    // ==============================

  }, {
    key: 'startListeningToTouch',


    // ==============================
    // Touch Handlers
    // ==============================

    value: function startListeningToTouch() {
      if (document && document.addEventListener) {
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
      }
    }
  }, {
    key: 'stopListeningToTouch',
    value: function stopListeningToTouch() {
      if (document && document.removeEventListener) {
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
      }
    }

    // ==============================
    // Focus Handlers
    // ==============================

    // ==============================
    // Keyboard Handlers
    // ==============================

  }, {
    key: 'buildMenuOptions',


    // ==============================
    // Menu Options
    // ==============================

    value: function buildMenuOptions(props, selectValue) {
      var _this3 = this;

      var hideSelectedOptions = props.hideSelectedOptions,
          isMulti = props.isMulti,
          _props$inputValue = props.inputValue,
          inputValue = _props$inputValue === undefined ? '' : _props$inputValue,
          options = props.options;


      var toOption = function toOption(option, id) {
        var isDisabled = _this3.isOptionDisabled(option);
        var isSelected = _this3.isOptionSelected(option, selectValue);
        var label = _this3.getOptionLabel(option);
        var value = _this3.getOptionValue(option);

        if (isMulti && hideSelectedOptions && isSelected || !_this3.filterOption({ label: label, value: value, data: option }, inputValue)) {
          return;
        }

        var onHover = isDisabled ? undefined : function () {
          return _this3.onOptionHover(option);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this3.selectOption(option);
        };
        var optionId = _this3.getElementId('option') + '-' + id;

        return {
          innerProps: {
            'aria-selected': isSelected,
            id: optionId,
            onClick: onSelect,
            onMouseMove: onHover,
            onMouseOver: onHover,
            role: 'option',
            tabIndex: -1
          },
          data: option,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: 'option',
          value: value
        };
      };

      return options.reduce(function (acc, item, itemIndex) {
        if (item.options) {
          // TODO needs a tidier implementation
          if (!_this3.hasGroups) _this3.hasGroups = true;

          var items = item.options;

          var children = items.map(function (child, i) {
            var option = toOption(child, itemIndex + '-' + i);
            if (option && !option.isDisabled) acc.focusable.push(child);
            return option;
          }).filter(Boolean);
          if (children.length) {
            var groupId = _this3.getElementId('group') + '-' + itemIndex;
            acc.render.push({
              type: 'group',
              key: groupId,
              data: item,
              options: children
            });
          }
        } else {
          var option = toOption(item, '' + itemIndex);
          if (option) {
            acc.render.push(option);
            if (!option.isDisabled) acc.focusable.push(item);
          }
        }
        return acc;
      }, { render: [], focusable: [] });
    }

    // ==============================
    // Renderers
    // ==============================

  }, {
    key: 'renderScreenReaderStatus',
    value: function renderScreenReaderStatus() {
      var screenReaderStatus = this.props.screenReaderStatus;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        A11yText,
        { 'aria-atomic': 'true', 'aria-live': 'polite', role: 'status' },
        screenReaderStatus({ count: this.countOptions() })
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _props4 = this.props,
          isDisabled = _props4.isDisabled,
          isLoading = _props4.isLoading,
          isSearchable = _props4.isSearchable,
          inputId = _props4.inputId,
          inputValue = _props4.inputValue,
          menuIsOpen = _props4.menuIsOpen,
          tabIndex = _props4.tabIndex;
      var Input$$1 = this.components.Input;
      var inputIsHidden = this.state.inputIsHidden;


      var id = inputId || this.getElementId('input');

      if (!isSearchable) {
        // use a dummy input to maintain focus/blur functionality
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(DummyInput, {
          id: id,
          innerRef: this.onInputRef,
          onBlur: this.onInputBlur,
          onChange: noop,
          onFocus: this.onInputFocus,
          readOnly: true,
          tabIndex: tabIndex,
          value: ''
        });
      }

      // aria attributes makes the JSX "noisy", separated for clarity
      var ariaAttributes = {
        'aria-activedescendant': this.getActiveDescendentId(),
        'aria-autocomplete': 'list',
        'aria-busy': isLoading,
        'aria-describedby': this.props['aria-describedby'],
        'aria-expanded': menuIsOpen,
        'aria-haspopup': menuIsOpen,
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        'aria-owns': menuIsOpen ? this.getElementId('listbox') : undefined,
        role: 'combobox'
      };

      var cx = this.commonProps.cx;


      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Input$$1, _extends({
        autoCapitalize: 'none',
        autoComplete: 'off',
        autoCorrect: 'off',
        cx: cx,
        getStyles: this.getStyles,
        id: id,
        innerRef: this.onInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: 'false',
        tabIndex: tabIndex,
        type: 'text',
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: 'renderPlaceholderOrValue',
    value: function renderPlaceholderOrValue() {
      var _this4 = this;

      var _components = this.components,
          MultiValue = _components.MultiValue,
          MultiValueContainer = _components.MultiValueContainer,
          MultiValueLabel = _components.MultiValueLabel,
          MultiValueRemove = _components.MultiValueRemove,
          SingleValue = _components.SingleValue,
          Placeholder = _components.Placeholder;
      var commonProps = this.commonProps;
      var _props5 = this.props,
          controlShouldRenderValue = _props5.controlShouldRenderValue,
          isDisabled = _props5.isDisabled,
          isMulti = _props5.isMulti,
          inputValue = _props5.inputValue,
          placeholder = _props5.placeholder;
      var _state5 = this.state,
          selectValue = _state5.selectValue,
          focusedValue = _state5.focusedValue;


      if (!this.hasValue() || !controlShouldRenderValue) {
        return inputValue ? null : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          Placeholder,
          _extends({}, commonProps, { key: 'placeholder', isDisabled: isDisabled }),
          placeholder
        );
      }

      if (isMulti) {
        return selectValue.map(function (opt) {
          var isFocused = opt === focusedValue;
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
            MultiValue,
            _extends({}, commonProps, {
              components: {
                Container: MultiValueContainer,
                Label: MultiValueLabel,
                Remove: MultiValueRemove
              },
              isFocused: isFocused,
              isDisabled: isDisabled,
              key: _this4.getOptionValue(opt),
              removeProps: {
                onClick: function onClick() {
                  return _this4.removeValue(opt);
                },
                onMouseDown: function onMouseDown(e) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              },
              data: opt
            }),
            _this4.formatOptionLabel(opt, 'value')
          );
        });
      }

      if (inputValue) {
        return null;
      }

      var singleValue = selectValue[0];
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        SingleValue,
        _extends({}, commonProps, { data: singleValue, isDisabled: isDisabled }),
        this.formatOptionLabel(singleValue, 'value')
      );
    }
  }, {
    key: 'renderClearIndicator',
    value: function renderClearIndicator() {
      var ClearIndicator = this.components.ClearIndicator;
      var commonProps = this.commonProps;
      var _props6 = this.props,
          isDisabled = _props6.isDisabled,
          isLoading = _props6.isLoading;
      var isFocused = this.state.isFocused;


      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }

      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        role: 'button'
      };

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ClearIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderLoadingIndicator',
    value: function renderLoadingIndicator() {
      var LoadingIndicator = this.components.LoadingIndicator;
      var commonProps = this.commonProps;
      var _props7 = this.props,
          isDisabled = _props7.isDisabled,
          isLoading = _props7.isLoading;
      var isFocused = this.state.isFocused;


      if (!LoadingIndicator || !isLoading) return null;

      var innerProps = {
        role: 'presentation'
      };

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LoadingIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderIndicatorSeparator',
    value: function renderIndicatorSeparator() {
      var _components2 = this.components,
          DropdownIndicator = _components2.DropdownIndicator,
          IndicatorSeparator = _components2.IndicatorSeparator;

      // separator doesn't make sense without the dropdown indicator

      if (!DropdownIndicator || !IndicatorSeparator) return null;

      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;

      var innerProps = { role: 'presentation' };

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(IndicatorSeparator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderDropdownIndicator',
    value: function renderDropdownIndicator() {
      var DropdownIndicator = this.components.DropdownIndicator;

      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;


      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        role: 'button'
      };

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(DropdownIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this5 = this;

      var _components3 = this.components,
          Group = _components3.Group,
          GroupHeading = _components3.GroupHeading,
          Menu = _components3.Menu,
          MenuList = _components3.MenuList,
          MenuPortal = _components3.MenuPortal,
          LoadingMessage = _components3.LoadingMessage,
          NoOptionsMessage = _components3.NoOptionsMessage,
          Option = _components3.Option;
      var commonProps = this.commonProps;
      var _state6 = this.state,
          focusedOption = _state6.focusedOption,
          menuOptions = _state6.menuOptions;
      var _props8 = this.props,
          captureMenuScroll = _props8.captureMenuScroll,
          inputValue = _props8.inputValue,
          isLoading = _props8.isLoading,
          isMulti = _props8.isMulti,
          loadingMessage = _props8.loadingMessage,
          minMenuHeight = _props8.minMenuHeight,
          maxMenuHeight = _props8.maxMenuHeight,
          menuIsOpen = _props8.menuIsOpen,
          menuPlacement = _props8.menuPlacement,
          menuPosition = _props8.menuPosition,
          menuPortalTarget = _props8.menuPortalTarget,
          menuShouldBlockScroll = _props8.menuShouldBlockScroll,
          menuShouldScrollIntoView = _props8.menuShouldScrollIntoView,
          noOptionsMessage = _props8.noOptionsMessage,
          onMenuScrollToTop = _props8.onMenuScrollToTop,
          onMenuScrollToBottom = _props8.onMenuScrollToBottom;


      if (!menuIsOpen) return null;

      // TODO: Internal Option Type here
      var render = function render(props) {
        // for performance, the menu options in state aren't changed when the
        // focused option changes so we calculate additional props based on that
        var isFocused = focusedOption === props.data;
        props.innerProps.innerRef = isFocused ? _this5.onFocusedOptionRef : undefined;

        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          Option,
          _extends({}, commonProps, props, { isFocused: isFocused }),
          _this5.formatOptionLabel(props.data, 'menu')
        );
      };

      var menuUI = void 0;

      if (this.hasOptions()) {
        menuUI = menuOptions.render.map(function (item) {
          if (item.type === 'group') {
            var type = item.type,
                group = objectWithoutProperties(item, ['type']);

            var headingId = item.key + '-heading';

            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
              Group,
              _extends({}, commonProps, group, {
                Heading: GroupHeading,
                innerProps: {
                  'aria-expanded': true,
                  'aria-labelledby': headingId,
                  role: 'group'
                },
                headingProps: {
                  id: headingId
                },
                label: _this5.formatGroupLabel(item.data)
              }),
              item.options.map(function (option) {
                return render(option);
              })
            );
          } else if (item.type === 'option') {
            return render(item);
          }
        });
      } else if (isLoading) {
        menuUI = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          LoadingMessage,
          commonProps,
          loadingMessage({ inputValue: inputValue })
        );
      } else {
        menuUI = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          NoOptionsMessage,
          commonProps,
          noOptionsMessage({ inputValue: inputValue })
        );
      }

      var menuElement = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        'div',
        null,
        menuShouldBlockScroll ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollBlock, null) : null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          Menu,
          _extends({}, commonProps, {
            innerProps: {
              onMouseDown: this.onMenuMouseDown,
              onMouseMove: this.onMenuMouseMove
            },
            isLoading: isLoading,
            minMenuHeight: minMenuHeight,
            maxMenuHeight: maxMenuHeight,
            menuPlacement: menuPlacement,
            menuPosition: menuPosition,
            menuShouldScrollIntoView: menuShouldScrollIntoView
          }),
          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
            ScrollCaptorSwitch,
            {
              isEnabled: captureMenuScroll,
              onTopArrive: onMenuScrollToTop,
              onBottomArrive: onMenuScrollToBottom
            },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
              MenuList,
              _extends({}, commonProps, {
                innerProps: {
                  'aria-multiselectable': isMulti,
                  id: this.getElementId('listbox'),
                  innerRef: this.onMenuRef,
                  role: 'listbox'
                },
                isLoading: isLoading,
                maxHeight: maxMenuHeight
              }),
              menuUI
            )
          )
        )
      );

      // positioning behaviour is almost identical for portalled and fixed,
      // so we use the same component. the actual portalling logic is forked
      // within the component based on `menuPosition`
      return menuPortalTarget || menuPosition === 'fixed' ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        MenuPortal,
        _extends({}, commonProps, {
          appendTo: menuPortalTarget,
          controlElement: this.controlRef,
          menuPlacement: menuPlacement,
          menuPosition: menuPosition
        }),
        menuElement
      ) : menuElement;
    }
  }, {
    key: 'renderFormField',
    value: function renderFormField() {
      var _this6 = this;

      var _props9 = this.props,
          delimiter = _props9.delimiter,
          isDisabled = _props9.isDisabled,
          isMulti = _props9.isMulti,
          name = _props9.name;
      var selectValue = this.state.selectValue;


      if (!name || isDisabled) return;

      if (isMulti) {
        if (delimiter) {
          var _value = selectValue.map(function (opt) {
            return _this6.getOptionValue(opt);
          }).join(delimiter);
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('input', { name: name, type: 'hidden', value: _value });
        } else {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
            'div',
            null,
            selectValue.map(function (opt, i) {
              return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('input', {
                key: 'i-' + i,
                name: name,
                type: 'hidden',
                value: _this6.getOptionValue(opt)
              });
            })
          );
        }
      } else {
        var _value2 = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('input', { name: name, type: 'hidden', value: _value2 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _components4 = this.components,
          Control = _components4.Control,
          IndicatorsContainer = _components4.IndicatorsContainer,
          SelectContainer = _components4.SelectContainer,
          ValueContainer = _components4.ValueContainer;
      var _props10 = this.props,
          className = _props10.className,
          id = _props10.id,
          isDisabled = _props10.isDisabled;
      var isFocused = this.state.isFocused;


      var commonProps = this.commonProps = this.getCommonProps();

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        SelectContainer,
        _extends({}, commonProps, {
          className: className,
          innerProps: {
            id: id,
            onKeyDown: this.onKeyDown
          },
          isDisabled: isDisabled,
          isFocused: isFocused
        }),
        this.renderScreenReaderStatus(),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
          Control,
          _extends({}, commonProps, {
            innerProps: {
              innerRef: this.onControlRef,
              onMouseDown: this.onControlMouseDown,
              onTouchEnd: this.onControlTouchEnd
            },
            isDisabled: isDisabled,
            isFocused: isFocused
          }),
          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
            ValueContainer,
            _extends({}, commonProps, { isDisabled: isDisabled }),
            this.renderPlaceholderOrValue(),
            this.renderInput()
          ),
          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
            IndicatorsContainer,
            _extends({}, commonProps, { isDisabled: isDisabled }),
            this.renderClearIndicator(),
            this.renderLoadingIndicator(),
            this.renderIndicatorSeparator(),
            this.renderDropdownIndicator()
          )
        ),
        this.renderMenu(),
        this.renderFormField()
      );
    }
  }]);
  return Select;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

Select.defaultProps = defaultProps;

var _initialiseProps = function _initialiseProps() {
  var _this7 = this;

  this.blockOptionHover = false;
  this.clearFocusValueOnUpdate = false;
  this.hasGroups = false;
  this.instancePrefix = '';
  this.initialTouchX = 0;
  this.initialTouchY = 0;
  this.openAfterFocus = false;
  this.scrollToFocusedOptionOnUpdate = false;
  this.state = {
    focusedOption: null,
    focusedValue: null,
    inputIsHidden: false,
    isFocused: false,
    menuOptions: { render: [], focusable: [] },
    selectValue: []
  };

  this.onInputRef = function (ref) {
    _this7.input = ref;
  };

  this.onControlRef = function (ref) {
    _this7.controlRef = ref;
  };

  this.onMenuRef = function (ref) {
    _this7.menuRef = ref;
  };

  this.onFocusedOptionRef = function (ref) {
    _this7.focusedOptionRef = ref;
  };

  this.focus = this.focusInput;
  this.blur = this.blurInput;

  this.setValue = function (newValue) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
    var _props11 = _this7.props,
        closeMenuOnSelect = _props11.closeMenuOnSelect,
        isMulti = _props11.isMulti,
        onChange = _props11.onChange;

    _this7.onInputChange('', { action: 'set-value' });
    if (closeMenuOnSelect) {
      _this7.inputIsHiddenAfterUpdate = !isMulti;
      _this7.onMenuClose();
    }
    // when the select value should change, we should reset focusedValue
    _this7.clearFocusValueOnUpdate = true;
    onChange(newValue, { action: action });
  };

  this.selectOption = function (newValue) {
    var _props12 = _this7.props,
        blurInputOnSelect = _props12.blurInputOnSelect,
        isMulti = _props12.isMulti;


    if (isMulti) {
      var _selectValue3 = _this7.state.selectValue;

      if (_this7.isOptionSelected(newValue, _selectValue3)) {
        var candidate = _this7.getOptionValue(newValue);
        _this7.setValue(_selectValue3.filter(function (i) {
          return _this7.getOptionValue(i) !== candidate;
        }), 'deselect-option');
      } else {
        _this7.setValue([].concat(toConsumableArray(_selectValue3), [newValue]), 'select-option');
      }
    } else {
      _this7.setValue(newValue, 'select-option');
    }

    if (blurInputOnSelect) {
      _this7.blurInput();
    }
  };

  this.removeValue = function (removedValue) {
    var onChange = _this7.props.onChange;
    var selectValue = _this7.state.selectValue;

    var candidate = _this7.getOptionValue(removedValue);
    onChange(selectValue.filter(function (i) {
      return _this7.getOptionValue(i) !== candidate;
    }), {
      action: 'remove-value',
      removedValue: removedValue
    });
    _this7.focusInput();
  };

  this.clearValue = function () {
    var _props13 = _this7.props,
        isMulti = _props13.isMulti,
        onChange = _props13.onChange;

    onChange(isMulti ? [] : null, { action: 'clear' });
  };

  this.popValue = function () {
    var onChange = _this7.props.onChange;
    var selectValue = _this7.state.selectValue;

    onChange(selectValue.slice(0, selectValue.length - 1), {
      action: 'pop-value',
      removedValue: selectValue[selectValue.length - 1]
    });
  };

  this.getStyles = function (key, props) {
    var base = defaultStyles[key](props);
    base.boxSizing = 'border-box';
    var custom = _this7.props.styles[key];
    return custom ? custom(base, props) : base;
  };

  this.getElementId = function (element) {
    return _this7.instancePrefix + '-' + element;
  };

  this.getActiveDescendentId = function () {
    var menuIsOpen = _this7.props.menuIsOpen;
    var _state7 = _this7.state,
        menuOptions = _state7.menuOptions,
        focusedOption = _state7.focusedOption;


    if (!focusedOption || !menuIsOpen) return undefined;

    var index = menuOptions.focusable.indexOf(focusedOption);
    var option = menuOptions.render[index];

    return option && option.key;
  };

  this.onMenuMouseDown = function (event) {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    _this7.focusInput();
  };

  this.onMenuMouseMove = function (event) {
    _this7.blockOptionHover = false;
  };

  this.onControlMouseDown = function (event) {
    var openMenuOnClick = _this7.props.openMenuOnClick;

    if (!_this7.state.isFocused) {
      if (openMenuOnClick) {
        _this7.openAfterFocus = true;
      }
      _this7.focusInput();
    } else if (!_this7.props.menuIsOpen) {
      _this7.openMenu('first');
    } else {
      _this7.onMenuClose();
    }
    // $FlowFixMe HTMLElement type does not have tagName property
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
  };

  this.onDropdownIndicatorMouseDown = function (event) {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (_this7.props.isDisabled) return;
    var _props14 = _this7.props,
        isMulti = _props14.isMulti,
        menuIsOpen = _props14.menuIsOpen;

    _this7.focusInput();
    if (menuIsOpen) {
      _this7.inputIsHiddenAfterUpdate = !isMulti;
      _this7.onMenuClose();
    } else {
      _this7.openMenu('first');
    }
    event.preventDefault();
    event.stopPropagation();
  };

  this.onClearIndicatorMouseDown = function (event) {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    _this7.clearValue();
    event.stopPropagation();
    _this7.openAfterFocus = false;
    setTimeout(function () {
      return _this7.focusInput();
    });
  };

  this.onTouchStart = function (_ref2) {
    var _ref2$touches = slicedToArray(_ref2.touches, 1),
        touch = _ref2$touches[0];

    _this7.initialTouchX = touch.clientX;
    _this7.initialTouchY = touch.clientY;
    _this7.userIsDragging = false;
  };

  this.onTouchMove = function (_ref3) {
    var _ref3$touches = slicedToArray(_ref3.touches, 1),
        touch = _ref3$touches[0];

    var deltaX = Math.abs(touch.clientX - _this7.initialTouchX);
    var deltaY = Math.abs(touch.clientY - _this7.initialTouchY);
    var moveThreshold = 5;

    _this7.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
  };

  this.onTouchEnd = function (event) {
    if (_this7.userIsDragging) return;

    // close the menu if the user taps outside
    if (_this7.controlRef && !_this7.controlRef.contains(event.target) && _this7.menuRef && !_this7.menuRef.contains(event.target)) {
      _this7.blurInput();
    }

    // reset move vars
    _this7.initialTouchX = 0;
    _this7.initialTouchY = 0;
  };

  this.onControlTouchEnd = function (event) {
    if (_this7.userIsDragging) return;

    _this7.onControlMouseDown(event);
  };

  this.onClearIndicatorTouchEnd = function (event) {
    if (_this7.userIsDragging) return;

    _this7.onClearIndicatorMouseDown(event);
  };

  this.onDropdownIndicatorTouchEnd = function (event) {
    if (_this7.userIsDragging) return;

    _this7.onDropdownIndicatorMouseDown(event);
  };

  this.handleInputChange = function (event) {
    var inputValue = event.currentTarget.value;
    _this7.inputIsHiddenAfterUpdate = false;
    _this7.onInputChange(inputValue, { action: 'input-change' });
    _this7.onMenuOpen();
  };

  this.onInputFocus = function (event) {
    if (_this7.props.onFocus) {
      _this7.props.onFocus(event);
    }
    _this7.inputIsHiddenAfterUpdate = false;
    _this7.setState({
      isFocused: true
    });
    if (_this7.openAfterFocus || _this7.props.openMenuOnFocus) {
      _this7.openMenu('first');
    }
    _this7.openAfterFocus = false;
  };

  this.onInputBlur = function (event) {
    if (_this7.props.onBlur) {
      _this7.props.onBlur(event);
    }
    _this7.onInputChange('', { action: 'input-blur' });
    _this7.onMenuClose();
    _this7.setState({
      focusedValue: null,
      isFocused: false
    });
  };

  this.onOptionHover = function (focusedOption) {
    if (_this7.blockOptionHover || _this7.state.focusedOption === focusedOption) {
      return;
    }
    _this7.setState({ focusedOption: focusedOption });
  };

  this.onKeyDown = function (event) {
    var _props15 = _this7.props,
        isMulti = _props15.isMulti,
        backspaceRemovesValue = _props15.backspaceRemovesValue,
        escapeClearsValue = _props15.escapeClearsValue,
        inputValue = _props15.inputValue,
        isClearable = _props15.isClearable,
        isDisabled = _props15.isDisabled,
        menuIsOpen = _props15.menuIsOpen,
        onKeyDown = _props15.onKeyDown,
        tabSelectsValue = _props15.tabSelectsValue,
        openMenuOnFocus = _props15.openMenuOnFocus;
    var _state8 = _this7.state,
        focusedOption = _state8.focusedOption,
        focusedValue = _state8.focusedValue,
        selectValue = _state8.selectValue;


    if (isDisabled) return;

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    // Block option hover events when the user has just pressed a key
    _this7.blockOptionHover = true;
    switch (event.key) {
      case 'ArrowLeft':
        if (!isMulti || inputValue) return;
        _this7.focusValue('previous');
        break;
      case 'ArrowRight':
        if (!isMulti || inputValue) return;
        _this7.focusValue('next');
        break;
      case 'Backspace':
        if (inputValue) return;
        if (focusedValue) {
          _this7.removeValue(focusedValue);
        } else {
          if (!backspaceRemovesValue) return;
          _this7.popValue();
        }
        break;
      case 'Tab':
        if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption ||
        // don't capture the event if the menu opens on focus and the focused
        // option is already selected; it breaks the flow of navigation
        openMenuOnFocus && _this7.isOptionSelected(focusedOption, selectValue)) {
          return;
        }
        _this7.selectOption(focusedOption);
        break;
      case 'Enter':
        if (menuIsOpen) {
          if (!focusedOption) return;
          _this7.selectOption(focusedOption);
        } else {
          _this7.focusOption('first');
        }
        break;
      case 'Escape':
        if (menuIsOpen) {
          _this7.inputIsHiddenAfterUpdate = false;
          _this7.onInputChange('', { action: 'menu-close' });
          _this7.onMenuClose();
        } else if (isClearable && escapeClearsValue) {
          _this7.clearValue();
        }
        break;
      case ' ':
        // space
        if (inputValue) {
          return;
        }
        if (!menuIsOpen) {
          _this7.openMenu('first');
          break;
        }
        if (!focusedOption) return;
        _this7.selectOption(focusedOption);
        break;
      case 'ArrowUp':
        if (menuIsOpen) {
          _this7.focusOption('up');
        } else {
          _this7.openMenu('last');
        }
        break;
      case 'ArrowDown':
        if (menuIsOpen) {
          _this7.focusOption('down');
        } else {
          _this7.openMenu('first');
        }
        break;
      case 'PageUp':
        if (!menuIsOpen) return;
        _this7.focusOption('pageup');
        break;
      case 'PageDown':
        if (!menuIsOpen) return;
        _this7.focusOption('pagedown');
        break;
      case 'Home':
        if (!menuIsOpen) return;
        _this7.focusOption('first');
        break;
      case 'End':
        if (!menuIsOpen) return;
        _this7.focusOption('last');
        break;
      default:
        return;
    }
    event.preventDefault();
  };
};

var manageState = function manageState(SelectComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    inherits(StateManager, _Component);

    function StateManager() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, StateManager);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StateManager.__proto__ || Object.getPrototypeOf(StateManager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
      }, _this.onChange = function (value, actionMeta) {
        _this.callProp('onChange', value, actionMeta);
        _this.setState({ value: value });
      }, _this.onInputChange = function (value, actionMeta) {
        // TODO: for backwards compatibility, we allow the prop to return a new
        // value, but now inputValue is a controllable prop we probably shouldn't
        var newValue = _this.callProp('onInputChange', value, actionMeta);
        _this.setState({
          inputValue: newValue !== undefined ? newValue : value
        });
      }, _this.onMenuOpen = function () {
        _this.callProp('onMenuOpen');
        _this.setState({ menuIsOpen: true });
      }, _this.onMenuClose = function () {
        _this.callProp('onMenuClose');
        _this.setState({ menuIsOpen: false });
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(StateManager, [{
      key: 'focus',
      value: function focus() {
        this.select.focus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.select.blur();
      }
    }, {
      key: 'getProp',
      value: function getProp(key) {
        return this.props[key] !== undefined ? this.props[key] : this.state[key];
      }
    }, {
      key: 'callProp',
      value: function callProp(name) {
        if (typeof this.props[name] === 'function') {
          var _props;

          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return (_props = this.props)[name].apply(_props, toConsumableArray(args));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SelectComponent, _extends({}, this.props, {
          ref: function ref(_ref2) {
            _this2.select = _ref2;
          },
          inputValue: this.getProp('inputValue'),
          menuIsOpen: this.getProp('menuIsOpen'),
          onChange: this.onChange,
          onInputChange: this.onInputChange,
          onMenuClose: this.onMenuClose,
          onMenuOpen: this.onMenuOpen,
          value: this.getProp('value')
        }));
      }
    }]);
    return StateManager;
  }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]), _class.defaultProps = {
    defaultInputValue: '',
    defaultMenuIsOpen: false,
    defaultValue: null
  }, _temp2;
};

var defaultProps$1 = {
  cacheOptions: false,
  defaultOptions: false
};

var makeAsyncSelect = function makeAsyncSelect(SelectComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    inherits(Async, _Component);

    function Async(props) {
      classCallCheck(this, Async);

      var _this = possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this));

      _this.mounted = false;
      _this.optionsCache = {};

      _this.handleInputChange = function (newValue, actionMeta) {
        var _this$props = _this.props,
            cacheOptions = _this$props.cacheOptions,
            onInputChange = _this$props.onInputChange;
        // TODO

        var inputValue = handleInputChange(newValue, actionMeta, onInputChange);
        if (!inputValue) {
          delete _this.lastRequest;
          _this.setState({
            inputValue: '',
            loadedInputValue: '',
            loadedOptions: [],
            isLoading: false,
            passEmptyOptions: false
          });
          return;
        }
        if (cacheOptions && _this.optionsCache[inputValue]) {
          _this.setState({
            inputValue: inputValue,
            loadedInputValue: inputValue,
            loadedOptions: _this.optionsCache[inputValue],
            isLoading: false,
            passEmptyOptions: false
          });
        } else {
          var request = _this.lastRequest = {};
          _this.setState({
            inputValue: inputValue,
            isLoading: true,
            passEmptyOptions: !_this.state.loadedInputValue
          }, function () {
            _this.loadOptions(inputValue, function (options) {
              if (!_this.mounted) return;
              if (options) {
                _this.optionsCache[inputValue] = options;
              }
              if (request !== _this.lastRequest) return;
              delete _this.lastRequest;
              _this.setState({
                isLoading: false,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: false
              });
            });
          });
        }
        return inputValue;
      };

      _this.state = {
        defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
        inputValue: '',
        isLoading: props.defaultOptions === true ? true : false,
        loadedOptions: [],
        passEmptyOptions: false
      };
      return _this;
    }

    createClass(Async, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.mounted = true;
        var defaultOptions = this.props.defaultOptions;

        if (defaultOptions === true) {
          this.loadOptions('', function (options) {
            if (!_this2.mounted) return;
            var isLoading = !!_this2.lastRequest;
            _this2.setState({ defaultOptions: options || [], isLoading: isLoading });
          });
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // if the cacheOptions prop changes, clear the cache
        if (nextProps.cacheOptions !== this.props.cacheOptions) {
          this.optionsCache = {};
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.mounted = false;
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.select.focus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.select.blur();
      }
    }, {
      key: 'loadOptions',
      value: function loadOptions(inputValue, callback) {
        var loadOptions = this.props.loadOptions;

        if (!loadOptions) return callback();
        var loader = loadOptions(inputValue, callback);
        if (loader && typeof loader.then === 'function') {
          loader.then(callback, function () {
            return callback();
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props = this.props,
            loadOptions = _props.loadOptions,
            props = objectWithoutProperties(_props, ['loadOptions']);
        var _state = this.state,
            defaultOptions = _state.defaultOptions,
            inputValue = _state.inputValue,
            isLoading = _state.isLoading,
            loadedInputValue = _state.loadedInputValue,
            loadedOptions = _state.loadedOptions,
            passEmptyOptions = _state.passEmptyOptions;

        var options = passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
        return (
          // $FlowFixMe
          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SelectComponent, _extends({}, props, {
            ref: function ref(_ref) {
              _this3.select = _ref;
            },
            options: options,
            filterOption: null,
            isLoading: isLoading,
            onInputChange: this.handleInputChange
          }))
        );
      }
    }]);
    return Async;
  }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]), _class.defaultProps = defaultProps$1, _temp;
};
var Async = makeAsyncSelect(manageState(Select));

var compareOption = function compareOption(inputValue, option) {
  var candidate = inputValue.toLowerCase();
  return option.value.toLowerCase() === candidate || option.label.toLowerCase() === candidate;
};

var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return 'Create "' + inputValue + '"';
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};

var defaultProps$2 = _extends({
  allowCreateWhileLoading: false,
  createOptionPosition: 'last'
}, builtins);

var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    inherits(Creatable, _Component);

    function Creatable(props) {
      classCallCheck(this, Creatable);

      var _this = possibleConstructorReturn(this, (Creatable.__proto__ || Object.getPrototypeOf(Creatable)).call(this, props));

      _this.onChange = function (newValue, actionMeta) {
        var _this$props = _this.props,
            getNewOptionData = _this$props.getNewOptionData,
            inputValue = _this$props.inputValue,
            isMulti = _this$props.isMulti,
            onChange = _this$props.onChange,
            onCreateOption = _this$props.onCreateOption,
            value = _this$props.value;

        if (actionMeta.action !== 'select-option') {
          return onChange(newValue, actionMeta);
        }
        var newOption = _this.state.newOption;

        var valueArray = Array.isArray(newValue) ? newValue : [newValue];

        if (valueArray[valueArray.length - 1] === newOption) {
          if (onCreateOption) onCreateOption(inputValue);else {
            var newOptionData = getNewOptionData(inputValue, inputValue);
            var newActionMeta = { action: 'create-option' };
            if (isMulti) {
              onChange([].concat(toConsumableArray(cleanValue(value)), [newOptionData]), newActionMeta);
            } else {
              onChange(newOptionData, newActionMeta);
            }
          }
          return;
        }
        onChange(newValue, actionMeta);
      };

      var options = props.options || [];
      _this.state = {
        newOption: undefined,
        options: options
      };
      return _this;
    }

    createClass(Creatable, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var allowCreateWhileLoading = nextProps.allowCreateWhileLoading,
            createOptionPosition = nextProps.createOptionPosition,
            formatCreateLabel = nextProps.formatCreateLabel,
            getNewOptionData = nextProps.getNewOptionData,
            inputValue = nextProps.inputValue,
            isLoading = nextProps.isLoading,
            isValidNewOption = nextProps.isValidNewOption,
            value = nextProps.value;

        var options = nextProps.options || [];
        var newOption = this.state.newOption;

        if (isValidNewOption(inputValue, cleanValue(value), options)) {
          newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
        } else {
          newOption = undefined;
        }
        this.setState({
          newOption: newOption,
          options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(toConsumableArray(options)) : [].concat(toConsumableArray(options), [newOption]) : options
        });
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.select.focus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.select.blur();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var props = objectWithoutProperties(this.props, []);
        var options = this.state.options;

        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SelectComponent, _extends({}, props, {
          ref: function ref(_ref) {
            _this2.select = _ref;
          },
          options: options,
          onChange: this.onChange
        }));
      }
    }]);
    return Creatable;
  }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]), _class.defaultProps = defaultProps$2, _temp;
};
var Creatable = manageState(makeCreatableSelect(Select));

var AsyncCreatable = makeAsyncSelect(manageState(makeCreatableSelect(Select)));

var index = manageState(Select);

/* harmony default export */ __webpack_exports__["default"] = (index);



/***/ }),

/***/ "./node_modules/stylis-rule-sheet/index.js":
/*!*************************************************!*\
  !*** ./node_modules/stylis-rule-sheet/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
	 true ? (module['exports'] = factory()) :
		undefined
}(function () {

	'use strict'

	return function (insertRule) {
		var delimiter = '/*|*/'
		var needle = delimiter+'}'

		function toSheet (block) {
			if (block)
				try {
					insertRule(block + '}')
				} catch (e) {}
		}

		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
			switch (context) {
				// property
				case 1:
					// @import
					if (depth === 0 && content.charCodeAt(0) === 64)
						return insertRule(content+';'), ''
					break
				// selector
				case 2:
					if (ns === 0)
						return content + delimiter
					break
				// at-rule
				case 3:
					switch (ns) {
						// @font-face, @page
						case 102:
						case 112:
							return insertRule(selectors[0]+content), ''
						default:
							return content + (at === 0 ? delimiter : '')
					}
				case -2:
					content.split(needle).forEach(toSheet)
			}
		}
	}
}))


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "@eventespresso/eejs":
/*!***********************!*\
  !*** external "eejs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs;

/***/ }),

/***/ "@eventespresso/i18n":
/*!****************************!*\
  !*** external "eejs.i18n" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.i18n;

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.components;

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
/*!*************************************!*\
  !*** external "eejs.vendor.lodash" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.lodash;

/***/ }),

/***/ "moment":
/*!*************************************!*\
  !*** external "eejs.vendor.moment" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.moment;

/***/ }),

/***/ "react":
/*!************************************!*\
  !*** external "eejs.vendor.react" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.react;

/***/ }),

/***/ "react-dom":
/*!***************************************!*\
  !*** external "eejs.vendor.reactDom" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.reactDom;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9mb3JtL3NlbGVjdC9idWlsZC1vcHRpb25zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2Zvcm0vc2VsZWN0L2RlZmF1bHQtc2VsZWN0LWNvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2NvbXBvbmVudHMvZm9ybS9zZWxlY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2NvbXBvbmVudHMvZm9ybS9zZWxlY3QvbW9kZWwtc2VsZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2Zvcm0vc2VsZWN0L21vZGVsLXNlbGVjdHMvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2NvbXBvbmVudHMvZm9ybS9zZWxlY3QvbW9kZWwtc2VsZWN0cy9ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9mb3JtL3NlbGVjdC9tb2RlbC1zZWxlY3RzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2Zvcm0vc2VsZWN0L21vZGVsLXNlbGVjdHMvdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL3F1ZXJ5L2xpbWl0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL3NlbGVjdGlvbi9yZWdpc3RyYXRpb24tc3RhdHVzLXNlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9zZWxlY3Rpb24vcmVnaXN0cmF0aW9uLXN0YXR1cy1zZWxlY3Qvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy91aS9pbWFnZS9hdmF0YXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kZWZhdWx0LW1vZGVsLXN0YXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VuZHBvaW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9wcmltYXJ5LWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vaGFzaC9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL21lbW9pemUvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsaXMvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi91bml0bGVzcy9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY3JlYXRlLWVtb3Rpb24vZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9lbW90aW9uL2Rpc3QvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wZXJmb3JtYW5jZS1ub3cvbGliL3BlcmZvcm1hbmNlLW5vdy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmdpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcmFmL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWlucHV0LWF1dG9zaXplL2xpYi9BdXRvc2l6ZUlucHV0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9zdHlsaXMtcnVsZS1zaGVldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLmkxOG5cIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmRhdGFcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmVsZW1lbnRcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmVuZG9yLmxvZGFzaFwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52ZW5kb3IubW9tZW50XCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZlbmRvci5yZWFjdFwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52ZW5kb3IucmVhY3REb21cIiJdLCJuYW1lcyI6WyJERUZBVUxUX01PREVMX09QVElPTlNfTUFQIiwiZXZlbnQiLCJsYWJlbCIsInZhbHVlIiwiZGF0ZXRpbWUiLCJ0aWNrZXQiLCJPUFRJT05fU0VMRUNUX0FMTCIsImJ1aWxkT3B0aW9ucyIsImVudGl0aWVzIiwibW9kZWxOYW1lIiwiYWRkQWxsT3B0aW9uTGFiZWwiLCJtYXAiLCJNQVBfRk9SX01PREVMIiwiZ2VuZXJhdGVkT3B0aW9ucyIsInJlZHVjZSIsIm9wdGlvbnMiLCJlbnRpdHkiLCJwdXNoIiwidW5zaGlmdCIsIlJFQUNUX1NFTEVDVF9UWVBFUyIsIlByb3BUeXBlcyIsInN0cmluZyIsImF1dG9Gb2N1cyIsImJvb2wiLCJiYWNrc3BhY2VSZW1vdmVzVmFsdWUiLCJibHVySW5wdXRPblNlbGVjdCIsImNhcHR1cmVNZW51U2Nyb2xsIiwiY2xhc3NOYW1lIiwiY2xhc3NOYW1lUHJlZml4IiwiY2xvc2VNZW51T25TZWxlY3QiLCJjb21wb25lbnRzIiwib2JqZWN0IiwiY29udHJvbFNob3VsZFJlbmRlclZhbHVlIiwiZGVsaW1pdGVyIiwiZXNjYXBlQ2xlYXJzVmFsdWUiLCJmaWx0ZXJPcHRpb24iLCJmdW5jIiwiZm9ybWF0R3JvdXBMYWJlbCIsImZvcm1hdE9wdGlvbkxhYmVsIiwiZ2V0T3B0aW9uTGFiZWwiLCJnZXRPcHRpb25WYWx1ZSIsImhpZGVTZWxlY3RlZE9wdGlvbnMiLCJpZCIsImlucHV0VmFsdWUiLCJpbnB1dElkIiwiaW5zdGFuY2VJZCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImlzQ2xlYXJhYmxlIiwiaXNEaXNhYmxlZCIsImlzTG9hZGluZyIsImlzT3B0aW9uRGlzYWJsZWQiLCJpc09wdGlvblNlbGVjdGVkIiwiaXNNdWx0aSIsImlzU2VhcmNoYWJsZSIsImxvYWRpbmdNZXNzYWdlIiwibWluTWVudUhlaWdodCIsIm1heE1lbnVIZWlnaHQiLCJtZW51SXNPcGVuIiwibWVudVBsYWNlbWVudCIsIm9uZU9mIiwibWVudVBvc2l0aW9uIiwibWVudVBvcnRhbFRhcmdldCIsImVsZW1lbnQiLCJtZW51U2hvdWxkQmxvY2tTY3JvbGwiLCJtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXciLCJuYW1lIiwibm9PcHRpb25zTWVzc2FnZSIsIm9uQmx1ciIsIm9uQ2hhbmdlIiwib25Gb2N1cyIsIm9uSW5wdXRDaGFuZ2UiLCJvbktleURvd24iLCJvbk1lbnVPcGVuIiwib25NZW51Q2xvc2UiLCJvbk1lbnVTY3JvbGxUb1RvcCIsIm9uTWVudVNjcm9sbFRvQm90dG9tIiwib3Blbk1lbnVPbkZvY3VzIiwib3Blbk1lbnVPbkNsaWNrIiwiYXJyYXkiLCJwYWdlU2l6ZSIsInBsYWNlaG9sZGVyIiwic2NyZWVuUmVhZGVyU3RhdHVzIiwic3R5bGVzIiwic2hhcGUiLCJjbGVhckluZGljYXRvciIsImNvbnRhaW5lciIsImNvbnRyb2wiLCJkcm9wZG93bkluZGljYXRvciIsImdyb3VwIiwiZ3JvdXBIZWFkaW5nIiwiaW5kaWNhdG9yc0NvbnRhaW5lciIsImluZGljYXRvclNlcGFyYXRvciIsImlucHV0IiwibG9hZGluZ0luZGljYXRvciIsImxvYWRpbmdNZXNzYWdlQ1NTIiwibWVudSIsIm1lbnVMaXN0IiwibWVudVBvcnRhbCIsIm11bHRpVmFsdWUiLCJtdWx0aVZhbHVlTGFiZWwiLCJtdWx0aVZhbHVlUmVtb3ZlIiwibm9PcHRpb25zTWVzc2FnZUNTUyIsIm9wdGlvbiIsInNpbmdsZVZhbHVlIiwidmFsdWVDb250YWluZXIiLCJ0YWJJbmRleCIsInRhYlNlbGVjdHNWYWx1ZSIsIlJFQUNUX1NFTEVDVF9ERUZBVUxUUyIsIl9fIiwiTW9kZWxTZWxlY3QiLCJwcm9wcyIsInNlbGVjdExhYmVsIiwic2VsZWN0Q29uZmlndXJhdGlvbiIsImdldFNlbGVjdExhYmVsIiwic3RhdGUiLCJnZXRPcHRpb25zIiwidXBkYXRlZCIsImdldE9wdGlvbk9iamVjdEZvclZhbHVlIiwiZGVmYXVsdFZhbHVlIiwibW9kZWxFbnRpdGllcyIsIm9wdGlvbnNFbnRpdHlNYXAiLCJtYXBPcHRpb25zQ2FsbGJhY2siLCJpc0VtcHR5IiwibWF0Y2giLCJmaW5kIiwiaXNVbmRlZmluZWQiLCJwcm9wVHlwZXMiLCJxdWVyeURhdGEiLCJsaW1pdCIsIm9yZGVyQnkiLCJvcmRlciIsImdldFF1ZXJ5U3RyaW5nIiwiZGVmYXVsdFByb3BzIiwidW5pcXVlSWQiLCJ3aXRoU2VsZWN0Iiwic2VsZWN0Iiwib3duUHJvcHMiLCJxdWVyeVN0cmluZyIsImdldEl0ZW1zIiwiaXNSZXF1ZXN0aW5nSXRlbXMiLCJEYXRldGltZVNlbGVjdCIsInNlbGVjdGVkRGF0ZXRpbWVJZCIsIm9uRGF0ZXRpbWVTZWxlY3QiLCJzZWxlY3RPcHRzIiwiZm9yRXZlbnRJZCIsIkV2ZW50U2VsZWN0Iiwic2VsZWN0ZWRFdmVudElkIiwib25FdmVudFNlbGVjdCIsIlRpY2tldFNlbGVjdCIsInNlbGVjdGVkVGlja2V0SWQiLCJvblRpY2tldFNlbGVjdCIsImZvckRhdGV0aW1lSWQiLCJERUZBVUxUX0xJTUlUIiwiREVGQVVMVF9MQUJFTCIsIkRFRkFVTFRfTUlOIiwiREVGQVVMVF9NQVgiLCJRdWVyeUxpbWl0Iiwib25MaW1pdENoYW5nZSIsIm1pbiIsIm1heCIsIlJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdCIsInJlZ1N0YXR1c2VzIiwic2VsZWN0ZWRSZWdTdGF0dXNJZCIsIm9uUmVnU3RhdHVzU2VsZWN0IiwiYWRkQWxsT3B0aW9uIiwicGxhY2VIb2xkZXIiLCJyZWdpc3RyYXRpb25TdGF0dXNTZWxlY3RPcHRpb25zIiwiYXJyYXlPZiIsIlNUU19JRCIsImlzUmVxdWlyZWQiLCJTVFNfY29kZSIsImF0dHJpYnV0ZXMiLCJnZXRSZWdpc3RyYXRpb25TdGF0dXNzIiwiaXNSZXF1ZXN0aW5nUmVnaXN0cmF0aW9uU3RhdHVzcyIsInF1ZXJ5QXJncyIsIm9yZGVyX2J5Iiwic3RyaW5naWZ5IiwicGlja0J5IiwiRUVfT1BUSU9OX1JFR19TVEFUVVNfU0VMRUNUX0FMTCIsInJlZ1N0YXR1c09wdGlvbnMiLCJzdGF0dXMiLCJBdmF0YXJJbWFnZSIsImF2YXRhclVybCIsImF2YXRhckNsYXNzIiwiYXZhdGFySGVpZ2h0IiwiYXZhdGFyV2lkdGgiLCJhdmF0YXJBbHRUZXh0IiwiUVVFUllfT1JERVJfQVNDIiwiUVVFUllfT1JERVJfREVTQyIsIkFMTE9XRURfT1JERVJfVkFMVUVTIiwiR1JFQVRFUl9USEFOIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiTEVTU19USEFOIiwiR1JFQVRFUl9USEFOX0FORF9FUVVBTCIsIkxFU1NfVEhBTl9BTkRfRVFVQUwiLCJ3aGVyZUNvbmRpdGlvbnMiLCJtYXBPcmRlckJ5Iiwid2hlcmUiLCJub3dEYXRlQW5kVGltZSIsIm1vbWVudCIsInF1ZXJ5RGF0YVR5cGVzIiwic2hvd0V4cGlyZWQiLCJtb250aCIsImRlZmF1bHRRdWVyeURhdGEiLCJvcmRlckJ5TWFwIiwic3RhcnRfZGF0ZSIsImVuZF9kYXRlIiwibG9jYWwiLCJmb3JtYXQiLCJzdGFydE9mIiwiZW5kT2YiLCJwYXJzZUludCIsImpvaW4iLCJiYXNlR2V0UXVlcnlTdHJpbmciLCJtYXBUb0FycmF5VmFsdWVzIiwibWFwVmFsdWVzIiwibW9kZWxOYW1lRW5kcG9pbnRzIiwibWFwVG9PYmplY3RWYWx1ZXMiLCJERUZBVUxUX0xJU1RTX1NUQVRFIiwiREVGQVVMVF9DT1JFX1NUQVRFIiwiZW50aXR5SWRzIiwiZGlydHkiLCJkYXRhIiwicGF0aHMiLCJjb2xsZWN0aW9uX2VuZHBvaW50cyIsImVuZHBvaW50cyIsImdldEVuZHBvaW50IiwidmFsaWRhdGVFbnRpdHlIYXNLZXkiLCJhcHBseVF1ZXJ5U3RyaW5nIiwiY2F0ZWdvcnlTbHVnIiwidGlja2V0X3N0YXJ0IiwidGlja2V0X2VuZCIsIk1PREVMX05BTUVTIiwia2V5cyIsInByaW1hcnlfa2V5cyIsInByaW1hcnlLZXlzIiwidmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cyIsIm1lbW9pemUiLCJ2YWxpZGF0ZUlzQXJyYXkiLCJwcmltYXJ5S2V5IiwicmVzdWx0Iiwia2V5IiwidHJpbUVuZCIsInZhbHVlRm9yUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzIiwiaXNBcnJheSIsImtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUiLCJ2YWxpZGF0ZUlzTm90RW1wdHkiLCJrZXlCeSIsIlN0cmluZyIsIkdSRUFURVJfQU5EX0VRVUFMIiwiTEVTU19BTkRfRVFVQUwiLCJpc05hTiIsIm1lc3NhZ2UiLCJzcHJpbnRmIiwiaGFzT3duUHJvcGVydHkiLCJpdGVtcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFBQTtBQUFBOzs7QUFHQTs7QUFFQTs7OztBQUlBLElBQU1BLDRCQUE0QjtBQUNqQ0MsUUFBTztBQUNOQyxTQUFPLFVBREQ7QUFFTkMsU0FBTztBQUZELEVBRDBCO0FBS2pDQyxXQUFVO0FBQ1RGLFNBQU8sVUFERTtBQUVUQyxTQUFPO0FBRkUsRUFMdUI7QUFTakNFLFNBQVE7QUFDUEgsU0FBTyxVQURBO0FBRVBDLFNBQU87QUFGQTtBQVR5QixDQUFsQzs7QUFlTyxJQUFNRyxvQkFBb0IsS0FBMUI7O0FBRVA7Ozs7Ozs7Ozs7Ozs7OztBQWVBLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUNwQkMsUUFEb0IsRUFFcEJDLFNBRm9CLEVBS2hCO0FBQUEsS0FGSkMsaUJBRUksdUVBRmdCLEVBRWhCO0FBQUEsS0FESkMsR0FDSSx1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QUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNGQUFzRixhQUFhO0FBQ25HO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSw0RkFBNEYsZUFBZTtBQUMzRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFNQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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R0FBZ0c7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsK0JBQStCO0FBQzlFOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCOztBQUU3RDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMkJBQTJCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDOztBQUV2Qzs7QUFFQSw0QkFBNEIsK0JBQStCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXLHNCQUFzQjtBQUNqQztBQUNBO0FBQ0EscUZBQThDLHVCQUF1QjtBQUNyRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1IQUFtSDtBQUMxSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw4QkFBOEIsdUJBQXVCO0FBQ3JEO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDs7O0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNEQUFzRDtBQUNuRixXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpR0FBMEQ7QUFDMUQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNHQUErRDtBQUMvRDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNROzs7Ozs7Ozs7Ozs7QUM5OUhSO0FBQ0E7QUFDQSxXQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMvQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7QUNuQkEsc0I7Ozs7Ozs7Ozs7O0FDQUEsMkI7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEseUI7Ozs7Ozs7Ozs7O0FDQUEsNEI7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoiZWUtY29tcG9uZW50cy5iZTQzZGJkYWM5ZjZhZDNkODQ2Yi5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgcmVkdWNlIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBBIGRlZmF1bHQgbWFwIHVzZWQgZm9yIG1hcHBpbmcgb3B0aW9ucyBmb3Igc2VsZWN0LlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgREVGQVVMVF9NT0RFTF9PUFRJT05TX01BUCA9IHtcblx0ZXZlbnQ6IHtcblx0XHRsYWJlbDogJ0VWVF9uYW1lJyxcblx0XHR2YWx1ZTogJ0VWVF9JRCcsXG5cdH0sXG5cdGRhdGV0aW1lOiB7XG5cdFx0bGFiZWw6ICdEVFRfbmFtZScsXG5cdFx0dmFsdWU6ICdEVFRfSUQnLFxuXHR9LFxuXHR0aWNrZXQ6IHtcblx0XHRsYWJlbDogJ1RLVF9uYW1lJyxcblx0XHR2YWx1ZTogJ1RLVF9JRCcsXG5cdH0sXG59O1xuXG5leHBvcnQgY29uc3QgT1BUSU9OX1NFTEVDVF9BTEwgPSAnQUxMJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBhcnJheSBvZiBldmVudCBlbnRpdGllcyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBzaW1wbGUgb2JqZWN0c1xuICogdGhhdCBjYW4gYmUgcGFzc2VkIGFsb25nIHRvIHRoZSBvcHRpb25zIGFycmF5IHVzZWQgZm9yIHRoZSBXb3JkUHJlc3NcbiAqIFNlbGVjdENvbnRyb2wgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXNcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1vZGVsTmFtZVxuICogQHBhcmFtIHsgc3RyaW5nIH0gYWRkQWxsT3B0aW9uTGFiZWwgIElmIHByZXNlbnQgdGhlbiBvcHRpb25zIGFycmF5IHdpbGwgYmVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJlcGVuZGVkIHdpdGggYW4gXCJBTExcIiBvcHRpb24gbWVhbmluZ1xuICogXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGF0IGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZC5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG1hcFxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYW4gYXJyYXkgb2Ygc2ltcGxlIG9iamVjdHMgZm9ybWF0dGVkIGZvciBhbnlcbiAqIHNlbGVjdCBjb250cm9sIHRoYXQgcmVjZWl2ZXMgaXRzIG9wdGlvbnMgaW4gdGhlIGZvcm1hdCBvZiBhbiBhcnJheSBvZiBvYmplY3RzXG4gKiB3aXRoIGxhYmVsIGFuZCB2YWx1ZSBrZXlzLlxuICovXG5jb25zdCBidWlsZE9wdGlvbnMgPSAoXG5cdGVudGl0aWVzLFxuXHRtb2RlbE5hbWUsXG5cdGFkZEFsbE9wdGlvbkxhYmVsID0gJycsXG5cdG1hcCA9IERFRkFVTFRfTU9ERUxfT1BUSU9OU19NQVAsXG4pID0+IHtcblx0Y29uc3QgTUFQX0ZPUl9NT0RFTCA9IG1hcFsgbW9kZWxOYW1lIF0gPyBtYXBbIG1vZGVsTmFtZSBdIDogZmFsc2U7XG5cdGNvbnN0IGdlbmVyYXRlZE9wdGlvbnMgPSBlbnRpdGllcyAmJiBNQVBfRk9SX01PREVMID9cblx0XHRyZWR1Y2UoIGVudGl0aWVzLCBmdW5jdGlvbiggb3B0aW9ucywgZW50aXR5ICkge1xuXHRcdFx0aWYgKCBlbnRpdHlbIE1BUF9GT1JfTU9ERUwubGFiZWwgXSAmJlxuXHRcdFx0XHRlbnRpdHlbIE1BUF9GT1JfTU9ERUwudmFsdWUgXSApIHtcblx0XHRcdFx0b3B0aW9ucy5wdXNoKFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxhYmVsOiBlbnRpdHlbIE1BUF9GT1JfTU9ERUwubGFiZWwgXSxcblx0XHRcdFx0XHRcdHZhbHVlOiBlbnRpdHlbIE1BUF9GT1JfTU9ERUwudmFsdWUgXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSwgW10gKSA6XG5cdFx0W107XG5cdGlmICggZW50aXRpZXMgJiYgYWRkQWxsT3B0aW9uTGFiZWwgIT09ICcnICkge1xuXHRcdGdlbmVyYXRlZE9wdGlvbnMudW5zaGlmdCgge1xuXHRcdFx0bGFiZWw6IGFkZEFsbE9wdGlvbkxhYmVsLFxuXHRcdFx0dmFsdWU6IE9QVElPTl9TRUxFQ1RfQUxMLFxuXHRcdH0gKTtcblx0fVxuXHRyZXR1cm4gZ2VuZXJhdGVkT3B0aW9ucztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkT3B0aW9ucztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuZXhwb3J0IGNvbnN0IFJFQUNUX1NFTEVDVF9UWVBFUyA9IHtcblx0J2FyaWEtZGVzY3JpYmVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHQnYXJpYS1sYWJlbCc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdCdhcmlhLWxhYmVsbGVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuXHRiYWNrc3BhY2VSZW1vdmVzVmFsdWU6IFByb3BUeXBlcy5ib29sLFxuXHRibHVySW5wdXRPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG5cdGNhcHR1cmVNZW51U2Nyb2xsOiBQcm9wVHlwZXMuYm9vbCxcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRjbGFzc05hbWVQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGNsb3NlTWVudU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcblx0Y29tcG9uZW50czogUHJvcFR5cGVzLm9iamVjdCxcblx0Y29udHJvbFNob3VsZFJlbmRlclZhbHVlOiBQcm9wVHlwZXMuYm9vbCxcblx0ZGVsaW1pdGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRlc2NhcGVDbGVhcnNWYWx1ZTogUHJvcFR5cGVzLmJvb2wsXG5cdGZpbHRlck9wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG5cdGZvcm1hdEdyb3VwTGFiZWw6IFByb3BUeXBlcy5mdW5jLFxuXHRmb3JtYXRPcHRpb25MYWJlbDogUHJvcFR5cGVzLmZ1bmMsXG5cdGdldE9wdGlvbkxhYmVsOiBQcm9wVHlwZXMuZnVuYyxcblx0Z2V0T3B0aW9uVmFsdWU6IFByb3BUeXBlcy5mdW5jLFxuXHRoaWRlU2VsZWN0ZWRPcHRpb25zOiBQcm9wVHlwZXMuYm9vbCxcblx0aWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGlucHV0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGlucHV0SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGluc3RhbmNlSWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoIFtcblx0XHRQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdF0gKSxcblx0aXNDbGVhcmFibGU6IFByb3BUeXBlcy5ib29sLFxuXHRpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0aXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcblx0aXNPcHRpb25EaXNhYmxlZDogUHJvcFR5cGVzLmZ1bmMsXG5cdGlzT3B0aW9uU2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuXHRpc011bHRpOiBQcm9wVHlwZXMuYm9vbCxcblx0aXNTZWFyY2hhYmxlOiBQcm9wVHlwZXMuYm9vbCxcblx0bG9hZGluZ01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRtaW5NZW51SGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRtYXhNZW51SGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRtZW51SXNPcGVuOiBQcm9wVHlwZXMuYm9vbCxcblx0bWVudVBsYWNlbWVudDogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0J2F1dG8nLFxuXHRcdCdib3R0b20nLFxuXHRcdCd0b3AnLFxuXHRdICksXG5cdG1lbnVQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0J2Fic29sdXRlJyxcblx0XHQnZml4ZWQnLFxuXHRdICksXG5cdG1lbnVQb3J0YWxUYXJnZXQ6IFByb3BUeXBlcy5lbGVtZW50LFxuXHRtZW51U2hvdWxkQmxvY2tTY3JvbGw6IFByb3BUeXBlcy5ib29sLFxuXHRtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXc6IFByb3BUeXBlcy5ib29sLFxuXHRuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRub09wdGlvbnNNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcblx0b25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcblx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcblx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uTWVudU9wZW46IFByb3BUeXBlcy5mdW5jLFxuXHRvbk1lbnVDbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uTWVudVNjcm9sbFRvVG9wOiBQcm9wVHlwZXMuZnVuYyxcblx0b25NZW51U2Nyb2xsVG9Cb3R0b206IFByb3BUeXBlcy5mdW5jLFxuXHRvcGVuTWVudU9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuXHRvcGVuTWVudU9uQ2xpY2s6IFByb3BUeXBlcy5ib29sLFxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksXG5cdHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0c2NyZWVuUmVhZGVyU3RhdHVzOiBQcm9wVHlwZXMuZnVuYyxcblx0c3R5bGVzOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRjbGVhckluZGljYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0Y29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRjb250cm9sOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRkcm9wZG93bkluZGljYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0Z3JvdXA6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGdyb3VwSGVhZGluZzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aW5kaWNhdG9yc0NvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aW5kaWNhdG9yU2VwYXJhdG9yOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpbnB1dDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bG9hZGluZ0luZGljYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bG9hZGluZ01lc3NhZ2VDU1M6IFByb3BUeXBlcy5mdW5jLFxuXHRcdG1lbnU6IFByb3BUeXBlcy5mdW5jLFxuXHRcdG1lbnVMaXN0OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRtZW51UG9ydGFsOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRtdWx0aVZhbHVlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRtdWx0aVZhbHVlTGFiZWw6IFByb3BUeXBlcy5mdW5jLFxuXHRcdG11bHRpVmFsdWVSZW1vdmU6IFByb3BUeXBlcy5mdW5jLFxuXHRcdG5vT3B0aW9uc01lc3NhZ2VDU1M6IFByb3BUeXBlcy5mdW5jLFxuXHRcdG9wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0cGxhY2Vob2xkZXI6IFByb3BUeXBlcy5mdW5jLFxuXHRcdHNpbmdsZVZhbHVlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHR2YWx1ZUNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG5cdH0gKSxcblx0dGFiSW5kZXg6IFByb3BUeXBlcy5zdHJpbmcsXG5cdHRhYlNlbGVjdHNWYWx1ZTogUHJvcFR5cGVzLmJvb2wsXG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKCBbXG5cdFx0UHJvcFR5cGVzLm9iamVjdCxcblx0XHRQcm9wVHlwZXMuYXJyYXksXG5cdF0gKSxcbn07XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9TRUxFQ1RfREVGQVVMVFMgPSB7XG5cdGlzQ2xlYXJhYmxlOiB0cnVlLFxuXHRpc0xvYWRpbmc6IHRydWUsXG5cdHBsYWNlaG9sZGVyOiBfXyggJ1NlbGVjdC4uLicsICdldmVudF9lc3ByZXNzbycgKSxcbn07XG4iLCJleHBvcnQgeyBNb2RlbFNlbGVjdCwgZGVmYXVsdCBhcyBNb2RlbEVuaGFuY2VkU2VsZWN0IH0gZnJvbSAnLi9tb2RlbC1zZWxlY3QnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC1zZWxlY3RzJztcbmV4cG9ydCAqIGZyb20gJy4vYnVpbGQtb3B0aW9ucyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBpc0VtcHR5LCB1bmlxdWVJZCwgZmluZCwgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBXUCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgd2l0aFNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgYnVpbGRPcHRpb25zIGZyb20gJy4vYnVpbGQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNT0RFTF9OQU1FUyB9IGZyb20gJy4uLy4uLy4uL2RhdGEvbW9kZWwnO1xuaW1wb3J0IHtcblx0UkVBQ1RfU0VMRUNUX0RFRkFVTFRTLFxuXHRSRUFDVF9TRUxFQ1RfVFlQRVMsXG59IGZyb20gJy4vZGVmYXVsdC1zZWxlY3QtY29uZmlndXJhdGlvbic7XG5cbi8qKlxuICogTW9kZWxTZWxlY3QgY29tcG9uZW50LlxuICogVGhpcyBpcyBhIGNvbXBvbmVudCB0aGF0IHdpbGwgZ2VuZXJhdGUgYSByZWFjdC1zZWxlY3QgaW5wdXQgZm9yIGEgZ2l2ZW5cbiAqIG1vZGVsIGFuZCBpdHMgZW50aXRpZXMgKHByb3ZpZGVkIHZpYSBwcm9wcykuXG4gKlxuICogQHNlZSBodHRwczovL2RlcGxveS1wcmV2aWV3LTIyODktLXJlYWN0LXNlbGVjdC5uZXRsaWZ5LmNvbS9wcm9wcyNwcm9wLXR5cGVzXG4gKiAgIGZvciBvcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0aHJvdWdoIHZpYSB0aGUgc2VsZWN0Q29uZmlndXJhdGlvbiBwcm9wLlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHNlbGVjdENvbmZpZ3VyYXRpb24gIEFuIG9iamVjdCBjb250YWluaW5nIG9wdGlvbnMgZm9yIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdC1zZWxlY3QgY29tcG9uZW50LlxuICogQHBhcmFtIHsgQXJyYXkgfSBtb2RlbEVudGl0aWVzICAgICAgICAgIEFycmF5IG9mIG1vZGVsIGVudGl0aWVzXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtb2RlbE5hbWUgICAgICAgICAgICAgIFRoZSBuYW1lIG9mIHRoZSBNb2RlbCB0aGUgZW50aXRpZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVsb25nIHRvLlxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSBtYXBPcHRpb25zQ2FsbGJhY2sgIFRoaXMgZnVuY3Rpb24gd2lsbCByZWNlaXZlIGJ5XG4gKiAgIGRlZmF1bHQgdGhlIG1vZGVsRW50aXRpZXMsIHRoZSBtb2RlbE5hbWUgKGFuZCBhbnkgY3VzdG9tIE1hcCBwcm92aWRlZCkgYW5kXG4gKiAgIGlzIGV4cGVjdGVkIHRvIHJldHVybiBhbiBhcnJheSBvZiBvcHRpb25zIHRvIGJlIHVzZWQgZm9yIHRoZSByZWFjdC1zZWxlY3RcbiAqICAgY29tcG9uZW50LlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb3B0aW9uc0VudGl0eU1hcCAgICBJZiBwcm92aWRlZCwgaXQgaXMgZXhwZWN0ZWQgdG8gYmUgYVxuICogICBtYXAgb2YgbW9kZWxOYW1lIGZpZWxkcyB0byBgbGFiZWxgIGFuZCBgdmFsdWVgIGtleXMgdXNlZCBieVxuICogICBgbWFwT3B0aW9uc0NhbGxiYWNrYC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGVsU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRcdC4uLlJFQUNUX1NFTEVDVF9UWVBFUyxcblx0XHR9ICksXG5cdFx0bW9kZWxFbnRpdGllczogUHJvcFR5cGVzLmFycmF5LFxuXHRcdG1vZGVsTmFtZTogUHJvcFR5cGVzLm9uZU9mKCBNT0RFTF9OQU1FUyApLFxuXHRcdG1hcE9wdGlvbnNDYWxsYmFjazogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b3B0aW9uc0VudGl0eU1hcDogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRvcmRlckJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggWyAnYXNjJywgJ2Rlc2MnIF0gKSxcblx0XHR9ICksXG5cdFx0Z2V0UXVlcnlTdHJpbmc6IFByb3BUeXBlcy5mdW5jLFxuXHRcdHNlbGVjdExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR9O1xuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0c2VsZWN0Q29uZmlndXJhdGlvbjoge1xuXHRcdFx0Li4uUkVBQ1RfU0VMRUNUX0RFRkFVTFRTLFxuXHRcdFx0bmFtZTogdW5pcXVlSWQoICdtb2RlbC1zZWxlY3QtJyApLFxuXHRcdH0sXG5cdFx0bW9kZWxFbnRpdGllczogW10sXG5cdFx0bW9kZWxOYW1lOiAnJyxcblx0XHRtYXBPcHRpb25zQ2FsbGJhY2s6IGJ1aWxkT3B0aW9ucyxcblx0XHRvcHRpb25zRW50aXR5TWFwOiBudWxsLFxuXHRcdHF1ZXJ5RGF0YToge1xuXHRcdFx0bGltaXQ6IDEwMCxcblx0XHRcdG9yZGVyOiAnZGVzYycsXG5cdFx0fSxcblx0XHRzZWxlY3RMYWJlbDogJycsXG5cdFx0YWRkQWxsT3B0aW9uTGFiZWw6ICcnLFxuXHR9O1xuXG5cdHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIHByb3BzICkge1xuXHRcdGNvbnN0IHsgc2VsZWN0Q29uZmlndXJhdGlvbiB9ID0gcHJvcHM7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IE1vZGVsU2VsZWN0LmdldE9wdGlvbnMoIHByb3BzICk7XG5cdFx0Y29uc3QgdXBkYXRlZCA9IHtcblx0XHRcdG9wdGlvbnMsXG5cdFx0XHR2YWx1ZTogTW9kZWxTZWxlY3QuZ2V0T3B0aW9uT2JqZWN0Rm9yVmFsdWUoXG5cdFx0XHRcdHNlbGVjdENvbmZpZ3VyYXRpb24uZGVmYXVsdFZhbHVlLCBvcHRpb25zXG5cdFx0XHQpLFxuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLlJFQUNUX1NFTEVDVF9ERUZBVUxUUyxcblx0XHRcdC4uLnNlbGVjdENvbmZpZ3VyYXRpb24sXG5cdFx0XHQuLi51cGRhdGVkLFxuXHRcdH07XG5cdH1cblxuXHRzdGF0aWMgZ2V0T3B0aW9ucyggcHJvcHMgKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0bW9kZWxFbnRpdGllcyxcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdG9wdGlvbnNFbnRpdHlNYXAsXG5cdFx0XHRtYXBPcHRpb25zQ2FsbGJhY2ssXG5cdFx0XHRhZGRBbGxPcHRpb25MYWJlbCxcblx0XHR9ID0gcHJvcHM7XG5cdFx0aWYgKCAhIGlzRW1wdHkoIG1vZGVsRW50aXRpZXMgKSApIHtcblx0XHRcdHJldHVybiBvcHRpb25zRW50aXR5TWFwICE9PSBudWxsID9cblx0XHRcdFx0bWFwT3B0aW9uc0NhbGxiYWNrKFxuXHRcdFx0XHRcdG1vZGVsRW50aXRpZXMsXG5cdFx0XHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0XHRcdGFkZEFsbE9wdGlvbkxhYmVsLFxuXHRcdFx0XHRcdG9wdGlvbnNFbnRpdHlNYXAsXG5cdFx0XHRcdCkgOlxuXHRcdFx0XHRtYXBPcHRpb25zQ2FsbGJhY2soXG5cdFx0XHRcdFx0bW9kZWxFbnRpdGllcyxcblx0XHRcdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRcdFx0YWRkQWxsT3B0aW9uTGFiZWwsXG5cdFx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdHN0YXRpYyBnZXRPcHRpb25PYmplY3RGb3JWYWx1ZSggdmFsdWUsIG9wdGlvbnMgKSB7XG5cdFx0aWYgKCAhIGlzRW1wdHkoIG9wdGlvbnMgKSApIHtcblx0XHRcdGNvbnN0IG1hdGNoID0gZmluZCggb3B0aW9ucywgZnVuY3Rpb24oIG9wdGlvbiApIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbi52YWx1ZSA9PT0gdmFsdWU7XG5cdFx0XHR9ICk7XG5cdFx0XHRyZXR1cm4gISBpc1VuZGVmaW5lZCggbWF0Y2ggKSA/XG5cdFx0XHRcdG1hdGNoIDpcblx0XHRcdFx0bnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHt9O1xuXHR9XG5cblx0Z2V0U2VsZWN0TGFiZWwoKSB7XG5cdFx0Y29uc3QgeyBzZWxlY3RMYWJlbCwgc2VsZWN0Q29uZmlndXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRyZXR1cm4gc2VsZWN0TGFiZWwgP1xuXHRcdFx0PGxhYmVsIGh0bWxGb3I9eyBzZWxlY3RDb25maWd1cmF0aW9uLm5hbWUgfT57IHNlbGVjdExhYmVsIH08L2xhYmVsPiA6XG5cdFx0XHQnJztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEZyYWdtZW50PlxuXHRcdFx0XHR7IHRoaXMuZ2V0U2VsZWN0TGFiZWwoKSB9XG5cdFx0XHRcdDxTZWxlY3QgeyAuLi50aGlzLnN0YXRlIH0gLz5cblx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0KTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBNb2RlbFNlbGVjdCBDb21wb25lbnQgd3JhcHBlZCBpbiB0aGUgYHdpdGhTZWxlY3RgIGhpZ2hlciBvcmRlciBjb21wb25lbnQuXG4gKiBUaGlzIHN1YnNjcmliZXMgdGhlIE1vZGVsU2VsZWN0IGNvbXBvbmVudCB0byB0aGUgc3RhdGUgbWFpbnRhaW5lZCB2aWEgdGhlXG4gKiBldmVudGVzcHJlc3NvL2xpc3RzIHN0b3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCB3aXRoU2VsZWN0KCAoIHNlbGVjdCwgb3duUHJvcHMgKSA9PiB7XG5cdGNvbnN0IHsgZ2V0UXVlcnlTdHJpbmcsIG1vZGVsTmFtZSwgc2VsZWN0Q29uZmlndXJhdGlvbiB9ID0gb3duUHJvcHM7XG5cdGNvbnN0IHF1ZXJ5U3RyaW5nID0gZ2V0UXVlcnlTdHJpbmcoIG93blByb3BzLnF1ZXJ5RGF0YSApO1xuXHRjb25zdCB7IGdldEl0ZW1zLCBpc1JlcXVlc3RpbmdJdGVtcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9saXN0cycgKTtcblx0cmV0dXJuIHtcblx0XHQuLi5Nb2RlbFNlbGVjdC5kZWZhdWx0UHJvcHMsXG5cdFx0Li4ub3duUHJvcHMsXG5cdFx0bW9kZWxFbnRpdGllczogZ2V0SXRlbXMoIG1vZGVsTmFtZSwgcXVlcnlTdHJpbmcgKSxcblx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiB7XG5cdFx0XHQuLi5Nb2RlbFNlbGVjdC5kZWZhdWx0UHJvcHMuc2VsZWN0Q29uZmlndXJhdGlvbixcblx0XHRcdC4uLnNlbGVjdENvbmZpZ3VyYXRpb24sXG5cdFx0XHRpc0xvYWRpbmc6IGlzUmVxdWVzdGluZ0l0ZW1zKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nICksXG5cdFx0fSxcblx0fTtcbn0gKSggTW9kZWxTZWxlY3QgKTtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgTW9kZWxTZWxlY3QgZnJvbSAnLi4vbW9kZWwtc2VsZWN0JztcbmltcG9ydCAqIGFzIGRhdGV0aW1lTW9kZWwgZnJvbSAnLi4vLi4vLi4vLi4vZGF0YS9tb2RlbC9kYXRldGltZSc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIFNlbGVjdCBDb21wb25lbnQgZm9yIHRoZSBEYXRldGltZSBNb2RlbC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZXRpbWVTZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0ZSA9IHtcblx0XHRtb2RlbE5hbWU6ICdkYXRldGltZScsXG5cdH07XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiB7XG5cdFx0XHRsb2FkaW5nTWVzc2FnZTogKCkgPT4gX18oICdSZXRyaWV2aW5nIERhdGV0aW1lcy4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRub09wdGlvbnNNZXNzYWdlOiAoKSA9PiBfXyhcblx0XHRcdFx0J05vIERhdGV0aW1lcy4nLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0KSxcblx0XHRcdHBsYWNlaG9sZGVyOiBfXyggJ1NlbGVjdCBEYXRldGltZS4uLicsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHR9LFxuXHRcdC4uLmRhdGV0aW1lTW9kZWwuZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRnZXRRdWVyeVN0cmluZzogZGF0ZXRpbWVNb2RlbC5nZXRRdWVyeVN0cmluZyxcblx0XHRzZWxlY3RMYWJlbDogX18oICdTZWxlY3QgRGF0ZXRpbWUnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0YWRkQWxsT3B0aW9uTGFiZWw6IF9fKCAnQWxsIERhdGV0aW1lcycsICdldmVudF9lc3ByZXNzbycgKSxcblx0fTtcblxuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdC4uLmRhdGV0aW1lTW9kZWwucXVlcnlEYXRhVHlwZXMsXG5cdFx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzZWxlY3RlZERhdGV0aW1lSWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoIFtcblx0XHRcdFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdF0gKSxcblx0XHRvbkRhdGV0aW1lU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRzZWxlY3RMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0fTtcblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3QgeyBzZWxlY3RlZERhdGV0aW1lSWQsIG9uRGF0ZXRpbWVTZWxlY3QgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3Qgc2VsZWN0T3B0cyA9IHtcblx0XHRcdHNlbGVjdENvbmZpZ3VyYXRpb246IHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiBzZWxlY3RlZERhdGV0aW1lSWQsXG5cdFx0XHRcdG9uQ2hhbmdlOiBvbkRhdGV0aW1lU2VsZWN0LFxuXHRcdFx0XHQuLi50aGlzLnByb3BzLnNlbGVjdENvbmZpZ3VyYXRpb24sXG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHQuLi50aGlzLnByb3BzLFxuXHRcdFx0Li4uc2VsZWN0T3B0cyxcblx0XHRcdC4uLnRoaXMuc3RhdGUsXG5cdFx0fTtcblx0XHRyZXR1cm4gPE1vZGVsU2VsZWN0IHsgLi4ucHJvcHMgfSAvPjtcblx0fVxufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBNb2RlbFNlbGVjdCBmcm9tICcuLi9tb2RlbC1zZWxlY3QnO1xuaW1wb3J0ICogYXMgZXZlbnRNb2RlbCBmcm9tICcuLi8uLi8uLi8uLi9kYXRhL21vZGVsL2V2ZW50JztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBTZWxlY3QgQ29tcG9uZW50IGZvciB0aGUgRXZlbnQgTW9kZWwuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50U2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGUgPSB7XG5cdFx0bW9kZWxOYW1lOiAnZXZlbnQnLFxuXHR9O1xuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0c2VsZWN0Q29uZmlndXJhdGlvbjoge1xuXHRcdFx0bG9hZGluZ01lc3NhZ2U6ICgpID0+IF9fKCAnUmV0cmlldmluZyBFdmVudHMuJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0bm9PcHRpb25zTWVzc2FnZTogKCkgPT4gX18oXG5cdFx0XHRcdCdObyBFdmVudHMuJyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHRcdCksXG5cdFx0XHRwbGFjZWhvbGRlcjogX18oICdTZWxlY3QgRXZlbnQuLi4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0fSxcblx0XHQuLi5ldmVudE1vZGVsLmRlZmF1bHRRdWVyeURhdGEsXG5cdFx0Z2V0UXVlcnlTdHJpbmc6IGV2ZW50TW9kZWwuZ2V0UXVlcnlTdHJpbmcsXG5cdFx0c2VsZWN0TGFiZWw6IF9fKCAnU2VsZWN0IEV2ZW50JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHR9O1xuXG5cdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0Li4uZXZlbnRNb2RlbC5xdWVyeURhdGFUeXBlcyxcblx0XHRzZWxlY3RlZEV2ZW50SWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoIFtcblx0XHRcdFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdF0gKSxcblx0XHRvbkV2ZW50U2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRzZWxlY3RMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0fTtcblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3QgeyBzZWxlY3RlZEV2ZW50SWQsIG9uRXZlbnRTZWxlY3QgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3Qgc2VsZWN0T3B0cyA9IHtcblx0XHRcdHNlbGVjdENvbmZpZ3VyYXRpb246IHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiBzZWxlY3RlZEV2ZW50SWQsXG5cdFx0XHRcdG9uQ2hhbmdlOiBvbkV2ZW50U2VsZWN0LFxuXHRcdFx0XHQuLi50aGlzLnByb3BzLnNlbGVjdENvbmZpZ3VyYXRpb24sXG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHQuLi50aGlzLnByb3BzLFxuXHRcdFx0Li4uc2VsZWN0T3B0cyxcblx0XHRcdC4uLnRoaXMuc3RhdGUsXG5cdFx0fTtcblx0XHRyZXR1cm4gPE1vZGVsU2VsZWN0IHsgLi4ucHJvcHMgfSAvPjtcblx0fVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBFdmVudFNlbGVjdCB9IGZyb20gJy4vZXZlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEYXRldGltZVNlbGVjdCB9IGZyb20gJy4vZGF0ZXRpbWUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUaWNrZXRTZWxlY3QgfSBmcm9tICcuL3RpY2tldCc7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IE1vZGVsU2VsZWN0IGZyb20gJy4uL21vZGVsLXNlbGVjdCc7XG5pbXBvcnQgKiBhcyB0aWNrZXRNb2RlbCBmcm9tICcuLi8uLi8uLi8uLi9kYXRhL21vZGVsL3RpY2tldCc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIFNlbGVjdCBDb21wb25lbnQgZm9yIHRoZSBUaWNrZXQgTW9kZWwuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tldFNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRlID0ge1xuXHRcdG1vZGVsTmFtZTogJ3RpY2tldCcsXG5cdH07XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiB7XG5cdFx0XHRsb2FkaW5nTWVzc2FnZTogKCkgPT4gX18oICdSZXRyaWV2aW5nIFRpY2tldHMuJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0bm9PcHRpb25zTWVzc2FnZTogKCkgPT4gX18oICdObyBUaWNrZXRzLicsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdHBsYWNlaG9sZGVyOiBfXyggJ1NlbGVjdCBUaWNrZXQuLi4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0fSxcblx0XHQuLi50aWNrZXRNb2RlbC5kZWZhdWx0UXVlcnlEYXRhLFxuXHRcdGdldFF1ZXJ5U3RyaW5nOiB0aWNrZXRNb2RlbC5nZXRRdWVyeVN0cmluZyxcblx0XHRzZWxlY3RMYWJlbDogX18oICdTZWxlY3QgVGlja2V0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiBfXyggJ0FsbCBUaWNrZXRzJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHR9O1xuXG5cdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0Li4udGlja2V0TW9kZWwucXVlcnlEYXRhVHlwZXMsXG5cdFx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRmb3JEYXRldGltZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHNlbGVjdGVkVGlja2V0SWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoIFtcblx0XHRcdFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdF0gKSxcblx0XHRvblRpY2tldFNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0c2VsZWN0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH07XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHsgc2VsZWN0ZWRUaWNrZXRJZCwgb25UaWNrZXRTZWxlY3QgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3Qgc2VsZWN0T3B0cyA9IHtcblx0XHRcdHNlbGVjdENvbmZpZ3VyYXRpb246IHtcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiBzZWxlY3RlZFRpY2tldElkLFxuXHRcdFx0XHRvbkNoYW5nZTogb25UaWNrZXRTZWxlY3QsXG5cdFx0XHRcdC4uLnRoaXMucHJvcHMuc2VsZWN0Q29uZmlndXJhdGlvbixcblx0XHRcdH0sXG5cdFx0fTtcblx0XHRjb25zdCBwcm9wcyA9IHtcblx0XHRcdC4uLnRoaXMucHJvcHMsXG5cdFx0XHQuLi5zZWxlY3RPcHRzLFxuXHRcdFx0Li4udGhpcy5zdGF0ZSxcblx0XHR9O1xuXHRcdHJldHVybiA8TW9kZWxTZWxlY3QgeyAuLi5wcm9wcyB9IC8+O1xuXHR9XG59XG4iLCIvLyBxdWVyeSBjb21wb25lbnRzXG5leHBvcnQgeyBRdWVyeUxpbWl0IH0gZnJvbSAnLi9xdWVyeS9saW1pdCc7XG4vLyBzZWxlY3Rpb24gY29tcG9uZW50c1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtL3NlbGVjdCc7XG5leHBvcnQge1xuXHRkZWZhdWx0IGFzIFJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdCxcbn0gZnJvbSAnLi9zZWxlY3Rpb24vcmVnaXN0cmF0aW9uLXN0YXR1cy1zZWxlY3QnO1xuXG4vLyBnZW5lcmFsIHVpIGNvbXBvbmVudHNcbmV4cG9ydCAqIGZyb20gJy4vdWknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKiovXG5pbXBvcnQgeyBSYW5nZUNvbnRyb2wgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvbmVudHMnO1xuXG5jb25zdCBERUZBVUxUX0xJTUlUID0gMTA7XG5jb25zdCBERUZBVUxUX0xBQkVMID0gX18oICdMaW1pdCcsICdldmVudF9lc3ByZXNzbycgKTtcbmNvbnN0IERFRkFVTFRfTUlOID0gMTtcbmNvbnN0IERFRkFVTFRfTUFYID0gMTAwO1xuXG5leHBvcnQgY29uc3QgUXVlcnlMaW1pdCA9ICgge1xuXHRvbkxpbWl0Q2hhbmdlLFxuXHRsaW1pdCA9IERFRkFVTFRfTElNSVQsXG5cdGxhYmVsID0gREVGQVVMVF9MQUJFTCxcblx0bWluID0gREVGQVVMVF9NSU4sXG5cdG1heCA9IERFRkFVTFRfTUFYLFxufSApID0+IHtcblx0cmV0dXJuICEgb25MaW1pdENoYW5nZSA/IChcblx0XHRudWxsXG5cdCkgOiAoXG5cdFx0PFJhbmdlQ29udHJvbFxuXHRcdFx0a2V5PXsgJ3F1ZXJ5LWxpbWl0JyB9XG5cdFx0XHR2YWx1ZT17IGxpbWl0IH1cblx0XHRcdGxhYmVsPXsgbGFiZWwgfVxuXHRcdFx0bWluPXsgbWluIH1cblx0XHRcdG1heD17IG1heCB9XG5cdFx0XHRvbkNoYW5nZT17IG9uTGltaXRDaGFuZ2UgfVxuXHRcdC8+XG5cdCk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSAncXVlcnlzdHJpbmdpZnknO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQsIHBpY2tCeSwgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IFBsYWNlaG9sZGVyLCBTZWxlY3RDb250cm9sLCBTcGlubmVyIH0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb25lbnRzJztcbmltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdE9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqIFJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdCBjb21wb25lbnQuXG4gKiBHZW5lcmF0ZXMgYSByZWdpc3RyYXRpb24gc3RhdHVzIHNlbGVjdCBpbnB1dC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSByZWdTdGF0dXNlcyAgICAgICAgICAgQW4gZW1wdHkgYXJyYXkgb3IgYXJyYXkgb2YgU3RhdHVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGl0aWVzLiBTZWUgcHJvcC10eXBlcyBmb3Igc2hhcGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlZ1N0YXR1c1NlbGVjdCAgICBUaGUgY2FsbGJhY2sgb24gc2VsZWN0aW9uIG9mIHRpY2tldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RMYWJlbCAgICAgICAgVGhlIGxhYmVsIGZvciB0aGUgc2VsZWN0IGlucHV0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNlbGVjdGVkUmVnU3RhdHVzSWQgIFRoZSBJRCBvZiB0aGUgdGlja2V0IHRvIHByZS1zZWxlY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzTG9hZGluZyAgICAgICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBzZWxlY3RvciBzaG91bGRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgaW4gYSBsb2FkaW5nIHN0YXRlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICAgICAgICAgICAgIEEgcHVyZSBjb21wb25lbnQgZnVuY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgUmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRyZWdTdGF0dXNlczogUHJvcFR5cGVzLmFycmF5T2YoIFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdFx0U1RTX0lEOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0XHRTVFNfY29kZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdH0gKSApLFxuXHRcdG9uUmVnU3RhdHVzU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRzZWxlY3RMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZWxlY3RlZFJlZ1N0YXR1c0lkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG5cdFx0YWRkQWxsT3B0aW9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRhZGRBbGxPcHRpb25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRhdHRyaWJ1dGVzOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIFsgJ2FzYycsICdkZXNjJyBdICksXG5cdFx0fSApLFxuXHR9O1xuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0cmVnU3RhdHVzZXM6IFtdLFxuXHRcdHNlbGVjdExhYmVsOiBfXyggJ1NlbGVjdCBSZWdpc3RyYXRpb24gU3RhdHVzJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdHNlbGVjdGVkUmVnU3RhdHVzSWQ6IDAsXG5cdFx0aXNMb2FkaW5nOiB0cnVlLFxuXHRcdGFkZEFsbE9wdGlvbjogdHJ1ZSxcblx0XHRhZGRBbGxPcHRpb25MYWJlbDogX18oICdBbGwgUmVnaXN0cmF0aW9uIFN0YXR1c2VzJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdGxpbWl0OiAyNSxcblx0XHRcdG9yZGVyQnk6ICdTVFNfY29kZScsXG5cdFx0XHRvcmRlcjogJ2Rlc2MnLFxuXHRcdH0sXG5cdH07XG5cblx0cGxhY2VIb2xkZXIoKSB7XG5cdFx0Y29uc3QgeyBpc0xvYWRpbmcsIHNlbGVjdExhYmVsIH0gPSB0aGlzLnByb3BzO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdDxQbGFjZWhvbGRlclxuXHRcdFx0XHRcdGljb249XCJjbGlwYm9hcmRcIlxuXHRcdFx0XHRcdGxhYmVsPXsgc2VsZWN0TGFiZWwgfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0eyBpc0xvYWRpbmcgP1xuXHRcdFx0XHRcdFx0PFNwaW5uZXIgLz4gOlxuXHRcdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHRcdCdFcnJvciBsb2FkaW5nIFJlZ2lzdHJhdGlvbiBTdGF0dXNlcyEnLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9QbGFjZWhvbGRlcj5cblx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRyZWdTdGF0dXNlcyxcblx0XHRcdHNlbGVjdExhYmVsLFxuXHRcdFx0c2VsZWN0ZWRSZWdTdGF0dXNJZCxcblx0XHRcdG9uUmVnU3RhdHVzU2VsZWN0LFxuXHRcdFx0YWRkQWxsT3B0aW9uLFxuXHRcdFx0YWRkQWxsT3B0aW9uTGFiZWwsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKCBpc0VtcHR5KCByZWdTdGF0dXNlcyApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGxhY2VIb2xkZXIoKTtcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxGcmFnbWVudD5cblx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRsYWJlbD17IHNlbGVjdExhYmVsIH1cblx0XHRcdFx0XHR2YWx1ZT17IHNlbGVjdGVkUmVnU3RhdHVzSWQgfVxuXHRcdFx0XHRcdG9wdGlvbnM9e1xuXHRcdFx0XHRcdFx0cmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0T3B0aW9ucyhcblx0XHRcdFx0XHRcdFx0cmVnU3RhdHVzZXMsXG5cdFx0XHRcdFx0XHRcdGFkZEFsbE9wdGlvbixcblx0XHRcdFx0XHRcdFx0YWRkQWxsT3B0aW9uTGFiZWwsXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsgb25SZWdTdGF0dXNTZWxlY3QgfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9GcmFnbWVudD5cblx0XHQpO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIFJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdCBDb21wb25lbnQgd3JhcHBlZCBpbiB0aGUgYHdpdGhTZWxlY3RgIGhpZ2hlclxuICogb3JkZXIgY29tcG9uZW50LiBUaGlzIHN1YnNjcmliZXMgdGhlIFJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdCBjb21wb25lbnQgdG9cbiAqIHRoZSBzdGF0ZSBtYWludGFpbmVkIHZpYSB0aGUgZXZlbnRlc3ByZXNzby9saXN0cyBzdG9yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgd2l0aFNlbGVjdCggKCBzZWxlY3QsIG93blByb3BzICkgPT4ge1xuXHRjb25zdCB7XG5cdFx0YXR0cmlidXRlcyA9IFJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdC5kZWZhdWx0UHJvcHMuYXR0cmlidXRlcyxcblx0fSA9IG93blByb3BzO1xuXHRjb25zdCB7XG5cdFx0c2VsZWN0ZWRSZWdTdGF0dXNJZCxcblx0XHRhZGRBbGxPcHRpb24sXG5cdFx0YWRkQWxsT3B0aW9uTGFiZWwsXG5cdH0gPSBvd25Qcm9wcztcblx0Y29uc3Qge1xuXHRcdGdldFJlZ2lzdHJhdGlvblN0YXR1c3MsXG5cdFx0aXNSZXF1ZXN0aW5nUmVnaXN0cmF0aW9uU3RhdHVzcyxcblx0fSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vbGlzdHMnICk7XG5cdGNvbnN0IHF1ZXJ5QXJncyA9IHtcblx0XHRsaW1pdDogYXR0cmlidXRlcy5saW1pdCxcblx0XHRvcmRlcjogYXR0cmlidXRlcy5vcmRlcixcblx0XHRvcmRlcl9ieTogYXR0cmlidXRlcy5vcmRlckJ5LFxuXHR9O1xuXHRjb25zdCBxdWVyeVN0cmluZyA9IHN0cmluZ2lmeSggcGlja0J5KCBxdWVyeUFyZ3MsXG5cdFx0dmFsdWUgPT4gISBpc1VuZGVmaW5lZCggdmFsdWUgKSxcblx0KSApO1xuXHRyZXR1cm4ge1xuXHRcdHJlZ1N0YXR1c2VzOiBnZXRSZWdpc3RyYXRpb25TdGF0dXNzKCBxdWVyeVN0cmluZyApLFxuXHRcdGlzTG9hZGluZzogaXNSZXF1ZXN0aW5nUmVnaXN0cmF0aW9uU3RhdHVzcyggcXVlcnlTdHJpbmcgKSxcblx0XHRzZWxlY3RlZFJlZ1N0YXR1c0lkOiBzZWxlY3RlZFJlZ1N0YXR1c0lkLFxuXHRcdGFkZEFsbE9wdGlvbjogYWRkQWxsT3B0aW9uLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiBhZGRBbGxPcHRpb25MYWJlbCxcblx0fTtcbn0gKSggUmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0ICk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyByZWR1Y2UgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgRUVfT1BUSU9OX1JFR19TVEFUVVNfU0VMRUNUX0FMTCA9ICdBTExfUkVHX1NUQVRVU0VTJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBhcnJheSBvZiByZWdpc3RyYXRpb24gc3RhdHVzIGVudGl0aWVzXG4gKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBzaW1wbGUgb2JqZWN0c1xuICogdGhhdCBjYW4gYmUgcGFzc2VkIGFsb25nIHRvIHRoZSBvcHRpb25zIGFycmF5XG4gKiB1c2VkIGZvciB0aGUgV29yZFByZXNzIFNlbGVjdENvbnRyb2wgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gcmVnU3RhdHVzZXMgICAgICAgIEFuIGFycmF5IG9mIHJlZ2lzdHJhdGlvbiBzdGF0dXMgZW50aXRpZXNcbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhZGRBbGxPcHRpb24gICAgIElmIHRydWUsIHdpbGwgcHJlcGVuZCBvcHRpb25zIGFycmF5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGFuIFwiQUxMXCIgb3B0aW9uIG1lYW5pbmcgdGhhdCBhbGxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c2VzIGFyZSBlc3NlbnRpYWxseSBzZWxlY3RlZFxuICogQHBhcmFtIHsgc3RyaW5nIH0gYWRkQWxsT3B0aW9uTGFiZWwgbGFiZWwgZGlzcGxheWVkIGZvciBcIkFMTFwiIG9wdGlvblxuICogQHJldHVybiB7IEFycmF5IH0gICAgICAgICAgICAgICAgICAgUmV0dXJucyBhbiBhcnJheSBvZiBzaW1wbGUgb2JqZWN0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkIGZvciB0aGUgV29yZFByZXNzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RDb250cm9sIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdE9wdGlvbnMgPSAoXG5cdHJlZ1N0YXR1c2VzLFxuXHRhZGRBbGxPcHRpb24sXG5cdGFkZEFsbE9wdGlvbkxhYmVsLFxuKSA9PiB7XG5cdGNvbnN0IHJlZ1N0YXR1c09wdGlvbnMgPSByZWR1Y2UoXG5cdFx0cmVnU3RhdHVzZXMsXG5cdFx0ZnVuY3Rpb24oIG9wdGlvbnMsIHN0YXR1cyApIHtcblx0XHRcdG9wdGlvbnMucHVzaChcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHZhbHVlOiBzdGF0dXMuU1RTX0lELFxuXHRcdFx0XHRcdGxhYmVsOiBzdGF0dXMuU1RTX2NvZGUsXG5cdFx0XHRcdH0sXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSxcblx0XHRbXSxcblx0KTtcblx0aWYgKCBhZGRBbGxPcHRpb24gPT09IHRydWUgKSB7XG5cdFx0cmVnU3RhdHVzT3B0aW9ucy51bnNoaWZ0KCB7XG5cdFx0XHR2YWx1ZTogRUVfT1BUSU9OX1JFR19TVEFUVVNfU0VMRUNUX0FMTCxcblx0XHRcdGxhYmVsOiBhZGRBbGxPcHRpb25MYWJlbCxcblx0XHR9ICk7XG5cdH1cblx0cmV0dXJuIHJlZ1N0YXR1c09wdGlvbnM7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBBdmF0YXJJbWFnZVxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IGF2YXRhclVybCAgICAgICAgZ3JhdmF0YXIgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gYXZhdGFyQ2xhc3NcdFx0YmFzZSBDU1MgY2xhc3MgdG8gYXBwbHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBhdmF0YXJIZWlnaHRcdFx0aW1hZ2UgaGVpZ2h0IChkZWZhdWx0ID0gMzJweClcbiAqIEBwYXJhbSB7bnVtYmVyfSBhdmF0YXJXaWR0aCBcdFx0aW1hZ2Ugd2lkdGggKGRlZmF1bHQgPSAzMnB4KVxuICogQHBhcmFtIHtzdHJpbmd9IGF2YXRhckFsdFRleHRcdGltYWdlIGFsdCB0ZXh0XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gIFx0XHRcdFx0QSBwdXJlIGNvbXBvbmVudCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEF2YXRhckltYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRhdmF0YXJVcmw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0YXZhdGFyQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0YXZhdGFySGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGF2YXRhcldpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGF2YXRhckFsdFRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH07XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0YXZhdGFyVXJsOiAnJyxcblx0XHRhdmF0YXJDbGFzczogJ2NvbnRhY3QnLFxuXHRcdGF2YXRhckhlaWdodDogMzIsXG5cdFx0YXZhdGFyV2lkdGg6IDMyLFxuXHRcdGF2YXRhckFsdFRleHQ6IF9fKCAndXNlciBhdmF0YXInLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdH07XG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRhdmF0YXJVcmwsXG5cdFx0XHRhdmF0YXJDbGFzcyxcblx0XHRcdGF2YXRhckhlaWdodCxcblx0XHRcdGF2YXRhcldpZHRoLFxuXHRcdFx0YXZhdGFyQWx0VGV4dCxcblx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRyZXR1cm4gYXZhdGFyVXJsID8gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9eyBhdmF0YXJDbGFzcyArICctaW1hZ2Utd3JhcC1kaXYnIH0+XG5cdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRjbGFzc05hbWU9eyBhdmF0YXJDbGFzcyArICctYXZhdGFyLWltZyBhdmF0YXInIH1cblx0XHRcdFx0XHRzcmM9eyBhdmF0YXJVcmwgfVxuXHRcdFx0XHRcdGhlaWdodD17IGF2YXRhckhlaWdodCB9XG5cdFx0XHRcdFx0d2lkdGg9eyBhdmF0YXJXaWR0aCB9XG5cdFx0XHRcdFx0YWx0PXsgYXZhdGFyQWx0VGV4dCB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpIDogKFxuXHRcdFx0bnVsbFxuXHRcdCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IGlzVW5kZWZpbmVkLCBwaWNrQnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSAncXVlcnlzdHJpbmdpZnknO1xuXG5leHBvcnQgY29uc3QgUVVFUllfT1JERVJfQVNDID0gJ0FTQyc7XG5leHBvcnQgY29uc3QgUVVFUllfT1JERVJfREVTQyA9ICdERVNDJztcbmV4cG9ydCBjb25zdCBBTExPV0VEX09SREVSX1ZBTFVFUyA9IFsgJ2FzYycsICdkZXNjJywgJ0FTQycsICdERVNDJyBdO1xuZXhwb3J0IGNvbnN0IEdSRUFURVJfVEhBTiA9IGVuY29kZVVSSUNvbXBvbmVudCggJz4nICk7XG5leHBvcnQgY29uc3QgTEVTU19USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPCcgKTtcbmV4cG9ydCBjb25zdCBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPj0nICk7XG5leHBvcnQgY29uc3QgTEVTU19USEFOX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJzw9JyApO1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSB3aGVyZUNvbmRpdGlvbnMgIEEgZnVuY3Rpb24gZm9yIHByZXBwaW5nIHRoZSB3aGVyZVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25kaXRpb25zIGZyb20gdGhlIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IGZ1bmN0aW9uIH0gbWFwT3JkZXJCeVx0XHRBIGZ1bmN0aW9uIGZvciBtYXBwaW5nIGluY29taW5nIG9yZGVyX2J5XG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cmluZ3MgdG8gdGhlIHZhbHVlIG5lZWRlZCBmb3IgdGhlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHF1ZXJ5X3N0cmluZy5cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoXG5cdHF1ZXJ5RGF0YSA9IHt9LFxuXHR3aGVyZUNvbmRpdGlvbnMgPSAoKSA9PiBudWxsLFxuXHRtYXBPcmRlckJ5ID0gb3JkZXJCeSA9PiBvcmRlckJ5LFxuKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gd2hlcmVDb25kaXRpb25zKCBxdWVyeURhdGEgKTtcblx0Y29uc3QgeyBsaW1pdCwgb3JkZXIsIG9yZGVyQnkgfSA9IHF1ZXJ5RGF0YTtcblx0Y29uc3QgcXVlcnlBcmdzID0ge1xuXHRcdGxpbWl0LFxuXHRcdG9yZGVyLFxuXHRcdG9yZGVyX2J5OiBtYXBPcmRlckJ5KCBvcmRlckJ5ICksXG5cdH07XG5cdGxldCBxdWVyeVN0cmluZyA9IHN0cmluZ2lmeShcblx0XHRwaWNrQnkoIHF1ZXJ5QXJncywgdmFsdWUgPT4gISBpc1VuZGVmaW5lZCggdmFsdWUgKSApLFxuXHQpO1xuXHRpZiAoIHdoZXJlICkge1xuXHRcdHF1ZXJ5U3RyaW5nICs9ICcmJyArIHdoZXJlO1xuXHR9XG5cdHJldHVybiBxdWVyeVN0cmluZztcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRMRVNTX1RIQU4sXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J0RUVF9uYW1lJyxcblx0XHRcdCdEVFRfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ0RUVF9FVlRfc3RhcnQnLFxuXHRcdGVuZF9kYXRlOiAnRFRUX0VWVF9lbmQnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgIElEIGZvciBFdmVudCB0byByZXRyaWV2ZSBkYXRldGltZXMgZnJvbVxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBtb250aC4gIENhbiBiZSBhbnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICsgTEVTU19USEFOICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICkgIT09IDAgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0V2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGVuZHBvaW50cyB9IGZyb20gJy4vZW5kcG9pbnRzLmpzJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDogW10gfVxuICovXG5jb25zdCBtYXBUb0FycmF5VmFsdWVzID0gbW9kZWxOYW1lRW5kcG9pbnRzID0+IHtcblx0cmV0dXJuIG1hcFZhbHVlcyggbW9kZWxOYW1lRW5kcG9pbnRzLFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH0sXG5cdCk7XG59O1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIG9iamVjdCBtYXAgb2YgbW9kZWxOYW1lIHRvIGVuZHBvaW50IGFuZCBtYXBzIHRoYXQgdG8gYSBkZWZhdWx0XG4gKiBtYXAgb2YgbW9kZWxOYW1lIHRvIGVtcHR5IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDoge30gfVxuICovXG5jb25zdCBtYXBUb09iamVjdFZhbHVlcyA9IG1vZGVsTmFtZUVuZHBvaW50cyA9PiB7XG5cdHJldHVybiBtYXBWYWx1ZXMoIG1vZGVsTmFtZUVuZHBvaW50cyxcblx0XHRmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9LFxuXHQpO1xufTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHN0b3JlcyBjb250YWluaW5nIGxpc3RzLlxuICpcbiAqIEB0eXBlIHsgT2JqZWN0IH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElTVFNfU1RBVEUgPSBtYXBUb0FycmF5VmFsdWVzKCBlbmRwb2ludHMgKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBjb3JlIHN0b3JlLlxuICpcbiAqIEB0eXBlIHt7ZW50aXRpZXM6IHt9LCBlbnRpdHlJZHM6IHt9LCBkaXJ0eToge319fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT1JFX1NUQVRFID0ge1xuXHRlbnRpdGllczoge1xuXHRcdC4uLm1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKSxcblx0fSxcblx0ZW50aXR5SWRzOiB7XG5cdFx0Li4uREVGQVVMVF9MSVNUU19TVEFURSxcblx0fSxcblx0ZGlydHk6IHtcblx0XHQuLi5ERUZBVUxUX0xJU1RTX1NUQVRFLFxuXHR9LFxufTtcblxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbGlkYXRlRW50aXR5SGFzS2V5IH0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBBbGwgYXZhaWxhYmxlIGVuZHBvaW50cyBleHBvc2VkIHZpYSB0aGUgZWVqcy5kYXRhIGdsb2JhbCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBjb2xsZWN0aW9uX2VuZHBvaW50czogZW5kcG9pbnRzID0ge30gfSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdG8gcmV0cmlldmUgdGhlIGVuZHBvaW50IGZvci5cbiAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW5kcG9pbnQgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0dmFsaWRhdGVFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgZW5kcG9pbnRzICk7XG5cdHJldHVybiBlbmRwb2ludHNbIG1vZGVsTmFtZSBdO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBxdWVyeVN0cmluZyB0byB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0aGUgZmluYWwgc3RyaW5nIGlzIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyAgVGhlIHF1ZXJ5IGJlaW5nIGFwcGVuZGVkIHRvIHRoZSBlbmRwb2ludC5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGZpbmFsIGFzc2VtYmxlZCBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseVF1ZXJ5U3RyaW5nID0gKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nICkgPT4ge1xuXHRyZXR1cm4gZ2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApICsgJz8nICsgcXVlcnlTdHJpbmc7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0TEVTU19USEFOLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdFVlRfbmFtZScsXG5cdFx0XHQnRVZUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XHQndGlja2V0X3N0YXJ0Jyxcblx0XHRcdCd0aWNrZXRfZW5kJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Y2F0ZWdvcnlTbHVnOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfZW5kJyxcblx0XHR0aWNrZXRfc3RhcnQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdHRpY2tldF9lbmQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnlTbHVnICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gY2F0ZWdvcnlTbHVnXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguXG4gKiBcdFx0XHRcdFx0XHRcdFx0IENhbiBiZSBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdGNhdGVnb3J5U2x1Zyxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggY2F0ZWdvcnlTbHVnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVGVybV9SZWxhdGlvbnNoaXAuVGVybV9UYXhvbm9teS5UZXJtLnNsdWddPScgKyBjYXRlZ29yeVNsdWdcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZF1bXT0nICsgTEVTU19USEFOICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9kZWZhdWx0LW1vZGVsLXN0YXRlJztcbmV4cG9ydCAqIGZyb20gJy4vZW5kcG9pbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcHJpbWFyeS1rZXlzJztcbmV4cG9ydCAqIGZyb20gJy4vdmFsaWRhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsLW5hbWVzJztcbmV4cG9ydCAqIGZyb20gJy4vYmFzZSc7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgcHJpbWFyeUtleXMgfSBmcm9tICcuL3ByaW1hcnkta2V5cy5qcyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIG1vZGVsIG5hbWVzIGN1cnJlbnRseSBleHBvc2VkIGZvciBSRVNUIEFQSSByZXF1ZXN0LlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRVMgPSBrZXlzKCBwcmltYXJ5S2V5cyApO1xuXG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIHJlZHVjZSwgdHJpbUVuZCwga2V5QnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdHZhbGlkYXRlRW50aXR5SGFzS2V5LFxuXHR2YWxpZGF0ZUlzQXJyYXksXG5cdHZhbGlkYXRlSXNOb3RFbXB0eSxcbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBFeHBvc2VzIGEgbWFwIG9mIG1vZGVsbmFtZSB0byBwcmltYXJ5IGtleSBleHBvc2VkIGJ5IHRoZSBlZWpzLmRhdGEgZ2xvYmFsXG4gKiB2aWEgdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7IHByaW1hcnlfa2V5czogcHJpbWFyeUtleXMgPSB7fSB9ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBjb21iaW5lZCBwcmltYXJ5IGtleXNcbiAqIChkZWxpdmVyZWQgYXMgYW4gYXJyYXkpLlxuICpcbiAqIEB0eXBlIHsgbWVtb2l6ZWQgfVxuICogQHJldHVybiB7IHN0cmluZyB9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIHRoZSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMgPSBtZW1vaXplKCAoIGtleXMsIGVudGl0eSApID0+IHtcblx0dmFsaWRhdGVJc0FycmF5KCBrZXlzICk7XG5cdGNvbnN0IHByaW1hcnlLZXkgPSByZWR1Y2UoIGtleXMsIGZ1bmN0aW9uKCByZXN1bHQsIGtleSApIHtcblx0XHR2YWxpZGF0ZUVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0XHRyZXR1cm4gZW50aXR5WyByZXN1bHQgXSArICc6JyArIGVudGl0eVsga2V5IF07XG5cdH0gKTtcblx0cmV0dXJuIHRyaW1FbmQoIHByaW1hcnlLZXksICc6JyApO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4ga2V5IGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBvbmx5IG9uZSBwcmltYXJ5IGtleS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgbnVtYmVyIH0gVGhlIHZhbHVlIGZvciB0aGUga2V5IGluIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlRm9yUHJpbWFyeUtleSA9IG1lbW9pemUoICgga2V5LCBlbnRpdHkgKSA9PiB7XG5cdHZhbGlkYXRlRW50aXR5SGFzS2V5KCBrZXksIGVudGl0eSApO1xuXHRyZXR1cm4gZW50aXR5WyBrZXkgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleSAob3IgY29tYmluZWQgcHJpbWFyeSBrZXlzKSBmcm9tIHRoZSBhdmFpbGFibGUgZGF0YS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgc3RyaW5nfEFycmF5IH1cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleSA9IG1lbW9pemUoICggbW9kZWxOYW1lICkgPT4ge1xuXHR2YWxpZGF0ZUVudGl0eUhhc0tleSggbW9kZWxOYW1lLCBwcmltYXJ5S2V5cyApO1xuXHRyZXR1cm4gcHJpbWFyeUtleXNbIG1vZGVsTmFtZSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IHN0cmluZyB9ICBJZiB0aGUgbW9kZWwgaGFzIG9ubHkgb25lIHByaW1hcnkga2V5IHRoZW4gdGhlIHZhbHVlIHdpbGxcbiAqIGJlIGEgc2ltcGxlIHN0cmluZy4gIElmIHRoZSBtb2RlbCBoYXMgY29tYmluZWQgcHJpbWFyeSBrZXlzLCB0aGVuIHRoZSB2YWx1ZVxuICogd2lsbCBiZSBhcyBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgJXMuJXNgIGZvciB0aGUgcHJpbWFyeSBrZXkgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzID0gbWVtb2l6ZSggKCBtb2RlbE5hbWUsIGVudGl0eSApID0+IHtcblx0Y29uc3Qga2V5cyA9IGdldFByaW1hcnlLZXkoIG1vZGVsTmFtZSApO1xuXHRyZXR1cm4gaXNBcnJheSgga2V5cyApID9cblx0XHR2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzKCBrZXlzLCBlbnRpdHkgKSA6XG5cdFx0dmFsdWVGb3JQcmltYXJ5S2V5KCBrZXlzLCBlbnRpdHkgKTtcbn0gKTtcblxuLyoqXG4gKiBUaGlzIHJlY2VpdmVzIGFuIGFycmF5IG9mIGVudGl0aWVzIGFuZCByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiB0aG9zZSBzYW1lXG4gKiBlbnRpdGllcyBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZSBmb3IgZWFjaCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHsqfSAgQSBjb2xsZWN0aW9uIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlcyBmb3IgZWFjaCBlbnRpdHkuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUgPSAoIG1vZGVsTmFtZSwgZW50aXRpZXMgPSBbXSApID0+IHtcblx0dmFsaWRhdGVJc05vdEVtcHR5KFxuXHRcdGVudGl0aWVzLFxuXHRcdF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBhcnJheSBvZiBlbnRpdGllcyBtdXN0IG5vdCBiZSBlbXB0eScsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdClcblx0KTtcblx0dmFsaWRhdGVJc0FycmF5KCBlbnRpdGllcyApO1xuXHRyZXR1cm4ga2V5QnkoIGVudGl0aWVzLCBmdW5jdGlvbiggZW50aXR5ICkge1xuXHRcdHJldHVybiBTdHJpbmcoIGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMoIG1vZGVsTmFtZSwgZW50aXR5ICkgKTtcblx0fSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdUS1RfbmFtZScsXG5cdFx0XHQnVEtUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSB0aWNrZXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdUS1Rfc3RhcnRfZGF0ZScsXG5cdFx0ZW5kX2RhdGU6ICdUS1RfZW5kX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiB0aWNrZXRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgXHRXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgdGlja2V0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgICAgIFJldHVybiB0aWNrZXRzIGZvciB0aGUgZ2l2ZW4gbW9udGguIENhbiBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0aW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSB0aWNrZXRzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgICAgSUQgb2YgRGF0ZXRpbWUgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGNvbnN0IEdSRUFURVJfQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPj0nICk7XG5cdGNvbnN0IExFU1NfQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPD0nICk7XG5cblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPT4nICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX3N0YXJ0X2RhdGVdW109JyArIEdSRUFURVJfQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX3N0YXJ0X2RhdGVdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1RfZW5kX2RhdGVdW109JyArIExFU1NfQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cdGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkV2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkRUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IHNwcmludGYsIF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4ga2V5IGV4aXN0cyBpbiB0aGUgcHJvdmlkZWQgZW50aXR5IG9iamVjdC5cbiAqIFRoaXMgaXMgdXNlZCB3aGVuIGNhbGxpbmcgY29kZSB3YW50cyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGtleVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5XG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIGVudGl0eSBkb2VzIG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGhhdmUgdGhlIGdpdmVuIGtleS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW50aXR5SGFzS2V5ID0gKCBrZXksIGVudGl0eSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcHJvcGVydHkgKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0a2V5LFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGVudGl0eS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSAgbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJc0FycmF5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyggJ1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHR9XG5cdGlmICggISBpc0FycmF5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgb3Igbm90LlxuICpcbiAqIENhbGwgdGhpcyB2YWxpZGF0b3Igd2hlbiB5b3Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIE5PVCBlbXB0eS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgZW1wdHkuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUlzTm90RW1wdHkgPSAoIGl0ZW1zLCBtZXNzYWdlID0gJycgKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBpdGVtcyBtdXN0IG5vdCBiZSBlbXB0eScsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdCk7XG5cdH1cblx0aWYgKCBpc0VtcHR5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBtdXJtdXJoYXNoMiB2aWEgaHR0cHM6Ly9naXRodWIuY29tL2dhcnljb3VydC9tdXJtdXJoYXNoLWpzL2Jsb2IvbWFzdGVyL211cm11cmhhc2gyX2djLmpzXG5mdW5jdGlvbiBtdXJtdXJoYXNoMl8zMl9nYyhzdHIpIHtcbiAgdmFyIGwgPSBzdHIubGVuZ3RoLFxuICAgICAgaCA9IGwgXiBsLFxuICAgICAgaSA9IDAsXG4gICAgICBrO1xuXG4gIHdoaWxlIChsID49IDQpIHtcbiAgICBrID0gc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmIHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCA4IHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAxNiB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMjQ7XG4gICAgayA9IChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChrID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG4gICAgayBePSBrID4+PiAyNDtcbiAgICBrID0gKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUgJiAweGZmZmYpIDw8IDE2KTtcbiAgICBoID0gKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUgJiAweGZmZmYpIDw8IDE2KSBeIGs7XG4gICAgbCAtPSA0O1xuICAgICsraTtcbiAgfVxuXG4gIHN3aXRjaCAobCkge1xuICAgIGNhc2UgMzpcbiAgICAgIGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAyKSAmIDB4ZmYpIDw8IDE2O1xuXG4gICAgY2FzZSAyOlxuICAgICAgaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDEpICYgMHhmZikgPDwgODtcblxuICAgIGNhc2UgMTpcbiAgICAgIGggXj0gc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmO1xuICAgICAgaCA9IChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChoID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG4gIH1cblxuICBoIF49IGggPj4+IDEzO1xuICBoID0gKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUgJiAweGZmZmYpIDw8IDE2KTtcbiAgaCBePSBoID4+PiAxNTtcbiAgcmV0dXJuIChoID4+PiAwKS50b1N0cmluZygzNik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG11cm11cmhhc2gyXzMyX2djO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJmdW5jdGlvbiBtZW1vaXplKGZuKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgIGlmIChjYWNoZVthcmddID09PSB1bmRlZmluZWQpIGNhY2hlW2FyZ10gPSBmbihhcmcpO1xuICAgIHJldHVybiBjYWNoZVthcmddO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJ2YXIgViA9IGZ1bmN0aW9uIGNhKFcpIHtcbiAgZnVuY3Rpb24gTShkLCBjLCBmLCBoLCBhKSB7XG4gICAgZm9yICh2YXIgayA9IDAsIGIgPSAwLCB1ID0gMCwgbCA9IDAsIHEsIG0sIGUsIEQgPSAwLCB5ID0gMCwgciwgRSA9IHIgPSBxID0gMCwgbiA9IDAsIEogPSBtID0gMCwgdCA9IDAsIEsgPSBmLmxlbmd0aCwgRiA9IEsgLSAxLCB3LCBnID0gXCJcIiwgcCA9IFwiXCIsIEcgPSBcIlwiLCBIID0gXCJcIiwgQTsgbiA8IEs7KSB7XG4gICAgICBlID0gZi5jaGFyQ29kZUF0KG4pO1xuICAgICAgbiA9PT0gRiAmJiAwICE9PSBiICsgbCArIHUgKyBrICYmICgwICE9PSBiICYmIChlID0gNDcgPT09IGIgPyAxMCA6IDQ3KSwgbCA9IHUgPSBrID0gMCwgSysrLCBGKyspO1xuXG4gICAgICBpZiAoMCA9PT0gYiArIGwgKyB1ICsgaykge1xuICAgICAgICBpZiAobiA9PT0gRiAmJiAoMCA8IG0gJiYgKGcgPSBnLnJlcGxhY2UoTiwgXCJcIikpLCAwIDwgZy50cmltKCkubGVuZ3RoKSkge1xuICAgICAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIGNhc2UgNTk6XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGcgKz0gZi5jaGFyQXQobik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZSA9IDU5O1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgY2FzZSAxMjM6XG4gICAgICAgICAgICBnID0gZy50cmltKCk7XG4gICAgICAgICAgICBxID0gZy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgciA9IDE7XG5cbiAgICAgICAgICAgIGZvciAodCA9ICsrbjsgbiA8IEs7KSB7XG4gICAgICAgICAgICAgIGUgPSBmLmNoYXJDb2RlQXQobik7XG5cbiAgICAgICAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMjM6XG4gICAgICAgICAgICAgICAgICByKys7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgICAgICAgICAgci0tO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKDAgPT09IHIpIGJyZWFrO1xuICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGUgPSBmLnN1YnN0cmluZyh0LCBuKTtcbiAgICAgICAgICAgIDAgPT09IHEgJiYgKHEgPSAoZyA9IGcucmVwbGFjZShkYSwgXCJcIikudHJpbSgpKS5jaGFyQ29kZUF0KDApKTtcblxuICAgICAgICAgICAgc3dpdGNoIChxKSB7XG4gICAgICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgICAgICAgMCA8IG0gJiYgKGcgPSBnLnJlcGxhY2UoTiwgXCJcIikpO1xuICAgICAgICAgICAgICAgIG0gPSBnLmNoYXJDb2RlQXQoMSk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG0pIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDk6XG4gICAgICAgICAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIHIgPSBjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgciA9IE87XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZSA9IE0oYywgciwgZSwgbSwgYSArIDEpO1xuICAgICAgICAgICAgICAgIHQgPSBlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAwIDwgeiAmJiAociA9IFgoTywgZywgSiksIEEgPSBJKDMsIGUsIHIsIGMsIEIsIHgsIHQsIG0sIGEsIGgpLCBnID0gci5qb2luKFwiXCIpLCB2b2lkIDAgIT09IEEgJiYgMCA9PT0gKHQgPSAoZSA9IEEudHJpbSgpKS5sZW5ndGgpICYmIChtID0gMCwgZSA9IFwiXCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoMCA8IHQpIHN3aXRjaCAobSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICAgIGcgPSBnLnJlcGxhY2UoZWEsIGZhKTtcblxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwOTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIGUgPSBnICsgXCJ7XCIgKyBlICsgXCJ9XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIDEwNzpcbiAgICAgICAgICAgICAgICAgICAgZyA9IGcucmVwbGFjZShoYSwgXCIkMSAkMlwiKTtcbiAgICAgICAgICAgICAgICAgICAgZSA9IGcgKyBcIntcIiArIGUgKyBcIn1cIjtcbiAgICAgICAgICAgICAgICAgICAgZSA9IDEgPT09IHYgfHwgMiA9PT0gdiAmJiBMKFwiQFwiICsgZSwgMykgPyBcIkAtd2Via2l0LVwiICsgZSArIFwiQFwiICsgZSA6IFwiQFwiICsgZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGUgPSBnICsgZSwgMTEyID09PSBoICYmIChlID0gKHAgKz0gZSwgXCJcIikpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGUgPSBNKGMsIFgoYywgZywgSiksIGUsIGgsIGEgKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRyArPSBlO1xuICAgICAgICAgICAgciA9IEogPSBtID0gRSA9IHEgPSAwO1xuICAgICAgICAgICAgZyA9IFwiXCI7XG4gICAgICAgICAgICBlID0gZi5jaGFyQ29kZUF0KCsrbik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgIGNhc2UgNTk6XG4gICAgICAgICAgICBnID0gKDAgPCBtID8gZy5yZXBsYWNlKE4sIFwiXCIpIDogZykudHJpbSgpO1xuICAgICAgICAgICAgaWYgKDEgPCAodCA9IGcubGVuZ3RoKSkgc3dpdGNoICgwID09PSBFICYmIChxID0gZy5jaGFyQ29kZUF0KDApLCA0NSA9PT0gcSB8fCA5NiA8IHEgJiYgMTIzID4gcSkgJiYgKHQgPSAoZyA9IGcucmVwbGFjZShcIiBcIiwgXCI6XCIpKS5sZW5ndGgpLCAwIDwgeiAmJiB2b2lkIDAgIT09IChBID0gSSgxLCBnLCBjLCBkLCBCLCB4LCBwLmxlbmd0aCwgaCwgYSwgaCkpICYmIDAgPT09ICh0ID0gKGcgPSBBLnRyaW0oKSkubGVuZ3RoKSAmJiAoZyA9IFwiXFx4MDBcXHgwMFwiKSwgcSA9IGcuY2hhckNvZGVBdCgwKSwgbSA9IGcuY2hhckNvZGVBdCgxKSwgcSArIG0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTY5OlxuICAgICAgICAgICAgICBjYXNlIDE2MzpcbiAgICAgICAgICAgICAgICBIICs9IGcgKyBmLmNoYXJBdChuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIDU4ICE9PSBnLmNoYXJDb2RlQXQodCAtIDEpICYmIChwICs9IFAoZywgcSwgbSwgZy5jaGFyQ29kZUF0KDIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBKID0gbSA9IEUgPSBxID0gMDtcbiAgICAgICAgICAgIGcgPSBcIlwiO1xuICAgICAgICAgICAgZSA9IGYuY2hhckNvZGVBdCgrK24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgIDQ3ID09PSBiID8gYiA9IDAgOiAwID09PSAxICsgcSAmJiAobSA9IDEsIGcgKz0gXCJcXHgwMFwiKTtcbiAgICAgICAgICAwIDwgeiAqIFkgJiYgSSgwLCBnLCBjLCBkLCBCLCB4LCBwLmxlbmd0aCwgaCwgYSwgaCk7XG4gICAgICAgICAgeCA9IDE7XG4gICAgICAgICAgQisrO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNTk6XG4gICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgIGlmICgwID09PSBiICsgbCArIHUgKyBrKSB7XG4gICAgICAgICAgICB4Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB4Kys7XG4gICAgICAgICAgdyA9IGYuY2hhckF0KG4pO1xuXG4gICAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICBpZiAoMCA9PT0gbCArIGsgKyBiKSBzd2l0Y2ggKEQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDQ0OlxuICAgICAgICAgICAgICAgIGNhc2UgNTg6XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgICB3ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIDMyICE9PSBlICYmICh3ID0gXCIgXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHcgPSBcIlxcXFwwXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICB3ID0gXCJcXFxcZlwiO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgdyA9IFwiXFxcXHZcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgIDAgPT09IGwgKyBiICsgayAmJiAobSA9IEogPSAxLCB3ID0gXCJcXGZcIiArIHcpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMDg6XG4gICAgICAgICAgICAgIGlmICgwID09PSBsICsgYiArIGsgKyBDICYmIDAgPCBFKSBzd2l0Y2ggKG4gLSBFKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgMTEyID09PSBEICYmIDU4ID09PSBmLmNoYXJDb2RlQXQobiAtIDMpICYmIChDID0gRCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAxMTEgPT09IHkgJiYgKEMgPSB5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA1ODpcbiAgICAgICAgICAgICAgMCA9PT0gbCArIGIgKyBrICYmIChFID0gbik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQ0OlxuICAgICAgICAgICAgICAwID09PSBiICsgdSArIGwgKyBrICYmIChtID0gMSwgdyArPSBcIlxcclwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAwID09PSBiICYmIChsID0gbCA9PT0gZSA/IDAgOiAwID09PSBsID8gZSA6IGwpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA5MTpcbiAgICAgICAgICAgICAgMCA9PT0gbCArIGIgKyB1ICYmIGsrKztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgOTM6XG4gICAgICAgICAgICAgIDAgPT09IGwgKyBiICsgdSAmJiBrLS07XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQxOlxuICAgICAgICAgICAgICAwID09PSBsICsgYiArIGsgJiYgdS0tO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IGwgKyBiICsgaykge1xuICAgICAgICAgICAgICAgIGlmICgwID09PSBxKSBzd2l0Y2ggKDIgKiBEICsgMyAqIHkpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgNTMzOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHUrKztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAgICAwID09PSBiICsgdSArIGwgKyBrICsgRSArIHIgJiYgKHIgPSAxKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICBpZiAoISgwIDwgbCArIGsgKyB1KSkgc3dpdGNoIChiKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoICgyICogZSArIDMgKiBmLmNoYXJDb2RlQXQobiArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjM1OlxuICAgICAgICAgICAgICAgICAgICAgIGIgPSA0NztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIyMDpcbiAgICAgICAgICAgICAgICAgICAgICB0ID0gbiwgYiA9IDQyO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgICA0NyA9PT0gZSAmJiA0MiA9PT0gRCAmJiAoMzMgPT09IGYuY2hhckNvZGVBdCh0ICsgMikgJiYgKHAgKz0gZi5zdWJzdHJpbmcodCwgbiArIDEpKSwgdyA9IFwiXCIsIGIgPSAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIDAgPT09IGIgJiYgKGcgKz0gdyk7XG4gICAgICB9XG5cbiAgICAgIHkgPSBEO1xuICAgICAgRCA9IGU7XG4gICAgICBuKys7XG4gICAgfVxuXG4gICAgdCA9IHAubGVuZ3RoO1xuXG4gICAgaWYgKDAgPCB0KSB7XG4gICAgICByID0gYztcbiAgICAgIGlmICgwIDwgeiAmJiAoQSA9IEkoMiwgcCwgciwgZCwgQiwgeCwgdCwgaCwgYSwgaCksIHZvaWQgMCAhPT0gQSAmJiAwID09PSAocCA9IEEpLmxlbmd0aCkpIHJldHVybiBIICsgcCArIEc7XG4gICAgICBwID0gci5qb2luKFwiLFwiKSArIFwie1wiICsgcCArIFwifVwiO1xuXG4gICAgICBpZiAoMCAhPT0gdiAqIEMpIHtcbiAgICAgICAgMiAhPT0gdiB8fCBMKHAsIDIpIHx8IChDID0gMCk7XG5cbiAgICAgICAgc3dpdGNoIChDKSB7XG4gICAgICAgICAgY2FzZSAxMTE6XG4gICAgICAgICAgICBwID0gcC5yZXBsYWNlKGlhLCBcIjotbW96LSQxXCIpICsgcDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxMTI6XG4gICAgICAgICAgICBwID0gcC5yZXBsYWNlKFEsIFwiOjotd2Via2l0LWlucHV0LSQxXCIpICsgcC5yZXBsYWNlKFEsIFwiOjotbW96LSQxXCIpICsgcC5yZXBsYWNlKFEsIFwiOi1tcy1pbnB1dC0kMVwiKSArIHA7XG4gICAgICAgIH1cblxuICAgICAgICBDID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gSCArIHAgKyBHO1xuICB9XG5cbiAgZnVuY3Rpb24gWChkLCBjLCBmKSB7XG4gICAgdmFyIGggPSBjLnRyaW0oKS5zcGxpdChqYSk7XG4gICAgYyA9IGg7XG4gICAgdmFyIGEgPSBoLmxlbmd0aCxcbiAgICAgICAgayA9IGQubGVuZ3RoO1xuXG4gICAgc3dpdGNoIChrKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHZhciBiID0gMDtcblxuICAgICAgICBmb3IgKGQgPSAwID09PSBrID8gXCJcIiA6IGRbMF0gKyBcIiBcIjsgYiA8IGE7ICsrYikge1xuICAgICAgICAgIGNbYl0gPSBaKGQsIGNbYl0sIGYsIGspLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgdSA9IGIgPSAwO1xuXG4gICAgICAgIGZvciAoYyA9IFtdOyBiIDwgYTsgKytiKSB7XG4gICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBrOyArK2wpIHtcbiAgICAgICAgICAgIGNbdSsrXSA9IFooZFtsXSArIFwiIFwiLCBoW2JdLCBmLCBrKS50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gYztcbiAgfVxuXG4gIGZ1bmN0aW9uIFooZCwgYywgZikge1xuICAgIHZhciBoID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIDMzID4gaCAmJiAoaCA9IChjID0gYy50cmltKCkpLmNoYXJDb2RlQXQoMCkpO1xuXG4gICAgc3dpdGNoIChoKSB7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICByZXR1cm4gYy5yZXBsYWNlKEYsIFwiJDFcIiArIGQudHJpbSgpKTtcblxuICAgICAgY2FzZSA1ODpcbiAgICAgICAgc3dpdGNoIChjLmNoYXJDb2RlQXQoMSkpIHtcbiAgICAgICAgICBjYXNlIDEwMzpcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBkLnRyaW0oKSArIGMucmVwbGFjZShGLCBcIiQxXCIgKyBkLnRyaW0oKSk7XG4gICAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKDAgPCAxICogZiAmJiAwIDwgYy5pbmRleE9mKFwiXFxmXCIpKSByZXR1cm4gYy5yZXBsYWNlKEYsICg1OCA9PT0gZC5jaGFyQ29kZUF0KDApID8gXCJcIiA6IFwiJDFcIikgKyBkLnRyaW0oKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGQgKyBjO1xuICB9XG5cbiAgZnVuY3Rpb24gUChkLCBjLCBmLCBoKSB7XG4gICAgdmFyIGEgPSBkICsgXCI7XCIsXG4gICAgICAgIGsgPSAyICogYyArIDMgKiBmICsgNCAqIGg7XG5cbiAgICBpZiAoOTQ0ID09PSBrKSB7XG4gICAgICBkID0gYS5pbmRleE9mKFwiOlwiLCA5KSArIDE7XG4gICAgICB2YXIgYiA9IGEuc3Vic3RyaW5nKGQsIGEubGVuZ3RoIC0gMSkudHJpbSgpO1xuICAgICAgYiA9IGEuc3Vic3RyaW5nKDAsIGQpLnRyaW0oKSArIGIgKyBcIjtcIjtcbiAgICAgIHJldHVybiAxID09PSB2IHx8IDIgPT09IHYgJiYgTChiLCAxKSA/IFwiLXdlYmtpdC1cIiArIGIgKyBiIDogYjtcbiAgICB9XG5cbiAgICBpZiAoMCA9PT0gdiB8fCAyID09PSB2ICYmICFMKGEsIDEpKSByZXR1cm4gYTtcblxuICAgIHN3aXRjaCAoaykge1xuICAgICAgY2FzZSAxMDE1OlxuICAgICAgICByZXR1cm4gOTcgPT09IGEuY2hhckNvZGVBdCgxMCkgPyBcIi13ZWJraXQtXCIgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgOTUxOlxuICAgICAgICByZXR1cm4gMTE2ID09PSBhLmNoYXJDb2RlQXQoMykgPyBcIi13ZWJraXQtXCIgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgOTYzOlxuICAgICAgICByZXR1cm4gMTEwID09PSBhLmNoYXJDb2RlQXQoNSkgPyBcIi13ZWJraXQtXCIgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgMTAwOTpcbiAgICAgICAgaWYgKDEwMCAhPT0gYS5jaGFyQ29kZUF0KDQpKSBicmVhaztcblxuICAgICAgY2FzZSA5Njk6XG4gICAgICBjYXNlIDk0MjpcbiAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1cIiArIGEgKyBhO1xuXG4gICAgICBjYXNlIDk3ODpcbiAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1cIiArIGEgKyBcIi1tb3otXCIgKyBhICsgYTtcblxuICAgICAgY2FzZSAxMDE5OlxuICAgICAgY2FzZSA5ODM6XG4gICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbW96LVwiICsgYSArIFwiLW1zLVwiICsgYSArIGE7XG5cbiAgICAgIGNhc2UgODgzOlxuICAgICAgICByZXR1cm4gNDUgPT09IGEuY2hhckNvZGVBdCg4KSA/IFwiLXdlYmtpdC1cIiArIGEgKyBhIDogYTtcblxuICAgICAgY2FzZSA5MzI6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDQpKSBzd2l0Y2ggKGEuY2hhckNvZGVBdCg1KSkge1xuICAgICAgICAgIGNhc2UgMTAzOlxuICAgICAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1ib3gtXCIgKyBhLnJlcGxhY2UoXCItZ3Jvd1wiLCBcIlwiKSArIFwiLXdlYmtpdC1cIiArIGEgKyBcIi1tcy1cIiArIGEucmVwbGFjZShcImdyb3dcIiwgXCJwb3NpdGl2ZVwiKSArIGE7XG5cbiAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtXCIgKyBhLnJlcGxhY2UoXCJzaHJpbmtcIiwgXCJuZWdhdGl2ZVwiKSArIGE7XG5cbiAgICAgICAgICBjYXNlIDk4OlxuICAgICAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1cIiArIGEgKyBcIi1tcy1cIiArIGEucmVwbGFjZShcImJhc2lzXCIsIFwicHJlZmVycmVkLXNpemVcIikgKyBhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtXCIgKyBhICsgYTtcblxuICAgICAgY2FzZSA5NjQ6XG4gICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtZmxleC1cIiArIGEgKyBhO1xuXG4gICAgICBjYXNlIDEwMjM6XG4gICAgICAgIGlmICg5OSAhPT0gYS5jaGFyQ29kZUF0KDgpKSBicmVhaztcbiAgICAgICAgYiA9IGEuc3Vic3RyaW5nKGEuaW5kZXhPZihcIjpcIiwgMTUpKS5yZXBsYWNlKFwiZmxleC1cIiwgXCJcIikucmVwbGFjZShcInNwYWNlLWJldHdlZW5cIiwgXCJqdXN0aWZ5XCIpO1xuICAgICAgICByZXR1cm4gXCItd2Via2l0LWJveC1wYWNrXCIgKyBiICsgXCItd2Via2l0LVwiICsgYSArIFwiLW1zLWZsZXgtcGFja1wiICsgYiArIGE7XG5cbiAgICAgIGNhc2UgMTAwNTpcbiAgICAgICAgcmV0dXJuIGthLnRlc3QoYSkgPyBhLnJlcGxhY2UoYWEsIFwiOi13ZWJraXQtXCIpICsgYS5yZXBsYWNlKGFhLCBcIjotbW96LVwiKSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDFlMzpcbiAgICAgICAgYiA9IGEuc3Vic3RyaW5nKDEzKS50cmltKCk7XG4gICAgICAgIGMgPSBiLmluZGV4T2YoXCItXCIpICsgMTtcblxuICAgICAgICBzd2l0Y2ggKGIuY2hhckNvZGVBdCgwKSArIGIuY2hhckNvZGVBdChjKSkge1xuICAgICAgICAgIGNhc2UgMjI2OlxuICAgICAgICAgICAgYiA9IGEucmVwbGFjZShHLCBcInRiXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDIzMjpcbiAgICAgICAgICAgIGIgPSBhLnJlcGxhY2UoRywgXCJ0Yi1ybFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMjA6XG4gICAgICAgICAgICBiID0gYS5yZXBsYWNlKEcsIFwibHJcIik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtXCIgKyBiICsgYTtcblxuICAgICAgY2FzZSAxMDE3OlxuICAgICAgICBpZiAoLTEgPT09IGEuaW5kZXhPZihcInN0aWNreVwiLCA5KSkgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTc1OlxuICAgICAgICBjID0gKGEgPSBkKS5sZW5ndGggLSAxMDtcbiAgICAgICAgYiA9ICgzMyA9PT0gYS5jaGFyQ29kZUF0KGMpID8gYS5zdWJzdHJpbmcoMCwgYykgOiBhKS5zdWJzdHJpbmcoZC5pbmRleE9mKFwiOlwiLCA3KSArIDEpLnRyaW0oKTtcblxuICAgICAgICBzd2l0Y2ggKGsgPSBiLmNoYXJDb2RlQXQoMCkgKyAoYi5jaGFyQ29kZUF0KDcpIHwgMCkpIHtcbiAgICAgICAgICBjYXNlIDIwMzpcbiAgICAgICAgICAgIGlmICgxMTEgPiBiLmNoYXJDb2RlQXQoOCkpIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICBhID0gYS5yZXBsYWNlKGIsIFwiLXdlYmtpdC1cIiArIGIpICsgXCI7XCIgKyBhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDIwNzpcbiAgICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICAgIGEgPSBhLnJlcGxhY2UoYiwgXCItd2Via2l0LVwiICsgKDEwMiA8IGsgPyBcImlubGluZS1cIiA6IFwiXCIpICsgXCJib3hcIikgKyBcIjtcIiArIGEucmVwbGFjZShiLCBcIi13ZWJraXQtXCIgKyBiKSArIFwiO1wiICsgYS5yZXBsYWNlKGIsIFwiLW1zLVwiICsgYiArIFwiYm94XCIpICsgXCI7XCIgKyBhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGEgKyBcIjtcIjtcblxuICAgICAgY2FzZSA5Mzg6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDUpKSBzd2l0Y2ggKGEuY2hhckNvZGVBdCg2KSkge1xuICAgICAgICAgIGNhc2UgMTA1OlxuICAgICAgICAgICAgcmV0dXJuIGIgPSBhLnJlcGxhY2UoXCItaXRlbXNcIiwgXCJcIiksIFwiLXdlYmtpdC1cIiArIGEgKyBcIi13ZWJraXQtYm94LVwiICsgYiArIFwiLW1zLWZsZXgtXCIgKyBiICsgYTtcblxuICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1cIiArIGEgKyBcIi1tcy1mbGV4LWl0ZW0tXCIgKyBhLnJlcGxhY2UoYmEsIFwiXCIpICsgYTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCItd2Via2l0LVwiICsgYSArIFwiLW1zLWZsZXgtbGluZS1wYWNrXCIgKyBhLnJlcGxhY2UoXCJhbGlnbi1jb250ZW50XCIsIFwiXCIpLnJlcGxhY2UoYmEsIFwiXCIpICsgYTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA5NzM6XG4gICAgICBjYXNlIDk4OTpcbiAgICAgICAgaWYgKDQ1ICE9PSBhLmNoYXJDb2RlQXQoMykgfHwgMTIyID09PSBhLmNoYXJDb2RlQXQoNCkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDkzMTpcbiAgICAgIGNhc2UgOTUzOlxuICAgICAgICBpZiAoITAgPT09IGxhLnRlc3QoZCkpIHJldHVybiAxMTUgPT09IChiID0gZC5zdWJzdHJpbmcoZC5pbmRleE9mKFwiOlwiKSArIDEpKS5jaGFyQ29kZUF0KDApID8gUChkLnJlcGxhY2UoXCJzdHJldGNoXCIsIFwiZmlsbC1hdmFpbGFibGVcIiksIGMsIGYsIGgpLnJlcGxhY2UoXCI6ZmlsbC1hdmFpbGFibGVcIiwgXCI6c3RyZXRjaFwiKSA6IGEucmVwbGFjZShiLCBcIi13ZWJraXQtXCIgKyBiKSArIGEucmVwbGFjZShiLCBcIi1tb3otXCIgKyBiLnJlcGxhY2UoXCJmaWxsLVwiLCBcIlwiKSkgKyBhO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA5NjI6XG4gICAgICAgIGlmIChhID0gXCItd2Via2l0LVwiICsgYSArICgxMDIgPT09IGEuY2hhckNvZGVBdCg1KSA/IFwiLW1zLVwiICsgYSA6IFwiXCIpICsgYSwgMjExID09PSBmICsgaCAmJiAxMDUgPT09IGEuY2hhckNvZGVBdCgxMykgJiYgMCA8IGEuaW5kZXhPZihcInRyYW5zZm9ybVwiLCAxMCkpIHJldHVybiBhLnN1YnN0cmluZygwLCBhLmluZGV4T2YoXCI7XCIsIDI3KSArIDEpLnJlcGxhY2UobWEsIFwiJDEtd2Via2l0LSQyXCIpICsgYTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEwoZCwgYykge1xuICAgIHZhciBmID0gZC5pbmRleE9mKDEgPT09IGMgPyBcIjpcIiA6IFwie1wiKSxcbiAgICAgICAgaCA9IGQuc3Vic3RyaW5nKDAsIDMgIT09IGMgPyBmIDogMTApO1xuICAgIGYgPSBkLnN1YnN0cmluZyhmICsgMSwgZC5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gSCgyICE9PSBjID8gaCA6IGgucmVwbGFjZShuYSwgXCIkMVwiKSwgZiwgYyk7XG4gIH1cblxuICBmdW5jdGlvbiBmYShkLCBjKSB7XG4gICAgdmFyIGYgPSBQKGMsIGMuY2hhckNvZGVBdCgwKSwgYy5jaGFyQ29kZUF0KDEpLCBjLmNoYXJDb2RlQXQoMikpO1xuICAgIHJldHVybiBmICE9PSBjICsgXCI7XCIgPyBmLnJlcGxhY2Uob2EsIFwiIG9yICgkMSlcIikuc3Vic3RyaW5nKDQpIDogXCIoXCIgKyBjICsgXCIpXCI7XG4gIH1cblxuICBmdW5jdGlvbiBJKGQsIGMsIGYsIGgsIGEsIGssIGIsIHUsIGwsIHEpIHtcbiAgICBmb3IgKHZhciBtID0gMCwgZSA9IGMsIHY7IG0gPCB6OyArK20pIHtcbiAgICAgIHN3aXRjaCAodiA9IFJbbV0uY2FsbCh5LCBkLCBlLCBmLCBoLCBhLCBrLCBiLCB1LCBsLCBxKSkge1xuICAgICAgICBjYXNlIHZvaWQgMDpcbiAgICAgICAgY2FzZSAhMTpcbiAgICAgICAgY2FzZSAhMDpcbiAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZSA9IHY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGUgIT09IGMpIHJldHVybiBlO1xuICB9XG5cbiAgZnVuY3Rpb24gUyhkKSB7XG4gICAgc3dpdGNoIChkKSB7XG4gICAgICBjYXNlIHZvaWQgMDpcbiAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgeiA9IFIubGVuZ3RoID0gMDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN3aXRjaCAoZC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgIGNhc2UgQXJyYXk6XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMCwgZiA9IGQubGVuZ3RoOyBjIDwgZjsgKytjKSB7XG4gICAgICAgICAgICAgIFMoZFtjXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBGdW5jdGlvbjpcbiAgICAgICAgICAgIFJbeisrXSA9IGQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgIFkgPSAhIWQgfCAwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gUztcbiAgfVxuXG4gIGZ1bmN0aW9uIFQoZCkge1xuICAgIGQgPSBkLnByZWZpeDtcbiAgICB2b2lkIDAgIT09IGQgJiYgKEggPSBudWxsLCBkID8gXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgZCA/IHYgPSAxIDogKHYgPSAyLCBIID0gZCkgOiB2ID0gMCk7XG4gICAgcmV0dXJuIFQ7XG4gIH1cblxuICBmdW5jdGlvbiB5KGQsIGMpIHtcbiAgICBpZiAodm9pZCAwICE9PSB0aGlzICYmIHRoaXMuY29uc3RydWN0b3IgPT09IHkpIHJldHVybiBjYShkKTtcbiAgICB2YXIgZiA9IGQ7XG4gICAgMzMgPiBmLmNoYXJDb2RlQXQoMCkgJiYgKGYgPSBmLnRyaW0oKSk7XG4gICAgVSA9IGY7XG4gICAgZiA9IFtVXTtcblxuICAgIGlmICgwIDwgeikge1xuICAgICAgdmFyIGggPSBJKC0xLCBjLCBmLCBmLCBCLCB4LCAwLCAwLCAwLCAwKTtcbiAgICAgIHZvaWQgMCAhPT0gaCAmJiBcInN0cmluZ1wiID09PSB0eXBlb2YgaCAmJiAoYyA9IGgpO1xuICAgIH1cblxuICAgIHZhciBhID0gTShPLCBmLCBjLCAwLCAwKTtcbiAgICAwIDwgeiAmJiAoaCA9IEkoLTIsIGEsIGYsIGYsIEIsIHgsIGEubGVuZ3RoLCAwLCAwLCAwKSwgdm9pZCAwICE9PSBoICYmIChhID0gaCkpO1xuICAgIFUgPSBcIlwiO1xuICAgIEMgPSAwO1xuICAgIHggPSBCID0gMTtcbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIHZhciBkYSA9IC9eXFwwKy9nLFxuICAgICAgTiA9IC9bXFwwXFxyXFxmXS9nLFxuICAgICAgYWEgPSAvOiAqL2csXG4gICAgICBrYSA9IC96b298Z3JhLyxcbiAgICAgIG1hID0gLyhbLDogXSkodHJhbnNmb3JtKS9nLFxuICAgICAgamEgPSAvLFxccis/L2csXG4gICAgICBGID0gLyhbXFx0XFxyXFxuIF0pKlxcZj8mL2csXG4gICAgICBoYSA9IC9AKGtcXHcrKVxccyooXFxTKilcXHMqLyxcbiAgICAgIFEgPSAvOjoocGxhY2UpL2csXG4gICAgICBpYSA9IC86KHJlYWQtb25seSkvZyxcbiAgICAgIEcgPSAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sXG4gICAgICBlYSA9IC9cXChcXHMqKC4qKVxccypcXCkvZyxcbiAgICAgIG9hID0gLyhbXFxzXFxTXSo/KTsvZyxcbiAgICAgIGJhID0gLy1zZWxmfGZsZXgtL2csXG4gICAgICBuYSA9IC9bXl0qPyg6W3JwXVtlbF1hW1xcdy1dKylbXl0qLyxcbiAgICAgIGxhID0gL3N0cmV0Y2h8OlxccypcXHcrXFwtKD86Y29udGV8YXZhaWwpLyxcbiAgICAgIHggPSAxLFxuICAgICAgQiA9IDEsXG4gICAgICBDID0gMCxcbiAgICAgIHYgPSAxLFxuICAgICAgTyA9IFtdLFxuICAgICAgUiA9IFtdLFxuICAgICAgeiA9IDAsXG4gICAgICBIID0gbnVsbCxcbiAgICAgIFkgPSAwLFxuICAgICAgVSA9IFwiXCI7XG4gIHkudXNlID0gUztcbiAgeS5zZXQgPSBUO1xuICB2b2lkIDAgIT09IFcgJiYgVChXKTtcbiAgcmV0dXJuIHk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJ2YXIgaW5kZXggPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiAxLFxuICBib3JkZXJJbWFnZU91dHNldDogMSxcbiAgYm9yZGVySW1hZ2VTbGljZTogMSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogMSxcbiAgYm94RmxleDogMSxcbiAgYm94RmxleEdyb3VwOiAxLFxuICBib3hPcmRpbmFsR3JvdXA6IDEsXG4gIGNvbHVtbkNvdW50OiAxLFxuICBjb2x1bW5zOiAxLFxuICBmbGV4OiAxLFxuICBmbGV4R3JvdzogMSxcbiAgZmxleFBvc2l0aXZlOiAxLFxuICBmbGV4U2hyaW5rOiAxLFxuICBmbGV4TmVnYXRpdmU6IDEsXG4gIGZsZXhPcmRlcjogMSxcbiAgZ3JpZFJvdzogMSxcbiAgZ3JpZFJvd0VuZDogMSxcbiAgZ3JpZFJvd1NwYW46IDEsXG4gIGdyaWRSb3dTdGFydDogMSxcbiAgZ3JpZENvbHVtbjogMSxcbiAgZ3JpZENvbHVtbkVuZDogMSxcbiAgZ3JpZENvbHVtblNwYW46IDEsXG4gIGdyaWRDb2x1bW5TdGFydDogMSxcbiAgZm9udFdlaWdodDogMSxcbiAgbGluZUhlaWdodDogMSxcbiAgb3BhY2l0eTogMSxcbiAgb3JkZXI6IDEsXG4gIG9ycGhhbnM6IDEsXG4gIHRhYlNpemU6IDEsXG4gIHdpZG93czogMSxcbiAgekluZGV4OiAxLFxuICB6b29tOiAxLFxuICBXZWJraXRMaW5lQ2xhbXA6IDEsXG4gIC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcbiAgZmlsbE9wYWNpdHk6IDEsXG4gIGZsb29kT3BhY2l0eTogMSxcbiAgc3RvcE9wYWNpdHk6IDEsXG4gIHN0cm9rZURhc2hhcnJheTogMSxcbiAgc3Ryb2tlRGFzaG9mZnNldDogMSxcbiAgc3Ryb2tlTWl0ZXJsaW1pdDogMSxcbiAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgc3Ryb2tlV2lkdGg6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKSB7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuNicgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE4IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG4iLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgJHJlcGxhY2VyID0gcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsImltcG9ydCBoYXNoU3RyaW5nIGZyb20gJ0BlbW90aW9uL2hhc2gnO1xuaW1wb3J0IFN0eWxpcyBmcm9tICdAZW1vdGlvbi9zdHlsaXMnO1xuaW1wb3J0IHN0eWxpc1J1bGVTaGVldCBmcm9tICdzdHlsaXMtcnVsZS1zaGVldCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdAZW1vdGlvbi9tZW1vaXplJztcbmltcG9ydCB1bml0bGVzcyBmcm9tICdAZW1vdGlvbi91bml0bGVzcyc7XG5cbnZhciBoeXBoZW5hdGVSZWdleCA9IC9bQS1aXXxebXMvZztcbnZhciBwcm9jZXNzU3R5bGVOYW1lID0gbWVtb2l6ZShmdW5jdGlvbiAoc3R5bGVOYW1lKSB7XG4gIHJldHVybiBzdHlsZU5hbWUucmVwbGFjZShoeXBoZW5hdGVSZWdleCwgJy0kJicpLnRvTG93ZXJDYXNlKCk7XG59KTtcbnZhciBwcm9jZXNzU3R5bGVWYWx1ZSA9IGZ1bmN0aW9uIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAodW5pdGxlc3Nba2V5XSAhPT0gMSAmJiBrZXkuY2hhckNvZGVBdCgxKSAhPT0gNDUgJiYgLy8gY3VzdG9tIHByb3BlcnRpZXNcbiAgIWlzTmFOKHZhbHVlKSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgIHJldHVybiB2YWx1ZSArICdweCc7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgY29udGVudFZhbHVlUGF0dGVybiA9IC8oYXR0cnxjYWxjfGNvdW50ZXJzP3x1cmwpXFwoLztcbiAgdmFyIGNvbnRlbnRWYWx1ZXMgPSBbJ25vcm1hbCcsICdub25lJywgJ2NvdW50ZXInLCAnb3Blbi1xdW90ZScsICdjbG9zZS1xdW90ZScsICduby1vcGVuLXF1b3RlJywgJ25vLWNsb3NlLXF1b3RlJywgJ2luaXRpYWwnLCAnaW5oZXJpdCcsICd1bnNldCddO1xuICB2YXIgb2xkUHJvY2Vzc1N0eWxlVmFsdWUgPSBwcm9jZXNzU3R5bGVWYWx1ZTtcblxuICBwcm9jZXNzU3R5bGVWYWx1ZSA9IGZ1bmN0aW9uIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5ID09PSAnY29udGVudCcpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IGNvbnRlbnRWYWx1ZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xICYmICFjb250ZW50VmFsdWVQYXR0ZXJuLnRlc3QodmFsdWUpICYmICh2YWx1ZS5jaGFyQXQoMCkgIT09IHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGggLSAxKSB8fCB2YWx1ZS5jaGFyQXQoMCkgIT09ICdcIicgJiYgdmFsdWUuY2hhckF0KDApICE9PSBcIidcIikpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIllvdSBzZWVtIHRvIGJlIHVzaW5nIGEgdmFsdWUgZm9yICdjb250ZW50JyB3aXRob3V0IHF1b3RlcywgdHJ5IHJlcGxhY2luZyBpdCB3aXRoIGBjb250ZW50OiAnXFxcIlwiICsgdmFsdWUgKyBcIlxcXCInYFwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2xkUHJvY2Vzc1N0eWxlVmFsdWUoa2V5LCB2YWx1ZSk7XG4gIH07XG59XG5cbnZhciBjbGFzc25hbWVzID0gZnVuY3Rpb24gY2xhc3NuYW1lcyhhcmdzKSB7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgY2xzID0gJyc7XG5cbiAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBhcmcgPSBhcmdzW2ldO1xuICAgIGlmIChhcmcgPT0gbnVsbCkgY29udGludWU7XG4gICAgdmFyIHRvQWRkID0gdm9pZCAwO1xuXG4gICAgc3dpdGNoICh0eXBlb2YgYXJnKSB7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgdG9BZGQgPSBjbGFzc25hbWVzKFthcmcoKV0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIHRvQWRkID0gY2xhc3NuYW1lcyhhcmcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b0FkZCA9ICcnO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIGFyZykge1xuICAgICAgICAgICAgICBpZiAoYXJnW2tdICYmIGspIHtcbiAgICAgICAgICAgICAgICB0b0FkZCAmJiAodG9BZGQgKz0gJyAnKTtcbiAgICAgICAgICAgICAgICB0b0FkZCArPSBrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIHRvQWRkID0gYXJnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvQWRkKSB7XG4gICAgICBjbHMgJiYgKGNscyArPSAnICcpO1xuICAgICAgY2xzICs9IHRvQWRkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbHM7XG59O1xudmFyIGlzQnJvd3NlciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qXG5cbmhpZ2ggcGVyZm9ybWFuY2UgU3R5bGVTaGVldCBmb3IgY3NzLWluLWpzIHN5c3RlbXNcblxuLSB1c2VzIG11bHRpcGxlIHN0eWxlIHRhZ3MgYmVoaW5kIHRoZSBzY2VuZXMgZm9yIG1pbGxpb25zIG9mIHJ1bGVzXG4tIHVzZXMgYGluc2VydFJ1bGVgIGZvciBhcHBlbmRpbmcgaW4gcHJvZHVjdGlvbiBmb3IgKm11Y2gqIGZhc3RlciBwZXJmb3JtYW5jZVxuLSAncG9seWZpbGxzJyBvbiBzZXJ2ZXIgc2lkZVxuXG4vLyB1c2FnZVxuXG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICdnbGFtb3IvbGliL3NoZWV0J1xubGV0IHN0eWxlU2hlZXQgPSBuZXcgU3R5bGVTaGVldCgpXG5cbnN0eWxlU2hlZXQuaW5qZWN0KClcbi0gJ2luamVjdHMnIHRoZSBzdHlsZXNoZWV0IGludG8gdGhlIHBhZ2UgKG9yIGludG8gbWVtb3J5IGlmIG9uIHNlcnZlcilcblxuc3R5bGVTaGVldC5pbnNlcnQoJyNib3ggeyBib3JkZXI6IDFweCBzb2xpZCByZWQ7IH0nKVxuLSBhcHBlbmRzIGEgY3NzIHJ1bGUgaW50byB0aGUgc3R5bGVzaGVldFxuXG5zdHlsZVNoZWV0LmZsdXNoKClcbi0gZW1wdGllcyB0aGUgc3R5bGVzaGVldCBvZiBhbGwgaXRzIGNvbnRlbnRzXG5cbiovXG4vLyAkRmxvd0ZpeE1lXG5mdW5jdGlvbiBzaGVldEZvclRhZyh0YWcpIHtcbiAgaWYgKHRhZy5zaGVldCkge1xuICAgIC8vICRGbG93Rml4TWVcbiAgICByZXR1cm4gdGFnLnNoZWV0O1xuICB9IC8vIHRoaXMgd2VpcmRuZXNzIGJyb3VnaHQgdG8geW91IGJ5IGZpcmVmb3hcblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZG9jdW1lbnQuc3R5bGVTaGVldHNbaV0ub3duZXJOb2RlID09PSB0YWcpIHtcbiAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgIHJldHVybiBkb2N1bWVudC5zdHlsZVNoZWV0c1tpXTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZVN0eWxlVGFnKG9wdHMpIHtcbiAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHRhZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtZW1vdGlvbicsIG9wdHMua2V5IHx8ICcnKTtcblxuICBpZiAob3B0cy5ub25jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCBvcHRzLm5vbmNlKTtcbiAgfVxuXG4gIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpIC8vICRGbG93Rml4TWVcbiAgO1xuICAob3B0cy5jb250YWluZXIgIT09IHVuZGVmaW5lZCA/IG9wdHMuY29udGFpbmVyIDogZG9jdW1lbnQuaGVhZCkuYXBwZW5kQ2hpbGQodGFnKTtcbiAgcmV0dXJuIHRhZztcbn1cblxuZnVuY3Rpb24gX1N0eWxlU2hlZXQob3B0aW9ucykge1xuICB0aGlzLmlzU3BlZWR5ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJzsgLy8gdGhlIGJpZyBkcmF3YmFjayBoZXJlIGlzIHRoYXQgdGhlIGNzcyB3b24ndCBiZSBlZGl0YWJsZSBpbiBkZXZ0b29sc1xuXG4gIHRoaXMudGFncyA9IFtdO1xuICB0aGlzLmN0ciA9IDA7XG4gIHRoaXMub3B0cyA9IG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIF9pbmplY3QoKSB7XG4gIGlmICh0aGlzLmluamVjdGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhbHJlYWR5IGluamVjdGVkIScpO1xuICB9XG5cbiAgdGhpcy50YWdzWzBdID0gbWFrZVN0eWxlVGFnKHRoaXMub3B0cyk7XG4gIHRoaXMuaW5qZWN0ZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfc3BlZWR5KGJvb2wpIHtcbiAgaWYgKHRoaXMuY3RyICE9PSAwKSB7XG4gICAgLy8gY2Fubm90IGNoYW5nZSBzcGVlZHkgbW9kZSBhZnRlciBpbnNlcnRpbmcgYW55IHJ1bGUgdG8gc2hlZXQuIEVpdGhlciBjYWxsIHNwZWVkeSgke2Jvb2x9KSBlYXJsaWVyIGluIHlvdXIgYXBwLCBvciBjYWxsIGZsdXNoKCkgYmVmb3JlIHNwZWVkeSgke2Jvb2x9KVxuICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBjaGFuZ2Ugc3BlZWR5IG5vd1wiKTtcbiAgfVxuXG4gIHRoaXMuaXNTcGVlZHkgPSAhIWJvb2w7XG59XG5cbmZ1bmN0aW9uIF9pbnNlcnQocnVsZSwgc291cmNlTWFwKSB7XG4gIC8vIHRoaXMgaXMgdGhlIHVsdHJhZmFzdCB2ZXJzaW9uLCB3b3JrcyBhY3Jvc3MgYnJvd3NlcnNcbiAgaWYgKHRoaXMuaXNTcGVlZHkpIHtcbiAgICB2YXIgdGFnID0gdGhpcy50YWdzW3RoaXMudGFncy5sZW5ndGggLSAxXTtcbiAgICB2YXIgc2hlZXQgPSBzaGVldEZvclRhZyh0YWcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHNoZWV0Lmluc2VydFJ1bGUocnVsZSwgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2lsbGVnYWwgcnVsZScsIHJ1bGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIF90YWcgPSBtYWtlU3R5bGVUYWcodGhpcy5vcHRzKTtcblxuICAgIHRoaXMudGFncy5wdXNoKF90YWcpO1xuXG4gICAgX3RhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShydWxlICsgKHNvdXJjZU1hcCB8fCAnJykpKTtcbiAgfVxuXG4gIHRoaXMuY3RyKys7XG5cbiAgaWYgKHRoaXMuY3RyICUgNjUwMDAgPT09IDApIHtcbiAgICB0aGlzLnRhZ3MucHVzaChtYWtlU3R5bGVUYWcodGhpcy5vcHRzKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3JlZih0YWcpIHtcbiAgcmV0dXJuIHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZyk7XG59XG5cbmZ1bmN0aW9uIF9mbHVzaCgpIHtcbiAgLy8gJEZsb3dGaXhNZVxuICB0aGlzLnRhZ3MuZm9yRWFjaChfcmVmKTtcbiAgdGhpcy50YWdzID0gW107XG4gIHRoaXMuY3RyID0gMDsgLy8gdG9kbyAtIGxvb2sgZm9yIHJlbW5hbnRzIGluIGRvY3VtZW50LnN0eWxlU2hlZXRzXG5cbiAgdGhpcy5pbmplY3RlZCA9IGZhbHNlO1xufVxuXG52YXIgU3R5bGVTaGVldCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIHZhciBfcHJvdG8gPSBfU3R5bGVTaGVldC5wcm90b3R5cGU7XG4gIF9wcm90by5pbmplY3QgPSBfaW5qZWN0O1xuICBfcHJvdG8uc3BlZWR5ID0gX3NwZWVkeTtcbiAgX3Byb3RvLmluc2VydCA9IF9pbnNlcnQ7XG4gIF9wcm90by5mbHVzaCA9IF9mbHVzaDtcbiAgcmV0dXJuIF9TdHlsZVNoZWV0O1xufSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVFbW90aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKGNvbnRleHQuX19TRUNSRVRfRU1PVElPTl9fICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29udGV4dC5fX1NFQ1JFVF9FTU9USU9OX187XG4gIH1cblxuICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSBvcHRpb25zID0ge307XG4gIHZhciBrZXkgPSBvcHRpb25zLmtleSB8fCAnY3NzJztcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmICgvW15hLXotXS8udGVzdChrZXkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbW90aW9uIGtleSBtdXN0IG9ubHkgY29udGFpbiBsb3dlciBjYXNlIGFscGhhYmV0aWNhbCBjaGFyYWN0ZXJzIGFuZCAtIGJ1dCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgd2FzIHBhc3NlZFwiKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudDtcblxuICBmdW5jdGlvbiBpbnNlcnRSdWxlKHJ1bGUpIHtcbiAgICBjdXJyZW50ICs9IHJ1bGU7XG5cbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICBzaGVldC5pbnNlcnQocnVsZSwgY3VycmVudFNvdXJjZU1hcCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGluc2VydGlvblBsdWdpbiA9IHN0eWxpc1J1bGVTaGVldChpbnNlcnRSdWxlKTtcbiAgdmFyIHN0eWxpc09wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMucHJlZml4ICE9PSB1bmRlZmluZWQpIHtcbiAgICBzdHlsaXNPcHRpb25zID0ge1xuICAgICAgcHJlZml4OiBvcHRpb25zLnByZWZpeFxuICAgIH07XG4gIH1cblxuICB2YXIgY2FjaGVzID0ge1xuICAgIHJlZ2lzdGVyZWQ6IHt9LFxuICAgIGluc2VydGVkOiB7fSxcbiAgICBub25jZTogb3B0aW9ucy5ub25jZSxcbiAgICBrZXk6IGtleVxuICB9O1xuICB2YXIgc2hlZXQgPSBuZXcgU3R5bGVTaGVldChvcHRpb25zKTtcblxuICBpZiAoaXNCcm93c2VyKSB7XG4gICAgLy8g8J+agFxuICAgIHNoZWV0LmluamVjdCgpO1xuICB9XG5cbiAgdmFyIHN0eWxpcyA9IG5ldyBTdHlsaXMoc3R5bGlzT3B0aW9ucyk7XG4gIHN0eWxpcy51c2Uob3B0aW9ucy5zdHlsaXNQbHVnaW5zKShpbnNlcnRpb25QbHVnaW4pO1xuICB2YXIgY3VycmVudFNvdXJjZU1hcCA9ICcnO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUludGVycG9sYXRpb24oaW50ZXJwb2xhdGlvbiwgY291bGRCZVNlbGVjdG9ySW50ZXJwb2xhdGlvbikge1xuICAgIGlmIChpbnRlcnBvbGF0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBpbnRlcnBvbGF0aW9uKSB7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICcnO1xuXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGlmIChpbnRlcnBvbGF0aW9uLl9fZW1vdGlvbl9zdHlsZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBzZWxlY3RvciA9IGludGVycG9sYXRpb24udG9TdHJpbmcoKTtcblxuICAgICAgICAgIGlmIChzZWxlY3RvciA9PT0gJ05PX0NPTVBPTkVOVF9TRUxFQ1RPUicgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgc2VsZWN0b3JzIGNhbiBvbmx5IGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBiYWJlbC1wbHVnaW4tZW1vdGlvbi4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFuZGxlSW50ZXJwb2xhdGlvbi5jYWxsKHRoaXMsIHRoaXMgPT09IHVuZGVmaW5lZCA/IGludGVycG9sYXRpb24oKSA6IC8vICRGbG93Rml4TWVcbiAgICAgICAgaW50ZXJwb2xhdGlvbih0aGlzLm1lcmdlZFByb3BzLCB0aGlzLmNvbnRleHQpLCBjb3VsZEJlU2VsZWN0b3JJbnRlcnBvbGF0aW9uKTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVN0cmluZ0Zyb21PYmplY3QuY2FsbCh0aGlzLCBpbnRlcnBvbGF0aW9uKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIGNhY2hlZCA9IGNhY2hlcy5yZWdpc3RlcmVkW2ludGVycG9sYXRpb25dO1xuICAgICAgICByZXR1cm4gY291bGRCZVNlbGVjdG9ySW50ZXJwb2xhdGlvbiA9PT0gZmFsc2UgJiYgY2FjaGVkICE9PSB1bmRlZmluZWQgPyBjYWNoZWQgOiBpbnRlcnBvbGF0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvYmplY3RUb1N0cmluZ0NhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpbmdGcm9tT2JqZWN0KG9iaikge1xuICAgIGlmIChvYmplY3RUb1N0cmluZ0NhY2hlLmhhcyhvYmopKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lXG4gICAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmdDYWNoZS5nZXQob2JqKTtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gJyc7XG5cbiAgICBmdW5jdGlvbiBfcmVmKGludGVycG9sYXRpb24pIHtcbiAgICAgIHN0cmluZyArPSBoYW5kbGVJbnRlcnBvbGF0aW9uLmNhbGwodGhpcywgaW50ZXJwb2xhdGlvbiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9yZWYzKGtleSkge1xuICAgICAgZnVuY3Rpb24gX3JlZjIodmFsdWUpIHtcbiAgICAgICAgc3RyaW5nICs9IHByb2Nlc3NTdHlsZU5hbWUoa2V5KSArIFwiOlwiICsgcHJvY2Vzc1N0eWxlVmFsdWUoa2V5LCB2YWx1ZSkgKyBcIjtcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGNhY2hlcy5yZWdpc3RlcmVkW29ialtrZXldXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3RyaW5nICs9IGtleSArIFwie1wiICsgY2FjaGVzLnJlZ2lzdGVyZWRbb2JqW2tleV1dICsgXCJ9XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyaW5nICs9IHByb2Nlc3NTdHlsZU5hbWUoa2V5KSArIFwiOlwiICsgcHJvY2Vzc1N0eWxlVmFsdWUoa2V5LCBvYmpba2V5XSkgKyBcIjtcIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ05PX0NPTVBPTkVOVF9TRUxFQ1RPUicgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcG9uZW50IHNlbGVjdG9ycyBjYW4gb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYmFiZWwtcGx1Z2luLWVtb3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba2V5XSkgJiYgdHlwZW9mIG9ialtrZXldWzBdID09PSAnc3RyaW5nJyAmJiBjYWNoZXMucmVnaXN0ZXJlZFtvYmpba2V5XVswXV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG9ialtrZXldLmZvckVhY2goX3JlZjIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZyArPSBrZXkgKyBcIntcIiArIGhhbmRsZUludGVycG9sYXRpb24uY2FsbCh0aGlzLCBvYmpba2V5XSwgZmFsc2UpICsgXCJ9XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBvYmouZm9yRWFjaChfcmVmLCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKF9yZWYzLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvYmplY3RUb1N0cmluZ0NhY2hlLnNldChvYmosIHN0cmluZyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHZhciBuYW1lO1xuICB2YXIgc3R5bGVzV2l0aExhYmVsO1xuICB2YXIgbGFiZWxQYXR0ZXJuID0gL2xhYmVsOlxccyooW15cXHM7XFxue10rKVxccyo7L2c7XG5cbiAgdmFyIGNyZWF0ZVN0eWxlcyA9IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlcyhzdHJpbmdzKSB7XG4gICAgdmFyIHN0cmluZ01vZGUgPSB0cnVlO1xuICAgIHZhciBzdHlsZXMgPSAnJztcbiAgICB2YXIgaWRlbnRpZmllck5hbWUgPSAnJztcblxuICAgIGlmIChzdHJpbmdzID09IG51bGwgfHwgc3RyaW5ncy5yYXcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RyaW5nTW9kZSA9IGZhbHNlO1xuICAgICAgc3R5bGVzICs9IGhhbmRsZUludGVycG9sYXRpb24uY2FsbCh0aGlzLCBzdHJpbmdzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyArPSBzdHJpbmdzWzBdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBpbnRlcnBvbGF0aW9ucyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBpbnRlcnBvbGF0aW9uc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaW50ZXJwb2xhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJwb2xhdGlvbiwgaSkge1xuICAgICAgc3R5bGVzICs9IGhhbmRsZUludGVycG9sYXRpb24uY2FsbCh0aGlzLCBpbnRlcnBvbGF0aW9uLCBzdHlsZXMuY2hhckNvZGVBdChzdHlsZXMubGVuZ3RoIC0gMSkgPT09IDQ2IC8vIC5cbiAgICAgICk7XG5cbiAgICAgIGlmIChzdHJpbmdNb2RlID09PSB0cnVlICYmIHN0cmluZ3NbaSArIDFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3R5bGVzICs9IHN0cmluZ3NbaSArIDFdO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIHN0eWxlc1dpdGhMYWJlbCA9IHN0eWxlcztcbiAgICBzdHlsZXMgPSBzdHlsZXMucmVwbGFjZShsYWJlbFBhdHRlcm4sIGZ1bmN0aW9uIChtYXRjaCwgcDEpIHtcbiAgICAgIGlkZW50aWZpZXJOYW1lICs9IFwiLVwiICsgcDE7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG4gICAgbmFtZSA9IGhhc2hTdHJpbmcoc3R5bGVzICsgaWRlbnRpZmllck5hbWUpICsgaWRlbnRpZmllck5hbWU7XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBSZWdFeCA9IC9cXC9cXCojXFxzc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjtcXFMrXFxzK1xcKlxcLy87XG4gICAgdmFyIG9sZFN0eWxpcyA9IHN0eWxpcztcblxuICAgIHN0eWxpcyA9IGZ1bmN0aW9uIHN0eWxpcyhzZWxlY3Rvciwgc3R5bGVzKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gc291cmNlTWFwUmVnRXguZXhlYyhzdHlsZXMpO1xuICAgICAgY3VycmVudFNvdXJjZU1hcCA9IHJlc3VsdCA/IHJlc3VsdFswXSA6ICcnO1xuICAgICAgb2xkU3R5bGlzKHNlbGVjdG9yLCBzdHlsZXMpO1xuICAgICAgY3VycmVudFNvdXJjZU1hcCA9ICcnO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpbnNlcnQoc2NvcGUsIHN0eWxlcykge1xuICAgIGlmIChjYWNoZXMuaW5zZXJ0ZWRbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudCA9ICcnO1xuICAgICAgc3R5bGlzKHNjb3BlLCBzdHlsZXMpO1xuICAgICAgY2FjaGVzLmluc2VydGVkW25hbWVdID0gY3VycmVudDtcbiAgICB9XG4gIH1cblxuICB2YXIgY3NzID0gZnVuY3Rpb24gY3NzKCkge1xuICAgIHZhciBzdHlsZXMgPSBjcmVhdGVTdHlsZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgc2VsZWN0b3IgPSBrZXkgKyBcIi1cIiArIG5hbWU7XG5cbiAgICBpZiAoY2FjaGVzLnJlZ2lzdGVyZWRbc2VsZWN0b3JdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhY2hlcy5yZWdpc3RlcmVkW3NlbGVjdG9yXSA9IHN0eWxlc1dpdGhMYWJlbDtcbiAgICB9XG5cbiAgICBpbnNlcnQoXCIuXCIgKyBzZWxlY3Rvciwgc3R5bGVzKTtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH07XG5cbiAgdmFyIGtleWZyYW1lcyA9IGZ1bmN0aW9uIGtleWZyYW1lcygpIHtcbiAgICB2YXIgc3R5bGVzID0gY3JlYXRlU3R5bGVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGFuaW1hdGlvbiA9IFwiYW5pbWF0aW9uLVwiICsgbmFtZTtcbiAgICBpbnNlcnQoJycsIFwiQGtleWZyYW1lcyBcIiArIGFuaW1hdGlvbiArIFwie1wiICsgc3R5bGVzICsgXCJ9XCIpO1xuICAgIHJldHVybiBhbmltYXRpb247XG4gIH07XG5cbiAgdmFyIGluamVjdEdsb2JhbCA9IGZ1bmN0aW9uIGluamVjdEdsb2JhbCgpIHtcbiAgICB2YXIgc3R5bGVzID0gY3JlYXRlU3R5bGVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaW5zZXJ0KCcnLCBzdHlsZXMpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFJlZ2lzdGVyZWRTdHlsZXMocmVnaXN0ZXJlZFN0eWxlcywgY2xhc3NOYW1lcykge1xuICAgIHZhciByYXdDbGFzc05hbWUgPSAnJztcbiAgICBjbGFzc05hbWVzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoY2FjaGVzLnJlZ2lzdGVyZWRbY2xhc3NOYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRTdHlsZXMucHVzaChjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3Q2xhc3NOYW1lICs9IGNsYXNzTmFtZSArIFwiIFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByYXdDbGFzc05hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZShjbGFzc05hbWUsIHNvdXJjZU1hcCkge1xuICAgIHZhciByZWdpc3RlcmVkU3R5bGVzID0gW107XG4gICAgdmFyIHJhd0NsYXNzTmFtZSA9IGdldFJlZ2lzdGVyZWRTdHlsZXMocmVnaXN0ZXJlZFN0eWxlcywgY2xhc3NOYW1lKTtcblxuICAgIGlmIChyZWdpc3RlcmVkU3R5bGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhd0NsYXNzTmFtZSArIGNzcyhyZWdpc3RlcmVkU3R5bGVzLCBzb3VyY2VNYXApO1xuICB9XG5cbiAgZnVuY3Rpb24gY3goKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBjbGFzc05hbWVzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBjbGFzc05hbWVzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlKGNsYXNzbmFtZXMoY2xhc3NOYW1lcykpO1xuICB9XG5cbiAgZnVuY3Rpb24gaHlkcmF0ZVNpbmdsZUlkKGlkKSB7XG4gICAgY2FjaGVzLmluc2VydGVkW2lkXSA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoeWRyYXRlKGlkcykge1xuICAgIGlkcy5mb3JFYWNoKGh5ZHJhdGVTaW5nbGVJZCk7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICBzaGVldC5mbHVzaCgpO1xuICAgICAgc2hlZXQuaW5qZWN0KCk7XG4gICAgfVxuXG4gICAgY2FjaGVzLmluc2VydGVkID0ge307XG4gICAgY2FjaGVzLnJlZ2lzdGVyZWQgPSB7fTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZWY0KG5vZGUpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgc2hlZXQudGFnc1swXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBzaGVldC50YWdzWzBdKTsgLy8gJEZsb3dGaXhNZVxuXG4gICAgbm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVtb3Rpb24tXCIgKyBrZXkpLnNwbGl0KCcgJykuZm9yRWFjaChoeWRyYXRlU2luZ2xlSWQpO1xuICB9XG5cbiAgaWYgKGlzQnJvd3Nlcikge1xuICAgIHZhciBjaHVua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZW1vdGlvbi1cIiArIGtleSArIFwiXVwiKTtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNodW5rcywgX3JlZjQpO1xuICB9XG5cbiAgdmFyIGVtb3Rpb24gPSB7XG4gICAgZmx1c2g6IGZsdXNoLFxuICAgIGh5ZHJhdGU6IGh5ZHJhdGUsXG4gICAgY3g6IGN4LFxuICAgIG1lcmdlOiBtZXJnZSxcbiAgICBnZXRSZWdpc3RlcmVkU3R5bGVzOiBnZXRSZWdpc3RlcmVkU3R5bGVzLFxuICAgIGluamVjdEdsb2JhbDogaW5qZWN0R2xvYmFsLFxuICAgIGtleWZyYW1lczoga2V5ZnJhbWVzLFxuICAgIGNzczogY3NzLFxuICAgIHNoZWV0OiBzaGVldCxcbiAgICBjYWNoZXM6IGNhY2hlc1xuICB9O1xuICBjb250ZXh0Ll9fU0VDUkVUX0VNT1RJT05fXyA9IGVtb3Rpb247XG4gIHJldHVybiBlbW90aW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbW90aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJpbXBvcnQgY3JlYXRlRW1vdGlvbiBmcm9tICdjcmVhdGUtZW1vdGlvbic7XG5cbnZhciBjb250ZXh0ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB7fTtcblxudmFyIF9jcmVhdGVFbW90aW9uID0gY3JlYXRlRW1vdGlvbihjb250ZXh0KTtcbnZhciBmbHVzaCA9IF9jcmVhdGVFbW90aW9uLmZsdXNoO1xudmFyIGh5ZHJhdGUgPSBfY3JlYXRlRW1vdGlvbi5oeWRyYXRlO1xudmFyIGN4ID0gX2NyZWF0ZUVtb3Rpb24uY3g7XG52YXIgbWVyZ2UgPSBfY3JlYXRlRW1vdGlvbi5tZXJnZTtcbnZhciBnZXRSZWdpc3RlcmVkU3R5bGVzID0gX2NyZWF0ZUVtb3Rpb24uZ2V0UmVnaXN0ZXJlZFN0eWxlcztcbnZhciBpbmplY3RHbG9iYWwgPSBfY3JlYXRlRW1vdGlvbi5pbmplY3RHbG9iYWw7XG52YXIga2V5ZnJhbWVzID0gX2NyZWF0ZUVtb3Rpb24ua2V5ZnJhbWVzO1xudmFyIGNzcyA9IF9jcmVhdGVFbW90aW9uLmNzcztcbnZhciBzaGVldCA9IF9jcmVhdGVFbW90aW9uLnNoZWV0O1xudmFyIGNhY2hlcyA9IF9jcmVhdGVFbW90aW9uLmNhY2hlcztcblxuZXhwb3J0IHsgZmx1c2gsIGh5ZHJhdGUsIGN4LCBtZXJnZSwgZ2V0UmVnaXN0ZXJlZFN0eWxlcywgaW5qZWN0R2xvYmFsLCBrZXlmcmFtZXMsIGNzcywgc2hlZXQsIGNhY2hlcyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuMlxuKGZ1bmN0aW9uKCkge1xuICB2YXIgZ2V0TmFub1NlY29uZHMsIGhydGltZSwgbG9hZFRpbWUsIG1vZHVsZUxvYWRUaW1lLCBub2RlTG9hZFRpbWUsIHVwVGltZTtcblxuICBpZiAoKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCkgJiYgcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsKSAmJiBwcm9jZXNzLmhydGltZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGdldE5hbm9TZWNvbmRzKCkgLSBub2RlTG9hZFRpbWUpIC8gMWU2O1xuICAgIH07XG4gICAgaHJ0aW1lID0gcHJvY2Vzcy5ocnRpbWU7XG4gICAgZ2V0TmFub1NlY29uZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBocjtcbiAgICAgIGhyID0gaHJ0aW1lKCk7XG4gICAgICByZXR1cm4gaHJbMF0gKiAxZTkgKyBoclsxXTtcbiAgICB9O1xuICAgIG1vZHVsZUxvYWRUaW1lID0gZ2V0TmFub1NlY29uZHMoKTtcbiAgICB1cFRpbWUgPSBwcm9jZXNzLnVwdGltZSgpICogMWU5O1xuICAgIG5vZGVMb2FkVGltZSA9IG1vZHVsZUxvYWRUaW1lIC0gdXBUaW1lO1xuICB9IGVsc2UgaWYgKERhdGUubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IERhdGUubm93KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXJmb3JtYW5jZS1ub3cuanMubWFwXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICd0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJXNgLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBEZWNvZGUgYSBVUkkgZW5jb2RlZCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBVUkkgZW5jb2RlZCBzdHJpbmcuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGVjb2RlZCBzdHJpbmcuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQucmVwbGFjZSgvXFwrL2csICcgJykpO1xufVxuXG4vKipcbiAqIFNpbXBsZSBxdWVyeSBzdHJpbmcgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgc3RyaW5nIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5nKHF1ZXJ5KSB7XG4gIHZhciBwYXJzZXIgPSAvKFtePT8mXSspPT8oW14mXSopL2dcbiAgICAsIHJlc3VsdCA9IHt9XG4gICAgLCBwYXJ0O1xuXG4gIC8vXG4gIC8vIExpdHRsZSBuaWZ0eSBwYXJzaW5nIGhhY2ssIGxldmVyYWdlIHRoZSBmYWN0IHRoYXQgUmVnRXhwLmV4ZWMgaW5jcmVtZW50c1xuICAvLyB0aGUgbGFzdEluZGV4IHByb3BlcnR5IHNvIHdlIGNhbiBjb250aW51ZSBleGVjdXRpbmcgdGhpcyBsb29wIHVudGlsIHdlJ3ZlXG4gIC8vIHBhcnNlZCBhbGwgcmVzdWx0cy5cbiAgLy9cbiAgZm9yICg7XG4gICAgcGFydCA9IHBhcnNlci5leGVjKHF1ZXJ5KTtcbiAgICByZXN1bHRbZGVjb2RlKHBhcnRbMV0pXSA9IGRlY29kZShwYXJ0WzJdKVxuICApO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgcXVlcnkgc3RyaW5nIHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXggT3B0aW9uYWwgcHJlZml4LlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5naWZ5KG9iaiwgcHJlZml4KSB7XG4gIHByZWZpeCA9IHByZWZpeCB8fCAnJztcblxuICB2YXIgcGFpcnMgPSBbXTtcblxuICAvL1xuICAvLyBPcHRpb25hbGx5IHByZWZpeCB3aXRoIGEgJz8nIGlmIG5lZWRlZFxuICAvL1xuICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBwcmVmaXgpIHByZWZpeCA9ICc/JztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArJz0nKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFpcnMubGVuZ3RoID8gcHJlZml4ICsgcGFpcnMuam9pbignJicpIDogJyc7XG59XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5leHBvcnRzLnN0cmluZ2lmeSA9IHF1ZXJ5c3RyaW5naWZ5O1xuZXhwb3J0cy5wYXJzZSA9IHF1ZXJ5c3RyaW5nO1xuIiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgcm9vdCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG4gICwgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXG4gICwgc3VmZml4ID0gJ0FuaW1hdGlvbkZyYW1lJ1xuICAsIHJhZiA9IHJvb3RbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IHJvb3RbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IHJvb3RbJ2NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxuXG5mb3IodmFyIGkgPSAwOyAhcmFmICYmIGkgPCB2ZW5kb3JzLmxlbmd0aDsgaSsrKSB7XG4gIHJhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG59XG5cbi8vIFNvbWUgdmVyc2lvbnMgb2YgRkYgaGF2ZSByQUYgYnV0IG5vdCBjQUZcbmlmKCFyYWYgfHwgIWNhZikge1xuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgcmV0dXJuIHJhZi5jYWxsKHJvb3QsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShyb290LCBhcmd1bWVudHMpXG59XG5tb2R1bGUuZXhwb3J0cy5wb2x5ZmlsbCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAoIW9iamVjdCkge1xuICAgIG9iamVjdCA9IHJvb3Q7XG4gIH1cbiAgb2JqZWN0LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJhZlxuICBvYmplY3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYWZcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBzaXplclN0eWxlID0ge1xuXHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0dG9wOiAwLFxuXHRsZWZ0OiAwLFxuXHR2aXNpYmlsaXR5OiAnaGlkZGVuJyxcblx0aGVpZ2h0OiAwLFxuXHRvdmVyZmxvdzogJ3Njcm9sbCcsXG5cdHdoaXRlU3BhY2U6ICdwcmUnXG59O1xuXG52YXIgSU5QVVRfUFJPUFNfQkxBQ0tMSVNUID0gWydleHRyYVdpZHRoJywgJ2luamVjdFN0eWxlcycsICdpbnB1dENsYXNzTmFtZScsICdpbnB1dFJlZicsICdpbnB1dFN0eWxlJywgJ21pbldpZHRoJywgJ29uQXV0b3NpemUnLCAncGxhY2Vob2xkZXJJc01pbldpZHRoJ107XG5cbnZhciBjbGVhbklucHV0UHJvcHMgPSBmdW5jdGlvbiBjbGVhbklucHV0UHJvcHMoaW5wdXRQcm9wcykge1xuXHRJTlBVVF9QUk9QU19CTEFDS0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcblx0XHRyZXR1cm4gZGVsZXRlIGlucHV0UHJvcHNbZmllbGRdO1xuXHR9KTtcblx0cmV0dXJuIGlucHV0UHJvcHM7XG59O1xuXG52YXIgY29weVN0eWxlcyA9IGZ1bmN0aW9uIGNvcHlTdHlsZXMoc3R5bGVzLCBub2RlKSB7XG5cdG5vZGUuc3R5bGUuZm9udFNpemUgPSBzdHlsZXMuZm9udFNpemU7XG5cdG5vZGUuc3R5bGUuZm9udEZhbWlseSA9IHN0eWxlcy5mb250RmFtaWx5O1xuXHRub2RlLnN0eWxlLmZvbnRXZWlnaHQgPSBzdHlsZXMuZm9udFdlaWdodDtcblx0bm9kZS5zdHlsZS5mb250U3R5bGUgPSBzdHlsZXMuZm9udFN0eWxlO1xuXHRub2RlLnN0eWxlLmxldHRlclNwYWNpbmcgPSBzdHlsZXMubGV0dGVyU3BhY2luZztcblx0bm9kZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gc3R5bGVzLnRleHRUcmFuc2Zvcm07XG59O1xuXG52YXIgaXNJRSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5uYXZpZ2F0b3IgPyAvTVNJRSB8VHJpZGVudFxcL3xFZGdlXFwvLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSA6IGZhbHNlO1xuXG52YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIGdlbmVyYXRlSWQoKSB7XG5cdC8vIHdlIG9ubHkgbmVlZCBhbiBhdXRvLWdlbmVyYXRlZCBJRCBmb3Igc3R5bGVzaGVldCBpbmplY3Rpb24sIHdoaWNoIGlzIG9ubHlcblx0Ly8gdXNlZCBmb3IgSUUuIHNvIGlmIHRoZSBicm93c2VyIGlzIG5vdCBJRSwgdGhpcyBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZC5cblx0cmV0dXJuIGlzSUUgPyAnXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTIpIDogdW5kZWZpbmVkO1xufTtcblxudmFyIEF1dG9zaXplSW5wdXQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuXHRfaW5oZXJpdHMoQXV0b3NpemVJbnB1dCwgX0NvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gQXV0b3NpemVJbnB1dChwcm9wcykge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBdXRvc2l6ZUlucHV0KTtcblxuXHRcdHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChBdXRvc2l6ZUlucHV0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXV0b3NpemVJbnB1dCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuXHRcdF90aGlzLmlucHV0UmVmID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRfdGhpcy5pbnB1dCA9IGVsO1xuXHRcdFx0aWYgKHR5cGVvZiBfdGhpcy5wcm9wcy5pbnB1dFJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRfdGhpcy5wcm9wcy5pbnB1dFJlZihlbCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdF90aGlzLnBsYWNlSG9sZGVyU2l6ZXJSZWYgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdF90aGlzLnBsYWNlSG9sZGVyU2l6ZXIgPSBlbDtcblx0XHR9O1xuXG5cdFx0X3RoaXMuc2l6ZXJSZWYgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdF90aGlzLnNpemVyID0gZWw7XG5cdFx0fTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0aW5wdXRXaWR0aDogcHJvcHMubWluV2lkdGgsXG5cdFx0XHRpbnB1dElkOiBwcm9wcy5pZCB8fCBnZW5lcmF0ZUlkKClcblx0XHR9O1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhBdXRvc2l6ZUlucHV0LCBbe1xuXHRcdGtleTogJ2NvbXBvbmVudERpZE1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHR0aGlzLm1vdW50ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5jb3B5SW5wdXRTdHlsZXMoKTtcblx0XHRcdHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuXHRcdFx0dmFyIGlkID0gbmV4dFByb3BzLmlkO1xuXG5cdFx0XHRpZiAoaWQgIT09IHRoaXMucHJvcHMuaWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlucHV0SWQ6IGlkIHx8IGdlbmVyYXRlSWQoKSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcblx0XHRcdGlmIChwcmV2U3RhdGUuaW5wdXRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5pbnB1dFdpZHRoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkF1dG9zaXplID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbkF1dG9zaXplKHRoaXMuc3RhdGUuaW5wdXRXaWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0XHR0aGlzLm1vdW50ZWQgPSBmYWxzZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb3B5SW5wdXRTdHlsZXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb3B5SW5wdXRTdHlsZXMoKSB7XG5cdFx0XHRpZiAoIXRoaXMubW91bnRlZCB8fCAhd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGlucHV0U3R5bGVzID0gdGhpcy5pbnB1dCAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmlucHV0KTtcblx0XHRcdGlmICghaW5wdXRTdHlsZXMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29weVN0eWxlcyhpbnB1dFN0eWxlcywgdGhpcy5zaXplcik7XG5cdFx0XHRpZiAodGhpcy5wbGFjZUhvbGRlclNpemVyKSB7XG5cdFx0XHRcdGNvcHlTdHlsZXMoaW5wdXRTdHlsZXMsIHRoaXMucGxhY2VIb2xkZXJTaXplcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAndXBkYXRlSW5wdXRXaWR0aCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUlucHV0V2lkdGgoKSB7XG5cdFx0XHRpZiAoIXRoaXMubW91bnRlZCB8fCAhdGhpcy5zaXplciB8fCB0eXBlb2YgdGhpcy5zaXplci5zY3JvbGxXaWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG5ld0lucHV0V2lkdGggPSB2b2lkIDA7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciAmJiAoIXRoaXMucHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLnByb3BzLnBsYWNlaG9sZGVySXNNaW5XaWR0aCkpIHtcblx0XHRcdFx0bmV3SW5wdXRXaWR0aCA9IE1hdGgubWF4KHRoaXMuc2l6ZXIuc2Nyb2xsV2lkdGgsIHRoaXMucGxhY2VIb2xkZXJTaXplci5zY3JvbGxXaWR0aCkgKyAyO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3SW5wdXRXaWR0aCA9IHRoaXMuc2l6ZXIuc2Nyb2xsV2lkdGggKyAyO1xuXHRcdFx0fVxuXHRcdFx0Ly8gYWRkIGV4dHJhV2lkdGggdG8gdGhlIGRldGVjdGVkIHdpZHRoLiBmb3IgbnVtYmVyIHR5cGVzLCB0aGlzIGRlZmF1bHRzIHRvIDE2IHRvIGFsbG93IGZvciB0aGUgc3RlcHBlciBVSVxuXHRcdFx0dmFyIGV4dHJhV2lkdGggPSB0aGlzLnByb3BzLnR5cGUgPT09ICdudW1iZXInICYmIHRoaXMucHJvcHMuZXh0cmFXaWR0aCA9PT0gdW5kZWZpbmVkID8gMTYgOiBwYXJzZUludCh0aGlzLnByb3BzLmV4dHJhV2lkdGgpIHx8IDA7XG5cdFx0XHRuZXdJbnB1dFdpZHRoICs9IGV4dHJhV2lkdGg7XG5cdFx0XHRpZiAobmV3SW5wdXRXaWR0aCA8IHRoaXMucHJvcHMubWluV2lkdGgpIHtcblx0XHRcdFx0bmV3SW5wdXRXaWR0aCA9IHRoaXMucHJvcHMubWluV2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRpZiAobmV3SW5wdXRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5pbnB1dFdpZHRoKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlucHV0V2lkdGg6IG5ld0lucHV0V2lkdGhcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZ2V0SW5wdXQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiB0aGlzLmlucHV0O1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdFx0XHR0aGlzLmlucHV0LmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnYmx1cicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJsdXIoKSB7XG5cdFx0XHR0aGlzLmlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZWxlY3QnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZWxlY3QoKSB7XG5cdFx0XHR0aGlzLmlucHV0LnNlbGVjdCgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlclN0eWxlcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0eWxlcygpIHtcblx0XHRcdC8vIHRoaXMgbWV0aG9kIGluamVjdHMgc3R5bGVzIHRvIGhpZGUgSUUncyBjbGVhciBpbmRpY2F0b3IsIHdoaWNoIG1lc3Nlc1xuXHRcdFx0Ly8gd2l0aCBpbnB1dCBzaXplIGRldGVjdGlvbi4gdGhlIHN0eWxlc2hlZXQgaXMgb25seSBpbmplY3RlZCB3aGVuIHRoZVxuXHRcdFx0Ly8gYnJvd3NlciBpcyBJRSwgYW5kIGNhbiBhbHNvIGJlIGRpc2FibGVkIGJ5IHRoZSBgaW5qZWN0U3R5bGVzYCBwcm9wLlxuXHRcdFx0dmFyIGluamVjdFN0eWxlcyA9IHRoaXMucHJvcHMuaW5qZWN0U3R5bGVzO1xuXG5cdFx0XHRyZXR1cm4gaXNJRSAmJiBpbmplY3RTdHlsZXMgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG5cdFx0XHRcdFx0X19odG1sOiAnaW5wdXQjJyArIHRoaXMuc3RhdGUuaW5wdXRJZCArICc6Oi1tcy1jbGVhciB7ZGlzcGxheTogbm9uZTt9J1xuXHRcdFx0XHR9IH0pIDogbnVsbDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgc2l6ZXJWYWx1ZSA9IFt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSwgdGhpcy5wcm9wcy52YWx1ZSwgJyddLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG5cdFx0XHRcdGlmIChwcmV2aW91c1ZhbHVlICE9PSBudWxsICYmIHByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJldHVybiBwcmV2aW91c1ZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjdXJyZW50VmFsdWU7XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHdyYXBwZXJTdHlsZSA9IF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLnN0eWxlKTtcblx0XHRcdGlmICghd3JhcHBlclN0eWxlLmRpc3BsYXkpIHdyYXBwZXJTdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cblx0XHRcdHZhciBpbnB1dFN0eWxlID0gX2V4dGVuZHMoe1xuXHRcdFx0XHRib3hTaXppbmc6ICdjb250ZW50LWJveCcsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnN0YXRlLmlucHV0V2lkdGggKyAncHgnXG5cdFx0XHR9LCB0aGlzLnByb3BzLmlucHV0U3R5bGUpO1xuXG5cdFx0XHR2YXIgaW5wdXRQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyh0aGlzLnByb3BzLCBbXSk7XG5cblx0XHRcdGNsZWFuSW5wdXRQcm9wcyhpbnB1dFByb3BzKTtcblx0XHRcdGlucHV0UHJvcHMuY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5pbnB1dENsYXNzTmFtZTtcblx0XHRcdGlucHV0UHJvcHMuaWQgPSB0aGlzLnN0YXRlLmlucHV0SWQ7XG5cdFx0XHRpbnB1dFByb3BzLnN0eWxlID0gaW5wdXRTdHlsZTtcblxuXHRcdFx0cmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLCBzdHlsZTogd3JhcHBlclN0eWxlIH0sXG5cdFx0XHRcdHRoaXMucmVuZGVyU3R5bGVzKCksXG5cdFx0XHRcdF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIF9leHRlbmRzKHt9LCBpbnB1dFByb3BzLCB7IHJlZjogdGhpcy5pbnB1dFJlZiB9KSksXG5cdFx0XHRcdF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgcmVmOiB0aGlzLnNpemVyUmVmLCBzdHlsZTogc2l6ZXJTdHlsZSB9LFxuXHRcdFx0XHRcdHNpemVyVmFsdWVcblx0XHRcdFx0KSxcblx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlciA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgcmVmOiB0aGlzLnBsYWNlSG9sZGVyU2l6ZXJSZWYsIHN0eWxlOiBzaXplclN0eWxlIH0sXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlclxuXHRcdFx0XHQpIDogbnVsbFxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gQXV0b3NpemVJbnB1dDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkF1dG9zaXplSW5wdXQucHJvcFR5cGVzID0ge1xuXHRjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdGRlZmF1bHRWYWx1ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5hbnksIC8vIGRlZmF1bHQgZmllbGQgdmFsdWVcblx0ZXh0cmFXaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoWy8vIGFkZGl0aW9uYWwgd2lkdGggZm9yIGlucHV0IGVsZW1lbnRcblx0X3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXSksXG5cdGlkOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gaWQgdG8gdXNlIGZvciB0aGUgaW5wdXQsIGNhbiBiZSBzZXQgZm9yIGNvbnNpc3RlbnQgc25hcHNob3RzXG5cdGluamVjdFN0eWxlczogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLCAvLyBpbmplY3QgdGhlIGN1c3RvbSBzdHlsZXNoZWV0IHRvIGhpZGUgY2xlYXIgVUksIGRlZmF1bHRzIHRvIHRydWVcblx0aW5wdXRDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBjbGFzc05hbWUgZm9yIHRoZSBpbnB1dCBlbGVtZW50XG5cdGlucHV0UmVmOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsIC8vIHJlZiBjYWxsYmFjayBmb3IgdGhlIGlucHV0IGVsZW1lbnRcblx0aW5wdXRTdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsIC8vIGNzcyBzdHlsZXMgZm9yIHRoZSBpbnB1dCBlbGVtZW50XG5cdG1pbldpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbLy8gbWluaW11bSB3aWR0aCBmb3IgaW5wdXQgZWxlbWVudFxuXHRfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlciwgX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmddKSxcblx0b25BdXRvc2l6ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLCAvLyBvbkF1dG9zaXplIGhhbmRsZXI6IGZ1bmN0aW9uKG5ld1dpZHRoKSB7fVxuXHRvbkNoYW5nZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLCAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbihldmVudCkge31cblx0cGxhY2Vob2xkZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBwbGFjZWhvbGRlciB0ZXh0XG5cdHBsYWNlaG9sZGVySXNNaW5XaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLCAvLyBkb24ndCBjb2xsYXBzZSBzaXplIHRvIGxlc3MgdGhhbiB0aGUgcGxhY2Vob2xkZXJcblx0c3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LCAvLyBjc3Mgc3R5bGVzIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHR2YWx1ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5hbnkgLy8gZmllbGQgdmFsdWVcbn07XG5BdXRvc2l6ZUlucHV0LmRlZmF1bHRQcm9wcyA9IHtcblx0bWluV2lkdGg6IDEsXG5cdGluamVjdFN0eWxlczogdHJ1ZVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQXV0b3NpemVJbnB1dDsiLCJpbXBvcnQgeyBjc3MsIGluamVjdEdsb2JhbCB9IGZyb20gJ2Vtb3Rpb24nO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZpbmRET01Ob2RlLCBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHJhZiBmcm9tICdyYWYnO1xuaW1wb3J0IEF1dG9zaXplSW5wdXQgZnJvbSAncmVhY3QtaW5wdXQtYXV0b3NpemUnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxudmFyIGRpYWNyaXRpY3MgPSBbeyBiYXNlOiAnQScsIGxldHRlcnM6IC9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZyB9LCB7IGJhc2U6ICdBQScsIGxldHRlcnM6IC9bXFx1QTczMl0vZyB9LCB7IGJhc2U6ICdBRScsIGxldHRlcnM6IC9bXFx1MDBDNlxcdTAxRkNcXHUwMUUyXS9nIH0sIHsgYmFzZTogJ0FPJywgbGV0dGVyczogL1tcXHVBNzM0XS9nIH0sIHsgYmFzZTogJ0FVJywgbGV0dGVyczogL1tcXHVBNzM2XS9nIH0sIHsgYmFzZTogJ0FWJywgbGV0dGVyczogL1tcXHVBNzM4XFx1QTczQV0vZyB9LCB7IGJhc2U6ICdBWScsIGxldHRlcnM6IC9bXFx1QTczQ10vZyB9LCB7IGJhc2U6ICdCJywgbGV0dGVyczogL1tcXHUwMDQyXFx1MjRCN1xcdUZGMjJcXHUxRTAyXFx1MUUwNFxcdTFFMDZcXHUwMjQzXFx1MDE4MlxcdTAxODFdL2cgfSwgeyBiYXNlOiAnQycsIGxldHRlcnM6IC9bXFx1MDA0M1xcdTI0QjhcXHVGRjIzXFx1MDEwNlxcdTAxMDhcXHUwMTBBXFx1MDEwQ1xcdTAwQzdcXHUxRTA4XFx1MDE4N1xcdTAyM0JcXHVBNzNFXS9nIH0sIHsgYmFzZTogJ0QnLCBsZXR0ZXJzOiAvW1xcdTAwNDRcXHUyNEI5XFx1RkYyNFxcdTFFMEFcXHUwMTBFXFx1MUUwQ1xcdTFFMTBcXHUxRTEyXFx1MUUwRVxcdTAxMTBcXHUwMThCXFx1MDE4QVxcdTAxODlcXHVBNzc5XS9nIH0sIHsgYmFzZTogJ0RaJywgbGV0dGVyczogL1tcXHUwMUYxXFx1MDFDNF0vZyB9LCB7IGJhc2U6ICdEeicsIGxldHRlcnM6IC9bXFx1MDFGMlxcdTAxQzVdL2cgfSwgeyBiYXNlOiAnRScsIGxldHRlcnM6IC9bXFx1MDA0NVxcdTI0QkFcXHVGRjI1XFx1MDBDOFxcdTAwQzlcXHUwMENBXFx1MUVDMFxcdTFFQkVcXHUxRUM0XFx1MUVDMlxcdTFFQkNcXHUwMTEyXFx1MUUxNFxcdTFFMTZcXHUwMTE0XFx1MDExNlxcdTAwQ0JcXHUxRUJBXFx1MDExQVxcdTAyMDRcXHUwMjA2XFx1MUVCOFxcdTFFQzZcXHUwMjI4XFx1MUUxQ1xcdTAxMThcXHUxRTE4XFx1MUUxQVxcdTAxOTBcXHUwMThFXS9nIH0sIHsgYmFzZTogJ0YnLCBsZXR0ZXJzOiAvW1xcdTAwNDZcXHUyNEJCXFx1RkYyNlxcdTFFMUVcXHUwMTkxXFx1QTc3Ql0vZyB9LCB7IGJhc2U6ICdHJywgbGV0dGVyczogL1tcXHUwMDQ3XFx1MjRCQ1xcdUZGMjdcXHUwMUY0XFx1MDExQ1xcdTFFMjBcXHUwMTFFXFx1MDEyMFxcdTAxRTZcXHUwMTIyXFx1MDFFNFxcdTAxOTNcXHVBN0EwXFx1QTc3RFxcdUE3N0VdL2cgfSwgeyBiYXNlOiAnSCcsIGxldHRlcnM6IC9bXFx1MDA0OFxcdTI0QkRcXHVGRjI4XFx1MDEyNFxcdTFFMjJcXHUxRTI2XFx1MDIxRVxcdTFFMjRcXHUxRTI4XFx1MUUyQVxcdTAxMjZcXHUyQzY3XFx1MkM3NVxcdUE3OERdL2cgfSwgeyBiYXNlOiAnSScsIGxldHRlcnM6IC9bXFx1MDA0OVxcdTI0QkVcXHVGRjI5XFx1MDBDQ1xcdTAwQ0RcXHUwMENFXFx1MDEyOFxcdTAxMkFcXHUwMTJDXFx1MDEzMFxcdTAwQ0ZcXHUxRTJFXFx1MUVDOFxcdTAxQ0ZcXHUwMjA4XFx1MDIwQVxcdTFFQ0FcXHUwMTJFXFx1MUUyQ1xcdTAxOTddL2cgfSwgeyBiYXNlOiAnSicsIGxldHRlcnM6IC9bXFx1MDA0QVxcdTI0QkZcXHVGRjJBXFx1MDEzNFxcdTAyNDhdL2cgfSwgeyBiYXNlOiAnSycsIGxldHRlcnM6IC9bXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTJdL2cgfSwgeyBiYXNlOiAnTCcsIGxldHRlcnM6IC9bXFx1MDA0Q1xcdTI0QzFcXHVGRjJDXFx1MDEzRlxcdTAxMzlcXHUwMTNEXFx1MUUzNlxcdTFFMzhcXHUwMTNCXFx1MUUzQ1xcdTFFM0FcXHUwMTQxXFx1MDIzRFxcdTJDNjJcXHUyQzYwXFx1QTc0OFxcdUE3NDZcXHVBNzgwXS9nIH0sIHsgYmFzZTogJ0xKJywgbGV0dGVyczogL1tcXHUwMUM3XS9nIH0sIHsgYmFzZTogJ0xqJywgbGV0dGVyczogL1tcXHUwMUM4XS9nIH0sIHsgYmFzZTogJ00nLCBsZXR0ZXJzOiAvW1xcdTAwNERcXHUyNEMyXFx1RkYyRFxcdTFFM0VcXHUxRTQwXFx1MUU0MlxcdTJDNkVcXHUwMTlDXS9nIH0sIHsgYmFzZTogJ04nLCBsZXR0ZXJzOiAvW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2cgfSwgeyBiYXNlOiAnTkonLCBsZXR0ZXJzOiAvW1xcdTAxQ0FdL2cgfSwgeyBiYXNlOiAnTmonLCBsZXR0ZXJzOiAvW1xcdTAxQ0JdL2cgfSwgeyBiYXNlOiAnTycsIGxldHRlcnM6IC9bXFx1MDA0RlxcdTI0QzRcXHVGRjJGXFx1MDBEMlxcdTAwRDNcXHUwMEQ0XFx1MUVEMlxcdTFFRDBcXHUxRUQ2XFx1MUVENFxcdTAwRDVcXHUxRTRDXFx1MDIyQ1xcdTFFNEVcXHUwMTRDXFx1MUU1MFxcdTFFNTJcXHUwMTRFXFx1MDIyRVxcdTAyMzBcXHUwMEQ2XFx1MDIyQVxcdTFFQ0VcXHUwMTUwXFx1MDFEMVxcdTAyMENcXHUwMjBFXFx1MDFBMFxcdTFFRENcXHUxRURBXFx1MUVFMFxcdTFFREVcXHUxRUUyXFx1MUVDQ1xcdTFFRDhcXHUwMUVBXFx1MDFFQ1xcdTAwRDhcXHUwMUZFXFx1MDE4NlxcdTAxOUZcXHVBNzRBXFx1QTc0Q10vZyB9LCB7IGJhc2U6ICdPSScsIGxldHRlcnM6IC9bXFx1MDFBMl0vZyB9LCB7IGJhc2U6ICdPTycsIGxldHRlcnM6IC9bXFx1QTc0RV0vZyB9LCB7IGJhc2U6ICdPVScsIGxldHRlcnM6IC9bXFx1MDIyMl0vZyB9LCB7IGJhc2U6ICdQJywgbGV0dGVyczogL1tcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0XS9nIH0sIHsgYmFzZTogJ1EnLCBsZXR0ZXJzOiAvW1xcdTAwNTFcXHUyNEM2XFx1RkYzMVxcdUE3NTZcXHVBNzU4XFx1MDI0QV0vZyB9LCB7IGJhc2U6ICdSJywgbGV0dGVyczogL1tcXHUwMDUyXFx1MjRDN1xcdUZGMzJcXHUwMTU0XFx1MUU1OFxcdTAxNThcXHUwMjEwXFx1MDIxMlxcdTFFNUFcXHUxRTVDXFx1MDE1NlxcdTFFNUVcXHUwMjRDXFx1MkM2NFxcdUE3NUFcXHVBN0E2XFx1QTc4Ml0vZyB9LCB7IGJhc2U6ICdTJywgbGV0dGVyczogL1tcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NF0vZyB9LCB7IGJhc2U6ICdUJywgbGV0dGVyczogL1tcXHUwMDU0XFx1MjRDOVxcdUZGMzRcXHUxRTZBXFx1MDE2NFxcdTFFNkNcXHUwMjFBXFx1MDE2MlxcdTFFNzBcXHUxRTZFXFx1MDE2NlxcdTAxQUNcXHUwMUFFXFx1MDIzRVxcdUE3ODZdL2cgfSwgeyBiYXNlOiAnVFonLCBsZXR0ZXJzOiAvW1xcdUE3MjhdL2cgfSwgeyBiYXNlOiAnVScsIGxldHRlcnM6IC9bXFx1MDA1NVxcdTI0Q0FcXHVGRjM1XFx1MDBEOVxcdTAwREFcXHUwMERCXFx1MDE2OFxcdTFFNzhcXHUwMTZBXFx1MUU3QVxcdTAxNkNcXHUwMERDXFx1MDFEQlxcdTAxRDdcXHUwMUQ1XFx1MDFEOVxcdTFFRTZcXHUwMTZFXFx1MDE3MFxcdTAxRDNcXHUwMjE0XFx1MDIxNlxcdTAxQUZcXHUxRUVBXFx1MUVFOFxcdTFFRUVcXHUxRUVDXFx1MUVGMFxcdTFFRTRcXHUxRTcyXFx1MDE3MlxcdTFFNzZcXHUxRTc0XFx1MDI0NF0vZyB9LCB7IGJhc2U6ICdWJywgbGV0dGVyczogL1tcXHUwMDU2XFx1MjRDQlxcdUZGMzZcXHUxRTdDXFx1MUU3RVxcdTAxQjJcXHVBNzVFXFx1MDI0NV0vZyB9LCB7IGJhc2U6ICdWWScsIGxldHRlcnM6IC9bXFx1QTc2MF0vZyB9LCB7IGJhc2U6ICdXJywgbGV0dGVyczogL1tcXHUwMDU3XFx1MjRDQ1xcdUZGMzdcXHUxRTgwXFx1MUU4MlxcdTAxNzRcXHUxRTg2XFx1MUU4NFxcdTFFODhcXHUyQzcyXS9nIH0sIHsgYmFzZTogJ1gnLCBsZXR0ZXJzOiAvW1xcdTAwNThcXHUyNENEXFx1RkYzOFxcdTFFOEFcXHUxRThDXS9nIH0sIHsgYmFzZTogJ1knLCBsZXR0ZXJzOiAvW1xcdTAwNTlcXHUyNENFXFx1RkYzOVxcdTFFRjJcXHUwMEREXFx1MDE3NlxcdTFFRjhcXHUwMjMyXFx1MUU4RVxcdTAxNzhcXHUxRUY2XFx1MUVGNFxcdTAxQjNcXHUwMjRFXFx1MUVGRV0vZyB9LCB7IGJhc2U6ICdaJywgbGV0dGVyczogL1tcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2Ml0vZyB9LCB7IGJhc2U6ICdhJywgbGV0dGVyczogL1tcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MF0vZyB9LCB7IGJhc2U6ICdhYScsIGxldHRlcnM6IC9bXFx1QTczM10vZyB9LCB7IGJhc2U6ICdhZScsIGxldHRlcnM6IC9bXFx1MDBFNlxcdTAxRkRcXHUwMUUzXS9nIH0sIHsgYmFzZTogJ2FvJywgbGV0dGVyczogL1tcXHVBNzM1XS9nIH0sIHsgYmFzZTogJ2F1JywgbGV0dGVyczogL1tcXHVBNzM3XS9nIH0sIHsgYmFzZTogJ2F2JywgbGV0dGVyczogL1tcXHVBNzM5XFx1QTczQl0vZyB9LCB7IGJhc2U6ICdheScsIGxldHRlcnM6IC9bXFx1QTczRF0vZyB9LCB7IGJhc2U6ICdiJywgbGV0dGVyczogL1tcXHUwMDYyXFx1MjREMVxcdUZGNDJcXHUxRTAzXFx1MUUwNVxcdTFFMDdcXHUwMTgwXFx1MDE4M1xcdTAyNTNdL2cgfSwgeyBiYXNlOiAnYycsIGxldHRlcnM6IC9bXFx1MDA2M1xcdTI0RDJcXHVGRjQzXFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAwRTdcXHUxRTA5XFx1MDE4OFxcdTAyM0NcXHVBNzNGXFx1MjE4NF0vZyB9LCB7IGJhc2U6ICdkJywgbGV0dGVyczogL1tcXHUwMDY0XFx1MjREM1xcdUZGNDRcXHUxRTBCXFx1MDEwRlxcdTFFMERcXHUxRTExXFx1MUUxM1xcdTFFMEZcXHUwMTExXFx1MDE4Q1xcdTAyNTZcXHUwMjU3XFx1QTc3QV0vZyB9LCB7IGJhc2U6ICdkeicsIGxldHRlcnM6IC9bXFx1MDFGM1xcdTAxQzZdL2cgfSwgeyBiYXNlOiAnZScsIGxldHRlcnM6IC9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZyB9LCB7IGJhc2U6ICdmJywgbGV0dGVyczogL1tcXHUwMDY2XFx1MjRENVxcdUZGNDZcXHUxRTFGXFx1MDE5MlxcdUE3N0NdL2cgfSwgeyBiYXNlOiAnZycsIGxldHRlcnM6IC9bXFx1MDA2N1xcdTI0RDZcXHVGRjQ3XFx1MDFGNVxcdTAxMURcXHUxRTIxXFx1MDExRlxcdTAxMjFcXHUwMUU3XFx1MDEyM1xcdTAxRTVcXHUwMjYwXFx1QTdBMVxcdTFENzlcXHVBNzdGXS9nIH0sIHsgYmFzZTogJ2gnLCBsZXR0ZXJzOiAvW1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NV0vZyB9LCB7IGJhc2U6ICdodicsIGxldHRlcnM6IC9bXFx1MDE5NV0vZyB9LCB7IGJhc2U6ICdpJywgbGV0dGVyczogL1tcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMV0vZyB9LCB7IGJhc2U6ICdqJywgbGV0dGVyczogL1tcXHUwMDZBXFx1MjREOVxcdUZGNEFcXHUwMTM1XFx1MDFGMFxcdTAyNDldL2cgfSwgeyBiYXNlOiAnaycsIGxldHRlcnM6IC9bXFx1MDA2QlxcdTI0REFcXHVGRjRCXFx1MUUzMVxcdTAxRTlcXHUxRTMzXFx1MDEzN1xcdTFFMzVcXHUwMTk5XFx1MkM2QVxcdUE3NDFcXHVBNzQzXFx1QTc0NVxcdUE3QTNdL2cgfSwgeyBiYXNlOiAnbCcsIGxldHRlcnM6IC9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZyB9LCB7IGJhc2U6ICdsaicsIGxldHRlcnM6IC9bXFx1MDFDOV0vZyB9LCB7IGJhc2U6ICdtJywgbGV0dGVyczogL1tcXHUwMDZEXFx1MjREQ1xcdUZGNERcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUwMjcxXFx1MDI2Rl0vZyB9LCB7IGJhc2U6ICduJywgbGV0dGVyczogL1tcXHUwMDZFXFx1MjRERFxcdUZGNEVcXHUwMUY5XFx1MDE0NFxcdTAwRjFcXHUxRTQ1XFx1MDE0OFxcdTFFNDdcXHUwMTQ2XFx1MUU0QlxcdTFFNDlcXHUwMTlFXFx1MDI3MlxcdTAxNDlcXHVBNzkxXFx1QTdBNV0vZyB9LCB7IGJhc2U6ICduaicsIGxldHRlcnM6IC9bXFx1MDFDQ10vZyB9LCB7IGJhc2U6ICdvJywgbGV0dGVyczogL1tcXHUwMDZGXFx1MjRERVxcdUZGNEZcXHUwMEYyXFx1MDBGM1xcdTAwRjRcXHUxRUQzXFx1MUVEMVxcdTFFRDdcXHUxRUQ1XFx1MDBGNVxcdTFFNERcXHUwMjJEXFx1MUU0RlxcdTAxNERcXHUxRTUxXFx1MUU1M1xcdTAxNEZcXHUwMjJGXFx1MDIzMVxcdTAwRjZcXHUwMjJCXFx1MUVDRlxcdTAxNTFcXHUwMUQyXFx1MDIwRFxcdTAyMEZcXHUwMUExXFx1MUVERFxcdTFFREJcXHUxRUUxXFx1MUVERlxcdTFFRTNcXHUxRUNEXFx1MUVEOVxcdTAxRUJcXHUwMUVEXFx1MDBGOFxcdTAxRkZcXHUwMjU0XFx1QTc0QlxcdUE3NERcXHUwMjc1XS9nIH0sIHsgYmFzZTogJ29pJywgbGV0dGVyczogL1tcXHUwMUEzXS9nIH0sIHsgYmFzZTogJ291JywgbGV0dGVyczogL1tcXHUwMjIzXS9nIH0sIHsgYmFzZTogJ29vJywgbGV0dGVyczogL1tcXHVBNzRGXS9nIH0sIHsgYmFzZTogJ3AnLCBsZXR0ZXJzOiAvW1xcdTAwNzBcXHUyNERGXFx1RkY1MFxcdTFFNTVcXHUxRTU3XFx1MDFBNVxcdTFEN0RcXHVBNzUxXFx1QTc1M1xcdUE3NTVdL2cgfSwgeyBiYXNlOiAncScsIGxldHRlcnM6IC9bXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5XS9nIH0sIHsgYmFzZTogJ3InLCBsZXR0ZXJzOiAvW1xcdTAwNzJcXHUyNEUxXFx1RkY1MlxcdTAxNTVcXHUxRTU5XFx1MDE1OVxcdTAyMTFcXHUwMjEzXFx1MUU1QlxcdTFFNURcXHUwMTU3XFx1MUU1RlxcdTAyNERcXHUwMjdEXFx1QTc1QlxcdUE3QTdcXHVBNzgzXS9nIH0sIHsgYmFzZTogJ3MnLCBsZXR0ZXJzOiAvW1xcdTAwNzNcXHUyNEUyXFx1RkY1M1xcdTAwREZcXHUwMTVCXFx1MUU2NVxcdTAxNURcXHUxRTYxXFx1MDE2MVxcdTFFNjdcXHUxRTYzXFx1MUU2OVxcdTAyMTlcXHUwMTVGXFx1MDIzRlxcdUE3QTlcXHVBNzg1XFx1MUU5Ql0vZyB9LCB7IGJhc2U6ICd0JywgbGV0dGVyczogL1tcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3XS9nIH0sIHsgYmFzZTogJ3R6JywgbGV0dGVyczogL1tcXHVBNzI5XS9nIH0sIHsgYmFzZTogJ3UnLCBsZXR0ZXJzOiAvW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2cgfSwgeyBiYXNlOiAndicsIGxldHRlcnM6IC9bXFx1MDA3NlxcdTI0RTVcXHVGRjU2XFx1MUU3RFxcdTFFN0ZcXHUwMjhCXFx1QTc1RlxcdTAyOENdL2cgfSwgeyBiYXNlOiAndnknLCBsZXR0ZXJzOiAvW1xcdUE3NjFdL2cgfSwgeyBiYXNlOiAndycsIGxldHRlcnM6IC9bXFx1MDA3N1xcdTI0RTZcXHVGRjU3XFx1MUU4MVxcdTFFODNcXHUwMTc1XFx1MUU4N1xcdTFFODVcXHUxRTk4XFx1MUU4OVxcdTJDNzNdL2cgfSwgeyBiYXNlOiAneCcsIGxldHRlcnM6IC9bXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOERdL2cgfSwgeyBiYXNlOiAneScsIGxldHRlcnM6IC9bXFx1MDA3OVxcdTI0RThcXHVGRjU5XFx1MUVGM1xcdTAwRkRcXHUwMTc3XFx1MUVGOVxcdTAyMzNcXHUxRThGXFx1MDBGRlxcdTFFRjdcXHUxRTk5XFx1MUVGNVxcdTAxQjRcXHUwMjRGXFx1MUVGRl0vZyB9LCB7IGJhc2U6ICd6JywgbGV0dGVyczogL1tcXHUwMDdBXFx1MjRFOVxcdUZGNUFcXHUwMTdBXFx1MUU5MVxcdTAxN0NcXHUwMTdFXFx1MUU5M1xcdTFFOTVcXHUwMUI2XFx1MDIyNVxcdTAyNDBcXHUyQzZDXFx1QTc2M10vZyB9XTtcblxudmFyIHN0cmlwRGlhY3JpdGljcyA9IGZ1bmN0aW9uIHN0cmlwRGlhY3JpdGljcyhzdHIpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkaWFjcml0aWNzLmxlbmd0aDsgaSsrKSB7XG5cdFx0c3RyID0gc3RyLnJlcGxhY2UoZGlhY3JpdGljc1tpXS5sZXR0ZXJzLCBkaWFjcml0aWNzW2ldLmJhc2UpO1xuXHR9XG5cdHJldHVybiBzdHI7XG59O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxudmFyIHNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbnZhciB0b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59O1xuXG52YXIgdHJpbVN0cmluZyA9IGZ1bmN0aW9uIHRyaW1TdHJpbmcoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufTtcbnZhciBkZWZhdWxTdHJpbmdpZnkgPSBmdW5jdGlvbiBkZWZhdWxTdHJpbmdpZnkob3B0aW9uKSB7XG4gIHJldHVybiBvcHRpb24ubGFiZWwgKyAnICcgKyBvcHRpb24udmFsdWU7XG59O1xuXG52YXIgY3JlYXRlRmlsdGVyID0gZnVuY3Rpb24gY3JlYXRlRmlsdGVyKGNvbmZpZykge1xuICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbiwgcmF3SW5wdXQpIHtcbiAgICB2YXIgX2lnbm9yZUNhc2UkaWdub3JlQWNjID0gX2V4dGVuZHMoe1xuICAgICAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICAgIGlnbm9yZUFjY2VudHM6IHRydWUsXG4gICAgICBzdHJpbmdpZnk6IGRlZmF1bFN0cmluZ2lmeSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBtYXRjaEZyb206ICdhbnknXG4gICAgfSwgY29uZmlnKSxcbiAgICAgICAgaWdub3JlQ2FzZSA9IF9pZ25vcmVDYXNlJGlnbm9yZUFjYy5pZ25vcmVDYXNlLFxuICAgICAgICBpZ25vcmVBY2NlbnRzID0gX2lnbm9yZUNhc2UkaWdub3JlQWNjLmlnbm9yZUFjY2VudHMsXG4gICAgICAgIHN0cmluZ2lmeSA9IF9pZ25vcmVDYXNlJGlnbm9yZUFjYy5zdHJpbmdpZnksXG4gICAgICAgIHRyaW0gPSBfaWdub3JlQ2FzZSRpZ25vcmVBY2MudHJpbSxcbiAgICAgICAgbWF0Y2hGcm9tID0gX2lnbm9yZUNhc2UkaWdub3JlQWNjLm1hdGNoRnJvbTtcblxuICAgIHZhciBpbnB1dCA9IHRyaW0gPyB0cmltU3RyaW5nKHJhd0lucHV0KSA6IHJhd0lucHV0O1xuICAgIHZhciBjYW5kaWRhdGUgPSB0cmltID8gdHJpbVN0cmluZyhzdHJpbmdpZnkob3B0aW9uKSkgOiBzdHJpbmdpZnkob3B0aW9uKTtcbiAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgaW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FuZGlkYXRlID0gY2FuZGlkYXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGlmIChpZ25vcmVBY2NlbnRzKSB7XG4gICAgICBpbnB1dCA9IHN0cmlwRGlhY3JpdGljcyhpbnB1dCk7XG4gICAgICBjYW5kaWRhdGUgPSBzdHJpcERpYWNyaXRpY3MoY2FuZGlkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoRnJvbSA9PT0gJ3N0YXJ0JyA/IGNhbmRpZGF0ZS5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoKSA9PT0gaW5wdXQgOiBjYW5kaWRhdGUuaW5kZXhPZihpbnB1dCkgPiAtMTtcbiAgfTtcbn07XG5cbnZhciBEdW1teUlucHV0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoRHVtbXlJbnB1dCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gRHVtbXlJbnB1dCgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBEdW1teUlucHV0KTtcbiAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRHVtbXlJbnB1dC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKER1bW15SW5wdXQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKER1bW15SW5wdXQsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgaW5Qcm9wID0gX3Byb3BzLmluLFxuICAgICAgICAgIG91dCA9IF9wcm9wcy5vdXQsXG4gICAgICAgICAgb25FeGl0ZWQgPSBfcHJvcHMub25FeGl0ZWQsXG4gICAgICAgICAgYXBwZWFyID0gX3Byb3BzLmFwcGVhcixcbiAgICAgICAgICBlbnRlciA9IF9wcm9wcy5lbnRlcixcbiAgICAgICAgICBleGl0ID0gX3Byb3BzLmV4aXQsXG4gICAgICAgICAgaW5uZXJSZWYgPSBfcHJvcHMuaW5uZXJSZWYsXG4gICAgICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnaW4nLCAnb3V0JywgJ29uRXhpdGVkJywgJ2FwcGVhcicsICdlbnRlcicsICdleGl0JywgJ2lubmVyUmVmJ10pO1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBfZXh0ZW5kcyh7XG4gICAgICAgIHJlZjogaW5uZXJSZWZcbiAgICAgIH0sIHByb3BzLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY3NzKHtcbiAgICAgICAgICAvLyBnZXQgcmlkIG9mIGFueSBkZWZhdWx0IHN0eWxlc1xuICAgICAgICAgIGJhY2tncm91bmQ6IDAsXG4gICAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgICAgICAgb3V0bGluZTogMCxcbiAgICAgICAgICBwYWRkaW5nOiAwLFxuXG4gICAgICAgICAgLy8gaW1wb3J0YW50ISB3aXRob3V0IGB3aWR0aGAgYnJvd3NlcnMgd29uJ3QgYWxsb3cgZm9jdXNcbiAgICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gZGVza3RvcFxuICAgICAgICAgIGNvbG9yOiAndHJhbnNwYXJlbnQnLFxuXG4gICAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICAgIGxlZnQ6IC0xMDAsXG4gICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKSdcbiAgICAgICAgfSlcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIER1bW15SW5wdXQ7XG59KENvbXBvbmVudCk7XG5cbnZhciBOb2RlUmVzb2x2ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhOb2RlUmVzb2x2ZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE5vZGVSZXNvbHZlcigpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBOb2RlUmVzb2x2ZXIpO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOb2RlUmVzb2x2ZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOb2RlUmVzb2x2ZXIpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKE5vZGVSZXNvbHZlciwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5wcm9wcy5pbm5lclJlZihmaW5kRE9NTm9kZSh0aGlzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMucHJvcHMuaW5uZXJSZWYobnVsbCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBOb2RlUmVzb2x2ZXI7XG59KENvbXBvbmVudCk7XG5cbnZhciBTVFlMRV9LRVlTID0gWydib3hTaXppbmcnLCAnaGVpZ2h0JywgJ292ZXJmbG93JywgJ3BhZGRpbmdSaWdodCcsICdwb3NpdGlvbiddO1xuXG52YXIgTE9DS19TVFlMRVMgPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCAvLyBhY2NvdW50IGZvciBwb3NzaWJsZSBkZWNsYXJhdGlvbiBgd2lkdGg6IDEwMCU7YCBvbiBib2R5XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIGhlaWdodDogJzEwMCUnXG59O1xuXG5mdW5jdGlvbiBwcmV2ZW50VG91Y2hNb3ZlKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBhbGxvd1RvdWNoTW92ZShlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRJbmVydGlhU2Nyb2xsKCkge1xuICB2YXIgdG9wID0gdGhpcy5zY3JvbGxUb3A7XG4gIHZhciB0b3RhbFNjcm9sbCA9IHRoaXMuc2Nyb2xsSGVpZ2h0O1xuICB2YXIgY3VycmVudFNjcm9sbCA9IHRvcCArIHRoaXMub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmICh0b3AgPT09IDApIHtcbiAgICB0aGlzLnNjcm9sbFRvcCA9IDE7XG4gIH0gZWxzZSBpZiAoY3VycmVudFNjcm9sbCA9PT0gdG90YWxTY3JvbGwpIHtcbiAgICB0aGlzLnNjcm9sbFRvcCA9IHRvcCAtIDE7XG4gIH1cbn1cblxuLy8gYG9udG91Y2hzdGFydGAgY2hlY2sgd29ya3Mgb24gbW9zdCBicm93c2Vyc1xuLy8gYG1heFRvdWNoUG9pbnRzYCB3b3JrcyBvbiBJRTEwLzExIGFuZCBTdXJmYWNlXG5mdW5jdGlvbiBpc1RvdWNoRGV2aWNlKCkge1xuICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcbn1cblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbnZhciBhY3RpdmVTY3JvbGxMb2NrcyA9IDA7XG5cbnZhciBTY3JvbGxMb2NrID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoU2Nyb2xsTG9jaywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU2Nyb2xsTG9jaygpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JvbGxMb2NrKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX3JlZiA9IFNjcm9sbExvY2suX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTY3JvbGxMb2NrKSkuY2FsbC5hcHBseShfcmVmLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMub3JpZ2luYWxTdHlsZXMgPSB7fSwgX3RoaXMubGlzdGVuZXJPcHRpb25zID0ge1xuICAgICAgY2FwdHVyZTogZmFsc2UsXG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0sIF90ZW1wKSwgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhTY3JvbGxMb2NrLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKCFjYW5Vc2VET00pIHJldHVybjtcblxuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYWNjb3VudEZvclNjcm9sbGJhcnMgPSBfcHJvcHMuYWNjb3VudEZvclNjcm9sbGJhcnMsXG4gICAgICAgICAgdG91Y2hTY3JvbGxUYXJnZXQgPSBfcHJvcHMudG91Y2hTY3JvbGxUYXJnZXQ7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgdmFyIHRhcmdldFN0eWxlID0gdGFyZ2V0ICYmIHRhcmdldC5zdHlsZTtcblxuICAgICAgaWYgKGFjY291bnRGb3JTY3JvbGxiYXJzKSB7XG4gICAgICAgIC8vIHN0b3JlIGFueSBzdHlsZXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoZSBib2R5XG4gICAgICAgIFNUWUxFX0tFWVMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHZhbCA9IHRhcmdldFN0eWxlICYmIHRhcmdldFN0eWxlW2tleV07XG4gICAgICAgICAgX3RoaXMyLm9yaWdpbmFsU3R5bGVzW2tleV0gPSB2YWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBseSB0aGUgbG9jayBzdHlsZXMgYW5kIHBhZGRpbmcgaWYgdGhpcyBpcyB0aGUgZmlyc3Qgc2Nyb2xsIGxvY2tcbiAgICAgIGlmIChhY2NvdW50Rm9yU2Nyb2xsYmFycyAmJiBhY3RpdmVTY3JvbGxMb2NrcyA8IDEpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRQYWRkaW5nID0gcGFyc2VJbnQodGhpcy5vcmlnaW5hbFN0eWxlcy5wYWRkaW5nUmlnaHQsIDEwKSB8fCAwO1xuICAgICAgICB2YXIgY2xpZW50V2lkdGggPSBkb2N1bWVudC5ib2R5ID8gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA6IDA7XG4gICAgICAgIHZhciBhZGp1c3RlZFBhZGRpbmcgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGNsaWVudFdpZHRoICsgY3VycmVudFBhZGRpbmcgfHwgMDtcblxuICAgICAgICBPYmplY3Qua2V5cyhMT0NLX1NUWUxFUykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHZhbCA9IExPQ0tfU1RZTEVTW2tleV07XG4gICAgICAgICAgaWYgKHRhcmdldFN0eWxlKSB7XG4gICAgICAgICAgICB0YXJnZXRTdHlsZVtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRhcmdldFN0eWxlKSB7XG4gICAgICAgICAgdGFyZ2V0U3R5bGUucGFkZGluZ1JpZ2h0ID0gYWRqdXN0ZWRQYWRkaW5nICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhY2NvdW50IGZvciB0b3VjaCBkZXZpY2VzXG4gICAgICBpZiAodGFyZ2V0ICYmIGlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAvLyBNb2JpbGUgU2FmYXJpIGlnbm9yZXMgeyBvdmVyZmxvdzogaGlkZGVuIH0gZGVjbGFyYXRpb24gb24gdGhlIGJvZHkuXG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50VG91Y2hNb3ZlLCB0aGlzLmxpc3RlbmVyT3B0aW9ucyk7XG5cbiAgICAgICAgLy8gQWxsb3cgc2Nyb2xsIG9uIHByb3ZpZGVkIHRhcmdldFxuICAgICAgICBpZiAodG91Y2hTY3JvbGxUYXJnZXQpIHtcbiAgICAgICAgICB0b3VjaFNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgcHJldmVudEluZXJ0aWFTY3JvbGwsIHRoaXMubGlzdGVuZXJPcHRpb25zKTtcbiAgICAgICAgICB0b3VjaFNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBhbGxvd1RvdWNoTW92ZSwgdGhpcy5saXN0ZW5lck9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGluY3JlbWVudCBhY3RpdmUgc2Nyb2xsIGxvY2tzXG4gICAgICBhY3RpdmVTY3JvbGxMb2NrcyArPSAxO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKCFjYW5Vc2VET00pIHJldHVybjtcblxuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGFjY291bnRGb3JTY3JvbGxiYXJzID0gX3Byb3BzMi5hY2NvdW50Rm9yU2Nyb2xsYmFycyxcbiAgICAgICAgICB0b3VjaFNjcm9sbFRhcmdldCA9IF9wcm9wczIudG91Y2hTY3JvbGxUYXJnZXQ7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgdmFyIHRhcmdldFN0eWxlID0gdGFyZ2V0ICYmIHRhcmdldC5zdHlsZTtcblxuICAgICAgLy8gc2FmZWx5IGRlY3JlbWVudCBhY3RpdmUgc2Nyb2xsIGxvY2tzXG4gICAgICBhY3RpdmVTY3JvbGxMb2NrcyA9IE1hdGgubWF4KGFjdGl2ZVNjcm9sbExvY2tzIC0gMSwgMCk7XG5cbiAgICAgIC8vIHJlYXBwbHkgb3JpZ2luYWwgYm9keSBzdHlsZXMsIGlmIGFueVxuICAgICAgaWYgKGFjY291bnRGb3JTY3JvbGxiYXJzICYmIGFjdGl2ZVNjcm9sbExvY2tzIDwgMSkge1xuICAgICAgICBTVFlMRV9LRVlTLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciB2YWwgPSBfdGhpczMub3JpZ2luYWxTdHlsZXNba2V5XTtcbiAgICAgICAgICBpZiAodGFyZ2V0U3R5bGUpIHtcbiAgICAgICAgICAgIHRhcmdldFN0eWxlW2tleV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIHRvdWNoIGxpc3RlbmVyc1xuICAgICAgaWYgKHRhcmdldCAmJiBpc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnRUb3VjaE1vdmUsIHRoaXMubGlzdGVuZXJPcHRpb25zKTtcblxuICAgICAgICBpZiAodG91Y2hTY3JvbGxUYXJnZXQpIHtcbiAgICAgICAgICB0b3VjaFNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgcHJldmVudEluZXJ0aWFTY3JvbGwsIHRoaXMubGlzdGVuZXJPcHRpb25zKTtcbiAgICAgICAgICB0b3VjaFNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBhbGxvd1RvdWNoTW92ZSwgdGhpcy5saXN0ZW5lck9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTY3JvbGxMb2NrO1xufShDb21wb25lbnQpO1xuXG5TY3JvbGxMb2NrLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWNjb3VudEZvclNjcm9sbGJhcnM6IHRydWVcbn07XG5cbnZhciBjcmVhdGVQcmltaXRpdmUgPSBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmUoVGFnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBjc3MkJDEgPSBfcmVmLmNzcyxcbiAgICAgICAgaW5uZXJSZWYgPSBfcmVmLmlubmVyUmVmLFxuICAgICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnY3NzJywgJ2lubmVyUmVmJ10pO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRhZywgX2V4dGVuZHMoeyByZWY6IGlubmVyUmVmLCBjbGFzc05hbWU6IGNzcyhjc3MkJDEpXG4gICAgfSwgcHJvcHMpKTtcbiAgfTtcbn07XG52YXIgRGl2ID0gY3JlYXRlUHJpbWl0aXZlKCdkaXYnKTtcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG52YXIgQTExeVRleHQgPSBmdW5jdGlvbiBBMTF5VGV4dChwcm9wcykge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGNzcyh7XG4gICAgICBib3JkZXI6IDAsXG4gICAgICBjbGlwOiAncmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpJyxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIHBhZGRpbmc6IDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgd2lkdGg6IDFcbiAgICB9KVxuICB9LCBwcm9wcykpO1xufTtcblxuZnVuY3Rpb24gU2Nyb2xsQmxvY2soKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIERpdixcbiAgICB7XG4gICAgICBjbGFzc05hbWU6IGNzcyh7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwLCB0b3A6IDAgfSlcbiAgICB9LFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2Nyb2xsTG9jaywgbnVsbClcbiAgKTtcbn1cblxudmFyIFNjcm9sbENhcHRvciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKFNjcm9sbENhcHRvciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU2Nyb2xsQ2FwdG9yKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcm9sbENhcHRvcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9yZWYgPSBTY3JvbGxDYXB0b3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTY3JvbGxDYXB0b3IpKS5jYWxsLmFwcGx5KF9yZWYsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5pc0JvdHRvbSA9IGZhbHNlLCBfdGhpcy5pc1RvcCA9IGZhbHNlLCBfdGhpcy5jYW5jZWxTY3JvbGwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9LCBfdGhpcy5oYW5kbGVFdmVudERlbHRhID0gZnVuY3Rpb24gKGV2ZW50LCBkZWx0YSkge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgb25Cb3R0b21BcnJpdmUgPSBfdGhpcyRwcm9wcy5vbkJvdHRvbUFycml2ZSxcbiAgICAgICAgICBvbkJvdHRvbUxlYXZlID0gX3RoaXMkcHJvcHMub25Cb3R0b21MZWF2ZSxcbiAgICAgICAgICBvblRvcEFycml2ZSA9IF90aGlzJHByb3BzLm9uVG9wQXJyaXZlLFxuICAgICAgICAgIG9uVG9wTGVhdmUgPSBfdGhpcyRwcm9wcy5vblRvcExlYXZlO1xuICAgICAgdmFyIF90aGlzJHNjcm9sbFRhcmdldCA9IF90aGlzLnNjcm9sbFRhcmdldCxcbiAgICAgICAgICBzY3JvbGxUb3AgPSBfdGhpcyRzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wLFxuICAgICAgICAgIHNjcm9sbEhlaWdodCA9IF90aGlzJHNjcm9sbFRhcmdldC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgY2xpZW50SGVpZ2h0ID0gX3RoaXMkc2Nyb2xsVGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgdmFyIHRhcmdldCA9IF90aGlzLnNjcm9sbFRhcmdldDtcbiAgICAgIHZhciBpc0RlbHRhUG9zaXRpdmUgPSBkZWx0YSA+IDA7XG4gICAgICB2YXIgYXZhaWxhYmxlU2Nyb2xsID0gc2Nyb2xsSGVpZ2h0IC0gY2xpZW50SGVpZ2h0IC0gc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNob3VsZENhbmNlbFNjcm9sbCA9IGZhbHNlO1xuXG4gICAgICAvLyByZXNldCBib3R0b20vdG9wIGZsYWdzXG4gICAgICBpZiAoYXZhaWxhYmxlU2Nyb2xsID4gZGVsdGEgJiYgX3RoaXMuaXNCb3R0b20pIHtcbiAgICAgICAgaWYgKG9uQm90dG9tTGVhdmUpIG9uQm90dG9tTGVhdmUoZXZlbnQpO1xuICAgICAgICBfdGhpcy5pc0JvdHRvbSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGlzRGVsdGFQb3NpdGl2ZSAmJiBfdGhpcy5pc1RvcCkge1xuICAgICAgICBpZiAob25Ub3BMZWF2ZSkgb25Ub3BMZWF2ZShldmVudCk7XG4gICAgICAgIF90aGlzLmlzVG9wID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGJvdHRvbSBsaW1pdFxuICAgICAgaWYgKGlzRGVsdGFQb3NpdGl2ZSAmJiBkZWx0YSA+IGF2YWlsYWJsZVNjcm9sbCkge1xuICAgICAgICBpZiAob25Cb3R0b21BcnJpdmUgJiYgIV90aGlzLmlzQm90dG9tKSB7XG4gICAgICAgICAgb25Cb3R0b21BcnJpdmUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5zY3JvbGxUb3AgPSBzY3JvbGxIZWlnaHQ7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgICAgIF90aGlzLmlzQm90dG9tID0gdHJ1ZTtcblxuICAgICAgICAvLyB0b3AgbGltaXRcbiAgICAgIH0gZWxzZSBpZiAoIWlzRGVsdGFQb3NpdGl2ZSAmJiAtZGVsdGEgPiBzY3JvbGxUb3ApIHtcbiAgICAgICAgaWYgKG9uVG9wQXJyaXZlICYmICFfdGhpcy5pc1RvcCkge1xuICAgICAgICAgIG9uVG9wQXJyaXZlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuaXNUb3AgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjYW5jZWwgc2Nyb2xsXG4gICAgICBpZiAoc2hvdWxkQ2FuY2VsU2Nyb2xsKSB7XG4gICAgICAgIF90aGlzLmNhbmNlbFNjcm9sbChldmVudCk7XG4gICAgICB9XG4gICAgfSwgX3RoaXMub25XaGVlbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgX3RoaXMuaGFuZGxlRXZlbnREZWx0YShldmVudCwgZXZlbnQuZGVsdGFZKTtcbiAgICB9LCBfdGhpcy5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIC8vIHNldCB0b3VjaCBzdGFydCBzbyB3ZSBjYW4gY2FsY3VsYXRlIHRvdWNobW92ZSBkZWx0YVxuICAgICAgX3RoaXMudG91Y2hTdGFydCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG4gICAgfSwgX3RoaXMub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBkZWx0YVkgPSBfdGhpcy50b3VjaFN0YXJ0IC0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgIF90aGlzLmhhbmRsZUV2ZW50RGVsdGEoZXZlbnQsIGRlbHRhWSk7XG4gICAgfSwgX3RoaXMuZ2V0U2Nyb2xsVGFyZ2V0ID0gZnVuY3Rpb24gKHJlZikge1xuICAgICAgX3RoaXMuc2Nyb2xsVGFyZ2V0ID0gcmVmO1xuICAgIH0sIF90ZW1wKSwgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhTY3JvbGxDYXB0b3IsIFt7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuc3RhcnRMaXN0ZW5pbmcodGhpcy5zY3JvbGxUYXJnZXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcodGhpcy5zY3JvbGxUYXJnZXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0YXJ0TGlzdGVuaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRMaXN0ZW5pbmcoZWwpIHtcbiAgICAgIC8vIGJhaWwgZWFybHkgaWYgbm8gc2Nyb2xsIGF2YWlsYWJsZVxuICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA8PSBlbC5jbGllbnRIZWlnaHQpIHJldHVybjtcblxuICAgICAgLy8gYWxsIHRoZSBpZiBzdGF0ZW1lbnRzIGFyZSB0byBhcHBlYXNlIEZsb3cg8J+YolxuICAgICAgaWYgKHR5cGVvZiBlbC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5vbldoZWVsLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGVsLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGVsLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0b3BMaXN0ZW5pbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wTGlzdGVuaW5nKGVsKSB7XG4gICAgICAvLyBiYWlsIGVhcmx5IGlmIG5vIHNjcm9sbCBhdmFpbGFibGVcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPD0gZWwuY2xpZW50SGVpZ2h0KSByZXR1cm47XG5cbiAgICAgIC8vIGFsbCB0aGUgaWYgc3RhdGVtZW50cyBhcmUgdG8gYXBwZWFzZSBGbG93IPCfmKJcbiAgICAgIGlmICh0eXBlb2YgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMub25XaGVlbCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlbC5yZW1vdmVFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlbC5yZW1vdmVFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgTm9kZVJlc29sdmVyLFxuICAgICAgICB7IGlubmVyUmVmOiB0aGlzLmdldFNjcm9sbFRhcmdldCB9LFxuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Nyb2xsQ2FwdG9yO1xufShDb21wb25lbnQpO1xuXG52YXIgU2Nyb2xsQ2FwdG9yU3dpdGNoID0gZnVuY3Rpb24gKF9Db21wb25lbnQyKSB7XG4gIGluaGVyaXRzKFNjcm9sbENhcHRvclN3aXRjaCwgX0NvbXBvbmVudDIpO1xuXG4gIGZ1bmN0aW9uIFNjcm9sbENhcHRvclN3aXRjaCgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JvbGxDYXB0b3JTd2l0Y2gpO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChTY3JvbGxDYXB0b3JTd2l0Y2guX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTY3JvbGxDYXB0b3JTd2l0Y2gpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKFNjcm9sbENhcHRvclN3aXRjaCwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpc0VuYWJsZWQgPSBfcHJvcHMuaXNFbmFibGVkLFxuICAgICAgICAgIHByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ2lzRW5hYmxlZCddKTtcblxuICAgICAgcmV0dXJuIGlzRW5hYmxlZCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2Nyb2xsQ2FwdG9yLCBwcm9wcykgOiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Nyb2xsQ2FwdG9yU3dpdGNoO1xufShDb21wb25lbnQpO1xuXG5TY3JvbGxDYXB0b3JTd2l0Y2guZGVmYXVsdFByb3BzID0geyBpc0VuYWJsZWQ6IHRydWUgfTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBOTyBPUFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENsYXNzIE5hbWUgUHJlZml4ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgY29tcG9uZW50IHN0YXRlIGZvciBzdHlsaW5nIHdpdGggY2xhc3MgbmFtZXMuXG5cbiBFeHBlY3RzIGFuIGFycmF5IG9mIHN0cmluZ3MgT1IgYSBzdHJpbmcvb2JqZWN0IHBhaXI6XG4gLSBjbGFzc05hbWUoWydjb21wJywgJ2NvbXAtYXJnJywgJ2NvbXAtYXJnLTInXSlcbiAgIEByZXR1cm5zICdyZWFjdC1zZWxlY3RfX2NvbXAgcmVhY3Qtc2VsZWN0X19jb21wLWFyZyByZWFjdC1zZWxlY3RfX2NvbXAtYXJnLTInXG4gLSBjbGFzc05hbWUoJ2NvbXAnLCB7IHNvbWU6IHRydWUsIHN0YXRlOiBmYWxzZSB9KVxuICAgQHJldHVybnMgJ3JlYWN0LXNlbGVjdF9fY29tcCByZWFjdC1zZWxlY3RfX2NvbXAtLXNvbWUnXG4qL1xuZnVuY3Rpb24gYXBwbHlQcmVmaXhUb05hbWUocHJlZml4LCBuYW1lKSB7XG4gIHJldHVybiBuYW1lID8gcHJlZml4ICsgJ19fJyArIG5hbWUgOiBwcmVmaXg7XG59XG5cbmZ1bmN0aW9uIGNsYXNzTmFtZXMocHJlZml4LCBjc3NLZXksIHN0YXRlLCBjbGFzc05hbWUpIHtcbiAgdmFyIGFyciA9IFtjc3NLZXksIGNsYXNzTmFtZV07XG4gIGlmIChzdGF0ZSAmJiBwcmVmaXgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3RhdGUpIHtcbiAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHN0YXRlW2tleV0pIHtcbiAgICAgICAgYXJyLnB1c2goJycgKyBhcHBseVByZWZpeFRvTmFtZShwcmVmaXgsIGtleSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGk7XG4gIH0pLm1hcChmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBTdHJpbmcoaSkudHJpbSgpO1xuICB9KS5qb2luKCcgJyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENsZWFuIFZhbHVlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIGNsZWFuVmFsdWUgPSBmdW5jdGlvbiBjbGVhblZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIHZhbHVlLmZpbHRlcihCb29sZWFuKTtcbiAgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSByZXR1cm4gW3ZhbHVlXTtcbiAgcmV0dXJuIFtdO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBIYW5kbGUgSW5wdXQgQ2hhbmdlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gaGFuZGxlSW5wdXRDaGFuZ2UoaW5wdXRWYWx1ZSwgYWN0aW9uTWV0YSwgb25JbnB1dENoYW5nZSkge1xuICBpZiAob25JbnB1dENoYW5nZSkge1xuICAgIHZhciBuZXdWYWx1ZSA9IG9uSW5wdXRDaGFuZ2UoaW5wdXRWYWx1ZSwgYWN0aW9uTWV0YSk7XG4gICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ3N0cmluZycpIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuICByZXR1cm4gaW5wdXRWYWx1ZTtcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTY3JvbGwgSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KGVsKSB7XG4gIHJldHVybiBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5LCB3aW5kb3ddLmluY2x1ZGVzKGVsKTtcbn1cblxuLy8gTm9ybWFsaXplZCBzY3JvbGxUbyAmIHNjcm9sbFRvcFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGdldFNjcm9sbFRvcChlbCkge1xuICBpZiAoaXNEb2N1bWVudEVsZW1lbnQoZWwpKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgfVxuICByZXR1cm4gZWwuc2Nyb2xsVG9wO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxUbyhlbCwgdG9wKSB7XG4gIC8vIHdpdGggYSBzY3JvbGwgZGlzdGFuY2UsIHdlIHBlcmZvcm0gc2Nyb2xsIG9uIHRoZSBlbGVtZW50XG4gIGlmIChpc0RvY3VtZW50RWxlbWVudChlbCkpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdG9wKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBlbC5zY3JvbGxUb3AgPSB0b3A7XG59XG5cbi8vIEdldCBTY3JvbGwgUGFyZW50XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KGVsZW1lbnQpIHtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgdmFyIGV4Y2x1ZGVTdGF0aWNQYXJlbnQgPSBzdHlsZS5wb3NpdGlvbiA9PT0gJ2Fic29sdXRlJztcbiAgdmFyIG92ZXJmbG93UnggPSAvKGF1dG98c2Nyb2xsKS87XG4gIHZhciBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsgLy8gc3VjayBpdCwgZmxvdy4uLlxuXG4gIGlmIChzdHlsZS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykgcmV0dXJuIGRvY0VsO1xuXG4gIGZvciAodmFyIHBhcmVudCA9IGVsZW1lbnQ7IHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50Oykge1xuICAgIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgIGlmIChleGNsdWRlU3RhdGljUGFyZW50ICYmIHN0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChvdmVyZmxvd1J4LnRlc3Qoc3R5bGUub3ZlcmZsb3cgKyBzdHlsZS5vdmVyZmxvd1kgKyBzdHlsZS5vdmVyZmxvd1gpKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkb2NFbDtcbn1cblxuLy8gQW5pbWF0ZWQgU2Nyb2xsIFRvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gIEBwYXJhbSB0OiB0aW1lIChlbGFwc2VkKVxuICBAcGFyYW0gYjogaW5pdGlhbCB2YWx1ZVxuICBAcGFyYW0gYzogYW1vdW50IG9mIGNoYW5nZVxuICBAcGFyYW0gZDogZHVyYXRpb25cbiovXG5mdW5jdGlvbiBlYXNlT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZWRTY3JvbGxUbyhlbGVtZW50LCB0bykge1xuICB2YXIgZHVyYXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDIwMDtcbiAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBub29wO1xuXG4gIHZhciBzdGFydCA9IGdldFNjcm9sbFRvcChlbGVtZW50KTtcbiAgdmFyIGNoYW5nZSA9IHRvIC0gc3RhcnQ7XG4gIHZhciBpbmNyZW1lbnQgPSAxMDtcbiAgdmFyIGN1cnJlbnRUaW1lID0gMDtcblxuICBmdW5jdGlvbiBhbmltYXRlU2Nyb2xsKCkge1xuICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcbiAgICB2YXIgdmFsID0gZWFzZU91dEN1YmljKGN1cnJlbnRUaW1lLCBzdGFydCwgY2hhbmdlLCBkdXJhdGlvbik7XG4gICAgc2Nyb2xsVG8oZWxlbWVudCwgdmFsKTtcbiAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikge1xuICAgICAgcmFmKGFuaW1hdGVTY3JvbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhlbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgYW5pbWF0ZVNjcm9sbCgpO1xufVxuXG4vLyBTY3JvbGwgSW50byBWaWV3XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcobWVudUVsLCBmb2N1c2VkRWwpIHtcbiAgdmFyIG1lbnVSZWN0ID0gbWVudUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgZm9jdXNlZFJlY3QgPSBmb2N1c2VkRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBvdmVyU2Nyb2xsID0gZm9jdXNlZEVsLm9mZnNldEhlaWdodCAvIDM7XG5cbiAgaWYgKGZvY3VzZWRSZWN0LmJvdHRvbSArIG92ZXJTY3JvbGwgPiBtZW51UmVjdC5ib3R0b20pIHtcbiAgICBzY3JvbGxUbyhtZW51RWwsIE1hdGgubWluKGZvY3VzZWRFbC5vZmZzZXRUb3AgKyBmb2N1c2VkRWwuY2xpZW50SGVpZ2h0IC0gbWVudUVsLm9mZnNldEhlaWdodCArIG92ZXJTY3JvbGwsIG1lbnVFbC5zY3JvbGxIZWlnaHQpKTtcbiAgfSBlbHNlIGlmIChmb2N1c2VkUmVjdC50b3AgLSBvdmVyU2Nyb2xsIDwgbWVudVJlY3QudG9wKSB7XG4gICAgc2Nyb2xsVG8obWVudUVsLCBNYXRoLm1heChmb2N1c2VkRWwub2Zmc2V0VG9wIC0gb3ZlclNjcm9sbCwgMCkpO1xuICB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gR2V0IGJvdW5kaW5nIGNsaWVudCBvYmplY3Rcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBjYW5ub3QgZ2V0IGtleXMgdXNpbmcgYXJyYXkgbm90YXRpb24gd2l0aCBET01SZWN0XG5mdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudE9iaihlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICBib3R0b206IHJlY3QuYm90dG9tLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgIHJpZ2h0OiByZWN0LnJpZ2h0LFxuICAgIHRvcDogcmVjdC50b3AsXG4gICAgd2lkdGg6IHJlY3Qud2lkdGhcbiAgfTtcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBUb3VjaCBDYXBhYmlsaXR5IERldGVjdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gaXNUb3VjaENhcGFibGUoKSB7XG4gIHRyeSB7XG4gICAgZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE1vYmlsZSBEZXZpY2UgRGV0ZWN0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdEdyb3VwTGFiZWwgPSBmdW5jdGlvbiBmb3JtYXRHcm91cExhYmVsKGdyb3VwKSB7XG4gIHJldHVybiBncm91cC5sYWJlbDtcbn07XG5cbnZhciBnZXRPcHRpb25MYWJlbCA9IGZ1bmN0aW9uIGdldE9wdGlvbkxhYmVsKG9wdGlvbikge1xuICByZXR1cm4gb3B0aW9uLmxhYmVsO1xufTtcblxudmFyIGdldE9wdGlvblZhbHVlID0gZnVuY3Rpb24gZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSB7XG4gIHJldHVybiBvcHRpb24udmFsdWU7XG59O1xuXG52YXIgaXNPcHRpb25EaXNhYmxlZCA9IGZ1bmN0aW9uIGlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSB7XG4gIHJldHVybiAhIW9wdGlvbi5pc0Rpc2FibGVkO1xufTtcblxudmFyIGJvcmRlclJhZGl1cyA9IDQ7XG5cbnZhciBjb2xvcnMgPSB7XG4gIHRleHQ6ICcjMjIyJyxcbiAgdGV4dExpZ2h0OiAnIzQ0NCcsXG4gIHByaW1hcnk6ICcjMjY4NEZGJyxcbiAgcHJpbWFyeTc1OiAnIzRDOUFGRicsXG4gIHByaW1hcnk1MDogJyNCMkQ0RkYnLFxuICBwcmltYXJ5MjU6ICcjREVFQkZGJyxcbiAgZGFuZ2VyOiAnI0RFMzUwQicsXG4gIGRhbmdlckxpZ2h0OiAnI0ZGQkRBRCcsXG5cbiAgbmV1dHJhbDA6ICdoc2woMCwgMCUsIDEwMCUpJyxcbiAgbmV1dHJhbDE6ICdoc2woMCwgMCUsIDk5JSknLFxuICBuZXV0cmFsMjogJ2hzbCgwLCAwJSwgOTglKScsXG4gIG5ldXRyYWwzOiAnaHNsKDAsIDAlLCA5NyUpJyxcbiAgbmV1dHJhbDQ6ICdoc2woMCwgMCUsIDk2JSknLFxuICBuZXV0cmFsNTogJ2hzbCgwLCAwJSwgOTUlKScsXG4gIG5ldXRyYWwxMDogJ2hzbCgwLCAwJSwgOTAlKScsXG4gIG5ldXRyYWwyMDogJ2hzbCgwLCAwJSwgODAlKScsXG4gIG5ldXRyYWwzMDogJ2hzbCgwLCAwJSwgNzAlKScsXG4gIG5ldXRyYWw0MDogJ2hzbCgwLCAwJSwgNjAlKScsXG4gIG5ldXRyYWw1MDogJ2hzbCgwLCAwJSwgNTAlKScsXG4gIG5ldXRyYWw2MDogJ2hzbCgwLCAwJSwgNDAlKScsXG4gIG5ldXRyYWw3MDogJ2hzbCgwLCAwJSwgMzAlKScsXG4gIG5ldXRyYWw4MDogJ2hzbCgwLCAwJSwgMjAlKScsXG4gIG5ldXRyYWw5MDogJ2hzbCgwLCAwJSwgMTAlKScsXG4gIG5ldXRyYWwxMDA6ICdoc2woMCwgMCUsIDAlKScsXG5cbiAgbmV1dHJhbDFhOiAnaHNsYSgwLCAwJSwgMCUsIDAuMDEpJyxcbiAgbmV1dHJhbDJhOiAnaHNsYSgwLCAwJSwgMCUsIDAuMDIpJyxcbiAgbmV1dHJhbDNhOiAnaHNsYSgwLCAwJSwgMCUsIDAuMDMpJyxcbiAgbmV1dHJhbDRhOiAnaHNsYSgwLCAwJSwgMCUsIDAuMDQpJyxcbiAgbmV1dHJhbDVhOiAnaHNsYSgwLCAwJSwgMCUsIDAuMDUpJyxcbiAgbmV1dHJhbDEwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjEpJyxcbiAgbmV1dHJhbDIwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjIpJyxcbiAgbmV1dHJhbDMwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjMpJyxcbiAgbmV1dHJhbDQwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjQpJyxcbiAgbmV1dHJhbDUwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjUpJyxcbiAgbmV1dHJhbDYwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjYpJyxcbiAgbmV1dHJhbDcwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjcpJyxcbiAgbmV1dHJhbDgwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjgpJyxcbiAgbmV1dHJhbDkwYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjkpJ1xufTtcblxudmFyIGJhc2VVbml0ID0gNDtcblxudmFyIHNwYWNpbmcgPSB7XG4gIC8qIFVzZWQgdG8gY2FsY3VsYXRlIGNvbnNpc3RlbnQgbWFyZ2luL3BhZGRpbmcgb24gZWxlbWVudHMgKi9cbiAgYmFzZVVuaXQ6IGJhc2VVbml0LFxuICAvKiBUaGUgbWluaW11bSBoZWlnaHQgb2YgdGhlIGNvbnRyb2wgKi9cbiAgY29udHJvbEhlaWdodDogMzgsXG4gIC8qIFRoZSBhbW91bnQgb2Ygc3BhY2UgYmV0d2VlbiB0aGUgY29udHJvbCBhbmQgbWVudSAqL1xuICBtZW51R3V0dGVyOiBiYXNlVW5pdCAqIDJcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUm9vdCBDb250YWluZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgY29udGFpbmVyQ1NTID0gZnVuY3Rpb24gY29udGFpbmVyQ1NTKF9yZWYpIHtcbiAgdmFyIGlzRGlzYWJsZWQgPSBfcmVmLmlzRGlzYWJsZWQsXG4gICAgICBpc1J0bCA9IF9yZWYuaXNSdGw7XG4gIHJldHVybiB7XG4gICAgZGlyZWN0aW9uOiBpc1J0bCA/ICdydGwnIDogbnVsbCxcbiAgICBwb2ludGVyRXZlbnRzOiBpc0Rpc2FibGVkID8gJ25vbmUnIDogbnVsbCwgLy8gY2FuY2VsIG1vdXNlIGV2ZW50cyB3aGVuIGRpc2FibGVkXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfTtcbn07XG52YXIgU2VsZWN0Q29udGFpbmVyID0gZnVuY3Rpb24gU2VsZWN0Q29udGFpbmVyKHByb3BzKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzLFxuICAgICAgaXNEaXNhYmxlZCA9IHByb3BzLmlzRGlzYWJsZWQsXG4gICAgICBpc1J0bCA9IHByb3BzLmlzUnRsO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdjb250YWluZXInLCBwcm9wcykpLCB7XG4gICAgICAgICctLWlzLWRpc2FibGVkJzogaXNEaXNhYmxlZCxcbiAgICAgICAgJy0taXMtcnRsJzogaXNSdGxcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCBpbm5lclByb3BzKSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBWYWx1ZSBDb250YWluZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgdmFsdWVDb250YWluZXJDU1MgPSBmdW5jdGlvbiB2YWx1ZUNvbnRhaW5lckNTUygpIHtcbiAgcmV0dXJuIHtcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleDogMSxcbiAgICBmbGV4V3JhcDogJ3dyYXAnLFxuICAgIHBhZGRpbmc6IHNwYWNpbmcuYmFzZVVuaXQgLyAyICsgJ3B4ICcgKyBzcGFjaW5nLmJhc2VVbml0ICogMiArICdweCcsXG4gICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6ICd0b3VjaCcsXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfTtcbn07XG52YXIgVmFsdWVDb250YWluZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhWYWx1ZUNvbnRhaW5lciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVmFsdWVDb250YWluZXIoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgVmFsdWVDb250YWluZXIpO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChWYWx1ZUNvbnRhaW5lci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZhbHVlQ29udGFpbmVyKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhWYWx1ZUNvbnRhaW5lciwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgIGN4ID0gX3Byb3BzLmN4LFxuICAgICAgICAgIGlzTXVsdGkgPSBfcHJvcHMuaXNNdWx0aSxcbiAgICAgICAgICBnZXRTdHlsZXMgPSBfcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgICAgIGhhc1ZhbHVlID0gX3Byb3BzLmhhc1ZhbHVlO1xuXG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCd2YWx1ZUNvbnRhaW5lcicsIHRoaXMucHJvcHMpKSwge1xuICAgICAgICAgICAgJ3ZhbHVlLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAgICAgICAndmFsdWUtY29udGFpbmVyLS1pcy1tdWx0aSc6IGlzTXVsdGksXG4gICAgICAgICAgICAndmFsdWUtY29udGFpbmVyLS1oYXMtdmFsdWUnOiBoYXNWYWx1ZVxuICAgICAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBWYWx1ZUNvbnRhaW5lcjtcbn0oQ29tcG9uZW50KTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBJbmRpY2F0b3IgQ29udGFpbmVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIGluZGljYXRvcnNDb250YWluZXJDU1MgPSBmdW5jdGlvbiBpbmRpY2F0b3JzQ29udGFpbmVyQ1NTKCkge1xuICByZXR1cm4ge1xuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4U2hyaW5rOiAwXG4gIH07XG59O1xudmFyIEluZGljYXRvcnNDb250YWluZXIgPSBmdW5jdGlvbiBJbmRpY2F0b3JzQ29udGFpbmVyKHByb3BzKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcztcblxuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdpbmRpY2F0b3JzQ29udGFpbmVyJywgcHJvcHMpKSwge1xuICAgICAgICAnaW5kaWNhdG9ycyc6IHRydWVcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgU3ZnID0gZnVuY3Rpb24gU3ZnKF9yZWYpIHtcbiAgdmFyIHNpemUgPSBfcmVmLnNpemUsXG4gICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnc2l6ZSddKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIF9leHRlbmRzKHtcbiAgICBoZWlnaHQ6IHNpemUsXG4gICAgd2lkdGg6IHNpemUsXG4gICAgdmlld0JveDogJzAgMCAyMCAyMCcsXG4gICAgY2xhc3NOYW1lOiAvKiNfX1BVUkVfXyovIC8qI19fUFVSRV9fKi9jc3Moe1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgc3Ryb2tlV2lkdGg6IDBcbiAgICB9KVxuICB9LCBwcm9wcykpO1xufTtcblxudmFyIENyb3NzSWNvbiA9IGZ1bmN0aW9uIENyb3NzSWNvbihwcm9wcykge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBTdmcsXG4gICAgX2V4dGVuZHMoeyBzaXplOiAyMCwgZm9jdXNhYmxlOiAnZmFsc2UnLCByb2xlOiAncHJlc2VudGF0aW9uJyB9LCBwcm9wcyksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ00xNC4zNDggMTQuODQ5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwbC0yLjY1MS0zLjAzMC0yLjY1MSAzLjAyOWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMC0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOSAwLTEuNjk3bDIuNzU4LTMuMTUtMi43NTktMy4xNTJjLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI4IDAtMS42OTdzMS4yMjgtMC40NjkgMS42OTcgMGwyLjY1MiAzLjAzMSAyLjY1MS0zLjAzMWMwLjQ2OS0wLjQ2OSAxLjIyOC0wLjQ2OSAxLjY5NyAwczAuNDY5IDEuMjI5IDAgMS42OTdsLTIuNzU4IDMuMTUyIDIuNzU4IDMuMTVjMC40NjkgMC40NjkgMC40NjkgMS4yMjkgMCAxLjY5OHonIH0pXG4gICk7XG59O1xudmFyIERvd25DaGV2cm9uID0gZnVuY3Rpb24gRG93bkNoZXZyb24ocHJvcHMpIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgU3ZnLFxuICAgIF9leHRlbmRzKHsgc2l6ZTogMjAsIGZvY3VzYWJsZTogJ2ZhbHNlJywgcm9sZTogJ3ByZXNlbnRhdGlvbicgfSwgcHJvcHMpLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6JyB9KVxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgYmFzZUNTUyA9IGZ1bmN0aW9uIGJhc2VDU1MoX3JlZjIpIHtcbiAgdmFyIGlzRm9jdXNlZCA9IF9yZWYyLmlzRm9jdXNlZDtcbiAgcmV0dXJuIHtcbiAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6IHNwYWNpbmcuYmFzZVVuaXQgKiAyLFxuICAgIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG5cbiAgICAnOmhvdmVyJzoge1xuICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsMTAwIDogY29sb3JzLm5ldXRyYWw0MFxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG52YXIgRHJvcGRvd25JbmRpY2F0b3IgPSBmdW5jdGlvbiBEcm9wZG93bkluZGljYXRvcihwcm9wcykge1xuICB2YXIgX3Byb3BzJGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjaGlsZHJlbiA9IF9wcm9wcyRjaGlsZHJlbiA9PT0gdW5kZWZpbmVkID8gUmVhY3QuY3JlYXRlRWxlbWVudChEb3duQ2hldnJvbiwgbnVsbCkgOiBfcHJvcHMkY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHM7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgX2V4dGVuZHMoe30sIGlubmVyUHJvcHMsIHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdkcm9wZG93bkluZGljYXRvcicsIHByb3BzKSksIHtcbiAgICAgICAgJ2luZGljYXRvcic6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlXG4gICAgICB9LCBjbGFzc05hbWUpXG4gICAgfSksXG4gICAgY2hpbGRyZW5cbiAgKTtcbn07XG5cbnZhciBjbGVhckluZGljYXRvckNTUyA9IGJhc2VDU1M7XG52YXIgQ2xlYXJJbmRpY2F0b3IgPSBmdW5jdGlvbiBDbGVhckluZGljYXRvcihwcm9wcykge1xuICB2YXIgX3Byb3BzJGNoaWxkcmVuMiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2hpbGRyZW4gPSBfcHJvcHMkY2hpbGRyZW4yID09PSB1bmRlZmluZWQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENyb3NzSWNvbiwgbnVsbCkgOiBfcHJvcHMkY2hpbGRyZW4yLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHt9LCBpbm5lclByb3BzLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnY2xlYXJJbmRpY2F0b3InLCBwcm9wcykpLCB7XG4gICAgICAgICdpbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICAnY2xlYXItaW5kaWNhdG9yJzogdHJ1ZVxuICAgICAgfSwgY2xhc3NOYW1lKVxuICAgIH0pLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFNlcGFyYXRvclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSBmdW5jdGlvbiBpbmRpY2F0b3JTZXBhcmF0b3JDU1MoX3JlZjMpIHtcbiAgdmFyIGlzRGlzYWJsZWQgPSBfcmVmMy5pc0Rpc2FibGVkO1xuICByZXR1cm4ge1xuICAgIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgIG1hcmdpbkJvdHRvbTogc3BhY2luZy5iYXNlVW5pdCAqIDIsXG4gICAgbWFyZ2luVG9wOiBzcGFjaW5nLmJhc2VVbml0ICogMixcbiAgICB3aWR0aDogMVxuICB9O1xufTtcblxudmFyIEluZGljYXRvclNlcGFyYXRvciA9IGZ1bmN0aW9uIEluZGljYXRvclNlcGFyYXRvcihwcm9wcykge1xuICB2YXIgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgX2V4dGVuZHMoe30sIGlubmVyUHJvcHMsIHtcbiAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnaW5kaWNhdG9yU2VwYXJhdG9yJywgcHJvcHMpKSwgeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKVxuICB9KSk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIga2V5ZnJhbWVzTmFtZSA9ICdyZWFjdC1zZWxlY3QtbG9hZGluZy1pbmRpY2F0b3InO1xuXG52YXIgbG9hZGluZ0luZGljYXRvckNTUyA9IGZ1bmN0aW9uIGxvYWRpbmdJbmRpY2F0b3JDU1MoX3JlZjQpIHtcbiAgdmFyIGlzRm9jdXNlZCA9IF9yZWY0LmlzRm9jdXNlZCxcbiAgICAgIHNpemUgPSBfcmVmNC5zaXplO1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgcGFkZGluZzogc3BhY2luZy5iYXNlVW5pdCAqIDIsXG4gICAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgIGZvbnRTaXplOiBzaXplLFxuICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJ1xuICB9O1xufTtcblxudmFyIExvYWRpbmdEb3QgPSBmdW5jdGlvbiBMb2FkaW5nRG90KF9yZWY1KSB7XG4gIHZhciBjb2xvciA9IF9yZWY1LmNvbG9yLFxuICAgICAgZGVsYXkgPSBfcmVmNS5kZWxheSxcbiAgICAgIG9mZnNldCA9IF9yZWY1Lm9mZnNldDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XG4gICAgY3NzOiB7XG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogJzFzJyxcbiAgICAgIGFuaW1hdGlvbkRlbGF5OiBkZWxheSArICdtcycsXG4gICAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogJ2luZmluaXRlJyxcbiAgICAgIGFuaW1hdGlvbk5hbWU6IGtleWZyYW1lc05hbWUsXG4gICAgICBhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2Vhc2UtaW4tb3V0JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxZW0nLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBtYXJnaW5MZWZ0OiBvZmZzZXQgPyAnMWVtJyA6IG51bGwsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbSdcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuaW5qZWN0R2xvYmFsKCdAa2V5ZnJhbWVzICcsIGtleWZyYW1lc05hbWUsICd7MCUsODAlLDEwMCV7b3BhY2l0eTowO300MCV7b3BhY2l0eToxO319OycpO1xuXG52YXIgTG9hZGluZ0luZGljYXRvciA9IGZ1bmN0aW9uIExvYWRpbmdJbmRpY2F0b3IocHJvcHMpIHtcbiAgdmFyIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcyxcbiAgICAgIGlzRm9jdXNlZCA9IHByb3BzLmlzRm9jdXNlZCxcbiAgICAgIGlzUnRsID0gcHJvcHMuaXNSdGw7XG5cbiAgdmFyIGNvbG9yID0gaXNGb2N1c2VkID8gY29sb3JzLnRleHQgOiBjb2xvcnMubmV1dHJhbDIwO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHt9LCBpbm5lclByb3BzLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnbG9hZGluZ0luZGljYXRvcicsIHByb3BzKSksIHtcbiAgICAgICAgJ2luZGljYXRvcic6IHRydWUsXG4gICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWVcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9KSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmdEb3QsIHsgY29sb3I6IGNvbG9yLCBkZWxheTogMCwgb2Zmc2V0OiBpc1J0bCB9KSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmdEb3QsIHsgY29sb3I6IGNvbG9yLCBkZWxheTogMTYwLCBvZmZzZXQ6IHRydWUgfSksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nRG90LCB7IGNvbG9yOiBjb2xvciwgZGVsYXk6IDMyMCwgb2Zmc2V0OiAhaXNSdGwgfSksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIEExMXlUZXh0LFxuICAgICAgbnVsbCxcbiAgICAgICdMb2FkaW5nJ1xuICAgIClcbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuXG52YXIgY3NzJDEgPSBmdW5jdGlvbiBjc3MkJDEoX3JlZikge1xuICB2YXIgaXNEaXNhYmxlZCA9IF9yZWYuaXNEaXNhYmxlZCxcbiAgICAgIGlzRm9jdXNlZCA9IF9yZWYuaXNGb2N1c2VkO1xuICByZXR1cm4ge1xuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsNSA6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsMCA6IGNvbG9ycy5uZXV0cmFsMixcbiAgICBib3JkZXJDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBpc0ZvY3VzZWQgPyBjb2xvcnMucHJpbWFyeSA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgYm9yZGVyUmFkaXVzOiBib3JkZXJSYWRpdXMsXG4gICAgYm9yZGVyU3R5bGU6ICdzb2xpZCcsXG4gICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgYm94U2hhZG93OiBpc0ZvY3VzZWQgPyAnMCAwIDAgMXB4ICcgKyBjb2xvcnMucHJpbWFyeSA6IG51bGwsXG4gICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhXcmFwOiAnd3JhcCcsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICBtaW5IZWlnaHQ6IHNwYWNpbmcuY29udHJvbEhlaWdodCxcbiAgICBvdXRsaW5lOiAnMCAhaW1wb3J0YW50JyxcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICB0cmFuc2l0aW9uOiAnYWxsIDEwMG1zJyxcblxuICAgICcmOmhvdmVyJzoge1xuICAgICAgYm9yZGVyQ29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5wcmltYXJ5IDogY29sb3JzLm5ldXRyYWwzMFxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBDb250cm9sID0gZnVuY3Rpb24gQ29udHJvbChwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBpc0Rpc2FibGVkID0gcHJvcHMuaXNEaXNhYmxlZCxcbiAgICAgIGlzRm9jdXNlZCA9IHByb3BzLmlzRm9jdXNlZCxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuICB2YXIgaW5uZXJSZWYgPSBpbm5lclByb3BzLmlubmVyUmVmLFxuICAgICAgcmVzdCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKGlubmVyUHJvcHMsIFsnaW5uZXJSZWYnXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgX2V4dGVuZHMoe1xuICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdjb250cm9sJywgcHJvcHMpKSwge1xuICAgICAgICAnY29udHJvbCc6IHRydWUsXG4gICAgICAgICdjb250cm9sLWlzLWRpc2FibGVkJzogaXNEaXNhYmxlZCxcbiAgICAgICAgJ2NvbnRyb2wtaXMtZm9jdXNlZCc6IGlzRm9jdXNlZFxuICAgICAgfSwgY2xhc3NOYW1lKVxuICAgIH0sIHJlc3QpLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuXG52YXIgZ3JvdXBDU1MgPSBmdW5jdGlvbiBncm91cENTUygpIHtcbiAgcmV0dXJuIHtcbiAgICBwYWRkaW5nQm90dG9tOiBzcGFjaW5nLmJhc2VVbml0ICogMixcbiAgICBwYWRkaW5nVG9wOiBzcGFjaW5nLmJhc2VVbml0ICogMlxuICB9O1xufTtcblxudmFyIEdyb3VwID0gZnVuY3Rpb24gR3JvdXAocHJvcHMpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgSGVhZGluZyA9IHByb3BzLkhlYWRpbmcsXG4gICAgICBoZWFkaW5nUHJvcHMgPSBwcm9wcy5oZWFkaW5nUHJvcHMsXG4gICAgICBsYWJlbCA9IHByb3BzLmxhYmVsLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHM7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgX2V4dGVuZHMoe1xuICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ2dyb3VwJywgcHJvcHMpKSwgeyAnZ3JvdXAnOiB0cnVlIH0sIGNsYXNzTmFtZSlcbiAgICB9LCBpbm5lclByb3BzKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgSGVhZGluZyxcbiAgICAgIF9leHRlbmRzKHsgZ2V0U3R5bGVzOiBnZXRTdHlsZXMsIGN4OiBjeCB9LCBoZWFkaW5nUHJvcHMpLFxuICAgICAgbGFiZWxcbiAgICApLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnZGl2JyxcbiAgICAgIG51bGwsXG4gICAgICBjaGlsZHJlblxuICAgIClcbiAgKTtcbn07XG5cbnZhciBncm91cEhlYWRpbmdDU1MgPSBmdW5jdGlvbiBncm91cEhlYWRpbmdDU1MoKSB7XG4gIHJldHVybiB7XG4gICAgY29sb3I6ICcjOTk5JyxcbiAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIGZvbnRTaXplOiAnNzUlJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICBtYXJnaW5Cb3R0b206ICcwLjI1ZW0nLFxuICAgIHBhZGRpbmdMZWZ0OiBzcGFjaW5nLmJhc2VVbml0ICogMyxcbiAgICBwYWRkaW5nUmlnaHQ6IHNwYWNpbmcuYmFzZVVuaXQgKiAzLFxuICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gIH07XG59O1xuXG52YXIgR3JvdXBIZWFkaW5nID0gZnVuY3Rpb24gR3JvdXBIZWFkaW5nKHByb3BzKSB7XG4gIHZhciBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgY2xlYW5Qcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbJ2NsYXNzTmFtZScsICdjeCcsICdnZXRTdHlsZXMnXSk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnZ3JvdXBIZWFkaW5nJywgcHJvcHMpKSwgeyAnZ3JvdXAtaGVhZGluZyc6IHRydWUgfSwgY2xhc3NOYW1lKVxuICB9LCBjbGVhblByb3BzKSk7XG59O1xuXG52YXIgY3NzJDIgPSBmdW5jdGlvbiBjc3MkJDEoX3JlZikge1xuICB2YXIgaXNEaXNhYmxlZCA9IF9yZWYuaXNEaXNhYmxlZDtcbiAgcmV0dXJuIHtcbiAgICBtYXJnaW46IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIHBhZGRpbmdCb3R0b206IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIHBhZGRpbmdUb3A6IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIHZpc2liaWxpdHk6IGlzRGlzYWJsZWQgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJyxcbiAgICBjb2xvcjogY29sb3JzLnRleHRcbiAgfTtcbn07XG52YXIgaW5wdXRTdHlsZSA9IGZ1bmN0aW9uIGlucHV0U3R5bGUoaXNIaWRkZW4pIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kOiAwLFxuICAgIGJvcmRlcjogMCxcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgIG9wYWNpdHk6IGlzSGlkZGVuID8gMCA6IDEsXG4gICAgb3V0bGluZTogMCxcbiAgICBwYWRkaW5nOiAwLFxuICAgIGNvbG9yOiAnaW5oZXJpdCdcbiAgfTtcbn07XG5cbnZhciBJbnB1dCQxID0gZnVuY3Rpb24gSW5wdXQoX3JlZjIpIHtcbiAgdmFyIGNsYXNzTmFtZSA9IF9yZWYyLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gX3JlZjIuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBfcmVmMi5nZXRTdHlsZXMsXG4gICAgICBpbm5lclJlZiA9IF9yZWYyLmlubmVyUmVmLFxuICAgICAgaXNIaWRkZW4gPSBfcmVmMi5pc0hpZGRlbixcbiAgICAgIGlzRGlzYWJsZWQgPSBfcmVmMi5pc0Rpc2FibGVkLFxuICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydjbGFzc05hbWUnLCAnY3gnLCAnZ2V0U3R5bGVzJywgJ2lubmVyUmVmJywgJ2lzSGlkZGVuJywgJ2lzRGlzYWJsZWQnXSk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogY3NzKGdldFN0eWxlcygnaW5wdXQnLCBwcm9wcykpXG4gICAgfSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEF1dG9zaXplSW5wdXQsIF9leHRlbmRzKHtcbiAgICAgIGNsYXNzTmFtZTogY3gobnVsbCwgeyAnaW5wdXQnOiB0cnVlIH0sIGNsYXNzTmFtZSksXG4gICAgICBpbnB1dFJlZjogaW5uZXJSZWYsXG4gICAgICBpbnB1dFN0eWxlOiBpbnB1dFN0eWxlKGlzSGlkZGVuKSxcbiAgICAgIGRpc2FibGVkOiBpc0Rpc2FibGVkXG4gICAgfSwgcHJvcHMpKVxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBNZW51XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gR2V0IE1lbnUgUGxhY2VtZW50XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZ2V0TWVudVBsYWNlbWVudChfcmVmKSB7XG4gIHZhciBtYXhIZWlnaHQgPSBfcmVmLm1heEhlaWdodCxcbiAgICAgIG1lbnVFbCA9IF9yZWYubWVudUVsLFxuICAgICAgbWluSGVpZ2h0ID0gX3JlZi5taW5IZWlnaHQsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmLnBsYWNlbWVudCxcbiAgICAgIHNob3VsZFNjcm9sbCA9IF9yZWYuc2hvdWxkU2Nyb2xsLFxuICAgICAgaXNGaXhlZFBvc2l0aW9uID0gX3JlZi5pc0ZpeGVkUG9zaXRpb247XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChtZW51RWwpO1xuICB2YXIgZGVmYXVsdFN0YXRlID0geyBwbGFjZW1lbnQ6ICdib3R0b20nLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuXG4gIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nLCByZXR1cm4gZGVmYXVsdCBzdGF0ZVxuICBpZiAoIW1lbnVFbCB8fCAhbWVudUVsLm9mZnNldFBhcmVudCkgcmV0dXJuIGRlZmF1bHRTdGF0ZTtcblxuICAvLyB3ZSBjYW4ndCB0cnVzdCBgc2Nyb2xsUGFyZW50LnNjcm9sbEhlaWdodGAgLS0+IGl0IG1heSBpbmNyZWFzZSB3aGVuXG4gIC8vIHRoZSBtZW51IGlzIHJlbmRlcmVkXG5cbiAgdmFyIF9zY3JvbGxQYXJlbnQkZ2V0Qm91biA9IHNjcm9sbFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHNjcm9sbEhlaWdodCA9IF9zY3JvbGxQYXJlbnQkZ2V0Qm91bi5oZWlnaHQ7XG5cbiAgdmFyIF9tZW51RWwkZ2V0Qm91bmRpbmdDbCA9IG1lbnVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIG1lbnVCb3R0b20gPSBfbWVudUVsJGdldEJvdW5kaW5nQ2wuYm90dG9tLFxuICAgICAgbWVudUhlaWdodCA9IF9tZW51RWwkZ2V0Qm91bmRpbmdDbC5oZWlnaHQsXG4gICAgICBtZW51VG9wID0gX21lbnVFbCRnZXRCb3VuZGluZ0NsLnRvcDtcblxuICAvLyAkRmxvd0ZpeE1lIGZ1bmN0aW9uIHJldHVybnMgYWJvdmUgaWYgdGhlcmUncyBubyBvZmZzZXRQYXJlbnRcblxuXG4gIHZhciBfbWVudUVsJG9mZnNldFBhcmVudCQgPSBtZW51RWwub2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgY29udGFpbmVyVG9wID0gX21lbnVFbCRvZmZzZXRQYXJlbnQkLnRvcDtcblxuICB2YXIgdmlld0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbFRvcChzY3JvbGxQYXJlbnQpO1xuICB2YXIgZ3V0dGVyID0gc3BhY2luZy5tZW51R3V0dGVyO1xuXG4gIHZhciB2aWV3U3BhY2VBYm92ZSA9IGNvbnRhaW5lclRvcCAtIGd1dHRlcjtcbiAgdmFyIHZpZXdTcGFjZUJlbG93ID0gdmlld0hlaWdodCAtIG1lbnVUb3A7XG4gIHZhciBzY3JvbGxTcGFjZUFib3ZlID0gdmlld1NwYWNlQWJvdmUgKyBzY3JvbGxUb3A7XG4gIHZhciBzY3JvbGxTcGFjZUJlbG93ID0gc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsVG9wIC0gbWVudVRvcDtcblxuICB2YXIgc2Nyb2xsRG93biA9IG1lbnVCb3R0b20gLSB2aWV3SGVpZ2h0ICsgc2Nyb2xsVG9wICsgZ3V0dGVyO1xuICB2YXIgc2Nyb2xsVXAgPSBzY3JvbGxUb3AgKyBtZW51VG9wIC0gZ3V0dGVyO1xuICB2YXIgc2Nyb2xsRHVyYXRpb24gPSAxNjA7XG5cbiAgc3dpdGNoIChwbGFjZW1lbnQpIHtcbiAgICBjYXNlICdhdXRvJzpcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgLy8gMTogdGhlIG1lbnUgd2lsbCBmaXQsIGRvIG5vdGhpbmdcbiAgICAgIGlmICh2aWV3U3BhY2VCZWxvdyA+PSBtZW51SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7IHBsYWNlbWVudDogJ2JvdHRvbScsIG1heEhlaWdodDogbWF4SGVpZ2h0IH07XG4gICAgICB9XG5cbiAgICAgIC8vIDI6IHRoZSBtZW51IHdpbGwgZml0LCBpZiBzY3JvbGxlZFxuICAgICAgaWYgKHNjcm9sbFNwYWNlQmVsb3cgPj0gbWVudUhlaWdodCAmJiAhaXNGaXhlZFBvc2l0aW9uKSB7XG4gICAgICAgIGlmIChzaG91bGRTY3JvbGwpIHtcbiAgICAgICAgICBhbmltYXRlZFNjcm9sbFRvKHNjcm9sbFBhcmVudCwgc2Nyb2xsRG93biwgc2Nyb2xsRHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgcGxhY2VtZW50OiAnYm90dG9tJywgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgLy8gMzogdGhlIG1lbnUgd2lsbCBmaXQsIGlmIGNvbnN0cmFpbmVkXG4gICAgICBpZiAoIWlzRml4ZWRQb3NpdGlvbiAmJiBzY3JvbGxTcGFjZUJlbG93ID49IG1pbkhlaWdodCB8fCBpc0ZpeGVkUG9zaXRpb24gJiYgdmlld1NwYWNlQmVsb3cgPj0gbWluSGVpZ2h0KSB7XG4gICAgICAgIGlmIChzaG91bGRTY3JvbGwpIHtcbiAgICAgICAgICBhbmltYXRlZFNjcm9sbFRvKHNjcm9sbFBhcmVudCwgc2Nyb2xsRG93biwgc2Nyb2xsRHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Ugd2FudCB0byBwcm92aWRlIGFzIG11Y2ggb2YgdGhlIG1lbnUgYXMgcG9zc2libGUgdG8gdGhlIHVzZXIsXG4gICAgICAgIC8vIHNvIGdpdmUgdGhlbSB3aGF0ZXZlciBpcyBhdmFpbGFibGUgYmVsb3cgcmF0aGVyIHRoYW4gdGhlIG1pbkhlaWdodC5cbiAgICAgICAgdmFyIGNvbnN0cmFpbmVkSGVpZ2h0ID0gaXNGaXhlZFBvc2l0aW9uID8gdmlld1NwYWNlQmVsb3cgLSBndXR0ZXIgOiBzY3JvbGxTcGFjZUJlbG93IC0gZ3V0dGVyO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IGNvbnN0cmFpbmVkSGVpZ2h0XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIDQuIEZvcmtlZCBiZXZpb3VyIHdoZW4gdGhlcmUgaXNuJ3QgZW5vdWdoIHNwYWNlIGJlbG93XG5cbiAgICAgIC8vIEFVVE86IGZsaXAgdGhlIG1lbnUsIHJlbmRlciBhYm92ZVxuICAgICAgaWYgKHBsYWNlbWVudCA9PT0gJ2F1dG8nIHx8IGlzRml4ZWRQb3NpdGlvbikge1xuICAgICAgICAvLyBtYXkgbmVlZCB0byBiZSBjb25zdHJhaW5lZCBhZnRlciBmbGlwcGluZ1xuICAgICAgICB2YXIgX2NvbnN0cmFpbmVkSGVpZ2h0ID0gbWF4SGVpZ2h0O1xuXG4gICAgICAgIGlmICghaXNGaXhlZFBvc2l0aW9uICYmIHNjcm9sbFNwYWNlQWJvdmUgPj0gbWluSGVpZ2h0IHx8IGlzRml4ZWRQb3NpdGlvbiAmJiB2aWV3U3BhY2VBYm92ZSA+PSBtaW5IZWlnaHQpIHtcbiAgICAgICAgICBfY29uc3RyYWluZWRIZWlnaHQgPSBpc0ZpeGVkUG9zaXRpb24gPyB2aWV3U3BhY2VBYm92ZSAtIGd1dHRlciAtIHNwYWNpbmcuY29udHJvbEhlaWdodCA6IHNjcm9sbFNwYWNlQWJvdmUgLSBndXR0ZXIgLSBzcGFjaW5nLmNvbnRyb2xIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBwbGFjZW1lbnQ6ICd0b3AnLCBtYXhIZWlnaHQ6IF9jb25zdHJhaW5lZEhlaWdodCB9O1xuICAgICAgfVxuXG4gICAgICAvLyBCT1RUT006IGFsbG93IGJyb3dzZXIgdG8gaW5jcmVhc2Ugc2Nyb2xsYWJsZSBhcmVhIGFuZCBpbW1lZGlhdGVseSBzZXQgc2Nyb2xsXG4gICAgICBpZiAocGxhY2VtZW50ID09PSAnYm90dG9tJykge1xuICAgICAgICBzY3JvbGxUbyhzY3JvbGxQYXJlbnQsIHNjcm9sbERvd24pO1xuICAgICAgICByZXR1cm4geyBwbGFjZW1lbnQ6ICdib3R0b20nLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIC8vIDE6IHRoZSBtZW51IHdpbGwgZml0LCBkbyBub3RoaW5nXG4gICAgICBpZiAodmlld1NwYWNlQWJvdmUgPj0gbWVudUhlaWdodCkge1xuICAgICAgICByZXR1cm4geyBwbGFjZW1lbnQ6ICd0b3AnLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuICAgICAgfVxuXG4gICAgICAvLyAyOiB0aGUgbWVudSB3aWxsIGZpdCwgaWYgc2Nyb2xsZWRcbiAgICAgIGlmIChzY3JvbGxTcGFjZUFib3ZlID49IG1lbnVIZWlnaHQgJiYgIWlzRml4ZWRQb3NpdGlvbikge1xuICAgICAgICBpZiAoc2hvdWxkU2Nyb2xsKSB7XG4gICAgICAgICAgYW5pbWF0ZWRTY3JvbGxUbyhzY3JvbGxQYXJlbnQsIHNjcm9sbFVwLCBzY3JvbGxEdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBwbGFjZW1lbnQ6ICd0b3AnLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuICAgICAgfVxuXG4gICAgICAvLyAzOiB0aGUgbWVudSB3aWxsIGZpdCwgaWYgY29uc3RyYWluZWRcbiAgICAgIGlmICghaXNGaXhlZFBvc2l0aW9uICYmIHNjcm9sbFNwYWNlQWJvdmUgPj0gbWluSGVpZ2h0IHx8IGlzRml4ZWRQb3NpdGlvbiAmJiB2aWV3U3BhY2VBYm92ZSA+PSBtaW5IZWlnaHQpIHtcbiAgICAgICAgdmFyIF9jb25zdHJhaW5lZEhlaWdodDIgPSBtYXhIZWlnaHQ7XG5cbiAgICAgICAgLy8gd2Ugd2FudCB0byBwcm92aWRlIGFzIG11Y2ggb2YgdGhlIG1lbnUgYXMgcG9zc2libGUgdG8gdGhlIHVzZXIsXG4gICAgICAgIC8vIHNvIGdpdmUgdGhlbSB3aGF0ZXZlciBpcyBhdmFpbGFibGUgYmVsb3cgcmF0aGVyIHRoYW4gdGhlIG1pbkhlaWdodC5cbiAgICAgICAgaWYgKCFpc0ZpeGVkUG9zaXRpb24gJiYgc2Nyb2xsU3BhY2VBYm92ZSA+PSBtaW5IZWlnaHQgfHwgaXNGaXhlZFBvc2l0aW9uICYmIHZpZXdTcGFjZUFib3ZlID49IG1pbkhlaWdodCkge1xuICAgICAgICAgIF9jb25zdHJhaW5lZEhlaWdodDIgPSBpc0ZpeGVkUG9zaXRpb24gPyB2aWV3U3BhY2VBYm92ZSAtIGd1dHRlciA6IHNjcm9sbFNwYWNlQWJvdmUgLSBndXR0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkU2Nyb2xsKSB7XG4gICAgICAgICAgYW5pbWF0ZWRTY3JvbGxUbyhzY3JvbGxQYXJlbnQsIHNjcm9sbFVwLCBzY3JvbGxEdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICAgICAgbWF4SGVpZ2h0OiBfY29uc3RyYWluZWRIZWlnaHQyXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIDQuIG5vdCBlbm91Z2ggc3BhY2UsIHRoZSBicm93c2VyIFdJTEwgTk9UIGluY3JlYXNlIHNjcm9sbGFibGUgYXJlYSB3aGVuXG4gICAgICAvLyBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgZWxlbWVudCByZW5kZXJlZCBhYm92ZSB0aGUgdmlld3BvcnQgKG9ubHkgYmVsb3cpLlxuICAgICAgLy8gRmxpcCB0aGUgbWVudSwgcmVuZGVyIGJlbG93XG4gICAgICByZXR1cm4geyBwbGFjZW1lbnQ6ICdib3R0b20nLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGxhY2VtZW50IHByb3ZpZGVkIFwiJyArIHBsYWNlbWVudCArICdcIi4nKTtcbiAgfVxuXG4gIC8vIGZ1bGZpbCBjb250cmFjdCB3aXRoIGZsb3c6IGltcGxpY2l0IHJldHVybiB2YWx1ZSBvZiB1bmRlZmluZWRcbiAgcmV0dXJuIGRlZmF1bHRTdGF0ZTtcbn1cblxuLy8gTWVudSBDb21wb25lbnRcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBhbGlnblRvQ29udHJvbChwbGFjZW1lbnQpIHtcbiAgdmFyIHBsYWNlbWVudFRvQ1NTUHJvcCA9IHsgYm90dG9tOiAndG9wJywgdG9wOiAnYm90dG9tJyB9O1xuICByZXR1cm4gcGxhY2VtZW50ID8gcGxhY2VtZW50VG9DU1NQcm9wW3BsYWNlbWVudF0gOiAnYm90dG9tJztcbn1cbnZhciBjb2VyY2VQbGFjZW1lbnQgPSBmdW5jdGlvbiBjb2VyY2VQbGFjZW1lbnQocCkge1xuICByZXR1cm4gcCA9PT0gJ2F1dG8nID8gJ2JvdHRvbScgOiBwO1xufTtcblxudmFyIG1lbnVDU1MgPSBmdW5jdGlvbiBtZW51Q1NTKF9yZWYyKSB7XG4gIHZhciBfcmVmMztcblxuICB2YXIgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50O1xuICByZXR1cm4gX3JlZjMgPSB7fSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsIGFsaWduVG9Db250cm9sKHBsYWNlbWVudCksICcxMDAlJyksIGRlZmluZVByb3BlcnR5KF9yZWYzLCAnYmFja2dyb3VuZENvbG9yJywgY29sb3JzLm5ldXRyYWwwKSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsICdib3JkZXJSYWRpdXMnLCBib3JkZXJSYWRpdXMpLCBkZWZpbmVQcm9wZXJ0eShfcmVmMywgJ2JveFNoYWRvdycsICcwIDAgMCAxcHggJyArIGNvbG9ycy5uZXV0cmFsMTBhICsgJywgMCA0cHggMTFweCAnICsgY29sb3JzLm5ldXRyYWwxMGEpLCBkZWZpbmVQcm9wZXJ0eShfcmVmMywgJ21hcmdpbkJvdHRvbScsIHNwYWNpbmcubWVudUd1dHRlciksIGRlZmluZVByb3BlcnR5KF9yZWYzLCAnbWFyZ2luVG9wJywgc3BhY2luZy5tZW51R3V0dGVyKSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpLCBkZWZpbmVQcm9wZXJ0eShfcmVmMywgJ3dpZHRoJywgJzEwMCUnKSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsICd6SW5kZXgnLCAxKSwgX3JlZjM7XG59O1xuXG52YXIgTWVudSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKE1lbnUsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIE1lbnUoKSB7XG4gICAgdmFyIF9yZWY0O1xuXG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE1lbnUpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChfcmVmNCA9IE1lbnUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNZW51KSkuY2FsbC5hcHBseShfcmVmNCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnN0YXRlID0ge1xuICAgICAgbWF4SGVpZ2h0OiBfdGhpcy5wcm9wcy5tYXhNZW51SGVpZ2h0LFxuICAgICAgcGxhY2VtZW50OiBudWxsXG4gICAgfSwgX3RoaXMuZ2V0UGxhY2VtZW50ID0gZnVuY3Rpb24gKHJlZikge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgbWluTWVudUhlaWdodCA9IF90aGlzJHByb3BzLm1pbk1lbnVIZWlnaHQsXG4gICAgICAgICAgbWF4TWVudUhlaWdodCA9IF90aGlzJHByb3BzLm1heE1lbnVIZWlnaHQsXG4gICAgICAgICAgbWVudVBsYWNlbWVudCA9IF90aGlzJHByb3BzLm1lbnVQbGFjZW1lbnQsXG4gICAgICAgICAgbWVudVBvc2l0aW9uID0gX3RoaXMkcHJvcHMubWVudVBvc2l0aW9uLFxuICAgICAgICAgIG1lbnVTaG91bGRTY3JvbGxJbnRvVmlldyA9IF90aGlzJHByb3BzLm1lbnVTaG91bGRTY3JvbGxJbnRvVmlldztcbiAgICAgIHZhciBnZXRQb3J0YWxQbGFjZW1lbnQgPSBfdGhpcy5jb250ZXh0LmdldFBvcnRhbFBsYWNlbWVudDtcblxuXG4gICAgICBpZiAoIXJlZikgcmV0dXJuO1xuXG4gICAgICAvLyBETyBOT1Qgc2Nyb2xsIGlmIHBvc2l0aW9uIGlzIGZpeGVkXG4gICAgICB2YXIgaXNGaXhlZFBvc2l0aW9uID0gbWVudVBvc2l0aW9uID09PSAnZml4ZWQnO1xuICAgICAgdmFyIHNob3VsZFNjcm9sbCA9IG1lbnVTaG91bGRTY3JvbGxJbnRvVmlldyAmJiAhaXNGaXhlZFBvc2l0aW9uO1xuXG4gICAgICB2YXIgc3RhdGUgPSBnZXRNZW51UGxhY2VtZW50KHtcbiAgICAgICAgbWF4SGVpZ2h0OiBtYXhNZW51SGVpZ2h0LFxuICAgICAgICBtZW51RWw6IHJlZixcbiAgICAgICAgbWluSGVpZ2h0OiBtaW5NZW51SGVpZ2h0LFxuICAgICAgICBwbGFjZW1lbnQ6IG1lbnVQbGFjZW1lbnQsXG4gICAgICAgIHNob3VsZFNjcm9sbDogc2hvdWxkU2Nyb2xsLFxuICAgICAgICBpc0ZpeGVkUG9zaXRpb246IGlzRml4ZWRQb3NpdGlvblxuICAgICAgfSk7XG5cbiAgICAgIGlmIChnZXRQb3J0YWxQbGFjZW1lbnQpIGdldFBvcnRhbFBsYWNlbWVudChzdGF0ZSk7XG5cbiAgICAgIF90aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9LCBfdGhpcy5nZXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBtZW51UGxhY2VtZW50ID0gX3RoaXMucHJvcHMubWVudVBsYWNlbWVudDtcblxuICAgICAgdmFyIHBsYWNlbWVudCA9IF90aGlzLnN0YXRlLnBsYWNlbWVudCB8fCBjb2VyY2VQbGFjZW1lbnQobWVudVBsYWNlbWVudCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgX3RoaXMucHJvcHMsIHsgcGxhY2VtZW50OiBwbGFjZW1lbnQsIG1heEhlaWdodDogX3RoaXMuc3RhdGUubWF4SGVpZ2h0IH0pO1xuICAgIH0sIF90ZW1wKSwgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhNZW51LCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgY3ggPSBfcHJvcHMuY3gsXG4gICAgICAgICAgZ2V0U3R5bGVzID0gX3Byb3BzLmdldFN0eWxlcyxcbiAgICAgICAgICBpbm5lclByb3BzID0gX3Byb3BzLmlubmVyUHJvcHM7XG5cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBfZXh0ZW5kcyh7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ21lbnUnLCB0aGlzLmdldFN0YXRlKCkpKSwge1xuICAgICAgICAgICAgJ21lbnUnOiB0cnVlXG4gICAgICAgICAgfSwgY2xhc3NOYW1lKSxcbiAgICAgICAgICByZWY6IHRoaXMuZ2V0UGxhY2VtZW50XG4gICAgICAgIH0sIGlubmVyUHJvcHMpLFxuICAgICAgICBjaGlsZHJlblxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1lbnU7XG59KENvbXBvbmVudCk7XG5cbk1lbnUuY29udGV4dFR5cGVzID0ge1xuICBnZXRQb3J0YWxQbGFjZW1lbnQ6IFByb3BUeXBlcy5mdW5jXG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE1lbnUgTGlzdFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBtZW51TGlzdENTUyA9IGZ1bmN0aW9uIG1lbnVMaXN0Q1NTKF9yZWY1KSB7XG4gIHZhciBtYXhIZWlnaHQgPSBfcmVmNS5tYXhIZWlnaHQ7XG4gIHJldHVybiB7XG4gICAgbWF4SGVpZ2h0OiBtYXhIZWlnaHQsXG4gICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgcGFkZGluZ0JvdHRvbTogc3BhY2luZy5iYXNlVW5pdCxcbiAgICBwYWRkaW5nVG9wOiBzcGFjaW5nLmJhc2VVbml0LFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLCAvLyByZXF1aXJlZCBmb3Igb2Zmc2V0W0hlaWdodCwgVG9wXSA+IGtleWJvYXJkIHNjcm9sbFxuICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiAndG91Y2gnXG4gIH07XG59O1xudmFyIE1lbnVMaXN0ID0gZnVuY3Rpb24gTWVudUxpc3QocHJvcHMpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgaXNNdWx0aSA9IHByb3BzLmlzTXVsdGksXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcbiAgdmFyIGlubmVyUmVmID0gaW5uZXJQcm9wcy5pbm5lclJlZixcbiAgICAgIHJlc3QgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhpbm5lclByb3BzLCBbJ2lubmVyUmVmJ10pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdtZW51TGlzdCcsIHByb3BzKSksIHtcbiAgICAgICAgJ21lbnUtbGlzdCc6IHRydWUsXG4gICAgICAgICdtZW51LWxpc3QtLWlzLW11bHRpJzogaXNNdWx0aVxuICAgICAgfSwgY2xhc3NOYW1lKSxcbiAgICAgIHJlZjogaW5uZXJSZWZcbiAgICB9LCByZXN0KSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcbnZhciBub3RpY2VDU1MgPSBmdW5jdGlvbiBub3RpY2VDU1MoKSB7XG4gIHJldHVybiB7XG4gICAgY29sb3I6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgcGFkZGluZzogc3BhY2luZy5iYXNlVW5pdCAqIDIgKyAncHggJyArIHNwYWNpbmcuYmFzZVVuaXQgKiAzICsgJ3B4JyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gIH07XG59O1xudmFyIG5vT3B0aW9uc01lc3NhZ2VDU1MgPSBub3RpY2VDU1M7XG52YXIgbG9hZGluZ01lc3NhZ2VDU1MgPSBub3RpY2VDU1M7XG5cbnZhciBOb09wdGlvbnNNZXNzYWdlID0gZnVuY3Rpb24gTm9PcHRpb25zTWVzc2FnZShwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnbm9PcHRpb25zTWVzc2FnZScsIHByb3BzKSksIHtcbiAgICAgICAgJ21lbnUtbm90aWNlJzogdHJ1ZSxcbiAgICAgICAgJ21lbnUtbm90aWNlLS1uby1vcHRpb25zJzogdHJ1ZVxuICAgICAgfSwgY2xhc3NOYW1lKVxuICAgIH0sIGlubmVyUHJvcHMpLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuTm9PcHRpb25zTWVzc2FnZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiAnTm8gb3B0aW9ucydcbn07XG5cbnZhciBMb2FkaW5nTWVzc2FnZSA9IGZ1bmN0aW9uIExvYWRpbmdNZXNzYWdlKHByb3BzKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdsb2FkaW5nTWVzc2FnZScsIHByb3BzKSksIHtcbiAgICAgICAgJ21lbnUtbm90aWNlJzogdHJ1ZSxcbiAgICAgICAgJ21lbnUtbm90aWNlLS1sb2FkaW5nJzogdHJ1ZVxuICAgICAgfSwgY2xhc3NOYW1lKVxuICAgIH0sIGlubmVyUHJvcHMpLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuTG9hZGluZ01lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogJ0xvYWRpbmcuLi4nXG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE1lbnUgUG9ydGFsXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIG1lbnVQb3J0YWxDU1MgPSBmdW5jdGlvbiBtZW51UG9ydGFsQ1NTKF9yZWY2KSB7XG4gIHZhciByZWN0ID0gX3JlZjYucmVjdCxcbiAgICAgIG9mZnNldCA9IF9yZWY2Lm9mZnNldCxcbiAgICAgIHBvc2l0aW9uID0gX3JlZjYucG9zaXRpb247XG4gIHJldHVybiB7XG4gICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICB0b3A6IG9mZnNldCxcbiAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICB6SW5kZXg6IDFcbiAgfTtcbn07XG5cbnZhciBNZW51UG9ydGFsID0gZnVuY3Rpb24gKF9Db21wb25lbnQyKSB7XG4gIGluaGVyaXRzKE1lbnVQb3J0YWwsIF9Db21wb25lbnQyKTtcblxuICBmdW5jdGlvbiBNZW51UG9ydGFsKCkge1xuICAgIHZhciBfcmVmNztcblxuICAgIHZhciBfdGVtcDIsIF90aGlzMiwgX3JldDI7XG5cbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51UG9ydGFsKTtcblxuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQyID0gKF90ZW1wMiA9IChfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChfcmVmNyA9IE1lbnVQb3J0YWwuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNZW51UG9ydGFsKSkuY2FsbC5hcHBseShfcmVmNywgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpczIpLCBfdGhpczIuc3RhdGUgPSB7IHBsYWNlbWVudDogbnVsbCB9LCBfdGhpczIuZ2V0UG9ydGFsUGxhY2VtZW50ID0gZnVuY3Rpb24gKF9yZWY4KSB7XG4gICAgICB2YXIgcGxhY2VtZW50ID0gX3JlZjgucGxhY2VtZW50O1xuXG4gICAgICB2YXIgaW5pdGlhbFBsYWNlbWVudCA9IGNvZXJjZVBsYWNlbWVudChfdGhpczIucHJvcHMubWVudVBsYWNlbWVudCk7XG5cbiAgICAgIC8vIGF2b2lkIHJlLXJlbmRlcnMgaWYgdGhlIHBsYWNlbWVudCBoYXMgbm90IGNoYW5nZWRcbiAgICAgIGlmIChwbGFjZW1lbnQgIT09IGluaXRpYWxQbGFjZW1lbnQpIHtcbiAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgcGxhY2VtZW50OiBwbGFjZW1lbnQgfSk7XG4gICAgICB9XG4gICAgfSwgX3RlbXAyKSwgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpczIsIF9yZXQyKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKE1lbnVQb3J0YWwsIFt7XG4gICAga2V5OiAnZ2V0Q2hpbGRDb250ZXh0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UG9ydGFsUGxhY2VtZW50OiB0aGlzLmdldFBvcnRhbFBsYWNlbWVudFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBjYWxsYmFjayBmb3Igb2NjYXNzaW9ucyB3aGVyZSB0aGUgbWVudSBtdXN0IFwiZmxpcFwiXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBhcHBlbmRUbyA9IF9wcm9wczIuYXBwZW5kVG8sXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMyLmNoaWxkcmVuLFxuICAgICAgICAgIGNvbnRyb2xFbGVtZW50ID0gX3Byb3BzMi5jb250cm9sRWxlbWVudCxcbiAgICAgICAgICBtZW51UGxhY2VtZW50ID0gX3Byb3BzMi5tZW51UGxhY2VtZW50LFxuICAgICAgICAgIHBvc2l0aW9uID0gX3Byb3BzMi5tZW51UG9zaXRpb24sXG4gICAgICAgICAgZ2V0U3R5bGVzID0gX3Byb3BzMi5nZXRTdHlsZXM7XG5cbiAgICAgIHZhciBpc0ZpeGVkID0gcG9zaXRpb24gPT09ICdmaXhlZCc7XG5cbiAgICAgIC8vIGJhaWwgZWFybHkgaWYgcmVxdWlyZWQgZWxlbWVudHMgYXJlbid0IHByZXNlbnRcbiAgICAgIGlmICghYXBwZW5kVG8gJiYgIWlzRml4ZWQgfHwgIWNvbnRyb2xFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGxhY2VtZW50ID0gdGhpcy5zdGF0ZS5wbGFjZW1lbnQgfHwgY29lcmNlUGxhY2VtZW50KG1lbnVQbGFjZW1lbnQpO1xuICAgICAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudE9iaihjb250cm9sRWxlbWVudCk7XG4gICAgICB2YXIgc2Nyb2xsRGlzdGFuY2UgPSBpc0ZpeGVkID8gMCA6IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgIHZhciBvZmZzZXQgPSByZWN0W3BsYWNlbWVudF0gKyBzY3JvbGxEaXN0YW5jZTtcbiAgICAgIHZhciBzdGF0ZSA9IHsgb2Zmc2V0OiBvZmZzZXQsIHBvc2l0aW9uOiBwb3NpdGlvbiwgcmVjdDogcmVjdCB9O1xuXG4gICAgICAvLyBzYW1lIHdyYXBwZXIgZWxlbWVudCB3aGV0aGVyIGZpeGVkIG9yIHBvcnRhbGxlZFxuICAgICAgdmFyIG1lbnVXcmFwcGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6IC8qI19fUFVSRV9fKi8gLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ21lbnVQb3J0YWwnLCBzdGF0ZSkpXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gYXBwZW5kVG8gPyBjcmVhdGVQb3J0YWwobWVudVdyYXBwZXIsIGFwcGVuZFRvKSA6IG1lbnVXcmFwcGVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWVudVBvcnRhbDtcbn0oQ29tcG9uZW50KTtcbk1lbnVQb3J0YWwuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIGdldFBvcnRhbFBsYWNlbWVudDogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbnZhciBtdWx0aVZhbHVlQ1NTID0gZnVuY3Rpb24gbXVsdGlWYWx1ZUNTUygpIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5uZXV0cmFsMTAsXG4gICAgYm9yZGVyUmFkaXVzOiBib3JkZXJSYWRpdXMgLyAyLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBtYXJnaW46IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIG1pbldpZHRoOiAwIC8vIHJlc29sdmVzIGZsZXgvdGV4dC1vdmVyZmxvdyBidWdcbiAgfTtcbn07XG52YXIgbXVsdGlWYWx1ZUxhYmVsQ1NTID0gZnVuY3Rpb24gbXVsdGlWYWx1ZUxhYmVsQ1NTKF9yZWYpIHtcbiAgdmFyIGNyb3BXaXRoRWxsaXBzaXMgPSBfcmVmLmNyb3BXaXRoRWxsaXBzaXM7XG4gIHJldHVybiB7XG4gICAgY29sb3I6IGNvbG9ycy50ZXh0LFxuICAgIGZvbnRTaXplOiAnODUlJyxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgcGFkZGluZzogMyxcbiAgICBwYWRkaW5nTGVmdDogNixcbiAgICB0ZXh0T3ZlcmZsb3c6IGNyb3BXaXRoRWxsaXBzaXMgPyAnZWxsaXBzaXMnIDogbnVsbCxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJ1xuICB9O1xufTtcbnZhciBtdWx0aVZhbHVlUmVtb3ZlQ1NTID0gZnVuY3Rpb24gbXVsdGlWYWx1ZVJlbW92ZUNTUyhfcmVmMikge1xuICB2YXIgaXNGb2N1c2VkID0gX3JlZjIuaXNGb2N1c2VkO1xuICByZXR1cm4ge1xuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGJvcmRlclJhZGl1czogYm9yZGVyUmFkaXVzIC8gMixcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzRm9jdXNlZCAmJiBjb2xvcnMuZGFuZ2VyTGlnaHQsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmdMZWZ0OiBzcGFjaW5nLmJhc2VVbml0LFxuICAgIHBhZGRpbmdSaWdodDogc3BhY2luZy5iYXNlVW5pdCxcbiAgICAnOmhvdmVyJzoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMuZGFuZ2VyTGlnaHQsXG4gICAgICBjb2xvcjogY29sb3JzLmRhbmdlclxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBNdWx0aVZhbHVlQ29udGFpbmVyID0gRGl2O1xudmFyIE11bHRpVmFsdWVMYWJlbCA9IERpdjtcblxudmFyIE11bHRpVmFsdWVSZW1vdmUgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhNdWx0aVZhbHVlUmVtb3ZlLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNdWx0aVZhbHVlUmVtb3ZlKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE11bHRpVmFsdWVSZW1vdmUpO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChNdWx0aVZhbHVlUmVtb3ZlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTXVsdGlWYWx1ZVJlbW92ZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoTXVsdGlWYWx1ZVJlbW92ZSwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydjaGlsZHJlbiddKTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIERpdixcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIGNoaWxkcmVuXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTXVsdGlWYWx1ZVJlbW92ZTtcbn0oQ29tcG9uZW50KTtcblxuTXVsdGlWYWx1ZVJlbW92ZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5jcmVhdGVFbGVtZW50KENyb3NzSWNvbiwgeyBzaXplOiAxNCB9KVxufTtcblxudmFyIE11bHRpVmFsdWUgPSBmdW5jdGlvbiAoX0NvbXBvbmVudDIpIHtcbiAgaW5oZXJpdHMoTXVsdGlWYWx1ZSwgX0NvbXBvbmVudDIpO1xuXG4gIGZ1bmN0aW9uIE11bHRpVmFsdWUoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTXVsdGlWYWx1ZSk7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE11bHRpVmFsdWUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNdWx0aVZhbHVlKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhNdWx0aVZhbHVlLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF9wcm9wczIuY2hpbGRyZW4sXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzMi5jbGFzc05hbWUsXG4gICAgICAgICAgY29tcG9uZW50cyA9IF9wcm9wczIuY29tcG9uZW50cyxcbiAgICAgICAgICBjeCA9IF9wcm9wczIuY3gsXG4gICAgICAgICAgZ2V0U3R5bGVzID0gX3Byb3BzMi5nZXRTdHlsZXMsXG4gICAgICAgICAgaW5uZXJQcm9wcyA9IF9wcm9wczIuaW5uZXJQcm9wcyxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzMi5pc0Rpc2FibGVkLFxuICAgICAgICAgIHJlbW92ZVByb3BzID0gX3Byb3BzMi5yZW1vdmVQcm9wcztcblxuICAgICAgdmFyIGNuID0ge1xuICAgICAgICBjb250YWluZXI6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnbXVsdGlWYWx1ZScsIHRoaXMucHJvcHMpKSwge1xuICAgICAgICAgICdtdWx0aS12YWx1ZSc6IHRydWUsXG4gICAgICAgICAgJ211bHRpLXZhbHVlLS1pcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWRcbiAgICAgICAgfSwgY2xhc3NOYW1lKSxcbiAgICAgICAgbGFiZWw6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnbXVsdGlWYWx1ZUxhYmVsJywgdGhpcy5wcm9wcykpLCB7XG4gICAgICAgICAgJ211bHRpLXZhbHVlX19sYWJlbCc6IHRydWVcbiAgICAgICAgfSwgY2xhc3NOYW1lKSxcbiAgICAgICAgcmVtb3ZlOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ211bHRpVmFsdWVSZW1vdmUnLCB0aGlzLnByb3BzKSksIHtcbiAgICAgICAgICAnbXVsdGktdmFsdWVfX3JlbW92ZSc6IHRydWVcbiAgICAgICAgfSwgY2xhc3NOYW1lKVxuICAgICAgfTtcbiAgICAgIHZhciBDb250YWluZXIgPSBjb21wb25lbnRzLkNvbnRhaW5lcixcbiAgICAgICAgICBMYWJlbCA9IGNvbXBvbmVudHMuTGFiZWwsXG4gICAgICAgICAgUmVtb3ZlID0gY29tcG9uZW50cy5SZW1vdmU7XG5cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIENvbnRhaW5lcixcbiAgICAgICAgX2V4dGVuZHMoe1xuICAgICAgICAgIGNsYXNzTmFtZTogY24uY29udGFpbmVyXG4gICAgICAgIH0sIGlubmVyUHJvcHMpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIExhYmVsLFxuICAgICAgICAgIHsgY2xhc3NOYW1lOiBjbi5sYWJlbCB9LFxuICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlLCBfZXh0ZW5kcyh7IGNsYXNzTmFtZTogY24ucmVtb3ZlIH0sIHJlbW92ZVByb3BzKSlcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNdWx0aVZhbHVlO1xufShDb21wb25lbnQpO1xuXG5NdWx0aVZhbHVlLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3JvcFdpdGhFbGxpcHNpczogdHJ1ZVxufTtcblxudmFyIGNzcyQzID0gZnVuY3Rpb24gY3NzJCQxKF9yZWYpIHtcbiAgdmFyIGlzRGlzYWJsZWQgPSBfcmVmLmlzRGlzYWJsZWQsXG4gICAgICBpc0ZvY3VzZWQgPSBfcmVmLmlzRm9jdXNlZCxcbiAgICAgIGlzU2VsZWN0ZWQgPSBfcmVmLmlzU2VsZWN0ZWQ7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBpc1NlbGVjdGVkID8gY29sb3JzLnByaW1hcnkgOiBpc0ZvY3VzZWQgPyBjb2xvcnMucHJpbWFyeTI1IDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMjAgOiBpc1NlbGVjdGVkID8gY29sb3JzLm5ldXRyYWwwIDogJ2luaGVyaXQnLFxuICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBwYWRkaW5nOiBzcGFjaW5nLmJhc2VVbml0ICogMiArICdweCAnICsgc3BhY2luZy5iYXNlVW5pdCAqIDMgKyAncHgnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiAncmdiYSgwLCAwLCAwLCAwKScsXG5cbiAgICAvLyBwcm92aWRlIHNvbWUgYWZmb3JkYW5jZSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgJzphY3RpdmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzU2VsZWN0ZWQgPyBjb2xvcnMucHJpbWFyeSA6IGNvbG9ycy5wcmltYXJ5NTBcbiAgICB9XG4gIH07XG59O1xuXG52YXIgT3B0aW9uID0gZnVuY3Rpb24gT3B0aW9uKHByb3BzKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlzRGlzYWJsZWQgPSBwcm9wcy5pc0Rpc2FibGVkLFxuICAgICAgaXNGb2N1c2VkID0gcHJvcHMuaXNGb2N1c2VkLFxuICAgICAgaXNTZWxlY3RlZCA9IHByb3BzLmlzU2VsZWN0ZWQsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcbiAgdmFyIGlubmVyUmVmID0gaW5uZXJQcm9wcy5pbm5lclJlZixcbiAgICAgIHJlc3QgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhpbm5lclByb3BzLCBbJ2lubmVyUmVmJ10pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnb3B0aW9uJywgcHJvcHMpKSwge1xuICAgICAgICAnb3B0aW9uJzogdHJ1ZSxcbiAgICAgICAgJ29wdGlvbi0taXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkLFxuICAgICAgICAnb3B0aW9uLS1pcy1mb2N1c2VkJzogaXNGb2N1c2VkLFxuICAgICAgICAnb3B0aW9uLS1pcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWRcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCByZXN0KSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxudmFyIGNzcyQ0ID0gZnVuY3Rpb24gY3NzJCQxKCkge1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiBjb2xvcnMubmV1dHJhbDUwLFxuICAgIG1hcmdpbkxlZnQ6IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIG1hcmdpblJpZ2h0OiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICc1MCUnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknXG4gIH07XG59O1xuXG52YXIgUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiBQbGFjZWhvbGRlcihwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygncGxhY2Vob2xkZXInLCBwcm9wcykpLCB7XG4gICAgICAgICdwbGFjZWhvbGRlcic6IHRydWVcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCBpbm5lclByb3BzKSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxudmFyIGNzcyQ1ID0gZnVuY3Rpb24gY3NzJCQxKF9yZWYpIHtcbiAgdmFyIGlzRGlzYWJsZWQgPSBfcmVmLmlzRGlzYWJsZWQ7XG4gIHJldHVybiB7XG4gICAgY29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDQwIDogY29sb3JzLnRleHQsXG4gICAgbWFyZ2luTGVmdDogc3BhY2luZy5iYXNlVW5pdCAvIDIsXG4gICAgbWFyZ2luUmlnaHQ6IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIG1heFdpZHRoOiAnY2FsYygxMDAlIC0gJyArIHNwYWNpbmcuYmFzZVVuaXQgKiAyICsgJ3B4KScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICB0b3A6ICc1MCUnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknXG4gIH07XG59O1xuXG52YXIgU2luZ2xlVmFsdWUgPSBmdW5jdGlvbiBTaW5nbGVWYWx1ZShwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpc0Rpc2FibGVkID0gcHJvcHMuaXNEaXNhYmxlZCxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdzaW5nbGVWYWx1ZScsIHByb3BzKSksIHtcbiAgICAgICAgJ3NpbmdsZS12YWx1ZSc6IHRydWUsXG4gICAgICAgICdzaW5nbGUtdmFsdWUtLWlzLWRpc2FibGVkJzogaXNEaXNhYmxlZFxuICAgICAgfSwgY2xhc3NOYW1lKVxuICAgIH0sIGlubmVyUHJvcHMpLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuXG52YXIgY29tcG9uZW50cyA9IHtcbiAgQ2xlYXJJbmRpY2F0b3I6IENsZWFySW5kaWNhdG9yLFxuICBDb250cm9sOiBDb250cm9sLFxuICBEcm9wZG93bkluZGljYXRvcjogRHJvcGRvd25JbmRpY2F0b3IsXG4gIERvd25DaGV2cm9uOiBEb3duQ2hldnJvbixcbiAgQ3Jvc3NJY29uOiBDcm9zc0ljb24sXG4gIEdyb3VwOiBHcm91cCxcbiAgR3JvdXBIZWFkaW5nOiBHcm91cEhlYWRpbmcsXG4gIEluZGljYXRvcnNDb250YWluZXI6IEluZGljYXRvcnNDb250YWluZXIsXG4gIEluZGljYXRvclNlcGFyYXRvcjogSW5kaWNhdG9yU2VwYXJhdG9yLFxuICBJbnB1dDogSW5wdXQkMSxcbiAgTG9hZGluZ0luZGljYXRvcjogTG9hZGluZ0luZGljYXRvcixcbiAgTWVudTogTWVudSxcbiAgTWVudUxpc3Q6IE1lbnVMaXN0LFxuICBNZW51UG9ydGFsOiBNZW51UG9ydGFsLFxuICBMb2FkaW5nTWVzc2FnZTogTG9hZGluZ01lc3NhZ2UsXG4gIE5vT3B0aW9uc01lc3NhZ2U6IE5vT3B0aW9uc01lc3NhZ2UsXG4gIE11bHRpVmFsdWU6IE11bHRpVmFsdWUsXG4gIE11bHRpVmFsdWVDb250YWluZXI6IE11bHRpVmFsdWVDb250YWluZXIsXG4gIE11bHRpVmFsdWVMYWJlbDogTXVsdGlWYWx1ZUxhYmVsLFxuICBNdWx0aVZhbHVlUmVtb3ZlOiBNdWx0aVZhbHVlUmVtb3ZlLFxuICBPcHRpb246IE9wdGlvbixcbiAgUGxhY2Vob2xkZXI6IFBsYWNlaG9sZGVyLFxuICBTZWxlY3RDb250YWluZXI6IFNlbGVjdENvbnRhaW5lcixcbiAgU2luZ2xlVmFsdWU6IFNpbmdsZVZhbHVlLFxuICBWYWx1ZUNvbnRhaW5lcjogVmFsdWVDb250YWluZXJcbn07XG5cbnZhciBkZWZhdWx0Q29tcG9uZW50cyA9IGZ1bmN0aW9uIGRlZmF1bHRDb21wb25lbnRzKHByb3BzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgY29tcG9uZW50cywgcHJvcHMuY29tcG9uZW50cyk7XG59O1xuXG52YXIgZGVmYXVsdFN0eWxlcyA9IHtcbiAgY2xlYXJJbmRpY2F0b3I6IGNsZWFySW5kaWNhdG9yQ1NTLFxuICBjb250YWluZXI6IGNvbnRhaW5lckNTUyxcbiAgY29udHJvbDogY3NzJDEsXG4gIGRyb3Bkb3duSW5kaWNhdG9yOiBkcm9wZG93bkluZGljYXRvckNTUyxcbiAgZ3JvdXA6IGdyb3VwQ1NTLFxuICBncm91cEhlYWRpbmc6IGdyb3VwSGVhZGluZ0NTUyxcbiAgaW5kaWNhdG9yc0NvbnRhaW5lcjogaW5kaWNhdG9yc0NvbnRhaW5lckNTUyxcbiAgaW5kaWNhdG9yU2VwYXJhdG9yOiBpbmRpY2F0b3JTZXBhcmF0b3JDU1MsXG4gIGlucHV0OiBjc3MkMixcbiAgbG9hZGluZ0luZGljYXRvcjogbG9hZGluZ0luZGljYXRvckNTUyxcbiAgbG9hZGluZ01lc3NhZ2U6IGxvYWRpbmdNZXNzYWdlQ1NTLFxuICBtZW51OiBtZW51Q1NTLFxuICBtZW51TGlzdDogbWVudUxpc3RDU1MsXG4gIG1lbnVQb3J0YWw6IG1lbnVQb3J0YWxDU1MsXG4gIG11bHRpVmFsdWU6IG11bHRpVmFsdWVDU1MsXG4gIG11bHRpVmFsdWVMYWJlbDogbXVsdGlWYWx1ZUxhYmVsQ1NTLFxuICBtdWx0aVZhbHVlUmVtb3ZlOiBtdWx0aVZhbHVlUmVtb3ZlQ1NTLFxuICBub09wdGlvbnNNZXNzYWdlOiBub09wdGlvbnNNZXNzYWdlQ1NTLFxuICBvcHRpb246IGNzcyQzLFxuICBwbGFjZWhvbGRlcjogY3NzJDQsXG4gIHNpbmdsZVZhbHVlOiBjc3MkNSxcbiAgdmFsdWVDb250YWluZXI6IHZhbHVlQ29udGFpbmVyQ1NTXG59O1xuXG4vLyBNZXJnZSBVdGlsaXR5XG4vLyBBbGxvd3MgY29uc3VtZXJzIHRvIGV4dGVuZCBhIGJhc2UgU2VsZWN0IHdpdGggYWRkaXRpb25hbCBzdHlsZXNcblxuZnVuY3Rpb24gbWVyZ2VTdHlsZXMoc291cmNlKSB7XG4gIHZhciB0YXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIC8vIGluaXRpYWxpemUgd2l0aCBzb3VyY2Ugc3R5bGVzXG4gIHZhciBzdHlsZXMgPSBfZXh0ZW5kcyh7fSwgc291cmNlKTtcblxuICAvLyBtYXNzYWdlIGluIHRhcmdldCBzdHlsZXNcbiAgT2JqZWN0LmtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoc291cmNlW2tleV0pIHtcbiAgICAgIHN0eWxlc1trZXldID0gZnVuY3Rpb24gKHJzQ3NzLCBwcm9wcykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0W2tleV0oc291cmNlW2tleV0ocnNDc3MsIHByb3BzKSwgcHJvcHMpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzW2tleV0gPSB0YXJnZXRba2V5XTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5cbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIGJhY2tzcGFjZVJlbW92ZXNWYWx1ZTogdHJ1ZSxcbiAgYmx1cklucHV0T25TZWxlY3Q6IGlzVG91Y2hDYXBhYmxlKCksXG4gIGNhcHR1cmVNZW51U2Nyb2xsOiAhaXNUb3VjaENhcGFibGUoKSxcbiAgY2xvc2VNZW51T25TZWxlY3Q6IHRydWUsXG4gIGNvbXBvbmVudHM6IHt9LFxuICBjb250cm9sU2hvdWxkUmVuZGVyVmFsdWU6IHRydWUsXG4gIGVzY2FwZUNsZWFyc1ZhbHVlOiBmYWxzZSxcbiAgZmlsdGVyT3B0aW9uOiBjcmVhdGVGaWx0ZXIoKSxcbiAgZm9ybWF0R3JvdXBMYWJlbDogZm9ybWF0R3JvdXBMYWJlbCxcbiAgZ2V0T3B0aW9uTGFiZWw6IGdldE9wdGlvbkxhYmVsLFxuICBnZXRPcHRpb25WYWx1ZTogZ2V0T3B0aW9uVmFsdWUsXG4gIGhpZGVTZWxlY3RlZE9wdGlvbnM6IHRydWUsXG4gIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICBpc0xvYWRpbmc6IGZhbHNlLFxuICBpc011bHRpOiBmYWxzZSxcbiAgaXNSdGw6IGZhbHNlLFxuICBpc1NlYXJjaGFibGU6IHRydWUsXG4gIGlzT3B0aW9uRGlzYWJsZWQ6IGlzT3B0aW9uRGlzYWJsZWQsXG4gIGxvYWRpbmdNZXNzYWdlOiBmdW5jdGlvbiBsb2FkaW5nTWVzc2FnZSgpIHtcbiAgICByZXR1cm4gJ0xvYWRpbmcuLi4nO1xuICB9LFxuICBtYXhNZW51SGVpZ2h0OiAzMDAsXG4gIG1pbk1lbnVIZWlnaHQ6IDE0MCxcbiAgbWVudUlzT3BlbjogZmFsc2UsXG4gIG1lbnVQbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtZW51UG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIG1lbnVTaG91bGRCbG9ja1Njcm9sbDogZmFsc2UsXG4gIG1lbnVTaG91bGRTY3JvbGxJbnRvVmlldzogIWlzTW9iaWxlRGV2aWNlKCksXG4gIG5vT3B0aW9uc01lc3NhZ2U6IGZ1bmN0aW9uIG5vT3B0aW9uc01lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICdObyBvcHRpb25zJztcbiAgfSxcbiAgb3Blbk1lbnVPbkZvY3VzOiBmYWxzZSxcbiAgb3Blbk1lbnVPbkNsaWNrOiB0cnVlLFxuICBvcHRpb25zOiBbXSxcbiAgcGFnZVNpemU6IDUsXG4gIHBsYWNlaG9sZGVyOiAnU2VsZWN0Li4uJyxcbiAgc2NyZWVuUmVhZGVyU3RhdHVzOiBmdW5jdGlvbiBzY3JlZW5SZWFkZXJTdGF0dXMoX3JlZikge1xuICAgIHZhciBjb3VudCA9IF9yZWYuY291bnQ7XG4gICAgcmV0dXJuIGNvdW50ICsgJyByZXN1bHQnICsgKGNvdW50ICE9PSAxID8gJ3MnIDogJycpICsgJyBhdmFpbGFibGUuJztcbiAgfSxcbiAgc3R5bGVzOiB7fSxcbiAgdGFiSW5kZXg6ICcwJyxcbiAgdGFiU2VsZWN0c1ZhbHVlOiB0cnVlXG59O1xuXG52YXIgaW5zdGFuY2VJZCA9IDE7XG5cbnZhciBTZWxlY3QgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhTZWxlY3QsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFNlbGVjdChwcm9wcykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFNlbGVjdCk7XG5cbiAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChTZWxlY3QuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTZWxlY3QpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfaW5pdGlhbGlzZVByb3BzLmNhbGwoX3RoaXMpO1xuXG4gICAgdmFyIHZhbHVlID0gcHJvcHMudmFsdWU7XG5cbiAgICBfdGhpcy5jb21wb25lbnRzID0gZGVmYXVsdENvbXBvbmVudHMocHJvcHMpO1xuICAgIF90aGlzLmluc3RhbmNlUHJlZml4ID0gJ3JlYWN0LXNlbGVjdC0nICsgKF90aGlzLnByb3BzLmluc3RhbmNlSWQgfHwgKytpbnN0YW5jZUlkKTtcblxuICAgIHZhciBzZWxlY3RWYWx1ZSA9IGNsZWFuVmFsdWUodmFsdWUpO1xuICAgIHZhciBtZW51T3B0aW9ucyA9IF90aGlzLmJ1aWxkTWVudU9wdGlvbnMocHJvcHMsIHNlbGVjdFZhbHVlKTtcblxuICAgIF90aGlzLnN0YXRlLm1lbnVPcHRpb25zID0gbWVudU9wdGlvbnM7XG4gICAgX3RoaXMuc3RhdGUuc2VsZWN0VmFsdWUgPSBzZWxlY3RWYWx1ZTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH0gLy8gVE9ET1xuXG5cbiAgY3JlYXRlQ2xhc3MoU2VsZWN0LCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLnN0YXJ0TGlzdGVuaW5nVG9Ub3VjaCgpO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5hdXRvRm9jdXMpIHtcbiAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjb21wb25lbnRzJCQxID0gX3Byb3BzLmNvbXBvbmVudHMsXG4gICAgICAgICAgb3B0aW9ucyA9IF9wcm9wcy5vcHRpb25zLFxuICAgICAgICAgIHZhbHVlID0gX3Byb3BzLnZhbHVlLFxuICAgICAgICAgIGlucHV0VmFsdWUgPSBfcHJvcHMuaW5wdXRWYWx1ZTtcbiAgICAgIC8vIHJlLWNhY2hlIGN1c3RvbSBjb21wb25lbnRzXG5cbiAgICAgIGlmIChuZXh0UHJvcHMuY29tcG9uZW50cyAhPT0gY29tcG9uZW50cyQkMSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBkZWZhdWx0Q29tcG9uZW50cyhuZXh0UHJvcHMpO1xuICAgICAgfVxuICAgICAgLy8gcmVidWlsZCB0aGUgbWVudSBvcHRpb25zXG4gICAgICBpZiAobmV4dFByb3BzLnZhbHVlICE9PSB2YWx1ZSB8fCBuZXh0UHJvcHMub3B0aW9ucyAhPT0gb3B0aW9ucyB8fCBuZXh0UHJvcHMuaW5wdXRWYWx1ZSAhPT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICB2YXIgX3NlbGVjdFZhbHVlID0gY2xlYW5WYWx1ZShuZXh0UHJvcHMudmFsdWUpO1xuICAgICAgICB2YXIgX21lbnVPcHRpb25zID0gdGhpcy5idWlsZE1lbnVPcHRpb25zKG5leHRQcm9wcywgX3NlbGVjdFZhbHVlKTtcbiAgICAgICAgdmFyIF9mb2N1c2VkVmFsdWUgPSB0aGlzLmdldE5leHRGb2N1c2VkVmFsdWUoX3NlbGVjdFZhbHVlKTtcbiAgICAgICAgdmFyIF9mb2N1c2VkT3B0aW9uID0gdGhpcy5nZXROZXh0Rm9jdXNlZE9wdGlvbihfbWVudU9wdGlvbnMuZm9jdXNhYmxlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1lbnVPcHRpb25zOiBfbWVudU9wdGlvbnMsIHNlbGVjdFZhbHVlOiBfc2VsZWN0VmFsdWUsIGZvY3VzZWRPcHRpb246IF9mb2N1c2VkT3B0aW9uLCBmb2N1c2VkVmFsdWU6IF9mb2N1c2VkVmFsdWUgfSk7XG4gICAgICB9XG4gICAgICAvLyBzb21lIHVwZGF0ZXMgc2hvdWxkIHRvZ2dsZSB0aGUgc3RhdGUgb2YgdGhlIGlucHV0IHZpc2liaWxpdHlcbiAgICAgIGlmICh0aGlzLmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlucHV0SXNIaWRkZW46IHRoaXMuaW5wdXRJc0hpZGRlbkFmdGVyVXBkYXRlXG4gICAgICAgIH0pO1xuICAgICAgICBkZWxldGUgdGhpcy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHMyLmlzRGlzYWJsZWQsXG4gICAgICAgICAgbWVudUlzT3BlbiA9IF9wcm9wczIubWVudUlzT3BlbjtcbiAgICAgIHZhciBpc0ZvY3VzZWQgPSB0aGlzLnN0YXRlLmlzRm9jdXNlZDtcblxuXG4gICAgICBpZiAoXG4gICAgICAvLyBlbnN1cmUgZm9jdXMgaXMgcmVzdG9yZWQgY29ycmVjdGx5IHdoZW4gdGhlIGNvbnRyb2wgYmVjb21lcyBlbmFibGVkXG4gICAgICBpc0ZvY3VzZWQgJiYgIWlzRGlzYWJsZWQgJiYgcHJldlByb3BzLmlzRGlzYWJsZWQgfHxcbiAgICAgIC8vIGVuc3VyZSBmb2N1cyBpcyBvbiB0aGUgSW5wdXQgd2hlbiB0aGUgbWVudSBvcGVuc1xuICAgICAgaXNGb2N1c2VkICYmIG1lbnVJc09wZW4gJiYgIXByZXZQcm9wcy5tZW51SXNPcGVuKSB7XG4gICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBzY3JvbGwgdGhlIGZvY3VzZWQgb3B0aW9uIGludG8gdmlldyBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICh0aGlzLm1lbnVSZWYgJiYgdGhpcy5mb2N1c2VkT3B0aW9uUmVmICYmIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUpIHtcbiAgICAgICAgc2Nyb2xsSW50b1ZpZXcodGhpcy5tZW51UmVmLCB0aGlzLmZvY3VzZWRPcHRpb25SZWYpO1xuICAgICAgfVxuICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLnN0b3BMaXN0ZW5pbmdUb1RvdWNoKCk7XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gRWxlbWVudCBSZWZzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgfSwge1xuICAgIGtleTogJ29uTWVudU9wZW4nLFxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBDb25zdW1lciBIYW5kbGVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWVudU9wZW4oKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTWVudU9wZW4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbk1lbnVDbG9zZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWVudUNsb3NlKCkge1xuICAgICAgdGhpcy5vbklucHV0Q2hhbmdlKCcnLCB7IGFjdGlvbjogJ21lbnUtY2xvc2UnIH0pO1xuICAgICAgdGhpcy5wcm9wcy5vbk1lbnVDbG9zZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uSW5wdXRDaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbklucHV0Q2hhbmdlKG5ld1ZhbHVlLCBhY3Rpb25NZXRhKSB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UobmV3VmFsdWUsIGFjdGlvbk1ldGEpO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1ldGhvZHNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB9LCB7XG4gICAga2V5OiAnZm9jdXNJbnB1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvY3VzSW5wdXQoKSB7XG4gICAgICBpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdibHVySW5wdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBibHVySW5wdXQoKSB7XG4gICAgICBpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICAgIH1cblxuICAgIC8vIGFsaWFzZWQgZm9yIGNvbnN1bWVyc1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcGVuTWVudScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW5NZW51KGZvY3VzT3B0aW9uKSB7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBtZW51T3B0aW9ucyA9IF9zdGF0ZS5tZW51T3B0aW9ucyxcbiAgICAgICAgICBzZWxlY3RWYWx1ZSA9IF9zdGF0ZS5zZWxlY3RWYWx1ZTtcbiAgICAgIHZhciBpc011bHRpID0gdGhpcy5wcm9wcy5pc011bHRpO1xuXG5cbiAgICAgIHZhciBvcGVuQXRJbmRleCA9IGZvY3VzT3B0aW9uID09PSAnZmlyc3QnID8gMCA6IG1lbnVPcHRpb25zLmZvY3VzYWJsZS5sZW5ndGggLSAxO1xuXG4gICAgICBpZiAoIWlzTXVsdGkpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSBtZW51T3B0aW9ucy5mb2N1c2FibGUuaW5kZXhPZihzZWxlY3RWYWx1ZVswXSk7XG4gICAgICAgIGlmIChzZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICBvcGVuQXRJbmRleCA9IHNlbGVjdGVkSW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5vbk1lbnVPcGVuKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZm9jdXNlZFZhbHVlOiBudWxsLFxuICAgICAgICBmb2N1c2VkT3B0aW9uOiBtZW51T3B0aW9ucy5mb2N1c2FibGVbb3BlbkF0SW5kZXhdXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmb2N1c1ZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9jdXNWYWx1ZShkaXJlY3Rpb24pIHtcbiAgICAgIHZhciBpc011bHRpID0gdGhpcy5wcm9wcy5pc011bHRpO1xuICAgICAgdmFyIF9zdGF0ZTIgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIHNlbGVjdFZhbHVlID0gX3N0YXRlMi5zZWxlY3RWYWx1ZSxcbiAgICAgICAgICBmb2N1c2VkVmFsdWUgPSBfc3RhdGUyLmZvY3VzZWRWYWx1ZTtcblxuICAgICAgLy8gT25seSBtdWx0aXNlbGVjdHMgc3VwcG9ydCB2YWx1ZSBmb2N1c2luZ1xuXG4gICAgICBpZiAoIWlzTXVsdGkpIHJldHVybjtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGZvY3VzZWRPcHRpb246IG51bGxcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZm9jdXNlZEluZGV4ID0gZm9jdXNlZFZhbHVlID8gc2VsZWN0VmFsdWUuaW5kZXhPZihmb2N1c2VkVmFsdWUpIDogLTE7XG4gICAgICB2YXIgbGFzdEluZGV4ID0gc2VsZWN0VmFsdWUubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBuZXh0Rm9jdXMgPSAtMTtcbiAgICAgIGlmICghc2VsZWN0VmFsdWUubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBkb24ndCBjeWNsZSBmcm9tIHRoZSBzdGFydCB0byB0aGUgZW5kXG4gICAgICAgICAgICBuZXh0Rm9jdXMgPSAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgLy8gaWYgbm90aGluZyBpcyBmb2N1c2VkLCBmb2N1cyB0aGUgbGFzdCB2YWx1ZSBmaXJzdFxuICAgICAgICAgICAgbmV4dEZvY3VzID0gbGFzdEluZGV4O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0Rm9jdXMgPSBmb2N1c2VkSW5kZXggLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA+IC0xICYmIGZvY3VzZWRJbmRleCA8IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgbmV4dEZvY3VzID0gZm9jdXNlZEluZGV4ICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpbnB1dElzSGlkZGVuOiBuZXh0Rm9jdXMgPT09IC0xID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICBmb2N1c2VkVmFsdWU6IHNlbGVjdFZhbHVlW25leHRGb2N1c11cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZvY3VzT3B0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9jdXNPcHRpb24oKSB7XG4gICAgICB2YXIgZGlyZWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnZmlyc3QnO1xuICAgICAgdmFyIHBhZ2VTaXplID0gdGhpcy5wcm9wcy5wYWdlU2l6ZTtcbiAgICAgIHZhciBfc3RhdGUzID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBmb2N1c2VkT3B0aW9uID0gX3N0YXRlMy5mb2N1c2VkT3B0aW9uLFxuICAgICAgICAgIG1lbnVPcHRpb25zID0gX3N0YXRlMy5tZW51T3B0aW9ucztcblxuICAgICAgdmFyIG9wdGlvbnMgPSBtZW51T3B0aW9ucy5mb2N1c2FibGU7XG5cbiAgICAgIGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcbiAgICAgIHZhciBuZXh0Rm9jdXMgPSAwOyAvLyBoYW5kbGVzICdmaXJzdCdcbiAgICAgIHZhciBmb2N1c2VkSW5kZXggPSBmb2N1c2VkT3B0aW9uID8gb3B0aW9ucy5pbmRleE9mKGZvY3VzZWRPcHRpb24pIDogLTE7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgIG5leHRGb2N1cyA9IGZvY3VzZWRJbmRleCA+IDAgPyBmb2N1c2VkSW5kZXggLSAxIDogb3B0aW9ucy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xuICAgICAgICBuZXh0Rm9jdXMgPSAoZm9jdXNlZEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aDtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncGFnZXVwJykge1xuICAgICAgICBuZXh0Rm9jdXMgPSBmb2N1c2VkSW5kZXggLSBwYWdlU2l6ZTtcbiAgICAgICAgaWYgKG5leHRGb2N1cyA8IDApIG5leHRGb2N1cyA9IDA7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3BhZ2Vkb3duJykge1xuICAgICAgICBuZXh0Rm9jdXMgPSBmb2N1c2VkSW5kZXggKyBwYWdlU2l6ZTtcbiAgICAgICAgaWYgKG5leHRGb2N1cyA+IG9wdGlvbnMubGVuZ3RoIC0gMSkgbmV4dEZvY3VzID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsYXN0Jykge1xuICAgICAgICBuZXh0Rm9jdXMgPSBvcHRpb25zLmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICB0aGlzLnNjcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBmb2N1c2VkT3B0aW9uOiBvcHRpb25zW25leHRGb2N1c10sXG4gICAgICAgIGZvY3VzZWRWYWx1ZTogbnVsbFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q29tbW9uUHJvcHMnLFxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBHZXR0ZXJzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29tbW9uUHJvcHMoKSB7XG4gICAgICB2YXIgY2xlYXJWYWx1ZSA9IHRoaXMuY2xlYXJWYWx1ZSxcbiAgICAgICAgICBnZXRTdHlsZXMgPSB0aGlzLmdldFN0eWxlcyxcbiAgICAgICAgICBzZXRWYWx1ZSA9IHRoaXMuc2V0VmFsdWUsXG4gICAgICAgICAgc2VsZWN0T3B0aW9uID0gdGhpcy5zZWxlY3RPcHRpb24sXG4gICAgICAgICAgcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICBjbGFzc05hbWVQcmVmaXggPSBwcm9wcy5jbGFzc05hbWVQcmVmaXgsXG4gICAgICAgICAgaXNNdWx0aSA9IHByb3BzLmlzTXVsdGksXG4gICAgICAgICAgaXNSdGwgPSBwcm9wcy5pc1J0bCxcbiAgICAgICAgICBvcHRpb25zID0gcHJvcHMub3B0aW9ucztcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IHRoaXMuc3RhdGUuc2VsZWN0VmFsdWU7XG5cbiAgICAgIHZhciBoYXNWYWx1ZSA9IHRoaXMuaGFzVmFsdWUoKTtcbiAgICAgIHZhciBnZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0VmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIGN4UHJlZml4ID0gY2xhc3NOYW1lUHJlZml4O1xuICAgICAgaWYgKGNsYXNzTmFtZSAmJiBjbGFzc05hbWVQcmVmaXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1xcbiAgICAgICAgV2FybmluZzogdGhlIGJlaGF2aW91ciBvZiBcXCdjbGFzc05hbWVcXCcgaGFzIGNoYW5nZWQgYmV0d2VlbiAyLjAuMC1iZXRhLjIgYW5kIDIuMC4wLWJldGEuMy5cXG4gICAgICAgIFlvdSBjYW4gbm93IHVzZSBjbGFzc05hbWUgdG8gc3BlY2lmeSB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgb3V0ZXIgY29udGFpbmVyLCBhbmQgY2xhc3NOYW1lUHJlZml4IHRvIGVuYWJsZSBvdXIgcHJvdmlkZWQgQkVNIGNsYXNzIG5hbWVzIGZvciBpbnRlcm5hbCBlbGVtZW50cy5cXG4gICAgICAgIFRoZSBjbGFzc05hbWUgcHJvcCB3aWxsIGhhdmUgbm8gZWZmZWN0IG9uIGludGVybmFsIGVsZW1lbnRzIHdoZW4gMi4wLjAgaXMgcmVsZWFzZWQuXFxuICAgICAgJyk7XG4gICAgICAgIGN4UHJlZml4ID0gY2xhc3NOYW1lO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3ggPSBjbGFzc05hbWVzLmJpbmQobnVsbCwgY3hQcmVmaXgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY3g6IGN4LFxuICAgICAgICBjbGVhclZhbHVlOiBjbGVhclZhbHVlLFxuICAgICAgICBnZXRTdHlsZXM6IGdldFN0eWxlcyxcbiAgICAgICAgZ2V0VmFsdWU6IGdldFZhbHVlLFxuICAgICAgICBoYXNWYWx1ZTogaGFzVmFsdWUsXG4gICAgICAgIGlzTXVsdGk6IGlzTXVsdGksXG4gICAgICAgIGlzUnRsOiBpc1J0bCxcbiAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgc2VsZWN0T3B0aW9uOiBzZWxlY3RPcHRpb24sXG4gICAgICAgIHNldFZhbHVlOiBzZXRWYWx1ZSxcbiAgICAgICAgc2VsZWN0UHJvcHM6IHByb3BzXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldE5leHRGb2N1c2VkVmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXROZXh0Rm9jdXNlZFZhbHVlKG5leHRTZWxlY3RWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY2xlYXJGb2N1c1ZhbHVlT25VcGRhdGUpIHtcbiAgICAgICAgdGhpcy5jbGVhckZvY3VzVmFsdWVPblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBfc3RhdGU0ID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBmb2N1c2VkVmFsdWUgPSBfc3RhdGU0LmZvY3VzZWRWYWx1ZSxcbiAgICAgICAgICBsYXN0U2VsZWN0VmFsdWUgPSBfc3RhdGU0LnNlbGVjdFZhbHVlO1xuXG4gICAgICB2YXIgbGFzdEZvY3VzZWRJbmRleCA9IGxhc3RTZWxlY3RWYWx1ZS5pbmRleE9mKGZvY3VzZWRWYWx1ZSk7XG4gICAgICBpZiAobGFzdEZvY3VzZWRJbmRleCA+IC0xKSB7XG4gICAgICAgIHZhciBuZXh0Rm9jdXNlZEluZGV4ID0gbmV4dFNlbGVjdFZhbHVlLmluZGV4T2YoZm9jdXNlZFZhbHVlKTtcbiAgICAgICAgaWYgKG5leHRGb2N1c2VkSW5kZXggPiAtMSkge1xuICAgICAgICAgIC8vIHRoZSBmb2N1c2VkIHZhbHVlIGlzIHN0aWxsIGluIHRoZSBzZWxlY3RWYWx1ZSwgcmV0dXJuIGl0XG4gICAgICAgICAgcmV0dXJuIGZvY3VzZWRWYWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0Rm9jdXNlZEluZGV4IDwgbmV4dFNlbGVjdFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgIC8vIHRoZSBmb2N1c2VkVmFsdWUgaXMgbm90IHByZXNlbnQgaW4gdGhlIG5leHQgc2VsZWN0VmFsdWUgYXJyYXkgYnlcbiAgICAgICAgICAvLyByZWZlcmVuY2UsIHNvIHJldHVybiB0aGUgbmV3IHZhbHVlIGF0IHRoZSBzYW1lIGluZGV4XG4gICAgICAgICAgcmV0dXJuIG5leHRTZWxlY3RWYWx1ZVtsYXN0Rm9jdXNlZEluZGV4XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0TmV4dEZvY3VzZWRPcHRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXROZXh0Rm9jdXNlZE9wdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbGFzdEZvY3VzZWRPcHRpb24gPSB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb247XG5cbiAgICAgIHJldHVybiBsYXN0Rm9jdXNlZE9wdGlvbiAmJiBvcHRpb25zLmluZGV4T2YobGFzdEZvY3VzZWRPcHRpb24pID4gLTEgPyBsYXN0Rm9jdXNlZE9wdGlvbiA6IG9wdGlvbnNbMF07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0T3B0aW9uTGFiZWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRPcHRpb25MYWJlbCQkMShkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5nZXRPcHRpb25MYWJlbChkYXRhKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRPcHRpb25WYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE9wdGlvblZhbHVlJCQxKGRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmdldE9wdGlvblZhbHVlKGRhdGEpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhc1ZhbHVlJyxcblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSGVscGVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc1ZhbHVlKCkge1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gdGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZTtcblxuICAgICAgcmV0dXJuIHNlbGVjdFZhbHVlLmxlbmd0aCA+IDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFzT3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc09wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnN0YXRlLm1lbnVPcHRpb25zLnJlbmRlci5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY291bnRPcHRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY291bnRPcHRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUubWVudU9wdGlvbnMuZm9jdXNhYmxlLmxlbmd0aDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc0NsZWFyYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzQ2xlYXJhYmxlKCkge1xuICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGlzQ2xlYXJhYmxlID0gX3Byb3BzMy5pc0NsZWFyYWJsZSxcbiAgICAgICAgICBpc011bHRpID0gX3Byb3BzMy5pc011bHRpO1xuXG4gICAgICAvLyBzaW5nbGUgc2VsZWN0LCBieSBkZWZhdWx0LCBJUyBOT1QgY2xlYXJhYmxlXG4gICAgICAvLyBtdWx0aSBzZWxlY3QsIGJ5IGRlZmF1bHQsIElTIGNsZWFyYWJsZVxuXG4gICAgICBpZiAoaXNDbGVhcmFibGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGlzTXVsdGk7XG5cbiAgICAgIHJldHVybiBpc0NsZWFyYWJsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc09wdGlvbkRpc2FibGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNPcHRpb25EaXNhYmxlZCQkMShvcHRpb24pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcm9wcy5pc09wdGlvbkRpc2FibGVkID09PSAnZnVuY3Rpb24nID8gdGhpcy5wcm9wcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbikgOiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc09wdGlvblNlbGVjdGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNPcHRpb25TZWxlY3RlZChvcHRpb24sIHNlbGVjdFZhbHVlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKHNlbGVjdFZhbHVlLmluZGV4T2Yob3B0aW9uKSA+IC0xKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pc09wdGlvblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmlzT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBzZWxlY3RWYWx1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgY2FuZGlkYXRlID0gdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pO1xuICAgICAgcmV0dXJuIHNlbGVjdFZhbHVlLnNvbWUoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5nZXRPcHRpb25WYWx1ZShpKSA9PT0gY2FuZGlkYXRlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmlsdGVyT3B0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmlsdGVyT3B0aW9uKG9wdGlvbiwgaW5wdXRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uID8gdGhpcy5wcm9wcy5maWx0ZXJPcHRpb24ob3B0aW9uLCBpbnB1dFZhbHVlKSA6IHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9ybWF0T3B0aW9uTGFiZWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JtYXRPcHRpb25MYWJlbChkYXRhLCBjb250ZXh0KSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuZm9ybWF0T3B0aW9uTGFiZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIF9pbnB1dFZhbHVlID0gdGhpcy5wcm9wcy5pbnB1dFZhbHVlO1xuICAgICAgICB2YXIgX3NlbGVjdFZhbHVlMiA9IHRoaXMuc3RhdGUuc2VsZWN0VmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0T3B0aW9uTGFiZWwoZGF0YSwge1xuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgaW5wdXRWYWx1ZTogX2lucHV0VmFsdWUsXG4gICAgICAgICAgc2VsZWN0VmFsdWU6IF9zZWxlY3RWYWx1ZTJcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb25MYWJlbChkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmb3JtYXRHcm91cExhYmVsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9ybWF0R3JvdXBMYWJlbCQkMShkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mb3JtYXRHcm91cExhYmVsKGRhdGEpO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1vdXNlIEhhbmRsZXJzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgfSwge1xuICAgIGtleTogJ3N0YXJ0TGlzdGVuaW5nVG9Ub3VjaCcsXG5cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFRvdWNoIEhhbmRsZXJzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRMaXN0ZW5pbmdUb1RvdWNoKCkge1xuICAgICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzdG9wTGlzdGVuaW5nVG9Ub3VjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmdUb1RvdWNoKCkge1xuICAgICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0KTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBGb2N1cyBIYW5kbGVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gS2V5Ym9hcmQgSGFuZGxlcnNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB9LCB7XG4gICAga2V5OiAnYnVpbGRNZW51T3B0aW9ucycsXG5cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1lbnUgT3B0aW9uc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkTWVudU9wdGlvbnMocHJvcHMsIHNlbGVjdFZhbHVlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGhpZGVTZWxlY3RlZE9wdGlvbnMgPSBwcm9wcy5oaWRlU2VsZWN0ZWRPcHRpb25zLFxuICAgICAgICAgIGlzTXVsdGkgPSBwcm9wcy5pc011bHRpLFxuICAgICAgICAgIF9wcm9wcyRpbnB1dFZhbHVlID0gcHJvcHMuaW5wdXRWYWx1ZSxcbiAgICAgICAgICBpbnB1dFZhbHVlID0gX3Byb3BzJGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCA/ICcnIDogX3Byb3BzJGlucHV0VmFsdWUsXG4gICAgICAgICAgb3B0aW9ucyA9IHByb3BzLm9wdGlvbnM7XG5cblxuICAgICAgdmFyIHRvT3B0aW9uID0gZnVuY3Rpb24gdG9PcHRpb24ob3B0aW9uLCBpZCkge1xuICAgICAgICB2YXIgaXNEaXNhYmxlZCA9IF90aGlzMy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbik7XG4gICAgICAgIHZhciBpc1NlbGVjdGVkID0gX3RoaXMzLmlzT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBzZWxlY3RWYWx1ZSk7XG4gICAgICAgIHZhciBsYWJlbCA9IF90aGlzMy5nZXRPcHRpb25MYWJlbChvcHRpb24pO1xuICAgICAgICB2YXIgdmFsdWUgPSBfdGhpczMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcblxuICAgICAgICBpZiAoaXNNdWx0aSAmJiBoaWRlU2VsZWN0ZWRPcHRpb25zICYmIGlzU2VsZWN0ZWQgfHwgIV90aGlzMy5maWx0ZXJPcHRpb24oeyBsYWJlbDogbGFiZWwsIHZhbHVlOiB2YWx1ZSwgZGF0YTogb3B0aW9uIH0sIGlucHV0VmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9uSG92ZXIgPSBpc0Rpc2FibGVkID8gdW5kZWZpbmVkIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMub25PcHRpb25Ib3ZlcihvcHRpb24pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb25TZWxlY3QgPSBpc0Rpc2FibGVkID8gdW5kZWZpbmVkIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcHRpb25JZCA9IF90aGlzMy5nZXRFbGVtZW50SWQoJ29wdGlvbicpICsgJy0nICsgaWQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbm5lclByb3BzOiB7XG4gICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgICBpZDogb3B0aW9uSWQsXG4gICAgICAgICAgICBvbkNsaWNrOiBvblNlbGVjdCxcbiAgICAgICAgICAgIG9uTW91c2VNb3ZlOiBvbkhvdmVyLFxuICAgICAgICAgICAgb25Nb3VzZU92ZXI6IG9uSG92ZXIsXG4gICAgICAgICAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAgICAgICAgIHRhYkluZGV4OiAtMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YTogb3B0aW9uLFxuICAgICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgICAgaXNTZWxlY3RlZDogaXNTZWxlY3RlZCxcbiAgICAgICAgICBrZXk6IG9wdGlvbklkLFxuICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICB0eXBlOiAnb3B0aW9uJyxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBvcHRpb25zLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBpdGVtLCBpdGVtSW5kZXgpIHtcbiAgICAgICAgaWYgKGl0ZW0ub3B0aW9ucykge1xuICAgICAgICAgIC8vIFRPRE8gbmVlZHMgYSB0aWRpZXIgaW1wbGVtZW50YXRpb25cbiAgICAgICAgICBpZiAoIV90aGlzMy5oYXNHcm91cHMpIF90aGlzMy5oYXNHcm91cHMgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIGl0ZW1zID0gaXRlbS5vcHRpb25zO1xuXG4gICAgICAgICAgdmFyIGNoaWxkcmVuID0gaXRlbXMubWFwKGZ1bmN0aW9uIChjaGlsZCwgaSkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHRvT3B0aW9uKGNoaWxkLCBpdGVtSW5kZXggKyAnLScgKyBpKTtcbiAgICAgICAgICAgIGlmIChvcHRpb24gJiYgIW9wdGlvbi5pc0Rpc2FibGVkKSBhY2MuZm9jdXNhYmxlLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICB9KS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGdyb3VwSWQgPSBfdGhpczMuZ2V0RWxlbWVudElkKCdncm91cCcpICsgJy0nICsgaXRlbUluZGV4O1xuICAgICAgICAgICAgYWNjLnJlbmRlci5wdXNoKHtcbiAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgICAgICAga2V5OiBncm91cElkLFxuICAgICAgICAgICAgICBkYXRhOiBpdGVtLFxuICAgICAgICAgICAgICBvcHRpb25zOiBjaGlsZHJlblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvcHRpb24gPSB0b09wdGlvbihpdGVtLCAnJyArIGl0ZW1JbmRleCk7XG4gICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgYWNjLnJlbmRlci5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5pc0Rpc2FibGVkKSBhY2MuZm9jdXNhYmxlLnB1c2goaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7IHJlbmRlcjogW10sIGZvY3VzYWJsZTogW10gfSk7XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gUmVuZGVyZXJzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlclNjcmVlblJlYWRlclN0YXR1cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclNjcmVlblJlYWRlclN0YXR1cygpIHtcbiAgICAgIHZhciBzY3JlZW5SZWFkZXJTdGF0dXMgPSB0aGlzLnByb3BzLnNjcmVlblJlYWRlclN0YXR1cztcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIEExMXlUZXh0LFxuICAgICAgICB7ICdhcmlhLWF0b21pYyc6ICd0cnVlJywgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLCByb2xlOiAnc3RhdHVzJyB9LFxuICAgICAgICBzY3JlZW5SZWFkZXJTdGF0dXMoeyBjb3VudDogdGhpcy5jb3VudE9wdGlvbnMoKSB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJJbnB1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcklucHV0KCkge1xuICAgICAgdmFyIF9wcm9wczQgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHM0LmlzRGlzYWJsZWQsXG4gICAgICAgICAgaXNMb2FkaW5nID0gX3Byb3BzNC5pc0xvYWRpbmcsXG4gICAgICAgICAgaXNTZWFyY2hhYmxlID0gX3Byb3BzNC5pc1NlYXJjaGFibGUsXG4gICAgICAgICAgaW5wdXRJZCA9IF9wcm9wczQuaW5wdXRJZCxcbiAgICAgICAgICBpbnB1dFZhbHVlID0gX3Byb3BzNC5pbnB1dFZhbHVlLFxuICAgICAgICAgIG1lbnVJc09wZW4gPSBfcHJvcHM0Lm1lbnVJc09wZW4sXG4gICAgICAgICAgdGFiSW5kZXggPSBfcHJvcHM0LnRhYkluZGV4O1xuICAgICAgdmFyIElucHV0JCQxID0gdGhpcy5jb21wb25lbnRzLklucHV0O1xuICAgICAgdmFyIGlucHV0SXNIaWRkZW4gPSB0aGlzLnN0YXRlLmlucHV0SXNIaWRkZW47XG5cblxuICAgICAgdmFyIGlkID0gaW5wdXRJZCB8fCB0aGlzLmdldEVsZW1lbnRJZCgnaW5wdXQnKTtcblxuICAgICAgaWYgKCFpc1NlYXJjaGFibGUpIHtcbiAgICAgICAgLy8gdXNlIGEgZHVtbXkgaW5wdXQgdG8gbWFpbnRhaW4gZm9jdXMvYmx1ciBmdW5jdGlvbmFsaXR5XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KER1bW15SW5wdXQsIHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgaW5uZXJSZWY6IHRoaXMub25JbnB1dFJlZixcbiAgICAgICAgICBvbkJsdXI6IHRoaXMub25JbnB1dEJsdXIsXG4gICAgICAgICAgb25DaGFuZ2U6IG5vb3AsXG4gICAgICAgICAgb25Gb2N1czogdGhpcy5vbklucHV0Rm9jdXMsXG4gICAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgICAgdGFiSW5kZXg6IHRhYkluZGV4LFxuICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gYXJpYSBhdHRyaWJ1dGVzIG1ha2VzIHRoZSBKU1ggXCJub2lzeVwiLCBzZXBhcmF0ZWQgZm9yIGNsYXJpdHlcbiAgICAgIHZhciBhcmlhQXR0cmlidXRlcyA9IHtcbiAgICAgICAgJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IHRoaXMuZ2V0QWN0aXZlRGVzY2VuZGVudElkKCksXG4gICAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6ICdsaXN0JyxcbiAgICAgICAgJ2FyaWEtYnVzeSc6IGlzTG9hZGluZyxcbiAgICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiB0aGlzLnByb3BzWydhcmlhLWRlc2NyaWJlZGJ5J10sXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogbWVudUlzT3BlbixcbiAgICAgICAgJ2FyaWEtaGFzcG9wdXAnOiBtZW51SXNPcGVuLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcbiAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxuICAgICAgICAnYXJpYS1vd25zJzogbWVudUlzT3BlbiA/IHRoaXMuZ2V0RWxlbWVudElkKCdsaXN0Ym94JykgOiB1bmRlZmluZWQsXG4gICAgICAgIHJvbGU6ICdjb21ib2JveCdcbiAgICAgIH07XG5cbiAgICAgIHZhciBjeCA9IHRoaXMuY29tbW9uUHJvcHMuY3g7XG5cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQkJDEsIF9leHRlbmRzKHtcbiAgICAgICAgYXV0b0NhcGl0YWxpemU6ICdub25lJyxcbiAgICAgICAgYXV0b0NvbXBsZXRlOiAnb2ZmJyxcbiAgICAgICAgYXV0b0NvcnJlY3Q6ICdvZmYnLFxuICAgICAgICBjeDogY3gsXG4gICAgICAgIGdldFN0eWxlczogdGhpcy5nZXRTdHlsZXMsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgaW5uZXJSZWY6IHRoaXMub25JbnB1dFJlZixcbiAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgaXNIaWRkZW46IGlucHV0SXNIaWRkZW4sXG4gICAgICAgIG9uQmx1cjogdGhpcy5vbklucHV0Qmx1cixcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG4gICAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxuICAgICAgICBzcGVsbENoZWNrOiAnZmFsc2UnLFxuICAgICAgICB0YWJJbmRleDogdGFiSW5kZXgsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdmFsdWU6IGlucHV0VmFsdWVcbiAgICAgIH0sIGFyaWFBdHRyaWJ1dGVzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyUGxhY2Vob2xkZXJPclZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyUGxhY2Vob2xkZXJPclZhbHVlKCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHZhciBfY29tcG9uZW50cyA9IHRoaXMuY29tcG9uZW50cyxcbiAgICAgICAgICBNdWx0aVZhbHVlID0gX2NvbXBvbmVudHMuTXVsdGlWYWx1ZSxcbiAgICAgICAgICBNdWx0aVZhbHVlQ29udGFpbmVyID0gX2NvbXBvbmVudHMuTXVsdGlWYWx1ZUNvbnRhaW5lcixcbiAgICAgICAgICBNdWx0aVZhbHVlTGFiZWwgPSBfY29tcG9uZW50cy5NdWx0aVZhbHVlTGFiZWwsXG4gICAgICAgICAgTXVsdGlWYWx1ZVJlbW92ZSA9IF9jb21wb25lbnRzLk11bHRpVmFsdWVSZW1vdmUsXG4gICAgICAgICAgU2luZ2xlVmFsdWUgPSBfY29tcG9uZW50cy5TaW5nbGVWYWx1ZSxcbiAgICAgICAgICBQbGFjZWhvbGRlciA9IF9jb21wb25lbnRzLlBsYWNlaG9sZGVyO1xuICAgICAgdmFyIGNvbW1vblByb3BzID0gdGhpcy5jb21tb25Qcm9wcztcbiAgICAgIHZhciBfcHJvcHM1ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjb250cm9sU2hvdWxkUmVuZGVyVmFsdWUgPSBfcHJvcHM1LmNvbnRyb2xTaG91bGRSZW5kZXJWYWx1ZSxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzNS5pc0Rpc2FibGVkLFxuICAgICAgICAgIGlzTXVsdGkgPSBfcHJvcHM1LmlzTXVsdGksXG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IF9wcm9wczUuaW5wdXRWYWx1ZSxcbiAgICAgICAgICBwbGFjZWhvbGRlciA9IF9wcm9wczUucGxhY2Vob2xkZXI7XG4gICAgICB2YXIgX3N0YXRlNSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgc2VsZWN0VmFsdWUgPSBfc3RhdGU1LnNlbGVjdFZhbHVlLFxuICAgICAgICAgIGZvY3VzZWRWYWx1ZSA9IF9zdGF0ZTUuZm9jdXNlZFZhbHVlO1xuXG5cbiAgICAgIGlmICghdGhpcy5oYXNWYWx1ZSgpIHx8ICFjb250cm9sU2hvdWxkUmVuZGVyVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0VmFsdWUgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBQbGFjZWhvbGRlcixcbiAgICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHsga2V5OiAncGxhY2Vob2xkZXInLCBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkIH0pLFxuICAgICAgICAgIHBsYWNlaG9sZGVyXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc011bHRpKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RWYWx1ZS5tYXAoZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICAgIHZhciBpc0ZvY3VzZWQgPSBvcHQgPT09IGZvY3VzZWRWYWx1ZTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIE11bHRpVmFsdWUsXG4gICAgICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHtcbiAgICAgICAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgICAgIENvbnRhaW5lcjogTXVsdGlWYWx1ZUNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBMYWJlbDogTXVsdGlWYWx1ZUxhYmVsLFxuICAgICAgICAgICAgICAgIFJlbW92ZTogTXVsdGlWYWx1ZVJlbW92ZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpc0ZvY3VzZWQ6IGlzRm9jdXNlZCxcbiAgICAgICAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICAgICAga2V5OiBfdGhpczQuZ2V0T3B0aW9uVmFsdWUob3B0KSxcbiAgICAgICAgICAgICAgcmVtb3ZlUHJvcHM6IHtcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzNC5yZW1vdmVWYWx1ZShvcHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd246IGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkYXRhOiBvcHRcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgX3RoaXM0LmZvcm1hdE9wdGlvbkxhYmVsKG9wdCwgJ3ZhbHVlJylcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBzaW5nbGVWYWx1ZSA9IHNlbGVjdFZhbHVlWzBdO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFNpbmdsZVZhbHVlLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHsgZGF0YTogc2luZ2xlVmFsdWUsIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQgfSksXG4gICAgICAgIHRoaXMuZm9ybWF0T3B0aW9uTGFiZWwoc2luZ2xlVmFsdWUsICd2YWx1ZScpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlckNsZWFySW5kaWNhdG9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyQ2xlYXJJbmRpY2F0b3IoKSB7XG4gICAgICB2YXIgQ2xlYXJJbmRpY2F0b3IgPSB0aGlzLmNvbXBvbmVudHMuQ2xlYXJJbmRpY2F0b3I7XG4gICAgICB2YXIgY29tbW9uUHJvcHMgPSB0aGlzLmNvbW1vblByb3BzO1xuICAgICAgdmFyIF9wcm9wczYgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHM2LmlzRGlzYWJsZWQsXG4gICAgICAgICAgaXNMb2FkaW5nID0gX3Byb3BzNi5pc0xvYWRpbmc7XG4gICAgICB2YXIgaXNGb2N1c2VkID0gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQ7XG5cblxuICAgICAgaWYgKCF0aGlzLmlzQ2xlYXJhYmxlKCkgfHwgIUNsZWFySW5kaWNhdG9yIHx8IGlzRGlzYWJsZWQgfHwgIXRoaXMuaGFzVmFsdWUoKSB8fCBpc0xvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbm5lclByb3BzID0ge1xuICAgICAgICBvbk1vdXNlRG93bjogdGhpcy5vbkNsZWFySW5kaWNhdG9yTW91c2VEb3duLFxuICAgICAgICBvblRvdWNoRW5kOiB0aGlzLm9uQ2xlYXJJbmRpY2F0b3JUb3VjaEVuZCxcbiAgICAgICAgcm9sZTogJ2J1dHRvbidcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENsZWFySW5kaWNhdG9yLCBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHtcbiAgICAgICAgaW5uZXJQcm9wczogaW5uZXJQcm9wcyxcbiAgICAgICAgaXNGb2N1c2VkOiBpc0ZvY3VzZWRcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJMb2FkaW5nSW5kaWNhdG9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTG9hZGluZ0luZGljYXRvcigpIHtcbiAgICAgIHZhciBMb2FkaW5nSW5kaWNhdG9yID0gdGhpcy5jb21wb25lbnRzLkxvYWRpbmdJbmRpY2F0b3I7XG4gICAgICB2YXIgY29tbW9uUHJvcHMgPSB0aGlzLmNvbW1vblByb3BzO1xuICAgICAgdmFyIF9wcm9wczcgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHM3LmlzRGlzYWJsZWQsXG4gICAgICAgICAgaXNMb2FkaW5nID0gX3Byb3BzNy5pc0xvYWRpbmc7XG4gICAgICB2YXIgaXNGb2N1c2VkID0gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQ7XG5cblxuICAgICAgaWYgKCFMb2FkaW5nSW5kaWNhdG9yIHx8ICFpc0xvYWRpbmcpIHJldHVybiBudWxsO1xuXG4gICAgICB2YXIgaW5uZXJQcm9wcyA9IHtcbiAgICAgICAgcm9sZTogJ3ByZXNlbnRhdGlvbidcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmdJbmRpY2F0b3IsIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywge1xuICAgICAgICBpbm5lclByb3BzOiBpbm5lclByb3BzLFxuICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICBpc0ZvY3VzZWQ6IGlzRm9jdXNlZFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlckluZGljYXRvclNlcGFyYXRvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckluZGljYXRvclNlcGFyYXRvcigpIHtcbiAgICAgIHZhciBfY29tcG9uZW50czIgPSB0aGlzLmNvbXBvbmVudHMsXG4gICAgICAgICAgRHJvcGRvd25JbmRpY2F0b3IgPSBfY29tcG9uZW50czIuRHJvcGRvd25JbmRpY2F0b3IsXG4gICAgICAgICAgSW5kaWNhdG9yU2VwYXJhdG9yID0gX2NvbXBvbmVudHMyLkluZGljYXRvclNlcGFyYXRvcjtcblxuICAgICAgLy8gc2VwYXJhdG9yIGRvZXNuJ3QgbWFrZSBzZW5zZSB3aXRob3V0IHRoZSBkcm9wZG93biBpbmRpY2F0b3JcblxuICAgICAgaWYgKCFEcm9wZG93bkluZGljYXRvciB8fCAhSW5kaWNhdG9yU2VwYXJhdG9yKSByZXR1cm4gbnVsbDtcblxuICAgICAgdmFyIGNvbW1vblByb3BzID0gdGhpcy5jb21tb25Qcm9wcztcbiAgICAgIHZhciBpc0Rpc2FibGVkID0gdGhpcy5wcm9wcy5pc0Rpc2FibGVkO1xuICAgICAgdmFyIGlzRm9jdXNlZCA9IHRoaXMuc3RhdGUuaXNGb2N1c2VkO1xuXG4gICAgICB2YXIgaW5uZXJQcm9wcyA9IHsgcm9sZTogJ3ByZXNlbnRhdGlvbicgfTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5kaWNhdG9yU2VwYXJhdG9yLCBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHtcbiAgICAgICAgaW5uZXJQcm9wczogaW5uZXJQcm9wcyxcbiAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgaXNGb2N1c2VkOiBpc0ZvY3VzZWRcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJEcm9wZG93bkluZGljYXRvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckRyb3Bkb3duSW5kaWNhdG9yKCkge1xuICAgICAgdmFyIERyb3Bkb3duSW5kaWNhdG9yID0gdGhpcy5jb21wb25lbnRzLkRyb3Bkb3duSW5kaWNhdG9yO1xuXG4gICAgICBpZiAoIURyb3Bkb3duSW5kaWNhdG9yKSByZXR1cm4gbnVsbDtcbiAgICAgIHZhciBjb21tb25Qcm9wcyA9IHRoaXMuY29tbW9uUHJvcHM7XG4gICAgICB2YXIgaXNEaXNhYmxlZCA9IHRoaXMucHJvcHMuaXNEaXNhYmxlZDtcbiAgICAgIHZhciBpc0ZvY3VzZWQgPSB0aGlzLnN0YXRlLmlzRm9jdXNlZDtcblxuXG4gICAgICB2YXIgaW5uZXJQcm9wcyA9IHtcbiAgICAgICAgb25Nb3VzZURvd246IHRoaXMub25Ecm9wZG93bkluZGljYXRvck1vdXNlRG93bixcbiAgICAgICAgb25Ub3VjaEVuZDogdGhpcy5vbkRyb3Bkb3duSW5kaWNhdG9yVG91Y2hFbmQsXG4gICAgICAgIHJvbGU6ICdidXR0b24nXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wZG93bkluZGljYXRvciwgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgIGlubmVyUHJvcHM6IGlubmVyUHJvcHMsXG4gICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgIGlzRm9jdXNlZDogaXNGb2N1c2VkXG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyTWVudScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlck1lbnUoKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIF9jb21wb25lbnRzMyA9IHRoaXMuY29tcG9uZW50cyxcbiAgICAgICAgICBHcm91cCA9IF9jb21wb25lbnRzMy5Hcm91cCxcbiAgICAgICAgICBHcm91cEhlYWRpbmcgPSBfY29tcG9uZW50czMuR3JvdXBIZWFkaW5nLFxuICAgICAgICAgIE1lbnUgPSBfY29tcG9uZW50czMuTWVudSxcbiAgICAgICAgICBNZW51TGlzdCA9IF9jb21wb25lbnRzMy5NZW51TGlzdCxcbiAgICAgICAgICBNZW51UG9ydGFsID0gX2NvbXBvbmVudHMzLk1lbnVQb3J0YWwsXG4gICAgICAgICAgTG9hZGluZ01lc3NhZ2UgPSBfY29tcG9uZW50czMuTG9hZGluZ01lc3NhZ2UsXG4gICAgICAgICAgTm9PcHRpb25zTWVzc2FnZSA9IF9jb21wb25lbnRzMy5Ob09wdGlvbnNNZXNzYWdlLFxuICAgICAgICAgIE9wdGlvbiA9IF9jb21wb25lbnRzMy5PcHRpb247XG4gICAgICB2YXIgY29tbW9uUHJvcHMgPSB0aGlzLmNvbW1vblByb3BzO1xuICAgICAgdmFyIF9zdGF0ZTYgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIGZvY3VzZWRPcHRpb24gPSBfc3RhdGU2LmZvY3VzZWRPcHRpb24sXG4gICAgICAgICAgbWVudU9wdGlvbnMgPSBfc3RhdGU2Lm1lbnVPcHRpb25zO1xuICAgICAgdmFyIF9wcm9wczggPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNhcHR1cmVNZW51U2Nyb2xsID0gX3Byb3BzOC5jYXB0dXJlTWVudVNjcm9sbCxcbiAgICAgICAgICBpbnB1dFZhbHVlID0gX3Byb3BzOC5pbnB1dFZhbHVlLFxuICAgICAgICAgIGlzTG9hZGluZyA9IF9wcm9wczguaXNMb2FkaW5nLFxuICAgICAgICAgIGlzTXVsdGkgPSBfcHJvcHM4LmlzTXVsdGksXG4gICAgICAgICAgbG9hZGluZ01lc3NhZ2UgPSBfcHJvcHM4LmxvYWRpbmdNZXNzYWdlLFxuICAgICAgICAgIG1pbk1lbnVIZWlnaHQgPSBfcHJvcHM4Lm1pbk1lbnVIZWlnaHQsXG4gICAgICAgICAgbWF4TWVudUhlaWdodCA9IF9wcm9wczgubWF4TWVudUhlaWdodCxcbiAgICAgICAgICBtZW51SXNPcGVuID0gX3Byb3BzOC5tZW51SXNPcGVuLFxuICAgICAgICAgIG1lbnVQbGFjZW1lbnQgPSBfcHJvcHM4Lm1lbnVQbGFjZW1lbnQsXG4gICAgICAgICAgbWVudVBvc2l0aW9uID0gX3Byb3BzOC5tZW51UG9zaXRpb24sXG4gICAgICAgICAgbWVudVBvcnRhbFRhcmdldCA9IF9wcm9wczgubWVudVBvcnRhbFRhcmdldCxcbiAgICAgICAgICBtZW51U2hvdWxkQmxvY2tTY3JvbGwgPSBfcHJvcHM4Lm1lbnVTaG91bGRCbG9ja1Njcm9sbCxcbiAgICAgICAgICBtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXcgPSBfcHJvcHM4Lm1lbnVTaG91bGRTY3JvbGxJbnRvVmlldyxcbiAgICAgICAgICBub09wdGlvbnNNZXNzYWdlID0gX3Byb3BzOC5ub09wdGlvbnNNZXNzYWdlLFxuICAgICAgICAgIG9uTWVudVNjcm9sbFRvVG9wID0gX3Byb3BzOC5vbk1lbnVTY3JvbGxUb1RvcCxcbiAgICAgICAgICBvbk1lbnVTY3JvbGxUb0JvdHRvbSA9IF9wcm9wczgub25NZW51U2Nyb2xsVG9Cb3R0b207XG5cblxuICAgICAgaWYgKCFtZW51SXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICAgICAgLy8gVE9ETzogSW50ZXJuYWwgT3B0aW9uIFR5cGUgaGVyZVxuICAgICAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihwcm9wcykge1xuICAgICAgICAvLyBmb3IgcGVyZm9ybWFuY2UsIHRoZSBtZW51IG9wdGlvbnMgaW4gc3RhdGUgYXJlbid0IGNoYW5nZWQgd2hlbiB0aGVcbiAgICAgICAgLy8gZm9jdXNlZCBvcHRpb24gY2hhbmdlcyBzbyB3ZSBjYWxjdWxhdGUgYWRkaXRpb25hbCBwcm9wcyBiYXNlZCBvbiB0aGF0XG4gICAgICAgIHZhciBpc0ZvY3VzZWQgPSBmb2N1c2VkT3B0aW9uID09PSBwcm9wcy5kYXRhO1xuICAgICAgICBwcm9wcy5pbm5lclByb3BzLmlubmVyUmVmID0gaXNGb2N1c2VkID8gX3RoaXM1Lm9uRm9jdXNlZE9wdGlvblJlZiA6IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBPcHRpb24sXG4gICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCBwcm9wcywgeyBpc0ZvY3VzZWQ6IGlzRm9jdXNlZCB9KSxcbiAgICAgICAgICBfdGhpczUuZm9ybWF0T3B0aW9uTGFiZWwocHJvcHMuZGF0YSwgJ21lbnUnKVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgdmFyIG1lbnVVSSA9IHZvaWQgMDtcblxuICAgICAgaWYgKHRoaXMuaGFzT3B0aW9ucygpKSB7XG4gICAgICAgIG1lbnVVSSA9IG1lbnVPcHRpb25zLnJlbmRlci5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGl0ZW0udHlwZSxcbiAgICAgICAgICAgICAgICBncm91cCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKGl0ZW0sIFsndHlwZSddKTtcblxuICAgICAgICAgICAgdmFyIGhlYWRpbmdJZCA9IGl0ZW0ua2V5ICsgJy1oZWFkaW5nJztcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIEdyb3VwLFxuICAgICAgICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIGdyb3VwLCB7XG4gICAgICAgICAgICAgICAgSGVhZGluZzogR3JvdXBIZWFkaW5nLFxuICAgICAgICAgICAgICAgIGlubmVyUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICdhcmlhLWV4cGFuZGVkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsbGVkYnknOiBoZWFkaW5nSWQsXG4gICAgICAgICAgICAgICAgICByb2xlOiAnZ3JvdXAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkaW5nUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIGlkOiBoZWFkaW5nSWRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxhYmVsOiBfdGhpczUuZm9ybWF0R3JvdXBMYWJlbChpdGVtLmRhdGEpXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBpdGVtLm9wdGlvbnMubWFwKGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyKG9wdGlvbik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnb3B0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcihpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgICAgbWVudVVJID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBMb2FkaW5nTWVzc2FnZSxcbiAgICAgICAgICBjb21tb25Qcm9wcyxcbiAgICAgICAgICBsb2FkaW5nTWVzc2FnZSh7IGlucHV0VmFsdWU6IGlucHV0VmFsdWUgfSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lbnVVSSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgTm9PcHRpb25zTWVzc2FnZSxcbiAgICAgICAgICBjb21tb25Qcm9wcyxcbiAgICAgICAgICBub09wdGlvbnNNZXNzYWdlKHsgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZSB9KVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWVudUVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbWVudVNob3VsZEJsb2NrU2Nyb2xsID8gUmVhY3QuY3JlYXRlRWxlbWVudChTY3JvbGxCbG9jaywgbnVsbCkgOiBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIE1lbnUsXG4gICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgICAgICBpbm5lclByb3BzOiB7XG4gICAgICAgICAgICAgIG9uTW91c2VEb3duOiB0aGlzLm9uTWVudU1vdXNlRG93bixcbiAgICAgICAgICAgICAgb25Nb3VzZU1vdmU6IHRoaXMub25NZW51TW91c2VNb3ZlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBpc0xvYWRpbmcsXG4gICAgICAgICAgICBtaW5NZW51SGVpZ2h0OiBtaW5NZW51SGVpZ2h0LFxuICAgICAgICAgICAgbWF4TWVudUhlaWdodDogbWF4TWVudUhlaWdodCxcbiAgICAgICAgICAgIG1lbnVQbGFjZW1lbnQ6IG1lbnVQbGFjZW1lbnQsXG4gICAgICAgICAgICBtZW51UG9zaXRpb246IG1lbnVQb3NpdGlvbixcbiAgICAgICAgICAgIG1lbnVTaG91bGRTY3JvbGxJbnRvVmlldzogbWVudVNob3VsZFNjcm9sbEludG9WaWV3XG4gICAgICAgICAgfSksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFNjcm9sbENhcHRvclN3aXRjaCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaXNFbmFibGVkOiBjYXB0dXJlTWVudVNjcm9sbCxcbiAgICAgICAgICAgICAgb25Ub3BBcnJpdmU6IG9uTWVudVNjcm9sbFRvVG9wLFxuICAgICAgICAgICAgICBvbkJvdHRvbUFycml2ZTogb25NZW51U2Nyb2xsVG9Cb3R0b21cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBNZW51TGlzdCxcbiAgICAgICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgICAgICAgICAgaW5uZXJQcm9wczoge1xuICAgICAgICAgICAgICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogaXNNdWx0aSxcbiAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmdldEVsZW1lbnRJZCgnbGlzdGJveCcpLFxuICAgICAgICAgICAgICAgICAgaW5uZXJSZWY6IHRoaXMub25NZW51UmVmLFxuICAgICAgICAgICAgICAgICAgcm9sZTogJ2xpc3Rib3gnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGlzTG9hZGluZyxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IG1heE1lbnVIZWlnaHRcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG1lbnVVSVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgLy8gcG9zaXRpb25pbmcgYmVoYXZpb3VyIGlzIGFsbW9zdCBpZGVudGljYWwgZm9yIHBvcnRhbGxlZCBhbmQgZml4ZWQsXG4gICAgICAvLyBzbyB3ZSB1c2UgdGhlIHNhbWUgY29tcG9uZW50LiB0aGUgYWN0dWFsIHBvcnRhbGxpbmcgbG9naWMgaXMgZm9ya2VkXG4gICAgICAvLyB3aXRoaW4gdGhlIGNvbXBvbmVudCBiYXNlZCBvbiBgbWVudVBvc2l0aW9uYFxuICAgICAgcmV0dXJuIG1lbnVQb3J0YWxUYXJnZXQgfHwgbWVudVBvc2l0aW9uID09PSAnZml4ZWQnID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgTWVudVBvcnRhbCxcbiAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgICAgYXBwZW5kVG86IG1lbnVQb3J0YWxUYXJnZXQsXG4gICAgICAgICAgY29udHJvbEVsZW1lbnQ6IHRoaXMuY29udHJvbFJlZixcbiAgICAgICAgICBtZW51UGxhY2VtZW50OiBtZW51UGxhY2VtZW50LFxuICAgICAgICAgIG1lbnVQb3NpdGlvbjogbWVudVBvc2l0aW9uXG4gICAgICAgIH0pLFxuICAgICAgICBtZW51RWxlbWVudFxuICAgICAgKSA6IG1lbnVFbGVtZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlckZvcm1GaWVsZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckZvcm1GaWVsZCgpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzOSA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgZGVsaW1pdGVyID0gX3Byb3BzOS5kZWxpbWl0ZXIsXG4gICAgICAgICAgaXNEaXNhYmxlZCA9IF9wcm9wczkuaXNEaXNhYmxlZCxcbiAgICAgICAgICBpc011bHRpID0gX3Byb3BzOS5pc011bHRpLFxuICAgICAgICAgIG5hbWUgPSBfcHJvcHM5Lm5hbWU7XG4gICAgICB2YXIgc2VsZWN0VmFsdWUgPSB0aGlzLnN0YXRlLnNlbGVjdFZhbHVlO1xuXG5cbiAgICAgIGlmICghbmFtZSB8fCBpc0Rpc2FibGVkKSByZXR1cm47XG5cbiAgICAgIGlmIChpc011bHRpKSB7XG4gICAgICAgIGlmIChkZWxpbWl0ZXIpIHtcbiAgICAgICAgICB2YXIgX3ZhbHVlID0gc2VsZWN0VmFsdWUubWFwKGZ1bmN0aW9uIChvcHQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczYuZ2V0T3B0aW9uVmFsdWUob3B0KTtcbiAgICAgICAgICB9KS5qb2luKGRlbGltaXRlcik7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBuYW1lOiBuYW1lLCB0eXBlOiAnaGlkZGVuJywgdmFsdWU6IF92YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHNlbGVjdFZhbHVlLm1hcChmdW5jdGlvbiAob3B0LCBpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdpLScgKyBpLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgdmFsdWU6IF90aGlzNi5nZXRPcHRpb25WYWx1ZShvcHQpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3ZhbHVlMiA9IHNlbGVjdFZhbHVlWzBdID8gdGhpcy5nZXRPcHRpb25WYWx1ZShzZWxlY3RWYWx1ZVswXSkgOiAnJztcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBuYW1lOiBuYW1lLCB0eXBlOiAnaGlkZGVuJywgdmFsdWU6IF92YWx1ZTIgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9jb21wb25lbnRzNCA9IHRoaXMuY29tcG9uZW50cyxcbiAgICAgICAgICBDb250cm9sID0gX2NvbXBvbmVudHM0LkNvbnRyb2wsXG4gICAgICAgICAgSW5kaWNhdG9yc0NvbnRhaW5lciA9IF9jb21wb25lbnRzNC5JbmRpY2F0b3JzQ29udGFpbmVyLFxuICAgICAgICAgIFNlbGVjdENvbnRhaW5lciA9IF9jb21wb25lbnRzNC5TZWxlY3RDb250YWluZXIsXG4gICAgICAgICAgVmFsdWVDb250YWluZXIgPSBfY29tcG9uZW50czQuVmFsdWVDb250YWluZXI7XG4gICAgICB2YXIgX3Byb3BzMTAgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF9wcm9wczEwLmNsYXNzTmFtZSxcbiAgICAgICAgICBpZCA9IF9wcm9wczEwLmlkLFxuICAgICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHMxMC5pc0Rpc2FibGVkO1xuICAgICAgdmFyIGlzRm9jdXNlZCA9IHRoaXMuc3RhdGUuaXNGb2N1c2VkO1xuXG5cbiAgICAgIHZhciBjb21tb25Qcm9wcyA9IHRoaXMuY29tbW9uUHJvcHMgPSB0aGlzLmdldENvbW1vblByb3BzKCk7XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBTZWxlY3RDb250YWluZXIsXG4gICAgICAgIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIGlubmVyUHJvcHM6IHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5vbktleURvd25cbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgICAgaXNGb2N1c2VkOiBpc0ZvY3VzZWRcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMucmVuZGVyU2NyZWVuUmVhZGVyU3RhdHVzKCksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgQ29udHJvbCxcbiAgICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHtcbiAgICAgICAgICAgIGlubmVyUHJvcHM6IHtcbiAgICAgICAgICAgICAgaW5uZXJSZWY6IHRoaXMub25Db250cm9sUmVmLFxuICAgICAgICAgICAgICBvbk1vdXNlRG93bjogdGhpcy5vbkNvbnRyb2xNb3VzZURvd24sXG4gICAgICAgICAgICAgIG9uVG91Y2hFbmQ6IHRoaXMub25Db250cm9sVG91Y2hFbmRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICAgICAgaXNGb2N1c2VkOiBpc0ZvY3VzZWRcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgVmFsdWVDb250YWluZXIsXG4gICAgICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHsgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCB9KSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUGxhY2Vob2xkZXJPclZhbHVlKCksXG4gICAgICAgICAgICB0aGlzLnJlbmRlcklucHV0KClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBJbmRpY2F0b3JzQ29udGFpbmVyLFxuICAgICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7IGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQgfSksXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNsZWFySW5kaWNhdG9yKCksXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxvYWRpbmdJbmRpY2F0b3IoKSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVySW5kaWNhdG9yU2VwYXJhdG9yKCksXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRyb3Bkb3duSW5kaWNhdG9yKClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHRoaXMucmVuZGVyTWVudSgpLFxuICAgICAgICB0aGlzLnJlbmRlckZvcm1GaWVsZCgpXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2VsZWN0O1xufShDb21wb25lbnQpO1xuXG5TZWxlY3QuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG52YXIgX2luaXRpYWxpc2VQcm9wcyA9IGZ1bmN0aW9uIF9pbml0aWFsaXNlUHJvcHMoKSB7XG4gIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gIHRoaXMuYmxvY2tPcHRpb25Ib3ZlciA9IGZhbHNlO1xuICB0aGlzLmNsZWFyRm9jdXNWYWx1ZU9uVXBkYXRlID0gZmFsc2U7XG4gIHRoaXMuaGFzR3JvdXBzID0gZmFsc2U7XG4gIHRoaXMuaW5zdGFuY2VQcmVmaXggPSAnJztcbiAgdGhpcy5pbml0aWFsVG91Y2hYID0gMDtcbiAgdGhpcy5pbml0aWFsVG91Y2hZID0gMDtcbiAgdGhpcy5vcGVuQWZ0ZXJGb2N1cyA9IGZhbHNlO1xuICB0aGlzLnNjcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gZmFsc2U7XG4gIHRoaXMuc3RhdGUgPSB7XG4gICAgZm9jdXNlZE9wdGlvbjogbnVsbCxcbiAgICBmb2N1c2VkVmFsdWU6IG51bGwsXG4gICAgaW5wdXRJc0hpZGRlbjogZmFsc2UsXG4gICAgaXNGb2N1c2VkOiBmYWxzZSxcbiAgICBtZW51T3B0aW9uczogeyByZW5kZXI6IFtdLCBmb2N1c2FibGU6IFtdIH0sXG4gICAgc2VsZWN0VmFsdWU6IFtdXG4gIH07XG5cbiAgdGhpcy5vbklucHV0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICAgIF90aGlzNy5pbnB1dCA9IHJlZjtcbiAgfTtcblxuICB0aGlzLm9uQ29udHJvbFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICBfdGhpczcuY29udHJvbFJlZiA9IHJlZjtcbiAgfTtcblxuICB0aGlzLm9uTWVudVJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICBfdGhpczcubWVudVJlZiA9IHJlZjtcbiAgfTtcblxuICB0aGlzLm9uRm9jdXNlZE9wdGlvblJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICBfdGhpczcuZm9jdXNlZE9wdGlvblJlZiA9IHJlZjtcbiAgfTtcblxuICB0aGlzLmZvY3VzID0gdGhpcy5mb2N1c0lucHV0O1xuICB0aGlzLmJsdXIgPSB0aGlzLmJsdXJJbnB1dDtcblxuICB0aGlzLnNldFZhbHVlID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ3NldC12YWx1ZSc7XG4gICAgdmFyIF9wcm9wczExID0gX3RoaXM3LnByb3BzLFxuICAgICAgICBjbG9zZU1lbnVPblNlbGVjdCA9IF9wcm9wczExLmNsb3NlTWVudU9uU2VsZWN0LFxuICAgICAgICBpc011bHRpID0gX3Byb3BzMTEuaXNNdWx0aSxcbiAgICAgICAgb25DaGFuZ2UgPSBfcHJvcHMxMS5vbkNoYW5nZTtcblxuICAgIF90aGlzNy5vbklucHV0Q2hhbmdlKCcnLCB7IGFjdGlvbjogJ3NldC12YWx1ZScgfSk7XG4gICAgaWYgKGNsb3NlTWVudU9uU2VsZWN0KSB7XG4gICAgICBfdGhpczcuaW5wdXRJc0hpZGRlbkFmdGVyVXBkYXRlID0gIWlzTXVsdGk7XG4gICAgICBfdGhpczcub25NZW51Q2xvc2UoKTtcbiAgICB9XG4gICAgLy8gd2hlbiB0aGUgc2VsZWN0IHZhbHVlIHNob3VsZCBjaGFuZ2UsIHdlIHNob3VsZCByZXNldCBmb2N1c2VkVmFsdWVcbiAgICBfdGhpczcuY2xlYXJGb2N1c1ZhbHVlT25VcGRhdGUgPSB0cnVlO1xuICAgIG9uQ2hhbmdlKG5ld1ZhbHVlLCB7IGFjdGlvbjogYWN0aW9uIH0pO1xuICB9O1xuXG4gIHRoaXMuc2VsZWN0T3B0aW9uID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgdmFyIF9wcm9wczEyID0gX3RoaXM3LnByb3BzLFxuICAgICAgICBibHVySW5wdXRPblNlbGVjdCA9IF9wcm9wczEyLmJsdXJJbnB1dE9uU2VsZWN0LFxuICAgICAgICBpc011bHRpID0gX3Byb3BzMTIuaXNNdWx0aTtcblxuXG4gICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgIHZhciBfc2VsZWN0VmFsdWUzID0gX3RoaXM3LnN0YXRlLnNlbGVjdFZhbHVlO1xuXG4gICAgICBpZiAoX3RoaXM3LmlzT3B0aW9uU2VsZWN0ZWQobmV3VmFsdWUsIF9zZWxlY3RWYWx1ZTMpKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSBfdGhpczcuZ2V0T3B0aW9uVmFsdWUobmV3VmFsdWUpO1xuICAgICAgICBfdGhpczcuc2V0VmFsdWUoX3NlbGVjdFZhbHVlMy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM3LmdldE9wdGlvblZhbHVlKGkpICE9PSBjYW5kaWRhdGU7XG4gICAgICAgIH0pLCAnZGVzZWxlY3Qtb3B0aW9uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczcuc2V0VmFsdWUoW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KF9zZWxlY3RWYWx1ZTMpLCBbbmV3VmFsdWVdKSwgJ3NlbGVjdC1vcHRpb24nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXM3LnNldFZhbHVlKG5ld1ZhbHVlLCAnc2VsZWN0LW9wdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChibHVySW5wdXRPblNlbGVjdCkge1xuICAgICAgX3RoaXM3LmJsdXJJbnB1dCgpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnJlbW92ZVZhbHVlID0gZnVuY3Rpb24gKHJlbW92ZWRWYWx1ZSkge1xuICAgIHZhciBvbkNoYW5nZSA9IF90aGlzNy5wcm9wcy5vbkNoYW5nZTtcbiAgICB2YXIgc2VsZWN0VmFsdWUgPSBfdGhpczcuc3RhdGUuc2VsZWN0VmFsdWU7XG5cbiAgICB2YXIgY2FuZGlkYXRlID0gX3RoaXM3LmdldE9wdGlvblZhbHVlKHJlbW92ZWRWYWx1ZSk7XG4gICAgb25DaGFuZ2Uoc2VsZWN0VmFsdWUuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gX3RoaXM3LmdldE9wdGlvblZhbHVlKGkpICE9PSBjYW5kaWRhdGU7XG4gICAgfSksIHtcbiAgICAgIGFjdGlvbjogJ3JlbW92ZS12YWx1ZScsXG4gICAgICByZW1vdmVkVmFsdWU6IHJlbW92ZWRWYWx1ZVxuICAgIH0pO1xuICAgIF90aGlzNy5mb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgdGhpcy5jbGVhclZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfcHJvcHMxMyA9IF90aGlzNy5wcm9wcyxcbiAgICAgICAgaXNNdWx0aSA9IF9wcm9wczEzLmlzTXVsdGksXG4gICAgICAgIG9uQ2hhbmdlID0gX3Byb3BzMTMub25DaGFuZ2U7XG5cbiAgICBvbkNoYW5nZShpc011bHRpID8gW10gOiBudWxsLCB7IGFjdGlvbjogJ2NsZWFyJyB9KTtcbiAgfTtcblxuICB0aGlzLnBvcFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvbkNoYW5nZSA9IF90aGlzNy5wcm9wcy5vbkNoYW5nZTtcbiAgICB2YXIgc2VsZWN0VmFsdWUgPSBfdGhpczcuc3RhdGUuc2VsZWN0VmFsdWU7XG5cbiAgICBvbkNoYW5nZShzZWxlY3RWYWx1ZS5zbGljZSgwLCBzZWxlY3RWYWx1ZS5sZW5ndGggLSAxKSwge1xuICAgICAgYWN0aW9uOiAncG9wLXZhbHVlJyxcbiAgICAgIHJlbW92ZWRWYWx1ZTogc2VsZWN0VmFsdWVbc2VsZWN0VmFsdWUubGVuZ3RoIC0gMV1cbiAgICB9KTtcbiAgfTtcblxuICB0aGlzLmdldFN0eWxlcyA9IGZ1bmN0aW9uIChrZXksIHByb3BzKSB7XG4gICAgdmFyIGJhc2UgPSBkZWZhdWx0U3R5bGVzW2tleV0ocHJvcHMpO1xuICAgIGJhc2UuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICAgIHZhciBjdXN0b20gPSBfdGhpczcucHJvcHMuc3R5bGVzW2tleV07XG4gICAgcmV0dXJuIGN1c3RvbSA/IGN1c3RvbShiYXNlLCBwcm9wcykgOiBiYXNlO1xuICB9O1xuXG4gIHRoaXMuZ2V0RWxlbWVudElkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gX3RoaXM3Lmluc3RhbmNlUHJlZml4ICsgJy0nICsgZWxlbWVudDtcbiAgfTtcblxuICB0aGlzLmdldEFjdGl2ZURlc2NlbmRlbnRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWVudUlzT3BlbiA9IF90aGlzNy5wcm9wcy5tZW51SXNPcGVuO1xuICAgIHZhciBfc3RhdGU3ID0gX3RoaXM3LnN0YXRlLFxuICAgICAgICBtZW51T3B0aW9ucyA9IF9zdGF0ZTcubWVudU9wdGlvbnMsXG4gICAgICAgIGZvY3VzZWRPcHRpb24gPSBfc3RhdGU3LmZvY3VzZWRPcHRpb247XG5cblxuICAgIGlmICghZm9jdXNlZE9wdGlvbiB8fCAhbWVudUlzT3BlbikgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHZhciBpbmRleCA9IG1lbnVPcHRpb25zLmZvY3VzYWJsZS5pbmRleE9mKGZvY3VzZWRPcHRpb24pO1xuICAgIHZhciBvcHRpb24gPSBtZW51T3B0aW9ucy5yZW5kZXJbaW5kZXhdO1xuXG4gICAgcmV0dXJuIG9wdGlvbiAmJiBvcHRpb24ua2V5O1xuICB9O1xuXG4gIHRoaXMub25NZW51TW91c2VEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIF90aGlzNy5mb2N1c0lucHV0KCk7XG4gIH07XG5cbiAgdGhpcy5vbk1lbnVNb3VzZU1vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBfdGhpczcuYmxvY2tPcHRpb25Ib3ZlciA9IGZhbHNlO1xuICB9O1xuXG4gIHRoaXMub25Db250cm9sTW91c2VEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIG9wZW5NZW51T25DbGljayA9IF90aGlzNy5wcm9wcy5vcGVuTWVudU9uQ2xpY2s7XG5cbiAgICBpZiAoIV90aGlzNy5zdGF0ZS5pc0ZvY3VzZWQpIHtcbiAgICAgIGlmIChvcGVuTWVudU9uQ2xpY2spIHtcbiAgICAgICAgX3RoaXM3Lm9wZW5BZnRlckZvY3VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIF90aGlzNy5mb2N1c0lucHV0KCk7XG4gICAgfSBlbHNlIGlmICghX3RoaXM3LnByb3BzLm1lbnVJc09wZW4pIHtcbiAgICAgIF90aGlzNy5vcGVuTWVudSgnZmlyc3QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXM3Lm9uTWVudUNsb3NlKCk7XG4gICAgfVxuICAgIC8vICRGbG93Rml4TWUgSFRNTEVsZW1lbnQgdHlwZSBkb2VzIG5vdCBoYXZlIHRhZ05hbWUgcHJvcGVydHlcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMub25Ecm9wZG93bkluZGljYXRvck1vdXNlRG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIGlnbm9yZSBtb3VzZSBldmVudHMgdGhhdCB3ZXJlbid0IHRyaWdnZXJlZCBieSB0aGUgcHJpbWFyeSBidXR0b25cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfdGhpczcucHJvcHMuaXNEaXNhYmxlZCkgcmV0dXJuO1xuICAgIHZhciBfcHJvcHMxNCA9IF90aGlzNy5wcm9wcyxcbiAgICAgICAgaXNNdWx0aSA9IF9wcm9wczE0LmlzTXVsdGksXG4gICAgICAgIG1lbnVJc09wZW4gPSBfcHJvcHMxNC5tZW51SXNPcGVuO1xuXG4gICAgX3RoaXM3LmZvY3VzSW5wdXQoKTtcbiAgICBpZiAobWVudUlzT3Blbikge1xuICAgICAgX3RoaXM3LmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZSA9ICFpc011bHRpO1xuICAgICAgX3RoaXM3Lm9uTWVudUNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF90aGlzNy5vcGVuTWVudSgnZmlyc3QnKTtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICB0aGlzLm9uQ2xlYXJJbmRpY2F0b3JNb3VzZURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBpZ25vcmUgbW91c2UgZXZlbnRzIHRoYXQgd2VyZW4ndCB0cmlnZ2VyZWQgYnkgdGhlIHByaW1hcnkgYnV0dG9uXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfdGhpczcuY2xlYXJWYWx1ZSgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIF90aGlzNy5vcGVuQWZ0ZXJGb2N1cyA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzNy5mb2N1c0lucHV0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgX3JlZjIkdG91Y2hlcyA9IHNsaWNlZFRvQXJyYXkoX3JlZjIudG91Y2hlcywgMSksXG4gICAgICAgIHRvdWNoID0gX3JlZjIkdG91Y2hlc1swXTtcblxuICAgIF90aGlzNy5pbml0aWFsVG91Y2hYID0gdG91Y2guY2xpZW50WDtcbiAgICBfdGhpczcuaW5pdGlhbFRvdWNoWSA9IHRvdWNoLmNsaWVudFk7XG4gICAgX3RoaXM3LnVzZXJJc0RyYWdnaW5nID0gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5vblRvdWNoTW92ZSA9IGZ1bmN0aW9uIChfcmVmMykge1xuICAgIHZhciBfcmVmMyR0b3VjaGVzID0gc2xpY2VkVG9BcnJheShfcmVmMy50b3VjaGVzLCAxKSxcbiAgICAgICAgdG91Y2ggPSBfcmVmMyR0b3VjaGVzWzBdO1xuXG4gICAgdmFyIGRlbHRhWCA9IE1hdGguYWJzKHRvdWNoLmNsaWVudFggLSBfdGhpczcuaW5pdGlhbFRvdWNoWCk7XG4gICAgdmFyIGRlbHRhWSA9IE1hdGguYWJzKHRvdWNoLmNsaWVudFkgLSBfdGhpczcuaW5pdGlhbFRvdWNoWSk7XG4gICAgdmFyIG1vdmVUaHJlc2hvbGQgPSA1O1xuXG4gICAgX3RoaXM3LnVzZXJJc0RyYWdnaW5nID0gZGVsdGFYID4gbW92ZVRocmVzaG9sZCB8fCBkZWx0YVkgPiBtb3ZlVGhyZXNob2xkO1xuICB9O1xuXG4gIHRoaXMub25Ub3VjaEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChfdGhpczcudXNlcklzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgIC8vIGNsb3NlIHRoZSBtZW51IGlmIHRoZSB1c2VyIHRhcHMgb3V0c2lkZVxuICAgIGlmIChfdGhpczcuY29udHJvbFJlZiAmJiAhX3RoaXM3LmNvbnRyb2xSZWYuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiBfdGhpczcubWVudVJlZiAmJiAhX3RoaXM3Lm1lbnVSZWYuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgX3RoaXM3LmJsdXJJbnB1dCgpO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IG1vdmUgdmFyc1xuICAgIF90aGlzNy5pbml0aWFsVG91Y2hYID0gMDtcbiAgICBfdGhpczcuaW5pdGlhbFRvdWNoWSA9IDA7XG4gIH07XG5cbiAgdGhpcy5vbkNvbnRyb2xUb3VjaEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChfdGhpczcudXNlcklzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgIF90aGlzNy5vbkNvbnRyb2xNb3VzZURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHRoaXMub25DbGVhckluZGljYXRvclRvdWNoRW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKF90aGlzNy51c2VySXNEcmFnZ2luZykgcmV0dXJuO1xuXG4gICAgX3RoaXM3Lm9uQ2xlYXJJbmRpY2F0b3JNb3VzZURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHRoaXMub25Ecm9wZG93bkluZGljYXRvclRvdWNoRW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKF90aGlzNy51c2VySXNEcmFnZ2luZykgcmV0dXJuO1xuXG4gICAgX3RoaXM3Lm9uRHJvcGRvd25JbmRpY2F0b3JNb3VzZURvd24oZXZlbnQpO1xuICB9O1xuXG4gIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgaW5wdXRWYWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgX3RoaXM3LmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZSA9IGZhbHNlO1xuICAgIF90aGlzNy5vbklucHV0Q2hhbmdlKGlucHV0VmFsdWUsIHsgYWN0aW9uOiAnaW5wdXQtY2hhbmdlJyB9KTtcbiAgICBfdGhpczcub25NZW51T3BlbigpO1xuICB9O1xuXG4gIHRoaXMub25JbnB1dEZvY3VzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKF90aGlzNy5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICBfdGhpczcucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgfVxuICAgIF90aGlzNy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGUgPSBmYWxzZTtcbiAgICBfdGhpczcuc2V0U3RhdGUoe1xuICAgICAgaXNGb2N1c2VkOiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKF90aGlzNy5vcGVuQWZ0ZXJGb2N1cyB8fCBfdGhpczcucHJvcHMub3Blbk1lbnVPbkZvY3VzKSB7XG4gICAgICBfdGhpczcub3Blbk1lbnUoJ2ZpcnN0Jyk7XG4gICAgfVxuICAgIF90aGlzNy5vcGVuQWZ0ZXJGb2N1cyA9IGZhbHNlO1xuICB9O1xuXG4gIHRoaXMub25JbnB1dEJsdXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoX3RoaXM3LnByb3BzLm9uQmx1cikge1xuICAgICAgX3RoaXM3LnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgfVxuICAgIF90aGlzNy5vbklucHV0Q2hhbmdlKCcnLCB7IGFjdGlvbjogJ2lucHV0LWJsdXInIH0pO1xuICAgIF90aGlzNy5vbk1lbnVDbG9zZSgpO1xuICAgIF90aGlzNy5zZXRTdGF0ZSh7XG4gICAgICBmb2N1c2VkVmFsdWU6IG51bGwsXG4gICAgICBpc0ZvY3VzZWQ6IGZhbHNlXG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5vbk9wdGlvbkhvdmVyID0gZnVuY3Rpb24gKGZvY3VzZWRPcHRpb24pIHtcbiAgICBpZiAoX3RoaXM3LmJsb2NrT3B0aW9uSG92ZXIgfHwgX3RoaXM3LnN0YXRlLmZvY3VzZWRPcHRpb24gPT09IGZvY3VzZWRPcHRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgX3RoaXM3LnNldFN0YXRlKHsgZm9jdXNlZE9wdGlvbjogZm9jdXNlZE9wdGlvbiB9KTtcbiAgfTtcblxuICB0aGlzLm9uS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBfcHJvcHMxNSA9IF90aGlzNy5wcm9wcyxcbiAgICAgICAgaXNNdWx0aSA9IF9wcm9wczE1LmlzTXVsdGksXG4gICAgICAgIGJhY2tzcGFjZVJlbW92ZXNWYWx1ZSA9IF9wcm9wczE1LmJhY2tzcGFjZVJlbW92ZXNWYWx1ZSxcbiAgICAgICAgZXNjYXBlQ2xlYXJzVmFsdWUgPSBfcHJvcHMxNS5lc2NhcGVDbGVhcnNWYWx1ZSxcbiAgICAgICAgaW5wdXRWYWx1ZSA9IF9wcm9wczE1LmlucHV0VmFsdWUsXG4gICAgICAgIGlzQ2xlYXJhYmxlID0gX3Byb3BzMTUuaXNDbGVhcmFibGUsXG4gICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHMxNS5pc0Rpc2FibGVkLFxuICAgICAgICBtZW51SXNPcGVuID0gX3Byb3BzMTUubWVudUlzT3BlbixcbiAgICAgICAgb25LZXlEb3duID0gX3Byb3BzMTUub25LZXlEb3duLFxuICAgICAgICB0YWJTZWxlY3RzVmFsdWUgPSBfcHJvcHMxNS50YWJTZWxlY3RzVmFsdWUsXG4gICAgICAgIG9wZW5NZW51T25Gb2N1cyA9IF9wcm9wczE1Lm9wZW5NZW51T25Gb2N1cztcbiAgICB2YXIgX3N0YXRlOCA9IF90aGlzNy5zdGF0ZSxcbiAgICAgICAgZm9jdXNlZE9wdGlvbiA9IF9zdGF0ZTguZm9jdXNlZE9wdGlvbixcbiAgICAgICAgZm9jdXNlZFZhbHVlID0gX3N0YXRlOC5mb2N1c2VkVmFsdWUsXG4gICAgICAgIHNlbGVjdFZhbHVlID0gX3N0YXRlOC5zZWxlY3RWYWx1ZTtcblxuXG4gICAgaWYgKGlzRGlzYWJsZWQpIHJldHVybjtcblxuICAgIGlmICh0eXBlb2Ygb25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvbktleURvd24oZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJsb2NrIG9wdGlvbiBob3ZlciBldmVudHMgd2hlbiB0aGUgdXNlciBoYXMganVzdCBwcmVzc2VkIGEga2V5XG4gICAgX3RoaXM3LmJsb2NrT3B0aW9uSG92ZXIgPSB0cnVlO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICBpZiAoIWlzTXVsdGkgfHwgaW5wdXRWYWx1ZSkgcmV0dXJuO1xuICAgICAgICBfdGhpczcuZm9jdXNWYWx1ZSgncHJldmlvdXMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgaWYgKCFpc011bHRpIHx8IGlucHV0VmFsdWUpIHJldHVybjtcbiAgICAgICAgX3RoaXM3LmZvY3VzVmFsdWUoJ25leHQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICBpZiAoaW5wdXRWYWx1ZSkgcmV0dXJuO1xuICAgICAgICBpZiAoZm9jdXNlZFZhbHVlKSB7XG4gICAgICAgICAgX3RoaXM3LnJlbW92ZVZhbHVlKGZvY3VzZWRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFiYWNrc3BhY2VSZW1vdmVzVmFsdWUpIHJldHVybjtcbiAgICAgICAgICBfdGhpczcucG9wVmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSB8fCAhbWVudUlzT3BlbiB8fCAhdGFiU2VsZWN0c1ZhbHVlIHx8ICFmb2N1c2VkT3B0aW9uIHx8XG4gICAgICAgIC8vIGRvbid0IGNhcHR1cmUgdGhlIGV2ZW50IGlmIHRoZSBtZW51IG9wZW5zIG9uIGZvY3VzIGFuZCB0aGUgZm9jdXNlZFxuICAgICAgICAvLyBvcHRpb24gaXMgYWxyZWFkeSBzZWxlY3RlZDsgaXQgYnJlYWtzIHRoZSBmbG93IG9mIG5hdmlnYXRpb25cbiAgICAgICAgb3Blbk1lbnVPbkZvY3VzICYmIF90aGlzNy5pc09wdGlvblNlbGVjdGVkKGZvY3VzZWRPcHRpb24sIHNlbGVjdFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfdGhpczcuc2VsZWN0T3B0aW9uKGZvY3VzZWRPcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgaWYgKG1lbnVJc09wZW4pIHtcbiAgICAgICAgICBpZiAoIWZvY3VzZWRPcHRpb24pIHJldHVybjtcbiAgICAgICAgICBfdGhpczcuc2VsZWN0T3B0aW9uKGZvY3VzZWRPcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzNy5mb2N1c09wdGlvbignZmlyc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIGlmIChtZW51SXNPcGVuKSB7XG4gICAgICAgICAgX3RoaXM3LmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgIF90aGlzNy5vbklucHV0Q2hhbmdlKCcnLCB7IGFjdGlvbjogJ21lbnUtY2xvc2UnIH0pO1xuICAgICAgICAgIF90aGlzNy5vbk1lbnVDbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQ2xlYXJhYmxlICYmIGVzY2FwZUNsZWFyc1ZhbHVlKSB7XG4gICAgICAgICAgX3RoaXM3LmNsZWFyVmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyAnOlxuICAgICAgICAvLyBzcGFjZVxuICAgICAgICBpZiAoaW5wdXRWYWx1ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lbnVJc09wZW4pIHtcbiAgICAgICAgICBfdGhpczcub3Blbk1lbnUoJ2ZpcnN0Jyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb2N1c2VkT3B0aW9uKSByZXR1cm47XG4gICAgICAgIF90aGlzNy5zZWxlY3RPcHRpb24oZm9jdXNlZE9wdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGlmIChtZW51SXNPcGVuKSB7XG4gICAgICAgICAgX3RoaXM3LmZvY3VzT3B0aW9uKCd1cCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzNy5vcGVuTWVudSgnbGFzdCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgaWYgKG1lbnVJc09wZW4pIHtcbiAgICAgICAgICBfdGhpczcuZm9jdXNPcHRpb24oJ2Rvd24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczcub3Blbk1lbnUoJ2ZpcnN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICBpZiAoIW1lbnVJc09wZW4pIHJldHVybjtcbiAgICAgICAgX3RoaXM3LmZvY3VzT3B0aW9uKCdwYWdldXAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgIGlmICghbWVudUlzT3BlbikgcmV0dXJuO1xuICAgICAgICBfdGhpczcuZm9jdXNPcHRpb24oJ3BhZ2Vkb3duJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgIGlmICghbWVudUlzT3BlbikgcmV0dXJuO1xuICAgICAgICBfdGhpczcuZm9jdXNPcHRpb24oJ2ZpcnN0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgaWYgKCFtZW51SXNPcGVuKSByZXR1cm47XG4gICAgICAgIF90aGlzNy5mb2N1c09wdGlvbignbGFzdCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfTtcbn07XG5cbnZhciBtYW5hZ2VTdGF0ZSA9IGZ1bmN0aW9uIG1hbmFnZVN0YXRlKFNlbGVjdENvbXBvbmVudCkge1xuICB2YXIgX2NsYXNzLCBfdGVtcDI7XG5cbiAgcmV0dXJuIF90ZW1wMiA9IF9jbGFzcyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoU3RhdGVNYW5hZ2VyLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFN0YXRlTWFuYWdlcigpIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0ZU1hbmFnZXIpO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9yZWYgPSBTdGF0ZU1hbmFnZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTdGF0ZU1hbmFnZXIpKS5jYWxsLmFwcGx5KF9yZWYsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgaW5wdXRWYWx1ZTogX3RoaXMucHJvcHMuaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkID8gX3RoaXMucHJvcHMuaW5wdXRWYWx1ZSA6IF90aGlzLnByb3BzLmRlZmF1bHRJbnB1dFZhbHVlLFxuICAgICAgICBtZW51SXNPcGVuOiBfdGhpcy5wcm9wcy5tZW51SXNPcGVuICE9PSB1bmRlZmluZWQgPyBfdGhpcy5wcm9wcy5tZW51SXNPcGVuIDogX3RoaXMucHJvcHMuZGVmYXVsdE1lbnVJc09wZW4sXG4gICAgICAgIHZhbHVlOiBfdGhpcy5wcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkID8gX3RoaXMucHJvcHMudmFsdWUgOiBfdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWVcbiAgICAgIH0sIF90aGlzLm9uQ2hhbmdlID0gZnVuY3Rpb24gKHZhbHVlLCBhY3Rpb25NZXRhKSB7XG4gICAgICAgIF90aGlzLmNhbGxQcm9wKCdvbkNoYW5nZScsIHZhbHVlLCBhY3Rpb25NZXRhKTtcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICB9LCBfdGhpcy5vbklucHV0Q2hhbmdlID0gZnVuY3Rpb24gKHZhbHVlLCBhY3Rpb25NZXRhKSB7XG4gICAgICAgIC8vIFRPRE86IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgd2UgYWxsb3cgdGhlIHByb3AgdG8gcmV0dXJuIGEgbmV3XG4gICAgICAgIC8vIHZhbHVlLCBidXQgbm93IGlucHV0VmFsdWUgaXMgYSBjb250cm9sbGFibGUgcHJvcCB3ZSBwcm9iYWJseSBzaG91bGRuJ3RcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gX3RoaXMuY2FsbFByb3AoJ29uSW5wdXRDaGFuZ2UnLCB2YWx1ZSwgYWN0aW9uTWV0YSk7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBpbnB1dFZhbHVlOiBuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkID8gbmV3VmFsdWUgOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH0sIF90aGlzLm9uTWVudU9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLmNhbGxQcm9wKCdvbk1lbnVPcGVuJyk7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgbWVudUlzT3BlbjogdHJ1ZSB9KTtcbiAgICAgIH0sIF90aGlzLm9uTWVudUNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5jYWxsUHJvcCgnb25NZW51Q2xvc2UnKTtcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBtZW51SXNPcGVuOiBmYWxzZSB9KTtcbiAgICAgIH0sIF90ZW1wKSwgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2xhc3MoU3RhdGVNYW5hZ2VyLCBbe1xuICAgICAga2V5OiAnZm9jdXMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgICB0aGlzLnNlbGVjdC5mb2N1cygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2JsdXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmJsdXIoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdnZXRQcm9wJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQcm9wKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wc1trZXldICE9PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzW2tleV0gOiB0aGlzLnN0YXRlW2tleV07XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2FsbFByb3AnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNhbGxQcm9wKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzW25hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFyIF9wcm9wcztcblxuICAgICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIChfcHJvcHMgPSB0aGlzLnByb3BzKVtuYW1lXS5hcHBseShfcHJvcHMsIHRvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RDb21wb25lbnQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgICAgcmVmOiBmdW5jdGlvbiByZWYoX3JlZjIpIHtcbiAgICAgICAgICAgIF90aGlzMi5zZWxlY3QgPSBfcmVmMjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlucHV0VmFsdWU6IHRoaXMuZ2V0UHJvcCgnaW5wdXRWYWx1ZScpLFxuICAgICAgICAgIG1lbnVJc09wZW46IHRoaXMuZ2V0UHJvcCgnbWVudUlzT3BlbicpLFxuICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLFxuICAgICAgICAgIG9uSW5wdXRDaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcbiAgICAgICAgICBvbk1lbnVDbG9zZTogdGhpcy5vbk1lbnVDbG9zZSxcbiAgICAgICAgICBvbk1lbnVPcGVuOiB0aGlzLm9uTWVudU9wZW4sXG4gICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0UHJvcCgndmFsdWUnKVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBTdGF0ZU1hbmFnZXI7XG4gIH0oQ29tcG9uZW50KSwgX2NsYXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkZWZhdWx0SW5wdXRWYWx1ZTogJycsXG4gICAgZGVmYXVsdE1lbnVJc09wZW46IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogbnVsbFxuICB9LCBfdGVtcDI7XG59O1xuXG52YXIgZGVmYXVsdFByb3BzJDEgPSB7XG4gIGNhY2hlT3B0aW9uczogZmFsc2UsXG4gIGRlZmF1bHRPcHRpb25zOiBmYWxzZVxufTtcblxudmFyIG1ha2VBc3luY1NlbGVjdCA9IGZ1bmN0aW9uIG1ha2VBc3luY1NlbGVjdChTZWxlY3RDb21wb25lbnQpIHtcbiAgdmFyIF9jbGFzcywgX3RlbXA7XG5cbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBpbmhlcml0cyhBc3luYywgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBBc3luYyhwcm9wcykge1xuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQXN5bmMpO1xuXG4gICAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChBc3luYy5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFzeW5jKSkuY2FsbCh0aGlzKSk7XG5cbiAgICAgIF90aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICAgIF90aGlzLm9wdGlvbnNDYWNoZSA9IHt9O1xuXG4gICAgICBfdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSwgYWN0aW9uTWV0YSkge1xuICAgICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGNhY2hlT3B0aW9ucyA9IF90aGlzJHByb3BzLmNhY2hlT3B0aW9ucyxcbiAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2UgPSBfdGhpcyRwcm9wcy5vbklucHV0Q2hhbmdlO1xuICAgICAgICAvLyBUT0RPXG5cbiAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBoYW5kbGVJbnB1dENoYW5nZShuZXdWYWx1ZSwgYWN0aW9uTWV0YSwgb25JbnB1dENoYW5nZSk7XG4gICAgICAgIGlmICghaW5wdXRWYWx1ZSkge1xuICAgICAgICAgIGRlbGV0ZSBfdGhpcy5sYXN0UmVxdWVzdDtcbiAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpbnB1dFZhbHVlOiAnJyxcbiAgICAgICAgICAgIGxvYWRlZElucHV0VmFsdWU6ICcnLFxuICAgICAgICAgICAgbG9hZGVkT3B0aW9uczogW10sXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcGFzc0VtcHR5T3B0aW9uczogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlT3B0aW9ucyAmJiBfdGhpcy5vcHRpb25zQ2FjaGVbaW5wdXRWYWx1ZV0pIHtcbiAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgICAgICAgbG9hZGVkSW5wdXRWYWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGxvYWRlZE9wdGlvbnM6IF90aGlzLm9wdGlvbnNDYWNoZVtpbnB1dFZhbHVlXSxcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBwYXNzRW1wdHlPcHRpb25zOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciByZXF1ZXN0ID0gX3RoaXMubGFzdFJlcXVlc3QgPSB7fTtcbiAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgcGFzc0VtcHR5T3B0aW9uczogIV90aGlzLnN0YXRlLmxvYWRlZElucHV0VmFsdWVcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkT3B0aW9ucyhpbnB1dFZhbHVlLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgICBpZiAoIV90aGlzLm1vdW50ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRpb25zQ2FjaGVbaW5wdXRWYWx1ZV0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXF1ZXN0ICE9PSBfdGhpcy5sYXN0UmVxdWVzdCkgcmV0dXJuO1xuICAgICAgICAgICAgICBkZWxldGUgX3RoaXMubGFzdFJlcXVlc3Q7XG4gICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxvYWRlZElucHV0VmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICAgICAgICAgICAgbG9hZGVkT3B0aW9uczogb3B0aW9ucyB8fCBbXSxcbiAgICAgICAgICAgICAgICBwYXNzRW1wdHlPcHRpb25zOiBmYWxzZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dFZhbHVlO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiBBcnJheS5pc0FycmF5KHByb3BzLmRlZmF1bHRPcHRpb25zKSA/IHByb3BzLmRlZmF1bHRPcHRpb25zIDogdW5kZWZpbmVkLFxuICAgICAgICBpbnB1dFZhbHVlOiAnJyxcbiAgICAgICAgaXNMb2FkaW5nOiBwcm9wcy5kZWZhdWx0T3B0aW9ucyA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgbG9hZGVkT3B0aW9uczogW10sXG4gICAgICAgIHBhc3NFbXB0eU9wdGlvbnM6IGZhbHNlXG4gICAgICB9O1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIGNyZWF0ZUNsYXNzKEFzeW5jLCBbe1xuICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB0aGlzLm1vdW50ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB0aGlzLnByb3BzLmRlZmF1bHRPcHRpb25zO1xuXG4gICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMubG9hZE9wdGlvbnMoJycsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzMi5tb3VudGVkKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgaXNMb2FkaW5nID0gISFfdGhpczIubGFzdFJlcXVlc3Q7XG4gICAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoeyBkZWZhdWx0T3B0aW9uczogb3B0aW9ucyB8fCBbXSwgaXNMb2FkaW5nOiBpc0xvYWRpbmcgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAvLyBpZiB0aGUgY2FjaGVPcHRpb25zIHByb3AgY2hhbmdlcywgY2xlYXIgdGhlIGNhY2hlXG4gICAgICAgIGlmIChuZXh0UHJvcHMuY2FjaGVPcHRpb25zICE9PSB0aGlzLnByb3BzLmNhY2hlT3B0aW9ucykge1xuICAgICAgICAgIHRoaXMub3B0aW9uc0NhY2hlID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2ZvY3VzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdibHVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgICB0aGlzLnNlbGVjdC5ibHVyKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbG9hZE9wdGlvbnMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRPcHRpb25zKGlucHV0VmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsb2FkT3B0aW9ucyA9IHRoaXMucHJvcHMubG9hZE9wdGlvbnM7XG5cbiAgICAgICAgaWYgKCFsb2FkT3B0aW9ucykgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIHZhciBsb2FkZXIgPSBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlLCBjYWxsYmFjayk7XG4gICAgICAgIGlmIChsb2FkZXIgJiYgdHlwZW9mIGxvYWRlci50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbG9hZGVyLnRoZW4oY2FsbGJhY2ssIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgICAgbG9hZE9wdGlvbnMgPSBfcHJvcHMubG9hZE9wdGlvbnMsXG4gICAgICAgICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydsb2FkT3B0aW9ucyddKTtcbiAgICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IF9zdGF0ZS5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIGlucHV0VmFsdWUgPSBfc3RhdGUuaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGlzTG9hZGluZyA9IF9zdGF0ZS5pc0xvYWRpbmcsXG4gICAgICAgICAgICBsb2FkZWRJbnB1dFZhbHVlID0gX3N0YXRlLmxvYWRlZElucHV0VmFsdWUsXG4gICAgICAgICAgICBsb2FkZWRPcHRpb25zID0gX3N0YXRlLmxvYWRlZE9wdGlvbnMsXG4gICAgICAgICAgICBwYXNzRW1wdHlPcHRpb25zID0gX3N0YXRlLnBhc3NFbXB0eU9wdGlvbnM7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBwYXNzRW1wdHlPcHRpb25zID8gW10gOiBpbnB1dFZhbHVlICYmIGxvYWRlZElucHV0VmFsdWUgPyBsb2FkZWRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMgfHwgW107XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgLy8gJEZsb3dGaXhNZVxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0Q29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICAgICAgICAgIHJlZjogZnVuY3Rpb24gcmVmKF9yZWYpIHtcbiAgICAgICAgICAgICAgX3RoaXMzLnNlbGVjdCA9IF9yZWY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIGZpbHRlck9wdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGlzTG9hZGluZzogaXNMb2FkaW5nLFxuICAgICAgICAgICAgb25JbnB1dENoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZVxuICAgICAgICAgIH0pKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gQXN5bmM7XG4gIH0oQ29tcG9uZW50KSwgX2NsYXNzLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcyQxLCBfdGVtcDtcbn07XG52YXIgQXN5bmMgPSBtYWtlQXN5bmNTZWxlY3QobWFuYWdlU3RhdGUoU2VsZWN0KSk7XG5cbnZhciBjb21wYXJlT3B0aW9uID0gZnVuY3Rpb24gY29tcGFyZU9wdGlvbihpbnB1dFZhbHVlLCBvcHRpb24pIHtcbiAgdmFyIGNhbmRpZGF0ZSA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIG9wdGlvbi52YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBjYW5kaWRhdGUgfHwgb3B0aW9uLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09IGNhbmRpZGF0ZTtcbn07XG5cbnZhciBidWlsdGlucyA9IHtcbiAgZm9ybWF0Q3JlYXRlTGFiZWw6IGZ1bmN0aW9uIGZvcm1hdENyZWF0ZUxhYmVsKGlucHV0VmFsdWUpIHtcbiAgICByZXR1cm4gJ0NyZWF0ZSBcIicgKyBpbnB1dFZhbHVlICsgJ1wiJztcbiAgfSxcbiAgaXNWYWxpZE5ld09wdGlvbjogZnVuY3Rpb24gaXNWYWxpZE5ld09wdGlvbihpbnB1dFZhbHVlLCBzZWxlY3RWYWx1ZSwgc2VsZWN0T3B0aW9ucykge1xuICAgIHJldHVybiAhKCFpbnB1dFZhbHVlIHx8IHNlbGVjdFZhbHVlLnNvbWUoZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGNvbXBhcmVPcHRpb24oaW5wdXRWYWx1ZSwgb3B0aW9uKTtcbiAgICB9KSB8fCBzZWxlY3RPcHRpb25zLnNvbWUoZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgcmV0dXJuIGNvbXBhcmVPcHRpb24oaW5wdXRWYWx1ZSwgb3B0aW9uKTtcbiAgICB9KSk7XG4gIH0sXG4gIGdldE5ld09wdGlvbkRhdGE6IGZ1bmN0aW9uIGdldE5ld09wdGlvbkRhdGEoaW5wdXRWYWx1ZSwgb3B0aW9uTGFiZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IG9wdGlvbkxhYmVsLFxuICAgICAgdmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICBfX2lzTmV3X186IHRydWVcbiAgICB9O1xuICB9XG59O1xuXG52YXIgZGVmYXVsdFByb3BzJDIgPSBfZXh0ZW5kcyh7XG4gIGFsbG93Q3JlYXRlV2hpbGVMb2FkaW5nOiBmYWxzZSxcbiAgY3JlYXRlT3B0aW9uUG9zaXRpb246ICdsYXN0J1xufSwgYnVpbHRpbnMpO1xuXG52YXIgbWFrZUNyZWF0YWJsZVNlbGVjdCA9IGZ1bmN0aW9uIG1ha2VDcmVhdGFibGVTZWxlY3QoU2VsZWN0Q29tcG9uZW50KSB7XG4gIHZhciBfY2xhc3MsIF90ZW1wO1xuXG4gIHJldHVybiBfdGVtcCA9IF9jbGFzcyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoQ3JlYXRhYmxlLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIENyZWF0YWJsZShwcm9wcykge1xuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ3JlYXRhYmxlKTtcblxuICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ3JlYXRhYmxlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ3JlYXRhYmxlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICBfdGhpcy5vbkNoYW5nZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSwgYWN0aW9uTWV0YSkge1xuICAgICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGdldE5ld09wdGlvbkRhdGEgPSBfdGhpcyRwcm9wcy5nZXROZXdPcHRpb25EYXRhLFxuICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IF90aGlzJHByb3BzLmlucHV0VmFsdWUsXG4gICAgICAgICAgICBpc011bHRpID0gX3RoaXMkcHJvcHMuaXNNdWx0aSxcbiAgICAgICAgICAgIG9uQ2hhbmdlID0gX3RoaXMkcHJvcHMub25DaGFuZ2UsXG4gICAgICAgICAgICBvbkNyZWF0ZU9wdGlvbiA9IF90aGlzJHByb3BzLm9uQ3JlYXRlT3B0aW9uLFxuICAgICAgICAgICAgdmFsdWUgPSBfdGhpcyRwcm9wcy52YWx1ZTtcblxuICAgICAgICBpZiAoYWN0aW9uTWV0YS5hY3Rpb24gIT09ICdzZWxlY3Qtb3B0aW9uJykge1xuICAgICAgICAgIHJldHVybiBvbkNoYW5nZShuZXdWYWx1ZSwgYWN0aW9uTWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld09wdGlvbiA9IF90aGlzLnN0YXRlLm5ld09wdGlvbjtcblxuICAgICAgICB2YXIgdmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkobmV3VmFsdWUpID8gbmV3VmFsdWUgOiBbbmV3VmFsdWVdO1xuXG4gICAgICAgIGlmICh2YWx1ZUFycmF5W3ZhbHVlQXJyYXkubGVuZ3RoIC0gMV0gPT09IG5ld09wdGlvbikge1xuICAgICAgICAgIGlmIChvbkNyZWF0ZU9wdGlvbikgb25DcmVhdGVPcHRpb24oaW5wdXRWYWx1ZSk7ZWxzZSB7XG4gICAgICAgICAgICB2YXIgbmV3T3B0aW9uRGF0YSA9IGdldE5ld09wdGlvbkRhdGEoaW5wdXRWYWx1ZSwgaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgbmV3QWN0aW9uTWV0YSA9IHsgYWN0aW9uOiAnY3JlYXRlLW9wdGlvbicgfTtcbiAgICAgICAgICAgIGlmIChpc011bHRpKSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFtdLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheShjbGVhblZhbHVlKHZhbHVlKSksIFtuZXdPcHRpb25EYXRhXSksIG5ld0FjdGlvbk1ldGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UobmV3T3B0aW9uRGF0YSwgbmV3QWN0aW9uTWV0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZShuZXdWYWx1ZSwgYWN0aW9uTWV0YSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgb3B0aW9ucyA9IHByb3BzLm9wdGlvbnMgfHwgW107XG4gICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmV3T3B0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgIH07XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2xhc3MoQ3JlYXRhYmxlLCBbe1xuICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgdmFyIGFsbG93Q3JlYXRlV2hpbGVMb2FkaW5nID0gbmV4dFByb3BzLmFsbG93Q3JlYXRlV2hpbGVMb2FkaW5nLFxuICAgICAgICAgICAgY3JlYXRlT3B0aW9uUG9zaXRpb24gPSBuZXh0UHJvcHMuY3JlYXRlT3B0aW9uUG9zaXRpb24sXG4gICAgICAgICAgICBmb3JtYXRDcmVhdGVMYWJlbCA9IG5leHRQcm9wcy5mb3JtYXRDcmVhdGVMYWJlbCxcbiAgICAgICAgICAgIGdldE5ld09wdGlvbkRhdGEgPSBuZXh0UHJvcHMuZ2V0TmV3T3B0aW9uRGF0YSxcbiAgICAgICAgICAgIGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGlzTG9hZGluZyA9IG5leHRQcm9wcy5pc0xvYWRpbmcsXG4gICAgICAgICAgICBpc1ZhbGlkTmV3T3B0aW9uID0gbmV4dFByb3BzLmlzVmFsaWROZXdPcHRpb24sXG4gICAgICAgICAgICB2YWx1ZSA9IG5leHRQcm9wcy52YWx1ZTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IG5leHRQcm9wcy5vcHRpb25zIHx8IFtdO1xuICAgICAgICB2YXIgbmV3T3B0aW9uID0gdGhpcy5zdGF0ZS5uZXdPcHRpb247XG5cbiAgICAgICAgaWYgKGlzVmFsaWROZXdPcHRpb24oaW5wdXRWYWx1ZSwgY2xlYW5WYWx1ZSh2YWx1ZSksIG9wdGlvbnMpKSB7XG4gICAgICAgICAgbmV3T3B0aW9uID0gZ2V0TmV3T3B0aW9uRGF0YShpbnB1dFZhbHVlLCBmb3JtYXRDcmVhdGVMYWJlbChpbnB1dFZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3T3B0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5ld09wdGlvbjogbmV3T3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnM6IChhbGxvd0NyZWF0ZVdoaWxlTG9hZGluZyB8fCAhaXNMb2FkaW5nKSAmJiBuZXdPcHRpb24gPyBjcmVhdGVPcHRpb25Qb3NpdGlvbiA9PT0gJ2ZpcnN0JyA/IFtuZXdPcHRpb25dLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheShvcHRpb25zKSkgOiBbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkob3B0aW9ucyksIFtuZXdPcHRpb25dKSA6IG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnZm9jdXMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgICB0aGlzLnNlbGVjdC5mb2N1cygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2JsdXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmJsdXIoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXModGhpcy5wcm9wcywgW10pO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuc3RhdGUub3B0aW9ucztcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RDb21wb25lbnQsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgICAgICAgIHJlZjogZnVuY3Rpb24gcmVmKF9yZWYpIHtcbiAgICAgICAgICAgIF90aGlzMi5zZWxlY3QgPSBfcmVmO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBDcmVhdGFibGU7XG4gIH0oQ29tcG9uZW50KSwgX2NsYXNzLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcyQyLCBfdGVtcDtcbn07XG52YXIgQ3JlYXRhYmxlID0gbWFuYWdlU3RhdGUobWFrZUNyZWF0YWJsZVNlbGVjdChTZWxlY3QpKTtcblxudmFyIEFzeW5jQ3JlYXRhYmxlID0gbWFrZUFzeW5jU2VsZWN0KG1hbmFnZVN0YXRlKG1ha2VDcmVhdGFibGVTZWxlY3QoU2VsZWN0KSkpO1xuXG52YXIgaW5kZXggPSBtYW5hZ2VTdGF0ZShTZWxlY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbmV4cG9ydCB7IFNlbGVjdCBhcyBTZWxlY3RCYXNlLCBBc3luYywgQXN5bmNDcmVhdGFibGUsIENyZWF0YWJsZSwgY3JlYXRlRmlsdGVyLCBjb21wb25lbnRzLCBtZXJnZVN0eWxlcyB9O1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IChtb2R1bGVbJ2V4cG9ydHMnXSA9IGZhY3RvcnkoKSkgOlxuXHRcdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSA/IGRlZmluZShmYWN0b3J5KCkpIDpcblx0XHRcdCh3aW5kb3dbJ3N0eWxpc1J1bGVTaGVldCddID0gZmFjdG9yeSgpKVxufShmdW5jdGlvbiAoKSB7XG5cblx0J3VzZSBzdHJpY3QnXG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbnNlcnRSdWxlKSB7XG5cdFx0dmFyIGRlbGltaXRlciA9ICcvKnwqLydcblx0XHR2YXIgbmVlZGxlID0gZGVsaW1pdGVyKyd9J1xuXG5cdFx0ZnVuY3Rpb24gdG9TaGVldCAoYmxvY2spIHtcblx0XHRcdGlmIChibG9jaylcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpbnNlcnRSdWxlKGJsb2NrICsgJ30nKVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiBydWxlU2hlZXQgKGNvbnRleHQsIGNvbnRlbnQsIHNlbGVjdG9ycywgcGFyZW50cywgbGluZSwgY29sdW1uLCBsZW5ndGgsIG5zLCBkZXB0aCwgYXQpIHtcblx0XHRcdHN3aXRjaCAoY29udGV4dCkge1xuXHRcdFx0XHQvLyBwcm9wZXJ0eVxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0Ly8gQGltcG9ydFxuXHRcdFx0XHRcdGlmIChkZXB0aCA9PT0gMCAmJiBjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDY0KVxuXHRcdFx0XHRcdFx0cmV0dXJuIGluc2VydFJ1bGUoY29udGVudCsnOycpLCAnJ1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdC8vIHNlbGVjdG9yXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRpZiAobnMgPT09IDApXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29udGVudCArIGRlbGltaXRlclxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdC8vIGF0LXJ1bGVcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdHN3aXRjaCAobnMpIHtcblx0XHRcdFx0XHRcdC8vIEBmb250LWZhY2UsIEBwYWdlXG5cdFx0XHRcdFx0XHRjYXNlIDEwMjpcblx0XHRcdFx0XHRcdGNhc2UgMTEyOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5zZXJ0UnVsZShzZWxlY3RvcnNbMF0rY29udGVudCksICcnXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29udGVudCArIChhdCA9PT0gMCA/IGRlbGltaXRlciA6ICcnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSAtMjpcblx0XHRcdFx0XHRjb250ZW50LnNwbGl0KG5lZWRsZSkuZm9yRWFjaCh0b1NoZWV0KVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSkpXG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZWVqczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMuaTE4bjsiLCJtb2R1bGUuZXhwb3J0cyA9IHdwLmNvbXBvbmVudHM7IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5kYXRhOyIsIm1vZHVsZS5leHBvcnRzID0gd3AuZWxlbWVudDsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLmxvZGFzaDsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLm1vbWVudDsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLnJlYWN0OyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52ZW5kb3IucmVhY3REb207Il0sInNvdXJjZVJvb3QiOiIifQ==
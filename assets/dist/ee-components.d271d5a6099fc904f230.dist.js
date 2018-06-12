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
/*! exports provided: QueryLimit, RegistrationStatusSelect, TicketSelect, ModelSelect, ModelEnhancedSelect, EventSelect, DatetimeSelect, OPTION_SELECT_ALL, AvatarImage */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OPTION_SELECT_ALL", function() { return _form_select__WEBPACK_IMPORTED_MODULE_1__["OPTION_SELECT_ALL"]; });

/* harmony import */ var _selection_registration_status_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selection/registration-status-select */ "./assets/src/components/selection/registration-status-select/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegistrationStatusSelect", function() { return _selection_registration_status_select__WEBPACK_IMPORTED_MODULE_2__["default"]; });

!(function webpackMissingModule() { var e = new Error("Cannot find module \"./selection/ticket-select\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
throw new Error("Cannot find module './selection/ticket-select'");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ "./assets/src/components/ui/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AvatarImage", function() { return _ui__WEBPACK_IMPORTED_MODULE_4__["AvatarImage"]; });

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
/*! exports provided: getQueryString, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return QUERY_ORDER_ASC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return QUERY_ORDER_DESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return ALLOWED_ORDER_VALUES; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! querystringify */ "./node_modules/querystringify/index.js");
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(querystringify__WEBPACK_IMPORTED_MODULE_1__);



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

var QUERY_ORDER_ASC = 'ASC';
var QUERY_ORDER_DESC = 'DESC';
var ALLOWED_ORDER_VALUES = ['asc', 'desc', 'ASC', 'DESC'];

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
 * @type @type {
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
	    showExpired = _ref$showExpired === undefined ? true : _ref$showExpired,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];
	var GREATER_AND_EQUAL = encodeURIComponent('>=');
	var LESS_AND_EQUAL = encodeURIComponent('<=');

	if (!showExpired) {
		where.push('where[DTT_EVT_end**expired][]=>&where[DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
	}
	if (month && month !== 'none') {
		where.push('where[DTT_EVT_start][]=' + GREATER_AND_EQUAL + '&where[DTT_EVT_start][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[DTT_EVT_end][]=' + LESS_AND_EQUAL + '&where[DTT_EVT_end][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
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
 * @param {string} month         Return events for the given month.  Can be any
 *                                 in any month format recognized by moment.
 * @return {string}             The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? true : _ref$showExpired,
	    categorySlug = _ref.categorySlug,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];
	var GREATER_AND_EQUAL = encodeURIComponent('>=');
	var LESS_AND_EQUAL = encodeURIComponent('<=');

	if (!showExpired) {
		where.push('where[Datetime.DTT_EVT_end**expired][]=>&where[Datetime.DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
	}
	if (categorySlug) {
		where.push('where[Term_Relationship.Term_Taxonomy.Term.slug]=' + categorySlug);
	}
	if (month && month !== 'none') {
		where.push('where[Datetime.DTT_EVT_start][]=' + GREATER_AND_EQUAL + '&where[Datetime.DTT_EVT_start][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[Datetime.DTT_EVT_end][]=' + LESS_AND_EQUAL + '&where[Datetime.DTT_EVT_end][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
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
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, endpoints, getEndpoint, applyQueryString, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, validateEntityHasKey, validateIsArray, validateIsNotEmpty, MODEL_NAMES, getQueryString, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES */
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
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["getQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["QUERY_ORDER_ASC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["QUERY_ORDER_DESC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["ALLOWED_ORDER_VALUES"]; });








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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9mb3JtL3NlbGVjdC9idWlsZC1vcHRpb25zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2Zvcm0vc2VsZWN0L2RlZmF1bHQtc2VsZWN0LWNvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2NvbXBvbmVudHMvZm9ybS9zZWxlY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2NvbXBvbmVudHMvZm9ybS9zZWxlY3QvbW9kZWwtc2VsZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2Zvcm0vc2VsZWN0L21vZGVsLXNlbGVjdHMvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2NvbXBvbmVudHMvZm9ybS9zZWxlY3QvbW9kZWwtc2VsZWN0cy9ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9mb3JtL3NlbGVjdC9tb2RlbC1zZWxlY3RzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2Zvcm0vc2VsZWN0L21vZGVsLXNlbGVjdHMvdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL3F1ZXJ5L2xpbWl0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9jb21wb25lbnRzL3NlbGVjdGlvbi9yZWdpc3RyYXRpb24tc3RhdHVzLXNlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9zZWxlY3Rpb24vcmVnaXN0cmF0aW9uLXN0YXR1cy1zZWxlY3Qvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvY29tcG9uZW50cy91aS9pbWFnZS9hdmF0YXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kZWZhdWx0LW1vZGVsLXN0YXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VuZHBvaW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9wcmltYXJ5LWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vaGFzaC9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL21lbW9pemUvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsaXMvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi91bml0bGVzcy9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY3JlYXRlLWVtb3Rpb24vZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9lbW90aW9uL2Rpc3QvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wZXJmb3JtYW5jZS1ub3cvbGliL3BlcmZvcm1hbmNlLW5vdy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmdpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcmFmL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWlucHV0LWF1dG9zaXplL2xpYi9BdXRvc2l6ZUlucHV0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9zdHlsaXMtcnVsZS1zaGVldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLmkxOG5cIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmRhdGFcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmVsZW1lbnRcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmVuZG9yLmxvZGFzaFwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52ZW5kb3IubW9tZW50XCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZlbmRvci5yZWFjdFwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52ZW5kb3IucmVhY3REb21cIiJdLCJuYW1lcyI6WyJERUZBVUxUX01PREVMX09QVElPTlNfTUFQIiwiZXZlbnQiLCJsYWJlbCIsInZhbHVlIiwiZGF0ZXRpbWUiLCJ0aWNrZXQiLCJPUFRJT05fU0VMRUNUX0FMTCIsImJ1aWxkT3B0aW9ucyIsImVudGl0aWVzIiwibW9kZWxOYW1lIiwiYWRkQWxsT3B0aW9uTGFiZWwiLCJtYXAiLCJNQVBfRk9SX01PREVMIiwiZ2VuZXJhdGVkT3B0aW9ucyIsInJlZHVjZSIsIm9wdGlvbnMiLCJlbnRpdHkiLCJwdXNoIiwidW5zaGlmdCIsIlJFQUNUX1NFTEVDVF9UWVBFUyIsIlByb3BUeXBlcyIsInN0cmluZyIsImF1dG9Gb2N1cyIsImJvb2wiLCJiYWNrc3BhY2VSZW1vdmVzVmFsdWUiLCJibHVySW5wdXRPblNlbGVjdCIsImNhcHR1cmVNZW51U2Nyb2xsIiwiY2xhc3NOYW1lIiwiY2xhc3NOYW1lUHJlZml4IiwiY2xvc2VNZW51T25TZWxlY3QiLCJjb21wb25lbnRzIiwib2JqZWN0IiwiY29udHJvbFNob3VsZFJlbmRlclZhbHVlIiwiZGVsaW1pdGVyIiwiZXNjYXBlQ2xlYXJzVmFsdWUiLCJmaWx0ZXJPcHRpb24iLCJmdW5jIiwiZm9ybWF0R3JvdXBMYWJlbCIsImZvcm1hdE9wdGlvbkxhYmVsIiwiZ2V0T3B0aW9uTGFiZWwiLCJnZXRPcHRpb25WYWx1ZSIsImhpZGVTZWxlY3RlZE9wdGlvbnMiLCJpZCIsImlucHV0VmFsdWUiLCJpbnB1dElkIiwiaW5zdGFuY2VJZCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImlzQ2xlYXJhYmxlIiwiaXNEaXNhYmxlZCIsImlzTG9hZGluZyIsImlzT3B0aW9uRGlzYWJsZWQiLCJpc09wdGlvblNlbGVjdGVkIiwiaXNNdWx0aSIsImlzU2VhcmNoYWJsZSIsImxvYWRpbmdNZXNzYWdlIiwibWluTWVudUhlaWdodCIsIm1heE1lbnVIZWlnaHQiLCJtZW51SXNPcGVuIiwibWVudVBsYWNlbWVudCIsIm9uZU9mIiwibWVudVBvc2l0aW9uIiwibWVudVBvcnRhbFRhcmdldCIsImVsZW1lbnQiLCJtZW51U2hvdWxkQmxvY2tTY3JvbGwiLCJtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXciLCJuYW1lIiwibm9PcHRpb25zTWVzc2FnZSIsIm9uQmx1ciIsIm9uQ2hhbmdlIiwib25Gb2N1cyIsIm9uSW5wdXRDaGFuZ2UiLCJvbktleURvd24iLCJvbk1lbnVPcGVuIiwib25NZW51Q2xvc2UiLCJvbk1lbnVTY3JvbGxUb1RvcCIsIm9uTWVudVNjcm9sbFRvQm90dG9tIiwib3Blbk1lbnVPbkZvY3VzIiwib3Blbk1lbnVPbkNsaWNrIiwiYXJyYXkiLCJwYWdlU2l6ZSIsInBsYWNlaG9sZGVyIiwic2NyZWVuUmVhZGVyU3RhdHVzIiwic3R5bGVzIiwic2hhcGUiLCJjbGVhckluZGljYXRvciIsImNvbnRhaW5lciIsImNvbnRyb2wiLCJkcm9wZG93bkluZGljYXRvciIsImdyb3VwIiwiZ3JvdXBIZWFkaW5nIiwiaW5kaWNhdG9yc0NvbnRhaW5lciIsImluZGljYXRvclNlcGFyYXRvciIsImlucHV0IiwibG9hZGluZ0luZGljYXRvciIsImxvYWRpbmdNZXNzYWdlQ1NTIiwibWVudSIsIm1lbnVMaXN0IiwibWVudVBvcnRhbCIsIm11bHRpVmFsdWUiLCJtdWx0aVZhbHVlTGFiZWwiLCJtdWx0aVZhbHVlUmVtb3ZlIiwibm9PcHRpb25zTWVzc2FnZUNTUyIsIm9wdGlvbiIsInNpbmdsZVZhbHVlIiwidmFsdWVDb250YWluZXIiLCJ0YWJJbmRleCIsInRhYlNlbGVjdHNWYWx1ZSIsIlJFQUNUX1NFTEVDVF9ERUZBVUxUUyIsIl9fIiwiTW9kZWxTZWxlY3QiLCJwcm9wcyIsInNlbGVjdExhYmVsIiwic2VsZWN0Q29uZmlndXJhdGlvbiIsImdldFNlbGVjdExhYmVsIiwic3RhdGUiLCJnZXRPcHRpb25zIiwidXBkYXRlZCIsImdldE9wdGlvbk9iamVjdEZvclZhbHVlIiwiZGVmYXVsdFZhbHVlIiwibW9kZWxFbnRpdGllcyIsIm9wdGlvbnNFbnRpdHlNYXAiLCJtYXBPcHRpb25zQ2FsbGJhY2siLCJpc0VtcHR5IiwibWF0Y2giLCJmaW5kIiwiaXNVbmRlZmluZWQiLCJwcm9wVHlwZXMiLCJxdWVyeURhdGEiLCJsaW1pdCIsIm9yZGVyQnkiLCJvcmRlciIsImdldFF1ZXJ5U3RyaW5nIiwiZGVmYXVsdFByb3BzIiwidW5pcXVlSWQiLCJ3aXRoU2VsZWN0Iiwic2VsZWN0Iiwib3duUHJvcHMiLCJxdWVyeVN0cmluZyIsImdldEl0ZW1zIiwiaXNSZXF1ZXN0aW5nSXRlbXMiLCJEYXRldGltZVNlbGVjdCIsInNlbGVjdGVkRGF0ZXRpbWVJZCIsIm9uRGF0ZXRpbWVTZWxlY3QiLCJzZWxlY3RPcHRzIiwiZm9yRXZlbnRJZCIsIkV2ZW50U2VsZWN0Iiwic2VsZWN0ZWRFdmVudElkIiwib25FdmVudFNlbGVjdCIsIlRpY2tldFNlbGVjdCIsInNlbGVjdGVkVGlja2V0SWQiLCJvblRpY2tldFNlbGVjdCIsImZvckRhdGV0aW1lSWQiLCJERUZBVUxUX0xJTUlUIiwiREVGQVVMVF9MQUJFTCIsIkRFRkFVTFRfTUlOIiwiREVGQVVMVF9NQVgiLCJRdWVyeUxpbWl0Iiwib25MaW1pdENoYW5nZSIsIm1pbiIsIm1heCIsIlJlZ2lzdHJhdGlvblN0YXR1c1NlbGVjdCIsInJlZ1N0YXR1c2VzIiwic2VsZWN0ZWRSZWdTdGF0dXNJZCIsIm9uUmVnU3RhdHVzU2VsZWN0IiwiYWRkQWxsT3B0aW9uIiwicGxhY2VIb2xkZXIiLCJyZWdpc3RyYXRpb25TdGF0dXNTZWxlY3RPcHRpb25zIiwiYXJyYXlPZiIsIlNUU19JRCIsImlzUmVxdWlyZWQiLCJTVFNfY29kZSIsImF0dHJpYnV0ZXMiLCJnZXRSZWdpc3RyYXRpb25TdGF0dXNzIiwiaXNSZXF1ZXN0aW5nUmVnaXN0cmF0aW9uU3RhdHVzcyIsInF1ZXJ5QXJncyIsIm9yZGVyX2J5Iiwic3RyaW5naWZ5IiwicGlja0J5IiwiRUVfT1BUSU9OX1JFR19TVEFUVVNfU0VMRUNUX0FMTCIsInJlZ1N0YXR1c09wdGlvbnMiLCJzdGF0dXMiLCJBdmF0YXJJbWFnZSIsImF2YXRhclVybCIsImF2YXRhckNsYXNzIiwiYXZhdGFySGVpZ2h0IiwiYXZhdGFyV2lkdGgiLCJhdmF0YXJBbHRUZXh0Iiwid2hlcmVDb25kaXRpb25zIiwibWFwT3JkZXJCeSIsIndoZXJlIiwiUVVFUllfT1JERVJfQVNDIiwiUVVFUllfT1JERVJfREVTQyIsIkFMTE9XRURfT1JERVJfVkFMVUVTIiwibm93RGF0ZUFuZFRpbWUiLCJtb21lbnQiLCJxdWVyeURhdGFUeXBlcyIsInNob3dFeHBpcmVkIiwibW9udGgiLCJkZWZhdWx0UXVlcnlEYXRhIiwib3JkZXJCeU1hcCIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsIkdSRUFURVJfQU5EX0VRVUFMIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiTEVTU19BTkRfRVFVQUwiLCJsb2NhbCIsImZvcm1hdCIsInN0YXJ0T2YiLCJlbmRPZiIsInBhcnNlSW50Iiwiam9pbiIsImJhc2VHZXRRdWVyeVN0cmluZyIsIm1hcFRvQXJyYXlWYWx1ZXMiLCJtYXBWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBUb09iamVjdFZhbHVlcyIsIkRFRkFVTFRfTElTVFNfU1RBVEUiLCJERUZBVUxUX0NPUkVfU1RBVEUiLCJlbnRpdHlJZHMiLCJkaXJ0eSIsImRhdGEiLCJwYXRocyIsImNvbGxlY3Rpb25fZW5kcG9pbnRzIiwiZW5kcG9pbnRzIiwiZ2V0RW5kcG9pbnQiLCJ2YWxpZGF0ZUVudGl0eUhhc0tleSIsImFwcGx5UXVlcnlTdHJpbmciLCJjYXRlZ29yeVNsdWciLCJ0aWNrZXRfc3RhcnQiLCJ0aWNrZXRfZW5kIiwiTU9ERUxfTkFNRVMiLCJrZXlzIiwicHJpbWFyeV9rZXlzIiwicHJpbWFyeUtleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwibWVtb2l6ZSIsInZhbGlkYXRlSXNBcnJheSIsInByaW1hcnlLZXkiLCJyZXN1bHQiLCJrZXkiLCJ0cmltRW5kIiwidmFsdWVGb3JQcmltYXJ5S2V5IiwiZ2V0UHJpbWFyeUtleSIsImdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMiLCJpc0FycmF5Iiwia2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsInZhbGlkYXRlSXNOb3RFbXB0eSIsImtleUJ5IiwiU3RyaW5nIiwiaXNOYU4iLCJtZXNzYWdlIiwic3ByaW50ZiIsImhhc093blByb3BlcnR5IiwiaXRlbXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQUE7QUFBQTs7O0FBR0E7O0FBRUE7Ozs7QUFJQSxJQUFNQSw0QkFBNEI7QUFDakNDLFFBQU87QUFDTkMsU0FBTyxVQUREO0FBRU5DLFNBQU87QUFGRCxFQUQwQjtBQUtqQ0MsV0FBVTtBQUNURixTQUFPLFVBREU7QUFFVEMsU0FBTztBQUZFLEVBTHVCO0FBU2pDRSxTQUFRO0FBQ1BILFNBQU8sVUFEQTtBQUVQQyxTQUFPO0FBRkE7QUFUeUIsQ0FBbEM7O0FBZU8sSUFBTUcsb0JBQW9CLEtBQTFCOztBQUVQOzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FDcEJDLFFBRG9CLEVBRXBCQyxTQUZvQixFQUtoQjtBQUFBLEtBRkpDLGlCQUVJLHVFQUZnQixFQUVoQjtBQUFBLEtBREpDLEdBQ0ksdUVBREVYLHlCQUNGOztBQUNKLEtBQU1ZLGdCQUFnQkQsSUFBS0YsU0FBTCxJQUFtQkUsSUFBS0YsU0FBTCxDQUFuQixHQUFzQyxL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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVOztBQUVwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsT0FBTztBQUMzQix5QkFBeUIsT0FBTztBQUNoQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixnQ0FBZ0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdoQkE7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjs7QUFFN0Q7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtRUFBbUUsYUFBYTtBQUNoRjtBQUNBOztBQUVBLGdOQUFnTjtBQUNoTjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLG1CQUFtQjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQThDO0FBQzlDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzQiwwREFBMEQ7QUFDaEYsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUVBQW1FLGFBQWE7QUFDaEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsaUNBQWlDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJCQUEyQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUEsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7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QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVyxzQkFBc0I7QUFDakM7QUFDQTtBQUNBLHFGQUE4Qyx1QkFBdUI7QUFDckU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtSEFBbUg7QUFDMUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtGQUFrRiwyQ0FBMkM7QUFDN0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxHQUFHLDRCQUE0QjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUywrREFBK0Q7QUFDeEUsNEJBQTRCLDZCQUE2QjtBQUN6RDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQiw2Q0FBNkM7QUFDbEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0IsNENBQTRDO0FBQy9FO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtR0FBNEQ7QUFDNUQ7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUdBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7O0FBRXhCLHVHQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNHQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCLHVCQUF1QjtBQUNuRTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix5QkFBeUI7QUFDbkQ7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHlCQUF5QjtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLHNGQUErQyw0Q0FBNEM7QUFDM0YsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLG9GQUE2Qyw2Q0FBNkM7QUFDMUY7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQix5QkFBeUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0IseUJBQXlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDRCQUE0QjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsc0JBQXNCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsa0JBQWtCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixzREFBc0Q7QUFDbkYsV0FBVztBQUNYO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUdBQTBEO0FBQzFEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzR0FBK0Q7QUFDL0Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDUTs7Ozs7Ozs7Ozs7O0FDOTlIUjtBQUNBO0FBQ0EsV0FDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDL0NEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBLHNCOzs7Ozs7Ozs7OztBQ0FBLDJCOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLHlCOzs7Ozs7Ozs7OztBQ0FBLDRCOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImVlLWNvbXBvbmVudHMuZDI3MWQ1YTYwOTlmYzkwNGYyMzAuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvY29tcG9uZW50cy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHJlZHVjZSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQSBkZWZhdWx0IG1hcCB1c2VkIGZvciBtYXBwaW5nIG9wdGlvbnMgZm9yIHNlbGVjdC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IERFRkFVTFRfTU9ERUxfT1BUSU9OU19NQVAgPSB7XG5cdGV2ZW50OiB7XG5cdFx0bGFiZWw6ICdFVlRfbmFtZScsXG5cdFx0dmFsdWU6ICdFVlRfSUQnLFxuXHR9LFxuXHRkYXRldGltZToge1xuXHRcdGxhYmVsOiAnRFRUX25hbWUnLFxuXHRcdHZhbHVlOiAnRFRUX0lEJyxcblx0fSxcblx0dGlja2V0OiB7XG5cdFx0bGFiZWw6ICdUS1RfbmFtZScsXG5cdFx0dmFsdWU6ICdUS1RfSUQnLFxuXHR9LFxufTtcblxuZXhwb3J0IGNvbnN0IE9QVElPTl9TRUxFQ1RfQUxMID0gJ0FMTCc7XG5cbi8qKlxuICogUmVjZWl2ZXMgYW4gYXJyYXkgb2YgZXZlbnQgZW50aXRpZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygc2ltcGxlIG9iamVjdHNcbiAqIHRoYXQgY2FuIGJlIHBhc3NlZCBhbG9uZyB0byB0aGUgb3B0aW9ucyBhcnJheSB1c2VkIGZvciB0aGUgV29yZFByZXNzXG4gKiBTZWxlY3RDb250cm9sIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGFkZEFsbE9wdGlvbkxhYmVsICBJZiBwcmVzZW50IHRoZW4gb3B0aW9ucyBhcnJheSB3aWxsIGJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHByZXBlbmRlZCB3aXRoIGFuIFwiQUxMXCIgb3B0aW9uIG1lYW5pbmdcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdCBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWQuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtYXBcbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGFuIGFycmF5IG9mIHNpbXBsZSBvYmplY3RzIGZvcm1hdHRlZCBmb3IgYW55XG4gKiBzZWxlY3QgY29udHJvbCB0aGF0IHJlY2VpdmVzIGl0cyBvcHRpb25zIGluIHRoZSBmb3JtYXQgb2YgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogd2l0aCBsYWJlbCBhbmQgdmFsdWUga2V5cy5cbiAqL1xuY29uc3QgYnVpbGRPcHRpb25zID0gKFxuXHRlbnRpdGllcyxcblx0bW9kZWxOYW1lLFxuXHRhZGRBbGxPcHRpb25MYWJlbCA9ICcnLFxuXHRtYXAgPSBERUZBVUxUX01PREVMX09QVElPTlNfTUFQLFxuKSA9PiB7XG5cdGNvbnN0IE1BUF9GT1JfTU9ERUwgPSBtYXBbIG1vZGVsTmFtZSBdID8gbWFwWyBtb2RlbE5hbWUgXSA6IGZhbHNlO1xuXHRjb25zdCBnZW5lcmF0ZWRPcHRpb25zID0gZW50aXRpZXMgJiYgTUFQX0ZPUl9NT0RFTCA/XG5cdFx0cmVkdWNlKCBlbnRpdGllcywgZnVuY3Rpb24oIG9wdGlvbnMsIGVudGl0eSApIHtcblx0XHRcdGlmICggZW50aXR5WyBNQVBfRk9SX01PREVMLmxhYmVsIF0gJiZcblx0XHRcdFx0ZW50aXR5WyBNQVBfRk9SX01PREVMLnZhbHVlIF0gKSB7XG5cdFx0XHRcdG9wdGlvbnMucHVzaChcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsYWJlbDogZW50aXR5WyBNQVBfRk9SX01PREVMLmxhYmVsIF0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogZW50aXR5WyBNQVBfRk9SX01PREVMLnZhbHVlIF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH0sIFtdICkgOlxuXHRcdFtdO1xuXHRpZiAoIGVudGl0aWVzICYmIGFkZEFsbE9wdGlvbkxhYmVsICE9PSAnJyApIHtcblx0XHRnZW5lcmF0ZWRPcHRpb25zLnVuc2hpZnQoIHtcblx0XHRcdGxhYmVsOiBhZGRBbGxPcHRpb25MYWJlbCxcblx0XHRcdHZhbHVlOiBPUFRJT05fU0VMRUNUX0FMTCxcblx0XHR9ICk7XG5cdH1cblx0cmV0dXJuIGdlbmVyYXRlZE9wdGlvbnM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZE9wdGlvbnM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9TRUxFQ1RfVFlQRVMgPSB7XG5cdCdhcmlhLWRlc2NyaWJlZGJ5JzogUHJvcFR5cGVzLnN0cmluZyxcblx0J2FyaWEtbGFiZWwnOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHQnYXJpYS1sYWJlbGxlZGJ5JzogUHJvcFR5cGVzLnN0cmluZyxcblx0YXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcblx0YmFja3NwYWNlUmVtb3Zlc1ZhbHVlOiBQcm9wVHlwZXMuYm9vbCxcblx0Ymx1cklucHV0T25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuXHRjYXB0dXJlTWVudVNjcm9sbDogUHJvcFR5cGVzLmJvb2wsXG5cdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0Y2xhc3NOYW1lUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRjbG9zZU1lbnVPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG5cdGNvbXBvbmVudHM6IFByb3BUeXBlcy5vYmplY3QsXG5cdGNvbnRyb2xTaG91bGRSZW5kZXJWYWx1ZTogUHJvcFR5cGVzLmJvb2wsXG5cdGRlbGltaXRlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0ZXNjYXBlQ2xlYXJzVmFsdWU6IFByb3BUeXBlcy5ib29sLFxuXHRmaWx0ZXJPcHRpb246IFByb3BUeXBlcy5mdW5jLFxuXHRmb3JtYXRHcm91cExhYmVsOiBQcm9wVHlwZXMuZnVuYyxcblx0Zm9ybWF0T3B0aW9uTGFiZWw6IFByb3BUeXBlcy5mdW5jLFxuXHRnZXRPcHRpb25MYWJlbDogUHJvcFR5cGVzLmZ1bmMsXG5cdGdldE9wdGlvblZhbHVlOiBQcm9wVHlwZXMuZnVuYyxcblx0aGlkZVNlbGVjdGVkT3B0aW9uczogUHJvcFR5cGVzLmJvb2wsXG5cdGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbnB1dFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbnB1dElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbnN0YW5jZUlkOiBQcm9wVHlwZXMub25lT2ZUeXBlKCBbXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRdICksXG5cdGlzQ2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcblx0aXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cdGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG5cdGlzT3B0aW9uRGlzYWJsZWQ6IFByb3BUeXBlcy5mdW5jLFxuXHRpc09wdGlvblNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcblx0aXNNdWx0aTogUHJvcFR5cGVzLmJvb2wsXG5cdGlzU2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsXG5cdGxvYWRpbmdNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcblx0bWluTWVudUhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcblx0bWF4TWVudUhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcblx0bWVudUlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXG5cdG1lbnVQbGFjZW1lbnQ6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdCdhdXRvJyxcblx0XHQnYm90dG9tJyxcblx0XHQndG9wJyxcblx0XSApLFxuXHRtZW51UG9zaXRpb246IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdCdhYnNvbHV0ZScsXG5cdFx0J2ZpeGVkJyxcblx0XSApLFxuXHRtZW51UG9ydGFsVGFyZ2V0OiBQcm9wVHlwZXMuZWxlbWVudCxcblx0bWVudVNob3VsZEJsb2NrU2Nyb2xsOiBQcm9wVHlwZXMuYm9vbCxcblx0bWVudVNob3VsZFNjcm9sbEludG9WaWV3OiBQcm9wVHlwZXMuYm9vbCxcblx0bmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0bm9PcHRpb25zTWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblx0b25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuXHRvbk1lbnVPcGVuOiBQcm9wVHlwZXMuZnVuYyxcblx0b25NZW51Q2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuXHRvbk1lbnVTY3JvbGxUb1RvcDogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uTWVudVNjcm9sbFRvQm90dG9tOiBQcm9wVHlwZXMuZnVuYyxcblx0b3Blbk1lbnVPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcblx0b3Blbk1lbnVPbkNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuXHRwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlcixcblx0cGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG5cdHNjcmVlblJlYWRlclN0YXR1czogUHJvcFR5cGVzLmZ1bmMsXG5cdHN0eWxlczogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0Y2xlYXJJbmRpY2F0b3I6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGNvbnRhaW5lcjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0Y29udHJvbDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0ZHJvcGRvd25JbmRpY2F0b3I6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGdyb3VwOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRncm91cEhlYWRpbmc6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGluZGljYXRvcnNDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGluZGljYXRvclNlcGFyYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aW5wdXQ6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGxvYWRpbmdJbmRpY2F0b3I6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGxvYWRpbmdNZXNzYWdlQ1NTOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRtZW51OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRtZW51TGlzdDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bWVudVBvcnRhbDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bXVsdGlWYWx1ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bXVsdGlWYWx1ZUxhYmVsOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRtdWx0aVZhbHVlUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRub09wdGlvbnNNZXNzYWdlQ1NTOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRvcHRpb246IFByb3BUeXBlcy5mdW5jLFxuXHRcdHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRzaW5nbGVWYWx1ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dmFsdWVDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuXHR9ICksXG5cdHRhYkluZGV4OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR0YWJTZWxlY3RzVmFsdWU6IFByb3BUeXBlcy5ib29sLFxuXHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZSggW1xuXHRcdFByb3BUeXBlcy5vYmplY3QsXG5cdFx0UHJvcFR5cGVzLmFycmF5LFxuXHRdICksXG59O1xuXG5leHBvcnQgY29uc3QgUkVBQ1RfU0VMRUNUX0RFRkFVTFRTID0ge1xuXHRpc0NsZWFyYWJsZTogdHJ1ZSxcblx0aXNMb2FkaW5nOiB0cnVlLFxuXHRwbGFjZWhvbGRlcjogX18oICdTZWxlY3QuLi4nLCAnZXZlbnRfZXNwcmVzc28nICksXG59O1xuIiwiZXhwb3J0IHsgTW9kZWxTZWxlY3QsIGRlZmF1bHQgYXMgTW9kZWxFbmhhbmNlZFNlbGVjdCB9IGZyb20gJy4vbW9kZWwtc2VsZWN0JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtc2VsZWN0cyc7XG5leHBvcnQgKiBmcm9tICcuL2J1aWxkLW9wdGlvbnMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCB7IENvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgaXNFbXB0eSwgdW5pcXVlSWQsIGZpbmQsIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogV1AgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IGJ1aWxkT3B0aW9ucyBmcm9tICcuL2J1aWxkLW9wdGlvbnMnO1xuaW1wb3J0IHsgTU9ERUxfTkFNRVMgfSBmcm9tICcuLi8uLi8uLi9kYXRhL21vZGVsJztcbmltcG9ydCB7XG5cdFJFQUNUX1NFTEVDVF9ERUZBVUxUUyxcblx0UkVBQ1RfU0VMRUNUX1RZUEVTLFxufSBmcm9tICcuL2RlZmF1bHQtc2VsZWN0LWNvbmZpZ3VyYXRpb24nO1xuXG4vKipcbiAqIE1vZGVsU2VsZWN0IGNvbXBvbmVudC5cbiAqIFRoaXMgaXMgYSBjb21wb25lbnQgdGhhdCB3aWxsIGdlbmVyYXRlIGEgcmVhY3Qtc2VsZWN0IGlucHV0IGZvciBhIGdpdmVuXG4gKiBtb2RlbCBhbmQgaXRzIGVudGl0aWVzIChwcm92aWRlZCB2aWEgcHJvcHMpLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXBsb3ktcHJldmlldy0yMjg5LS1yZWFjdC1zZWxlY3QubmV0bGlmeS5jb20vcHJvcHMjcHJvcC10eXBlc1xuICogICBmb3Igb3B0aW9ucyB0aGF0IGNhbiBiZSBwYXNzZWQgdGhyb3VnaCB2aWEgdGhlIHNlbGVjdENvbmZpZ3VyYXRpb24gcHJvcC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBzZWxlY3RDb25maWd1cmF0aW9uICBBbiBvYmplY3QgY29udGFpbmluZyBvcHRpb25zIGZvciB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3Qtc2VsZWN0IGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7IEFycmF5IH0gbW9kZWxFbnRpdGllcyAgICAgICAgICBBcnJheSBvZiBtb2RlbCBlbnRpdGllc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lICAgICAgICAgICAgICBUaGUgbmFtZSBvZiB0aGUgTW9kZWwgdGhlIGVudGl0aWVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlbG9uZyB0by5cbiAqIEBwYXJhbSB7IGZ1bmN0aW9uIH0gbWFwT3B0aW9uc0NhbGxiYWNrICBUaGlzIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSBieVxuICogICBkZWZhdWx0IHRoZSBtb2RlbEVudGl0aWVzLCB0aGUgbW9kZWxOYW1lIChhbmQgYW55IGN1c3RvbSBNYXAgcHJvdmlkZWQpIGFuZFxuICogICBpcyBleHBlY3RlZCB0byByZXR1cm4gYW4gYXJyYXkgb2Ygb3B0aW9ucyB0byBiZSB1c2VkIGZvciB0aGUgcmVhY3Qtc2VsZWN0XG4gKiAgIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9wdGlvbnNFbnRpdHlNYXAgICAgSWYgcHJvdmlkZWQsIGl0IGlzIGV4cGVjdGVkIHRvIGJlIGFcbiAqICAgbWFwIG9mIG1vZGVsTmFtZSBmaWVsZHMgdG8gYGxhYmVsYCBhbmQgYHZhbHVlYCBrZXlzIHVzZWQgYnlcbiAqICAgYG1hcE9wdGlvbnNDYWxsYmFja2AuXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2RlbFNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0c2VsZWN0Q29uZmlndXJhdGlvbjogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0XHQuLi5SRUFDVF9TRUxFQ1RfVFlQRVMsXG5cdFx0fSApLFxuXHRcdG1vZGVsRW50aXRpZXM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRtb2RlbE5hbWU6IFByb3BUeXBlcy5vbmVPZiggTU9ERUxfTkFNRVMgKSxcblx0XHRtYXBPcHRpb25zQ2FsbGJhY2s6IFByb3BUeXBlcy5mdW5jLFxuXHRcdG9wdGlvbnNFbnRpdHlNYXA6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIFsgJ2FzYycsICdkZXNjJyBdICksXG5cdFx0fSApLFxuXHRcdGdldFF1ZXJ5U3RyaW5nOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRzZWxlY3RMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRhZGRBbGxPcHRpb25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0fTtcblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuXHRcdHNlbGVjdENvbmZpZ3VyYXRpb246IHtcblx0XHRcdC4uLlJFQUNUX1NFTEVDVF9ERUZBVUxUUyxcblx0XHRcdG5hbWU6IHVuaXF1ZUlkKCAnbW9kZWwtc2VsZWN0LScgKSxcblx0XHR9LFxuXHRcdG1vZGVsRW50aXRpZXM6IFtdLFxuXHRcdG1vZGVsTmFtZTogJycsXG5cdFx0bWFwT3B0aW9uc0NhbGxiYWNrOiBidWlsZE9wdGlvbnMsXG5cdFx0b3B0aW9uc0VudGl0eU1hcDogbnVsbCxcblx0XHRxdWVyeURhdGE6IHtcblx0XHRcdGxpbWl0OiAxMDAsXG5cdFx0XHRvcmRlcjogJ2Rlc2MnLFxuXHRcdH0sXG5cdFx0c2VsZWN0TGFiZWw6ICcnLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiAnJyxcblx0fTtcblxuXHRzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKCBwcm9wcyApIHtcblx0XHRjb25zdCB7IHNlbGVjdENvbmZpZ3VyYXRpb24gfSA9IHByb3BzO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBNb2RlbFNlbGVjdC5nZXRPcHRpb25zKCBwcm9wcyApO1xuXHRcdGNvbnN0IHVwZGF0ZWQgPSB7XG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0dmFsdWU6IE1vZGVsU2VsZWN0LmdldE9wdGlvbk9iamVjdEZvclZhbHVlKFxuXHRcdFx0XHRzZWxlY3RDb25maWd1cmF0aW9uLmRlZmF1bHRWYWx1ZSwgb3B0aW9uc1xuXHRcdFx0KSxcblx0XHR9O1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5SRUFDVF9TRUxFQ1RfREVGQVVMVFMsXG5cdFx0XHQuLi5zZWxlY3RDb25maWd1cmF0aW9uLFxuXHRcdFx0Li4udXBkYXRlZCxcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIGdldE9wdGlvbnMoIHByb3BzICkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG1vZGVsRW50aXRpZXMsXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRvcHRpb25zRW50aXR5TWFwLFxuXHRcdFx0bWFwT3B0aW9uc0NhbGxiYWNrLFxuXHRcdFx0YWRkQWxsT3B0aW9uTGFiZWwsXG5cdFx0fSA9IHByb3BzO1xuXHRcdGlmICggISBpc0VtcHR5KCBtb2RlbEVudGl0aWVzICkgKSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9uc0VudGl0eU1hcCAhPT0gbnVsbCA/XG5cdFx0XHRcdG1hcE9wdGlvbnNDYWxsYmFjayhcblx0XHRcdFx0XHRtb2RlbEVudGl0aWVzLFxuXHRcdFx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdFx0XHRhZGRBbGxPcHRpb25MYWJlbCxcblx0XHRcdFx0XHRvcHRpb25zRW50aXR5TWFwLFxuXHRcdFx0XHQpIDpcblx0XHRcdFx0bWFwT3B0aW9uc0NhbGxiYWNrKFxuXHRcdFx0XHRcdG1vZGVsRW50aXRpZXMsXG5cdFx0XHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0XHRcdGFkZEFsbE9wdGlvbkxhYmVsLFxuXHRcdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRzdGF0aWMgZ2V0T3B0aW9uT2JqZWN0Rm9yVmFsdWUoIHZhbHVlLCBvcHRpb25zICkge1xuXHRcdGlmICggISBpc0VtcHR5KCBvcHRpb25zICkgKSB7XG5cdFx0XHRjb25zdCBtYXRjaCA9IGZpbmQoIG9wdGlvbnMsIGZ1bmN0aW9uKCBvcHRpb24gKSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb24udmFsdWUgPT09IHZhbHVlO1xuXHRcdFx0fSApO1xuXHRcdFx0cmV0dXJuICEgaXNVbmRlZmluZWQoIG1hdGNoICkgP1xuXHRcdFx0XHRtYXRjaCA6XG5cdFx0XHRcdG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cdGdldFNlbGVjdExhYmVsKCkge1xuXHRcdGNvbnN0IHsgc2VsZWN0TGFiZWwsIHNlbGVjdENvbmZpZ3VyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0cmV0dXJuIHNlbGVjdExhYmVsID9cblx0XHRcdDxsYWJlbCBodG1sRm9yPXsgc2VsZWN0Q29uZmlndXJhdGlvbi5uYW1lIH0+eyBzZWxlY3RMYWJlbCB9PC9sYWJlbD4gOlxuXHRcdFx0Jyc7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxGcmFnbWVudD5cblx0XHRcdFx0eyB0aGlzLmdldFNlbGVjdExhYmVsKCkgfVxuXHRcdFx0XHQ8U2VsZWN0IHsgLi4udGhpcy5zdGF0ZSB9IC8+XG5cdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgTW9kZWxTZWxlY3QgQ29tcG9uZW50IHdyYXBwZWQgaW4gdGhlIGB3aXRoU2VsZWN0YCBoaWdoZXIgb3JkZXIgY29tcG9uZW50LlxuICogVGhpcyBzdWJzY3JpYmVzIHRoZSBNb2RlbFNlbGVjdCBjb21wb25lbnQgdG8gdGhlIHN0YXRlIG1haW50YWluZWQgdmlhIHRoZVxuICogZXZlbnRlc3ByZXNzby9saXN0cyBzdG9yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgd2l0aFNlbGVjdCggKCBzZWxlY3QsIG93blByb3BzICkgPT4ge1xuXHRjb25zdCB7IGdldFF1ZXJ5U3RyaW5nLCBtb2RlbE5hbWUsIHNlbGVjdENvbmZpZ3VyYXRpb24gfSA9IG93blByb3BzO1xuXHRjb25zdCBxdWVyeVN0cmluZyA9IGdldFF1ZXJ5U3RyaW5nKCBvd25Qcm9wcy5xdWVyeURhdGEgKTtcblx0Y29uc3QgeyBnZXRJdGVtcywgaXNSZXF1ZXN0aW5nSXRlbXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vbGlzdHMnICk7XG5cdHJldHVybiB7XG5cdFx0Li4uTW9kZWxTZWxlY3QuZGVmYXVsdFByb3BzLFxuXHRcdC4uLm93blByb3BzLFxuXHRcdG1vZGVsRW50aXRpZXM6IGdldEl0ZW1zKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nICksXG5cdFx0c2VsZWN0Q29uZmlndXJhdGlvbjoge1xuXHRcdFx0Li4uTW9kZWxTZWxlY3QuZGVmYXVsdFByb3BzLnNlbGVjdENvbmZpZ3VyYXRpb24sXG5cdFx0XHQuLi5zZWxlY3RDb25maWd1cmF0aW9uLFxuXHRcdFx0aXNMb2FkaW5nOiBpc1JlcXVlc3RpbmdJdGVtcyggbW9kZWxOYW1lLCBxdWVyeVN0cmluZyApLFxuXHRcdH0sXG5cdH07XG59ICkoIE1vZGVsU2VsZWN0ICk7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IE1vZGVsU2VsZWN0IGZyb20gJy4uL21vZGVsLXNlbGVjdCc7XG5pbXBvcnQgKiBhcyBkYXRldGltZU1vZGVsIGZyb20gJy4uLy4uLy4uLy4uL2RhdGEvbW9kZWwvZGF0ZXRpbWUnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBTZWxlY3QgQ29tcG9uZW50IGZvciB0aGUgRGF0ZXRpbWUgTW9kZWwuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGV0aW1lU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGUgPSB7XG5cdFx0bW9kZWxOYW1lOiAnZGF0ZXRpbWUnLFxuXHR9O1xuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0c2VsZWN0Q29uZmlndXJhdGlvbjoge1xuXHRcdFx0bG9hZGluZ01lc3NhZ2U6ICgpID0+IF9fKCAnUmV0cmlldmluZyBEYXRldGltZXMuJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0bm9PcHRpb25zTWVzc2FnZTogKCkgPT4gX18oXG5cdFx0XHRcdCdObyBEYXRldGltZXMuJyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHRcdCksXG5cdFx0XHRwbGFjZWhvbGRlcjogX18oICdTZWxlY3QgRGF0ZXRpbWUuLi4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0fSxcblx0XHQuLi5kYXRldGltZU1vZGVsLmRlZmF1bHRRdWVyeURhdGEsXG5cdFx0Z2V0UXVlcnlTdHJpbmc6IGRhdGV0aW1lTW9kZWwuZ2V0UXVlcnlTdHJpbmcsXG5cdFx0c2VsZWN0TGFiZWw6IF9fKCAnU2VsZWN0IERhdGV0aW1lJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiBfXyggJ0FsbCBEYXRldGltZXMnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdH07XG5cblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHQuLi5kYXRldGltZU1vZGVsLnF1ZXJ5RGF0YVR5cGVzLFxuXHRcdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2VsZWN0ZWREYXRldGltZUlkOiBQcm9wVHlwZXMub25lT2ZUeXBlKCBbXG5cdFx0XHRQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRdICksXG5cdFx0b25EYXRldGltZVNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0c2VsZWN0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH07XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHsgc2VsZWN0ZWREYXRldGltZUlkLCBvbkRhdGV0aW1lU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHNlbGVjdE9wdHMgPSB7XG5cdFx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiB7XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogc2VsZWN0ZWREYXRldGltZUlkLFxuXHRcdFx0XHRvbkNoYW5nZTogb25EYXRldGltZVNlbGVjdCxcblx0XHRcdFx0Li4udGhpcy5wcm9wcy5zZWxlY3RDb25maWd1cmF0aW9uLFxuXHRcdFx0fSxcblx0XHR9O1xuXHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0Li4udGhpcy5wcm9wcyxcblx0XHRcdC4uLnNlbGVjdE9wdHMsXG5cdFx0XHQuLi50aGlzLnN0YXRlLFxuXHRcdH07XG5cdFx0cmV0dXJuIDxNb2RlbFNlbGVjdCB7IC4uLnByb3BzIH0gLz47XG5cdH1cbn1cbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgTW9kZWxTZWxlY3QgZnJvbSAnLi4vbW9kZWwtc2VsZWN0JztcbmltcG9ydCAqIGFzIGV2ZW50TW9kZWwgZnJvbSAnLi4vLi4vLi4vLi4vZGF0YS9tb2RlbC9ldmVudCc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogU2VsZWN0IENvbXBvbmVudCBmb3IgdGhlIEV2ZW50IE1vZGVsLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG5cdHN0YXRlID0ge1xuXHRcdG1vZGVsTmFtZTogJ2V2ZW50Jyxcblx0fTtcblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuXHRcdHNlbGVjdENvbmZpZ3VyYXRpb246IHtcblx0XHRcdGxvYWRpbmdNZXNzYWdlOiAoKSA9PiBfXyggJ1JldHJpZXZpbmcgRXZlbnRzLicsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdG5vT3B0aW9uc01lc3NhZ2U6ICgpID0+IF9fKFxuXHRcdFx0XHQnTm8gRXZlbnRzLicsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0cGxhY2Vob2xkZXI6IF9fKCAnU2VsZWN0IEV2ZW50Li4uJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdH0sXG5cdFx0Li4uZXZlbnRNb2RlbC5kZWZhdWx0UXVlcnlEYXRhLFxuXHRcdGdldFF1ZXJ5U3RyaW5nOiBldmVudE1vZGVsLmdldFF1ZXJ5U3RyaW5nLFxuXHRcdHNlbGVjdExhYmVsOiBfXyggJ1NlbGVjdCBFdmVudCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0fTtcblxuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdC4uLmV2ZW50TW9kZWwucXVlcnlEYXRhVHlwZXMsXG5cdFx0c2VsZWN0ZWRFdmVudElkOiBQcm9wVHlwZXMub25lT2ZUeXBlKCBbXG5cdFx0XHRQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRdICksXG5cdFx0b25FdmVudFNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0c2VsZWN0TGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH07XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHsgc2VsZWN0ZWRFdmVudElkLCBvbkV2ZW50U2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHNlbGVjdE9wdHMgPSB7XG5cdFx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiB7XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogc2VsZWN0ZWRFdmVudElkLFxuXHRcdFx0XHRvbkNoYW5nZTogb25FdmVudFNlbGVjdCxcblx0XHRcdFx0Li4udGhpcy5wcm9wcy5zZWxlY3RDb25maWd1cmF0aW9uLFxuXHRcdFx0fSxcblx0XHR9O1xuXHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0Li4udGhpcy5wcm9wcyxcblx0XHRcdC4uLnNlbGVjdE9wdHMsXG5cdFx0XHQuLi50aGlzLnN0YXRlLFxuXHRcdH07XG5cdFx0cmV0dXJuIDxNb2RlbFNlbGVjdCB7IC4uLnByb3BzIH0gLz47XG5cdH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRXZlbnRTZWxlY3QgfSBmcm9tICcuL2V2ZW50JztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBEYXRldGltZVNlbGVjdCB9IGZyb20gJy4vZGF0ZXRpbWUnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRpY2tldFNlbGVjdCB9IGZyb20gJy4vdGlja2V0JztcclxuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBNb2RlbFNlbGVjdCBmcm9tICcuLi9tb2RlbC1zZWxlY3QnO1xuaW1wb3J0ICogYXMgdGlja2V0TW9kZWwgZnJvbSAnLi4vLi4vLi4vLi4vZGF0YS9tb2RlbC90aWNrZXQnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBTZWxlY3QgQ29tcG9uZW50IGZvciB0aGUgVGlja2V0IE1vZGVsLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXRTZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0ZSA9IHtcblx0XHRtb2RlbE5hbWU6ICd0aWNrZXQnLFxuXHR9O1xuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0c2VsZWN0Q29uZmlndXJhdGlvbjoge1xuXHRcdFx0bG9hZGluZ01lc3NhZ2U6ICgpID0+IF9fKCAnUmV0cmlldmluZyBUaWNrZXRzLicsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdG5vT3B0aW9uc01lc3NhZ2U6ICgpID0+IF9fKCAnTm8gVGlja2V0cy4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRwbGFjZWhvbGRlcjogX18oICdTZWxlY3QgVGlja2V0Li4uJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdH0sXG5cdFx0Li4udGlja2V0TW9kZWwuZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRnZXRRdWVyeVN0cmluZzogdGlja2V0TW9kZWwuZ2V0UXVlcnlTdHJpbmcsXG5cdFx0c2VsZWN0TGFiZWw6IF9fKCAnU2VsZWN0IFRpY2tldCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRhZGRBbGxPcHRpb25MYWJlbDogX18oICdBbGwgVGlja2V0cycsICdldmVudF9lc3ByZXNzbycgKSxcblx0fTtcblxuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdC4uLnRpY2tldE1vZGVsLnF1ZXJ5RGF0YVR5cGVzLFxuXHRcdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0Zm9yRGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzZWxlY3RlZFRpY2tldElkOiBQcm9wVHlwZXMub25lT2ZUeXBlKCBbXG5cdFx0XHRQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRdICksXG5cdFx0b25UaWNrZXRTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuXHRcdHNlbGVjdExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR9O1xuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7IHNlbGVjdGVkVGlja2V0SWQsIG9uVGlja2V0U2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHNlbGVjdE9wdHMgPSB7XG5cdFx0XHRzZWxlY3RDb25maWd1cmF0aW9uOiB7XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogc2VsZWN0ZWRUaWNrZXRJZCxcblx0XHRcdFx0b25DaGFuZ2U6IG9uVGlja2V0U2VsZWN0LFxuXHRcdFx0XHQuLi50aGlzLnByb3BzLnNlbGVjdENvbmZpZ3VyYXRpb24sXG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHQuLi50aGlzLnByb3BzLFxuXHRcdFx0Li4uc2VsZWN0T3B0cyxcblx0XHRcdC4uLnRoaXMuc3RhdGUsXG5cdFx0fTtcblx0XHRyZXR1cm4gPE1vZGVsU2VsZWN0IHsgLi4ucHJvcHMgfSAvPjtcblx0fVxufVxuIiwiLy8gcXVlcnkgY29tcG9uZW50c1xuZXhwb3J0IHsgUXVlcnlMaW1pdCB9IGZyb20gJy4vcXVlcnkvbGltaXQnO1xuLy8gc2VsZWN0aW9uIGNvbXBvbmVudHNcbmV4cG9ydCAqIGZyb20gJy4vZm9ybS9zZWxlY3QnO1xuZXhwb3J0IHtcblx0ZGVmYXVsdCBhcyBSZWdpc3RyYXRpb25TdGF0dXNTZWxlY3QsXG59IGZyb20gJy4vc2VsZWN0aW9uL3JlZ2lzdHJhdGlvbi1zdGF0dXMtc2VsZWN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGlja2V0U2VsZWN0IH0gZnJvbSAnLi9zZWxlY3Rpb24vdGlja2V0LXNlbGVjdCc7XG5cbi8vIGdlbmVyYWwgdWkgY29tcG9uZW50c1xuZXhwb3J0ICogZnJvbSAnLi91aSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqKi9cbmltcG9ydCB7IFJhbmdlQ29udHJvbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5cbmNvbnN0IERFRkFVTFRfTElNSVQgPSAxMDtcbmNvbnN0IERFRkFVTFRfTEFCRUwgPSBfXyggJ0xpbWl0JywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuY29uc3QgREVGQVVMVF9NSU4gPSAxO1xuY29uc3QgREVGQVVMVF9NQVggPSAxMDA7XG5cbmV4cG9ydCBjb25zdCBRdWVyeUxpbWl0ID0gKCB7XG5cdG9uTGltaXRDaGFuZ2UsXG5cdGxpbWl0ID0gREVGQVVMVF9MSU1JVCxcblx0bGFiZWwgPSBERUZBVUxUX0xBQkVMLFxuXHRtaW4gPSBERUZBVUxUX01JTixcblx0bWF4ID0gREVGQVVMVF9NQVgsXG59ICkgPT4ge1xuXHRyZXR1cm4gISBvbkxpbWl0Q2hhbmdlID8gKFxuXHRcdG51bGxcblx0KSA6IChcblx0XHQ8UmFuZ2VDb250cm9sXG5cdFx0XHRrZXk9eyAncXVlcnktbGltaXQnIH1cblx0XHRcdHZhbHVlPXsgbGltaXQgfVxuXHRcdFx0bGFiZWw9eyBsYWJlbCB9XG5cdFx0XHRtaW49eyBtaW4gfVxuXHRcdFx0bWF4PXsgbWF4IH1cblx0XHRcdG9uQ2hhbmdlPXsgb25MaW1pdENoYW5nZSB9XG5cdFx0Lz5cblx0KTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICdxdWVyeXN0cmluZ2lmeSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgcGlja0J5LCBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgUGxhY2Vob2xkZXIsIFNlbGVjdENvbnRyb2wsIFNwaW5uZXIgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgd2l0aFNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgcmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0T3B0aW9ucyB9IGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogUmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0IGNvbXBvbmVudC5cbiAqIEdlbmVyYXRlcyBhIHJlZ2lzdHJhdGlvbiBzdGF0dXMgc2VsZWN0IGlucHV0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZ1N0YXR1c2VzICAgICAgICAgICBBbiBlbXB0eSBhcnJheSBvciBhcnJheSBvZiBTdGF0dXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50aXRpZXMuIFNlZSBwcm9wLXR5cGVzIGZvciBzaGFwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uUmVnU3RhdHVzU2VsZWN0ICAgIFRoZSBjYWxsYmFjayBvbiBzZWxlY3Rpb24gb2YgdGlja2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdExhYmVsICAgICAgICBUaGUgbGFiZWwgZm9yIHRoZSBzZWxlY3QgaW5wdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VsZWN0ZWRSZWdTdGF0dXNJZCAgVGhlIElEIG9mIHRoZSB0aWNrZXQgdG8gcHJlLXNlbGVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMb2FkaW5nICAgICAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHNlbGVjdG9yIHNob3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCBpbiBhIGxvYWRpbmcgc3RhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgICAgICAgICAgICAgICAgICAgQSBwdXJlIGNvbXBvbmVudCBmdW5jdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBSZWdpc3RyYXRpb25TdGF0dXNTZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdHJlZ1N0YXR1c2VzOiBQcm9wVHlwZXMuYXJyYXlPZiggUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0XHRTVFNfSUQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdFNUU19jb2RlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0fSApICksXG5cdFx0b25SZWdTdGF0dXNTZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuXHRcdHNlbGVjdExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlbGVjdGVkUmVnU3RhdHVzSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0aXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRhZGRBbGxPcHRpb246IFByb3BUeXBlcy5ib29sLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGF0dHJpYnV0ZXM6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRvcmRlckJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggWyAnYXNjJywgJ2Rlc2MnIF0gKSxcblx0XHR9ICksXG5cdH07XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRyZWdTdGF0dXNlczogW10sXG5cdFx0c2VsZWN0TGFiZWw6IF9fKCAnU2VsZWN0IFJlZ2lzdHJhdGlvbiBTdGF0dXMnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0c2VsZWN0ZWRSZWdTdGF0dXNJZDogMCxcblx0XHRpc0xvYWRpbmc6IHRydWUsXG5cdFx0YWRkQWxsT3B0aW9uOiB0cnVlLFxuXHRcdGFkZEFsbE9wdGlvbkxhYmVsOiBfXyggJ0FsbCBSZWdpc3RyYXRpb24gU3RhdHVzZXMnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0bGltaXQ6IDI1LFxuXHRcdFx0b3JkZXJCeTogJ1NUU19jb2RlJyxcblx0XHRcdG9yZGVyOiAnZGVzYycsXG5cdFx0fSxcblx0fTtcblxuXHRwbGFjZUhvbGRlcigpIHtcblx0XHRjb25zdCB7IGlzTG9hZGluZywgc2VsZWN0TGFiZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxGcmFnbWVudD5cblx0XHRcdFx0PFBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0aWNvbj1cImNsaXBib2FyZFwiXG5cdFx0XHRcdFx0bGFiZWw9eyBzZWxlY3RMYWJlbCB9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7IGlzTG9hZGluZyA/XG5cdFx0XHRcdFx0XHQ8U3Bpbm5lciAvPiA6XG5cdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0J0Vycm9yIGxvYWRpbmcgUmVnaXN0cmF0aW9uIFN0YXR1c2VzIScsXG5cdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0PC9GcmFnbWVudD5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdHJlZ1N0YXR1c2VzLFxuXHRcdFx0c2VsZWN0TGFiZWwsXG5cdFx0XHRzZWxlY3RlZFJlZ1N0YXR1c0lkLFxuXHRcdFx0b25SZWdTdGF0dXNTZWxlY3QsXG5cdFx0XHRhZGRBbGxPcHRpb24sXG5cdFx0XHRhZGRBbGxPcHRpb25MYWJlbCxcblx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAoIGlzRW1wdHkoIHJlZ1N0YXR1c2VzICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wbGFjZUhvbGRlcigpO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEZyYWdtZW50PlxuXHRcdFx0XHQ8U2VsZWN0Q29udHJvbFxuXHRcdFx0XHRcdGxhYmVsPXsgc2VsZWN0TGFiZWwgfVxuXHRcdFx0XHRcdHZhbHVlPXsgc2VsZWN0ZWRSZWdTdGF0dXNJZCB9XG5cdFx0XHRcdFx0b3B0aW9ucz17XG5cdFx0XHRcdFx0XHRyZWdpc3RyYXRpb25TdGF0dXNTZWxlY3RPcHRpb25zKFxuXHRcdFx0XHRcdFx0XHRyZWdTdGF0dXNlcyxcblx0XHRcdFx0XHRcdFx0YWRkQWxsT3B0aW9uLFxuXHRcdFx0XHRcdFx0XHRhZGRBbGxPcHRpb25MYWJlbCxcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyBvblJlZ1N0YXR1c1NlbGVjdCB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgUmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0IENvbXBvbmVudCB3cmFwcGVkIGluIHRoZSBgd2l0aFNlbGVjdGAgaGlnaGVyXG4gKiBvcmRlciBjb21wb25lbnQuIFRoaXMgc3Vic2NyaWJlcyB0aGUgUmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0IGNvbXBvbmVudCB0b1xuICogdGhlIHN0YXRlIG1haW50YWluZWQgdmlhIHRoZSBldmVudGVzcHJlc3NvL2xpc3RzIHN0b3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCB3aXRoU2VsZWN0KCAoIHNlbGVjdCwgb3duUHJvcHMgKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRhdHRyaWJ1dGVzID0gUmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0LmRlZmF1bHRQcm9wcy5hdHRyaWJ1dGVzLFxuXHR9ID0gb3duUHJvcHM7XG5cdGNvbnN0IHtcblx0XHRzZWxlY3RlZFJlZ1N0YXR1c0lkLFxuXHRcdGFkZEFsbE9wdGlvbixcblx0XHRhZGRBbGxPcHRpb25MYWJlbCxcblx0fSA9IG93blByb3BzO1xuXHRjb25zdCB7XG5cdFx0Z2V0UmVnaXN0cmF0aW9uU3RhdHVzcyxcblx0XHRpc1JlcXVlc3RpbmdSZWdpc3RyYXRpb25TdGF0dXNzLFxuXHR9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9saXN0cycgKTtcblx0Y29uc3QgcXVlcnlBcmdzID0ge1xuXHRcdGxpbWl0OiBhdHRyaWJ1dGVzLmxpbWl0LFxuXHRcdG9yZGVyOiBhdHRyaWJ1dGVzLm9yZGVyLFxuXHRcdG9yZGVyX2J5OiBhdHRyaWJ1dGVzLm9yZGVyQnksXG5cdH07XG5cdGNvbnN0IHF1ZXJ5U3RyaW5nID0gc3RyaW5naWZ5KCBwaWNrQnkoIHF1ZXJ5QXJncyxcblx0XHR2YWx1ZSA9PiAhIGlzVW5kZWZpbmVkKCB2YWx1ZSApLFxuXHQpICk7XG5cdHJldHVybiB7XG5cdFx0cmVnU3RhdHVzZXM6IGdldFJlZ2lzdHJhdGlvblN0YXR1c3MoIHF1ZXJ5U3RyaW5nICksXG5cdFx0aXNMb2FkaW5nOiBpc1JlcXVlc3RpbmdSZWdpc3RyYXRpb25TdGF0dXNzKCBxdWVyeVN0cmluZyApLFxuXHRcdHNlbGVjdGVkUmVnU3RhdHVzSWQ6IHNlbGVjdGVkUmVnU3RhdHVzSWQsXG5cdFx0YWRkQWxsT3B0aW9uOiBhZGRBbGxPcHRpb24sXG5cdFx0YWRkQWxsT3B0aW9uTGFiZWw6IGFkZEFsbE9wdGlvbkxhYmVsLFxuXHR9O1xufSApKCBSZWdpc3RyYXRpb25TdGF0dXNTZWxlY3QgKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHJlZHVjZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBFRV9PUFRJT05fUkVHX1NUQVRVU19TRUxFQ1RfQUxMID0gJ0FMTF9SRUdfU1RBVFVTRVMnO1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIGFycmF5IG9mIHJlZ2lzdHJhdGlvbiBzdGF0dXMgZW50aXRpZXNcbiAqIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHNpbXBsZSBvYmplY3RzXG4gKiB0aGF0IGNhbiBiZSBwYXNzZWQgYWxvbmcgdG8gdGhlIG9wdGlvbnMgYXJyYXlcbiAqIHVzZWQgZm9yIHRoZSBXb3JkUHJlc3MgU2VsZWN0Q29udHJvbCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSByZWdTdGF0dXNlcyAgICAgICAgQW4gYXJyYXkgb2YgcmVnaXN0cmF0aW9uIHN0YXR1cyBlbnRpdGllc1xuICogQHBhcmFtIHsgYm9vbGVhbiB9IGFkZEFsbE9wdGlvbiAgICAgSWYgdHJ1ZSwgd2lsbCBwcmVwZW5kIG9wdGlvbnMgYXJyYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYW4gXCJBTExcIiBvcHRpb24gbWVhbmluZyB0aGF0IGFsbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXMgYXJlIGVzc2VudGlhbGx5IHNlbGVjdGVkXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBhZGRBbGxPcHRpb25MYWJlbCBsYWJlbCBkaXNwbGF5ZWQgZm9yIFwiQUxMXCIgb3B0aW9uXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgICAgICAgICAgICAgICAgICBSZXR1cm5zIGFuIGFycmF5IG9mIHNpbXBsZSBvYmplY3RzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWQgZm9yIHRoZSBXb3JkUHJlc3NcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdENvbnRyb2wgY29tcG9uZW50LlxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0cmF0aW9uU3RhdHVzU2VsZWN0T3B0aW9ucyA9IChcblx0cmVnU3RhdHVzZXMsXG5cdGFkZEFsbE9wdGlvbixcblx0YWRkQWxsT3B0aW9uTGFiZWwsXG4pID0+IHtcblx0Y29uc3QgcmVnU3RhdHVzT3B0aW9ucyA9IHJlZHVjZShcblx0XHRyZWdTdGF0dXNlcyxcblx0XHRmdW5jdGlvbiggb3B0aW9ucywgc3RhdHVzICkge1xuXHRcdFx0b3B0aW9ucy5wdXNoKFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dmFsdWU6IHN0YXR1cy5TVFNfSUQsXG5cdFx0XHRcdFx0bGFiZWw6IHN0YXR1cy5TVFNfY29kZSxcblx0XHRcdFx0fSxcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9LFxuXHRcdFtdLFxuXHQpO1xuXHRpZiAoIGFkZEFsbE9wdGlvbiA9PT0gdHJ1ZSApIHtcblx0XHRyZWdTdGF0dXNPcHRpb25zLnVuc2hpZnQoIHtcblx0XHRcdHZhbHVlOiBFRV9PUFRJT05fUkVHX1NUQVRVU19TRUxFQ1RfQUxMLFxuXHRcdFx0bGFiZWw6IGFkZEFsbE9wdGlvbkxhYmVsLFxuXHRcdH0gKTtcblx0fVxuXHRyZXR1cm4gcmVnU3RhdHVzT3B0aW9ucztcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEF2YXRhckltYWdlXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYXZhdGFyVXJsICAgICAgICBncmF2YXRhciBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmF0YXJDbGFzc1x0XHRiYXNlIENTUyBjbGFzcyB0byBhcHBseVxuICogQHBhcmFtIHtudW1iZXJ9IGF2YXRhckhlaWdodFx0XHRpbWFnZSBoZWlnaHQgKGRlZmF1bHQgPSAzMnB4KVxuICogQHBhcmFtIHtudW1iZXJ9IGF2YXRhcldpZHRoIFx0XHRpbWFnZSB3aWR0aCAoZGVmYXVsdCA9IDMycHgpXG4gKiBAcGFyYW0ge3N0cmluZ30gYXZhdGFyQWx0VGV4dFx0aW1hZ2UgYWx0IHRleHRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgXHRcdFx0XHRBIHB1cmUgY29tcG9uZW50IGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgQXZhdGFySW1hZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdGF2YXRhclVybDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRhdmF0YXJDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRhdmF0YXJIZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0YXZhdGFyV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0YXZhdGFyQWx0VGV4dDogUHJvcFR5cGVzLnN0cmluZyxcblx0fTtcblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRhdmF0YXJVcmw6ICcnLFxuXHRcdGF2YXRhckNsYXNzOiAnY29udGFjdCcsXG5cdFx0YXZhdGFySGVpZ2h0OiAzMixcblx0XHRhdmF0YXJXaWR0aDogMzIsXG5cdFx0YXZhdGFyQWx0VGV4dDogX18oICd1c2VyIGF2YXRhcicsICdldmVudF9lc3ByZXNzbycgKSxcblx0fTtcblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGF2YXRhclVybCxcblx0XHRcdGF2YXRhckNsYXNzLFxuXHRcdFx0YXZhdGFySGVpZ2h0LFxuXHRcdFx0YXZhdGFyV2lkdGgsXG5cdFx0XHRhdmF0YXJBbHRUZXh0LFxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXHRcdHJldHVybiBhdmF0YXJVcmwgPyAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17IGF2YXRhckNsYXNzICsgJy1pbWFnZS13cmFwLWRpdicgfT5cblx0XHRcdFx0PGltZ1xuXHRcdFx0XHRcdGNsYXNzTmFtZT17IGF2YXRhckNsYXNzICsgJy1hdmF0YXItaW1nIGF2YXRhcicgfVxuXHRcdFx0XHRcdHNyYz17IGF2YXRhclVybCB9XG5cdFx0XHRcdFx0aGVpZ2h0PXsgYXZhdGFySGVpZ2h0IH1cblx0XHRcdFx0XHR3aWR0aD17IGF2YXRhcldpZHRoIH1cblx0XHRcdFx0XHRhbHQ9eyBhdmF0YXJBbHRUZXh0IH1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCkgOiAoXG5cdFx0XHRudWxsXG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgaXNVbmRlZmluZWQsIHBpY2tCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICdxdWVyeXN0cmluZ2lmeSc7XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IHdoZXJlQ29uZGl0aW9ucyAgQSBmdW5jdGlvbiBmb3IgcHJlcHBpbmcgdGhlIHdoZXJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbnMgZnJvbSB0aGUgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSBtYXBPcmRlckJ5XHRcdEEgZnVuY3Rpb24gZm9yIG1hcHBpbmcgaW5jb21pbmcgb3JkZXJfYnlcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaW5ncyB0byB0aGUgdmFsdWUgbmVlZGVkIGZvciB0aGVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cXVlcnlfc3RyaW5nLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9IChcblx0cXVlcnlEYXRhID0ge30sXG5cdHdoZXJlQ29uZGl0aW9ucyA9ICgpID0+IG51bGwsXG5cdG1hcE9yZGVyQnkgPSBvcmRlckJ5ID0+IG9yZGVyQnksXG4pID0+IHtcblx0Y29uc3Qgd2hlcmUgPSB3aGVyZUNvbmRpdGlvbnMoIHF1ZXJ5RGF0YSApO1xuXHRjb25zdCB7IGxpbWl0LCBvcmRlciwgb3JkZXJCeSB9ID0gcXVlcnlEYXRhO1xuXHRjb25zdCBxdWVyeUFyZ3MgPSB7XG5cdFx0bGltaXQsXG5cdFx0b3JkZXIsXG5cdFx0b3JkZXJfYnk6IG1hcE9yZGVyQnkoIG9yZGVyQnkgKSxcblx0fTtcblx0bGV0IHF1ZXJ5U3RyaW5nID0gc3RyaW5naWZ5KFxuXHRcdHBpY2tCeSggcXVlcnlBcmdzLCB2YWx1ZSA9PiAhIGlzVW5kZWZpbmVkKCB2YWx1ZSApICksXG5cdCk7XG5cdGlmICggd2hlcmUgKSB7XG5cdFx0cXVlcnlTdHJpbmcgKz0gJyYnICsgd2hlcmU7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0FTQyA9ICdBU0MnO1xuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0RFU0MgPSAnREVTQyc7XG5leHBvcnQgY29uc3QgQUxMT1dFRF9PUkRFUl9WQUxVRVMgPSBbICdhc2MnLCAnZGVzYycsICdBU0MnLCAnREVTQycgXTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdEVFRfbmFtZScsXG5cdFx0XHQnRFRUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RUVF9FVlRfZW5kJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICBJRCBmb3IgRXZlbnQgdG8gcmV0cmlldmUgZGF0ZXRpbWVzIGZyb21cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguICBDYW4gYmUgYW55XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0c2hvd0V4cGlyZWQgPSB0cnVlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGNvbnN0IEdSRUFURVJfQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPj0nICk7XG5cdGNvbnN0IExFU1NfQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPD0nICk7XG5cblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0+JndoZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKSApO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdEdSRUFURVJfQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpICk7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0TEVTU19BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKSApO1xuXHR9XG5cdGlmICggcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICkgIT09IDAgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0V2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGVuZHBvaW50cyB9IGZyb20gJy4vZW5kcG9pbnRzLmpzJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDogW10gfVxuICovXG5jb25zdCBtYXBUb0FycmF5VmFsdWVzID0gbW9kZWxOYW1lRW5kcG9pbnRzID0+IHtcblx0cmV0dXJuIG1hcFZhbHVlcyggbW9kZWxOYW1lRW5kcG9pbnRzLFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH0sXG5cdCk7XG59O1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIG9iamVjdCBtYXAgb2YgbW9kZWxOYW1lIHRvIGVuZHBvaW50IGFuZCBtYXBzIHRoYXQgdG8gYSBkZWZhdWx0XG4gKiBtYXAgb2YgbW9kZWxOYW1lIHRvIGVtcHR5IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDoge30gfVxuICovXG5jb25zdCBtYXBUb09iamVjdFZhbHVlcyA9IG1vZGVsTmFtZUVuZHBvaW50cyA9PiB7XG5cdHJldHVybiBtYXBWYWx1ZXMoIG1vZGVsTmFtZUVuZHBvaW50cyxcblx0XHRmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9LFxuXHQpO1xufTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHN0b3JlcyBjb250YWluaW5nIGxpc3RzLlxuICpcbiAqIEB0eXBlIHsgT2JqZWN0IH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElTVFNfU1RBVEUgPSBtYXBUb0FycmF5VmFsdWVzKCBlbmRwb2ludHMgKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBjb3JlIHN0b3JlLlxuICpcbiAqIEB0eXBlIHt7ZW50aXRpZXM6IHt9LCBlbnRpdHlJZHM6IHt9LCBkaXJ0eToge319fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT1JFX1NUQVRFID0ge1xuXHRlbnRpdGllczoge1xuXHRcdC4uLm1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKSxcblx0fSxcblx0ZW50aXR5SWRzOiB7XG5cdFx0Li4uREVGQVVMVF9MSVNUU19TVEFURSxcblx0fSxcblx0ZGlydHk6IHtcblx0XHQuLi5ERUZBVUxUX0xJU1RTX1NUQVRFLFxuXHR9LFxufTtcblxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbGlkYXRlRW50aXR5SGFzS2V5IH0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBBbGwgYXZhaWxhYmxlIGVuZHBvaW50cyBleHBvc2VkIHZpYSB0aGUgZWVqcy5kYXRhIGdsb2JhbCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBjb2xsZWN0aW9uX2VuZHBvaW50czogZW5kcG9pbnRzID0ge30gfSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdG8gcmV0cmlldmUgdGhlIGVuZHBvaW50IGZvci5cbiAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW5kcG9pbnQgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0dmFsaWRhdGVFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgZW5kcG9pbnRzICk7XG5cdHJldHVybiBlbmRwb2ludHNbIG1vZGVsTmFtZSBdO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBxdWVyeVN0cmluZyB0byB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0aGUgZmluYWwgc3RyaW5nIGlzIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyAgVGhlIHF1ZXJ5IGJlaW5nIGFwcGVuZGVkIHRvIHRoZSBlbmRwb2ludC5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGZpbmFsIGFzc2VtYmxlZCBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseVF1ZXJ5U3RyaW5nID0gKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nICkgPT4ge1xuXHRyZXR1cm4gZ2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApICsgJz8nICsgcXVlcnlTdHJpbmc7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J0VWVF9uYW1lJyxcblx0XHRcdCdFVlRfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRcdCd0aWNrZXRfc3RhcnQnLFxuXHRcdFx0J3RpY2tldF9lbmQnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRjYXRlZ29yeVNsdWc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfc3RhcnQnLFxuXHRcdGVuZF9kYXRlOiAnRGF0ZXRpbWUuRFRUX0VWVF9lbmQnLFxuXHRcdHRpY2tldF9zdGFydDogJ0RhdGV0aW1lLlRpY2tldC5US1Rfc3RhcnRfZGF0ZScsXG5cdFx0dGlja2V0X2VuZDogJ0RhdGV0aW1lLlRpY2tldC5US1RfZW5kX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeVNsdWcgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBjYXRlZ29yeVNsdWdcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBtb250aC4gIENhbiBiZSBhbnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7IHNob3dFeHBpcmVkID0gdHJ1ZSwgY2F0ZWdvcnlTbHVnLCBtb250aCA9ICdub25lJyB9ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRjb25zdCBHUkVBVEVSX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJz49JyApO1xuXHRjb25zdCBMRVNTX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJzw9JyApO1xuXG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109PiZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KCkgKTtcblx0fVxuXHRpZiAoIGNhdGVnb3J5U2x1ZyApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVGVybV9SZWxhdGlvbnNoaXAuVGVybV9UYXhvbm9teS5UZXJtLnNsdWddPScgKyBjYXRlZ29yeVNsdWcgKTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRHUkVBVEVSX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKSApO1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdExFU1NfQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KCkgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vZGVmYXVsdC1tb2RlbC1zdGF0ZSc7XG5leHBvcnQgKiBmcm9tICcuL2VuZHBvaW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3ByaW1hcnkta2V5cyc7XG5leHBvcnQgKiBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC1uYW1lcyc7XG5leHBvcnQgKiBmcm9tICcuL2Jhc2UnO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHByaW1hcnlLZXlzIH0gZnJvbSAnLi9wcmltYXJ5LWtleXMuanMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsga2V5cyB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtb2RlbCBuYW1lcyBjdXJyZW50bHkgZXhwb3NlZCBmb3IgUkVTVCBBUEkgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ga2V5cyggcHJpbWFyeUtleXMgKTtcblxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCByZWR1Y2UsIHRyaW1FbmQsIGtleUJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHR2YWxpZGF0ZUVudGl0eUhhc0tleSxcblx0dmFsaWRhdGVJc0FycmF5LFxuXHR2YWxpZGF0ZUlzTm90RW1wdHksXG59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogRXhwb3NlcyBhIG1hcCBvZiBtb2RlbG5hbWUgdG8gcHJpbWFyeSBrZXkgZXhwb3NlZCBieSB0aGUgZWVqcy5kYXRhIGdsb2JhbFxuICogdmlhIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBwcmltYXJ5X2tleXM6IHByaW1hcnlLZXlzID0ge30gfSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWVzIGZvciB0aGUgZ2l2ZW4ga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgY29tYmluZWQgcHJpbWFyeSBrZXlzXG4gKiAoZGVsaXZlcmVkIGFzIGFuIGFycmF5KS5cbiAqXG4gKiBAdHlwZSB7IG1lbW9pemVkIH1cbiAqIEByZXR1cm4geyBzdHJpbmcgfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzID0gbWVtb2l6ZSggKCBrZXlzLCBlbnRpdHkgKSA9PiB7XG5cdHZhbGlkYXRlSXNBcnJheSgga2V5cyApO1xuXHRjb25zdCBwcmltYXJ5S2V5ID0gcmVkdWNlKCBrZXlzLCBmdW5jdGlvbiggcmVzdWx0LCBrZXkgKSB7XG5cdFx0dmFsaWRhdGVFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdFx0cmV0dXJuIGVudGl0eVsgcmVzdWx0IF0gKyAnOicgKyBlbnRpdHlbIGtleSBdO1xuXHR9ICk7XG5cdHJldHVybiB0cmltRW5kKCBwcmltYXJ5S2V5LCAnOicgKTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgb25seSBvbmUgcHJpbWFyeSBrZXkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IG51bWJlciB9IFRoZSB2YWx1ZSBmb3IgdGhlIGtleSBpbiB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZUZvclByaW1hcnlLZXkgPSBtZW1vaXplKCAoIGtleSwgZW50aXR5ICkgPT4ge1xuXHR2YWxpZGF0ZUVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0cmV0dXJuIGVudGl0eVsga2V5IF07XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJpbWFyeSBrZXkgKG9yIGNvbWJpbmVkIHByaW1hcnkga2V5cykgZnJvbSB0aGUgYXZhaWxhYmxlIGRhdGEuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IHN0cmluZ3xBcnJheSB9XG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXkgPSBtZW1vaXplKCAoIG1vZGVsTmFtZSApID0+IHtcblx0dmFsaWRhdGVFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgcHJpbWFyeUtleXMgKTtcblx0cmV0dXJuIHByaW1hcnlLZXlzWyBtb2RlbE5hbWUgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBwcmltYXJ5IGtleXMgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgSWYgdGhlIG1vZGVsIGhhcyBvbmx5IG9uZSBwcmltYXJ5IGtleSB0aGVuIHRoZSB2YWx1ZSB3aWxsXG4gKiBiZSBhIHNpbXBsZSBzdHJpbmcuICBJZiB0aGUgbW9kZWwgaGFzIGNvbWJpbmVkIHByaW1hcnkga2V5cywgdGhlbiB0aGUgdmFsdWVcbiAqIHdpbGwgYmUgYXMgc3RyaW5nIGluIHRoZSBmb3JtYXQgYCVzLiVzYCBmb3IgdGhlIHByaW1hcnkga2V5IHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyA9IG1lbW9pemUoICggbW9kZWxOYW1lLCBlbnRpdHkgKSA9PiB7XG5cdGNvbnN0IGtleXMgPSBnZXRQcmltYXJ5S2V5KCBtb2RlbE5hbWUgKTtcblx0cmV0dXJuIGlzQXJyYXkoIGtleXMgKSA/XG5cdFx0dmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cygga2V5cywgZW50aXR5ICkgOlxuXHRcdHZhbHVlRm9yUHJpbWFyeUtleSgga2V5cywgZW50aXR5ICk7XG59ICk7XG5cbi8qKlxuICogVGhpcyByZWNlaXZlcyBhbiBhcnJheSBvZiBlbnRpdGllcyBhbmQgcmV0dXJucyBhIGNvbGxlY3Rpb24gb2YgdGhvc2Ugc2FtZVxuICogZW50aXRpZXMgaW5kZXhlZCBieSB0aGUgcHJpbWFyeSBrZXkgdmFsdWUgZm9yIGVhY2ggZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1vZGVsTmFtZVxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllc1xuICogQHJldHVybiB7Kn0gIEEgY29sbGVjdGlvbiBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMgZm9yIGVhY2ggZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKCBtb2RlbE5hbWUsIGVudGl0aWVzID0gW10gKSA9PiB7XG5cdHZhbGlkYXRlSXNOb3RFbXB0eShcblx0XHRlbnRpdGllcyxcblx0XHRfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgYXJyYXkgb2YgZW50aXRpZXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpXG5cdCk7XG5cdHZhbGlkYXRlSXNBcnJheSggZW50aXRpZXMgKTtcblx0cmV0dXJuIGtleUJ5KCBlbnRpdGllcywgZnVuY3Rpb24oIGVudGl0eSApIHtcblx0XHRyZXR1cm4gU3RyaW5nKCBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzKCBtb2RlbE5hbWUsIGVudGl0eSApICk7XG5cdH0gKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnVEtUX25hbWUnLFxuXHRcdFx0J1RLVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgdGlja2V0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdGVuZF9kYXRlOiAnVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gdGlja2V0cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkIFx0V2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIHRpY2tldHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICAgICBSZXR1cm4gdGlja2V0cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiBDYW4gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkICAgIElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JEYXRldGltZUlkID0gMCxcblx0c2hvd0V4cGlyZWQgPSBmYWxzZSxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRjb25zdCBHUkVBVEVSX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJz49JyApO1xuXHRjb25zdCBMRVNTX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJzw9JyApO1xuXG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0+JyArXG5cdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgKyBHUkVBVEVSX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgKyBMRVNTX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZV1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5FdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRpZiAoIGZvckRhdGV0aW1lSWQgIT09IDAgJiYgISBpc05hTiggZm9yRGF0ZXRpbWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5EVFRfSURdPScgKyBmb3JEYXRldGltZUlkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBzcHJpbnRmLCBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGtleSBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIGVudGl0eSBvYmplY3QuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBrZXlcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eVxuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9ICBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCBlbnRpdHkgZG9lcyBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlIHRoZSBnaXZlbiBrZXkuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVudGl0eUhhc0tleSA9ICgga2V5LCBlbnRpdHksIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHByb3BlcnR5ICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0KSxcblx0XHRcdGVudGl0eSxcblx0XHRcdGtleSxcblx0XHQpO1xuXHR9XG5cdGlmICggISBlbnRpdHkuaGFzT3duUHJvcGVydHkoIGtleSApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gIG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlSXNBcnJheSA9ICggaXRlbXMsIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oICdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGFycmF5LicsICdldmVudF9lc3ByZXNzbycgKTtcblx0fVxuXHRpZiAoICEgaXNBcnJheSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGVtcHR5IG9yIG5vdC5cbiAqXG4gKiBDYWxsIHRoaXMgdmFsaWRhdG9yIHdoZW4geW91IHdhbnQgdG8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBOT1QgZW1wdHkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVtcHR5LlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJc05vdEVtcHR5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFbXB0eSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gbXVybXVyaGFzaDIgdmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvbXVybXVyaGFzaC1qcy9ibG9iL21hc3Rlci9tdXJtdXJoYXNoMl9nYy5qc1xuZnVuY3Rpb24gbXVybXVyaGFzaDJfMzJfZ2Moc3RyKSB7XG4gIHZhciBsID0gc3RyLmxlbmd0aCxcbiAgICAgIGggPSBsIF4gbCxcbiAgICAgIGkgPSAwLFxuICAgICAgaztcblxuICB3aGlsZSAobCA+PSA0KSB7XG4gICAgayA9IHN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZiB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgOCB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMTYgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDI0O1xuICAgIGsgPSAoayAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKCgoayA+Pj4gMTYpICogMHg1YmQxZTk5NSAmIDB4ZmZmZikgPDwgMTYpO1xuICAgIGsgXj0gayA+Pj4gMjQ7XG4gICAgayA9IChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChrID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG4gICAgaCA9IChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChoID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNikgXiBrO1xuICAgIGwgLT0gNDtcbiAgICArK2k7XG4gIH1cblxuICBzd2l0Y2ggKGwpIHtcbiAgICBjYXNlIDM6XG4gICAgICBoIF49IChzdHIuY2hhckNvZGVBdChpICsgMikgJiAweGZmKSA8PCAxNjtcblxuICAgIGNhc2UgMjpcbiAgICAgIGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4ZmYpIDw8IDg7XG5cbiAgICBjYXNlIDE6XG4gICAgICBoIF49IHN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZjtcbiAgICAgIGggPSAoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSAmIDB4ZmZmZikgPDwgMTYpO1xuICB9XG5cbiAgaCBePSBoID4+PiAxMztcbiAgaCA9IChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChoID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG4gIGggXj0gaCA+Pj4gMTU7XG4gIHJldHVybiAoaCA+Pj4gMCkudG9TdHJpbmcoMzYpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtdXJtdXJoYXNoMl8zMl9nYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiZnVuY3Rpb24gbWVtb2l6ZShmbikge1xuICB2YXIgY2FjaGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAoY2FjaGVbYXJnXSA9PT0gdW5kZWZpbmVkKSBjYWNoZVthcmddID0gZm4oYXJnKTtcbiAgICByZXR1cm4gY2FjaGVbYXJnXTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwidmFyIFYgPSBmdW5jdGlvbiBjYShXKSB7XG4gIGZ1bmN0aW9uIE0oZCwgYywgZiwgaCwgYSkge1xuICAgIGZvciAodmFyIGsgPSAwLCBiID0gMCwgdSA9IDAsIGwgPSAwLCBxLCBtLCBlLCBEID0gMCwgeSA9IDAsIHIsIEUgPSByID0gcSA9IDAsIG4gPSAwLCBKID0gbSA9IDAsIHQgPSAwLCBLID0gZi5sZW5ndGgsIEYgPSBLIC0gMSwgdywgZyA9IFwiXCIsIHAgPSBcIlwiLCBHID0gXCJcIiwgSCA9IFwiXCIsIEE7IG4gPCBLOykge1xuICAgICAgZSA9IGYuY2hhckNvZGVBdChuKTtcbiAgICAgIG4gPT09IEYgJiYgMCAhPT0gYiArIGwgKyB1ICsgayAmJiAoMCAhPT0gYiAmJiAoZSA9IDQ3ID09PSBiID8gMTAgOiA0NyksIGwgPSB1ID0gayA9IDAsIEsrKywgRisrKTtcblxuICAgICAgaWYgKDAgPT09IGIgKyBsICsgdSArIGspIHtcbiAgICAgICAgaWYgKG4gPT09IEYgJiYgKDAgPCBtICYmIChnID0gZy5yZXBsYWNlKE4sIFwiXCIpKSwgMCA8IGcudHJpbSgpLmxlbmd0aCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBjYXNlIDU5OlxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBnICs9IGYuY2hhckF0KG4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGUgPSA1OTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICAgIGNhc2UgMTIzOlxuICAgICAgICAgICAgZyA9IGcudHJpbSgpO1xuICAgICAgICAgICAgcSA9IGcuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIHIgPSAxO1xuXG4gICAgICAgICAgICBmb3IgKHQgPSArK247IG4gPCBLOykge1xuICAgICAgICAgICAgICBlID0gZi5jaGFyQ29kZUF0KG4pO1xuXG4gICAgICAgICAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTIzOlxuICAgICAgICAgICAgICAgICAgcisrO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICAgICAgICAgIHItLTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICgwID09PSByKSBicmVhaztcbiAgICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlID0gZi5zdWJzdHJpbmcodCwgbik7XG4gICAgICAgICAgICAwID09PSBxICYmIChxID0gKGcgPSBnLnJlcGxhY2UoZGEsIFwiXCIpLnRyaW0oKSkuY2hhckNvZGVBdCgwKSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAocSkge1xuICAgICAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAgICAgIDAgPCBtICYmIChnID0gZy5yZXBsYWNlKE4sIFwiXCIpKTtcbiAgICAgICAgICAgICAgICBtID0gZy5jaGFyQ29kZUF0KDEpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwMDpcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTA5OlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgICAgICByID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHIgPSBPO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUgPSBNKGMsIHIsIGUsIG0sIGEgKyAxKTtcbiAgICAgICAgICAgICAgICB0ID0gZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgMCA8IHogJiYgKHIgPSBYKE8sIGcsIEopLCBBID0gSSgzLCBlLCByLCBjLCBCLCB4LCB0LCBtLCBhLCBoKSwgZyA9IHIuam9pbihcIlwiKSwgdm9pZCAwICE9PSBBICYmIDAgPT09ICh0ID0gKGUgPSBBLnRyaW0oKSkubGVuZ3RoKSAmJiAobSA9IDAsIGUgPSBcIlwiKSk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPCB0KSBzd2l0Y2ggKG0pIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgICAgICAgICBnID0gZy5yZXBsYWNlKGVhLCBmYSk7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDk6XG4gICAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgICAgICBlID0gZyArIFwie1wiICsgZSArIFwifVwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDc6XG4gICAgICAgICAgICAgICAgICAgIGcgPSBnLnJlcGxhY2UoaGEsIFwiJDEgJDJcIik7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBnICsgXCJ7XCIgKyBlICsgXCJ9XCI7XG4gICAgICAgICAgICAgICAgICAgIGUgPSAxID09PSB2IHx8IDIgPT09IHYgJiYgTChcIkBcIiArIGUsIDMpID8gXCJALXdlYmtpdC1cIiArIGUgKyBcIkBcIiArIGUgOiBcIkBcIiArIGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBlID0gZyArIGUsIDExMiA9PT0gaCAmJiAoZSA9IChwICs9IGUsIFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBlID0gTShjLCBYKGMsIGcsIEopLCBlLCBoLCBhICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEcgKz0gZTtcbiAgICAgICAgICAgIHIgPSBKID0gbSA9IEUgPSBxID0gMDtcbiAgICAgICAgICAgIGcgPSBcIlwiO1xuICAgICAgICAgICAgZSA9IGYuY2hhckNvZGVBdCgrK24pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICBjYXNlIDU5OlxuICAgICAgICAgICAgZyA9ICgwIDwgbSA/IGcucmVwbGFjZShOLCBcIlwiKSA6IGcpLnRyaW0oKTtcbiAgICAgICAgICAgIGlmICgxIDwgKHQgPSBnLmxlbmd0aCkpIHN3aXRjaCAoMCA9PT0gRSAmJiAocSA9IGcuY2hhckNvZGVBdCgwKSwgNDUgPT09IHEgfHwgOTYgPCBxICYmIDEyMyA+IHEpICYmICh0ID0gKGcgPSBnLnJlcGxhY2UoXCIgXCIsIFwiOlwiKSkubGVuZ3RoKSwgMCA8IHogJiYgdm9pZCAwICE9PSAoQSA9IEkoMSwgZywgYywgZCwgQiwgeCwgcC5sZW5ndGgsIGgsIGEsIGgpKSAmJiAwID09PSAodCA9IChnID0gQS50cmltKCkpLmxlbmd0aCkgJiYgKGcgPSBcIlxceDAwXFx4MDBcIiksIHEgPSBnLmNoYXJDb2RlQXQoMCksIG0gPSBnLmNoYXJDb2RlQXQoMSksIHEgKyBtKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDE2OTpcbiAgICAgICAgICAgICAgY2FzZSAxNjM6XG4gICAgICAgICAgICAgICAgSCArPSBnICsgZi5jaGFyQXQobik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICA1OCAhPT0gZy5jaGFyQ29kZUF0KHQgLSAxKSAmJiAocCArPSBQKGcsIHEsIG0sIGcuY2hhckNvZGVBdCgyKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSiA9IG0gPSBFID0gcSA9IDA7XG4gICAgICAgICAgICBnID0gXCJcIjtcbiAgICAgICAgICAgIGUgPSBmLmNoYXJDb2RlQXQoKytuKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGUpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICA0NyA9PT0gYiA/IGIgPSAwIDogMCA9PT0gMSArIHEgJiYgKG0gPSAxLCBnICs9IFwiXFx4MDBcIik7XG4gICAgICAgICAgMCA8IHogKiBZICYmIEkoMCwgZywgYywgZCwgQiwgeCwgcC5sZW5ndGgsIGgsIGEsIGgpO1xuICAgICAgICAgIHggPSAxO1xuICAgICAgICAgIEIrKztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDU5OlxuICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICBpZiAoMCA9PT0gYiArIGwgKyB1ICsgaykge1xuICAgICAgICAgICAgeCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgeCsrO1xuICAgICAgICAgIHcgPSBmLmNoYXJBdChuKTtcblxuICAgICAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IGwgKyBrICsgYikgc3dpdGNoIChEKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgICAgICAgICBjYXNlIDU4OlxuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgdyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAzMiAhPT0gZSAmJiAodyA9IFwiIFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB3ID0gXCJcXFxcMFwiO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgdyA9IFwiXFxcXGZcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgIHcgPSBcIlxcXFx2XCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAwID09PSBsICsgYiArIGsgJiYgKG0gPSBKID0gMSwgdyA9IFwiXFxmXCIgKyB3KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTA4OlxuICAgICAgICAgICAgICBpZiAoMCA9PT0gbCArIGIgKyBrICsgQyAmJiAwIDwgRSkgc3dpdGNoIChuIC0gRSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgIDExMiA9PT0gRCAmJiA1OCA9PT0gZi5jaGFyQ29kZUF0KG4gLSAzKSAmJiAoQyA9IEQpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgMTExID09PSB5ICYmIChDID0geSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNTg6XG4gICAgICAgICAgICAgIDAgPT09IGwgKyBiICsgayAmJiAoRSA9IG4pO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgICAgICAgMCA9PT0gYiArIHUgKyBsICsgayAmJiAobSA9IDEsIHcgKz0gXCJcXHJcIik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgMCA9PT0gYiAmJiAobCA9IGwgPT09IGUgPyAwIDogMCA9PT0gbCA/IGUgOiBsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICAgIDAgPT09IGwgKyBiICsgdSAmJiBrKys7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDkzOlxuICAgICAgICAgICAgICAwID09PSBsICsgYiArIHUgJiYgay0tO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MTpcbiAgICAgICAgICAgICAgMCA9PT0gbCArIGIgKyBrICYmIHUtLTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgIGlmICgwID09PSBsICsgYiArIGspIHtcbiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gcSkgc3dpdGNoICgyICogRCArIDMgKiB5KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDUzMzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHEgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1Kys7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgICAgICAgMCA9PT0gYiArIHUgKyBsICsgayArIEUgKyByICYmIChyID0gMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICAgICAgaWYgKCEoMCA8IGwgKyBrICsgdSkpIHN3aXRjaCAoYikge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoMiAqIGUgKyAzICogZi5jaGFyQ29kZUF0KG4gKyAxKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDIzNTpcbiAgICAgICAgICAgICAgICAgICAgICBiID0gNDc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyMjA6XG4gICAgICAgICAgICAgICAgICAgICAgdCA9IG4sIGIgPSA0MjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgICAgICAgNDcgPT09IGUgJiYgNDIgPT09IEQgJiYgKDMzID09PSBmLmNoYXJDb2RlQXQodCArIDIpICYmIChwICs9IGYuc3Vic3RyaW5nKHQsIG4gKyAxKSksIHcgPSBcIlwiLCBiID0gMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAwID09PSBiICYmIChnICs9IHcpO1xuICAgICAgfVxuXG4gICAgICB5ID0gRDtcbiAgICAgIEQgPSBlO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIHQgPSBwLmxlbmd0aDtcblxuICAgIGlmICgwIDwgdCkge1xuICAgICAgciA9IGM7XG4gICAgICBpZiAoMCA8IHogJiYgKEEgPSBJKDIsIHAsIHIsIGQsIEIsIHgsIHQsIGgsIGEsIGgpLCB2b2lkIDAgIT09IEEgJiYgMCA9PT0gKHAgPSBBKS5sZW5ndGgpKSByZXR1cm4gSCArIHAgKyBHO1xuICAgICAgcCA9IHIuam9pbihcIixcIikgKyBcIntcIiArIHAgKyBcIn1cIjtcblxuICAgICAgaWYgKDAgIT09IHYgKiBDKSB7XG4gICAgICAgIDIgIT09IHYgfHwgTChwLCAyKSB8fCAoQyA9IDApO1xuXG4gICAgICAgIHN3aXRjaCAoQykge1xuICAgICAgICAgIGNhc2UgMTExOlxuICAgICAgICAgICAgcCA9IHAucmVwbGFjZShpYSwgXCI6LW1vei0kMVwiKSArIHA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTEyOlxuICAgICAgICAgICAgcCA9IHAucmVwbGFjZShRLCBcIjo6LXdlYmtpdC1pbnB1dC0kMVwiKSArIHAucmVwbGFjZShRLCBcIjo6LW1vei0kMVwiKSArIHAucmVwbGFjZShRLCBcIjotbXMtaW5wdXQtJDFcIikgKyBwO1xuICAgICAgICB9XG5cbiAgICAgICAgQyA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEggKyBwICsgRztcbiAgfVxuXG4gIGZ1bmN0aW9uIFgoZCwgYywgZikge1xuICAgIHZhciBoID0gYy50cmltKCkuc3BsaXQoamEpO1xuICAgIGMgPSBoO1xuICAgIHZhciBhID0gaC5sZW5ndGgsXG4gICAgICAgIGsgPSBkLmxlbmd0aDtcblxuICAgIHN3aXRjaCAoaykge1xuICAgICAgY2FzZSAwOlxuICAgICAgY2FzZSAxOlxuICAgICAgICB2YXIgYiA9IDA7XG5cbiAgICAgICAgZm9yIChkID0gMCA9PT0gayA/IFwiXCIgOiBkWzBdICsgXCIgXCI7IGIgPCBhOyArK2IpIHtcbiAgICAgICAgICBjW2JdID0gWihkLCBjW2JdLCBmLCBrKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHUgPSBiID0gMDtcblxuICAgICAgICBmb3IgKGMgPSBbXTsgYiA8IGE7ICsrYikge1xuICAgICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgazsgKytsKSB7XG4gICAgICAgICAgICBjW3UrK10gPSBaKGRbbF0gKyBcIiBcIiwgaFtiXSwgZiwgaykudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGM7XG4gIH1cblxuICBmdW5jdGlvbiBaKGQsIGMsIGYpIHtcbiAgICB2YXIgaCA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICAzMyA+IGggJiYgKGggPSAoYyA9IGMudHJpbSgpKS5jaGFyQ29kZUF0KDApKTtcblxuICAgIHN3aXRjaCAoaCkge1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgcmV0dXJuIGMucmVwbGFjZShGLCBcIiQxXCIgKyBkLnRyaW0oKSk7XG5cbiAgICAgIGNhc2UgNTg6XG4gICAgICAgIHN3aXRjaCAoYy5jaGFyQ29kZUF0KDEpKSB7XG4gICAgICAgICAgY2FzZSAxMDM6XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZC50cmltKCkgKyBjLnJlcGxhY2UoRiwgXCIkMVwiICsgZC50cmltKCkpO1xuICAgICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICgwIDwgMSAqIGYgJiYgMCA8IGMuaW5kZXhPZihcIlxcZlwiKSkgcmV0dXJuIGMucmVwbGFjZShGLCAoNTggPT09IGQuY2hhckNvZGVBdCgwKSA/IFwiXCIgOiBcIiQxXCIpICsgZC50cmltKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBkICsgYztcbiAgfVxuXG4gIGZ1bmN0aW9uIFAoZCwgYywgZiwgaCkge1xuICAgIHZhciBhID0gZCArIFwiO1wiLFxuICAgICAgICBrID0gMiAqIGMgKyAzICogZiArIDQgKiBoO1xuXG4gICAgaWYgKDk0NCA9PT0gaykge1xuICAgICAgZCA9IGEuaW5kZXhPZihcIjpcIiwgOSkgKyAxO1xuICAgICAgdmFyIGIgPSBhLnN1YnN0cmluZyhkLCBhLmxlbmd0aCAtIDEpLnRyaW0oKTtcbiAgICAgIGIgPSBhLnN1YnN0cmluZygwLCBkKS50cmltKCkgKyBiICsgXCI7XCI7XG4gICAgICByZXR1cm4gMSA9PT0gdiB8fCAyID09PSB2ICYmIEwoYiwgMSkgPyBcIi13ZWJraXQtXCIgKyBiICsgYiA6IGI7XG4gICAgfVxuXG4gICAgaWYgKDAgPT09IHYgfHwgMiA9PT0gdiAmJiAhTChhLCAxKSkgcmV0dXJuIGE7XG5cbiAgICBzd2l0Y2ggKGspIHtcbiAgICAgIGNhc2UgMTAxNTpcbiAgICAgICAgcmV0dXJuIDk3ID09PSBhLmNoYXJDb2RlQXQoMTApID8gXCItd2Via2l0LVwiICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDk1MTpcbiAgICAgICAgcmV0dXJuIDExNiA9PT0gYS5jaGFyQ29kZUF0KDMpID8gXCItd2Via2l0LVwiICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDk2MzpcbiAgICAgICAgcmV0dXJuIDExMCA9PT0gYS5jaGFyQ29kZUF0KDUpID8gXCItd2Via2l0LVwiICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDEwMDk6XG4gICAgICAgIGlmICgxMDAgIT09IGEuY2hhckNvZGVBdCg0KSkgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTY5OlxuICAgICAgY2FzZSA5NDI6XG4gICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgYTtcblxuICAgICAgY2FzZSA5Nzg6XG4gICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbW96LVwiICsgYSArIGE7XG5cbiAgICAgIGNhc2UgMTAxOTpcbiAgICAgIGNhc2UgOTgzOlxuICAgICAgICByZXR1cm4gXCItd2Via2l0LVwiICsgYSArIFwiLW1vei1cIiArIGEgKyBcIi1tcy1cIiArIGEgKyBhO1xuXG4gICAgICBjYXNlIDg4MzpcbiAgICAgICAgcmV0dXJuIDQ1ID09PSBhLmNoYXJDb2RlQXQoOCkgPyBcIi13ZWJraXQtXCIgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgOTMyOlxuICAgICAgICBpZiAoNDUgPT09IGEuY2hhckNvZGVBdCg0KSkgc3dpdGNoIChhLmNoYXJDb2RlQXQoNSkpIHtcbiAgICAgICAgICBjYXNlIDEwMzpcbiAgICAgICAgICAgIHJldHVybiBcIi13ZWJraXQtYm94LVwiICsgYS5yZXBsYWNlKFwiLWdyb3dcIiwgXCJcIikgKyBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtXCIgKyBhLnJlcGxhY2UoXCJncm93XCIsIFwicG9zaXRpdmVcIikgKyBhO1xuXG4gICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICByZXR1cm4gXCItd2Via2l0LVwiICsgYSArIFwiLW1zLVwiICsgYS5yZXBsYWNlKFwic2hyaW5rXCIsIFwibmVnYXRpdmVcIikgKyBhO1xuXG4gICAgICAgICAgY2FzZSA5ODpcbiAgICAgICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtXCIgKyBhLnJlcGxhY2UoXCJiYXNpc1wiLCBcInByZWZlcnJlZC1zaXplXCIpICsgYTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCItd2Via2l0LVwiICsgYSArIFwiLW1zLVwiICsgYSArIGE7XG5cbiAgICAgIGNhc2UgOTY0OlxuICAgICAgICByZXR1cm4gXCItd2Via2l0LVwiICsgYSArIFwiLW1zLWZsZXgtXCIgKyBhICsgYTtcblxuICAgICAgY2FzZSAxMDIzOlxuICAgICAgICBpZiAoOTkgIT09IGEuY2hhckNvZGVBdCg4KSkgYnJlYWs7XG4gICAgICAgIGIgPSBhLnN1YnN0cmluZyhhLmluZGV4T2YoXCI6XCIsIDE1KSkucmVwbGFjZShcImZsZXgtXCIsIFwiXCIpLnJlcGxhY2UoXCJzcGFjZS1iZXR3ZWVuXCIsIFwianVzdGlmeVwiKTtcbiAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1ib3gtcGFja1wiICsgYiArIFwiLXdlYmtpdC1cIiArIGEgKyBcIi1tcy1mbGV4LXBhY2tcIiArIGIgKyBhO1xuXG4gICAgICBjYXNlIDEwMDU6XG4gICAgICAgIHJldHVybiBrYS50ZXN0KGEpID8gYS5yZXBsYWNlKGFhLCBcIjotd2Via2l0LVwiKSArIGEucmVwbGFjZShhYSwgXCI6LW1vei1cIikgKyBhIDogYTtcblxuICAgICAgY2FzZSAxZTM6XG4gICAgICAgIGIgPSBhLnN1YnN0cmluZygxMykudHJpbSgpO1xuICAgICAgICBjID0gYi5pbmRleE9mKFwiLVwiKSArIDE7XG5cbiAgICAgICAgc3dpdGNoIChiLmNoYXJDb2RlQXQoMCkgKyBiLmNoYXJDb2RlQXQoYykpIHtcbiAgICAgICAgICBjYXNlIDIyNjpcbiAgICAgICAgICAgIGIgPSBhLnJlcGxhY2UoRywgXCJ0YlwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMzI6XG4gICAgICAgICAgICBiID0gYS5yZXBsYWNlKEcsIFwidGItcmxcIik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjIwOlxuICAgICAgICAgICAgYiA9IGEucmVwbGFjZShHLCBcImxyXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCItd2Via2l0LVwiICsgYSArIFwiLW1zLVwiICsgYiArIGE7XG5cbiAgICAgIGNhc2UgMTAxNzpcbiAgICAgICAgaWYgKC0xID09PSBhLmluZGV4T2YoXCJzdGlja3lcIiwgOSkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDk3NTpcbiAgICAgICAgYyA9IChhID0gZCkubGVuZ3RoIC0gMTA7XG4gICAgICAgIGIgPSAoMzMgPT09IGEuY2hhckNvZGVBdChjKSA/IGEuc3Vic3RyaW5nKDAsIGMpIDogYSkuc3Vic3RyaW5nKGQuaW5kZXhPZihcIjpcIiwgNykgKyAxKS50cmltKCk7XG5cbiAgICAgICAgc3dpdGNoIChrID0gYi5jaGFyQ29kZUF0KDApICsgKGIuY2hhckNvZGVBdCg3KSB8IDApKSB7XG4gICAgICAgICAgY2FzZSAyMDM6XG4gICAgICAgICAgICBpZiAoMTExID4gYi5jaGFyQ29kZUF0KDgpKSBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgYSA9IGEucmVwbGFjZShiLCBcIi13ZWJraXQtXCIgKyBiKSArIFwiO1wiICsgYTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMDc6XG4gICAgICAgICAgY2FzZSAxMDI6XG4gICAgICAgICAgICBhID0gYS5yZXBsYWNlKGIsIFwiLXdlYmtpdC1cIiArICgxMDIgPCBrID8gXCJpbmxpbmUtXCIgOiBcIlwiKSArIFwiYm94XCIpICsgXCI7XCIgKyBhLnJlcGxhY2UoYiwgXCItd2Via2l0LVwiICsgYikgKyBcIjtcIiArIGEucmVwbGFjZShiLCBcIi1tcy1cIiArIGIgKyBcImJveFwiKSArIFwiO1wiICsgYTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhICsgXCI7XCI7XG5cbiAgICAgIGNhc2UgOTM4OlxuICAgICAgICBpZiAoNDUgPT09IGEuY2hhckNvZGVBdCg1KSkgc3dpdGNoIChhLmNoYXJDb2RlQXQoNikpIHtcbiAgICAgICAgICBjYXNlIDEwNTpcbiAgICAgICAgICAgIHJldHVybiBiID0gYS5yZXBsYWNlKFwiLWl0ZW1zXCIsIFwiXCIpLCBcIi13ZWJraXQtXCIgKyBhICsgXCItd2Via2l0LWJveC1cIiArIGIgKyBcIi1tcy1mbGV4LVwiICsgYiArIGE7XG5cbiAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgIHJldHVybiBcIi13ZWJraXQtXCIgKyBhICsgXCItbXMtZmxleC1pdGVtLVwiICsgYS5yZXBsYWNlKGJhLCBcIlwiKSArIGE7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiLXdlYmtpdC1cIiArIGEgKyBcIi1tcy1mbGV4LWxpbmUtcGFja1wiICsgYS5yZXBsYWNlKFwiYWxpZ24tY29udGVudFwiLCBcIlwiKS5yZXBsYWNlKGJhLCBcIlwiKSArIGE7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTczOlxuICAgICAgY2FzZSA5ODk6XG4gICAgICAgIGlmICg0NSAhPT0gYS5jaGFyQ29kZUF0KDMpIHx8IDEyMiA9PT0gYS5jaGFyQ29kZUF0KDQpKSBicmVhaztcblxuICAgICAgY2FzZSA5MzE6XG4gICAgICBjYXNlIDk1MzpcbiAgICAgICAgaWYgKCEwID09PSBsYS50ZXN0KGQpKSByZXR1cm4gMTE1ID09PSAoYiA9IGQuc3Vic3RyaW5nKGQuaW5kZXhPZihcIjpcIikgKyAxKSkuY2hhckNvZGVBdCgwKSA/IFAoZC5yZXBsYWNlKFwic3RyZXRjaFwiLCBcImZpbGwtYXZhaWxhYmxlXCIpLCBjLCBmLCBoKS5yZXBsYWNlKFwiOmZpbGwtYXZhaWxhYmxlXCIsIFwiOnN0cmV0Y2hcIikgOiBhLnJlcGxhY2UoYiwgXCItd2Via2l0LVwiICsgYikgKyBhLnJlcGxhY2UoYiwgXCItbW96LVwiICsgYi5yZXBsYWNlKFwiZmlsbC1cIiwgXCJcIikpICsgYTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTYyOlxuICAgICAgICBpZiAoYSA9IFwiLXdlYmtpdC1cIiArIGEgKyAoMTAyID09PSBhLmNoYXJDb2RlQXQoNSkgPyBcIi1tcy1cIiArIGEgOiBcIlwiKSArIGEsIDIxMSA9PT0gZiArIGggJiYgMTA1ID09PSBhLmNoYXJDb2RlQXQoMTMpICYmIDAgPCBhLmluZGV4T2YoXCJ0cmFuc2Zvcm1cIiwgMTApKSByZXR1cm4gYS5zdWJzdHJpbmcoMCwgYS5pbmRleE9mKFwiO1wiLCAyNykgKyAxKS5yZXBsYWNlKG1hLCBcIiQxLXdlYmtpdC0kMlwiKSArIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBmdW5jdGlvbiBMKGQsIGMpIHtcbiAgICB2YXIgZiA9IGQuaW5kZXhPZigxID09PSBjID8gXCI6XCIgOiBcIntcIiksXG4gICAgICAgIGggPSBkLnN1YnN0cmluZygwLCAzICE9PSBjID8gZiA6IDEwKTtcbiAgICBmID0gZC5zdWJzdHJpbmcoZiArIDEsIGQubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIEgoMiAhPT0gYyA/IGggOiBoLnJlcGxhY2UobmEsIFwiJDFcIiksIGYsIGMpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmEoZCwgYykge1xuICAgIHZhciBmID0gUChjLCBjLmNoYXJDb2RlQXQoMCksIGMuY2hhckNvZGVBdCgxKSwgYy5jaGFyQ29kZUF0KDIpKTtcbiAgICByZXR1cm4gZiAhPT0gYyArIFwiO1wiID8gZi5yZXBsYWNlKG9hLCBcIiBvciAoJDEpXCIpLnN1YnN0cmluZyg0KSA6IFwiKFwiICsgYyArIFwiKVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gSShkLCBjLCBmLCBoLCBhLCBrLCBiLCB1LCBsLCBxKSB7XG4gICAgZm9yICh2YXIgbSA9IDAsIGUgPSBjLCB2OyBtIDwgejsgKyttKSB7XG4gICAgICBzd2l0Y2ggKHYgPSBSW21dLmNhbGwoeSwgZCwgZSwgZiwgaCwgYSwgaywgYiwgdSwgbCwgcSkpIHtcbiAgICAgICAgY2FzZSB2b2lkIDA6XG4gICAgICAgIGNhc2UgITE6XG4gICAgICAgIGNhc2UgITA6XG4gICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGUgPSB2O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlICE9PSBjKSByZXR1cm4gZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFMoZCkge1xuICAgIHN3aXRjaCAoZCkge1xuICAgICAgY2FzZSB2b2lkIDA6XG4gICAgICBjYXNlIG51bGw6XG4gICAgICAgIHogPSBSLmxlbmd0aCA9IDA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzd2l0Y2ggKGQuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICBjYXNlIEFycmF5OlxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDAsIGYgPSBkLmxlbmd0aDsgYyA8IGY7ICsrYykge1xuICAgICAgICAgICAgICBTKGRbY10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgRnVuY3Rpb246XG4gICAgICAgICAgICBSW3orK10gPSBkO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgICBZID0gISFkIHwgMDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFM7XG4gIH1cblxuICBmdW5jdGlvbiBUKGQpIHtcbiAgICBkID0gZC5wcmVmaXg7XG4gICAgdm9pZCAwICE9PSBkICYmIChIID0gbnVsbCwgZCA/IFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIGQgPyB2ID0gMSA6ICh2ID0gMiwgSCA9IGQpIDogdiA9IDApO1xuICAgIHJldHVybiBUO1xuICB9XG5cbiAgZnVuY3Rpb24geShkLCBjKSB7XG4gICAgaWYgKHZvaWQgMCAhPT0gdGhpcyAmJiB0aGlzLmNvbnN0cnVjdG9yID09PSB5KSByZXR1cm4gY2EoZCk7XG4gICAgdmFyIGYgPSBkO1xuICAgIDMzID4gZi5jaGFyQ29kZUF0KDApICYmIChmID0gZi50cmltKCkpO1xuICAgIFUgPSBmO1xuICAgIGYgPSBbVV07XG5cbiAgICBpZiAoMCA8IHopIHtcbiAgICAgIHZhciBoID0gSSgtMSwgYywgZiwgZiwgQiwgeCwgMCwgMCwgMCwgMCk7XG4gICAgICB2b2lkIDAgIT09IGggJiYgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGggJiYgKGMgPSBoKTtcbiAgICB9XG5cbiAgICB2YXIgYSA9IE0oTywgZiwgYywgMCwgMCk7XG4gICAgMCA8IHogJiYgKGggPSBJKC0yLCBhLCBmLCBmLCBCLCB4LCBhLmxlbmd0aCwgMCwgMCwgMCksIHZvaWQgMCAhPT0gaCAmJiAoYSA9IGgpKTtcbiAgICBVID0gXCJcIjtcbiAgICBDID0gMDtcbiAgICB4ID0gQiA9IDE7XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICB2YXIgZGEgPSAvXlxcMCsvZyxcbiAgICAgIE4gPSAvW1xcMFxcclxcZl0vZyxcbiAgICAgIGFhID0gLzogKi9nLFxuICAgICAga2EgPSAvem9vfGdyYS8sXG4gICAgICBtYSA9IC8oWyw6IF0pKHRyYW5zZm9ybSkvZyxcbiAgICAgIGphID0gLyxcXHIrPy9nLFxuICAgICAgRiA9IC8oW1xcdFxcclxcbiBdKSpcXGY/Ji9nLFxuICAgICAgaGEgPSAvQChrXFx3KylcXHMqKFxcUyopXFxzKi8sXG4gICAgICBRID0gLzo6KHBsYWNlKS9nLFxuICAgICAgaWEgPSAvOihyZWFkLW9ubHkpL2csXG4gICAgICBHID0gL1tzdmhdXFx3Ky1bdGJscl17Mn0vLFxuICAgICAgZWEgPSAvXFwoXFxzKiguKilcXHMqXFwpL2csXG4gICAgICBvYSA9IC8oW1xcc1xcU10qPyk7L2csXG4gICAgICBiYSA9IC8tc2VsZnxmbGV4LS9nLFxuICAgICAgbmEgPSAvW15dKj8oOltycF1bZWxdYVtcXHctXSspW15dKi8sXG4gICAgICBsYSA9IC9zdHJldGNofDpcXHMqXFx3K1xcLSg/OmNvbnRlfGF2YWlsKS8sXG4gICAgICB4ID0gMSxcbiAgICAgIEIgPSAxLFxuICAgICAgQyA9IDAsXG4gICAgICB2ID0gMSxcbiAgICAgIE8gPSBbXSxcbiAgICAgIFIgPSBbXSxcbiAgICAgIHogPSAwLFxuICAgICAgSCA9IG51bGwsXG4gICAgICBZID0gMCxcbiAgICAgIFUgPSBcIlwiO1xuICB5LnVzZSA9IFM7XG4gIHkuc2V0ID0gVDtcbiAgdm9pZCAwICE9PSBXICYmIFQoVyk7XG4gIHJldHVybiB5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwidmFyIGluZGV4ID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogMSxcbiAgYm9yZGVySW1hZ2VPdXRzZXQ6IDEsXG4gIGJvcmRlckltYWdlU2xpY2U6IDEsXG4gIGJvcmRlckltYWdlV2lkdGg6IDEsXG4gIGJveEZsZXg6IDEsXG4gIGJveEZsZXhHcm91cDogMSxcbiAgYm94T3JkaW5hbEdyb3VwOiAxLFxuICBjb2x1bW5Db3VudDogMSxcbiAgY29sdW1uczogMSxcbiAgZmxleDogMSxcbiAgZmxleEdyb3c6IDEsXG4gIGZsZXhQb3NpdGl2ZTogMSxcbiAgZmxleFNocmluazogMSxcbiAgZmxleE5lZ2F0aXZlOiAxLFxuICBmbGV4T3JkZXI6IDEsXG4gIGdyaWRSb3c6IDEsXG4gIGdyaWRSb3dFbmQ6IDEsXG4gIGdyaWRSb3dTcGFuOiAxLFxuICBncmlkUm93U3RhcnQ6IDEsXG4gIGdyaWRDb2x1bW46IDEsXG4gIGdyaWRDb2x1bW5FbmQ6IDEsXG4gIGdyaWRDb2x1bW5TcGFuOiAxLFxuICBncmlkQ29sdW1uU3RhcnQ6IDEsXG4gIGZvbnRXZWlnaHQ6IDEsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG9wYWNpdHk6IDEsXG4gIG9yZGVyOiAxLFxuICBvcnBoYW5zOiAxLFxuICB0YWJTaXplOiAxLFxuICB3aWRvd3M6IDEsXG4gIHpJbmRleDogMSxcbiAgem9vbTogMSxcbiAgV2Via2l0TGluZUNsYW1wOiAxLFxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiAxLFxuICBmbG9vZE9wYWNpdHk6IDEsXG4gIHN0b3BPcGFjaXR5OiAxLFxuICBzdHJva2VEYXNoYXJyYXk6IDEsXG4gIHN0cm9rZURhc2hvZmZzZXQ6IDEsXG4gIHN0cm9rZU1pdGVybGltaXQ6IDEsXG4gIHN0cm9rZU9wYWNpdHk6IDEsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjYnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYgaGFzKGV4cG9ydHMsIGtleSkpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uIChPLCBwcm90bykge1xuICBhbk9iamVjdChPKTtcbiAgaWYgKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpIHRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uICh0ZXN0LCBidWdneSwgc2V0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmIChidWdneSkgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKSB9KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG4iLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KSB7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG4iLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0IH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgTUVUQSA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVk7XG52YXIgJGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIHdrc0RlZmluZSA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKTtcbnZhciBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZ09QTkV4dCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpO1xudmFyICRHT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkRFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkUCh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnKSB7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKSB7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8pICRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghRC5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhpdCwgSElEREVOKSkgZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pIGl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwgeyBlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKSB7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbCA9IGtleXMubGVuZ3RoO1xuICB2YXIga2V5O1xuICB3aGlsZSAobCA+IGkpICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApIHtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpIHtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIGl0ID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmIChEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIEQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgdmFyIG5hbWVzID0gZ09QTih0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmICghVVNFX05BVElWRSkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90bykgJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIHNldHRlcikgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0IH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKSB7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBTeW1ib2w6ICRTeW1ib2wgfSk7XG5cbmZvciAodmFyIGVzNlN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaiA9IDA7IGVzNlN5bWJvbHMubGVuZ3RoID4gajspd2tzKGVzNlN5bWJvbHNbaisrXSk7XG5cbmZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykgd2tzRGVmaW5lKHdlbGxLbm93blN5bWJvbHNbaysrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoeyBhOiBTIH0pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkge1xuICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgICRyZXBsYWNlciA9IHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcbiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG4iLCJpbXBvcnQgaGFzaFN0cmluZyBmcm9tICdAZW1vdGlvbi9oYXNoJztcbmltcG9ydCBTdHlsaXMgZnJvbSAnQGVtb3Rpb24vc3R5bGlzJztcbmltcG9ydCBzdHlsaXNSdWxlU2hlZXQgZnJvbSAnc3R5bGlzLXJ1bGUtc2hlZXQnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnQGVtb3Rpb24vbWVtb2l6ZSc7XG5pbXBvcnQgdW5pdGxlc3MgZnJvbSAnQGVtb3Rpb24vdW5pdGxlc3MnO1xuXG52YXIgaHlwaGVuYXRlUmVnZXggPSAvW0EtWl18Xm1zL2c7XG52YXIgcHJvY2Vzc1N0eWxlTmFtZSA9IG1lbW9pemUoZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICByZXR1cm4gc3R5bGVOYW1lLnJlcGxhY2UoaHlwaGVuYXRlUmVnZXgsICctJCYnKS50b0xvd2VyQ2FzZSgpO1xufSk7XG52YXIgcHJvY2Vzc1N0eWxlVmFsdWUgPSBmdW5jdGlvbiBwcm9jZXNzU3R5bGVWYWx1ZShrZXksIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKHVuaXRsZXNzW2tleV0gIT09IDEgJiYga2V5LmNoYXJDb2RlQXQoMSkgIT09IDQ1ICYmIC8vIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICFpc05hTih2YWx1ZSkgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdmFsdWUgKyAncHgnO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGNvbnRlbnRWYWx1ZVBhdHRlcm4gPSAvKGF0dHJ8Y2FsY3xjb3VudGVycz98dXJsKVxcKC87XG4gIHZhciBjb250ZW50VmFsdWVzID0gWydub3JtYWwnLCAnbm9uZScsICdjb3VudGVyJywgJ29wZW4tcXVvdGUnLCAnY2xvc2UtcXVvdGUnLCAnbm8tb3Blbi1xdW90ZScsICduby1jbG9zZS1xdW90ZScsICdpbml0aWFsJywgJ2luaGVyaXQnLCAndW5zZXQnXTtcbiAgdmFyIG9sZFByb2Nlc3NTdHlsZVZhbHVlID0gcHJvY2Vzc1N0eWxlVmFsdWU7XG5cbiAgcHJvY2Vzc1N0eWxlVmFsdWUgPSBmdW5jdGlvbiBwcm9jZXNzU3R5bGVWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NvbnRlbnQnKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCBjb250ZW50VmFsdWVzLmluZGV4T2YodmFsdWUpID09PSAtMSAmJiAhY29udGVudFZhbHVlUGF0dGVybi50ZXN0KHZhbHVlKSAmJiAodmFsdWUuY2hhckF0KDApICE9PSB2YWx1ZS5jaGFyQXQodmFsdWUubGVuZ3RoIC0gMSkgfHwgdmFsdWUuY2hhckF0KDApICE9PSAnXCInICYmIHZhbHVlLmNoYXJBdCgwKSAhPT0gXCInXCIpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJZb3Ugc2VlbSB0byBiZSB1c2luZyBhIHZhbHVlIGZvciAnY29udGVudCcgd2l0aG91dCBxdW90ZXMsIHRyeSByZXBsYWNpbmcgaXQgd2l0aCBgY29udGVudDogJ1xcXCJcIiArIHZhbHVlICsgXCJcXFwiJ2BcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9sZFByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpO1xuICB9O1xufVxuXG52YXIgY2xhc3NuYW1lcyA9IGZ1bmN0aW9uIGNsYXNzbmFtZXMoYXJncykge1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIGNscyA9ICcnO1xuXG4gIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgYXJnID0gYXJnc1tpXTtcbiAgICBpZiAoYXJnID09IG51bGwpIGNvbnRpbnVlO1xuICAgIHZhciB0b0FkZCA9IHZvaWQgMDtcblxuICAgIHN3aXRjaCAodHlwZW9mIGFyZykge1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIHRvQWRkID0gY2xhc3NuYW1lcyhbYXJnKCldKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICB0b0FkZCA9IGNsYXNzbmFtZXMoYXJnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9BZGQgPSAnJztcblxuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBhcmcpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ1trXSAmJiBrKSB7XG4gICAgICAgICAgICAgICAgdG9BZGQgJiYgKHRvQWRkICs9ICcgJyk7XG4gICAgICAgICAgICAgICAgdG9BZGQgKz0gaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHtcbiAgICAgICAgICB0b0FkZCA9IGFyZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b0FkZCkge1xuICAgICAgY2xzICYmIChjbHMgKz0gJyAnKTtcbiAgICAgIGNscyArPSB0b0FkZDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xzO1xufTtcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG4vKlxuXG5oaWdoIHBlcmZvcm1hbmNlIFN0eWxlU2hlZXQgZm9yIGNzcy1pbi1qcyBzeXN0ZW1zXG5cbi0gdXNlcyBtdWx0aXBsZSBzdHlsZSB0YWdzIGJlaGluZCB0aGUgc2NlbmVzIGZvciBtaWxsaW9ucyBvZiBydWxlc1xuLSB1c2VzIGBpbnNlcnRSdWxlYCBmb3IgYXBwZW5kaW5nIGluIHByb2R1Y3Rpb24gZm9yICptdWNoKiBmYXN0ZXIgcGVyZm9ybWFuY2Vcbi0gJ3BvbHlmaWxscycgb24gc2VydmVyIHNpZGVcblxuLy8gdXNhZ2VcblxuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnZ2xhbW9yL2xpYi9zaGVldCdcbmxldCBzdHlsZVNoZWV0ID0gbmV3IFN0eWxlU2hlZXQoKVxuXG5zdHlsZVNoZWV0LmluamVjdCgpXG4tICdpbmplY3RzJyB0aGUgc3R5bGVzaGVldCBpbnRvIHRoZSBwYWdlIChvciBpbnRvIG1lbW9yeSBpZiBvbiBzZXJ2ZXIpXG5cbnN0eWxlU2hlZXQuaW5zZXJ0KCcjYm94IHsgYm9yZGVyOiAxcHggc29saWQgcmVkOyB9Jylcbi0gYXBwZW5kcyBhIGNzcyBydWxlIGludG8gdGhlIHN0eWxlc2hlZXRcblxuc3R5bGVTaGVldC5mbHVzaCgpXG4tIGVtcHRpZXMgdGhlIHN0eWxlc2hlZXQgb2YgYWxsIGl0cyBjb250ZW50c1xuXG4qL1xuLy8gJEZsb3dGaXhNZVxuZnVuY3Rpb24gc2hlZXRGb3JUYWcodGFnKSB7XG4gIGlmICh0YWcuc2hlZXQpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgcmV0dXJuIHRhZy5zaGVldDtcbiAgfSAvLyB0aGlzIHdlaXJkbmVzcyBicm91Z2h0IHRvIHlvdSBieSBmaXJlZm94XG5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldLm93bmVyTm9kZSA9PT0gdGFnKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lXG4gICAgICByZXR1cm4gZG9jdW1lbnQuc3R5bGVTaGVldHNbaV07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VTdHlsZVRhZyhvcHRzKSB7XG4gIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB0YWcuc2V0QXR0cmlidXRlKCdkYXRhLWVtb3Rpb24nLCBvcHRzLmtleSB8fCAnJyk7XG5cbiAgaWYgKG9wdHMubm9uY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgb3B0cy5ub25jZSk7XG4gIH1cblxuICB0YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKSAvLyAkRmxvd0ZpeE1lXG4gIDtcbiAgKG9wdHMuY29udGFpbmVyICE9PSB1bmRlZmluZWQgPyBvcHRzLmNvbnRhaW5lciA6IGRvY3VtZW50LmhlYWQpLmFwcGVuZENoaWxkKHRhZyk7XG4gIHJldHVybiB0YWc7XG59XG5cbmZ1bmN0aW9uIF9TdHlsZVNoZWV0KG9wdGlvbnMpIHtcbiAgdGhpcy5pc1NwZWVkeSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7IC8vIHRoZSBiaWcgZHJhd2JhY2sgaGVyZSBpcyB0aGF0IHRoZSBjc3Mgd29uJ3QgYmUgZWRpdGFibGUgaW4gZGV2dG9vbHNcblxuICB0aGlzLnRhZ3MgPSBbXTtcbiAgdGhpcy5jdHIgPSAwO1xuICB0aGlzLm9wdHMgPSBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiBfaW5qZWN0KCkge1xuICBpZiAodGhpcy5pbmplY3RlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYWxyZWFkeSBpbmplY3RlZCEnKTtcbiAgfVxuXG4gIHRoaXMudGFnc1swXSA9IG1ha2VTdHlsZVRhZyh0aGlzLm9wdHMpO1xuICB0aGlzLmluamVjdGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX3NwZWVkeShib29sKSB7XG4gIGlmICh0aGlzLmN0ciAhPT0gMCkge1xuICAgIC8vIGNhbm5vdCBjaGFuZ2Ugc3BlZWR5IG1vZGUgYWZ0ZXIgaW5zZXJ0aW5nIGFueSBydWxlIHRvIHNoZWV0LiBFaXRoZXIgY2FsbCBzcGVlZHkoJHtib29sfSkgZWFybGllciBpbiB5b3VyIGFwcCwgb3IgY2FsbCBmbHVzaCgpIGJlZm9yZSBzcGVlZHkoJHtib29sfSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3QgY2hhbmdlIHNwZWVkeSBub3dcIik7XG4gIH1cblxuICB0aGlzLmlzU3BlZWR5ID0gISFib29sO1xufVxuXG5mdW5jdGlvbiBfaW5zZXJ0KHJ1bGUsIHNvdXJjZU1hcCkge1xuICAvLyB0aGlzIGlzIHRoZSB1bHRyYWZhc3QgdmVyc2lvbiwgd29ya3MgYWNyb3NzIGJyb3dzZXJzXG4gIGlmICh0aGlzLmlzU3BlZWR5KSB7XG4gICAgdmFyIHRhZyA9IHRoaXMudGFnc1t0aGlzLnRhZ3MubGVuZ3RoIC0gMV07XG4gICAgdmFyIHNoZWV0ID0gc2hlZXRGb3JUYWcodGFnKTtcblxuICAgIHRyeSB7XG4gICAgICBzaGVldC5pbnNlcnRSdWxlKHJ1bGUsIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdpbGxlZ2FsIHJ1bGUnLCBydWxlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBfdGFnID0gbWFrZVN0eWxlVGFnKHRoaXMub3B0cyk7XG5cbiAgICB0aGlzLnRhZ3MucHVzaChfdGFnKTtcblxuICAgIF90YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocnVsZSArIChzb3VyY2VNYXAgfHwgJycpKSk7XG4gIH1cblxuICB0aGlzLmN0cisrO1xuXG4gIGlmICh0aGlzLmN0ciAlIDY1MDAwID09PSAwKSB7XG4gICAgdGhpcy50YWdzLnB1c2gobWFrZVN0eWxlVGFnKHRoaXMub3B0cykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9yZWYodGFnKSB7XG4gIHJldHVybiB0YWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWcpO1xufVxuXG5mdW5jdGlvbiBfZmx1c2goKSB7XG4gIC8vICRGbG93Rml4TWVcbiAgdGhpcy50YWdzLmZvckVhY2goX3JlZik7XG4gIHRoaXMudGFncyA9IFtdO1xuICB0aGlzLmN0ciA9IDA7IC8vIHRvZG8gLSBsb29rIGZvciByZW1uYW50cyBpbiBkb2N1bWVudC5zdHlsZVNoZWV0c1xuXG4gIHRoaXMuaW5qZWN0ZWQgPSBmYWxzZTtcbn1cblxudmFyIFN0eWxlU2hlZXQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICB2YXIgX3Byb3RvID0gX1N0eWxlU2hlZXQucHJvdG90eXBlO1xuICBfcHJvdG8uaW5qZWN0ID0gX2luamVjdDtcbiAgX3Byb3RvLnNwZWVkeSA9IF9zcGVlZHk7XG4gIF9wcm90by5pbnNlcnQgPSBfaW5zZXJ0O1xuICBfcHJvdG8uZmx1c2ggPSBfZmx1c2g7XG4gIHJldHVybiBfU3R5bGVTaGVldDtcbn0oKTtcblxuZnVuY3Rpb24gY3JlYXRlRW1vdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmIChjb250ZXh0Ll9fU0VDUkVUX0VNT1RJT05fXyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbnRleHQuX19TRUNSRVRfRU1PVElPTl9fO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9O1xuICB2YXIga2V5ID0gb3B0aW9ucy5rZXkgfHwgJ2Nzcyc7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoL1teYS16LV0vLnRlc3Qoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1vdGlvbiBrZXkgbXVzdCBvbmx5IGNvbnRhaW4gbG93ZXIgY2FzZSBhbHBoYWJldGljYWwgY2hhcmFjdGVycyBhbmQgLSBidXQgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBwYXNzZWRcIik7XG4gICAgfVxuICB9XG5cbiAgdmFyIGN1cnJlbnQ7XG5cbiAgZnVuY3Rpb24gaW5zZXJ0UnVsZShydWxlKSB7XG4gICAgY3VycmVudCArPSBydWxlO1xuXG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgc2hlZXQuaW5zZXJ0KHJ1bGUsIGN1cnJlbnRTb3VyY2VNYXApO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbnNlcnRpb25QbHVnaW4gPSBzdHlsaXNSdWxlU2hlZXQoaW5zZXJ0UnVsZSk7XG4gIHZhciBzdHlsaXNPcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnByZWZpeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3R5bGlzT3B0aW9ucyA9IHtcbiAgICAgIHByZWZpeDogb3B0aW9ucy5wcmVmaXhcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNhY2hlcyA9IHtcbiAgICByZWdpc3RlcmVkOiB7fSxcbiAgICBpbnNlcnRlZDoge30sXG4gICAgbm9uY2U6IG9wdGlvbnMubm9uY2UsXG4gICAga2V5OiBrZXlcbiAgfTtcbiAgdmFyIHNoZWV0ID0gbmV3IFN0eWxlU2hlZXQob3B0aW9ucyk7XG5cbiAgaWYgKGlzQnJvd3Nlcikge1xuICAgIC8vIPCfmoBcbiAgICBzaGVldC5pbmplY3QoKTtcbiAgfVxuXG4gIHZhciBzdHlsaXMgPSBuZXcgU3R5bGlzKHN0eWxpc09wdGlvbnMpO1xuICBzdHlsaXMudXNlKG9wdGlvbnMuc3R5bGlzUGx1Z2lucykoaW5zZXJ0aW9uUGx1Z2luKTtcbiAgdmFyIGN1cnJlbnRTb3VyY2VNYXAgPSAnJztcblxuICBmdW5jdGlvbiBoYW5kbGVJbnRlcnBvbGF0aW9uKGludGVycG9sYXRpb24sIGNvdWxkQmVTZWxlY3RvckludGVycG9sYXRpb24pIHtcbiAgICBpZiAoaW50ZXJwb2xhdGlvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlb2YgaW50ZXJwb2xhdGlvbikge1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAnJztcblxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBpZiAoaW50ZXJwb2xhdGlvbi5fX2Vtb3Rpb25fc3R5bGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBpbnRlcnBvbGF0aW9uLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICBpZiAoc2VsZWN0b3IgPT09ICdOT19DT01QT05FTlRfU0VMRUNUT1InICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcG9uZW50IHNlbGVjdG9ycyBjYW4gb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYmFiZWwtcGx1Z2luLWVtb3Rpb24uJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhhbmRsZUludGVycG9sYXRpb24uY2FsbCh0aGlzLCB0aGlzID09PSB1bmRlZmluZWQgPyBpbnRlcnBvbGF0aW9uKCkgOiAvLyAkRmxvd0ZpeE1lXG4gICAgICAgIGludGVycG9sYXRpb24odGhpcy5tZXJnZWRQcm9wcywgdGhpcy5jb250ZXh0KSwgY291bGRCZVNlbGVjdG9ySW50ZXJwb2xhdGlvbik7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiBjcmVhdGVTdHJpbmdGcm9tT2JqZWN0LmNhbGwodGhpcywgaW50ZXJwb2xhdGlvbik7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciBjYWNoZWQgPSBjYWNoZXMucmVnaXN0ZXJlZFtpbnRlcnBvbGF0aW9uXTtcbiAgICAgICAgcmV0dXJuIGNvdWxkQmVTZWxlY3RvckludGVycG9sYXRpb24gPT09IGZhbHNlICYmIGNhY2hlZCAhPT0gdW5kZWZpbmVkID8gY2FjaGVkIDogaW50ZXJwb2xhdGlvbjtcbiAgICB9XG4gIH1cblxuICB2YXIgb2JqZWN0VG9TdHJpbmdDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaW5nRnJvbU9iamVjdChvYmopIHtcbiAgICBpZiAob2JqZWN0VG9TdHJpbmdDYWNoZS5oYXMob2JqKSkge1xuICAgICAgLy8gJEZsb3dGaXhNZVxuICAgICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nQ2FjaGUuZ2V0KG9iaik7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9ICcnO1xuXG4gICAgZnVuY3Rpb24gX3JlZihpbnRlcnBvbGF0aW9uKSB7XG4gICAgICBzdHJpbmcgKz0gaGFuZGxlSW50ZXJwb2xhdGlvbi5jYWxsKHRoaXMsIGludGVycG9sYXRpb24sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVmMyhrZXkpIHtcbiAgICAgIGZ1bmN0aW9uIF9yZWYyKHZhbHVlKSB7XG4gICAgICAgIHN0cmluZyArPSBwcm9jZXNzU3R5bGVOYW1lKGtleSkgKyBcIjpcIiArIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpICsgXCI7XCI7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChjYWNoZXMucmVnaXN0ZXJlZFtvYmpba2V5XV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN0cmluZyArPSBrZXkgKyBcIntcIiArIGNhY2hlcy5yZWdpc3RlcmVkW29ialtrZXldXSArIFwifVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmluZyArPSBwcm9jZXNzU3R5bGVOYW1lKGtleSkgKyBcIjpcIiArIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgb2JqW2tleV0pICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdOT19DT01QT05FTlRfU0VMRUNUT1InICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbXBvbmVudCBzZWxlY3RvcnMgY2FuIG9ubHkgYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGJhYmVsLXBsdWdpbi1lbW90aW9uLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tleV0pICYmIHR5cGVvZiBvYmpba2V5XVswXSA9PT0gJ3N0cmluZycgJiYgY2FjaGVzLnJlZ2lzdGVyZWRbb2JqW2tleV1bMF1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBvYmpba2V5XS5mb3JFYWNoKF9yZWYyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJpbmcgKz0ga2V5ICsgXCJ7XCIgKyBoYW5kbGVJbnRlcnBvbGF0aW9uLmNhbGwodGhpcywgb2JqW2tleV0sIGZhbHNlKSArIFwifVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgb2JqLmZvckVhY2goX3JlZiwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChfcmVmMywgdGhpcyk7XG4gICAgfVxuXG4gICAgb2JqZWN0VG9TdHJpbmdDYWNoZS5zZXQob2JqLCBzdHJpbmcpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICB2YXIgbmFtZTtcbiAgdmFyIHN0eWxlc1dpdGhMYWJlbDtcbiAgdmFyIGxhYmVsUGF0dGVybiA9IC9sYWJlbDpcXHMqKFteXFxzO1xcbntdKylcXHMqOy9nO1xuXG4gIHZhciBjcmVhdGVTdHlsZXMgPSBmdW5jdGlvbiBjcmVhdGVTdHlsZXMoc3RyaW5ncykge1xuICAgIHZhciBzdHJpbmdNb2RlID0gdHJ1ZTtcbiAgICB2YXIgc3R5bGVzID0gJyc7XG4gICAgdmFyIGlkZW50aWZpZXJOYW1lID0gJyc7XG5cbiAgICBpZiAoc3RyaW5ncyA9PSBudWxsIHx8IHN0cmluZ3MucmF3ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0cmluZ01vZGUgPSBmYWxzZTtcbiAgICAgIHN0eWxlcyArPSBoYW5kbGVJbnRlcnBvbGF0aW9uLmNhbGwodGhpcywgc3RyaW5ncywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgKz0gc3RyaW5nc1swXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgaW50ZXJwb2xhdGlvbnMgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgaW50ZXJwb2xhdGlvbnNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGludGVycG9sYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGludGVycG9sYXRpb24sIGkpIHtcbiAgICAgIHN0eWxlcyArPSBoYW5kbGVJbnRlcnBvbGF0aW9uLmNhbGwodGhpcywgaW50ZXJwb2xhdGlvbiwgc3R5bGVzLmNoYXJDb2RlQXQoc3R5bGVzLmxlbmd0aCAtIDEpID09PSA0NiAvLyAuXG4gICAgICApO1xuXG4gICAgICBpZiAoc3RyaW5nTW9kZSA9PT0gdHJ1ZSAmJiBzdHJpbmdzW2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0eWxlcyArPSBzdHJpbmdzW2kgKyAxXTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgICBzdHlsZXNXaXRoTGFiZWwgPSBzdHlsZXM7XG4gICAgc3R5bGVzID0gc3R5bGVzLnJlcGxhY2UobGFiZWxQYXR0ZXJuLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XG4gICAgICBpZGVudGlmaWVyTmFtZSArPSBcIi1cIiArIHAxO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0pO1xuICAgIG5hbWUgPSBoYXNoU3RyaW5nKHN0eWxlcyArIGlkZW50aWZpZXJOYW1lKSArIGlkZW50aWZpZXJOYW1lO1xuICAgIHJldHVybiBzdHlsZXM7XG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwUmVnRXggPSAvXFwvXFwqI1xcc3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvblxcL2pzb247XFxTK1xccytcXCpcXC8vO1xuICAgIHZhciBvbGRTdHlsaXMgPSBzdHlsaXM7XG5cbiAgICBzdHlsaXMgPSBmdW5jdGlvbiBzdHlsaXMoc2VsZWN0b3IsIHN0eWxlcykge1xuICAgICAgdmFyIHJlc3VsdCA9IHNvdXJjZU1hcFJlZ0V4LmV4ZWMoc3R5bGVzKTtcbiAgICAgIGN1cnJlbnRTb3VyY2VNYXAgPSByZXN1bHQgPyByZXN1bHRbMF0gOiAnJztcbiAgICAgIG9sZFN0eWxpcyhzZWxlY3Rvciwgc3R5bGVzKTtcbiAgICAgIGN1cnJlbnRTb3VyY2VNYXAgPSAnJztcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0KHNjb3BlLCBzdHlsZXMpIHtcbiAgICBpZiAoY2FjaGVzLmluc2VydGVkW25hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnQgPSAnJztcbiAgICAgIHN0eWxpcyhzY29wZSwgc3R5bGVzKTtcbiAgICAgIGNhY2hlcy5pbnNlcnRlZFtuYW1lXSA9IGN1cnJlbnQ7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNzcyA9IGZ1bmN0aW9uIGNzcygpIHtcbiAgICB2YXIgc3R5bGVzID0gY3JlYXRlU3R5bGVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIHNlbGVjdG9yID0ga2V5ICsgXCItXCIgKyBuYW1lO1xuXG4gICAgaWYgKGNhY2hlcy5yZWdpc3RlcmVkW3NlbGVjdG9yXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjYWNoZXMucmVnaXN0ZXJlZFtzZWxlY3Rvcl0gPSBzdHlsZXNXaXRoTGFiZWw7XG4gICAgfVxuXG4gICAgaW5zZXJ0KFwiLlwiICsgc2VsZWN0b3IsIHN0eWxlcyk7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9O1xuXG4gIHZhciBrZXlmcmFtZXMgPSBmdW5jdGlvbiBrZXlmcmFtZXMoKSB7XG4gICAgdmFyIHN0eWxlcyA9IGNyZWF0ZVN0eWxlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBhbmltYXRpb24gPSBcImFuaW1hdGlvbi1cIiArIG5hbWU7XG4gICAgaW5zZXJ0KCcnLCBcIkBrZXlmcmFtZXMgXCIgKyBhbmltYXRpb24gKyBcIntcIiArIHN0eWxlcyArIFwifVwiKTtcbiAgICByZXR1cm4gYW5pbWF0aW9uO1xuICB9O1xuXG4gIHZhciBpbmplY3RHbG9iYWwgPSBmdW5jdGlvbiBpbmplY3RHbG9iYWwoKSB7XG4gICAgdmFyIHN0eWxlcyA9IGNyZWF0ZVN0eWxlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGluc2VydCgnJywgc3R5bGVzKTtcbiAgfTtcblxuICBmdW5jdGlvbiBnZXRSZWdpc3RlcmVkU3R5bGVzKHJlZ2lzdGVyZWRTdHlsZXMsIGNsYXNzTmFtZXMpIHtcbiAgICB2YXIgcmF3Q2xhc3NOYW1lID0gJyc7XG4gICAgY2xhc3NOYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGNhY2hlcy5yZWdpc3RlcmVkW2NsYXNzTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWdpc3RlcmVkU3R5bGVzLnB1c2goY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd0NsYXNzTmFtZSArPSBjbGFzc05hbWUgKyBcIiBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmF3Q2xhc3NOYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2UoY2xhc3NOYW1lLCBzb3VyY2VNYXApIHtcbiAgICB2YXIgcmVnaXN0ZXJlZFN0eWxlcyA9IFtdO1xuICAgIHZhciByYXdDbGFzc05hbWUgPSBnZXRSZWdpc3RlcmVkU3R5bGVzKHJlZ2lzdGVyZWRTdHlsZXMsIGNsYXNzTmFtZSk7XG5cbiAgICBpZiAocmVnaXN0ZXJlZFN0eWxlcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHJldHVybiByYXdDbGFzc05hbWUgKyBjc3MocmVnaXN0ZXJlZFN0eWxlcywgc291cmNlTWFwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN4KCkge1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgY2xhc3NOYW1lcyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgY2xhc3NOYW1lc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXJnZShjbGFzc25hbWVzKGNsYXNzTmFtZXMpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGh5ZHJhdGVTaW5nbGVJZChpZCkge1xuICAgIGNhY2hlcy5pbnNlcnRlZFtpZF0gPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gaHlkcmF0ZShpZHMpIHtcbiAgICBpZHMuZm9yRWFjaChoeWRyYXRlU2luZ2xlSWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgc2hlZXQuZmx1c2goKTtcbiAgICAgIHNoZWV0LmluamVjdCgpO1xuICAgIH1cblxuICAgIGNhY2hlcy5pbnNlcnRlZCA9IHt9O1xuICAgIGNhY2hlcy5yZWdpc3RlcmVkID0ge307XG4gIH1cblxuICBmdW5jdGlvbiBfcmVmNChub2RlKSB7XG4gICAgLy8gJEZsb3dGaXhNZVxuICAgIHNoZWV0LnRhZ3NbMF0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgc2hlZXQudGFnc1swXSk7IC8vICRGbG93Rml4TWVcblxuICAgIG5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1lbW90aW9uLVwiICsga2V5KS5zcGxpdCgnICcpLmZvckVhY2goaHlkcmF0ZVNpbmdsZUlkKTtcbiAgfVxuXG4gIGlmIChpc0Jyb3dzZXIpIHtcbiAgICB2YXIgY2h1bmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWVtb3Rpb24tXCIgKyBrZXkgKyBcIl1cIik7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChjaHVua3MsIF9yZWY0KTtcbiAgfVxuXG4gIHZhciBlbW90aW9uID0ge1xuICAgIGZsdXNoOiBmbHVzaCxcbiAgICBoeWRyYXRlOiBoeWRyYXRlLFxuICAgIGN4OiBjeCxcbiAgICBtZXJnZTogbWVyZ2UsXG4gICAgZ2V0UmVnaXN0ZXJlZFN0eWxlczogZ2V0UmVnaXN0ZXJlZFN0eWxlcyxcbiAgICBpbmplY3RHbG9iYWw6IGluamVjdEdsb2JhbCxcbiAgICBrZXlmcmFtZXM6IGtleWZyYW1lcyxcbiAgICBjc3M6IGNzcyxcbiAgICBzaGVldDogc2hlZXQsXG4gICAgY2FjaGVzOiBjYWNoZXNcbiAgfTtcbiAgY29udGV4dC5fX1NFQ1JFVF9FTU9USU9OX18gPSBlbW90aW9uO1xuICByZXR1cm4gZW1vdGlvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRW1vdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiaW1wb3J0IGNyZWF0ZUVtb3Rpb24gZnJvbSAnY3JlYXRlLWVtb3Rpb24nO1xuXG52YXIgY29udGV4dCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge307XG5cbnZhciBfY3JlYXRlRW1vdGlvbiA9IGNyZWF0ZUVtb3Rpb24oY29udGV4dCk7XG52YXIgZmx1c2ggPSBfY3JlYXRlRW1vdGlvbi5mbHVzaDtcbnZhciBoeWRyYXRlID0gX2NyZWF0ZUVtb3Rpb24uaHlkcmF0ZTtcbnZhciBjeCA9IF9jcmVhdGVFbW90aW9uLmN4O1xudmFyIG1lcmdlID0gX2NyZWF0ZUVtb3Rpb24ubWVyZ2U7XG52YXIgZ2V0UmVnaXN0ZXJlZFN0eWxlcyA9IF9jcmVhdGVFbW90aW9uLmdldFJlZ2lzdGVyZWRTdHlsZXM7XG52YXIgaW5qZWN0R2xvYmFsID0gX2NyZWF0ZUVtb3Rpb24uaW5qZWN0R2xvYmFsO1xudmFyIGtleWZyYW1lcyA9IF9jcmVhdGVFbW90aW9uLmtleWZyYW1lcztcbnZhciBjc3MgPSBfY3JlYXRlRW1vdGlvbi5jc3M7XG52YXIgc2hlZXQgPSBfY3JlYXRlRW1vdGlvbi5zaGVldDtcbnZhciBjYWNoZXMgPSBfY3JlYXRlRW1vdGlvbi5jYWNoZXM7XG5cbmV4cG9ydCB7IGZsdXNoLCBoeWRyYXRlLCBjeCwgbWVyZ2UsIGdldFJlZ2lzdGVyZWRTdHlsZXMsIGluamVjdEdsb2JhbCwga2V5ZnJhbWVzLCBjc3MsIHNoZWV0LCBjYWNoZXMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZW1pemUoIGZuLCBvcHRpb25zICkge1xuXHR2YXIgc2l6ZSA9IDAsXG5cdFx0bWF4U2l6ZSwgaGVhZCwgdGFpbDtcblxuXHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5tYXhTaXplICkge1xuXHRcdG1heFNpemUgPSBvcHRpb25zLm1heFNpemU7XG5cdH1cblxuXHRmdW5jdGlvbiBtZW1vaXplZCggLyogLi4uYXJncyAqLyApIHtcblx0XHR2YXIgbm9kZSA9IGhlYWQsXG5cdFx0XHRsZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdFx0YXJncywgaTtcblxuXHRcdHNlYXJjaENhY2hlOiB3aGlsZSAoIG5vZGUgKSB7XG5cdFx0XHQvLyBQZXJmb3JtIGEgc2hhbGxvdyBlcXVhbGl0eSB0ZXN0IHRvIGNvbmZpcm0gdGhhdCB3aGV0aGVyIHRoZSBub2RlXG5cdFx0XHQvLyB1bmRlciB0ZXN0IGlzIGEgY2FuZGlkYXRlIGZvciB0aGUgYXJndW1lbnRzIHBhc3NlZC4gVHdvIGFycmF5c1xuXHRcdFx0Ly8gYXJlIHNoYWxsb3dseSBlcXVhbCBpZiB0aGVpciBsZW5ndGggbWF0Y2hlcyBhbmQgZWFjaCBlbnRyeSBpc1xuXHRcdFx0Ly8gc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgdHdvIHNldHMuIEF2b2lkIGFic3RyYWN0aW5nIHRvIGFcblx0XHRcdC8vIGZ1bmN0aW9uIHdoaWNoIGNvdWxkIGluY3VyIGFuIGFyZ3VtZW50cyBsZWFraW5nIGRlb3B0aW1pemF0aW9uLlxuXG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIG5vZGUgYXJndW1lbnRzIG1hdGNoIGFyZ3VtZW50cyBsZW5ndGhcblx0XHRcdGlmICggbm9kZS5hcmdzLmxlbmd0aCAhPT0gYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIHZhbHVlc1xuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0aWYgKCBub2RlLmFyZ3NbIGkgXSAhPT0gYXJndW1lbnRzWyBpIF0gKSB7XG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0XHRjb250aW51ZSBzZWFyY2hDYWNoZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50IHdlIGNhbiBhc3N1bWUgd2UndmUgZm91bmQgYSBtYXRjaFxuXG5cdFx0XHQvLyBTdXJmYWNlIG1hdGNoZWQgbm9kZSB0byBoZWFkIGlmIG5vdCBhbHJlYWR5XG5cdFx0XHRpZiAoIG5vZGUgIT09IGhlYWQgKSB7XG5cdFx0XHRcdC8vIEFzIHRhaWwsIHNoaWZ0IHRvIHByZXZpb3VzLiBNdXN0IG9ubHkgc2hpZnQgaWYgbm90IGFsc29cblx0XHRcdFx0Ly8gaGVhZCwgc2luY2UgaWYgYm90aCBoZWFkIGFuZCB0YWlsLCB0aGVyZSBpcyBubyBwcmV2aW91cy5cblx0XHRcdFx0aWYgKCBub2RlID09PSB0YWlsICkge1xuXHRcdFx0XHRcdHRhaWwgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGp1c3Qgc2libGluZ3MgdG8gcG9pbnQgdG8gZWFjaCBvdGhlci4gSWYgbm9kZSB3YXMgdGFpbCxcblx0XHRcdFx0Ly8gdGhpcyBhbHNvIGhhbmRsZXMgbmV3IHRhaWwncyBlbXB0eSBgbmV4dGAgYXNzaWdubWVudC5cblx0XHRcdFx0bm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGlmICggbm9kZS5uZXh0ICkge1xuXHRcdFx0XHRcdG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bm9kZS5uZXh0ID0gaGVhZDtcblx0XHRcdFx0bm9kZS5wcmV2ID0gbnVsbDtcblx0XHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdFx0aGVhZCA9IG5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBpbW1lZGlhdGVseVxuXHRcdFx0cmV0dXJuIG5vZGUudmFsO1xuXHRcdH1cblxuXHRcdC8vIE5vIGNhY2hlZCB2YWx1ZSBmb3VuZC4gQ29udGludWUgdG8gaW5zZXJ0aW9uIHBoYXNlOlxuXG5cdFx0Ly8gQ3JlYXRlIGEgY29weSBvZiBhcmd1bWVudHMgKGF2b2lkIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24pXG5cdFx0YXJncyA9IG5ldyBBcnJheSggbGVuICk7XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdG5vZGUgPSB7XG5cdFx0XHRhcmdzOiBhcmdzLFxuXG5cdFx0XHQvLyBHZW5lcmF0ZSB0aGUgcmVzdWx0IGZyb20gb3JpZ2luYWwgZnVuY3Rpb25cblx0XHRcdHZhbDogZm4uYXBwbHkoIG51bGwsIGFyZ3MgKVxuXHRcdH07XG5cblx0XHQvLyBEb24ndCBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgbm9kZSBpcyBhbHJlYWR5IGhlYWQsIHNpbmNlIGl0IHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIHJldHVybmVkIGFib3ZlIGFscmVhZHkgaWYgaXQgd2FzXG5cblx0XHQvLyBTaGlmdCBleGlzdGluZyBoZWFkIGRvd24gbGlzdFxuXHRcdGlmICggaGVhZCApIHtcblx0XHRcdGhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBJZiBubyBoZWFkLCBmb2xsb3dzIHRoYXQgdGhlcmUncyBubyB0YWlsIChhdCBpbml0aWFsIG9yIHJlc2V0KVxuXHRcdFx0dGFpbCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0Ly8gVHJpbSB0YWlsIGlmIHdlJ3JlIHJlYWNoZWQgbWF4IHNpemUgYW5kIGFyZSBwZW5kaW5nIGNhY2hlIGluc2VydGlvblxuXHRcdGlmICggc2l6ZSA9PT0gbWF4U2l6ZSApIHtcblx0XHRcdHRhaWwgPSB0YWlsLnByZXY7XG5cdFx0XHR0YWlsLm5leHQgPSBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzaXplKys7XG5cdFx0fVxuXG5cdFx0aGVhZCA9IG5vZGU7XG5cblx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdH1cblxuXHRtZW1vaXplZC5jbGVhciA9IGZ1bmN0aW9uKCkge1xuXHRcdGhlYWQgPSBudWxsO1xuXHRcdHRhaWwgPSBudWxsO1xuXHRcdHNpemUgPSAwO1xuXHR9O1xuXG5cdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyApIHtcblx0XHQvLyBDYWNoZSBpcyBub3QgZXhwb3NlZCBpbiB0aGUgcHVibGljIEFQSSwgYnV0IHVzZWQgaW4gdGVzdHMgdG8gZW5zdXJlXG5cdFx0Ly8gZXhwZWN0ZWQgbGlzdCBwcm9ncmVzc2lvblxuXHRcdG1lbW9pemVkLmdldENhY2hlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyBoZWFkLCB0YWlsLCBzaXplIF07XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBtZW1vaXplZDtcbn07XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjJcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdldE5hbm9TZWNvbmRzLCBocnRpbWUsIGxvYWRUaW1lLCBtb2R1bGVMb2FkVGltZSwgbm9kZUxvYWRUaW1lLCB1cFRpbWU7XG5cbiAgaWYgKCh0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwpICYmIHBlcmZvcm1hbmNlLm5vdykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfTtcbiAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2VzcyAhPT0gbnVsbCkgJiYgcHJvY2Vzcy5ocnRpbWUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChnZXROYW5vU2Vjb25kcygpIC0gbm9kZUxvYWRUaW1lKSAvIDFlNjtcbiAgICB9O1xuICAgIGhydGltZSA9IHByb2Nlc3MuaHJ0aW1lO1xuICAgIGdldE5hbm9TZWNvbmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHI7XG4gICAgICBociA9IGhydGltZSgpO1xuICAgICAgcmV0dXJuIGhyWzBdICogMWU5ICsgaHJbMV07XG4gICAgfTtcbiAgICBtb2R1bGVMb2FkVGltZSA9IGdldE5hbm9TZWNvbmRzKCk7XG4gICAgdXBUaW1lID0gcHJvY2Vzcy51cHRpbWUoKSAqIDFlOTtcbiAgICBub2RlTG9hZFRpbWUgPSBtb2R1bGVMb2FkVGltZSAtIHVwVGltZTtcbiAgfSBlbHNlIGlmIChEYXRlLm5vdykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBEYXRlLm5vdygpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGVyZm9ybWFuY2Utbm93LmpzLm1hcFxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAndGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCVzYC4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogRGVjb2RlIGEgVVJJIGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgVVJJIGVuY29kZWQgc3RyaW5nLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGRlY29kZWQgc3RyaW5nLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0LnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn1cblxuLyoqXG4gKiBTaW1wbGUgcXVlcnkgc3RyaW5nIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIHBhcnNlZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZyhxdWVyeSkge1xuICB2YXIgcGFyc2VyID0gLyhbXj0/Jl0rKT0/KFteJl0qKS9nXG4gICAgLCByZXN1bHQgPSB7fVxuICAgICwgcGFydDtcblxuICAvL1xuICAvLyBMaXR0bGUgbmlmdHkgcGFyc2luZyBoYWNrLCBsZXZlcmFnZSB0aGUgZmFjdCB0aGF0IFJlZ0V4cC5leGVjIGluY3JlbWVudHNcbiAgLy8gdGhlIGxhc3RJbmRleCBwcm9wZXJ0eSBzbyB3ZSBjYW4gY29udGludWUgZXhlY3V0aW5nIHRoaXMgbG9vcCB1bnRpbCB3ZSd2ZVxuICAvLyBwYXJzZWQgYWxsIHJlc3VsdHMuXG4gIC8vXG4gIGZvciAoO1xuICAgIHBhcnQgPSBwYXJzZXIuZXhlYyhxdWVyeSk7XG4gICAgcmVzdWx0W2RlY29kZShwYXJ0WzFdKV0gPSBkZWNvZGUocGFydFsyXSlcbiAgKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW107XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyc9JysgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcbiIsInZhciBub3cgPSByZXF1aXJlKCdwZXJmb3JtYW5jZS1ub3cnKVxuICAsIHJvb3QgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvd1xuICAsIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXVxuICAsIHN1ZmZpeCA9ICdBbmltYXRpb25GcmFtZSdcbiAgLCByYWYgPSByb290WydyZXF1ZXN0JyArIHN1ZmZpeF1cbiAgLCBjYWYgPSByb290WydjYW5jZWwnICsgc3VmZml4XSB8fCByb290WydjYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cblxuZm9yKHZhciBpID0gMDsgIXJhZiAmJiBpIDwgdmVuZG9ycy5sZW5ndGg7IGkrKykge1xuICByYWYgPSByb290W3ZlbmRvcnNbaV0gKyAnUmVxdWVzdCcgKyBzdWZmaXhdXG4gIGNhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdDYW5jZWwnICsgc3VmZml4XVxuICAgICAgfHwgcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxufVxuXG4vLyBTb21lIHZlcnNpb25zIG9mIEZGIGhhdmUgckFGIGJ1dCBub3QgY0FGXG5pZighcmFmIHx8ICFjYWYpIHtcbiAgdmFyIGxhc3QgPSAwXG4gICAgLCBpZCA9IDBcbiAgICAsIHF1ZXVlID0gW11cbiAgICAsIGZyYW1lRHVyYXRpb24gPSAxMDAwIC8gNjBcblxuICByYWYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFyIF9ub3cgPSBub3coKVxuICAgICAgICAsIG5leHQgPSBNYXRoLm1heCgwLCBmcmFtZUR1cmF0aW9uIC0gKF9ub3cgLSBsYXN0KSlcbiAgICAgIGxhc3QgPSBuZXh0ICsgX25vd1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNwID0gcXVldWUuc2xpY2UoMClcbiAgICAgICAgLy8gQ2xlYXIgcXVldWUgaGVyZSB0byBwcmV2ZW50XG4gICAgICAgIC8vIGNhbGxiYWNrcyBmcm9tIGFwcGVuZGluZyBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgZnJhbWUncyBxdWV1ZVxuICAgICAgICBxdWV1ZS5sZW5ndGggPSAwXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKCFjcFtpXS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgY3BbaV0uY2FsbGJhY2sobGFzdClcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aHJvdyBlIH0sIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBNYXRoLnJvdW5kKG5leHQpKVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKHtcbiAgICAgIGhhbmRsZTogKytpZCxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICB9KVxuICAgIHJldHVybiBpZFxuICB9XG5cbiAgY2FmID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihxdWV1ZVtpXS5oYW5kbGUgPT09IGhhbmRsZSkge1xuICAgICAgICBxdWV1ZVtpXS5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pIHtcbiAgLy8gV3JhcCBpbiBhIG5ldyBmdW5jdGlvbiB0byBwcmV2ZW50XG4gIC8vIGBjYW5jZWxgIHBvdGVudGlhbGx5IGJlaW5nIGFzc2lnbmVkXG4gIC8vIHRvIHRoZSBuYXRpdmUgckFGIGZ1bmN0aW9uXG4gIHJldHVybiByYWYuY2FsbChyb290LCBmbilcbn1cbm1vZHVsZS5leHBvcnRzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICBjYWYuYXBwbHkocm9vdCwgYXJndW1lbnRzKVxufVxubW9kdWxlLmV4cG9ydHMucG9seWZpbGwgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKCFvYmplY3QpIHtcbiAgICBvYmplY3QgPSByb290O1xuICB9XG4gIG9iamVjdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByYWZcbiAgb2JqZWN0LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2FmXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgc2l6ZXJTdHlsZSA9IHtcblx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdHRvcDogMCxcblx0bGVmdDogMCxcblx0dmlzaWJpbGl0eTogJ2hpZGRlbicsXG5cdGhlaWdodDogMCxcblx0b3ZlcmZsb3c6ICdzY3JvbGwnLFxuXHR3aGl0ZVNwYWNlOiAncHJlJ1xufTtcblxudmFyIElOUFVUX1BST1BTX0JMQUNLTElTVCA9IFsnZXh0cmFXaWR0aCcsICdpbmplY3RTdHlsZXMnLCAnaW5wdXRDbGFzc05hbWUnLCAnaW5wdXRSZWYnLCAnaW5wdXRTdHlsZScsICdtaW5XaWR0aCcsICdvbkF1dG9zaXplJywgJ3BsYWNlaG9sZGVySXNNaW5XaWR0aCddO1xuXG52YXIgY2xlYW5JbnB1dFByb3BzID0gZnVuY3Rpb24gY2xlYW5JbnB1dFByb3BzKGlucHV0UHJvcHMpIHtcblx0SU5QVVRfUFJPUFNfQkxBQ0tMSVNULmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG5cdFx0cmV0dXJuIGRlbGV0ZSBpbnB1dFByb3BzW2ZpZWxkXTtcblx0fSk7XG5cdHJldHVybiBpbnB1dFByb3BzO1xufTtcblxudmFyIGNvcHlTdHlsZXMgPSBmdW5jdGlvbiBjb3B5U3R5bGVzKHN0eWxlcywgbm9kZSkge1xuXHRub2RlLnN0eWxlLmZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuXHRub2RlLnN0eWxlLmZvbnRGYW1pbHkgPSBzdHlsZXMuZm9udEZhbWlseTtcblx0bm9kZS5zdHlsZS5mb250V2VpZ2h0ID0gc3R5bGVzLmZvbnRXZWlnaHQ7XG5cdG5vZGUuc3R5bGUuZm9udFN0eWxlID0gc3R5bGVzLmZvbnRTdHlsZTtcblx0bm9kZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gc3R5bGVzLmxldHRlclNwYWNpbmc7XG5cdG5vZGUuc3R5bGUudGV4dFRyYW5zZm9ybSA9IHN0eWxlcy50ZXh0VHJhbnNmb3JtO1xufTtcblxudmFyIGlzSUUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yID8gL01TSUUgfFRyaWRlbnRcXC98RWRnZVxcLy8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgOiBmYWxzZTtcblxudmFyIGdlbmVyYXRlSWQgPSBmdW5jdGlvbiBnZW5lcmF0ZUlkKCkge1xuXHQvLyB3ZSBvbmx5IG5lZWQgYW4gYXV0by1nZW5lcmF0ZWQgSUQgZm9yIHN0eWxlc2hlZXQgaW5qZWN0aW9uLCB3aGljaCBpcyBvbmx5XG5cdC8vIHVzZWQgZm9yIElFLiBzbyBpZiB0aGUgYnJvd3NlciBpcyBub3QgSUUsIHRoaXMgc2hvdWxkIHJldHVybiB1bmRlZmluZWQuXG5cdHJldHVybiBpc0lFID8gJ18nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDEyKSA6IHVuZGVmaW5lZDtcbn07XG5cbnZhciBBdXRvc2l6ZUlucHV0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0X2luaGVyaXRzKEF1dG9zaXplSW5wdXQsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIEF1dG9zaXplSW5wdXQocHJvcHMpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b3NpemVJbnB1dCk7XG5cblx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXV0b3NpemVJbnB1dC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEF1dG9zaXplSW5wdXQpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cblx0XHRfdGhpcy5pbnB1dFJlZiA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0X3RoaXMuaW5wdXQgPSBlbDtcblx0XHRcdGlmICh0eXBlb2YgX3RoaXMucHJvcHMuaW5wdXRSZWYgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0X3RoaXMucHJvcHMuaW5wdXRSZWYoZWwpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRfdGhpcy5wbGFjZUhvbGRlclNpemVyUmVmID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRfdGhpcy5wbGFjZUhvbGRlclNpemVyID0gZWw7XG5cdFx0fTtcblxuXHRcdF90aGlzLnNpemVyUmVmID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRfdGhpcy5zaXplciA9IGVsO1xuXHRcdH07XG5cblx0XHRfdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlucHV0V2lkdGg6IHByb3BzLm1pbldpZHRoLFxuXHRcdFx0aW5wdXRJZDogcHJvcHMuaWQgfHwgZ2VuZXJhdGVJZCgpXG5cdFx0fTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRfY3JlYXRlQ2xhc3MoQXV0b3NpemVJbnB1dCwgW3tcblx0XHRrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdFx0dGhpcy5tb3VudGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuY29weUlucHV0U3R5bGVzKCk7XG5cdFx0XHR0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcblx0XHRcdHZhciBpZCA9IG5leHRQcm9wcy5pZDtcblxuXHRcdFx0aWYgKGlkICE9PSB0aGlzLnByb3BzLmlkKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dElkOiBpZCB8fCBnZW5lcmF0ZUlkKCkgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0XHRpZiAocHJldlN0YXRlLmlucHV0V2lkdGggIT09IHRoaXMuc3RhdGUuaW5wdXRXaWR0aCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25BdXRvc2l6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHRoaXMucHJvcHMub25BdXRvc2l6ZSh0aGlzLnN0YXRlLmlucHV0V2lkdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdFx0dGhpcy5tb3VudGVkID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29weUlucHV0U3R5bGVzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29weUlucHV0U3R5bGVzKCkge1xuXHRcdFx0aWYgKCF0aGlzLm1vdW50ZWQgfHwgIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBpbnB1dFN0eWxlcyA9IHRoaXMuaW5wdXQgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbnB1dCk7XG5cdFx0XHRpZiAoIWlucHV0U3R5bGVzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvcHlTdHlsZXMoaW5wdXRTdHlsZXMsIHRoaXMuc2l6ZXIpO1xuXHRcdFx0aWYgKHRoaXMucGxhY2VIb2xkZXJTaXplcikge1xuXHRcdFx0XHRjb3B5U3R5bGVzKGlucHV0U3R5bGVzLCB0aGlzLnBsYWNlSG9sZGVyU2l6ZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3VwZGF0ZUlucHV0V2lkdGgnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVJbnB1dFdpZHRoKCkge1xuXHRcdFx0aWYgKCF0aGlzLm1vdW50ZWQgfHwgIXRoaXMuc2l6ZXIgfHwgdHlwZW9mIHRoaXMuc2l6ZXIuc2Nyb2xsV2lkdGggPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBuZXdJbnB1dFdpZHRoID0gdm9pZCAwO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgJiYgKCF0aGlzLnByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5wcm9wcy5wbGFjZWhvbGRlcklzTWluV2lkdGgpKSB7XG5cdFx0XHRcdG5ld0lucHV0V2lkdGggPSBNYXRoLm1heCh0aGlzLnNpemVyLnNjcm9sbFdpZHRoLCB0aGlzLnBsYWNlSG9sZGVyU2l6ZXIuc2Nyb2xsV2lkdGgpICsgMjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld0lucHV0V2lkdGggPSB0aGlzLnNpemVyLnNjcm9sbFdpZHRoICsgMjtcblx0XHRcdH1cblx0XHRcdC8vIGFkZCBleHRyYVdpZHRoIHRvIHRoZSBkZXRlY3RlZCB3aWR0aC4gZm9yIG51bWJlciB0eXBlcywgdGhpcyBkZWZhdWx0cyB0byAxNiB0byBhbGxvdyBmb3IgdGhlIHN0ZXBwZXIgVUlcblx0XHRcdHZhciBleHRyYVdpZHRoID0gdGhpcy5wcm9wcy50eXBlID09PSAnbnVtYmVyJyAmJiB0aGlzLnByb3BzLmV4dHJhV2lkdGggPT09IHVuZGVmaW5lZCA/IDE2IDogcGFyc2VJbnQodGhpcy5wcm9wcy5leHRyYVdpZHRoKSB8fCAwO1xuXHRcdFx0bmV3SW5wdXRXaWR0aCArPSBleHRyYVdpZHRoO1xuXHRcdFx0aWYgKG5ld0lucHV0V2lkdGggPCB0aGlzLnByb3BzLm1pbldpZHRoKSB7XG5cdFx0XHRcdG5ld0lucHV0V2lkdGggPSB0aGlzLnByb3BzLm1pbldpZHRoO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG5ld0lucHV0V2lkdGggIT09IHRoaXMuc3RhdGUuaW5wdXRXaWR0aCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpbnB1dFdpZHRoOiBuZXdJbnB1dFdpZHRoXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldElucHV0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbnB1dDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0dGhpcy5pbnB1dC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2JsdXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBibHVyKCkge1xuXHRcdFx0dGhpcy5pbnB1dC5ibHVyKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnc2VsZWN0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2VsZWN0KCkge1xuXHRcdFx0dGhpcy5pbnB1dC5zZWxlY3QoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJTdHlsZXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJTdHlsZXMoKSB7XG5cdFx0XHQvLyB0aGlzIG1ldGhvZCBpbmplY3RzIHN0eWxlcyB0byBoaWRlIElFJ3MgY2xlYXIgaW5kaWNhdG9yLCB3aGljaCBtZXNzZXNcblx0XHRcdC8vIHdpdGggaW5wdXQgc2l6ZSBkZXRlY3Rpb24uIHRoZSBzdHlsZXNoZWV0IGlzIG9ubHkgaW5qZWN0ZWQgd2hlbiB0aGVcblx0XHRcdC8vIGJyb3dzZXIgaXMgSUUsIGFuZCBjYW4gYWxzbyBiZSBkaXNhYmxlZCBieSB0aGUgYGluamVjdFN0eWxlc2AgcHJvcC5cblx0XHRcdHZhciBpbmplY3RTdHlsZXMgPSB0aGlzLnByb3BzLmluamVjdFN0eWxlcztcblxuXHRcdFx0cmV0dXJuIGlzSUUgJiYgaW5qZWN0U3R5bGVzID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuXHRcdFx0XHRcdF9faHRtbDogJ2lucHV0IycgKyB0aGlzLnN0YXRlLmlucHV0SWQgKyAnOjotbXMtY2xlYXIge2Rpc3BsYXk6IG5vbmU7fSdcblx0XHRcdFx0fSB9KSA6IG51bGw7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dmFyIHNpemVyVmFsdWUgPSBbdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsIHRoaXMucHJvcHMudmFsdWUsICcnXS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0XHRpZiAocHJldmlvdXNWYWx1ZSAhPT0gbnVsbCAmJiBwcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcHJldmlvdXNWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gY3VycmVudFZhbHVlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhciB3cmFwcGVyU3R5bGUgPSBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cdFx0XHRpZiAoIXdyYXBwZXJTdHlsZS5kaXNwbGF5KSB3cmFwcGVyU3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXG5cdFx0XHR2YXIgaW5wdXRTdHlsZSA9IF9leHRlbmRzKHtcblx0XHRcdFx0Ym94U2l6aW5nOiAnY29udGVudC1ib3gnLFxuXHRcdFx0XHR3aWR0aDogdGhpcy5zdGF0ZS5pbnB1dFdpZHRoICsgJ3B4J1xuXHRcdFx0fSwgdGhpcy5wcm9wcy5pbnB1dFN0eWxlKTtcblxuXHRcdFx0dmFyIGlucHV0UHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXModGhpcy5wcm9wcywgW10pO1xuXG5cdFx0XHRjbGVhbklucHV0UHJvcHMoaW5wdXRQcm9wcyk7XG5cdFx0XHRpbnB1dFByb3BzLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMuaW5wdXRDbGFzc05hbWU7XG5cdFx0XHRpbnB1dFByb3BzLmlkID0gdGhpcy5zdGF0ZS5pbnB1dElkO1xuXHRcdFx0aW5wdXRQcm9wcy5zdHlsZSA9IGlucHV0U3R5bGU7XG5cblx0XHRcdHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGU6IHdyYXBwZXJTdHlsZSB9LFxuXHRcdFx0XHR0aGlzLnJlbmRlclN0eWxlcygpLFxuXHRcdFx0XHRfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBfZXh0ZW5kcyh7fSwgaW5wdXRQcm9wcywgeyByZWY6IHRoaXMuaW5wdXRSZWYgfSkpLFxuXHRcdFx0XHRfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHR7IHJlZjogdGhpcy5zaXplclJlZiwgc3R5bGU6IHNpemVyU3R5bGUgfSxcblx0XHRcdFx0XHRzaXplclZhbHVlXG5cdFx0XHRcdCksXG5cdFx0XHRcdHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHR7IHJlZjogdGhpcy5wbGFjZUhvbGRlclNpemVyUmVmLCBzdHlsZTogc2l6ZXJTdHlsZSB9LFxuXHRcdFx0XHRcdHRoaXMucHJvcHMucGxhY2Vob2xkZXJcblx0XHRcdFx0KSA6IG51bGxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIEF1dG9zaXplSW5wdXQ7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5BdXRvc2l6ZUlucHV0LnByb3BUeXBlcyA9IHtcblx0Y2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gY2xhc3NOYW1lIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHRkZWZhdWx0VmFsdWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYW55LCAvLyBkZWZhdWx0IGZpZWxkIHZhbHVlXG5cdGV4dHJhV2lkdGg6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFsvLyBhZGRpdGlvbmFsIHdpZHRoIGZvciBpbnB1dCBlbGVtZW50XG5cdF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLCBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZ10pLFxuXHRpZDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIC8vIGlkIHRvIHVzZSBmb3IgdGhlIGlucHV0LCBjYW4gYmUgc2V0IGZvciBjb25zaXN0ZW50IHNuYXBzaG90c1xuXHRpbmplY3RTdHlsZXM6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCwgLy8gaW5qZWN0IHRoZSBjdXN0b20gc3R5bGVzaGVldCB0byBoaWRlIGNsZWFyIFVJLCBkZWZhdWx0cyB0byB0cnVlXG5cdGlucHV0Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gY2xhc3NOYW1lIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRpbnB1dFJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLCAvLyByZWYgY2FsbGJhY2sgZm9yIHRoZSBpbnB1dCBlbGVtZW50XG5cdGlucHV0U3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LCAvLyBjc3Mgc3R5bGVzIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRtaW5XaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoWy8vIG1pbmltdW0gd2lkdGggZm9yIGlucHV0IGVsZW1lbnRcblx0X3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXSksXG5cdG9uQXV0b3NpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYywgLy8gb25BdXRvc2l6ZSBoYW5kbGVyOiBmdW5jdGlvbihuZXdXaWR0aCkge31cblx0b25DaGFuZ2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYywgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHt9XG5cdHBsYWNlaG9sZGVyOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gcGxhY2Vob2xkZXIgdGV4dFxuXHRwbGFjZWhvbGRlcklzTWluV2lkdGg6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCwgLy8gZG9uJ3QgY29sbGFwc2Ugc2l6ZSB0byBsZXNzIHRoYW4gdGhlIHBsYWNlaG9sZGVyXG5cdHN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCwgLy8gY3NzIHN0eWxlcyBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0dmFsdWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYW55IC8vIGZpZWxkIHZhbHVlXG59O1xuQXV0b3NpemVJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG5cdG1pbldpZHRoOiAxLFxuXHRpbmplY3RTdHlsZXM6IHRydWVcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEF1dG9zaXplSW5wdXQ7IiwiaW1wb3J0IHsgY3NzLCBpbmplY3RHbG9iYWwgfSBmcm9tICdlbW90aW9uJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSwgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCByYWYgZnJvbSAncmFmJztcbmltcG9ydCBBdXRvc2l6ZUlucHV0IGZyb20gJ3JlYWN0LWlucHV0LWF1dG9zaXplJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbnZhciBkaWFjcml0aWNzID0gW3sgYmFzZTogJ0EnLCBsZXR0ZXJzOiAvW1xcdTAwNDFcXHUyNEI2XFx1RkYyMVxcdTAwQzBcXHUwMEMxXFx1MDBDMlxcdTFFQTZcXHUxRUE0XFx1MUVBQVxcdTFFQThcXHUwMEMzXFx1MDEwMFxcdTAxMDJcXHUxRUIwXFx1MUVBRVxcdTFFQjRcXHUxRUIyXFx1MDIyNlxcdTAxRTBcXHUwMEM0XFx1MDFERVxcdTFFQTJcXHUwMEM1XFx1MDFGQVxcdTAxQ0RcXHUwMjAwXFx1MDIwMlxcdTFFQTBcXHUxRUFDXFx1MUVCNlxcdTFFMDBcXHUwMTA0XFx1MDIzQVxcdTJDNkZdL2cgfSwgeyBiYXNlOiAnQUEnLCBsZXR0ZXJzOiAvW1xcdUE3MzJdL2cgfSwgeyBiYXNlOiAnQUUnLCBsZXR0ZXJzOiAvW1xcdTAwQzZcXHUwMUZDXFx1MDFFMl0vZyB9LCB7IGJhc2U6ICdBTycsIGxldHRlcnM6IC9bXFx1QTczNF0vZyB9LCB7IGJhc2U6ICdBVScsIGxldHRlcnM6IC9bXFx1QTczNl0vZyB9LCB7IGJhc2U6ICdBVicsIGxldHRlcnM6IC9bXFx1QTczOFxcdUE3M0FdL2cgfSwgeyBiYXNlOiAnQVknLCBsZXR0ZXJzOiAvW1xcdUE3M0NdL2cgfSwgeyBiYXNlOiAnQicsIGxldHRlcnM6IC9bXFx1MDA0MlxcdTI0QjdcXHVGRjIyXFx1MUUwMlxcdTFFMDRcXHUxRTA2XFx1MDI0M1xcdTAxODJcXHUwMTgxXS9nIH0sIHsgYmFzZTogJ0MnLCBsZXR0ZXJzOiAvW1xcdTAwNDNcXHUyNEI4XFx1RkYyM1xcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMEM3XFx1MUUwOFxcdTAxODdcXHUwMjNCXFx1QTczRV0vZyB9LCB7IGJhc2U6ICdEJywgbGV0dGVyczogL1tcXHUwMDQ0XFx1MjRCOVxcdUZGMjRcXHUxRTBBXFx1MDEwRVxcdTFFMENcXHUxRTEwXFx1MUUxMlxcdTFFMEVcXHUwMTEwXFx1MDE4QlxcdTAxOEFcXHUwMTg5XFx1QTc3OV0vZyB9LCB7IGJhc2U6ICdEWicsIGxldHRlcnM6IC9bXFx1MDFGMVxcdTAxQzRdL2cgfSwgeyBiYXNlOiAnRHonLCBsZXR0ZXJzOiAvW1xcdTAxRjJcXHUwMUM1XS9nIH0sIHsgYmFzZTogJ0UnLCBsZXR0ZXJzOiAvW1xcdTAwNDVcXHUyNEJBXFx1RkYyNVxcdTAwQzhcXHUwMEM5XFx1MDBDQVxcdTFFQzBcXHUxRUJFXFx1MUVDNFxcdTFFQzJcXHUxRUJDXFx1MDExMlxcdTFFMTRcXHUxRTE2XFx1MDExNFxcdTAxMTZcXHUwMENCXFx1MUVCQVxcdTAxMUFcXHUwMjA0XFx1MDIwNlxcdTFFQjhcXHUxRUM2XFx1MDIyOFxcdTFFMUNcXHUwMTE4XFx1MUUxOFxcdTFFMUFcXHUwMTkwXFx1MDE4RV0vZyB9LCB7IGJhc2U6ICdGJywgbGV0dGVyczogL1tcXHUwMDQ2XFx1MjRCQlxcdUZGMjZcXHUxRTFFXFx1MDE5MVxcdUE3N0JdL2cgfSwgeyBiYXNlOiAnRycsIGxldHRlcnM6IC9bXFx1MDA0N1xcdTI0QkNcXHVGRjI3XFx1MDFGNFxcdTAxMUNcXHUxRTIwXFx1MDExRVxcdTAxMjBcXHUwMUU2XFx1MDEyMlxcdTAxRTRcXHUwMTkzXFx1QTdBMFxcdUE3N0RcXHVBNzdFXS9nIH0sIHsgYmFzZTogJ0gnLCBsZXR0ZXJzOiAvW1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEXS9nIH0sIHsgYmFzZTogJ0knLCBsZXR0ZXJzOiAvW1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3XS9nIH0sIHsgYmFzZTogJ0onLCBsZXR0ZXJzOiAvW1xcdTAwNEFcXHUyNEJGXFx1RkYyQVxcdTAxMzRcXHUwMjQ4XS9nIH0sIHsgYmFzZTogJ0snLCBsZXR0ZXJzOiAvW1xcdTAwNEJcXHUyNEMwXFx1RkYyQlxcdTFFMzBcXHUwMUU4XFx1MUUzMlxcdTAxMzZcXHUxRTM0XFx1MDE5OFxcdTJDNjlcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBN0EyXS9nIH0sIHsgYmFzZTogJ0wnLCBsZXR0ZXJzOiAvW1xcdTAwNENcXHUyNEMxXFx1RkYyQ1xcdTAxM0ZcXHUwMTM5XFx1MDEzRFxcdTFFMzZcXHUxRTM4XFx1MDEzQlxcdTFFM0NcXHUxRTNBXFx1MDE0MVxcdTAyM0RcXHUyQzYyXFx1MkM2MFxcdUE3NDhcXHVBNzQ2XFx1QTc4MF0vZyB9LCB7IGJhc2U6ICdMSicsIGxldHRlcnM6IC9bXFx1MDFDN10vZyB9LCB7IGJhc2U6ICdMaicsIGxldHRlcnM6IC9bXFx1MDFDOF0vZyB9LCB7IGJhc2U6ICdNJywgbGV0dGVyczogL1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZyB9LCB7IGJhc2U6ICdOJywgbGV0dGVyczogL1tcXHUwMDRFXFx1MjRDM1xcdUZGMkVcXHUwMUY4XFx1MDE0M1xcdTAwRDFcXHUxRTQ0XFx1MDE0N1xcdTFFNDZcXHUwMTQ1XFx1MUU0QVxcdTFFNDhcXHUwMjIwXFx1MDE5RFxcdUE3OTBcXHVBN0E0XS9nIH0sIHsgYmFzZTogJ05KJywgbGV0dGVyczogL1tcXHUwMUNBXS9nIH0sIHsgYmFzZTogJ05qJywgbGV0dGVyczogL1tcXHUwMUNCXS9nIH0sIHsgYmFzZTogJ08nLCBsZXR0ZXJzOiAvW1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NENdL2cgfSwgeyBiYXNlOiAnT0knLCBsZXR0ZXJzOiAvW1xcdTAxQTJdL2cgfSwgeyBiYXNlOiAnT08nLCBsZXR0ZXJzOiAvW1xcdUE3NEVdL2cgfSwgeyBiYXNlOiAnT1UnLCBsZXR0ZXJzOiAvW1xcdTAyMjJdL2cgfSwgeyBiYXNlOiAnUCcsIGxldHRlcnM6IC9bXFx1MDA1MFxcdTI0QzVcXHVGRjMwXFx1MUU1NFxcdTFFNTZcXHUwMUE0XFx1MkM2M1xcdUE3NTBcXHVBNzUyXFx1QTc1NF0vZyB9LCB7IGJhc2U6ICdRJywgbGV0dGVyczogL1tcXHUwMDUxXFx1MjRDNlxcdUZGMzFcXHVBNzU2XFx1QTc1OFxcdTAyNEFdL2cgfSwgeyBiYXNlOiAnUicsIGxldHRlcnM6IC9bXFx1MDA1MlxcdTI0QzdcXHVGRjMyXFx1MDE1NFxcdTFFNThcXHUwMTU4XFx1MDIxMFxcdTAyMTJcXHUxRTVBXFx1MUU1Q1xcdTAxNTZcXHUxRTVFXFx1MDI0Q1xcdTJDNjRcXHVBNzVBXFx1QTdBNlxcdUE3ODJdL2cgfSwgeyBiYXNlOiAnUycsIGxldHRlcnM6IC9bXFx1MDA1M1xcdTI0QzhcXHVGRjMzXFx1MUU5RVxcdTAxNUFcXHUxRTY0XFx1MDE1Q1xcdTFFNjBcXHUwMTYwXFx1MUU2NlxcdTFFNjJcXHUxRTY4XFx1MDIxOFxcdTAxNUVcXHUyQzdFXFx1QTdBOFxcdUE3ODRdL2cgfSwgeyBiYXNlOiAnVCcsIGxldHRlcnM6IC9bXFx1MDA1NFxcdTI0QzlcXHVGRjM0XFx1MUU2QVxcdTAxNjRcXHUxRTZDXFx1MDIxQVxcdTAxNjJcXHUxRTcwXFx1MUU2RVxcdTAxNjZcXHUwMUFDXFx1MDFBRVxcdTAyM0VcXHVBNzg2XS9nIH0sIHsgYmFzZTogJ1RaJywgbGV0dGVyczogL1tcXHVBNzI4XS9nIH0sIHsgYmFzZTogJ1UnLCBsZXR0ZXJzOiAvW1xcdTAwNTVcXHUyNENBXFx1RkYzNVxcdTAwRDlcXHUwMERBXFx1MDBEQlxcdTAxNjhcXHUxRTc4XFx1MDE2QVxcdTFFN0FcXHUwMTZDXFx1MDBEQ1xcdTAxREJcXHUwMUQ3XFx1MDFENVxcdTAxRDlcXHUxRUU2XFx1MDE2RVxcdTAxNzBcXHUwMUQzXFx1MDIxNFxcdTAyMTZcXHUwMUFGXFx1MUVFQVxcdTFFRThcXHUxRUVFXFx1MUVFQ1xcdTFFRjBcXHUxRUU0XFx1MUU3MlxcdTAxNzJcXHUxRTc2XFx1MUU3NFxcdTAyNDRdL2cgfSwgeyBiYXNlOiAnVicsIGxldHRlcnM6IC9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2cgfSwgeyBiYXNlOiAnVlknLCBsZXR0ZXJzOiAvW1xcdUE3NjBdL2cgfSwgeyBiYXNlOiAnVycsIGxldHRlcnM6IC9bXFx1MDA1N1xcdTI0Q0NcXHVGRjM3XFx1MUU4MFxcdTFFODJcXHUwMTc0XFx1MUU4NlxcdTFFODRcXHUxRTg4XFx1MkM3Ml0vZyB9LCB7IGJhc2U6ICdYJywgbGV0dGVyczogL1tcXHUwMDU4XFx1MjRDRFxcdUZGMzhcXHUxRThBXFx1MUU4Q10vZyB9LCB7IGJhc2U6ICdZJywgbGV0dGVyczogL1tcXHUwMDU5XFx1MjRDRVxcdUZGMzlcXHUxRUYyXFx1MDBERFxcdTAxNzZcXHUxRUY4XFx1MDIzMlxcdTFFOEVcXHUwMTc4XFx1MUVGNlxcdTFFRjRcXHUwMUIzXFx1MDI0RVxcdTFFRkVdL2cgfSwgeyBiYXNlOiAnWicsIGxldHRlcnM6IC9bXFx1MDA1QVxcdTI0Q0ZcXHVGRjNBXFx1MDE3OVxcdTFFOTBcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUxRTk0XFx1MDFCNVxcdTAyMjRcXHUyQzdGXFx1MkM2QlxcdUE3NjJdL2cgfSwgeyBiYXNlOiAnYScsIGxldHRlcnM6IC9bXFx1MDA2MVxcdTI0RDBcXHVGRjQxXFx1MUU5QVxcdTAwRTBcXHUwMEUxXFx1MDBFMlxcdTFFQTdcXHUxRUE1XFx1MUVBQlxcdTFFQTlcXHUwMEUzXFx1MDEwMVxcdTAxMDNcXHUxRUIxXFx1MUVBRlxcdTFFQjVcXHUxRUIzXFx1MDIyN1xcdTAxRTFcXHUwMEU0XFx1MDFERlxcdTFFQTNcXHUwMEU1XFx1MDFGQlxcdTAxQ0VcXHUwMjAxXFx1MDIwM1xcdTFFQTFcXHUxRUFEXFx1MUVCN1xcdTFFMDFcXHUwMTA1XFx1MkM2NVxcdTAyNTBdL2cgfSwgeyBiYXNlOiAnYWEnLCBsZXR0ZXJzOiAvW1xcdUE3MzNdL2cgfSwgeyBiYXNlOiAnYWUnLCBsZXR0ZXJzOiAvW1xcdTAwRTZcXHUwMUZEXFx1MDFFM10vZyB9LCB7IGJhc2U6ICdhbycsIGxldHRlcnM6IC9bXFx1QTczNV0vZyB9LCB7IGJhc2U6ICdhdScsIGxldHRlcnM6IC9bXFx1QTczN10vZyB9LCB7IGJhc2U6ICdhdicsIGxldHRlcnM6IC9bXFx1QTczOVxcdUE3M0JdL2cgfSwgeyBiYXNlOiAnYXknLCBsZXR0ZXJzOiAvW1xcdUE3M0RdL2cgfSwgeyBiYXNlOiAnYicsIGxldHRlcnM6IC9bXFx1MDA2MlxcdTI0RDFcXHVGRjQyXFx1MUUwM1xcdTFFMDVcXHUxRTA3XFx1MDE4MFxcdTAxODNcXHUwMjUzXS9nIH0sIHsgYmFzZTogJ2MnLCBsZXR0ZXJzOiAvW1xcdTAwNjNcXHUyNEQyXFx1RkY0M1xcdTAxMDdcXHUwMTA5XFx1MDEwQlxcdTAxMERcXHUwMEU3XFx1MUUwOVxcdTAxODhcXHUwMjNDXFx1QTczRlxcdTIxODRdL2cgfSwgeyBiYXNlOiAnZCcsIGxldHRlcnM6IC9bXFx1MDA2NFxcdTI0RDNcXHVGRjQ0XFx1MUUwQlxcdTAxMEZcXHUxRTBEXFx1MUUxMVxcdTFFMTNcXHUxRTBGXFx1MDExMVxcdTAxOENcXHUwMjU2XFx1MDI1N1xcdUE3N0FdL2cgfSwgeyBiYXNlOiAnZHonLCBsZXR0ZXJzOiAvW1xcdTAxRjNcXHUwMUM2XS9nIH0sIHsgYmFzZTogJ2UnLCBsZXR0ZXJzOiAvW1xcdTAwNjVcXHUyNEQ0XFx1RkY0NVxcdTAwRThcXHUwMEU5XFx1MDBFQVxcdTFFQzFcXHUxRUJGXFx1MUVDNVxcdTFFQzNcXHUxRUJEXFx1MDExM1xcdTFFMTVcXHUxRTE3XFx1MDExNVxcdTAxMTdcXHUwMEVCXFx1MUVCQlxcdTAxMUJcXHUwMjA1XFx1MDIwN1xcdTFFQjlcXHUxRUM3XFx1MDIyOVxcdTFFMURcXHUwMTE5XFx1MUUxOVxcdTFFMUJcXHUwMjQ3XFx1MDI1QlxcdTAxRERdL2cgfSwgeyBiYXNlOiAnZicsIGxldHRlcnM6IC9bXFx1MDA2NlxcdTI0RDVcXHVGRjQ2XFx1MUUxRlxcdTAxOTJcXHVBNzdDXS9nIH0sIHsgYmFzZTogJ2cnLCBsZXR0ZXJzOiAvW1xcdTAwNjdcXHUyNEQ2XFx1RkY0N1xcdTAxRjVcXHUwMTFEXFx1MUUyMVxcdTAxMUZcXHUwMTIxXFx1MDFFN1xcdTAxMjNcXHUwMUU1XFx1MDI2MFxcdUE3QTFcXHUxRDc5XFx1QTc3Rl0vZyB9LCB7IGJhc2U6ICdoJywgbGV0dGVyczogL1tcXHUwMDY4XFx1MjREN1xcdUZGNDhcXHUwMTI1XFx1MUUyM1xcdTFFMjdcXHUwMjFGXFx1MUUyNVxcdTFFMjlcXHUxRTJCXFx1MUU5NlxcdTAxMjdcXHUyQzY4XFx1MkM3NlxcdTAyNjVdL2cgfSwgeyBiYXNlOiAnaHYnLCBsZXR0ZXJzOiAvW1xcdTAxOTVdL2cgfSwgeyBiYXNlOiAnaScsIGxldHRlcnM6IC9bXFx1MDA2OVxcdTI0RDhcXHVGRjQ5XFx1MDBFQ1xcdTAwRURcXHUwMEVFXFx1MDEyOVxcdTAxMkJcXHUwMTJEXFx1MDBFRlxcdTFFMkZcXHUxRUM5XFx1MDFEMFxcdTAyMDlcXHUwMjBCXFx1MUVDQlxcdTAxMkZcXHUxRTJEXFx1MDI2OFxcdTAxMzFdL2cgfSwgeyBiYXNlOiAnaicsIGxldHRlcnM6IC9bXFx1MDA2QVxcdTI0RDlcXHVGRjRBXFx1MDEzNVxcdTAxRjBcXHUwMjQ5XS9nIH0sIHsgYmFzZTogJ2snLCBsZXR0ZXJzOiAvW1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzXS9nIH0sIHsgYmFzZTogJ2wnLCBsZXR0ZXJzOiAvW1xcdTAwNkNcXHUyNERCXFx1RkY0Q1xcdTAxNDBcXHUwMTNBXFx1MDEzRVxcdTFFMzdcXHUxRTM5XFx1MDEzQ1xcdTFFM0RcXHUxRTNCXFx1MDE3RlxcdTAxNDJcXHUwMTlBXFx1MDI2QlxcdTJDNjFcXHVBNzQ5XFx1QTc4MVxcdUE3NDddL2cgfSwgeyBiYXNlOiAnbGonLCBsZXR0ZXJzOiAvW1xcdTAxQzldL2cgfSwgeyBiYXNlOiAnbScsIGxldHRlcnM6IC9bXFx1MDA2RFxcdTI0RENcXHVGRjREXFx1MUUzRlxcdTFFNDFcXHUxRTQzXFx1MDI3MVxcdTAyNkZdL2cgfSwgeyBiYXNlOiAnbicsIGxldHRlcnM6IC9bXFx1MDA2RVxcdTI0RERcXHVGRjRFXFx1MDFGOVxcdTAxNDRcXHUwMEYxXFx1MUU0NVxcdTAxNDhcXHUxRTQ3XFx1MDE0NlxcdTFFNEJcXHUxRTQ5XFx1MDE5RVxcdTAyNzJcXHUwMTQ5XFx1QTc5MVxcdUE3QTVdL2cgfSwgeyBiYXNlOiAnbmonLCBsZXR0ZXJzOiAvW1xcdTAxQ0NdL2cgfSwgeyBiYXNlOiAnbycsIGxldHRlcnM6IC9bXFx1MDA2RlxcdTI0REVcXHVGRjRGXFx1MDBGMlxcdTAwRjNcXHUwMEY0XFx1MUVEM1xcdTFFRDFcXHUxRUQ3XFx1MUVENVxcdTAwRjVcXHUxRTREXFx1MDIyRFxcdTFFNEZcXHUwMTREXFx1MUU1MVxcdTFFNTNcXHUwMTRGXFx1MDIyRlxcdTAyMzFcXHUwMEY2XFx1MDIyQlxcdTFFQ0ZcXHUwMTUxXFx1MDFEMlxcdTAyMERcXHUwMjBGXFx1MDFBMVxcdTFFRERcXHUxRURCXFx1MUVFMVxcdTFFREZcXHUxRUUzXFx1MUVDRFxcdTFFRDlcXHUwMUVCXFx1MDFFRFxcdTAwRjhcXHUwMUZGXFx1MDI1NFxcdUE3NEJcXHVBNzREXFx1MDI3NV0vZyB9LCB7IGJhc2U6ICdvaScsIGxldHRlcnM6IC9bXFx1MDFBM10vZyB9LCB7IGJhc2U6ICdvdScsIGxldHRlcnM6IC9bXFx1MDIyM10vZyB9LCB7IGJhc2U6ICdvbycsIGxldHRlcnM6IC9bXFx1QTc0Rl0vZyB9LCB7IGJhc2U6ICdwJywgbGV0dGVyczogL1tcXHUwMDcwXFx1MjRERlxcdUZGNTBcXHUxRTU1XFx1MUU1N1xcdTAxQTVcXHUxRDdEXFx1QTc1MVxcdUE3NTNcXHVBNzU1XS9nIH0sIHsgYmFzZTogJ3EnLCBsZXR0ZXJzOiAvW1xcdTAwNzFcXHUyNEUwXFx1RkY1MVxcdTAyNEJcXHVBNzU3XFx1QTc1OV0vZyB9LCB7IGJhc2U6ICdyJywgbGV0dGVyczogL1tcXHUwMDcyXFx1MjRFMVxcdUZGNTJcXHUwMTU1XFx1MUU1OVxcdTAxNTlcXHUwMjExXFx1MDIxM1xcdTFFNUJcXHUxRTVEXFx1MDE1N1xcdTFFNUZcXHUwMjREXFx1MDI3RFxcdUE3NUJcXHVBN0E3XFx1QTc4M10vZyB9LCB7IGJhc2U6ICdzJywgbGV0dGVyczogL1tcXHUwMDczXFx1MjRFMlxcdUZGNTNcXHUwMERGXFx1MDE1QlxcdTFFNjVcXHUwMTVEXFx1MUU2MVxcdTAxNjFcXHUxRTY3XFx1MUU2M1xcdTFFNjlcXHUwMjE5XFx1MDE1RlxcdTAyM0ZcXHVBN0E5XFx1QTc4NVxcdTFFOUJdL2cgfSwgeyBiYXNlOiAndCcsIGxldHRlcnM6IC9bXFx1MDA3NFxcdTI0RTNcXHVGRjU0XFx1MUU2QlxcdTFFOTdcXHUwMTY1XFx1MUU2RFxcdTAyMUJcXHUwMTYzXFx1MUU3MVxcdTFFNkZcXHUwMTY3XFx1MDFBRFxcdTAyODhcXHUyQzY2XFx1QTc4N10vZyB9LCB7IGJhc2U6ICd0eicsIGxldHRlcnM6IC9bXFx1QTcyOV0vZyB9LCB7IGJhc2U6ICd1JywgbGV0dGVyczogL1tcXHUwMDc1XFx1MjRFNFxcdUZGNTVcXHUwMEY5XFx1MDBGQVxcdTAwRkJcXHUwMTY5XFx1MUU3OVxcdTAxNkJcXHUxRTdCXFx1MDE2RFxcdTAwRkNcXHUwMURDXFx1MDFEOFxcdTAxRDZcXHUwMURBXFx1MUVFN1xcdTAxNkZcXHUwMTcxXFx1MDFENFxcdTAyMTVcXHUwMjE3XFx1MDFCMFxcdTFFRUJcXHUxRUU5XFx1MUVFRlxcdTFFRURcXHUxRUYxXFx1MUVFNVxcdTFFNzNcXHUwMTczXFx1MUU3N1xcdTFFNzVcXHUwMjg5XS9nIH0sIHsgYmFzZTogJ3YnLCBsZXR0ZXJzOiAvW1xcdTAwNzZcXHUyNEU1XFx1RkY1NlxcdTFFN0RcXHUxRTdGXFx1MDI4QlxcdUE3NUZcXHUwMjhDXS9nIH0sIHsgYmFzZTogJ3Z5JywgbGV0dGVyczogL1tcXHVBNzYxXS9nIH0sIHsgYmFzZTogJ3cnLCBsZXR0ZXJzOiAvW1xcdTAwNzdcXHUyNEU2XFx1RkY1N1xcdTFFODFcXHUxRTgzXFx1MDE3NVxcdTFFODdcXHUxRTg1XFx1MUU5OFxcdTFFODlcXHUyQzczXS9nIH0sIHsgYmFzZTogJ3gnLCBsZXR0ZXJzOiAvW1xcdTAwNzhcXHUyNEU3XFx1RkY1OFxcdTFFOEJcXHUxRThEXS9nIH0sIHsgYmFzZTogJ3knLCBsZXR0ZXJzOiAvW1xcdTAwNzlcXHUyNEU4XFx1RkY1OVxcdTFFRjNcXHUwMEZEXFx1MDE3N1xcdTFFRjlcXHUwMjMzXFx1MUU4RlxcdTAwRkZcXHUxRUY3XFx1MUU5OVxcdTFFRjVcXHUwMUI0XFx1MDI0RlxcdTFFRkZdL2cgfSwgeyBiYXNlOiAneicsIGxldHRlcnM6IC9bXFx1MDA3QVxcdTI0RTlcXHVGRjVBXFx1MDE3QVxcdTFFOTFcXHUwMTdDXFx1MDE3RVxcdTFFOTNcXHUxRTk1XFx1MDFCNlxcdTAyMjVcXHUwMjQwXFx1MkM2Q1xcdUE3NjNdL2cgfV07XG5cbnZhciBzdHJpcERpYWNyaXRpY3MgPSBmdW5jdGlvbiBzdHJpcERpYWNyaXRpY3Moc3RyKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGlhY3JpdGljcy5sZW5ndGg7IGkrKykge1xuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKGRpYWNyaXRpY3NbaV0ubGV0dGVycywgZGlhY3JpdGljc1tpXS5iYXNlKTtcblx0fVxuXHRyZXR1cm4gc3RyO1xufTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBzbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG52YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxudmFyIHRyaW1TdHJpbmcgPSBmdW5jdGlvbiB0cmltU3RyaW5nKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn07XG52YXIgZGVmYXVsU3RyaW5naWZ5ID0gZnVuY3Rpb24gZGVmYXVsU3RyaW5naWZ5KG9wdGlvbikge1xuICByZXR1cm4gb3B0aW9uLmxhYmVsICsgJyAnICsgb3B0aW9uLnZhbHVlO1xufTtcblxudmFyIGNyZWF0ZUZpbHRlciA9IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlcihjb25maWcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvcHRpb24sIHJhd0lucHV0KSB7XG4gICAgdmFyIF9pZ25vcmVDYXNlJGlnbm9yZUFjYyA9IF9leHRlbmRzKHtcbiAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICBpZ25vcmVBY2NlbnRzOiB0cnVlLFxuICAgICAgc3RyaW5naWZ5OiBkZWZhdWxTdHJpbmdpZnksXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgbWF0Y2hGcm9tOiAnYW55J1xuICAgIH0sIGNvbmZpZyksXG4gICAgICAgIGlnbm9yZUNhc2UgPSBfaWdub3JlQ2FzZSRpZ25vcmVBY2MuaWdub3JlQ2FzZSxcbiAgICAgICAgaWdub3JlQWNjZW50cyA9IF9pZ25vcmVDYXNlJGlnbm9yZUFjYy5pZ25vcmVBY2NlbnRzLFxuICAgICAgICBzdHJpbmdpZnkgPSBfaWdub3JlQ2FzZSRpZ25vcmVBY2Muc3RyaW5naWZ5LFxuICAgICAgICB0cmltID0gX2lnbm9yZUNhc2UkaWdub3JlQWNjLnRyaW0sXG4gICAgICAgIG1hdGNoRnJvbSA9IF9pZ25vcmVDYXNlJGlnbm9yZUFjYy5tYXRjaEZyb207XG5cbiAgICB2YXIgaW5wdXQgPSB0cmltID8gdHJpbVN0cmluZyhyYXdJbnB1dCkgOiByYXdJbnB1dDtcbiAgICB2YXIgY2FuZGlkYXRlID0gdHJpbSA/IHRyaW1TdHJpbmcoc3RyaW5naWZ5KG9wdGlvbikpIDogc3RyaW5naWZ5KG9wdGlvbik7XG4gICAgaWYgKGlnbm9yZUNhc2UpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAoaWdub3JlQWNjZW50cykge1xuICAgICAgaW5wdXQgPSBzdHJpcERpYWNyaXRpY3MoaW5wdXQpO1xuICAgICAgY2FuZGlkYXRlID0gc3RyaXBEaWFjcml0aWNzKGNhbmRpZGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaEZyb20gPT09ICdzdGFydCcgPyBjYW5kaWRhdGUuc3Vic3RyKDAsIGlucHV0Lmxlbmd0aCkgPT09IGlucHV0IDogY2FuZGlkYXRlLmluZGV4T2YoaW5wdXQpID4gLTE7XG4gIH07XG59O1xuXG52YXIgRHVtbXlJbnB1dCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKER1bW15SW5wdXQsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIER1bW15SW5wdXQoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRHVtbXlJbnB1dCk7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKER1bW15SW5wdXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEdW1teUlucHV0KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhEdW1teUlucHV0LCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGluUHJvcCA9IF9wcm9wcy5pbixcbiAgICAgICAgICBvdXQgPSBfcHJvcHMub3V0LFxuICAgICAgICAgIG9uRXhpdGVkID0gX3Byb3BzLm9uRXhpdGVkLFxuICAgICAgICAgIGFwcGVhciA9IF9wcm9wcy5hcHBlYXIsXG4gICAgICAgICAgZW50ZXIgPSBfcHJvcHMuZW50ZXIsXG4gICAgICAgICAgZXhpdCA9IF9wcm9wcy5leGl0LFxuICAgICAgICAgIGlubmVyUmVmID0gX3Byb3BzLmlubmVyUmVmLFxuICAgICAgICAgIHByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ2luJywgJ291dCcsICdvbkV4aXRlZCcsICdhcHBlYXInLCAnZW50ZXInLCAnZXhpdCcsICdpbm5lclJlZiddKTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgX2V4dGVuZHMoe1xuICAgICAgICByZWY6IGlubmVyUmVmXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICBjbGFzc05hbWU6IGNzcyh7XG4gICAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAwLFxuICAgICAgICAgIGJvcmRlcjogMCxcbiAgICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICAgIG91dGxpbmU6IDAsXG4gICAgICAgICAgcGFkZGluZzogMCxcblxuICAgICAgICAgIC8vIGltcG9ydGFudCEgd2l0aG91dCBgd2lkdGhgIGJyb3dzZXJzIHdvbid0IGFsbG93IGZvY3VzXG4gICAgICAgICAgd2lkdGg6IDEsXG5cbiAgICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JyxcblxuICAgICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gbW9iaWxlIHdoaWxzdCBtYWludGFpbmluZyBcInNjcm9sbCBpbnRvIHZpZXdcIiBiZWhhdmlvdXJcbiAgICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMCknXG4gICAgICAgIH0pXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEdW1teUlucHV0O1xufShDb21wb25lbnQpO1xuXG52YXIgTm9kZVJlc29sdmVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoTm9kZVJlc29sdmVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBOb2RlUmVzb2x2ZXIoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTm9kZVJlc29sdmVyKTtcbiAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTm9kZVJlc29sdmVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTm9kZVJlc29sdmVyKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhOb2RlUmVzb2x2ZXIsIFt7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMucHJvcHMuaW5uZXJSZWYoZmluZERPTU5vZGUodGhpcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLnByb3BzLmlubmVyUmVmKG51bGwpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTm9kZVJlc29sdmVyO1xufShDb21wb25lbnQpO1xuXG52YXIgU1RZTEVfS0VZUyA9IFsnYm94U2l6aW5nJywgJ2hlaWdodCcsICdvdmVyZmxvdycsICdwYWRkaW5nUmlnaHQnLCAncG9zaXRpb24nXTtcblxudmFyIExPQ0tfU1RZTEVTID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JywgLy8gYWNjb3VudCBmb3IgcG9zc2libGUgZGVjbGFyYXRpb24gYHdpZHRoOiAxMDAlO2Agb24gYm9keVxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICBoZWlnaHQ6ICcxMDAlJ1xufTtcblxuZnVuY3Rpb24gcHJldmVudFRvdWNoTW92ZShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gYWxsb3dUb3VjaE1vdmUoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50SW5lcnRpYVNjcm9sbCgpIHtcbiAgdmFyIHRvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuICB2YXIgdG90YWxTY3JvbGwgPSB0aGlzLnNjcm9sbEhlaWdodDtcbiAgdmFyIGN1cnJlbnRTY3JvbGwgPSB0b3AgKyB0aGlzLm9mZnNldEhlaWdodDtcblxuICBpZiAodG9wID09PSAwKSB7XG4gICAgdGhpcy5zY3JvbGxUb3AgPSAxO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRTY3JvbGwgPT09IHRvdGFsU2Nyb2xsKSB7XG4gICAgdGhpcy5zY3JvbGxUb3AgPSB0b3AgLSAxO1xuICB9XG59XG5cbi8vIGBvbnRvdWNoc3RhcnRgIGNoZWNrIHdvcmtzIG9uIG1vc3QgYnJvd3NlcnNcbi8vIGBtYXhUb3VjaFBvaW50c2Agd29ya3Mgb24gSUUxMC8xMSBhbmQgU3VyZmFjZVxuZnVuY3Rpb24gaXNUb3VjaERldmljZSgpIHtcbiAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XG59XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG52YXIgYWN0aXZlU2Nyb2xsTG9ja3MgPSAwO1xuXG52YXIgU2Nyb2xsTG9jayA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKFNjcm9sbExvY2ssIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFNjcm9sbExvY2soKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU2Nyb2xsTG9jayk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9yZWYgPSBTY3JvbGxMb2NrLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Nyb2xsTG9jaykpLmNhbGwuYXBwbHkoX3JlZiwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLm9yaWdpbmFsU3R5bGVzID0ge30sIF90aGlzLmxpc3RlbmVyT3B0aW9ucyA9IHtcbiAgICAgIGNhcHR1cmU6IGZhbHNlLFxuICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICB9LCBfdGVtcCksIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoU2Nyb2xsTG9jaywgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICghY2FuVXNlRE9NKSByZXR1cm47XG5cbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGFjY291bnRGb3JTY3JvbGxiYXJzID0gX3Byb3BzLmFjY291bnRGb3JTY3JvbGxiYXJzLFxuICAgICAgICAgIHRvdWNoU2Nyb2xsVGFyZ2V0ID0gX3Byb3BzLnRvdWNoU2Nyb2xsVGFyZ2V0O1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIHZhciB0YXJnZXRTdHlsZSA9IHRhcmdldCAmJiB0YXJnZXQuc3R5bGU7XG5cbiAgICAgIGlmIChhY2NvdW50Rm9yU2Nyb2xsYmFycykge1xuICAgICAgICAvLyBzdG9yZSBhbnkgc3R5bGVzIGFscmVhZHkgYXBwbGllZCB0byB0aGUgYm9keVxuICAgICAgICBTVFlMRV9LRVlTLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciB2YWwgPSB0YXJnZXRTdHlsZSAmJiB0YXJnZXRTdHlsZVtrZXldO1xuICAgICAgICAgIF90aGlzMi5vcmlnaW5hbFN0eWxlc1trZXldID0gdmFsO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gYXBwbHkgdGhlIGxvY2sgc3R5bGVzIGFuZCBwYWRkaW5nIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHNjcm9sbCBsb2NrXG4gICAgICBpZiAoYWNjb3VudEZvclNjcm9sbGJhcnMgJiYgYWN0aXZlU2Nyb2xsTG9ja3MgPCAxKSB7XG4gICAgICAgIHZhciBjdXJyZW50UGFkZGluZyA9IHBhcnNlSW50KHRoaXMub3JpZ2luYWxTdHlsZXMucGFkZGluZ1JpZ2h0LCAxMCkgfHwgMDtcbiAgICAgICAgdmFyIGNsaWVudFdpZHRoID0gZG9jdW1lbnQuYm9keSA/IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggOiAwO1xuICAgICAgICB2YXIgYWRqdXN0ZWRQYWRkaW5nID0gd2luZG93LmlubmVyV2lkdGggLSBjbGllbnRXaWR0aCArIGN1cnJlbnRQYWRkaW5nIHx8IDA7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoTE9DS19TVFlMRVMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHZhciB2YWwgPSBMT0NLX1NUWUxFU1trZXldO1xuICAgICAgICAgIGlmICh0YXJnZXRTdHlsZSkge1xuICAgICAgICAgICAgdGFyZ2V0U3R5bGVba2V5XSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0YXJnZXRTdHlsZSkge1xuICAgICAgICAgIHRhcmdldFN0eWxlLnBhZGRpbmdSaWdodCA9IGFkanVzdGVkUGFkZGluZyArICdweCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYWNjb3VudCBmb3IgdG91Y2ggZGV2aWNlc1xuICAgICAgaWYgKHRhcmdldCAmJiBpc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgLy8gTW9iaWxlIFNhZmFyaSBpZ25vcmVzIHsgb3ZlcmZsb3c6IGhpZGRlbiB9IGRlY2xhcmF0aW9uIG9uIHRoZSBib2R5LlxuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudFRvdWNoTW92ZSwgdGhpcy5saXN0ZW5lck9wdGlvbnMpO1xuXG4gICAgICAgIC8vIEFsbG93IHNjcm9sbCBvbiBwcm92aWRlZCB0YXJnZXRcbiAgICAgICAgaWYgKHRvdWNoU2Nyb2xsVGFyZ2V0KSB7XG4gICAgICAgICAgdG91Y2hTY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHByZXZlbnRJbmVydGlhU2Nyb2xsLCB0aGlzLmxpc3RlbmVyT3B0aW9ucyk7XG4gICAgICAgICAgdG91Y2hTY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgYWxsb3dUb3VjaE1vdmUsIHRoaXMubGlzdGVuZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBpbmNyZW1lbnQgYWN0aXZlIHNjcm9sbCBsb2Nrc1xuICAgICAgYWN0aXZlU2Nyb2xsTG9ja3MgKz0gMTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmICghY2FuVXNlRE9NKSByZXR1cm47XG5cbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBhY2NvdW50Rm9yU2Nyb2xsYmFycyA9IF9wcm9wczIuYWNjb3VudEZvclNjcm9sbGJhcnMsXG4gICAgICAgICAgdG91Y2hTY3JvbGxUYXJnZXQgPSBfcHJvcHMyLnRvdWNoU2Nyb2xsVGFyZ2V0O1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIHZhciB0YXJnZXRTdHlsZSA9IHRhcmdldCAmJiB0YXJnZXQuc3R5bGU7XG5cbiAgICAgIC8vIHNhZmVseSBkZWNyZW1lbnQgYWN0aXZlIHNjcm9sbCBsb2Nrc1xuICAgICAgYWN0aXZlU2Nyb2xsTG9ja3MgPSBNYXRoLm1heChhY3RpdmVTY3JvbGxMb2NrcyAtIDEsIDApO1xuXG4gICAgICAvLyByZWFwcGx5IG9yaWdpbmFsIGJvZHkgc3R5bGVzLCBpZiBhbnlcbiAgICAgIGlmIChhY2NvdW50Rm9yU2Nyb2xsYmFycyAmJiBhY3RpdmVTY3JvbGxMb2NrcyA8IDEpIHtcbiAgICAgICAgU1RZTEVfS0VZUy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICB2YXIgdmFsID0gX3RoaXMzLm9yaWdpbmFsU3R5bGVzW2tleV07XG4gICAgICAgICAgaWYgKHRhcmdldFN0eWxlKSB7XG4gICAgICAgICAgICB0YXJnZXRTdHlsZVtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSB0b3VjaCBsaXN0ZW5lcnNcbiAgICAgIGlmICh0YXJnZXQgJiYgaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50VG91Y2hNb3ZlLCB0aGlzLmxpc3RlbmVyT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHRvdWNoU2Nyb2xsVGFyZ2V0KSB7XG4gICAgICAgICAgdG91Y2hTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHByZXZlbnRJbmVydGlhU2Nyb2xsLCB0aGlzLmxpc3RlbmVyT3B0aW9ucyk7XG4gICAgICAgICAgdG91Y2hTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgYWxsb3dUb3VjaE1vdmUsIHRoaXMubGlzdGVuZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Nyb2xsTG9jaztcbn0oQ29tcG9uZW50KTtcblxuU2Nyb2xsTG9jay5kZWZhdWx0UHJvcHMgPSB7XG4gIGFjY291bnRGb3JTY3JvbGxiYXJzOiB0cnVlXG59O1xuXG52YXIgY3JlYXRlUHJpbWl0aXZlID0gZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlKFRhZykge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgY3NzJCQxID0gX3JlZi5jc3MsXG4gICAgICAgIGlubmVyUmVmID0gX3JlZi5pbm5lclJlZixcbiAgICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2NzcycsICdpbm5lclJlZiddKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUYWcsIF9leHRlbmRzKHsgcmVmOiBpbm5lclJlZiwgY2xhc3NOYW1lOiBjc3MoY3NzJCQxKVxuICAgIH0sIHByb3BzKSk7XG4gIH07XG59O1xudmFyIERpdiA9IGNyZWF0ZVByaW1pdGl2ZSgnZGl2Jyk7XG5cbi8vIEFzc2lzdGl2ZSB0ZXh0IHRvIGRlc2NyaWJlIHZpc3VhbCBlbGVtZW50cy4gSGlkZGVuIGZvciBzaWdodGVkIHVzZXJzLlxudmFyIEExMXlUZXh0ID0gZnVuY3Rpb24gQTExeVRleHQocHJvcHMpIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBjc3Moe1xuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgIHdpZHRoOiAxXG4gICAgfSlcbiAgfSwgcHJvcHMpKTtcbn07XG5cbmZ1bmN0aW9uIFNjcm9sbEJsb2NrKCkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBEaXYsXG4gICAge1xuICAgICAgY2xhc3NOYW1lOiBjc3MoeyBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdDogMCwgYm90dG9tOiAwLCByaWdodDogMCwgdG9wOiAwIH0pXG4gICAgfSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNjcm9sbExvY2ssIG51bGwpXG4gICk7XG59XG5cbnZhciBTY3JvbGxDYXB0b3IgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhTY3JvbGxDYXB0b3IsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFNjcm9sbENhcHRvcigpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JvbGxDYXB0b3IpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChfcmVmID0gU2Nyb2xsQ2FwdG9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Nyb2xsQ2FwdG9yKSkuY2FsbC5hcHBseShfcmVmLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuaXNCb3R0b20gPSBmYWxzZSwgX3RoaXMuaXNUb3AgPSBmYWxzZSwgX3RoaXMuY2FuY2VsU2Nyb2xsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSwgX3RoaXMuaGFuZGxlRXZlbnREZWx0YSA9IGZ1bmN0aW9uIChldmVudCwgZGVsdGEpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIG9uQm90dG9tQXJyaXZlID0gX3RoaXMkcHJvcHMub25Cb3R0b21BcnJpdmUsXG4gICAgICAgICAgb25Cb3R0b21MZWF2ZSA9IF90aGlzJHByb3BzLm9uQm90dG9tTGVhdmUsXG4gICAgICAgICAgb25Ub3BBcnJpdmUgPSBfdGhpcyRwcm9wcy5vblRvcEFycml2ZSxcbiAgICAgICAgICBvblRvcExlYXZlID0gX3RoaXMkcHJvcHMub25Ub3BMZWF2ZTtcbiAgICAgIHZhciBfdGhpcyRzY3JvbGxUYXJnZXQgPSBfdGhpcy5zY3JvbGxUYXJnZXQsXG4gICAgICAgICAgc2Nyb2xsVG9wID0gX3RoaXMkc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcCxcbiAgICAgICAgICBzY3JvbGxIZWlnaHQgPSBfdGhpcyRzY3JvbGxUYXJnZXQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGNsaWVudEhlaWdodCA9IF90aGlzJHNjcm9sbFRhcmdldC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBfdGhpcy5zY3JvbGxUYXJnZXQ7XG4gICAgICB2YXIgaXNEZWx0YVBvc2l0aXZlID0gZGVsdGEgPiAwO1xuICAgICAgdmFyIGF2YWlsYWJsZVNjcm9sbCA9IHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodCAtIHNjcm9sbFRvcDtcbiAgICAgIHZhciBzaG91bGRDYW5jZWxTY3JvbGwgPSBmYWxzZTtcblxuICAgICAgLy8gcmVzZXQgYm90dG9tL3RvcCBmbGFnc1xuICAgICAgaWYgKGF2YWlsYWJsZVNjcm9sbCA+IGRlbHRhICYmIF90aGlzLmlzQm90dG9tKSB7XG4gICAgICAgIGlmIChvbkJvdHRvbUxlYXZlKSBvbkJvdHRvbUxlYXZlKGV2ZW50KTtcbiAgICAgICAgX3RoaXMuaXNCb3R0b20gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0RlbHRhUG9zaXRpdmUgJiYgX3RoaXMuaXNUb3ApIHtcbiAgICAgICAgaWYgKG9uVG9wTGVhdmUpIG9uVG9wTGVhdmUoZXZlbnQpO1xuICAgICAgICBfdGhpcy5pc1RvcCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBib3R0b20gbGltaXRcbiAgICAgIGlmIChpc0RlbHRhUG9zaXRpdmUgJiYgZGVsdGEgPiBhdmFpbGFibGVTY3JvbGwpIHtcbiAgICAgICAgaWYgKG9uQm90dG9tQXJyaXZlICYmICFfdGhpcy5pc0JvdHRvbSkge1xuICAgICAgICAgIG9uQm90dG9tQXJyaXZlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuc2Nyb2xsVG9wID0gc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBzaG91bGRDYW5jZWxTY3JvbGwgPSB0cnVlO1xuICAgICAgICBfdGhpcy5pc0JvdHRvbSA9IHRydWU7XG5cbiAgICAgICAgLy8gdG9wIGxpbWl0XG4gICAgICB9IGVsc2UgaWYgKCFpc0RlbHRhUG9zaXRpdmUgJiYgLWRlbHRhID4gc2Nyb2xsVG9wKSB7XG4gICAgICAgIGlmIChvblRvcEFycml2ZSAmJiAhX3RoaXMuaXNUb3ApIHtcbiAgICAgICAgICBvblRvcEFycml2ZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgICAgIF90aGlzLmlzVG9wID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2FuY2VsIHNjcm9sbFxuICAgICAgaWYgKHNob3VsZENhbmNlbFNjcm9sbCkge1xuICAgICAgICBfdGhpcy5jYW5jZWxTY3JvbGwoZXZlbnQpO1xuICAgICAgfVxuICAgIH0sIF90aGlzLm9uV2hlZWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIF90aGlzLmhhbmRsZUV2ZW50RGVsdGEoZXZlbnQsIGV2ZW50LmRlbHRhWSk7XG4gICAgfSwgX3RoaXMub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAvLyBzZXQgdG91Y2ggc3RhcnQgc28gd2UgY2FuIGNhbGN1bGF0ZSB0b3VjaG1vdmUgZGVsdGFcbiAgICAgIF90aGlzLnRvdWNoU3RhcnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICAgIH0sIF90aGlzLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgZGVsdGFZID0gX3RoaXMudG91Y2hTdGFydCAtIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICBfdGhpcy5oYW5kbGVFdmVudERlbHRhKGV2ZW50LCBkZWx0YVkpO1xuICAgIH0sIF90aGlzLmdldFNjcm9sbFRhcmdldCA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIF90aGlzLnNjcm9sbFRhcmdldCA9IHJlZjtcbiAgICB9LCBfdGVtcCksIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoU2Nyb2xsQ2FwdG9yLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLnN0YXJ0TGlzdGVuaW5nKHRoaXMuc2Nyb2xsVGFyZ2V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKHRoaXMuc2Nyb2xsVGFyZ2V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzdGFydExpc3RlbmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0TGlzdGVuaW5nKGVsKSB7XG4gICAgICAvLyBiYWlsIGVhcmx5IGlmIG5vIHNjcm9sbCBhdmFpbGFibGVcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPD0gZWwuY2xpZW50SGVpZ2h0KSByZXR1cm47XG5cbiAgICAgIC8vIGFsbCB0aGUgaWYgc3RhdGVtZW50cyBhcmUgdG8gYXBwZWFzZSBGbG93IPCfmKJcbiAgICAgIGlmICh0eXBlb2YgZWwuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMub25XaGVlbCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlbC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlbC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzdG9wTGlzdGVuaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcExpc3RlbmluZyhlbCkge1xuICAgICAgLy8gYmFpbCBlYXJseSBpZiBubyBzY3JvbGwgYXZhaWxhYmxlXG4gICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0IDw9IGVsLmNsaWVudEhlaWdodCkgcmV0dXJuO1xuXG4gICAgICAvLyBhbGwgdGhlIGlmIHN0YXRlbWVudHMgYXJlIHRvIGFwcGVhc2UgRmxvdyDwn5iiXG4gICAgICBpZiAodHlwZW9mIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLm9uV2hlZWwsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIE5vZGVSZXNvbHZlcixcbiAgICAgICAgeyBpbm5lclJlZjogdGhpcy5nZXRTY3JvbGxUYXJnZXQgfSxcbiAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNjcm9sbENhcHRvcjtcbn0oQ29tcG9uZW50KTtcblxudmFyIFNjcm9sbENhcHRvclN3aXRjaCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50Mikge1xuICBpbmhlcml0cyhTY3JvbGxDYXB0b3JTd2l0Y2gsIF9Db21wb25lbnQyKTtcblxuICBmdW5jdGlvbiBTY3JvbGxDYXB0b3JTd2l0Y2goKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU2Nyb2xsQ2FwdG9yU3dpdGNoKTtcbiAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU2Nyb2xsQ2FwdG9yU3dpdGNoLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Nyb2xsQ2FwdG9yU3dpdGNoKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhTY3JvbGxDYXB0b3JTd2l0Y2gsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgaXNFbmFibGVkID0gX3Byb3BzLmlzRW5hYmxlZCxcbiAgICAgICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydpc0VuYWJsZWQnXSk7XG5cbiAgICAgIHJldHVybiBpc0VuYWJsZWQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFNjcm9sbENhcHRvciwgcHJvcHMpIDogdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNjcm9sbENhcHRvclN3aXRjaDtcbn0oQ29tcG9uZW50KTtcblxuU2Nyb2xsQ2FwdG9yU3dpdGNoLmRlZmF1bHRQcm9wcyA9IHsgaXNFbmFibGVkOiB0cnVlIH07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTk8gT1Bcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBDbGFzcyBOYW1lIFByZWZpeGVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gU3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGNvbXBvbmVudCBzdGF0ZSBmb3Igc3R5bGluZyB3aXRoIGNsYXNzIG5hbWVzLlxuXG4gRXhwZWN0cyBhbiBhcnJheSBvZiBzdHJpbmdzIE9SIGEgc3RyaW5nL29iamVjdCBwYWlyOlxuIC0gY2xhc3NOYW1lKFsnY29tcCcsICdjb21wLWFyZycsICdjb21wLWFyZy0yJ10pXG4gICBAcmV0dXJucyAncmVhY3Qtc2VsZWN0X19jb21wIHJlYWN0LXNlbGVjdF9fY29tcC1hcmcgcmVhY3Qtc2VsZWN0X19jb21wLWFyZy0yJ1xuIC0gY2xhc3NOYW1lKCdjb21wJywgeyBzb21lOiB0cnVlLCBzdGF0ZTogZmFsc2UgfSlcbiAgIEByZXR1cm5zICdyZWFjdC1zZWxlY3RfX2NvbXAgcmVhY3Qtc2VsZWN0X19jb21wLS1zb21lJ1xuKi9cbmZ1bmN0aW9uIGFwcGx5UHJlZml4VG9OYW1lKHByZWZpeCwgbmFtZSkge1xuICByZXR1cm4gbmFtZSA/IHByZWZpeCArICdfXycgKyBuYW1lIDogcHJlZml4O1xufVxuXG5mdW5jdGlvbiBjbGFzc05hbWVzKHByZWZpeCwgY3NzS2V5LCBzdGF0ZSwgY2xhc3NOYW1lKSB7XG4gIHZhciBhcnIgPSBbY3NzS2V5LCBjbGFzc05hbWVdO1xuICBpZiAoc3RhdGUgJiYgcHJlZml4KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHN0YXRlKSB7XG4gICAgICBpZiAoc3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBzdGF0ZVtrZXldKSB7XG4gICAgICAgIGFyci5wdXNoKCcnICsgYXBwbHlQcmVmaXhUb05hbWUocHJlZml4LCBrZXkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpO1xuICB9KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gU3RyaW5nKGkpLnRyaW0oKTtcbiAgfSkuam9pbignICcpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBDbGVhbiBWYWx1ZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBjbGVhblZhbHVlID0gZnVuY3Rpb24gY2xlYW5WYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZS5maWx0ZXIoQm9vbGVhbik7XG4gIGlmICgodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkgcmV0dXJuIFt2YWx1ZV07XG4gIHJldHVybiBbXTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSGFuZGxlIElucHV0IENoYW5nZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGhhbmRsZUlucHV0Q2hhbmdlKGlucHV0VmFsdWUsIGFjdGlvbk1ldGEsIG9uSW5wdXRDaGFuZ2UpIHtcbiAgaWYgKG9uSW5wdXRDaGFuZ2UpIHtcbiAgICB2YXIgbmV3VmFsdWUgPSBvbklucHV0Q2hhbmdlKGlucHV0VmFsdWUsIGFjdGlvbk1ldGEpO1xuICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdzdHJpbmcnKSByZXR1cm4gbmV3VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlucHV0VmFsdWU7XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2Nyb2xsIEhlbHBlcnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudChlbCkge1xuICByZXR1cm4gW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keSwgd2luZG93XS5pbmNsdWRlcyhlbCk7XG59XG5cbi8vIE5vcm1hbGl6ZWQgc2Nyb2xsVG8gJiBzY3JvbGxUb3Bcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxUb3AoZWwpIHtcbiAgaWYgKGlzRG9jdW1lbnRFbGVtZW50KGVsKSkge1xuICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIH1cbiAgcmV0dXJuIGVsLnNjcm9sbFRvcDtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsVG8oZWwsIHRvcCkge1xuICAvLyB3aXRoIGEgc2Nyb2xsIGRpc3RhbmNlLCB3ZSBwZXJmb3JtIHNjcm9sbCBvbiB0aGUgZWxlbWVudFxuICBpZiAoaXNEb2N1bWVudEVsZW1lbnQoZWwpKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHRvcCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZWwuc2Nyb2xsVG9wID0gdG9wO1xufVxuXG4vLyBHZXQgU2Nyb2xsIFBhcmVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIHZhciBleGNsdWRlU3RhdGljUGFyZW50ID0gc3R5bGUucG9zaXRpb24gPT09ICdhYnNvbHV0ZSc7XG4gIHZhciBvdmVyZmxvd1J4ID0gLyhhdXRvfHNjcm9sbCkvO1xuICB2YXIgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IC8vIHN1Y2sgaXQsIGZsb3cuLi5cblxuICBpZiAoc3R5bGUucG9zaXRpb24gPT09ICdmaXhlZCcpIHJldHVybiBkb2NFbDtcblxuICBmb3IgKHZhciBwYXJlbnQgPSBlbGVtZW50OyBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDspIHtcbiAgICBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocGFyZW50KTtcbiAgICBpZiAoZXhjbHVkZVN0YXRpY1BhcmVudCAmJiBzdHlsZS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAob3ZlcmZsb3dSeC50ZXN0KHN0eWxlLm92ZXJmbG93ICsgc3R5bGUub3ZlcmZsb3dZICsgc3R5bGUub3ZlcmZsb3dYKSkge1xuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZG9jRWw7XG59XG5cbi8vIEFuaW1hdGVkIFNjcm9sbCBUb1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICBAcGFyYW0gdDogdGltZSAoZWxhcHNlZClcbiAgQHBhcmFtIGI6IGluaXRpYWwgdmFsdWVcbiAgQHBhcmFtIGM6IGFtb3VudCBvZiBjaGFuZ2VcbiAgQHBhcmFtIGQ6IGR1cmF0aW9uXG4qL1xuZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVkU2Nyb2xsVG8oZWxlbWVudCwgdG8pIHtcbiAgdmFyIGR1cmF0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAyMDA7XG4gIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogbm9vcDtcblxuICB2YXIgc3RhcnQgPSBnZXRTY3JvbGxUb3AoZWxlbWVudCk7XG4gIHZhciBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xuICB2YXIgaW5jcmVtZW50ID0gMTA7XG4gIHZhciBjdXJyZW50VGltZSA9IDA7XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZVNjcm9sbCgpIHtcbiAgICBjdXJyZW50VGltZSArPSBpbmNyZW1lbnQ7XG4gICAgdmFyIHZhbCA9IGVhc2VPdXRDdWJpYyhjdXJyZW50VGltZSwgc3RhcnQsIGNoYW5nZSwgZHVyYXRpb24pO1xuICAgIHNjcm9sbFRvKGVsZW1lbnQsIHZhbCk7XG4gICAgaWYgKGN1cnJlbnRUaW1lIDwgZHVyYXRpb24pIHtcbiAgICAgIHJhZihhbmltYXRlU2Nyb2xsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZWxlbWVudCk7XG4gICAgfVxuICB9XG4gIGFuaW1hdGVTY3JvbGwoKTtcbn1cblxuLy8gU2Nyb2xsIEludG8gVmlld1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KG1lbnVFbCwgZm9jdXNlZEVsKSB7XG4gIHZhciBtZW51UmVjdCA9IG1lbnVFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGZvY3VzZWRSZWN0ID0gZm9jdXNlZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgb3ZlclNjcm9sbCA9IGZvY3VzZWRFbC5vZmZzZXRIZWlnaHQgLyAzO1xuXG4gIGlmIChmb2N1c2VkUmVjdC5ib3R0b20gKyBvdmVyU2Nyb2xsID4gbWVudVJlY3QuYm90dG9tKSB7XG4gICAgc2Nyb2xsVG8obWVudUVsLCBNYXRoLm1pbihmb2N1c2VkRWwub2Zmc2V0VG9wICsgZm9jdXNlZEVsLmNsaWVudEhlaWdodCAtIG1lbnVFbC5vZmZzZXRIZWlnaHQgKyBvdmVyU2Nyb2xsLCBtZW51RWwuc2Nyb2xsSGVpZ2h0KSk7XG4gIH0gZWxzZSBpZiAoZm9jdXNlZFJlY3QudG9wIC0gb3ZlclNjcm9sbCA8IG1lbnVSZWN0LnRvcCkge1xuICAgIHNjcm9sbFRvKG1lbnVFbCwgTWF0aC5tYXgoZm9jdXNlZEVsLm9mZnNldFRvcCAtIG92ZXJTY3JvbGwsIDApKTtcbiAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEdldCBib3VuZGluZyBjbGllbnQgb2JqZWN0XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gY2Fubm90IGdldCBrZXlzIHVzaW5nIGFycmF5IG5vdGF0aW9uIHdpdGggRE9NUmVjdFxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRPYmooZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgYm90dG9tOiByZWN0LmJvdHRvbSxcbiAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICByaWdodDogcmVjdC5yaWdodCxcbiAgICB0b3A6IHJlY3QudG9wLFxuICAgIHdpZHRoOiByZWN0LndpZHRoXG4gIH07XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVG91Y2ggQ2FwYWJpbGl0eSBEZXRlY3RvclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGlzVG91Y2hDYXBhYmxlKCkge1xuICB0cnkge1xuICAgIGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50Jyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBNb2JpbGUgRGV2aWNlIERldGVjdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBmb3JtYXRHcm91cExhYmVsID0gZnVuY3Rpb24gZm9ybWF0R3JvdXBMYWJlbChncm91cCkge1xuICByZXR1cm4gZ3JvdXAubGFiZWw7XG59O1xuXG52YXIgZ2V0T3B0aW9uTGFiZWwgPSBmdW5jdGlvbiBnZXRPcHRpb25MYWJlbChvcHRpb24pIHtcbiAgcmV0dXJuIG9wdGlvbi5sYWJlbDtcbn07XG5cbnZhciBnZXRPcHRpb25WYWx1ZSA9IGZ1bmN0aW9uIGdldE9wdGlvblZhbHVlKG9wdGlvbikge1xuICByZXR1cm4gb3B0aW9uLnZhbHVlO1xufTtcblxudmFyIGlzT3B0aW9uRGlzYWJsZWQgPSBmdW5jdGlvbiBpc09wdGlvbkRpc2FibGVkKG9wdGlvbikge1xuICByZXR1cm4gISFvcHRpb24uaXNEaXNhYmxlZDtcbn07XG5cbnZhciBib3JkZXJSYWRpdXMgPSA0O1xuXG52YXIgY29sb3JzID0ge1xuICB0ZXh0OiAnIzIyMicsXG4gIHRleHRMaWdodDogJyM0NDQnLFxuICBwcmltYXJ5OiAnIzI2ODRGRicsXG4gIHByaW1hcnk3NTogJyM0QzlBRkYnLFxuICBwcmltYXJ5NTA6ICcjQjJENEZGJyxcbiAgcHJpbWFyeTI1OiAnI0RFRUJGRicsXG4gIGRhbmdlcjogJyNERTM1MEInLFxuICBkYW5nZXJMaWdodDogJyNGRkJEQUQnLFxuXG4gIG5ldXRyYWwwOiAnaHNsKDAsIDAlLCAxMDAlKScsXG4gIG5ldXRyYWwxOiAnaHNsKDAsIDAlLCA5OSUpJyxcbiAgbmV1dHJhbDI6ICdoc2woMCwgMCUsIDk4JSknLFxuICBuZXV0cmFsMzogJ2hzbCgwLCAwJSwgOTclKScsXG4gIG5ldXRyYWw0OiAnaHNsKDAsIDAlLCA5NiUpJyxcbiAgbmV1dHJhbDU6ICdoc2woMCwgMCUsIDk1JSknLFxuICBuZXV0cmFsMTA6ICdoc2woMCwgMCUsIDkwJSknLFxuICBuZXV0cmFsMjA6ICdoc2woMCwgMCUsIDgwJSknLFxuICBuZXV0cmFsMzA6ICdoc2woMCwgMCUsIDcwJSknLFxuICBuZXV0cmFsNDA6ICdoc2woMCwgMCUsIDYwJSknLFxuICBuZXV0cmFsNTA6ICdoc2woMCwgMCUsIDUwJSknLFxuICBuZXV0cmFsNjA6ICdoc2woMCwgMCUsIDQwJSknLFxuICBuZXV0cmFsNzA6ICdoc2woMCwgMCUsIDMwJSknLFxuICBuZXV0cmFsODA6ICdoc2woMCwgMCUsIDIwJSknLFxuICBuZXV0cmFsOTA6ICdoc2woMCwgMCUsIDEwJSknLFxuICBuZXV0cmFsMTAwOiAnaHNsKDAsIDAlLCAwJSknLFxuXG4gIG5ldXRyYWwxYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjAxKScsXG4gIG5ldXRyYWwyYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjAyKScsXG4gIG5ldXRyYWwzYTogJ2hzbGEoMCwgMCUsIDAlLCAwLjAzKScsXG4gIG5ldXRyYWw0YTogJ2hzbGEoMCwgMCUsIDAlLCAwLjA0KScsXG4gIG5ldXRyYWw1YTogJ2hzbGEoMCwgMCUsIDAlLCAwLjA1KScsXG4gIG5ldXRyYWwxMGE6ICdoc2xhKDAsIDAlLCAwJSwgMC4xKScsXG4gIG5ldXRyYWwyMGE6ICdoc2xhKDAsIDAlLCAwJSwgMC4yKScsXG4gIG5ldXRyYWwzMGE6ICdoc2xhKDAsIDAlLCAwJSwgMC4zKScsXG4gIG5ldXRyYWw0MGE6ICdoc2xhKDAsIDAlLCAwJSwgMC40KScsXG4gIG5ldXRyYWw1MGE6ICdoc2xhKDAsIDAlLCAwJSwgMC41KScsXG4gIG5ldXRyYWw2MGE6ICdoc2xhKDAsIDAlLCAwJSwgMC42KScsXG4gIG5ldXRyYWw3MGE6ICdoc2xhKDAsIDAlLCAwJSwgMC43KScsXG4gIG5ldXRyYWw4MGE6ICdoc2xhKDAsIDAlLCAwJSwgMC44KScsXG4gIG5ldXRyYWw5MGE6ICdoc2xhKDAsIDAlLCAwJSwgMC45KSdcbn07XG5cbnZhciBiYXNlVW5pdCA9IDQ7XG5cbnZhciBzcGFjaW5nID0ge1xuICAvKiBVc2VkIHRvIGNhbGN1bGF0ZSBjb25zaXN0ZW50IG1hcmdpbi9wYWRkaW5nIG9uIGVsZW1lbnRzICovXG4gIGJhc2VVbml0OiBiYXNlVW5pdCxcbiAgLyogVGhlIG1pbmltdW0gaGVpZ2h0IG9mIHRoZSBjb250cm9sICovXG4gIGNvbnRyb2xIZWlnaHQ6IDM4LFxuICAvKiBUaGUgYW1vdW50IG9mIHNwYWNlIGJldHdlZW4gdGhlIGNvbnRyb2wgYW5kIG1lbnUgKi9cbiAgbWVudUd1dHRlcjogYmFzZVVuaXQgKiAyXG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJvb3QgQ29udGFpbmVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIGNvbnRhaW5lckNTUyA9IGZ1bmN0aW9uIGNvbnRhaW5lckNTUyhfcmVmKSB7XG4gIHZhciBpc0Rpc2FibGVkID0gX3JlZi5pc0Rpc2FibGVkLFxuICAgICAgaXNSdGwgPSBfcmVmLmlzUnRsO1xuICByZXR1cm4ge1xuICAgIGRpcmVjdGlvbjogaXNSdGwgPyAncnRsJyA6IG51bGwsXG4gICAgcG9pbnRlckV2ZW50czogaXNEaXNhYmxlZCA/ICdub25lJyA6IG51bGwsIC8vIGNhbmNlbCBtb3VzZSBldmVudHMgd2hlbiBkaXNhYmxlZFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gIH07XG59O1xudmFyIFNlbGVjdENvbnRhaW5lciA9IGZ1bmN0aW9uIFNlbGVjdENvbnRhaW5lcihwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcyxcbiAgICAgIGlzRGlzYWJsZWQgPSBwcm9wcy5pc0Rpc2FibGVkLFxuICAgICAgaXNSdGwgPSBwcm9wcy5pc1J0bDtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnY29udGFpbmVyJywgcHJvcHMpKSwge1xuICAgICAgICAnLS1pcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWQsXG4gICAgICAgICctLWlzLXJ0bCc6IGlzUnRsXG4gICAgICB9LCBjbGFzc05hbWUpXG4gICAgfSwgaW5uZXJQcm9wcyksXG4gICAgY2hpbGRyZW5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVmFsdWUgQ29udGFpbmVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIHZhbHVlQ29udGFpbmVyQ1NTID0gZnVuY3Rpb24gdmFsdWVDb250YWluZXJDU1MoKSB7XG4gIHJldHVybiB7XG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXg6IDEsXG4gICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICBwYWRkaW5nOiBzcGFjaW5nLmJhc2VVbml0IC8gMiArICdweCAnICsgc3BhY2luZy5iYXNlVW5pdCAqIDIgKyAncHgnLFxuICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiAndG91Y2gnLFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gIH07XG59O1xudmFyIFZhbHVlQ29udGFpbmVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoVmFsdWVDb250YWluZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFZhbHVlQ29udGFpbmVyKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFZhbHVlQ29udGFpbmVyKTtcbiAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoVmFsdWVDb250YWluZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihWYWx1ZUNvbnRhaW5lcikpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoVmFsdWVDb250YWluZXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICBjeCA9IF9wcm9wcy5jeCxcbiAgICAgICAgICBpc011bHRpID0gX3Byb3BzLmlzTXVsdGksXG4gICAgICAgICAgZ2V0U3R5bGVzID0gX3Byb3BzLmdldFN0eWxlcyxcbiAgICAgICAgICBoYXNWYWx1ZSA9IF9wcm9wcy5oYXNWYWx1ZTtcblxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygndmFsdWVDb250YWluZXInLCB0aGlzLnByb3BzKSksIHtcbiAgICAgICAgICAgICd2YWx1ZS1jb250YWluZXInOiB0cnVlLFxuICAgICAgICAgICAgJ3ZhbHVlLWNvbnRhaW5lci0taXMtbXVsdGknOiBpc011bHRpLFxuICAgICAgICAgICAgJ3ZhbHVlLWNvbnRhaW5lci0taGFzLXZhbHVlJzogaGFzVmFsdWVcbiAgICAgICAgICB9LCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVmFsdWVDb250YWluZXI7XG59KENvbXBvbmVudCk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSW5kaWNhdG9yIENvbnRhaW5lclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBpbmRpY2F0b3JzQ29udGFpbmVyQ1NTID0gZnVuY3Rpb24gaW5kaWNhdG9yc0NvbnRhaW5lckNTUygpIHtcbiAgcmV0dXJuIHtcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleFNocmluazogMFxuICB9O1xufTtcbnZhciBJbmRpY2F0b3JzQ29udGFpbmVyID0gZnVuY3Rpb24gSW5kaWNhdG9yc0NvbnRhaW5lcihwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXM7XG5cblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICB7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnaW5kaWNhdG9yc0NvbnRhaW5lcicsIHByb3BzKSksIHtcbiAgICAgICAgJ2luZGljYXRvcnMnOiB0cnVlXG4gICAgICB9LCBjbGFzc05hbWUpXG4gICAgfSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIFN2ZyA9IGZ1bmN0aW9uIFN2ZyhfcmVmKSB7XG4gIHZhciBzaXplID0gX3JlZi5zaXplLFxuICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ3NpemUnXSk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzdmcnLCBfZXh0ZW5kcyh7XG4gICAgaGVpZ2h0OiBzaXplLFxuICAgIHdpZHRoOiBzaXplLFxuICAgIHZpZXdCb3g6ICcwIDAgMjAgMjAnLFxuICAgIGNsYXNzTmFtZTogLyojX19QVVJFX18qLyAvKiNfX1BVUkVfXyovY3NzKHtcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwXG4gICAgfSlcbiAgfSwgcHJvcHMpKTtcbn07XG5cbnZhciBDcm9zc0ljb24gPSBmdW5jdGlvbiBDcm9zc0ljb24ocHJvcHMpIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgU3ZnLFxuICAgIF9leHRlbmRzKHsgc2l6ZTogMjAsIGZvY3VzYWJsZTogJ2ZhbHNlJywgcm9sZTogJ3ByZXNlbnRhdGlvbicgfSwgcHJvcHMpLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6JyB9KVxuICApO1xufTtcbnZhciBEb3duQ2hldnJvbiA9IGZ1bmN0aW9uIERvd25DaGV2cm9uKHByb3BzKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFN2ZyxcbiAgICBfZXh0ZW5kcyh7IHNpemU6IDIwLCBmb2N1c2FibGU6ICdmYWxzZScsIHJvbGU6ICdwcmVzZW50YXRpb24nIH0sIHByb3BzKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1eicgfSlcbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRHJvcGRvd24gJiBDbGVhciBCdXR0b25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIGJhc2VDU1MgPSBmdW5jdGlvbiBiYXNlQ1NTKF9yZWYyKSB7XG4gIHZhciBpc0ZvY3VzZWQgPSBfcmVmMi5pc0ZvY3VzZWQ7XG4gIHJldHVybiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBwYWRkaW5nOiBzcGFjaW5nLmJhc2VVbml0ICogMixcbiAgICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICAgJzpob3Zlcic6IHtcbiAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDEwMCA6IGNvbG9ycy5uZXV0cmFsNDBcbiAgICB9XG4gIH07XG59O1xuXG52YXIgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xudmFyIERyb3Bkb3duSW5kaWNhdG9yID0gZnVuY3Rpb24gRHJvcGRvd25JbmRpY2F0b3IocHJvcHMpIHtcbiAgdmFyIF9wcm9wcyRjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2hpbGRyZW4gPSBfcHJvcHMkY2hpbGRyZW4gPT09IHVuZGVmaW5lZCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG93bkNoZXZyb24sIG51bGwpIDogX3Byb3BzJGNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHt9LCBpbm5lclByb3BzLCB7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcykpLCB7XG4gICAgICAgICdpbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICAnZHJvcGRvd24taW5kaWNhdG9yJzogdHJ1ZVxuICAgICAgfSwgY2xhc3NOYW1lKVxuICAgIH0pLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuXG52YXIgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xudmFyIENsZWFySW5kaWNhdG9yID0gZnVuY3Rpb24gQ2xlYXJJbmRpY2F0b3IocHJvcHMpIHtcbiAgdmFyIF9wcm9wcyRjaGlsZHJlbjIgPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNoaWxkcmVuID0gX3Byb3BzJGNoaWxkcmVuMiA9PT0gdW5kZWZpbmVkID8gUmVhY3QuY3JlYXRlRWxlbWVudChDcm9zc0ljb24sIG51bGwpIDogX3Byb3BzJGNoaWxkcmVuMixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7fSwgaW5uZXJQcm9wcywge1xuICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ2NsZWFySW5kaWNhdG9yJywgcHJvcHMpKSwge1xuICAgICAgICAnaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWVcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9KSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gZnVuY3Rpb24gaW5kaWNhdG9yU2VwYXJhdG9yQ1NTKF9yZWYzKSB7XG4gIHZhciBpc0Rpc2FibGVkID0gX3JlZjMuaXNEaXNhYmxlZDtcbiAgcmV0dXJuIHtcbiAgICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICBtYXJnaW5Cb3R0b206IHNwYWNpbmcuYmFzZVVuaXQgKiAyLFxuICAgIG1hcmdpblRvcDogc3BhY2luZy5iYXNlVW5pdCAqIDIsXG4gICAgd2lkdGg6IDFcbiAgfTtcbn07XG5cbnZhciBJbmRpY2F0b3JTZXBhcmF0b3IgPSBmdW5jdGlvbiBJbmRpY2F0b3JTZXBhcmF0b3IocHJvcHMpIHtcbiAgdmFyIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIF9leHRlbmRzKHt9LCBpbm5lclByb3BzLCB7XG4gICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKSksIHsgJ2luZGljYXRvci1zZXBhcmF0b3InOiB0cnVlIH0sIGNsYXNzTmFtZSlcbiAgfSkpO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxudmFyIGtleWZyYW1lc05hbWUgPSAncmVhY3Qtc2VsZWN0LWxvYWRpbmctaW5kaWNhdG9yJztcblxudmFyIGxvYWRpbmdJbmRpY2F0b3JDU1MgPSBmdW5jdGlvbiBsb2FkaW5nSW5kaWNhdG9yQ1NTKF9yZWY0KSB7XG4gIHZhciBpc0ZvY3VzZWQgPSBfcmVmNC5pc0ZvY3VzZWQsXG4gICAgICBzaXplID0gX3JlZjQuc2l6ZTtcbiAgcmV0dXJuIHtcbiAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6IHNwYWNpbmcuYmFzZVVuaXQgKiAyLFxuICAgIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gICAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgICBmb250U2l6ZTogc2l6ZSxcbiAgICBsaW5lSGVpZ2h0OiAxLFxuICAgIG1hcmdpblJpZ2h0OiBzaXplLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgdmVydGljYWxBbGlnbjogJ21pZGRsZSdcbiAgfTtcbn07XG5cbnZhciBMb2FkaW5nRG90ID0gZnVuY3Rpb24gTG9hZGluZ0RvdChfcmVmNSkge1xuICB2YXIgY29sb3IgPSBfcmVmNS5jb2xvcixcbiAgICAgIGRlbGF5ID0gX3JlZjUuZGVsYXksXG4gICAgICBvZmZzZXQgPSBfcmVmNS5vZmZzZXQ7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xuICAgIGNzczoge1xuICAgICAgYW5pbWF0aW9uRHVyYXRpb246ICcxcycsXG4gICAgICBhbmltYXRpb25EZWxheTogZGVsYXkgKyAnbXMnLFxuICAgICAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ICdpbmZpbml0ZScsXG4gICAgICBhbmltYXRpb25OYW1lOiBrZXlmcmFtZXNOYW1lLFxuICAgICAgYW5pbWF0aW9uVGltaW5nRnVuY3Rpb246ICdlYXNlLWluLW91dCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiBudWxsLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nXG4gICAgfVxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbmluamVjdEdsb2JhbCgnQGtleWZyYW1lcyAnLCBrZXlmcmFtZXNOYW1lLCAnezAlLDgwJSwxMDAle29wYWNpdHk6MDt9NDAle29wYWNpdHk6MTt9fTsnKTtcblxudmFyIExvYWRpbmdJbmRpY2F0b3IgPSBmdW5jdGlvbiBMb2FkaW5nSW5kaWNhdG9yKHByb3BzKSB7XG4gIHZhciBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHMsXG4gICAgICBpc0ZvY3VzZWQgPSBwcm9wcy5pc0ZvY3VzZWQsXG4gICAgICBpc1J0bCA9IHByb3BzLmlzUnRsO1xuXG4gIHZhciBjb2xvciA9IGlzRm9jdXNlZCA/IGNvbG9ycy50ZXh0IDogY29sb3JzLm5ldXRyYWwyMDtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7fSwgaW5uZXJQcm9wcywge1xuICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcykpLCB7XG4gICAgICAgICdpbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICAnbG9hZGluZy1pbmRpY2F0b3InOiB0cnVlXG4gICAgICB9LCBjbGFzc05hbWUpXG4gICAgfSksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nRG90LCB7IGNvbG9yOiBjb2xvciwgZGVsYXk6IDAsIG9mZnNldDogaXNSdGwgfSksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nRG90LCB7IGNvbG9yOiBjb2xvciwgZGVsYXk6IDE2MCwgb2Zmc2V0OiB0cnVlIH0pLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9hZGluZ0RvdCwgeyBjb2xvcjogY29sb3IsIGRlbGF5OiAzMjAsIG9mZnNldDogIWlzUnRsIH0pLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBBMTF5VGV4dCxcbiAgICAgIG51bGwsXG4gICAgICAnTG9hZGluZydcbiAgICApXG4gICk7XG59O1xuTG9hZGluZ0luZGljYXRvci5kZWZhdWx0UHJvcHMgPSB7IHNpemU6IDQgfTtcblxudmFyIGNzcyQxID0gZnVuY3Rpb24gY3NzJCQxKF9yZWYpIHtcbiAgdmFyIGlzRGlzYWJsZWQgPSBfcmVmLmlzRGlzYWJsZWQsXG4gICAgICBpc0ZvY3VzZWQgPSBfcmVmLmlzRm9jdXNlZDtcbiAgcmV0dXJuIHtcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDUgOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDAgOiBjb2xvcnMubmV1dHJhbDIsXG4gICAgYm9yZGVyQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogaXNGb2N1c2VkID8gY29sb3JzLnByaW1hcnkgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgIGJvcmRlclJhZGl1czogYm9yZGVyUmFkaXVzLFxuICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxuICAgIGJvcmRlcldpZHRoOiAxLFxuICAgIGJveFNoYWRvdzogaXNGb2N1c2VkID8gJzAgMCAwIDFweCAnICsgY29sb3JzLnByaW1hcnkgOiBudWxsLFxuICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4V3JhcDogJ3dyYXAnLFxuICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgbWluSGVpZ2h0OiBzcGFjaW5nLmNvbnRyb2xIZWlnaHQsXG4gICAgb3V0bGluZTogJzAgIWltcG9ydGFudCcsXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgdHJhbnNpdGlvbjogJ2FsbCAxMDBtcycsXG5cbiAgICAnJjpob3Zlcic6IHtcbiAgICAgIGJvcmRlckNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMucHJpbWFyeSA6IGNvbG9ycy5uZXV0cmFsMzBcbiAgICB9XG4gIH07XG59O1xuXG52YXIgQ29udHJvbCA9IGZ1bmN0aW9uIENvbnRyb2wocHJvcHMpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgaXNEaXNhYmxlZCA9IHByb3BzLmlzRGlzYWJsZWQsXG4gICAgICBpc0ZvY3VzZWQgPSBwcm9wcy5pc0ZvY3VzZWQsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcbiAgdmFyIGlubmVyUmVmID0gaW5uZXJQcm9wcy5pbm5lclJlZixcbiAgICAgIHJlc3QgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhpbm5lclByb3BzLCBbJ2lubmVyUmVmJ10pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnY29udHJvbCcsIHByb3BzKSksIHtcbiAgICAgICAgJ2NvbnRyb2wnOiB0cnVlLFxuICAgICAgICAnY29udHJvbC1pcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWQsXG4gICAgICAgICdjb250cm9sLWlzLWZvY3VzZWQnOiBpc0ZvY3VzZWRcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCByZXN0KSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxudmFyIGdyb3VwQ1NTID0gZnVuY3Rpb24gZ3JvdXBDU1MoKSB7XG4gIHJldHVybiB7XG4gICAgcGFkZGluZ0JvdHRvbTogc3BhY2luZy5iYXNlVW5pdCAqIDIsXG4gICAgcGFkZGluZ1RvcDogc3BhY2luZy5iYXNlVW5pdCAqIDJcbiAgfTtcbn07XG5cbnZhciBHcm91cCA9IGZ1bmN0aW9uIEdyb3VwKHByb3BzKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIEhlYWRpbmcgPSBwcm9wcy5IZWFkaW5nLFxuICAgICAgaGVhZGluZ1Byb3BzID0gcHJvcHMuaGVhZGluZ1Byb3BzLFxuICAgICAgbGFiZWwgPSBwcm9wcy5sYWJlbCxcbiAgICAgIGlubmVyUHJvcHMgPSBwcm9wcy5pbm5lclByb3BzO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIF9leHRlbmRzKHtcbiAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdncm91cCcsIHByb3BzKSksIHsgJ2dyb3VwJzogdHJ1ZSB9LCBjbGFzc05hbWUpXG4gICAgfSwgaW5uZXJQcm9wcyksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIEhlYWRpbmcsXG4gICAgICBfZXh0ZW5kcyh7IGdldFN0eWxlczogZ2V0U3R5bGVzLCBjeDogY3ggfSwgaGVhZGluZ1Byb3BzKSxcbiAgICAgIGxhYmVsXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2RpdicsXG4gICAgICBudWxsLFxuICAgICAgY2hpbGRyZW5cbiAgICApXG4gICk7XG59O1xuXG52YXIgZ3JvdXBIZWFkaW5nQ1NTID0gZnVuY3Rpb24gZ3JvdXBIZWFkaW5nQ1NTKCkge1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiAnIzk5OScsXG4gICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBmb250U2l6ZTogJzc1JScsXG4gICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgbWFyZ2luQm90dG9tOiAnMC4yNWVtJyxcbiAgICBwYWRkaW5nTGVmdDogc3BhY2luZy5iYXNlVW5pdCAqIDMsXG4gICAgcGFkZGluZ1JpZ2h0OiBzcGFjaW5nLmJhc2VVbml0ICogMyxcbiAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuICB9O1xufTtcblxudmFyIEdyb3VwSGVhZGluZyA9IGZ1bmN0aW9uIEdyb3VwSGVhZGluZyhwcm9wcykge1xuICB2YXIgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGNsZWFuUHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgWydjbGFzc05hbWUnLCAnY3gnLCAnZ2V0U3R5bGVzJ10pO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ2dyb3VwSGVhZGluZycsIHByb3BzKSksIHsgJ2dyb3VwLWhlYWRpbmcnOiB0cnVlIH0sIGNsYXNzTmFtZSlcbiAgfSwgY2xlYW5Qcm9wcykpO1xufTtcblxudmFyIGNzcyQyID0gZnVuY3Rpb24gY3NzJCQxKF9yZWYpIHtcbiAgdmFyIGlzRGlzYWJsZWQgPSBfcmVmLmlzRGlzYWJsZWQ7XG4gIHJldHVybiB7XG4gICAgbWFyZ2luOiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICBwYWRkaW5nQm90dG9tOiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICBwYWRkaW5nVG9wOiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICB2aXNpYmlsaXR5OiBpc0Rpc2FibGVkID8gJ2hpZGRlbicgOiAndmlzaWJsZScsXG4gICAgY29sb3I6IGNvbG9ycy50ZXh0XG4gIH07XG59O1xudmFyIGlucHV0U3R5bGUgPSBmdW5jdGlvbiBpbnB1dFN0eWxlKGlzSGlkZGVuKSB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZDogMCxcbiAgICBib3JkZXI6IDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBvcGFjaXR5OiBpc0hpZGRlbiA/IDAgOiAxLFxuICAgIG91dGxpbmU6IDAsXG4gICAgcGFkZGluZzogMCxcbiAgICBjb2xvcjogJ2luaGVyaXQnXG4gIH07XG59O1xuXG52YXIgSW5wdXQkMSA9IGZ1bmN0aW9uIElucHV0KF9yZWYyKSB7XG4gIHZhciBjbGFzc05hbWUgPSBfcmVmMi5jbGFzc05hbWUsXG4gICAgICBjeCA9IF9yZWYyLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gX3JlZjIuZ2V0U3R5bGVzLFxuICAgICAgaW5uZXJSZWYgPSBfcmVmMi5pbm5lclJlZixcbiAgICAgIGlzSGlkZGVuID0gX3JlZjIuaXNIaWRkZW4sXG4gICAgICBpc0Rpc2FibGVkID0gX3JlZjIuaXNEaXNhYmxlZCxcbiAgICAgIHByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFsnY2xhc3NOYW1lJywgJ2N4JywgJ2dldFN0eWxlcycsICdpbm5lclJlZicsICdpc0hpZGRlbicsICdpc0Rpc2FibGVkJ10pO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICB7XG4gICAgICBjbGFzc05hbWU6IGNzcyhnZXRTdHlsZXMoJ2lucHV0JywgcHJvcHMpKVxuICAgIH0sXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChBdXRvc2l6ZUlucHV0LCBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KG51bGwsIHsgJ2lucHV0JzogdHJ1ZSB9LCBjbGFzc05hbWUpLFxuICAgICAgaW5wdXRSZWY6IGlubmVyUmVmLFxuICAgICAgaW5wdXRTdHlsZTogaW5wdXRTdHlsZShpc0hpZGRlbiksXG4gICAgICBkaXNhYmxlZDogaXNEaXNhYmxlZFxuICAgIH0sIHByb3BzKSlcbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTWVudVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIEdldCBNZW51IFBsYWNlbWVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGdldE1lbnVQbGFjZW1lbnQoX3JlZikge1xuICB2YXIgbWF4SGVpZ2h0ID0gX3JlZi5tYXhIZWlnaHQsXG4gICAgICBtZW51RWwgPSBfcmVmLm1lbnVFbCxcbiAgICAgIG1pbkhlaWdodCA9IF9yZWYubWluSGVpZ2h0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQsXG4gICAgICBzaG91bGRTY3JvbGwgPSBfcmVmLnNob3VsZFNjcm9sbCxcbiAgICAgIGlzRml4ZWRQb3NpdGlvbiA9IF9yZWYuaXNGaXhlZFBvc2l0aW9uO1xuXG4gIHZhciBzY3JvbGxQYXJlbnQgPSBnZXRTY3JvbGxQYXJlbnQobWVudUVsKTtcbiAgdmFyIGRlZmF1bHRTdGF0ZSA9IHsgcGxhY2VtZW50OiAnYm90dG9tJywgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfTtcblxuICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZywgcmV0dXJuIGRlZmF1bHQgc3RhdGVcbiAgaWYgKCFtZW51RWwgfHwgIW1lbnVFbC5vZmZzZXRQYXJlbnQpIHJldHVybiBkZWZhdWx0U3RhdGU7XG5cbiAgLy8gd2UgY2FuJ3QgdHJ1c3QgYHNjcm9sbFBhcmVudC5zY3JvbGxIZWlnaHRgIC0tPiBpdCBtYXkgaW5jcmVhc2Ugd2hlblxuICAvLyB0aGUgbWVudSBpcyByZW5kZXJlZFxuXG4gIHZhciBfc2Nyb2xsUGFyZW50JGdldEJvdW4gPSBzY3JvbGxQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBzY3JvbGxIZWlnaHQgPSBfc2Nyb2xsUGFyZW50JGdldEJvdW4uaGVpZ2h0O1xuXG4gIHZhciBfbWVudUVsJGdldEJvdW5kaW5nQ2wgPSBtZW51RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBtZW51Qm90dG9tID0gX21lbnVFbCRnZXRCb3VuZGluZ0NsLmJvdHRvbSxcbiAgICAgIG1lbnVIZWlnaHQgPSBfbWVudUVsJGdldEJvdW5kaW5nQ2wuaGVpZ2h0LFxuICAgICAgbWVudVRvcCA9IF9tZW51RWwkZ2V0Qm91bmRpbmdDbC50b3A7XG5cbiAgLy8gJEZsb3dGaXhNZSBmdW5jdGlvbiByZXR1cm5zIGFib3ZlIGlmIHRoZXJlJ3Mgbm8gb2Zmc2V0UGFyZW50XG5cblxuICB2YXIgX21lbnVFbCRvZmZzZXRQYXJlbnQkID0gbWVudUVsLm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGNvbnRhaW5lclRvcCA9IF9tZW51RWwkb2Zmc2V0UGFyZW50JC50b3A7XG5cbiAgdmFyIHZpZXdIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIHZhciBzY3JvbGxUb3AgPSBnZXRTY3JvbGxUb3Aoc2Nyb2xsUGFyZW50KTtcbiAgdmFyIGd1dHRlciA9IHNwYWNpbmcubWVudUd1dHRlcjtcblxuICB2YXIgdmlld1NwYWNlQWJvdmUgPSBjb250YWluZXJUb3AgLSBndXR0ZXI7XG4gIHZhciB2aWV3U3BhY2VCZWxvdyA9IHZpZXdIZWlnaHQgLSBtZW51VG9wO1xuICB2YXIgc2Nyb2xsU3BhY2VBYm92ZSA9IHZpZXdTcGFjZUFib3ZlICsgc2Nyb2xsVG9wO1xuICB2YXIgc2Nyb2xsU3BhY2VCZWxvdyA9IHNjcm9sbEhlaWdodCAtIHNjcm9sbFRvcCAtIG1lbnVUb3A7XG5cbiAgdmFyIHNjcm9sbERvd24gPSBtZW51Qm90dG9tIC0gdmlld0hlaWdodCArIHNjcm9sbFRvcCArIGd1dHRlcjtcbiAgdmFyIHNjcm9sbFVwID0gc2Nyb2xsVG9wICsgbWVudVRvcCAtIGd1dHRlcjtcbiAgdmFyIHNjcm9sbER1cmF0aW9uID0gMTYwO1xuXG4gIHN3aXRjaCAocGxhY2VtZW50KSB7XG4gICAgY2FzZSAnYXV0byc6XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIC8vIDE6IHRoZSBtZW51IHdpbGwgZml0LCBkbyBub3RoaW5nXG4gICAgICBpZiAodmlld1NwYWNlQmVsb3cgPj0gbWVudUhlaWdodCkge1xuICAgICAgICByZXR1cm4geyBwbGFjZW1lbnQ6ICdib3R0b20nLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuICAgICAgfVxuXG4gICAgICAvLyAyOiB0aGUgbWVudSB3aWxsIGZpdCwgaWYgc2Nyb2xsZWRcbiAgICAgIGlmIChzY3JvbGxTcGFjZUJlbG93ID49IG1lbnVIZWlnaHQgJiYgIWlzRml4ZWRQb3NpdGlvbikge1xuICAgICAgICBpZiAoc2hvdWxkU2Nyb2xsKSB7XG4gICAgICAgICAgYW5pbWF0ZWRTY3JvbGxUbyhzY3JvbGxQYXJlbnQsIHNjcm9sbERvd24sIHNjcm9sbER1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHBsYWNlbWVudDogJ2JvdHRvbScsIG1heEhlaWdodDogbWF4SGVpZ2h0IH07XG4gICAgICB9XG5cbiAgICAgIC8vIDM6IHRoZSBtZW51IHdpbGwgZml0LCBpZiBjb25zdHJhaW5lZFxuICAgICAgaWYgKCFpc0ZpeGVkUG9zaXRpb24gJiYgc2Nyb2xsU3BhY2VCZWxvdyA+PSBtaW5IZWlnaHQgfHwgaXNGaXhlZFBvc2l0aW9uICYmIHZpZXdTcGFjZUJlbG93ID49IG1pbkhlaWdodCkge1xuICAgICAgICBpZiAoc2hvdWxkU2Nyb2xsKSB7XG4gICAgICAgICAgYW5pbWF0ZWRTY3JvbGxUbyhzY3JvbGxQYXJlbnQsIHNjcm9sbERvd24sIHNjcm9sbER1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIHdhbnQgdG8gcHJvdmlkZSBhcyBtdWNoIG9mIHRoZSBtZW51IGFzIHBvc3NpYmxlIHRvIHRoZSB1c2VyLFxuICAgICAgICAvLyBzbyBnaXZlIHRoZW0gd2hhdGV2ZXIgaXMgYXZhaWxhYmxlIGJlbG93IHJhdGhlciB0aGFuIHRoZSBtaW5IZWlnaHQuXG4gICAgICAgIHZhciBjb25zdHJhaW5lZEhlaWdodCA9IGlzRml4ZWRQb3NpdGlvbiA/IHZpZXdTcGFjZUJlbG93IC0gZ3V0dGVyIDogc2Nyb2xsU3BhY2VCZWxvdyAtIGd1dHRlcjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICAgICAgbWF4SGVpZ2h0OiBjb25zdHJhaW5lZEhlaWdodFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBGb3JrZWQgYmV2aW91ciB3aGVuIHRoZXJlIGlzbid0IGVub3VnaCBzcGFjZSBiZWxvd1xuXG4gICAgICAvLyBBVVRPOiBmbGlwIHRoZSBtZW51LCByZW5kZXIgYWJvdmVcbiAgICAgIGlmIChwbGFjZW1lbnQgPT09ICdhdXRvJyB8fCBpc0ZpeGVkUG9zaXRpb24pIHtcbiAgICAgICAgLy8gbWF5IG5lZWQgdG8gYmUgY29uc3RyYWluZWQgYWZ0ZXIgZmxpcHBpbmdcbiAgICAgICAgdmFyIF9jb25zdHJhaW5lZEhlaWdodCA9IG1heEhlaWdodDtcblxuICAgICAgICBpZiAoIWlzRml4ZWRQb3NpdGlvbiAmJiBzY3JvbGxTcGFjZUFib3ZlID49IG1pbkhlaWdodCB8fCBpc0ZpeGVkUG9zaXRpb24gJiYgdmlld1NwYWNlQWJvdmUgPj0gbWluSGVpZ2h0KSB7XG4gICAgICAgICAgX2NvbnN0cmFpbmVkSGVpZ2h0ID0gaXNGaXhlZFBvc2l0aW9uID8gdmlld1NwYWNlQWJvdmUgLSBndXR0ZXIgLSBzcGFjaW5nLmNvbnRyb2xIZWlnaHQgOiBzY3JvbGxTcGFjZUFib3ZlIC0gZ3V0dGVyIC0gc3BhY2luZy5jb250cm9sSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgcGxhY2VtZW50OiAndG9wJywgbWF4SGVpZ2h0OiBfY29uc3RyYWluZWRIZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgLy8gQk9UVE9NOiBhbGxvdyBicm93c2VyIHRvIGluY3JlYXNlIHNjcm9sbGFibGUgYXJlYSBhbmQgaW1tZWRpYXRlbHkgc2V0IHNjcm9sbFxuICAgICAgaWYgKHBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgc2Nyb2xsVG8oc2Nyb2xsUGFyZW50LCBzY3JvbGxEb3duKTtcbiAgICAgICAgcmV0dXJuIHsgcGxhY2VtZW50OiAnYm90dG9tJywgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICAvLyAxOiB0aGUgbWVudSB3aWxsIGZpdCwgZG8gbm90aGluZ1xuICAgICAgaWYgKHZpZXdTcGFjZUFib3ZlID49IG1lbnVIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHsgcGxhY2VtZW50OiAndG9wJywgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgLy8gMjogdGhlIG1lbnUgd2lsbCBmaXQsIGlmIHNjcm9sbGVkXG4gICAgICBpZiAoc2Nyb2xsU3BhY2VBYm92ZSA+PSBtZW51SGVpZ2h0ICYmICFpc0ZpeGVkUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHNob3VsZFNjcm9sbCkge1xuICAgICAgICAgIGFuaW1hdGVkU2Nyb2xsVG8oc2Nyb2xsUGFyZW50LCBzY3JvbGxVcCwgc2Nyb2xsRHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgcGxhY2VtZW50OiAndG9wJywgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfTtcbiAgICAgIH1cblxuICAgICAgLy8gMzogdGhlIG1lbnUgd2lsbCBmaXQsIGlmIGNvbnN0cmFpbmVkXG4gICAgICBpZiAoIWlzRml4ZWRQb3NpdGlvbiAmJiBzY3JvbGxTcGFjZUFib3ZlID49IG1pbkhlaWdodCB8fCBpc0ZpeGVkUG9zaXRpb24gJiYgdmlld1NwYWNlQWJvdmUgPj0gbWluSGVpZ2h0KSB7XG4gICAgICAgIHZhciBfY29uc3RyYWluZWRIZWlnaHQyID0gbWF4SGVpZ2h0O1xuXG4gICAgICAgIC8vIHdlIHdhbnQgdG8gcHJvdmlkZSBhcyBtdWNoIG9mIHRoZSBtZW51IGFzIHBvc3NpYmxlIHRvIHRoZSB1c2VyLFxuICAgICAgICAvLyBzbyBnaXZlIHRoZW0gd2hhdGV2ZXIgaXMgYXZhaWxhYmxlIGJlbG93IHJhdGhlciB0aGFuIHRoZSBtaW5IZWlnaHQuXG4gICAgICAgIGlmICghaXNGaXhlZFBvc2l0aW9uICYmIHNjcm9sbFNwYWNlQWJvdmUgPj0gbWluSGVpZ2h0IHx8IGlzRml4ZWRQb3NpdGlvbiAmJiB2aWV3U3BhY2VBYm92ZSA+PSBtaW5IZWlnaHQpIHtcbiAgICAgICAgICBfY29uc3RyYWluZWRIZWlnaHQyID0gaXNGaXhlZFBvc2l0aW9uID8gdmlld1NwYWNlQWJvdmUgLSBndXR0ZXIgOiBzY3JvbGxTcGFjZUFib3ZlIC0gZ3V0dGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFNjcm9sbCkge1xuICAgICAgICAgIGFuaW1hdGVkU2Nyb2xsVG8oc2Nyb2xsUGFyZW50LCBzY3JvbGxVcCwgc2Nyb2xsRHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgICAgICAgIG1heEhlaWdodDogX2NvbnN0cmFpbmVkSGVpZ2h0MlxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBub3QgZW5vdWdoIHNwYWNlLCB0aGUgYnJvd3NlciBXSUxMIE5PVCBpbmNyZWFzZSBzY3JvbGxhYmxlIGFyZWEgd2hlblxuICAgICAgLy8gYWJzb2x1dGVseSBwb3NpdGlvbmVkIGVsZW1lbnQgcmVuZGVyZWQgYWJvdmUgdGhlIHZpZXdwb3J0IChvbmx5IGJlbG93KS5cbiAgICAgIC8vIEZsaXAgdGhlIG1lbnUsIHJlbmRlciBiZWxvd1xuICAgICAgcmV0dXJuIHsgcGxhY2VtZW50OiAnYm90dG9tJywgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBsYWNlbWVudCBwcm92aWRlZCBcIicgKyBwbGFjZW1lbnQgKyAnXCIuJyk7XG4gIH1cblxuICAvLyBmdWxmaWwgY29udHJhY3Qgd2l0aCBmbG93OiBpbXBsaWNpdCByZXR1cm4gdmFsdWUgb2YgdW5kZWZpbmVkXG4gIHJldHVybiBkZWZhdWx0U3RhdGU7XG59XG5cbi8vIE1lbnUgQ29tcG9uZW50XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYWxpZ25Ub0NvbnRyb2wocGxhY2VtZW50KSB7XG4gIHZhciBwbGFjZW1lbnRUb0NTU1Byb3AgPSB7IGJvdHRvbTogJ3RvcCcsIHRvcDogJ2JvdHRvbScgfTtcbiAgcmV0dXJuIHBsYWNlbWVudCA/IHBsYWNlbWVudFRvQ1NTUHJvcFtwbGFjZW1lbnRdIDogJ2JvdHRvbSc7XG59XG52YXIgY29lcmNlUGxhY2VtZW50ID0gZnVuY3Rpb24gY29lcmNlUGxhY2VtZW50KHApIHtcbiAgcmV0dXJuIHAgPT09ICdhdXRvJyA/ICdib3R0b20nIDogcDtcbn07XG5cbnZhciBtZW51Q1NTID0gZnVuY3Rpb24gbWVudUNTUyhfcmVmMikge1xuICB2YXIgX3JlZjM7XG5cbiAgdmFyIHBsYWNlbWVudCA9IF9yZWYyLnBsYWNlbWVudDtcbiAgcmV0dXJuIF9yZWYzID0ge30sIGRlZmluZVByb3BlcnR5KF9yZWYzLCBhbGlnblRvQ29udHJvbChwbGFjZW1lbnQpLCAnMTAwJScpLCBkZWZpbmVQcm9wZXJ0eShfcmVmMywgJ2JhY2tncm91bmRDb2xvcicsIGNvbG9ycy5uZXV0cmFsMCksIGRlZmluZVByb3BlcnR5KF9yZWYzLCAnYm9yZGVyUmFkaXVzJywgYm9yZGVyUmFkaXVzKSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsICdib3hTaGFkb3cnLCAnMCAwIDAgMXB4ICcgKyBjb2xvcnMubmV1dHJhbDEwYSArICcsIDAgNHB4IDExcHggJyArIGNvbG9ycy5uZXV0cmFsMTBhKSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsICdtYXJnaW5Cb3R0b20nLCBzcGFjaW5nLm1lbnVHdXR0ZXIpLCBkZWZpbmVQcm9wZXJ0eShfcmVmMywgJ21hcmdpblRvcCcsIHNwYWNpbmcubWVudUd1dHRlciksIGRlZmluZVByb3BlcnR5KF9yZWYzLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKSwgZGVmaW5lUHJvcGVydHkoX3JlZjMsICd3aWR0aCcsICcxMDAlJyksIGRlZmluZVByb3BlcnR5KF9yZWYzLCAnekluZGV4JywgMSksIF9yZWYzO1xufTtcblxudmFyIE1lbnUgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhNZW51LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNZW51KCkge1xuICAgIHZhciBfcmVmNDtcblxuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51KTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX3JlZjQgPSBNZW51Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWVudSkpLmNhbGwuYXBwbHkoX3JlZjQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1heEhlaWdodDogX3RoaXMucHJvcHMubWF4TWVudUhlaWdodCxcbiAgICAgIHBsYWNlbWVudDogbnVsbFxuICAgIH0sIF90aGlzLmdldFBsYWNlbWVudCA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIG1pbk1lbnVIZWlnaHQgPSBfdGhpcyRwcm9wcy5taW5NZW51SGVpZ2h0LFxuICAgICAgICAgIG1heE1lbnVIZWlnaHQgPSBfdGhpcyRwcm9wcy5tYXhNZW51SGVpZ2h0LFxuICAgICAgICAgIG1lbnVQbGFjZW1lbnQgPSBfdGhpcyRwcm9wcy5tZW51UGxhY2VtZW50LFxuICAgICAgICAgIG1lbnVQb3NpdGlvbiA9IF90aGlzJHByb3BzLm1lbnVQb3NpdGlvbixcbiAgICAgICAgICBtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXcgPSBfdGhpcyRwcm9wcy5tZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXc7XG4gICAgICB2YXIgZ2V0UG9ydGFsUGxhY2VtZW50ID0gX3RoaXMuY29udGV4dC5nZXRQb3J0YWxQbGFjZW1lbnQ7XG5cblxuICAgICAgaWYgKCFyZWYpIHJldHVybjtcblxuICAgICAgLy8gRE8gTk9UIHNjcm9sbCBpZiBwb3NpdGlvbiBpcyBmaXhlZFxuICAgICAgdmFyIGlzRml4ZWRQb3NpdGlvbiA9IG1lbnVQb3NpdGlvbiA9PT0gJ2ZpeGVkJztcbiAgICAgIHZhciBzaG91bGRTY3JvbGwgPSBtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXcgJiYgIWlzRml4ZWRQb3NpdGlvbjtcblxuICAgICAgdmFyIHN0YXRlID0gZ2V0TWVudVBsYWNlbWVudCh7XG4gICAgICAgIG1heEhlaWdodDogbWF4TWVudUhlaWdodCxcbiAgICAgICAgbWVudUVsOiByZWYsXG4gICAgICAgIG1pbkhlaWdodDogbWluTWVudUhlaWdodCxcbiAgICAgICAgcGxhY2VtZW50OiBtZW51UGxhY2VtZW50LFxuICAgICAgICBzaG91bGRTY3JvbGw6IHNob3VsZFNjcm9sbCxcbiAgICAgICAgaXNGaXhlZFBvc2l0aW9uOiBpc0ZpeGVkUG9zaXRpb25cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZ2V0UG9ydGFsUGxhY2VtZW50KSBnZXRQb3J0YWxQbGFjZW1lbnQoc3RhdGUpO1xuXG4gICAgICBfdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfSwgX3RoaXMuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbWVudVBsYWNlbWVudCA9IF90aGlzLnByb3BzLm1lbnVQbGFjZW1lbnQ7XG5cbiAgICAgIHZhciBwbGFjZW1lbnQgPSBfdGhpcy5zdGF0ZS5wbGFjZW1lbnQgfHwgY29lcmNlUGxhY2VtZW50KG1lbnVQbGFjZW1lbnQpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIF90aGlzLnByb3BzLCB7IHBsYWNlbWVudDogcGxhY2VtZW50LCBtYXhIZWlnaHQ6IF90aGlzLnN0YXRlLm1heEhlaWdodCB9KTtcbiAgICB9LCBfdGVtcCksIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoTWVudSwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgIGN4ID0gX3Byb3BzLmN4LFxuICAgICAgICAgIGdldFN0eWxlcyA9IF9wcm9wcy5nZXRTdHlsZXMsXG4gICAgICAgICAgaW5uZXJQcm9wcyA9IF9wcm9wcy5pbm5lclByb3BzO1xuXG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgX2V4dGVuZHMoe1xuICAgICAgICAgIGNsYXNzTmFtZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdtZW51JywgdGhpcy5nZXRTdGF0ZSgpKSksIHtcbiAgICAgICAgICAgICdtZW51JzogdHJ1ZVxuICAgICAgICAgIH0sIGNsYXNzTmFtZSksXG4gICAgICAgICAgcmVmOiB0aGlzLmdldFBsYWNlbWVudFxuICAgICAgICB9LCBpbm5lclByb3BzKSxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNZW51O1xufShDb21wb25lbnQpO1xuXG5NZW51LmNvbnRleHRUeXBlcyA9IHtcbiAgZ2V0UG9ydGFsUGxhY2VtZW50OiBQcm9wVHlwZXMuZnVuY1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBNZW51IExpc3Rcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgbWVudUxpc3RDU1MgPSBmdW5jdGlvbiBtZW51TGlzdENTUyhfcmVmNSkge1xuICB2YXIgbWF4SGVpZ2h0ID0gX3JlZjUubWF4SGVpZ2h0O1xuICByZXR1cm4ge1xuICAgIG1heEhlaWdodDogbWF4SGVpZ2h0LFxuICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgIHBhZGRpbmdCb3R0b206IHNwYWNpbmcuYmFzZVVuaXQsXG4gICAgcGFkZGluZ1RvcDogc3BhY2luZy5iYXNlVW5pdCxcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJywgLy8gcmVxdWlyZWQgZm9yIG9mZnNldFtIZWlnaHQsIFRvcF0gPiBrZXlib2FyZCBzY3JvbGxcbiAgICBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogJ3RvdWNoJ1xuICB9O1xufTtcbnZhciBNZW51TGlzdCA9IGZ1bmN0aW9uIE1lbnVMaXN0KHByb3BzKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgY3ggPSBwcm9wcy5jeCxcbiAgICAgIGdldFN0eWxlcyA9IHByb3BzLmdldFN0eWxlcyxcbiAgICAgIGlzTXVsdGkgPSBwcm9wcy5pc011bHRpLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHM7XG4gIHZhciBpbm5lclJlZiA9IGlubmVyUHJvcHMuaW5uZXJSZWYsXG4gICAgICByZXN0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoaW5uZXJQcm9wcywgWydpbm5lclJlZiddKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnbWVudUxpc3QnLCBwcm9wcykpLCB7XG4gICAgICAgICdtZW51LWxpc3QnOiB0cnVlLFxuICAgICAgICAnbWVudS1saXN0LS1pcy1tdWx0aSc6IGlzTXVsdGlcbiAgICAgIH0sIGNsYXNzTmFtZSksXG4gICAgICByZWY6IGlubmVyUmVmXG4gICAgfSwgcmVzdCksXG4gICAgY2hpbGRyZW5cbiAgKTtcbn07XG52YXIgbm90aWNlQ1NTID0gZnVuY3Rpb24gbm90aWNlQ1NTKCkge1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgIHBhZGRpbmc6IHNwYWNpbmcuYmFzZVVuaXQgKiAyICsgJ3B4ICcgKyBzcGFjaW5nLmJhc2VVbml0ICogMyArICdweCcsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICB9O1xufTtcbnZhciBub09wdGlvbnNNZXNzYWdlQ1NTID0gbm90aWNlQ1NTO1xudmFyIGxvYWRpbmdNZXNzYWdlQ1NTID0gbm90aWNlQ1NTO1xuXG52YXIgTm9PcHRpb25zTWVzc2FnZSA9IGZ1bmN0aW9uIE5vT3B0aW9uc01lc3NhZ2UocHJvcHMpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHM7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgX2V4dGVuZHMoe1xuICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ25vT3B0aW9uc01lc3NhZ2UnLCBwcm9wcykpLCB7XG4gICAgICAgICdtZW51LW5vdGljZSc6IHRydWUsXG4gICAgICAgICdtZW51LW5vdGljZS0tbm8tb3B0aW9ucyc6IHRydWVcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCBpbm5lclByb3BzKSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcbk5vT3B0aW9uc01lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogJ05vIG9wdGlvbnMnXG59O1xuXG52YXIgTG9hZGluZ01lc3NhZ2UgPSBmdW5jdGlvbiBMb2FkaW5nTWVzc2FnZShwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnbG9hZGluZ01lc3NhZ2UnLCBwcm9wcykpLCB7XG4gICAgICAgICdtZW51LW5vdGljZSc6IHRydWUsXG4gICAgICAgICdtZW51LW5vdGljZS0tbG9hZGluZyc6IHRydWVcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCBpbm5lclByb3BzKSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcbkxvYWRpbmdNZXNzYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46ICdMb2FkaW5nLi4uJ1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBNZW51IFBvcnRhbFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBtZW51UG9ydGFsQ1NTID0gZnVuY3Rpb24gbWVudVBvcnRhbENTUyhfcmVmNikge1xuICB2YXIgcmVjdCA9IF9yZWY2LnJlY3QsXG4gICAgICBvZmZzZXQgPSBfcmVmNi5vZmZzZXQsXG4gICAgICBwb3NpdGlvbiA9IF9yZWY2LnBvc2l0aW9uO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgdG9wOiBvZmZzZXQsXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgekluZGV4OiAxXG4gIH07XG59O1xuXG52YXIgTWVudVBvcnRhbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50Mikge1xuICBpbmhlcml0cyhNZW51UG9ydGFsLCBfQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gTWVudVBvcnRhbCgpIHtcbiAgICB2YXIgX3JlZjc7XG5cbiAgICB2YXIgX3RlbXAyLCBfdGhpczIsIF9yZXQyO1xuXG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVudVBvcnRhbCk7XG5cbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0MiA9IChfdGVtcDIgPSAoX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX3JlZjcgPSBNZW51UG9ydGFsLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWVudVBvcnRhbCkpLmNhbGwuYXBwbHkoX3JlZjcsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMyKSwgX3RoaXMyLnN0YXRlID0geyBwbGFjZW1lbnQ6IG51bGwgfSwgX3RoaXMyLmdldFBvcnRhbFBsYWNlbWVudCA9IGZ1bmN0aW9uIChfcmVmOCkge1xuICAgICAgdmFyIHBsYWNlbWVudCA9IF9yZWY4LnBsYWNlbWVudDtcblxuICAgICAgdmFyIGluaXRpYWxQbGFjZW1lbnQgPSBjb2VyY2VQbGFjZW1lbnQoX3RoaXMyLnByb3BzLm1lbnVQbGFjZW1lbnQpO1xuXG4gICAgICAvLyBhdm9pZCByZS1yZW5kZXJzIGlmIHRoZSBwbGFjZW1lbnQgaGFzIG5vdCBjaGFuZ2VkXG4gICAgICBpZiAocGxhY2VtZW50ICE9PSBpbml0aWFsUGxhY2VtZW50KSB7XG4gICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7IHBsYWNlbWVudDogcGxhY2VtZW50IH0pO1xuICAgICAgfVxuICAgIH0sIF90ZW1wMiksIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMyLCBfcmV0Mik7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhNZW51UG9ydGFsLCBbe1xuICAgIGtleTogJ2dldENoaWxkQ29udGV4dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldFBvcnRhbFBsYWNlbWVudDogdGhpcy5nZXRQb3J0YWxQbGFjZW1lbnRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gY2FsbGJhY2sgZm9yIG9jY2Fzc2lvbnMgd2hlcmUgdGhlIG1lbnUgbXVzdCBcImZsaXBcIlxuXG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYXBwZW5kVG8gPSBfcHJvcHMyLmFwcGVuZFRvLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3Byb3BzMi5jaGlsZHJlbixcbiAgICAgICAgICBjb250cm9sRWxlbWVudCA9IF9wcm9wczIuY29udHJvbEVsZW1lbnQsXG4gICAgICAgICAgbWVudVBsYWNlbWVudCA9IF9wcm9wczIubWVudVBsYWNlbWVudCxcbiAgICAgICAgICBwb3NpdGlvbiA9IF9wcm9wczIubWVudVBvc2l0aW9uLFxuICAgICAgICAgIGdldFN0eWxlcyA9IF9wcm9wczIuZ2V0U3R5bGVzO1xuXG4gICAgICB2YXIgaXNGaXhlZCA9IHBvc2l0aW9uID09PSAnZml4ZWQnO1xuXG4gICAgICAvLyBiYWlsIGVhcmx5IGlmIHJlcXVpcmVkIGVsZW1lbnRzIGFyZW4ndCBwcmVzZW50XG4gICAgICBpZiAoIWFwcGVuZFRvICYmICFpc0ZpeGVkIHx8ICFjb250cm9sRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHBsYWNlbWVudCA9IHRoaXMuc3RhdGUucGxhY2VtZW50IHx8IGNvZXJjZVBsYWNlbWVudChtZW51UGxhY2VtZW50KTtcbiAgICAgIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRPYmooY29udHJvbEVsZW1lbnQpO1xuICAgICAgdmFyIHNjcm9sbERpc3RhbmNlID0gaXNGaXhlZCA/IDAgOiB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICB2YXIgb2Zmc2V0ID0gcmVjdFtwbGFjZW1lbnRdICsgc2Nyb2xsRGlzdGFuY2U7XG4gICAgICB2YXIgc3RhdGUgPSB7IG9mZnNldDogb2Zmc2V0LCBwb3NpdGlvbjogcG9zaXRpb24sIHJlY3Q6IHJlY3QgfTtcblxuICAgICAgLy8gc2FtZSB3cmFwcGVyIGVsZW1lbnQgd2hldGhlciBmaXhlZCBvciBwb3J0YWxsZWRcbiAgICAgIHZhciBtZW51V3JhcHBlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiAvKiNfX1BVUkVfXyovIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdtZW51UG9ydGFsJywgc3RhdGUpKVxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlblxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGFwcGVuZFRvID8gY3JlYXRlUG9ydGFsKG1lbnVXcmFwcGVyLCBhcHBlbmRUbykgOiBtZW51V3JhcHBlcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1lbnVQb3J0YWw7XG59KENvbXBvbmVudCk7XG5NZW51UG9ydGFsLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICBnZXRQb3J0YWxQbGFjZW1lbnQ6IFByb3BUeXBlcy5mdW5jXG59O1xuXG52YXIgbXVsdGlWYWx1ZUNTUyA9IGZ1bmN0aW9uIG11bHRpVmFsdWVDU1MoKSB7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMubmV1dHJhbDEwLFxuICAgIGJvcmRlclJhZGl1czogYm9yZGVyUmFkaXVzIC8gMixcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgbWFyZ2luOiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICBtaW5XaWR0aDogMCAvLyByZXNvbHZlcyBmbGV4L3RleHQtb3ZlcmZsb3cgYnVnXG4gIH07XG59O1xudmFyIG11bHRpVmFsdWVMYWJlbENTUyA9IGZ1bmN0aW9uIG11bHRpVmFsdWVMYWJlbENTUyhfcmVmKSB7XG4gIHZhciBjcm9wV2l0aEVsbGlwc2lzID0gX3JlZi5jcm9wV2l0aEVsbGlwc2lzO1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiBjb2xvcnMudGV4dCxcbiAgICBmb250U2l6ZTogJzg1JScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHBhZGRpbmc6IDMsXG4gICAgcGFkZGluZ0xlZnQ6IDYsXG4gICAgdGV4dE92ZXJmbG93OiBjcm9wV2l0aEVsbGlwc2lzID8gJ2VsbGlwc2lzJyA6IG51bGwsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCdcbiAgfTtcbn07XG52YXIgbXVsdGlWYWx1ZVJlbW92ZUNTUyA9IGZ1bmN0aW9uIG11bHRpVmFsdWVSZW1vdmVDU1MoX3JlZjIpIHtcbiAgdmFyIGlzRm9jdXNlZCA9IF9yZWYyLmlzRm9jdXNlZDtcbiAgcmV0dXJuIHtcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBib3JkZXJSYWRpdXM6IGJvcmRlclJhZGl1cyAvIDIsXG4gICAgYmFja2dyb3VuZENvbG9yOiBpc0ZvY3VzZWQgJiYgY29sb3JzLmRhbmdlckxpZ2h0LFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBwYWRkaW5nTGVmdDogc3BhY2luZy5iYXNlVW5pdCxcbiAgICBwYWRkaW5nUmlnaHQ6IHNwYWNpbmcuYmFzZVVuaXQsXG4gICAgJzpob3Zlcic6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JzLmRhbmdlckxpZ2h0LFxuICAgICAgY29sb3I6IGNvbG9ycy5kYW5nZXJcbiAgICB9XG4gIH07XG59O1xuXG52YXIgTXVsdGlWYWx1ZUNvbnRhaW5lciA9IERpdjtcbnZhciBNdWx0aVZhbHVlTGFiZWwgPSBEaXY7XG5cbnZhciBNdWx0aVZhbHVlUmVtb3ZlID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoTXVsdGlWYWx1ZVJlbW92ZSwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTXVsdGlWYWx1ZVJlbW92ZSgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBNdWx0aVZhbHVlUmVtb3ZlKTtcbiAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTXVsdGlWYWx1ZVJlbW92ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE11bHRpVmFsdWVSZW1vdmUpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKE11bHRpVmFsdWVSZW1vdmUsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnY2hpbGRyZW4nXSk7XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBEaXYsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBjaGlsZHJlblxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE11bHRpVmFsdWVSZW1vdmU7XG59KENvbXBvbmVudCk7XG5cbk11bHRpVmFsdWVSZW1vdmUuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuY3JlYXRlRWxlbWVudChDcm9zc0ljb24sIHsgc2l6ZTogMTQgfSlcbn07XG5cbnZhciBNdWx0aVZhbHVlID0gZnVuY3Rpb24gKF9Db21wb25lbnQyKSB7XG4gIGluaGVyaXRzKE11bHRpVmFsdWUsIF9Db21wb25lbnQyKTtcblxuICBmdW5jdGlvbiBNdWx0aVZhbHVlKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE11bHRpVmFsdWUpO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChNdWx0aVZhbHVlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTXVsdGlWYWx1ZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoTXVsdGlWYWx1ZSwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMyLmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF9wcm9wczIuY2xhc3NOYW1lLFxuICAgICAgICAgIGNvbXBvbmVudHMgPSBfcHJvcHMyLmNvbXBvbmVudHMsXG4gICAgICAgICAgY3ggPSBfcHJvcHMyLmN4LFxuICAgICAgICAgIGdldFN0eWxlcyA9IF9wcm9wczIuZ2V0U3R5bGVzLFxuICAgICAgICAgIGlubmVyUHJvcHMgPSBfcHJvcHMyLmlubmVyUHJvcHMsXG4gICAgICAgICAgaXNEaXNhYmxlZCA9IF9wcm9wczIuaXNEaXNhYmxlZCxcbiAgICAgICAgICByZW1vdmVQcm9wcyA9IF9wcm9wczIucmVtb3ZlUHJvcHM7XG5cbiAgICAgIHZhciBjbiA9IHtcbiAgICAgICAgY29udGFpbmVyOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ211bHRpVmFsdWUnLCB0aGlzLnByb3BzKSksIHtcbiAgICAgICAgICAnbXVsdGktdmFsdWUnOiB0cnVlLFxuICAgICAgICAgICdtdWx0aS12YWx1ZS0taXMtZGlzYWJsZWQnOiBpc0Rpc2FibGVkXG4gICAgICAgIH0sIGNsYXNzTmFtZSksXG4gICAgICAgIGxhYmVsOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ211bHRpVmFsdWVMYWJlbCcsIHRoaXMucHJvcHMpKSwge1xuICAgICAgICAgICdtdWx0aS12YWx1ZV9fbGFiZWwnOiB0cnVlXG4gICAgICAgIH0sIGNsYXNzTmFtZSksXG4gICAgICAgIHJlbW92ZTogY3goIC8qI19fUFVSRV9fKi9jc3MoZ2V0U3R5bGVzKCdtdWx0aVZhbHVlUmVtb3ZlJywgdGhpcy5wcm9wcykpLCB7XG4gICAgICAgICAgJ211bHRpLXZhbHVlX19yZW1vdmUnOiB0cnVlXG4gICAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICAgIH07XG4gICAgICB2YXIgQ29udGFpbmVyID0gY29tcG9uZW50cy5Db250YWluZXIsXG4gICAgICAgICAgTGFiZWwgPSBjb21wb25lbnRzLkxhYmVsLFxuICAgICAgICAgIFJlbW92ZSA9IGNvbXBvbmVudHMuUmVtb3ZlO1xuXG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBDb250YWluZXIsXG4gICAgICAgIF9leHRlbmRzKHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNuLmNvbnRhaW5lclxuICAgICAgICB9LCBpbm5lclByb3BzKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBMYWJlbCxcbiAgICAgICAgICB7IGNsYXNzTmFtZTogY24ubGFiZWwgfSxcbiAgICAgICAgICBjaGlsZHJlblxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZSwgX2V4dGVuZHMoeyBjbGFzc05hbWU6IGNuLnJlbW92ZSB9LCByZW1vdmVQcm9wcykpXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTXVsdGlWYWx1ZTtcbn0oQ29tcG9uZW50KTtcblxuTXVsdGlWYWx1ZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNyb3BXaXRoRWxsaXBzaXM6IHRydWVcbn07XG5cbnZhciBjc3MkMyA9IGZ1bmN0aW9uIGNzcyQkMShfcmVmKSB7XG4gIHZhciBpc0Rpc2FibGVkID0gX3JlZi5pc0Rpc2FibGVkLFxuICAgICAgaXNGb2N1c2VkID0gX3JlZi5pc0ZvY3VzZWQsXG4gICAgICBpc1NlbGVjdGVkID0gX3JlZi5pc1NlbGVjdGVkO1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmRDb2xvcjogaXNTZWxlY3RlZCA/IGNvbG9ycy5wcmltYXJ5IDogaXNGb2N1c2VkID8gY29sb3JzLnByaW1hcnkyNSA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDIwIDogaXNTZWxlY3RlZCA/IGNvbG9ycy5uZXV0cmFsMCA6ICdpbmhlcml0JyxcbiAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgcGFkZGluZzogc3BhY2luZy5iYXNlVW5pdCAqIDIgKyAncHggJyArIHNwYWNpbmcuYmFzZVVuaXQgKiAzICsgJ3B4JyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICBXZWJraXRUYXBIaWdobGlnaHRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuXG4gICAgLy8gcHJvdmlkZSBzb21lIGFmZm9yZGFuY2Ugb24gdG91Y2ggZGV2aWNlc1xuICAgICc6YWN0aXZlJzoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBpc1NlbGVjdGVkID8gY29sb3JzLnByaW1hcnkgOiBjb2xvcnMucHJpbWFyeTUwXG4gICAgfVxuICB9O1xufTtcblxudmFyIE9wdGlvbiA9IGZ1bmN0aW9uIE9wdGlvbihwcm9wcykge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGN4ID0gcHJvcHMuY3gsXG4gICAgICBnZXRTdHlsZXMgPSBwcm9wcy5nZXRTdHlsZXMsXG4gICAgICBpc0Rpc2FibGVkID0gcHJvcHMuaXNEaXNhYmxlZCxcbiAgICAgIGlzRm9jdXNlZCA9IHByb3BzLmlzRm9jdXNlZCxcbiAgICAgIGlzU2VsZWN0ZWQgPSBwcm9wcy5pc1NlbGVjdGVkLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHM7XG4gIHZhciBpbm5lclJlZiA9IGlubmVyUHJvcHMuaW5uZXJSZWYsXG4gICAgICByZXN0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoaW5uZXJQcm9wcywgWydpbm5lclJlZiddKTtcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ29wdGlvbicsIHByb3BzKSksIHtcbiAgICAgICAgJ29wdGlvbic6IHRydWUsXG4gICAgICAgICdvcHRpb24tLWlzLWRpc2FibGVkJzogaXNEaXNhYmxlZCxcbiAgICAgICAgJ29wdGlvbi0taXMtZm9jdXNlZCc6IGlzRm9jdXNlZCxcbiAgICAgICAgJ29wdGlvbi0taXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkXG4gICAgICB9LCBjbGFzc05hbWUpXG4gICAgfSwgcmVzdCksXG4gICAgY2hpbGRyZW5cbiAgKTtcbn07XG5cbnZhciBjc3MkNCA9IGZ1bmN0aW9uIGNzcyQkMSgpIHtcbiAgcmV0dXJuIHtcbiAgICBjb2xvcjogY29sb3JzLm5ldXRyYWw1MCxcbiAgICBtYXJnaW5MZWZ0OiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICBtYXJnaW5SaWdodDogc3BhY2luZy5iYXNlVW5pdCAvIDIsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnNTAlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuICB9O1xufTtcblxudmFyIFBsYWNlaG9sZGVyID0gZnVuY3Rpb24gUGxhY2Vob2xkZXIocHJvcHMpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgaW5uZXJQcm9wcyA9IHByb3BzLmlubmVyUHJvcHM7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgX2V4dGVuZHMoe1xuICAgICAgY2xhc3NOYW1lOiBjeCggLyojX19QVVJFX18qL2NzcyhnZXRTdHlsZXMoJ3BsYWNlaG9sZGVyJywgcHJvcHMpKSwge1xuICAgICAgICAncGxhY2Vob2xkZXInOiB0cnVlXG4gICAgICB9LCBjbGFzc05hbWUpXG4gICAgfSwgaW5uZXJQcm9wcyksXG4gICAgY2hpbGRyZW5cbiAgKTtcbn07XG5cbnZhciBjc3MkNSA9IGZ1bmN0aW9uIGNzcyQkMShfcmVmKSB7XG4gIHZhciBpc0Rpc2FibGVkID0gX3JlZi5pc0Rpc2FibGVkO1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWw0MCA6IGNvbG9ycy50ZXh0LFxuICAgIG1hcmdpbkxlZnQ6IHNwYWNpbmcuYmFzZVVuaXQgLyAyLFxuICAgIG1hcmdpblJpZ2h0OiBzcGFjaW5nLmJhc2VVbml0IC8gMixcbiAgICBtYXhXaWR0aDogJ2NhbGMoMTAwJSAtICcgKyBzcGFjaW5nLmJhc2VVbml0ICogMiArICdweCknLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgdG9wOiAnNTAlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuICB9O1xufTtcblxudmFyIFNpbmdsZVZhbHVlID0gZnVuY3Rpb24gU2luZ2xlVmFsdWUocHJvcHMpIHtcbiAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjeCA9IHByb3BzLmN4LFxuICAgICAgZ2V0U3R5bGVzID0gcHJvcHMuZ2V0U3R5bGVzLFxuICAgICAgaXNEaXNhYmxlZCA9IHByb3BzLmlzRGlzYWJsZWQsXG4gICAgICBpbm5lclByb3BzID0gcHJvcHMuaW5uZXJQcm9wcztcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGN4KCAvKiNfX1BVUkVfXyovY3NzKGdldFN0eWxlcygnc2luZ2xlVmFsdWUnLCBwcm9wcykpLCB7XG4gICAgICAgICdzaW5nbGUtdmFsdWUnOiB0cnVlLFxuICAgICAgICAnc2luZ2xlLXZhbHVlLS1pcy1kaXNhYmxlZCc6IGlzRGlzYWJsZWRcbiAgICAgIH0sIGNsYXNzTmFtZSlcbiAgICB9LCBpbm5lclByb3BzKSxcbiAgICBjaGlsZHJlblxuICApO1xufTtcblxudmFyIGNvbXBvbmVudHMgPSB7XG4gIENsZWFySW5kaWNhdG9yOiBDbGVhckluZGljYXRvcixcbiAgQ29udHJvbDogQ29udHJvbCxcbiAgRHJvcGRvd25JbmRpY2F0b3I6IERyb3Bkb3duSW5kaWNhdG9yLFxuICBEb3duQ2hldnJvbjogRG93bkNoZXZyb24sXG4gIENyb3NzSWNvbjogQ3Jvc3NJY29uLFxuICBHcm91cDogR3JvdXAsXG4gIEdyb3VwSGVhZGluZzogR3JvdXBIZWFkaW5nLFxuICBJbmRpY2F0b3JzQ29udGFpbmVyOiBJbmRpY2F0b3JzQ29udGFpbmVyLFxuICBJbmRpY2F0b3JTZXBhcmF0b3I6IEluZGljYXRvclNlcGFyYXRvcixcbiAgSW5wdXQ6IElucHV0JDEsXG4gIExvYWRpbmdJbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3IsXG4gIE1lbnU6IE1lbnUsXG4gIE1lbnVMaXN0OiBNZW51TGlzdCxcbiAgTWVudVBvcnRhbDogTWVudVBvcnRhbCxcbiAgTG9hZGluZ01lc3NhZ2U6IExvYWRpbmdNZXNzYWdlLFxuICBOb09wdGlvbnNNZXNzYWdlOiBOb09wdGlvbnNNZXNzYWdlLFxuICBNdWx0aVZhbHVlOiBNdWx0aVZhbHVlLFxuICBNdWx0aVZhbHVlQ29udGFpbmVyOiBNdWx0aVZhbHVlQ29udGFpbmVyLFxuICBNdWx0aVZhbHVlTGFiZWw6IE11bHRpVmFsdWVMYWJlbCxcbiAgTXVsdGlWYWx1ZVJlbW92ZTogTXVsdGlWYWx1ZVJlbW92ZSxcbiAgT3B0aW9uOiBPcHRpb24sXG4gIFBsYWNlaG9sZGVyOiBQbGFjZWhvbGRlcixcbiAgU2VsZWN0Q29udGFpbmVyOiBTZWxlY3RDb250YWluZXIsXG4gIFNpbmdsZVZhbHVlOiBTaW5nbGVWYWx1ZSxcbiAgVmFsdWVDb250YWluZXI6IFZhbHVlQ29udGFpbmVyXG59O1xuXG52YXIgZGVmYXVsdENvbXBvbmVudHMgPSBmdW5jdGlvbiBkZWZhdWx0Q29tcG9uZW50cyhwcm9wcykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIGNvbXBvbmVudHMsIHByb3BzLmNvbXBvbmVudHMpO1xufTtcblxudmFyIGRlZmF1bHRTdHlsZXMgPSB7XG4gIGNsZWFySW5kaWNhdG9yOiBjbGVhckluZGljYXRvckNTUyxcbiAgY29udGFpbmVyOiBjb250YWluZXJDU1MsXG4gIGNvbnRyb2w6IGNzcyQxLFxuICBkcm9wZG93bkluZGljYXRvcjogZHJvcGRvd25JbmRpY2F0b3JDU1MsXG4gIGdyb3VwOiBncm91cENTUyxcbiAgZ3JvdXBIZWFkaW5nOiBncm91cEhlYWRpbmdDU1MsXG4gIGluZGljYXRvcnNDb250YWluZXI6IGluZGljYXRvcnNDb250YWluZXJDU1MsXG4gIGluZGljYXRvclNlcGFyYXRvcjogaW5kaWNhdG9yU2VwYXJhdG9yQ1NTLFxuICBpbnB1dDogY3NzJDIsXG4gIGxvYWRpbmdJbmRpY2F0b3I6IGxvYWRpbmdJbmRpY2F0b3JDU1MsXG4gIGxvYWRpbmdNZXNzYWdlOiBsb2FkaW5nTWVzc2FnZUNTUyxcbiAgbWVudTogbWVudUNTUyxcbiAgbWVudUxpc3Q6IG1lbnVMaXN0Q1NTLFxuICBtZW51UG9ydGFsOiBtZW51UG9ydGFsQ1NTLFxuICBtdWx0aVZhbHVlOiBtdWx0aVZhbHVlQ1NTLFxuICBtdWx0aVZhbHVlTGFiZWw6IG11bHRpVmFsdWVMYWJlbENTUyxcbiAgbXVsdGlWYWx1ZVJlbW92ZTogbXVsdGlWYWx1ZVJlbW92ZUNTUyxcbiAgbm9PcHRpb25zTWVzc2FnZTogbm9PcHRpb25zTWVzc2FnZUNTUyxcbiAgb3B0aW9uOiBjc3MkMyxcbiAgcGxhY2Vob2xkZXI6IGNzcyQ0LFxuICBzaW5nbGVWYWx1ZTogY3NzJDUsXG4gIHZhbHVlQ29udGFpbmVyOiB2YWx1ZUNvbnRhaW5lckNTU1xufTtcblxuLy8gTWVyZ2UgVXRpbGl0eVxuLy8gQWxsb3dzIGNvbnN1bWVycyB0byBleHRlbmQgYSBiYXNlIFNlbGVjdCB3aXRoIGFkZGl0aW9uYWwgc3R5bGVzXG5cbmZ1bmN0aW9uIG1lcmdlU3R5bGVzKHNvdXJjZSkge1xuICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAvLyBpbml0aWFsaXplIHdpdGggc291cmNlIHN0eWxlc1xuICB2YXIgc3R5bGVzID0gX2V4dGVuZHMoe30sIHNvdXJjZSk7XG5cbiAgLy8gbWFzc2FnZSBpbiB0YXJnZXQgc3R5bGVzXG4gIE9iamVjdC5rZXlzKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKHNvdXJjZVtrZXldKSB7XG4gICAgICBzdHlsZXNba2V5XSA9IGZ1bmN0aW9uIChyc0NzcywgcHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldFtrZXldKHNvdXJjZVtrZXldKHJzQ3NzLCBwcm9wcyksIHByb3BzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc1trZXldID0gdGFyZ2V0W2tleV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBiYWNrc3BhY2VSZW1vdmVzVmFsdWU6IHRydWUsXG4gIGJsdXJJbnB1dE9uU2VsZWN0OiBpc1RvdWNoQ2FwYWJsZSgpLFxuICBjYXB0dXJlTWVudVNjcm9sbDogIWlzVG91Y2hDYXBhYmxlKCksXG4gIGNsb3NlTWVudU9uU2VsZWN0OiB0cnVlLFxuICBjb21wb25lbnRzOiB7fSxcbiAgY29udHJvbFNob3VsZFJlbmRlclZhbHVlOiB0cnVlLFxuICBlc2NhcGVDbGVhcnNWYWx1ZTogZmFsc2UsXG4gIGZpbHRlck9wdGlvbjogY3JlYXRlRmlsdGVyKCksXG4gIGZvcm1hdEdyb3VwTGFiZWw6IGZvcm1hdEdyb3VwTGFiZWwsXG4gIGdldE9wdGlvbkxhYmVsOiBnZXRPcHRpb25MYWJlbCxcbiAgZ2V0T3B0aW9uVmFsdWU6IGdldE9wdGlvblZhbHVlLFxuICBoaWRlU2VsZWN0ZWRPcHRpb25zOiB0cnVlLFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgaXNNdWx0aTogZmFsc2UsXG4gIGlzUnRsOiBmYWxzZSxcbiAgaXNTZWFyY2hhYmxlOiB0cnVlLFxuICBpc09wdGlvbkRpc2FibGVkOiBpc09wdGlvbkRpc2FibGVkLFxuICBsb2FkaW5nTWVzc2FnZTogZnVuY3Rpb24gbG9hZGluZ01lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICdMb2FkaW5nLi4uJztcbiAgfSxcbiAgbWF4TWVudUhlaWdodDogMzAwLFxuICBtaW5NZW51SGVpZ2h0OiAxNDAsXG4gIG1lbnVJc09wZW46IGZhbHNlLFxuICBtZW51UGxhY2VtZW50OiAnYm90dG9tJyxcbiAgbWVudVBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICBtZW51U2hvdWxkQmxvY2tTY3JvbGw6IGZhbHNlLFxuICBtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXc6ICFpc01vYmlsZURldmljZSgpLFxuICBub09wdGlvbnNNZXNzYWdlOiBmdW5jdGlvbiBub09wdGlvbnNNZXNzYWdlKCkge1xuICAgIHJldHVybiAnTm8gb3B0aW9ucyc7XG4gIH0sXG4gIG9wZW5NZW51T25Gb2N1czogZmFsc2UsXG4gIG9wZW5NZW51T25DbGljazogdHJ1ZSxcbiAgb3B0aW9uczogW10sXG4gIHBhZ2VTaXplOiA1LFxuICBwbGFjZWhvbGRlcjogJ1NlbGVjdC4uLicsXG4gIHNjcmVlblJlYWRlclN0YXR1czogZnVuY3Rpb24gc2NyZWVuUmVhZGVyU3RhdHVzKF9yZWYpIHtcbiAgICB2YXIgY291bnQgPSBfcmVmLmNvdW50O1xuICAgIHJldHVybiBjb3VudCArICcgcmVzdWx0JyArIChjb3VudCAhPT0gMSA/ICdzJyA6ICcnKSArICcgYXZhaWxhYmxlLic7XG4gIH0sXG4gIHN0eWxlczoge30sXG4gIHRhYkluZGV4OiAnMCcsXG4gIHRhYlNlbGVjdHNWYWx1ZTogdHJ1ZVxufTtcblxudmFyIGluc3RhbmNlSWQgPSAxO1xuXG52YXIgU2VsZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoU2VsZWN0LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTZWxlY3QocHJvcHMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTZWxlY3QpO1xuXG4gICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2VsZWN0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgX2luaXRpYWxpc2VQcm9wcy5jYWxsKF90aGlzKTtcblxuICAgIHZhciB2YWx1ZSA9IHByb3BzLnZhbHVlO1xuXG4gICAgX3RoaXMuY29tcG9uZW50cyA9IGRlZmF1bHRDb21wb25lbnRzKHByb3BzKTtcbiAgICBfdGhpcy5pbnN0YW5jZVByZWZpeCA9ICdyZWFjdC1zZWxlY3QtJyArIChfdGhpcy5wcm9wcy5pbnN0YW5jZUlkIHx8ICsraW5zdGFuY2VJZCk7XG5cbiAgICB2YXIgc2VsZWN0VmFsdWUgPSBjbGVhblZhbHVlKHZhbHVlKTtcbiAgICB2YXIgbWVudU9wdGlvbnMgPSBfdGhpcy5idWlsZE1lbnVPcHRpb25zKHByb3BzLCBzZWxlY3RWYWx1ZSk7XG5cbiAgICBfdGhpcy5zdGF0ZS5tZW51T3B0aW9ucyA9IG1lbnVPcHRpb25zO1xuICAgIF90aGlzLnN0YXRlLnNlbGVjdFZhbHVlID0gc2VsZWN0VmFsdWU7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9IC8vIFRPRE9cblxuXG4gIGNyZWF0ZUNsYXNzKFNlbGVjdCwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5zdGFydExpc3RlbmluZ1RvVG91Y2goKTtcblxuICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29tcG9uZW50cyQkMSA9IF9wcm9wcy5jb21wb25lbnRzLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcHJvcHMub3B0aW9ucyxcbiAgICAgICAgICB2YWx1ZSA9IF9wcm9wcy52YWx1ZSxcbiAgICAgICAgICBpbnB1dFZhbHVlID0gX3Byb3BzLmlucHV0VmFsdWU7XG4gICAgICAvLyByZS1jYWNoZSBjdXN0b20gY29tcG9uZW50c1xuXG4gICAgICBpZiAobmV4dFByb3BzLmNvbXBvbmVudHMgIT09IGNvbXBvbmVudHMkJDEpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gZGVmYXVsdENvbXBvbmVudHMobmV4dFByb3BzKTtcbiAgICAgIH1cbiAgICAgIC8vIHJlYnVpbGQgdGhlIG1lbnUgb3B0aW9uc1xuICAgICAgaWYgKG5leHRQcm9wcy52YWx1ZSAhPT0gdmFsdWUgfHwgbmV4dFByb3BzLm9wdGlvbnMgIT09IG9wdGlvbnMgfHwgbmV4dFByb3BzLmlucHV0VmFsdWUgIT09IGlucHV0VmFsdWUpIHtcbiAgICAgICAgdmFyIF9zZWxlY3RWYWx1ZSA9IGNsZWFuVmFsdWUobmV4dFByb3BzLnZhbHVlKTtcbiAgICAgICAgdmFyIF9tZW51T3B0aW9ucyA9IHRoaXMuYnVpbGRNZW51T3B0aW9ucyhuZXh0UHJvcHMsIF9zZWxlY3RWYWx1ZSk7XG4gICAgICAgIHZhciBfZm9jdXNlZFZhbHVlID0gdGhpcy5nZXROZXh0Rm9jdXNlZFZhbHVlKF9zZWxlY3RWYWx1ZSk7XG4gICAgICAgIHZhciBfZm9jdXNlZE9wdGlvbiA9IHRoaXMuZ2V0TmV4dEZvY3VzZWRPcHRpb24oX21lbnVPcHRpb25zLmZvY3VzYWJsZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZW51T3B0aW9uczogX21lbnVPcHRpb25zLCBzZWxlY3RWYWx1ZTogX3NlbGVjdFZhbHVlLCBmb2N1c2VkT3B0aW9uOiBfZm9jdXNlZE9wdGlvbiwgZm9jdXNlZFZhbHVlOiBfZm9jdXNlZFZhbHVlIH0pO1xuICAgICAgfVxuICAgICAgLy8gc29tZSB1cGRhdGVzIHNob3VsZCB0b2dnbGUgdGhlIHN0YXRlIG9mIHRoZSBpbnB1dCB2aXNpYmlsaXR5XG4gICAgICBpZiAodGhpcy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBpbnB1dElzSGlkZGVuOiB0aGlzLmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZVxuICAgICAgICB9KTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaW5wdXRJc0hpZGRlbkFmdGVyVXBkYXRlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzMi5pc0Rpc2FibGVkLFxuICAgICAgICAgIG1lbnVJc09wZW4gPSBfcHJvcHMyLm1lbnVJc09wZW47XG4gICAgICB2YXIgaXNGb2N1c2VkID0gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQ7XG5cblxuICAgICAgaWYgKFxuICAgICAgLy8gZW5zdXJlIGZvY3VzIGlzIHJlc3RvcmVkIGNvcnJlY3RseSB3aGVuIHRoZSBjb250cm9sIGJlY29tZXMgZW5hYmxlZFxuICAgICAgaXNGb2N1c2VkICYmICFpc0Rpc2FibGVkICYmIHByZXZQcm9wcy5pc0Rpc2FibGVkIHx8XG4gICAgICAvLyBlbnN1cmUgZm9jdXMgaXMgb24gdGhlIElucHV0IHdoZW4gdGhlIG1lbnUgb3BlbnNcbiAgICAgIGlzRm9jdXNlZCAmJiBtZW51SXNPcGVuICYmICFwcmV2UHJvcHMubWVudUlzT3Blbikge1xuICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2Nyb2xsIHRoZSBmb2N1c2VkIG9wdGlvbiBpbnRvIHZpZXcgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAodGhpcy5tZW51UmVmICYmIHRoaXMuZm9jdXNlZE9wdGlvblJlZiAmJiB0aGlzLnNjcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlKSB7XG4gICAgICAgIHNjcm9sbEludG9WaWV3KHRoaXMubWVudVJlZiwgdGhpcy5mb2N1c2VkT3B0aW9uUmVmKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nVG9Ub3VjaCgpO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEVsZW1lbnQgUmVmc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIH0sIHtcbiAgICBrZXk6ICdvbk1lbnVPcGVuJyxcblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gQ29uc3VtZXIgSGFuZGxlcnNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lbnVPcGVuKCkge1xuICAgICAgdGhpcy5wcm9wcy5vbk1lbnVPcGVuKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25NZW51Q2xvc2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lbnVDbG9zZSgpIHtcbiAgICAgIHRoaXMub25JbnB1dENoYW5nZSgnJywgeyBhY3Rpb246ICdtZW51LWNsb3NlJyB9KTtcbiAgICAgIHRoaXMucHJvcHMub25NZW51Q2xvc2UoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbklucHV0Q2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25JbnB1dENoYW5nZShuZXdWYWx1ZSwgYWN0aW9uTWV0YSkge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKG5ld1ZhbHVlLCBhY3Rpb25NZXRhKTtcbiAgICB9XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNZXRob2RzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgfSwge1xuICAgIGtleTogJ2ZvY3VzSW5wdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb2N1c0lucHV0KCkge1xuICAgICAgaWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG4gICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYmx1cklucHV0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmx1cklucHV0KCkge1xuICAgICAgaWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG4gICAgICB0aGlzLmlucHV0LmJsdXIoKTtcbiAgICB9XG5cbiAgICAvLyBhbGlhc2VkIGZvciBjb25zdW1lcnNcblxuICB9LCB7XG4gICAga2V5OiAnb3Blbk1lbnUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTWVudShmb2N1c09wdGlvbikge1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgbWVudU9wdGlvbnMgPSBfc3RhdGUubWVudU9wdGlvbnMsXG4gICAgICAgICAgc2VsZWN0VmFsdWUgPSBfc3RhdGUuc2VsZWN0VmFsdWU7XG4gICAgICB2YXIgaXNNdWx0aSA9IHRoaXMucHJvcHMuaXNNdWx0aTtcblxuXG4gICAgICB2YXIgb3BlbkF0SW5kZXggPSBmb2N1c09wdGlvbiA9PT0gJ2ZpcnN0JyA/IDAgOiBtZW51T3B0aW9ucy5mb2N1c2FibGUubGVuZ3RoIC0gMTtcblxuICAgICAgaWYgKCFpc011bHRpKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gbWVudU9wdGlvbnMuZm9jdXNhYmxlLmluZGV4T2Yoc2VsZWN0VmFsdWVbMF0pO1xuICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgb3BlbkF0SW5kZXggPSBzZWxlY3RlZEluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xuICAgICAgdGhpcy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMub25NZW51T3BlbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGZvY3VzZWRWYWx1ZTogbnVsbCxcbiAgICAgICAgZm9jdXNlZE9wdGlvbjogbWVudU9wdGlvbnMuZm9jdXNhYmxlW29wZW5BdEluZGV4XVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9jdXNWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvY3VzVmFsdWUoZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgaXNNdWx0aSA9IHRoaXMucHJvcHMuaXNNdWx0aTtcbiAgICAgIHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBzZWxlY3RWYWx1ZSA9IF9zdGF0ZTIuc2VsZWN0VmFsdWUsXG4gICAgICAgICAgZm9jdXNlZFZhbHVlID0gX3N0YXRlMi5mb2N1c2VkVmFsdWU7XG5cbiAgICAgIC8vIE9ubHkgbXVsdGlzZWxlY3RzIHN1cHBvcnQgdmFsdWUgZm9jdXNpbmdcblxuICAgICAgaWYgKCFpc011bHRpKSByZXR1cm47XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBmb2N1c2VkT3B0aW9uOiBudWxsXG4gICAgICB9KTtcblxuICAgICAgdmFyIGZvY3VzZWRJbmRleCA9IGZvY3VzZWRWYWx1ZSA/IHNlbGVjdFZhbHVlLmluZGV4T2YoZm9jdXNlZFZhbHVlKSA6IC0xO1xuICAgICAgdmFyIGxhc3RJbmRleCA9IHNlbGVjdFZhbHVlLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgbmV4dEZvY3VzID0gLTE7XG4gICAgICBpZiAoIXNlbGVjdFZhbHVlLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlICdwcmV2aW91cyc6XG4gICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gZG9uJ3QgY3ljbGUgZnJvbSB0aGUgc3RhcnQgdG8gdGhlIGVuZFxuICAgICAgICAgICAgbmV4dEZvY3VzID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvY3VzZWRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vdGhpbmcgaXMgZm9jdXNlZCwgZm9jdXMgdGhlIGxhc3QgdmFsdWUgZmlyc3RcbiAgICAgICAgICAgIG5leHRGb2N1cyA9IGxhc3RJbmRleDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dEZvY3VzID0gZm9jdXNlZEluZGV4IC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPiAtMSAmJiBmb2N1c2VkSW5kZXggPCBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgIG5leHRGb2N1cyA9IGZvY3VzZWRJbmRleCArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaW5wdXRJc0hpZGRlbjogbmV4dEZvY3VzID09PSAtMSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgZm9jdXNlZFZhbHVlOiBzZWxlY3RWYWx1ZVtuZXh0Rm9jdXNdXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmb2N1c09wdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvY3VzT3B0aW9uKCkge1xuICAgICAgdmFyIGRpcmVjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2ZpcnN0JztcbiAgICAgIHZhciBwYWdlU2l6ZSA9IHRoaXMucHJvcHMucGFnZVNpemU7XG4gICAgICB2YXIgX3N0YXRlMyA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgZm9jdXNlZE9wdGlvbiA9IF9zdGF0ZTMuZm9jdXNlZE9wdGlvbixcbiAgICAgICAgICBtZW51T3B0aW9ucyA9IF9zdGF0ZTMubWVudU9wdGlvbnM7XG5cbiAgICAgIHZhciBvcHRpb25zID0gbWVudU9wdGlvbnMuZm9jdXNhYmxlO1xuXG4gICAgICBpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm47XG4gICAgICB2YXIgbmV4dEZvY3VzID0gMDsgLy8gaGFuZGxlcyAnZmlyc3QnXG4gICAgICB2YXIgZm9jdXNlZEluZGV4ID0gZm9jdXNlZE9wdGlvbiA/IG9wdGlvbnMuaW5kZXhPZihmb2N1c2VkT3B0aW9uKSA6IC0xO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICBuZXh0Rm9jdXMgPSBmb2N1c2VkSW5kZXggPiAwID8gZm9jdXNlZEluZGV4IC0gMSA6IG9wdGlvbnMubGVuZ3RoIC0gMTtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcbiAgICAgICAgbmV4dEZvY3VzID0gKGZvY3VzZWRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGg7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3BhZ2V1cCcpIHtcbiAgICAgICAgbmV4dEZvY3VzID0gZm9jdXNlZEluZGV4IC0gcGFnZVNpemU7XG4gICAgICAgIGlmIChuZXh0Rm9jdXMgPCAwKSBuZXh0Rm9jdXMgPSAwO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdwYWdlZG93bicpIHtcbiAgICAgICAgbmV4dEZvY3VzID0gZm9jdXNlZEluZGV4ICsgcGFnZVNpemU7XG4gICAgICAgIGlmIChuZXh0Rm9jdXMgPiBvcHRpb25zLmxlbmd0aCAtIDEpIG5leHRGb2N1cyA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGFzdCcpIHtcbiAgICAgICAgbmV4dEZvY3VzID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZm9jdXNlZE9wdGlvbjogb3B0aW9uc1tuZXh0Rm9jdXNdLFxuICAgICAgICBmb2N1c2VkVmFsdWU6IG51bGxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldENvbW1vblByb3BzJyxcblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gR2V0dGVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbW1vblByb3BzKCkge1xuICAgICAgdmFyIGNsZWFyVmFsdWUgPSB0aGlzLmNsZWFyVmFsdWUsXG4gICAgICAgICAgZ2V0U3R5bGVzID0gdGhpcy5nZXRTdHlsZXMsXG4gICAgICAgICAgc2V0VmFsdWUgPSB0aGlzLnNldFZhbHVlLFxuICAgICAgICAgIHNlbGVjdE9wdGlvbiA9IHRoaXMuc2VsZWN0T3B0aW9uLFxuICAgICAgICAgIHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgY2xhc3NOYW1lUHJlZml4ID0gcHJvcHMuY2xhc3NOYW1lUHJlZml4LFxuICAgICAgICAgIGlzTXVsdGkgPSBwcm9wcy5pc011bHRpLFxuICAgICAgICAgIGlzUnRsID0gcHJvcHMuaXNSdGwsXG4gICAgICAgICAgb3B0aW9ucyA9IHByb3BzLm9wdGlvbnM7XG4gICAgICB2YXIgc2VsZWN0VmFsdWUgPSB0aGlzLnN0YXRlLnNlbGVjdFZhbHVlO1xuXG4gICAgICB2YXIgaGFzVmFsdWUgPSB0aGlzLmhhc1ZhbHVlKCk7XG4gICAgICB2YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdFZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhciBjeFByZWZpeCA9IGNsYXNzTmFtZVByZWZpeDtcbiAgICAgIGlmIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lUHJlZml4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdcXG4gICAgICAgIFdhcm5pbmc6IHRoZSBiZWhhdmlvdXIgb2YgXFwnY2xhc3NOYW1lXFwnIGhhcyBjaGFuZ2VkIGJldHdlZW4gMi4wLjAtYmV0YS4yIGFuZCAyLjAuMC1iZXRhLjMuXFxuICAgICAgICBZb3UgY2FuIG5vdyB1c2UgY2xhc3NOYW1lIHRvIHNwZWNpZnkgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIG91dGVyIGNvbnRhaW5lciwgYW5kIGNsYXNzTmFtZVByZWZpeCB0byBlbmFibGUgb3VyIHByb3ZpZGVkIEJFTSBjbGFzcyBuYW1lcyBmb3IgaW50ZXJuYWwgZWxlbWVudHMuXFxuICAgICAgICBUaGUgY2xhc3NOYW1lIHByb3Agd2lsbCBoYXZlIG5vIGVmZmVjdCBvbiBpbnRlcm5hbCBlbGVtZW50cyB3aGVuIDIuMC4wIGlzIHJlbGVhc2VkLlxcbiAgICAgICcpO1xuICAgICAgICBjeFByZWZpeCA9IGNsYXNzTmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN4ID0gY2xhc3NOYW1lcy5iaW5kKG51bGwsIGN4UHJlZml4KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN4OiBjeCxcbiAgICAgICAgY2xlYXJWYWx1ZTogY2xlYXJWYWx1ZSxcbiAgICAgICAgZ2V0U3R5bGVzOiBnZXRTdHlsZXMsXG4gICAgICAgIGdldFZhbHVlOiBnZXRWYWx1ZSxcbiAgICAgICAgaGFzVmFsdWU6IGhhc1ZhbHVlLFxuICAgICAgICBpc011bHRpOiBpc011bHRpLFxuICAgICAgICBpc1J0bDogaXNSdGwsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIHNlbGVjdE9wdGlvbjogc2VsZWN0T3B0aW9uLFxuICAgICAgICBzZXRWYWx1ZTogc2V0VmFsdWUsXG4gICAgICAgIHNlbGVjdFByb3BzOiBwcm9wc1xuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXROZXh0Rm9jdXNlZFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TmV4dEZvY3VzZWRWYWx1ZShuZXh0U2VsZWN0VmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmNsZWFyRm9jdXNWYWx1ZU9uVXBkYXRlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJGb2N1c1ZhbHVlT25VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgX3N0YXRlNCA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgZm9jdXNlZFZhbHVlID0gX3N0YXRlNC5mb2N1c2VkVmFsdWUsXG4gICAgICAgICAgbGFzdFNlbGVjdFZhbHVlID0gX3N0YXRlNC5zZWxlY3RWYWx1ZTtcblxuICAgICAgdmFyIGxhc3RGb2N1c2VkSW5kZXggPSBsYXN0U2VsZWN0VmFsdWUuaW5kZXhPZihmb2N1c2VkVmFsdWUpO1xuICAgICAgaWYgKGxhc3RGb2N1c2VkSW5kZXggPiAtMSkge1xuICAgICAgICB2YXIgbmV4dEZvY3VzZWRJbmRleCA9IG5leHRTZWxlY3RWYWx1ZS5pbmRleE9mKGZvY3VzZWRWYWx1ZSk7XG4gICAgICAgIGlmIChuZXh0Rm9jdXNlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAvLyB0aGUgZm9jdXNlZCB2YWx1ZSBpcyBzdGlsbCBpbiB0aGUgc2VsZWN0VmFsdWUsIHJldHVybiBpdFxuICAgICAgICAgIHJldHVybiBmb2N1c2VkVmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdEZvY3VzZWRJbmRleCA8IG5leHRTZWxlY3RWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAvLyB0aGUgZm9jdXNlZFZhbHVlIGlzIG5vdCBwcmVzZW50IGluIHRoZSBuZXh0IHNlbGVjdFZhbHVlIGFycmF5IGJ5XG4gICAgICAgICAgLy8gcmVmZXJlbmNlLCBzbyByZXR1cm4gdGhlIG5ldyB2YWx1ZSBhdCB0aGUgc2FtZSBpbmRleFxuICAgICAgICAgIHJldHVybiBuZXh0U2VsZWN0VmFsdWVbbGFzdEZvY3VzZWRJbmRleF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldE5leHRGb2N1c2VkT3B0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TmV4dEZvY3VzZWRPcHRpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGxhc3RGb2N1c2VkT3B0aW9uID0gdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uO1xuXG4gICAgICByZXR1cm4gbGFzdEZvY3VzZWRPcHRpb24gJiYgb3B0aW9ucy5pbmRleE9mKGxhc3RGb2N1c2VkT3B0aW9uKSA+IC0xID8gbGFzdEZvY3VzZWRPcHRpb24gOiBvcHRpb25zWzBdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldE9wdGlvbkxhYmVsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0T3B0aW9uTGFiZWwkJDEoZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZ2V0T3B0aW9uTGFiZWwoZGF0YSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0T3B0aW9uVmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRPcHRpb25WYWx1ZSQkMShkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5nZXRPcHRpb25WYWx1ZShkYXRhKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYXNWYWx1ZScsXG5cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEhlbHBlcnNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNWYWx1ZSgpIHtcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IHRoaXMuc3RhdGUuc2VsZWN0VmFsdWU7XG5cbiAgICAgIHJldHVybiBzZWxlY3RWYWx1ZS5sZW5ndGggPiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hhc09wdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNPcHRpb25zKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy5zdGF0ZS5tZW51T3B0aW9ucy5yZW5kZXIubGVuZ3RoO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvdW50T3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvdW50T3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLm1lbnVPcHRpb25zLmZvY3VzYWJsZS5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaXNDbGVhcmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0NsZWFyYWJsZSgpIHtcbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpc0NsZWFyYWJsZSA9IF9wcm9wczMuaXNDbGVhcmFibGUsXG4gICAgICAgICAgaXNNdWx0aSA9IF9wcm9wczMuaXNNdWx0aTtcblxuICAgICAgLy8gc2luZ2xlIHNlbGVjdCwgYnkgZGVmYXVsdCwgSVMgTk9UIGNsZWFyYWJsZVxuICAgICAgLy8gbXVsdGkgc2VsZWN0LCBieSBkZWZhdWx0LCBJUyBjbGVhcmFibGVcblxuICAgICAgaWYgKGlzQ2xlYXJhYmxlID09PSB1bmRlZmluZWQpIHJldHVybiBpc011bHRpO1xuXG4gICAgICByZXR1cm4gaXNDbGVhcmFibGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaXNPcHRpb25EaXNhYmxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzT3B0aW9uRGlzYWJsZWQkJDEob3B0aW9uKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMucHJvcHMuaXNPcHRpb25EaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMucHJvcHMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIDogZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaXNPcHRpb25TZWxlY3RlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBzZWxlY3RWYWx1ZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmIChzZWxlY3RWYWx1ZS5pbmRleE9mKG9wdGlvbikgPiAtMSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaXNPcHRpb25TZWxlY3RlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pc09wdGlvblNlbGVjdGVkKG9wdGlvbiwgc2VsZWN0VmFsdWUpO1xuICAgICAgfVxuICAgICAgdmFyIGNhbmRpZGF0ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcbiAgICAgIHJldHVybiBzZWxlY3RWYWx1ZS5zb21lKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuZ2V0T3B0aW9uVmFsdWUoaSkgPT09IGNhbmRpZGF0ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZpbHRlck9wdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpbHRlck9wdGlvbihvcHRpb24sIGlucHV0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbiA/IHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uKG9wdGlvbiwgaW5wdXRWYWx1ZSkgOiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Zvcm1hdE9wdGlvbkxhYmVsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9ybWF0T3B0aW9uTGFiZWwoZGF0YSwgY29udGV4dCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmZvcm1hdE9wdGlvbkxhYmVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBfaW5wdXRWYWx1ZSA9IHRoaXMucHJvcHMuaW5wdXRWYWx1ZTtcbiAgICAgICAgdmFyIF9zZWxlY3RWYWx1ZTIgPSB0aGlzLnN0YXRlLnNlbGVjdFZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmZvcm1hdE9wdGlvbkxhYmVsKGRhdGEsIHtcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIGlucHV0VmFsdWU6IF9pbnB1dFZhbHVlLFxuICAgICAgICAgIHNlbGVjdFZhbHVlOiBfc2VsZWN0VmFsdWUyXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uTGFiZWwoZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9ybWF0R3JvdXBMYWJlbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvcm1hdEdyb3VwTGFiZWwkJDEoZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9ybWF0R3JvdXBMYWJlbChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNb3VzZSBIYW5kbGVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIH0sIHtcbiAgICBrZXk6ICdzdGFydExpc3RlbmluZ1RvVG91Y2gnLFxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBUb3VjaCBIYW5kbGVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0TGlzdGVuaW5nVG9Ub3VjaCgpIHtcbiAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc3RvcExpc3RlbmluZ1RvVG91Y2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG9Ub3VjaCgpIHtcbiAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gRm9jdXMgSGFuZGxlcnNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEtleWJvYXJkIEhhbmRsZXJzXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgfSwge1xuICAgIGtleTogJ2J1aWxkTWVudU9wdGlvbnMnLFxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBNZW51IE9wdGlvbnNcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZE1lbnVPcHRpb25zKHByb3BzLCBzZWxlY3RWYWx1ZSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBoaWRlU2VsZWN0ZWRPcHRpb25zID0gcHJvcHMuaGlkZVNlbGVjdGVkT3B0aW9ucyxcbiAgICAgICAgICBpc011bHRpID0gcHJvcHMuaXNNdWx0aSxcbiAgICAgICAgICBfcHJvcHMkaW5wdXRWYWx1ZSA9IHByb3BzLmlucHV0VmFsdWUsXG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IF9wcm9wcyRpbnB1dFZhbHVlID09PSB1bmRlZmluZWQgPyAnJyA6IF9wcm9wcyRpbnB1dFZhbHVlLFxuICAgICAgICAgIG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zO1xuXG5cbiAgICAgIHZhciB0b09wdGlvbiA9IGZ1bmN0aW9uIHRvT3B0aW9uKG9wdGlvbiwgaWQpIHtcbiAgICAgICAgdmFyIGlzRGlzYWJsZWQgPSBfdGhpczMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pO1xuICAgICAgICB2YXIgaXNTZWxlY3RlZCA9IF90aGlzMy5pc09wdGlvblNlbGVjdGVkKG9wdGlvbiwgc2VsZWN0VmFsdWUpO1xuICAgICAgICB2YXIgbGFiZWwgPSBfdGhpczMuZ2V0T3B0aW9uTGFiZWwob3B0aW9uKTtcbiAgICAgICAgdmFyIHZhbHVlID0gX3RoaXMzLmdldE9wdGlvblZhbHVlKG9wdGlvbik7XG5cbiAgICAgICAgaWYgKGlzTXVsdGkgJiYgaGlkZVNlbGVjdGVkT3B0aW9ucyAmJiBpc1NlbGVjdGVkIHx8ICFfdGhpczMuZmlsdGVyT3B0aW9uKHsgbGFiZWw6IGxhYmVsLCB2YWx1ZTogdmFsdWUsIGRhdGE6IG9wdGlvbiB9LCBpbnB1dFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvbkhvdmVyID0gaXNEaXNhYmxlZCA/IHVuZGVmaW5lZCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLm9uT3B0aW9uSG92ZXIob3B0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9uU2VsZWN0ID0gaXNEaXNhYmxlZCA/IHVuZGVmaW5lZCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLnNlbGVjdE9wdGlvbihvcHRpb24pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3B0aW9uSWQgPSBfdGhpczMuZ2V0RWxlbWVudElkKCdvcHRpb24nKSArICctJyArIGlkO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5uZXJQcm9wczoge1xuICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLFxuICAgICAgICAgICAgaWQ6IG9wdGlvbklkLFxuICAgICAgICAgICAgb25DbGljazogb25TZWxlY3QsXG4gICAgICAgICAgICBvbk1vdXNlTW92ZTogb25Ib3ZlcixcbiAgICAgICAgICAgIG9uTW91c2VPdmVyOiBvbkhvdmVyLFxuICAgICAgICAgICAgcm9sZTogJ29wdGlvbicsXG4gICAgICAgICAgICB0YWJJbmRleDogLTFcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IG9wdGlvbixcbiAgICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAga2V5OiBvcHRpb25JZCxcbiAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgdHlwZTogJ29wdGlvbicsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gb3B0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgaXRlbSwgaXRlbUluZGV4KSB7XG4gICAgICAgIGlmIChpdGVtLm9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBUT0RPIG5lZWRzIGEgdGlkaWVyIGltcGxlbWVudGF0aW9uXG4gICAgICAgICAgaWYgKCFfdGhpczMuaGFzR3JvdXBzKSBfdGhpczMuaGFzR3JvdXBzID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBpdGVtcyA9IGl0ZW0ub3B0aW9ucztcblxuICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGl0ZW1zLm1hcChmdW5jdGlvbiAoY2hpbGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb24gPSB0b09wdGlvbihjaGlsZCwgaXRlbUluZGV4ICsgJy0nICsgaSk7XG4gICAgICAgICAgICBpZiAob3B0aW9uICYmICFvcHRpb24uaXNEaXNhYmxlZCkgYWNjLmZvY3VzYWJsZS5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBncm91cElkID0gX3RoaXMzLmdldEVsZW1lbnRJZCgnZ3JvdXAnKSArICctJyArIGl0ZW1JbmRleDtcbiAgICAgICAgICAgIGFjYy5yZW5kZXIucHVzaCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgICAgIGtleTogZ3JvdXBJZCxcbiAgICAgICAgICAgICAgZGF0YTogaXRlbSxcbiAgICAgICAgICAgICAgb3B0aW9uczogY2hpbGRyZW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgb3B0aW9uID0gdG9PcHRpb24oaXRlbSwgJycgKyBpdGVtSW5kZXgpO1xuICAgICAgICAgIGlmIChvcHRpb24pIHtcbiAgICAgICAgICAgIGFjYy5yZW5kZXIucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgaWYgKCFvcHRpb24uaXNEaXNhYmxlZCkgYWNjLmZvY3VzYWJsZS5wdXNoKGl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgeyByZW5kZXI6IFtdLCBmb2N1c2FibGU6IFtdIH0pO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFJlbmRlcmVyc1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJTY3JlZW5SZWFkZXJTdGF0dXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJTY3JlZW5SZWFkZXJTdGF0dXMoKSB7XG4gICAgICB2YXIgc2NyZWVuUmVhZGVyU3RhdHVzID0gdGhpcy5wcm9wcy5zY3JlZW5SZWFkZXJTdGF0dXM7XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBBMTF5VGV4dCxcbiAgICAgICAgeyAnYXJpYS1hdG9taWMnOiAndHJ1ZScsICdhcmlhLWxpdmUnOiAncG9saXRlJywgcm9sZTogJ3N0YXR1cycgfSxcbiAgICAgICAgc2NyZWVuUmVhZGVyU3RhdHVzKHsgY291bnQ6IHRoaXMuY291bnRPcHRpb25zKCkgfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVySW5wdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJJbnB1dCgpIHtcbiAgICAgIHZhciBfcHJvcHM0ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzNC5pc0Rpc2FibGVkLFxuICAgICAgICAgIGlzTG9hZGluZyA9IF9wcm9wczQuaXNMb2FkaW5nLFxuICAgICAgICAgIGlzU2VhcmNoYWJsZSA9IF9wcm9wczQuaXNTZWFyY2hhYmxlLFxuICAgICAgICAgIGlucHV0SWQgPSBfcHJvcHM0LmlucHV0SWQsXG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IF9wcm9wczQuaW5wdXRWYWx1ZSxcbiAgICAgICAgICBtZW51SXNPcGVuID0gX3Byb3BzNC5tZW51SXNPcGVuLFxuICAgICAgICAgIHRhYkluZGV4ID0gX3Byb3BzNC50YWJJbmRleDtcbiAgICAgIHZhciBJbnB1dCQkMSA9IHRoaXMuY29tcG9uZW50cy5JbnB1dDtcbiAgICAgIHZhciBpbnB1dElzSGlkZGVuID0gdGhpcy5zdGF0ZS5pbnB1dElzSGlkZGVuO1xuXG5cbiAgICAgIHZhciBpZCA9IGlucHV0SWQgfHwgdGhpcy5nZXRFbGVtZW50SWQoJ2lucHV0Jyk7XG5cbiAgICAgIGlmICghaXNTZWFyY2hhYmxlKSB7XG4gICAgICAgIC8vIHVzZSBhIGR1bW15IGlucHV0IHRvIG1haW50YWluIGZvY3VzL2JsdXIgZnVuY3Rpb25hbGl0eVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChEdW1teUlucHV0LCB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIGlubmVyUmVmOiB0aGlzLm9uSW5wdXRSZWYsXG4gICAgICAgICAgb25CbHVyOiB0aGlzLm9uSW5wdXRCbHVyLFxuICAgICAgICAgIG9uQ2hhbmdlOiBub29wLFxuICAgICAgICAgIG9uRm9jdXM6IHRoaXMub25JbnB1dEZvY3VzLFxuICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICAgIHRhYkluZGV4OiB0YWJJbmRleCxcbiAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFyaWEgYXR0cmlidXRlcyBtYWtlcyB0aGUgSlNYIFwibm9pc3lcIiwgc2VwYXJhdGVkIGZvciBjbGFyaXR5XG4gICAgICB2YXIgYXJpYUF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnOiB0aGlzLmdldEFjdGl2ZURlc2NlbmRlbnRJZCgpLFxuICAgICAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAnbGlzdCcsXG4gICAgICAgICdhcmlhLWJ1c3knOiBpc0xvYWRpbmcsXG4gICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1kZXNjcmliZWRieSddLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IG1lbnVJc09wZW4sXG4gICAgICAgICdhcmlhLWhhc3BvcHVwJzogbWVudUlzT3BlbixcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG4gICAgICAgICdhcmlhLWxhYmVsbGVkYnknOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsbGVkYnknXSxcbiAgICAgICAgJ2FyaWEtb3ducyc6IG1lbnVJc09wZW4gPyB0aGlzLmdldEVsZW1lbnRJZCgnbGlzdGJveCcpIDogdW5kZWZpbmVkLFxuICAgICAgICByb2xlOiAnY29tYm9ib3gnXG4gICAgICB9O1xuXG4gICAgICB2YXIgY3ggPSB0aGlzLmNvbW1vblByb3BzLmN4O1xuXG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0JCQxLCBfZXh0ZW5kcyh7XG4gICAgICAgIGF1dG9DYXBpdGFsaXplOiAnbm9uZScsXG4gICAgICAgIGF1dG9Db21wbGV0ZTogJ29mZicsXG4gICAgICAgIGF1dG9Db3JyZWN0OiAnb2ZmJyxcbiAgICAgICAgY3g6IGN4LFxuICAgICAgICBnZXRTdHlsZXM6IHRoaXMuZ2V0U3R5bGVzLFxuICAgICAgICBpZDogaWQsXG4gICAgICAgIGlubmVyUmVmOiB0aGlzLm9uSW5wdXRSZWYsXG4gICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgIGlzSGlkZGVuOiBpbnB1dElzSGlkZGVuLFxuICAgICAgICBvbkJsdXI6IHRoaXMub25JbnB1dEJsdXIsXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuICAgICAgICBvbkZvY3VzOiB0aGlzLm9uSW5wdXRGb2N1cyxcbiAgICAgICAgc3BlbGxDaGVjazogJ2ZhbHNlJyxcbiAgICAgICAgdGFiSW5kZXg6IHRhYkluZGV4LFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHZhbHVlOiBpbnB1dFZhbHVlXG4gICAgICB9LCBhcmlhQXR0cmlidXRlcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlclBsYWNlaG9sZGVyT3JWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclBsYWNlaG9sZGVyT3JWYWx1ZSgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgX2NvbXBvbmVudHMgPSB0aGlzLmNvbXBvbmVudHMsXG4gICAgICAgICAgTXVsdGlWYWx1ZSA9IF9jb21wb25lbnRzLk11bHRpVmFsdWUsXG4gICAgICAgICAgTXVsdGlWYWx1ZUNvbnRhaW5lciA9IF9jb21wb25lbnRzLk11bHRpVmFsdWVDb250YWluZXIsXG4gICAgICAgICAgTXVsdGlWYWx1ZUxhYmVsID0gX2NvbXBvbmVudHMuTXVsdGlWYWx1ZUxhYmVsLFxuICAgICAgICAgIE11bHRpVmFsdWVSZW1vdmUgPSBfY29tcG9uZW50cy5NdWx0aVZhbHVlUmVtb3ZlLFxuICAgICAgICAgIFNpbmdsZVZhbHVlID0gX2NvbXBvbmVudHMuU2luZ2xlVmFsdWUsXG4gICAgICAgICAgUGxhY2Vob2xkZXIgPSBfY29tcG9uZW50cy5QbGFjZWhvbGRlcjtcbiAgICAgIHZhciBjb21tb25Qcm9wcyA9IHRoaXMuY29tbW9uUHJvcHM7XG4gICAgICB2YXIgX3Byb3BzNSA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29udHJvbFNob3VsZFJlbmRlclZhbHVlID0gX3Byb3BzNS5jb250cm9sU2hvdWxkUmVuZGVyVmFsdWUsXG4gICAgICAgICAgaXNEaXNhYmxlZCA9IF9wcm9wczUuaXNEaXNhYmxlZCxcbiAgICAgICAgICBpc011bHRpID0gX3Byb3BzNS5pc011bHRpLFxuICAgICAgICAgIGlucHV0VmFsdWUgPSBfcHJvcHM1LmlucHV0VmFsdWUsXG4gICAgICAgICAgcGxhY2Vob2xkZXIgPSBfcHJvcHM1LnBsYWNlaG9sZGVyO1xuICAgICAgdmFyIF9zdGF0ZTUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIHNlbGVjdFZhbHVlID0gX3N0YXRlNS5zZWxlY3RWYWx1ZSxcbiAgICAgICAgICBmb2N1c2VkVmFsdWUgPSBfc3RhdGU1LmZvY3VzZWRWYWx1ZTtcblxuXG4gICAgICBpZiAoIXRoaXMuaGFzVmFsdWUoKSB8fCAhY29udHJvbFNob3VsZFJlbmRlclZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpbnB1dFZhbHVlID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgUGxhY2Vob2xkZXIsXG4gICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7IGtleTogJ3BsYWNlaG9sZGVyJywgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCB9KSxcbiAgICAgICAgICBwbGFjZWhvbGRlclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNNdWx0aSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0VmFsdWUubWFwKGZ1bmN0aW9uIChvcHQpIHtcbiAgICAgICAgICB2YXIgaXNGb2N1c2VkID0gb3B0ID09PSBmb2N1c2VkVmFsdWU7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBNdWx0aVZhbHVlLFxuICAgICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgICAgICBDb250YWluZXI6IE11bHRpVmFsdWVDb250YWluZXIsXG4gICAgICAgICAgICAgICAgTGFiZWw6IE11bHRpVmFsdWVMYWJlbCxcbiAgICAgICAgICAgICAgICBSZW1vdmU6IE11bHRpVmFsdWVSZW1vdmVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaXNGb2N1c2VkOiBpc0ZvY3VzZWQsXG4gICAgICAgICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgICAgICAgIGtleTogX3RoaXM0LmdldE9wdGlvblZhbHVlKG9wdCksXG4gICAgICAgICAgICAgIHJlbW92ZVByb3BzOiB7XG4gICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczQucmVtb3ZlVmFsdWUob3B0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uTW91c2VEb3duOiBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZGF0YTogb3B0XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF90aGlzNC5mb3JtYXRPcHRpb25MYWJlbChvcHQsICd2YWx1ZScpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2luZ2xlVmFsdWUgPSBzZWxlY3RWYWx1ZVswXTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBTaW5nbGVWYWx1ZSxcbiAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7IGRhdGE6IHNpbmdsZVZhbHVlLCBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkIH0pLFxuICAgICAgICB0aGlzLmZvcm1hdE9wdGlvbkxhYmVsKHNpbmdsZVZhbHVlLCAndmFsdWUnKVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJDbGVhckluZGljYXRvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckNsZWFySW5kaWNhdG9yKCkge1xuICAgICAgdmFyIENsZWFySW5kaWNhdG9yID0gdGhpcy5jb21wb25lbnRzLkNsZWFySW5kaWNhdG9yO1xuICAgICAgdmFyIGNvbW1vblByb3BzID0gdGhpcy5jb21tb25Qcm9wcztcbiAgICAgIHZhciBfcHJvcHM2ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzNi5pc0Rpc2FibGVkLFxuICAgICAgICAgIGlzTG9hZGluZyA9IF9wcm9wczYuaXNMb2FkaW5nO1xuICAgICAgdmFyIGlzRm9jdXNlZCA9IHRoaXMuc3RhdGUuaXNGb2N1c2VkO1xuXG5cbiAgICAgIGlmICghdGhpcy5pc0NsZWFyYWJsZSgpIHx8ICFDbGVhckluZGljYXRvciB8fCBpc0Rpc2FibGVkIHx8ICF0aGlzLmhhc1ZhbHVlKCkgfHwgaXNMb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW5uZXJQcm9wcyA9IHtcbiAgICAgICAgb25Nb3VzZURvd246IHRoaXMub25DbGVhckluZGljYXRvck1vdXNlRG93bixcbiAgICAgICAgb25Ub3VjaEVuZDogdGhpcy5vbkNsZWFySW5kaWNhdG9yVG91Y2hFbmQsXG4gICAgICAgIHJvbGU6ICdidXR0b24nXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDbGVhckluZGljYXRvciwgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgIGlubmVyUHJvcHM6IGlubmVyUHJvcHMsXG4gICAgICAgIGlzRm9jdXNlZDogaXNGb2N1c2VkXG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyTG9hZGluZ0luZGljYXRvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmdJbmRpY2F0b3IoKSB7XG4gICAgICB2YXIgTG9hZGluZ0luZGljYXRvciA9IHRoaXMuY29tcG9uZW50cy5Mb2FkaW5nSW5kaWNhdG9yO1xuICAgICAgdmFyIGNvbW1vblByb3BzID0gdGhpcy5jb21tb25Qcm9wcztcbiAgICAgIHZhciBfcHJvcHM3ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzNy5pc0Rpc2FibGVkLFxuICAgICAgICAgIGlzTG9hZGluZyA9IF9wcm9wczcuaXNMb2FkaW5nO1xuICAgICAgdmFyIGlzRm9jdXNlZCA9IHRoaXMuc3RhdGUuaXNGb2N1c2VkO1xuXG5cbiAgICAgIGlmICghTG9hZGluZ0luZGljYXRvciB8fCAhaXNMb2FkaW5nKSByZXR1cm4gbnVsbDtcblxuICAgICAgdmFyIGlubmVyUHJvcHMgPSB7XG4gICAgICAgIHJvbGU6ICdwcmVzZW50YXRpb24nXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nSW5kaWNhdG9yLCBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHtcbiAgICAgICAgaW5uZXJQcm9wczogaW5uZXJQcm9wcyxcbiAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgaXNGb2N1c2VkOiBpc0ZvY3VzZWRcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJJbmRpY2F0b3JTZXBhcmF0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJJbmRpY2F0b3JTZXBhcmF0b3IoKSB7XG4gICAgICB2YXIgX2NvbXBvbmVudHMyID0gdGhpcy5jb21wb25lbnRzLFxuICAgICAgICAgIERyb3Bkb3duSW5kaWNhdG9yID0gX2NvbXBvbmVudHMyLkRyb3Bkb3duSW5kaWNhdG9yLFxuICAgICAgICAgIEluZGljYXRvclNlcGFyYXRvciA9IF9jb21wb25lbnRzMi5JbmRpY2F0b3JTZXBhcmF0b3I7XG5cbiAgICAgIC8vIHNlcGFyYXRvciBkb2Vzbid0IG1ha2Ugc2Vuc2Ugd2l0aG91dCB0aGUgZHJvcGRvd24gaW5kaWNhdG9yXG5cbiAgICAgIGlmICghRHJvcGRvd25JbmRpY2F0b3IgfHwgIUluZGljYXRvclNlcGFyYXRvcikgcmV0dXJuIG51bGw7XG5cbiAgICAgIHZhciBjb21tb25Qcm9wcyA9IHRoaXMuY29tbW9uUHJvcHM7XG4gICAgICB2YXIgaXNEaXNhYmxlZCA9IHRoaXMucHJvcHMuaXNEaXNhYmxlZDtcbiAgICAgIHZhciBpc0ZvY3VzZWQgPSB0aGlzLnN0YXRlLmlzRm9jdXNlZDtcblxuICAgICAgdmFyIGlubmVyUHJvcHMgPSB7IHJvbGU6ICdwcmVzZW50YXRpb24nIH07XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEluZGljYXRvclNlcGFyYXRvciwgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgIGlubmVyUHJvcHM6IGlubmVyUHJvcHMsXG4gICAgICAgIGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQsXG4gICAgICAgIGlzRm9jdXNlZDogaXNGb2N1c2VkXG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyRHJvcGRvd25JbmRpY2F0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJEcm9wZG93bkluZGljYXRvcigpIHtcbiAgICAgIHZhciBEcm9wZG93bkluZGljYXRvciA9IHRoaXMuY29tcG9uZW50cy5Ecm9wZG93bkluZGljYXRvcjtcblxuICAgICAgaWYgKCFEcm9wZG93bkluZGljYXRvcikgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgY29tbW9uUHJvcHMgPSB0aGlzLmNvbW1vblByb3BzO1xuICAgICAgdmFyIGlzRGlzYWJsZWQgPSB0aGlzLnByb3BzLmlzRGlzYWJsZWQ7XG4gICAgICB2YXIgaXNGb2N1c2VkID0gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQ7XG5cblxuICAgICAgdmFyIGlubmVyUHJvcHMgPSB7XG4gICAgICAgIG9uTW91c2VEb3duOiB0aGlzLm9uRHJvcGRvd25JbmRpY2F0b3JNb3VzZURvd24sXG4gICAgICAgIG9uVG91Y2hFbmQ6IHRoaXMub25Ecm9wZG93bkluZGljYXRvclRvdWNoRW5kLFxuICAgICAgICByb2xlOiAnYnV0dG9uJ1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcGRvd25JbmRpY2F0b3IsIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywge1xuICAgICAgICBpbm5lclByb3BzOiBpbm5lclByb3BzLFxuICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICBpc0ZvY3VzZWQ6IGlzRm9jdXNlZFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlck1lbnUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJNZW51KCkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBfY29tcG9uZW50czMgPSB0aGlzLmNvbXBvbmVudHMsXG4gICAgICAgICAgR3JvdXAgPSBfY29tcG9uZW50czMuR3JvdXAsXG4gICAgICAgICAgR3JvdXBIZWFkaW5nID0gX2NvbXBvbmVudHMzLkdyb3VwSGVhZGluZyxcbiAgICAgICAgICBNZW51ID0gX2NvbXBvbmVudHMzLk1lbnUsXG4gICAgICAgICAgTWVudUxpc3QgPSBfY29tcG9uZW50czMuTWVudUxpc3QsXG4gICAgICAgICAgTWVudVBvcnRhbCA9IF9jb21wb25lbnRzMy5NZW51UG9ydGFsLFxuICAgICAgICAgIExvYWRpbmdNZXNzYWdlID0gX2NvbXBvbmVudHMzLkxvYWRpbmdNZXNzYWdlLFxuICAgICAgICAgIE5vT3B0aW9uc01lc3NhZ2UgPSBfY29tcG9uZW50czMuTm9PcHRpb25zTWVzc2FnZSxcbiAgICAgICAgICBPcHRpb24gPSBfY29tcG9uZW50czMuT3B0aW9uO1xuICAgICAgdmFyIGNvbW1vblByb3BzID0gdGhpcy5jb21tb25Qcm9wcztcbiAgICAgIHZhciBfc3RhdGU2ID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBmb2N1c2VkT3B0aW9uID0gX3N0YXRlNi5mb2N1c2VkT3B0aW9uLFxuICAgICAgICAgIG1lbnVPcHRpb25zID0gX3N0YXRlNi5tZW51T3B0aW9ucztcbiAgICAgIHZhciBfcHJvcHM4ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjYXB0dXJlTWVudVNjcm9sbCA9IF9wcm9wczguY2FwdHVyZU1lbnVTY3JvbGwsXG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IF9wcm9wczguaW5wdXRWYWx1ZSxcbiAgICAgICAgICBpc0xvYWRpbmcgPSBfcHJvcHM4LmlzTG9hZGluZyxcbiAgICAgICAgICBpc011bHRpID0gX3Byb3BzOC5pc011bHRpLFxuICAgICAgICAgIGxvYWRpbmdNZXNzYWdlID0gX3Byb3BzOC5sb2FkaW5nTWVzc2FnZSxcbiAgICAgICAgICBtaW5NZW51SGVpZ2h0ID0gX3Byb3BzOC5taW5NZW51SGVpZ2h0LFxuICAgICAgICAgIG1heE1lbnVIZWlnaHQgPSBfcHJvcHM4Lm1heE1lbnVIZWlnaHQsXG4gICAgICAgICAgbWVudUlzT3BlbiA9IF9wcm9wczgubWVudUlzT3BlbixcbiAgICAgICAgICBtZW51UGxhY2VtZW50ID0gX3Byb3BzOC5tZW51UGxhY2VtZW50LFxuICAgICAgICAgIG1lbnVQb3NpdGlvbiA9IF9wcm9wczgubWVudVBvc2l0aW9uLFxuICAgICAgICAgIG1lbnVQb3J0YWxUYXJnZXQgPSBfcHJvcHM4Lm1lbnVQb3J0YWxUYXJnZXQsXG4gICAgICAgICAgbWVudVNob3VsZEJsb2NrU2Nyb2xsID0gX3Byb3BzOC5tZW51U2hvdWxkQmxvY2tTY3JvbGwsXG4gICAgICAgICAgbWVudVNob3VsZFNjcm9sbEludG9WaWV3ID0gX3Byb3BzOC5tZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXcsXG4gICAgICAgICAgbm9PcHRpb25zTWVzc2FnZSA9IF9wcm9wczgubm9PcHRpb25zTWVzc2FnZSxcbiAgICAgICAgICBvbk1lbnVTY3JvbGxUb1RvcCA9IF9wcm9wczgub25NZW51U2Nyb2xsVG9Ub3AsXG4gICAgICAgICAgb25NZW51U2Nyb2xsVG9Cb3R0b20gPSBfcHJvcHM4Lm9uTWVudVNjcm9sbFRvQm90dG9tO1xuXG5cbiAgICAgIGlmICghbWVudUlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgICAgIC8vIFRPRE86IEludGVybmFsIE9wdGlvbiBUeXBlIGhlcmVcbiAgICAgIHZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIocHJvcHMpIHtcbiAgICAgICAgLy8gZm9yIHBlcmZvcm1hbmNlLCB0aGUgbWVudSBvcHRpb25zIGluIHN0YXRlIGFyZW4ndCBjaGFuZ2VkIHdoZW4gdGhlXG4gICAgICAgIC8vIGZvY3VzZWQgb3B0aW9uIGNoYW5nZXMgc28gd2UgY2FsY3VsYXRlIGFkZGl0aW9uYWwgcHJvcHMgYmFzZWQgb24gdGhhdFxuICAgICAgICB2YXIgaXNGb2N1c2VkID0gZm9jdXNlZE9wdGlvbiA9PT0gcHJvcHMuZGF0YTtcbiAgICAgICAgcHJvcHMuaW5uZXJQcm9wcy5pbm5lclJlZiA9IGlzRm9jdXNlZCA/IF90aGlzNS5vbkZvY3VzZWRPcHRpb25SZWYgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgT3B0aW9uLFxuICAgICAgICAgIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywgcHJvcHMsIHsgaXNGb2N1c2VkOiBpc0ZvY3VzZWQgfSksXG4gICAgICAgICAgX3RoaXM1LmZvcm1hdE9wdGlvbkxhYmVsKHByb3BzLmRhdGEsICdtZW51JylcbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBtZW51VUkgPSB2b2lkIDA7XG5cbiAgICAgIGlmICh0aGlzLmhhc09wdGlvbnMoKSkge1xuICAgICAgICBtZW51VUkgPSBtZW51T3B0aW9ucy5yZW5kZXIubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBpdGVtLnR5cGUsXG4gICAgICAgICAgICAgICAgZ3JvdXAgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhpdGVtLCBbJ3R5cGUnXSk7XG5cbiAgICAgICAgICAgIHZhciBoZWFkaW5nSWQgPSBpdGVtLmtleSArICctaGVhZGluZyc7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBHcm91cCxcbiAgICAgICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCBncm91cCwge1xuICAgICAgICAgICAgICAgIEhlYWRpbmc6IEdyb3VwSGVhZGluZyxcbiAgICAgICAgICAgICAgICBpbm5lclByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAnYXJpYS1leHBhbmRlZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogaGVhZGluZ0lkLFxuICAgICAgICAgICAgICAgICAgcm9sZTogJ2dyb3VwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZGluZ1Byb3BzOiB7XG4gICAgICAgICAgICAgICAgICBpZDogaGVhZGluZ0lkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYWJlbDogX3RoaXM1LmZvcm1hdEdyb3VwTGFiZWwoaXRlbS5kYXRhKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgaXRlbS5vcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlcihvcHRpb24pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXIoaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAgIG1lbnVVSSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgTG9hZGluZ01lc3NhZ2UsXG4gICAgICAgICAgY29tbW9uUHJvcHMsXG4gICAgICAgICAgbG9hZGluZ01lc3NhZ2UoeyBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlIH0pXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZW51VUkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIE5vT3B0aW9uc01lc3NhZ2UsXG4gICAgICAgICAgY29tbW9uUHJvcHMsXG4gICAgICAgICAgbm9PcHRpb25zTWVzc2FnZSh7IGlucHV0VmFsdWU6IGlucHV0VmFsdWUgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1lbnVFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIG51bGwsXG4gICAgICAgIG1lbnVTaG91bGRCbG9ja1Njcm9sbCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2Nyb2xsQmxvY2ssIG51bGwpIDogbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBNZW51LFxuICAgICAgICAgIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywge1xuICAgICAgICAgICAgaW5uZXJQcm9wczoge1xuICAgICAgICAgICAgICBvbk1vdXNlRG93bjogdGhpcy5vbk1lbnVNb3VzZURvd24sXG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlOiB0aGlzLm9uTWVudU1vdXNlTW92ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTG9hZGluZzogaXNMb2FkaW5nLFxuICAgICAgICAgICAgbWluTWVudUhlaWdodDogbWluTWVudUhlaWdodCxcbiAgICAgICAgICAgIG1heE1lbnVIZWlnaHQ6IG1heE1lbnVIZWlnaHQsXG4gICAgICAgICAgICBtZW51UGxhY2VtZW50OiBtZW51UGxhY2VtZW50LFxuICAgICAgICAgICAgbWVudVBvc2l0aW9uOiBtZW51UG9zaXRpb24sXG4gICAgICAgICAgICBtZW51U2hvdWxkU2Nyb2xsSW50b1ZpZXc6IG1lbnVTaG91bGRTY3JvbGxJbnRvVmlld1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBTY3JvbGxDYXB0b3JTd2l0Y2gsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlzRW5hYmxlZDogY2FwdHVyZU1lbnVTY3JvbGwsXG4gICAgICAgICAgICAgIG9uVG9wQXJyaXZlOiBvbk1lbnVTY3JvbGxUb1RvcCxcbiAgICAgICAgICAgICAgb25Cb3R0b21BcnJpdmU6IG9uTWVudVNjcm9sbFRvQm90dG9tXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgTWVudUxpc3QsXG4gICAgICAgICAgICAgIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywge1xuICAgICAgICAgICAgICAgIGlubmVyUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IGlzTXVsdGksXG4gICAgICAgICAgICAgICAgICBpZDogdGhpcy5nZXRFbGVtZW50SWQoJ2xpc3Rib3gnKSxcbiAgICAgICAgICAgICAgICAgIGlubmVyUmVmOiB0aGlzLm9uTWVudVJlZixcbiAgICAgICAgICAgICAgICAgIHJvbGU6ICdsaXN0Ym94J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBpc0xvYWRpbmcsXG4gICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiBtYXhNZW51SGVpZ2h0XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBtZW51VUlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIC8vIHBvc2l0aW9uaW5nIGJlaGF2aW91ciBpcyBhbG1vc3QgaWRlbnRpY2FsIGZvciBwb3J0YWxsZWQgYW5kIGZpeGVkLFxuICAgICAgLy8gc28gd2UgdXNlIHRoZSBzYW1lIGNvbXBvbmVudC4gdGhlIGFjdHVhbCBwb3J0YWxsaW5nIGxvZ2ljIGlzIGZvcmtlZFxuICAgICAgLy8gd2l0aGluIHRoZSBjb21wb25lbnQgYmFzZWQgb24gYG1lbnVQb3NpdGlvbmBcbiAgICAgIHJldHVybiBtZW51UG9ydGFsVGFyZ2V0IHx8IG1lbnVQb3NpdGlvbiA9PT0gJ2ZpeGVkJyA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIE1lbnVQb3J0YWwsXG4gICAgICAgIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywge1xuICAgICAgICAgIGFwcGVuZFRvOiBtZW51UG9ydGFsVGFyZ2V0LFxuICAgICAgICAgIGNvbnRyb2xFbGVtZW50OiB0aGlzLmNvbnRyb2xSZWYsXG4gICAgICAgICAgbWVudVBsYWNlbWVudDogbWVudVBsYWNlbWVudCxcbiAgICAgICAgICBtZW51UG9zaXRpb246IG1lbnVQb3NpdGlvblxuICAgICAgICB9KSxcbiAgICAgICAgbWVudUVsZW1lbnRcbiAgICAgICkgOiBtZW51RWxlbWVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJGb3JtRmllbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJGb3JtRmllbGQoKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczkgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGRlbGltaXRlciA9IF9wcm9wczkuZGVsaW1pdGVyLFxuICAgICAgICAgIGlzRGlzYWJsZWQgPSBfcHJvcHM5LmlzRGlzYWJsZWQsXG4gICAgICAgICAgaXNNdWx0aSA9IF9wcm9wczkuaXNNdWx0aSxcbiAgICAgICAgICBuYW1lID0gX3Byb3BzOS5uYW1lO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gdGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZTtcblxuXG4gICAgICBpZiAoIW5hbWUgfHwgaXNEaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICBpZiAoaXNNdWx0aSkge1xuICAgICAgICBpZiAoZGVsaW1pdGVyKSB7XG4gICAgICAgICAgdmFyIF92YWx1ZSA9IHNlbGVjdFZhbHVlLm1hcChmdW5jdGlvbiAob3B0KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM2LmdldE9wdGlvblZhbHVlKG9wdCk7XG4gICAgICAgICAgfSkuam9pbihkZWxpbWl0ZXIpO1xuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsgbmFtZTogbmFtZSwgdHlwZTogJ2hpZGRlbicsIHZhbHVlOiBfdmFsdWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBzZWxlY3RWYWx1ZS5tYXAoZnVuY3Rpb24gKG9wdCwgaSkge1xuICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAga2V5OiAnaS0nICsgaSxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdGhpczYuZ2V0T3B0aW9uVmFsdWUob3B0KVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF92YWx1ZTIgPSBzZWxlY3RWYWx1ZVswXSA/IHRoaXMuZ2V0T3B0aW9uVmFsdWUoc2VsZWN0VmFsdWVbMF0pIDogJyc7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsgbmFtZTogbmFtZSwgdHlwZTogJ2hpZGRlbicsIHZhbHVlOiBfdmFsdWUyIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfY29tcG9uZW50czQgPSB0aGlzLmNvbXBvbmVudHMsXG4gICAgICAgICAgQ29udHJvbCA9IF9jb21wb25lbnRzNC5Db250cm9sLFxuICAgICAgICAgIEluZGljYXRvcnNDb250YWluZXIgPSBfY29tcG9uZW50czQuSW5kaWNhdG9yc0NvbnRhaW5lcixcbiAgICAgICAgICBTZWxlY3RDb250YWluZXIgPSBfY29tcG9uZW50czQuU2VsZWN0Q29udGFpbmVyLFxuICAgICAgICAgIFZhbHVlQ29udGFpbmVyID0gX2NvbXBvbmVudHM0LlZhbHVlQ29udGFpbmVyO1xuICAgICAgdmFyIF9wcm9wczEwID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjbGFzc05hbWUgPSBfcHJvcHMxMC5jbGFzc05hbWUsXG4gICAgICAgICAgaWQgPSBfcHJvcHMxMC5pZCxcbiAgICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzMTAuaXNEaXNhYmxlZDtcbiAgICAgIHZhciBpc0ZvY3VzZWQgPSB0aGlzLnN0YXRlLmlzRm9jdXNlZDtcblxuXG4gICAgICB2YXIgY29tbW9uUHJvcHMgPSB0aGlzLmNvbW1vblByb3BzID0gdGhpcy5nZXRDb21tb25Qcm9wcygpO1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgU2VsZWN0Q29udGFpbmVyLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgY29tbW9uUHJvcHMsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBpbm5lclByb3BzOiB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMub25LZXlEb3duXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkLFxuICAgICAgICAgIGlzRm9jdXNlZDogaXNGb2N1c2VkXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLnJlbmRlclNjcmVlblJlYWRlclN0YXR1cygpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIENvbnRyb2wsXG4gICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7XG4gICAgICAgICAgICBpbm5lclByb3BzOiB7XG4gICAgICAgICAgICAgIGlubmVyUmVmOiB0aGlzLm9uQ29udHJvbFJlZixcbiAgICAgICAgICAgICAgb25Nb3VzZURvd246IHRoaXMub25Db250cm9sTW91c2VEb3duLFxuICAgICAgICAgICAgICBvblRvdWNoRW5kOiB0aGlzLm9uQ29udHJvbFRvdWNoRW5kXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICAgIGlzRm9jdXNlZDogaXNGb2N1c2VkXG4gICAgICAgICAgfSksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFZhbHVlQ29udGFpbmVyLFxuICAgICAgICAgICAgX2V4dGVuZHMoe30sIGNvbW1vblByb3BzLCB7IGlzRGlzYWJsZWQ6IGlzRGlzYWJsZWQgfSksXG4gICAgICAgICAgICB0aGlzLnJlbmRlclBsYWNlaG9sZGVyT3JWYWx1ZSgpLFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJbnB1dCgpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgSW5kaWNhdG9yc0NvbnRhaW5lcixcbiAgICAgICAgICAgIF9leHRlbmRzKHt9LCBjb21tb25Qcm9wcywgeyBpc0Rpc2FibGVkOiBpc0Rpc2FibGVkIH0pLFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDbGVhckluZGljYXRvcigpLFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMb2FkaW5nSW5kaWNhdG9yKCksXG4gICAgICAgICAgICB0aGlzLnJlbmRlckluZGljYXRvclNlcGFyYXRvcigpLFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJEcm9wZG93bkluZGljYXRvcigpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICB0aGlzLnJlbmRlck1lbnUoKSxcbiAgICAgICAgdGhpcy5yZW5kZXJGb3JtRmllbGQoKVxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbGVjdDtcbn0oQ29tcG9uZW50KTtcblxuU2VsZWN0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxudmFyIF9pbml0aWFsaXNlUHJvcHMgPSBmdW5jdGlvbiBfaW5pdGlhbGlzZVByb3BzKCkge1xuICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICB0aGlzLmJsb2NrT3B0aW9uSG92ZXIgPSBmYWxzZTtcbiAgdGhpcy5jbGVhckZvY3VzVmFsdWVPblVwZGF0ZSA9IGZhbHNlO1xuICB0aGlzLmhhc0dyb3VwcyA9IGZhbHNlO1xuICB0aGlzLmluc3RhbmNlUHJlZml4ID0gJyc7XG4gIHRoaXMuaW5pdGlhbFRvdWNoWCA9IDA7XG4gIHRoaXMuaW5pdGlhbFRvdWNoWSA9IDA7XG4gIHRoaXMub3BlbkFmdGVyRm9jdXMgPSBmYWxzZTtcbiAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IGZhbHNlO1xuICB0aGlzLnN0YXRlID0ge1xuICAgIGZvY3VzZWRPcHRpb246IG51bGwsXG4gICAgZm9jdXNlZFZhbHVlOiBudWxsLFxuICAgIGlucHV0SXNIaWRkZW46IGZhbHNlLFxuICAgIGlzRm9jdXNlZDogZmFsc2UsXG4gICAgbWVudU9wdGlvbnM6IHsgcmVuZGVyOiBbXSwgZm9jdXNhYmxlOiBbXSB9LFxuICAgIHNlbGVjdFZhbHVlOiBbXVxuICB9O1xuXG4gIHRoaXMub25JbnB1dFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICBfdGhpczcuaW5wdXQgPSByZWY7XG4gIH07XG5cbiAgdGhpcy5vbkNvbnRyb2xSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgX3RoaXM3LmNvbnRyb2xSZWYgPSByZWY7XG4gIH07XG5cbiAgdGhpcy5vbk1lbnVSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgX3RoaXM3Lm1lbnVSZWYgPSByZWY7XG4gIH07XG5cbiAgdGhpcy5vbkZvY3VzZWRPcHRpb25SZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgX3RoaXM3LmZvY3VzZWRPcHRpb25SZWYgPSByZWY7XG4gIH07XG5cbiAgdGhpcy5mb2N1cyA9IHRoaXMuZm9jdXNJbnB1dDtcbiAgdGhpcy5ibHVyID0gdGhpcy5ibHVySW5wdXQ7XG5cbiAgdGhpcy5zZXRWYWx1ZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdzZXQtdmFsdWUnO1xuICAgIHZhciBfcHJvcHMxMSA9IF90aGlzNy5wcm9wcyxcbiAgICAgICAgY2xvc2VNZW51T25TZWxlY3QgPSBfcHJvcHMxMS5jbG9zZU1lbnVPblNlbGVjdCxcbiAgICAgICAgaXNNdWx0aSA9IF9wcm9wczExLmlzTXVsdGksXG4gICAgICAgIG9uQ2hhbmdlID0gX3Byb3BzMTEub25DaGFuZ2U7XG5cbiAgICBfdGhpczcub25JbnB1dENoYW5nZSgnJywgeyBhY3Rpb246ICdzZXQtdmFsdWUnIH0pO1xuICAgIGlmIChjbG9zZU1lbnVPblNlbGVjdCkge1xuICAgICAgX3RoaXM3LmlucHV0SXNIaWRkZW5BZnRlclVwZGF0ZSA9ICFpc011bHRpO1xuICAgICAgX3RoaXM3Lm9uTWVudUNsb3NlKCk7XG4gICAgfVxuICAgIC8vIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBzaG91bGQgY2hhbmdlLCB3ZSBzaG91bGQgcmVzZXQgZm9jdXNlZFZhbHVlXG4gICAgX3RoaXM3LmNsZWFyRm9jdXNWYWx1ZU9uVXBkYXRlID0gdHJ1ZTtcbiAgICBvbkNoYW5nZShuZXdWYWx1ZSwgeyBhY3Rpb246IGFjdGlvbiB9KTtcbiAgfTtcblxuICB0aGlzLnNlbGVjdE9wdGlvbiA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgIHZhciBfcHJvcHMxMiA9IF90aGlzNy5wcm9wcyxcbiAgICAgICAgYmx1cklucHV0T25TZWxlY3QgPSBfcHJvcHMxMi5ibHVySW5wdXRPblNlbGVjdCxcbiAgICAgICAgaXNNdWx0aSA9IF9wcm9wczEyLmlzTXVsdGk7XG5cblxuICAgIGlmIChpc011bHRpKSB7XG4gICAgICB2YXIgX3NlbGVjdFZhbHVlMyA9IF90aGlzNy5zdGF0ZS5zZWxlY3RWYWx1ZTtcblxuICAgICAgaWYgKF90aGlzNy5pc09wdGlvblNlbGVjdGVkKG5ld1ZhbHVlLCBfc2VsZWN0VmFsdWUzKSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gX3RoaXM3LmdldE9wdGlvblZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgX3RoaXM3LnNldFZhbHVlKF9zZWxlY3RWYWx1ZTMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNy5nZXRPcHRpb25WYWx1ZShpKSAhPT0gY2FuZGlkYXRlO1xuICAgICAgICB9KSwgJ2Rlc2VsZWN0LW9wdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXM3LnNldFZhbHVlKFtdLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheShfc2VsZWN0VmFsdWUzKSwgW25ld1ZhbHVlXSksICdzZWxlY3Qtb3B0aW9uJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIF90aGlzNy5zZXRWYWx1ZShuZXdWYWx1ZSwgJ3NlbGVjdC1vcHRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoYmx1cklucHV0T25TZWxlY3QpIHtcbiAgICAgIF90aGlzNy5ibHVySW5wdXQoKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5yZW1vdmVWYWx1ZSA9IGZ1bmN0aW9uIChyZW1vdmVkVmFsdWUpIHtcbiAgICB2YXIgb25DaGFuZ2UgPSBfdGhpczcucHJvcHMub25DaGFuZ2U7XG4gICAgdmFyIHNlbGVjdFZhbHVlID0gX3RoaXM3LnN0YXRlLnNlbGVjdFZhbHVlO1xuXG4gICAgdmFyIGNhbmRpZGF0ZSA9IF90aGlzNy5nZXRPcHRpb25WYWx1ZShyZW1vdmVkVmFsdWUpO1xuICAgIG9uQ2hhbmdlKHNlbGVjdFZhbHVlLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIF90aGlzNy5nZXRPcHRpb25WYWx1ZShpKSAhPT0gY2FuZGlkYXRlO1xuICAgIH0pLCB7XG4gICAgICBhY3Rpb246ICdyZW1vdmUtdmFsdWUnLFxuICAgICAgcmVtb3ZlZFZhbHVlOiByZW1vdmVkVmFsdWVcbiAgICB9KTtcbiAgICBfdGhpczcuZm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIHRoaXMuY2xlYXJWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3Byb3BzMTMgPSBfdGhpczcucHJvcHMsXG4gICAgICAgIGlzTXVsdGkgPSBfcHJvcHMxMy5pc011bHRpLFxuICAgICAgICBvbkNoYW5nZSA9IF9wcm9wczEzLm9uQ2hhbmdlO1xuXG4gICAgb25DaGFuZ2UoaXNNdWx0aSA/IFtdIDogbnVsbCwgeyBhY3Rpb246ICdjbGVhcicgfSk7XG4gIH07XG5cbiAgdGhpcy5wb3BWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb25DaGFuZ2UgPSBfdGhpczcucHJvcHMub25DaGFuZ2U7XG4gICAgdmFyIHNlbGVjdFZhbHVlID0gX3RoaXM3LnN0YXRlLnNlbGVjdFZhbHVlO1xuXG4gICAgb25DaGFuZ2Uoc2VsZWN0VmFsdWUuc2xpY2UoMCwgc2VsZWN0VmFsdWUubGVuZ3RoIC0gMSksIHtcbiAgICAgIGFjdGlvbjogJ3BvcC12YWx1ZScsXG4gICAgICByZW1vdmVkVmFsdWU6IHNlbGVjdFZhbHVlW3NlbGVjdFZhbHVlLmxlbmd0aCAtIDFdXG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5nZXRTdHlsZXMgPSBmdW5jdGlvbiAoa2V5LCBwcm9wcykge1xuICAgIHZhciBiYXNlID0gZGVmYXVsdFN0eWxlc1trZXldKHByb3BzKTtcbiAgICBiYXNlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICB2YXIgY3VzdG9tID0gX3RoaXM3LnByb3BzLnN0eWxlc1trZXldO1xuICAgIHJldHVybiBjdXN0b20gPyBjdXN0b20oYmFzZSwgcHJvcHMpIDogYmFzZTtcbiAgfTtcblxuICB0aGlzLmdldEVsZW1lbnRJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIF90aGlzNy5pbnN0YW5jZVByZWZpeCArICctJyArIGVsZW1lbnQ7XG4gIH07XG5cbiAgdGhpcy5nZXRBY3RpdmVEZXNjZW5kZW50SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1lbnVJc09wZW4gPSBfdGhpczcucHJvcHMubWVudUlzT3BlbjtcbiAgICB2YXIgX3N0YXRlNyA9IF90aGlzNy5zdGF0ZSxcbiAgICAgICAgbWVudU9wdGlvbnMgPSBfc3RhdGU3Lm1lbnVPcHRpb25zLFxuICAgICAgICBmb2N1c2VkT3B0aW9uID0gX3N0YXRlNy5mb2N1c2VkT3B0aW9uO1xuXG5cbiAgICBpZiAoIWZvY3VzZWRPcHRpb24gfHwgIW1lbnVJc09wZW4pIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgaW5kZXggPSBtZW51T3B0aW9ucy5mb2N1c2FibGUuaW5kZXhPZihmb2N1c2VkT3B0aW9uKTtcbiAgICB2YXIgb3B0aW9uID0gbWVudU9wdGlvbnMucmVuZGVyW2luZGV4XTtcblxuICAgIHJldHVybiBvcHRpb24gJiYgb3B0aW9uLmtleTtcbiAgfTtcblxuICB0aGlzLm9uTWVudU1vdXNlRG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBfdGhpczcuZm9jdXNJbnB1dCgpO1xuICB9O1xuXG4gIHRoaXMub25NZW51TW91c2VNb3ZlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgX3RoaXM3LmJsb2NrT3B0aW9uSG92ZXIgPSBmYWxzZTtcbiAgfTtcblxuICB0aGlzLm9uQ29udHJvbE1vdXNlRG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBvcGVuTWVudU9uQ2xpY2sgPSBfdGhpczcucHJvcHMub3Blbk1lbnVPbkNsaWNrO1xuXG4gICAgaWYgKCFfdGhpczcuc3RhdGUuaXNGb2N1c2VkKSB7XG4gICAgICBpZiAob3Blbk1lbnVPbkNsaWNrKSB7XG4gICAgICAgIF90aGlzNy5vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBfdGhpczcuZm9jdXNJbnB1dCgpO1xuICAgIH0gZWxzZSBpZiAoIV90aGlzNy5wcm9wcy5tZW51SXNPcGVuKSB7XG4gICAgICBfdGhpczcub3Blbk1lbnUoJ2ZpcnN0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF90aGlzNy5vbk1lbnVDbG9zZSgpO1xuICAgIH1cbiAgICAvLyAkRmxvd0ZpeE1lIEhUTUxFbGVtZW50IHR5cGUgZG9lcyBub3QgaGF2ZSB0YWdOYW1lIHByb3BlcnR5XG4gICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLm9uRHJvcGRvd25JbmRpY2F0b3JNb3VzZURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBpZ25vcmUgbW91c2UgZXZlbnRzIHRoYXQgd2VyZW4ndCB0cmlnZ2VyZWQgYnkgdGhlIHByaW1hcnkgYnV0dG9uXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX3RoaXM3LnByb3BzLmlzRGlzYWJsZWQpIHJldHVybjtcbiAgICB2YXIgX3Byb3BzMTQgPSBfdGhpczcucHJvcHMsXG4gICAgICAgIGlzTXVsdGkgPSBfcHJvcHMxNC5pc011bHRpLFxuICAgICAgICBtZW51SXNPcGVuID0gX3Byb3BzMTQubWVudUlzT3BlbjtcblxuICAgIF90aGlzNy5mb2N1c0lucHV0KCk7XG4gICAgaWYgKG1lbnVJc09wZW4pIHtcbiAgICAgIF90aGlzNy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGUgPSAhaXNNdWx0aTtcbiAgICAgIF90aGlzNy5vbk1lbnVDbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpczcub3Blbk1lbnUoJ2ZpcnN0Jyk7XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgdGhpcy5vbkNsZWFySW5kaWNhdG9yTW91c2VEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gaWdub3JlIG1vdXNlIGV2ZW50cyB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IHRoZSBwcmltYXJ5IGJ1dHRvblxuICAgIGlmIChldmVudCAmJiBldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgX3RoaXM3LmNsZWFyVmFsdWUoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBfdGhpczcub3BlbkFmdGVyRm9jdXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpczcuZm9jdXNJbnB1dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIF9yZWYyJHRvdWNoZXMgPSBzbGljZWRUb0FycmF5KF9yZWYyLnRvdWNoZXMsIDEpLFxuICAgICAgICB0b3VjaCA9IF9yZWYyJHRvdWNoZXNbMF07XG5cbiAgICBfdGhpczcuaW5pdGlhbFRvdWNoWCA9IHRvdWNoLmNsaWVudFg7XG4gICAgX3RoaXM3LmluaXRpYWxUb3VjaFkgPSB0b3VjaC5jbGllbnRZO1xuICAgIF90aGlzNy51c2VySXNEcmFnZ2luZyA9IGZhbHNlO1xuICB9O1xuXG4gIHRoaXMub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICB2YXIgX3JlZjMkdG91Y2hlcyA9IHNsaWNlZFRvQXJyYXkoX3JlZjMudG91Y2hlcywgMSksXG4gICAgICAgIHRvdWNoID0gX3JlZjMkdG91Y2hlc1swXTtcblxuICAgIHZhciBkZWx0YVggPSBNYXRoLmFicyh0b3VjaC5jbGllbnRYIC0gX3RoaXM3LmluaXRpYWxUb3VjaFgpO1xuICAgIHZhciBkZWx0YVkgPSBNYXRoLmFicyh0b3VjaC5jbGllbnRZIC0gX3RoaXM3LmluaXRpYWxUb3VjaFkpO1xuICAgIHZhciBtb3ZlVGhyZXNob2xkID0gNTtcblxuICAgIF90aGlzNy51c2VySXNEcmFnZ2luZyA9IGRlbHRhWCA+IG1vdmVUaHJlc2hvbGQgfHwgZGVsdGFZID4gbW92ZVRocmVzaG9sZDtcbiAgfTtcblxuICB0aGlzLm9uVG91Y2hFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoX3RoaXM3LnVzZXJJc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICAvLyBjbG9zZSB0aGUgbWVudSBpZiB0aGUgdXNlciB0YXBzIG91dHNpZGVcbiAgICBpZiAoX3RoaXM3LmNvbnRyb2xSZWYgJiYgIV90aGlzNy5jb250cm9sUmVmLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgX3RoaXM3Lm1lbnVSZWYgJiYgIV90aGlzNy5tZW51UmVmLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIF90aGlzNy5ibHVySW5wdXQoKTtcbiAgICB9XG5cbiAgICAvLyByZXNldCBtb3ZlIHZhcnNcbiAgICBfdGhpczcuaW5pdGlhbFRvdWNoWCA9IDA7XG4gICAgX3RoaXM3LmluaXRpYWxUb3VjaFkgPSAwO1xuICB9O1xuXG4gIHRoaXMub25Db250cm9sVG91Y2hFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoX3RoaXM3LnVzZXJJc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICBfdGhpczcub25Db250cm9sTW91c2VEb3duKGV2ZW50KTtcbiAgfTtcblxuICB0aGlzLm9uQ2xlYXJJbmRpY2F0b3JUb3VjaEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChfdGhpczcudXNlcklzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgIF90aGlzNy5vbkNsZWFySW5kaWNhdG9yTW91c2VEb3duKGV2ZW50KTtcbiAgfTtcblxuICB0aGlzLm9uRHJvcGRvd25JbmRpY2F0b3JUb3VjaEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChfdGhpczcudXNlcklzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgIF90aGlzNy5vbkRyb3Bkb3duSW5kaWNhdG9yTW91c2VEb3duKGV2ZW50KTtcbiAgfTtcblxuICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGlucHV0VmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgIF90aGlzNy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGUgPSBmYWxzZTtcbiAgICBfdGhpczcub25JbnB1dENoYW5nZShpbnB1dFZhbHVlLCB7IGFjdGlvbjogJ2lucHV0LWNoYW5nZScgfSk7XG4gICAgX3RoaXM3Lm9uTWVudU9wZW4oKTtcbiAgfTtcblxuICB0aGlzLm9uSW5wdXRGb2N1cyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChfdGhpczcucHJvcHMub25Gb2N1cykge1xuICAgICAgX3RoaXM3LnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgIH1cbiAgICBfdGhpczcuaW5wdXRJc0hpZGRlbkFmdGVyVXBkYXRlID0gZmFsc2U7XG4gICAgX3RoaXM3LnNldFN0YXRlKHtcbiAgICAgIGlzRm9jdXNlZDogdHJ1ZVxuICAgIH0pO1xuICAgIGlmIChfdGhpczcub3BlbkFmdGVyRm9jdXMgfHwgX3RoaXM3LnByb3BzLm9wZW5NZW51T25Gb2N1cykge1xuICAgICAgX3RoaXM3Lm9wZW5NZW51KCdmaXJzdCcpO1xuICAgIH1cbiAgICBfdGhpczcub3BlbkFmdGVyRm9jdXMgPSBmYWxzZTtcbiAgfTtcblxuICB0aGlzLm9uSW5wdXRCbHVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKF90aGlzNy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgIF90aGlzNy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgIH1cbiAgICBfdGhpczcub25JbnB1dENoYW5nZSgnJywgeyBhY3Rpb246ICdpbnB1dC1ibHVyJyB9KTtcbiAgICBfdGhpczcub25NZW51Q2xvc2UoKTtcbiAgICBfdGhpczcuc2V0U3RhdGUoe1xuICAgICAgZm9jdXNlZFZhbHVlOiBudWxsLFxuICAgICAgaXNGb2N1c2VkOiBmYWxzZVxuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMub25PcHRpb25Ib3ZlciA9IGZ1bmN0aW9uIChmb2N1c2VkT3B0aW9uKSB7XG4gICAgaWYgKF90aGlzNy5ibG9ja09wdGlvbkhvdmVyIHx8IF90aGlzNy5zdGF0ZS5mb2N1c2VkT3B0aW9uID09PSBmb2N1c2VkT3B0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIF90aGlzNy5zZXRTdGF0ZSh7IGZvY3VzZWRPcHRpb246IGZvY3VzZWRPcHRpb24gfSk7XG4gIH07XG5cbiAgdGhpcy5vbktleURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgX3Byb3BzMTUgPSBfdGhpczcucHJvcHMsXG4gICAgICAgIGlzTXVsdGkgPSBfcHJvcHMxNS5pc011bHRpLFxuICAgICAgICBiYWNrc3BhY2VSZW1vdmVzVmFsdWUgPSBfcHJvcHMxNS5iYWNrc3BhY2VSZW1vdmVzVmFsdWUsXG4gICAgICAgIGVzY2FwZUNsZWFyc1ZhbHVlID0gX3Byb3BzMTUuZXNjYXBlQ2xlYXJzVmFsdWUsXG4gICAgICAgIGlucHV0VmFsdWUgPSBfcHJvcHMxNS5pbnB1dFZhbHVlLFxuICAgICAgICBpc0NsZWFyYWJsZSA9IF9wcm9wczE1LmlzQ2xlYXJhYmxlLFxuICAgICAgICBpc0Rpc2FibGVkID0gX3Byb3BzMTUuaXNEaXNhYmxlZCxcbiAgICAgICAgbWVudUlzT3BlbiA9IF9wcm9wczE1Lm1lbnVJc09wZW4sXG4gICAgICAgIG9uS2V5RG93biA9IF9wcm9wczE1Lm9uS2V5RG93bixcbiAgICAgICAgdGFiU2VsZWN0c1ZhbHVlID0gX3Byb3BzMTUudGFiU2VsZWN0c1ZhbHVlLFxuICAgICAgICBvcGVuTWVudU9uRm9jdXMgPSBfcHJvcHMxNS5vcGVuTWVudU9uRm9jdXM7XG4gICAgdmFyIF9zdGF0ZTggPSBfdGhpczcuc3RhdGUsXG4gICAgICAgIGZvY3VzZWRPcHRpb24gPSBfc3RhdGU4LmZvY3VzZWRPcHRpb24sXG4gICAgICAgIGZvY3VzZWRWYWx1ZSA9IF9zdGF0ZTguZm9jdXNlZFZhbHVlLFxuICAgICAgICBzZWxlY3RWYWx1ZSA9IF9zdGF0ZTguc2VsZWN0VmFsdWU7XG5cblxuICAgIGlmIChpc0Rpc2FibGVkKSByZXR1cm47XG5cbiAgICBpZiAodHlwZW9mIG9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb25LZXlEb3duKGV2ZW50KTtcbiAgICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCbG9jayBvcHRpb24gaG92ZXIgZXZlbnRzIHdoZW4gdGhlIHVzZXIgaGFzIGp1c3QgcHJlc3NlZCBhIGtleVxuICAgIF90aGlzNy5ibG9ja09wdGlvbkhvdmVyID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgaWYgKCFpc011bHRpIHx8IGlucHV0VmFsdWUpIHJldHVybjtcbiAgICAgICAgX3RoaXM3LmZvY3VzVmFsdWUoJ3ByZXZpb3VzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgIGlmICghaXNNdWx0aSB8fCBpbnB1dFZhbHVlKSByZXR1cm47XG4gICAgICAgIF90aGlzNy5mb2N1c1ZhbHVlKCduZXh0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQmFja3NwYWNlJzpcbiAgICAgICAgaWYgKGlucHV0VmFsdWUpIHJldHVybjtcbiAgICAgICAgaWYgKGZvY3VzZWRWYWx1ZSkge1xuICAgICAgICAgIF90aGlzNy5yZW1vdmVWYWx1ZShmb2N1c2VkVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghYmFja3NwYWNlUmVtb3Zlc1ZhbHVlKSByZXR1cm47XG4gICAgICAgICAgX3RoaXM3LnBvcFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdUYWInOlxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIW1lbnVJc09wZW4gfHwgIXRhYlNlbGVjdHNWYWx1ZSB8fCAhZm9jdXNlZE9wdGlvbiB8fFxuICAgICAgICAvLyBkb24ndCBjYXB0dXJlIHRoZSBldmVudCBpZiB0aGUgbWVudSBvcGVucyBvbiBmb2N1cyBhbmQgdGhlIGZvY3VzZWRcbiAgICAgICAgLy8gb3B0aW9uIGlzIGFscmVhZHkgc2VsZWN0ZWQ7IGl0IGJyZWFrcyB0aGUgZmxvdyBvZiBuYXZpZ2F0aW9uXG4gICAgICAgIG9wZW5NZW51T25Gb2N1cyAmJiBfdGhpczcuaXNPcHRpb25TZWxlY3RlZChmb2N1c2VkT3B0aW9uLCBzZWxlY3RWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXM3LnNlbGVjdE9wdGlvbihmb2N1c2VkT3B0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGlmIChtZW51SXNPcGVuKSB7XG4gICAgICAgICAgaWYgKCFmb2N1c2VkT3B0aW9uKSByZXR1cm47XG4gICAgICAgICAgX3RoaXM3LnNlbGVjdE9wdGlvbihmb2N1c2VkT3B0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczcuZm9jdXNPcHRpb24oJ2ZpcnN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICBpZiAobWVudUlzT3Blbikge1xuICAgICAgICAgIF90aGlzNy5pbnB1dElzSGlkZGVuQWZ0ZXJVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICBfdGhpczcub25JbnB1dENoYW5nZSgnJywgeyBhY3Rpb246ICdtZW51LWNsb3NlJyB9KTtcbiAgICAgICAgICBfdGhpczcub25NZW51Q2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NsZWFyYWJsZSAmJiBlc2NhcGVDbGVhcnNWYWx1ZSkge1xuICAgICAgICAgIF90aGlzNy5jbGVhclZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcgJzpcbiAgICAgICAgLy8gc3BhY2VcbiAgICAgICAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZW51SXNPcGVuKSB7XG4gICAgICAgICAgX3RoaXM3Lm9wZW5NZW51KCdmaXJzdCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9jdXNlZE9wdGlvbikgcmV0dXJuO1xuICAgICAgICBfdGhpczcuc2VsZWN0T3B0aW9uKGZvY3VzZWRPcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBpZiAobWVudUlzT3Blbikge1xuICAgICAgICAgIF90aGlzNy5mb2N1c09wdGlvbigndXAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczcub3Blbk1lbnUoJ2xhc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGlmIChtZW51SXNPcGVuKSB7XG4gICAgICAgICAgX3RoaXM3LmZvY3VzT3B0aW9uKCdkb3duJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXM3Lm9wZW5NZW51KCdmaXJzdCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgaWYgKCFtZW51SXNPcGVuKSByZXR1cm47XG4gICAgICAgIF90aGlzNy5mb2N1c09wdGlvbigncGFnZXVwJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICBpZiAoIW1lbnVJc09wZW4pIHJldHVybjtcbiAgICAgICAgX3RoaXM3LmZvY3VzT3B0aW9uKCdwYWdlZG93bicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICBpZiAoIW1lbnVJc09wZW4pIHJldHVybjtcbiAgICAgICAgX3RoaXM3LmZvY3VzT3B0aW9uKCdmaXJzdCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgIGlmICghbWVudUlzT3BlbikgcmV0dXJuO1xuICAgICAgICBfdGhpczcuZm9jdXNPcHRpb24oJ2xhc3QnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59O1xuXG52YXIgbWFuYWdlU3RhdGUgPSBmdW5jdGlvbiBtYW5hZ2VTdGF0ZShTZWxlY3RDb21wb25lbnQpIHtcbiAgdmFyIF9jbGFzcywgX3RlbXAyO1xuXG4gIHJldHVybiBfdGVtcDIgPSBfY2xhc3MgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKFN0YXRlTWFuYWdlciwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBTdGF0ZU1hbmFnZXIoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RhdGVNYW5hZ2VyKTtcblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChfcmVmID0gU3RhdGVNYW5hZ2VyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGVNYW5hZ2VyKSkuY2FsbC5hcHBseShfcmVmLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgIGlucHV0VmFsdWU6IF90aGlzLnByb3BzLmlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCA/IF90aGlzLnByb3BzLmlucHV0VmFsdWUgOiBfdGhpcy5wcm9wcy5kZWZhdWx0SW5wdXRWYWx1ZSxcbiAgICAgICAgbWVudUlzT3BlbjogX3RoaXMucHJvcHMubWVudUlzT3BlbiAhPT0gdW5kZWZpbmVkID8gX3RoaXMucHJvcHMubWVudUlzT3BlbiA6IF90aGlzLnByb3BzLmRlZmF1bHRNZW51SXNPcGVuLFxuICAgICAgICB2YWx1ZTogX3RoaXMucHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCA/IF90aGlzLnByb3BzLnZhbHVlIDogX3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgICB9LCBfdGhpcy5vbkNoYW5nZSA9IGZ1bmN0aW9uICh2YWx1ZSwgYWN0aW9uTWV0YSkge1xuICAgICAgICBfdGhpcy5jYWxsUHJvcCgnb25DaGFuZ2UnLCB2YWx1ZSwgYWN0aW9uTWV0YSk7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgfSwgX3RoaXMub25JbnB1dENoYW5nZSA9IGZ1bmN0aW9uICh2YWx1ZSwgYWN0aW9uTWV0YSkge1xuICAgICAgICAvLyBUT0RPOiBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIHdlIGFsbG93IHRoZSBwcm9wIHRvIHJldHVybiBhIG5ld1xuICAgICAgICAvLyB2YWx1ZSwgYnV0IG5vdyBpbnB1dFZhbHVlIGlzIGEgY29udHJvbGxhYmxlIHByb3Agd2UgcHJvYmFibHkgc2hvdWxkbid0XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IF90aGlzLmNhbGxQcm9wKCdvbklucHV0Q2hhbmdlJywgdmFsdWUsIGFjdGlvbk1ldGEpO1xuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgaW5wdXRWYWx1ZTogbmV3VmFsdWUgIT09IHVuZGVmaW5lZCA/IG5ld1ZhbHVlIDogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9LCBfdGhpcy5vbk1lbnVPcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5jYWxsUHJvcCgnb25NZW51T3BlbicpO1xuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IG1lbnVJc09wZW46IHRydWUgfSk7XG4gICAgICB9LCBfdGhpcy5vbk1lbnVDbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuY2FsbFByb3AoJ29uTWVudUNsb3NlJyk7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgbWVudUlzT3BlbjogZmFsc2UgfSk7XG4gICAgICB9LCBfdGVtcCksIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICAgIH1cblxuICAgIGNyZWF0ZUNsYXNzKFN0YXRlTWFuYWdlciwgW3tcbiAgICAgIGtleTogJ2ZvY3VzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdibHVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgICB0aGlzLnNlbGVjdC5ibHVyKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnZ2V0UHJvcCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UHJvcChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNba2V5XSAhPT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wc1trZXldIDogdGhpcy5zdGF0ZVtrZXldO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2NhbGxQcm9wJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjYWxsUHJvcChuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBfcHJvcHM7XG5cbiAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAoX3Byb3BzID0gdGhpcy5wcm9wcylbbmFtZV0uYXBwbHkoX3Byb3BzLCB0b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0Q29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywge1xuICAgICAgICAgIHJlZjogZnVuY3Rpb24gcmVmKF9yZWYyKSB7XG4gICAgICAgICAgICBfdGhpczIuc2VsZWN0ID0gX3JlZjI7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbnB1dFZhbHVlOiB0aGlzLmdldFByb3AoJ2lucHV0VmFsdWUnKSxcbiAgICAgICAgICBtZW51SXNPcGVuOiB0aGlzLmdldFByb3AoJ21lbnVJc09wZW4nKSxcbiAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSxcbiAgICAgICAgICBvbklucHV0Q2hhbmdlOiB0aGlzLm9uSW5wdXRDaGFuZ2UsXG4gICAgICAgICAgb25NZW51Q2xvc2U6IHRoaXMub25NZW51Q2xvc2UsXG4gICAgICAgICAgb25NZW51T3BlbjogdGhpcy5vbk1lbnVPcGVuLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmdldFByb3AoJ3ZhbHVlJylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gU3RhdGVNYW5hZ2VyO1xuICB9KENvbXBvbmVudCksIF9jbGFzcy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZGVmYXVsdElucHV0VmFsdWU6ICcnLFxuICAgIGRlZmF1bHRNZW51SXNPcGVuOiBmYWxzZSxcbiAgICBkZWZhdWx0VmFsdWU6IG51bGxcbiAgfSwgX3RlbXAyO1xufTtcblxudmFyIGRlZmF1bHRQcm9wcyQxID0ge1xuICBjYWNoZU9wdGlvbnM6IGZhbHNlLFxuICBkZWZhdWx0T3B0aW9uczogZmFsc2Vcbn07XG5cbnZhciBtYWtlQXN5bmNTZWxlY3QgPSBmdW5jdGlvbiBtYWtlQXN5bmNTZWxlY3QoU2VsZWN0Q29tcG9uZW50KSB7XG4gIHZhciBfY2xhc3MsIF90ZW1wO1xuXG4gIHJldHVybiBfdGVtcCA9IF9jbGFzcyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoQXN5bmMsIF9Db21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQXN5bmMocHJvcHMpIHtcbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEFzeW5jKTtcblxuICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXN5bmMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBc3luYykpLmNhbGwodGhpcykpO1xuXG4gICAgICBfdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gICAgICBfdGhpcy5vcHRpb25zQ2FjaGUgPSB7fTtcblxuICAgICAgX3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbiAobmV3VmFsdWUsIGFjdGlvbk1ldGEpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgICBjYWNoZU9wdGlvbnMgPSBfdGhpcyRwcm9wcy5jYWNoZU9wdGlvbnMsXG4gICAgICAgICAgICBvbklucHV0Q2hhbmdlID0gX3RoaXMkcHJvcHMub25JbnB1dENoYW5nZTtcbiAgICAgICAgLy8gVE9ET1xuXG4gICAgICAgIHZhciBpbnB1dFZhbHVlID0gaGFuZGxlSW5wdXRDaGFuZ2UobmV3VmFsdWUsIGFjdGlvbk1ldGEsIG9uSW5wdXRDaGFuZ2UpO1xuICAgICAgICBpZiAoIWlucHV0VmFsdWUpIHtcbiAgICAgICAgICBkZWxldGUgX3RoaXMubGFzdFJlcXVlc3Q7XG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogJycsXG4gICAgICAgICAgICBsb2FkZWRJbnB1dFZhbHVlOiAnJyxcbiAgICAgICAgICAgIGxvYWRlZE9wdGlvbnM6IFtdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhc3NFbXB0eU9wdGlvbnM6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZU9wdGlvbnMgJiYgX3RoaXMub3B0aW9uc0NhY2hlW2lucHV0VmFsdWVdKSB7XG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGxvYWRlZElucHV0VmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICAgICAgICBsb2FkZWRPcHRpb25zOiBfdGhpcy5vcHRpb25zQ2FjaGVbaW5wdXRWYWx1ZV0sXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcGFzc0VtcHR5T3B0aW9uczogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVxdWVzdCA9IF90aGlzLmxhc3RSZXF1ZXN0ID0ge307XG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHBhc3NFbXB0eU9wdGlvbnM6ICFfdGhpcy5zdGF0ZS5sb2FkZWRJbnB1dFZhbHVlXG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMubG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKCFfdGhpcy5tb3VudGVkKSByZXR1cm47XG4gICAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub3B0aW9uc0NhY2hlW2lucHV0VmFsdWVdID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVxdWVzdCAhPT0gX3RoaXMubGFzdFJlcXVlc3QpIHJldHVybjtcbiAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLmxhc3RSZXF1ZXN0O1xuICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2FkZWRJbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgICAgICAgICAgIGxvYWRlZE9wdGlvbnM6IG9wdGlvbnMgfHwgW10sXG4gICAgICAgICAgICAgICAgcGFzc0VtcHR5T3B0aW9uczogZmFsc2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICBkZWZhdWx0T3B0aW9uczogQXJyYXkuaXNBcnJheShwcm9wcy5kZWZhdWx0T3B0aW9ucykgPyBwcm9wcy5kZWZhdWx0T3B0aW9ucyA6IHVuZGVmaW5lZCxcbiAgICAgICAgaW5wdXRWYWx1ZTogJycsXG4gICAgICAgIGlzTG9hZGluZzogcHJvcHMuZGVmYXVsdE9wdGlvbnMgPT09IHRydWUgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGxvYWRlZE9wdGlvbnM6IFtdLFxuICAgICAgICBwYXNzRW1wdHlPcHRpb25zOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBjcmVhdGVDbGFzcyhBc3luYywgW3tcbiAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0gdGhpcy5wcm9wcy5kZWZhdWx0T3B0aW9ucztcblxuICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMgPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLmxvYWRPcHRpb25zKCcnLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFfdGhpczIubW91bnRlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGlzTG9hZGluZyA9ICEhX3RoaXMyLmxhc3RSZXF1ZXN0O1xuICAgICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgZGVmYXVsdE9wdGlvbnM6IG9wdGlvbnMgfHwgW10sIGlzTG9hZGluZzogaXNMb2FkaW5nIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgLy8gaWYgdGhlIGNhY2hlT3B0aW9ucyBwcm9wIGNoYW5nZXMsIGNsZWFyIHRoZSBjYWNoZVxuICAgICAgICBpZiAobmV4dFByb3BzLmNhY2hlT3B0aW9ucyAhPT0gdGhpcy5wcm9wcy5jYWNoZU9wdGlvbnMpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnNDYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdmb2N1cycsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnYmx1cicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYmx1cigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuYmx1cigpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2xvYWRPcHRpb25zJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgbG9hZE9wdGlvbnMgPSB0aGlzLnByb3BzLmxvYWRPcHRpb25zO1xuXG4gICAgICAgIGlmICghbG9hZE9wdGlvbnMpIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB2YXIgbG9hZGVyID0gbG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgY2FsbGJhY2spO1xuICAgICAgICBpZiAobG9hZGVyICYmIHR5cGVvZiBsb2FkZXIudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGxvYWRlci50aGVuKGNhbGxiYWNrLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGxvYWRPcHRpb25zID0gX3Byb3BzLmxvYWRPcHRpb25zLFxuICAgICAgICAgICAgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnbG9hZE9wdGlvbnMnXSk7XG4gICAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfc3RhdGUuZGVmYXVsdE9wdGlvbnMsXG4gICAgICAgICAgICBpbnB1dFZhbHVlID0gX3N0YXRlLmlucHV0VmFsdWUsXG4gICAgICAgICAgICBpc0xvYWRpbmcgPSBfc3RhdGUuaXNMb2FkaW5nLFxuICAgICAgICAgICAgbG9hZGVkSW5wdXRWYWx1ZSA9IF9zdGF0ZS5sb2FkZWRJbnB1dFZhbHVlLFxuICAgICAgICAgICAgbG9hZGVkT3B0aW9ucyA9IF9zdGF0ZS5sb2FkZWRPcHRpb25zLFxuICAgICAgICAgICAgcGFzc0VtcHR5T3B0aW9ucyA9IF9zdGF0ZS5wYXNzRW1wdHlPcHRpb25zO1xuXG4gICAgICAgIHZhciBvcHRpb25zID0gcGFzc0VtcHR5T3B0aW9ucyA/IFtdIDogaW5wdXRWYWx1ZSAmJiBsb2FkZWRJbnB1dFZhbHVlID8gbG9hZGVkT3B0aW9ucyA6IGRlZmF1bHRPcHRpb25zIHx8IFtdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICAgICAgICByZWY6IGZ1bmN0aW9uIHJlZihfcmVmKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5zZWxlY3QgPSBfcmVmO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICBmaWx0ZXJPcHRpb246IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGlzTG9hZGluZyxcbiAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2VcbiAgICAgICAgICB9KSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIEFzeW5jO1xuICB9KENvbXBvbmVudCksIF9jbGFzcy5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHMkMSwgX3RlbXA7XG59O1xudmFyIEFzeW5jID0gbWFrZUFzeW5jU2VsZWN0KG1hbmFnZVN0YXRlKFNlbGVjdCkpO1xuXG52YXIgY29tcGFyZU9wdGlvbiA9IGZ1bmN0aW9uIGNvbXBhcmVPcHRpb24oaW5wdXRWYWx1ZSwgb3B0aW9uKSB7XG4gIHZhciBjYW5kaWRhdGUgPSBpbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBvcHRpb24udmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gY2FuZGlkYXRlIHx8IG9wdGlvbi5sYWJlbC50b0xvd2VyQ2FzZSgpID09PSBjYW5kaWRhdGU7XG59O1xuXG52YXIgYnVpbHRpbnMgPSB7XG4gIGZvcm1hdENyZWF0ZUxhYmVsOiBmdW5jdGlvbiBmb3JtYXRDcmVhdGVMYWJlbChpbnB1dFZhbHVlKSB7XG4gICAgcmV0dXJuICdDcmVhdGUgXCInICsgaW5wdXRWYWx1ZSArICdcIic7XG4gIH0sXG4gIGlzVmFsaWROZXdPcHRpb246IGZ1bmN0aW9uIGlzVmFsaWROZXdPcHRpb24oaW5wdXRWYWx1ZSwgc2VsZWN0VmFsdWUsIHNlbGVjdE9wdGlvbnMpIHtcbiAgICByZXR1cm4gISghaW5wdXRWYWx1ZSB8fCBzZWxlY3RWYWx1ZS5zb21lKGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBjb21wYXJlT3B0aW9uKGlucHV0VmFsdWUsIG9wdGlvbik7XG4gICAgfSkgfHwgc2VsZWN0T3B0aW9ucy5zb21lKGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHJldHVybiBjb21wYXJlT3B0aW9uKGlucHV0VmFsdWUsIG9wdGlvbik7XG4gICAgfSkpO1xuICB9LFxuICBnZXROZXdPcHRpb25EYXRhOiBmdW5jdGlvbiBnZXROZXdPcHRpb25EYXRhKGlucHV0VmFsdWUsIG9wdGlvbkxhYmVsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiBvcHRpb25MYWJlbCxcbiAgICAgIHZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgX19pc05ld19fOiB0cnVlXG4gICAgfTtcbiAgfVxufTtcblxudmFyIGRlZmF1bHRQcm9wcyQyID0gX2V4dGVuZHMoe1xuICBhbGxvd0NyZWF0ZVdoaWxlTG9hZGluZzogZmFsc2UsXG4gIGNyZWF0ZU9wdGlvblBvc2l0aW9uOiAnbGFzdCdcbn0sIGJ1aWx0aW5zKTtcblxudmFyIG1ha2VDcmVhdGFibGVTZWxlY3QgPSBmdW5jdGlvbiBtYWtlQ3JlYXRhYmxlU2VsZWN0KFNlbGVjdENvbXBvbmVudCkge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICByZXR1cm4gX3RlbXAgPSBfY2xhc3MgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKENyZWF0YWJsZSwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBDcmVhdGFibGUocHJvcHMpIHtcbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENyZWF0YWJsZSk7XG5cbiAgICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENyZWF0YWJsZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENyZWF0YWJsZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgX3RoaXMub25DaGFuZ2UgPSBmdW5jdGlvbiAobmV3VmFsdWUsIGFjdGlvbk1ldGEpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgICBnZXROZXdPcHRpb25EYXRhID0gX3RoaXMkcHJvcHMuZ2V0TmV3T3B0aW9uRGF0YSxcbiAgICAgICAgICAgIGlucHV0VmFsdWUgPSBfdGhpcyRwcm9wcy5pbnB1dFZhbHVlLFxuICAgICAgICAgICAgaXNNdWx0aSA9IF90aGlzJHByb3BzLmlzTXVsdGksXG4gICAgICAgICAgICBvbkNoYW5nZSA9IF90aGlzJHByb3BzLm9uQ2hhbmdlLFxuICAgICAgICAgICAgb25DcmVhdGVPcHRpb24gPSBfdGhpcyRwcm9wcy5vbkNyZWF0ZU9wdGlvbixcbiAgICAgICAgICAgIHZhbHVlID0gX3RoaXMkcHJvcHMudmFsdWU7XG5cbiAgICAgICAgaWYgKGFjdGlvbk1ldGEuYWN0aW9uICE9PSAnc2VsZWN0LW9wdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gb25DaGFuZ2UobmV3VmFsdWUsIGFjdGlvbk1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdPcHRpb24gPSBfdGhpcy5zdGF0ZS5uZXdPcHRpb247XG5cbiAgICAgICAgdmFyIHZhbHVlQXJyYXkgPSBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSA/IG5ld1ZhbHVlIDogW25ld1ZhbHVlXTtcblxuICAgICAgICBpZiAodmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aCAtIDFdID09PSBuZXdPcHRpb24pIHtcbiAgICAgICAgICBpZiAob25DcmVhdGVPcHRpb24pIG9uQ3JlYXRlT3B0aW9uKGlucHV0VmFsdWUpO2Vsc2Uge1xuICAgICAgICAgICAgdmFyIG5ld09wdGlvbkRhdGEgPSBnZXROZXdPcHRpb25EYXRhKGlucHV0VmFsdWUsIGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgdmFyIG5ld0FjdGlvbk1ldGEgPSB7IGFjdGlvbjogJ2NyZWF0ZS1vcHRpb24nIH07XG4gICAgICAgICAgICBpZiAoaXNNdWx0aSkge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkoY2xlYW5WYWx1ZSh2YWx1ZSkpLCBbbmV3T3B0aW9uRGF0YV0pLCBuZXdBY3Rpb25NZXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKG5ld09wdGlvbkRhdGEsIG5ld0FjdGlvbk1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb25DaGFuZ2UobmV3VmFsdWUsIGFjdGlvbk1ldGEpO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zIHx8IFtdO1xuICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5ld09wdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICB9O1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIGNyZWF0ZUNsYXNzKENyZWF0YWJsZSwgW3tcbiAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHZhciBhbGxvd0NyZWF0ZVdoaWxlTG9hZGluZyA9IG5leHRQcm9wcy5hbGxvd0NyZWF0ZVdoaWxlTG9hZGluZyxcbiAgICAgICAgICAgIGNyZWF0ZU9wdGlvblBvc2l0aW9uID0gbmV4dFByb3BzLmNyZWF0ZU9wdGlvblBvc2l0aW9uLFxuICAgICAgICAgICAgZm9ybWF0Q3JlYXRlTGFiZWwgPSBuZXh0UHJvcHMuZm9ybWF0Q3JlYXRlTGFiZWwsXG4gICAgICAgICAgICBnZXROZXdPcHRpb25EYXRhID0gbmV4dFByb3BzLmdldE5ld09wdGlvbkRhdGEsXG4gICAgICAgICAgICBpbnB1dFZhbHVlID0gbmV4dFByb3BzLmlucHV0VmFsdWUsXG4gICAgICAgICAgICBpc0xvYWRpbmcgPSBuZXh0UHJvcHMuaXNMb2FkaW5nLFxuICAgICAgICAgICAgaXNWYWxpZE5ld09wdGlvbiA9IG5leHRQcm9wcy5pc1ZhbGlkTmV3T3B0aW9uLFxuICAgICAgICAgICAgdmFsdWUgPSBuZXh0UHJvcHMudmFsdWU7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXh0UHJvcHMub3B0aW9ucyB8fCBbXTtcbiAgICAgICAgdmFyIG5ld09wdGlvbiA9IHRoaXMuc3RhdGUubmV3T3B0aW9uO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkTmV3T3B0aW9uKGlucHV0VmFsdWUsIGNsZWFuVmFsdWUodmFsdWUpLCBvcHRpb25zKSkge1xuICAgICAgICAgIG5ld09wdGlvbiA9IGdldE5ld09wdGlvbkRhdGEoaW5wdXRWYWx1ZSwgZm9ybWF0Q3JlYXRlTGFiZWwoaW5wdXRWYWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld09wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuZXdPcHRpb246IG5ld09wdGlvbixcbiAgICAgICAgICBvcHRpb25zOiAoYWxsb3dDcmVhdGVXaGlsZUxvYWRpbmcgfHwgIWlzTG9hZGluZykgJiYgbmV3T3B0aW9uID8gY3JlYXRlT3B0aW9uUG9zaXRpb24gPT09ICdmaXJzdCcgPyBbbmV3T3B0aW9uXS5jb25jYXQodG9Db25zdW1hYmxlQXJyYXkob3B0aW9ucykpIDogW10uY29uY2F0KHRvQ29uc3VtYWJsZUFycmF5KG9wdGlvbnMpLCBbbmV3T3B0aW9uXSkgOiBvcHRpb25zXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ2ZvY3VzJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdibHVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgICB0aGlzLnNlbGVjdC5ibHVyKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHZhciBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHRoaXMucHJvcHMsIFtdKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLnN0YXRlLm9wdGlvbnM7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0Q29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICAgICAgICByZWY6IGZ1bmN0aW9uIHJlZihfcmVmKSB7XG4gICAgICAgICAgICBfdGhpczIuc2VsZWN0ID0gX3JlZjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2VcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gQ3JlYXRhYmxlO1xuICB9KENvbXBvbmVudCksIF9jbGFzcy5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHMkMiwgX3RlbXA7XG59O1xudmFyIENyZWF0YWJsZSA9IG1hbmFnZVN0YXRlKG1ha2VDcmVhdGFibGVTZWxlY3QoU2VsZWN0KSk7XG5cbnZhciBBc3luY0NyZWF0YWJsZSA9IG1ha2VBc3luY1NlbGVjdChtYW5hZ2VTdGF0ZShtYWtlQ3JlYXRhYmxlU2VsZWN0KFNlbGVjdCkpKTtcblxudmFyIGluZGV4ID0gbWFuYWdlU3RhdGUoU2VsZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG5leHBvcnQgeyBTZWxlY3QgYXMgU2VsZWN0QmFzZSwgQXN5bmMsIEFzeW5jQ3JlYXRhYmxlLCBDcmVhdGFibGUsIGNyZWF0ZUZpbHRlciwgY29tcG9uZW50cywgbWVyZ2VTdHlsZXMgfTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyAobW9kdWxlWydleHBvcnRzJ10gPSBmYWN0b3J5KCkpIDpcblx0XHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10gPyBkZWZpbmUoZmFjdG9yeSgpKSA6XG5cdFx0XHQod2luZG93WydzdHlsaXNSdWxlU2hlZXQnXSA9IGZhY3RvcnkoKSlcbn0oZnVuY3Rpb24gKCkge1xuXG5cdCd1c2Ugc3RyaWN0J1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5zZXJ0UnVsZSkge1xuXHRcdHZhciBkZWxpbWl0ZXIgPSAnLyp8Ki8nXG5cdFx0dmFyIG5lZWRsZSA9IGRlbGltaXRlcisnfSdcblxuXHRcdGZ1bmN0aW9uIHRvU2hlZXQgKGJsb2NrKSB7XG5cdFx0XHRpZiAoYmxvY2spXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aW5zZXJ0UnVsZShibG9jayArICd9Jylcblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gcnVsZVNoZWV0IChjb250ZXh0LCBjb250ZW50LCBzZWxlY3RvcnMsIHBhcmVudHMsIGxpbmUsIGNvbHVtbiwgbGVuZ3RoLCBucywgZGVwdGgsIGF0KSB7XG5cdFx0XHRzd2l0Y2ggKGNvbnRleHQpIHtcblx0XHRcdFx0Ly8gcHJvcGVydHlcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdC8vIEBpbXBvcnRcblx0XHRcdFx0XHRpZiAoZGVwdGggPT09IDAgJiYgY29udGVudC5jaGFyQ29kZUF0KDApID09PSA2NClcblx0XHRcdFx0XHRcdHJldHVybiBpbnNlcnRSdWxlKGNvbnRlbnQrJzsnKSwgJydcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHQvLyBzZWxlY3RvclxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0aWYgKG5zID09PSAwKVxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbnRlbnQgKyBkZWxpbWl0ZXJcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHQvLyBhdC1ydWxlXG5cdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRzd2l0Y2ggKG5zKSB7XG5cdFx0XHRcdFx0XHQvLyBAZm9udC1mYWNlLCBAcGFnZVxuXHRcdFx0XHRcdFx0Y2FzZSAxMDI6XG5cdFx0XHRcdFx0XHRjYXNlIDExMjpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGluc2VydFJ1bGUoc2VsZWN0b3JzWzBdK2NvbnRlbnQpLCAnJ1xuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbnRlbnQgKyAoYXQgPT09IDAgPyBkZWxpbWl0ZXIgOiAnJylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgLTI6XG5cdFx0XHRcdFx0Y29udGVudC5zcGxpdChuZWVkbGUpLmZvckVhY2godG9TaGVldClcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pKVxuIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGVlanM7IiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzLmkxOG47IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5jb21wb25lbnRzOyIsIm1vZHVsZS5leHBvcnRzID0gd3AuZGF0YTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdwLmVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzLnZlbmRvci5sb2Rhc2g7IiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzLnZlbmRvci5tb21lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzLnZlbmRvci5yZWFjdDsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLnJlYWN0RG9tOyJdLCJzb3VyY2VSb290IjoiIn0=
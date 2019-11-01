this["eejs"] = this["eejs"] || {}; this["eejs"]["hooks"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/hooks/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/hooks/index.js":
/*!***********************************!*\
  !*** ./assets/src/hooks/index.js ***!
  \***********************************/
/*! exports provided: useAddPriceModifier, useBasePriceType, useCloneEntities, useCopyDateEntity, useCopyTicket, useCreateDateEntity, useCreateRelationForEventToEventDate, useCreateRelationsForEventDateToTickets, useCreateRelationsForEventDateIdToTicketIds, useCreateRelationsForTicketToEventDates, useCreateRelationsForTicketToPrices, useCreateTicketEntity, useEndDateAfterStartDateValidator, useEndDateChangeListener, useEntityDateChangeListeners, useEntityDateChangeValidators, useEventDateEvent, useEventDateTickets, useEventDatesForEvent, useEventEditorEvent, useEventEditorEventDates, useEventEditorTickets, useEventForEventDate, useEventVenue, usePriceTypes, useRemoveRelationsForEventDateIdToTicketIds, useStartDateChangeListener, useTicketEventDates, useTicketPrices, useTicketsForEventDates, useTrashDateEntity, useTrashPriceModifier, useTrashTicket, usePrevious */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _use_add_price_modifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-add-price-modifier */ "./assets/src/hooks/use-add-price-modifier.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAddPriceModifier", function() { return _use_add_price_modifier__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _use_base_price_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-base-price-type */ "./assets/src/hooks/use-base-price-type.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useBasePriceType", function() { return _use_base_price_type__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _use_clone_entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-clone-entities */ "./assets/src/hooks/use-clone-entities.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCloneEntities", function() { return _use_clone_entities__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _use_copy_date_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-copy-date-entity */ "./assets/src/hooks/use-copy-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCopyDateEntity", function() { return _use_copy_date_entity__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _use_copy_ticket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-copy-ticket */ "./assets/src/hooks/use-copy-ticket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCopyTicket", function() { return _use_copy_ticket__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _use_create_date_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-create-date-entity */ "./assets/src/hooks/use-create-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateDateEntity", function() { return _use_create_date_entity__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _use_create_relation_for_event_to_event_date__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./use-create-relation-for-event-to-event-date */ "./assets/src/hooks/use-create-relation-for-event-to-event-date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateRelationForEventToEventDate", function() { return _use_create_relation_for_event_to_event_date__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _use_create_relations_for_event_date_to_tickets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./use-create-relations-for-event-date-to-tickets */ "./assets/src/hooks/use-create-relations-for-event-date-to-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateRelationsForEventDateToTickets", function() { return _use_create_relations_for_event_date_to_tickets__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _use_create_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./use-create-relations-for-event-date-id-to-ticket-ids */ "./assets/src/hooks/use-create-relations-for-event-date-id-to-ticket-ids.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateRelationsForEventDateIdToTicketIds", function() { return _use_create_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _use_create_relations_for_ticket_to_event_dates__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./use-create-relations-for-ticket-to-event-dates */ "./assets/src/hooks/use-create-relations-for-ticket-to-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateRelationsForTicketToEventDates", function() { return _use_create_relations_for_ticket_to_event_dates__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./use-create-relations-for-ticket-to-prices */ "./assets/src/hooks/use-create-relations-for-ticket-to-prices.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateRelationsForTicketToPrices", function() { return _use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _use_create_ticket_entity__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./use-create-ticket-entity */ "./assets/src/hooks/use-create-ticket-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCreateTicketEntity", function() { return _use_create_ticket_entity__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _use_end_date_after_start_date_validator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./use-end-date-after-start-date-validator */ "./assets/src/hooks/use-end-date-after-start-date-validator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEndDateAfterStartDateValidator", function() { return _use_end_date_after_start_date_validator__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _use_end_date_change_listener__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./use-end-date-change-listener */ "./assets/src/hooks/use-end-date-change-listener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEndDateChangeListener", function() { return _use_end_date_change_listener__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _use_entity_date_change_listeners__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./use-entity-date-change-listeners */ "./assets/src/hooks/use-entity-date-change-listeners.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEntityDateChangeListeners", function() { return _use_entity_date_change_listeners__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _use_entity_date_change_validators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./use-entity-date-change-validators */ "./assets/src/hooks/use-entity-date-change-validators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEntityDateChangeValidators", function() { return _use_entity_date_change_validators__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _use_event_date_event__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./use-event-date-event */ "./assets/src/hooks/use-event-date-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDateEvent", function() { return _use_event_date_event__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _use_event_date_tickets__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./use-event-date-tickets */ "./assets/src/hooks/use-event-date-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDateTickets", function() { return _use_event_date_tickets__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _use_event_dates_for_event__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./use-event-dates-for-event */ "./assets/src/hooks/use-event-dates-for-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDatesForEvent", function() { return _use_event_dates_for_event__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _use_event_editor_event__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./use-event-editor-event */ "./assets/src/hooks/use-event-editor-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorEvent", function() { return _use_event_editor_event__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _use_event_editor_event_dates__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./use-event-editor-event-dates */ "./assets/src/hooks/use-event-editor-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorEventDates", function() { return _use_event_editor_event_dates__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _use_event_editor_tickets__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./use-event-editor-tickets */ "./assets/src/hooks/use-event-editor-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorTickets", function() { return _use_event_editor_tickets__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _use_event_for_event_date__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./use-event-for-event-date */ "./assets/src/hooks/use-event-for-event-date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventForEventDate", function() { return _use_event_for_event_date__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _use_event_venue__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./use-event-venue */ "./assets/src/hooks/use-event-venue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventVenue", function() { return _use_event_venue__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _use_price_types__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./use-price-types */ "./assets/src/hooks/use-price-types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePriceTypes", function() { return _use_price_types__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _use_remove_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./use-remove-relations-for-event-date-id-to-ticket-ids */ "./assets/src/hooks/use-remove-relations-for-event-date-id-to-ticket-ids.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRemoveRelationsForEventDateIdToTicketIds", function() { return _use_remove_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _use_start_date_change_listener__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./use-start-date-change-listener */ "./assets/src/hooks/use-start-date-change-listener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useStartDateChangeListener", function() { return _use_start_date_change_listener__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _use_ticket_event_dates__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./use-ticket-event-dates */ "./assets/src/hooks/use-ticket-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketEventDates", function() { return _use_ticket_event_dates__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _use_ticket_prices__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./use-ticket-prices */ "./assets/src/hooks/use-ticket-prices.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketPrices", function() { return _use_ticket_prices__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _use_tickets_for_event_dates__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./use-tickets-for-event-dates */ "./assets/src/hooks/use-tickets-for-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketsForEventDates", function() { return _use_tickets_for_event_dates__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _use_trash_date_entity__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./use-trash-date-entity */ "./assets/src/hooks/use-trash-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashDateEntity", function() { return _use_trash_date_entity__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _use_trash_price_modifier__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./use-trash-price-modifier */ "./assets/src/hooks/use-trash-price-modifier.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashPriceModifier", function() { return _use_trash_price_modifier__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _use_trash_ticket__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./use-trash-ticket */ "./assets/src/hooks/use-trash-ticket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashTicket", function() { return _use_trash_ticket__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _use_previous__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./use-previous */ "./assets/src/hooks/use-previous.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePrevious", function() { return _use_previous__WEBPACK_IMPORTED_MODULE_33__["default"]; });




































/***/ }),

/***/ "./assets/src/hooks/use-add-price-modifier.js":
/*!****************************************************!*\
  !*** ./assets/src/hooks/use-add-price-modifier.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__);



/**
 * External imports
 */



/**
 * useAddPriceModifier
 * returns an object containing the following two functions:
 *  - addPriceModifier
 *  - trashPriceModifier
 *
 * @return {Object} functions
 */

var useAddPriceModifier = function useAddPriceModifier() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity,
      createRelation = _useDispatch.createRelation;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ticketEntity, properties) {
      var priceModifier;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return createEntity('price', properties);

            case 2:
              priceModifier = _context.sent;

              if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__["isModelEntityOfModel"])(priceModifier, 'price')) {
                createRelation('ticket', ticketEntity.id, 'price', priceModifier);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), []);
};

/* harmony default export */ __webpack_exports__["default"] = (useAddPriceModifier);

/***/ }),

/***/ "./assets/src/hooks/use-base-price-type.js":
/*!*************************************************!*\
  !*** ./assets/src/hooks/use-base-price-type.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _use_price_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-price-types */ "./assets/src/hooks/use-price-types.js");
/**
 * External dependencies
 */


/**
 * Internal dependencies
 */



var useBasePriceType = function useBasePriceType() {
  var _usePriceTypes = Object(_use_price_types__WEBPACK_IMPORTED_MODULE_2__["default"])(),
      priceTypes = _usePriceTypes.priceTypes,
      priceTypesLoaded = _usePriceTypes.priceTypesLoaded;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    if (!priceTypesLoaded) {
      return null;
    }

    return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["find"])(priceTypes, function (priceType) {
      return priceType.PBT_ID === 1;
    });
  }, [priceTypes, priceTypesLoaded]);
};

/* harmony default export */ __webpack_exports__["default"] = (useBasePriceType);

/***/ }),

/***/ "./assets/src/hooks/use-clone-entities.js":
/*!************************************************!*\
  !*** ./assets/src/hooks/use-clone-entities.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);



/**
 * External imports
 */



var useCloneEntities = function useCloneEntities() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(entitiesToClone, modelName) {
      var newEntities, i, newClone;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newEntities = [];

              if (!(entitiesToClone && modelName)) {
                _context.next = 11;
                break;
              }

              i = 0;

            case 3:
              if (!(i < entitiesToClone.length)) {
                _context.next = 11;
                break;
              }

              _context.next = 6;
              return createEntity(modelName, entitiesToClone[i].forClone);

            case 6:
              newClone = _context.sent;
              newEntities.push(newClone);

            case 8:
              i++;
              _context.next = 3;
              break;

            case 11:
              return _context.abrupt("return", newEntities);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = (useCloneEntities);

/***/ }),

/***/ "./assets/src/hooks/use-copy-date-entity.js":
/*!**************************************************!*\
  !*** ./assets/src/hooks/use-copy-date-entity.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index */ "./assets/src/hooks/index.js");



/**
 * External imports
 */






/**
 * Internal imports
 */


/**
 * @function
 * @param {BaseEntity} eventDate
 * @return {Function} function for copying an event date entity
 */

var useCopyDateEntity = function useCopyDateEntity(eventDate) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity,
      createRelations = _useDispatch.createRelations;

  var _useEventEditorEvent = Object(_index__WEBPACK_IMPORTED_MODULE_8__["useEventEditorEvent"])(eventDate.evtId),
      eventEntity = _useEventEditorEvent.eventEntity;

  var _useTicketsForEventDa = Object(_index__WEBPACK_IMPORTED_MODULE_8__["useTicketsForEventDates"])([eventDate]),
      ticketEntities = _useTicketsForEventDa.ticketEntities;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(click) {
      var newEventDate;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_5__["cancelClickEvent"])(click);

              if (!(!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__["isModelEntityOfModel"])(eventEntity, 'event') || !Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__["isModelEntityOfModel"])(eventDate, 'datetime'))) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", null);

            case 3:
              _context.next = 5;
              return createEntity('datetime', eventDate.forClone);

            case 5:
              newEventDate = _context.sent;
              newEventDate.name = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["_x"])('%s - COPY', 'Event Date Name - COPY', 'event_espresso'), newEventDate.name);

              if (!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(ticketEntities)) {
                createRelations('datetime', newEventDate.id, 'ticket', ticketEntities);
              }

              createRelations('event', eventEntity.id, 'datetime', [newEventDate]);
              return _context.abrupt("return", newEventDate);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }(), [eventEntity, ticketEntities]);
};

/* harmony default export */ __webpack_exports__["default"] = (useCopyDateEntity);

/***/ }),

/***/ "./assets/src/hooks/use-copy-ticket.js":
/*!*********************************************!*\
  !*** ./assets/src/hooks/use-copy-ticket.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _use_clone_entities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-clone-entities */ "./assets/src/hooks/use-clone-entities.js");
/* harmony import */ var _use_create_relations_for_ticket_to_event_dates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./use-create-relations-for-ticket-to-event-dates */ "./assets/src/hooks/use-create-relations-for-ticket-to-event-dates.js");
/* harmony import */ var _use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./use-create-relations-for-ticket-to-prices */ "./assets/src/hooks/use-create-relations-for-ticket-to-prices.js");



/**
 * External imports
 */



/**
 * Internal dependencies
 */





var falseFunc = function falseFunc() {
  return false;
};

var useCopyTicket = function useCopyTicket(ticketEntity, dateEntities) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity;

  var relatedPrices = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(function (select) {
    var _select = select('eventespresso/core'),
        getRelatedEntities = _select.getRelatedEntities;

    return getRelatedEntities(ticketEntity, 'prices');
  }, [ticketEntity]);
  var newPrices = Object(_use_clone_entities__WEBPACK_IMPORTED_MODULE_5__["default"])(relatedPrices, 'price');
  var updateTicketDateRelations = Object(_use_create_relations_for_ticket_to_event_dates__WEBPACK_IMPORTED_MODULE_6__["default"])();
  var updateTicketPriceRelations = Object(_use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_7__["default"])();
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var newTicket;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__["isModelEntityOfModel"])(ticketEntity, 'ticket')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", falseFunc);

          case 2:
            _context.next = 4;
            return createEntity('ticket', ticketEntity.forClone);

          case 4:
            newTicket = _context.sent;
            updateTicketDateRelations(newTicket, dateEntities);

            if (!(Array.isArray(newPrices) && newPrices.length)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return updateTicketPriceRelations(newTicket, newPrices);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (useCopyTicket);

/***/ }),

/***/ "./assets/src/hooks/use-create-date-entity.js":
/*!****************************************************!*\
  !*** ./assets/src/hooks/use-create-date-entity.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _use_create_relation_for_event_to_event_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-create-relation-for-event-to-event-date */ "./assets/src/hooks/use-create-relation-for-event-to-event-date.js");



/**
 * External imports
 */



/**
 * Internal dependencies
 */



var useCreateDateEntity = function useCreateDateEntity(event, cacheNewDate) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity;

  var updateEventDateRelation = Object(_use_create_relation_for_event_to_event_date__WEBPACK_IMPORTED_MODULE_5__["default"])();
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var nowJs, now, newDate;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nowJs = new Date();
            nowJs.setHours(nowJs.getHours(), Math.ceil(nowJs.getMinutes() / 15) * 15, 0, 0);
            now = _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__["ServerDateTime"].fromJSDate(nowJs);
            _context.next = 5;
            return createEntity('datetime', {
              EVT_ID: event.id,
              DTT_name: '',
              DTT_description: '',
              DTT_EVT_start: now.plus(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__["Duration"].fromObject({
                days: 30
              })),
              DTT_EVT_end: now.plus(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__["Duration"].fromObject({
                days: 30,
                hours: 2
              })),
              DTT_reg_limit: -1,
              DTT_sold: 0,
              DTT_reserved: 0,
              DTT_order: 0,
              DTT_parent: 0,
              DTT_deleted: false
            });

          case 5:
            newDate = _context.sent;
            _context.next = 8;
            return updateEventDateRelation(event, newDate);

          case 8:
            cacheNewDate(newDate);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [event, cacheNewDate]);
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateDateEntity);

/***/ }),

/***/ "./assets/src/hooks/use-create-relation-for-event-to-event-date.js":
/*!*************************************************************************!*\
  !*** ./assets/src/hooks/use-create-relation-for-event-to-event-date.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External imports
 */




/**
 * This custom hook returns a function handling the dispatch event for updating
 * an event -> date relation between the event entity and date entity.
 *
 * The returned function receives the following arguments:
 *  -  event entity
 *  -  event date entity
 *
 * @return {function}  A function for updating the event date relation.
 */

var useCreateRelationForEventToEventDate = function useCreateRelationForEventToEventDate() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])('eventespresso/core'),
      createRelation = _useDispatch.createRelation;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (eventEntity, dateEntity) {
    if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntityOfModel"])(eventEntity, 'event')) {
      throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Unable to create relation because an invalid Event Entity was supplied.', 'event_espresso'));
    }

    if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntityOfModel"])(dateEntity, 'datetime')) {
      throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Unable to create relation because an invalid Date Entity was supplied.', 'event_espresso'));
    }

    return createRelation('event', eventEntity.id, 'datetime', dateEntity);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateRelationForEventToEventDate);

/***/ }),

/***/ "./assets/src/hooks/use-create-relations-for-event-date-id-to-ticket-ids.js":
/*!**********************************************************************************!*\
  !*** ./assets/src/hooks/use-create-relations-for-event-date-id-to-ticket-ids.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External imports
 */




/**
 * Returns a function handling the dispatch event for updating relations
 * between an event date entity and one or more ticket entities.
 *
 * The returned function receives the following arguments:
 *  -  eventDateId ID for event date entity
 *  -  ticketIds array of ticket entity IDs
 *
 * @return {function}  A function for updating the ticket relation.
 */

var useCreateRelationsForEventDateIdToTicketIds = function useCreateRelationsForEventDateIdToTicketIds() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createRelations = _useDispatch.createRelations;

  var _useSelect = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(function (select) {
    return select('eventespresso/core');
  }, []),
      getEntitiesByIds = _useSelect.getEntitiesByIds;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(eventDateId, ticketIds) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise(
              /*#__PURE__*/
              function () {
                var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
                /*#__PURE__*/
                _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve) {
                  var tickets;
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return getEntitiesByIds('ticket', ticketIds);

                        case 2:
                          tickets = _context.sent;
                          tickets = Array.isArray(tickets) ? tickets : [tickets];
                          tickets.forEach(function (ticket) {
                            if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(ticket, 'ticket')) {
                              throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Ticket Entity was supplied.', 'event_espresso'));
                            }
                          });
                          _context.next = 7;
                          return createRelations('datetime', eventDateId, 'ticket', tickets);

                        case 7:
                          resolve(true);

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateRelationsForEventDateIdToTicketIds);

/***/ }),

/***/ "./assets/src/hooks/use-create-relations-for-event-date-to-tickets.js":
/*!****************************************************************************!*\
  !*** ./assets/src/hooks/use-create-relations-for-event-date-to-tickets.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External imports
 */




/**
 * Returns a function handling the dispatch event for updating relations
 * between an event date entity and one or more ticket entities.
 *
 * The returned function receives the following arguments:
 *  -  eventDate entity
 *  -  tickets array of ticket entities
 *
 * @return {function}  A function for updating the ticket relation.
 */

var useCreateRelationsForEventDateToTickets = function useCreateRelationsForEventDateToTickets() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createRelations = _useDispatch.createRelations;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(eventDate, tickets) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(eventDate, 'datetime')) {
                _context.next = 2;
                break;
              }

              throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Event Date Entity was supplied.', 'event_espresso'));

            case 2:
              tickets = Array.isArray(tickets) ? tickets : [tickets];
              tickets.forEach(function (ticket) {
                if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(ticket, 'ticket')) {
                  throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Ticket Entity was supplied.', 'event_espresso'));
                }
              });
              _context.next = 6;
              return createRelations('datetime', eventDate, 'ticket', tickets);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateRelationsForEventDateToTickets);

/***/ }),

/***/ "./assets/src/hooks/use-create-relations-for-ticket-to-event-dates.js":
/*!****************************************************************************!*\
  !*** ./assets/src/hooks/use-create-relations-for-ticket-to-event-dates.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External imports
 */




/**
 * Returns a function handling the dispatch event for updating relations
 * between a ticket entity and one or more event date entities.
 *
 * The returned function receives the following arguments:
 *  -  ticket entity
 *  -  eventDates array of event date entities
 *
 * @return {function}  A function for updating the ticket relation.
 */

var useCreateRelationsForTicketToEventDates = function useCreateRelationsForTicketToEventDates() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createRelations = _useDispatch.createRelations;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ticket, eventDates) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(ticket, 'ticket')) {
                _context.next = 2;
                break;
              }

              throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Ticket Entity was supplied.', 'event_espresso'));

            case 2:
              eventDates = Array.isArray(eventDates) ? eventDates : [eventDates];
              eventDates.forEach(function (eventDate) {
                if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(eventDate, 'datetime')) {
                  throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Event Date Entity was supplied.', 'event_espresso'));
                }
              });
              _context.next = 6;
              return createRelations('ticket', ticket.id, 'datetime', eventDates);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateRelationsForTicketToEventDates);

/***/ }),

/***/ "./assets/src/hooks/use-create-relations-for-ticket-to-prices.js":
/*!***********************************************************************!*\
  !*** ./assets/src/hooks/use-create-relations-for-ticket-to-prices.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External imports
 */




/**
 * Returns a function handling the dispatch event for updating relations
 * between a ticket entity and one or more price entities.
 *
 * The returned function receives the following arguments:
 *  -  ticket entity
 *  -  prices array of price entities
 *
 * @return {function}  A function for updating the ticket relation.
 */

var useCreateRelationsForTicketToPrices = function useCreateRelationsForTicketToPrices() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createRelations = _useDispatch.createRelations;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ticket, prices) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(ticket, 'ticket')) {
                _context.next = 2;
                break;
              }

              throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Ticket Entity was supplied.', 'event_espresso'));

            case 2:
              prices = Array.isArray(prices) ? prices : [prices];
              prices.forEach(function (price) {
                if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(price, 'price')) {
                  throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to create relation because an invalid Price Entity was supplied.', 'event_espresso'));
                }
              });
              _context.next = 6;
              return createRelations('ticket', ticket.id, 'price', prices);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateRelationsForTicketToPrices);

/***/ }),

/***/ "./assets/src/hooks/use-create-ticket-entity.js":
/*!******************************************************!*\
  !*** ./assets/src/hooks/use-create-ticket-entity.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./use-create-relations-for-ticket-to-prices */ "./assets/src/hooks/use-create-relations-for-ticket-to-prices.js");




/**
 * External imports
 */



var userID = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(window.userSettings) === 'object' && window.userSettings.uid ? parseInt(window.userSettings.uid, 10) : null;
/**
 * Internal dependencies
 */



var useCreateTicketEntity = function useCreateTicketEntity(cacheNewTicket, basePriceType) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity;

  var updateTicketPriceRelations = Object(_use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_6__["default"])();
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var nowJs, now, newTicket, newBasePrice;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nowJs = new Date();
            nowJs.setHours(nowJs.getHours(), Math.ceil(nowJs.getMinutes() / 15) * 15, 0, 0);
            now = _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5__["ServerDateTime"].fromJSDate(nowJs);
            _context.next = 5;
            return createEntity('ticket', {
              TKT_name: '',
              TKT_description: '',
              TKT_qty: -1,
              TKT_sold: 0,
              TKT_reserved: 0,
              TKT_uses: -1,
              TKT_required: false,
              TKT_min: 0,
              TKT_max: -1,
              TKT_price: new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5__["Money"](0, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5__["SiteCurrency"]),
              TKT_startDate: now,
              TKT_endDate: now.plus(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_5__["Duration"].fromObject({
                days: 30
              })),
              TKT_taxable: false,
              TKT_order: 0,
              TKT_isDefault: false,
              TKT_reverse_calculate: false,
              TKT_wp_user: userID,
              TKT_parent: 0,
              TKT_deleted: false
            });

          case 5:
            newTicket = _context.sent;
            _context.next = 8;
            return createEntity('price', {
              PRT_ID: basePriceType.id
            });

          case 8:
            newBasePrice = _context.sent;
            _context.next = 11;
            return updateTicketPriceRelations(newTicket, [newBasePrice]);

          case 11:
            cacheNewTicket(newTicket);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [createEntity, updateTicketPriceRelations]);
};

/* harmony default export */ __webpack_exports__["default"] = (useCreateTicketEntity);

/***/ }),

/***/ "./assets/src/hooks/use-end-date-after-start-date-validator.js":
/*!*********************************************************************!*\
  !*** ./assets/src/hooks/use-end-date-after-start-date-validator.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */



var useEndDateAfterStartDateValidator = function useEndDateAfterStartDateValidator(_ref) {
  var entity = _ref.entity,
      dateProps = _ref.dateProps;

  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntity"])(entity)) {
    throw new TypeError('Invalid Entity supplied to useEndDateChangeValidator');
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (endDate) {
    var startDate = entity[dateProps.start].toJSDate(); // Set the time to midnight
    // so as not to disable the same start and end day

    endDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    return endDate - startDate < 0;
  }, [entity[dateProps.start]]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEndDateAfterStartDateValidator);

/***/ }),

/***/ "./assets/src/hooks/use-end-date-change-listener.js":
/*!**********************************************************!*\
  !*** ./assets/src/hooks/use-end-date-change-listener.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External imports
 */




/**
 * Verifies that end date value has changed and updates entity accordingly.
 *
 * @function
 * @param {Object} props
 * @member {Object} entity
 * @member {Object} dateProps
 * @member {string} startDateFormKey identifier for React Final Form data schema
 * @member {string} endDateFormKey identifier for React Final Form data schema
 * @member {Function} updateField callback for editing a field
 * @member {Function} touchField callback for marking field as changed
 * @return {Object} entityStartDate & entityEndDate
 */

var useEndDateChangeListener = function useEndDateChangeListener(_ref) {
  var entity = _ref.entity,
      dateProps = _ref.dateProps,
      startDateFormKey = _ref.startDateFormKey,
      endDateFormKey = _ref.endDateFormKey,
      updateField = _ref.updateField,
      touchField = _ref.touchField;

  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntity"])(entity)) {
    throw new TypeError('Invalid Entity supplied to useStartDateChangeListener');
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (newDateValue, prevDateValue) {
    if (newDateValue && newDateValue !== prevDateValue) {
      var newDate = Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_1__["getServerDateTime"])(newDateValue);

      if (newDate instanceof _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"]) {
        entity[dateProps.end] = newDate;
      }

      touchField(startDateFormKey);
      touchField(endDateFormKey);
    }
  }, [entity[dateProps.start], entity[dateProps.end], startDateFormKey, endDateFormKey, updateField, touchField]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEndDateChangeListener);

/***/ }),

/***/ "./assets/src/hooks/use-entity-date-change-listeners.js":
/*!**************************************************************!*\
  !*** ./assets/src/hooks/use-entity-date-change-listeners.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _use_end_date_change_listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-end-date-change-listener */ "./assets/src/hooks/use-end-date-change-listener.js");
/* harmony import */ var _use_start_date_change_listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-start-date-change-listener */ "./assets/src/hooks/use-start-date-change-listener.js");
/**
 * Internal imports
 */


/**
 * Verifies that end date value has changed and updates entity accordingly.
 *
 * @function
 * @param {Object} props
 * @member {Object} entity
 * @member {Object} dateProps
 * @member {string} startDateFormKey identifier for React Final Form data schema
 * @member {string} endDateFormKey identifier for React Final Form data schema
 * @member {Function} updateField callback for editing a field
 * @member {Function} touchField callback for marking field as changed
 * @return {Object} entityStartDate & entityEndDate
 */

var useEntityDateChangeListeners = function useEntityDateChangeListeners(props) {
  return {
    startDateChangeListener: Object(_use_start_date_change_listener__WEBPACK_IMPORTED_MODULE_1__["default"])(props),
    endDateChangeListener: Object(_use_end_date_change_listener__WEBPACK_IMPORTED_MODULE_0__["default"])(props)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useEntityDateChangeListeners);

/***/ }),

/***/ "./assets/src/hooks/use-entity-date-change-validators.js":
/*!***************************************************************!*\
  !*** ./assets/src/hooks/use-entity-date-change-validators.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External imports
 */





var useEndDateChangeValidator = function useEndDateChangeValidator(_ref) {
  var entity = _ref.entity,
      dateProps = _ref.dateProps;

  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntity"])(entity)) {
    throw new TypeError('Invalid Entity supplied to useEndDateChangeValidator');
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (newDateValue) {
    if (newDateValue) {
      var endDate = Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["getServerDateTime"])(newDateValue);

      if (endDate < entity[dateProps.start]) {
        return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('End Date & Time must be set later than the Start Date & Time', 'event_espresso');
      }
    }
  }, []);
};

var useStartDateChangeValidator = function useStartDateChangeValidator(_ref2) {
  var entity = _ref2.entity,
      dateProps = _ref2.dateProps;

  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntity"])(entity)) {
    throw new TypeError('Invalid Entity supplied to useStartDateChangeValidator');
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (newDateValue) {
    if (newDateValue) {
      var startDate = Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["getServerDateTime"])(newDateValue);

      if (startDate > entity[dateProps.end]) {
        return Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('End Date & Time must be set later than the Start Date & Time', 'event_espresso');
      }
    }
  }, []);
};

var useEntityDateChangeValidators = function useEntityDateChangeValidators(props) {
  return {
    startDateChangeValidator: useStartDateChangeValidator(props),
    endDateChangeValidator: useEndDateChangeValidator(props)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useEntityDateChangeValidators);

/***/ }),

/***/ "./assets/src/hooks/use-event-date-event.js":
/*!**************************************************!*\
  !*** ./assets/src/hooks/use-event-date-event.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports.
 */



var DEFAULT = {
  event: [],
  eventLoaded: false
};
/**
 * A custom react hook for retrieving the related event entity
 * for the given date entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  an event date entity
 * @return {Object} - the event for the supplied event date
 *                  - boolean indicating if loading is completed
 */

var useEventDateEvent = function useEventDateEvent(eventDate) {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useSelect"])(function (select) {
    if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(eventDate, 'datetime')) {
      warning__WEBPACK_IMPORTED_MODULE_0___default()(false, 'The provided value is not a valid datetime entity.');
      return DEFAULT;
    }

    var _select = select('eventespresso/core'),
        getRelatedEntities = _select.getRelatedEntities;

    var _select2 = select('core/data'),
        hasFinishedResolution = _select2.hasFinishedResolution;

    var event = getRelatedEntities(eventDate, 'event');
    var eventLoaded = hasFinishedResolution('getRelatedEntities', [eventDate, 'event']);

    if (eventLoaded) {
      event = Array.isArray(event) && event[0] && Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(event[0], 'event') ? event[0] : null;
      return {
        event: event,
        eventLoaded: eventLoaded
      };
    }

    return DEFAULT;
  }, [eventDate]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventDateEvent);

/***/ }),

/***/ "./assets/src/hooks/use-event-date-tickets.js":
/*!****************************************************!*\
  !*** ./assets/src/hooks/use-event-date-tickets.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports.
 */



var DEFAULT = {
  tickets: [],
  ticketsLoaded: false
};
/**
 * A custom react hook for retrieving the related ticket entities for the given
 * date entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  A datetime BaseEntity instance.
 * @return {Object} - an array of tickets
 *                  - boolean indicating if loading is completed
 */

var useEventDateTickets = function useEventDateTickets(eventDate) {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(eventDate, 'datetime')) {
      warning__WEBPACK_IMPORTED_MODULE_2___default()(false, 'The provided value is not a valid datetime entity.');
      return DEFAULT;
    }

    var _select = select('eventespresso/core'),
        getRelatedEntities = _select.getRelatedEntities;

    var _select2 = select('core/data'),
        hasFinishedResolution = _select2.hasFinishedResolution;

    var tickets = getRelatedEntities(eventDate, 'ticket');
    var ticketsLoaded = hasFinishedResolution('eventespresso/core', 'getRelatedEntities', [eventDate, 'ticket']);
    return {
      tickets: tickets,
      ticketsLoaded: ticketsLoaded
    };
  }, [eventDate]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventDateTickets);

/***/ }),

/***/ "./assets/src/hooks/use-event-dates-for-event.js":
/*!*******************************************************!*\
  !*** ./assets/src/hooks/use-event-dates-for-event.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports.
 */


var DEFAULT = {
  dateEntities: [],
  dateEntitiesLoaded: false
};
/**
 * A custom react hook for retrieving the related ticket entities
 * for the given event date entities from the eventespresso/core store state.
 *
 * @param {BaseEntity} event
 * @param {boolean} eventLoaded
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */

var useEventDatesForEvent = function useEventDatesForEvent(event) {
  var eventLoaded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    if (!(eventLoaded && Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(event, 'event'))) {
      return DEFAULT;
    }

    var _select = select('eventespresso/core'),
        getRelatedEntities = _select.getRelatedEntities;

    var _select2 = select('core/data'),
        hasFinishedResolution = _select2.hasFinishedResolution;

    var entities = getRelatedEntities(event, 'datetime');
    var loaded = hasFinishedResolution('eventespresso/core', 'getRelatedEntities', [event, 'datetime']);
    return {
      dateEntities: entities,
      dateEntitiesLoaded: loaded
    };
  }, [event]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventDatesForEvent);

/***/ }),

/***/ "./assets/src/hooks/use-event-editor-event-dates.js":
/*!**********************************************************!*\
  !*** ./assets/src/hooks/use-event-editor-event-dates.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var DEFAULT = {
  eventDates: [],
  eventDatesLoaded: false
};
/**
 * A hook for retrieving all the date entities
 * currently in the eventespresso/core data store.
 *
 * @param {boolean} eventLoaded   true if event has already been loaded
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */

var useEventEditorEventDates = function useEventEditorEventDates() {
  var eventLoaded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    if (!eventLoaded) {
      return DEFAULT;
    }

    var _select = select('eventespresso/core'),
        getEntitiesForModel = _select.getEntitiesForModel;

    var eventDates = getEntitiesForModel('datetime');
    return Array.isArray(eventDates) && eventDates.length ? {
      eventDates: eventDates,
      eventDatesLoaded: true
    } : DEFAULT;
  }, [eventLoaded]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventEditorEventDates);

/***/ }),

/***/ "./assets/src/hooks/use-event-editor-event.js":
/*!****************************************************!*\
  !*** ./assets/src/hooks/use-event-editor-event.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */


/**
 * A hook for retrieving the an event via the supplied ID
 * if no ID is supplied, will return the first event in the store
 *
 * @param {number} eventId   event entity ID
 * @return {Object} - the event entity for the supplied ID
 *                  - boolean indicating if loading is completed
 */

var useEventEditorEvent = function useEventEditorEvent() {
  var eventId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    var entity;

    if (eventId === 0) {
      var _select = select('eventespresso/core'),
          getEntitiesForModel = _select.getEntitiesForModel;

      entity = getEntitiesForModel('event');
      entity = entity.hasOwnProperty('eventEntity') ? entity.eventEntity : entity;
      entity = Array.isArray(entity) && entity[0] ? entity[0] : entity;
    } else {
      var _select2 = select('eventespresso/core'),
          getEntityById = _select2.getEntityById;

      entity = getEntityById('event', eventId);
    }

    var loaded = Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(entity, 'event');
    return {
      eventEntity: entity,
      eventEntityLoaded: loaded
    };
  }, [eventId]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventEditorEvent);

/***/ }),

/***/ "./assets/src/hooks/use-event-editor-tickets.js":
/*!******************************************************!*\
  !*** ./assets/src/hooks/use-event-editor-tickets.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * A hook for retrieving all the ticket entities
 * currently in the eventespresso/core data store.
 *
 * @return {Object} - an array of tickets
 *                  - boolean indicating if loading is completed
 */

var useEventEditorTickets = function useEventEditorTickets() {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    var _select = select('eventespresso/core'),
        getEntitiesForModel = _select.getEntitiesForModel;

    var tickets = getEntitiesForModel('ticket');
    return {
      tickets: tickets
    };
  }, []);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventEditorTickets);

/***/ }),

/***/ "./assets/src/hooks/use-event-for-event-date.js":
/*!******************************************************!*\
  !*** ./assets/src/hooks/use-event-for-event-date.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _use_event_editor_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-event-editor-event */ "./assets/src/hooks/use-event-editor-event.js");
/**
 * External imports
 */


/**
 * A hook for retrieving the event for the supplied event date
 * will default to the currently loaded event for the editor
 *
 * @param {BaseEntity} eventDate   event date entity
 * @return {Object} - the event entity for the supplied ID
 *                  - boolean indicating if loading is completed
 */

var useEventForEventDate = function useEventForEventDate(eventDate) {
  var eventId = Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_0__["isModelEntityOfModel"])(eventDate, 'datetime') ? eventDate.evtId : 0;
  return Object(_use_event_editor_event__WEBPACK_IMPORTED_MODULE_1__["default"])(eventId);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventForEventDate);

/***/ }),

/***/ "./assets/src/hooks/use-event-venue.js":
/*!*********************************************!*\
  !*** ./assets/src/hooks/use-event-venue.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */


var DEFAULT = {
  venueEntity: null,
  venueEntityLoaded: false
};
/**
 * A custom hook for retrieving the venue related to the given event
 *
 * @param {BaseEntity} event  An instance of an event entity.
 * @param {boolean} eventLoaded
 * @return {Object} - the venue entity for the provided event
 *                  - boolean indicating if loading is completed
 */

var useEventVenue = function useEventVenue(event) {
  var eventLoaded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    if (!(eventLoaded && Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(event, 'event'))) {
      return DEFAULT;
    }

    var _select = select('eventespresso/core'),
        getRelatedEntities = _select.getRelatedEntities,
        hasFinishedResolution = _select.hasFinishedResolution;

    var entity = getRelatedEntities(event, 'venue');
    var loaded = hasFinishedResolution('getRelatedEntities', [event, 'venue']);
    entity = Array.isArray(entity) && entity[0] && Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(entity[0], 'venue') ? entity[0] : null;
    return {
      venueEntity: entity,
      venueEntityLoaded: loaded
    };
  }, [event, eventLoaded]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventVenue);

/***/ }),

/***/ "./assets/src/hooks/use-previous.js":
/*!******************************************!*\
  !*** ./assets/src/hooks/use-previous.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * A hook to get the previous props or state
 *
 * @param {Object|string|number} value The current value.
 * @return {Object|string|number} - the previous value
 */

var usePrevious = function usePrevious(value) {
  var ref = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    ref.current = value;
  });
  return ref.current;
};

/* harmony default export */ __webpack_exports__["default"] = (usePrevious);

/***/ }),

/***/ "./assets/src/hooks/use-price-types.js":
/*!*********************************************!*\
  !*** ./assets/src/hooks/use-price-types.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * A hook for retrieving all the price_type entities
 * currently in the eventespresso/core data store.
 *
 * @return {Object} - an array of price types
 *                  - boolean indicating if loading is completed
 */

var usePriceTypes = function usePriceTypes() {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    var _select = select('eventespresso/lists'),
        getEntities = _select.getEntities;

    var _select2 = select('core/data'),
        hasFinishedResolution = _select2.hasFinishedResolution;

    var entities = getEntities('price_type');
    var loaded = hasFinishedResolution('eventespresso/lists', 'getEntities', ['price_type']);
    return {
      priceTypes: entities,
      priceTypesLoaded: loaded
    };
  }, []);
};

/* harmony default export */ __webpack_exports__["default"] = (usePriceTypes);

/***/ }),

/***/ "./assets/src/hooks/use-remove-relations-for-event-date-id-to-ticket-ids.js":
/*!**********************************************************************************!*\
  !*** ./assets/src/hooks/use-remove-relations-for-event-date-id-to-ticket-ids.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);



/**
 * External imports
 */


/**
 * Returns a function handling the dispatch event for removing relations
 * between an event date entity and one or more ticket entities.
 *
 * The returned function receives the following arguments:
 *  -  eventDateId ID for event date entity
 *  -  ticketIds array of ticket entity IDs
 *
 * @return {Function}  A function for updating the ticket relation.
 */

var useRemoveRelationsForEventDateIdToTicketIds = function useRemoveRelationsForEventDateIdToTicketIds() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      removeRelationForEntity = _useDispatch.removeRelationForEntity;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (eventDateId, ticketIds) {
    return new Promise(function (resolve) {
      ticketIds.forEach(
      /*#__PURE__*/
      function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ticketId) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return removeRelationForEntity('datetime', eventDateId, 'ticket', ticketId);

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      resolve(true);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (useRemoveRelationsForEventDateIdToTicketIds);

/***/ }),

/***/ "./assets/src/hooks/use-start-date-change-listener.js":
/*!************************************************************!*\
  !*** ./assets/src/hooks/use-start-date-change-listener.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External imports
 */




/**
 * Verifies that start dates occur before end dates for entity date pairs.
 * If not, updates the end date accordingly using the same offset
 * currently existing between the previous start and end dates
 *
 * @function
 * @param {Object} props
 * @member {Object} entity
 * @member {Object} dateProps
 * @member {string} startDateFormKey identifier for React Final Form data schema
 * @member {string} endDateFormKey identifier for React Final Form data schema
 * @member {Function} updateField callback for editing a field
 * @member {Function} touchField callback for marking field as changed
 * @return {Object} entityStartDate & entityEndDate
 */

var useStartDateChangeListener = function useStartDateChangeListener(_ref) {
  var entity = _ref.entity,
      dateProps = _ref.dateProps,
      startDateFormKey = _ref.startDateFormKey,
      endDateFormKey = _ref.endDateFormKey,
      updateField = _ref.updateField,
      touchField = _ref.touchField;

  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntity"])(entity)) {
    throw new TypeError('Invalid Entity supplied to useStartDateChangeListener');
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (newDateValue, prevDateValue) {
    if (newDateValue && newDateValue !== prevDateValue) {
      var newDate = Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_1__["getServerDateTime"])(newDateValue);

      if (newDate instanceof _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"]) {
        // does the new start date occur AFTER the existing end date?
        if (newDate > entity[dateProps.end]) {
          var originalDuration = entity[dateProps.end].diff(entity[dateProps.start]);

          if (_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["Duration"].isValidDuration(originalDuration)) {
            // add original date difference to new start date.
            var newEndDate = newDate.plus(originalDuration);
            entity[dateProps.end] = newEndDate;
            updateField(endDateFormKey, newEndDate.toISO(false));
          }
        } // and finally update the start date


        entity[dateProps.start] = newDate;
      } // let RFF know these fields have potentially changed


      touchField(startDateFormKey);
      touchField(endDateFormKey);
    }
  }, [entity[dateProps.start], entity[dateProps.end], startDateFormKey, endDateFormKey, updateField, touchField]);
};

/* harmony default export */ __webpack_exports__["default"] = (useStartDateChangeListener);

/***/ }),

/***/ "./assets/src/hooks/use-ticket-event-dates.js":
/*!****************************************************!*\
  !*** ./assets/src/hooks/use-ticket-event-dates.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports.
 */



var DEFAULT = {
  eventDates: [],
  eventDatesLoaded: false
};
/**
 * A custom react hook for retrieving the related event date entities
 * for the given ticket entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} ticketEntity  A datetime BaseEntity instance.
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */

var useTicketEventDates = function useTicketEventDates(ticketEntity) {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(function (select) {
    if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(ticketEntity, 'ticket')) {
      warning__WEBPACK_IMPORTED_MODULE_2___default()(false, 'The provided value is not a valid ticket entity.');
      return DEFAULT;
    }

    var _select = select('eventespresso/core'),
        getRelatedEntities = _select.getRelatedEntities;

    var _select2 = select('core/data'),
        hasFinishedResolution = _select2.hasFinishedResolution;

    var eventDates = getRelatedEntities(ticketEntity, 'datetime');
    var eventDatesLoaded = hasFinishedResolution('eventespresso/core', 'getRelatedEntities', [ticketEntity, 'datetime']);
    return {
      eventDates: eventDates,
      eventDatesLoaded: eventDatesLoaded
    };
  }, [ticketEntity]);
};

/* harmony default export */ __webpack_exports__["default"] = (useTicketEventDates);

/***/ }),

/***/ "./assets/src/hooks/use-ticket-prices.js":
/*!***********************************************!*\
  !*** ./assets/src/hooks/use-ticket-prices.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports
 */



var DEFAULT = {
  prices: [],
  pricesLoaded: false,
  noBasePrice: null
};
/**
 * A custom react hook for retrieving the related prices entities
 * for the given ticket entity from the eventespresso/core store state.
 *
 * @param {BaseEntity}  ticketEntity
 * @return {Object}     - an array of prices belonging to the given ticket
 *                      - boolean indicating if loading is completed
 *                      - boolean indicating absence of base price
 */

var useTicketPrices = function useTicketPrices(ticketEntity) {
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useSelect"])(function (select) {
    if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(ticketEntity, 'ticket')) {
      var _select = select('eventespresso/core'),
          getRelatedEntities = _select.getRelatedEntities;

      var _select2 = select('core/data'),
          hasFinishedResolution = _select2.hasFinishedResolution;

      var prices = getRelatedEntities(ticketEntity, 'price');
      var pricesLoaded = hasFinishedResolution('eventespresso/core', 'getRelatedEntities', [ticketEntity, 'price']);
      return {
        prices: prices,
        pricesLoaded: pricesLoaded,
        noBasePrice: pricesLoaded && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(prices)
      };
    }

    return DEFAULT;
  }, [ticketEntity]);
};

/* harmony default export */ __webpack_exports__["default"] = (useTicketPrices);

/***/ }),

/***/ "./assets/src/hooks/use-tickets-for-event-dates.js":
/*!*********************************************************!*\
  !*** ./assets/src/hooks/use-tickets-for-event-dates.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports.
 */



var DEFAULT = {
  ticketEntities: [],
  ticketEntitiesLoaded: false
};
/**
 * A custom react hook for retrieving the related ticket entities
 * for the given event date entities from the eventespresso/core store state.
 *
 * @param {BaseEntity[]} dateEntities  array of event date entities.
 * @param {boolean} dateEntitiesLoaded  true if all event dates are loaded
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */

var useTicketsForEventDates = function useTicketsForEventDates() {
  var dateEntities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dateEntitiesLoaded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useSelect"])(function (select) {
    if (!dateEntitiesLoaded || !Array.isArray(dateEntities) || Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(dateEntities)) {
      return DEFAULT;
    }

    var dateEntityIds = dateEntities.map(function (dateEntity) {
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(dateEntity, 'datetime') ? dateEntity.id : null;
    });

    var _select = select('eventespresso/core'),
        getRelatedEntitiesForIds = _select.getRelatedEntitiesForIds;

    var _select2 = select('core/data'),
        hasFinishedResolution = _select2.hasFinishedResolution;

    var entities = getRelatedEntitiesForIds('datetime', dateEntityIds, 'ticket');
    var loaded = hasFinishedResolution('eventespresso/core', 'getRelatedEntitiesForIds', ['datetime', dateEntityIds, 'ticket']);
    return {
      ticketEntities: entities,
      ticketEntitiesLoaded: loaded
    };
  }, [dateEntities, dateEntitiesLoaded]);
};

/* harmony default export */ __webpack_exports__["default"] = (useTicketsForEventDates);

/***/ }),

/***/ "./assets/src/hooks/use-trash-date-entity.js":
/*!***************************************************!*\
  !*** ./assets/src/hooks/use-trash-date-entity.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__);



/**
 * External imports
 */





var _window = window,
    confirm = _window.confirm;

var useTrashDateEntity = function useTrashDateEntity(eventDate) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      trashEntityById = _useDispatch.trashEntityById;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(click) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_4__["cancelClickEvent"])(click);

              if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__["isModelEntityOfModel"])(eventDate, 'datetime')) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              if (confirm(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__["__"])('Are you sure you want to delete this event date?', 'event_espresso'))) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              trashEntityById('datetime', eventDate.id);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["default"] = (useTrashDateEntity);

/***/ }),

/***/ "./assets/src/hooks/use-trash-price-modifier.js":
/*!******************************************************!*\
  !*** ./assets/src/hooks/use-trash-price-modifier.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External imports
 */




/**
 * useTrashPriceModifier
 * returns an object containing the following two functions:
 *  - addPriceModifier
 *  - trashPriceModifier
 *
 * @return {Object} functions
 */

var useTrashPriceModifier = function useTrashPriceModifier() {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      removeRelationForEntity = _useDispatch.removeRelationForEntity,
      trashEntityById = _useDispatch.trashEntityById;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(priceModifier, ticketEntity) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(priceModifier, 'price')) {
                _context.next = 2;
                break;
              }

              throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to perform deletion because an invalid Price' + ' Entity was supplied by the Ticket Price Calculator.', 'event_espresso'));

            case 2:
              removeRelationForEntity('ticket', ticketEntity.id, 'price', priceModifier.id);
              trashEntityById('price', priceModifier.id);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), []);
};

/* harmony default export */ __webpack_exports__["default"] = (useTrashPriceModifier);

/***/ }),

/***/ "./assets/src/hooks/use-trash-ticket.js":
/*!**********************************************!*\
  !*** ./assets/src/hooks/use-trash-ticket.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External imports
 */




var _window = window,
    confirm = _window.confirm;

var useTrashTicket = function useTrashTicket(ticketEntity) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      trashEntityById = _useDispatch.trashEntityById;

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["isModelEntityOfModel"])(ticketEntity, 'ticket')) {
              _context.next = 2;
              break;
            }

            throw new Error(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Unable to perform deletion because an invalid Ticket Entity was supplied by the Ticket Price Calculator.', 'event_espresso'));

          case 2:
            if (confirm(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Are you sure you want to delete this ticket?', 'event_espresso'))) {
              trashEntityById('ticket', ticketEntity.id);
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (useTrashTicket);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

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

/***/ "@babel/runtime/regenerator":
/*!**********************************************!*\
  !*** external {"this":"regeneratorRuntime"} ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["regeneratorRuntime"]; }());

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

/***/ "@eventespresso/value-objects":
/*!*************************************************!*\
  !*** external {"this":["eejs","valueObjects"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["valueObjects"]; }());

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

/***/ "lodash":
/*!**********************************!*\
  !*** external {"this":"lodash"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["lodash"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhvb2tzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1hZGQtcHJpY2UtbW9kaWZpZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWJhc2UtcHJpY2UtdHlwZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY2xvbmUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWVuZC1kYXRlLWFmdGVyLXN0YXJ0LWRhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1lbmQtZGF0ZS1jaGFuZ2UtbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWVudGl0eS1kYXRlLWNoYW5nZS1saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWVudGl0eS1kYXRlLWNoYW5nZS12YWxpZGF0b3JzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1kYXRlLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1kYXRlLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGVzLWZvci1ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZWRpdG9yLWV2ZW50LWRhdGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWVkaXRvci10aWNrZXRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1mb3ItZXZlbnQtZGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtdmVudWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXByZXZpb3VzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1wcmljZS10eXBlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtcmVtb3ZlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1zdGFydC1kYXRlLWNoYW5nZS1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdGlja2V0LWV2ZW50LWRhdGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10aWNrZXQtcHJpY2VzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10aWNrZXRzLWZvci1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdHJhc2gtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRyYXNoLXByaWNlLW1vZGlmaWVyLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10cmFzaC10aWNrZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpcInJlZ2VuZXJhdG9yUnVudGltZVwifSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJpMThuXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ1dGlsc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsdWVPYmplY3RzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZGF0YVwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImVsZW1lbnRcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Il0sIm5hbWVzIjpbInVzZUFkZFByaWNlTW9kaWZpZXIiLCJ1c2VEaXNwYXRjaCIsImNyZWF0ZUVudGl0eSIsImNyZWF0ZVJlbGF0aW9uIiwidXNlQ2FsbGJhY2siLCJ0aWNrZXRFbnRpdHkiLCJwcm9wZXJ0aWVzIiwicHJpY2VNb2RpZmllciIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwiaWQiLCJ1c2VCYXNlUHJpY2VUeXBlIiwidXNlUHJpY2VUeXBlcyIsInByaWNlVHlwZXMiLCJwcmljZVR5cGVzTG9hZGVkIiwidXNlTWVtbyIsImZpbmQiLCJwcmljZVR5cGUiLCJQQlRfSUQiLCJ1c2VDbG9uZUVudGl0aWVzIiwiZW50aXRpZXNUb0Nsb25lIiwibW9kZWxOYW1lIiwibmV3RW50aXRpZXMiLCJpIiwibGVuZ3RoIiwiZm9yQ2xvbmUiLCJuZXdDbG9uZSIsInB1c2giLCJ1c2VDb3B5RGF0ZUVudGl0eSIsImV2ZW50RGF0ZSIsImNyZWF0ZVJlbGF0aW9ucyIsInVzZUV2ZW50RWRpdG9yRXZlbnQiLCJldnRJZCIsImV2ZW50RW50aXR5IiwidXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMiLCJ0aWNrZXRFbnRpdGllcyIsImNsaWNrIiwiY2FuY2VsQ2xpY2tFdmVudCIsIm5ld0V2ZW50RGF0ZSIsIm5hbWUiLCJzcHJpbnRmIiwiX3giLCJpc0VtcHR5IiwiZmFsc2VGdW5jIiwidXNlQ29weVRpY2tldCIsImRhdGVFbnRpdGllcyIsInJlbGF0ZWRQcmljZXMiLCJ1c2VTZWxlY3QiLCJzZWxlY3QiLCJnZXRSZWxhdGVkRW50aXRpZXMiLCJuZXdQcmljZXMiLCJ1cGRhdGVUaWNrZXREYXRlUmVsYXRpb25zIiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzIiwidXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMiLCJ1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcyIsIm5ld1RpY2tldCIsIkFycmF5IiwiaXNBcnJheSIsInVzZUNyZWF0ZURhdGVFbnRpdHkiLCJldmVudCIsImNhY2hlTmV3RGF0ZSIsInVwZGF0ZUV2ZW50RGF0ZVJlbGF0aW9uIiwidXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlIiwibm93SnMiLCJEYXRlIiwic2V0SG91cnMiLCJnZXRIb3VycyIsIk1hdGgiLCJjZWlsIiwiZ2V0TWludXRlcyIsIm5vdyIsIlNlcnZlckRhdGVUaW1lIiwiZnJvbUpTRGF0ZSIsIkVWVF9JRCIsIkRUVF9uYW1lIiwiRFRUX2Rlc2NyaXB0aW9uIiwiRFRUX0VWVF9zdGFydCIsInBsdXMiLCJEdXJhdGlvbiIsImZyb21PYmplY3QiLCJkYXlzIiwiRFRUX0VWVF9lbmQiLCJob3VycyIsIkRUVF9yZWdfbGltaXQiLCJEVFRfc29sZCIsIkRUVF9yZXNlcnZlZCIsIkRUVF9vcmRlciIsIkRUVF9wYXJlbnQiLCJEVFRfZGVsZXRlZCIsIm5ld0RhdGUiLCJkYXRlRW50aXR5IiwiRXJyb3IiLCJfXyIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJnZXRFbnRpdGllc0J5SWRzIiwiZXZlbnREYXRlSWQiLCJ0aWNrZXRJZHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRpY2tldHMiLCJmb3JFYWNoIiwidGlja2V0IiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzIiwiZXZlbnREYXRlcyIsInByaWNlcyIsInByaWNlIiwidXNlcklEIiwid2luZG93IiwidXNlclNldHRpbmdzIiwidWlkIiwicGFyc2VJbnQiLCJ1c2VDcmVhdGVUaWNrZXRFbnRpdHkiLCJjYWNoZU5ld1RpY2tldCIsImJhc2VQcmljZVR5cGUiLCJUS1RfbmFtZSIsIlRLVF9kZXNjcmlwdGlvbiIsIlRLVF9xdHkiLCJUS1Rfc29sZCIsIlRLVF9yZXNlcnZlZCIsIlRLVF91c2VzIiwiVEtUX3JlcXVpcmVkIiwiVEtUX21pbiIsIlRLVF9tYXgiLCJUS1RfcHJpY2UiLCJNb25leSIsIlNpdGVDdXJyZW5jeSIsIlRLVF9zdGFydERhdGUiLCJUS1RfZW5kRGF0ZSIsIlRLVF90YXhhYmxlIiwiVEtUX29yZGVyIiwiVEtUX2lzRGVmYXVsdCIsIlRLVF9yZXZlcnNlX2NhbGN1bGF0ZSIsIlRLVF93cF91c2VyIiwiVEtUX3BhcmVudCIsIlRLVF9kZWxldGVkIiwiUFJUX0lEIiwibmV3QmFzZVByaWNlIiwidXNlRW5kRGF0ZUFmdGVyU3RhcnREYXRlVmFsaWRhdG9yIiwiZW50aXR5IiwiZGF0ZVByb3BzIiwiaXNNb2RlbEVudGl0eSIsIlR5cGVFcnJvciIsImVuZERhdGUiLCJzdGFydERhdGUiLCJzdGFydCIsInRvSlNEYXRlIiwidXNlRW5kRGF0ZUNoYW5nZUxpc3RlbmVyIiwic3RhcnREYXRlRm9ybUtleSIsImVuZERhdGVGb3JtS2V5IiwidXBkYXRlRmllbGQiLCJ0b3VjaEZpZWxkIiwibmV3RGF0ZVZhbHVlIiwicHJldkRhdGVWYWx1ZSIsImdldFNlcnZlckRhdGVUaW1lIiwiZW5kIiwidXNlRW50aXR5RGF0ZUNoYW5nZUxpc3RlbmVycyIsInByb3BzIiwic3RhcnREYXRlQ2hhbmdlTGlzdGVuZXIiLCJ1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lciIsImVuZERhdGVDaGFuZ2VMaXN0ZW5lciIsInVzZUVuZERhdGVDaGFuZ2VWYWxpZGF0b3IiLCJ1c2VTdGFydERhdGVDaGFuZ2VWYWxpZGF0b3IiLCJ1c2VFbnRpdHlEYXRlQ2hhbmdlVmFsaWRhdG9ycyIsInN0YXJ0RGF0ZUNoYW5nZVZhbGlkYXRvciIsImVuZERhdGVDaGFuZ2VWYWxpZGF0b3IiLCJERUZBVUxUIiwiZXZlbnRMb2FkZWQiLCJ1c2VFdmVudERhdGVFdmVudCIsIndhcm5pbmciLCJoYXNGaW5pc2hlZFJlc29sdXRpb24iLCJ0aWNrZXRzTG9hZGVkIiwidXNlRXZlbnREYXRlVGlja2V0cyIsImRhdGVFbnRpdGllc0xvYWRlZCIsInVzZUV2ZW50RGF0ZXNGb3JFdmVudCIsImVudGl0aWVzIiwibG9hZGVkIiwiZXZlbnREYXRlc0xvYWRlZCIsInVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyIsImdldEVudGl0aWVzRm9yTW9kZWwiLCJldmVudElkIiwiaGFzT3duUHJvcGVydHkiLCJnZXRFbnRpdHlCeUlkIiwiZXZlbnRFbnRpdHlMb2FkZWQiLCJ1c2VFdmVudEVkaXRvclRpY2tldHMiLCJ1c2VFdmVudEZvckV2ZW50RGF0ZSIsInZlbnVlRW50aXR5IiwidmVudWVFbnRpdHlMb2FkZWQiLCJ1c2VFdmVudFZlbnVlIiwidXNlUHJldmlvdXMiLCJ2YWx1ZSIsInJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJnZXRFbnRpdGllcyIsInVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJyZW1vdmVSZWxhdGlvbkZvckVudGl0eSIsInRpY2tldElkIiwib3JpZ2luYWxEdXJhdGlvbiIsImRpZmYiLCJpc1ZhbGlkRHVyYXRpb24iLCJuZXdFbmREYXRlIiwidG9JU08iLCJ1c2VUaWNrZXRFdmVudERhdGVzIiwicHJpY2VzTG9hZGVkIiwibm9CYXNlUHJpY2UiLCJ1c2VUaWNrZXRQcmljZXMiLCJ0aWNrZXRFbnRpdGllc0xvYWRlZCIsImRhdGVFbnRpdHlJZHMiLCJtYXAiLCJnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMiLCJjb25maXJtIiwidXNlVHJhc2hEYXRlRW50aXR5IiwidHJhc2hFbnRpdHlCeUlkIiwidXNlVHJhc2hQcmljZU1vZGlmaWVyIiwidXNlVHJhc2hUaWNrZXQiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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LEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLHFDQUFxQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXBELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSxpQ0FBaUMsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28taG9va3MuMThjYTBiYjhkZjJlM2ZmZmNhYTEuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9ob29rcy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQWRkUHJpY2VNb2RpZmllciB9IGZyb20gJy4vdXNlLWFkZC1wcmljZS1tb2RpZmllcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUJhc2VQcmljZVR5cGUgfSBmcm9tICcuL3VzZS1iYXNlLXByaWNlLXR5cGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDbG9uZUVudGl0aWVzIH0gZnJvbSAnLi91c2UtY2xvbmUtZW50aXRpZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDb3B5RGF0ZUVudGl0eSB9IGZyb20gJy4vdXNlLWNvcHktZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDb3B5VGlja2V0IH0gZnJvbSAnLi91c2UtY29weS10aWNrZXQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVEYXRlRW50aXR5IH0gZnJvbSAnLi91c2UtY3JlYXRlLWRhdGUtZW50aXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9uLWZvci1ldmVudC10by1ldmVudC1kYXRlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS10by10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcyB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLWV2ZW50LWRhdGUtaWQtdG8tdGlja2V0LWlkcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVRpY2tldEVudGl0eSB9IGZyb20gJy4vdXNlLWNyZWF0ZS10aWNrZXQtZW50aXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRW5kRGF0ZUFmdGVyU3RhcnREYXRlVmFsaWRhdG9yIH1cblx0ZnJvbSAnLi91c2UtZW5kLWRhdGUtYWZ0ZXItc3RhcnQtZGF0ZS12YWxpZGF0b3InO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFbmREYXRlQ2hhbmdlTGlzdGVuZXIgfVxuXHRmcm9tICcuL3VzZS1lbmQtZGF0ZS1jaGFuZ2UtbGlzdGVuZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFbnRpdHlEYXRlQ2hhbmdlTGlzdGVuZXJzIH1cblx0ZnJvbSAnLi91c2UtZW50aXR5LWRhdGUtY2hhbmdlLWxpc3RlbmVycyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUVudGl0eURhdGVDaGFuZ2VWYWxpZGF0b3JzIH1cblx0ZnJvbSAnLi91c2UtZW50aXR5LWRhdGUtY2hhbmdlLXZhbGlkYXRvcnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudERhdGVFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWRhdGUtZXZlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudERhdGVUaWNrZXRzIH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZS10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlc0ZvckV2ZW50IH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRFZGl0b3JFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yVGlja2V0cyB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRGb3JFdmVudERhdGUgfSBmcm9tICcuL3VzZS1ldmVudC1mb3ItZXZlbnQtZGF0ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50VmVudWUgfSBmcm9tICcuL3VzZS1ldmVudC12ZW51ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVByaWNlVHlwZXMgfSBmcm9tICcuL3VzZS1wcmljZS10eXBlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgfVxuXHRmcm9tICcuL3VzZS1yZW1vdmUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lciB9XG5cdGZyb20gJy4vdXNlLXN0YXJ0LWRhdGUtY2hhbmdlLWxpc3RlbmVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVGlja2V0RXZlbnREYXRlcyB9IGZyb20gJy4vdXNlLXRpY2tldC1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRpY2tldFByaWNlcyB9IGZyb20gJy4vdXNlLXRpY2tldC1wcmljZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLXRpY2tldHMtZm9yLWV2ZW50LWRhdGVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVHJhc2hEYXRlRW50aXR5IH0gZnJvbSAnLi91c2UtdHJhc2gtZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUcmFzaFByaWNlTW9kaWZpZXIgfSBmcm9tICcuL3VzZS10cmFzaC1wcmljZS1tb2RpZmllcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRyYXNoVGlja2V0IH0gZnJvbSAnLi91c2UtdHJhc2gtdGlja2V0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlUHJldmlvdXMgfSBmcm9tICcuL3VzZS1wcmV2aW91cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiB1c2VBZGRQcmljZU1vZGlmaWVyXG4gKiByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdHdvIGZ1bmN0aW9uczpcbiAqICAtIGFkZFByaWNlTW9kaWZpZXJcbiAqICAtIHRyYXNoUHJpY2VNb2RpZmllclxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZnVuY3Rpb25zXG4gKi9cbmNvbnN0IHVzZUFkZFByaWNlTW9kaWZpZXIgPSAoKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRjcmVhdGVFbnRpdHksXG5cdFx0Y3JlYXRlUmVsYXRpb24sXG5cdH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKFxuXHRcdGFzeW5jICggdGlja2V0RW50aXR5LCBwcm9wZXJ0aWVzICkgPT4ge1xuXHRcdFx0Y29uc3QgcHJpY2VNb2RpZmllciA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0cHJvcGVydGllc1xuXHRcdFx0KTtcblx0XHRcdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIHByaWNlTW9kaWZpZXIsICdwcmljZScgKSApIHtcblx0XHRcdFx0Y3JlYXRlUmVsYXRpb24oXG5cdFx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdFx0dGlja2V0RW50aXR5LmlkLFxuXHRcdFx0XHRcdCdwcmljZScsXG5cdFx0XHRcdFx0cHJpY2VNb2RpZmllclxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0W11cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUFkZFByaWNlTW9kaWZpZXI7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBmaW5kIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlUHJpY2VUeXBlcyBmcm9tICcuL3VzZS1wcmljZS10eXBlcyc7XG5cbmNvbnN0IHVzZUJhc2VQcmljZVR5cGUgPSAoKSA9PiB7XG5cdGNvbnN0IHsgcHJpY2VUeXBlcywgcHJpY2VUeXBlc0xvYWRlZCB9ID0gdXNlUHJpY2VUeXBlcygpO1xuXHRyZXR1cm4gdXNlTWVtbyhcblx0XHQoKSA9PiB7XG5cdFx0XHRpZiAoICEgcHJpY2VUeXBlc0xvYWRlZCApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmluZChcblx0XHRcdFx0cHJpY2VUeXBlcyxcblx0XHRcdFx0KCBwcmljZVR5cGUgKSA9PiBwcmljZVR5cGUuUEJUX0lEID09PSAxXG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0WyBwcmljZVR5cGVzLCBwcmljZVR5cGVzTG9hZGVkIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUJhc2VQcmljZVR5cGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG5jb25zdCB1c2VDbG9uZUVudGl0aWVzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBlbnRpdGllc1RvQ2xvbmUsIG1vZGVsTmFtZSApID0+IHtcblx0XHRjb25zdCBuZXdFbnRpdGllcyA9IFtdO1xuXHRcdGlmICggZW50aXRpZXNUb0Nsb25lICYmIG1vZGVsTmFtZSApIHtcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGVudGl0aWVzVG9DbG9uZS5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0Y29uc3QgbmV3Q2xvbmUgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0XHRcdGVudGl0aWVzVG9DbG9uZVsgaSBdLmZvckNsb25lXG5cdFx0XHRcdCk7XG5cdFx0XHRcdG5ld0VudGl0aWVzLnB1c2goIG5ld0Nsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBuZXdFbnRpdGllcztcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ2xvbmVFbnRpdGllcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBfeCwgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZUV2ZW50RWRpdG9yRXZlbnQsIHVzZVRpY2tldHNGb3JFdmVudERhdGVzIH0gZnJvbSAnLi9pbmRleCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZVxuICogQHJldHVybiB7RnVuY3Rpb259IGZ1bmN0aW9uIGZvciBjb3B5aW5nIGFuIGV2ZW50IGRhdGUgZW50aXR5XG4gKi9cbmNvbnN0IHVzZUNvcHlEYXRlRW50aXR5ID0gKCBldmVudERhdGUgKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRjcmVhdGVFbnRpdHksXG5cdFx0Y3JlYXRlUmVsYXRpb25zLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHsgZXZlbnRFbnRpdHkgfSA9IHVzZUV2ZW50RWRpdG9yRXZlbnQoIGV2ZW50RGF0ZS5ldnRJZCApO1xuXHRjb25zdCB7IHRpY2tldEVudGl0aWVzIH0gPSB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyggWyBldmVudERhdGUgXSApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2sgKTtcblx0XHRpZiAoXG5cdFx0XHQhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudEVudGl0eSwgJ2V2ZW50JyApIHx8XG5cdFx0XHQhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3RXZlbnREYXRlID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGV2ZW50RGF0ZS5mb3JDbG9uZVxuXHRcdCk7XG5cdFx0bmV3RXZlbnREYXRlLm5hbWUgPSBzcHJpbnRmKFxuXHRcdFx0X3goICclcyAtIENPUFknLCAnRXZlbnQgRGF0ZSBOYW1lIC0gQ09QWScsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdG5ld0V2ZW50RGF0ZS5uYW1lXG5cdFx0KTtcblx0XHRpZiAoICEgaXNFbXB0eSggdGlja2V0RW50aXRpZXMgKSApIHtcblx0XHRcdGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0bmV3RXZlbnREYXRlLmlkLFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0dGlja2V0RW50aXRpZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCdldmVudCcsXG5cdFx0XHRldmVudEVudGl0eS5pZCxcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRbIG5ld0V2ZW50RGF0ZSBdXG5cdFx0KTtcblx0XHRyZXR1cm4gbmV3RXZlbnREYXRlO1xuXHR9LCBbIGV2ZW50RW50aXR5LCB0aWNrZXRFbnRpdGllcyBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDb3B5RGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDbG9uZUVudGl0aWVzIGZyb20gJy4vdXNlLWNsb25lLWVudGl0aWVzJztcbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLWV2ZW50LWRhdGVzJztcbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlc1xuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcblxuY29uc3QgZmFsc2VGdW5jID0gKCkgPT4gZmFsc2U7XG5cbmNvbnN0IHVzZUNvcHlUaWNrZXQgPSAoIHRpY2tldEVudGl0eSwgZGF0ZUVudGl0aWVzICkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHJlbGF0ZWRQcmljZXMgPSB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0cmV0dXJuIGdldFJlbGF0ZWRFbnRpdGllcyggdGlja2V0RW50aXR5LCAncHJpY2VzJyApO1xuXHR9LCBbIHRpY2tldEVudGl0eSBdICk7XG5cdGNvbnN0IG5ld1ByaWNlcyA9IHVzZUNsb25lRW50aXRpZXMoIHJlbGF0ZWRQcmljZXMsICdwcmljZScgKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0RGF0ZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcygpO1xuXHRjb25zdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzKCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlRnVuYztcblx0XHR9XG5cblx0XHRjb25zdCBuZXdUaWNrZXQgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldEVudGl0eS5mb3JDbG9uZVxuXHRcdCk7XG5cblx0XHR1cGRhdGVUaWNrZXREYXRlUmVsYXRpb25zKCBuZXdUaWNrZXQsIGRhdGVFbnRpdGllcyApO1xuXHRcdGlmICggQXJyYXkuaXNBcnJheSggbmV3UHJpY2VzICkgJiYgbmV3UHJpY2VzLmxlbmd0aCApIHtcblx0XHRcdGF3YWl0IHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zKCBuZXdUaWNrZXQsIG5ld1ByaWNlcyApO1xuXHRcdH1cblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ29weVRpY2tldDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBTZXJ2ZXJEYXRlVGltZSwgRHVyYXRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb24tZm9yLWV2ZW50LXRvLWV2ZW50LWRhdGUnO1xuXG5jb25zdCB1c2VDcmVhdGVEYXRlRW50aXR5ID0gKCBldmVudCwgY2FjaGVOZXdEYXRlICkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHVwZGF0ZUV2ZW50RGF0ZVJlbGF0aW9uID0gdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlKCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBub3dKcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRub3dKcy5zZXRIb3Vycyhcblx0XHRcdFx0bm93SnMuZ2V0SG91cnMoKSxcblx0XHRcdFx0TWF0aC5jZWlsKCBub3dKcy5nZXRNaW51dGVzKCkgLyAxNSApICogMTUsXG5cdFx0XHRcdDAsXG5cdFx0XHRcdDBcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBub3cgPSBTZXJ2ZXJEYXRlVGltZS5mcm9tSlNEYXRlKCBub3dKcyApO1xuXHRcdFx0Y29uc3QgbmV3RGF0ZSA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEVWVF9JRDogZXZlbnQuaWQsXG5cdFx0XHRcdFx0RFRUX25hbWU6ICcnLFxuXHRcdFx0XHRcdERUVF9kZXNjcmlwdGlvbjogJycsXG5cdFx0XHRcdFx0RFRUX0VWVF9zdGFydDogbm93LnBsdXMoXG5cdFx0XHRcdFx0XHREdXJhdGlvbi5mcm9tT2JqZWN0KCB7IGRheXM6IDMwIH0gKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0RFRUX0VWVF9lbmQ6IG5vdy5wbHVzKFxuXHRcdFx0XHRcdFx0RHVyYXRpb24uZnJvbU9iamVjdCggeyBkYXlzOiAzMCwgaG91cnM6IDIgfSApXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHREVFRfcmVnX2xpbWl0OiAtMSxcblx0XHRcdFx0XHREVFRfc29sZDogMCxcblx0XHRcdFx0XHREVFRfcmVzZXJ2ZWQ6IDAsXG5cdFx0XHRcdFx0RFRUX29yZGVyOiAwLFxuXHRcdFx0XHRcdERUVF9wYXJlbnQ6IDAsXG5cdFx0XHRcdFx0RFRUX2RlbGV0ZWQ6IGZhbHNlLFxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgdXBkYXRlRXZlbnREYXRlUmVsYXRpb24oIGV2ZW50LCBuZXdEYXRlICk7XG5cdFx0XHRjYWNoZU5ld0RhdGUoIG5ld0RhdGUgKTtcblx0XHR9LFxuXHRcdFsgZXZlbnQsIGNhY2hlTmV3RGF0ZSBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVEYXRlRW50aXR5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgY3VzdG9tIGhvb2sgcmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgdXBkYXRpbmdcbiAqIGFuIGV2ZW50IC0+IGRhdGUgcmVsYXRpb24gYmV0d2VlbiB0aGUgZXZlbnQgZW50aXR5IGFuZCBkYXRlIGVudGl0eS5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnQgZW50aXR5XG4gKiAgLSAgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSBldmVudCBkYXRlIHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGUgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb24gfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggZXZlbnRFbnRpdHksIGRhdGVFbnRpdHkgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudEVudGl0eSwgJ2V2ZW50JyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRXZlbnQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBkYXRlRW50aXR5LCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBEYXRlIEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBjcmVhdGVSZWxhdGlvbihcblx0XHRcdCdldmVudCcsXG5cdFx0XHRldmVudEVudGl0eS5pZCxcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRkYXRlRW50aXR5XG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgdXBkYXRpbmcgcmVsYXRpb25zXG4gKiBiZXR3ZWVuIGFuIGV2ZW50IGRhdGUgZW50aXR5IGFuZCBvbmUgb3IgbW9yZSB0aWNrZXQgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIGV2ZW50RGF0ZUlkIElEIGZvciBldmVudCBkYXRlIGVudGl0eVxuICogIC0gIHRpY2tldElkcyBhcnJheSBvZiB0aWNrZXQgZW50aXR5IElEc1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIHRpY2tldCByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB7IGdldEVudGl0aWVzQnlJZHMgfSA9IHVzZVNlbGVjdChcblx0XHQoIHNlbGVjdCApID0+IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKSxcblx0XHRbXVxuXHQpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggZXZlbnREYXRlSWQsIHRpY2tldElkcyApID0+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoIGFzeW5jICggcmVzb2x2ZSApID0+IHtcblx0XHRcdGxldCB0aWNrZXRzID0gYXdhaXQgZ2V0RW50aXRpZXNCeUlkcyggJ3RpY2tldCcsIHRpY2tldElkcyApO1xuXHRcdFx0dGlja2V0cyA9IEFycmF5LmlzQXJyYXkoIHRpY2tldHMgKSA/IHRpY2tldHMgOiBbIHRpY2tldHMgXTtcblx0XHRcdHRpY2tldHMuZm9yRWFjaCggKCB0aWNrZXQgKSA9PiB7XG5cdFx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0LCAndGlja2V0JyApICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHRcdGF3YWl0IGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0ZXZlbnREYXRlSWQsXG5cdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHR0aWNrZXRzLFxuXHRcdFx0KTtcblx0XHRcdHJlc29sdmUoIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgdXBkYXRpbmcgcmVsYXRpb25zXG4gKiBiZXR3ZWVuIGFuIGV2ZW50IGRhdGUgZW50aXR5IGFuZCBvbmUgb3IgbW9yZSB0aWNrZXQgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIGV2ZW50RGF0ZSBlbnRpdHlcbiAqICAtICB0aWNrZXRzIGFycmF5IG9mIHRpY2tldCBlbnRpdGllc1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIHRpY2tldCByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9ucyB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBldmVudERhdGUsIHRpY2tldHMgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIEV2ZW50IERhdGUgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0dGlja2V0cyA9IEFycmF5LmlzQXJyYXkoIHRpY2tldHMgKSA/IHRpY2tldHMgOiBbIHRpY2tldHMgXTtcblx0XHR0aWNrZXRzLmZvckVhY2goICggdGlja2V0ICkgPT4ge1xuXHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXQsICd0aWNrZXQnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0YXdhaXQgY3JlYXRlUmVsYXRpb25zKFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGV2ZW50RGF0ZSxcblx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0dGlja2V0cyxcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVUb1RpY2tldHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgdXBkYXRpbmcgcmVsYXRpb25zXG4gKiBiZXR3ZWVuIGEgdGlja2V0IGVudGl0eSBhbmQgb25lIG9yIG1vcmUgZXZlbnQgZGF0ZSBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgdGlja2V0IGVudGl0eVxuICogIC0gIGV2ZW50RGF0ZXMgYXJyYXkgb2YgZXZlbnQgZGF0ZSBlbnRpdGllc1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIHRpY2tldCByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9ucyB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCB0aWNrZXQsIGV2ZW50RGF0ZXMgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXQsICd0aWNrZXQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0ZXZlbnREYXRlcyA9IEFycmF5LmlzQXJyYXkoIGV2ZW50RGF0ZXMgKSA/IGV2ZW50RGF0ZXMgOiBbIGV2ZW50RGF0ZXMgXTtcblx0XHRldmVudERhdGVzLmZvckVhY2goICggZXZlbnREYXRlICkgPT4ge1xuXHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIEV2ZW50IERhdGUgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0YXdhaXQgY3JlYXRlUmVsYXRpb25zKFxuXHRcdFx0J3RpY2tldCcsXG5cdFx0XHR0aWNrZXQuaWQsXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZXZlbnREYXRlc1xuXHRcdCk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYSB0aWNrZXQgZW50aXR5IGFuZCBvbmUgb3IgbW9yZSBwcmljZSBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgdGlja2V0IGVudGl0eVxuICogIC0gIHByaWNlcyBhcnJheSBvZiBwcmljZSBlbnRpdGllc1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIHRpY2tldCByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIHRpY2tldCwgcHJpY2VzICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0LCAndGlja2V0JyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHByaWNlcyA9IEFycmF5LmlzQXJyYXkoIHByaWNlcyApID8gcHJpY2VzIDogWyBwcmljZXMgXTtcblx0XHRwcmljZXMuZm9yRWFjaCggKCBwcmljZSApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggcHJpY2UsICdwcmljZScgKSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFByaWNlIEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdGF3YWl0IGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0dGlja2V0LmlkLFxuXHRcdFx0J3ByaWNlJyxcblx0XHRcdHByaWNlc1xuXHRcdCk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7XG5cdER1cmF0aW9uLFxuXHRTZXJ2ZXJEYXRlVGltZSxcblx0TW9uZXksXG5cdFNpdGVDdXJyZW5jeSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbmNvbnN0IHVzZXJJRCA9IHR5cGVvZiB3aW5kb3cudXNlclNldHRpbmdzID09PSAnb2JqZWN0JyAmJlxuXHR3aW5kb3cudXNlclNldHRpbmdzLnVpZCA/XG5cdHBhcnNlSW50KCB3aW5kb3cudXNlclNldHRpbmdzLnVpZCwgMTAgKSA6XG5cdG51bGw7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlc1xuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcblxuY29uc3QgdXNlQ3JlYXRlVGlja2V0RW50aXR5ID0gKCBjYWNoZU5ld1RpY2tldCwgYmFzZVByaWNlVHlwZSApID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzKCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBub3dKcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRub3dKcy5zZXRIb3Vycyhcblx0XHRcdFx0bm93SnMuZ2V0SG91cnMoKSxcblx0XHRcdFx0TWF0aC5jZWlsKCBub3dKcy5nZXRNaW51dGVzKCkgLyAxNSApICogMTUsXG5cdFx0XHRcdDAsXG5cdFx0XHRcdDBcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBub3cgPSBTZXJ2ZXJEYXRlVGltZS5mcm9tSlNEYXRlKCBub3dKcyApO1xuXHRcdFx0Y29uc3QgbmV3VGlja2V0ID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFRLVF9uYW1lOiAnJyxcblx0XHRcdFx0XHRUS1RfZGVzY3JpcHRpb246ICcnLFxuXHRcdFx0XHRcdFRLVF9xdHk6IC0xLFxuXHRcdFx0XHRcdFRLVF9zb2xkOiAwLFxuXHRcdFx0XHRcdFRLVF9yZXNlcnZlZDogMCxcblx0XHRcdFx0XHRUS1RfdXNlczogLTEsXG5cdFx0XHRcdFx0VEtUX3JlcXVpcmVkOiBmYWxzZSxcblx0XHRcdFx0XHRUS1RfbWluOiAwLFxuXHRcdFx0XHRcdFRLVF9tYXg6IC0xLFxuXHRcdFx0XHRcdFRLVF9wcmljZTogbmV3IE1vbmV5KCAwLCBTaXRlQ3VycmVuY3kgKSxcblx0XHRcdFx0XHRUS1Rfc3RhcnREYXRlOiBub3csXG5cdFx0XHRcdFx0VEtUX2VuZERhdGU6IG5vdy5wbHVzKFxuXHRcdFx0XHRcdFx0RHVyYXRpb24uZnJvbU9iamVjdCggeyBkYXlzOiAzMCB9IClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFRLVF90YXhhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRUS1Rfb3JkZXI6IDAsXG5cdFx0XHRcdFx0VEtUX2lzRGVmYXVsdDogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX3JldmVyc2VfY2FsY3VsYXRlOiBmYWxzZSxcblx0XHRcdFx0XHRUS1Rfd3BfdXNlcjogdXNlcklELFxuXHRcdFx0XHRcdFRLVF9wYXJlbnQ6IDAsXG5cdFx0XHRcdFx0VEtUX2RlbGV0ZWQ6IGZhbHNlLFxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgbmV3QmFzZVByaWNlID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHQncHJpY2UnLFxuXHRcdFx0XHR7IFBSVF9JRDogYmFzZVByaWNlVHlwZS5pZCB9XG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMoIG5ld1RpY2tldCwgWyBuZXdCYXNlUHJpY2UgXSApO1xuXHRcdFx0Y2FjaGVOZXdUaWNrZXQoIG5ld1RpY2tldCApO1xuXHRcdH0sXG5cdFx0WyBjcmVhdGVFbnRpdHksIHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVRpY2tldEVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IHVzZUVuZERhdGVBZnRlclN0YXJ0RGF0ZVZhbGlkYXRvciA9ICgge1xuXHRlbnRpdHksXG5cdGRhdGVQcm9wcyxcbn0gKSA9PiB7XG5cdGlmICggISBpc01vZGVsRW50aXR5KCBlbnRpdHkgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J0ludmFsaWQgRW50aXR5IHN1cHBsaWVkIHRvIHVzZUVuZERhdGVDaGFuZ2VWYWxpZGF0b3InXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggZW5kRGF0ZSApID0+IHtcblx0XHRjb25zdCBzdGFydERhdGUgPSBlbnRpdHlbIGRhdGVQcm9wcy5zdGFydCBdLnRvSlNEYXRlKCk7XG5cdFx0Ly8gU2V0IHRoZSB0aW1lIHRvIG1pZG5pZ2h0XG5cdFx0Ly8gc28gYXMgbm90IHRvIGRpc2FibGUgdGhlIHNhbWUgc3RhcnQgYW5kIGVuZCBkYXlcblx0XHRlbmREYXRlLnNldEhvdXJzKCAwLCAwLCAwLCAwICk7XG5cdFx0c3RhcnREYXRlLnNldEhvdXJzKCAwLCAwLCAwLCAwICk7XG5cdFx0cmV0dXJuIGVuZERhdGUgLSBzdGFydERhdGUgPCAwO1xuXHR9LCBbIGVudGl0eVsgZGF0ZVByb3BzLnN0YXJ0IF0gXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRW5kRGF0ZUFmdGVyU3RhcnREYXRlVmFsaWRhdG9yO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGdldFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuaW1wb3J0IHsgU2VydmVyRGF0ZVRpbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHkgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBWZXJpZmllcyB0aGF0IGVuZCBkYXRlIHZhbHVlIGhhcyBjaGFuZ2VkIGFuZCB1cGRhdGVzIGVudGl0eSBhY2NvcmRpbmdseS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICogQG1lbWJlciB7T2JqZWN0fSBlbnRpdHlcbiAqIEBtZW1iZXIge09iamVjdH0gZGF0ZVByb3BzXG4gKiBAbWVtYmVyIHtzdHJpbmd9IHN0YXJ0RGF0ZUZvcm1LZXkgaWRlbnRpZmllciBmb3IgUmVhY3QgRmluYWwgRm9ybSBkYXRhIHNjaGVtYVxuICogQG1lbWJlciB7c3RyaW5nfSBlbmREYXRlRm9ybUtleSBpZGVudGlmaWVyIGZvciBSZWFjdCBGaW5hbCBGb3JtIGRhdGEgc2NoZW1hXG4gKiBAbWVtYmVyIHtGdW5jdGlvbn0gdXBkYXRlRmllbGQgY2FsbGJhY2sgZm9yIGVkaXRpbmcgYSBmaWVsZFxuICogQG1lbWJlciB7RnVuY3Rpb259IHRvdWNoRmllbGQgY2FsbGJhY2sgZm9yIG1hcmtpbmcgZmllbGQgYXMgY2hhbmdlZFxuICogQHJldHVybiB7T2JqZWN0fSBlbnRpdHlTdGFydERhdGUgJiBlbnRpdHlFbmREYXRlXG4gKi9cbmNvbnN0IHVzZUVuZERhdGVDaGFuZ2VMaXN0ZW5lciA9ICgge1xuXHRlbnRpdHksXG5cdGRhdGVQcm9wcyxcblx0c3RhcnREYXRlRm9ybUtleSxcblx0ZW5kRGF0ZUZvcm1LZXksXG5cdHVwZGF0ZUZpZWxkLFxuXHR0b3VjaEZpZWxkLFxufSApID0+IHtcblx0aWYgKCAhIGlzTW9kZWxFbnRpdHkoIGVudGl0eSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnSW52YWxpZCBFbnRpdHkgc3VwcGxpZWQgdG8gdXNlU3RhcnREYXRlQ2hhbmdlTGlzdGVuZXInXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggbmV3RGF0ZVZhbHVlLCBwcmV2RGF0ZVZhbHVlICkgPT4ge1xuXHRcdGlmICggbmV3RGF0ZVZhbHVlICYmIG5ld0RhdGVWYWx1ZSAhPT0gcHJldkRhdGVWYWx1ZSApIHtcblx0XHRcdGNvbnN0IG5ld0RhdGUgPSBnZXRTZXJ2ZXJEYXRlVGltZSggbmV3RGF0ZVZhbHVlICk7XG5cdFx0XHRpZiAoIG5ld0RhdGUgaW5zdGFuY2VvZiBTZXJ2ZXJEYXRlVGltZSApIHtcblx0XHRcdFx0ZW50aXR5WyBkYXRlUHJvcHMuZW5kIF0gPSBuZXdEYXRlO1xuXHRcdFx0fVxuXHRcdFx0dG91Y2hGaWVsZCggc3RhcnREYXRlRm9ybUtleSApO1xuXHRcdFx0dG91Y2hGaWVsZCggZW5kRGF0ZUZvcm1LZXkgKTtcblx0XHR9XG5cdH0sIFtcblx0XHRlbnRpdHlbIGRhdGVQcm9wcy5zdGFydCBdLFxuXHRcdGVudGl0eVsgZGF0ZVByb3BzLmVuZCBdLFxuXHRcdHN0YXJ0RGF0ZUZvcm1LZXksXG5cdFx0ZW5kRGF0ZUZvcm1LZXksXG5cdFx0dXBkYXRlRmllbGQsXG5cdFx0dG91Y2hGaWVsZCxcblx0XSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRW5kRGF0ZUNoYW5nZUxpc3RlbmVyO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB1c2VFbmREYXRlQ2hhbmdlTGlzdGVuZXIgZnJvbSAnLi91c2UtZW5kLWRhdGUtY2hhbmdlLWxpc3RlbmVyJztcbmltcG9ydCB1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lciBmcm9tICcuL3VzZS1zdGFydC1kYXRlLWNoYW5nZS1saXN0ZW5lcic7XG5cbi8qKlxuICogVmVyaWZpZXMgdGhhdCBlbmQgZGF0ZSB2YWx1ZSBoYXMgY2hhbmdlZCBhbmQgdXBkYXRlcyBlbnRpdHkgYWNjb3JkaW5nbHkuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBtZW1iZXIge09iamVjdH0gZW50aXR5XG4gKiBAbWVtYmVyIHtPYmplY3R9IGRhdGVQcm9wc1xuICogQG1lbWJlciB7c3RyaW5nfSBzdGFydERhdGVGb3JtS2V5IGlkZW50aWZpZXIgZm9yIFJlYWN0IEZpbmFsIEZvcm0gZGF0YSBzY2hlbWFcbiAqIEBtZW1iZXIge3N0cmluZ30gZW5kRGF0ZUZvcm1LZXkgaWRlbnRpZmllciBmb3IgUmVhY3QgRmluYWwgRm9ybSBkYXRhIHNjaGVtYVxuICogQG1lbWJlciB7RnVuY3Rpb259IHVwZGF0ZUZpZWxkIGNhbGxiYWNrIGZvciBlZGl0aW5nIGEgZmllbGRcbiAqIEBtZW1iZXIge0Z1bmN0aW9ufSB0b3VjaEZpZWxkIGNhbGxiYWNrIGZvciBtYXJraW5nIGZpZWxkIGFzIGNoYW5nZWRcbiAqIEByZXR1cm4ge09iamVjdH0gZW50aXR5U3RhcnREYXRlICYgZW50aXR5RW5kRGF0ZVxuICovXG5jb25zdCB1c2VFbnRpdHlEYXRlQ2hhbmdlTGlzdGVuZXJzID0gKCBwcm9wcyApID0+IHtcblx0cmV0dXJuIHtcblx0XHRzdGFydERhdGVDaGFuZ2VMaXN0ZW5lcjogdXNlU3RhcnREYXRlQ2hhbmdlTGlzdGVuZXIoIHByb3BzICksXG5cdFx0ZW5kRGF0ZUNoYW5nZUxpc3RlbmVyOiB1c2VFbmREYXRlQ2hhbmdlTGlzdGVuZXIoIHByb3BzICksXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFbnRpdHlEYXRlQ2hhbmdlTGlzdGVuZXJzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3V0aWxzJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHkgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgdXNlRW5kRGF0ZUNoYW5nZVZhbGlkYXRvciA9ICgge1xuXHRlbnRpdHksXG5cdGRhdGVQcm9wcyxcbn0gKSA9PiB7XG5cdGlmICggISBpc01vZGVsRW50aXR5KCBlbnRpdHkgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J0ludmFsaWQgRW50aXR5IHN1cHBsaWVkIHRvIHVzZUVuZERhdGVDaGFuZ2VWYWxpZGF0b3InXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggbmV3RGF0ZVZhbHVlICkgPT4ge1xuXHRcdGlmICggbmV3RGF0ZVZhbHVlICkge1xuXHRcdFx0Y29uc3QgZW5kRGF0ZSA9IGdldFNlcnZlckRhdGVUaW1lKCBuZXdEYXRlVmFsdWUgKTtcblx0XHRcdGlmICggZW5kRGF0ZSA8IGVudGl0eVsgZGF0ZVByb3BzLnN0YXJ0IF0gKSB7XG5cdFx0XHRcdHJldHVybiBfXyhcblx0XHRcdFx0XHQnRW5kIERhdGUgJiBUaW1lIG11c3QgYmUgc2V0IGxhdGVyIHRoYW4gdGhlIFN0YXJ0IERhdGUgJiBUaW1lJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCBbXSApO1xufTtcbmNvbnN0IHVzZVN0YXJ0RGF0ZUNoYW5nZVZhbGlkYXRvciA9ICgge1xuXHRlbnRpdHksXG5cdGRhdGVQcm9wcyxcbn0gKSA9PiB7XG5cdGlmICggISBpc01vZGVsRW50aXR5KCBlbnRpdHkgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J0ludmFsaWQgRW50aXR5IHN1cHBsaWVkIHRvIHVzZVN0YXJ0RGF0ZUNoYW5nZVZhbGlkYXRvcidcblx0XHQpO1xuXHR9XG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBuZXdEYXRlVmFsdWUgKSA9PiB7XG5cdFx0aWYgKCBuZXdEYXRlVmFsdWUgKSB7XG5cdFx0XHRjb25zdCBzdGFydERhdGUgPSBnZXRTZXJ2ZXJEYXRlVGltZSggbmV3RGF0ZVZhbHVlICk7XG5cdFx0XHRpZiAoIHN0YXJ0RGF0ZSA+IGVudGl0eVsgZGF0ZVByb3BzLmVuZCBdICkge1xuXHRcdFx0XHRyZXR1cm4gX18oXG5cdFx0XHRcdFx0J0VuZCBEYXRlICYgVGltZSBtdXN0IGJlIHNldCBsYXRlciB0aGFuIHRoZSBTdGFydCBEYXRlICYgVGltZScsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwgW10gKTtcbn07XG5cbmNvbnN0IHVzZUVudGl0eURhdGVDaGFuZ2VWYWxpZGF0b3JzID0gKCBwcm9wcyApID0+IHtcblx0cmV0dXJuIHtcblx0XHRzdGFydERhdGVDaGFuZ2VWYWxpZGF0b3I6IHVzZVN0YXJ0RGF0ZUNoYW5nZVZhbGlkYXRvciggcHJvcHMgKSxcblx0XHRlbmREYXRlQ2hhbmdlVmFsaWRhdG9yOiB1c2VFbmREYXRlQ2hhbmdlVmFsaWRhdG9yKCBwcm9wcyApLFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRW50aXR5RGF0ZUNoYW5nZVZhbGlkYXRvcnM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdGV2ZW50OiBbXSxcblx0ZXZlbnRMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIGV2ZW50IGVudGl0eVxuICogZm9yIHRoZSBnaXZlbiBkYXRlIGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgIGFuIGV2ZW50IGRhdGUgZW50aXR5XG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGV2ZW50IGZvciB0aGUgc3VwcGxpZWQgZXZlbnQgZGF0ZVxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudERhdGVFdmVudCA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWUgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGxldCBldmVudCA9IGdldFJlbGF0ZWRFbnRpdGllcyggZXZlbnREYXRlLCAnZXZlbnQnICk7XG5cdFx0Y29uc3QgZXZlbnRMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnREYXRlLCAnZXZlbnQnIF1cblx0XHQpO1xuXHRcdGlmICggZXZlbnRMb2FkZWQgKSB7XG5cdFx0XHRldmVudCA9IEFycmF5LmlzQXJyYXkoIGV2ZW50ICkgJiYgZXZlbnRbIDAgXSAmJlxuXHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50WyAwIF0sICdldmVudCcgKSA/XG5cdFx0XHRcdGV2ZW50WyAwIF0gOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXZlbnQsXG5cdFx0XHRcdGV2ZW50TG9hZGVkLFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIERFRkFVTFQ7XG5cdH0sIFsgZXZlbnREYXRlIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZUV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHR0aWNrZXRzOiBbXSxcblx0dGlja2V0c0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzIGZvciB0aGUgZ2l2ZW5cbiAqIGRhdGUgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZSAgQSBkYXRldGltZSBCYXNlRW50aXR5IGluc3RhbmNlLlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHRpY2tldHNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlVGlja2V0cyA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWUgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IHRpY2tldHMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50RGF0ZSwgJ3RpY2tldCcgKTtcblx0XHRjb25zdCB0aWNrZXRzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnREYXRlLCAndGlja2V0JyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGlja2V0cyxcblx0XHRcdHRpY2tldHNMb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudERhdGUgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnREYXRlVGlja2V0cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7IGRhdGVFbnRpdGllczogW10sIGRhdGVFbnRpdGllc0xvYWRlZDogZmFsc2UgfTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiBldmVudCBkYXRlIGVudGl0aWVzIGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlc0ZvckV2ZW50ID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50LCAnZGF0ZXRpbWUnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnQsICdkYXRldGltZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGVFbnRpdGllczogZW50aXRpZXMsXG5cdFx0XHRkYXRlRW50aXRpZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGV2ZW50IF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZXNGb3JFdmVudDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRldmVudERhdGVzOiBbXSxcblx0ZXZlbnREYXRlc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyBhbGwgdGhlIGRhdGUgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZCAgIHRydWUgaWYgZXZlbnQgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXMgPSAoIGV2ZW50TG9hZGVkID0gdHJ1ZSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGV2ZW50TG9hZGVkICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0RW50aXRpZXNGb3JNb2RlbCB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IGV2ZW50RGF0ZXMgPSBnZXRFbnRpdGllc0Zvck1vZGVsKCAnZGF0ZXRpbWUnICk7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoIGV2ZW50RGF0ZXMgKSAmJiBldmVudERhdGVzLmxlbmd0aCA/XG5cdFx0XHR7XG5cdFx0XHRcdGV2ZW50RGF0ZXMsXG5cdFx0XHRcdGV2ZW50RGF0ZXNMb2FkZWQ6IHRydWUsXG5cdFx0XHR9IDpcblx0XHRcdERFRkFVTFQ7XG5cdH0sIFsgZXZlbnRMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgYW4gZXZlbnQgdmlhIHRoZSBzdXBwbGllZCBJRFxuICogaWYgbm8gSUQgaXMgc3VwcGxpZWQsIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBldmVudCBpbiB0aGUgc3RvcmVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAgIGV2ZW50IGVudGl0eSBJRFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBlbnRpdHkgZm9yIHRoZSBzdXBwbGllZCBJRFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50ID0gKCBldmVudElkID0gMCApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0bGV0IGVudGl0eTtcblx0XHRpZiAoIGV2ZW50SWQgPT09IDAgKSB7XG5cdFx0XHRjb25zdCB7IGdldEVudGl0aWVzRm9yTW9kZWwgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRcdGVudGl0eSA9IGdldEVudGl0aWVzRm9yTW9kZWwoICdldmVudCcgKTtcblx0XHRcdGVudGl0eSA9IGVudGl0eS5oYXNPd25Qcm9wZXJ0eSggJ2V2ZW50RW50aXR5JyApID9cblx0XHRcdFx0ZW50aXR5LmV2ZW50RW50aXR5IDpcblx0XHRcdFx0ZW50aXR5O1xuXHRcdFx0ZW50aXR5ID0gQXJyYXkuaXNBcnJheSggZW50aXR5ICkgJiYgZW50aXR5WzBdID9cblx0XHRcdFx0ZW50aXR5WyAwIF0gOlxuXHRcdFx0XHRlbnRpdHk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHsgZ2V0RW50aXR5QnlJZCB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0ZW50aXR5ID0gZ2V0RW50aXR5QnlJZCggJ2V2ZW50JywgZXZlbnRJZCApO1xuXHRcdH1cblx0XHRjb25zdCBsb2FkZWQgPSBpc01vZGVsRW50aXR5T2ZNb2RlbCggZW50aXR5LCAnZXZlbnQnICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGV2ZW50RW50aXR5OiBlbnRpdHksXG5cdFx0XHRldmVudEVudGl0eUxvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnRJZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEVkaXRvckV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIGFsbCB0aGUgdGlja2V0IGVudGl0aWVzXG4gKiBjdXJyZW50bHkgaW4gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBkYXRhIHN0b3JlLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiB0aWNrZXRzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RWRpdG9yVGlja2V0cyA9ICgpID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRFbnRpdGllc0Zvck1vZGVsIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgdGlja2V0cyA9IGdldEVudGl0aWVzRm9yTW9kZWwoICd0aWNrZXQnICk7XG5cdFx0cmV0dXJuIHsgdGlja2V0cyB9O1xuXHR9LCBbXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JUaWNrZXRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB1c2VFdmVudEVkaXRvckV2ZW50IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIHRoZSBldmVudCBmb3IgdGhlIHN1cHBsaWVkIGV2ZW50IGRhdGVcbiAqIHdpbGwgZGVmYXVsdCB0byB0aGUgY3VycmVudGx5IGxvYWRlZCBldmVudCBmb3IgdGhlIGVkaXRvclxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZXZlbnREYXRlICAgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgZXZlbnQgZW50aXR5IGZvciB0aGUgc3VwcGxpZWQgSURcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnRGb3JFdmVudERhdGUgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0Y29uc3QgZXZlbnRJZCA9IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSA/XG5cdFx0ZXZlbnREYXRlLmV2dElkIDpcblx0XHQwO1xuXHRyZXR1cm4gdXNlRXZlbnRFZGl0b3JFdmVudCggZXZlbnRJZCApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRGb3JFdmVudERhdGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHZlbnVlRW50aXR5OiBudWxsLFxuXHR2ZW51ZUVudGl0eUxvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHZlbnVlIHJlbGF0ZWQgdG8gdGhlIGdpdmVuIGV2ZW50XG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudCAgQW4gaW5zdGFuY2Ugb2YgYW4gZXZlbnQgZW50aXR5LlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSB2ZW51ZSBlbnRpdHkgZm9yIHRoZSBwcm92aWRlZCBldmVudFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudFZlbnVlID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7XG5cdFx0XHRnZXRSZWxhdGVkRW50aXRpZXMsXG5cdFx0XHRoYXNGaW5pc2hlZFJlc29sdXRpb24sXG5cdFx0fSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRsZXQgZW50aXR5ID0gZ2V0UmVsYXRlZEVudGl0aWVzKCBldmVudCwgJ3ZlbnVlJyApO1xuXHRcdGNvbnN0IGxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyBldmVudCwgJ3ZlbnVlJyBdXG5cdFx0KTtcblx0XHRlbnRpdHkgPSBBcnJheS5pc0FycmF5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIDAgXSAmJlxuXHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBlbnRpdHlbIDAgXSwgJ3ZlbnVlJyApID9cblx0XHRcdGVudGl0eVsgMCBdIDpcblx0XHRcdG51bGw7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZlbnVlRW50aXR5OiBlbnRpdHksXG5cdFx0XHR2ZW51ZUVudGl0eUxvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnQsIGV2ZW50TG9hZGVkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50VmVudWU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEEgaG9vayB0byBnZXQgdGhlIHByZXZpb3VzIHByb3BzIG9yIHN0YXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfG51bWJlcn0gdmFsdWUgVGhlIGN1cnJlbnQgdmFsdWUuXG4gKiBAcmV0dXJuIHtPYmplY3R8c3RyaW5nfG51bWJlcn0gLSB0aGUgcHJldmlvdXMgdmFsdWVcbiAqL1xuY29uc3QgdXNlUHJldmlvdXMgPSAoIHZhbHVlICkgPT4ge1xuXHRjb25zdCByZWYgPSB1c2VSZWYoKTtcblx0dXNlRWZmZWN0KCAoKSA9PiB7XG5cdFx0cmVmLmN1cnJlbnQgPSB2YWx1ZTtcblx0fSApO1xuXHRyZXR1cm4gcmVmLmN1cnJlbnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VQcmV2aW91cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyBhbGwgdGhlIHByaWNlX3R5cGUgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHByaWNlIHR5cGVzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZVByaWNlVHlwZXMgPSAoKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGNvbnN0IHsgZ2V0RW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vbGlzdHMnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCBlbnRpdGllcyA9IGdldEVudGl0aWVzKCAncHJpY2VfdHlwZScgKTtcblx0XHRjb25zdCBsb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9saXN0cycsXG5cdFx0XHQnZ2V0RW50aXRpZXMnLFxuXHRcdFx0WyAncHJpY2VfdHlwZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHByaWNlVHlwZXM6IGVudGl0aWVzLFxuXHRcdFx0cHJpY2VUeXBlc0xvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFtdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VQcmljZVR5cGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciByZW1vdmluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYW4gZXZlbnQgZGF0ZSBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHRpY2tldCBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnREYXRlSWQgSUQgZm9yIGV2ZW50IGRhdGUgZW50aXR5XG4gKiAgLSAgdGlja2V0SWRzIGFycmF5IG9mIHRpY2tldCBlbnRpdHkgSURzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VSZW1vdmVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzID0gKCkgPT4ge1xuXHRjb25zdCB7IHJlbW92ZVJlbGF0aW9uRm9yRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGV2ZW50RGF0ZUlkLCB0aWNrZXRJZHMgKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUgKSA9PiB7XG5cdFx0XHR0aWNrZXRJZHMuZm9yRWFjaCggYXN5bmMgKCB0aWNrZXRJZCApID0+IHtcblx0XHRcdFx0YXdhaXQgcmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHkoXG5cdFx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0XHRldmVudERhdGVJZCxcblx0XHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0XHR0aWNrZXRJZCxcblx0XHRcdFx0KTtcblx0XHRcdH0gKTtcblx0XHRcdHJlc29sdmUoIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgZ2V0U2VydmVyRGF0ZVRpbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBTZXJ2ZXJEYXRlVGltZSwgRHVyYXRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHkgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHN0YXJ0IGRhdGVzIG9jY3VyIGJlZm9yZSBlbmQgZGF0ZXMgZm9yIGVudGl0eSBkYXRlIHBhaXJzLlxuICogSWYgbm90LCB1cGRhdGVzIHRoZSBlbmQgZGF0ZSBhY2NvcmRpbmdseSB1c2luZyB0aGUgc2FtZSBvZmZzZXRcbiAqIGN1cnJlbnRseSBleGlzdGluZyBiZXR3ZWVuIHRoZSBwcmV2aW91cyBzdGFydCBhbmQgZW5kIGRhdGVzXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBtZW1iZXIge09iamVjdH0gZW50aXR5XG4gKiBAbWVtYmVyIHtPYmplY3R9IGRhdGVQcm9wc1xuICogQG1lbWJlciB7c3RyaW5nfSBzdGFydERhdGVGb3JtS2V5IGlkZW50aWZpZXIgZm9yIFJlYWN0IEZpbmFsIEZvcm0gZGF0YSBzY2hlbWFcbiAqIEBtZW1iZXIge3N0cmluZ30gZW5kRGF0ZUZvcm1LZXkgaWRlbnRpZmllciBmb3IgUmVhY3QgRmluYWwgRm9ybSBkYXRhIHNjaGVtYVxuICogQG1lbWJlciB7RnVuY3Rpb259IHVwZGF0ZUZpZWxkIGNhbGxiYWNrIGZvciBlZGl0aW5nIGEgZmllbGRcbiAqIEBtZW1iZXIge0Z1bmN0aW9ufSB0b3VjaEZpZWxkIGNhbGxiYWNrIGZvciBtYXJraW5nIGZpZWxkIGFzIGNoYW5nZWRcbiAqIEByZXR1cm4ge09iamVjdH0gZW50aXR5U3RhcnREYXRlICYgZW50aXR5RW5kRGF0ZVxuICovXG5jb25zdCB1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lciA9ICgge1xuXHRlbnRpdHksXG5cdGRhdGVQcm9wcyxcblx0c3RhcnREYXRlRm9ybUtleSxcblx0ZW5kRGF0ZUZvcm1LZXksXG5cdHVwZGF0ZUZpZWxkLFxuXHR0b3VjaEZpZWxkLFxufSApID0+IHtcblx0aWYgKCAhIGlzTW9kZWxFbnRpdHkoIGVudGl0eSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnSW52YWxpZCBFbnRpdHkgc3VwcGxpZWQgdG8gdXNlU3RhcnREYXRlQ2hhbmdlTGlzdGVuZXInXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggbmV3RGF0ZVZhbHVlLCBwcmV2RGF0ZVZhbHVlICkgPT4ge1xuXHRcdGlmICggbmV3RGF0ZVZhbHVlICYmIG5ld0RhdGVWYWx1ZSAhPT0gcHJldkRhdGVWYWx1ZSApIHtcblx0XHRcdGNvbnN0IG5ld0RhdGUgPSBnZXRTZXJ2ZXJEYXRlVGltZSggbmV3RGF0ZVZhbHVlICk7XG5cdFx0XHRpZiAoIG5ld0RhdGUgaW5zdGFuY2VvZiBTZXJ2ZXJEYXRlVGltZSApIHtcblx0XHRcdFx0Ly8gZG9lcyB0aGUgbmV3IHN0YXJ0IGRhdGUgb2NjdXIgQUZURVIgdGhlIGV4aXN0aW5nIGVuZCBkYXRlP1xuXHRcdFx0XHRpZiAoIG5ld0RhdGUgPiBlbnRpdHlbIGRhdGVQcm9wcy5lbmQgXSApIHtcblx0XHRcdFx0XHRjb25zdCBvcmlnaW5hbER1cmF0aW9uID0gZW50aXR5WyBkYXRlUHJvcHMuZW5kIF0uZGlmZihcblx0XHRcdFx0XHRcdGVudGl0eVsgZGF0ZVByb3BzLnN0YXJ0IF1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmICggRHVyYXRpb24uaXNWYWxpZER1cmF0aW9uKCBvcmlnaW5hbER1cmF0aW9uICkgKSB7XG5cdFx0XHRcdFx0XHQvLyBhZGQgb3JpZ2luYWwgZGF0ZSBkaWZmZXJlbmNlIHRvIG5ldyBzdGFydCBkYXRlLlxuXHRcdFx0XHRcdFx0Y29uc3QgbmV3RW5kRGF0ZSA9IG5ld0RhdGUucGx1cyggb3JpZ2luYWxEdXJhdGlvbiApO1xuXHRcdFx0XHRcdFx0ZW50aXR5WyBkYXRlUHJvcHMuZW5kIF0gPSBuZXdFbmREYXRlO1xuXHRcdFx0XHRcdFx0dXBkYXRlRmllbGQoXG5cdFx0XHRcdFx0XHRcdGVuZERhdGVGb3JtS2V5LFxuXHRcdFx0XHRcdFx0XHRuZXdFbmREYXRlLnRvSVNPKCBmYWxzZSApXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBhbmQgZmluYWxseSB1cGRhdGUgdGhlIHN0YXJ0IGRhdGVcblx0XHRcdFx0ZW50aXR5WyBkYXRlUHJvcHMuc3RhcnQgXSA9IG5ld0RhdGU7XG5cdFx0XHR9XG5cdFx0XHQvLyBsZXQgUkZGIGtub3cgdGhlc2UgZmllbGRzIGhhdmUgcG90ZW50aWFsbHkgY2hhbmdlZFxuXHRcdFx0dG91Y2hGaWVsZCggc3RhcnREYXRlRm9ybUtleSApO1xuXHRcdFx0dG91Y2hGaWVsZCggZW5kRGF0ZUZvcm1LZXkgKTtcblx0XHR9XG5cdH0sIFtcblx0XHRlbnRpdHlbIGRhdGVQcm9wcy5zdGFydCBdLFxuXHRcdGVudGl0eVsgZGF0ZVByb3BzLmVuZCBdLFxuXHRcdHN0YXJ0RGF0ZUZvcm1LZXksXG5cdFx0ZW5kRGF0ZUZvcm1LZXksXG5cdFx0dXBkYXRlRmllbGQsXG5cdFx0dG91Y2hGaWVsZCxcblx0XSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlU3RhcnREYXRlQ2hhbmdlTGlzdGVuZXI7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdGV2ZW50RGF0ZXM6IFtdLFxuXHRldmVudERhdGVzTG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCBldmVudCBkYXRlIGVudGl0aWVzXG4gKiBmb3IgdGhlIGdpdmVuIHRpY2tldCBlbnRpdHkgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gdGlja2V0RW50aXR5ICBBIGRhdGV0aW1lIEJhc2VFbnRpdHkgaW5zdGFuY2UuXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlVGlja2V0RXZlbnREYXRlcyA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhIHZhbGlkIHRpY2tldCBlbnRpdHkuJ1xuXHRcdFx0KTtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZXZlbnREYXRlcyA9IGdldFJlbGF0ZWRFbnRpdGllcyggdGlja2V0RW50aXR5LCAnZGF0ZXRpbWUnICk7XG5cdFx0Y29uc3QgZXZlbnREYXRlc0xvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRbIHRpY2tldEVudGl0eSwgJ2RhdGV0aW1lJyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZXZlbnREYXRlcyxcblx0XHRcdGV2ZW50RGF0ZXNMb2FkZWQsXG5cdFx0fTtcblx0fSwgWyB0aWNrZXRFbnRpdHkgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVGlja2V0RXZlbnREYXRlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRwcmljZXM6IFtdLFxuXHRwcmljZXNMb2FkZWQ6IGZhbHNlLFxuXHRub0Jhc2VQcmljZTogbnVsbCxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCBwcmljZXMgZW50aXRpZXNcbiAqIGZvciB0aGUgZ2l2ZW4gdGlja2V0IGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSAgdGlja2V0RW50aXR5XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAtIGFuIGFycmF5IG9mIHByaWNlcyBiZWxvbmdpbmcgdG8gdGhlIGdpdmVuIHRpY2tldFxuICogICAgICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGFic2VuY2Ugb2YgYmFzZSBwcmljZVxuICovXG5jb25zdCB1c2VUaWNrZXRQcmljZXMgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdChcblx0XHQoIHNlbGVjdCApID0+IHtcblx0XHRcdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRcdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRcdFx0Y29uc3QgcHJpY2VzID0gZ2V0UmVsYXRlZEVudGl0aWVzKFxuXHRcdFx0XHRcdHRpY2tldEVudGl0eSxcblx0XHRcdFx0XHQncHJpY2UnXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGNvbnN0IHByaWNlc0xvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFx0XHRbIHRpY2tldEVudGl0eSwgJ3ByaWNlJyBdXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cHJpY2VzLFxuXHRcdFx0XHRcdHByaWNlc0xvYWRlZCxcblx0XHRcdFx0XHRub0Jhc2VQcmljZTogcHJpY2VzTG9hZGVkICYmIGlzRW1wdHkoIHByaWNlcyApLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fSxcblx0XHRbIHRpY2tldEVudGl0eSBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUaWNrZXRQcmljZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHRpY2tldEVudGl0aWVzOiBbXSxcblx0dGlja2V0RW50aXRpZXNMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiBldmVudCBkYXRlIGVudGl0aWVzIGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHlbXX0gZGF0ZUVudGl0aWVzICBhcnJheSBvZiBldmVudCBkYXRlIGVudGl0aWVzLlxuICogQHBhcmFtIHtib29sZWFufSBkYXRlRW50aXRpZXNMb2FkZWQgIHRydWUgaWYgYWxsIGV2ZW50IGRhdGVzIGFyZSBsb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyA9IChcblx0ZGF0ZUVudGl0aWVzID0gW10sXG5cdGRhdGVFbnRpdGllc0xvYWRlZCA9IHRydWVcbikgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoXG5cdFx0XHQhIGRhdGVFbnRpdGllc0xvYWRlZCB8fFxuXHRcdFx0ISBBcnJheS5pc0FycmF5KCBkYXRlRW50aXRpZXMgKSB8fFxuXHRcdFx0aXNFbXB0eSggZGF0ZUVudGl0aWVzIClcblx0XHQpIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCBkYXRlRW50aXR5SWRzID0gZGF0ZUVudGl0aWVzLm1hcChcblx0XHRcdCggZGF0ZUVudGl0eSApID0+IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBkYXRlRW50aXR5LCAnZGF0ZXRpbWUnICkgP1xuXHRcdFx0XHRkYXRlRW50aXR5LmlkIDpcblx0XHRcdFx0bnVsbFxuXHRcdCk7XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IGVudGl0aWVzID0gZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzKFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGRhdGVFbnRpdHlJZHMsXG5cdFx0XHQndGlja2V0J1xuXHRcdCk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzJyxcblx0XHRcdFsgJ2RhdGV0aW1lJywgZGF0ZUVudGl0eUlkcywgJ3RpY2tldCcgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpY2tldEVudGl0aWVzOiBlbnRpdGllcyxcblx0XHRcdHRpY2tldEVudGl0aWVzTG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBkYXRlRW50aXRpZXMsIGRhdGVFbnRpdGllc0xvYWRlZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IHsgY29uZmlybSB9ID0gd2luZG93O1xuXG5jb25zdCB1c2VUcmFzaERhdGVFbnRpdHkgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0Y29uc3QgeyB0cmFzaEVudGl0eUJ5SWQgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2sgKTtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoICEgY29uZmlybShcblx0XHRcdF9fKFxuXHRcdFx0XHQnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV2ZW50IGRhdGU/Jyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0KVxuXHRcdCkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRyYXNoRW50aXR5QnlJZCggJ2RhdGV0aW1lJywgZXZlbnREYXRlLmlkICk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyYXNoRGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiB1c2VUcmFzaFByaWNlTW9kaWZpZXJcbiAqIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB0d28gZnVuY3Rpb25zOlxuICogIC0gYWRkUHJpY2VNb2RpZmllclxuICogIC0gdHJhc2hQcmljZU1vZGlmaWVyXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBmdW5jdGlvbnNcbiAqL1xuY29uc3QgdXNlVHJhc2hQcmljZU1vZGlmaWVyID0gKCkgPT4ge1xuXHRjb25zdCB7XG5cdFx0cmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHksXG5cdFx0dHJhc2hFbnRpdHlCeUlkLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoIHByaWNlTW9kaWZpZXIsIHRpY2tldEVudGl0eSApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggcHJpY2VNb2RpZmllciwgJ3ByaWNlJyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIHBlcmZvcm0gZGVsZXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFByaWNlJyArXG5cdFx0XHRcdFx0XHQnIEVudGl0eSB3YXMgc3VwcGxpZWQgYnkgdGhlIFRpY2tldCBQcmljZSBDYWxjdWxhdG9yLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHkoXG5cdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHR0aWNrZXRFbnRpdHkuaWQsXG5cdFx0XHRcdCdwcmljZScsXG5cdFx0XHRcdHByaWNlTW9kaWZpZXIuaWRcblx0XHRcdCk7XG5cdFx0XHR0cmFzaEVudGl0eUJ5SWQoICdwcmljZScsIHByaWNlTW9kaWZpZXIuaWQgKTtcblx0XHR9LFxuXHRcdFtdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUcmFzaFByaWNlTW9kaWZpZXI7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IHsgY29uZmlybSB9ID0gd2luZG93O1xuXG5jb25zdCB1c2VUcmFzaFRpY2tldCA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRjb25zdCB7IHRyYXNoRW50aXR5QnlJZCB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIHBlcmZvcm0gZGVsZXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkIGJ5IHRoZSBUaWNrZXQgUHJpY2UgQ2FsY3VsYXRvci4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBjb25maXJtKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdGlja2V0PycsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdClcblx0XHQpICkge1xuXHRcdFx0dHJhc2hFbnRpdHlCeUlkKCAndGlja2V0JywgdGlja2V0RW50aXR5LmlkICk7XG5cdFx0fVxuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUcmFzaFRpY2tldDtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcInJlZ2VuZXJhdG9yUnVudGltZVwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInV0aWxzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
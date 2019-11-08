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
/*! exports provided: useAddPriceModifier, useBasePriceType, useCloneEntities, useCopyDateEntity, useCopyTicket, useCreateDateEntity, useCreateRelationForEventToEventDate, useCreateRelationsForEventDateToTickets, useCreateRelationsForEventDateIdToTicketIds, useCreateRelationsForTicketToEventDates, useCreateRelationsForTicketToPrices, useCreateTicketEntity, useEndDateAfterStartDateValidator, useEndDateChangeListener, useEntityDateChangeListeners, useEntityDateChangeValidators, useEventDateEvent, useEventDateTickets, useEventDateUpdateRelatedTickets, useEventDatesForEvent, useEventEditorEvent, useEventEditorEventDates, useEventEditorTickets, useEventForEventDate, useEventVenue, usePriceTypes, useRect, useRemoveRelationsForEventDateIdToTicketIds, useStartDateChangeListener, useTicketEventDates, useTicketPrices, useTicketsForEventDates, useTrashDateEntity, useTrashPriceModifier, useTrashTicket, usePrevious, useTriggerTicketUiUpdate */
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

/* harmony import */ var _use_event_date_update_related_tickets__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./use-event-date-update-related-tickets */ "./assets/src/hooks/use-event-date-update-related-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDateUpdateRelatedTickets", function() { return _use_event_date_update_related_tickets__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _use_event_dates_for_event__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./use-event-dates-for-event */ "./assets/src/hooks/use-event-dates-for-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDatesForEvent", function() { return _use_event_dates_for_event__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _use_event_editor_event__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./use-event-editor-event */ "./assets/src/hooks/use-event-editor-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorEvent", function() { return _use_event_editor_event__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _use_event_editor_event_dates__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./use-event-editor-event-dates */ "./assets/src/hooks/use-event-editor-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorEventDates", function() { return _use_event_editor_event_dates__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _use_event_editor_tickets__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./use-event-editor-tickets */ "./assets/src/hooks/use-event-editor-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorTickets", function() { return _use_event_editor_tickets__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _use_event_for_event_date__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./use-event-for-event-date */ "./assets/src/hooks/use-event-for-event-date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventForEventDate", function() { return _use_event_for_event_date__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _use_event_venue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./use-event-venue */ "./assets/src/hooks/use-event-venue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventVenue", function() { return _use_event_venue__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _use_price_types__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./use-price-types */ "./assets/src/hooks/use-price-types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePriceTypes", function() { return _use_price_types__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _useRect__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./useRect */ "./assets/src/hooks/useRect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRect", function() { return _useRect__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _use_remove_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./use-remove-relations-for-event-date-id-to-ticket-ids */ "./assets/src/hooks/use-remove-relations-for-event-date-id-to-ticket-ids.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRemoveRelationsForEventDateIdToTicketIds", function() { return _use_remove_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _use_start_date_change_listener__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./use-start-date-change-listener */ "./assets/src/hooks/use-start-date-change-listener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useStartDateChangeListener", function() { return _use_start_date_change_listener__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _use_ticket_event_dates__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./use-ticket-event-dates */ "./assets/src/hooks/use-ticket-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketEventDates", function() { return _use_ticket_event_dates__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _use_ticket_prices__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./use-ticket-prices */ "./assets/src/hooks/use-ticket-prices.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketPrices", function() { return _use_ticket_prices__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _use_tickets_for_event_dates__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./use-tickets-for-event-dates */ "./assets/src/hooks/use-tickets-for-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketsForEventDates", function() { return _use_tickets_for_event_dates__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _use_trash_date_entity__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./use-trash-date-entity */ "./assets/src/hooks/use-trash-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashDateEntity", function() { return _use_trash_date_entity__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _use_trash_price_modifier__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./use-trash-price-modifier */ "./assets/src/hooks/use-trash-price-modifier.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashPriceModifier", function() { return _use_trash_price_modifier__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _use_trash_ticket__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./use-trash-ticket */ "./assets/src/hooks/use-trash-ticket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashTicket", function() { return _use_trash_ticket__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _use_previous__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./use-previous */ "./assets/src/hooks/use-previous.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePrevious", function() { return _use_previous__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _use_trigger_ticket_ui_update__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./use-trigger-ticket-ui-update */ "./assets/src/hooks/use-trigger-ticket-ui-update.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTriggerTicketUiUpdate", function() { return _use_trigger_ticket_ui_update__WEBPACK_IMPORTED_MODULE_36__["default"]; });







































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

/***/ "./assets/src/hooks/use-event-date-update-related-tickets.js":
/*!*******************************************************************!*\
  !*** ./assets/src/hooks/use-event-date-update-related-tickets.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _use_event_date_tickets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-event-date-tickets */ "./assets/src/hooks/use-event-date-tickets.js");
/* harmony import */ var _use_trigger_ticket_ui_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-trigger-ticket-ui-update */ "./assets/src/hooks/use-trigger-ticket-ui-update.js");
/**
 * External imports.
 */

/**
 * Internal imports
 */



/**
 * A custom react hook to update the related ticket entities for the given
 * datetime entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  A datetime BaseEntity instance.
 */

var useEventDateUpdateRelatedTickets = function useEventDateUpdateRelatedTickets(eventDate) {
  var _useEventDateTickets = Object(_use_event_date_tickets__WEBPACK_IMPORTED_MODULE_1__["default"])(eventDate),
      relatedTickets = _useEventDateTickets.tickets,
      ticketsLoaded = _useEventDateTickets.ticketsLoaded;

  var triggerUiUpdate = Object(_use_trigger_ticket_ui_update__WEBPACK_IMPORTED_MODULE_2__["default"])();
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (ticketsLoaded) {
      relatedTickets.forEach(function (ticket) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = mutations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mutation = _step.value;

            if (typeof mutation === 'function') {
              mutation(ticket);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
      triggerUiUpdate();
    }
  }, [eventDate]);
};

/* harmony default export */ __webpack_exports__["default"] = (useEventDateUpdateRelatedTickets);

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

/***/ "./assets/src/hooks/use-trigger-ticket-ui-update.js":
/*!**********************************************************!*\
  !*** ./assets/src/hooks/use-trigger-ticket-ui-update.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports.
 */

/**
 * To show the changes in ticket details
 * trigger the ticket UI update wihout any side effect.
 */

var useTriggerTicketUiUpdate = function useTriggerTicketUiUpdate() {
  var listId = 'event-editor-ticket-list';
  var defaultDisplayDate = 'start';
  var storeKey = 'eventespresso/filter-state';

  var _select = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["select"])(storeKey),
      getFilter = _select.getFilter;

  var _dispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["dispatch"])(storeKey),
      setFilter = _dispatch.setFilter;

  return function () {
    var displayDate = getFilter(listId, 'displayTicketDate', defaultDisplayDate);
    var intermediateValue = displayDate === 'start' ? 'end' : 'start'; // Set the display date to the intermediate value.

    setFilter(listId, 'displayTicketDate', intermediateValue); // Restore the actual value.

    setFilter(listId, 'displayTicketDate', displayDate);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useTriggerTicketUiUpdate);

/***/ }),

/***/ "./assets/src/hooks/useRect.js":
/*!*************************************!*\
  !*** ./assets/src/hooks/useRect.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var _window = window,
    addEventListener = _window.addEventListener,
    removeEventListener = _window.removeEventListener;

var useRect = function useRect(ref) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getRect(ref ? ref.current : null)),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      rect = _useState2[0],
      setRect = _useState2[1];

  var handleResize = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    if (!ref.current) {
      return;
    } // Update client rect


    setRect(getRect(ref.current));
  }, [ref]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useLayoutEffect"])(function () {
    var element = ref.current;

    if (!element) {
      return;
    }

    handleResize(); // eslint-disable-next-line

    if (ResizeObserver && typeof ResizeObserver === 'function') {
      // eslint-disable-next-line
      var resizeObserver = new ResizeObserver(function () {
        return handleResize();
      });
      resizeObserver.observe(element);
      return function () {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } // Browser support, remove freely


    addEventListener('resize', handleResize);
    return function () {
      removeEventListener('resize', handleResize);
    };
  }, [ref.current]);
  return rect;
};

function getRect(element) {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    };
  }

  return element.getBoundingClientRect();
}

/* harmony default export */ __webpack_exports__["default"] = (useRect);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhvb2tzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1hZGQtcHJpY2UtbW9kaWZpZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWJhc2UtcHJpY2UtdHlwZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY2xvbmUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWVuZC1kYXRlLWFmdGVyLXN0YXJ0LWRhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1lbmQtZGF0ZS1jaGFuZ2UtbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWVudGl0eS1kYXRlLWNoYW5nZS1saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWVudGl0eS1kYXRlLWNoYW5nZS12YWxpZGF0b3JzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1kYXRlLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1kYXRlLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtdXBkYXRlLXJlbGF0ZWQtdGlja2V0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWVkaXRvci1ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZWRpdG9yLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWZvci1ldmVudC1kYXRlLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC12ZW51ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtcHJldmlvdXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXByaWNlLXR5cGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1yZW1vdmUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXN0YXJ0LWRhdGUtY2hhbmdlLWxpc3RlbmVyLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10aWNrZXQtZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRpY2tldC1wcmljZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRpY2tldHMtZm9yLWV2ZW50LWRhdGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10cmFzaC1kYXRlLWVudGl0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdHJhc2gtcHJpY2UtbW9kaWZpZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRyYXNoLXRpY2tldC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdHJpZ2dlci10aWNrZXQtdWktdXBkYXRlLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZVJlY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidXRpbHNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbHVlT2JqZWN0c1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJlbGVtZW50XCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpcImxvZGFzaFwifSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpcIlJlYWN0XCJ9Il0sIm5hbWVzIjpbInVzZUFkZFByaWNlTW9kaWZpZXIiLCJ1c2VEaXNwYXRjaCIsImNyZWF0ZUVudGl0eSIsImNyZWF0ZVJlbGF0aW9uIiwidXNlQ2FsbGJhY2siLCJ0aWNrZXRFbnRpdHkiLCJwcm9wZXJ0aWVzIiwicHJpY2VNb2RpZmllciIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwiaWQiLCJ1c2VCYXNlUHJpY2VUeXBlIiwidXNlUHJpY2VUeXBlcyIsInByaWNlVHlwZXMiLCJwcmljZVR5cGVzTG9hZGVkIiwidXNlTWVtbyIsImZpbmQiLCJwcmljZVR5cGUiLCJQQlRfSUQiLCJ1c2VDbG9uZUVudGl0aWVzIiwiZW50aXRpZXNUb0Nsb25lIiwibW9kZWxOYW1lIiwibmV3RW50aXRpZXMiLCJpIiwibGVuZ3RoIiwiZm9yQ2xvbmUiLCJuZXdDbG9uZSIsInB1c2giLCJ1c2VDb3B5RGF0ZUVudGl0eSIsImV2ZW50RGF0ZSIsImNyZWF0ZVJlbGF0aW9ucyIsInVzZUV2ZW50RWRpdG9yRXZlbnQiLCJldnRJZCIsImV2ZW50RW50aXR5IiwidXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMiLCJ0aWNrZXRFbnRpdGllcyIsImNsaWNrIiwiY2FuY2VsQ2xpY2tFdmVudCIsIm5ld0V2ZW50RGF0ZSIsIm5hbWUiLCJzcHJpbnRmIiwiX3giLCJpc0VtcHR5IiwiZmFsc2VGdW5jIiwidXNlQ29weVRpY2tldCIsImRhdGVFbnRpdGllcyIsInJlbGF0ZWRQcmljZXMiLCJ1c2VTZWxlY3QiLCJzZWxlY3QiLCJnZXRSZWxhdGVkRW50aXRpZXMiLCJuZXdQcmljZXMiLCJ1cGRhdGVUaWNrZXREYXRlUmVsYXRpb25zIiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzIiwidXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMiLCJ1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcyIsIm5ld1RpY2tldCIsIkFycmF5IiwiaXNBcnJheSIsInVzZUNyZWF0ZURhdGVFbnRpdHkiLCJldmVudCIsImNhY2hlTmV3RGF0ZSIsInVwZGF0ZUV2ZW50RGF0ZVJlbGF0aW9uIiwidXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlIiwibm93SnMiLCJEYXRlIiwic2V0SG91cnMiLCJnZXRIb3VycyIsIk1hdGgiLCJjZWlsIiwiZ2V0TWludXRlcyIsIm5vdyIsIlNlcnZlckRhdGVUaW1lIiwiZnJvbUpTRGF0ZSIsIkVWVF9JRCIsIkRUVF9uYW1lIiwiRFRUX2Rlc2NyaXB0aW9uIiwiRFRUX0VWVF9zdGFydCIsInBsdXMiLCJEdXJhdGlvbiIsImZyb21PYmplY3QiLCJkYXlzIiwiRFRUX0VWVF9lbmQiLCJob3VycyIsIkRUVF9yZWdfbGltaXQiLCJEVFRfc29sZCIsIkRUVF9yZXNlcnZlZCIsIkRUVF9vcmRlciIsIkRUVF9wYXJlbnQiLCJEVFRfZGVsZXRlZCIsIm5ld0RhdGUiLCJkYXRlRW50aXR5IiwiRXJyb3IiLCJfXyIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJnZXRFbnRpdGllc0J5SWRzIiwiZXZlbnREYXRlSWQiLCJ0aWNrZXRJZHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRpY2tldHMiLCJmb3JFYWNoIiwidGlja2V0IiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzIiwiZXZlbnREYXRlcyIsInByaWNlcyIsInByaWNlIiwidXNlcklEIiwid2luZG93IiwidXNlclNldHRpbmdzIiwidWlkIiwicGFyc2VJbnQiLCJ1c2VDcmVhdGVUaWNrZXRFbnRpdHkiLCJjYWNoZU5ld1RpY2tldCIsImJhc2VQcmljZVR5cGUiLCJUS1RfbmFtZSIsIlRLVF9kZXNjcmlwdGlvbiIsIlRLVF9xdHkiLCJUS1Rfc29sZCIsIlRLVF9yZXNlcnZlZCIsIlRLVF91c2VzIiwiVEtUX3JlcXVpcmVkIiwiVEtUX21pbiIsIlRLVF9tYXgiLCJUS1RfcHJpY2UiLCJNb25leSIsIlNpdGVDdXJyZW5jeSIsIlRLVF9zdGFydERhdGUiLCJUS1RfZW5kRGF0ZSIsIlRLVF90YXhhYmxlIiwiVEtUX29yZGVyIiwiVEtUX2lzRGVmYXVsdCIsIlRLVF9yZXZlcnNlX2NhbGN1bGF0ZSIsIlRLVF93cF91c2VyIiwiVEtUX3BhcmVudCIsIlRLVF9kZWxldGVkIiwiUFJUX0lEIiwibmV3QmFzZVByaWNlIiwidXNlRW5kRGF0ZUFmdGVyU3RhcnREYXRlVmFsaWRhdG9yIiwiZW50aXR5IiwiZGF0ZVByb3BzIiwiaXNNb2RlbEVudGl0eSIsIlR5cGVFcnJvciIsImVuZERhdGUiLCJzdGFydERhdGUiLCJzdGFydCIsInRvSlNEYXRlIiwidXNlRW5kRGF0ZUNoYW5nZUxpc3RlbmVyIiwic3RhcnREYXRlRm9ybUtleSIsImVuZERhdGVGb3JtS2V5IiwidXBkYXRlRmllbGQiLCJ0b3VjaEZpZWxkIiwibmV3RGF0ZVZhbHVlIiwicHJldkRhdGVWYWx1ZSIsImdldFNlcnZlckRhdGVUaW1lIiwiZW5kIiwidXNlRW50aXR5RGF0ZUNoYW5nZUxpc3RlbmVycyIsInByb3BzIiwic3RhcnREYXRlQ2hhbmdlTGlzdGVuZXIiLCJ1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lciIsImVuZERhdGVDaGFuZ2VMaXN0ZW5lciIsInVzZUVuZERhdGVDaGFuZ2VWYWxpZGF0b3IiLCJ1c2VTdGFydERhdGVDaGFuZ2VWYWxpZGF0b3IiLCJ1c2VFbnRpdHlEYXRlQ2hhbmdlVmFsaWRhdG9ycyIsInN0YXJ0RGF0ZUNoYW5nZVZhbGlkYXRvciIsImVuZERhdGVDaGFuZ2VWYWxpZGF0b3IiLCJERUZBVUxUIiwiZXZlbnRMb2FkZWQiLCJ1c2VFdmVudERhdGVFdmVudCIsIndhcm5pbmciLCJoYXNGaW5pc2hlZFJlc29sdXRpb24iLCJ0aWNrZXRzTG9hZGVkIiwidXNlRXZlbnREYXRlVGlja2V0cyIsInVzZUV2ZW50RGF0ZVVwZGF0ZVJlbGF0ZWRUaWNrZXRzIiwicmVsYXRlZFRpY2tldHMiLCJ0cmlnZ2VyVWlVcGRhdGUiLCJ1c2VUcmlnZ2VyVGlja2V0VWlVcGRhdGUiLCJtdXRhdGlvbnMiLCJtdXRhdGlvbiIsImRhdGVFbnRpdGllc0xvYWRlZCIsInVzZUV2ZW50RGF0ZXNGb3JFdmVudCIsImVudGl0aWVzIiwibG9hZGVkIiwiZXZlbnREYXRlc0xvYWRlZCIsInVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyIsImdldEVudGl0aWVzRm9yTW9kZWwiLCJldmVudElkIiwiaGFzT3duUHJvcGVydHkiLCJnZXRFbnRpdHlCeUlkIiwiZXZlbnRFbnRpdHlMb2FkZWQiLCJ1c2VFdmVudEVkaXRvclRpY2tldHMiLCJ1c2VFdmVudEZvckV2ZW50RGF0ZSIsInZlbnVlRW50aXR5IiwidmVudWVFbnRpdHlMb2FkZWQiLCJ1c2VFdmVudFZlbnVlIiwidXNlUHJldmlvdXMiLCJ2YWx1ZSIsInJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJnZXRFbnRpdGllcyIsInVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJyZW1vdmVSZWxhdGlvbkZvckVudGl0eSIsInRpY2tldElkIiwib3JpZ2luYWxEdXJhdGlvbiIsImRpZmYiLCJpc1ZhbGlkRHVyYXRpb24iLCJuZXdFbmREYXRlIiwidG9JU08iLCJ1c2VUaWNrZXRFdmVudERhdGVzIiwicHJpY2VzTG9hZGVkIiwibm9CYXNlUHJpY2UiLCJ1c2VUaWNrZXRQcmljZXMiLCJ0aWNrZXRFbnRpdGllc0xvYWRlZCIsImRhdGVFbnRpdHlJZHMiLCJtYXAiLCJnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMiLCJjb25maXJtIiwidXNlVHJhc2hEYXRlRW50aXR5IiwidHJhc2hFbnRpdHlCeUlkIiwidXNlVHJhc2hQcmljZU1vZGlmaWVyIiwidXNlVHJhc2hUaWNrZXQiLCJsaXN0SWQiLCJkZWZhdWx0RGlzcGxheURhdGUiLCJzdG9yZUtleSIsImdldEZpbHRlciIsImRpc3BhdGNoIiwic2V0RmlsdGVyIiwiZGlzcGxheURhdGUiLCJpbnRlcm1lZGlhdGVWYWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidXNlUmVjdCIsInVzZVN0YXRlIiwiZ2V0UmVjdCIsInJlY3QiLCJzZXRSZWN0IiwiaGFuZGxlUmVzaXplIiwidXNlTGF5b3V0RWZmZWN0IiwiZWxlbWVudCIsIlJlc2l6ZU9ic2VydmVyIiwicmVzaXplT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsImJvdHRvbSIsImhlaWdodCIsImxlZnQiLCJyaWdodCIsInRvcCIsIndpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERBOzs7QUFH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QUFvQyw4SEFBOEgsR0FBRyxFQUFFLHNCQUFzQjs7QUFFblc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLGFBQW9COztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM3REEsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLHVDQUF1QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLCtDQUErQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsZ0NBQWdDLEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLWhvb2tzLmE4YjkxNTRhYmJmODFiOTY4MzdlLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvaG9va3MvaW5kZXguanNcIik7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHVzZUFkZFByaWNlTW9kaWZpZXIgfSBmcm9tICcuL3VzZS1hZGQtcHJpY2UtbW9kaWZpZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VCYXNlUHJpY2VUeXBlIH0gZnJvbSAnLi91c2UtYmFzZS1wcmljZS10eXBlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ2xvbmVFbnRpdGllcyB9IGZyb20gJy4vdXNlLWNsb25lLWVudGl0aWVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ29weURhdGVFbnRpdHkgfSBmcm9tICcuL3VzZS1jb3B5LWRhdGUtZW50aXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ29weVRpY2tldCB9IGZyb20gJy4vdXNlLWNvcHktdGlja2V0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlRGF0ZUVudGl0eSB9IGZyb20gJy4vdXNlLWNyZWF0ZS1kYXRlLWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZVRvVGlja2V0cyB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLWV2ZW50LWRhdGUtdG8tdGlja2V0cyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXMgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tZXZlbnQtZGF0ZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcyB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1wcmljZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVUaWNrZXRFbnRpdHkgfSBmcm9tICcuL3VzZS1jcmVhdGUtdGlja2V0LWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUVuZERhdGVBZnRlclN0YXJ0RGF0ZVZhbGlkYXRvciB9XG5cdGZyb20gJy4vdXNlLWVuZC1kYXRlLWFmdGVyLXN0YXJ0LWRhdGUtdmFsaWRhdG9yJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRW5kRGF0ZUNoYW5nZUxpc3RlbmVyIH1cblx0ZnJvbSAnLi91c2UtZW5kLWRhdGUtY2hhbmdlLWxpc3RlbmVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRW50aXR5RGF0ZUNoYW5nZUxpc3RlbmVycyB9XG5cdGZyb20gJy4vdXNlLWVudGl0eS1kYXRlLWNoYW5nZS1saXN0ZW5lcnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFbnRpdHlEYXRlQ2hhbmdlVmFsaWRhdG9ycyB9XG5cdGZyb20gJy4vdXNlLWVudGl0eS1kYXRlLWNoYW5nZS12YWxpZGF0b3JzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlRXZlbnQgfSBmcm9tICcuL3VzZS1ldmVudC1kYXRlLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlVGlja2V0cyB9IGZyb20gJy4vdXNlLWV2ZW50LWRhdGUtdGlja2V0cyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RGF0ZVVwZGF0ZVJlbGF0ZWRUaWNrZXRzIH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZS11cGRhdGUtcmVsYXRlZC10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlc0ZvckV2ZW50IH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRFZGl0b3JFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yVGlja2V0cyB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRGb3JFdmVudERhdGUgfSBmcm9tICcuL3VzZS1ldmVudC1mb3ItZXZlbnQtZGF0ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50VmVudWUgfSBmcm9tICcuL3VzZS1ldmVudC12ZW51ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVByaWNlVHlwZXMgfSBmcm9tICcuL3VzZS1wcmljZS10eXBlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVJlY3QgfSBmcm9tICcuL3VzZVJlY3QnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VSZW1vdmVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzIH1cblx0ZnJvbSAnLi91c2UtcmVtb3ZlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlU3RhcnREYXRlQ2hhbmdlTGlzdGVuZXIgfVxuXHRmcm9tICcuL3VzZS1zdGFydC1kYXRlLWNoYW5nZS1saXN0ZW5lcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRpY2tldEV2ZW50RGF0ZXMgfSBmcm9tICcuL3VzZS10aWNrZXQtZXZlbnQtZGF0ZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUaWNrZXRQcmljZXMgfSBmcm9tICcuL3VzZS10aWNrZXQtcHJpY2VzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMgfVxuXHRmcm9tICcuL3VzZS10aWNrZXRzLWZvci1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRyYXNoRGF0ZUVudGl0eSB9IGZyb20gJy4vdXNlLXRyYXNoLWRhdGUtZW50aXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVHJhc2hQcmljZU1vZGlmaWVyIH0gZnJvbSAnLi91c2UtdHJhc2gtcHJpY2UtbW9kaWZpZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUcmFzaFRpY2tldCB9IGZyb20gJy4vdXNlLXRyYXNoLXRpY2tldCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVByZXZpb3VzIH0gZnJvbSAnLi91c2UtcHJldmlvdXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUcmlnZ2VyVGlja2V0VWlVcGRhdGUgfSBmcm9tICcuL3VzZS10cmlnZ2VyLXRpY2tldC11aS11cGRhdGUnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogdXNlQWRkUHJpY2VNb2RpZmllclxuICogcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHR3byBmdW5jdGlvbnM6XG4gKiAgLSBhZGRQcmljZU1vZGlmaWVyXG4gKiAgLSB0cmFzaFByaWNlTW9kaWZpZXJcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGZ1bmN0aW9uc1xuICovXG5jb25zdCB1c2VBZGRQcmljZU1vZGlmaWVyID0gKCkgPT4ge1xuXHRjb25zdCB7XG5cdFx0Y3JlYXRlRW50aXR5LFxuXHRcdGNyZWF0ZVJlbGF0aW9uLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoIHRpY2tldEVudGl0eSwgcHJvcGVydGllcyApID0+IHtcblx0XHRcdGNvbnN0IHByaWNlTW9kaWZpZXIgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdCdwcmljZScsXG5cdFx0XHRcdHByb3BlcnRpZXNcblx0XHRcdCk7XG5cdFx0XHRpZiAoIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBwcmljZU1vZGlmaWVyLCAncHJpY2UnICkgKSB7XG5cdFx0XHRcdGNyZWF0ZVJlbGF0aW9uKFxuXHRcdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHRcdHRpY2tldEVudGl0eS5pZCxcblx0XHRcdFx0XHQncHJpY2UnLFxuXHRcdFx0XHRcdHByaWNlTW9kaWZpZXJcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdFtdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VBZGRQcmljZU1vZGlmaWVyO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgZmluZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHVzZVByaWNlVHlwZXMgZnJvbSAnLi91c2UtcHJpY2UtdHlwZXMnO1xuXG5jb25zdCB1c2VCYXNlUHJpY2VUeXBlID0gKCkgPT4ge1xuXHRjb25zdCB7IHByaWNlVHlwZXMsIHByaWNlVHlwZXNMb2FkZWQgfSA9IHVzZVByaWNlVHlwZXMoKTtcblx0cmV0dXJuIHVzZU1lbW8oXG5cdFx0KCkgPT4ge1xuXHRcdFx0aWYgKCAhIHByaWNlVHlwZXNMb2FkZWQgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpbmQoXG5cdFx0XHRcdHByaWNlVHlwZXMsXG5cdFx0XHRcdCggcHJpY2VUeXBlICkgPT4gcHJpY2VUeXBlLlBCVF9JRCA9PT0gMVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdFsgcHJpY2VUeXBlcywgcHJpY2VUeXBlc0xvYWRlZCBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VCYXNlUHJpY2VUeXBlO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuY29uc3QgdXNlQ2xvbmVFbnRpdGllcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggZW50aXRpZXNUb0Nsb25lLCBtb2RlbE5hbWUgKSA9PiB7XG5cdFx0Y29uc3QgbmV3RW50aXRpZXMgPSBbXTtcblx0XHRpZiAoIGVudGl0aWVzVG9DbG9uZSAmJiBtb2RlbE5hbWUgKSB7XG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBlbnRpdGllc1RvQ2xvbmUubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0Nsb25lID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdFx0XHRlbnRpdGllc1RvQ2xvbmVbIGkgXS5mb3JDbG9uZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRuZXdFbnRpdGllcy5wdXNoKCBuZXdDbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbmV3RW50aXRpZXM7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNsb25lRW50aXRpZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuaW1wb3J0IHsgX3gsIHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VFdmVudEVkaXRvckV2ZW50LCB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyB9IGZyb20gJy4vaW5kZXgnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBmdW5jdGlvbiBmb3IgY29weWluZyBhbiBldmVudCBkYXRlIGVudGl0eVxuICovXG5jb25zdCB1c2VDb3B5RGF0ZUVudGl0eSA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRjb25zdCB7XG5cdFx0Y3JlYXRlRW50aXR5LFxuXHRcdGNyZWF0ZVJlbGF0aW9ucyxcblx0fSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB7IGV2ZW50RW50aXR5IH0gPSB1c2VFdmVudEVkaXRvckV2ZW50KCBldmVudERhdGUuZXZ0SWQgKTtcblx0Y29uc3QgeyB0aWNrZXRFbnRpdGllcyB9ID0gdXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMoIFsgZXZlbnREYXRlIF0gKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGNsaWNrICkgPT4ge1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrICk7XG5cdFx0aWYgKFxuXHRcdFx0ISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnRFbnRpdHksICdldmVudCcgKSB8fFxuXHRcdFx0ISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnIClcblx0XHQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5ld0V2ZW50RGF0ZSA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRldmVudERhdGUuZm9yQ2xvbmVcblx0XHQpO1xuXHRcdG5ld0V2ZW50RGF0ZS5uYW1lID0gc3ByaW50Zihcblx0XHRcdF94KCAnJXMgLSBDT1BZJywgJ0V2ZW50IERhdGUgTmFtZSAtIENPUFknLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRuZXdFdmVudERhdGUubmFtZVxuXHRcdCk7XG5cdFx0aWYgKCAhIGlzRW1wdHkoIHRpY2tldEVudGl0aWVzICkgKSB7XG5cdFx0XHRjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdG5ld0V2ZW50RGF0ZS5pZCxcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldEVudGl0aWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQnZXZlbnQnLFxuXHRcdFx0ZXZlbnRFbnRpdHkuaWQsXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0WyBuZXdFdmVudERhdGUgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIG5ld0V2ZW50RGF0ZTtcblx0fSwgWyBldmVudEVudGl0eSwgdGlja2V0RW50aXRpZXMgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ29weURhdGVFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ2xvbmVFbnRpdGllcyBmcm9tICcuL3VzZS1jbG9uZS1lbnRpdGllcyc7XG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzXG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcyc7XG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5cbmNvbnN0IGZhbHNlRnVuYyA9ICgpID0+IGZhbHNlO1xuXG5jb25zdCB1c2VDb3B5VGlja2V0ID0gKCB0aWNrZXRFbnRpdHksIGRhdGVFbnRpdGllcyApID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCByZWxhdGVkUHJpY2VzID0gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdHJldHVybiBnZXRSZWxhdGVkRW50aXRpZXMoIHRpY2tldEVudGl0eSwgJ3ByaWNlcycgKTtcblx0fSwgWyB0aWNrZXRFbnRpdHkgXSApO1xuXHRjb25zdCBuZXdQcmljZXMgPSB1c2VDbG9uZUVudGl0aWVzKCByZWxhdGVkUHJpY2VzLCAncHJpY2UnICk7XG5cdGNvbnN0IHVwZGF0ZVRpY2tldERhdGVSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXMoKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcygpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICgpID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHJldHVybiBmYWxzZUZ1bmM7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3VGlja2V0ID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0J3RpY2tldCcsXG5cdFx0XHR0aWNrZXRFbnRpdHkuZm9yQ2xvbmVcblx0XHQpO1xuXG5cdFx0dXBkYXRlVGlja2V0RGF0ZVJlbGF0aW9ucyggbmV3VGlja2V0LCBkYXRlRW50aXRpZXMgKTtcblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIG5ld1ByaWNlcyApICYmIG5ld1ByaWNlcy5sZW5ndGggKSB7XG5cdFx0XHRhd2FpdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyggbmV3VGlja2V0LCBuZXdQcmljZXMgKTtcblx0XHR9XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNvcHlUaWNrZXQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgU2VydmVyRGF0ZVRpbWUsIER1cmF0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGVcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9uLWZvci1ldmVudC10by1ldmVudC1kYXRlJztcblxuY29uc3QgdXNlQ3JlYXRlRGF0ZUVudGl0eSA9ICggZXZlbnQsIGNhY2hlTmV3RGF0ZSApID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB1cGRhdGVFdmVudERhdGVSZWxhdGlvbiA9IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSgpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3Qgbm93SnMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0bm93SnMuc2V0SG91cnMoXG5cdFx0XHRcdG5vd0pzLmdldEhvdXJzKCksXG5cdFx0XHRcdE1hdGguY2VpbCggbm93SnMuZ2V0TWludXRlcygpIC8gMTUgKSAqIDE1LFxuXHRcdFx0XHQwLFxuXHRcdFx0XHQwXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgbm93ID0gU2VydmVyRGF0ZVRpbWUuZnJvbUpTRGF0ZSggbm93SnMgKTtcblx0XHRcdGNvbnN0IG5ld0RhdGUgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRFVlRfSUQ6IGV2ZW50LmlkLFxuXHRcdFx0XHRcdERUVF9uYW1lOiAnJyxcblx0XHRcdFx0XHREVFRfZGVzY3JpcHRpb246ICcnLFxuXHRcdFx0XHRcdERUVF9FVlRfc3RhcnQ6IG5vdy5wbHVzKFxuXHRcdFx0XHRcdFx0RHVyYXRpb24uZnJvbU9iamVjdCggeyBkYXlzOiAzMCB9IClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdERUVF9FVlRfZW5kOiBub3cucGx1cyhcblx0XHRcdFx0XHRcdER1cmF0aW9uLmZyb21PYmplY3QoIHsgZGF5czogMzAsIGhvdXJzOiAyIH0gKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0RFRUX3JlZ19saW1pdDogLTEsXG5cdFx0XHRcdFx0RFRUX3NvbGQ6IDAsXG5cdFx0XHRcdFx0RFRUX3Jlc2VydmVkOiAwLFxuXHRcdFx0XHRcdERUVF9vcmRlcjogMCxcblx0XHRcdFx0XHREVFRfcGFyZW50OiAwLFxuXHRcdFx0XHRcdERUVF9kZWxldGVkOiBmYWxzZSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHVwZGF0ZUV2ZW50RGF0ZVJlbGF0aW9uKCBldmVudCwgbmV3RGF0ZSApO1xuXHRcdFx0Y2FjaGVOZXdEYXRlKCBuZXdEYXRlICk7XG5cdFx0fSxcblx0XHRbIGV2ZW50LCBjYWNoZU5ld0RhdGUgXVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlRGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBUaGlzIGN1c3RvbSBob29rIHJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nXG4gKiBhbiBldmVudCAtPiBkYXRlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGV2ZW50IGVudGl0eSBhbmQgZGF0ZSBlbnRpdHkuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIGV2ZW50IGVudGl0eVxuICogIC0gIGV2ZW50IGRhdGUgZW50aXR5XG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgZXZlbnQgZGF0ZSByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9uIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGV2ZW50RW50aXR5LCBkYXRlRW50aXR5ICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnRFbnRpdHksICdldmVudCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIEV2ZW50IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZGF0ZUVudGl0eSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRGF0ZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gY3JlYXRlUmVsYXRpb24oXG5cdFx0XHQnZXZlbnQnLFxuXHRcdFx0ZXZlbnRFbnRpdHkuaWQsXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZGF0ZUVudGl0eVxuXHRcdCk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhbiBldmVudCBkYXRlIGVudGl0eSBhbmQgb25lIG9yIG1vcmUgdGlja2V0IGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudERhdGVJZCBJRCBmb3IgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqICAtICB0aWNrZXRJZHMgYXJyYXkgb2YgdGlja2V0IGVudGl0eSBJRHNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgeyBnZXRFbnRpdGllc0J5SWRzIH0gPSB1c2VTZWxlY3QoXG5cdFx0KCBzZWxlY3QgKSA9PiBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICksXG5cdFx0W11cblx0KTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGV2ZW50RGF0ZUlkLCB0aWNrZXRJZHMgKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBhc3luYyAoIHJlc29sdmUgKSA9PiB7XG5cdFx0XHRsZXQgdGlja2V0cyA9IGF3YWl0IGdldEVudGl0aWVzQnlJZHMoICd0aWNrZXQnLCB0aWNrZXRJZHMgKTtcblx0XHRcdHRpY2tldHMgPSBBcnJheS5pc0FycmF5KCB0aWNrZXRzICkgPyB0aWNrZXRzIDogWyB0aWNrZXRzIF07XG5cdFx0XHR0aWNrZXRzLmZvckVhY2goICggdGlja2V0ICkgPT4ge1xuXHRcdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdGV2ZW50RGF0ZUlkLFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0dGlja2V0cyxcblx0XHRcdCk7XG5cdFx0XHRyZXNvbHZlKCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhbiBldmVudCBkYXRlIGVudGl0eSBhbmQgb25lIG9yIG1vcmUgdGlja2V0IGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudERhdGUgZW50aXR5XG4gKiAgLSAgdGlja2V0cyBhcnJheSBvZiB0aWNrZXQgZW50aXRpZXNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZVRvVGlja2V0cyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggZXZlbnREYXRlLCB0aWNrZXRzICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBFdmVudCBEYXRlIEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHRpY2tldHMgPSBBcnJheS5pc0FycmF5KCB0aWNrZXRzICkgPyB0aWNrZXRzIDogWyB0aWNrZXRzIF07XG5cdFx0dGlja2V0cy5mb3JFYWNoKCAoIHRpY2tldCApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0LCAndGlja2V0JyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdGF3YWl0IGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRldmVudERhdGUsXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldHMsXG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhIHRpY2tldCBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIGV2ZW50IGRhdGUgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIHRpY2tldCBlbnRpdHlcbiAqICAtICBldmVudERhdGVzIGFycmF5IG9mIGV2ZW50IGRhdGUgZW50aXRpZXNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggdGlja2V0LCBldmVudERhdGVzICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0LCAndGlja2V0JyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGV2ZW50RGF0ZXMgPSBBcnJheS5pc0FycmF5KCBldmVudERhdGVzICkgPyBldmVudERhdGVzIDogWyBldmVudERhdGVzIF07XG5cdFx0ZXZlbnREYXRlcy5mb3JFYWNoKCAoIGV2ZW50RGF0ZSApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBFdmVudCBEYXRlIEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdGF3YWl0IGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0dGlja2V0LmlkLFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGV2ZW50RGF0ZXNcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgdXBkYXRpbmcgcmVsYXRpb25zXG4gKiBiZXR3ZWVuIGEgdGlja2V0IGVudGl0eSBhbmQgb25lIG9yIG1vcmUgcHJpY2UgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIHRpY2tldCBlbnRpdHlcbiAqICAtICBwcmljZXMgYXJyYXkgb2YgcHJpY2UgZW50aXRpZXNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9ucyB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCB0aWNrZXQsIHByaWNlcyApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRwcmljZXMgPSBBcnJheS5pc0FycmF5KCBwcmljZXMgKSA/IHByaWNlcyA6IFsgcHJpY2VzIF07XG5cdFx0cHJpY2VzLmZvckVhY2goICggcHJpY2UgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHByaWNlLCAncHJpY2UnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBQcmljZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldC5pZCxcblx0XHRcdCdwcmljZScsXG5cdFx0XHRwcmljZXNcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQge1xuXHREdXJhdGlvbixcblx0U2VydmVyRGF0ZVRpbWUsXG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuXG5jb25zdCB1c2VySUQgPSB0eXBlb2Ygd2luZG93LnVzZXJTZXR0aW5ncyA9PT0gJ29iamVjdCcgJiZcblx0d2luZG93LnVzZXJTZXR0aW5ncy51aWQgP1xuXHRwYXJzZUludCggd2luZG93LnVzZXJTZXR0aW5ncy51aWQsIDEwICkgOlxuXHRudWxsO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5cbmNvbnN0IHVzZUNyZWF0ZVRpY2tldEVudGl0eSA9ICggY2FjaGVOZXdUaWNrZXQsIGJhc2VQcmljZVR5cGUgKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcygpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3Qgbm93SnMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0bm93SnMuc2V0SG91cnMoXG5cdFx0XHRcdG5vd0pzLmdldEhvdXJzKCksXG5cdFx0XHRcdE1hdGguY2VpbCggbm93SnMuZ2V0TWludXRlcygpIC8gMTUgKSAqIDE1LFxuXHRcdFx0XHQwLFxuXHRcdFx0XHQwXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgbm93ID0gU2VydmVyRGF0ZVRpbWUuZnJvbUpTRGF0ZSggbm93SnMgKTtcblx0XHRcdGNvbnN0IG5ld1RpY2tldCA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRUS1RfbmFtZTogJycsXG5cdFx0XHRcdFx0VEtUX2Rlc2NyaXB0aW9uOiAnJyxcblx0XHRcdFx0XHRUS1RfcXR5OiAtMSxcblx0XHRcdFx0XHRUS1Rfc29sZDogMCxcblx0XHRcdFx0XHRUS1RfcmVzZXJ2ZWQ6IDAsXG5cdFx0XHRcdFx0VEtUX3VzZXM6IC0xLFxuXHRcdFx0XHRcdFRLVF9yZXF1aXJlZDogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX21pbjogMCxcblx0XHRcdFx0XHRUS1RfbWF4OiAtMSxcblx0XHRcdFx0XHRUS1RfcHJpY2U6IG5ldyBNb25leSggMCwgU2l0ZUN1cnJlbmN5ICksXG5cdFx0XHRcdFx0VEtUX3N0YXJ0RGF0ZTogbm93LFxuXHRcdFx0XHRcdFRLVF9lbmREYXRlOiBub3cucGx1cyhcblx0XHRcdFx0XHRcdER1cmF0aW9uLmZyb21PYmplY3QoIHsgZGF5czogMzAgfSApXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRUS1RfdGF4YWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX29yZGVyOiAwLFxuXHRcdFx0XHRcdFRLVF9pc0RlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFRLVF9yZXZlcnNlX2NhbGN1bGF0ZTogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX3dwX3VzZXI6IHVzZXJJRCxcblx0XHRcdFx0XHRUS1RfcGFyZW50OiAwLFxuXHRcdFx0XHRcdFRLVF9kZWxldGVkOiBmYWxzZSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IG5ld0Jhc2VQcmljZSA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0eyBQUlRfSUQ6IGJhc2VQcmljZVR5cGUuaWQgfVxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zKCBuZXdUaWNrZXQsIFsgbmV3QmFzZVByaWNlIF0gKTtcblx0XHRcdGNhY2hlTmV3VGlja2V0KCBuZXdUaWNrZXQgKTtcblx0XHR9LFxuXHRcdFsgY3JlYXRlRW50aXR5LCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVUaWNrZXRFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCB1c2VFbmREYXRlQWZ0ZXJTdGFydERhdGVWYWxpZGF0b3IgPSAoIHtcblx0ZW50aXR5LFxuXHRkYXRlUHJvcHMsXG59ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eSggZW50aXR5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdJbnZhbGlkIEVudGl0eSBzdXBwbGllZCB0byB1c2VFbmREYXRlQ2hhbmdlVmFsaWRhdG9yJ1xuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGVuZERhdGUgKSA9PiB7XG5cdFx0Y29uc3Qgc3RhcnREYXRlID0gZW50aXR5WyBkYXRlUHJvcHMuc3RhcnQgXS50b0pTRGF0ZSgpO1xuXHRcdC8vIFNldCB0aGUgdGltZSB0byBtaWRuaWdodFxuXHRcdC8vIHNvIGFzIG5vdCB0byBkaXNhYmxlIHRoZSBzYW1lIHN0YXJ0IGFuZCBlbmQgZGF5XG5cdFx0ZW5kRGF0ZS5zZXRIb3VycyggMCwgMCwgMCwgMCApO1xuXHRcdHN0YXJ0RGF0ZS5zZXRIb3VycyggMCwgMCwgMCwgMCApO1xuXHRcdHJldHVybiBlbmREYXRlIC0gc3RhcnREYXRlIDwgMDtcblx0fSwgWyBlbnRpdHlbIGRhdGVQcm9wcy5zdGFydCBdIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUVuZERhdGVBZnRlclN0YXJ0RGF0ZVZhbGlkYXRvcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3V0aWxzJztcbmltcG9ydCB7IFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogVmVyaWZpZXMgdGhhdCBlbmQgZGF0ZSB2YWx1ZSBoYXMgY2hhbmdlZCBhbmQgdXBkYXRlcyBlbnRpdHkgYWNjb3JkaW5nbHkuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEBtZW1iZXIge09iamVjdH0gZW50aXR5XG4gKiBAbWVtYmVyIHtPYmplY3R9IGRhdGVQcm9wc1xuICogQG1lbWJlciB7c3RyaW5nfSBzdGFydERhdGVGb3JtS2V5IGlkZW50aWZpZXIgZm9yIFJlYWN0IEZpbmFsIEZvcm0gZGF0YSBzY2hlbWFcbiAqIEBtZW1iZXIge3N0cmluZ30gZW5kRGF0ZUZvcm1LZXkgaWRlbnRpZmllciBmb3IgUmVhY3QgRmluYWwgRm9ybSBkYXRhIHNjaGVtYVxuICogQG1lbWJlciB7RnVuY3Rpb259IHVwZGF0ZUZpZWxkIGNhbGxiYWNrIGZvciBlZGl0aW5nIGEgZmllbGRcbiAqIEBtZW1iZXIge0Z1bmN0aW9ufSB0b3VjaEZpZWxkIGNhbGxiYWNrIGZvciBtYXJraW5nIGZpZWxkIGFzIGNoYW5nZWRcbiAqIEByZXR1cm4ge09iamVjdH0gZW50aXR5U3RhcnREYXRlICYgZW50aXR5RW5kRGF0ZVxuICovXG5jb25zdCB1c2VFbmREYXRlQ2hhbmdlTGlzdGVuZXIgPSAoIHtcblx0ZW50aXR5LFxuXHRkYXRlUHJvcHMsXG5cdHN0YXJ0RGF0ZUZvcm1LZXksXG5cdGVuZERhdGVGb3JtS2V5LFxuXHR1cGRhdGVGaWVsZCxcblx0dG91Y2hGaWVsZCxcbn0gKSA9PiB7XG5cdGlmICggISBpc01vZGVsRW50aXR5KCBlbnRpdHkgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J0ludmFsaWQgRW50aXR5IHN1cHBsaWVkIHRvIHVzZVN0YXJ0RGF0ZUNoYW5nZUxpc3RlbmVyJ1xuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIG5ld0RhdGVWYWx1ZSwgcHJldkRhdGVWYWx1ZSApID0+IHtcblx0XHRpZiAoIG5ld0RhdGVWYWx1ZSAmJiBuZXdEYXRlVmFsdWUgIT09IHByZXZEYXRlVmFsdWUgKSB7XG5cdFx0XHRjb25zdCBuZXdEYXRlID0gZ2V0U2VydmVyRGF0ZVRpbWUoIG5ld0RhdGVWYWx1ZSApO1xuXHRcdFx0aWYgKCBuZXdEYXRlIGluc3RhbmNlb2YgU2VydmVyRGF0ZVRpbWUgKSB7XG5cdFx0XHRcdGVudGl0eVsgZGF0ZVByb3BzLmVuZCBdID0gbmV3RGF0ZTtcblx0XHRcdH1cblx0XHRcdHRvdWNoRmllbGQoIHN0YXJ0RGF0ZUZvcm1LZXkgKTtcblx0XHRcdHRvdWNoRmllbGQoIGVuZERhdGVGb3JtS2V5ICk7XG5cdFx0fVxuXHR9LCBbXG5cdFx0ZW50aXR5WyBkYXRlUHJvcHMuc3RhcnQgXSxcblx0XHRlbnRpdHlbIGRhdGVQcm9wcy5lbmQgXSxcblx0XHRzdGFydERhdGVGb3JtS2V5LFxuXHRcdGVuZERhdGVGb3JtS2V5LFxuXHRcdHVwZGF0ZUZpZWxkLFxuXHRcdHRvdWNoRmllbGQsXG5cdF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUVuZERhdGVDaGFuZ2VMaXN0ZW5lcjtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgdXNlRW5kRGF0ZUNoYW5nZUxpc3RlbmVyIGZyb20gJy4vdXNlLWVuZC1kYXRlLWNoYW5nZS1saXN0ZW5lcic7XG5pbXBvcnQgdXNlU3RhcnREYXRlQ2hhbmdlTGlzdGVuZXIgZnJvbSAnLi91c2Utc3RhcnQtZGF0ZS1jaGFuZ2UtbGlzdGVuZXInO1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgZW5kIGRhdGUgdmFsdWUgaGFzIGNoYW5nZWQgYW5kIHVwZGF0ZXMgZW50aXR5IGFjY29yZGluZ2x5LlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gKiBAbWVtYmVyIHtPYmplY3R9IGVudGl0eVxuICogQG1lbWJlciB7T2JqZWN0fSBkYXRlUHJvcHNcbiAqIEBtZW1iZXIge3N0cmluZ30gc3RhcnREYXRlRm9ybUtleSBpZGVudGlmaWVyIGZvciBSZWFjdCBGaW5hbCBGb3JtIGRhdGEgc2NoZW1hXG4gKiBAbWVtYmVyIHtzdHJpbmd9IGVuZERhdGVGb3JtS2V5IGlkZW50aWZpZXIgZm9yIFJlYWN0IEZpbmFsIEZvcm0gZGF0YSBzY2hlbWFcbiAqIEBtZW1iZXIge0Z1bmN0aW9ufSB1cGRhdGVGaWVsZCBjYWxsYmFjayBmb3IgZWRpdGluZyBhIGZpZWxkXG4gKiBAbWVtYmVyIHtGdW5jdGlvbn0gdG91Y2hGaWVsZCBjYWxsYmFjayBmb3IgbWFya2luZyBmaWVsZCBhcyBjaGFuZ2VkXG4gKiBAcmV0dXJuIHtPYmplY3R9IGVudGl0eVN0YXJ0RGF0ZSAmIGVudGl0eUVuZERhdGVcbiAqL1xuY29uc3QgdXNlRW50aXR5RGF0ZUNoYW5nZUxpc3RlbmVycyA9ICggcHJvcHMgKSA9PiB7XG5cdHJldHVybiB7XG5cdFx0c3RhcnREYXRlQ2hhbmdlTGlzdGVuZXI6IHVzZVN0YXJ0RGF0ZUNoYW5nZUxpc3RlbmVyKCBwcm9wcyApLFxuXHRcdGVuZERhdGVDaGFuZ2VMaXN0ZW5lcjogdXNlRW5kRGF0ZUNoYW5nZUxpc3RlbmVyKCBwcm9wcyApLFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRW50aXR5RGF0ZUNoYW5nZUxpc3RlbmVycztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgZ2V0U2VydmVyRGF0ZVRpbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IHVzZUVuZERhdGVDaGFuZ2VWYWxpZGF0b3IgPSAoIHtcblx0ZW50aXR5LFxuXHRkYXRlUHJvcHMsXG59ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eSggZW50aXR5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdJbnZhbGlkIEVudGl0eSBzdXBwbGllZCB0byB1c2VFbmREYXRlQ2hhbmdlVmFsaWRhdG9yJ1xuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIG5ld0RhdGVWYWx1ZSApID0+IHtcblx0XHRpZiAoIG5ld0RhdGVWYWx1ZSApIHtcblx0XHRcdGNvbnN0IGVuZERhdGUgPSBnZXRTZXJ2ZXJEYXRlVGltZSggbmV3RGF0ZVZhbHVlICk7XG5cdFx0XHRpZiAoIGVuZERhdGUgPCBlbnRpdHlbIGRhdGVQcm9wcy5zdGFydCBdICkge1xuXHRcdFx0XHRyZXR1cm4gX18oXG5cdFx0XHRcdFx0J0VuZCBEYXRlICYgVGltZSBtdXN0IGJlIHNldCBsYXRlciB0aGFuIHRoZSBTdGFydCBEYXRlICYgVGltZScsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwgW10gKTtcbn07XG5jb25zdCB1c2VTdGFydERhdGVDaGFuZ2VWYWxpZGF0b3IgPSAoIHtcblx0ZW50aXR5LFxuXHRkYXRlUHJvcHMsXG59ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eSggZW50aXR5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdJbnZhbGlkIEVudGl0eSBzdXBwbGllZCB0byB1c2VTdGFydERhdGVDaGFuZ2VWYWxpZGF0b3InXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggbmV3RGF0ZVZhbHVlICkgPT4ge1xuXHRcdGlmICggbmV3RGF0ZVZhbHVlICkge1xuXHRcdFx0Y29uc3Qgc3RhcnREYXRlID0gZ2V0U2VydmVyRGF0ZVRpbWUoIG5ld0RhdGVWYWx1ZSApO1xuXHRcdFx0aWYgKCBzdGFydERhdGUgPiBlbnRpdHlbIGRhdGVQcm9wcy5lbmQgXSApIHtcblx0XHRcdFx0cmV0dXJuIF9fKFxuXHRcdFx0XHRcdCdFbmQgRGF0ZSAmIFRpbWUgbXVzdCBiZSBzZXQgbGF0ZXIgdGhhbiB0aGUgU3RhcnQgRGF0ZSAmIFRpbWUnLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIFtdICk7XG59O1xuXG5jb25zdCB1c2VFbnRpdHlEYXRlQ2hhbmdlVmFsaWRhdG9ycyA9ICggcHJvcHMgKSA9PiB7XG5cdHJldHVybiB7XG5cdFx0c3RhcnREYXRlQ2hhbmdlVmFsaWRhdG9yOiB1c2VTdGFydERhdGVDaGFuZ2VWYWxpZGF0b3IoIHByb3BzICksXG5cdFx0ZW5kRGF0ZUNoYW5nZVZhbGlkYXRvcjogdXNlRW5kRGF0ZUNoYW5nZVZhbGlkYXRvciggcHJvcHMgKSxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUVudGl0eURhdGVDaGFuZ2VWYWxpZGF0b3JzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRldmVudDogW10sXG5cdGV2ZW50TG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCBldmVudCBlbnRpdHlcbiAqIGZvciB0aGUgZ2l2ZW4gZGF0ZSBlbnRpdHkgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZXZlbnREYXRlICBhbiBldmVudCBkYXRlIGVudGl0eVxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBmb3IgdGhlIHN1cHBsaWVkIGV2ZW50IGRhdGVcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlRXZlbnQgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSApIHtcblx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhIHZhbGlkIGRhdGV0aW1lIGVudGl0eS4nXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRsZXQgZXZlbnQgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50RGF0ZSwgJ2V2ZW50JyApO1xuXHRcdGNvbnN0IGV2ZW50TG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRbIGV2ZW50RGF0ZSwgJ2V2ZW50JyBdXG5cdFx0KTtcblx0XHRpZiAoIGV2ZW50TG9hZGVkICkge1xuXHRcdFx0ZXZlbnQgPSBBcnJheS5pc0FycmF5KCBldmVudCApICYmIGV2ZW50WyAwIF0gJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudFsgMCBdLCAnZXZlbnQnICkgP1xuXHRcdFx0XHRldmVudFsgMCBdIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV2ZW50LFxuXHRcdFx0XHRldmVudExvYWRlZCxcblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiBERUZBVUxUO1xuXHR9LCBbIGV2ZW50RGF0ZSBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudERhdGVFdmVudDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0dGlja2V0czogW10sXG5cdHRpY2tldHNMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllcyBmb3IgdGhlIGdpdmVuXG4gKiBkYXRlIGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgIEEgZGF0ZXRpbWUgQmFzZUVudGl0eSBpbnN0YW5jZS5cbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiB0aWNrZXRzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RGF0ZVRpY2tldHMgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSApIHtcblx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhIHZhbGlkIGRhdGV0aW1lIGVudGl0eS4nXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCB0aWNrZXRzID0gZ2V0UmVsYXRlZEVudGl0aWVzKCBldmVudERhdGUsICd0aWNrZXQnICk7XG5cdFx0Y29uc3QgdGlja2V0c0xvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRbIGV2ZW50RGF0ZSwgJ3RpY2tldCcgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpY2tldHMsXG5cdFx0XHR0aWNrZXRzTG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnREYXRlIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZVRpY2tldHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB1c2VFdmVudERhdGVUaWNrZXRzIGZyb20gJy4vdXNlLWV2ZW50LWRhdGUtdGlja2V0cyc7XG5pbXBvcnQgdXNlVHJpZ2dlclRpY2tldFVpVXBkYXRlIGZyb20gJy4vdXNlLXRyaWdnZXItdGlja2V0LXVpLXVwZGF0ZSc7XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayB0byB1cGRhdGUgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzIGZvciB0aGUgZ2l2ZW5cbiAqIGRhdGV0aW1lIGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgIEEgZGF0ZXRpbWUgQmFzZUVudGl0eSBpbnN0YW5jZS5cbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlVXBkYXRlUmVsYXRlZFRpY2tldHMgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0Y29uc3QgeyB0aWNrZXRzOiByZWxhdGVkVGlja2V0cywgdGlja2V0c0xvYWRlZCB9ID0gdXNlRXZlbnREYXRlVGlja2V0cyggZXZlbnREYXRlICk7XG5cdGNvbnN0IHRyaWdnZXJVaVVwZGF0ZSA9IHVzZVRyaWdnZXJUaWNrZXRVaVVwZGF0ZSgpO1xuXG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBtdXRhdGlvbnMgPSBbXSApID0+IHtcblx0XHRpZiAoIHRpY2tldHNMb2FkZWQgKSB7XG5cdFx0XHRyZWxhdGVkVGlja2V0cy5mb3JFYWNoKCAoIHRpY2tldCApID0+IHtcblx0XHRcdFx0Zm9yICggY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zICkge1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIG11dGF0aW9uID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHRcdFx0bXV0YXRpb24oIHRpY2tldCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdFx0dHJpZ2dlclVpVXBkYXRlKCk7XG5cdFx0fVxuXHR9LCBbIGV2ZW50RGF0ZSBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudERhdGVVcGRhdGVSZWxhdGVkVGlja2V0cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7IGRhdGVFbnRpdGllczogW10sIGRhdGVFbnRpdGllc0xvYWRlZDogZmFsc2UgfTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiBldmVudCBkYXRlIGVudGl0aWVzIGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlc0ZvckV2ZW50ID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50LCAnZGF0ZXRpbWUnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnQsICdkYXRldGltZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGVFbnRpdGllczogZW50aXRpZXMsXG5cdFx0XHRkYXRlRW50aXRpZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGV2ZW50IF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZXNGb3JFdmVudDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRldmVudERhdGVzOiBbXSxcblx0ZXZlbnREYXRlc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyBhbGwgdGhlIGRhdGUgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZCAgIHRydWUgaWYgZXZlbnQgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXMgPSAoIGV2ZW50TG9hZGVkID0gdHJ1ZSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGV2ZW50TG9hZGVkICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0RW50aXRpZXNGb3JNb2RlbCB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IGV2ZW50RGF0ZXMgPSBnZXRFbnRpdGllc0Zvck1vZGVsKCAnZGF0ZXRpbWUnICk7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoIGV2ZW50RGF0ZXMgKSAmJiBldmVudERhdGVzLmxlbmd0aCA/XG5cdFx0XHR7XG5cdFx0XHRcdGV2ZW50RGF0ZXMsXG5cdFx0XHRcdGV2ZW50RGF0ZXNMb2FkZWQ6IHRydWUsXG5cdFx0XHR9IDpcblx0XHRcdERFRkFVTFQ7XG5cdH0sIFsgZXZlbnRMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgYW4gZXZlbnQgdmlhIHRoZSBzdXBwbGllZCBJRFxuICogaWYgbm8gSUQgaXMgc3VwcGxpZWQsIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBldmVudCBpbiB0aGUgc3RvcmVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAgIGV2ZW50IGVudGl0eSBJRFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBlbnRpdHkgZm9yIHRoZSBzdXBwbGllZCBJRFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50ID0gKCBldmVudElkID0gMCApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0bGV0IGVudGl0eTtcblx0XHRpZiAoIGV2ZW50SWQgPT09IDAgKSB7XG5cdFx0XHRjb25zdCB7IGdldEVudGl0aWVzRm9yTW9kZWwgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRcdGVudGl0eSA9IGdldEVudGl0aWVzRm9yTW9kZWwoICdldmVudCcgKTtcblx0XHRcdGVudGl0eSA9IGVudGl0eS5oYXNPd25Qcm9wZXJ0eSggJ2V2ZW50RW50aXR5JyApID9cblx0XHRcdFx0ZW50aXR5LmV2ZW50RW50aXR5IDpcblx0XHRcdFx0ZW50aXR5O1xuXHRcdFx0ZW50aXR5ID0gQXJyYXkuaXNBcnJheSggZW50aXR5ICkgJiYgZW50aXR5WyAwIF0gP1xuXHRcdFx0XHRlbnRpdHlbIDAgXSA6XG5cdFx0XHRcdGVudGl0eTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgeyBnZXRFbnRpdHlCeUlkIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRlbnRpdHkgPSBnZXRFbnRpdHlCeUlkKCAnZXZlbnQnLCBldmVudElkICk7XG5cdFx0fVxuXHRcdGNvbnN0IGxvYWRlZCA9IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBlbnRpdHksICdldmVudCcgKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZXZlbnRFbnRpdHk6IGVudGl0eSxcblx0XHRcdGV2ZW50RW50aXR5TG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudElkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RWRpdG9yRXZlbnQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBBIGhvb2sgZm9yIHJldHJpZXZpbmcgYWxsIHRoZSB0aWNrZXQgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHRpY2tldHNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnRFZGl0b3JUaWNrZXRzID0gKCkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRjb25zdCB7IGdldEVudGl0aWVzRm9yTW9kZWwgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB0aWNrZXRzID0gZ2V0RW50aXRpZXNGb3JNb2RlbCggJ3RpY2tldCcgKTtcblx0XHRyZXR1cm4geyB0aWNrZXRzIH07XG5cdH0sIFtdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEVkaXRvclRpY2tldHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuaW1wb3J0IHVzZUV2ZW50RWRpdG9yRXZlbnQgZnJvbSAnLi91c2UtZXZlbnQtZWRpdG9yLWV2ZW50JztcblxuLyoqXG4gKiBBIGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIGV2ZW50IGZvciB0aGUgc3VwcGxpZWQgZXZlbnQgZGF0ZVxuICogd2lsbCBkZWZhdWx0IHRvIHRoZSBjdXJyZW50bHkgbG9hZGVkIGV2ZW50IGZvciB0aGUgZWRpdG9yXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgICBldmVudCBkYXRlIGVudGl0eVxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBlbnRpdHkgZm9yIHRoZSBzdXBwbGllZCBJRFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEZvckV2ZW50RGF0ZSA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRjb25zdCBldmVudElkID0gaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApID9cblx0XHRldmVudERhdGUuZXZ0SWQgOlxuXHRcdDA7XG5cdHJldHVybiB1c2VFdmVudEVkaXRvckV2ZW50KCBldmVudElkICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEZvckV2ZW50RGF0ZTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0dmVudWVFbnRpdHk6IG51bGwsXG5cdHZlbnVlRW50aXR5TG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gaG9vayBmb3IgcmV0cmlldmluZyB0aGUgdmVudWUgcmVsYXRlZCB0byB0aGUgZ2l2ZW4gZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50ICBBbiBpbnN0YW5jZSBvZiBhbiBldmVudCBlbnRpdHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIHZlbnVlIGVudGl0eSBmb3IgdGhlIHByb3ZpZGVkIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50VmVudWUgPSAoIGV2ZW50LCBldmVudExvYWRlZCA9IHRydWUgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISAoXG5cdFx0XHRldmVudExvYWRlZCAmJlxuXHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50LCAnZXZlbnQnIClcblx0XHQpICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHtcblx0XHRcdGdldFJlbGF0ZWRFbnRpdGllcyxcblx0XHRcdGhhc0ZpbmlzaGVkUmVzb2x1dGlvbixcblx0XHR9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGxldCBlbnRpdHkgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50LCAndmVudWUnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRbIGV2ZW50LCAndmVudWUnIF1cblx0XHQpO1xuXHRcdGVudGl0eSA9IEFycmF5LmlzQXJyYXkoIGVudGl0eSApICYmIGVudGl0eVsgMCBdICYmXG5cdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGVudGl0eVsgMCBdLCAndmVudWUnICkgP1xuXHRcdFx0ZW50aXR5WyAwIF0gOlxuXHRcdFx0bnVsbDtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmVudWVFbnRpdHk6IGVudGl0eSxcblx0XHRcdHZlbnVlRW50aXR5TG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudCwgZXZlbnRMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRWZW51ZTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogQSBob29rIHRvIGdldCB0aGUgcHJldmlvdXMgcHJvcHMgb3Igc3RhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxzdHJpbmd8bnVtYmVyfSB2YWx1ZSBUaGUgY3VycmVudCB2YWx1ZS5cbiAqIEByZXR1cm4ge09iamVjdHxzdHJpbmd8bnVtYmVyfSAtIHRoZSBwcmV2aW91cyB2YWx1ZVxuICovXG5jb25zdCB1c2VQcmV2aW91cyA9ICggdmFsdWUgKSA9PiB7XG5cdGNvbnN0IHJlZiA9IHVzZVJlZigpO1xuXHR1c2VFZmZlY3QoICgpID0+IHtcblx0XHRyZWYuY3VycmVudCA9IHZhbHVlO1xuXHR9ICk7XG5cdHJldHVybiByZWYuY3VycmVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVByZXZpb3VzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIGFsbCB0aGUgcHJpY2VfdHlwZSBlbnRpdGllc1xuICogY3VycmVudGx5IGluIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgZGF0YSBzdG9yZS5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgcHJpY2UgdHlwZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlUHJpY2VUeXBlcyA9ICgpID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9saXN0cycgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IGVudGl0aWVzID0gZ2V0RW50aXRpZXMoICdwcmljZV90eXBlJyApO1xuXHRcdGNvbnN0IGxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdldmVudGVzcHJlc3NvL2xpc3RzJyxcblx0XHRcdCdnZXRFbnRpdGllcycsXG5cdFx0XHRbICdwcmljZV90eXBlJyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cHJpY2VUeXBlczogZW50aXRpZXMsXG5cdFx0XHRwcmljZVR5cGVzTG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgW10gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVByaWNlVHlwZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHJlbW92aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhbiBldmVudCBkYXRlIGVudGl0eSBhbmQgb25lIG9yIG1vcmUgdGlja2V0IGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudERhdGVJZCBJRCBmb3IgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqICAtICB0aWNrZXRJZHMgYXJyYXkgb2YgdGlja2V0IGVudGl0eSBJRHNcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgcmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggZXZlbnREYXRlSWQsIHRpY2tldElkcyApID0+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSApID0+IHtcblx0XHRcdHRpY2tldElkcy5mb3JFYWNoKCBhc3luYyAoIHRpY2tldElkICkgPT4ge1xuXHRcdFx0XHRhd2FpdCByZW1vdmVSZWxhdGlvbkZvckVudGl0eShcblx0XHRcdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0XHRcdGV2ZW50RGF0ZUlkLFxuXHRcdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHRcdHRpY2tldElkLFxuXHRcdFx0XHQpO1xuXHRcdFx0fSApO1xuXHRcdFx0cmVzb2x2ZSggdHJ1ZSApO1xuXHRcdH0gKTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlUmVtb3ZlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3V0aWxzJztcbmltcG9ydCB7IFNlcnZlckRhdGVUaW1lLCBEdXJhdGlvbiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgc3RhcnQgZGF0ZXMgb2NjdXIgYmVmb3JlIGVuZCBkYXRlcyBmb3IgZW50aXR5IGRhdGUgcGFpcnMuXG4gKiBJZiBub3QsIHVwZGF0ZXMgdGhlIGVuZCBkYXRlIGFjY29yZGluZ2x5IHVzaW5nIHRoZSBzYW1lIG9mZnNldFxuICogY3VycmVudGx5IGV4aXN0aW5nIGJldHdlZW4gdGhlIHByZXZpb3VzIHN0YXJ0IGFuZCBlbmQgZGF0ZXNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICogQG1lbWJlciB7T2JqZWN0fSBlbnRpdHlcbiAqIEBtZW1iZXIge09iamVjdH0gZGF0ZVByb3BzXG4gKiBAbWVtYmVyIHtzdHJpbmd9IHN0YXJ0RGF0ZUZvcm1LZXkgaWRlbnRpZmllciBmb3IgUmVhY3QgRmluYWwgRm9ybSBkYXRhIHNjaGVtYVxuICogQG1lbWJlciB7c3RyaW5nfSBlbmREYXRlRm9ybUtleSBpZGVudGlmaWVyIGZvciBSZWFjdCBGaW5hbCBGb3JtIGRhdGEgc2NoZW1hXG4gKiBAbWVtYmVyIHtGdW5jdGlvbn0gdXBkYXRlRmllbGQgY2FsbGJhY2sgZm9yIGVkaXRpbmcgYSBmaWVsZFxuICogQG1lbWJlciB7RnVuY3Rpb259IHRvdWNoRmllbGQgY2FsbGJhY2sgZm9yIG1hcmtpbmcgZmllbGQgYXMgY2hhbmdlZFxuICogQHJldHVybiB7T2JqZWN0fSBlbnRpdHlTdGFydERhdGUgJiBlbnRpdHlFbmREYXRlXG4gKi9cbmNvbnN0IHVzZVN0YXJ0RGF0ZUNoYW5nZUxpc3RlbmVyID0gKCB7XG5cdGVudGl0eSxcblx0ZGF0ZVByb3BzLFxuXHRzdGFydERhdGVGb3JtS2V5LFxuXHRlbmREYXRlRm9ybUtleSxcblx0dXBkYXRlRmllbGQsXG5cdHRvdWNoRmllbGQsXG59ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eSggZW50aXR5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdJbnZhbGlkIEVudGl0eSBzdXBwbGllZCB0byB1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lcidcblx0XHQpO1xuXHR9XG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBuZXdEYXRlVmFsdWUsIHByZXZEYXRlVmFsdWUgKSA9PiB7XG5cdFx0aWYgKCBuZXdEYXRlVmFsdWUgJiYgbmV3RGF0ZVZhbHVlICE9PSBwcmV2RGF0ZVZhbHVlICkge1xuXHRcdFx0Y29uc3QgbmV3RGF0ZSA9IGdldFNlcnZlckRhdGVUaW1lKCBuZXdEYXRlVmFsdWUgKTtcblx0XHRcdGlmICggbmV3RGF0ZSBpbnN0YW5jZW9mIFNlcnZlckRhdGVUaW1lICkge1xuXHRcdFx0XHQvLyBkb2VzIHRoZSBuZXcgc3RhcnQgZGF0ZSBvY2N1ciBBRlRFUiB0aGUgZXhpc3RpbmcgZW5kIGRhdGU/XG5cdFx0XHRcdGlmICggbmV3RGF0ZSA+IGVudGl0eVsgZGF0ZVByb3BzLmVuZCBdICkge1xuXHRcdFx0XHRcdGNvbnN0IG9yaWdpbmFsRHVyYXRpb24gPSBlbnRpdHlbIGRhdGVQcm9wcy5lbmQgXS5kaWZmKFxuXHRcdFx0XHRcdFx0ZW50aXR5WyBkYXRlUHJvcHMuc3RhcnQgXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKCBEdXJhdGlvbi5pc1ZhbGlkRHVyYXRpb24oIG9yaWdpbmFsRHVyYXRpb24gKSApIHtcblx0XHRcdFx0XHRcdC8vIGFkZCBvcmlnaW5hbCBkYXRlIGRpZmZlcmVuY2UgdG8gbmV3IHN0YXJ0IGRhdGUuXG5cdFx0XHRcdFx0XHRjb25zdCBuZXdFbmREYXRlID0gbmV3RGF0ZS5wbHVzKCBvcmlnaW5hbER1cmF0aW9uICk7XG5cdFx0XHRcdFx0XHRlbnRpdHlbIGRhdGVQcm9wcy5lbmQgXSA9IG5ld0VuZERhdGU7XG5cdFx0XHRcdFx0XHR1cGRhdGVGaWVsZChcblx0XHRcdFx0XHRcdFx0ZW5kRGF0ZUZvcm1LZXksXG5cdFx0XHRcdFx0XHRcdG5ld0VuZERhdGUudG9JU08oIGZhbHNlIClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFuZCBmaW5hbGx5IHVwZGF0ZSB0aGUgc3RhcnQgZGF0ZVxuXHRcdFx0XHRlbnRpdHlbIGRhdGVQcm9wcy5zdGFydCBdID0gbmV3RGF0ZTtcblx0XHRcdH1cblx0XHRcdC8vIGxldCBSRkYga25vdyB0aGVzZSBmaWVsZHMgaGF2ZSBwb3RlbnRpYWxseSBjaGFuZ2VkXG5cdFx0XHR0b3VjaEZpZWxkKCBzdGFydERhdGVGb3JtS2V5ICk7XG5cdFx0XHR0b3VjaEZpZWxkKCBlbmREYXRlRm9ybUtleSApO1xuXHRcdH1cblx0fSwgW1xuXHRcdGVudGl0eVsgZGF0ZVByb3BzLnN0YXJ0IF0sXG5cdFx0ZW50aXR5WyBkYXRlUHJvcHMuZW5kIF0sXG5cdFx0c3RhcnREYXRlRm9ybUtleSxcblx0XHRlbmREYXRlRm9ybUtleSxcblx0XHR1cGRhdGVGaWVsZCxcblx0XHR0b3VjaEZpZWxkLFxuXHRdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VTdGFydERhdGVDaGFuZ2VMaXN0ZW5lcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0ZXZlbnREYXRlczogW10sXG5cdGV2ZW50RGF0ZXNMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIGV2ZW50IGRhdGUgZW50aXRpZXNcbiAqIGZvciB0aGUgZ2l2ZW4gdGlja2V0IGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSB0aWNrZXRFbnRpdHkgIEEgZGF0ZXRpbWUgQmFzZUVudGl0eSBpbnN0YW5jZS5cbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VUaWNrZXRFdmVudERhdGVzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgdGlja2V0IGVudGl0eS4nXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCBldmVudERhdGVzID0gZ2V0UmVsYXRlZEVudGl0aWVzKCB0aWNrZXRFbnRpdHksICdkYXRldGltZScgKTtcblx0XHRjb25zdCBldmVudERhdGVzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgdGlja2V0RW50aXR5LCAnZGF0ZXRpbWUnIF1cblx0XHQpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRldmVudERhdGVzLFxuXHRcdFx0ZXZlbnREYXRlc0xvYWRlZCxcblx0XHR9O1xuXHR9LCBbIHRpY2tldEVudGl0eSBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUaWNrZXRFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHByaWNlczogW10sXG5cdHByaWNlc0xvYWRlZDogZmFsc2UsXG5cdG5vQmFzZVByaWNlOiBudWxsLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHByaWNlcyBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiB0aWNrZXQgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9ICB0aWNrZXRFbnRpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gICAgIC0gYW4gYXJyYXkgb2YgcHJpY2VzIGJlbG9uZ2luZyB0byB0aGUgZ2l2ZW4gdGlja2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICogICAgICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgYWJzZW5jZSBvZiBiYXNlIHByaWNlXG4gKi9cbmNvbnN0IHVzZVRpY2tldFByaWNlcyA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KFxuXHRcdCggc2VsZWN0ICkgPT4ge1xuXHRcdFx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdFx0XHRjb25zdCBwcmljZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoXG5cdFx0XHRcdFx0dGlja2V0RW50aXR5LFxuXHRcdFx0XHRcdCdwcmljZSdcblx0XHRcdFx0KTtcblx0XHRcdFx0Y29uc3QgcHJpY2VzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0XHRcdFsgdGlja2V0RW50aXR5LCAncHJpY2UnIF1cblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRwcmljZXMsXG5cdFx0XHRcdFx0cHJpY2VzTG9hZGVkLFxuXHRcdFx0XHRcdG5vQmFzZVByaWNlOiBwcmljZXNMb2FkZWQgJiYgaXNFbXB0eSggcHJpY2VzICksXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9LFxuXHRcdFsgdGlja2V0RW50aXR5IF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRpY2tldFByaWNlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0dGlja2V0RW50aXRpZXM6IFtdLFxuXHR0aWNrZXRFbnRpdGllc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzXG4gKiBmb3IgdGhlIGdpdmVuIGV2ZW50IGRhdGUgZW50aXRpZXMgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eVtdfSBkYXRlRW50aXRpZXMgIGFycmF5IG9mIGV2ZW50IGRhdGUgZW50aXRpZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGRhdGVFbnRpdGllc0xvYWRlZCAgdHJ1ZSBpZiBhbGwgZXZlbnQgZGF0ZXMgYXJlIGxvYWRlZFxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIGV2ZW50IGRhdGVzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZVRpY2tldHNGb3JFdmVudERhdGVzID0gKFxuXHRkYXRlRW50aXRpZXMgPSBbXSxcblx0ZGF0ZUVudGl0aWVzTG9hZGVkID0gdHJ1ZVxuKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmIChcblx0XHRcdCEgZGF0ZUVudGl0aWVzTG9hZGVkIHx8XG5cdFx0XHQhIEFycmF5LmlzQXJyYXkoIGRhdGVFbnRpdGllcyApIHx8XG5cdFx0XHRpc0VtcHR5KCBkYXRlRW50aXRpZXMgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IGRhdGVFbnRpdHlJZHMgPSBkYXRlRW50aXRpZXMubWFwKFxuXHRcdFx0KCBkYXRlRW50aXR5ICkgPT4gaXNNb2RlbEVudGl0eU9mTW9kZWwoIGRhdGVFbnRpdHksICdkYXRldGltZScgKSA/XG5cdFx0XHRcdGRhdGVFbnRpdHkuaWQgOlxuXHRcdFx0XHRudWxsXG5cdFx0KTtcblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllc0ZvcklkcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMoXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZGF0ZUVudGl0eUlkcyxcblx0XHRcdCd0aWNrZXQnXG5cdFx0KTtcblx0XHRjb25zdCBsb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMnLFxuXHRcdFx0WyAnZGF0ZXRpbWUnLCBkYXRlRW50aXR5SWRzLCAndGlja2V0JyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGlja2V0RW50aXRpZXM6IGVudGl0aWVzLFxuXHRcdFx0dGlja2V0RW50aXRpZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGRhdGVFbnRpdGllcywgZGF0ZUVudGl0aWVzTG9hZGVkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRpY2tldHNGb3JFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgeyBjb25maXJtIH0gPSB3aW5kb3c7XG5cbmNvbnN0IHVzZVRyYXNoRGF0ZUVudGl0eSA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRjb25zdCB7IHRyYXNoRW50aXR5QnlJZCB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBjbGljayApID0+IHtcblx0XHRjYW5jZWxDbGlja0V2ZW50KCBjbGljayApO1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICggISBjb25maXJtKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXZlbnQgZGF0ZT8nLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHQpXG5cdFx0KSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dHJhc2hFbnRpdHlCeUlkKCAnZGF0ZXRpbWUnLCBldmVudERhdGUuaWQgKTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVHJhc2hEYXRlRW50aXR5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIHVzZVRyYXNoUHJpY2VNb2RpZmllclxuICogcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHR3byBmdW5jdGlvbnM6XG4gKiAgLSBhZGRQcmljZU1vZGlmaWVyXG4gKiAgLSB0cmFzaFByaWNlTW9kaWZpZXJcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGZ1bmN0aW9uc1xuICovXG5jb25zdCB1c2VUcmFzaFByaWNlTW9kaWZpZXIgPSAoKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRyZW1vdmVSZWxhdGlvbkZvckVudGl0eSxcblx0XHR0cmFzaEVudGl0eUJ5SWQsXG5cdH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKFxuXHRcdGFzeW5jICggcHJpY2VNb2RpZmllciwgdGlja2V0RW50aXR5ICkgPT4ge1xuXHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBwcmljZU1vZGlmaWVyLCAncHJpY2UnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gcGVyZm9ybSBkZWxldGlvbiBiZWNhdXNlIGFuIGludmFsaWQgUHJpY2UnICtcblx0XHRcdFx0XHRcdCcgRW50aXR5IHdhcyBzdXBwbGllZCBieSB0aGUgVGlja2V0IFByaWNlIENhbGN1bGF0b3IuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZW1vdmVSZWxhdGlvbkZvckVudGl0eShcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldEVudGl0eS5pZCxcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0cHJpY2VNb2RpZmllci5pZFxuXHRcdFx0KTtcblx0XHRcdHRyYXNoRW50aXR5QnlJZCggJ3ByaWNlJywgcHJpY2VNb2RpZmllci5pZCApO1xuXHRcdH0sXG5cdFx0W11cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyYXNoUHJpY2VNb2RpZmllcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgeyBjb25maXJtIH0gPSB3aW5kb3c7XG5cbmNvbnN0IHVzZVRyYXNoVGlja2V0ID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdGNvbnN0IHsgdHJhc2hFbnRpdHlCeUlkIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXRFbnRpdHksICd0aWNrZXQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gcGVyZm9ybSBkZWxldGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQgYnkgdGhlIFRpY2tldCBQcmljZSBDYWxjdWxhdG9yLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIGNvbmZpcm0oXG5cdFx0XHRfXyhcblx0XHRcdFx0J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyB0aWNrZXQ/Jyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0KVxuXHRcdCkgKSB7XG5cdFx0XHR0cmFzaEVudGl0eUJ5SWQoICd0aWNrZXQnLCB0aWNrZXRFbnRpdHkuaWQgKTtcblx0XHR9XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyYXNoVGlja2V0O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyBzZWxlY3QsIGRpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBUbyBzaG93IHRoZSBjaGFuZ2VzIGluIHRpY2tldCBkZXRhaWxzXG4gKiB0cmlnZ2VyIHRoZSB0aWNrZXQgVUkgdXBkYXRlIHdpaG91dCBhbnkgc2lkZSBlZmZlY3QuXG4gKi9cbmNvbnN0IHVzZVRyaWdnZXJUaWNrZXRVaVVwZGF0ZSA9ICgpID0+IHtcblx0Y29uc3QgbGlzdElkID0gJ2V2ZW50LWVkaXRvci10aWNrZXQtbGlzdCc7XG5cdGNvbnN0IGRlZmF1bHREaXNwbGF5RGF0ZSA9ICdzdGFydCc7XG5cdGNvbnN0IHN0b3JlS2V5ID0gJ2V2ZW50ZXNwcmVzc28vZmlsdGVyLXN0YXRlJztcblx0Y29uc3QgeyBnZXRGaWx0ZXIgfSA9IHNlbGVjdCggc3RvcmVLZXkgKTtcblx0Y29uc3QgeyBzZXRGaWx0ZXIgfSA9IGRpc3BhdGNoKCBzdG9yZUtleSApO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3QgZGlzcGxheURhdGUgPSBnZXRGaWx0ZXIoXG5cdFx0XHRsaXN0SWQsXG5cdFx0XHQnZGlzcGxheVRpY2tldERhdGUnLFxuXHRcdFx0ZGVmYXVsdERpc3BsYXlEYXRlXG5cdFx0KTtcblx0XHRjb25zdCBpbnRlcm1lZGlhdGVWYWx1ZSA9IGRpc3BsYXlEYXRlID09PSAnc3RhcnQnID8gJ2VuZCcgOiAnc3RhcnQnO1xuXHRcdC8vIFNldCB0aGUgZGlzcGxheSBkYXRlIHRvIHRoZSBpbnRlcm1lZGlhdGUgdmFsdWUuXG5cdFx0c2V0RmlsdGVyKFxuXHRcdFx0bGlzdElkLFxuXHRcdFx0J2Rpc3BsYXlUaWNrZXREYXRlJyxcblx0XHRcdGludGVybWVkaWF0ZVZhbHVlXG5cdFx0KTtcblx0XHQvLyBSZXN0b3JlIHRoZSBhY3R1YWwgdmFsdWUuXG5cdFx0c2V0RmlsdGVyKFxuXHRcdFx0bGlzdElkLFxuXHRcdFx0J2Rpc3BsYXlUaWNrZXREYXRlJyxcblx0XHRcdGRpc3BsYXlEYXRlXG5cdFx0KTtcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyaWdnZXJUaWNrZXRVaVVwZGF0ZTtcbiIsImltcG9ydCB7IHVzZUxheW91dEVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuY29uc3QgeyBhZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyIH0gPSB3aW5kb3c7XG5cbmNvbnN0IHVzZVJlY3QgPSAoIHJlZiApID0+IHtcblx0Y29uc3QgWyByZWN0LCBzZXRSZWN0IF0gPSB1c2VTdGF0ZSggZ2V0UmVjdCggcmVmID8gcmVmLmN1cnJlbnQgOiBudWxsICkgKTtcblxuXHRjb25zdCBoYW5kbGVSZXNpemUgPSB1c2VDYWxsYmFjayggKCkgPT4ge1xuXHRcdGlmICggISByZWYuY3VycmVudCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBVcGRhdGUgY2xpZW50IHJlY3Rcblx0XHRzZXRSZWN0KCBnZXRSZWN0KCByZWYuY3VycmVudCApICk7XG5cdH0sIFsgcmVmIF0gKTtcblxuXHR1c2VMYXlvdXRFZmZlY3QoICgpID0+IHtcblx0XHRjb25zdCBlbGVtZW50ID0gcmVmLmN1cnJlbnQ7XG5cdFx0aWYgKCAhIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aGFuZGxlUmVzaXplKCk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cdFx0aWYgKCBSZXNpemVPYnNlcnZlciAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcblx0XHRcdGxldCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlciggKCkgPT4gaGFuZGxlUmVzaXplKCkgKTtcblx0XHRcdHJlc2l6ZU9ic2VydmVyLm9ic2VydmUoIGVsZW1lbnQgKTtcblxuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0aWYgKCAhIHJlc2l6ZU9ic2VydmVyICkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fVxuXHRcdC8vIEJyb3dzZXIgc3VwcG9ydCwgcmVtb3ZlIGZyZWVseVxuXHRcdGFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCBoYW5kbGVSZXNpemUgKTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRyZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgaGFuZGxlUmVzaXplICk7XG5cdFx0fTtcblx0fSwgWyByZWYuY3VycmVudCBdICk7XG5cblx0cmV0dXJuIHJlY3Q7XG59O1xuXG5mdW5jdGlvbiBnZXRSZWN0KCBlbGVtZW50ICkge1xuXHRpZiAoICEgZWxlbWVudCApIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Ym90dG9tOiAwLFxuXHRcdFx0aGVpZ2h0OiAwLFxuXHRcdFx0bGVmdDogMCxcblx0XHRcdHJpZ2h0OiAwLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0d2lkdGg6IDAsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VSZWN0O1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcInJlZ2VuZXJhdG9yUnVudGltZVwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInV0aWxzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
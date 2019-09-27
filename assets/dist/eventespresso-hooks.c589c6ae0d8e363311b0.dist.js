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
/*! exports provided: useAddPriceModifier, useBasePriceType, useCloneEntities, useCopyDateEntity, useCopyTicket, useCreateDateEntity, useCreateRelationForEventToEventDate, useCreateRelationsForEventDateToTickets, useCreateRelationsForEventDateIdToTicketIds, useCreateRelationsForTicketToEventDates, useCreateRelationsForTicketToPrices, useCreateTicketEntity, useEventDateEvent, useEventDateTickets, useEventDatesForEvent, useEventEditorEvent, useEventEditorEventDates, useEventEditorTickets, useEventForEventDate, useEventVenue, usePriceTypes, useRemoveRelationsForEventDateIdToTicketIds, useTicketEventDates, useTicketPrices, useTicketsForEventDates, useTrashDateEntity, useTrashPriceModifier, useTrashTicket, usePrevious */
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

/* harmony import */ var _use_event_date_event__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./use-event-date-event */ "./assets/src/hooks/use-event-date-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDateEvent", function() { return _use_event_date_event__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _use_event_date_tickets__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./use-event-date-tickets */ "./assets/src/hooks/use-event-date-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDateTickets", function() { return _use_event_date_tickets__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _use_event_dates_for_event__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./use-event-dates-for-event */ "./assets/src/hooks/use-event-dates-for-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventDatesForEvent", function() { return _use_event_dates_for_event__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _use_event_editor_event__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./use-event-editor-event */ "./assets/src/hooks/use-event-editor-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorEvent", function() { return _use_event_editor_event__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _use_event_editor_event_dates__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./use-event-editor-event-dates */ "./assets/src/hooks/use-event-editor-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorEventDates", function() { return _use_event_editor_event_dates__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _use_event_editor_tickets__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./use-event-editor-tickets */ "./assets/src/hooks/use-event-editor-tickets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventEditorTickets", function() { return _use_event_editor_tickets__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _use_event_for_event_date__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./use-event-for-event-date */ "./assets/src/hooks/use-event-for-event-date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventForEventDate", function() { return _use_event_for_event_date__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _use_event_venue__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./use-event-venue */ "./assets/src/hooks/use-event-venue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventVenue", function() { return _use_event_venue__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _use_price_types__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./use-price-types */ "./assets/src/hooks/use-price-types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePriceTypes", function() { return _use_price_types__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _use_remove_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./use-remove-relations-for-event-date-id-to-ticket-ids */ "./assets/src/hooks/use-remove-relations-for-event-date-id-to-ticket-ids.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRemoveRelationsForEventDateIdToTicketIds", function() { return _use_remove_relations_for_event_date_id_to_ticket_ids__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _use_ticket_event_dates__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./use-ticket-event-dates */ "./assets/src/hooks/use-ticket-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketEventDates", function() { return _use_ticket_event_dates__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _use_ticket_prices__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./use-ticket-prices */ "./assets/src/hooks/use-ticket-prices.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketPrices", function() { return _use_ticket_prices__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _use_tickets_for_event_dates__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./use-tickets-for-event-dates */ "./assets/src/hooks/use-tickets-for-event-dates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTicketsForEventDates", function() { return _use_tickets_for_event_dates__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _use_trash_date_entity__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./use-trash-date-entity */ "./assets/src/hooks/use-trash-date-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashDateEntity", function() { return _use_trash_date_entity__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _use_trash_price_modifier__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./use-trash-price-modifier */ "./assets/src/hooks/use-trash-price-modifier.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashPriceModifier", function() { return _use_trash_price_modifier__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _use_trash_ticket__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./use-trash-ticket */ "./assets/src/hooks/use-trash-ticket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTrashTicket", function() { return _use_trash_ticket__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _use_previous__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./use-previous */ "./assets/src/hooks/use-previous.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePrevious", function() { return _use_previous__WEBPACK_IMPORTED_MODULE_28__["default"]; });































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
      return priceType.pbtId === 1;
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
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_4__["isModelEntityOfModel"])(ticketEntity, 'ticket')) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", falseFunc);

          case 2:
            return _context2.abrupt("return",
            /*#__PURE__*/
            _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
            /*#__PURE__*/
            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
              var newTicket;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return createEntity('ticket', ticketEntity.forClone);

                    case 2:
                      newTicket = _context.sent;
                      updateTicketDateRelations(newTicket, dateEntities);

                      if (!(Array.isArray(newPrices) && newPrices.length)) {
                        _context.next = 7;
                        break;
                      }

                      _context.next = 7;
                      return updateTicketPriceRelations(newTicket, newPrices);

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
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
              TKT_min: null,
              TKT_max: -1,
              TKT_price: null,
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

    var entities = getRelatedEntities(event, 'datetime', 'event');
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
          getEvents = _select.getEvents;

      entity = getEvents(eventId);
      entity = Array.isArray(entity) && entity[0] ? entity[0] : null;
    } else {
      var _select2 = select('eventespresso/core'),
          getEventById = _select2.getEventById;

      entity = getEventById(eventId);
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

/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  var ref = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    ref.current = value;
  });
  return ref.current;
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhvb2tzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1hZGQtcHJpY2UtbW9kaWZpZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWJhc2UtcHJpY2UtdHlwZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY2xvbmUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtdGlja2V0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWVkaXRvci1ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZWRpdG9yLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWZvci1ldmVudC1kYXRlLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC12ZW51ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtcHJldmlvdXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXByaWNlLXR5cGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1yZW1vdmUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRpY2tldC1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdGlja2V0LXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdGlja2V0cy1mb3ItZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRyYXNoLWRhdGUtZW50aXR5LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10cmFzaC1wcmljZS1tb2RpZmllci5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdHJhc2gtdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidXRpbHNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbHVlT2JqZWN0c1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJlbGVtZW50XCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpcImxvZGFzaFwifSJdLCJuYW1lcyI6WyJ1c2VBZGRQcmljZU1vZGlmaWVyIiwidXNlRGlzcGF0Y2giLCJjcmVhdGVFbnRpdHkiLCJjcmVhdGVSZWxhdGlvbiIsInVzZUNhbGxiYWNrIiwidGlja2V0RW50aXR5IiwicHJvcGVydGllcyIsInByaWNlTW9kaWZpZXIiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsImlkIiwidXNlQmFzZVByaWNlVHlwZSIsInVzZVByaWNlVHlwZXMiLCJwcmljZVR5cGVzIiwicHJpY2VUeXBlc0xvYWRlZCIsInVzZU1lbW8iLCJmaW5kIiwicHJpY2VUeXBlIiwicGJ0SWQiLCJ1c2VDbG9uZUVudGl0aWVzIiwiZW50aXRpZXNUb0Nsb25lIiwibW9kZWxOYW1lIiwibmV3RW50aXRpZXMiLCJpIiwibGVuZ3RoIiwiZm9yQ2xvbmUiLCJuZXdDbG9uZSIsInB1c2giLCJ1c2VDb3B5RGF0ZUVudGl0eSIsImV2ZW50RGF0ZSIsImNyZWF0ZVJlbGF0aW9ucyIsInVzZUV2ZW50RWRpdG9yRXZlbnQiLCJldnRJZCIsImV2ZW50RW50aXR5IiwidXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMiLCJ0aWNrZXRFbnRpdGllcyIsImNsaWNrIiwiY2FuY2VsQ2xpY2tFdmVudCIsIm5ld0V2ZW50RGF0ZSIsIm5hbWUiLCJzcHJpbnRmIiwiX3giLCJpc0VtcHR5IiwiZmFsc2VGdW5jIiwidXNlQ29weVRpY2tldCIsImRhdGVFbnRpdGllcyIsInJlbGF0ZWRQcmljZXMiLCJ1c2VTZWxlY3QiLCJzZWxlY3QiLCJnZXRSZWxhdGVkRW50aXRpZXMiLCJuZXdQcmljZXMiLCJ1cGRhdGVUaWNrZXREYXRlUmVsYXRpb25zIiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzIiwidXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMiLCJ1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcyIsIm5ld1RpY2tldCIsIkFycmF5IiwiaXNBcnJheSIsInVzZUNyZWF0ZURhdGVFbnRpdHkiLCJldmVudCIsImNhY2hlTmV3RGF0ZSIsInVwZGF0ZUV2ZW50RGF0ZVJlbGF0aW9uIiwidXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlIiwibm93SnMiLCJEYXRlIiwic2V0SG91cnMiLCJnZXRIb3VycyIsIk1hdGgiLCJjZWlsIiwiZ2V0TWludXRlcyIsIm5vdyIsIlNlcnZlckRhdGVUaW1lIiwiZnJvbUpTRGF0ZSIsIkVWVF9JRCIsIkRUVF9uYW1lIiwiRFRUX2Rlc2NyaXB0aW9uIiwiRFRUX0VWVF9zdGFydCIsInBsdXMiLCJEdXJhdGlvbiIsImZyb21PYmplY3QiLCJkYXlzIiwiRFRUX0VWVF9lbmQiLCJob3VycyIsIkRUVF9yZWdfbGltaXQiLCJEVFRfc29sZCIsIkRUVF9yZXNlcnZlZCIsIkRUVF9vcmRlciIsIkRUVF9wYXJlbnQiLCJEVFRfZGVsZXRlZCIsIm5ld0RhdGUiLCJkYXRlRW50aXR5IiwiRXJyb3IiLCJfXyIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJnZXRFbnRpdGllc0J5SWRzIiwiZXZlbnREYXRlSWQiLCJ0aWNrZXRJZHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRpY2tldHMiLCJmb3JFYWNoIiwidGlja2V0IiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzIiwiZXZlbnREYXRlcyIsInByaWNlcyIsInByaWNlIiwidXNlcklEIiwid2luZG93IiwidXNlclNldHRpbmdzIiwidWlkIiwicGFyc2VJbnQiLCJ1c2VDcmVhdGVUaWNrZXRFbnRpdHkiLCJjYWNoZU5ld1RpY2tldCIsImJhc2VQcmljZVR5cGUiLCJUS1RfbmFtZSIsIlRLVF9kZXNjcmlwdGlvbiIsIlRLVF9xdHkiLCJUS1Rfc29sZCIsIlRLVF9yZXNlcnZlZCIsIlRLVF91c2VzIiwiVEtUX3JlcXVpcmVkIiwiVEtUX21pbiIsIlRLVF9tYXgiLCJUS1RfcHJpY2UiLCJUS1Rfc3RhcnREYXRlIiwiVEtUX2VuZERhdGUiLCJUS1RfdGF4YWJsZSIsIlRLVF9vcmRlciIsIlRLVF9pc0RlZmF1bHQiLCJUS1RfcmV2ZXJzZV9jYWxjdWxhdGUiLCJUS1Rfd3BfdXNlciIsIlRLVF9wYXJlbnQiLCJUS1RfZGVsZXRlZCIsIlBSVF9JRCIsIm5ld0Jhc2VQcmljZSIsIkRFRkFVTFQiLCJldmVudExvYWRlZCIsInVzZUV2ZW50RGF0ZUV2ZW50Iiwid2FybmluZyIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsInRpY2tldHNMb2FkZWQiLCJ1c2VFdmVudERhdGVUaWNrZXRzIiwiZGF0ZUVudGl0aWVzTG9hZGVkIiwidXNlRXZlbnREYXRlc0ZvckV2ZW50IiwiZW50aXRpZXMiLCJsb2FkZWQiLCJldmVudERhdGVzTG9hZGVkIiwidXNlRXZlbnRFZGl0b3JFdmVudERhdGVzIiwiZ2V0RW50aXRpZXNGb3JNb2RlbCIsImV2ZW50SWQiLCJlbnRpdHkiLCJnZXRFdmVudHMiLCJnZXRFdmVudEJ5SWQiLCJldmVudEVudGl0eUxvYWRlZCIsInVzZUV2ZW50RWRpdG9yVGlja2V0cyIsInVzZUV2ZW50Rm9yRXZlbnREYXRlIiwidmVudWVFbnRpdHkiLCJ2ZW51ZUVudGl0eUxvYWRlZCIsInVzZUV2ZW50VmVudWUiLCJ2YWx1ZSIsInJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJnZXRFbnRpdGllcyIsInVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJyZW1vdmVSZWxhdGlvbkZvckVudGl0eSIsInRpY2tldElkIiwidXNlVGlja2V0RXZlbnREYXRlcyIsInByaWNlc0xvYWRlZCIsIm5vQmFzZVByaWNlIiwidXNlVGlja2V0UHJpY2VzIiwidGlja2V0RW50aXRpZXNMb2FkZWQiLCJkYXRlRW50aXR5SWRzIiwibWFwIiwiZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzIiwiY29uZmlybSIsInVzZVRyYXNoRGF0ZUVudGl0eSIsInRyYXNoRW50aXR5QnlJZCIsInVzZVRyYXNoUHJpY2VNb2RpZmllciIsInVzZVRyYXNoVGlja2V0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFRQSxJQUFNQSxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLEdBQU07QUFBQSxxQkFJN0JDLG1FQUFXLENBQUUsb0JBQUYsQ0FKa0I7QUFBQSxNQUVoQ0MsWUFGZ0MsZ0JBRWhDQSxZQUZnQztBQUFBLE1BR2hDQyxjQUhnQyxnQkFHaENBLGNBSGdDOztBQUtqQyxTQUFPQyxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQ2pCLGlCQUFRQyxZQUFSLEVBQXNCQyxVQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUM2QkosWUFBWSxDQUN2QyxPQUR1QyxFQUV2Q0ksVUFGdUMsQ0FEekM7O0FBQUE7QUFDT0MsMkJBRFA7O0FBS0Msa0JBQUtDLHNGQUFvQixDQUFFRCxhQUFGLEVBQWlCLE9BQWpCLENBQXpCLEVBQXNEO0FBQ3JESiw4QkFBYyxDQUNiLFFBRGEsRUFFYkUsWUFBWSxDQUFDSSxFQUZBLEVBR2IsT0FIYSxFQUliRixhQUphLENBQWQ7QUFNQTs7QUFaRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURpQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQWVqQixFQWZpQixDQUFsQjtBQWlCQSxDQXRCRDs7QUF3QmVQLGtGQUFmLEU7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUVBOzs7O0FBR0E7O0FBRUEsSUFBTVUsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixHQUFNO0FBQUEsdUJBQ1dDLGdFQUFhLEVBRHhCO0FBQUEsTUFDdEJDLFVBRHNCLGtCQUN0QkEsVUFEc0I7QUFBQSxNQUNWQyxnQkFEVSxrQkFDVkEsZ0JBRFU7O0FBRTlCLFNBQU9DLGtFQUFPLENBQ2IsWUFBTTtBQUNMLFFBQUssQ0FBRUQsZ0JBQVAsRUFBMEI7QUFDekIsYUFBTyxJQUFQO0FBQ0E7O0FBQ0QsV0FBT0UsbURBQUksQ0FDVkgsVUFEVSxFQUVWLFVBQUVJLFNBQUY7QUFBQSxhQUFpQkEsU0FBUyxDQUFDQyxLQUFWLEtBQW9CLENBQXJDO0FBQUEsS0FGVSxDQUFYO0FBSUEsR0FUWSxFQVViLENBQUVMLFVBQUYsRUFBY0MsZ0JBQWQsQ0FWYSxDQUFkO0FBWUEsQ0FkRDs7QUFnQmVILCtFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTs7O0FBR0E7QUFDQTs7QUFFQSxJQUFNUSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQU07QUFBQSxxQkFDTGpCLG1FQUFXLENBQUUsb0JBQUYsQ0FETjtBQUFBLE1BQ3RCQyxZQURzQixnQkFDdEJBLFlBRHNCOztBQUU5QixTQUFPRSxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVFlLGVBQVIsRUFBeUJDLFNBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNiQyx5QkFEYSxHQUNDLEVBREQ7O0FBQUEsb0JBRWRGLGVBQWUsSUFBSUMsU0FGTDtBQUFBO0FBQUE7QUFBQTs7QUFHUkUsZUFIUSxHQUdKLENBSEk7O0FBQUE7QUFBQSxvQkFHREEsQ0FBQyxHQUFHSCxlQUFlLENBQUNJLE1BSG5CO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEscUJBSU1yQixZQUFZLENBQ2xDa0IsU0FEa0MsRUFFbENELGVBQWUsQ0FBRUcsQ0FBRixDQUFmLENBQXFCRSxRQUZhLENBSmxCOztBQUFBO0FBSVhDLHNCQUpXO0FBUWpCSix5QkFBVyxDQUFDSyxJQUFaLENBQWtCRCxRQUFsQjs7QUFSaUI7QUFHMkJILGVBQUMsRUFINUI7QUFBQTtBQUFBOztBQUFBO0FBQUEsK0NBV1pELFdBWFk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFsQjtBQWFBLENBZkQ7O0FBaUJlSCwrRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBR0E7QUFFQTs7Ozs7O0FBS0EsSUFBTVMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFFQyxTQUFGLEVBQWlCO0FBQUEscUJBSXRDM0IsbUVBQVcsQ0FBRSxvQkFBRixDQUoyQjtBQUFBLE1BRXpDQyxZQUZ5QyxnQkFFekNBLFlBRnlDO0FBQUEsTUFHekMyQixlQUh5QyxnQkFHekNBLGVBSHlDOztBQUFBLDZCQUtsQkMsa0VBQW1CLENBQUVGLFNBQVMsQ0FBQ0csS0FBWixDQUxEO0FBQUEsTUFLbENDLFdBTGtDLHdCQUtsQ0EsV0FMa0M7O0FBQUEsOEJBTWZDLHNFQUF1QixDQUFFLENBQUVMLFNBQUYsQ0FBRixDQU5SO0FBQUEsTUFNbENNLGNBTmtDLHlCQU1sQ0EsY0FOa0M7O0FBTzFDLFNBQU85QixzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVErQixLQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuQkMsMkZBQWdCLENBQUVELEtBQUYsQ0FBaEI7O0FBRG1CLG9CQUdsQixDQUFFM0Isc0ZBQW9CLENBQUV3QixXQUFGLEVBQWUsT0FBZixDQUF0QixJQUNBLENBQUV4QixzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBSko7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBTVgsSUFOVzs7QUFBQTtBQUFBO0FBQUEscUJBU1ExQixZQUFZLENBQ3RDLFVBRHNDLEVBRXRDMEIsU0FBUyxDQUFDSixRQUY0QixDQVRwQjs7QUFBQTtBQVNiYSwwQkFUYTtBQWFuQkEsMEJBQVksQ0FBQ0MsSUFBYixHQUFvQkMsbUVBQU8sQ0FDMUJDLDhEQUFFLENBQUUsV0FBRixFQUFlLHdCQUFmLEVBQXlDLGdCQUF6QyxDQUR3QixFQUUxQkgsWUFBWSxDQUFDQyxJQUZhLENBQTNCOztBQUlBLGtCQUFLLENBQUVHLHNEQUFPLENBQUVQLGNBQUYsQ0FBZCxFQUFtQztBQUNsQ0wsK0JBQWUsQ0FDZCxVQURjLEVBRWRRLFlBQVksQ0FBQzVCLEVBRkMsRUFHZCxRQUhjLEVBSWR5QixjQUpjLENBQWY7QUFNQTs7QUFDREwsNkJBQWUsQ0FDZCxPQURjLEVBRWRHLFdBQVcsQ0FBQ3ZCLEVBRkUsRUFHZCxVQUhjLEVBSWQsQ0FBRTRCLFlBQUYsQ0FKYyxDQUFmO0FBekJtQiwrQ0ErQlpBLFlBL0JZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FnQ2YsQ0FBRUwsV0FBRixFQUFlRSxjQUFmLENBaENlLENBQWxCO0FBaUNBLENBeENEOztBQTBDZVAsZ0ZBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5REE7OztBQUdBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBR0E7QUFDQTtBQUVBOztBQUdBLElBQU1lLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsU0FBTSxLQUFOO0FBQUEsQ0FBbEI7O0FBRUEsSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFFdEMsWUFBRixFQUFnQnVDLFlBQWhCLEVBQWtDO0FBQUEscUJBQzlCM0MsbUVBQVcsQ0FBRSxvQkFBRixDQURtQjtBQUFBLE1BQy9DQyxZQUQrQyxnQkFDL0NBLFlBRCtDOztBQUV2RCxNQUFNMkMsYUFBYSxHQUFHQyxpRUFBUyxDQUFFLFVBQUVDLE1BQUYsRUFBYztBQUFBLGtCQUNmQSxNQUFNLENBQUUsb0JBQUYsQ0FEUztBQUFBLFFBQ3RDQyxrQkFEc0MsV0FDdENBLGtCQURzQzs7QUFFOUMsV0FBT0Esa0JBQWtCLENBQUUzQyxZQUFGLEVBQWdCLFFBQWhCLENBQXpCO0FBQ0EsR0FIOEIsRUFHNUIsQ0FBRUEsWUFBRixDQUg0QixDQUEvQjtBQUlBLE1BQU00QyxTQUFTLEdBQUcvQixtRUFBZ0IsQ0FBRTJCLGFBQUYsRUFBaUIsT0FBakIsQ0FBbEM7QUFDQSxNQUFNSyx5QkFBeUIsR0FBR0MsK0ZBQXVDLEVBQXpFO0FBQ0EsTUFBTUMsMEJBQTBCLEdBQUdDLDBGQUFtQyxFQUF0RTtBQUNBLFNBQU9qRCxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDWkksc0ZBQW9CLENBQUVILFlBQUYsRUFBZ0IsUUFBaEIsQ0FEUjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FFWHFDLFNBRlc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1GQUlaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQ2tCeEMsWUFBWSxDQUNuQyxRQURtQyxFQUVuQ0csWUFBWSxDQUFDbUIsUUFGc0IsQ0FEOUI7O0FBQUE7QUFDQThCLCtCQURBO0FBS05KLCtDQUF5QixDQUFFSSxTQUFGLEVBQWFWLFlBQWIsQ0FBekI7O0FBTE0sNEJBTURXLEtBQUssQ0FBQ0MsT0FBTixDQUFlUCxTQUFmLEtBQThCQSxTQUFTLENBQUMxQixNQU52QztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDZCQU9DNkIsMEJBQTBCLENBQUVFLFNBQUYsRUFBYUwsU0FBYixDQVAzQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUpZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUYsR0FBbEI7QUFlQSxDQXhCRDs7QUEwQmVOLDRFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTs7O0FBR0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFHQTs7QUFHQSxJQUFNYyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUVDLEtBQUYsRUFBU0MsWUFBVCxFQUEyQjtBQUFBLHFCQUM3QjFELG1FQUFXLENBQUUsb0JBQUYsQ0FEa0I7QUFBQSxNQUM5Q0MsWUFEOEMsZ0JBQzlDQSxZQUQ4Qzs7QUFFdEQsTUFBTTBELHVCQUF1QixHQUFHQyw0RkFBb0MsRUFBcEU7QUFDQSxTQUFPekQsc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFDakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ08wRCxpQkFEUCxHQUNlLElBQUlDLElBQUosRUFEZjtBQUVDRCxpQkFBSyxDQUFDRSxRQUFOLENBQ0NGLEtBQUssQ0FBQ0csUUFBTixFQURELEVBRUNDLElBQUksQ0FBQ0MsSUFBTCxDQUFXTCxLQUFLLENBQUNNLFVBQU4sS0FBcUIsRUFBaEMsSUFBdUMsRUFGeEMsRUFHQyxDQUhELEVBSUMsQ0FKRDtBQU1NQyxlQVJQLEdBUWFDLDJFQUFjLENBQUNDLFVBQWYsQ0FBMkJULEtBQTNCLENBUmI7QUFBQTtBQUFBLG1CQVN1QjVELFlBQVksQ0FDakMsVUFEaUMsRUFFakM7QUFDQ3NFLG9CQUFNLEVBQUVkLEtBQUssQ0FBQ2pELEVBRGY7QUFFQ2dFLHNCQUFRLEVBQUUsRUFGWDtBQUdDQyw2QkFBZSxFQUFFLEVBSGxCO0FBSUNDLDJCQUFhLEVBQUVOLEdBQUcsQ0FBQ08sSUFBSixDQUNkQyxxRUFBUSxDQUFDQyxVQUFULENBQXFCO0FBQUVDLG9CQUFJLEVBQUU7QUFBUixlQUFyQixDQURjLENBSmhCO0FBT0NDLHlCQUFXLEVBQUVYLEdBQUcsQ0FBQ08sSUFBSixDQUNaQyxxRUFBUSxDQUFDQyxVQUFULENBQXFCO0FBQUVDLG9CQUFJLEVBQUUsRUFBUjtBQUFZRSxxQkFBSyxFQUFFO0FBQW5CLGVBQXJCLENBRFksQ0FQZDtBQVVDQywyQkFBYSxFQUFFLENBQUMsQ0FWakI7QUFXQ0Msc0JBQVEsRUFBRSxDQVhYO0FBWUNDLDBCQUFZLEVBQUUsQ0FaZjtBQWFDQyx1QkFBUyxFQUFFLENBYlo7QUFjQ0Msd0JBQVUsRUFBRSxDQWRiO0FBZUNDLHlCQUFXLEVBQUU7QUFmZCxhQUZpQyxDQVRuQzs7QUFBQTtBQVNPQyxtQkFUUDtBQUFBO0FBQUEsbUJBNkJPNUIsdUJBQXVCLENBQUVGLEtBQUYsRUFBUzhCLE9BQVQsQ0E3QjlCOztBQUFBO0FBOEJDN0Isd0JBQVksQ0FBRTZCLE9BQUYsQ0FBWjs7QUE5QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FEaUIsSUFpQ2pCLENBQUU5QixLQUFGLEVBQVNDLFlBQVQsQ0FqQ2lCLENBQWxCO0FBbUNBLENBdENEOztBQXdDZUYsa0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDckRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVVBLElBQU1JLG9DQUFvQyxHQUFHLFNBQXZDQSxvQ0FBdUMsR0FBTTtBQUFBLHFCQUN2QjVELG1FQUFXLENBQUUsb0JBQUYsQ0FEWTtBQUFBLE1BQzFDRSxjQUQwQyxnQkFDMUNBLGNBRDBDOztBQUVsRCxTQUFPQyxzRUFBVyxDQUFFLFVBQUU0QixXQUFGLEVBQWV5RCxVQUFmLEVBQStCO0FBQ2xELFFBQUssQ0FBRWpGLHNGQUFvQixDQUFFd0IsV0FBRixFQUFlLE9BQWYsQ0FBM0IsRUFBc0Q7QUFDckQsWUFBTSxJQUFJMEQsS0FBSixDQUNMQyw4REFBRSxDQUNELHlFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUFOO0FBTUE7O0FBQ0QsUUFBSyxDQUFFbkYsc0ZBQW9CLENBQUVpRixVQUFGLEVBQWMsVUFBZCxDQUEzQixFQUF3RDtBQUN2RCxZQUFNLElBQUlDLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCx3RUFEQyxFQUVELGdCQUZDLENBREcsQ0FBTjtBQU1BOztBQUNELFdBQU94RixjQUFjLENBQ3BCLE9BRG9CLEVBRXBCNkIsV0FBVyxDQUFDdkIsRUFGUSxFQUdwQixVQUhvQixFQUlwQmdGLFVBSm9CLENBQXJCO0FBTUEsR0F2QmlCLENBQWxCO0FBd0JBLENBMUJEOztBQTRCZTVCLG1HQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsSUFBTStCLDJDQUEyQyxHQUFHLFNBQTlDQSwyQ0FBOEMsR0FBTTtBQUFBLHFCQUM3QjNGLG1FQUFXLENBQUUsb0JBQUYsQ0FEa0I7QUFBQSxNQUNqRDRCLGVBRGlELGdCQUNqREEsZUFEaUQ7O0FBQUEsbUJBRTVCaUIsaUVBQVMsQ0FDckMsVUFBRUMsTUFBRjtBQUFBLFdBQWNBLE1BQU0sQ0FBRSxvQkFBRixDQUFwQjtBQUFBLEdBRHFDLEVBRXJDLEVBRnFDLENBRm1CO0FBQUEsTUFFakQ4QyxnQkFGaUQsY0FFakRBLGdCQUZpRDs7QUFNekQsU0FBT3pGLHNFQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyRUFBRSxrQkFBUTBGLFdBQVIsRUFBcUJDLFNBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREFDWixJQUFJQyxPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1RkFBYSxpQkFBUUMsT0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUNDSixnQkFBZ0IsQ0FBRSxRQUFGLEVBQVlFLFNBQVosQ0FEakI7O0FBQUE7QUFDZkcsaUNBRGU7QUFFbkJBLGlDQUFPLEdBQUczQyxLQUFLLENBQUNDLE9BQU4sQ0FBZTBDLE9BQWYsSUFBMkJBLE9BQTNCLEdBQXFDLENBQUVBLE9BQUYsQ0FBL0M7QUFDQUEsaUNBQU8sQ0FBQ0MsT0FBUixDQUFpQixVQUFFQyxNQUFGLEVBQWM7QUFDOUIsZ0NBQUssQ0FBRTVGLHNGQUFvQixDQUFFNEYsTUFBRixFQUFVLFFBQVYsQ0FBM0IsRUFBa0Q7QUFDakQsb0NBQU0sSUFBSVYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUFOO0FBTUE7QUFDRCwyQkFURDtBQUhtQjtBQUFBLGlDQWFiOUQsZUFBZSxDQUNwQixVQURvQixFQUVwQmlFLFdBRm9CLEVBR3BCLFFBSG9CLEVBSXBCSSxPQUpvQixDQWJGOztBQUFBO0FBbUJuQkQsaUNBQU8sQ0FBRSxJQUFGLENBQVA7O0FBbkJtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBYjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFEWTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQWxCO0FBdUJBLENBN0JEOztBQStCZUwsMEdBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNUyx1Q0FBdUMsR0FBRyxTQUExQ0EsdUNBQTBDLEdBQU07QUFBQSxxQkFDekJwRyxtRUFBVyxDQUFFLG9CQUFGLENBRGM7QUFBQSxNQUM3QzRCLGVBRDZDLGdCQUM3Q0EsZUFENkM7O0FBRXJELFNBQU96QixzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVF3QixTQUFSLEVBQW1Cc0UsT0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNaMUYsc0ZBQW9CLENBQUVvQixTQUFGLEVBQWEsVUFBYixDQURSO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUVaLElBQUk4RCxLQUFKLENBQ0xDLDhEQUFFLENBQ0QsOEVBREMsRUFFRCxnQkFGQyxDQURHLENBRlk7O0FBQUE7QUFTbkJPLHFCQUFPLEdBQUczQyxLQUFLLENBQUNDLE9BQU4sQ0FBZTBDLE9BQWYsSUFBMkJBLE9BQTNCLEdBQXFDLENBQUVBLE9BQUYsQ0FBL0M7QUFDQUEscUJBQU8sQ0FBQ0MsT0FBUixDQUFpQixVQUFFQyxNQUFGLEVBQWM7QUFDOUIsb0JBQUssQ0FBRTVGLHNGQUFvQixDQUFFNEYsTUFBRixFQUFVLFFBQVYsQ0FBM0IsRUFBa0Q7QUFDakQsd0JBQU0sSUFBSVYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUFOO0FBTUE7QUFDRCxlQVREO0FBVm1CO0FBQUEscUJBb0JiOUQsZUFBZSxDQUNwQixVQURvQixFQUVwQkQsU0FGb0IsRUFHcEIsUUFIb0IsRUFJcEJzRSxPQUpvQixDQXBCRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQWxCO0FBMkJBLENBN0JEOztBQStCZUcsc0dBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNbEQsdUNBQXVDLEdBQUcsU0FBMUNBLHVDQUEwQyxHQUFNO0FBQUEscUJBQ3pCbEQsbUVBQVcsQ0FBRSxvQkFBRixDQURjO0FBQUEsTUFDN0M0QixlQUQ2QyxnQkFDN0NBLGVBRDZDOztBQUVyRCxTQUFPekIsc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJFQUFFLGlCQUFRZ0csTUFBUixFQUFnQkUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNaOUYsc0ZBQW9CLENBQUU0RixNQUFGLEVBQVUsUUFBVixDQURSO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUVaLElBQUlWLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCwwRUFEQyxFQUVELGdCQUZDLENBREcsQ0FGWTs7QUFBQTtBQVNuQlcsd0JBQVUsR0FBRy9DLEtBQUssQ0FBQ0MsT0FBTixDQUFlOEMsVUFBZixJQUE4QkEsVUFBOUIsR0FBMkMsQ0FBRUEsVUFBRixDQUF4RDtBQUNBQSx3QkFBVSxDQUFDSCxPQUFYLENBQW9CLFVBQUV2RSxTQUFGLEVBQWlCO0FBQ3BDLG9CQUFLLENBQUVwQixzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBQTNCLEVBQXVEO0FBQ3RELHdCQUFNLElBQUk4RCxLQUFKLENBQ0xDLDhEQUFFLENBQ0QsOEVBREMsRUFFRCxnQkFGQyxDQURHLENBQU47QUFNQTtBQUNELGVBVEQ7QUFWbUI7QUFBQSxxQkFvQmI5RCxlQUFlLENBQ3BCLFFBRG9CLEVBRXBCdUUsTUFBTSxDQUFDM0YsRUFGYSxFQUdwQixVQUhvQixFQUlwQjZGLFVBSm9CLENBcEJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBbEI7QUEyQkEsQ0E3QkQ7O0FBK0JlbkQsc0dBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNRSxtQ0FBbUMsR0FBRyxTQUF0Q0EsbUNBQXNDLEdBQU07QUFBQSxxQkFDckJwRCxtRUFBVyxDQUFFLG9CQUFGLENBRFU7QUFBQSxNQUN6QzRCLGVBRHlDLGdCQUN6Q0EsZUFEeUM7O0FBRWpELFNBQU96QixzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVFnRyxNQUFSLEVBQWdCRyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ1ovRixzRkFBb0IsQ0FBRTRGLE1BQUYsRUFBVSxRQUFWLENBRFI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0JBRVosSUFBSVYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUZZOztBQUFBO0FBU25CWSxvQkFBTSxHQUFHaEQsS0FBSyxDQUFDQyxPQUFOLENBQWUrQyxNQUFmLElBQTBCQSxNQUExQixHQUFtQyxDQUFFQSxNQUFGLENBQTVDO0FBQ0FBLG9CQUFNLENBQUNKLE9BQVAsQ0FBZ0IsVUFBRUssS0FBRixFQUFhO0FBQzVCLG9CQUFLLENBQUVoRyxzRkFBb0IsQ0FBRWdHLEtBQUYsRUFBUyxPQUFULENBQTNCLEVBQWdEO0FBQy9DLHdCQUFNLElBQUlkLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCx5RUFEQyxFQUVELGdCQUZDLENBREcsQ0FBTjtBQU1BO0FBQ0QsZUFURDtBQVZtQjtBQUFBLHFCQW9CYjlELGVBQWUsQ0FDcEIsUUFEb0IsRUFFcEJ1RSxNQUFNLENBQUMzRixFQUZhLEVBR3BCLE9BSG9CLEVBSXBCOEYsTUFKb0IsQ0FwQkY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFsQjtBQTJCQSxDQTdCRDs7QUErQmVsRCxrR0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREE7OztBQUdBO0FBQ0E7QUFDQTtBQUVBLElBQU1vRCxNQUFNLEdBQUcscUVBQU9DLE1BQU0sQ0FBQ0MsWUFBZCxNQUErQixRQUEvQixJQUNkRCxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLEdBRE4sR0FFZEMsUUFBUSxDQUFFSCxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLEdBQXRCLEVBQTJCLEVBQTNCLENBRk0sR0FHZCxJQUhEO0FBS0E7Ozs7QUFHQTs7QUFHQSxJQUFNRSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUVDLGNBQUYsRUFBa0JDLGFBQWxCLEVBQXFDO0FBQUEscUJBQ3pDL0csbUVBQVcsQ0FBRSxvQkFBRixDQUQ4QjtBQUFBLE1BQzFEQyxZQUQwRCxnQkFDMURBLFlBRDBEOztBQUVsRSxNQUFNa0QsMEJBQTBCLEdBQUdDLDBGQUFtQyxFQUF0RTtBQUNBLFNBQU9qRCxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUNqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTzBELGlCQURQLEdBQ2UsSUFBSUMsSUFBSixFQURmO0FBRUNELGlCQUFLLENBQUNFLFFBQU4sQ0FDQ0YsS0FBSyxDQUFDRyxRQUFOLEVBREQsRUFFQ0MsSUFBSSxDQUFDQyxJQUFMLENBQVdMLEtBQUssQ0FBQ00sVUFBTixLQUFxQixFQUFoQyxJQUF1QyxFQUZ4QyxFQUdDLENBSEQsRUFJQyxDQUpEO0FBTU1DLGVBUlAsR0FRYUMsMkVBQWMsQ0FBQ0MsVUFBZixDQUEyQlQsS0FBM0IsQ0FSYjtBQUFBO0FBQUEsbUJBU3lCNUQsWUFBWSxDQUNuQyxRQURtQyxFQUVuQztBQUNDK0csc0JBQVEsRUFBRSxFQURYO0FBRUNDLDZCQUFlLEVBQUUsRUFGbEI7QUFHQ0MscUJBQU8sRUFBRSxDQUFDLENBSFg7QUFJQ0Msc0JBQVEsRUFBRSxDQUpYO0FBS0NDLDBCQUFZLEVBQUUsQ0FMZjtBQU1DQyxzQkFBUSxFQUFFLENBQUMsQ0FOWjtBQU9DQywwQkFBWSxFQUFFLEtBUGY7QUFRQ0MscUJBQU8sRUFBRSxJQVJWO0FBU0NDLHFCQUFPLEVBQUUsQ0FBQyxDQVRYO0FBVUNDLHVCQUFTLEVBQUUsSUFWWjtBQVdDQywyQkFBYSxFQUFFdEQsR0FYaEI7QUFZQ3VELHlCQUFXLEVBQUV2RCxHQUFHLENBQUNPLElBQUosQ0FDWkMscUVBQVEsQ0FBQ0MsVUFBVCxDQUFxQjtBQUFFQyxvQkFBSSxFQUFFO0FBQVIsZUFBckIsQ0FEWSxDQVpkO0FBZUM4Qyx5QkFBVyxFQUFFLEtBZmQ7QUFnQkNDLHVCQUFTLEVBQUUsQ0FoQlo7QUFpQkNDLDJCQUFhLEVBQUUsS0FqQmhCO0FBa0JDQyxtQ0FBcUIsRUFBRSxLQWxCeEI7QUFtQkNDLHlCQUFXLEVBQUV4QixNQW5CZDtBQW9CQ3lCLHdCQUFVLEVBQUUsQ0FwQmI7QUFxQkNDLHlCQUFXLEVBQUU7QUFyQmQsYUFGbUMsQ0FUckM7O0FBQUE7QUFTTzdFLHFCQVRQO0FBQUE7QUFBQSxtQkFtQzRCcEQsWUFBWSxDQUN0QyxPQURzQyxFQUV0QztBQUFFa0ksb0JBQU0sRUFBRXBCLGFBQWEsQ0FBQ3ZHO0FBQXhCLGFBRnNDLENBbkN4Qzs7QUFBQTtBQW1DTzRILHdCQW5DUDtBQUFBO0FBQUEsbUJBdUNPakYsMEJBQTBCLENBQUVFLFNBQUYsRUFBYSxDQUFFK0UsWUFBRixDQUFiLENBdkNqQzs7QUFBQTtBQXdDQ3RCLDBCQUFjLENBQUV6RCxTQUFGLENBQWQ7O0FBeENEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBRGlCLElBMkNqQixDQUFFcEQsWUFBRixFQUFnQmtELDBCQUFoQixDQTNDaUIsQ0FBbEI7QUE2Q0EsQ0FoREQ7O0FBa0RlMEQsb0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDcEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBQ0E7QUFDQTtBQUVBLElBQU13QixPQUFPLEdBQUc7QUFDZjVFLE9BQUssRUFBRSxFQURRO0FBRWY2RSxhQUFXLEVBQUU7QUFGRSxDQUFoQjtBQUtBOzs7Ozs7Ozs7QUFRQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUU1RyxTQUFGLEVBQWlCO0FBQzFDLFNBQU9rQixpRUFBUyxDQUFFLFVBQUVDLE1BQUYsRUFBYztBQUMvQixRQUFLLENBQUV2QyxzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBQTNCLEVBQXVEO0FBQ3RENkcsb0RBQU8sQ0FDTixLQURNLEVBRU4sb0RBRk0sQ0FBUDtBQUlBLGFBQU9ILE9BQVA7QUFDQTs7QUFQOEIsa0JBUUF2RixNQUFNLENBQUUsb0JBQUYsQ0FSTjtBQUFBLFFBUXZCQyxrQkFSdUIsV0FRdkJBLGtCQVJ1Qjs7QUFBQSxtQkFTR0QsTUFBTSxDQUFFLFdBQUYsQ0FUVDtBQUFBLFFBU3ZCMkYscUJBVHVCLFlBU3ZCQSxxQkFUdUI7O0FBVS9CLFFBQUloRixLQUFLLEdBQUdWLGtCQUFrQixDQUFFcEIsU0FBRixFQUFhLE9BQWIsQ0FBOUI7QUFDQSxRQUFNMkcsV0FBVyxHQUFHRyxxQkFBcUIsQ0FDeEMsb0JBRHdDLEVBRXhDLENBQUU5RyxTQUFGLEVBQWEsT0FBYixDQUZ3QyxDQUF6Qzs7QUFJQSxRQUFLMkcsV0FBTCxFQUFtQjtBQUNsQjdFLFdBQUssR0FBR0gsS0FBSyxDQUFDQyxPQUFOLENBQWVFLEtBQWYsS0FBMEJBLEtBQUssQ0FBRSxDQUFGLENBQS9CLElBQ1JsRCxzRkFBb0IsQ0FBRWtELEtBQUssQ0FBRSxDQUFGLENBQVAsRUFBYyxPQUFkLENBRFosR0FFUEEsS0FBSyxDQUFFLENBQUYsQ0FGRSxHQUdQLElBSEQ7QUFJQSxhQUFPO0FBQ05BLGFBQUssRUFBTEEsS0FETTtBQUVONkUsbUJBQVcsRUFBWEE7QUFGTSxPQUFQO0FBSUE7O0FBQ0QsV0FBT0QsT0FBUDtBQUNBLEdBMUJlLEVBMEJiLENBQUUxRyxTQUFGLENBMUJhLENBQWhCO0FBMkJBLENBNUJEOztBQThCZTRHLGdGQUFmLEU7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQSxJQUFNRixPQUFPLEdBQUc7QUFDZnBDLFNBQU8sRUFBRSxFQURNO0FBRWZ5QyxlQUFhLEVBQUU7QUFGQSxDQUFoQjtBQUtBOzs7Ozs7Ozs7QUFRQSxJQUFNQyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUVoSCxTQUFGLEVBQWlCO0FBQzVDLFNBQU9rQixpRUFBUyxDQUFFLFVBQUVDLE1BQUYsRUFBYztBQUMvQixRQUFLLENBQUV2QyxzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBQTNCLEVBQXVEO0FBQ3RENkcsb0RBQU8sQ0FDTixLQURNLEVBRU4sb0RBRk0sQ0FBUDtBQUlBLGFBQU9ILE9BQVA7QUFDQTs7QUFQOEIsa0JBUUF2RixNQUFNLENBQUUsb0JBQUYsQ0FSTjtBQUFBLFFBUXZCQyxrQkFSdUIsV0FRdkJBLGtCQVJ1Qjs7QUFBQSxtQkFTR0QsTUFBTSxDQUFFLFdBQUYsQ0FUVDtBQUFBLFFBU3ZCMkYscUJBVHVCLFlBU3ZCQSxxQkFUdUI7O0FBVS9CLFFBQU14QyxPQUFPLEdBQUdsRCxrQkFBa0IsQ0FBRXBCLFNBQUYsRUFBYSxRQUFiLENBQWxDO0FBQ0EsUUFBTStHLGFBQWEsR0FBR0QscUJBQXFCLENBQzFDLG9CQUQwQyxFQUUxQyxvQkFGMEMsRUFHMUMsQ0FBRTlHLFNBQUYsRUFBYSxRQUFiLENBSDBDLENBQTNDO0FBS0EsV0FBTztBQUNOc0UsYUFBTyxFQUFQQSxPQURNO0FBRU55QyxtQkFBYSxFQUFiQTtBQUZNLEtBQVA7QUFJQSxHQXBCZSxFQW9CYixDQUFFL0csU0FBRixDQXBCYSxDQUFoQjtBQXFCQSxDQXRCRDs7QUF3QmVnSCxrRkFBZixFOzs7Ozs7Ozs7Ozs7QUM1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBRUEsSUFBTU4sT0FBTyxHQUFHO0FBQUUxRixjQUFZLEVBQUUsRUFBaEI7QUFBb0JpRyxvQkFBa0IsRUFBRTtBQUF4QyxDQUFoQjtBQUVBOzs7Ozs7Ozs7O0FBU0EsSUFBTUMscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFFcEYsS0FBRixFQUFpQztBQUFBLE1BQXhCNkUsV0FBd0IsdUVBQVYsSUFBVTtBQUM5RCxTQUFPekYsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSyxFQUNKd0YsV0FBVyxJQUNYL0gsc0ZBQW9CLENBQUVrRCxLQUFGLEVBQVMsT0FBVCxDQUZoQixDQUFMLEVBR0k7QUFDSCxhQUFPNEUsT0FBUDtBQUNBOztBQU44QixrQkFPQXZGLE1BQU0sQ0FBRSxvQkFBRixDQVBOO0FBQUEsUUFPdkJDLGtCQVB1QixXQU92QkEsa0JBUHVCOztBQUFBLG1CQVFHRCxNQUFNLENBQUUsV0FBRixDQVJUO0FBQUEsUUFRdkIyRixxQkFSdUIsWUFRdkJBLHFCQVJ1Qjs7QUFTL0IsUUFBTUssUUFBUSxHQUFHL0Ysa0JBQWtCLENBQUVVLEtBQUYsRUFBUyxVQUFULEVBQXFCLE9BQXJCLENBQW5DO0FBQ0EsUUFBTXNGLE1BQU0sR0FBR04scUJBQXFCLENBQ25DLG9CQURtQyxFQUVuQyxvQkFGbUMsRUFHbkMsQ0FBRWhGLEtBQUYsRUFBUyxVQUFULENBSG1DLENBQXBDO0FBS0EsV0FBTztBQUNOZCxrQkFBWSxFQUFFbUcsUUFEUjtBQUVORix3QkFBa0IsRUFBRUc7QUFGZCxLQUFQO0FBSUEsR0FuQmUsRUFtQmIsQ0FBRXRGLEtBQUYsQ0FuQmEsQ0FBaEI7QUFvQkEsQ0FyQkQ7O0FBdUJlb0Ysb0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDeENBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBLElBQU1SLE9BQU8sR0FBRztBQUNmaEMsWUFBVSxFQUFFLEVBREc7QUFFZjJDLGtCQUFnQixFQUFFO0FBRkgsQ0FBaEI7QUFLQTs7Ozs7Ozs7O0FBUUEsSUFBTUMsd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUEyQixHQUEwQjtBQUFBLE1BQXhCWCxXQUF3Qix1RUFBVixJQUFVO0FBQzFELFNBQU96RixpRUFBUyxDQUFFLFVBQUVDLE1BQUYsRUFBYztBQUMvQixRQUFLLENBQUV3RixXQUFQLEVBQXFCO0FBQ3BCLGFBQU9ELE9BQVA7QUFDQTs7QUFIOEIsa0JBSUN2RixNQUFNLENBQUUsb0JBQUYsQ0FKUDtBQUFBLFFBSXZCb0csbUJBSnVCLFdBSXZCQSxtQkFKdUI7O0FBSy9CLFFBQU03QyxVQUFVLEdBQUc2QyxtQkFBbUIsQ0FBRSxVQUFGLENBQXRDO0FBQ0EsV0FBTzVGLEtBQUssQ0FBQ0MsT0FBTixDQUFlOEMsVUFBZixLQUErQkEsVUFBVSxDQUFDL0UsTUFBMUMsR0FDTjtBQUNDK0UsZ0JBQVUsRUFBVkEsVUFERDtBQUVDMkMsc0JBQWdCLEVBQUU7QUFGbkIsS0FETSxHQUtOWCxPQUxEO0FBTUEsR0FaZSxFQVliLENBQUVDLFdBQUYsQ0FaYSxDQUFoQjtBQWFBLENBZEQ7O0FBZ0JlVyx1RkFBZixFOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVFBLElBQU1wSCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLEdBQW1CO0FBQUEsTUFBakJzSCxPQUFpQix1RUFBUCxDQUFPO0FBQzlDLFNBQU90RyxpRUFBUyxDQUFFLFVBQUVDLE1BQUYsRUFBYztBQUMvQixRQUFJc0csTUFBSjs7QUFDQSxRQUFLRCxPQUFPLEtBQUssQ0FBakIsRUFBcUI7QUFBQSxvQkFDRXJHLE1BQU0sQ0FBRSxvQkFBRixDQURSO0FBQUEsVUFDWnVHLFNBRFksV0FDWkEsU0FEWTs7QUFFcEJELFlBQU0sR0FBR0MsU0FBUyxDQUFFRixPQUFGLENBQWxCO0FBQ0FDLFlBQU0sR0FBRzlGLEtBQUssQ0FBQ0MsT0FBTixDQUFlNkYsTUFBZixLQUEyQkEsTUFBTSxDQUFFLENBQUYsQ0FBakMsR0FDUkEsTUFBTSxDQUFFLENBQUYsQ0FERSxHQUVSLElBRkQ7QUFHQSxLQU5ELE1BTU87QUFBQSxxQkFDbUJ0RyxNQUFNLENBQUUsb0JBQUYsQ0FEekI7QUFBQSxVQUNFd0csWUFERixZQUNFQSxZQURGOztBQUVORixZQUFNLEdBQUdFLFlBQVksQ0FBRUgsT0FBRixDQUFyQjtBQUNBOztBQUNELFFBQU1KLE1BQU0sR0FBR3hJLHNGQUFvQixDQUFFNkksTUFBRixFQUFVLE9BQVYsQ0FBbkM7QUFDQSxXQUFPO0FBQ05ySCxpQkFBVyxFQUFFcUgsTUFEUDtBQUVORyx1QkFBaUIsRUFBRVI7QUFGYixLQUFQO0FBSUEsR0FqQmUsRUFpQmIsQ0FBRUksT0FBRixDQWpCYSxDQUFoQjtBQWtCQSxDQW5CRDs7QUFxQmV0SCxrRkFBZixFOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBRUE7Ozs7Ozs7O0FBT0EsSUFBTTJILHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsR0FBTTtBQUNuQyxTQUFPM0csaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFBQSxrQkFDQ0EsTUFBTSxDQUFFLG9CQUFGLENBRFA7QUFBQSxRQUN2Qm9HLG1CQUR1QixXQUN2QkEsbUJBRHVCOztBQUUvQixRQUFNakQsT0FBTyxHQUFHaUQsbUJBQW1CLENBQUUsUUFBRixDQUFuQztBQUNBLFdBQU87QUFBRWpELGFBQU8sRUFBUEE7QUFBRixLQUFQO0FBQ0EsR0FKZSxFQUliLEVBSmEsQ0FBaEI7QUFLQSxDQU5EOztBQVFldUQsb0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBRUE7QUFFQTs7Ozs7Ozs7O0FBUUEsSUFBTUMsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixDQUFFOUgsU0FBRixFQUFpQjtBQUM3QyxNQUFNd0gsT0FBTyxHQUFHNUksc0ZBQW9CLENBQUVvQixTQUFGLEVBQWEsVUFBYixDQUFwQixHQUNmQSxTQUFTLENBQUNHLEtBREssR0FFZixDQUZEO0FBR0EsU0FBT0QsdUVBQW1CLENBQUVzSCxPQUFGLENBQTFCO0FBQ0EsQ0FMRDs7QUFPZU0sbUZBQWYsRTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUVBLElBQU1wQixPQUFPLEdBQUc7QUFDZnFCLGFBQVcsRUFBRSxJQURFO0FBRWZDLG1CQUFpQixFQUFFO0FBRkosQ0FBaEI7QUFLQTs7Ozs7Ozs7O0FBUUEsSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFFbkcsS0FBRixFQUFpQztBQUFBLE1BQXhCNkUsV0FBd0IsdUVBQVYsSUFBVTtBQUN0RCxTQUFPekYsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSyxFQUNKd0YsV0FBVyxJQUNYL0gsc0ZBQW9CLENBQUVrRCxLQUFGLEVBQVMsT0FBVCxDQUZoQixDQUFMLEVBR0k7QUFDSCxhQUFPNEUsT0FBUDtBQUNBOztBQU44QixrQkFVM0J2RixNQUFNLENBQUUsb0JBQUYsQ0FWcUI7QUFBQSxRQVE5QkMsa0JBUjhCLFdBUTlCQSxrQkFSOEI7QUFBQSxRQVM5QjBGLHFCQVQ4QixXQVM5QkEscUJBVDhCOztBQVcvQixRQUFJVyxNQUFNLEdBQUdyRyxrQkFBa0IsQ0FBRVUsS0FBRixFQUFTLE9BQVQsQ0FBL0I7QUFDQSxRQUFNc0YsTUFBTSxHQUFHTixxQkFBcUIsQ0FDbkMsb0JBRG1DLEVBRW5DLENBQUVoRixLQUFGLEVBQVMsT0FBVCxDQUZtQyxDQUFwQztBQUlBMkYsVUFBTSxHQUFHOUYsS0FBSyxDQUFDQyxPQUFOLENBQWU2RixNQUFmLEtBQTJCQSxNQUFNLENBQUUsQ0FBRixDQUFqQyxJQUNUN0ksc0ZBQW9CLENBQUU2SSxNQUFNLENBQUUsQ0FBRixDQUFSLEVBQWUsT0FBZixDQURYLEdBRVJBLE1BQU0sQ0FBRSxDQUFGLENBRkUsR0FHUixJQUhEO0FBSUEsV0FBTztBQUNOTSxpQkFBVyxFQUFFTixNQURQO0FBRU5PLHVCQUFpQixFQUFFWjtBQUZiLEtBQVA7QUFJQSxHQXhCZSxFQXdCYixDQUFFdEYsS0FBRixFQUFTNkUsV0FBVCxDQXhCYSxDQUFoQjtBQXlCQSxDQTFCRDs7QUE0QmVzQiw0RUFBZixFOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBRUE7Ozs7Ozs7QUFNZSx5RUFBRUMsS0FBRixFQUFhO0FBQzNCLE1BQU1DLEdBQUcsR0FBR0MsaUVBQU0sRUFBbEI7QUFDQUMsc0VBQVMsQ0FBRSxZQUFNO0FBQ2hCRixPQUFHLENBQUNHLE9BQUosR0FBY0osS0FBZDtBQUNBLEdBRlEsQ0FBVDtBQUdBLFNBQU9DLEdBQUcsQ0FBQ0csT0FBWDtBQUNBLENBTkQsRTs7Ozs7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBRUE7Ozs7Ozs7O0FBT0EsSUFBTXZKLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUMzQixTQUFPbUMsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFBQSxrQkFDUEEsTUFBTSxDQUFFLHFCQUFGLENBREM7QUFBQSxRQUN2Qm9ILFdBRHVCLFdBQ3ZCQSxXQUR1Qjs7QUFBQSxtQkFFR3BILE1BQU0sQ0FBRSxXQUFGLENBRlQ7QUFBQSxRQUV2QjJGLHFCQUZ1QixZQUV2QkEscUJBRnVCOztBQUcvQixRQUFNSyxRQUFRLEdBQUdvQixXQUFXLENBQUUsWUFBRixDQUE1QjtBQUNBLFFBQU1uQixNQUFNLEdBQUdOLHFCQUFxQixDQUNuQyxxQkFEbUMsRUFFbkMsYUFGbUMsRUFHbkMsQ0FBRSxZQUFGLENBSG1DLENBQXBDO0FBS0EsV0FBTztBQUNOOUgsZ0JBQVUsRUFBRW1JLFFBRE47QUFFTmxJLHNCQUFnQixFQUFFbUk7QUFGWixLQUFQO0FBSUEsR0FiZSxFQWFiLEVBYmEsQ0FBaEI7QUFjQSxDQWZEOztBQWlCZXJJLDRFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7O0FBR0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVVBLElBQU15SiwyQ0FBMkMsR0FBRyxTQUE5Q0EsMkNBQThDLEdBQU07QUFBQSxxQkFDckJuSyxtRUFBVyxDQUFFLG9CQUFGLENBRFU7QUFBQSxNQUNqRG9LLHVCQURpRCxnQkFDakRBLHVCQURpRDs7QUFFekQsU0FBT2pLLHNFQUFXLENBQUUsVUFBRTBGLFdBQUYsRUFBZUMsU0FBZixFQUE4QjtBQUNqRCxXQUFPLElBQUlDLE9BQUosQ0FBYSxVQUFFQyxPQUFGLEVBQWU7QUFDbENGLGVBQVMsQ0FBQ0ksT0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0VBQW1CLGlCQUFRbUUsUUFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFDWkQsdUJBQXVCLENBQzVCLFVBRDRCLEVBRTVCdkUsV0FGNEIsRUFHNUIsUUFINEIsRUFJNUJ3RSxRQUo0QixDQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQW5COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUFyRSxhQUFPLENBQUUsSUFBRixDQUFQO0FBQ0EsS0FWTSxDQUFQO0FBV0EsR0FaaUIsQ0FBbEI7QUFhQSxDQWZEOztBQWlCZW1FLDBHQUFmLEU7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQSxJQUFNOUIsT0FBTyxHQUFHO0FBQ2ZoQyxZQUFVLEVBQUUsRUFERztBQUVmMkMsa0JBQWdCLEVBQUU7QUFGSCxDQUFoQjtBQUtBOzs7Ozs7Ozs7QUFRQSxJQUFNc0IsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFFbEssWUFBRixFQUFvQjtBQUMvQyxTQUFPeUMsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSyxDQUFFdkMsc0ZBQW9CLENBQUVILFlBQUYsRUFBZ0IsUUFBaEIsQ0FBM0IsRUFBd0Q7QUFDdkRvSSxvREFBTyxDQUNOLEtBRE0sRUFFTixrREFGTSxDQUFQO0FBSUEsYUFBT0gsT0FBUDtBQUNBOztBQVA4QixrQkFRQXZGLE1BQU0sQ0FBRSxvQkFBRixDQVJOO0FBQUEsUUFRdkJDLGtCQVJ1QixXQVF2QkEsa0JBUnVCOztBQUFBLG1CQVNHRCxNQUFNLENBQUUsV0FBRixDQVRUO0FBQUEsUUFTdkIyRixxQkFUdUIsWUFTdkJBLHFCQVR1Qjs7QUFVL0IsUUFBTXBDLFVBQVUsR0FBR3RELGtCQUFrQixDQUFFM0MsWUFBRixFQUFnQixVQUFoQixDQUFyQztBQUNBLFFBQU00SSxnQkFBZ0IsR0FBR1AscUJBQXFCLENBQzdDLG9CQUQ2QyxFQUU3QyxvQkFGNkMsRUFHN0MsQ0FBRXJJLFlBQUYsRUFBZ0IsVUFBaEIsQ0FINkMsQ0FBOUM7QUFLQSxXQUFPO0FBQ05pRyxnQkFBVSxFQUFWQSxVQURNO0FBRU4yQyxzQkFBZ0IsRUFBaEJBO0FBRk0sS0FBUDtBQUlBLEdBcEJlLEVBb0JiLENBQUU1SSxZQUFGLENBcEJhLENBQWhCO0FBcUJBLENBdEJEOztBQXdCZWtLLGtGQUFmLEU7Ozs7Ozs7Ozs7OztBQzVDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQSxJQUFNakMsT0FBTyxHQUFHO0FBQ2YvQixRQUFNLEVBQUUsRUFETztBQUVmaUUsY0FBWSxFQUFFLEtBRkM7QUFHZkMsYUFBVyxFQUFFO0FBSEUsQ0FBaEI7QUFNQTs7Ozs7Ozs7OztBQVNBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBRXJLLFlBQUYsRUFBb0I7QUFDM0MsU0FBT3lDLGlFQUFTLENBQ2YsVUFBRUMsTUFBRixFQUFjO0FBQ2IsUUFBS3ZDLHNGQUFvQixDQUFFSCxZQUFGLEVBQWdCLFFBQWhCLENBQXpCLEVBQXNEO0FBQUEsb0JBQ3RCMEMsTUFBTSxDQUFFLG9CQUFGLENBRGdCO0FBQUEsVUFDN0NDLGtCQUQ2QyxXQUM3Q0Esa0JBRDZDOztBQUFBLHFCQUVuQkQsTUFBTSxDQUFFLFdBQUYsQ0FGYTtBQUFBLFVBRTdDMkYscUJBRjZDLFlBRTdDQSxxQkFGNkM7O0FBR3JELFVBQU1uQyxNQUFNLEdBQUd2RCxrQkFBa0IsQ0FDaEMzQyxZQURnQyxFQUVoQyxPQUZnQyxDQUFqQztBQUlBLFVBQU1tSyxZQUFZLEdBQUc5QixxQkFBcUIsQ0FDekMsb0JBRHlDLEVBRXpDLG9CQUZ5QyxFQUd6QyxDQUFFckksWUFBRixFQUFnQixPQUFoQixDQUh5QyxDQUExQztBQUtBLGFBQU87QUFDTmtHLGNBQU0sRUFBTkEsTUFETTtBQUVOaUUsb0JBQVksRUFBWkEsWUFGTTtBQUdOQyxtQkFBVyxFQUFFRCxZQUFZLElBQUkvSCxzREFBTyxDQUFFOEQsTUFBRjtBQUg5QixPQUFQO0FBS0E7O0FBQ0QsV0FBTytCLE9BQVA7QUFDQSxHQXJCYyxFQXNCZixDQUFFakksWUFBRixDQXRCZSxDQUFoQjtBQXdCQSxDQXpCRDs7QUEyQmVxSyw4RUFBZixFOzs7Ozs7Ozs7Ozs7QUNqREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBRUEsSUFBTXBDLE9BQU8sR0FBRztBQUNmcEcsZ0JBQWMsRUFBRSxFQUREO0FBRWZ5SSxzQkFBb0IsRUFBRTtBQUZQLENBQWhCO0FBS0E7Ozs7Ozs7Ozs7QUFTQSxJQUFNMUksdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixHQUczQjtBQUFBLE1BRkpXLFlBRUksdUVBRlcsRUFFWDtBQUFBLE1BREppRyxrQkFDSSx1RUFEaUIsSUFDakI7QUFDSixTQUFPL0YsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFDQyxDQUFFOEYsa0JBQUYsSUFDQSxDQUFFdEYsS0FBSyxDQUFDQyxPQUFOLENBQWVaLFlBQWYsQ0FERixJQUVBSCxzREFBTyxDQUFFRyxZQUFGLENBSFIsRUFJRTtBQUNELGFBQU8wRixPQUFQO0FBQ0E7O0FBQ0QsUUFBTXNDLGFBQWEsR0FBR2hJLFlBQVksQ0FBQ2lJLEdBQWIsQ0FDckIsVUFBRXBGLFVBQUY7QUFBQSxhQUFrQmpGLHNGQUFvQixDQUFFaUYsVUFBRixFQUFjLFVBQWQsQ0FBcEIsR0FDakJBLFVBQVUsQ0FBQ2hGLEVBRE0sR0FFakIsSUFGRDtBQUFBLEtBRHFCLENBQXRCOztBQVIrQixrQkFhTXNDLE1BQU0sQ0FBRSxvQkFBRixDQWJaO0FBQUEsUUFhdkIrSCx3QkFidUIsV0FhdkJBLHdCQWJ1Qjs7QUFBQSxtQkFjRy9ILE1BQU0sQ0FBRSxXQUFGLENBZFQ7QUFBQSxRQWN2QjJGLHFCQWR1QixZQWN2QkEscUJBZHVCOztBQWUvQixRQUFNSyxRQUFRLEdBQUcrQix3QkFBd0IsQ0FDeEMsVUFEd0MsRUFFeENGLGFBRndDLEVBR3hDLFFBSHdDLENBQXpDO0FBS0EsUUFBTTVCLE1BQU0sR0FBR04scUJBQXFCLENBQ25DLG9CQURtQyxFQUVuQywwQkFGbUMsRUFHbkMsQ0FBRSxVQUFGLEVBQWNrQyxhQUFkLEVBQTZCLFFBQTdCLENBSG1DLENBQXBDO0FBS0EsV0FBTztBQUNOMUksb0JBQWMsRUFBRTZHLFFBRFY7QUFFTjRCLDBCQUFvQixFQUFFM0I7QUFGaEIsS0FBUDtBQUlBLEdBN0JlLEVBNkJiLENBQUVwRyxZQUFGLEVBQWdCaUcsa0JBQWhCLENBN0JhLENBQWhCO0FBOEJBLENBbENEOztBQW9DZTVHLHNGQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtjQUVvQnlFLE07SUFBWnFFLE8sV0FBQUEsTzs7QUFFUixJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUVwSixTQUFGLEVBQWlCO0FBQUEscUJBQ2YzQixtRUFBVyxDQUFFLG9CQUFGLENBREk7QUFBQSxNQUNuQ2dMLGVBRG1DLGdCQUNuQ0EsZUFEbUM7O0FBRTNDLFNBQU83SyxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVErQixLQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbkJDLDJGQUFnQixDQUFFRCxLQUFGLENBQWhCOztBQURtQixrQkFFWjNCLHNGQUFvQixDQUFFb0IsU0FBRixFQUFhLFVBQWIsQ0FGUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBLGtCQUtabUosT0FBTyxDQUNicEYsOERBQUUsQ0FDRCxrREFEQyxFQUVELGdCQUZDLENBRFcsQ0FMSztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQWFuQnNGLDZCQUFlLENBQUUsVUFBRixFQUFjckosU0FBUyxDQUFDbkIsRUFBeEIsQ0FBZjs7QUFibUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFsQjtBQWVBLENBakJEOztBQW1CZXVLLGlGQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVFBLElBQU1FLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsR0FBTTtBQUFBLHFCQUkvQmpMLG1FQUFXLENBQUUsb0JBQUYsQ0FKb0I7QUFBQSxNQUVsQ29LLHVCQUZrQyxnQkFFbENBLHVCQUZrQztBQUFBLE1BR2xDWSxlQUhrQyxnQkFHbENBLGVBSGtDOztBQUtuQyxTQUFPN0ssc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJFQUNqQixpQkFBUUcsYUFBUixFQUF1QkYsWUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNRRyxzRkFBb0IsQ0FBRUQsYUFBRixFQUFpQixPQUFqQixDQUQ1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvQkFFUSxJQUFJbUYsS0FBSixDQUNMQyw4REFBRSxDQUNELHdEQUNBLHNEQUZDLEVBR0QsZ0JBSEMsQ0FERyxDQUZSOztBQUFBO0FBVUMwRSxxQ0FBdUIsQ0FDdEIsUUFEc0IsRUFFdEJoSyxZQUFZLENBQUNJLEVBRlMsRUFHdEIsT0FIc0IsRUFJdEJGLGFBQWEsQ0FBQ0UsRUFKUSxDQUF2QjtBQU1Bd0ssNkJBQWUsQ0FBRSxPQUFGLEVBQVcxSyxhQUFhLENBQUNFLEVBQXpCLENBQWY7O0FBaEJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBRGlCOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BbUJqQixFQW5CaUIsQ0FBbEI7QUFxQkEsQ0ExQkQ7O0FBNEJleUssb0ZBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Y0FFb0J4RSxNO0lBQVpxRSxPLFdBQUFBLE87O0FBRVIsSUFBTUksY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFFOUssWUFBRixFQUFvQjtBQUFBLHFCQUNkSixtRUFBVyxDQUFFLG9CQUFGLENBREc7QUFBQSxNQUNsQ2dMLGVBRGtDLGdCQUNsQ0EsZUFEa0M7O0FBRTFDLFNBQU83SyxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDWkksc0ZBQW9CLENBQUVILFlBQUYsRUFBZ0IsUUFBaEIsQ0FEUjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFFWixJQUFJcUYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBHQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUZZOztBQUFBO0FBU25CLGdCQUFLb0YsT0FBTyxDQUNYcEYsOERBQUUsQ0FDRCw4Q0FEQyxFQUVELGdCQUZDLENBRFMsQ0FBWixFQUtJO0FBQ0hzRiw2QkFBZSxDQUFFLFFBQUYsRUFBWTVLLFlBQVksQ0FBQ0ksRUFBekIsQ0FBZjtBQUNBOztBQWhCa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBRixHQUFsQjtBQWtCQSxDQXBCRDs7QUFzQmUwSyw2RUFBZixFOzs7Ozs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxtQzs7Ozs7Ozs7Ozs7QUNwQ0Esd0JBQXdCLDJFQUEyRSxvQ0FBb0MsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLG9DQUFvQyw4SEFBOEgsR0FBRyxFQUFFLHNCQUFzQjs7QUFFblc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLGFBQW9COztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM3REEsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLHVDQUF1QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLCtDQUErQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1ob29rcy5jNTg5YzZhZTBkOGUzNjMzMTFiMC5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VBZGRQcmljZU1vZGlmaWVyIH0gZnJvbSAnLi91c2UtYWRkLXByaWNlLW1vZGlmaWVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQmFzZVByaWNlVHlwZSB9IGZyb20gJy4vdXNlLWJhc2UtcHJpY2UtdHlwZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNsb25lRW50aXRpZXMgfSBmcm9tICcuL3VzZS1jbG9uZS1lbnRpdGllcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNvcHlEYXRlRW50aXR5IH0gZnJvbSAnLi91c2UtY29weS1kYXRlLWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNvcHlUaWNrZXQgfSBmcm9tICcuL3VzZS1jb3B5LXRpY2tldCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZURhdGVFbnRpdHkgfSBmcm9tICcuL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGUgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb24tZm9yLWV2ZW50LXRvLWV2ZW50LWRhdGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVUb1RpY2tldHMgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLWV2ZW50LWRhdGVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXMgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlVGlja2V0RW50aXR5IH0gZnJvbSAnLi91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudERhdGVFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWRhdGUtZXZlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudERhdGVUaWNrZXRzIH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZS10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlc0ZvckV2ZW50IH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRFZGl0b3JFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yVGlja2V0cyB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRGb3JFdmVudERhdGUgfSBmcm9tICcuL3VzZS1ldmVudC1mb3ItZXZlbnQtZGF0ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50VmVudWUgfSBmcm9tICcuL3VzZS1ldmVudC12ZW51ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVByaWNlVHlwZXMgfSBmcm9tICcuL3VzZS1wcmljZS10eXBlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgfVxuXHRmcm9tICcuL3VzZS1yZW1vdmUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUaWNrZXRFdmVudERhdGVzIH0gZnJvbSAnLi91c2UtdGlja2V0LWV2ZW50LWRhdGVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVGlja2V0UHJpY2VzIH0gZnJvbSAnLi91c2UtdGlja2V0LXByaWNlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRpY2tldHNGb3JFdmVudERhdGVzIH1cblx0ZnJvbSAnLi91c2UtdGlja2V0cy1mb3ItZXZlbnQtZGF0ZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUcmFzaERhdGVFbnRpdHkgfSBmcm9tICcuL3VzZS10cmFzaC1kYXRlLWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRyYXNoUHJpY2VNb2RpZmllciB9IGZyb20gJy4vdXNlLXRyYXNoLXByaWNlLW1vZGlmaWVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVHJhc2hUaWNrZXQgfSBmcm9tICcuL3VzZS10cmFzaC10aWNrZXQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VQcmV2aW91cyB9IGZyb20gJy4vdXNlLXByZXZpb3VzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIHVzZUFkZFByaWNlTW9kaWZpZXJcbiAqIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB0d28gZnVuY3Rpb25zOlxuICogIC0gYWRkUHJpY2VNb2RpZmllclxuICogIC0gdHJhc2hQcmljZU1vZGlmaWVyXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBmdW5jdGlvbnNcbiAqL1xuY29uc3QgdXNlQWRkUHJpY2VNb2RpZmllciA9ICgpID0+IHtcblx0Y29uc3Qge1xuXHRcdGNyZWF0ZUVudGl0eSxcblx0XHRjcmVhdGVSZWxhdGlvbixcblx0fSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCB0aWNrZXRFbnRpdHksIHByb3BlcnRpZXMgKSA9PiB7XG5cdFx0XHRjb25zdCBwcmljZU1vZGlmaWVyID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHQncHJpY2UnLFxuXHRcdFx0XHRwcm9wZXJ0aWVzXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggcHJpY2VNb2RpZmllciwgJ3ByaWNlJyApICkge1xuXHRcdFx0XHRjcmVhdGVSZWxhdGlvbihcblx0XHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0XHR0aWNrZXRFbnRpdHkuaWQsXG5cdFx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0XHRwcmljZU1vZGlmaWVyXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRbXVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQWRkUHJpY2VNb2RpZmllcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGZpbmQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VQcmljZVR5cGVzIGZyb20gJy4vdXNlLXByaWNlLXR5cGVzJztcblxuY29uc3QgdXNlQmFzZVByaWNlVHlwZSA9ICgpID0+IHtcblx0Y29uc3QgeyBwcmljZVR5cGVzLCBwcmljZVR5cGVzTG9hZGVkIH0gPSB1c2VQcmljZVR5cGVzKCk7XG5cdHJldHVybiB1c2VNZW1vKFxuXHRcdCgpID0+IHtcblx0XHRcdGlmICggISBwcmljZVR5cGVzTG9hZGVkICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmaW5kKFxuXHRcdFx0XHRwcmljZVR5cGVzLFxuXHRcdFx0XHQoIHByaWNlVHlwZSApID0+IHByaWNlVHlwZS5wYnRJZCA9PT0gMVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdFsgcHJpY2VUeXBlcywgcHJpY2VUeXBlc0xvYWRlZCBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VCYXNlUHJpY2VUeXBlO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuY29uc3QgdXNlQ2xvbmVFbnRpdGllcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggZW50aXRpZXNUb0Nsb25lLCBtb2RlbE5hbWUgKSA9PiB7XG5cdFx0Y29uc3QgbmV3RW50aXRpZXMgPSBbXTtcblx0XHRpZiAoIGVudGl0aWVzVG9DbG9uZSAmJiBtb2RlbE5hbWUgKSB7XG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBlbnRpdGllc1RvQ2xvbmUubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0Nsb25lID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdFx0XHRlbnRpdGllc1RvQ2xvbmVbIGkgXS5mb3JDbG9uZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRuZXdFbnRpdGllcy5wdXNoKCBuZXdDbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbmV3RW50aXRpZXM7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNsb25lRW50aXRpZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuaW1wb3J0IHsgX3gsIHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VFdmVudEVkaXRvckV2ZW50LCB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyB9IGZyb20gJy4vaW5kZXgnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBmdW5jdGlvbiBmb3IgY29weWluZyBhbiBldmVudCBkYXRlIGVudGl0eVxuICovXG5jb25zdCB1c2VDb3B5RGF0ZUVudGl0eSA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRjb25zdCB7XG5cdFx0Y3JlYXRlRW50aXR5LFxuXHRcdGNyZWF0ZVJlbGF0aW9ucyxcblx0fSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB7IGV2ZW50RW50aXR5IH0gPSB1c2VFdmVudEVkaXRvckV2ZW50KCBldmVudERhdGUuZXZ0SWQgKTtcblx0Y29uc3QgeyB0aWNrZXRFbnRpdGllcyB9ID0gdXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMoIFsgZXZlbnREYXRlIF0gKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGNsaWNrICkgPT4ge1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrICk7XG5cdFx0aWYgKFxuXHRcdFx0ISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnRFbnRpdHksICdldmVudCcgKSB8fFxuXHRcdFx0ISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnIClcblx0XHQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5ld0V2ZW50RGF0ZSA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRldmVudERhdGUuZm9yQ2xvbmVcblx0XHQpO1xuXHRcdG5ld0V2ZW50RGF0ZS5uYW1lID0gc3ByaW50Zihcblx0XHRcdF94KCAnJXMgLSBDT1BZJywgJ0V2ZW50IERhdGUgTmFtZSAtIENPUFknLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRuZXdFdmVudERhdGUubmFtZVxuXHRcdCk7XG5cdFx0aWYgKCAhIGlzRW1wdHkoIHRpY2tldEVudGl0aWVzICkgKSB7XG5cdFx0XHRjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdG5ld0V2ZW50RGF0ZS5pZCxcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldEVudGl0aWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQnZXZlbnQnLFxuXHRcdFx0ZXZlbnRFbnRpdHkuaWQsXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0WyBuZXdFdmVudERhdGUgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIG5ld0V2ZW50RGF0ZTtcblx0fSwgWyBldmVudEVudGl0eSwgdGlja2V0RW50aXRpZXMgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ29weURhdGVFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ2xvbmVFbnRpdGllcyBmcm9tICcuL3VzZS1jbG9uZS1lbnRpdGllcyc7XG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzXG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcyc7XG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5cbmNvbnN0IGZhbHNlRnVuYyA9ICgpID0+IGZhbHNlO1xuXG5jb25zdCB1c2VDb3B5VGlja2V0ID0gKCB0aWNrZXRFbnRpdHksIGRhdGVFbnRpdGllcyApID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCByZWxhdGVkUHJpY2VzID0gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdHJldHVybiBnZXRSZWxhdGVkRW50aXRpZXMoIHRpY2tldEVudGl0eSwgJ3ByaWNlcycgKTtcblx0fSwgWyB0aWNrZXRFbnRpdHkgXSApO1xuXHRjb25zdCBuZXdQcmljZXMgPSB1c2VDbG9uZUVudGl0aWVzKCByZWxhdGVkUHJpY2VzLCAncHJpY2UnICk7XG5cdGNvbnN0IHVwZGF0ZVRpY2tldERhdGVSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXMoKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcygpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICgpID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHJldHVybiBmYWxzZUZ1bmM7XG5cdFx0fVxuXHRcdHJldHVybiBhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdUaWNrZXQgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHR0aWNrZXRFbnRpdHkuZm9yQ2xvbmVcblx0XHRcdCk7XG5cdFx0XHR1cGRhdGVUaWNrZXREYXRlUmVsYXRpb25zKCBuZXdUaWNrZXQsIGRhdGVFbnRpdGllcyApO1xuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBuZXdQcmljZXMgKSAmJiBuZXdQcmljZXMubGVuZ3RoICkge1xuXHRcdFx0XHRhd2FpdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyggbmV3VGlja2V0LCBuZXdQcmljZXMgKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDb3B5VGlja2V0O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IFNlcnZlckRhdGVUaW1lLCBEdXJhdGlvbiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlXG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZSc7XG5cbmNvbnN0IHVzZUNyZWF0ZURhdGVFbnRpdHkgPSAoIGV2ZW50LCBjYWNoZU5ld0RhdGUgKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgdXBkYXRlRXZlbnREYXRlUmVsYXRpb24gPSB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGUoKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKFxuXHRcdGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IG5vd0pzID0gbmV3IERhdGUoKTtcblx0XHRcdG5vd0pzLnNldEhvdXJzKFxuXHRcdFx0XHRub3dKcy5nZXRIb3VycygpLFxuXHRcdFx0XHRNYXRoLmNlaWwoIG5vd0pzLmdldE1pbnV0ZXMoKSAvIDE1ICkgKiAxNSxcblx0XHRcdFx0MCxcblx0XHRcdFx0MFxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IG5vdyA9IFNlcnZlckRhdGVUaW1lLmZyb21KU0RhdGUoIG5vd0pzICk7XG5cdFx0XHRjb25zdCBuZXdEYXRlID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0RVZUX0lEOiBldmVudC5pZCxcblx0XHRcdFx0XHREVFRfbmFtZTogJycsXG5cdFx0XHRcdFx0RFRUX2Rlc2NyaXB0aW9uOiAnJyxcblx0XHRcdFx0XHREVFRfRVZUX3N0YXJ0OiBub3cucGx1cyhcblx0XHRcdFx0XHRcdER1cmF0aW9uLmZyb21PYmplY3QoIHsgZGF5czogMzAgfSApXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHREVFRfRVZUX2VuZDogbm93LnBsdXMoXG5cdFx0XHRcdFx0XHREdXJhdGlvbi5mcm9tT2JqZWN0KCB7IGRheXM6IDMwLCBob3VyczogMiB9IClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdERUVF9yZWdfbGltaXQ6IC0xLFxuXHRcdFx0XHRcdERUVF9zb2xkOiAwLFxuXHRcdFx0XHRcdERUVF9yZXNlcnZlZDogMCxcblx0XHRcdFx0XHREVFRfb3JkZXI6IDAsXG5cdFx0XHRcdFx0RFRUX3BhcmVudDogMCxcblx0XHRcdFx0XHREVFRfZGVsZXRlZDogZmFsc2UsXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHRhd2FpdCB1cGRhdGVFdmVudERhdGVSZWxhdGlvbiggZXZlbnQsIG5ld0RhdGUgKTtcblx0XHRcdGNhY2hlTmV3RGF0ZSggbmV3RGF0ZSApO1xuXHRcdH0sXG5cdFx0WyBldmVudCwgY2FjaGVOZXdEYXRlIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZURhdGVFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogVGhpcyBjdXN0b20gaG9vayByZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZ1xuICogYW4gZXZlbnQgLT4gZGF0ZSByZWxhdGlvbiBiZXR3ZWVuIHRoZSBldmVudCBlbnRpdHkgYW5kIGRhdGUgZW50aXR5LlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudCBlbnRpdHlcbiAqICAtICBldmVudCBkYXRlIGVudGl0eVxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIGV2ZW50IGRhdGUgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbiB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBldmVudEVudGl0eSwgZGF0ZUVudGl0eSApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RW50aXR5LCAnZXZlbnQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBFdmVudCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGRhdGVFbnRpdHksICdkYXRldGltZScgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIERhdGUgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGNyZWF0ZVJlbGF0aW9uKFxuXHRcdFx0J2V2ZW50Jyxcblx0XHRcdGV2ZW50RW50aXR5LmlkLFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGRhdGVFbnRpdHlcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYW4gZXZlbnQgZGF0ZSBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHRpY2tldCBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnREYXRlSWQgSUQgZm9yIGV2ZW50IGRhdGUgZW50aXR5XG4gKiAgLSAgdGlja2V0SWRzIGFycmF5IG9mIHRpY2tldCBlbnRpdHkgSURzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9ucyB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHsgZ2V0RW50aXRpZXNCeUlkcyB9ID0gdXNlU2VsZWN0KFxuXHRcdCggc2VsZWN0ICkgPT4gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApLFxuXHRcdFtdXG5cdCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBldmVudERhdGVJZCwgdGlja2V0SWRzICkgPT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggYXN5bmMgKCByZXNvbHZlICkgPT4ge1xuXHRcdFx0bGV0IHRpY2tldHMgPSBhd2FpdCBnZXRFbnRpdGllc0J5SWRzKCAndGlja2V0JywgdGlja2V0SWRzICk7XG5cdFx0XHR0aWNrZXRzID0gQXJyYXkuaXNBcnJheSggdGlja2V0cyApID8gdGlja2V0cyA6IFsgdGlja2V0cyBdO1xuXHRcdFx0dGlja2V0cy5mb3JFYWNoKCAoIHRpY2tldCApID0+IHtcblx0XHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXQsICd0aWNrZXQnICkgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdFx0YXdhaXQgY3JlYXRlUmVsYXRpb25zKFxuXHRcdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0XHRldmVudERhdGVJZCxcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldHMsXG5cdFx0XHQpO1xuXHRcdFx0cmVzb2x2ZSggdHJ1ZSApO1xuXHRcdH0gKTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYW4gZXZlbnQgZGF0ZSBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHRpY2tldCBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnREYXRlIGVudGl0eVxuICogIC0gIHRpY2tldHMgYXJyYXkgb2YgdGlja2V0IGVudGl0aWVzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVUb1RpY2tldHMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGV2ZW50RGF0ZSwgdGlja2V0cyApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRXZlbnQgRGF0ZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR0aWNrZXRzID0gQXJyYXkuaXNBcnJheSggdGlja2V0cyApID8gdGlja2V0cyA6IFsgdGlja2V0cyBdO1xuXHRcdHRpY2tldHMuZm9yRWFjaCggKCB0aWNrZXQgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZXZlbnREYXRlLFxuXHRcdFx0J3RpY2tldCcsXG5cdFx0XHR0aWNrZXRzLFxuXHRcdCk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZVRvVGlja2V0cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYSB0aWNrZXQgZW50aXR5IGFuZCBvbmUgb3IgbW9yZSBldmVudCBkYXRlIGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICB0aWNrZXQgZW50aXR5XG4gKiAgLSAgZXZlbnREYXRlcyBhcnJheSBvZiBldmVudCBkYXRlIGVudGl0aWVzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIHRpY2tldCwgZXZlbnREYXRlcyApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRldmVudERhdGVzID0gQXJyYXkuaXNBcnJheSggZXZlbnREYXRlcyApID8gZXZlbnREYXRlcyA6IFsgZXZlbnREYXRlcyBdO1xuXHRcdGV2ZW50RGF0ZXMuZm9yRWFjaCggKCBldmVudERhdGUgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRXZlbnQgRGF0ZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldC5pZCxcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRldmVudERhdGVzXG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhIHRpY2tldCBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHByaWNlIGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICB0aWNrZXQgZW50aXR5XG4gKiAgLSAgcHJpY2VzIGFycmF5IG9mIHByaWNlIGVudGl0aWVzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggdGlja2V0LCBwcmljZXMgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXQsICd0aWNrZXQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cHJpY2VzID0gQXJyYXkuaXNBcnJheSggcHJpY2VzICkgPyBwcmljZXMgOiBbIHByaWNlcyBdO1xuXHRcdHByaWNlcy5mb3JFYWNoKCAoIHByaWNlICkgPT4ge1xuXHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBwcmljZSwgJ3ByaWNlJyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgUHJpY2UgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0YXdhaXQgY3JlYXRlUmVsYXRpb25zKFxuXHRcdFx0J3RpY2tldCcsXG5cdFx0XHR0aWNrZXQuaWQsXG5cdFx0XHQncHJpY2UnLFxuXHRcdFx0cHJpY2VzXG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgU2VydmVyRGF0ZVRpbWUsIER1cmF0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbmNvbnN0IHVzZXJJRCA9IHR5cGVvZiB3aW5kb3cudXNlclNldHRpbmdzID09PSAnb2JqZWN0JyAmJlxuXHR3aW5kb3cudXNlclNldHRpbmdzLnVpZCA/XG5cdHBhcnNlSW50KCB3aW5kb3cudXNlclNldHRpbmdzLnVpZCwgMTAgKSA6XG5cdG51bGw7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlc1xuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcblxuY29uc3QgdXNlQ3JlYXRlVGlja2V0RW50aXR5ID0gKCBjYWNoZU5ld1RpY2tldCwgYmFzZVByaWNlVHlwZSApID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzKCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBub3dKcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRub3dKcy5zZXRIb3Vycyhcblx0XHRcdFx0bm93SnMuZ2V0SG91cnMoKSxcblx0XHRcdFx0TWF0aC5jZWlsKCBub3dKcy5nZXRNaW51dGVzKCkgLyAxNSApICogMTUsXG5cdFx0XHRcdDAsXG5cdFx0XHRcdDBcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBub3cgPSBTZXJ2ZXJEYXRlVGltZS5mcm9tSlNEYXRlKCBub3dKcyApO1xuXHRcdFx0Y29uc3QgbmV3VGlja2V0ID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFRLVF9uYW1lOiAnJyxcblx0XHRcdFx0XHRUS1RfZGVzY3JpcHRpb246ICcnLFxuXHRcdFx0XHRcdFRLVF9xdHk6IC0xLFxuXHRcdFx0XHRcdFRLVF9zb2xkOiAwLFxuXHRcdFx0XHRcdFRLVF9yZXNlcnZlZDogMCxcblx0XHRcdFx0XHRUS1RfdXNlczogLTEsXG5cdFx0XHRcdFx0VEtUX3JlcXVpcmVkOiBmYWxzZSxcblx0XHRcdFx0XHRUS1RfbWluOiBudWxsLFxuXHRcdFx0XHRcdFRLVF9tYXg6IC0xLFxuXHRcdFx0XHRcdFRLVF9wcmljZTogbnVsbCxcblx0XHRcdFx0XHRUS1Rfc3RhcnREYXRlOiBub3csXG5cdFx0XHRcdFx0VEtUX2VuZERhdGU6IG5vdy5wbHVzKFxuXHRcdFx0XHRcdFx0RHVyYXRpb24uZnJvbU9iamVjdCggeyBkYXlzOiAzMCB9IClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFRLVF90YXhhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRUS1Rfb3JkZXI6IDAsXG5cdFx0XHRcdFx0VEtUX2lzRGVmYXVsdDogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX3JldmVyc2VfY2FsY3VsYXRlOiBmYWxzZSxcblx0XHRcdFx0XHRUS1Rfd3BfdXNlcjogdXNlcklELFxuXHRcdFx0XHRcdFRLVF9wYXJlbnQ6IDAsXG5cdFx0XHRcdFx0VEtUX2RlbGV0ZWQ6IGZhbHNlLFxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgbmV3QmFzZVByaWNlID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0XHQncHJpY2UnLFxuXHRcdFx0XHR7IFBSVF9JRDogYmFzZVByaWNlVHlwZS5pZCB9XG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMoIG5ld1RpY2tldCwgWyBuZXdCYXNlUHJpY2UgXSApO1xuXHRcdFx0Y2FjaGVOZXdUaWNrZXQoIG5ld1RpY2tldCApO1xuXHRcdH0sXG5cdFx0WyBjcmVhdGVFbnRpdHksIHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVRpY2tldEVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0ZXZlbnQ6IFtdLFxuXHRldmVudExvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgZXZlbnQgZW50aXR5XG4gKiBmb3IgdGhlIGdpdmVuIGRhdGUgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZSAgYW4gZXZlbnQgZGF0ZSBlbnRpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgZXZlbnQgZm9yIHRoZSBzdXBwbGllZCBldmVudCBkYXRlXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RGF0ZUV2ZW50ID0gKCBldmVudERhdGUgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHR3YXJuaW5nKFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYSB2YWxpZCBkYXRldGltZSBlbnRpdHkuJ1xuXHRcdFx0KTtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0bGV0IGV2ZW50ID0gZ2V0UmVsYXRlZEVudGl0aWVzKCBldmVudERhdGUsICdldmVudCcgKTtcblx0XHRjb25zdCBldmVudExvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyBldmVudERhdGUsICdldmVudCcgXVxuXHRcdCk7XG5cdFx0aWYgKCBldmVudExvYWRlZCApIHtcblx0XHRcdGV2ZW50ID0gQXJyYXkuaXNBcnJheSggZXZlbnQgKSAmJiBldmVudFsgMCBdICYmXG5cdFx0XHRpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnRbIDAgXSwgJ2V2ZW50JyApID9cblx0XHRcdFx0ZXZlbnRbIDAgXSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRldmVudCxcblx0XHRcdFx0ZXZlbnRMb2FkZWQsXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gREVGQVVMVDtcblx0fSwgWyBldmVudERhdGUgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnREYXRlRXZlbnQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHRpY2tldHM6IFtdLFxuXHR0aWNrZXRzTG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCB0aWNrZXQgZW50aXRpZXMgZm9yIHRoZSBnaXZlblxuICogZGF0ZSBlbnRpdHkgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZXZlbnREYXRlICBBIGRhdGV0aW1lIEJhc2VFbnRpdHkgaW5zdGFuY2UuXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgdGlja2V0c1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudERhdGVUaWNrZXRzID0gKCBldmVudERhdGUgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHR3YXJuaW5nKFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYSB2YWxpZCBkYXRldGltZSBlbnRpdHkuJ1xuXHRcdFx0KTtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgdGlja2V0cyA9IGdldFJlbGF0ZWRFbnRpdGllcyggZXZlbnREYXRlLCAndGlja2V0JyApO1xuXHRcdGNvbnN0IHRpY2tldHNMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyBldmVudERhdGUsICd0aWNrZXQnIF1cblx0XHQpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aWNrZXRzLFxuXHRcdFx0dGlja2V0c0xvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGV2ZW50RGF0ZSBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudERhdGVUaWNrZXRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHsgZGF0ZUVudGl0aWVzOiBbXSwgZGF0ZUVudGl0aWVzTG9hZGVkOiBmYWxzZSB9O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzXG4gKiBmb3IgdGhlIGdpdmVuIGV2ZW50IGRhdGUgZW50aXRpZXMgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZXZlbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZXZlbnRMb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudERhdGVzRm9yRXZlbnQgPSAoIGV2ZW50LCBldmVudExvYWRlZCA9IHRydWUgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISAoXG5cdFx0XHRldmVudExvYWRlZCAmJlxuXHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50LCAnZXZlbnQnIClcblx0XHQpICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCBlbnRpdGllcyA9IGdldFJlbGF0ZWRFbnRpdGllcyggZXZlbnQsICdkYXRldGltZScsICdldmVudCcgKTtcblx0XHRjb25zdCBsb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyBldmVudCwgJ2RhdGV0aW1lJyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGF0ZUVudGl0aWVzOiBlbnRpdGllcyxcblx0XHRcdGRhdGVFbnRpdGllc0xvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnREYXRlc0ZvckV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdGV2ZW50RGF0ZXM6IFtdLFxuXHRldmVudERhdGVzTG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIGFsbCB0aGUgZGF0ZSBlbnRpdGllc1xuICogY3VycmVudGx5IGluIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgZGF0YSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkICAgdHJ1ZSBpZiBldmVudCBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZFxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIGV2ZW50IGRhdGVzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyA9ICggZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgZXZlbnRMb2FkZWQgKSB7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRFbnRpdGllc0Zvck1vZGVsIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgZXZlbnREYXRlcyA9IGdldEVudGl0aWVzRm9yTW9kZWwoICdkYXRldGltZScgKTtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheSggZXZlbnREYXRlcyApICYmIGV2ZW50RGF0ZXMubGVuZ3RoID9cblx0XHRcdHtcblx0XHRcdFx0ZXZlbnREYXRlcyxcblx0XHRcdFx0ZXZlbnREYXRlc0xvYWRlZDogdHJ1ZSxcblx0XHRcdH0gOlxuXHRcdFx0REVGQVVMVDtcblx0fSwgWyBldmVudExvYWRlZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIHRoZSBhbiBldmVudCB2aWEgdGhlIHN1cHBsaWVkIElEXG4gKiBpZiBubyBJRCBpcyBzdXBwbGllZCwgd2lsbCByZXR1cm4gdGhlIGZpcnN0IGV2ZW50IGluIHRoZSBzdG9yZVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudElkICAgZXZlbnQgZW50aXR5IElEXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGV2ZW50IGVudGl0eSBmb3IgdGhlIHN1cHBsaWVkIElEXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RWRpdG9yRXZlbnQgPSAoIGV2ZW50SWQgPSAwICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRsZXQgZW50aXR5O1xuXHRcdGlmICggZXZlbnRJZCA9PT0gMCApIHtcblx0XHRcdGNvbnN0IHsgZ2V0RXZlbnRzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRlbnRpdHkgPSBnZXRFdmVudHMoIGV2ZW50SWQgKTtcblx0XHRcdGVudGl0eSA9IEFycmF5LmlzQXJyYXkoIGVudGl0eSApICYmIGVudGl0eVsgMCBdID9cblx0XHRcdFx0ZW50aXR5WyAwIF0gOlxuXHRcdFx0XHRudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB7IGdldEV2ZW50QnlJZCB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0ZW50aXR5ID0gZ2V0RXZlbnRCeUlkKCBldmVudElkICk7XG5cdFx0fVxuXHRcdGNvbnN0IGxvYWRlZCA9IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBlbnRpdHksICdldmVudCcgKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZXZlbnRFbnRpdHk6IGVudGl0eSxcblx0XHRcdGV2ZW50RW50aXR5TG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudElkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RWRpdG9yRXZlbnQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBBIGhvb2sgZm9yIHJldHJpZXZpbmcgYWxsIHRoZSB0aWNrZXQgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHRpY2tldHNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnRFZGl0b3JUaWNrZXRzID0gKCkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRjb25zdCB7IGdldEVudGl0aWVzRm9yTW9kZWwgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB0aWNrZXRzID0gZ2V0RW50aXRpZXNGb3JNb2RlbCggJ3RpY2tldCcgKTtcblx0XHRyZXR1cm4geyB0aWNrZXRzIH07XG5cdH0sIFtdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEVkaXRvclRpY2tldHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuaW1wb3J0IHVzZUV2ZW50RWRpdG9yRXZlbnQgZnJvbSAnLi91c2UtZXZlbnQtZWRpdG9yLWV2ZW50JztcblxuLyoqXG4gKiBBIGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIGV2ZW50IGZvciB0aGUgc3VwcGxpZWQgZXZlbnQgZGF0ZVxuICogd2lsbCBkZWZhdWx0IHRvIHRoZSBjdXJyZW50bHkgbG9hZGVkIGV2ZW50IGZvciB0aGUgZWRpdG9yXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgICBldmVudCBkYXRlIGVudGl0eVxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBlbnRpdHkgZm9yIHRoZSBzdXBwbGllZCBJRFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEZvckV2ZW50RGF0ZSA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRjb25zdCBldmVudElkID0gaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApID9cblx0XHRldmVudERhdGUuZXZ0SWQgOlxuXHRcdDA7XG5cdHJldHVybiB1c2VFdmVudEVkaXRvckV2ZW50KCBldmVudElkICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEZvckV2ZW50RGF0ZTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0dmVudWVFbnRpdHk6IG51bGwsXG5cdHZlbnVlRW50aXR5TG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gaG9vayBmb3IgcmV0cmlldmluZyB0aGUgdmVudWUgcmVsYXRlZCB0byB0aGUgZ2l2ZW4gZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50ICBBbiBpbnN0YW5jZSBvZiBhbiBldmVudCBlbnRpdHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIHZlbnVlIGVudGl0eSBmb3IgdGhlIHByb3ZpZGVkIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50VmVudWUgPSAoIGV2ZW50LCBldmVudExvYWRlZCA9IHRydWUgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISAoXG5cdFx0XHRldmVudExvYWRlZCAmJlxuXHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50LCAnZXZlbnQnIClcblx0XHQpICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHtcblx0XHRcdGdldFJlbGF0ZWRFbnRpdGllcyxcblx0XHRcdGhhc0ZpbmlzaGVkUmVzb2x1dGlvbixcblx0XHR9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGxldCBlbnRpdHkgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50LCAndmVudWUnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRbIGV2ZW50LCAndmVudWUnIF1cblx0XHQpO1xuXHRcdGVudGl0eSA9IEFycmF5LmlzQXJyYXkoIGVudGl0eSApICYmIGVudGl0eVsgMCBdICYmXG5cdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGVudGl0eVsgMCBdLCAndmVudWUnICkgP1xuXHRcdFx0ZW50aXR5WyAwIF0gOlxuXHRcdFx0bnVsbDtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmVudWVFbnRpdHk6IGVudGl0eSxcblx0XHRcdHZlbnVlRW50aXR5TG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudCwgZXZlbnRMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRWZW51ZTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogQSBob29rIHRvIGdldCB0aGUgcHJldmlvdXMgcHJvcHMgb3Igc3RhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxzdHJpbmd8bnVtYmVyfSB2YWx1ZSBUaGUgY3VycmVudCB2YWx1ZS5cbiAqIEByZXR1cm4ge09iamVjdHxzdHJpbmd8bnVtYmVyfSAtIHRoZSBwcmV2aW91cyB2YWx1ZVxuICovXG5leHBvcnQgZGVmYXVsdCAoIHZhbHVlICkgPT4ge1xuXHRjb25zdCByZWYgPSB1c2VSZWYoKTtcblx0dXNlRWZmZWN0KCAoKSA9PiB7XG5cdFx0cmVmLmN1cnJlbnQgPSB2YWx1ZTtcblx0fSApO1xuXHRyZXR1cm4gcmVmLmN1cnJlbnQ7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIGFsbCB0aGUgcHJpY2VfdHlwZSBlbnRpdGllc1xuICogY3VycmVudGx5IGluIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgZGF0YSBzdG9yZS5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgcHJpY2UgdHlwZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlUHJpY2VUeXBlcyA9ICgpID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9saXN0cycgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IGVudGl0aWVzID0gZ2V0RW50aXRpZXMoICdwcmljZV90eXBlJyApO1xuXHRcdGNvbnN0IGxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdldmVudGVzcHJlc3NvL2xpc3RzJyxcblx0XHRcdCdnZXRFbnRpdGllcycsXG5cdFx0XHRbICdwcmljZV90eXBlJyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cHJpY2VUeXBlczogZW50aXRpZXMsXG5cdFx0XHRwcmljZVR5cGVzTG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgW10gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVByaWNlVHlwZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHJlbW92aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhbiBldmVudCBkYXRlIGVudGl0eSBhbmQgb25lIG9yIG1vcmUgdGlja2V0IGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudERhdGVJZCBJRCBmb3IgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqICAtICB0aWNrZXRJZHMgYXJyYXkgb2YgdGlja2V0IGVudGl0eSBJRHNcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgcmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soICggZXZlbnREYXRlSWQsIHRpY2tldElkcyApID0+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSApID0+IHtcblx0XHRcdHRpY2tldElkcy5mb3JFYWNoKCBhc3luYyAoIHRpY2tldElkICkgPT4ge1xuXHRcdFx0XHRhd2FpdCByZW1vdmVSZWxhdGlvbkZvckVudGl0eShcblx0XHRcdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0XHRcdGV2ZW50RGF0ZUlkLFxuXHRcdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHRcdHRpY2tldElkLFxuXHRcdFx0XHQpO1xuXHRcdFx0fSApO1xuXHRcdFx0cmVzb2x2ZSggdHJ1ZSApO1xuXHRcdH0gKTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlUmVtb3ZlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0ZXZlbnREYXRlczogW10sXG5cdGV2ZW50RGF0ZXNMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIGV2ZW50IGRhdGUgZW50aXRpZXNcbiAqIGZvciB0aGUgZ2l2ZW4gdGlja2V0IGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSB0aWNrZXRFbnRpdHkgIEEgZGF0ZXRpbWUgQmFzZUVudGl0eSBpbnN0YW5jZS5cbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VUaWNrZXRFdmVudERhdGVzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgdGlja2V0IGVudGl0eS4nXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCBldmVudERhdGVzID0gZ2V0UmVsYXRlZEVudGl0aWVzKCB0aWNrZXRFbnRpdHksICdkYXRldGltZScgKTtcblx0XHRjb25zdCBldmVudERhdGVzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgdGlja2V0RW50aXR5LCAnZGF0ZXRpbWUnIF1cblx0XHQpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRldmVudERhdGVzLFxuXHRcdFx0ZXZlbnREYXRlc0xvYWRlZCxcblx0XHR9O1xuXHR9LCBbIHRpY2tldEVudGl0eSBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUaWNrZXRFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHByaWNlczogW10sXG5cdHByaWNlc0xvYWRlZDogZmFsc2UsXG5cdG5vQmFzZVByaWNlOiBudWxsLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHByaWNlcyBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiB0aWNrZXQgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9ICB0aWNrZXRFbnRpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gICAgIC0gYW4gYXJyYXkgb2YgcHJpY2VzIGJlbG9uZ2luZyB0byB0aGUgZ2l2ZW4gdGlja2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICogICAgICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgYWJzZW5jZSBvZiBiYXNlIHByaWNlXG4gKi9cbmNvbnN0IHVzZVRpY2tldFByaWNlcyA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KFxuXHRcdCggc2VsZWN0ICkgPT4ge1xuXHRcdFx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdFx0XHRjb25zdCBwcmljZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoXG5cdFx0XHRcdFx0dGlja2V0RW50aXR5LFxuXHRcdFx0XHRcdCdwcmljZSdcblx0XHRcdFx0KTtcblx0XHRcdFx0Y29uc3QgcHJpY2VzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0XHRcdFsgdGlja2V0RW50aXR5LCAncHJpY2UnIF1cblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRwcmljZXMsXG5cdFx0XHRcdFx0cHJpY2VzTG9hZGVkLFxuXHRcdFx0XHRcdG5vQmFzZVByaWNlOiBwcmljZXNMb2FkZWQgJiYgaXNFbXB0eSggcHJpY2VzICksXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9LFxuXHRcdFsgdGlja2V0RW50aXR5IF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRpY2tldFByaWNlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0dGlja2V0RW50aXRpZXM6IFtdLFxuXHR0aWNrZXRFbnRpdGllc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzXG4gKiBmb3IgdGhlIGdpdmVuIGV2ZW50IGRhdGUgZW50aXRpZXMgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eVtdfSBkYXRlRW50aXRpZXMgIGFycmF5IG9mIGV2ZW50IGRhdGUgZW50aXRpZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGRhdGVFbnRpdGllc0xvYWRlZCAgdHJ1ZSBpZiBhbGwgZXZlbnQgZGF0ZXMgYXJlIGxvYWRlZFxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIGV2ZW50IGRhdGVzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZVRpY2tldHNGb3JFdmVudERhdGVzID0gKFxuXHRkYXRlRW50aXRpZXMgPSBbXSxcblx0ZGF0ZUVudGl0aWVzTG9hZGVkID0gdHJ1ZVxuKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGlmIChcblx0XHRcdCEgZGF0ZUVudGl0aWVzTG9hZGVkIHx8XG5cdFx0XHQhIEFycmF5LmlzQXJyYXkoIGRhdGVFbnRpdGllcyApIHx8XG5cdFx0XHRpc0VtcHR5KCBkYXRlRW50aXRpZXMgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IGRhdGVFbnRpdHlJZHMgPSBkYXRlRW50aXRpZXMubWFwKFxuXHRcdFx0KCBkYXRlRW50aXR5ICkgPT4gaXNNb2RlbEVudGl0eU9mTW9kZWwoIGRhdGVFbnRpdHksICdkYXRldGltZScgKSA/XG5cdFx0XHRcdGRhdGVFbnRpdHkuaWQgOlxuXHRcdFx0XHRudWxsXG5cdFx0KTtcblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllc0ZvcklkcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMoXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZGF0ZUVudGl0eUlkcyxcblx0XHRcdCd0aWNrZXQnXG5cdFx0KTtcblx0XHRjb25zdCBsb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMnLFxuXHRcdFx0WyAnZGF0ZXRpbWUnLCBkYXRlRW50aXR5SWRzLCAndGlja2V0JyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGlja2V0RW50aXRpZXM6IGVudGl0aWVzLFxuXHRcdFx0dGlja2V0RW50aXRpZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGRhdGVFbnRpdGllcywgZGF0ZUVudGl0aWVzTG9hZGVkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRpY2tldHNGb3JFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgeyBjb25maXJtIH0gPSB3aW5kb3c7XG5cbmNvbnN0IHVzZVRyYXNoRGF0ZUVudGl0eSA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRjb25zdCB7IHRyYXNoRW50aXR5QnlJZCB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBjbGljayApID0+IHtcblx0XHRjYW5jZWxDbGlja0V2ZW50KCBjbGljayApO1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICggISBjb25maXJtKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXZlbnQgZGF0ZT8nLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHQpXG5cdFx0KSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dHJhc2hFbnRpdHlCeUlkKCAnZGF0ZXRpbWUnLCBldmVudERhdGUuaWQgKTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVHJhc2hEYXRlRW50aXR5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIHVzZVRyYXNoUHJpY2VNb2RpZmllclxuICogcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHR3byBmdW5jdGlvbnM6XG4gKiAgLSBhZGRQcmljZU1vZGlmaWVyXG4gKiAgLSB0cmFzaFByaWNlTW9kaWZpZXJcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGZ1bmN0aW9uc1xuICovXG5jb25zdCB1c2VUcmFzaFByaWNlTW9kaWZpZXIgPSAoKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRyZW1vdmVSZWxhdGlvbkZvckVudGl0eSxcblx0XHR0cmFzaEVudGl0eUJ5SWQsXG5cdH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKFxuXHRcdGFzeW5jICggcHJpY2VNb2RpZmllciwgdGlja2V0RW50aXR5ICkgPT4ge1xuXHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBwcmljZU1vZGlmaWVyLCAncHJpY2UnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gcGVyZm9ybSBkZWxldGlvbiBiZWNhdXNlIGFuIGludmFsaWQgUHJpY2UnICtcblx0XHRcdFx0XHRcdCcgRW50aXR5IHdhcyBzdXBwbGllZCBieSB0aGUgVGlja2V0IFByaWNlIENhbGN1bGF0b3IuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZW1vdmVSZWxhdGlvbkZvckVudGl0eShcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldEVudGl0eS5pZCxcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0cHJpY2VNb2RpZmllci5pZFxuXHRcdFx0KTtcblx0XHRcdHRyYXNoRW50aXR5QnlJZCggJ3ByaWNlJywgcHJpY2VNb2RpZmllci5pZCApO1xuXHRcdH0sXG5cdFx0W11cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyYXNoUHJpY2VNb2RpZmllcjtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgeyBjb25maXJtIH0gPSB3aW5kb3c7XG5cbmNvbnN0IHVzZVRyYXNoVGlja2V0ID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdGNvbnN0IHsgdHJhc2hFbnRpdHlCeUlkIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXRFbnRpdHksICd0aWNrZXQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gcGVyZm9ybSBkZWxldGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQgYnkgdGhlIFRpY2tldCBQcmljZSBDYWxjdWxhdG9yLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIGNvbmZpcm0oXG5cdFx0XHRfXyhcblx0XHRcdFx0J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyB0aWNrZXQ/Jyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0KVxuXHRcdCkgKSB7XG5cdFx0XHR0cmFzaEVudGl0eUJ5SWQoICd0aWNrZXQnLCB0aWNrZXRFbnRpdHkuaWQgKTtcblx0XHR9XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyYXNoVGlja2V0O1xuIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wicmVnZW5lcmF0b3JSdW50aW1lXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widXRpbHNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWx1ZU9iamVjdHNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImRhdGFcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImVsZW1lbnRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
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
/*! exports provided: useAddPriceModifier, useBasePriceType, useCloneEntities, useCopyDateEntity, useCopyTicket, useCreateDateEntity, useCreateRelationForEventToEventDate, useCreateRelationsForEventDateToTickets, useCreateRelationsForEventDateIdToTicketIds, useCreateRelationsForTicketToEventDates, useCreateRelationsForTicketToPrices, useCreateTicketEntity, useEventDateEvent, useEventDateTickets, useEventDatesForEvent, useEventEditorEvent, useEventEditorEventDates, useEventEditorTickets, useEventForEventDate, useEventVenue, usePriceTypes, useRemoveRelationsForEventDateIdToTicketIds, useTicketEventDates, useTicketPrices, useTicketsForEventDates, useTrashDateEntity, useTrashPriceModifier, useTrashTicket */
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
/* harmony import */ var _use_create_relation_for_event_to_event_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-create-relation-for-event-to-event-date */ "./assets/src/hooks/use-create-relation-for-event-to-event-date.js");



/**
 * External imports
 */


/**
 * Internal dependencies
 */



var useCreateDateEntity = function useCreateDateEntity(event, cacheNewDate) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity;

  var updateEventDateRelation = Object(_use_create_relation_for_event_to_event_date__WEBPACK_IMPORTED_MODULE_4__["default"])();
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var newDate;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createEntity('datetime', {});

          case 2:
            newDate = _context.sent;
            _context.next = 5;
            return updateEventDateRelation(event, newDate);

          case 5:
            cacheNewDate(newDate);

          case 6:
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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-create-relations-for-ticket-to-prices */ "./assets/src/hooks/use-create-relations-for-ticket-to-prices.js");



/**
 * External imports
 */


/**
 * Internal dependencies
 */



var useCreateTicketEntity = function useCreateTicketEntity(cacheNewTicket, basePriceType) {
  var _useDispatch = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('eventespresso/core'),
      createEntity = _useDispatch.createEntity;

  var updateTicketPriceRelations = Object(_use_create_relations_for_ticket_to_prices__WEBPACK_IMPORTED_MODULE_4__["default"])();
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(
  /*#__PURE__*/
  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var newTicket, newBasePrice;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createEntity('ticket', {});

          case 2:
            newTicket = _context.sent;
            _context.next = 5;
            return createEntity('price', {
              PRT_ID: basePriceType.id
            });

          case 5:
            newBasePrice = _context.sent;
            _context.next = 8;
            return updateTicketPriceRelations(newTicket, [newBasePrice]);

          case 8:
            cacheNewTicket(newTicket);

          case 9:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhvb2tzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1hZGQtcHJpY2UtbW9kaWZpZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWJhc2UtcHJpY2UtdHlwZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY2xvbmUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtdGlja2V0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWVkaXRvci1ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZWRpdG9yLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWZvci1ldmVudC1kYXRlLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC12ZW51ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtcHJpY2UtdHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXJlbW92ZS1yZWxhdGlvbnMtZm9yLWV2ZW50LWRhdGUtaWQtdG8tdGlja2V0LWlkcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdGlja2V0LWV2ZW50LWRhdGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10aWNrZXQtcHJpY2VzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10aWNrZXRzLWZvci1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdHJhc2gtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRyYXNoLXByaWNlLW1vZGlmaWVyLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10cmFzaC10aWNrZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidXRpbHNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJkYXRhXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZWxlbWVudFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iXSwibmFtZXMiOlsidXNlQWRkUHJpY2VNb2RpZmllciIsInVzZURpc3BhdGNoIiwiY3JlYXRlRW50aXR5IiwiY3JlYXRlUmVsYXRpb24iLCJ1c2VDYWxsYmFjayIsInRpY2tldEVudGl0eSIsInByb3BlcnRpZXMiLCJwcmljZU1vZGlmaWVyIiwiaXNNb2RlbEVudGl0eU9mTW9kZWwiLCJpZCIsInVzZUJhc2VQcmljZVR5cGUiLCJ1c2VQcmljZVR5cGVzIiwicHJpY2VUeXBlcyIsInByaWNlVHlwZXNMb2FkZWQiLCJ1c2VNZW1vIiwiZmluZCIsInByaWNlVHlwZSIsInBidElkIiwidXNlQ2xvbmVFbnRpdGllcyIsImVudGl0aWVzVG9DbG9uZSIsIm1vZGVsTmFtZSIsIm5ld0VudGl0aWVzIiwiaSIsImxlbmd0aCIsImZvckNsb25lIiwibmV3Q2xvbmUiLCJwdXNoIiwidXNlQ29weURhdGVFbnRpdHkiLCJldmVudERhdGUiLCJjcmVhdGVSZWxhdGlvbnMiLCJ1c2VFdmVudEVkaXRvckV2ZW50IiwiZXZ0SWQiLCJldmVudEVudGl0eSIsInVzZVRpY2tldHNGb3JFdmVudERhdGVzIiwidGlja2V0RW50aXRpZXMiLCJjbGljayIsImNhbmNlbENsaWNrRXZlbnQiLCJuZXdFdmVudERhdGUiLCJuYW1lIiwic3ByaW50ZiIsIl94IiwiaXNFbXB0eSIsImZhbHNlRnVuYyIsInVzZUNvcHlUaWNrZXQiLCJkYXRlRW50aXRpZXMiLCJyZWxhdGVkUHJpY2VzIiwidXNlU2VsZWN0Iiwic2VsZWN0IiwiZ2V0UmVsYXRlZEVudGl0aWVzIiwibmV3UHJpY2VzIiwidXBkYXRlVGlja2V0RGF0ZVJlbGF0aW9ucyIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcyIsInVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zIiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXMiLCJuZXdUaWNrZXQiLCJBcnJheSIsImlzQXJyYXkiLCJ1c2VDcmVhdGVEYXRlRW50aXR5IiwiZXZlbnQiLCJjYWNoZU5ld0RhdGUiLCJ1cGRhdGVFdmVudERhdGVSZWxhdGlvbiIsInVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSIsIm5ld0RhdGUiLCJkYXRlRW50aXR5IiwiRXJyb3IiLCJfXyIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJnZXRFbnRpdGllc0J5SWRzIiwiZXZlbnREYXRlSWQiLCJ0aWNrZXRJZHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRpY2tldHMiLCJmb3JFYWNoIiwidGlja2V0IiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzIiwiZXZlbnREYXRlcyIsInByaWNlcyIsInByaWNlIiwidXNlQ3JlYXRlVGlja2V0RW50aXR5IiwiY2FjaGVOZXdUaWNrZXQiLCJiYXNlUHJpY2VUeXBlIiwiUFJUX0lEIiwibmV3QmFzZVByaWNlIiwiREVGQVVMVCIsImV2ZW50TG9hZGVkIiwidXNlRXZlbnREYXRlRXZlbnQiLCJ3YXJuaW5nIiwiaGFzRmluaXNoZWRSZXNvbHV0aW9uIiwidGlja2V0c0xvYWRlZCIsInVzZUV2ZW50RGF0ZVRpY2tldHMiLCJkYXRlRW50aXRpZXNMb2FkZWQiLCJ1c2VFdmVudERhdGVzRm9yRXZlbnQiLCJlbnRpdGllcyIsImxvYWRlZCIsImV2ZW50RGF0ZXNMb2FkZWQiLCJ1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXMiLCJnZXRFbnRpdGllc0Zvck1vZGVsIiwiZXZlbnRJZCIsImVudGl0eSIsImdldEV2ZW50cyIsImdldEV2ZW50QnlJZCIsImV2ZW50RW50aXR5TG9hZGVkIiwidXNlRXZlbnRFZGl0b3JUaWNrZXRzIiwidXNlRXZlbnRGb3JFdmVudERhdGUiLCJ2ZW51ZUVudGl0eSIsInZlbnVlRW50aXR5TG9hZGVkIiwidXNlRXZlbnRWZW51ZSIsImdldEVudGl0aWVzIiwidXNlUmVtb3ZlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcyIsInJlbW92ZVJlbGF0aW9uRm9yRW50aXR5IiwidGlja2V0SWQiLCJ1c2VUaWNrZXRFdmVudERhdGVzIiwicHJpY2VzTG9hZGVkIiwibm9CYXNlUHJpY2UiLCJ1c2VUaWNrZXRQcmljZXMiLCJ0aWNrZXRFbnRpdGllc0xvYWRlZCIsImRhdGVFbnRpdHlJZHMiLCJtYXAiLCJnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMiLCJ3aW5kb3ciLCJjb25maXJtIiwidXNlVHJhc2hEYXRlRW50aXR5IiwidHJhc2hFbnRpdHlCeUlkIiwidXNlVHJhc2hQcmljZU1vZGlmaWVyIiwidXNlVHJhc2hUaWNrZXQiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsbUM7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsYUFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzdEQSxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEsdUNBQXVDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSx3Q0FBd0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F2RCxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1ob29rcy4xMmM3ZjIwODAxZDE1MjNhMzg1ZS5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VBZGRQcmljZU1vZGlmaWVyIH0gZnJvbSAnLi91c2UtYWRkLXByaWNlLW1vZGlmaWVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQmFzZVByaWNlVHlwZSB9IGZyb20gJy4vdXNlLWJhc2UtcHJpY2UtdHlwZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNsb25lRW50aXRpZXMgfSBmcm9tICcuL3VzZS1jbG9uZS1lbnRpdGllcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNvcHlEYXRlRW50aXR5IH0gZnJvbSAnLi91c2UtY29weS1kYXRlLWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNvcHlUaWNrZXQgfSBmcm9tICcuL3VzZS1jb3B5LXRpY2tldCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZURhdGVFbnRpdHkgfSBmcm9tICcuL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGUgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb24tZm9yLWV2ZW50LXRvLWV2ZW50LWRhdGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVUb1RpY2tldHMgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLWV2ZW50LWRhdGVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXMgfVxuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlVGlja2V0RW50aXR5IH0gZnJvbSAnLi91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudERhdGVFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWRhdGUtZXZlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudERhdGVUaWNrZXRzIH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZS10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlc0ZvckV2ZW50IH0gZnJvbSAnLi91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRFZGl0b3JFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yVGlja2V0cyB9IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnRGb3JFdmVudERhdGUgfSBmcm9tICcuL3VzZS1ldmVudC1mb3ItZXZlbnQtZGF0ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50VmVudWUgfSBmcm9tICcuL3VzZS1ldmVudC12ZW51ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVByaWNlVHlwZXMgfSBmcm9tICcuL3VzZS1wcmljZS10eXBlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgfVxuXHRmcm9tICcuL3VzZS1yZW1vdmUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUaWNrZXRFdmVudERhdGVzIH0gZnJvbSAnLi91c2UtdGlja2V0LWV2ZW50LWRhdGVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVGlja2V0UHJpY2VzIH0gZnJvbSAnLi91c2UtdGlja2V0LXByaWNlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRpY2tldHNGb3JFdmVudERhdGVzIH1cblx0ZnJvbSAnLi91c2UtdGlja2V0cy1mb3ItZXZlbnQtZGF0ZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUcmFzaERhdGVFbnRpdHkgfSBmcm9tICcuL3VzZS10cmFzaC1kYXRlLWVudGl0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRyYXNoUHJpY2VNb2RpZmllciB9IGZyb20gJy4vdXNlLXRyYXNoLXByaWNlLW1vZGlmaWVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVHJhc2hUaWNrZXQgfSBmcm9tICcuL3VzZS10cmFzaC10aWNrZXQnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogdXNlQWRkUHJpY2VNb2RpZmllclxuICogcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHR3byBmdW5jdGlvbnM6XG4gKiAgLSBhZGRQcmljZU1vZGlmaWVyXG4gKiAgLSB0cmFzaFByaWNlTW9kaWZpZXJcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGZ1bmN0aW9uc1xuICovXG5jb25zdCB1c2VBZGRQcmljZU1vZGlmaWVyID0gKCkgPT4ge1xuXHRjb25zdCB7XG5cdFx0Y3JlYXRlRW50aXR5LFxuXHRcdGNyZWF0ZVJlbGF0aW9uLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoIHRpY2tldEVudGl0eSwgcHJvcGVydGllcyApID0+IHtcblx0XHRcdGNvbnN0IHByaWNlTW9kaWZpZXIgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdCdwcmljZScsXG5cdFx0XHRcdHByb3BlcnRpZXNcblx0XHRcdCk7XG5cdFx0XHRpZiAoIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBwcmljZU1vZGlmaWVyLCAncHJpY2UnICkgKSB7XG5cdFx0XHRcdGNyZWF0ZVJlbGF0aW9uKFxuXHRcdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHRcdHRpY2tldEVudGl0eS5pZCxcblx0XHRcdFx0XHQncHJpY2UnLFxuXHRcdFx0XHRcdHByaWNlTW9kaWZpZXJcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdFtdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VBZGRQcmljZU1vZGlmaWVyO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgZmluZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHVzZVByaWNlVHlwZXMgZnJvbSAnLi91c2UtcHJpY2UtdHlwZXMnO1xuXG5jb25zdCB1c2VCYXNlUHJpY2VUeXBlID0gKCkgPT4ge1xuXHRjb25zdCB7IHByaWNlVHlwZXMsIHByaWNlVHlwZXNMb2FkZWQgfSA9IHVzZVByaWNlVHlwZXMoKTtcblx0cmV0dXJuIHVzZU1lbW8oXG5cdFx0KCkgPT4ge1xuXHRcdFx0aWYgKCAhIHByaWNlVHlwZXNMb2FkZWQgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpbmQoXG5cdFx0XHRcdHByaWNlVHlwZXMsXG5cdFx0XHRcdCggcHJpY2VUeXBlICkgPT4gcHJpY2VUeXBlLnBidElkID09PSAxXG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0WyBwcmljZVR5cGVzLCBwcmljZVR5cGVzTG9hZGVkIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUJhc2VQcmljZVR5cGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG5jb25zdCB1c2VDbG9uZUVudGl0aWVzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBlbnRpdGllc1RvQ2xvbmUsIG1vZGVsTmFtZSApID0+IHtcblx0XHRjb25zdCBuZXdFbnRpdGllcyA9IFtdO1xuXHRcdGlmICggZW50aXRpZXNUb0Nsb25lICYmIG1vZGVsTmFtZSApIHtcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGVudGl0aWVzVG9DbG9uZS5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0Y29uc3QgbmV3Q2xvbmUgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0XHRcdGVudGl0aWVzVG9DbG9uZVsgaSBdLmZvckNsb25lXG5cdFx0XHRcdCk7XG5cdFx0XHRcdG5ld0VudGl0aWVzLnB1c2goIG5ld0Nsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBuZXdFbnRpdGllcztcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ2xvbmVFbnRpdGllcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBfeCwgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZUV2ZW50RWRpdG9yRXZlbnQsIHVzZVRpY2tldHNGb3JFdmVudERhdGVzIH0gZnJvbSAnLi9pbmRleCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZVxuICogQHJldHVybiB7RnVuY3Rpb259IGZ1bmN0aW9uIGZvciBjb3B5aW5nIGFuIGV2ZW50IGRhdGUgZW50aXR5XG4gKi9cbmNvbnN0IHVzZUNvcHlEYXRlRW50aXR5ID0gKCBldmVudERhdGUgKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRjcmVhdGVFbnRpdHksXG5cdFx0Y3JlYXRlUmVsYXRpb25zLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHsgZXZlbnRFbnRpdHkgfSA9IHVzZUV2ZW50RWRpdG9yRXZlbnQoIGV2ZW50RGF0ZS5ldnRJZCApO1xuXHRjb25zdCB7IHRpY2tldEVudGl0aWVzIH0gPSB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyggWyBldmVudERhdGUgXSApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2sgKTtcblx0XHRpZiAoXG5cdFx0XHQhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudEVudGl0eSwgJ2V2ZW50JyApIHx8XG5cdFx0XHQhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3RXZlbnREYXRlID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGV2ZW50RGF0ZS5mb3JDbG9uZVxuXHRcdCk7XG5cdFx0bmV3RXZlbnREYXRlLm5hbWUgPSBzcHJpbnRmKFxuXHRcdFx0X3goICclcyAtIENPUFknLCAnRXZlbnQgRGF0ZSBOYW1lIC0gQ09QWScsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdG5ld0V2ZW50RGF0ZS5uYW1lXG5cdFx0KTtcblx0XHRpZiAoICEgaXNFbXB0eSggdGlja2V0RW50aXRpZXMgKSApIHtcblx0XHRcdGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0bmV3RXZlbnREYXRlLmlkLFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0dGlja2V0RW50aXRpZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCdldmVudCcsXG5cdFx0XHRldmVudEVudGl0eS5pZCxcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRbIG5ld0V2ZW50RGF0ZSBdXG5cdFx0KTtcblx0XHRyZXR1cm4gbmV3RXZlbnREYXRlO1xuXHR9LCBbIGV2ZW50RW50aXR5LCB0aWNrZXRFbnRpdGllcyBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDb3B5RGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDbG9uZUVudGl0aWVzIGZyb20gJy4vdXNlLWNsb25lLWVudGl0aWVzJztcbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLWV2ZW50LWRhdGVzJztcbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlc1xuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcblxuY29uc3QgZmFsc2VGdW5jID0gKCkgPT4gZmFsc2U7XG5cbmNvbnN0IHVzZUNvcHlUaWNrZXQgPSAoIHRpY2tldEVudGl0eSwgZGF0ZUVudGl0aWVzICkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHJlbGF0ZWRQcmljZXMgPSB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0cmV0dXJuIGdldFJlbGF0ZWRFbnRpdGllcyggdGlja2V0RW50aXR5LCAncHJpY2VzJyApO1xuXHR9LCBbIHRpY2tldEVudGl0eSBdICk7XG5cdGNvbnN0IG5ld1ByaWNlcyA9IHVzZUNsb25lRW50aXRpZXMoIHJlbGF0ZWRQcmljZXMsICdwcmljZScgKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0RGF0ZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcygpO1xuXHRjb25zdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzKCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlRnVuYztcblx0XHR9XG5cdFx0cmV0dXJuIGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IG5ld1RpY2tldCA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldEVudGl0eS5mb3JDbG9uZVxuXHRcdFx0KTtcblx0XHRcdHVwZGF0ZVRpY2tldERhdGVSZWxhdGlvbnMoIG5ld1RpY2tldCwgZGF0ZUVudGl0aWVzICk7XG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIG5ld1ByaWNlcyApICYmIG5ld1ByaWNlcy5sZW5ndGggKSB7XG5cdFx0XHRcdGF3YWl0IHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zKCBuZXdUaWNrZXQsIG5ld1ByaWNlcyApO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNvcHlUaWNrZXQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlXG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZSc7XG5cbmNvbnN0IHVzZUNyZWF0ZURhdGVFbnRpdHkgPSAoIGV2ZW50LCBjYWNoZU5ld0RhdGUgKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgdXBkYXRlRXZlbnREYXRlUmVsYXRpb24gPSB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGUoKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKFxuXHRcdGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IG5ld0RhdGUgPSBhd2FpdCBjcmVhdGVFbnRpdHkoICdkYXRldGltZScsIHt9ICk7XG5cdFx0XHRhd2FpdCB1cGRhdGVFdmVudERhdGVSZWxhdGlvbiggZXZlbnQsIG5ld0RhdGUgKTtcblx0XHRcdGNhY2hlTmV3RGF0ZSggbmV3RGF0ZSApO1xuXHRcdH0sXG5cdFx0WyBldmVudCwgY2FjaGVOZXdEYXRlIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZURhdGVFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogVGhpcyBjdXN0b20gaG9vayByZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZ1xuICogYW4gZXZlbnQgLT4gZGF0ZSByZWxhdGlvbiBiZXR3ZWVuIHRoZSBldmVudCBlbnRpdHkgYW5kIGRhdGUgZW50aXR5LlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudCBlbnRpdHlcbiAqICAtICBldmVudCBkYXRlIGVudGl0eVxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIGV2ZW50IGRhdGUgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbiB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBldmVudEVudGl0eSwgZGF0ZUVudGl0eSApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RW50aXR5LCAnZXZlbnQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBFdmVudCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGRhdGVFbnRpdHksICdkYXRldGltZScgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIERhdGUgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGNyZWF0ZVJlbGF0aW9uKFxuXHRcdFx0J2V2ZW50Jyxcblx0XHRcdGV2ZW50RW50aXR5LmlkLFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGRhdGVFbnRpdHlcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYW4gZXZlbnQgZGF0ZSBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHRpY2tldCBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnREYXRlSWQgSUQgZm9yIGV2ZW50IGRhdGUgZW50aXR5XG4gKiAgLSAgdGlja2V0SWRzIGFycmF5IG9mIHRpY2tldCBlbnRpdHkgSURzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9ucyB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHsgZ2V0RW50aXRpZXNCeUlkcyB9ID0gdXNlU2VsZWN0KFxuXHRcdCggc2VsZWN0ICkgPT4gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApLFxuXHRcdFtdXG5cdCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBldmVudERhdGVJZCwgdGlja2V0SWRzICkgPT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggYXN5bmMgKCByZXNvbHZlICkgPT4ge1xuXHRcdFx0bGV0IHRpY2tldHMgPSBhd2FpdCBnZXRFbnRpdGllc0J5SWRzKCAndGlja2V0JywgdGlja2V0SWRzICk7XG5cdFx0XHR0aWNrZXRzID0gQXJyYXkuaXNBcnJheSggdGlja2V0cyApID8gdGlja2V0cyA6IFsgdGlja2V0cyBdO1xuXHRcdFx0dGlja2V0cy5mb3JFYWNoKCAoIHRpY2tldCApID0+IHtcblx0XHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXQsICd0aWNrZXQnICkgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdFx0YXdhaXQgY3JlYXRlUmVsYXRpb25zKFxuXHRcdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0XHRldmVudERhdGVJZCxcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldHMsXG5cdFx0XHQpO1xuXHRcdFx0cmVzb2x2ZSggdHJ1ZSApO1xuXHRcdH0gKTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYW4gZXZlbnQgZGF0ZSBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHRpY2tldCBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnREYXRlIGVudGl0eVxuICogIC0gIHRpY2tldHMgYXJyYXkgb2YgdGlja2V0IGVudGl0aWVzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVUb1RpY2tldHMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGV2ZW50RGF0ZSwgdGlja2V0cyApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRXZlbnQgRGF0ZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR0aWNrZXRzID0gQXJyYXkuaXNBcnJheSggdGlja2V0cyApID8gdGlja2V0cyA6IFsgdGlja2V0cyBdO1xuXHRcdHRpY2tldHMuZm9yRWFjaCggKCB0aWNrZXQgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZXZlbnREYXRlLFxuXHRcdFx0J3RpY2tldCcsXG5cdFx0XHR0aWNrZXRzLFxuXHRcdCk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZVRvVGlja2V0cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciB1cGRhdGluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYSB0aWNrZXQgZW50aXR5IGFuZCBvbmUgb3IgbW9yZSBldmVudCBkYXRlIGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICB0aWNrZXQgZW50aXR5XG4gKiAgLSAgZXZlbnREYXRlcyBhcnJheSBvZiBldmVudCBkYXRlIGVudGl0aWVzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIHRpY2tldCwgZXZlbnREYXRlcyApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRldmVudERhdGVzID0gQXJyYXkuaXNBcnJheSggZXZlbnREYXRlcyApID8gZXZlbnREYXRlcyA6IFsgZXZlbnREYXRlcyBdO1xuXHRcdGV2ZW50RGF0ZXMuZm9yRWFjaCggKCBldmVudERhdGUgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRXZlbnQgRGF0ZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldC5pZCxcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRldmVudERhdGVzXG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9FdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhIHRpY2tldCBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHByaWNlIGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICB0aWNrZXQgZW50aXR5XG4gKiAgLSAgcHJpY2VzIGFycmF5IG9mIHByaWNlIGVudGl0aWVzXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggdGlja2V0LCBwcmljZXMgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXQsICd0aWNrZXQnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cHJpY2VzID0gQXJyYXkuaXNBcnJheSggcHJpY2VzICkgPyBwcmljZXMgOiBbIHByaWNlcyBdO1xuXHRcdHByaWNlcy5mb3JFYWNoKCAoIHByaWNlICkgPT4ge1xuXHRcdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBwcmljZSwgJ3ByaWNlJyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgUHJpY2UgRW50aXR5IHdhcyBzdXBwbGllZC4nLFxuXHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0YXdhaXQgY3JlYXRlUmVsYXRpb25zKFxuXHRcdFx0J3RpY2tldCcsXG5cdFx0XHR0aWNrZXQuaWQsXG5cdFx0XHQncHJpY2UnLFxuXHRcdFx0cHJpY2VzXG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5cbmNvbnN0IHVzZUNyZWF0ZVRpY2tldEVudGl0eSA9ICggY2FjaGVOZXdUaWNrZXQsIGJhc2VQcmljZVR5cGUgKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcygpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3VGlja2V0ID0gYXdhaXQgY3JlYXRlRW50aXR5KCAndGlja2V0Jywge30gKTtcblx0XHRcdGNvbnN0IG5ld0Jhc2VQcmljZSA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0eyBQUlRfSUQ6IGJhc2VQcmljZVR5cGUuaWQgfVxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zKCBuZXdUaWNrZXQsIFsgbmV3QmFzZVByaWNlIF0gKTtcblx0XHRcdGNhY2hlTmV3VGlja2V0KCBuZXdUaWNrZXQgKTtcblx0XHR9LFxuXHRcdFsgY3JlYXRlRW50aXR5LCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVUaWNrZXRFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdGV2ZW50OiBbXSxcblx0ZXZlbnRMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIGV2ZW50IGVudGl0eVxuICogZm9yIHRoZSBnaXZlbiBkYXRlIGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgIGFuIGV2ZW50IGRhdGUgZW50aXR5XG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGV2ZW50IGZvciB0aGUgc3VwcGxpZWQgZXZlbnQgZGF0ZVxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudERhdGVFdmVudCA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWUgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGxldCBldmVudCA9IGdldFJlbGF0ZWRFbnRpdGllcyggZXZlbnREYXRlLCAnZXZlbnQnICk7XG5cdFx0Y29uc3QgZXZlbnRMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnREYXRlLCAnZXZlbnQnIF1cblx0XHQpO1xuXHRcdGlmICggZXZlbnRMb2FkZWQgKSB7XG5cdFx0XHRldmVudCA9IEFycmF5LmlzQXJyYXkoIGV2ZW50ICkgJiYgZXZlbnRbIDAgXSAmJlxuXHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50WyAwIF0sICdldmVudCcgKSA/XG5cdFx0XHRcdGV2ZW50WyAwIF0gOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXZlbnQsXG5cdFx0XHRcdGV2ZW50TG9hZGVkLFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIERFRkFVTFQ7XG5cdH0sIFsgZXZlbnREYXRlIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZUV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHR0aWNrZXRzOiBbXSxcblx0dGlja2V0c0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzIGZvciB0aGUgZ2l2ZW5cbiAqIGRhdGUgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZSAgQSBkYXRldGltZSBCYXNlRW50aXR5IGluc3RhbmNlLlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHRpY2tldHNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlVGlja2V0cyA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWUgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IHRpY2tldHMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50RGF0ZSwgJ3RpY2tldCcgKTtcblx0XHRjb25zdCB0aWNrZXRzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnREYXRlLCAndGlja2V0JyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGlja2V0cyxcblx0XHRcdHRpY2tldHNMb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudERhdGUgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnREYXRlVGlja2V0cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7IGRhdGVFbnRpdGllczogW10sIGRhdGVFbnRpdGllc0xvYWRlZDogZmFsc2UgfTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiBldmVudCBkYXRlIGVudGl0aWVzIGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlc0ZvckV2ZW50ID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50LCAnZGF0ZXRpbWUnLCAnZXZlbnQnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnQsICdkYXRldGltZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGVFbnRpdGllczogZW50aXRpZXMsXG5cdFx0XHRkYXRlRW50aXRpZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGV2ZW50IF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZXNGb3JFdmVudDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRldmVudERhdGVzOiBbXSxcblx0ZXZlbnREYXRlc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyBhbGwgdGhlIGRhdGUgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZCAgIHRydWUgaWYgZXZlbnQgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXMgPSAoIGV2ZW50TG9hZGVkID0gdHJ1ZSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGV2ZW50TG9hZGVkICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0RW50aXRpZXNGb3JNb2RlbCB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IGV2ZW50RGF0ZXMgPSBnZXRFbnRpdGllc0Zvck1vZGVsKCAnZGF0ZXRpbWUnICk7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoIGV2ZW50RGF0ZXMgKSAmJiBldmVudERhdGVzLmxlbmd0aCA/XG5cdFx0XHR7XG5cdFx0XHRcdGV2ZW50RGF0ZXMsXG5cdFx0XHRcdGV2ZW50RGF0ZXNMb2FkZWQ6IHRydWUsXG5cdFx0XHR9IDpcblx0XHRcdERFRkFVTFQ7XG5cdH0sIFsgZXZlbnRMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgYW4gZXZlbnQgdmlhIHRoZSBzdXBwbGllZCBJRFxuICogaWYgbm8gSUQgaXMgc3VwcGxpZWQsIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBldmVudCBpbiB0aGUgc3RvcmVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAgIGV2ZW50IGVudGl0eSBJRFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBlbnRpdHkgZm9yIHRoZSBzdXBwbGllZCBJRFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50ID0gKCBldmVudElkID0gMCApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0bGV0IGVudGl0eTtcblx0XHRpZiAoIGV2ZW50SWQgPT09IDAgKSB7XG5cdFx0XHRjb25zdCB7IGdldEV2ZW50cyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0ZW50aXR5ID0gZ2V0RXZlbnRzKCBldmVudElkICk7XG5cdFx0XHRlbnRpdHkgPSBBcnJheS5pc0FycmF5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIDAgXSA/XG5cdFx0XHRcdGVudGl0eVsgMCBdIDpcblx0XHRcdFx0bnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgeyBnZXRFdmVudEJ5SWQgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRcdGVudGl0eSA9IGdldEV2ZW50QnlJZCggZXZlbnRJZCApO1xuXHRcdH1cblx0XHRjb25zdCBsb2FkZWQgPSBpc01vZGVsRW50aXR5T2ZNb2RlbCggZW50aXR5LCAnZXZlbnQnICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGV2ZW50RW50aXR5OiBlbnRpdHksXG5cdFx0XHRldmVudEVudGl0eUxvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnRJZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEVkaXRvckV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIGFsbCB0aGUgdGlja2V0IGVudGl0aWVzXG4gKiBjdXJyZW50bHkgaW4gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBkYXRhIHN0b3JlLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiB0aWNrZXRzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RWRpdG9yVGlja2V0cyA9ICgpID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRFbnRpdGllc0Zvck1vZGVsIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgdGlja2V0cyA9IGdldEVudGl0aWVzRm9yTW9kZWwoICd0aWNrZXQnICk7XG5cdFx0cmV0dXJuIHsgdGlja2V0cyB9O1xuXHR9LCBbXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JUaWNrZXRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB1c2VFdmVudEVkaXRvckV2ZW50IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIHRoZSBldmVudCBmb3IgdGhlIHN1cHBsaWVkIGV2ZW50IGRhdGVcbiAqIHdpbGwgZGVmYXVsdCB0byB0aGUgY3VycmVudGx5IGxvYWRlZCBldmVudCBmb3IgdGhlIGVkaXRvclxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZXZlbnREYXRlICAgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgZXZlbnQgZW50aXR5IGZvciB0aGUgc3VwcGxpZWQgSURcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnRGb3JFdmVudERhdGUgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0Y29uc3QgZXZlbnRJZCA9IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSA/XG5cdFx0ZXZlbnREYXRlLmV2dElkIDpcblx0XHQwO1xuXHRyZXR1cm4gdXNlRXZlbnRFZGl0b3JFdmVudCggZXZlbnRJZCApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRGb3JFdmVudERhdGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHZlbnVlRW50aXR5OiBudWxsLFxuXHR2ZW51ZUVudGl0eUxvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHZlbnVlIHJlbGF0ZWQgdG8gdGhlIGdpdmVuIGV2ZW50XG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudCAgQW4gaW5zdGFuY2Ugb2YgYW4gZXZlbnQgZW50aXR5LlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSB2ZW51ZSBlbnRpdHkgZm9yIHRoZSBwcm92aWRlZCBldmVudFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudFZlbnVlID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7XG5cdFx0XHRnZXRSZWxhdGVkRW50aXRpZXMsXG5cdFx0XHRoYXNGaW5pc2hlZFJlc29sdXRpb24sXG5cdFx0fSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRsZXQgZW50aXR5ID0gZ2V0UmVsYXRlZEVudGl0aWVzKCBldmVudCwgJ3ZlbnVlJyApO1xuXHRcdGNvbnN0IGxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyBldmVudCwgJ3ZlbnVlJyBdXG5cdFx0KTtcblx0XHRlbnRpdHkgPSBBcnJheS5pc0FycmF5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIDAgXSAmJlxuXHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBlbnRpdHlbIDAgXSwgJ3ZlbnVlJyApID9cblx0XHRcdGVudGl0eVsgMCBdIDpcblx0XHRcdG51bGw7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZlbnVlRW50aXR5OiBlbnRpdHksXG5cdFx0XHR2ZW51ZUVudGl0eUxvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnQsIGV2ZW50TG9hZGVkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50VmVudWU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBBIGhvb2sgZm9yIHJldHJpZXZpbmcgYWxsIHRoZSBwcmljZV90eXBlIGVudGl0aWVzXG4gKiBjdXJyZW50bHkgaW4gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBkYXRhIHN0b3JlLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBwcmljZSB0eXBlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VQcmljZVR5cGVzID0gKCkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRjb25zdCB7IGdldEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2xpc3RzJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRFbnRpdGllcyggJ3ByaWNlX3R5cGUnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vbGlzdHMnLFxuXHRcdFx0J2dldEVudGl0aWVzJyxcblx0XHRcdFsgJ3ByaWNlX3R5cGUnIF1cblx0XHQpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRwcmljZVR5cGVzOiBlbnRpdGllcyxcblx0XHRcdHByaWNlVHlwZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlUHJpY2VUeXBlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgcmVtb3ZpbmcgcmVsYXRpb25zXG4gKiBiZXR3ZWVuIGFuIGV2ZW50IGRhdGUgZW50aXR5IGFuZCBvbmUgb3IgbW9yZSB0aWNrZXQgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIGV2ZW50RGF0ZUlkIElEIGZvciBldmVudCBkYXRlIGVudGl0eVxuICogIC0gIHRpY2tldElkcyBhcnJheSBvZiB0aWNrZXQgZW50aXR5IElEc1xuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgQSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgdGhlIHRpY2tldCByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlUmVtb3ZlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcyA9ICgpID0+IHtcblx0Y29uc3QgeyByZW1vdmVSZWxhdGlvbkZvckVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggKCBldmVudERhdGVJZCwgdGlja2V0SWRzICkgPT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlICkgPT4ge1xuXHRcdFx0dGlja2V0SWRzLmZvckVhY2goIGFzeW5jICggdGlja2V0SWQgKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHJlbW92ZVJlbGF0aW9uRm9yRW50aXR5KFxuXHRcdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdFx0ZXZlbnREYXRlSWQsXG5cdFx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdFx0dGlja2V0SWQsXG5cdFx0XHRcdCk7XG5cdFx0XHR9ICk7XG5cdFx0XHRyZXNvbHZlKCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VSZW1vdmVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRldmVudERhdGVzOiBbXSxcblx0ZXZlbnREYXRlc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgZXZlbnQgZGF0ZSBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiB0aWNrZXQgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IHRpY2tldEVudGl0eSAgQSBkYXRldGltZSBCYXNlRW50aXR5IGluc3RhbmNlLlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIGV2ZW50IGRhdGVzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZVRpY2tldEV2ZW50RGF0ZXMgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXRFbnRpdHksICd0aWNrZXQnICkgKSB7XG5cdFx0XHR3YXJuaW5nKFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYSB2YWxpZCB0aWNrZXQgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IGV2ZW50RGF0ZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIHRpY2tldEVudGl0eSwgJ2RhdGV0aW1lJyApO1xuXHRcdGNvbnN0IGV2ZW50RGF0ZXNMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyB0aWNrZXRFbnRpdHksICdkYXRldGltZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGV2ZW50RGF0ZXMsXG5cdFx0XHRldmVudERhdGVzTG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgdGlja2V0RW50aXR5IF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRpY2tldEV2ZW50RGF0ZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuY29uc3QgREVGQVVMVCA9IHtcblx0cHJpY2VzOiBbXSxcblx0cHJpY2VzTG9hZGVkOiBmYWxzZSxcblx0bm9CYXNlUHJpY2U6IG51bGwsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgcHJpY2VzIGVudGl0aWVzXG4gKiBmb3IgdGhlIGdpdmVuIHRpY2tldCBlbnRpdHkgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gIHRpY2tldEVudGl0eVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgLSBhbiBhcnJheSBvZiBwcmljZXMgYmVsb25naW5nIHRvIHRoZSBnaXZlbiB0aWNrZXRcbiAqICAgICAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBhYnNlbmNlIG9mIGJhc2UgcHJpY2VcbiAqL1xuY29uc3QgdXNlVGlja2V0UHJpY2VzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoXG5cdFx0KCBzZWxlY3QgKSA9PiB7XG5cdFx0XHRpZiAoIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXRFbnRpdHksICd0aWNrZXQnICkgKSB7XG5cdFx0XHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0XHRcdGNvbnN0IHByaWNlcyA9IGdldFJlbGF0ZWRFbnRpdGllcyhcblx0XHRcdFx0XHR0aWNrZXRFbnRpdHksXG5cdFx0XHRcdFx0J3ByaWNlJ1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCBwcmljZXNMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRcdFx0WyB0aWNrZXRFbnRpdHksICdwcmljZScgXVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHByaWNlcyxcblx0XHRcdFx0XHRwcmljZXNMb2FkZWQsXG5cdFx0XHRcdFx0bm9CYXNlUHJpY2U6IHByaWNlc0xvYWRlZCAmJiBpc0VtcHR5KCBwcmljZXMgKSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH0sXG5cdFx0WyB0aWNrZXRFbnRpdHkgXVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVGlja2V0UHJpY2VzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHR0aWNrZXRFbnRpdGllczogW10sXG5cdHRpY2tldEVudGl0aWVzTG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCB0aWNrZXQgZW50aXRpZXNcbiAqIGZvciB0aGUgZ2l2ZW4gZXZlbnQgZGF0ZSBlbnRpdGllcyBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5W119IGRhdGVFbnRpdGllcyAgYXJyYXkgb2YgZXZlbnQgZGF0ZSBlbnRpdGllcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZGF0ZUVudGl0aWVzTG9hZGVkICB0cnVlIGlmIGFsbCBldmVudCBkYXRlcyBhcmUgbG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlVGlja2V0c0ZvckV2ZW50RGF0ZXMgPSAoXG5cdGRhdGVFbnRpdGllcyA9IFtdLFxuXHRkYXRlRW50aXRpZXNMb2FkZWQgPSB0cnVlXG4pID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKFxuXHRcdFx0ISBkYXRlRW50aXRpZXNMb2FkZWQgfHxcblx0XHRcdCEgQXJyYXkuaXNBcnJheSggZGF0ZUVudGl0aWVzICkgfHxcblx0XHRcdGlzRW1wdHkoIGRhdGVFbnRpdGllcyApXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgZGF0ZUVudGl0eUlkcyA9IGRhdGVFbnRpdGllcy5tYXAoXG5cdFx0XHQoIGRhdGVFbnRpdHkgKSA9PiBpc01vZGVsRW50aXR5T2ZNb2RlbCggZGF0ZUVudGl0eSwgJ2RhdGV0aW1lJyApID9cblx0XHRcdFx0ZGF0ZUVudGl0eS5pZCA6XG5cdFx0XHRcdG51bGxcblx0XHQpO1xuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCBlbnRpdGllcyA9IGdldFJlbGF0ZWRFbnRpdGllc0Zvcklkcyhcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRkYXRlRW50aXR5SWRzLFxuXHRcdFx0J3RpY2tldCdcblx0XHQpO1xuXHRcdGNvbnN0IGxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllc0ZvcklkcycsXG5cdFx0XHRbICdkYXRldGltZScsIGRhdGVFbnRpdHlJZHMsICd0aWNrZXQnIF1cblx0XHQpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aWNrZXRFbnRpdGllczogZW50aXRpZXMsXG5cdFx0XHR0aWNrZXRFbnRpdGllc0xvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZGF0ZUVudGl0aWVzLCBkYXRlRW50aXRpZXNMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVGlja2V0c0ZvckV2ZW50RGF0ZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgY2FuY2VsQ2xpY2tFdmVudCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3V0aWxzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCB7IGNvbmZpcm0gfSA9IHdpbmRvdztcblxuY29uc3QgdXNlVHJhc2hEYXRlRW50aXR5ID0gKCBldmVudERhdGUgKSA9PiB7XG5cdGNvbnN0IHsgdHJhc2hFbnRpdHlCeUlkIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGNsaWNrICkgPT4ge1xuXHRcdGNhbmNlbENsaWNrRXZlbnQoIGNsaWNrICk7XG5cdFx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCAhIGNvbmZpcm0oXG5cdFx0XHRfXyhcblx0XHRcdFx0J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBldmVudCBkYXRlPycsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdClcblx0XHQpICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0cmFzaEVudGl0eUJ5SWQoICdkYXRldGltZScsIGV2ZW50RGF0ZS5pZCApO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUcmFzaERhdGVFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogdXNlVHJhc2hQcmljZU1vZGlmaWVyXG4gKiByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdHdvIGZ1bmN0aW9uczpcbiAqICAtIGFkZFByaWNlTW9kaWZpZXJcbiAqICAtIHRyYXNoUHJpY2VNb2RpZmllclxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZnVuY3Rpb25zXG4gKi9cbmNvbnN0IHVzZVRyYXNoUHJpY2VNb2RpZmllciA9ICgpID0+IHtcblx0Y29uc3Qge1xuXHRcdHJlbW92ZVJlbGF0aW9uRm9yRW50aXR5LFxuXHRcdHRyYXNoRW50aXR5QnlJZCxcblx0fSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCBwcmljZU1vZGlmaWVyLCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHByaWNlTW9kaWZpZXIsICdwcmljZScgKSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0J1VuYWJsZSB0byBwZXJmb3JtIGRlbGV0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBQcmljZScgK1xuXHRcdFx0XHRcdFx0JyBFbnRpdHkgd2FzIHN1cHBsaWVkIGJ5IHRoZSBUaWNrZXQgUHJpY2UgQ2FsY3VsYXRvci4nLFxuXHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJlbW92ZVJlbGF0aW9uRm9yRW50aXR5KFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0dGlja2V0RW50aXR5LmlkLFxuXHRcdFx0XHQncHJpY2UnLFxuXHRcdFx0XHRwcmljZU1vZGlmaWVyLmlkXG5cdFx0XHQpO1xuXHRcdFx0dHJhc2hFbnRpdHlCeUlkKCAncHJpY2UnLCBwcmljZU1vZGlmaWVyLmlkICk7XG5cdFx0fSxcblx0XHRbXVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVHJhc2hQcmljZU1vZGlmaWVyO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCB7IGNvbmZpcm0gfSA9IHdpbmRvdztcblxuY29uc3QgdXNlVHJhc2hUaWNrZXQgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0Y29uc3QgeyB0cmFzaEVudGl0eUJ5SWQgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICgpID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBwZXJmb3JtIGRlbGV0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBUaWNrZXQgRW50aXR5IHdhcyBzdXBwbGllZCBieSB0aGUgVGlja2V0IFByaWNlIENhbGN1bGF0b3IuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggY29uZmlybShcblx0XHRcdF9fKFxuXHRcdFx0XHQnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHRpY2tldD8nLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHQpXG5cdFx0KSApIHtcblx0XHRcdHRyYXNoRW50aXR5QnlJZCggJ3RpY2tldCcsIHRpY2tldEVudGl0eS5pZCApO1xuXHRcdH1cblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVHJhc2hUaWNrZXQ7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAxID8gbGVuIC0gMSA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDE7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMV0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJyZWdlbmVyYXRvclJ1bnRpbWVcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaTE4blwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ1dGlsc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
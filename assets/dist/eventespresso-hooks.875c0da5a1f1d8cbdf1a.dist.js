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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhvb2tzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1hZGQtcHJpY2UtbW9kaWZpZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWJhc2UtcHJpY2UtdHlwZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY2xvbmUtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNvcHktdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtZGF0ZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbi1mb3ItZXZlbnQtdG8tZXZlbnQtZGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLXRvLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtY3JlYXRlLXRpY2tldC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtZXZlbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWRhdGUtdGlja2V0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZGF0ZXMtZm9yLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWVkaXRvci1ldmVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtZXZlbnQtZWRpdG9yLXRpY2tldHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLWV2ZW50LWZvci1ldmVudC1kYXRlLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1ldmVudC12ZW51ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtcHJldmlvdXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXByaWNlLXR5cGVzLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS1yZW1vdmUtcmVsYXRpb25zLWZvci1ldmVudC1kYXRlLWlkLXRvLXRpY2tldC1pZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRpY2tldC1ldmVudC1kYXRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdGlja2V0LXByaWNlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdGlja2V0cy1mb3ItZXZlbnQtZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL2Fzc2V0cy9zcmMvaG9va3MvdXNlLXRyYXNoLWRhdGUtZW50aXR5LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9hc3NldHMvc3JjL2hvb2tzL3VzZS10cmFzaC1wcmljZS1tb2RpZmllci5qcyIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzLy4vYXNzZXRzL3NyYy9ob29rcy91c2UtdHJhc2gtdGlja2V0LmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuaG9va3MvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidXRpbHNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbHVlT2JqZWN0c1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5ob29rcy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMuaG9va3MvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJlbGVtZW50XCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhvb2tzL2V4dGVybmFsIHtcInRoaXNcIjpcImxvZGFzaFwifSJdLCJuYW1lcyI6WyJ1c2VBZGRQcmljZU1vZGlmaWVyIiwidXNlRGlzcGF0Y2giLCJjcmVhdGVFbnRpdHkiLCJjcmVhdGVSZWxhdGlvbiIsInVzZUNhbGxiYWNrIiwidGlja2V0RW50aXR5IiwicHJvcGVydGllcyIsInByaWNlTW9kaWZpZXIiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsImlkIiwidXNlQmFzZVByaWNlVHlwZSIsInVzZVByaWNlVHlwZXMiLCJwcmljZVR5cGVzIiwicHJpY2VUeXBlc0xvYWRlZCIsInVzZU1lbW8iLCJmaW5kIiwicHJpY2VUeXBlIiwiUEJUX0lEIiwidXNlQ2xvbmVFbnRpdGllcyIsImVudGl0aWVzVG9DbG9uZSIsIm1vZGVsTmFtZSIsIm5ld0VudGl0aWVzIiwiaSIsImxlbmd0aCIsImZvckNsb25lIiwibmV3Q2xvbmUiLCJwdXNoIiwidXNlQ29weURhdGVFbnRpdHkiLCJldmVudERhdGUiLCJjcmVhdGVSZWxhdGlvbnMiLCJ1c2VFdmVudEVkaXRvckV2ZW50IiwiZXZ0SWQiLCJldmVudEVudGl0eSIsInVzZVRpY2tldHNGb3JFdmVudERhdGVzIiwidGlja2V0RW50aXRpZXMiLCJjbGljayIsImNhbmNlbENsaWNrRXZlbnQiLCJuZXdFdmVudERhdGUiLCJuYW1lIiwic3ByaW50ZiIsIl94IiwiaXNFbXB0eSIsImZhbHNlRnVuYyIsInVzZUNvcHlUaWNrZXQiLCJkYXRlRW50aXRpZXMiLCJyZWxhdGVkUHJpY2VzIiwidXNlU2VsZWN0Iiwic2VsZWN0IiwiZ2V0UmVsYXRlZEVudGl0aWVzIiwibmV3UHJpY2VzIiwidXBkYXRlVGlja2V0RGF0ZVJlbGF0aW9ucyIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcyIsInVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zIiwidXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXMiLCJuZXdUaWNrZXQiLCJBcnJheSIsImlzQXJyYXkiLCJ1c2VDcmVhdGVEYXRlRW50aXR5IiwiZXZlbnQiLCJjYWNoZU5ld0RhdGUiLCJ1cGRhdGVFdmVudERhdGVSZWxhdGlvbiIsInVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSIsIm5vd0pzIiwiRGF0ZSIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJNYXRoIiwiY2VpbCIsImdldE1pbnV0ZXMiLCJub3ciLCJTZXJ2ZXJEYXRlVGltZSIsImZyb21KU0RhdGUiLCJFVlRfSUQiLCJEVFRfbmFtZSIsIkRUVF9kZXNjcmlwdGlvbiIsIkRUVF9FVlRfc3RhcnQiLCJwbHVzIiwiRHVyYXRpb24iLCJmcm9tT2JqZWN0IiwiZGF5cyIsIkRUVF9FVlRfZW5kIiwiaG91cnMiLCJEVFRfcmVnX2xpbWl0IiwiRFRUX3NvbGQiLCJEVFRfcmVzZXJ2ZWQiLCJEVFRfb3JkZXIiLCJEVFRfcGFyZW50IiwiRFRUX2RlbGV0ZWQiLCJuZXdEYXRlIiwiZGF0ZUVudGl0eSIsIkVycm9yIiwiX18iLCJ1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzIiwiZ2V0RW50aXRpZXNCeUlkcyIsImV2ZW50RGF0ZUlkIiwidGlja2V0SWRzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aWNrZXRzIiwiZm9yRWFjaCIsInRpY2tldCIsInVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZVRvVGlja2V0cyIsImV2ZW50RGF0ZXMiLCJwcmljZXMiLCJwcmljZSIsInVzZXJJRCIsIndpbmRvdyIsInVzZXJTZXR0aW5ncyIsInVpZCIsInBhcnNlSW50IiwidXNlQ3JlYXRlVGlja2V0RW50aXR5IiwiY2FjaGVOZXdUaWNrZXQiLCJiYXNlUHJpY2VUeXBlIiwiVEtUX25hbWUiLCJUS1RfZGVzY3JpcHRpb24iLCJUS1RfcXR5IiwiVEtUX3NvbGQiLCJUS1RfcmVzZXJ2ZWQiLCJUS1RfdXNlcyIsIlRLVF9yZXF1aXJlZCIsIlRLVF9taW4iLCJUS1RfbWF4IiwiVEtUX3ByaWNlIiwiTW9uZXkiLCJTaXRlQ3VycmVuY3kiLCJUS1Rfc3RhcnREYXRlIiwiVEtUX2VuZERhdGUiLCJUS1RfdGF4YWJsZSIsIlRLVF9vcmRlciIsIlRLVF9pc0RlZmF1bHQiLCJUS1RfcmV2ZXJzZV9jYWxjdWxhdGUiLCJUS1Rfd3BfdXNlciIsIlRLVF9wYXJlbnQiLCJUS1RfZGVsZXRlZCIsIlBSVF9JRCIsIm5ld0Jhc2VQcmljZSIsIkRFRkFVTFQiLCJldmVudExvYWRlZCIsInVzZUV2ZW50RGF0ZUV2ZW50Iiwid2FybmluZyIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsInRpY2tldHNMb2FkZWQiLCJ1c2VFdmVudERhdGVUaWNrZXRzIiwiZGF0ZUVudGl0aWVzTG9hZGVkIiwidXNlRXZlbnREYXRlc0ZvckV2ZW50IiwiZW50aXRpZXMiLCJsb2FkZWQiLCJldmVudERhdGVzTG9hZGVkIiwidXNlRXZlbnRFZGl0b3JFdmVudERhdGVzIiwiZ2V0RW50aXRpZXNGb3JNb2RlbCIsImV2ZW50SWQiLCJlbnRpdHkiLCJnZXRFdmVudHMiLCJnZXRFdmVudEJ5SWQiLCJldmVudEVudGl0eUxvYWRlZCIsInVzZUV2ZW50RWRpdG9yVGlja2V0cyIsInVzZUV2ZW50Rm9yRXZlbnREYXRlIiwidmVudWVFbnRpdHkiLCJ2ZW51ZUVudGl0eUxvYWRlZCIsInVzZUV2ZW50VmVudWUiLCJ2YWx1ZSIsInJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJnZXRFbnRpdGllcyIsInVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMiLCJyZW1vdmVSZWxhdGlvbkZvckVudGl0eSIsInRpY2tldElkIiwidXNlVGlja2V0RXZlbnREYXRlcyIsInByaWNlc0xvYWRlZCIsIm5vQmFzZVByaWNlIiwidXNlVGlja2V0UHJpY2VzIiwidGlja2V0RW50aXRpZXNMb2FkZWQiLCJkYXRlRW50aXR5SWRzIiwibWFwIiwiZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzIiwiY29uZmlybSIsInVzZVRyYXNoRGF0ZUVudGl0eSIsInRyYXNoRW50aXR5QnlJZCIsInVzZVRyYXNoUHJpY2VNb2RpZmllciIsInVzZVRyYXNoVGlja2V0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFRQSxJQUFNQSxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLEdBQU07QUFBQSxxQkFJN0JDLG1FQUFXLENBQUUsb0JBQUYsQ0FKa0I7QUFBQSxNQUVoQ0MsWUFGZ0MsZ0JBRWhDQSxZQUZnQztBQUFBLE1BR2hDQyxjQUhnQyxnQkFHaENBLGNBSGdDOztBQUtqQyxTQUFPQyxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQ2pCLGlCQUFRQyxZQUFSLEVBQXNCQyxVQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUM2QkosWUFBWSxDQUN2QyxPQUR1QyxFQUV2Q0ksVUFGdUMsQ0FEekM7O0FBQUE7QUFDT0MsMkJBRFA7O0FBS0Msa0JBQUtDLHNGQUFvQixDQUFFRCxhQUFGLEVBQWlCLE9BQWpCLENBQXpCLEVBQXNEO0FBQ3JESiw4QkFBYyxDQUNiLFFBRGEsRUFFYkUsWUFBWSxDQUFDSSxFQUZBLEVBR2IsT0FIYSxFQUliRixhQUphLENBQWQ7QUFNQTs7QUFaRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURpQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQWVqQixFQWZpQixDQUFsQjtBQWlCQSxDQXRCRDs7QUF3QmVQLGtGQUFmLEU7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUVBOzs7O0FBR0E7O0FBRUEsSUFBTVUsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixHQUFNO0FBQUEsdUJBQ1dDLGdFQUFhLEVBRHhCO0FBQUEsTUFDdEJDLFVBRHNCLGtCQUN0QkEsVUFEc0I7QUFBQSxNQUNWQyxnQkFEVSxrQkFDVkEsZ0JBRFU7O0FBRTlCLFNBQU9DLGtFQUFPLENBQ2IsWUFBTTtBQUNMLFFBQUssQ0FBRUQsZ0JBQVAsRUFBMEI7QUFDekIsYUFBTyxJQUFQO0FBQ0E7O0FBQ0QsV0FBT0UsbURBQUksQ0FDVkgsVUFEVSxFQUVWLFVBQUVJLFNBQUY7QUFBQSxhQUFpQkEsU0FBUyxDQUFDQyxNQUFWLEtBQXFCLENBQXRDO0FBQUEsS0FGVSxDQUFYO0FBSUEsR0FUWSxFQVViLENBQUVMLFVBQUYsRUFBY0MsZ0JBQWQsQ0FWYSxDQUFkO0FBWUEsQ0FkRDs7QUFnQmVILCtFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTs7O0FBR0E7QUFDQTs7QUFFQSxJQUFNUSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQU07QUFBQSxxQkFDTGpCLG1FQUFXLENBQUUsb0JBQUYsQ0FETjtBQUFBLE1BQ3RCQyxZQURzQixnQkFDdEJBLFlBRHNCOztBQUU5QixTQUFPRSxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVFlLGVBQVIsRUFBeUJDLFNBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNiQyx5QkFEYSxHQUNDLEVBREQ7O0FBQUEsb0JBRWRGLGVBQWUsSUFBSUMsU0FGTDtBQUFBO0FBQUE7QUFBQTs7QUFHUkUsZUFIUSxHQUdKLENBSEk7O0FBQUE7QUFBQSxvQkFHREEsQ0FBQyxHQUFHSCxlQUFlLENBQUNJLE1BSG5CO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEscUJBSU1yQixZQUFZLENBQ2xDa0IsU0FEa0MsRUFFbENELGVBQWUsQ0FBRUcsQ0FBRixDQUFmLENBQXFCRSxRQUZhLENBSmxCOztBQUFBO0FBSVhDLHNCQUpXO0FBUWpCSix5QkFBVyxDQUFDSyxJQUFaLENBQWtCRCxRQUFsQjs7QUFSaUI7QUFHMkJILGVBQUMsRUFINUI7QUFBQTtBQUFBOztBQUFBO0FBQUEsK0NBV1pELFdBWFk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFsQjtBQWFBLENBZkQ7O0FBaUJlSCwrRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBR0E7QUFFQTs7Ozs7O0FBS0EsSUFBTVMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFFQyxTQUFGLEVBQWlCO0FBQUEscUJBSXRDM0IsbUVBQVcsQ0FBRSxvQkFBRixDQUoyQjtBQUFBLE1BRXpDQyxZQUZ5QyxnQkFFekNBLFlBRnlDO0FBQUEsTUFHekMyQixlQUh5QyxnQkFHekNBLGVBSHlDOztBQUFBLDZCQUtsQkMsa0VBQW1CLENBQUVGLFNBQVMsQ0FBQ0csS0FBWixDQUxEO0FBQUEsTUFLbENDLFdBTGtDLHdCQUtsQ0EsV0FMa0M7O0FBQUEsOEJBTWZDLHNFQUF1QixDQUFFLENBQUVMLFNBQUYsQ0FBRixDQU5SO0FBQUEsTUFNbENNLGNBTmtDLHlCQU1sQ0EsY0FOa0M7O0FBTzFDLFNBQU85QixzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVErQixLQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuQkMsMkZBQWdCLENBQUVELEtBQUYsQ0FBaEI7O0FBRG1CLG9CQUdsQixDQUFFM0Isc0ZBQW9CLENBQUV3QixXQUFGLEVBQWUsT0FBZixDQUF0QixJQUNBLENBQUV4QixzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBSko7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBTVgsSUFOVzs7QUFBQTtBQUFBO0FBQUEscUJBU1ExQixZQUFZLENBQ3RDLFVBRHNDLEVBRXRDMEIsU0FBUyxDQUFDSixRQUY0QixDQVRwQjs7QUFBQTtBQVNiYSwwQkFUYTtBQWFuQkEsMEJBQVksQ0FBQ0MsSUFBYixHQUFvQkMsbUVBQU8sQ0FDMUJDLDhEQUFFLENBQUUsV0FBRixFQUFlLHdCQUFmLEVBQXlDLGdCQUF6QyxDQUR3QixFQUUxQkgsWUFBWSxDQUFDQyxJQUZhLENBQTNCOztBQUlBLGtCQUFLLENBQUVHLHNEQUFPLENBQUVQLGNBQUYsQ0FBZCxFQUFtQztBQUNsQ0wsK0JBQWUsQ0FDZCxVQURjLEVBRWRRLFlBQVksQ0FBQzVCLEVBRkMsRUFHZCxRQUhjLEVBSWR5QixjQUpjLENBQWY7QUFNQTs7QUFDREwsNkJBQWUsQ0FDZCxPQURjLEVBRWRHLFdBQVcsQ0FBQ3ZCLEVBRkUsRUFHZCxVQUhjLEVBSWQsQ0FBRTRCLFlBQUYsQ0FKYyxDQUFmO0FBekJtQiwrQ0ErQlpBLFlBL0JZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FnQ2YsQ0FBRUwsV0FBRixFQUFlRSxjQUFmLENBaENlLENBQWxCO0FBaUNBLENBeENEOztBQTBDZVAsZ0ZBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5REE7OztBQUdBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBR0E7QUFDQTtBQUVBOztBQUdBLElBQU1lLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsU0FBTSxLQUFOO0FBQUEsQ0FBbEI7O0FBRUEsSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFFdEMsWUFBRixFQUFnQnVDLFlBQWhCLEVBQWtDO0FBQUEscUJBQzlCM0MsbUVBQVcsQ0FBRSxvQkFBRixDQURtQjtBQUFBLE1BQy9DQyxZQUQrQyxnQkFDL0NBLFlBRCtDOztBQUV2RCxNQUFNMkMsYUFBYSxHQUFHQyxpRUFBUyxDQUFFLFVBQUVDLE1BQUYsRUFBYztBQUFBLGtCQUNmQSxNQUFNLENBQUUsb0JBQUYsQ0FEUztBQUFBLFFBQ3RDQyxrQkFEc0MsV0FDdENBLGtCQURzQzs7QUFFOUMsV0FBT0Esa0JBQWtCLENBQUUzQyxZQUFGLEVBQWdCLFFBQWhCLENBQXpCO0FBQ0EsR0FIOEIsRUFHNUIsQ0FBRUEsWUFBRixDQUg0QixDQUEvQjtBQUlBLE1BQU00QyxTQUFTLEdBQUcvQixtRUFBZ0IsQ0FBRTJCLGFBQUYsRUFBaUIsT0FBakIsQ0FBbEM7QUFDQSxNQUFNSyx5QkFBeUIsR0FBR0MsK0ZBQXVDLEVBQXpFO0FBQ0EsTUFBTUMsMEJBQTBCLEdBQUdDLDBGQUFtQyxFQUF0RTtBQUNBLFNBQU9qRCxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFDWkksc0ZBQW9CLENBQUVILFlBQUYsRUFBZ0IsUUFBaEIsQ0FEUjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FFWHFDLFNBRlc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1GQUlaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQ2tCeEMsWUFBWSxDQUNuQyxRQURtQyxFQUVuQ0csWUFBWSxDQUFDbUIsUUFGc0IsQ0FEOUI7O0FBQUE7QUFDQThCLCtCQURBO0FBS05KLCtDQUF5QixDQUFFSSxTQUFGLEVBQWFWLFlBQWIsQ0FBekI7O0FBTE0sNEJBTURXLEtBQUssQ0FBQ0MsT0FBTixDQUFlUCxTQUFmLEtBQThCQSxTQUFTLENBQUMxQixNQU52QztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDZCQU9DNkIsMEJBQTBCLENBQUVFLFNBQUYsRUFBYUwsU0FBYixDQVAzQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUpZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUYsR0FBbEI7QUFlQSxDQXhCRDs7QUEwQmVOLDRFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTs7O0FBR0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFHQTs7QUFHQSxJQUFNYyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUVDLEtBQUYsRUFBU0MsWUFBVCxFQUEyQjtBQUFBLHFCQUM3QjFELG1FQUFXLENBQUUsb0JBQUYsQ0FEa0I7QUFBQSxNQUM5Q0MsWUFEOEMsZ0JBQzlDQSxZQUQ4Qzs7QUFFdEQsTUFBTTBELHVCQUF1QixHQUFHQyw0RkFBb0MsRUFBcEU7QUFDQSxTQUFPekQsc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFDakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ08wRCxpQkFEUCxHQUNlLElBQUlDLElBQUosRUFEZjtBQUVDRCxpQkFBSyxDQUFDRSxRQUFOLENBQ0NGLEtBQUssQ0FBQ0csUUFBTixFQURELEVBRUNDLElBQUksQ0FBQ0MsSUFBTCxDQUFXTCxLQUFLLENBQUNNLFVBQU4sS0FBcUIsRUFBaEMsSUFBdUMsRUFGeEMsRUFHQyxDQUhELEVBSUMsQ0FKRDtBQU1NQyxlQVJQLEdBUWFDLDJFQUFjLENBQUNDLFVBQWYsQ0FBMkJULEtBQTNCLENBUmI7QUFBQTtBQUFBLG1CQVN1QjVELFlBQVksQ0FDakMsVUFEaUMsRUFFakM7QUFDQ3NFLG9CQUFNLEVBQUVkLEtBQUssQ0FBQ2pELEVBRGY7QUFFQ2dFLHNCQUFRLEVBQUUsRUFGWDtBQUdDQyw2QkFBZSxFQUFFLEVBSGxCO0FBSUNDLDJCQUFhLEVBQUVOLEdBQUcsQ0FBQ08sSUFBSixDQUNkQyxxRUFBUSxDQUFDQyxVQUFULENBQXFCO0FBQUVDLG9CQUFJLEVBQUU7QUFBUixlQUFyQixDQURjLENBSmhCO0FBT0NDLHlCQUFXLEVBQUVYLEdBQUcsQ0FBQ08sSUFBSixDQUNaQyxxRUFBUSxDQUFDQyxVQUFULENBQXFCO0FBQUVDLG9CQUFJLEVBQUUsRUFBUjtBQUFZRSxxQkFBSyxFQUFFO0FBQW5CLGVBQXJCLENBRFksQ0FQZDtBQVVDQywyQkFBYSxFQUFFLENBQUMsQ0FWakI7QUFXQ0Msc0JBQVEsRUFBRSxDQVhYO0FBWUNDLDBCQUFZLEVBQUUsQ0FaZjtBQWFDQyx1QkFBUyxFQUFFLENBYlo7QUFjQ0Msd0JBQVUsRUFBRSxDQWRiO0FBZUNDLHlCQUFXLEVBQUU7QUFmZCxhQUZpQyxDQVRuQzs7QUFBQTtBQVNPQyxtQkFUUDtBQUFBO0FBQUEsbUJBNkJPNUIsdUJBQXVCLENBQUVGLEtBQUYsRUFBUzhCLE9BQVQsQ0E3QjlCOztBQUFBO0FBOEJDN0Isd0JBQVksQ0FBRTZCLE9BQUYsQ0FBWjs7QUE5QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FEaUIsSUFpQ2pCLENBQUU5QixLQUFGLEVBQVNDLFlBQVQsQ0FqQ2lCLENBQWxCO0FBbUNBLENBdENEOztBQXdDZUYsa0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDckRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVVBLElBQU1JLG9DQUFvQyxHQUFHLFNBQXZDQSxvQ0FBdUMsR0FBTTtBQUFBLHFCQUN2QjVELG1FQUFXLENBQUUsb0JBQUYsQ0FEWTtBQUFBLE1BQzFDRSxjQUQwQyxnQkFDMUNBLGNBRDBDOztBQUVsRCxTQUFPQyxzRUFBVyxDQUFFLFVBQUU0QixXQUFGLEVBQWV5RCxVQUFmLEVBQStCO0FBQ2xELFFBQUssQ0FBRWpGLHNGQUFvQixDQUFFd0IsV0FBRixFQUFlLE9BQWYsQ0FBM0IsRUFBc0Q7QUFDckQsWUFBTSxJQUFJMEQsS0FBSixDQUNMQyw4REFBRSxDQUNELHlFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUFOO0FBTUE7O0FBQ0QsUUFBSyxDQUFFbkYsc0ZBQW9CLENBQUVpRixVQUFGLEVBQWMsVUFBZCxDQUEzQixFQUF3RDtBQUN2RCxZQUFNLElBQUlDLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCx3RUFEQyxFQUVELGdCQUZDLENBREcsQ0FBTjtBQU1BOztBQUNELFdBQU94RixjQUFjLENBQ3BCLE9BRG9CLEVBRXBCNkIsV0FBVyxDQUFDdkIsRUFGUSxFQUdwQixVQUhvQixFQUlwQmdGLFVBSm9CLENBQXJCO0FBTUEsR0F2QmlCLENBQWxCO0FBd0JBLENBMUJEOztBQTRCZTVCLG1HQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsSUFBTStCLDJDQUEyQyxHQUFHLFNBQTlDQSwyQ0FBOEMsR0FBTTtBQUFBLHFCQUM3QjNGLG1FQUFXLENBQUUsb0JBQUYsQ0FEa0I7QUFBQSxNQUNqRDRCLGVBRGlELGdCQUNqREEsZUFEaUQ7O0FBQUEsbUJBRTVCaUIsaUVBQVMsQ0FDckMsVUFBRUMsTUFBRjtBQUFBLFdBQWNBLE1BQU0sQ0FBRSxvQkFBRixDQUFwQjtBQUFBLEdBRHFDLEVBRXJDLEVBRnFDLENBRm1CO0FBQUEsTUFFakQ4QyxnQkFGaUQsY0FFakRBLGdCQUZpRDs7QUFNekQsU0FBT3pGLHNFQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyRUFBRSxrQkFBUTBGLFdBQVIsRUFBcUJDLFNBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREFDWixJQUFJQyxPQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1RkFBYSxpQkFBUUMsT0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUNDSixnQkFBZ0IsQ0FBRSxRQUFGLEVBQVlFLFNBQVosQ0FEakI7O0FBQUE7QUFDZkcsaUNBRGU7QUFFbkJBLGlDQUFPLEdBQUczQyxLQUFLLENBQUNDLE9BQU4sQ0FBZTBDLE9BQWYsSUFBMkJBLE9BQTNCLEdBQXFDLENBQUVBLE9BQUYsQ0FBL0M7QUFDQUEsaUNBQU8sQ0FBQ0MsT0FBUixDQUFpQixVQUFFQyxNQUFGLEVBQWM7QUFDOUIsZ0NBQUssQ0FBRTVGLHNGQUFvQixDQUFFNEYsTUFBRixFQUFVLFFBQVYsQ0FBM0IsRUFBa0Q7QUFDakQsb0NBQU0sSUFBSVYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUFOO0FBTUE7QUFDRCwyQkFURDtBQUhtQjtBQUFBLGlDQWFiOUQsZUFBZSxDQUNwQixVQURvQixFQUVwQmlFLFdBRm9CLEVBR3BCLFFBSG9CLEVBSXBCSSxPQUpvQixDQWJGOztBQUFBO0FBbUJuQkQsaUNBQU8sQ0FBRSxJQUFGLENBQVA7O0FBbkJtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBYjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFEWTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQWxCO0FBdUJBLENBN0JEOztBQStCZUwsMEdBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNUyx1Q0FBdUMsR0FBRyxTQUExQ0EsdUNBQTBDLEdBQU07QUFBQSxxQkFDekJwRyxtRUFBVyxDQUFFLG9CQUFGLENBRGM7QUFBQSxNQUM3QzRCLGVBRDZDLGdCQUM3Q0EsZUFENkM7O0FBRXJELFNBQU96QixzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVF3QixTQUFSLEVBQW1Cc0UsT0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNaMUYsc0ZBQW9CLENBQUVvQixTQUFGLEVBQWEsVUFBYixDQURSO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUVaLElBQUk4RCxLQUFKLENBQ0xDLDhEQUFFLENBQ0QsOEVBREMsRUFFRCxnQkFGQyxDQURHLENBRlk7O0FBQUE7QUFTbkJPLHFCQUFPLEdBQUczQyxLQUFLLENBQUNDLE9BQU4sQ0FBZTBDLE9BQWYsSUFBMkJBLE9BQTNCLEdBQXFDLENBQUVBLE9BQUYsQ0FBL0M7QUFDQUEscUJBQU8sQ0FBQ0MsT0FBUixDQUFpQixVQUFFQyxNQUFGLEVBQWM7QUFDOUIsb0JBQUssQ0FBRTVGLHNGQUFvQixDQUFFNEYsTUFBRixFQUFVLFFBQVYsQ0FBM0IsRUFBa0Q7QUFDakQsd0JBQU0sSUFBSVYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUFOO0FBTUE7QUFDRCxlQVREO0FBVm1CO0FBQUEscUJBb0JiOUQsZUFBZSxDQUNwQixVQURvQixFQUVwQkQsU0FGb0IsRUFHcEIsUUFIb0IsRUFJcEJzRSxPQUpvQixDQXBCRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQWxCO0FBMkJBLENBN0JEOztBQStCZUcsc0dBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNbEQsdUNBQXVDLEdBQUcsU0FBMUNBLHVDQUEwQyxHQUFNO0FBQUEscUJBQ3pCbEQsbUVBQVcsQ0FBRSxvQkFBRixDQURjO0FBQUEsTUFDN0M0QixlQUQ2QyxnQkFDN0NBLGVBRDZDOztBQUVyRCxTQUFPekIsc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJFQUFFLGlCQUFRZ0csTUFBUixFQUFnQkUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNaOUYsc0ZBQW9CLENBQUU0RixNQUFGLEVBQVUsUUFBVixDQURSO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUVaLElBQUlWLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCwwRUFEQyxFQUVELGdCQUZDLENBREcsQ0FGWTs7QUFBQTtBQVNuQlcsd0JBQVUsR0FBRy9DLEtBQUssQ0FBQ0MsT0FBTixDQUFlOEMsVUFBZixJQUE4QkEsVUFBOUIsR0FBMkMsQ0FBRUEsVUFBRixDQUF4RDtBQUNBQSx3QkFBVSxDQUFDSCxPQUFYLENBQW9CLFVBQUV2RSxTQUFGLEVBQWlCO0FBQ3BDLG9CQUFLLENBQUVwQixzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBQTNCLEVBQXVEO0FBQ3RELHdCQUFNLElBQUk4RCxLQUFKLENBQ0xDLDhEQUFFLENBQ0QsOEVBREMsRUFFRCxnQkFGQyxDQURHLENBQU47QUFNQTtBQUNELGVBVEQ7QUFWbUI7QUFBQSxxQkFvQmI5RCxlQUFlLENBQ3BCLFFBRG9CLEVBRXBCdUUsTUFBTSxDQUFDM0YsRUFGYSxFQUdwQixVQUhvQixFQUlwQjZGLFVBSm9CLENBcEJGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBbEI7QUEyQkEsQ0E3QkQ7O0FBK0JlbkQsc0dBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNRSxtQ0FBbUMsR0FBRyxTQUF0Q0EsbUNBQXNDLEdBQU07QUFBQSxxQkFDckJwRCxtRUFBVyxDQUFFLG9CQUFGLENBRFU7QUFBQSxNQUN6QzRCLGVBRHlDLGdCQUN6Q0EsZUFEeUM7O0FBRWpELFNBQU96QixzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQUUsaUJBQVFnRyxNQUFSLEVBQWdCRyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ1ovRixzRkFBb0IsQ0FBRTRGLE1BQUYsRUFBVSxRQUFWLENBRFI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0JBRVosSUFBSVYsS0FBSixDQUNMQyw4REFBRSxDQUNELDBFQURDLEVBRUQsZ0JBRkMsQ0FERyxDQUZZOztBQUFBO0FBU25CWSxvQkFBTSxHQUFHaEQsS0FBSyxDQUFDQyxPQUFOLENBQWUrQyxNQUFmLElBQTBCQSxNQUExQixHQUFtQyxDQUFFQSxNQUFGLENBQTVDO0FBQ0FBLG9CQUFNLENBQUNKLE9BQVAsQ0FBZ0IsVUFBRUssS0FBRixFQUFhO0FBQzVCLG9CQUFLLENBQUVoRyxzRkFBb0IsQ0FBRWdHLEtBQUYsRUFBUyxPQUFULENBQTNCLEVBQWdEO0FBQy9DLHdCQUFNLElBQUlkLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCx5RUFEQyxFQUVELGdCQUZDLENBREcsQ0FBTjtBQU1BO0FBQ0QsZUFURDtBQVZtQjtBQUFBLHFCQW9CYjlELGVBQWUsQ0FDcEIsUUFEb0IsRUFFcEJ1RSxNQUFNLENBQUMzRixFQUZhLEVBR3BCLE9BSG9CLEVBSXBCOEYsTUFKb0IsQ0FwQkY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFsQjtBQTJCQSxDQTdCRDs7QUErQmVsRCxrR0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREE7OztBQUdBO0FBQ0E7QUFDQTtBQU9BLElBQU1vRCxNQUFNLEdBQUcscUVBQU9DLE1BQU0sQ0FBQ0MsWUFBZCxNQUErQixRQUEvQixJQUNkRCxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLEdBRE4sR0FFZEMsUUFBUSxDQUFFSCxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLEdBQXRCLEVBQTJCLEVBQTNCLENBRk0sR0FHZCxJQUhEO0FBS0E7Ozs7QUFHQTs7QUFHQSxJQUFNRSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUVDLGNBQUYsRUFBa0JDLGFBQWxCLEVBQXFDO0FBQUEscUJBQ3pDL0csbUVBQVcsQ0FBRSxvQkFBRixDQUQ4QjtBQUFBLE1BQzFEQyxZQUQwRCxnQkFDMURBLFlBRDBEOztBQUVsRSxNQUFNa0QsMEJBQTBCLEdBQUdDLDBGQUFtQyxFQUF0RTtBQUNBLFNBQU9qRCxzRUFBVztBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUNqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTzBELGlCQURQLEdBQ2UsSUFBSUMsSUFBSixFQURmO0FBRUNELGlCQUFLLENBQUNFLFFBQU4sQ0FDQ0YsS0FBSyxDQUFDRyxRQUFOLEVBREQsRUFFQ0MsSUFBSSxDQUFDQyxJQUFMLENBQVdMLEtBQUssQ0FBQ00sVUFBTixLQUFxQixFQUFoQyxJQUF1QyxFQUZ4QyxFQUdDLENBSEQsRUFJQyxDQUpEO0FBTU1DLGVBUlAsR0FRYUMsMkVBQWMsQ0FBQ0MsVUFBZixDQUEyQlQsS0FBM0IsQ0FSYjtBQUFBO0FBQUEsbUJBU3lCNUQsWUFBWSxDQUNuQyxRQURtQyxFQUVuQztBQUNDK0csc0JBQVEsRUFBRSxFQURYO0FBRUNDLDZCQUFlLEVBQUUsRUFGbEI7QUFHQ0MscUJBQU8sRUFBRSxDQUFDLENBSFg7QUFJQ0Msc0JBQVEsRUFBRSxDQUpYO0FBS0NDLDBCQUFZLEVBQUUsQ0FMZjtBQU1DQyxzQkFBUSxFQUFFLENBQUMsQ0FOWjtBQU9DQywwQkFBWSxFQUFFLEtBUGY7QUFRQ0MscUJBQU8sRUFBRSxDQVJWO0FBU0NDLHFCQUFPLEVBQUUsQ0FBQyxDQVRYO0FBVUNDLHVCQUFTLEVBQUUsSUFBSUMsa0VBQUosQ0FBVyxDQUFYLEVBQWNDLHlFQUFkLENBVlo7QUFXQ0MsMkJBQWEsRUFBRXhELEdBWGhCO0FBWUN5RCx5QkFBVyxFQUFFekQsR0FBRyxDQUFDTyxJQUFKLENBQ1pDLHFFQUFRLENBQUNDLFVBQVQsQ0FBcUI7QUFBRUMsb0JBQUksRUFBRTtBQUFSLGVBQXJCLENBRFksQ0FaZDtBQWVDZ0QseUJBQVcsRUFBRSxLQWZkO0FBZ0JDQyx1QkFBUyxFQUFFLENBaEJaO0FBaUJDQywyQkFBYSxFQUFFLEtBakJoQjtBQWtCQ0MsbUNBQXFCLEVBQUUsS0FsQnhCO0FBbUJDQyx5QkFBVyxFQUFFMUIsTUFuQmQ7QUFvQkMyQix3QkFBVSxFQUFFLENBcEJiO0FBcUJDQyx5QkFBVyxFQUFFO0FBckJkLGFBRm1DLENBVHJDOztBQUFBO0FBU08vRSxxQkFUUDtBQUFBO0FBQUEsbUJBbUM0QnBELFlBQVksQ0FDdEMsT0FEc0MsRUFFdEM7QUFBRW9JLG9CQUFNLEVBQUV0QixhQUFhLENBQUN2RztBQUF4QixhQUZzQyxDQW5DeEM7O0FBQUE7QUFtQ084SCx3QkFuQ1A7QUFBQTtBQUFBLG1CQXVDT25GLDBCQUEwQixDQUFFRSxTQUFGLEVBQWEsQ0FBRWlGLFlBQUYsQ0FBYixDQXZDakM7O0FBQUE7QUF3Q0N4QiwwQkFBYyxDQUFFekQsU0FBRixDQUFkOztBQXhDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQURpQixJQTJDakIsQ0FBRXBELFlBQUYsRUFBZ0JrRCwwQkFBaEIsQ0EzQ2lCLENBQWxCO0FBNkNBLENBaEREOztBQWtEZTBELG9GQUFmLEU7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQSxJQUFNMEIsT0FBTyxHQUFHO0FBQ2Y5RSxPQUFLLEVBQUUsRUFEUTtBQUVmK0UsYUFBVyxFQUFFO0FBRkUsQ0FBaEI7QUFLQTs7Ozs7Ozs7O0FBUUEsSUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFFOUcsU0FBRixFQUFpQjtBQUMxQyxTQUFPa0IsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSyxDQUFFdkMsc0ZBQW9CLENBQUVvQixTQUFGLEVBQWEsVUFBYixDQUEzQixFQUF1RDtBQUN0RCtHLG9EQUFPLENBQ04sS0FETSxFQUVOLG9EQUZNLENBQVA7QUFJQSxhQUFPSCxPQUFQO0FBQ0E7O0FBUDhCLGtCQVFBekYsTUFBTSxDQUFFLG9CQUFGLENBUk47QUFBQSxRQVF2QkMsa0JBUnVCLFdBUXZCQSxrQkFSdUI7O0FBQUEsbUJBU0dELE1BQU0sQ0FBRSxXQUFGLENBVFQ7QUFBQSxRQVN2QjZGLHFCQVR1QixZQVN2QkEscUJBVHVCOztBQVUvQixRQUFJbEYsS0FBSyxHQUFHVixrQkFBa0IsQ0FBRXBCLFNBQUYsRUFBYSxPQUFiLENBQTlCO0FBQ0EsUUFBTTZHLFdBQVcsR0FBR0cscUJBQXFCLENBQ3hDLG9CQUR3QyxFQUV4QyxDQUFFaEgsU0FBRixFQUFhLE9BQWIsQ0FGd0MsQ0FBekM7O0FBSUEsUUFBSzZHLFdBQUwsRUFBbUI7QUFDbEIvRSxXQUFLLEdBQUdILEtBQUssQ0FBQ0MsT0FBTixDQUFlRSxLQUFmLEtBQTBCQSxLQUFLLENBQUUsQ0FBRixDQUEvQixJQUNSbEQsc0ZBQW9CLENBQUVrRCxLQUFLLENBQUUsQ0FBRixDQUFQLEVBQWMsT0FBZCxDQURaLEdBRVBBLEtBQUssQ0FBRSxDQUFGLENBRkUsR0FHUCxJQUhEO0FBSUEsYUFBTztBQUNOQSxhQUFLLEVBQUxBLEtBRE07QUFFTitFLG1CQUFXLEVBQVhBO0FBRk0sT0FBUDtBQUlBOztBQUNELFdBQU9ELE9BQVA7QUFDQSxHQTFCZSxFQTBCYixDQUFFNUcsU0FBRixDQTFCYSxDQUFoQjtBQTJCQSxDQTVCRDs7QUE4QmU4RyxnRkFBZixFOzs7Ozs7Ozs7Ozs7QUNsREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBRUEsSUFBTUYsT0FBTyxHQUFHO0FBQ2Z0QyxTQUFPLEVBQUUsRUFETTtBQUVmMkMsZUFBYSxFQUFFO0FBRkEsQ0FBaEI7QUFLQTs7Ozs7Ozs7O0FBUUEsSUFBTUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFFbEgsU0FBRixFQUFpQjtBQUM1QyxTQUFPa0IsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSyxDQUFFdkMsc0ZBQW9CLENBQUVvQixTQUFGLEVBQWEsVUFBYixDQUEzQixFQUF1RDtBQUN0RCtHLG9EQUFPLENBQ04sS0FETSxFQUVOLG9EQUZNLENBQVA7QUFJQSxhQUFPSCxPQUFQO0FBQ0E7O0FBUDhCLGtCQVFBekYsTUFBTSxDQUFFLG9CQUFGLENBUk47QUFBQSxRQVF2QkMsa0JBUnVCLFdBUXZCQSxrQkFSdUI7O0FBQUEsbUJBU0dELE1BQU0sQ0FBRSxXQUFGLENBVFQ7QUFBQSxRQVN2QjZGLHFCQVR1QixZQVN2QkEscUJBVHVCOztBQVUvQixRQUFNMUMsT0FBTyxHQUFHbEQsa0JBQWtCLENBQUVwQixTQUFGLEVBQWEsUUFBYixDQUFsQztBQUNBLFFBQU1pSCxhQUFhLEdBQUdELHFCQUFxQixDQUMxQyxvQkFEMEMsRUFFMUMsb0JBRjBDLEVBRzFDLENBQUVoSCxTQUFGLEVBQWEsUUFBYixDQUgwQyxDQUEzQztBQUtBLFdBQU87QUFDTnNFLGFBQU8sRUFBUEEsT0FETTtBQUVOMkMsbUJBQWEsRUFBYkE7QUFGTSxLQUFQO0FBSUEsR0FwQmUsRUFvQmIsQ0FBRWpILFNBQUYsQ0FwQmEsQ0FBaEI7QUFxQkEsQ0F0QkQ7O0FBd0Jla0gsa0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUVBLElBQU1OLE9BQU8sR0FBRztBQUFFNUYsY0FBWSxFQUFFLEVBQWhCO0FBQW9CbUcsb0JBQWtCLEVBQUU7QUFBeEMsQ0FBaEI7QUFFQTs7Ozs7Ozs7OztBQVNBLElBQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBRXRGLEtBQUYsRUFBaUM7QUFBQSxNQUF4QitFLFdBQXdCLHVFQUFWLElBQVU7QUFDOUQsU0FBTzNGLGlFQUFTLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQy9CLFFBQUssRUFDSjBGLFdBQVcsSUFDWGpJLHNGQUFvQixDQUFFa0QsS0FBRixFQUFTLE9BQVQsQ0FGaEIsQ0FBTCxFQUdJO0FBQ0gsYUFBTzhFLE9BQVA7QUFDQTs7QUFOOEIsa0JBT0F6RixNQUFNLENBQUUsb0JBQUYsQ0FQTjtBQUFBLFFBT3ZCQyxrQkFQdUIsV0FPdkJBLGtCQVB1Qjs7QUFBQSxtQkFRR0QsTUFBTSxDQUFFLFdBQUYsQ0FSVDtBQUFBLFFBUXZCNkYscUJBUnVCLFlBUXZCQSxxQkFSdUI7O0FBUy9CLFFBQU1LLFFBQVEsR0FBR2pHLGtCQUFrQixDQUFFVSxLQUFGLEVBQVMsVUFBVCxFQUFxQixPQUFyQixDQUFuQztBQUNBLFFBQU13RixNQUFNLEdBQUdOLHFCQUFxQixDQUNuQyxvQkFEbUMsRUFFbkMsb0JBRm1DLEVBR25DLENBQUVsRixLQUFGLEVBQVMsVUFBVCxDQUhtQyxDQUFwQztBQUtBLFdBQU87QUFDTmQsa0JBQVksRUFBRXFHLFFBRFI7QUFFTkYsd0JBQWtCLEVBQUVHO0FBRmQsS0FBUDtBQUlBLEdBbkJlLEVBbUJiLENBQUV4RixLQUFGLENBbkJhLENBQWhCO0FBb0JBLENBckJEOztBQXVCZXNGLG9GQUFmLEU7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFFQSxJQUFNUixPQUFPLEdBQUc7QUFDZmxDLFlBQVUsRUFBRSxFQURHO0FBRWY2QyxrQkFBZ0IsRUFBRTtBQUZILENBQWhCO0FBS0E7Ozs7Ozs7OztBQVFBLElBQU1DLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsR0FBMEI7QUFBQSxNQUF4QlgsV0FBd0IsdUVBQVYsSUFBVTtBQUMxRCxTQUFPM0YsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSyxDQUFFMEYsV0FBUCxFQUFxQjtBQUNwQixhQUFPRCxPQUFQO0FBQ0E7O0FBSDhCLGtCQUlDekYsTUFBTSxDQUFFLG9CQUFGLENBSlA7QUFBQSxRQUl2QnNHLG1CQUp1QixXQUl2QkEsbUJBSnVCOztBQUsvQixRQUFNL0MsVUFBVSxHQUFHK0MsbUJBQW1CLENBQUUsVUFBRixDQUF0QztBQUNBLFdBQU85RixLQUFLLENBQUNDLE9BQU4sQ0FBZThDLFVBQWYsS0FBK0JBLFVBQVUsQ0FBQy9FLE1BQTFDLEdBQ047QUFDQytFLGdCQUFVLEVBQVZBLFVBREQ7QUFFQzZDLHNCQUFnQixFQUFFO0FBRm5CLEtBRE0sR0FLTlgsT0FMRDtBQU1BLEdBWmUsRUFZYixDQUFFQyxXQUFGLENBWmEsQ0FBaEI7QUFhQSxDQWREOztBQWdCZVcsdUZBQWYsRTs7Ozs7Ozs7Ozs7O0FDbENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFRQSxJQUFNdEgsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixHQUFtQjtBQUFBLE1BQWpCd0gsT0FBaUIsdUVBQVAsQ0FBTztBQUM5QyxTQUFPeEcsaUVBQVMsQ0FBRSxVQUFFQyxNQUFGLEVBQWM7QUFDL0IsUUFBSXdHLE1BQUo7O0FBQ0EsUUFBS0QsT0FBTyxLQUFLLENBQWpCLEVBQXFCO0FBQUEsb0JBQ0V2RyxNQUFNLENBQUUsb0JBQUYsQ0FEUjtBQUFBLFVBQ1p5RyxTQURZLFdBQ1pBLFNBRFk7O0FBRXBCRCxZQUFNLEdBQUdDLFNBQVMsQ0FBRUYsT0FBRixDQUFsQjtBQUNBQyxZQUFNLEdBQUdoRyxLQUFLLENBQUNDLE9BQU4sQ0FBZStGLE1BQWYsS0FBMkJBLE1BQU0sQ0FBRSxDQUFGLENBQWpDLEdBQ1JBLE1BQU0sQ0FBRSxDQUFGLENBREUsR0FFUixJQUZEO0FBR0EsS0FORCxNQU1PO0FBQUEscUJBQ21CeEcsTUFBTSxDQUFFLG9CQUFGLENBRHpCO0FBQUEsVUFDRTBHLFlBREYsWUFDRUEsWUFERjs7QUFFTkYsWUFBTSxHQUFHRSxZQUFZLENBQUVILE9BQUYsQ0FBckI7QUFDQTs7QUFDRCxRQUFNSixNQUFNLEdBQUcxSSxzRkFBb0IsQ0FBRStJLE1BQUYsRUFBVSxPQUFWLENBQW5DO0FBQ0EsV0FBTztBQUNOdkgsaUJBQVcsRUFBRXVILE1BRFA7QUFFTkcsdUJBQWlCLEVBQUVSO0FBRmIsS0FBUDtBQUlBLEdBakJlLEVBaUJiLENBQUVJLE9BQUYsQ0FqQmEsQ0FBaEI7QUFrQkEsQ0FuQkQ7O0FBcUJleEgsa0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBOzs7Ozs7OztBQU9BLElBQU02SCxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLEdBQU07QUFDbkMsU0FBTzdHLGlFQUFTLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQUEsa0JBQ0NBLE1BQU0sQ0FBRSxvQkFBRixDQURQO0FBQUEsUUFDdkJzRyxtQkFEdUIsV0FDdkJBLG1CQUR1Qjs7QUFFL0IsUUFBTW5ELE9BQU8sR0FBR21ELG1CQUFtQixDQUFFLFFBQUYsQ0FBbkM7QUFDQSxXQUFPO0FBQUVuRCxhQUFPLEVBQVBBO0FBQUYsS0FBUDtBQUNBLEdBSmUsRUFJYixFQUphLENBQWhCO0FBS0EsQ0FORDs7QUFRZXlELG9GQUFmLEU7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBO0FBRUE7Ozs7Ozs7OztBQVFBLElBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBRWhJLFNBQUYsRUFBaUI7QUFDN0MsTUFBTTBILE9BQU8sR0FBRzlJLHNGQUFvQixDQUFFb0IsU0FBRixFQUFhLFVBQWIsQ0FBcEIsR0FDZkEsU0FBUyxDQUFDRyxLQURLLEdBRWYsQ0FGRDtBQUdBLFNBQU9ELHVFQUFtQixDQUFFd0gsT0FBRixDQUExQjtBQUNBLENBTEQ7O0FBT2VNLG1GQUFmLEU7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBQ0E7QUFFQSxJQUFNcEIsT0FBTyxHQUFHO0FBQ2ZxQixhQUFXLEVBQUUsSUFERTtBQUVmQyxtQkFBaUIsRUFBRTtBQUZKLENBQWhCO0FBS0E7Ozs7Ozs7OztBQVFBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBRXJHLEtBQUYsRUFBaUM7QUFBQSxNQUF4QitFLFdBQXdCLHVFQUFWLElBQVU7QUFDdEQsU0FBTzNGLGlFQUFTLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQy9CLFFBQUssRUFDSjBGLFdBQVcsSUFDWGpJLHNGQUFvQixDQUFFa0QsS0FBRixFQUFTLE9BQVQsQ0FGaEIsQ0FBTCxFQUdJO0FBQ0gsYUFBTzhFLE9BQVA7QUFDQTs7QUFOOEIsa0JBVTNCekYsTUFBTSxDQUFFLG9CQUFGLENBVnFCO0FBQUEsUUFROUJDLGtCQVI4QixXQVE5QkEsa0JBUjhCO0FBQUEsUUFTOUI0RixxQkFUOEIsV0FTOUJBLHFCQVQ4Qjs7QUFXL0IsUUFBSVcsTUFBTSxHQUFHdkcsa0JBQWtCLENBQUVVLEtBQUYsRUFBUyxPQUFULENBQS9CO0FBQ0EsUUFBTXdGLE1BQU0sR0FBR04scUJBQXFCLENBQ25DLG9CQURtQyxFQUVuQyxDQUFFbEYsS0FBRixFQUFTLE9BQVQsQ0FGbUMsQ0FBcEM7QUFJQTZGLFVBQU0sR0FBR2hHLEtBQUssQ0FBQ0MsT0FBTixDQUFlK0YsTUFBZixLQUEyQkEsTUFBTSxDQUFFLENBQUYsQ0FBakMsSUFDVC9JLHNGQUFvQixDQUFFK0ksTUFBTSxDQUFFLENBQUYsQ0FBUixFQUFlLE9BQWYsQ0FEWCxHQUVSQSxNQUFNLENBQUUsQ0FBRixDQUZFLEdBR1IsSUFIRDtBQUlBLFdBQU87QUFDTk0saUJBQVcsRUFBRU4sTUFEUDtBQUVOTyx1QkFBaUIsRUFBRVo7QUFGYixLQUFQO0FBSUEsR0F4QmUsRUF3QmIsQ0FBRXhGLEtBQUYsRUFBUytFLFdBQVQsQ0F4QmEsQ0FBaEI7QUF5QkEsQ0ExQkQ7O0FBNEJlc0IsNEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDL0NBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBOzs7Ozs7O0FBTWUseUVBQUVDLEtBQUYsRUFBYTtBQUMzQixNQUFNQyxHQUFHLEdBQUdDLGlFQUFNLEVBQWxCO0FBQ0FDLHNFQUFTLENBQUUsWUFBTTtBQUNoQkYsT0FBRyxDQUFDRyxPQUFKLEdBQWNKLEtBQWQ7QUFDQSxHQUZRLENBQVQ7QUFHQSxTQUFPQyxHQUFHLENBQUNHLE9BQVg7QUFDQSxDQU5ELEU7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBOzs7Ozs7OztBQU9BLElBQU16SixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDM0IsU0FBT21DLGlFQUFTLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQUEsa0JBQ1BBLE1BQU0sQ0FBRSxxQkFBRixDQURDO0FBQUEsUUFDdkJzSCxXQUR1QixXQUN2QkEsV0FEdUI7O0FBQUEsbUJBRUd0SCxNQUFNLENBQUUsV0FBRixDQUZUO0FBQUEsUUFFdkI2RixxQkFGdUIsWUFFdkJBLHFCQUZ1Qjs7QUFHL0IsUUFBTUssUUFBUSxHQUFHb0IsV0FBVyxDQUFFLFlBQUYsQ0FBNUI7QUFDQSxRQUFNbkIsTUFBTSxHQUFHTixxQkFBcUIsQ0FDbkMscUJBRG1DLEVBRW5DLGFBRm1DLEVBR25DLENBQUUsWUFBRixDQUhtQyxDQUFwQztBQUtBLFdBQU87QUFDTmhJLGdCQUFVLEVBQUVxSSxRQUROO0FBRU5wSSxzQkFBZ0IsRUFBRXFJO0FBRlosS0FBUDtBQUlBLEdBYmUsRUFhYixFQWJhLENBQWhCO0FBY0EsQ0FmRDs7QUFpQmV2SSw0RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7OztBQUdBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVQSxJQUFNMkosMkNBQTJDLEdBQUcsU0FBOUNBLDJDQUE4QyxHQUFNO0FBQUEscUJBQ3JCckssbUVBQVcsQ0FBRSxvQkFBRixDQURVO0FBQUEsTUFDakRzSyx1QkFEaUQsZ0JBQ2pEQSx1QkFEaUQ7O0FBRXpELFNBQU9uSyxzRUFBVyxDQUFFLFVBQUUwRixXQUFGLEVBQWVDLFNBQWYsRUFBOEI7QUFDakQsV0FBTyxJQUFJQyxPQUFKLENBQWEsVUFBRUMsT0FBRixFQUFlO0FBQ2xDRixlQUFTLENBQUNJLE9BQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtFQUFtQixpQkFBUXFFLFFBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQ1pELHVCQUF1QixDQUM1QixVQUQ0QixFQUU1QnpFLFdBRjRCLEVBRzVCLFFBSDRCLEVBSTVCMEUsUUFKNEIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFuQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBdkUsYUFBTyxDQUFFLElBQUYsQ0FBUDtBQUNBLEtBVk0sQ0FBUDtBQVdBLEdBWmlCLENBQWxCO0FBYUEsQ0FmRDs7QUFpQmVxRSwwR0FBZixFOzs7Ozs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBRUEsSUFBTTlCLE9BQU8sR0FBRztBQUNmbEMsWUFBVSxFQUFFLEVBREc7QUFFZjZDLGtCQUFnQixFQUFFO0FBRkgsQ0FBaEI7QUFLQTs7Ozs7Ozs7O0FBUUEsSUFBTXNCLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBRXBLLFlBQUYsRUFBb0I7QUFDL0MsU0FBT3lDLGlFQUFTLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQy9CLFFBQUssQ0FBRXZDLHNGQUFvQixDQUFFSCxZQUFGLEVBQWdCLFFBQWhCLENBQTNCLEVBQXdEO0FBQ3ZEc0ksb0RBQU8sQ0FDTixLQURNLEVBRU4sa0RBRk0sQ0FBUDtBQUlBLGFBQU9ILE9BQVA7QUFDQTs7QUFQOEIsa0JBUUF6RixNQUFNLENBQUUsb0JBQUYsQ0FSTjtBQUFBLFFBUXZCQyxrQkFSdUIsV0FRdkJBLGtCQVJ1Qjs7QUFBQSxtQkFTR0QsTUFBTSxDQUFFLFdBQUYsQ0FUVDtBQUFBLFFBU3ZCNkYscUJBVHVCLFlBU3ZCQSxxQkFUdUI7O0FBVS9CLFFBQU10QyxVQUFVLEdBQUd0RCxrQkFBa0IsQ0FBRTNDLFlBQUYsRUFBZ0IsVUFBaEIsQ0FBckM7QUFDQSxRQUFNOEksZ0JBQWdCLEdBQUdQLHFCQUFxQixDQUM3QyxvQkFENkMsRUFFN0Msb0JBRjZDLEVBRzdDLENBQUV2SSxZQUFGLEVBQWdCLFVBQWhCLENBSDZDLENBQTlDO0FBS0EsV0FBTztBQUNOaUcsZ0JBQVUsRUFBVkEsVUFETTtBQUVONkMsc0JBQWdCLEVBQWhCQTtBQUZNLEtBQVA7QUFJQSxHQXBCZSxFQW9CYixDQUFFOUksWUFBRixDQXBCYSxDQUFoQjtBQXFCQSxDQXRCRDs7QUF3QmVvSyxrRkFBZixFOzs7Ozs7Ozs7Ozs7QUM1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBRUEsSUFBTWpDLE9BQU8sR0FBRztBQUNmakMsUUFBTSxFQUFFLEVBRE87QUFFZm1FLGNBQVksRUFBRSxLQUZDO0FBR2ZDLGFBQVcsRUFBRTtBQUhFLENBQWhCO0FBTUE7Ozs7Ozs7Ozs7QUFTQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUV2SyxZQUFGLEVBQW9CO0FBQzNDLFNBQU95QyxpRUFBUyxDQUNmLFVBQUVDLE1BQUYsRUFBYztBQUNiLFFBQUt2QyxzRkFBb0IsQ0FBRUgsWUFBRixFQUFnQixRQUFoQixDQUF6QixFQUFzRDtBQUFBLG9CQUN0QjBDLE1BQU0sQ0FBRSxvQkFBRixDQURnQjtBQUFBLFVBQzdDQyxrQkFENkMsV0FDN0NBLGtCQUQ2Qzs7QUFBQSxxQkFFbkJELE1BQU0sQ0FBRSxXQUFGLENBRmE7QUFBQSxVQUU3QzZGLHFCQUY2QyxZQUU3Q0EscUJBRjZDOztBQUdyRCxVQUFNckMsTUFBTSxHQUFHdkQsa0JBQWtCLENBQ2hDM0MsWUFEZ0MsRUFFaEMsT0FGZ0MsQ0FBakM7QUFJQSxVQUFNcUssWUFBWSxHQUFHOUIscUJBQXFCLENBQ3pDLG9CQUR5QyxFQUV6QyxvQkFGeUMsRUFHekMsQ0FBRXZJLFlBQUYsRUFBZ0IsT0FBaEIsQ0FIeUMsQ0FBMUM7QUFLQSxhQUFPO0FBQ05rRyxjQUFNLEVBQU5BLE1BRE07QUFFTm1FLG9CQUFZLEVBQVpBLFlBRk07QUFHTkMsbUJBQVcsRUFBRUQsWUFBWSxJQUFJakksc0RBQU8sQ0FBRThELE1BQUY7QUFIOUIsT0FBUDtBQUtBOztBQUNELFdBQU9pQyxPQUFQO0FBQ0EsR0FyQmMsRUFzQmYsQ0FBRW5JLFlBQUYsQ0F0QmUsQ0FBaEI7QUF3QkEsQ0F6QkQ7O0FBMkJldUssOEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDakRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBQ0E7QUFDQTtBQUVBLElBQU1wQyxPQUFPLEdBQUc7QUFDZnRHLGdCQUFjLEVBQUUsRUFERDtBQUVmMkksc0JBQW9CLEVBQUU7QUFGUCxDQUFoQjtBQUtBOzs7Ozs7Ozs7O0FBU0EsSUFBTTVJLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsR0FHM0I7QUFBQSxNQUZKVyxZQUVJLHVFQUZXLEVBRVg7QUFBQSxNQURKbUcsa0JBQ0ksdUVBRGlCLElBQ2pCO0FBQ0osU0FBT2pHLGlFQUFTLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQy9CLFFBQ0MsQ0FBRWdHLGtCQUFGLElBQ0EsQ0FBRXhGLEtBQUssQ0FBQ0MsT0FBTixDQUFlWixZQUFmLENBREYsSUFFQUgsc0RBQU8sQ0FBRUcsWUFBRixDQUhSLEVBSUU7QUFDRCxhQUFPNEYsT0FBUDtBQUNBOztBQUNELFFBQU1zQyxhQUFhLEdBQUdsSSxZQUFZLENBQUNtSSxHQUFiLENBQ3JCLFVBQUV0RixVQUFGO0FBQUEsYUFBa0JqRixzRkFBb0IsQ0FBRWlGLFVBQUYsRUFBYyxVQUFkLENBQXBCLEdBQ2pCQSxVQUFVLENBQUNoRixFQURNLEdBRWpCLElBRkQ7QUFBQSxLQURxQixDQUF0Qjs7QUFSK0Isa0JBYU1zQyxNQUFNLENBQUUsb0JBQUYsQ0FiWjtBQUFBLFFBYXZCaUksd0JBYnVCLFdBYXZCQSx3QkFidUI7O0FBQUEsbUJBY0dqSSxNQUFNLENBQUUsV0FBRixDQWRUO0FBQUEsUUFjdkI2RixxQkFkdUIsWUFjdkJBLHFCQWR1Qjs7QUFlL0IsUUFBTUssUUFBUSxHQUFHK0Isd0JBQXdCLENBQ3hDLFVBRHdDLEVBRXhDRixhQUZ3QyxFQUd4QyxRQUh3QyxDQUF6QztBQUtBLFFBQU01QixNQUFNLEdBQUdOLHFCQUFxQixDQUNuQyxvQkFEbUMsRUFFbkMsMEJBRm1DLEVBR25DLENBQUUsVUFBRixFQUFja0MsYUFBZCxFQUE2QixRQUE3QixDQUhtQyxDQUFwQztBQUtBLFdBQU87QUFDTjVJLG9CQUFjLEVBQUUrRyxRQURWO0FBRU40QiwwQkFBb0IsRUFBRTNCO0FBRmhCLEtBQVA7QUFJQSxHQTdCZSxFQTZCYixDQUFFdEcsWUFBRixFQUFnQm1HLGtCQUFoQixDQTdCYSxDQUFoQjtBQThCQSxDQWxDRDs7QUFvQ2U5RyxzRkFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Y0FFb0J5RSxNO0lBQVp1RSxPLFdBQUFBLE87O0FBRVIsSUFBTUMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFFdEosU0FBRixFQUFpQjtBQUFBLHFCQUNmM0IsbUVBQVcsQ0FBRSxvQkFBRixDQURJO0FBQUEsTUFDbkNrTCxlQURtQyxnQkFDbkNBLGVBRG1DOztBQUUzQyxTQUFPL0ssc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJFQUFFLGlCQUFRK0IsS0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ25CQywyRkFBZ0IsQ0FBRUQsS0FBRixDQUFoQjs7QUFEbUIsa0JBRVozQixzRkFBb0IsQ0FBRW9CLFNBQUYsRUFBYSxVQUFiLENBRlI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQSxrQkFLWnFKLE9BQU8sQ0FDYnRGLDhEQUFFLENBQ0Qsa0RBREMsRUFFRCxnQkFGQyxDQURXLENBTEs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFhbkJ3Riw2QkFBZSxDQUFFLFVBQUYsRUFBY3ZKLFNBQVMsQ0FBQ25CLEVBQXhCLENBQWY7O0FBYm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBbEI7QUFlQSxDQWpCRDs7QUFtQmV5SyxpRkFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFRQSxJQUFNRSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLEdBQU07QUFBQSxxQkFJL0JuTCxtRUFBVyxDQUFFLG9CQUFGLENBSm9CO0FBQUEsTUFFbENzSyx1QkFGa0MsZ0JBRWxDQSx1QkFGa0M7QUFBQSxNQUdsQ1ksZUFIa0MsZ0JBR2xDQSxlQUhrQzs7QUFLbkMsU0FBTy9LLHNFQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyRUFDakIsaUJBQVFHLGFBQVIsRUFBdUJGLFlBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDUUcsc0ZBQW9CLENBQUVELGFBQUYsRUFBaUIsT0FBakIsQ0FENUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsb0JBRVEsSUFBSW1GLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCx3REFDQSxzREFGQyxFQUdELGdCQUhDLENBREcsQ0FGUjs7QUFBQTtBQVVDNEUscUNBQXVCLENBQ3RCLFFBRHNCLEVBRXRCbEssWUFBWSxDQUFDSSxFQUZTLEVBR3RCLE9BSHNCLEVBSXRCRixhQUFhLENBQUNFLEVBSlEsQ0FBdkI7QUFNQTBLLDZCQUFlLENBQUUsT0FBRixFQUFXNUssYUFBYSxDQUFDRSxFQUF6QixDQUFmOztBQWhCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURpQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQW1CakIsRUFuQmlCLENBQWxCO0FBcUJBLENBMUJEOztBQTRCZTJLLG9GQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO2NBRW9CMUUsTTtJQUFadUUsTyxXQUFBQSxPOztBQUVSLElBQU1JLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBRWhMLFlBQUYsRUFBb0I7QUFBQSxxQkFDZEosbUVBQVcsQ0FBRSxvQkFBRixDQURHO0FBQUEsTUFDbENrTCxlQURrQyxnQkFDbENBLGVBRGtDOztBQUUxQyxTQUFPL0ssc0VBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQ1pJLHNGQUFvQixDQUFFSCxZQUFGLEVBQWdCLFFBQWhCLENBRFI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBRVosSUFBSXFGLEtBQUosQ0FDTEMsOERBQUUsQ0FDRCwwR0FEQyxFQUVELGdCQUZDLENBREcsQ0FGWTs7QUFBQTtBQVNuQixnQkFBS3NGLE9BQU8sQ0FDWHRGLDhEQUFFLENBQ0QsOENBREMsRUFFRCxnQkFGQyxDQURTLENBQVosRUFLSTtBQUNId0YsNkJBQWUsQ0FBRSxRQUFGLEVBQVk5SyxZQUFZLENBQUNJLEVBQXpCLENBQWY7QUFDQTs7QUFoQmtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUYsR0FBbEI7QUFrQkEsQ0FwQkQ7O0FBc0JlNEssNkVBQWYsRTs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsbUM7Ozs7Ozs7Ozs7O0FDcENBLHdCQUF3QiwyRUFBMkUsb0NBQW9DLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxvQ0FBb0MsOEhBQThILEdBQUcsRUFBRSxzQkFBc0I7O0FBRW5XO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Qjs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxhQUFvQjs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0RBLGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSx1Q0FBdUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F0RCxhQUFhLHdDQUF3QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXZELGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLHFDQUFxQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXBELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSxpQ0FBaUMsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28taG9va3MuODc1YzBkYTVhMWYxZDhjYmRmMWEuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9ob29rcy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQWRkUHJpY2VNb2RpZmllciB9IGZyb20gJy4vdXNlLWFkZC1wcmljZS1tb2RpZmllcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUJhc2VQcmljZVR5cGUgfSBmcm9tICcuL3VzZS1iYXNlLXByaWNlLXR5cGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDbG9uZUVudGl0aWVzIH0gZnJvbSAnLi91c2UtY2xvbmUtZW50aXRpZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDb3B5RGF0ZUVudGl0eSB9IGZyb20gJy4vdXNlLWNvcHktZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDb3B5VGlja2V0IH0gZnJvbSAnLi91c2UtY29weS10aWNrZXQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VDcmVhdGVEYXRlRW50aXR5IH0gZnJvbSAnLi91c2UtY3JlYXRlLWRhdGUtZW50aXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9uLWZvci1ldmVudC10by1ldmVudC1kYXRlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS10by10aWNrZXRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlSWRUb1RpY2tldElkcyB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLWV2ZW50LWRhdGUtaWQtdG8tdGlja2V0LWlkcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLWNyZWF0ZS1yZWxhdGlvbnMtZm9yLXRpY2tldC10by1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzIH1cblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUNyZWF0ZVRpY2tldEVudGl0eSB9IGZyb20gJy4vdXNlLWNyZWF0ZS10aWNrZXQtZW50aXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlRXZlbnQgfSBmcm9tICcuL3VzZS1ldmVudC1kYXRlLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlRXZlbnREYXRlVGlja2V0cyB9IGZyb20gJy4vdXNlLWV2ZW50LWRhdGUtdGlja2V0cyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RGF0ZXNGb3JFdmVudCB9IGZyb20gJy4vdXNlLWV2ZW50LWRhdGVzLWZvci1ldmVudCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50RWRpdG9yRXZlbnQgfSBmcm9tICcuL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXMgfVxuXHRmcm9tICcuL3VzZS1ldmVudC1lZGl0b3ItZXZlbnQtZGF0ZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudEVkaXRvclRpY2tldHMgfSBmcm9tICcuL3VzZS1ldmVudC1lZGl0b3ItdGlja2V0cyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZUV2ZW50Rm9yRXZlbnREYXRlIH0gZnJvbSAnLi91c2UtZXZlbnQtZm9yLWV2ZW50LWRhdGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VFdmVudFZlbnVlIH0gZnJvbSAnLi91c2UtZXZlbnQtdmVudWUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VQcmljZVR5cGVzIH0gZnJvbSAnLi91c2UtcHJpY2UtdHlwZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VSZW1vdmVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzIH1cblx0ZnJvbSAnLi91c2UtcmVtb3ZlLXJlbGF0aW9ucy1mb3ItZXZlbnQtZGF0ZS1pZC10by10aWNrZXQtaWRzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVGlja2V0RXZlbnREYXRlcyB9IGZyb20gJy4vdXNlLXRpY2tldC1ldmVudC1kYXRlcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRpY2tldFByaWNlcyB9IGZyb20gJy4vdXNlLXRpY2tldC1wcmljZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyB9XG5cdGZyb20gJy4vdXNlLXRpY2tldHMtZm9yLWV2ZW50LWRhdGVzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlVHJhc2hEYXRlRW50aXR5IH0gZnJvbSAnLi91c2UtdHJhc2gtZGF0ZS1lbnRpdHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VUcmFzaFByaWNlTW9kaWZpZXIgfSBmcm9tICcuL3VzZS10cmFzaC1wcmljZS1tb2RpZmllcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRyYXNoVGlja2V0IH0gZnJvbSAnLi91c2UtdHJhc2gtdGlja2V0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlUHJldmlvdXMgfSBmcm9tICcuL3VzZS1wcmV2aW91cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiB1c2VBZGRQcmljZU1vZGlmaWVyXG4gKiByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdHdvIGZ1bmN0aW9uczpcbiAqICAtIGFkZFByaWNlTW9kaWZpZXJcbiAqICAtIHRyYXNoUHJpY2VNb2RpZmllclxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZnVuY3Rpb25zXG4gKi9cbmNvbnN0IHVzZUFkZFByaWNlTW9kaWZpZXIgPSAoKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRjcmVhdGVFbnRpdHksXG5cdFx0Y3JlYXRlUmVsYXRpb24sXG5cdH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKFxuXHRcdGFzeW5jICggdGlja2V0RW50aXR5LCBwcm9wZXJ0aWVzICkgPT4ge1xuXHRcdFx0Y29uc3QgcHJpY2VNb2RpZmllciA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0cHJvcGVydGllc1xuXHRcdFx0KTtcblx0XHRcdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIHByaWNlTW9kaWZpZXIsICdwcmljZScgKSApIHtcblx0XHRcdFx0Y3JlYXRlUmVsYXRpb24oXG5cdFx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdFx0dGlja2V0RW50aXR5LmlkLFxuXHRcdFx0XHRcdCdwcmljZScsXG5cdFx0XHRcdFx0cHJpY2VNb2RpZmllclxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0W11cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUFkZFByaWNlTW9kaWZpZXI7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBmaW5kIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlUHJpY2VUeXBlcyBmcm9tICcuL3VzZS1wcmljZS10eXBlcyc7XG5cbmNvbnN0IHVzZUJhc2VQcmljZVR5cGUgPSAoKSA9PiB7XG5cdGNvbnN0IHsgcHJpY2VUeXBlcywgcHJpY2VUeXBlc0xvYWRlZCB9ID0gdXNlUHJpY2VUeXBlcygpO1xuXHRyZXR1cm4gdXNlTWVtbyhcblx0XHQoKSA9PiB7XG5cdFx0XHRpZiAoICEgcHJpY2VUeXBlc0xvYWRlZCApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmluZChcblx0XHRcdFx0cHJpY2VUeXBlcyxcblx0XHRcdFx0KCBwcmljZVR5cGUgKSA9PiBwcmljZVR5cGUuUEJUX0lEID09PSAxXG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0WyBwcmljZVR5cGVzLCBwcmljZVR5cGVzTG9hZGVkIF1cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUJhc2VQcmljZVR5cGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG5jb25zdCB1c2VDbG9uZUVudGl0aWVzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCBlbnRpdGllc1RvQ2xvbmUsIG1vZGVsTmFtZSApID0+IHtcblx0XHRjb25zdCBuZXdFbnRpdGllcyA9IFtdO1xuXHRcdGlmICggZW50aXRpZXNUb0Nsb25lICYmIG1vZGVsTmFtZSApIHtcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGVudGl0aWVzVG9DbG9uZS5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0Y29uc3QgbmV3Q2xvbmUgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0XHRcdGVudGl0aWVzVG9DbG9uZVsgaSBdLmZvckNsb25lXG5cdFx0XHRcdCk7XG5cdFx0XHRcdG5ld0VudGl0aWVzLnB1c2goIG5ld0Nsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBuZXdFbnRpdGllcztcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ2xvbmVFbnRpdGllcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby91dGlscyc7XG5pbXBvcnQgeyBfeCwgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZUV2ZW50RWRpdG9yRXZlbnQsIHVzZVRpY2tldHNGb3JFdmVudERhdGVzIH0gZnJvbSAnLi9pbmRleCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZVxuICogQHJldHVybiB7RnVuY3Rpb259IGZ1bmN0aW9uIGZvciBjb3B5aW5nIGFuIGV2ZW50IGRhdGUgZW50aXR5XG4gKi9cbmNvbnN0IHVzZUNvcHlEYXRlRW50aXR5ID0gKCBldmVudERhdGUgKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRjcmVhdGVFbnRpdHksXG5cdFx0Y3JlYXRlUmVsYXRpb25zLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHsgZXZlbnRFbnRpdHkgfSA9IHVzZUV2ZW50RWRpdG9yRXZlbnQoIGV2ZW50RGF0ZS5ldnRJZCApO1xuXHRjb25zdCB7IHRpY2tldEVudGl0aWVzIH0gPSB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyggWyBldmVudERhdGUgXSApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2sgKTtcblx0XHRpZiAoXG5cdFx0XHQhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudEVudGl0eSwgJ2V2ZW50JyApIHx8XG5cdFx0XHQhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3RXZlbnREYXRlID0gYXdhaXQgY3JlYXRlRW50aXR5KFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGV2ZW50RGF0ZS5mb3JDbG9uZVxuXHRcdCk7XG5cdFx0bmV3RXZlbnREYXRlLm5hbWUgPSBzcHJpbnRmKFxuXHRcdFx0X3goICclcyAtIENPUFknLCAnRXZlbnQgRGF0ZSBOYW1lIC0gQ09QWScsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdG5ld0V2ZW50RGF0ZS5uYW1lXG5cdFx0KTtcblx0XHRpZiAoICEgaXNFbXB0eSggdGlja2V0RW50aXRpZXMgKSApIHtcblx0XHRcdGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0bmV3RXZlbnREYXRlLmlkLFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0dGlja2V0RW50aXRpZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCdldmVudCcsXG5cdFx0XHRldmVudEVudGl0eS5pZCxcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRbIG5ld0V2ZW50RGF0ZSBdXG5cdFx0KTtcblx0XHRyZXR1cm4gbmV3RXZlbnREYXRlO1xuXHR9LCBbIGV2ZW50RW50aXR5LCB0aWNrZXRFbnRpdGllcyBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDb3B5RGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDbG9uZUVudGl0aWVzIGZyb20gJy4vdXNlLWNsb25lLWVudGl0aWVzJztcbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLWV2ZW50LWRhdGVzJztcbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlc1xuXHRmcm9tICcuL3VzZS1jcmVhdGUtcmVsYXRpb25zLWZvci10aWNrZXQtdG8tcHJpY2VzJztcblxuY29uc3QgZmFsc2VGdW5jID0gKCkgPT4gZmFsc2U7XG5cbmNvbnN0IHVzZUNvcHlUaWNrZXQgPSAoIHRpY2tldEVudGl0eSwgZGF0ZUVudGl0aWVzICkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZUVudGl0eSB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdGNvbnN0IHJlbGF0ZWRQcmljZXMgPSB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGNvbnN0IHsgZ2V0UmVsYXRlZEVudGl0aWVzIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0cmV0dXJuIGdldFJlbGF0ZWRFbnRpdGllcyggdGlja2V0RW50aXR5LCAncHJpY2VzJyApO1xuXHR9LCBbIHRpY2tldEVudGl0eSBdICk7XG5cdGNvbnN0IG5ld1ByaWNlcyA9IHVzZUNsb25lRW50aXRpZXMoIHJlbGF0ZWRQcmljZXMsICdwcmljZScgKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0RGF0ZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcygpO1xuXHRjb25zdCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyA9IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzKCk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlRnVuYztcblx0XHR9XG5cdFx0cmV0dXJuIGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IG5ld1RpY2tldCA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHRpY2tldEVudGl0eS5mb3JDbG9uZVxuXHRcdFx0KTtcblx0XHRcdHVwZGF0ZVRpY2tldERhdGVSZWxhdGlvbnMoIG5ld1RpY2tldCwgZGF0ZUVudGl0aWVzICk7XG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIG5ld1ByaWNlcyApICYmIG5ld1ByaWNlcy5sZW5ndGggKSB7XG5cdFx0XHRcdGF3YWl0IHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zKCBuZXdUaWNrZXQsIG5ld1ByaWNlcyApO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNvcHlUaWNrZXQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgU2VydmVyRGF0ZVRpbWUsIER1cmF0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB1c2VDcmVhdGVSZWxhdGlvbkZvckV2ZW50VG9FdmVudERhdGVcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9uLWZvci1ldmVudC10by1ldmVudC1kYXRlJztcblxuY29uc3QgdXNlQ3JlYXRlRGF0ZUVudGl0eSA9ICggZXZlbnQsIGNhY2hlTmV3RGF0ZSApID0+IHtcblx0Y29uc3QgeyBjcmVhdGVFbnRpdHkgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRjb25zdCB1cGRhdGVFdmVudERhdGVSZWxhdGlvbiA9IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZSgpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3Qgbm93SnMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0bm93SnMuc2V0SG91cnMoXG5cdFx0XHRcdG5vd0pzLmdldEhvdXJzKCksXG5cdFx0XHRcdE1hdGguY2VpbCggbm93SnMuZ2V0TWludXRlcygpIC8gMTUgKSAqIDE1LFxuXHRcdFx0XHQwLFxuXHRcdFx0XHQwXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgbm93ID0gU2VydmVyRGF0ZVRpbWUuZnJvbUpTRGF0ZSggbm93SnMgKTtcblx0XHRcdGNvbnN0IG5ld0RhdGUgPSBhd2FpdCBjcmVhdGVFbnRpdHkoXG5cdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRFVlRfSUQ6IGV2ZW50LmlkLFxuXHRcdFx0XHRcdERUVF9uYW1lOiAnJyxcblx0XHRcdFx0XHREVFRfZGVzY3JpcHRpb246ICcnLFxuXHRcdFx0XHRcdERUVF9FVlRfc3RhcnQ6IG5vdy5wbHVzKFxuXHRcdFx0XHRcdFx0RHVyYXRpb24uZnJvbU9iamVjdCggeyBkYXlzOiAzMCB9IClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdERUVF9FVlRfZW5kOiBub3cucGx1cyhcblx0XHRcdFx0XHRcdER1cmF0aW9uLmZyb21PYmplY3QoIHsgZGF5czogMzAsIGhvdXJzOiAyIH0gKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0RFRUX3JlZ19saW1pdDogLTEsXG5cdFx0XHRcdFx0RFRUX3NvbGQ6IDAsXG5cdFx0XHRcdFx0RFRUX3Jlc2VydmVkOiAwLFxuXHRcdFx0XHRcdERUVF9vcmRlcjogMCxcblx0XHRcdFx0XHREVFRfcGFyZW50OiAwLFxuXHRcdFx0XHRcdERUVF9kZWxldGVkOiBmYWxzZSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHVwZGF0ZUV2ZW50RGF0ZVJlbGF0aW9uKCBldmVudCwgbmV3RGF0ZSApO1xuXHRcdFx0Y2FjaGVOZXdEYXRlKCBuZXdEYXRlICk7XG5cdFx0fSxcblx0XHRbIGV2ZW50LCBjYWNoZU5ld0RhdGUgXVxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlRGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBUaGlzIGN1c3RvbSBob29rIHJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nXG4gKiBhbiBldmVudCAtPiBkYXRlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGV2ZW50IGVudGl0eSBhbmQgZGF0ZSBlbnRpdHkuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIGV2ZW50IGVudGl0eVxuICogIC0gIGV2ZW50IGRhdGUgZW50aXR5XG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgZXZlbnQgZGF0ZSByZWxhdGlvbi5cbiAqL1xuY29uc3QgdXNlQ3JlYXRlUmVsYXRpb25Gb3JFdmVudFRvRXZlbnREYXRlID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9uIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGV2ZW50RW50aXR5LCBkYXRlRW50aXR5ICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnRFbnRpdHksICdldmVudCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIEV2ZW50IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZGF0ZUVudGl0eSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgRGF0ZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gY3JlYXRlUmVsYXRpb24oXG5cdFx0XHQnZXZlbnQnLFxuXHRcdFx0ZXZlbnRFbnRpdHkuaWQsXG5cdFx0XHQnZGF0ZXRpbWUnLFxuXHRcdFx0ZGF0ZUVudGl0eVxuXHRcdCk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUNyZWF0ZVJlbGF0aW9uRm9yRXZlbnRUb0V2ZW50RGF0ZTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhbiBldmVudCBkYXRlIGVudGl0eSBhbmQgb25lIG9yIG1vcmUgdGlja2V0IGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudERhdGVJZCBJRCBmb3IgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqICAtICB0aWNrZXRJZHMgYXJyYXkgb2YgdGlja2V0IGVudGl0eSBJRHNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHMgPSAoKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlUmVsYXRpb25zIH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgeyBnZXRFbnRpdGllc0J5SWRzIH0gPSB1c2VTZWxlY3QoXG5cdFx0KCBzZWxlY3QgKSA9PiBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICksXG5cdFx0W11cblx0KTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCBhc3luYyAoIGV2ZW50RGF0ZUlkLCB0aWNrZXRJZHMgKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCBhc3luYyAoIHJlc29sdmUgKSA9PiB7XG5cdFx0XHRsZXQgdGlja2V0cyA9IGF3YWl0IGdldEVudGl0aWVzQnlJZHMoICd0aWNrZXQnLCB0aWNrZXRJZHMgKTtcblx0XHRcdHRpY2tldHMgPSBBcnJheS5pc0FycmF5KCB0aWNrZXRzICkgPyB0aWNrZXRzIDogWyB0aWNrZXRzIF07XG5cdFx0XHR0aWNrZXRzLmZvckVhY2goICggdGlja2V0ICkgPT4ge1xuXHRcdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRcdGV2ZW50RGF0ZUlkLFxuXHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0dGlja2V0cyxcblx0XHRcdCk7XG5cdFx0XHRyZXNvbHZlKCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhbiBldmVudCBkYXRlIGVudGl0eSBhbmQgb25lIG9yIG1vcmUgdGlja2V0IGVudGl0aWVzLlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAqICAtICBldmVudERhdGUgZW50aXR5XG4gKiAgLSAgdGlja2V0cyBhcnJheSBvZiB0aWNrZXQgZW50aXRpZXNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZVRvVGlja2V0cyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggZXZlbnREYXRlLCB0aWNrZXRzICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdF9fKFxuXHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBFdmVudCBEYXRlIEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHRpY2tldHMgPSBBcnJheS5pc0FycmF5KCB0aWNrZXRzICkgPyB0aWNrZXRzIDogWyB0aWNrZXRzIF07XG5cdFx0dGlja2V0cy5mb3JFYWNoKCAoIHRpY2tldCApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0LCAndGlja2V0JyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdGF3YWl0IGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCdkYXRldGltZScsXG5cdFx0XHRldmVudERhdGUsXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldHMsXG5cdFx0KTtcblx0fSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yRXZlbnREYXRlVG9UaWNrZXRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBoYW5kbGluZyB0aGUgZGlzcGF0Y2ggZXZlbnQgZm9yIHVwZGF0aW5nIHJlbGF0aW9uc1xuICogYmV0d2VlbiBhIHRpY2tldCBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIGV2ZW50IGRhdGUgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIHRpY2tldCBlbnRpdHlcbiAqICAtICBldmVudERhdGVzIGFycmF5IG9mIGV2ZW50IGRhdGUgZW50aXRpZXNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvRXZlbnREYXRlcyA9ICgpID0+IHtcblx0Y29uc3QgeyBjcmVhdGVSZWxhdGlvbnMgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggdGlja2V0LCBldmVudERhdGVzICkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0LCAndGlja2V0JyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIGNyZWF0ZSByZWxhdGlvbiBiZWNhdXNlIGFuIGludmFsaWQgVGlja2V0IEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGV2ZW50RGF0ZXMgPSBBcnJheS5pc0FycmF5KCBldmVudERhdGVzICkgPyBldmVudERhdGVzIDogWyBldmVudERhdGVzIF07XG5cdFx0ZXZlbnREYXRlcy5mb3JFYWNoKCAoIGV2ZW50RGF0ZSApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggZXZlbnREYXRlLCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBFdmVudCBEYXRlIEVudGl0eSB3YXMgc3VwcGxpZWQuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdGF3YWl0IGNyZWF0ZVJlbGF0aW9ucyhcblx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0dGlja2V0LmlkLFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGV2ZW50RGF0ZXNcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb0V2ZW50RGF0ZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGhhbmRsaW5nIHRoZSBkaXNwYXRjaCBldmVudCBmb3IgdXBkYXRpbmcgcmVsYXRpb25zXG4gKiBiZXR3ZWVuIGEgdGlja2V0IGVudGl0eSBhbmQgb25lIG9yIG1vcmUgcHJpY2UgZW50aXRpZXMuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICogIC0gIHRpY2tldCBlbnRpdHlcbiAqICAtICBwcmljZXMgYXJyYXkgb2YgcHJpY2UgZW50aXRpZXNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gIEEgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSB0aWNrZXQgcmVsYXRpb24uXG4gKi9cbmNvbnN0IHVzZUNyZWF0ZVJlbGF0aW9uc0ZvclRpY2tldFRvUHJpY2VzID0gKCkgPT4ge1xuXHRjb25zdCB7IGNyZWF0ZVJlbGF0aW9ucyB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCB0aWNrZXQsIHByaWNlcyApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldCwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0X18oXG5cdFx0XHRcdFx0J1VuYWJsZSB0byBjcmVhdGUgcmVsYXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRwcmljZXMgPSBBcnJheS5pc0FycmF5KCBwcmljZXMgKSA/IHByaWNlcyA6IFsgcHJpY2VzIF07XG5cdFx0cHJpY2VzLmZvckVhY2goICggcHJpY2UgKSA9PiB7XG5cdFx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHByaWNlLCAncHJpY2UnICkgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdCdVbmFibGUgdG8gY3JlYXRlIHJlbGF0aW9uIGJlY2F1c2UgYW4gaW52YWxpZCBQcmljZSBFbnRpdHkgd2FzIHN1cHBsaWVkLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRhd2FpdCBjcmVhdGVSZWxhdGlvbnMoXG5cdFx0XHQndGlja2V0Jyxcblx0XHRcdHRpY2tldC5pZCxcblx0XHRcdCdwcmljZScsXG5cdFx0XHRwcmljZXNcblx0XHQpO1xuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQge1xuXHREdXJhdGlvbixcblx0U2VydmVyRGF0ZVRpbWUsXG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuXG5jb25zdCB1c2VySUQgPSB0eXBlb2Ygd2luZG93LnVzZXJTZXR0aW5ncyA9PT0gJ29iamVjdCcgJiZcblx0d2luZG93LnVzZXJTZXR0aW5ncy51aWQgP1xuXHRwYXJzZUludCggd2luZG93LnVzZXJTZXR0aW5ncy51aWQsIDEwICkgOlxuXHRudWxsO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdXNlQ3JlYXRlUmVsYXRpb25zRm9yVGlja2V0VG9QcmljZXNcblx0ZnJvbSAnLi91c2UtY3JlYXRlLXJlbGF0aW9ucy1mb3ItdGlja2V0LXRvLXByaWNlcyc7XG5cbmNvbnN0IHVzZUNyZWF0ZVRpY2tldEVudGl0eSA9ICggY2FjaGVOZXdUaWNrZXQsIGJhc2VQcmljZVR5cGUgKSA9PiB7XG5cdGNvbnN0IHsgY3JlYXRlRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0Y29uc3QgdXBkYXRlVGlja2V0UHJpY2VSZWxhdGlvbnMgPSB1c2VDcmVhdGVSZWxhdGlvbnNGb3JUaWNrZXRUb1ByaWNlcygpO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soXG5cdFx0YXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3Qgbm93SnMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0bm93SnMuc2V0SG91cnMoXG5cdFx0XHRcdG5vd0pzLmdldEhvdXJzKCksXG5cdFx0XHRcdE1hdGguY2VpbCggbm93SnMuZ2V0TWludXRlcygpIC8gMTUgKSAqIDE1LFxuXHRcdFx0XHQwLFxuXHRcdFx0XHQwXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3Qgbm93ID0gU2VydmVyRGF0ZVRpbWUuZnJvbUpTRGF0ZSggbm93SnMgKTtcblx0XHRcdGNvbnN0IG5ld1RpY2tldCA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3RpY2tldCcsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRUS1RfbmFtZTogJycsXG5cdFx0XHRcdFx0VEtUX2Rlc2NyaXB0aW9uOiAnJyxcblx0XHRcdFx0XHRUS1RfcXR5OiAtMSxcblx0XHRcdFx0XHRUS1Rfc29sZDogMCxcblx0XHRcdFx0XHRUS1RfcmVzZXJ2ZWQ6IDAsXG5cdFx0XHRcdFx0VEtUX3VzZXM6IC0xLFxuXHRcdFx0XHRcdFRLVF9yZXF1aXJlZDogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX21pbjogMCxcblx0XHRcdFx0XHRUS1RfbWF4OiAtMSxcblx0XHRcdFx0XHRUS1RfcHJpY2U6IG5ldyBNb25leSggMCwgU2l0ZUN1cnJlbmN5ICksXG5cdFx0XHRcdFx0VEtUX3N0YXJ0RGF0ZTogbm93LFxuXHRcdFx0XHRcdFRLVF9lbmREYXRlOiBub3cucGx1cyhcblx0XHRcdFx0XHRcdER1cmF0aW9uLmZyb21PYmplY3QoIHsgZGF5czogMzAgfSApXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRUS1RfdGF4YWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX29yZGVyOiAwLFxuXHRcdFx0XHRcdFRLVF9pc0RlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFRLVF9yZXZlcnNlX2NhbGN1bGF0ZTogZmFsc2UsXG5cdFx0XHRcdFx0VEtUX3dwX3VzZXI6IHVzZXJJRCxcblx0XHRcdFx0XHRUS1RfcGFyZW50OiAwLFxuXHRcdFx0XHRcdFRLVF9kZWxldGVkOiBmYWxzZSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IG5ld0Jhc2VQcmljZSA9IGF3YWl0IGNyZWF0ZUVudGl0eShcblx0XHRcdFx0J3ByaWNlJyxcblx0XHRcdFx0eyBQUlRfSUQ6IGJhc2VQcmljZVR5cGUuaWQgfVxuXHRcdFx0KTtcblx0XHRcdGF3YWl0IHVwZGF0ZVRpY2tldFByaWNlUmVsYXRpb25zKCBuZXdUaWNrZXQsIFsgbmV3QmFzZVByaWNlIF0gKTtcblx0XHRcdGNhY2hlTmV3VGlja2V0KCBuZXdUaWNrZXQgKTtcblx0XHR9LFxuXHRcdFsgY3JlYXRlRW50aXR5LCB1cGRhdGVUaWNrZXRQcmljZVJlbGF0aW9ucyBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VDcmVhdGVUaWNrZXRFbnRpdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdGV2ZW50OiBbXSxcblx0ZXZlbnRMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIGV2ZW50IGVudGl0eVxuICogZm9yIHRoZSBnaXZlbiBkYXRlIGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudERhdGUgIGFuIGV2ZW50IGRhdGUgZW50aXR5XG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGV2ZW50IGZvciB0aGUgc3VwcGxpZWQgZXZlbnQgZGF0ZVxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudERhdGVFdmVudCA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWUgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGxldCBldmVudCA9IGdldFJlbGF0ZWRFbnRpdGllcyggZXZlbnREYXRlLCAnZXZlbnQnICk7XG5cdFx0Y29uc3QgZXZlbnRMb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnREYXRlLCAnZXZlbnQnIF1cblx0XHQpO1xuXHRcdGlmICggZXZlbnRMb2FkZWQgKSB7XG5cdFx0XHRldmVudCA9IEFycmF5LmlzQXJyYXkoIGV2ZW50ICkgJiYgZXZlbnRbIDAgXSAmJlxuXHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50WyAwIF0sICdldmVudCcgKSA/XG5cdFx0XHRcdGV2ZW50WyAwIF0gOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZXZlbnQsXG5cdFx0XHRcdGV2ZW50TG9hZGVkLFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIERFRkFVTFQ7XG5cdH0sIFsgZXZlbnREYXRlIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZUV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHR0aWNrZXRzOiBbXSxcblx0dGlja2V0c0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIHJlYWN0IGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0ZWQgdGlja2V0IGVudGl0aWVzIGZvciB0aGUgZ2l2ZW5cbiAqIGRhdGUgZW50aXR5IGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50RGF0ZSAgQSBkYXRldGltZSBCYXNlRW50aXR5IGluc3RhbmNlLlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHRpY2tldHNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlVGlja2V0cyA9ICggZXZlbnREYXRlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWUgZW50aXR5Lidcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gREVGQVVMVDtcblx0XHR9XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IHRpY2tldHMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50RGF0ZSwgJ3RpY2tldCcgKTtcblx0XHRjb25zdCB0aWNrZXRzTG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnREYXRlLCAndGlja2V0JyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGlja2V0cyxcblx0XHRcdHRpY2tldHNMb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBldmVudERhdGUgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnREYXRlVGlja2V0cztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0cy5cbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7IGRhdGVFbnRpdGllczogW10sIGRhdGVFbnRpdGllc0xvYWRlZDogZmFsc2UgfTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiBldmVudCBkYXRlIGVudGl0aWVzIGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGV2ZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV2ZW50TG9hZGVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnREYXRlc0ZvckV2ZW50ID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZW50aXRpZXMgPSBnZXRSZWxhdGVkRW50aXRpZXMoIGV2ZW50LCAnZGF0ZXRpbWUnLCAnZXZlbnQnICk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFsgZXZlbnQsICdkYXRldGltZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGVFbnRpdGllczogZW50aXRpZXMsXG5cdFx0XHRkYXRlRW50aXRpZXNMb2FkZWQ6IGxvYWRlZCxcblx0XHR9O1xuXHR9LCBbIGV2ZW50IF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50RGF0ZXNGb3JFdmVudDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRldmVudERhdGVzOiBbXSxcblx0ZXZlbnREYXRlc0xvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyBhbGwgdGhlIGRhdGUgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZCAgIHRydWUgaWYgZXZlbnQgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50RGF0ZXMgPSAoIGV2ZW50TG9hZGVkID0gdHJ1ZSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0aWYgKCAhIGV2ZW50TG9hZGVkICkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fVxuXHRcdGNvbnN0IHsgZ2V0RW50aXRpZXNGb3JNb2RlbCB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IGV2ZW50RGF0ZXMgPSBnZXRFbnRpdGllc0Zvck1vZGVsKCAnZGF0ZXRpbWUnICk7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoIGV2ZW50RGF0ZXMgKSAmJiBldmVudERhdGVzLmxlbmd0aCA/XG5cdFx0XHR7XG5cdFx0XHRcdGV2ZW50RGF0ZXMsXG5cdFx0XHRcdGV2ZW50RGF0ZXNMb2FkZWQ6IHRydWUsXG5cdFx0XHR9IDpcblx0XHRcdERFRkFVTFQ7XG5cdH0sIFsgZXZlbnRMb2FkZWQgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JFdmVudERhdGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgYW4gZXZlbnQgdmlhIHRoZSBzdXBwbGllZCBJRFxuICogaWYgbm8gSUQgaXMgc3VwcGxpZWQsIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBldmVudCBpbiB0aGUgc3RvcmVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAgIGV2ZW50IGVudGl0eSBJRFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBldmVudCBlbnRpdHkgZm9yIHRoZSBzdXBwbGllZCBJRFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudEVkaXRvckV2ZW50ID0gKCBldmVudElkID0gMCApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0bGV0IGVudGl0eTtcblx0XHRpZiAoIGV2ZW50SWQgPT09IDAgKSB7XG5cdFx0XHRjb25zdCB7IGdldEV2ZW50cyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdFx0ZW50aXR5ID0gZ2V0RXZlbnRzKCBldmVudElkICk7XG5cdFx0XHRlbnRpdHkgPSBBcnJheS5pc0FycmF5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIDAgXSA/XG5cdFx0XHRcdGVudGl0eVsgMCBdIDpcblx0XHRcdFx0bnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgeyBnZXRFdmVudEJ5SWQgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRcdGVudGl0eSA9IGdldEV2ZW50QnlJZCggZXZlbnRJZCApO1xuXHRcdH1cblx0XHRjb25zdCBsb2FkZWQgPSBpc01vZGVsRW50aXR5T2ZNb2RlbCggZW50aXR5LCAnZXZlbnQnICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGV2ZW50RW50aXR5OiBlbnRpdHksXG5cdFx0XHRldmVudEVudGl0eUxvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnRJZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VFdmVudEVkaXRvckV2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIGFsbCB0aGUgdGlja2V0IGVudGl0aWVzXG4gKiBjdXJyZW50bHkgaW4gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBkYXRhIHN0b3JlLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiB0aWNrZXRzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZUV2ZW50RWRpdG9yVGlja2V0cyA9ICgpID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdFx0Y29uc3QgeyBnZXRFbnRpdGllc0Zvck1vZGVsIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0Y29uc3QgdGlja2V0cyA9IGdldEVudGl0aWVzRm9yTW9kZWwoICd0aWNrZXQnICk7XG5cdFx0cmV0dXJuIHsgdGlja2V0cyB9O1xuXHR9LCBbXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRFZGl0b3JUaWNrZXRzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB1c2VFdmVudEVkaXRvckV2ZW50IGZyb20gJy4vdXNlLWV2ZW50LWVkaXRvci1ldmVudCc7XG5cbi8qKlxuICogQSBob29rIGZvciByZXRyaWV2aW5nIHRoZSBldmVudCBmb3IgdGhlIHN1cHBsaWVkIGV2ZW50IGRhdGVcbiAqIHdpbGwgZGVmYXVsdCB0byB0aGUgY3VycmVudGx5IGxvYWRlZCBldmVudCBmb3IgdGhlIGVkaXRvclxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZXZlbnREYXRlICAgZXZlbnQgZGF0ZSBlbnRpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgZXZlbnQgZW50aXR5IGZvciB0aGUgc3VwcGxpZWQgSURcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlRXZlbnRGb3JFdmVudERhdGUgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0Y29uc3QgZXZlbnRJZCA9IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudERhdGUsICdkYXRldGltZScgKSA/XG5cdFx0ZXZlbnREYXRlLmV2dElkIDpcblx0XHQwO1xuXHRyZXR1cm4gdXNlRXZlbnRFZGl0b3JFdmVudCggZXZlbnRJZCApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlRXZlbnRGb3JFdmVudERhdGU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHZlbnVlRW50aXR5OiBudWxsLFxuXHR2ZW51ZUVudGl0eUxvYWRlZDogZmFsc2UsXG59O1xuXG4vKipcbiAqIEEgY3VzdG9tIGhvb2sgZm9yIHJldHJpZXZpbmcgdGhlIHZlbnVlIHJlbGF0ZWQgdG8gdGhlIGdpdmVuIGV2ZW50XG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBldmVudCAgQW4gaW5zdGFuY2Ugb2YgYW4gZXZlbnQgZW50aXR5LlxuICogQHBhcmFtIHtib29sZWFufSBldmVudExvYWRlZFxuICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSB2ZW51ZSBlbnRpdHkgZm9yIHRoZSBwcm92aWRlZCBldmVudFxuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VFdmVudFZlbnVlID0gKCBldmVudCwgZXZlbnRMb2FkZWQgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgKFxuXHRcdFx0ZXZlbnRMb2FkZWQgJiZcblx0XHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBldmVudCwgJ2V2ZW50JyApXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7XG5cdFx0XHRnZXRSZWxhdGVkRW50aXRpZXMsXG5cdFx0XHRoYXNGaW5pc2hlZFJlc29sdXRpb24sXG5cdFx0fSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRsZXQgZW50aXR5ID0gZ2V0UmVsYXRlZEVudGl0aWVzKCBldmVudCwgJ3ZlbnVlJyApO1xuXHRcdGNvbnN0IGxvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0WyBldmVudCwgJ3ZlbnVlJyBdXG5cdFx0KTtcblx0XHRlbnRpdHkgPSBBcnJheS5pc0FycmF5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIDAgXSAmJlxuXHRcdGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBlbnRpdHlbIDAgXSwgJ3ZlbnVlJyApID9cblx0XHRcdGVudGl0eVsgMCBdIDpcblx0XHRcdG51bGw7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZlbnVlRW50aXR5OiBlbnRpdHksXG5cdFx0XHR2ZW51ZUVudGl0eUxvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFsgZXZlbnQsIGV2ZW50TG9hZGVkIF0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUV2ZW50VmVudWU7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEEgaG9vayB0byBnZXQgdGhlIHByZXZpb3VzIHByb3BzIG9yIHN0YXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfG51bWJlcn0gdmFsdWUgVGhlIGN1cnJlbnQgdmFsdWUuXG4gKiBAcmV0dXJuIHtPYmplY3R8c3RyaW5nfG51bWJlcn0gLSB0aGUgcHJldmlvdXMgdmFsdWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKCB2YWx1ZSApID0+IHtcblx0Y29uc3QgcmVmID0gdXNlUmVmKCk7XG5cdHVzZUVmZmVjdCggKCkgPT4ge1xuXHRcdHJlZi5jdXJyZW50ID0gdmFsdWU7XG5cdH0gKTtcblx0cmV0dXJuIHJlZi5jdXJyZW50O1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEEgaG9vayBmb3IgcmV0cmlldmluZyBhbGwgdGhlIHByaWNlX3R5cGUgZW50aXRpZXNcbiAqIGN1cnJlbnRseSBpbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIGRhdGEgc3RvcmUuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIGFuIGFycmF5IG9mIHByaWNlIHR5cGVzXG4gKiAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGxvYWRpbmcgaXMgY29tcGxldGVkXG4gKi9cbmNvbnN0IHVzZVByaWNlVHlwZXMgPSAoKSA9PiB7XG5cdHJldHVybiB1c2VTZWxlY3QoICggc2VsZWN0ICkgPT4ge1xuXHRcdGNvbnN0IHsgZ2V0RW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vbGlzdHMnICk7XG5cdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRjb25zdCBlbnRpdGllcyA9IGdldEVudGl0aWVzKCAncHJpY2VfdHlwZScgKTtcblx0XHRjb25zdCBsb2FkZWQgPSBoYXNGaW5pc2hlZFJlc29sdXRpb24oXG5cdFx0XHQnZXZlbnRlc3ByZXNzby9saXN0cycsXG5cdFx0XHQnZ2V0RW50aXRpZXMnLFxuXHRcdFx0WyAncHJpY2VfdHlwZScgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHByaWNlVHlwZXM6IGVudGl0aWVzLFxuXHRcdFx0cHJpY2VUeXBlc0xvYWRlZDogbG9hZGVkLFxuXHRcdH07XG5cdH0sIFtdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VQcmljZVR5cGVzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gaGFuZGxpbmcgdGhlIGRpc3BhdGNoIGV2ZW50IGZvciByZW1vdmluZyByZWxhdGlvbnNcbiAqIGJldHdlZW4gYW4gZXZlbnQgZGF0ZSBlbnRpdHkgYW5kIG9uZSBvciBtb3JlIHRpY2tldCBlbnRpdGllcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gKiAgLSAgZXZlbnREYXRlSWQgSUQgZm9yIGV2ZW50IGRhdGUgZW50aXR5XG4gKiAgLSAgdGlja2V0SWRzIGFycmF5IG9mIHRpY2tldCBlbnRpdHkgSURzXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259ICBBIGZ1bmN0aW9uIGZvciB1cGRhdGluZyB0aGUgdGlja2V0IHJlbGF0aW9uLlxuICovXG5jb25zdCB1c2VSZW1vdmVSZWxhdGlvbnNGb3JFdmVudERhdGVJZFRvVGlja2V0SWRzID0gKCkgPT4ge1xuXHRjb25zdCB7IHJlbW92ZVJlbGF0aW9uRm9yRW50aXR5IH0gPSB1c2VEaXNwYXRjaCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0cmV0dXJuIHVzZUNhbGxiYWNrKCAoIGV2ZW50RGF0ZUlkLCB0aWNrZXRJZHMgKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUgKSA9PiB7XG5cdFx0XHR0aWNrZXRJZHMuZm9yRWFjaCggYXN5bmMgKCB0aWNrZXRJZCApID0+IHtcblx0XHRcdFx0YXdhaXQgcmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHkoXG5cdFx0XHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdFx0XHRldmVudERhdGVJZCxcblx0XHRcdFx0XHQndGlja2V0Jyxcblx0XHRcdFx0XHR0aWNrZXRJZCxcblx0XHRcdFx0KTtcblx0XHRcdH0gKTtcblx0XHRcdHJlc29sdmUoIHRydWUgKTtcblx0XHR9ICk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVJlbW92ZVJlbGF0aW9uc0ZvckV2ZW50RGF0ZUlkVG9UaWNrZXRJZHM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdGV2ZW50RGF0ZXM6IFtdLFxuXHRldmVudERhdGVzTG9hZGVkOiBmYWxzZSxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCBldmVudCBkYXRlIGVudGl0aWVzXG4gKiBmb3IgdGhlIGdpdmVuIHRpY2tldCBlbnRpdHkgZnJvbSB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gdGlja2V0RW50aXR5ICBBIGRhdGV0aW1lIEJhc2VFbnRpdHkgaW5zdGFuY2UuXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gYW4gYXJyYXkgb2YgZXZlbnQgZGF0ZXNcbiAqICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqL1xuY29uc3QgdXNlVGlja2V0RXZlbnREYXRlcyA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhIHZhbGlkIHRpY2tldCBlbnRpdHkuJ1xuXHRcdFx0KTtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCB7IGdldFJlbGF0ZWRFbnRpdGllcyB9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0Y29uc3QgZXZlbnREYXRlcyA9IGdldFJlbGF0ZWRFbnRpdGllcyggdGlja2V0RW50aXR5LCAnZGF0ZXRpbWUnICk7XG5cdFx0Y29uc3QgZXZlbnREYXRlc0xvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdCdldmVudGVzcHJlc3NvL2NvcmUnLFxuXHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRbIHRpY2tldEVudGl0eSwgJ2RhdGV0aW1lJyBdXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZXZlbnREYXRlcyxcblx0XHRcdGV2ZW50RGF0ZXNMb2FkZWQsXG5cdFx0fTtcblx0fSwgWyB0aWNrZXRFbnRpdHkgXSApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVGlja2V0RXZlbnREYXRlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHVzZVNlbGVjdCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBERUZBVUxUID0ge1xuXHRwcmljZXM6IFtdLFxuXHRwcmljZXNMb2FkZWQ6IGZhbHNlLFxuXHRub0Jhc2VQcmljZTogbnVsbCxcbn07XG5cbi8qKlxuICogQSBjdXN0b20gcmVhY3QgaG9vayBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRlZCBwcmljZXMgZW50aXRpZXNcbiAqIGZvciB0aGUgZ2l2ZW4gdGlja2V0IGVudGl0eSBmcm9tIHRoZSBldmVudGVzcHJlc3NvL2NvcmUgc3RvcmUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSAgdGlja2V0RW50aXR5XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAtIGFuIGFycmF5IG9mIHByaWNlcyBiZWxvbmdpbmcgdG8gdGhlIGdpdmVuIHRpY2tldFxuICogICAgICAgICAgICAgICAgICAgICAgLSBib29sZWFuIGluZGljYXRpbmcgaWYgbG9hZGluZyBpcyBjb21wbGV0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGFic2VuY2Ugb2YgYmFzZSBwcmljZVxuICovXG5jb25zdCB1c2VUaWNrZXRQcmljZXMgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0cmV0dXJuIHVzZVNlbGVjdChcblx0XHQoIHNlbGVjdCApID0+IHtcblx0XHRcdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgJ3RpY2tldCcgKSApIHtcblx0XHRcdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRcdFx0Y29uc3QgeyBoYXNGaW5pc2hlZFJlc29sdXRpb24gfSA9IHNlbGVjdCggJ2NvcmUvZGF0YScgKTtcblx0XHRcdFx0Y29uc3QgcHJpY2VzID0gZ2V0UmVsYXRlZEVudGl0aWVzKFxuXHRcdFx0XHRcdHRpY2tldEVudGl0eSxcblx0XHRcdFx0XHQncHJpY2UnXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGNvbnN0IHByaWNlc0xvYWRlZCA9IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbihcblx0XHRcdFx0XHQnZXZlbnRlc3ByZXNzby9jb3JlJyxcblx0XHRcdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzJyxcblx0XHRcdFx0XHRbIHRpY2tldEVudGl0eSwgJ3ByaWNlJyBdXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cHJpY2VzLFxuXHRcdFx0XHRcdHByaWNlc0xvYWRlZCxcblx0XHRcdFx0XHRub0Jhc2VQcmljZTogcHJpY2VzTG9hZGVkICYmIGlzRW1wdHkoIHByaWNlcyApLFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIERFRkFVTFQ7XG5cdFx0fSxcblx0XHRbIHRpY2tldEVudGl0eSBdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUaWNrZXRQcmljZXM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IERFRkFVTFQgPSB7XG5cdHRpY2tldEVudGl0aWVzOiBbXSxcblx0dGlja2V0RW50aXRpZXNMb2FkZWQ6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBBIGN1c3RvbSByZWFjdCBob29rIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGVkIHRpY2tldCBlbnRpdGllc1xuICogZm9yIHRoZSBnaXZlbiBldmVudCBkYXRlIGVudGl0aWVzIGZyb20gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHlbXX0gZGF0ZUVudGl0aWVzICBhcnJheSBvZiBldmVudCBkYXRlIGVudGl0aWVzLlxuICogQHBhcmFtIHtib29sZWFufSBkYXRlRW50aXRpZXNMb2FkZWQgIHRydWUgaWYgYWxsIGV2ZW50IGRhdGVzIGFyZSBsb2FkZWRcbiAqIEByZXR1cm4ge09iamVjdH0gLSBhbiBhcnJheSBvZiBldmVudCBkYXRlc1xuICogICAgICAgICAgICAgICAgICAtIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBsb2FkaW5nIGlzIGNvbXBsZXRlZFxuICovXG5jb25zdCB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcyA9IChcblx0ZGF0ZUVudGl0aWVzID0gW10sXG5cdGRhdGVFbnRpdGllc0xvYWRlZCA9IHRydWVcbikgPT4ge1xuXHRyZXR1cm4gdXNlU2VsZWN0KCAoIHNlbGVjdCApID0+IHtcblx0XHRpZiAoXG5cdFx0XHQhIGRhdGVFbnRpdGllc0xvYWRlZCB8fFxuXHRcdFx0ISBBcnJheS5pc0FycmF5KCBkYXRlRW50aXRpZXMgKSB8fFxuXHRcdFx0aXNFbXB0eSggZGF0ZUVudGl0aWVzIClcblx0XHQpIHtcblx0XHRcdHJldHVybiBERUZBVUxUO1xuXHRcdH1cblx0XHRjb25zdCBkYXRlRW50aXR5SWRzID0gZGF0ZUVudGl0aWVzLm1hcChcblx0XHRcdCggZGF0ZUVudGl0eSApID0+IGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBkYXRlRW50aXR5LCAnZGF0ZXRpbWUnICkgP1xuXHRcdFx0XHRkYXRlRW50aXR5LmlkIDpcblx0XHRcdFx0bnVsbFxuXHRcdCk7XG5cdFx0Y29uc3QgeyBnZXRSZWxhdGVkRW50aXRpZXNGb3JJZHMgfSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vY29yZScgKTtcblx0XHRjb25zdCB7IGhhc0ZpbmlzaGVkUmVzb2x1dGlvbiB9ID0gc2VsZWN0KCAnY29yZS9kYXRhJyApO1xuXHRcdGNvbnN0IGVudGl0aWVzID0gZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzKFxuXHRcdFx0J2RhdGV0aW1lJyxcblx0XHRcdGRhdGVFbnRpdHlJZHMsXG5cdFx0XHQndGlja2V0J1xuXHRcdCk7XG5cdFx0Y29uc3QgbG9hZGVkID0gaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHQnZ2V0UmVsYXRlZEVudGl0aWVzRm9ySWRzJyxcblx0XHRcdFsgJ2RhdGV0aW1lJywgZGF0ZUVudGl0eUlkcywgJ3RpY2tldCcgXVxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpY2tldEVudGl0aWVzOiBlbnRpdGllcyxcblx0XHRcdHRpY2tldEVudGl0aWVzTG9hZGVkOiBsb2FkZWQsXG5cdFx0fTtcblx0fSwgWyBkYXRlRW50aXRpZXMsIGRhdGVFbnRpdGllc0xvYWRlZCBdICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUaWNrZXRzRm9yRXZlbnREYXRlcztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdXRpbHMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IHsgY29uZmlybSB9ID0gd2luZG93O1xuXG5jb25zdCB1c2VUcmFzaERhdGVFbnRpdHkgPSAoIGV2ZW50RGF0ZSApID0+IHtcblx0Y29uc3QgeyB0cmFzaEVudGl0eUJ5SWQgfSA9IHVzZURpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9jb3JlJyApO1xuXHRyZXR1cm4gdXNlQ2FsbGJhY2soIGFzeW5jICggY2xpY2sgKSA9PiB7XG5cdFx0Y2FuY2VsQ2xpY2tFdmVudCggY2xpY2sgKTtcblx0XHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIGV2ZW50RGF0ZSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoICEgY29uZmlybShcblx0XHRcdF9fKFxuXHRcdFx0XHQnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV2ZW50IGRhdGU/Jyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0KVxuXHRcdCkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRyYXNoRW50aXR5QnlJZCggJ2RhdGV0aW1lJywgZXZlbnREYXRlLmlkICk7XG5cdH0gKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZVRyYXNoRGF0ZUVudGl0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiB1c2VUcmFzaFByaWNlTW9kaWZpZXJcbiAqIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB0d28gZnVuY3Rpb25zOlxuICogIC0gYWRkUHJpY2VNb2RpZmllclxuICogIC0gdHJhc2hQcmljZU1vZGlmaWVyXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBmdW5jdGlvbnNcbiAqL1xuY29uc3QgdXNlVHJhc2hQcmljZU1vZGlmaWVyID0gKCkgPT4ge1xuXHRjb25zdCB7XG5cdFx0cmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHksXG5cdFx0dHJhc2hFbnRpdHlCeUlkLFxuXHR9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayhcblx0XHRhc3luYyAoIHByaWNlTW9kaWZpZXIsIHRpY2tldEVudGl0eSApID0+IHtcblx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggcHJpY2VNb2RpZmllciwgJ3ByaWNlJyApICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHQnVW5hYmxlIHRvIHBlcmZvcm0gZGVsZXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFByaWNlJyArXG5cdFx0XHRcdFx0XHQnIEVudGl0eSB3YXMgc3VwcGxpZWQgYnkgdGhlIFRpY2tldCBQcmljZSBDYWxjdWxhdG9yLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlUmVsYXRpb25Gb3JFbnRpdHkoXG5cdFx0XHRcdCd0aWNrZXQnLFxuXHRcdFx0XHR0aWNrZXRFbnRpdHkuaWQsXG5cdFx0XHRcdCdwcmljZScsXG5cdFx0XHRcdHByaWNlTW9kaWZpZXIuaWRcblx0XHRcdCk7XG5cdFx0XHR0cmFzaEVudGl0eUJ5SWQoICdwcmljZScsIHByaWNlTW9kaWZpZXIuaWQgKTtcblx0XHR9LFxuXHRcdFtdXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUcmFzaFByaWNlTW9kaWZpZXI7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbmNvbnN0IHsgY29uZmlybSB9ID0gd2luZG93O1xuXG5jb25zdCB1c2VUcmFzaFRpY2tldCA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRjb25zdCB7IHRyYXNoRW50aXR5QnlJZCB9ID0gdXNlRGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdHJldHVybiB1c2VDYWxsYmFjayggYXN5bmMgKCkgPT4ge1xuXHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggdGlja2V0RW50aXR5LCAndGlja2V0JyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRfXyhcblx0XHRcdFx0XHQnVW5hYmxlIHRvIHBlcmZvcm0gZGVsZXRpb24gYmVjYXVzZSBhbiBpbnZhbGlkIFRpY2tldCBFbnRpdHkgd2FzIHN1cHBsaWVkIGJ5IHRoZSBUaWNrZXQgUHJpY2UgQ2FsY3VsYXRvci4nLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBjb25maXJtKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdGlja2V0PycsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdClcblx0XHQpICkge1xuXHRcdFx0dHJhc2hFbnRpdHlCeUlkKCAndGlja2V0JywgdGlja2V0RW50aXR5LmlkICk7XG5cdFx0fVxuXHR9ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VUcmFzaFRpY2tldDtcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcInJlZ2VuZXJhdG9yUnVudGltZVwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInV0aWxzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
(this["webpackJsonproot"] = this["webpackJsonproot"] || []).push([["tickets-card-view"],{

/***/ "./domains/eventEditor/src/ui/tickets/TicketRegistrationsLink.tsx":
/*!************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/TicketRegistrationsLink.tsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__);




const tooltipProps = {
  placement: 'top'
};

const TicketRegistrationsLink = ({
  ticket
}) => {
  const regListUrl = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__["useRegistrationsLink"])({
    ticket_id: ticket.dbId
  });

  const countTitle = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('total registrations.');

  const tooltip = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('view ALL registrations for this ticket.');

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["ItemCount"], {
    count: ticket.registrationCount,
    emphasizeZero: false,
    title: countTitle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["RegistrationsLink"], {
    href: regListUrl,
    tooltip: tooltip,
    tooltipProps: tooltipProps
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (TicketRegistrationsLink);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/hooks/useRecalculateBasePrice.ts":
/*!*****************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/hooks/useRecalculateBasePrice.ts ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/predicates */ "@eventespresso/predicates");
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__);






const useRecalculateBasePrice = ticketId => {
  // This will give us the exact state expected by `calculateBasePrice()`
  const getDataState = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["useInitialState"])({
    ticketId
  }); // This default price will be added if there is none

  const defaultBasePrice = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["useDefaultBasePrice"])();
  const mutatePrices = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["useMutatePrices"])();
  const {
    updateEntity: updateTicket
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__["useTicketMutator"])(ticketId);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(ticketPrice => {
    var _tpcData, _tpcData2;

    let tpcData = getDataState(null); // Make sure the new ticket price is used

    const updatedTicket = { ...((_tpcData = tpcData) === null || _tpcData === void 0 ? void 0 : _tpcData.ticket),
      price: ticketPrice
    };
    tpcData = { ...tpcData,
      ticket: updatedTicket
    };
    const exitingBasePrice = Object(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_2__["getBasePrice"])((_tpcData2 = tpcData) === null || _tpcData2 === void 0 ? void 0 : _tpcData2.prices); // if the ticket does not have a base price,
    // that means it was free and now a price has been added ¯\_(ツ)_/¯

    if (!exitingBasePrice) {
      var _tpcData3;

      const newPrices = [// add the default price
      { ...defaultBasePrice,
        order: 1,
        isNew: true
      }, // add the existing ones, just in case we are dealing with aliens,
      // don't get me wrong, because only they can have other prices without a base price,
      // may be their taxation systen works differently, who knows ¯\_(ツ)_/¯
      ...((_tpcData3 = tpcData) === null || _tpcData3 === void 0 ? void 0 : _tpcData3.prices)];
      tpcData = { ...tpcData,
        prices: newPrices
      };
    } // get the list of updated prices with the amount of base price updated


    const newPrices = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["calculateBasePrice"])(tpcData);
    mutatePrices(newPrices).then(relatedPriceIds => {
      updateTicket({
        // this is the ticket prices amount
        price: ticketPrice,
        // since ticket price has been changed, we need to go in reverse gear ◀️
        reverseCalculate: true,
        // Make sure related prices are updated
        prices: relatedPriceIds
      });
    });
  }, [defaultBasePrice, getDataState, mutatePrices, updateTicket]);
};

/* harmony default export */ __webpack_exports__["default"] = (useRecalculateBasePrice);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/hooks/useTicketsActionMenuItems.ts":
/*!*******************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/hooks/useTicketsActionMenuItems.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edtrHooks_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @edtrHooks/index */ "./domains/eventEditor/src/hooks/index.ts");


const useTicketsActionMenuItems = ticket => {
  return Object(_edtrHooks_index__WEBPACK_IMPORTED_MODULE_0__["useEntityActionsMenuItems"])('ticket', ticket);
};

/* harmony default export */ __webpack_exports__["default"] = (useTicketsActionMenuItems);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/actionsMenu/TicketActionsMenu.tsx":
/*!******************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/actionsMenu/TicketActionsMenu.tsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useTicketsActionMenuItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useTicketsActionMenuItems */ "./domains/eventEditor/src/ui/tickets/hooks/useTicketsActionMenuItems.ts");





const TicketActionsMenu = ({
  entity,
  ...props
}) => {
  const menuItems = Object(_hooks_useTicketsActionMenuItems__WEBPACK_IMPORTED_MODULE_3__["default"])(entity);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["EntityActionsMenu"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
    menuItems: menuItems
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (TicketActionsMenu);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/CardView.tsx":
/*!******************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/cardView/CardView.tsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TicketCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TicketCard */ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketCard.tsx");





const CardView = () => {
  const filteredTicketIds = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["useFilteredTicketIds"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_1__["EntityCardList"], {
    EntityCard: _TicketCard__WEBPACK_IMPORTED_MODULE_3__["default"],
    entityIds: filteredTicketIds
  });
};

/* harmony default export */ __webpack_exports__["default"] = (CardView);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/Details.tsx":
/*!*****************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/cardView/Details.tsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/constants */ "@eventespresso/constants");
/* harmony import */ var _eventespresso_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_constants__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editable */ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/index.ts");
/* harmony import */ var _TicketDetailsPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TicketDetailsPanel */ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketDetailsPanel.tsx");









const Details = ({
  entity: ticket
}) => {
  const {
    siteUrl
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_4__["useConfig"])();
  const adminUrl = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["getAdminUrl"])({
      adminSiteUrl: siteUrl.admin,
      page: _eventespresso_constants__WEBPACK_IMPORTED_MODULE_2__["ADMIN_ROUTES"].REGISTRATIONS
    });
  }, [siteUrl.admin]);
  const eventId = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["useEventId"])();
  const {
    updateEntity
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["useTicketMutator"])(ticket.id);
  const onUpdate = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(description => {
    updateEntity({
      description
    });
  }, [updateEntity]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_editable__WEBPACK_IMPORTED_MODULE_6__["EditableName"], {
    className: 'entity-card-details__name',
    entity: ticket
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["SimpleTextEditorModal"], {
    className: "entity-card-details__text",
    onUpdate: onUpdate,
    text: ticket.description,
    title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit description'),
    tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('edit description…')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_editable__WEBPACK_IMPORTED_MODULE_6__["EditablePrice"], {
    className: "entity-card-details__price",
    entity: ticket
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TicketDetailsPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    adminUrl: adminUrl,
    entity: ticket,
    eventId: eventId
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Details);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketCard.tsx":
/*!********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketCard.tsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Details */ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/Details.tsx");
/* harmony import */ var _TicketCardSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TicketCardSidebar */ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketCardSidebar.tsx");
/* harmony import */ var _actionsMenu_TicketActionsMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actionsMenu/TicketActionsMenu */ "./domains/eventEditor/src/ui/tickets/ticketsList/actionsMenu/TicketActionsMenu.tsx");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__);









const TicketCard = ({
  id
}) => {
  const ticket = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__["useTicketItem"])({
    id
  });
  const bgClassName = Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_5__["ticketStatusBgColorClassName"])(ticket);
  return ticket ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_4__["EntityCard"], {
    actionsMenu: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_actionsMenu_TicketActionsMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
      entity: ticket,
      layout: _eventespresso_components__WEBPACK_IMPORTED_MODULE_4__["EntityActionsMenuLayout"].Vertical
    }),
    details: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Details__WEBPACK_IMPORTED_MODULE_1__["default"], {
      entity: ticket
    }),
    entity: ticket,
    reverse: true,
    sidebar: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TicketCardSidebar__WEBPACK_IMPORTED_MODULE_2__["default"], {
      entity: ticket
    }),
    sidebarClass: bgClassName
  }) : null;
};

/* harmony default export */ __webpack_exports__["default"] = (TicketCard);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketCardSidebar.tsx":
/*!***************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketCardSidebar.tsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_5__);







const TicketCardSidebar = ({
  entity: ticket
}) => {
  const {
    displayStartOrEndDate
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__["useTicketsListFilterState"])();
  const {
    updateEntity
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__["useTicketMutator"])(ticket.id);
  const {
    siteTimeToUtc
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_5__["useTimeZoneTime"])();
  const onEditHandler = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(([start, end]) => {
    // convert start & end dates to proper UTC "startDate" and "endDate"
    const startDate = siteTimeToUtc(start).toISOString();
    const endDate = siteTimeToUtc(end).toISOString();
    updateEntity({
      startDate,
      endDate
    });
  }, [siteTimeToUtc, updateEntity]);
  const statusText = Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__["getTicketStatusTextLabel"])(ticket);
  return ticket ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["CalendarDateSwitcher"], {
    displayDate: displayStartOrEndDate,
    endDate: ticket.endDate,
    startDate: ticket.startDate
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["EditDateRangeButton"], {
    endDate: ticket.endDate,
    header: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit Ticket Sale Dates'),
    onEditHandler: onEditHandler,
    tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('edit ticket sales start and end dates'),
    startDate: ticket.startDate
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'ee-ticket-status-label'
  }, statusText)) : null;
};

/* harmony default export */ __webpack_exports__["default"] = (TicketCardSidebar);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketDetailsPanel.tsx":
/*!****************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketDetailsPanel.tsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TicketRegistrationsLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TicketRegistrationsLink */ "./domains/eventEditor/src/ui/tickets/TicketRegistrationsLink.tsx");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _TicketQuantity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TicketQuantity */ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketQuantity.tsx");






const TicketDetailsPanel = ({
  adminUrl,
  entity: ticket,
  eventId
}) => {
  const details = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => [{
    id: 'ee-ticket-sold',
    label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('sold'),
    value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["EntityDetailsPanelSold"], {
      adminUrl: adminUrl,
      dbId: ticket.dbId,
      eventId: eventId,
      sold: ticket.sold,
      type: "ticket"
    })
  }, {
    id: 'ee-ticket-qty',
    label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('quantity'),
    value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TicketQuantity__WEBPACK_IMPORTED_MODULE_4__["default"], {
      entity: ticket
    })
  }, {
    id: 'ee-ticket-registrations',
    label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('reg list'),
    value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TicketRegistrationsLink__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ticket: ticket
    })
  }], [adminUrl, eventId, ticket]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["EntityDetailsPanel"], {
    details: details,
    className: "ee-editor-ticket-details-sold-rsrvd-qty-div"
  });
};

/* harmony default export */ __webpack_exports__["default"] = (TicketDetailsPanel);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketQuantity.tsx":
/*!************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketQuantity.tsx ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__);






const TicketQuantity = ({
  entity: ticket
}) => {
  const {
    updateEntity
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__["useTicketMutator"])(ticket.id);
  const onChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(qty => {
    const quantity = Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["parseInfinity"])(qty);

    if (quantity !== ticket.quantity) {
      updateEntity({
        quantity
      });
    }
  }, [ticket.quantity, updateEntity]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["InlineEditInfinity"], {
    onChange: onChange,
    value: `${ticket.quantity}`,
    tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('edit quantity of tickets available…')
  });
};

/* harmony default export */ __webpack_exports__["default"] = (TicketQuantity);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/EditableName.tsx":
/*!**********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/editable/EditableName.tsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__);





const EditableName = ({
  className,
  entity: ticket,
  view = 'card'
}) => {
  const {
    updateEntity
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["useTicketMutator"])(ticket.id);
  const lineCount = view === 'card' && 2;
  const onChangeName = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(name => {
    if (name !== ticket.name) {
      updateEntity({
        name
      });
    }
  }, [ticket.name, updateEntity]);

  const tooltip = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('edit title…');

  const ticketName = ticket.name || tooltip;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["InlineEditText"], {
    className: className,
    lineCount: lineCount,
    onChange: onChangeName,
    tag: view === 'table' ? 'div' : 'h4',
    tooltip: tooltip,
    value: ticketName
  });
};

/* harmony default export */ __webpack_exports__["default"] = (EditableName);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/EditablePrice.tsx":
/*!***********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/editable/EditablePrice.tsx ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/hooks */ "@eventespresso/hooks");
/* harmony import */ var _eventespresso_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hooks_useRecalculateBasePrice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useRecalculateBasePrice */ "./domains/eventEditor/src/ui/tickets/hooks/useRecalculateBasePrice.ts");







const EditablePrice = ({
  entity: ticket,
  className
}) => {
  const recalculateBasePrice = Object(_hooks_useRecalculateBasePrice__WEBPACK_IMPORTED_MODULE_5__["default"])(ticket.id);
  const onChangePrice = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(({
    amount
  }) => {
    const price = parseFloat(amount);

    if (price !== ticket.price) {
      recalculateBasePrice(price);
    }
  }, [recalculateBasePrice, ticket.price]);
  const wrapperProps = Object(_eventespresso_hooks__WEBPACK_IMPORTED_MODULE_3__["useMemoStringify"])({
    className
  });
  const isEditDisabled = Boolean(ticket.sold);
  const tooltip = isEditDisabled ? _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_4__["SOLD_TICKET_ERROR_MESSAGE"] : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('edit ticket total…');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["InlineEditCurrency"], {
    id: ticket.id,
    amount: ticket.price,
    isEditDisabled: isEditDisabled,
    placeholder: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('set price…'),
    wrapperProps: wrapperProps,
    onChange: onChangePrice,
    tag: 'h3',
    tooltip: tooltip
  });
};

/* harmony default export */ __webpack_exports__["default"] = (EditablePrice);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/index.ts":
/*!**************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/editable/index.ts ***!
  \**************************************************************************/
/*! exports provided: EditableName, EditablePrice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditableName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditableName */ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/EditableName.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditableName", function() { return _EditableName__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _EditablePrice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditablePrice */ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/EditablePrice.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditablePrice", function() { return _EditablePrice__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ })

}]);
//# sourceMappingURL=tickets-card-view.chunk.js.map
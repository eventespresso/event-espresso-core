(this["webpackJsonproot"] = this["webpackJsonproot"] || []).push([["tickets-table-view"],{

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

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/actions/Actions.tsx":
/*!*************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/actions/Actions.tsx ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/hooks */ "./node_modules/@chakra-ui/hooks/dist/cjs/index.js");
/* harmony import */ var _chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/hooks */ "@eventespresso/hooks");
/* harmony import */ var _eventespresso_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/predicates */ "@eventespresso/predicates");
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tableView_Checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../tableView/Checkbox */ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/Checkbox.tsx");
/* harmony import */ var _details__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../details */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/index.ts");
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../delete */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/index.ts");
/* harmony import */ var _prices__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../prices */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/index.ts");














const Actions = () => {
  const [action, setAction] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const {
    isOpen,
    onOpen,
    onClose
  } = Object(_chakra_ui_hooks__WEBPACK_IMPORTED_MODULE_1__["useDisclosure"])();
  const {
    status
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__["useTicketsListFilterState"])();
  const {
    getSelected
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_8__["useBulkEdit"])();
  const allTickets = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_6__["useTickets"])();
  const isEditPricesDisabled = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    const selectedTickets = Object(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_7__["entitiesWithGuIdInArray"])(allTickets, getSelected());
    const isSoldTicketSelected = selectedTickets.some(ticket => Boolean(ticket.sold));
    return isSoldTicketSelected;
  }, [allTickets, getSelected]);
  const areTrashedTickets = status === _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_7__["TicketsStatus"].trashedOnly;
  const options = Object(_eventespresso_hooks__WEBPACK_IMPORTED_MODULE_4__["useMemoStringify"])([{
    value: '',
    label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('bulk actions')
  }, {
    value: 'edit-details',
    label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('edit ticket details')
  }, {
    value: 'delete',
    label: areTrashedTickets ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('delete tickets') : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('trash tickets')
  }, {
    value: 'edit-prices',
    label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('edit ticket prices'),
    disabled: isEditPricesDisabled
  }]);
  const onApply = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(action => {
    setAction(action);
    onOpen();
  }, [onOpen]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["BulkActions"], {
    Checkbox: _tableView_Checkbox__WEBPACK_IMPORTED_MODULE_9__["default"],
    options: options,
    onApply: isEditPricesDisabled ? null : onApply,
    defaultAction: ""
  }), isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, action === 'edit-details' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_details__WEBPACK_IMPORTED_MODULE_10__["EditDetails"], {
    isOpen: true,
    onClose: onClose
  }), action === 'delete' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_delete__WEBPACK_IMPORTED_MODULE_11__["Delete"], {
    areTrashedTickets: areTrashedTickets,
    onClose: onClose
  }), action === 'edit-prices' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_prices__WEBPACK_IMPORTED_MODULE_12__["EditPrices"], {
    isOpen: true,
    onClose: onClose
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
    message: isEditPricesDisabled && _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_5__["SOLD_TICKET_ERROR_MESSAGE"],
    variant: "subtle"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_8__["withFeature"])('use_bulk_edit')(Actions));

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/actions/index.ts":
/*!**********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/actions/index.ts ***!
  \**********************************************************************************/
/*! exports provided: Actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Actions */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/actions/Actions.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return _Actions__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/Delete.tsx":
/*!***********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/Delete.tsx ***!
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
/* harmony import */ var _useOnDelete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useOnDelete */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/useOnDelete.ts");





const Delete = ({
  areTrashedTickets,
  onClose
}) => {
  const onDelete = Object(_useOnDelete__WEBPACK_IMPORTED_MODULE_3__["default"])({
    areTrashedTickets,
    onClose
  });
  const {
    confirmationDialog,
    onOpen
  } = Object(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["useConfirmationDialog"])({
    message: areTrashedTickets ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Are you sure you want to permanently delete these tickets? This action can NOT be undone!') : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Are you sure you want to trash these tickets?'),
    title: areTrashedTickets ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Delete tickets permanently') : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Trash tickets'),
    onConfirm: onDelete,
    onCancel: onClose
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => onOpen(), []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, confirmationDialog);
};

/* harmony default export */ __webpack_exports__["default"] = (Delete);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/index.ts":
/*!*********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/index.ts ***!
  \*********************************************************************************/
/*! exports provided: Delete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Delete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Delete */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/Delete.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Delete", function() { return _Delete__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/useOnDelete.ts":
/*!***************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/delete/useOnDelete.ts ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__);




const useOnDelete = ({
  areTrashedTickets,
  onClose
}) => {
  const {
    getSelected,
    unSelectAll
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_1__["useBulkEdit"])();
  const bulkDelete = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["useBulkDeleteTickets"])();
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    // pull the shutter down
    onClose(); // back to basics

    unSelectAll(); // goodbye folks :wave:

    bulkDelete(getSelected(), areTrashedTickets);
  }, [areTrashedTickets, bulkDelete, getSelected, onClose, unSelectAll]);
};

/* harmony default export */ __webpack_exports__["default"] = (useOnDelete);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/EditDetails.tsx":
/*!*****************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/EditDetails.tsx ***!
  \*****************************************************************************************/
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
/* harmony import */ var _useBulkEditFormConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useBulkEditFormConfig */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/useBulkEditFormConfig.ts");
/* harmony import */ var _useSubmitForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useSubmitForm */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/useSubmitForm.ts");






const EditDetails = ({
  onClose,
  isOpen
}) => {
  const onSubmit = Object(_useSubmitForm__WEBPACK_IMPORTED_MODULE_4__["default"])(onClose);
  const formConfig = Object(_useBulkEditFormConfig__WEBPACK_IMPORTED_MODULE_3__["default"])({
    onSubmit
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["BulkEditDetails"], {
    formConfig: formConfig,
    isOpen: isOpen,
    onClose: onClose,
    title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Bulk edit ticket details'),
    warning: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('any changes will be applied to ALL of the selected tickets.')
  });
};

/* harmony default export */ __webpack_exports__["default"] = (EditDetails);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/formValidation.ts":
/*!*******************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/formValidation.ts ***!
  \*******************************************************************************************/
/*! exports provided: validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yup */ "./node_modules/yup/lib/index.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/form */ "@eventespresso/form");
/* harmony import */ var _eventespresso_form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_form__WEBPACK_IMPORTED_MODULE_2__);



const validate = async values => {
  return await Object(_eventespresso_form__WEBPACK_IMPORTED_MODULE_2__["yupToFinalFormErrors"])(validationSchema, values);
};
const validationSchema = yup__WEBPACK_IMPORTED_MODULE_1__["object"]({
  name: yup__WEBPACK_IMPORTED_MODULE_1__["string"]().min(3, () => Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Name must be at least three characters'))
});

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/index.ts":
/*!**********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/index.ts ***!
  \**********************************************************************************/
/*! exports provided: EditDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditDetails */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/EditDetails.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditDetails", function() { return _EditDetails__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/useBulkEditFormConfig.ts":
/*!**************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/useBulkEditFormConfig.ts ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");
/* harmony import */ var _eventespresso_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/icons */ "./packages/icons/src/index.ts");
/* harmony import */ var _eventespresso_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/dates */ "@eventespresso/dates");
/* harmony import */ var _eventespresso_dates__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_dates__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _formValidation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./formValidation */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/formValidation.ts");
/* harmony import */ var _eventespresso_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/hooks */ "@eventespresso/hooks");
/* harmony import */ var _eventespresso_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_hooks__WEBPACK_IMPORTED_MODULE_6__);







const unitOptions = Object(_eventespresso_dates__WEBPACK_IMPORTED_MODULE_4__["intervalsToOptions"])(Object(ramda__WEBPACK_IMPORTED_MODULE_2__["pick"])(['months', 'weeks', 'days', 'hours', 'minutes'], _eventespresso_dates__WEBPACK_IMPORTED_MODULE_4__["DATE_INTERVALS"]), true);

const useBulkEditFormConfig = config => {
  const {
    onSubmit
  } = config;
  const onSubmitFrom = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((values, form, ...restParams) => {
    return onSubmit(values, form, ...restParams);
  }, [onSubmit]);
  const adjacentFormItemProps = Object(_eventespresso_hooks__WEBPACK_IMPORTED_MODULE_6__["useMemoStringify"])({
    className: 'ee-form-item-pair'
  });
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({ ...config,
    onSubmit: onSubmitFrom,
    validate: _formValidation__WEBPACK_IMPORTED_MODULE_5__["validate"],
    layout: 'horizontal',
    debugFields: ['values', 'errors'],
    sections: [{
      name: 'basics',
      icon: _eventespresso_icons__WEBPACK_IMPORTED_MODULE_3__["ProfileOutlined"],
      title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Basics'),
      fields: [{
        name: 'name',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Name'),
        fieldType: 'text',
        min: 3
      }, {
        name: 'description',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Description'),
        fieldType: 'simple-text-editor'
      }]
    }, {
      name: 'dates',
      icon: _eventespresso_icons__WEBPACK_IMPORTED_MODULE_3__["CalendarOutlined"],
      title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Dates'),
      fields: [{
        name: 'shiftDates',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Shift dates'),
        fieldType: 'group',
        formControlProps: {
          className: 'shift-dates'
        },
        subFields: [{
          name: 'value',
          fieldType: 'number',
          min: 1
        }, {
          name: 'unit',
          fieldType: 'select',
          options: unitOptions
        }, {
          name: 'type',
          fieldType: 'select',
          options: [{
            label: '',
            value: ''
          }, {
            label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('earlier'),
            value: 'earlier'
          }, {
            label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('later'),
            value: 'later'
          }]
        }]
      }]
    }, {
      name: 'details',
      icon: _eventespresso_icons__WEBPACK_IMPORTED_MODULE_3__["ControlOutlined"],
      title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Details'),
      fields: [{
        name: 'quantity',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Quantity For Sale'),
        fieldType: 'number',
        formControlProps: adjacentFormItemProps,
        parseAsInfinity: true,
        max: 1000000,
        min: -1
      }, {
        name: 'uses',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Number of Uses'),
        fieldType: 'number',
        parseAsInfinity: true,
        formControlProps: adjacentFormItemProps,
        min: 0
      }, {
        name: 'min',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Minimum Quantity'),
        fieldType: 'number',
        formControlProps: adjacentFormItemProps,
        max: 1000000,
        min: 0
      }, {
        name: 'max',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Maximum Quantity'),
        fieldType: 'number',
        parseAsInfinity: true,
        formControlProps: adjacentFormItemProps,
        max: 1000000,
        min: -1
      }, {
        name: 'isRequired',
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Required Ticket'),
        fieldType: 'switch',
        formControlProps: adjacentFormItemProps
      }]
    }]
  }), [adjacentFormItemProps, config, onSubmitFrom]);
};

/* harmony default export */ __webpack_exports__["default"] = (useBulkEditFormConfig);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/useSubmitForm.ts":
/*!******************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/details/useSubmitForm.ts ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__);




const useSubmitForm = onClose => {
  const {
    getSelected,
    unSelectAll
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_1__["useBulkEdit"])();
  const allTickets = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["useTickets"])();
  const {
    updateEntities
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["useBulkEditTickets"])();
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(formData => {
    // pull the shutter down
    onClose(); // back to basics

    unSelectAll(); // prepare mutation input from data

    const input = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["formToBulkUpdateInput"])(formData, allTickets, getSelected()); // do the thing

    updateEntities(input);
  }, [allTickets, getSelected, onClose, unSelectAll, updateEntities]);
};

/* harmony default export */ __webpack_exports__["default"] = (useSubmitForm);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/index.ts":
/*!**************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/index.ts ***!
  \**************************************************************************/
/*! exports provided: Actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/actions/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return _actions__WEBPACK_IMPORTED_MODULE_0__["Actions"]; });



/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/EditPrices.tsx":
/*!***************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/EditPrices.tsx ***!
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
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttons */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/index.ts");
/* harmony import */ var _editTogether__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editTogether */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/index.ts");
/* harmony import */ var _editSeparately__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editSeparately */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/index.ts");







const EditPrices = ({
  onClose,
  isOpen
}) => {
  const [editMode, setEditMode] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["EntityEditModal"], {
    isOpen: isOpen,
    onClose: onClose,
    closeOnOverlayClick: true,
    title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Bulk edit ticket prices')
  }, !editMode && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons__WEBPACK_IMPORTED_MODULE_3__["EditModeButtons"], {
    setEditMode: setEditMode
  }), editMode === 'together' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_editTogether__WEBPACK_IMPORTED_MODULE_4__["EditTogether"], {
    onClose: onClose
  }), editMode === 'separate' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_editSeparately__WEBPACK_IMPORTED_MODULE_5__["EditSeparately"], {
    onClose: onClose
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (EditPrices);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/EditModeButtons.tsx":
/*!****************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/EditModeButtons.tsx ***!
  \****************************************************************************************************/
/*! exports provided: EditModeButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditModeButtons", function() { return EditModeButtons; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/adapters */ "@eventespresso/adapters");
/* harmony import */ var _eventespresso_adapters__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_adapters__WEBPACK_IMPORTED_MODULE_3__);




const EditModeButtons = ({
  setEditMode
}) => {
  const onClickTogether = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => setEditMode('together'), [setEditMode]);
  const onClickSeparate = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => setEditMode('separate'), [setEditMode]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_adapters__WEBPACK_IMPORTED_MODULE_3__["Box"], {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_adapters__WEBPACK_IMPORTED_MODULE_3__["Box"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: onClickTogether,
    buttonText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit all prices together')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit all the selected ticket prices dynamically'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["Divider"], {
    orientation: "vertical"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_adapters__WEBPACK_IMPORTED_MODULE_3__["Box"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: onClickSeparate,
    buttonText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit prices individually')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit prices for each ticket individually'))));
};

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/FooterButtons.tsx":
/*!**************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/FooterButtons.tsx ***!
  \**************************************************************************************************/
/*! exports provided: FooterButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterButtons", function() { return FooterButtons; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__);



const FooterButtons = ({
  onSubmit,
  onReset,
  onCancel
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["ButtonRow"], {
    align: "right",
    topBordered: true
  }, onReset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    buttonText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Reset'),
    onClick: onReset,
    type: "reset"
  }), onCancel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    buttonText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Cancel'),
    onClick: onCancel
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    buttonText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Submit'),
    buttonType: _eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["ButtonType"].PRIMARY,
    onClick: onSubmit,
    type: "submit"
  }));
};

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/index.ts":
/*!*****************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: EditModeButtons, FooterButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditModeButtons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditModeButtons */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/EditModeButtons.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditModeButtons", function() { return _EditModeButtons__WEBPACK_IMPORTED_MODULE_0__["EditModeButtons"]; });

/* harmony import */ var _FooterButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FooterButtons */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/FooterButtons.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterButtons", function() { return _FooterButtons__WEBPACK_IMPORTED_MODULE_1__["FooterButtons"]; });




/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/EditSeparately.tsx":
/*!**********************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/EditSeparately.tsx ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TPCInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TPCInstance */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/TPCInstance.tsx");
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../buttons */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/index.ts");
/* harmony import */ var _useManageTPCStates__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useManageTPCStates */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/useManageTPCStates.ts");
/* harmony import */ var _useOnSubmit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useOnSubmit */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/useOnSubmit.ts");








const EditSeparately = ({
  onClose
}) => {
  const {
    getSelected
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_2__["useBulkEdit"])();
  const {
    getDataStates,
    setTPCState
  } = Object(_useManageTPCStates__WEBPACK_IMPORTED_MODULE_5__["useManageTPCStates"])();
  const onSubmit = Object(_useOnSubmit__WEBPACK_IMPORTED_MODULE_6__["default"])(onClose, getDataStates);
  const ticketIds = getSelected();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, ticketIds.map(ticketId => {
    const Instance = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["withContext"])(_TPCInstance__WEBPACK_IMPORTED_MODULE_3__["TPCInstance"], {
      ticketId
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Instance, {
      key: ticketId,
      setTPCState: setTPCState
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons__WEBPACK_IMPORTED_MODULE_4__["FooterButtons"], {
    onSubmit: onSubmit,
    onCancel: onClose
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (EditSeparately);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/TPCInstance.tsx":
/*!*******************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/TPCInstance.tsx ***!
  \*******************************************************************************************************/
/*! exports provided: TPCInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TPCInstance", function() { return TPCInstance; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_2__);



const TPCInstance = ({
  setTPCState
}) => {
  const {
    ticket,
    getData
  } = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_2__["useDataState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setTPCState(getData()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(
  /* translators: %s ticket name */
  Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit prices for Ticket: %s'), ticket.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_2__["TicketPriceCalculator"], null));
};

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/index.ts":
/*!************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/index.ts ***!
  \************************************************************************************************/
/*! exports provided: EditSeparately */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditSeparately__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditSeparately */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/EditSeparately.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditSeparately", function() { return _EditSeparately__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/useManageTPCStates.ts":
/*!*************************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/useManageTPCStates.ts ***!
  \*************************************************************************************************************/
/*! exports provided: useManageTPCStates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useManageTPCStates", function() { return useManageTPCStates; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useManageTPCStates = () => {
  /**
   * This contains the data for all TPC instances.
   *
   * Since this is not used anywhere in the view, rather only used on final submission
   * useRef is made for this, to avoid any unnecessary re-renders
   */
  const dataStates = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});
  const setTPCState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(dataState => {
    var _dataState$ticket;

    dataStates.current = { ...dataStates.current,
      [dataState === null || dataState === void 0 ? void 0 : (_dataState$ticket = dataState.ticket) === null || _dataState$ticket === void 0 ? void 0 : _dataState$ticket.id]: dataState
    };
  }, [dataStates]);
  const getDataStates = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => dataStates.current, [dataStates]);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    setTPCState,
    getDataStates
  }), [setTPCState, getDataStates]);
};

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/useOnSubmit.ts":
/*!******************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editSeparately/useOnSubmit.ts ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__);



const useOnSubmit = (onClose, getDataStates) => {
  const submitPrices = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["useOnSubmitPrices"])();
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    // lower down the curtains
    onClose(); // tickets/prices can be mutated in parallel

    await Promise.all( // loop through all the selected tickets and update their price information
    Object.values(getDataStates()).map(async dataState => {
      // Finally update the ticket and its price relation
      await submitPrices(dataState);
    }));
  }, [getDataStates, onClose, submitPrices]);
};

/* harmony default export */ __webpack_exports__["default"] = (useOnSubmit);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/EditTogether.tsx":
/*!******************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/EditTogether.tsx ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../buttons */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/buttons/index.ts");
/* harmony import */ var _useOnSubmitPrices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useOnSubmitPrices */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/useOnSubmitPrices.ts");





const EditTogether = ({
  onClose
}) => {
  const addDefaultPrices = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["useAddDefaultPrices"])(); // add default prices on mount

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    addDefaultPrices(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = Object(_useOnSubmitPrices__WEBPACK_IMPORTED_MODULE_3__["default"])(onClose);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["TicketPriceCalculator"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_buttons__WEBPACK_IMPORTED_MODULE_2__["FooterButtons"], {
    onSubmit: onSubmit,
    onReset: addDefaultPrices
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_1__["withContext"])(EditTogether, {
  ticketId: ''
}));

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/index.ts":
/*!**********************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/index.ts ***!
  \**********************************************************************************************/
/*! exports provided: EditTogether */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditTogether__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditTogether */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/EditTogether.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditTogether", function() { return _EditTogether__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/useOnSubmitPrices.ts":
/*!**********************************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/editTogether/useOnSubmitPrices.ts ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/tpc */ "@eventespresso/tpc");
/* harmony import */ var _eventespresso_tpc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/predicates */ "@eventespresso/predicates");
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_5__);







const useOnSubmitPrices = onClose => {
  const {
    prices,
    ticket
  } = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_3__["useDataState"])();
  const {
    getSelected
  } = Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_5__["useBulkEdit"])();
  const {
    updateEntity: updateTicket
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_1__["useTicketMutator"])();
  const mutatePrices = Object(_eventespresso_tpc__WEBPACK_IMPORTED_MODULE_3__["useMutatePrices"])(); // prices related to all the selected tickets

  const relatedPrices = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_1__["useTicketPrices"])(getSelected());
  const deletePrices = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_1__["useBulkDeletePrices"])(); // prices may contain default taxes,
  // we need to make sure they are not deleted.

  const nonDefaultPrices = relatedPrices.filter(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_4__["isNotDefault"]); // Async to make sure that prices are handled before updating the ticket.

  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    // lower down the curtains
    onClose(); // delete all non-default prices

    await deletePrices(Object(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_4__["getGuids"])(nonDefaultPrices)); // tickets/prices can be mutated in parallel

    await Promise.all( // loop through all the selected tickets and update thei price information
    getSelected().map(async ticketId => {
      // create/update prices and collect their ids
      const relatedPriceIds = await mutatePrices(prices); // Finally update the ticket and its price relation

      await updateTicket({
        id: ticketId,
        price: Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["parsedAmount"])(ticket.price || 0),
        reverseCalculate: Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["toBoolean"])(ticket.reverseCalculate),
        isTaxable: Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_2__["toBoolean"])(ticket.isTaxable),
        prices: relatedPriceIds
      });
    }));
  }, [deletePrices, getSelected, mutatePrices, nonDefaultPrices, onClose, prices, ticket, updateTicket]);
};

/* harmony default export */ __webpack_exports__["default"] = (useOnSubmitPrices);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/index.ts":
/*!*********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/index.ts ***!
  \*********************************************************************************/
/*! exports provided: EditPrices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditPrices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditPrices */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/prices/EditPrices.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditPrices", function() { return _EditPrices__WEBPACK_IMPORTED_MODULE_0__["default"]; });



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




/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/Checkbox.tsx":
/*!*******************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/tableView/Checkbox.tsx ***!
  \*******************************************************************************/
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
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_4__);






const Checkbox = props => {
  const [visibleTicketIds] = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_3__["useVisibleTicketIds"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["ActionCheckbox"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
    visibleEntityIds: visibleTicketIds
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_4__["withFeature"])('use_bulk_edit')(Checkbox));

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/TableView.tsx":
/*!********************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/tableView/TableView.tsx ***!
  \********************************************************************************/
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
/* harmony import */ var _useHeaderRowGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useHeaderRowGenerator */ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/useHeaderRowGenerator.tsx");
/* harmony import */ var _useBodyRowGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useBodyRowGenerator */ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/useBodyRowGenerator.tsx");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/services */ "@eventespresso/services");
/* harmony import */ var _eventespresso_services__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_services__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _bulkEdit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../bulkEdit */ "./domains/eventEditor/src/ui/tickets/ticketsList/bulkEdit/index.ts");








/**
 * Displays tickets in a standard list table like view
 */

const TableView = () => {
  const filterState = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["useTicketsListFilterState"])();
  const filteredTicketIds = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["useFilteredTicketIds"])();
  const {
    sortResponder: sortTickets
  } = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["useReorderTickets"])(filteredTicketIds);
  const bodyRowGenerator = Object(_useBodyRowGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const headerRowGenerator = Object(_useHeaderRowGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_bulkEdit__WEBPACK_IMPORTED_MODULE_7__["Actions"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_2__["EntityTable"], {
    bodyRowGenerator: bodyRowGenerator,
    domain: _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["domain"],
    entityIds: filteredTicketIds,
    filterState: filterState,
    headerRowGenerator: headerRowGenerator,
    listId: _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_5__["ticketsList"],
    onSort: sortTickets,
    tableCaption: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Tickets'),
    tableId: "ticket-entities-table-view"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_eventespresso_services__WEBPACK_IMPORTED_MODULE_6__["withBulkEdit"])(TableView));

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/useBodyRowGenerator.tsx":
/*!******************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/tableView/useBodyRowGenerator.tsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/src/index.mjs");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/edtr-services */ "@eventespresso/edtr-services");
/* harmony import */ var _eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/constants */ "@eventespresso/constants");
/* harmony import */ var _eventespresso_constants__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_constants__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/utils */ "@eventespresso/utils");
/* harmony import */ var _eventespresso_utils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/predicates */ "@eventespresso/predicates");
/* harmony import */ var _eventespresso_predicates__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _edtrUI_tickets_ticketsList_actionsMenu_TicketActionsMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @edtrUI/tickets/ticketsList/actionsMenu/TicketActionsMenu */ "./domains/eventEditor/src/ui/tickets/ticketsList/actionsMenu/TicketActionsMenu.tsx");
/* harmony import */ var _cardView_TicketQuantity__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../cardView/TicketQuantity */ "./domains/eventEditor/src/ui/tickets/ticketsList/cardView/TicketQuantity.tsx");
/* harmony import */ var _editable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../editable */ "./domains/eventEditor/src/ui/tickets/ticketsList/editable/index.ts");
/* harmony import */ var _TicketRegistrationsLink__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../TicketRegistrationsLink */ "./domains/eventEditor/src/ui/tickets/TicketRegistrationsLink.tsx");
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Checkbox */ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/Checkbox.tsx");















const useBodyRowGenerator = () => {
  const allTickets = Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__["useTickets"])();
  const idToTicketMap = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_eventespresso_predicates__WEBPACK_IMPORTED_MODULE_8__["idToEntityMap"])(allTickets), [allTickets]);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(({
    entityId,
    filterState
  }) => {
    const ticket = idToTicketMap === null || idToTicketMap === void 0 ? void 0 : idToTicketMap[entityId];
    const {
      displayStartOrEndDate,
      sortingEnabled
    } = filterState;
    const bgClassName = Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_6__["getTicketBackgroundColorClassName"])(ticket);
    const id = ticket.dbId || Object(_eventespresso_utils__WEBPACK_IMPORTED_MODULE_7__["shortenGuid"])(ticket.id);
    const statusClassName = Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_6__["ticketStatus"])(ticket);
    const name = {
      key: 'name',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-name ee-col-name ee-rspnsv-table-column-bigger ee-rspnsv-table-hide-on-mobile',
      value: sortingEnabled ? ticket.name : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_editable__WEBPACK_IMPORTED_MODULE_11__["EditableName"], {
        className: 'ee-entity-list-text ee-focus-priority-5',
        entity: ticket,
        view: 'table'
      })
    };
    const quantity = {
      key: 'quantity',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-quantity ee-rspnsv-table-column-tiny ee-number-column',
      value: sortingEnabled ? ticket.quantity : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_cardView_TicketQuantity__WEBPACK_IMPORTED_MODULE_10__["default"], {
        entity: ticket
      })
    };
    const cellsData = [{
      key: 'stripe',
      type: 'cell',
      className: `ee-ticket-list-cell ee-entity-list-status-stripe ${bgClassName} ee-rspnsv-table-column-nano`,
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'ee-rspnsv-table-show-on-mobile'
      }, ticket.name)
    }, {
      key: 'checkbox',
      type: 'cell',
      className: 'ee-date-list-cell ee-date-list-col-checkbox ee-rspnsv-table-column-micro',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Checkbox__WEBPACK_IMPORTED_MODULE_13__["default"], {
        dbId: ticket.dbId,
        id: ticket.id
      })
    }, {
      key: 'id',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-id ee-rspnsv-table-column-nano ee-number-column',
      value: id
    }, name, {
      key: 'start',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-start ee-rspnsv-table-column-default',
      value: Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["format"])(new Date(ticket.startDate), _eventespresso_constants__WEBPACK_IMPORTED_MODULE_5__["ENTITY_LIST_DATE_TIME_FORMAT"])
    }, {
      key: 'end',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-end ee-rspnsv-table-column-default',
      value: Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["format"])(new Date(ticket.endDate), _eventespresso_constants__WEBPACK_IMPORTED_MODULE_5__["ENTITY_LIST_DATE_TIME_FORMAT"])
    }, {
      key: 'price',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["CurrencyDisplay"], {
        value: ticket.price
      })
    }, quantity, {
      key: 'sold',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
      value: ticket.sold
    }, {
      key: 'registrations',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
      value: sortingEnabled ? '-' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TicketRegistrationsLink__WEBPACK_IMPORTED_MODULE_12__["default"], {
        ticket: ticket
      })
    }, {
      key: 'actions',
      type: 'cell',
      className: 'ee-ticket-list-cell ee-actions-column ee-rspnsv-table-column-big',
      value: sortingEnabled ? '-' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_edtrUI_tickets_ticketsList_actionsMenu_TicketActionsMenu__WEBPACK_IMPORTED_MODULE_9__["default"], {
        entity: ticket
      })
    }];
    const exclude = ['row', 'stripe', 'name', 'actions'];
    const cells = Object(ramda__WEBPACK_IMPORTED_MODULE_2__["pipe"])(Object(ramda__WEBPACK_IMPORTED_MODULE_2__["filter"])(Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_4__["filterCellByStartOrEndDate"])(displayStartOrEndDate)), Object(_eventespresso_components__WEBPACK_IMPORTED_MODULE_3__["addZebraStripesOnMobile"])(exclude))(cellsData);
    return {
      cells,
      className: `ee-editor-date-list-view-row ${statusClassName}`,
      id: `ee-editor-date-list-view-row-${ticket.id}`,
      key: `row-${ticket.id}`,
      type: 'row'
    };
  }, [idToTicketMap]);
};

/* harmony default export */ __webpack_exports__["default"] = (useBodyRowGenerator);

/***/ }),

/***/ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/useHeaderRowGenerator.tsx":
/*!********************************************************************************************!*\
  !*** ./domains/eventEditor/src/ui/tickets/ticketsList/tableView/useHeaderRowGenerator.tsx ***!
  \********************************************************************************************/
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
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Checkbox */ "./domains/eventEditor/src/ui/tickets/ticketsList/tableView/Checkbox.tsx");





const useHeaderRowGenerator = () => {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(filterState => {
    const {
      displayStartOrEndDate
    } = filterState;
    const cellsData = [{
      key: 'stripe',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-entity-list-status-stripe ee-rspnsv-table-column-nano',
      value: ''
    }, {
      key: 'checkbox',
      type: 'cell',
      className: 'ee-date-list-col-hdr ee-date-list-col-checkbox ee-rspnsv-table-column-micro',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'ee-rspnsv-table-hide-on-mobile'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Checkbox__WEBPACK_IMPORTED_MODULE_3__["default"], null))
    }, {
      key: 'id',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-id ee-number-column ee-rspnsv-table-column-nano',
      value: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('ID')
    }, {
      key: 'name',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-name ee-rspnsv-table-column-bigger',
      value: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Name')
    }, {
      key: 'start',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-name-start ee-rspnsv-table-column-default',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-long-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Goes on Sale')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-short-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('On Sale')))
    }, {
      key: 'end',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-end ee-rspnsv-table-column-default',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-long-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Sale Ends')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-short-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Ends')))
    }, {
      key: 'price',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-price ee-rspnsv-table-column-tiny ee-number-column',
      value: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Price')
    }, {
      key: 'quantity',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-quantity ee-rspnsv-table-column-tiny ee-number-column',
      value: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Quantity')
    }, {
      key: 'sold',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-sold ee-rspnsv-table-column-tiny ee-number-column',
      value: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Sold')
    }, {
      key: 'registrations',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-ticket-list-col-registrations ee-rspnsv-table-column-smaller ee-centered-column',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-long-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Registrations')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-short-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Regs')))
    }, {
      key: 'actions',
      type: 'cell',
      className: 'ee-ticket-list-col-hdr ee-actions-column ee-rspnsv-table-column-big ee-centered-column',
      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'ee-rspnsv-table-long-label'
      }, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Actions'))
    }];
    const cells = cellsData.filter(Object(_eventespresso_edtr_services__WEBPACK_IMPORTED_MODULE_2__["filterCellByStartOrEndDate"])(displayStartOrEndDate));
    return {
      cells,
      className: 'ee-editor-ticket-list-items-header-row',
      key: 'ticket-header-row',
      primary: true,
      type: 'row'
    };
  }, []);
};

/* harmony default export */ __webpack_exports__["default"] = (useHeaderRowGenerator);

/***/ })

}]);
//# sourceMappingURL=tickets-table-view.chunk.js.map
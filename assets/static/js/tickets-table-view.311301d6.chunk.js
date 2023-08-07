(this.webpackJsonproot=this.webpackJsonproot||[]).push([[26],{1784:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n(3),c=n(5),a=n(16),s=n(1),r=function(e){var t=e.ticket,n=Object(a.useRegistrationsLink)({ticket_id:t.dbId}),r=Object(i.__)("total registrations."),u=Object(i.__)("view ALL registrations for this ticket.");return Object(s.jsx)(c.ItemCount,{count:t.registrationCount,emphasizeZero:!1,title:r,children:Object(s.jsx)(c.RegistrationsLink,{href:n,tooltip:u})})}},1785:function(e,t,n){"use strict";var i=n(43),c=n(34),a=n.n(c),s=n(0),r=n(3),u=n(17),l=n(5),o=n(16),b=n(164),j=n(1);t.a=function(e){var t=e.entity,n=Object(o.useTicketMutator)(t.id).updateEntity,c=Object(b.useSystemNotifications)(),O=Object(o.useCappedQuantity)(),d=Object(s.useCallback)(function(){var e=Object(i.a)(a.a.mark((function e(i){var s,l,o,b;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=Object(u.parseInfinity)(i),l=O({quantity:s,ticketId:t.id}),o=l!==s,b=l!==t.quantity,o&&c.info({message:Object(r.__)("Ticket quantity has been adjusted because it cannot be more than the related event date capacity.")}),!b&&!o){e.next=8;break}return e.next=8,n({quantity:l});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[O,t.id,t.quantity,c,n]);return Object(j.jsx)(l.InlineEditInfinity,{"data-testid":"ee-ticket-inline-qty",onChange:d,tooltip:Object(r.__)("edit quantity of tickets available\u2026"),value:"".concat(t.quantity)},t.cacheId)}},1786:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return _}));var i=n(0),c=n(3),a=n(16),s=n(5),r=n(1),u=function(e){var t=e.className,n=e["data-testid"],u=e.entity,l=e.view,o=void 0===l?"card":l,b=Object(a.useTicketMutator)(u.id).updateEntity,j="card"===o&&2,O=Object(i.useCallback)((function(e){e!==u.name&&b({name:e})}),[u.name,b]);return Object(r.jsx)(s.InlineEditText,{className:t,"data-testid":n,lineCount:j,onChange:O,tag:"table"===o?"div":"h4",tooltip:Object(c.__)("click to edit title\u2026"),value:u.name||Object(c.__)("add title\u2026")})},l=n(27),o=n(63),b=n(26),j=n(24),O=n(12),d=n(84),f=n(32),p=n(2),m=n(43),k=n(34),y=n.n(k),v=function(e){var t=Object(a.useLazyTicket)(),n=Object(a.useTicketPrices)(),c=Object(d.useInitialState)({ticketId:e,getTicket:t,getTicketPrices:n}),s=Object(d.useDefaultBasePrice)(),r=Object(d.useMutatePrices)(),u=Object(a.useTicketMutator)(e).updateEntity;return Object(i.useCallback)(function(){var e=Object(m.a)(y.a.mark((function e(t){var n,i,a,l,o,b,j,m,k;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=c(null),a=Object(p.a)(Object(p.a)({},i.ticket),{},{price:t}),i=Object(p.a)(Object(p.a)({},i),{},{ticket:a}),l=Object(O.getBasePrice)(i.prices),o=Object(O.getPriceModifiers)(i.prices),b=Object(d.calculateBasePrice)(null===(n=i.ticket)||void 0===n?void 0:n.price,i.prices),j=l?Object(p.a)(Object(p.a)({},l),{},{isModified:!0}):Object(p.a)(Object(p.a)({},s),{},{order:1,isNew:!0}),m=[Object(p.a)(Object(p.a)({},j),{},{amount:b})].concat(Object(f.a)(o)),e.next=10,r(m);case 10:return k=e.sent,e.next=13,u({price:t,reverseCalculate:!0,prices:k});case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[s,c,r,u])},_=function(e){var t=e.entity,n=e.className,a=Object(j.useMoneyDisplay)(),u=a.afterAmount,f=a.beforeAmount,p=a.formatAmount,m=v(t.id),k=Object(i.useCallback)((function(e){var n=e.amount,i=Math.abs(n);i!==t.price&&m(i)}),[m,t.price]),y=Object(d.useLockedTicketAction)(t,"COPY/TRASH"),_=y.alertContainer,x=y.showAlert,h=Object(b.useMemoStringify)({className:n}),C=Object(O.isLocked)(t),T=Object(c.__)("edit ticket total\u2026");return C?Object(r.jsxs)(l.Clickable,{as:"div",className:"ee-ticket-editable-price",onClick:x,children:[Object(r.jsx)(o.CurrencyDisplay,{className:n,value:t.price}),_]}):Object(r.jsx)(s.InlineEditCurrency,{afterAmount:u,amount:t.price,beforeAmount:f,formatAmount:p,id:t.id,placeholder:Object(c.__)("set price\u2026"),wrapperProps:h,onChange:k,tag:"h3",tooltip:T})}},1789:function(e,t,n){"use strict";var i=n(2),c=n(8),a=n(5),s=n(456),r=function(e){return Object(s.b)("ticket",e)},u=n(1);t.a=function(e){var t=e.entity,n=Object(c.a)(e,["entity"]),s=r(t);return Object(u.jsx)(a.EntityActionsMenu,Object(i.a)(Object(i.a)({},n),{},{menuItems:s}))}},1790:function(e,t,n){"use strict";n.r(t);var i=n(3),c=n(63),a=n(0),s=n(16),r=n(2),u=n(9),l=n(36),o=n(24),b=n(1),j=Object(o.withCurrentUserCan)(l.USE_ADVANCED_EDITOR)((function(e){var t=Object(s.useVisibleTicketIds)(),n=Object(u.a)(t,1)[0];return Object(b.jsx)(c.ActionCheckbox,Object(r.a)(Object(r.a)({},e),{},{visibleEntityIds:n}))})),O=function(){var e=Object(a.useMemo)((function(){return{className:"ee-entity-list-status-stripe",key:"stripe",size:"nano",textAlign:"center",value:""}}),[]),t=Object(a.useMemo)((function(){return{key:"id",size:"micro",textAlign:"end",value:Object(i.__)("ID")}}),[]),n=Object(a.useMemo)((function(){return{key:"name",size:"huge",value:Object(i.__)("Name")}}),[]),c=Object(a.useMemo)((function(){return{key:"start",size:"default",value:Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("span",{className:"ee-rspnsv-table-long-label",children:Object(i.__)("Goes on Sale")}),Object(b.jsx)("span",{className:"ee-rspnsv-table-short-label",children:Object(i.__)("On Sale")})]})}}),[]),r=Object(a.useMemo)((function(){return{key:"end",size:"default",value:Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("span",{className:"ee-rspnsv-table-long-label",children:Object(i.__)("Sale Ends")}),Object(b.jsx)("span",{className:"ee-rspnsv-table-short-label",children:Object(i.__)("Ends")})]})}}),[]),u=Object(a.useMemo)((function(){return{key:"price",size:"tiny",textAlign:"end",value:Object(i.__)("Price")}}),[]),l=Object(a.useMemo)((function(){return{key:"quantity",size:"tiny",textAlign:"end",value:Object(i.__)("Qty")}}),[]),o=Object(a.useMemo)((function(){return{key:"sold",size:"tiny",textAlign:"end",value:Object(i.__)("Sold")}}),[]),O=Object(a.useMemo)((function(){return{key:"registrations",size:"smaller",textAlign:"center",value:Object(i.__)("Reg List")}}),[]),d=Object(a.useMemo)((function(){return{key:"actions",size:"big",textAlign:"center",value:Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("span",{className:"ee-rspnsv-table-long-label",children:Object(i.__)("Actions")}),Object(b.jsx)("span",{className:"ee-rspnsv-table-short-label",children:Object(i.__)("Actions")})]})}}),[]);return Object(a.useCallback)((function(i){var a=i.displayStartOrEndDate,f=i.showBulkActions;return{cells:[e,f&&{key:"checkbox",size:"micro",textAlign:"center",value:Object(b.jsx)("div",{className:"ee-rspnsv-table-hide-on-mobile",children:Object(b.jsx)(j,{})})},t,n,c,r,u,l,o,O,d].filter(Boolean).filter(Object(s.filterCellByStartOrEndDate)(a)),className:"ee-editor-ticket-list-items-header-row",key:"ticket-header-row",primary:!0,type:"row"}}),[t,d,r,n,u,l,O,o,c,e])},d=n(10),f=n.n(d),p=n(111),m=n(4),k=n(5),y=n(233),v=n(12),_=n(1789),x=n(1785),h=n(1786),C=n(1784),T=function(){var e=Object(s.useTickets)(),t=Object(a.useCallback)((function(t){return Object(v.findEntityByGuid)(e)(t)}),[e]),n=Object(s.useLazyTicket)(),i=Object(o.useTimeZoneTime)().formatForSite;return Object(a.useCallback)((function(e){var a=e.entityId,r=e.filterState,u=t(a)||n(a),o=r.displayStartOrEndDate,O=r.showBulkActions,d=Object(y.getTicketBackgroundColorClassName)(u),v=u.dbId||0,T=Object(y.ticketStatus)(u),g={className:f()("ee-entity-list-status-stripe",d),key:"stripe",showValueOnMobile:!0,textAlign:"center",value:u.name},w=O&&{key:"cell",size:"micro",textAlign:"center",value:Object(b.jsx)(j,{dbId:u.dbId,id:u.id})},A={key:"id",size:"micro",textAlign:"end",value:v},S={className:"ee-col-name ee-rspnsv-table-hide-on-mobile",key:"name",size:"huge",value:Object(b.jsx)(h.a,{className:"ee-entity-name ee-entity-list-text ee-focus-priority-5","data-testid":"ee-entity-list-view-row-editable-".concat(u.dbId),entity:u,view:"table"})},E={key:"start",size:"default",value:i(Object(p.a)(u.startDate),l.ENTITY_LIST_DATE_TIME_FORMAT)},I={key:"end",size:"default",value:i(Object(p.a)(u.endDate),l.ENTITY_LIST_DATE_TIME_FORMAT)},M={key:"price",size:"tiny",textAlign:"end",value:Object(b.jsx)(c.CurrencyDisplay,{value:u.price})},D={key:"sold",size:"tiny",textAlign:"end",value:u.sold},B=[g,w,A,S,E,I,M,{className:"ee-col__inline-edit",key:"quantity",size:"tiny",textAlign:"end",value:Object(b.jsx)(x.a,{entity:u})},D,{key:"registrations",size:"smaller",textAlign:"center",value:Object(b.jsx)(C.a,{ticket:u})},{key:"actions",size:"big",textAlign:"center",value:Object(b.jsx)(_.a,{entity:u})}].filter(Boolean);return{cells:m.pipe(m.filter(Object(s.filterCellByStartOrEndDate)(o)),Object(k.addZebraStripesOnMobile)(["row","stripe","name","actions"]))(B),className:{bodyRowClassName:"ee-editor-ticket-list-view-row ".concat(T)},"data-testid":"ee-ticket-list-view-row-".concat(u.dbId),id:"ee-editor-ticket-list-view-row-".concat(u.id),key:"row-".concat(u.id),rowClassName:"ee-entity-list-item",type:"row"}}),[i,n,t])},g=n(84),w=n(26),A=n(50),S=n(1769),E=n(1673),I=n(1770),M=n(43),D=n(34),B=n.n(D),N=n(218),P=n(82),z=function(){var e=Object(M.a)(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(P.yupToFinalFormErrors)(R,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=N.b({name:N.c().min(3,(function(){return Object(i.__)("Name must be at least three characters")}))}),F=Object(A.intervalsToOptions)(m.pick(["months","weeks","days","hours","minutes"],A.DATE_INTERVALS),!0),q=function(e){var t=e.onSubmit,n=Object(a.useCallback)((function(e,n){for(var i=arguments.length,c=new Array(i>2?i-2:0),a=2;a<i;a++)c[a-2]=arguments[a];return t.apply(void 0,[e,n].concat(c))}),[t]),c=Object(w.useMemoStringify)({className:"ee-form-item-pair"});return Object(a.useMemo)((function(){return Object(r.a)(Object(r.a)({},e),{},{onSubmit:n,validate:z,layout:"horizontal",debugFields:["values","errors"],sections:[{name:"basics",icon:S.a,title:Object(i.__)("Basics"),fields:[{name:"name",label:Object(i.__)("Name"),fieldType:"text",min:3},{name:"description",label:Object(i.__)("Description"),fieldType:"simple-text-editor"}]},{name:"dates",icon:E.a,title:Object(i.__)("Dates"),fields:[{name:"shiftDates",label:Object(i.__)("Shift dates"),fieldType:"group",formControlProps:{className:"shift-dates"},subFields:[{name:"value",fieldType:"number"},{name:"unit",fieldType:"select",options:F},{name:"type",fieldType:"select",options:[{label:"",value:""},{label:Object(i.__)("earlier"),value:"earlier"},{label:Object(i.__)("later"),value:"later"}]}]}]},{name:"details",icon:I.a,title:Object(i.__)("Details"),fields:[{name:"quantity",label:Object(i.__)("Quantity For Sale"),fieldType:"number",formControlProps:c,parseAsInfinity:!0,max:1e6,min:-1},{name:"uses",label:Object(i.__)("Number of Uses"),fieldType:"number",parseAsInfinity:!0,formControlProps:c,min:0},{name:"min",label:Object(i.__)("Minimum Quantity"),fieldType:"number",formControlProps:c,max:1e6,min:0},{name:"max",label:Object(i.__)("Maximum Quantity"),fieldType:"number",parseAsInfinity:!0,formControlProps:c,max:1e6,min:-1},{name:"isRequired",label:Object(i.__)("Required Ticket"),fieldType:"switch",formControlProps:c}]}]})}),[c,e,n])},L=function(e){var t=Object(o.useBulkEdit)(),n=t.getSelected,i=t.unSelectAll,c=Object(s.useTickets)(),u=Object(s.useBulkEditTickets)().updateEntities,l=Object(s.useCappedQuantity)();return Object(a.useCallback)(function(){var t=Object(M.a)(B.a.mark((function t(a){var o;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(),"quantity"in(o=Object(s.formToBulkUpdateInput)(a,c,n())).sharedInput&&(o.uniqueInputs=o.uniqueInputs.map((function(e){var t=l({quantity:o.sharedInput.quantity,ticketId:e.id});return Object(r.a)(Object(r.a)({},e),{},{quantity:t})}))),i(),t.next=6,u(o);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[c,l,n,e,i,u])},G=function(e){var t=e.onClose,n=e.isOpen,a=L(t),s=q({onSubmit:a});return Object(b.jsx)(c.BulkEditDetails,{formConfig:s,isOpen:n,onClose:t,title:Object(i.__)("Bulk edit ticket details"),warning:Object(i.__)("any changes will be applied to ALL of the selected tickets.")})},Q=function(e){var t=e.areTrashedTickets,n=e.onClose,i=Object(o.useBulkEdit)(),c=i.getSelected,r=i.unSelectAll,u=Object(s.useBulkDeleteTickets)();return Object(a.useCallback)((function(){n(),r(),u({entityIds:c(),deletePermanently:t})}),[t,u,c,n,r])},U=function(e){var t=e.areTrashedTickets,n=e.onClose,c=Q({areTrashedTickets:t,onClose:n}),s=Object(k.useConfirmationDialog)({message:t?Object(i.__)("Are you sure you want to permanently delete these tickets? This action can NOT be undone!"):Object(i.__)("Are you sure you want to trash these tickets?"),title:t?Object(i.__)("Delete tickets permanently"):Object(i.__)("Trash tickets"),onConfirm:c,onCancel:n}),r=s.confirmationDialog,u=s.onOpen;return Object(a.useEffect)((function(){return u()}),[]),Object(b.jsx)(b.Fragment,{children:r})},V=n(27),Y=function(e){var t=e.setEditMode,n=Object(a.useCallback)((function(){return t("together")}),[t]),c=Object(a.useCallback)((function(){return t("separate")}),[t]);return Object(b.jsxs)(V.Box,{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",children:[Object(b.jsxs)(V.Box,{children:[Object(b.jsx)(k.Button,{onClick:n,buttonText:Object(i.__)("Edit all prices together")}),Object(b.jsx)("p",{children:Object(i.__)("Edit all the selected ticket prices dynamically")})]}),Object(b.jsx)(k.Divider,{orientation:"vertical"}),Object(b.jsxs)(V.Box,{children:[Object(b.jsx)(k.Button,{onClick:c,buttonText:Object(i.__)("Edit prices individually")}),Object(b.jsx)("p",{children:Object(i.__)("Edit prices for each ticket individually")})]})]})},Z=function(e){var t=e.onSubmit,n=e.onReset,c=e.onCancel;return Object(b.jsxs)(k.ButtonRow,{fullWidth:!0,horizontalAlign:"right",topBordered:!0,children:[n&&Object(b.jsx)(k.Button,{buttonText:Object(i.__)("Reset"),onClick:n,type:"reset"}),c&&Object(b.jsx)(k.Button,{buttonText:Object(i.__)("Cancel"),onClick:c}),Object(b.jsx)(k.Button,{buttonText:Object(i.__)("Submit"),buttonType:k.ButtonType.PRIMARY,onClick:t,type:"submit"})]})},J=n(32),W=function(e){var t=Object(g.useDataState)(),n=t.prices,i=t.ticket,c=Object(o.useBulkEdit)().getSelected,u=Object(g.useMutateTicket)(),l=Object(s.useTicketPrices)(),b=Object(s.useBulkDeletePrices)();return Object(a.useCallback)(Object(M.a)(B.a.mark((function t(){var a,s;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(),a=c().reduce((function(e,t){return[].concat(Object(J.a)(e),Object(J.a)(l(t)))}),[]),s=a.filter(v.isNotDefault),t.next=5,b(Object(v.getGuids)(s));case 5:return t.next=7,Promise.all(c().map(function(){var e=Object(M.a)(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(Object(r.a)(Object(r.a)({},i),{},{id:t,isModified:!0,prices:n}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 7:case"end":return t.stop()}}),t)}))),[b,c,l,u,e,n,i])},H=Object(g.withContext)((function(e){var t=e.onClose,n=Object(g.useAddDefaultPrices)();Object(a.useEffect)((function(){n()}),[]);var i=W(t);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(g.TicketPriceCalculator,{}),Object(b.jsx)(Z,{onSubmit:i,onReset:n})]})}),{ticketId:""}),K=function(e){var t=e.setTPCState,n=Object(g.useDataState)(),c=n.ticket,s=n.getData;return Object(a.useEffect)((function(){t(s())}),[s]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("header",{children:Object(i.sprintf)(Object(i.__)("Edit prices for Ticket: %s"),c.name)}),Object(b.jsx)(g.TicketPriceCalculator,{})]})},X=n(14),$=function(e,t){var n=Object(g.useOnSubmitPrices)();return Object(a.useCallback)(Object(M.a)(B.a.mark((function i(){return B.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return e(),i.next=3,Promise.all(Object.values(t()).map(function(){var e=Object(M.a)(B.a.mark((function e(t){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:case"end":return i.stop()}}),i)}))),[t,e,n])},ee=function(e){var t=e.onClose,n=Object(o.useBulkEdit)().getSelected,i=function(){var e=Object(a.useRef)({}),t=Object(a.useCallback)((function(t){var n;e.current=Object(r.a)(Object(r.a)({},e.current),{},Object(X.a)({},null===t||void 0===t||null===(n=t.ticket)||void 0===n?void 0:n.id,t))}),[e]),n=Object(a.useCallback)((function(){return e.current}),[e]);return Object(a.useMemo)((function(){return{setTPCState:t,getDataStates:n}}),[t,n])}(),c=i.getDataStates,s=i.setTPCState,u=$(t,c),l=n();return Object(b.jsxs)(b.Fragment,{children:[l.map((function(e){var t=Object(g.withContext)(K,{ticketId:e});return Object(b.jsx)(t,{setTPCState:s},e)})),Object(b.jsx)(Z,{onSubmit:u,onCancel:t})]})},te=function(e){var t=e.onClose,n=e.isOpen,c=Object(a.useState)(),s=Object(u.a)(c,2),r=s[0],l=s[1];return Object(b.jsxs)(k.EntityEditModal,{isOpen:n,onClose:t,closeOnOverlayClick:!0,title:Object(i.__)("Bulk edit ticket prices"),showAlertOnClose:!1,children:[!r&&Object(b.jsx)(Y,{setEditMode:l}),"together"===r&&Object(b.jsx)(H,{onClose:t}),"separate"===r&&Object(b.jsx)(ee,{onClose:t})]})},ne=Object(o.withCurrentUserCan)(l.USE_ADVANCED_EDITOR)((function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1],l=Object(w.useDisclosure)(),O=l.isOpen,d=l.onOpen,f=l.onClose,p=Object(s.useTicketsListFilterState)(),m=p.status,y=p.showBulkActions,_=Object(o.useBulkEdit)().getSelected,x=Object(s.useTickets)(),h=Object(a.useMemo)((function(){return Object(v.entitiesWithGuIdInArray)(x,_()).some((function(e){return Boolean(e.sold)}))}),[x,_]),C=m===v.TicketsStatus.trashedOnly,T=Object(w.useMemoStringify)([{value:"",label:Object(i.__)("bulk actions")},{value:"edit-details",label:Object(i.__)("edit ticket details")},{value:"delete",label:C?Object(i.__)("delete tickets"):Object(i.__)("trash tickets")},{value:"edit-prices",label:Object(i.__)("edit ticket prices"),disabled:h}]),A=Object(a.useCallback)((function(e){r(e),d()}),[d]);return Object(b.jsxs)(k.Collapsible,{show:y,children:[Object(b.jsx)(c.BulkActions,{Checkbox:j,defaultAction:"",id:"ee-bulk-edit-tickets-actions",onApply:h?null:A,options:T}),O&&Object(b.jsxs)(b.Fragment,{children:["edit-details"===n&&Object(b.jsx)(G,{isOpen:!0,onClose:f}),"delete"===n&&Object(b.jsx)(U,{areTrashedTickets:C,onClose:f}),"edit-prices"===n&&Object(b.jsx)(te,{isOpen:!0,onClose:f})]}),Object(b.jsx)(k.ErrorMessage,{message:h&&g.SOLD_TICKET_ERROR_MESSAGE,variant:"subtle"})]})}));t.default=Object(o.withBulkEdit)((function(){var e=Object(s.useTicketsListFilterState)(),t=Object(s.useFilteredTicketIds)(),n=Object(s.useReorderTickets)(t).sortResponder,a=T(),r=O();return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(ne,{}),Object(b.jsx)(c.EntityTable,{bodyRowGenerator:a,domain:s.domain,entityIds:t,filterState:e,headerRowGenerator:r,listId:s.ticketsList,onSort:n,tableCaption:Object(i.__)("Tickets"),tableId:"ticket-entities-table-view"})]})}))}}]);
//# sourceMappingURL=tickets-table-view.311301d6.chunk.js.map
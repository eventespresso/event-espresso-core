(this.webpackJsonproot=this.webpackJsonproot||[]).push([[25],{1777:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var a=i(3),c=i(5),n=i(15),s=i(1),r=function(t){var e=t.ticket,i=Object(n.useRegistrationsLink)({ticket_id:e.dbId}),r=Object(a.__)("total registrations."),u=Object(a.__)("view ALL registrations for this ticket.");return Object(s.jsx)(c.ItemCount,{count:e.registrationCount,emphasizeZero:!1,title:r,children:Object(s.jsx)(c.RegistrationsLink,{href:i,tooltip:u})})}},1778:function(t,e,i){"use strict";var a=i(44),c=i(33),n=i.n(c),s=i(0),r=i(3),u=i(16),o=i(5),b=i(15),d=i(163),l=i(1);e.a=function(t){var e=t.entity,i=Object(b.useTicketMutator)(e.id).updateEntity,c=Object(d.useSystemNotifications)(),j=Object(b.useCappedQuantity)(),O=Object(s.useCallback)(function(){var t=Object(a.a)(n.a.mark((function t(a){var s,o,b,d;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=Object(u.parseInfinity)(a),o=j({quantity:s,ticketId:e.id}),b=o!==s,d=o!==e.quantity,b&&c.info({message:Object(r.__)("Ticket quantity has been adjusted because it cannot be more than the related event date capacity.")}),!d&&!b){t.next=8;break}return t.next=8,i({quantity:o});case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[j,e.id,e.quantity,c,i]);return Object(l.jsx)(o.InlineEditInfinity,{"data-testid":"ee-ticket-inline-qty",onChange:O,tooltip:Object(r.__)("edit quantity of tickets available\u2026"),value:"".concat(e.quantity)},e.cacheId)}},1779:function(t,e,i){"use strict";i.d(e,"a",(function(){return u})),i.d(e,"b",(function(){return v}));var a=i(0),c=i(3),n=i(15),s=i(5),r=i(1),u=function(t){var e=t.className,i=t["data-testid"],u=t.entity,o=t.view,b=void 0===o?"card":o,d=Object(n.useTicketMutator)(u.id).updateEntity,l="card"===b&&2,j=Object(a.useCallback)((function(t){t!==u.name&&d({name:t})}),[u.name,d]);return Object(r.jsx)(s.InlineEditText,{className:e,"data-testid":i,lineCount:l,onChange:j,tag:"table"===b?"div":"h4",tooltip:Object(c.__)("click to edit title\u2026"),value:u.name||Object(c.__)("add title\u2026")})},o=i(27),b=i(63),d=i(26),l=i(24),j=i(12),O=i(84),p=i(32),k=i(2),y=i(44),f=i(33),_=i.n(f),m=function(t){var e=Object(n.useLazyTicket)(),i=Object(n.useTicketPrices)(),c=Object(O.useInitialState)({ticketId:t,getTicket:e,getTicketPrices:i}),s=Object(O.useDefaultBasePrice)(),r=Object(O.useMutatePrices)(),u=Object(n.useTicketMutator)(t).updateEntity;return Object(a.useCallback)(function(){var t=Object(y.a)(_.a.mark((function t(e){var i,a,n,o,b,d,l,y,f;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=c(null),n=Object(k.a)(Object(k.a)({},a.ticket),{},{price:e}),a=Object(k.a)(Object(k.a)({},a),{},{ticket:n}),o=Object(j.getBasePrice)(a.prices),b=Object(j.getPriceModifiers)(a.prices),d=Object(O.calculateBasePrice)(null===(i=a.ticket)||void 0===i?void 0:i.price,a.prices),l=o?Object(k.a)(Object(k.a)({},o),{},{isModified:!0}):Object(k.a)(Object(k.a)({},s),{},{order:1,isNew:!0}),y=[Object(k.a)(Object(k.a)({},l),{},{amount:d})].concat(Object(p.a)(b)),t.next=10,r(y);case 10:return f=t.sent,t.next=13,u({price:e,reverseCalculate:!0,prices:f});case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[s,c,r,u])},v=function(t){var e=t.entity,i=t.className,n=Object(l.useMoneyDisplay)(),u=n.afterAmount,p=n.beforeAmount,k=n.formatAmount,y=m(e.id),f=Object(a.useCallback)((function(t){var i=t.amount,a=Math.abs(i);a!==e.price&&y(a)}),[y,e.price]),_=Object(O.useLockedTicketAction)(e,"COPY/TRASH"),v=_.alertContainer,x=_.showAlert,h=Object(d.useMemoStringify)({className:i}),g=Object(j.isLocked)(e),C=Object(c.__)("edit ticket total\u2026");return g?Object(r.jsxs)(o.Clickable,{as:"div",className:"ee-ticket-editable-price",onClick:x,children:[Object(r.jsx)(b.CurrencyDisplay,{className:i,value:e.price}),v]}):Object(r.jsx)(s.InlineEditCurrency,{afterAmount:u,amount:e.price,beforeAmount:p,formatAmount:k,id:e.id,placeholder:Object(c.__)("set price\u2026"),wrapperProps:h,onChange:f,tag:"h3",tooltip:C})}},1782:function(t,e,i){"use strict";var a=i(2),c=i(8),n=i(5),s=i(453),r=function(t){return Object(s.b)("ticket",t)},u=i(1);e.a=function(t){var e=t.entity,i=Object(c.a)(t,["entity"]),s=r(e);return Object(u.jsx)(n.EntityActionsMenu,Object(a.a)(Object(a.a)({},i),{},{menuItems:s}))}},1786:function(t,e,i){"use strict";i.r(e);var a=i(5),c=i(15),n=i(231),s=i(2),r=i(0),u=i(3),o=i(34),b=i(63),d=i(1779),l=i(1777),j=i(1),O=function(t){var e=t.ticket,i=Object(c.useRegistrationsLink)({ticket_id:e.dbId,_reg_status:c.QueryURLRegStatus.APPROVED}),n=Object(u.__)("view approved registrations for this ticket.");return Object(j.jsx)(a.RegistrationsLink,{href:i,tooltip:n,children:e.sold})},p=i(1778),k=function(t){var e=t.entity,i=Object(r.useMemo)((function(){return[{id:"ee-ticket-sold",label:Object(u.__)("sold"),value:Object(j.jsx)(O,{ticket:e})},{id:"ee-ticket-qty",label:Object(u.__)("quantity"),value:Object(j.jsx)(p.a,{entity:e})},{id:"ee-ticket-registrations",label:Object(u.__)("reg list"),value:Object(j.jsx)(l.a,{ticket:e})}]}),[e]);return Object(j.jsx)(a.EntityDetailsPanel,{details:i,className:"ee-editor-ticket-details-sold-rsrvd-qty-div"})},y=function(t){var e=t.entity,i=Object(c.useTicketMutator)(e.id).updateEntity,a=Object(r.useCallback)((function(t){i({description:t})}),[i]),n=Object(r.useMemo)((function(){return c.hooks.applyFilters("eventEditor.tickets.inlineDescriptionProps",o.EMPTY_OBJECT,e)}),[e]);return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(d.a,{className:"entity-card-details__name",entity:e}),Object(j.jsx)(b.SimpleTextEditorModal,Object(s.a)({className:"entity-card-details__text",onUpdate:a,text:e.description||Object(u.__)("add description\u2026"),title:Object(u.__)("Edit description"),tooltip:Object(u.__)("click to edit description\u2026")},n)),Object(j.jsx)(d.b,{className:"entity-card-details__price",entity:e}),Object(j.jsx)(k,{entity:e})]})},f=i(9),_=i(24),m=function(t){var e=t.entity,i=Object(c.useTicketsListFilterState)().displayStartOrEndDate,a=Object(c.useTicketMutator)(e.id).updateEntity,s=Object(_.useTimeZoneTime)().siteTimeToUtc,o=Object(r.useCallback)((function(t){var e=Object(f.a)(t,2),i=e[0],c=e[1],n=s(i).toISOString(),r=s(c).toISOString();a({startDate:n,endDate:r})}),[s,a]),d=Object(n.getTicketStatusTextLabel)(e),l=Object(r.useMemo)((function(){return{headerFuture:"start"===i?Object(u.__)("sales start"):Object(u.__)("sales end"),headerPast:"start"===i?Object(u.__)("sales began"):e.isExpired?Object(u.__)("sales ended"):Object(u.__)("sales end")}}),[e.isExpired,i]);return e?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(b.CalendarDateSwitcher,{displayDate:i,labels:l,endDate:e.endDate,startDate:e.startDate}),Object(j.jsx)(b.EditDateRangeButton,{endDate:e.endDate,header:Object(u.__)("Edit Ticket Sale Dates"),onChange:o,popoverPlacement:"left-end",startDate:e.startDate,tooltip:Object(u.__)("edit ticket sales start and end dates")}),Object(j.jsx)("div",{className:"ee-entity-status-label",children:d})]}):null},v=i(1782),x=function(t){var e=t.id,i=Object(c.useTicketItem)({id:e}),s=Object(n.ticketStatusBgColorClassName)(i);return i?Object(j.jsx)(a.EntityCard,{actionsMenu:Object(j.jsx)(v.a,{entity:i,layout:a.EntityActionsMenuLayout.Vertical}),details:Object(j.jsx)(y,{entity:i}),entity:i,reverse:!0,sidebar:Object(j.jsx)(m,{entity:i}),sidebarClass:s}):null};e.default=function(){var t=Object(c.useFilteredTicketIds)();return Object(j.jsx)(a.EntityCardList,{EntityCard:x,entityIds:t})}}}]);
//# sourceMappingURL=tickets-card-view.b4bdb8af.chunk.js.map
(this.webpackJsonproot=this.webpackJsonproot||[]).push([[5],{1749:function(t,e,i){"use strict";var a=i(3),n=i(5),c=i(11),s=i(1);e.a=function(t){var e=t.datetime,i=Object(c.useRegistrationsLink)({datetime_id:e.dbId}),d=Object(a.__)("view ALL registrations for this date.");return Object(s.jsx)(n.RegistrationsLink,{href:i,tooltip:d})}},1750:function(t,e,i){"use strict";var a=i(0),n=i(3),c=i(13),s=i(5),d=i(11),r=i(1);e.a=function(t){var e=t.entity,i=Object(d.useDatetimeMutator)(e.id).updateEntity,u=Object(d.useUpdateRelatedTickets)(),o=Object(d.useTicketQuantityForCapacity)(),l=Object(a.useCallback)((function(t){var a=Object(c.parseInfinity)(t);if(a!==e.capacity){i({capacity:a});var n=o(a);u(e.id,n)}}),[e.capacity,e.id,i,o,u]),j=Object(n.sprintf)(Object(n.__)("click to edit capacity%s(registration limit)\u2026"),"\n");return Object(r.jsx)(s.InlineEditInfinity,{"data-testid":"ee-datetime-inline-cap",onChange:l,tooltip:j,value:"".concat(e.capacity)})}},1754:function(t,e,i){"use strict";var a=i(2),n=i(6),c=i(5),s=i(793),d=function(t){return Object(s.a)("datetime",t)},r=i(1);e.a=function(t){var e=t.entity,i=Object(n.a)(t,["entity"]),s=d(e);return Object(r.jsx)(c.EntityActionsMenu,Object(a.a)(Object(a.a)({},i),{},{menuItems:s}))}},1755:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var a=i(0),n=i(3),c=i(11),s=i(5),d=i(1),r=function(t){var e=t.className,i=t["data-testid"],r=t.entity,u=t.view,o=void 0===u?"card":u,l=Object(c.useDatetimeMutator)(r.id).updateEntity,j="card"===o&&2,b=Object(a.useCallback)((function(t){t!==r.name&&l({name:t})}),[r.name,l]);return Object(d.jsx)(s.InlineEditText,{className:e,"data-testid":i,lineCount:j,onChange:b,tag:"table"===o?"div":"h4",tooltip:Object(n.__)("click to edit title\u2026"),value:r.name||Object(n.__)("add title\u2026")})}},1759:function(t,e,i){"use strict";i.r(e);var a=i(5),n=i(11),c=i(321),s=i(1754),d=i(7),r=i(0),u=i(3),o=i(59),l=i(20),j=i(1),b=function(t){var e=t.entity,i=Object(n.useDatesListFilterState)().displayStartOrEndDate,a=Object(n.useDatetimeMutator)(e.id).updateEntity,s=Object(l.useTimeZoneTime)().siteTimeToUtc,b=Object(r.useCallback)((function(t){var e=Object(d.a)(t,2),i=e[0],n=e[1],c=s(i).toISOString(),r=s(n).toISOString();a({startDate:c,endDate:r})}),[s,a]),O=Object(c.getDatetimeStatusTextLabel)(e),v=Object(r.useMemo)((function(){return{headerFuture:"start"===i?Object(u.__)("starts"):Object(u.__)("ends"),headerPast:"start"===i?Object(u.__)("started"):e.isExpired?Object(u.__)("ended"):Object(u.__)("ends")}}),[e.isExpired,i]);return e?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(o.CalendarDateSwitcher,{displayDate:i,labels:v,endDate:e.endDate,startDate:e.startDate}),Object(j.jsx)(o.EditDateRangeButton,{endDate:e.endDate,header:Object(u.__)("Edit Event Date"),onChange:b,popoverPlacement:"right-end",startDate:e.startDate,tooltip:Object(u.__)("edit start and end dates")}),Object(j.jsx)("div",{className:"ee-entity-status-label",children:O})]}):null},O=i(2),v=i(29),m=i(9),y=i(1749),p=i(1750),_=function(t){var e=t.adminUrl,i=t.entity,n=t.eventId,c=Object(r.useMemo)((function(){return[{id:"ee-event-date-sold",label:Object(u.__)("sold"),value:Object(j.jsx)(a.EntityDetailsPanelSold,{adminUrl:e,dbId:i.dbId,eventId:n,sold:i.sold,type:"date"})},{id:"ee-event-date-capacity",label:Object(u.__)("capacity"),value:Object(j.jsx)(p.a,{entity:i})},{id:"ee-event-date-registrations",className:"ee-has-tooltip",label:Object(u.__)("reg list"),value:Object(j.jsx)(y.a,{datetime:i})}]}),[e,i,n]);return Object(j.jsx)(a.EntityDetailsPanel,{details:c,className:"ee-editor-date-details-sold-rsrvd-cap-div"})},f=i(1755),x=i(445),E=function(t){return Object(x.c)("datetime",t)},D=function(t){var e=t.entity,i=Object(l.useConfig)().siteUrl,c=Object(r.useMemo)((function(){return Object(l.getAdminUrl)({adminSiteUrl:i.admin,page:v.ADMIN_ROUTES.REGISTRATIONS})}),[i.admin]),s=Object(n.useEventId)(),d=Object(n.useDatetimeMutator)(e.id).updateEntity,b=Object(r.useCallback)((function(t){d({description:t})}),[d]),y=E(e.id),p=Object(r.useMemo)((function(){return n.hooks.applyFilters("eventEditor.datetimes.inlineDescriptionProps",v.EMPTY_OBJECT,e)}),[e]),x=Object(n.useVenues)(),D=Object(r.useMemo)((function(){return Object(m.findEntityByGuid)(x)(null===e||void 0===e?void 0:e.venue)}),[null===e||void 0===e?void 0:e.venue,x]),g=Object(r.useCallback)((function(t){return d({venue:t})}),[d]);return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(f.a,{className:"entity-card-details__name",entity:e}),Object(j.jsx)(o.SimpleTextEditorModal,Object(O.a)({className:"entity-card-details__text",onUpdate:b,text:e.description||Object(u.__)("add description\u2026"),title:Object(u.__)("Edit description"),tooltip:Object(u.__)("click to edit description\u2026")},p)),Object(j.jsx)(a.VenueSelector,{align:"center",className:"ee-event-venue",inline:!0,noBorderColor:!0,onChangeValue:g,value:null===e||void 0===e?void 0:e.venue,venueName:null===D||void 0===D?void 0:D.name,venues:x}),y,Object(j.jsx)(_,{adminUrl:c,entity:e,eventId:s})]})},g=function(t){var e=t.id,i=Object(n.useDatetimeItem)({id:e}),d=Object(c.datetimeStatusBgColorClassName)(i);return i?Object(j.jsx)(a.EntityCard,{actionsMenu:Object(j.jsx)(s.a,{entity:i,layout:a.EntityActionsMenuLayout.Vertical}),details:Object(j.jsx)(D,{entity:i}),entity:i,sidebar:Object(j.jsx)(b,{entity:i}),sidebarClass:d}):null};e.default=function(){var t=Object(n.useFilteredDateIds)();return Object(j.jsx)(a.EntityCardList,{EntityCard:g,entityIds:t})}}}]);
//# sourceMappingURL=dates-card-view.0d8b93cb.chunk.js.map
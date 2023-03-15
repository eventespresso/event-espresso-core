(()=>{var e={703:(e,t,s)=>{"use strict";var r=s(414);function a(){}function n(){}n.resetWarningCache=a,e.exports=function(){function e(e,t,s,a,n,i){if(i!==r){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var s={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:n,resetWarningCache:a};return s.PropTypes=s,s}},697:(e,t,s)=>{e.exports=s(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},t={};function s(r){var a=t[r];if(void 0!==a)return a.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.blocks,t=window.eejs.i18n;function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function a(e,t,s){return(t=function(e){var t=function(e,t){if("object"!==r(e)||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var a=s.call(e,"string");if("object"!==r(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===r(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const n=window.wp.element,i=window.wp.blockEditor,o=window.wp.components,l=window.wp.data,d=window.eejs.components,p=window.eejs.editorHocs,u=window.eejs.model;var c=s(697),v=s.n(c);const h=window.lodash,m={showExpired:!0,limit:50},y=e=>{let{eventId:t,datetimeId:s,ticketId:r}=e;return 0===t&&0===s&&0===r},_=[];let b=200;class f extends n.Component{constructor(e){super(e),a(this,"setEventId",(e=>{const t=null!==e&&e.value?parseInt(e.value,10):0;this.props.setAttributes({eventId:t,datetimeId:0,ticketId:0}),this.setState({datetimeQueryData:{...this.state.datetimeQueryData,forEventId:t}})})),a(this,"setDatetimeId",(e=>{const t=null!==e&&e.value?parseInt(e.value,10):0;this.props.setAttributes({datetimeId:t,ticketId:0}),this.setState({ticketQueryData:{...this.state.ticketQueryData,forDatetimeId:t}})})),a(this,"setTicketId",(e=>{const t=null!==e&&e.value?parseInt(e.value,10):0;this.props.setAttributes({ticketId:t})})),a(this,"setStatus",(e=>{const t=null!==e&&e.value?e.value:u.statusModel.REGISTRATION_STATUS_ID.APPROVED;this.props.setAttributes({status:t})})),a(this,"setLimit",(e=>{this.props.setAttributes({limit:parseInt(e,10)})})),a(this,"setOrderBy",(e=>{this.props.setAttributes({orderBy:e})})),a(this,"setOrder",(e=>{this.props.setAttributes({order:e})})),a(this,"setAvatarSize",(e=>{this.props.setAttributes({avatarSize:parseInt(e,10)})})),a(this,"toggleShowGravatar",(e=>{this.props.setAttributes({showGravatar:e})})),a(this,"toggleDisplayOnArchives",(e=>{this.props.setAttributes({displayOnArchives:e})}));const{eventId:t,datetimeId:s}=this.props.attributes;this.state={eventQueryData:{...m},datetimeQueryData:{...m,forEventId:t},ticketQueryData:{...m,forDatetimeId:s},statusQueryData:{...m,statusType:u.statusModel.STATUS_TYPE_REGISTRATION}}}getAttendeesDisplay(){const{isLoading:e,attendees:s}=this.props,{showGravatar:r,avatarSize:a,avatarClass:i}=this.props.attributes,l={avatarWidth:a,avatarHeight:a,avatarClass:i};return e?(0,n.createElement)(o.Placeholder,null,(0,n.createElement)(o.Spinner,null)):y(this.props.attributes)&&s===_?(0,n.createElement)(o.Placeholder,null,(0,t.__)("To get started, select what event you want to show attendees from in the block settings.","event_espresso")):!e&&(0,h.isEmpty)(s)?(0,n.createElement)(o.Placeholder,null,(0,t.__)("There are no attendees for selected options.","event_espresso")):(0,n.createElement)(d.EventAttendeeList,{attendees:this.applyLimit(s),showGravatar:r,avatarOptions:l,isLoading:e,containerCssClass:"ee-core-blocks event-espresso-blocks",containerId:"ee-block-event-attendees"})}applyLimit(e){return e.length<=this.props.attributes.limit?e:e.slice(0,this.props.attributes.limit)}getInspectorControls(e){const s=this.props.attendees.length||0;return(0,n.createElement)(i.InspectorControls,null,(0,n.createElement)(o.PanelBody,{title:(0,t.__)("Filter By Settings","event_espresso")},(0,n.createElement)(d.EditorEventSelect,{key:"attendees-event-select",selected:e.eventId,onSelect:this.setEventId,queryData:this.state.eventQueryData}),0!==e.eventId&&(0,n.createElement)(d.EditorDatetimeSelect,{key:"attendees-datetime-select",selected:e.datetimeId,onSelect:this.setDatetimeId,queryData:this.state.datetimeQueryData}),0!==e.datetimeId&&(0,n.createElement)(d.EditorTicketSelect,{key:"attendees-ticket-select",selected:e.ticketId,onSelect:this.setTicketId,queryData:this.state.ticketQueryData}),(0,n.createElement)(d.EditorStatusSelect,{key:"attendees-status-select",selected:e.status,onSelect:this.setStatus,queryData:this.state.statusQueryData,label:(0,t.__)("Select Registration Status","event_espresso")}),(0,n.createElement)(d.QueryLimit,{label:(0,t.__)("Number of Attendees to Display:","event_espresso"),limit:e.limit,onLimitChange:this.setLimit,min:1,withSlider:!1,help:(0,t.sprintf)((0,t._n)("Used to adjust the number of attendees displayed (There is %d total attendee for the current filter settings).","Used to adjust the number of attendees displayed (There are %d total attendees for the current filter settings).",s,"event_espresso"),s)}),(0,n.createElement)(o.SelectControl,{label:(0,t.__)("Order Attendees by:","event_espresso"),value:e.orderBy,options:[{label:(0,t.__)("Attendee id","event_espresso"),value:"id"},{label:(0,t.__)("Last name only","event_espresso"),value:"lastNameOnly"},{label:(0,t.__)("First name only","event_espresso"),value:"firstNameOnly"},{label:(0,t.__)("First, then Last name","event_espresso"),value:"firstThenLastName"},{label:(0,t.__)("Last, then First name","event_espresso"),value:"lastThenFirstName"}],onChange:this.setOrderBy}),(0,n.createElement)(o.SelectControl,{label:(0,t.__)("Sort order:","event_espresso"),value:e.order,options:[{label:(0,t.__)("Ascending","event_espresso"),value:u.QUERY_ORDER_ASC},{label:(0,t.__)("Descending","event_espresso"),value:u.QUERY_ORDER_DESC}],onChange:this.setOrder})),(0,n.createElement)(o.PanelBody,{title:(0,t.__)("Gravatar Setttings","event_espresso")},(0,n.createElement)(o.ToggleControl,{label:(0,t.__)("Display Gravatar","event_espresso"),checked:e.showGravatar,onChange:this.toggleShowGravatar,help:e.showGravatar?(0,t.__)("Gravatar images are shown for each attendee.","event_espresso"):(0,t.__)("No gravatar images are shown for each attendee.","event_espresso")}),e.showGravatar&&(0,n.createElement)(o.RangeControl,{label:(0,t.__)("Size of Gravatar","event_espresso"),value:e.avatarSize,min:10,max:128,onChange:this.setAvatarSize})),(0,n.createElement)(p.NotWithPostTypeCheck,{excludedPostTypeSlugs:"page"},(0,n.createElement)(o.PanelBody,{title:(0,t.__)("Archive Settings","event_espresso")},(0,n.createElement)(o.ToggleControl,{label:(0,t.__)("Display on Archives","event_espresso"),checked:e.displayOnArchives,onChange:this.toggleDisplayOnArchives,help:e.displayOnArchives?(0,t.__)("Attendees are shown whenever this post is listed in an archive view.","event_espresso"):(0,t.__)("Attendees are hidden whenever this post is listed in an archive view.","event_espresso")}))))}render(){return(0,n.createElement)(n.Fragment,null,this.getAttendeesDisplay(),this.getInspectorControls(this.props.attributes))}}a(f,"propTypes",{attendees:v().array,isLoading:v().bool,attributes:v().shape({eventId:v().number,datetimeId:v().number,ticketId:v().number,status:v().string,showGravatar:v().bool,displayOnArchives:v().bool,limit:v().number,orderBy:v().oneOf(["id","lastNameOnly","firstNameOnly","firstThenLastName","lastThenFirstName"]),order:v().oneOf(u.ALLOWED_ORDER_VALUES),avatarSize:v().number,avatarClass:v().string})}),a(f,"defaultProps",{attendees:[],isLoading:!0,attributes:{eventId:0,datetimeId:0,ticketId:0,status:u.statusModel.REGISTRATION_STATUS_ID.APPROVED,showGravatar:!0,displayOnArchives:!1,limit:100,orderBy:"lastThenFirstName",order:u.QUERY_ORDER_ASC,avatarSize:24,avatarClass:"contact"}});const g=(0,l.withSelect)(((e,t)=>{const s={...f.defaultProps.attributes},{eventId:r=s.eventId,datetimeId:a=s.datetimeId,ticketId:n=s.ticketId,status:i=s.status,orderBy:o=s.orderBy,order:l=s.order,limit:d=s.limit}=t.attributes;b=!d||isNaN(d)||d<=b?b:d;const p={forEventId:r,forDatetimeId:a,forTicketId:n,forStatusId:i,showGravatar:!0,defaultWhereConditions:"full_this_minimum_others",order:l,orderBy:o,limit:b},c=u.attendeeModel.getQueryString(p),{getAttendees:v,isRequestingAttendees:h}=e("eventespresso/lists");return{...f.defaultProps,...t,attributes:{...f.defaultProps.attributes,...t.attributes},attendees:y({eventId:r,datetimeId:a,ticketId:n})?_:v(c),isLoading:h(c)}}))(f),I={title:(0,t.__)("Event Attendees","event_espresso"),description:(0,t.__)("Displays a list of people that have registered for the specified event","event_espresso"),icon:"groups",category:"event-espresso",keywords:[(0,t.__)("event","event_espresso"),(0,t.__)("attendees","event_espresso"),(0,t.__)("list","event_espresso")],attributes:{eventId:{type:"number",default:0},datetimeId:{type:"number",default:0},ticketId:{type:"number",default:0},status:{type:"string",default:"RAP"},limit:{type:"number",default:100},order:{type:"string",default:"ASC"},orderBy:{type:"string",default:"lastThenFirstName"},showGravatar:{type:"boolean",default:!1},avatarClass:{type:"string",default:"contact"},avatarSize:{type:"number",default:24},displayOnArchives:{type:"boolean",default:!1}},edit:g,save:()=>null};(0,e.registerBlockType)("eventespresso/event-attendees",I)})()})();
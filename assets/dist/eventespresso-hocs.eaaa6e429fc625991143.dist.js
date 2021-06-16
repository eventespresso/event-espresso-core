!function(){var e={713:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},154:function(e){function t(){return e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.apply(this,arguments)}e.exports=t},703:function(e,t,n){"use strict";var r=n(414);function o(){}function s(){}s.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,s,a){if(a!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:o};return n.PropTypes=n,n}},697:function(e,t,n){e.exports=n(703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},473:function(e){"use strict";e.exports=function(){}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};!function(){"use strict";n.r(r),n.d(r,{withBaseControl:function(){return l},withLatestCheckin:function(){return O},withMoney:function(){return m}});var e=n(154),t=n.n(e),o=n(713),s=n.n(o),a=window.wp.element,i=window.wp.compose,c=window.wp.components,p=n(697),u=n.n(p),l=(e="")=>(0,i.createHigherOrderComponent)((0,i.compose)([i.withInstanceId,n=>{var r,o;return o=r=class extends a.Component{render(){const{label:r,instanceId:o,className:s,help:i}=this.props,p=`inspector-${e}-control-${o}`;return(0,a.createElement)(c.BaseControl,{label:r,id:p,className:s,help:i},(0,a.createElement)(n,t()({},this.props,{label:"",id:p})))}},s()(r,"propTypes",{label:u().string,instanceId:u().oneOfType([u().number,u().string]),className:u().string,help:u().string}),s()(r,"defaultProps",{label:n.defaultProps&&n.defaultProps.label?n.defaultProps.label:""}),o}]),"withBaseControl"),h=window.lodash,d=window.wp.isShallowEqual,f=n.n(d),y=n(473),w=n.n(y),v=window.eejs.valueObjects,m=(e=[])=>n=>{class r extends a.Component{constructor(...t){super(...t),s()(this,"state",{convertedValues:[]}),s()(this,"getNextState",(t=>{let n,r={},o=[];return(0,h.isFunction)(e)?(n=e(t,v.Money),(e=>{w()(e&&e.hasOwnProperty("convertedValues"),'The propNameMap callback for the withMoney HOC should return an object with a "convertedValues" key.'),e&&e.hasOwnProperty("convertedValues")&&w()((0,h.isArray)(e.convertedValues),'The propNameMap callback for the withMoney HOC should return an object with a "convertedValues" key that has an array of numbers as the value.'),w()(e&&e.hasOwnProperty("props"),'The propNameMap callback for the withMoneyHOC should return an object with a "props" key.')})(n),n&&n.props&&(r={...n.props}),o=n.convertedValues||o):(0,h.isArray)(e)?e.forEach((e=>{t[e]&&(r[e]=new v.Money(t[e],v.SiteCurrency),o.push(r[e].toNumber()))})):w()(!1,"The propNameMap argument provided to withMoney must be either a function or an array"),r.convertedValues=o,r})),s()(this,"shouldUpdateStateWithConvertedValues",((e,t,n)=>!f()(n.convertedValues,t.convertedValues)&&n.convertedValues[0]!==t.convertedValues[0]))}componentDidMount(){this.setState(this.getNextState(this.props))}componentDidUpdate(e,t){const n=this.getNextState(this.props);this.shouldUpdateStateWithConvertedValues(e,t,n)&&this.setState(n)}render(){return(0,a.createElement)(n,t()({},this.props,this.state))}}return r},b=window.wp.data,g=window.eejs.validators,O=(0,i.createHigherOrderComponent)((0,i.compose)([(0,b.withSelect)(((e,{registration:t,datetimeId:n})=>{if(!(0,g.isModelEntityOfModel)(t,"registration"))return{};const{getLatestCheckin:r}=e("eventespresso/core"),{hasFinishedResolution:o}=e("core/data");return{checkinEntity:r(t.id,n)||null,hasResolvedCheckin:o("eventespresso/core","getLatestCheckin",[t.id,n])}})),(0,b.withDispatch)(((e,{registration:t,datetimeId:n})=>{const{toggleCheckin:r}=e("eventespresso/core");return{onClick(){(0,g.isModelEntityOfModel)(t,"registration")&&r(t.id,n)}}}))]),"withLatestCheckin")}(),(this.eejs=this.eejs||{}).hocs=r}();
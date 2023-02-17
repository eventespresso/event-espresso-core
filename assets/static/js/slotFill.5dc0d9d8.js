/*! For license information please see slotFill.5dc0d9d8.js.LICENSE.txt */
this.eventespresso=this.eventespresso||{},this.eventespresso.slotFill=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=1655)}({0:function(t,e){t.exports=window.React},1:function(t,e,r){"use strict";t.exports=r(76)},105:function(t,e,r){"use strict";function n(t){return(n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}r.d(e,"a",(function(){return n}))},116:function(t,e,r){"use strict";function n(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}r.d(e,"a",(function(){return n}))},14:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},1655:function(t,e,r){t.exports=r(1692)},1692:function(t,e,r){"use strict";r.r(e),r.d(e,"Slot",(function(){return k})),r.d(e,"Fill",(function(){return E})),r.d(e,"createSlotFill",(function(){return R})),r.d(e,"SlotFillProvider",(function(){return v})),r.d(e,"useSlot",(function(){return m})),r.d(e,"Consumer",(function(){return h}));var n=r(2),i=r(8),o=r(37),c=r(48),u=r(85),l=r(59),s=r(47),a=r(52),f=r(53),b=r(0),p=r(4),O=r(9),d=r(32),y=r(1),j=Object(b.createContext)({registerSlot:function(){},unregisterSlot:function(){},registerFill:function(){},unregisterFill:function(){},getSlot:function(){return null},getFills:function(){return null},subscribe:function(){return null}}),g=j.Provider,h=j.Consumer,v=function(t){Object(a.a)(r,t);var e=Object(f.a)(r);function r(t){var n;return Object(o.a)(this,r),(n=e.call(this,t)).slots=void 0,n.fills=void 0,n.listeners=void 0,n.contextValue=void 0,n.registerSlot=n.registerSlot.bind(Object(u.a)(n)),n.registerFill=n.registerFill.bind(Object(u.a)(n)),n.unregisterSlot=n.unregisterSlot.bind(Object(u.a)(n)),n.unregisterFill=n.unregisterFill.bind(Object(u.a)(n)),n.getSlot=n.getSlot.bind(Object(u.a)(n)),n.getFills=n.getFills.bind(Object(u.a)(n)),n.hasFills=n.hasFills.bind(Object(u.a)(n)),n.subscribe=n.subscribe.bind(Object(u.a)(n)),n.slots={},n.fills={},n.listeners=[],n.contextValue={registerSlot:n.registerSlot,unregisterSlot:n.unregisterSlot,registerFill:n.registerFill,unregisterFill:n.unregisterFill,getSlot:n.getSlot,getFills:n.getFills,hasFills:n.hasFills,subscribe:n.subscribe},n}return Object(c.a)(r,[{key:"registerSlot",value:function(t,e){var r=this.slots[t];this.slots[t]=e,this.triggerListeners(),this.forceUpdateSlot(t),r&&r.forceUpdate()}},{key:"registerFill",value:function(t,e){this.fills[t]=[].concat(Object(d.a)(this.fills[t]||[]),[e]),this.forceUpdateSlot(t)}},{key:"unregisterSlot",value:function(t,e){this.slots[t]===e&&(delete this.slots[t],this.triggerListeners())}},{key:"unregisterFill",value:function(t,e){this.fills[t]=Object(p.without)([e],this.fills[t]),this.resetFillOccurrence(t),this.forceUpdateSlot(t)}},{key:"getSlot",value:function(t){return this.slots[t]}},{key:"getFills",value:function(t,e){return this.slots[t]!==e?[]:Object(p.sortBy)(Object(p.prop)("priority"),this.fills[t]||[])}},{key:"hasFills",value:function(t){return this.fills[t]&&!!this.fills[t].length}},{key:"resetFillOccurrence",value:function(t){Object(p.forEach)((function(t){t.occurrence=void 0}),this.fills[t])}},{key:"forceUpdateSlot",value:function(t){var e=this.getSlot(t);e&&e.forceUpdate()}},{key:"triggerListeners",value:function(){this.listeners.forEach((function(t){return t()}))}},{key:"subscribe",value:function(t){var e=this;return this.listeners.push(t),function(){e.listeners=Object(p.without)(e.listeners,t)}}},{key:"render",value:function(){return Object(y.jsx)(g,{value:this.contextValue,children:this.props.children})}}]),r}(b.Component),m=function(t){var e=Object(b.useContext)(j),r=e.getSlot,n=e.subscribe,i=Object(b.useState)(r(t)),o=Object(O.a)(i,2),c=o[0],u=o[1];return Object(b.useEffect)((function(){return u(r(t)),n((function(){u(r(t))}))}),[t]),c},S=function(t){Object(a.a)(r,t);var e=Object(f.a)(r);function r(t){var n;return Object(o.a)(this,r),(n=e.call(this,t)).isUnmounted=void 0,n.node=void 0,n.isUnmounted=!1,n.bindNode=n.bindNode.bind(Object(u.a)(n)),n}return Object(c.a)(r,[{key:"componentDidMount",value:function(){(0,this.props.registerSlot)(this.props.name,this)}},{key:"componentWillUnmount",value:function(){var t=this.props.unregisterSlot;this.isUnmounted=!0,t(this.props.name,this)}},{key:"componentDidUpdate",value:function(t){var e=this.props,r=e.name,n=e.unregisterSlot,i=e.registerSlot;t.name!==r&&(n(t.name,null),i(r,this))}},{key:"bindNode",value:function(t){this.node=t}},{key:"forceUpdate",value:function(){this.isUnmounted||Object(l.a)(Object(s.a)(r.prototype),"forceUpdate",this).call(this)}},{key:"render",value:function(){var t=this.props,e=t.children,r=t.name,i=t.fillProps,o=void 0===i?{}:i,c=(0,t.getFills)(r,this).map((function(t,e,r){var i=t.occurrence,c="function"===typeof t.children?t.children(Object(n.a)(Object(n.a)({},o),{},{count:r.length})):t.children;return b.Children.map(c,(function(t,e){if(!t||Object(p.is)(String,t))return t;var r="".concat(i,"---").concat(t.key||e);return Object(b.cloneElement)(t,{key:r})}))})).filter(Object(p.complement)(p.isEmpty));return Object(y.jsx)(y.Fragment,{children:"function"===typeof e?e(c):c})}}]),r}(b.Component),F=function(t){return Object(y.jsx)(h,{children:function(e){var r=e.registerSlot,o=e.unregisterSlot,c=e.getFills,u=Object(i.a)(e,["registerSlot","unregisterSlot","getFills"]);return Object(y.jsx)(S,Object(n.a)(Object(n.a)(Object(n.a)({},u),t),{},{registerSlot:r,unregisterSlot:o,getFills:c}))}})},w=r(70),P=0,x=function(t){var e=t.name,r=t.children,n=t.priority,i=void 0===n?10:n,o=t.registerFill,c=t.unregisterFill,u=m(e),l=Object(b.useRef)({name:e,children:r,priority:i});return l.current.occurrence||(l.current.occurrence=++P),Object(b.useLayoutEffect)((function(){var t=l.current;return o(e,t),function(){return c(e,t)}}),[e,o,c]),Object(b.useLayoutEffect)((function(){l.current.children=r,u&&u.forceUpdate()}),[r]),Object(b.useLayoutEffect)((function(){e!==l.current.name&&(c(l.current.name,l.current),l.current.name=e,o(e,l.current))}),[e]),u&&u.node?Object(w.createPortal)("function"===typeof r?r(u.props.fillProps):r,u.node):null},_=function(t){return Object(y.jsx)(h,{children:function(e){var r=e.registerFill,o=e.unregisterFill,c=Object(i.a)(e,["registerFill","unregisterFill"]);return Object(y.jsx)(x,Object(n.a)(Object(n.a)(Object(n.a)({},c),t),{},{registerFill:r,unregisterFill:o}))}})};function k(t){return Object(y.jsx)(F,Object(n.a)({},t))}function E(t){return Object(y.jsx)(_,Object(n.a)({},t))}function R(t){var e=function(e){return Object(y.jsx)(E,Object(n.a)({name:t},e))};e.displayName=t+"Fill";var r=function(e){return Object(y.jsx)(k,Object(n.a)({name:t},e))};return r.displayName=t+"Slot",{Fill:e,Slot:r}}},2:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(14);function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},32:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(39);var i=r(67),o=r(42);function c(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||Object(i.a)(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},37:function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"a",(function(){return n}))},39:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},4:function(t,e){t.exports=window.R},42:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(39);function i(t,e){if(t){if("string"===typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},47:function(t,e,r){"use strict";function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}r.d(e,"a",(function(){return n}))},48:function(t,e,r){"use strict";function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}r.d(e,"a",(function(){return i}))},52:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(98);function i(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Object(n.a)(t,e)}},53:function(t,e,r){"use strict";r.d(e,"a",(function(){return l}));var n=r(47),i=r(116),o=r(105),c=r(85);function u(t,e){return!e||"object"!==Object(o.a)(e)&&"function"!==typeof e?Object(c.a)(t):e}function l(t){var e=Object(i.a)();return function(){var r,i=Object(n.a)(t);if(e){var o=Object(n.a)(this).constructor;r=Reflect.construct(i,arguments,o)}else r=i.apply(this,arguments);return u(this,r)}}},54:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},55:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},59:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(47);function i(t,e,r){return(i="undefined"!==typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var i=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=Object(n.a)(t)););return t}(t,e);if(i){var o=Object.getOwnPropertyDescriptor(i,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}},65:function(t,e,r){"use strict";var n=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function c(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(t){n[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(i){return!1}}()?Object.assign:function(t,e){for(var r,u,l=c(t),s=1;s<arguments.length;s++){for(var a in r=Object(arguments[s]))i.call(r,a)&&(l[a]=r[a]);if(n){u=n(r);for(var f=0;f<u.length;f++)o.call(r,u[f])&&(l[u[f]]=r[u[f]])}}return l}},67:function(t,e,r){"use strict";function n(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}r.d(e,"a",(function(){return n}))},70:function(t,e){t.exports=window.ReactDOM},76:function(t,e,r){"use strict";r(65);var n=r(0),i=60103;if(e.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var o=Symbol.for;i=o("react.element"),e.Fragment=o("react.fragment")}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function s(t,e,r){var n,o={},s=null,a=null;for(n in void 0!==r&&(s=""+r),void 0!==e.key&&(s=""+e.key),void 0!==e.ref&&(a=e.ref),e)u.call(e,n)&&!l.hasOwnProperty(n)&&(o[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps)void 0===o[n]&&(o[n]=e[n]);return{$$typeof:i,type:t,key:s,ref:a,props:o,_owner:c.current}}e.jsx=s,e.jsxs=s},8:function(t,e,r){"use strict";function n(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}r.d(e,"a",(function(){return n}))},85:function(t,e,r){"use strict";function n(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}r.d(e,"a",(function(){return n}))},9:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(54);var i=r(42),o=r(55);function c(t,e){return Object(n.a)(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,o=void 0;try{for(var c,u=t[Symbol.iterator]();!(n=(c=u.next()).done)&&(r.push(c.value),!e||r.length!==e);n=!0);}catch(l){i=!0,o=l}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return r}}(t,e)||Object(i.a)(t,e)||Object(o.a)()}},98:function(t,e,r){"use strict";function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}r.d(e,"a",(function(){return n}))}});
//# sourceMappingURL=slotFill.5dc0d9d8.js.map
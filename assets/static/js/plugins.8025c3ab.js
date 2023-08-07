/*! For license information please see plugins.8025c3ab.js.LICENSE.txt */
this.eventespresso=this.eventespresso||{},this.eventespresso.plugins=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=1557)}({0:function(e,t){e.exports=window.React},1:function(e,t,r){"use strict";e.exports=r(77)},137:function(e,t){e.exports=window.eventespresso.ioc},14:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},1557:function(e,t,r){e.exports=r(1698)},1698:function(e,t,r){"use strict";r.r(t),r.d(t,"PluginArea",(function(){return m})),r.d(t,"registerPlugin",(function(){return l})),r.d(t,"isPluginRegistered",(function(){return p})),r.d(t,"updatePlugin",(function(){return d})),r.d(t,"unregisterPlugin",(function(){return b})),r.d(t,"getPlugin",(function(){return O})),r.d(t,"getPlugins",(function(){return g}));var n=r(9),o=r(0),i=r(137),u=Object(o.createContext)({name:null}),c=(u.Consumer,u.Provider),a=r(2),s={},f=/^[a-z][a-z0-9-]*$/;function l(e,t){f.test(e)||console.error('Plugin names must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".');var r=Object(a.a)({name:e},t);return s[e]=r,Object(i.doAction)("plugins.pluginRegistered",r),r}function p(e){return Boolean(s[e])}function d(e,t){var r=s[e];return s[e]=Object(a.a)(Object(a.a)({},r),{},{render:function(){return t.render(r.render)}}),Object(i.doAction)("plugins.pluginUpdated",s[e]),r}function b(e){if(s[e]){var t=s[e];return delete s[e],Object(i.doAction)("plugins.pluginUnregistered",t),t}console.error('Plugin "'+e+'" is not registered.')}function O(e){return s[e]}function g(){return Object.values(s)}var j=r(1),y="PluginArea",v={display:"none"},m=function(){var e=Object(o.useCallback)((function(){return g().map((function(e){var t=e.name;return{render:e.render,context:{name:t}}}))}),[]),t=Object(o.useState)(e()),r=Object(n.a)(t,2),u=r[0],a=r[1],s=Object(o.useCallback)((function(){a(e())}),[e]);return Object(o.useEffect)((function(){return Object(i.addAction)("plugins.pluginUpdated",y,s),Object(i.addAction)("plugins.pluginRegistered",y,s),Object(i.addAction)("plugins.pluginUnregistered",y,s),function(){Object(i.removeAction)("plugins.pluginUpdated",y),Object(i.removeAction)("plugins.pluginRegistered",y),Object(i.removeAction)("plugins.pluginUnregistered",y)}}),[]),Object(j.jsx)("div",{style:v,children:u.map((function(e){var t=e.context,r=e.render;return Object(j.jsx)(c,{value:t,children:r()},t.name)}))})}},2:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(14);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},39:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},42:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(39);function o(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},54:function(e,t,r){"use strict";function n(e){if(Array.isArray(e))return e}r.d(t,"a",(function(){return n}))},55:function(e,t,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(t,"a",(function(){return n}))},65:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function u(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var r,c,a=u(e),s=1;s<arguments.length;s++){for(var f in r=Object(arguments[s]))o.call(r,f)&&(a[f]=r[f]);if(n){c=n(r);for(var l=0;l<c.length;l++)i.call(r,c[l])&&(a[c[l]]=r[c[l]])}}return a}},77:function(e,t,r){"use strict";r(65);var n=r(0),o=60103;if(t.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),t.Fragment=i("react.fragment")}var u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c=Object.prototype.hasOwnProperty,a={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,r){var n,i={},s=null,f=null;for(n in void 0!==r&&(s=""+r),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(f=t.ref),t)c.call(t,n)&&!a.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:o,type:e,key:s,ref:f,props:i,_owner:u.current}}t.jsx=s,t.jsxs=s},9:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(54);var o=r(42),i=r(55);function u(e,t){return Object(n.a)(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(a){o=!0,i=a}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}(e,t)||Object(o.a)(e,t)||Object(i.a)()}}});
//# sourceMappingURL=plugins.8025c3ab.js.map
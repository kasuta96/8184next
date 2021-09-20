!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.Trans=n():t.Trans=n()}(self,(function(){return(()=>{var t={966:(t,n,e)=>{function r(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(t){if("string"==typeof t)return a(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function i(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}e(548).toString();var o=function(){function t(n){var e=n.data,r=n.config,a=n.api,i=n.readOnly;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t);var o=t.OPTIONS,s=t.DEFAULT_OPTION;this.api=a,this.readOnly=i,this.container=void 0,this.originalPlaceholder=r.originalPlaceholder||t.DEFAULT_ORIGIN_PLACEHOLDER,this.translationPlaceholder=r.translationPlaceholder||t.DEFAULT_TRANS_PLACEHOLDER,this.data={original:e.original||"",translation:e.translation||"",option:Object.values(o).includes(e.option)&&e.option||r.defaultOption||s}}var n,e,a;return n=t,a=[{key:"isReadOnlySupported",get:function(){return!0}},{key:"toolbox",get:function(){return{icon:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="16px" width="16px" viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve"><path d="M253.227,300.267L253.227,300.267L199.04,246.72l0.64-0.64c37.12-41.387,63.573-88.96,79.147-139.307h62.507V64H192V21.333h-42.667V64H0v42.453h238.293c-14.4,41.173-36.907,80.213-67.627,114.347c-19.84-22.08-36.267-46.08-49.28-71.467H78.72c15.573,34.773,36.907,67.627,63.573,97.28l-108.48,107.2L64,384l106.667-106.667l66.347,66.347L253.227,300.267z"/><path d="M373.333,192h-42.667l-96,256h42.667l24-64h101.333l24,64h42.667L373.333,192z M317.333,341.333L352,248.853l34.667,92.48H317.333z"/></svg>',title:"Translate"}}},{key:"contentless",get:function(){return!0}},{key:"enableLineBreaks",get:function(){return!0}},{key:"DEFAULT_ORIGIN_PLACEHOLDER",get:function(){return"Enter original"}},{key:"DEFAULT_TRANS_PLACEHOLDER",get:function(){return"Enter translation"}},{key:"OPTIONS",get:function(){return{header:"header",paragraph:"paragraph"}}},{key:"DEFAULT_OPTION",get:function(){return t.OPTIONS.paragraph}},{key:"conversionConfig",get:function(){return{import:"original",export:function(t){return t.translation?"".concat(t.original," — ").concat(t.translation):t.original}}}},{key:"sanitize",get:function(){return{original:{br:!0},translation:{br:!0},option:{}}}}],(e=[{key:"CSS",get:function(){return{baseClass:this.api.styles.block,wrapper:"cdx-trans",original:"cdx-trans__original",input:this.api.styles.input,translation:"cdx-trans__translation",settingsWrapper:"cdx-trans-settings",settingsButton:this.api.styles.settingsButton,settingsButtonActive:this.api.styles.settingsButtonActive,header:"cdx-header"}}},{key:"settings",get:function(){return[{name:"header",icon:'<svg width="10" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><path d="M7.6 8.15H2.25v4.525a1.125 1.125 0 0 1-2.25 0V1.125a1.125 1.125 0 1 1 2.25 0V5.9H7.6V1.125a1.125 1.125 0 0 1 2.25 0v11.55a1.125 1.125 0 0 1-2.25 0V8.15z"></path></svg>'},{name:"paragraph",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.2 -0.3 9 11.4" width="12" height="14"><path d="M0 2.77V.92A1 1 0 01.2.28C.35.1.56 0 .83 0h7.66c.28.01.48.1.63.28.14.17.21.38.21.64v1.85c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26a1 1 0 01-.21-.66V1.69H5.6v7.58h.5c.25 0 .45.08.6.23.17.16.25.35.25.6s-.08.45-.24.6a.87.87 0 01-.62.22H3.21a.87.87 0 01-.61-.22.78.78 0 01-.24-.6c0-.25.08-.44.24-.6a.85.85 0 01.61-.23h.5V1.7H1.73v1.08c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26A1 1 0 010 2.77z"></path></svg>'}]}},{key:"render",value:function(){this.container=this._make("div",[this.CSS.baseClass,this.CSS.wrapper]);var t=this._make("div",[this.CSS.input,this.CSS.original],{contentEditable:!this.readOnly,innerHTML:this.data.original}),n=this._make("div",[this.CSS.input,this.CSS.translation],{contentEditable:!this.readOnly,innerHTML:this.data.translation});return t.dataset.placeholder=this.originalPlaceholder,n.dataset.placeholder=this.translationPlaceholder,this.container.appendChild(t),this.container.appendChild(n),this._acceptTuneView(),this.container}},{key:"save",value:function(t){var n=t.querySelector(".".concat(this.CSS.original)),e=t.querySelector(".".concat(this.CSS.translation));return Object.assign(this.data,{original:n.innerHTML,translation:e.innerHTML})}},{key:"renderSettings",value:function(){var t=this,n=this._make("div",[this.CSS.settingsWrapper],{});return this.settings.map((function(e){var r,a=t._make("div",t.CSS.settingsButton,{innerHTML:e.icon,title:"".concat((r=e.name,r[0].toUpperCase()+r.substr(1)))});return a.classList.toggle(t.CSS.settingsButtonActive,e.name===t.data.option),n.appendChild(a),a})).forEach((function(n,e,r){n.addEventListener("click",(function(){t._toggleTune(t.settings[e].name),r.forEach((function(n,e){var r=t.settings[e].name;n.classList.toggle(t.CSS.settingsButtonActive,r===t.data.option)}))}))})),n}},{key:"_toggleTune",value:function(t){this.data.option=t,this._acceptTuneView()}},{key:"_acceptTuneView",value:function(){var t=this.settings[0];this.container.classList.toggle(this.CSS.header,t.name===this.data.option)}},{key:"_make",value:function(t){var n,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=document.createElement(t);for(var o in Array.isArray(e)?(n=i.classList).add.apply(n,r(e)):e&&i.classList.add(e),a)i[o]=a[o];return i}}])&&i(n.prototype,e),a&&i(n,a),t}();t.exports=o},424:(t,n,e)=>{"use strict";e.d(n,{Z:()=>i});var r=e(645),a=e.n(r)()((function(t){return t[1]}));a.push([t.id,'.cdx-trans-icon svg {\n  transform: rotate(180deg);\n}\n\n.cdx-trans {\n  margin: 0;\n}\n\n.cdx-header {\n  font-size: 1.5rem;\n}\n\n.cdx-trans__original {\n  margin-bottom: 10px;\n}\n\n.cdx-trans__translation {\n  margin-bottom: 15px;\n}\n\n.cdx-trans [contentEditable="true"][data-placeholder]::before {\n  position: absolute;\n  content: attr(data-placeholder);\n  color: #707684;\n  font-weight: normal;\n  opacity: 0;\n}\n\n.cdx-trans [contentEditable="true"][data-placeholder]:empty::before {\n  opacity: 1;\n}\n\n.cdx-trans [contentEditable="true"][data-placeholder]:empty:focus::before {\n  opacity: 0;\n}\n\n.cdx-trans-settings {\n  display: flex;\n}\n\n.cdx-trans-settings .cdx-settings-button {\n  width: 50%;\n}\n',""]);const i=a},645:t=>{"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=t(n);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,r){"string"==typeof t&&(t=[[null,t,""]]);var a={};if(r)for(var i=0;i<this.length;i++){var o=this[i][0];null!=o&&(a[o]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);r&&a[c[0]]||(e&&(c[2]?c[2]="".concat(e," and ").concat(c[2]):c[2]=e),n.push(c))}},n}},548:(t,n,e)=>{"use strict";var r=e(379),a=e.n(r),i=e(424);a()(i.Z,{insert:"head",singleton:!1}),i.Z.locals},379:(t,n,e)=>{"use strict";var r,a=function(){var t={};return function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}t[n]=e}return t[n]}}(),i=[];function o(t){for(var n=-1,e=0;e<i.length;e++)if(i[e].identifier===t){n=e;break}return n}function s(t,n){for(var e={},r=[],a=0;a<t.length;a++){var s=t[a],c=n.base?s[0]+n.base:s[0],l=e[c]||0,u="".concat(c," ").concat(l);e[c]=l+1;var d=o(u),h={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(i[d].references++,i[d].updater(h)):i.push({identifier:u,updater:g(h,n),references:1}),r.push(u)}return r}function c(t){var n=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var i=e.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(t){n.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(n);else{var o=a(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}return n}var l,u=(l=[],function(t,n){return l[t]=n,l.filter(Boolean).join("\n")});function d(t,n,e,r){var a=e?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=u(n,a);else{var i=document.createTextNode(a),o=t.childNodes;o[n]&&t.removeChild(o[n]),o.length?t.insertBefore(i,o[n]):t.appendChild(i)}}function h(t,n,e){var r=e.css,a=e.media,i=e.sourceMap;if(a?t.setAttribute("media",a):t.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var p=null,f=0;function g(t,n){var e,r,a;if(n.singleton){var i=f++;e=p||(p=c(n)),r=d.bind(null,e,i,!1),a=d.bind(null,e,i,!0)}else e=c(n),r=h.bind(null,e,n),a=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)};return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else a()}}t.exports=function(t,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var e=s(t=t||[],n);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<e.length;r++){var a=o(e[r]);i[a].references--}for(var c=s(t,n),l=0;l<e.length;l++){var u=o(e[l]);0===i[u].references&&(i[u].updater(),i.splice(u,1))}e=c}}}}},n={};function e(r){var a=n[r];if(void 0!==a)return a.exports;var i=n[r]={id:r,exports:{}};return t[r](i,i.exports,e),i.exports}return e.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},e.d=(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),e(966)})()}));
import{Q as Ee,bB as Ve,bg as Se,z as ge,L as Ke,bC as Ge}from"./main-8bd1049b.js";class U{constructor(t){let{x:n,y:r,width:o,height:i}=t;this.x=n,this.y=r,this.width=o,this.height=i}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function wn(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function bn(e){return Array.isArray(e)?new U({x:e[0],y:e[1],width:0,height:0}):e.getBoundingClientRect()}function En(e){const t=e.getBoundingClientRect(),n=getComputedStyle(e),r=n.transform;if(r){let o,i,s,a,f;if(r.startsWith("matrix3d("))o=r.slice(9,-1).split(/, /),i=+o[0],s=+o[5],a=+o[12],f=+o[13];else if(r.startsWith("matrix("))o=r.slice(7,-1).split(/, /),i=+o[0],s=+o[3],a=+o[4],f=+o[5];else return new U(t);const d=n.transformOrigin,l=t.x-a-(1-i)*parseFloat(d),u=t.y-f-(1-s)*parseFloat(d.slice(d.indexOf(" ")+1)),y=i?t.width/i:e.offsetWidth+1,b=s?t.height/s:e.offsetHeight+1;return new U({x:l,y:u,width:y,height:b})}else return new U(t)}function Sn(e,t,n){if(typeof e.animate>"u")return{finished:Promise.resolve()};let r;try{r=e.animate(t,n)}catch{return{finished:Promise.resolve()}}return typeof r.finished>"u"&&(r.finished=new Promise(o=>{r.onfinish=()=>{o(r)}})),r}const gn="cubic-bezier(0.4, 0, 0.2, 1)",Rn="cubic-bezier(0.0, 0, 0.2, 1)",On="cubic-bezier(0.4, 0, 1, 1)";function Re(e,t){return function(){return e.apply(t,arguments)}}const{toString:Xe}=Object.prototype,{getPrototypeOf:ne}=Object,q=(e=>t=>{const n=Xe.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),x=e=>(e=e.toLowerCase(),t=>q(t)===e),M=e=>t=>typeof t===e,{isArray:_}=Array,B=M("undefined");function Qe(e){return e!==null&&!B(e)&&e.constructor!==null&&!B(e.constructor)&&R(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Oe=x("ArrayBuffer");function Ye(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Oe(e.buffer),t}const Ze=M("string"),R=M("function"),xe=M("number"),k=e=>e!==null&&typeof e=="object",et=e=>e===!0||e===!1,j=e=>{if(q(e)!=="object")return!1;const t=ne(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},tt=x("Date"),nt=x("File"),rt=x("Blob"),st=x("FileList"),ot=e=>k(e)&&R(e.pipe),it=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||R(e.append)&&((t=q(e))==="formdata"||t==="object"&&R(e.toString)&&e.toString()==="[object FormData]"))},at=x("URLSearchParams"),ct=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function L(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),_(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const i=n?Object.getOwnPropertyNames(e):Object.keys(e),s=i.length;let a;for(r=0;r<s;r++)a=i[r],t.call(null,e[a],a,e)}}function Ae(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const Te=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Pe=e=>!B(e)&&e!==Te;function Q(){const{caseless:e}=Pe(this)&&this||{},t={},n=(r,o)=>{const i=e&&Ae(t,o)||o;j(t[i])&&j(r)?t[i]=Q(t[i],r):j(r)?t[i]=Q({},r):_(r)?t[i]=r.slice():t[i]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&L(arguments[r],n);return t}const ut=(e,t,n,{allOwnKeys:r}={})=>(L(t,(o,i)=>{n&&R(o)?e[i]=Re(o,n):e[i]=o},{allOwnKeys:r}),e),lt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),ft=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},dt=(e,t,n,r)=>{let o,i,s;const a={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),i=o.length;i-- >0;)s=o[i],(!r||r(s,e,t))&&!a[s]&&(t[s]=e[s],a[s]=!0);e=n!==!1&&ne(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},ht=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},pt=e=>{if(!e)return null;if(_(e))return e;let t=e.length;if(!xe(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},mt=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&ne(Uint8Array)),yt=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const i=o.value;t.call(e,i[0],i[1])}},wt=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},bt=x("HTMLFormElement"),Et=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),ce=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),St=x("RegExp"),Ne=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};L(n,(o,i)=>{let s;(s=t(o,i,e))!==!1&&(r[i]=s||o)}),Object.defineProperties(e,r)},gt=e=>{Ne(e,(t,n)=>{if(R(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(R(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Rt=(e,t)=>{const n={},r=o=>{o.forEach(i=>{n[i]=!0})};return _(e)?r(e):r(String(e).split(t)),n},Ot=()=>{},xt=(e,t)=>(e=+e,Number.isFinite(e)?e:t),W="abcdefghijklmnopqrstuvwxyz",ue="0123456789",Ce={DIGIT:ue,ALPHA:W,ALPHA_DIGIT:W+W.toUpperCase()+ue},At=(e=16,t=Ce.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function Tt(e){return!!(e&&R(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Pt=e=>{const t=new Array(10),n=(r,o)=>{if(k(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const i=_(r)?[]:{};return L(r,(s,a)=>{const f=n(s,o+1);!B(f)&&(i[a]=f)}),t[o]=void 0,i}}return r};return n(e,0)},Nt=x("AsyncFunction"),Ct=e=>e&&(k(e)||R(e))&&R(e.then)&&R(e.catch),c={isArray:_,isArrayBuffer:Oe,isBuffer:Qe,isFormData:it,isArrayBufferView:Ye,isString:Ze,isNumber:xe,isBoolean:et,isObject:k,isPlainObject:j,isUndefined:B,isDate:tt,isFile:nt,isBlob:rt,isRegExp:St,isFunction:R,isStream:ot,isURLSearchParams:at,isTypedArray:mt,isFileList:st,forEach:L,merge:Q,extend:ut,trim:ct,stripBOM:lt,inherits:ft,toFlatObject:dt,kindOf:q,kindOfTest:x,endsWith:ht,toArray:pt,forEachEntry:yt,matchAll:wt,isHTMLForm:bt,hasOwnProperty:ce,hasOwnProp:ce,reduceDescriptors:Ne,freezeMethods:gt,toObjectSet:Rt,toCamelCase:Et,noop:Ot,toFiniteNumber:xt,findKey:Ae,global:Te,isContextDefined:Pe,ALPHABET:Ce,generateString:At,isSpecCompliantForm:Tt,toJSONObject:Pt,isAsyncFn:Nt,isThenable:Ct};function m(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}c.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:c.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const _e=m.prototype,Fe={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Fe[e]={value:e}});Object.defineProperties(m,Fe);Object.defineProperty(_e,"isAxiosError",{value:!0});m.from=(e,t,n,r,o,i)=>{const s=Object.create(_e);return c.toFlatObject(e,s,function(f){return f!==Error.prototype},a=>a!=="isAxiosError"),m.call(s,e.message,t,n,r,o),s.cause=e,s.name=e.name,i&&Object.assign(s,i),s};const _t=null;function Y(e){return c.isPlainObject(e)||c.isArray(e)}function Be(e){return c.endsWith(e,"[]")?e.slice(0,-2):e}function le(e,t,n){return e?e.concat(t).map(function(o,i){return o=Be(o),!n&&i?"["+o+"]":o}).join(n?".":""):t}function Ft(e){return c.isArray(e)&&!e.some(Y)}const Bt=c.toFlatObject(c,{},null,function(t){return/^is[A-Z]/.test(t)});function z(e,t,n){if(!c.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=c.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(p,E){return!c.isUndefined(E[p])});const r=n.metaTokens,o=n.visitor||l,i=n.dots,s=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&c.isSpecCompliantForm(t);if(!c.isFunction(o))throw new TypeError("visitor must be a function");function d(h){if(h===null)return"";if(c.isDate(h))return h.toISOString();if(!f&&c.isBlob(h))throw new m("Blob is not supported. Use a Buffer instead.");return c.isArrayBuffer(h)||c.isTypedArray(h)?f&&typeof Blob=="function"?new Blob([h]):Buffer.from(h):h}function l(h,p,E){let S=h;if(h&&!E&&typeof h=="object"){if(c.endsWith(p,"{}"))p=r?p:p.slice(0,-2),h=JSON.stringify(h);else if(c.isArray(h)&&Ft(h)||(c.isFileList(h)||c.endsWith(p,"[]"))&&(S=c.toArray(h)))return p=Be(p),S.forEach(function(P,Je){!(c.isUndefined(P)||P===null)&&t.append(s===!0?le([p],Je,i):s===null?p:p+"[]",d(P))}),!1}return Y(h)?!0:(t.append(le(E,p,i),d(h)),!1)}const u=[],y=Object.assign(Bt,{defaultVisitor:l,convertValue:d,isVisitable:Y});function b(h,p){if(!c.isUndefined(h)){if(u.indexOf(h)!==-1)throw Error("Circular reference detected in "+p.join("."));u.push(h),c.forEach(h,function(S,T){(!(c.isUndefined(S)||S===null)&&o.call(t,S,c.isString(T)?T.trim():T,p,y))===!0&&b(S,p?p.concat(T):[T])}),u.pop()}}if(!c.isObject(e))throw new TypeError("data must be an object");return b(e),t}function fe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function re(e,t){this._pairs=[],e&&z(e,this,t)}const Le=re.prototype;Le.append=function(t,n){this._pairs.push([t,n])};Le.toString=function(t){const n=t?function(r){return t.call(this,r,fe)}:fe;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Lt(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function De(e,t,n){if(!t)return e;const r=n&&n.encode||Lt,o=n&&n.serialize;let i;if(o?i=o(t,n):i=c.isURLSearchParams(t)?t.toString():new re(t,n).toString(r),i){const s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Dt{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){c.forEach(this.handlers,function(r){r!==null&&t(r)})}}const de=Dt,Ue={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Ut=typeof URLSearchParams<"u"?URLSearchParams:re,jt=typeof FormData<"u"?FormData:null,vt=typeof Blob<"u"?Blob:null,Ht={isBrowser:!0,classes:{URLSearchParams:Ut,FormData:jt,Blob:vt},protocols:["http","https","file","blob","url","data"]},je=typeof window<"u"&&typeof document<"u",It=(e=>je&&["ReactNative","NativeScript","NS"].indexOf(e)<0)(typeof navigator<"u"&&navigator.product),qt=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),Mt=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:je,hasStandardBrowserEnv:It,hasStandardBrowserWebWorkerEnv:qt},Symbol.toStringTag,{value:"Module"})),O={...Mt,...Ht};function kt(e,t){return z(e,new O.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,i){return O.isNode&&c.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)}},t))}function zt(e){return c.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function $t(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}function ve(e){function t(n,r,o,i){let s=n[i++];if(s==="__proto__")return!0;const a=Number.isFinite(+s),f=i>=n.length;return s=!s&&c.isArray(o)?o.length:s,f?(c.hasOwnProp(o,s)?o[s]=[o[s],r]:o[s]=r,!a):((!o[s]||!c.isObject(o[s]))&&(o[s]=[]),t(n,r,o[s],i)&&c.isArray(o[s])&&(o[s]=$t(o[s])),!a)}if(c.isFormData(e)&&c.isFunction(e.entries)){const n={};return c.forEachEntry(e,(r,o)=>{t(zt(r),o,n,0)}),n}return null}function Wt(e,t,n){if(c.isString(e))try{return(t||JSON.parse)(e),c.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const se={transitional:Ue,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,i=c.isObject(t);if(i&&c.isHTMLForm(t)&&(t=new FormData(t)),c.isFormData(t))return o?JSON.stringify(ve(t)):t;if(c.isArrayBuffer(t)||c.isBuffer(t)||c.isStream(t)||c.isFile(t)||c.isBlob(t))return t;if(c.isArrayBufferView(t))return t.buffer;if(c.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let a;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return kt(t,this.formSerializer).toString();if((a=c.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return z(a?{"files[]":t}:t,f&&new f,this.formSerializer)}}return i||o?(n.setContentType("application/json",!1),Wt(t)):t}],transformResponse:[function(t){const n=this.transitional||se.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&c.isString(t)&&(r&&!this.responseType||o)){const s=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(a){if(s)throw a.name==="SyntaxError"?m.from(a,m.ERR_BAD_RESPONSE,this,null,this.response):a}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};c.forEach(["delete","get","head","post","put","patch"],e=>{se.headers[e]={}});const oe=se,Jt=c.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Vt=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),r=s.substring(o+1).trim(),!(!n||t[n]&&Jt[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},he=Symbol("internals");function F(e){return e&&String(e).trim().toLowerCase()}function v(e){return e===!1||e==null?e:c.isArray(e)?e.map(v):String(e)}function Kt(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Gt=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function J(e,t,n,r,o){if(c.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!c.isString(t)){if(c.isString(r))return t.indexOf(r)!==-1;if(c.isRegExp(r))return r.test(t)}}function Xt(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Qt(e,t){const n=c.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,i,s){return this[r].call(this,t,o,i,s)},configurable:!0})})}class ${constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function i(a,f,d){const l=F(f);if(!l)throw new Error("header name must be a non-empty string");const u=c.findKey(o,l);(!u||o[u]===void 0||d===!0||d===void 0&&o[u]!==!1)&&(o[u||f]=v(a))}const s=(a,f)=>c.forEach(a,(d,l)=>i(d,l,f));return c.isPlainObject(t)||t instanceof this.constructor?s(t,n):c.isString(t)&&(t=t.trim())&&!Gt(t)?s(Vt(t),n):t!=null&&i(n,t,r),this}get(t,n){if(t=F(t),t){const r=c.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return Kt(o);if(c.isFunction(n))return n.call(this,o,r);if(c.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=F(t),t){const r=c.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||J(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function i(s){if(s=F(s),s){const a=c.findKey(r,s);a&&(!n||J(r,r[a],a,n))&&(delete r[a],o=!0)}}return c.isArray(t)?t.forEach(i):i(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const i=n[r];(!t||J(this,this[i],i,t,!0))&&(delete this[i],o=!0)}return o}normalize(t){const n=this,r={};return c.forEach(this,(o,i)=>{const s=c.findKey(r,i);if(s){n[s]=v(o),delete n[i];return}const a=t?Xt(i):String(i).trim();a!==i&&delete n[i],n[a]=v(o),r[a]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return c.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&c.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[he]=this[he]={accessors:{}}).accessors,o=this.prototype;function i(s){const a=F(s);r[a]||(Qt(o,s),r[a]=!0)}return c.isArray(t)?t.forEach(i):i(t),this}}$.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);c.reduceDescriptors($.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});c.freezeMethods($);const A=$;function V(e,t){const n=this||oe,r=t||n,o=A.from(r.headers);let i=r.data;return c.forEach(e,function(a){i=a.call(n,i,o.normalize(),t?t.status:void 0)}),o.normalize(),i}function He(e){return!!(e&&e.__CANCEL__)}function D(e,t,n){m.call(this,e??"canceled",m.ERR_CANCELED,t,n),this.name="CanceledError"}c.inherits(D,m,{__CANCEL__:!0});function Yt(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Zt=O.hasStandardBrowserEnv?{write(e,t,n,r,o,i){const s=[e+"="+encodeURIComponent(t)];c.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),c.isString(r)&&s.push("path="+r),c.isString(o)&&s.push("domain="+o),i===!0&&s.push("secure"),document.cookie=s.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function en(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function tn(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Ie(e,t){return e&&!en(t)?tn(e,t):t}const nn=O.hasStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(i){let s=i;return t&&(n.setAttribute("href",s),s=n.href),n.setAttribute("href",s),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(s){const a=c.isString(s)?o(s):s;return a.protocol===r.protocol&&a.host===r.host}}():function(){return function(){return!0}}();function rn(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function sn(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,i=0,s;return t=t!==void 0?t:1e3,function(f){const d=Date.now(),l=r[i];s||(s=d),n[o]=f,r[o]=d;let u=i,y=0;for(;u!==o;)y+=n[u++],u=u%e;if(o=(o+1)%e,o===i&&(i=(i+1)%e),d-s<t)return;const b=l&&d-l;return b?Math.round(y*1e3/b):void 0}}function pe(e,t){let n=0;const r=sn(50,250);return o=>{const i=o.loaded,s=o.lengthComputable?o.total:void 0,a=i-n,f=r(a),d=i<=s;n=i;const l={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:f||void 0,estimated:f&&s&&d?(s-i)/f:void 0,event:o};l[t?"download":"upload"]=!0,e(l)}}const on=typeof XMLHttpRequest<"u",an=on&&function(e){return new Promise(function(n,r){let o=e.data;const i=A.from(e.headers).normalize();let{responseType:s,withXSRFToken:a}=e,f;function d(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}let l;if(c.isFormData(o)){if(O.hasStandardBrowserEnv||O.hasStandardBrowserWebWorkerEnv)i.setContentType(!1);else if((l=i.getContentType())!==!1){const[p,...E]=l?l.split(";").map(S=>S.trim()).filter(Boolean):[];i.setContentType([p||"multipart/form-data",...E].join("; "))}}let u=new XMLHttpRequest;if(e.auth){const p=e.auth.username||"",E=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";i.set("Authorization","Basic "+btoa(p+":"+E))}const y=Ie(e.baseURL,e.url);u.open(e.method.toUpperCase(),De(y,e.params,e.paramsSerializer),!0),u.timeout=e.timeout;function b(){if(!u)return;const p=A.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders()),S={data:!s||s==="text"||s==="json"?u.responseText:u.response,status:u.status,statusText:u.statusText,headers:p,config:e,request:u};Yt(function(P){n(P),d()},function(P){r(P),d()},S),u=null}if("onloadend"in u?u.onloadend=b:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.indexOf("file:")===0)||setTimeout(b)},u.onabort=function(){u&&(r(new m("Request aborted",m.ECONNABORTED,e,u)),u=null)},u.onerror=function(){r(new m("Network Error",m.ERR_NETWORK,e,u)),u=null},u.ontimeout=function(){let E=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const S=e.transitional||Ue;e.timeoutErrorMessage&&(E=e.timeoutErrorMessage),r(new m(E,S.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,u)),u=null},O.hasStandardBrowserEnv&&(a&&c.isFunction(a)&&(a=a(e)),a||a!==!1&&nn(y))){const p=e.xsrfHeaderName&&e.xsrfCookieName&&Zt.read(e.xsrfCookieName);p&&i.set(e.xsrfHeaderName,p)}o===void 0&&i.setContentType(null),"setRequestHeader"in u&&c.forEach(i.toJSON(),function(E,S){u.setRequestHeader(S,E)}),c.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),s&&s!=="json"&&(u.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&u.addEventListener("progress",pe(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&u.upload&&u.upload.addEventListener("progress",pe(e.onUploadProgress)),(e.cancelToken||e.signal)&&(f=p=>{u&&(r(!p||p.type?new D(null,e,u):p),u.abort(),u=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f)));const h=rn(y);if(h&&O.protocols.indexOf(h)===-1){r(new m("Unsupported protocol "+h+":",m.ERR_BAD_REQUEST,e));return}u.send(o||null)})},Z={http:_t,xhr:an};c.forEach(Z,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const me=e=>`- ${e}`,cn=e=>c.isFunction(e)||e===null||e===!1,qe={getAdapter:e=>{e=c.isArray(e)?e:[e];const{length:t}=e;let n,r;const o={};for(let i=0;i<t;i++){n=e[i];let s;if(r=n,!cn(n)&&(r=Z[(s=String(n)).toLowerCase()],r===void 0))throw new m(`Unknown adapter '${s}'`);if(r)break;o[s||"#"+i]=r}if(!r){const i=Object.entries(o).map(([a,f])=>`adapter ${a} `+(f===!1?"is not supported by the environment":"is not available in the build"));let s=t?i.length>1?`since :
`+i.map(me).join(`
`):" "+me(i[0]):"as no adapter specified";throw new m("There is no suitable adapter to dispatch the request "+s,"ERR_NOT_SUPPORT")}return r},adapters:Z};function K(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new D(null,e)}function ye(e){return K(e),e.headers=A.from(e.headers),e.data=V.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),qe.getAdapter(e.adapter||oe.adapter)(e).then(function(r){return K(e),r.data=V.call(e,e.transformResponse,r),r.headers=A.from(r.headers),r},function(r){return He(r)||(K(e),r&&r.response&&(r.response.data=V.call(e,e.transformResponse,r.response),r.response.headers=A.from(r.response.headers))),Promise.reject(r)})}const we=e=>e instanceof A?{...e}:e;function C(e,t){t=t||{};const n={};function r(d,l,u){return c.isPlainObject(d)&&c.isPlainObject(l)?c.merge.call({caseless:u},d,l):c.isPlainObject(l)?c.merge({},l):c.isArray(l)?l.slice():l}function o(d,l,u){if(c.isUndefined(l)){if(!c.isUndefined(d))return r(void 0,d,u)}else return r(d,l,u)}function i(d,l){if(!c.isUndefined(l))return r(void 0,l)}function s(d,l){if(c.isUndefined(l)){if(!c.isUndefined(d))return r(void 0,d)}else return r(void 0,l)}function a(d,l,u){if(u in t)return r(d,l);if(u in e)return r(void 0,d)}const f={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(d,l)=>o(we(d),we(l),!0)};return c.forEach(Object.keys(Object.assign({},e,t)),function(l){const u=f[l]||o,y=u(e[l],t[l],l);c.isUndefined(y)&&u!==a||(n[l]=y)}),n}const Me="1.6.8",ie={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ie[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const be={};ie.transitional=function(t,n,r){function o(i,s){return"[Axios v"+Me+"] Transitional option '"+i+"'"+s+(r?". "+r:"")}return(i,s,a)=>{if(t===!1)throw new m(o(s," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!be[s]&&(be[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,s,a):!0}};function un(e,t,n){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],s=t[i];if(s){const a=e[i],f=a===void 0||s(a,i,e);if(f!==!0)throw new m("option "+i+" must be "+f,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+i,m.ERR_BAD_OPTION)}}const ee={assertOptions:un,validators:ie},N=ee.validators;class I{constructor(t){this.defaults=t,this.interceptors={request:new de,response:new de}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let o;Error.captureStackTrace?Error.captureStackTrace(o={}):o=new Error;const i=o.stack?o.stack.replace(/^.+\n/,""):"";r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=C(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:i}=n;r!==void 0&&ee.assertOptions(r,{silentJSONParsing:N.transitional(N.boolean),forcedJSONParsing:N.transitional(N.boolean),clarifyTimeoutError:N.transitional(N.boolean)},!1),o!=null&&(c.isFunction(o)?n.paramsSerializer={serialize:o}:ee.assertOptions(o,{encode:N.function,serialize:N.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=i&&c.merge(i.common,i[n.method]);i&&c.forEach(["delete","get","head","post","put","patch","common"],h=>{delete i[h]}),n.headers=A.concat(s,i);const a=[];let f=!0;this.interceptors.request.forEach(function(p){typeof p.runWhen=="function"&&p.runWhen(n)===!1||(f=f&&p.synchronous,a.unshift(p.fulfilled,p.rejected))});const d=[];this.interceptors.response.forEach(function(p){d.push(p.fulfilled,p.rejected)});let l,u=0,y;if(!f){const h=[ye.bind(this),void 0];for(h.unshift.apply(h,a),h.push.apply(h,d),y=h.length,l=Promise.resolve(n);u<y;)l=l.then(h[u++],h[u++]);return l}y=a.length;let b=n;for(u=0;u<y;){const h=a[u++],p=a[u++];try{b=h(b)}catch(E){p.call(this,E);break}}try{l=ye.call(this,b)}catch(h){return Promise.reject(h)}for(u=0,y=d.length;u<y;)l=l.then(d[u++],d[u++]);return l}getUri(t){t=C(this.defaults,t);const n=Ie(t.baseURL,t.url);return De(n,t.params,t.paramsSerializer)}}c.forEach(["delete","get","head","options"],function(t){I.prototype[t]=function(n,r){return this.request(C(r||{},{method:t,url:n,data:(r||{}).data}))}});c.forEach(["post","put","patch"],function(t){function n(r){return function(i,s,a){return this.request(C(a||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:s}))}}I.prototype[t]=n(),I.prototype[t+"Form"]=n(!0)});const H=I;class ae{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(o=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](o);r._listeners=null}),this.promise.then=o=>{let i;const s=new Promise(a=>{r.subscribe(a),i=a}).then(o);return s.cancel=function(){r.unsubscribe(i)},s},t(function(i,s,a){r.reason||(r.reason=new D(i,s,a),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new ae(function(o){t=o}),cancel:t}}}const ln=ae;function fn(e){return function(n){return e.apply(null,n)}}function dn(e){return c.isObject(e)&&e.isAxiosError===!0}const te={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(te).forEach(([e,t])=>{te[t]=e});const hn=te;function ke(e){const t=new H(e),n=Re(H.prototype.request,t);return c.extend(n,H.prototype,t,{allOwnKeys:!0}),c.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return ke(C(e,o))},n}const w=ke(oe);w.Axios=H;w.CanceledError=D;w.CancelToken=ln;w.isCancel=He;w.VERSION=Me;w.toFormData=z;w.AxiosError=m;w.Cancel=w.CanceledError;w.all=function(t){return Promise.all(t)};w.spread=fn;w.isAxiosError=dn;w.mergeConfig=C;w.AxiosHeaders=A;w.formToJSON=e=>ve(c.isHTMLForm(e)?new FormData(e):e);w.getAdapter=qe.getAdapter;w.HttpStatusCode=hn;w.default=w;const pn=w,ze=pn.create({baseURL:"http://localhost:8000/api/v1"});ze.interceptors.request.use(e=>{const t=localStorage.getItem("userToken");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const xn=ze,G=Symbol("Forwarded refs");function X(e,t){let n=e;for(;n;){const r=Reflect.getOwnPropertyDescriptor(n,t);if(r)return r;n=Object.getPrototypeOf(n)}}function An(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e[G]=n,new Proxy(e,{get(o,i){if(Reflect.has(o,i))return Reflect.get(o,i);if(!(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))){for(const s of n)if(s.value&&Reflect.has(s.value,i)){const a=Reflect.get(s.value,i);return typeof a=="function"?a.bind(s.value):a}}},has(o,i){if(Reflect.has(o,i))return!0;if(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))return!1;for(const s of n)if(s.value&&Reflect.has(s.value,i))return!0;return!1},set(o,i,s){if(Reflect.has(o,i))return Reflect.set(o,i,s);if(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))return!1;for(const a of n)if(a.value&&Reflect.has(a.value,i))return Reflect.set(a.value,i,s);return!1},getOwnPropertyDescriptor(o,i){var a;const s=Reflect.getOwnPropertyDescriptor(o,i);if(s)return s;if(!(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))){for(const f of n){if(!f.value)continue;const d=X(f.value,i)??("_"in f.value?X((a=f.value._)==null?void 0:a.setupState,i):void 0);if(d)return d}for(const f of n){const d=f.value&&f.value[G];if(!d)continue;const l=d.slice();for(;l.length;){const u=l.shift(),y=X(u.value,i);if(y)return y;const b=u.value&&u.value[G];b&&l.push(...b)}}}}})}const mn=Ke({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function g(e,t,n){return Ee()({name:e,props:mn({mode:n,origin:t}),setup(r,o){let{slots:i}=o;const s={onBeforeEnter(a){r.origin&&(a.style.transformOrigin=r.origin)},onLeave(a){if(r.leaveAbsolute){const{offsetTop:f,offsetLeft:d,offsetWidth:l,offsetHeight:u}=a;a._transitionInitialStyles={position:a.style.position,top:a.style.top,left:a.style.left,width:a.style.width,height:a.style.height},a.style.position="absolute",a.style.top=`${f}px`,a.style.left=`${d}px`,a.style.width=`${l}px`,a.style.height=`${u}px`}r.hideOnLeave&&a.style.setProperty("display","none","important")},onAfterLeave(a){if(r.leaveAbsolute&&(a!=null&&a._transitionInitialStyles)){const{position:f,top:d,left:l,width:u,height:y}=a._transitionInitialStyles;delete a._transitionInitialStyles,a.style.position=f||"",a.style.top=d||"",a.style.left=l||"",a.style.width=u||"",a.style.height=y||""}}};return()=>{const a=r.group?Ve:Se;return ge(a,{name:r.disabled?"":e,css:!r.disabled,...r.group?void 0:{mode:r.mode},...r.disabled?{}:s},i.default)}}})}function $e(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return Ee()({name:e,props:{mode:{type:String,default:n},disabled:Boolean},setup(r,o){let{slots:i}=o;return()=>ge(Se,{name:r.disabled?"":e,css:!r.disabled,...r.disabled?{}:t},i.default)}})}function We(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const n=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",r=Ge(`offset-${n}`);return{onBeforeEnter(s){s._parent=s.parentNode,s._initialStyle={transition:s.style.transition,overflow:s.style.overflow,[n]:s.style[n]}},onEnter(s){const a=s._initialStyle;s.style.setProperty("transition","none","important"),s.style.overflow="hidden";const f=`${s[r]}px`;s.style[n]="0",s.offsetHeight,s.style.transition=a.transition,e&&s._parent&&s._parent.classList.add(e),requestAnimationFrame(()=>{s.style[n]=f})},onAfterEnter:i,onEnterCancelled:i,onLeave(s){s._initialStyle={transition:"",overflow:s.style.overflow,[n]:s.style[n]},s.style.overflow="hidden",s.style[n]=`${s[r]}px`,s.offsetHeight,requestAnimationFrame(()=>s.style[n]="0")},onAfterLeave:o,onLeaveCancelled:o};function o(s){e&&s._parent&&s._parent.classList.remove(e),i(s)}function i(s){const a=s._initialStyle[n];s.style.overflow=s._initialStyle.overflow,a!=null&&(s.style[n]=a),delete s._initialStyle}}g("fab-transition","center center","out-in");g("dialog-bottom-transition");g("dialog-top-transition");const Tn=g("fade-transition");g("scale-transition");g("scroll-x-transition");g("scroll-x-reverse-transition");g("scroll-y-transition");g("scroll-y-reverse-transition");g("slide-x-transition");g("slide-x-reverse-transition");const Pn=g("slide-y-transition");g("slide-y-reverse-transition");const Nn=$e("expand-transition",We()),Cn=$e("expand-x-transition",We("",!0));export{U as B,Tn as V,Sn as a,Nn as b,Cn as c,Rn as d,On as e,An as f,bn as g,Pn as h,wn as i,xn as m,En as n,gn as s};

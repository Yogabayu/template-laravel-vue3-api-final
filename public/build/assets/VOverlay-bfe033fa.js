import{bn as Pe,bs as Ce,N as j,n as H,Y as z,b4 as ce,y as M,b1 as D,bt as Ne,bu as me,bv as ne,bw as oe,bx as ye,k as x,A as Q,by as ge,al as R,aP as he,O as ue,bz as Ae,b3 as fe,a$ as pe,bA as be,M as q,a1 as _e,U as $,J as He,q as Ie,bB as Te,b5 as Ve,aA as We,b6 as qe,a4 as ze,aB as $e,ab as je,S as Ye,W as Ge,aE as Ue,ay as Xe,ad as Ze,ae as Je,aG as Ke,bC as Qe,Z as et,a as W,bD as tt,aw as nt,ax as ot,aV as at,G as rt,bi as it,bE as lt}from"./main-85547d7f.js";import{i as st,B as ae,k as we,n as ct,a as ut,s as ft}from"./index-f3112bcd.js";import{m as vt,M as dt}from"./VImg-359048ef.js";const X=new WeakMap;function mt(e,n){Object.keys(n).forEach(t=>{if(Pe(t)){const o=Ce(t),a=X.get(e);if(n[t]==null)a==null||a.forEach(r=>{const[l,i]=r;l===o&&(e.removeEventListener(o,i),a.delete(r))});else if(!a||![...a].some(r=>r[0]===o&&r[1]===n[t])){e.addEventListener(o,n[t]);const r=a||new Set;r.add([o,n[t]]),X.has(e)||X.set(e,r)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function yt(e,n){Object.keys(n).forEach(t=>{if(Pe(t)){const o=Ce(t),a=X.get(e);a==null||a.forEach(r=>{const[l,i]=r;l===o&&(e.removeEventListener(o,i),a.delete(r))})}else e.removeAttribute(t)})}function Me(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function gt(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?ht(e):ve(e))return e;e=e.parentElement}return document.scrollingElement}function J(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(ve(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function ve(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function ht(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function bt(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}function re(e,n){return{x:e.x+n.x,y:e.y+n.y}}function wt(e,n){return{x:e.x-n.x,y:e.y-n.y}}function Ee(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:o}=e,a=o==="left"?0:o==="center"?n.width/2:o==="right"?n.width:o,r=t==="top"?0:t==="bottom"?n.height:t;return re({x:a,y:r},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:o}=e,a=t==="left"?0:t==="right"?n.width:t,r=o==="top"?0:o==="center"?n.height/2:o==="bottom"?n.height:o;return re({x:a,y:r},n)}return re({x:n.width/2,y:n.height/2},n)}const Fe={static:xt,connected:kt},Et=j({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in Fe},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function St(e,n){const t=H({}),o=H();z&&(ce(()=>!!(n.isActive.value&&e.locationStrategy),r=>{var l,i;M(()=>e.locationStrategy,r),D(()=>{o.value=void 0}),typeof e.locationStrategy=="function"?o.value=(l=e.locationStrategy(n,e,t))==null?void 0:l.updateLocation:o.value=(i=Fe[e.locationStrategy](n,e,t))==null?void 0:i.updateLocation}),window.addEventListener("resize",a,{passive:!0}),D(()=>{window.removeEventListener("resize",a),o.value=void 0}));function a(r){var l;(l=o.value)==null||l.call(o,r)}return{contentStyles:t,updateLocation:o}}function xt(){}function Ot(e,n){n?e.style.removeProperty("left"):e.style.removeProperty("right");const t=ct(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function kt(e,n,t){(Array.isArray(e.target.value)||bt(e.target.value))&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:a,preferredOrigin:r}=Ne(()=>{const u=me(n.location,e.isRtl.value),f=n.origin==="overlap"?u:n.origin==="auto"?ne(u):me(n.origin,e.isRtl.value);return u.side===f.side&&u.align===oe(f).align?{preferredAnchor:ye(u),preferredOrigin:ye(f)}:{preferredAnchor:u,preferredOrigin:f}}),[l,i,d,v]=["minWidth","minHeight","maxWidth","maxHeight"].map(u=>x(()=>{const f=parseFloat(n[u]);return isNaN(f)?1/0:f})),m=x(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const u=n.offset.split(" ").map(parseFloat);return u.length<2&&u.push(0),u}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let b=!1;const O=new ResizeObserver(()=>{b&&k()});M([e.target,e.contentEl],(u,f)=>{let[A,p]=u,[w,g]=f;w&&!Array.isArray(w)&&O.unobserve(w),A&&!Array.isArray(A)&&O.observe(A),g&&O.unobserve(g),p&&O.observe(p)},{immediate:!0}),D(()=>{O.disconnect()});function k(){if(b=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>b=!0)}),!e.target.value||!e.contentEl.value)return;const u=st(e.target.value),f=Ot(e.contentEl.value,e.isRtl.value),A=J(e.contentEl.value),p=12;A.length||(A.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(f.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),f.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const w=A.reduce((S,h)=>{const c=h.getBoundingClientRect(),y=new ae({x:h===document.documentElement?0:c.x,y:h===document.documentElement?0:c.y,width:h.clientWidth,height:h.clientHeight});return S?new ae({x:Math.max(S.left,y.left),y:Math.max(S.top,y.top),width:Math.min(S.right,y.right)-Math.max(S.left,y.left),height:Math.min(S.bottom,y.bottom)-Math.max(S.top,y.top)}):y},void 0);w.x+=p,w.y+=p,w.width-=p*2,w.height-=p*2;let g={anchor:a.value,origin:r.value};function I(S){const h=new ae(f),c=Ee(S.anchor,u),y=Ee(S.origin,h);let{x:F,y:B}=wt(c,y);switch(S.anchor.side){case"top":B-=m.value[0];break;case"bottom":B+=m.value[0];break;case"left":F-=m.value[0];break;case"right":F+=m.value[0];break}switch(S.anchor.align){case"top":B-=m.value[1];break;case"bottom":B+=m.value[1];break;case"left":F-=m.value[1];break;case"right":F+=m.value[1];break}return h.x+=F,h.y+=B,h.width=Math.min(h.width,d.value),h.height=Math.min(h.height,v.value),{overflows:we(h,w),x:F,y:B}}let L=0,P=0;const s={x:0,y:0},T={x:!1,y:!1};let ee=-1;for(;!(ee++>10);){const{x:S,y:h,overflows:c}=I(g);L+=S,P+=h,f.x+=S,f.y+=h;{const y=ge(g.anchor),F=c.x.before||c.x.after,B=c.y.before||c.y.after;let Y=!1;if(["x","y"].forEach(C=>{if(C==="x"&&F&&!T.x||C==="y"&&B&&!T.y){const V={anchor:{...g.anchor},origin:{...g.origin}},G=C==="x"?y==="y"?oe:ne:y==="y"?ne:oe;V.anchor=G(V.anchor),V.origin=G(V.origin);const{overflows:N}=I(V);(N[C].before<=c[C].before&&N[C].after<=c[C].after||N[C].before+N[C].after<(c[C].before+c[C].after)/2)&&(g=V,Y=T[C]=!0)}}),Y)continue}c.x.before&&(L+=c.x.before,f.x+=c.x.before),c.x.after&&(L-=c.x.after,f.x-=c.x.after),c.y.before&&(P+=c.y.before,f.y+=c.y.before),c.y.after&&(P-=c.y.after,f.y-=c.y.after);{const y=we(f,w);s.x=w.width-y.x.before-y.x.after,s.y=w.height-y.y.before-y.y.after,L+=y.x.before,f.x+=y.x.before,P+=y.y.before,f.y+=y.y.before}break}const te=ge(g.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${g.anchor.side} ${g.anchor.align}`,transformOrigin:`${g.origin.side} ${g.origin.align}`,top:R(ie(P)),left:e.isRtl.value?void 0:R(ie(L)),right:e.isRtl.value?R(ie(-L)):void 0,minWidth:R(te==="y"?Math.min(l.value,u.width):l.value),maxWidth:R(Se(he(s.x,l.value===1/0?0:l.value,d.value))),maxHeight:R(Se(he(s.y,i.value===1/0?0:i.value,v.value)))}),{available:s,contentBox:f}}return M(()=>[a.value,r.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>k()),Q(()=>{const u=k();if(!u)return;const{available:f,contentBox:A}=u;A.height>f.y&&requestAnimationFrame(()=>{k(),requestAnimationFrame(()=>{k()})})}),{updateLocation:k}}function ie(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Se(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let le=!0;const K=[];function Pt(e){!le||K.length?(K.push(e),se()):(le=!1,e(),se())}let xe=-1;function se(){cancelAnimationFrame(xe),xe=requestAnimationFrame(()=>{const e=K.shift();e&&e(),K.length?se():le=!0})}const Z={none:null,close:pt,block:Tt,reposition:Mt},Ct=j({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in Z}},"VOverlay-scroll-strategies");function At(e,n){if(!z)return;let t;ue(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=Ae(),await Q(),t.active&&t.run(()=>{var o;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(o=Z[e.scrollStrategy])==null||o.call(Z,n,e,t)}))}),D(()=>{t==null||t.stop()})}function pt(e){function n(t){e.isActive.value=!1}Le(e.targetEl.value??e.contentEl.value,n)}function Tt(e,n){var l;const t=(l=e.root.value)==null?void 0:l.offsetParent,o=[...new Set([...J(e.targetEl.value,n.contained?t:void 0),...J(e.contentEl.value,n.contained?t:void 0)])].filter(i=>!i.classList.contains("v-overlay-scroll-blocked")),a=window.innerWidth-document.documentElement.offsetWidth,r=(i=>ve(i)&&i)(t||document.documentElement);r&&e.root.value.classList.add("v-overlay--scroll-blocked"),o.forEach((i,d)=>{i.style.setProperty("--v-body-scroll-x",R(-i.scrollLeft)),i.style.setProperty("--v-body-scroll-y",R(-i.scrollTop)),i!==document.documentElement&&i.style.setProperty("--v-scrollbar-offset",R(a)),i.classList.add("v-overlay-scroll-blocked")}),D(()=>{o.forEach((i,d)=>{const v=parseFloat(i.style.getPropertyValue("--v-body-scroll-x")),m=parseFloat(i.style.getPropertyValue("--v-body-scroll-y"));i.style.removeProperty("--v-body-scroll-x"),i.style.removeProperty("--v-body-scroll-y"),i.style.removeProperty("--v-scrollbar-offset"),i.classList.remove("v-overlay-scroll-blocked"),i.scrollLeft=-v,i.scrollTop=-m}),r&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function Mt(e,n,t){let o=!1,a=-1,r=-1;function l(i){Pt(()=>{var m,b;const d=performance.now();(b=(m=e.updateLocation).value)==null||b.call(m,i),o=(performance.now()-d)/(1e3/60)>2})}r=(typeof requestIdleCallback>"u"?i=>i():requestIdleCallback)(()=>{t.run(()=>{Le(e.targetEl.value??e.contentEl.value,i=>{o?(cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=requestAnimationFrame(()=>{l(i)})})):l(i)})})}),D(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(r),cancelAnimationFrame(a)})}function Le(e,n){const t=[document,...J(e)];t.forEach(o=>{o.addEventListener("scroll",n,{passive:!0})}),D(()=>{t.forEach(o=>{o.removeEventListener("scroll",n)})})}const Ft=Symbol.for("vuetify:v-menu"),Lt=j({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function Bt(e,n){const t={},o=a=>()=>{if(!z)return Promise.resolve(!0);const r=a==="openDelay";return t.closeDelay&&window.clearTimeout(t.closeDelay),delete t.closeDelay,t.openDelay&&window.clearTimeout(t.openDelay),delete t.openDelay,new Promise(l=>{const i=parseInt(e[a]??0,10);t[a]=window.setTimeout(()=>{n==null||n(r),l(r)},i)})};return{runCloseDelay:o("closeDelay"),runOpenDelay:o("openDelay")}}const Rt=j({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Lt()},"VOverlay-activator");function Dt(e,n){let{isActive:t,isTop:o}=n;const a=fe("useActivator"),r=H();let l=!1,i=!1,d=!0;const v=x(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),m=x(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!v.value),{runOpenDelay:b,runCloseDelay:O}=Bt(e,s=>{s===(e.openOnHover&&l||v.value&&i)&&!(e.openOnHover&&t.value&&!o.value)&&(t.value!==s&&(d=!0),t.value=s)}),k=H(),u={onClick:s=>{s.stopPropagation(),r.value=s.currentTarget||s.target,t.value||(k.value=[s.clientX,s.clientY]),t.value=!t.value},onMouseenter:s=>{var T;(T=s.sourceCapabilities)!=null&&T.firesTouchEvents||(l=!0,r.value=s.currentTarget||s.target,b())},onMouseleave:s=>{l=!1,O()},onFocus:s=>{_e(s.target,":focus-visible")!==!1&&(i=!0,s.stopPropagation(),r.value=s.currentTarget||s.target,b())},onBlur:s=>{i=!1,s.stopPropagation(),O()}},f=x(()=>{const s={};return m.value&&(s.onClick=u.onClick),e.openOnHover&&(s.onMouseenter=u.onMouseenter,s.onMouseleave=u.onMouseleave),v.value&&(s.onFocus=u.onFocus,s.onBlur=u.onBlur),s}),A=x(()=>{const s={};if(e.openOnHover&&(s.onMouseenter=()=>{l=!0,b()},s.onMouseleave=()=>{l=!1,O()}),v.value&&(s.onFocusin=()=>{i=!0,b()},s.onFocusout=()=>{i=!1,O()}),e.closeOnContentClick){const T=pe(Ft,null);s.onClick=()=>{t.value=!1,T==null||T.closeParents()}}return s}),p=x(()=>{const s={};return e.openOnHover&&(s.onMouseenter=()=>{d&&(l=!0,d=!1,b())},s.onMouseleave=()=>{l=!1,O()}),s});M(o,s=>{s&&(e.openOnHover&&!l&&(!v.value||!i)||v.value&&!i&&(!e.openOnHover||!l))&&(t.value=!1)}),M(t,s=>{s||setTimeout(()=>{k.value=void 0})},{flush:"post"});const w=H();ue(()=>{w.value&&Q(()=>{r.value=be(w.value)})});const g=H(),I=x(()=>e.target==="cursor"&&k.value?k.value:g.value?be(g.value):Be(e.target,a)||r.value),L=x(()=>Array.isArray(I.value)?void 0:I.value);let P;return M(()=>!!e.activator,s=>{s&&z?(P=Ae(),P.run(()=>{Nt(e,a,{activatorEl:r,activatorEvents:f})})):P&&P.stop()},{flush:"post",immediate:!0}),D(()=>{P==null||P.stop()}),{activatorEl:r,activatorRef:w,target:I,targetEl:L,targetRef:g,activatorEvents:f,contentEvents:A,scrimEvents:p}}function Nt(e,n,t){let{activatorEl:o,activatorEvents:a}=t;M(()=>e.activator,(d,v)=>{if(v&&d!==v){const m=i(v);m&&l(m)}d&&Q(()=>r())},{immediate:!0}),M(()=>e.activatorProps,()=>{r()}),D(()=>{l()});function r(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:i(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;d&&mt(d,q(a.value,v))}function l(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:i(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;d&&yt(d,q(a.value,v))}function i(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator;const v=Be(d,n);return o.value=(v==null?void 0:v.nodeType)===Node.ELEMENT_NODE?v:void 0,o.value}}function Be(e,n){var o,a;if(!e)return;let t;if(e==="parent"){let r=(a=(o=n==null?void 0:n.proxy)==null?void 0:o.$el)==null?void 0:a.parentNode;for(;r!=null&&r.hasAttribute("data-no-activator");)r=r.parentNode;t=r}else typeof e=="string"?t=document.querySelector(e):"$el"in e?t=e.$el:t=e;return t}function _t(){if(!z)return $(!1);const{ssr:e}=He();if(e){const n=$(!1);return Ie(()=>{n.value=!0}),n}else return $(!0)}const Ht=j({eager:Boolean},"lazy");function It(e,n){const t=$(!1),o=x(()=>t.value||e.eager||n.value);M(n,()=>t.value=!0);function a(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:o,onAfterLeave:a}}function Vt(){const n=fe("useScopeId").vnode.scopeId;return{scopeId:n?{[n]:""}:void 0}}const Oe=Symbol.for("vuetify:stack"),U=Te([]);function Wt(e,n,t){const o=fe("useStack"),a=!t,r=pe(Oe,void 0),l=Te({activeChildren:new Set});Ve(Oe,l);const i=$(+n.value);ce(e,()=>{var b;const m=(b=U.at(-1))==null?void 0:b[1];i.value=m?m+10:+n.value,a&&U.push([o.uid,i.value]),r==null||r.activeChildren.add(o.uid),D(()=>{if(a){const O=qe(U).findIndex(k=>k[0]===o.uid);U.splice(O,1)}r==null||r.activeChildren.delete(o.uid)})});const d=$(!0);a&&ue(()=>{var b;const m=((b=U.at(-1))==null?void 0:b[0])===o.uid;setTimeout(()=>d.value=m)});const v=x(()=>!l.activeChildren.size);return{globalTop:We(d),localTop:v,stackStyles:x(()=>({zIndex:i.value}))}}function qt(e){return{teleportTarget:x(()=>{const t=e.value;if(t===!0||!z)return;const o=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(o==null)return;let a=o.querySelector(":scope > .v-overlay-container");return a||(a=document.createElement("div"),a.className="v-overlay-container",o.appendChild(a)),a})}}function zt(){return!0}function Re(e,n,t){if(!e||De(e,t)===!1)return!1;const o=Me(n);if(typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&o.host===e.target)return!1;const a=(typeof t.value=="object"&&t.value.include||(()=>[]))();return a.push(n),!a.some(r=>r==null?void 0:r.contains(e.target))}function De(e,n){return(typeof n.value=="object"&&n.value.closeConditional||zt)(e)}function $t(e,n,t){const o=typeof t.value=="function"?t.value:t.value.handler;n._clickOutside.lastMousedownWasOutside&&Re(e,n,t)&&setTimeout(()=>{De(e,t)&&o&&o(e)},0)}function ke(e,n){const t=Me(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const jt={mounted(e,n){const t=a=>$t(a,e,n),o=a=>{e._clickOutside.lastMousedownWasOutside=Re(a,e,n)};ke(e,a=>{a.addEventListener("click",t,!0),a.addEventListener("mousedown",o,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:o}},unmounted(e,n){e._clickOutside&&(ke(e,t=>{var r;if(!t||!((r=e._clickOutside)!=null&&r[n.instance.$.uid]))return;const{onClick:o,onMousedown:a}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",o,!0),t.removeEventListener("mousedown",a,!0)}),delete e._clickOutside[n.instance.$.uid])}};function Yt(e){const{modelValue:n,color:t,...o}=e;return W(it,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&W("div",q({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const Gt=j({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Rt(),...ze(),...$e(),...Ht(),...Et(),...Ct(),...je(),...vt()},"VOverlay"),Jt=Ye()({name:"VOverlay",directives:{ClickOutside:jt},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Gt()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:o,emit:a}=n;const r=Ge(e,"modelValue"),l=x({get:()=>r.value,set:E=>{E&&e.disabled||(r.value=E)}}),{teleportTarget:i}=qt(x(()=>e.attach||e.contained)),{themeClasses:d}=Ue(e),{rtlClasses:v,isRtl:m}=Xe(),{hasContent:b,onAfterLeave:O}=It(e,l),k=Ze(x(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:u,localTop:f,stackStyles:A}=Wt(l,Je(e,"zIndex"),e._disableGlobalStack),{activatorEl:p,activatorRef:w,target:g,targetEl:I,targetRef:L,activatorEvents:P,contentEvents:s,scrimEvents:T}=Dt(e,{isActive:l,isTop:f}),{dimensionStyles:ee}=Ke(e),te=_t(),{scopeId:S}=Vt();M(()=>e.disabled,E=>{E&&(l.value=!1)});const h=H(),c=H(),{contentStyles:y,updateLocation:F}=St(e,{isRtl:m,contentEl:c,target:g,isActive:l});At(e,{root:h,contentEl:c,targetEl:I,isActive:l,updateLocation:F});function B(E){a("click:outside",E),e.persistent?N():l.value=!1}function Y(){return l.value&&u.value}z&&M(l,E=>{E?window.addEventListener("keydown",C):window.removeEventListener("keydown",C)},{immediate:!0});function C(E){var _,de;E.key==="Escape"&&u.value&&(e.persistent?N():(l.value=!1,(_=c.value)!=null&&_.contains(document.activeElement)&&((de=p.value)==null||de.focus())))}const V=Qe();ce(()=>e.closeOnBack,()=>{lt(V,E=>{u.value&&l.value?(E(!1),e.persistent?N():l.value=!1):E()})});const G=H();M(()=>l.value&&(e.absolute||e.contained)&&i.value==null,E=>{if(E){const _=gt(h.value);_&&_!==document.scrollingElement&&(G.value=_.scrollTop)}});function N(){e.noClickAnimation||c.value&&ut(c.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:ft})}return et(()=>{var E;return W(rt,null,[(E=t.activator)==null?void 0:E.call(t,{isActive:l.value,props:q({ref:w,targetRef:L},P.value,e.activatorProps)}),te.value&&b.value&&W(tt,{disabled:!i.value,to:i.value},{default:()=>[W("div",q({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":l.value,"v-overlay--contained":e.contained},d.value,v.value,e.class],style:[A.value,{top:R(G.value)},e.style],ref:h},S,o),[W(Yt,q({color:k,modelValue:l.value&&!!e.scrim},T.value),null),W(dt,{appear:!0,persisted:!0,transition:e.transition,target:g.value,onAfterLeave:()=>{O(),a("afterLeave")}},{default:()=>{var _;return[nt(W("div",q({ref:c,class:["v-overlay__content",e.contentClass],style:[ee.value,y.value]},s.value,e.contentProps),[(_=t.default)==null?void 0:_.call(t,{isActive:l})]),[[ot,l.value],[at("click-outside"),{handler:B,closeConditional:Y,include:()=>[p.value]}]])]}})])]})])}),{activatorEl:p,target:g,animateClick:N,contentEl:c,globalTop:u,localTop:f,updateLocation:F}}});export{Jt as V,Ft as a,Ht as b,It as c,gt as g,Gt as m,Vt as u};

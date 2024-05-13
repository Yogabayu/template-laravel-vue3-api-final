import{m as ge,u as ye,a as oe}from"./VTextField-d130428f.js";import{L as q,a3 as de,Q as te,aL as fe,y as N,X as ne,a as h,G as $,K,J as Ve,S as _,M as ue,n as H,k as M,a$ as ve,aN as ee,aR as Se,b0 as we,A as ke,W as me,ay as be,b1 as Te,aD as Pe,ad as xe,b2 as Ce,q as Ie,ak as X,as as Re,P as De,R as Ae,T as se,i as ie,Y as Be,Z as Fe,e as Le,N as _e,$ as re}from"./main-8bd1049b.js";import{f as Me}from"./index-72ac3f44.js";import{m as Oe,u as Ee,V as He,a as Ne,b as ce}from"./VMenu-127de488.js";import{m as Ue}from"./VImg-5f702e6e.js";import{V as Ke}from"./dialog-transition-4788892b.js";import{g as $e}from"./VOverlay-8488d677.js";import{V as qe}from"./VCheckboxBtn-fbcdc272.js";import{V as ze}from"./VChip-78202466.js";const We=q({renderless:Boolean,...de()},"VVirtualScrollItem"),je=te()({name:"VVirtualScrollItem",inheritAttrs:!1,props:We(),emits:{"update:height":e=>!0},setup(e,c){let{attrs:n,emit:d,slots:s}=c;const{resizeRef:m,contentRect:k}=fe(void 0,"border");N(()=>{var u;return(u=k.value)==null?void 0:u.height},u=>{u!=null&&d("update:height",u)}),ne(()=>{var u,a;return e.renderless?h($,null,[(u=s.default)==null?void 0:u.call(s,{itemRef:m})]):h("div",K({ref:m,class:["v-virtual-scroll__item",e.class],style:e.style},n),[(a=s.default)==null?void 0:a.call(s)])})}}),Xe=-1,Ye=1,le=100,Ge=q({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function Je(e,c){const n=Ve(),d=_(0);ue(()=>{d.value=parseFloat(e.itemHeight||0)});const s=_(0),m=_(Math.ceil((parseInt(e.height)||n.height.value)/(d.value||16))||1),k=_(0),u=_(0),a=H(),g=H();let P=0;const{resizeRef:C,contentRect:i}=fe();ue(()=>{C.value=a.value});const p=M(()=>{var o;return a.value===document.documentElement?n.height.value:((o=i.value)==null?void 0:o.height)||parseInt(e.height)||0}),I=M(()=>!!(a.value&&g.value&&p.value&&d.value)),S=new Map;let y=Array.from({length:c.value.length});const b=Array.from({length:c.value.length}),R=_(0);let D=-1;function z(o){return y[o]||d.value}const A=we(()=>{const o=performance.now();b[0]=0;const l=c.value.length;for(let f=1;f<=l-1;f++)b[f]=(b[f-1]||0)+z(f-1);R.value=Math.max(R.value,performance.now()-o)},R),Y=N(I,o=>{o&&(Y(),P=g.value.offsetTop,A.immediate(),t(),~D&&ke(()=>{me&&window.requestAnimationFrame(()=>{w(D),D=-1})}))});N(p,(o,l)=>{l&&t()}),ve(()=>{A.clear()});function G(o,l){const f=y[o],v=d.value;d.value=v?Math.min(d.value,l):l,(f!==l||v!==d.value)&&(y[o]=l,S.set(c.value[o],l),A())}function x(o){return o=ee(o,0,c.value.length-1),b[o]||0}function W(o){return Qe(b,o)}let O=0,B=0,U=0;function J(){if(!a.value||!g.value)return;const o=a.value.scrollTop,l=performance.now();l-U>500?(B=Math.sign(o-O),P=g.value.offsetTop):B=o-O,O=o,U=l,t()}function Q(){!a.value||!g.value||(B=0,U=0,t())}let j=-1;function t(){cancelAnimationFrame(j),j=requestAnimationFrame(r)}function r(){if(!a.value||!p.value)return;const o=O-P,l=Math.sign(B),f=Math.max(0,o-le),v=ee(W(f),0,c.value.length),T=o+p.value+le,V=ee(W(T)+1,v+1,c.value.length);if((l!==Xe||v<s.value)&&(l!==Ye||V>m.value)){const L=x(s.value)-x(v),F=x(V)-x(m.value);Math.max(L,F)>le?(s.value=v,m.value=V):(v<=0&&(s.value=v),V>=c.value.length&&(m.value=V))}k.value=x(s.value),u.value=x(c.value.length)-x(m.value)}function w(o){const l=x(o);!a.value||o&&!l?D=o:a.value.scrollTop=l}const E=M(()=>c.value.slice(s.value,m.value).map((o,l)=>({raw:o,index:l+s.value})));return N(()=>c.value.length,()=>{y=Se(c.value.length).map(()=>d.value),S.forEach((o,l)=>{const f=c.value.indexOf(l);f===-1?S.delete(l):y[f]=o}),t()}),{containerRef:a,markerRef:g,computedItems:E,paddingTop:k,paddingBottom:u,scrollToIndex:w,handleScroll:J,handleScrollend:Q,handleItemResize:G}}function Qe(e,c){let n=e.length-1,d=0,s=0,m=null,k=-1;if(e[n]<c)return n;for(;d<=n;)if(s=d+n>>1,m=e[s],m>c)n=s-1;else if(m<c)k=s,d=s+1;else return m===c?s:d;return k}const Ze=q({items:{type:Array,default:()=>[]},renderless:Boolean,...Ge(),...de(),...be()},"VVirtualScroll"),el=te()({name:"VVirtualScroll",props:Ze(),setup(e,c){let{slots:n}=c;const d=Te("VVirtualScroll"),{dimensionStyles:s}=Pe(e),{containerRef:m,markerRef:k,handleScroll:u,handleScrollend:a,handleItemResize:g,scrollToIndex:P,paddingTop:C,paddingBottom:i,computedItems:p}=Je(e,xe(e,"items"));return Ce(()=>e.renderless,()=>{function I(){var b,R;const y=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?"addEventListener":"removeEventListener";m.value===document.documentElement?(document[y]("scroll",u,{passive:!0}),document[y]("scrollend",a)):((b=m.value)==null||b[y]("scroll",u,{passive:!0}),(R=m.value)==null||R[y]("scrollend",a))}Ie(()=>{m.value=$e(d.vnode.el,!0),I(!0)}),ve(I)}),ne(()=>{const I=p.value.map(S=>h(je,{key:S.index,renderless:e.renderless,"onUpdate:height":y=>g(S.index,y)},{default:y=>{var b;return(b=n.default)==null?void 0:b.call(n,{item:S.raw,index:S.index,...y})}}));return e.renderless?h($,null,[h("div",{ref:k,class:"v-virtual-scroll__spacer",style:{paddingTop:X(C.value)}},null),I,h("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:X(i.value)}},null)]):h("div",{ref:m,class:["v-virtual-scroll",e.class],onScrollPassive:u,onScrollend:a,style:[s.value,e.style]},[h("div",{ref:k,class:"v-virtual-scroll__container",style:{paddingTop:X(C.value),paddingBottom:X(i.value)}},[I])])}),{scrollToIndex:P}}});function ll(e,c){const n=_(!1);let d;function s(u){cancelAnimationFrame(d),n.value=!0,d=requestAnimationFrame(()=>{d=requestAnimationFrame(()=>{n.value=!1})})}async function m(){await new Promise(u=>requestAnimationFrame(u)),await new Promise(u=>requestAnimationFrame(u)),await new Promise(u=>requestAnimationFrame(u)),await new Promise(u=>{if(n.value){const a=N(n,()=>{a(),u()})}else u()})}async function k(u){var P,C;if(u.key==="Tab"&&((P=c.value)==null||P.focus()),!["PageDown","PageUp","Home","End"].includes(u.key))return;const a=(C=e.value)==null?void 0:C.$el;if(!a)return;(u.key==="Home"||u.key==="End")&&a.scrollTo({top:u.key==="Home"?0:a.scrollHeight,behavior:"smooth"}),await m();const g=a.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(u.key==="PageDown"||u.key==="Home"){const i=a.getBoundingClientRect().top;for(const p of g)if(p.getBoundingClientRect().top>=i){p.focus();break}}else{const i=a.getBoundingClientRect().bottom;for(const p of[...g].reverse())if(p.getBoundingClientRect().bottom<=i){p.focus();break}}}return{onListScroll:s,onListKeydown:k}}const tl=q({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:Re,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...Oe({itemChildren:!1})},"Select"),nl=q({...tl(),...De(ge({modelValue:null,role:"button"}),["validationValue","dirty","appendInnerIcon"]),...Ue({transition:{component:Ke}})},"VSelect"),vl=te()({name:"VSelect",props:nl(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,c){let{slots:n}=c;const{t:d}=Ae(),s=H(),m=H(),k=H(),u=se(e,"menu"),a=M({get:()=>u.value,set:t=>{var r;u.value&&!t&&((r=m.value)!=null&&r.ΨopenChildren)||(u.value=t)}}),{items:g,transformIn:P,transformOut:C}=Ee(e),i=se(e,"modelValue",[],t=>P(t===null?[null]:_e(t)),t=>{const r=C(t);return e.multiple?r:r[0]??null}),p=ye(),I=M(()=>i.value.map(t=>t.value)),S=_(!1),y=M(()=>a.value?e.closeText:e.openText);let b="",R;const D=M(()=>e.hideSelected?g.value.filter(t=>!i.value.some(r=>r===t)):g.value),z=M(()=>e.hideNoData&&!g.value.length||e.readonly||(p==null?void 0:p.isReadonly.value)),A=H(),{onListScroll:Y,onListKeydown:G}=ll(A,s);function x(t){e.openOnClear&&(a.value=!0)}function W(){z.value||(a.value=!a.value)}function O(t){var l,f;if(!t.key||e.readonly||p!=null&&p.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(t.key)&&t.preventDefault(),["Enter","ArrowDown"," "].includes(t.key)&&(a.value=!0),["Escape","Tab"].includes(t.key)&&(a.value=!1),t.key==="Home"?(l=A.value)==null||l.focus("first"):t.key==="End"&&((f=A.value)==null||f.focus("last"));const r=1e3;function w(v){const T=v.key.length===1,V=!v.ctrlKey&&!v.metaKey&&!v.altKey;return T&&V}if(e.multiple||!w(t))return;const E=performance.now();E-R>r&&(b=""),b+=t.key.toLowerCase(),R=E;const o=g.value.find(v=>v.title.toLowerCase().startsWith(b));o!==void 0&&(i.value=[o])}function B(t){if(e.multiple){const r=i.value.findIndex(w=>e.valueComparator(w.value,t.value));if(r===-1)i.value=[...i.value,t];else{const w=[...i.value];w.splice(r,1),i.value=w}}else i.value=[t],a.value=!1}function U(t){var r;(r=A.value)!=null&&r.$el.contains(t.relatedTarget)||(a.value=!1)}function J(){var t;S.value&&((t=s.value)==null||t.focus())}function Q(t){S.value=!0}function j(t){if(t==null)i.value=[];else if(re(s.value,":autofill")||re(s.value,":-webkit-autofill")){const r=g.value.find(w=>w.title===t);r&&B(r)}else s.value&&(s.value.value="")}return N(a,()=>{if(!e.hideSelected&&a.value&&i.value.length){const t=D.value.findIndex(r=>i.value.some(w=>e.valueComparator(w.value,r.value)));me&&window.requestAnimationFrame(()=>{var r;t>=0&&((r=k.value)==null||r.scrollToIndex(t))})}}),ne(()=>{const t=!!(e.chips||n.chip),r=!!(!e.hideNoData||D.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),w=i.value.length>0,E=oe.filterProps(e),o=w||!S.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return h(oe,K({ref:s},E,{modelValue:i.value.map(l=>l.props.value).join(", "),"onUpdate:modelValue":j,focused:S.value,"onUpdate:focused":l=>S.value=l,validationValue:i.externalValue,counterValue:i.value.length,dirty:w,class:["v-select",{"v-select--active-menu":a.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":i.value.length,"v-select--selection-slot":!!n.selection},e.class],style:e.style,inputmode:"none",placeholder:o,"onClick:clear":x,"onMousedown:control":W,onBlur:U,onKeydown:O,"aria-label":d(y.value),title:d(y.value)}),{...n,default:()=>h($,null,[h(He,K({ref:m,modelValue:a.value,"onUpdate:modelValue":l=>a.value=l,activator:"parent",contentClass:"v-select__content",disabled:z.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:J},e.menuProps),{default:()=>[r&&h(Ne,{ref:A,selected:I.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:l=>l.preventDefault(),onKeydown:G,onFocusin:Q,onScrollPassive:Y,tabindex:"-1",color:e.itemColor??e.color},{default:()=>{var l,f,v;return[(l=n["prepend-item"])==null?void 0:l.call(n),!D.value.length&&!e.hideNoData&&(((f=n["no-data"])==null?void 0:f.call(n))??h(ce,{title:d(e.noDataText)},null)),h(el,{ref:k,renderless:!0,items:D.value},{default:T=>{var ae;let{item:V,index:L,itemRef:F}=T;const Z=K(V.props,{ref:F,key:L,onClick:()=>B(V)});return((ae=n.item)==null?void 0:ae.call(n,{item:V,index:L,props:Z}))??h(ce,Z,{prepend:he=>{let{isSelected:pe}=he;return h($,null,[e.multiple&&!e.hideSelected?h(qe,{key:V.value,modelValue:pe,ripple:!1,tabindex:"-1"},null):void 0,V.props.prependIcon&&h(ie,{icon:V.props.prependIcon},null)])}})}}),(v=n["append-item"])==null?void 0:v.call(n)]}})]}),i.value.map((l,f)=>{function v(F){F.stopPropagation(),F.preventDefault(),B(l)}const T={"onClick:close":v,onMousedown(F){F.preventDefault(),F.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},V=t?!!n.chip:!!n.selection,L=V?Be(t?n.chip({item:l,index:f,props:T}):n.selection({item:l,index:f})):void 0;if(!(V&&!L))return h("div",{key:l.value,class:"v-select__selection"},[t?n.chip?h(Fe,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:l.title}}},{default:()=>[L]}):h(ze,K({key:"chip",closable:e.closableChips,size:"small",text:l.title,disabled:l.props.disabled},T),null):L??h("span",{class:"v-select__selection-text"},[l.title,e.multiple&&f<i.value.length-1&&h("span",{class:"v-select__selection-comma"},[Le(",")])])])})]),"append-inner":function(){var T;for(var l=arguments.length,f=new Array(l),v=0;v<l;v++)f[v]=arguments[v];return h($,null,[(T=n["append-inner"])==null?void 0:T.call(n,...f),e.menuIcon?h(ie,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),Me({isFocused:S,menu:a,select:B},s)}});export{vl as V,el as a,tl as m,ll as u};

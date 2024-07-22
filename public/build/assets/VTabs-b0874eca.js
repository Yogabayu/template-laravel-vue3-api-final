import{P as D,T as ce,b4 as ve,W,$ as de,l as y,Y as P,p as j,a1 as X,e as K,a as m,O as Y,b5 as fe,b6 as me,ar as Z,a8 as be,b7 as ge,a9 as se,aY as he,ak as Se,K as ye,a_ as xe,aI as J,a0 as pe,z as Ce,j as Q,b8 as Te,aP as ke,aF as ze,Z as Ve,b0 as Pe,ae as we,af as V,al as Re,am as $e,b9 as Oe}from"./main-d5b147b0.js";import{a as ee}from"./index-c0b6e900.js";const ne=Symbol.for("vuetify:v-tabs"),_e=D({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...ce(ve({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),Be=W()({name:"VTab",props:_e(),setup(e,u){let{slots:n,attrs:r}=u;const{textColorClasses:x,textColorStyles:v}=de(e,"sliderColor"),a=y(()=>e.direction==="horizontal"),i=P(!1),l=j(),o=j();function d(c){var w,f;let{value:b}=c;if(i.value=b,b){const k=(f=(w=l.value)==null?void 0:w.$el.parentElement)==null?void 0:f.querySelector(".v-tab--selected .v-tab__slider"),R=o.value;if(!k||!R)return;const E=getComputedStyle(k).color,h=k.getBoundingClientRect(),p=R.getBoundingClientRect(),z=a.value?"x":"y",$=a.value?"X":"Y",M=a.value?"right":"bottom",C=a.value?"width":"height",I=h[z],O=p[z],T=I>O?h[M]-p[M]:h[z]-p[z],A=Math.sign(T)>0?a.value?"right":"bottom":Math.sign(T)<0?a.value?"left":"top":"center",F=(Math.abs(T)+(Math.sign(T)<0?h[C]:p[C]))/Math.max(h[C],p[C])||0,g=h[C]/p[C]||0,_=1.5;fe(R,{backgroundColor:[E,"currentcolor"],transform:[`translate${$}(${T}px) scale${$}(${g})`,`translate${$}(${T/_}px) scale${$}(${(F-1)/_+1})`,"none"],transformOrigin:Array(3).fill(A)},{duration:225,easing:me})}}return X(()=>{const c=K.filterProps(e);return m(K,Y({symbol:ne,ref:l,class:["v-tab",e.class],style:e.style,tabindex:i.value?0:-1,role:"tab","aria-selected":String(i.value),active:!1},c,r,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":d}),{default:()=>{var b;return[((b=n.default)==null?void 0:b.call(n))??e.text,!e.hideSlider&&m("div",{ref:o,class:["v-tab__slider",x.value],style:v.value},null)]}})}),{}}});function te(e){const n=Math.abs(e);return Math.sign(e)*(n/((1/.501-2)*(1-n)+1))}function le(e){let{selectedElement:u,containerSize:n,contentSize:r,isRtl:x,currentScrollOffset:v,isHorizontal:a}=e;const i=a?u.clientWidth:u.clientHeight,l=a?u.offsetLeft:u.offsetTop,o=x&&a?r-l-i:l,d=n+v,c=i+o,b=i*.4;return o<=v?v=Math.max(o-b,0):d<=c&&(v=Math.min(v-(d-c-b),r-n)),v}function Me(e){let{selectedElement:u,containerSize:n,contentSize:r,isRtl:x,isHorizontal:v}=e;const a=v?u.clientWidth:u.clientHeight,i=v?u.offsetLeft:u.offsetTop,l=x&&v?r-i-a/2-n/2:i+a/2-n/2;return Math.min(r-n,Math.max(0,l))}const Ee=Symbol.for("vuetify:v-slide-group"),oe=D({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Ee},nextIcon:{type:Z,default:"$next"},prevIcon:{type:Z,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...be(),...ge(),...se(),...he({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),ae=W()({name:"VSlideGroup",props:oe(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:n}=u;const{isRtl:r}=Se(),{displayClasses:x,mobile:v}=ye(e),a=xe(e,e.symbol),i=P(!1),l=P(0),o=P(0),d=P(0),c=y(()=>e.direction==="horizontal"),{resizeRef:b,contentRect:w}=J(),{resizeRef:f,contentRect:k}=J(),R=y(()=>a.selected.value.length?a.items.value.findIndex(t=>t.id===a.selected.value[0]):-1),E=y(()=>a.selected.value.length?a.items.value.findIndex(t=>t.id===a.selected.value[a.selected.value.length-1]):-1);if(pe){let t=-1;Ce(()=>[a.selected.value,w.value,k.value,c.value],()=>{cancelAnimationFrame(t),t=requestAnimationFrame(()=>{if(w.value&&k.value){const s=c.value?"width":"height";o.value=w.value[s],d.value=k.value[s],i.value=o.value+1<d.value}if(R.value>=0&&f.value){const s=f.value.children[E.value];R.value===0||!i.value?l.value=0:e.centerActive?l.value=Me({selectedElement:s,containerSize:o.value,contentSize:d.value,isRtl:r.value,isHorizontal:c.value}):i.value&&(l.value=le({selectedElement:s,containerSize:o.value,contentSize:d.value,isRtl:r.value,currentScrollOffset:l.value,isHorizontal:c.value}))}})})}const h=P(!1);let p=0,z=0;function $(t){const s=c.value?"clientX":"clientY";z=(r.value&&c.value?-1:1)*l.value,p=t.touches[0][s],h.value=!0}function M(t){if(!i.value)return;const s=c.value?"clientX":"clientY",S=r.value&&c.value?-1:1;l.value=S*(z+p-t.touches[0][s])}function C(t){const s=d.value-o.value;l.value<0||!i.value?l.value=0:l.value>=s&&(l.value=s),h.value=!1}function I(){b.value&&(b.value[c.value?"scrollLeft":"scrollTop"]=0)}const O=P(!1);function T(t){if(O.value=!0,!(!i.value||!f.value)){for(const s of t.composedPath())for(const S of f.value.children)if(S===s){l.value=le({selectedElement:S,containerSize:o.value,contentSize:d.value,isRtl:r.value,currentScrollOffset:l.value,isHorizontal:c.value});return}}}function A(t){O.value=!1}function q(t){var s;!O.value&&!(t.relatedTarget&&((s=f.value)!=null&&s.contains(t.relatedTarget)))&&g()}function F(t){f.value&&(c.value?t.key==="ArrowRight"?g(r.value?"prev":"next"):t.key==="ArrowLeft"&&g(r.value?"next":"prev"):t.key==="ArrowDown"?g("next"):t.key==="ArrowUp"&&g("prev"),t.key==="Home"?g("first"):t.key==="End"&&g("last"))}function g(t){var s,S,L,N,U;if(f.value)if(!t)(s=Te(f.value)[0])==null||s.focus();else if(t==="next"){const B=(S=f.value.querySelector(":focus"))==null?void 0:S.nextElementSibling;B?B.focus():g("first")}else if(t==="prev"){const B=(L=f.value.querySelector(":focus"))==null?void 0:L.previousElementSibling;B?B.focus():g("last")}else t==="first"?(N=f.value.firstElementChild)==null||N.focus():t==="last"&&((U=f.value.lastElementChild)==null||U.focus())}function _(t){const s=l.value+(t==="prev"?-1:1)*o.value;l.value=ke(s,0,d.value-o.value)}const ie=y(()=>{let t=l.value>d.value-o.value?-(d.value-o.value)+te(d.value-o.value-l.value):-l.value;l.value<=0&&(t=te(-l.value));const s=r.value&&c.value?-1:1;return{transform:`translate${c.value?"X":"Y"}(${s*t}px)`,transition:h.value?"none":"",willChange:h.value?"transform":""}}),H=y(()=>({next:a.next,prev:a.prev,select:a.select,isSelected:a.isSelected})),G=y(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!v.value;case!0:return i.value||Math.abs(l.value)>0;case"mobile":return v.value||i.value||Math.abs(l.value)>0;default:return!v.value&&(i.value||Math.abs(l.value)>0)}}),ue=y(()=>Math.abs(l.value)>0),re=y(()=>d.value>Math.abs(l.value)+o.value);return X(()=>m(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!c.value,"v-slide-group--has-affixes":G.value,"v-slide-group--is-overflowing":i.value},x.value,e.class],style:e.style,tabindex:O.value||a.selected.value.length?-1:0,onFocus:q},{default:()=>{var t,s,S;return[G.value&&m("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!ue.value}],onClick:()=>_("prev")},[((t=n.prev)==null?void 0:t.call(n,H.value))??m(ee,null,{default:()=>[m(Q,{icon:r.value?e.nextIcon:e.prevIcon},null)]})]),m("div",{key:"container",ref:b,class:"v-slide-group__container",onScroll:I},[m("div",{ref:f,class:"v-slide-group__content",style:ie.value,onTouchstartPassive:$,onTouchmovePassive:M,onTouchendPassive:C,onFocusin:T,onFocusout:A,onKeydown:F},[(s=n.default)==null?void 0:s.call(n,H.value)])]),G.value&&m("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!re.value}],onClick:()=>_("next")},[((S=n.next)==null?void 0:S.call(n,H.value))??m(ee,null,{default:()=>[m(Q,{icon:r.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:a.selected,scrollTo:_,scrollOffset:l,focus:g}}});function Ie(e){return e?e.map(u=>Oe(u)?u:{text:u,value:u}):[]}const Ae=D({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...oe({mandatory:"force"}),...ze(),...se()},"VTabs"),Ge=W()({name:"VTabs",props:Ae(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:n}=u;const r=Ve(e,"modelValue"),x=y(()=>Ie(e.items)),{densityClasses:v}=Pe(e),{backgroundColorClasses:a,backgroundColorStyles:i}=we(V(e,"bgColor"));return Re({VTab:{color:V(e,"color"),direction:V(e,"direction"),stacked:V(e,"stacked"),fixed:V(e,"fixedTabs"),sliderColor:V(e,"sliderColor"),hideSlider:V(e,"hideSlider")}}),X(()=>{const l=ae.filterProps(e);return m(ae,Y(l,{modelValue:r.value,"onUpdate:modelValue":o=>r.value=o,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},v.value,a.value,e.class],style:[{"--v-tabs-height":$e(e.height)},i.value,e.style],role:"tablist",symbol:ne}),{default:()=>[n.default?n.default():x.value.map(o=>m(Be,Y(o,{key:o.text}),null))]})}),{}}});export{Ge as V,Be as a};

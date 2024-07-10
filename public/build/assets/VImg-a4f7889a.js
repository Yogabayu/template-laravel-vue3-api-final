import{N as I,a4 as O,aA as U,S as $,aF as L,Z as C,a,k as h,z as G,M as F,bh as Z,bI as W,U as _,n as J,y as z,p as K,A as Q,ar as B,aO as X,G as Y,ai as p,as as ee}from"./main-42c2d6c5.js";function te(e){return{aspectStyles:h(()=>{const l=Number(e.aspectRatio);return l?{paddingBottom:String(1/l*100)+"%"}:void 0})}}const A=I({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...O(),...U()},"VResponsive"),N=$()({name:"VResponsive",props:A(),setup(e,l){let{slots:i}=l;const{aspectStyles:n}=te(e),{dimensionStyles:u}=L(e);return C(()=>{var r;return a("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[u.value,e.style]},[a("div",{class:"v-responsive__sizer",style:n.value},null),(r=i.additional)==null?void 0:r.call(i),i.default&&a("div",{class:["v-responsive__content",e.contentClass]},[i.default()])])}),{}}}),ne=I({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),b=(e,l)=>{let{slots:i}=l;const{transition:n,disabled:u,...r}=e,{component:s=Z,...v}=typeof n=="object"?n:{};return G(s,F(typeof n=="string"?{name:u?"":n}:v,r,{disabled:u}),i)};function re(e,l){if(!W)return;const i=l.modifiers||{},n=l.value,{handler:u,options:r}=typeof n=="object"?n:{handler:n,options:{}},s=new IntersectionObserver(function(){var f;let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],m=arguments.length>1?arguments[1]:void 0;const o=(f=e._observe)==null?void 0:f[l.instance.$.uid];if(!o)return;const d=v.some(y=>y.isIntersecting);u&&(!i.quiet||o.init)&&(!i.once||d||o.init)&&u(d,v,m),d&&i.once?M(e,l):o.init=!0},r);e._observe=Object(e._observe),e._observe[l.instance.$.uid]={init:!1,observer:s},s.observe(e)}function M(e,l){var n;const i=(n=e._observe)==null?void 0:n[l.instance.$.uid];i&&(i.observer.unobserve(e),delete e._observe[l.instance.$.uid])}const ae={mounted:re,unmounted:M},se=ae,ie=I({alt:String,cover:Boolean,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...A(),...O(),...ne()},"VImg"),oe=$()({name:"VImg",directives:{intersect:se},props:ie(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,l){let{emit:i,slots:n}=l;const u=_(""),r=J(),s=_(e.eager?"loading":"idle"),v=_(),m=_(),o=h(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),d=h(()=>o.value.aspect||v.value/m.value||0);z(()=>e.src,()=>{f(s.value!=="idle")}),z(d,(t,c)=>{!t&&c&&r.value&&S(r.value)}),K(()=>f());function f(t){if(!(e.eager&&t)&&!(W&&!t&&!e.eager)){if(s.value="loading",o.value.lazySrc){const c=new Image;c.src=o.value.lazySrc,S(c,null)}o.value.src&&Q(()=>{var c;i("loadstart",((c=r.value)==null?void 0:c.currentSrc)||o.value.src),setTimeout(()=>{var g;if((g=r.value)!=null&&g.complete){if(r.value.naturalWidth||R(),s.value==="error")return;d.value||S(r.value,null),s.value==="loading"&&y()}else d.value||S(r.value),P()})})}}function y(){var t;P(),S(r.value),s.value="loaded",i("load",((t=r.value)==null?void 0:t.currentSrc)||o.value.src)}function R(){var t;s.value="error",i("error",((t=r.value)==null?void 0:t.currentSrc)||o.value.src)}function P(){const t=r.value;t&&(u.value=t.currentSrc||t.src)}let V=-1;function S(t){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const g=()=>{clearTimeout(V);const{naturalHeight:j,naturalWidth:k}=t;j||k?(v.value=k,m.value=j):!t.complete&&s.value==="loading"&&c!=null?V=window.setTimeout(g,c):(t.currentSrc.endsWith(".svg")||t.currentSrc.startsWith("data:image/svg+xml"))&&(v.value=1,m.value=1)};g()}const w=h(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),D=()=>{var g;if(!o.value.src||s.value==="idle")return null;const t=a("img",{class:["v-img__img",w.value],style:{objectPosition:e.position},src:o.value.src,srcset:o.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:r,onLoad:y,onError:R},null),c=(g=n.sources)==null?void 0:g.call(n);return a(b,{transition:e.transition,appear:!0},{default:()=>[B(c?a("picture",{class:"v-img__picture"},[c,t]):t,[[ee,s.value==="loaded"]])]})},E=()=>a(b,{transition:e.transition},{default:()=>[o.value.lazySrc&&s.value!=="loaded"&&a("img",{class:["v-img__img","v-img__img--preload",w.value],style:{objectPosition:e.position},src:o.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),q=()=>n.placeholder?a(b,{transition:e.transition,appear:!0},{default:()=>[(s.value==="loading"||s.value==="error"&&!n.error)&&a("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,x=()=>n.error?a(b,{transition:e.transition,appear:!0},{default:()=>[s.value==="error"&&a("div",{class:"v-img__error"},[n.error()])]}):null,H=()=>e.gradient?a("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,T=_(!1);{const t=z(d,c=>{c&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{T.value=!0})}),t())})}return C(()=>{const t=N.filterProps(e);return B(a(N,F({class:["v-img",{"v-img--booting":!T.value},e.class],style:[{width:p(e.width==="auto"?v.value:e.width)},e.style]},t,{aspectRatio:d.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>a(Y,null,[a(D,null,null),a(E,null,null),a(H,null,null),a(q,null,null),a(x,null,null)]),default:n.default}),[[X("intersect"),{handler:f,options:e.options},null,{once:!0}]])}),{currentSrc:u,image:r,state:s,naturalWidth:v,naturalHeight:m}}});export{se as I,b as M,oe as V,ne as m};

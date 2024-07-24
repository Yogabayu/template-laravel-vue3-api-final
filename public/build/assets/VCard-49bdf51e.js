import{S as k,a6 as y,aj as O,Z as f,a as n,P as A,ap as u,aG as P,a0 as g,a8 as w,aV as H,a9 as W,bE as X,aq as Y,aW as Z,aa as $,bp as z,a7 as J,ab as K,aI as Q,aS as U,ah as ee,ae,b0 as te,b1 as ne,aX as de,af as ie,bF as se,ar as le,aY as ce,ag as re,bq as ue,l as I,au as oe,aN as ve,bG as me,b2 as be}from"./main-ad349705.js";import{c as p,V as h}from"./VAvatar-ad974123.js";import{V as ge}from"./VImg-99ea930d.js";const ke=k()({name:"VCardActions",props:y(),setup(e,i){let{slots:t}=i;return O({VBtn:{slim:!0,variant:"text"}}),f(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),ye=p("v-card-subtitle"),fe=p("v-card-title"),pe=A({appendAvatar:String,appendIcon:u,prependAvatar:String,prependIcon:u,subtitle:String,title:String,...y(),...P()},"VCardItem"),Ce=k()({name:"VCardItem",props:pe(),setup(e,i){let{slots:t}=i;return f(()=>{var l;const a=!!(e.prependAvatar||e.prependIcon),o=!!(a||t.prepend),s=!!(e.appendAvatar||e.appendIcon),v=!!(s||t.append),m=!!(e.title||t.title),b=!!(e.subtitle||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[o&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(g,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},t.prepend):a&&n(h,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),n("div",{class:"v-card-item__content"},[m&&n(fe,{key:"title"},{default:()=>{var d;return[((d=t.title)==null?void 0:d.call(t))??e.title]}}),b&&n(ye,{key:"subtitle"},{default:()=>{var d;return[((d=t.subtitle)==null?void 0:d.call(t))??e.subtitle]}}),(l=t.default)==null?void 0:l.call(t)]),v&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(g,{key:"append-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},t.append):s&&n(h,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),Ve=p("v-card-text"),Ie=A({appendAvatar:String,appendIcon:u,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:u,ripple:{type:[Boolean,Object],default:!0},subtitle:String,text:String,title:String,...w(),...y(),...P(),...H(),...W(),...X(),...Y(),...Z(),...$(),...z(),...J(),...K(),...Q({variant:"elevated"})},"VCard"),Se=k()({name:"VCard",directives:{Ripple:U},props:Ie(),setup(e,i){let{attrs:t,slots:a}=i;const{themeClasses:o}=ee(e),{borderClasses:s}=ae(e),{colorClasses:v,colorStyles:m,variantClasses:b}=te(e),{densityClasses:l}=ne(e),{dimensionStyles:d}=de(e),{elevationClasses:S}=ie(e),{loaderClasses:x}=se(e),{locationStyles:T}=le(e),{positionClasses:B}=ce(e),{roundedClasses:D}=re(e),c=ue(e,t),L=I(()=>e.link!==!1&&c.isLink.value),r=I(()=>!e.disabled&&e.link!==!1&&(e.link||c.isClickable.value));return f(()=>{const _=L.value?"a":e.tag,R=!!(a.title||e.title),E=!!(a.subtitle||e.subtitle),F=R||E,j=!!(a.append||e.appendAvatar||e.appendIcon),q=!!(a.prepend||e.prependAvatar||e.prependIcon),G=!!(a.image||e.image),M=F||q||j,N=!!(a.text||e.text);return oe(n(_,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":r.value},o.value,s.value,v.value,l.value,S.value,x.value,B.value,D.value,b.value,e.class],style:[m.value,d.value,T.value,e.style],href:c.href.value,onClick:r.value&&c.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var C;return[G&&n("div",{key:"image",class:"v-card__image"},[a.image?n(g,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(ge,{key:"image-img",cover:!0,src:e.image},null)]),n(me,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),M&&n(Ce,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),N&&n(Ve,{key:"text"},{default:()=>{var V;return[((V=a.text)==null?void 0:V.call(a))??e.text]}}),(C=a.default)==null?void 0:C.call(a),a.actions&&n(ke,null,{default:a.actions}),be(r.value,"v-card")]}}),[[ve("ripple"),r.value&&e.ripple]])}),{}}});export{Se as V,Ce as a,Ve as b,fe as c,ye as d,ke as e};

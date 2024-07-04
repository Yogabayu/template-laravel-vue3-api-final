import{c as h}from"./VGrid-f03bf357.js";import{N as L,av as D,a4 as z,aj as w,aH as F,a7 as M,aw as N,aI as R,a8 as j,a5 as E,a9 as O,aJ as H,S as J,W as K,k as o,af as W,aK as X,am as p,aL as q,ad as G,ax as Q,aM as U,ae as Y,X as Z,ab as ee,T as ae,a as t,aN as te,i as le,$ as d,V as ne,M as se}from"./main-2010a7ca.js";const oe=h("v-alert-title"),re=["success","info","warning","error"],ie=L({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:D,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>re.includes(e)},...z(),...w(),...F(),...M(),...N(),...R(),...j(),...E(),...O(),...H({variant:"flat"})},"VAlert"),de=J()({name:"VAlert",props:ie(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,v){let{emit:m,slots:a}=v;const r=K(e,"modelValue"),n=o(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),y=o(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:f}=W(e),{colorClasses:k,colorStyles:b,variantClasses:V}=X(y),{densityClasses:P}=p(e),{dimensionStyles:C}=q(e),{elevationClasses:g}=G(e),{locationStyles:x}=Q(e),{positionClasses:S}=U(e),{roundedClasses:_}=Y(e),{textColorClasses:T,textColorStyles:A}=Z(ee(e,"borderColor")),{t:B}=ae(),i=o(()=>({"aria-label":B(e.closeLabel),onClick(s){r.value=!1,m("click:close",s)}}));return()=>{const s=!!(a.prepend||n.value),I=!!(a.title||e.title),$=!!(a.close||e.closable);return r.value&&t(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},f.value,k.value,P.value,g.value,S.value,_.value,V.value,e.class],style:[b.value,C.value,x.value,e.style],role:"alert"},{default:()=>{var c,u;return[te(!1,"v-alert"),e.border&&t("div",{key:"border",class:["v-alert__border",T.value],style:A.value},null),s&&t("div",{key:"prepend",class:"v-alert__prepend"},[a.prepend?t(d,{key:"prepend-defaults",disabled:!n.value,defaults:{VIcon:{density:e.density,icon:n.value,size:e.prominent?44:28}}},a.prepend):t(le,{key:"prepend-icon",density:e.density,icon:n.value,size:e.prominent?44:28},null)]),t("div",{class:"v-alert__content"},[I&&t(oe,{key:"title"},{default:()=>{var l;return[((l=a.title)==null?void 0:l.call(a))??e.title]}}),((c=a.text)==null?void 0:c.call(a))??e.text,(u=a.default)==null?void 0:u.call(a)]),a.append&&t("div",{key:"append",class:"v-alert__append"},[a.append()]),$&&t("div",{key:"close",class:"v-alert__close"},[a.close?t(d,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var l;return[(l=a.close)==null?void 0:l.call(a,{props:i.value})]}}):t(ne,se({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},i.value),null)])]}})}}});export{de as V};

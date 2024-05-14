import{c as D}from"./index-7fea880e.js";import{L,aq as $,a3 as z,a4 as F,aB as R,a5 as E,ar as w,aC as O,a6 as j,a8 as q,aa as G,aD as H,Q as K,T as M,k as o,aE as N,aF as Q,ae as U,aG as Z,af as p,as as J,aH as W,ag as X,U as Y,ad as ee,R as ae,a as t,aI as te,i as le,Z as d,V as ne,K as se}from"./main-50364cd1.js";const oe=D("v-alert-title"),re=["success","info","warning","error"],ie=L({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:$,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>re.includes(e)},...z(),...F(),...R(),...E(),...w(),...O(),...j(),...q(),...G(),...H({variant:"flat"})},"VAlert"),de=K()({name:"VAlert",props:ie(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,v){let{emit:m,slots:a}=v;const r=M(e,"modelValue"),n=o(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),y=o(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:f}=N(e),{colorClasses:k,colorStyles:b,variantClasses:V}=Q(y),{densityClasses:P}=U(e),{dimensionStyles:C}=Z(e),{elevationClasses:g}=p(e),{locationStyles:x}=J(e),{positionClasses:S}=W(e),{roundedClasses:_}=X(e),{textColorClasses:B,textColorStyles:T}=Y(ee(e,"borderColor")),{t:A}=ae(),i=o(()=>({"aria-label":A(e.closeLabel),onClick(s){r.value=!1,m("click:close",s)}}));return()=>{const s=!!(a.prepend||n.value),I=!!(a.title||e.title),h=!!(a.close||e.closable);return r.value&&t(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},f.value,k.value,P.value,g.value,S.value,_.value,V.value,e.class],style:[b.value,C.value,x.value,e.style],role:"alert"},{default:()=>{var c,u;return[te(!1,"v-alert"),e.border&&t("div",{key:"border",class:["v-alert__border",B.value],style:T.value},null),s&&t("div",{key:"prepend",class:"v-alert__prepend"},[a.prepend?t(d,{key:"prepend-defaults",disabled:!n.value,defaults:{VIcon:{density:e.density,icon:n.value,size:e.prominent?44:28}}},a.prepend):t(le,{key:"prepend-icon",density:e.density,icon:n.value,size:e.prominent?44:28},null)]),t("div",{class:"v-alert__content"},[I&&t(oe,{key:"title"},{default:()=>{var l;return[((l=a.title)==null?void 0:l.call(a))??e.title]}}),((c=a.text)==null?void 0:c.call(a))??e.text,(u=a.default)==null?void 0:u.call(a)]),a.append&&t("div",{key:"append",class:"v-alert__append"},[a.append()]),h&&t("div",{key:"close",class:"v-alert__close"},[a.close?t(d,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var l;return[(l=a.close)==null?void 0:l.call(a,{props:i.value})]}}):t(ne,se({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},i.value),null)])]}})}}});export{de as V};

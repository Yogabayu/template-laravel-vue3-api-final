import{_ as W,L as A,a as j,V,b as k,c as E}from"./VBadge-cd477bc3.js";import{o as l,h as i,r as b,w as a,a as t,e as v,t as G,i as d,L as H,a1 as J,a2 as K,a3 as O,a4 as F,a5 as M,a6 as Q,a7 as X,a8 as Y,a9 as q,Q as Z,j as L,aa as ee,ab as te,ac as u,ad as ae,ae as oe,af as se,k as c,ag as ne,ah as re,ai as le,X as ie,aj as S,ak as ue,n as ce,al as de,u as p,b as y,f as B,V as x,l as me,H as _e,I as fe}from"./main-a89262b3.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";import{V as C}from"./index-68ed0472.js";import{V as I}from"./VImg-c01b2120.js";import{V as ve,a as he,b as g,c as w}from"./VMenu-6b5ae49c.js";import{V as pe}from"./VListItemAction-d6fbb9fa.js";import{V as D,u as ge}from"./VDivider-d34c26b9.js";import{V as be}from"./VSpacer-9874554f.js";import"./arthaya-5f3e6501.js";import"./index-1bdc1399.js";import"./VTooltip-cfdf4a83.js";import"./VOverlay-ce607799.js";import"./dialog-transition-8a67a77e.js";const ye={__name:"NavbarThemeSwitcher",setup(e){const o=[{name:"light",icon:"bx-sun"},{name:"dark",icon:"bx-moon"}];return(n,r)=>{const s=W;return l(),i(s,{themes:o})}}},Ve={components:{LogoutBtn:A},data(){return{avatar1:j,userData:null,photoURL:"https://bankarthaya.com/wp-content/uploads/2023/07/arthayann.png"}},methods:{getUserData(){const e=localStorage.getItem("userData");e&&(this.userData=JSON.parse(e))}},mounted(){this.getUserData()}};function ke(e,o,n,r,s,m){const _=b("LogoutBtn");return l(),i(V,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success",bordered:""},{default:a(()=>[t(C,{class:"cursor-pointer",color:"primary",variant:"tonal"},{default:a(()=>[t(I,{src:s.photoURL},null,8,["src"]),t(ve,{activator:"parent",width:"230",location:"bottom end",offset:"14px"},{default:a(()=>[t(he,null,{default:a(()=>[t(g,null,{prepend:a(()=>[t(pe,{start:""},{default:a(()=>[t(V,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success"},{default:a(()=>[t(C,{color:"primary",variant:"tonal"},{default:a(()=>[t(I,{src:s.photoURL},null,8,["src"])]),_:1})]),_:1})]),_:1})]),default:a(()=>[t(w,{class:"font-weight-semibold"},{default:a(()=>[v(G(this.userData.name),1)]),_:1})]),_:1}),t(D,{class:"my-2"}),t(g,{to:"/u-profile"},{prepend:a(()=>[t(d,{class:"me-2",icon:"bx-user",size:"22"})]),default:a(()=>[t(w,null,{default:a(()=>[v("Profile")]),_:1})]),_:1}),t(D,{class:"my-2"}),t(g,{to:"/login"},{prepend:a(()=>[t(d,{class:"me-2",icon:"bx-log-out",size:"22"})]),default:a(()=>[t(_)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Se=N(Ve,[["render",ke]]);const Be=H({bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...J(),...K(),...O(),...F(),...M(),...Q({name:"bottom-navigation"}),...X({tag:"header"}),...Y({modelValue:!0,selectedClass:"v-btn--selected"}),...q()},"VBottomNavigation"),xe=Z()({name:"VBottomNavigation",props:Be(),emits:{"update:modelValue":e=>!0},setup(e,o){let{slots:n}=o;const{themeClasses:r}=L(),{borderClasses:s}=ee(e),{backgroundColorClasses:m,backgroundColorStyles:_}=te(u(e,"bgColor")),{densityClasses:$}=ae(e),{elevationClasses:R}=oe(e),{roundedClasses:T}=se(e),{ssrBootStyles:U}=ge(),h=c(()=>Number(e.height)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0)),f=u(e,"active"),{layoutItemStyles:z}=ne({id:e.name,order:c(()=>parseInt(e.order,10)),position:c(()=>"bottom"),layoutSize:c(()=>f.value?h.value:0),elementSize:h,active:f,absolute:u(e,"absolute")});return re(e,ue),le({VBtn:{color:u(e,"color"),density:u(e,"density"),stacked:c(()=>e.mode!=="horizontal"),variant:"text"}},{scoped:!0}),ie(()=>t(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":f.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":e.mode==="shift"},r.value,m.value,s.value,$.value,R.value,T.value,e.class],style:[_.value,z.value,{height:S(h.value),transform:`translateY(${S(f.value?0:100,"%")})`},U.value,e.style]},{default:()=>[n.default&&t("div",{class:"v-bottom-navigation__content"},[n.default()])]})),{}}}),P=e=>(_e("data-v-e186d95e"),e=e(),fe(),e),Ce={class:"d-flex h-100 align-center"},Ie=P(()=>y("span",null,"Home",-1)),we=P(()=>y("span",null,"Kredit",-1)),De={__name:"DefaultLayoutWithVerticalNav",setup(e){L();const o=ce(!1);return typeof window<"u"&&(o.value=window.innerWidth<=600),JSON.parse(localStorage.getItem("userData")),(n,r)=>{const s=b("IconBtn");return l(),i(E,null,de({navbar:a(({toggleVerticalOverlayNavActive:m})=>[y("div",Ce,[p(o)?B("",!0):(l(),i(s,{key:0,class:"ms-n3 d-lg-none",onClick:_=>m(!0)},{default:a(()=>[t(d,{icon:"bx-menu"})]),_:2},1032,["onClick"])),t(be),t(ye,{class:"me-2"}),t(Se)])]),footer:a(()=>[p(o)?(l(),i(xe,{key:0,elevation:0,mode:"shift"},{default:a(()=>[t(x,{value:"home",to:"/user-dashboard"},{default:a(()=>[t(d,null,{default:a(()=>[v("mdi-home")]),_:1}),Ie]),_:1}),t(x,{value:"kredit",to:"/u-credit"},{default:a(()=>[t(d,null,{default:a(()=>[v("mdi-file")]),_:1}),we]),_:1})]),_:1})):B("",!0)]),default:a(()=>[me(n.$slots,"default",{},void 0,!0)]),_:2},[p(o)?void 0:{name:"vertical-nav-content",fn:a(()=>[t(k,{item:{title:"Dashboard",icon:"bx-home",to:"/user-dashboard"}}),t(k,{item:{title:"Kredit",icon:"bx-file",to:"/u-credit"}})]),key:"0"}]),1024)}}},Le=N(De,[["__scopeId","data-v-e186d95e"]]);const Ke={__name:"default",setup(e){return(o,n)=>{const r=b("RouterView");return l(),i(Le,null,{default:a(()=>[t(r)]),_:1})}}};export{Ke as default};

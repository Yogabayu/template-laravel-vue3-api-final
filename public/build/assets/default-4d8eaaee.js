import{_ as D,L,a as $,V as f,b as a,c as p,d as B}from"./VBadge-a881b0d2.js";import{_,o as r,c as k,b as v,t as V,i as l,r as u,w as e,a as t,f as w,j as y,k as I,l as N,m as S}from"./main-759cb87b.js";import{V as h}from"./VAvatar-a86fd93f.js";import{V as g}from"./VImg-257b2f41.js";import{V as U,a as K,b,c as R,d as x}from"./VMenu-5cea52e6.js";import{V as T}from"./VListItemAction-f5576106.js";import{V as C}from"./VSpacer-3e0b024d.js";import"./arthaya-5f3e6501.js";import"./index-c7f1958b.js";import"./VTooltip-d4792dab.js";import"./forwardRefs-8348545e.js";import"./axios-379d51f3.js";import"./index-b36c4722.js";import"./dialog-transition-9f9f470a.js";const F="/build/assets/upgrade-banner-dark-f34f6a24.png",W="/build/assets/upgrade-banner-light-68cf2382.png",j={},A={class:"h-100 d-flex align-center justify-space-between"},J={class:"d-flex align-center"};function M(o,s){return r(),k("div",A,[v("span",J," © "+V(new Date().getFullYear())+" | v1 ",1)])}const P=_(j,[["render",M]]),z={__name:"NavbarThemeSwitcher",setup(o){const s=[{name:"light",icon:"bx-sun"},{name:"dark",icon:"bx-moon"}];return(i,c)=>{const n=D;return r(),l(n,{themes:s})}}},E={components:{LogoutBtn:L},data(){return{avatar1:$,userData:null,photoURL:"https://bankarthaya.com/wp-content/uploads/2023/07/arthayann.png"}},methods:{getUserData(){const o=localStorage.getItem("userData");o&&(this.userData=JSON.parse(o))}},mounted(){this.getUserData()}};function O(o,s,i,c,n,m){const d=u("LogoutBtn");return r(),l(f,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success",bordered:""},{default:e(()=>[t(h,{class:"cursor-pointer",color:"primary",variant:"tonal"},{default:e(()=>[t(g,{src:n.photoURL},null,8,["src"]),t(U,{activator:"parent",width:"230",location:"bottom end",offset:"14px"},{default:e(()=>[t(K,null,{default:e(()=>[t(b,null,{prepend:e(()=>[t(T,{start:""},{default:e(()=>[t(f,{dot:"",location:"bottom right","offset-x":"3","offset-y":"3",color:"success"},{default:e(()=>[t(h,{color:"primary",variant:"tonal"},{default:e(()=>[t(g,{src:n.photoURL},null,8,["src"])]),_:1})]),_:1})]),_:1})]),default:e(()=>[t(R,{class:"font-weight-semibold"},{default:e(()=>[w(V(this.userData.name),1)]),_:1})]),_:1}),t(x,{class:"my-2"}),t(x,{class:"my-2"}),t(b,{to:"/login"},{prepend:e(()=>[t(y,{class:"me-2",icon:"bx-log-out",size:"22"})]),default:e(()=>[t(d)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Y=_(E,[["render",O]]);const q={class:"d-flex h-100 align-center"},G={__name:"DefaultLayoutWithVerticalNav",setup(o){const s=I();return N(()=>s.global.name.value==="light"?W:F),(i,c)=>{const n=u("IconBtn");return r(),l(B,null,{navbar:e(({toggleVerticalOverlayNavActive:m})=>[v("div",q,[t(n,{class:"ms-n3 d-lg-none",onClick:d=>m(!0)},{default:e(()=>[t(y,{icon:"bx-menu"})]),_:2},1032,["onClick"]),t(C),t(z,{class:"me-2"}),t(Y)])]),"vertical-nav-content":e(()=>[t(a,{item:{title:"Dashboard",icon:"bx-home",to:"/dashboard"}}),t(p,{item:{heading:"Konfigurasi Dasar"}}),t(a,{item:{title:"Kantor",icon:"bx-building",to:"/office"}}),t(a,{item:{title:"Permission",icon:"bx-shield",to:"/permission"}}),t(a,{item:{title:"Jabatan",icon:"bx-area",to:"/position"}}),t(a,{item:{title:"User",icon:"bx-user",to:"/users"}}),t(a,{item:{title:"Konfigurasi Fase Kredit",icon:"bx-bell",to:"/notifconf"}}),t(a,{item:{title:"Riwayat User",icon:"bx-user",to:"/a-history"}}),t(p,{item:{heading:"Data Kredit"}}),t(a,{item:{title:"Data Master",icon:"bx-file-blank",to:"/data-master"}}),t(a,{item:{title:"Data Kredit per Bulan",icon:"bx-file",to:"/a-perkantor"}})]),footer:e(()=>[t(P)]),default:e(()=>[S(i.$slots,"default",{},void 0,!0)]),_:3})}}},H=_(G,[["__scopeId","data-v-96e1c573"]]);const ut={__name:"default",setup(o){return(s,i)=>{const c=u("RouterView");return r(),l(H,null,{default:e(()=>[t(c)]),_:1})}}};export{ut as default};

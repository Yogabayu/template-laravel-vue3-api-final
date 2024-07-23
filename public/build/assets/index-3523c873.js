import{m as C}from"./axios-379d51f3.js";import{n as K,P as $,a8 as U,a9 as I,W as R,a1 as E,a,aa as F,ab as L,ac as O,ad as z,ae as M,af as W,ag as Y,ah as q,ai as G,aj as J,ak as Q,Y as X,l as S,al as Z,a3 as v,am as m,_ as ee,r as ae,o as b,c as te,w as s,N as le,b as i,H as se,V as oe,F as ie,f as r,i as w,O as ne,j as re,e as de,t as ue}from"./main-e13e01ef.js";import{V as B,a as me,c as ce}from"./VCard-dde46117.js";import{V as fe}from"./VDialog-6c37b39c.js";import{V as N}from"./VTextField-5b21d569.js";import{V as P}from"./VChip-9a4dd6d5.js";import{V as ge}from"./VTooltip-352daf0f.js";import{V as he}from"./index-8bd69fed.js";import{V as ve}from"./VImg-d2b3115e.js";import{V as be}from"./VSpacer-ea7e0c2d.js";import"./VAvatar-e75a1c1b.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-fdf1565f.js";import"./VInput-50502c2b.js";const Ve=K({data(){return{overlay:!1,items:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"NIK",value:"nik",sortable:!0},{text:"E-mail",value:"email",sortable:!0},{text:"Status",value:"isActive",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",isDetail:!1,itemDetails:[],itemSearchDetails:"",headerDetails:[{text:"activity",value:"activity",sortable:!0},{text:"tanggal",value:"created_at",sortable:!0}]}},methods:{formatDate(e){return new Date(e).toLocaleString("id-ID")},async getAllUsers(){try{const e=await C.get("/user");e.status===200?this.items=e.data.data:this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},openModal(e,l=null){e===1&&this.getDetailHistories(l.id)},async getDetailHistories(e){try{const l=await C.get(`/history/${e}`);l.status===200?(this.itemDetails=l.data.data,this.isDetail=!0):this.$showToast("error","Sorry",l.data.data.message)}catch(l){console.log(l)}}},mounted(){this.getAllUsers()}});const ye=$({text:String,...U(),...I()},"VToolbarTitle"),H=R()({name:"VToolbarTitle",props:ye(),setup(e,l){let{slots:t}=l;return E(()=>{const d=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var n;return[d&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(n=t.default)==null?void 0:n.call(t)])]}})}),{}}}),pe=[null,"prominent","default","comfortable","compact"],_e=$({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>pe.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...F(),...U(),...L(),...O(),...I({tag:"header"}),...z()},"VToolbar"),De=R()({name:"VToolbar",props:_e(),setup(e,l){var p;let{slots:t}=l;const{backgroundColorClasses:d,backgroundColorStyles:n}=M(W(e,"color")),{borderClasses:V}=Y(e),{elevationClasses:u}=q(e),{roundedClasses:o}=G(e),{themeClasses:c}=J(e),{rtlClasses:y}=Q(),f=X(!!(e.extended||(p=t.extension)!=null&&p.call(t))),g=S(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),h=S(()=>f.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return Z({VBtn:{variant:"text"}}),E(()=>{var D;const A=!!(e.title||t.title),j=!!(t.image||e.image),_=(D=t.extension)==null?void 0:D.call(t);return f.value=!!(e.extended||_),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},d.value,V.value,u.value,o.value,c.value,y.value,e.class],style:[n.value,e.style]},{default:()=>[j&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(v,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(ve,{key:"image-img",cover:!0,src:e.image},null)]),a(v,{defaults:{VTabs:{height:m(g.value)}}},{default:()=>{var x,T,k;return[a("div",{class:"v-toolbar__content",style:{height:m(g.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(x=t.prepend)==null?void 0:x.call(t)]),A&&a(H,{key:"title",text:e.title},{text:t.title}),(T=t.default)==null?void 0:T.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(k=t.append)==null?void 0:k.call(t)])])]}}),a(v,{defaults:{VTabs:{height:m(h.value)}}},{default:()=>[a(he,null,{default:()=>[f.value&&a("div",{class:"v-toolbar__extension",style:{height:m(h.value)}},[_])]})]})]})}),{contentHeight:g,extensionHeight:h}}}),xe=i("br",null,null,-1),Te=i("span",{class:"font-weight-bold text-lg"},"Loading....",-1),ke={class:"d-flex justify-end mb-6"},Ce={class:"d-flex align-center pe-2 w-25"},Se=i("p",null,"Data Kantor Kosong",-1),we=i("p",null,"loading data .....",-1),Be={class:"operation-wrapper"},Ne={class:"d-flex justify-space-between"},Pe=["onClick"],$e={class:"d-flex justify-end mb-6"},Ue={class:"d-flex align-center pe-2 w-25"},Ie=i("p",null,"Data Kantor Kosong",-1),Re=i("p",null,"loading data .....",-1);function Ee(e,l,t,d,n,V){const u=ae("EasyDataTable");return b(),te(se,null,[a(le,{absolute:!0,modelValue:e.overlay,"onUpdate:modelValue":l[0]||(l[0]=o=>e.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:s(()=>[a(oe,null,{default:s(()=>[a(ie,{color:"primary",size:"32",indeterminate:""}),xe,Te]),_:1})]),_:1},8,["modelValue"]),i("div",null,[a(B,{class:"auth-card pa-4 pt-5"},{default:s(()=>[a(me,{class:"align-left"},{default:s(()=>[a(ce,{class:"text-2xl font-weight-bold"},{default:s(()=>[r(" Pilih User ")]),_:1})]),_:1}),i("div",ke,[i("div",Ce,[a(N,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:e.searchValue,"onUpdate:modelValue":l[1]||(l[1]=o=>e.searchValue=o)},null,8,["modelValue"])])]),a(u,{"show-index":"",headers:e.headers,items:e.items,"search-value":e.searchValue},{"empty-message":s(()=>[Se]),loading:s(()=>[we]),"item-isActive":s(o=>[parseInt(o.isActive)==1?(b(),w(P,{key:0,color:"success"},{default:s(()=>[r("Active")]),_:1})):(b(),w(P,{key:1,color:"error"},{default:s(()=>[r("Non-Active")]),_:1}))]),"item-operation":s(o=>[i("div",Be,[i("div",Ne,[a(ge,{location:"top",text:"Detail Riwayat User"},{activator:s(({props:c})=>[i("button",ne(c,{onClick:y=>e.openModal(1,o)}),[a(re,{size:"20",icon:"bx-bx-detail",color:"info"})],16,Pe)]),_:2},1024)])])]),_:1},8,["headers","items","search-value"])]),_:1})]),a(fe,{modelValue:e.isDetail,"onUpdate:modelValue":l[4]||(l[4]=o=>e.isDetail=o),transition:"dialog-bottom-transition",fullscreen:""},{default:s(()=>[a(B,null,{default:s(()=>[a(De,null,{default:s(()=>[a(de,{icon:"mdi-close",onClick:l[2]||(l[2]=o=>(e.isDetail=!1,e.itemSearchDetails="",e.itemDetails=[]))}),a(H,null,{default:s(()=>[r("Riwayat User")]),_:1}),a(be)]),_:1}),i("div",$e,[i("div",Ue,[a(N,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:e.itemSearchDetails,"onUpdate:modelValue":l[3]||(l[3]=o=>e.itemSearchDetails=o)},null,8,["modelValue"])])]),a(u,{"show-index":"",headers:e.headerDetails,items:e.itemDetails,"search-value":e.itemSearchDetails},{"empty-message":s(()=>[Ie]),loading:s(()=>[Re]),"item-created_at":s(o=>[r(ue(e.formatDate(o.created_at)),1)]),_:1},8,["headers","items","search-value"])]),_:1})]),_:1},8,["modelValue"])],64)}const Qe=ee(Ve,[["render",Ee]]);export{Qe as default};

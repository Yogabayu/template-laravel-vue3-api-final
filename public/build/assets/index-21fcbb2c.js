import{m}from"./axios-379d51f3.js";import{_ as V,r as g,o as _,c as b,a,w as s,N as F,b as r,H as y,V as n,F as P,f as u,d as x,e as v,j as w}from"./main-759cb87b.js";import{V as p,a as T,c as S}from"./VCard-52223027.js";import{V as C}from"./VSpacer-3e0b024d.js";import{V as f}from"./VTextField-06e2cde8.js";import{V as D}from"./VDialog-8e0db9e1.js";import{V as N}from"./VForm-bcf32498.js";import{V as I}from"./VRow-7c3bab50.js";import{V as h}from"./VAutocomplete-28733f01.js";import{V as U}from"./VSelect-c0a0589e.js";import"./VAvatar-a86fd93f.js";import"./VImg-257b2f41.js";import"./VInput-e8b396b8.js";import"./index-b36c4722.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-9f9f470a.js";import"./VMenu-5cea52e6.js";import"./VChip-28e03063.js";const M={data(){return{rules:{required:t=>!!t||"Required"},dataForm:{id:null,office_id:null,position_id:null,phase:null,minPlafon:null,maxPlafon:null},items:[],offices:[],positions:[],headers:[{text:"Nama Kantor",value:"name",sortable:!0},{text:"Total Pengaturan",value:"notification_configurations_count",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1,overlay:!1}},methods:{toDetail(t){this.$router.push(`/notifconf/${t.id}`)},formatInput(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},async insertData(){try{for(let i in this.dataForm)i!=="id"&&this.dataForm[i]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${i} harus diisi.`));const t=new FormData;t.append("office_id",this.dataForm.office_id),t.append("position_id",this.dataForm.position_id),t.append("phase",this.dataForm.phase),t.append("minPlafon",this.dataForm.minPlafon.replace(/\D/g,"")),t.append("maxPlafon",this.dataForm.maxPlafon.replace(/\D/g,"")),t.append("_method","POST");const e=await m.post("/notifconf",t);e.status===200?(this.closeModal(1),this.getAllNotifConf(),this.$showToast("success","Success",e.data.message)):(this.getAllNotifConf(),this.$showToast("error","Sorry",e.data.message))}catch(t){this.getAllNotifConf(),this.$showToast("error","Sorry",t.response.data.message)}},closeModal(t){t===1?(this.resetForm(),this.insert=!1):t===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,office_id:null,position_id:null,phase:null,minPlafon:null,maxPlafon:null}},openModal(t,e=null){t===1?(this.getOffices(),this.getPositions(),this.insert=!0):t===2&&e&&(this.getOffices(),this.getPositions(),this.dataForm.id=e.id,this.dataForm.offices=e.offices.map(i=>({value:i.id,title:i.name})),this.dataForm.positions=e.positions.map(i=>({value:i.id,title:i.name})),this.dataForm.phase=e.phase,this.dataForm.minPlafon=e.minPlafon,this.dataForm.maxPlafon=e.maxPlafon,this.edit=!0)},async getAllNotifConf(){try{const t=await m.get("/notifconf");t.status===200?this.items=t.data.data:this.$showToast("error","Sorry",t.data.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},async getOffices(){try{const t=await m.get("/office");t.status===200?this.offices=t.data.data.map(e=>({value:e.id,title:e.code+" - "+e.name})):this.$showToast("error","Sorry","error get data office")}catch{this.$showToast("error","Sorry","error get data office")}},async getPositions(){try{const t=await m.get("/position");t.status===200?this.positions=t.data.data.map(e=>({value:e.id,title:e.name})):this.$showToast("error","Sorry","error get data positions")}catch{this.$showToast("error","Sorry","error get data positions")}}},mounted(){this.getAllNotifConf()}},K=r("br",null,null,-1),k=r("span",{class:"font-weight-bold text-lg"},"Loading....",-1),A={class:"d-flex justify-space-between mb-6"},B={class:"d-flex align-center pe-2 w-25"},O=r("p",null,"Data Kantor Kosong",-1),j=r("p",null,"loading data .....",-1),E={class:"operation-wrapper"};function R(t,e,i,q,o,d){const c=g("EasyDataTable");return _(),b(y,null,[a(F,{absolute:!0,modelValue:o.overlay,"onUpdate:modelValue":e[0]||(e[0]=l=>o.overlay=l),contained:"",persistent:"",class:"align-center justify-center"},{default:s(()=>[a(n,null,{default:s(()=>[a(P,{color:"primary",size:"32",indeterminate:""}),K,k]),_:1})]),_:1},8,["modelValue"]),r("div",null,[a(p,{class:"auth-card pa-4 pt-5 my-2"},{default:s(()=>[a(T,{class:"align-left"},{default:s(()=>[a(S,{class:"text-2xl font-weight-bold"},{default:s(()=>[u(" Konfigurasi Fase Kredit ")]),_:1})]),_:1}),r("div",A,[a(C),r("div",B,[a(f,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":e[1]||(e[1]=l=>o.searchValue=l)},null,8,["modelValue"])])]),a(D,{modelValue:o.insert,"onUpdate:modelValue":e[8]||(e[8]=l=>o.insert=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[a(p,null,{title:s(()=>[u(" Tambah Data ")]),text:s(()=>[a(N,{onSubmit:x(d.insertData,["prevent"])},{default:s(()=>[a(I,null,{default:s(()=>[a(n,{cols:"12",md:"12"},{default:s(()=>[a(h,{modelValue:o.dataForm.office_id,"onUpdate:modelValue":e[2]||(e[2]=l=>o.dataForm.office_id=l),items:o.offices,hint:"Pilih Kantor",label:"Kantor",clearable:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),a(n,{cols:"12",md:"12"},{default:s(()=>[a(h,{modelValue:o.dataForm.position_id,"onUpdate:modelValue":e[3]||(e[3]=l=>o.dataForm.position_id=l),items:o.positions,hint:"Pilih Jabatan",label:"Jabatan",clearable:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),a(n,{md:"12",cols:"12"},{default:s(()=>[a(U,{label:"Pilih Phase",items:[{value:1,title:"Phase 1"},{value:2,title:"Phase 2"},{value:3,title:"Phase 3"},{value:4,title:"Phase 4"}],modelValue:o.dataForm.phase,"onUpdate:modelValue":e[4]||(e[4]=l=>o.dataForm.phase=l),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(n,{md:"6",cols:"12"},{default:s(()=>[a(f,{label:"Minimal Plafon",modelValue:o.dataForm.minPlafon,"onUpdate:modelValue":e[5]||(e[5]=l=>o.dataForm.minPlafon=l),type:"text",onInput:d.formatInput,autofocus:"","prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),a(n,{md:"6",cols:"12"},{default:s(()=>[a(f,{label:"Maximal Plafon",modelValue:o.dataForm.maxPlafon,"onUpdate:modelValue":e[6]||(e[6]=l=>o.dataForm.maxPlafon=l),type:"text",onInput:d.formatInput,autofocus:"","prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),a(n,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[a(v,{type:"submit"},{default:s(()=>[u("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[7]||(e[7]=l=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),a(c,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":s(()=>[O]),loading:s(()=>[j]),"item-operation":s(l=>[r("div",E,[r("button",null,[a(w,{size:"20",icon:"bx-file-find",color:"blue",onClick:z=>d.toDetail(l)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])],64)}const ne=V(M,[["render",R]]);export{ne as default};

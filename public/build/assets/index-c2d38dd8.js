import{m as c}from"./index-72ac3f44.js";import{r as k,o as x,c as y,a as s,w as l,e as u,b as i,V as p,d as f,t as h,i as V}from"./main-8bd1049b.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";import{V as A,a as S,e as D,c as b,d as r}from"./VRow-504d0cd6.js";import{a as P,V as F}from"./VTextField-d130428f.js";import{V as v}from"./VDialog-e4eb482c.js";import{V as n}from"./VSelect-bb1e7a6f.js";import"./VGrid-0079e0c5.js";import"./VImg-5f702e6e.js";import"./VOverlay-8488d677.js";import"./dialog-transition-4788892b.js";import"./VMenu-127de488.js";import"./VDivider-2058d2f9.js";import"./VCheckboxBtn-fbcdc272.js";import"./VChip-78202466.js";const _={data(){return{rules:{required:t=>!!t||"Required"},dataForm:{id:null,name:"",isPhase1Access:1,isPhase2Access:0,isPhase3Access:0,isPhase4Access:0},items:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Akses Phase 1",value:"isPhase1Access",sortable:!0},{text:"Akses Phase 2",value:"isPhase2Access",sortable:!0},{text:"Akses Phase 3",value:"isPhase3Access",sortable:!0},{text:"Akses Phase 4",value:"isPhase4Access",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1}},methods:{async deleteRole(t){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const d=await c.delete(`/role/${t.id}`);d.status===200?(this.getAllRole(),this.$showToast("success","Berhasil",d.data.message)):this.$showToast("error","Sorry",d.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},async updateData(){try{const t=new FormData;t.append("name",this.dataForm.name),t.append("isPhase1Access",this.dataForm.isPhase1Access),t.append("isPhase2Access",this.dataForm.isPhase2Access),t.append("isPhase3Access",this.dataForm.isPhase3Access),t.append("isPhase4Access",this.dataForm.isPhase4Access),t.append("_method","PUT");const e=await c.post(`/role/${this.dataForm.id}`,t);e.status===200?(this.closeModal(2),this.getAllRole(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},async insertData(){try{for(let d in this.dataForm)d!=="id"&&this.dataForm[d]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${d} harus diisi.`));const t=new FormData;t.append("name",this.dataForm.name),t.append("isPhase1Access",this.dataForm.isPhase1Access),t.append("isPhase2Access",this.dataForm.isPhase2Access),t.append("isPhase3Access",this.dataForm.isPhase3Access),t.append("isPhase4Access",this.dataForm.isPhase4Access),t.append("_method","POST");const e=await c.post("/role",t);e.status===200?(this.closeModal(1),this.getAllRole(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},closeModal(t){t===1?(this.resetForm(),this.insert=!1):t===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",isPhase1Access:1,isPhase2Access:0,isPhase3Access:0,isPhase4Access:0}},openModal(t,e=null){t===1?this.insert=!0:t===2&&e&&(this.dataForm.id=e.id,this.dataForm.name=e.name,this.dataForm.isPhase1Access=e.isPhase1Access,this.dataForm.isPhase2Access=e.isPhase2Access,this.dataForm.isPhase3Access=e.isPhase3Access,this.dataForm.isPhase4Access=e.isPhase4Access,this.edit=!0)},async getAllRole(){try{const t=await c.get("/role");t.status===200?this.items=t.data.data:this.$showToast("error","Sorry",t.data.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}}},mounted(){this.getAllRole()}},U={class:"d-flex justify-space-between mb-6"},R={class:"d-flex align-center pe-2 w-25"},C=i("p",null,"Data Kantor Kosong",-1),M=i("p",null,"loading data .....",-1),Y={class:"operation-wrapper"};function B(t,e,d,N,o,m){const g=k("EasyDataTable");return x(),y("div",null,[s(A,{class:"auth-card pa-4 pt-5"},{default:l(()=>[s(S,{class:"align-left"},{default:l(()=>[s(D,{class:"text-2xl font-weight-bold"},{default:l(()=>[u(" Daftar Permission ")]),_:1})]),_:1}),i("div",U,[s(p,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[0]||(e[0]=a=>m.openModal(1))},{default:l(()=>[u(" Tambah Data ")]),_:1}),i("div",R,[s(P,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":e[1]||(e[1]=a=>o.searchValue=a)},null,8,["modelValue"])])]),s(v,{modelValue:o.insert,"onUpdate:modelValue":e[8]||(e[8]=a=>o.insert=a),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:l(()=>[s(A,null,{title:l(()=>[u(" Tambah Data ")]),text:l(()=>[s(F,{onSubmit:f(m.insertData,["prevent"])},{default:l(()=>[s(b,null,{default:l(()=>[s(r,{md:"12",cols:"12"},{default:l(()=>[s(P,{placeholder:"Nama Role",label:"Role",modelValue:o.dataForm.name,"onUpdate:modelValue":e[2]||(e[2]=a=>o.dataForm.name=a),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-shield"},null,8,["modelValue","rules"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 1?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase1Access,"onUpdate:modelValue":e[3]||(e[3]=a=>o.dataForm.isPhase1Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 2?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase2Access,"onUpdate:modelValue":e[4]||(e[4]=a=>o.dataForm.isPhase2Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 3?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase3Access,"onUpdate:modelValue":e[5]||(e[5]=a=>o.dataForm.isPhase3Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 4?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase4Access,"onUpdate:modelValue":e[6]||(e[6]=a=>o.dataForm.isPhase4Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[s(p,{type:"submit"},{default:l(()=>[u("Simpan")]),_:1}),i("button",{type:"button",class:"btn btn-blue",onClick:e[7]||(e[7]=a=>m.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),s(v,{modelValue:o.edit,"onUpdate:modelValue":e[15]||(e[15]=a=>o.edit=a),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:l(()=>[s(A,null,{title:l(()=>[u(" Update Data Role ")]),text:l(()=>[s(F,{onSubmit:f(m.updateData,["prevent"])},{default:l(()=>[s(b,null,{default:l(()=>[s(r,{md:"12",cols:"12"},{default:l(()=>[s(P,{placeholder:"Nama Role",label:"Role",modelValue:o.dataForm.name,"onUpdate:modelValue":e[9]||(e[9]=a=>o.dataForm.name=a),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-shield"},null,8,["modelValue","rules"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 1?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase1Access,"onUpdate:modelValue":e[10]||(e[10]=a=>o.dataForm.isPhase1Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 2?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase2Access,"onUpdate:modelValue":e[11]||(e[11]=a=>o.dataForm.isPhase2Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 3?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase3Access,"onUpdate:modelValue":e[12]||(e[12]=a=>o.dataForm.isPhase3Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{md:"12",cols:"12"},{default:l(()=>[s(n,{label:"Akses Phase 4?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase4Access,"onUpdate:modelValue":e[13]||(e[13]=a=>o.dataForm.isPhase4Access=a),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),s(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[s(p,{type:"submit"},{default:l(()=>[u("Simpan")]),_:1}),i("button",{type:"button",class:"btn btn-blue",onClick:e[14]||(e[14]=a=>m.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),s(g,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":l(()=>[C]),loading:l(()=>[M]),"item-isPhase1Access":l(a=>[i("p",null,h(a.isPhase1Access==1?"✓":"x"),1)]),"item-isPhase2Access":l(a=>[i("p",null,h(a.isPhase2Access==1?"✓":"x"),1)]),"item-isPhase3Access":l(a=>[i("p",null,h(a.isPhase3Access==1?"✓":"x"),1)]),"item-isPhase4Access":l(a=>[i("p",null,h(a.isPhase4Access==1?"✓":"x"),1)]),"item-operation":l(a=>[i("div",Y,[i("button",null,[s(V,{size:"20",icon:"bx-edit",color:"blue",onClick:w=>m.openModal(2,a)},null,8,["onClick"])]),u("   "),i("button",null,[s(V,{size:"20",icon:"bx-trash",color:"red",onClick:w=>m.deleteRole(a)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const $=T(_,[["render",B]]);export{$ as default};

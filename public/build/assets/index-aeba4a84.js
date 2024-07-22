import{m as h}from"./VAvatar-5f945262.js";import{_ as D,r as g,o as x,c as T,a,w as t,f as u,b as r,e as p,d as P,V as i,t as c,j as V}from"./main-18b336f5.js";import{V as A,a as y,c as S}from"./VCard-a3682b65.js";import{V as f}from"./VTextField-460c393a.js";import{V as b}from"./VDialog-07537e96.js";import{V as F}from"./VForm-8438c811.js";import{V as w}from"./VRow-b3adb95f.js";import{V as d}from"./VSelect-81837704.js";import"./VImg-1e1c7cfb.js";import"./VInput-22fdea7f.js";import"./index-7135f795.js";import"./dialog-transition-5f112fd2.js";import"./VMenu-a0f6d9ef.js";import"./VChip-54379337.js";const U={data(){return{rules:{required:l=>!!l||"Required"},dataForm:{id:null,name:"",isPhase1Access:1,isPhase2Access:0,isPhase3Access:0,isPhase4Access:0,canDownload:0},items:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Akses Phase 1",value:"isPhase1Access",sortable:!0},{text:"Akses Phase 2",value:"isPhase2Access",sortable:!0},{text:"Akses Phase 3",value:"isPhase3Access",sortable:!0},{text:"Akses Phase 4",value:"isPhase4Access",sortable:!0},{text:"Akses Download",value:"canDownload",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1}},methods:{async deleteRole(l){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const n=await h.delete(`/role/${l.id}`);n.status===200?(this.getAllRole(),this.$showToast("success","Berhasill",n.data.message)):this.$showToast("error","Sorry",n.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},async updateData(){try{const l=new FormData;l.append("name",this.dataForm.name),l.append("isPhase1Access",this.dataForm.isPhase1Access),l.append("isPhase2Access",this.dataForm.isPhase2Access),l.append("isPhase3Access",this.dataForm.isPhase3Access),l.append("isPhase4Access",this.dataForm.isPhase4Access),l.append("canDownload",this.dataForm.canDownload),l.append("_method","PUT");const e=await h.post(`/role/${this.dataForm.id}`,l);e.status===200?(this.closeModal(2),this.getAllRole(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(l){this.$showToast("error","Sorry",l.response.data.message)}},async insertData(){try{for(let n in this.dataForm)n!=="id"&&this.dataForm[n]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${n} harus diisi.`));const l=new FormData;l.append("name",this.dataForm.name),l.append("isPhase1Access",this.dataForm.isPhase1Access),l.append("isPhase2Access",this.dataForm.isPhase2Access),l.append("isPhase3Access",this.dataForm.isPhase3Access),l.append("isPhase4Access",this.dataForm.isPhase4Access),l.append("canDownload",this.dataForm.canDownload),l.append("_method","POST");const e=await h.post("/role",l);e.status===200?(this.closeModal(1),this.getAllRole(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(l){this.$showToast("error","Sorry",l.response.data.message)}},closeModal(l){l===1?(this.resetForm(),this.insert=!1):l===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",isPhase1Access:1,isPhase2Access:0,isPhase3Access:0,isPhase4Access:0,canDownload:0}},openModal(l,e=null){l===1?this.insert=!0:l===2&&e&&(this.dataForm.id=e.id,this.dataForm.name=e.name,this.dataForm.isPhase1Access=parseInt(e.isPhase1Access),this.dataForm.isPhase2Access=parseInt(e.isPhase2Access),this.dataForm.isPhase3Access=parseInt(e.isPhase3Access),this.dataForm.isPhase4Access=parseInt(e.isPhase4Access),this.dataForm.canDownload=parseInt(e.canDownload),this.edit=!0)},async getAllRole(){try{const l=await h.get("/role");l.status===200?this.items=l.data.data:this.$showToast("error","Sorry",l.data.data.message)}catch(l){this.$showToast("error","Sorry",l.response.data.message)}}},mounted(){this.getAllRole()}},_={class:"d-flex justify-space-between mb-6"},R={class:"d-flex align-center pe-2 w-25"},C=r("p",null,"Data Kantor Kosong",-1),M=r("p",null,"loading data .....",-1),Y={class:"operation-wrapper"};function B(l,e,n,I,o,m){const v=g("EasyDataTable");return x(),T("div",null,[a(A,{class:"auth-card pa-4 pt-5"},{default:t(()=>[a(y,{class:"align-left"},{default:t(()=>[a(S,{class:"text-2xl font-weight-bold"},{default:t(()=>[u(" Daftar Permission ")]),_:1})]),_:1}),r("div",_,[a(p,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[0]||(e[0]=s=>m.openModal(1))},{default:t(()=>[u(" Tambah Data ")]),_:1}),r("div",R,[a(f,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":e[1]||(e[1]=s=>o.searchValue=s)},null,8,["modelValue"])])]),a(b,{modelValue:o.insert,"onUpdate:modelValue":e[9]||(e[9]=s=>o.insert=s),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[a(A,null,{title:t(()=>[u(" Tambah Data ")]),text:t(()=>[a(F,{onSubmit:P(m.insertData,["prevent"])},{default:t(()=>[a(w,null,{default:t(()=>[a(i,{md:"12",cols:"12"},{default:t(()=>[a(f,{placeholder:"Nama Role",label:"Role",modelValue:o.dataForm.name,"onUpdate:modelValue":e[2]||(e[2]=s=>o.dataForm.name=s),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-shield"},null,8,["modelValue","rules"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 1?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase1Access,"onUpdate:modelValue":e[3]||(e[3]=s=>o.dataForm.isPhase1Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 2?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase2Access,"onUpdate:modelValue":e[4]||(e[4]=s=>o.dataForm.isPhase2Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 3?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase3Access,"onUpdate:modelValue":e[5]||(e[5]=s=>o.dataForm.isPhase3Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 4?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase4Access,"onUpdate:modelValue":e[6]||(e[6]=s=>o.dataForm.isPhase4Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Download? ",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.canDownload,"onUpdate:modelValue":e[7]||(e[7]=s=>o.dataForm.canDownload=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[a(p,{type:"submit"},{default:t(()=>[u("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[8]||(e[8]=s=>m.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),a(b,{modelValue:o.edit,"onUpdate:modelValue":e[17]||(e[17]=s=>o.edit=s),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[a(A,null,{title:t(()=>[u(" Update Data Role ")]),text:t(()=>[a(F,{onSubmit:P(m.updateData,["prevent"])},{default:t(()=>[a(w,null,{default:t(()=>[a(i,{md:"12",cols:"12"},{default:t(()=>[a(f,{placeholder:"Nama Role",label:"Role",modelValue:o.dataForm.name,"onUpdate:modelValue":e[10]||(e[10]=s=>o.dataForm.name=s),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-shield"},null,8,["modelValue","rules"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 1?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase1Access,"onUpdate:modelValue":e[11]||(e[11]=s=>o.dataForm.isPhase1Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 2?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase2Access,"onUpdate:modelValue":e[12]||(e[12]=s=>o.dataForm.isPhase2Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 3?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase3Access,"onUpdate:modelValue":e[13]||(e[13]=s=>o.dataForm.isPhase3Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Phase 4?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.isPhase4Access,"onUpdate:modelValue":e[14]||(e[14]=s=>o.dataForm.isPhase4Access=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{md:"12",cols:"12"},{default:t(()=>[a(d,{label:"Akses Download? ",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:o.dataForm.canDownload,"onUpdate:modelValue":e[15]||(e[15]=s=>o.dataForm.canDownload=s),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),a(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[a(p,{type:"submit"},{default:t(()=>[u("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[16]||(e[16]=s=>m.closeModal(2))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),a(v,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":t(()=>[C]),loading:t(()=>[M]),"item-isPhase1Access":t(s=>[r("p",null,c(s.isPhase1Access==1?"✓":"x"),1)]),"item-isPhase2Access":t(s=>[r("p",null,c(s.isPhase2Access==1?"✓":"x"),1)]),"item-isPhase3Access":t(s=>[r("p",null,c(s.isPhase3Access==1?"✓":"x"),1)]),"item-isPhase4Access":t(s=>[r("p",null,c(s.isPhase4Access==1?"✓":"x"),1)]),"item-canDownload":t(s=>[r("p",null,c(s.canDownload==1?"✓":"x"),1)]),"item-operation":t(s=>[r("div",Y,[r("button",null,[a(V,{size:"20",icon:"bx-edit",color:"blue",onClick:k=>m.openModal(2,s)},null,8,["onClick"])]),u("   "),r("button",null,[a(V,{size:"20",icon:"bx-trash",color:"red",onClick:k=>m.deleteRole(s)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const Z=D(U,[["render",B]]);export{Z as default};

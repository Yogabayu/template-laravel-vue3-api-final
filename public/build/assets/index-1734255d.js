import{m as c}from"./axios-379d51f3.js";import{_ as x,r as _,o as v,c as T,a as t,w as o,f as n,b as r,e as p,d as h,V as m,j as V}from"./main-759cb87b.js";import{V as f,a as S,c as D}from"./VCard-52223027.js";import{V as u}from"./VTextField-06e2cde8.js";import{V as b}from"./VDialog-8e0db9e1.js";import{V as g}from"./VForm-bcf32498.js";import{V as w}from"./VRow-7c3bab50.js";import"./VAvatar-a86fd93f.js";import"./VImg-257b2f41.js";import"./VInput-e8b396b8.js";import"./index-b36c4722.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-9f9f470a.js";const K={data(){return{rules:{required:a=>!!a||"Required"},dataForm:{id:null,code:"",name:""},items:[],headers:[{text:"Nama Kantor",value:"name",sortable:!0},{text:"Kode Kantor",value:"code",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1}},methods:{async deleteOffice(a){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const i=await c.delete(`/office/${a.id}`);i.status===200?(this.getAllOffices(),this.$showToast("success","Berhasill",i.data.message)):this.$showToast("error","Sorry",i.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},async updateData(){try{const a=new FormData;a.append("code",this.dataForm.code),a.append("name",this.dataForm.name),a.append("_method","PUT");const e=await c.post(`/office/${this.dataForm.id}`,a);e.status===200?(this.closeModal(2),this.getAllOffices(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},async insertData(){try{for(let i in this.dataForm)i!=="id"&&this.dataForm[i]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${i} harus diisi.`));const a=new FormData;a.append("name",this.dataForm.name),a.append("code",this.dataForm.code),a.append("_method","POST");const e=await c.post("/office",a);e.status===200?(this.closeModal(1),this.getAllOffices(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},closeModal(a){a===1?(this.resetForm(),this.insert=!1):a===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,code:"",name:""}},openModal(a,e=null){a===1?this.insert=!0:a===2&&e&&(this.dataForm.code=e.code,this.dataForm.name=e.name,this.dataForm.id=e.id,this.edit=!0)},async getAllOffices(){try{const a=await c.get("/office");a.status===200?this.items=a.data.data:this.$showToast("error","Sorry",a.data.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}}},mounted(){this.getAllOffices()}},C={class:"d-flex justify-space-between mb-6"},k={class:"d-flex align-center pe-2 w-25"},M=r("p",null,"Data Kantor Kosong",-1),U=r("p",null,"loading data .....",-1),O={class:"operation-wrapper"};function A(a,e,i,N,s,d){const y=_("EasyDataTable");return v(),T("div",null,[t(f,{class:"auth-card pa-4 pt-5"},{default:o(()=>[t(S,{class:"align-left"},{default:o(()=>[t(D,{class:"text-2xl font-weight-bold"},{default:o(()=>[n(" Daftar Kantor ")]),_:1})]),_:1}),r("div",C,[t(p,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[0]||(e[0]=l=>d.openModal(1))},{default:o(()=>[n(" Tambah Data ")]),_:1}),r("div",k,[t(u,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:s.searchValue,"onUpdate:modelValue":e[1]||(e[1]=l=>s.searchValue=l)},null,8,["modelValue"])])]),t(b,{modelValue:s.insert,"onUpdate:modelValue":e[5]||(e[5]=l=>s.insert=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[t(f,null,{title:o(()=>[n(" Tambah Data ")]),text:o(()=>[t(g,{onSubmit:h(d.insertData,["prevent"])},{default:o(()=>[t(w,null,{default:o(()=>[t(m,{md:"12",cols:"12"},{default:o(()=>[t(u,{placeholder:"Kode Kantor",label:"Kode",modelValue:s.dataForm.code,"onUpdate:modelValue":e[2]||(e[2]=l=>s.dataForm.code=l),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{md:"12",cols:"12"},{default:o(()=>[t(u,{placeholder:"Nama Kantor",label:"Nama",modelValue:s.dataForm.name,"onUpdate:modelValue":e[3]||(e[3]=l=>s.dataForm.name=l),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[t(p,{type:"submit"},{default:o(()=>[n("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[4]||(e[4]=l=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),t(b,{modelValue:s.edit,"onUpdate:modelValue":e[9]||(e[9]=l=>s.edit=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[t(f,null,{title:o(()=>[n(" Update Data ")]),text:o(()=>[t(g,{onSubmit:h(d.updateData,["prevent"])},{default:o(()=>[t(w,null,{default:o(()=>[t(m,{md:"12",cols:"12"},{default:o(()=>[t(u,{placeholder:"Kode Kantor",label:"Kode",modelValue:s.dataForm.code,"onUpdate:modelValue":e[6]||(e[6]=l=>s.dataForm.code=l),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{md:"12",cols:"12"},{default:o(()=>[t(u,{placeholder:"Nama Kantor",label:"Nama",modelValue:s.dataForm.name,"onUpdate:modelValue":e[7]||(e[7]=l=>s.dataForm.name=l),autofocus:"",rules:[s.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[t(p,{type:"submit"},{default:o(()=>[n("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[8]||(e[8]=l=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),t(y,{"show-index":"",headers:s.headers,items:s.items,"search-value":s.searchValue},{"empty-message":o(()=>[M]),loading:o(()=>[U]),"item-operation":o(l=>[r("div",O,[r("button",null,[t(V,{size:"20",icon:"bx-edit",color:"blue",onClick:F=>d.openModal(2,l)},null,8,["onClick"])]),n("   "),r("button",null,[t(V,{size:"20",icon:"bx-trash",color:"red",onClick:F=>d.deleteOffice(l)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const W=x(K,[["render",A]]);export{W as default};

import{m as c}from"./index-9f835097.js";import{r as x,o as _,c as v,a as t,w as s,e as n,b as r,V as p,d as h,i as V}from"./main-30a2d9da.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";import{V as f,a as S,e as D,c as b,d as m}from"./VRow-a06216da.js";import{a as u,V as g}from"./VTextField-2e60f3ff.js";import{V as w}from"./VDialog-411a96de.js";import"./VImg-53f38ade.js";import"./VInput-0da3a617.js";import"./VOverlay-ab1d37b4.js";import"./dialog-transition-115da631.js";const K={data(){return{rules:{required:a=>!!a||"Required"},dataForm:{id:null,code:"",name:""},items:[],headers:[{text:"Nama Kantor",value:"name",sortable:!0},{text:"Kode Kantor",value:"code",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1}},methods:{async deleteOffice(a){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const i=await c.delete(`/office/${a.id}`);i.status===200?(this.getAllOffices(),this.$showToast("success","Berhasill",i.data.message)):this.$showToast("error","Sorry",i.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},async updateData(){try{const a=new FormData;a.append("code",this.dataForm.code),a.append("name",this.dataForm.name),a.append("_method","PUT");const e=await c.post(`/office/${this.dataForm.id}`,a);e.status===200?(this.closeModal(2),this.getAllOffices(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},async insertData(){try{for(let i in this.dataForm)i!=="id"&&this.dataForm[i]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${i} harus diisi.`));const a=new FormData;a.append("name",this.dataForm.name),a.append("code",this.dataForm.code),a.append("_method","POST");const e=await c.post("/office",a);e.status===200?(this.closeModal(1),this.getAllOffices(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},closeModal(a){a===1?(this.resetForm(),this.insert=!1):a===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,code:"",name:""}},openModal(a,e=null){a===1?this.insert=!0:a===2&&e&&(this.dataForm.code=e.code,this.dataForm.name=e.name,this.dataForm.id=e.id,this.edit=!0)},async getAllOffices(){try{const a=await c.get("/office");a.status===200?this.items=a.data.data:this.$showToast("error","Sorry",a.data.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}}},mounted(){this.getAllOffices()}},C={class:"d-flex justify-space-between mb-6"},k={class:"d-flex align-center pe-2 w-25"},M=r("p",null,"Data Kantor Kosong",-1),U=r("p",null,"loading data .....",-1),O={class:"operation-wrapper"};function A(a,e,i,N,o,d){const y=x("EasyDataTable");return _(),v("div",null,[t(f,{class:"auth-card pa-4 pt-5"},{default:s(()=>[t(S,{class:"align-left"},{default:s(()=>[t(D,{class:"text-2xl font-weight-bold"},{default:s(()=>[n(" Daftar Kantor ")]),_:1})]),_:1}),r("div",C,[t(p,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[0]||(e[0]=l=>d.openModal(1))},{default:s(()=>[n(" Tambah Data ")]),_:1}),r("div",k,[t(u,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":e[1]||(e[1]=l=>o.searchValue=l)},null,8,["modelValue"])])]),t(w,{modelValue:o.insert,"onUpdate:modelValue":e[5]||(e[5]=l=>o.insert=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[t(f,null,{title:s(()=>[n(" Tambah Data ")]),text:s(()=>[t(g,{onSubmit:h(d.insertData,["prevent"])},{default:s(()=>[t(b,null,{default:s(()=>[t(m,{md:"12",cols:"12"},{default:s(()=>[t(u,{placeholder:"Kode Kantor",label:"Kode",modelValue:o.dataForm.code,"onUpdate:modelValue":e[2]||(e[2]=l=>o.dataForm.code=l),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{md:"12",cols:"12"},{default:s(()=>[t(u,{placeholder:"Nama Kantor",label:"Nama",modelValue:o.dataForm.name,"onUpdate:modelValue":e[3]||(e[3]=l=>o.dataForm.name=l),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[t(p,{type:"submit"},{default:s(()=>[n("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[4]||(e[4]=l=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),t(w,{modelValue:o.edit,"onUpdate:modelValue":e[9]||(e[9]=l=>o.edit=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[t(f,null,{title:s(()=>[n(" Update Data ")]),text:s(()=>[t(g,{onSubmit:h(d.updateData,["prevent"])},{default:s(()=>[t(b,null,{default:s(()=>[t(m,{md:"12",cols:"12"},{default:s(()=>[t(u,{placeholder:"Kode Kantor",label:"Kode",modelValue:o.dataForm.code,"onUpdate:modelValue":e[6]||(e[6]=l=>o.dataForm.code=l),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{md:"12",cols:"12"},{default:s(()=>[t(u,{placeholder:"Nama Kantor",label:"Nama",modelValue:o.dataForm.name,"onUpdate:modelValue":e[7]||(e[7]=l=>o.dataForm.name=l),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),t(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[t(p,{type:"submit"},{default:s(()=>[n("Simpan")]),_:1}),r("button",{type:"button",class:"btn btn-blue",onClick:e[8]||(e[8]=l=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),t(y,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":s(()=>[M]),loading:s(()=>[U]),"item-operation":s(l=>[r("div",O,[r("button",null,[t(V,{size:"20",icon:"bx-edit",color:"blue",onClick:F=>d.openModal(2,l)},null,8,["onClick"])]),n("   "),r("button",null,[t(V,{size:"20",icon:"bx-trash",color:"red",onClick:F=>d.deleteOffice(l)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const H=T(K,[["render",A]]);export{H as default};

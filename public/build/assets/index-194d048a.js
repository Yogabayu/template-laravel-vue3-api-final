import{m as c}from"./VAvatar-5f945262.js";import{_ as U,r as A,o as m,c as f,a,w as s,f as i,b as d,e as _,d as S,V as p,H as V,G as v,t as g,j as T}from"./main-18b336f5.js";import{V as b,a as M,c as k,b as K}from"./VCard-a3682b65.js";import{V as F}from"./VTextField-460c393a.js";import{V as x}from"./VDialog-07537e96.js";import{V as D}from"./VForm-8438c811.js";import{V as C}from"./VRow-b3adb95f.js";import{V as y}from"./VAutocomplete-1e6420df.js";import{a as P,V as w}from"./VChip-54379337.js";import"./VImg-1e1c7cfb.js";import"./VInput-22fdea7f.js";import"./index-7135f795.js";import"./dialog-transition-5f112fd2.js";import"./VSelect-81837704.js";import"./VMenu-a0f6d9ef.js";const R={data(){return{rules:{required:t=>!!t||"Required"},dataForm:{id:null,name:"",offices:[],role_id:null},items:[],offices:[],roles:[],headers:[{text:"Nama Posisi",value:"name",sortable:!0},{text:"Cakupan Kantor",value:"offices",sortable:!0},{text:"Permission",value:"role.name",sortable:!0},{text:"Jumlah User",value:"users_count",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1,detailOffice:null,isShowDetailOffice:!1}},methods:{showAllOffice(t){this.detailOffice=t,this.isShowDetailOffice=!0},async deletePosition(t){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const r=await c.delete(`/position/${t.id}`);r.status===200?(this.getAllPositions(),this.$showToast("success","Berhasill",r.data.message)):this.$showToast("error","Sorry",r.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},async updateData(){try{const t=new FormData;t.append("name",this.dataForm.name),this.dataForm.offices.forEach(r=>{r.hasOwnProperty("value")?t.append("offices[]",r.value):t.append("offices[]",r)}),t.append("role_id",this.dataForm.role_id),t.append("_method","PUT");const e=await c.post(`/position/${this.dataForm.id}`,t);e.status===200?(this.closeModal(2),this.getAllPositions(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},async insertData(){try{for(let r in this.dataForm)r!=="id"&&this.dataForm[r]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${r} harus diisi.`));const t=new FormData;t.append("name",this.dataForm.name),this.dataForm.offices.forEach(r=>{t.append("offices[]",r)}),t.append("role_id",this.dataForm.role_id),t.append("_method","POST");const e=await c.post("/position",t);e.status===200?(this.closeModal(1),this.getAllPositions(),this.$showToast("success","Success",e.data.message)):this.$showToast("error","Sorry",e.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},closeModal(t){t===1?(this.resetForm(),this.insert=!1):t===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",offices:[],role_id:null}},openModal(t,e=null){t===1?(this.getOffices(),this.getRoles(),this.insert=!0):t===2&&e&&(this.getOffices(),this.getRoles(),this.dataForm.id=e.id,this.dataForm.name=e.name,this.dataForm.offices=e.offices.map(r=>({value:r.id,title:r.name})),this.dataForm.role_id=e.role_id,this.edit=!0)},async getAllPositions(){try{const t=await c.get("/position");t.status===200?this.items=t.data.data:this.$showToast("error","Sorry",t.data.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},async getOffices(){try{const t=await c.get("/office");t.status===200?this.offices=t.data.data.map(e=>({value:e.id,title:e.code+" - "+e.name})):this.$showToast("error","Sorry","error get data office")}catch{this.$showToast("error","Sorry","error get data office")}},async getRoles(){try{const t=await c.get("/role");t.status===200?this.roles=t.data.data.map(e=>({value:e.id,title:e.name})):this.$showToast("error","Sorry","error get data role")}catch{this.$showToast("error","Sorry","error get data role")}}},mounted(){this.getAllPositions()}},B={class:"d-flex justify-space-between mb-6"},q={class:"d-flex align-center pe-2 w-25"},J=d("p",null,"Data Kantor Kosong",-1),N=d("p",null,"loading data .....",-1),E=d("span",{class:"text-h5"},"Daftar Kantor",-1),z={class:"operation-wrapper"};function j(t,e,r,G,o,u){const O=A("EasyDataTable");return m(),f("div",null,[a(b,{class:"auth-card pa-4 pt-5"},{default:s(()=>[a(M,{class:"align-left"},{default:s(()=>[a(k,{class:"text-2xl font-weight-bold"},{default:s(()=>[i(" Daftar Jabatan ")]),_:1})]),_:1}),d("div",B,[a(_,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[0]||(e[0]=l=>u.openModal(1))},{default:s(()=>[i(" Tambah Data ")]),_:1}),d("div",q,[a(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":e[1]||(e[1]=l=>o.searchValue=l)},null,8,["modelValue"])])]),a(x,{modelValue:o.insert,"onUpdate:modelValue":e[6]||(e[6]=l=>o.insert=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[a(b,null,{title:s(()=>[i(" Tambah Data ")]),text:s(()=>[a(D,{onSubmit:S(u.insertData,["prevent"])},{default:s(()=>[a(C,null,{default:s(()=>[a(p,{md:"12",cols:"12"},{default:s(()=>[a(F,{placeholder:"Nama Jabatan",label:"Jabatan",modelValue:o.dataForm.name,"onUpdate:modelValue":e[2]||(e[2]=l=>o.dataForm.name=l),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),a(p,{cols:"12",md:"12"},{default:s(()=>[a(y,{modelValue:o.dataForm.offices,"onUpdate:modelValue":e[3]||(e[3]=l=>o.dataForm.offices=l),items:o.offices,hint:"Pilih Cakupan Kantor",label:"Cakupan Kantor",multiple:"",chips:"",clearable:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),a(p,{cols:"12",md:"12"},{default:s(()=>[a(y,{label:"Pilih Role",items:o.roles,modelValue:o.dataForm.role_id,"onUpdate:modelValue":e[4]||(e[4]=l=>o.dataForm.role_id=l),rules:[o.rules.required],"prepend-icon":"mdi-divide"},null,8,["items","modelValue","rules"])]),_:1}),a(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[a(_,{type:"submit"},{default:s(()=>[i("Simpan")]),_:1}),d("button",{type:"button",class:"btn btn-blue",onClick:e[5]||(e[5]=l=>u.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),a(x,{modelValue:o.edit,"onUpdate:modelValue":e[11]||(e[11]=l=>o.edit=l),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[a(b,null,{title:s(()=>[i(" Update Data ")]),text:s(()=>[a(D,{onSubmit:S(u.updateData,["prevent"])},{default:s(()=>[a(C,null,{default:s(()=>[a(p,{md:"12",cols:"12"},{default:s(()=>[a(F,{placeholder:"Nama Jabatan",label:"Jabatan",modelValue:o.dataForm.name,"onUpdate:modelValue":e[7]||(e[7]=l=>o.dataForm.name=l),autofocus:"",rules:[o.rules.required],"prepend-icon":"mdi-devide"},null,8,["modelValue","rules"])]),_:1}),a(p,{cols:"12",md:"12"},{default:s(()=>[a(y,{modelValue:o.dataForm.offices,"onUpdate:modelValue":e[8]||(e[8]=l=>o.dataForm.offices=l),items:o.offices,hint:"Pilih Cakupan Kantor",label:"Cakupan Kantor",multiple:"",chips:"",clearable:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),a(p,{cols:"12",md:"12"},{default:s(()=>[a(y,{label:"Pilih Role",items:o.roles,modelValue:o.dataForm.role_id,"onUpdate:modelValue":e[9]||(e[9]=l=>o.dataForm.role_id=l),rules:[o.rules.required],"prepend-icon":"mdi-divide"},null,8,["items","modelValue","rules"])]),_:1}),a(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[a(_,{type:"submit"},{default:s(()=>[i("Simpan")]),_:1}),d("button",{type:"button",class:"btn btn-blue",onClick:e[10]||(e[10]=l=>u.closeModal(2))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),a(O,{"show-index":"",headers:o.headers,items:o.items,"search-value":o.searchValue},{"empty-message":s(()=>[J]),loading:s(()=>[N]),"item-offices":s(l=>[a(P,{"selected-class":"text-primary",column:""},{default:s(()=>[l.offices.length<=5?(m(!0),f(V,{key:0},v(l.offices,(n,h)=>(m(),f("div",{key:h},[a(w,{style:{color:"rgb(6, 84, 107)"}},{default:s(()=>[i(g(n.name),1)]),_:2},1024)]))),128)):(m(),f(V,{key:1},[(m(!0),f(V,null,v(l.offices.slice(0,5),(n,h)=>(m(),f("div",{key:h},[a(w,{style:{color:"rgb(6, 84, 107)"}},{default:s(()=>[i(g(n.name),1)]),_:2},1024)]))),128)),a(w,{style:{color:"rgb(6, 84, 107)"},onClick:n=>u.showAllOffice(l)},{default:s(()=>[i(" +"+g(l.positions.length-5)+" lainnya ",1)]),_:2},1032,["onClick"]),a(x,{modelValue:o.isShowDetailOffice,"onUpdate:modelValue":e[12]||(e[12]=n=>o.isShowDetailOffice=n),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[a(b,null,{default:s(()=>[a(k,null,{default:s(()=>[E]),_:1}),a(K,null,{default:s(()=>[a(P,{"selected-class":"text-primary",column:""},{default:s(()=>[(m(!0),f(V,null,v(o.detailOffice.positions,(n,h)=>(m(),f("div",{key:h},[a(w,{style:{color:"rgb(6, 84, 107)"}},{default:s(()=>[i(g(n.name),1)]),_:2},1024)]))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))]),_:2},1024)]),"item-operation":s(l=>[d("div",z,[d("button",null,[a(T,{size:"20",icon:"bx-edit",color:"blue",onClick:n=>u.openModal(2,l)},null,8,["onClick"])]),i("   "),d("button",null,[a(T,{size:"20",icon:"bx-trash",color:"red",onClick:n=>u.deletePosition(l)},null,8,["onClick"])])])]),_:1},8,["headers","items","search-value"])]),_:1})])}const re=U(R,[["render",j]]);export{re as default};

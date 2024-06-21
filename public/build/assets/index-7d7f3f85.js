import{m as h}from"./VGrid-bc82002c.js";import{m as O,r as I,o as u,c as f,a as s,w as t,b as l,G as b,E as K,e as d,V,d as $,F as S,t as w,h as k,M as U,i as T}from"./main-1510af4a.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";import{V as q}from"./VOverlay-6a173b06.js";import{V as y,d as n,a as E,e as A,c as v,b as z}from"./VRow-e65ce29b.js";import{a as m,V as C}from"./VTextField-7c474d53.js";import{V as F}from"./VDialog-7a40b249.js";import{V as D}from"./VAutocomplete-d50dd154.js";import{V as R}from"./VAlert-ee6d6c83.js";import{V as j}from"./VDivider-272b0910.js";import{a as M,V as g}from"./VChip-aafad41a.js";import{V as B}from"./VTooltip-0c0527b2.js";import"./VImg-8f311b38.js";import"./VInput-d4f2f5c1.js";import"./index-5b1dd9ba.js";import"./dialog-transition-3a7bc416.js";import"./VSelect-851410c2.js";import"./VMenu-d7fd7db4.js";import"./VCheckboxBtn-28ae77bc.js";const G=O({watch:{"dataForm.email":function(e){e!==""?this.emailRules=[a=>a.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)||"Invalid Email address"]:e===""&&(this.emailRules=[])}},data(){return{overlay:!1,rules:{required:e=>!!e||"Required"},emailRules:[],detailOffice:null,positions:[],dataForm:{id:null,nik:"",name:"",email:"",password:null,position_id:null},items:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"NIK",value:"nik",sortable:!0},{text:"E-mail",value:"email",sortable:!0},{text:"Jabatan",value:"position.name",sortable:!0},{text:"Cakupan Kantor",value:"office",sortable:!0},{text:"Status",value:"isActive",sortable:!0},{text:"Operation",value:"operation"}],searchValue:"",insert:!1,edit:!1,isShowDetailOffice:!1,isPasswordVisible:!1,isTelegram:!1,dataTelegram:{id:null,type:1,username:""}}},methods:{async connectTelegram(e){try{if(this.overlay=!0,e==2){for(let c in this.dataTelegram)this.dataTelegram[c]===null&&(this.closeModal(3),this.$showToast("error","Sorry",`Properti ${c} harus diisi.`));this.dataTelegram.type=2;const a=new FormData;a.append("id",this.dataTelegram.id),a.append("username",this.dataTelegram.username),a.append("type",this.dataTelegram.type),a.append("_method","POST");const r=await h.post("/userGetChatId",a);r.status===200?(this.overlay=!1,this.closeModal(3),this.getAllUsers(),this.$showToast("success","Success",r.data.message)):(this.closeModal(3),this.$showToast("error","Sorry",r.data.message))}else{for(let c in this.dataTelegram)this.dataTelegram[c]===null&&(this.closeModal(3),this.$showToast("error","Sorry",`Properti ${c} harus diisi.`));const a=new FormData;a.append("id",this.dataTelegram.id),a.append("username",this.dataTelegram.username),a.append("type",this.dataTelegram.type),a.append("_method","POST");const r=await h.post("/userGetChatId",a);r.status===200?(this.overlay=!1,this.closeModal(3),this.getAllUsers(),this.$showToast("success","Success",r.data.message)):(this.closeModal(3),this.$showToast("error","Sorry",r.data.message))}}catch(a){this.overlay=!1,this.closeModal(3),this.$showToast("error","Sorry",a.response.data.message),this.getAllUsers()}},async changeStatus(e){try{const a=await h.get(`/changeStatusUser/${e.id}`);a.status===200?(this.getAllUsers(),this.$showToast("success","Berhasill",a.data.message)):this.$showToast("error","Sorry",a.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},showAllOffice(e){this.detailOffice=e,this.isShowDetailOffice=!0},async deleteUser(e){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const r=await h.delete(`/user/${e.id}`);r.status===200?(this.getAllUsers(),this.$showToast("success","Berhasill",r.data.message)):this.$showToast("error","Sorry",r.data.message)}catch(a){this.$showToast("error","Sorry",a.response.data.message)}},async updateData(){try{const e=new FormData;for(let r in this.dataForm)this.dataForm[r]!==null&&e.append(r,this.dataForm[r]);e.append("_method","PUT");const a=await h.post(`/user/${this.dataForm.id}`,e);a.status===200?(this.closeModal(2),this.getAllUsers(),this.$showToast("success","Success",a.data.message)):(this.closeModal(2),this.getAllUsers(),this.$showToast("error","Sorry",a.data.message))}catch(e){this.closeModal(2),this.getAllUsers(),this.$showToast("error","Sorry",e.response.data.message)}},async insertData(){try{for(let r in this.dataForm)r!=="id"&&this.dataForm[r]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${r} harus diisi.`));const e=new FormData;e.append("nik",this.dataForm.nik),e.append("name",this.dataForm.name),e.append("email",this.dataForm.email),e.append("password",this.dataForm.password),e.append("position_id",this.dataForm.position_id),e.append("_method","POST");const a=await h.post("/user",e);a.status===200?(this.closeModal(1),this.getAllUsers(),this.$showToast("success","Success",a.data.message)):(this.closeModal(1),this.$showToast("error","Sorry",a.data.message))}catch(e){this.closeModal(1),this.$showToast("error","Sorry",e.response.data.message)}},closeModal(e){e===1?(this.resetForm(),this.insert=!1):e===2?(this.resetForm(),this.edit=!1):e===3&&(this.dataTelegram={id:null,username:""},this.isTelegram=!1)},resetForm(){this.dataForm={id:null,nik:"",name:"",email:"",password:null,position_id:null}},openModal(e,a=null){e===1?(this.getPositions(),this.insert=!0):e===2?a&&(this.getPositions(),this.dataForm.id=a.id,this.dataForm.nik=a.nik,this.dataForm.name=a.name,this.dataForm.email=a.email,this.dataForm.position_id=a.position_id,this.edit=!0):e===3&&a&&(this.dataTelegram.id=a.id,this.dataTelegram.username=a.telegram_username,this.isTelegram=!0)},async getAllUsers(){try{const e=await h.get("/user");e.status===200?this.items=e.data.data:this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},async getPositions(){try{const e=await h.get("/position");e.status===200?this.positions=e.data.data.map(a=>({value:a.id,title:`${a.name} - ${a.offices.map(r=>r.name).join(", ")}`})):this.$showToast("error","Sorry","error get data office")}catch{this.$showToast("error","Sorry","error get data office")}}},mounted(){this.getAllUsers()}}),L=l("br",null,null,-1),J=l("span",{class:"font-weight-bold text-lg"},"Loading....",-1),x={class:"d-flex justify-space-between mb-6"},Z={class:"d-flex align-center pe-2 w-25"},H=l("ol",null,[l("li",null,"1. Pastikan Anda telah masuk ke akun Telegram Anda."),l("li",null," 2. Isi bagian Username pada pengaturan profil Telegram Anda. "),l("li",null,[d(" 3. Chat Bot Telegram : "),l("a",{href:"https://t.me/bprarthaya_bot",target:"_blank",rel:"noopener noreferrer"},"@bprarthaya_bot")]),l("li",null,"4. Klik /start"),l("li",null," 5. Kemudian isi username dibawah sesuai dengan profile anda sebelumnya, dan klik connect ")],-1),Q=l("p",null,"Data Kantor Kosong",-1),W=l("p",null,"loading data .....",-1),X=l("span",{class:"text-h5"},"Daftar Kantor",-1),Y={class:"operation-wrapper"},_={class:"d-flex justify-space-between"},ee=["onClick"],ae=["onClick"],se=["onClick"];function te(e,a,r,c,oe,le){const P=I("EasyDataTable");return u(),f(b,null,[s(q,{absolute:!0,modelValue:e.overlay,"onUpdate:modelValue":a[0]||(a[0]=o=>e.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:t(()=>[s(n,null,{default:t(()=>[s(K,{color:"primary",size:"32",indeterminate:""}),L,J]),_:1})]),_:1},8,["modelValue"]),l("div",null,[s(y,{class:"auth-card pa-4 pt-5"},{default:t(()=>[s(E,{class:"align-left"},{default:t(()=>[s(A,{class:"text-2xl font-weight-bold"},{default:t(()=>[d(" Daftar User ")]),_:1})]),_:1}),l("div",x,[s(V,{color:"primary",size:"small",class:"my-3 mx-3",onClick:a[1]||(a[1]=o=>e.openModal(1))},{default:t(()=>[d(" Tambah Data ")]),_:1}),l("div",Z,[s(m,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:e.searchValue,"onUpdate:modelValue":a[2]||(a[2]=o=>e.searchValue=o)},null,8,["modelValue"])])]),s(F,{modelValue:e.insert,"onUpdate:modelValue":a[10]||(a[10]=o=>e.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[s(y,null,{title:t(()=>[d(" Tambah Data ")]),text:t(()=>[s(C,{onSubmit:$(e.insertData,["prevent"])},{default:t(()=>[s(v,null,{default:t(()=>[s(n,{md:"12",cols:"12"},{default:t(()=>[s(m,{placeholder:"NIK user",label:"NIK",modelValue:e.dataForm.nik,"onUpdate:modelValue":a[3]||(a[3]=o=>e.dataForm.nik=o),autofocus:"",rules:[e.rules.required],"prepend-icon":"mdi-account-key"},null,8,["modelValue","rules"])]),_:1}),s(n,{md:"12",cols:"12"},{default:t(()=>[s(m,{placeholder:"Nama User",label:"User",modelValue:e.dataForm.name,"onUpdate:modelValue":a[4]||(a[4]=o=>e.dataForm.name=o),rules:[e.rules.required],"prepend-icon":"mdi-user"},null,8,["modelValue","rules"])]),_:1}),s(n,{cols:"12",md:"12"},{default:t(()=>[s(m,{label:"E-mail",placeholder:"johndoe@gmail.com",type:"email","prepend-icon":"mdi-mail",modelValue:e.dataForm.email,"onUpdate:modelValue":a[5]||(a[5]=o=>e.dataForm.email=o),rules:e.emailRules},null,8,["modelValue","rules"])]),_:1}),s(n,{cols:"12",md:"12"},{default:t(()=>[s(m,{modelValue:e.dataForm.password,"onUpdate:modelValue":a[6]||(a[6]=o=>e.dataForm.password=o),rules:[e.rules.required],"prepend-icon":"mdi-lock",label:"Password",placeholder:"············",type:e.isPasswordVisible?"text":"password","append-inner-icon":e.isPasswordVisible?"bx-hide":"bx-show","onClick:appendInner":a[7]||(a[7]=o=>e.isPasswordVisible=!e.isPasswordVisible)},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),s(n,{cols:"12",md:"12"},{default:t(()=>[s(D,{label:"Jabatan - Cakupan Kantor",items:e.positions,modelValue:e.dataForm.position_id,"onUpdate:modelValue":a[8]||(a[8]=o=>e.dataForm.position_id=o),rules:[e.rules.required],"prepend-icon":"mdi-divide"},null,8,["items","modelValue","rules"])]),_:1}),s(n,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[s(V,{type:"submit"},{default:t(()=>[d("Simpan")]),_:1}),l("button",{type:"button",class:"btn btn-blue",onClick:a[9]||(a[9]=o=>e.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),s(F,{modelValue:e.edit,"onUpdate:modelValue":a[18]||(a[18]=o=>e.edit=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[s(y,null,{title:t(()=>[d(" Update Data ")]),text:t(()=>[s(C,{onSubmit:$(e.updateData,["prevent"])},{default:t(()=>[s(v,null,{default:t(()=>[s(n,{md:"12",cols:"12"},{default:t(()=>[s(m,{placeholder:"NIK user",label:"NIK",modelValue:e.dataForm.nik,"onUpdate:modelValue":a[11]||(a[11]=o=>e.dataForm.nik=o),autofocus:"",rules:[e.rules.required],"prepend-icon":"mdi-account-key"},null,8,["modelValue","rules"])]),_:1}),s(n,{md:"12",cols:"12"},{default:t(()=>[s(m,{placeholder:"Nama User",label:"User",modelValue:e.dataForm.name,"onUpdate:modelValue":a[12]||(a[12]=o=>e.dataForm.name=o),rules:[e.rules.required],"prepend-icon":"mdi-user"},null,8,["modelValue","rules"])]),_:1}),s(n,{cols:"12",md:"12"},{default:t(()=>[s(m,{label:"E-mail",placeholder:"johndoe@gmail.com",type:"email","prepend-icon":"mdi-mail",modelValue:e.dataForm.email,"onUpdate:modelValue":a[13]||(a[13]=o=>e.dataForm.email=o),rules:e.emailRules},null,8,["modelValue","rules"])]),_:1}),s(n,{cols:"12",md:"12"},{default:t(()=>[s(m,{modelValue:e.dataForm.password,"onUpdate:modelValue":a[14]||(a[14]=o=>e.dataForm.password=o),"prepend-icon":"mdi-lock",label:"Password",placeholder:"············",type:e.isPasswordVisible?"text":"password","append-inner-icon":e.isPasswordVisible?"bx-hide":"bx-show","onClick:appendInner":a[15]||(a[15]=o=>e.isPasswordVisible=!e.isPasswordVisible)},null,8,["modelValue","type","append-inner-icon"])]),_:1}),s(n,{cols:"12",md:"12"},{default:t(()=>[s(D,{label:"Jabatan - Cakupan Kantor",items:e.positions,modelValue:e.dataForm.position_id,"onUpdate:modelValue":a[16]||(a[16]=o=>e.dataForm.position_id=o),rules:[e.rules.required],"prepend-icon":"mdi-divide"},null,8,["items","modelValue","rules"])]),_:1}),s(n,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[s(V,{type:"submit"},{default:t(()=>[d("Simpan")]),_:1}),l("button",{type:"button",class:"btn btn-blue",onClick:a[17]||(a[17]=o=>e.closeModal(2))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),s(F,{modelValue:e.isTelegram,"onUpdate:modelValue":a[22]||(a[22]=o=>e.isTelegram=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[s(y,null,{title:t(()=>[d(" Connect ke Telegram ")]),text:t(()=>[s(v,{class:"mb-3"},{default:t(()=>[s(n,{md:"12",cols:"12"},{default:t(()=>[s(R,{density:"compact",title:"Langkah-langkah untuk Menghubungkan Akun Telegram Anda:",type:"warning"},{default:t(()=>[H]),_:1})]),_:1})]),_:1}),s(j,{thickness:2,class:"border-opacity-100",color:"info"}),s(C,{class:"mt-3 mb-3",onSubmit:$(e.connectTelegram,["prevent"])},{default:t(()=>[s(v,null,{default:t(()=>[s(n,{md:"12",cols:"12"},{default:t(()=>[s(m,{placeholder:"Username Telegram",label:"Username",modelValue:e.dataTelegram.username,"onUpdate:modelValue":a[19]||(a[19]=o=>e.dataTelegram.username=o),rules:[e.rules.required],"prepend-icon":"mdi-user"},null,8,["modelValue","rules"])]),_:1}),s(n,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[s(V,{type:"submit"},{default:t(()=>[d("Connect")]),_:1}),l("button",{type:"button",class:"btn btn-blue",onClick:a[20]||(a[20]=o=>e.closeModal(3))}," Batal "),l("button",{type:"button",class:"btn btn-blue",color:"error",onClick:a[21]||(a[21]=o=>e.connectTelegram(2))}," disconnect ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),s(P,{"show-index":"",headers:e.headers,items:e.items,"search-value":e.searchValue},{"empty-message":t(()=>[Q]),loading:t(()=>[W]),"item-office":t(o=>[s(M,{"selected-class":"text-primary",column:""},{default:t(()=>[o.position.offices.length<=5?(u(!0),f(b,{key:0},S(o.position.offices,(i,p)=>(u(),f("div",{key:p},[s(g,{style:{color:"rgb(6, 84, 107)"}},{default:t(()=>[d(w(i.name),1)]),_:2},1024)]))),128)):(u(),f(b,{key:1},[(u(!0),f(b,null,S(o.position.offices.slice(0,5),(i,p)=>(u(),f("div",{key:p},[s(g,{style:{color:"rgb(6, 84, 107)"}},{default:t(()=>[d(w(i.name),1)]),_:2},1024)]))),128)),s(g,{style:{color:"rgb(6, 84, 107)"},onClick:i=>e.showAllOffice(o)},{default:t(()=>[d(" +"+w(o.positions.length-5)+" lainnya ",1)]),_:2},1032,["onClick"]),s(F,{modelValue:e.isShowDetailOffice,"onUpdate:modelValue":a[23]||(a[23]=i=>e.isShowDetailOffice=i),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[s(y,null,{default:t(()=>[s(A,null,{default:t(()=>[X]),_:1}),s(z,null,{default:t(()=>[s(M,{"selected-class":"text-primary",column:""},{default:t(()=>[(u(!0),f(b,null,S(e.detailOffice.positions,(i,p)=>(u(),f("div",{key:p},[s(g,{style:{color:"rgb(6, 84, 107)"}},{default:t(()=>[d(w(i.name),1)]),_:2},1024)]))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))]),_:2},1024)]),"item-isActive":t(o=>[o.isActive?(u(),k(g,{key:0,color:"success",onClick:i=>e.changeStatus(o)},{default:t(()=>[d("Active")]),_:2},1032,["onClick"])):(u(),k(g,{key:1,color:"error",onClick:i=>e.changeStatus(o)},{default:t(()=>[d("Non-Active")]),_:2},1032,["onClick"]))]),"item-operation":t(o=>[l("div",Y,[l("div",_,[s(B,{location:"top",text:"Edit User"},{activator:t(({props:i})=>[l("button",U(i,{onClick:p=>e.openModal(2,o)}),[s(T,{size:"20",icon:"bx-edit",color:"info"})],16,ee)]),_:2},1024),s(B,{location:"top",text:"Hapus User"},{activator:t(({props:i})=>[l("button",U(i,{onClick:p=>e.deleteUser(o)}),[s(T,{size:"20",icon:"bx-trash",color:"error"})],16,ae)]),_:2},1024),s(B,{location:"top",text:"Connect ke Telegram"},{activator:t(({props:i})=>[l("button",U(i,{onClick:p=>e.openModal(3,o)}),[o.telegram_chat_id?(u(),k(T,{key:0,size:"20",icon:"bx-bxl-telegram",color:"info"})):(u(),k(T,{key:1,size:"20",icon:"bx-bxl-telegram",color:"error"}))],16,se)]),_:2},1024)])])]),_:1},8,["headers","items","search-value"])]),_:1})])],64)}const $e=N(G,[["render",te]]);export{$e as default};

import{m as b}from"./index-72ac3f44.js";import{r as A,o as f,c as _,a,w as o,G as P,E as U,e as p,F as j,h as c,V as x,f as F,t as C,b as i,i as D,d as I,a0 as J}from"./main-8bd1049b.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";import{V as q}from"./VOverlay-8488d677.js";import{V as T,d as n,e as M,b as N,c as w}from"./VRow-504d0cd6.js";import{V as K,a as y}from"./VTabs-ef9c6235.js";import{V as E,a as L,b as h}from"./VWindowItem-98515597.js";import{V as z}from"./VSpacer-f2a47c3f.js";import{a as g,V as O}from"./VTextField-d130428f.js";import{V as R}from"./VDialog-e4eb482c.js";import{V as v}from"./VDivider-2058d2f9.js";import{V as k}from"./VCheckbox-96fd6ced.js";import"./VImg-5f702e6e.js";import"./VGrid-0079e0c5.js";import"./VChip-78202466.js";import"./dialog-transition-4788892b.js";import"./VCheckboxBtn-fbcdc272.js";const G={data(){return{overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:s=>!!s||"Required"},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"Operation",value:"operation"}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(s){s==1?this.filterDataStatus(1):s==2?this.filterDataStatus(2):s==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{toDetail(s){this.$router.push(`/u-credit/${s.id}`)},async deleteFile(s){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const d=await b.delete(`/user/credit/${s.id}`);d.status===200?(this.getAllFiles(),this.$showToast("success","Berhasil",d.data.message)):this.$showToast("error","Sorry",d.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},resetFile(s){!this.dataForm[s]!=null&&(this.dataForm[s]=null)},handleFileChange(s,e){const d=s.target.files[0];d&&["image/jpeg","image/png"].includes(d.type)?(this.dataForm[e]=d,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"&&(this.dataForm.noteFile10="Foto Kunjungan")):(this.$showToast("error","Error","Hanya file JPG, JPEG, dan PNG yang diizinkan."),s.target.value=null)},async openModal(s,e=null){s===1?this.insert=!0:s===2&&console.log("masuk")},closeModal(s){s===1?(this.resetForm(),this.insert=!1):s===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInput(s){return s=s.replace(/\D/g,""),s=s.replace(/\B(?=(\d{3})+(?!\d))/g,","),s},filterDataStatus(s){this.items=this.originalItems.filter(e=>e.isApproved==s)},getUserData(){const s=localStorage.getItem("userData");s&&(this.userData=JSON.parse(s))},async getAllFiles(){try{const s=await b.get("/user/credit");s.status===200?(this.items=s.data.data.files,this.userAccess=s.data.data.userAccess,this.originalItems=[...this.items]):this.$showToast("error","Sorry",s.data.data.message)}catch(s){this.$showToast("error","Sorry",s.response.data.message)}},formatInputPlafon(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},async insertData(){try{this.overlay=!0;const s=new FormData;s.append("name",this.dataForm.name),s.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),s.append("type_bussiness",this.dataForm.type_bussiness),s.append("desc_bussiness",this.dataForm.desc_bussiness);for(let m=1;m<=10;m++){if(m===6)continue;let l="file"+m,r="noteFile"+m,V="hasFile"+m;this.dataForm.hasOwnProperty(V)&&this.dataForm[V]||this.dataForm[l]?this.dataForm[l]&&(s.append(l,this.dataForm[l]),s.append(r,this.dataForm[r])):this.dataForm[l]&&s.append(l,this.dataForm[l])}if(!this.dataForm.file7&&!this.dataForm.file8&&!this.dataForm.file9){this.overlay=!1,this.$showToast("success","Success","Wajib memasukkan salah satu jenis jaminan");return}s.append("_method","POST");const e={onUploadProgress:m=>{try{this.uploadProgress=Math.round(m.loaded*100/m.total)}catch(l){console.error("Error calculating progress:",l)}},headers:{"Content-Type":"multipart/form-data"}},d=await b.post("/user/credit",s,e);d.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",d.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",d.data.message))}catch(s){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",s.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}},H=i("br",null,null,-1),W=i("span",{class:"font-weight-bold text-lg"},"Loading....",-1),Q=i("p",null,"Data Kosong",-1),X=i("p",null,"loading data .....",-1),Y={class:"operation-wrapper"},Z=["onClick"],$=i("span",{style:{color:"red"}},"*",-1),ee=i("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1),le=i("span",{style:{color:"red"}},"*",-1),se=i("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1),ae=i("span",{style:{color:"red"}},"*",-1),te=i("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1),oe=i("span",{style:{color:"red"}},"*",-1),ie=i("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1),re=i("span",{style:{color:"red"}},"*",-1),ne=i("span",{class:"subtitle-1 text-center"},"Foto Kunjungan : ",-1),ue=i("span",{style:{color:"red"}},"*",-1),de=i("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1),me=i("span",{style:{color:"red"}},"*",-1),pe=i("span",{class:"subtitle-1 text-center"},"Buku Nikah : ",-1),fe=i("span",{style:{color:"red"}},"*",-1),he=i("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1),ce=i("span",{style:{color:"red"}},"*",-1),Fe=i("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1),ge=i("span",{style:{color:"red"}},"*",-1),Ve=i("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1),ye=i("span",{style:{color:"red"}},"*",-1),be=i("span",{class:"subtitle-1 text-center"},"Lampirkan Salah Satu Jenis Jaminan : ",-1),_e=i("span",{style:{color:"red"}},"*",-1),ve=i("span",{class:"subtitle-1 text-center"},"Jaminan SHM : ",-1);function ke(s,e,d,m,l,r){const V=A("EasyDataTable");return f(),_(P,null,[a(q,{absolute:!0,modelValue:l.overlay,"onUpdate:modelValue":e[0]||(e[0]=t=>l.overlay=t),contained:"",persistent:"",class:"align-center justify-center"},{default:o(()=>[a(n,null,{default:o(()=>[a(U,{color:"primary",size:"32",indeterminate:""}),H,W]),_:1})]),_:1},8,["modelValue"]),a(T,null,{default:o(()=>[a(M,{class:"text-2xl font-weight-bold d-flex justify-left"},{default:o(()=>[p(" List Credit ")]),_:1}),a(K,{modelValue:l.tab,"onUpdate:modelValue":e[1]||(e[1]=t=>l.tab=t),class:"v-tabs-pill","bg-color":"secondary"},{default:o(()=>[a(y,{value:"0"},{default:o(()=>[p("Semua")]),_:1}),a(y,{value:"1"},{default:o(()=>[p("Approved")]),_:1}),a(y,{value:"2"},{default:o(()=>[p("Pending")]),_:1}),a(y,{value:"3"},{default:o(()=>[p("Rejected")]),_:1})]),_:1},8,["modelValue"]),a(N,null,{default:o(()=>[a(E,{modelValue:l.tab,"onUpdate:modelValue":e[4]||(e[4]=t=>l.tab=t)},{default:o(()=>[(f(!0),_(P,null,j(l.phases,t=>(f(),c(L,{value:t.value},{default:o(()=>[a(w,{class:"d-flex justify-end pa-3"},{default:o(()=>[l.userAccess&&l.userAccess.canInsertData?(f(),c(x,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[2]||(e[2]=u=>r.openModal(1))},{default:o(()=>[p(" Tambah Data ")]),_:1})):F("",!0),a(z),a(g,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:l.searchValue,"onUpdate:modelValue":e[3]||(e[3]=u=>l.searchValue=u)},null,8,["modelValue"])]),_:1}),a(V,{"show-index":"",headers:l.headers,items:l.items,"search-value":l.searchValue},{"empty-message":o(()=>[Q]),loading:o(()=>[X]),"item-plafon":o(u=>[p("Rp. "+C(r.formatInput(u.plafon))+",-",1)]),"item-isApproved":o(u=>[p(C(u.plafon>="25000000"?u.isApproved?"Approved":"Pending":u.phase>3||u.isApproved?"Approved":"Pending"),1)]),"item-operation":o(u=>[i("div",Y,[i("button",null,[a(D,{size:"20",icon:"bx-file-find",color:"blue",onClick:S=>r.toDetail(u)},null,8,["onClick"])]),p("   "),l.userData&&u.user_id==l.userData.id?(f(),_("button",{key:0,onClick:S=>r.deleteFile(u)},[a(D,{size:"20",icon:"bx-trash",color:"red"})],8,Z)):F("",!0)])]),_:2},1032,["headers","items","search-value"])]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),a(R,{modelValue:l.insert,"onUpdate:modelValue":e[24]||(e[24]=t=>l.insert=t),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[a(T,null,{title:o(()=>[p(" Tambah Data ")]),text:o(()=>[a(O,{onSubmit:I(r.insertData,["prevent"])},{default:o(()=>[a(w,null,{default:o(()=>[a(n,{md:"12",cols:"12"},{default:o(()=>[$,ee,a(g,{class:"my-3",modelValue:l.dataForm.name,"onUpdate:modelValue":e[5]||(e[5]=t=>l.dataForm.name=t),autofocus:"",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(n,{md:"12",cols:"12"},{default:o(()=>[le,se,a(g,{class:"my-3",modelValue:l.dataForm.plafon,"onUpdate:modelValue":e[6]||(e[6]=t=>l.dataForm.plafon=t),type:"text",onInput:r.formatInputPlafon},null,8,["modelValue","onInput"])]),_:1}),a(n,{md:"12",cols:"12"},{default:o(()=>[ae,te,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[7]||(e[7]=t=>r.handleFileChange(t,"file1"))},null,8,["rules"])]),_:1}),a(n,{md:"12",cols:"12"},{default:o(()=>[oe,ie,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[8]||(e[8]=t=>r.handleFileChange(t,"file4"))},null,8,["rules"])]),_:1}),a(n,{md:"12",cols:"12"},{default:o(()=>[re,ne,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[9]||(e[9]=t=>r.handleFileChange(t,"file10"))},null,8,["rules"])]),_:1}),a(v,{thickness:5}),a(n,{cols:"12",md:"12"},{default:o(()=>[a(k,{modelValue:l.dataForm.hasFile2,"onUpdate:modelValue":e[10]||(e[10]=t=>l.dataForm.hasFile2=t),label:"Apakah pemohon sudah menikah?",onChange:e[11]||(e[11]=t=>(r.resetFile("file2"),r.resetFile("file5")))},null,8,["modelValue"])]),_:1}),a(v,{thickness:5}),l.dataForm.hasFile2?(f(),c(n,{key:0,md:"12",cols:"12"},{default:o(()=>[ue,de,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[12]||(e[12]=t=>r.handleFileChange(t,"file2"))},null,8,["rules"])]),_:1})):F("",!0),l.dataForm.hasFile2?(f(),c(n,{key:1,md:"12",cols:"12"},{default:o(()=>[me,pe,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[13]||(e[13]=t=>r.handleFileChange(t,"file5"))},null,8,["rules"])]),_:1})):F("",!0),a(n,{cols:"12",md:"12"},{default:o(()=>[a(k,{modelValue:l.dataForm.hasFile3,"onUpdate:modelValue":e[14]||(e[14]=t=>l.dataForm.hasFile3=t),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[15]||(e[15]=t=>r.resetFile("file3"))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile3?(f(),c(n,{key:2,md:"12",cols:"12"},{default:o(()=>[fe,he,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[16]||(e[16]=t=>r.handleFileChange(t,"file3"))},null,8,["rules"])]),_:1})):F("",!0),a(v,{thickness:5}),a(n,{md:"12",cols:"12"},{default:o(()=>[ce,Fe,a(g,{class:"my-3",modelValue:l.dataForm.type_bussiness,"onUpdate:modelValue":e[17]||(e[17]=t=>l.dataForm.type_bussiness=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(n,{md:"12",cols:"12"},{default:o(()=>[ge,Ve,a(g,{class:"my-3",modelValue:l.dataForm.desc_bussiness,"onUpdate:modelValue":e[18]||(e[18]=t=>l.dataForm.desc_bussiness=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(n,null,{default:o(()=>[ye,be]),_:1}),a(n,{cols:"12",md:"12"},{default:o(()=>[a(k,{modelValue:l.dataForm.hasFile7,"onUpdate:modelValue":e[19]||(e[19]=t=>l.dataForm.hasFile7=t),label:"Jenis Jaminan SHM ?",onChange:e[20]||(e[20]=t=>r.resetFile("file7"))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile7?(f(),c(n,{key:3,md:"12",cols:"12"},{default:o(()=>[_e,ve,a(h,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[21]||(e[21]=t=>r.handleFileChange(t,"file7"))},null,8,["rules"])]),_:1})):F("",!0),a(n,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(x,{type:"submit",disabled:l.dataForm.hasFile2&&(l.dataForm.file2==null||l.dataForm.file5==null)||l.dataForm.hasFile3&&l.dataForm.file3==null||l.dataForm.hasFile7&&l.dataForm.file7==null||l.dataForm.hasFile8&&l.dataForm.file8==null||l.dataForm.hasFile9&&l.dataForm.file9==null||l.dataForm.file7==null&&l.dataForm.file8==null&&l.dataForm.file9==null||l.dataForm.type_bussiness==null&&l.dataForm.desc_bussiness==null},{default:o(()=>[p(" Simpan ")]),_:1},8,["disabled"]),i("button",{type:"button",class:"btn btn-blue",onClick:e[22]||(e[22]=t=>r.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:o(()=>[a(J,{modelValue:l.uploadProgress,"onUpdate:modelValue":e[23]||(e[23]=t=>l.uploadProgress=t),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const Ee=B(G,[["render",ke]]);export{Ee as default};

import{m as V}from"./index-47d0c37e.js";import{r as B,o as d,c as y,a,w as o,G as T,E as N,e as g,F as K,h as f,V as A,f as m,t as q,b as n,K as x,i as w,d as J,a0 as M}from"./main-d091fdce.js";import{_ as O}from"./_plugin-vue_export-helper-c27b6911.js";import{V as R}from"./VOverlay-deddb96b.js";import{V as j,d as r,e as E,b as W,c as S}from"./VRow-496a1d77.js";import{V as z,a as v}from"./VTabs-fe990f39.js";import{V as L,a as G,b as F}from"./VWindowItem-340940f9.js";import{V as H}from"./VSpacer-a6411126.js";import{a as h,V as Q}from"./VTextField-1c7b49ba.js";import{V as P}from"./VTooltip-711168fe.js";import{V as X}from"./VDialog-82485fc6.js";import{V as U,a as D}from"./VRadioGroup-054e51e1.js";import{V as k}from"./VDivider-ac36822b.js";import{V as I}from"./VCheckbox-e02f0044.js";import"./VImg-6c66016d.js";import"./VChip-cf9d5d2e.js";import"./dialog-transition-fca11031.js";import"./VCheckboxBtn-d998bab0.js";const Y={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(s){this.dataForm.plafon=s.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(s){this.dataForm.plafon=s.replace(/\D/g,"")}}},data(){return{selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:s=>!!s||"Required"},role:{canDownload:0},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(s){s==1?this.filterDataStatus(1):s==2?this.filterDataStatus(2):s==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{async downloadFile(s){try{this.overlay=!0;const e=await V.get(`/download-all/${s}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const p=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=p,u.setAttribute("download",`${s}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch(e){this.overlay=!1,console.log(e),this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(s){return s=s.replace(/\D/g,""),s=s.replace(/\B(?=(\d{3})+(?!\d))/g,","),s},toDetail(s){this.$router.push(`/u-credit/${s.id}`)},async deleteFile(s){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const p=await V.delete(`/user/credit/${s.id}`);p.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",p.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",p.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(s){!this.dataForm[s]!=null&&(this.dataForm[s]=null)},handleFileChange(s,e){const p=s.target.files[0];p&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(p.type)?(this.dataForm[e]=p,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),s.target.value=null)},async openModal(s,e=null){s===1?this.insert=!0:s===2&&console.log("masuk")},closeModal(s){s===1?(this.resetForm(),this.insert=!1):s===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},formatNumber(s){return s?s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(s){this.items=this.originalItems.filter(e=>e.isApproved==s)},getUserData(){const s=localStorage.getItem("userData");s&&(this.userData=JSON.parse(s))},async getAllFiles(){try{const s=await V.get("/user/credit");s.status===200?(this.items=s.data.data.files,this.userAccess=s.data.data.userAccess,this.role=s.data.data.role,this.originalItems=[...this.items]):this.$showToast("error","Sorry",s.data.data.message)}catch(s){this.$showToast("error","Sorry",s.response.data.message)}},formatInputPlafon(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},async insertData(){try{this.overlay=!0;const s=new FormData;s.append("name",this.dataForm.name),s.append("nik_pemohon",this.dataForm.nik_pemohon),s.append("address",this.dataForm.address),s.append("no_hp",this.dataForm.no_hp),s.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),s.append("type_bussiness",this.dataForm.type_bussiness),s.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&s.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&s.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let l="file"+u,i="noteFile"+u,b="hasFile"+u;this.dataForm.hasOwnProperty(b)&&this.dataForm[b]||this.dataForm[l]?this.dataForm[l]&&(s.append(l,this.dataForm[l]),s.append(i,this.dataForm[i])):this.dataForm[l]&&s.append(l,this.dataForm[l])}s.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(l){console.error("Error calculating progress:",l)}},headers:{"Content-Type":"multipart/form-data"}},p=await V.post("/user/credit",s,e);p.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",p.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",p.data.message))}catch(s){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",s.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}},Z=n("br",null,null,-1),$=n("span",{class:"font-weight-bold text-lg"},"Loading....",-1),ee=n("p",null,"Data Kosong",-1),le=n("p",null,"loading data .....",-1),se={key:0},ae={key:1},te={key:2},oe={class:"operation-wrapper"},ne={class:"d-flex justify-space-between"},ie=["onClick"],re=["onClick"],de=["onClick"],ue=n("span",{style:{color:"red"}},"*",-1),me=n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1),pe=n("span",{style:{color:"red"}},"*",-1),ce=n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1),fe=n("span",{style:{color:"red"}},"*",-1),he=n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1),ge=n("span",{style:{color:"red"}},"*",-1),Fe=n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1),_e=n("span",{style:{color:"red"}},"*",-1),ye=n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1),be=n("span",{style:{color:"red"}},"*",-1),Ve=n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1),ve=n("span",{style:{color:"red"}},"*",-1),ke=n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1),xe=n("span",{style:{color:"red"}},"*",-1),we=n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1),Pe=n("span",{style:{color:"red"}},"*",-1),De=n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1),Ce=n("span",{style:{color:"red"}},"*",-1),Te=n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1),Ae=n("span",{style:{color:"red"}},"*",-1),je=n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1),Se=n("span",{style:{color:"red"}},"*",-1),Ue=n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1),Ie=n("span",{style:{color:"red"}},"*",-1),Be=n("span",{class:"subtitle-1 text-center"},"Pilih Salah Satu Kelengkapan : ",-1),Ne=n("span",{style:{color:"red"}},"*",-1),Ke=n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1),qe=n("span",{style:{color:"red"}},"*",-1),Je=n("span",{class:"subtitle-1 text-center"},"Jaminan SHM:",-1),Me=n("span",{style:{color:"red"}},"*",-1),Oe=n("span",{class:"subtitle-1 text-center"},"Jaminan BPKB:",-1),Re=n("span",{style:{color:"red"}},"*",-1),Ee=n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1),We=n("span",{style:{color:"red"}},"*",-1),ze=n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1),Le=n("span",{style:{color:"red"}},"*",-1),Ge=n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1),He=n("span",{style:{color:"red"}},"*",-1),Qe=n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1);function Xe(s,e,p,u,l,i){const b=B("EasyDataTable");return d(),y(T,null,[a(R,{absolute:!0,modelValue:l.overlay,"onUpdate:modelValue":e[0]||(e[0]=t=>l.overlay=t),contained:"",persistent:"",class:"align-center justify-center"},{default:o(()=>[a(r,null,{default:o(()=>[a(N,{color:"primary",size:"32",indeterminate:""}),Z,$]),_:1})]),_:1},8,["modelValue"]),a(j,null,{default:o(()=>[a(E,{class:"text-2xl font-weight-bold d-flex justify-left"},{default:o(()=>[g(" List Credit ")]),_:1}),a(z,{modelValue:l.tab,"onUpdate:modelValue":e[1]||(e[1]=t=>l.tab=t),class:"v-tabs-pill","bg-color":"secondary"},{default:o(()=>[a(v,{value:"0"},{default:o(()=>[g("Semua")]),_:1}),a(v,{value:"1"},{default:o(()=>[g("Approved")]),_:1}),a(v,{value:"2"},{default:o(()=>[g("Pending")]),_:1}),a(v,{value:"3"},{default:o(()=>[g("Rejected")]),_:1})]),_:1},8,["modelValue"]),a(W,null,{default:o(()=>[a(L,{modelValue:l.tab,"onUpdate:modelValue":e[4]||(e[4]=t=>l.tab=t)},{default:o(()=>[(d(!0),y(T,null,K(l.phases,t=>(d(),f(G,{value:t.value},{default:o(()=>[a(S,{class:"d-flex justify-end pa-3"},{default:o(()=>[l.userAccess&&parseInt(l.userAccess.canInsertData)?(d(),f(A,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[2]||(e[2]=c=>i.openModal(1))},{default:o(()=>[g(" Tambah Data ")]),_:1})):m("",!0),a(H),a(h,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:l.searchValue,"onUpdate:modelValue":e[3]||(e[3]=c=>l.searchValue=c)},null,8,["modelValue"])]),_:1}),a(b,{"show-index":"",headers:l.headers,items:l.items,"search-value":l.searchValue},{"empty-message":o(()=>[ee]),loading:o(()=>[le]),"item-plafon":o(c=>[g("Rp. "+q(i.formatInput(c.plafon))+",-",1)]),"item-isApproved":o(c=>[parseInt(c.isApproved)==1?(d(),y("span",se," Approved")):m("",!0),parseInt(c.isApproved)==2?(d(),y("span",ae," Pending")):m("",!0),parseInt(c.isApproved)==3?(d(),y("span",te," Rejected")):m("",!0)]),"item-operation":o(c=>[n("div",oe,[n("div",ne,[a(P,{location:"top",text:"Detail Kredit"},{activator:o(({props:_})=>[n("button",x(_,{onClick:C=>i.toDetail(c)}),[a(w,{size:"20",icon:"bx-link-external",color:"blue"})],16,ie)]),_:2},1024),l.userData&&c.user_id==l.userData.id?(d(),f(P,{key:0,location:"top",text:"Hapus Kredit"},{activator:o(({props:_})=>[n("button",x(_,{onClick:C=>i.deleteFile(c)}),[a(w,{size:"20",icon:"bx-trash",color:"red"})],16,re)]),_:2},1024)):m("",!0),l.role&&l.role.canDownload==1?(d(),f(P,{key:1,location:"top",text:"Download Semua File Kredit"},{activator:o(({props:_})=>[n("button",x(_,{onClick:C=>i.downloadFile(c.id)}),[a(w,{size:"20",icon:"bx-download",color:"red"})],16,de)]),_:2},1024)):m("",!0)])])]),_:1},8,["headers","items","search-value"])]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),a(X,{modelValue:l.insert,"onUpdate:modelValue":e[31]||(e[31]=t=>l.insert=t),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[a(j,null,{title:o(()=>[g(" Tambah Data s")]),text:o(()=>[a(Q,{onSubmit:J(i.insertData,["prevent"])},{default:o(()=>[a(S,null,{default:o(()=>[a(r,{md:"12",cols:"12"},{default:o(()=>[ue,me,a(h,{class:"my-3",modelValue:l.dataForm.name,"onUpdate:modelValue":e[5]||(e[5]=t=>l.dataForm.name=t),autofocus:"",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[pe,ce,a(h,{class:"my-3",modelValue:i.formattedPlafon,"onUpdate:modelValue":e[6]||(e[6]=t=>i.formattedPlafon=t),type:"text",onInput:i.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[fe,he,a(h,{class:"my-3",modelValue:l.dataForm.nik_pemohon,"onUpdate:modelValue":e[7]||(e[7]=t=>l.dataForm.nik_pemohon=t),type:"number",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[ge,Fe,a(h,{class:"my-3",modelValue:l.dataForm.address,"onUpdate:modelValue":e[8]||(e[8]=t=>l.dataForm.address=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[_e,ye,a(h,{class:"my-3",modelValue:l.dataForm.no_hp,"onUpdate:modelValue":e[9]||(e[9]=t=>l.dataForm.no_hp=t),type:"number",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[be,Ve,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[10]||(e[10]=t=>i.handleFileChange(t,"file1"))},null,8,["rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[ve,ke,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[11]||(e[11]=t=>i.handleFileChange(t,"file4"))},null,8,["rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[xe,we,a(U,{modelValue:l.selectedPhoto,"onUpdate:modelValue":e[12]||(e[12]=t=>l.selectedPhoto=t),mandatory:!0,row:""},{default:o(()=>[a(D,{label:"Foto Kunjungan",value:"fotoKunjungan"}),a(D,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),l.selectedPhoto==="fotoKunjungan"?(d(),f(r,{key:0,md:"12",cols:"12"},{default:o(()=>[Pe,De,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[13]||(e[13]=t=>{i.handleFileChange(t,"file10"),i.resetFile("file11")})},null,8,["rules"])]),_:1})):m("",!0),l.selectedPhoto==="fotoWhatsApp"?(d(),f(r,{key:1,md:"12",cols:"12"},{default:o(()=>[Ce,Te,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[14]||(e[14]=t=>{i.handleFileChange(t,"file11"),i.resetFile("file10")})},null,8,["rules"])]),_:1})):m("",!0),a(k,{thickness:5}),a(r,{cols:"12",md:"12"},{default:o(()=>[a(I,{modelValue:l.dataForm.hasFile2,"onUpdate:modelValue":e[15]||(e[15]=t=>l.dataForm.hasFile2=t),label:"Apakah pemohon sudah menikah?",onChange:e[16]||(e[16]=t=>(i.resetFile("file2"),l.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),a(k,{thickness:5}),l.dataForm.hasFile2?(d(),f(r,{key:2,md:"12",cols:"12"},{default:o(()=>[Ae,je,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[17]||(e[17]=t=>i.handleFileChange(t,"file2"))},null,8,["rules"])]),_:1})):m("",!0),l.dataForm.hasFile2?(d(),f(r,{key:3,md:"12",cols:"12"},{default:o(()=>[Se,Ue,a(h,{class:"my-3",type:"number",modelValue:l.dataForm.nik_pasangan,"onUpdate:modelValue":e[18]||(e[18]=t=>l.dataForm.nik_pasangan=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):m("",!0),a(r,{md:"12",cols:"12"},{default:o(()=>[Ie,Be,a(U,{modelValue:l.selectedOption,"onUpdate:modelValue":e[19]||(e[19]=t=>l.selectedOption=t),mandatory:!0,row:""},{default:o(()=>[a(D,{label:"Buku Nikah",value:"bukuNikah"})]),_:1},8,["modelValue"])]),_:1}),l.selectedOption==="bukuNikah"?(d(),f(r,{key:4,md:"12",cols:"12"},{default:o(()=>[Ne,Ke,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[20]||(e[20]=t=>{i.handleFileChange(t,"file5"),i.resetFile("file7"),i.resetFile("file8")})},null,8,["rules"])]),_:1})):m("",!0),l.selectedOption==="jaminanSHM"?(d(),f(r,{key:5,md:"12",cols:"12"},{default:o(()=>[qe,Je,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[21]||(e[21]=t=>{i.handleFileChange(t,"file7"),i.resetFile("file5"),i.resetFile("file8")})},null,8,["rules"])]),_:1})):m("",!0),l.selectedOption==="jaminanBPKB"?(d(),f(r,{key:6,md:"12",cols:"12"},{default:o(()=>[Me,Oe,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[22]||(e[22]=t=>{i.handleFileChange(t,"file8"),i.resetFile("file5"),i.resetFile("file7")})},null,8,["rules"])]),_:1})):m("",!0),a(k,{thickness:5}),a(r,{cols:"12",md:"12"},{default:o(()=>[a(I,{modelValue:l.dataForm.hasFile3,"onUpdate:modelValue":e[23]||(e[23]=t=>l.dataForm.hasFile3=t),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[24]||(e[24]=t=>(i.resetFile("file3"),l.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile3?(d(),f(r,{key:7,md:"12",cols:"12"},{default:o(()=>[Re,Ee,a(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[25]||(e[25]=t=>i.handleFileChange(t,"file3"))},null,8,["rules"])]),_:1})):m("",!0),l.dataForm.hasFile3?(d(),f(r,{key:8,md:"12",cols:"12"},{default:o(()=>[We,ze,a(h,{class:"my-3",type:"number",modelValue:l.dataForm.nik_jaminan,"onUpdate:modelValue":e[26]||(e[26]=t=>l.dataForm.nik_jaminan=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):m("",!0),a(k,{thickness:5}),a(r,{md:"12",cols:"12"},{default:o(()=>[Le,Ge,a(h,{class:"my-3",modelValue:l.dataForm.type_bussiness,"onUpdate:modelValue":e[27]||(e[27]=t=>l.dataForm.type_bussiness=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"12",cols:"12"},{default:o(()=>[He,Qe,a(h,{class:"my-3",modelValue:l.dataForm.desc_bussiness,"onUpdate:modelValue":e[28]||(e[28]=t=>l.dataForm.desc_bussiness=t),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(A,{type:"submit",disabled:l.dataForm.name==null||l.dataForm.plafon==null||l.dataForm.type_bussiness==null||l.dataForm.desc_bussiness==null||l.dataForm.file1==null||l.dataForm.file4==null||l.dataForm.file10==null&&l.dataForm.file11==null||l.dataForm.file5==null},{default:o(()=>[g(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[29]||(e[29]=t=>i.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:o(()=>[a(M,{modelValue:l.uploadProgress,"onUpdate:modelValue":e[30]||(e[30]=t=>l.uploadProgress=t),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const hl=O(Y,[["render",Xe]]);export{hl as default};

import{m as V}from"./VGrid-bc82002c.js";import{r as N,o as d,c as y,a as t,w as o,G as A,E as q,b as n,i as v,e as h,t as k,F as K,h as f,V as S,f as p,M as P,d as O,a2 as M}from"./main-1510af4a.js";import{_ as J}from"./_plugin-vue_export-helper-c27b6911.js";import{V as R}from"./VOverlay-6a173b06.js";import{V as j,d as i,a as E,e as W,b as L,c as B}from"./VRow-e65ce29b.js";import{V as z,a as x}from"./VTabs-a48221e4.js";import{V as G,a as H}from"./VWindowItem-2dfbd3eb.js";import{V as Y}from"./VSpacer-03a11f85.js";import{a as g,V as Q}from"./VTextField-7c474d53.js";import{V as D}from"./VTooltip-0c0527b2.js";import{V as X}from"./VDialog-7a40b249.js";import{V as F}from"./VFileInput-167590a5.js";import{V as I,a as C}from"./VRadioGroup-91f74f05.js";import{V as w}from"./VDivider-272b0910.js";import{V as U}from"./VCheckbox-90ed254c.js";import"./VImg-8f311b38.js";import"./index-5b1dd9ba.js";import"./VInput-d4f2f5c1.js";import"./dialog-transition-3a7bc416.js";import"./VChip-aafad41a.js";import"./VCheckboxBtn-28ae77bc.js";const Z={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(a){this.dataForm.plafon=a.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(a){this.dataForm.plafon=a.replace(/\D/g,"")}}},data(){return{monthYear:this.$route.params.monthYear,selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:a=>!!a||"Required"},role:{canDownload:0},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(a){a==1?this.filterDataStatus(1):a==2?this.filterDataStatus(2):a==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{goBack(){this.$router.push("/u-credit")},toPage(){this.$router.push("/u-indexfilter")},formatDate(a){return new Date(a).toLocaleString("id-ID")},async downloadFile(a){try{this.overlay=!0;const e=await V.get(`/download-all/${a}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const c=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=c,u.setAttribute("download",`${a}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(a){return a=a.replace(/\D/g,""),a=a.replace(/\B(?=(\d{3})+(?!\d))/g,","),a},toDetail(a){this.$router.push(`/u-credit/${a.id}`)},async deleteFile(a){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const c=await V.delete(`/user/credit/${a.id}`);c.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",c.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",c.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(a){!this.dataForm[a]!=null&&(this.dataForm[a]=null)},handleFileChange(a,e){const c=a.target.files[0];c&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(c.type)?(this.dataForm[e]=c,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),a.target.value=null)},async openModal(a,e=null){a===1&&(this.insert=!0)},closeModal(a){a===1?(this.resetForm(),this.insert=!1):a===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(a){let e=a.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),a.target.value=e},formatNumber(a){return a?a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(a){this.items=this.originalItems.filter(e=>e.isApproved==a)},getUserData(){const a=localStorage.getItem("userData");a&&(this.userData=JSON.parse(a))},async getAllFiles(){try{this.overlay=!0;const a=new FormData;a.append("monthYear",this.monthYear);const e=await V.post("/user/getCredit",a);e.status===200?(this.items=e.data.data.files,this.userAccess=e.data.data.userAccess,this.role=e.data.data.role,this.originalItems=[...this.items],this.overlay=!1):(this.overlay=!1,this.$showToast("error","Sorry",e.data.data.message))}catch(a){this.overlay=!1,this.$showToast("error","Sorry",a.response.data.message)}},formatInputPlafon(a){let e=a.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),a.target.value=e},async insertData(){try{this.overlay=!0;const a=new FormData;a.append("name",this.dataForm.name),a.append("nik_pemohon",this.dataForm.nik_pemohon),a.append("address",this.dataForm.address),a.append("no_hp",this.dataForm.no_hp),a.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),a.append("type_bussiness",this.dataForm.type_bussiness),a.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&a.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&a.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let l="file"+u,r="noteFile"+u,b="hasFile"+u;this.dataForm.hasOwnProperty(b)&&this.dataForm[b]||this.dataForm[l]?this.dataForm[l]&&(a.append(l,this.dataForm[l]),a.append(r,this.dataForm[r])):this.dataForm[l]&&a.append(l,this.dataForm[l])}a.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(l){console.error("Error calculating progress:",l)}},headers:{"Content-Type":"multipart/form-data"}},c=await V.post("/user/credit",a,e);c.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",c.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",c.data.message))}catch(a){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",a.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}},$=n("br",null,null,-1),ee=n("span",{class:"font-weight-bold text-lg"},"Loading....",-1),le=n("p",null,"Data Kosong",-1),ae=n("p",null,"loading data .....",-1),te={key:0},se={key:1},oe={key:2},ne={class:"operation-wrapper"},re={class:"d-flex justify-space-between"},ie=["onClick"],de=["onClick"],ue=["onClick"],me=n("span",{style:{color:"red"}},"*",-1),pe=n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1),ce=n("span",{style:{color:"red"}},"*",-1),fe=n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1),he=n("span",{style:{color:"red"}},"*",-1),ge=n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1),Fe=n("span",{style:{color:"red"}},"*",-1),_e=n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1),ye=n("span",{style:{color:"red"}},"*",-1),be=n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1),Ve=n("span",{style:{color:"red"}},"*",-1),ve=n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1),ke=n("span",{style:{color:"red"}},"*",-1),xe=n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1),we=n("span",{style:{color:"red"}},"*",-1),Pe=n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1),De=n("span",{style:{color:"red"}},"*",-1),Ce=n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1),Te=n("span",{style:{color:"red"}},"*",-1),Ae=n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1),Se=n("span",{style:{color:"red"}},"*",-1),je=n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1),Be=n("span",{style:{color:"red"}},"*",-1),Ie=n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1),Ue=n("span",{style:{color:"red"}},"*",-1),Ne=n("span",{class:"subtitle-1 text-center"},"Pilih Salah Satu Kelengkapan : ",-1),qe=n("span",{style:{color:"red"}},"*",-1),Ke=n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1),Oe=n("span",{style:{color:"red"}},"*",-1),Me=n("span",{class:"subtitle-1 text-center"},"Jaminan SHM:",-1),Je=n("span",{style:{color:"red"}},"*",-1),Re=n("span",{class:"subtitle-1 text-center"},"Jaminan BPKB:",-1),Ee=n("span",{style:{color:"red"}},"*",-1),We=n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1),Le=n("span",{style:{color:"red"}},"*",-1),ze=n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1),Ge=n("span",{style:{color:"red"}},"*",-1),He=n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1),Ye=n("span",{style:{color:"red"}},"*",-1),Qe=n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1);function Xe(a,e,c,u,l,r){const b=N("EasyDataTable");return d(),y(A,null,[t(R,{absolute:!0,modelValue:l.overlay,"onUpdate:modelValue":e[0]||(e[0]=s=>l.overlay=s),contained:"",persistent:"",class:"align-center justify-center"},{default:o(()=>[t(i,null,{default:o(()=>[t(q,{color:"primary",size:"32",indeterminate:""}),$,ee]),_:1})]),_:1},8,["modelValue"]),t(j,null,{default:o(()=>[t(E,{class:"align-left"},{default:o(()=>[n("span",{color:"primary",onClick:e[1]||(e[1]=(...s)=>r.goBack&&r.goBack(...s)),style:{cursor:"pointer"}},[t(v,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),h(" Back ")]),t(W,{class:"text-2xl font-weight-bold"},{default:o(()=>[h(" List Credit "+k(l.monthYear),1)]),_:1})]),_:1}),t(z,{modelValue:l.tab,"onUpdate:modelValue":e[2]||(e[2]=s=>l.tab=s),class:"v-tabs-pill","bg-color":"secondary"},{default:o(()=>[t(x,{value:"0"},{default:o(()=>[h("Semua")]),_:1}),t(x,{value:"1"},{default:o(()=>[h("Approved")]),_:1}),t(x,{value:"2"},{default:o(()=>[h("Pending")]),_:1}),t(x,{value:"3"},{default:o(()=>[h("Rejected")]),_:1})]),_:1},8,["modelValue"]),t(L,null,{default:o(()=>[t(G,{modelValue:l.tab,"onUpdate:modelValue":e[5]||(e[5]=s=>l.tab=s)},{default:o(()=>[(d(!0),y(A,null,K(l.phases,s=>(d(),f(H,{value:s.value},{default:o(()=>[t(B,{class:"d-flex justify-end pa-3"},{default:o(()=>[l.userAccess&&parseInt(l.userAccess.canInsertData)?(d(),f(S,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[3]||(e[3]=m=>r.openModal(1))},{default:o(()=>[h(" Tambah Data ")]),_:1})):p("",!0),t(Y),t(g,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:l.searchValue,"onUpdate:modelValue":e[4]||(e[4]=m=>l.searchValue=m)},null,8,["modelValue"])]),_:1}),t(b,{"show-index":"",headers:l.headers,items:l.items,"search-value":l.searchValue},{"empty-message":o(()=>[le]),loading:o(()=>[ae]),"item-plafon":o(m=>[h("Rp. "+k(r.formatInput(m.plafon))+",-",1)]),"item-isApproved":o(m=>[parseInt(m.isApproved)==1?(d(),y("span",te," Approved")):p("",!0),parseInt(m.isApproved)==2?(d(),y("span",se," Pending")):p("",!0),parseInt(m.isApproved)==3?(d(),y("span",oe," Rejected")):p("",!0)]),"item-aoro":o(m=>[n("span",null,k(m.user.name),1)]),"item-created_at":o(m=>[n("span",null,k(r.formatDate(m.created_at))+" WIB",1)]),"item-operation":o(m=>[n("div",ne,[n("div",re,[t(D,{location:"top",text:"Detail Kredit"},{activator:o(({props:_})=>[n("button",P(_,{onClick:T=>r.toDetail(m)}),[t(v,{size:"20",icon:"bx-link-external",color:"blue"})],16,ie)]),_:2},1024),l.userData&&m.user_id==l.userData.id?(d(),f(D,{key:0,location:"top",text:"Hapus Kredit"},{activator:o(({props:_})=>[n("button",P(_,{onClick:T=>r.deleteFile(m)}),[t(v,{size:"20",icon:"bx-trash",color:"red"})],16,de)]),_:2},1024)):p("",!0),l.role&&l.role.canDownload==1?(d(),f(D,{key:1,location:"top",text:"Download Semua File Kredit"},{activator:o(({props:_})=>[n("button",P(_,{onClick:T=>r.downloadFile(m.id)}),[t(v,{size:"20",icon:"bx-download",color:"red"})],16,ue)]),_:2},1024)):p("",!0)])])]),_:1},8,["headers","items","search-value"])]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),t(X,{modelValue:l.insert,"onUpdate:modelValue":e[32]||(e[32]=s=>l.insert=s),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[t(j,null,{title:o(()=>[h(" Tambah Data")]),text:o(()=>[t(Q,{onSubmit:O(r.insertData,["prevent"])},{default:o(()=>[t(B,null,{default:o(()=>[t(i,{md:"12",cols:"12"},{default:o(()=>[me,pe,t(g,{class:"my-3",modelValue:l.dataForm.name,"onUpdate:modelValue":e[6]||(e[6]=s=>l.dataForm.name=s),autofocus:"",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[ce,fe,t(g,{class:"my-3",modelValue:r.formattedPlafon,"onUpdate:modelValue":e[7]||(e[7]=s=>r.formattedPlafon=s),type:"text",onInput:r.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[he,ge,t(g,{class:"my-3",modelValue:l.dataForm.nik_pemohon,"onUpdate:modelValue":e[8]||(e[8]=s=>l.dataForm.nik_pemohon=s),type:"number",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[Fe,_e,t(g,{class:"my-3",modelValue:l.dataForm.address,"onUpdate:modelValue":e[9]||(e[9]=s=>l.dataForm.address=s),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[ye,be,t(g,{class:"my-3",modelValue:l.dataForm.no_hp,"onUpdate:modelValue":e[10]||(e[10]=s=>l.dataForm.no_hp=s),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[Ve,ve,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[11]||(e[11]=s=>r.handleFileChange(s,"file1"))},null,8,["rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[ke,xe,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[12]||(e[12]=s=>r.handleFileChange(s,"file4"))},null,8,["rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[we,Pe,t(I,{modelValue:l.selectedPhoto,"onUpdate:modelValue":e[13]||(e[13]=s=>l.selectedPhoto=s),mandatory:!0,row:""},{default:o(()=>[t(C,{label:"Foto Kunjungan",value:"fotoKunjungan"}),t(C,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),l.selectedPhoto==="fotoKunjungan"?(d(),f(i,{key:0,md:"12",cols:"12"},{default:o(()=>[De,Ce,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[14]||(e[14]=s=>{r.handleFileChange(s,"file10"),r.resetFile("file11")})},null,8,["rules"])]),_:1})):p("",!0),l.selectedPhoto==="fotoWhatsApp"?(d(),f(i,{key:1,md:"12",cols:"12"},{default:o(()=>[Te,Ae,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[15]||(e[15]=s=>{r.handleFileChange(s,"file11"),r.resetFile("file10")})},null,8,["rules"])]),_:1})):p("",!0),t(w,{thickness:5}),t(i,{cols:"12",md:"12"},{default:o(()=>[t(U,{modelValue:l.dataForm.hasFile2,"onUpdate:modelValue":e[16]||(e[16]=s=>l.dataForm.hasFile2=s),label:"Apakah pemohon sudah menikah?",onChange:e[17]||(e[17]=s=>(r.resetFile("file2"),l.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),t(w,{thickness:5}),l.dataForm.hasFile2?(d(),f(i,{key:2,md:"12",cols:"12"},{default:o(()=>[Se,je,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[18]||(e[18]=s=>r.handleFileChange(s,"file2"))},null,8,["rules"])]),_:1})):p("",!0),l.dataForm.hasFile2?(d(),f(i,{key:3,md:"12",cols:"12"},{default:o(()=>[Be,Ie,t(g,{class:"my-3",type:"number",modelValue:l.dataForm.nik_pasangan,"onUpdate:modelValue":e[19]||(e[19]=s=>l.dataForm.nik_pasangan=s),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):p("",!0),t(i,{md:"12",cols:"12"},{default:o(()=>[Ue,Ne,t(I,{modelValue:l.selectedOption,"onUpdate:modelValue":e[20]||(e[20]=s=>l.selectedOption=s),mandatory:!0,row:""},{default:o(()=>[t(C,{label:"Buku Nikah",value:"bukuNikah"})]),_:1},8,["modelValue"])]),_:1}),l.selectedOption==="bukuNikah"?(d(),f(i,{key:4,md:"12",cols:"12"},{default:o(()=>[qe,Ke,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[21]||(e[21]=s=>{r.handleFileChange(s,"file5"),r.resetFile("file7"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):p("",!0),l.selectedOption==="jaminanSHM"?(d(),f(i,{key:5,md:"12",cols:"12"},{default:o(()=>[Oe,Me,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[22]||(e[22]=s=>{r.handleFileChange(s,"file7"),r.resetFile("file5"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):p("",!0),l.selectedOption==="jaminanBPKB"?(d(),f(i,{key:6,md:"12",cols:"12"},{default:o(()=>[Je,Re,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[23]||(e[23]=s=>{r.handleFileChange(s,"file8"),r.resetFile("file5"),r.resetFile("file7")})},null,8,["rules"])]),_:1})):p("",!0),t(w,{thickness:5}),t(i,{cols:"12",md:"12"},{default:o(()=>[t(U,{modelValue:l.dataForm.hasFile3,"onUpdate:modelValue":e[24]||(e[24]=s=>l.dataForm.hasFile3=s),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[25]||(e[25]=s=>(r.resetFile("file3"),l.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile3?(d(),f(i,{key:7,md:"12",cols:"12"},{default:o(()=>[Ee,We,t(F,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[26]||(e[26]=s=>r.handleFileChange(s,"file3"))},null,8,["rules"])]),_:1})):p("",!0),l.dataForm.hasFile3?(d(),f(i,{key:8,md:"12",cols:"12"},{default:o(()=>[Le,ze,t(g,{class:"my-3",type:"number",modelValue:l.dataForm.nik_jaminan,"onUpdate:modelValue":e[27]||(e[27]=s=>l.dataForm.nik_jaminan=s),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):p("",!0),t(w,{thickness:5}),t(i,{md:"12",cols:"12"},{default:o(()=>[Ge,He,t(g,{class:"my-3",modelValue:l.dataForm.type_bussiness,"onUpdate:modelValue":e[28]||(e[28]=s=>l.dataForm.type_bussiness=s),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(i,{md:"12",cols:"12"},{default:o(()=>[Ye,Qe,t(g,{class:"my-3",modelValue:l.dataForm.desc_bussiness,"onUpdate:modelValue":e[29]||(e[29]=s=>l.dataForm.desc_bussiness=s),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[t(S,{type:"submit",disabled:l.dataForm.name==null||l.dataForm.plafon==null||l.dataForm.type_bussiness==null||l.dataForm.desc_bussiness==null||l.dataForm.file1==null||l.dataForm.file4==null||l.dataForm.file10==null&&l.dataForm.file11==null},{default:o(()=>[h(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[30]||(e[30]=s=>r.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:o(()=>[t(M,{modelValue:l.uploadProgress,"onUpdate:modelValue":e[31]||(e[31]=s=>l.uploadProgress=s),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const yl=J(Z,[["render",Xe]]);export{yl as default};

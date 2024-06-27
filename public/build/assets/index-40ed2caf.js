import{m as v}from"./VGrid-8420da13.js";import{r as K,o as u,c as b,a as t,w as o,G as j,E as O,e as F,i as k,F as M,h,V as I,f as c,b as n,t as P,M as D,d as C,a2 as J,H as R,I as E}from"./main-4c48dd04.js";import{_ as W}from"./_plugin-vue_export-helper-c27b6911.js";import{V as L}from"./VOverlay-96c8691b.js";import{V as U,d,e as z,b as H,c as B}from"./VRow-5198dc3e.js";import{V as G,a as x}from"./VTabs-2840299f.js";import{V as Q,a as X}from"./VWindowItem-57c5c181.js";import{V as Y}from"./VSpacer-d6a9cf15.js";import{a as g,V as Z}from"./VTextField-2ec5fece.js";import{V as T}from"./VTooltip-30e7d14f.js";import{V as $}from"./VDialog-a381f5d1.js";import{V as _}from"./VFileInput-eda59af8.js";import{V as N,a as S}from"./VRadioGroup-647a3aa1.js";import{V as w}from"./VDivider-8ffd4665.js";import{V as q}from"./VCheckbox-6a2c56f8.js";import"./VImg-2ed9b3c5.js";import"./index-994a064d.js";import"./VInput-e419c36c.js";import"./dialog-transition-354189e1.js";import"./VChip-5c728bf9.js";import"./VCheckboxBtn-0e7751ad.js";const ee={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(s){this.dataForm.plafon=s.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(s){this.dataForm.plafon=s.replace(/\D/g,"")}}},data(){return{selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:s=>!!s||"Required"},role:{canDownload:0},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(s){s==1?this.filterDataStatus(1):s==2?this.filterDataStatus(2):s==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{toPage(){this.$router.push("/u-indexfilter")},formatDate(s){return new Date(s).toLocaleString("id-ID")},async downloadFile(s){try{this.overlay=!0;const e=await v.get(`/download-all/${s}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const f=window.URL.createObjectURL(new Blob([e.data])),m=document.createElement("a");m.href=f,m.setAttribute("download",`${s}.zip`),document.body.appendChild(m),m.click(),document.body.removeChild(m),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(s){return s=s.replace(/\D/g,""),s=s.replace(/\B(?=(\d{3})+(?!\d))/g,","),s},toDetail(s){this.$router.push(`/u-credit/${s.id}`)},async deleteFile(s){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const f=await v.delete(`/user/credit/${s.id}`);f.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",f.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",f.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(s){!this.dataForm[s]!=null&&(this.dataForm[s]=null)},handleFileChange(s,e){const f=s.target.files[0];f&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)?(this.dataForm[e]=f,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),s.target.value=null)},async openModal(s,e=null){s===1&&(this.insert=!0)},closeModal(s){s===1?(this.resetForm(),this.insert=!1):s===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},formatNumber(s){return s?s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(s){this.items=this.originalItems.filter(e=>e.isApproved==s)},getUserData(){const s=localStorage.getItem("userData");s&&(this.userData=JSON.parse(s))},async getAllFiles(){try{const s=await v.get("/user/credit");s.status===200?(this.items=s.data.data.files,this.userAccess=s.data.data.userAccess,this.role=s.data.data.role,this.originalItems=[...this.items]):this.$showToast("error","Sorry",s.data.data.message)}catch(s){this.$showToast("error","Sorry",s.response.data.message)}},formatInputPlafon(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},async insertData(){try{this.overlay=!0;const s=new FormData;s.append("name",this.dataForm.name),s.append("nik_pemohon",this.dataForm.nik_pemohon),s.append("address",this.dataForm.address),s.append("no_hp",this.dataForm.no_hp),s.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),s.append("type_bussiness",this.dataForm.type_bussiness),s.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&s.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&s.append("nik_jaminan",this.dataForm.nik_jaminan);for(let m=1;m<=11;m++){if(m===6)continue;let l="file"+m,r="noteFile"+m,V="hasFile"+m;this.dataForm.hasOwnProperty(V)&&this.dataForm[V]||this.dataForm[l]?this.dataForm[l]&&(s.append(l,this.dataForm[l]),s.append(r,this.dataForm[r])):this.dataForm[l]&&s.append(l,this.dataForm[l])}s.append("_method","POST");const e={onUploadProgress:m=>{try{this.uploadProgress=Math.round(m.loaded*100/m.total)}catch(l){console.error("Error calculating progress:",l)}},headers:{"Content-Type":"multipart/form-data"}},f=await v.post("/user/credit",s,e);f.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",f.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",f.data.message))}catch(s){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",s.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}};const i=s=>(R("data-v-b31252ab"),s=s(),E(),s),le=i(()=>n("br",null,null,-1)),se=i(()=>n("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),te=i(()=>n("p",null,"Data Kosong",-1)),ae=i(()=>n("p",null,"loading data .....",-1)),oe={key:0},ne={key:1},ie={key:2},re={class:"operation-wrapper"},de={class:"d-flex justify-space-between"},ue=["onClick"],me=["onClick"],pe=["onClick"],ce=i(()=>n("span",{style:{color:"red"}},"*",-1)),fe=i(()=>n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),he=i(()=>n("span",{style:{color:"red"}},"*",-1)),ge=i(()=>n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),Fe=i(()=>n("span",{style:{color:"red"}},"*",-1)),_e=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),ye=i(()=>n("span",{style:{color:"red"}},"*",-1)),be=i(()=>n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),Ve=i(()=>n("span",{style:{color:"red"}},"*",-1)),ve=i(()=>n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),ke=i(()=>n("span",{style:{color:"red"}},"*",-1)),xe=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),we=i(()=>n("span",{style:{color:"red"}},"*",-1)),Pe=i(()=>n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),De=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ce=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Te=i(()=>n("span",{style:{color:"red"}},"*",-1)),Se=i(()=>n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),Ae=i(()=>n("span",{style:{color:"red"}},"*",-1)),je=i(()=>n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),Ie=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ue=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),Be=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ne=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),qe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ke=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Salah Satu Kelengkapan : ",-1)),Oe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Me=i(()=>n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),Je=i(()=>n("span",{style:{color:"red"}},"*",-1)),Re=i(()=>n("span",{class:"subtitle-1 text-center"},"Jaminan SHM:",-1)),Ee=i(()=>n("span",{style:{color:"red"}},"*",-1)),We=i(()=>n("span",{class:"subtitle-1 text-center"},"Jaminan BPKB:",-1)),Le=i(()=>n("span",{style:{color:"red"}},"*",-1)),ze=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),He=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ge=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),Qe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Xe=i(()=>n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),Ye=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ze=i(()=>n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function $e(s,e,f,m,l,r){const V=K("EasyDataTable");return u(),b(j,null,[t(L,{absolute:!0,modelValue:l.overlay,"onUpdate:modelValue":e[0]||(e[0]=a=>l.overlay=a),contained:"",persistent:"",class:"align-center justify-center"},{default:o(()=>[t(d,null,{default:o(()=>[t(O,{color:"primary",size:"32",indeterminate:""}),le,se]),_:1})]),_:1},8,["modelValue"]),t(U,null,{default:o(()=>[t(z,{class:"text-2xl font-weight-bold d-flex justify-left"},{default:o(()=>[F(" List Credit "),t(k,{icon:"mdi-view-comfy",class:"ml-2",onClick:r.toPage},null,8,["onClick"])]),_:1}),t(G,{modelValue:l.tab,"onUpdate:modelValue":e[1]||(e[1]=a=>l.tab=a),class:"v-tabs-pill","bg-color":"secondary"},{default:o(()=>[t(x,{value:"0"},{default:o(()=>[F("Semua")]),_:1}),t(x,{value:"1"},{default:o(()=>[F("Approved")]),_:1}),t(x,{value:"2"},{default:o(()=>[F("Pending")]),_:1}),t(x,{value:"3"},{default:o(()=>[F("Rejected")]),_:1})]),_:1},8,["modelValue"]),t(H,null,{default:o(()=>[t(Q,{modelValue:l.tab,"onUpdate:modelValue":e[6]||(e[6]=a=>l.tab=a)},{default:o(()=>[(u(!0),b(j,null,M(l.phases,a=>(u(),h(X,{value:a.value},{default:o(()=>[t(B,{class:"d-flex justify-end pa-3"},{default:o(()=>[l.userAccess&&parseInt(l.userAccess.canInsertData)?(u(),h(I,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[2]||(e[2]=p=>r.openModal(1))},{default:o(()=>[F(" Tambah Data ")]),_:1})):c("",!0),t(Y),t(g,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:l.searchValue,"onUpdate:modelValue":e[3]||(e[3]=p=>l.searchValue=p)},null,8,["modelValue"])]),_:1}),n("div",{class:"table-container",onTouchstart:e[4]||(e[4]=C(()=>{},["stop"])),onTouchmove:e[5]||(e[5]=C(()=>{},["stop"]))},[t(V,{"show-index":"",headers:l.headers,items:l.items,"search-value":l.searchValue},{"empty-message":o(()=>[te]),loading:o(()=>[ae]),"item-plafon":o(p=>[F("Rp. "+P(r.formatInput(p.plafon))+",-",1)]),"item-isApproved":o(p=>[parseInt(p.isApproved)==1?(u(),b("span",oe," Approved")):c("",!0),parseInt(p.isApproved)==2?(u(),b("span",ne," Pending")):c("",!0),parseInt(p.isApproved)==3?(u(),b("span",ie," Rejected")):c("",!0)]),"item-aoro":o(p=>[n("span",null,P(p.user.name),1)]),"item-created_at":o(p=>[n("span",null,P(r.formatDate(p.created_at))+" WIB",1)]),"item-operation":o(p=>[n("div",re,[n("div",de,[t(T,{location:"top",text:"Detail Kredit"},{activator:o(({props:y})=>[n("button",D(y,{onClick:A=>r.toDetail(p)}),[t(k,{size:"20",icon:"bx-link-external",color:"blue"})],16,ue)]),_:2},1024),l.userData&&p.user_id==l.userData.id?(u(),h(T,{key:0,location:"top",text:"Hapus Kredit"},{activator:o(({props:y})=>[n("button",D(y,{onClick:A=>r.deleteFile(p)}),[t(k,{size:"20",icon:"bx-trash",color:"red"})],16,me)]),_:2},1024)):c("",!0),l.role&&l.role.canDownload==1?(u(),h(T,{key:1,location:"top",text:"Download Semua File Kredit"},{activator:o(({props:y})=>[n("button",D(y,{onClick:A=>r.downloadFile(p.id)}),[t(k,{size:"20",icon:"bx-download",color:"red"})],16,pe)]),_:2},1024)):c("",!0)])])]),_:1},8,["headers","items","search-value"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),t($,{modelValue:l.insert,"onUpdate:modelValue":e[33]||(e[33]=a=>l.insert=a),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[t(U,null,{title:o(()=>[F(" Tambah Data")]),text:o(()=>[t(Z,{onSubmit:C(r.insertData,["prevent"])},{default:o(()=>[t(B,null,{default:o(()=>[t(d,{md:"12",cols:"12"},{default:o(()=>[ce,fe,t(g,{class:"my-3",modelValue:l.dataForm.name,"onUpdate:modelValue":e[7]||(e[7]=a=>l.dataForm.name=a),autofocus:"",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[he,ge,t(g,{class:"my-3",modelValue:r.formattedPlafon,"onUpdate:modelValue":e[8]||(e[8]=a=>r.formattedPlafon=a),type:"text",onInput:r.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[Fe,_e,t(g,{class:"my-3",modelValue:l.dataForm.nik_pemohon,"onUpdate:modelValue":e[9]||(e[9]=a=>l.dataForm.nik_pemohon=a),type:"number",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[ye,be,t(g,{class:"my-3",modelValue:l.dataForm.address,"onUpdate:modelValue":e[10]||(e[10]=a=>l.dataForm.address=a),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[Ve,ve,t(g,{class:"my-3",modelValue:l.dataForm.no_hp,"onUpdate:modelValue":e[11]||(e[11]=a=>l.dataForm.no_hp=a),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[ke,xe,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[12]||(e[12]=a=>r.handleFileChange(a,"file1"))},null,8,["rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[we,Pe,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[13]||(e[13]=a=>r.handleFileChange(a,"file4"))},null,8,["rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[De,Ce,t(N,{modelValue:l.selectedPhoto,"onUpdate:modelValue":e[14]||(e[14]=a=>l.selectedPhoto=a),mandatory:!0,row:""},{default:o(()=>[t(S,{label:"Foto Kunjungan",value:"fotoKunjungan"}),t(S,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),l.selectedPhoto==="fotoKunjungan"?(u(),h(d,{key:0,md:"12",cols:"12"},{default:o(()=>[Te,Se,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[15]||(e[15]=a=>{r.handleFileChange(a,"file10"),r.resetFile("file11")})},null,8,["rules"])]),_:1})):c("",!0),l.selectedPhoto==="fotoWhatsApp"?(u(),h(d,{key:1,md:"12",cols:"12"},{default:o(()=>[Ae,je,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[16]||(e[16]=a=>{r.handleFileChange(a,"file11"),r.resetFile("file10")})},null,8,["rules"])]),_:1})):c("",!0),t(w,{thickness:5}),t(d,{cols:"12",md:"12"},{default:o(()=>[t(q,{modelValue:l.dataForm.hasFile2,"onUpdate:modelValue":e[17]||(e[17]=a=>l.dataForm.hasFile2=a),label:"Apakah pemohon sudah menikah?",onChange:e[18]||(e[18]=a=>(r.resetFile("file2"),l.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),t(w,{thickness:5}),l.dataForm.hasFile2?(u(),h(d,{key:2,md:"12",cols:"12"},{default:o(()=>[Ie,Ue,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[19]||(e[19]=a=>r.handleFileChange(a,"file2"))},null,8,["rules"])]),_:1})):c("",!0),l.dataForm.hasFile2?(u(),h(d,{key:3,md:"12",cols:"12"},{default:o(()=>[Be,Ne,t(g,{class:"my-3",type:"number",modelValue:l.dataForm.nik_pasangan,"onUpdate:modelValue":e[20]||(e[20]=a=>l.dataForm.nik_pasangan=a),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):c("",!0),t(d,{md:"12",cols:"12"},{default:o(()=>[qe,Ke,t(N,{modelValue:l.selectedOption,"onUpdate:modelValue":e[21]||(e[21]=a=>l.selectedOption=a),mandatory:!0,row:""},{default:o(()=>[t(S,{label:"Buku Nikah",value:"bukuNikah"})]),_:1},8,["modelValue"])]),_:1}),l.selectedOption==="bukuNikah"?(u(),h(d,{key:4,md:"12",cols:"12"},{default:o(()=>[Oe,Me,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[22]||(e[22]=a=>{r.handleFileChange(a,"file5"),r.resetFile("file7"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):c("",!0),l.selectedOption==="jaminanSHM"?(u(),h(d,{key:5,md:"12",cols:"12"},{default:o(()=>[Je,Re,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[23]||(e[23]=a=>{r.handleFileChange(a,"file7"),r.resetFile("file5"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):c("",!0),l.selectedOption==="jaminanBPKB"?(u(),h(d,{key:6,md:"12",cols:"12"},{default:o(()=>[Ee,We,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[24]||(e[24]=a=>{r.handleFileChange(a,"file8"),r.resetFile("file5"),r.resetFile("file7")})},null,8,["rules"])]),_:1})):c("",!0),t(w,{thickness:5}),t(d,{cols:"12",md:"12"},{default:o(()=>[t(q,{modelValue:l.dataForm.hasFile3,"onUpdate:modelValue":e[25]||(e[25]=a=>l.dataForm.hasFile3=a),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[26]||(e[26]=a=>(r.resetFile("file3"),l.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile3?(u(),h(d,{key:7,md:"12",cols:"12"},{default:o(()=>[Le,ze,t(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[27]||(e[27]=a=>r.handleFileChange(a,"file3"))},null,8,["rules"])]),_:1})):c("",!0),l.dataForm.hasFile3?(u(),h(d,{key:8,md:"12",cols:"12"},{default:o(()=>[He,Ge,t(g,{class:"my-3",type:"number",modelValue:l.dataForm.nik_jaminan,"onUpdate:modelValue":e[28]||(e[28]=a=>l.dataForm.nik_jaminan=a),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):c("",!0),t(w,{thickness:5}),t(d,{md:"12",cols:"12"},{default:o(()=>[Qe,Xe,t(g,{class:"my-3",modelValue:l.dataForm.type_bussiness,"onUpdate:modelValue":e[29]||(e[29]=a=>l.dataForm.type_bussiness=a),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(d,{md:"12",cols:"12"},{default:o(()=>[Ye,Ze,t(g,{class:"my-3",modelValue:l.dataForm.desc_bussiness,"onUpdate:modelValue":e[30]||(e[30]=a=>l.dataForm.desc_bussiness=a),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),t(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[t(I,{type:"submit",disabled:l.dataForm.name==null||l.dataForm.plafon==null||l.dataForm.type_bussiness==null||l.dataForm.desc_bussiness==null||l.dataForm.file1==null||l.dataForm.file4==null||l.dataForm.file10==null&&l.dataForm.file11==null},{default:o(()=>[F(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[31]||(e[31]=a=>r.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:o(()=>[t(J,{modelValue:l.uploadProgress,"onUpdate:modelValue":e[32]||(e[32]=a=>l.uploadProgress=a),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const Vl=W(ee,[["render",$e],["__scopeId","data-v-b31252ab"]]);export{Vl as default};

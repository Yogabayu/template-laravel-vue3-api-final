import{m as V}from"./VGrid-c3caf1c2.js";import{r as O,o as g,c as I,a as s,w as o,G as R,E as j,b as r,i as y,e as c,F as K,h as F,V as P,t as x,M as S,d as D,f as b,a2 as M,H as L,I as q}from"./main-ca0baa6f.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";import{V as W}from"./VOverlay-b78c102b.js";import{V as E,c as d,a as J,d as H,b as z}from"./VCol-5c0fa7cb.js";import{V as Y,a as k}from"./VTabs-f84c729f.js";import{V as Q,a as X,b as Z,c as N}from"./VWindowItem-213969b9.js";import{V as U}from"./VRow-3b9ea53a.js";import{V as $}from"./VSpacer-1a2bb86e.js";import{V as h}from"./VTextField-36df7c49.js";import{V as A}from"./VTooltip-8caa5378.js";import{V as ee}from"./VDialog-5ac7af71.js";import{V as te}from"./VForm-a0c5a47d.js";import{V as T}from"./VSelect-af072478.js";import{V as _}from"./VFileInput-66e0592f.js";import{V as w}from"./VDivider-0973f5cc.js";import{V as B}from"./VCheckbox-9f78350c.js";import"./VImg-faa27579.js";import"./index-15c49784.js";import"./VCheckboxBtn-526e0258.js";import"./VInput-401a23ac.js";import"./dialog-transition-67e99814.js";import"./VMenu-c65a6eb1.js";import"./VChip-8dd2411d.js";const le={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}}},data(){return{monthYear:this.$route.params.monthYear,overlay:!1,insert:!1,searchValue:"",userData:null,selectedPhoto:"",userToken:null,uploadProgress:null,tab:0,rules:{required:l=>!!l||"Required"},role:[],items:[],users:[],originalItems:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],dataForm:{id:null,user_id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}]}},watch:{tab(l){l==1?this.filterDataStatus(1):l==2?this.filterDataStatus(2):l==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{goBack(){this.$router.go(-1)},formatDate(l){return new Date(l).toLocaleString("id-ID")},async downloadFile(l){try{this.overlay=!0;const e=await V.get(`/download-all/${l}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const u=window.URL.createObjectURL(new Blob([e.data])),m=document.createElement("a");m.href=u,m.setAttribute("download",`${l}.zip`),document.body.appendChild(m),m.click(),document.body.removeChild(m),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(l){return l=l.replace(/\D/g,""),l=l.replace(/\B(?=(\d{3})+(?!\d))/g,","),l},toDetail(l){this.$router.push(`/a-credit/${l.id}`)},async deleteFile(l){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const u=await V.delete(`/credit/${l.id}`);u.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",u.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",u.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(l){!this.dataForm[l]!=null&&(this.dataForm[l]=null)},handleFileChange(l,e){const u=l.target.files[0];u&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(u.type)?(this.dataForm[e]=u,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),l.target.value=null)},async getRecaptData(l){try{this.overlay=!0;const e=await V.get(`/generatemonthly/${l}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const u=e.headers["content-disposition"];let m="download.xlsx";if(u){const a=u.match(/filename="?(.+)"?/i);a.length===2&&(m=a[1])}const t=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),i=window.URL.createObjectURL(t),f=document.createElement("a");f.href=i,f.setAttribute("download",m),document.body.appendChild(f),f.click(),document.body.removeChild(f),this.$showToast("success","Berhasil","File Excel berhasil diunduh")}else this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.overlay=!1,this.$showToast("error","Sorry",e.response.data.message)}},async openModal(l,e=null){l===1?this.insert=!0:l===2&&this.getRecaptData(this.monthYear)},closeModal(l){l===1?(this.resetForm(),this.insert=!1):l===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(l){let e=l.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=e},formatNumber(l){return l?l.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(l){this.items=this.originalItems.filter(e=>e.isApproved==l)},getUserData(){const l=localStorage.getItem("userData");l&&(this.userData=JSON.parse(l))},async getAllFiles(){try{this.overlay=!0;const l=new FormData;l.append("monthYear",this.monthYear);const e=await V.post("/getCredit",l);e.status===200?(this.items=e.data.data.files,this.users=e.data.data.users.map(u=>({value:u.id,title:u.name})),this.originalItems=[...this.items],this.overlay=!1):this.$showToast("error","Sorry",e.data.data.message)}catch(l){this.overlay=!1,this.$showToast("error","Sorry",l.response.data.message)}},formatInputPlafon(l){let e=l.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=e},async insertData(){try{this.overlay=!0;const l=new FormData;l.append("name",this.dataForm.name),l.append("user_id",this.dataForm.user_id),l.append("nik_pemohon",this.dataForm.nik_pemohon),l.append("address",this.dataForm.address),l.append("no_hp",this.dataForm.no_hp),l.append("order_source",this.dataForm.order_source),l.append("status_kredit",this.dataForm.status_kredit),l.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),l.append("type_bussiness",this.dataForm.type_bussiness),l.append("desc_bussiness",this.dataForm.desc_bussiness),l.append("order_source",this.dataForm.order_source),this.dataForm.file2!=null&&l.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&l.append("nik_jaminan",this.dataForm.nik_jaminan);for(let m=1;m<=11;m++){if(m===6)continue;let t="file"+m,i="noteFile"+m,f="hasFile"+m;this.dataForm.hasOwnProperty(f)&&this.dataForm[f]||this.dataForm[t]?this.dataForm[t]&&(l.append(t,this.dataForm[t]),l.append(i,this.dataForm[i])):this.dataForm[t]&&l.append(t,this.dataForm[t])}l.append("_method","POST");const e={onUploadProgress:m=>{try{this.uploadProgress=Math.round(m.loaded*100/m.total)}catch(t){console.error("Error calculating progress:",t)}},headers:{"Content-Type":"multipart/form-data"}},u=await V.post("/credit",l,e);u.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",u.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",u.data.message))}catch(l){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",l.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}};const n=l=>(L("data-v-8f0629ba"),l=l(),q(),l),se=n(()=>r("br",null,null,-1)),ae=n(()=>r("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),oe=n(()=>r("p",null,"Data Kosong",-1)),re=n(()=>r("p",null,"loading data .....",-1)),ne={class:"operation-wrapper"},ie={class:"d-flex justify-space-between"},de=["onClick"],ue=["onClick"],me=["onClick"],pe=n(()=>r("span",{style:{color:"red"}},"*",-1)),ce=n(()=>r("span",{class:"subtitle-1 text-center"},"Pilih AO/RO: ",-1)),fe=n(()=>r("span",{style:{color:"red"}},"*",-1)),he=n(()=>r("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),ge=n(()=>r("span",{style:{color:"red"}},"*",-1)),Fe=n(()=>r("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),_e=n(()=>r("span",{style:{color:"red"}},"*",-1)),ye=n(()=>r("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),be=n(()=>r("span",{style:{color:"red"}},"*",-1)),ve=n(()=>r("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),Ve=n(()=>r("span",{style:{color:"red"}},"*",-1)),xe=n(()=>r("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),ke=n(()=>r("span",{style:{color:"red"}},"*",-1)),we=n(()=>r("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Pe=n(()=>r("span",{style:{color:"red"}},"*",-1)),Se=n(()=>r("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),De=n(()=>r("span",{style:{color:"red"}},"*",-1)),Ae=n(()=>r("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),Te=n(()=>r("span",{style:{color:"red"}},"*",-1)),Ce=n(()=>r("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),Ie=n(()=>r("span",{style:{color:"red"}},"*",-1)),Re=n(()=>r("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Ee=n(()=>r("span",{style:{color:"red"}},"*",-1)),Ne=n(()=>r("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),Ue=n(()=>r("span",{style:{color:"red"}},"*",-1)),Be=n(()=>r("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),Oe=n(()=>r("span",{style:{color:"red"}},"*",-1)),je=n(()=>r("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),Ke=n(()=>r("span",{style:{color:"red"}},"*",-1)),Me=n(()=>r("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),Le=n(()=>r("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),qe=n(()=>r("span",{style:{color:"red"}},"*",-1)),Ge=n(()=>r("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),We=n(()=>r("span",{style:{color:"red"}},"*",-1)),Je=n(()=>r("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),He=n(()=>r("span",{style:{color:"red"}},"*",-1)),ze=n(()=>r("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),Ye=n(()=>r("span",{style:{color:"red"}},"*",-1)),Qe=n(()=>r("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function Xe(l,e,u,m,t,i){const f=O("EasyDataTable");return g(),I(R,null,[s(W,{absolute:!0,modelValue:t.overlay,"onUpdate:modelValue":e[0]||(e[0]=a=>t.overlay=a),contained:"",persistent:"",class:"align-center justify-center"},{default:o(()=>[s(d,null,{default:o(()=>[s(j,{color:"primary",size:"32",indeterminate:""}),se,ae]),_:1})]),_:1},8,["modelValue"]),s(E,null,{default:o(()=>[s(J,{class:"align-left"},{default:o(()=>[r("span",{color:"primary",onClick:e[1]||(e[1]=(...a)=>i.goBack&&i.goBack(...a)),style:{cursor:"pointer"}},[s(y,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),c(" Back ")]),s(H,{class:"text-2xl font-weight-bold"},{default:o(()=>[c(" List Kredit ")]),_:1})]),_:1}),s(Y,{modelValue:t.tab,"onUpdate:modelValue":e[2]||(e[2]=a=>t.tab=a),class:"v-tabs-pill","bg-color":"secondary"},{default:o(()=>[s(k,{value:"0"},{default:o(()=>[c("Semua")]),_:1}),s(k,{value:"1"},{default:o(()=>[c("Approved")]),_:1}),s(k,{value:"2"},{default:o(()=>[c("Pending")]),_:1}),s(k,{value:"3"},{default:o(()=>[c("Rejected")]),_:1})]),_:1},8,["modelValue"]),s(z,null,{default:o(()=>[s(Q,{modelValue:t.tab,"onUpdate:modelValue":e[8]||(e[8]=a=>t.tab=a)},{default:o(()=>[(g(!0),I(R,null,K(t.phases,a=>(g(),F(X,{value:a.value},{default:o(()=>[s(U,{class:"d-flex justify-end pa-3"},{default:o(()=>[s(P,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[3]||(e[3]=p=>i.openModal(1))},{default:o(()=>[s(y,{icon:"mdi-plus"}),c(" Tambah Data ")]),_:1}),s(P,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[4]||(e[4]=p=>i.openModal(2))},{default:o(()=>[s(y,{icon:"mdi-download"}),c(" Rekap Data ")]),_:1}),s($),s(h,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:t.searchValue,"onUpdate:modelValue":e[5]||(e[5]=p=>t.searchValue=p)},null,8,["modelValue"])]),_:1}),r("div",{class:"table-container",onTouchstart:e[6]||(e[6]=D(()=>{},["stop"])),onTouchmove:e[7]||(e[7]=D(()=>{},["stop"]))},[s(f,{"show-index":"",headers:t.headers,items:t.items,"search-value":t.searchValue},{"empty-message":o(()=>[oe]),loading:o(()=>[re]),"item-plafon":o(p=>[c("Rp. "+x(i.formatInput(p.plafon))+",-",1)]),"item-isApproved":o(p=>[c(x(parseInt(p.isApproved)==1?"Approved":parseInt(p.isApproved)==2?"Pending":"Rejected"),1)]),"item-aoro":o(p=>[r("span",null,x(p.user.name),1)]),"item-created_at":o(p=>[r("span",null,x(i.formatDate(p.created_at))+" WIB",1)]),"item-operation":o(p=>[r("div",ne,[r("div",ie,[s(A,{location:"top",text:"Detail Kredit"},{activator:o(({props:v})=>[r("button",S(v,{onClick:C=>i.toDetail(p)}),[s(y,{size:"20",icon:"bx-link-external",color:"blue"})],16,de)]),_:2},1024),s(A,{location:"top",text:"Hapus Kredit"},{activator:o(({props:v})=>[r("button",S(v,{onClick:C=>i.deleteFile(p)}),[s(y,{size:"20",icon:"bx-trash",color:"blue"})],16,ue)]),_:2},1024),s(A,{location:"top",text:"Download Semua File Kredit"},{activator:o(({props:v})=>[r("button",S(v,{onClick:C=>i.downloadFile(p.id)}),[s(y,{size:"20",icon:"bx-download",color:"red"})],16,me)]),_:2},1024)])])]),_:1},8,["headers","items","search-value"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),s(ee,{modelValue:t.insert,"onUpdate:modelValue":e[35]||(e[35]=a=>t.insert=a),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[s(E,null,{title:o(()=>[c(" Tambah Data ")]),text:o(()=>[s(te,{onSubmit:D(i.insertData,["prevent"])},{default:o(()=>[s(U,null,{default:o(()=>[s(d,{md:"12",cols:"12"},{default:o(()=>[pe,ce,s(T,{items:t.users,autofocus:"",modelValue:t.dataForm.user_id,"onUpdate:modelValue":e[9]||(e[9]=a=>t.dataForm.user_id=a),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[fe,he,s(h,{class:"my-3",modelValue:t.dataForm.name,"onUpdate:modelValue":e[10]||(e[10]=a=>t.dataForm.name=a),autofocus:"",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[ge,Fe,s(h,{class:"my-3",modelValue:i.formattedPlafon,"onUpdate:modelValue":e[11]||(e[11]=a=>i.formattedPlafon=a),type:"text",onInput:i.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[_e,ye,s(h,{class:"my-3",modelValue:t.dataForm.nik_pemohon,"onUpdate:modelValue":e[12]||(e[12]=a=>t.dataForm.nik_pemohon=a),type:"number",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[be,ve,s(h,{class:"my-3",modelValue:t.dataForm.address,"onUpdate:modelValue":e[13]||(e[13]=a=>t.dataForm.address=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[Ve,xe,s(h,{class:"my-3",modelValue:t.dataForm.no_hp,"onUpdate:modelValue":e[14]||(e[14]=a=>t.dataForm.no_hp=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[ke,we,s(T,{items:t.orderList,autofocus:"",modelValue:t.dataForm.order_source,"onUpdate:modelValue":e[15]||(e[15]=a=>t.dataForm.order_source=a),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[Pe,Se,s(T,{items:t.statusCreditList,autofocus:"",modelValue:t.dataForm.status_kredit,"onUpdate:modelValue":e[16]||(e[16]=a=>t.dataForm.status_kredit=a),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[De,Ae,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[17]||(e[17]=a=>i.handleFileChange(a,"file1"))},null,8,["rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[Te,Ce,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[18]||(e[18]=a=>i.handleFileChange(a,"file4"))},null,8,["rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[Ie,Re,s(Z,{modelValue:t.selectedPhoto,"onUpdate:modelValue":e[19]||(e[19]=a=>t.selectedPhoto=a),mandatory:!0,row:""},{default:o(()=>[s(N,{label:"Foto Kunjungan",value:"fotoKunjungan"}),s(N,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),t.selectedPhoto==="fotoKunjungan"?(g(),F(d,{key:0,md:"12",cols:"12"},{default:o(()=>[Ee,Ne,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[20]||(e[20]=a=>{i.handleFileChange(a,"file10"),i.resetFile("file11")})},null,8,["rules"])]),_:1})):b("",!0),t.selectedPhoto==="fotoWhatsApp"?(g(),F(d,{key:1,md:"12",cols:"12"},{default:o(()=>[Ue,Be,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[21]||(e[21]=a=>{i.handleFileChange(a,"file11"),i.resetFile("file10")})},null,8,["rules"])]),_:1})):b("",!0),s(w,{thickness:5}),s(d,{cols:"12",md:"12"},{default:o(()=>[s(B,{modelValue:t.dataForm.hasFile2,"onUpdate:modelValue":e[22]||(e[22]=a=>t.dataForm.hasFile2=a),label:"Apakah pemohon sudah menikah?",onChange:e[23]||(e[23]=a=>(i.resetFile("file2"),t.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),s(w,{thickness:5}),t.dataForm.hasFile2?(g(),F(d,{key:2,md:"12",cols:"12"},{default:o(()=>[Oe,je,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[24]||(e[24]=a=>i.handleFileChange(a,"file2"))},null,8,["rules"])]),_:1})):b("",!0),t.dataForm.hasFile2?(g(),F(d,{key:3,md:"12",cols:"12"},{default:o(()=>[Ke,Me,s(h,{class:"my-3",type:"number",modelValue:t.dataForm.nik_pasangan,"onUpdate:modelValue":e[25]||(e[25]=a=>t.dataForm.nik_pasangan=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):b("",!0),s(d,{md:"12",cols:"12"},{default:o(()=>[Le,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[26]||(e[26]=a=>{i.handleFileChange(a,"file5"),i.resetFile("file7"),i.resetFile("file8")})},null,8,["rules"])]),_:1}),s(w,{thickness:5}),s(d,{cols:"12",md:"12"},{default:o(()=>[s(B,{modelValue:t.dataForm.hasFile3,"onUpdate:modelValue":e[27]||(e[27]=a=>t.dataForm.hasFile3=a),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[28]||(e[28]=a=>(i.resetFile("file3"),t.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),t.dataForm.hasFile3?(g(),F(d,{key:4,md:"12",cols:"12"},{default:o(()=>[qe,Ge,s(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[29]||(e[29]=a=>i.handleFileChange(a,"file3"))},null,8,["rules"])]),_:1})):b("",!0),t.dataForm.hasFile3?(g(),F(d,{key:5,md:"12",cols:"12"},{default:o(()=>[We,Je,s(h,{class:"my-3",type:"number",modelValue:t.dataForm.nik_jaminan,"onUpdate:modelValue":e[30]||(e[30]=a=>t.dataForm.nik_jaminan=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):b("",!0),s(w,{thickness:5}),s(d,{md:"12",cols:"12"},{default:o(()=>[He,ze,s(h,{class:"my-3",modelValue:t.dataForm.type_bussiness,"onUpdate:modelValue":e[31]||(e[31]=a=>t.dataForm.type_bussiness=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:o(()=>[Ye,Qe,s(h,{class:"my-3",modelValue:t.dataForm.desc_bussiness,"onUpdate:modelValue":e[32]||(e[32]=a=>t.dataForm.desc_bussiness=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[s(P,{type:"submit",disabled:t.dataForm.name==null||t.dataForm.plafon==null||t.dataForm.type_bussiness==null||t.dataForm.desc_bussiness==null||t.dataForm.order_source==null||t.dataForm.file1==null||t.dataForm.file4==null||t.dataForm.file10==null&&t.dataForm.file11==null},{default:o(()=>[c(" Simpan ")]),_:1},8,["disabled"]),r("button",{type:"button",class:"btn btn-blue",onClick:e[33]||(e[33]=a=>i.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:o(()=>[s(M,{modelValue:t.uploadProgress,"onUpdate:modelValue":e[34]||(e[34]=a=>t.uploadProgress=a),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const Vt=G(le,[["render",Xe],["__scopeId","data-v-8f0629ba"]]);export{Vt as default};

import{m as A}from"./axios-379d51f3.js";import{_ as j,r as L,o as f,c as x,a,w as s,N as M,H as E,V as m,F as q,b as n,j as v,f as c,G,i as g,e as D,t as C,h as _,L as S,M as P,O as T,d as R,a4 as W,I as J,J as z}from"./main-a9d2a525.js";import{V as K,a as H,c as Y,b as Q}from"./VCard-af6324af.js";import{V as X,a as b}from"./VTabs-0357ff4b.js";import{V as Z,a as $}from"./VWindowItem-2a5e69a2.js";import{V as O}from"./VRow-9c121a63.js";import{V as ee}from"./VSpacer-80174445.js";import{V as F}from"./VTextField-920a3dac.js";import{V as k}from"./VTooltip-4d68b861.js";import{V as te}from"./VDialog-10c3fbe0.js";import{V as le}from"./VForm-cb04da0b.js";import{V as w}from"./VSelect-453f56ba.js";import{V}from"./VFileInput-1d1a4ee9.js";import{V as ae,a as U}from"./VRadioGroup-af91084f.js";import{d as I}from"./VMenu-5f48eb8d.js";import{V as B}from"./VCheckbox-c7e49b52.js";import"./VAvatar-6e266421.js";import"./VImg-a1aa7f95.js";import"./index-5f12c0a5.js";import"./VInput-372ad7b1.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-2f36a849.js";import"./VChip-89f82e07.js";const se={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(t){this.dataForm.plafon=t.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(t){this.dataForm.plafon=t.replace(/\D/g,"")}},searchableItems(){return this.items.map(t=>({...t,office_names:t.user.position.offices.map(e=>e.name).join(", ")}))}},data(){return{monthYear:this.$route.params.monthYear,overlay:!1,insert:!1,searchValue:"",userData:null,selectedPhoto:"",userToken:null,uploadProgress:null,tab:0,rules:{required:t=>!!t||"Required"},role:[],items:[],users:[],originalItems:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Kantor",value:"office_names",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!1},{text:"Analisa AO/RO",value:"analisaAO",sortable:!1},{text:"Aksi",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],dataForm:{id:null,user_id:null,name:"",plafon:null,type:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,name_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null,file12:null},orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],typeCreditList:[{value:1,title:"Reguler"},{value:2,title:"Restruktur"}]}},watch:{tab(t){t==1?this.filterDataStatus(1):t==2?this.filterDataStatus(2):t==3?this.filterDataStatus(3):t==4?this.filterDataStatus(4):t==5?this.filterDataStatus(5):t==6?this.filterDataStatus(6):t==7?this.filterDataStatus(7):this.items=[...this.originalItems]}},methods:{filterDataStatus(t){const e={1:i=>i.isApproved==1,2:i=>i.isApproved==2,3:i=>i.isApproved==3,7:i=>i.isApproved==4,4:i=>parseInt(i.phase)==1,5:i=>i.attachments.some(u=>u.name.includes("SLIK")&&parseInt(u.phase)==2&&(u.path!="null"||u.link!=null)),6:i=>parseInt(i.phase)==4};this.items=t in e?this.originalItems.filter(e[t]):[...this.originalItems]},hasSlikAttachment(t){return t.some(e=>e.name.includes("SLIK")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},hasAnalisaAoAttachment(t){return t.some(e=>e.name.includes("Analisa Awal Kredit AO")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},customSearch(t,e,i){return e?t.filter(u=>i.some(l=>l==="user.position.offices.name"?u.user.position.offices.some(d=>d.name.toLowerCase().includes(e.toLowerCase())):String(this.getNestedValue(u,l)).toLowerCase().includes(e.toLowerCase()))):t},getNestedValue(t,e){return e.split(".").reduce((i,u)=>i&&i[u]!==void 0?i[u]:null,t)},goBack(){this.$router.go(-1)},formatDate(t){return new Date(t).toLocaleString("id-ID")},async downloadFile(t){try{this.overlay=!0;const e=await A.get(`/download-all/${t}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const i=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=i,u.setAttribute("download",`${t}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(t){return t=t.replace(/\D/g,""),t=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),t},toDetail(t){this.$router.push(`/a-credit/${t.id}`)},async deleteFile(t){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const i=await A.delete(`/credit/${t.id}`);i.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",i.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",i.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(t){!this.dataForm[t]!=null&&(this.dataForm[t]=null)},handleFileChange(t,e){const i=t.target.files[0];i&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(i.type)?(this.dataForm[e]=i,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"?this.dataForm.noteFile11="Foto WhatsApp":e=="file12"&&(this.dataForm.noteFile12="Form Permohonan SLIK")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),t.target.value=null)},async getRecaptData(t){try{this.overlay=!0;const e=await A.get(`/generatemonthly/${t}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const i=e.headers["content-disposition"];let u="download.xlsx";if(i){const o=i.match(/filename="?(.+)"?/i);o.length===2&&(u=o[1])}const l=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),d=window.URL.createObjectURL(l),y=document.createElement("a");y.href=d,y.setAttribute("download",u),document.body.appendChild(y),y.click(),document.body.removeChild(y),this.$showToast("success","Berhasil","File Excel berhasil diunduh")}else this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.overlay=!1,this.$showToast("error","Sorry",e.response.data.message)}},async openModal(t,e=null){t===1?this.insert=!0:t===2&&this.getRecaptData(this.monthYear)},closeModal(t){t===1?(this.resetForm(),this.insert=!1):t===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,type:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null,file12:null}},formatInputIn(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},formatNumber(t){return t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},getUserData(){const t=localStorage.getItem("userData");t&&(this.userData=JSON.parse(t))},async getAllFiles(){try{this.overlay=!0;const t=new FormData;t.append("monthYear",this.monthYear);const e=await A.post("/getCredit",t);e.status===200?(this.items=e.data.data.files,this.users=e.data.data.users.map(i=>({value:i.id,title:i.name})),this.userAccess=e.data.data.userAccess,this.role=e.data.data.role,this.originalItems=[...this.items],this.overlay=!1):this.$showToast("error","Sorry",e.data.data.message)}catch(t){this.overlay=!1,this.$showToast("error","Sorry",t.response.data.message)}},formatInputPlafon(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},async insertData(){try{this.overlay=!0;const t=new FormData;t.append("name",this.dataForm.name),t.append("user_id",this.dataForm.user_id),t.append("type",this.dataForm.type),t.append("nik_pemohon",this.dataForm.nik_pemohon),t.append("address",this.dataForm.address),t.append("no_hp",this.dataForm.no_hp),t.append("order_source",this.dataForm.order_source),t.append("status_kredit",this.dataForm.status_kredit),t.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),t.append("type_bussiness",this.dataForm.type_bussiness),t.append("desc_bussiness",this.dataForm.desc_bussiness),t.append("order_source",this.dataForm.order_source),this.dataForm.file2!=null&&(t.append("nik_pasangan",this.dataForm.nik_pasangan),t.append("name_pasangan",this.dataForm.name_pasangan)),this.dataForm.file3!=null&&t.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=12;u++){if(u===6)continue;let l="file"+u,d="noteFile"+u,y="hasFile"+u;this.dataForm.hasOwnProperty(y)&&this.dataForm[y]||this.dataForm[l]?this.dataForm[l]&&(t.append(l,this.dataForm[l]),t.append(d,this.dataForm[d])):this.dataForm[l]&&t.append(l,this.dataForm[l])}t.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(l){console.error("Error calculating progress:",l)}},headers:{"Content-Type":"multipart/form-data"}},i=await A.post("/credit",t,e);i.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",i.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",i.data.message))}catch(t){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",t.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}};const r=t=>(J("data-v-915fa552"),t=t(),z(),t),oe=r(()=>n("br",null,null,-1)),ne=r(()=>n("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),re=r(()=>n("p",null,"Data Kosong",-1)),ie=r(()=>n("p",null,"loading data .....",-1)),de={key:0},ue={key:1},me={key:2},pe={key:3},ce={class:"operation-wrapper"},fe={class:"d-flex justify-space-between"},he=["onClick"],ge=["onClick"],_e=["onClick"],Fe=r(()=>n("span",{style:{color:"red"}},"*",-1)),ye=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Kredit: ",-1)),ve=r(()=>n("span",{style:{color:"red"}},"*",-1)),be=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih AO/RO: ",-1)),Ve=r(()=>n("span",{style:{color:"red"}},"*",-1)),ke=r(()=>n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),xe=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ae=r(()=>n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),Se=r(()=>n("span",{style:{color:"red"}},"*",-1)),Pe=r(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),we=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ie=r(()=>n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),De=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ce=r(()=>n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),Te=r(()=>n("span",{style:{color:"red"}},"*",-1)),Re=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Ne=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ee=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),Ke=r(()=>n("span",{style:{color:"red"}},"*",-1)),Oe=r(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),Ue=r(()=>n("span",{style:{color:"red"}},"*",-1)),Be=r(()=>n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),je=r(()=>n("span",{style:{color:"red"}},"*",-1)),Le=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Me=r(()=>n("span",{style:{color:"red"}},"*",-1)),qe=r(()=>n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),Ge=r(()=>n("span",{style:{color:"red"}},"*",-1)),We=r(()=>n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),Je=r(()=>n("span",{style:{color:"red"}},"*",-1)),ze=r(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),He=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ye=r(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),Qe=r(()=>n("span",{class:"subtitle-1 text-center"},"Nama Pasangan / Pendamping : ",-1)),Xe=r(()=>n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),Ze=r(()=>n("span",{style:{color:"red"}},"*",-1)),$e=r(()=>n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),et=r(()=>n("span",{style:{color:"red"}},"*",-1)),tt=r(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),lt=r(()=>n("span",{style:{color:"red"}},"*",-1)),at=r(()=>n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),st=r(()=>n("span",{style:{color:"red"}},"*",-1)),ot=r(()=>n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1)),nt=r(()=>n("span",{style:{color:"red"}},"*",-1)),rt=r(()=>n("span",{class:"subtitle-1 text-center"},"Form Permohonan SLIK : ",-1));function it(t,e,i,u,l,d){const y=L("EasyDataTable");return f(),x(E,null,[a(M,{absolute:!0,modelValue:l.overlay,"onUpdate:modelValue":e[0]||(e[0]=o=>l.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:s(()=>[a(m,null,{default:s(()=>[a(q,{color:"primary",size:"32",indeterminate:""}),oe,ne]),_:1})]),_:1},8,["modelValue"]),a(K,null,{default:s(()=>[a(H,{class:"align-left"},{default:s(()=>[n("span",{color:"primary",onClick:e[1]||(e[1]=(...o)=>d.goBack&&d.goBack(...o)),style:{cursor:"pointer"}},[a(v,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),c(" Back ")]),a(Y,{class:"text-2xl font-weight-bold"},{default:s(()=>[c(" List Kredit ")]),_:1})]),_:1}),a(X,{modelValue:l.tab,"onUpdate:modelValue":e[2]||(e[2]=o=>l.tab=o),class:"v-tabs-pill","bg-color":"secondary"},{default:s(()=>[a(b,{value:"0"},{default:s(()=>[c("Semua")]),_:1}),a(b,{value:"1"},{default:s(()=>[c("Approved")]),_:1}),a(b,{value:"2"},{default:s(()=>[c("Pending")]),_:1}),a(b,{value:"3"},{default:s(()=>[c("Rejected")]),_:1}),a(b,{value:"7"},{default:s(()=>[c("Cancel by Debitur")]),_:1}),c(" | "),a(b,{value:"4"},{default:s(()=>[c("Pooling")]),_:1}),a(b,{value:"5"},{default:s(()=>[c("SLIK")]),_:1}),a(b,{value:"6"},{default:s(()=>[c("Komite")]),_:1})]),_:1},8,["modelValue"]),a(Q,null,{default:s(()=>[a(Z,{modelValue:l.tab,"onUpdate:modelValue":e[8]||(e[8]=o=>l.tab=o)},{default:s(()=>[(f(!0),x(E,null,G(l.phases,o=>(f(),g($,{value:o.value},{default:s(()=>[a(O,{class:"d-flex justify-end pa-3"},{default:s(()=>[a(D,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[3]||(e[3]=p=>d.openModal(1))},{default:s(()=>[a(v,{icon:"mdi-plus"}),c(" Tambah Data ")]),_:1}),a(D,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[4]||(e[4]=p=>d.openModal(2))},{default:s(()=>[a(v,{icon:"mdi-download"}),c(" Rekap Data ")]),_:1}),a(ee),a(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:l.searchValue,"onUpdate:modelValue":e[5]||(e[5]=p=>l.searchValue=p)},null,8,["modelValue"])]),_:1}),n("div",{class:"table-container",onTouchstart:e[6]||(e[6]=R(()=>{},["stop"])),onTouchmove:e[7]||(e[7]=R(()=>{},["stop"]))},[a(y,{"show-index":"",headers:l.headers,items:d.searchableItems,"search-value":l.searchValue,"search-field":l.searchField,"border-cell":"","buttons-pagination":"","rows-per-page":500},{"empty-message":s(()=>[re]),loading:s(()=>[ie]),"item-plafon":s(p=>[c("Rp. "+C(d.formatInput(p.plafon))+",-",1)]),"item-isApproved":s(p=>[parseInt(p.isApproved)==1?(f(),x("span",de," Approved")):_("",!0),parseInt(p.isApproved)==2?(f(),x("span",ue," Pending")):_("",!0),parseInt(p.isApproved)==3?(f(),x("span",me," Rejected")):_("",!0),parseInt(p.isApproved)==4?(f(),x("span",pe," Cancel by Debitur")):_("",!0)]),"item-aoro":s(p=>[n("span",null,C(p.user.name),1)]),"item-created_at":s(p=>[n("span",null,C(d.formatDate(p.created_at))+" WIB",1)]),"item-slik":s(p=>[d.hasSlikAttachment(p.attachments)?(f(),g(k,{key:0,location:"top",text:"Kondisi SLIK Sudah Terupload"},{activator:s(({props:h})=>[n("span",S(P(h)),[a(v,{color:"success"},{default:s(()=>[c("mdi-check-circle")]),_:1})],16)]),_:1})):(f(),g(k,{key:1,location:"top",text:"Kondisi SLIK Belum Terupload"},{activator:s(({props:h})=>[n("span",S(P(h)),[a(v,{color:"error"},{default:s(()=>[c("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-analisaAO":s(p=>[d.hasAnalisaAoAttachment(p.attachments)?(f(),g(k,{key:0,location:"top",text:"Analisa AO Sudah Terupload"},{activator:s(({props:h})=>[n("span",S(P(h)),[a(v,{color:"success"},{default:s(()=>[c("mdi-check-circle")]),_:1})],16)]),_:1})):(f(),g(k,{key:1,location:"top",text:"Analisa AO Belum Terupload"},{activator:s(({props:h})=>[n("span",S(P(h)),[a(v,{color:"error"},{default:s(()=>[c("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-operation":s(p=>[n("div",ce,[n("div",fe,[a(k,{location:"top",text:"Detail Kredit"},{activator:s(({props:h})=>[n("button",T(h,{onClick:N=>d.toDetail(p)}),[a(v,{size:"20",icon:"bx-link-external",color:"blue"})],16,he)]),_:2},1024),a(k,{location:"top",text:"Hapus Kredit"},{activator:s(({props:h})=>[n("button",T(h,{onClick:N=>d.deleteFile(p)}),[a(v,{size:"20",icon:"bx-trash",color:"blue"})],16,ge)]),_:2},1024),a(k,{location:"top",text:"Download Semua File Kredit"},{activator:s(({props:h})=>[n("button",T(h,{onClick:N=>d.downloadFile(p.id)}),[a(v,{size:"20",icon:"bx-download",color:"red"})],16,_e)]),_:2},1024)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),a(te,{modelValue:l.insert,"onUpdate:modelValue":e[38]||(e[38]=o=>l.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:s(()=>[a(K,null,{title:s(()=>[c(" Tambah Data ")]),text:s(()=>[a(le,{onSubmit:R(d.insertData,["prevent"])},{default:s(()=>[a(O,null,{default:s(()=>[a(m,{md:"12",cols:"12"},{default:s(()=>[Fe,ye,a(w,{items:l.typeCreditList,autofocus:"",modelValue:l.dataForm.type,"onUpdate:modelValue":e[9]||(e[9]=o=>l.dataForm.type=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[ve,be,a(w,{items:l.users,modelValue:l.dataForm.user_id,"onUpdate:modelValue":e[10]||(e[10]=o=>l.dataForm.user_id=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[Ve,ke,a(F,{class:"my-3",modelValue:l.dataForm.name,"onUpdate:modelValue":e[11]||(e[11]=o=>l.dataForm.name=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[xe,Ae,a(F,{class:"my-3",modelValue:d.formattedPlafon,"onUpdate:modelValue":e[12]||(e[12]=o=>d.formattedPlafon=o),type:"text",onInput:d.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[Se,Pe,a(F,{class:"my-3",modelValue:l.dataForm.nik_pemohon,"onUpdate:modelValue":e[13]||(e[13]=o=>l.dataForm.nik_pemohon=o),type:"number",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[we,Ie,a(F,{class:"my-3",modelValue:l.dataForm.address,"onUpdate:modelValue":e[14]||(e[14]=o=>l.dataForm.address=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[De,Ce,a(F,{class:"my-3",modelValue:l.dataForm.no_hp,"onUpdate:modelValue":e[15]||(e[15]=o=>l.dataForm.no_hp=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[Te,Re,a(w,{items:l.orderList,modelValue:l.dataForm.order_source,"onUpdate:modelValue":e[16]||(e[16]=o=>l.dataForm.order_source=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[Ne,Ee,a(w,{items:l.statusCreditList,modelValue:l.dataForm.status_kredit,"onUpdate:modelValue":e[17]||(e[17]=o=>l.dataForm.status_kredit=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[Ke,Oe,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[18]||(e[18]=o=>d.handleFileChange(o,"file1"))},null,8,["rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[Ue,Be,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[19]||(e[19]=o=>d.handleFileChange(o,"file4"))},null,8,["rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[je,Le,a(ae,{modelValue:l.selectedPhoto,"onUpdate:modelValue":e[20]||(e[20]=o=>l.selectedPhoto=o),mandatory:!0,row:""},{default:s(()=>[a(U,{label:"Foto Kunjungan",value:"fotoKunjungan"}),a(U,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),l.selectedPhoto==="fotoKunjungan"?(f(),g(m,{key:0,md:"12",cols:"12"},{default:s(()=>[Me,qe,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[21]||(e[21]=o=>{d.handleFileChange(o,"file10"),d.resetFile("file11")})},null,8,["rules"])]),_:1})):_("",!0),l.selectedPhoto==="fotoWhatsApp"?(f(),g(m,{key:1,md:"12",cols:"12"},{default:s(()=>[Ge,We,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[22]||(e[22]=o=>{d.handleFileChange(o,"file11"),d.resetFile("file10")})},null,8,["rules"])]),_:1})):_("",!0),a(I,{thickness:5}),a(m,{cols:"12",md:"12"},{default:s(()=>[a(B,{modelValue:l.dataForm.hasFile2,"onUpdate:modelValue":e[23]||(e[23]=o=>l.dataForm.hasFile2=o),label:"Apakah pemohon sudah menikah?",onChange:e[24]||(e[24]=o=>(d.resetFile("file2"),l.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),a(I,{thickness:5}),l.dataForm.hasFile2?(f(),g(m,{key:2,md:"12",cols:"12"},{default:s(()=>[Je,ze,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[25]||(e[25]=o=>d.handleFileChange(o,"file2"))},null,8,["rules"])]),_:1})):_("",!0),l.dataForm.hasFile2?(f(),g(m,{key:3,md:"12",cols:"12"},{default:s(()=>[He,Ye,a(F,{class:"my-3",type:"number",modelValue:l.dataForm.nik_pasangan,"onUpdate:modelValue":e[26]||(e[26]=o=>l.dataForm.nik_pasangan=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):_("",!0),l.dataForm.hasFile2?(f(),g(m,{key:4,md:"12",cols:"12"},{default:s(()=>[Qe,a(F,{class:"my-3",type:"text",modelValue:l.dataForm.name_pasangan,"onUpdate:modelValue":e[27]||(e[27]=o=>l.dataForm.name_pasangan=o)},null,8,["modelValue"])]),_:1})):_("",!0),a(m,{md:"12",cols:"12"},{default:s(()=>[Xe,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[28]||(e[28]=o=>{d.handleFileChange(o,"file5"),d.resetFile("file7"),d.resetFile("file8")})},null,8,["rules"])]),_:1}),a(I,{thickness:5}),a(m,{cols:"12",md:"12"},{default:s(()=>[a(B,{modelValue:l.dataForm.hasFile3,"onUpdate:modelValue":e[29]||(e[29]=o=>l.dataForm.hasFile3=o),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[30]||(e[30]=o=>(d.resetFile("file3"),l.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile3?(f(),g(m,{key:5,md:"12",cols:"12"},{default:s(()=>[Ze,$e,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[31]||(e[31]=o=>d.handleFileChange(o,"file3"))},null,8,["rules"])]),_:1})):_("",!0),l.dataForm.hasFile3?(f(),g(m,{key:6,md:"12",cols:"12"},{default:s(()=>[et,tt,a(F,{class:"my-3",type:"number",modelValue:l.dataForm.nik_jaminan,"onUpdate:modelValue":e[32]||(e[32]=o=>l.dataForm.nik_jaminan=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1})):_("",!0),a(I,{thickness:5}),a(m,{md:"12",cols:"12"},{default:s(()=>[lt,at,a(F,{class:"my-3",modelValue:l.dataForm.type_bussiness,"onUpdate:modelValue":e[33]||(e[33]=o=>l.dataForm.type_bussiness=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[st,ot,a(F,{class:"my-3",modelValue:l.dataForm.desc_bussiness,"onUpdate:modelValue":e[34]||(e[34]=o=>l.dataForm.desc_bussiness=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(m,{md:"12",cols:"12"},{default:s(()=>[nt,rt,a(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[35]||(e[35]=o=>d.handleFileChange(o,"file12"))},null,8,["rules"])]),_:1}),a(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[a(D,{type:"submit",disabled:l.dataForm.name==null||l.dataForm.plafon==null||l.dataForm.type_bussiness==null||l.dataForm.desc_bussiness==null||l.dataForm.order_source==null||l.dataForm.file1==null||l.dataForm.file4==null||l.dataForm.file10==null&&l.dataForm.file11==null||l.dataForm.file12==null},{default:s(()=>[c(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[36]||(e[36]=o=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:s(()=>[a(W,{modelValue:l.uploadProgress,"onUpdate:modelValue":e[37]||(e[37]=o=>l.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const Tt=j(se,[["render",it],["__scopeId","data-v-915fa552"]]);export{Tt as default};

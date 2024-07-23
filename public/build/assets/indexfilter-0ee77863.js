import{m as A}from"./axios-379d51f3.js";import{_ as j,r as L,o as h,c as x,a as l,w as a,N as M,H as E,V as m,F as q,b as r,j as F,f as c,G,i as g,e as D,t as C,h as y,L as S,M as w,O as T,d as R,a6 as W,I as J,J as z}from"./main-759cb87b.js";import{V as K,a as H,c as Y,b as Q}from"./VCard-52223027.js";import{V as X,a as b}from"./VTabs-7f036863.js";import{V as Z,a as $,b as ee,c as O}from"./VWindowItem-77d73067.js";import{V as B}from"./VRow-7c3bab50.js";import{V as te}from"./VSpacer-3e0b024d.js";import{V as v}from"./VTextField-06e2cde8.js";import{V}from"./VTooltip-d4792dab.js";import{V as se}from"./VDialog-8e0db9e1.js";import{V as le}from"./VForm-bcf32498.js";import{V as P}from"./VSelect-c0a0589e.js";import{V as k}from"./VFileInput-6bc0e2b3.js";import{d as I}from"./VMenu-5cea52e6.js";import{V as U}from"./VCheckbox-c08f91b8.js";import"./VAvatar-a86fd93f.js";import"./VImg-257b2f41.js";import"./index-b36c4722.js";import"./VInput-e8b396b8.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-9f9f470a.js";import"./VChip-28e03063.js";const ae={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(t){this.dataForm.plafon=t.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(t){this.dataForm.plafon=t.replace(/\D/g,"")}},searchableItems(){return this.items.map(t=>({...t,office_names:t.user.position.offices.map(e=>e.name).join(", ")}))}},data(){return{monthYear:this.$route.params.monthYear,overlay:!1,insert:!1,searchValue:"",userData:null,selectedPhoto:"",userToken:null,uploadProgress:null,tab:0,rules:{required:t=>!!t||"Required"},role:[],items:[],users:[],originalItems:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Kantor",value:"office_names",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!1},{text:"Analisa AO/RO",value:"analisaAO",sortable:!1},{text:"Aksi",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],dataForm:{id:null,user_id:null,name:"",plafon:null,type:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],typeCreditList:[{value:1,title:"Reguler"},{value:2,title:"Restruktur"}]}},watch:{tab(t){t==1?this.filterDataStatus(1):t==2?this.filterDataStatus(2):t==3?this.filterDataStatus(3):t==4?this.filterDataStatus(4):t==5?this.filterDataStatus(5):t==6?this.filterDataStatus(6):t==7?this.filterDataStatus(7):this.items=[...this.originalItems]}},methods:{filterDataStatus(t){const e={1:n=>n.isApproved==1,2:n=>n.isApproved==2,3:n=>n.isApproved==3,7:n=>n.isApproved==4,4:n=>parseInt(n.phase)==1,5:n=>n.attachments.some(u=>u.name.includes("SLIK")&&parseInt(u.phase)==2&&(u.path!="null"||u.link!=null)),6:n=>parseInt(n.phase)==4};this.items=t in e?this.originalItems.filter(e[t]):[...this.originalItems]},hasSlikAttachment(t){return t.some(e=>e.name.includes("SLIK")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},hasAnalisaAoAttachment(t){return t.some(e=>e.name.includes("Analisa Awal Kredit AO")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},customSearch(t,e,n){return e?t.filter(u=>n.some(s=>s==="user.position.offices.name"?u.user.position.offices.some(d=>d.name.toLowerCase().includes(e.toLowerCase())):String(this.getNestedValue(u,s)).toLowerCase().includes(e.toLowerCase()))):t},getNestedValue(t,e){return e.split(".").reduce((n,u)=>n&&n[u]!==void 0?n[u]:null,t)},goBack(){this.$router.go(-1)},formatDate(t){return new Date(t).toLocaleString("id-ID")},async downloadFile(t){try{this.overlay=!0;const e=await A.get(`/download-all/${t}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const n=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=n,u.setAttribute("download",`${t}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(t){return t=t.replace(/\D/g,""),t=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),t},toDetail(t){this.$router.push(`/a-credit/${t.id}`)},async deleteFile(t){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const n=await A.delete(`/credit/${t.id}`);n.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",n.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",n.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(t){!this.dataForm[t]!=null&&(this.dataForm[t]=null)},handleFileChange(t,e){const n=t.target.files[0];n&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(n.type)?(this.dataForm[e]=n,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),t.target.value=null)},async getRecaptData(t){try{this.overlay=!0;const e=await A.get(`/generatemonthly/${t}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const n=e.headers["content-disposition"];let u="download.xlsx";if(n){const o=n.match(/filename="?(.+)"?/i);o.length===2&&(u=o[1])}const s=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),d=window.URL.createObjectURL(s),_=document.createElement("a");_.href=d,_.setAttribute("download",u),document.body.appendChild(_),_.click(),document.body.removeChild(_),this.$showToast("success","Berhasil","File Excel berhasil diunduh")}else this.$showToast("error","Sorry",e.data.data.message)}catch(e){this.overlay=!1,this.$showToast("error","Sorry",e.response.data.message)}},async openModal(t,e=null){t===1?this.insert=!0:t===2&&this.getRecaptData(this.monthYear)},closeModal(t){t===1?(this.resetForm(),this.insert=!1):t===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,type:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},formatNumber(t){return t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},getUserData(){const t=localStorage.getItem("userData");t&&(this.userData=JSON.parse(t))},async getAllFiles(){try{this.overlay=!0;const t=new FormData;t.append("monthYear",this.monthYear);const e=await A.post("/getCredit",t);e.status===200?(this.items=e.data.data.files,this.users=e.data.data.users.map(n=>({value:n.id,title:n.name})),this.userAccess=e.data.data.userAccess,this.role=e.data.data.role,this.originalItems=[...this.items],this.overlay=!1):this.$showToast("error","Sorry",e.data.data.message)}catch(t){this.overlay=!1,this.$showToast("error","Sorry",t.response.data.message)}},formatInputPlafon(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},async insertData(){try{this.overlay=!0;const t=new FormData;t.append("name",this.dataForm.name),t.append("user_id",this.dataForm.user_id),t.append("type",this.dataForm.type),t.append("nik_pemohon",this.dataForm.nik_pemohon),t.append("address",this.dataForm.address),t.append("no_hp",this.dataForm.no_hp),t.append("order_source",this.dataForm.order_source),t.append("status_kredit",this.dataForm.status_kredit),t.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),t.append("type_bussiness",this.dataForm.type_bussiness),t.append("desc_bussiness",this.dataForm.desc_bussiness),t.append("order_source",this.dataForm.order_source),this.dataForm.file2!=null&&t.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&t.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let s="file"+u,d="noteFile"+u,_="hasFile"+u;this.dataForm.hasOwnProperty(_)&&this.dataForm[_]||this.dataForm[s]?this.dataForm[s]&&(t.append(s,this.dataForm[s]),t.append(d,this.dataForm[d])):this.dataForm[s]&&t.append(s,this.dataForm[s])}t.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(s){console.error("Error calculating progress:",s)}},headers:{"Content-Type":"multipart/form-data"}},n=await A.post("/credit",t,e);n.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",n.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",n.data.message))}catch(t){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",t.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}};const i=t=>(J("data-v-e2156168"),t=t(),z(),t),oe=i(()=>r("br",null,null,-1)),re=i(()=>r("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),ie=i(()=>r("p",null,"Data Kosong",-1)),ne=i(()=>r("p",null,"loading data .....",-1)),de={key:0},ue={key:1},me={key:2},pe={key:3},ce={class:"operation-wrapper"},he={class:"d-flex justify-space-between"},fe=["onClick"],ge=["onClick"],_e=["onClick"],Fe=i(()=>r("span",{style:{color:"red"}},"*",-1)),ye=i(()=>r("span",{class:"subtitle-1 text-center"},"Pilih Jenis Kredit: ",-1)),ve=i(()=>r("span",{style:{color:"red"}},"*",-1)),be=i(()=>r("span",{class:"subtitle-1 text-center"},"Pilih AO/RO: ",-1)),Ve=i(()=>r("span",{style:{color:"red"}},"*",-1)),ke=i(()=>r("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),xe=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ae=i(()=>r("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),Se=i(()=>r("span",{style:{color:"red"}},"*",-1)),we=i(()=>r("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),Pe=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ie=i(()=>r("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),De=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ce=i(()=>r("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),Te=i(()=>r("span",{style:{color:"red"}},"*",-1)),Re=i(()=>r("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Ne=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ee=i(()=>r("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),Ke=i(()=>r("span",{style:{color:"red"}},"*",-1)),Oe=i(()=>r("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),Be=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ue=i(()=>r("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),je=i(()=>r("span",{style:{color:"red"}},"*",-1)),Le=i(()=>r("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Me=i(()=>r("span",{style:{color:"red"}},"*",-1)),qe=i(()=>r("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),Ge=i(()=>r("span",{style:{color:"red"}},"*",-1)),We=i(()=>r("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),Je=i(()=>r("span",{style:{color:"red"}},"*",-1)),ze=i(()=>r("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),He=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ye=i(()=>r("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),Qe=i(()=>r("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),Xe=i(()=>r("span",{style:{color:"red"}},"*",-1)),Ze=i(()=>r("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),$e=i(()=>r("span",{style:{color:"red"}},"*",-1)),et=i(()=>r("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),tt=i(()=>r("span",{style:{color:"red"}},"*",-1)),st=i(()=>r("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),lt=i(()=>r("span",{style:{color:"red"}},"*",-1)),at=i(()=>r("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function ot(t,e,n,u,s,d){const _=L("EasyDataTable");return h(),x(E,null,[l(M,{absolute:!0,modelValue:s.overlay,"onUpdate:modelValue":e[0]||(e[0]=o=>s.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:a(()=>[l(m,null,{default:a(()=>[l(q,{color:"primary",size:"32",indeterminate:""}),oe,re]),_:1})]),_:1},8,["modelValue"]),l(K,null,{default:a(()=>[l(H,{class:"align-left"},{default:a(()=>[r("span",{color:"primary",onClick:e[1]||(e[1]=(...o)=>d.goBack&&d.goBack(...o)),style:{cursor:"pointer"}},[l(F,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),c(" Back ")]),l(Y,{class:"text-2xl font-weight-bold"},{default:a(()=>[c(" List Kredit ")]),_:1})]),_:1}),l(X,{modelValue:s.tab,"onUpdate:modelValue":e[2]||(e[2]=o=>s.tab=o),class:"v-tabs-pill","bg-color":"secondary"},{default:a(()=>[l(b,{value:"0"},{default:a(()=>[c("Semua")]),_:1}),l(b,{value:"1"},{default:a(()=>[c("Approved")]),_:1}),l(b,{value:"2"},{default:a(()=>[c("Pending")]),_:1}),l(b,{value:"3"},{default:a(()=>[c("Rejected")]),_:1}),l(b,{value:"7"},{default:a(()=>[c("Cancel by Debitur")]),_:1}),c(" | "),l(b,{value:"4"},{default:a(()=>[c("Pooling")]),_:1}),l(b,{value:"5"},{default:a(()=>[c("SLIK")]),_:1}),l(b,{value:"6"},{default:a(()=>[c("Komite")]),_:1})]),_:1},8,["modelValue"]),l(Q,null,{default:a(()=>[l(Z,{modelValue:s.tab,"onUpdate:modelValue":e[8]||(e[8]=o=>s.tab=o)},{default:a(()=>[(h(!0),x(E,null,G(s.phases,o=>(h(),g($,{value:o.value},{default:a(()=>[l(B,{class:"d-flex justify-end pa-3"},{default:a(()=>[l(D,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[3]||(e[3]=p=>d.openModal(1))},{default:a(()=>[l(F,{icon:"mdi-plus"}),c(" Tambah Data ")]),_:1}),l(D,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[4]||(e[4]=p=>d.openModal(2))},{default:a(()=>[l(F,{icon:"mdi-download"}),c(" Rekap Data ")]),_:1}),l(te),l(v,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:s.searchValue,"onUpdate:modelValue":e[5]||(e[5]=p=>s.searchValue=p)},null,8,["modelValue"])]),_:1}),r("div",{class:"table-container",onTouchstart:e[6]||(e[6]=R(()=>{},["stop"])),onTouchmove:e[7]||(e[7]=R(()=>{},["stop"]))},[l(_,{"show-index":"",headers:s.headers,items:d.searchableItems,"search-value":s.searchValue,"search-field":s.searchField,"border-cell":"","buttons-pagination":"","rows-per-page":500},{"empty-message":a(()=>[ie]),loading:a(()=>[ne]),"item-plafon":a(p=>[c("Rp. "+C(d.formatInput(p.plafon))+",-",1)]),"item-isApproved":a(p=>[parseInt(p.isApproved)==1?(h(),x("span",de," Approved")):y("",!0),parseInt(p.isApproved)==2?(h(),x("span",ue," Pending")):y("",!0),parseInt(p.isApproved)==3?(h(),x("span",me," Rejected")):y("",!0),parseInt(p.isApproved)==4?(h(),x("span",pe," Cancel by Debitur")):y("",!0)]),"item-aoro":a(p=>[r("span",null,C(p.user.name),1)]),"item-created_at":a(p=>[r("span",null,C(d.formatDate(p.created_at))+" WIB",1)]),"item-slik":a(p=>[d.hasSlikAttachment(p.attachments)?(h(),g(V,{key:0,location:"top",text:"Kondisi SLIK Sudah Terupload"},{activator:a(({props:f})=>[r("span",S(w(f)),[l(F,{color:"success"},{default:a(()=>[c("mdi-check-circle")]),_:1})],16)]),_:1})):(h(),g(V,{key:1,location:"top",text:"Kondisi SLIK Belum Terupload"},{activator:a(({props:f})=>[r("span",S(w(f)),[l(F,{color:"error"},{default:a(()=>[c("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-analisaAO":a(p=>[d.hasAnalisaAoAttachment(p.attachments)?(h(),g(V,{key:0,location:"top",text:"Analisa AO Sudah Terupload"},{activator:a(({props:f})=>[r("span",S(w(f)),[l(F,{color:"success"},{default:a(()=>[c("mdi-check-circle")]),_:1})],16)]),_:1})):(h(),g(V,{key:1,location:"top",text:"Analisa AO Belum Terupload"},{activator:a(({props:f})=>[r("span",S(w(f)),[l(F,{color:"error"},{default:a(()=>[c("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-operation":a(p=>[r("div",ce,[r("div",he,[l(V,{location:"top",text:"Detail Kredit"},{activator:a(({props:f})=>[r("button",T(f,{onClick:N=>d.toDetail(p)}),[l(F,{size:"20",icon:"bx-link-external",color:"blue"})],16,fe)]),_:2},1024),l(V,{location:"top",text:"Hapus Kredit"},{activator:a(({props:f})=>[r("button",T(f,{onClick:N=>d.deleteFile(p)}),[l(F,{size:"20",icon:"bx-trash",color:"blue"})],16,ge)]),_:2},1024),l(V,{location:"top",text:"Download Semua File Kredit"},{activator:a(({props:f})=>[r("button",T(f,{onClick:N=>d.downloadFile(p.id)}),[l(F,{size:"20",icon:"bx-download",color:"red"})],16,_e)]),_:2},1024)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),l(se,{modelValue:s.insert,"onUpdate:modelValue":e[36]||(e[36]=o=>s.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:a(()=>[l(K,null,{title:a(()=>[c(" Tambah Data ")]),text:a(()=>[l(le,{onSubmit:R(d.insertData,["prevent"])},{default:a(()=>[l(B,null,{default:a(()=>[l(m,{md:"12",cols:"12"},{default:a(()=>[Fe,ye,l(P,{items:s.typeCreditList,autofocus:"",modelValue:s.dataForm.type,"onUpdate:modelValue":e[9]||(e[9]=o=>s.dataForm.type=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[ve,be,l(P,{items:s.users,modelValue:s.dataForm.user_id,"onUpdate:modelValue":e[10]||(e[10]=o=>s.dataForm.user_id=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Ve,ke,l(v,{class:"my-3",modelValue:s.dataForm.name,"onUpdate:modelValue":e[11]||(e[11]=o=>s.dataForm.name=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[xe,Ae,l(v,{class:"my-3",modelValue:d.formattedPlafon,"onUpdate:modelValue":e[12]||(e[12]=o=>d.formattedPlafon=o),type:"text",onInput:d.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Se,we,l(v,{class:"my-3",modelValue:s.dataForm.nik_pemohon,"onUpdate:modelValue":e[13]||(e[13]=o=>s.dataForm.nik_pemohon=o),type:"number",rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Pe,Ie,l(v,{class:"my-3",modelValue:s.dataForm.address,"onUpdate:modelValue":e[14]||(e[14]=o=>s.dataForm.address=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[De,Ce,l(v,{class:"my-3",modelValue:s.dataForm.no_hp,"onUpdate:modelValue":e[15]||(e[15]=o=>s.dataForm.no_hp=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Te,Re,l(P,{items:s.orderList,modelValue:s.dataForm.order_source,"onUpdate:modelValue":e[16]||(e[16]=o=>s.dataForm.order_source=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Ne,Ee,l(P,{items:s.statusCreditList,modelValue:s.dataForm.status_kredit,"onUpdate:modelValue":e[17]||(e[17]=o=>s.dataForm.status_kredit=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Ke,Oe,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[18]||(e[18]=o=>d.handleFileChange(o,"file1"))},null,8,["rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Be,Ue,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[19]||(e[19]=o=>d.handleFileChange(o,"file4"))},null,8,["rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[je,Le,l(ee,{modelValue:s.selectedPhoto,"onUpdate:modelValue":e[20]||(e[20]=o=>s.selectedPhoto=o),mandatory:!0,row:""},{default:a(()=>[l(O,{label:"Foto Kunjungan",value:"fotoKunjungan"}),l(O,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),s.selectedPhoto==="fotoKunjungan"?(h(),g(m,{key:0,md:"12",cols:"12"},{default:a(()=>[Me,qe,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[21]||(e[21]=o=>{d.handleFileChange(o,"file10"),d.resetFile("file11")})},null,8,["rules"])]),_:1})):y("",!0),s.selectedPhoto==="fotoWhatsApp"?(h(),g(m,{key:1,md:"12",cols:"12"},{default:a(()=>[Ge,We,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[22]||(e[22]=o=>{d.handleFileChange(o,"file11"),d.resetFile("file10")})},null,8,["rules"])]),_:1})):y("",!0),l(I,{thickness:5}),l(m,{cols:"12",md:"12"},{default:a(()=>[l(U,{modelValue:s.dataForm.hasFile2,"onUpdate:modelValue":e[23]||(e[23]=o=>s.dataForm.hasFile2=o),label:"Apakah pemohon sudah menikah?",onChange:e[24]||(e[24]=o=>(d.resetFile("file2"),s.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),l(I,{thickness:5}),s.dataForm.hasFile2?(h(),g(m,{key:2,md:"12",cols:"12"},{default:a(()=>[Je,ze,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[25]||(e[25]=o=>d.handleFileChange(o,"file2"))},null,8,["rules"])]),_:1})):y("",!0),s.dataForm.hasFile2?(h(),g(m,{key:3,md:"12",cols:"12"},{default:a(()=>[He,Ye,l(v,{class:"my-3",type:"number",modelValue:s.dataForm.nik_pasangan,"onUpdate:modelValue":e[26]||(e[26]=o=>s.dataForm.nik_pasangan=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1})):y("",!0),l(m,{md:"12",cols:"12"},{default:a(()=>[Qe,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[27]||(e[27]=o=>{d.handleFileChange(o,"file5"),d.resetFile("file7"),d.resetFile("file8")})},null,8,["rules"])]),_:1}),l(I,{thickness:5}),l(m,{cols:"12",md:"12"},{default:a(()=>[l(U,{modelValue:s.dataForm.hasFile3,"onUpdate:modelValue":e[28]||(e[28]=o=>s.dataForm.hasFile3=o),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[29]||(e[29]=o=>(d.resetFile("file3"),s.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),s.dataForm.hasFile3?(h(),g(m,{key:4,md:"12",cols:"12"},{default:a(()=>[Xe,Ze,l(k,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[30]||(e[30]=o=>d.handleFileChange(o,"file3"))},null,8,["rules"])]),_:1})):y("",!0),s.dataForm.hasFile3?(h(),g(m,{key:5,md:"12",cols:"12"},{default:a(()=>[$e,et,l(v,{class:"my-3",type:"number",modelValue:s.dataForm.nik_jaminan,"onUpdate:modelValue":e[31]||(e[31]=o=>s.dataForm.nik_jaminan=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1})):y("",!0),l(I,{thickness:5}),l(m,{md:"12",cols:"12"},{default:a(()=>[tt,st,l(v,{class:"my-3",modelValue:s.dataForm.type_bussiness,"onUpdate:modelValue":e[32]||(e[32]=o=>s.dataForm.type_bussiness=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[lt,at,l(v,{class:"my-3",modelValue:s.dataForm.desc_bussiness,"onUpdate:modelValue":e[33]||(e[33]=o=>s.dataForm.desc_bussiness=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:a(()=>[l(D,{type:"submit",disabled:s.dataForm.name==null||s.dataForm.plafon==null||s.dataForm.type_bussiness==null||s.dataForm.desc_bussiness==null||s.dataForm.order_source==null||s.dataForm.file1==null||s.dataForm.file4==null||s.dataForm.file10==null&&s.dataForm.file11==null},{default:a(()=>[c(" Simpan ")]),_:1},8,["disabled"]),r("button",{type:"button",class:"btn btn-blue",onClick:e[34]||(e[34]=o=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:a(()=>[l(W,{modelValue:s.uploadProgress,"onUpdate:modelValue":e[35]||(e[35]=o=>s.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const Pt=j(ae,[["render",ot],["__scopeId","data-v-e2156168"]]);export{Pt as default};

import{m as k}from"./VGrid-b5580a6d.js";import{r as B,o as c,c as V,a as l,w as o,G as D,E as O,e as f,b as n,i as y,M as S,F as L,h,V as C,f as g,t as w,d as A,a2 as M,H as q,I as G}from"./main-349e7ea3.js";import{_ as W}from"./_plugin-vue_export-helper-c27b6911.js";import{V as J}from"./VOverlay-9dffcaa1.js";import{V as T,c as m,d as H,b as z}from"./VCol-f3715800.js";import{V as N}from"./VSpacer-f09d9411.js";import{V as I}from"./VTooltip-1c232a02.js";import{V as Y,a as v}from"./VTabs-c01019b6.js";import{V as Q,a as X,b as Z,c as E}from"./VWindowItem-a58ebb49.js";import{V as R}from"./VRow-f2d27e6a.js";import{V as F}from"./VTextField-7057b30c.js";import{V as $}from"./VDialog-e7342259.js";import{V as ee}from"./VForm-94fc73ec.js";import{V as U}from"./VSelect-1c530008.js";import{V as _}from"./VFileInput-22ea515c.js";import{V as x}from"./VDivider-6e66d5b7.js";import{V as j}from"./VCheckbox-87c4019e.js";import"./VImg-604eb10f.js";import"./index-04bdf33e.js";import"./VCheckboxBtn-f85410da.js";import"./VInput-f438de35.js";import"./dialog-transition-9b7cefdc.js";import"./VMenu-c740b739.js";import"./VChip-8e827aa7.js";const te={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(s){this.dataForm.plafon=s.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(s){this.dataForm.plafon=s.replace(/\D/g,"")}},searchableItems(){return this.items.map(s=>({...s,office_names:s.user.position.offices.map(e=>e.name).join(", ")}))}},data(){return{selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:s=>!!s||"Required"},role:{canDownload:0},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Kantor",value:"office_names",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(s){s==1?this.filterDataStatus(1):s==2?this.filterDataStatus(2):s==3?this.filterDataStatus(3):s==4?this.filterDataStatus(4):this.items=[...this.originalItems]}},methods:{hasSlikAttachment(s){return s.some(e=>e.name.includes("SLIK")&&parseInt(e.phase)==2)},customSearch(s,e,d){return e?s.filter(u=>d.some(t=>t==="user.position.offices.name"?u.user.position.offices.some(i=>i.name.toLowerCase().includes(e.toLowerCase())):String(this.getNestedValue(u,t)).toLowerCase().includes(e.toLowerCase()))):s},getNestedValue(s,e){return e.split(".").reduce((d,u)=>d&&d[u]!==void 0?d[u]:null,s)},toPage(){this.$router.push("/u-indexfilter")},formatDate(s){return new Date(s).toLocaleString("id-ID")},async downloadFile(s){try{this.overlay=!0;const e=await k.get(`/download-all/${s}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const d=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=d,u.setAttribute("download",`${s}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(s){return s=s.replace(/\D/g,""),s=s.replace(/\B(?=(\d{3})+(?!\d))/g,","),s},toDetail(s){this.$router.push(`/u-credit/${s.id}`)},async deleteFile(s){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const d=await k.delete(`/user/credit/${s.id}`);d.status===200?(this.overlay=!1,this.getAllFiles(),this.$showToast("success","Berhasill",d.data.message)):(this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",d.data.message))}catch(e){this.overlay=!1,this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(s){!this.dataForm[s]!=null&&(this.dataForm[s]=null)},handleFileChange(s,e){const d=s.target.files[0];d&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(d.type)?(this.dataForm[e]=d,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),s.target.value=null)},async openModal(s,e=null){s===1&&(this.insert=!0)},closeModal(s){s===1?(this.resetForm(),this.insert=!1):s===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},formatNumber(s){return s?s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(s){s!=4?this.items=this.originalItems.filter(e=>e.isApproved==s):this.items=this.originalItems.filter(e=>e.attachments.some(d=>d.name.includes("SLIK")&&parseInt(d.phase)==2))},getUserData(){const s=localStorage.getItem("userData");s&&(this.userData=JSON.parse(s))},async getAllFiles(){try{const s=await k.get("/user/credit");s.status===200?(this.items=s.data.data.files,this.userAccess=s.data.data.userAccess,this.role=s.data.data.role,this.originalItems=[...this.items]):this.$showToast("error","Sorry",s.data.data.message)}catch(s){this.$showToast("error","Sorry",s.response.data.message)}},formatInputPlafon(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},async insertData(){try{this.overlay=!0;const s=new FormData;s.append("name",this.dataForm.name),s.append("nik_pemohon",this.dataForm.nik_pemohon),s.append("address",this.dataForm.address),s.append("no_hp",this.dataForm.no_hp),s.append("order_source",this.dataForm.order_source),s.append("status_kredit",this.dataForm.status_kredit),s.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),s.append("type_bussiness",this.dataForm.type_bussiness),s.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&s.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&s.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let t="file"+u,i="noteFile"+u,b="hasFile"+u;this.dataForm.hasOwnProperty(b)&&this.dataForm[b]||this.dataForm[t]?this.dataForm[t]&&(s.append(t,this.dataForm[t]),s.append(i,this.dataForm[i])):this.dataForm[t]&&s.append(t,this.dataForm[t])}s.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(t){console.error("Error calculating progress:",t)}},headers:{"Content-Type":"multipart/form-data"}},d=await k.post("/user/credit",s,e);d.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",d.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",d.data.message))}catch(s){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",s.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}};const r=s=>(q("data-v-9c729a14"),s=s(),G(),s),se=r(()=>n("br",null,null,-1)),le=r(()=>n("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),ae=r(()=>n("span",{class:"text-sm mt-2"},"(Tampilan bulanan)",-1)),oe=r(()=>n("p",null,"Data Kosong",-1)),ne=r(()=>n("p",null,"loading data .....",-1)),re={key:0},ie={key:1},de={key:2},ue={class:"operation-wrapper"},me={class:"d-flex justify-space-between"},pe=["onClick"],ce=["onClick"],fe=r(()=>n("span",{style:{color:"red"}},"*",-1)),he=r(()=>n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),ge=r(()=>n("span",{style:{color:"red"}},"*",-1)),Fe=r(()=>n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),_e=r(()=>n("span",{style:{color:"red"}},"*",-1)),ye=r(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),Ve=r(()=>n("span",{style:{color:"red"}},"*",-1)),ve=r(()=>n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),be=r(()=>n("span",{style:{color:"red"}},"*",-1)),ke=r(()=>n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),xe=r(()=>n("span",{style:{color:"red"}},"*",-1)),Pe=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Se=r(()=>n("span",{style:{color:"red"}},"*",-1)),we=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),Ae=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ie=r(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),De=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ce=r(()=>n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),Te=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ne=r(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Ee=r(()=>n("span",{style:{color:"red"}},"*",-1)),Re=r(()=>n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),Ue=r(()=>n("span",{style:{color:"red"}},"*",-1)),je=r(()=>n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),Ke=r(()=>n("span",{style:{color:"red"}},"*",-1)),Be=r(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),Oe=r(()=>n("span",{style:{color:"red"}},"*",-1)),Le=r(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),Me=r(()=>n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),qe=r(()=>n("span",{style:{color:"red"}},"*",-1)),Ge=r(()=>n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),We=r(()=>n("span",{style:{color:"red"}},"*",-1)),Je=r(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),He=r(()=>n("span",{style:{color:"red"}},"*",-1)),ze=r(()=>n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),Ye=r(()=>n("span",{style:{color:"red"}},"*",-1)),Qe=r(()=>n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function Xe(s,e,d,u,t,i){const b=B("EasyDataTable");return c(),V(D,null,[l(J,{absolute:!0,modelValue:t.overlay,"onUpdate:modelValue":e[0]||(e[0]=a=>t.overlay=a),contained:"",persistent:"",class:"align-center justify-center"},{default:o(()=>[l(m,null,{default:o(()=>[l(O,{color:"primary",size:"32",indeterminate:""}),se,le]),_:1})]),_:1},8,["modelValue"]),l(T,null,{default:o(()=>[l(H,{class:"text-2xl font-weight-bold d-flex justify-left"},{default:o(()=>[f(" List Kredit "),l(N),ae,l(I,{location:"top",text:"Lihat Per-Bulan"},{activator:o(({props:a})=>[n("button",S(a,{onClick:e[1]||(e[1]=(...p)=>i.toPage&&i.toPage(...p))}),[l(y,{icon:"mdi-view-comfy",class:"ml-2",onClick:i.toPage},null,8,["onClick"])],16)]),_:1})]),_:1}),l(Y,{modelValue:t.tab,"onUpdate:modelValue":e[2]||(e[2]=a=>t.tab=a),class:"v-tabs-pill","bg-color":"secondary"},{default:o(()=>[l(v,{value:"0"},{default:o(()=>[f("Semua")]),_:1}),l(v,{value:"1"},{default:o(()=>[f("Approved")]),_:1}),l(v,{value:"2"},{default:o(()=>[f("Pending")]),_:1}),l(v,{value:"3"},{default:o(()=>[f("Rejected")]),_:1}),l(v,{value:"4"},{default:o(()=>[f("SLIK")]),_:1})]),_:1},8,["modelValue"]),l(z,null,{default:o(()=>[l(Q,{modelValue:t.tab,"onUpdate:modelValue":e[7]||(e[7]=a=>t.tab=a)},{default:o(()=>[(c(!0),V(D,null,L(t.phases,a=>(c(),h(X,{value:a.value},{default:o(()=>[l(R,{class:"d-flex justify-end pa-3"},{default:o(()=>[t.userAccess&&parseInt(t.userAccess.canInsertData)?(c(),h(C,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[3]||(e[3]=p=>i.openModal(1))},{default:o(()=>[l(y,{icon:"mdi-plus"}),f("Tambah Data ")]),_:1})):g("",!0),l(N),l(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:t.searchValue,"onUpdate:modelValue":e[4]||(e[4]=p=>t.searchValue=p)},null,8,["modelValue"])]),_:1}),n("div",{class:"table-container",onTouchstart:e[5]||(e[5]=A(()=>{},["stop"])),onTouchmove:e[6]||(e[6]=A(()=>{},["stop"]))},[l(b,{"show-index":"",headers:t.headers,items:i.searchableItems,"search-value":t.searchValue,"search-field":t.searchField},{"empty-message":o(()=>[oe]),loading:o(()=>[ne]),"item-plafon":o(p=>[f("Rp. "+w(i.formatInput(p.plafon))+",-",1)]),"item-isApproved":o(p=>[parseInt(p.isApproved)==1?(c(),V("span",re," Approved")):g("",!0),parseInt(p.isApproved)==2?(c(),V("span",ie," Pending")):g("",!0),parseInt(p.isApproved)==3?(c(),V("span",de," Rejected")):g("",!0)]),"item-aoro":o(p=>[n("span",null,w(p.user.name),1)]),"item-created_at":o(p=>[n("span",null,w(i.formatDate(p.created_at))+" WIB",1)]),"item-slik":o(p=>[n("span",null,[i.hasSlikAttachment(p.attachments)?(c(),h(y,{key:0,color:"success"},{default:o(()=>[f("mdi-check-circle")]),_:1})):(c(),h(y,{key:1,color:"error"},{default:o(()=>[f("mdi-close-circle")]),_:1}))])]),"item-operation":o(p=>[n("div",ue,[n("div",me,[l(I,{location:"top",text:"Detail Kredit"},{activator:o(({props:P})=>[n("button",S(P,{onClick:K=>i.toDetail(p)}),[l(y,{size:"20",icon:"bx-link-external",color:"blue"})],16,pe)]),_:2},1024),t.role&&t.role.canDownload==1?(c(),h(I,{key:0,location:"top",text:"Download Semua File Kredit"},{activator:o(({props:P})=>[n("button",S(P,{onClick:K=>i.downloadFile(p.id)}),[l(y,{size:"20",icon:"bx-download",color:"red"})],16,ce)]),_:2},1024)):g("",!0)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),l($,{modelValue:t.insert,"onUpdate:modelValue":e[33]||(e[33]=a=>t.insert=a),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:o(()=>[l(T,null,{title:o(()=>[f(" Tambah Data")]),text:o(()=>[l(ee,{onSubmit:A(i.insertData,["prevent"])},{default:o(()=>[l(R,null,{default:o(()=>[l(m,{md:"12",cols:"12"},{default:o(()=>[fe,he,l(F,{class:"my-3",modelValue:t.dataForm.name,"onUpdate:modelValue":e[8]||(e[8]=a=>t.dataForm.name=a),autofocus:"",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[ge,Fe,l(F,{class:"my-3",modelValue:i.formattedPlafon,"onUpdate:modelValue":e[9]||(e[9]=a=>i.formattedPlafon=a),type:"text",onInput:i.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[_e,ye,l(F,{class:"my-3",modelValue:t.dataForm.nik_pemohon,"onUpdate:modelValue":e[10]||(e[10]=a=>t.dataForm.nik_pemohon=a),type:"number",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[Ve,ve,l(F,{class:"my-3",modelValue:t.dataForm.address,"onUpdate:modelValue":e[11]||(e[11]=a=>t.dataForm.address=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[be,ke,l(F,{class:"my-3",modelValue:t.dataForm.no_hp,"onUpdate:modelValue":e[12]||(e[12]=a=>t.dataForm.no_hp=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[xe,Pe,l(U,{items:t.orderList,autofocus:"",modelValue:t.dataForm.order_source,"onUpdate:modelValue":e[13]||(e[13]=a=>t.dataForm.order_source=a),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[Se,we,l(U,{items:t.statusCreditList,autofocus:"",modelValue:t.dataForm.status_kredit,"onUpdate:modelValue":e[14]||(e[14]=a=>t.dataForm.status_kredit=a),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[Ae,Ie,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[15]||(e[15]=a=>i.handleFileChange(a,"file1"))},null,8,["rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[De,Ce,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[16]||(e[16]=a=>i.handleFileChange(a,"file4"))},null,8,["rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[Te,Ne,l(Z,{modelValue:t.selectedPhoto,"onUpdate:modelValue":e[17]||(e[17]=a=>t.selectedPhoto=a),mandatory:!0,row:""},{default:o(()=>[l(E,{label:"Foto Kunjungan",value:"fotoKunjungan"}),l(E,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),t.selectedPhoto==="fotoKunjungan"?(c(),h(m,{key:0,md:"12",cols:"12"},{default:o(()=>[Ee,Re,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[18]||(e[18]=a=>{i.handleFileChange(a,"file10"),i.resetFile("file11")})},null,8,["rules"])]),_:1})):g("",!0),t.selectedPhoto==="fotoWhatsApp"?(c(),h(m,{key:1,md:"12",cols:"12"},{default:o(()=>[Ue,je,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[19]||(e[19]=a=>{i.handleFileChange(a,"file11"),i.resetFile("file10")})},null,8,["rules"])]),_:1})):g("",!0),l(x,{thickness:5}),l(m,{cols:"12",md:"12"},{default:o(()=>[l(j,{modelValue:t.dataForm.hasFile2,"onUpdate:modelValue":e[20]||(e[20]=a=>t.dataForm.hasFile2=a),label:"Apakah pemohon sudah menikah?",onChange:e[21]||(e[21]=a=>(i.resetFile("file2"),t.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),l(x,{thickness:5}),t.dataForm.hasFile2?(c(),h(m,{key:2,md:"12",cols:"12"},{default:o(()=>[Ke,Be,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[22]||(e[22]=a=>i.handleFileChange(a,"file2"))},null,8,["rules"])]),_:1})):g("",!0),t.dataForm.hasFile2?(c(),h(m,{key:3,md:"12",cols:"12"},{default:o(()=>[Oe,Le,l(F,{class:"my-3",type:"number",modelValue:t.dataForm.nik_pasangan,"onUpdate:modelValue":e[23]||(e[23]=a=>t.dataForm.nik_pasangan=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):g("",!0),l(m,{md:"12",cols:"12"},{default:o(()=>[Me,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[24]||(e[24]=a=>{i.handleFileChange(a,"file5"),i.resetFile("file7"),i.resetFile("file8")})},null,8,["rules"])]),_:1}),l(x,{thickness:5}),l(m,{cols:"12",md:"12"},{default:o(()=>[l(j,{modelValue:t.dataForm.hasFile3,"onUpdate:modelValue":e[25]||(e[25]=a=>t.dataForm.hasFile3=a),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[26]||(e[26]=a=>(i.resetFile("file3"),t.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),t.dataForm.hasFile3?(c(),h(m,{key:4,md:"12",cols:"12"},{default:o(()=>[qe,Ge,l(_,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[27]||(e[27]=a=>i.handleFileChange(a,"file3"))},null,8,["rules"])]),_:1})):g("",!0),t.dataForm.hasFile3?(c(),h(m,{key:5,md:"12",cols:"12"},{default:o(()=>[We,Je,l(F,{class:"my-3",type:"number",modelValue:t.dataForm.nik_jaminan,"onUpdate:modelValue":e[28]||(e[28]=a=>t.dataForm.nik_jaminan=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):g("",!0),l(x,{thickness:5}),l(m,{md:"12",cols:"12"},{default:o(()=>[He,ze,l(F,{class:"my-3",modelValue:t.dataForm.type_bussiness,"onUpdate:modelValue":e[29]||(e[29]=a=>t.dataForm.type_bussiness=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:o(()=>[Ye,Qe,l(F,{class:"my-3",modelValue:t.dataForm.desc_bussiness,"onUpdate:modelValue":e[30]||(e[30]=a=>t.dataForm.desc_bussiness=a),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[l(C,{type:"submit",disabled:t.dataForm.name==null||t.dataForm.plafon==null||t.dataForm.type_bussiness==null||t.dataForm.desc_bussiness==null||t.dataForm.order_source==null||t.dataForm.status_kredit==null||t.dataForm.file1==null||t.dataForm.file4==null||t.dataForm.file10==null&&t.dataForm.file11==null},{default:o(()=>[f(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[31]||(e[31]=a=>i.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:o(()=>[l(M,{modelValue:t.uploadProgress,"onUpdate:modelValue":e[32]||(e[32]=a=>t.uploadProgress=a),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const bt=W(te,[["render",Xe],["__scopeId","data-v-9c729a14"]]);export{bt as default};

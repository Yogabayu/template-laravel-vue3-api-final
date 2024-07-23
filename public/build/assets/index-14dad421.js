import{m as x}from"./axios-379d51f3.js";import{_ as U,r as L,o as c,i as h,w as a,a as l,f,c as k,G as M,e as T,j as v,h as _,b as i,t as I,L as S,M as P,O as C,d as D,H as q,V as m,a6 as G,I as W,J}from"./main-e13e01ef.js";import{V as N,c as H,b as z}from"./VCard-dde46117.js";import{V as R}from"./VSpacer-ea7e0c2d.js";import{a as b,V as Y}from"./VTabs-7862277f.js";import{V as Q,a as X,b as Z,c as E}from"./VWindowItem-5cf4769c.js";import{V as K}from"./VRow-d55bf860.js";import{V as F}from"./VTextField-5b21d569.js";import{V as y}from"./VTooltip-352daf0f.js";import{V as $}from"./VForm-039aa4e4.js";import{V}from"./VFileInput-99b6be8f.js";import{V as O}from"./VCheckbox-8754924a.js";import{V as j}from"./VSelect-223b3896.js";import{d as w}from"./VMenu-9420821d.js";import{V as ee}from"./VDialog-6c37b39c.js";import"./VAvatar-e75a1c1b.js";import"./VImg-d2b3115e.js";import"./index-8bd69fed.js";import"./VInput-50502c2b.js";import"./forwardRefs-8348545e.js";import"./VChip-9a4dd6d5.js";import"./dialog-transition-fdf1565f.js";const te={inject:["loading"],computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(t){this.dataForm.plafon=t.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(t){this.dataForm.plafon=t.replace(/\D/g,"")}},searchableItems(){return this.items.map(t=>({...t,office_names:t.user.position.offices.map(e=>e.name).join(", ")}))}},data(){return{selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:t=>!!t||"Required"},role:{canDownload:0},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Kantor",value:"office_names",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!1},{text:"Analisa AO/RO",value:"analisaAO",sortable:!1},{text:"Aksi",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(t){t==1?this.filterDataStatus(1):t==2?this.filterDataStatus(2):t==3?this.filterDataStatus(3):t==4?this.filterDataStatus(4):t==5?this.filterDataStatus(5):t==6?this.filterDataStatus(6):t==7?this.filterDataStatus(7):this.items=[...this.originalItems]}},methods:{filterDataStatus(t){const e={1:r=>r.isApproved==1,2:r=>r.isApproved==2,3:r=>r.isApproved==3,4:r=>parseInt(r.phase)==1,5:r=>r.attachments.some(u=>u.name.includes("SLIK")&&parseInt(u.phase)==2&&(u.path!="null"||u.link!=null)),6:r=>parseInt(r.phase)==4,7:r=>r.isApproved==4};this.items=t in e?this.originalItems.filter(e[t]):[...this.originalItems]},hasSlikAttachment(t){return t.some(e=>e.name.includes("SLIK")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},hasAnalisaAoAttachment(t){return t.some(e=>e.name.includes("Analisa Awal Kredit AO")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},customSearch(t,e,r){return e?t.filter(u=>r.some(s=>s==="user.position.offices.name"?u.user.position.offices.some(d=>d.name.toLowerCase().includes(e.toLowerCase())):String(this.getNestedValue(u,s)).toLowerCase().includes(e.toLowerCase()))):t},getNestedValue(t,e){return e.split(".").reduce((r,u)=>r&&r[u]!==void 0?r[u]:null,t)},async toPage(){this.loading.show(),await this.$nextTick(),this.$router.push("/u-indexfilter")},formatDate(t){return new Date(t).toLocaleString("id-ID")},async downloadFile(t){try{this.loading.show();const e=await x.get(`/download-all/${t}`,{responseType:"blob"});if(e.status===200){this.loading.hide();const r=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=r,u.setAttribute("download",`${t}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.loading.hide(),this.$showToast("error","Error","Gagal mengunduh file")}catch{this.loading.hide(),this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(t){return t=t.replace(/\D/g,""),t=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),t},toDetail(t){this.$router.push(`/u-credit/${t.id}`)},async deleteFile(t){try{if(this.loading.show(),!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const r=await x.delete(`/user/credit/${t.id}`);r.status===200?(this.loading.hide(),this.getAllFiles(),this.$showToast("success","Berhasill",r.data.message)):(this.loading.hide(),this.getAllFiles(),this.$showToast("error","Sorry",r.data.message))}catch(e){this.loading.hide(),this.getAllFiles(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(t){!this.dataForm[t]!=null&&(this.dataForm[t]=null)},handleFileChange(t,e){const r=t.target.files[0];r&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(r.type)?(this.dataForm[e]=r,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),t.target.value=null)},async openModal(t,e=null){t===1&&(this.insert=!0)},closeModal(t){t===1?(this.resetForm(),this.insert=!1):t===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},formatNumber(t){return t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},getUserData(){const t=localStorage.getItem("userData");t&&(this.userData=JSON.parse(t))},async getAllFiles(){try{const t=await x.get("/user/credit");t.status===200?(this.items=t.data.data.files,this.userAccess=t.data.data.userAccess,this.role=t.data.data.role,this.originalItems=[...this.items]):this.$showToast("error","Sorry",t.data.data.message)}catch(t){this.$showToast("error","Sorry",t.response.data.message)}},formatInputPlafon(t){let e=t.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),t.target.value=e},async insertData(){try{this.loading.show();const t=new FormData;t.append("name",this.dataForm.name),t.append("nik_pemohon",this.dataForm.nik_pemohon),t.append("address",this.dataForm.address),t.append("no_hp",this.dataForm.no_hp),t.append("order_source",this.dataForm.order_source),t.append("status_kredit",this.dataForm.status_kredit),t.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),t.append("type_bussiness",this.dataForm.type_bussiness),t.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&t.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&t.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let s="file"+u,d="noteFile"+u,A="hasFile"+u;this.dataForm.hasOwnProperty(A)&&this.dataForm[A]||this.dataForm[s]?this.dataForm[s]&&(t.append(s,this.dataForm[s]),t.append(d,this.dataForm[d])):this.dataForm[s]&&t.append(s,this.dataForm[s])}t.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(s){console.error("Error calculating progress:",s)}},headers:{"Content-Type":"multipart/form-data"}},r=await x.post("/user/credit",t,e);r.status===200?(this.loading.hide(),this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",r.data.message)):(this.loading.hide(),this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",r.data.message))}catch(t){this.loading.hide(),this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",t.response.data.message)}}},async mounted(){try{this.loading.show(),await Promise.all([this.getAllFiles(),this.getUserData()])}catch(t){console.error("Error in mounted:",t)}finally{this.loading.hide()}}};const n=t=>(W("data-v-7f5526f2"),t=t(),J(),t),se=n(()=>i("p",null,"Data Kosong",-1)),le=n(()=>i("p",null,"loading data .....",-1)),ae={key:0},oe={key:1},ie={key:2},ne={key:3},re={class:"operation-wrapper"},de={class:"d-flex justify-space-between"},ue=["onClick"],me=["onClick"],pe=n(()=>i("span",{style:{color:"red"}},"*",-1)),ce=n(()=>i("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),fe=n(()=>i("span",{style:{color:"red"}},"*",-1)),he=n(()=>i("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),ge=n(()=>i("span",{style:{color:"red"}},"*",-1)),_e=n(()=>i("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),Fe=n(()=>i("span",{style:{color:"red"}},"*",-1)),be=n(()=>i("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),ve=n(()=>i("span",{style:{color:"red"}},"*",-1)),Ve=n(()=>i("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),ye=n(()=>i("span",{style:{color:"red"}},"*",-1)),ke=n(()=>i("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),Ae=n(()=>i("span",{class:"subtitle-1 text-center"},"NIK Pasangan / Pendamping : ",-1)),xe=n(()=>i("span",{class:"subtitle-1 text-center"},"KTP Pasangan / Pendamping Pemohon : ",-1)),Se=n(()=>i("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),Pe=n(()=>i("span",{style:{color:"red"}},"*",-1)),we=n(()=>i("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),Ie=n(()=>i("span",{style:{color:"red"}},"*",-1)),De=n(()=>i("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Te=n(()=>i("span",{style:{color:"red"}},"*",-1)),Ce=n(()=>i("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),Ne=n(()=>i("span",{style:{color:"red"}},"*",-1)),Re=n(()=>i("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Ee=n(()=>i("span",{style:{color:"red"}},"*",-1)),Ke=n(()=>i("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),Oe=n(()=>i("span",{style:{color:"red"}},"*",-1)),je=n(()=>i("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),Be=n(()=>i("span",{style:{color:"red"}},"*",-1)),Ue=n(()=>i("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),Le=n(()=>i("span",{style:{color:"red"}},"*",-1)),Me=n(()=>i("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),qe=n(()=>i("span",{style:{color:"red"}},"*",-1)),Ge=n(()=>i("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),We=n(()=>i("span",{style:{color:"red"}},"*",-1)),Je=n(()=>i("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function He(t,e,r,u,s,d){const A=L("EasyDataTable");return c(),h(N,null,{default:a(()=>[l(H,{class:"text-2xl font-weight-bold d-flex justify-left"},{default:a(()=>[f(" List Kredit Bulan ini "),l(R)]),_:1}),l(Y,{modelValue:s.tab,"onUpdate:modelValue":e[0]||(e[0]=o=>s.tab=o),class:"v-tabs-pill","bg-color":"secondary"},{default:a(()=>[l(b,{value:"0"},{default:a(()=>[f("Semua")]),_:1}),l(b,{value:"1"},{default:a(()=>[f("Approved")]),_:1}),l(b,{value:"2"},{default:a(()=>[f("Pending")]),_:1}),l(b,{value:"3"},{default:a(()=>[f("Rejected")]),_:1}),l(b,{value:"7"},{default:a(()=>[f("Cancel by Debitur")]),_:1}),f(" | "),l(b,{value:"4"},{default:a(()=>[f("Pooling")]),_:1}),l(b,{value:"5"},{default:a(()=>[f("SLIK")]),_:1}),l(b,{value:"6"},{default:a(()=>[f("Komite")]),_:1})]),_:1},8,["modelValue"]),l(z,null,{default:a(()=>[l(Q,{modelValue:s.tab,"onUpdate:modelValue":e[5]||(e[5]=o=>s.tab=o)},{default:a(()=>[(c(!0),k(q,null,M(s.phases,o=>(c(),h(X,{value:o.value},{default:a(()=>[l(K,{class:"d-flex justify-end pa-3 mb-1"},{default:a(()=>[s.userAccess&&parseInt(s.userAccess.canInsertData)?(c(),h(T,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[1]||(e[1]=p=>d.openModal(1))},{default:a(()=>[l(v,{icon:"mdi-plus"}),f("Tambah Data ")]),_:1})):_("",!0),l(R),l(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:s.searchValue,"onUpdate:modelValue":e[2]||(e[2]=p=>s.searchValue=p)},null,8,["modelValue"])]),_:1}),i("div",{class:"table-container",onTouchstart:e[3]||(e[3]=D(()=>{},["stop"])),onTouchmove:e[4]||(e[4]=D(()=>{},["stop"]))},[l(A,{"show-index":"",headers:s.headers,items:d.searchableItems,"search-value":s.searchValue,"search-field":s.searchField,"border-cell":"","buttons-pagination":"","rows-per-page":500},{"empty-message":a(()=>[se]),loading:a(()=>[le]),"item-plafon":a(p=>[f("Rp. "+I(d.formatInput(p.plafon))+",-",1)]),"item-isApproved":a(p=>[parseInt(p.isApproved)==1?(c(),k("span",ae," Approved")):_("",!0),parseInt(p.isApproved)==2?(c(),k("span",oe," Pending")):_("",!0),parseInt(p.isApproved)==3?(c(),k("span",ie," Rejected")):_("",!0),parseInt(p.isApproved)==4?(c(),k("span",ne," Cancel by Debitur")):_("",!0)]),"item-aoro":a(p=>[i("span",null,I(p.user.name),1)]),"item-created_at":a(p=>[i("span",null,I(d.formatDate(p.created_at))+" WIB",1)]),"item-slik":a(p=>[d.hasSlikAttachment(p.attachments)?(c(),h(y,{key:0,location:"top",text:"Kondisi SLIK Sudah Terupload"},{activator:a(({props:g})=>[i("span",S(P(g)),[l(v,{color:"success"},{default:a(()=>[f("mdi-check-circle")]),_:1})],16)]),_:1})):(c(),h(y,{key:1,location:"top",text:"Kondisi SLIK Belum Terupload"},{activator:a(({props:g})=>[i("span",S(P(g)),[l(v,{color:"error"},{default:a(()=>[f("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-analisaAO":a(p=>[d.hasAnalisaAoAttachment(p.attachments)?(c(),h(y,{key:0,location:"top",text:"Analisa AO Sudah Terupload"},{activator:a(({props:g})=>[i("span",S(P(g)),[l(v,{color:"success"},{default:a(()=>[f("mdi-check-circle")]),_:1})],16)]),_:1})):(c(),h(y,{key:1,location:"top",text:"Analisa AO Belum Terupload"},{activator:a(({props:g})=>[i("span",S(P(g)),[l(v,{color:"error"},{default:a(()=>[f("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-operation":a(p=>[i("div",re,[i("div",de,[l(y,{location:"top",text:"Detail Kredit"},{activator:a(({props:g})=>[i("button",C(g,{onClick:B=>d.toDetail(p)}),[l(v,{size:"20",icon:"bx-link-external",color:"blue"})],16,ue)]),_:2},1024),s.role&&s.role.canDownload==1?(c(),h(y,{key:0,location:"top",text:"Download Semua File Kredit"},{activator:a(({props:g})=>[i("button",C(g,{onClick:B=>d.downloadFile(p.id)}),[l(v,{size:"20",icon:"bx-download",color:"red"})],16,me)]),_:2},1024)):_("",!0)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),l(ee,{modelValue:s.insert,"onUpdate:modelValue":e[31]||(e[31]=o=>s.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:a(()=>[l(N,null,{title:a(()=>[f(" Tambah Data")]),text:a(()=>[l($,{onSubmit:D(d.insertData,["prevent"])},{default:a(()=>[l(K,null,{default:a(()=>[l(m,{md:"12",cols:"12"},{default:a(()=>[pe,ce,l(F,{class:"my-3",modelValue:s.dataForm.name,"onUpdate:modelValue":e[6]||(e[6]=o=>s.dataForm.name=o),autofocus:"",rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[fe,he,l(F,{class:"my-3",modelValue:d.formattedPlafon,"onUpdate:modelValue":e[7]||(e[7]=o=>d.formattedPlafon=o),type:"text",onInput:d.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[ge,_e,l(F,{class:"my-3",modelValue:s.dataForm.nik_pemohon,"onUpdate:modelValue":e[8]||(e[8]=o=>s.dataForm.nik_pemohon=o),type:"number",rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Fe,be,l(F,{class:"my-3",modelValue:s.dataForm.address,"onUpdate:modelValue":e[9]||(e[9]=o=>s.dataForm.address=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[ve,Ve,l(F,{class:"my-3",modelValue:s.dataForm.no_hp,"onUpdate:modelValue":e[10]||(e[10]=o=>s.dataForm.no_hp=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[ye,ke,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[11]||(e[11]=o=>d.handleFileChange(o,"file1"))},null,8,["rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Ae,l(F,{class:"my-3",type:"number",modelValue:s.dataForm.nik_pasangan,"onUpdate:modelValue":e[12]||(e[12]=o=>s.dataForm.nik_pasangan=o)},null,8,["modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[xe,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[13]||(e[13]=o=>d.handleFileChange(o,"file2"))},null,8,["rules"])]),_:1}),l(m,{cols:"12",md:"12"},{default:a(()=>[l(O,{modelValue:s.dataForm.hasFile2,"onUpdate:modelValue":e[14]||(e[14]=o=>s.dataForm.hasFile2=o),label:"Apakah pemohon sudah menikah?",onChange:e[15]||(e[15]=o=>d.resetFile("file5"))},null,8,["modelValue"])]),_:1}),s.dataForm.hasFile2?(c(),h(m,{key:0,md:"12",cols:"12"},{default:a(()=>[Se,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[16]||(e[16]=o=>{d.handleFileChange(o,"file5"),d.resetFile("file7"),d.resetFile("file8")})},null,8,["rules"])]),_:1})):_("",!0),l(m,{md:"12",cols:"12"},{default:a(()=>[Pe,we,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[17]||(e[17]=o=>d.handleFileChange(o,"file4"))},null,8,["rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Ie,De,l(j,{items:s.orderList,autofocus:"",modelValue:s.dataForm.order_source,"onUpdate:modelValue":e[18]||(e[18]=o=>s.dataForm.order_source=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Te,Ce,l(j,{items:s.statusCreditList,autofocus:"",modelValue:s.dataForm.status_kredit,"onUpdate:modelValue":e[19]||(e[19]=o=>s.dataForm.status_kredit=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[Ne,Re,l(Z,{modelValue:s.selectedPhoto,"onUpdate:modelValue":e[20]||(e[20]=o=>s.selectedPhoto=o),mandatory:!0,row:""},{default:a(()=>[l(E,{label:"Foto Kunjungan",value:"fotoKunjungan"}),l(E,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),s.selectedPhoto==="fotoKunjungan"?(c(),h(m,{key:1,md:"12",cols:"12"},{default:a(()=>[Ee,Ke,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[21]||(e[21]=o=>{d.handleFileChange(o,"file10"),d.resetFile("file11")})},null,8,["rules"])]),_:1})):_("",!0),s.selectedPhoto==="fotoWhatsApp"?(c(),h(m,{key:2,md:"12",cols:"12"},{default:a(()=>[Oe,je,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[22]||(e[22]=o=>{d.handleFileChange(o,"file11"),d.resetFile("file10")})},null,8,["rules"])]),_:1})):_("",!0),l(w,{thickness:5}),l(w,{thickness:5}),l(w,{thickness:5}),l(m,{cols:"12",md:"12"},{default:a(()=>[l(O,{modelValue:s.dataForm.hasFile3,"onUpdate:modelValue":e[23]||(e[23]=o=>s.dataForm.hasFile3=o),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[24]||(e[24]=o=>(d.resetFile("file3"),s.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),s.dataForm.hasFile3?(c(),h(m,{key:3,md:"12",cols:"12"},{default:a(()=>[Be,Ue,l(V,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[s.rules.required],onChange:e[25]||(e[25]=o=>d.handleFileChange(o,"file3"))},null,8,["rules"])]),_:1})):_("",!0),s.dataForm.hasFile3?(c(),h(m,{key:4,md:"12",cols:"12"},{default:a(()=>[Le,Me,l(F,{class:"my-3",type:"number",modelValue:s.dataForm.nik_jaminan,"onUpdate:modelValue":e[26]||(e[26]=o=>s.dataForm.nik_jaminan=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1})):_("",!0),l(w,{thickness:5}),l(m,{md:"12",cols:"12"},{default:a(()=>[qe,Ge,l(F,{class:"my-3",modelValue:s.dataForm.type_bussiness,"onUpdate:modelValue":e[27]||(e[27]=o=>s.dataForm.type_bussiness=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{md:"12",cols:"12"},{default:a(()=>[We,Je,l(F,{class:"my-3",modelValue:s.dataForm.desc_bussiness,"onUpdate:modelValue":e[28]||(e[28]=o=>s.dataForm.desc_bussiness=o),rules:[s.rules.required]},null,8,["modelValue","rules"])]),_:1}),l(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:a(()=>[l(T,{type:"submit",disabled:s.dataForm.name==null||s.dataForm.plafon==null||s.dataForm.type_bussiness==null||s.dataForm.desc_bussiness==null||s.dataForm.order_source==null||s.dataForm.status_kredit==null||s.dataForm.file1==null||s.dataForm.file4==null||s.dataForm.file10==null&&s.dataForm.file11==null},{default:a(()=>[f(" Simpan ")]),_:1},8,["disabled"]),i("button",{type:"button",class:"btn btn-blue",onClick:e[29]||(e[29]=o=>d.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:a(()=>[l(G,{modelValue:s.uploadProgress,"onUpdate:modelValue":e[30]||(e[30]=o=>s.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})}const gt=U(te,[["render",He],["__scopeId","data-v-7f5526f2"]]);export{gt as default};

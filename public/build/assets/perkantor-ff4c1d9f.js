import{m as V}from"./VAvatar-5f945262.js";import{_ as M,r as L,o as c,c as x,a as s,w as a,N as q,H as N,V as m,F as G,f,e as w,b as n,j as y,G as W,i as g,h as _,t as O,L as D,M as I,O as B,d as R,a6 as J,I as H,J as z}from"./main-18b336f5.js";import{V as Y}from"./VContainer-c1310119.js";import{V as U,a as Q,c as X,b as E}from"./VCard-a3682b65.js";import{V as S}from"./VRow-b3adb95f.js";import{V as F}from"./VTextField-460c393a.js";import{V as T}from"./VSelect-81837704.js";import{V as Z,a as b}from"./VTabs-ccf0c6c9.js";import{V as $,a as ee,b as te,c as K}from"./VWindowItem-4286fc50.js";import{V as le}from"./VSpacer-d0085909.js";import{V as P}from"./VTooltip-e316756e.js";import{V as se}from"./VDialog-07537e96.js";import{V as ae}from"./VForm-8438c811.js";import{V as v}from"./VFileInput-35bf0d58.js";import{d as C}from"./VMenu-a0f6d9ef.js";import{V as j}from"./VCheckbox-7702c878.js";import"./VImg-1e1c7cfb.js";import"./VInput-22fdea7f.js";import"./index-7135f795.js";import"./dialog-transition-5f112fd2.js";import"./VChip-54379337.js";const oe={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}},searchableItems(){return this.items.map(l=>({...l,office_names:l.user.position.offices.map(e=>e.name).join(", ")}))}},data(){return{selectedMonth:new Date().toISOString().slice(0,7),selectedOffice:null,offices:[],monthYear:this.$route.params.monthYear,selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:l=>!!l||"Required"},role:{canDownload:0},items:[],users:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!1},{text:"Analisa AO/RO",value:"analisaAO",sortable:!1},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7}],orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],dataForm:{id:null,user_id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(l){l==1?this.filterDataStatus(1):l==2?this.filterDataStatus(2):l==3?this.filterDataStatus(3):l==4?this.filterDataStatus(4):l==5?this.filterDataStatus(5):l==6?this.filterDataStatus(6):l==7?this.filterDataStatus(7):this.items=[...this.originalItems]}},methods:{hasSlikAttachment(l){return l.some(e=>e.name.includes("SLIK")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},hasAnalisaAoAttachment(l){return l.some(e=>e.name.includes("Analisa Awal Kredit AO")&&parseInt(e.phase)==2&&(e.path!="null"||e.link!=null))},goBack(){this.$router.go(-1)},async applyFilter(){try{this.overlay=!0;const[l,e]=this.selectedMonth.split("-"),d=new FormData;d.append("year",l),d.append("month",e),d.append("office_id",this.selectedOffice);const u=await V.post("/filterData",d);u.status===200?(this.items=u.data.data,this.originalItems=[...this.items],this.overlay=!1):(this.overlay=!1,console.log(u.data.data.message))}catch(l){this.overlay=!1,console.log(l)}},openMonthPicker(){this.$refs.monthPicker.$el.querySelector("input").click()},formatDate(l){return new Date(l).toLocaleString("id-ID")},async downloadFile(l){try{this.overlay=!0;const e=await V.get(`/download-all/${l}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const d=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=d,u.setAttribute("download",`${l}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(l){return l=l.replace(/\D/g,""),l=l.replace(/\B(?=(\d{3})+(?!\d))/g,","),l},toDetail(l){this.$router.push(`/u-credit/${l.id}`)},async deleteFile(l){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const d=await V.delete(`/credit/${l.id}`);d.status===200?(this.overlay=!1,this.applyFilter(),this.$showToast("success","Berhasill",d.data.message)):(this.overlay=!1,this.applyFilter(),this.$showToast("error","Sorry",d.data.message))}catch(e){this.overlay=!1,this.applyFilter(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(l){!this.dataForm[l]!=null&&(this.dataForm[l]=null)},handleFileChange(l,e){const d=l.target.files[0];d&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(d.type)?(this.dataForm[e]=d,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),l.target.value=null)},async getRecaptData(l){try{if(this.overlay=!0,this.selectedOffice==null){alert("Pilih Kantor terlebih dahulu"),this.overlay=!1;return}const[e,d]=this.selectedMonth.split("-"),u=new FormData;u.append("year",e),u.append("month",d),u.append("office_id",this.selectedOffice);const t=await V.post("/filterDataReport",u,{responseType:"blob"});if(t.status===200){this.overlay=!1;const r=t.headers["content-disposition"];let k="download.xlsx";if(r){const A=r.match(/filename="?(.+)"?/i);A.length===2&&(k=A[1])}const o=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),p=window.URL.createObjectURL(o),h=document.createElement("a");h.href=p,h.setAttribute("download",k),document.body.appendChild(h),h.click(),document.body.removeChild(h),this.$showToast("success","Berhasil","File Excel berhasil diunduh")}else this.$showToast("error","Sorry",t.data.data.message)}catch(e){this.overlay=!1,this.$showToast("error","Sorry",e.response.data.message)}},async openModal(l,e=null){l===1?this.insert=!0:l===2&&this.getRecaptData(this.selectedMonth)},closeModal(l){l===1?(this.resetForm(),this.insert=!1):l===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,user_id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(l){let e=l.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=e},formatNumber(l){return l?l.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(l){const e={1:d=>d.isApproved==1,2:d=>d.isApproved==2,3:d=>d.isApproved==3,4:d=>parseInt(d.phase)==1,5:d=>d.attachments.some(u=>u.name.includes("SLIK")&&parseInt(u.phase)==2&&(u.path!="null"||u.link!=null)),6:d=>parseInt(d.phase)==4,7:d=>d.isApproved==4};this.items=l in e?this.originalItems.filter(e[l]):[...this.originalItems]},getUserData(){const l=localStorage.getItem("userData");l&&(this.userData=JSON.parse(l),this.offices=this.userData.position.offices.map(e=>({value:e.id,title:e.name})))},formatInputPlafon(l){let e=l.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=e},async insertData(){try{this.overlay=!0;const l=new FormData;l.append("user_id",this.dataForm.user_id),l.append("name",this.dataForm.name),l.append("nik_pemohon",this.dataForm.nik_pemohon),l.append("address",this.dataForm.address),l.append("no_hp",this.dataForm.no_hp),l.append("order_source",this.dataForm.order_source),l.append("status_kredit",this.dataForm.status_kredit),l.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),l.append("type_bussiness",this.dataForm.type_bussiness),l.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&l.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&l.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let t="file"+u,r="noteFile"+u,k="hasFile"+u;this.dataForm.hasOwnProperty(k)&&this.dataForm[k]||this.dataForm[t]?this.dataForm[t]&&(l.append(t,this.dataForm[t]),l.append(r,this.dataForm[r])):this.dataForm[t]&&l.append(t,this.dataForm[t])}l.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(t){console.error("Error calculating progress:",t)}},headers:{"Content-Type":"multipart/form-data"}},d=await V.post("/credit",l,e);d.status===200?(this.overlay=!1,this.closeModal(1),this.applyFilter(),this.uploadProgress=null,this.$showToast("success","Success",d.data.message)):(this.overlay=!1,this.uploadProgress=null,this.applyFilter(),this.$showToast("error","Sorry",d.data.message))}catch(l){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.applyFilter(),this.$showToast("error","Sorry",l.response.data.message)}},async getUserAccess(){try{const l=await V.get("/userAccess");l.status===200?this.userAccess=l.data.data:console.log(l.data.data.message)}catch(l){console.log(l)}},async getAllUser(){try{const l=await V.get("/getAllUser");l.status===200?this.users=l.data.data.map(e=>({value:e.id,title:e.name})):this.$showToast("error","Sorry",l.data.data.message)}catch(l){this.overlay=!1,this.$showToast("error","Sorry",l.response.data.message)}}},mounted(){this.getUserData(),this.getUserAccess(),this.getAllUser()}};const i=l=>(H("data-v-85e05a75"),l=l(),z(),l),ne=i(()=>n("br",null,null,-1)),ie=i(()=>n("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),re={class:"text-body-2"},de=i(()=>n("p",null,"Data Kosong",-1)),ue=i(()=>n("p",null,"loading data .....",-1)),me={key:0},pe={key:1},ce={key:2},fe={key:3},he={class:"operation-wrapper"},ge={class:"d-flex justify-space-between"},_e=["onClick"],Fe=["onClick"],ye=i(()=>n("span",{style:{color:"red"}},"*",-1)),ve=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih AO/RO: ",-1)),be=i(()=>n("span",{style:{color:"red"}},"*",-1)),ke=i(()=>n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),Ve=i(()=>n("span",{style:{color:"red"}},"*",-1)),xe=i(()=>n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),Pe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Se=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),Ae=i(()=>n("span",{style:{color:"red"}},"*",-1)),we=i(()=>n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),De=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ie=i(()=>n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),Te=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ce=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Oe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Re=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),Ue=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ne=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),Be=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ee=i(()=>n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),Ke=i(()=>n("span",{style:{color:"red"}},"*",-1)),je=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Me=i(()=>n("span",{style:{color:"red"}},"*",-1)),Le=i(()=>n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),qe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ge=i(()=>n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),We=i(()=>n("span",{style:{color:"red"}},"*",-1)),Je=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),He=i(()=>n("span",{style:{color:"red"}},"*",-1)),ze=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),Ye=i(()=>n("span",{style:{color:"red"}},"*",-1)),Qe=i(()=>n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),Xe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ze=i(()=>n("span",{class:"subtitle-1 text-center"},"Jaminan SHM:",-1)),$e=i(()=>n("span",{style:{color:"red"}},"*",-1)),et=i(()=>n("span",{class:"subtitle-1 text-center"},"Jaminan BPKB:",-1)),tt=i(()=>n("span",{style:{color:"red"}},"*",-1)),lt=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),st=i(()=>n("span",{style:{color:"red"}},"*",-1)),at=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),ot=i(()=>n("span",{style:{color:"red"}},"*",-1)),nt=i(()=>n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),it=i(()=>n("span",{style:{color:"red"}},"*",-1)),rt=i(()=>n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function dt(l,e,d,u,t,r){const k=L("EasyDataTable");return c(),x(N,null,[s(q,{absolute:!0,modelValue:t.overlay,"onUpdate:modelValue":e[0]||(e[0]=o=>t.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:a(()=>[s(m,null,{default:a(()=>[s(G,{color:"primary",size:"32",indeterminate:""}),ne,ie]),_:1})]),_:1},8,["modelValue"]),s(Y,{fluid:""},{default:a(()=>[s(U,{class:"mx-auto",elevation:"4"},{default:a(()=>[s(Q,null,{default:a(()=>[s(X,{class:"text-h5 font-weight-bold mx-2"},{default:a(()=>[f(" Filter Bulan dan Kantor ")]),_:1})]),_:1}),s(E,null,{default:a(()=>[s(S,null,{default:a(()=>[s(m,{cols:"12",sm:"6"},{default:a(()=>[s(F,{modelValue:t.selectedMonth,"onUpdate:modelValue":e[1]||(e[1]=o=>t.selectedMonth=o),label:"Pilih Bulan dan Tahun","prepend-icon":"mdi-calendar",type:"month",outlined:"",dense:"",onClick:r.openMonthPicker,ref:"monthPicker"},null,8,["modelValue","onClick"])]),_:1}),s(m,{cols:"12",sm:"6"},{default:a(()=>[s(T,{modelValue:t.selectedOffice,"onUpdate:modelValue":e[2]||(e[2]=o=>t.selectedOffice=o),items:t.offices,label:"Pilih Kantor","prepend-icon":"mdi-office-building",outlined:"",dense:""},null,8,["modelValue","items"])]),_:1})]),_:1}),s(S,{class:"mt-4"},{default:a(()=>[s(m,{cols:"12",class:"text-center"},{default:a(()=>[s(w,{color:"primary",onClick:r.applyFilter,elevation:"2"},{default:a(()=>[f(" Terapkan Filter ")]),_:1},8,["onClick"])]),_:1})]),_:1}),s(S,{class:"mt-4"},{default:a(()=>[s(m,{cols:"12"},{default:a(()=>[n("p",re,[s(y,{small:"",left:""},{default:a(()=>[f("mdi-information")]),_:1}),f(" Pilih bulan, tahun, dan kantor untuk menampilkan data ")])]),_:1})]),_:1})]),_:1})]),_:1}),s(U,{class:"mt-3",elevation:"4"},{default:a(()=>[s(Z,{modelValue:t.tab,"onUpdate:modelValue":e[3]||(e[3]=o=>t.tab=o),class:"v-tabs-pill","bg-color":"secondary"},{default:a(()=>[s(b,{value:"0"},{default:a(()=>[f("Semua")]),_:1}),s(b,{value:"1"},{default:a(()=>[f("Approved")]),_:1}),s(b,{value:"2"},{default:a(()=>[f("Pending")]),_:1}),s(b,{value:"3"},{default:a(()=>[f("Rejected")]),_:1}),s(b,{value:"7"},{default:a(()=>[f("Cancel by Debitur")]),_:1}),f(" | "),s(b,{value:"4"},{default:a(()=>[f("Pooling")]),_:1}),s(b,{value:"5"},{default:a(()=>[f("SLIK")]),_:1}),s(b,{value:"6"},{default:a(()=>[f("Komite")]),_:1})]),_:1},8,["modelValue"]),s(E,null,{default:a(()=>[s($,{modelValue:t.tab,"onUpdate:modelValue":e[9]||(e[9]=o=>t.tab=o)},{default:a(()=>[(c(!0),x(N,null,W(t.phases,o=>(c(),g(ee,{value:o.value},{default:a(()=>[s(S,{class:"d-flex justify-end pa-3"},{default:a(()=>[t.userAccess&&parseInt(t.userAccess.canInsertData)?(c(),g(w,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[4]||(e[4]=p=>r.openModal(1))},{default:a(()=>[s(y,{icon:"mdi-plus"}),f(" Tambah Data ")]),_:1})):_("",!0),s(w,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[5]||(e[5]=p=>r.openModal(2))},{default:a(()=>[s(y,{icon:"mdi-download"}),f(" Rekap Data ")]),_:1}),s(le),s(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:t.searchValue,"onUpdate:modelValue":e[6]||(e[6]=p=>t.searchValue=p)},null,8,["modelValue"])]),_:1}),n("div",{class:"table-container",onTouchstart:e[7]||(e[7]=R(()=>{},["stop"])),onTouchmove:e[8]||(e[8]=R(()=>{},["stop"]))},[s(k,{"show-index":"",headers:t.headers,items:r.searchableItems,"search-value":t.searchValue,"search-field":t.searchField,"rows-per-page":500,"border-cell":"","buttons-pagination":""},{"empty-message":a(()=>[de]),loading:a(()=>[ue]),"item-plafon":a(p=>[f("Rp. "+O(r.formatInput(p.plafon))+",-",1)]),"item-isApproved":a(p=>[parseInt(p.isApproved)==1?(c(),x("span",me," Approved")):_("",!0),parseInt(p.isApproved)==2?(c(),x("span",pe," Pending")):_("",!0),parseInt(p.isApproved)==3?(c(),x("span",ce," Rejected")):_("",!0),parseInt(p.isApproved)==4?(c(),x("span",fe," Cancel by Debitur")):_("",!0)]),"item-aoro":a(p=>[n("span",null,O(p.user.name),1)]),"item-slik":a(p=>[r.hasSlikAttachment(p.attachments)?(c(),g(P,{key:0,location:"top",text:"Kondisi SLIK Sudah Terupload"},{activator:a(({props:h})=>[n("span",D(I(h)),[s(y,{color:"success"},{default:a(()=>[f("mdi-check-circle")]),_:1})],16)]),_:1})):(c(),g(P,{key:1,location:"top",text:"Kondisi SLIK Belum Terupload"},{activator:a(({props:h})=>[n("span",D(I(h)),[s(y,{color:"error"},{default:a(()=>[f("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-analisaAO":a(p=>[r.hasAnalisaAoAttachment(p.attachments)?(c(),g(P,{key:0,location:"top",text:"Analisa AO Sudah Terupload"},{activator:a(({props:h})=>[n("span",D(I(h)),[s(y,{color:"success"},{default:a(()=>[f("mdi-check-circle")]),_:1})],16)]),_:1})):(c(),g(P,{key:1,location:"top",text:"Analisa AO Belum Terupload"},{activator:a(({props:h})=>[n("span",D(I(h)),[s(y,{color:"error"},{default:a(()=>[f("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-created_at":a(p=>[n("span",null,O(r.formatDate(p.created_at))+" WIB",1)]),"item-operation":a(p=>[n("div",he,[n("div",ge,[s(P,{location:"top",text:"Detail Kredit"},{activator:a(({props:h})=>[n("button",B(h,{onClick:A=>r.toDetail(p)}),[s(y,{size:"20",icon:"bx-link-external",color:"blue"})],16,_e)]),_:2},1024),t.role&&t.role.canDownload==1?(c(),g(P,{key:0,location:"top",text:"Download Semua File Kredit"},{activator:a(({props:h})=>[n("button",B(h,{onClick:A=>r.downloadFile(p.id)}),[s(y,{size:"20",icon:"bx-download",color:"red"})],16,Fe)]),_:2},1024)):_("",!0)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),s(se,{modelValue:t.insert,"onUpdate:modelValue":e[38]||(e[38]=o=>t.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:a(()=>[s(U,null,{title:a(()=>[f(" Tambah Data")]),text:a(()=>[s(ae,{onSubmit:R(r.insertData,["prevent"])},{default:a(()=>[s(S,null,{default:a(()=>[s(m,{md:"12",cols:"12"},{default:a(()=>[ye,ve,s(T,{items:t.users,autofocus:"",modelValue:t.dataForm.user_id,"onUpdate:modelValue":e[10]||(e[10]=o=>t.dataForm.user_id=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[be,ke,s(F,{class:"my-3",modelValue:t.dataForm.name,"onUpdate:modelValue":e[11]||(e[11]=o=>t.dataForm.name=o),autofocus:"",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Ve,xe,s(F,{class:"my-3",modelValue:r.formattedPlafon,"onUpdate:modelValue":e[12]||(e[12]=o=>r.formattedPlafon=o),type:"text",onInput:r.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Pe,Se,s(F,{class:"my-3",modelValue:t.dataForm.nik_pemohon,"onUpdate:modelValue":e[13]||(e[13]=o=>t.dataForm.nik_pemohon=o),type:"number",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Ae,we,s(F,{class:"my-3",modelValue:t.dataForm.address,"onUpdate:modelValue":e[14]||(e[14]=o=>t.dataForm.address=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[De,Ie,s(F,{class:"my-3",modelValue:t.dataForm.no_hp,"onUpdate:modelValue":e[15]||(e[15]=o=>t.dataForm.no_hp=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Te,Ce,s(T,{items:t.orderList,autofocus:"",modelValue:t.dataForm.order_source,"onUpdate:modelValue":e[16]||(e[16]=o=>t.dataForm.order_source=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Oe,Re,s(T,{items:t.statusCreditList,autofocus:"",modelValue:t.dataForm.status_kredit,"onUpdate:modelValue":e[17]||(e[17]=o=>t.dataForm.status_kredit=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Ue,Ne,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[18]||(e[18]=o=>r.handleFileChange(o,"file1"))},null,8,["rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Be,Ee,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[19]||(e[19]=o=>r.handleFileChange(o,"file4"))},null,8,["rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[Ke,je,s(te,{modelValue:t.selectedPhoto,"onUpdate:modelValue":e[20]||(e[20]=o=>t.selectedPhoto=o),mandatory:!0,row:""},{default:a(()=>[s(K,{label:"Foto Kunjungan",value:"fotoKunjungan"}),s(K,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),t.selectedPhoto==="fotoKunjungan"?(c(),g(m,{key:0,md:"12",cols:"12"},{default:a(()=>[Me,Le,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[21]||(e[21]=o=>{r.handleFileChange(o,"file10"),r.resetFile("file11")})},null,8,["rules"])]),_:1})):_("",!0),t.selectedPhoto==="fotoWhatsApp"?(c(),g(m,{key:1,md:"12",cols:"12"},{default:a(()=>[qe,Ge,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[22]||(e[22]=o=>{r.handleFileChange(o,"file11"),r.resetFile("file10")})},null,8,["rules"])]),_:1})):_("",!0),s(C,{thickness:5}),s(m,{cols:"12",md:"12"},{default:a(()=>[s(j,{modelValue:t.dataForm.hasFile2,"onUpdate:modelValue":e[23]||(e[23]=o=>t.dataForm.hasFile2=o),label:"Apakah pemohon sudah menikah?",onChange:e[24]||(e[24]=o=>(r.resetFile("file2"),t.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),s(C,{thickness:5}),t.dataForm.hasFile2?(c(),g(m,{key:2,md:"12",cols:"12"},{default:a(()=>[We,Je,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[25]||(e[25]=o=>r.handleFileChange(o,"file2"))},null,8,["rules"])]),_:1})):_("",!0),t.dataForm.hasFile2?(c(),g(m,{key:3,md:"12",cols:"12"},{default:a(()=>[He,ze,s(F,{class:"my-3",type:"number",modelValue:t.dataForm.nik_pasangan,"onUpdate:modelValue":e[26]||(e[26]=o=>t.dataForm.nik_pasangan=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):_("",!0),t.dataForm.hasFile2?(c(),g(m,{key:4,md:"12",cols:"12"},{default:a(()=>[Ye,Qe,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[27]||(e[27]=o=>{r.handleFileChange(o,"file5"),r.resetFile("file7"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):_("",!0),t.selectedOption==="jaminanSHM"?(c(),g(m,{key:5,md:"12",cols:"12"},{default:a(()=>[Xe,Ze,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[28]||(e[28]=o=>{r.handleFileChange(o,"file7"),r.resetFile("file5"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):_("",!0),t.selectedOption==="jaminanBPKB"?(c(),g(m,{key:6,md:"12",cols:"12"},{default:a(()=>[$e,et,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[29]||(e[29]=o=>{r.handleFileChange(o,"file8"),r.resetFile("file5"),r.resetFile("file7")})},null,8,["rules"])]),_:1})):_("",!0),s(C,{thickness:5}),s(m,{cols:"12",md:"12"},{default:a(()=>[s(j,{modelValue:t.dataForm.hasFile3,"onUpdate:modelValue":e[30]||(e[30]=o=>t.dataForm.hasFile3=o),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[31]||(e[31]=o=>(r.resetFile("file3"),t.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),t.dataForm.hasFile3?(c(),g(m,{key:7,md:"12",cols:"12"},{default:a(()=>[tt,lt,s(v,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[32]||(e[32]=o=>r.handleFileChange(o,"file3"))},null,8,["rules"])]),_:1})):_("",!0),t.dataForm.hasFile3?(c(),g(m,{key:8,md:"12",cols:"12"},{default:a(()=>[st,at,s(F,{class:"my-3",type:"number",modelValue:t.dataForm.nik_jaminan,"onUpdate:modelValue":e[33]||(e[33]=o=>t.dataForm.nik_jaminan=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):_("",!0),s(C,{thickness:5}),s(m,{md:"12",cols:"12"},{default:a(()=>[ot,nt,s(F,{class:"my-3",modelValue:t.dataForm.type_bussiness,"onUpdate:modelValue":e[34]||(e[34]=o=>t.dataForm.type_bussiness=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(m,{md:"12",cols:"12"},{default:a(()=>[it,rt,s(F,{class:"my-3",modelValue:t.dataForm.desc_bussiness,"onUpdate:modelValue":e[35]||(e[35]=o=>t.dataForm.desc_bussiness=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(m,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:a(()=>[s(w,{type:"submit",disabled:t.dataForm.name==null||t.dataForm.plafon==null||t.dataForm.type_bussiness==null||t.dataForm.desc_bussiness==null||t.dataForm.file1==null||t.dataForm.file4==null||t.dataForm.file10==null&&t.dataForm.file11==null},{default:a(()=>[f(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[36]||(e[36]=o=>r.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:a(()=>[s(J,{modelValue:t.uploadProgress,"onUpdate:modelValue":e[37]||(e[37]=o=>t.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})],64)}const Tt=M(oe,[["render",dt],["__scopeId","data-v-85e05a75"]]);export{Tt as default};

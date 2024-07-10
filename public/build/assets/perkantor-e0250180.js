import{m as V}from"./VGrid-bf7c405c.js";import{r as M,o as c,c as b,a as s,w as a,G as R,E as j,e as h,V as w,b as n,i as k,F as K,h as g,f,t as C,M as U,d as T,a2 as q,H as L,I as G}from"./main-42c2d6c5.js";import{_ as W}from"./_plugin-vue_export-helper-c27b6911.js";import{V as J}from"./VOverlay-bb30da2e.js";import{V as H}from"./VContainer-cbc612a8.js";import{c as d,V as I,a as z,d as Y,b as O}from"./VCol-b3a4674e.js";import{V as x}from"./VRow-7ba727d0.js";import{V as F}from"./VTextField-375a7dd2.js";import{V as S}from"./VSelect-b0bbdc24.js";import{V as Q,a as D}from"./VTabs-f1135e48.js";import{V as X,a as Z,b as $,c as E}from"./VWindowItem-abaeaf6b.js";import{V as ee}from"./VSpacer-cda27013.js";import{V as N}from"./VTooltip-942a0dd4.js";import{V as te}from"./VDialog-21975260.js";import{V as le}from"./VForm-21f60b5f.js";import{V as y}from"./VFileInput-2e5ff649.js";import{V as A}from"./VDivider-3e2d93db.js";import{V as B}from"./VCheckbox-45071a21.js";import"./VImg-a4f7889a.js";import"./VInput-9dbcb9f2.js";import"./index-92a1e81e.js";import"./VMenu-02347df4.js";import"./dialog-transition-21c58d43.js";import"./VCheckboxBtn-008f9ec3.js";import"./VChip-db4be40a.js";const se={computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}}},data(){return{selectedMonth:new Date().toISOString().slice(0,7),selectedOffice:null,offices:[],monthYear:this.$route.params.monthYear,selectedOption:"bukuNikah",selectedPhoto:"",overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:l=>!!l||"Required"},role:{canDownload:0},items:[],users:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],dataForm:{id:null,user_id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(l){l==1?this.filterDataStatus(1):l==2?this.filterDataStatus(2):l==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{goBack(){this.$router.go(-1)},async applyFilter(){try{this.overlay=!0;const[l,e]=this.selectedMonth.split("-"),m=new FormData;m.append("year",l),m.append("month",e),m.append("office_id",this.selectedOffice);const u=await V.post("/filterData",m);u.status===200?(this.items=u.data.data,this.originalItems=[...this.items],this.overlay=!1):(this.overlay=!1,console.log(u.data.data.message))}catch(l){this.overlay=!1,console.log(l)}},openMonthPicker(){this.$refs.monthPicker.$el.querySelector("input").click()},formatDate(l){return new Date(l).toLocaleString("id-ID")},async downloadFile(l){try{this.overlay=!0;const e=await V.get(`/download-all/${l}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const m=window.URL.createObjectURL(new Blob([e.data])),u=document.createElement("a");u.href=m,u.setAttribute("download",`${l}.zip`),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(l){return l=l.replace(/\D/g,""),l=l.replace(/\B(?=(\d{3})+(?!\d))/g,","),l},toDetail(l){this.$router.push(`/u-credit/${l.id}`)},async deleteFile(l){try{if(this.overlay=!0,!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const m=await V.delete(`/credit/${l.id}`);m.status===200?(this.overlay=!1,this.applyFilter(),this.$showToast("success","Berhasill",m.data.message)):(this.overlay=!1,this.applyFilter(),this.$showToast("error","Sorry",m.data.message))}catch(e){this.overlay=!1,this.applyFilter(),this.$showToast("error","Sorry",e.response.data.message)}},resetFile(l){!this.dataForm[l]!=null&&(this.dataForm[l]=null)},handleFileChange(l,e){const m=l.target.files[0];m&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(m.type)?(this.dataForm[e]=m,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"?this.dataForm.noteFile10="Foto Kunjungan":e=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.overlay=!1,this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),l.target.value=null)},async getRecaptData(l){try{if(this.overlay=!0,this.selectedOffice==null){alert("Pilih Kantor terlebih dahulu"),this.overlay=!1;return}const[e,m]=this.selectedMonth.split("-"),u=new FormData;u.append("year",e),u.append("month",m),u.append("office_id",this.selectedOffice);const t=await V.post("/filterDataReport",u,{responseType:"blob"});if(t.status===200){this.overlay=!1;const r=t.headers["content-disposition"];let v="download.xlsx";if(r){const P=r.match(/filename="?(.+)"?/i);P.length===2&&(v=P[1])}const o=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),p=window.URL.createObjectURL(o),_=document.createElement("a");_.href=p,_.setAttribute("download",v),document.body.appendChild(_),_.click(),document.body.removeChild(_),this.$showToast("success","Berhasil","File Excel berhasil diunduh")}else this.$showToast("error","Sorry",t.data.data.message)}catch(e){this.overlay=!1,this.$showToast("error","Sorry",e.response.data.message)}},async openModal(l,e=null){l===1?this.insert=!0:l===2&&this.getRecaptData(this.selectedMonth)},closeModal(l){l===1?(this.resetForm(),this.insert=!1):l===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,user_id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(l){let e=l.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=e},formatNumber(l){return l?l.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(l){this.items=this.originalItems.filter(e=>e.isApproved==l)},getUserData(){const l=localStorage.getItem("userData");l&&(this.userData=JSON.parse(l),this.offices=this.userData.position.offices.map(e=>({value:e.id,title:e.name})))},formatInputPlafon(l){let e=l.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=e},async insertData(){try{this.overlay=!0;const l=new FormData;l.append("user_id",this.dataForm.user_id),l.append("name",this.dataForm.name),l.append("nik_pemohon",this.dataForm.nik_pemohon),l.append("address",this.dataForm.address),l.append("no_hp",this.dataForm.no_hp),l.append("order_source",this.dataForm.order_source),l.append("status_kredit",this.dataForm.status_kredit),l.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),l.append("type_bussiness",this.dataForm.type_bussiness),l.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&l.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&l.append("nik_jaminan",this.dataForm.nik_jaminan);for(let u=1;u<=11;u++){if(u===6)continue;let t="file"+u,r="noteFile"+u,v="hasFile"+u;this.dataForm.hasOwnProperty(v)&&this.dataForm[v]||this.dataForm[t]?this.dataForm[t]&&(l.append(t,this.dataForm[t]),l.append(r,this.dataForm[r])):this.dataForm[t]&&l.append(t,this.dataForm[t])}l.append("_method","POST");const e={onUploadProgress:u=>{try{this.uploadProgress=Math.round(u.loaded*100/u.total)}catch(t){console.error("Error calculating progress:",t)}},headers:{"Content-Type":"multipart/form-data"}},m=await V.post("/credit",l,e);m.status===200?(this.overlay=!1,this.closeModal(1),this.applyFilter(),this.uploadProgress=null,this.$showToast("success","Success",m.data.message)):(this.overlay=!1,this.uploadProgress=null,this.applyFilter(),this.$showToast("error","Sorry",m.data.message))}catch(l){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.applyFilter(),this.$showToast("error","Sorry",l.response.data.message)}},async getUserAccess(){try{const l=await V.get("/userAccess");l.status===200?this.userAccess=l.data.data:console.log(l.data.data.message)}catch(l){console.log(l)}},async getAllUser(){try{const l=await V.get("/getAllUser");l.status===200?this.users=l.data.data.map(e=>({value:e.id,title:e.name})):this.$showToast("error","Sorry",l.data.data.message)}catch(l){this.overlay=!1,this.$showToast("error","Sorry",l.response.data.message)}}},mounted(){this.getUserData(),this.getUserAccess(),this.getAllUser()}};const i=l=>(L("data-v-e5188d8c"),l=l(),G(),l),ae=i(()=>n("br",null,null,-1)),oe=i(()=>n("span",{class:"font-weight-bold text-lg"},"Loading....",-1)),ne={class:"text-body-2"},ie=i(()=>n("p",null,"Data Kosong",-1)),re=i(()=>n("p",null,"loading data .....",-1)),de={key:0},ue={key:1},me={key:2},pe={class:"operation-wrapper"},ce={class:"d-flex justify-space-between"},fe=["onClick"],he=["onClick"],ge=i(()=>n("span",{style:{color:"red"}},"*",-1)),Fe=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih AO/RO: ",-1)),_e=i(()=>n("span",{style:{color:"red"}},"*",-1)),ye=i(()=>n("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1)),ve=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ve=i(()=>n("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1)),be=i(()=>n("span",{style:{color:"red"}},"*",-1)),ke=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1)),xe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Pe=i(()=>n("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1)),we=i(()=>n("span",{style:{color:"red"}},"*",-1)),Se=i(()=>n("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1)),De=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ae=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1)),Ce=i(()=>n("span",{style:{color:"red"}},"*",-1)),Te=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1)),Ie=i(()=>n("span",{style:{color:"red"}},"*",-1)),Re=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1)),Ue=i(()=>n("span",{style:{color:"red"}},"*",-1)),Oe=i(()=>n("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1)),Ee=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ne=i(()=>n("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1)),Be=i(()=>n("span",{style:{color:"red"}},"*",-1)),Me=i(()=>n("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1)),je=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ke=i(()=>n("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1)),qe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Le=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1)),Ge=i(()=>n("span",{style:{color:"red"}},"*",-1)),We=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pasangan Pemohon: ",-1)),Je=i(()=>n("span",{style:{color:"red"}},"*",-1)),He=i(()=>n("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1)),ze=i(()=>n("span",{style:{color:"red"}},"*",-1)),Ye=i(()=>n("span",{class:"subtitle-1 text-center"},"Jaminan SHM:",-1)),Qe=i(()=>n("span",{style:{color:"red"}},"*",-1)),Xe=i(()=>n("span",{class:"subtitle-1 text-center"},"Jaminan BPKB:",-1)),Ze=i(()=>n("span",{style:{color:"red"}},"*",-1)),$e=i(()=>n("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1)),et=i(()=>n("span",{style:{color:"red"}},"*",-1)),tt=i(()=>n("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1)),lt=i(()=>n("span",{style:{color:"red"}},"*",-1)),st=i(()=>n("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1)),at=i(()=>n("span",{style:{color:"red"}},"*",-1)),ot=i(()=>n("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1));function nt(l,e,m,u,t,r){const v=M("EasyDataTable");return c(),b(R,null,[s(J,{absolute:!0,modelValue:t.overlay,"onUpdate:modelValue":e[0]||(e[0]=o=>t.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:a(()=>[s(d,null,{default:a(()=>[s(j,{color:"primary",size:"32",indeterminate:""}),ae,oe]),_:1})]),_:1},8,["modelValue"]),s(H,{fluid:""},{default:a(()=>[s(I,{class:"mx-auto",elevation:"4"},{default:a(()=>[s(z,null,{default:a(()=>[s(Y,{class:"text-h5 font-weight-bold mx-2"},{default:a(()=>[h(" Filter Bulan dan Kantor ")]),_:1})]),_:1}),s(O,null,{default:a(()=>[s(x,null,{default:a(()=>[s(d,{cols:"12",sm:"6"},{default:a(()=>[s(F,{modelValue:t.selectedMonth,"onUpdate:modelValue":e[1]||(e[1]=o=>t.selectedMonth=o),label:"Pilih Bulan dan Tahun","prepend-icon":"mdi-calendar",type:"month",outlined:"",dense:"",onClick:r.openMonthPicker,ref:"monthPicker"},null,8,["modelValue","onClick"])]),_:1}),s(d,{cols:"12",sm:"6"},{default:a(()=>[s(S,{modelValue:t.selectedOffice,"onUpdate:modelValue":e[2]||(e[2]=o=>t.selectedOffice=o),items:t.offices,label:"Pilih Kantor","prepend-icon":"mdi-office-building",outlined:"",dense:""},null,8,["modelValue","items"])]),_:1})]),_:1}),s(x,{class:"mt-4"},{default:a(()=>[s(d,{cols:"12",class:"text-center"},{default:a(()=>[s(w,{color:"primary",onClick:r.applyFilter,elevation:"2"},{default:a(()=>[h(" Terapkan Filter ")]),_:1},8,["onClick"])]),_:1})]),_:1}),s(x,{class:"mt-4"},{default:a(()=>[s(d,{cols:"12"},{default:a(()=>[n("p",ne,[s(k,{small:"",left:""},{default:a(()=>[h("mdi-information")]),_:1}),h(" Pilih bulan, tahun, dan kantor untuk menampilkan data ")])]),_:1})]),_:1})]),_:1})]),_:1}),s(I,{class:"mt-3",elevation:"4"},{default:a(()=>[s(Q,{modelValue:t.tab,"onUpdate:modelValue":e[3]||(e[3]=o=>t.tab=o),class:"v-tabs-pill","bg-color":"secondary"},{default:a(()=>[s(D,{value:"0"},{default:a(()=>[h("Semua")]),_:1}),s(D,{value:"1"},{default:a(()=>[h("Approved")]),_:1}),s(D,{value:"2"},{default:a(()=>[h("Pending")]),_:1}),s(D,{value:"3"},{default:a(()=>[h("Rejected")]),_:1})]),_:1},8,["modelValue"]),s(O,null,{default:a(()=>[s(X,{modelValue:t.tab,"onUpdate:modelValue":e[9]||(e[9]=o=>t.tab=o)},{default:a(()=>[(c(!0),b(R,null,K(t.phases,o=>(c(),g(Z,{value:o.value},{default:a(()=>[s(x,{class:"d-flex justify-end pa-3"},{default:a(()=>[t.userAccess&&parseInt(t.userAccess.canInsertData)?(c(),g(w,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:e[4]||(e[4]=p=>r.openModal(1))},{default:a(()=>[s(k,{icon:"mdi-plus"}),h(" Tambah Data ")]),_:1})):f("",!0),s(w,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[5]||(e[5]=p=>r.openModal(2))},{default:a(()=>[s(k,{icon:"mdi-download"}),h(" Rekap Data ")]),_:1}),s(ee),s(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:t.searchValue,"onUpdate:modelValue":e[6]||(e[6]=p=>t.searchValue=p)},null,8,["modelValue"])]),_:1}),n("div",{class:"table-container",onTouchstart:e[7]||(e[7]=T(()=>{},["stop"])),onTouchmove:e[8]||(e[8]=T(()=>{},["stop"]))},[s(v,{"show-index":"",headers:t.headers,items:t.items,"search-value":t.searchValue},{"empty-message":a(()=>[ie]),loading:a(()=>[re]),"item-plafon":a(p=>[h("Rp. "+C(r.formatInput(p.plafon))+",-",1)]),"item-isApproved":a(p=>[parseInt(p.isApproved)==1?(c(),b("span",de," Approved")):f("",!0),parseInt(p.isApproved)==2?(c(),b("span",ue," Pending")):f("",!0),parseInt(p.isApproved)==3?(c(),b("span",me," Rejected")):f("",!0)]),"item-aoro":a(p=>[n("span",null,C(p.user.name),1)]),"item-created_at":a(p=>[n("span",null,C(r.formatDate(p.created_at))+" WIB",1)]),"item-operation":a(p=>[n("div",pe,[n("div",ce,[s(N,{location:"top",text:"Detail Kredit"},{activator:a(({props:_})=>[n("button",U(_,{onClick:P=>r.toDetail(p)}),[s(k,{size:"20",icon:"bx-link-external",color:"blue"})],16,fe)]),_:2},1024),t.role&&t.role.canDownload==1?(c(),g(N,{key:0,location:"top",text:"Download Semua File Kredit"},{activator:a(({props:_})=>[n("button",U(_,{onClick:P=>r.downloadFile(p.id)}),[s(k,{size:"20",icon:"bx-download",color:"red"})],16,he)]),_:2},1024)):f("",!0)])])]),_:1},8,["headers","items","search-value"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),s(te,{modelValue:t.insert,"onUpdate:modelValue":e[38]||(e[38]=o=>t.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:a(()=>[s(I,null,{title:a(()=>[h(" Tambah Data")]),text:a(()=>[s(le,{onSubmit:T(r.insertData,["prevent"])},{default:a(()=>[s(x,null,{default:a(()=>[s(d,{md:"12",cols:"12"},{default:a(()=>[ge,Fe,s(S,{items:t.users,autofocus:"",modelValue:t.dataForm.user_id,"onUpdate:modelValue":e[10]||(e[10]=o=>t.dataForm.user_id=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[_e,ye,s(F,{class:"my-3",modelValue:t.dataForm.name,"onUpdate:modelValue":e[11]||(e[11]=o=>t.dataForm.name=o),autofocus:"",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[ve,Ve,s(F,{class:"my-3",modelValue:r.formattedPlafon,"onUpdate:modelValue":e[12]||(e[12]=o=>r.formattedPlafon=o),type:"text",onInput:r.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[be,ke,s(F,{class:"my-3",modelValue:t.dataForm.nik_pemohon,"onUpdate:modelValue":e[13]||(e[13]=o=>t.dataForm.nik_pemohon=o),type:"number",rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[xe,Pe,s(F,{class:"my-3",modelValue:t.dataForm.address,"onUpdate:modelValue":e[14]||(e[14]=o=>t.dataForm.address=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[we,Se,s(F,{class:"my-3",modelValue:t.dataForm.no_hp,"onUpdate:modelValue":e[15]||(e[15]=o=>t.dataForm.no_hp=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[De,Ae,s(S,{items:t.orderList,autofocus:"",modelValue:t.dataForm.order_source,"onUpdate:modelValue":e[16]||(e[16]=o=>t.dataForm.order_source=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[Ce,Te,s(S,{items:t.statusCreditList,autofocus:"",modelValue:t.dataForm.status_kredit,"onUpdate:modelValue":e[17]||(e[17]=o=>t.dataForm.status_kredit=o),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[Ie,Re,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[18]||(e[18]=o=>r.handleFileChange(o,"file1"))},null,8,["rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[Ue,Oe,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[19]||(e[19]=o=>r.handleFileChange(o,"file4"))},null,8,["rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[Ee,Ne,s($,{modelValue:t.selectedPhoto,"onUpdate:modelValue":e[20]||(e[20]=o=>t.selectedPhoto=o),mandatory:!0,row:""},{default:a(()=>[s(E,{label:"Foto Kunjungan",value:"fotoKunjungan"}),s(E,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1}),t.selectedPhoto==="fotoKunjungan"?(c(),g(d,{key:0,md:"12",cols:"12"},{default:a(()=>[Be,Me,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[21]||(e[21]=o=>{r.handleFileChange(o,"file10"),r.resetFile("file11")})},null,8,["rules"])]),_:1})):f("",!0),t.selectedPhoto==="fotoWhatsApp"?(c(),g(d,{key:1,md:"12",cols:"12"},{default:a(()=>[je,Ke,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[22]||(e[22]=o=>{r.handleFileChange(o,"file11"),r.resetFile("file10")})},null,8,["rules"])]),_:1})):f("",!0),s(A,{thickness:5}),s(d,{cols:"12",md:"12"},{default:a(()=>[s(B,{modelValue:t.dataForm.hasFile2,"onUpdate:modelValue":e[23]||(e[23]=o=>t.dataForm.hasFile2=o),label:"Apakah pemohon sudah menikah?",onChange:e[24]||(e[24]=o=>(r.resetFile("file2"),t.dataForm.nik_pasangan=null))},null,8,["modelValue"])]),_:1}),s(A,{thickness:5}),t.dataForm.hasFile2?(c(),g(d,{key:2,md:"12",cols:"12"},{default:a(()=>[qe,Le,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[25]||(e[25]=o=>r.handleFileChange(o,"file2"))},null,8,["rules"])]),_:1})):f("",!0),t.dataForm.hasFile2?(c(),g(d,{key:3,md:"12",cols:"12"},{default:a(()=>[Ge,We,s(F,{class:"my-3",type:"number",modelValue:t.dataForm.nik_pasangan,"onUpdate:modelValue":e[26]||(e[26]=o=>t.dataForm.nik_pasangan=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):f("",!0),t.dataForm.hasFile2?(c(),g(d,{key:4,md:"12",cols:"12"},{default:a(()=>[Je,He,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[27]||(e[27]=o=>{r.handleFileChange(o,"file5"),r.resetFile("file7"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):f("",!0),t.selectedOption==="jaminanSHM"?(c(),g(d,{key:5,md:"12",cols:"12"},{default:a(()=>[ze,Ye,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[28]||(e[28]=o=>{r.handleFileChange(o,"file7"),r.resetFile("file5"),r.resetFile("file8")})},null,8,["rules"])]),_:1})):f("",!0),t.selectedOption==="jaminanBPKB"?(c(),g(d,{key:6,md:"12",cols:"12"},{default:a(()=>[Qe,Xe,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[29]||(e[29]=o=>{r.handleFileChange(o,"file8"),r.resetFile("file5"),r.resetFile("file7")})},null,8,["rules"])]),_:1})):f("",!0),s(A,{thickness:5}),s(d,{cols:"12",md:"12"},{default:a(()=>[s(B,{modelValue:t.dataForm.hasFile3,"onUpdate:modelValue":e[30]||(e[30]=o=>t.dataForm.hasFile3=o),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[31]||(e[31]=o=>(r.resetFile("file3"),t.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1}),t.dataForm.hasFile3?(c(),g(d,{key:7,md:"12",cols:"12"},{default:a(()=>[Ze,$e,s(y,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[t.rules.required],onChange:e[32]||(e[32]=o=>r.handleFileChange(o,"file3"))},null,8,["rules"])]),_:1})):f("",!0),t.dataForm.hasFile3?(c(),g(d,{key:8,md:"12",cols:"12"},{default:a(()=>[et,tt,s(F,{class:"my-3",type:"number",modelValue:t.dataForm.nik_jaminan,"onUpdate:modelValue":e[33]||(e[33]=o=>t.dataForm.nik_jaminan=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1})):f("",!0),s(A,{thickness:5}),s(d,{md:"12",cols:"12"},{default:a(()=>[lt,st,s(F,{class:"my-3",modelValue:t.dataForm.type_bussiness,"onUpdate:modelValue":e[34]||(e[34]=o=>t.dataForm.type_bussiness=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"12",cols:"12"},{default:a(()=>[at,ot,s(F,{class:"my-3",modelValue:t.dataForm.desc_bussiness,"onUpdate:modelValue":e[35]||(e[35]=o=>t.dataForm.desc_bussiness=o),rules:[t.rules.required]},null,8,["modelValue","rules"])]),_:1}),s(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:a(()=>[s(w,{type:"submit",disabled:t.dataForm.name==null||t.dataForm.plafon==null||t.dataForm.type_bussiness==null||t.dataForm.desc_bussiness==null||t.dataForm.file1==null||t.dataForm.file4==null||t.dataForm.file10==null&&t.dataForm.file11==null},{default:a(()=>[h(" Simpan ")]),_:1},8,["disabled"]),n("button",{type:"button",class:"btn btn-blue",onClick:e[36]||(e[36]=o=>r.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:a(()=>[s(q,{modelValue:t.uploadProgress,"onUpdate:modelValue":e[37]||(e[37]=o=>t.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})],64)}const It=W(se,[["render",nt],["__scopeId","data-v-e5188d8c"]]);export{It as default};

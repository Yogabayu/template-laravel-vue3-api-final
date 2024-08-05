import{m as S}from"./axios-379d51f3.js";import{I as M}from"./insertKredit-5b43e0a0.js";import{_ as B,r as V,o as p,i as _,w as a,a as s,f as n,V as b,e as w,b as c,j as m,c as g,G as K,h as v,t as T,L as k,M as A,O,d as P,H as L,I as U,J as j}from"./main-a9d2a525.js";import{V as G}from"./VContainer-403ef20d.js";import{a as W,c as J,b as R,V as x}from"./VCard-af6324af.js";import{V as D}from"./VRow-9c121a63.js";import{V as E}from"./VTextField-920a3dac.js";import{V as z}from"./VSelect-453f56ba.js";import{V as H,a as f}from"./VTabs-0357ff4b.js";import{V as Y,a as q}from"./VWindowItem-2a5e69a2.js";import{V as $}from"./VSpacer-80174445.js";import{V as y}from"./VTooltip-4d68b861.js";import"./VDialog-10c3fbe0.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-2f36a849.js";import"./VForm-cb04da0b.js";import"./VInput-372ad7b1.js";import"./index-5f12c0a5.js";import"./VFileInput-1d1a4ee9.js";import"./VChip-89f82e07.js";import"./VAvatar-6e266421.js";import"./VImg-a1aa7f95.js";import"./VCheckbox-c7e49b52.js";import"./VRadioGroup-af91084f.js";import"./VMenu-5f48eb8d.js";const Q={inject:["loading"],components:{InsertModal:M},computed:{formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(e){this.dataForm.plafon=e.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(e){this.dataForm.plafon=e.replace(/\D/g,"")}},searchableItems(){return this.items.map(e=>({...e,office_names:e.user.position.offices.map(t=>t.name).join(", ")}))}},data(){return{selectedMonth:new Date().toISOString().slice(0,7),selectedOffice:null,offices:[],monthYear:this.$route.params.monthYear,selectedOption:"bukuNikah",selectedPhoto:"",insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:e=>!!e||"Required"},role:{canDownload:0},items:[],originalItems:[],userAccess:null,headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Tipe",value:"type",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Kantor",value:"office_names",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!1},{text:"Analisa AO/RO",value:"analisaAO",sortable:!1},{text:"Aksi",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7},{value:8}],orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null},isStatusPhase:!1,statusPhase:0}},watch:{tab(e){e==1?this.filterDataStatus(1):e==2?this.filterDataStatus(2):e==3?this.filterDataStatus(3):e==4?this.filterDataStatus(4):e==5?this.filterDataStatus(5):e==6?this.filterDataStatus(6):e==7?this.filterDataStatus(7):e==8?this.filterDataStatus(8):this.items=[...this.originalItems]}},methods:{hasSlikAttachment(e){return e.some(t=>t.name.includes("SLIK")&&parseInt(t.phase)==2&&(t.path!="null"||t.link!=null))},hasAnalisaAoAttachment(e){return e.some(t=>t.name.includes("Analisa Awal Kredit AO")&&parseInt(t.phase)==2&&(t.path!="null"||t.link!=null))},goBack(){this.$router.go(-1)},async applyFilter(){try{if(this.selectedOffice==null){this.$showToast("warning","Sorry","Pilih kantor terlebih dahulu");return}this.loading.show();const[e,t]=this.selectedMonth.split("-"),l={year:e,month:t,office_id:this.selectedOffice};localStorage.setItem("filterState",JSON.stringify(l));const i=new FormData;i.append("year",e),i.append("month",t),i.append("office_id",this.selectedOffice);const o=await S.post("/user/filterData",i);o.status===200?(this.items=o.data.data,this.originalItems=[...this.items],this.loading.hide(),this.tab=0):(this.loading.hide(),this.$showToast("error","Error","Terjadi kesalahan saat filter data"))}catch{this.loading.hide(),this.$showToast("error","Error","Terjadi kesalahan saat filter data")}},async restoreAndApplyFilter(){const e=JSON.parse(localStorage.getItem("filterState"));e&&(this.selectedMonth=`${e.year}-${e.month}`,this.selectedOffice=e.office_id,await this.applyFilter())},openMonthPicker(){this.$refs.monthPicker.$el.querySelector("input").click()},formatDate(e){return new Date(e).toLocaleString("id-ID")},async downloadFile(e){try{this.loading.show();const t=await S.get(`/download-all/${e}`,{responseType:"blob"});if(t.status===200){this.loading.hide();const l=window.URL.createObjectURL(new Blob([t.data])),i=document.createElement("a");i.href=l,i.setAttribute("download",`${e}.zip`),document.body.appendChild(i),i.click(),document.body.removeChild(i),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.loading.hide(),this.$showToast("error","Error","Gagal mengunduh file")}catch{this.loading.hide(),this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},formatInput(e){return e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),e},toDetail(e){this.$router.push(`/u-credit/${e.id}`)},async deleteFile(e){try{if(this.loading.show(),!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const l=await S.delete(`/user/credit/${e.id}`);l.status===200?(this.loading.hide(),this.applyFilter(),this.$showToast("success","Berhasill",l.data.message)):(this.loading.hide(),this.applyFilter(),this.$showToast("error","Sorry",l.data.message))}catch(t){this.loading.hide(),this.applyFilter(),this.$showToast("error","Sorry",t.response.data.message)}},resetFile(e){!this.dataForm[e]!=null&&(this.dataForm[e]=null)},handleFileChange(e,t){const l=e.target.files[0];l&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(l.type)?(this.dataForm[t]=l,t=="file1"?this.dataForm.noteFile1="KTP Pemohon":t=="file2"?this.dataForm.noteFile2="KTP Pasangan":t=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":t=="file4"?this.dataForm.noteFile4="Kartu Keluarga":t=="file5"?this.dataForm.noteFile5="Buku Nikah":t=="file7"?this.dataForm.noteFile7="Jaminan SHM":t=="file8"?this.dataForm.noteFile8="Jaminan BPKB":t=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":t=="file10"?this.dataForm.noteFile10="Foto Kunjungan":t=="file11"&&(this.dataForm.noteFile11="Foto WhatsApp")):(this.loading.hide(),this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),e.target.value=null)},async getRecaptData(){try{if(this.loading.show(),this.selectedOffice==null){this.$showToast("error","Sorry","Pilih Kantor terlebih dahulu"),this.loading.hide();return}const[e,t]=this.selectedMonth.split("-"),l=new FormData;l.append("year",e),l.append("month",t),l.append("office_id",this.selectedOffice),l.append("type",this.tab);const i=await S.post("/user/filterDataReport",l,{responseType:"blob"});if(i.status===200){this.loading.hide();const o=i.headers["content-disposition"];let d="download.xlsx";if(o){const r=o.match(/filename="?(.+)"?/i);r.length===2&&(d=r[1])}const F=new Blob([i.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),I=window.URL.createObjectURL(F),u=document.createElement("a");u.href=I,u.setAttribute("download",d),document.body.appendChild(u),u.click(),document.body.removeChild(u),this.$showToast("success","Berhasil","File Excel berhasil diunduh")}else this.$showToast("error","Sorry",i.data.data.message)}catch(e){this.loading.hide(),this.$showToast("error","Sorry",e.response.data.message)}},async openModal(e,t=null){e===1?this.insert=!0:e===2&&this.getRecaptData(this.selectedMonth)},closeModal(e){e===1?(this.resetForm(),this.insert=!1):e===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInputIn(e){let t=e.target.value;t=t.replace(/\D/g,""),t=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),e.target.value=t},formatNumber(e){return e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},filterDataStatus(e){const t={1:l=>l.isApproved==1,2:l=>l.isApproved==2,3:l=>l.isApproved==3,4:l=>parseInt(l.phase)==1,8:l=>parseInt(l.phase)==5,5:l=>l.attachments.some(i=>i.name.includes("SLIK")&&parseInt(i.phase)==2&&(i.path!="null"||i.link!=null)),6:l=>parseInt(l.phase)==4,7:l=>l.isApproved==4};this.items=e in t?this.originalItems.filter(t[e]):[...this.originalItems]},getUserData(){const e=localStorage.getItem("userData");if(e){this.userData=JSON.parse(e),this.offices=this.userData.position.offices.map(i=>({value:i.id,title:i.name}));const t="ao/ro";if(this.userData.position.name.toLowerCase().replace(/\s/g,"")!==t){const i={value:0,title:"Semua Kantor"};this.offices.unshift(i)}}},formatInputPlafon(e){let t=e.target.value;t=t.replace(/\D/g,""),t=t.replace(/\B(?=(\d{3})+(?!\d))/g,","),e.target.value=t},async insertData(){try{this.loading.show();const e=new FormData;e.append("name",this.dataForm.name),e.append("nik_pemohon",this.dataForm.nik_pemohon),e.append("address",this.dataForm.address),e.append("no_hp",this.dataForm.no_hp),e.append("order_source",this.dataForm.order_source),e.append("status_kredit",this.dataForm.status_kredit),e.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),e.append("type_bussiness",this.dataForm.type_bussiness),e.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&e.append("nik_pasangan",this.dataForm.nik_pasangan),this.dataForm.file3!=null&&e.append("nik_jaminan",this.dataForm.nik_jaminan);for(let i=1;i<=11;i++){if(i===6)continue;let o="file"+i,d="noteFile"+i,F="hasFile"+i;this.dataForm.hasOwnProperty(F)&&this.dataForm[F]||this.dataForm[o]?this.dataForm[o]&&(e.append(o,this.dataForm[o]),e.append(d,this.dataForm[d])):this.dataForm[o]&&e.append(o,this.dataForm[o])}e.append("_method","POST");const t={onUploadProgress:i=>{try{this.uploadProgress=Math.round(i.loaded*100/i.total)}catch(o){console.error("Error calculating progress:",o)}},headers:{"Content-Type":"multipart/form-data"}},l=await S.post("/user/credit",e,t);l.status===200?(this.loading.hide(),this.closeModal(1),this.applyFilter(),this.uploadProgress=null,this.$showToast("success","Success",l.data.message)):(this.loading.hide(),this.uploadProgress=null,this.applyFilter(),this.$showToast("error","Sorry",l.data.message))}catch(e){this.loading.hide(),this.uploadProgress=null,this.closeModal(1),this.applyFilter(),this.$showToast("error","Sorry",e.response.data.message)}},async getUserAccess(){try{const e=await S.get("/user/userAccess");e.status===200?this.userAccess=e.data.data:console.log(e.data.data.message)}catch(e){console.log(e)}}},mounted(){this.restoreAndApplyFilter(),this.getUserData(),this.getUserAccess()}};const N=e=>(U("data-v-4888b20a"),e=e(),j(),e),X={class:"text-body-2"},Z=N(()=>c("p",null,"Data Kosong",-1)),ee=N(()=>c("p",null,"loading data .....",-1)),te={key:0},ae={key:1},se={key:2},le={key:3},ie={key:0},oe={key:1},re={key:2},ne={class:"operation-wrapper"},de={class:"d-flex justify-space-between"},ue=["onClick"],pe=["onClick"];function ce(e,t,l,i,o,d){const F=V("EasyDataTable"),I=V("InsertModal");return p(),_(G,{fluid:""},{default:a(()=>[s(x,{class:"mx-auto",elevation:"4"},{default:a(()=>[s(W,null,{default:a(()=>[s(J,{class:"text-h5 font-weight-bold mx-2"},{default:a(()=>[n(" Filter Bulan dan Kantor ")]),_:1})]),_:1}),s(R,null,{default:a(()=>[s(D,null,{default:a(()=>[s(b,{cols:"12",sm:"6"},{default:a(()=>[s(E,{modelValue:o.selectedMonth,"onUpdate:modelValue":t[0]||(t[0]=u=>o.selectedMonth=u),label:"Pilih Bulan dan Tahun","prepend-icon":"mdi-calendar",type:"month",outlined:"",dense:"",onClick:d.openMonthPicker,ref:"monthPicker"},null,8,["modelValue","onClick"])]),_:1}),s(b,{cols:"12",sm:"6"},{default:a(()=>[s(z,{modelValue:o.selectedOffice,"onUpdate:modelValue":t[1]||(t[1]=u=>o.selectedOffice=u),items:o.offices,label:"Pilih Kantor","prepend-icon":"mdi-office-building",outlined:"",dense:""},null,8,["modelValue","items"])]),_:1})]),_:1}),s(D,{class:"mt-4"},{default:a(()=>[s(b,{cols:"12",class:"text-center"},{default:a(()=>[s(w,{color:"primary",onClick:d.applyFilter,elevation:"2"},{default:a(()=>[n(" Terapkan Filter ")]),_:1},8,["onClick"])]),_:1})]),_:1}),s(D,{class:"mt-4"},{default:a(()=>[s(b,{cols:"12"},{default:a(()=>[c("p",X,[s(m,{small:"",left:""},{default:a(()=>[n("mdi-information")]),_:1}),n(" Pilih bulan, tahun, dan kantor untuk menampilkan data ")])]),_:1})]),_:1})]),_:1})]),_:1}),s(x,{class:"mt-3",elevation:"4"},{default:a(()=>[s(H,{modelValue:o.tab,"onUpdate:modelValue":t[2]||(t[2]=u=>o.tab=u),class:"v-tabs-pill","bg-color":"secondary"},{default:a(()=>[s(f,{value:"0"},{default:a(()=>[n("Semua")]),_:1}),s(f,{value:"1"},{default:a(()=>[n("Approved")]),_:1}),s(f,{value:"2"},{default:a(()=>[n("Pending")]),_:1}),s(f,{value:"3"},{default:a(()=>[n("Rejected")]),_:1}),s(f,{value:"7"},{default:a(()=>[n("Cancel by Debitur")]),_:1}),n(" | "),s(f,{value:"4"},{default:a(()=>[n("Pooling")]),_:1}),s(f,{value:"5"},{default:a(()=>[n("SLIK")]),_:1}),s(f,{value:"6"},{default:a(()=>[n("Komite")]),_:1}),s(f,{value:"8"},{default:a(()=>[n("Ops")]),_:1})]),_:1},8,["modelValue"]),s(R,null,{default:a(()=>[s(Y,{modelValue:o.tab,"onUpdate:modelValue":t[8]||(t[8]=u=>o.tab=u)},{default:a(()=>[(p(!0),g(L,null,K(o.phases,u=>(p(),_(q,{value:u.value},{default:a(()=>[s(D,{class:"d-flex justify-end pa-3"},{default:a(()=>[o.userAccess&&parseInt(o.userAccess.canInsertData)?(p(),_(w,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:t[3]||(t[3]=r=>d.openModal(1))},{default:a(()=>[s(m,{icon:"mdi-plus"}),n(" Tambah Data ")]),_:1})):v("",!0),s(w,{color:"primary",size:"small",class:"my-3 mx-3",onClick:t[4]||(t[4]=r=>d.openModal(2))},{default:a(()=>[s(m,{icon:"mdi-download"}),n(" Rekap Data ")]),_:1}),s($),s(E,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":t[5]||(t[5]=r=>o.searchValue=r)},null,8,["modelValue"])]),_:1}),c("div",{class:"table-container",onTouchstart:t[6]||(t[6]=P(()=>{},["stop"])),onTouchmove:t[7]||(t[7]=P(()=>{},["stop"]))},[s(F,{"show-index":"",headers:o.headers,items:d.searchableItems,"search-value":o.searchValue,"search-field":o.searchField,"rows-per-page":500,"border-cell":"","buttons-pagination":""},{"empty-message":a(()=>[Z]),loading:a(()=>[ee]),"item-plafon":a(r=>[n("Rp. "+T(d.formatInput(r.plafon))+",-",1)]),"item-isApproved":a(r=>[parseInt(r.isApproved)==1?(p(),g("span",te," Approved")):v("",!0),parseInt(r.isApproved)==2?(p(),g("span",ae," Pending")):v("",!0),parseInt(r.isApproved)==3?(p(),g("span",se," Rejected")):v("",!0),parseInt(r.isApproved)==4?(p(),g("span",le," Cancel by Debitur")):v("",!0)]),"item-type":a(r=>[parseInt(r.type)==1?(p(),g("span",ie," Reguler")):v("",!0),parseInt(r.type)==2?(p(),g("span",oe," Restruktur")):(p(),g("span",re," -"))]),"item-aoro":a(r=>[c("span",null,T(r.user.name),1)]),"item-slik":a(r=>[d.hasSlikAttachment(r.attachments)?(p(),_(y,{key:0,location:"top",text:"Kondisi SLIK Sudah Terupload"},{activator:a(({props:h})=>[c("span",k(A(h)),[s(m,{color:"success"},{default:a(()=>[n("mdi-check-circle")]),_:1})],16)]),_:1})):(p(),_(y,{key:1,location:"top",text:"Kondisi SLIK Belum Terupload"},{activator:a(({props:h})=>[c("span",k(A(h)),[s(m,{color:"error"},{default:a(()=>[n("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-analisaAO":a(r=>[d.hasAnalisaAoAttachment(r.attachments)?(p(),_(y,{key:0,location:"top",text:"Analisa AO Sudah Terupload"},{activator:a(({props:h})=>[c("span",k(A(h)),[s(m,{color:"success"},{default:a(()=>[n("mdi-check-circle")]),_:1})],16)]),_:1})):(p(),_(y,{key:1,location:"top",text:"Analisa AO Belum Terupload"},{activator:a(({props:h})=>[c("span",k(A(h)),[s(m,{color:"error"},{default:a(()=>[n("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-created_at":a(r=>[c("span",null,T(d.formatDate(r.created_at))+" WIB",1)]),"item-operation":a(r=>[c("div",ne,[c("div",de,[s(y,{location:"top",text:"Detail Kredit"},{activator:a(({props:h})=>[c("button",O(h,{onClick:C=>d.toDetail(r)}),[s(m,{size:"20",icon:"bx-link-external",color:"blue"})],16,ue)]),_:2},1024),s(y,{location:"top",text:"Download Semua File Kredit"},{activator:a(({props:h})=>[c("button",O(h,{onClick:C=>d.downloadFile(r.id)}),[s(m,{size:"20",icon:"bx-download",color:"red"})],16,pe)]),_:2},1024)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),s(I,{modelValue:o.insert,"onUpdate:modelValue":t[9]||(t[9]=u=>o.insert=u),"order-list":o.orderList,"status-credit-list":o.statusCreditList,"close-modal":d.closeModal},null,8,["modelValue","order-list","status-credit-list","close-modal"])]),_:1})]),_:1})}const Be=B(Q,[["render",ce],["__scopeId","data-v-4888b20a"]]);export{Be as default};

import{m as y}from"./axios-379d51f3.js";import{I as x}from"./insertKredit-5b43e0a0.js";import{_ as w,r as v,o as r,c,a as l,w as s,H as V,f as p,t as _,i as f,j as m,e as O,h as u,b as i,L as g,M as I,O as T,d as b}from"./main-a9d2a525.js";import{V as D,c as C,b as N}from"./VCard-af6324af.js";import{V as F}from"./VRow-9c121a63.js";import{V as B}from"./VSpacer-80174445.js";import{V as K}from"./VTextField-920a3dac.js";import{V as A}from"./VTooltip-4d68b861.js";import"./VDialog-10c3fbe0.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-2f36a849.js";import"./VForm-cb04da0b.js";import"./VInput-372ad7b1.js";import"./index-5f12c0a5.js";import"./VSelect-453f56ba.js";import"./VMenu-5f48eb8d.js";import"./VAvatar-6e266421.js";import"./VImg-a1aa7f95.js";import"./VChip-89f82e07.js";import"./VFileInput-1d1a4ee9.js";import"./VCheckbox-c7e49b52.js";import"./VRadioGroup-af91084f.js";const M={inject:["loading"],components:{InsertModal:x},watch:{$route(){this.type=parseInt(localStorage.getItem("creditType"))||0}},computed:{searchableItems(){return this.items.map(e=>({...e,office_names:e.user.position.offices.map(t=>t.name).join(", ")}))},getCreditStatusText(){switch(this.type){case 1:return"approve";case 2:return"pending";case 3:return"reject";case 4:return"cancel";default:return""}}},data(){return{insert:!1,items:[],userAccess:null,type:parseInt(localStorage.getItem("creditType"))||0,originalItems:[],orderList:[{value:"AO SENDIRI",title:"AO SENDIRI"},{value:"C. SERVIS / KANTOR",title:"C. SERVIS / KANTOR"},{value:"NASABAH",title:"NASABAH"},{value:"CROSS SALING DIVISI",title:"CROSS SALING DIVISI"},{value:"AGEN MGM / LAINNYA",title:"AGEN MGM / LAINNYA"},{value:"WEBSITE / WA / SOSMED",title:"WEBSITE / WA/ SOSMED"},{value:"TEAM BUSSINES",title:"TEAM BUSSINES"},{value:"PROGRAM KKB NEW",title:"PROGRAM KKB NEW"},{value:"PROGRAM KKB SECOND",title:"PROGRAM KKB SECOND"},{value:"CENTRO",title:"CENTRO"}],statusCreditList:[{value:"FRESH",title:"FRESH"},{value:"REPEAT ORDER",title:"REPEAT ORDER"},{value:"TOPUP",title:"TOPUP"}],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Tipe",value:"type",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Kantor",value:"office_names",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"SLIK",value:"slik",sortable:!1},{text:"Analisa AO/RO",value:"analisaAO",sortable:!1},{text:"Aksi",value:"operation",width:100}],searchField:["name","plafon","phase","type_bussiness","desc_bussiness","reasonRejected","nik_pemohon","nik_pasangan","nik_jaminan","address","no_hp","order_source","status_kredit","user.name","user.position.name","office_names"],searchValue:"",role:{canDownload:0}}},methods:{closeModal(e){e===1?(this.resetForm(),this.insert=!1):e===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInput(e){return e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),e},formatDate(e){return new Date(e).toLocaleString("id-ID")},hasSlikAttachment(e){return e.some(t=>t.name.includes("SLIK")&&parseInt(t.phase)==2&&(t.path!="null"||t.link!=null))},hasAnalisaAoAttachment(e){return e.some(t=>t.name.includes("Analisa Awal Kredit AO")&&parseInt(t.phase)==2&&(t.path!="null"||t.link!=null))},toDetail(e){this.$router.push(`/u-credit/${e.id}`)},async downloadFile(e){try{this.loading.show();const t=await y.get(`/download-all/${e}`,{responseType:"blob"});if(t.status===200){this.loading.hide();const S=window.URL.createObjectURL(new Blob([t.data])),h=document.createElement("a");h.href=S,h.setAttribute("download",`${e}.zip`),document.body.appendChild(h),h.click(),document.body.removeChild(h),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.loading.hide(),this.$showToast("error","Error","Gagal mengunduh file")}catch{this.loading.hide(),this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},async getAllFiles(){try{this.loading.show(),this.type=this.type=parseInt(localStorage.getItem("creditType"))||0;const e=await y.get(`/user/getCredit/${this.type}`);e.status===200?(this.loading.hide(),this.items=e.data.data.files,this.userAccess=e.data.data.userAccess,this.role=e.data.data.role,this.originalItems=[...this.items]):(this.loading.hide(),this.$showToast("error","Sorry",e.data.data.message))}catch(e){this.loading.hide(),this.$showToast("error","Sorry",e.response.data.message)}}},mounted(){this.getAllFiles()},created(){this.type=parseInt(localStorage.getItem("creditType"))||0}},L=i("p",null,"Data Kosong",-1),P=i("p",null,"loading data .....",-1),j={key:0},G={key:1},U={key:2},W={key:3},z={key:0},H={key:1},Y={key:2},q={class:"operation-wrapper"},J={class:"d-flex justify-space-between"},Q=["onClick"],X=["onClick"];function Z(e,t,S,h,o,d){const k=v("EasyDataTable"),R=v("InsertModal");return r(),c(V,null,[l(D,null,{default:s(()=>[l(C,{class:"text-2xl font-weight-bold d-flex justify-left"},{default:s(()=>[p(" Kredit "+_(d.getCreditStatusText)+" Bulan ini ",1)]),_:1}),l(N,null,{default:s(()=>[l(F,{class:"d-flex justify-end pa-3 mb-1"},{default:s(()=>[o.userAccess&&parseInt(o.userAccess.canInsertData)?(r(),f(O,{key:0,color:"primary",size:"small",class:"my-3 mx-3",onClick:t[0]||(t[0]=a=>o.insert=!0)},{default:s(()=>[l(m,{icon:"mdi-plus"}),p("Tambah Data ")]),_:1})):u("",!0),l(B),l(K,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:o.searchValue,"onUpdate:modelValue":t[1]||(t[1]=a=>o.searchValue=a)},null,8,["modelValue"])]),_:1}),i("div",{class:"table-container",onTouchstart:t[2]||(t[2]=b(()=>{},["stop"])),onTouchmove:t[3]||(t[3]=b(()=>{},["stop"]))},[l(k,{"show-index":"",headers:o.headers,items:d.searchableItems,"search-value":o.searchValue,"search-field":o.searchField,"border-cell":"","buttons-pagination":"","rows-per-page":500},{"empty-message":s(()=>[L]),loading:s(()=>[P]),"item-plafon":s(a=>[p("Rp. "+_(d.formatInput(a.plafon))+",-",1)]),"item-isApproved":s(a=>[parseInt(a.isApproved)==1?(r(),c("span",j," Approved")):u("",!0),parseInt(a.isApproved)==2?(r(),c("span",G," Pending")):u("",!0),parseInt(a.isApproved)==3?(r(),c("span",U," Rejected")):u("",!0),parseInt(a.isApproved)==4?(r(),c("span",W," Cancel by Debitur")):u("",!0)]),"item-type":s(a=>[parseInt(a.type)===1?(r(),c("span",z," Reguler")):u("",!0),parseInt(a.type)===2?(r(),c("span",H," Restruktur")):u("",!0),parseInt(a.type)===3?(r(),c("span",Y," Pensiunan")):u("",!0)]),"item-aoro":s(a=>[i("span",null,_(a.user.name),1)]),"item-created_at":s(a=>[i("span",null,_(d.formatDate(a.created_at))+" WIB",1)]),"item-slik":s(a=>[d.hasSlikAttachment(a.attachments)?(r(),f(A,{key:0,location:"top",text:"Kondisi SLIK Sudah Terupload"},{activator:s(({props:n})=>[i("span",g(I(n)),[l(m,{color:"success"},{default:s(()=>[p("mdi-check-circle")]),_:1})],16)]),_:1})):(r(),f(A,{key:1,location:"top",text:"Kondisi SLIK Belum Terupload"},{activator:s(({props:n})=>[i("span",g(I(n)),[l(m,{color:"error"},{default:s(()=>[p("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-analisaAO":s(a=>[d.hasAnalisaAoAttachment(a.attachments)?(r(),f(A,{key:0,location:"top",text:"Analisa AO Sudah Terupload"},{activator:s(({props:n})=>[i("span",g(I(n)),[l(m,{color:"success"},{default:s(()=>[p("mdi-check-circle")]),_:1})],16)]),_:1})):(r(),f(A,{key:1,location:"top",text:"Analisa AO Belum Terupload"},{activator:s(({props:n})=>[i("span",g(I(n)),[l(m,{color:"error"},{default:s(()=>[p("mdi-close-circle")]),_:1})],16)]),_:1}))]),"item-operation":s(a=>[i("div",q,[i("div",J,[l(A,{location:"top",text:"Detail Kredit"},{activator:s(({props:n})=>[i("button",T(n,{onClick:E=>d.toDetail(a)}),[l(m,{size:"20",icon:"bx-link-external",color:"blue"})],16,Q)]),_:2},1024),o.role&&o.role.canDownload==1?(r(),f(A,{key:0,location:"top",text:"Download Semua File Kredit"},{activator:s(({props:n})=>[i("button",T(n,{onClick:E=>d.downloadFile(a.id)}),[l(m,{size:"20",icon:"bx-download",color:"red"})],16,X)]),_:2},1024)):u("",!0)])])]),_:1},8,["headers","items","search-value","search-field"])],32)]),_:1})]),_:1}),l(R,{modelValue:o.insert,"onUpdate:modelValue":t[4]||(t[4]=a=>o.insert=a),"order-list":o.orderList,"status-credit-list":o.statusCreditList,"close-modal":d.closeModal,"get-all-files":d.getAllFiles},null,8,["modelValue","order-list","status-credit-list","close-modal","get-all-files"])],64)}const ye=w(M,[["render",Z]]);export{ye as default};

import{m as y}from"./VGrid-bc82002c.js";import{r as B,o as h,c as T,a,w as t,G as S,E as I,b as r,i as _,e as p,F as J,h as g,V as U,t as V,M as w,d as M,f as v,a2 as q}from"./main-1510af4a.js";import{_ as K}from"./_plugin-vue_export-helper-c27b6911.js";import{V as N}from"./VOverlay-6a173b06.js";import{V as j,d as u,a as E,e as L,b as R,c as A}from"./VRow-e65ce29b.js";import{V as O,a as k}from"./VTabs-a48221e4.js";import{V as z,a as G}from"./VWindowItem-2dfbd3eb.js";import{V as H}from"./VSpacer-03a11f85.js";import{a as F,V as W}from"./VTextField-7c474d53.js";import{V as x}from"./VTooltip-0c0527b2.js";import{V as Y}from"./VDialog-7a40b249.js";import{V as f}from"./VFileInput-167590a5.js";import{V as P}from"./VDivider-272b0910.js";import{V as C}from"./VCheckbox-90ed254c.js";import"./VImg-8f311b38.js";import"./index-5b1dd9ba.js";import"./VInput-d4f2f5c1.js";import"./dialog-transition-3a7bc416.js";import"./VChip-aafad41a.js";import"./VCheckboxBtn-28ae77bc.js";const Q={data(){return{monthYear:this.$route.params.monthYear,overlay:!1,insert:!1,searchValue:"",userData:null,userToken:null,uploadProgress:null,tab:0,rules:{required:s=>!!s||"Required"},role:[],items:[],originalItems:[],headers:[{text:"Nama",value:"name",sortable:!0},{text:"Plafon",value:"plafon",sortable:!0},{text:"Status",value:"isApproved",sortable:!0},{text:"AO/RO",value:"aoro",sortable:!0},{text:"Tanggal",value:"created_at",sortable:!0},{text:"Operation",value:"operation",width:100}],phases:[{value:0},{value:1},{value:2},{value:3},{value:4}],dataForm:{id:null,name:"",plafon:null,type_bussiness:null,desc_bussiness:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}}},watch:{tab(s){s==1?this.filterDataStatus(1):s==2?this.filterDataStatus(2):s==3?this.filterDataStatus(3):this.items=[...this.originalItems]}},methods:{goBack(){this.$router.go(-1)},formatDate(s){return new Date(s).toLocaleString("id-ID")},async downloadFile(s){try{this.overlay=!0;const e=await y.get(`/download-all/${s}`,{responseType:"blob"});if(e.status===200){this.overlay=!1;const m=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=m,n.setAttribute("download",`${s}.zip`),document.body.appendChild(n),n.click(),document.body.removeChild(n),this.$showToast("success","Berhasil","File berhasil diunduh")}else this.overlay=!1,this.$showToast("error","Error","Gagal mengunduh file")}catch{this.overlay=!1,this.$showToast("error","Error","Terjadi kesalahan saat mengunduh file")}},toDetail(s){this.$router.push(`/a-credit/${s.id}`)},async deleteFile(s){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data? Semua Data akan terhapus secara permanen."))return;const m=await y.delete(`/credit/${s.id}`);m.status===200?(this.getAllFiles(),this.$showToast("success","Berhasill",m.data.message)):this.$showToast("error","Sorry",m.data.message)}catch(e){this.$showToast("error","Sorry",e.response.data.message)}},resetFile(s){!this.dataForm[s]!=null&&(this.dataForm[s]=null)},handleFileChange(s,e){const m=s.target.files[0];m&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(m.type)?(this.dataForm[e]=m,e=="file1"?this.dataForm.noteFile1="KTP Pemohon":e=="file2"?this.dataForm.noteFile2="KTP Pasangan":e=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":e=="file4"?this.dataForm.noteFile4="Kartu Keluarga":e=="file5"?this.dataForm.noteFile5="Buku Nikah":e=="file7"?this.dataForm.noteFile7="Jaminan SHM":e=="file8"?this.dataForm.noteFile8="Jaminan BPKB":e=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":e=="file10"&&(this.dataForm.noteFile10="Foto Kunjungan")):(this.$showToast("error","Error","Hanya file JPG, JPEG, dan PNG yang diizinkan."),s.target.value=null)},async openModal(s,e=null){s===1&&(this.insert=!0)},closeModal(s){s===1?(this.resetForm(),this.insert=!1):s===2&&(this.resetForm(),this.edit=!1)},resetForm(){this.dataForm={id:null,name:"",plafon:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null}},formatInput(s){return s=s.replace(/\D/g,""),s=s.replace(/\B(?=(\d{3})+(?!\d))/g,","),s},filterDataStatus(s){this.items=this.originalItems.filter(e=>e.isApproved==s)},getUserData(){const s=localStorage.getItem("userData");s&&(this.userData=JSON.parse(s))},async getAllFiles(){try{this.overlay=!0;const s=new FormData;s.append("monthYear",this.monthYear);const e=await y.post("/getCredit",s);e.status===200?(this.items=e.data.data.files,this.originalItems=[...this.items],this.overlay=!1):this.$showToast("error","Sorry",e.data.data.message)}catch(s){this.overlay=!1,this.$showToast("error","Sorry",s.response.data.message)}},formatInputPlafon(s){let e=s.target.value;e=e.replace(/\D/g,""),e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),s.target.value=e},async insertData(){try{this.overlay=!0;const s=new FormData;s.append("name",this.dataForm.name),s.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),s.append("type_bussiness",this.dataForm.type_bussiness),s.append("desc_bussiness",this.dataForm.desc_bussiness);for(let n=1;n<=10;n++){if(n===6)continue;let l="file"+n,i="noteFile"+n,b="hasFile"+n;this.dataForm.hasOwnProperty(b)&&this.dataForm[b]||this.dataForm[l]?this.dataForm[l]&&(s.append(l,this.dataForm[l]),s.append(i,this.dataForm[i])):this.dataForm[l]&&s.append(l,this.dataForm[l])}if(!this.dataForm.file7&&!this.dataForm.file8&&!this.dataForm.file9){this.overlay=!1,this.$showToast("success","Success","Wajib memasukkan salah satu jenis jaminan");return}s.append("_method","POST");const e={onUploadProgress:n=>{try{this.uploadProgress=Math.round(n.loaded*100/n.total)}catch(l){console.error("Error calculating progress:",l)}},headers:{"Content-Type":"multipart/form-data"}},m=await y.post("/credit",s,e);m.status===200?(this.overlay=!1,this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",m.data.message)):(this.overlay=!1,this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",m.data.message))}catch(s){this.overlay=!1,this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",s.response.data.message)}}},mounted(){this.getAllFiles(),this.getUserData()}},X=r("br",null,null,-1),Z=r("span",{class:"font-weight-bold text-lg"},"Loading....",-1),$=r("p",null,"Data Kosong",-1),ee=r("p",null,"loading data .....",-1),le={class:"operation-wrapper"},ae={class:"d-flex justify-space-between"},se=["onClick"],te=["onClick"],oe=["onClick"],re=r("span",{style:{color:"red"}},"*",-1),ie=r("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1),ne=r("span",{style:{color:"red"}},"*",-1),ue=r("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1),de=r("span",{style:{color:"red"}},"*",-1),me=r("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1),pe=r("span",{style:{color:"red"}},"*",-1),he=r("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1),fe=r("span",{style:{color:"red"}},"*",-1),ce=r("span",{class:"subtitle-1 text-center"},"Foto Kunjungan : ",-1),ge=r("span",{style:{color:"red"}},"*",-1),Fe=r("span",{class:"subtitle-1 text-center"},"KTP Pasangan Pemohon : ",-1),be=r("span",{style:{color:"red"}},"*",-1),ye=r("span",{class:"subtitle-1 text-center"},"Buku Nikah : ",-1),_e=r("span",{style:{color:"red"}},"*",-1),Ve=r("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1),ve=r("span",{style:{color:"red"}},"*",-1),ke=r("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1),we=r("span",{style:{color:"red"}},"*",-1),xe=r("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1),Pe=r("span",{style:{color:"red"}},"*",-1),Ce=r("span",{class:"subtitle-1 text-center"},"Lampirkan Salah Satu Jenis Jaminan : ",-1),De=r("span",{style:{color:"red"}},"*",-1),Te=r("span",{class:"subtitle-1 text-center"},"Jaminan SHM : ",-1);function Se(s,e,m,n,l,i){const b=B("EasyDataTable");return h(),T(S,null,[a(N,{absolute:!0,modelValue:l.overlay,"onUpdate:modelValue":e[0]||(e[0]=o=>l.overlay=o),contained:"",persistent:"",class:"align-center justify-center"},{default:t(()=>[a(u,null,{default:t(()=>[a(I,{color:"primary",size:"32",indeterminate:""}),X,Z]),_:1})]),_:1},8,["modelValue"]),a(j,null,{default:t(()=>[a(E,{class:"align-left"},{default:t(()=>[r("span",{color:"primary",onClick:e[1]||(e[1]=(...o)=>i.goBack&&i.goBack(...o)),style:{cursor:"pointer"}},[a(_,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),p(" Back ")]),a(L,{class:"text-2xl font-weight-bold"},{default:t(()=>[p(" List Kredit ")]),_:1})]),_:1}),a(O,{modelValue:l.tab,"onUpdate:modelValue":e[2]||(e[2]=o=>l.tab=o),class:"v-tabs-pill","bg-color":"secondary"},{default:t(()=>[a(k,{value:"0"},{default:t(()=>[p("Semua")]),_:1}),a(k,{value:"1"},{default:t(()=>[p("Approved")]),_:1}),a(k,{value:"2"},{default:t(()=>[p("Pending")]),_:1}),a(k,{value:"3"},{default:t(()=>[p("Rejected")]),_:1})]),_:1},8,["modelValue"]),a(R,null,{default:t(()=>[a(z,{modelValue:l.tab,"onUpdate:modelValue":e[5]||(e[5]=o=>l.tab=o)},{default:t(()=>[(h(!0),T(S,null,J(l.phases,o=>(h(),g(G,{value:o.value},{default:t(()=>[a(A,{class:"d-flex justify-end pa-3"},{default:t(()=>[a(U,{color:"primary",size:"small",class:"my-3 mx-3",onClick:e[3]||(e[3]=d=>i.openModal(1))},{default:t(()=>[p(" Tambah Data ")]),_:1}),a(H),a(F,{"prepend-inner-icon":"mdi-magnify",density:"compact",label:"Search","single-line":"",flat:"","hide-details":"",variant:"solo-filled",modelValue:l.searchValue,"onUpdate:modelValue":e[4]||(e[4]=d=>l.searchValue=d)},null,8,["modelValue"])]),_:1}),a(b,{"show-index":"",headers:l.headers,items:l.items,"search-value":l.searchValue},{"empty-message":t(()=>[$]),loading:t(()=>[ee]),"item-plafon":t(d=>[p("Rp. "+V(i.formatInput(d.plafon))+",-",1)]),"item-isApproved":t(d=>[p(V(parseInt(d.isApproved)==1?"Approved":parseInt(d.isApproved)==2?"Pending":"Rejected"),1)]),"item-aoro":t(d=>[r("span",null,V(d.user.name),1)]),"item-created_at":t(d=>[r("span",null,V(i.formatDate(d.created_at))+" WIB",1)]),"item-operation":t(d=>[r("div",le,[r("div",ae,[a(x,{location:"top",text:"Detail Kredit"},{activator:t(({props:c})=>[r("button",w(c,{onClick:D=>i.toDetail(d)}),[a(_,{size:"20",icon:"bx-link-external",color:"blue"})],16,se)]),_:2},1024),a(x,{location:"top",text:"Hapus Kredit"},{activator:t(({props:c})=>[r("button",w(c,{onClick:D=>i.deleteFile(d)}),[a(_,{size:"20",icon:"bx-trash",color:"blue"})],16,te)]),_:2},1024),a(x,{location:"top",text:"Download Semua File Kredit"},{activator:t(({props:c})=>[r("button",w(c,{onClick:D=>i.downloadFile(d.id)}),[a(_,{size:"20",icon:"bx-download",color:"red"})],16,oe)]),_:2},1024)])])]),_:1},8,["headers","items","search-value"])]),_:2},1032,["value"]))),256))]),_:1},8,["modelValue"])]),_:1}),a(Y,{modelValue:l.insert,"onUpdate:modelValue":e[25]||(e[25]=o=>l.insert=o),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[a(j,null,{title:t(()=>[p(" Tambah Data ")]),text:t(()=>[a(W,{onSubmit:M(i.insertData,["prevent"])},{default:t(()=>[a(A,null,{default:t(()=>[a(u,{md:"12",cols:"12"},{default:t(()=>[re,ie,a(F,{class:"my-3",modelValue:l.dataForm.name,"onUpdate:modelValue":e[6]||(e[6]=o=>l.dataForm.name=o),autofocus:"",rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(u,{md:"12",cols:"12"},{default:t(()=>[ne,ue,a(F,{class:"my-3",modelValue:l.dataForm.plafon,"onUpdate:modelValue":e[7]||(e[7]=o=>l.dataForm.plafon=o),type:"text",onInput:i.formatInputPlafon},null,8,["modelValue","onInput"])]),_:1}),a(u,{md:"12",cols:"12"},{default:t(()=>[de,me,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[8]||(e[8]=o=>i.handleFileChange(o,"file1"))},null,8,["rules"])]),_:1}),a(u,{md:"12",cols:"12"},{default:t(()=>[pe,he,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[9]||(e[9]=o=>i.handleFileChange(o,"file4"))},null,8,["rules"])]),_:1}),a(u,{md:"12",cols:"12"},{default:t(()=>[fe,ce,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[10]||(e[10]=o=>i.handleFileChange(o,"file10"))},null,8,["rules"])]),_:1}),a(P,{thickness:5}),a(u,{cols:"12",md:"12"},{default:t(()=>[a(C,{modelValue:l.dataForm.hasFile2,"onUpdate:modelValue":e[11]||(e[11]=o=>l.dataForm.hasFile2=o),label:"Apakah pemohon sudah menikah?",onChange:e[12]||(e[12]=o=>(i.resetFile("file2"),i.resetFile("file5")))},null,8,["modelValue"])]),_:1}),a(P,{thickness:5}),l.dataForm.hasFile2?(h(),g(u,{key:0,md:"12",cols:"12"},{default:t(()=>[ge,Fe,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[13]||(e[13]=o=>i.handleFileChange(o,"file2"))},null,8,["rules"])]),_:1})):v("",!0),l.dataForm.hasFile2?(h(),g(u,{key:1,md:"12",cols:"12"},{default:t(()=>[be,ye,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[14]||(e[14]=o=>i.handleFileChange(o,"file5"))},null,8,["rules"])]),_:1})):v("",!0),a(u,{cols:"12",md:"12"},{default:t(()=>[a(C,{modelValue:l.dataForm.hasFile3,"onUpdate:modelValue":e[15]||(e[15]=o=>l.dataForm.hasFile3=o),label:"Apakah agunan bukan atas nama pemohon?",onChange:e[16]||(e[16]=o=>i.resetFile("file3"))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile3?(h(),g(u,{key:2,md:"12",cols:"12"},{default:t(()=>[_e,Ve,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[17]||(e[17]=o=>i.handleFileChange(o,"file3"))},null,8,["rules"])]),_:1})):v("",!0),a(P,{thickness:5}),a(u,{md:"12",cols:"12"},{default:t(()=>[ve,ke,a(F,{class:"my-3",modelValue:l.dataForm.type_bussiness,"onUpdate:modelValue":e[18]||(e[18]=o=>l.dataForm.type_bussiness=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(u,{md:"12",cols:"12"},{default:t(()=>[we,xe,a(F,{class:"my-3",modelValue:l.dataForm.desc_bussiness,"onUpdate:modelValue":e[19]||(e[19]=o=>l.dataForm.desc_bussiness=o),rules:[l.rules.required]},null,8,["modelValue","rules"])]),_:1}),a(u,null,{default:t(()=>[Pe,Ce]),_:1}),a(u,{cols:"12",md:"12"},{default:t(()=>[a(C,{modelValue:l.dataForm.hasFile7,"onUpdate:modelValue":e[20]||(e[20]=o=>l.dataForm.hasFile7=o),label:"Jenis Jaminan SHM ?",onChange:e[21]||(e[21]=o=>i.resetFile("file7"))},null,8,["modelValue"])]),_:1}),l.dataForm.hasFile7?(h(),g(u,{key:3,md:"12",cols:"12"},{default:t(()=>[De,Te,a(f,{class:"my-3",accept:"image/jpeg,image/png",placeholder:"Pick an image",rules:[l.rules.required],onChange:e[22]||(e[22]=o=>i.handleFileChange(o,"file7"))},null,8,["rules"])]),_:1})):v("",!0),a(u,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[a(U,{type:"submit",disabled:l.dataForm.hasFile2&&(l.dataForm.file2==null||l.dataForm.file5==null)||l.dataForm.hasFile3&&l.dataForm.file3==null||l.dataForm.hasFile7&&l.dataForm.file7==null||l.dataForm.hasFile8&&l.dataForm.file8==null||l.dataForm.hasFile9&&l.dataForm.file9==null||l.dataForm.file7==null&&l.dataForm.file8==null&&l.dataForm.file9==null||l.dataForm.type_bussiness==null&&l.dataForm.desc_bussiness==null},{default:t(()=>[p(" Simpan ")]),_:1},8,["disabled"]),r("button",{type:"button",class:"btn btn-blue",onClick:e[23]||(e[23]=o=>i.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:t(()=>[a(q,{modelValue:l.uploadProgress,"onUpdate:modelValue":e[24]||(e[24]=o=>l.uploadProgress=o),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})],64)}const Xe=K(Q,[["render",Se]]);export{Xe as default};

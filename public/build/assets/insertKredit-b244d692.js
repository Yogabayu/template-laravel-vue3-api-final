import{m as F}from"./axios-379d51f3.js";import{_ as P,o as r,i as m,w as i,a as n,f as _,d as x,V as d,c as k,h as u,e as K,b as a,a4 as N}from"./main-3ebc3217.js";import{V as I}from"./VDialog-4fa2f7c6.js";import{V as w}from"./VForm-bfb0b75a.js";import{V as v}from"./VRow-c63df600.js";import{V as g}from"./VSelect-6723feb3.js";import{V as f}from"./VTextField-918bacd5.js";import{V as h}from"./VFileInput-7f8d7d9f.js";import{V as y}from"./VCheckbox-d8bbcd5a.js";import{V as C,a as V}from"./VRadioGroup-df8b93d1.js";import{d as b}from"./VMenu-c515a909.js";import{V as j}from"./VCard-fc4c35e7.js";const U={name:"InsertModal",props:{modelValue:Boolean,orderList:{type:Array,required:!0},statusCreditList:{type:Array,required:!0},closeModal:{type:Function,required:!0},getAllFiles:{type:Function,required:!1}},inject:["loading"],emits:["update:modelValue","insert"],data(){return{statusNIK:!0,cekNIKLoading:!1,dataForm:{id:null,name:"",plafon:null,type:null,type_bussiness:null,desc_bussiness:null,nik_pemohon:null,nik_pasangan:null,name_pasangan:null,nik_jaminan:null,address:null,no_hp:null,order_source:null,status_kredit:null,file1:null,hasFile2:!1,file2:null,hasFile3:!1,file3:null,file4:null,file5:null,hasFile7:!1,file7:null,hasFile8:!1,file8:null,hasFile9:!1,file9:null,hasFile10:!1,file10:null,hasFile11:!1,file11:null,file12:null},uploadProgress:0,selectedPhoto:null,typeCreditList:[{value:1,title:"Reguler"},{value:2,title:"Restruktur"},{value:3,title:"Pensiunan"}]}},methods:{async cekNIK(){try{this.cekNIKLoading=!0;const l=this.dataForm.nik_pemohon,s=await F.get(`/user/cekNIK/${l}`);s.status===200?(console.log(s.data.data),s.data.data===0?(console.log(s.data),this.cekNIKLoading=!1,this.statusNIK=!0):(this.cekNIKLoading=!1,this.statusNIK=!1)):(this.cekNIKLoading=!1,this.statusNIK=!1)}catch(l){this.statusNIK=!1,this.loading.hide(),this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",l.response.data.message)}},async insertData(){try{this.loading.show();const l=new FormData;l.append("name",this.dataForm.name),l.append("nik_pemohon",this.dataForm.nik_pemohon),l.append("address",this.dataForm.address),l.append("type",this.dataForm.type),l.append("no_hp",this.dataForm.no_hp),l.append("order_source",this.dataForm.order_source),l.append("status_kredit",this.dataForm.status_kredit),l.append("plafon",this.dataForm.plafon.replace(/\D/g,"")),l.append("type_bussiness",this.dataForm.type_bussiness),l.append("desc_bussiness",this.dataForm.desc_bussiness),this.dataForm.file2!=null&&(l.append("nik_pasangan",this.dataForm.nik_pasangan),l.append("name_pasangan",this.dataForm.name_pasangan)),this.dataForm.file3!=null&&l.append("nik_jaminan",this.dataForm.nik_jaminan);for(let c=1;c<=12;c++){if(c===6)continue;let e="file"+c,o="noteFile"+c,t="hasFile"+c;this.dataForm.hasOwnProperty(t)&&this.dataForm[t]||this.dataForm[e]?this.dataForm[e]&&(l.append(e,this.dataForm[e]),l.append(o,this.dataForm[o])):this.dataForm[e]&&l.append(e,this.dataForm[e])}l.append("_method","POST");const s={onUploadProgress:c=>{try{this.uploadProgress=Math.round(c.loaded*100/c.total)}catch(e){console.error("Error calculating progress:",e)}},headers:{"Content-Type":"multipart/form-data"}},p=await F.post("/user/credit",l,s);p.status===200?(this.loading.hide(),this.closeModal(1),this.getAllFiles(),this.uploadProgress=null,this.$showToast("success","Success",p.data.message)):(this.loading.hide(),this.uploadProgress=null,this.getAllFiles(),this.$showToast("error","Sorry",p.data.message))}catch(l){this.loading.hide(),this.uploadProgress=null,this.closeModal(1),this.getAllFiles(),this.$showToast("error","Sorry",l.response.data.message)}},handleFileChange(l,s){const p=l.target.files[0];p&&["image/jpeg","image/png","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(p.type)?(this.dataForm[s]=p,s=="file1"?this.dataForm.noteFile1="KTP Pemohon":s=="file2"?this.dataForm.noteFile2="KTP Pasangan":s=="file3"?this.dataForm.noteFile3="KTP Atas Nama Jaminan":s=="file4"?this.dataForm.noteFile4="Kartu Keluarga":s=="file5"?this.dataForm.noteFile5="Buku Nikah":s=="file7"?this.dataForm.noteFile7="Jaminan SHM":s=="file8"?this.dataForm.noteFile8="Jaminan BPKB":s=="file9"?this.dataForm.noteFile9="Foto Detail Mesin":s=="file10"?this.dataForm.noteFile10="Foto Kunjungan":s=="file11"?this.dataForm.noteFile11="Foto WhatsApp":s=="file12"&&(this.dataForm.noteFile12="Form Permohonan SLIK")):(this.loading.hide(),this.$showToast("error","Error","Hanya file JPG, JPEG, PNG, dan PDF, WORD yang diizinkan."),l.target.value=null)},resetFile(l){this.dataForm[l]=null},formatInputIn(l){let s=l.target.value;s=s.replace(/\D/g,""),s=s.replace(/\B(?=(\d{3})+(?!\d))/g,","),l.target.value=s},formatNumber(l){return l?l.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}},computed:{rules(){return{required:l=>!!l||"Field ini harus diisi."}},formattedPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataForm.plafon)},set(l){this.dataForm.plafon=l.replace(/\D/g,"")}}}},q=a("span",{style:{color:"red"}},"*",-1),L=a("span",{class:"subtitle-1 text-center"},"Pilih Jenis Kredit: ",-1),T=a("span",{style:{color:"red"}},"*",-1),A=a("span",{class:"subtitle-1 text-center"},"Nama Pemohon: ",-1),S=a("span",{style:{color:"red"}},"*",-1),D=a("span",{class:"subtitle-1 text-center"},"Jumlah Plafon: ",-1),B=a("span",{style:{color:"red"}},"*",-1),M=a("span",{class:"subtitle-1 text-center"},"NIK Pemohon: ",-1),J={key:0,class:"subtitle-1 text-center",style:{color:"red"}},R={key:1,class:"subtitle-1 text-center",style:{color:"red"}},W=a("span",{style:{color:"red"}},"*",-1),G=a("span",{class:"subtitle-1 text-center"},"Alamat Pemohon: ",-1),E=a("span",{style:{color:"red"}},"*",-1),H=a("span",{class:"subtitle-1 text-center"},"No. HP Pemohon: ",-1),O=a("span",{style:{color:"red"}},"*",-1),z=a("span",{class:"subtitle-1 text-center"},"KTP Pemohon : ",-1),Q=a("span",{class:"subtitle-1 text-center"},"Nama Pasangan / Pendamping : ",-1),X=a("span",{class:"subtitle-1 text-center"},"NIK Pasangan / Pendamping : ",-1),Y=a("span",{class:"subtitle-1 text-center"},"KTP Pasangan / Pendamping Pemohon : ",-1),Z=a("span",{class:"subtitle-1 text-center"},"Buku Nikah:",-1),$=a("span",{style:{color:"red"}},"*",-1),ee=a("span",{class:"subtitle-1 text-center"},"Kartu Keluarga : ",-1),se=a("span",{style:{color:"red"}},"*",-1),te=a("span",{class:"subtitle-1 text-center"},"Pilih sumber order: ",-1),le=a("span",{style:{color:"red"}},"*",-1),ae=a("span",{class:"subtitle-1 text-center"},"Pilih status order: ",-1),oe=a("span",{style:{color:"red"}},"*",-1),ne=a("span",{class:"subtitle-1 text-center"},"Pilih Jenis Bukti Kunjungan : ",-1),ie=a("span",{style:{color:"red"}},"*",-1),re=a("span",{class:"subtitle-1 text-center"},"Foto Kunjungan :",-1),de=a("span",{style:{color:"red"}},"*",-1),ue=a("span",{class:"subtitle-1 text-center"},"Foto WhatsApp :",-1),me=a("span",{style:{color:"red"}},"*",-1),pe=a("span",{class:"subtitle-1 text-center"},"KTP atas nama Jaminan : ",-1),ce=a("span",{style:{color:"red"}},"*",-1),fe=a("span",{class:"subtitle-1 text-center"},"NIK Pemilik Jaminan: ",-1),he=a("span",{style:{color:"red"}},"*",-1),ge=a("span",{class:"subtitle-1 text-center"},"Jenis Usaha: ",-1),Fe=a("span",{style:{color:"red"}},"*",-1),_e=a("span",{class:"subtitle-1 text-center"},"Deskripsi Usaha: ",-1),ke=a("span",{style:{color:"red"}},"*",-1),ye=a("span",{class:"subtitle-1 text-center"},"Form Permohonan SLIK : ",-1);function Ve(l,s,p,c,e,o){return r(),m(I,{"model-value":p.modelValue,"onUpdate:modelValue":s[28]||(s[28]=t=>l.$emit("update:modelValue",t)),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:i(()=>[n(j,null,{title:i(()=>[_("Tambah Data")]),text:i(()=>[n(w,{onSubmit:x(o.insertData,["prevent"])},{default:i(()=>[n(v,null,{default:i(()=>[n(d,{md:"12",cols:"12"},{default:i(()=>[q,L,n(g,{items:e.typeCreditList,autofocus:"",modelValue:e.dataForm.type,"onUpdate:modelValue":s[0]||(s[0]=t=>e.dataForm.type=t),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),n(d,{md:"12",cols:"12"},{default:i(()=>[T,A,n(f,{class:"my-3",modelValue:e.dataForm.name,"onUpdate:modelValue":s[1]||(s[1]=t=>e.dataForm.name=t),rules:[o.rules.required]},null,8,["modelValue","rules"])]),_:1}),n(d,{md:"12",cols:"12"},{default:i(()=>[S,D,n(f,{class:"my-3",modelValue:o.formattedPlafon,"onUpdate:modelValue":s[2]||(s[2]=t=>o.formattedPlafon=t),type:"text",onInput:o.formatInputIn},null,8,["modelValue","onInput"])]),_:1}),n(d,{md:"12",cols:"12"},{default:i(()=>[B,M,n(f,{class:"my-3",modelValue:e.dataForm.nik_pemohon,"onUpdate:modelValue":s[3]||(s[3]=t=>e.dataForm.nik_pemohon=t),type:"number",rules:[o.rules.required]},null,8,["modelValue","rules"]),!e.statusNIK&&!e.cekNIKLoading&&e.dataForm.nik_pemohon?(r(),k("span",J,"NIK Sudah pernah di lakukan pengecekan SLIK dalam kurun waktu kurang dari 6 bulan, silahkan kontak tim Kredit analis ")):u("",!0),e.cekNIKLoading?(r(),k("span",R," Sistem melakukan pengecekan NIK ...... ")):u("",!0)]),_:1}),e.statusNIK?(r(),m(d,{key:0,md:"12",cols:"12"},{default:i(()=>[W,G,n(f,{class:"my-3",modelValue:e.dataForm.address,"onUpdate:modelValue":s[4]||(s[4]=t=>e.dataForm.address=t),rules:[o.rules.required]},null,8,["modelValue","rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:1,md:"12",cols:"12"},{default:i(()=>[E,H,n(f,{class:"my-3",modelValue:e.dataForm.no_hp,"onUpdate:modelValue":s[5]||(s[5]=t=>e.dataForm.no_hp=t),rules:[o.rules.required]},null,8,["modelValue","rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:2,md:"12",cols:"12"},{default:i(()=>[O,z,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[6]||(s[6]=t=>o.handleFileChange(t,"file1"))},null,8,["rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:3,md:"12",cols:"12"},{default:i(()=>[Q,n(f,{class:"my-3",type:"text",modelValue:e.dataForm.name_pasangan,"onUpdate:modelValue":s[7]||(s[7]=t=>e.dataForm.name_pasangan=t)},null,8,["modelValue"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:4,md:"12",cols:"12"},{default:i(()=>[X,n(f,{class:"my-3",type:"number",modelValue:e.dataForm.nik_pasangan,"onUpdate:modelValue":s[8]||(s[8]=t=>e.dataForm.nik_pasangan=t)},null,8,["modelValue"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:5,md:"12",cols:"12"},{default:i(()=>[Y,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[9]||(s[9]=t=>o.handleFileChange(t,"file2"))},null,8,["rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:6,cols:"12",md:"12"},{default:i(()=>[n(y,{modelValue:e.dataForm.hasFile2,"onUpdate:modelValue":s[10]||(s[10]=t=>e.dataForm.hasFile2=t),label:"Apakah pemohon sudah menikah?",onChange:s[11]||(s[11]=t=>o.resetFile("file5"))},null,8,["modelValue"])]),_:1})):u("",!0),e.dataForm.hasFile2&&e.statusNIK?(r(),m(d,{key:7,md:"12",cols:"12"},{default:i(()=>[Z,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[12]||(s[12]=t=>{o.handleFileChange(t,"file5"),o.resetFile("file7"),o.resetFile("file8")})},null,8,["rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:8,md:"12",cols:"12"},{default:i(()=>[$,ee,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[13]||(s[13]=t=>o.handleFileChange(t,"file4"))},null,8,["rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:9,md:"12",cols:"12"},{default:i(()=>[se,te,n(g,{items:p.orderList,autofocus:"",modelValue:e.dataForm.order_source,"onUpdate:modelValue":s[14]||(s[14]=t=>e.dataForm.order_source=t),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:10,md:"12",cols:"12"},{default:i(()=>[le,ae,n(g,{items:p.statusCreditList,autofocus:"",modelValue:e.dataForm.status_kredit,"onUpdate:modelValue":s[15]||(s[15]=t=>e.dataForm.status_kredit=t),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:11,md:"12",cols:"12"},{default:i(()=>[oe,ne,n(C,{modelValue:e.selectedPhoto,"onUpdate:modelValue":s[16]||(s[16]=t=>e.selectedPhoto=t),mandatory:!0,row:""},{default:i(()=>[n(V,{label:"Foto Kunjungan",value:"fotoKunjungan"}),n(V,{label:"Foto WhatsApp",value:"fotoWhatsApp"})]),_:1},8,["modelValue"])]),_:1})):u("",!0),e.selectedPhoto==="fotoKunjungan"&&e.statusNIK?(r(),m(d,{key:12,md:"12",cols:"12"},{default:i(()=>[ie,re,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[17]||(s[17]=t=>{o.handleFileChange(t,"file10"),o.resetFile("file11")})},null,8,["rules"])]),_:1})):u("",!0),e.selectedPhoto==="fotoWhatsApp"&&e.statusNIK?(r(),m(d,{key:13,md:"12",cols:"12"},{default:i(()=>[de,ue,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[18]||(s[18]=t=>{o.handleFileChange(t,"file11"),o.resetFile("file10")})},null,8,["rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(b,{key:14,thickness:5})):u("",!0),e.statusNIK?(r(),m(d,{key:15,cols:"12",md:"12"},{default:i(()=>[n(y,{modelValue:e.dataForm.hasFile3,"onUpdate:modelValue":s[19]||(s[19]=t=>e.dataForm.hasFile3=t),label:"Apakah agunan bukan atas nama pemohon?",onChange:s[20]||(s[20]=t=>(o.resetFile("file3"),e.dataForm.nik_jaminan=null))},null,8,["modelValue"])]),_:1})):u("",!0),e.dataForm.hasFile3&&e.statusNIK?(r(),m(d,{key:16,md:"12",cols:"12"},{default:i(()=>[me,pe,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[21]||(s[21]=t=>o.handleFileChange(t,"file3"))},null,8,["rules"])]),_:1})):u("",!0),e.dataForm.hasFile3&&e.statusNIK?(r(),m(d,{key:17,md:"12",cols:"12"},{default:i(()=>[ce,fe,n(f,{class:"my-3",type:"number",modelValue:e.dataForm.nik_jaminan,"onUpdate:modelValue":s[22]||(s[22]=t=>e.dataForm.nik_jaminan=t),rules:[o.rules.required]},null,8,["modelValue","rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(b,{key:18,thickness:5})):u("",!0),e.statusNIK?(r(),m(d,{key:19,md:"12",cols:"12"},{default:i(()=>[he,ge,n(f,{class:"my-3",modelValue:e.dataForm.type_bussiness,"onUpdate:modelValue":s[23]||(s[23]=t=>e.dataForm.type_bussiness=t),rules:[o.rules.required]},null,8,["modelValue","rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:20,md:"12",cols:"12"},{default:i(()=>[Fe,_e,n(f,{class:"my-3",modelValue:e.dataForm.desc_bussiness,"onUpdate:modelValue":s[24]||(s[24]=t=>e.dataForm.desc_bussiness=t),rules:[o.rules.required]},null,8,["modelValue","rules"])]),_:1})):u("",!0),e.statusNIK?(r(),m(d,{key:21,md:"12",cols:"12"},{default:i(()=>[ke,ye,n(h,{class:"my-3",accept:"image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",placeholder:"Pick an image",rules:[o.rules.required],onChange:s[25]||(s[25]=t=>o.handleFileChange(t,"file12"))},null,8,["rules"])]),_:1})):u("",!0),n(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:i(()=>[n(K,{type:"submit",disabled:e.dataForm.name==null||e.dataForm.plafon==null||e.dataForm.type_bussiness==null||e.dataForm.desc_bussiness==null||e.dataForm.order_source==null||e.dataForm.status_kredit==null||e.dataForm.file1==null||e.dataForm.file4==null||e.dataForm.file10==null&&e.dataForm.file11==null||e.dataForm.file12==null},{default:i(()=>[_(" Simpan ")]),_:1},8,["disabled"]),a("button",{type:"button",class:"btn btn-blue",onClick:s[26]||(s[26]=t=>p.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),actions:i(()=>[n(N,{modelValue:e.uploadProgress,"onUpdate:modelValue":s[27]||(s[27]=t=>e.uploadProgress=t),color:"amber",height:"25"},null,8,["modelValue"])]),_:1})]),_:1},8,["model-value"])}const Le=P(U,[["render",Ve]]);export{Le as I};

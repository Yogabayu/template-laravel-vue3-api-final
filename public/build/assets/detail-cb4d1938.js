import{m as D}from"./VGrid-bc82002c.js";import{r as T,o as k,c as K,a as l,w as t,b as i,G as N,E as B,i as c,e as b,V as A,t as r,M as f,d as y,h as S,f as U}from"./main-1510af4a.js";import{_ as O}from"./_plugin-vue_export-helper-c27b6911.js";import{V as Y}from"./VOverlay-6a173b06.js";import{V as v,d,a as F,e as g,c as w}from"./VRow-e65ce29b.js";import{V as h}from"./VTooltip-0c0527b2.js";import{V as M}from"./VDialog-7a40b249.js";import{V as C,a as V}from"./VTextField-7c474d53.js";import{V as P}from"./VAutocomplete-d50dd154.js";import{V as u}from"./VSelect-851410c2.js";import"./VImg-8f311b38.js";import"./index-5b1dd9ba.js";import"./dialog-transition-3a7bc416.js";import"./VInput-d4f2f5c1.js";import"./VMenu-d7fd7db4.js";import"./VDivider-272b0910.js";import"./VCheckboxBtn-28ae77bc.js";import"./VChip-aafad41a.js";const H={computed:{formattedMinPlafon:{get(){return this.formatNumber(this.dataFormIn.minPlafon)},set(o){this.dataFormIn.minPlafon=o.replace(/\D/g,"")}},formattedMaxPlafon:{get(){return this.formatNumber(this.dataFormIn.maxPlafon)},set(o){this.dataFormIn.maxPlafon=o.replace(/\D/g,"")}}},data(){return{overlay:!1,rules:{required:o=>!!o||"Required"},dataFormIn:{id:null,office_id:null,position_id:null,phase:null,minPlafon:"",maxPlafon:"",canAppeal:0,canApprove:0,notification:0,canInsertData:0,canUpdateData:0,canDeleteData:0,isSecret:0},officeId:this.$route.params.officeId,insert:!1,edit:!1,copy:!1,dataForm:{officeId:null,phase:null},offices:[],positions:[],phase1Items:[],phase1Headers:[{text:"Jabatan",value:"position.name",sortable:!0},{text:"Min. Plafon",value:"minPlafon",sortable:!0},{text:"Max. Plafon",value:"maxPlafon",sortable:!0},{text:"Input Banding?",value:"canAppeal",sortable:!0},{text:"Approve?",value:"canApprove",sortable:!0},{text:"Notifikasi?",value:"notification",sortable:!0},{text:"Tambah Data?",value:"canInsertData",sortable:!0},{text:"Edit Data?",value:"canUpdateData",sortable:!0},{text:"Hapus Data?",value:"canDeleteData",sortable:!0},{text:"Operation",value:"operation",width:100}],phase2Items:[],phase2Headers:[{text:"Jabatan",value:"position.name",sortable:!0},{text:"Min. Plafon",value:"minPlafon",sortable:!0},{text:"Max. Plafon",value:"maxPlafon",sortable:!0},{text:"Input Banding?",value:"canAppeal",sortable:!0},{text:"Approve?",value:"canApprove",sortable:!0},{text:"Notifikasi?",value:"notification",sortable:!0},{text:"Akses Data Sensitif? (SLIK, dll)",value:"isSecret",sortable:!0},{text:"Tambah Data?",value:"canInsertData",sortable:!0},{text:"Edit Data?",value:"canUpdateData",sortable:!0},{text:"Hapus Data?",value:"canDeleteData",sortable:!0},{text:"Operation",value:"operation",width:100}],phase3Items:[],phase3Headers:[{text:"Jabatan",value:"position.name",sortable:!0},{text:"Min. Plafon",value:"minPlafon",sortable:!0},{text:"Max. Plafon",value:"maxPlafon",sortable:!0},{text:"Input Dokumen Penunjang?",value:"canAppeal",sortable:!0},{text:"Approve?",value:"canApprove",sortable:!0},{text:"Notifikasi",value:"notification",sortable:!0},{text:"Akses Data Sensitif? (SLIK, dll)",value:"isSecret",sortable:!0},{text:"Tambah Data?",value:"canInsertData",sortable:!0},{text:"Edit Data?",value:"canUpdateData",sortable:!0},{text:"Hapus Data?",value:"canDeleteData",sortable:!0},{text:"Operation",value:"operation",width:100}],phase4Items:[],phase4Headers:[{text:"Jabatan",value:"position.name",sortable:!0},{text:"Min. Plafon",value:"minPlafon",sortable:!0},{text:"Max. Plafon",value:"maxPlafon",sortable:!0},{text:"Input Banding?",value:"canAppeal",sortable:!0},{text:"Approve?",value:"canApprove",sortable:!0},{text:"Notifikasi",value:"notification",sortable:!0},{text:"Akses Data Sensitif? (SLIK, dll)",value:"isSecret",sortable:!0},{text:"Tambah Data?",value:"canInsertData",sortable:!0},{text:"Edit Data?",value:"canUpdateData",sortable:!0},{text:"Hapus Data?",value:"canDeleteData",sortable:!0},{text:"Operation",value:"operation",width:100}],phase5Items:[],phase5Headers:[{text:"Jabatan",value:"position.name",sortable:!0},{text:"Min. Plafon",value:"minPlafon",sortable:!0},{text:"Max. Plafon",value:"maxPlafon",sortable:!0},{text:"Input Banding?",value:"canAppeal",sortable:!0},{text:"Approve?",value:"canApprove",sortable:!0},{text:"Notifikasi",value:"notification",sortable:!0},{text:"Akses Data Sensitif? (SLIK, dll)",value:"isSecret",sortable:!0},{text:"Tambah Data?",value:"canInsertData",sortable:!0},{text:"Edit Data?",value:"canUpdateData",sortable:!0},{text:"Hapus Data?",value:"canDeleteData",sortable:!0},{text:"Operation",value:"operation",width:100}]}},methods:{formatInputIn(o){let a=o.target.value;a=a.replace(/\D/g,""),a=a.replace(/\B(?=(\d{3})+(?!\d))/g,","),o.target.value=a},formatNumber(o){return o?o.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},async deleteNotifConf(o){try{if(!window.confirm("Apakah Anda yakin ingin menghapus data?"))return;const m=await D.delete(`/notifconf/${o.id}`);m.status===200?(this.getAll(),this.$showToast("success","Berhasill",m.data.message)):(this.getAll(),this.$showToast("error","Sorry",m.data.message))}catch(a){this.getAll(),this.$showToast("error","Sorry",a.response.data.message)}},async insertData(){try{for(let m in this.dataForm)m!=="id"&&this.dataFormIn[m]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${m} harus diisi.`));const o=new FormData;o.append("office_id",this.dataFormIn.office_id),o.append("position_id",this.dataFormIn.position_id),o.append("phase",this.dataFormIn.phase),o.append("canAppeal",this.dataFormIn.canAppeal),o.append("canApprove",this.dataFormIn.canApprove),o.append("notification",this.dataFormIn.notification),o.append("canInsertData",this.dataFormIn.canInsertData),o.append("canUpdateData",this.dataFormIn.canUpdateData),o.append("canDeleteData",this.dataFormIn.canDeleteData),this.dataFormIn.phase>=2?o.append("isSecret",this.dataFormIn.isSecret):o.append("isSecret","0"),o.append("minPlafon",this.dataFormIn.minPlafon.replace(/\D/g,"")),o.append("maxPlafon",this.dataFormIn.maxPlafon.replace(/\D/g,"")),o.append("_method","POST");const a=await D.post("/notifconf",o);a.status===200?(this.closeModal(1),this.getAll(),this.$showToast("success","Success",a.data.message)):(this.closeModal(1),this.getAll(),this.$showToast("error","Sorry",a.data.message))}catch(o){this.closeModal(1),this.getAll(),this.$showToast("error","Sorry",o.response.data.message)}},async copyData(){try{for(let m in this.dataForm)m!=="id"&&this.dataFormIn[m]===null&&(this.closeModal(1),this.$showToast("error","Sorry",`Properti ${m} harus diisi.`));const o=new FormData;o.append("office_id",this.dataFormIn.office_id),o.append("position_id",this.dataFormIn.position_id),o.append("phase",this.dataFormIn.phase),o.append("canAppeal",this.dataFormIn.canAppeal),o.append("canApprove",this.dataFormIn.canApprove),o.append("notification",this.dataFormIn.notification),o.append("canInsertData",this.dataFormIn.canInsertData),o.append("canUpdateData",this.dataFormIn.canUpdateData),o.append("canDeleteData",this.dataFormIn.canDeleteData),this.dataFormIn.phase>=2?o.append("isSecret",this.dataFormIn.isSecret):o.append("isSecret","0"),o.append("minPlafon",this.dataFormIn.minPlafon.replace(/\D/g,"")),o.append("maxPlafon",this.dataFormIn.maxPlafon.replace(/\D/g,"")),o.append("_method","POST");const a=await D.post("/notifconf",o);a.status===200?(this.closeModal(3),this.getAll(),this.$showToast("success","Success",a.data.message)):(this.closeModal(3),this.getAll(),this.$showToast("error","Sorry",a.data.message))}catch(o){this.closeModal(3),this.getAll(),this.$showToast("error","Sorry",o.response.data.message)}},async updateData(){try{const o=new FormData;o.append("office_id",this.dataFormIn.office_id),o.append("position_id",this.dataFormIn.position_id),o.append("phase",this.dataFormIn.phase),o.append("canAppeal",this.dataFormIn.canAppeal),o.append("canApprove",this.dataFormIn.canApprove),o.append("notification",this.dataFormIn.notification),o.append("canInsertData",this.dataFormIn.canInsertData),o.append("canUpdateData",this.dataFormIn.canUpdateData),o.append("canDeleteData",this.dataFormIn.canDeleteData),this.dataFormIn.phase>=2?o.append("isSecret",this.dataFormIn.isSecret):o.append("isSecret","0"),o.append("minPlafon",this.dataFormIn.minPlafon.replace(/\D/g,"")),o.append("maxPlafon",this.dataFormIn.maxPlafon.replace(/\D/g,"")),o.append("_method","PUT");const a=await D.post(`/notifconf/${this.dataFormIn.id}`,o);a.status===200?(this.closeModal(2),this.getAll(),this.$showToast("success","Success",a.data.message)):(this.closeModal(2),this.getAll(),this.$showToast("error","Sorry",a.data.message))}catch(o){this.closeModal(2),this.getAll(),this.$showToast("error","Sorry",o.response.data.message)}},closeModal(o){o===1?(this.resetForm(),this.insert=!1):o===2?(this.resetForm(),this.edit=!1):o===3&&(this.resetForm(),this.copy=!1)},resetForm(){this.dataFormIn={id:null,office_id:null,position_id:null,phase:null,minPlafon:null,maxPlafon:null,canApprove:null,notification:null}},openModal(o,a=null){o===1?(this.getOffices(),this.getPositions(),this.dataFormIn.office_id=this.officeId,this.insert=!0):o===2?a&&(this.getOffices(),this.getPositions(),this.dataFormIn.id=a.id,this.dataFormIn.office_id=a.office_id,this.dataFormIn.position_id=a.position_id,this.dataFormIn.phase=a.phase,this.dataFormIn.minPlafon=a.minPlafon,this.dataFormIn.maxPlafon=a.maxPlafon,this.dataFormIn.canAppeal=parseInt(a.canAppeal),this.dataFormIn.canApprove=parseInt(a.canApprove),this.dataFormIn.notification=parseInt(a.notification),this.dataFormIn.isSecret=parseInt(a.isSecret),this.dataFormIn.canInsertData=parseInt(a.canInsertData),this.dataFormIn.canUpdateData=parseInt(a.canUpdateData),this.dataFormIn.canDeleteData=parseInt(a.canDeleteData),this.edit=!0):o===3&&a&&(this.getOffices(),this.getPositions(),this.dataFormIn.id=a.id,this.dataFormIn.office_id=a.office_id,this.dataFormIn.position_id=a.position_id,this.dataFormIn.phase=a.phase,this.dataFormIn.minPlafon=a.minPlafon,this.dataFormIn.maxPlafon=a.maxPlafon,this.dataFormIn.canAppeal=parseInt(a.canAppeal),this.dataFormIn.canApprove=parseInt(a.canApprove),this.dataFormIn.notification=parseInt(a.notification),this.dataFormIn.isSecret=parseInt(a.isSecret),this.dataFormIn.canInsertData=parseInt(a.canInsertData),this.dataFormIn.canUpdateData=parseInt(a.canUpdateData),this.dataFormIn.canDeleteData=parseInt(a.canDeleteData),this.copy=!0)},goBack(){this.$router.go(-1)},formatInput(o){let a=o;return a=a.replace(/\D/g,""),a=a.replace(/\B(?=(\d{3})+(?!\d))/g,","),a},async getNotifConf(o,a){try{this.overlay=!0;const m=new FormData;m.append("officeId",o),m.append("phase",a),m.append("_method","POST");const x=await D.post("/detailnotifconf",m);x.status===200?a===1?(this.phase1Items=x.data.data,this.overlay=!1):a==2?this.phase2Items=x.data.data:a==3?this.phase3Items=x.data.data:a==4?this.phase4Items=x.data.data:a==5&&(this.phase5Items=x.data.data):(this.$showToast("error","Sorry","error get data positions"),this.overlay=!1)}catch{this.$showToast("error","Sorry","error get data positions"),this.overlay=!1}},async getOffices(){try{const o=await D.get("/office");o.status===200?this.offices=o.data.data.map(a=>({value:a.id,title:a.code+" - "+a.name})):this.$showToast("error","Sorry","error get data office")}catch{this.$showToast("error","Sorry","error get data office")}},async getPositions(){try{const o=await D.get("/position");o.status===200?this.positions=o.data.data.map(a=>({value:a.id,title:`${a.name} - ${a.offices.map(m=>m.name).join(", ")}`})):this.$showToast("error","Sorry","error get data positions")}catch{this.$showToast("error","Sorry","error get data positions")}},async getAll(){this.getNotifConf(this.officeId,1),this.getNotifConf(this.officeId,2),this.getNotifConf(this.officeId,3),this.getNotifConf(this.officeId,4),this.getNotifConf(this.officeId,5)}},mounted(){this.getAll()}},z=i("br",null,null,-1),E=i("span",{class:"font-weight-bold text-lg"},"Loading....",-1),L={class:"d-flex justify-space-between mb-6"},J=i("p",null,"Data Kosong",-1),j=i("p",null,"loading data .....",-1),R={class:"operation-wrapper flex space-x-4"},q=["onClick"],G=["onClick"],Q=["onClick"],W=i("p",null,"Data Kosong",-1),X=i("p",null,"loading data .....",-1),Z={class:"operation-wrapper flex space-x-4"},$=["onClick"],ee=["onClick"],ae=["onClick"],te=i("p",null,"Data Kosong",-1),le=i("p",null,"loading data .....",-1),oe={class:"operation-wrapper flex space-x-4"},ne=["onClick"],ie=["onClick"],se=["onClick"],re=i("p",null,"Data Kosong",-1),de=i("p",null,"loading data .....",-1),pe={class:"operation-wrapper flex space-x-4"},ue=["onClick"],me=["onClick"],ce=["onClick"],fe=i("p",null,"Data Kosong",-1),he=i("p",null,"loading data .....",-1),Ie={class:"operation-wrapper flex space-x-4"},be=["onClick"],ve=["onClick"],xe=["onClick"];function De(o,a,m,x,n,s){const _=T("EasyDataTable");return k(),K(N,null,[l(Y,{absolute:!0,modelValue:n.overlay,"onUpdate:modelValue":a[0]||(a[0]=e=>n.overlay=e),contained:"",persistent:"",class:"align-center justify-center"},{default:t(()=>[l(d,null,{default:t(()=>[l(B,{color:"primary",size:"32",indeterminate:""}),z,E]),_:1})]),_:1},8,["modelValue"]),i("div",null,[l(v,{class:"auth-card pa-4 pt-5"},{default:t(()=>[l(F,{class:"align-left"},{default:t(()=>[i("span",{color:"primary",onClick:a[1]||(a[1]=(...e)=>s.goBack&&s.goBack(...e)),style:{cursor:"pointer"}},[l(c,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),b(" Back ")]),l(g,{class:"text-2xl font-weight-bold"},{default:t(()=>[b(" Konfigurasi Fase Kredit ")]),_:1})]),_:1}),i("div",L,[l(A,{color:"primary",size:"small",class:"my-3 mx-3",onClick:a[2]||(a[2]=e=>s.openModal(1))},{default:t(()=>[b(" Tambah Data ")]),_:1})]),l(v,{class:"mx-2 my-5"},{default:t(()=>[l(F,{class:"align-left"},{default:t(()=>[l(g,{class:"text-2xl font-weight-bold"},{default:t(()=>[b(" Phase 1 (Pooling Order)")]),_:1})]),_:1}),l(_,{"show-index":"",headers:n.phase1Headers,items:n.phase1Items},{"empty-message":t(()=>[J]),loading:t(()=>[j]),"item-minPlafon":t(e=>[i("p",null,r(s.formatInput(e.minPlafon)),1)]),"item-maxPlafon":t(e=>[i("p",null,r(s.formatInput(e.maxPlafon)),1)]),"item-canAppeal":t(e=>[i("p",null,r(e.canAppeal==1?"✓":"x"),1)]),"item-canApprove":t(e=>[i("p",null,r(e.canApprove==1?"✓":"x"),1)]),"item-notification":t(e=>[i("p",null,r(e.notification==1?"✓":"x"),1)]),"item-canInsertData":t(e=>[i("p",null,r(e.canInsertData==1?"✓":"x"),1)]),"item-canUpdateData":t(e=>[i("p",null,r(e.canUpdateData==1?"✓":"x"),1)]),"item-canDeleteData":t(e=>[i("p",null,r(e.canDeleteData==1?"✓":"x"),1)]),"item-operation":t(e=>[i("div",R,[l(h,{location:"top",text:"Edit"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(2,e)}),[l(c,{size:"20",icon:"bx-edit",color:"info"})],16,q)]),_:2},1024),l(h,{location:"top",text:"Copy"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(3,e)}),[l(c,{size:"20",icon:"bx-copy",color:"warning"})],16,G)]),_:2},1024),l(h,{location:"top",text:"Delete"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.deleteNotifConf(e)}),[l(c,{size:"20",icon:"bx-trash",color:"danger"})],16,Q)]),_:2},1024)])]),_:1},8,["headers","items"])]),_:1}),l(v,{class:"mx-2 my-5"},{default:t(()=>[l(F,{class:"align-left"},{default:t(()=>[l(g,{class:"text-2xl font-weight-bold"},{default:t(()=>[b(" Phase 2 (SLIK) ")]),_:1})]),_:1}),l(_,{"show-index":"",headers:n.phase2Headers,items:n.phase2Items},{"empty-message":t(()=>[W]),loading:t(()=>[X]),"item-minPlafon":t(e=>[i("p",null,r(s.formatInput(e.minPlafon)),1)]),"item-maxPlafon":t(e=>[i("p",null,r(s.formatInput(e.maxPlafon)),1)]),"item-canApprove":t(e=>[i("p",null,r(e.canApprove==1?"✓":"x"),1)]),"item-notification":t(e=>[i("p",null,r(e.notification==1?"✓":"x"),1)]),"item-isSecret":t(e=>[i("p",null,r(e.isSecret==1?"✓":"x"),1)]),"item-canInsertData":t(e=>[i("p",null,r(e.canInsertData==1?"✓":"x"),1)]),"item-canUpdateData":t(e=>[i("p",null,r(e.canUpdateData==1?"✓":"x"),1)]),"item-canDeleteData":t(e=>[i("p",null,r(e.canDeleteData==1?"✓":"x"),1)]),"item-canAppeal":t(e=>[i("p",null,r(e.canAppeal==1?"✓":"x"),1)]),"item-operation":t(e=>[i("div",Z,[l(h,{location:"top",text:"Edit"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(2,e)}),[l(c,{size:"20",icon:"bx-edit",color:"info"})],16,$)]),_:2},1024),l(h,{location:"top",text:"Copy"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(3,e)}),[l(c,{size:"20",icon:"bx-copy",color:"warning"})],16,ee)]),_:2},1024),l(h,{location:"top",text:"Delete"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.deleteNotifConf(e)}),[l(c,{size:"20",icon:"bx-trash",color:"danger"})],16,ae)]),_:2},1024)])]),_:1},8,["headers","items"])]),_:1}),l(v,{class:"mx-2 my-2"},{default:t(()=>[l(F,{class:"align-left"},{default:t(()=>[l(g,{class:"text-2xl font-weight-bold"},{default:t(()=>[b(" Phase 3 (Survei) ")]),_:1})]),_:1}),l(_,{"show-index":"",headers:n.phase3Headers,items:n.phase3Items},{"empty-message":t(()=>[te]),loading:t(()=>[le]),"item-minPlafon":t(e=>[i("p",null,r(s.formatInput(e.minPlafon)),1)]),"item-maxPlafon":t(e=>[i("p",null,r(s.formatInput(e.maxPlafon)),1)]),"item-canAppeal":t(e=>[i("p",null,r(e.canAppeal==1?"✓":"x"),1)]),"item-canApprove":t(e=>[i("p",null,r(e.canApprove==1?"✓":"x"),1)]),"item-isSecret":t(e=>[i("p",null,r(e.isSecret==1?"✓":"x"),1)]),"item-notification":t(e=>[i("p",null,r(e.notification==1?"✓":"x"),1)]),"item-canInsertData":t(e=>[i("p",null,r(e.canInsertData==1?"✓":"x"),1)]),"item-canUpdateData":t(e=>[i("p",null,r(e.canUpdateData==1?"✓":"x"),1)]),"item-canDeleteData":t(e=>[i("p",null,r(e.canDeleteData==1?"✓":"x"),1)]),"item-operation":t(e=>[i("div",oe,[l(h,{location:"top",text:"Edit"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(2,e)}),[l(c,{size:"20",icon:"bx-edit",color:"info"})],16,ne)]),_:2},1024),l(h,{location:"top",text:"Copy"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(3,e)}),[l(c,{size:"20",icon:"bx-copy",color:"warning"})],16,ie)]),_:2},1024),l(h,{location:"top",text:"Delete"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.deleteNotifConf(e)}),[l(c,{size:"20",icon:"bx-trash",color:"danger"})],16,se)]),_:2},1024)])]),_:1},8,["headers","items"])]),_:1}),l(v,{class:"mx-2 my-2"},{default:t(()=>[l(F,{class:"align-left"},{default:t(()=>[l(g,{class:"text-2xl font-weight-bold"},{default:t(()=>[b(" Phase 4 (Komite) ")]),_:1})]),_:1}),l(_,{"show-index":"",headers:n.phase4Headers,items:n.phase4Items},{"empty-message":t(()=>[re]),loading:t(()=>[de]),"item-minPlafon":t(e=>[i("p",null,r(s.formatInput(e.minPlafon)),1)]),"item-maxPlafon":t(e=>[i("p",null,r(s.formatInput(e.maxPlafon)),1)]),"item-canAppeal":t(e=>[i("p",null,r(e.canAppeal==1?"✓":"x"),1)]),"item-canApprove":t(e=>[i("p",null,r(e.canApprove==1?"✓":"x"),1)]),"item-notification":t(e=>[i("p",null,r(e.notification==1?"✓":"x"),1)]),"item-isSecret":t(e=>[i("p",null,r(e.isSecret==1?"✓":"x"),1)]),"item-canInsertData":t(e=>[i("p",null,r(e.canInsertData==1?"✓":"x"),1)]),"item-canUpdateData":t(e=>[i("p",null,r(e.canUpdateData==1?"✓":"x"),1)]),"item-canDeleteData":t(e=>[i("p",null,r(e.canDeleteData==1?"✓":"x"),1)]),"item-operation":t(e=>[i("div",pe,[l(h,{location:"top",text:"Edit"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(2,e)}),[l(c,{size:"20",icon:"bx-edit",color:"info"})],16,ue)]),_:2},1024),l(h,{location:"top",text:"Copy"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(3,e)}),[l(c,{size:"20",icon:"bx-copy",color:"warning"})],16,me)]),_:2},1024),l(h,{location:"top",text:"Delete"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.deleteNotifConf(e)}),[l(c,{size:"20",icon:"bx-trash",color:"danger"})],16,ce)]),_:2},1024)])]),_:1},8,["headers","items"])]),_:1}),l(v,{class:"mx-2 my-2"},{default:t(()=>[l(F,{class:"align-left"},{default:t(()=>[l(g,{class:"text-2xl font-weight-bold"},{default:t(()=>[b(" Phase Operation ")]),_:1})]),_:1}),l(_,{"show-index":"",headers:n.phase5Headers,items:n.phase5Items},{"empty-message":t(()=>[fe]),loading:t(()=>[he]),"item-minPlafon":t(e=>[i("p",null,r(s.formatInput(e.minPlafon)),1)]),"item-maxPlafon":t(e=>[i("p",null,r(s.formatInput(e.maxPlafon)),1)]),"item-canAppeal":t(e=>[i("p",null,r(e.canAppeal==1?"✓":"x"),1)]),"item-canApprove":t(e=>[i("p",null,r(e.canApprove==1?"✓":"x"),1)]),"item-notification":t(e=>[i("p",null,r(e.notification==1?"✓":"x"),1)]),"item-isSecret":t(e=>[i("p",null,r(e.isSecret==1?"✓":"x"),1)]),"item-canInsertData":t(e=>[i("p",null,r(e.canInsertData==1?"✓":"x"),1)]),"item-canUpdateData":t(e=>[i("p",null,r(e.canUpdateData==1?"✓":"x"),1)]),"item-canDeleteData":t(e=>[i("p",null,r(e.canDeleteData==1?"✓":"x"),1)]),"item-operation":t(e=>[i("div",Ie,[l(h,{location:"top",text:"Edit"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(2,e)}),[l(c,{size:"20",icon:"bx-edit",color:"info"})],16,be)]),_:2},1024),l(h,{location:"top",text:"Copy"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.openModal(3,e)}),[l(c,{size:"20",icon:"bx-copy",color:"warning"})],16,ve)]),_:2},1024),l(h,{location:"top",text:"Delete"},{activator:t(({props:p})=>[i("button",f(p,{onClick:I=>s.deleteNotifConf(e)}),[l(c,{size:"20",icon:"bx-trash",color:"danger"})],16,xe)]),_:2},1024)])]),_:1},8,["headers","items"])]),_:1}),l(M,{modelValue:n.insert,"onUpdate:modelValue":a[16]||(a[16]=e=>n.insert=e),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[l(v,null,{title:t(()=>[b(" Tambah Data ")]),text:t(()=>[l(C,{onSubmit:y(s.insertData,["prevent"])},{default:t(()=>[l(w,null,{default:t(()=>[l(d,{cols:"12",md:"12"},{default:t(()=>[l(P,{modelValue:n.dataFormIn.office_id,"onUpdate:modelValue":a[3]||(a[3]=e=>n.dataFormIn.office_id=e),items:n.offices,hint:"Pilih Kantor",label:"Kantor",clearable:"","persistent-hint":"",disabled:"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),l(d,{cols:"12",md:"12"},{default:t(()=>[l(P,{modelValue:n.dataFormIn.position_id,"onUpdate:modelValue":a[4]||(a[4]=e=>n.dataFormIn.position_id=e),items:n.positions,hint:"Pilih Jabatan",label:"Jabatan - Jangkauan Kantor",clearable:"",autofocus:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Pilih Phase",items:[{value:1,title:"Phase 1 (Pooling Order)"},{value:2,title:"Phase 2 (SLIK)"},{value:3,title:"Phase 3 (Survey)"},{value:4,title:"Phase 4 (Komite)"},{value:5,title:"Phase 5 (Operation)"}],modelValue:n.dataFormIn.phase,"onUpdate:modelValue":a[5]||(a[5]=e=>n.dataFormIn.phase=e),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(d,{md:"6",cols:"12"},{default:t(()=>[l(V,{label:"Minimal Plafon",modelValue:s.formattedMinPlafon,"onUpdate:modelValue":a[6]||(a[6]=e=>s.formattedMinPlafon=e),type:"text",onInput:s.formatInputIn,"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),l(d,{md:"6",cols:"12"},{default:t(()=>[l(V,{label:"Maximal Plafon",modelValue:s.formattedMaxPlafon,"onUpdate:modelValue":a[7]||(a[7]=e=>s.formattedMaxPlafon=e),type:"text",onInput:s.formatInputIn,hint:"Masukkan 1.000.000.000 untuk maksimal, jika ingin tanpa batas",autofocus:"","prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Input Banding?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canAppeal,"onUpdate:modelValue":a[8]||(a[8]=e=>n.dataFormIn.canAppeal=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Approve?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canApprove,"onUpdate:modelValue":a[9]||(a[9]=e=>n.dataFormIn.canApprove=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Notifikasi?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.notification,"onUpdate:modelValue":a[10]||(a[10]=e=>n.dataFormIn.notification=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Tambah Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canInsertData,"onUpdate:modelValue":a[11]||(a[11]=e=>n.dataFormIn.canInsertData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Edit Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canUpdateData,"onUpdate:modelValue":a[12]||(a[12]=e=>n.dataFormIn.canUpdateData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Hapus Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canDeleteData,"onUpdate:modelValue":a[13]||(a[13]=e=>n.dataFormIn.canDeleteData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),n.dataFormIn.phase>=2?(k(),S(d,{key:0,md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Akses Data Sensitif? (SLIK, dll)",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.isSecret,"onUpdate:modelValue":a[14]||(a[14]=e=>n.dataFormIn.isSecret=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1})):U("",!0),l(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[l(A,{type:"submit"},{default:t(()=>[b("Simpan")]),_:1}),i("button",{type:"button",class:"btn btn-blue",onClick:a[15]||(a[15]=e=>s.closeModal(1))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),l(M,{modelValue:n.edit,"onUpdate:modelValue":a[30]||(a[30]=e=>n.edit=e),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[l(v,null,{title:t(()=>[b(" Update Data ")]),text:t(()=>[l(C,{onSubmit:y(s.updateData,["prevent"])},{default:t(()=>[l(w,null,{default:t(()=>[l(d,{cols:"12",md:"12"},{default:t(()=>[l(P,{modelValue:n.dataFormIn.office_id,"onUpdate:modelValue":a[17]||(a[17]=e=>n.dataFormIn.office_id=e),items:n.offices,hint:"Pilih Kantor",label:"Kantor",clearable:"","persistent-hint":"",disabled:"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),l(d,{cols:"12",md:"12"},{default:t(()=>[l(P,{modelValue:n.dataFormIn.position_id,"onUpdate:modelValue":a[18]||(a[18]=e=>n.dataFormIn.position_id=e),items:n.positions,hint:"Pilih Jabatan",label:"Jabatan",clearable:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Pilih Phase",items:[{value:1,title:"Phase 1 (Pooling Order)"},{value:2,title:"Phase 2 (SLIK)"},{value:3,title:"Phase 3 (Survey)"},{value:4,title:"Phase 4 (Komite)"},{value:5,title:"Phase 5 (Operation)"}],modelValue:n.dataFormIn.phase,"onUpdate:modelValue":a[19]||(a[19]=e=>n.dataFormIn.phase=e),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(d,{md:"6",cols:"12"},{default:t(()=>[l(V,{label:"Minimal Plafon",modelValue:s.formattedMinPlafon,"onUpdate:modelValue":a[20]||(a[20]=e=>s.formattedMinPlafon=e),type:"text",onInput:s.formatInputIn,"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),l(d,{md:"6",cols:"12"},{default:t(()=>[l(V,{label:"Maximal Plafon",modelValue:s.formattedMaxPlafon,"onUpdate:modelValue":a[21]||(a[21]=e=>s.formattedMaxPlafon=e),type:"text",onInput:s.formatInputIn,hint:"Masukkan 1.000.000.000 untuk maksimal, jika ingin tanpa batas",autofocus:"","prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Input Banding?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canAppeal,"onUpdate:modelValue":a[22]||(a[22]=e=>n.dataFormIn.canAppeal=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Approve?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canApprove,"onUpdate:modelValue":a[23]||(a[23]=e=>n.dataFormIn.canApprove=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Notifikasi?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.notification,"onUpdate:modelValue":a[24]||(a[24]=e=>n.dataFormIn.notification=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Tambah Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canInsertData,"onUpdate:modelValue":a[25]||(a[25]=e=>n.dataFormIn.canInsertData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Edit Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canUpdateData,"onUpdate:modelValue":a[26]||(a[26]=e=>n.dataFormIn.canUpdateData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Hapus Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canDeleteData,"onUpdate:modelValue":a[27]||(a[27]=e=>n.dataFormIn.canDeleteData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),n.dataFormIn.phase>=2?(k(),S(d,{key:0,md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Akses Data Sensitif? (SLIK, dll)",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.isSecret,"onUpdate:modelValue":a[28]||(a[28]=e=>n.dataFormIn.isSecret=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1})):U("",!0),l(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[l(A,{type:"submit"},{default:t(()=>[b("Simpan")]),_:1}),i("button",{type:"button",class:"btn btn-blue",onClick:a[29]||(a[29]=e=>s.closeModal(2))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),l(M,{modelValue:n.copy,"onUpdate:modelValue":a[44]||(a[44]=e=>n.copy=e),width:"auto",persistent:"",transition:"dialog-top-transition"},{default:t(()=>[l(v,null,{title:t(()=>[b(" Copy Data ")]),text:t(()=>[l(C,{onSubmit:y(s.copyData,["prevent"])},{default:t(()=>[l(w,null,{default:t(()=>[l(d,{cols:"12",md:"12"},{default:t(()=>[l(P,{modelValue:n.dataFormIn.office_id,"onUpdate:modelValue":a[31]||(a[31]=e=>n.dataFormIn.office_id=e),items:n.offices,hint:"Pilih Kantor",label:"Kantor",clearable:"","persistent-hint":"",disabled:"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),l(d,{cols:"12",md:"12"},{default:t(()=>[l(P,{modelValue:n.dataFormIn.position_id,"onUpdate:modelValue":a[32]||(a[32]=e=>n.dataFormIn.position_id=e),items:n.positions,hint:"Pilih Jabatan",label:"Jabatan",clearable:"","persistent-hint":"","prepend-icon":"mdi-divide"},null,8,["modelValue","items"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Pilih Phase",items:[{value:1,title:"Phase 1 (Pooling Order)"},{value:2,title:"Phase 2 (SLIK)"},{value:3,title:"Phase 3 (Survey)"},{value:4,title:"Phase 4 (Komite)"},{value:5,title:"Phase 5 (Operation)"}],modelValue:n.dataFormIn.phase,"onUpdate:modelValue":a[33]||(a[33]=e=>n.dataFormIn.phase=e),"prepend-icon":"mdi-help-rhombus"},null,8,["items","modelValue"])]),_:1}),l(d,{md:"6",cols:"12"},{default:t(()=>[l(V,{label:"Minimal Plafon",modelValue:s.formattedMinPlafon,"onUpdate:modelValue":a[34]||(a[34]=e=>s.formattedMinPlafon=e),type:"text",onInput:s.formatInputIn,"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),l(d,{md:"6",cols:"12"},{default:t(()=>[l(V,{label:"Maximal Plafon",modelValue:s.formattedMaxPlafon,"onUpdate:modelValue":a[35]||(a[35]=e=>s.formattedMaxPlafon=e),type:"text",onInput:s.formatInputIn,hint:"Masukkan 1.000.000.000 untuk maksimal, jika ingin tanpa batas",autofocus:"","prepend-icon":"mdi-help-rhombus"},null,8,["modelValue","onInput"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Input Banding?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canAppeal,"onUpdate:modelValue":a[36]||(a[36]=e=>n.dataFormIn.canAppeal=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Approve?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canApprove,"onUpdate:modelValue":a[37]||(a[37]=e=>n.dataFormIn.canApprove=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Notifikasi?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.notification,"onUpdate:modelValue":a[38]||(a[38]=e=>n.dataFormIn.notification=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Tambah Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canInsertData,"onUpdate:modelValue":a[39]||(a[39]=e=>n.dataFormIn.canInsertData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Edit Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canUpdateData,"onUpdate:modelValue":a[40]||(a[40]=e=>n.dataFormIn.canUpdateData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),l(d,{md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Hapus Data?",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.canDeleteData,"onUpdate:modelValue":a[41]||(a[41]=e=>n.dataFormIn.canDeleteData=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1}),n.dataFormIn.phase>=2?(k(),S(d,{key:0,md:"12",cols:"12"},{default:t(()=>[l(u,{label:"Akses Data Sensitif? (SLIK, dll)",items:[{value:1,title:"Ya"},{value:0,title:"Tidak"}],modelValue:n.dataFormIn.isSecret,"onUpdate:modelValue":a[42]||(a[42]=e=>n.dataFormIn.isSecret=e),"prepend-icon":"mdi-help-rhombus"},null,8,["modelValue"])]),_:1})):U("",!0),l(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[l(A,{type:"submit"},{default:t(()=>[b("Simpan")]),_:1}),i("button",{type:"button",class:"btn btn-blue",onClick:a[43]||(a[43]=e=>s.closeModal(3))}," Batal ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])],64)}const Ye=O(H,[["render",De]]);export{Ye as default};

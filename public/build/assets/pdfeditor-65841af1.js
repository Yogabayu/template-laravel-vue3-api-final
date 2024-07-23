import{_ as W,a7 as L,o as V,c as k,a as s,w as n,N as E,H,F as U,f as h,b as m,j as B,V as A,e as R,h as N,I as O,J as M}from"./main-759cb87b.js";import{m as C}from"./axios-379d51f3.js";import{i as Y,P as z}from"./PDFButton-36f8f26a.js";import{V as X,a as G,c as J,b as q}from"./VCard-52223027.js";import{V as K}from"./VRow-7c3bab50.js";import{V as Q}from"./VFileInput-6bc0e2b3.js";import"./VAvatar-a86fd93f.js";import"./VImg-257b2f41.js";import"./VInput-e8b396b8.js";import"./index-b36c4722.js";import"./forwardRefs-8348545e.js";import"./VChip-28e03063.js";const Z={name:"PdfViewer",data(){return{overlay:!1,signature:null,pdf:null,interactable:null,filePath:this.$filePath,detailAttach:null}},methods:{goBack(){this.$router.go(-1)},async renderPDF(a){const t=await L(()=>import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.mjs"),[]);if(t.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs",!!a)try{const e=await fetch(a);if(!e.ok)throw new Error(`Failed to fetch PDF: ${e.statusText}`);const r=await e.arrayBuffer(),i=await t.getDocument(r).promise,o=this.$refs.pdfContainer;o.innerHTML="";const w=(await i.getPage(1)).getViewport({scale:1}),y=o.clientWidth/w.width;for(let p=1;p<=i.numPages;p++){const _=await i.getPage(p),d=_.getViewport({scale:y}),c=document.createElement("canvas"),P=c.getContext("2d");c.height=d.height,c.width=d.width;const b={canvasContext:P,viewport:d};await _.render(b).promise,o.appendChild(c)}}catch(e){console.error("Error rendering PDF:",e)}},handleFileUpload(a){const t=a.target.files[0];t&&(this.signature=URL.createObjectURL(t))},initSignaturePosition(){const a=this.$refs.signatureImage;this.interactable=Y(a).draggable({onmove:this.dragMoveListener}).resizable({edges:{left:!0,right:!0,bottom:!0,top:!0},listeners:{move(t){let{x:e,y:r}=t.target.dataset;e=(parseFloat(e)||0)+t.deltaRect.left,r=(parseFloat(r)||0)+t.deltaRect.top,Object.assign(t.target.style,{width:`${t.rect.width}px`,height:`${t.rect.height}px`,transform:`translate(${e}px, ${r}px)`}),t.target.dataset.x=e,t.target.dataset.y=r}}})},dragMoveListener(a){const t=a.target,e=(parseFloat(t.getAttribute("data-x"))||0)+a.dx,r=(parseFloat(t.getAttribute("data-y"))||0)+a.dy;t.style.transform=`translate(${e}px, ${r}px)`,t.setAttribute("data-x",e),t.setAttribute("data-y",r)},async getPdfArrayBuffer(a){const t=await fetch(a);if(!t.ok)throw new Error(`Failed to fetch PDF: ${t.statusText}`);return await t.arrayBuffer()},async savePDF(){if(!this.signature){alert("Upload tanda tangan terlebih dahulu");return}const a=this.$refs.signatureImage,t=parseFloat(a.getAttribute("data-x"))||0,e=parseFloat(a.getAttribute("data-y"))||0,r=a.width,l=a.height,i=await this.getPdfArrayBuffer(this.filePath+"/"+this.detailAttach.file_id+"/"+this.detailAttach.path),o=await z.load(i),v=await this.getPdfArrayBuffer(this.signature),w=await o.embedPng(v),y=this.$refs.pdfContainer.clientWidth,d=(await o.getPage(0)).getWidth()/y,c=t*d,P=e*d,b=r*d,T=l*d;let u=null,x=P;const D=o.getPages();for(const f of D){const g=f.getHeight();if(x<=g){u=f;break}x-=g}if(!u){alert("Error, Tanda tangan di tempatkan di luar halaman terakhir");return}let I=u.getHeight()-x-T;u.drawImage(w,{x:c,y:I,width:b,height:T});const S=await o.save(),j=new Blob([S],{type:"application/pdf"});try{this.overlay=!0;const f=this.$route.params.idAttach,g=new FormData;g.append("doc",new File([j],this.detailAttach.path,{type:"application/pdf"})),g.append("_method","PUT");const F=await C.post(`/user/signature/${f}`,g);F.status===200?(this.overlay=!1,this.$showToast("success","Success",F.data.message),this.goBack()):(this.overlay=!1,this.$showToast("error","Sorry",F.data.data.message))}catch{this.overlay=!1,window.location.reload(),this.$showToast("error","Error","Failed to update the signed document")}},async getDetailAttach(){try{this.overlay=!0;const a=this.$route.params.idAttach,t=await C.get(`/user/get-attach/${a}`);t.status==200?(this.detailAttach=t.data.data,await this.renderPDF(this.filePath+"/"+this.detailAttach.file_id+"/"+this.detailAttach.path),this.overlay=!1):(this.$showToast("error","Sorry",t.data.data.message),this.overlay=!1)}catch(a){this.$showToast("error","Sorry",a.response.data.message),this.overlay=!1}}},async mounted(){await this.getDetailAttach()}},tt=a=>(O("data-v-0aae3bdd"),a=a(),M(),a),at=tt(()=>m("span",{class:"subtitle-1 text-center"},[m("span",{style:{color:"red"}},"*"),h(" File Tanda Tangan (format png): ")],-1)),et={class:"pdf-viewer",ref:"pdfContainer"},st=["src"];function rt(a,t,e,r,l,i){return V(),k(H,null,[s(E,{"model-value":l.overlay,class:"align-center justify-center"},{default:n(()=>[s(U,{color:"blue-lighten-3",indeterminate:"",size:41,width:5}),h(" Loading... ")]),_:1},8,["model-value"]),s(X,null,{default:n(()=>[s(G,{class:"align-left"},{default:n(()=>[m("span",{color:"primary",onClick:t[0]||(t[0]=(...o)=>i.goBack&&i.goBack(...o)),style:{cursor:"pointer"}},[s(B,{icon:"bx-arrow-back",color:"primary",tag:"back",start:""}),h(" Back ")]),s(J,{class:"text-2xl font-weight-bold"},{default:n(()=>[h(" Tanda Tangan ")]),_:1})]),_:1}),s(q,null,{default:n(()=>[s(K,{class:"mt-4 mb-4"},{default:n(()=>[s(A,{md:"12",cols:"6"},{default:n(()=>[at,s(Q,{label:"Upload Tanda Tangan",accept:"image/png","prepend-icon":"mdi-image",outlined:"",dense:"",onChange:i.handleFileUpload},null,8,["onChange"])]),_:1}),s(A,{md:"12",cols:"6",class:"d-flex justify-end"},{default:n(()=>[s(R,{color:"primary",onClick:i.savePDF},{default:n(()=>[s(B,{left:""},{default:n(()=>[h("mdi-file-pdf-box")]),_:1}),h(" Simpan PDF dengan Tanda Tangan ")]),_:1},8,["onClick"])]),_:1})]),_:1}),m("div",et,[l.signature?(V(),k("img",{key:0,ref:"signatureImage",src:l.signature,class:"signature",onLoad:t[1]||(t[1]=(...o)=>i.initSignaturePosition&&i.initSignaturePosition(...o))},null,40,st)):N("",!0)],512)]),_:1})]),_:1})],64)}const wt=W(Z,[["render",rt],["__scopeId","data-v-0aae3bdd"]]);export{wt as default};

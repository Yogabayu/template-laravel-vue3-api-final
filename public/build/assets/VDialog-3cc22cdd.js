import{P,bl as y,S as D,W as S,bm as h,p as x,Y as B,z as f,l as w,O as v,Z as F,B as I,N as m,a as g,a0 as O,b9 as R}from"./main-ad349705.js";import{f as T}from"./forwardRefs-8348545e.js";import{V as N}from"./dialog-transition-524420d3.js";const z=P({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...y({origin:"center center",scrollStrategy:"block",transition:{component:N},zIndex:2400})},"VDialog"),W=D()({name:"VDialog",props:z(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=S(a,"modelValue"),{scopeId:V}=h(),o=x();function i(l){var r,s;const e=l.relatedTarget,t=l.target;if(e!==t&&((r=o.value)!=null&&r.contentEl)&&((s=o.value)!=null&&s.globalTop)&&![document,o.value.contentEl].includes(t)&&!o.value.contentEl.contains(t)){const u=R(o.value.contentEl);if(!u.length)return;const d=u[0],E=u[u.length-1];e===d?E.focus():d.focus()}}B&&f(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),f(n,async l=>{var e,t;await I(),l?(e=o.value.contentEl)==null||e.focus({preventScroll:!0}):(t=o.value.activatorEl)==null||t.focus({preventScroll:!0})});const b=w(()=>v({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return F(()=>{const l=m.filterProps(a);return g(m,v({ref:o,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:b.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return g(O,{root:"VDialog"},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...t)]}})}})}),T({},o)}});export{W as V,z as m};

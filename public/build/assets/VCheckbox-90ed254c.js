import{m as g,V as a}from"./VCheckboxBtn-28ae77bc.js";import{m as A,b as F,V as l}from"./VInput-d4f2f5c1.js";import{N as I,R as B,S as R,W as U,b6 as M,k as N,Z as $,aT as D,a as u,M as r}from"./main-1510af4a.js";const S=I({...A(),...B(g(),["inline"])},"VCheckbox"),j=R()({name:"VCheckbox",inheritAttrs:!1,props:S(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,c){let{attrs:d,slots:t}=c;const s=U(e,"modelValue"),{isFocused:n,focus:i,blur:m}=F(e),V=M(),b=N(()=>e.id||`checkbox-${V}`);return $(()=>{const[p,k]=D(d),f=l.filterProps(e),v=a.filterProps(e);return u(l,r({class:["v-checkbox",e.class]},p,f,{modelValue:s.value,"onUpdate:modelValue":o=>s.value=o,id:b.value,focused:n.value,style:e.style}),{...t,default:o=>{let{id:x,messagesId:h,isDisabled:P,isReadonly:C}=o;return u(a,r(v,{id:x.value,"aria-describedby":h.value,disabled:P.value,readonly:C.value},k,{modelValue:s.value,"onUpdate:modelValue":y=>s.value=y,onFocus:i,onBlur:m}),t)}})}),{}}});export{j as V};

import{P as p,a8 as v,W as b,p as F,a1 as V,a as h}from"./main-e13e01ef.js";import{g as y,h as P}from"./VInput-50502c2b.js";import{f as R}from"./forwardRefs-8348545e.js";const k=p({...v(),...y()},"VForm"),S=b()({name:"VForm",props:k(),emits:{"update:modelValue":o=>!0,submit:o=>!0},setup(o,f){let{slots:n,emit:i}=f;const r=P(o),s=F();function l(t){t.preventDefault(),r.reset()}function u(t){const a=t,e=r.validate();a.then=e.then.bind(e),a.catch=e.catch.bind(e),a.finally=e.finally.bind(e),i("submit",a),a.defaultPrevented||e.then(c=>{var m;let{valid:d}=c;d&&((m=s.value)==null||m.submit())}),a.preventDefault()}return V(()=>{var t;return h("form",{ref:s,class:["v-form",o.class],style:o.style,novalidate:!0,onReset:l,onSubmit:u},[(t=n.default)==null?void 0:t.call(n,r)])}),R(r,s)}});export{S as V};

import{W as c,bJ as y,bL as V,a8 as o,A as f,P as k,ar as P,aF as C,ac as S,aG as h,a9 as z,ad as A,aH as b,aj as x,a$ as B,b0 as F,ai as I,bB as R,a1 as T,a as u,j,b1 as D}from"./main-759cb87b.js";import{V as _}from"./VImg-257b2f41.js";function J(a){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",e=arguments.length>2?arguments[2]:void 0;return c()({name:e??y(V(a.replace(/__/g,"-"))),props:{tag:{type:String,default:l},...o()},setup(t,r){let{slots:s}=r;return()=>{var n;return f(t.tag,{class:[a,t.class],style:t.style},(n=s.default)==null?void 0:n.call(s))}}})}const $=k({start:Boolean,end:Boolean,icon:P,image:String,text:String,...o(),...C(),...S(),...h(),...z(),...A(),...b({variant:"flat"})},"VAvatar"),L=c()({name:"VAvatar",props:$(),setup(a,l){let{slots:e}=l;const{themeClasses:t}=x(a),{colorClasses:r,colorStyles:s,variantClasses:n}=B(a),{densityClasses:m}=F(a),{roundedClasses:v}=I(a),{sizeClasses:d,sizeStyles:g}=R(a);return T(()=>u(a.tag,{class:["v-avatar",{"v-avatar--start":a.start,"v-avatar--end":a.end},t.value,r.value,m.value,v.value,d.value,n.value,a.class],style:[s.value,g.value,a.style]},{default:()=>{var i;return[a.image?u(_,{key:"image",src:a.image,alt:"",cover:!0},null):a.icon?u(j,{key:"icon",icon:a.icon},null):((i=e.default)==null?void 0:i.call(e))??a.text,D(!1,"v-avatar")]}})),{}}});export{L as V,J as c};

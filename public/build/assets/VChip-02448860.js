import{L as D,bc as H,a3 as L,a9 as J,a8 as E,aa as R,aD as T,Q as z,aE as F,ai as U,aj as W,ad as r,X as ee,a as l,aq as C,b8 as B,a2 as ae,a4 as le,a5 as te,aY as ne,a6 as se,b9 as ie,aS as ce,aZ as de,R as oe,ab as ue,aF as re,ae as ve,af as fe,ag as pe,bh as me,T as ke,a_ as he,ba as ye,k as b,au as G,aV as Ce,aI as be,i as v,Z as f,av as Ve,G as _,K as Ie}from"./main-50364cd1.js";import{e as ge,V as x}from"./index-7fea880e.js";const $=Symbol.for("vuetify:v-chip-group"),Pe=D({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:H},...L(),...J({selectedClass:"v-chip--selected"}),...E(),...R(),...T({variant:"tonal"})},"VChipGroup"),Ge=z()({name:"VChipGroup",props:Pe(),emits:{"update:modelValue":e=>!0},setup(e,p){let{slots:c}=p;const{themeClasses:o}=F(e),{isSelected:t,select:m,next:k,prev:h,selected:y}=U(e,$);return W({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ee(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:m,next:k,prev:h,selected:y.value})]}})),{}}}),Se=D({activeClass:String,appendAvatar:String,appendIcon:C,closable:Boolean,closeIcon:{type:C,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:C,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:B(),onClickOnce:B(),...ae(),...L(),...le(),...te(),...ne(),...se(),...ie(),...ce(),...E({tag:"span"}),...R(),...T({variant:"tonal"})},"VChip"),_e=z()({name:"VChip",directives:{Ripple:de},props:Se(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,p){let{attrs:c,emit:o,slots:t}=p;const{t:m}=oe(),{borderClasses:k}=ue(e),{colorClasses:h,colorStyles:y,variantClasses:u}=re(e),{densityClasses:w}=ve(e),{elevationClasses:K}=fe(e),{roundedClasses:M}=pe(e),{sizeClasses:O}=me(e),{themeClasses:j}=F(e),V=ke(e,"modelValue"),a=he(e,$,!1),s=ye(e,c),q=b(()=>e.link!==!1&&s.isLink.value),i=b(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),X=b(()=>({"aria-label":m(e.closeLabel),onClick(n){n.stopPropagation(),V.value=!1,o("click:close",n)}}));function I(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function Z(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),I(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),N=!!(d||t.append),Q=!!(t.close||e.closable),g=!!(t.filter||e.filter)&&a,P=!!(e.prependIcon||e.prependAvatar),Y=!!(P||t.prepend),S=!a||a.isSelected.value;return V.value&&G(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":g,"v-chip--pill":e.pill},j.value,k.value,S?h.value:void 0,w.value,K.value,M.value,O.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[S?y.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:I,onKeydown:i.value&&!q.value&&Z},{default:()=>{var A;return[be(i.value,"v-chip"),g&&l(ge,{key:"filter"},{default:()=>[G(l("div",{class:"v-chip__filter"},[t.filter?l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},t.filter):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[Ve,a.isSelected.value]])]}),Y&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!P,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(_,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(x,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),l("div",{class:"v-chip__content"},[((A=t.default)==null?void 0:A.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text]),N&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(_,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(x,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),Q&&l("div",Ie({key:"close",class:"v-chip__close"},X.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Ce("ripple"),i.value&&e.ripple,null]])}}});export{_e as V,Ge as a};

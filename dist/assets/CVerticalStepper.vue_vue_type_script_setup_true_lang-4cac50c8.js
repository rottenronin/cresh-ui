import{d as u,o as a,c as r,F as m,I as f,v as i,P as v,b as e,t as _}from"./index-e7347527.js";const x=["onClick"],b=e("div",{class:"step-dot-wrapper"},[e("div",{class:"step-line up"}),e("div",{class:"step-dot"}),e("div",{class:"step-line down"})],-1),k={class:"step-text"},C=u({__name:"CVerticalStepper",props:{steps:{type:Array,required:!0},selectable:{type:Boolean,required:!1,default:!0},selectedIndex:{type:Number,required:!1,default:0}},emits:["select"],setup(t,{emit:d}){const c=t;function o(p,s){c.selectable&&c.selectedIndex!==s&&d("select",s)}return(p,s)=>(a(),r("div",{class:i(["c-vertical-stepper",{selectable:t.selectable}])},[(a(!0),r(m,null,f(t.steps,(n,l)=>(a(),r("div",{key:`step-item-i${l}`,class:i(["step-item",{selected:l===t.selectedIndex}]),onClick:v(()=>o(n,l),["prevent","stop"])},[b,e("div",k,_(n.text),1)],10,x))),128))],2))}});export{C as _};

import{d as C,l as $,m as b,A as y,J as N,o as a,c as t,x,t as o,s as f,b as s,F as k,I as E,g as V,M as q,v as B,B as D,e as c,w as h,a as g}from"./index-50829d1b.js";const w={key:0,class:"labels"},M={key:0,class:"min"},L={key:1,class:"min"},A={key:2,class:"max"},F={key:3,class:"max"},I={class:"slider-bar-container"},T={key:0,id:"markers"},z=["value"],H=["min","max","disabled"],_=C({__name:"CSlider",props:{min:{type:Number,required:!0,default:0},max:{type:Number,required:!0,default:0},value:{type:Number,required:!0,default:0},isDisabled:{type:Boolean,required:!1,default:!1},markers:{type:Array,required:!1,default:null}},emits:["change-event"],setup(e,{emit:i}){const d=e,n=$(),r=b(()=>!!n.min),l=b(()=>!!n.max),u=y(d.value);N(()=>d.value,m=>{u.value=m});function S(){i("change-event",Number(u.value))}return(m,p)=>(a(),t("div",{class:B(["slider",{"is-disabled":e.isDisabled}])},[r.value||l.value?(a(),t("div",w,[r.value?(a(),t("div",M,[x(m.$slots,"min")])):(a(),t("div",L,o(e.min),1)),l.value?(a(),t("div",A,[x(m.$slots,"max")])):(a(),t("div",F,o(e.max),1))])):f("",!0),s("div",I,[e.markers?(a(),t("datalist",T,[(a(!0),t(k,null,E(e.markers,v=>(a(),t("option",{key:v,value:v},null,8,z))),128))])):f("",!0),V(s("input",{class:"slider-bar",type:"range",min:e.min,max:e.max,"onUpdate:modelValue":p[0]||(p[0]=v=>u.value=v),onInput:S,disabled:e.isDisabled,list:"markers"},null,40,H),[[q,u.value]])])],2))}}),J=s("h2",null,"Slider",-1),P=s("h3",null,"1. Slider component",-1),U=s("h3",null,"2. Slider disabled",-1),j=`
  <CSlider
    :min="6"
    :max="60"
    :value="55"
    @change-event="(value) => changeEvent = value"
  >
    <template #min>
      {{ $t('translate.slider.month') }}
    </template>

    <template #max>
      {{ $t('translate.slider.month') }}
    </template>
  </CSlider>`,G=`
  <CSlider
    :min="6"
    :max="60"
    :value="55"
    @change-event="(value) => changeEvent = value"
    :is-disabled="true"
  />
`,O=C({__name:"SliderPage",setup(e){const i=y(55);return(d,n)=>{const r=D("CCodeSnippet");return a(),t(k,null,[J,P,c(r,{snippet:j},{default:h(()=>[s("div",null,[c(_,{min:0,max:100,value:55,onChangeEvent:n[0]||(n[0]=l=>i.value=l),markers:[0,10,20,30,40,50,60,70,80,90,100]},{min:h(()=>[g(" 6 "+o(d.$t("translate.slider.month")),1)]),max:h(()=>[g(" 60 "+o(d.$t("translate.slider.month")),1)]),_:1}),s("span",null,"change event: "+o(i.value),1)])]),_:1}),U,c(r,{snippet:G},{default:h(()=>[s("div",null,[c(_,{min:6,max:60,value:55,onChangeEvent:n[1]||(n[1]=l=>i.value=l),"is-disabled":!0})])]),_:1})],64)}}});export{O as default};

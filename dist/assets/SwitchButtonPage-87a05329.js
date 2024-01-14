import{d as h,o as _,c as r,b as t,z as p,A as g,B as w,e as c,w as n,a as l,t as S,C as m,F as v}from"./index-e7347527.js";const C={class:"c-switch"},b=["checked"],k=t("span",{class:"switch"},null,-1),d=h({__name:"CSwitch",props:{checked:Boolean},emits:["switchState"],setup(a,{emit:s}){const i=e=>{const o=e.target;s("switchState",o.checked)};return(e,o)=>(_(),r("label",C,[t("input",p(e.$attrs,{class:"input",type:"checkbox",checked:a.checked,onChange:i}),null,16,b),k]))}}),f=t("h2",null," Switch button example ",-1),B={class:"switch-page"},x=t("h3",null,"Switch avec input",-1),$=t("div",null,"Ajouter les attributs:",-1),y=t("code",null,':checked="toggle" @switchState=" (state) => toggle = state"',-1),P=t("br",null,null,-1),A=t("div",null,"la variable `toggle` étant permutée par le bouton",-1),N=t("h3",null,"Switch disable",-1),V=t("code",null,':disabled="true"',-1),j=`
      <CSwitch
        :checked="toggle"
        @switchState="
        (state) => toggle = state"
      />
`,F=`
    <CSwitch :disabled="true" />
`,D=h({__name:"SwitchButtonPage",setup(a){const s=g(!0);return(i,e)=>{const o=w("CCodeSnippet");return _(),r(v,null,[f,c(o,{snippet:j},{title:n(()=>[x]),description:n(()=>[$,y,l(),P,A]),default:n(()=>[t("div",B,[c(d,{checked:s.value,onSwitchState:e[0]||(e[0]=u=>s.value=u)},null,8,["checked"]),t("div",null,[l("état du switch: "),t("strong",null,S(s.value),1)]),c(m,{onClick:e[1]||(e[1]=u=>s.value=!s.value)},{default:n(()=>[l("Permuter le switch")]),_:1})])]),_:1}),c(o,{snippet:F},{title:n(()=>[N]),description:n(()=>[l("Ajouter l'attribut: "),V]),default:n(()=>[c(d,{disabled:!0})]),_:1})],64)}}});export{D as default};

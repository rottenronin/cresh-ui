import{d as p,B as d,o as i,c as s,e,w as t,a0 as o,b as l}from"./index-50829d1b.js";const c={class:"document-item-page"},r=l("h3",null,"Utilisation basique",-1),_=l("h3",null,"Avec les actions ['view', 'download', 'upload', 'validate']",-1),m=l("h3",null,"Approved flag",-1),u=`
  <CDocumentItem
    label="Carte ID"
    link="http://via.placeholder.com/ID+CARD"
  />
`,n=`
  <CDocumentItem
    approved
    label="Carte ID"
    link="http://via.placeholder.com/ID+CARD"
    :actions="['download', 'read', 'upload', 'validate']"
  />
`,I=p({__name:"DocumentItemPage",setup(h){return(C,D)=>{const a=d("CCodeSnippet");return i(),s("div",c,[r,e(a,{snippet:u},{default:t(()=>[e(o,{label:"Carte ID",link:"http://via.placeholder.com/ID+CARD"})]),_:1}),_,e(a,{snippet:n},{default:t(()=>[e(o,{label:"Carte ID",link:"http://via.placeholder.com/ID+CARD",actions:["download","read","upload","validate"]})]),_:1}),m,e(a,{snippet:n},{default:t(()=>[e(o,{label:"Carte ID",link:"http://via.placeholder.com/ID+CARD",actions:["download","read","upload","validate"],approved:!0})]),_:1})])}}});export{I as default};

import{d as f,A as m,j as v,o as b,c as V,e as l,w as t,u as a,Y as o,a as r,t as w,b as p}from"./index-50829d1b.js";import{_ as i}from"./CSelect.vue_vue_type_script_setup_true_lang-d135e13c.js";import"./base-control-props-3c9ee147.js";const x={class:"select examples"},C=p("h2",null,"Basic usecase",-1),_=p("h2",null,"With :modelValue and @update:modelValue",-1),M=`
<CSelect
  :options="options1"
  v-model="selectModel1"
  :label="'Marque'"
  name="cselect1"
/>`,h=`
  <CSelect
    :name="'online'"
    :options="[{
      name: 'Frais partagé avec le client',
      value: 'feesEnabled'
    }, {
      name: 'Frais offerts au client',
      value: 'feesDisabled'
    }]"
    required
    :label="'En ligne'"
    :modelValue="bnplInstalments.web.x3.fees ? 'feesEnabled' : 'feesDisabled'"
    @update:modelValue="value => bnplInstalments.web.x3.fees = value === 'feesEnabled'"
    class="dropdown"
  />
`,y=`
  <CSelect
    :name="'civility'"
    :options="[{
      name: 'Mr',
      value: 'mr'
    }, {
      name: 'Ms',
      value: 'ms'
    }]"
    required
    :label="'Civilité'"
    class="dropdown"
    v-model="civility"
  />
`,E=`
  <CSelect
    :name="'civility'"
    :options="[{
      name: 'Mr',
      value: 'mr'
    }, {
      name: 'Ms',
      value: 'ms'
    }]"
    :placeholder="'selectionner mr/ms'"
    required
    :label="'Civilité'"
    class="dropdown"
    v-model="civility"
  />
`,U=f({__name:"SelectPage",setup(q){const c=[{value:"gucci",name:"Gucci"},{value:"channel",name:"Channel"},{value:"sephora",name:"Sephora"}],d=m("sephora"),n=m(),u=v({bnpl:{instalments:{web:{x3:{enabled:!1,fees:!1},x4:{enabled:!1,fees:!1}},store:{x3:{enabled:!1,fees:!1},x4:{enabled:!1,fees:!1}}}}}.bnpl.instalments);return(g,e)=>(b(),V("div",x,[C,l(a(o),{snippet:M},{default:t(()=>[l(a(i),{options:c,modelValue:d.value,"onUpdate:modelValue":e[0]||(e[0]=s=>d.value=s),label:"Marque",name:"cselect1"},null,8,["modelValue"])]),_:1}),_,l(a(o),{snippet:h},{default:t(()=>[l(a(i),{name:"online",options:[{name:"Frais partagé avec le client",value:"feesEnabled"},{name:"Frais offerts au client",value:"feesDisabled"}],required:"",label:"En ligne",modelValue:u.web.x3.fees?"feesEnabled":"feesDisabled","onUpdate:modelValue":e[1]||(e[1]=s=>u.web.x3.fees=s==="feesEnabled"),class:"dropdown"},null,8,["modelValue"])]),_:1}),l(a(o),{snippet:y},{default:t(()=>[l(a(i),{name:"civility",options:[{name:"Mr",value:"mr"},{name:"Ms",value:"ms"}],required:"",label:"Civilité",class:"dropdown",modelValue:n.value,"onUpdate:modelValue":e[2]||(e[2]=s=>n.value=s)},null,8,["modelValue"]),r(" selected civility: "+w(n.value),1)]),_:1}),l(a(o),{snippet:E},{default:t(()=>[l(a(i),{name:"civility",options:[{name:"Mr",value:"mr"},{name:"Ms",value:"ms"}],placeholder:"selectionner mr/ms",required:"",label:"Civilité",class:"dropdown",modelValue:n.value,"onUpdate:modelValue":e[3]||(e[3]=s=>n.value=s)},null,8,["modelValue"]),r(" with placeholder ")]),_:1})]))}});export{U as default};

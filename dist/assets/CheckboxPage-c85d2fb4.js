import{v as h,c as x,b as m}from"./index.esm-672ca56f.js";import{_ as d}from"./CCheckbox.vue_vue_type_script_setup_true_lang-319ce948.js";import{d as f,A as i,B as v,o as _,c as V,e as a,w as e,a as c,p as C,h as g,b as R,i as y}from"./index-e7347527.js";import"./CheckIcon.vue_vue_type_script_setup_true_lang-4e91ad57.js";import"./base-control-props-3c9ee147.js";const B=u=>(C("data-v-fa44378c"),u=u(),g(),u),w={class:"form-controls checkbox"},T=B(()=>R("div",{style:{color:"red"}}," Custom label ",-1)),U=`
    <c-checkbox
      name="checkboxTest"
      v-model="checked"
      :label="'checkbox test'"
    />
  `,I=`
    <c-checkbox
      name="checkboxTest"
      v-model="checked"
    >
      <template #label>
        <div style="color: red">
          Custom label
        </div>
      </template>
    </c-checkbox>
  `,M=`
    <c-checkbox
        :value="checkbox3Value"
        :rules="{ required: { allowFalse: false } }"
        @input="onCheckbox3Change"
        ref="checkbox3Ref"
      >
        checked obligatoire
    </c-checkbox>
  `,N=`
    <c-checkbox
        :value="checkbox4Value"
        @input="onCheckbox4Change"
        ref="checkbox4Ref"
        :disabled="true"
      >
        disabled checkbox
    </c-checkbox>
  `,P=`
  <c-checkbox
      :value="checkbox4Value"
      @input="onCheckbox4Change"
      ref="checkbox4Ref"
      no-uppercase
    >
      disable label uppercase
  </c-checkbox>
`,S=f({__name:"CheckboxPage",setup(u){const n=i(!1),t=i({value:!1,errorMessage:""});async function b(){const{errors:r}=await h({schema:x({value:m().oneOf([!0],"Field must be checked")}),fields:t});t.value.errorMessage=(r==null?void 0:r.value)||""}const p=i(!0),k=i();return(r,o)=>{const s=v("c-code-snippet");return _(),V("div",w,[a(s,{snippet:U},{title:e(()=>[c(" c-checkbox ")]),description:e(()=>[c(" Basic select ")]),default:e(()=>[a(d,{modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=l=>n.value=l),name:"checkboxTest",label:"checkbox test",class:"test"},null,8,["modelValue"])]),_:1}),a(s,{snippet:I},{title:e(()=>[c(" Label ")]),description:e(()=>[c(" c-checkbox avec label personnalisé ")]),default:e(()=>[a(d,{modelValue:n.value,"onUpdate:modelValue":o[1]||(o[1]=l=>n.value=l),name:"checkboxTest"},{default:e(()=>[T]),_:1},8,["modelValue"])]),_:1}),a(s,{snippet:M},{title:e(()=>[c(" Rule: required ")]),description:e(()=>[c(" c-checkbox avec rule ")]),default:e(()=>[a(d,{ref:k.value,modelValue:t.value.value,"onUpdate:modelValue":[o[2]||(o[2]=l=>t.value.value=l),b],name:"checkbox3Value","error-message":t.value.errorMessage},{default:e(()=>[c(" checked obligatoire ")]),_:1},8,["modelValue","error-message"])]),_:1}),a(s,{snippet:N},{title:e(()=>[c(" disabled ")]),description:e(()=>[c(" c-checkbox avec property disabled ")]),default:e(()=>[a(d,{ref:"checkbox4Ref",modelValue:p.value,"onUpdate:modelValue":o[3]||(o[3]=l=>p.value=l),name:"checkbox4Value",disabled:!0},{default:e(()=>[c(" disabled checkbox ")]),_:1},8,["modelValue"])]),_:1}),a(s,{snippet:P},{title:e(()=>[c(" no-uppercase ")]),description:e(()=>[c(" disable label uppercase ")]),default:e(()=>[a(d,{ref:"checkbox4Ref",modelValue:p.value,"onUpdate:modelValue":o[4]||(o[4]=l=>p.value=l),name:"checkbox4Value","no-uppercase":""},{default:e(()=>[c(" no uppercase label ")]),_:1},8,["modelValue"])]),_:1})])}}});const L=y(S,[["__scopeId","data-v-fa44378c"]]);export{L as default};

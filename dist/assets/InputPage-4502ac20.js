import{u as C,c as _,a as h}from"./index.esm-672ca56f.js";import{C as m}from"./CInput-d2664611.js";import{C as U}from"./CDatetimeInput-9760194c.js";import{d as w,A as u,B,o as g,c as x,b as i,e as l,w as e,a as s,t as d,s as D,_ as I}from"./index-e7347527.js";import"./base-control-props-3c9ee147.js";const S={class:"examples"},q=i("h2",null,"Exemples",-1),A={class:"inputs"},E={key:0,class:"custom-errors-bloc"},L=i("span",null," Chiffre d'affaires ",-1),$=i("span",{style:{"text-transform":"lowercase"}}," (en chiffres) ",-1),k=i("span",null," Label + prefix icon ",-1),P=i("span",{style:{"text-transform":"lowercase"}}," (en chiffres) ",-1),z=i("span",null," Label + suffix icon ",-1),H=i("span",{style:{"text-transform":"lowercase"}}," (en chiffres) ",-1),T=`
  <CInput
    v-model="model3.username"
    label="username"
    name="inputFieldName2"
    class="username"
    :autocomplete="'off'"
    :required="true"
    :error-message="errors && errors.username ? errors.username : ''"
    @blur="onModel3ValueChange"
  >
    <template
      #error="{ errorMessage }"
    >
      <div
        v-if="errorMessage"
        class="custom-errors-bloc"
      >
        custom errors message
      </div>
    </template>
  </CInput>
`,Y=`
  <CInput
    v-model="model5.firstname"
    label="first name"
    name="inputFieldName"
    class="first-name"
    :autocomplete="'off'"
    :error-message="errors && errors.firstname ? errors.firstname : ''"
    @blur="onModel5ValueChange"
  >
    <template
      #error="{ errorMessage }"
    >
      <div
        v-if="errorMessage"
        class="custom-errors-bloc"
      >
        custom error message : {{ errorMessage }}
      </div>
    </template>
  </CInput>
`,Q=w({__name:"InputPage",setup(Z){const v=u(""),b=u(""),p=u({username:""});u("");const f=u({firstname:""}),o=u(""),V=u(""),{validate:N}=C({fields:p,schema:_({username:h().required()})}),n=u();async function F(){const{errors:c}=await N();n.value=c}const{validate:y}=C({fields:f,schema:_({firstname:h().matches(/^[a-zA-ZÀ-ÿ-.']*$/)})});async function M(){const{errors:c}=await y();n.value=c,console.log("-- errors",n)}return(c,t)=>{const r=B("CCodeSnippet");return g(),x("div",S,[q,i("div",A,[l(r,{snippet:`
        <CInput
          name='c-input1'
          v-model='model1'
          class='custom-class'
          label='username'
        />
      `},{title:e(()=>[s(" c-input ")]),description:e(()=>[s(" Utilisation basique d'un input ")]),default:e(()=>[l(m,{modelValue:v.value,"onUpdate:modelValue":t[0]||(t[0]=a=>v.value=a),name:"c-input1",class:"custom-class",label:"username"},null,8,["modelValue"]),s(" model: "+d(v.value)+" ",1)]),_:1}),l(r,{snippet:`
        <CInput
          name='c-input2'
          v-model='model2'
          class='first-name'
          label='username'
          :autocomplete='off'
          bordered
        />
      `},{title:e(()=>[s(" boredered prop ")]),description:e(()=>[s(" boredered = true ")]),default:e(()=>[l(m,{modelValue:b.value,"onUpdate:modelValue":t[1]||(t[1]=a=>b.value=a),label:"first name",name:"inputFieldName",class:"first-name",autocomplete:"off",bordered:""},null,8,["modelValue"]),s(" model: "+d(b.value)+" ",1)]),_:1}),l(r,{snippet:T},{title:e(()=>[s(" validation schema ")]),description:e(()=>[s(" yup validation schema ")]),default:e(()=>[l(m,{modelValue:p.value.username,"onUpdate:modelValue":t[2]||(t[2]=a=>p.value.username=a),label:"username",name:"inputFieldName2",class:"username",autocomplete:"off",required:!0,"error-message":n.value&&n.value.username?n.value.username:"",onBlur:F},null,8,["modelValue","error-message"]),s(" model: "+d(p.value)+" ",1)]),_:1}),l(r,{snippet:Y},{title:e(()=>[s(" custom error message template ")]),description:e(()=>[s(" override default error message ")]),default:e(()=>[l(m,{modelValue:f.value.firstname,"onUpdate:modelValue":t[3]||(t[3]=a=>f.value.firstname=a),label:"first name",name:"inputFieldName",class:"first-name",autocomplete:"off","error-message":n.value&&n.value.firstname?n.value.firstname:"",onBlur:M},{error:e(({errorMessage:a})=>[a?(g(),x("div",E," custom error message : "+d(a),1)):D("",!0)]),_:1},8,["modelValue","error-message"]),s(" model: "+d(f.value)+" ",1)]),_:1}),l(r,{snippet:`
        <CInput
          v-model='model6'
          label='username'
          name='inputFieldName3'
          class='username'
          placeholder='test placeholder'
        />
      `},{title:e(()=>[s(" Placeholder ")]),default:e(()=>[l(m,{modelValue:o.value,"onUpdate:modelValue":t[4]||(t[4]=a=>o.value=a),label:"first name",name:"inputFieldName",class:"first-name",autocomplete:"off",placeholder:"test placeholder"},null,8,["modelValue"]),s(" model: "+d(o.value)+" ",1)]),_:1}),l(r,{snippet:`
        <CInput
          v-model='model7'
          label='username'
          name='inputFieldName3'
          class='username'
        />
      `},{title:e(()=>[s(" custom label ")]),default:e(()=>[l(m,{modelValue:o.value,"onUpdate:modelValue":t[5]||(t[5]=a=>o.value=a),label:"first name",name:"inputFieldName",class:"first-name",autocomplete:"off"},{label:e(()=>[L,$]),_:1},8,["modelValue"])]),_:1}),l(r,{snippet:`
        <CInput
          v-model='model6'
          label='first name'
          name='inputFieldName'
          class='first-name'
          :autocomplete='off'
        >
          <template #label>
            <span>
              Label + prefix icon
            </span>
            <span style='text-transform: lowercase;'>
              (en chiffres)
            </span>
          </template>
          <template #prefix>
            <CIcon name='shop' />
          </template>
        </CInput>
      `},{title:e(()=>[s(" Affichage personnalisé de label avec préfixe icon ")]),default:e(()=>[l(m,{modelValue:o.value,"onUpdate:modelValue":t[6]||(t[6]=a=>o.value=a),label:"first name",name:"inputFieldName",class:"first-name",autocomplete:"off"},{label:e(()=>[k,P]),prefix:e(()=>[l(I,{name:"shop"})]),_:1},8,["modelValue"])]),_:1}),l(r,{snippet:`
        <CInput
          v-model='model6'
          label='first name'
          name='inputFieldName'
          class='first-name'
          :autocomplete='off'
        >
          <template #label>
            <span>
              Label + suffix icon
            </span>
            <span style='text-transform: lowercase;'>
              (en chiffres)
            </span>
          </template>
          <template #prefix>
            <CIcon name='shop-circle' />
          </template>
        </CInput>
      `},{title:e(()=>[s(" Affichage personnalisé de label avec préfixe icon ")]),default:e(()=>[l(m,{modelValue:o.value,"onUpdate:modelValue":t[7]||(t[7]=a=>o.value=a),label:"first name",name:"inputFieldName",class:"first-name",autocomplete:"off"},{label:e(()=>[z,H]),suffix:e(()=>[l(I,{name:"shop-circle"})]),_:1},8,["modelValue"])]),_:1})]),l(r,{snippet:`
        <CDatetimeInput
          v-model='model7'
          label='Date de naissance'
          name='inputBirthdate'
          class='birthdate'
          :autocomplete='off'
        />
      `},{default:e(()=>[l(U,{modelValue:V.value,"onUpdate:modelValue":t[8]||(t[8]=a=>V.value=a),label:"Date de naissance",name:"inputBirthdate",class:"birthdate",autocomplete:"off"},null,8,["modelValue"])]),_:1})])}}});export{Q as default};

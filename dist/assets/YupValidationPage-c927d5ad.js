import{d as F,A as q,j as b,B as h,o as B,c as Y,e as s,w as n,b as o,u as t,C as c,a as f}from"./index-e7347527.js";import{C as i}from"./CInput-d2664611.js";import{u as k,c as x,a as m}from"./index.esm-672ca56f.js";import"./base-control-props-3c9ee147.js";const N={class:"yup-validation"},w=o("h2",null," Yup helper ",-1),E=o("h3",null," useYupHelper ",-1),H={class:"actions"},U=`
  const {
    reset: resetForm1,
    validate: validateForm1,
  } = useYupHelper({
    fields: ref(form1),
    schema: yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      email: yup.string().email().required(),
    }),
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
    }
  })
`,A=F({__name:"YupValidationPage",setup(j){const a=q({firstname:"",lastname:"",email:""}),r=b({}),{reset:V,validate:v}=k({fields:a,schema:x({firstname:m().required(),lastname:m().required(),email:m().email().required()}),initialValues:{firstname:"",lastname:"",email:""}});function _(){V(),r.errors=void 0}async function C(){const{isValid:y,errors:e}=await v();r.errors=e}return(y,e)=>{const g=h("CCodeSnippet");return B(),Y("div",N,[w,E,s(g,{snippet:U},{default:n(()=>{var u,d,p;return[o("form",null,[s(t(i),{name:"yupFirstname",class:"firstname",label:"Prénom",modelValue:a.value.firstname,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value.firstname=l),"error-message":(u=r.errors)==null?void 0:u.firstname},null,8,["modelValue","error-message"]),s(t(i),{name:"yupLastname",class:"lastname",label:"Nom",modelValue:a.value.lastname,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value.lastname=l),"error-message":(d=r.errors)==null?void 0:d.lastname},null,8,["modelValue","error-message"]),s(t(i),{name:"yupEmail",class:"email",label:"Email",modelValue:a.value.email,"onUpdate:modelValue":e[2]||(e[2]=l=>a.value.email=l),"error-message":(p=r.errors)==null?void 0:p.email},null,8,["modelValue","error-message"])]),o("div",H,[s(t(c),{color:"primary",class:"c-mr-35",onClick:C},{default:n(()=>[f(" Valider ")]),_:1}),s(t(c),{color:"secondary",onClick:_},{default:n(()=>[f(" Ré-initialiser ")]),_:1})])]}),_:1})])}}});export{A as default};

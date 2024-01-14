import{d as h,j as f,N as e,o as g,c as C,e as t,w as i,u as a,C as l,a as n,Y as m,F as b,b as r}from"./index-e7347527.js";import{C as p}from"./CDatatable-0db210bc.js";import"./ArrowDownIcon.vue_vue_type_script_setup_true_lang-58017a78.js";import"./ArrowUpIcon.vue_vue_type_script_setup_true_lang-af870494.js";import"./RefreshIcon.vue_vue_type_script_setup_true_lang-73b4b8eb.js";import"./TableIcon.vue_vue_type_script_setup_true_lang-ca656e46.js";import"./CSelect.vue_vue_type_script_setup_true_lang-d8f97f61.js";import"./base-control-props-3c9ee147.js";import"./ChevronLeftIcon.vue_vue_type_script_setup_true_lang-305b46c9.js";import"./ChevronRightIcon.vue_vue_type_script_setup_true_lang-c6f59e8f.js";const x=r("h2",null,"C-Datatable",-1),k=r("h3",null,"basic utilisation",-1),D=r("br",null,null,-1),v=r("h3",null,"custom pages",-1),y=`
  <CDatatable
    :items="items"
    :headers="headers"
  />
`,I=`
  <CDatatable
    :items="state.items"
    :headers="headers"
    :pages="[5, 100, 200]"
    :items-per-page="100"
  />
`,O=h({__name:"DatatablePage",setup(N){const s=f({items:Array.from({length:10}).map((d,_)=>({id:e(),name:e(),email:`${e()}@cresh.test.io`}))}),o=[{text:"#ID",key:"id",align:"start",sortable:!0},{text:"Nom",key:"name",align:"start",sortable:!0},{text:"Email",key:"email",align:"start",sortable:!0,sortOrder:"desc"}];function u(){s.items.push({id:e(),name:e(),email:`${e()}@cresh.test.io`})}function c(){s.items.splice(s.items.length-1,1)}return(d,_)=>(g(),C(b,null,[x,k,t(a(m),{snippet:y},{default:i(()=>[t(a(l),{onClick:u},{default:i(()=>[n(" Insérer un nouveau item ")]),_:1}),D,t(a(l),{color:"red",onClick:c},{default:i(()=>[n(" Supprimer le dernier ")]),_:1}),t(a(p),{items:s.items,headers:o},null,8,["items"])]),_:1}),v,n(" par défaut [5, 10, 15] "),t(a(m),{snippet:I},{default:i(()=>[t(a(p),{items:s.items,headers:o,pages:[5,100,200],"items-per-page":100},null,8,["items"])]),_:1})],64))}});export{O as default};
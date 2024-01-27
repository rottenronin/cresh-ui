import{d as I,A as d,o as s,c as i,e as t,w as l,a as o,u as n,t as r,s as v,Y as u,b as y,F as D,I as U}from"./index-50829d1b.js";import{_ as S}from"./CCheckbox.vue_vue_type_script_setup_true_lang-f71a1d4d.js";import{C as T}from"./CInput-eeab8017.js";import{_ as m}from"./TriangleDownIcon.vue_vue_type_script_setup_true_lang-580ab983.js";import{_ as p}from"./TriangleUpIcon.vue_vue_type_script_setup_true_lang-ffb29a83.js";import{_ as c}from"./CDropdown.vue_vue_type_script_setup_true_lang-5e015b26.js";import"./CheckIcon.vue_vue_type_script_setup_true_lang-70c1df78.js";import"./base-control-props-3c9ee147.js";const x={class:"dropdown"},B={key:0},N={key:0},$={key:0},q={key:0},z=y("div",null," selected item ",-1),P={class:"search-input"},A={key:0},_="",F=`
    <CDropdown
      v-model="visible1"
      :items="[{
        key: 'key 1',
        value: 'value 1'
      }, {
        key: 'key 2',
        value: 'value 2'
      }, {
        key: 'key 3',
        value: 'value 3'
      }]"
      v-slot="{ selectedItem }"
    >
      <div v-if="selectedItem">
        {{ selectedItem.key }}
      </div>
    </CDropdown>
  `,R=`
    <CDropdown
      v-model="visible2"
      :items="[{
        key: 'key 1',
        value: 'value 1'
      }, {
        key: 'key 2',
        value: 'value 2'
      }, {
        key: 'key 3',
        value: 'value 3'
      }]"
      v-slot="{ selectedItem }"
      :hovered="true"
    >
      <div v-if="selectedItem">
        {{ selectedItem.key }}
      </div>
    </CDropdown>
  `,E=`
    <CDropdown
      v-model="visible3"
      :items="[{
        key: 'key 1',
        value: 'value 1'
      }, {
        key: 'key 2',
        value: 'value 2'
      }, {
        key: 'key 3',
        value: 'value 3'
      }]"
      v-slot="{ selectedItem }"
    >
      <div v-if="selectedItem">
        {{ selectedItem.key }}
      </div>
    </CDropdown>
  `,L=`
    <CDropdown
      class="button"
      v-model="visible4"
      :items="[{
        key: 'key 1',
        value: 'value 1'
      }, {
        key: 'key 2',
        value: 'value 2'
      }, {
        key: 'key 3',
        value: 'value 3'
      }]"
    >
      <template #default="{ selectedItem }">
        <div v-if="selectedItem">
          {{ selectedItem.key }}
        </div>
      </template>
      <template #unactive-icon>
        <TriangleDownIcon
          color="secondary"
          :width="20"
          :height="20"
          class="c-ml-20"
        />
      </template>
      <template #active-icon>
        <TriangleUpIcon
          color="primary"
          :width="20"
          :height="20"
          class="c-ml-20"
        />
      </template>
    </CDropdown>
  `,Y=`
    <CDropdown
      class="button custom-content"
      v-model="visible5"
    >
      <template #default>
        <div>
          selected item
        </div>
      </template>
      <template #unactive-icon>
        <TriangleDownIcon
          color="secondary"
          :width="20"
          :height="20"
          class="c-ml-20"
        />
      </template>
      <template #active-icon>
        <TriangleUpIcon
          color="primary"
          width="20"
          height="20"
          class="c-ml-20"
        />
      </template>
      <template #content>
        <div class="search-input">
          <CInput
            class="search-input"
            v-model="searchStr"
            bordered
            no-label
            :placeholder="'Rechercher une entité...'"
          />
          <div
            v-for="item in items"
            :key="item.value"
          >
            <c-checkbox
              v-model="item.checked"
              :label="item.label"
            />
          </div>
        </div>
      </template>
    </CDropdown>
  `,j=`
    <CDropdown
      class="button"
      v-model="visible6"
      :pre-selected-item="{
        key: 'key 3',
        value: 'value 3'
      }"
      :items="[{
        key: 'key 1',
        value: 'value 1'
      }, {
        key: 'key 2',
        value: 'value 2'
      }, {
        key: 'key 3',
        value: 'value 3'
      }]"
    >
      <template #default="{ selectedItem }">
        <div v-if="selectedItem">
          {{ selectedItem.key }}
        </div>
      </template>
      <template #unactive-icon>
        <TriangleDownIcon
          color="secondary"
          :width="20"
          :height="20"
          class="c-ml-20"
        />
      </template>
      <template #active-icon>
        <TriangleUpIcon
          color="primary"
          :width="20"
          :height="20"
          class="c-ml-20"
        />
      </template>
    </CDropdown>
  `,ee=I({__name:"DropdownPage",setup(G){const k=d(!1),h=d(!1),f=d(!1),b=d(!1),w=d(!1),g=d(!1),V=[{checked:!1,label:"ABC",value:"abc"},{checked:!1,label:"BBC",value:"bbc"},{checked:!1,label:"CCC",value:"ccc"}];return(H,a)=>(s(),i("div",x,[t(u,{snippet:F},{title:l(()=>[o(" c-dropdown ")]),description:l(()=>[o(" Utilisation basique d'un dropdown ")]),default:l(()=>[t(n(c),{modelValue:k.value,"onUpdate:modelValue":a[0]||(a[0]=e=>k.value=e),items:[{key:"key 1",value:"value 1"},{key:"key 2",value:"value 2"},{key:"key 3",value:"value 3"}]},{default:l(({selectedItem:e})=>[e?(s(),i("div",B,r(e.key),1)):v("",!0)]),_:1},8,["modelValue"])]),_:1}),t(u,{snippet:R},{title:l(()=>[o(" hovered ")]),description:l(()=>[o(" afficher le dropdown list avec mouse onhover ")]),default:l(()=>[t(n(c),{modelValue:h.value,"onUpdate:modelValue":a[1]||(a[1]=e=>h.value=e),items:[{key:"key 1",value:"value 1"},{key:"key 2",value:"value 2"},{key:"key 3",value:"value 3"}],hovered:!0},{default:l(({selectedItem:e})=>[e?(s(),i("div",N,r(e.key),1)):v("",!0)]),_:1},8,["modelValue"])]),_:1}),t(u,{snippet:E},{title:l(()=>[o(" position ")]),description:l(()=>[o(" Par defaut, le dropdown s'affiche en bas de `trigger`, aligné à gauche, s'il n'y a assez de place en bas et qu'il dispose suffisamment de place en haut de `trigger`, le dropdown se place au dessus de `trigger` dans ce cas, meme logique pour positionnement horizontal, s'il n'y a pas assez de place à droite, le dropdown se decale vers la gauche si l'emplacement se permet. ")]),default:l(()=>[t(n(c),{modelValue:f.value,"onUpdate:modelValue":a[2]||(a[2]=e=>f.value=e),items:[{key:"key 1",value:"value 1"},{key:"key 2",value:"value 2"},{key:"key 3",value:"value 3"}]},{default:l(({selectedItem:e})=>[e?(s(),i("div",$,r(e.key),1)):v("",!0)]),_:1},8,["modelValue"])]),_:1}),t(u,{snippet:L},{title:l(()=>[o(" trigger style ")]),description:l(()=>[o(" Changer le style par défaut de trigger ")]),default:l(()=>[t(n(c),{class:"button",modelValue:b.value,"onUpdate:modelValue":a[3]||(a[3]=e=>b.value=e),items:[{key:"key 1",value:"value 1"},{key:"key 2",value:"value 2"},{key:"key 3",value:"value 3"}]},{default:l(({selectedItem:e})=>[e?(s(),i("div",q,r(e.key),1)):v("",!0)]),"unactive-icon":l(()=>[t(m,{color:"secondary",width:20,height:20,class:"c-ml-20"})]),"active-icon":l(()=>[t(p,{color:"primary",width:20,height:20,class:"c-ml-20"})]),_:1},8,["modelValue"])]),_:1}),t(u,{snippet:Y},{title:l(()=>[o(" custom content ")]),description:l(()=>[o(" Changer le contenu de dropdown ")]),default:l(()=>[t(n(c),{class:"button custom-content",modelValue:w.value,"onUpdate:modelValue":a[5]||(a[5]=e=>w.value=e)},{default:l(()=>[z]),"unactive-icon":l(()=>[t(m,{color:"secondary",width:20,height:20,class:"c-ml-20"})]),"active-icon":l(()=>[t(p,{color:"primary",width:20,height:20,class:"c-ml-20"})]),content:l(()=>[y("div",P,[t(T,{class:"search-input",modelValue:_,"onUpdate:modelValue":a[4]||(a[4]=e=>_=e),bordered:"","no-label":"",placeholder:"Rechercher une entité...",name:"input"},null,8,["placeholder"]),(s(),i(D,null,U(V,e=>y("div",{key:e.value},[t(S,{modelValue:e.checked,"onUpdate:modelValue":C=>e.checked=C,label:e.label,name:"checkbox"},null,8,["modelValue","onUpdate:modelValue","label"])])),64))])]),_:1},8,["modelValue"])]),_:1}),t(u,{snippet:j},{title:l(()=>[o(" pre-selected ")]),description:l(()=>[o(" Pré-selectionner une valeur par défaut ")]),default:l(()=>[t(n(c),{class:"button",modelValue:g.value,"onUpdate:modelValue":a[6]||(a[6]=e=>g.value=e),"pre-selected-item":{key:"key 3",value:"value 3"},items:[{key:"key 1",value:"value 1"},{key:"key 2",value:"value 2"},{key:"key 3",value:"value 3"}]},{default:l(({selectedItem:e})=>[e?(s(),i("div",A,r(e.key),1)):v("",!0)]),"unactive-icon":l(()=>[t(m,{color:"secondary",width:20,height:20,class:"c-ml-20"})]),"active-icon":l(()=>[t(p,{color:"primary",width:20,height:20,class:"c-ml-20"})]),_:1},8,["modelValue"])]),_:1})]))}});export{ee as default};

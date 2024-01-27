import{d as I,j as P,l as q,m as v,A as H,J as U,o as c,q as W,w as a,b as s,x as V,c as w,t as S,s as y,g as B,H as j,P as m,e as i,u as n,_ as x,k as O,U as T,B as L,C as b,a as g}from"./index-50829d1b.js";const E={class:"headline"},M={key:1,class:"document-label"},z={key:2,class:"header-actions"},F={class:"content"},J={key:0,class:"navigation-btns"},G=["onClick"],K=s("div",{class:"c-spacer"},null,-1),Q=["onClick"],X={class:"object-wrapper"},Y=["type","data","height","width"],Z={class:"invalid-message-wrapper"},ee={class:"footer"},_=I({__name:"CDocumentViewer",props:{modelValue:{type:Boolean,required:!0},allowRefresh:{type:Boolean,required:!1},document:{type:Object,required:!0},hideArrows:{type:Boolean,required:!1,default:!1},hideLeftArrow:{type:Boolean,required:!1,default:!1},hideRightArrow:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue","prev","next"],setup(r,{emit:e}){const l=r,p=P({objectWidth:"100%",ObjectHeight:"100%",initialized:!1}),f=q(),k=v(()=>!!f.label),C=v(()=>!!f["header-actions"]),u=v(()=>!!f.preview),t=v(()=>!!f.footer),o=H(null);function d(){e("update:modelValue",!l.modelValue)}function N(){e("prev",l.document)}function R(){e("next",l.document)}return U(()=>o.value,h=>{var D,$;h&&(p.objectWidth=((D=o.value)==null?void 0:D.clientWidth.toString())||"100%",p.ObjectHeight=(($=o.value)==null?void 0:$.clientHeight.toString())||"100%")}),(h,D)=>(c(),W(n(T),{class:"c-document-viewer",persistent:"","no-footer":"","model-value":r.modelValue,onCancel:d},{default:a(()=>[s("div",E,[k.value?V(h.$slots,"label",{key:0}):(c(),w("span",M,S(r.document.label),1)),C.value?(c(),w("div",z,[V(h.$slots,"header-actions")])):y("",!0)]),s("div",F,[r.hideArrows?y("",!0):(c(),w("div",J,[B(s("div",{class:"left-file-nav",onClick:m(N,["prevent","stop"])},[i(n(x),{name:"chevron-left",color:"white"})],8,G),[[j,!r.hideLeftArrow]]),K,B(s("div",{class:"right-file-nav",onClick:m(R,["prevent","stop"])},[i(n(x),{name:"chevron-right",color:"white"})],8,Q),[[j,!r.hideRightArrow]])])),u.value?V(h.$slots,"preview",{key:1}):(c(),w("div",{key:2,class:"preview",ref_key:"previewRef",ref:o},[s("div",X,[(c(),w("object",{type:r.document.extension!=="pdf"?"image/png":"application/pdf",key:r.document.link,data:r.document.link,height:p.ObjectHeight,width:p.objectWidth},[s("div",Z,S(n(O).global.t("translate.common.errors.invalid_file_error")),1)],8,Y))])],512)),s("div",ee,[t.value?V(h.$slots,"footer",{key:0}):y("",!0)])])]),_:3},8,["model-value"]))}}),te={class:"document-viewer-page"},oe=s("h3",null,"afficher une image",-1),ie=s("h3",null,"afficher un pdf",-1),ne=s("h3",null,"navigrer entre plusieur images/pdfs",-1),se={class:"header-actions"},le=s("span",null," Refresh ",-1),ae=`
  <CDocumentViewer
    hide-arrows
    v-model="state.visible"
    :document="state.document1"
  />
`,A=`
  <CDocumentViewer
    hide-arrows
    v-model="state.visible2"
    :document="state.document2"
  />
`,de=`
  <CDocumentViewer
    hide-arrows
    v-model="state.visible4"
    :document="state.document4"
  />
`,re=`
  <CDocumentViewer
    v-model="state.visible5"
    :document="state.document2"
    hide-arrows
  >
    <div class="header-actions">
      <CIcon
        name="loader"
        :width="20"
        :height="20"
      />
      <span>
        Refresh
      </span>
    </div>
  </CDocumentViewer>
`,ce=I({__name:"DocumentViewerPage",setup(r){const e=P({visible1:!1,document1:{link:"https://picsum.photos/seed/picsum/200/300",label:"paysage image",id:"paysageImage"},visible2:!1,document2:{link:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",label:"dummy pdf",id:"dummyPdf",extension:"pdf"},visible3:!1,document3:{link:"https://picsum.photos/500/500",label:"random image",id:"randomImage"},document4:{link:"https://invalid-imageurl",label:"invalid image",id:"invalidImage"},visible4:!1,visible5:!1,currentDocument:void 0}),l=v(()=>[e.document1,e.document2,e.document3]);e.currentDocument=l.value[0];const p=v(()=>l.value.findIndex(t=>{var o;return t.id===((o=e.currentDocument)==null?void 0:o.id)})+1!==l.value.length),f=v(()=>!(l.value.findIndex(t=>{var o;return t.id===((o=e.currentDocument)==null?void 0:o.id)})-1<0));function k(){const u=l.value.findIndex(t=>{var o;return t.id===((o=e.currentDocument)==null?void 0:o.id)});u>-1&&(e.currentDocument=l.value[u+1])}function C(){const u=l.value.findIndex(t=>{var o;return t.id===((o=e.currentDocument)==null?void 0:o.id)});u-1>=0&&(e.currentDocument=l.value[u-1])}return(u,t)=>{const o=L("CCodeSnippet");return c(),w("div",te,[oe,i(o,{snippet:ae},{default:a(()=>[i(n(b),{onClick:t[0]||(t[0]=m(()=>e.visible1=!e.visible1,["prevent","stop"]))},{default:a(()=>[g(" Toggle viewer 1 ")]),_:1}),i(n(_),{"hide-arrows":"",modelValue:e.visible1,"onUpdate:modelValue":t[1]||(t[1]=d=>e.visible1=d),document:e.document1},null,8,["modelValue","document"])]),_:1}),ie,i(o,{snippet:A},{default:a(()=>[i(n(b),{onClick:t[2]||(t[2]=m(()=>e.visible2=!e.visible2,["prevent","stop"]))},{default:a(()=>[g(" Toggle viewer 2 ")]),_:1}),i(n(_),{"hide-arrows":"",modelValue:e.visible2,"onUpdate:modelValue":t[3]||(t[3]=d=>e.visible2=d),document:e.document2},null,8,["modelValue","document"])]),_:1}),ne,i(o,{snippet:A},{default:a(()=>[i(n(b),{onClick:t[4]||(t[4]=m(()=>e.visible3=!e.visible3,["prevent","stop"]))},{default:a(()=>[g(" Toggle viewer 3 ")]),_:1}),i(n(_),{modelValue:e.visible3,"onUpdate:modelValue":t[5]||(t[5]=d=>e.visible3=d),document:e.currentDocument,"hide-right-arrow":!p.value,"hide-left-arrow":!f.value,onNext:k,onPrev:C},null,8,["modelValue","document","hide-right-arrow","hide-left-arrow"])]),_:1}),i(o,{snippet:de},{default:a(()=>[i(n(b),{onClick:t[6]||(t[6]=m(()=>e.visible4=!e.visible4,["prevent","stop"]))},{default:a(()=>[g(" affichage de message d'erreur ")]),_:1}),i(n(_),{modelValue:e.visible4,"onUpdate:modelValue":t[7]||(t[7]=d=>e.visible4=d),document:e.document4,"hide-arrows":""},null,8,["modelValue","document"])]),_:1}),i(o,{snippet:re},{default:a(()=>[i(n(b),{onClick:t[8]||(t[8]=m(()=>e.visible5=!e.visible5,["prevent","stop"]))},{default:a(()=>[g(" header actions ")]),_:1}),i(n(_),{modelValue:e.visible5,"onUpdate:modelValue":t[9]||(t[9]=d=>e.visible5=d),document:e.document2,"hide-arrows":""},{"header-actions":a(()=>[s("div",se,[i(n(x),{name:"loader",width:24,height:24}),le])]),_:1},8,["modelValue","document"])]),_:1})])}}});export{ce as default};

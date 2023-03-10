import{_,o as i,c as l,d as e,n as d,p as r,F as u,h as b,t as p,b as c}from"./index-1731e299.js";const h={props:["pages"],methods:{updatePage(n){this.$emit("emitPages",n)}}},v={"aria-label":"Page navigation example"},f={class:"pagination"},$=e("span",{"aria-hidden":"true"},"«",-1),k=[$],P=["onClick"],x=e("span",{"aria-hidden":"true"},"»",-1),C=[x];function y(n,a,t,g,m,o){return i(),l("nav",v,[e("ul",f,[e("li",{class:d(["page-item",{disabled:!t.pages.has_pre}])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[0]||(a[0]=r(s=>o.updatePage(t.pages.current_page-1),["prevent"]))},k)],2),(i(!0),l(u,null,b(t.pages.total_pages,s=>(i(),l("li",{class:d(["page-item",{active:s===t.pages.current_page}]),key:s+"page"},[e("a",{class:"page-link",href:"#",onClick:r(E=>o.updatePage(s),["prevent"])},p(s),9,P)],2))),128)),e("li",{class:d(["page-item",{disabled:!t.pages.has_next}])},[e("a",{class:"page-link",href:"#","aria-label":"Next",onClick:a[1]||(a[1]=r(s=>o.updatePage(t.pages.current_page+1),["prevent"]))},C)],2)])])}const T=_(h,[["render",y]]),B={props:{item:{}},emits:["del-item"]},D={class:"modal-dialog"},M={class:"modal-content border-0"},N=e("div",{class:"modal-header bg-danger text-white"},[e("h5",{id:"delProductModalLabel",class:"modal-title"},[e("span",null,"刪除產品")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),w={class:"modal-body"},F={class:"text-danger"},L={class:"modal-footer"},V=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function z(n,a,t,g,m,o){return i(),l("div",D,[e("div",M,[N,e("div",w,[c(" 確定要刪除 "),e("strong",F,p(t.item.title),1),c("？(刪除後將無法恢復)。 ")]),e("div",L,[V,e("button",{type:"button",class:"btn btn-danger",onClick:a[0]||(a[0]=s=>n.$emit("del-item"))}," 確認刪除 ")])])])}const j=_(B,[["render",z]]);export{j as D,T as P};
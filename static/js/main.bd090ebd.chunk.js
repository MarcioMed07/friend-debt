(this["webpackJsonpfriend-debt"]=this["webpackJsonpfriend-debt"]||[]).push([[0],{186:function(e,t,a){e.exports=a(335)},191:function(e,t,a){},192:function(e,t,a){},193:function(e,t,a){},194:function(e,t,a){},291:function(e,t,a){},335:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(18),o=a.n(i),l=(a(191),a(52)),c=a(151);a(192),a(193);var d,s=function(){return r.a.createElement("div",{className:"title"},r.a.createElement("header",null,r.a.createElement("h1",null,"Friend Debt"),r.a.createElement("p",null,"Never forget how much your friends owe you")))},u=(a(194),a(176));function m(e){if(d)e(d);else if(window.indexedDB){var t=window.indexedDB.open("friendDebtDB",1);t.onerror=function(e){console.error("Error Request",e)},t.onsuccess=function(a){d=t.result,console.log("DB loaded"),e(d)},t.onupgradeneeded=function(e){d=e.target.result,function(){var e=d.createObjectStore("friend",{keyPath:"id",autoIncrement:!0});return e.createIndex("name","name",{unique:!1}),e.createIndex("createdAt","createdAt",{unique:!1}),e.createIndex("debts","debts",{unique:!1}),e}()||console.error("Error creating friend store")}}}function f(e,t,a,n){d?function(e,t,a){if(d){var n=d.transaction(["friend"],"readwrite").objectStore("friend").get(e);n.onsuccess=function(e){t(n.result)},n.onerror=function(e){a(e)}}else console.error("db not found")}(e,(function(e){delete e.debts[t],d.transaction(["friend"],"readwrite").objectStore("friend").put(e).onsuccess=function(t){a(e)}})):console.error("db not found")}var b=a(342),v=a(345),g=a(38);var p=function(e){var t=b.a.useForm(),a=Object(l.a)(t,1)[0],i=Object(n.useState)(),o=Object(l.a)(i,2)[1];return Object(n.useEffect)((function(){o({})}),[]),r.a.createElement("div",{className:"formWrapper"},r.a.createElement("div",null,r.a.createElement("h2",null,"Create a new Friend"),r.a.createElement(b.a,{form:a,onFinish:function(t){console.log(t.friendName),function(e,t,a){if(d){var n=d.transaction(["friend"],"readwrite"),r=n.objectStore("friend"),i={name:e.name,createdAt:new Date,debts:{}};r.add(i),n.oncomplete=function(e){t(e)},n.onerror=function(e){a(e)}}else console.error("db not found")}({name:t.friendName,createdAt:new Date},(function(t){e.reloadFriendList()}),(function(e){console.error("Fail"),console.error(e)}))},layout:"inline"},r.a.createElement(b.a.Item,{label:"Friend Name",name:"friendName",required:!0},r.a.createElement(v.a,{maxLength:70})),r.a.createElement(b.a.Item,{shouldUpdate:!0},(function(){return r.a.createElement(g.a,{type:"primary",htmlType:"submit",disabled:!a.isFieldsTouched(!0)||a.getFieldsError().filter((function(e){return e.errors.length})).length},"Create")})))))},S=a(348),E=a(84),h=a(349),D=a(346),y=a(340),w=a(173),j=a(351),k=a(352),O=a(350),I=(a(291),a(181)),F=a(336),L=a(337),M=a(341),C=a(344),x=a(347);var N=function(e){var t;function a(e){return Number.parseFloat(e.replaceAll(".","").replaceAll(",",""))/100}function i(e){g({date:e.toDate()})}var o={value:"0.00",description:"",date:new Date,switch:!0,dateForm:r.a.createElement(r.a.Fragment,null)},c=Object(n.useState)(),s=Object(l.a)(c,2)[1];Object(n.useEffect)((function(){s({})}),[]);var m=Object(n.useReducer)((function(e,t){return void 0!==t.value&&(e.value=t.value),void 0!==t.description&&(e.description=t.description),void 0!==t.date&&(e.date=t.date),void 0!==t.switch&&(e.switch=t.switch,e.switch?e.dateForm=r.a.createElement(r.a.Fragment,null):e.dateForm=r.a.createElement(F.a,{span:12},r.a.createElement(L.a,null,"Date"),r.a.createElement(M.a,{showTime:!0,onChange:i}))),console.log(a(e.value)),Object(I.a)({},e)}),o),f=Object(l.a)(m,2),b=f[0],g=f[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{title:"Add Debt to "+(null===(t=e.modalState.friend)||void 0===t?void 0:t.name),visible:e.modalState.visible,confirmLoading:e.modalState.confirmLoading,onOk:function(t){e.setModalState({confirmLoading:!0,visible:!0,friend:e.modalState.friend,cancelDisabled:!0}),function(t,n,r,i){var l={description:r,value:"string"===typeof n?a(n):n,friendId:t,createdAt:i};!function(e,t,a,n){if(d){var r=d.transaction(["friend"],"readwrite").objectStore("friend");r.get(e).onsuccess=function(e){var n=e.target.result,i=Object.values(n.debts).length>0?Math.max.apply(Math,Object(u.a)(Object.keys(n.debts)))+1:0;t.id=i,n.debts[i]=t,r.put(n).onsuccess=function(e){a(e)}}}else console.error("db not found")}(t,l,(function(t){e.reloadItems(),e.setModalState({visible:!1,friend:e.modalState.friend}),g(o),D.b.success("Debt created")}))}(e.modalState.friend.id,a(b.value),b.description,b.switch?new Date:b.date)},onCancel:function(t){g(o),e.setModalState({visible:!1,friend:e.modalState.friend})},okButtonProps:{disabled:e.modalState.okDisabled},cancelButtonProps:{disabled:e.modalState.cancelDisabled},closable:!1,maskClosable:!1},r.a.createElement(L.a,{gutter:[16,16]},r.a.createElement(F.a,{span:12},r.a.createElement(L.a,null,"Value"),r.a.createElement(v.a,{value:b.value,onChange:function(t){var n=t.target.value;n=""===n?0:a(n),Number.isNaN(n)||(0===n?e.setModalState({okDisabled:!0,visible:!0,friend:e.modalState.friend}):e.setModalState({okDisabled:!1,visible:!0,friend:e.modalState.friend}),g({value:Intl.NumberFormat(navigator.language,{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)}))},prefix:"$",maxLength:12})),r.a.createElement(F.a,{span:12},r.a.createElement(L.a,null,"Description"),r.a.createElement(v.a.TextArea,{value:b.description,onChange:function(e){var t=e.target.value;g({description:t})}}))),r.a.createElement(L.a,{gutter:[16,16]},r.a.createElement(F.a,{span:12},r.a.createElement(L.a,null,"Current Date"),r.a.createElement(x.a,{checked:b.switch,onChange:function(e){g({switch:e})}})),b.dateForm)))},A=a(343);var z=function(e){var t,a;function n(t){e.setModalState({visible:!1,friend:e.modalState.friend})}var i=[{title:"Value",dataIndex:"value",key:"value",render:function(t,a){return Intl.NumberFormat(navigator.language,{style:"currency",currency:e.currency}).format(a.value)}},{title:"Description",dataIndex:"description",key:"description",render:function(e,t){return r.a.createElement(E.a,{placement:"topLeft",title:t.description},t.description)}},{title:"Date",dataIndex:"createdAt",key:"createdAt",render:function(e,t){return Object(A.a)(t.createdAt,"Pp")}},{title:"Delete",dataIndex:"delete",key:"delete",render:function(t,a){return r.a.createElement(E.a,{title:"Delete Debt"},r.a.createElement(g.a,{onClick:function(){f(a.friendId,a.id,(function(t){e.setModalState({okDisabled:!0,visible:!0,friend:t}),e.reloadItems()}))},shape:"circle",icon:r.a.createElement(O.a,null)}))}}];return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a,{title:(null===(t=e.modalState.friend)||void 0===t?void 0:t.name)+" Debts",visible:e.modalState.visible,onCancel:n,onOk:n,footer:[r.a.createElement(g.a,{key:"ok",type:"primary",onClick:n},"Ok")]},r.a.createElement(y.a,{pagination:!1,columns:i,dataSource:Object.values((null===(a=e.modalState.friend)||void 0===a?void 0:a.debts)||{})})))};var P=function(e){var t=[{title:"Name",dataIndex:"name",key:"name"},{title:"Last Debt Date",dataIndex:"date",key:"date"},{title:"Total owed",dataIndex:"total",key:"total"},{title:"Action",key:"action",render:function(t,n){return r.a.createElement(S.b,{size:"middle"},r.a.createElement(E.a,{title:"List "+n.friend.name+"'s Debts"},r.a.createElement(g.a,{onClick:function(){return e.setListDebtState({okDisabled:!0,visible:!0,friend:n.friend})},shape:"circle",icon:r.a.createElement(j.a,null)})),r.a.createElement(E.a,{title:"Add Debt to "+n.friend.name},r.a.createElement(g.a,{onClick:function(){return e.setDebtModalState({okDisabled:!0,visible:!0,friend:n.friend})},shape:"circle",icon:r.a.createElement(k.a,null)})),r.a.createElement(h.a,{title:"Are you sure you want to delete "+n.friend.name+" and all its debts? This cannot be undone",onConfirm:function(){var t;!function(e,t,a){if(d){var n=d.transaction(["friend"],"readwrite");n.objectStore("friend").delete(e),n.oncomplete=function(e){t(e)},n.onerror=function(e){a(e)}}else console.error("db not found")}((t=n.friend).id,(function(){D.b.success(t.name+" deleted"),e.reloadItems()}),(function(){}))},onCancel:a,okText:"Yes",cancelText:"No"},r.a.createElement(E.a,{title:"Delete "+n.friend.name},r.a.createElement(g.a,{shape:"circle",icon:r.a.createElement(O.a,null)}))))}}];function a(){}function i(t,a){e.dispatch({currPage:t,pageSize:a,total:e.friendListState.total,items:e.friendListState.items})}return Object(n.useEffect)(e.reloadItems,[e.friendListState.currPage,e.friendListState.pageSize]),r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{pagination:!1,columns:t,dataSource:e.friendListState.items}),r.a.createElement(w.a,{size:"small",total:e.friendListState.total,defaultCurrent:e.initialState.currPage,current:e.friendListState.currPage,pageSize:e.friendListState.pageSize,showTotal:function(e){return"Total "+e.toString()},onChange:i,onShowSizeChange:i,showSizeChanger:!0}),r.a.createElement(N,{setModalState:e.setDebtModalState,modalState:e.debtModalState,reloadItems:e.reloadItems,currency:e.currency}),r.a.createElement(z,{setModalState:e.setListDebtState,modalState:e.listDebtState,reloadItems:e.reloadItems,currency:e.currency}))},T=a(338),B=a(339);function q(e,t){return{currPage:t.currPage,pageSize:t.pageSize,total:t.total,items:t.items}}var R={currPage:1,pageSize:10,total:0,items:[]};var J=function(){function e(){m((function(){!function(e,t,a){if(d){var n=d.transaction("friend").objectStore("friend"),r=n.count();r.onsuccess=function(){var i=[],o=n.openCursor(),l=!1,c=0;o.onsuccess=function(a){var n=a.target.result;if(n){var o=n.value;(null===e||void 0===e?void 0:e.offset)&&!l?(l=!0,n.advance(null===e||void 0===e?void 0:e.offset)):(i.push(o),c++,(null===e||void 0===e?void 0:e.limit)&&c>=(null===e||void 0===e?void 0:e.limit)?n=null:n.continue())}if(!n){var d={data:i,total:r.result,currPage:(null===e||void 0===e?void 0:e.offset)/(null===e||void 0===e?void 0:e.limit)+1,pageSize:null===e||void 0===e?void 0:e.limit};t(d)}},o.onerror=function(e){a(e)}}}else console.error("db not found")}({limit:i.pageSize,offset:i.pageSize*(i.currPage-1)},(function(e){var t,a=[],n=Object(c.a)(e.data);try{for(n.s();!(t=n.n()).done;){var r=t.value;a.push({key:r.id.toString(),name:r.name,date:Object.values(r.debts).length>0?Object(A.a)(Object(T.a)(Object.values(r.debts).map((function(e){return e.createdAt}))),"Pp"):"-",total:Intl.NumberFormat(navigator.language,{style:"currency",currency:w}).format(Object.values(r.debts).reduce((function(e,t){return e+t.value}),0)),friend:r})}}catch(i){n.e(i)}finally{n.f()}o({currPage:e.currPage,pageSize:e.pageSize,total:e.total,items:a})}))}))}var t=Object(n.useReducer)(q,R),a=Object(l.a)(t,2),i=a[0],o=a[1],u=Object(n.useState)({visible:!1,friend:void 0,okDisabled:!0}),f=Object(l.a)(u,2),b=f[0],v=f[1],g=Object(n.useState)({visible:!1,friend:void 0,okDisabled:!0}),S=Object(l.a)(g,2),E=S[0],h=S[1],D=Object(n.useState)("BRL"),y=Object(l.a)(D,2),w=y[0];return y[1],r.a.createElement(B.a,{className:"layout"},r.a.createElement(s,null),r.a.createElement(B.a.Content,{className:"content"},r.a.createElement("div",{className:"content-wrapper"},r.a.createElement(p,{reloadFriendList:function(){e()}}),r.a.createElement(P,{friendListState:i,dispatch:o,initialState:R,reloadItems:e,debtModalState:b,setDebtModalState:v,listDebtState:E,setListDebtState:h,currency:w}))),r.a.createElement(B.a.Footer,{className:"footer"},r.a.createElement("div",null,"Made with ReactJs and Ant Design by M\xe1rcio Medeiros"),r.a.createElement("div",null,r.a.createElement("a",{href:"https://github.com/MarcioMed07/Friend-Debt"},"This project is open source under the MIT license."))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[186,1,2]]]);
//# sourceMappingURL=main.bd090ebd.chunk.js.map
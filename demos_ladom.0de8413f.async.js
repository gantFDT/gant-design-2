(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{GBlZ:function(e,t,a){"use strict";a.r(t);var i=a("PUUv"),n=a("tJVT"),c=a("q1tI"),o=a.n(c);t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(n["a"])(e,2),a=t[0],l=t[1];return o.a.createElement("div",{style:{margin:10}},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{l(!0)}},"\u89e6\u53d1\u5f39\u7a97")),o.a.createElement(i["a"],{title:"\u529f\u80fd\u7981\u6b62\u7684\u72b6\u6001\u5f39\u7a97",visible:a,canMaximize:!1,canResize:!1,onCancel:()=>{l(!1)}}))}},IYiS:function(e,t,a){"use strict";a.r(t);var i=a("PUUv"),n=a("tJVT"),c=a("q1tI"),o=a.n(c);t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(n["a"])(e,2),a=t[0],l=t[1];return o.a.createElement("div",{style:{margin:10}},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{l(!0)}},"\u89e6\u53d1\u5f39\u7a97")),o.a.createElement(i["a"],{visible:a,onCancel:()=>{l(!1)}},"\u9ed8\u8ba4\u5bbd\u9ad8520"))}},PUUv:function(e,t,a){"use strict";var i,n=a("0Owb"),c=a("PpiC"),o=a("q1tI"),l=a.n(o),r=a("qmFz"),s=l.a.createContext({}),d=s,m=(a("HEw/"),a("6Igr")),h=a("k1fw"),u=a("S6kk"),b=a.n(u),O=a("pY9C"),j=a("vGZF"),v=a("fDQz");(function(e){e["mount"]="mount",e["unmount"]="unmount",e["focus"]="focus",e["show"]="show",e["hide"]="hide",e["max"]="max",e["reset"]="reset",e["resize"]="resize",e["drag"]="drag",e["windowResize"]="windowResize"})(i||(i={}));var w=520,g=(e,t)=>e.modals[t]||e.initialModalState,x=(e,t,a)=>Math.max(e,Math.min(t,a)),f=(e,t,a)=>"number"==typeof a?a:(e-t)/2,p=(e,t)=>{if("number"==typeof e)return e;var a=new RegExp(/^\d+%$/);return a.test(e)?Math.floor(t*(Number(e.replace("%",""))/100)):(console.warn("\u8bf7\u68c0\u67e5\u4f20\u9012\u7684\u767e\u5206\u6bd4\u5c3a\u5bf8\u683c\u5f0f\u662f\u5426\u6b63\u786e\u3002"),w)},E=(e,t)=>Object.assign({},...Object.keys(e).map((a=>({[a]:t(e[a])})))),z=(e,t)=>{var a=e.modals,i=e.maxZIndex;if(1===Object.keys(a).length)return i;var n=g(e,t);return n.zIndex===i?i:i+1},y=(e,t,a,i,n,c)=>{var o=e-n,l=t-c,r=x(0,o,a),s=x(0,l,i);return{x:r,y:s}},C=(e,t,a,i,n,c,o,l)=>{var r=a-n,s=i-c,d=x(e,r,o),m=x(t,s,l);return{width:d,height:m}},k=(e,t)=>{var a=t.type,n=t.payload,c=n.id,o=e.minWidth,l=e.minHeight,r=e.initialModalState,s=e.windowSize,d=1!=Object.keys(e.modals).length;switch(a){case i.mount:var m=Object(h["a"])(Object(h["a"])({},r),n.itemState),u={width:m.width,height:m.height,x:m.x,y:m.y};m.width=p(m.width,s.width),m.height=p(m.height,s.height);var b=f(s.width,m.width,m.x),O=f(s.height,m.height,m.y);return Object(h["a"])(Object(h["a"])({},e),{},{maxZIndex:e.maxZIndex+1,modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])({inital:u},m),{},{x:b,y:O,zIndex:e.maxZIndex+1})})});case i.unmount:var j=Object(h["a"])({},e.modals);return delete j[c],Object(h["a"])(Object(h["a"])({},e),{},{modals:j});case i.focus:var v=e.modals[c],w=d?e.maxZIndex+1:e.maxZIndex;return Object(h["a"])(Object(h["a"])({},e),{},{maxZIndex:w,modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])({},v),{},{zIndex:w})})});case i.show:var g=Object(h["a"])({},e.modals[c]),x=g.keepStateOnClose,k=g.inital,I=g.maximize,S=x?g:k;x||("string"==typeof k.width&&(g.width=p(k.width,s.width)),"string"==typeof k.height&&(g.height=p(k.height,s.height)));var M=d?e.maxZIndex+1:e.maxZIndex,R=f(s.width,g.width,S.x),D=f(s.height,g.height,S.y),P=g.isMaximized,Z=y(s.width,s.height,R,D,g.width,g.height),B=C(o,l,s.width,s.height,Z.x,Z.y,g.width,g.height);return!x&&I&&(Z={x:0,y:0},B={width:s.width,height:s.height},P=I),Object(h["a"])(Object(h["a"])({},e),{},{maxZIndex:M,modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])(Object(h["a"])(Object(h["a"])({},g),Z),B),{},{isMaximized:P,zIndex:M,visible:!0})})});case i.hide:return Object(h["a"])(Object(h["a"])({},e),{},{modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])({},e.modals[c]),{},{visible:!1})})});case i.max:var Y=e.modals[c],X={x:Y.x,y:Y.y,width:Y.width,height:Y.height};return Object(h["a"])(Object(h["a"])({},e),{},{modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])({},Y),{},{x:0,y:0,height:window.innerHeight,width:window.innerWidth,history:X,isMaximized:!0})})});case i.reset:var U=e.modals[c],N=U.inital,H=U.history,T=H||N;T.width=p(T.width,s.width),T.height=p(T.height,s.height);var J=void 0!=T.x?T.x:f(s.width,T.width),L=void 0!=T.y?T.y:f(s.height,T.height),V=y(s.width,s.height,J,L,T.width,T.height),W=C(o,l,s.width,s.height,V.x,V.y,T.width,T.height);return Object(h["a"])(Object(h["a"])({},e),{},{modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])(Object(h["a"])(Object(h["a"])({},U),V),W),{},{history:null,isMaximized:!1})})});case i.resize:var q=C(o,l,s.width,s.height,n.x,n.y,n.width,n.height);return Object(h["a"])(Object(h["a"])({},e),{},{maxZIndex:z(e,c),modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])(Object(h["a"])({},e.modals[c]),q),{},{zIndex:z(e,c)})})});case i.drag:return Object(h["a"])(Object(h["a"])({},e),{},{maxZIndex:z(e,c),modals:Object(h["a"])(Object(h["a"])({},e.modals),{},{[c]:Object(h["a"])(Object(h["a"])(Object(h["a"])({},e.modals[c]),y(s.width,s.height,n.x,n.y,e.modals[c].width,e.modals[c].height)),{},{zIndex:z(e,c)})})});case i.windowResize:return Object(h["a"])(Object(h["a"])({},e),{},{windowSize:n.size,modals:E(e.modals,(e=>{if(!e.visible)return e;var t=e.isMaximized?{x:0,y:0}:y(n.size.width,n.size.height,e.x,e.y,e.width,e.height),a=e.isMaximized?{width:n.size.width,height:n.size.height}:C(o,l,n.size.width,n.size.height,t.x,t.y,e.width,e.height);return Object(h["a"])(Object(h["a"])(Object(h["a"])({},e),t),a)}))});default:throw new Error}},I=k;function S(e,t,a){var i=Object(o["useRef"])(!1),n=Object(o["useRef"])({initX:0,initY:0,mouseDownX:0,mouseDownY:0}),c=Object(o["useCallback"])((a=>{a.stopPropagation(),D(!1),n.current={initX:e,initY:t,mouseDownX:a.clientX,mouseDownY:a.clientY},i.current=!0}),[e,t]),l=Object(o["useCallback"])((e=>{if(i.current){var t=n.current,c=t.initX,o=t.mouseDownX,l=t.initY,r=t.mouseDownY,s=e.clientX-o,d=e.clientY-r,m=c+s,h=l+d;a({x:m,y:h})}}),[a]);return Object(o["useEffect"])((()=>(window.addEventListener("mousemove",l,{passive:!0}),()=>window.removeEventListener("mousemove",l))),[]),Object(o["useEffect"])((()=>{var e=()=>{i.current=!1,D(!0)};return window.addEventListener("mouseup",e),()=>window.removeEventListener("mouseup",e)}),[]),c}function M(e,t,a,i,n){var c=Object(o["useRef"])(!1),l=Object(o["useRef"])({initX:0,initY:0,initWidth:0,initHeight:0,mouseDownX:0,mouseDownY:0}),r=Object(o["useCallback"])((n=>{n.stopPropagation(),D(!1),l.current={initX:e,initY:t,initWidth:a,initHeight:i,mouseDownX:n.clientX,mouseDownY:n.clientY},c.current=!0}),[a,i,e,t]),s=Object(o["useCallback"])((e=>{if(c.current){var t=l.current,a=t.initX,i=t.initY,o=t.initWidth,r=t.mouseDownX,s=t.initHeight,d=t.mouseDownY,m=e.clientX-r,h=e.clientY-d,u=o+m,b=s+h;return n({x:a,y:i,width:u,height:b})}}),[l,n]);return Object(o["useEffect"])((()=>(window.addEventListener("mousemove",s,{passive:!0}),()=>window.removeEventListener("mousemove",s))),[s]),Object(o["useEffect"])((()=>{var e=()=>{c.current=!1,D(!0)};return window.addEventListener("mouseup",e),()=>window.removeEventListener("mouseup",e)}),[]),r}function R(e){var t=Object(o["useRef"])(e);return Object(o["useEffect"])((()=>{t.current=e})),t.current}function D(e){document.onselectstart=()=>e}var P={position:"absolute",margin:0,paddingBottom:0},Z=e=>{var t=e.prefixCls,a=e.id,r=e.itemState,s=e.visible,u=e.title,w=e.style,x=e.wrapClassName,f=e.canMaximize,p=void 0===f||f,E=e.canResize,z=void 0===E||E,y=e.isModalDialog,C=void 0!==y&&y,k=e.cancelButtonProps,I=e.okButtonProps,D=e.contentRef,Z=e.children,B=e.onCancel,Y=e.onOk,X=Object(c["a"])(e,["prefixCls","id","itemState","visible","title","style","wrapClassName","canMaximize","canResize","isModalDialog","cancelButtonProps","okButtonProps","contentRef","children","onCancel","onOk"]),U=t||"gant-modal",N=Object(o["useContext"])(d),H=N.dispatch,T=N.state,J=g(T,a),L=R(s);Object(o["useEffect"])((()=>(H({type:i.mount,payload:{id:a,itemState:r}}),()=>H({type:i.unmount,payload:{id:a}}))),[]),Object(o["useEffect"])((()=>{(s||s!==L)&&H({type:s?i.show:i.hide,payload:{id:a}})}),[s]);var V=J.visible,W=J.zIndex,q=J.x,Q=J.y,A=J.width,F=J.height,G=J.isMaximized,$=Object(o["useMemo"])((()=>Object(h["a"])(Object(h["a"])(Object(h["a"])({},P),w),{},{top:Q,left:q,height:F})),[Q,q,F,w]),K=Object(o["useCallback"])((()=>H({type:i.focus,payload:{id:a}})),[a,H]),_=Object(o["useCallback"])((e=>H({type:i.drag,payload:Object(h["a"])({id:a},e)})),[a,H]),ee=Object(o["useCallback"])((e=>H({type:i.resize,payload:Object(h["a"])({id:a},e)})),[a,H]),te=Object(o["useCallback"])((()=>{p&&H({type:G?i.reset:i.max,payload:{id:a}})}),[a,G,p,H]),ae=S(q,Q,_),ie=M(q,Q,Number(A),Number(F),ee),ne=Object(o["useMemo"])((()=>l.a.createElement("div",{className:"".concat(U,"-resizableModalHeader")},l.a.createElement("div",{className:b()("".concat(U,"-resizableModalTitle"),G?"":"".concat(U,"-canDrag")),style:{marginRight:p?60:30},onMouseDown:ae,onClick:K,onDoubleClick:te},u),l.a.createElement("div",{className:"".concat(U,"-resizableHeaderActions")},p&&l.a.createElement("div",{className:"".concat(U,"-maximizeIcon"),onClick:te},G?l.a.createElement(O["a"],null):l.a.createElement(j["a"],null)),l.a.createElement("div",{className:"".concat(U,"-closeIcon"),onClick:e=>B&&B(e)},l.a.createElement(v["a"],null))))),[ae,K,B,te,U,u,G,p]),ce=Object(o["useMemo"])((()=>b()("".concat(U,"-resizableModalWrapper"),"".concat(U,C?"-resizableModalDialog":"-resizableModalDefault"),G&&"".concat(U,"-maximize"),x)),[G,C,U,x]);return l.a.createElement(m["a"],Object(n["a"])({wrapClassName:ce,title:ne,width:A,visible:V,zIndex:W,style:$,mask:C,maskClosable:C,destroyOnClose:!0,onCancel:B,onOk:Y,cancelButtonProps:Object(h["a"])({size:"small"},k),okButtonProps:Object(h["a"])({size:"small"},I)},X,{closable:!1}),l.a.createElement("div",{ref:D,className:"".concat(U,"-resizableModalContent"),onClick:K},Z),z&&!G&&l.a.createElement("div",{className:"".concat(U,"-resizeAnchor"),onMouseDown:ie},l.a.createElement("i",null)))},B=Object(o["memo"])(Z),Y=B,X=a("tJVT"),U=()=>({width:window.innerWidth||0,height:window.innerHeight||0}),N={width:w,height:w,zIndex:0,visible:!1,maximize:!1,keepStateOnClose:!1},H=e=>{var t=e.initalState,a=e.maxZIndex,n=void 0===a?0:a,c=e.minWidth,r=void 0===c?200:c,s=e.minHeight,m=void 0===s?200:s,u=e.children,b={modals:{},maxZIndex:n,minWidth:r,minHeight:m,windowSize:U(),initialModalState:Object(h["a"])(Object(h["a"])({},N),t)},O=Object(o["useReducer"])(I,b),j=Object(X["a"])(O,2),v=j[0],w=j[1];return Object(o["useEffect"])((()=>{if("object"===typeof window){var e=()=>w({type:i.windowResize,payload:{size:U()}});return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}}),[]),l.a.createElement(d.Provider,{value:{state:v,dispatch:w}},u)},T=H,J=["initalState","maxZIndex","minWidth","minHeight"],L=e=>{var t=e.id,a=e.throttleTime,i=e.children,n=e.onSizeChange,c=e.getContentEl,s=Object(o["useContext"])(d),m=s.state.modals,h=m[t],u=h.width,b=h.height;console.log("modals: ",m);var O=Object(o["useCallback"])(Object(r["throttle"])(((e,t)=>{n&&n(e,t,c())}),a),[n]);return Object(o["useEffect"])((()=>{O(u,b)}),[u,b]),l.a.createElement(l.a.Fragment,null,i)};class V extends l.a.Component{constructor(e){super(e),this.contentRef=void 0,this.getContentEl=()=>this.contentRef.current,this.contentRef=l.a.createRef()}render(){var e=this.props,t=e.id,a=e.throttle,i=e.children,o=e.onSizeChange,s=Object(c["a"])(e,["id","throttle","children","onSizeChange"]);return l.a.createElement(T,Object(r["pick"])(s,J),l.a.createElement(Y,Object(n["a"])({id:t},Object(r["omit"])(s,J),{contentRef:this.contentRef}),l.a.createElement(L,{id:t,children:i,throttleTime:a,onSizeChange:o,getContentEl:this.getContentEl})))}}V.ResizableModal=void 0,V.ResizableProvider=void 0,V.ModalContext=void 0,V.defaultProps={id:"modal-uuid",throttle:200,maxZIndex:999,isModalDialog:!0},V.ResizableModal=Y,V.ResizableProvider=T,V.ModalContext=d;t["a"]=V},QeXO:function(e,t,a){"use strict";a.r(t);var i=a("PUUv"),n=a("tJVT"),c=a("q1tI"),o=a.n(c);t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(n["a"])(e,2),a=t[0],l=t[1];return o.a.createElement("div",{style:{margin:10}},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{l(!0)}},"\u89e6\u53d1\u5f39\u7a97")),o.a.createElement(i["a"],{title:"\u9ed8\u8ba4\u5f39\u7a97",itemState:{x:0,y:0,width:400,height:400},visible:a,onCancel:()=>{l(!1)}},"\u4ece\u6307\u5b9a\u7684x:0,y:0\u4f4d\u7f6e\u8fdb\u884c\u5f39\u51fa"))}},Ra3A:function(e,t,a){"use strict";a.r(t);var i=a("PUUv"),n=a("tJVT"),c=a("q1tI"),o=a.n(c);t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(n["a"])(e,2),a=t[0],l=t[1],r=Object(c["useState"])([0,0]),s=Object(n["a"])(r,2),d=s[0],m=s[1],h=Object(c["useState"])([0,0]),u=Object(n["a"])(h,2),b=u[0],O=u[1],j=(e,t,a)=>{m([e,t]);var i=a.getBoundingClientRect();O([i.width,i.height])};return o.a.createElement("div",{style:{margin:10}},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{l(!0)}},"\u89e6\u53d1\u5f39\u7a97")),o.a.createElement(i["a"],{title:"\u81ea\u5b9a\u4e49\u5c5e\u6027\u6807\u9898",itemState:{height:400,width:"60%"},visible:a,footer:null,onCancel:()=>{l(!1)},onSizeChange:j},o.a.createElement("h3",null,"\u52a8\u6001\u5bbd\u9ad8\u83b7\u53d6"),o.a.createElement("br",null),o.a.createElement("h4",null,"\u5305\u542bheader+footer:"),o.a.createElement("div",null,"width:".concat(d[0],"px")),o.a.createElement("div",null,"height:".concat(d[1],"px")),o.a.createElement("br",null),o.a.createElement("h4",null,"\u4e0d\u542bheader+footer:"),o.a.createElement("div",null,"width:".concat(b[0],"px")),o.a.createElement("div",null,"height:".concat(b[1],"px"))))}},b4MV:function(e,t,a){"use strict";a.r(t);var i=a("PUUv"),n=a("tJVT"),c=a("q1tI"),o=a.n(c);t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(n["a"])(e,2),a=t[0],l=t[1];return o.a.createElement("div",{style:{margin:10}},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{l(!0)}},"\u89e6\u53d1\u5f39\u7a97")),o.a.createElement(i["a"],{title:"\u9ed8\u8ba4\u5f39\u7a97",visible:a,itemState:{keepStateOnClose:!0},onCancel:()=>{l(!1)}},"\u6302\u8f7d\u671f-\u5b58\u50a8\u5f39\u7a97\u72b6\u6001\uff08\u5bbd\u9ad8\u3001\u5b9a\u4f4d\u3001\u6700\u5927\u5316\uff09"))}},dz0t:function(e,t,a){"use strict";a.r(t),t["default"]={"modal-base":{component:a("IYiS").default},"modal-custom":{component:a("Ra3A").default},"modal-position":{component:a("QeXO").default},"modal-maximize":{component:a("eoBh").default},"modal-forbidden":{component:a("GBlZ").default},"modal-keepstate":{component:a("b4MV").default},"modal-modeless":{component:a("pQa4").default}}},eoBh:function(e,t,a){"use strict";a.r(t);var i=a("PUUv"),n=a("tJVT"),c=a("q1tI"),o=a.n(c);t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(n["a"])(e,2),a=t[0],l=t[1];return o.a.createElement("div",{style:{margin:10}},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{l(!0)}},"\u89e6\u53d1\u5f39\u7a97")),o.a.createElement(i["a"],{title:"\u6700\u5927\u5316\u5f39\u7a97",itemState:{maximize:!0},visible:a,onCancel:()=>{l(!1)}}))}},pQa4:function(e,t,a){"use strict";a.r(t);var i=a("tJVT"),n=a("PUUv"),c=a("q1tI"),o=a.n(c),l=n["a"].ResizableProvider,r=n["a"].ResizableModal;t["default"]=()=>{var e=Object(c["useState"])(!1),t=Object(i["a"])(e,2),a=t[0],n=t[1],s=Object(c["useState"])(!1),d=Object(i["a"])(s,2),m=d[0],h=d[1];return o.a.createElement(l,{maxZIndex:200},o.a.createElement("div",{style:{marginBottom:10}},o.a.createElement("button",{onClick:()=>{n(!0)}},"\u7b2c\u4e00\u4e2a\u5f39\u7a97"),o.a.createElement("button",{onClick:()=>{h(!0)}},"\u7b2c\u4e8c\u4e2a\u5f39\u7a97")),o.a.createElement(r,{id:"1",title:"\u7b2c\u4e00\u4e2a\u5f39\u7a97",visible:a,footer:null,onCancel:()=>{n(!1)}},"\u7b2c\u4e00\u4e2a\u5f39\u7a97-content"),o.a.createElement(r,{itemState:{height:400,width:400},id:"2",title:"\u7b2c\u4e8c\u4e2a\u5f39\u7a97",visible:m,onCancel:()=>{h(!1)}},"\u7b2c\u4e8c\u4e2a\u5f39\u7a97-content"))}}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{sbAj:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),r=t.n(n),l=t("dEAq"),i=t("ZpkN");a["default"]=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"markdown"},r.a.createElement("h1",{id:"api-standards"},r.a.createElement(l["AnchorLink"],{to:"#api-standards","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"API Standards"),r.a.createElement("p",null,"This is tantds API specification document."),r.a.createElement("h2",{id:"return-value"},r.a.createElement(l["AnchorLink"],{to:"#return-value","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"Return value"),r.a.createElement("h3",{id:"1-no-output"},r.a.createElement(l["AnchorLink"],{to:"#1-no-output","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"1. no output"),r.a.createElement("p",null,"Hooks are allowed to have no output, which is generally common in life cycle Hooks."),r.a.createElement(i["a"],{code:"useMount(() => {});\n",lang:"javascript"}),r.a.createElement("h3",{id:"2-value-type"},r.a.createElement(l["AnchorLink"],{to:"#2-value-type","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"2. value type"),r.a.createElement("p",null,"Hooks have one output value."),r.a.createElement(i["a"],{code:"const documentVisibility = useDocumentVisibility();\n",lang:"javascript"}),r.a.createElement("h3",{id:"3-value-setvalue-type"},r.a.createElement(l["AnchorLink"],{to:"#3-value-setvalue-type","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"3. value setValue type"),r.a.createElement("p",null,"The output is value and setValue, the structure is ",r.a.createElement("code",null,"[value, setValue]"),"\xa0\u3002"),r.a.createElement(i["a"],{code:"const [state, setState] = useLocalStorageState(...)\n",lang:"javascript"}),r.a.createElement("h3",{id:"4-value-actions-type"},r.a.createElement(l["AnchorLink"],{to:"#4-value-actions-type","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"4. value actions type"),r.a.createElement("p",null,"The output is single value and multiple actions type, the structure is ",r.a.createElement("code",null,"[value, actions]"),"\xa0\u3002"),r.a.createElement(i["a"],{code:"const [current, { inc, dec, set, reset }] = useCounter(...);\n",lang:"javascript"}),r.a.createElement("h3",{id:"5-values-type"},r.a.createElement(l["AnchorLink"],{to:"#5-values-type","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"5. values type"),r.a.createElement("p",null,"The output is multi-value type, the structure is ",r.a.createElement("code",null,"{","...values","}")),r.a.createElement(i["a"],{code:"const {text, left, right, ...} = useTextSelection();\n",lang:"javascript"}),r.a.createElement("h3",{id:"6-values-actions-type"},r.a.createElement(l["AnchorLink"],{to:"#6-values-actions-type","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"6. values actions type"),r.a.createElement("p",null,"The output is multi-value and multi-actions type, the structure is ",r.a.createElement("code",null,"{","...values, ...actions","}"),"\xa0\u3002"),r.a.createElement(i["a"],{code:"const {data, error, loading, run} = useRequest(...);\n",lang:"javascript"}),r.a.createElement("h2",{id:"parameter"},r.a.createElement(l["AnchorLink"],{to:"#parameter","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"Parameter"),r.a.createElement("p",null,"In principle, more than two parameters are not allowed."),r.a.createElement("h3",{id:"1-no-parameters"},r.a.createElement(l["AnchorLink"],{to:"#1-no-parameters","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"1. No parameters"),r.a.createElement("p",null,"Allow Hooks have no parameters."),r.a.createElement(i["a"],{code:"const documentVisibility = useDocumentVisibility();\n",lang:"javascript"}),r.a.createElement("h3",{id:"2-single-input"},r.a.createElement(l["AnchorLink"],{to:"#2-single-input","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"2. Single input"),r.a.createElement("p",null,"Direct input regardless of whether a single parameter is required."),r.a.createElement(i["a"],{code:"const size = useSize(dom);\n",lang:"javascript"}),r.a.createElement("h3",{id:"3-multiple-required-parameters"},r.a.createElement(l["AnchorLink"],{to:"#3-multiple-required-parameters","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"3. Multiple required parameters"),r.a.createElement("p",null,"The number of required parameters is less than 2, and should be input at the same level."),r.a.createElement(i["a"],{code:"const ref = useKeyPress(keyFilter, eventHandler);\n",lang:"javascript"}),r.a.createElement("p",null,"If there are more than two, they should be entered as an object."),r.a.createElement("h3",{id:"4-many-non-required-parameters"},r.a.createElement(l["AnchorLink"],{to:"#4-many-non-required-parameters","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"4. Many non-required parameters"),r.a.createElement("p",null,"Multiple non-required parameters are entered as objects."),r.a.createElement(i["a"],{code:"const result = useDrop({onText?, onFiles?, onURI?, onDOM?});\n\nconst result = useRequest(service, {\n  manual?,\n  initialData?,\n  onSuccess?,\n});\n",lang:"javascript"}),r.a.createElement("h3",{id:"5-required-parameters--non-required-parameters"},r.a.createElement(l["AnchorLink"],{to:"#5-required-parameters--non-required-parameters","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:["icon","icon-link"]})),"5. Required parameters + non-required parameters"),r.a.createElement("p",null,"Required parameters are before and non-required parameters are after."),r.a.createElement(i["a"],{code:"const result = useTextSelection(items, defaultSelected?);\n",lang:"javascript"})))}}}]);
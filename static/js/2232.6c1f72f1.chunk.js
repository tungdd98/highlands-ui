"use strict";(self.webpackChunkhighlands_ui=self.webpackChunkhighlands_ui||[]).push([[2232],{99176:function(e,r,t){var o=t(45987),n=t(1413),a=t(72791),i=t(47630),l=t(20890),s=t(91523),c=t(80184),d=["to","children","disabledHover","isActive"],u=(0,i.ZP)(s.rU,{shouldForwardProp:function(e){return"disabledHover"!==e}})((function(e){var r=e.theme,t=e.disabledHover;return(0,n.Z)({textDecoration:"none",color:"inherit",transition:r.transitions.create("color",{easing:r.transitions.easing.sharp,duration:r.transitions.duration.leavingScreen})},!t&&{"&:hover":{color:r.palette.primary.main}})})),m=function(e){var r=e.to,t=e.children,a=e.disabledHover,i=e.isActive,s=(0,o.Z)(e,d);return(0,c.jsx)(l.Z,(0,n.Z)((0,n.Z)({color:i?"primary":"secondary.contrastText"},s),{},{children:(0,c.jsx)(u,{disabledHover:a,to:r,children:t})}))};r.Z=(0,a.memo)(m)},52232:function(e,r,t){t.r(r);var o=t(72791),n=t(26445),a=t(64554),i=t(93517),l=t(20890),s=t(15897),c=t(99176),d=t(38463),u=t(80184),m=function(){var e=(0,s.$)().t,r=(0,d.CG)((function(e){return e.setting})).setting;return(0,u.jsxs)(n.Z,{children:[(0,u.jsx)(a.Z,{sx:{mt:2,mb:4},children:(0,u.jsxs)(i.Z,{"aria-label":"breadcrumb",children:[(0,u.jsx)(c.Z,{to:"/",children:e("common.Home",{ns:"client"})}),(0,u.jsx)(l.Z,{color:"text.primary",children:e("footer.Privacy",{ns:"client"})})]})}),(null===r||void 0===r?void 0:r.returnPolicy)&&(0,u.jsx)(a.Z,{dangerouslySetInnerHTML:{__html:r.returnPolicy}})]})};r.default=(0,o.memo)(m)},93517:function(e,r,t){t.d(r,{Z:function(){return M}});var o=t(93433),n=t(29439),a=t(4942),i=t(87462),l=t(63366),s=t(72791),c=(t(57441),t(28182)),d=t(90767),u=t(47630),m=t(93736),p=t(20890),h=t(12065),f=t(74223),g=t(80184),v=(0,f.Z)((0,g.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),x=t(23701),Z=(0,u.ZP)(x.Z,{skipSx:!0})((function(e){var r=e.theme;return(0,i.Z)({display:"flex",marginLeft:"calc(".concat(r.spacing(1)," * 0.5)"),marginRight:"calc(".concat(r.spacing(1)," * 0.5)")},"light"===r.palette.mode?{backgroundColor:r.palette.grey[100],color:r.palette.grey[700]}:{backgroundColor:r.palette.grey[700],color:r.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,i.Z)({},"light"===r.palette.mode?{backgroundColor:r.palette.grey[200]}:{backgroundColor:r.palette.grey[600]}),"&:active":(0,i.Z)({boxShadow:r.shadows[0]},"light"===r.palette.mode?{backgroundColor:(0,h._4)(r.palette.grey[200],.12)}:{backgroundColor:(0,h._4)(r.palette.grey[600],.12)})})})),b=(0,u.ZP)(v)({width:24,height:16});var y=function(e){var r=e;return(0,g.jsx)("li",{children:(0,g.jsx)(Z,(0,i.Z)({focusRipple:!0},e,{ownerState:r,children:(0,g.jsx)(b,{ownerState:r})}))})},j=t(95159);function C(e){return(0,j.Z)("MuiBreadcrumbs",e)}var S=(0,t(30208).Z)("MuiBreadcrumbs",["root","ol","li","separator"]),w=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],k=(0,u.ZP)(p.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,r){return[(0,a.Z)({},"& .".concat(S.li),r.li),r.root]}})({}),P=(0,u.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,r){return r.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),R=(0,u.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,r){return r.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function B(e,r,t,o){return e.reduce((function(n,a,i){return i<e.length-1?n=n.concat(a,(0,g.jsx)(R,{"aria-hidden":!0,className:r,ownerState:o,children:t},"separator-".concat(i))):n.push(a),n}),[])}var M=s.forwardRef((function(e,r){var t=(0,m.Z)({props:e,name:"MuiBreadcrumbs"}),a=t.children,u=t.className,p=t.component,h=void 0===p?"nav":p,f=t.expandText,v=void 0===f?"Show path":f,x=t.itemsAfterCollapse,Z=void 0===x?1:x,b=t.itemsBeforeCollapse,j=void 0===b?1:b,S=t.maxItems,R=void 0===S?8:S,M=t.separator,H=void 0===M?"/":M,A=(0,l.Z)(t,w),N=s.useState(!1),_=(0,n.Z)(N,2),I=_[0],T=_[1],z=(0,i.Z)({},t,{component:h,expanded:I,expandText:v,itemsAfterCollapse:Z,itemsBeforeCollapse:j,maxItems:R,separator:H}),L=function(e){var r=e.classes;return(0,d.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},C,r)}(z),q=s.useRef(null),D=s.Children.toArray(a).filter((function(e){return s.isValidElement(e)})).map((function(e,r){return(0,g.jsx)("li",{className:L.li,children:e},"child-".concat(r))}));return(0,g.jsx)(k,(0,i.Z)({ref:r,component:h,color:"text.secondary",className:(0,c.Z)(L.root,u),ownerState:z},A,{children:(0,g.jsx)(P,{className:L.ol,ref:q,ownerState:z,children:B(I||R&&D.length<=R?D:function(e){return j+Z>=e.length?e:[].concat((0,o.Z)(e.slice(0,j)),[(0,g.jsx)(y,{"aria-label":v,onClick:function(){T(!0);var e=q.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,o.Z)(e.slice(e.length-Z,e.length)))}(D),L.separator,H,z)})}))}))}}]);
//# sourceMappingURL=2232.6c1f72f1.chunk.js.map
"use strict";(self.webpackChunkhighlands_ui=self.webpackChunkhighlands_ui||[]).push([[1889],{61889:function(n,r,t){t.d(r,{ZP:function(){return W}});var i=t(93433),a=t(4942),e=t(63366),c=t(87462),o=t(72791),s=t(28182),u=t(51184),g=t(78519),p=t(90767),d=t(47630),m=t(93736);var l=o.createContext(),x=t(95159);function f(n){return(0,x.Z)("MuiGrid",n)}var v=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],S=(0,t(30208).Z)("MuiGrid",["root","container","item","zeroMinWidth"].concat((0,i.Z)([0,1,2,3,4,5,6,7,8,9,10].map((function(n){return"spacing-xs-".concat(n)}))),(0,i.Z)(["column-reverse","column","row-reverse","row"].map((function(n){return"direction-xs-".concat(n)}))),(0,i.Z)(["nowrap","wrap-reverse","wrap"].map((function(n){return"wrap-xs-".concat(n)}))),(0,i.Z)(v.map((function(n){return"grid-xs-".concat(n)}))),(0,i.Z)(v.map((function(n){return"grid-sm-".concat(n)}))),(0,i.Z)(v.map((function(n){return"grid-md-".concat(n)}))),(0,i.Z)(v.map((function(n){return"grid-lg-".concat(n)}))),(0,i.Z)(v.map((function(n){return"grid-xl-".concat(n)}))))),w=t(80184),h=["className","columns","columnSpacing","component","container","direction","item","lg","md","rowSpacing","sm","spacing","wrap","xl","xs","zeroMinWidth"];function b(n){var r=parseFloat(n);return"".concat(r).concat(String(n).replace(String(r),"")||"px")}function Z(n,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!r||!n||n<=0)return[];if("string"===typeof n&&!Number.isNaN(Number(n))||"number"===typeof n)return[t["spacing-xs-".concat(String(n))]||"spacing-xs-".concat(String(n))];var i=n.xs,a=n.sm,e=n.md,c=n.lg,o=n.xl;return[Number(i)>0&&(t["spacing-xs-".concat(String(i))]||"spacing-xs-".concat(String(i))),Number(a)>0&&(t["spacing-sm-".concat(String(a))]||"spacing-sm-".concat(String(a))),Number(e)>0&&(t["spacing-md-".concat(String(e))]||"spacing-md-".concat(String(e))),Number(c)>0&&(t["spacing-lg-".concat(String(c))]||"spacing-lg-".concat(String(c))),Number(o)>0&&(t["spacing-xl-".concat(String(o))]||"spacing-xl-".concat(String(o)))]}var k=(0,d.ZP)("div",{name:"MuiGrid",slot:"Root",overridesResolver:function(n,r){var t=n.ownerState,a=t.container,e=t.direction,c=t.item,o=t.lg,s=t.md,u=t.sm,g=t.spacing,p=t.wrap,d=t.xl,m=t.xs,l=t.zeroMinWidth;return[r.root,a&&r.container,c&&r.item,l&&r.zeroMinWidth].concat((0,i.Z)(Z(g,a,r)),["row"!==e&&r["direction-xs-".concat(String(e))],"wrap"!==p&&r["wrap-xs-".concat(String(p))],!1!==m&&r["grid-xs-".concat(String(m))],!1!==u&&r["grid-sm-".concat(String(u))],!1!==s&&r["grid-md-".concat(String(s))],!1!==o&&r["grid-lg-".concat(String(o))],!1!==d&&r["grid-xl-".concat(String(d))]])}})((function(n){var r=n.ownerState;return(0,c.Z)({boxSizing:"border-box"},r.container&&{display:"flex",flexWrap:"wrap",width:"100%"},r.item&&{margin:0},r.zeroMinWidth&&{minWidth:0},"nowrap"===r.wrap&&{flexWrap:"nowrap"},"reverse"===r.wrap&&{flexWrap:"wrap-reverse"})}),(function(n){var r=n.theme,t=n.ownerState,i=(0,u.P$)({values:t.direction,breakpoints:r.breakpoints.values});return(0,u.k9)({theme:r},i,(function(n){var r={flexDirection:n};return 0===n.indexOf("column")&&(r["& > .".concat(S.item)]={maxWidth:"none"}),r}))}),(function(n){var r=n.theme,t=n.ownerState,i=t.container,e=t.rowSpacing,c={};if(i&&0!==e){var o=(0,u.P$)({values:e,breakpoints:r.breakpoints.values});c=(0,u.k9)({theme:r},o,(function(n){var t=r.spacing(n);return"0px"!==t?(0,a.Z)({marginTop:"-".concat(b(t))},"& > .".concat(S.item),{paddingTop:b(t)}):{}}))}return c}),(function(n){var r=n.theme,t=n.ownerState,i=t.container,e=t.columnSpacing,c={};if(i&&0!==e){var o=(0,u.P$)({values:e,breakpoints:r.breakpoints.values});c=(0,u.k9)({theme:r},o,(function(n){var t=r.spacing(n);return"0px"!==t?(0,a.Z)({width:"calc(100% + ".concat(b(t),")"),marginLeft:"-".concat(b(t))},"& > .".concat(S.item),{paddingLeft:b(t)}):{}}))}return c}),(function(n){var r,t=n.theme,i=n.ownerState;return t.breakpoints.keys.reduce((function(n,a){var e={};if(i[a]&&(r=i[a]),!r)return n;if(!0===r)e={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===r)e={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{var o=(0,u.P$)({values:i.columns,breakpoints:t.breakpoints.values}),s="object"===typeof o?o[a]:o;if(void 0===s||null===s)return n;var g="".concat(Math.round(r/s*1e8)/1e6,"%"),p={};if(i.container&&i.item&&0!==i.columnSpacing){var d=t.spacing(i.columnSpacing);if("0px"!==d){var m="calc(".concat(g," + ").concat(b(d),")");p={flexBasis:m,maxWidth:m}}}e=(0,c.Z)({flexBasis:g,flexGrow:0,maxWidth:g},p)}return 0===t.breakpoints.values[a]?Object.assign(n,e):n[t.breakpoints.up(a)]=e,n}),{})})),W=o.forwardRef((function(n,r){var t,a=(0,m.Z)({props:n,name:"MuiGrid"}),u=(0,g.Z)(a),d=u.className,x=u.columns,v=u.columnSpacing,S=u.component,b=void 0===S?"div":S,W=u.container,M=void 0!==W&&W,N=u.direction,z=void 0===N?"row":N,G=u.item,P=void 0!==G&&G,y=u.lg,j=void 0!==y&&y,B=u.md,C=void 0!==B&&B,$=u.rowSpacing,R=u.sm,L=void 0!==R&&R,O=u.spacing,T=void 0===O?0:O,_=u.wrap,D=void 0===_?"wrap":_,F=u.xl,q=void 0!==F&&F,A=u.xs,E=void 0!==A&&A,H=u.zeroMinWidth,I=void 0!==H&&H,J=(0,e.Z)(u,h),K=$||T,Q=v||T,U=o.useContext(l),V=x||U||12,X=(0,c.Z)({},u,{columns:V,container:M,direction:z,item:P,lg:j,md:C,sm:L,rowSpacing:K,columnSpacing:Q,wrap:D,xl:q,xs:E,zeroMinWidth:I}),Y=function(n){var r=n.classes,t=n.container,a=n.direction,e=n.item,c=n.lg,o=n.md,s=n.sm,u=n.spacing,g=n.wrap,d=n.xl,m=n.xs,l={root:["root",t&&"container",e&&"item",n.zeroMinWidth&&"zeroMinWidth"].concat((0,i.Z)(Z(u,t)),["row"!==a&&"direction-xs-".concat(String(a)),"wrap"!==g&&"wrap-xs-".concat(String(g)),!1!==m&&"grid-xs-".concat(String(m)),!1!==s&&"grid-sm-".concat(String(s)),!1!==o&&"grid-md-".concat(String(o)),!1!==c&&"grid-lg-".concat(String(c)),!1!==d&&"grid-xl-".concat(String(d))])};return(0,p.Z)(l,f,r)}(X);return t=(0,w.jsx)(k,(0,c.Z)({ownerState:X,className:(0,s.Z)(Y.root,d),as:b,ref:r},J)),12!==V?(0,w.jsx)(l.Provider,{value:V,children:t}):t}))}}]);
//# sourceMappingURL=1889.48137ab2.chunk.js.map
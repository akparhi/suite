webpackJsonp([2],{749:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=n(a(750))},750:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=n(a(9)),o=n(a(8)),l=n(a(5)),i=n(a(0)),c=(n(a(2)),n(a(18))),s=n(a(13)),u=a(58),d=function(e){return{root:{display:"block",margin:0},display4:e.typography.display4,display3:e.typography.display3,display2:e.typography.display2,display1:e.typography.display1,headline:e.typography.headline,title:e.typography.title,subheading:e.typography.subheading,body2:e.typography.body2,body1:e.typography.body1,caption:e.typography.caption,button:e.typography.button,alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},alignJustify:{textAlign:"justify"},noWrap:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},gutterBottom:{marginBottom:"0.35em"},paragraph:{marginBottom:2*e.spacing.unit},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorTextSecondary:{color:e.palette.text.secondary},colorError:{color:e.palette.error.main}}};function p(e){var t,a=e.align,n=e.classes,s=e.className,d=e.component,p=e.color,f=e.gutterBottom,h=e.headlineMapping,m=e.noWrap,y=e.paragraph,g=e.variant,b=(0,l.default)(e,["align","classes","className","component","color","gutterBottom","headlineMapping","noWrap","paragraph","variant"]),v=(0,c.default)(n.root,n[g],(t={},(0,o.default)(t,n["color".concat((0,u.capitalize)(p))],"default"!==p),(0,o.default)(t,n.noWrap,m),(0,o.default)(t,n.gutterBottom,f),(0,o.default)(t,n.paragraph,y),(0,o.default)(t,n["align".concat((0,u.capitalize)(a))],"inherit"!==a),t),s),x=d||(y?"p":h[g])||"span";return i.default.createElement(x,(0,r.default)({className:v},b))}t.styles=d,p.propTypes={},p.defaultProps={align:"inherit",color:"default",gutterBottom:!1,headlineMapping:{display4:"h1",display3:"h1",display2:"h1",display1:"h1",headline:"h1",title:"h2",subheading:"h3",body2:"aside",body1:"p"},noWrap:!1,paragraph:!1,variant:"body1"};var f=(0,s.default)(d,{name:"MuiTypography"})(p);t.default=f},752:function(e,t,a){"use strict";t.__esModule=!0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=i(a(0)),o=i(a(2)),l=i(a(10));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)},u=function(e){function t(){var a,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return a=n=c(this,e.call.apply(e,[this].concat(o))),n.handleClick=function(e){if(n.props.onClick&&n.props.onClick(e),!e.defaultPrevented&&0===e.button&&!n.props.target&&!s(e)){e.preventDefault();var t=n.context.router.history,a=n.props,r=a.replace,o=a.to;r?t.replace(o):t.push(o)}},c(n,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.render=function(){var e=this.props,t=(e.replace,e.to),a=e.innerRef,o=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["replace","to","innerRef"]);(0,l.default)(this.context.router,"You should not use <Link> outside a <Router>");var i=this.context.router.history.createHref("string"===typeof t?{pathname:t}:t);return r.default.createElement("a",n({},o,{onClick:this.handleClick,href:i,ref:a}))},t}(r.default.Component);u.propTypes={onClick:o.default.func,target:o.default.string,replace:o.default.bool,to:o.default.oneOfType([o.default.string,o.default.object]).isRequired,innerRef:o.default.oneOfType([o.default.string,o.default.func])},u.defaultProps={replace:!1},u.contextTypes={router:o.default.shape({history:o.default.shape({push:o.default.func.isRequired,replace:o.default.func.isRequired,createHref:o.default.func.isRequired}).isRequired}).isRequired},t.default=u},753:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=n(a(754))},754:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=n(a(9)),o=n(a(8)),l=n(a(5)),i=n(a(19)),c=n(a(0)),s=(n(a(2)),n(a(18))),u=(n(a(3)),n(a(13))),d=function(e){var t={};return e.shadows.forEach(function(e,a){t["elevation".concat(a)]={boxShadow:e}}),(0,i.default)({root:{backgroundColor:e.palette.background.paper},rounded:{borderRadius:2}},t)};function p(e){var t=e.classes,a=e.className,n=e.component,i=e.square,u=e.elevation,d=(0,l.default)(e,["classes","className","component","square","elevation"]),p=(0,s.default)(t.root,t["elevation".concat(u)],(0,o.default)({},t.rounded,!i),a);return c.default.createElement(n,(0,r.default)({className:p},d))}t.styles=d,p.propTypes={},p.defaultProps={component:"div",elevation:2,square:!1};var f=(0,u.default)(d,{name:"MuiPaper"})(p);t.default=f},755:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(180)).default)(r.default.createElement("g",null,r.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"})),"CheckCircle");t.default=o},762:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),r=a.n(n),o=a(13),l=a.n(o),i=a(752),c=a.n(i),s=a(749),u=a.n(s),d=a(319),p=a.n(d),f=a(320),h=a.n(f),m=a(328),y=a.n(m),g=a(763),b=a.n(g),v=a(764),x=a(768);const E=e=>r.a.createElement(c.a,Object.assign({to:"/"},e)),O={container:{height:"100vh",display:"flex",flexDirection:"column"},theme:{position:"absolute",right:0,left:0,top:0,height:172,zIndex:-1,opacity:1,backgroundImage:`linear-gradient(to right bottom, rgb(118, 94, 230), rgb(28, 159, 255)), url(${b.a})`,backgroundRepeat:"repeat-x",backgroundSize:"cover, 1280px",backgroundPosition:"top",backgroundBlendMode:"hard-light"},header:{display:"flex",padding:"96px 16px 16px 16px"},homeButton:{color:"#fff"},title:{color:"#fff",marginLeft:2}};t.default=l()(O)(({classes:e})=>r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.theme}),r.a.createElement("div",{className:e.header},r.a.createElement(h.a,{component:E,size:"large","aria-label":"Home Link",className:e.homeButton},r.a.createElement(y.a,null)),r.a.createElement(u.a,{variant:"display1",gutterBottom:!0,className:e.title},"Tasks")),r.a.createElement(v.a,null),r.a.createElement(p.a,null),r.a.createElement(x.a,null)))},763:function(e,t,a){e.exports=a.p+"static/media/mars.e4d67818.jpg"},764:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(72),l=a(57),i=a(73),c=(a.n(i),a(13)),s=a.n(c),u=a(325),d=a.n(u),p=a(765);function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),n.forEach(function(t){h(e,t,a[t])})}return e}function h(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}t.a=Object(l.d)(Object(i.firebaseConnect)((e,t)=>[`tasks/${t.getState().firebase.auth.uid}`]),Object(o.b)(({firebase:{data:e,auth:t}})=>({uid:t.uid,tasks:e.tasks&&e.tasks[t.uid]})),s()({container:{height:"calc(100vh - 228px)"},tasksContainer:{height:"calc(100vh - 228px)",maxHeight:"calc(100vh - 228px)",overflowY:"scroll"},loader:{height:"calc(100vh - 228px)",display:"flex",alignItems:"center",justifyContent:"center"}}))(({classes:e,uid:t,tasks:a,firebase:n})=>{const o=Object(i.isLoaded)(a)?Object(i.isEmpty)(a)?null:((e,t)=>{let a=[],n=[];return Object.keys(t).forEach((e,r)=>{t[e].done?a.push(f({id:e},t[e])):n.push(f({id:e},t[e]))}),r.a.createElement("div",null,n.map(t=>r.a.createElement(p.a,{key:t.id,uid:e,task:t})),a.map(t=>r.a.createElement(p.a,{key:t.id,uid:e,task:t})))})(t,a):r.a.createElement("div",{className:e.loader},r.a.createElement(d.a,null));return r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.tasksContainer},o))})},765:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(57),l=a(72),i=a(73),c=(a.n(i),a(13)),s=a.n(c),u=a(749),d=a.n(u),p=a(753),f=a.n(p),h=a(319),m=a.n(h),y=a(320),g=a.n(y),b=a(766),v=a.n(b),x=a(755),E=a.n(x),O=a(767),k=a.n(O),j=a(321);t.a=Object(o.d)(s()({container:{height:68},body:{height:67,position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",zIndex:1,"&:hover":{zIndex:2,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)"}},bodyContent:{display:"flex",alignItems:"center"},complete:{color:"#34a853"},incomplete:{},task:{marginLeft:12}}),Object(l.b)(null,{showModal:j.b}),Object(i.firebaseConnect)())(({classes:e,firebase:t,uid:a,showModal:n,task:{id:o,title:l,details:i,done:c}})=>{const s=e=>()=>t.update(`tasks/${a}/${o}`,{done:e});return r.a.createElement("div",{className:e.container},r.a.createElement(f.a,{className:e.body,elevation:0},r.a.createElement("div",{className:e.bodyContent},c?r.a.createElement(g.a,{onClick:s(!1)},r.a.createElement(E.a,{className:e.complete})):r.a.createElement(g.a,{onClick:s(!0)},r.a.createElement(v.a,null)),r.a.createElement("div",{className:e.task},r.a.createElement(d.a,{variant:"body1"},l),i&&r.a.createElement(d.a,{variant:"caption",gutterBottom:!0},i.length>77?`${i.substr(0,77)}..`:i))),r.a.createElement("div",null,r.a.createElement(g.a,{onClick:()=>n("EDIT_TASK",{id:o,title:l,details:i,done:c})},r.a.createElement(k.a,null)))),r.a.createElement(m.a,null))})},766:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(180)).default)(r.default.createElement("g",null,r.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"})),"RadioButtonUnchecked");t.default=o},767:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(180)).default)(r.default.createElement("g",null,r.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})),"Edit");t.default=o},768:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(57),l=a(72),i=a(13),c=a.n(i),s=a(318),u=a.n(s),d=a(769),p=a.n(d),f=a(321);t.a=Object(o.d)(c()({container:{height:55,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 16px"},buttonContainer:{marginTop:-55,position:"relative",zIndex:3},button:{borderRadius:100,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)"}}),Object(l.b)(null,{showModal:f.b}))(({classes:e,showModal:t})=>r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.buttonContainer},r.a.createElement(u.a,{size:"large",variant:"raised",className:e.button,color:"primary",onClick:()=>t("EDIT_TASK")},r.a.createElement(p.a,{className:e.addIcon}),"Add a task"))))},769:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(180)).default)(r.default.createElement("g",null,r.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})),"Add");t.default=o}});
//# sourceMappingURL=2.20e4b886.chunk.js.map
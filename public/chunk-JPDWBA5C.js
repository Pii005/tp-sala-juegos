import{b as Y,d as Z,e as ee,g as te,i as ne,j as ie,r as ae,s as oe,t as re}from"./chunk-ECIBISDZ.js";import{$ as F,Ba as $,C as s,D as p,Ea as z,H as x,J as d,L as i,M as o,Ma as H,N as c,O as E,Oa as J,P as k,Pa as K,Q as P,Qa as y,R as g,S as w,U as I,Ua as U,V as N,Va as X,W as D,X as r,Y as h,_ as T,aa as V,c as _,fa as W,g as j,ga as M,ha as R,ia as A,l as S,o as O,q as m,qa as B,ra as L,sa as Q,ta as q,ua as G,v as b,w as C}from"./chunk-FDQTLZNO.js";var f=class n{constructor(t){this.firestore=t;this.chatCollection=y(this.firestore,"chat")}chatCollection;enviarMensaje(t){let e=y(this.firestore,"chat");return K(e,t)}obtenerMensajes(){let t=X(this.chatCollection,U("fechaEnvio","asc"));return J(t)}static \u0275fac=function(e){return new(e||n)(O(H))};static \u0275prov=S({token:n,factory:n.\u0275fac,providedIn:"root"})};var de=["chatMessages"],ge=(n,t)=>({"message-own":n,"message-other":t});function he(n,t){if(n&1&&(E(0),i(1,"strong"),r(2),o(),k()),n&2){let e=w().$implicit;s(2),h(e.email)}}function fe(n,t){if(n&1&&(i(0,"div",8),x(1,he,3,1,"ng-container",9),i(2,"span"),r(3),o(),c(4,"br"),i(5,"span",10),r(6),M(7,"date"),o()()),n&2){let e=t.$implicit,a=w();d("ngClass",W(7,ge,e.email===a.email,e.email!==a.email)),s(),d("ngIf",e.email!==a.email),s(2),h(e.mensaje),s(3),h(A(7,4,a.convertirTimestampAFecha(e.fechaEnvio),"short"))}}var u=class n{constructor(t){this.chatService=t}nuevoMensaje="";email="";mensajes$=j([]);chatMessagesContainer;ngOnInit(){this.email=localStorage.getItem("userEmail")||"",this.mensajes$=this.chatService.obtenerMensajes()}ngAfterViewChecked(){this.scrollToBottom()}enviarMensaje(){return _(this,null,function*(){if(this.email){if(this.nuevoMensaje.trim()){let t={email:this.email,mensaje:this.nuevoMensaje,fechaEnvio:z.fromDate(new Date)};try{yield this.chatService.enviarMensaje(t),this.nuevoMensaje=""}catch(e){console.error("Error al enviar el mensaje:",e)}}}else console.log("No est\xE1 registrado el usuario")})}convertirTimestampAFecha(t){return t?t.toDate():null}scrollToBottom(){this.chatMessagesContainer&&(this.chatMessagesContainer.nativeElement.scrollTop=this.chatMessagesContainer.nativeElement.scrollHeight)}static \u0275fac=function(e){return new(e||n)(p(f))};static \u0275cmp=m({type:n,selectors:[["app-chat-window"]],viewQuery:function(e,a){if(e&1&&I(de,5),e&2){let l;N(l=D())&&(a.chatMessagesContainer=l.first)}},decls:10,vars:4,consts:[["chatMessages",""],[1,"chat-window"],[1,"chat-messages"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngSubmit"],[1,"input-group","mb-3"],["type","text","placeholder","Escribe tu mensaje...","name","mensaje","minlength","1","maxlength","50","required","",1,"form-control",3,"ngModelChange","ngModel"],["type","submit",1,"btn","btn-primary"],[3,"ngClass"],[4,"ngIf"],[1,"fecha"]],template:function(e,a){if(e&1){let l=P();i(0,"div",1)(1,"div",2,0),x(3,fe,8,10,"div",3),M(4,"async"),o(),i(5,"form",4),g("ngSubmit",function(){return b(l),C(a.enviarMensaje())}),i(6,"div",5)(7,"input",6),V("ngModelChange",function(v){return b(l),F(a.nuevoMensaje,v)||(a.nuevoMensaje=v),C(v)}),o(),i(8,"button",7),r(9,"Enviar"),o()()()()}e&2&&(s(3),d("ngForOf",R(4,2,a.mensajes$)),s(4),T("ngModel",a.nuevoMensaje))},dependencies:[B,L,Q,ie,Y,Z,ee,ae,oe,re,ne,te,q,G],styles:[".chat-window[_ngcontent-%COMP%]{border:1px solid #ccc;padding:10px;max-width:800px;max-height:690px;margin:20px auto;display:flex;flex-direction:column}.chat-messages[_ngcontent-%COMP%]{max-height:800px;overflow-y:auto;margin-bottom:20px;background-color:#f9f9f9}.mensaje[_ngcontent-%COMP%]{margin-bottom:20px;padding:5px;border-radius:5px;background-color:#ccc8c8}.message-own[_ngcontent-%COMP%]{background-color:#fff;color:#000;text-align:right;margin-left:auto;border-radius:10px 10px 0;padding:10px;max-width:70%}.message-other[_ngcontent-%COMP%]{background-color:#fff;color:#000;text-align:left;margin-right:auto;border-radius:10px 10px 10px 0;padding:10px;max-width:70%}.fecha[_ngcontent-%COMP%]{font-size:.8em;color:#888}.input-message[_ngcontent-%COMP%]{display:flex;justify-content:space-between}input[_ngcontent-%COMP%]{flex:1;padding:10px;border-radius:5px;border:1px solid #ccc;margin-right:10px}button[_ngcontent-%COMP%]{padding:10px 15px;border-radius:5px;border:none;background-color:#fff;color:#fff;cursor:pointer}"]})};var ce=class n{constructor(t){this.router=t}goTo(t){this.router.navigate([t])}static \u0275fac=function(e){return new(e||n)(p($))};static \u0275cmp=m({type:n,selectors:[["app-chat"]],decls:18,vars:0,consts:[["data-bs-theme","dark",1,"navbar","navbar-expand-lg","bg-body-tertiary","bg-dark"],[1,"container-fluid"],["href","#",1,"navbar-brand"],["src","assets/logoGame.png","alt","Logo mando","width","30","height","24"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarNav","aria-controls","navbarNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarNav",1,"collapse","navbar-collapse"],[1,"navbar-nav"],[1,"nav-item"],["aria-current","page",1,"nav-link","active",3,"click"],["role","search",1,"d-flex","ms-auto","nav-item"],[1,"content-with-bg"],[1,"chat-container"],[1,"chat-box"]],template:function(e,a){e&1&&(i(0,"nav",0)(1,"div",1)(2,"a",2),c(3,"img",3),o(),i(4,"a",2),r(5,"P1 Games"),o(),i(6,"button",4),c(7,"span",5),o(),i(8,"div",6)(9,"ul",7)(10,"li",8)(11,"a",9),g("click",function(){return a.goTo("home")}),r(12,"Home"),o()()(),c(13,"div",10),o()()(),i(14,"div",11)(15,"div",12)(16,"div",13),c(17,"app-chat-window"),o()()())},dependencies:[u],styles:["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{overflow:hidden;height:100%}.content-with-bg[_ngcontent-%COMP%]{background-image:url(/assets/home.jpeg);background-size:cover;background-position:center;background-repeat:no-repeat;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:20px 0}.chat-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.chat-box[_ngcontent-%COMP%]{width:50%;height:80vh;background-color:#fff;border-radius:8px;box-shadow:0 4px 8px #0000001a;display:flex;flex-direction:column;padding:20px;overflow-y:auto}"]})};export{ce as a};
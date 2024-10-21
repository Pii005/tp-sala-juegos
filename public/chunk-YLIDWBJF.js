import{b as w,c,d as M,e as F,f as P,h,j as O,m as R,n as T,v as L,w as N}from"./chunk-ECIBISDZ.js";import{Aa as S,Ba as I,C as l,D as g,Da as V,H as m,Ha as k,J as s,Ja as H,L as o,La as J,M as i,Ma as K,N as u,O as v,P as x,Qa as Q,R as p,S as d,Sa as X,Va as Y,X as a,Xa as Z,Z as U,c as _,ca as C,l as G,m as z,o as W,q as b,r as B,sa as E,va as y}from"./chunk-FDQTLZNO.js";function oe(t,r){t&1&&(o(0,"small",14),a(1,"El email es requerido"),i())}function ae(t,r){t&1&&(o(0,"small",14),a(1,"Formato incorrecto"),i())}function le(t,r){if(t&1&&(v(0),m(1,oe,2,0,"small",13)(2,ae,2,0,"small",13),x()),t&2){let e=d();l(),s("ngIf",e.email==null?null:e.email.hasError("required")),l(),s("ngIf",e.email==null?null:e.email.hasError("email"))}}function se(t,r){t&1&&(v(0),o(1,"small",14),a(2,"El email no est\xE1 registrado"),i(),x())}function me(t,r){t&1&&(o(0,"small",14),a(1,"La contrase\xF1a es requerida"),i())}function ce(t,r){if(t&1&&(o(0,"small",14),a(1),i()),t&2){let e=d(2);l(),U("M\xEDnimo ",e.contra==null?null:e.contra.getError("minlength").requiredLength," caracteres")}}function ue(t,r){if(t&1&&(v(0),m(1,me,2,0,"small",13)(2,ce,2,1,"small",13),x()),t&2){let e=d();l(),s("ngIf",e.contra==null?null:e.contra.hasError("required")),l(),s("ngIf",e.contra==null?null:e.contra.hasError("minlength"))}}function pe(t,r){if(t&1&&(o(0,"div",15),a(1),i()),t&2){let e=d();l(),U(" ",e.msgError," ")}}var j=class t{constructor(r,e){this.router=r;this.auth=e}form;flagError=!1;msgError="";ngOnInit(){console.log("Ingresando..."),this.form=new P({email:new h("",[c.required,c.email]),contra:new h("",[c.required])})}goTo(r){this.router.navigate([r])}enviarForm(){return _(this,null,function*(){if(this.flagError=!1,this.form.valid){let r=this.form.get("email")?.value,e=this.form.get("contra")?.value;try{yield this.loginUser(r,e)}catch(n){switch(n.code){case"auth/invalid-email":this.msgError="El mail o contrase\xF1a incorrectas";break;case"auth/invalid-credential":this.msgError="El mail o contrase\xF1a incorrectas";break;case"auth/too-many-requests":this.msgError="Se enviaron muchos solicitudos, espere un momento";break;default:this.msgError="Error, revisar los datos enviados"+n.code}this.flagError=!0}}else this.msgError="Formulario inv\xE1lido",this.flagError=!0})}loginUser(r,e){return _(this,null,function*(){try{let n=yield J(this.auth,r,e);console.log("Usuario autenticado:",n.user),localStorage.setItem("userEmail",r),this.goTo("home")}catch(n){throw n}})}get email(){return this.form.get("email")}get contra(){return this.form.get("contra")}static \u0275fac=function(e){return new(e||t)(g(I),g(k))};static \u0275cmp=b({type:t,selectors:[["app-login"]],standalone:!0,features:[C],decls:25,vars:5,consts:[[1,"formulario"],[1,"login-container"],[3,"ngSubmit","formGroup"],[1,"ingresos"],["for","email"],["type","email","formControlName","email",1,"input-field"],[4,"ngIf"],["for","contra"],["type","password","formControlName","contra",1,"input-field"],["class","error-message",4,"ngIf"],["type","submit",1,"btn","btn-submit"],[1,"button-container"],["type","button",1,"btn","btn-regis",3,"click"],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"error-message"]],template:function(e,n){e&1&&(o(0,"div",0)(1,"div",1)(2,"form",2),p("ngSubmit",function(){return n.enviarForm()}),o(3,"h2"),a(4,"Iniciar sesion"),i(),o(5,"div",3)(6,"label",4),a(7,"Email"),i(),u(8,"input",5),m(9,le,3,2,"ng-container",6)(10,se,3,0,"ng-container",6),i(),o(11,"div",3)(12,"label",7),a(13,"Contrase\xF1a"),i(),u(14,"input",8),m(15,ue,3,2,"ng-container",6),i(),m(16,pe,2,1,"div",9),o(17,"button",10),a(18,"Ingresar"),i(),o(19,"div",11)(20,"button",12),p("click",function(){return n.goTo("auth/register")}),a(21,"Registrarse"),i(),o(22,"button",12),p("click",function(){return n.goTo("home")}),a(23,"Volver"),i()()()()(),u(24,"router-outlet")),e&2&&(l(2),s("formGroup",n.form),l(7),s("ngIf",(n.email==null?null:n.email.invalid)&&(n.email==null?null:n.email.touched)),l(),s("ngIf",(n.email==null?null:n.email.hasError("emailNotExists"))&&(n.email==null?null:n.email.touched)),l(5),s("ngIf",(n.contra==null?null:n.contra.invalid)&&(n.contra==null?null:n.contra.touched)),l(),s("ngIf",n.flagError))},dependencies:[S,y,E,L,O,w,M,F,N,R,T],styles:[".formulario[_ngcontent-%COMP%]{overflow:hidden;font-family:Arial,sans-serif;background-image:url(/../../assets/home.jpeg);background-size:cover;background-position:center;background-repeat:no-repeat;min-height:100vh;display:flex;justify-content:center;align-items:center;margin:0}.login-container[_ngcontent-%COMP%]{background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px #0000001a;width:80%;max-width:600px;display:flex;flex-direction:column}.login-text[_ngcontent-%COMP%]{flex:1;text-align:left;padding-right:40px}h2[_ngcontent-%COMP%]{font-size:2rem;margin-bottom:10px}.login-form[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.input-field[_ngcontent-%COMP%]{padding:12px;margin:10px 0;border:1px solid #ccc;border-radius:4px;width:100%}.ingresos[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.form-control[_ngcontent-%COMP%]{padding:12px;margin:0;border:1px solid #ccc;border-radius:4px;width:100%}.btn[_ngcontent-%COMP%]{padding:12px;background-color:#4079d5;color:#fff;border:none;border-radius:4px;cursor:pointer;width:100%;margin-bottom:10px}.btn[_ngcontent-%COMP%]:hover{background-color:#2f60ae}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.btn-regis[_ngcontent-%COMP%]{width:48%;background-color:#759ad7}.btn-regis[_ngcontent-%COMP%]{padding:10px;width:45%;background-color:#759ad7;align-self:center;border:none;border-radius:4px;color:#fff;cursor:pointer;margin-left:10px;margin-right:0;margin-top:10px}.error-message[_ngcontent-%COMP%]{color:red}"]})};var A=class t{constructor(r){this.firestore=r}checkIfUserExists(r){return _(this,null,function*(){let e=Q(this.firestore,"Usuarios"),n=Y(e,Z("user","==",r));return!(yield X(n)).empty})}static \u0275fac=function(e){return new(e||t)(W(K))};static \u0275prov=G({token:t,factory:t.\u0275fac,providedIn:"root"})};function ge(t,r){t&1&&(o(0,"span"),a(1,"El campo de email es obligatorio."),i())}function fe(t,r){t&1&&(o(0,"span"),a(1,"Por favor, ingresa un email v\xE1lido."),i())}function he(t,r){t&1&&(o(0,"span"),a(1,"El email ya est\xE1 en uso."),i())}function _e(t,r){if(t&1&&(o(0,"div",12),m(1,ge,2,0,"span",13)(2,fe,2,0,"span",13)(3,he,2,0,"span",13),i()),t&2){let e=d();l(),s("ngIf",e.email.errors.required),l(),s("ngIf",e.email.errors.email),l(),s("ngIf",e.email.errors.emailExists)}}function be(t,r){t&1&&(o(0,"span"),a(1,"El campo de contrase\xF1a es obligatorio."),i())}function ve(t,r){t&1&&(o(0,"span"),a(1,"La contrase\xF1a debe tener al menos 6 caracteres."),i())}function xe(t,r){if(t&1&&(o(0,"div",12),m(1,be,2,0,"span",13)(2,ve,2,0,"span",13),i()),t&2){let e=d();l(),s("ngIf",e.contra.errors.required),l(),s("ngIf",e.contra.errors.minlength)}}var q=class t{constructor(r,e,n){this.router=r;this.auth=e;this.userCheckService=n}form;loggesUser="";flagError=!1;msgError="";countLogins=0;sub;goTo(r){this.router.navigate([r])}ngOnInit(){this.form=new P({email:new h("",[c.required,c.email],[this.emailExistsValidator.bind(this)]),contrasenia:new h("",[c.required,c.minLength(6)])})}emailExistsValidator(r){return r.value?this.userCheckService.checkIfUserExists(r.value).then(e=>e?{emailExists:!0}:null).catch(()=>null):Promise.resolve(null)}enviarForm(){this.msgError="",this.form.valid?(this.flagError=!1,this.registarUsuario()):(this.msgError=this.getFormErrors()||"Formulario inv\xE1lido",this.flagError=!0)}getFormErrors(){let r=this.email?.errors,e=this.contra?.errors;if(r){if(r.required)return"El campo de email es obligatorio.";if(r.email)return"Por favor, ingresa un email v\xE1lido.";if(r.emailExists)return"El email ya est\xE1 en uso."}if(e){if(e.required)return"El campo de contrase\xF1a es obligatorio.";if(e.minlength)return"La contrase\xF1a debe tener al menos 6 caracteres."}return""}registarUsuario(){let r=this.form.get("email")?.value,e=this.form.get("contrasenia")?.value;if(!this.form.valid){this.msgError="El formulario no es v\xE1lido.",this.flagError=!0;return}this.crearUsuario(r,e)}crearUsuario(r,e){if(!r||!e){this.msgError="Por favor, ingresa el email y la contrase\xF1a.";return}H(this.auth,r,e).then(()=>{localStorage.setItem("userEmail",r),console.log("Usuario creado con Firebase Authentication."),this.goTo("home")}).catch(n=>{console.error("Error al crear el usuario:",n),this.msgError="Error al crear el usuario: "+n.message})}get email(){return this.form.get("email")}get contra(){return this.form.get("contrasenia")}static \u0275fac=function(e){return new(e||t)(g(I),g(k),g(A))};static \u0275cmp=b({type:t,selectors:[["app-register"]],standalone:!0,features:[C],decls:21,vars:3,consts:[[1,"formulario"],[1,"login-container"],[3,"ngSubmit","formGroup"],[1,"ingresos"],["for","email"],["id","email","formControlName","email",1,"input-field"],["class","error-message",4,"ngIf"],["for","contrasenia"],["id","contrasenia","type","password","formControlName","contrasenia",1,"input-field"],[1,"button-container"],["type","submit","type","button",1,"btn","btn-regis",3,"click"],["type","button",1,"btn","btn-regis",3,"click"],[1,"error-message"],[4,"ngIf"]],template:function(e,n){e&1&&(o(0,"div",0)(1,"div",1)(2,"form",2),p("ngSubmit",function(){return n.enviarForm()}),o(3,"h2"),a(4,"Registro"),i(),o(5,"div",3)(6,"label",4),a(7,"Email:"),i(),u(8,"input",5),m(9,_e,4,3,"div",6),i(),o(10,"div",3)(11,"label",7),a(12,"Contrase\xF1a:"),i(),u(13,"input",8),m(14,xe,3,2,"div",6),i(),o(15,"div",9)(16,"button",10),p("click",function(){return n.enviarForm()}),a(17,"Registrar"),i(),o(18,"button",11),p("click",function(){return n.goTo("auth/login")}),a(19,"Volver"),i()()()()(),u(20,"router-outlet")),e&2&&(l(2),s("formGroup",n.form),l(7),s("ngIf",n.email&&n.email.errors&&(n.email.touched||n.email.dirty)),l(5),s("ngIf",n.contra&&n.contra.errors&&(n.contra.touched||n.contra.dirty)))},dependencies:[S,y,E,L,O,w,M,F,N,R,T],styles:[".formulario[_ngcontent-%COMP%]{overflow:hidden;font-family:Arial,sans-serif;background-image:url(/../../assets/home.jpeg);background-size:cover;background-position:center;background-repeat:no-repeat;min-height:100vh;display:flex;justify-content:center;align-items:center;margin:0}.login-container[_ngcontent-%COMP%]{background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px #0000001a;width:80%;max-width:600px;display:flex;flex-direction:column}.login-text[_ngcontent-%COMP%]{flex:1;text-align:left;padding-right:40px}h2[_ngcontent-%COMP%]{font-size:2rem;margin-bottom:10px}.login-form[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.input-field[_ngcontent-%COMP%]{padding:12px;margin:10px 0;border:1px solid #ccc;border-radius:4px;width:100%}.ingresos[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.form-control[_ngcontent-%COMP%]{padding:12px;margin:0;border:1px solid #ccc;border-radius:4px;width:100%}.btn[_ngcontent-%COMP%]{padding:12px;background-color:#4079d5;color:#fff;border:none;border-radius:4px;cursor:pointer;width:100%;margin-bottom:10px}.btn[_ngcontent-%COMP%]:hover{background-color:#2f60ae}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.btn-regis[_ngcontent-%COMP%]{width:48%;background-color:#759ad7}.btn-regis[_ngcontent-%COMP%]{padding:10px;width:45%;background-color:#759ad7;align-self:center;border:none;border-radius:4px;color:#fff;cursor:pointer;margin-left:10px;margin-right:0;margin-top:10px}.error-message[_ngcontent-%COMP%]{color:red}"]})};var $=class t{static \u0275fac=function(e){return new(e||t)};static \u0275mod=B({type:t});static \u0275inj=z({imports:[V.forChild([{path:"login",component:j},{path:"register",component:q}]),V]})};export{$ as AutenticacionModule};

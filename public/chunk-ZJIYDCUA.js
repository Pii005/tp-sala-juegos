import{A as S,B as l,C as u,Ca as H,Fa as $,G as y,Ga as q,Ha as J,I as m,Ia as K,K as a,L as o,La as Q,M as d,Ma as W,Na as X,P as w,Q as c,R as O,S as M,T as i,U as x,V as h,_ as g,c as B,k as v,ka as N,l as z,n as U,oa as _,p,q as V,ra as E,ta as G,u as k,v as P}from"./chunk-A3M5OZKA.js";var I=class r{palabras=["mariposa","flores","perro","gato","margaritas","programacion","typescrip","html"];constructor(){}getPalabraAleatoria(){let e=Math.floor(Math.random()*this.palabras.length);return this.palabras[e]}static \u0275fac=function(t){return new(t||r)};static \u0275prov=v({token:r,factory:r.\u0275fac,providedIn:"root"})};var C=class r{constructor(e){this.firestore=e}guardarPuntos(e,t){return B(this,null,function*(){let n=q(this.firestore,t),s=Q(n,X("email","==",e.email)),b=yield K(s);if(b.empty)return yield $(n,e);{let D=b.docs[0],ee=(D.data().puntos||0)+e.puntos,te=J(this.firestore,`${t}/${D.id}`);return yield W(te,{puntos:ee})}})}static \u0275fac=function(t){return new(t||r)(U(H))};static \u0275prov=v({token:r,factory:r.\u0275fac,providedIn:"root"})};function re(r,e){if(r&1){let t=w();a(0,"button",20),c("click",function(){let s=k(t).$implicit,b=O();return P(b.seleccionarLetra(s))}),i(1),o()}if(r&2){let t=e.$implicit;l(),h(" ",t," ")}}var j=class r{constructor(e,t,n){this.router=e;this.PalabraService=t;this.userPoints=n}email="";ocultarBotones=!0;ocultarTeclado=!1;puntos=0;letras=[];letrasSeleccionadas="";palabraAdivinar="";palabraReal="";intentos=0;imagenes="assets/1.png";finjuego="";goTo(e){this.guardarPuntos(),this.router.navigate([e])}ngOnInit(){this.email=localStorage.getItem("userEmail")||"",this.generarLetras(),this.palabraReal=this.PalabraService.getPalabraAleatoria(),this.palabraAdivinar=this.palabraReal.split("").map(()=>"_").join(" ")}generarLetras(){this.letras=[];for(let e=65;e<=90;e++)this.letras.push(String.fromCharCode(e))}seleccionarLetra(e){this.letrasSeleccionadas+=e+" ",this.actualizarPalabra(e),this.eliminarletras(e)}actualizarPalabra(e){let t=this.palabraAdivinar.split(" "),n=!1;for(let s=0;s<this.palabraReal.length;s++)this.palabraReal[s].toUpperCase()===e&&(t[s]=e,n=!0);if(n&&(this.puntos+=15),!n)switch(this.intentos+=1,this.puntos-=5,console.log("Intentos: "+this.intentos),this.intentos){case 1:this.imagenes="assets/2.png";break;case 2:this.imagenes="assets/3.png";break;case 3:this.imagenes="assets/4.png";break;case 4:this.imagenes="assets/5.png";break;case 5:this.imagenes="assets/6.png";break;case 6:this.imagenes="assets/gameover.png",this.ocultarTeclado=!0,this.ocultarBotones=!1;break;default:this.imagenes="assets/1.png"}this.palabraAdivinar=t.join(" "),this.palabraAdivinar.replace(/ /g,"")===this.palabraReal.toUpperCase()&&this.win()}win(){this.finjuego="\xA1Felicidades! Has adivinado la palabra",this.imagenes="assets/finjuego.png",this.ocultarTeclado=!0,this.ocultarBotones=!1}Reinicio(){this.guardarPuntos(),this.puntos=0,this.intentos=0,this.imagenes="assets/1.png",this.letrasSeleccionadas="",this.generarLetras(),this.ocultarTeclado=!1,this.ocultarBotones=!0,this.palabraReal=this.PalabraService.getPalabraAleatoria(),this.palabraAdivinar=this.palabraReal.split("").map(()=>"_").join(" "),this.finjuego=""}guardarPuntos(){let e={email:this.email,puntos:+this.puntos};this.userPoints.guardarPuntos(e,"ahorcadogame").then(()=>{console.log("puntos guardados")}).catch(t=>{console.log("error en guardar puntos")})}eliminarletras(e){let t=this.letras.indexOf(e);t!==-1&&this.letras.splice(t,1)}static \u0275fac=function(t){return new(t||r)(u(E),u(I),u(C))};static \u0275cmp=p({type:r,selectors:[["app-ahorcado-game"]],standalone:!0,features:[g],decls:35,vars:7,consts:[["data-bs-theme","dark",1,"navbar","navbar-expand-lg","bg-body-tertiary","bg-dark"],[1,"container-fluid"],["href","#",1,"navbar-brand"],["src","assets/logoGame.png","alt","Logo mando","width","30","height","24"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarNav","aria-controls","navbarNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarNav",1,"collapse","navbar-collapse"],[1,"navbar-nav"],[1,"nav-item"],["aria-current","page",1,"nav-link","active",3,"click"],["role","search",1,"d-flex","ms-auto","nav-item"],["aria-current","page",1,"nav-link","active"],[1,"juego-container"],[1,"pantalla-letras"],[1,"ahorcado"],["alt","Imagen ahorcado","with","300","height","350",3,"src"],[1,"teclado",3,"hidden"],[3,"click",4,"ngFor","ngForOf"],[1,"button-container","container",3,"hidden"],[1,"btn","btn-regis",3,"click"],[3,"click"]],template:function(t,n){t&1&&(a(0,"nav",0)(1,"div",1)(2,"a",2),d(3,"img",3),o(),a(4,"a",2),i(5,"P1 Games"),o(),a(6,"button",4),d(7,"span",5),o(),a(8,"div",6)(9,"ul",7)(10,"li",8)(11,"a",9),c("click",function(){return n.goTo("home")}),i(12,"Home"),o()()(),a(13,"div",10)(14,"ul",7)(15,"li",8)(16,"a",11),i(17),o()()()()()()(),a(18,"div",12)(19,"div",13)(20,"h3"),i(21,"Palabra a adivinar:"),o(),a(22,"p"),i(23),o(),a(24,"div",14)(25,"p"),i(26),o(),d(27,"img",15),o()(),a(28,"div",16),y(29,re,2,1,"button",17),o(),a(30,"div",18)(31,"button",19),c("click",function(){return n.goTo("home")}),i(32,"Salir"),o(),a(33,"button",19),c("click",function(){return n.Reinicio()}),i(34,"Reiniciar"),o()()()),t&2&&(l(17),h("Puntos: ",n.puntos,""),l(6),x(n.palabraAdivinar),l(3),x(n.finjuego),l(),M("src",n.imagenes,S),l(),m("hidden",n.ocultarTeclado),l(),m("ngForOf",n.letras),l(),m("hidden",n.ocultarBotones))},dependencies:[_,N],styles:['.juego-container[_ngcontent-%COMP%]{background-image:url("./media/home-3TMMHVDL.jpeg");background-size:cover;background-position:center;background-repeat:no-repeat;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding-top:0}.teclado[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;max-width:600px;margin:20px auto;gap:10px}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:10px 15px;font-size:16px;border-radius:5px;border:none;background-color:#056ddb;color:#fff;cursor:pointer}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0dafd8}.pantalla-letras[_ngcontent-%COMP%]{color:#fff;text-align:center;margin-bottom:20px}.pantalla-letras[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:24px;font-weight:700}.btn[_ngcontent-%COMP%]{padding:12px;background-color:#4079d5;color:#fff;border:none;border-radius:4px;cursor:pointer;width:100%;margin-bottom:10px}.btn[_ngcontent-%COMP%]:hover{background-color:#2f60ae}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.btn-regis[_ngcontent-%COMP%]{width:48%;background-color:#759ad7}.btn-regis[_ngcontent-%COMP%]{padding:10px;width:45%;background-color:#759ad7;align-self:center;border:none;border-radius:4px;color:#fff;cursor:pointer;margin-left:10px;margin-right:0;margin-top:10px}.container[_ngcontent-%COMP%]{background-color:#3b4185;padding:20px;border-radius:8px;box-shadow:0 0 10px #0000001a;width:80%;max-width:600px;display:flex}']})};var T=class r{static \u0275fac=function(t){return new(t||r)};static \u0275cmp=p({type:r,selectors:[["app-mayormenor"]],standalone:!0,features:[g],decls:18,vars:0,consts:[["data-bs-theme","dark",1,"navbar","navbar-expand-lg","bg-body-tertiary","bg-dark"],[1,"container-fluid"],["href","#",1,"navbar-brand"],["src","assets/logoGame.png","alt","Logo mando","width","30","height","24"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarNav","aria-controls","navbarNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarNav",1,"collapse","navbar-collapse"],[1,"navbar-nav"],[1,"nav-item"],["aria-current","page",1,"nav-link","active"],["role","search",1,"d-flex","ms-auto","nav-item"]],template:function(t,n){t&1&&(a(0,"nav",0)(1,"div",1)(2,"a",2),d(3,"img",3),o(),a(4,"a",2),i(5,"P1 Games"),o(),a(6,"button",4),d(7,"span",5),o(),a(8,"div",6)(9,"ul",7)(10,"li",8)(11,"a",9),i(12,"Home"),o()()(),a(13,"div",10)(14,"ul",7)(15,"li",8)(16,"a",9),i(17,"Puntos: "),o()()()()()()())}})};var A=class r{static \u0275fac=function(t){return new(t||r)};static \u0275cmp=p({type:r,selectors:[["app-preguntados"]],standalone:!0,features:[g],decls:2,vars:0,template:function(t,n){t&1&&(a(0,"p"),i(1,"preguntados works!"),o())}})};var R=class r{numeros=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];constructor(){}obtenernumeros(e){if(e>this.numeros.length)throw new Error("Cantidad solicitada supera el n\xFAmero de elementos disponibles.");let t=new Set;for(;t.size<e;){let s=Math.floor(Math.random()*this.numeros.length);t.add(s)}return Array.from(t).map(s=>this.numeros[s])}static \u0275fac=function(t){return new(t||r)};static \u0275prov=v({token:r,factory:r.\u0275fac,providedIn:"root"})};function se(r,e){if(r&1){let t=w();a(0,"button",20),c("click",function(){let s=k(t).$implicit,b=O();return P(b.seleccionarNumero(s))}),i(1),o()}if(r&2){let t=e.$implicit;l(),h(" ",t," ")}}var F=class r{constructor(e,t,n){this.router=e;this.numerosService=t;this.userPoints=n}email="";numerosAleatorios=[];conteoNiveles=1;puntos=0;ocultarBtnLose=!0;ocultarTeclado=!1;ocultarBtnRondas=!0;ocultarimg=!0;ocultarEndGame=!1;numerosSeleccionados=[];imagenes="";winmsg="";goTo(e){this.guardarPuntos(),this.router.navigate([e])}ngOnInit(){this.email=localStorage.getItem("userEmail")||"",this.winmsg="",this.ocultarEndGame=!1,this.ocultarimg=!0,this.ocultarBtnLose=!0,this.ocultarBtnRondas=!0,this.niveles()}obtenerNumeros(e){this.numerosAleatorios=this.numerosService.obtenernumeros(e),console.log(this.numerosAleatorios)}niveles(){switch(this.conteoNiveles){case 1:this.obtenerNumeros(5);break;case 2:this.obtenerNumeros(10);break;case 3:this.obtenerNumeros(15);break;case 4:this.obtenerNumeros(20);break;case 5:this.obtenerNumeros(25);break;default:this.winEndGame();break}}seleccionarNumero(e){this.numerosSeleccionados.push(e),console.log(this.numerosSeleccionados),this.eliminarNumero(e),this.numerosAleatorios.length==0&&(this.verificacionOrden()?(this.puntos+=15,this.ocultarBtnRondas=!1,this.imagenes="assets/finjuego.png",this.ocultarimg=!1):(this.ocultarBtnLose=!1,this.imagenes="assets/gameover.png",this.ocultarimg=!1,this.puntos-=5))}eliminarNumero(e){let t=this.numerosAleatorios.indexOf(e);t!==-1&&this.numerosAleatorios.splice(t,1)}verificacionOrden(){for(let e=0;e<this.numerosSeleccionados.length-1;e++)if(this.numerosSeleccionados[e]>this.numerosSeleccionados[e+1])return!1;return!0}winRondas(){this.conteoNiveles<6?(this.conteoNiveles+=1,this.numerosSeleccionados=[],this.ngOnInit()):this.winEndGame()}winEndGame(){this.conteoNiveles-=1,this.puntos+=20,this.ocultarimg=!1,this.imagenes="assets/finjuego.png",this.ocultarBtnLose=!1,this.ocultarBtnRondas=!0,this.ocultarEndGame=!0,this.winmsg="Felicitacion terminaste el juego!!",this.guardarPuntos()}reinicio(){this.guardarPuntos(),this.conteoNiveles=1,this.numerosSeleccionados=[],this.puntos=0,this.ngOnInit()}guardarPuntos(){let e={email:this.email,puntos:+this.puntos};this.userPoints.guardarPuntos(e,"ordenargame").then(()=>{console.log("puntos guardados")}).catch(t=>{console.log("error en guardar puntos")})}static \u0275fac=function(t){return new(t||r)(u(E),u(R),u(C))};static \u0275cmp=p({type:r,selectors:[["app-ordenar-numeros"]],standalone:!0,features:[g],decls:43,vars:11,consts:[["data-bs-theme","dark",1,"navbar","navbar-expand-lg","bg-body-tertiary","bg-dark"],[1,"container-fluid"],["href","#",1,"navbar-brand"],["src","assets/logoGame.png","alt","Logo mando","width","30","height","24"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarNav","aria-controls","navbarNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarNav",1,"collapse","navbar-collapse"],[1,"navbar-nav"],[1,"nav-item"],["aria-current","page",1,"nav-link","active",3,"click"],["role","search",1,"d-flex","ms-auto","nav-item"],["aria-current","page",1,"nav-link","active"],[1,"juego-container"],[1,"pantalla-letras"],[3,"hidden"],["alt","Imagen ahorcado","with","300","height","350",3,"src"],[1,"teclado",3,"hidden"],[3,"click",4,"ngFor","ngForOf"],[1,"button-container","container",3,"hidden"],[1,"btn","btn-regis",3,"click"],[3,"click"]],template:function(t,n){t&1&&(a(0,"nav",0)(1,"div",1)(2,"a",2),d(3,"img",3),o(),a(4,"a",2),i(5,"P1 Games"),o(),a(6,"button",4),d(7,"span",5),o(),a(8,"div",6)(9,"ul",7)(10,"li",8)(11,"a",9),c("click",function(){return n.goTo("home")}),i(12,"Home"),o()()(),a(13,"div",10)(14,"ul",7)(15,"li",8)(16,"a",11),i(17),o()(),a(18,"li",8)(19,"a",11),i(20),o()()()()()()(),a(21,"div",12)(22,"div",13)(23,"h3",14),i(24,"Numeros seleccionados:"),o(),a(25,"p"),i(26),o(),a(27,"p"),i(28),o(),a(29,"div",14),d(30,"img",15),o()(),a(31,"div",16),y(32,se,2,1,"button",17),o(),a(33,"div",18)(34,"button",19),c("click",function(){return n.goTo("home")}),i(35,"Salir"),o(),a(36,"button",19),c("click",function(){return n.reinicio()}),i(37,"Reiniciar"),o()(),a(38,"div",18)(39,"button",19),c("click",function(){return n.goTo("home")}),i(40,"Salir"),o(),a(41,"button",19),c("click",function(){return n.winRondas()}),i(42,"Siguiente"),o()()()),t&2&&(l(17),h("Puntos: ",n.puntos,""),l(3),h("Nivel: ",n.conteoNiveles,""),l(3),m("hidden",n.ocultarEndGame),l(3),x(n.winmsg),l(2),x(n.numerosSeleccionados.join(" ")),l(),m("hidden",n.ocultarimg),l(),M("src",n.imagenes,S),l(),m("hidden",n.ocultarTeclado),l(),m("ngForOf",n.numerosAleatorios),l(),m("hidden",n.ocultarBtnLose),l(5),m("hidden",n.ocultarBtnRondas))},dependencies:[_,N],styles:['.juego-container[_ngcontent-%COMP%]{background-image:url("./media/home-3TMMHVDL.jpeg");background-size:cover;background-position:center;background-repeat:no-repeat;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding-top:0}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:20px 30px;font-size:24px;border-radius:8px;border:none;background-color:#056ddb;color:#fff;cursor:pointer;width:100px;height:100px}.teclado[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;max-width:700px;margin:20px auto;gap:15px}.teclado[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0dafd8}.pantalla-letras[_ngcontent-%COMP%]{color:#fff;text-align:center;margin-bottom:20px}.pantalla-letras[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-size:24px;font-weight:700}.btn[_ngcontent-%COMP%]{padding:12px;background-color:#4079d5;color:#fff;border:none;border-radius:4px;cursor:pointer;width:100%;margin-bottom:10px}.btn[_ngcontent-%COMP%]:hover{background-color:#2f60ae}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.btn-regis[_ngcontent-%COMP%]{width:48%;background-color:#759ad7}.btn-regis[_ngcontent-%COMP%]{padding:10px;width:70%;background-color:#759ad7;align-self:center;border:none;border-radius:4px;color:#fff;cursor:pointer;margin-left:10px;margin-right:0;margin-top:10px}.container[_ngcontent-%COMP%]{background-color:#3b4185;padding:20px;border-radius:8px;box-shadow:0 0 10px #0000001a;width:80%;max-width:600px;display:flex}']})};var Z=class r{static \u0275fac=function(t){return new(t||r)};static \u0275mod=V({type:r});static \u0275inj=z({imports:[G.forChild([{path:"ahorcado",component:j},{path:"mayor-menor",component:T},{path:"preguntados",component:A},{path:"ordenar",component:F}]),_,G]})};export{Z as JuegosModule};
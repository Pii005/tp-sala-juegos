import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  newEmail: string ="";
  newContrase: string="";

  loggesUser:string = "";
  flagError: boolean= false;
  msgError: string = "";

  public countLogins:number = 0;
  private sub!:Subscription;
  public loginsCollection:any[] = [];

  constructor(private router: Router, public auth: Auth, private firestore: Firestore) {

  }

  goTo(path: string) {
    console.log("Redirigiendo...")
    this.router.navigate([path]);
    // Le pasamos el path de donde quiero ir, en este caso uso los nombre de los componentes 
  }

  Login() {
    
      let col = collection(this.firestore, 'Usuarios');
      
      const observable = collectionData(col);
  
      this.sub = observable.subscribe((respuesta:any) => {
        //Actualizamos nuestro array
        this.loginsCollection = respuesta;

        // Aquí realizamos el filtrado una vez que los datos han sido cargados
        const coincidencia = this.loginsCollection.filter((login: any) => 
          login.user === this.newEmail && login.contrasenia === this.newContrase);

        if (coincidencia.length > 0){
          // console.log("Email enviado:", this.newEmail);
          localStorage.setItem('userEmail', this.newEmail);
          this.router.navigate(['home'], { state: { email: this.newEmail } });

        } else {
          console.log("El usuario no existe");
          this.msgError = "El usuario no existe";
          this.flagError = true;
        }
      });
  }



  mostrarDatos() {
    if (this.loginsCollection.length > 0) {
      this.loginsCollection.forEach((login: any) => {
        console.log(`Usuario: ${login.user}, Fecha: ${login.fecha}`);
      });
    } else {
      console.log("No hay usuarios registrados en la colección.");
    }
  }
  

  // GetData(nombreBase: string){
  //   if(nombreBase){
  //     let col = collection(this.firestore, nombreBase);
      
  //     const observable = collectionData(col);
  
  //     this.sub = observable.subscribe((respuesta:any) => {
  
  //       //Actualizamos nuestro array
  //       this.loginsCollection = respuesta;
  
  //       // this.countLogins = this.loginsCollection.length;
  

  //     })
  //   }
  // }

  registroUsuario() {
    createUserWithEmailAndPassword(this.auth, this.newEmail, this.newContrase)
      .then((res) => {
        if (res.user.email) {
          // Guardar el usuario en Firestore
          const col = collection(this.firestore, 'Usuarios');
          addDoc(col, {
            user: this.newEmail,
            contrasenia: this.newContrase, // Considera no guardar contraseñas en texto plano
            fecha: new Date() // Guarda la fecha de registro si lo deseas
          }).then(() => {
            console.log("Usuario creado y guardado en Firestore.");
            localStorage.setItem('userEmail', this.newEmail);
            this.router.navigate(['home'], { state: { email: this.newEmail } });
          }).catch((error) => {
            console.error("Error al guardar el usuario en Firestore:", error);
          });
        }
        this.flagError = false;
      })
      .catch((e) => {
        this.flagError = true;
        console.log(e);
        switch (e.code) {
          case "auth/invalid-email":
            console.log("Email inválido");
            this.msgError = "Email inválido";
            break;
          case "auth/email-already-in-use":
            console.log("Ya existe una cuenta con este email");
            this.msgError = "Ya existe una cuenta con este email";
            break;
          default:
            console.log("ERROR");
            this.msgError = "Error: vuelva a probar más tarde";
            break;
        }
      });
  }
  

  /*console ->>>> PARA REGISTRO
  .log("El usuario no existe. Creando nuevo usuario...");

      addDoc(col, { user: this.newEmail, contrasenia: this.newContrase })
        .then(() => {
          // Guardar el email en localStorage tras crear el usuario
          localStorage.setItem('userEmail', this.newEmail);

          console.log("Usuario creado y guardado en Firestore.");
          // Redirigir al home
          this.router.navigate(['home'], { state: { email: this.newEmail } });
        })
        .catch((error) => {
          console.error("Error al crear el usuario en Firestore:", error);
        }); */

  // loginUser() {
  //   signInWithEmailAndPassword(this.auth, this.newEmail, this.newContrase)
  //     .then((res) => {
  //       this.loggesUser = res.user?.email || '';
  //       this.flagError = false;
  //       this.router.navigate(['home']); // Redirigir a home si es exitoso

  //       // Guardar en Firestore los detalles del inicio de sesión
  //       let col = collection(this.firestore, 'logins');
  //       addDoc(col, { fecha: new Date(), user: this.newEmail, contrasenia: this.newContrase});
  //     })
  //     .catch((e) => {
  //       this.flagError = true;
  //       switch (e.code) {
  //         case "auth/user-not-found":
  //           this.msgError = "El usuario no existe";
  //           break;
  //         case "auth/wrong-password":
  //           this.msgError = "Contraseña incorrecta";
  //           break;
  //         default:
  //           this.msgError = "Error al iniciar sesión. Por favor, inténtalo más tarde.";
  //           break;
  //       }
  //     });
  // }

}

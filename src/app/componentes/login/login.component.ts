import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, updateDoc, getDocs, query, where, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCheckService } from '../../services/user-check.service';
// import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,          
    ReactiveFormsModule
  ],
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  newEmail: string ="";
  newContrase: string="";

  loggesUser:string = "";
  flagError: boolean= false;
  msgError: string = "";

  public countLogins:number = 0;
  private sub!:Subscription;
  public loginsCollection:any[] = [];



  constructor(private router: Router, public auth: Auth, private firestore: Firestore, private userCheckService: UserCheckService) {

  }

  ngOnInit(): void {
    console.log("Ingresando...")
    this.form = new FormGroup({
      email: new FormControl('', 
        [Validators.required, Validators.email] // Validaciones sincrónicas
      ),
      contra: new FormControl('', [Validators.required])
    });
  }


  goTo(path: string) {
    this.router.navigate([path]);
    // Le pasamos el path de donde quiero ir, en este caso uso los nombre de los componentes 
  }

  async enviarForm() {
    this.flagError = false; // Resetear error al enviar el formulario
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('contra')?.value;

      // Verificar si el email existe
      const userExists = await this.verifyUser(email);
      if (userExists) {
        // Intentar iniciar sesión
        await this.loginUser(email, password);
      } else {
        this.msgError = "El usuario no existe."; // Mensaje de error si el usuario no existe
        this.flagError = true;
      }
    } else {
      this.msgError = "Formulario inválido"; // Mensaje de error si el formulario es inválido
      this.flagError = true;
    }
  }

  // login(){
  //   this.form = new FormGroup({
  //     email: new FormControl("", Validators.email),
  //     contra: new FormControl("", )
  //   });
  // }

  // async loginUser() {
  //   const email = this.form.get('email')?.value;
  //   const password = this.form.get('contra')?.value;

  //   if (!email || !password) {
  //     this.msgError = "Por favor, ingresa el email y la contraseña.";
  //     return;
  //   }

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
  //     this.loggesUser = userCredential.user.email || '';
  //     this.flagError = false;
      
  //     // Guardar el login en Firestore
  //     let col = collection(this.firestore, 'Usuarios');
  //     await addDoc(col, { fecha: new Date(), user: email });
  //     await this.updateLastLogin(email);
  //     this.router.navigate(['home']); // Redirigir a home si es exitoso
  //   } catch (e: any) {
  //     this.flagError = true;
  //     switch (e.code) {
  //       case "auth/user-not-found":
  //         this.msgError = "El usuario no existe";
  //         break;
  //       case "auth/wrong-password":
  //         this.msgError = "Contraseña incorrecta";
  //         break;
  //       default:
  //         this.msgError = "Error al iniciar sesión. Por favor, inténtalo más tarde.";
  //         break;
  //     }
  //   }

  async verifyUser(email: string): Promise<boolean> {
    return await this.userCheckService.checkIfUserExists(email);
  }

//   async loginUser(email: string, password: string) {
//     try {
//         // Crear una referencia a la colección 'users'
//         const usersCollection = collection(this.firestore, 'Usuarios');
//         const userQuery = query(usersCollection, where('user', '==', email));
        
//         // Obtener los documentos que coinciden con la consulta
//         const userDoc = await getDocs(userQuery);

//         if (userDoc.empty) {
//             this.flagError = true;
//             this.msgError = "El usuario no existe.";
//             return; // Salir si no se encuentra el usuario
//         }

//         const userData = userDoc.docs[0].data();

//         // Comparar la contraseña con la almacenada en Firestore
//         if (userData['contrasenia'] !== password) {

//           this.flagError = true;
//           this.msgError = "Contraseña incorrecta.";
//           return; // Salir si la contraseña es incorrecta
//       }
      

//         // Si las credenciales son correctas, iniciar sesión
//         await signInWithEmailAndPassword(this.auth, email, password);
//         localStorage.setItem('user', email);
//         await this.updateLastLogin(email);
        
//         // Redirigir al home
//         this.router.navigate(['home'], { state: { email: email } });

//     } catch (error: any) {
//         this.flagError = true;
//         console.error("Error de inicio de sesión:", error.message);
//         switch (error.code) {
//             case "auth/invalid-email":
//                 this.msgError = "Email inválido.";
//                 break;
//             case "auth/too-many-requests":
//                 this.msgError = "Demasiados intentos fallidos. Inténtalo más tarde.";
//                 break;
//             case "auth/invalid-credential":
//               console.log(password + " - " + email);
//                 this.msgError = "Contraseña y/o mail incorrectos";
//                 break;
//             default:
//                 this.msgError = "Error al iniciar sesión. Por favor, inténtalo más tarde.";
//                 break;
//         }
//     }
// }

loginUser(email: string, password: string) {
    
  let col = collection(this.firestore, 'Usuarios');
  
  const observable = collectionData(col);

  this.sub = observable.subscribe((respuesta:any) => {
    //Actualizamos nuestro array
    this.loginsCollection = respuesta;

    // Aquí realizamos el filtrado una vez que los datos han sido cargados
    const coincidencia = this.loginsCollection.filter((login: any) => 
      login.user === email && login.contrasenia === password);

    if (coincidencia.length > 0){
      // console.log("Email enviado:", this.newEmail);
      localStorage.setItem('userEmail', email);
      this.router.navigate(['home'], { state: { email: email } });

    } else {
      console.log("El usuario no existe");
      this.msgError = "El usuario no existe";
      this.flagError = true;
    }
  });
}



  


  async updateLastLogin(email: string) {
    try {
      // Referencia a la colección de usuarios
      const col = collection(this.firestore, 'Usuarios');
      
      // Busca el documento del usuario basándose en su email
      const userQuery = query(col, where('user', '==', email));
      const querySnapshot = await getDocs(userQuery);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Asumiendo que el email es único
        const userDocRef = doc(this.firestore, 'user', userDoc.id);
        
        // Actualiza el campo 'ultimaSesion' con la fecha actual
        await updateDoc(userDocRef, { ultimaSesion: new Date() });
        
        console.log("Última fecha de sesión actualizada con éxito.");
      } else {
        console.log("Usuario no encontrado para actualizar la fecha.");
      }
    } catch (error) {
      console.error("Error al actualizar la fecha de la última sesión:", error);
    }
  }
  

  

  // async  validarUser(){
  //   const email = this.mail?.value;
  //   const respuesta = await this.userCheckService.checkIfUserExists(email);
  //   if(respuesta == true){
  //     return true;
  //   }else{
  //     return { usuarioExiste: 'El usuario no existe' };
  //   }
  // }

  // async verificarContrasenia(): Promise<boolean> {
  //   const email = this.mail?.value;
  //   const contraseña = this.contra?.value;

  //   const userRecord = await this.userCheckService.obtenerUsuario(email);
  //   return userRecord?.contrasenia === contraseña;
  // }

  get email() {
    return this.form.get('email');
  }

  get contra() {
    return this.form.get('contra');
  }

  // mostrarDatos() {
  //   if (this.loginsCollection.length > 0) {
  //     this.loginsCollection.forEach((login: any) => {
  //       console.log(`Usuario: ${login.user}, Fecha: ${login.fecha}`);
  //     });
  //   } else {
  //     console.log("No hay usuarios registrados en la colección.");
  //   }
  // }
  

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
/*
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
  */

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

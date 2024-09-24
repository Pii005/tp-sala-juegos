import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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

  registarUsuario(){
    let col = collection(this.firestore, 'Usuarios');
      
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any) => {

      this.loginsCollection = respuesta;

      const coincidencia = this.loginsCollection.filter((login: any) => 
        login.user === this.newEmail && login.contrasenia === this.newContrase);

      if (coincidencia.length > 0){
        console.log("El usuario ya existe");
        this.msgError = "El usuario ya existe";
        this.flagError = true;
      }else{
        //Crear Usuario
        this.crearUsuario();
      }
    });
  }

  crearUsuario(){
    const col = collection(this.firestore, 'Usuarios');

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

    });
  }

}

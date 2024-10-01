import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, updateDoc, getDocs, query, where, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCheckService } from '../../../services/user-check.service';
// import { AuthService } from './auth.service';


@Component({
  standalone: true,
  selector: 'app-login',
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


  async verifyUser(email: string): Promise<boolean> {
    return await this.userCheckService.checkIfUserExists(email);
  }


  loginUser(email: string, password: string) {
    let col = collection(this.firestore, 'Usuarios');
    const observable = collectionData(col);
  
    this.sub = observable.subscribe((respuesta: any) => {
      // Actualizamos nuestro array
      this.loginsCollection = respuesta;
  
      // Aquí realizamos el filtrado una vez que los datos han sido cargados
      const usuario = this.loginsCollection.find((login: any) => login.user === email);
  
      if (usuario) {
        // Si el usuario existe, verificamos la contraseña
        if (usuario.contrasenia === password) {
          localStorage.setItem('userEmail', email);
          this.router.navigate(['home'], { state: { email: email } });
        } else {
          // Contraseña incorrecta
          this.msgError = "Contraseña incorrecta.";
          this.flagError = true;
        }
      } else {
        // Usuario no encontrado
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
  
  get email() {
    return this.form.get('email');
  }

  get contra() {
    return this.form.get('contra');
  }

}

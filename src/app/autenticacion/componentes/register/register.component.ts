import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCheckService } from '../../../services/user-check.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,          
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})

export class RegisterComponent {
  form!: FormGroup;
  // email: string ="";
  // contrasenia: string="";

  loggesUser:string = "";
  flagError: boolean= false;
  msgError: string = "";

  public countLogins:number = 0;
  private sub!:Subscription;
  public loginsCollection:any[] = [];

  constructor(private router: Router, public auth: Auth, private firestore: Firestore, private userCheckService: UserCheckService) {

  }

  goTo(path: string) {
    this.router.navigate([path]);
    // Le pasamos el path de donde quiero ir, en este caso uso los nombre de los componentes 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', 
          [Validators.required, Validators.email],  // Validaciones sincrónicas
          [this.emailExistsValidator.bind(this)]    // Validación asíncrona para email existente
      ),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  emailExistsValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    // Si el campo está vacío, no necesitamos hacer la verificación
    if (!control.value) {
      return Promise.resolve(null);
    }
  
    // Llamamos al servicio para verificar si el usuario existe
    return this.userCheckService.checkIfUserExists(control.value).then(exists => {
      // Devuelve error si el email ya existe
      return exists ? { emailExists: true } : null; 
    }).catch(() => {
      // Manejo de errores en caso de que algo falle
      return null; 
    });
  }
  


  enviarForm() {

    this.msgError = ""; // Limpiar mensajes de error
    if (this.form.valid) {
      // console.log(this.form.value);
      this.flagError = false;
      this.registarUsuario();
    } else {
      this.msgError = this.getFormErrors() || "Formulario inválido"; // Mostrar errores específicos
      this.flagError = true;
    }
  }


  getFormErrors() {
    const emailErrors = this.email?.errors;
    const contraErrors = this.contra?.errors;

    if (emailErrors) {
      if (emailErrors['required']) {
        return "El campo de email es obligatorio.";
      } else if (emailErrors['email']) {
        return "Por favor, ingresa un email válido.";
      } else if (emailErrors['emailExists']) {
        return "El email ya está en uso.";
      }
    }

    if (contraErrors) {
      if (contraErrors['required']) {
        return "El campo de contraseña es obligatorio.";
      } else if (contraErrors['minlength']) {
        return "La contraseña debe tener al menos 6 caracteres.";
      }
    }

    return "";
  }

  registarUsuario() {
    const email = this.form.get('email')?.value;
    const contrasenia = this.form.get('contrasenia')?.value; // Cambia 'contrasenia'
  
    // Verificamos si el formulario es válido antes de proceder
    if (!this.form.valid) {
      this.msgError = "El formulario no es válido.";
      this.flagError = true;
      return;
    }
  
    let col = collection(this.firestore, 'Usuarios');
    const observable = collectionData(col);
  
    this.sub = observable.subscribe((respuesta: any) => {
      this.loginsCollection = respuesta;
      const coincidencia = this.loginsCollection.filter(
        (login: any) => login.user === email
      );
  
      if (coincidencia.length > 0) {
        this.msgError = "El usuario ya existe";
        this.flagError = true;
        return;
      } else {
        this.flagError = false;
        console.log("Creando Usuario...");
        this.crearUsuario(email, contrasenia); // Pasa los parámetros
        
        this.sub.unsubscribe();
        return;
      }
    });
  }
  

  crearUsuario(email: string, contrasenia: string) {
    if (!email || !contrasenia) {
      this.msgError = "Por favor, ingresa el email y la contraseña.";
      return;
    }
  
    const col = collection(this.firestore, 'Usuarios');
  
    addDoc(col, { user: email, contrasenia: contrasenia, fecha: new Date(), 'ultimo ingreso': new Date() })
      .then(() => {
        // Guardar el email en localStorage tras crear el usuario
        localStorage.setItem('userEmail', email);
  
        console.log("Usuario creado y guardado en Firestore.");
        // Redirigir al home
        this.router.navigate(['home'], { state: { email: email } });
      })
      .catch((error) => {
        console.error("Error al crear el usuario en Firestore:", error);
      });
  }
  

  get email() {
    return this.form.get('email');
  }

  get contra() {
    return this.form.get('contrasenia');
  }

}

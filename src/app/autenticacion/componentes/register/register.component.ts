import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth'; // Solo importamos lo necesario para la autenticación
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

export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loggesUser:string = "";
  flagError: boolean= false;
  msgError: string = "";

  public countLogins:number = 0;
  private sub!:Subscription;

  constructor(private router: Router, public auth: Auth, private userCheckService: UserCheckService) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', 
          [Validators.required, Validators.email],  
          [this.emailExistsValidator.bind(this)]    
      ),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  emailExistsValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    if (!control.value) {
      return Promise.resolve(null);
    }
  
    return this.userCheckService.checkIfUserExists(control.value).then(exists => {
      return exists ? { emailExists: true } : null; 
    }).catch(() => {
      return null; 
    });
  }

  enviarForm() {
    this.msgError = ""; 
    if (this.form.valid) {
      this.flagError = false;
      this.registarUsuario();
    } else {
      this.msgError = this.getFormErrors() || "Formulario inválido"; 
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
    const contrasenia = this.form.get('contrasenia')?.value; 
  
    if (!this.form.valid) {
      this.msgError = "El formulario no es válido.";
      this.flagError = true;
      return;
    }

    this.crearUsuario(email, contrasenia);
  }

  crearUsuario(email: string, contrasenia: string) {
    if (!email || !contrasenia) {
      this.msgError = "Por favor, ingresa el email y la contraseña.";
      return;
    }

    createUserWithEmailAndPassword(this.auth, email, contrasenia)
      .then(() => {
        localStorage.setItem('userEmail', email);
        console.log("Usuario creado con Firebase Authentication.");

        // Redirigir al home
        this.goTo('home');
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
        this.msgError = "Error al crear el usuario: " + error.message;
      });
  }

  get email() {
    return this.form.get('email');
  }

  get contra() {
    return this.form.get('contrasenia');
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'; // Importamos solo la función para autenticación
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  flagError: boolean= false;
  msgError: string = "";

  constructor(private router: Router, public auth: Auth) {}

  ngOnInit(): void {
    console.log("Ingresando...");
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),  // Validaciones básicas
      contra: new FormControl('', [Validators.required])
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);  // Navegar a la ruta indicada
  }

  async enviarForm() {
    this.flagError = false;  // Resetear el estado de error

    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('contra')?.value;

      try {
        // Autenticación con Firebase Authentication
        await this.loginUser(email, password);
      } catch (error: any) {
        switch(error.code){
          case "auth/invalid-email":
            this.msgError = "El mail o contraseña incorrectas";
            break;
          case "auth/invalid-credential":
            this.msgError = "El mail o contraseña incorrectas";
            break
          case "auth/too-many-requests":
            this.msgError = "Se enviaron muchos solicitudos, espere un momento";
            break;
          default:
            this.msgError = "Error, revisar los datos enviados" + error.code;
          }
        this.flagError = true;
      }
    } else {
      this.msgError = "Formulario inválido";  // Mostrar error si el formulario es inválido
      this.flagError = true;
    }
  }

  autoComplet(){
    this.form.patchValue({
      email: 'admin@gmail.com',
      contra: '147852'
    });
    this.loginUser("admin@gmail.com", "147852");
  }

  // Método para iniciar sesión con Firebase Authentication
  async loginUser(email: string, password: string) {
    try {
      // Intentar iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log("Usuario autenticado:", userCredential.user);

      // Guardar el email del usuario en el almacenamiento local
      localStorage.setItem('userEmail', email);

      // Redirigir al home
      this.goTo('home');
    } catch (error) {
      throw error;  // Lanza el error para ser manejado por enviarForm
    }
  }

  // Getters para los controles de formulario
  get email() {
    return this.form.get('email');
  }

  get contra() {
    return this.form.get('contra');
  }
}

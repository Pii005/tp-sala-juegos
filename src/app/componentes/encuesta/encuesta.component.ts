import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SavedService, Encuesta } from '../../services/encuesta/saved.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  encuestaForm!: FormGroup;

  ocultarEnvio = true;

  constructor(private router: Router, private savedService: SavedService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      pregunta1: ['', Validators.required],
        // Agregar pregunta2 aquí
      pregunta3: ['', Validators.required],
      ahorcado: [false],
      mayorOMenor: [false],
      preguntados: [false],
      ordenarNumeros: [false],
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  async onSubmit(): Promise<void> {
    if (this.encuestaForm.valid) {
      const formValue = this.encuestaForm.value;
      console.log('Datos del formulario:', formValue);

      const encuestaData: Encuesta = {
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        email: formValue.email,
        telefono: formValue.telefono,
        edad: formValue.edad,
        pregunta1: formValue.pregunta1,
        pregunta3: formValue.pregunta3,
        pregunta2: {
          ahorcado: formValue.ahorcado,
          mayorOMenor: formValue.mayorOMenor,
          preguntados: formValue.preguntados,
          ordenarNumeros: formValue.ordenarNumeros
        }
      };
      
      // console.log('Datos de la encuesta:', encuestaData);
      try {
        await this.savedService.saveEncuesta(encuestaData);
        console.log('Encuesta guardada con éxito.');
        this.ocultarEnvio = false;
        
      } catch (error) {
        console.error('Error al guardar la encuesta:', error);
      }
    } else {
      this.encuestaForm.markAllAsTouched();  // Marca todos los campos como tocados para que se muestren los errores
      console.log('Formulario no válido');  // Log si el formulario no es válido

      // Agrega un diagnóstico del formulario
      Object.keys(this.encuestaForm.controls).forEach(key => {
        const control = this.encuestaForm.get(key);
        console.log(`Campo ${key}:`, control?.status);  // Ver estado del control (VALID, INVALID, etc.)
        console.log(`Errores en ${key}:`, control?.errors);  // Ver errores específicos en cada campo
      });
    }
  }

}

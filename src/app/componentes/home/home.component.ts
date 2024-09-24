import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  email: string = '';
  ocultarBotones: boolean = true;
  ocultarInicio: boolean = false;

  constructor(private router: Router) 
  {

  }

  ngOnInit() {
    // Obtener el email del estado de la navegación
    this.email = localStorage.getItem('userEmail') || '';
    
    console.log('Email recibido:', this.email);

    // Validar si el email fue recibido correctamente
    this.validIngreso();
  }

  validIngreso() {
    if (this.email) {
      this.ocultarBotones = false; // Mostrar los botones si el email es válido
      this.ocultarInicio = true;
    } else {
      this.ocultarBotones = true; // Ocultar los botones si no hay email
      this.ocultarInicio = false;
    }
  }

  validCerrado() {
    if (this.email) {
      this.ocultarBotones = true; // Mostrar los botones si el email es válido
      this.ocultarInicio = false;
    } else {
      this.ocultarBotones = false; // Ocultar los botones si no hay email
      this.ocultarInicio = true;
    }
  }

  goTo(path: string) {
    console.log("Redirigiendo...");
    this.router.navigate([path]);
  }

  // toggleBotones() {
  //   this.ocultarBotones = !this.ocultarBotones; // Cambiar el valor de ocultarBotones
  // }

  logouo() {
    localStorage.removeItem('userEmail');
    console.log("Sesión cerrada");
    this.validCerrado();
  }
  

}

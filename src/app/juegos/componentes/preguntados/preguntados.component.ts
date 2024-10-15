import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../../services/preguntados/paises.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObtenesPaisesService } from '../../../services/preguntados/obtenes-paises.service';
import { UserPointsService } from '../../../services/user-points.service';


@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  email: string = '';

  opciones: any[] = [];
  data: any[] = [];
  selectedPais: any;
  subscription!: Subscription;
  imagenBandera: string = '';
  paisCorrecto: any;

  puntos:number = 0;
  rondas: number = 1;
  ocultarBtn = true;
  ocultarelecciones = false;

  constructor(private router: Router, private paisesService: PaisesService, private obtenerPaises: ObtenesPaisesService, private userPoints: UserPointsService) {}

  ngOnInit() {
    this.email = localStorage.getItem('userEmail') || '';
    this.obtenerBanderas();
    this.rondas = 1;
    this.puntos = 0;
    this.ocultarBtn = true;
    this.ocultarelecciones = false;
  }

  obtenerBanderas() {
    this.obtenerPaises.obtenerOpciones().subscribe(opciones => {
      this.opciones = opciones;
      console.log(this.opciones); // Debería mostrar las 4 banderas en la consola

      // Ahora que hemos cargado las opciones, podemos obtener un país correcto
      this.data = opciones; // Asignamos opciones a data
      this.paisCorrecto = this.opcionCorrecta();
      this.imagenBandera = this.paisCorrecto.flag; // Cambia esto si tu estructura de datos es diferente

      // Muestra el país correcto después de asignarlo
      // console.log("El país correcto es: ", this.paisCorrecto);
    });
  }

  opcionCorrecta() {
    const indiceAleatorio = Math.floor(Math.random() * this.data.length);
    return {
      name: this.data[indiceAleatorio].name.common, // Nombre del país correcto
      flag: this.data[indiceAleatorio].flags.png      // Bandera del país correcto
    };
  }

  seleccionarOpcion(opcion: any) {
    if (opcion.name.common === this.paisCorrecto.name) {
      this.puntos += 15;
      this.rondas += 1;
      // console.log(`¡Correcto! Has seleccionado: ${opcion.name.common}`);
      this.winRonda();
    } else {
      this.loseGame();
      // console.log(`Incorrecto. Has seleccionado: ${opcion.name.common}. La opción correcta es ${this.paisCorrecto.name}`);
    }
  }
  
  goTo(path: string) {
    this.guardarPuntos();
    this.router.navigate([path]);
  }

  winRonda(){
    this.obtenerBanderas();
  }

  loseGame(){
    this.puntos -= 5;
    this.ocultarelecciones = true;
    this.ocultarBtn = false;
    this.guardarPuntos();
  }

  guardarPuntos(){
    const datos = {
      email: this.email,
      puntos: + this.puntos
    };

    this.userPoints.guardarPuntos(datos,'preguntadosgame').then(() =>{
      console.log("puntos guardados");
    }).catch(error =>{
      console.log('error en guardar puntos');
    });
  }

  reiniciar(){
    this.ngOnInit();
  }



}

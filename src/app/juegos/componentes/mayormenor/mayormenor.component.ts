import { Component, OnInit } from '@angular/core';
import { CartasService, Cartas } from '../../../services/mayorMenor/cartas.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserPointsService } from '../../../services/user-points.service';


@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {
  email: string = '';

  imagen: string = "";
  cartaAnterior: Cartas | null = null; // Guarda la carta anterior
  puntos: number = 0;
  ronda: number = 1;

  ocultarAcciones = false;
  ocultarBotones = true;

  constructor(private router: Router, private cartasService: CartasService, private userPoints: UserPointsService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail') || '';
    this.cartaAnterior = this.obtenerCarta();
    this.imagen = this.cartaAnterior.imagen; 
  }

  goTo(path: string) {
    // this.guardarPuntos();
    this.router.navigate([path]);
  }

  obtenerCarta(): Cartas {
    // Obtener una carta del servicio
    return this.cartasService.obtenerCartas(1)[0];
  }

  cartaMenor() {
    this.comparacionCartas('menor');
  }

  cartaMayor() {
    this.comparacionCartas('mayor');
  }

  comparacionCartas(seleccion: 'mayor' | 'menor') {
    try{
      const nuevaCarta = this.obtenerCarta(); // Obtener una nueva carta
  
      if (!this.cartaAnterior || !nuevaCarta) {
        console.error("No se pueden comparar cartas: una de ellas es nula.");
        return;
      }
      console.log("Carta anterior: ", this.cartaAnterior?.id);
      console.log("Nueva carta: ", nuevaCarta.id);
  
      // Comparar la nueva carta con la carta anterior según la elección del usuario
      if (seleccion === 'mayor') {
        if (nuevaCarta.id > this.cartaAnterior.id) {
          this.puntos += 10;
          this.ronda += 1;
          this.imagen = nuevaCarta.imagen; // Actualizar la imagen a la nueva carta
          this.cartaAnterior = nuevaCarta; // Actualizar la carta anterior
        }else if(nuevaCarta.id === this.cartaAnterior.id) {
          console.log("BONUS!! cartar iguales");
          this.ronda += 1;
          this.puntos += 15;
          this.imagen = nuevaCarta.imagen; // Actualizar la imagen a la nueva carta
          this.cartaAnterior = nuevaCarta;
        } 
        else {
          this.gameOver(); // Lógica de juego terminado
        }
      } else if (seleccion === 'menor') {
        if (nuevaCarta.id < this.cartaAnterior.id) {
          this.ronda += 1;
          this.puntos += 10;
          this.imagen = nuevaCarta.imagen; // Actualizar la imagen a la nueva carta
          this.cartaAnterior = nuevaCarta; // Actualizar la carta anterior
        }else if(nuevaCarta.id === this.cartaAnterior.id) {
          console.log("BONUS!! cartar iguales");
          this.ronda += 1;
          this.puntos += 15;
          this.imagen = nuevaCarta.imagen; // Actualizar la imagen a la nueva carta
          this.cartaAnterior = nuevaCarta;
        }
        else {
          this.gameOver(); // Lógica de juego terminado
        }
      }

    }catch(error ){
      console.log(error)
    }
  }

  gameOver() {
    this.imagen = "assets/gameover.png";
    this.puntos -= 5;
    this.ocultarAcciones = true;
    this.ocultarBotones = false; 
    this.guardarPuntos();
  }

  reinicio(){
    this.cartaAnterior = null;
    this.ronda = 1;
    this.puntos = 0;
    this.ocultarAcciones = false;
    this.ocultarBotones = true;
    this.ngOnInit();
  }

  guardarPuntos(){
    const datos = {
      email: this.email,
      puntos: + this.puntos
    };

    this.userPoints.guardarPuntos(datos,'mayormenorgame').then(() =>{
      console.log("puntos guardados");
    }).catch(error =>{
      console.log('error en guardar puntos');
    });
  }


}

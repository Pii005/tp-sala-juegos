import { Component, importProvidersFrom, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PalabrasService } from '../../../services/ahorcado/palabras.service';
import { UserPointsService } from '../../../services/user-points.service';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-ahorcado-game',
  standalone: true,
  imports: [
    CommonModule,        
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './ahorcado-game.component.html',
  styleUrls: ['./ahorcado-game.component.css']
})
export class AhorcadoGameComponent implements OnInit {
  email: string = '';
  ocultarBotones: boolean = true;
  ocultarTeclado: boolean = false;

  puntos: number = 0;

  letras: string[] = []; 
  letrasSeleccionadas: string = ''; 
  palabraAdivinar: string = ''; 
  palabraReal: string = ''; 
  intentos: number = 0;
  imagenes: string = "assets/1.png";
  finjuego: string = "";

  constructor(private router: Router, private PalabraService : PalabrasService, private userPoints: UserPointsService) 
  {}

  goTo(path: string) { 
  // MODIFICAR
    // console.log("Redirigiendo...");
    this.guardarPuntos();
    this.router.navigate([path]);
  }



  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail') || '';
    this.generarLetras(); 
    this.palabraReal = this.PalabraService.getPalabraAleatoria(); 
    this.palabraAdivinar = this.palabraReal.split('').map(() => '_').join(' '); 
  }

  generarLetras() {
    for (let i = 65; i <= 90; i++) {
      this.letras.push(String.fromCharCode(i)); 
    }
  }

  seleccionarLetra(letra: string) {
    this.letrasSeleccionadas += letra + ' '; 
    this.actualizarPalabra(letra); 
    this.eliminarletras(letra);
  }

  actualizarPalabra(letra: string) {
    let palabraArray = this.palabraAdivinar.split(' '); 
    let letraEncontrada = false;
    for (let i = 0; i < this.palabraReal.length; i++) {
      if (this.palabraReal[i].toUpperCase() === letra) {
        palabraArray[i] = letra; 
        letraEncontrada = true;
      }
    }
    if(letraEncontrada){
      
      this.puntos += 15;
    }
    if (!letraEncontrada) {
      this.intentos += 1; 
      this.puntos -= 5;

      // - PUNTOS => 5

      console.log("Intentos: "+ this.intentos)
      switch(this.intentos){
        case 1:
          this.imagenes = "assets/2.png";
          break
        case 2: 
          this.imagenes = "assets/3.png";
          break
        case 3: 
          this.imagenes = "assets/4.png";
          break
        case 4: 
          this.imagenes = "assets/5.png";
          break
        case 5: 
          this. imagenes = "assets/6.png";
          break
        case 6: 
          this. imagenes = "assets/gameover.png";
          // this.ocultarBotones = true;//muestro botones
          
          this.ocultarTeclado = true;
          this.ocultarBotones = false;
          //botones
          break
        default:
          this.imagenes = "assets/1.png"
          // this.ocultarBotones = false;
          // botones
        }
      }

    // Vuelve a unir el array para mostrar la palabra con las letras adivinadas
    this.palabraAdivinar = palabraArray.join(' ');

    if (this.palabraAdivinar.replace(/ /g, '') === this.palabraReal.toUpperCase()) {

      this.win()
    }     
  }

  win(){
    this.finjuego = "¡Felicidades! Has adivinado la palabra";
    this.imagenes = "assets/finjuego.png"
    this.ocultarTeclado = true;
    this.ocultarBotones = false;
    // this.guardarPuntos();
    //GUARDAR PUNTOS
  }

  Reinicio(){
    //GUARDAR PUNTOS
    this.guardarPuntos();

    this.puntos = 0;
    this.intentos = 0;
    this.imagenes = "assets/1.png"; 
    this.letrasSeleccionadas = ''; 
    this.ocultarTeclado = false; 
    this.ocultarBotones = true; 
    this.palabraReal = this.PalabraService.getPalabraAleatoria(); 
    this.palabraAdivinar = this.palabraReal.split('').map(() => '_').join(' '); 
    this.finjuego = "";
  }

  guardarPuntos(){
    const datos = {
      email: this.email,
      puntos: + this.puntos
    };

    this.userPoints.guardarPuntos(datos,'ahorcadogame').then(() =>{
      console.log("puntos guardados");
    }).catch(error =>{
      console.log('error en guardar puntos');
    });


  }

  eliminarletras(letra: string){
    const index = this.letras.indexOf(letra);
  
    if (index !== -1) {
      this.letras.splice(index, 1);
    }
  }

}

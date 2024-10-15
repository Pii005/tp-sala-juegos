import { Component, importProvidersFrom, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NumerosService } from '../../../services/ordenar/numeros.service';
import { UserPointsService } from '../../../services/user-points.service';


@Component({
  selector: 'app-ordenar-numeros',
  standalone: true,
  imports: [
    CommonModule,        
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './ordenar-numeros.component.html',
  styleUrl: './ordenar-numeros.component.css'
})
export class OrdenarNumerosComponent implements OnInit {
  email: string = '';

  numerosAleatorios: number[] = [];
  conteoNiveles: number = 1;
  puntos:number = 0;

  ocultarBtnLose: boolean = true;
  ocultarTeclado: boolean = false;
  ocultarBtnRondas: boolean = true;
  ocultarimg: boolean = true
  ocultarEndGame:boolean = false;

  numerosSeleccionados: number[] = [];
  imagenes:string = "";
  winmsg = "";

  constructor(private router: Router, private numerosService: NumerosService, private userPoints: UserPointsService){}

  goTo(path: string) { 
    this.guardarPuntos();
    this.router.navigate([path]);
  }

  ngOnInit(): void 
  {
    this.email = localStorage.getItem('userEmail') || '';
    this.winmsg = "";
    this.ocultarEndGame = false;
    this.ocultarimg = true;
    this.ocultarBtnLose = true;
    this.ocultarBtnRondas = true;
    this.niveles();
    
  }

  obtenerNumeros(cantidadNumeros: number){
    this.numerosAleatorios = this.numerosService.obtenernumeros(cantidadNumeros);
    console.log(this.numerosAleatorios);
  } 

  niveles(){
    switch(this.conteoNiveles){
      case 1:
        this.obtenerNumeros(5);
        break;
      case 2:
        this.obtenerNumeros(10);
        break;
      case 3:
        this.obtenerNumeros(15);
        break;
      case 4:
        this.obtenerNumeros(20);
        break;
      case 5:
        this.obtenerNumeros(25);
        break;
      default:
        this.winEndGame();
        break
    }
  }

  seleccionarNumero(numero: number) {
    this.numerosSeleccionados.push(numero); 
    console.log(this.numerosSeleccionados);
    this.eliminarNumero(numero);

    if(this.numerosAleatorios.length == 0){
      //verificarOrden
      if(this.verificacionOrden()){
        //winRONDAS
        this.puntos += 15;
        //MOSTRAR BOTONES
        this.ocultarBtnRondas = false;
        this.imagenes = "assets/finjuego.png";
        this.ocultarimg = false;

      }else{
        //MOSTRAR BOTONES DE PERDER
        this.ocultarBtnLose = false;
        this.imagenes = "assets/gameover.png";
        this.ocultarimg = false;
        this.puntos -= 5;
      }

      //esta bien, aparece la siguiente ronda WIN

    }
    // this.actualizarPalabra(letra); 
    // this.eliminarletras(letra);
  }

  eliminarNumero(numero: number){
    const index = this.numerosAleatorios.indexOf(numero);
  
    if (index !== -1) {
      this.numerosAleatorios.splice(index, 1);
    }
  }

  verificacionOrden()
  {
    for(let i = 0; i < this.numerosSeleccionados.length - 1; i++){
      if(this.numerosSeleccionados[i] > this.numerosSeleccionados[i + 1]){
        return false;
      }
    }
    return true;
  }

  winRondas(){ //BOTON SIGUIENTE
    //+ ronda
    // if(this.conteoNiveles == 5){
    //   this.winEndGame();
    // }else{
    if(this.conteoNiveles < 6){
      this.conteoNiveles += 1;
      //reinicio numeros aleatorios
      this.numerosSeleccionados = [];
      // this.puntos += 15;
      this.ngOnInit();

    }else{
      
      this.winEndGame();
    }
      
    // }
    // console.log("ERROR!");
  }

  winEndGame()
  {
    this.conteoNiveles -= 1;
    this.puntos += 20;
    this.ocultarimg = false;
    this.imagenes = "assets/finjuego.png";
    this.ocultarBtnLose = false;
    this.ocultarBtnRondas = true;
    this.ocultarEndGame = true;
    this.winmsg = "Felicitacion terminaste el juego!!";
    this.guardarPuntos();
  }

  reinicio()
  {
    this.guardarPuntos();
    this.conteoNiveles = 1;
    this.numerosSeleccionados = [];
    this.puntos = 0;
    this.ngOnInit();
  }

  guardarPuntos(){
    const datos = {
      email: this.email,
      puntos: + this.puntos
    };

    this.userPoints.guardarPuntos(datos,'ordenargame').then(() =>{
      console.log("puntos guardados");
    }).catch(error =>{
      console.log('error en guardar puntos');
    });


  }

}

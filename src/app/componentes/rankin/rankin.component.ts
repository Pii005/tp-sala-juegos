import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ObtenerDatosService } from '../../services/rankin/obtener-datos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rankin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './rankin.component.html',
  styleUrls: ['./rankin.component.css'] // Corrige el nombre de la propiedad a 'styleUrls'
})
export class RankinComponent {
  ranking: any[] = [];
  tabla: string = 'ahorcadogame';
  
  constructor(private router: Router, private obtenerDatosService: ObtenerDatosService) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {
    this.cambiarRanking();
  }

  cambiarRanking() {
    this.obtenerDatosService.obtenerDatos(this.tabla).subscribe((data) => {
      this.ranking = data;

      // Ordenar el ranking de mayor a menor
      this.ranking.sort((a, b) => b.puntos - a.puntos); // Suponiendo que 'puntos' es un número
      console.log(this.ranking); // Para ver los datos en la consola
    });
  }
}

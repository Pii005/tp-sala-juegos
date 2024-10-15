import { Injectable } from '@angular/core';
import { PaisesService } from './paises.service';
import { Subscription } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenesPaisesService {

  data: any[] = [];


  constructor(private paisesService: PaisesService) { }

  todos(): Observable<any[]> {
    return this.paisesService.getData();
  }

  obtenerOpciones(): Observable<any[]> {
    return new Observable(observer => {
      this.todos().subscribe(data => {
        this.data = data;

        // Crear un conjunto para almacenar los índices seleccionados
        const indicesSeleccionados = new Set<number>();

        while (indicesSeleccionados.size < 4) {
          // Generar un índice aleatorio
          const indiceAleatorio = Math.floor(Math.random() * this.data.length);
          indicesSeleccionados.add(indiceAleatorio);
        }

        // Obtener las cartas seleccionadas a partir de los índices
        const cartasSeleccionadas = Array.from(indicesSeleccionados).map(indice => this.data[indice]);

        observer.next(cartasSeleccionadas);
        observer.complete();
      });
    });
  }

}

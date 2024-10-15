import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  private cartas: Cartas[] = [];

  constructor() { 
    this.cartas.push(new Cartas(1, 'assets/orouno.png'));
    this.cartas.push(new Cartas(2, 'assets/orodos.png'));
    this.cartas.push(new Cartas(3, 'assets/orotres.png'));
    this.cartas.push(new Cartas(4, 'assets/orocuatro.png'));
    this.cartas.push(new Cartas(5, 'assets/orocinco.png'));
    this.cartas.push(new Cartas(6, 'assets/oroseis.png'));
    this.cartas.push(new Cartas(7, 'assets/orosiete.png'));
    this.cartas.push(new Cartas(8, 'assets/8_oros.jpg'));
    this.cartas.push(new Cartas(9, 'assets/9_oros.jpg'));
    this.cartas.push(new Cartas(10, 'assets/orodiez.png'));
    this.cartas.push(new Cartas(11, 'assets/oroonce.png'));
    this.cartas.push(new Cartas(12, 'assets/orodoce.png'));
  }

  obtenerCartas(cantidad: number) {
    if (cantidad > this.cartas.length) {
      throw new Error('Cantidad solicitada supera el número de elementos disponibles.');
    }

    // Crear un conjunto para almacenar los índices seleccionados
    const indicesSeleccionados = new Set<number>();

    while (indicesSeleccionados.size < cantidad) {
      // Generar un índice aleatorio
      const indiceAleatorio = Math.floor(Math.random() * this.cartas.length);
      indicesSeleccionados.add(indiceAleatorio);
    }

    // Obtener las cartas seleccionadas a partir de los índices
    const cartasSeleccionadas = Array.from(indicesSeleccionados).map(indice => this.cartas[indice]);

    return cartasSeleccionadas;
  }

}

export class Cartas {
  constructor(public id: number, public imagen: string) {}
}

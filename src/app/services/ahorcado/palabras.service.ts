import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  private palabras: string[] = [
    'mariposa',
    'flores',
    'perro',
    'gato',
    'margaritas',
    'programacion',
    'typescrip',
    'html' 
    // 'perro'
  ]

  constructor() { }

  getPalabraAleatoria(): string {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[randomIndex];
  }
}

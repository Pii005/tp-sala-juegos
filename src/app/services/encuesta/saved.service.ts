import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedService {
  private encuestaCollection: any;

  constructor(private firestore: Firestore) {
    this.encuestaCollection = collection(this.firestore, 'encuesta'); // Crear referencia a la colección 'encuesta'
  }

  // Método para guardar los datos de la encuesta
  async saveEncuesta(datos: Encuesta): Promise<void> {
    
    try {
      await addDoc(this.encuestaCollection, datos); // Guardar los datos en la colección
      console.log("Encuesta guardada con éxito.");
      
    } catch (error) {
      console.error("Error al guardar la encuesta:", error);
    }
  }
}

// Definición de la interfaz para los datos de la encuesta
export interface Encuesta {
  nombre: string;
  apellido: string;
  email: string;
  edad: number | null; // Permitir null o un número
  telefono: string;
  pregunta1: string;
  pregunta3: string;
  pregunta2: { [key: string]: boolean }; // Asumiendo que será un objeto con juegos probados
}


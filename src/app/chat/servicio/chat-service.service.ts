import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Mensaje {
  email: string;
  mensaje: string;
  fechaEnvio: Date; 
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Referencia a la colección "chat"
  private chatCollection: any;

  constructor(private firestore: Firestore) 
  {
    this.chatCollection = collection(this.firestore, 'chat');
  }

  // Método para enviar un mensaje a la colección "chat"
  enviarMensaje(mensajeData: any) {
    const chatCollection = collection(this.firestore, 'chat'); 
    return addDoc(chatCollection, mensajeData);
  }

  obtenerMensajes(): Observable<Mensaje[]> {
    const filteredQuery = query(this.chatCollection, orderBy("fechaEnvio", "asc"));
    return collectionData(filteredQuery) as Observable<Mensaje[]>; // Devuelve el observable
  }

}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) {}

  async guardarMensaje(mensajeData: any) {
    const col = collection(this.firestore, 'chat'); // Nombre de la colección
    await addDoc(col, mensajeData);
  }
}

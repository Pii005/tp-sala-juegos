import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, updateDoc, doc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserPointsService {

  constructor(private firestore: Firestore) { }

  async guardarPuntos(data: any, coleccion: string){
    const ref = collection(this.firestore, coleccion);
    const q = query(ref, where('email', '==', data.email));

    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Si ya existe, actualizamos el documento
      const existingDoc = querySnapshot.docs[0]; // Asumimos que solo hay un documento por usuario
      const puntosActuales = existingDoc.data()['puntos'] || 0; // Acceso con notación de corchetes
      const nuevosPuntos = puntosActuales + data.puntos; // Sumamos los puntos

      const docRef = doc(this.firestore, `${coleccion}/${existingDoc.id}`);
      return await updateDoc(docRef, { puntos: nuevosPuntos });
    } else {
      // Si no existe, creamos un nuevo documento
      return await addDoc(ref, data);
    }
  
  }

}

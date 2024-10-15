import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ObtenerDatosService {

  constructor(private firestore: Firestore) { }

  obtenerDatos(nombreColeccion: string): Observable<any[]> {
    const colRef = collection(this.firestore, nombreColeccion);

    return from(getDocs(colRef)).pipe(
      map(snapshot => {
        // Mapea los documentos a un arreglo
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
    );
  }
}

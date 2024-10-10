import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCheckService {
  constructor(private firestore: Firestore) {}

  async checkIfUserExists(email: string): Promise<boolean> {
    const usersCollection = collection(this.firestore, 'Usuarios');
    const q = query(usersCollection, where('user', '==', email));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
  }

  


}
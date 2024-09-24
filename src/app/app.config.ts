import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"tp-sala-juegos-97955","appId":"1:193827958558:web:e562b2a720310e63aa230f","storageBucket":"tp-sala-juegos-97955.appspot.com","apiKey":"AIzaSyDqrYreAUkwnQ2PMsKj7R5bD_hQBzeXG7w","authDomain":"tp-sala-juegos-97955.firebaseapp.com","messagingSenderId":"193827958558"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';

import { ChatComponent } from './chat/chat.component';

// Importa el módulo de autenticación
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { JuegosModule } from './juegos/juegos.module';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },

    {path: 'chat', component: ChatComponent},
    { 
        path: 'auth', 
        loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
    },
    { path: 'juegos',
        loadChildren: () =>import('./juegos/juegos.module').then(m=>m.JuegosModule)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
    ];
    

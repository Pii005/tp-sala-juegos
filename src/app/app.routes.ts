import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { ChatComponent } from './chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { RankinComponent } from './componentes/rankin/rankin.component';
// Importa el módulo de autenticación
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { JuegosModule } from './juegos/juegos.module';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path: 'quien-soy', component: QuienSoyComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'encuesta', component: EncuestaComponent},
    { path:'rankin', component: RankinComponent},
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
    

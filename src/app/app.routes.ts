import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AhorcadoGameComponent } from './componentes/ahorcado-game/ahorcado-game.component';
import { MayormenorComponent } from './componentes/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { OrdenarNumerosComponent } from './componentes/ordenar-numeros/ordenar-numeros.component';

// Importa el módulo de autenticación
import { AutenticacionModule } from './autenticacion/autenticacion.module';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'ahorcado', component: AhorcadoGameComponent },
    { path: 'mayor-menor', component: MayormenorComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    { path: 'ordenar', component: OrdenarNumerosComponent },
    
    // Cambia la ruta a 'auth' y luego el módulo se encargará de la ruta 'login'
    { 
        path: 'auth', 
        loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
    ];
    

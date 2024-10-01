import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'login', loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule) },
    { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' } // Redirige a Home en caso de rutas no encontradas
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

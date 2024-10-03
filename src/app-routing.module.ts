import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/componentes/home/home.component';
import { QuienSoyComponent } from './app/componentes/quien-soy/quien-soy.component';
import { AutenticacionModule } from './app/autenticacion/autenticacion.module';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'login', loadChildren: () => import('./app/autenticacion/autenticacion.module').then(m => m.AutenticacionModule) },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' } // Redirige a Home en caso de rutas no encontradas
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

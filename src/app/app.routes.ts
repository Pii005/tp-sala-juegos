import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AhorcadoGameComponent } from './componentes/ahorcado-game/ahorcado-game.component';
import { MayormenorComponent } from './componentes/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { RegisterComponent } from './componentes/register/register.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'quien-soy', component: QuienSoyComponent},
    { path: 'ahorcado', component: AhorcadoGameComponent },
    { path: 'mayor-menor', component: MayormenorComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: '**', component: HomeComponent }
];


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    {
        path: 'auth',
        loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

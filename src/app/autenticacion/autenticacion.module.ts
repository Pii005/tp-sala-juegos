import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ])
    ],
    exports: [RouterModule] // Si necesitas exportar el RouterModule
})
export class AutenticacionModule {}

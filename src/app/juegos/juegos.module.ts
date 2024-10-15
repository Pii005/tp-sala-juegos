import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AhorcadoGameComponent } from './componentes/ahorcado-game/ahorcado-game.component';
import { MayormenorComponent } from './componentes/mayormenor/mayormenor.component';
import { OrdenarNumerosComponent } from './componentes/ordenar-numeros/ordenar-numeros.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'ahorcado', component: AhorcadoGameComponent },
      { path: 'mayor-menor', component: MayormenorComponent },
      { path: 'preguntados', component: PreguntadosComponent },
      { path: 'ordenar', component: OrdenarNumerosComponent }
  ]),
  CommonModule,
  HttpClientModule
  ],
  exports: [RouterModule]
})
export class JuegosModule { }

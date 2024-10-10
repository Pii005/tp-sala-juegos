import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AhorcadoGameComponent } from './componentes/ahorcado-game/ahorcado-game.component';
import { MayormenorComponent } from './componentes/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { OrdenarNumerosComponent } from './componentes/ordenar-numeros/ordenar-numeros.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'ahorcado', component: AhorcadoGameComponent },
      { path: 'mayor-menor', component: MayormenorComponent },
      { path: 'preguntados', component: PreguntadosComponent },
      { path: 'ordenar', component: OrdenarNumerosComponent }
  ]),
  CommonModule
  ],
  exports: [RouterModule]
})
export class JuegosModule { }

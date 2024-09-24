import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-ahorcado-game',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './ahorcado-game.component.html',
  styleUrl: './ahorcado-game.component.css'
})
export class AhorcadoGameComponent {
  constructor(private router: Router) {

  }
}

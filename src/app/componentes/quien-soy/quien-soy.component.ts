import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent {

  constructor(private router: Router) 
  {

  }

  goTo(path: string) {
    // console.log("Redirigiendo...");
    this.router.navigate([path]);
  }

}

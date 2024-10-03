import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  constructor(private router: Router) 
  {

  }


  goTo(path: string) {
    // console.log("Redirigiendo...");
    this.router.navigate([path]);
  }
}

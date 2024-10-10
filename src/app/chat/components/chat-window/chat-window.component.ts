import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ChatService, Mensaje } from '../../servicio/chat-service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  nuevoMensaje: string = ''; // Mensaje que ingresa el usuario
  email: string = ''; // Email del usuario
  mensajes$: Observable<Mensaje[]> = of([]); // Observable para los mensajes

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Obtener el email del usuario guardado en el localStorage
    this.email = localStorage.getItem('userEmail') || '';
    // Obtener los mensajes desde el servicio
    this.mensajes$ = this.chatService.obtenerMensajes(); // Asignar el observable
  }

  async enviarMensaje() {
    if(this.email)
    {
      if (this.nuevoMensaje.trim()) {
        const mensajeData = {
          email: this.email,
          mensaje: this.nuevoMensaje,
          fechaEnvio: Timestamp.fromDate(new Date()) // Fecha y hora actual
        };
  
        try {
          // Enviar el mensaje a Firestore
          await this.chatService.enviarMensaje(mensajeData);
          console.log("mensaje guardado: " + this.nuevoMensaje + " ENVIADO POR: " + this.email);
          this.nuevoMensaje = ''; // Limpiar el campo del mensaje
        } catch (error) {
          console.error('Error al enviar el mensaje:', error);
        }
      }
    }else{
      console.log("No esta registrado el usuario");
    }
  }

  convertirTimestampAFecha(timestamp: any): Date {
    return timestamp ? timestamp.toDate() : null; // Convierte el Timestamp a Date
  }

}

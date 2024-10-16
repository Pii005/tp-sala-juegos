import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ChatService, Mensaje } from '../../servicio/chat-service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  nuevoMensaje: string = ''; // Mensaje que ingresa el usuario
  email: string = ''; // Email del usuario
  mensajes$: Observable<Mensaje[]> = of([]); // Observable para los mensajes

  // Referencia al contenedor de mensajes
  @ViewChild('chatMessages') private chatMessagesContainer?: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Obtener el email del usuario guardado en el localStorage
    this.email = localStorage.getItem('userEmail') || '';
    // Obtener los mensajes desde el servicio
    this.mensajes$ = this.chatService.obtenerMensajes(); // Asignar el observable
  }

  ngAfterViewChecked() {
    // Autoscroll después de que la vista ha sido actualizada
    this.scrollToBottom();
  }

  async enviarMensaje() {
    if (this.email) {
      if (this.nuevoMensaje.trim()) {
        const mensajeData = {
          email: this.email,
          mensaje: this.nuevoMensaje,
          fechaEnvio: Timestamp.fromDate(new Date()) // Fecha y hora actual
        };

        try {
          // Enviar el mensaje a Firestore
          await this.chatService.enviarMensaje(mensajeData);
          this.nuevoMensaje = ''; // Limpiar el campo del mensaje
        } catch (error) {
          console.error('Error al enviar el mensaje:', error);
        }
      }
    } else {
      console.log("No está registrado el usuario");
    }
  }

  convertirTimestampAFecha(timestamp: any): Date {
    return timestamp ? timestamp.toDate() : null; // Convierte el Timestamp a Date
  }

  // Método para hacer scroll automático al final del contenedor de mensajes
  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    }
  }
  
}

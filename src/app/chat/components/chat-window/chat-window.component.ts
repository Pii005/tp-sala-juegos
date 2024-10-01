import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { ChatService } from '../../servicio/chat-service.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  form: FormGroup;

  constructor(private ChatService: ChatService) {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.maxLength(50)]) // Máximo 50 caracteres
    });
  }

  enviarMensaje() {
    if (this.form.valid) {
      const message = this.form.get('message')?.value;
      const email = localStorage.getItem('userEmail') || '';

      // Obtén la fecha y hora actual
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1; // Los meses son 0-11
      const anio = fecha.getFullYear();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();

      const mensajeData = {
        user: email,
        mensaje: message,
        fecha: fecha
      };

      // Llama al servicio para guardar el mensaje
      this.ChatService.guardarMensaje(mensajeData).then(() => {
        this.form.reset(); // Limpiar el formulario después de enviar
      }).catch((error: any ) => {
        console.error("Error al enviar el mensaje: ", error);
      });
    }
  }
}

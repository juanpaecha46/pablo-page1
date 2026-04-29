// Componente Contacto
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  // Modelo del formulario de contacto
  formulario = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  // Variable para mostrar mensaje de envío
  enviado: boolean = false;

  // Método para enviar contacto
  enviar(): void {
    // Validar campos
    if (!this.formulario.nombre || !this.formulario.email || !this.formulario.mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Aquí se enviaría a un backend en una aplicación real
    console.log('Contacto enviado:', this.formulario);

    // Mostrar mensaje de éxito
    this.enviado = true;

    // Limpiar formulario
    this.limpiarFormulario();

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      this.enviado = false;
    }, 3000);
  }

  // Método para limpiar formulario
  limpiarFormulario(): void {
    this.formulario = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    };
  }
}

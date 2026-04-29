// Componente Crear (para crear nuevos servicios)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio.model';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  // @Output = evento cuando se crea un servicio
  @Output() servicioCreadoOKs = new EventEmitter<void>();

  // Modelo del formulario
  formulario = {
    nombre: '',
    descripcion: '',
    categoria: '',
    urlImagen: ''
  };

  // Array de categorías
  categorias: string[] = [];

  // Variable para mostrar mensajes
  mensaje: string = '';

  constructor(private servicioService: ServicioService) {
    this.categorias = this.servicioService.obtenerCategorias();
  }

  // Método para crear servicio
  crearServicio(): void {
    // Validar que los campos no estén vacíos
    if (!this.formulario.nombre || !this.formulario.descripcion || !this.formulario.categoria) {
      this.mensaje = 'Por favor completa todos los campos.';
      return;
    }

    // Crear nuevo servicio
    const nuevoServicio: Servicio = {
      id: Date.now().toString(),
      nombre: this.formulario.nombre,
      descripcion: this.formulario.descripcion,
      categoria: this.formulario.categoria,
      urlImagen: this.formulario.urlImagen || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60',
      destacado: false
    };

    // Agregar servicio al servicio
    this.servicioService.agregarServicio(nuevoServicio);

    // Mostrar mensaje de éxito
    this.mensaje = '✅ Servicio creado exitosamente!';

    // Limpiar formulario
    this.limpiarFormulario();

    // Navegar a servicios después de 2 segundos
    setTimeout(() => {
      this.servicioCreadoOKs.emit();
    }, 2000);
  }

  // Método para limpiar el formulario
  limpiarFormulario(): void {
    this.formulario = {
      nombre: '',
      descripcion: '',
      categoria: '',
      urlImagen: ''
    };
  }
}

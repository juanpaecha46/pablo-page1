// Componente Servicios (lista de todos los servicios)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio.model';
import { TarjetaServicioComponent } from '../../tarjeta-servicio/tarjeta-servicio.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaServicioComponent],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  // Array con todos los servicios filtrados
  servicios: Servicio[] = [];

  // Variables para los filtros
  busqueda: string = '';
  categoriaSeleccionada: string = '';

  // Array de categorías disponibles
  categorias: string[] = [];

  constructor(private servicioService: ServicioService) {
    this.categorias = this.servicioService.obtenerCategorias();
    this.filtrar();
  }

  // Método para filtrar servicios
  filtrar(): void {
    let resultado = this.servicioService.obtenerServicios();

    // Filtrar por categoría
    if (this.categoriaSeleccionada) {
      resultado = resultado.filter(s => s.categoria === this.categoriaSeleccionada);
    }

    // Filtrar por búsqueda
    if (this.busqueda) {
      resultado = resultado.filter(s =>
        s.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        s.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }

    this.servicios = resultado;
  }

  // Método para ver detalle
  verDetalle(id: string): void {
    localStorage.setItem('servicioId', id);
    // Aquí se navigaría en una aplicación real
  }

  // Métodos para favoritos
  agregarAFavoritos(id: string): void {
    this.servicioService.agregarAFavoritos(id);
  }

  quitarDeFavoritos(id: string): void {
    this.servicioService.quitarDeFavoritos(id);
  }
}

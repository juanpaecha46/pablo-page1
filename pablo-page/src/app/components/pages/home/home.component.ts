// Componente Home (página de inicio)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio.model';
import { TarjetaServicioComponent } from '../../tarjeta-servicio/tarjeta-servicio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarjetaServicioComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // @Output = evento para navegar a otras páginas
  @Output() navegarA = new EventEmitter<string>();

  // Array con servicios destacados
  serviciosDestacados: Servicio[] = [];

  constructor(private servicioService: ServicioService) {
    // Obtener solo los servicios que son destacados
    this.serviciosDestacados = this.servicioService.obtenerServicios()
      .filter(s => s.destacado)
      .slice(0, 3); // Mostrar solo 3
  }

  // Método para ir a la página de servicios
  irAServicios(): void {
    this.navegarA.emit('servicios');
  }

  // Método para contactar
  irAContacto(): void {
    this.navegarA.emit('contacto');
  }

  // Método para ver detalle
  verDetalle(id: string): void {
    // Guardar el ID en localStorage para que el componente de detalle lo use
    localStorage.setItem('servicioId', id);
    this.navegarA.emit('detalle');
  }

  // Método para agregar a favoritos
  agregarAFavoritos(id: string): void {
    this.servicioService.agregarAFavoritos(id);
  }

  // Método para quitar de favoritos
  quitarDeFavoritos(id: string): void {
    this.servicioService.quitarDeFavoritos(id);
  }
}

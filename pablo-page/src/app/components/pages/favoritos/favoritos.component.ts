// Componente Favoritos
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio.model';
import { TarjetaServicioComponent } from '../../tarjeta-servicio/tarjeta-servicio.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, TarjetaServicioComponent],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  // Array con servicios favoritos
  favoritos: Servicio[] = [];

  constructor(private servicioService: ServicioService) {
    // Suscribirse a cambios en favoritos
    this.servicioService.favoritos$.subscribe(() => {
      this.actualizarFavoritos();
    });
    this.actualizarFavoritos();
  }

  // Método para actualizar la lista de favoritos
  actualizarFavoritos(): void {
    this.favoritos = this.servicioService.obtenerFavoritos();
  }

  // Métodos para acciones
  verDetalle(id: string): void {
    localStorage.setItem('servicioId', id);
  }

  agregarAFavoritos(id: string): void {
    this.servicioService.agregarAFavoritos(id);
  }

  quitarDeFavoritos(id: string): void {
    this.servicioService.quitarDeFavoritos(id);
  }
}

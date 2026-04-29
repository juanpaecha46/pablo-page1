// Componente Detalle (detalle de un servicio)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../../services/servicio.service';
import { Servicio } from '../../../models/servicio.model';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  // Servicio a mostrar
  servicio: Servicio | null = null;

  // Variable para saber si está en favoritos
  esFavorito: boolean = false;

  constructor(private servicioService: ServicioService) { }

  // ngOnInit = se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Obtener el ID del servicio de localStorage
    const id = localStorage.getItem('servicioId');

    if (id) {
      // Buscar el servicio por ID
      this.servicio = this.servicioService.obtenerServicioPorId(id) || null;

      // Verificar si es favorito
      this.servicioService.favoritos$.subscribe(() => {
        if (this.servicio) {
          this.esFavorito = this.servicioService.esFavorito(this.servicio.id);
        }
      });

      // Cargar estado inicial de favorito
      if (this.servicio) {
        this.esFavorito = this.servicioService.esFavorito(this.servicio.id);
      }
    }
  }

  // Método para agregar/quitar de favoritos
  toggleFavorito(): void {
    if (!this.servicio) return;

    if (this.esFavorito) {
      this.servicioService.quitarDeFavoritos(this.servicio.id);
    } else {
      this.servicioService.agregarAFavoritos(this.servicio.id);
    }
  }

  // Método para contactar
  contactar(): void {
    alert('Contactando con el proveedor...');
  }
}

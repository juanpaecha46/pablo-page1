// Componente de tarjeta de servicio reutilizable
// Este componente se usa para mostrar cada servicio en las listas
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio } from '../../models/servicio.model';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-tarjeta-servicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-servicio.component.html',
  styleUrls: ['./tarjeta-servicio.component.css']
})
export class TarjetaServicioComponent {
  // @Input = recibe datos del componente padre
  @Input() servicio!: Servicio;

  // @Output = envía eventos al componente padre
  @Output() verDetalle = new EventEmitter<string>();
  @Output() agregarFavorito = new EventEmitter<string>();
  @Output() quitarFavorito = new EventEmitter<string>();

  // Variable para saber si está en favoritos
  esFavorito: boolean = false;

  constructor(private servicioService: ServicioService) { }

  // ngOnInit = se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Verificar si el servicio está en favoritos
    this.servicioService.favoritos$.subscribe(() => {
      this.esFavorito = this.servicioService.esFavorito(this.servicio.id);
    });
  }

  // Método para ver detalles del servicio
  ver(): void {
    this.verDetalle.emit(this.servicio.id);
  }

  // Método para agregar/quitar de favoritos
  toggleFavorito(): void {
    if (this.esFavorito) {
      this.quitarFavorito.emit(this.servicio.id);
    } else {
      this.agregarFavorito.emit(this.servicio.id);
    }
  }
}

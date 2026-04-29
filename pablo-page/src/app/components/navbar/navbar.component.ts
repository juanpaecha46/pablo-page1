// Componente Navbar (barra de navegación)
// Navbar = componente que muestra los botones de navegación
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // @Input = propiedad que viene del componente padre
  @Input() paginaActual: string = 'inicio';

  // @Output = evento que envía información al componente padre
  @Output() cambiarPagina = new EventEmitter<string>();

  // Lista de opciones del menú
  enlaces = [
    { ruta: 'inicio', texto: 'Inicio' },
    { ruta: 'servicios', texto: 'Servicios' },
    { ruta: 'favoritos', texto: 'Favoritos' },
    { ruta: 'crear', texto: 'Crear Servicio' },
    { ruta: 'contacto', texto: 'Contacto' }
  ];

  // Método para navegar a una página
  navegar(ruta: string): void {
    this.cambiarPagina.emit(ruta);
  }
}

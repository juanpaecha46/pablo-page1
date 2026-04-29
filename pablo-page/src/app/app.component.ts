// Componente raíz de la aplicación
// App Component = es el componente "padre" que contiene toda la aplicación
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ServiciosComponent } from './components/pages/servicios/servicios.component';
import { FavoritosComponent } from './components/pages/favoritos/favoritos.component';
import { CrearComponent } from './components/pages/crear/crear.component';
import { DetalleComponent } from './components/pages/detalle/detalle.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HomeComponent,
    ServiciosComponent,
    FavoritosComponent,
    CrearComponent,
    DetalleComponent,
    ContactoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variable que controla qué página se muestra
  paginaActual: string = 'inicio';

  // Método para cambiar la página actual
  // Se ejecuta cuando hace clic en la navegación
  cambiarPagina(ruta: string): void {
    this.paginaActual = ruta;
  }
}

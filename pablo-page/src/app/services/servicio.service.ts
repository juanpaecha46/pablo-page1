// Servicio para manejar los datos
// En Angular, los servicios se usan para compartir datos y lógica entre componentes
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación
})
export class ServicioService {
  
  // BehaviorSubject = forma de compartir datos entre componentes
  private serviciosSubject = new BehaviorSubject<Servicio[]>([
    {
      id: '1',
      nombre: 'Servicio 1',
      urlImagen: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=60',
      descripcion: 'Excelente servicio, muy recomendado.',
      categoria: 'Hogar',
      destacado: true,
    },
    {
      id: '2',
      nombre: 'Servicio 2',
      urlImagen: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=60',
      descripcion: 'Muy profesional y puntual.',
      categoria: 'Tecnología',
      destacado: true,
    },
    {
      id: '3',
      nombre: 'Servicio 3',
      urlImagen: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=60',
      descripcion: 'Gran experiencia, volveré a contratar.',
      categoria: 'Diseño',
      destacado: true,
    },
  ]);

  private favoritosSubject = new BehaviorSubject<string[]>([]);
  
  // Observable = permite que los componentes se "suscriban" a cambios de datos
  servicios$ = this.serviciosSubject.asObservable();
  favoritos$ = this.favoritosSubject.asObservable();

  constructor() { }

  // Obtener todos los servicios
  obtenerServicios(): Servicio[] {
    return this.serviciosSubject.value;
  }

  // Obtener un servicio por ID
  obtenerServicioPorId(id: string): Servicio | undefined {
    return this.obtenerServicios().find(s => s.id === id);
  }

  // Obtener servicios por categoría
  obtenerPorCategoria(categoria: string): Servicio[] {
    if (!categoria) return this.obtenerServicios();
    return this.obtenerServicios().filter(s => s.categoria === categoria);
  }

  // Buscar servicios por nombre
  buscar(texto: string): Servicio[] {
    if (!texto) return this.obtenerServicios();
    return this.obtenerServicios().filter(s =>
      s.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(texto.toLowerCase())
    );
  }

  // Obtener categorías únicas
  obtenerCategorias(): string[] {
    const cats = new Set(this.obtenerServicios().map(s => s.categoria));
    return Array.from(cats).sort();
  }

  // Agregar nuevo servicio
  agregarServicio(servicio: Servicio): void {
    const servicios = this.obtenerServicios();
    servicios.push(servicio);
    this.serviciosSubject.next(servicios);
  }

  // Agregar a favoritos
  agregarAFavoritos(id: string): void {
    const favoritos = this.favoritosSubject.value;
    if (!favoritos.includes(id)) {
      this.favoritosSubject.next([...favoritos, id]);
    }
  }

  // Quitar de favoritos
  quitarDeFavoritos(id: string): void {
    const favoritos = this.favoritosSubject.value.filter(f => f !== id);
    this.favoritosSubject.next(favoritos);
  }

  // Verificar si es favorito
  esFavorito(id: string): boolean {
    return this.favoritosSubject.value.includes(id);
  }

  // Obtener solo favoritos
  obtenerFavoritos(): Servicio[] {
    const ids = this.favoritosSubject.value;
    return this.obtenerServicios().filter(s => ids.includes(s.id));
  }
}

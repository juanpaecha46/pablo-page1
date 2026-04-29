# 📖 Guía de Estudio de Angular

Esta guía explica los conceptos clave de la aplicación. **¡Lee esto mientras trabajas con el código!**

## 1️⃣ Estructura de un Componente

Todo componente en Angular tiene 3 archivos:

### `*.component.ts` (Lógica)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-componente',      // Nombre en HTML: <app-mi-componente></app-mi-componente>
  templateUrl: './mi.component.html', // Archivo HTML
  styleUrls: ['./mi.component.css']   // Archivo CSS
})
export class MiComponente {
  // Aquí va la lógica del componente
  contador: number = 0;

  incrementar() {
    this.contador++;
  }
}
```

### `*.component.html` (Interfaz/Plantilla)
```html
<div>
  <h1>Mi Componente</h1>
  <p>Contador: {{ contador }}</p>
  <button (click)="incrementar()">Sumar</button>
</div>
```

### `*.component.css` (Estilos)
```css
h1 {
  color: #3b8f3a;
  font-size: 24px;
}
```

---

## 2️⃣ Data Binding (Lo Más Importante)

### Interpolation - Mostrar variables
```typescript
export class Demo {
  nombre = "Juan";
  edad = 30;
}
```

```html
<!-- Mostrar en el HTML -->
<p>{{ nombre }} tiene {{ edad }} años</p>
<!-- Resultado: Juan tiene 30 años -->
```

### Property Binding - Enviar datos al HTML
```typescript
export class Demo {
  imagenUrl = "https://ejemplo.com/imagen.jpg";
}
```

```html
<!-- Sintaxis: [propiedad]="variable" -->
<img [src]="imagenUrl" />
<div [disabled]="noDisponible"></div>
<h1 [style.color]="'red'">Título en rojo</h1>
```

### Event Binding - Recibir eventos del usuario
```typescript
export class Demo {
  contador = 0;

  hacer() {
    console.log("¡Botón presionado!");
  }

  incrementar(numero: number) {
    this.contador += numero;
  }
}
```

```html
<!-- Sintaxis: (evento)="función()" -->
<button (click)="hacer()">Clic</button>
<button (click)="incrementar(1)">+1</button>
<input (keyup.enter)="hacer()">
<!-- Se ejecuta 'hacer()' cuando presionas Enter -->
```

### Two-Way Binding - Flujo bidireccional
```typescript
export class Demo {
  nombre = "";
}
```

```html
<!-- Sintaxis: [(ngModel)]="variable" -->
<!-- IMPORTANTE: Requiere FormsModule importado -->
<input [(ngModel)]="nombre" placeholder="Tu nombre">
<p>Hola, {{ nombre }}!</p>

<!-- Cuando escribes en el input, la variable se actualiza -->
<!-- Cuando cambias la variable en TypeScript, el input se actualiza -->
```

---

## 3️⃣ Directivas (Controlar el HTML)

### *ngFor - Repetir elementos
```typescript
export class Demo {
  servicios = [
    { id: 1, nombre: "Diseño Web" },
    { id: 2, nombre: "Programación" }
  ];
}
```

```html
<!-- Repite el elemento por cada servicio -->
<div *ngFor="let servicio of servicios">
  <h3>{{ servicio.nombre }}</h3>
</div>

<!-- También puedes obtener el índice -->
<div *ngFor="let servicio of servicios; let i = index">
  <p>{{ i + 1 }}. {{ servicio.nombre }}</p>
</div>
<!-- Resultado:
  1. Diseño Web
  2. Programación
-->
```

### *ngIf - Mostrar/ocultar condicionalmente
```typescript
export class Demo {
  estaLogueado = false;
  servicios = [];
}
```

```html
<!-- Mostrar solo si la condición es verdadera -->
<div *ngIf="estaLogueado">
  <p>¡Bienvenido!</p>
</div>

<!-- Si no hay servicios, mostrar mensaje -->
<div *ngIf="servicios.length === 0">
  <p>No hay servicios disponibles</p>
</div>

<!-- Si... si no... -->
<div *ngIf="estaLogueado; else noLogueado">
  <p>Estás logueado</p>
</div>
<ng-template #noLogueado>
  <p>Debes iniciar sesión</p>
</ng-template>
```

### [ngClass] - Agregar clases dinámicamente
```typescript
export class Demo {
  estaActivo = true;
  estado = 'success'; // 'success', 'error', 'warning'
}
```

```html
<!-- Una clase condicional -->
<button [class.activo]="estaActivo">Botón</button>

<!-- Múltiples clases -->
<div [ngClass]="{ 'activo': estaActivo, 'destacado': true }"></div>

<!-- Clases según valor -->
<div [ngClass]="'estado-' + estado">
  <!-- Si estado='success', clase es 'estado-success' -->
</div>

<!-- En CSS -->
<style>
  .activo { background: green; }
  .estado-success { color: green; }
  .estado-error { color: red; }
</style>
```

### [ngStyle] - Agregar estilos dinámicamente
```typescript
export class Demo {
  color = 'blue';
  tamaño = 20;
}
```

```html
<!-- Estilo individual -->
<p [style.color]="color">Texto azul</p>

<!-- Múltiples estilos -->
<p [ngStyle]="{ 'color': color, 'font-size': tamaño + 'px' }">
  Texto personalizado
</p>
```

### [ngSwitch] - Mostrar un elemento según condición
```typescript
export class Demo {
  pagina = 'inicio'; // 'inicio', 'servicios', 'contacto'
}
```

```html
<div [ngSwitch]="pagina">
  <div *ngSwitchCase="'inicio'">
    <h1>Página de Inicio</h1>
  </div>
  
  <div *ngSwitchCase="'servicios'">
    <h1>Servicios</h1>
  </div>
  
  <div *ngSwitchDefault>
    <h1>Página no encontrada</h1>
  </div>
</div>
```

---

## 4️⃣ Input y Output (Comunicación entre Componentes)

### @Input - Recibir datos del componente padre

**Componente padre:**
```typescript
export class PadreComponent {
  nombreServicio = "Diseño Web";
}
```

```html
<!-- Pasamos datos al componente hijo -->
<app-tarjeta [servicio]="nombreServicio"></app-tarjeta>
```

**Componente hijo (tarjeta.component.ts):**
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta'
})
export class TarjetaComponent {
  @Input() servicio!: string; // Recibe del padre
}
```

```html
<!-- Usamos el dato recibido -->
<div class="tarjeta">
  <h3>{{ servicio }}</h3>
</div>
```

### @Output - Enviar eventos al componente padre

**Componente hijo:**
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boton'
})
export class BotonComponent {
  @Output() miEvento = new EventEmitter();

  hacer() {
    // Enviar evento al padre
    this.miEvento.emit('Botón presionado desde el hijo');
  }
}
```

```html
<button (click)="hacer()">Clic</button>
```

**Componente padre:**
```typescript
export class PadreComponent {
  recibirMensaje(mensaje: string) {
    console.log(mensaje);
  }
}
```

```html
<!-- Escuchar el evento del hijo -->
<app-boton (miEvento)="recibirMensaje($event)"></app-boton>
```

---

## 5️⃣ Services (Compartir datos entre componentes)

En Angular, los servicios son clases que comparten lógica y datos.

```typescript
// servicio-datos.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Disponible en toda la aplicación
})
export class ServicioDatosService {
  private datos = ['Servicio 1', 'Servicio 2'];

  obtenerDatos() {
    return this.datos;
  }

  agregarDato(dato: string) {
    this.datos.push(dato);
  }
}
```

**Usar el servicio en un componente:**
```typescript
import { Component, OnInit } from '@angular/core';
import { ServicioDatosService } from './servicio-datos.service';

@Component({
  selector: 'app-mi-componente'
})
export class MiComponente implements OnInit {
  datos: string[] = [];

  constructor(private servicio: ServicioDatosService) { }

  ngOnInit() {
    // Obtener datos del servicio
    this.datos = this.servicio.obtenerDatos();
  }

  agregar(nuevo: string) {
    this.servicio.agregarDato(nuevo);
  }
}
```

---

## 6️⃣ Observables y BehaviorSubject (Para datos en tiempo real)

Los Observables permite reaccionar a cambios de datos:

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MiServicio {
  // BehaviorSubject = variable que otros pueden "escuchar"
  private datosSubject = new BehaviorSubject(['Dato 1', 'Dato 2']);
  
  // Observable = forma de escuchar cambios
  datos$ = this.datosSubject.asObservable();

  agregarDato(nuevo: string) {
    const actual = this.datosSubject.value;
    this.datosSubject.next([...actual, nuevo]);
  }
}
```

**Suscribirse en un componente:**
```typescript
export class MiComponente implements OnInit {
  datos: string[] = [];

  constructor(private servicio: MiServicio) { }

  ngOnInit() {
    // Suscribirse a cambios
    this.servicio.datos$.subscribe(nuevos => {
      this.datos = nuevos;
      console.log('Datos actualizados:', nuevos);
    });
  }
}
```

```html
<!-- Mostrar datos -->
<div *ngFor="let dato of datos">
  {{ dato }}
</div>
```

---

## 7️⃣ Ciclo de Vida (Lifecycle Hooks)

Angular ejecuta funciones en momentos específicos:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({ selector: 'app-demo' })
export class DemoComponent implements OnInit, OnDestroy {
  
  // Se ejecuta cuando el componente está listo
  ngOnInit() {
    console.log('Componente inicializado');
    // Aquí obtener datos del servidor
  }

  // Se ejecuta justo antes de destruir el componente
  ngOnDestroy() {
    console.log('Componente destruido');
    // Aquí limpiar recursos
  }
}
```

**Otros lifecycle hooks:**
- `ngOnInit()` - Inicialización
- `ngOnChanges()` - Cuando cambian @Input
- `ngDoCheck()` - Detección de cambios manual
- `ngAfterViewInit()` - Después de renderizar
- `ngOnDestroy()` - Destrucción

---

## 8️⃣ Formularios (FormsModule)

Para usar formularios necesitas importar `FormsModule`:

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule]  // Agregar aquí
})
export class MiComponente { }
```

**Binding bidireccional con formularios:**
```typescript
export class FormularioComponent {
  usuario = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  enviar() {
    console.log(this.usuario);
  }
}
```

```html
<form (submit)="enviar()">
  <input [(ngModel)]="usuario.nombre" name="nombre" placeholder="Nombre">
  <input [(ngModel)]="usuario.email" name="email" placeholder="Email">
  <textarea [(ngModel)]="usuario.mensaje" name="mensaje"></textarea>
  <button type="submit">Enviar</button>
</form>
```

---

## 9️⃣ Ejemplos Prácticos en Juan Servicios

### Ejemplo 1: Componente reutilizable (tarjeta-servicio)
```typescript
@Component({
  selector: 'app-tarjeta-servicio'
})
export class TarjetaServicioComponent {
  @Input() servicio!: Servicio;           // Recibe datos
  @Output() verDetalle = new EventEmitter();  // Envía eventos
}
```

### Ejemplo 2: Usar un servicio
```typescript
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private servicioService: ServicioService) { }

  ngOnInit() {
    this.servicios = this.servicioService.obtenerServicios();
  }
}
```

### Ejemplo 3: Filtrar datos
```typescript
filtrar(texto: string) {
  this.servicios = this.servicioService.buscar(texto);
}
```

```html
<input [(ngModel)]="busqueda" (input)="filtrar(busqueda)">
<div *ngFor="let s of servicios">{{ s.nombre }}</div>
```

---

## 🎯 Resumen Rápido

| Concepto | Sintaxis | Uso |
|----------|----------|-----|
| Interpolation | `{{ variable }}` | Mostrar datos |
| Property Binding | `[prop]="variable"` | Enviar datos |
| Event Binding | `(evento)="función()"` | Recibir eventos |
| Two-Way Binding | `[(ngModel)]="variable"` | Formularios |
| *ngFor | `*ngFor="let x of lista"` | Repetir |
| *ngIf | `*ngIf="condición"` | Condicionales |
| [ngClass] | `[ngClass]="{ clase: bool }"` | Clases dinámicas |
| @Input | `@Input() prop;` | Recibir datos |
| @Output | `@Output() evento = new EventEmitter()` | Enviar datos |

---

## 📚 Aprende Más

Todos estos conceptos están **aplicados en Juan Servicios**. 

Busca en el código:
- **Binding**: `src/app/components/*/` (en los `.html`)
- **Servicios**: `src/app/services/`
- **Componentes**: `src/app/components/`

¡**Abre los archivos y lee los comentarios en español!** 🚀

---

**¡Feliz aprendizaje de Angular!** 😊

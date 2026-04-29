# ✨ Características de Juan Servicios

Guía rápida de todas las funcionalidades de la aplicación.

---

## 🏠 Página de Inicio

### Qué ves
- Banner principal con llamada a la acción
- 3 servicios destacados
- Sección de testimonios
- Botones de navegación

### Qué puedes hacer
- Haz clic en "Ver Servicios" para ir al listado
- Haz clic en "Contactar" para ir a contacto
- Haz clic en los botones de corazón (♡) para guardar favoritos
- Haz clic en "Ver Detalle" para ver información completa

### Conceptos Angular
```
- ngFor: Mostrar los 3 servicios destacados
- ngSwitch: Cambiar entre páginas
- Event binding: (click) en botones
- Property binding: [ngClass] para los corazones
```

---

## 🔍 Página de Servicios (Listado)

### Qué ves
- Barra de búsqueda
- Filtro por categoría
- Cuadrícula con todos los servicios
- Cada servicio en una tarjeta

### Qué puedes hacer
1. **Buscar por nombre o descripción**
   - Escribe en "Buscar servicios..."
   - Se filtra en tiempo real

2. **Filtrar por categoría**
   - Abre el dropdown "Categoría"
   - Se muestra solo los de esa categoría

3. **Ver detalle**
   - Haz clic en "Ver Detalle"
   - Te lleva a la página de detalle

4. **Agregar a favoritos**
   - Haz clic en el corazón (♡)
   - Se rellena (♥) y se agrega a favoritos

### Conceptos Angular
```
- [(ngModel)]: Two-way binding en búsqueda
- (input): Evento de cambio en búsqueda
- *ngFor: Mostrar lista de servicios
- *ngIf: Mostrar mensaje si no hay resultados
- Componente reutilizable: app-tarjeta-servicio
```

---

## ❤️ Página de Favoritos

### Qué ves
- Lista de solo tus servicios guardados
- Mismas tarjetas que en el listado

### Qué puedes hacer
1. **Ver tus favoritos**
   - Se muestran los servicios guardados

2. **Quitar de favoritos**
   - Haz clic en el corazón (♥) para quitar

3. **Ver detalle**
   - Haz clic en "Ver Detalle"

### Conceptos Angular
```
- Servicio compartido: ServicioService
- Subscripción a Observable: favoritos$
- *ngIf: Mostrar mensaje si no hay favoritos
```

---

## 📋 Página de Detalle

### Qué ves
- Imagen grande del servicio
- Nombre, descripción y categoría
- Información adicional
- Botones de acción

### Qué puedes hacer
1. **Ver información completa**
   - Categoría, ID, estado

2. **Agregar/quitar de favoritos**
   - Haz clic en corazón (♡/♥)

3. **Contactar al proveedor**
   - Haz clic en "Contactar Proveedor"

### Conceptos Angular
```
- ngOnInit: Obtener ID del localStorage
- Servicio: obtenerServicioPorId()
- Binding: [src], [class], (click)
```

---

## ➕ Página Crear Servicio

### Qué ves
- Formulario con 4 campos
- Botones "Crear Servicio" y "Limpiar"

### Qué puedes hacer
1. **Completa el formulario**
   - Nombre (obligatorio)
   - Descripción (obligatorio)
   - Categoría (obligatorio)
   - URL de imagen (opcional)

2. **Crear servicio**
   - Haz clic en "Crear Servicio"
   - Aparece mensaje de éxito
   - Te lleva automáticamente a servicios

3. **Limpiar formulario**
   - Haz clic en "Limpiar"
   - Se vacían todos los campos

### Validaciones
- ✅ No puedes enviar vacío
- ✅ Se usa imagen por defecto si no pones URL
- ✅ Genera ID automáticamente

### Conceptos Angular
```
- [(ngModel)]: Two-way binding en formulario
- (ngSubmit): Evento del form
- Validación en TypeScript
- Navegación después de crear
```

---

## 📞 Página de Contacto

### Qué ves
- Información de contacto (email, teléfono, dirección)
- Formulario de contacto con 4 campos

### Qué puedes hacer
1. **Usar información de contacto**
   - Email, teléfono, dirección visibles

2. **Enviar mensaje**
   - Completa: Nombre, Email, Asunto (opcional), Mensaje
   - Haz clic en "Enviar Mensaje"
   - Aparece ✅ Mensaje enviado

3. **Limpiar formulario**
   - Haz clic en "Limpiar"

### Validaciones
- ✅ Nombre, Email, Mensaje son obligatorios
- ✅ Se valida que sea un email válido

### Conceptos Angular
```
- Formulario con validación
- [(ngModel)]: Two-way binding
- [class]: Mostrar/ocultar mensaje
- Lógica de validación en TypeScript
```

---

## 🧭 Navegación

### Barra superior (Navbar)
- **Inicio**: Página principal
- **Servicios**: Listado completo
- **Favoritos**: Tus servicios guardados
- **Crear Servicio**: Agregar nuevo servicio
- **Contacto**: Formulario de contacto

### Dentro de páginas
- Los botones de las tarjetas te llevan a detalle
- Los botones azules "Ver Servicios" te llevan a listado
- Los formularios te redirigen después de enviar

### Conceptos Angular
```
- App Component: [ngSwitch] para cambiar página
- Event Emitter: (cambiarPagina)
- Property Binding: [paginaActual]
```

---

## 💾 Datos y Almacenamiento

### ¿Dónde se guardan los datos?
- **Servicios**: En memoria (cuando recargas, se pierden)
- **Favoritos**: En BehaviorSubject de RxJS
- **Servicio ID**: En localStorage (persiste en localStorage)

### Cómo funcionan
```typescript
// ServicioService maneja:
- Array de servicios
- Array de favoritos (BehaviorSubject)
- Métodos: obtener, filtrar, buscar
```

### Conceptos Angular
```
- @Injectable: El servicio está disponible globalmente
- BehaviorSubject: Los componentes se "suscriben" a cambios
- Observable: subscribe() para escuchar cambios
```

---

## 🎨 Estilos y Temas

### Variables CSS Globales
```css
--fondo: #ececec           /* Fondo de la página */
--tarjeta: #ffffff         /* Fondo de tarjetas */
--texto: #222              /* Color de texto */
--verde: #3b8f3a           /* Color principal */
--azul: #2f5e8f            /* Color secundario */
--sombra: 0 8px 18px ...   /* Sombras */
```

### Cómo cambiar colores
1. Abre `src/app/app.component.css`
2. Busca `:root {`
3. Cambia los valores de las variables

### Componentes reutilizables
- `.tarjeta`: Estilos de tarjeta
- `.boton`: Estilos de botones
- `.cuadricula`: Grid responsive
- `.formulario`: Estilos de form

---

## 📱 Responsive (Funciona en móviles)

La aplicación se adapta a diferentes pantallas:

- **Desktop (>768px)**: Layout completo
- **Tablet (>480px)**: Layout adaptado
- **Móvil (<480px)**: Una columna

### Cómo funciona
```css
@media (max-width: 768px) {
  /* Estilos para pantallas pequeñas */
}
```

---

## 🔧 Características Técnicas

### Components (Componentes)
- AppComponent: Componente raíz
- NavbarComponent: Navegación
- HomeComponent: Página inicio
- ServiciosComponent: Listado
- FavoritosComponent: Favoritos
- DetalleComponent: Detalle
- CrearComponent: Formulario crear
- ContactoComponent: Contacto
- TarjetaServicioComponent: Componente reutilizable

### Services (Servicios)
- ServicioService: Maneja datos y lógica

### Models (Modelos)
- Servicio (interfaz TypeScript)

### Directivas usadas
- `*ngFor`: Repetir elementos
- `*ngIf`: Condicionales
- `*ngSwitch`: Switch
- `[ngClass]`: Clases dinámicas
- `[class.nombre]`: Clase condicional

### Bindings usados
- `{{ }}`: Interpolation
- `[prop]`: Property binding
- `(evento)`: Event binding
- `[(ngModel)]`: Two-way binding

---

## 🚀 Flujo de Datos

```
User clicks button
       ↓
Component method executes
       ↓
Service updates data
       ↓
BehaviorSubject emits
       ↓
Components subscribed get notified
       ↓
View updates
```

**Ejemplo en favoritos:**
1. Usuario hace clic en ♡
2. Se ejecuta `agregarAFavoritos(id)`
3. Servicio actualiza `favoritosSubject`
4. Todos los componentes suscritos se enteran
5. La UI se actualiza automáticamente

---

## 📝 Resumen de Características

| Página | Funcionalidad | Binding |
|--------|---------------|---------|
| Inicio | Mostrar destacados | *ngFor, interpolation |
| Servicios | Buscar y filtrar | [(ngModel)], *ngFor |
| Favoritos | Mostrar guardados | Observable, subscribe |
| Detalle | Info completa | Property binding |
| Crear | Agregar servicio | [(ngModel)], ngSubmit |
| Contacto | Enviar mensaje | Formulario, validación |

---

## 🎓 Aprende a través de la App

Cada característica demuestra un concepto Angular diferente:

```
✅ Componentes reutilizables → tarjeta-servicio
✅ Data binding → formularios
✅ Servicios → compartir datos
✅ Directivas → listas y condicionales
✅ Eventos → botones y formularios
✅ Ciclo de vida → ngOnInit, ngOnDestroy
✅ Observables → favoritos en tiempo real
```

---

## 💡 Siguientes Pasos

Ahora que entiendes las características:

1. **Agrega más servicios** en `servicio.service.ts`
2. **Cambia los colores** en `app.component.css`
3. **Modifica el formulario** en `crear.component.html`
4. **Agrega validaciones** en los componentes
5. **Conecta un backend** real

¡**Las posibilidades son infinitas!** 🚀

---

**Versión**: 1.0  
**Última actualización**: 2026

// ============================================================================
// JUAN SERVICIOS - Aplicación de gestión de servicios
// ============================================================================
// Este archivo contiene toda la lógica de la aplicación en JavaScript vanilla
// Gestiona: servicios, favoritos, navegación y formularios

// ============================================================================
// CONFIGURACIÓN INICIAL
// ============================================================================

// Categorías predeterminadas para los servicios
const categoriasPredeterminadas = ["Diseño", "Hogar", "Tecnología", "Salud", "Educación"];

// URL de imagen por defecto si no se proporciona una
const imagenPredeterminada =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60";

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

/**
 * Genera un ID único combinando un número aleatorio con la fecha actual
 * @returns {string} ID único
 */
function generarId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

/**
 * Escapa caracteres especiales de HTML para evitar inyección de código
 * @param {string} str - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Escapa caracteres especiales para atributos HTML (incluye acentos)
 * @param {string} str - Texto a escapar
 * @returns {string} Texto escapado para atributo
 */
function escapeAtributo(str) {
  return escapeHtml(str).replaceAll("`", "&#096;");
}

// ============================================================================
// ESTADO DE LA APLICACIÓN (Variables globales)
// ============================================================================

// Lista de servicios disponibles - cada uno tiene: id, nombre, imagen, descripción, categoría y si está destacado
let servicios = [
  {
    id: generarId(),
    nombre: "Servicio 1",
    urlImagen: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=60",
    descripcion: "Excelente servicio, muy recomendado.",
    categoria: "Hogar",
    destacado: true,
  },
  {
    id: generarId(),
    nombre: "Servicio 2",
    urlImagen: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=60",
    descripcion: "Muy profesional y puntual.",
    categoria: "Tecnología",
    destacado: true,
  },
  {
    id: generarId(),
    nombre: "Servicio 3",
    urlImagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=60",
    descripcion: "Gran experiencia, volveré a contratar.",
    categoria: "Diseño",
    destacado: true,
  },
];

// Lista de IDs de servicios que el usuario ha marcado como favoritos
let favoritos = [];

// ID del servicio que se está viendo en la página de detalle
let idDetalleActual = null;

// ============================================================================
// REFERENCIAS AL DOM (Elementos HTML)
// ============================================================================

// Objeto que contiene referencias a todas las secciones principales de la página
const vistas = {
  inicio: document.querySelector("#vista-inicio"),
  servicios: document.querySelector("#vista-servicios"),
  favoritos: document.querySelector("#vista-favoritos"),
  detalle: document.querySelector("#vista-detalle"),
  crear: document.querySelector("#vista-crear"),
  contacto: document.querySelector("#vista-contacto"),
};

// ============================================================================
// FUNCIONES DE NAVEGACIÓN
// ============================================================================

/**
 * Establece qué botón de navegación está activo
 * @param {string} ruta - La ruta/página activa (ej: "inicio", "servicios")
 */
function establecerNavegacionActiva(ruta) {
  document.querySelectorAll(".navegacion__enlace").forEach((b) => {
    b.classList.toggle("esta-activo", b.dataset.ruta === ruta);
  });
}

/**
 * Cambia de página mostrando la vista seleccionada y renderizando su contenido
 * @param {string} ruta - La página a mostrar
 */
function mostrar(ruta) {
  // Oculta todas las vistas
  Object.values(vistas).forEach((v) => v.classList.remove("esta-visible"));
  
  // Muestra solo la vista seleccionada
  vistas[ruta].classList.add("esta-visible");
  
  // Actualiza el botón activo en la navegación
  establecerNavegacionActiva(ruta);

  // Renderiza el contenido específico de cada página
  if (ruta === "inicio") renderizarInicio();
  if (ruta === "servicios") renderizarServicios();
  if (ruta === "favoritos") renderizarFavoritos();
  if (ruta === "detalle") renderizarDetalle();
  if (ruta === "crear") reiniciarFormularioCrear();
}

// ============================================================================
// FUNCIONES DE CATEGORÍAS
// ============================================================================

/**
 * Obtiene todas las categorías únicas de los servicios (combinadas con las predeterminadas)
 * @returns {array} Array de categorías ordenadas alfabéticamente
 */
function obtenerCategorias() {
  // Extrae las categorías de los servicios actuales
  const desdeServicios = Array.from(new Set(servicios.map((s) => s.categoria))).sort();
  
  // Combina las predeterminadas con las de los servicios
  const combinadas = Array.from(new Set([...categoriasPredeterminadas, ...desdeServicios])).sort();
  return combinadas;
}

/**
 * Llena los selectores de categoría con las opciones disponibles
 * Mantiene el valor seleccionado anterior si existe
 */
function llenarSelectoresCategoria() {
  const filtro = document.querySelector("#filtro-categoria");
  const crear = document.querySelector("#categoria");

  const cats = obtenerCategorias();

  // Guardar valores anteriores para no perderlos
  const valorFiltro = filtro.value;
  const valorCrear = crear.value;

  // Llenar el selector de filtro
  filtro.innerHTML = `<option value="">Categoría</option>`;
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filtro.appendChild(opt);
  });
  filtro.value = valorFiltro;

  // Llenar el selector del formulario de crear
  crear.innerHTML = "";
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    crear.appendChild(opt);
  });
  if (valorCrear) crear.value = valorCrear;
}

// ============================================================================
// FUNCIONES DE COMPONENTES (Crear elementos HTML)
// ============================================================================

/**
 * Crea un elemento HTML para mostrar una tarjeta de servicio
 * Incluye imagen, título, descripción, categoría y botones de acciones
 * @param {object} s - Objeto del servicio con propiedades: id, nombre, urlImagen, descripcion, categoria
 * @returns {HTMLElement} Elemento article con la tarjeta del servicio
 */
function tarjetaServicio(s) {
  // Verifica si el servicio está en favoritos
  const esFav = favoritos.includes(s.id);

  // Crea el elemento principal
  const el = document.createElement("article");
  el.className = "tarjeta servicio";
  
  // Construye el HTML de la tarjeta
  el.innerHTML = `
    <div class="servicio__media">
      <img alt="" src="${escapeAtributo(s.urlImagen || imagenPredeterminada)}" />
      <button class="servicio__fav ${esFav ? "esta-activo" : ""}" aria-label="Favorito">
        ♥
      </button>
    </div>
    <div class="servicio__cuerpo">
      <h3 class="servicio__titulo">${escapeHtml(s.nombre)}</h3>
      <p class="servicio__descripcion">${escapeHtml(s.descripcion)}</p>
      <div class="servicio__pie">
        <span class="etiqueta-categoria">${escapeHtml(s.categoria)}</span>
        <button class="boton boton--primario boton-sm">Ver más</button>
      </div>
    </div>
  `;

  // Botón de favorito: alterna el estado (añade o quita de favoritos)
  const favBtn = el.querySelector(".servicio__fav");
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el click se propague
    alternarFavorito(s.id);
  });

  // Botón "Ver más": navega a la página de detalle
  const masBtn = el.querySelector(".boton--primario");
  masBtn.addEventListener("click", () => {
    idDetalleActual = s.id;
    mostrar("detalle");
  });

  return el;
}

// ============================================================================
// FUNCIONES DE FAVORITOS
// ============================================================================

/**
 * Agrega o quita un servicio de la lista de favoritos
 * Actualiza automáticamente las vistas que están visibles
 * @param {string} id - ID del servicio
 */
function alternarFavorito(id) {
  // Si ya está en favoritos, lo quita; si no, lo añade al principio
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((x) => x !== id);
  } else {
    favoritos = [id, ...favoritos];
  }

  // Actualiza las vistas que están activas para reflejar el cambio
  if (vistas.servicios.classList.contains("esta-visible")) renderizarServicios();
  if (vistas.favoritos.classList.contains("esta-visible")) renderizarFavoritos();
  if (vistas.inicio.classList.contains("esta-visible")) renderizarInicio();
  if (vistas.detalle.classList.contains("esta-visible")) renderizarDetalle();
}

// ============================================================================
// FUNCIONES DE RENDERIZADO (Mostrar contenido en las páginas)
// ============================================================================

/**
 * Renderiza la página de inicio
 * Muestra servicios destacados y testimonios
 */
function renderizarInicio() {
  // Renderiza servicios destacados (máximo 3)
  const cuadriculaDestacados = document.querySelector("#cuadricula-destacados");
  cuadriculaDestacados.innerHTML = "";
  servicios
    .filter((s) => s.destacado) // Solo los marcados como destacados
    .slice(0, 3) // Máximo 3
    .forEach((s) => cuadriculaDestacados.appendChild(tarjetaServicio(s)));

  // Renderiza testimonios de ejemplo
  const t = document.querySelector("#testimonios");
  t.innerHTML = "";
  const testimonios = [
    { texto: "Excelente servicio, muy recomendado.", autor: "Ana López" },
    { texto: "Muy profesional y puntual.", autor: "Carlos Rivera" },
    { texto: "Gran experiencia, volveré a contratar.", autor: "Marta Gómez" },
  ];
  testimonios.forEach((x) => {
    const el = document.createElement("div");
    el.className = "testimonio";
    el.innerHTML = `<div>${escapeHtml(x.texto)}</div><strong>— ${escapeHtml(x.autor)}</strong>`;
    t.appendChild(el);
  });
}

/**
 * Renderiza la página de servicios
 * Muestra todos los servicios filtrados por búsqueda y categoría
 */
function renderizarServicios() {
  // Actualiza los selectores de categoría
  llenarSelectoresCategoria();

  // Obtiene el valor de búsqueda y categoría seleccionada
  const busqueda = document.querySelector("#busqueda-texto").value.trim().toLowerCase();
  const cat = document.querySelector("#filtro-categoria").value;

  // Filtra los servicios según búsqueda y categoría
  const lista = servicios.filter((s) => {
    const coincideBusqueda =
      !busqueda ||
      s.nombre.toLowerCase().includes(busqueda) ||
      s.descripcion.toLowerCase().includes(busqueda) ||
      s.categoria.toLowerCase().includes(busqueda);
    const coincideCategoria = !cat || s.categoria === cat;
    return coincideBusqueda && coincideCategoria;
  });

  // Renderiza las tarjetas de servicio en la cuadrícula
  const cuadricula = document.querySelector("#cuadricula-servicios");
  cuadricula.innerHTML = "";
  lista.forEach((s) => cuadricula.appendChild(tarjetaServicio(s)));
}

/**
 * Renderiza la página de favoritos
 * Muestra los servicios que el usuario ha marcado como favoritos
 */
function renderizarFavoritos() {
  const cuadricula = document.querySelector("#cuadricula-favoritos");
  cuadricula.innerHTML = "";

  // Obtiene solo los servicios que están en favoritos
  const lista = servicios.filter((s) => favoritos.includes(s.id));
  
  // Si no hay favoritos, muestra un mensaje
  if (lista.length === 0) {
    const vacio = document.createElement("div");
    vacio.className = "tarjeta";
    vacio.style.padding = "14px";
    vacio.innerHTML = `<strong>No tienes favoritos todavía.</strong><div class="texto-secundario">Ve a "Servicios" y marca el corazón.</div>`;
    cuadricula.appendChild(vacio);
    return;
  }
  
  // Renderiza las tarjetas de favoritos
  lista.forEach((s) => cuadricula.appendChild(tarjetaServicio(s)));
}

/**
 * Renderiza la página de detalle de un servicio
 * Muestra información completa del servicio seleccionado
 */
function renderizarDetalle() {
  // Obtiene el servicio a mostrar (o el primero si no hay selección)
  const s = servicios.find((x) => x.id === idDetalleActual) || servicios[0];
  if (!s) return;

  // Obtiene referencias a los elementos HTML de la página
  const img = document.querySelector("#detalle-imagen");
  const titulo = document.querySelector("#detalle-titulo");
  const desc = document.querySelector("#detalle-descripcion");
  const cat = document.querySelector("#detalle-categoria");
  const favBtn = document.querySelector("#btn-toggle-favorito-detalle");

  // Rellena los elementos con los datos del servicio
  img.src = s.urlImagen || imagenPredeterminada;
  titulo.textContent = s.nombre;
  desc.textContent = s.descripcion;
  cat.textContent = s.categoria;

  // Actualiza el botón de favorito según el estado
  const esFav = favoritos.includes(s.id);
  favBtn.textContent = esFav ? "♥ En Favoritos" : "♥ Agregar a Favoritos";
  favBtn.className = "boton " + (esFav ? "boton--primario" : "boton--oscuro");

  // Al hacer clic, alterna el estado de favorito
  favBtn.onclick = () => alternarFavorito(s.id);

  // Botón de contacto: llena el formulario de contacto con el nombre del servicio
  document.querySelector("#btn-contactar-desde-detalle").onclick = () => {
    document.querySelector("#contacto-mensaje").value =
      `Hola, me interesa el servicio: "${s.nombre}". ¿Me puedes dar más información?`;
    mostrar("contacto");
  };
}

/**
 * Reinicia el formulario de crear servicio
 * Limpia los campos y actualiza las categorías disponibles
 */
function reiniciarFormularioCrear() {
  llenarSelectoresCategoria();
  document.querySelector("#formulario-crear").reset();
}

// ============================================================================
// EVENT LISTENERS (Escuchadores de eventos)
// ============================================================================

/**
 * Formulario de crear servicio
 * Valida y añade un nuevo servicio a la lista
 */
document.querySelector("#formulario-crear").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que recargue la página

  // Obtiene los valores del formulario
  const nombre = document.querySelector("#nombre").value.trim();
  const urlImagen = document.querySelector("#url-imagen").value.trim();
  const descripcion = document.querySelector("#descripcion").value.trim();
  const categoria = document.querySelector("#categoria").value;

  // Crea el objeto del nuevo servicio
  const s = {
    id: generarId(),
    nombre,
    urlImagen: urlImagen || imagenPredeterminada,
    descripcion,
    categoria,
    destacado: false,
  };

  // Añade el servicio al principio de la lista
  servicios = [s, ...servicios];

  // Actualiza las categorías y va a la página de servicios
  llenarSelectoresCategoria();
  mostrar("servicios");
});

/**
 * Botón de cancelar del formulario de crear
 * Vuelve a la página de servicios sin guardar
 */
document.querySelector("#btn-cancelar-crear").addEventListener("click", () => {
  mostrar("servicios");
});

/**
 * Formulario de contacto
 * Muestra un mensaje de éxito temporalmente
 */
const contactoExito = document.querySelector("#contacto-exito");
document.querySelector("#formulario-contacto").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que recargue la página
  
  // Muestra el mensaje de éxito
  contactoExito.classList.remove("esta-oculto");

  // Oculta el mensaje después de 3 segundos
  window.clearTimeout(window.__temporizadorContacto);
  window.__temporizadorContacto = window.setTimeout(() => {
    contactoExito.classList.add("esta-oculto");
  }, 3000);

  // Limpia el formulario
  e.target.reset();
});

/**
 * Botones de navegación
 * Al hacer clic, navega a la página correspondiente
 */
document.querySelectorAll(".navegacion__enlace").forEach((b) => {
  b.addEventListener("click", () => mostrar(b.dataset.ruta));
});

/**
 * Botones de acción en la página de inicio
 */
document.querySelector("#btn-ver-servicios").addEventListener("click", () => mostrar("servicios"));
document.querySelector("#btn-explorar").addEventListener("click", () => mostrar("servicios"));
document.querySelector("#btn-ir-contacto").addEventListener("click", () => mostrar("contacto"));

/**
 * Filtros de servicios
 * Se actualizan automáticamente cuando el usuario escribe o cambia la categoría
 */
document.querySelector("#busqueda-texto").addEventListener("input", () => renderizarServicios());
document.querySelector("#filtro-categoria").addEventListener("change", () => renderizarServicios());

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

// Inicializa la aplicación cuando se carga la página
llenarSelectoresCategoria();
renderizarInicio();
mostrar("inicio");

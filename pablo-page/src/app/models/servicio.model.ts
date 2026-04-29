// Interfaz que define la estructura de un servicio
// Interfaz = contrato que define qué propiedades debe tener un objeto
export interface Servicio {
  id: string;
  nombre: string;
  urlImagen: string;
  descripcion: string;
  categoria: string;
  destacado: boolean;
}

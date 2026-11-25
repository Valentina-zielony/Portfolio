/* =========================================================
   TUS DATOS — este es el ÚNICO archivo que tenés que editar
   para cambiar tu info y agregar/quitar trabajos.
   ========================================================= */

const PERFIL = {
  nombre: "Valentina",
  apellido: "Zielony",
  rol: "Diseño Gráfico & Comunicación Visual",
  ciudad: "Buenos Aires",
  universidad: "Estudiante de la Lic. en Diseño Gráfico y Comunicación Visual — UCES",
  bio: "Soy estudiante de Diseño Gráfico y Comunicación Visual. Me apasionan el branding y el diseño editorial: construir identidades con personalidad y darle ritmo a la página. Disfruto el proceso de buscar la idea, jugar con la tipografía y cuidar cada detalle hasta que la pieza diga exactamente lo que tiene que decir.",
  foto: "img/perfil.jpg",
  email: "val.zielony@gmail.com",
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com/valennzielony/" },
    { nombre: "Behance", url: "https://www.behance.net/valentizielony" },
    { nombre: "LinkedIn", url: "https://www.linkedin.com/in/valentina-zielony-805265272/" }
    // Para sumar otra red, copiá la línea de arriba, poné una coma al final y cambiá nombre y url. Ej:
    // { nombre: "Behance", url: "https://www.behance.net/tuusuario" }
  ]
};

/* Estilo del cursor: "marcador" (trazo que se borra) o "mancha" (resplandor difuminado) */
const ESTILO_CURSOR = "marcador";

/* Palabras que pasan en la pantalla de carga, debajo de tu nombre */
const PALABRAS_CARGA = ["Diseño", "Branding", "Editorial", "Tipografía", "Ilustración", "Creatividad"];

/*
  Cada proyecto es un bloque { ... }. Para agregar uno nuevo:
  1. Copiá un bloque entero (desde { hasta },)
  2. Cambiale el "id" (sin espacios ni tildes, ej: "afiche-festival")
  3. Poné tus imágenes en la carpeta img/proyectos/ y escribí la ruta.
  El primer proyecto de la lista aparece primero en la página.
*/
const PROYECTOS = [
  {
    id: "identidad-cafe-norte",
    titulo: "Café Norte",
    categoria: "Identidad",
    anio: "2026",
    materia: "Diseño IV",
    descripcion: "Sistema de identidad visual para una cafetería de barrio: logotipo, paleta, packaging y aplicaciones en vía pública. El concepto parte de la brújula y el norte como punto de encuentro.",
    portada: "img/proyectos/cafe-norte-portada.svg",
    imagenes: [
      { src: "img/proyectos/cafe-norte-1.svg", texto: "Mockup de packaging" },
      { src: "img/proyectos/cafe-norte-2.svg", texto: "Aplicación en vasos" },
      { src: "img/proyectos/cafe-norte-3.svg", texto: "Cartel en vía pública" }
    ]
  },
  {
    id: "revista-ruido",
    titulo: "Revista Ruido",
    categoria: "Editorial",
    anio: "2026",
    materia: "Diseño III",
    descripcion: "Diseño editorial de una revista independiente sobre música experimental. Retícula modular, tipografía expresiva y un sistema de portadas variable.",
    portada: "img/proyectos/revista-ruido-portada.svg",
    imagenes: [
      { src: "img/proyectos/revista-ruido-1.svg", texto: "Portada y contratapa" },
      { src: "img/proyectos/revista-ruido-2.svg", texto: "Doble página interior" },
      { src: "img/proyectos/revista-ruido-3.svg", texto: "Mockup de la revista abierta" }
    ]
  },
  {
    id: "afiches-tipograficos",
    titulo: "Afiches Tipográficos",
    categoria: "Afiche",
    anio: "2025",
    materia: "Tipografía I",
    descripcion: "Serie de tres afiches que exploran la forma de la letra como imagen. Trabajo con contraste, escala y ritmo.",
    portada: "img/proyectos/afiches-portada.svg",
    imagenes: [
      { src: "img/proyectos/afiches-1.svg", texto: "Afiche 01" },
      { src: "img/proyectos/afiches-2.svg", texto: "Afiche 02" },
      { src: "img/proyectos/afiches-3.svg", texto: "Serie montada en pared" }
    ]
  },
  {
    id: "packaging-hoja",
    titulo: "Hoja — Packaging",
    categoria: "Packaging",
    anio: "2025",
    materia: "Diseño II",
    descripcion: "Packaging para una línea de tés orgánicos. Ilustraciones botánicas y un sistema de color por variedad.",
    portada: "img/proyectos/hoja-portada.svg",
    imagenes: [
      { src: "img/proyectos/hoja-1.svg", texto: "Línea completa" },
      { src: "img/proyectos/hoja-2.svg", texto: "Detalle de ilustración" },
      { src: "img/proyectos/hoja-3.svg", texto: "Mockup en góndola" }
    ]
  },
  {
    id: "fanzine-barrio",
    titulo: "Fanzine Barrio",
    categoria: "Editorial",
    anio: "2024",
    materia: "Diseño I",
    descripcion: "Fanzine fotocopiado sobre los oficios del barrio. Collage, fotografía analógica y tipografía hecha a mano.",
    portada: "img/proyectos/fanzine-portada.svg",
    imagenes: [
      { src: "img/proyectos/fanzine-1.svg", texto: "Tapa" },
      { src: "img/proyectos/fanzine-2.svg", texto: "Páginas interiores" },
      { src: "img/proyectos/fanzine-3.svg", texto: "Fanzine impreso" }
    ]
  },
  {
    id: "app-reciclar",
    titulo: "Reciclá — App",
    categoria: "Digital",
    anio: "2024",
    materia: "Diseño Digital",
    descripcion: "Diseño de interfaz para una app que enseña a separar residuos. Iconografía propia y una paleta amigable.",
    portada: "img/proyectos/app-portada.svg",
    imagenes: [
      { src: "img/proyectos/app-1.svg", texto: "Pantallas principales" },
      { src: "img/proyectos/app-2.svg", texto: "Sistema de íconos" },
      { src: "img/proyectos/app-3.svg", texto: "Mockup en celular" }
    ]
  }
];

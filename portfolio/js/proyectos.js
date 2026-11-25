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
  En la galería, cada imagen ocupa todo el ancho. Si querés dos imágenes
  una al lado de la otra, agregales  ancho: "medio"  (ej: tapa y contratapa).
*/
const PROYECTOS = [
  {
    id: "bardo-diario-malba",
    titulo: "Bardo",
    categoria: "Editorial",
    anio: "2026",
    materia: "Prácticas Editoriales del Diseño",
    descripcion: "Bardo es un diario que diseñé para el MALBA, pensado para acompañar los 25 años del museo. A lo largo de 16 páginas reúne notas, entrevistas, novedades de la colección y la agenda de actividades. La identidad se apoya en un logotipo azul de formas redondeadas y contundentes, titulares condensados en negro y un verde lima que marca el ritmo de la lectura en títulos, citas destacadas y fechas. La retícula de columnas ordena mucha información sin perder aire, para que el diario se recorra con la misma soltura que el museo.",
    portada: "img/proyectos/bardo-portada.jpg",
    imagenes: [
      { src: "img/proyectos/bardo-tapa.jpg", texto: "Tapa", ancho: "medio" },
      { src: "img/proyectos/bardo-contratapa.jpg", texto: "Contratapa", ancho: "medio" },
      { src: "img/proyectos/bardo-02-03.jpg", texto: "Páginas 2 y 3 · Sumario" },
      { src: "img/proyectos/bardo-04-05.jpg", texto: "Páginas 4 y 5 · El MALBA celebra un cuarto de siglo" },
      { src: "img/proyectos/bardo-06-07.jpg", texto: "Páginas 6 y 7 · Malba celebra sus 25 años / 25 años después" },
      { src: "img/proyectos/bardo-08-09.jpg", texto: "Páginas 8 y 9 · Un momento con Eduardo F. Costantini" },
      { src: "img/proyectos/bardo-10-11.jpg", texto: "Páginas 10 y 11 · Institucionales y novedades" },
      { src: "img/proyectos/bardo-12-13.jpg", texto: "Páginas 12 y 13 · Arte latinoamericano / Viva Frida" },
      { src: "img/proyectos/bardo-14-15.jpg", texto: "Páginas 14 y 15 · Agenda de actividades" }
    ]  }
];

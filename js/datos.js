/* =====================================================================
   DATOS DE LA PÁGINA
   ---------------------------------------------------------------------
   Este archivo es como una "mini base de datos". Aquí está toda la
   información que muestra la página: servicios, comunas, criterios de
   evaluación y profesionales con sus reseñas.

   Para agregar un profesional, copia uno de los bloques { ... } de la
   lista PROFESIONALES, pégalo al final y cambia sus datos.

   ⚠️ Los profesionales y reseñas de abajo son FICTICIOS (de ejemplo).
   Más adelante (en la etapa del "backend") esto vivirá en una base de
   datos real y las reseñas las escribirán los propios clientes.
   ===================================================================== */

// Configuración general del sitio
const CONFIG = {
  nombre: "ServiSexta",
  region: "Región de O'Higgins",
  // Número de WhatsApp que recibe las solicitudes (formato: 569XXXXXXXX).
  // Mientras sea el número de prueba, la página muestra una vista previa
  // del mensaje en vez de abrir WhatsApp.
  whatsapp: "56900000000",
  correo: "contacto@servisexta.cl",
};

// Los servicios (categorías) que ofrece la plataforma
const SERVICIOS = {
  gasfiteria: {
    nombre: "Gasfitería",
    icono: "llave",
    color: "#1f6fb2",
    descripcion: "Filtraciones, calefont, grifería, destapes e instalaciones de agua y gas.",
  },
  mecanica: {
    nombre: "Mecánica a domicilio",
    icono: "auto",
    color: "#c2410c",
    descripcion: "Mantención, baterías, frenos y diagnóstico sin mover tu auto de la casa.",
  },
  muebles: {
    nombre: "Armado de muebles",
    icono: "mueble",
    color: "#15803d",
    descripcion: "Closets, camas, escritorios y muebles de cocina armados con cuidado.",
  },
};

// Comunas de la VI Región donde hay cobertura
const COMUNAS = [
  "Chimbarongo", "Codegua", "Doñihue", "Graneros", "Machalí", "Marchigüe",
  "Nancagua", "Peumo", "Pichilemu", "Placilla", "Rancagua", "Rengo",
  "Requínoa", "San Fernando", "San Vicente", "Santa Cruz",
];

// Los puntos con que los clientes evalúan cada trabajo (de 1 a 5)
const CRITERIOS = [
  { clave: "calidad", nombre: "Calidad del trabajo" },
  { clave: "puntualidad", nombre: "Puntualidad" },
  { clave: "precio", nombre: "Precio justo" },
  { clave: "limpieza", nombre: "Limpieza y orden" },
  { clave: "trato", nombre: "Trato y comunicación" },
];

// Atajo para escribir las notas de una reseña en una sola línea:
// n(calidad, puntualidad, precio, limpieza, trato)
function n(calidad, puntualidad, precio, limpieza, trato) {
  return { calidad, puntualidad, precio, limpieza, trato };
}

// Lista de profesionales (DE EJEMPLO)
const PROFESIONALES = [
  // ---------------------------------------------------------------- Gasfitería
  {
    id: "rodrigo-fuentes",
    nombre: "Rodrigo Fuentes",
    tipo: "Independiente",
    servicio: "gasfiteria",
    comunas: ["Rancagua", "Machalí", "Graneros", "Codegua"],
    verificado: true,
    certificacionSEC: true,
    aniosExperiencia: 12,
    trabajosRealizados: 214,
    respondeEn: "menos de 1 hora",
    descripcion:
      "Gasfíter certificado SEC con más de 12 años en Rancagua y alrededores. Me especializo en calefont, filtraciones difíciles de encontrar y cambios de red de agua. Llego a la hora acordada y dejo todo limpio.",
    servicios: [
      { nombre: "Mantención de calefont", desde: 25000 },
      { nombre: "Reparación de filtraciones", desde: 20000 },
      { nombre: "Instalación de grifería", desde: 15000 },
      { nombre: "Conexión de cocina a gas", desde: 30000 },
    ],
    galeria: ["Cambio de calefont ionizado", "Red de cobre en baño", "Grifería de cocina", "Reparación bajo lavaplatos"],
    resenas: [
      { autor: "Carolina M.", comuna: "Rancagua", fecha: "2026-10-12", trabajo: "Mantención de calefont", notas: n(5, 5, 5, 5, 5), texto: "Llegó puntual, explicó qué tenía el calefont y lo dejó funcionando en una hora. Muy ordenado, recomendadísimo.", fotos: ["Calefont antes", "Calefont después"] },
      { autor: "Luis A.", comuna: "Machalí", fecha: "2026-09-28", trabajo: "Reparación de filtración", notas: n(5, 4, 4, 5, 5), texto: "Encontró una filtración que otros dos gasfíteres no pudieron. Se atrasó 20 minutos pero avisó con tiempo.", fotos: [] },
      { autor: "Francisca R.", comuna: "Rancagua", fecha: "2026-09-02", trabajo: "Instalación de grifería", notas: n(5, 5, 4, 5, 5), texto: "Trabajo impecable y precio conversado de antemano, sin sorpresas.", fotos: ["Grifería nueva"] },
      { autor: "Manuel T.", comuna: "Graneros", fecha: "2026-08-15", trabajo: "Conexión de cocina a gas", notas: n(5, 5, 5, 4, 5), texto: "Me mostró su credencial SEC antes de empezar, eso me dio mucha tranquilidad.", fotos: [] },
    ],
  },
  {
    id: "aguas-claras",
    nombre: "Gasfitería Aguas Claras",
    tipo: "Empresa",
    servicio: "gasfiteria",
    comunas: ["Rengo", "Requínoa", "Rancagua", "San Vicente"],
    verificado: true,
    certificacionSEC: true,
    aniosExperiencia: 8,
    trabajosRealizados: 356,
    respondeEn: "menos de 2 horas",
    descripcion:
      "Equipo de tres gasfíteres certificados. Atendemos urgencias el mismo día en Rengo, Requínoa y Rancagua. Entregamos boleta y garantía de 3 meses en todos nuestros trabajos.",
    servicios: [
      { nombre: "Destape de cañerías", desde: 22000 },
      { nombre: "Urgencias el mismo día", desde: 35000 },
      { nombre: "Instalación de termo eléctrico", desde: 40000 },
      { nombre: "Cambio de estanque WC", desde: 18000 },
    ],
    galeria: ["Instalación de termo", "Destape con máquina", "Baño completo", "Cambio de llaves de paso"],
    resenas: [
      { autor: "Paula V.", comuna: "Rengo", fecha: "2026-10-18", trabajo: "Urgencia por filtración", notas: n(5, 5, 4, 4, 5), texto: "Llamé en la mañana y a las 3 de la tarde ya estaba solucionado. Muy profesionales.", fotos: ["Cañería reparada"] },
      { autor: "Sergio C.", comuna: "Requínoa", fecha: "2026-10-01", trabajo: "Instalación de termo", notas: n(5, 4, 4, 5, 4), texto: "Buen trabajo, dejaron todo funcionando y me explicaron cómo usar el termo.", fotos: [] },
      { autor: "Daniela F.", comuna: "Rancagua", fecha: "2026-09-10", trabajo: "Destape de cañería", notas: n(4, 4, 3, 4, 4), texto: "Solucionaron el problema, aunque el precio final fue algo más alto que lo cotizado por teléfono.", fotos: [] },
      { autor: "Héctor P.", comuna: "San Vicente", fecha: "2026-08-22", trabajo: "Cambio de estanque WC", notas: n(5, 5, 5, 5, 5), texto: "Rápidos, limpios y con boleta. Volvería a contratarlos sin dudarlo.", fotos: ["Estanque nuevo"] },
      { autor: "Valentina S.", comuna: "Rengo", fecha: "2026-07-30", trabajo: "Mantención general", notas: n(5, 5, 4, 5, 5), texto: "Muy amables, revisaron toda la casa y me dieron consejos para evitar problemas.", fotos: [] },
    ],
  },
  {
    id: "patricio-munoz",
    nombre: "Patricio Muñoz",
    tipo: "Independiente",
    servicio: "gasfiteria",
    comunas: ["San Fernando", "Chimbarongo", "Placilla", "Nancagua"],
    verificado: true,
    certificacionSEC: false,
    aniosExperiencia: 6,
    trabajosRealizados: 97,
    respondeEn: "el mismo día",
    descripcion:
      "Gasfitería de agua en San Fernando y alrededores: filtraciones, grifería, WC y destapes. No trabajo con instalaciones de gas (para eso se necesita certificación SEC).",
    servicios: [
      { nombre: "Cambio de grifería", desde: 12000 },
      { nombre: "Reparación de WC", desde: 15000 },
      { nombre: "Destape de lavaplatos", desde: 15000 },
    ],
    galeria: ["Llave de lavamanos", "Sifón nuevo", "WC reparado"],
    resenas: [
      { autor: "Gloria H.", comuna: "San Fernando", fecha: "2026-10-05", trabajo: "Cambio de grifería", notas: n(4, 5, 5, 4, 5), texto: "Muy buen precio y muy honesto, me dijo qué cosas no valía la pena cambiar.", fotos: [] },
      { autor: "Rubén D.", comuna: "Chimbarongo", fecha: "2026-09-19", trabajo: "Reparación de WC", notas: n(4, 4, 5, 4, 4), texto: "Cumplió con lo prometido. Buena atención.", fotos: [] },
      { autor: "Marcela L.", comuna: "Placilla", fecha: "2026-08-08", trabajo: "Destape", notas: n(5, 4, 5, 5, 5), texto: "Llegó el mismo día que lo llamé. Excelente disposición.", fotos: ["Lavaplatos destapado"] },
    ],
  },

  // ---------------------------------------------------------------- Mecánica
  {
    id: "mecanica-movil-cachapoal",
    nombre: "Mecánica Móvil Cachapoal",
    tipo: "Empresa",
    servicio: "mecanica",
    comunas: ["Rancagua", "Machalí", "Doñihue", "Codegua", "Graneros"],
    verificado: true,
    certificacionSEC: false,
    aniosExperiencia: 10,
    trabajosRealizados: 428,
    respondeEn: "menos de 1 hora",
    descripcion:
      "Taller móvil equipado con scanner, compresor y herramientas profesionales. Hacemos mantenciones, cambio de batería y frenos en tu casa o trabajo. Usamos repuestos con garantía.",
    servicios: [
      { nombre: "Cambio de aceite y filtros", desde: 35000 },
      { nombre: "Cambio de batería", desde: 15000 },
      { nombre: "Cambio de pastillas de freno", desde: 30000 },
      { nombre: "Diagnóstico con scanner", desde: 20000 },
    ],
    galeria: ["Cambio de pastillas", "Diagnóstico con scanner", "Mantención 10.000 km", "Batería nueva"],
    resenas: [
      { autor: "Ignacio B.", comuna: "Rancagua", fecha: "2026-10-20", trabajo: "Mantención", notas: n(5, 5, 5, 5, 5), texto: "Hicieron la mantención en el estacionamiento de mi oficina. Mostraron los repuestos usados y los nuevos. Excelente.", fotos: ["Filtros antiguos", "Motor después"] },
      { autor: "Andrea K.", comuna: "Machalí", fecha: "2026-10-03", trabajo: "Cambio de batería", notas: n(5, 5, 4, 5, 5), texto: "El auto no partía un domingo y llegaron en 40 minutos. Salvadores.", fotos: [] },
      { autor: "Tomás G.", comuna: "Doñihue", fecha: "2026-09-14", trabajo: "Frenos", notas: n(5, 4, 4, 5, 5), texto: "Buen trabajo, explican todo con paciencia.", fotos: [] },
      { autor: "Javiera N.", comuna: "Rancagua", fecha: "2026-08-29", trabajo: "Diagnóstico", notas: n(4, 5, 4, 4, 5), texto: "Encontraron la falla rápido y no me cobraron de más.", fotos: [] },
      { autor: "Pedro E.", comuna: "Codegua", fecha: "2026-08-02", trabajo: "Mantención", notas: n(5, 5, 5, 4, 5), texto: "Ya es la segunda vez que los contrato, siempre igual de cumplidores.", fotos: ["Auto listo"] },
    ],
  },
  {
    id: "cristian-soto",
    nombre: "Cristián Soto",
    tipo: "Independiente",
    servicio: "mecanica",
    comunas: ["San Fernando", "Placilla", "Nancagua", "Chimbarongo"],
    verificado: true,
    certificacionSEC: false,
    aniosExperiencia: 15,
    trabajosRealizados: 183,
    respondeEn: "menos de 3 horas",
    descripcion:
      "Mecánico automotriz titulado, 15 años de experiencia. Especialista en autos japoneses y coreanos. Atiendo a domicilio en San Fernando y comunas cercanas.",
    servicios: [
      { nombre: "Afinamiento", desde: 45000 },
      { nombre: "Cambio de correa de distribución", desde: 90000 },
      { nombre: "Revisión antes de comprar un auto usado", desde: 25000 },
    ],
    galeria: ["Kit de distribución", "Afinamiento completo", "Revisión precompra"],
    resenas: [
      { autor: "Camilo F.", comuna: "San Fernando", fecha: "2026-10-09", trabajo: "Revisión precompra", notas: n(5, 5, 5, 5, 5), texto: "Me salvó de comprar un auto con problemas de motor. Vale cada peso.", fotos: [] },
      { autor: "Lorena Q.", comuna: "Nancagua", fecha: "2026-09-21", trabajo: "Afinamiento", notas: n(5, 4, 5, 4, 5), texto: "Muy conocedor y honesto. El auto quedó andando como nuevo.", fotos: ["Bujías cambiadas"] },
      { autor: "Esteban M.", comuna: "Placilla", fecha: "2026-08-17", trabajo: "Correa de distribución", notas: n(5, 3, 4, 4, 4), texto: "Excelente trabajo técnico, pero llegó una hora tarde. Igual lo recomiendo.", fotos: [] },
    ],
  },
  {
    id: "felipe-araya",
    nombre: "Felipe Araya",
    tipo: "Independiente",
    servicio: "mecanica",
    comunas: ["Rengo", "San Vicente", "Peumo", "Requínoa"],
    verificado: false,
    certificacionSEC: false,
    aniosExperiencia: 4,
    trabajosRealizados: 41,
    respondeEn: "el mismo día",
    descripcion:
      "Mecánico joven con taller móvil. Cambios de aceite, baterías, ampolletas y revisiones básicas a buen precio en Rengo y San Vicente.",
    servicios: [
      { nombre: "Cambio de aceite", desde: 28000 },
      { nombre: "Cambio de batería", desde: 12000 },
      { nombre: "Cambio de ampolletas", desde: 8000 },
    ],
    galeria: ["Cambio de aceite", "Ampolletas LED"],
    resenas: [
      { autor: "Natalia P.", comuna: "Rengo", fecha: "2026-10-14", trabajo: "Cambio de aceite", notas: n(4, 5, 5, 4, 5), texto: "Muy buen precio y rápido. Simpático y responsable.", fotos: [] },
      { autor: "Óscar V.", comuna: "San Vicente", fecha: "2026-09-25", trabajo: "Batería", notas: n(4, 4, 5, 4, 4), texto: "Todo bien, cumplió.", fotos: [] },
    ],
  },

  // ---------------------------------------------------------------- Muebles
  {
    id: "camila-rojas",
    nombre: "Camila Rojas",
    tipo: "Independiente",
    servicio: "muebles",
    comunas: ["Rancagua", "Machalí", "Graneros"],
    verificado: true,
    certificacionSEC: false,
    aniosExperiencia: 5,
    trabajosRealizados: 162,
    respondeEn: "menos de 1 hora",
    descripcion:
      "Armo muebles de cualquier tienda (Ikea, Sodimac, Easy, Paris, etc.). También instalo repisas, cortinas y cuadros. Trabajo con mucho cuidado de tus paredes y pisos.",
    servicios: [
      { nombre: "Armado de closet", desde: 30000 },
      { nombre: "Armado de cama o velador", desde: 15000 },
      { nombre: "Instalación de repisas", desde: 10000 },
      { nombre: "Anclaje de muebles a muro", desde: 8000 },
    ],
    galeria: ["Closet de 3 puertas", "Escritorio con cajonera", "Repisas flotantes", "Cama nido"],
    resenas: [
      { autor: "Fernanda O.", comuna: "Rancagua", fecha: "2026-10-22", trabajo: "Armado de closet", notas: n(5, 5, 5, 5, 5), texto: "Armó un closet gigante en 2 horas y se llevó todas las cajas. ¡Impecable!", fotos: ["Closet armado"] },
      { autor: "Gonzalo J.", comuna: "Machalí", fecha: "2026-10-06", trabajo: "Escritorio", notas: n(5, 5, 4, 5, 5), texto: "Súper prolija, ancló el mueble al muro por seguridad sin que se lo pidiera.", fotos: [] },
      { autor: "Isabel C.", comuna: "Rancagua", fecha: "2026-09-18", trabajo: "Cama y veladores", notas: n(5, 5, 5, 5, 5), texto: "Muy amable y rápida. Ya la recomendé a mi familia.", fotos: ["Dormitorio listo"] },
      { autor: "Matías H.", comuna: "Graneros", fecha: "2026-08-30", trabajo: "Repisas", notas: n(5, 4, 5, 5, 5), texto: "Las repisas quedaron perfectamente niveladas.", fotos: [] },
    ],
  },
  {
    id: "armafacil",
    nombre: "ArmaFácil O'Higgins",
    tipo: "Empresa",
    servicio: "muebles",
    comunas: ["Rancagua", "Rengo", "San Fernando", "Graneros", "Requínoa"],
    verificado: true,
    certificacionSEC: false,
    aniosExperiencia: 7,
    trabajosRealizados: 512,
    respondeEn: "menos de 2 horas",
    descripcion:
      "Equipo especializado en armado e instalación de muebles para hogares y oficinas. Armamos cocinas completas, closets a medida y muebles de oficina.",
    servicios: [
      { nombre: "Mueble de cocina (por módulo)", desde: 12000 },
      { nombre: "Closet grande", desde: 35000 },
      { nombre: "Muebles de oficina", desde: 20000 },
      { nombre: "Desarme y traslado", desde: 25000 },
    ],
    galeria: ["Cocina completa", "Oficina de 6 puestos", "Closet empotrado", "Rack de TV"],
    resenas: [
      { autor: "Rodrigo L.", comuna: "Rengo", fecha: "2026-10-15", trabajo: "Cocina completa", notas: n(5, 4, 4, 5, 5), texto: "Armaron 9 módulos de cocina en un día. Muy buen resultado.", fotos: ["Cocina antes", "Cocina después"] },
      { autor: "Claudia Z.", comuna: "San Fernando", fecha: "2026-09-27", trabajo: "Closet", notas: n(4, 4, 4, 4, 4), texto: "Buen trabajo en general, faltó ajustar una puerta pero volvieron a arreglarla sin costo.", fotos: [] },
      { autor: "Alejandro S.", comuna: "Rancagua", fecha: "2026-09-05", trabajo: "Muebles de oficina", notas: n(5, 5, 4, 5, 5), texto: "Equipo serio y coordinado. Cumplieron con los plazos.", fotos: [] },
      { autor: "Bárbara U.", comuna: "Requínoa", fecha: "2026-08-11", trabajo: "Rack de TV", notas: n(5, 5, 5, 4, 5), texto: "Rápidos y amables.", fotos: [] },
    ],
  },
  {
    id: "jorge-valenzuela",
    nombre: "Jorge Valenzuela",
    tipo: "Independiente",
    servicio: "muebles",
    comunas: ["Santa Cruz", "Pichilemu", "Marchigüe", "Nancagua"],
    verificado: true,
    certificacionSEC: false,
    aniosExperiencia: 20,
    trabajosRealizados: 140,
    respondeEn: "menos de 4 horas",
    descripcion:
      "Mueblista con 20 años de oficio. Además de armar, reparo y ajusto muebles: bisagras, correderas, puertas descuadradas. Cubro el Valle de Colchagua y la costa.",
    servicios: [
      { nombre: "Armado de muebles", desde: 15000 },
      { nombre: "Reparación de muebles", desde: 12000 },
      { nombre: "Cambio de bisagras y correderas", desde: 8000 },
    ],
    galeria: ["Ajuste de puertas", "Cómoda restaurada", "Comedor armado"],
    resenas: [
      { autor: "Ana María T.", comuna: "Santa Cruz", fecha: "2026-10-11", trabajo: "Reparación de cómoda", notas: n(5, 5, 5, 5, 5), texto: "Don Jorge dejó como nueva una cómoda de mi abuela. Un maestro.", fotos: ["Cómoda reparada"] },
      { autor: "Diego R.", comuna: "Pichilemu", fecha: "2026-09-16", trabajo: "Armado de comedor", notas: n(5, 4, 5, 5, 5), texto: "Viajó hasta Pichilemu sin cobrar extra. Muy buena persona.", fotos: [] },
      { autor: "Sofía E.", comuna: "Nancagua", fecha: "2026-08-25", trabajo: "Bisagras", notas: n(4, 5, 5, 4, 5), texto: "Rápido y económico.", fotos: [] },
    ],
  },
];

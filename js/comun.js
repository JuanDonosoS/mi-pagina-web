/* =====================================================================
   FUNCIONES COMUNES
   ---------------------------------------------------------------------
   Pequeñas "herramientas" que usan todas las páginas: dibujar íconos y
   estrellas, calcular promedios de evaluaciones, crear las tarjetas de
   profesionales, abrir WhatsApp, etc.
   ===================================================================== */

// ---------------------------------------------------------------- Íconos
// Cada ícono es un dibujo vectorial (SVG): líneas que el navegador dibuja.
const ICONOS = {
  llave: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  auto: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  mueble: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2M20 18v2"/>',
  escudo: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  ubicacion: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  buscar: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  mensaje: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  cerrar: '<path d="M18 6 6 18M6 6l12 12"/>',
  maletin: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  usuario: '<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  flecha: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  filtro: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  camara: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  rayo: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  medalla: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
};

function icono(nombre, clase = "icono") {
  return `<svg class="${clase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre] || ""}</svg>`;
}

// En el HTML escribimos <span data-icono="llave"></span> y aquí lo
// reemplazamos por el dibujo real.
function rellenarIconos(raiz = document) {
  raiz.querySelectorAll("[data-icono]").forEach((el) => {
    el.innerHTML = icono(el.dataset.icono);
    el.removeAttribute("data-icono");
  });
}

// ---------------------------------------------------------------- Textos
// Evita que un texto con símbolos como < o > se interprete como código.
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function formatoPesos(monto) {
  return "$" + monto.toLocaleString("es-CL");
}

function formatoFecha(iso) {
  const fecha = new Date(iso + "T12:00:00");
  return fecha.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

function formatoNota(nota) {
  return nota.toFixed(1).replace(".", ",");
}

function iniciales(nombre) {
  return nombre.split(" ").filter((p) => /^[A-ZÁÉÍÓÚÑ]/.test(p)).slice(0, 2).map((p) => p[0]).join("");
}

// ---------------------------------------------------------------- Evaluaciones
// Nota de una reseña = promedio de sus 5 criterios
function notaResena(resena) {
  const notas = CRITERIOS.map((c) => resena.notas[c.clave]);
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}

// Resumen de todas las reseñas de un profesional: promedio general,
// promedio por criterio y cuántas reseñas hay de cada nota (5 a 1).
function resumen(profesional) {
  if (profesional._resumen) return profesional._resumen;
  const resenas = profesional.resenas;
  const total = resenas.length;
  const criterios = {};
  CRITERIOS.forEach((c) => {
    criterios[c.clave] = total ? resenas.reduce((s, r) => s + r.notas[c.clave], 0) / total : 0;
  });
  const promedio = total ? resenas.reduce((s, r) => s + notaResena(r), 0) / total : 0;
  const distribucion = [5, 4, 3, 2, 1].map((estrellas) => ({
    estrellas,
    cantidad: resenas.filter((r) => Math.round(notaResena(r)) === estrellas).length,
  }));
  profesional._resumen = { promedio, total, criterios, distribucion };
  return profesional._resumen;
}

// Dibuja 5 estrellas pintadas según la nota (acepta decimales, ej: 4,6)
function estrellas(nota, clase = "") {
  const porcentaje = Math.max(0, Math.min(100, (nota / 5) * 100));
  return `<span class="estrellas ${clase}" role="img" aria-label="${formatoNota(nota)} de 5 estrellas"><span class="estrellas__relleno" style="width:${porcentaje}%"></span></span>`;
}

// ---------------------------------------------------------------- Imágenes
// Mientras no tengamos fotos reales, generamos imágenes de muestra con el
// color e ícono del servicio y el título del trabajo.
function imagenMuestra(titulo, servicioClave) {
  const servicio = SERVICIOS[servicioClave];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${servicio.color}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${servicio.color}" stop-opacity="0.42"/>
    </linearGradient></defs>
    <rect width="600" height="450" fill="#f4f6f9"/><rect width="600" height="450" fill="url(#g)"/>
    <g transform="translate(252 140) scale(4)" fill="none" stroke="${servicio.color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONOS[servicio.icono]}</g>
    <text x="300" y="330" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#1c2733">${escapar(titulo)}</text>
    <text x="300" y="365" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="17" fill="#5b6b7c">Foto de ejemplo</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function avatar(profesional, clase = "avatar") {
  const color = SERVICIOS[profesional.servicio].color;
  return `<span class="${clase}" style="--color-avatar:${color}" aria-hidden="true">${iniciales(profesional.nombre)}</span>`;
}

// ---------------------------------------------------------------- Insignias
function insignias(profesional) {
  let html = "";
  if (profesional.verificado) {
    html += `<span class="insignia insignia--verificado">${icono("escudo")} Verificado</span>`;
  } else {
    html += `<span class="insignia insignia--pendiente">${icono("reloj")} En verificación</span>`;
  }
  if (profesional.certificacionSEC) {
    html += `<span class="insignia insignia--sec">${icono("medalla")} Certificado SEC</span>`;
  }
  return html;
}

// ---------------------------------------------------------------- Tarjeta
// Tarjeta de un profesional, usada en la portada y en el listado
function tarjetaProfesional(p) {
  const r = resumen(p);
  const servicio = SERVICIOS[p.servicio];
  const precioDesde = Math.min(...p.servicios.map((s) => s.desde));
  return `
    <article class="tarjeta-pro">
      <a class="tarjeta-pro__enlace" href="perfil.html?id=${encodeURIComponent(p.id)}" aria-label="Ver perfil de ${escapar(p.nombre)}"></a>
      <div class="tarjeta-pro__cabecera">
        ${avatar(p)}
        <div>
          <h3 class="tarjeta-pro__nombre">${escapar(p.nombre)}</h3>
          <p class="tarjeta-pro__servicio" style="--color-servicio:${servicio.color}">${icono(servicio.icono)} ${servicio.nombre} · ${p.tipo}</p>
        </div>
      </div>
      <div class="tarjeta-pro__nota">
        ${estrellas(r.promedio)}
        <strong>${formatoNota(r.promedio)}</strong>
        <span class="texto-suave">(${r.total} evaluaciones)</span>
      </div>
      <div class="insignias">${insignias(p)}</div>
      <ul class="tarjeta-pro__datos">
        <li>${icono("ubicacion")} ${p.comunas.slice(0, 3).join(", ")}${p.comunas.length > 3 ? ` y ${p.comunas.length - 3} más` : ""}</li>
        <li>${icono("maletin")} ${p.trabajosRealizados} trabajos · ${p.aniosExperiencia} años de experiencia</li>
        <li>${icono("reloj")} Responde en ${p.respondeEn}</li>
      </ul>
      <div class="tarjeta-pro__pie">
        <span><span class="texto-suave">Desde</span> <strong>${formatoPesos(precioDesde)}</strong></span>
        <span class="tarjeta-pro__ver">Ver perfil ${icono("flecha")}</span>
      </div>
    </article>`;
}

// ---------------------------------------------------------------- WhatsApp
// Abre WhatsApp con un mensaje ya escrito. Si todavía tenemos el número de
// prueba, mostramos el mensaje en pantalla para que se vea cómo funcionará.
const NUMERO_DE_PRUEBA = "56900000000";

function abrirWhatsApp(mensaje) {
  if (CONFIG.whatsapp === NUMERO_DE_PRUEBA) {
    mostrarVistaPreviaWhatsApp(mensaje);
    return;
  }
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener");
}

function mostrarVistaPreviaWhatsApp(mensaje) {
  const dialogo = document.createElement("dialog");
  dialogo.className = "dialogo";
  dialogo.innerHTML = `
    <div class="dialogo__cabecera">
      <h2>Así llegaría tu solicitud</h2>
      <button class="boton-icono" type="button" data-cerrar aria-label="Cerrar">${icono("cerrar")}</button>
    </div>
    <p class="texto-suave">Esta es una versión de demostración. En la versión final, este mensaje se enviará por WhatsApp a ${CONFIG.nombre}:</p>
    <div class="burbuja-whatsapp">${escapar(mensaje).replace(/\n/g, "<br>")}</div>
    <button class="boton boton--primario boton--ancho" type="button" data-cerrar>Entendido</button>`;
  document.body.appendChild(dialogo);
  dialogo.querySelectorAll("[data-cerrar]").forEach((b) => b.addEventListener("click", () => dialogo.close()));
  dialogo.addEventListener("close", () => dialogo.remove());
  dialogo.showModal();
}

// ---------------------------------------------------------------- Al cargar
document.addEventListener("DOMContentLoaded", () => {
  rellenarIconos();

  // Menú para celulares (botón de tres líneas)
  const botonMenu = document.querySelector("[data-menu-boton]");
  const menu = document.querySelector("[data-menu]");
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", abierto);
      botonMenu.innerHTML = icono(abierto ? "cerrar" : "menu");
    });
  }

  // Botones "Soy profesional": el trabajador nos escribe para postular
  document.querySelectorAll("[data-unirse]").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      abrirWhatsApp(
        `Hola ${CONFIG.nombre}, quiero ofrecer mis servicios en la plataforma.\n\n` +
        `Nombre: \nServicio (gasfitería / mecánica / armado de muebles): \nComunas donde trabajo: \nAños de experiencia: `
      );
    });
  });

  // Año actual en el pie de página
  document.querySelectorAll("[data-anio]").forEach((el) => (el.textContent = new Date().getFullYear()));
});

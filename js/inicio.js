/* =====================================================================
   PORTADA: llena el buscador, las estadísticas, las categorías y los
   profesionales mejor evaluados con la información de datos.js
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------- Opciones del buscador
  const selectServicio = document.getElementById("buscar-servicio");
  Object.entries(SERVICIOS).forEach(([clave, s]) => selectServicio.add(new Option(s.nombre, clave)));

  const selectComuna = document.getElementById("buscar-comuna");
  COMUNAS.forEach((comuna) => selectComuna.add(new Option(comuna, comuna)));

  // ---------------------------------------------------- Estadísticas
  const totalResenas = PROFESIONALES.reduce((suma, p) => suma + p.resenas.length, 0);
  const todasLasNotas = PROFESIONALES.flatMap((p) => p.resenas.map(notaResena));
  const promedioGeneral = todasLasNotas.reduce((a, b) => a + b, 0) / todasLasNotas.length;
  const verificados = PROFESIONALES.filter((p) => p.verificado).length;

  document.getElementById("estadisticas").innerHTML = `
    <div class="estadistica"><strong>${verificados}</strong><span>profesionales verificados</span></div>
    <div class="estadistica"><strong>${formatoNota(promedioGeneral)} ★</strong><span>nota promedio</span></div>
    <div class="estadistica"><strong>${totalResenas}</strong><span>evaluaciones de clientes</span></div>
    <div class="estadistica"><strong>${COMUNAS.length}</strong><span>comunas con cobertura</span></div>`;

  // ---------------------------------------------------- Categorías
  document.getElementById("categorias").innerHTML = Object.entries(SERVICIOS)
    .map(([clave, s]) => {
      const cantidad = PROFESIONALES.filter((p) => p.servicio === clave).length;
      return `
        <a class="categoria" href="profesionales.html?servicio=${clave}" style="--color-servicio:${s.color}">
          <span class="categoria__icono">${icono(s.icono)}</span>
          <h3>${s.nombre}</h3>
          <p>${s.descripcion}</p>
          <span class="categoria__pie">${cantidad} profesionales ${icono("flecha")}</span>
        </a>`;
    })
    .join("");

  // ---------------------------------------------------- Mejor evaluados
  // Ordenamos por nota (y si empatan, por cantidad de evaluaciones)
  const mejores = [...PROFESIONALES]
    .sort((a, b) => resumen(b).promedio - resumen(a).promedio || resumen(b).total - resumen(a).total)
    .slice(0, 3);
  document.getElementById("destacados").innerHTML = mejores.map(tarjetaProfesional).join("");
});

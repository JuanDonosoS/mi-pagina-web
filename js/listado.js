/* =====================================================================
   LISTADO DE PROFESIONALES
   Lee los filtros elegidos, decide qué profesionales mostrar, los ordena
   y los dibuja. Los filtros también quedan en la dirección (URL), así un
   enlace como profesionales.html?servicio=gasfiteria ya llega filtrado.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contenedorServicios = document.getElementById("filtro-servicio");
  const selectComuna = document.getElementById("filtro-comuna");
  const selectNota = document.getElementById("filtro-nota");
  const checkVerificado = document.getElementById("filtro-verificado");
  const checkSEC = document.getElementById("filtro-sec");
  const selectOrden = document.getElementById("orden");
  const resultados = document.getElementById("resultados");
  const contador = document.getElementById("contador");

  // ---------------------------------------------------- Crear opciones
  const opcionesServicio = [["", "Todos"], ...Object.entries(SERVICIOS).map(([clave, s]) => [clave, s.nombre])];
  contenedorServicios.innerHTML = opcionesServicio
    .map(([valor, nombre]) => `<label class="opcion"><input type="radio" name="servicio" value="${valor}"> ${nombre}</label>`)
    .join("");
  COMUNAS.forEach((comuna) => selectComuna.add(new Option(comuna, comuna)));

  // ---------------------------------------------------- Leer filtros desde la URL
  const parametros = new URLSearchParams(location.search);
  const servicioInicial = SERVICIOS[parametros.get("servicio")] ? parametros.get("servicio") : "";
  contenedorServicios.querySelector(`input[value="${servicioInicial}"]`).checked = true;
  if (COMUNAS.includes(parametros.get("comuna"))) selectComuna.value = parametros.get("comuna");

  // ---------------------------------------------------- Mostrar resultados
  function servicioElegido() {
    return contenedorServicios.querySelector("input:checked").value;
  }

  function precioMinimo(p) {
    return Math.min(...p.servicios.map((s) => s.desde));
  }

  function actualizar() {
    const servicio = servicioElegido();
    const comuna = selectComuna.value;
    const notaMinima = Number(selectNota.value);

    // 1) Filtrar
    let lista = PROFESIONALES.filter((p) =>
      (!servicio || p.servicio === servicio) &&
      (!comuna || p.comunas.includes(comuna)) &&
      resumen(p).promedio >= notaMinima &&
      (!checkVerificado.checked || p.verificado) &&
      (!checkSEC.checked || p.certificacionSEC)
    );

    // 2) Ordenar
    const ordenes = {
      nota: (a, b) => resumen(b).promedio - resumen(a).promedio,
      resenas: (a, b) => resumen(b).total - resumen(a).total,
      trabajos: (a, b) => b.trabajosRealizados - a.trabajosRealizados,
      precio: (a, b) => precioMinimo(a) - precioMinimo(b),
    };
    lista.sort(ordenes[selectOrden.value]);

    // 3) Dibujar
    contador.textContent = `${lista.length} ${lista.length === 1 ? "profesional" : "profesionales"}`;
    if (lista.length === 0) {
      resultados.innerHTML = `
        <div class="vacio" style="grid-column: 1 / -1">
          ${icono("buscar")}
          <h3>No encontramos profesionales con esos filtros</h3>
          <p class="texto-suave">Prueba con otra comuna o quita algún filtro.</p>
          <button class="boton boton--secundario" type="button" data-limpiar>Ver todos</button>
        </div>`;
      resultados.querySelector("[data-limpiar]").addEventListener("click", limpiar);
    } else {
      resultados.innerHTML = lista.map(tarjetaProfesional).join("");
    }

    // Título de la página según el servicio y la comuna
    const nombreServicio = servicio ? SERVICIOS[servicio].nombre : "Profesionales";
    const titulo = comuna ? `${nombreServicio} en ${comuna}` : nombreServicio;
    document.getElementById("titulo-listado").textContent = titulo;
    document.getElementById("miga-actual").textContent = titulo;
    document.title = `${titulo} · ServiSexta`;

    // Guardar los filtros en la URL (sin recargar la página)
    const nuevos = new URLSearchParams();
    if (servicio) nuevos.set("servicio", servicio);
    if (comuna) nuevos.set("comuna", comuna);
    history.replaceState(null, "", nuevos.toString() ? `?${nuevos}` : location.pathname);
  }

  function limpiar() {
    contenedorServicios.querySelector('input[value=""]').checked = true;
    selectComuna.value = "";
    selectNota.value = "0";
    checkVerificado.checked = false;
    checkSEC.checked = false;
    actualizar();
  }

  // Cada vez que cambia un filtro, volvemos a calcular la lista
  document.getElementById("filtros").addEventListener("change", actualizar);
  selectOrden.addEventListener("change", actualizar);
  document.getElementById("limpiar-filtros").addEventListener("click", limpiar);

  // Botón "Filtros" en celulares: muestra u oculta el panel
  const botonFiltros = document.getElementById("boton-filtros");
  botonFiltros.addEventListener("click", () => {
    const abierto = document.getElementById("filtros").classList.toggle("abierto");
    botonFiltros.setAttribute("aria-expanded", abierto);
  });

  actualizar();
});

/* =====================================================================
   PERFIL DE UN PROFESIONAL
   Busca al profesional según el "id" de la URL y arma su página:
   cabecera, datos, precios, galería, evaluaciones y solicitud.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const p = PROFESIONALES.find((pro) => pro.id === id);
  const contenedor = document.getElementById("perfil");

  // Si el id no existe, mostramos un mensaje amable
  if (!p) {
    contenedor.innerHTML = `
      <div class="contenedor seccion">
        <div class="vacio">
          ${icono("usuario")}
          <h2>No encontramos este perfil</h2>
          <p class="texto-suave">Puede que el enlace esté incompleto o que el profesional ya no esté disponible.</p>
          <a class="boton boton--secundario" href="profesionales.html">Ver todos los profesionales</a>
        </div>
      </div>`;
    return;
  }

  const servicio = SERVICIOS[p.servicio];
  const r = resumen(p);
  const precioDesde = Math.min(...p.servicios.map((s) => s.desde));
  document.title = `${p.nombre} · ${servicio.nombre} · ServiSexta`;

  // ---------------------------------------------------- Armar la página
  contenedor.style.setProperty("--color-servicio", servicio.color);
  contenedor.innerHTML = `
    <div class="perfil-portada"></div>
    <div class="perfil-cabecera">
      <div class="contenedor">
        <div class="perfil-cabecera__fila">
          ${avatar(p, "avatar-grande")}
          <div class="perfil-cabecera__info">
            <nav class="migas" aria-label="Ruta">
              <a href="index.html">Inicio</a> <span>›</span>
              <a href="profesionales.html?servicio=${p.servicio}">${servicio.nombre}</a>
            </nav>
            <h1>${escapar(p.nombre)}</h1>
            <p class="perfil-cabecera__servicio">${icono(servicio.icono)} ${servicio.nombre} · ${p.tipo}</p>
            <div class="insignias">${insignias(p)}</div>
            <div class="perfil-cabecera__nota">
              ${estrellas(r.promedio, "estrellas--grande")}
              <strong>${formatoNota(r.promedio)}</strong>
              <a href="#evaluaciones" class="texto-suave">${r.total} evaluaciones</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contenedor perfil">
      <div>
        <!-- Sobre el profesional -->
        <section class="bloque">
          <h2>Sobre ${p.tipo === "Empresa" ? "la empresa" : escapar(p.nombre.split(" ")[0])}</h2>
          <p>${escapar(p.descripcion)}</p>
          <div class="datos-rapidos">
            <div class="dato">${icono("calendario")}<strong>${p.aniosExperiencia} años</strong><span>de experiencia</span></div>
            <div class="dato">${icono("maletin")}<strong>${p.trabajosRealizados}</strong><span>trabajos realizados</span></div>
            <div class="dato">${icono("rayo")}<strong>${p.respondeEn}</strong><span>tiempo de respuesta</span></div>
          </div>
        </section>

        <!-- Comunas -->
        <section class="bloque">
          <h2>Comunas donde trabaja</h2>
          <div class="chips">${p.comunas.map((c) => `<span class="chip">${icono("ubicacion")} ${c}</span>`).join("")}</div>
        </section>

        <!-- Servicios y precios -->
        <section class="bloque">
          <h2>Servicios y precios referenciales</h2>
          <table class="tabla-precios">
            <tbody>
              ${p.servicios.map((s) => `<tr><td>${escapar(s.nombre)}</td><td><span class="texto-suave">desde</span> ${formatoPesos(s.desde)}</td></tr>`).join("")}
            </tbody>
          </table>
          <p class="nota-precios">El precio final se confirma antes de empezar, según el trabajo y los materiales.</p>
        </section>

        <!-- Galería -->
        <section class="bloque">
          <h2>Trabajos realizados</h2>
          <div class="galeria">
            ${p.galeria.map((titulo) => `
              <button type="button" data-ver-imagen="${escapar(titulo)}" aria-label="Ver foto: ${escapar(titulo)}">
                <img src="${imagenMuestra(titulo, p.servicio)}" alt="${escapar(titulo)}" loading="lazy">
              </button>`).join("")}
          </div>
        </section>

        <!-- Evaluaciones -->
        <section class="bloque" id="evaluaciones">
          <h2>Evaluaciones de clientes</h2>
          <div class="resumen-notas">
            <div class="nota-general">
              <strong>${formatoNota(r.promedio)}</strong>
              ${estrellas(r.promedio)}
              <span>${r.total} evaluaciones</span>
            </div>
            <div class="barras">
              ${CRITERIOS.map((c) => `
                <div class="barra">
                  <span>${c.nombre}</span>
                  <span class="barra__pista"><span class="barra__relleno" style="width:${(r.criterios[c.clave] / 5) * 100}%"></span></span>
                  <strong>${formatoNota(r.criterios[c.clave])}</strong>
                </div>`).join("")}
            </div>
          </div>
          <div class="resenas__barra">
            <span class="texto-suave">Solo pueden evaluar clientes que contrataron por ServiSexta.</span>
            <label class="texto-suave">Ordenar
              <select class="campo-select" id="orden-resenas" style="width:auto">
                <option value="recientes">Más recientes</option>
                <option value="mejores">Mejor nota</option>
                <option value="peores">Peor nota</option>
              </select>
            </label>
          </div>
          <div id="lista-resenas"></div>
        </section>
      </div>

      <!-- Columna lateral: caja para contratar (en computador) -->
      <aside>
        <div class="caja-contratar">
          <div class="caja-contratar__precio">Precios desde<strong>${formatoPesos(precioDesde)}</strong></div>
          <button class="boton boton--primario boton--ancho boton--grande" type="button" data-solicitar>${icono("mensaje")} Solicitar servicio</button>
          <ul>
            <li>${icono("check")} Respuesta en ${p.respondeEn}</li>
            <li>${icono("check")} Precio confirmado antes de empezar</li>
            <li>${icono("check")} Sin compromiso al solicitar</li>
          </ul>
          <div class="caja-garantia">
            <strong>${icono("escudo")} Garantía ServiSexta</strong>
            Si el trabajo no queda bien, te ayudamos a resolverlo.
          </div>
        </div>
      </aside>
    </div>

    <!-- Barra inferior fija (solo en celulares) -->
    <div class="barra-movil">
      <div><span class="texto-suave">Desde</span> <strong>${formatoPesos(precioDesde)}</strong></div>
      <button class="boton boton--primario" type="button" data-solicitar>${icono("mensaje")} Solicitar servicio</button>
    </div>`;

  // ---------------------------------------------------- Lista de reseñas
  const listaResenas = document.getElementById("lista-resenas");
  const ordenResenas = document.getElementById("orden-resenas");

  function dibujarResenas() {
    const ordenes = {
      recientes: (a, b) => b.fecha.localeCompare(a.fecha),
      mejores: (a, b) => notaResena(b) - notaResena(a),
      peores: (a, b) => notaResena(a) - notaResena(b),
    };
    const resenas = [...p.resenas].sort(ordenes[ordenResenas.value]);
    listaResenas.innerHTML = resenas.map((resena) => `
      <article class="resena">
        <div class="resena__cabecera">
          <div class="resena__autor">
            <span class="avatar" aria-hidden="true">${iniciales(resena.autor)}</span>
            <div>
              <strong>${escapar(resena.autor)}</strong>
              <span>${escapar(resena.comuna)} · ${formatoFecha(resena.fecha)}</span>
            </div>
          </div>
          <div>
            ${estrellas(notaResena(resena), "estrellas--chica")}
            <div class="resena__verificada">${icono("check")} Trabajo verificado</div>
          </div>
        </div>
        <p class="resena__trabajo">Trabajo: ${escapar(resena.trabajo)}</p>
        <p>${escapar(resena.texto)}</p>
        <div class="resena__criterios">
          ${CRITERIOS.map((c) => `<span>${c.nombre}: <b>${resena.notas[c.clave]}</b></span>`).join("")}
        </div>
        ${resena.fotos.length ? `
          <div class="resena__fotos">
            ${resena.fotos.map((titulo) => `
              <button type="button" data-ver-imagen="${escapar(titulo)}" aria-label="Ver foto: ${escapar(titulo)}">
                <img src="${imagenMuestra(titulo, p.servicio)}" alt="${escapar(titulo)}" loading="lazy">
              </button>`).join("")}
          </div>` : ""}
      </article>`).join("");
  }
  ordenResenas.addEventListener("change", dibujarResenas);
  dibujarResenas();

  // ---------------------------------------------------- Ver fotos en grande
  const dialogoImagen = document.getElementById("dialogo-imagen");
  contenedor.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-ver-imagen]");
    if (!boton) return;
    const titulo = boton.dataset.verImagen;
    dialogoImagen.querySelector("img").src = imagenMuestra(titulo, p.servicio);
    dialogoImagen.querySelector("img").alt = titulo;
    dialogoImagen.querySelector("p").textContent = titulo;
    dialogoImagen.showModal();
  });

  // ---------------------------------------------------- Formulario de solicitud
  const dialogo = document.getElementById("dialogo-solicitud");
  const formulario = document.getElementById("formulario-solicitud");
  document.getElementById("titulo-solicitud").textContent = p.nombre;

  formulario.comuna.innerHTML = `<option value="">Elige tu comuna</option>` +
    p.comunas.map((c) => `<option>${c}</option>`).join("");
  formulario.servicio.innerHTML = p.servicios.map((s) => `<option>${escapar(s.nombre)}</option>`).join("") + "<option>Otro</option>";
  formulario.fecha.min = new Date().toISOString().slice(0, 10); // no se pueden elegir fechas pasadas

  contenedor.querySelectorAll("[data-solicitar]").forEach((b) => b.addEventListener("click", () => dialogo.showModal()));

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(formulario);
    const fecha = datos.get("fecha") ? formatoFecha(datos.get("fecha")) : "A coordinar";
    const mensaje =
      `Hola ${CONFIG.nombre}, quiero solicitar un servicio.\n\n` +
      `Profesional: ${p.nombre} (${servicio.nombre})\n` +
      `Servicio: ${datos.get("servicio")}\n` +
      `Nombre: ${datos.get("nombre")}\n` +
      `Comuna: ${datos.get("comuna")}\n` +
      `Fecha preferida: ${fecha} · ${datos.get("horario")}\n\n` +
      `Detalle: ${datos.get("detalle")}`;
    dialogo.close();
    abrirWhatsApp(mensaje);
  });

  // ---------------------------------------------------- Cerrar ventanas
  document.querySelectorAll("dialog [data-cerrar]").forEach((b) =>
    b.addEventListener("click", () => b.closest("dialog").close())
  );
  // Cerrar al hacer clic fuera de la ventana
  document.querySelectorAll("dialog").forEach((d) =>
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); })
  );

  rellenarIconos();
});

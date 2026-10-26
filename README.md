# ServiSexta

Plataforma para encontrar profesionales de confianza a domicilio en la Región de O'Higgins: gasfitería, mecánica y armado de muebles. Todos los profesionales tienen evaluaciones de clientes.

> **Versión de demostración:** los profesionales y reseñas son de ejemplo.

## Páginas

| Archivo | Qué muestra |
|---|---|
| `index.html` | Portada: buscador, servicios, mejor evaluados, cómo funciona, garantía y preguntas frecuentes |
| `profesionales.html` | Listado con filtros (servicio, comuna, nota, verificados, SEC) y orden |
| `perfil.html?id=...` | Perfil de un profesional: datos, precios, fotos, evaluaciones por criterio y solicitud por WhatsApp |

## Estructura

```
├── index.html, profesionales.html, perfil.html   ← contenido (HTML)
├── css/styles.css                                ← diseño (colores, tamaños, celular)
└── js/
    ├── datos.js      ← profesionales, servicios, comunas y configuración
    ├── comun.js      ← funciones que usan todas las páginas
    ├── inicio.js     ← lógica de la portada
    ├── listado.js    ← filtros y orden del listado
    └── perfil.js     ← página de perfil y formulario de solicitud
```

## Cambios rápidos

- **Número de WhatsApp:** `CONFIG.whatsapp` en `js/datos.js`
- **Agregar un profesional:** copia un bloque de `PROFESIONALES` en `js/datos.js`
- **Colores:** variables al inicio de `css/styles.css`

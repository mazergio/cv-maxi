document.addEventListener("DOMContentLoaded", () => {
  console.log("JS cargado");
// =========================
// CONFIGURACIÓN
// =========================

let config = {};

const configURL =
  "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/export?format=csv&gid=1513454922";

fetch(configURL)
  .then(res => res.text())
  .then(text => {

    const filas = text
      .split(/\r?\n/)
      .map(f => f.trim())
      .filter(Boolean)
      .map(f =>
        f.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
         .map(c => c.replace(/^"|"$/g, "").trim())
      );

    for (let i = 1; i < filas.length; i++) {
      const clave = filas[i][0];
      const valor = filas[i][1];
      if (clave) {
        config[clave] = valor;
      }
    }

console.log("Config cargada:", config);
document.getElementById("version_cv").textContent = "Versión: " + config.version_cv;
document.getElementById("ultima_actualizacion").textContent = "Última actualización: " + config.ultima_actualizacion;


// =========================
// TOGGLES DE SECCIONES
// =========================

if (config.mostrar_experiencia !== "TRUE") {
  const s = document.getElementById("section-experiencia");
  if (s) s.style.display = "none";
}

if (config.mostrar_cursos !== "TRUE") {
  const s = document.getElementById("section-cursos");
  if (s) s.style.display = "none";
}

if (config.mostrar_habilidades !== "TRUE") {
  const s = document.getElementById("section-habilidades");
  if (s) s.style.display = "none";
}

// =========================
// TEMA CLARO / OSCURO
// =========================

if (config.tema === "oscuro") {
  document.body.classList.add("tema-oscuro");
}

// =========================
// QR EN FOOTER
// =========================
console.log("QR URL leída desde config:", config.qr_url);
if (config.qr_url) {
  const qrDiv = document.getElementById("qr-container");

  if (qrDiv) {
    const img = document.createElement("img");
    img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      encodeURIComponent(config.qr_url);

    img.alt = "QR";
    qrDiv.appendChild(img);
  }
}

// =========================
    // CARGAR FOTO DESDE CONFIG
    // =========================
const fotoElement = document.getElementById('foto-cv');
if (config.foto_url && fotoElement) {
  console.log('Intentando cargar foto desde:', config.foto_url); // <-- Añade esta línea para debug
  fotoElement.src = config.foto_url;
  
  // Fallback por si la foto no carga
  fotoElement.onerror = function() {
    console.error('La foto no pudo cargarse.');
    this.style.display = 'none';
  };
}

})
  .catch(err => console.error("Error cargando config:", err));
  

  
  // =========================
  // PERFIL
  // =========================

  const perfilURL =
    "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/export?format=csv&gid=0";

  fetch(perfilURL)
    .then(res => res.text())
    .then(text => {

      const filas = text
        .split(/\r?\n/)
        .map(f => f.trim())
        .filter(Boolean)
        .map(f =>
          f.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
           .map(c => c.replace(/^"|"$/g, "").trim())
        );

      for (let i = 1; i < filas.length; i++) {
        const clave = filas[i][0];
        const valor = filas[i][1];

        if (!clave || !valor) continue;

        const el = document.getElementById(clave);
        if (!el) continue;

        if (clave === "linkedin") {
          el.href = valor;
        }
        else if (clave === "email") {
          el.href = "mailto:" + valor;
          el.textContent = valor;
        }
        else {
          el.textContent = valor;
        }
      }

  })
  .catch(err => console.error("Error cargando perfil:", err));


// =========================
// EXPERIENCIA LABORAL
// =========================

const experienciaURL =
  "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/export?format=csv&gid=812827762";

fetch(experienciaURL)
  .then(res => res.text())
  .then(text => {

    const filas = text
      .split(/\r?\n/)
      .map(f => f.trim())
      .filter(Boolean)
      .map(f =>
        f.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
         .map(c => c.replace(/^"|"$/g, "").trim())
      );

    const headers = filas[0];
    const experienciaDiv = document.getElementById("experiencia");
    experienciaDiv.innerHTML = "";

    const items = [];

    for (let i = 1; i < filas.length; i++) {
      const fila = {};
      headers.forEach((h, idx) => fila[h] = filas[i][idx]);

      if (fila.mostrar !== "TRUE") continue;

      fila._orden = parseInt(fila.orden) || 999;
      items.push(fila);
    }

    // ordenar por orden
    items.sort((a, b) => a._orden - b._orden);

    // render
    items.forEach(fila => {
      const fechas = `${fila.fecha_inicio} - ${fila.fecha_fin}`;

      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <strong>${fila.puesto}</strong> – ${fila.empresa}<br>
        <em>${fechas}</em><br>
        ${fila.descripcion_breve}
      `;

      experienciaDiv.appendChild(div);
    });

  })
  .catch(err => console.error("Error cargando experiencia:", err));


  // =========================
  // CURSOS / FORMACIÓN COMPLEMENTARIA
  // =========================

  const cursosURL =
    "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/export?format=csv&gid=511356748";

  fetch(cursosURL)
    .then(res => res.text())
    .then(text => {

      const filas = text
        .split(/\r?\n/)
        .map(f => f.trim())
        .filter(Boolean)
        .map(f =>
          f.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
           .map(c => c.replace(/^"|"$/g, "").trim())
        );

      const headers = filas[0];
      const cursosDiv = document.getElementById("cursos-agrupados");
      cursosDiv.innerHTML = "";

      // agrupamos por área
      const grupos = {};

      for (let i = 1; i < filas.length; i++) {
        const fila = {};
        headers.forEach((h, idx) => fila[h] = filas[i][idx]);

        if (fila.mostrar !== "TRUE") continue;

        if (!grupos[fila.area]) {
          grupos[fila.area] = [];
        }

        grupos[fila.area].push(fila);
      }

      // render
      for (const area in grupos) {
        const areaDiv = document.createElement("div");
        areaDiv.className = "area-group";

        const cursosTexto = grupos[area]
  .map(c => {
    let extra = `(${c.institucion}, ${c.anio})`;

    if (config.mostrar_horas_cursos === "TRUE" && c.horas) {
      extra += ` – ${c.horas} hs`;
    }

    return `${c.curso} ${extra}`;
  })
  .join(" | ");

        areaDiv.innerHTML = `<strong>${area}</strong> ▸ ${cursosTexto}`;
        cursosDiv.appendChild(areaDiv);
      }
    })
    .catch(err => console.error("Error cargando cursos:", err));


      // =========================
  // HABILIDADES
  // =========================

  const habilidadesURL =
    "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/export?format=csv&gid=1722135425";

  fetch(habilidadesURL)
    .then(res => res.text())
    .then(text => {

      const filas = text
        .split(/\r?\n/)
        .map(f => f.trim())
        .filter(Boolean)
        .map(f =>
          f.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
           .map(c => c.replace(/^"|"$/g, "").trim())
        );

      const headers = filas[0];
      const habilidadesDiv = document.getElementById("habilidades");
      habilidadesDiv.innerHTML = "";

      const grupos = {};

      for (let i = 1; i < filas.length; i++) {
        const fila = {};
        headers.forEach((h, idx) => fila[h] = filas[i][idx]);

        if (fila.mostrar !== "TRUE") continue;

        if (!grupos[fila.categoria]) {
          grupos[fila.categoria] = [];
        }

        grupos[fila.categoria].push(fila);
      }

      // render
      for (const categoria in grupos) {
        const catDiv = document.createElement("div");
        catDiv.className = "area-group";

        const texto = grupos[categoria]
          .map(h => `${h.habilidad} (${h.nivel})`)
          .join(" | ");

        catDiv.innerHTML = `<strong>${categoria}</strong> ▸ ${texto}`;
        habilidadesDiv.appendChild(catDiv);
      }
    })
    .catch(err => console.error("Error cargando habilidades:", err)); 

 // =========================
// PDF CON NOMBRE AUTOMÁTICO
// =========================

const btnPdf = document.getElementById("btn-pdf");

if (btnPdf) {
  btnPdf.addEventListener("click", e => {
    e.preventDefault();

    const nombre =
      config.nombre_pdf ||
      `CV_${(config.nombre_completo || "Perfil").replace(/\s+/g, "_")}`;

    const originalTitle = document.title;
    document.title = nombre;

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  });
}

});
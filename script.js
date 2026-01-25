document.addEventListener("DOMContentLoaded", () => {
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

      for (let i = 1; i < filas.length; i++) {
        const fila = {};
        headers.forEach((h, idx) => fila[h] = filas[i][idx]);

        if (fila.mostrar !== "TRUE") continue;

        const fechas = `${fila.fecha_inicio} - ${fila.fecha_fin}`;

        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
          <strong>${fila.puesto}</strong> – ${fila.empresa}<br>
          <em>${fechas}</em><br>
          ${fila.descripcion_breve}
        `;

        experienciaDiv.appendChild(div);
      }
    })
    .catch(err => console.error("Error cargando experiencia:", err));

});


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
          .map(c => `${c.curso} (${c.institucion}, ${c.anio})`)
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
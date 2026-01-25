document.addEventListener("DOMContentLoaded", () => {

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
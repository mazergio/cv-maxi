document.addEventListener("DOMContentLoaded", () => {

  const perfilURL =
    "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/gviz/tq?tqx=out:csv&gid=0";

  fetch(perfilURL)
    .then(res => res.text())
    .then(text => {

      const filas = text
        .split("\n")
        .map(f => f.trim())
        .filter(Boolean)
        .map(f =>
          f.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
           .map(c => c.replace(/^"|"$/g, "").trim())
        );

      // filas[0] = encabezados → "clave","valor"
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

  // EXPERIENCIA (mock)
  const experiencia = [
    {
      puesto: "Empleado administrativo",
      empresa: "Estudio contable",
      fechas: "2020 - Actual",
      descripcion: "Gestión administrativa, cobranzas, control de honorarios."
    }
  ];

  const experienciaDiv = document.getElementById("experiencia");
  experiencia.forEach(e => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <strong>${e.puesto} – ${e.empresa}</strong><br>
      <em>${e.fechas}</em><br>
      ${e.descripcion}
    `;
    experienciaDiv.appendChild(div);
  });

  // CURSOS (mock)
  const cursosAgrupados = {
    "Administración": ["Gestión PyME", "Administración general"],
    "Tecnología": ["Domótica", "Robótica"],
    "Educación / Filosofía": ["Didáctica", "Filosofía"]
  };

  const cursosDiv = document.getElementById("cursos-agrupados");
  for (const area in cursosAgrupados) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${area}</strong>: ${cursosAgrupados[area].join(" | ")}`;
    cursosDiv.appendChild(div);
  }

});
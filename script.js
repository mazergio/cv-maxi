// PERFIL DESDE GOOGLE SHEETS (CSV)

const perfilURL =
  "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/gviz/tq?tqx=out:csv&gid=0"; 
// 👆 asegurate de que el gid sea el de la hoja correcta

fetch(perfilURL)
  .then(res => {
    if (!res.ok) {
      throw new Error("No se pudo cargar el CSV");
    }
    return res.text();
  })
  .then(text => {
    const filas = text
      .split("\n")
      .map(f => f.trim())
      .filter(f => f.length > 0)
      .map(f => f.split(/,(.+)/)); // solo primera coma

    // salteamos encabezados: clave,valor
    for (let i = 1; i < filas.length; i++) {
      const clave = filas[i][0];
      const valor = filas[i][1];

      if (!clave || !valor) continue;

      const elemento = document.getElementById(clave);
      if (elemento) {
        elemento.textContent = valor;
      }
    }
  })
  .catch(err => console.error("Error cargando perfil:", err));


// EXPERIENCIA (hardcodeada por ahora)

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


// CURSOS AGRUPADOS

const cursosAgrupados = {
  "Administración": ["Gestión PyME", "Administración general"],
  "Tecnología": ["Domótica", "Robótica"],
  "Electricidad": ["Instalaciones eléctricas"],
  "Educación / Filosofía": ["Didáctica", "Filosofía"]
};

const cursosDiv = document.getElementById("cursos-agrupados");

for (const area in cursosAgrupados) {
  const div = document.createElement("div");
  div.className = "area-group";
  div.innerHTML = `<strong>${area}</strong> ▸ ${cursosAgrupados[area].join(" | ")}`;
  cursosDiv.appendChild(div);
}
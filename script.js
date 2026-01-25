// PERFIL DESDE GOOGLE SHEETS

const perfilURL = "https://chatgpt.com/c/69759923-f4a8-8332-8f91-0becde12eb44PEGÁ_ACÁ_TU_LINK_CSV";

fetch(perfilURL)
  .then(res => res.text())
  .then(text => {
    const filas = text.split("\n").map(f => f.split(","));
    
    filas.forEach(fila => {
      const clave = fila[0]?.trim();
      const valor = fila[1]?.trim();

      if (clave === "nombre_completo") {
        document.getElementById("nombre").textContent = valor;
      }
      if (clave === "titulo_principal") {
        document.getElementById("titulo").textContent = valor;
      }
      if (clave === "ubicacion") {
        document.getElementById("ubicacion").textContent = valor;
      }
      if (clave === "resumen_profesional") {
        document.getElementById("resumen").textContent = valor;
      }
    });
  });
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
  div.innerHTML = `<strong>${e.puesto} – ${e.empresa}</strong><br>
                   <em>${e.fechas}</em><br>
                   ${e.descripcion}`;
  experienciaDiv.appendChild(div);
});

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
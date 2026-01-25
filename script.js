// MOCK DATA (después lo conectamos a Google Sheets)

document.getElementById("nombre").textContent = "Maxi López";
document.getElementById("titulo").textContent = "Administrativo | Formación técnica y filosófica";
document.getElementById("ubicacion").textContent = "La Paz, Entre Ríos";
document.getElementById("resumen").textContent =
  "Administrativo con formación en áreas técnicas, educación y filosofía. En constante capacitación, con orientación a la gestión, automatización y mejora de procesos.";

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
alert("JS NUEVO CARGADO");
document.addEventListener("DOMContentLoaded", () => {

  const perfilURL =
    "https://docs.google.com/spreadsheets/d/1Hx-C_mXVmLKO06n6MMt4bSjpT5jFLsmCqPw4SCR3kCY/gviz/tq?tqx=out:csv&gid=0";

  fetch(perfilURL)
    .then(res => res.text())
    .then(text => {

      // normaliza saltos de línea y BOM
      text = text.replace(/\uFEFF/g, "").trim();

      const filas = text
        .split(/\r?\n/)
        .map(f => f.trim())
        .filter(Boolean)
        .map(f => {
          // detecta separador automáticamente
          const sep = f.includes(";") ? ";" : ",";
          return f.split(sep).map(c => c.replace(/^"|"$/g, "").trim());
        });

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

});
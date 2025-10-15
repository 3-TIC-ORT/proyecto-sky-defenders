connect2Server(3000);

const puntaje = JSON.parse(localStorage.getItem("puntaje"));
const botonGuardar = document.getElementById("botonGuardar");
const nombreDeUsuario = document.getElementById("nombreDeUsuario");

botonGuardar.addEventListener("click", function () {
  const nombre = nombreDeUsuario.value;
  if (nombre) {
    localStorage.setItem("nombreDeUsuario", JSON.stringify(nombre));
    postEvent("puntaje", { puntaje: puntaje }, (listaDePyN) => {
      localStorage.setItem("listaDePyN", JSON.stringify(listaDePyN));
    });
    window.location.href = "TablaDeClasificación.html";
  } else {
    alert("Por favor ingresá tu nombre de usuario.");
  }
});

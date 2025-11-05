connect2Server();

const puntaje = JSON.parse(localStorage.getItem("puntaje"));
const tiempo = JSON.parse(localStorage.getItem("tiempo"));
const botonGuardar = document.getElementById("botonGuardar");
const nombreDeUsuario = document.getElementById("nombreDeUsuario");

botonGuardar.addEventListener("click", function () {
  const nombre = nombreDeUsuario.value.trim();

  if (nombre) {
    localStorage.setItem("nombreDeUsuario", JSON.stringify(nombre));
    //acá está el postEvent
    postEvent(
      "PuntajeyNombre",
      { PyN: { usuario: nombre, puntaje: puntaje, tiempo: tiempo } },
      (listaDePyN) => {
        localStorage.setItem("listaDePyN", JSON.stringify(listaDePyN));
        window.location.href = "TablaDeClasificación.html";
      }
    );
  } else {
    alert("Por favor ingresá tu nombre de usuario.");
  }
});

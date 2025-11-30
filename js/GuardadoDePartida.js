connect2Server();

const puntaje = JSON.parse(localStorage.getItem("puntaje"));
const tiempo = JSON.parse(localStorage.getItem("tiempo"));
const botonGuardar = document.getElementById("botonGuardar");
const nombreDeUsuario = document.getElementById("nombreDeUsuario");

botonGuardar.addEventListener("click", function () {
  const nombre = nombreDeUsuario.value.trim();

  if (nombre) {
    localStorage.setItem("nombreDeUsuario", JSON.stringify(nombre));

    setTimeout(() => {
      alert("No se ha podido conectar al backend. Inténtalo más tarde.");
      window.location.href = "../html/inicio.html";
    }, 1500);

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
    botonGuardar.classList.remove("pressed");
  }
});

let señal;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botonGuardar.classList.add("pressed");

    setTimeout(() => {
      botonGuardar.click();
    }, 50);
  }
  if (e.key === "Escape") {
    const botonNo = document.getElementById("botonNo");
    botonNo.classList.add("pressed");
    setTimeout(() => {
      botonNo.click();
    }, 50);
  }
});

subscribeRealTimeEvent("nuevaSeñal", (data) => {
  if (data) {
    const texto = data;
    señal = texto.señal === "b1" ? "b1" : texto.señal === "b2" ? "b2" : null;

    if (!señal) return;

    if (señal === "b1") {
      botonGuardar.classList.add("pressed");

      setTimeout(() => {
        botonGuardar.click();
      }, 50);
    }

    if (señal === "b2") {
      const botonNo = document.getElementById("botonNo");
      botonNo.classList.add("pressed");
      setTimeout(() => {
        botonNo.click();
      }, 50);
    }
  }
});

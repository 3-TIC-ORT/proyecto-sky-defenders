const puntaje = JSON.parse(localStorage.getItem("puntaje"));
const botonGuardar = document.getElementById("botonGuardar");
const nombreDeUsuario = document.getElementById("nombreDeUsuario");

botonGuardar.addEventListener("click", function () {
  localStorage.setItem(
    "nombreDeUsuario",
    JSON.stringify(nombreDeUsuario.value)
  );

  console.log("Nombre de usuario: " + nombreDeUsuario.value);
});

console.log("Datos cargados: " + puntaje);

const PyN = JSON.parse(localStorage.getItem("listaDePyN"));

const tabla = document.getElementById("tabla-cuerpo");
const verMas = document.getElementById("verMas");

let i = 0;
const cantidadPorClick = 10;

if (!PyN) {
  alert("No se ha podido conectar con el backend. Intentalo más tarde");
}

if (PyN.length < 11) {
  verMas.style.display = "none";
}

function agregarFilas() {
  const limite = Math.min(i + cantidadPorClick, PyN.length);

  for (i; i < limite; i++) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td1.textContent = i + 1;
    td2.textContent = PyN[i].nombre;
    td3.textContent = PyN[i].puntaje;
    td4.textContent = PyN[i].tiempo;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tabla.appendChild(tr);
  }

  if (i === PyN.length) {
    verMas.style.display = "none";
  }
}

window.onload = agregarFilas;
verMas.addEventListener("click", agregarFilas);

const PyN = [
  { usuario: "Hyra", puntaje: 310 },
  { usuario: "EloxPrime.", puntaje: 300 },
  { usuario: "Aspect", puntaje: 290 },
  { usuario: "YT:toxicgenie", puntaje: 280 },
  { usuario: "TITAN", puntaje: 270 },
  { usuario: "Alexis", puntaje: 260 },
  { usuario: "Wamnyhb", puntaje: 250 },
  { usuario: "Zevolt", puntaje: 240 },
  { usuario: "Dan-YT", puntaje: 230 },
  { usuario: "YT:toxicgenie", puntaje: 220 },
  { usuario: "Naso64", puntaje: 210 },
  { usuario: "YT:toxicgenie", puntaje: 200 },
  { usuario: "Querino", puntaje: 190 },
  { usuario: "SK | Yoshi825", puntaje: 180 },
  { usuario: "G h o s t", puntaje: 170 },
  { usuario: "AVE | LeZann", puntaje: 160 },
  { usuario: "到 | Mistake", puntaje: 150 },
  { usuario: "NerfFVGX", puntaje: 140 },
  { usuario: "FLOW", puntaje: 130 },
  { usuario: "BLS | YT:Mety", puntaje: 120 },
  { usuario: "Le Carry", puntaje: 110 },
  { usuario: "Julian聽", puntaje: 100 },
  { usuario: "Mertt.", puntaje: 90 },
];

const PyNa = JSON.parse(localStorage.getItem("listaDePyN"));

const tabla = document.getElementById("tabla-cuerpo");
const verMas = document.getElementById("verMas");

let i = 0;
const cantidadPorClick = 10;

function agregarFilas() {
  const limite = Math.min(i + cantidadPorClick, PyN.length);

  for (i; i < limite; i++) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.textContent = i + 1;
    td2.textContent = PyN[i].usuario;
    td3.textContent = PyN[i].puntaje;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tabla.appendChild(tr);
  }

  if (i === PyN.length) {
    verMas.style.display = "none";
  }
}

window.onload = agregarFilas;
verMas.addEventListener("click", agregarFilas);

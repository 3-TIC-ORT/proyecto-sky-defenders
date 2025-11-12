import fs from "fs";
import {
  subscribeGETEvent,
  subscribePOSTEvent,
  realTimeEvent,
  startServer,
} from "soquetic";

import { SerialPort, ReadlineParser } from "serialport";


startServer(3000);
subscribePOSTEvent("PuntajeyNombre", (datos) => {
  const usuario = datos.PyN.usuario;

  const puntaje = datos.PyN.puntaje;

  const tiempo = datos.PyN.tiempo;

  let PuntajeNuevo = {
    nombre: usuario,
    puntaje: puntaje,
    tiempo: tiempo,
  };

  let data = fs.readFileSync("datos/puntajes.json", "utf-8");

  let HistPuntajes = JSON.parse(data);

  HistPuntajes.push(PuntajeNuevo);

  HistPuntajes.sort((a, b) => {
    if (b.puntaje === a.puntaje) {
      return a.tiempo - b.tiempo;
    }
    return b.puntaje - a.puntaje;
  });

  let NuevoHistorialP = JSON.stringify(HistPuntajes, null, 2);

  fs.writeFileSync("datos/puntajes.json", NuevoHistorialP);

  return JSON.parse(fs.readFileSync("datos/puntajes.json", "utf-8"));
});

const port = new SerialPort({
  path: "COM3",
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on("data", function (data) {
  console.log("Data:",  data);
  GuardarSeñales(data);
});

function GuardarSeñales(data) {
  const texto = data.toString().trim();
  console.log("Texto limpio recibido:", texto);

  let valor = null;

  if (texto.includes("LED 1")) valor = "1";
  else if (texto.includes("LED 2")) valor = "2";
  else if (texto.includes("LED 3")) valor = "3";
  else if (texto.includes("LED 4")) valor = "4";
  else if (texto.includes("LED 5")) valor = "5";
  else if (texto.includes("LED 6")) valor = "6";
  else if (texto.includes("LED 7")) valor = "7";
  else if (texto.includes("boton 1")) valor = "b1";
  else if (texto.includes("boton 2")) valor = "b2";

  if (!valor) return;

  fs.writeFileSync("señales.json", JSON.stringify(valor));

  const contenido = JSON.parse(fs.readFileSync("señales.json", "utf-8"));
  realTimeEvent("nuevaSeñal", { señal: contenido });
}




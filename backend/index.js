import fs from 'fs';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { SerialPort } from 'serialport'

startServer(3000);
subscribePOSTEvent ("PuntajeyNombre", (datos) => {
    
  const usuario = datos.PyN.usuario;

  const puntaje = datos.PyN.puntaje;

  const tiempo = datos.PyN.tiempo
  

  let PuntajeNuevo = {
    "nombre": usuario,
    "puntaje": puntaje,
    "tiempo": tiempo
  }
  
  let data = fs.readFileSync("datos/puntajes.json","utf-8")
  
  let HistPuntajes = JSON.parse(data);
  
  HistPuntajes.push(PuntajeNuevo)

  HistPuntajes.sort((a, b) => {
    if (b.puntaje === a.puntaje) {
      return a.tiempo - b.tiempo;
    }
    return b.puntaje - a.puntaje;
  });

  let NuevoHistorialP = JSON.stringify(HistPuntajes, null, 2);
  
  fs.writeFileSync("datos/puntajes.json", NuevoHistorialP);

  
  return JSON.parse(fs.readFileSync("datos/puntajes.json","utf-8"))
})

const serialport = require('serialport')
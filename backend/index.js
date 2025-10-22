import fs from 'fs';
import { stringify } from 'querystring';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

subscribePOSTEvent ("PuntajeyNombre", () => {
    return JSON.parse(fs.readFileSync("datos/puntajes.JSON","utf-8"))
  })


  import {
    //nombre y puntaje
  } from "./dataEntry.js";
  
  
  let PuntajeNuevo = {
    "nombre":nombre,
    "puntaje": puntaje,
    
  }
  
  let data = fs.readFileSync("data/puntajes.json","utf-8")
  
  let histPedidos = JSON.parse(data);
  
  HistPuntajes.push(PuntajeNuevo)
  
  let NuevoHistorialP = JSON.stringify(HistPuntajes, null, 2);
  
  fs.writeFileSync("data/pedidos.json", HistPuntajes.push );
    
  
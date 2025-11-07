import fs from 'fs';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { SerialPort } from 'serialport'

startServer(3000);
subscribePOSTEvent ("PuntajeyNombre", (datos) => {
    
  const usuario = datos.PyN.usuario;

  const puntaje = datos.PyN.puntaje;

  const tiempo = datos.PyN.tiempo;
  

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

const port = new SerialPort({
  path: 'COM5', 
  baudRate: 9600,
});



  port.on('data', function (data) {
  console.log('Data:',data.toString())
   GuardarSeñales(data)
})

function GuardarSeñales(data) {
  
  const texto = data.toString().trim()

  if (texto == "led 1"){
    fs.writeFileSync("señales.json","");
  } 
   else if(texto==="led 2"){
   fs.writeFileSync("señales.json",JSON.stringify(""));
  }
  else if(texto==="led 3"){
   fs.writeFileSync("señales.json",JSON.stringify(""));
   }
   else if(texto==="led 4"){
   fs.writeFileSync("señales.json",JSON.stringify(""));
   }
   else if(texto==="led 5"){
    fs.writeFileSync("señales.json",JSON.stringify(""));
   }
   else if(texto==="led 6"){
    fs.writeFileSync("señales.json",JSON.stringify(""));
   }
   else if(texto==="boton 1"){
    fs.writeFileSync("señales.json",JSON.stringify(""));
  }
   else if(texto==="boton 2"){
    fs.writeFileSync("señales.json",JSON.stringify(""));
   }
  }
const data = fs.readFileSync("señales.json", "utf-8");
realTimeEvent("nuevaSeñal", data);

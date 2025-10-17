import fs from 'fs';
import { stringify } from 'querystring';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
let PuntajeyNombre=
subscribePOSTEvent ("PuntajeyNombre") () => {
    return JSON.parse(fs.readFileSync("datos/puntajes.JSON","utf-8"))
  };

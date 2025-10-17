import fs from 'fs';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
let PuntajeyNombre=
subscribePOSTEvent("PuntajeyNombre", () => {
    return {};
  });

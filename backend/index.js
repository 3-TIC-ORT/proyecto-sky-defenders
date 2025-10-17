import fs from 'fs';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

subscribePOSTEvent("PuntajeyNombre", () => {
    return {};
  });

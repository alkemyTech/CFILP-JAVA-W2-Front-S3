import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

export function getCards() {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_API_GET_CARD_USER +
        `/${JSON.parse(localStorage.getItem("user")).id}`,
      { signal: controller.signal }
    ),
    controller,
  };
}

// TODO - Arreglar la ruta y los parametros
export function createCardNoPropia(params) {
  const controller = loadAbort();


  console.log(params.body)
  console.log(import.meta.env.VITE_API_CREATE_CARD_NO_PROPIA + `/${params.idCuenta}`)


  return {
    call: axios.post(import.meta.env.VITE_API_CREATE_CARD_NO_PROPIA + `/${params.idCuenta}`,params.body, {
      signal: controller.signal,
    }),
    controller,
  };
}

import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

export function getAccounts() {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_API_GET_ACCOUNT_USER +
        `/${JSON.parse(localStorage.getItem("user")).id}`,
      { signal: controller.signal }
    ),
    controller,
  };
}

export function getAccountMovements(params) {
  const controller = loadAbort();
  
  return {
    call: axios.get(import.meta.env.VITE_API_GET_ACCOUNT_TRANSACTIONS, {
      params,
      signal: controller.signal,
    }),
    controller,
  };
}

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
export function getRecentAccountsTrasnfer() {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_API_GET_ACCOUNT_USER +
        `/${JSON.parse(localStorage.getItem("user")).id}`,
      { signal: controller.signal }
    ),
    controller,
  };
}
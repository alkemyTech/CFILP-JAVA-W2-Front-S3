import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

// TODO - Arreglar la ruta y los parametros
export function getRecentAccountsTrasnfer() {
  const controller = loadAbort();
  return {
    call: axios.get(
      import.meta.env.VITE_API_RECENT_ACCOUNTS_TRANSFER +
        `/${JSON.parse(localStorage.getItem("user")).id}`,
      { signal: controller.signal }
    ),
    controller,
  };
}

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

// TODO - Arreglar la ruta y los parametros
export function createAccount(data) {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_API_CREATE_ACCOUNT +
        `?moneda=${data.moneda}&tipo=${data.tipo}&usuarioId=${
          JSON.parse(localStorage.getItem("user")).id
        }`,
      { signal: controller.signal }
    ),
    controller,
  };
}

export function getAccountMovements(params) {
  if(!params) return;

  const controller = loadAbort();
  
  return {
    call: axios.get(`${import.meta.env.VITE_API_GET_ACCOUNT_TRANSACTIONS}?numeroCuenta=${params.numeroCuenta}`, {
      signal: controller.signal,
    }),
    controller,
  };
}

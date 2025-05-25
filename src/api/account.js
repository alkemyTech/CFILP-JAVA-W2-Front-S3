import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

// TODO -
export function depositMoney(data) {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_API_IMPORT_MONEY +
        `?destino=${data.params.destino}&monto=${data.params.monto}`,
      { signal: controller.signal }
    ),
    controller,
  };
}

export function exportMoney(data) {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_API_EXPORT_MONEY +
        `?origen=${data.params.origen}&monto=${data.params.monto}`,
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

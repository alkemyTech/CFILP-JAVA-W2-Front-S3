import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

// TODO - Arreglar la ruta y los parametros
export function transferMoney(data) {
  const controller = loadAbort();
  return {
    call: axios.post(
      import.meta.env.VITE_API_TRANFER_MONEY +
        `?origen=${data.params.origen}&destino=${data.params.destino}&monto=${data.params.monto}`,
      { signal: controller.signal }
    ),
    controller,
  };
}

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

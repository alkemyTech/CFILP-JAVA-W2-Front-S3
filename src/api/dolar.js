import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

export function getDolar() {
  const controller = loadAbort();
  return {
    call: axios.get(import.meta.env.VITE_API_DOLAR, {
      signal: controller.signal,
    }),
    controller,
  };
}

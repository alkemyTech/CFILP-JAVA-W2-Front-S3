import axios from "axios";

export async function importMoney(data, signal) {
  const response = await axios.post(import.meta.env.VITE_API_IMPORT_MONEY + `?destino=${data.destino}&monto=${data.monto}`, {
    signal,
  });
  return response.data;
}

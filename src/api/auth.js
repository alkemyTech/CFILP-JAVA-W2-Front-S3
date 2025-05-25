import axios from "axios";
import { loadAbort } from "../utils/loadAbort";

export function registerUser(userData) {
  const controller = loadAbort();
  return {
    call: axios.post(import.meta.env.VITE_API_REGISTER_USER, userData, {
      signal: controller.signal,
    }),
    controller,
  };
}

export function loginUser(userData) {
  const controller = loadAbort();
  return {
    call: axios.post(import.meta.env.VITE_API_LOGIN_USER, userData, {
      signal: controller.signal,
    }),
    controller,
  };
}

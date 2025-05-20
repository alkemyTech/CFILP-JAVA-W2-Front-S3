import axios from "axios";

export async function registerUser(userData, signal) {
  const response = await axios.post("http://localhost:8080/AlkemyPocket/usuarios", userData, { signal });
  return response.data;
}

export async function loginUser(userData, signal) {
  const response = await axios.post("/login", userData, { signal });
  return response.data;
}

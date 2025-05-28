// Verifica si el token JWT está cargado en el storage
export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}

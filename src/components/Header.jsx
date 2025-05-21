import { useNavigate } from "react-router";
import alkemyLogo from "../assets/alkemy-logo.png";

export const Header = () => {
  // Maneja el "cerrar sesión"
  const navigateTo = useNavigate();

  function handleLogout() {
    // TODO - implementar cierre de sesion
    localStorage.clear()
    return navigateTo("/login")
  }

  return (
    <header className="py-2 h-14 lg:h-16 w-full hidden md:flex md:items-center md:justify-between ">
      <picture className="h-full">
        <img src={alkemyLogo} alt="Alkemy Logo" className="h-full" />
      </picture>

      <nav className="flex items-center justify-end gap-4 h-full w-full pl-3 pr-4">
        <p className="text-sm italic text-neutral-500">
          Última conexión: 02/03/2025 - 13:24hs.
        </p>
        <hr className="h-full border-neutral-400 border" />
        <button
          onClick={handleLogout}
          className="border border-neutral-500 text-neutral-500 px-3 text-sm rounded-md font-medium hover:bg-neutral-200 cursor-pointer transition-colors duration-300 ease-in-out"
        >
          Salir
        </button>
      </nav>
    </header>
  );
};

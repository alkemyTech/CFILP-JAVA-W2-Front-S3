import { NavLink } from "react-router";

import {
  WalletIcon,
  HomeIcon,
  CardIcon,
  ReloadIcon,
  TransferIcon,
  ExportIcon,
} from "./";
import { LogoutIcon } from "./icons/LogoutIcon";

// Componente con los links de navegación de la app
export const Navigator = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <article className="w-full md:h-full md:flex md:flex-col h-min">
      <h2 className="hidden text-lg md:block">
        Hola,{" "}
        <b>
          {JSON.parse(localStorage.getItem("user")).nombre}{" "}
          {JSON.parse(localStorage.getItem("user")).apellido}
        </b>
      </h2>

      <nav className="flex items-center justify-start h-full md:flex-col gap-y-2 md:mt-4">
        <Link
          to={"/"}
          label={"Inicio"}
          icon={<HomeIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
        <Link
          to={"/accounts"}
          label={"Cuentas"}
          icon={<WalletIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
        <Link
          to={"/cards"}
          label={"Tarjetas"}
          icon={<CardIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
        <Link
          to={"/import"}
          label={"Recargar"}
          icon={<ReloadIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
        <Link
          to={"/export"}
          label={"Extraer"}
          icon={<ExportIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
        <Link
          to={"/transfer"}
          label={"Transferir"}
          icon={<TransferIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />

        <button
          onClick={handleLogout}
          className="flex flex-col md:flex-row items-center md:items-end gap-x-2 cursor-pointer py-2 w-full max-w-20 md:max-w-full hover:text-neutral-500"
        >
          <LogoutIcon className={"h-4 w-4 md:h-7 md:w-7"} />
          <p className="text-xs font-medium md:text-base md:w-full text-start">
            Salir
          </p>
        </button>
      </nav>
    </article>
  );
};

function Link({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col md:flex-row items-center md:items-end gap-x-2 cursor-pointer py-2 w-full max-w-20 md:max-w-full ${
          isActive ? "text-sky-500" : "hover:text-neutral-500"
        }`
      }
    >
      {icon}
      <p className="text-xs font-medium md:text-base md:w-full">{label}</p>
    </NavLink>
  );
}

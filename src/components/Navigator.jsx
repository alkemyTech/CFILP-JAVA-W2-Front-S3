import { NavLink } from "react-router";

import { WalletIcon, HomeIcon, CardIcon, ReloadIcon, TransferIcon } from "./";

const auxUser = {
  id: "abcdef-ghijkl-mnopqrst-uvwxyz",
  name: "Juan",
  lastname: "Pérez",
  email: "juan@perez.com",
  tel: "+542302112345",
};

// Componente con los links de navegación de la app
export const Navigator = () => {
  return (
    <article className="w-full md:h-full md:flex md:flex-col h-min">
      <h2 className="hidden text-lg md:block">
        Hola,{" "}
        <b>
          {auxUser.name} {auxUser.lastname}
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
          to={"/reload"}
          label={"Recargar"}
          icon={<ReloadIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
        <Link
          to={"/transfer"}
          label={"Transferir"}
          icon={<TransferIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />

        <Link
          to={"/"}
          label={"Salir"}
          icon={<TransferIcon className={"h-4 w-4 md:h-7 md:w-7"} />}
        />
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

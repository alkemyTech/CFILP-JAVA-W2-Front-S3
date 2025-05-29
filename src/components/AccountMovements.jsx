import { useEffect, useState } from "react";

import { CustomButton } from "./CustomButton";
import { useFetch } from "../hooks/useFetch";
import { getAccountMovements } from "../api/account";

const options = ["Últimos movimientos", "Histórico", "Pendientes"];
export const AccountMovements = ({ account }) => {
  const [currentOption] = useState(0);
  const { data, error, isLoading, fetch } = useFetch(getAccountMovements);

  function handleReload() {
    fetch({ numeroCuenta: account.numeroCuenta } );
  }

  useEffect(() => {
    if(!account.numeroCuenta) return;
    fetch({ numeroCuenta: account.numeroCuenta } );
  }, [account.numeroCuenta]);

  if (isLoading) {
    return (
      <article className="flex flex-col items-center p-4 w-full bg-white animate-pulse">
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
      </article>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-4 w-full bg-white">
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-2xl font-bold text-red-500">
            Ha habido un error en el servidor
          </h1>
          <small className="text-sm italic">Por favor, intenta de nuevo</small>
        </div>
        <CustomButton label={"Reintentar"} onClick={handleReload} />
      </div>
    );
  }

  return (
    <article className="flex flex-col p-4 w-full bg-white">
      <h3 className="text-2xl font-bold text-sky-500">
        {account.tipo} {account.numeroCuenta}
      </h3>

      <section className="flex flex-col w-full">
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {options.map((option, index) => (
              <button
                key={index}
                disabled={index !== 0}
                className={`${
                  index === currentOption
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent"
                } px-4 py-2 border-b-2 cursor-pointer hover:bg-neutral-100 disabled:text-neutral-400 disabled:line-through`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full mt-5">
            <p className="font-medium">No hay movimientos recientes...</p>
          </div>
        ) : (
          data.map((movement, index) => (
            <div
              key={index}
              className={`flex items-start justify-between w-full mt-5 px-3 py-2`}
            >
              <span className="flex flex-col items-start justify-center">
                <strong className="text-lg">{movement.tipoTransaccion}</strong>
                <p className="italic text-xs">Para: {movement.tipoTransaccion === "EXTRACCION" ? movement.cuentaOrigen : movement.cuentaDestino}</p>
              </span>
              <span className="flex flex-col items-end justify-center">
                <strong
                  className={`${
                    movement.impacto === "EGRESO"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {movement.impacto === "EGRESO" ? "-" : "+"} ${movement.monto}
                </strong>
                <small>{new Date(movement.fecha).toLocaleDateString()}</small>
              </span>
            </div>
          ))
        )}
      </section>
    </article>
  );
};

import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { CustomButton } from "./CustomButton";
import { getRecentAccountsTrasnfer } from "../api/account";

export const RecentTransfer = ({ formData, setFormData }) => {
  const [trasnferSelected, setTrasnferSetselected] = useState(null);
  const { data, isLoading, error, fetch } = useFetch(getRecentAccountsTrasnfer, {
    autoFetch: true,
  });

  function handleClick(destino, index) {
    setTrasnferSetselected(index);
    setFormData({ ...formData, destino });
  }

  console.log(data)

  function handleReload() {
    fetch();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 animate-pulse">
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
        <h4 className="text-lg italic text-center text-neutral-500">
          Cargando Ultimas transferencias...
        </h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center w-full mt-10 bg-white">
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-2xl font-bold text-red-500">
            Error al cargar los datos
          </h1>
          <small className="text-sm italic">Por favor, intenta de nuevo</small>
        </div>
        <CustomButton label={"Reintentar"} onClick={handleReload} />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h4 className="text-lg font-bold text-start">Contactos</h4>

      {data.length === 0 ? (
        <div className="flex items-center justify-center w-full mt-5 text-neutral-500">
          <i>No posees transferencias recientes</i>
        </div>
      ) : (
        <article className="grid grid-cols-1 gap-5 mt-5 overflow-y-auto md:grid-cols-2 justify-items-center">
          {data.map((transfer, index) => (
            <div
              onClick={() => handleClick(transfer?.alias, index)}
              className={`flex items-start justify-between w-full p-4 border rounded-md cursor-pointer border-neutral-200 ${
                trasnferSelected === index
                  ? "bg-neutral-200"
                  : "hover:bg-neutral-100"
              }`}
            >
              <span className="flex flex-col">
                <p className="text-base font-bold">
                  {transfer.nombre} {transfer.apellido}
                </p>
                <small className="text-xs italic text-neutral-500">
                  Alias: {transfer.alias}
                </small>
                <small className="text-xs italic text-neutral-500">
                  CVU: {transfer.cvu}
                </small>
              </span>
            </div>
          ))}
        </article>
      )}
    </div>
  );
};

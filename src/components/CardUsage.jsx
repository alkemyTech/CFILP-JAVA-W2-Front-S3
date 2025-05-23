import axios from "axios";
import { useEffect, useState } from "react";

import { CustomButton } from "./CustomButton";

export const CardUsage = ({ card }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  function handleReload() {
    setReload(!reload);
  }

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    axios
      .get(
        import.meta.env.VITE_API_GET_CARD + `/${card.numeroTarjeta}`,
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
        console.log(res);
      })
      .catch((error) => {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Petición cancelada");
        } else {
          setError("Error al obtener los consumos");
        }
      });

    return () => {
      controller.abort(); // Se cancela si el componente se desmonta o cambia el efecto
    };
  }, [reload, card.numeroTarjeta]);

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
      <section className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <p className={`text-sky-500 px-4 py-2 font-bold`}>Consumos</p>
        </div>

        {data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full mt-5">
            <p className="font-medium">No hay consumos recientes...</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full mt-5">
            <p className="font-medium">🏗 En construcción... 🏗</p>
          </div>
        )}
      </section>
    </article>
  );
};

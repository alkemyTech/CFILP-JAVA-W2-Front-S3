import axios from "axios";
import { useEffect, useState } from "react";

import dolarImg from "../assets/dolar-bg.webp";

export const DolarCotization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [reload, setReload] = useState(false);

  function handleReload() {
    setReload(!reload);
  }

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_API_DOLAR, {
        signal: controller.signal,
      })
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
        console.info(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.error("Petición cancelada");
        } else {
          setError("Error al obtener el tipo de cambio");
        }
      });

    return () => {
      controller.abort(); // Se cancela si el componente se desmonta o cambia el efecto
    };
  }, [reload]);

  if (isLoading) {
    return (
      <article
        style={{ backgroundImage: `url(${dolarImg})` }}
        className="relative flex flex-col items-center justify-center w-full h-full p-2 transition-shadow duration-300 ease-in-out bg-center bg-cover rounded-md hover:shadow-md min-h-52 shadow-neutral-800/25 animate-pulse"
      >
        <span className="absolute z-0 w-full h-full rounded-md bg-black/25"></span>
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
      </article>
    );
  }

  if (error) {
    return (
      <article
        style={{ backgroundImage: `url(${dolarImg})` }}
        className="relative flex flex-col items-center justify-center w-full h-full p-2 text-white transition-shadow duration-300 ease-in-out bg-center bg-cover rounded-md text-shadow-md text-shadow-black hover:shadow-md min-h-52 shadow-neutral-800/25"
      >
        <span className="absolute z-0 w-full h-full rounded-md bg-black/25"></span>
        <p className="z-10 py-2 text-xl font-bold">Error al acceder a la API</p>

        <button
          onClick={handleReload}
          className="cursor-pointer hover:bg-black/10 text-base z-10 font-bold text-shadow-black text-shadow-md border-2 px-3 py-0.5 rounded-md border-white"
        >
          Reintentar
        </button>
      </article>
    );
  }

  return (
    <article
      style={{ backgroundImage: `url(${dolarImg})` }}
      className="relative flex flex-col items-center justify-center w-full h-full p-2 text-white transition-shadow duration-300 ease-in-out bg-center bg-cover rounded-md text-shadow-md text-shadow-neutral-800 hover:shadow-md min-h-52 shadow-neutral-800/25"
    >
      <span className="absolute z-0 w-full h-full rounded-md bg-black/25"></span>
      <h3 className="z-10 py-2 text-2xl font-bold">
        {data.nombre} <small className="italic">({data.moneda})</small>
      </h3>
      <div className="z-10 flex items-center justify-center w-full h-full text-xl">
        <div className="flex flex-col items-center justify-center w-full">
          <strong>Compra</strong>
          <strong>${data.compra}</strong>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <strong>Venta</strong>
          <strong>${data.venta}</strong>
        </div>
      </div>
      <small className="z-10 italic font-medium">
        Cotización del dolar oficial
      </small>
    </article>
  );
};

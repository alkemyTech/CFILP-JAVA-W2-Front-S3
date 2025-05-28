import { useState } from "react";
import { Card, CreateCardNoPropia, CustomButton } from "../components";

import cards from "../mock/cards.json";
import { useFetch } from "../hooks/useFetch";
import { getCards } from "../api/card";

export const Cards = () => {
  const [openCreateCard, setOpenCreateCard] = useState(false);
  const [currentCard, setCurrentCard] = useState([]);
  const { isLoading, error, data, fetch } = useFetch(getCards, {
    autoFetch: true,
    error: "Error al obtener las tarjetas",
  });

  function handleReload() {
    fetch();
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full animate-pulse">
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
      </div>
    );
  }

  if (false) {
    return (
      <div className="flex flex-col items-center justify-start h-full mt-10">
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
    <section className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-4">
      <section className="flex flex-col items-center justify-center w-full gap-4 lg:col-span-3">
        <article className="grid w-full grid-cols-1 gap-4 justify-items-center md:grid-cols-2">
          {data.map((card, index) => (
            <Card
              data={card}
              isSelected={card.numeroTarjeta === currentCard.numeroTarjeta}
              setCurrentCard={setCurrentCard}
              key={index}
            />
          ))}
        </article>
      </section>
      <article className="flex flex-col items-center justify-start w-full gap-4">
        <button
          onClick={() => setOpenCreateCard(!openCreateCard)}
          className="w-full px-2 py-1 font-medium underline cursor-pointer hover:text-neutral-400"
        >
          Crear tarketa
        </button>
      </article>

      {openCreateCard && (
        <CreateCardNoPropia setOpenCreateAccount={setOpenCreateCard} />
      )}
    </section>
  );
};

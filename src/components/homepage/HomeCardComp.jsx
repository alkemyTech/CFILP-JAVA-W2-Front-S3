import axios from "axios";
import { useEffect, useState } from "react";
import { CardIcon } from "../icons/CardIcon";
import { CustomButton } from "../CustomButton";
import { useNavigate } from "react-router";
// import cards from "../../mock/cards.json";

export const HomeCardComp = () => {
  const navigateTo = useNavigate();
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
        import.meta.env.VITE_API_GET_CARD_USER +
          `/${JSON.parse(localStorage.getItem("user")).id}`,
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Petición cancelada");
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
      <article className="flex items-center justify-center bg-white rounded-md min-h-52 animate-pulse">
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="flex flex-col items-start justify-center h-full transition-shadow duration-300 ease-in-out bg-white border-l-4 rounded-md border-l-sky-300 hover:shadow-md min-h-52 shadow-neutral-800/25">
        <aside className="flex">
          <div className="p-1.5 bg-sky-300 rounded-br-md">
            <CardIcon className={"w-7 h-7"} />
          </div>
        </aside>

        <div className="flex flex-col items-center justify-center w-full h-full pt-3 pb-5 mt-2 gap-y-2">
          <div className="flex flex-col items-center justify-start h-full">
            <strong className="text-xl text-red-500">
              Error al cargar las cuentas
            </strong>
            <small className="px-3 text-xs italic text-center text-neutral-500">
              Ha ocurrido un error en el servidor, vuelve a intentarlo
            </small>
          </div>
          <span className="mt-2">
            <CustomButton
              label={"Reintentar"}
              onClick={handleReload}
              isDisable={isLoading}
            />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="transition-shadow duration-300 ease-in-out bg-white border-l-4 rounded-md border-l-sky-300 hover:shadow-md min-h-52 shadow-neutral-800/25">
      <aside className="flex">
        <div className="p-1.5 bg-sky-300 rounded-br-md">
          <CardIcon className={"w-7 h-7"} />
        </div>
        <div className="flex items-center justify-end w-full pr-4">
          <CustomButton
            label={"Ver más info."}
            onClick={() => navigateTo("/cards")}
          />
        </div>
      </aside>

      <aside className="flex flex-col items-start px-3 py-2">
        <h3 className="w-full pb-3 text-lg font-bold">Tarjetas</h3>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full pb-5 gap-y-2">
            <div className="flex flex-col items-center justify-start h-full">
              <strong className="text-xl text-red-500">
                No tiener tajetas cargadas
              </strong>
              <small className="px-3 text-xs italic text-center text-neutral-500">
                Puedes cargar una tarjeta para comenzar a usarla
              </small>
            </div>
            <span className="mt-2">
              <CustomButton
                label={"Cargar nueva tarjeta"}
                onClick={() => navigateTo("/cards")}
              />
            </span>
          </div>
        ) : (
          data.slice(0, 2).map((item, index) => (
            <section
              key={item.id || index}
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="flex items-start justify-between w-full text-sm">
                <div className="flex flex-col">
                  <strong className="">
                    {item.compania}{" "}
                    <small className="italic text-neutral-400">
                      {item.tipo}
                    </small>
                  </strong>
                  <small className="italic">************{item.numeroTarjeta}</small>
                </div>
              </div>

              {index < 1 && data.length > 1 && (
                <span className="w-2/3 my-3 border-t" />
              )}
            </section>
          ))
        )}
      </aside>
    </article>
  );
};

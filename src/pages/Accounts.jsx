import { useEffect, useState } from "react";

import accounts from "../mock/accounts.json";
import { Account, AccountMovements, CustomButton } from "../components";
import axios from "axios";

export const Accounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(accounts);
  const [reload, setReload] = useState(false);

  const [currentAccount, setCurrentAccount] = useState(accounts[0]);

  function handleReload() {
    setReload(!reload);
  }

  useEffect(() => {

    const controller = new AbortController();

    setIsLoading(true);
    axios
      .get(
        import.meta.env.VITE_API_GET_ACCOUNT_USER +
          `/${localStorage.getItem("id")}`,
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
        if (res.data.length > 0) setCurrentAccount(res.data[0]);
        console.log(res);
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
      <div className="flex items-center justify-center h-full animate-pulse">
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
      </div>
    );
  }

  if (error) {
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
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
      <section className="flex flex-col items-center justify-center gap-4 w-full lg:col-span-3">
        <article className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-4 w-full">
          {data.map((account, index) => (
            <Account key={index} data={account} defaultSelected={index === 1} />
          ))}
        </article>
        <AccountMovements account={currentAccount} />
      </section>
      <article className="w-full flex flex-col items-start justify-start gap-4">
        <div className="h-24 p-4 w-full bg-amber-400 rounded-md">
          Nueva Transaccion
        </div>
      </article>
    </section>
  );
};

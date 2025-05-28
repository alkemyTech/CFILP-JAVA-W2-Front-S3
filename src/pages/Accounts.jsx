import { useEffect, useState } from "react";

import {
  Account,
  AccountMovements,
  CreateAccount,
  CustomButton,
} from "../components";
import { useFetch } from "../hooks/useFetch";
import { getAccounts } from "../api/account";

export const Accounts = () => {
  const [openCreateAccount, setOpenCreateAccount] = useState(false);

  const [currentAccount, setCurrentAccount] = useState([]);
  const { isLoading, error, data, fetch } = useFetch(getAccounts, {
    autoFetch: true,
    error: "Error al obtener las cuentas",
  });

  useEffect(() => {
    if (data.length === 0) return;

    setCurrentAccount(data[0]);
  }, [data]);

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
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
      <section className="flex flex-col items-center justify-center gap-4 w-full lg:col-span-3">
        <article className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-4 w-full">
          {data.map((account, index) => (
            <Account
              key={index}
              data={account}
              setCurrentAccount={setCurrentAccount}
              isSelected={currentAccount.numeroCuenta === account.numeroCuenta}
            />
          ))}
        </article>
        <AccountMovements account={currentAccount} />
      </section>
      <article className="w-full flex flex-col items-center justify-start gap-4">
        <button
          onClick={() => setOpenCreateAccount(true)}
          className="px-2 py-1 font-medium underline cursor-pointer hover:text-neutral-400 w-full rounded-md"
        >
          Crear una cuenta
        </button>
      </article>

      {openCreateAccount && (
        <CreateAccount setOpenCreateAccount={setOpenCreateAccount} />
      )}
    </section>
  );
};

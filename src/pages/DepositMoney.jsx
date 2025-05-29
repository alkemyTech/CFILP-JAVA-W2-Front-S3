import { toast } from "sonner";
import { useState } from "react";

//import accounts from "../mock/accounts.json";
import { getAccounts } from "../api/account";
import { CustomButton } from "../components/CustomButton";
import { useFetch } from "../hooks/useFetch";
import { depositMoney } from "../api/money";

export const DepositMoney = () => {
  const { data, error, isLoading, fetch } = useFetch(getAccounts, {
    autoFetch: true,
  });
  const { isLoading: isLoadingDeposit, fetch: deposit } =
    useFetch(depositMoney);

  const [formData, setFormData] = useState({
    monto: "",
    destino: "",
  });
  const [accountSelected, setAccountSelected] = useState("Seleccionar cuenta");
  const [accountSelectionOpen, setAccountSelectionOpen] = useState(false);

  function handleReload() {
    fetch();
  }

  function handleAccountSelectionOpen() {
    setAccountSelectionOpen(!accountSelectionOpen);
  }

  function handleAccountSelection(accountAlias, destino) {
    setAccountSelected(accountAlias);
    setFormData({ ...formData, destino });
    setAccountSelectionOpen(false);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  console.log
  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^[1-9]\d*(\.\d{1,2})?$/.test(formData.monto)) {
      toast.error("Sin 0 al inicio y solo 2 decimales");
      return;
    }

    if (
      !/^[a-zA-Z0-9]{3,9}\.[a-zA-Z0-9]{3,9}\.[a-zA-Z0-9]{3,9}$/.test(accountSelected)
    ) {
      toast.error("Selecciona una de tus cuentas");
      return;
    }

    deposit({
      params: formData,
      success: "Dinero depositado exitosamente",
      error: "Error al depositar el dinero, vuelve a intentarlo",
    });
  }

  if (isLoading) {
    return (
      <article className="flex flex-col items-center w-full p-4 bg-white animate-pulse">
        <div className="z-10 w-10 h-10 border-4 rounded-full animate-spin border-neutral-500 border-l-sky-400"></div>
        <p className="mt-3 text-sm italic">
          Cargando las cuentas del usuario...
        </p>
      </article>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center w-full p-4 bg-white">
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-2xl font-bold text-red-500">
            Error al cargar las cuentas
          </h1>
          <small className="text-sm italic">Por favor, intenta de nuevo</small>
        </div>
        <CustomButton label={"Reintentar"} onClick={handleReload} />
      </div>
    );
  }

  return (
    <div className="px-2 py-5 bg-white">
      <form onSubmit={handleSubmit} className="">
        <label htmlFor={"monto"} className="block mb-1 ml-1 font-medium">
          Introduce el monto
        </label>

        <div className="flex items-center w-full gap-x-3">
          <input
            value={formData.monto}
            onChange={handleChange}
            name="monto"
            placeholder="$0.00"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:italic"
          />

          <span className="relative w-full h-full">
            <button
              disabled={data.length === 0}
              type="button"
              onClick={handleAccountSelectionOpen}
              className="flex w-full h-full px-4 py-2 mx-auto italic truncate border border-gray-300 rounded-md cursor-pointer"
            >
              {data.length === 0 ? "No tienes cuentas" : accountSelected}
            </button>

            {accountSelectionOpen && (
              <div className="absolute w-full bg-white border border-gray-300 rounded-md">
                {data.map((account, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      handleAccountSelection(
                        account.alias,
                        account.numeroCuenta
                      )
                    }
                    className="flex w-full h-full px-4 py-2 mx-auto text-sm italic truncate cursor-pointer hover:bg-neutral-200"
                  >
                    {account.alias}
                  </button>
                ))}
              </div>
            )}
          </span>
        </div>

        <input
          disabled={isLoadingDeposit}
          type="submit"
          value="Recargar dinero"
          className="flex px-4 py-2 mx-auto mt-10 font-bold rounded-md cursor-pointer bg-sky-300 hover:bg-sky-200 disabled:line-through disabled:text-neutral-500 disabled:bg-neutral-200 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

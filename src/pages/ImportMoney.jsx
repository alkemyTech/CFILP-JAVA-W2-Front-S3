import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

//import accounts from "../mock/accounts.json";
import { importMoney } from "../api/account";
import { CustomButton } from "../components/CustomButton";

export const ImportMoney = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    monto: "",
    destino: "",
  });
  const [accountSelected, setAccountSelected] = useState("Seleccionar cuenta");
  const [accountSelectionOpen, setAccountSelectionOpen] = useState(false);

  function handleReload() {
    setReload(!reload);
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!/^[1-9]\d*(\.\d{1,2})?$/.test(formData.monto)) {
      toast.error("Sin 0 al inicio y solo 2 decimales");
      return;
    }

    const controller = new AbortController();
    try {
      await importMoney(formData, controller.signal);
      toast.success("Transferencia hecha con éxito");
    } catch (err) {
      toast.error(err.message);
      if (axios.isCancel(err)) return;
    }
  }

  useEffect(() => {

    const controller = new AbortController();

    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_API_GET_ACCOUNT_USER + `/${JSON.parse(localStorage.getItem("user")).id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setError(null);
        setIsLoading(false);
        setData(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.error("Petición cancelada");
        } else {
          setError("Error al obtener el tipo de cambio");
          setData([]);
        }
      });

    return () => {
      controller.abort(); // Se cancela si el componente se desmonta o cambia el efecto
    };
  }, [reload]);

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
              type="button"
              onClick={handleAccountSelectionOpen}
              className="flex w-full h-full px-4 py-2 mx-auto italic truncate border border-gray-300 rounded-md cursor-pointer"
            >
              {accountSelected}
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
          disabled={isLoading}
          type="submit"
          value="Recargar dinero"
          className="flex px-4 py-2 mx-auto mt-10 font-bold rounded-md cursor-pointer bg-sky-300 hover:bg-sky-200 disabled:line-through disabled:text-neutral-500 disabled:bg-neutral-200 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

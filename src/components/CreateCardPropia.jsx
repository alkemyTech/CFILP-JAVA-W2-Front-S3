import { useState } from "react";
import { toast } from "sonner";

import { useFetch } from "../hooks/useFetch";
import { getAccounts } from "../api/account";
import { createCardPropia } from "../api/card";
import { CloseIcon } from "./icons/CloseIcon";

export const CreateCardPropia = ({ setOpenCreateCardPropia, reload }) => {
  const [acept, setAcept] = useState(false);
  const [formData, setFormData] = useState({
    numeroCuenta: "",
  });
  const [openCuentas, setOpenCuentas] = useState(false);

  const { data, error, fetch, isLoading } = useFetch(getAccounts, {
    autoFetch: true,
    error: "Error al obtener cuentas",
  });
  const { isLoading: isLoadingCreate, fetch: createCardP } = useFetch(
    createCardPropia,
    {
      success: "Tarjeta creada exitosamente",
      error: "Error al crear la tarjeta, vuelve a intentarlo",
      final: () => {
        setOpenCreateCardPropia(false);
        reload();
      },
    }
  );

  function handleClose() {
    setOpenCreateCardPropia(false);
  }

  function handleSelectedCuentas(numeroCuenta) {
    setFormData({ ...formData, numeroCuenta });
    setOpenCuentas(false);
  }

  function handleOpenCuentas() {
    if (error) {
      fetch();
      return;
    }
    setOpenCuentas(!openCuentas);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!acept) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    if (formData.numeroCuenta === "") {
      toast.error("Debes seleccionar una cuenta");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const nombre = user.nombre || "";
    const apellido = user.apellido || "";

    createCardP({
      idCuenta: formData.numeroCuenta,
      params: { nombreTitular: nombre + " " + apellido },
    });
  }

  return (
    <section className="fixed top-0 left-0 flex items-center justify-center w-full h-full overflow-y-auto bg-black/50">
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded-md shadow-lg overflow-y-auto max-h-full lg:max-h-[90vh]">
        <span className="flex items-center w-full">
          <h3 className="text-2xl font-bold w-full text-center">Alkemy Card</h3>
          <button
            onClick={handleClose}
            className="hover:text-neutral-500 cursor-pointer"
          >
            <CloseIcon className={"w-8 h-8"} />
          </button>
        </span>

        <form className="flex flex-col items-center w-full mt-5">
          <div className="flex items-start w-full mt-2 gap-x-4">
            <div className="relative w-full h-full">
              <label
                htmlFor={"cuenta"}
                className="block mb-1 ml-1 text-sm font-medium"
              >
                A qué cuenta la asociaras?
              </label>
              <button
                id="cuenta"
                disabled={isLoading}
                type="button"
                onClick={handleOpenCuentas}
                className={`flex w-full h-full px-4 py-2 mx-auto italic truncate border  rounded-md cursor-pointer ${
                  error ? "text-red-400 border-red-300" : "border-gray-300"
                } ${isLoading ? "animate-pulse" : ""}`}
              >
                {error
                  ? "Recargar"
                  : data.length === 0
                  ? "No tienes cuentas"
                  : formData.numeroCuenta === ""
                  ? "Selecciona"
                  : formData.numeroCuenta}
              </button>

              {openCuentas && (
                <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md">
                  {data.map((account, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        handleSelectedCuentas(account.numeroCuenta);
                      }}
                      className="flex w-full h-full px-4 py-2 mx-auto text-sm italic truncate cursor-pointer hover:bg-neutral-200"
                    >
                      {account.alias}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-start w-full mt-5 gap-x-2">
            <span
              onClick={() => setAcept(!acept)}
              className={`flex items-center justify-center w-4 h-4 border rounded-sm cursor-pointer ${
                acept ? "bg-green-300" : ""
              }`}
            ></span>
            <p className="text-sm font-medium">
              Acepto los términos y condiciones
            </p>
          </div>

          <input
            onClick={(e) => handleSubmit(e)}
            disabled={isLoadingCreate}
            type="submit"
            value="Solicitar AlkemyCard"
            className="flex px-4 py-2 mx-auto mt-10 font-bold rounded-md cursor-pointer bg-sky-300 hover:bg-sky-200 disabled:line-through disabled:text-neutral-500 disabled:bg-neutral-200 disabled:cursor-not-allowed"
          />
        </form>
      </div>
    </section>
  );
};

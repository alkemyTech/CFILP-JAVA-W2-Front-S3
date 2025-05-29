import { useState } from "react";
import { toast } from "sonner";

import { useFetch } from "../hooks/useFetch";
import { createAccount } from "../api/account";
import { CloseIcon } from "./icons/CloseIcon";
  
const avaliable = {
  tipos: ["CA", "CC"],
  monedas: ["Dolar", "Ars", "Real", "Euro"],
};
export const CreateAccount = ({ setOpenCreateAccount, reload }) => {
  const [selectedTipo, setSelectedTipo] = useState("CA");
  const [openTipos, setOpenTipos] = useState(false);
  const [selectedMoneda, setSelectedMoneda] = useState("ARS");
  const [openMonedas, setOpenMonedas] = useState(false);
  const [acept, setAcept] = useState(false);
  const { isLoading, error, fetch } = useFetch(createAccount, {
    success: "Cuenta creada exitosamente",
    error: "Error al crear la cuenta, vuelve a intentarlo",
    final: () => {
      setOpenCreateAccount(false);
      reload();
    },
  });

  function handleClose() {
    setOpenCreateAccount(false);
  }

  function handleSelectedTipo(tipo) {
    setSelectedTipo(tipo);
    setOpenTipos(false);
  }
  function handleSelectedMoneda(moneda) {
    setSelectedMoneda(moneda);
    setOpenMonedas(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!acept) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    fetch({ tipo: selectedTipo, moneda: selectedMoneda });
  }

  return (
    <section className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50">
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded-md shadow-lg">
        <span className="flex items-center w-full">
          <h3 className="text-2xl font-bold w-full text-center">
            Crear una cuenta bancaria
          </h3>
          <button
            onClick={handleClose}
            className="hover:text-neutral-500 cursor-pointer"
          >
            <CloseIcon className={"w-8 h-8"} />
          </button>
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <div className="flex items-center w-full mt-4 gap-x-4">
            <div className="relative w-full h-full">
              <label className="text-sm font-medium" htmlFor="moneda">
                Tipo de caja
              </label>
              <button
                disabled={avaliable.tipos.length === 0}
                type="button"
                onClick={() => {
                  setOpenTipos(!openTipos);
                }}
                className="flex w-full h-full px-4 py-2 mx-auto italic truncate border border-gray-300 rounded-md cursor-pointer"
              >
                {selectedTipo}
              </button>

              {openTipos && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-md">
                  {avaliable.tipos.map((tipo, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handleSelectedTipo(tipo)}
                      className="flex w-full h-full px-4 py-2 mx-auto text-sm italic truncate cursor-pointer hover:bg-neutral-200"
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full h-full">
              <label className="text-sm font-medium" htmlFor="moneda">
                Tipo de moneda
              </label>
              <button
                id="moneda"
                disabled={avaliable.tipos.length === 0}
                type="button"
                onClick={() => {
                  setOpenMonedas(!openMonedas);
                }}
                className="flex w-full h-full px-4 py-2 mx-auto italic truncate border border-gray-300 rounded-md cursor-pointer"
              >
                {selectedMoneda}
              </button>

              {openMonedas && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-md">
                  {avaliable.monedas.map((moneda, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handleSelectedMoneda(moneda)}
                      className="flex w-full h-full px-4 py-2 mx-auto text-sm italic truncate cursor-pointer hover:bg-neutral-200"
                    >
                      {moneda}
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
            onClick={handleSubmit}
            disabled={isLoading}
            type="submit"
            value="Crear caja"
            className="flex px-4 py-2 mx-auto mt-10 font-bold rounded-md cursor-pointer bg-sky-300 hover:bg-sky-200 disabled:line-through disabled:text-neutral-500 disabled:bg-neutral-200 disabled:cursor-not-allowed"
          />
        </form>
      </div>
    </section>
  );
};

import { useState } from "react";
import { toast } from "sonner";
import { CustomInputForm } from "./CustomInputForm";
import { useFetch } from "../hooks/useFetch";
import { getAccounts } from "../api/account";
import { createCardNoPropia } from "../api/card";
import { CloseIcon } from "./icons/CloseIcon";

const avaliable = {
  tipos: ["CREDITO", "DEBITO"],
  compania: ["VISA", "MASTERCARD", "ALKEMYCARD"],
};

export const CreateCardNoPropia = ({ setOpenCreateCard, reload }) => {
  const [acept, setAcept] = useState(false);
  const [formData, setFormData] = useState({
    numeroCuenta: "",
    numeroTarjeta: "",
    codigoSeguridad: "",
    compania: avaliable.compania[0],
    tipo: avaliable.tipos[0],
    particular: "",
  });
  const [openTipos, setOpenTipos] = useState(false);
  const [openCompanias, setOpenCompanias] = useState(false);
  const [openCuentas, setOpenCuentas] = useState(false);

  const { data, error, fetch, isLoading } = useFetch(getAccounts, {
    autoFetch: true,
    error: "Error al obtener cuentas",
  });
  const { isLoading: isLoadingCreate, fetch: createCardNP } = useFetch(
    createCardNoPropia,
    {
      success: "Tarjeta creada exitosamente",
      error: "Error al crear la tarjeta, vuelve a intentarlo",
      final: () => {
        setOpenCreateCard(false);
        reload();
      },
    }
  );

  function handleClose() {
    setOpenCreateCard(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectedCompania(compania) {
    setFormData({ ...formData, compania });
    setOpenCompanias(false);
  }
  function handleSelectedTipo(tipo) {
    setFormData({ ...formData, tipo });
    setOpenTipos(false);
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

    if (!/^\d{3}$/.test(formData.codigoSeguridad)) {
      toast.error("El código de seguridad debe tener exactamente 3 números");
      return;
    }

    if (!/^\d{13,19}$/.test(formData.numeroTarjeta.replace(/\s+/g, ""))) {
      toast.error("El número de tarjeta debe tener entre 13 y 19 dígitos");
      return;
    }

    const venc = new Date(Date.now());
    venc.setFullYear(venc.getFullYear() + 5);

    const body = {
      numeroTarjeta: formData.numeroTarjeta,
      codigoSeguridad: formData.codigoSeguridad,
      tipo: formData.tipo,
      fechaVencimiento: formatFechaDDMMYYYY(venc),
      compania: formData.compania,
      fechaEmision: formatFechaDDMMYYYY(new Date()),
      particular: formData.particular,
    };

    createCardNP({ idCuenta: formData.numeroCuenta, body });
  }

  function formatFechaDDMMYYYY(date) {
    const d = new Date(date);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  return (
    <section className="fixed top-0 left-0 flex items-center justify-center w-full h-full overflow-y-auto bg-black/50">
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded-md shadow-lg overflow-y-auto max-h-full lg:max-h-[90vh]">
        <span className="flex items-center w-full">
          <h3 className="text-2xl font-bold w-full text-center">
            Asociar tarjeta a una cuenta
          </h3>
          <button
            onClick={handleClose}
            className="hover:text-neutral-500 cursor-pointer"
          >
            <CloseIcon className={"w-8 h-8"} />
          </button>
        </span>

        <form className="flex flex-col items-center w-full mt-10">
          <CustomInputForm
            label={"Introduce tu número de tarjeta"}
            name={"numeroTarjeta"}
            placeholder={"Ej: 1234 567"}
            value={formData.numeroTarjeta}
            onChange={handleChange}
          />

          <CustomInputForm
            label={"Introduce el nombre del particular"}
            name={"particular"}
            placeholder={"Ej: Mariano Perez"}
            value={formData.particular}
            onChange={handleChange}
          />

          <div className="flex items-start w-full mt-2 gap-x-4">
            <CustomInputForm
              label={"Código de seguridad"}
              name={"codigoSeguridad"}
              placeholder={"Ej: 123"}
              value={formData.codigoSeguridad}
              onChange={handleChange}
            />

            <div className="relative w-full h-full">
              <label
                htmlFor={"cuenta"}
                className="block mb-1 ml-1 text-sm font-medium"
              >
                Selecciona una cuenta
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

          <div className="flex items-center w-full mt-2 gap-x-4">
            <div className="relative w-full h-full">
              <label className="text-sm font-medium" htmlFor="moneda">
                Tipo de tarjeta
              </label>
              <button
                disabled={avaliable.tipos.length === 0}
                type="button"
                onClick={() => {
                  setOpenTipos(!openTipos);
                }}
                className="flex w-full h-full px-4 py-2 mx-auto italic truncate border border-gray-300 rounded-md cursor-pointer"
              >
                {formData.tipo}
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
              <label className="text-sm font-medium" htmlFor="compania">
                Tipo de compania
              </label>
              <button
                id="compania"
                disabled={avaliable.tipos.length === 0}
                type="button"
                onClick={() => {
                  setOpenCompanias(!openCompanias);
                }}
                className="flex w-full h-full px-4 py-2 mx-auto italic truncate border border-gray-300 rounded-md cursor-pointer"
              >
                {formData.compania}
              </button>

              {openCompanias && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-md">
                  {avaliable.compania.map((compania, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handleSelectedCompania(compania)}
                      className="flex w-full h-full px-4 py-2 mx-auto text-sm italic truncate cursor-pointer hover:bg-neutral-200"
                    >
                      {compania}
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
            value="Crear tarjeta"
            className="flex px-4 py-2 mx-auto mt-10 font-bold rounded-md cursor-pointer bg-sky-300 hover:bg-sky-200 disabled:line-through disabled:text-neutral-500 disabled:bg-neutral-200 disabled:cursor-not-allowed"
          />
        </form>
      </div>
    </section>
  );
};

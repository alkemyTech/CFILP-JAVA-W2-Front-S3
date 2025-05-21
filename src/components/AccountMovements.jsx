import { useState } from "react";

const options = ["Últimos movimientos", "Histórico", "Pendientes"];

export const AccountMovements = ({ account }) => {
  const [currentOption, setCurrentOption] = useState(0);

  function handleOptionClick(index) {
    console.log(index);
    setCurrentOption(index);
  }

  return (
    <article className="flex flex-col p-4 w-full h-96 bg-white">
      <h3 className="text-2xl font-bold text-sky-500">
        {account.tipo} {account.numeroCuenta}
      </h3>

      <section className="flex flex-col w-full">
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`${
                  index === currentOption
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent"
                } px-4 py-2 border-b-2 cursor-pointer hover:bg-neutral-100`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {currentOption === 1 && account?.movimientos?.utlimos.length > 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="font-medium">No hay movimientos recientes...</p>
          </div>
        ) : (
          <div className="flex items-start justify-between w-full mt-5 px-3 py-2">
            <span className="flex flex-col items-start justify-center">
              <strong className="text-lg">Transferencia</strong>
              <p className="italic text-xs">De: 002-123456</p>
              <p className="italic text-xs">A: 032-133255</p>
            </span>
            <span className="flex flex-col items-end justify-center">
              <strong>$20.000,00</strong>
              <small>
                {new Date("2023-01-15T00:00:00").toLocaleDateString()}
              </small>
            </span>
          </div>
        )}
      </section>
    </article>
  );
};

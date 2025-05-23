import { MasterCardIcon, VisaIcon } from "./";

const cardsIcons = {
  Visa: <VisaIcon className={"w-10 h-10"} />,
  MasterCard: <MasterCardIcon className={"w-10 h-10"} />,
};

export const Card = ({ data, isSelected, setCurrentCard }) => {
  function handleClick() {
    setCurrentCard(data);
  }

  return (
    <article
      onClick={handleClick}
      className={`flex flex-col transition-shadow duration-300 ease-in-out bg-white border-l-4 border-2 rounded-md  hover:shadow-md shadow-neutral-800/25 w-full p-4 cursor-pointer ${
        isSelected ? "border-sky-300" : "border-white border-l-sky-300"
      }`}
    >
      <span className="flex items-start justify-between text-sm">
        <p className="font-bold text-lg">{data.tipo}</p>

        <span className="flex flex-col items-end">
          {cardsIcons[data.compania]}
          <p
            className={`font-bold ${
              isSelected ? "text-sky-300" : "text-neutral-400"
            }`}
          >
            {data.compania}
          </p>
          <small className="text-xs italic text-neutral-400">
            {data.numeroTarjeta}
          </small>
        </span>
      </span>

      <span className="flex flex-col items-start mt-2">
        <h3 className="text-lg font-bold">{data.particular}</h3>
        <p className="text-xs italic">
          Emitida: {new Date(data.fechaEmision).toLocaleDateString()}
        </p>
        <p className="text-xs italic">
          Vencimiento: {new Date(data.fechaVencimiento).toLocaleDateString()}
        </p>
      </span>
    </article>
  );
};

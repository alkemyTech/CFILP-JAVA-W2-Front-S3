import { CopyIcon } from "./icons/CopyIcon";

export const Account = ({ data }) => {
  console.log(data);
  return (
    <article
      className={`flex flex-col transition-shadow duration-300 ease-in-out bg-white border-l-4 border-4 border-white rounded-md border-l-sky-300 hover:shadow-md shadow-neutral-800/25 w-full p-4 pb-2`}
    >
      <h3 className="font-medium text-lg">Saldo</h3>
      <span className="flex items-center justify-between text-2xl">
        <strong>
          ${data.monto} <small>{data.moneda}</small>
        </strong>
        <strong>{data.tipo}</strong>
      </span>
      <p className="italic text-neutral-500 text-xs">N° {data.numeroCuenta}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col items-start text-xs">
          <p title={data.alias} className="truncate">
            Alias: {data.alias}
          </p>
          <p title={data.cvu} className="truncate">
            CVU: {data.cvu}
          </p>
        </div>
        <button className="hover:text-sky-500 cursor-pointer p-1 rounded-md">
          <CopyIcon className={"w-6 h-6"} />
        </button>
      </div>

      <span className="flex items-center justify-end mt-4">
        <p className="font-medium text-sky-500">Datos de la cuenta</p>
      </span>
    </article>
  );
};

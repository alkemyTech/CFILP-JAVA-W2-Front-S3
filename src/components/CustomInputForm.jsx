// Componente Input de los forms de login, register y demás formularios futuros
export const CustomInputForm = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  err,
  onChange,
}) => {
  return (
    <div className="mb-3 w-full">
      <label htmlFor={name} className="block mb-1 font-medium ml-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`w-full p-2 border rounded placeholder:italic ${
          err.isWrong ? "border-red-300" : "border-gray-300"
        }`}
      />
      <small
        className={`text-red-400 italic text-xs ml-1 ${
          err.isWrong ? "visible" : "invisible"
        }`}
      >
        {err.message}
      </small>
    </div>
  );
};

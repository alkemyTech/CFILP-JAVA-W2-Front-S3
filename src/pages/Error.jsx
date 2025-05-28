import { useNavigate } from "react-router";

export const Error = () => {
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-10 h-full w-full">
      <h1 className="text-4xl font-bold text-red-500">Error 404</h1>
      <p className="text-lg italic text-neutral-500">Ruta no encontrada</p>
      <button
        onClick={() => navigateTo("/login")}
        className="px-3 py-2 rounded-md bg-neutral-800 text-white font-bold"
      >
        Ir al login
      </button>
    </div>
  );
};

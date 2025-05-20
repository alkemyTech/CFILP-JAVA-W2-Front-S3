import { Header } from "./Header";

export const PageContainer = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen mx-auto bg-gray-100 max-w-7xl">
      <Header />

      <div className="block px-10 py-5 bg-sky-200 md:hidden">
        <p className="text-2xl">
          Hola, <b>Usuario Desconocido</b>
        </p>
      </div>

      <section className="grid w-full h-full grid-cols-1 px-4 mt-4 md:grid-cols-4 justify-items-center md:mt-10">
        <article className="order-1 h-full md:col-span-3">{children}</article>
      </section>
    </div>
  );
};
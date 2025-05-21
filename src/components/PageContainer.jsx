import { Header, Navigator } from "./";

export const PageContainer = ({ children }) => {
  return (
    <div className="w-full h-screen max-h-screen mx-auto overflow-y-auto bg-gray-100 max-w-7xl">
      <Header />

      <section className="flex flex-col w-full h-full md:h-auto md:grid md:grid-cols-4">
        <article className="flex flex-col w-full h-full overflow-y-auto md:order-1 md:col-span-3">
          {children}
        </article>
        <Navigator />
      </section>
    </div>
  );
};
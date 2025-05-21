import { HomeCardComp, DolarCotization, HomeAccountComp } from "../components";

export const Home = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      <HomeAccountComp />
      <HomeCardComp />
      <DolarCotization />
    </div>
  );
};

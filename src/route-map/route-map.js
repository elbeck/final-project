import HomePage from "pages/HomePage/HomePage";
import CollectionPage from "pages/CollectionPage/CollectionPage";
import PokePage from "pages/PokePage/PokePage";
import Error404 from "pages/Error404/Error404";

let routeMap = {
  home: { path: "/", component: HomePage, exact: true },
  pokemon: { path: "/pokemons/:id", component: PokePage, exact: true },
  collection: { path: "/collection", component: CollectionPage, exact: true },
  error: { path: "**", component: Error404, exact: false },
};

export default routeMap;

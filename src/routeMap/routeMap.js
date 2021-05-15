import HomePage from "components/pages/home-page/home-page";
import CollectionPage from "components/pages/collection-page/collection-page";
import PokePage from "components/pages/poke-page/poke-page";
import Error404 from "components/pages/error404/error404";

let routeMap = {
  home: { path: "/", component: HomePage, exact: true },
  pokemon: { path: "/pokemons/:id", component: PokePage, exact: false },
  collection: { path: "/collection", component: CollectionPage, exact: false },
  error: { path: "**", component: Error404, exact: false },
};

export default routeMap;

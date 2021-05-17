import { combineReducers } from "redux";
import pokemonGroupReducer from "./pokemonGroupReducer";
import collectionReducer from "./collectionReducer";
import pokemonReducer from "./pokemonReducer";

export default combineReducers({
  pokemonGroup: pokemonGroupReducer,
  collection: collectionReducer,
  pokemon: pokemonReducer,
});

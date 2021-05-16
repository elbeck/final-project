import { combineReducers } from "redux";
import pokemonGroupReducer from "./pokemonGroupReducer";
import pokemonReducer from "./pokemonReducer";

export default combineReducers({
  pokemonGroup: pokemonGroupReducer,
  pokemon: pokemonReducer,
});

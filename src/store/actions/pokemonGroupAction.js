import {
  FETCH_POKEMON_GROUP_START,
  FETCH_POKEMON_GROUP_SUCCESS,
  FETCH_POKEMON_GROUP_ERROR,
  RESET_POKEMON_GROUP,
} from "store/constants/action-types";
import { getPokemonGroup, getRels, addRel } from "api/make-request";

//=============================================================================================================

export function fetchPokemonGroupStart() {
  return {
    type: FETCH_POKEMON_GROUP_START,
  };
}

export function fetchPokemonGroupSuccess(payload) {
  return {
    type: FETCH_POKEMON_GROUP_SUCCESS,
    payload,
  };
}

export function fetchPokemonGroupError(error) {
  return {
    type: FETCH_POKEMON_GROUP_ERROR,
    error,
  };
}

export function resetPokemonGroup() {
  return {
    type: RESET_POKEMON_GROUP,
  };
}

//=============================================================================================================

export function fetchPokemonGroup() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPokemonGroupStart());

      const page = getState().pokemonGroup.nextPage;
      const { data: pokemonGroup, nextPage } = await getPokemonGroup(page);
      const rels = await getRels();
      const catchDates = rels.reduce((obj, rel) => {
        const pokemonId = Number(rel.pokemonsId);
        obj[pokemonId] = rel.date;
        return obj;
      }, {});

      dispatch(
        fetchPokemonGroupSuccess({
          pokemonGroup,
          nextPage,
          catchDates,
        })
      );
    } catch (err) {
      dispatch(fetchPokemonGroupError(err));
    }
  };
}

export function addToCollection(pokemonId, catchDate) {
  return async (dispatch, getState) => {
    try {
      await addRel({ pokemonId, catchDate });
      const rels = await getRels();
      const catchDates = rels.reduce((obj, rel) => {
        const pokemonId = Number(rel.pokemonsId);
        obj[pokemonId] = rel.date;
        return obj;
      }, {});

      const nextPage = getState().pokemonGroup.nextPage;

      dispatch(
        fetchPokemonGroupSuccess({
          pokemonGroup: [],
          nextPage,
          catchDates,
        })
      );
    } catch (err) {
      dispatch(fetchPokemonGroupError(err));
    }
  };
}

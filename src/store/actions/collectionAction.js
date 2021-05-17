import {
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  RESET_COLLECTION,
} from "store/constants/action-types";
import { getCollection } from "api/make-request";

//=============================================================================================================

export function fetchPokemonGroupStart() {
  return {
    type: FETCH_COLLECTION_START,
  };
}

export function fetchPokemonGroupSuccess(payload) {
  return {
    type: FETCH_COLLECTION_SUCCESS,
    payload,
  };
}

export function fetchPokemonGroupError(error) {
  return {
    type: FETCH_COLLECTION_ERROR,
    error,
  };
}

export function resetCollection() {
  return {
    type: RESET_COLLECTION,
  };
}
//=============================================================================================================

export function fetchPokemonGroup() {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPokemonGroupStart());
      const page = getState().collection.nextPage;
      const {
        data: pokemonGroup,
        nextPage,
        lastPage,
        date,
      } = await getCollection(page);

      dispatch(
        fetchPokemonGroupSuccess({
          pokemonGroup,
          nextPage,
          lastPage,
          catchDates: date,
        })
      );
    } catch (err) {
      dispatch(fetchPokemonGroupError(err));
    }
  };
}

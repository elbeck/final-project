import parseLinkHeader from "parse-link-header";
import axios from "axios";

const USER_ID = 1;
const BASE_URL = "http://localhost:3004";
const cardsPerPage = 48;

export const getPokemons = async (page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemons?_page=${page}&_limit=${cardsPerPage}`
    );
    const links = parseLinkHeader(response.headers.link);
    const next = links?.next._page;
    const last = links?.last._page;
    return { data: response.data, next, last };
  } catch (err) {
    throw new Error(err);
  }
};

// export const getPokemons = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/pokemons`);
//     return response.data;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const getPokemonById = async (pokemonId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemons/${pokemonId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
  // try {
  //   const response = await fetch(`${BASE_URL}/pokemons`);
  //   const data = await response.json();
  //   // const links = parseLinkHeader(response.headers.get("link"));
  //   return data;
  // } catch (err) {
  //   throw new Error(err);
  // }
};

export const getRels = async (usersId = USER_ID) => {
  try {
    const response = await axios.get(`${BASE_URL}/rels?usersId=${usersId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
  // try {
  //   const response = await fetch(`${BASE_URL}/pokemons`);
  //   const data = await response.json();
  //   // const links = parseLinkHeader(response.headers.get("link"));
  //   return data;
  // } catch (err) {
  //   throw new Error(err);
  // }
};

export const getRel = async (pokemonId, usersId = USER_ID) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/rels?usersId=${usersId}&pokemonsId=${pokemonId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
  // try {
  //   const response = await fetch(`${BASE_URL}/pokemons`);
  //   const data = await response.json();
  //   // const links = parseLinkHeader(response.headers.get("link"));
  //   return data;
  // } catch (err) {
  //   throw new Error(err);
  // }
};

export const addRels = async (pokemonsId, date, usersId = USER_ID) => {
  try {
    const response = await axios.get(`${BASE_URL}/rels`);
    const relId = +response.data.id + 1;
    await axios.post(`${BASE_URL}/rels`, {
      id: relId,
      usersId,
      pokemonsId,
      date,
    });
  } catch (err) {
    throw new Error(err);
  }
};

// export const getRels = async (userId = USER_ID) => {};

// export const getUser = async (userId) => {};
// export const addUser = async (userName) => {};
// export const setUser = async (userId, newUserState) => {};
// export const deleteUser = async (userId) => {};

//deleteRel(userId, pokemonId) => {
//   let relId = getRelId(userId, pokemonId);
//   deleteRelById(relId)
// }

import React from "react";
import PokeCard from "./poke-card/poke-card";

function PokeCardDesk(props) {
  const pokemons = props.pokemons.map((pokemon) => {
    return (
      <PokeCard
        key={pokemon.id}
        className="m-2"
        name={pokemon.name}
        id={pokemon.id}
        imgPath={`pokemons/${pokemon.id}.png`}
        status={props.collection.has(pokemon.id)}
        handleBtnClick={(date) => {
          props.handleBtnClick(pokemon.id, date);
        }}
      />
    );
  });

  return (
    <div
      className={`d-flex flex-wrap justify-content-center ${props.className}`}
    >
      {pokemons}
    </div>
  );
}

export default PokeCardDesk;

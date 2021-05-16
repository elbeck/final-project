import React from "react";
import PokeCard from "components/PokeCard/PokeCard";

function PokeCardDesk(props) {
  const pokemonCards = props.pokemonGroup.map((pokemon) => {
    const isPokemonCaught = props.catchInfo.hasOwnProperty(pokemon.id);
    return (
      <PokeCard
        key={pokemon.id}
        className="m-2"
        name={pokemon.name}
        id={pokemon.id}
        imgPath={`pokemons/${pokemon.id}.png`}
        isPokemonCaught={isPokemonCaught}
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
      {pokemonCards}
    </div>
  );
}

export default PokeCardDesk;

import React from "react";
import PokeCard from "components/PokeCard/PokeCard";
import PropTypes from "prop-types";

function PokeCardDesk(props) {
  const pokemonCards = props.pokemonGroup.map((pokemon) => {
    const isPokemonCaught = props.catchInfo.hasOwnProperty(pokemon.id);
    return (
      <PokeCard
        key={pokemon.id}
        className="m-2"
        name={pokemon.name}
        id={pokemon.id}
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

PokeCardDesk.propTypes = {
  pokemonGroup: PropTypes.arrayOf(PropTypes.object).isRequired,
  catchInfo: PropTypes.object.isRequired,
  handleBtnClick: PropTypes.func,
};

PokeCardDesk.defaultProps = {
  handleBtnClick: () => {},
};

export default PokeCardDesk;

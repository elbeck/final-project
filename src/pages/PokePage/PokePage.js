import React, { useEffect } from "react";
import { connect } from "react-redux";
import PokeballLoader from "components/PokeballLoader/PokeballLoader";
import PokeInfo from "components/PokeInfo/PokeInfo";
import { fetchPokemonById } from "store/actions/pokemonAction";
import { useParams } from "react-router-dom";

function PokePage(props) {
  const { id } = useParams();
  useEffect(() => {
    props.fetchPokemonById(id);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {props.loading || !props.pokemon ? (
        <PokeballLoader />
      ) : (
        <PokeInfo
          name={props.pokemon.name}
          id={props.pokemon.id}
          catchDate={props.catchDate}
        />
      )}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
    catchDate: state.pokemon.catchDate,
    loading: state.pokemon.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonById: (id) => dispatch(fetchPokemonById(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage);

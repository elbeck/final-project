import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./poke-page.module.scss";
import { connect } from "react-redux";
import { fetchPokemonById } from "store/actionCreators/actions";
import PokeballLoader from "components/elements/pokeball-loader";
import PokeInfo from "./poke-info/poke-info";
// import { useLocation } from "react-router-dom";

function PokePage(props) {
  // const location = useLocation();
  // const currentId = currentLocation.pathname.split('/'.pop())
  useEffect(() => {
    const pokemonId = props.match.params.id;
    props.fetchPokemonById(pokemonId);
    // eslint-disable-next-line
  }, []);

  return (
    <Container className={`${styles.container} pt-4`}>
      {props.loading ? (
        <PokeballLoader />
      ) : (
        <PokeInfo pokemon={props.pokemon} status={props.status} />
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemons.pokemon,
    status: state.pokemons.status,
    loading: state.pokemons.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonById: (id) => dispatch(fetchPokemonById(id)),
    // fetchPokemonStatus: (id) => dispatch(fetchPokemonStatus(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage);

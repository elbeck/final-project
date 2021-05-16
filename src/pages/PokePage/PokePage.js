import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./PokePage.module.scss";
import { connect } from "react-redux";
import PokeballLoader from "components/PokeballLoader/PokeballLoader";
import PokeInfo from "components/PokeInfo/PokeInfo";
import { fetchPokemonById } from "store/actions/pokemonAction";
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
        <PokeInfo pokemon={props.pokemon} catchDate={props.catchDate} />
      )}
    </Container>
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

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./PokePage.module.scss";
import { connect } from "react-redux";
import PokeballLoader from "components/PokeballLoader/PokeballLoader";
import PokeInfo from "components/PokeInfo/PokeInfo";
import { fetchPokemonById } from "store/actions/pokemonAction";
import { useParams } from "react-router-dom";

function PokePage(props) {
  // const location = useLocation();
  // const currentId = currentLocation.pathname.split('/'.pop())
  const { id } = useParams();
  useEffect(() => {
    props.fetchPokemonById(id);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {props.loading ? (
        <PokeballLoader />
      ) : (
        <PokeInfo pokemon={props.pokemon} catchDate={props.catchDate} />
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

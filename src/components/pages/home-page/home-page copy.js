import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchPokemons,
  fetchCollection,
  addCollectionItem,
  readyToFetch,
} from "store/actionCreators/actions";
import PokeCardDesk from "components/elements/poke-card-desk/poke-card-desk";
// import PokeballLoader from "components/elements/pokeball-loader";

function HomePage(props) {
  // const [readyToFetch, setReadyToFetch] = useState(true);

  useEffect(() => {
    console.log("useEffect", props.rtf);
    if (props.rtf) {
      props.readyToFetch(false);
      // readyToFetch((prev) => false);
      console.log("hi");
      props.fetchCollection();
      props.fetchPokemons();
    }
    // eslint-disable-next-line
  }, [props.rtf]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (window.pageYOffset + window.innerHeight) <=
      window.innerHeight / 2
    ) {
      document.removeEventListener("scroll", scrollHandler);
      console.log("fetch");
      props.readyToFetch(true);
      // setReadyToFetch((prev) => true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
    // eslint-disable-next-line
  }, [props.pokemons]);

  return (
    <Container className="pt-4">
      <PokeCardDesk
        pokemons={props.pokemons}
        collection={props.collection}
        handleBtnClick={props.addCollectionItem}
      />
      {props.loading && <div>Loading...</div>}
      {props.error && <div>Error</div>}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    rtf: state.pokemonsState.rtf,
    page: state.pokemonsState.curPage,
    pokemons: state.pokemonsState.pokemons,
    loading: state.pokemonsState.loading,
    Error: state.pokemonsState.error,
    collection: state.collectionState.collection,
    collectionLoading: state.collectionState.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readyToFetch: (bool) => dispatch(readyToFetch(bool)),
    fetchPokemons: () => dispatch(fetchPokemons()),
    fetchCollection: () => dispatch(fetchCollection()),
    addCollectionItem: (pokemonId) => dispatch(addCollectionItem(pokemonId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

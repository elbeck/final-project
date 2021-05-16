import React from "react";
import styles from "./PokeInfo.module.scss";
import unknownPokemonImg from "public/Unknown-pokemon.png";

function PokeInfo(props) {
  let nameWithCapitalFirstLetter = "";
  if (props.pokemon) {
    const name = props.pokemon.name;
    nameWithCapitalFirstLetter = name.charAt(0).toUpperCase() + name.slice(1);
  }

  function addDefaultSrc(e) {
    e.target.src = unknownPokemonImg;
  }

  return (
    <React.Fragment>
      {props.pokemon ? (
        <div className={`${styles.content}`}>
          <div className={styles.img}>
            <img
              onError={addDefaultSrc}
              src={`${props.pokemon.id}.png`}
              alt="pokemon"
            />
          </div>
          <div className="mt-5 d-flex flex-column align-items-center ">
            <p className={styles.id}>id: {props.pokemon.id}</p>
            <h1 className={styles.title}>{nameWithCapitalFirstLetter}</h1>
            {props.catchDate ? (
              <React.Fragment>
                <p className={styles.text}>
                  Status: <strong>caught</strong>
                </p>
                <p className={styles.text}>{props.catchDate}</p>
              </React.Fragment>
            ) : (
              <p className={styles.text}>
                Status: <strong>not caught</strong>
              </p>
            )}
            {"< >"}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default PokeInfo;

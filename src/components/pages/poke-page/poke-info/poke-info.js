import React from "react";
import styles from "./poke-info.module.scss";

function PokeInfo(props) {
  let nameWithCapitalFirstLetter = "";
  if (props.pokemon) {
    const name = props.pokemon.name;
    nameWithCapitalFirstLetter = name.charAt(0).toUpperCase() + name.slice(1);
  }

  function addDefaultSrc(ev) {
    ev.target.src = "./../Unknown-pokemon.png";
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
            <p className={styles.text}>
              Status: <strong>{props.status.status}</strong>
            </p>
            {props.status.status === "caught" ? (
              <p className={styles.text}>{props.status.date}</p>
            ) : null}
            {"< >"}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default PokeInfo;

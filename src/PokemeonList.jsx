import React from "react";

function PokemeonList(props) {
  return (
    <div>
      {props.pokemons.map((pokemon) => {
        return <div key={pokemon.name}>{pokemon.name}</div>;
      })}
    </div>
  );
}

export default PokemeonList;

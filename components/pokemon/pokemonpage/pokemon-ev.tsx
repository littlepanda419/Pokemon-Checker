import React from "react";

type PokemonStatProps = {
  pokemonObject: any;
};

export function PokemonEv({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      EVs:
      {pokemonObject.stats.map((statObject: any) => {
        const statName = statObject.stat.name;
        const statEV = statObject.effort;
        if (statEV > 0)
          return (
            <div id={`${statName}ev`} key={`${statName}ev`}>
              {statName}: {statEV}
            </div>
          );
      })}
    </>
  );
}

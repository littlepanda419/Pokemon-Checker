import React from "react";

type PokemonStatProps = {
  pokemonObject: any;
};

function FormatAsPercentage(num: any) {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 255);
}

export function PokemonStat({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      Stats:
      {pokemonObject.stats.map((statObject: any) => {
        const statName = statObject.stat.name;
        const statValue = statObject.base_stat;
        return (
          <div id={`${statName}`} key={`${statName}stat`}>
            {statName}: {statValue}
            <div className="bg-neutral-800  dark:bg-neutral-500 border :border-neutral-800 border-neutral-900 w-3/4 mx-auto my-1">
              <div
                id={`${statName}bar`}
                className="h-5"
                style={{ width: `${FormatAsPercentage(statValue)}` }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

import React from "react";

type PokemonStatProps = {
  pokemonObject: any;
};

export function PokemonType({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      {pokemonObject.types.map((typeObject: any) => {
        const typeName = typeObject.type.name;
        return (
          <div
            id={`type${typeName}`}
            key={`$type${typeName}`}
            className="inline-flex mx-2 self-center p-1 rounded-full min-w-[95px] max-w-fit justify-center font-bold "
          >
            {typeName}
          </div>
        );
      })}
    </>
  );
}

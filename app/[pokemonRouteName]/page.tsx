import { getPokemon, getPokemonChineseName } from "@/lib/pokeapi";
import { PokemonImage } from "@/components/pokemon-image";
import { PokemonStat } from "@/components/pokemon-stat";
import { PokemonEv } from "@/components/pokemon-ev";
import { PokemonType } from "@/components/pokemon-type";
import {
  PokemonMoveButton,
  PokemonMoveShow,
} from "@/components/move/pokemon-move-show";
// localhost:3000/pikachu

export default async function PokemonPage({
  params,
}: {
  params: { pokemonRouteName: string };
}) {
  const { pokemonRouteName } = params; // pikachu
  const pokemonObject = await getPokemon(pokemonRouteName); // get the API data for pikachu
  const pokemonName = pokemonObject.name; //pikachu
  const pokemonChineseName = await getPokemonChineseName(
    pokemonObject.species.url
  );
  return (
    <>
      <div
        id="pokemonRouteName"
        className="flex justify-center text-3xl font-bold mx-2 text-center"
      >
        <a href={"https://wiki.52poke.com/wiki/" + pokemonName} target="_blank">
          {pokemonChineseName}
          <br></br>
          {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
        </a>
      </div>
      <div
        id="pokesplash"
        className="relative items-center justify-center w-[400px] h-[400px] mx-auto"
      >
        <PokemonImage
          image={pokemonObject.sprites.other["official-artwork"].front_default}
          name={pokemonName}
        />
      </div>
      <div
        id="poketype"
        className="flex justify-center content-center text-2xl mx-auto h-fit"
      >
        <PokemonType pokemonObject={pokemonObject} />
      </div>
      <div className="border mx-5 mt-4  border-gray-400"></div>

      <div className="flex text-2xl">
        <div
          id="pokestatlist"
          className="inline-flex w-1/2  mx-auto text-center justify-top flex-col border-r px-2"
        >
          <div className="mt-4">
            <PokemonStat pokemonObject={pokemonObject} />
          </div>

          <div
            id="pokeevlist"
            className="text-center justify-center border-t mt-4"
          >
            <div className="mt-4">
              <PokemonEv pokemonObject={pokemonObject} />
            </div>
          </div>
        </div>

        <div
          id="pokemovelist"
          className="inline-flex  w-1/2 text-center justify-top flex-col mx-2"
        >
          <form
            id="pokemovebutton"
            className="mt-4 mb-2 text-2xl justify-center"
          >
            <PokemonMoveButton />
          </form>
          <div id="pokemoves" className="mt-1">
            <div className="">
              <PokemonMoveShow pokemonObject={pokemonObject} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

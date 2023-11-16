import {
  getPokemon,
  getPokemonChineseName,
  getPokemonName,
  MAXID,
} from "@/lib/pokeapi";
import { PokemonImage } from "@/components/Pokemon/PokemonPage/pokemon-image";
import { PokemonStat } from "@/components/Pokemon/PokemonPage/pokemon-stat";
import { PokemonEv } from "@/components/Pokemon/PokemonPage/pokemon-ev";
import { PokemonType } from "@/components/Pokemon/PokemonPage/pokemon-type";
import { PokemonAbility } from "@/components/Pokemon/PokemonPage/pokemon-ability";
import { PokemonHW } from "@/components/Pokemon/PokemonPage/pokemon-height_weight";

import {
  PokemonMoveButton,
  PokemonMoveShow,
} from "@/components/Pokemon/PokemonPage/pokemon-move-show";
import Link from "next/link";
// http://localhost:3000/Pokemon/pikachu

function getTwoID(id: number) {
  let previousid: number = 0;
  let nextid: number = 0;
  if (id === 1) {
    previousid = parseInt(MAXID);
  } else {
    previousid = id - 1;
  }
  if (id >= parseInt(MAXID)) {
    nextid = 1;
  } else {
    nextid = id + 1;
  }
  return [previousid, nextid];
}
export default async function PokemonPage({
  params,
}: {
  params: { pokemonRouteName: string };
}) {
  const { pokemonRouteName } = params; // pikachu
  let pokemonObject: any;

  try {
    pokemonObject = await getPokemon(pokemonRouteName); // get the API data for pikachu
  } catch (error) {
    throw new Error("please enter a valid pokemon name or id!");
  }
  const pokemonid = pokemonObject.id;
  const pokemonname = pokemonObject.name;
  const [previousid, nextid] = getTwoID(pokemonid);
  const pokemonpreviousname = await getPokemonName(previousid);
  const pokemonnextname = await getPokemonName(nextid);
  const pokemonchinesename = await getPokemonChineseName(
    pokemonObject.species.url,
  );
  return (
    <>
      <div id="pokemonRouteName" className="grid grid-cols-3 mt-2 text-lg">
        <div className="text-left flex flex-row my-auto mr-auto  text-base pad:text-xl pad:font-medium">
          <Link
            href={"/pokemons/" + pokemonpreviousname}
            key={pokemonpreviousname}
          >
            ← {pokemonpreviousname}
          </Link>
        </div>
        <div className="font-bold text-center mx-auto text-2xl pc:text-3xl">
          <Link
            href={"https://wiki.52poke.com/wiki/" + pokemonname.split("-")[0]}
            target="_blank"
            key={pokemonname}
          >
            {pokemonObject.id}. {pokemonchinesename}
            <br />
            {pokemonname.charAt(0).toUpperCase() + pokemonname.slice(1)}
          </Link>
        </div>
        <div className="text-right flex flex-row-reverse my-auto ml-auto  text-base pad:text-xl pad:font-medium">
          <Link href={"/pokemons/" + pokemonnextname} key={pokemonnextname}>
            {pokemonnextname} →
          </Link>
        </div>
      </div>

      <div
        id="pokesplash"
        className="relative items-center justify-center  mx-auto w-[200px] h-[200px] pad:w-[275px] pad:h-[275px] pc:w-[350px] pc:h-[350px]"
      >
        <PokemonImage
          image={pokemonObject.sprites.other["official-artwork"].front_default}
          name={pokemonname}
        />
      </div>
      <div
        id="poketype"
        className="flex justify-center content-center mx-auto h-fit text-base pad:text-xl pc:text-xl"
      >
        <PokemonType pokemonObject={pokemonObject} />
      </div>
      <div className="border pc:mx-5 mt-4 border-gray-400"></div>

      <div className="pc:flex">
        <div
          id="pokestatlist"
          className="pc:inline-flex w-full pc:w-1/2 mx-auto text-center pc:justify-top flex-col pc:border-r px-2 text-lg pad:text-xl pc:text-xl"
        >
          <div className="pc:mt-4 w-full mt-2">
            <PokemonStat pokemonObject={pokemonObject} />
          </div>

          <div
            id="pokeevlist"
            className="text-center justify-center mt-4 mx-4  "
          >
            <div className="border border-gray-400 w-1/2 mx-auto "></div>
            <div className="mt-2 pc:mt-4 text-lg pad:text-xl pc:text-xl">
              <PokemonEv pokemonObject={pokemonObject} />
            </div>
          </div>

          <div
            id="pokeabilitylist"
            className="text-center justify-center mt-4 mx-4  "
          >
            <div className="border border-gray-400 w-1/2 mx-auto "></div>
            <div className="mt-2 pc:mt-4 text-lg pad:text-xl pc:text-xl">
              <PokemonAbility pokemonObject={pokemonObject} />
            </div>
          </div>
          <div
            id="pokehwlist"
            className="text-center justify-center mt-4 mx-4  "
          >
            <div className="border border-gray-400 w-1/2 mx-auto "></div>
            <div className="mt-2 pc:mt-4 text-lg pad:text-xl pc:text-xl">
              <PokemonHW pokemonObject={pokemonObject} />
            </div>
          </div>
        </div>

        <div className="border pc:mx-5 mt-4 border-gray-400 pc:hidden"></div>
        <div
          id="pokemovelist"
          className="pc:flex w-full pc:w-1/2 text-center pc:justify-top pc:flex-col mx-2 mt-4"
        >
          <form id="pokemovebutton " className="mb-2 justify-center">
            <PokemonMoveButton />
          </form>
          <PokemonMoveShow pokemonObject={pokemonObject} />
        </div>
      </div>
    </>
  );
}

import {
  getPokemon,
  getPokemonChineseName,
  getPokemonName,
} from "@/lib/pokeapi";
import { PokemonImage } from "@/components/pokemon-image";
import { PokemonStat } from "@/components/pokemon-stat";
import { PokemonEv } from "@/components/pokemon-ev";
import { PokemonType } from "@/components/pokemon-type";
import {
  PokemonMoveButton,
  PokemonMoveShow,
} from "@/components/pokemon-move-show";
import Link from "next/link";
// localhost:3000/pikachu

function getTwoID(id: number) {
  let previousid: number=0;
  let nextid: number=0;
  console.log("before",id, typeof id,id === 1,previousid,nextid,typeof global.g_maxid,global.g_maxid)
  if (id === 1) {
    previousid = global.g_maxid;
  } else {
    previousid = id - 1;
  }
  if (id >= global.g_maxid) {
    nextid = 1;
  } else {
    nextid = id + 1;
  }
  console.log("after",id, typeof id,id === 1,previousid,nextid)
  return [previousid, nextid];
}
export default async function PokemonPage({
  params,
}: {
  params: { pokemonRouteName: string };
}) {
  const { pokemonRouteName } = params; // pikachu
  const pokemonObject = await getPokemon(pokemonRouteName); // get the API data for pikachu
  const pokemonid = pokemonObject.id;
  const pokemonname = pokemonObject.name;
  const [previousid, nextid] = getTwoID(pokemonid);
  
  const pokemonpreviousname = await getPokemonName(previousid);
  const pokemonnextname = await getPokemonName(nextid);
  const pokemonchinesename = await getPokemonChineseName(
    pokemonObject.species.url
  );
  return (
    <>
      <div id="pokemonRouteName" className="grid grid-cols-3 mt-2 text-xl ">
        <div className="text-left flex flex-row my-auto mr-auto ">
          <Link href={"/" + pokemonpreviousname} key={pokemonpreviousname}>
            ← {pokemonpreviousname}
          </Link>
        </div>
        <div className="text-3xl font-bold text-center mx-auto">
          <Link
            href={"https://wiki.52poke.com/wiki/" + pokemonname}
            target="_blank"
            key={pokemonname}
          >
            {pokemonchinesename}
            <br></br>
            {pokemonname.charAt(0).toUpperCase() + pokemonname.slice(1)}
          </Link>
        </div>
        <div className="text-right flex flex-row-reverse my-auto ml-auto">
          <Link href={"/" + pokemonnextname} key={pokemonnextname}>
            {pokemonnextname} →
          </Link>
        </div>
      </div>

      <div
        id="pokesplash"
        className="relative items-center justify-center w-[400px] h-[400px] mx-auto"
      >
        <PokemonImage
          image={pokemonObject.sprites.other["official-artwork"].front_default}
          name={pokemonname}
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

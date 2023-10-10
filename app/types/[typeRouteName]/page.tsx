
import { getPokemonType } from "@/lib/pokeapi";
import { PokemonShowType } from "@/components/types/type-show";
import { TypeAsAttacker, TypeAsDefender } from "@/components/types/type-list";
import Link from "next/link";
// localhost:3000/types/normal

export default async function PokemonTypePage({
  params,
}: {
  params: { typeRouteName: string };
}) {
  const { typeRouteName } = params; // dragon //normal
  const allTypes: string[] = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    ""
  ];
  if (allTypes.includes(typeRouteName) === false) {
    throw new Error("please enter a valid type!");
  }
  const pokemonTypeObject = await getPokemonType(typeRouteName);
  const pokemonTypeChineseName = pokemonTypeObject.names.find(
    (nameInLang: any) => nameInLang.language.name === "zh-Hant"
  ).name;

  if (typeRouteName === "") {
    return(
      <>test</>
    )
    
  }
  return (
    <>
      <PokemonShowType typeRouteName={typeRouteName} pokemonTypeChineseName={pokemonTypeChineseName} />
      
      <TypeAsAttacker pokemonTypeObject={pokemonTypeObject} />
      <TypeAsDefender pokemonTypeObject={pokemonTypeObject} />
    </>
  );
}

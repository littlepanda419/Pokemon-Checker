import { getPokemonType } from "@/lib/pokeapi";
import {
  PokemonShowType,
  TypeAsAttacker,
  TypeAsDefender,
} from "@/components/Type/type-show";
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
    " ",
  ];
  if (allTypes.includes(typeRouteName.toLocaleLowerCase()) === false) {
    throw new Error("please enter a valid type!");
  }
  const pokemonTypeObject = await getPokemonType(typeRouteName);
  const pokemonTypeChineseName = pokemonTypeObject.names.find(
    (nameInLang: any) => nameInLang.language.name === "zh-Hant"
  ).name;
  return (
    <>
      <PokemonShowType
        typeRouteName={typeRouteName}
        pokemonTypeChineseName={pokemonTypeChineseName}
      />

      <TypeAsAttacker pokemonTypeObject={pokemonTypeObject} />
      <TypeAsDefender pokemonTypeObject={pokemonTypeObject} />
    </>
  );
}

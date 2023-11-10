
import Link from "next/link";
import {
  getPokemonAbilities,
} from "@/lib/pokeapi";

export default async function PokemonAbilityPage({
  params,
}: {
  params: { abilityRouteName: string };
}) {
  const { abilityRouteName } = params; 
  let pokemonAbilityObject:any;
  try {
    pokemonAbilityObject = await getPokemonAbilities(abilityRouteName); // get the API data for pikachu
  } catch (error) {
    throw new Error("please enter a valid pokemon name or id!");
  }
  console.log(pokemonAbilityObject)
  const abilityname:string =pokemonAbilityObject.name;
  const abilitynameC:string =pokemonAbilityObject.names.find(
    (item: any) => item.language.name === "zh-Hant"
  ).name;
  const abilityeffectC:string =pokemonAbilityObject.flavor_text_entries.find(
    (item: any) => item.language.name === "zh-Hant"
  ).flavor_text;
  
    return (
      <>
        <div>{abilityname}</div>
        <div>{abilitynameC}</div>
        <div>{abilityeffectC}</div>
      </>
    );
  }
  
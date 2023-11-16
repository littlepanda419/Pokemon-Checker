
import {
  getPokemonAbilitiesList,createApolloClient
} from "@/lib/pokeapi";
import {AbilityGrid} from "@/components/Ability/ability-grid";
import { gql } from "@apollo/client";

export default async function PokemonItemsPage({}: {}) {
  const pokemonAbilitiesList: Object[] = await getPokemonAbilitiesList();
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        pokemon_v2_abilityname(where: {pokemon_v2_language: {name: {_eq: "zh-Hant"}}}) {
          name
        }
      }
      
    `,
  });
  const pokemonchineseabilitieslist = data.pokemon_v2_abilityname;
  
    return (
      <>
        <AbilityGrid pokemonAbilitiesList={pokemonAbilitiesList} pokemonchineseabilitieslist={pokemonchineseabilitieslist}></AbilityGrid>
      </>
    );
  }
  
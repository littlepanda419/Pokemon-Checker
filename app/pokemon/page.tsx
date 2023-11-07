import { PokemonGrid } from "@/components/pokemon/pokemon-grid";
import {
  getPokemonList,
  getSpecialFormPokemon,
  createApolloClient,
} from "@/lib/pokeapi";
import { gql } from "@apollo/client";

export default async function Home() {
  // Load in data.
  const pokemonList: Object[] = await getPokemonList();
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        pokemon_v2_pokemonspeciesname(
          where: { pokemon_v2_language: { name: { _eq: "zh-Hant" } } }
        ) {
          name
        }
      }
    `,
  });
  const pokemonchinesenamelist = data.pokemon_v2_pokemonspeciesname;
  return (
    <>
      <PokemonGrid
        pokemonList={pokemonList}
        pokemonchinesenamelist={pokemonchinesenamelist}
        maxid={process.env.MAXID}
      />
    </>
  );
}

import { getPokemonMovesList, createApolloClient } from "@/lib/pokeapi";
import { MoveGrid } from "@/components/Move/move-grid";
import { gql } from "@apollo/client";

export default async function PokemonMovesPage({}: {}) {
  const pokemonMovesList: Object[] = await getPokemonMovesList();
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        pokemon_v2_movename(
          where: { pokemon_v2_language: { name: { _eq: "zh-Hant" } } }
        ) {
          name
        }
      }
    `,
  });
  const pokemonchinesemoveslist = data.pokemon_v2_movename;

  return (
    <>
      <MoveGrid
        pokemonMovesList={pokemonMovesList}
        pokemonchinesemoveslist={pokemonchinesemoveslist}
      ></MoveGrid>
    </>
  );
}

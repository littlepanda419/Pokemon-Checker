import { ApolloClient, InMemoryCache } from "@apollo/client";
const POKEMON_API = "https://pokeapi.co/api/v2/";
const POKEMON_GRAPH_API = "https://beta.pokeapi.co/graphql/v1beta";
export const MAXID: string = "1017";

export function createApolloClient() {
  return new ApolloClient({
    uri: POKEMON_GRAPH_API,
    cache: new InMemoryCache(),
  });
}

// getPokemonList -> Get the first 151 pokemon
export async function getPokemonList() {
  const response = await fetch(POKEMON_API + "pokemon?limit=10000&offset=0");
  const data = await response.json();
  for (let i = parseInt(MAXID) - 1; i < data.results.length; i++) {
    const id = data.results[i].url.split("/")[6];
    if (id >= 10000) {
      data.results.splice(i, 1);
      i--;
    }
  }
  return data.results;
}

export async function getSpecialFormPokemon() {
  const response = await fetch(POKEMON_API + "pokemon?limit=10000&offset=1015");
  const data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    const id = data.results[i].url.split("/")[6];
    if (id < 10000) {
      data.results.splice(i, 1);
      i--;
    }
  }
  return data.results;
}

// getPokemon -> given a string "pikachu", get the information of pikachu
export async function getPokemon(name: string) {
  // pokemon/ditto
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}


export async function getPokemonChineseName(url: string) {
  //https://pokeapi.co/api/v2/pokemon-species/1/
  const response = await fetch(url);
  const data = await response.json();
  const name = data.names.find(
    (item: any) => item.language.name === "zh-Hant",
  ).name;
  return name;
}

export async function getPokemonName(id: number) {
  const response = await fetch(POKEMON_API + "pokemon/" + id);
  const data = await response.json();
  const name = data.name;
  return name;
}

export async function getPokemonType(type: string) {
  //https://pokeapi.co/api/v2/type/normal
  const response = await fetch(POKEMON_API + "type/" + type);
  const data = await response.json();
  return data;
}

export async function getPokemonAbilitiesList() {
  const response = await fetch(POKEMON_API + "ability?offset=0&limit=999");
  const data = await response.json();
  return data.results;
}

export async function getPokemonAbilities(name: string) {
  const response = await fetch(POKEMON_API + "ability/" + name);
  const data = await response.json();
  return data;
}

export async function getPokemonMovesList() {
  const response = await fetch(POKEMON_API + "move?offset=0&limit=9999");
  const data = await response.json();
  return data.results;
}

export async function getPokemonMoves(name: string) {
  const response = await fetch(POKEMON_API + "move/" + name);
  const data = await response.json();
  return data;
}
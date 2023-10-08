"use client";
import { PokemonCard } from "@/components/pokemon-card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PokemonGridProps {
  pokemonList: any;
}
/*
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}*/

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");

  //console.log(pokemonList);
  // filter the text
  // {name: "pikachu", url:""}
  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  process.env.totalPokemon = pokemonList.length;
  process.env.maxid = parseInt(pokemonList[pokemonList.length - 1].url.split("/")[6]);
  // save the filtered array of objects
  console.log(process.env.totalPokemon);
  const filteredPokemonList = searchFilter(pokemonList);
  // show the filtered array to user
  return (
    <>
      <div className="justify-center content-centers max-w-xs mx-auto">
        <div className="items-center align-middle my-5 content-center ">
          <Label htmlFor="pokemonName">Pokemon Name</Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Pokemon Name Filter"
            onChange={(e) => setSearchText(e.target.value)}
            className="text-black text-left"
          />
        </div>
      </div>
      <h3 className="text-3xl text-center my-3 mx-auto">Pokédex</h3>
      <div className="mx-20 border-t border-white  flex-auto my-5"></div>

      <div className="mx-20 grid text-center lg:grid-cols-3 lg:text-center">
        {filteredPokemonList.map((pokemon: any) => {
          return (
            <PokemonCard name={pokemon.name} key={pokemon.name + "Card"} />
          );
        })}
      </div>
    </>
  );
}

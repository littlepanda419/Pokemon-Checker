"use client";
import { PokemonCard } from "@/components/pokemon-card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PokemonGridProps {
  pokemonList: any;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");

  //console.log(pokemonList);
  // filter the text
  // {name: "pikachu", url:""}

  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  // save the filtered array of objects
  const filteredPokemonList = searchFilter(pokemonList);
  // show the filtered array to user
  return (
    <>
      <div className="justify-center content-centers max-w-sm mx-auto">
        <div className="items-center align-middle my-5 content-center ">
          <Label htmlFor="pokemonName">Pokemon Name</Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Pokemon Name Filter"
            onChange={(e) => setSearchText(e.target.value)}
            className="text-black text-left phone:w-full"
          />
        </div>
      </div>
      <div className="text-xl text-center my-3 mx-auto pad:text-2xl  pc:text-3xl">
        Pokédex
      </div>
      <div className="mx-5 border-t border-white flex-auto my-2 pad:mx-10 pc:mx-20"></div>

      <div className="mx-5 grid text-center grid-cols-2  pad:grid-cols-3 pad:mx-10 pc:mx-20">
        {filteredPokemonList.map((pokemon: any) => {
          return (
            <PokemonCard name={pokemon.name} key={pokemon.name + "Card"} />
          );
        })}
      </div>
    </>
  );
}

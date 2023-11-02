"use client";
import { PokemonCard } from "@/components/pokemon/pokemon-card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PokemonGridProps = {
  pokemonList: Object[];
  pokemonchinesenamelist: Object[];
};
type combinedList = {
  name: string;
  nameC: string;
  url: string;
  id: string;
};

export function PokemonGrid({
  pokemonList,
  pokemonchinesenamelist,
}: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [g1, sg1] = useState(1);
  const [g2, sg2] = useState(151);

  //console.log(pokemonList);
  // filter the text
  // {name: "pikachu", url:""}
  let combinedList: combinedList[] = [];
  combinedList = pokemonList.map((pokemon: any) => {
    return {
      name: pokemon.name,
      nameC: "",
      url: pokemon.url,
      id: pokemon.url.split("/")[6],
    };
  });

  const searchFilter = (combinedList: Object[]) => {
    return combinedList.filter(
      (pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase()) ||
        pokemon.nameC.includes(searchText) ||
        pokemon.id.includes(searchText)
    );
  };

  pokemonchinesenamelist.map((pokemonC: any, index: number) => {
    combinedList[index].nameC = pokemonC.name;
  });
  // save the filtered array of objects
  let filteredPokemonList = searchFilter(combinedList);
  console.log(filteredPokemonList[0])
  // show the filtered array to user
  function setGenSelect(gen1: number, gen2: number) {
    setSearchText("");
    sg1(gen1);
    sg2(gen2);
  }
  function setChecker(ch:string) {
    setSearchText(ch);
    console.log(ch)
    sg1(1);
    sg2(1017);
    console.log(g1,g2)
  }
  return (
    <>
      <div className="justify-center content-centers max-w-sm mx-auto">
        <div className="items-center align-middle my-5 content-center ">
          <Label htmlFor="pokemonSearcher">Pokemon Name / ID</Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonSearcher"
            placeholder="Pokemon Search"
            onChange={(e) => setChecker(e.target.value)}
            className="text-black text-left phone:w-full"
          />
        </div>
      </div>
      <div className="mx-5 grid text-center grid-cols-3 pad:grid-cols-5 pad:mx-10 pc:mx-20">
        <button onClick={() => setGenSelect(1, 151)}>第一世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第二世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第三世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第四世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第五世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第六世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第七世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第八世代</button>
        <button onClick={() => setGenSelect(152, 251)}>第九世代</button>
      </div>
      <div className="mx-5 border-t border-white flex-auto my-2 pad:mx-10 pc:mx-20"></div>

      <div className="mx-5 grid text-center grid-cols-2 pad:grid-cols-3 pad:mx-10 pc:mx-20">
        {filteredPokemonList
          .filter((item, idx) => idx >= g1 - 1 && idx < g2)
          .map((pokemon: any, index: number) => {
            return (
              <PokemonCard
                name={pokemon.name}
                key={pokemon.name + "Card"}
                nameC={pokemon.nameC}
                id={pokemon.id}
              />
            );
          })}
      </div>
    </>
  );
}

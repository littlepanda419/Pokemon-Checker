"use client";
import { MoveCard } from "@/components/Move/move-card";
import { useState, useEffect } from "react";
import { Label } from "@/lib/label";
import { Input } from "@/lib/input";

type MoveMoveGridProps = {
  pokemonMovesList: Object[];
  pokemonchinesemoveslist: Object[];
};
type combinedList = {
  name: string;
  nameC: string;
  url: string;
};
export function MoveGrid({
  pokemonMovesList,
  pokemonchinesemoveslist,
}: MoveMoveGridProps) {
  const [searchText, setSearchText] = useState("");
  const [filteredMoveList, setFilteredMoveList] = useState<
    combinedList[]
  >([]);
  let combinedlist: combinedList[] = [];

  combinedlist = pokemonMovesList.map((pokemon: any) => {
    return {
      name: pokemon.name,
      nameC: "",
      url: pokemon.url,
    };
  });
  pokemonchinesemoveslist.map((abilitiesC: any, index: number) => {
    combinedlist[index].nameC = abilitiesC.name;
  });

  const searchFilter = (combinedlist: combinedList[]) => {
    console.log(combinedlist);
    return combinedlist.filter(
      (move: combinedList) =>
        move.name.toLowerCase().includes(searchText.toLowerCase()) ||
        move.nameC.includes(searchText)
    );
  };

  useEffect(() => {
    setFilteredMoveList(searchFilter(combinedlist));
  }, [searchText]);
  function makeSearch(search: string) {
    setSearchText(search);
  }

  return (
    <>
      <div className="justify-center content-centers max-w-sm mx-auto">
        <div className="items-center align-middle my-5 content-center ">
          <Label htmlFor="moveSearcher">move Name </Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="moveSearcher"
            placeholder="move Search"
            onChange={(e) => makeSearch(e.target.value)}
            className="text-black text-left phone:w-full"
          />
        </div>
      </div>
      <div className="text-xl text-center my-3 mx-auto pad:text-2xl pc:text-3xl">
        Abilities
      </div>
      <div className="mx-5 border-t border-white flex-auto my-2 pad:mx-10 pc:mx-20"></div>

      <div className="mx-5 grid text-center grid-cols-2 pad:grid-cols-3 pad:mx-10 pc:mx-20">
        {filteredMoveList.map((move: any, index: number) => {
          return (
            <MoveCard
              name={move.name}
              key={move.name + "Card"}
              nameC={move.nameC}
            />
          );
        })}
      </div>
    </>
  );
}

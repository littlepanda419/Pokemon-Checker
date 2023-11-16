"use client";
import { AbilityCard } from "@/components/Ability/ability-card";
import { useState, useEffect } from "react";
import { Label } from "@/lib/label";
import { Input } from "@/lib/input";

type AbilityAbilityGridProps = {
  pokemonAbilitiesList: Object[];
  pokemonchineseabilitieslist: Object[];
};
type combinedList = {
  name: string;
  nameC: string;
  url: string;
};
export function AbilityGrid({
  pokemonAbilitiesList,
  pokemonchineseabilitieslist,
}: AbilityAbilityGridProps) {
  const [searchText, setSearchText] = useState("");
  const [filteredAbilityList, setFilteredAbilityList] = useState<
    combinedList[]
  >([]);
  let combinedlist: combinedList[] = [];

  combinedlist = pokemonAbilitiesList.map((pokemon: any) => {
    return {
      name: pokemon.name,
      nameC: "",
      url: pokemon.url,
    };
  });
  pokemonchineseabilitieslist.map((abilitiesC: any, index: number) => {
    combinedlist[index].nameC = abilitiesC.name;
  });

  const searchFilter = (combinedlist: combinedList[]) => {
    console.log(combinedlist);
    return combinedlist.filter(
      (ability: combinedList) =>
        ability.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ability.nameC.includes(searchText)
    );
  };

  useEffect(() => {
    setFilteredAbilityList(searchFilter(combinedlist));
  }, [searchText]);
  function makeSearch(search: string) {
    setSearchText(search);
  }

  return (
    <>
      <div className="justify-center content-centers max-w-sm mx-auto">
        <div className="items-center align-middle my-5 content-center ">
          <Label htmlFor="abilitySearcher">ability Name </Label>
          <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="abilitySearcher"
            placeholder="ability Search"
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
        {filteredAbilityList.map((ability: any, index: number) => {
          return (
            <AbilityCard
              name={ability.name}
              key={ability.name + "Card"}
              nameC={ability.nameC}
            />
          );
        })}
      </div>
    </>
  );
}

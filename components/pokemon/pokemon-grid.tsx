"use client";
import { PokemonCard } from "@/components/pokemon/pokemon-card";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PokemonGridProps = {
  pokemonList: Object[];
  pokemonchinesenamelist: Object[];
  maxid: string;
};
type combinedList = {
  name: string;
  nameC: string;
  url: string;
  id: string;
};

const pokemonGenerations: { [key: number]: number } = {
  2: 101,
  3: 136,
  4: 107,
  5: 156,
  6: 72,
  7: 88,
  8: 96,
  9: 112,
};

export function PokemonGrid({
  pokemonList,
  pokemonchinesenamelist,
  maxid,
}: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState<
    combinedList[]
  >([]);
  let combinedlist: combinedList[] = [];

  combinedlist = pokemonList.map((pokemon: any) => {
    return {
      name: pokemon.name,
      nameC: "",
      url: pokemon.url,
      id: pokemon.url.split("/")[6],
    };
  });
  pokemonchinesenamelist.map((pokemonC: any, index: number) => {
    combinedlist[index].nameC = pokemonC.name;
  });

  const searchFilter = (combinedlist: combinedList[]) => {
    return combinedlist.filter(
      (pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase()) ||
        pokemon.nameC.includes(searchText) ||
        pokemon.id.includes(searchText)
    );
  };
  useEffect(() => {
    setFilteredPokemonList(searchFilter(combinedlist));
  }, [searchText]);
  function makeSearch(search: string) {
    setSearchText(search);
  }
  /*infinity scroll */
  const [loading, setLoading] = useState(false);
  const [endDex, setEndDex] = useState(151);
  let gen = 1;
  let nowHeight = 0;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setEndDex(endDex + pokemonGenerations[gen]);
      gen++;
      console.log(gen);
      setLoading(false);
      requestAnimationFrame(() => {
        window.scrollTo({
          top: nowHeight,
          behavior: "auto",
        });
      });
    }, 10);
  };

  const handleScroll = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    console.log(scrolled, scrollable);
    if (scrolled + 1 >= scrollable && scrollable !=0) {
      if (!loading && gen < 9) {
        setLoading(true);
        loadMore();
        nowHeight = scrolled;
        console.log(nowHeight);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            onChange={(e) => makeSearch(e.target.value)}
            className="text-black text-left phone:w-full"
          />
        </div>
      </div>
      <div className="text-xl text-center my-3 mx-auto pad:text-2xl  pc:text-3xl">
        Pokédex
      </div>
      <div className="mx-5 border-t border-white flex-auto my-2 pad:mx-10 pc:mx-20"></div>

      <div className="mx-5 grid text-center grid-cols-2 pad:grid-cols-3 pad:mx-10 pc:mx-20">
        {filteredPokemonList
          .filter((item, idx) => idx >= 0 && idx < endDex)
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

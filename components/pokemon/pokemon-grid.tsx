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
  2: 100,
  3: 135,
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
  let showuntil = 151;

  const loadMore = () => {
    setLoading(true);
    let scrolled = window.scrollY;
    setTimeout(() => {
      gen += 1;
      showuntil += pokemonGenerations[gen];
      if (showuntil > parseInt(maxid)) {
        showuntil = parseInt(maxid);
      }
      setEndDex(showuntil);
      window.scrollTo({
        top: scrolled - 1.5,
        behavior: "auto",
      });
      setLoading(false);
    }, 100);
  };
  function throttle<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let isThrottled = false;
    let lastArgs: Parameters<T> | null = null;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      if (!isThrottled) {
        func.apply(this, args);
        isThrottled = true;

        setTimeout(() => {
          isThrottled = false;
          if (lastArgs) {
            // If there are saved arguments, call the function again
            func.apply(this, lastArgs);
            lastArgs = null;
          }
        }, delay);
      } else {
        // Save the most recent arguments to be called later
        lastArgs = args;
      }
    };
  }

  const throttledHandleScroll = throttle(() => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = window.scrollY;
    if (scrolled + 1 >= scrollable) {
      if (!loading && gen < 9) {
        setLoading(true);
        loadMore();
      }
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
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

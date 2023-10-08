"use client";
import React, { useState, useId, useEffect } from "react";
import { useBetween } from "use-between";
import { PokemonMovebylevel } from "@/components/move/pokemon-movebylevel";
import { PokemonMovebymachine } from "@/components/move/pokemon-movebymachine";
type PokemonStatProps = {
  pokemonObject: any;
};

const useShareableState = () => {
  const [moveshow, setmoveshow] = useState("lvl");
  return {
    moveshow,
    setmoveshow,
  };
};
export function PokemonMoveButton() {
  if (process.env.NODE_ENV === "development") {
    //make sure defaultchecked for radio input works fine (moveschoosebtn)
    useEffect(() => {
      document.querySelectorAll("input[type=radio]").forEach((elem) => {
        if (elem.hasAttribute("checked")) {
          (elem as HTMLInputElement).checked = true;
        }
      });
    }, []);
  }

  const { moveshow, setmoveshow } = useBetween(useShareableState);
  const handlechange = () => {
    if (moveshow === "lvl") {
      setmoveshow("machine");
    } else {
      setmoveshow("lvl");
    }
  };

  return (
    <>
      <label className="px-4 py-2 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:text-white rounded-l-2xl border-r border-white ">
        <input
          className="hidden"
          type="radio"
          name="movebtn"
          value="lvl"
          id="lvl"
          defaultChecked={true}
          onChange={handlechange}
        />
        Level-up
      </label>
      <label className="px-4 py-2 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:text-white rounded-r-2xl border-l border-white ">
        <input
          className="hidden"
          type="radio"
          name="movebtn"
          id="machine"
          value="machine"
          onChange={handlechange}
        />
        Machine
      </label>
    </>
  );
}
export function PokemonMoveShow({ pokemonObject }: PokemonStatProps) {
  const { moveshow, setmoveshow } = useBetween(useShareableState);
  if (moveshow === "lvl") {
    return (
      <div className="inline-flex flex-col w-full">
        <PokemonMovebylevel pokemonObject={pokemonObject} />
      </div>
    );
  }
  return (
    <div className="inline-flex flex-col w-full">
      <PokemonMovebymachine pokemonObject={pokemonObject} />
    </div>
  );
}

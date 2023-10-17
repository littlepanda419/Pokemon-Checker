"use client";
import React, { useState, useMemo, useEffect } from "react";
type TypeProps = {
  move: string;
  type1: string;
  type2: string;
  k: number;
};
type FunctionPropMove = {
  setM: Function;
  k: number;
};

type TypeTT = {
  [key: string]: {
    name: string;
    multiplier: number;
  };
};

const allTypes: string[] = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

export function DoubleTypeSelect({ setM, k }: FunctionPropMove) {
  return (
    <form className="mx-auto text-center my-5">
      <label htmlFor="type" className="text-xl pad:text-2xl ">
        Move Type: <br />
      </label>
      <select
        id={"typesele"}
        key={"typesele" + k}
        name={"typesele" + k}
        className="text-black overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%]"
        defaultValue="-"
        onChange={(e) => {
          {
            setM(e.target.value);
          }
        }}
      >
        {allTypes.map((type: string) => (
          <option
            value={type}
            key={type + k}
            id={"type" + type}
            className="text-white"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
        <option value="-" key={k + "-"} id="type-" className="text-white">
          -
        </option>
      </select>
    </form>
  );
}

export function DoubleType({ setM, k }: FunctionPropMove) {
  return (
    <>
      <label htmlFor="type1" className="text-xl pad:text-2xl">
        Type1: <br />
      </label>
      <select
        id={"typesele" + k}
        name={"typesele" + k}
        key={"typesele" + k}
        className="text-black overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%]"
        defaultValue="normal"
        onChange={(e) => {
          setM(e.target.value);
        }}
      >
        {allTypes.map((type: string) => (
          <option
            value={type}
            key={type + k}
            id={"type" + type}
            className="text-white"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
}
export function DoubleTypeTableShow({ move, type1, type2, k }: TypeProps) {
  if (move === "none") {
    return (
      <th
        className="border-2 p-2 w-full"
        key={move + "type" + k}
        id={move + "type" + k}
      >
        -
      </th>
    );
  }
  let finalmultiplier = 5;
  return (
    <th
      className="border-2 p-2 w-full"
      key={move + "type" + k}
      id={move + "type" + k}
    >
      {finalmultiplier}x
    </th>
  );
}
export function TypeFinalCheck(type1: any, type2: any) {
  let TypeMultiDictionary: TypeTT = {
    normal: {
      name: "normal",
      multiplier: 1,
    },
    fighting: {
      name: "fighting",
      multiplier: 1,
    },
    poison: {
      name: "poison",
      multiplier: 1,
    },
    ground: {
      name: "ground",
      multiplier: 1,
    },
    rock: {
      name: "rock",
      multiplier: 1,
    },
    bug: {
      name: "bug",
      multiplier: 1,
    },
    ghost: {
      name: "ghost",
      multiplier: 1,
    },
    steel: {
      name: "steel",
      multiplier: 1,
    },
    fire: {
      name: "fire",
      multiplier: 1,
    },
    water: {
      name: "water",
      multiplier: 1,
    },
    grass: {
      name: "grass",
      multiplier: 1,
    },
    electric: {
      name: "electric",
      multiplier: 1,
    },
    psychic: {
      name: "psychic",
      multiplier: 1,
    },
    ice: {
      name: "ice",
      multiplier: 1,
    },
    dragon: {
      name: "dragon",
      multiplier: 1,
    },
    dark: {
      name: "dark",
      multiplier: 1,
    },
    fairy: {
      name: "fairy",
      multiplier: 1,
    },
  };
  console.log(type1.damage_relations);
  console.log(type2.damage_relations);
  type1.damage_relations.double_damage_from.map((doubleDamagefrom: any) => {
    TypeMultiDictionary[doubleDamagefrom.name].multiplier *= 2;
  });

  type1.damage_relations.half_damage_from.map((halfDamagefrom: any) => {
    TypeMultiDictionary[halfDamagefrom.name].multiplier *= 0.5;
  });

  type1.damage_relations.no_damage_from.map((noDamagefrom: any) => {
    TypeMultiDictionary[noDamagefrom.name].multiplier *= 0;
  });

  if (type2 !== type1) {
    type2.damage_relations.double_damage_from.map((doubleDamagefrom: any) => {
      TypeMultiDictionary[doubleDamagefrom.name].multiplier *= 2;
    });

    type2.damage_relations.half_damage_from.map((halfDamagefrom: any) => {
      TypeMultiDictionary[halfDamagefrom.name].multiplier *= 0.5;
    });

    type2.damage_relations.no_damage_from.map((noDamagefrom: any) => {
      TypeMultiDictionary[noDamagefrom.name].multiplier *= 0;
    });
  }

  console.log("TypeMultiDictionary", TypeMultiDictionary);
  return TypeMultiDictionary;
}

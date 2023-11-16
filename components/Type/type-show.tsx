"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { normalize } from "path";

type PokemonTypeProps = {
  typeRouteName: string;
  pokemonTypeChineseName: string;
};

type PokemonTypePropsFinder = {
  pokemonTypeObject: any;
};

const allTypes: string[] = [
  "Normal",
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
const colors: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export function PokemonShowType({
  typeRouteName,
  pokemonTypeChineseName,
}: PokemonTypeProps) {
  const colorrgb = colors[typeRouteName];

  return (
    <>
      <form className="mx-auto text-center my-5 ">
        <label htmlFor="type" className="text-xl pad:text-2xl">
          Type Checker: &nbsp;
        </label>
        <select
          id="typesele"
          name="typesele"
          className={`overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%] bg-transparent p-1 border-2 border-[${colorrgb}] text-[${colorrgb}]`}
          defaultValue={typeRouteName}
          onChange={(e) => {
            window.location.href = e.target.value.toLowerCase();
          }}
        >
          {allTypes.map((type: string) => (
            <option
              value={type}
              key={type}
              id={"type" + type}
              className="text-white"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </form>
      <div
        className="text-center mx-auto w-fit text-2xl pad:text-3xl rounded-full py-2 px-3 pad:py-4 pad:px-6 my-3"
        id={"type" + typeRouteName}
      >
        {typeRouteName.charAt(0).toUpperCase() + typeRouteName.slice(1)}
        <br />
        {pokemonTypeChineseName}
      </div>
    </>
  );
}

export function TypeAsAttacker({ pokemonTypeObject }: PokemonTypePropsFinder) {
  return (
    <>
      <table id="typeTable" className="text-center mx-auto w-[75%] pad:w-[90%]">
        <caption className="text-xl pad:text-2xl my-2">
          Dealt damage to:
        </caption>
        <thead className="hidden pad:table-header-group pad:border-2 ">
          <tr>
            {pokemonTypeObject.damage_relations.double_damage_to.map(
              (doubleDamageto: any) => (
                <th
                  id={"type" + doubleDamageto.name}
                  key={doubleDamageto.name}
                  className="w-1/3 pad:w-[80px] text-xl "
                >
                  <Link href={doubleDamageto.name} className="text-xl">
                    {doubleDamageto.name.charAt(0).toUpperCase() +
                      doubleDamageto.name.slice(1)}
                  </Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.half_damage_to.map(
              (halfDamageto: any) => (
                <th
                  id={"type" + halfDamageto.name}
                  key={halfDamageto.name}
                  className="w-1/3 pad:w-[80px] text-xl "
                >
                  <Link href={halfDamageto.name}>
                    {halfDamageto.name.charAt(0).toUpperCase() +
                      halfDamageto.name.slice(1)}
                  </Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.no_damage_to.map(
              (noDamageto: any) => (
                <th
                  id={"type" + noDamageto.name}
                  key={noDamageto.name}
                  className="w-1/3 pad:w-[80px] text-xl "
                >
                  <Link href={noDamageto.name}>
                    {noDamageto.name.charAt(0).toUpperCase() +
                      noDamageto.name.slice(1)}
                  </Link>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="">
          <tr>
            {pokemonTypeObject.damage_relations.double_damage_to.map(
              (doubleDamageto: any) => (
                <td
                  id={doubleDamageto.name + "dmg"}
                  key={doubleDamageto.name + "dmg"}
                  data-label={
                    doubleDamageto.name.charAt(0).toUpperCase() +
                    doubleDamageto.name.slice(1)
                  }
                  className="border-t-2 pad:border-2 text-blue-300 text-2xl"
                >
                  2x
                </td>
              )
            )}

            {pokemonTypeObject.damage_relations.half_damage_to.map(
              (halfDamageto: any) => (
                <td
                  id={halfDamageto.name + "dmg"}
                  key={halfDamageto.name + "dmg"}
                  data-label={
                    halfDamageto.name.charAt(0).toUpperCase() +
                    halfDamageto.name.slice(1)
                  }
                  className="border-t-2 pad:border-2 text-amber-300 text-2xl"
                >
                  1/2x
                </td>
              )
            )}

            {pokemonTypeObject.damage_relations.no_damage_to.map(
              (noDamageto: any) => (
                <td
                  id={noDamageto.name + "dmg"}
                  key={noDamageto.name + "dmg"}
                  data-label={
                    noDamageto.name.charAt(0).toUpperCase() +
                    noDamageto.name.slice(1)
                  }
                  className=" border-t-2 pad:border-2 text-red-500 text-2xl"
                >
                  0x
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export function TypeAsDefender({ pokemonTypeObject }: PokemonTypePropsFinder) {
  return (
    <>
      <div className="border-2 border-blue-400 w-2/3 mx-auto my-5 pad:border-0 pad:my-8"></div>
      <table id="typeTable" className="text-center mx-auto w-[75%] pad:w-[90%]">
        <caption className="text-xl pad:text-2xl my-2">
          Take damage from:
        </caption>
        <thead className="hidden pad:table-header-group pad:border-2">
          <tr>
            {pokemonTypeObject.damage_relations.double_damage_from.map(
              (doubleDamagefrom: any) => (
                <th
                  id={"type" + doubleDamagefrom.name}
                  key={doubleDamagefrom.name}
                  className="w-1/3 pad:w-[80px] text-xl "
                >
                  <Link href={doubleDamagefrom.name} className="text-xl">
                    {doubleDamagefrom.name.charAt(0).toUpperCase() +
                      doubleDamagefrom.name.slice(1)}
                  </Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.half_damage_from.map(
              (halfDamagefrom: any) => (
                <th
                  id={"type" + halfDamagefrom.name}
                  key={halfDamagefrom.name}
                  className="w-1/3 pad:w-[80px] text-xl "
                >
                  <Link href={halfDamagefrom.name}>
                    {halfDamagefrom.name.charAt(0).toUpperCase() +
                      halfDamagefrom.name.slice(1)}
                  </Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.no_damage_from.map(
              (noDamagefrom: any) => (
                <th
                  id={"type" + noDamagefrom.name}
                  key={noDamagefrom.name}
                  className="w-1/3 pad:w-[80px] text-xl "
                >
                  <Link href={noDamagefrom.name}>
                    {noDamagefrom.name.charAt(0).toUpperCase() +
                      noDamagefrom.name.slice(1)}
                  </Link>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="">
          <tr>
            {pokemonTypeObject.damage_relations.double_damage_from.map(
              (doubleDamagefrom: any) => (
                <td
                  id={doubleDamagefrom.name + "dmg"}
                  key={doubleDamagefrom.name + "dmg"}
                  data-label={
                    doubleDamagefrom.name.charAt(0).toUpperCase() +
                    doubleDamagefrom.name.slice(1)
                  }
                  className="border-t-2 pad:border-2 text-red-500 text-2xl"
                >
                  2x
                </td>
              )
            )}

            {pokemonTypeObject.damage_relations.half_damage_from.map(
              (halfDamagefrom: any) => (
                <td
                  id={halfDamagefrom.name + "dmg"}
                  key={halfDamagefrom.name + "dmg"}
                  data-label={
                    halfDamagefrom.name.charAt(0).toUpperCase() +
                    halfDamagefrom.name.slice(1)
                  }
                  className="border-t-2 pad:border-2 text-amber-300 text-2xl"
                >
                  1/2x
                </td>
              )
            )}

            {pokemonTypeObject.damage_relations.no_damage_from.map(
              (noDamagefrom: any) => (
                <td
                  id={noDamagefrom.name + "dmg"}
                  key={noDamagefrom.name + "dmg"}
                  data-label={
                    noDamagefrom.name.charAt(0).toUpperCase() +
                    noDamagefrom.name.slice(1)
                  }
                  className=" border-t-2 pad:border-2 text-blue-300 text-2xl"
                >
                  0x
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

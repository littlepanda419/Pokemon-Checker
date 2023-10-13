import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
type PokemonTypeProps = {
  pokemonTypeObject: any;
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

export function TypeAsAttacker({ pokemonTypeObject }: PokemonTypeProps) {
  return (
    <>
      <table id="typeTable" className="text-center mx-auto w-[75%] pad:w-[90%]">
        <caption className="text-xl pad:text-2xl my-2">
          As a Attacker to:
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
              ),
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
              ),
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
              ),
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
              ),
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
              ),
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
              ),
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export function TypeAsDefender({ pokemonTypeObject }: PokemonTypeProps) {
  return (
    <>
      <div className="border-2 border-blue-400 w-2/3 mx-auto my-5 pad:border-0 pad:my-8"></div>
      <table id="typeTable" className="text-center mx-auto w-[75%] pad:w-[90%]">
        <caption className="text-xl pad:text-2xl my-2">
          As a Defender Against:
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
              ),
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
              ),
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
              ),
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
              ),
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
              ),
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
              ),
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

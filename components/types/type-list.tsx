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
      <table id="typeTable" className="text-center mx-auto w-1/2 pad:w-4/5">
        <caption>As Attacker:</caption>
        <thead className="hidden pad:table-header-group pad:border-2">
          <tr>
            {pokemonTypeObject.damage_relations.double_damage_to.map(
              (doubleDamageto: any) => (
                <th
                  id={"type" + doubleDamageto.name}
                  key={doubleDamageto.name}
                  className="w-1/3 pad:w-[80px]"
                >
                  <Link href={doubleDamageto.name}>{doubleDamageto.name}</Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.half_damage_to.map(
              (halfDamageto: any) => (
                <th
                  id={"type" + halfDamageto.name}
                  key={halfDamageto.name}
                  className="w-1/3 pad:w-[80px]"
                >
                  <Link href={halfDamageto.name}>{halfDamageto.name}</Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.no_damage_to.map(
              (noDamageto: any) => (
                <th
                  id={"type" + noDamageto.name}
                  key={noDamageto.name}
                  className="w-1/3 pad:w-[80px]"
                >
                  <Link href={noDamageto.name}>{noDamageto.name}</Link>
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
                  data-label={doubleDamageto.name}
                  className="border-t-2 pad:border-2 text-blue-300"
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
                  data-label={halfDamageto.name}
                  className="border-t-2 pad:border-2 text-amber-300"
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
                  data-label={noDamageto.name}
                  className=" border-t-2 pad:border-2 text-red-500 "
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

export function TypeAsDefender({ pokemonTypeObject }: PokemonTypeProps) {
  return (
    <>
      <table id="typeTable" className="text-center mx-auto w-1/2 pad:w-4/5">
        <caption>As Defender:</caption>
        <thead className="hidden pad:table-header-group pad:border-2">
          <tr>
            {pokemonTypeObject.damage_relations.double_damage_from.map(
              (doubleDamagefrom: any) => (
                <th
                  id={"type" + doubleDamagefrom.name}
                  key={doubleDamagefrom.name}
                  className="w-1/3 pad:w-[80px]"
                >
                  <Link href={doubleDamagefrom.name}>
                    {doubleDamagefrom.name}
                  </Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.half_damage_from.map(
              (halfDamagefrom: any) => (
                <th
                  id={"type" + halfDamagefrom.name}
                  key={halfDamagefrom.name}
                  className="w-1/3 pad:w-[80px]"
                >
                  <Link href={halfDamagefrom.name}>{halfDamagefrom.name}</Link>
                </th>
              )
            )}
            {pokemonTypeObject.damage_relations.no_damage_from.map(
              (noDamagefrom: any) => (
                <th
                  id={"type" + noDamagefrom.name}
                  key={noDamagefrom.name}
                  className="w-1/3 pad:w-[80px]"
                >
                  <Link href={noDamagefrom.name}>{noDamagefrom.name}</Link>
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
                  data-label={doubleDamagefrom.name}
                  className="border-t-2 pad:border-2 text-red-500"
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
                  data-label={halfDamagefrom.name}
                  className="border-t-2 pad:border-2 text-amber-300"
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
                  data-label={noDamagefrom.name}
                  className=" border-t-2 pad:border-2 text-blue-300 "
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

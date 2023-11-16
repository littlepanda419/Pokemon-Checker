"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
type PokemonStatProps = {
  pokemonObject: any;
};

export function PokemonAbility({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      <table className=" text-center mx-auto text-xl pc:text-xl mt-5 w-fit">
        <caption>Abilities:</caption>
        <thead>
          <tr>
            <th className="p-2">Ability name</th>
            <th className="p-2">Is hidden ability?</th>
          </tr>
        </thead>
        <tbody>
          {pokemonObject.abilities.map((abilityOBj: any) => {
            return (
              <tr key={abilityOBj.ability.name}>
                <th className="px-2 py-1">
                  <Link
                    href={`../abilities/${abilityOBj.ability.name}`}
                    key={abilityOBj.ability.name}
                  >
                    {abilityOBj.ability.name}
                  </Link>
                </th>
                <th className="">{abilityOBj.is_hidden ? "o" : "x"}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

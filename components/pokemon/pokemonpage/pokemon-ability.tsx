"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
type PokemonStatProps = {
  pokemonObject: any;
};

export function PokemonAbility({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      <table className="border-2 text-center mx-auto text-xl pc:text-xl mt-5 w-fit">
        <caption>Abilities:</caption>
        <thead>
          <tr>
            <th className="border-2 p-2">Ability name</th>
            <th className="border-2 p-2">Is hidden ability?</th>
          </tr>
        </thead>
        <tbody>
          {pokemonObject.abilities.map((abilityOBj: any) => {
            return (
              <tr key={abilityOBj.ability.name}>
                <th className="border-2 px-2 py-1">
                  <Link
                    href={`../abilities/${abilityOBj.ability.name}`}
                    key={abilityOBj.ability.name}
                  >
                    {abilityOBj.ability.name}
                  </Link>
                </th>
                <th className="border-2">{abilityOBj.is_hidden ? "o" : "x"}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

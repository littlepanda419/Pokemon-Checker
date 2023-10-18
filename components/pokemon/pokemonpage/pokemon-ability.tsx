"use client";
import React, { useState, useMemo, useEffect } from "react";
type PokemonStatProps = {
  pokemonObject: any;
};

export function PokemonAbility({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      Abilities:
      {pokemonObject.abilities.map((abilityOBj: any) => {
        if (abilityOBj.is_hidden) {
          return (
            <div key={abilityOBj.ability.name}>
              Hidden Abilities:<br/>{abilityOBj.ability.name}
            </div>
          );
        }

        return (
          <div key={abilityOBj.ability.name}>{abilityOBj.ability.name}</div>
        );
      })}
    </>
  );
}

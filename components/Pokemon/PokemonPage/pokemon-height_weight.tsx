"use client";
import React, { useState, useMemo, useEffect } from "react";
type PokemonStatProps = {
  pokemonObject: any;
};

export function PokemonHW({ pokemonObject }: PokemonStatProps) {
  return (
    <div className="mx-auto w-fit text-justify">
      Height: {pokemonObject.height / 10} m <br />
      Weight: {pokemonObject.weight / 10} kg
    </div>
  );
}

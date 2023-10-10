"use client";
import { TypeAsAttacker, TypeAsDefender } from "@/components/types/type-list";
type PokemonTypeProps = {
  typeRouteName: string,
  pokemonTypeChineseName: string,
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

export function PokemonShowType(
  {typeRouteName,pokemonTypeChineseName }: PokemonTypeProps,
) {
  return (
    <>
      <form className="mx-auto text-center my-2">
        <label htmlFor="type">Type Checker: </label>
        <select
          id="typesele"
          name="typesele"
          className="text-black"
          defaultValue={typeRouteName || "Select"}
          onChange={(e) => {
            console.log(e.target.value);
            window.location.href = e.target.value;
          }}
        >
          {allTypes.map((type: string) => (
            <option
              value={type}
              key={type}
              id={"type" + type}
              className="text-white"
            >
              {type}
            </option>
          ))}
        </select>
      </form>
      <div className="text-center mx-auto w-fit" id={"type" + typeRouteName}>
        {typeRouteName}
        <br />
        {pokemonTypeChineseName}
      </div>
    </>
  );
}

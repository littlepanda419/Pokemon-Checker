"use client";
type PokemonTypeProps = {
  typeRouteName: string;
  pokemonTypeChineseName: string;
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

export function PokemonShowType({
  typeRouteName,
  pokemonTypeChineseName,
}: PokemonTypeProps) {
  return (
    <>
      <form className="mx-auto text-center my-5 ">
        <label htmlFor="type" className="text-xl pad:text-2xl">
          Type Checker:{" "}
        </label>
        <select
          id="typesele"
          name="typesele"
          className="text-black overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%]"
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
        {pokemonTypeChineseName}系
      </div>
    </>
  );
}

import { getPokemonType } from "@/lib/pokeapi";
type TypeProps = {
  move: string;
  type1: string;
  type2: string;
};
type FunctionPropMove = {
  setM: Function;
};
type FunctionPropTyp1 = {
  set1: Function;
};
type FunctionPropTyp2 = {
  set2: Function;
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

export function DoubleTypeMove({ setM }: FunctionPropMove) {
  return (
    <form className="mx-auto text-center my-5">
      <label htmlFor="type" className="text-xl pad:text-2xl ">
        Move Type:
      </label>
      <select
        id="typesele"
        name="typesele"
        className="text-black overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%]"
        defaultValue="-"
        onChange={(e) => {
          {
            setM(e.target.value);
          }
        }}
      >
        <option value="-" key="-" id="type-" className="text-white">
          -
        </option>
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
  );
}

export function DoubleType1({ set1 }: FunctionPropTyp1) {
  return (
    <form className="mx-auto text-center my-5">
      <label htmlFor="type" className="text-xl pad:text-2xl">
        Type1:
      </label>
      <select
        id="typesele"
        name="typesele"
        className="text-black overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%]"
        defaultValue="normal"
        onChange={(e) => {
          {
            set1(e.target.value);
          }
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
  );
}
export function DoubleType2({ set2 }: FunctionPropTyp2) {
  return (
    <form className="mx-auto text-center my-5 ">
      <label htmlFor="type" className="text-xl pad:text-2xl">
        Type2:
      </label>
      <select
        id="typesele"
        name="typesele"
        className="text-black overflow-y-scroll h-fit text-xl pad:text-2xl max-h-[50%] pad:max-h-[100%] max-w-[30%] pad:max-w-[100%]"
        defaultValue="normal"
        onChange={(e) => {
          {
            set2(e.target.value);
          }
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
  );
}
export function DoubleTypeCheck({ move, type1, type2 }: TypeProps) {
  if (move === "none") {
    return (
      <>
        <td className="border-2 p-2 w-1/4">-</td>
      </>
    );
  }
  let finalmultiplier = 5;
  return (
    <>
      <td className="border-2 p-2 w-1/4">{finalmultiplier}x</td>
    </>
  );
}

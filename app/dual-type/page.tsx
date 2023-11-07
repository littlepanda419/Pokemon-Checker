"use client";
import { useState, useEffect } from "react";
import { TypeFinalCheck } from "@/components/types/dualtype-show";
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
const onetime: string[] = ["1"];

export default function PokemonDualTypePage() {
  const [type1, setType1] = useState<string>("normal");
  const [type2, setType2] = useState<string>("normal");

  function handleClick() {
    console.log(type1, type2);
    TypeFinalCheck(type1, type2);
  }

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="text-center m-5">
          <label htmlFor="type1name" className="text-xl pad:text-2xl">
            type1: <br />
          </label>
          <select
            id={"typesele" + 1}
            name={"typesele" + 1}
            className="text-black overflow-y-scroll text-xl pad:text-2xl"
            defaultValue="normal"
            onChange={(e) => {
              setType1(e.target.value);
            }}
          >
            {allTypes.map((type: string) => (
              <option
                value={type}
                key={type + 1}
                id={"type" + type}
                className="text-white"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center m-5">
          <label
            htmlFor="type2name"
            className="text-xl pad:text-2xl text-center"
          >
            type2: <br />
          </label>
          <select
            id={"typesele" + 2}
            name={"typesele" + 2}
            className="text-black overflow-y-scroll text-xl pad:text-2xl"
            defaultValue="normal"
            onChange={(e) => {
              setType2(e.target.value);
            }}
          >
            {allTypes.map((type: string) => (
              <option
                value={type}
                key={type + 2}
                id={"type" + type}
                className="text-white"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center w-fit mx-auto border-2 p-1 text-xl my-5">
        <button className="" onClick={handleClick}>
          Check
        </button>
      </div>
        <div className="text-center mx-auto w-full pad:w-1/2 ">
          <table className="w-3/4 mx-auto text-xl ">
            <caption className="text-xl pad:text-2xl my-2" id="Type1&Typ2show">
              Choose Type1 and Type2, click the Check button.
            </caption>
            <tbody>
              <tr>
                <th key="typeTH1">Type</th>
                <th key="typeTH2">Multiplier</th>
              </tr>
              {allTypes.map((type, index) => (
                <tr key={type + index} className="text-xl border-2">
                  <td
                    key={"type" + type + index}
                    id={"type" + type}
                    className=""
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </td>
                  {onetime.map((e) => (
                    <td
                      id={type + "dmgdata"}
                      key={type + "dmgdata"}
                      data-label={type.charAt(0).toUpperCase() + type.slice(1)}
                      className="text-xl border-2"
                    >
                      -
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
      
  );
}

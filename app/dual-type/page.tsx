"use client"
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import { DoubleTypeMove, DoubleType1, DoubleType2, DoubleTypeCheck } from "@/components/types/dualtype-check";

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

type TypeProps = {
  move: string
  typ1: string
  typ2: string
}

export default function PokemonTypePage() {
  const [move1, setMove1] = useState("none");
  const [move2, setMove2] = useState("none");
  const [move3, setMove3] = useState("none");
  const [move4, setMove4] = useState("none");
  const [typ1, setTyp1] = useState("normal");
  const [typ2, setTyp2] = useState("normal");
  const [btnn, setBtnn] = useState(false);
  function handleClick(mv: string, t1: string, t2: string) {
    console.log(mv, t1, t2)
    setBtnn(true)
  }

  return (
    <>
      <div className="flex text-center ">
        <div className="inline-flex text-center w-1/2 ">
          <DoubleTypeMove setM={setMove1} />
          <DoubleTypeMove setM={setMove2} />
          <DoubleTypeMove setM={setMove3} />
          <DoubleTypeMove setM={setMove4} />
        </div>
        <div className="flex-col text-center w-1/2">
          <div className="flex">
          <DoubleType1 set1={setTyp1}/>
          <DoubleType2 set2={setTyp2}/>
          </div>
          <div className="flex w-fit border-2 p-2 m-2 text-base text-center mx-auto">
          <button >Show All</button>
          </div>
        </div>
      </div>
      <div className="flex w-fit mx-auto border-2 p-1 text-xl">
        <button className="" onClick={() => handleClick(move1, typ1, typ2)}>Check</button>
      </div>
      <div className="w-1/2 pr-10">
      <table className="w-1/2 text-center my-5 w-full">
        <tr>
            <DoubleTypeCheck move={move1} type1={typ1} type2={typ2}/>
            <DoubleTypeCheck move={move2} type1={typ1} type2={typ2}/>
            <DoubleTypeCheck move={move3} type1={typ1} type2={typ2}/>
            <DoubleTypeCheck move={move4} type1={typ1} type2={typ2}/>
        </tr>
    </table>
    </div>
    </>
  );
}

"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  DoubleTypeSelect,
  DoubleType,
  DoubleTypeTableShow,
  TypeFinalCheck,
} from "@/components/types/dualtype-check";

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

type TypeT = {
  name: string;
  multiplier: number;
};

type TypeTT = {
  [key: string]: TypeT;
};

let TypeMultiDictionary: TypeTT = {};

export default function PokemonDualTypePage() {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [move1, setMove1] = useState("none");
  const [move2, setMove2] = useState("none");
  const [move3, setMove3] = useState("none");
  const [move4, setMove4] = useState("none");
  const [typ1, setTyp1] = useState("normal");
  const [typ2, setTyp2] = useState("normal");
  fetch("https://pokeapi.co/api/v2/type/" + typ1)
    .then((res) => res.json())
    .then((data) => {
      setData1(data);
    });
  fetch("https://pokeapi.co/api/v2/type/" + typ2)
    .then((res) => res.json())
    .then((data) => {
      setData2(data);
    });

  const handleClick = (t1: string, t2: string) => {
    console.log(t1, t2);
    fetch("https://pokeapi.co/api/v2/type/" + typ1)
      .then((res) => res.json())
      .then((data) => {
        setData1(data);
      });
    fetch("https://pokeapi.co/api/v2/type/" + typ2)
      .then((res) => res.json())
      .then((data) => {
        setData2(data);
      });
    TypeMultiDictionary = TypeFinalCheck(data1, data2);
    //console.log("TypeMultiDictionary",TypeMultiDictionary);
  };
  return (
    <>
      <div className="flex text-center ">
        <div className="inline-flex text-center w-1/2 ">
          <DoubleTypeSelect setM={setMove1} k={1} />
          <DoubleTypeSelect setM={setMove2} k={2} />
          <DoubleTypeSelect setM={setMove3} k={3} />
          <DoubleTypeSelect setM={setMove4} k={4} />
        </div>
        <div className="flex-col text-center w-1/2">
          <form className="inline-flex w-full  justify-center text-center my-5">
            <div className="px-5">
              <DoubleType setM={setTyp1} k={1} />
            </div>
            <div className="px-5">
              <DoubleType setM={setTyp2} k={2} />
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-fit mx-auto border-2 p-1 text-xl">
        <button className="" onClick={() => handleClick(typ1, typ2)}>
          Check
        </button>
      </div>
      <div className="flex w-full my-5 ">
        <div className="flex w-1/2 text-center pr-5 border-r border-gray-400">
          <table className="w-full">
            <caption className="text-xl pad:text-2xl my-2">Multiplier</caption>
            <thead>
              <tr className="flex flex-1 w-full text-center h-fit">
                <DoubleTypeTableShow
                  move={move1}
                  type1={typ1}
                  type2={typ2}
                  k={1}
                />
                <DoubleTypeTableShow
                  move={move2}
                  type1={typ1}
                  type2={typ2}
                  k={2}
                />
                <DoubleTypeTableShow
                  move={move3}
                  type1={typ1}
                  type2={typ2}
                  k={3}
                />
                <DoubleTypeTableShow
                  move={move4}
                  type1={typ1}
                  type2={typ2}
                  k={4}
                />
              </tr>
            </thead>
          </table>
        </div>
        <div className="flex w-1/2 pl-5 border-l justify-center text-center">
          <table id="typeTable" className="text-center w-1/2 border-2">
            <caption className="text-xl pad:text-2xl my-2">1+2</caption>
            <thead className="pad:table-header-group ">
              <tr key="headRR">
                <th className="border-2" key="headTT">
                  Type
                </th>
                <th className="border-2" key="headMM">
                  Multiplier
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <th key={"typeHbody"}>
                {allTypes.map((type) => (
                  <tr id={"type" + type} key={"typenam"+type}>
                    <td className="text-xl text-center " key={type + "rowdata"}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </td>
                  </tr>
                ))}
              </th>
              <th className="border-2 text-center" key={"typeHbody2"}>
                {allTypes.map((type) => (
                  <tr id={"type" + type} key={"typedmg"+type}>
                    <td className="text-xl text-center" key={type + "dmgdata"}>
                      123
                    </td>
                  </tr>
                ))}
              </th>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

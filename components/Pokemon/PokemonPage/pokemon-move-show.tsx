"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortDirection,
} from "@tanstack/react-table";
import React, { useState, useMemo, useEffect } from "react";
import { useBetween } from "use-between";
import useColumns from "@/components/Table/movecolumn";
type PokemonStatProps = {
  pokemonObject: any;
};
const useShareableState = () => {
  const [moveshow, setmoveshow] = useState("lvl");
  const [loading, setLoading] = useState(true);
  return {
    moveshow,
    setmoveshow,
    loading,
    setLoading,
  };
};

const useAllData = () => {
  const [moveOfLvl, setMoveOfLvl] = useState();
  const [moveOfMachine, setMoveOfMachine] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      // waiting for allthethings in parallel
      const result = (
        await Promise.all([
          fetch(" https://pokeapi.co/api/v2/pokemon/zekrom"),
          fetch("https://pokeapi.co/api/v2/pokemon?limit=1&offset=0"),
        ])
      ).map((r) => r.json());
      // and waiting a bit more - fetch API is cumbersome
      const [sidebarResult, issueResult] = await Promise.all(result);
      // when the data is ready, save it to state
      setMoveOfLvl(sidebarResult);
      setMoveOfMachine(issueResult);
    };
    dataFetch();
  }, []);
  return { moveOfLvl, moveOfMachine };
};

export function PokemonMoveShow({ pokemonObject }: PokemonStatProps) {
  const { loading, setLoading } = useBetween(useShareableState);
  const { moveOfLvl, moveOfMachine } = useAllData();
  if (!moveOfLvl || !moveOfMachine) {
    setLoading(true);
  } else {
    setLoading(false);
  }
  return (
    <>
      <PokemonMovebylevel pokemonObject={pokemonObject} />
      <PokemonMovebymachine pokemonObject={pokemonObject} />
    </>
  );
}

export function PokemonMoveButton() {
  const { moveshow, setmoveshow } = useBetween(useShareableState);
  useEffect(() => {
    const machineList = document.querySelector("#moveByMachineList");
    if (machineList) {
      machineList.classList.add("inline-flex");
    }
  }, []);

  function handleChange() {
    const levelList = document.querySelector("#moveByLevelList");
    const machineList = document.querySelector("#moveByMachineList");
    if (levelList && machineList) {
      if (moveshow === "lvl") {
        setmoveshow("machine");
        levelList.classList.add("hidden");
        machineList.classList.remove("hidden");
      } else {
        setmoveshow("lvl");
        levelList.classList.remove("hidden");
        machineList.classList.add("hidden");
      }
    }
  }
  if (process.env.NODE_ENV === "development") {
    //prevent double render in dev mode
    useEffect(() => {
      document.querySelectorAll("input[type=radio]").forEach((elem) => {
        if (elem.hasAttribute("checked")) {
          (elem as HTMLInputElement).checked = true;
        }
      });
    }, []);
  }

  return (
    <>
      <label className="px-4 py-2 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:text-white rounded-l-2xl border-r border-white text-xl">
        <input
          className="hidden"
          type="radio"
          name="movebtn"
          value="lvl"
          id="lvl"
          defaultChecked={true}
          onChange={handleChange}
        />
        Level-up
      </label>
      <label className="px-4 py-2 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:text-white rounded-r-2xl border-l border-white text-xl">
        <input
          className="hidden"
          type="radio"
          name="movebtn"
          id="machine"
          value="machine"
          onChange={handleChange}
        />
        Machine
      </label>
    </>
  );
}

const ArrowWay: Record<SortDirection, string> = {
  asc: " ↑",
  desc: " ↓",
};
function isSortDirection(
  value: SortDirection | boolean,
): value is SortDirection {
  return typeof value === "string" && ["asc", "desc"].includes(value);
}

let qualifiedmovegensname: string = "";
let longestitem: number = 0;
function getqualifiedmovegensname(moveObject: any) {
  let movegens = moveObject.version_group_details;
  if (longestitem < movegens.length) {
    longestitem = movegens.length;
    qualifiedmovegensname = movegens[movegens.length - 1].version_group.name;
  }
  longestitem = 0;
  return qualifiedmovegensname;
}
function getMoveLearnWay(moveObject: any) {
  let moveway: string = "";
  let movegens = moveObject.version_group_details;
  let movelevel: number = 0;
  const qualifiedmovegensname = getqualifiedmovegensname(moveObject);
  for (let i = 0; i < movegens.length; i++) {
    let movegensname = movegens[i].version_group.name;
    let movegensmethod = movegens[i].move_learn_method.name;
    if (movegensname === qualifiedmovegensname) {
      if (movegensmethod === "level-up") {
        moveway += "level-up";
        movelevel = moveObject.version_group_details[i].level_learned_at;
      } else if (movegensmethod === "machine" || movegensmethod === "tutor") {
        moveway += "machine";
      }
    }
  }
  return {
    mLW: moveway,
    mLL: movelevel,
    qGE: qualifiedmovegensname,
  };
}

function getMove({ pokemonObject }: PokemonStatProps, getter: string) {
  const [moveLevelData, setMoveLevelData] = useState<Array<any>>([]);
  const [moveMachineData, setMoveMachineData] = useState<Array<any>>([]);
  pokemonObject.moves.map((moveObject: any) => {
    const move = moveObject.move;
    const findMVV = getMoveLearnWay(moveObject);
    const mLW = findMVV.mLW;
    const mLL = findMVV.mLL;
    const mQG = findMVV.qGE;
    useEffect(() => {
      if (mLW === "") {
        return;
      }
      const moveUrl = move.url; //https://pokeapi.co/api/v2/move/550/
      let ignore = false;
      if (mLW.includes("level-up")) {
        fetch(moveUrl)
          .then((res) => res.json())
          .then((data) => {
            if (!ignore) {
              const newData = {
                level: mLL,
                name: data["name"],
                type: data["type"]["name"],
                class: data["damage_class"]["name"],
                power: data["power"],
                accur: data["accuracy"],
                pp: data["pp"],
              };
              setMoveLevelData((prevData) => [...prevData, newData]);
            }
          });
      }
      if (mLW.includes("machine")) {
        fetch(moveUrl)
          .then((res) => res.json())
          .then((data) => {
            if (!ignore) {
              const newData = {
                level: "-",
                name: data["name"],
                type: data["type"]["name"],
                class: data["damage_class"]["name"],
                power: data["power"],
                accur: data["accuracy"],
                pp: data["pp"],
              };
              setMoveMachineData((prevData) => [...prevData, newData]);
            }
          });
      }
      return () => {
        ignore = true;
      };
    }, [move]);
  });
  if (getter === "machine") {
    return moveMachineData;
  } else {
    return moveLevelData;
  }
}

export function PokemonMovebylevel({ pokemonObject }: PokemonStatProps) {
  const { loading, setLoading } = useBetween(useShareableState);
  const moveData = getMove({ pokemonObject }, "level-up");
  moveData.sort((a, b) => a.level - b.level);
  const data = useMemo(() => moveData, [moveData]);
  const columns = useColumns();
  const [sorting, setsorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: (newSorting: any) => {
      setsorting(newSorting);
    },
  });
  if (loading === true) {
    setInterval(() => {
      setLoading(false);
    }, 1500);
    return (
      <div className="w-full text-2xl">
        Level up moves:
        <div className="grid grid-cols-8 gap-2 px-5 mt-2 animate-pulse">
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500 col-span-2 mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
        </div>
        <div className="grid grid-cols-8 gap-2 px-5  animate-pulse">
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500 col-span-2 mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
        </div>
        <div className="grid grid-cols-8 gap-2 px-5  animate-pulse">
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500 col-span-2 mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
        </div>
        <div className="grid grid-cols-8 gap-2 px-5  animate-pulse">
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500 col-span-2 mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
        </div>
        <div className="grid grid-cols-8 gap-2 px-5  animate-pulse">
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500 col-span-2 mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
          <div className="h-3 rounded-full bg-gray-500  mb-4"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        id="moveByLevelList"
        className="inline-flex flex-col w-full text-2xl"
      >
        Level up moves:
        <table className="w-full mt-2 block overflow-x-auto whitespace-nowrap">
          <thead className="bg-zinc-700 w-full text-center ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="w-screen ">
                {headerGroup.headers.map((header) =>
                  (() => {
                    const gis = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="p-1 min-w-[75px] w-screen text-lg pc:text-xl"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {isSortDirection(gis) ? ArrowWay[gis] : null}
                      </th>
                    );
                  })(),
                )}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map(
              (
                row, //1
              ) => (
                <tr
                  key={row.id}
                  id={row.id}
                  className="odd:bg-zinc-500 even:bg-zinc-600"
                >
                  {row.getVisibleCells().map(
                    (
                      cell, //7
                    ) => (
                      <td
                        key={cell.id}
                        id={cell.id}
                        className="py-1 text-lg pc:text-xl"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ),
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
        gen. {qualifiedmovegensname}
      </div>
    );
  }
}

export function PokemonMovebymachine({ pokemonObject }: PokemonStatProps) {
  const moveData = getMove({ pokemonObject }, "machine");
  moveData.sort((a, b) => ("" + a.name).localeCompare(b.name));
  const data = useMemo(() => moveData, [moveData]);
  const columns = useColumns();

  const [sorting, setsorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: (newSorting: any) => {
      setsorting(newSorting);
    },
  });
  return (
    <div id="moveByMachineList" className="hidden flex-col w-full text-2xl">
      Machine moves:
      <table className="w-full mt-2 block overflow-x-auto whitespace-nowrap">
        <thead className="bg-zinc-700 w-full text-center ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="w-screen">
              {headerGroup.headers.map((header) =>
                (() => {
                  const gis = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="p-1 min-w-[75px] w-screen text-lg pc:text-xl"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {isSortDirection(gis) ? ArrowWay[gis] : null}
                    </th>
                  );
                })(),
              )}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map(
            (
              row, //1
            ) => (
              <tr
                key={row.id}
                id={row.id}
                className="odd:bg-zinc-500 even:bg-zinc-600"
              >
                {row.getVisibleCells().map(
                  (
                    cell, //7
                  ) => (
                    <td
                      key={cell.id}
                      id={cell.id}
                      className="py-1 text-lg pc:text-xl"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ),
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>
      gen. {qualifiedmovegensname}
    </div>
  );
}

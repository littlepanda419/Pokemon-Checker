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
import useColumns from "@/components/table/movecolumn";
type PokemonStatProps = {
  pokemonObject: any;
};

const useShareableState = () => {
  const [moveshow, setmoveshow] = useState("lvl");
  const [Loading, setLoading] = useState(true);
  return {
    moveshow,
    setmoveshow,
    Loading,
    setLoading,
  };
};

export function PokemonMoveShow({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      <div id="moveByLevelList" className="inline-flex flex-col w-full ">
        <PokemonMovebylevel pokemonObject={pokemonObject} />
      </div>
      <div id="moveByMachineList" className="inline-flex flex-col w-full ">
        <PokemonMovebymachine pokemonObject={pokemonObject} />
      </div>
    </>
  );
}

export function PokemonMoveButton() {
  useEffect(() => {
    const machineList = document.querySelector("#moveByMachineList");
    if (machineList) {
      machineList.classList.add("hidden");
    }
  }, []);

  function handleChange(){
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
  };
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
  
  const { moveshow, setmoveshow } = useBetween(useShareableState);
  return (
    <>
      <label className="px-4 py-2 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:text-white rounded-l-2xl border-r border-white ">
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
      <label className="px-4 py-2 text-gray-300 bg-gray-500 hover:bg-gray-400 hover:text-white rounded-r-2xl border-l border-white ">
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
  value: SortDirection | boolean
): value is SortDirection {
  return typeof value === "string" && ["asc", "desc"].includes(value);
}
function getMoveLearnWay(moveObject: any) {
  let moveway: string = "other";
  let movegens = moveObject.version_group_details;
  let movelevel: number = 0;
  for (let i = 0; i < movegens.length; i++) {
    let movegensname = movegens[i].version_group.name;
    let movegensmethod = movegens[i].move_learn_method.name;
    if (
      movegensname === "sword-shield" ||
      movegensname === "scarlet-violet" ||
      movegensname === "legends-arceus" ||
      movegensname === "the-indigo-disk" ||
      movegensname === "the-teal-mask"
    ) {
      if (movegensmethod === "level-up") {
        moveway = "level-up";
        movelevel = moveObject.version_group_details[i].level_learned_at;
        return {
          mLW: moveway,
          mLL: movelevel,
        };
      } else if (movegensmethod === "machine" || movegensmethod === "tutor") {
        moveway = "machine";
        return {
          mLW: moveway,
          mLL: movelevel,
        };
      } else {
        moveway = "other";
        return {
          mLW: moveway,
          mLL: movelevel,
        };
      }
    }
  }
  return {
    mLW: moveway,
    mLL: movelevel,
  };
}

export function PokemonMovebylevel({ pokemonObject }: PokemonStatProps) {
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
  return (
    <>
      Level up moves:
      <table className="text-xl w-full mt-1">
        <thead className="bg-zinc-700 w-full  text-center ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) =>
                (() => {
                  const gis = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="p-1 min-w-[75px] "
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {isSortDirection(gis) ? ArrowWay[gis] : null}
                    </th>
                  );
                })()
              )}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map(
            (
              row //1
            ) => (
              <tr
                key={row.id}
                id={row.id}
                className="odd:bg-zinc-500 even:bg-zinc-600"
              >
                {row.getVisibleCells().map(
                  (
                    cell //7
                  ) => (
                    <td key={cell.id} id={cell.id} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
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
    <>
      Machine moves:
      <table className="text-xl w-full mt-1">
        <thead className="bg-zinc-700 w-full  text-center ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) =>
                (() => {
                  const gis = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="p-1 min-w-[75px] "
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {isSortDirection(gis) ? ArrowWay[gis] : null}
                    </th>
                  );
                })()
              )}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map(
            (
              row //1
            ) => (
              <tr
                key={row.id}
                id={row.id}
                className="odd:bg-zinc-500 even:bg-zinc-600"
              >
                {row.getVisibleCells().map(
                  (
                    cell //7
                  ) => (
                    <td key={cell.id} id={cell.id} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

function getMove({ pokemonObject }: PokemonStatProps, getter: string) {
  const [moveLevelData, setMoveLevelData] = useState<Array<any>>([]);
  const [moveMachineData, setMoveMachineData] = useState<Array<any>>([]);
  pokemonObject.moves.map((moveObject: any) => {
    const move = moveObject.move;
    const findMVV = getMoveLearnWay(moveObject);
    const mLW = findMVV.mLW;
    const mLL = findMVV.mLL;
    useEffect(() => {
      if (mLW === "others") {
        return;
      }
      const moveUrl = move.url; //https://pokeapi.co/api/v2/move/550/
      let ignore = false;
      if (mLW === "level-up") {
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
      } else if (mLW === "machine") {
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

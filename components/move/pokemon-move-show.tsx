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

export function PokemonMoveButton() {
  if (process.env.NODE_ENV === "development") {
    //make sure defaultchecked for radio input works fine (moveschoosebtn)
    useEffect(() => {
      document.querySelectorAll("input[type=radio]").forEach((elem) => {
        if (elem.hasAttribute("checked")) {
          (elem as HTMLInputElement).checked = true;
        }
      });
    }, []);
  }

  const { moveshow, setmoveshow } = useBetween(useShareableState);
  const handlechange = () => {
    if (moveshow === "lvl") {
      setmoveshow("machine");
    } else {
      setmoveshow("lvl");
    }
  };

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
          onChange={handlechange}
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
          onChange={handlechange}
        />
        Machine
      </label>
    </>
  );
}
export function PokemonMoveShow({ pokemonObject }: PokemonStatProps) {
  return (
    <>
      <div className="inline-flex flex-col w-full">
        <PokemonMovebylevel pokemonObject={pokemonObject} />
      </div>
      <div className="inline-flex flex-col w-full">
        <PokemonMovebymachine pokemonObject={pokemonObject} />
      </div>
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

function getMoveTestL({ pokemonObject }: PokemonStatProps) {
  let moveatnow = 0;
  let totalmoves = 0;
  const { Loading, setLoading } = useBetween(useShareableState);
  const [moveData, setMoveData] = useState<Array<any>>([]);
  pokemonObject.moves.map((moveObject: any) => {
    useEffect(() => {
      const move = moveObject.move;
      let islvlup = false;
      let lvlplace = 0;
      let movegens = moveObject.version_group_details;
      for (let i = 0; i < movegens.length; i++) {
        let movegensname = movegens[i].version_group.name;
        let movegensmethod = movegens[i].move_learn_method.name;
        if (
          (movegensname === "sword-shield" ||
            movegensname === "scarlet-violet" ||
            movegensname === "legends-arceus" ||
            movegensname === "the-indigo-disk" ||
            movegensname === "the-teal-mask") &&
          movegensmethod === "level-up"
        ) {
          islvlup = true;
          lvlplace = i;
          totalmoves++;
        }
      }
      if (!islvlup) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }
      moveatnow++;
      if (moveatnow === totalmoves) {
        setLoading(false);
      }
      const moveUrl = move.url; //https://pokeapi.co/api/v2/move/550/
      const movelevel =
        moveObject.version_group_details[lvlplace].level_learned_at; // learned skill at this(number) level
      let ignore = false;
      fetch(moveUrl)
        .then((res) => res.json())
        .then((data) => {
          if (!ignore) {
            const newData = {
              level: movelevel,
              name: data["name"],
              type: data["type"]["name"],
              class: data["damage_class"]["name"],
              power: data["power"],
              accur: data["accuracy"],
              pp: data["pp"],
            };
            setMoveData((prevData) => [...prevData, newData]);
          }
        });
      return () => {
        ignore = true;
      };
    }, [moveObject]);
  });
  return moveData;
}

export function PokemonMovebylevel({ pokemonObject }: PokemonStatProps) {
  const { Loading, setLoading } = useBetween(useShareableState);
  const moveData = getMoveTestL({ pokemonObject });
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
  if (Loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      Level up moves:
      <table className="text-xl w-full ">
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

function ismachine(moveObject: any) {
  let machine = false;
  let movegens = moveObject.version_group_details;
  for (let i = 0; i < movegens.length; i++) {
    let movegensname = movegens[i].version_group.name;
    let movegensmethod = movegens[i].move_learn_method.name;
    if (
      (movegensname === "sword-shield" ||
        movegensname === "scarlet-violet" ||
        movegensname === "legends-arceus" ||
        movegensname === "the-indigo-disk" ||
        movegensname === "the-teal-mask") &&
      (movegensmethod === "machine" || movegensmethod === "tutor")
    ) {
      machine = true;
    }
  }
  return machine;
}

function getMoveTestM({ pokemonObject }: PokemonStatProps) {
  let moveatnow = 0;
  const { Loading, setLoading } = useBetween(useShareableState);
  const [moveData, setMoveData] = useState<Array<any>>([]);
  pokemonObject.moves.map((moveObject: any) => {
    const move = moveObject.move;
    useEffect(() => {
      if (!ismachine) {
        setLoading(true);
        return;
      }
      moveatnow++;
      setTimeout(() => {
        setLoading(false);
      }, 600);
      const moveUrl = move.url; //https://pokeapi.co/api/v2/move/550/
      let ignore = false;
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
            setMoveData((prevData) => [...prevData, newData]);
          }
        });
      return () => {
        ignore = true;
      };
    }, [move]);
  });
  return moveData;
}

export function PokemonMovebymachine({ pokemonObject }: PokemonStatProps) {
  const { Loading, setLoading } = useBetween(useShareableState);
  const moveData = getMoveTestM({ pokemonObject });
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
  if (Loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      Machine moves:
      <table className="text-xl w-full ">
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

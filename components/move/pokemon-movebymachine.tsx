import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortDirection,
} from "@tanstack/react-table";
import React, { useMemo, useState, useEffect } from "react";
import useColumns from "@/components/table/movecolumn";
import { useBetween } from "use-between";

type PokemonStatProps = {
  pokemonObject: any;
};

const ArrowWay: Record<SortDirection, string> = {
  asc: " ↑",
  desc: " ↓",
};
function isSortDirection(
  value: SortDirection | boolean
): value is SortDirection {
  return typeof value === "string" && ["asc", "desc"].includes(value);
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

const useShareableState = () => {
  const [Loading, setLoading] = useState(true);
  return {
    Loading,
    setLoading,
  };
};

function getMoveTest({ pokemonObject }: PokemonStatProps) {
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
  const moveData = getMoveTest({ pokemonObject });
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

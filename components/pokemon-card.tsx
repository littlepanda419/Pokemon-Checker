import Link from "next/link";
// pikachu, -> localhost:3000/pikachu

interface PokemonCardProps {
  name: string;
}

// <PokemonCard name="pikachu" />

export function PokemonCard({ name }: PokemonCardProps) {
  return (
    <Link
      href={name}
      className="rounded-lg border-2 m-3 p-2 hover:bg-neutral-800 hover:border-neutral-600 shadow-[2px_2px_0px_0px_rgba(255,255,128,0.8)]
                  pad:m-3 pad:p-4 pad:shadow-[3px_3px_0px_0px_rgba(255,255,128,0.8)]
                  pc:m-4 pc:p-4 pc:shadow-[5px_5px_0px_0px_rgba(255,255,128,0.8)]"
      key={name + "Card"}
    >
      <div className="text-base font-semibold pad:text-lg pc:text-2xl">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </div>
    </Link>
  );
}

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
      className="rounded-lg border-2 m-4 p-5 hover:bg-neutral-800 hover:border-neutral-600 shadow-[3px_3px_0px_0px_rgba(255,255,128,0.8)]"
      key={name + "Card"}
    >
      <div className={`text-2xl font-semibold`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </div>
    </Link>
  );
}

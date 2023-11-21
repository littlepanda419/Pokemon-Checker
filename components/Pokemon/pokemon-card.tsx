import Link from "next/link";
// pikachu, -> localhost:3000/pikachu

type PokemonCardProps = {
  name: string;
  nameC: string;
  id: string;
};

// <PokemonCard name="pikachu" />

export function PokemonCard({ name, nameC, id }: PokemonCardProps) {
  return (
    <Link
      href={"/pokemon/" + name}
      className="rounded-lg border-2 border-stone-200  shadow-[0px_2px_1px_0px_rgba(255,255,128,0.8)]
                  m-3 p-2 
                  pad:m-3 pad:p-3 
                  pc:m-4 pc:p-4 
                  hover:bg-neutral-700 hover:border-stone-400 hover:shadow-[-5px_5px_5px_0px_rgba(255,255,128,0.8)]
                  hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.05] hover:duration-300
                  focus:scale-[1.1] focus:duration-1000 focus:bg-gradient-to-r focus:from-[#F9CE34] focus:via-[#ee2a7b] focus:to-[#6228d7]
                  "
      key={name + "Card"}
      id={id}
    >
      <div className="text-base font-semibold pad:text-lg pc:text-2xl">
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <div className="hidden pad:inline-flex text-base font-semibold pad:text-lg pc:text-2xl ">
          &nbsp;
        </div>
        <div className="pad:inline-flex text-base font-semibold pad:text-lg pc:text-2xl">
          {nameC}
        </div>
      </div>
    </Link>
  );
}

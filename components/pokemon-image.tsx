"use client";
import Image from "next/image";

export function PokemonImage({ image, name }: { image: string; name: string }) {
  if (typeof image !== "string") {
    image = "/images/pokeball.png";
  }
  return (
    <>
      <Image
        src={image}
        alt={"Picture of " + name}
        priority
        fill
        sizes="(min-width: 1024px) 350px, (min-width: 768px) 275px,200px"
        className="brightness-0 mx-auto my-auto"
        onLoadingComplete={(image) => {
          {
            image.classList.remove("brightness-0");
            image.classList.add("animate-whosthatpokemon");
          }
        }}
      />
    </>
  );
}

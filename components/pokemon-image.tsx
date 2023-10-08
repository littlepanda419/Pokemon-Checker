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
        sizes="(max-width: 500px) 100vw, (max-width: 500px) 50vw, 33vw"
        className="max-w-[400px] max-h-[400px] brightness-0 flex justify-center self-center mx-auto my-auto"
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

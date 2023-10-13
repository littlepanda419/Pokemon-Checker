import Link from "next/link";

export default function PokemonTypePage() {
  return (
    <>
      <div className="text-center mx-auto my-[20px]">
        <meta http-equiv="refresh" content="0; url=/types/normal" />
        <Link href="/types/normal">
          Redirecting to the correct page... If not, Click here
        </Link>
      </div>
    </>
  );
}

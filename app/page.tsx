import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-center m-10 text-5xl">Welcome! </div>
      <div className="text-center m-10 text-3xl">
        go to &nbsp;
        <Link href="/pokemon" className="underline">
          pokemon
        </Link>
      </div>
    </>
  );
}

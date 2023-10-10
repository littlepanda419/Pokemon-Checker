
import Link from "next/link";

//<meta http-equiv="refresh" content="0; url=/types/normal" />
export default function PokemonTypePage() {
    return(
        <>
        <div className="text-center mx-auto my-[20px]">
        <meta http-equiv="refresh" content="0; url=/" />
        <Link href="/" >Redirecting to the correct page... If not, Click here</Link>
        </div>
        </>
    )
}

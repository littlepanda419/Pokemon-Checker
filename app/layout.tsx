import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Poke Checker Made by Panda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-[2%] my-[2%]">
          <div className="">
            <a
              href="/"
              className="flex justify-center text-2xl font-bold border-4 rounded-full w-fit mx-auto text-yellow-400 border-blue-600 p-2 
              pad:text-3xl pc:text-4xl"
            >
              Pokemon Checker
            </a>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
/*
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <script src="http://localhost:8097"></script>
        <body className={inter.className}>
          <main className="items-center m-10">
            <div className="text-center items-center mx-auto w-fit my-5">
              <a
                href="/"
                className="text-5xl text-bold text-center items-center border-yellow-500 border-4 rounded-full min-w-min max-w-fit px-6 py-2"
              >
                Pokemon Checker
              </a>
            </div>
            {children}
          </main>
        </body>
      </head>
    </html>
  );
}
*/

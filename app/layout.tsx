import "./globals.css";
import { type ReactNode } from "react";
import Link from "next/link";
import { inter } from "@/types/fonts";
import { SideBar } from "@/components/Sidebar/sidebar";

export const metadata = {
  title: "Poke Checker Made by Panda",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`mx-[2%] my-[2%] ${inter.className}`}>
        <div className="inline-flex w-full justify-between align-middle">
          <div className="w-0 h-0">
            <SideBar />
          </div>
          <Link
            href="/"
            className="text-2xl font-bold border-4 rounded-full w-fit mx-auto text-center text-yellow-400 border-blue-600 p-2  
              pad:text-3xl pc:text-4xl pad:p-3"
          >
            Pokemon Checker
          </Link>
        </div>
        {children}
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

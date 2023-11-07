"use client";
import Link from "next/link";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { SideBarData } from "./sidebardata";

export function SideBar() {
  const [sidebar, setSideBar] = useState(false);
  const showSidebar = () => setSideBar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="flex ">
          <Link
            href="#"
            className="my-4 ml-1 text-lg pad:ml-8 pad:mt-4 pad:text-2xl pc:text-3xl"
          >
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "side-menu active" : "side-menu"}>
          <ul className=" w-full pad:mt-4 text-center flex-row " onClick={showSidebar}>
            <li className="bg-[#2b2d31] w-full h-[100px] pad:h-[10%] flex justify-start place-items-center ">
              <Link href="#" className="ml-[2rem] text-3xl ">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <div className="border border-gray-400 w-[95%] mx-auto mb-2"></div>

            {SideBarData.map((item, index) => {
                return (
                  <li key={index} className={item.clasName}>
                    <Link
                      href={item.path}
                      className="decoration-0 mx-auto text-center pad:w-full h-full flex items-center rounded-xl hover:bg-[#1a83ff] "
                    >
                      {item.icon}&nbsp;{item.title}
                    </Link>
                  </li>
                );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

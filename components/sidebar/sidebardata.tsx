import React from "react";
import * as FiIcons from "react-icons/fi";
import * as GoIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";

export const SideBarData = [
  {
    title: "Homepage",
    path: "/",
    icon: <FiIcons.FiHome />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Pokemons",
    path: "/",
    icon: <TbIcons.TbPokeball />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Types",
    path: "/types/normal",
    icon: <GiIcons.GiSpikedDragonHead />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Dual-Types",
    path: "/dual-type/",
    icon: <GiIcons.GiDoubleDragon />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
];

import React from "react";
import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";

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
    path: "/pokemons",
    icon: <TbIcons.TbPokeball />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Moves",
    path: "/moves",
    icon: <GiIcons.GiBladeDrag />,
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
    title: "Dual-Type",
    path: "/dual-type",
    icon: <GiIcons.GiDoubleDragon />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Natures",
    path: "/natures",
    icon: <TbIcons.TbMoodSmile />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Abilities",
    path: "/abilities",
    icon: <TbIcons.TbHeartStar />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "Items",
    path: "/items",
    icon: <GiIcons.GiCardboardBoxClosed />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl ",
  },
  {
    title: "About",
    path: "/about",
    icon: <AiIcons.AiFillGithub />,
    clasName:
      "flex justify-start place-items-center px-10 pad:px-6 pc:px-10 py-2 h-[50px] text-xl absolute bottom-0 w-full",
  },
];

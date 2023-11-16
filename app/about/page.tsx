"use client";
import { IconContext } from "react-icons";
import Link from "next/link";
import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";

export default function AboutPage() {
  return (
    <>
      <IconContext.Provider value={{ color: "white", className: "" }}>
        <div className="m-10 text-xl pad:text-2xl text-center">
          <Link
            href={"https://github.com/littlepanda419/Pokemon-Checker"}
            className="text-center pad:w-fit h-fit flex items-center justify-center mx-auto"
          >
            <AiIcons.AiFillGithub />
            &nbsp;Github Page
          </Link>
        </div>
        <div className="m-10 text-xl pad:text-2xl text-center">
          Author: LittleYellowPanda
        </div>
      </IconContext.Provider>
    </>
  );
}

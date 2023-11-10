"use client";
import React, { useState } from "react";
import {
  ChineseNature,
  EnglishNature,
} from "@/components/nature/nature-language";

import * as MdIcons from "react-icons/md";
import { IconContext } from "react-icons";

export default function PokemonNaturePage() {
  const [language, setLanguage] = useState<string>("english");
  const [isLanguageListVisible, setLanguageListVisible] = useState<boolean>(false);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setLanguageListVisible(false);
  };


  return (
      <div className="text-center mx-auto mt-5 mb-2 text-lg pad:text-2xl">
        <button className="mx-auto w-fit" onClick={() => setLanguageListVisible(!isLanguageListVisible)}>
          <MdIcons.MdLanguage color="white"/></button>
        {isLanguageListVisible && (
          <ul className="mx-auto w-fit">
            <li className="cursor-pointer" onClick={() => handleLanguageChange('english')}>英文 English</li>
            <li className="cursor-pointer" onClick={() => handleLanguageChange('chinese')}>中文 Chinese</li>
          </ul>
        )}
      {language === "english" && <EnglishNature />}
      {language === "chinese" && <ChineseNature />}
    </div>
  );
}

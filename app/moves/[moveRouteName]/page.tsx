import Link from "next/link";
import { getPokemonMoves } from "@/lib/pokeapi";

export default async function PokemonMovePage({
  params,
}: {
  params: { moveRouteName: string };
}) {
  const { moveRouteName } = params;
  let pokemonMoveObject: any;
  try {
    pokemonMoveObject = await getPokemonMoves(moveRouteName); // get the API data for pikachu
  } catch (error) {
    throw new Error("please enter a valid Move name!");
  }
  console.log(pokemonMoveObject);
  let movename: string = "";
  let moveeffect: string = "";
  let movenameC: string = "";
  let moveeffectC: string = "";
  let accuracy: number = 0;
  let power: number = 0;
  let pp: number = 0;
  let dmgclass: string = "";
  let dmgtype: string = "";
  try {
    accuracy = pokemonMoveObject.accuracy;
  } catch (error) {}
  try {
    dmgclass = pokemonMoveObject.damage_class.name;
  } catch (error) {}
  try {
    moveeffect = pokemonMoveObject.flavor_text_entries.find(
      (item: any) => item.language.name === "en"
    ).flavor_text;
  } catch (error) {}
  try {
    moveeffectC = pokemonMoveObject.flavor_text_entries.find(
      (item: any) => item.language.name === "zh-Hant"
    ).flavor_text;
  } catch (error) {}
  try {
    movename = pokemonMoveObject.names.find(
      (item: any) => item.language.name === "en"
    ).name;
  } catch (error) {}
  try {
    movenameC = pokemonMoveObject.names.find(
      (item: any) => item.language.name === "zh-Hant"
    ).name;
  } catch (error) {}
  try {
    power = pokemonMoveObject.power;
  } catch (error) {}
  try {
    pp = pokemonMoveObject.pp;
  } catch (error) {}
  try {
    dmgtype = pokemonMoveObject.type.name;
  } catch (error) {}
  /*
  "name": "pound",
  "type": { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" }  
  */
  return (
    <>
      <div className="font-bold text-center mx-auto text-2xl pc:text-3xl m-10">
        {movename}
        <br />
        {movenameC}
        <br />
      </div>
      <div className="text-justify mx-auto text-xl pc:text-xl mt-2 w-1/3">
        {moveeffect}
        <div className="text-center mx-auto text-xl pc:text-xl mt-10">
          {moveeffectC}
        </div>
      </div>
      <div className="text-center">type: {dmgtype}</div>
      <div className="text-center">class: {dmgclass}</div>
      <div className="text-center">power: {power}</div>
      <div className="text-center">accurancy: {accuracy}</div>
      <div className="text-center">pp: {pp}</div>
    </>
  );
}

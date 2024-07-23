"use client";
import CardWord from "@/components/card-word";
import words from "../../public/db.json";
import { useEffect, useState } from "react";
import SortNumber from "@/utils/sort-number";
import { Teams } from "@/types/teams";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [indexWord, setIndexWord] = useState(0);
  const [redPoints, setRedPoints] = useState(0);
  const [bluePoints, setBluePoints] = useState(0);
  const [team, setTeam] = useState(Teams.BLUE);
  const newWord = () => {
    const { value } = SortNumber(0, words.length);
    setTeam((prev) => (prev === Teams.BLUE ? Teams.RED : Teams.BLUE));
    setIndexWord(value);
  };
  useEffect(() => {
    newWord();
  }, []);
  console.log(words[indexWord]);
  return (
    <main className="min-h-screen flex-col items-center justify-between relative">
      <div className="w-full flex flex-col p-4 gap-8">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Mimica</h1>
          <span className="text-base text-gray-400 bg-gray-200 px-4 py-1 rounded-xl capitalize">
            Categoria: {words[indexWord].categories}
          </span>
        </div>
        <div className="flex gap-2 m-auto">
          <div className="text-xl bg-red-500 p-8 rounded-md">
            Time Vermelho: {redPoints}
          </div>
          <div className="text-xl bg-blue-500 p-8 rounded-md">
            Time Azul: {bluePoints}
          </div>
        </div>
        <div className="flex flex-col gap-2 m-auto bg-gray-300 w-full px-4 py-6 rounded-md">
          <h3 className="text-2xl font-bold px-4">É a vez do time:</h3>
          {team === Teams.RED ? (
            <span className="text-5xl text-gray text-red-500 px-4 py-1 rounded-xl font-bold">
              Vermelho
            </span>
          ) : (
            <span className="text-5xl text-gray text-blue-500 px-4 py-1 rounded-xl font-bold">
              Azul
            </span>
          )}
        </div>
        <button
          onClick={() => setVisible((prev) => !prev)}
          className="text-4xl border-2 border-slate-800 rounded-lg p-4"
        >
          Revelar palavra
        </button>
      </div>
      <CardWord
        visible={visible}
        setVisible={setVisible}
        word={words[indexWord]}
        newWord={newWord}
        setRedPoints={setRedPoints}
        setBluePoints={setBluePoints}
        team={team}
      />
    </main>
  );
}

"use client";
import CardWord from "@/components/card-word";
import words from "../../public/db.json";
import { useEffect, useState } from "react";
import SortNumber from "@/utils/sort-number";
import { Teams } from "@/types/teams";
import { useWakeLock } from "@/hooks/useWakeLook";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import SettingsWrapper from "@/components/settings";

export default function Home() {
  useWakeLock();
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [indexWord, setIndexWord] = useState(0);
  const [redPoints, setRedPoints] = useState(0);
  const [bluePoints, setBluePoints] = useState(0);
  const [team, setTeam] = useState(Teams.BLUE);
  const [time, setTime] = useState(60);
  const newWord = () => {
    const { value } = SortNumber(0, words.length);
    setTeam((prev) => (prev === Teams.BLUE ? Teams.RED : Teams.BLUE));
    setIndexWord(value);
  };
  useEffect(() => {
    newWord();
  }, []);
  const cardVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };
  return (
    <main className="min-h-screen max-w-xl m-auto  flex-col items-center justify-between relative">
      {visible ? (
        <CardWord
          visible={visible}
          setVisible={setVisible}
          word={words[indexWord]}
          newWord={newWord}
          setRedPoints={setRedPoints}
          setBluePoints={setBluePoints}
          team={team}
          time={time}
        />
      ) : (
        <motion.div
          className=" flex flex-col p-4 gap-8"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold mr-4">Mimica</h1>
            <span className="ml-auto mr-4 text-base text-gray-400 bg-gray-200 px-4 py-1 rounded-xl capitalize">
              Categoria: {words[indexWord].categories}
            </span>
            <button className="" onClick={() => setSettings(!settings)}>
              <Settings />
            </button>
            {settings && (
              <SettingsWrapper
                timeLeft={time}
                setTimeLeft={setTime}
                setVisible={setSettings}
              />
            )}
          </div>
          <div className="flex gap-2 w-full m-auto font-semibold">
            <p className="text-xl bg-red-500 p-4 rounded-md w-1/2">
              Vermelho: {redPoints}
            </p>
            <p className="text-xl bg-blue-500 p-4 rounded-md w-1/2">
              Azul: {bluePoints}
            </p>
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
        </motion.div>
      )}
    </main>
  );
}

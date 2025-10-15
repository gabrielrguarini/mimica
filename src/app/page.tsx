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
import { StartGame } from "@/components/start-game";
import { useGameStore } from "@/store/useGameStore";

export default function Home() {
  useWakeLock();

  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [time, setTime] = useState(60);
  const [isDark, setIsDark] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(false);

  const {
    redPoints,
    bluePoints,
    team,
    indexWord,
    usedWords,
    setIndexWord,
    addUsedWord,
    setUsedWords,
    resetGame,
    previousWord,
  } = useGameStore();

  const newWord = () => {
    const totalWords = words.length;
    const usedIndexes = usedWords.map((w) => w.index);

    const availableIndexes = words
      .map((_, index) => index)
      .filter((index) => !usedIndexes.includes(index));

    if (availableIndexes.length <= 5) {
      setUsedWords([]);
      newWord();
      return;
    }

    const { value } = SortNumber(0, availableIndexes.length);
    const selectedIndex = availableIndexes[value];
    addUsedWord({ word: words[selectedIndex].word, index: selectedIndex });
    setIndexWord(selectedIndex);
  };

  useEffect(() => {
    const hasGame = localStorage.getItem("mimica-game-storage");
    if (hasGame) {
      setShowStartScreen(true);
    } else {
      newWord();
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  if (showStartScreen) {
    return (
      <StartGame
        hasSavedGame={true}
        onContinueGame={() => setShowStartScreen(false)}
        onStartNewGame={() => {
          resetGame();
          newWord();
          setShowStartScreen(false);
        }}
      />
    );
  }

  const cardVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <main className="h-dvh max-w-xl m-auto flex-col items-center justify-between relative">
      {visible ? (
        <CardWord
          visible={visible}
          setVisible={setVisible}
          word={words[indexWord]}
          newWord={newWord}
          time={time}
        />
      ) : (
        <motion.div
          className="flex flex-col px-4 py-2 gap-8"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold mr-4">Mímica</h1>
            <span className="ml-auto mr-4 text-base text-gray-400 bg-gray-200 px-4 py-1 rounded-xl capitalize">
              Categoria: {words[indexWord].categories}
            </span>
            <button
              aria-label="Configurações"
              onClick={() => setSettings(!settings)}
            >
              <Settings />
            </button>
            {settings && (
              <SettingsWrapper
                timeLeft={time}
                setTimeLeft={setTime}
                setVisible={setSettings}
                isDark={isDark}
                setIsDark={setIsDark}
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
          <div className="flex flex-col gap-2 m-auto bg-gray-300 dark:bg-white dark:text-black w-full px-4 py-6 rounded-md">
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
          <p className="text-sm text-center">
            A próxima palavra vale{" "}
            <span className="text-lg font-bold">
              {words[indexWord].difficulty}
            </span>{" "}
            ponto(s)
          </p>
          {previousWord && (
            <p className="text-sm text-center">
              Última palavra:{" "}
              <span className="text-base font-bold capitalize">
                {previousWord}
              </span>
            </p>
          )}
          <button
            aria-label="Revelar palavra"
            onClick={() => setVisible(true)}
            className="text-4xl border-2 border-slate-800 rounded-lg p-4"
          >
            Revelar palavra
          </button>
        </motion.div>
      )}
    </main>
  );
}

import { Teams } from "@/types/teams";
import { useEffect, useState } from "react";

interface CardWordProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  word: Word;
  newWord: () => void;
  setRedPoints: React.Dispatch<React.SetStateAction<number>>;
  setBluePoints: React.Dispatch<React.SetStateAction<number>>;
  team: Teams;
}
export default function CardWord({
  visible,
  setVisible,
  word,
  newWord,
  setRedPoints,
  setBluePoints,
  team,
}: CardWordProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [blur, setBlur] = useState(false);
  const playSound = () => {
    const audio = new Audio("./sound.wav");
    audio.play();
  };
  useEffect(() => {
    if (!visible) {
      return;
    }
    setTimeLeft(60);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          playSound();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [visible]);

  const handleCorrect = (wordDificulty: number, team: Teams) => {
    if (team === Teams.RED) {
      setRedPoints((prev) => prev + wordDificulty);
    }
    if (team === Teams.BLUE) {
      setBluePoints((prev) => prev + wordDificulty);
    }
    setVisible(false);
    newWord();
  };
  const handleWrong = () => {
    setVisible(false);
    newWord();
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };
  if (!visible) {
    return null;
  }
  return (
    <div className="m-auto min-w-xl h-full flex flex-col p-4 gap-8 z-10 bg-white">
      <div className="flex flex-col justify-between p-4 gap-8">
        <h3 className="text-2xl font-bold text-gray-400 bg-gray-200 px-6 py-2 rounded-xl text-center capitalize">
          Categoria: {word.categories}
        </h3>
        <h1
          className={`text-xl ${
            team === Teams.RED ? "text-red-500" : "text-blue-500"
          } capitalize text-center font-bold`}
        >
          {team === Teams.RED ? "Vermelho" : "Azul"}
        </h1>
        <p
          onClick={() => {
            setBlur((prev) => !prev);
          }}
          className={`text-5xl font-extrabold text-center capitalize cursor-pointer ${
            blur ? "blur-xl" : ""
          }`}
        >
          {word.word}
        </p>
        <p
          onClick={() => {
            setBlur((prev) => !prev);
          }}
          className="text-xs text-center"
        >
          Click para esconder a palavra
        </p>
        <div className="flex justify-center rounded-md">
          <span className="text-8xl text-red-500 font-bold ">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex justify-center gap-4">
          <p className="text-lg">
            Vale{" "}
            {`${
              word.difficulty > 1
                ? `${word.difficulty} pontos`
                : `${word.difficulty} ponto`
            }`}
          </p>
        </div>
        <button
          onClick={() => handleCorrect(word.difficulty, team)}
          className="text-4xl border-2 bg-green-500 text-green-900 rounded-lg p-4"
        >
          Acertou
        </button>
        <button
          onClick={handleWrong}
          className="text-4xl border-2 bg-red-500 text-red-900 rounded-lg p-4"
        >
          Errou
        </button>
      </div>
    </div>
  );
}

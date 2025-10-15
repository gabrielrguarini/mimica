// store/useGameStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Teams } from "@/types/teams";

interface UsedWord {
  word: string;
  index: number;
}

interface GameState {
  redPoints: number;
  bluePoints: number;
  team: Teams;
  indexWord: number;
  usedWords: UsedWord[];
  setRedPoints: (points: number) => void;
  setBluePoints: (points: number) => void;
  setTeam: (team: Teams) => void;
  setIndexWord: (index: number) => void;
  addUsedWord: (word: UsedWord) => void;
  setUsedWords: (words: UsedWord[]) => void;
  resetGame: () => void;
  previousWord: string | null;
  setPreviousWord: (word: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      redPoints: 0,
      bluePoints: 0,
      team: Teams.BLUE,
      indexWord: 0,
      usedWords: [],
      setRedPoints: (points) => set({ redPoints: points }),
      setBluePoints: (points) => set({ bluePoints: points }),
      setTeam: (team) => set({ team }),
      setIndexWord: (index) => set({ indexWord: index }),
      addUsedWord: (word) =>
        set((state) => ({ usedWords: [...state.usedWords, word] })),
      setUsedWords: (words) => set({ usedWords: words }),
      resetGame: () =>
        set((state) => ({
          redPoints: 0,
          bluePoints: 0,
          team: Teams.BLUE,
          indexWord: state.indexWord,
          previousWord: null,
        })),
      previousWord: null,
      setPreviousWord: (word) => set({ previousWord: word }),
    }),
    {
      name: "mimica-game-storage",
    }
  )
);

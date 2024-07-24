import { useRef } from "react";

export default function useAudio(url: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current = new Audio(url);
    }
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { playAudio, stopAudio };
}

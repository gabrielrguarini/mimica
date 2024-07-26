import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";

export default function SettingsWrapper({
  timeLeft,
  setTimeLeft,
  setVisible,
  setIsDark,
  isDark,
}: {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState(timeLeft);
  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-min-full drop-shadow-2xl p-4 bg-white dark:bg-slate-800 dark:text-white rounded-xl">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <div className="flex flex-col gap-4  my-2">
        <Select onValueChange={(e) => setValue(Number(e))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue={value} placeholder="Selecione o tempo" />
          </SelectTrigger>
          <SelectContent className=" dark:bg-slate-800 dark:text-white">
            <SelectItem value="30">30 segundos</SelectItem>
            <SelectItem value="60">1 minuto</SelectItem>
            <SelectItem value="90">1:30 minutos</SelectItem>
            <SelectItem value="120">2 minutos</SelectItem>
            <SelectItem value="180">3 minutos</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 mb-2">
          <Switch
            checked={isDark}
            onClick={() => toggleDarkMode()}
            name="dark-mode"
          />
          <label htmlFor="dark-mode"> Dark Mode</label>
        </div>
      </div>
      <div className="flex justify-end gap-4 my-2">
        <button
          onClick={(e) => {
            setTimeLeft(value);
            setVisible(false);
          }}
          className="bg-slate-900 text-white px-4 py-2 rounded-md"
        >
          Salvar
        </button>
        <button
          className="border-2 border-slate-900 px-4 py-2 rounded-md"
          onClick={(e) => {
            setVisible(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

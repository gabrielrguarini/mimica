import { useState } from "react";

export default function SettingsWrapper({
  timeLeft,
  setTimeLeft,
  setVisible,
}: {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState(timeLeft);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-min-full drop-shadow-2xl p-4 bg-white rounded-xl">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <div className="flex mx-8 my-2">
        <input
          className="w-full"
          type="number"
          name="time"
          id="time"
          placeholder="Tempo em segundos"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <p>Segundos</p>
      </div>
      <div className="flex justify-end gap-4">
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

export function StartGame({
  onStartNewGame,
  onContinueGame,
  hasSavedGame,
}: {
  onStartNewGame: () => void;
  onContinueGame: () => void;
  hasSavedGame: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Jogo de Mímica</h1>
      <button
        className="mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
        onClick={onStartNewGame}
      >
        Começar Novo Jogo
      </button>
      {hasSavedGame && (
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
          onClick={onContinueGame}
        >
          Continuar Jogo
        </button>
      )}
    </div>
  );
}

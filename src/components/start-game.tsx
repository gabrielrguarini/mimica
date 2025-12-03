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
    <div className="flex items-center justify-center h-dvh bg-background/90">
      <div className="w-full max-w-md mx-auto p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl text-white text-center">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Jogo de Mímica</h1>

        <button
          className="mb-4 w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded-lg"
          onClick={onStartNewGame}
        >
          Começar Novo Jogo
        </button>

        {hasSavedGame && (
          <button
            className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold rounded-lg"
            onClick={onContinueGame}
          >
            Continuar Jogo
          </button>
        )}
      </div>
    </div>
  );
}

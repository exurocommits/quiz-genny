interface Props {
  roundCount: number;
  questionsPerRound: number;
  onRoundCountChange: (value: number) => void;
  onQuestionsPerRoundChange: (value: number) => void;
}

export function QuizStructureInputs({
  roundCount,
  questionsPerRound,
  onRoundCountChange,
  onQuestionsPerRoundChange,
}: Props) {
  const totalQuestions = roundCount * questionsPerRound;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Round Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many rounds?</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onRoundCountChange(Math.max(1, roundCount - 1))}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={12}
              value={roundCount}
              onChange={(e) => onRoundCountChange(parseInt(e.target.value) || 1)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-center font-semibold text-lg"
            />
            <button
              onClick={() => onRoundCountChange(Math.min(12, roundCount + 1))}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Questions Per Round */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Questions per round?
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuestionsPerRoundChange(Math.max(5, questionsPerRound - 1))}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
            >
              -
            </button>
            <input
              type="number"
              min={5}
              max={20}
              value={questionsPerRound}
              onChange={(e) => onQuestionsPerRoundChange(parseInt(e.target.value) || 5)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-center font-semibold text-lg"
            />
            <button
              onClick={() => onQuestionsPerRoundChange(Math.min(20, questionsPerRound + 1))}
              className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <p className="text-center text-lg">
          Your quiz will have{' '}
          <span className="font-bold text-blue-600">{totalQuestions} questions</span> across{' '}
          <span className="font-bold text-blue-600">{roundCount} rounds</span>
        </p>
      </div>
    </div>
  );
}

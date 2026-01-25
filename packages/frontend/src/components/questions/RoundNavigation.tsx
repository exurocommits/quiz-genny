interface Props {
  currentIndex: number;
  totalRounds: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function RoundNavigation({ currentIndex, totalRounds, onPrevious, onNext }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`
          px-4 py-2 rounded-lg font-semibold transition-colors
          ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }
        `}
      >
        ← Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalRounds }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              i === currentIndex
                ? 'bg-blue-600 text-white'
                : i < currentIndex
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentIndex === totalRounds - 1}
        className={`
          px-4 py-2 rounded-lg font-semibold transition-colors
          ${
            currentIndex === totalRounds - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }
        `}
      >
        Next →
      </button>
    </div>
  );
}

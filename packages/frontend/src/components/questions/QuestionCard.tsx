import type { Question } from '@quiz-genny/shared';

interface Props {
  question: Question;
  onAccept: (question: Question) => void;
  onReject: (question: Question) => void;
}

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
};

export function QuestionCard({ question, onAccept, onReject }: Props) {
  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 mb-2">{question.question}</p>
          <p className="text-md text-gray-700 mb-3">
            <span className="font-medium">Answer:</span> {question.answer}
          </p>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                DIFFICULTY_COLORS[question.difficultyBand]
              }`}
            >
              {question.difficultyBand.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onAccept(question)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            ✓ Accept
          </button>
          <button
            onClick={() => onReject(question)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            ✗ Reject
          </button>
        </div>
      </div>
    </div>
  );
}

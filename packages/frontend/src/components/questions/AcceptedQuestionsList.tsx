import type { Question } from '@quiz-genny/shared';

interface Props {
  questions: Question[];
  target: number;
  onRemove: (question: Question) => void;
  isComplete: boolean;
  onContinue: () => void;
}

const DIFFICULTY_COLORS = {
  easy: 'bg-green-500',
  medium: 'bg-amber-500',
  hard: 'bg-red-500',
};

export function AcceptedQuestionsList({
  questions,
  target,
  onRemove,
  isComplete,
  onContinue,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Accepted Questions ({questions.length}/{target})
      </h2>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto mb-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 group hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{question.question}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {question.answer.substring(0, 50)}
                  {question.answer.length > 50 ? '...' : ''}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-block w-16 h-1 rounded-full ${
                      DIFFICULTY_COLORS[question.difficultyBand]
                    }`}
                  />
                </div>
              </div>
              <button
                onClick={() => onRemove(question)}
                className="flex-shrink-0 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {isComplete && (
        <button
          onClick={onContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Next Round →
        </button>
      )}

      {!isComplete && (
        <div className="text-center text-sm text-gray-500">
          Select {target - questions.length} more question
          {target - questions.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

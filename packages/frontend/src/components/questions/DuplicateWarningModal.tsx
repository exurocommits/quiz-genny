import type { Question } from '@quiz-genny/shared';

interface DuplicateInfo {
  questionId: string;
  existingQuestion: Question;
  similarity: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  duplicateInfo: DuplicateInfo | null;
  newQuestion: Question | null;
  onAcceptAnyway: () => void;
}

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-red-100 text-red-800',
};

export function DuplicateWarningModal({
  isOpen,
  onClose,
  duplicateInfo,
  newQuestion,
  onAcceptAnyway,
}: Props) {
  if (!isOpen || !duplicateInfo || !newQuestion) {
    return null;
  }

  const { existingQuestion, similarity } = duplicateInfo;
  const similarityPercent = Math.round(similarity * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Duplicate Question Detected</h2>
                  <p className="text-amber-50 text-sm">
                    Similarity: <span className="font-semibold">{similarityPercent}%</span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-amber-100 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-amber-900 font-medium">
                This question appears to be very similar to one you've already accepted. Consider if
                this adds unique value to your quiz.
              </p>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Question */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    NEW QUESTION
                  </span>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Question</p>
                    <p className="text-lg font-semibold text-gray-900">{newQuestion.question}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Answer</p>
                    <p className="text-md text-gray-800">{newQuestion.answer}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        DIFFICULTY_COLORS[newQuestion.difficultyBand]
                      }`}
                    >
                      {newQuestion.difficultyBand.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Existing Question */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    ALREADY ACCEPTED
                  </span>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Question</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {existingQuestion.question}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Answer</p>
                    <p className="text-md text-gray-800">{existingQuestion.answer}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        DIFFICULTY_COLORS[existingQuestion.difficultyBand]
                      }`}
                    >
                      {existingQuestion.difficultyBand.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similarity indicator */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Similarity Score</p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    similarityPercent >= 80
                      ? 'bg-red-500'
                      : similarityPercent >= 60
                        ? 'bg-amber-500'
                        : 'bg-yellow-500'
                  }`}
                  style={{ width: `${similarityPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {similarityPercent >= 80 && 'Very high similarity - likely a duplicate'}
                {similarityPercent >= 60 &&
                  similarityPercent < 80 &&
                  'High similarity - consider carefully'}
                {similarityPercent < 60 && 'Moderate similarity'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onAcceptAnyway}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Accept Anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

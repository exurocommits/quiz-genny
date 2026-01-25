import { useState } from 'react';
import { useQuizStore } from '@/stores/quizStore';
import { MOCK_SECTIONS } from '@/utils/mockData';

export function PreviewPage() {
  const { config, rounds, presentation } = useQuizStore();
  const [title, setTitle] = useState(presentation.title);
  const [isExporting, setIsExporting] = useState(false);

  const allQuestions = rounds.flatMap((r) => r.questions.accepted);
  const totalQuestions = allQuestions.length;

  // Runtime calculator
  const estimatedMinutes = Math.ceil(
    (totalQuestions * 30 + // question time
      totalQuestions * 15 + // answer time
      rounds.length * 50 + // round overhead
      60) / // bookends
      60
  );

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const state = useQuizStore.getState();
      const response = await fetch('http://localhost:3001/api/export/pptx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('Quiz exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Preview Your Quiz</h1>
          <p className="text-gray-600">Review and export your quiz presentation</p>
        </div>

        {/* Quiz Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-2xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{totalQuestions}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{rounds.length}</div>
              <div className="text-sm text-gray-600">Rounds</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">~{estimatedMinutes}m</div>
              <div className="text-sm text-gray-600">Estimated Time</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-amber-600">{config.tone.split('_')[0]}</div>
              <div className="text-sm text-gray-600">Tone</div>
            </div>
          </div>
        </div>

        {/* Rounds Accordion */}
        <div className="space-y-4 mb-8">
          {rounds.map((round, index) => {
            const section = MOCK_SECTIONS.find((s) => s.id === round.sectionId);
            const questions = round.questions.accepted;

            return (
              <details key={index} className="bg-white rounded-xl shadow-lg">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 rounded-xl font-semibold text-lg flex items-center justify-between">
                  <span>
                    Round {index + 1}: {section?.name} ({questions.length} questions)
                  </span>
                  <span className="text-sm text-gray-500">Click to expand</span>
                </summary>
                <div className="px-6 pb-4 space-y-3">
                  {questions.map((q, qIndex) => (
                    <div key={q.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {qIndex + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1">{q.question}</p>
                          <p className="text-gray-700">
                            <span className="font-medium">A:</span> {q.answer}
                          </p>
                          <span
                            className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                              q.difficultyBand === 'easy'
                                ? 'bg-green-100 text-green-800'
                                : q.difficultyBand === 'medium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {q.difficultyBand.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>

        {/* Export Button */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`
              w-full py-6 rounded-xl font-bold text-xl transition-all duration-200
              ${
                isExporting
                  ? 'bg-gray-400 cursor-wait'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              }
              text-white
            `}
          >
            {isExporting ? '🔄 Generating PowerPoint...' : '📊 Export PowerPoint'}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Your quiz will be downloaded as a .pptx file
          </p>
        </div>
      </div>
    </div>
  );
}

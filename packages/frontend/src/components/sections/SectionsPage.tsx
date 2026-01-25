import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { MOCK_SECTIONS } from '@/utils/mockData';
import { SectionCard } from './SectionCard';
import type { Round } from '@quiz-genny/shared';

export function SectionsPage() {
  const navigate = useNavigate();
  const { config, sections, setPhase } = useQuizStore();
  const [selectedIds, setSelectedIds] = useState<string[]>(sections.selected);

  const requiredCount = config.roundCount;
  const isComplete = selectedIds.length === requiredCount;

  const toggleSection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      if (selectedIds.length < requiredCount) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleSurpriseMe = () => {
    // Simple algorithm: pick random balanced selection
    const shuffled = [...MOCK_SECTIONS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, requiredCount).map((s) => s.id);
    setSelectedIds(selected);
  };

  const handleContinue = () => {
    if (!isComplete) return;

    // Initialize rounds with selected sections
    const rounds: Round[] = selectedIds.map((sectionId) => ({
      sectionId,
      questions: {
        candidates: [],
        accepted: [],
      },
      difficultyDistribution: { easy: 0, medium: 0, hard: 0 },
      isComplete: false,
    }));

    useQuizStore.setState({
      sections: {
        ...sections,
        selected: selectedIds,
      },
      rounds,
      currentRoundIndex: 0,
    });

    setPhase('questions');
    navigate('/questions/0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Quiz Rounds</h1>
          <p className="text-gray-600">
            {config.roundCount} rounds × {config.questionsPerRound} questions ={' '}
            {config.roundCount * config.questionsPerRound} total | {config.difficultyTarget.easy}{' '}
            easy, {config.difficultyTarget.medium} medium, {config.difficultyTarget.hard} hard |{' '}
            {config.tone.replace('_', ' ')} tone
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {MOCK_SECTIONS.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isSelected={selectedIds.includes(section.id)}
              isSelectable={selectedIds.includes(section.id) || selectedIds.length < requiredCount}
              onClick={() => toggleSection(section.id)}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {selectedIds.length} of {requiredCount} rounds selected
              </div>
              <div className="flex gap-2 mt-2">
                {Array.from({ length: requiredCount }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < selectedIds.length ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSurpriseMe}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                🎲 Surprise Me
              </button>
              <button
                onClick={handleContinue}
                disabled={!isComplete}
                className={`
                  px-8 py-3 font-semibold rounded-lg transition-colors duration-200
                  ${
                    isComplete
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Continue to Questions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { SectionCard } from './SectionCard';
import type { Round, GenerateSectionsRequest, GenerateSectionsResponse } from '@quiz-genny/shared';

export function SectionsPage() {
  const navigate = useNavigate();
  const { config, sections, setPhase } = useQuizStore();
  const [selectedIds, setSelectedIds] = useState<string[]>(sections.selected);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requiredCount = config.roundCount;
  const isComplete = selectedIds.length === requiredCount;

  // Auto-generate sections on mount if none exist
  useEffect(() => {
    if (sections.generated.length === 0 && !isGenerating) {
      generateSections();
    }
  }, []); // Only run on mount

  const generateSections = async (userFeedback?: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const existingThemes = sections.generated.map((s) => s.name);

      const requestBody: GenerateSectionsRequest = {
        config,
        existingThemes,
        userFeedback,
      };

      const response = await fetch('http://localhost:3001/api/generate/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate sections: ${response.statusText}`);
      }

      const data: GenerateSectionsResponse = await response.json();

      // Update Zustand store with new sections
      useQuizStore.setState({
        sections: {
          generated: [...sections.generated, ...data.sections],
          selected: sections.selected,
          generationCount: sections.generationCount + 1,
        },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate sections';
      setError(errorMessage);
      console.error('Section generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

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
    const shuffled = [...sections.generated].sort(() => Math.random() - 0.5);
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

  // Show loading screen during initial generation
  if (isGenerating && sections.generated.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating quiz sections...</h2>
          <p className="text-gray-600">
            Creating {config.roundCount} unique rounds tailored to your preferences
          </p>
        </div>
      </div>
    );
  }

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
          <p className="text-sm text-purple-600 mt-2">
            Generated {sections.generated.length} sections ({sections.generationCount} batches)
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
            <p className="text-red-800 font-semibold">Error: {error}</p>
            <button
              onClick={() => generateSections()}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sections.generated.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isSelected={selectedIds.includes(section.id)}
              isSelectable={selectedIds.includes(section.id) || selectedIds.length < requiredCount}
              onClick={() => toggleSection(section.id)}
            />
          ))}
        </div>

        {/* Generate More Button */}
        <div className="mb-8">
          <button
            onClick={() => generateSections()}
            disabled={isGenerating}
            className={`
              w-full px-6 py-4 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2
              ${
                isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }
            `}
          >
            {isGenerating && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            )}
            {isGenerating ? 'Generating More Sections...' : '+ Generate More Sections'}
          </button>
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

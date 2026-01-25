import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import type {
  AudiencePreset,
  QuizTone,
  AnswerRevealFrequency,
  DifficultyDistribution,
} from '@quiz-genny/shared';
import { AudiencePresetSelector } from './AudiencePresetSelector';
import { AudienceTagCloud } from './AudienceTagCloud';
import { ToneSelector } from './ToneSelector';
import { QuizStructureInputs } from './QuizStructureInputs';
import { DifficultyDistributionSelector } from './DifficultyDistributionSelector';
import { AnswerRevealSelector } from './AnswerRevealSelector';

export function SetupPage() {
  const navigate = useNavigate();
  const { config, setPhase } = useQuizStore();

  const [audiencePreset, setAudiencePreset] = useState<AudiencePreset>(config.audiencePreset);
  const [audienceAttributes, setAudienceAttributes] = useState<string[]>(config.audienceAttributes);
  const [tone, setTone] = useState<QuizTone>(config.tone);
  const [roundCount, setRoundCount] = useState(config.roundCount);
  const [questionsPerRound, setQuestionsPerRound] = useState(config.questionsPerRound);
  const [difficultyTarget, setDifficultyTarget] = useState<DifficultyDistribution>(
    config.difficultyTarget
  );
  const [answerRevealFrequency, setAnswerRevealFrequency] = useState<AnswerRevealFrequency>(
    config.answerRevealFrequency
  );
  const [contextNotes, setContextNotes] = useState(config.contextNotes);

  const handleStartBuilding = () => {
    // Validate
    if (roundCount < 1 || questionsPerRound < 5) {
      alert('Please ensure you have at least 1 round with 5 questions per round');
      return;
    }

    const total = difficultyTarget.easy + difficultyTarget.medium + difficultyTarget.hard;
    if (total !== questionsPerRound) {
      alert('Difficulty distribution must sum to questions per round');
      return;
    }

    // Save to store
    useQuizStore.setState({
      config: {
        audiencePreset,
        audienceAttributes,
        tone,
        roundCount,
        questionsPerRound,
        difficultyTarget,
        answerRevealFrequency,
        contextNotes,
      },
    });

    setPhase('sections');
    navigate('/sections');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Setup Your Quiz</h1>
          <p className="text-gray-600 mb-8">Configure your quiz settings to get started</p>

          <div className="space-y-10">
            {/* Audience Preset */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Audience Type</h2>
              <AudiencePresetSelector value={audiencePreset} onChange={setAudiencePreset} />
            </section>

            {/* Audience Attributes */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Audience Attributes</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select 5-10 tags that best describe your audience
              </p>
              <AudienceTagCloud
                selectedTags={audienceAttributes}
                onChange={setAudienceAttributes}
              />
            </section>

            {/* Tone */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Tone</h2>
              <ToneSelector value={tone} onChange={setTone} />
            </section>

            {/* Quiz Structure */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Structure</h2>
              <QuizStructureInputs
                roundCount={roundCount}
                questionsPerRound={questionsPerRound}
                onRoundCountChange={setRoundCount}
                onQuestionsPerRoundChange={setQuestionsPerRound}
              />
            </section>

            {/* Difficulty Distribution */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Difficulty Distribution</h2>
              <DifficultyDistributionSelector
                value={difficultyTarget}
                questionsPerRound={questionsPerRound}
                onChange={setDifficultyTarget}
              />
            </section>

            {/* Answer Reveal */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Answer Reveal Timing</h2>
              <AnswerRevealSelector
                value={answerRevealFrequency}
                onChange={setAnswerRevealFrequency}
              />
            </section>

            {/* Context Notes */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Additional Context (Optional)
              </h2>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                maxLength={500}
                placeholder="Any other context? E.g., 'It's a birthday party for someone turning 40' or 'Avoid questions about Company X, they're a competitor'"
                value={contextNotes}
                onChange={(e) => setContextNotes(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">{contextNotes.length}/500 characters</p>
            </section>

            {/* Start Button */}
            <div className="pt-6">
              <button
                onClick={handleStartBuilding}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-colors duration-200"
              >
                Start Building Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

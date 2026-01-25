import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { generateMockQuestions, MOCK_SECTIONS } from '@/utils/mockData';
import type { Question } from '@quiz-genny/shared';
import { QuestionCard } from './QuestionCard';
import { AcceptedQuestionsList } from './AcceptedQuestionsList';
import { DifficultyDistributionBar } from '../shared/DifficultyDistributionBar';
import { RoundNavigation } from './RoundNavigation';

export function QuestionsPage() {
  const navigate = useNavigate();
  const { roundIndex } = useParams<{ roundIndex: string }>();
  const currentRoundIndex = parseInt(roundIndex || '0');

  const { config, rounds, setPhase } = useQuizStore();
  const currentRound = rounds[currentRoundIndex];
  const section = MOCK_SECTIONS.find((s) => s.id === currentRound?.sectionId);

  const [candidates, setCandidates] = useState<Question[]>([]);
  const [accepted, setAccepted] = useState<Question[]>(currentRound?.questions.accepted || []);

  // Load candidates on mount
  useEffect(() => {
    if (currentRound && candidates.length === 0) {
      const mockQuestions = generateMockQuestions(currentRound.sectionId, 15);
      setCandidates(mockQuestions);
    }
  }, [currentRound, candidates.length]);

  // Save to store when accepted changes
  useEffect(() => {
    if (currentRound) {
      const newRounds = [...rounds];
      newRounds[currentRoundIndex] = {
        ...currentRound,
        questions: {
          ...currentRound.questions,
          accepted,
        },
        difficultyDistribution: calculateCurrentDistribution(accepted),
        isComplete: accepted.length === config.questionsPerRound,
      };
      useQuizStore.setState({ rounds: newRounds });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted]);

  const handleAccept = (question: Question) => {
    if (accepted.length < config.questionsPerRound) {
      setAccepted([...accepted, question]);
      setCandidates(candidates.filter((q) => q.id !== question.id));
    }
  };

  const handleReject = (question: Question) => {
    setCandidates(candidates.filter((q) => q.id !== question.id));
  };

  const handleRemove = (question: Question) => {
    setAccepted(accepted.filter((q) => q.id !== question.id));
  };

  const handleNextRound = () => {
    if (currentRoundIndex < rounds.length - 1) {
      navigate(`/questions/${currentRoundIndex + 1}`);
    } else {
      // All rounds complete
      setPhase('preview');
      navigate('/preview');
    }
  };

  const handlePreviousRound = () => {
    if (currentRoundIndex > 0) {
      navigate(`/questions/${currentRoundIndex - 1}`);
    }
  };

  const currentDistribution = calculateCurrentDistribution(accepted);
  const gaps = calculateGaps(currentDistribution, config.difficultyTarget);

  if (!currentRound || !section) {
    return <div>Loading...</div>;
  }

  const isRoundComplete = accepted.length === config.questionsPerRound;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Round {currentRoundIndex + 1} of {rounds.length}: {section.name}
              </h1>
              <p className="text-gray-600">{section.description}</p>
            </div>
            <RoundNavigation
              currentIndex={currentRoundIndex}
              totalRounds={rounds.length}
              onPrevious={handlePreviousRound}
              onNext={handleNextRound}
            />
          </div>

          {/* Difficulty Tracker */}
          <DifficultyDistributionBar
            current={currentDistribution}
            target={config.difficultyTarget}
          />

          {/* Gap Analysis */}
          {gaps && (
            <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">{gaps}</p>
            </div>
          )}
        </div>

        {/* Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Candidates Panel (60%) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Question Candidates ({candidates.length} available)
              </h2>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                {candidates.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))}
                {candidates.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p>No more candidates available.</p>
                    <button className="mt-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                      Generate More (Coming in Phase 2)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Accepted Panel (40%) */}
          <div className="lg:col-span-2">
            <AcceptedQuestionsList
              questions={accepted}
              target={config.questionsPerRound}
              onRemove={handleRemove}
              isComplete={isRoundComplete}
              onContinue={handleNextRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateCurrentDistribution(questions: Question[]) {
  return questions.reduce(
    (acc, q) => {
      acc[q.difficultyBand]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );
}

function calculateGaps(
  current: { easy: number; medium: number; hard: number },
  target: { easy: number; medium: number; hard: number }
): string | null {
  const easyGap = target.easy - current.easy;
  const mediumGap = target.medium - current.medium;
  const hardGap = target.hard - current.hard;

  const gaps: string[] = [];
  if (easyGap > 0) gaps.push(`${easyGap} more easy`);
  if (mediumGap > 0) gaps.push(`${mediumGap} more medium`);
  if (hardGap > 0) gaps.push(`${hardGap} more hard`);

  if (gaps.length === 0) return 'Round complete! Review your questions or continue.';
  return `You need ${gaps.join(', ')} question${gaps.length > 1 ? 's' : ''}`;
}

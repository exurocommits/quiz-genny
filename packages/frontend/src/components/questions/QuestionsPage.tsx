import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import type {
  Question,
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
  DifficultyDistribution,
  DuplicateCheckRequest,
  DuplicateCheckResponse,
} from '@quiz-genny/shared';
import { QuestionCard } from './QuestionCard';
import { AcceptedQuestionsList } from './AcceptedQuestionsList';
import { DifficultyDistributionBar } from '../shared/DifficultyDistributionBar';
import { RoundNavigation } from './RoundNavigation';
import { DuplicateWarningModal } from './DuplicateWarningModal';

export function QuestionsPage() {
  const navigate = useNavigate();
  const { roundIndex } = useParams<{ roundIndex: string }>();
  const currentRoundIndex = parseInt(roundIndex || '0');

  const { config, rounds, sections, setPhase } = useQuizStore();
  const currentRound = rounds[currentRoundIndex];
  const section = sections.generated.find((s) => s.id === currentRound?.sectionId);

  const [candidates, setCandidates] = useState<Question[]>([]);
  const [accepted, setAccepted] = useState<Question[]>(currentRound?.questions.accepted || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [rejectedThemes, setRejectedThemes] = useState<string[]>([]);

  // Duplicate detection modal state
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<Question | null>(null);
  const [duplicateInfo, setDuplicateInfo] = useState<{
    questionId: string;
    existingQuestion: Question;
    similarity: number;
  } | null>(null);

  // Reset state when round changes
  useEffect(() => {
    setCandidates([]);
    setAccepted(currentRound?.questions.accepted || []);
    setRejectedThemes([]);
    setIsGenerating(false);
  }, [currentRoundIndex, currentRound]);

  // Auto-generate questions on mount if no candidates
  useEffect(() => {
    if (currentRound && section && candidates.length === 0 && !isGenerating) {
      generateQuestions(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, section]);

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

  const generateQuestions = async (isInitial: boolean = false) => {
    if (!section) return;

    setIsGenerating(true);
    setGenerationProgress(
      isInitial ? `Generating questions for ${section.name}...` : 'Generating more questions...'
    );

    try {
      // Calculate difficulty gaps
      const currentDistribution = calculateCurrentDistribution(accepted);
      const difficultyGaps: DifficultyDistribution = {
        easy: config.difficultyTarget.easy - currentDistribution.easy,
        medium: config.difficultyTarget.medium - currentDistribution.medium,
        hard: config.difficultyTarget.hard - currentDistribution.hard,
      };

      const requestBody: GenerateQuestionsRequest = {
        section,
        config,
        rejectedThemes,
        difficultyGaps,
        count: isInitial ? 15 : 10,
      };

      const response = await fetch('http://localhost:3001/api/generate/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate questions: ${response.statusText}`);
      }

      const data: GenerateQuestionsResponse = await response.json();

      if (isInitial) {
        setCandidates(data.questions);
      } else {
        setCandidates([...candidates, ...data.questions]);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  const handleAccept = async (question: Question) => {
    if (accepted.length >= config.questionsPerRound) {
      return;
    }

    // Check for duplicates before accepting
    try {
      const requestBody: DuplicateCheckRequest = {
        newQuestions: [question],
        existingQuestions: accepted,
      };

      const response = await fetch('http://localhost:3001/api/verify/duplicate-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Duplicate check failed: ${response.statusText}`);
      }

      const data: DuplicateCheckResponse = await response.json();

      // If duplicates found, show modal
      if (data.duplicates && data.duplicates.length > 0) {
        const duplicate = data.duplicates[0];
        const existingQuestion = accepted.find((q) => q.id === duplicate.existingId);

        if (existingQuestion) {
          setPendingQuestion(question);
          setDuplicateInfo({
            questionId: duplicate.newId,
            existingQuestion,
            similarity: duplicate.similarity,
          });
          setShowDuplicateModal(true);
          return; // Don't accept yet, wait for user decision
        }
      }

      // No duplicates found, accept normally
      acceptQuestion(question);
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      // On error, accept anyway (don't block the user)
      acceptQuestion(question);
    }
  };

  const acceptQuestion = (question: Question) => {
    setAccepted([...accepted, question]);
    setCandidates(candidates.filter((q) => q.id !== question.id));
  };

  const handleAcceptAnyway = () => {
    if (pendingQuestion) {
      // Mark as duplicate acknowledged and accept
      const questionWithDuplicateFlag = {
        ...pendingQuestion,
        duplicateOf: duplicateInfo?.existingQuestion.id,
        duplicateAcknowledged: true,
      };
      acceptQuestion(questionWithDuplicateFlag);
    }

    // Close modal and reset state
    setShowDuplicateModal(false);
    setPendingQuestion(null);
    setDuplicateInfo(null);
  };

  const handleCancelDuplicate = () => {
    // Just close modal, don't accept the question
    setShowDuplicateModal(false);
    setPendingQuestion(null);
    setDuplicateInfo(null);
  };

  const handleReject = (question: Question) => {
    // Track rejected question theme
    setRejectedThemes([...rejectedThemes, question.question]);
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Question Candidates ({candidates.length} available)
                </h2>
                {!isGenerating && candidates.length > 0 && (
                  <button
                    onClick={() => generateQuestions(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Generate More
                  </button>
                )}
              </div>

              {/* Loading State */}
              {isGenerating && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 font-medium">{generationProgress}</p>
                </div>
              )}

              {/* Question List */}
              {!isGenerating && (
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
                      <button
                        onClick={() => generateQuestions(false)}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Generate More
                      </button>
                    </div>
                  )}
                </div>
              )}
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

        {/* Duplicate Warning Modal */}
        <DuplicateWarningModal
          isOpen={showDuplicateModal}
          onClose={handleCancelDuplicate}
          duplicateInfo={duplicateInfo}
          newQuestion={pendingQuestion}
          onAcceptAnyway={handleAcceptAnyway}
        />
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

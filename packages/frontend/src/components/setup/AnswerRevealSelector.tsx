import type { AnswerRevealFrequency } from '@quiz-genny/shared';

interface Props {
  value: AnswerRevealFrequency;
  onChange: (value: AnswerRevealFrequency) => void;
}

const OPTIONS: Array<{
  value: AnswerRevealFrequency;
  label: string;
  description: string;
}> = [
  {
    value: 'after_each_round',
    label: 'After each round',
    description: 'Answers shown at end of each round',
  },
  {
    value: 'after_two_rounds',
    label: 'After every 2 rounds',
    description: 'Answers batched for two rounds',
  },
  {
    value: 'at_end',
    label: 'At the end',
    description: 'All answers at the end of the quiz',
  },
];

export function AnswerRevealSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all duration-200
            ${
              value === option.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-blue-300 hover:shadow'
            }
          `}
        >
          <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
          <div className="text-sm text-gray-600">{option.description}</div>
        </button>
      ))}
    </div>
  );
}

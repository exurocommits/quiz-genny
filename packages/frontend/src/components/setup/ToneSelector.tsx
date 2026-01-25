import type { QuizTone } from '@quiz-genny/shared';

interface Props {
  value: QuizTone;
  onChange: (value: QuizTone) => void;
}

const TONES: Array<{
  value: QuizTone;
  label: string;
  example: string;
}> = [
  {
    value: 'casual_witty',
    label: 'Casual / Witty',
    example: 'Which pop princess told us to "Hit me baby one more time"?',
  },
  {
    value: 'formal_professional',
    label: 'Formal / Professional',
    example: 'Which artist released the 1998 single "Baby One More Time"?',
  },
  {
    value: 'family_friendly',
    label: 'Family-Friendly',
    example: 'Which famous singer had a big hit song called "Baby One More Time"?',
  },
  {
    value: 'pub_banter',
    label: 'Pub Banter',
    example: 'Which 90s icon asked us to hit her one more time and somehow meant it innocently?',
  },
];

export function ToneSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      {TONES.map((tone) => (
        <button
          key={tone.value}
          onClick={() => onChange(tone.value)}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all duration-200
            ${
              value === tone.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-blue-300 hover:shadow'
            }
          `}
        >
          <div className="font-semibold text-gray-900 mb-1">{tone.label}</div>
          <div className="text-sm text-gray-600 italic">Example: "{tone.example}"</div>
        </button>
      ))}
    </div>
  );
}

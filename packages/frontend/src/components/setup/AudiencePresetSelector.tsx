import type { AudiencePreset } from '@quiz-genny/shared';

interface Props {
  value: AudiencePreset;
  onChange: (value: AudiencePreset) => void;
}

const PRESETS: Array<{
  value: AudiencePreset;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'casual_social',
    label: 'Casual Social',
    description: 'Friends at a house party, mixed knowledge levels',
    icon: '🎉',
  },
  {
    value: 'competitive_league',
    label: 'Competitive League',
    description: 'Experienced quizzers, expects challenge',
    icon: '🏆',
  },
  {
    value: 'corporate',
    label: 'Corporate Event',
    description: 'Professional context, mixed departments',
    icon: '💼',
  },
  {
    value: 'international',
    label: 'International / Backpacker',
    description: 'Diverse cultural backgrounds',
    icon: '🌍',
  },
  {
    value: 'family_friendly',
    label: 'Family-Friendly',
    description: 'All ages including children',
    icon: '👨‍👩‍👧‍👦',
  },
];

export function AudiencePresetSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {PRESETS.map((preset) => (
        <button
          key={preset.value}
          onClick={() => onChange(preset.value)}
          className={`
            p-4 rounded-lg border-2 text-left transition-all duration-200
            ${
              value === preset.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-blue-300 hover:shadow'
            }
          `}
        >
          <div className="text-3xl mb-2">{preset.icon}</div>
          <h3 className="font-semibold text-gray-900 mb-1">{preset.label}</h3>
          <p className="text-sm text-gray-600">{preset.description}</p>
        </button>
      ))}
    </div>
  );
}

import { useState } from 'react';
import type { DifficultyDistribution } from '@quiz-genny/shared';

interface Props {
  value: DifficultyDistribution;
  questionsPerRound: number;
  onChange: (value: DifficultyDistribution) => void;
}

type PresetName = 'accessible' | 'balanced' | 'challenging' | 'custom';

const PRESETS: Record<
  Exclude<PresetName, 'custom'>,
  { label: string; description: string; getDistribution: (total: number) => DifficultyDistribution }
> = {
  accessible: {
    label: 'Accessible',
    description: 'Social, charity, family',
    getDistribution: (total) => {
      const easy = Math.floor(total * 0.6);
      const medium = Math.floor(total * 0.3);
      const hard = total - easy - medium;
      return { easy, medium, hard };
    },
  },
  balanced: {
    label: 'Balanced',
    description: 'General pub quiz',
    getDistribution: (total) => {
      const easy = Math.floor(total * 0.4);
      const medium = Math.floor(total * 0.4);
      const hard = total - easy - medium;
      return { easy, medium, hard };
    },
  },
  challenging: {
    label: 'Challenging',
    description: 'League, competitive',
    getDistribution: (total) => {
      const easy = Math.floor(total * 0.2);
      const medium = Math.floor(total * 0.4);
      const hard = total - easy - medium;
      return { easy, medium, hard };
    },
  },
};

export function DifficultyDistributionSelector({ value, questionsPerRound, onChange }: Props) {
  const [mode, setMode] = useState<PresetName>('balanced');

  const handlePresetClick = (preset: Exclude<PresetName, 'custom'>) => {
    setMode(preset);
    onChange(PRESETS[preset].getDistribution(questionsPerRound));
  };

  const handleCustomChange = (key: keyof DifficultyDistribution, val: number) => {
    const newValue = { ...value, [key]: val };
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {Object.entries(PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => handlePresetClick(key as Exclude<PresetName, 'custom'>)}
            className={`
              p-3 rounded-lg border-2 text-left transition-all duration-200
              ${
                mode === key
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-300 hover:border-blue-300'
              }
            `}
          >
            <div className="font-semibold text-gray-900 text-sm">{preset.label}</div>
            <div className="text-xs text-gray-600">{preset.description}</div>
          </button>
        ))}
        <button
          onClick={() => setMode('custom')}
          className={`
            p-3 rounded-lg border-2 text-left transition-all duration-200
            ${
              mode === 'custom'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-blue-300'
            }
          `}
        >
          <div className="font-semibold text-gray-900 text-sm">Custom</div>
          <div className="text-xs text-gray-600">Manual sliders</div>
        </button>
      </div>

      {/* Custom Sliders */}
      {mode === 'custom' && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Easy: {value.easy}
            </label>
            <input
              type="range"
              min={0}
              max={questionsPerRound}
              value={value.easy}
              onChange={(e) => handleCustomChange('easy', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medium: {value.medium}
            </label>
            <input
              type="range"
              min={0}
              max={questionsPerRound}
              value={value.medium}
              onChange={(e) => handleCustomChange('medium', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hard: {value.hard}
            </label>
            <input
              type="range"
              min={0}
              max={questionsPerRound}
              value={value.hard}
              onChange={(e) => handleCustomChange('hard', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Visual Bar */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex h-8 rounded-lg overflow-hidden">
          <div
            className="bg-green-500 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${(value.easy / questionsPerRound) * 100}%` }}
          >
            {value.easy > 0 && value.easy}
          </div>
          <div
            className="bg-amber-500 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${(value.medium / questionsPerRound) * 100}%` }}
          >
            {value.medium > 0 && value.medium}
          </div>
          <div
            className="bg-red-500 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${(value.hard / questionsPerRound) * 100}%` }}
          >
            {value.hard > 0 && value.hard}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Easy ({value.easy})</span>
          <span>Medium ({value.medium})</span>
          <span>Hard ({value.hard})</span>
        </div>
      </div>
    </div>
  );
}

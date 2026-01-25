import type { DifficultyDistribution } from '@quiz-genny/shared';

interface Props {
  current: DifficultyDistribution;
  target: DifficultyDistribution;
}

export function DifficultyDistributionBar({ current, target }: Props) {
  const total = target.easy + target.medium + target.hard;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Difficulty Distribution</span>
        <span>
          {current.easy + current.medium + current.hard} / {total} questions
        </span>
      </div>

      {/* Visual Bar */}
      <div className="relative">
        {/* Target (background) */}
        <div className="flex h-6 rounded-lg overflow-hidden bg-gray-200">
          <div className="bg-green-200" style={{ width: `${(target.easy / total) * 100}%` }} />
          <div className="bg-amber-200" style={{ width: `${(target.medium / total) * 100}%` }} />
          <div className="bg-red-200" style={{ width: `${(target.hard / total) * 100}%` }} />
        </div>

        {/* Current (foreground) */}
        <div className="flex h-6 rounded-lg overflow-hidden absolute top-0 left-0">
          <div
            className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${(current.easy / total) * 100}%` }}
          >
            {current.easy > 0 && current.easy}
          </div>
          <div
            className="bg-amber-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${(current.medium / total) * 100}%` }}
          >
            {current.medium > 0 && current.medium}
          </div>
          <div
            className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${(current.hard / total) * 100}%` }}
          >
            {current.hard > 0 && current.hard}
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-600">
        <span>
          Easy: {current.easy}/{target.easy}
        </span>
        <span>
          Medium: {current.medium}/{target.medium}
        </span>
        <span>
          Hard: {current.hard}/{target.hard}
        </span>
      </div>
    </div>
  );
}

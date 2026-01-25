import type { Section } from '@quiz-genny/shared';

interface Props {
  section: Section;
  isSelected: boolean;
  isSelectable: boolean;
  onClick: () => void;
}

const DIFFICULTY_COLORS = {
  tends_easy: 'bg-green-100 text-green-800 border-green-300',
  tends_medium: 'bg-amber-100 text-amber-800 border-amber-300',
  tends_hard: 'bg-red-100 text-red-800 border-red-300',
  mixed: 'bg-gray-100 text-gray-800 border-gray-300',
};

export function SectionCard({ section, isSelected, isSelectable, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={!isSelectable}
      className={`
        p-5 rounded-xl border-2 text-left transition-all duration-200 relative
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
            : isSelectable
              ? 'border-gray-300 hover:border-blue-300 hover:shadow-md hover:transform hover:scale-102'
              : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
        }
      `}
    >
      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
      )}

      {/* Category Tag */}
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">{section.category}</div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{section.name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3">{section.description}</p>

      {/* Difficulty Badge */}
      <div
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
          DIFFICULTY_COLORS[section.estimatedDifficulty]
        }`}
      >
        {section.estimatedDifficulty.replace('tends_', '').replace('_', ' ')}
      </div>
    </button>
  );
}

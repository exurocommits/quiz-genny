import { AUDIENCE_TAGS } from '@/utils/mockData';

interface Props {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function AudienceTagCloud({ selectedTags, onChange }: Props) {
  const allTags = [
    ...AUDIENCE_TAGS.interests,
    ...AUDIENCE_TAGS.demographics,
    ...AUDIENCE_TAGS.context,
    ...AUDIENCE_TAGS.geography,
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {tag}
            {isSelected && ' ✓'}
          </button>
        );
      })}
    </div>
  );
}

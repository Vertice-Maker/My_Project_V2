
import React from 'react';
import { SUGGESTED_PROMPTS } from '../constants';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="mb-4 flex flex-wrap justify-center gap-2">
      {SUGGESTED_PROMPTS.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick(prompt)}
          className="bg-white/70 text-purple-700 text-sm font-semibold py-2 px-4 rounded-full border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

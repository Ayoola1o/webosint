import { useState } from 'react';

interface SearchInputProps {
  onSearch: (input: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [input, setInput] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Enter your email"
        className="w-full p-4 rounded-lg border border-gray-300"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(input)}
      />
      <button
        className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        onClick={() => onSearch(input)}
      >
        Check Now
      </button>
    </div>
  );
}
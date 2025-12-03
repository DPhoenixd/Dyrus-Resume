import React, { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

interface EditableProps {
  value: string;
  isEditing: boolean;
  onChange: (newValue: string) => void;
  multiline?: boolean;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const Editable: React.FC<EditableProps> = ({
  value,
  isEditing,
  onChange,
  multiline = false,
  className = '',
  tag: Tag = 'span',
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          value={localValue}
          onChange={handleChange}
          className={`w-full bg-zinc-800/50 border border-zinc-700 rounded p-2 text-zinc-100 outline-none focus:border-blue-500 transition-colors ${className}`}
          rows={4}
        />
      );
    }
    return (
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        className={`w-full bg-zinc-800/50 border border-zinc-700 rounded px-2 py-1 text-zinc-100 outline-none focus:border-blue-500 transition-colors ${className}`}
      />
    );
  }

  return (
    <Tag className={`relative group ${className}`}>
      {localValue}
    </Tag>
  );
};

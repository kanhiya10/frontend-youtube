import React from 'react';

interface CommentFormProps {
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ value, setValue, onSubmit, placeholder }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "Write a comment..."}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        rows={3}
      />
      <button
        onClick={onSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default CommentForm;

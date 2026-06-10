import React, { useState } from 'react';
import { useTheme } from '../../../context/themeContext';
import { Topic } from '../../../types/types';
import { createTopic } from '../../../services/notification';
import { useStyles } from '../../../utils/styleImports';

export const CreateTopicCard = ({ topics, setTopics }: { topics: Topic[], setTopics: React.Dispatch<React.SetStateAction<Topic[]>> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    name: '',
    displayName: '',
    description: '',
    icon: '',
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const { theme } = useTheme();
    const { inputStylev2, button, hover } = useStyles();

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newTopic.name.trim().toLowerCase());
      formData.append('displayName', newTopic.displayName);
      formData.append('description', newTopic.description);
      if (iconFile) formData.append('icon', iconFile);

      const res = await createTopic(formData);
      const createdTopic: Topic = res.data.data;
      setTopics((prev) => [...prev, { ...createdTopic, subscriberCount: 0 }]);
      setNewTopic({ name: "", displayName: "", description: "", icon: "" });
      setIconFile(null);
    } catch (err) {
      console.error("Failed to create topic:", err);
    }
  };

//   const inputStyle = {
//     backgroundColor: theme.inputBackground,
//     borderColor: theme.inputBorder,
//     color: theme.text,
//   };
//   const buttonStyle = {
//     backgroundColor: theme.success,
//     color: theme.text,
//   };
//   const hoverStyle = {
//     backgroundColor: theme.hover,
//   };

  return (
    <div
      className="mt-4 border rounded-lg overflow-hidden shadow-sm"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left transition-colors flex items-center justify-between"
        style={{ ...hover, color: theme.text, backgroundColor: theme.surface }}
      >
        <span className="font-semibold" style={{ color: theme.secondary }}>Create New Topic</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: theme.textSecondary }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 border-t" style={{ borderColor: theme.border }}>
          <form onSubmit={handleCreateTopic} className="space-y-3">
            <input
              type="text"
              placeholder="Name (unique)"
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
              required
            />
            <input
              type="text"
              placeholder="Display Name"
              value={newTopic.displayName}
              onChange={(e) => setNewTopic({ ...newTopic, displayName: e.target.value })}
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => setIconFile(e.target.files?.[0] || null)}
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
            />
            <button
              type="submit"
              className="w-full py-2 px-4 rounded transition-colors"
              style={button}
            >
              Create Topic
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

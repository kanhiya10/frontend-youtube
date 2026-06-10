import React from 'react';
import { useTheme } from '../../../context/themeContext';
import { Topic } from '../../../types/types';
import chat from '../../../assets/images/chat.jpg';

interface Props {
  topics: Topic[];
  subscriptions: Record<string, boolean>;
  handleToggle: (topic: string) => void;
}

export default function TopicList({ topics, subscriptions, handleToggle }: Props) {
  const { theme } = useTheme();

  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2" style={{ color: theme.secondary }}>Subscribe to Topics</h2>
      {topics.map((t) => (
        <div key={t._id} className="flex items-center mb-3">
          <input
            type="checkbox"
            id={t.name}
            checked={subscriptions[t.name] || false}
            onChange={() => handleToggle(t.name)}
            style={{
              accentColor: theme.info,
            }}
          />
          <img
            src={t.icon || chat}
            alt={t.displayName}
            className="ml-3 w-6 h-6 rounded object-cover"
          />
          <label htmlFor={t.name} className="ml-2 capitalize" style={{ color: theme.text }}>
            {t.displayName} ({t.subscriberCount})
          </label>
        </div>
      ))}
    </div>
  );
}
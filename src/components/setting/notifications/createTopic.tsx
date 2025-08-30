import React, { useState } from 'react';
import axios from 'axios';
import { Topic } from '../../../types/types';

export const CreateTopicCard = ({ topics, setTopics }: { topics: Topic[], setTopics: React.Dispatch<React.SetStateAction<Topic[]>> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    name: '',
    displayName: '',
    description: '',
    icon: '', // will hold the uploaded file URL
  });
  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newTopic.name.trim().toLowerCase());
      formData.append('displayName', newTopic.displayName);
      formData.append('description', newTopic.description);
      if (iconFile) formData.append('icon', iconFile);

      const res = await axios.post(
        "https://backend-youtube-zba1.onrender.com/api/v1/notifications/create-topic",
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const createdTopic: Topic = res.data.data;
      setTopics((prev) => [...prev, { ...createdTopic, subscriberCount: 0 }]);
      setNewTopic({ name: "", displayName: "", description: "", icon: "" });
      setIconFile(null);
    } catch (err) {
      console.error("Failed to create topic:", err);
    }
  };

  return (
    <div className="mt-4 border rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
      >
        <span className="font-semibold text-gray-800">Create New Topic</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t">
          <form onSubmit={handleCreateTopic} className="space-y-3">
            <input
              type="text"
              placeholder="Name (unique)"
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Display Name"
              value={newTopic.displayName}
              onChange={(e) => setNewTopic({ ...newTopic, displayName: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => setIconFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Create Topic
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

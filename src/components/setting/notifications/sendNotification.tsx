import React, { useState } from 'react';
import axios from 'axios';



export const SendNotificationCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    topicName: "",
    title: "",
    body: "",
    data: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload: {
        topicName: string;
        title: string;
        body: string;
        data?: any;
      } = {
        topicName: formData.topicName,
        title: formData.title,
        body: formData.body,
      };

      if (formData.data.trim()) {
        try {
          payload.data = JSON.parse(formData.data);
        } catch (err) {
          setMessage("Invalid JSON in data field");
          setLoading(false);
          return;
        }
      }

      const res = await axios.post(
        "https://backend-youtube-zba1.onrender.com/api/v1/notifications/send-topic-notification",
        payload,
        { withCredentials: true }
      );

      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(
          err.response?.data?.message || "❌ Failed to send notification"
        );
      } else {
        setMessage("❌ Failed to send notification");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
      >
        <span className="font-semibold text-gray-800">Send Topic Notification</span>
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
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="topicName"
              value={formData.topicName}
              onChange={handleChange}
              placeholder="Topic name"
              required
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Notification title"
              required
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Notification body"
              required
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <textarea
              name="data"
              value={formData.data}
              onChange={handleChange}
              placeholder='Optional data (JSON format, e.g. {"screen":"profile"})'
              className="w-full border border-gray-300 p-2 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded transition-colors"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
          {message && (
            <p className="mt-3 text-center text-sm font-medium">{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

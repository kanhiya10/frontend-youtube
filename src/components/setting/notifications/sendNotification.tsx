import React, { useState } from 'react';
import { useTheme } from '../../../context/themeContext';
import { sendTopicNotification } from '../../../services/notification';
import { AxiosError } from 'axios';
import { useStyles } from '../../../utils/styleImports';

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
  const { theme } = useTheme();
   const { inputStylev2, button, hover } = useStyles();

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

      const res = await sendTopicNotification(payload);

      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      if (err instanceof AxiosError) {
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

  // const inputStyle = {
  //   backgroundColor: theme.inputBackground,
  //   borderColor: theme.inputBorder,
  //   color: theme.text,
  // };
  // const buttonStyle = {
  //   backgroundColor: theme.info,
  //   color: theme.text,
  // };
  // const hoverStyle = {
  //   backgroundColor: theme.hover,
  // };

  return (
    <div
      className="mt-4 border rounded-lg overflow-hidden shadow-sm"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left transition-colors flex items-center justify-between"
        style={{ color: theme.text, ...hover, backgroundColor: theme.surface }}
      >
        <span className="font-semibold" style={{ color: theme.secondary }}>Send Topic Notification</span>
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
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="topicName"
              value={formData.topicName}
              onChange={handleChange}
              placeholder="Topic name"
              required
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Notification title"
              required
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
            />
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Notification body"
              required
              className="w-full p-2 rounded focus:ring-2 focus:border-transparent"
              rows={3}
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
            />
            <textarea
              name="data"
              value={formData.data}
              onChange={handleChange}
              placeholder='Optional data (JSON format, e.g. {"screen":"profile"})'
              className="w-full p-2 rounded font-mono text-sm focus:ring-2 focus:border-transparent"
              rows={2}
              style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded transition-colors"
              style={{ ...button, opacity: loading ? 0.5 : 1 }}
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
          {message && (
            <p className="mt-3 text-center text-sm font-medium" style={{ color: message.startsWith('❌') ? theme.error : theme.success }}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

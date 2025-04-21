import axios from 'axios';
import React, { useState, FormEvent, ChangeEvent } from 'react';

const Video: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [views, setViews] = useState<number>(0);
  const [isPublished, setIsPublished] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleVideoUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('views', views.toString());
    formData.append('isPublished', isPublished);
    if (file) formData.append('video', file);
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const uploadResp = await axios.post(
        'http://localhost:8000/api/v1/videos/uploadVideo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('Upload response:', uploadResp.data);
    } catch (error) {
      console.error('Video upload unsuccessful:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>

      <form
        onSubmit={handleVideoUpload}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Title of Video"
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <input
          type="text"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <input
          type="number"
          value={views}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setViews(Number(e.target.value))
          }
          placeholder="Views"
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <input
          type="text"
          value={isPublished}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIsPublished(e.target.value)
          }
          placeholder="Published (true/false)"
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files?.[0] || null)
          }
          className="w-full p-2 rounded bg-gray-700 text-gray-300"
        />

        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setThumbnail(e.target.files?.[0] || null)
          }
          className="w-full p-2 rounded bg-gray-700 text-gray-300"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default Video;

import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

const UploadVideo: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState<number>(0);
  const [isPublished, setIsPublished] = useState("false");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("views", views.toString());
    formData.append("isPublished", isPublished);
    if (file) formData.append("video", file);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const uploadResp = await axios.post(
        `${process.env.VITE_API_URL}/api/v1/videos/uploadVideo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("Upload success:", uploadResp.data);
      alert("Video uploaded successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setViews(0);
      setIsPublished("false");
      setFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-2 bg-white text-gray-800">
 

  <form
    onSubmit={handleVideoUpload}
    className="w-full max-w-lg border border-gray-200 bg-white p-6 rounded-xl shadow-sm space-y-4"
  >
    <input
      type="text"
      value={title}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      placeholder="Video Title"
      required
      className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <textarea
      value={description}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      placeholder="Description"
      rows={3}
      required
      className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <input
      type="number"
      value={views}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setViews(Number(e.target.value))}
      placeholder="Views"
      min={0}
      className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <select
      value={isPublished}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setIsPublished(e.target.value)}
      className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="true">Published</option>
      <option value="false">Unpublished</option>
    </select>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Upload Video</label>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
        className="w-full p-2 rounded border border-gray-300 bg-gray-50"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Upload Thumbnail</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        className="w-full p-2 rounded border border-gray-300 bg-gray-50"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-black hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Uploading..." : "Upload Video"}
    </button>
  </form>
</div>

  );
};

export default UploadVideo;

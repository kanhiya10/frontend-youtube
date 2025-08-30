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
    formData.append("isPublished", JSON.stringify(isPublished === "true"));
    if (file) formData.append("video", file);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const uploadResp = await axios.post(
        "http://localhost:8001/api/v1/videos/uploadVideo",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-4 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full mb-3 sm:mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Upload Your Video
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Share your content with the world. Fill in the details below to upload your video.
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <form onSubmit={handleVideoUpload} className="space-y-4 sm:space-y-6">
              
              {/* Title Input */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  placeholder="Enter an engaging title for your video"
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Describe your video content, what viewers can expect..."
                  rows={3}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Views and Published Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Views Input */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700">
                    Initial Views
                  </label>
                  <input
                    type="number"
                    value={views}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setViews(Number(e.target.value))}
                    placeholder="0"
                    min={0}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Published Status */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700">
                    Status
                  </label>
                  <select
                    value={isPublished}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setIsPublished(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="false">Save as Draft</option>
                    <option value="true">Publish Now</option>
                  </select>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Video Upload */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700">
                    Upload Video *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 file:mr-3 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:transition-colors file:duration-200"
                    />
                    {file && (
                      <p className="mt-1 text-xs text-green-600">
                        ✓ {file.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700">
                    Upload Thumbnail
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 file:mr-3 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-700 file:transition-colors file:duration-200"
                    />
                    {thumbnail && (
                      <p className="mt-1 text-xs text-green-600">
                        ✓ {thumbnail.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-black hover:bg-gray-900 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base transition-all duration-300 transform ${
                    loading 
                      ? "opacity-50 cursor-not-allowed scale-100" 
                      : "hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </div>
                  ) : (
                    "Upload Video"
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
                <p className="text-xs sm:text-sm text-blue-800">
                  <span className="font-semibold">💡 Tip:</span> For best results, use MP4 format for videos and JPG/PNG for thumbnails. Keep file sizes reasonable for faster uploads.
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useTheme } from "../../context/themeContext";
import { uploadVideo } from '../../services/videos'; // Import the new service
import { useStyles } from "../../utils/styleImports";
import header from "./header";

const UploadVideo: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [views, setViews] = useState<number>(0);
    const [isPublished, setIsPublished] = useState("false");
    const [file, setFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [visibility, setVisibility] = useState<"public" | "members">("public");
    const [loading, setLoading] = useState(false);

    const { theme } = useTheme();
    const { containerStylev2, cardStyle, labelStyle, input, fileInput, fileButtonBase, thumbnailButton, fileSuccess, submitButton, helpBox, helpText } = useStyles();

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
        formData.append("visibility", visibility);

        try {
            await uploadVideo(formData); // Use the new service function
            alert("Video uploaded successfully!");
            setTitle("");
            setDescription("");
            setViews(0);
            setIsPublished("false");
            setFile(null);
            setThumbnail(null);
            setVisibility("public");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div
            className="min-h-screen py-4 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8"
            style={containerStylev2}
        >
            <div className="max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <div
                        className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4"
                        style={fileButtonBase}
                    >
                        <svg
                            className="w-6 h-6 sm:w-8 sm:h-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        Upload Your Video
                    </h1>
                    <p className="text-sm sm:text-base max-w-md mx-auto" style={labelStyle}>
                        Share your content with the world. Fill in the details below to
                        upload your video.
                    </p>
                </div>

                {/* Upload Form */}
                <div
                    className="rounded-2xl shadow-xl border overflow-hidden"
                    style={cardStyle}
                >
                    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                        <form onSubmit={handleVideoUpload} className="space-y-4 sm:space-y-6">
                            {/* Title Input */}
                            <div className="space-y-1 sm:space-y-2">
                                <label
                                    className="block text-sm sm:text-base font-semibold"
                                    style={labelStyle}
                                >
                                    Video Title *
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                    placeholder="Enter an engaging title for your video"
                                    required
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={input}
                                />
                            </div>

                            {/* Description Input */}
                            <div className="space-y-1 sm:space-y-2">
                                <label
                                    className="block text-sm sm:text-base font-semibold"
                                    style={labelStyle}
                                >
                                    Description *
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                    placeholder="Describe your video content, what viewers can expect..."
                                    rows={3}
                                    required
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none"
                                    style={input}
                                />
                            </div>

                            {/* Views and Published Status Row */}
                            {/* Views, Status and Visibility */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

                                {/* Views */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label
                                        className="block text-sm sm:text-base font-semibold"
                                        style={labelStyle}
                                    >
                                        Initial Views
                                    </label>

                                    <input
                                        type="number"
                                        value={views}
                                        onChange={(e) => setViews(Number(e.target.value))}
                                        min={0}
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-xl"
                                        style={input}
                                    />
                                </div>

                                {/* Publish Status */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label
                                        className="block text-sm sm:text-base font-semibold"
                                        style={labelStyle}
                                    >
                                        Status
                                    </label>

                                    <select
                                        value={isPublished}
                                        onChange={(e) => setIsPublished(e.target.value)}
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-xl"
                                        style={input}
                                    >
                                        <option value="false">Save as Draft</option>
                                        <option value="true">Publish Now</option>
                                    </select>
                                </div>

                                {/* Visibility */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label
                                        className="block text-sm sm:text-base font-semibold"
                                        style={labelStyle}
                                    >
                                        Visibility
                                    </label>

                                    <select
                                        value={visibility}
                                        onChange={(e) =>
                                            setVisibility(e.target.value as "public" | "members")
                                        }
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-xl"
                                        style={input}
                                    >
                                        <option value="public">🌍 Public</option>
                                        <option value="members">⭐ Members Only</option>
                                    </select>
                                </div>

                            </div>

                            {/* File Upload Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Video Upload */}
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm sm:text-base font-semibold"
                                        style={labelStyle}
                                    >
                                        Upload Video *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            required
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                                            style={{
                                                ...fileInput,
                                                '::file-selector-button': fileButtonBase
                                            } as React.CSSProperties}
                                        />
                                        {file && (
                                            <p className="mt-1 text-xs" style={fileSuccess}>
                                                ✓ {file.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Thumbnail Upload */}
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm sm:text-base font-semibold"
                                        style={labelStyle}
                                    >
                                        Upload Thumbnail
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                                            style={{
                                                ...fileInput,
                                                '::file-selector-button': thumbnailButton
                                            } as React.CSSProperties}
                                        />
                                        {thumbnail && (
                                            <p className="mt-1 text-xs" style={fileSuccess}>
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
                                    className={`w-full font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-sm sm:text-base transition-all duration-300 transform ${loading
                                        ? "opacity-50 cursor-not-allowed scale-100"
                                        : "hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                        }`}
                                    style={submitButton}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                style={{ color: theme.btn }}
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Uploading...
                                        </div>
                                    ) : (
                                        "Upload Video"
                                    )}
                                </button>
                            </div>

                            {/* Help Text */}
                            <div
                                className="rounded-xl p-3 sm:p-4 mt-4 sm:mt-6"
                                style={helpBox}
                            >
                                <p className="text-xs sm:text-sm">
                                    <span className="font-semibold">💡 Tip:</span> For best
                                    results, use MP4 format for videos and JPG/PNG for thumbnails.
                                    Keep file sizes reasonable for faster uploads.
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
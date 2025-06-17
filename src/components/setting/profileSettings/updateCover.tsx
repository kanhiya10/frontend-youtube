import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const UpdateCover = () => {
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cover) {
      const objectUrl = URL.createObjectURL(cover);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [cover]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cover) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("coverImage", cover);

    try {
      await fetch("https://backend-youtube-zba1.onrender.com/api/v1/users/cover-image", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
    } catch (err) {
      console.error("Failed to upload cover image", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4"
    >
      <Label htmlFor="coverUpload">Select Cover Image</Label>
      <Input
        id="coverUpload"
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
      />
      {preview && (
        <img
          src={preview}
          alt="Cover Preview"
          className="mt-4 w-full max-w-md rounded-md"
        />
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Cover"}
      </Button>
    </form>
  );
};

export default UpdateCover;

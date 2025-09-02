import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useTheme } from '../../../context/themeContext';
import { updateCoverImage } from '../../../services/users';

const UpdateCover = () => {
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

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
      await updateCoverImage(formData);
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
      <Label htmlFor="coverUpload" style={{ color: theme.textSecondary }}>Select Cover Image</Label>
      <Input
        id="coverUpload"
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        style={{
          backgroundColor: theme.inputBackground,
          borderColor: theme.inputBorder,
          color: theme.text,
        }}
      />
      {preview && (
        <img
          src={preview}
          alt="Cover Preview"
          className="mt-4 w-full max-w-md rounded-md"
        />
      )}
      <Button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: theme.btn,
          color: theme.text,
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? "Updating..." : "Update Cover"}
      </Button>
    </form>
  );
};

export default UpdateCover;

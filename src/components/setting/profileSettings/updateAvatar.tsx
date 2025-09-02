import React, { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useTheme } from '../../../context/themeContext';
import { updateAvatar } from '../../../services/users';

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (avatar) {
      const objectUrl = URL.createObjectURL(avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatar) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      await updateAvatar(formData);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="avatarUpload" style={{ color: theme.textSecondary }}>Upload New Avatar</Label>
        <Input
          id="avatarUpload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{
            backgroundColor: theme.inputBackground,
            borderColor: theme.inputBorder,
            color: theme.text,
          }}
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Avatar Preview"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        style={{
          backgroundColor: theme.btn,
          color: theme.text,
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? "Updating..." : "Update Avatar"}
      </Button>
    </form>
  );
};

export default UpdateAvatar;

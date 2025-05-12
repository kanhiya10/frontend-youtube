import React, { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (avatar) {
      const objectUrl = URL.createObjectURL(avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up preview URL
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

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      await fetch(`${process.env.VITE_API_URL}/api/v1/users/avatar`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      // Optional: show toast or success message here
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="avatarUpload">Upload New Avatar</Label>
        <Input
          id="avatarUpload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Avatar Preview"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      )}

      <Button type="submit" className="w-full">
        Update Avatar
      </Button>
    </form>
  );
};

export default UpdateAvatar;

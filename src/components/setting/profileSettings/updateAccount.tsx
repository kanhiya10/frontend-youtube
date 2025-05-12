import React, { useState } from "react";
import axios from "axios";

const UpdateAccount = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        `${process.env.VITE_API_URL}/api/v1/users/update-account`,
        { fullName, email },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">Update Account</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-600">
            fullName
          </label>
          <input
            type="text"
            id="fullName"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;

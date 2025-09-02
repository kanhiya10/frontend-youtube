import React, { useState } from "react";
import { useTheme } from '../../../context/themeContext';
import { updateAccountDetails } from '../../../services/users';
import { useStyles } from '../../../utils/styleImports';

const UpdateAccount = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { cardCss, inputStylev2,buttonCss } = useStyles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateAccountDetails({ fullName, email });
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-6 rounded-2xl border" style={cardCss}>
      <h2 className="text-2xl font-bold" style={{ color: theme.secondary }}>Update Account</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium" style={{ color: theme.textSecondary }}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="rounded-md p-2 focus:outline-none focus:ring-2"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
            style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium" style={{ color: theme.textSecondary }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className="rounded-md p-2 focus:outline-none focus:ring-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ ...inputStylev2, outlineColor: theme.inputFocus }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md transition disabled:opacity-50"
          style={buttonCss}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;

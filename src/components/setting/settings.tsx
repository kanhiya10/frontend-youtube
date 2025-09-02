import React from "react";
import ThemeToggle from "../common/themeToggle";

import { UserCog, ShieldCheck, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-full p-5" style={{ backgroundColor: theme.background }}>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: theme.primary }}>Settings</h1>
          <ThemeToggle />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <section className="flex items-start gap-4 p-5 rounded-lg shadow hover:shadow-lg transition" style={{ backgroundColor: theme.card }}>
            <UserCog className="mt-1 w-6 h-6" style={{ color: theme.info }} />
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ color: theme.secondary }}>Profile</h2>
              <p className="text-sm" style={{ color: theme.text }}>
                Update your personal info like name, email, and profile picture.
              </p>
              <button
                className="mt-3 px-4 py-2 rounded transition-colors"
                style={{ backgroundColor: theme.btn, color: theme.background }}
                onClick={() => navigate("/manageProfile")}
              >
                Edit Profile
              </button>
            </div>
          </section>

          {/* Security Settings */}
          <section className="flex items-start gap-4 p-5 rounded-lg shadow hover:shadow-lg transition" style={{ backgroundColor: theme.card }}>
            <ShieldCheck className="mt-1 w-6 h-6" style={{ color: theme.info }} />
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ color: theme.secondary }}>Security</h2>
              <p className="text-sm" style={{ color: theme.text }}>
                Change your password or enable two-factor authentication.
              </p>
              <button
                className="mt-3 px-4 py-2 rounded transition-colors"
                style={{ backgroundColor: theme.btn, color: theme.background }}
                onClick={() => navigate("/manageSecurity")}
              >
                Manage Security
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="flex items-start gap-4 p-5 rounded-lg shadow hover:shadow-lg transition" style={{ backgroundColor: theme.card }}>
            <Bell className="mt-1 w-6 h-6" style={{ color: theme.info }} />
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ color: theme.secondary }}>Notifications</h2>
              <p className="text-sm" style={{ color: theme.text }}>
                Control your notification preferences.
              </p>
              <button
                className="mt-3 px-4 py-2 rounded transition-colors"
                style={{ backgroundColor: theme.btn, color: theme.background }}
                onClick={() => navigate("/manageNotifications")}
              >
                Notification Settings
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
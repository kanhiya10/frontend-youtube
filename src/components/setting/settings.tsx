// import { FaUserEdit, FaShieldAlt, FaBell } from 'react-icons/fa';
import React from "react";
import ThemeToggle from "../common/themeToggle";

import { UserCog, ShieldCheck, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../../context/themeContext";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-full p-5" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <div className="p-6 max-w-4xl mx-auto" style={{backgroundColor: theme.background}}>
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">Settings</h1>
    <ThemeToggle />
  </div>

      <div className="grid md:grid-cols-2 gap-6 ">
        {/* Profile Settings */}
        <section className="flex items-start gap-4 dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition" style={{backgroundColor: theme.card}}>
        <UserCog className="text-blue-600 mt-1 w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Profile</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Update your personal info like name, email, and profile picture.
            </p>
            <button className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
            onClick={() => navigate("/manageProfile")}
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Security Settings */}
        <section className="flex items-start gap-4 bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition" style={{backgroundColor: theme.card}}>
        <ShieldCheck className="text-blue-600 mt-1 w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Security</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Change your password or enable two-factor authentication.
            </p>
            <button className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
            onClick={() => navigate("/manageSecurity")}
            >
              Manage Security
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="flex items-start gap-4 bg-white dark:bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition" style={{backgroundColor: theme.card}}>
        <Bell className="text-blue-600 mt-1 w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Notifications</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Control your notification preferences.
            </p>
            <button className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-blue-700" 
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

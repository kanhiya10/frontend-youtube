import React from 'react';
import { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { useTheme } from '../../../context/themeContext';
import { changePassword } from '../../../services/users';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    try {
      const res = await changePassword({ currentPassword, newPassword });
      
      setMessage('Password changed successfully!');
      
    } catch (err) {
      setError(true);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" style={{ color: theme.text }}>
      <Label htmlFor="currentPassword" style={{ color: theme.textSecondary }}>Current Password</Label>
      <Input
        id="currentPassword"
        type="password"
        value={currentPassword}
        onChange={(e:any) => setCurrentPassword(e.target.value)}
        style={{
          backgroundColor: theme.inputBackground,
          borderColor: theme.inputBorder,
          color: theme.text,
        }}
      />
      <Label htmlFor="newPassword" style={{ color: theme.textSecondary }}>New Password</Label>
      <Input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{
          backgroundColor: theme.inputBackground,
          borderColor: theme.inputBorder,
          color: theme.text,
        }}
      />
      <Button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: theme.btn,
          color: theme.text,
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? 'Updating...' : 'Change Password'}
      </Button>
      {message && (
        <p className="text-sm" style={{ color: error ? theme.error : theme.success }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default ChangePassword;

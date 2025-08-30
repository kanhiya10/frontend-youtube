import React from 'react';
import {useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    try {
        const res = await axios.post(
            'https://backend-youtube-zba1.onrender.com/api/v1/users/change-password',
            { currentPassword, newPassword },
            { withCredentials: true } // This includes cookies (like auth tokens)
          );
      
          console.log('Password changed successfully:', res.data);
     
    } catch (err) {
      setError(true);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input
        id="currentPassword"
        type="password"
        value={currentPassword}
        onChange={(e:any) => setCurrentPassword(e.target.value)}
      />
      <Label htmlFor="newPassword">New Password</Label>
      <Input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Change Password'}
      </Button>
      {message && <p className={`text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>{message}</p>}
    </form>
  );
};

export default ChangePassword;

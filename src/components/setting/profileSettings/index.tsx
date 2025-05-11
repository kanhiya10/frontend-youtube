import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';

import ChangePassword from './changePassword';
import UpdateAccount from './updateAccount';
import UpdateAvatar from './updateAvatar';
import UpdateCover from './updateCover';

type OptionType = 'password' | 'account' | 'avatar' | 'cover' | null;

const ManageProfile = () => {
  const [activeOption, setActiveOption] = useState<OptionType>(null);

  const renderContent = (activeOption: OptionType) => {
    switch (activeOption) {
      case 'password':
        return <ChangePassword />;
      case 'account':
        return <UpdateAccount />;
      case 'avatar':
        return <UpdateAvatar />;
      case 'cover':
        return <UpdateCover />;
      default:    
        return null;
    }
  };

  const options = [
    { label: 'Change Password', value: 'password' },
    { label: 'Update Account Details', value: 'account' },
    { label: 'Update Avatar', value: 'avatar' },
    { label: 'Update Cover Image', value: 'cover' },
  ] as const;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      {options.map((opt) => (
        <Card key={opt.value} className="transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div
              className="cursor-pointer text-lg font-medium"
              onClick={() =>
                setActiveOption((prev) => (prev === opt.value ? null : opt.value))
              }
            >
              {opt.label}
            </div>

            {activeOption === opt.value && renderContent(opt.value)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManageProfile;

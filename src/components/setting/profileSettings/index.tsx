import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { useTheme } from '../../../context/themeContext';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Import icons from a library like react-feather

import ChangePassword from './changePassword';
import UpdateAccount from './updateAccount';
import UpdateAvatar from './updateAvatar';
import UpdateCover from './updateCover';
import { useStyles } from '../../../utils/styleImports';

type OptionType = 'password' | 'account' | 'avatar' | 'cover' | null;

const ManageProfile = () => {
  const [activeOption, setActiveOption] = useState<OptionType>(null);
  const { theme } = useTheme();
  const { card, cardContent,hoverShadow } = useStyles();

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
    // This is the new full-screen wrapper div
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <div className="p-6 max-w-2xl mx-auto space-y-4" style={{ backgroundColor: theme.surface }}>
        {options.map((opt) => (
          <Card
            key={opt.value}
            className="transition-shadow hover:shadow-md"
            style={card}
          >
            <CardContent className="p-6" style={cardContent}>
              <div
                className="flex justify-between items-center cursor-pointer text-lg font-medium"
                onClick={() => setActiveOption((prev) => (prev === opt.value ? null : opt.value))}
                style={{ color: theme.text }}
              >
                {opt.label}
                <span className="ml-2">
                  {activeOption === opt.value ? (
                    <ChevronUp size={20} color={theme.text} />
                  ) : (
                    <ChevronDown size={20} color={theme.textMuted} />
                  )}
                </span>
              </div>

              {activeOption === opt.value && renderContent(opt.value)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageProfile;
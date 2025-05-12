import { useState, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelApi } from '../../features/slice/channelFetchUser.slice';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { channelUser } = useSelector((state: RootState) => state.Channel);

  const handleSearch = () => {
    if (!text.trim()) return;
    dispatch(
      ChannelApi({
        url: `https://backend-youtube-zba1.onrender.com/api/v1/users/visitChannel/${text}`,
        options: { Accept: 'application/json' },
      })
    );
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-[270px] h-[50px] bg-gray-800 rounded-md shadow-md px-4 pt-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleKeyUp}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full h-full pt-3 text-white bg-transparent outline-none placeholder-transparent"
        placeholder="Search for channels"
      />
      <label
        className={`absolute left-4 text-sm text-gray-400 transition-all duration-200 ${
          isFocused || text
            ? 'top-1 text-xs text-purple-300'
            : 'top-1/2 -translate-y-1/2'
        }`}
      >
        Search for channels
      </label>
    </div>
  );
};

export default Search;

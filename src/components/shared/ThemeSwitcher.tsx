import { FC } from 'react';
import { Switch } from '@chakra-ui/react';

interface ThemeSwitcherProps {
  onToggle: () => void;
  isDarkMode: boolean;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ onToggle, isDarkMode }) => {
  return (
    <Switch
      colorScheme={isDarkMode ? 'white' : 'black'}
      onChange={onToggle}
      isChecked={isDarkMode}
      color={isDarkMode ? 'white' : 'black'}
    >
      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
    </Switch>
  );
};

export default ThemeSwitcher;

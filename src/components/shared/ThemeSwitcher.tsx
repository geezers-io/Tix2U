import { FC } from 'react';
import { SunFill, MoonFill } from 'react-bootstrap-icons';
import { Button } from '@chakra-ui/react';

interface ThemeSwitcherProps {
  onToggle: () => void;
  isDarkMode: boolean;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ onToggle, isDarkMode }) => {
  return (
    <Button onClick={onToggle} colorScheme={isDarkMode ? 'white' : 'black'}>
      {isDarkMode ? <MoonFill color="white" /> : <SunFill color="black" />}
    </Button>
  );
};

export default ThemeSwitcher;

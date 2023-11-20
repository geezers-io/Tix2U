import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { colors } from './@colors';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const appStyles = {
  headerHeight: { base: '48px', md: '56px' },
  asideHeight: '56px',
} as const;

const styles = {
  global: {
    body: {
      width: '100%',
      minHeight: '100vh',
      color: 'gray.900',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    },
    '#root': {
      width: '100%',
      minHeight: '100vh',
      background: 'gray.50',
    },
    main: {
      width: '100%',
      minHeight: {
        base: `calc(100vh - ${appStyles.headerHeight.base})`,
        md: `calc(100vh - ${appStyles.headerHeight.md})`,
      },
      margin: '0 auto',
      background: 'white',
    },
    'main.with-aside': {
      paddingBottom: appStyles.asideHeight,
      minHeight: {
        base: `calc(100vh - ${appStyles.headerHeight.base} - ${appStyles.asideHeight})`,
        md: `calc(100vh - ${appStyles.headerHeight.md} - ${appStyles.asideHeight})`,
      },
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  styles,

  appStyles,
});

export default theme;

export type TColors = typeof colors;
export type TAppStyles = typeof appStyles;

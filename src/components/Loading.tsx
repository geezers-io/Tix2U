import React from 'react';
import { useTheme } from '@chakra-ui/react';

interface LoadingProps {
  width?: number;
  height?: number;
}

const Loading: React.FC<LoadingProps> = ({ width = 100, height = 100 }) => {
  const theme = useTheme();

  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
    >
      <circle
        fill="none"
        stroke={theme.colors.pink.primary}
        strokeWidth="4"
        cx="50"
        cy="50"
        r="44"
        style={{ opacity: 0.5 }}
      />
      <circle fill={theme.colors.pink.primary} stroke={theme.colors.black} strokeWidth="3" cx="8" cy="54" r="6">
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Loading;

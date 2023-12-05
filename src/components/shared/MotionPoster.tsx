import { FC, useState } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface MotionPosterProps extends Omit<BoxProps, 'children'> {
  children: React.ReactNode | ((props: { isHovered: boolean }) => React.ReactNode);
}

const MotionPoster: FC<MotionPosterProps> = ({ children, ...rest }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Box
      as="div"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      overflow="hidden"
      position="relative"
      {...rest}
    >
      {typeof children === 'function' ? children({ isHovered }) : children}
    </Box>
  );
};

export default MotionPoster;

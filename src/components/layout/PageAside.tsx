import { FC } from 'react';
import { Box } from '@chakra-ui/react';

const PageAside: FC = () => {
  return <Box as="aside" w="100%" position="fixed" bottom={0} zIndex={2}></Box>;
};

export default PageAside;

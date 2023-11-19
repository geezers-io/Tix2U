import { FC, PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';

const PageHeader: FC<PropsWithChildren> = () => {
  return (
    <Box
      as="header"
      w="100%"
      h="100px"
      position="sticky"
      top={0}
      paddingTop={{ base: 0, md: '8px' }}
      boxShadow="0 2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="white"
      zIndex={999}
    >
      <Box h="100%" maxW="100px" display="flex" alignItems="center" margin="0 auto" padding={`0 calc(100% - 6px)`}>
        header
      </Box>
    </Box>
  );
};

export default PageHeader;

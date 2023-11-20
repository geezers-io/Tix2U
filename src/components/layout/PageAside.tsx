import { FC } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const PageAside: FC = () => {
  return (
    <Box
      as="aside"
      w="100%"
      h="100px"
      position="sticky"
      top={0}
      paddingTop={{ base: 0, md: '8px' }}
      boxShadow="0 2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="lightgray"
      zIndex={999}
    >
      <Flex align="center" justify="space-between" h="100%">
        <Image src="/src/images/logo.png" alt="Logo" w="50px" h="50px" />
        <Box borderLeft="1px solid #ccc" height="60%" mx="4" />
        <Flex direction="column" justify="center" align="flex-end">
          <Text fontSize="sm">개인정보처리방침</Text>
          <Text fontSize="sm">이용약관</Text>
          <Text fontSize="sm">이용안내</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PageAside;

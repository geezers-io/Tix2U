import { FC, useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading, Link, Image, Flex, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../images/logo.png';

const DetailPage: FC = () => {
  return (
    <ChakraProvider>
      <Box bg="purple.50" minHeight="100vh" p={4}>
        <Box as="header" width="100%" bg="white" position="sticky" top="0" zIndex="sticky" boxShadow="md" p={4}>
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="xl">
              Tix To You!
            </Heading>
            <Image src={logo} alt="Tix To You Logo" maxH="200px" />
          </Flex>
        </Box>

        <Box mt={8} bg="white" borderRadius="md" boxShadow="md" overflow="hidden">
          <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
              "저희는 전시, 공연 등 다양한 티켓을 구매 할 수 있는 서비스를 구현합니다."
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </Heading>
            <Link as={RouterLink} to="/">
              <Button colorScheme="purple"> Go Back</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default DetailPage;

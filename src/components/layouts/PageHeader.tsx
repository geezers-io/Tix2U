import { FC, PropsWithChildren } from 'react';
import { PersonCircle, BoxArrowInRight, Cart, Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Box, Image, Flex, Spacer, HStack, Text, Center } from '@chakra-ui/react';

const PageHeader: FC<PropsWithChildren> = () => {
  return (
    <Box
      as="header"
      w="100%"
      h={{ base: 'auto', md: '100px' }}
      position="sticky"
      top={0}
      paddingTop={{ base: 0, md: '8px' }}
      boxShadow="0 2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="white"
      zIndex={999}
      alignContent="center"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align="center"
        h="100%"
        pl={{ base: 4, md: 20 }}
        pr={{ base: 4, md: 20 }}
      >
        <Link to="/">
          <Image src="/name_logo.png" h="60px" />
        </Link>
        <HStack spacing={10} mt={{ base: 4, md: 0 }} align={{ base: 'center', md: 'center' }}>
          <Link to="/entire">
            <Text fontWeight="bold" letterSpacing="0.1em" pl={6} whiteSpace="nowrap">
              <Center>전체</Center>
            </Text>
          </Link>
          <Link to="/concert">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>음악회</Center>
            </Text>
          </Link>
          <Link to="/musical">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>뮤지컬</Center>
            </Text>
          </Link>
          <Link to="/dancing">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>무용</Center>
            </Text>
          </Link>
          <Link to="/theater">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>연극</Center>
            </Text>
          </Link>
        </HStack>

        <Spacer />

        <HStack spacing={10} mr={8} align="center" pr={20}>
          <Link to="/search">
            <Text fontWeight="bold" letterSpacing="0.1em" cursor="pointer">
              <Center>
                <Search /> SEARCH
              </Center>
            </Text>
          </Link>

          <Link to="/login">
            <Text fontWeight="bold" letterSpacing="0.1em" _hover={{ textDecoration: 'underline' }}>
              <Center>
                <BoxArrowInRight /> LOGIN
              </Center>
            </Text>
          </Link>
          <Link to="/mypage">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>
                <PersonCircle /> MYPAGE
              </Center>
            </Text>
          </Link>
          <Link to="/cart">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>
                <Cart /> CART
              </Center>
            </Text>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default PageHeader;

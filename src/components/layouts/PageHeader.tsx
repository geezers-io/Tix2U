import { FC } from 'react';
import { PersonCircle, BoxArrowInRight, Cart, Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Box, Image, Flex, Spacer, HStack, Text, Center, useMediaQuery } from '@chakra-ui/react';

const PageHeader: FC = () => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
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
      display="flex"
      flexDirection="column"
      paddingX="4"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        h="100%"
        pl={{ base: 2, md: 10 }}
        pr={{ base: 2, md: 10 }}
      >
        <Link to="/">
          <Image src="/name_logo.png" pr={10} h={{ base: '40px', md: '60px' }} />
        </Link>
        <HStack spacing={{ base: 2, md: 10 }}>
          <Link to="/entire">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              전체
            </Text>
          </Link>
          <Link to="/concert">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              음악회
            </Text>
          </Link>
          <Link to="/musical">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              뮤지컬
            </Text>
          </Link>
          <Link to="/dancing">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              무용
            </Text>
          </Link>
          <Link to="/theater">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              연극
            </Text>
          </Link>
        </HStack>

        <Spacer display={{ base: 'none', md: 'block' }} />

        <HStack spacing={10} align="center">
          <Link to="/search">
            <Text fontWeight="bold" letterSpacing="0.1em" cursor="pointer" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              <Center>
                <Search /> SEARCH
              </Center>
            </Text>
          </Link>

          <Link to="/login">
            <Text
              fontWeight="bold"
              letterSpacing="0.1em"
              _hover={{ textDecoration: 'underline' }}
              fontSize={isLargerThanMd ? 'md' : 'sm'}
            >
              <Center>
                <BoxArrowInRight /> LOGIN
              </Center>
            </Text>
          </Link>
          <Link to="/mypage">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
              <Center>
                <PersonCircle /> MYPAGE
              </Center>
            </Text>
          </Link>
          <Link to="/cart">
            <Text fontWeight="bold" letterSpacing="0.1em" fontSize={isLargerThanMd ? 'md' : 'sm'}>
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

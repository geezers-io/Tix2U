import { FC, PropsWithChildren, useState } from 'react';
import { Box, Image, Flex, Spacer, Link, HStack, Text, Center, Input } from '@chakra-ui/react';
import { Search, PersonCircle, BoxArrowInRight, Cart } from 'react-bootstrap-icons';

const PageHeader: FC<PropsWithChildren> = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

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
      alignContent="center"
    >
      <Flex justify="space-between" align="center" h="100%" alignItems="center" pl={60}>
        <Image src="/src/images/name_logo.png" alt="Logo" h="60px" />

        <HStack spacing={10} ml={8} align="center">
          <Link href="/all">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>전체</Center>
            </Text>
          </Link>
          <Link href="/exhibition">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>전시회</Center>
            </Text>
          </Link>
          <Link href="/concert">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>콘서트</Center>
            </Text>
          </Link>
          <Link href="/musical">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>뮤지컬</Center>
            </Text>
          </Link>
          <Link href="/play">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>연극</Center>
            </Text>
          </Link>
        </HStack>

        <Spacer />

        <HStack spacing={10} mr={8} align="center" pr={60}>
          <Text fontWeight="bold" letterSpacing="0.1em" onClick={toggleSearchBar} cursor="pointer">
            <Center>
              <Search /> SEARCH
            </Center>
          </Text>
          <Link href="/login">
            <Text fontWeight="bold" letterSpacing="0.1em" _hover={{ textDecoration: 'underline' }}>
              <Center>
                <BoxArrowInRight /> LOGIN
              </Center>
            </Text>
          </Link>
          <Link href="/mypage">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>
                <PersonCircle /> MYPAGE
              </Center>
            </Text>
          </Link>
          <Link href="/cart">
            <Text fontWeight="bold" letterSpacing="0.1em">
              <Center>
                <Cart /> CART
              </Center>
            </Text>
          </Link>
        </HStack>
      </Flex>
      {isSearchBarVisible && (
        <Box p={4} bg="white" position="absolute" top="100%" left={0} right={0} boxShadow="sm">
          <Input
            placeholder="검색어를 입력해주세요."
            size="sm"
            borderColor="gray.400"
            _hover={{ borderColor: 'gray.600' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;

import { useState } from 'react';
import { Search } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';
import { Button, Center, Flex, Input, Text } from '@chakra-ui/react';

const SearchTerm = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearch = () => {
    // TODO: 검색 기능을 수행하고, 다른 페이지로 리다이렉션
    console.log('검색어:', searchQuery);
  };

  const goToSearchPage = () => {
    setIsSearchBarVisible(false);
  };
  return (
    <>
      <Text fontWeight="bold" letterSpacing="0.1em" onClick={toggleSearchBar} cursor="pointer">
        <Center>
          <Search /> SEARCH
        </Center>
      </Text>

      {isSearchBarVisible && (
        <Flex
          p={4}
          bg="white"
          position={{ base: 'absolute', md: 'fixed' }}
          top={{ base: 0, md: '100px' }}
          left={0}
          right={0}
          boxShadow="sm"
          zIndex={1}
          w="50%"
          mx="auto"
        >
          <Input
            placeholder="검색어를 입력해주세요."
            size="sm"
            borderColor="transparent"
            borderBottomWidth="2px"
            borderBottomColor="gray.600"
            _hover={{ borderColor: 'gray.600' }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            minWidth="500px"
            w="100%"
          />
          <Link to="/search">
            <Button onClick={goToSearchPage}>검색</Button>
          </Link>
        </Flex>
      )}
    </>
  );
};

export default SearchTerm;

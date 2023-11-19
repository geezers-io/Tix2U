import { useState, FC } from 'react';
import { Box, Skeleton, Button, Grid, Heading, Link, Switch, Flex } from '@chakra-ui/react';
import InfiniteScroll from '../components/InfiniteScroll';
import logo from '../images/logo.png';
import name_logo from '../images/name_logo.png';
import { Link as RouterLink } from 'react-router-dom';

const IndexPage: FC = () => {
  const [items, setItems] = useState([...Array(8)]);
  const [showDummyData, setShowDummyData] = useState(true);

  const handleToggleDummyData = () => {
    setShowDummyData(!showDummyData);
  };

  const loadMore = () => {
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...Array(8)]);
    }, 1000);
  };

  return (
    <Box bg="purple.50" minHeight="100vh" p={4} overflowY="auto" alignContent="center">
      <Flex
        width="100%"
        bg="white"
        position="sticky"
        top="0"
        zIndex="sticky"
        boxShadow="md"
        p={4}
        justifyContent="center"
        text-align="center"
      >
        <Heading as="h1" size="xl">
          <img src={name_logo} width="200px" />
        </Heading>
      </Flex>
      <Switch colorScheme="teal" isChecked={showDummyData} onChange={handleToggleDummyData} mt={4}></Switch>
      <InfiniteScroll load={loadMore} hasMore={true}>
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} mt={8}>
          {items.map((_, index) => (
            <Box key={index} bg="white" borderRadius="md" boxShadow="md" overflow="hidden">
              {showDummyData && (
                <img src={logo} alt="Logo" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              )}
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                  {showDummyData ? <Skeleton height="20px" mb="10px" /> : ''}
                </Heading>
                <Link as={RouterLink} to="/Detail">
                  <Button colorScheme="purple" mt={2}>
                    Click Me!
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default IndexPage;

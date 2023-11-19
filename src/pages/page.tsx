import { useState, FC, useEffect } from 'react';
import { Box, Skeleton, Button, Grid, Heading, Link, Switch, Flex, Image } from '@chakra-ui/react';
import logo from '../images/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import ImageSlider from '../components/shared/ImageCarousel';

const IndexPage: FC = () => {
  const [items, setItems] = useState([...Array(8)]);
  const [showDummyData, setShowDummyData] = useState(true);
  const [bannerImages, setBannerImages] = useState<string[]>([]);

  const handleToggleDummyData = () => {
    setShowDummyData(!showDummyData);
  };

  const loadMore = () => {
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...Array(8)]);
    }, 1000);
  };

  const fetchBannerImages = async () => {
    try {
      const images = [
        'https://www.monthlypeople.com/news/photo/202306/560635_559345_3540.jpg',
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201701/18/htm_20170118142849573637.jpg',
        'https://i.namu.wiki/i/ETpJyld-Ok-H46FcqqlgUECJdmDctvaXpnrnM2MO-Dkn_S6H3vqFI8qYNBRmnSLM975rwaT5A6s5bDn4tC3aRA.webp',
        'https://c.wallhere.com/photos/c0/1b/anime_city_clouds_skyscraper_5_Centimeters_Per_Second_Makoto_Shinkai-241157.jpg!d',
        'https://dthezntil550i.cloudfront.net/25/latest/252001022015123200005691112/1280_960/68ee10fa-84b8-44b6-bcc2-94df2f5fac05.png',
      ];
      setBannerImages(images);
    } catch (error) {
      console.error('이미지를 불러올 수 없습니다.:', error);
    }
  };

  useEffect(() => {
    fetchBannerImages();
  }, []);

  return (
    <Box bg="purple.50" minHeight="100vh" p={4} overflowY="auto" p="10px 200px" textAlign="center">
      <Box p="30px" w="800px">
        <ImageSlider images={bannerImages} />
      </Box>
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
        <Flex justify-content="space-between">
          <Nav>
            <SLink to="/">전체</SLink>
            <SLink to="/about">공연</SLink>
            <SLink to="/">체험</SLink>
            <SLink to="/about">클래스</SLink>
          </Nav>
        </Flex>
      </Flex>
      {/*<Switch colorScheme="teal" isChecked={showDummyData} onChange={handleToggleDummyData} mt={4}></Switch> */}
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
    </Box>
  );
};

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const SLink = styled(Link)`
  display: block;
  padding: 18px var(--link-padding-x);
  text-decoration: none !important;
  padding: 0 50px;
  text;
  :hover {
    color: #600082;
  }
`;

export default IndexPage;

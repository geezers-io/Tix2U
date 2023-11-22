import { useState, FC, useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import ImageSlider from '@/components/ImageCarousel';

const IndexPage: FC = () => {
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [otherContent] = useState<string[]>(['Content 1', 'Content 2', 'Content 3', 'Content 4', 'Content 5']);

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
    <Box bg="purple.50" minHeight="100vh" overflowY="auto">
      <Box top={10} bg="white" zIndex={2}>
        <ImageSlider images={bannerImages} />
      </Box>

      <Box marginTop="120px">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {otherContent.map((content, index) => (
            <GridItem key={index} bg="gray.200" p={4} borderRadius="md">
              {content}
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default IndexPage;

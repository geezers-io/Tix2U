import { FC, useEffect, useState } from 'react';
import { Box, Heading, Flex, Button, Badge, Text, Avatar, Stack } from '@chakra-ui/react';
import ImageViewer from '@/components/ImageViewer';

const DetailPage: FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const fetchBannerImages = async () => {
    try {
      const images = [
        'https://www.monthlypeople.com/news/photo/202306/560635_559345_3540.jpg',
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201701/18/htm_20170118142849573637.jpg',
        'https://i.namu.wiki/i/ETpJyld-Ok-H46FcqqlgUECJdmDctvaXpnrnM2MO-Dkn_S6H3vqFI8qYNBRmnSLM975rwaT5A6s5bDn4tC3aRA.webp',
        'https://c.wallhere.com/photos/c0/1b/anime_city_clouds_skyscraper_5_Centimeters_Per_Second_Makoto_Shinkai-241157.jpg!d',
        'https://dthezntil550i.cloudfront.net/25/latest/252001022015123200005691112/1280_960/68ee10fa-84b8-44b6-bcc2-94df2f5fac05.png',
      ];
      setImages(images);
    } catch (error) {
      console.error('이미지를 불러올 수 없습니다.:', error);
    }
  };

  useEffect(() => {
    fetchBannerImages();
  }, []);

  return (
    <Box minHeight="inherit" p="10px 200px" bg="purple.50">
      <Box p={4}>
        <Flex flexDirection="column" gap="5px">
          <Heading as="h3" size="lg">
            제목
          </Heading>
          <Flex alignItems="center" gap="10px" justifyContent="right">
            <Badge fontSize="xl" variant="outline" colorScheme="brand">
              마감 기한
            </Badge>
            <Text fontSize="xl" as="b">
              2023.12.30
            </Text>
          </Flex>
          <Flex gap="10px" justifyContent="right">
            <ImageViewer images={images} />
          </Flex>

          <Flex alignItems="center" gap="10px" mb="5px" mt="5px">
            <Badge fontSize="xl" colorScheme="purple.10">
              클래스
            </Badge>
            <Text fontSize="xl" as="b">
              하루 도자기 체험권
            </Text>
          </Flex>

          <Text fontSize="xl" h="400px">
            헤헤헤
          </Text>
        </Flex>

        {/*seller*/}
        <Box mt="auto">
          <Flex>
            <Avatar size="xl" name="임희정" src="https://bit.ly/broken-link" />
            <Box ml="3" w="100%">
              <Badge fontSize="xl" colorScheme="green">
                판매자
              </Badge>
              <Text fontSize="xl" fontWeight="bold">
                임희정님
                <Text fontSize="xl" color="gray">
                  판매 재고 100 후기 200
                </Text>
              </Text>
            </Box>
            <Flex align-items="center">
              <Button colorScheme="brand">구독하기</Button>
            </Flex>
          </Flex>

          {/*reservation*/}
          <Box>
            <Stack direction="row" justifyContent="right" gap="10px">
              <Badge fontSize="xl" variant="outline" colorScheme="brand" justifyContent="center">
                금액
              </Badge>
              <Text fontSize="xl" as="b">
                10,000원
              </Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailPage;

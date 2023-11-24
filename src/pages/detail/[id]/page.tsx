import { FC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Badge,
  Image,
  Text,
  Heading,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Textarea,
  Button,
} from '@chakra-ui/react';
import ImageViewer from '@/components/ImageViewer';
import TicketingButton from '@/components/TicketingButton';

const DetailPage: FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const fetchSideImages = async () => {
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
    fetchSideImages();
  }, []);
  return (
    <Box p="10px 200px" bg="purple.50">
      <Box bgColor="white" p={5} minHeight="1000px">
        <Flex p="50px">
          <Flex flex={1} w="300px" h="100%" m="auto 0">
            <Image className="MainPoster" src="/public/poster/concert.jpg" />
          </Flex>

          <Flex flexDirection="column" m="50px" w="100%" flex={2}>
            <Flex gap={3}>
              <Badge size="lg" fontSize="lg" p="5px">
                콘서트
              </Badge>
              <Heading>김범수 콘서트</Heading>
            </Flex>
            <Divider p={5} />
            <Flex flexDirection="column" gap={10}>
              <Flex>
                <Flex w="100px">
                  <Text> 장소</Text>
                </Flex>
                <Text>피가로아트홀(구 훈아트홀) (피가로아트홀)</Text>
              </Flex>
              <Flex>
                <Flex w="100px">
                  <Text> 기간</Text>
                </Flex>
                <Text>2016.05.12 - 2016.07.31</Text>
              </Flex>
              <Flex>
                <Flex w="100px">
                  <Text> 관람 시간</Text>
                </Flex>
                <Text>1시간 30분</Text>
              </Flex>
              <Flex>
                <Flex w="100px">
                  <Text> 관람 등급</Text>
                </Flex>
                <Text>만 12세 이상</Text>
              </Flex>
              <Flex>
                <Flex w="100px">
                  <Text> 예매 가격</Text>
                </Flex>
                <Text>전석 30,000원</Text>
              </Flex>
              <Flex flexDirection="row-reverse">
                <TicketingButton />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Box h="1000px">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>상세 정보</Tab>
              <Tab>관람후기</Tab>
              <Tab>장소정보</Tab>
              <Tab>예매/취소 안내</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <ImageViewer images={images} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Flex gap={3}>
                    <Heading size="lg">관람후기</Heading>
                    <Heading size="lg" color="red">
                      0
                    </Heading>
                  </Flex>

                  <Flex p="20px 0px">
                    <Textarea rows={2} />
                    <Button colorScheme="brand" m="10px">
                      등록
                    </Button>
                  </Flex>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailPage;

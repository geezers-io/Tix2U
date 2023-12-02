import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Flex,
  Badge,
  CardHeader,
  StackDivider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Grid,
  Button,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';

const TicketingPage: FC = () => {
  const [detail, setDetail] = useState<PerformanceDetail>([]);
  const { mt20id } = useParams();
  const toast = useCustomToast();
  const fetchDetail = async (mt20id: string) => {
    try {
      const response = await PerformanceService.getDetail({ mt20id });
      setDetail(response);
      console.log(detail);
    } catch (e) {
      toast.error(e);
    }
  };
  useEffect(() => {
    if (!mt20id) return;
    fetchDetail(String(mt20id));
  }, []);

  if (!detail) return;

  return (
    <Box p="10px 5%" bg="purple.50">
      <Box m="0 auto" bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px">
        <Box minH="inherit">
          <Box m="20px">
            <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" h="200px">
              <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src={detail.poster} alt="Ticket Poster" />

              <Stack>
                <CardBody>
                  <Heading size="md">{detail.prfnm}</Heading>

                  <Text>
                    장소: {detail.fcltynm} <br /> 기간: {detail.prfpdfrom} - {detail.prfpdto}
                  </Text>
                </CardBody>

                <CardFooter>
                  <Flex alignItems="center" justifyItems="left">
                    <Badge borderRadius="10px" fontSize="lg" p="8px" m="10px 5px" colorScheme="brand" variant="solid">
                      가격
                    </Badge>
                    <Text as="b">{detail.pcseguidance}</Text>
                  </Flex>
                </CardFooter>
              </Stack>
            </Card>
          </Box>
          <Box m="20px">
            <Card>
              <CardHeader>
                <Heading size="md">주문자 확인</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      주문자 성명
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      김아무개
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      전화번호
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      01040303105
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      이메일
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      acb4287@naver.com
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Box m="20px">
            <Card>
              <Heading size="md" m="10px">
                결제 방법
              </Heading>
              <Tabs isFitted variant="soft-rounded" colorScheme="brand">
                <TabList mb="1em">
                  <Tab>간편 결제</Tab>
                  <Tab>카드 결제</Tab>
                  <Tab>현금 결제</Tab>
                  <Tab>휴대폰 결제</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </Box>
        </Box>
        <Grid>
          <Button colorScheme="brand">결제하기</Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketingPage;

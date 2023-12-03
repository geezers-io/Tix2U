import { useState, useEffect, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Checkbox,
  Radio,
  RadioGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';

const TicketingPage: FC = () => {
  const [detail, setDetail] = useState<PerformanceDetail>([]);
  const { mt20id } = useParams();
  const toast = useCustomToast();
  const [payValue, setPayValue] = useState<string>('toss');
  const [receipt, setReceipt] = useState<string>('true');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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
      <Box m="0 auto" bgColor="white" p={5} w="90%" maxW="700px">
        <Box minH="inherit">
          <Box m="20px">
            <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" minH="200px">
              <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src={detail.poster} alt="Ticket Poster" />

              <Stack>
                <CardBody w="inherit">
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
                    <RadioGroup onChange={setPayValue} value={payValue}>
                      <Grid alignContent="center">
                        <Card minH="50px" m="10px">
                          <Radio value="toss">
                            <Image src="/public/pay/tosspay.png" w="80px" />
                            <Text>토스페이 </Text>
                          </Radio>
                        </Card>
                        <Card minH="50px" m="10px">
                          <Radio value="kakao">
                            <Image src="/public/pay/kakaopay.png" w="80px" p="10px" />
                            <Text>카카오페이 </Text>
                          </Radio>
                        </Card>
                        <Card minH="50px" m="10px">
                          <Radio value="naver">
                            <Image src="/public/pay/naverpay.png" w="80px" />
                            <Text>네이버페이 </Text>
                          </Radio>
                        </Card>
                      </Grid>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <Grid>
                      <Card>
                        <Checkbox as="b" defaultChecked>
                          <Text>카드결제 </Text>
                        </Checkbox>
                      </Card>
                    </Grid>
                  </TabPanel>
                  <TabPanel>
                    <Grid>
                      <Card>
                        <Checkbox as="b" defaultChecked>
                          <Text>무통장 입금 </Text>
                        </Checkbox>
                      </Card>
                    </Grid>
                  </TabPanel>
                  <TabPanel>
                    <Grid>
                      <Card>
                        <Checkbox as="b" defaultChecked>
                          <Text>휴대폰 결제 </Text>
                        </Checkbox>
                      </Card>
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </Box>
          <Grid>
            <Card m="20px">
              <Text as="b">현금영수증</Text>
              <Flex m="10px" flexDirection="row">
                <RadioGroup onChange={setReceipt} value={receipt}>
                  <Flex m="10px">
                    <Radio value="true" defaultChecked>
                      신청
                    </Radio>
                  </Flex>
                  <Flex m="10px">
                    <Radio value="false">미신청</Radio>
                  </Flex>
                </RadioGroup>
              </Flex>
            </Card>
          </Grid>
          <Grid m="20px">
            <Card>
              <Heading size="md">총 결제 금액</Heading>
              <Text>{detail.pcseguidance}</Text>
            </Card>
          </Grid>
        </Box>
        <Grid>
          <Button colorScheme="brand" onClick={onOpen}>
            결제하기
          </Button>
        </Grid>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />

            <ModalHeader />
            <ModalBody py={6}>
              <Text textAlign="center" as="b">
                결제 진행하러 가겠습니다!
              </Text>
            </ModalBody>

            <ModalFooter gap={2}>
              <Button role="link" onClick={() => navigate('/chat')} colorScheme="brand" flex={1}>
                네 결제하러 갈래요
              </Button>

              <Button variant="ghost" onClick={onClose} flex={1}>
                조금만 더 생각해볼게요
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default TicketingPage;

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
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';

const TicketingPage: FC = () => {
  const [detail, setDetail] = useState<PerformanceDetail>([]);
  const { mt20id } = useParams();
  const toast = useCustomToast();
  const [payValue, setPayValue] = useState<string>('toss');
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
          <Box m="10px">
            <Heading textAlign="center" m="20px" size="lg">
              주문/결제
            </Heading>
            <Card variant="outline">
              <Heading size="md" m="20px">
                상품 정보
              </Heading>

              <Card direction={{ base: 'column', md: 'row' }} overflow="hidden" variant="outline" minH="200px" p="10px">
                <Image
                  maxW={{ base: '100%', md: '200px' }}
                  maxH={{ base: '400px', md: '100%' }}
                  src={detail.poster}
                  alt="Ticket Poster"
                  objectFit="contain"
                />

                <Stack>
                  <CardBody w="inherit">
                    <Heading size="md">{detail.prfnm}</Heading>

                    <Text>
                      장소: {detail.fcltynm} <br /> 기간: {detail.prfpdfrom} - {detail.prfpdto}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Flex alignItems="center" justifyItems="left">
                      <Badge borderRadius="10px" fontSize="sm" p="8px" m="5px" colorScheme="brand" variant="solid">
                        가격
                      </Badge>
                      <Text as="b">{detail.pcseguidance}</Text>
                    </Flex>
                  </CardFooter>
                </Stack>
              </Card>
            </Card>
          </Box>
          <Box m="10px">
            <Card variant="outline">
              <CardHeader>
                <Heading size="md">주문자 확인</Heading>
                <Text>주문자의 정보가 틀리다면, 직접 수정해주세요!</Text>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" m="10px">
                      주문자 성명
                    </Heading>
                    <Card variant="outline">
                      <Editable defaultValue="김아무개" justifyItems="center" justifyContent="center">
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Card>
                  </Box>
                  <Box>
                    <Heading size="xs" m="10px">
                      주문자 전화번호
                    </Heading>
                    <Card variant="outline">
                      <Editable defaultValue="01040303105" justifyItems="center" justifyContent="center">
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Card>
                  </Box>
                  <Box>
                    <Heading size="xs" m="10px">
                      주문자 이메일
                    </Heading>
                    <Card variant="outline">
                      <Editable defaultValue="acb4287@gmail.com" justifyItems="center" justifyContent="center">
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Card>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Box m="10px">
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

          <Card m="10px" variant="outline">
            <Heading size="md" m="10px" textAlign="right">
              총 결제 금액
            </Heading>
            <Text m="10px" textAlign="right" as="b" size="lg">
              {detail.pcseguidance}
            </Text>
          </Card>
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
                결제 진행하겠습니다!
              </Text>
            </ModalBody>

            <ModalFooter gap={2}>
              <Button role="link" onClick={() => navigate('/chat')} colorScheme="brand" flex={1}>
                네 진행해주세요
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

import { useRouter } from 'next/router';
import { useState, useEffect, FC } from 'react';
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
  Input,
  FormControl,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { payMethod, simplePayMethod } from '@/constants/detail';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useSupabase } from '@/providers/SupabaseProvider.tsx';

const TicketingPage: FC = () => {
  const router = useRouter();
  const mt20id = router.query.id as string;
  const [detail, setDetail] = useState<PerformanceDetail>();
  const toast = useCustomToast();
  const { user } = useSupabase();
  const [payValue, setPayValue] = useState<string>('toss');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);

  const fetchDetail = async (mt20id: string) => {
    try {
      const response = await PerformanceService.getDetail({ mt20id });
      setDetail(response);
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    if (!mt20id) return;
    fetchDetail(String(mt20id));
  }, [mt20id]);

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
          <Box m="5px">
            <Card variant="outline">
              <CardHeader>
                <Heading size="md">주문자 확인</Heading>
                <Text>주문자의 정보가 틀리다면, 직접 수정해주세요! </Text>
                <Text as="b">주문자의 정보가 모두 들어가야 예매가 가능합니다 😊</Text>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <FormControl>
                    <Box>
                      <Heading size="xs" m="10px">
                        주문자 성명
                      </Heading>
                      <Card variant="outline">
                        <Input
                          type="text"
                          placeholder={user?.name ?? '이름 정보가 없습니다'}
                          color={user?.name ?? 'inherit'}
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </Card>
                    </Box>
                    <Box>
                      <Heading size="xs" m="10px">
                        주문자 전화번호
                      </Heading>
                      <Card variant="outline">
                        <Input
                          type="text"
                          placeholder={user?.phone ? user?.phone : '전화번호 정보가 없습니다'}
                          color={user?.phone ?? 'inherit'}
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                        />
                      </Card>
                    </Box>
                  </FormControl>
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
                        {simplePayMethod.map(value => (
                          <Card minH="50px" m="10px" key={value.value}>
                            <Radio value={value.value}>
                              <Image src={value.image} w="80px" />
                              <Text>{value.name}</Text>
                            </Radio>
                          </Card>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </TabPanel>
                  {payMethod.map(value => (
                    <TabPanel key={value.title}>
                      <Grid>
                        <Card>
                          <Checkbox as="b" defaultChecked>
                            <Text>{value.title} </Text>
                          </Checkbox>
                        </Card>
                      </Grid>
                    </TabPanel>
                  ))}
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
          <Button colorScheme="brand" onClick={onOpen} isDisabled={!user?.name || !user?.phone}>
            결제하기
          </Button>
        </Grid>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />

            <ModalHeader />
            <ModalBody py={6} textAlign="center">
              <Text as="b">결제 진행하겠습니다!</Text>
            </ModalBody>

            <ModalFooter gap={2}>
              <Button
                role="link"
                onClick={() => router.push(`/detail/${mt20id}/ticketing/result`)}
                colorScheme="brand"
                flex={1}
              >
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

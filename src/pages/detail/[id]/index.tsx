import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { GeoAlt } from 'react-bootstrap-icons';
import {
  Box,
  Flex,
  Badge,
  Image,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  Avatar,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import KakaoMap from '@/components/KakaoMap';
import TicketingButton from '@/components/TicketingButton';
import ZoomImage from '@/components/shared/ZoomImage';
import { ticketSale } from '@/constants/detail';
import { ProfileImage } from '@/constants/link';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useSupabase } from '@/providers/SupabaseProvider.tsx';

type commentList = { user: string; content: string }[];

const DetailPage: FC = () => {
  const [detail, setDetail] = useState<PerformanceDetail>();
  const router = useRouter();
  const mt20id = router.query.id as string;
  const toast = useCustomToast();
  const { user } = useSupabase();
  const [content, setContent] = useState<string>('');
  const [commentList, setCommentList] = useState<commentList>([{ user: 'love_penguin', content: 'wow' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveComment = e => {
    setContent(e.target.value);
  };

  const handleCommentSubmit = async (content: string, name?: string) => {
    if (!content) return;
    if (!name) {
      toast.error('사용자의 이름 정보가 없습니다.');
      return;
    }
    if (name && content) {
      setCommentList([
        ...commentList,
        {
          user: name,
          content: content,
        },
      ]);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCartButtonClick = () => {
    if (user) {
      openModal();
    } else {
      toast.error('로그인되지 않았습니다.');
    }
  };

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
    <Box p="10px 10%" bg="purple.50">
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody m="20px">
            <Text as="b">위시리스트 목록에 추가되었어요!</Text>
          </ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="brand" onClick={closeModal}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bgColor="white" fontSize="xl">
        <Card variant="outline" m="20px">
          <Flex p="10px" flexDirection={{ base: 'column', md: 'row' }}>
            <Flex flex={1} m="0 auto" p="50px">
              <ZoomImage src={detail.poster} />
            </Flex>

            <Flex flex={2} flexDirection="column" w="100%" minH="700px">
              <Flex gap={3} m="20px">
                <Heading>
                  <Badge borderRadius="10px" fontSize="lg" p="8px" m="10px 5px" colorScheme="brand" variant="solid">
                    {detail.genrenm}
                  </Badge>
                  {detail.prfnm}
                </Heading>
              </Flex>
              <Box>
                <Tabs isFitted colorScheme="brand">
                  <TabList>
                    <Tab>콘서트 정보</Tab>
                    <Tab>티켓 할인 정보</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Flex flexDirection="column" gap={10}>
                        <Flex>
                          <Flex w="100px">
                            <Text>장소</Text>
                          </Flex>
                          <Text as="b">{detail.fcltynm}</Text>
                        </Flex>
                        <Flex>
                          <Flex w="100px">
                            <Text>기간</Text>
                          </Flex>
                          <Text as="b">
                            {detail.prfpdfrom} - {detail.prfpdto}
                          </Text>
                        </Flex>
                        <Flex>
                          <Flex w="100px">
                            <Text>관람 시간</Text>
                          </Flex>
                          <Text as="b">{detail.prfruntime}</Text>
                        </Flex>
                        <Flex>
                          <Flex w="100px">
                            <Text>관람 등급</Text>
                          </Flex>
                          <Text as="b">{detail.prfage}</Text>
                        </Flex>
                        <Flex>
                          <Flex w="100px">
                            <Text>예매 가격</Text>
                          </Flex>
                          <Text as="b">{detail.pcseguidance}</Text>
                        </Flex>
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Flex flexDirection="column" gap={10}>
                        {ticketSale &&
                          ticketSale.map(value => (
                            <Flex flexDirection={{ base: 'column', md: 'row' }}>
                              <Flex textAlign="center">
                                <Text ml="1" fontSize="0.8em" colorScheme="brand">
                                  {value.title}
                                </Text>
                              </Flex>
                              <Flex w="250px">
                                <Text> {value.content.subtitle}</Text>
                              </Flex>
                              <Text as="b">{value.content.subcontent}</Text>
                            </Flex>
                          ))}
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Flex flexDirection="row-reverse" gap="10px" m="40px" h="100%" alignItems="flex-end">
                <TicketingButton id={mt20id} user={user} />

                <Button colorScheme="accent" size="lg" onClick={handleCartButtonClick}>
                  찜하기
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Box minH="1000px">
          <Tabs isFitted colorScheme="brand" isLazy>
            <TabList mb="1em">
              <Tab>상세 정보</Tab>
              <Tab>관람 후기</Tab>
              <Tab>장소 정보</Tab>
              <Tab>예매/취소 안내</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {detail?.styurls &&
                  [detail.styurls].flat().map(url => <Image key={url + 'detail image'} src={url} alt="" m="0 auto" />)}
                <Flex></Flex>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Flex gap={3}>
                    <Heading size="lg">관람 후기</Heading>
                    <Heading size="lg" color="red">
                      {commentList.length}
                    </Heading>
                  </Flex>

                  <Flex p="20px 0px">
                    <Box>
                      <Avatar name={user?.name} src={ProfileImage} m="10px" size="lg" />
                      <Text textAlign="center" color="gray">
                        {user?.name}
                      </Text>
                    </Box>

                    <Input placeholder="댓글을 입력하세요" value={content} onChange={saveComment} m="auto 0" />
                    <Button
                      colorScheme="brand"
                      m="0 10px"
                      onClick={() => handleCommentSubmit(content, user?.name)}
                      my="auto"
                    >
                      등록
                    </Button>
                  </Flex>
                  <Flex>
                    <Box>
                      {commentList &&
                        commentList.map(value => (
                          <Flex
                            m="20px"
                            flexDirection={{ base: 'column', md: 'row' }}
                            key={`${value.user} - ${value.content}`}
                          >
                            <Box>
                              <Avatar name={value.user} src={user?.imageUrl ?? ProfileImage} m="10px" size="lg" />
                              <Text textAlign="center" color="gray">
                                {value.user}
                              </Text>
                            </Box>
                            <Box>
                              <Box borderRadius="md" bg="gray.200" px={4} p="20px" m="10px">
                                {value.content}
                              </Box>
                            </Box>
                          </Flex>
                        ))}
                    </Box>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel>
                <Card m="10%" p="50px" variant="outline">
                  <Flex flexDirection={{ base: 'md', md: 'row' }}>
                    <Flex m="auto 10px">
                      <GeoAlt size="50px" />
                    </Flex>
                    <Heading size="lg" m="auto 0">
                      장소
                    </Heading>
                    <Button
                      as="a"
                      href={`https://map.kakao.com/link/search/${detail.fcltynm}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      colorScheme="brand"
                      m="20px"
                    >
                      장소 검색하러 가기
                    </Button>
                  </Flex>
                  <Box h="800px">
                    <KakaoMap detail={detail} />
                  </Box>
                </Card>
              </TabPanel>
              <TabPanel>
                <Flex m="0 auto" fontSize="lg">
                  <Box w="100%">
                    <Heading size="xl" m="20px 0" pb="2" borderBottom="2px" borderColor="brand.100">
                      예매/취소 안내
                    </Heading>
                    <Heading size="lg" mb="10px">
                      일반 배송 안내
                    </Heading>
                    <Text as="b">
                      <br />
                      1. 일반배송
                    </Text>
                    <Text>
                      - 일반배송 예매 완료(결제 완료)확인 후, 인편배송으로 영업일 기준 10일 이내 티켓을 수령하실 수
                      있습니다. <br />- 티켓을 배송하기 위한 배송료는 고객이 부담합니다. 행사 또는 관람일에 따라
                      일반배송 선택이 제한될 수 있습니다.
                    </Text>
                    <Text as="b">2. 현장수령</Text>
                    <Text>
                      - 행사 당일 공연 시작 시간 1시간 전 ~ 30분 전까지 행사장 매표소에서 티켓을 수령하실 수 있습니다.{' '}
                      <br />- 현장 매표소에서 예매 완료 SMS 또는 예매번호 및 예매자 정보 확인 후 티켓을 수령할 수
                      있습니다. <br />
                      - 기획사 정책 또는 행사일에 따라 현장 수령 방법의 선택이 제한될 수 있습니다.​ <br />
                      <br /> <br /> <br />​
                    </Text>

                    <Heading size="xl" m="20px 0" pb="2" borderBottom="2px" borderColor="brand.100">
                      예매/취소 안내
                    </Heading>
                    <Heading size="lg" mb="10px">
                      티켓 수령 안내
                    </Heading>
                    <Text>
                      예매 당일 취소하는 경우 이외에는 예매수수료는 환불되지 않습니다. <br />
                      <br />
                      티켓 예매 후 7일 이내 취소 시 취소수수료는 부과되지 않습니다. <br />
                      단, 예매 후 7일 이내라도 취소시점이 관람일로부터 10일 이내라면 그에 해당하는 취소수수료가
                      부과됩니다. <br />
                      <br />
                      배송 받은 티켓의 반품 접수는 취소가능시간 이내(영업일 기준)에 우편(빠른 등기) 또는 본사 반품을
                      통해서 입고 완료 건에 한하여 취소 가능하며, 입고 일을 기준으로 취소수수료 적용됩니다. <br />
                      일반우편 또는 택배로 반송 시 발생되는 분실, 지연 도착 등의 문제는 티켓링크에서 책임지지 않으니
                      이점 유의하시기 바랍니다.
                      <br />
                      <br />
                    </Text>
                    <Heading size="lg" mt="20px" mb="10px">
                      취소 가능 시간
                    </Heading>
                    <TableContainer>
                      <Table variant="striped" colorScheme="brand">
                        <Thead>
                          <Tr>
                            <Th>관람일 구분</Th>
                            <Th>취소 가능 시간</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>일반</Td>
                            <Td>관람일 1일전 17:00시까지</Td>
                          </Tr>
                          <Tr>
                            <Td>​관람일이 연휴기간이거나 연휴 다음날인 경우​</Td>
                            <Td>
                              연휴 시작일 1일전 17:00시까지
                              <br />
                              (연휴기간이 토요일~화요일인 경우 금요일 17시까지 취소가능)
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <Text opacity={0.3}>일부 공연의 경우 취소 가능 시간이 상이할 수 있습니다.​​​</Text>
                    <Heading size="lg" mt="20px" mb="10px">
                      티켓 환불 안내
                    </Heading>
                    <Text>
                      예매취소 시 취소수수료와 배송료를 제외한 나머지 금액이 환불 됩니다. <br />
                      <br />
                      취소수수료는 상품별로 상이할 수 있으며 상품 상세정보 하단에서 확인할 수 있습니다. <br />
                      <br />
                      무통장입금으로 결제한 경우 환불처리를 위해 예매자 본인명의의 계좌정보(예금주, 은행, 계좌번호)를
                      입력해야 하며 접수일로부터 3~5일(영업일기준)이내 환불 받을 수 있습니다. <br />
                      상품에 따라 환불 시 송금수수료 500원이 부과될 수 있습니다. ​<br />
                      <br />
                      신용카드로 결제한 경우 취소일로부터 3~6일(영업일기준)이내 카드사에서 승인취소를 확인할 수
                      있습니다. <br />
                      <br />
                      계좌이체, 실시간 계좌출금으로 결제한 경우 취소 시 1~2일(영업일 기준)이내 환불 됩니다. <br />
                      휴대폰결제로 결제한 경우 당월 취소 시 즉시 환불되나 익월 취소 시에는 최대 60일까지 소요됩니다.{' '}
                      <br />
                      PAYCO포인트, 예매권, 상품권으로 결제한 경우 취소 시 즉시 계정으로 환불 됩니다.
                      <br />
                      <br />
                    </Text>
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailPage;

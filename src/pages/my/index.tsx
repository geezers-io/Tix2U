import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Input,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import DeleteIDButton from '@/components/DeleteIDButton';
import ImageUpload from '@/components/ImageUploader';
import { ProfileImage } from '@/constants/link';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useSupabase } from '@/providers/SupabaseProvider.tsx';
import { processer } from '@/utils/process';
import { partialToTableRow } from '@/utils/supabase.ts';

const MyPage: FC = () => {
  const { supabase, user, setUser } = useSupabase();
  const [cartItems, setCartItems] = useState<PerformanceDetail[]>([]);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [birth, setBirth] = useState(user?.birth);
  const [address, setAddress] = useState(user?.address);
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const mt20ids = ['PF215946', 'PF228209', 'PF232498', 'PF232506'];
  const toast = useCustomToast();
  const now = new Date();

  const fetchCart = async (mt20id: string) => {
    try {
      const response = await PerformanceService.getDetail({ mt20id });
      setCartItems(prevItems => {
        if (prevItems.some(item => item.mt20id === response.mt20id)) {
          return prevItems;
        }
        return [...prevItems, response];
      });
    } catch (e) {
      toast.error(e);
    }
  };

  //프로필 정보 업데이트
  const updateProfile = async () => {
    if (!user || !user.email) return;

    try {
      const updates = partialToTableRow({
        id: user.id,
        name,
        birth,
        phone,
        email: user.email,
        updated_at: processer.date(now),
        address,
        imageUrl,
      });

      await supabase.from('profiles').upsert(updates).select();
      setUser(prev => {
        if (!prev) return;
        return { ...prev }; // NOTE: SupabaseProvider 내 effect 발생시켜서 profile 업데이트
      });
      onClose();
    } catch {
      toast.error('업데이트에 실패했습니다.');
    }
  };

  const logoutSubmit = async () => {
    try {
      await supabase.auth.signOut();
      setUser(undefined);
      router.push('/');
      toast.success('로그아웃 되었습니다.');
    } catch {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (cartItems.length !== mt20ids.length) {
      mt20ids.forEach(id => fetchCart(id));
    }
  }, [cartItems]);

  if (!user) return;
  return (
    <Box bgColor="purple.50" minHeight="80vh" p="10px 5%" display="flex" justifyContent="center">
      <Box bgColor="white" p={5} w={{ base: '80%', md: '800px' }} minHeight="80vh">
        <Flex gap={3} flexDirection="row-reverse">
          <Button colorScheme="red" onClick={logoutSubmit}>
            로그아웃
          </Button>
          <DeleteIDButton userID={user.id} />
        </Flex>
        <HStack spacing={{ base: '4', md: '8' }} align="center" direction={{ base: 'column', md: 'row' }}>
          <VStack spacing="4" m="20px auto">
            <ImageUpload
              url={imageUrl ?? ProfileImage}
              onUpload={(url: string) => {
                setImageUrl(url);
              }}
            />

            <Heading size="lg" textAlign="left">
              {name}
            </Heading>
            <Text color="gray.500" textAlign="left">
              {user.email}
            </Text>
          </VStack>
        </HStack>
        <Flex h="inherit" flexDirection="column" m="0 auto">
          <Tabs
            position="relative"
            variant="soft-rounded"
            colorScheme="brand"
            align="center"
            w="100%"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <TabList>
              <Tab>회원정보</Tab>
              <Tab>위시리스트 목록</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing="4" mt="8" align="left" h="inherit">
                  <Box>
                    <Text fontWeight="bold">이름:</Text>
                    <Text>{user?.name ?? '이름 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">전화번호:</Text>
                    <Text>{user?.phone ?? '전화번호 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">생년월일:</Text>
                    <Text>{user?.birth ?? '생년월일 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">주소:</Text>
                    <Text>{user?.address ?? '주소 정보가 없습니다'}</Text>
                  </Box>

                  <Button colorScheme="accent" onClick={onOpen}>
                    정보 변경
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>회원 정보 변경하기</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <VStack spacing="4" mt="8" align="left" id="edit-profile">
                          <Box>
                            <Text fontWeight="bold">이름:</Text>
                            <Input
                              type="text"
                              placeholder={name ?? '이름 정보가 없습니다'}
                              value={name}
                              onChange={e => setName(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">전화번호:</Text>
                            <Input
                              type="text"
                              placeholder={phone ?? '전화번호 정보가 없습니다'}
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">생년월일 :</Text>
                            <Input
                              placeholder={birth ?? '생년월일 정보가 없습니다'}
                              value={birth}
                              onChange={e => setBirth(e.target.value)}
                              type="date"
                              max={processer.date(now)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">주소:</Text>
                            <Input
                              placeholder={address ?? '주소 정보가 없습니다'}
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                              type="text"
                            />
                          </Box>
                        </VStack>
                      </ModalBody>

                      <ModalFooter gap={3}>
                        <Button colorScheme="brand" onClick={updateProfile}>
                          변경하기
                        </Button>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          닫기
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Link href="/carts">
                  <Button colorScheme="brand" m="10px">
                    위시리스트로 이동하기
                  </Button>
                </Link>
                <VStack align="start" spacing={{ base: '2', md: '4' }}>
                  {cartItems.map(item => (
                    <Box
                      key={item.mt20id}
                      border="1px"
                      borderRadius="md"
                      p="4"
                      width="100%"
                      shadow="lg"
                      transition="all 0.3s"
                      _hover={{
                        cursor: 'pointer',
                        transform: 'scale(1.05)',
                      }}
                    >
                      <HStack alignItems="start" spacing="4">
                        <Box>
                          <HeartFill style={{ color: 'pink', width: '1em', height: '1em' }} />
                        </Box>
                        <Image src={item.poster} objectFit="contain" boxSize={{ base: '80px', md: '100px' }} />

                        <VStack align="start" flex="1">
                          <Link href={`detail/${item.mt20id}`}>
                            <HStack>
                              <VStack align="start" flex="1">
                                <Text
                                  ml="3"
                                  noOfLines={1}
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  width="100%"
                                >
                                  {item.prfnm}
                                </Text>
                                <Text fontWeight="bold" marginBottom="1" ml="5">
                                  {`제한 연령: ${item.prfage}`}
                                </Text>
                              </VStack>
                            </HStack>
                          </Link>
                        </VStack>

                        <Text
                          ml="2"
                          noOfLines={1}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          width={{ base: '100%', md: '70%' }}
                          pl={{ base: '0', md: '4' }}
                        >
                          <Tooltip label={item.fcltynm} placement="top">
                            <span>{`장소: ${item.fcltynm}`}</span>
                          </Tooltip>
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <Divider mt={{ base: '4', md: '8' }} mb={{ base: '4', md: '6' }} /> */}
        </Flex>
      </Box>
    </Box>
  );
};

export default MyPage;

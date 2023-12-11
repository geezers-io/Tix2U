import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Avatar,
  Divider,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Image as ChakraImage } from '@chakra-ui/react';
import { Tables } from '@/api/lib/database.types';
import supabase from '@/api/lib/supabase';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { ProfileImage } from '@/constants/detail';
import { useCustomToast } from '@/hooks/useCustomToast';
import { processer } from '@/utils/process';

const MyPage: FC = () => {
  const [cartItems, setCartItems] = useState<PerformanceDetail[]>([]);
  const mt20ids = ['PF215946', 'PF228209'];
  // const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const toast = useCustomToast();
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [emailID, setEmailID] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | null>('');
  const [birth, setBirth] = useState<string | null>('');
  const [userID, setUserID] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const now = new Date();

  const fetchCart = async (mt20id: string) => {
    try {
      const response = await PerformanceService.getDetail({ mt20id });
      if (!cartItems.some(item => item.mt20id === response.mt20id)) {
        setCartItems(prevItems => [...prevItems, response]);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  // database user_id 들고오기
  const getID = async () => {
    try {
      const user = await supabase.auth.getUser();

      if (user.data.user) {
        setUserID(user.data.user?.id);
        setEmailID(user.data.user?.email);
      }
    } catch {
      toast.error('유저 아이디를 들고 오지 못했습니다.');
    }
  };

  //프로필 정보 들고오기
  const getProfile = async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userID).single();

      if (data) {
        setName(data.name);
        setPhone(data.phone);
        setEmail(data.email);
        setBirth(data.birth);
      }
    } catch {
      toast.error('유저 정보를 들고 오지 못했습니다.');
    }
  };

  //프로필 정보 업데이트
  const updateProfile: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();

    try {
      const updates: Tables<'profiles'> = {
        id: userID,
        name,
        birth,
        phone,
        email,
        updated_at: processer.date(now),
      };

      await supabase.from('profiles').upsert(updates).select();
      onClose();
    } catch {
      toast.error('업데이트에 실패했습니다.');
    }
  };

  const logoutSubmit = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  // const toggleExpansion = (mt20id: string) => {
  //   setExpandedItems(prevExpanded =>
  //     isExpanded(mt20id) ? prevExpanded.filter(id => id !== mt20id) : [...prevExpanded, mt20id],
  //   );
  // };

  // const isExpanded = (mt20id: string) => expandedItems.includes(mt20id);

  useEffect(() => {
    getID();
    getProfile();
    mt20ids.forEach(id => fetchCart(id));
  }, [userID]);

  // if (!userID) {
  //   toast.error('로그인을 해주세요');
  //   navigate('/login');
  // }

  return (
    <Box bgColor="purple.50" minHeight="80vh" p="10px 5%" display="flex" justifyContent="center">
      <Box bgColor="white" p={5} w={{ base: '80%', md: '800px' }} minHeight="80vh">
        <HStack spacing={{ base: '4', md: '8' }} align="center" direction={{ base: 'column', md: 'row' }}>
          <VStack spacing="4" m="20px auto">
            <Avatar size="xl" name={name ?? ' '} src={ProfileImage} />
            <Heading size="lg" textAlign="left">
              {name}
            </Heading>
            <Text color="gray.500" textAlign="left">
              {emailID}
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
              <Tab>장바구니 목록</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing="4" mt="8" align="left">
                  <Box>
                    <Text fontWeight="bold">Name:</Text>
                    <Text>{name ? name : '이름 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Phone:</Text>
                    <Text>{phone ? phone : '전화번호 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Birth:</Text>
                    <Text>{birth ? birth : '생년월일 정보가 없습니다'}</Text>
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
                            <Text fontWeight="bold">Name:</Text>
                            <Input
                              type="text"
                              placeholder={name ? name : '이름 정보가 없습니다'}
                              onChange={e => setName(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Phone:</Text>
                            <Input
                              type="text"
                              placeholder={phone ? phone : '전화번호 정보가 없습니다'}
                              onChange={e => setPhone(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Birth:</Text>
                            <Input
                              placeholder={birth ? birth : '생년월일 정보가 없습니다'}
                              onChange={e => setBirth(e.target.value)}
                              type="date"
                              max={processer.date(now)}
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
                        transform: 'scale(1.020)',
                      }}
                    >
                      <HStack alignItems="start" spacing="4">
                        <ChakraImage src={item.poster} objectFit="contain" boxSize={{ base: '80px', md: '100px' }} />
                        <VStack align="start" flex="1">
                          <HStack direction={{ base: 'column', md: 'row' }}>
                            <VStack align="start" flex="1">
                              <Text ml="5">{item.prfnm}</Text>
                              <Text fontWeight="bold" marginBottom="1" ml="5">
                                {`제한 연령: ${item.prfage}`}
                              </Text>
                            </VStack>
                          </HStack>
                        </VStack>
                        <Text ml="2" pl={{ base: '0', md: '4' }}>{`장소: ${item.fcltynm}`}</Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Divider mt={{ base: '4', md: '8' }} mb={{ base: '4', md: '6' }} />
        </Flex>

        <Flex gap={3} flexDirection="row-reverse">
          <Button colorScheme="red" onClick={logoutSubmit}>
            로그아웃
          </Button>
          <Button colorScheme="red" variant="outline">
            회원탈퇴
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default MyPage;

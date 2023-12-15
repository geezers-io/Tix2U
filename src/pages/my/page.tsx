import { FC, useEffect, useState } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { Tables } from '@/api/lib/database.types';
import supabase from '@/api/lib/supabase';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import DeleteIDButton from '@/components/DeleteIDButton';
import ImageUpload from '@/components/ImageUploader';
import { ProfileImage } from '@/constants/link';
import { useCustomToast } from '@/hooks/useCustomToast';
import { processer } from '@/utils/process';

const MyPage: FC = () => {
  const [cartItems, setCartItems] = useState<PerformanceDetail[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [emailID, setEmailID] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | null>(null);
  const [birth, setBirth] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [userID, setUserID] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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

  // database user_id 들고오기
  const getID = async () => {
    try {
      const user = await supabase.auth.getUser();

      if (user.data.user) {
        setUserID(user.data.user?.id);
        setEmailID(user.data.user?.email);
      } else {
        toast.error('사용자의 정보가 없습니다.');
        navigate('/login');
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
        setBirth(data.birth);
        setEmail(data.email);
        setImageUrl(data.imageUrl);
        setAddress(data.address);
      }
    } catch {
      toast.error('유저 정보를 들고 오지 못했습니다.');
    }
  };

  //프로필 정보 업데이트
  const updateProfile = async event => {
    event.preventDefault();

    try {
      const updates: Tables<'profiles'> = {
        id: userID,
        name,
        birth,
        phone,
        email,
        updated_at: processer.date(now),
        imageUrl,
        address,
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
      toast.success('로그아웃 되었습니다.');
    } catch {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (cartItems.length !== mt20ids.length) {
      mt20ids.forEach(id => fetchCart(id));
      getID();
      getProfile();
    }
  }, [cartItems]);

  if (!userID) return;

  return (
    <Box bgColor="purple.50" minHeight="80vh" p="10px 5%" display="flex" justifyContent="center">
      <Box bgColor="white" p={5} w={{ base: '80%', md: '800px' }} minHeight="80vh">
        <Flex gap={3} flexDirection="row-reverse">
          <Button colorScheme="red" onClick={logoutSubmit}>
            로그아웃
          </Button>
          <DeleteIDButton userID={userID} />
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
              <Tab>위시리스트 목록</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing="4" mt="8" align="left" h="inherit">
                  <Box>
                    <Text fontWeight="bold">이름:</Text>
                    <Text>{name ? name : '이름 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">전화번호:</Text>
                    <Text>{phone ? phone : '전화번호 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">생년월일:</Text>
                    <Text>{birth ? birth : '생년월일 정보가 없습니다'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">주소:</Text>
                    <Text>{address ? address : '주소 정보가 없습니다'}</Text>
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
                              placeholder={name ? name : '이름 정보가 없습니다'}
                              onChange={e => setName(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">전화번호:</Text>
                            <Input
                              type="text"
                              placeholder={phone ? phone : '전화번호 정보가 없습니다'}
                              onChange={e => setPhone(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">생년월일 :</Text>
                            <Input
                              placeholder={birth ? birth : '생년월일 정보가 없습니다'}
                              onChange={e => setBirth(e.target.value)}
                              type="date"
                              max={processer.date(now)}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">주소:</Text>
                            <Input
                              placeholder={address ? address : '주소 정보가 없습니다'}
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
                <Link to="/cart">
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
                        <HeartFill color="pink" />
                        <Image src={item.poster} objectFit="contain" boxSize={{ base: '80px', md: '100px' }} />
                        <VStack align="start" flex="1">
                          <Link to={`detail/${item.mt20id}`}>
                            <HStack>
                              <VStack align="start" flex="1">
                                <Text ml="5">{item.prfnm}</Text>
                                <Text fontWeight="bold" marginBottom="1" ml="5">
                                  {`제한 연령: ${item.prfage}`}
                                </Text>
                              </VStack>
                            </HStack>
                          </Link>
                        </VStack>
                        <Text ml="2" pl={{ base: '0', md: '4' }}>{`장소: ${item.fcltynm}`}</Text>
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

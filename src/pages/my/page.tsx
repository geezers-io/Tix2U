import { FC, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { Image as ChakraImage } from '@chakra-ui/react';
import supabase from '@/api/lib/supabase';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { ProfileImage } from '@/constants/detail';
import { useCustomToast } from '@/hooks/useCustomToast';

const MyPage: FC = () => {
  const [cartItems, setCartItems] = useState<PerformanceDetail[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const mt20ids = ['PF215946', 'PF228209'];
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const toast = useCustomToast();
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [phone, setPhone] = useState<string | null>('');
  const [birth, setBirth] = useState<string | null>('');
  const [userID, setUserID] = useState<string>('');
  // const [userInfo, setUserInfo] = useState<any>();
  const navigate = useNavigate();

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

  const getID = async () => {
    try {
      const user = await supabase.auth.getUser();

      if (user.data.user) {
        setUserID(user.data.user?.id);
        console.log('유저 아이디', userID);
      }
    } catch {
      toast.error('안돼');
    }
  };

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
      toast.error('안돼');
    }
  };

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
  };

  {
    /*
  const handleUserInfoChange = (newUserInfo: { email?: string; name?: string; location?: string }) => {
    setUserInfo((prevUserInfo: any) => ({
      ...prevUserInfo,
      ...newUserInfo,
    }));
  };
*/
  }

  const toggleExpansion = (mt20id: string) => {
    setExpandedItems(prevExpanded =>
      isExpanded(mt20id) ? prevExpanded.filter(id => id !== mt20id) : [...prevExpanded, mt20id],
    );
  };

  const isExpanded = (mt20id: string) => expandedItems.includes(mt20id);

  useEffect(() => {
    getID();
    getProfile();
    mt20ids.forEach(id => fetchCart(id));
  }, [userID]);

  if (!userID) {
    toast.error('로그인을 해주세요');
    navigate('/login');
  }

  return (
    <Box bgColor="purple.50" minHeight="80vh" p="10px 5%" display="flex" justifyContent="center" alignItems="center">
      <Box bgColor="white" p={5} w={{ base: '100%', md: '70%' }} alignSelf="flex-start" minHeight="80vh">
        <HStack spacing={{ base: '4', md: '8' }} align="center" direction={{ base: 'column', md: 'row' }}>
          <VStack spacing="4" align="center" m="20px auto">
            <Avatar size="xl" name={name} src={ProfileImage} />
            <Heading size="lg" textAlign="left">
              {name}
            </Heading>
            <Text color="gray.500" textAlign="left">
              Tix2U
            </Text>
          </VStack>
        </HStack>
        <Flex h="inherit" flexDirection="column">
          <Tabs
            isFitted
            position="relative"
            variant="soft-rounded"
            colorScheme="brand"
            align="center"
            w="100%"
            index={currentTab}
            onChange={handleTabChange}
          >
            <TabList>
              <Tab>회원정보</Tab>
              <Tab>회원정보 수정</Tab>
              <Tab>주문 목록</Tab>
            </TabList>
          </Tabs>

          <Tabs index={currentTab} onChange={handleTabChange} flexDirection={{ base: 'column', md: 'row' }}>
            <TabPanels>
              <TabPanel>
                <VStack spacing="4" mt="8" align="left">
                  <Box>
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{email ? email : '이메일 정보가 없습니다'}</Text>
                  </Box>
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
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing="4" mt="8" align="left" id="edit-profile">
                  <Box>
                    <Text fontWeight="bold">Email:</Text>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      // onChange={e => handleUserInfoChange({ email: e.target.value })}
                    />
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Name:</Text>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      // onChange={e => handleUserInfoChange({ name: e.target.value })}
                    />
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Location:</Text>
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      // onChange={e => handleUserInfoChange({ location: e.target.value })}
                    />
                  </Box>
                  <Button colorScheme="accent" variant="outline">
                    비밀번호 변경
                  </Button>
                  <Button colorScheme="accent">정보 변경</Button>
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
                      onClick={() => toggleExpansion(item.mt20id)}
                    >
                      <HStack alignItems="start" spacing="4">
                        <ChakraImage src={item.poster} objectFit="contain" boxSize={{ base: '80px', md: '100px' }} />
                        <VStack align="start" flex="1">
                          <HStack>
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
        <Flex>
          <Button colorScheme="red" variant="outline">
            회원탈퇴
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default MyPage;

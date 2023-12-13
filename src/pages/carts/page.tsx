import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, Image, Checkbox, HStack, VStack } from '@chakra-ui/react';
import supabase from '@/api/lib/supabase';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';
import { colors } from '@/styles/theme/@colors';

const CartsPage: FC = () => {
  const [cartItems, setCartItems] = useState<PerformanceDetail[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [, setQuantity] = useState(1);
  const toast = useCustomToast();
  const gradient = `linear(to-r, ${colors.brand[300]}, ${colors.accent[300]})`;
  const mt20ids = ['PF215946', 'PF228209'];
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  const getID = async () => {
    try {
      const user = await supabase.auth.getUser();

      if (user.data.user) {
        setUserID(user.data.user?.id);
      } else {
        toast.error('로그인 정보가 없습니다.');
        navigate('/login');
      }
    } catch {
      toast.error('유저 아이디를 들고 오지 못했습니다.');
      navigate('/');
    }
  };

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

  const handleCheckboxToggle = (mt20id: string) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(mt20id) ? prevSelected.filter(id => id !== mt20id) : [...prevSelected, mt20id],
    );
  };

  const handleQuantityIncrease = (mt20id: string) => {
    setQuantity(prevQuantity => prevQuantity + 1);
    setCartItems(prevItems =>
      prevItems.map(item => (item.mt20id === mt20id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)),
    );
  };

  const handleQuantityDecrease = (mt20id: string) => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.mt20id === mt20id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item,
      ),
    );
  };

  const handleDeleteSelectedItems = () => {
    setCartItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.mt20id)));
    setSelectedItems([]);
  };

  const isExpanded = (mt20id: string) => expandedItems.includes(mt20id);

  const toggleExpansion = (mt20id: string) => {
    setExpandedItems(prevExpanded =>
      isExpanded(mt20id) ? prevExpanded.filter(id => id !== mt20id) : [...prevExpanded, mt20id],
    );
  };

  useEffect(() => {
    mt20ids.forEach(id => fetchCart(id));
    getID();
  }, [mt20ids]);

  if (!userID) return;

  return (
    <>
      <Box p={{ base: '10px 5%', md: '20px 10%' }} bg="purple.50">
        <Box pt={{ base: '40px', md: '60px' }} px={{ base: 2, md: 4 }} mx="auto" maxW="1200px" bg="white">
          <Box marginY={{ base: '20px', md: '40px' }}>
            <Heading size="lg" textAlign="center">
              <Box
                as="span"
                bgGradient={gradient}
                // color={useColorModeValue('white', 'black')}
                px={{ base: 4, md: 6 }}
                py={2}
                borderRadius="md"
                shadow="xl"
                display="inline-block"
                alignItems="center"
                marginBottom={{ base: '6', md: '10' }}
                width="20%"
              >
                Carts
              </Box>
            </Heading>
          </Box>

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
                onClick={() => toggleExpansion(item.mt20id)}
              >
                <HStack alignItems="start" spacing="4">
                  <Checkbox
                    isChecked={selectedItems.includes(item.mt20id)}
                    onChange={() => handleCheckboxToggle(item.mt20id)}
                  />
                  <Image src={item.poster} objectFit="contain" boxSize={{ base: '80px', md: '100px' }} />
                  <VStack align="start" flex="1">
                    <HStack>
                      <Button onClick={() => handleQuantityDecrease(item.mt20id)}>-</Button>
                      <Text>{item.quantity || 1}</Text>
                      <Button onClick={() => handleQuantityIncrease(item.mt20id)}>+</Button>
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

          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={{ base: '6', md: '10' }}
            mt={{ base: '6', md: '10' }}
            textAlign="center"
            bgGradient={`linear(to-r, ${colors.sub[300]}, ${colors.accent[300]})`}
            color="white"
            display="inline-block"
            px={{ base: '4', md: '6' }}
            py={{ base: '2', md: '3' }}
            borderRadius="md"
            shadow="xl"
            width="100%"
          >
            Amount
          </Text>

          {cartItems.map(item => (
            <Box key={item.mt20id} display="flex" flexDirection="row" marginBottom={{ base: '2', md: '4' }}>
              <Text>{item.pcseguidance}</Text>
            </Box>
          ))}

          <Button
            onClick={handleDeleteSelectedItems}
            disabled={selectedItems.length === 0}
            ml={{ base: '2', md: 'auto' }}
            mb={{ base: '6', md: '10' }}
            mr={{ base: 'auto', md: 'auto' }}
            mt={{ base: 'auto', md: '10' }}
            transform={{ base: 'none', md: 'none' }}
            colorScheme="accent"
            variant="outline"
          >
            선택된 상품 삭제
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CartsPage;

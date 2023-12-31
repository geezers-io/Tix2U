import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import { Box, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useSupabase } from '@/providers/SupabaseProvider.tsx';
import { colors } from '@/styles/theme/@colors';

const CartsPage: FC = () => {
  const [cartItems, setCartItems] = useState<PerformanceDetail[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const toast = useCustomToast();
  const { user } = useSupabase();
  const gradient = `linear(to-r, ${colors.brand[300]}, pink)`;
  const mt20ids = ['PF215946', 'PF228209', 'PF232498', 'PF232506'];

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

  const handleDelete = (mt20id: string) => {
    const updateData = cartItems.filter(item => item.mt20id !== mt20id);
    setCartItems(updateData);
  };

  const isExpanded = (mt20id: string) => expandedItems.includes(mt20id);

  const toggleExpansion = (mt20id: string) => {
    setExpandedItems(prevExpanded =>
      isExpanded(mt20id) ? prevExpanded.filter(id => id !== mt20id) : [...prevExpanded, mt20id],
    );
  };

  useEffect(() => {
    if (cartItems.length !== mt20ids.length) {
      mt20ids.forEach(id => fetchCart(id));
    }
  }, []);

  if (!user) return;
  return (
    <>
      <Box p={{ base: '10px 5%', md: '10px 10%' }} bg="purple.50">
        <Box pt={{ base: '10px', md: '15px' }} px={{ base: 2, md: 4 }} mx="auto" maxW="1200px" bg="white">
          <Box marginY={{ base: '20px', md: '40px' }}>
            <Heading size="lg" textAlign="center">
              <Box
                as="span"
                bgGradient={gradient}
                color="white"
                px={{ base: 4, md: 6 }}
                py={2}
                borderRadius="md"
                shadow="xl"
                display="inline-block"
                alignItems="center"
                marginBottom={{ base: '6', md: '10' }}
                width="20%"
                w="100%"
              >
                Wish-List
              </Box>
            </Heading>
          </Box>

          <VStack align="start" spacing={{ base: '2', md: '4' }}>
            <Text size="md">하트를 누르면 상품이 위시리스트에서 제거됩니다.</Text>
            {cartItems.map(item => (
              <Link key={item.mt20id} href={`/detail/${item.mt20id}`}>
                <Box
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
                  <HStack alignItems="start" spacing="4" flexDirection={{ base: 'column', md: 'row' }}>
                    <HeartFill
                      color="pink"
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(item.mt20id);
                      }}
                    />
                    <Image src={item.poster} objectFit="contain" w="100px" m="0 auto" />

                    <VStack align="start" flex="1">
                      <Text ml="5">{item.prfnm}</Text>
                      <Text fontWeight="bold" marginBottom="1" ml="5">
                        {`제한 연령: ${item.prfage}`}
                      </Text>
                    </VStack>
                    <Text ml="2" pl={{ base: '0', md: '4' }}>{`장소: ${item.fcltynm}`}</Text>
                  </HStack>
                </Box>
              </Link>
            ))}
          </VStack>
          {cartItems.length === 0 && (
            <VStack>
              <Heading size="md">위시리스트가 없습니다 😭</Heading>
            </VStack>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CartsPage;

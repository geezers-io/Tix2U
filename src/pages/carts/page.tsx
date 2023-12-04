import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';
import { colors } from '@/styles/theme/@colors';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

interface CartItem extends PerformanceDetail {
  selected: boolean;
}

const CartsPage: FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { mt20id } = useParams();
  const toast = useCustomToast();

  const fetchDetail = async (mt20id: string) => {
    try {
      const response = await PerformanceService.getDetail({ mt20id });
      setCart(prevCart => [...prevCart, { ...response, selected: false }]);
    } catch (e) {
      toast.error(e);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleCheckboxToggle = (index: number) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index].selected = !updatedCart[index].selected;
      return updatedCart;
    });
  };

  const handleDeleteSelectedItems = () => {
    setCart(prevCart => prevCart.filter(item => !item.selected));
  };

  const QuantitySelector: FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
    return (
      <Box display="flex" alignItems="center">
        <Button onClick={() => onQuantityChange(quantity - 1)}>-</Button>
        <Text marginX="2">{quantity}</Text>
        <Button onClick={() => onQuantityChange(quantity + 1)}>+</Button>
      </Box>
    );
  };

  useEffect(() => {
    if (!mt20id) return;
    fetchDetail(String(mt20id));
  }, [mt20id]);

  return (
    <>
      <Box p="10px 5%" bg="purple.50">
        <Box marginY="40px" display="flex" flexDirection="column" alignItems="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            marginBottom="1"
            paddingLeft="auto"
            paddingRight="auto"
          >
            <Box as="span" marginRight="2" fontSize="2xl" color={colors.brand[200]}>
              •
            </Box>
            장바구니
          </Text>
          <Box borderBottom="2px solid gray" marginBottom="1" width="88%" marginLeft="auto" marginRight="auto" />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" marginBottom="1">
          상품정보
        </Text>

        {cart.map((item, index) => (
          <Box key={index} display="flex" flexDirection="row" alignItems="center" marginBottom="2">
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => handleCheckboxToggle(index)}
              style={{ marginRight: '8px' }}
            />
            <Box marginRight="4">
              <Text marginRight="4">{item.prfnm}</Text>
              <Text marginRight="4">{`제한 연령: ${item.prfage}`}</Text>
              <Text>{`장소: ${item.fcltynm}`}</Text>
            </Box>
          </Box>
        ))}

        <Text fontSize="2xl" fontWeight="bold" marginBottom="1" marginTop="4">
          수량
        </Text>
        <QuantitySelector quantity={quantity} onQuantityChange={handleQuantityChange} />

        <Text fontSize="2xl" fontWeight="bold" marginBottom="1" marginTop="4">
          주문 금액
        </Text>
        {cart.length > 0 && (
          <Box display="flex" flexDirection="row" marginBottom="4">
            <Text>{`₩${(parseInt(cart[0].pcseguidance.replace(/,/g, '')) * quantity).toLocaleString()}`}</Text>
          </Box>
        )}

        <Button onClick={handleDeleteSelectedItems} disabled={cart.length === 0}>
          선택된 상품 삭제
        </Button>
      </Box>
    </>
  );
};

export default CartsPage;

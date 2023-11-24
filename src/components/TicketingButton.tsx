import { useState } from 'react';
import { Button } from '@chakra-ui/react';

const TicketingButton = () => {
  const [ticketing, setTicketing] = useState<boolean>(false);
  const handleButtonClick = () => {
    setTicketing(!ticketing);
  };
  return (
    <>
      {ticketing && (
        <Button colorScheme="gray" size="lg" onClick={handleButtonClick}>
          예매 중
        </Button>
      )}
      {!ticketing && (
        <Button colorScheme="brand" size="lg" onClick={handleButtonClick}>
          예매하기
        </Button>
      )}
    </>
  );
};

export default TicketingButton;

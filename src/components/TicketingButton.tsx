import { useNavigate } from 'react-router-dom';
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

const TicketingButton = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Button colorScheme="brand" size="lg" onClick={onOpen}>
        예매하기
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader />
          <ModalBody py={6} textAlign="center">
            <Text as="b">티켓 예매 페이지로 이동하겠습니다!</Text>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button role="link" onClick={() => navigate(`/detail/${id}/ticketing`)} colorScheme="brand" flex={1}>
              예매하러 갈래요!
            </Button>

            <Button variant="ghost" onClick={onClose} flex={1}>
              좀 더 고민해볼게요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TicketingButton;

import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/useCustomToast';

const TicketingButton = ({ id, user }) => {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useCustomToast();

  const onOpen = () => {
    if (user) {
      openModal();
    } else {
      toast.error('로그인되지 않았습니다.');
    }
  };

  return (
    <>
      <Button colorScheme="brand" size="lg" onClick={onOpen}>
        예매하기
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader />
          <ModalBody py={6} textAlign="center">
            <Text as="b">티켓 예매 페이지로 이동하겠습니다!</Text>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button role="link" onClick={() => router.push(`/detail/${id}/ticketing`)} colorScheme="brand" flex={1}>
              예매하러 갈래요!
            </Button>

            <Button variant="ghost" onClick={closeModal} flex={1}>
              좀 더 고민해볼게요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TicketingButton;

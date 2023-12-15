import { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Textarea,
  Image,
} from '@chakra-ui/react';
import supabase from '@/api/lib/supabase';
import { useCustomToast } from '@/hooks/useCustomToast';

interface Props {
  userID: string;
}

const DeleteIDButton: FC<Props> = ({ userID }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast();

  const deleteUserSubmit = async (userID: string) => {
    try {
      await supabase.auth.admin.deleteUser(userID);
      navigate('/');
      toast.success('회원 탈퇴되었습니다.');
    } catch {
      navigate('/');
      toast.error('탈퇴 처리가 정상적으로 처리되지 않았습니다.');
    }
  };

  return (
    <>
      <Button colorScheme="red" variant="outline" onClick={onOpen}>
        회원탈퇴
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={6} m="20px">
            <Image src="/public/name_logo.png" alt="no Image" />
            <Text>
              저희 Tix2U는 사용자의 원하는 정보에 접근할 수 있도록 최선을 다하고 있습니다. <br />
              서비스에 불만족스러운 부분이 있다면 의견 남겨주시면 감사하겠습니다.
            </Text>
            <Textarea rows={5} placeholder="사유를 적어주세요"></Textarea>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="red" onClick={() => deleteUserSubmit(userID)}>
              탈퇴하기
            </Button>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteIDButton;

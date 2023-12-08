import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, HStack, Heading, Text, Button, Avatar, Divider, Input } from '@chakra-ui/react';

const MyPage: FC = () => {
  return (
    <Box bgColor="purple.50" minHeight="100vh" p="10px 5%" display="flex" justifyContent="center" alignItems="center">
      <HStack spacing="4">
        <Box bg="purple.50" border="1px" borderColor="purple.200" w="50%" p="20px">
          <VStack spacing="4" align="left">
            <Link to="#profile">회원정보</Link>
            <Link to="#edit-profile">회원정보 수정</Link>
            <Link to="#orders">주문 조회</Link>
          </VStack>
        </Box>

        <Box bgColor="white" p={5} w="100%" maxW="800px">
          {' '}
          {/* 수정된 부분 */}
          <VStack spacing="4" align="center" id="profile">
            <Avatar size="xl" src="https://placekitten.com/200/200" />
            <Heading size="lg">준현 희정</Heading>
            <Text color="gray.500">Tix2U</Text>
          </VStack>
          <VStack spacing="4" mt="8" align="left">
            <Box>
              <Text fontWeight="bold">Email:</Text>
              <Text>Tix2u@google.com</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Name:</Text>
              <Text>준현 희정</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Location:</Text>
              <Text>Seoul, Korea</Text>
            </Box>
            <Button colorScheme="red" variant="outline">
              회원탈퇴
            </Button>
          </VStack>
          <Divider mt="8" mb="6" />
          <VStack spacing="4" mt="8" align="left" id="edit-profile">
            <Box>
              <Text fontWeight="bold">Email:</Text>
              <Input type="email" placeholder="Enter your email" />
            </Box>
            <Box>
              <Text fontWeight="bold">Name:</Text>
              <Input type="text" placeholder="Enter your name" />
            </Box>
            <Box>
              <Text fontWeight="bold">Location:</Text>
              <Input type="text" placeholder="Enter your location" />
            </Box>
            <Button colorScheme="accent" variant="outline">
              비밀번호 변경
            </Button>
            <Button colorScheme="accent">정보 변경</Button>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default MyPage;

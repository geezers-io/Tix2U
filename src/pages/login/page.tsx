import { useState } from 'react';
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
  Flex,
  AbsoluteCenter,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box p="10px 200px" bg="purple.50">
      <Box bgColor="white" p={5} minHeight="1000px" w="85%">
        <Box m="0 auto" w="50%" p="50px">
          <Flex m="auto 0" justifyContent="center" flexDirection="column">
            <Flex m="0 auto">
              <Image src="/public/name_logo.png" w="500px" />
            </Flex>

            <Flex w="80%" m="0 auto" flexDirection="column" gap="30px">
              <Box gap="20px">
                <Input placeholder="아이디(휴대폰 또는 이메일)" />
                <InputGroup size="md">
                  <Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="비밀번호" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Button colorScheme="brand">로그인</Button>

              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  또는
                </AbsoluteCenter>
              </Box>

              <Button colorScheme="blue">구글 로그인</Button>
            </Flex>
          </Flex>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

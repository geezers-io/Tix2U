import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Text,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box p="10px 200px" bg="purple.50">
      <Box m="0 auto" w="85%" bgColor="white" p={5} minHeight="1000px">
        <Box m="0 auto" w="50%" p="50px">
          <Flex m="auto 0" flexDirection="column" justifyContent="center">
            <Flex m="0 auto">
              <Image src="/public/name_logo.png" w="500px" />
            </Flex>

            <Flex m="0 auto" w="80%" flexDirection="column" gap="30px">
              <Flex flexDirection="column" gap="15px">
                <Input placeholder="아이디(휴대폰 또는 이메일)" />
                <InputGroup size="md">
                  <Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="비밀번호" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>

              <Button colorScheme="brand">로그인</Button>
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  또는
                </AbsoluteCenter>
              </Box>

              <Button colorScheme="blue">구글 로그인</Button>
              <Flex m="0 auto" w="60%" justifyContent="space-between">
                <Link to="/detail">
                  <Text>아이디 찾기</Text>
                </Link>
                <Link to="/detail">
                  <Text>비밀번호 찾기</Text>
                </Link>
                <Link to="/detail">
                  <Text> 회원가입</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

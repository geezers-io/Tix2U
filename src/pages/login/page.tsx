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
import supabase from '@/api/supabase';
import { useCustomToast } from '@/hooks/useCustomToast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClick = () => setShowPassword(!showPassword);
  const toast = useCustomToast();

  async function signInWithKakao() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'kakao',
      });
    } catch (e) {
      toast.error(e);
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      toast.info('로그아웃 하였어요');
    } catch (e) {
      toast.error(e);
    }
  }

  return (
    <Box p="10px 5%" bg="purple.50">
      <Box m="0 auto" bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px">
        <Box p="50px">
          <Flex m="auto 0" flexDirection="column" justifyContent="center">
            <Flex m="0 auto">
              <Image src="/public/name_logo.png" w="500px" />
            </Flex>

            <Flex m="0 auto" w="80%" flexDirection="column" gap="30px">
              <Flex flexDirection="column" gap="15px">
                <Input placeholder="아이디(휴대폰 또는 이메일)" />
                <InputGroup size="md">
                  <Input pr="4.5rem" type={showPassword ? 'text' : 'password'} placeholder="비밀번호" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {showPassword ? 'Hide' : 'Show'}
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

              <Box m="0 auto">
                <Image src="public/kakaoLogin.png" role="button" onClick={signInWithKakao} />
                <Button colorScheme="red" w="100%" p="20px" onClick={signOut}>
                  로그아웃
                </Button>
              </Box>
              <Flex m="0 auto" w="50%" justifyContent="space-between">
                <Link to="/login/find">
                  <Text>아이디/비밀번호 찾기</Text>
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

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import supabase from '@/api/lib/supabase';
import { useCustomToast } from '@/hooks/useCustomToast';
import { generateValidators } from '@/utils/formik';

type FormValues = {
  email: string;
  password: string;
};

const { validators, getFormikStates } = generateValidators<FormValues>({
  email: { required: true, range: { min: 4, max: 30 }, regex: 'email' },
  password: { required: true, range: { min: 4, max: 30 } },
});
const SignInPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClick = () => setShowPassword(!showPassword);
  const toast = useCustomToast();
  const navigate = useNavigate();

  const handleSubmit = async (value: FormValues) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });
      console.log(data);
      if (error) {
        toast.error(error);
      } else {
        toast.success('로그인에 성공했어요!');
        navigate('/');
      }
    } catch (e) {
      toast.error('로그인 접속에 성공하지 못했어요', e);
    }
  };

  const signInWithKakao = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'kakao',
      });
    } catch (e) {
      toast.error(e);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('로그아웃 하였어요');
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {}, []);
  return (
    <Formik<FormValues>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      {props => {
        const { showErrorDict, errors, canSubmit } = getFormikStates(props);
        return (
          <Form>
            <Box p="10px 5%" bg="purple.50">
              <Box m="0 auto" bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px">
                <Box p="50px">
                  <Flex m="auto 0" flexDirection="column" justifyContent="center">
                    <Flex m="0 auto">
                      <Image src="/public/name_logo.png" w="500px" />
                    </Flex>

                    <Flex m="0 auto" w="80%" flexDirection="column" gap="30px">
                      <Flex flexDirection="column" gap="15px">
                        <Field name="email" validate={validators.email}>
                          {({ field }: FieldProps<FormValues['email']>) => (
                            <FormControl isRequired isInvalid={showErrorDict.email}>
                              <Input placeholder="이메일" {...field} />
                              <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="password" validate={validators.password}>
                          {({ field }: FieldProps<FormValues['password']>) => (
                            <FormControl isRequired isInvalid={showErrorDict.password}>
                              <InputGroup size="md">
                                <Input
                                  pr="4.5rem"
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="비밀번호"
                                  {...field}
                                />
                                <InputRightElement width="4.5rem">
                                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {showPassword ? 'Hide' : 'Show'}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Button colorScheme="brand" type="submit" isDisabled={!canSubmit}>
                        로그인
                      </Button>
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
                      <Flex m="0 auto" justifyContent="space-between">
                        <Link to="/login/find">
                          <Button colorScheme="brand" size="sm" m="10px" variant="outline">
                            아이디/비밀번호 찾기
                          </Button>
                        </Link>

                        <Link to="/signUp">
                          <Button colorScheme="brand" size="sm" m="10px" variant="outline">
                            회원가입
                          </Button>
                        </Link>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignInPage;

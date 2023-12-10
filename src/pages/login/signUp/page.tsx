import { useState } from 'react';
import { Phone } from 'react-bootstrap-icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Image,
  Divider,
} from '@chakra-ui/react';
import { Form, Formik, Field, FieldProps } from 'formik';
import { supabase } from '@/api/lib/supabase';
import TermsOfUse from '@/components/TermsOfUse';
import { useCustomToast } from '@/hooks/useCustomToast';
import { generateValidators } from '@/utils/formik';
import { processer } from '@/utils/process';

type FormValues = {
  password: string;
  name: string;
  email: string;
  birth: string;
  phoneNumber: string;
};

const { validators, getFormikStates } = generateValidators<FormValues>({
  password: { required: true, range: { min: 4, max: 30 }, regex: 'korEngNumSpace' },
  name: { required: true, range: { min: 2, max: 10 } },
  email: { required: true, regex: 'email' },
  birth: { required: true },
  phoneNumber: { required: true, range: { min: 10, max: 11 }, regex: 'phone' },
});

const SignUpPage = () => {
  const toast = useCustomToast();
  const now = new Date();
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  const handleLoginSubmit = async (values: FormValues) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            birth: values.birth,
            phone: values.phoneNumber,
            confirmation_sent_at: Date.now(),
          },
        },
      });
      if (error) {
        toast.error('회원가입에 성공하지 못했습니다. 입력값을 다시 확인해주세요');
      } else {
        toast.success('회원가입에 성공했어요');
      }
      console.log(data);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Formik<FormValues>
      initialValues={{
        password: '',
        name: '',
        email: '',
        birth: processer.date(now),
        phoneNumber: '',
      }}
      onSubmit={handleLoginSubmit}
    >
      {props => {
        const { showErrorDict, errors, canSubmit } = getFormikStates(props);
        return (
          <Form>
            <Box p="10px 5%" bg="purple.50">
              <Box m="0 auto" bgColor="white" p={5} w="90%" maxW="700px">
                <Box m="0 auto">
                  <Image src="/public/name_logo.png" w="200px" justifyItems="center" alignItems="center" />
                </Box>

                <Box m="30px 0">
                  <TermsOfUse />
                </Box>

                <Box minH="inherit">
                  <Box m="20px">
                    <Divider />
                    <Box m="20px">
                      <Field name="email" validate={validators.email}>
                        {({ field }: FieldProps<FormValues['email']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.email}>
                            <InputGroup>
                              <InputLeftAddon>이메일</InputLeftAddon>
                              <Input {...field} />
                            </InputGroup>
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box m="20px">
                      <Field name="password" validate={validators.password}>
                        {({ field }: FieldProps<FormValues['password']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.password}>
                            <InputGroup>
                              <InputLeftAddon>비밀번호</InputLeftAddon>
                              <Input type={show ? 'text' : 'password'} {...field} />

                              <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                  {show ? 'Hide' : 'Show'}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box m="20px">
                      <Field name="name" validate={validators.name}>
                        {({ field }: FieldProps<FormValues['name']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.name}>
                            <InputGroup>
                              <InputLeftAddon>이름</InputLeftAddon>
                              <Input {...field} />
                            </InputGroup>
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box m="20px">
                      <Field name="birth" validate={validators.birth}>
                        {({ field }: FieldProps<FormValues['birth']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.birth}>
                            <InputGroup>
                              <InputLeftAddon>생년월일</InputLeftAddon>
                              <Input
                                placeholder="생년월일을 입력하세요"
                                size="md"
                                type="date"
                                max={processer.date(now)}
                                {...field}
                              />
                            </InputGroup>
                            <FormErrorMessage>{errors.birth}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box m="20px">
                      <Field name="phoneNumber" validate={validators.phoneNumber}>
                        {({ field }: FieldProps<FormValues['phoneNumber']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.phoneNumber}>
                            <InputGroup>
                              <InputLeftAddon>전화번호</InputLeftAddon>
                              <Input {...field} />
                              <InputRightElement pointerEvents="none">
                                <Icon as={Phone} />
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Box>
                </Box>
                <Grid>
                  <Button type="submit" colorScheme="brand" isDisabled={!canSubmit}>
                    가입하기
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpPage;

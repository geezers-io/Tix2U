import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { Form, Formik, Field, FieldProps } from 'formik';
import { Gender } from '@/api/@types/@enums';
import { GENDER_LABEL } from '@/constants/labels';
import { useCustomToast } from '@/hooks/useCustomToast';
import { generateValidators } from '@/utils/formik';
import { processer } from '@/utils/process';

type FormValues = {
  id: string;
  password: string;
  name: string;
  birth: string;
  phoneNumber: number;
  gender: Gender[];
};

const { validators, getFormikStates } = generateValidators<FormValues>({
  id: { required: true, range: { min: 4, max: 30 }, regex: 'korEngNumSpace' },
  password: { required: true, range: { min: 4, max: 30 }, regex: 'korEngNumSpace' },
  name: { required: true, range: { min: 2, max: 10 } },
  birth: { required: true },
  phoneNumber: { required: true, range: { min: 10, max: 11 } },
  gender: { required: true },
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const now = new Date();
  const [show, setShow] = useState<boolean>(false);
  const [gender, setGender] = useState<boolean>(false);

  const handleClick = () => setShow(!show);
  const switchButton = () => setGender(!gender);

  const handleSubmit = () => {
    toast.success('회원가입에 성공했어요!');
    navigate('/');
  };
  return (
    <Formik<FormValues>
      initialValues={{
        id: '',
        password: '',
        name: '',
        birth: processer.date(now),
        phoneNumber: 0,
        gender: [],
      }}
      onSubmit={handleSubmit}
    >
      {props => {
        const { showErrorDict, canSubmit, errors } = getFormikStates(props);
        return (
          <Form>
            <Box p="10px 5%" bg="purple.50">
              <Box m="0 auto" bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px">
                <Box minH="inherit">
                  <Box m="20px">
                    <Field name="id" validate={validators.id}>
                      {({ field }: FieldProps<FormValues['id']>) => (
                        <FormControl isRequired isInvalid={showErrorDict.id}>
                          <InputGroup>
                            <InputLeftAddon>아이디:</InputLeftAddon>
                            <Input {...field} />
                          </InputGroup>
                          <FormErrorMessage>{errors.id}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box m="20px">
                    <Field name="password" validate={validators.password}>
                      {({ field }: FieldProps<FormValues['password']>) => (
                        <FormControl isRequired isInvalid={showErrorDict.id}>
                          <InputGroup>
                            <InputLeftAddon>비밀번호:</InputLeftAddon>
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
                            <InputLeftAddon>이름:</InputLeftAddon>
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
                            <InputLeftAddon>생년월일:</InputLeftAddon>
                            <InputGroup
                              placeholder="Select Date and Time"
                              size="md"
                              type="date"
                              min={processer.date(now)}
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
                            <InputLeftAddon>전화번호:</InputLeftAddon>
                            <Input {...field} />
                          </InputGroup>
                          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box m="20px">
                    <Field name="gender" validate={validators.gender}>
                      {({ field }: FieldProps<FormValues['gender']>) => (
                        <FormControl isRequired isInvalid={showErrorDict.gender}>
                          <InputGroup>
                            <InputLeftAddon>성별:</InputLeftAddon>
                            {Object.entries(GENDER_LABEL).map(([value, label]) => (
                              <Grid w="100%" m="0 10px">
                                <Button
                                  {...field}
                                  key={value}
                                  value={value}
                                  onClick={switchButton}
                                  colorScheme={gender ? 'brand' : 'gray'}
                                >
                                  {label}
                                </Button>
                              </Grid>
                            ))}
                          </InputGroup>
                          <FormErrorMessage>{errors.gender}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Box>
                <Grid>
                  <Button type="submit" isDisabled={!canSubmit}>
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

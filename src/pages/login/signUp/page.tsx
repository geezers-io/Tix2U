import { useState } from 'react';
import { Phone } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
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
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { Form, Formik, Field, FieldProps } from 'formik';
import { Gender } from '@/api/@types/@enums';
import { GENDER_LABEL } from '@/constants/labels';
import termsOfUse from '@/constants/termsOfUse';
import { useCustomToast } from '@/hooks/useCustomToast';
import { generateValidators } from '@/utils/formik';
import { processer } from '@/utils/process';

type FormValues = {
  id: string;
  password: string;
  name: string;
  email: string;
  birth: string;
  phoneNumber: string;
  gender: Gender[];
};

const { validators, getFormikStates } = generateValidators<FormValues>({
  id: { required: true, range: { min: 4, max: 30 }, regex: 'korEngNumSpace' },
  password: { required: true, range: { min: 4, max: 30 }, regex: 'korEngNumSpace' },
  name: { required: true, range: { min: 2, max: 10 } },
  email: { required: true, regex: 'email' },
  birth: { required: true },
  phoneNumber: { required: true, range: { min: 10, max: 11 }, regex: 'phone' },
  gender: { required: true },
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const now = new Date();
  const [show, setShow] = useState<boolean>(false);
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [pwRevalue, setPwRevalue] = useState<string>('');
  const [activeButton, setActiveButton] = useState(null);
  const [checkedItems, setCheckedItems] = useState([false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleClick = () => setShow(!show);

  const IDDuplication = () => {
    if (idValue === '') return toast.error('값을 입력하세요');
    if (idValue) return toast.success('사용가능한 아이디입니다');
  };

  const savePasswordValue = event => {
    setPwValue(event.target.value);
  };
  const resavePasswordValue = event => {
    setPwRevalue(event.target.value);
  };

  const PasswordReconfirm = () => {
    if (pwValue === pwRevalue) return toast.success('비밀번호가 일치합니다');

    return toast.error('비밀번호가 다릅니다');
  };

  const handleButtonClick = value => {
    setActiveButton(value);
  };

  const handleSubmit = async (values: FormValues) => {
    toast.success('회원가입에 성공했어요!');
    navigate('/');
    console.log(values);
  };
  return (
    <Formik<FormValues>
      initialValues={{
        id: '',
        password: '',
        name: '',
        email: '',
        birth: processer.date(now),
        phoneNumber: '',
        gender: [],
      }}
      onSubmit={handleSubmit}
    >
      {props => {
        const { showErrorDict, canSubmit, errors } = getFormikStates(props);
        return (
          <Form>
            <Box p="10px 5%" bg="purple.50">
              <Box m="0 auto" bgColor="white" p={5} w="90%" maxW="700px">
                <Box m="0 auto">
                  <Image src="/public/name_logo.png" w="200px" justifyItems="center" alignItems="center" />
                </Box>

                <Box m="30px 0">
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
                  >
                    전체 동의하기
                  </Checkbox>
                  <Box>
                    <Text>
                      실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를
                      포함합니다.
                    </Text>
                  </Box>
                  {termsOfUse &&
                    termsOfUse.map((value, index) => (
                      <Box m="20px">
                        <Checkbox
                          key={value.id}
                          value={value.title}
                          isChecked={checkedItems[index]}
                          onChange={e => setCheckedItems([e.target.checked])}
                        >
                          {value.title}
                        </Checkbox>
                        <Flex maxH="200px" overflow="scroll" m="10px">
                          {value.data}
                        </Flex>
                      </Box>
                    ))}
                </Box>

                <Box minH="inherit">
                  <Box m="20px">
                    <Divider />
                    <Flex m="20px">
                      <Field name="id" validate={validators.id}>
                        {({ field }: FieldProps<FormValues['id']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.id}>
                            <InputGroup>
                              <InputLeftAddon>아이디</InputLeftAddon>
                              <Input {...field} value={idValue} onChange={event => setIdValue(event.target.value)} />
                            </InputGroup>
                            <FormErrorMessage>{errors.id}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Button onClick={IDDuplication}>중복확인</Button>
                    </Flex>

                    <Box m="20px">
                      <Field name="password" validate={validators.password}>
                        {({ field }: FieldProps<FormValues['password']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.password}>
                            <InputGroup>
                              <InputLeftAddon>비밀번호</InputLeftAddon>
                              <Input
                                type={show ? 'text' : 'password'}
                                {...field}
                                value={pwValue}
                                onChange={savePasswordValue}
                              />

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

                    <Flex m="20px">
                      <Field name="password" validate={validators.password}>
                        {({ field }: FieldProps<FormValues['password']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.id}>
                            <InputGroup>
                              <InputLeftAddon>비밀번호 재확인</InputLeftAddon>
                              <Input
                                type={show ? 'text' : 'password'}
                                {...field}
                                value={pwRevalue}
                                onChange={resavePasswordValue}
                              />

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
                      <Button onClick={PasswordReconfirm}>재확인</Button>
                    </Flex>

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
                      <Field name="birth" validate={validators.birth}>
                        {({ field }: FieldProps<FormValues['birth']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.birth}>
                            <InputGroup>
                              <InputLeftAddon>생년월일</InputLeftAddon>
                              <Input
                                placeholder="생년월일을 입력하세요"
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

                    <Box m="20px">
                      <Field name="gender" validate={validators.gender}>
                        {({ field }: FieldProps<FormValues['gender']>) => (
                          <FormControl isRequired isInvalid={showErrorDict.gender}>
                            <InputGroup>
                              <InputLeftAddon>성별</InputLeftAddon>

                              {Object.entries(GENDER_LABEL).map(([value, label]) => (
                                <Grid w="100%" m="0 10px">
                                  <Button
                                    {...field}
                                    key={`select - ${value}`}
                                    value={value}
                                    onClick={() => handleButtonClick(value)}
                                    colorScheme={activeButton === value ? 'brand' : 'gray'}
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

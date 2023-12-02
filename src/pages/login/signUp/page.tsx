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
  Radio,
  RadioGroup,
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
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [pwRevalue, setPwRevalue] = useState<string>('');
  const [activeButton, setActiveButton] = useState(null);
  const [checkBoxes, setCheckBoxes] = useState([false]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleRadioClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSelectAll = () => {
    const allChecked = checkBoxes.every(checkBox => checkBox);

    const newCheckBoxes = checkBoxes.map(() => !allChecked); // 모든 체크박스를 반전

    setCheckBoxes(newCheckBoxes); // 상태 업데이트
  };

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
    if (pwValue === pwRevalue) return toast.success('비밀번호가 확인되었어요');

    return toast.error('비밀번호가 다릅니다');
  };

  const handleButtonClick = value => {
    setActiveButton(value);
  };

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
              <Box m="0 auto" bgColor="white" p={5} minHeight="800px" w="90%" maxW="700px">
                <Flex m="auto 0">
                  <Image src="/public/name_logo.png" w="500px" justifyItems="center" alignItems="center" />
                </Flex>

                <Box>
                  <Radio checked={checkBoxes.every(checkBox => checkBox)} onChange={handleSelectAll}>
                    전체 선택
                  </Radio>
                  {termsOfUse &&
                    termsOfUse.map(value => (
                      <Box m="20px">
                        <RadioGroup>
                          <Radio key={value.id} value={value.title} checked={isChecked} onChange={handleRadioClick}>
                            {value.title}
                          </Radio>
                        </RadioGroup>
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
                              <InputLeftAddon>아이디:</InputLeftAddon>
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
                              <InputLeftAddon>비밀번호:</InputLeftAddon>
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
                              <Input
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
                              <InputLeftAddon>성별:</InputLeftAddon>

                              {Object.entries(GENDER_LABEL).map(([value, label]) => (
                                <Grid w="100%" m="0 10px">
                                  <Button
                                    {...field}
                                    key={value}
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

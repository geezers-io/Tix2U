import { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Input,
  Flex,
  Text,
  Button,
  Tooltip,
  Badge,
  HStack,
  PinInput,
  PinInputField,
  Image,
} from '@chakra-ui/react';

const FindIDPage = () => {
  const [idPhone, setIdPhone] = useState<boolean>(false);
  const [passwordPhone, setPasswordPhone] = useState<boolean>(false);

  const AuthIDPhoneNumber = () => {
    setIdPhone(true);
  };
  const AuthPasswordPhoneNumber = () => {
    setPasswordPhone(true);
  };
  return (
    <Box p="10px 5%" bg="purple.50">
      <Box bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px" m="0 auto">
        <Box>
          <Flex m="0 auto" justifyContent="center">
            <Image src="/public/name_logo.png" w="500px" />
          </Flex>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>아이디 찾기</Tab>
              <Tab>비밀번호 찾기</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <Flex p="10px">
                    <Flex w="100px" alignItems="center">
                      <Text>이름</Text>
                    </Flex>
                    <Input placeholder="이름" />
                  </Flex>
                  <Flex p="10px">
                    <Flex w="100px" alignItems="center">
                      <Text>전화번호</Text>
                    </Flex>
                    <Input placeholder="전화번호" />
                    <Button onClick={AuthIDPhoneNumber}>인증번호</Button>
                  </Flex>

                  {idPhone && (
                    <Flex p="10px" m="0 auto" justifyContent="center">
                      <HStack>
                        <PinInput placeholder=" " size="lg">
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                        </PinInput>
                      </HStack>
                    </Flex>
                  )}

                  <Flex gap="10px">
                    <Text>인증번호가 오지 않나요</Text>
                    <Tooltip
                      label="1588 번호가 스팸 문자로 등록되어 있는 것은 아닌지
                              확인해주세요. 스팸 문자로 등록되어 있지 않다면,
                              다시 한 번 '인증번호 받기'를 눌러주세요."
                      aria-label="A tooltip"
                    >
                      <Badge>?</Badge>
                    </Tooltip>
                  </Flex>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Flex p="10px">
                    <Flex w="100px" alignItems="center">
                      <Text>아이디</Text>
                    </Flex>
                    <Input placeholder="아이디(휴대폰 또는 이메일)" />
                  </Flex>
                  <Flex p="10px">
                    <Flex w="100px" alignItems="center">
                      <Text>전화번호</Text>
                    </Flex>
                    <Input placeholder="전화번호" />
                    <Button onClick={AuthPasswordPhoneNumber}>인증번호</Button>
                  </Flex>
                  {passwordPhone && (
                    <Flex p="10px" m="0 auto" justifyContent="center">
                      <HStack>
                        <PinInput placeholder=" " size="lg">
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                        </PinInput>
                      </HStack>
                    </Flex>
                  )}
                  <Flex gap="10px">
                    <Text>인증번호가 오지 않나요</Text>
                    <Tooltip
                      label="1588 번호가 스팸 문자로 등록되어 있는 것은 아닌지
                              확인해주세요. 스팸 문자로 등록되어 있지 않다면,
                              다시 한 번 '인증번호 받기'를 눌러주세요."
                      aria-label="A tooltip"
                    >
                      <Badge>?</Badge>
                    </Tooltip>
                  </Flex>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default FindIDPage;

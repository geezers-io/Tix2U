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
} from '@chakra-ui/react';

const FindIDPage = () => {
  return (
    <Box p="10px 5%" bg="purple.50">
      <Box bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px" m="0 auto">
        <Box p="50px">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>아이디 찾기</Tab>
              <Tab>비밀번호 찾기</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <Flex>
                    <Flex w="100px">
                      <Text>이름</Text>
                    </Flex>
                    <Input placeholder="이름" />
                  </Flex>
                  <Flex>
                    <Flex w="100px">
                      <Text>전화번호</Text>
                    </Flex>
                    <Input placeholder="전화번호" />
                    <Button>인증번호</Button>
                  </Flex>
                  <Flex>
                    <Input placeholder="인증번호 6자리" />
                  </Flex>
                  <Flex gap="10px">
                    <Text>인증번호가 오지 않나요?</Text>
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
                  <Flex>
                    <Flex w="20%">
                      <Text>아이디</Text>
                    </Flex>
                    <Input placeholder="아이디(휴대폰 또는 이메일)" />
                  </Flex>
                  <Flex>
                    <Flex w="20%">
                      <Text>전화번호</Text>
                    </Flex>
                    <Input placeholder="전화번호" />
                    <Button>인증번호</Button>
                  </Flex>
                  <Flex>
                    <Input placeholder="인증번호 6자리" />
                  </Flex>
                  <Flex gap="10px">
                    <Text>인증번호가 오지 않나요?</Text>
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

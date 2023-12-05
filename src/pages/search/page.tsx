import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Input,
  Image,
  SimpleGrid,
  AspectRatio,
  Heading,
  Text,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';
import { generateValidators } from '@/utils/formik';

type FormValues = {
  term: string;
};

const { validators, getFormikStates } = generateValidators<FormValues>({
  term: { required: true, range: { min: 1, max: 30 }, regex: 'nickname' },
});

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchList, setSearchList] = useState<PerformanceSummary[]>([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());

    if (!searchTerm) {
      setSearchList([]);

      return;
    }
  };

  const onClickSearchInput = async (searchTerm: string) => {
    const res = await PerformanceService.getList({
      stdate: '20230101',
      eddate: '2030630',
      cpage: '1',
      rows: '5',
      shprfnm: searchTerm,
    });
    setSearchList(res);
  };

  return (
    <Formik<FormValues>
      initialValues={{
        term: '',
      }}
      onSubmit={() => onClickSearchInput(searchTerm)}
    >
      {props => {
        const { showErrorDict, errors } = getFormikStates(props);

        return (
          <Form>
            <Box p="10px 10%" bg="purple.50">
              <Box bgColor="white" fontSize="xl" minH="800px">
                {searchList.length > 0 ? (
                  <></>
                ) : (
                  <Flex>
                    <Flex m="0 auto">
                      <Image src="/public/name_logo.png" />
                    </Flex>
                  </Flex>
                )}
                <Flex p="20px">
                  <Field name="term" validate={validators.term}>
                    {({ field }) => (
                      <FormControl isRequired isInvalid={showErrorDict.term}>
                        <Input
                          placeholder="공연 제목을 입력해주세요."
                          size="lg"
                          {...field}
                          value={searchTerm}
                          onChange={handleSearch}
                          borderColor="transparent"
                          borderBottomWidth="2px"
                          borderBottomColor="gray.600"
                        />
                        <FormErrorMessage>{errors.term}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Flex p="10px" m="0 auto">
                    <Button onClick={() => onClickSearchInput(searchTerm)} colorScheme="brand">
                      검색
                    </Button>
                  </Flex>
                </Flex>
                <Box>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} p={{ base: 2, md: 4 }}>
                    {searchList.length > 0 &&
                      searchList.map((performance, index) => (
                        <Box key={index} m="20px" maxW="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                          <Link to={`/detail/${performance.mt20id}`}>
                            <AspectRatio ratio={3 / 4}>
                              <Image src={performance.poster} alt={performance.prfnm} objectFit="cover" />
                            </AspectRatio>
                          </Link>

                          <Box p="4">
                            <Text fontSize="sm" color="gray.500" mb="1">
                              {performance.prfpdfrom} ~ {performance.prfpdto}
                            </Text>

                            <Link to={`/detail/${performance.mt20id}`}>
                              <Heading size="md" mb="1" fontSize="xl">
                                {performance.prfnm}
                              </Heading>
                            </Link>

                            <Text
                              noOfLines={1}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              fontWeight="bold"
                              color="brand.200"
                              pt={4}
                            >
                              {performance.genrenm}
                            </Text>
                          </Box>
                        </Box>
                      ))}
                  </SimpleGrid>
                  {searchList.length === 0 && (
                    <Box m="20px">
                      <Text>검색된 공연이 없습니다</Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchPage;

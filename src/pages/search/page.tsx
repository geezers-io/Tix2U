import { useDeferredValue, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Input, Image, AspectRatio, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';
import MotionPoster from '@/components/shared/MotionPoster';
import { colors } from '@/styles/theme/@colors';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchList, setSearchList] = useState<PerformanceSummary[]>([]);
  const deferredTerm = useDeferredValue(searchTerm);

  const ChangeSearchTerm = async e => {
    try {
      setSearchTerm(e.target.value.toLowerCase());

      console.log(deferredTerm);

      const res = await PerformanceService.getList({
        stdate: '20230101',
        eddate: '2030630',
        cpage: '1',
        rows: '5',
        shprfnm: deferredTerm,
      });

      setSearchList(res);
    } finally {
      searchList.length === 0;
    }
  };

  return (
    <Box p="10px 10%" bg="purple.50">
      <Flex>
        <Image src="/name_logo.png" justifyItems="center" m="0 auto" />
      </Flex>
      <Box fontSize="xl">
        <Flex bgColor="white" borderWidth="1px" w="85%" m="0 auto">
          <Flex p="10px" w="80%" m="0 auto">
            <Input
              placeholder="검색어를 입력해주세요."
              size="lg"
              borderColor="brand"
              value={searchTerm}
              onChange={ChangeSearchTerm}
              alignItems="center"
              m="auto 0"
            />
          </Flex>
        </Flex>

        {searchList.length > 0 && (
          <>
            <Flex>
              <Text p="10px 0" m="0 auto">
                검색된 결과 {searchList.length}건 있습니다.
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} p={{ base: 2, md: 4 }}>
              {searchList.map((performance, index) => (
                <MotionPoster
                  key={index}
                  m="20px"
                  maxW="500px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  shadow="xl"
                  bg={colors.gray[50]}
                >
                  {({ isHovered }: { isHovered: boolean }) => (
                    <>
                      <Link to={`/detail/${performance.mt20id}`}>
                        <AspectRatio ratio={3 / 4}>
                          <Image
                            src={performance.poster}
                            alt={performance.prfnm}
                            objectFit="cover"
                            css={css`
                              transition: transform 0.3s ease-in-out;
                              transform: ${isHovered ? 'scale(1.1)' : 'scale(1)'};
                            `}
                          />
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
                    </>
                  )}
                </MotionPoster>
              ))}
            </SimpleGrid>
          </>
        )}
        {searchList.length === 0 && (
          <Flex p="20% 0">
            <Image src="/logo.png" m="auto auto" />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;

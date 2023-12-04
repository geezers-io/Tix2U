import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, SimpleGrid, Image, AspectRatio, Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';
import InfiniteScroll from '@/components/shared/InfiniteScroll';
import MotionPoster from '@/components/shared/MotionPoster';
import { useCustomToast } from '@/hooks/useCustomToast';
import { colors } from '@/styles/theme/@colors';

const EntirePage: FC = () => {
  const toast = useCustomToast();
  const [enTirePerformance, setEnTirePerformance] = useState<PerformanceSummary[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  const handleSortByLatest = () => {
    setSortBy('latest');
    const sortedData = [...enTirePerformance].sort((a, b) => {
      // 최신순
      return new Date(b.prfpdfrom).getTime() - new Date(a.prfpdfrom).getTime();
    });
    setEnTirePerformance(sortedData);
  };

  const handleSortByOldest = () => {
    setSortBy('oldest');
    const sortedData = [...enTirePerformance].sort((a, b) => {
      // 오래된순
      return new Date(a.prfpdfrom).getTime() - new Date(b.prfpdfrom).getTime();
    });
    setEnTirePerformance(sortedData);
  };

  const fetchEntireData = async (page: number) => {
    try {
      const response = await PerformanceService.getList({
        stdate: '20230101',
        eddate: '20241231',
        cpage: page.toString(),
        rows: '12',
      });

      if (response.length === 0) {
        setHasMore(false);
      } else {
        const existingIds = enTirePerformance.map(item => item.mt20id);

        const newData = response.filter(newItem => !existingIds.includes(newItem.mt20id)) as PerformanceSummary[];

        setEnTirePerformance(prevData => [
          ...prevData,
          ...newData.filter(newItem => !existingIds.includes(newItem.mt20id)),
        ]);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const loadMore = () => {
    const nextPage = Math.ceil(enTirePerformance.length / 12) + 1;
    fetchEntireData(nextPage);
  };

  useEffect(() => {
    fetchEntireData(1);
  }, []);

  return (
    <>
      <Box p="10px 5%" bg="purple.50" maxW="1440px" mx="auto">
        <Box marginY="40px">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            marginBottom="1"
            paddingLeft="20"
            paddingRight="20"
          >
            <Box as="span" marginRight="2" fontSize="2xl" color={colors.brand[200]}>
              •
            </Box>
            전체상품
          </Text>
          <Box borderBottom="2px solid black" marginBottom="1" w="88%" marginLeft="20" />
        </Box>

        <Box display="flex" justifyContent="center" marginBottom="4">
          <Button onClick={handleSortByLatest} colorScheme={sortBy === 'latest' ? 'brand' : 'gray'} marginRight="2">
            최신순
          </Button>
          <Button onClick={handleSortByOldest} colorScheme={sortBy === 'oldest' ? 'brand' : 'gray'}>
            오래된순
          </Button>
        </Box>

        <InfiniteScroll load={loadMore} hasMore={hasMore} endMessage="No more performances">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} p={{ base: 2, md: 4 }}>
            {enTirePerformance.map((performance, index) => (
              <MotionPoster key={index}>
                {({ isHovered }: { isHovered: boolean }) => (
                  <Box
                    flex="1"
                    maxW="300px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    shadow="xl"
                    bg={colors.gray[50]}
                  >
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
                  </Box>
                )}
              </MotionPoster>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default EntirePage;

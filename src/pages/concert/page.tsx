import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, SimpleGrid, Image, AspectRatio, Button, Skeleton } from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';
import MotionPoster from '@/components/shared/MotionPoster';
import Pagination from '@/components/shared/Pagination';
import { useCustomToast } from '@/hooks/useCustomToast';
import { colors } from '@/styles/theme/@colors';

const ConcertPage: FC = () => {
  const toast = useCustomToast();
  const [enTirePerformance, setEnTirePerformance] = useState<PerformanceSummary[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 99;

  const fetchConcertData = async (page: number) => {
    try {
      const response = await PerformanceService.getList({
        stdate: '20230101',
        eddate: '20241231',
        cpage: page.toString(),
        rows: '36',
      });

      if (response.length === 0) {
        return;
      }

      const targetGenres = ['대중음악', '서양음악', '한국음악', '복합'];

      const filteredPerformance = response.filter(performance => targetGenres.includes(performance.genrenm));

      setEnTirePerformance(filteredPerformance as PerformanceSummary[]);
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSortByLatest = () => {
    setSortBy('latest');
    const sortedData = [...enTirePerformance].sort(
      (a, b) => new Date(b.prfpdfrom).getTime() - new Date(a.prfpdfrom).getTime(),
    );
    setEnTirePerformance(sortedData);
  };

  const handleSortByOldest = () => {
    setSortBy('oldest');
    const sortedData = [...enTirePerformance].sort(
      (a, b) => new Date(a.prfpdfrom).getTime() - new Date(b.prfpdfrom).getTime(),
    );
    setEnTirePerformance(sortedData);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchConcertData(page);
    }
  };

  useEffect(() => {
    fetchConcertData(currentPage);
  }, []);

  return (
    <>
      <Box p="10px 5%" bg="purple.50" maxW="1200px" mx="auto">
        <Box marginY="40px" display="flex" flexDirection="column" alignItems="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            marginBottom="1"
            paddingLeft="auto"
            paddingRight="auto"
          >
            <Box as="span" marginRight="2" fontSize="2xl" color={colors.brand[200]}>
              •
            </Box>
            음악회
          </Text>
          <Box borderBottom="2px solid gray" marginBottom="1" width="88%" marginLeft="auto" marginRight="auto" />
        </Box>

        <Box display="flex" justifyContent="center" marginBottom="4">
          <Button onClick={handleSortByLatest} colorScheme={sortBy === 'latest' ? 'brand' : 'gray'} marginRight="2">
            최신순
          </Button>
          <Button onClick={handleSortByOldest} colorScheme={sortBy === 'oldest' ? 'brand' : 'gray'}>
            오래된순
          </Button>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={2}
          p={{ base: 2, md: 4 }}
          justifyContent="space-between"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Box
                  key={index}
                  flex="1"
                  maxW="300px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  borderBottomWidth="2px"
                  borderBottomColor="gray.300"
                  shadow="xl"
                  bg={colors.gray[50]}
                >
                  <Skeleton height="180px" />
                  <Box p="4">
                    <Skeleton height="16px" mb="2" />
                    <Skeleton height="20px" mb="4" />
                    <Skeleton height="12px" />
                  </Box>
                </Box>
              ))
            : enTirePerformance.map((performance, index) => (
                <MotionPoster key={index}>
                  {({ isHovered }: { isHovered: boolean }) => (
                    <Box
                      flex="1"
                      maxW="300px"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      borderBottomWidth="2px"
                      borderBottomColor="gray.300"
                      shadow="xl"
                      bg={colors.gray[50]}
                    >
                      <Link to={`/detail/${performance.mt20id}`}>
                        <AspectRatio ratio={3 / 4}>
                          <Image
                            src={performance.poster}
                            alt={performance.prfnm}
                            objectFit="cover"
                            css={{
                              transition: 'transform 0.3s ease-in-out',
                              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            }}
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
                          noOfLines={2}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="normal"
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
      </Box>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
};

export default ConcertPage;

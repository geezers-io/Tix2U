import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Spacer,
  Text,
  SimpleGrid,
  Image,
  useColorModeValue,
  AspectRatio,
  Skeleton,
} from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';
import ImageSlider from '@/components/ImageCarousel';
import { useCustomToast } from '@/hooks/useCustomToast';
import { colors } from '@/styles/theme/@colors';

const IndexPage: FC = () => {
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [mdRecommendPerformance, setMdRecommendPerformance] = useState<PerformanceSummary[]>([]);
  const [newArrivalPerformance, setNewArrivalPerformance] = useState<PerformanceSummary[]>([]);
  const [isLoadingMdRecommend, setIsLoadingMdRecommend] = useState(true);
  const [isLoadingNewArrival, setIsLoadingNewArrival] = useState(true);
  const toast = useCustomToast();
  const gradient = `linear(to-r, ${colors.brand[300]}, ${colors.sub[300]})`;

  const fetchMdRecommendData = async () => {
    try {
      const response = await PerformanceService.getList({
        stdate: '20230101',
        eddate: '2030630',
        cpage: '1',
        rows: '4',
      });
      setMdRecommendPerformance(response);
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoadingMdRecommend(false);
    }
  };

  const fetchNewArrivalData = async () => {
    try {
      const response = await PerformanceService.getList({
        stdate: '20231222',
        eddate: '20240101',
        cpage: '2',
        rows: '8',
      });
      setNewArrivalPerformance(response);
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoadingNewArrival(false);
    }
  };

  const fetchBannerImages = async () => {
    try {
      const images = [
        'https://a.cdn-hotels.com/gdcs/production121/d1688/b022527b-c68d-4a3f-96b4-322f557dea34.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        'https://majormap.s3.ap-northeast-2.amazonaws.com/contents/career/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%B5%E1%84%92%E1%85%AC%E1%86%A8%E1%84%8C%E1%85%A1.jpg',
      ];
      setBannerImages(images);
    } catch (error) {
      console.error('이미지를 불러올 수 없습니다.:', error);
    }
  };

  useEffect(() => {
    fetchBannerImages();
    fetchMdRecommendData();
    fetchNewArrivalData();
  }, []);

  return (
    <Box pt={{ base: '40px', md: '60px' }} px={{ base: 2, md: 4 }}>
      <Box mb={{ base: '4', md: '8' }}>
        <ImageSlider images={bannerImages} />
      </Box>

      <Box mb={{ base: '4', md: '8' }} ml={{ base: '4', md: '0' }} pt={{ base: '20', md: '0' }}>
        <Heading size="lg">
          <Box
            as="span"
            bgGradient={gradient}
            color={useColorModeValue('white', 'black')}
            px={2}
            py={1}
            borderRadius="md"
            mr={2}
          >
            MD&apos;s RECOMMENDS
          </Box>
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} p={{ base: 2, md: 4 }}>
        {isLoadingMdRecommend
          ? Array.from({ length: 4 }).map((_, index) => (
              <Box key={index} flex="1" maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Skeleton height="180px" />
                <Box p="4">
                  <Skeleton height="16px" mb="2" />
                  <Skeleton height="20px" mb="4" />
                  <Skeleton height="12px" />
                </Box>
              </Box>
            ))
          : mdRecommendPerformance.map((performance, index) => (
              <Box key={index} flex="1" maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
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

      <Box mb={{ base: '4', md: '8' }} ml={{ base: '4', md: '0' }} mt={{ base: '4', md: '8' }}>
        <Heading size="lg">
          <Box
            as="span"
            bgGradient={gradient}
            color={useColorModeValue('white', 'black')}
            px={2}
            py={1}
            borderRadius="md"
            mr={2}
          >
            NEW ARRIVALS
          </Box>
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} p={{ base: 2, md: 4 }}>
        {isLoadingNewArrival
          ? Array.from({ length: 8 }).map((_, index) => (
              <Box key={index} flex="1" maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Skeleton height="180px" />
                <Box p="4">
                  <Skeleton height="16px" mb="2" />
                  <Skeleton height="20px" mb="4" />
                  <Skeleton height="12px" />
                </Box>
              </Box>
            ))
          : newArrivalPerformance.map((performance, index) => (
              <Box key={index} flex="1" maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
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

      <Spacer h={{ base: '12', md: '24' }} />
    </Box>
  );
};

export default IndexPage;

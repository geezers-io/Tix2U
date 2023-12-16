import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Box, Heading, Spacer, Text, Image, AspectRatio, Skeleton } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';
import ImageCarousel from '@/components/shared/ImageCarousel';
import MotionPoster from '@/components/shared/MotionPoster';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher';
import { colors } from '@/styles/theme/@colors';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ResponsiveSettings {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
}

interface SliderSettings {
  infinite: boolean;
  speed: number;
  autoplay: boolean;
  autoplaySpeed: number;
  slidesToShow: number;
  slidesToScroll: number;
  responsive: ResponsiveSettings[];
}

const IndexPage: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const bannerImages = [
    'src/public/banner1.png',
    '/banner2.png',
    'https://a.cdn-hotels.com/gdcs/production121/d1688/b022527b-c68d-4a3f-96b4-322f557dea34.jpg?impolicy=fcrop&w=800&h=533&q=medium',
    'https://majormap.s3.ap-northeast-2.amazonaws.com/contents/career/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%B5%E1%84%92%E1%85%AC%E1%86%A8%E1%84%8C%E1%85%A1.jpg',
  ];

  const { data: mdRecommendPerformance, isLoading: isLoadingMdRecommend } = useQuery<PerformanceSummary[], Error>(
    ['mdRecommendPerformance'],
    () =>
      PerformanceService.getList({
        stdate: '20230101',
        eddate: '2030630',
        cpage: '1',
        rows: '8',
      }),
  );

  const { data: newArrivalPerformance, isLoading: isLoadingNewArrival } = useQuery<PerformanceSummary[], Error>(
    ['newArrivalPerformance'],
    () =>
      PerformanceService.getList({
        stdate: '20231222',
        eddate: '20240101',
        cpage: '2',
        rows: '8',
      }),
  );

  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const settings: SliderSettings = {
    infinite: true,
    speed: 7000,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box p="10px 5%" bg={isDarkMode ? 'brand.900' : 'purple.50'}>
      <ThemeSwitcher onToggle={handleThemeToggle} isDarkMode={isDarkMode} />
      <Box pt={{ base: '40px', md: '60px' }} px={{ base: 2, md: 4 }} mx="auto" maxW="1200px">
        <Box mb={{ base: '4', md: '8' }}>
          <ImageCarousel images={bannerImages} />
        </Box>

        <Box mb={{ base: '4', md: '8' }} ml={{ base: '4', md: '0' }} pt={{ base: '20', md: '0' }} textAlign="center">
          <Heading size="lg">
            <Box
              as="span"
              bgGradient={`linear(to-r, ${colors.brand[300]}, ${colors.sub[300]})`}
              color="white"
              px={2}
              py={1}
              borderRadius="md"
              mr={2}
              shadow="xl"
            >
              MD&apos;s RECOMMENDS
            </Box>
          </Heading>
        </Box>
      </Box>

      <Slider {...settings} css={{ margin: '0 -10px' }}>
        {isLoadingMdRecommend
          ? Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                flex="1"
                maxW="300px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                shadow="xl"
                bg={colors.gray[50]}
                mb="10"
              >
                <Skeleton height="180px" />
                <Box p="4">
                  <Skeleton height="16px" mb="2" />
                  <Skeleton height="20px" mb="4" />
                  <Skeleton height="12px" />
                </Box>
              </Box>
            ))
          : mdRecommendPerformance?.map((performance, index) => (
              <MotionPoster
                key={index}
                flex="1"
                maxW="300px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                shadow="xl"
                bg={colors.gray[50]}
                mb="10"
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
                        <Heading
                          size="md"
                          mb="1"
                          fontSize="xl"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          title={performance.prfnm}
                        >
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
      </Slider>

      <Box mb={{ base: '4', md: '8' }} mx="auto" maxW="1200px" textAlign="center">
        <Heading size="lg">
          <Box
            as="span"
            bgGradient={`linear(to-r, ${colors.brand[300]}, ${colors.sub[300]})`}
            color="white"
            px={2}
            py={1}
            borderRadius="md"
            mr={2}
            ml={4}
            shadow="xl"
          >
            NEW ARRIVALS
          </Box>
        </Heading>
      </Box>

      <Slider {...settings} css={{ margin: '0 -10px' }}>
        {isLoadingNewArrival
          ? Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                flex="1"
                maxW="300px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
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
          : newArrivalPerformance?.map((performance, index) => (
              <MotionPoster
                key={index}
                flex="1"
                maxW="300px"
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
                        <Heading
                          size="md"
                          mb="1"
                          fontSize="xl"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          title={performance.prfnm}
                        >
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
      </Slider>

      <Spacer h={{ base: '12', md: '24' }} />
    </Box>
  );
};

export default IndexPage;

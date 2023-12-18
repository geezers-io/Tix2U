import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Flex, Heading, Image, Card, Text, Badge, Divider } from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceDetail } from '@/api/services/PerformanceService.types';
import { useCustomToast } from '@/hooks/useCustomToast';

const TicketingResultPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<PerformanceDetail>();
  const router = useRouter();
  const mt20id = router.query.mt20id as string;
  const toast = useCustomToast();

  const fetchDetail = async (mt20id: string) => {
    try {
      const response = await PerformanceService.getDetail({ mt20id });
      setDetail(response);
      setLoading(false);
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    if (!mt20id) return;
    fetchDetail(String(mt20id));
  }, []);

  if (!detail) return;
  return (
    <Box p="10px 5%" bg="purple.50">
      <Box m="0 auto" bgColor="white" p={5} w="90%" maxW="700px" minH="800px">
        {loading ? (
          <Flex p="50% 45%">
            <CircularProgress isIndeterminate color="purple" />
          </Flex>
        ) : (
          <Box m="20%">
            <Heading size="md" textAlign="center" m="50px 20px">
              예매가 성공적으로 진행되었습니다!
            </Heading>
            <Image src="/ticket/top_ticket.png" />
            <Card p="20px">
              <Box>
                <Badge colorScheme="brand" m="10px">
                  title
                </Badge>
                <Text as="b" m="10px">
                  {detail.prfnm}
                </Text>
              </Box>
              <Box>
                <Badge colorScheme="brand" m="10px">
                  time
                </Badge>
                <Text as="b" m="10px">
                  {detail.prfpdfrom} - {detail.prfpdto}
                </Text>
              </Box>
              <Box>
                <Badge colorScheme="brand" m="10px">
                  location
                </Badge>
                <Text as="b" m="10px">
                  {detail.fcltynm}
                </Text>
                <Box textAlign="center" m="20px">
                  <Divider orientation="horizontal" />
                </Box>
              </Box>

              <Image src="/ticket/QRcode.png" w="200px" m="20px auto" />
              <Image src="/name_logo.png" w="150px" m="5px auto" />
            </Card>
            <Image src="/ticket/bottom_ticket.png" />
            <Text textColor="gray" m="20px 10px" textAlign="center">
              QR 티켓 분실 시 공연 입장에 불리할 수 있습니다.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TicketingResultPage;

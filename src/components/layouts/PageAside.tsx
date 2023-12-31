import Link from 'next/link';
import { FC } from 'react';
import { Github, Slack } from 'react-bootstrap-icons';
import { Box, Image, Text, HStack, Divider } from '@chakra-ui/react';

const PageAside: FC = () => {
  return (
    <Box
      as="aside"
      w="100%"
      h="100px"
      position="sticky"
      top={0}
      paddingTop={{ base: 0, md: '8px' }}
      zIndex={999}
      display="flex"
      alignItems="center"
      flexDirection="column"
      paddingX="4"
    >
      <HStack spacing="4" marginY="4">
        <Image src="/logo.png" alt="Logo" w="100px" h="50px" />
        <Text fontSize="sm" opacity={0.5}>
          개인정보처리방침
        </Text>
        <Text fontSize="sm" opacity={0.5}>
          이용약관
        </Text>
        <Text fontSize="sm" opacity={0.5}>
          이용안내
        </Text>
      </HStack>

      <Divider orientation="horizontal" borderColor="gray.500" height="20px" marginY="4" maxW="40%" />

      <HStack spacing="4">
        <Link href="https://github.com/geezers-io/Tix2U">
          <Github size="20px" />
        </Link>
        <Link href="https://app.slack.com/client/T05QT05KFE0/C05QHT2RUS2">
          <Slack size="20px" />
        </Link>
      </HStack>

      <Text fontWeight="bold" fontSize="sm" marginY="2">
        OPERATING HOURS
      </Text>
      <Text fontSize="sm" opacity={0.5}>
        MON - SUN PM 21:00 - AM 02:00
      </Text>
      <Text fontSize="sm" opacity={0.5}>
        LUNCH AM 11:00 - PM 13:00
      </Text>
    </Box>
  );
};

export default PageAside;

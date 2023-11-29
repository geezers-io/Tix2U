import { FC } from 'react';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { Button, Flex, Text } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Flex justifyContent="center" alignItems="center" marginTop="4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        leftIcon={<CaretLeftFill />}
        colorScheme="brand"
        variant="outline"
        marginRight="2"
      >
        티켓 더보기
      </Button>
      <Text fontSize="sm" fontWeight="bold" color="brand.200" marginRight="2">
        {currentPage}/{totalPages}
      </Text>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        rightIcon={<CaretRightFill />}
        colorScheme="brand"
        variant="outline"
      >
        티켓 더보기
      </Button>
    </Flex>
  );
};

export default Pagination;

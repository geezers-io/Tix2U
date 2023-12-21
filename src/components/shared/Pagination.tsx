import Link from 'next/link';
import { FC } from 'react';
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';
import { Box } from '@chakra-ui/react';
import { colors } from '@/styles/theme/@colors';

const Pagination: FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <Box display="flex" alignItems="center">
      {currentPage > 1 && (
        <Link href="#" passHref>
          <a style={{ marginRight: '8px' }} onClick={() => onPageChange(currentPage - 1)}>
            <ChevronCompactLeft />
          </a>
        </Link>
      )}

      {renderPageNumbers().map(page => (
        <Link key={page} href="#" passHref>
          <a
            style={{
              margin: '0 4px',
              fontWeight: currentPage === page ? 'bold' : 'normal',
              color: currentPage === page ? colors.brand[300] : 'inherit',
              opacity: currentPage === page ? 1 : 0.5,
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href="#" passHref>
          <a style={{ marginLeft: '8px' }} onClick={() => onPageChange(currentPage + 1)}>
            <ChevronCompactRight />
          </a>
        </Link>
      )}
    </Box>
  );
};

export default Pagination;

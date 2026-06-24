import * as React from 'react';

import { IconButton } from '../Button';
import { Icon } from '../Icons';
import Typography from '../Typography';

import { Container, EllipsisItem, PageButton } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';
import { ELLIPSIS, getPageRange } from './Pagination.utils';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  forceTheme,
  siblingCount = 1
}) => {
  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <Container className={className}>
      <IconButton
        disabled={currentPage <= 1}
        forceTheme={forceTheme}
        icon={Icon.ChevronLeft}
        tooltip='Previous page'
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pages.map((page, index) =>
        page === ELLIPSIS ? (
          <EllipsisItem key={`ellipsis-${index}`}>
            <Typography color='disabled'>···</Typography>
          </EllipsisItem>
        ) : (
          <PageButton
            $active={page === currentPage}
            $forceTheme={forceTheme}
            key={page}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            <Typography color={page === currentPage ? 'primary' : 'secondary'} forceTheme={forceTheme}>
              {page}
            </Typography>
          </PageButton>
        )
      )}
      <IconButton
        disabled={currentPage >= totalPages}
        forceTheme={forceTheme}
        icon={Icon.ChevronRight}
        tooltip='Next page'
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Container>
  );
};

export default Pagination;

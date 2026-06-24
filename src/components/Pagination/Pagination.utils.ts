export const ELLIPSIS = 'ellipsis';
export type PageItem = number | typeof ELLIPSIS;

/** Builds a page list like [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10], always including the first/last page */
export const getPageRange = (currentPage: number, totalPages: number, siblingCount: number): PageItem[] => {
  const totalVisible = siblingCount * 2 + 5; // first + last + current + 2 ellipses worth of siblings
  if (totalPages <= totalVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const pages: PageItem[] = [];
  pages.push(1);
  if (showLeftEllipsis) pages.push(ELLIPSIS);

  for (let page = showLeftEllipsis ? leftSibling : 2; page <= (showRightEllipsis ? rightSibling : totalPages - 1); page += 1) {
    pages.push(page);
  }

  if (showRightEllipsis) pages.push(ELLIPSIS);
  pages.push(totalPages);

  return pages;
};

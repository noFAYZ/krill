import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import DropdownItem from '../DropdownItem';
import Typography, { TypographySize } from '../Typography';

import { EndAdornment } from './FilterSelect.styles';

interface FilterSelectMetadataItemProps {
  numActiveFilters: number;
  clearAllFilters: () => void;
}

export const FilterSelectMetadataItem: React.FC<FilterSelectMetadataItemProps> = ({
  numActiveFilters,
  clearAllFilters
}) => {
  const [clearAllHover, setClearAllHover] = React.useState(false);
  const label = `${numActiveFilters} filter${numActiveFilters === 1 ? '' : 's'} applied`;

  const renderFilterInfoText = (text: string, isHovered?: boolean, onClick?: () => void) => (
    <Typography
      color={isHovered ? 'link' : 'secondary'}
      forceTheme={ThemeMode.DARK}
      mono
      size={TypographySize.CAPTION}
      uppercase
      onClick={onClick}
    >
      {text}
    </Typography>
  );

  return (
    <DropdownItem
      customLabel={renderFilterInfoText(label)}
      endElement={
        <EndAdornment onMouseEnter={() => setClearAllHover(true)} onMouseLeave={() => setClearAllHover(false)}>
          {renderFilterInfoText('Clear all', clearAllHover, clearAllFilters)}
        </EndAdornment>
      }
      label={label}
      size={Size.MEDIUM}
    />
  );
};

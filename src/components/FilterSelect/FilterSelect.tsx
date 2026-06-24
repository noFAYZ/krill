import * as React from 'react';

import { ThemeMode } from '../../types';
import Divider from '../Divider';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import Icons, { Icon } from '../Icons';
import { InputField } from '../InputField';

import { Container, DividerContainer, ScrollContainer } from './FilterSelect.styles';
import { FilterSelectMetadataItem } from './FilterSelectMetadataItem';
import { FilterSelectProps } from './FilterSelect.types';

export const FILTER_DROPDOWN_WIDTH = 260;

export const FilterSelect: React.FC<FilterSelectProps> = ({
  open,
  buttonRef,
  filterLabels,
  onClose,
  onSelectFilter,
  isFilterActive,
  clearAllFilters,
  numActiveFilters,
  minWidth
}) => {
  const [highlightedIdx, setHighlightedIdx] = React.useState<number>(0);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resets local state in response to the open prop closing
      setSearch('');
      setHighlightedIdx(0);
    }
  }, [open]);

  const setShowDropdown = (dropdownOpen: boolean) => {
    if (!dropdownOpen) onClose();
  };

  const filteredFilters = [...filterLabels]
    .filter((filter) => filter.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Dropdown
      buttonRef={buttonRef}
      inputField={<InputField value={search} onChange={(e) => setSearch(e.target.value)} />}
      keyboardNavControls={{
        idx: highlightedIdx,
        setIdx: setHighlightedIdx,
        numItems: filteredFilters.length
      }}
      minWidth={minWidth}
      portal
      setShowDropdown={setShowDropdown}
      showDropdown={open}
      width={FILTER_DROPDOWN_WIDTH}
    >
      <Container>
        {filteredFilters.length > 0 && (
          <ScrollContainer>
            {filteredFilters.map((filter, index) => {
              const isHighlighted = highlightedIdx !== undefined ? index === highlightedIdx : undefined;
              const isActive = isFilterActive(filter);
              return (
                <DropdownItem
                  highlight={isHighlighted}
                  key={filter}
                  label={filter}
                  startElement={
                    isActive ? (
                      <Icons color='link' forceTheme={ThemeMode.DARK} icon={Icon.CheckboxFilled} />
                    ) : (
                      <Icons color='secondary' forceTheme={ThemeMode.DARK} icon={Icon.CheckboxEmpty} />
                    )
                  }
                  onClick={() => onSelectFilter(filter)}
                  onHover={() => setHighlightedIdx(index)}
                />
              );
            })}
          </ScrollContainer>
        )}
        {!!numActiveFilters && (
          <>
            <DividerContainer>
              <Divider forceTheme={ThemeMode.DARK} width={248} />
            </DividerContainer>
            <FilterSelectMetadataItem
              clearAllFilters={() => {
                clearAllFilters();
                onClose();
              }}
              numActiveFilters={numActiveFilters}
            />
          </>
        )}
      </Container>
    </Dropdown>
  );
};

export default FilterSelect;

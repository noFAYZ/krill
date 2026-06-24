import debounce from 'lodash/debounce';
import * as React from 'react';

import { InputField } from '../InputField';
import Typography from '../Typography';

import { SearchContainer } from './MobileSearch.styles';
import { MobileSearchProps } from './MobileSearch.types';

const MobileSearch: React.FC<MobileSearchProps> = ({
  setSearchQuery,
  onCancel,
  disableCancelButton = false,
  initialValue = '',
  placeHolder = 'Search...',
  disabled,
  resetKey,
  showBorder = false
}) => {
  const [value, setValue] = React.useState(initialValue);

  const debouncedSetSearchQuery = React.useMemo(
    () => debounce((val: string) => setSearchQuery(val.toLowerCase()), 500),
    [setSearchQuery]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSetSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setValue('');
    setSearchQuery('');
    onCancel?.();
  };

  // Clear the search whenever resetKey changes, e.g. the consumer navigated to a different view
  React.useEffect(() => {
    clearSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const blurOnEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  const showCancelButton = !!value && !disableCancelButton;

  return (
    <SearchContainer $showBorder={showBorder}>
      <InputField
        autoComplete='off'
        disabled={disabled}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        onKeyPress={blurOnEnterPress}
      />
      {showCancelButton && (
        <Typography color='link' minWidth='fit-content' onClick={clearSearch}>
          Cancel
        </Typography>
      )}
    </SearchContainer>
  );
};

export default MobileSearch;

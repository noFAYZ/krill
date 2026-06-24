import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import Dialog, { DialogType } from '../Dialog';
import Divider from '../Divider';
import { InputField, InputFieldVariant } from '../InputField';
import Icons, { Icon } from '../Icons';
import ListItem from '../ListItem';
import Typography from '../Typography';

import {
  Content,
  EmptyState,
  EmptyStateIcon,
  Highlight,
  InputContainer,
  ResultsList,
  RowWrapper
} from './CommandMenu.styles';
import { CommandMenuItem, CommandMenuProps } from './CommandMenu.types';

const CommandMenu: React.FC<CommandMenuProps> = ({
  dataTest,
  emptyState,
  forceTheme = ThemeMode.DARK,
  height,
  items,
  onClose,
  onQueryChange,
  open,
  placeholder = 'Search...',
  query
}) => {
  // Reset the highlighted row whenever the menu reopens or the query changes, without an Effect
  // (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  const resetKey = `${open ? '1' : '0'}:${query}`;
  const [trackedResetKey, setTrackedResetKey] = React.useState(resetKey);
  const [highlightedIndexRaw, setHighlightedIndexRaw] = React.useState(0);
  if (resetKey !== trackedResetKey) {
    setTrackedResetKey(resetKey);
    setHighlightedIndexRaw(0);
  }
  const highlightedIndex = items.length === 0 ? 0 : Math.min(highlightedIndexRaw, items.length - 1);

  const selectItem = (item: CommandMenuItem | undefined) => item?.onSelect();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndexRaw((index) => Math.min(index + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndexRaw((index) => Math.max(index - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectItem(items[highlightedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog
      customContent
      dataTest={dataTest}
      forceTheme={forceTheme}
      height={height}
      noPadding
      onClose={onClose}
      open={open}
      type={DialogType.SEARCH}
    >
      <Content>
        <InputContainer>
          <InputField
            // eslint-disable-next-line jsx-a11y/no-autofocus -- palette search input, focused when the user explicitly opens it
            autoFocus
            forceTheme={forceTheme}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            size={Size.MEDIUM}
            value={query}
            variant={InputFieldVariant.GHOST}
          />
        </InputContainer>
        <Divider forceTheme={forceTheme} />
        <ResultsList>
          {items.length === 0 &&
            (emptyState ?? (
              <EmptyState>
                <EmptyStateIcon>
                  <Icons color='secondary' forceTheme={forceTheme} icon={Icon.Search} size={Size.X_MEDIUM} />
                </EmptyStateIcon>
                <Typography color='secondary' forceTheme={forceTheme}>
                  {query ? <>No results for &quot;{query}&quot;</> : 'No results'}
                </Typography>
              </EmptyState>
            ))}
          {items.map((item, index) => (
            <RowWrapper key={item.key}>
              {index === highlightedIndex && (
                <Highlight layoutId='command-menu-highlight' transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }} />
              )}
              <ListItem
                forceTheme={forceTheme}
                leading={item.leading}
                onClick={() => selectItem(item)}
                onMouseEnter={() => setHighlightedIndexRaw(index)}
                style={{ position: 'relative', zIndex: 1 }}
                subtitle={item.subtitle}
                title={item.title}
                trailing={item.trailing}
              />
            </RowWrapper>
          ))}
        </ResultsList>
      </Content>
    </Dialog>
  );
};

export default CommandMenu;

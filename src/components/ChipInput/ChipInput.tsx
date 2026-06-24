import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import Chip from '../Chip';

import { Container, EditingInput, TrailingInput } from './ChipInput.styles';
import { ChipInputProps } from './ChipInput.types';

const DEFAULT_DELIMITER_KEYS = ['Enter', ','];

const defaultValidate = (value: string) => value.trim().length > 0;

const ChipInput: React.FC<ChipInputProps> = ({
  className,
  dataTest,
  disabled,
  forceTheme,
  items,
  onInputChange,
  onItemsChange,
  placeholder,
  renderChip,
  validate = defaultValidate
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState<number | undefined>(undefined);
  const [editingValue, setEditingValue] = React.useState('');

  const commitInput = () => {
    const trimmed = inputValue.trim();
    // Chips are keyed by value for animation identity, so duplicates aren't supported
    if (!validate(trimmed) || items.includes(trimmed)) return;
    onItemsChange([...items, trimmed]);
    setInputValue('');
  };

  const removeItem = (index: number) => onItemsChange(items.filter((_, i) => i !== index));

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(items[index]);
  };

  const commitEdit = () => {
    if (editingIndex === undefined) return;
    const trimmed = editingValue.trim();
    const duplicate = items.some((existing, i) => i !== editingIndex && existing === trimmed);
    if (duplicate) {
      setEditingIndex(undefined);
      return;
    }
    const next = [...items];
    if (trimmed.length === 0) {
      next.splice(editingIndex, 1);
    } else {
      next[editingIndex] = trimmed;
    }
    onItemsChange(next);
    setEditingIndex(undefined);
  };

  const onTrailingInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (DEFAULT_DELIMITER_KEYS.includes(e.key)) {
      e.preventDefault();
      commitInput();
    } else if (e.key === 'Backspace' && inputValue.length === 0 && items.length > 0) {
      removeItem(items.length - 1);
    }
  };

  return (
    <Container className={className} data-test={dataTest} $disabled={disabled}>
      <AnimatePresence initial={false}>
        {items.map((item, index) =>
          index === editingIndex ? (
            <EditingInput
              // eslint-disable-next-line jsx-a11y/no-autofocus -- entering edit mode is itself the user's focus action
              autoFocus
              key={item}
              onBlur={commitEdit}
              onChange={(e) => setEditingValue(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitEdit();
              }}
              size={Math.max(editingValue.length, 1)}
              value={editingValue}
            />
          ) : (
            <motion.span
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              initial={{ scale: 0.7, opacity: 0 }}
              key={item}
              onClick={() => startEditing(index)}
              style={{ display: 'inline-flex' }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {renderChip ? (
                renderChip(item, index)
              ) : (
                <Chip forceTheme={forceTheme} label={item} onDelete={() => removeItem(index)} />
              )}
            </motion.span>
          )
        )}
      </AnimatePresence>
      <TrailingInput
        disabled={disabled}
        onBlur={commitInput}
        onChange={(e) => {
          setInputValue(e.target.value);
          onInputChange?.(e.target.value);
        }}
        onKeyDown={onTrailingInputKeyDown}
        placeholder={items.length === 0 ? placeholder : undefined}
        value={inputValue}
      />
    </Container>
  );
};

export default ChipInput;

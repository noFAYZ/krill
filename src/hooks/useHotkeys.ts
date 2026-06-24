import { useEffect, useRef } from 'react';

export interface UseHotkeysOptions {
  /** Disables the hotkey without unmounting the hook */
  enabled?: boolean;
  /** Ignores the hotkey while an input, textarea, or contenteditable element is focused. Defaults to true */
  ignoreWhenTyping?: boolean;
}

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
};

const matchesCombo = (e: KeyboardEvent, combo: string): boolean => {
  const parts = combo.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  const needsMod = parts.includes('mod');
  const needsShift = parts.includes('shift');
  const needsAlt = parts.includes('alt');
  if (needsMod !== (e.metaKey || e.ctrlKey)) return false;
  if (needsShift !== e.shiftKey) return false;
  if (needsAlt !== e.altKey) return false;
  return e.key.toLowerCase() === key;
};

/**
 * Hook for registering a single-key or key-combo (e.g. 'j', 'mod+k', 'mod+shift+m') global shortcut.
 * 'mod' matches Cmd on Mac and Ctrl elsewhere.
 * @param {string} combo - the key combo to match
 * @param {function} handler - called with the triggering KeyboardEvent on match
 * @param {UseHotkeysOptions} options - enabled, ignoreWhenTyping
 */
export const useHotkeys = (combo: string, handler: (e: KeyboardEvent) => void, options: UseHotkeysOptions = {}) => {
  const { enabled = true, ignoreWhenTyping = true } = options;
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const listener = (e: KeyboardEvent) => {
      if (ignoreWhenTyping && isTypingTarget(e.target)) return;
      if (!matchesCombo(e, combo)) return;
      e.preventDefault();
      handlerRef.current(e);
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [combo, enabled, ignoreWhenTyping]);
};

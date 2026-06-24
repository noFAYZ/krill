import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface UseSwipeOptions {
  /** Horizontal distance in px the user must swipe past for onSwipeComplete to fire */
  completeThreshold: number;
  /** Disables the gesture without unmounting the hook */
  disabled?: boolean;
  /** Called on every touchmove with the current horizontal offset in px */
  onSwipe?: (offset: number) => void;
  /** Called on touch end if the offset exceeded completeThreshold; negative offset means swiped left */
  onSwipeComplete: (offset: number) => void;
}

export interface UseSwipeResult {
  /** Attach to the swipeable element */
  ref: RefObject<HTMLElement>;
  /** Current horizontal swipe offset in px, for driving a transform */
  offset: number;
}

/**
 * Hook for a horizontal swipe-to-reveal/swipe-to-act gesture (e.g. archive-on-swipe list rows).
 * @param {UseSwipeOptions} options - completeThreshold, disabled, onSwipe, onSwipeComplete
 * @returns {UseSwipeResult} ref to attach to the swipeable element, and the current offset in px
 */
export const useSwipe = ({
  completeThreshold,
  disabled,
  onSwipe,
  onSwipeComplete
}: UseSwipeOptions): UseSwipeResult => {
  const ref = useRef<HTMLElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    startRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      if (disabled || !startRef.current || !touch) return;
      const dx = touch.clientX - startRef.current.x;
      const dy = touch.clientY - startRef.current.y;
      // Ignore mostly-vertical gestures before any horizontal movement has started, so list scrolling still works
      if (offset === 0 && Math.abs(dy) > Math.abs(dx)) return;
      e.preventDefault();
      setOffset(dx);
      onSwipe?.(dx);
    },
    [disabled, offset, onSwipe]
  );

  const handleTouchEnd = useCallback(() => {
    if (Math.abs(offset) > completeThreshold) onSwipeComplete(offset);
    setOffset(0);
    startRef.current = null;
  }, [completeThreshold, offset, onSwipeComplete]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { ref, offset };
};

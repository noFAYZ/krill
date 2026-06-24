export enum Alignment {
  CENTER = 'center',
  INHERIT = 'inherit',
  JUSTIFY = 'justify',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum FilledVariant {
  FILLED = 'filled',
  UNFILLED = 'unfilled'
}

export enum KeyboardEvents {
  KEY_DOWN = 'keydown',
  KEY_UP = 'keyup'
}

export enum Layout {
  INLINE = 'inline',
  STACKED = 'stacked'
}

export enum MouseEvents {
  CLICK = 'click',
  MOUSE_DOWN = 'mousedown',
  MOUSE_MOVE = 'mousemove',
  MOUSE_UP = 'mouseup'
}

export enum Size {
  X_SMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  X_MEDIUM = 'xmedium',
  LARGE = 'large',
  X_LARGE = 'xlarge'
}

export enum StorageOnlyThemeMode {
  SYSTEM = 'system'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum TouchEvents {
  TOUCH_START = 'touchstart'
}

export enum TwelveHourPeriod {
  AM = 'AM',
  PM = 'PM'
}

export enum Type {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DESTRUCTIVE = 'destructive'
}

export type MouseClickEvents = MouseEvents.CLICK | MouseEvents.MOUSE_DOWN | MouseEvents.MOUSE_UP;
export type LocalStorageThemeMode = ThemeMode | StorageOnlyThemeMode;

// React 18's RefObject<T> bakes in `current: T | null`; React 19's requires `current: T` exactly,
// so a `useRef<T>(null)` ref must be typed RefObject<T | null>. Neither spelling satisfies a native
// JSX `ref` prop under the other major. This structural shape satisfies both, since it matches the
// actual runtime object regardless of which version's nominal RefObject<T> produced it.
export interface NullableRef<T> {
  current: T | null;
}

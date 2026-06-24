const STORAGE_PREFIX = 'krill:sidebar-section:';

const getSectionStorageKey = (key: string) => `${STORAGE_PREFIX}${key}`;

export const getStoredSectionOpenState = (key: string, defaultOpen: boolean): boolean => {
  const stored = localStorage.getItem(getSectionStorageKey(key));
  return stored === null ? defaultOpen : stored === 'true';
};

export const setStoredSectionOpenState = (key: string, open: boolean) => {
  localStorage.setItem(getSectionStorageKey(key), String(open));
};

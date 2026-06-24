import { ComponentDoc } from '../types';

import { DATA_DISPLAY_DOCS } from './dataDisplay';
import { DATE_TIME_DOCS } from './dateTime';
import { FEEDBACK_DOCS } from './feedback';
import { INPUT_DOCS } from './inputs';
import { LAYOUT_DOCS } from './layout';
import { MEDIA_DOCS } from './media';
import { OVERLAY_DOCS } from './overlays';

export const REGISTRY: ComponentDoc[] = [
  ...INPUT_DOCS,
  ...FEEDBACK_DOCS,
  ...OVERLAY_DOCS,
  ...LAYOUT_DOCS,
  ...DATA_DISPLAY_DOCS,
  ...DATE_TIME_DOCS,
  ...MEDIA_DOCS
];

export const REGISTRY_BY_CATEGORY: Record<string, ComponentDoc[]> = REGISTRY.reduce((acc, doc) => {
  (acc[doc.category] ??= []).push(doc);
  return acc;
}, {} as Record<string, ComponentDoc[]>);

export const getDocBySlug = (slug: string): ComponentDoc | undefined => REGISTRY.find((doc) => doc.slug === slug);

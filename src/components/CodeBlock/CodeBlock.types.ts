export type CodeBlockLanguage = 'tsx' | 'bash';

export interface CodeBlockProps {
  code: string;
  language?: CodeBlockLanguage;
}

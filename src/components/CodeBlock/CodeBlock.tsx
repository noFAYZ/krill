import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import * as React from 'react';

import CopyToClipboardButton from '../CopyToClipboardButton';

import { Code, Container, CopyButton, Pre } from './CodeBlock.styles';
import { CodeBlockProps } from './CodeBlock.types';

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx' }) => {
  const trimmed = code.trim();
  const html = Prism.languages[language] ? Prism.highlight(trimmed, Prism.languages[language], language) : trimmed;

  return (
    <Container>
      <CopyButton>
        <CopyToClipboardButton onClick={() => navigator.clipboard?.writeText(trimmed)} />
      </CopyButton>
      <Pre>
        <Code dangerouslySetInnerHTML={{ __html: html }} />
      </Pre>
    </Container>
  );
};

export default CodeBlock;

import * as React from 'react';

import { CodeBlock, Tabs, Typography, TypographySize, TypographyWeight } from '../../src';
import { ExampleDoc } from '../types';

import { ExampleContainer, PreviewSurface } from './PreviewExample.styles';

const PreviewExample: React.FC<{ example: ExampleDoc }> = ({ example }) => {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');

  return (
    <ExampleContainer>
      <div>
        <Typography weight={TypographyWeight.MEDIUM}>{example.title}</Typography>
        {example.description && (
          <Typography color='secondary' size={TypographySize.SMALL}>
            {example.description}
          </Typography>
        )}
      </div>
      <Tabs
        tabs={[
          { label: 'Preview', active: tab === 'preview', onClick: () => setTab('preview') },
          { label: 'Code', active: tab === 'code', onClick: () => setTab('code') }
        ]}
      />
      {tab === 'preview' ? (
        <PreviewSurface>
          <example.Component />
        </PreviewSurface>
      ) : (
        <CodeBlock code={example.code} />
      )}
    </ExampleContainer>
  );
};

export default PreviewExample;

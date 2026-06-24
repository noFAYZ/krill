import * as React from 'react';

import { CodeBlock, Typography, TypographySize, TypographyWeight } from '../../src';
import { ComponentDoc } from '../types';

import { Header, PageContainer, Section, SectionTitle } from './ComponentPage.styles';
import PreviewExample from './PreviewExample';
import PropsTable from './PropsTable';

const ComponentPage: React.FC<{ doc: ComponentDoc }> = ({ doc }) => (
  <PageContainer>
    <Header>
      <Typography size={TypographySize.H2} weight={TypographyWeight.BOLD}>
        {doc.title}
      </Typography>
      <Typography color='secondary' wrap>
        {doc.description}
      </Typography>
    </Header>

    <Section>
      <CodeBlock code={doc.importStatement} />
    </Section>

    {doc.examples.map((example) => (
      <PreviewExample example={example} key={example.title} />
    ))}

    {doc.props.length > 0 && (
      <Section>
        <SectionTitle>
          <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
            Props
          </Typography>
        </SectionTitle>
        <PropsTable props={doc.props} />
      </Section>
    )}
  </PageContainer>
);

export default ComponentPage;

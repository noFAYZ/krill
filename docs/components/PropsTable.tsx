import * as React from 'react';

import { Typography, TypographySize } from '../../src';
import { PropDoc } from '../types';

import { Cell, HeaderCell, HeaderRow, NameCell, Row, Table, TypeCell } from './PropsTable.styles';

const PropsTable: React.FC<{ props: PropDoc[] }> = ({ props }) => (
  <Table>
    <thead>
      <HeaderRow>
        <HeaderCell>
          <Typography color='secondary' size={TypographySize.SMALL}>
            Prop
          </Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography color='secondary' size={TypographySize.SMALL}>
            Type
          </Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography color='secondary' size={TypographySize.SMALL}>
            Default
          </Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography color='secondary' size={TypographySize.SMALL}>
            Description
          </Typography>
        </HeaderCell>
      </HeaderRow>
    </thead>
    <tbody>
      {props.map((prop) => (
        <Row key={prop.name}>
          <NameCell>
            <Typography size={TypographySize.SMALL}>
              {prop.name}
              {prop.required && '*'}
            </Typography>
          </NameCell>
          <TypeCell>
            <Typography color='secondary' size={TypographySize.SMALL}>
              {prop.type}
            </Typography>
          </TypeCell>
          <Cell>
            <Typography color='secondary' size={TypographySize.SMALL}>
              {prop.default ?? '—'}
            </Typography>
          </Cell>
          <Cell>
            <Typography color='secondary' size={TypographySize.SMALL} wrap>
              {prop.description}
            </Typography>
          </Cell>
        </Row>
      ))}
    </tbody>
  </Table>
);

export default PropsTable;

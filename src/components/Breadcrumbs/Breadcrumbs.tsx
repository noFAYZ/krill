import * as React from 'react';

import Icons, { Icon } from '../Icons';
import Typography from '../Typography';

import { Container, Crumb } from './Breadcrumbs.styles';
import { BreadcrumbsProps } from './Breadcrumbs.types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, forceTheme, separator = Icon.ChevronRight }) => (
  <Container className={className}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (
        <Crumb key={item.key}>
          <Typography
            color={isLast || !item.onClick ? 'primary' : 'secondary'}
            forceTheme={forceTheme}
            onClick={item.onClick}
          >
            {item.label}
          </Typography>
          {!isLast && <Icons color='disabled' forceTheme={forceTheme} icon={separator} size={14} />}
        </Crumb>
      );
    })}
  </Container>
);

export default Breadcrumbs;

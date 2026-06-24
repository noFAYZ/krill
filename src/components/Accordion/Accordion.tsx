import * as React from 'react';

import Icons, { Icon } from '../Icons';
import Typography from '../Typography';

import { Container, Content, Header, ItemContainer, TitleContainer } from './Accordion.styles';
import { AccordionProps } from './Accordion.types';

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, defaultOpenKeys, className, forceTheme }) => {
  const [openKeys, setOpenKeys] = React.useState<string[]>(defaultOpenKeys ?? []);

  const toggleKey = (key: string) => {
    setOpenKeys((prev) => {
      const isOpen = prev.includes(key);
      if (isOpen) return prev.filter((k) => k !== key);
      return allowMultiple ? [...prev, key] : [key];
    });
  };

  return (
    <Container className={className}>
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <ItemContainer key={item.key}>
            <Header
              $disabled={item.disabled}
              $forceTheme={forceTheme}
              onClick={item.disabled ? undefined : () => toggleKey(item.key)}
            >
              {item.icon && <Icons color='secondary' forceTheme={forceTheme} icon={item.icon} size={18} />}
              <TitleContainer>
                <Typography forceTheme={forceTheme}>{item.title}</Typography>
              </TitleContainer>
              <Icons
                color='secondary'
                forceTheme={forceTheme}
                icon={Icon.ChevronDown}
                rotate={isOpen ? 180 : 0}
                size={16}
              />
            </Header>
            {isOpen && <Content>{item.content}</Content>}
          </ItemContainer>
        );
      })}
    </Container>
  );
};

export default Accordion;

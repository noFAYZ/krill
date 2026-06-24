import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import Divider from '../Divider';
import Icons, { Icon } from '../Icons';
import ListItem from '../ListItem';
import Typography, { TypographySize } from '../Typography';

import { Container, EmptyLabel, Footer, Section, SectionHeader } from './Sidebar.styles';
import { SidebarProps, SidebarSection } from './Sidebar.types';
import { getStoredSectionOpenState, setStoredSectionOpenState } from './Sidebar.utils';

const SidebarSectionRow: React.FC<{ forceTheme?: ThemeMode; section: SidebarSection }> = ({ forceTheme, section }) => {
  const { key, label, items, collapsible, defaultOpen = true, emptyLabel } = section;
  const [isOpen, setIsOpen] = React.useState(() => (collapsible ? getStoredSectionOpenState(key, defaultOpen) : true));

  const toggleOpen = () => {
    if (!collapsible) return;
    const next = !isOpen;
    setIsOpen(next);
    setStoredSectionOpenState(key, next);
  };

  return (
    <>
      {label && (
        <SectionHeader $collapsible={collapsible} onClick={toggleOpen}>
          <Typography color='disabled' forceTheme={forceTheme} mono size={TypographySize.CAPTION} uppercase>
            {label}
          </Typography>
          {collapsible && (
            <Icons
              color='secondary'
              forceTheme={forceTheme}
              icon={Icon.ChevronRight}
              rotate={isOpen ? 90 : 0}
              size={Size.SMALL}
            />
          )}
        </SectionHeader>
      )}
      {(!collapsible || isOpen) && (
        <Section>
          {items.length === 0 && emptyLabel ? (
            <EmptyLabel>
              <Typography color='disabled' forceTheme={forceTheme}>
                {emptyLabel}
              </Typography>
            </EmptyLabel>
          ) : (
            items.map((item) => (
              <ListItem
                active={item.active}
                forceTheme={forceTheme}
                key={item.key}
                leading={item.icon}
                title={item.label}
                onClick={item.onClick}
              />
            ))
          )}
        </Section>
      )}
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  dataTest,
  footer,
  forceTheme,
  sections,
  style,
  width
}) => (
  <Container className={className} data-test={dataTest} forceTheme={forceTheme} style={style} $width={width}>
    {children}
    {sections.map((section, index) => (
      <React.Fragment key={section.key}>
        {index > 0 && <Divider forceTheme={forceTheme} />}
        <SidebarSectionRow forceTheme={forceTheme} section={section} />
      </React.Fragment>
    ))}
    {footer && <Footer>{footer}</Footer>}
  </Container>
);

export default Sidebar;

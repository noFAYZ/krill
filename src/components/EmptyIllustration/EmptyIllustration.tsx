import { motion } from 'framer-motion';
import * as React from 'react';

import { Size, Type } from '../../types';
import { Button } from '../Button';
import Icons, { Icon } from '../Icons';
import Typography, { TypographyWeight } from '../Typography';

import {
  AvatarNameSection,
  EmptyAvatar,
  EmptyDate,
  EmptyMailbox,
  EmptyMessage,
  EmptyName,
  EmptyRows,
  EmptySubject,
  LowOpacityIcons,
  MailTypography
} from './EmptyIllustration.styles';
import { EmptyIllustrationProps } from './EmptyIllustration.types';

const PLACEHOLDER_ROWS = [0, 1, 2];

const EmptyIllustration: React.FC<EmptyIllustrationProps> = ({ title, subtitle, action, illustration }) => {
  const renderedIllustration =
    illustration && action?.setIsHovered ? (
      <motion.div
        animate={action.isHovered ? { rotate: -12, y: 30 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: 'center' }}
      >
        {illustration}
      </motion.div>
    ) : (
      illustration
    );

  return (
    <EmptyMailbox>
      {illustration ? (
        renderedIllustration
      ) : (
        <EmptyRows>
          {PLACEHOLDER_ROWS.map((row) => (
            <EmptyMessage key={row}>
              <LowOpacityIcons>
                <Icons color='disabled' icon={Icon.CheckboxEmpty} size={Size.SMALL} />
              </LowOpacityIcons>
              <AvatarNameSection>
                <EmptyAvatar />
                <EmptyName />
              </AvatarNameSection>
              <EmptySubject />
              <EmptyDate />
            </EmptyMessage>
          ))}
        </EmptyRows>
      )}
      <MailTypography>
        <Typography color='secondary' selectable={false} weight={TypographyWeight.MEDIUM}>
          {title}
        </Typography>
        <Typography color='disabled' selectable={false}>
          {subtitle}
        </Typography>
      </MailTypography>
      {action && (
        <div onMouseEnter={() => action.setIsHovered?.(true)} onMouseLeave={() => action.setIsHovered?.(false)}>
          <Button type={Type.SECONDARY} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </EmptyMailbox>
  );
};

export default EmptyIllustration;

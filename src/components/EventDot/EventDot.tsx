import * as React from 'react';

import { EVENT_DOT_CLASS_NAME, EventDotType } from './EventDot.constants';
import { Dot, DotContainer, InnerCross, InnerDot } from './EventDot.styles';
import { EventDotProps } from './EventDot.types';

const EventDot: React.FC<EventDotProps> = ({
  color,
  className = '',
  isFaded = false,
  isSelected = false,
  type = EventDotType.FILLED
}) => {
  const dotColor = isSelected ? 'var(--text-inverse)' : color;
  return (
    <DotContainer className={className}>
      <Dot $dotColor={dotColor} $isFaded={isFaded} $type={type} className={EVENT_DOT_CLASS_NAME}>
        {type === EventDotType.EMPTY_WITH_DOT && <InnerDot $dotColor={dotColor} />}
        {type === EventDotType.EMPTY_WITH_CROSS && <InnerCross $dotColor={dotColor} />}
      </Dot>
    </DotContainer>
  );
};

export default EventDot;

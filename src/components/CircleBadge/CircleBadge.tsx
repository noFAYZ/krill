import * as React from 'react';

import Icons from '../Icons';

import { Circle, Container, HorizontalLine, VerticalLine } from './CircleBadge.styles';
import { CircleBadgeProps } from './CircleBadge.types';

const CircleBadge: React.FC<CircleBadgeProps> = ({ icon, color, hideContainer, size, onClick }) => (
  <Container $hideContainer={hideContainer} onClick={onClick}>
    <Circle />
    <HorizontalLine />
    <VerticalLine />
    <Icons color={color} icon={icon} size={size} />
  </Container>
);

export default CircleBadge;

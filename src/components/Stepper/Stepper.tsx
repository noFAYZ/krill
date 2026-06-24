import { motion } from 'framer-motion';
import * as React from 'react';

import Typography, { TypographySize, TypographyWeight } from '../Typography';

import { CarouselContainer, CarouselItemContainer, Circle, CircleList } from './Stepper.styles';
import { StepperProps } from './Stepper.types';

const CarouselItem = motion(Typography);

const useElementWidth = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (elementRef.current) setWidth(elementRef.current.scrollWidth);
  }, [elementRef]);

  return width;
};

const Stepper: React.FC<StepperProps> = ({ items }) => {
  const [currentLocation, setCurrentLocation] = React.useState(0);

  const carouselContainerRef = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(carouselContainerRef) / items.length;
  const currentView = -width * currentLocation;

  const swipeLeft = () => currentLocation !== items.length - 1 && setCurrentLocation((prev) => prev + 1);
  const swipeRight = () => currentLocation !== 0 && setCurrentLocation((prev) => prev - 1);
  const SWIPE_DISTANCE = width * 0.4;
  const SWIPE_VELOCITY_FACTOR = 0.2;

  return (
    <CarouselContainer>
      <motion.div>
        <CarouselItemContainer
          animate={{ x: currentView }}
          drag='x'
          dragConstraints={{ right: currentView, left: currentView }}
          dragElastic={0.5}
          ref={carouselContainerRef}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          onDragEnd={(_e, info) => {
            if (info.offset.x + SWIPE_VELOCITY_FACTOR * info.velocity.x < -SWIPE_DISTANCE) swipeLeft();
            else if (info.offset.x + SWIPE_VELOCITY_FACTOR * info.velocity.x > SWIPE_DISTANCE) swipeRight();
          }}
        >
          {items.map((item, index) => (
            <CarouselItem
              color='disabled'
              key={index}
              minWidth='100%'
              size={TypographySize.H2}
              weight={TypographyWeight.BOLD}
              wrap
            >
              <Typography minWidth='100%' size={TypographySize.H2} weight={TypographyWeight.BOLD} wrap>
                {item.bold}
              </Typography>
              {item.text}
            </CarouselItem>
          ))}
        </CarouselItemContainer>
      </motion.div>
      <CircleList>
        {items.map((_, index) => (
          <Circle key={index} $selected={index === currentLocation} onClick={() => setCurrentLocation(index)} />
        ))}
      </CircleList>
    </CarouselContainer>
  );
};

export default Stepper;

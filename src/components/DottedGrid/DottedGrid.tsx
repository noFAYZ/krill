import { motion, useSpring } from 'framer-motion';
import * as React from 'react';

import { ThemeMode } from '../../types';

import { Centered, PatternContainer } from './DottedGrid.styles';
import { DottedGridProps } from './DottedGrid.types';

const SQUARE_SIZE = 35;
const CROSS_SIZE = 4;
const PADDING = 4;
const GRID_SIZE = 20;
const SVG_SIZE = GRID_SIZE * (SQUARE_SIZE + 2 * PADDING);
const HIGHLIGHT_RADIUS = 100;

const MotionLine = motion.line;
const MotionRect = motion.rect;

const DottedGrid: React.FC<DottedGridProps> = ({
  isHovered,
  hideMotionLine,
  top,
  left,
  width,
  height,
  className,
  noAnimation,
  forceTheme
}) => {
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const [highlightCx, setHighlightCx] = React.useState(0);
  const [highlightCy, setHighlightCy] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  const handleMouseMove = React.useCallback((event: MouseEvent) => {
    if (!gridRef.current || noAnimation) return;
    const rect = gridRef.current.getBoundingClientRect();
    setHighlightCx(event.clientX - rect.left);
    setHighlightCy(event.clientY - rect.top);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  React.useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialRectangleY = windowHeight * 0.37;
  const targetRectangleY = 0;

  const motionVal = useSpring(initialRectangleY);

  React.useEffect(() => {
    motionVal.set(isHovered ? targetRectangleY : initialRectangleY);
  }, [isHovered, motionVal, initialRectangleY, targetRectangleY]);

  const isDark = forceTheme === ThemeMode.DARK;
  const orangeColor = isDark ? '#E2806C' : '#EF5A3C';
  const grayColor = isDark ? '#484848' : '#B8B8B8';
  const bgColor = isDark ? '#1f1f1f' : '#fafafa';
  const orangeColorWithOpacity = isDark ? '#e2806c8f' : '#ef5a3c3C';
  const grayColorWithOpacity = isDark ? '#4848488f' : '#3f3f3f3b';

  const renderMiddleLineAndRectangle = () => (
    <>
      <MotionLine
        stroke={orangeColorWithOpacity}
        strokeWidth='1'
        x1={PADDING}
        x2={SVG_SIZE - PADDING}
        y1={motionVal}
        y2={motionVal}
      />
      <MotionRect
        fill='url(#linearGradient)'
        height={SQUARE_SIZE + PADDING * 2}
        width={SVG_SIZE - PADDING * 2}
        x={PADDING}
        y={motionVal}
      />
    </>
  );

  const renderGrid = (color: string) =>
    [...Array<number>(GRID_SIZE + 1)].map((_, i: number) => (
      <React.Fragment key={i}>
        <line
          stroke={color}
          strokeDasharray='2.34 2.34'
          strokeWidth='0.3'
          x1={PADDING + i * (SQUARE_SIZE + PADDING * 2)}
          x2={PADDING + i * (SQUARE_SIZE + PADDING * 2)}
          y1={PADDING}
          y2={SVG_SIZE - PADDING}
        />
        <line
          stroke={color}
          strokeDasharray='2.34 2.34'
          strokeWidth='0.3'
          x1={PADDING}
          x2={SVG_SIZE - PADDING}
          y1={PADDING + i * (SQUARE_SIZE + PADDING * 2)}
          y2={PADDING + i * (SQUARE_SIZE + PADDING * 2)}
        />
      </React.Fragment>
    ));

  const renderCrosses = (color: string) =>
    [...Array<number>(GRID_SIZE)].map((_, i: number) =>
      [...Array<number>(GRID_SIZE)].map(
        (_, j: number) =>
          j !== Math.floor(GRID_SIZE / 2 - 4) && (
            <React.Fragment key={`${i}-${j}`}>
              <path
                d={`
                  M ${PADDING + i * (SQUARE_SIZE + PADDING * 2) - CROSS_SIZE / 2 - 2} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2)
                }
                  L ${PADDING + i * (SQUARE_SIZE + PADDING * 2) + CROSS_SIZE / 2 + 2} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2)
                }
                  M ${PADDING + i * (SQUARE_SIZE + PADDING * 2)} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2) - CROSS_SIZE / 2 - 2
                }
                  L ${PADDING + i * (SQUARE_SIZE + PADDING * 2)} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2) + CROSS_SIZE / 2 + 2
                }
                `}
                stroke={bgColor}
                strokeWidth='10'
              />
              <path
                d={`
                  M ${PADDING + i * (SQUARE_SIZE + PADDING * 2) - CROSS_SIZE / 2} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2)
                }
                  L ${PADDING + i * (SQUARE_SIZE + PADDING * 2) + CROSS_SIZE / 2} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2)
                }
                  M ${PADDING + i * (SQUARE_SIZE + PADDING * 2)} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2) - CROSS_SIZE / 2
                }
                  L ${PADDING + i * (SQUARE_SIZE + PADDING * 2)} ${
                  PADDING + j * (SQUARE_SIZE + PADDING * 2) + CROSS_SIZE / 2
                }
                `}
                stroke={color}
                strokeWidth='0.5'
              />
            </React.Fragment>
          )
      )
    );

  return (
    <Centered className={className} $height={height} $left={left} $top={top} $width={width}>
      <PatternContainer ref={gridRef}>
        <svg height={SVG_SIZE} width={SVG_SIZE}>
          <defs>
            <radialGradient id='RadialGradient'>
              <stop offset='0%' style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 1 }} />
              <stop offset='100%' style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 0 }} />
            </radialGradient>
            <linearGradient id='horizontalGradient' x1='0' x2='0.5' y1='0' y2='1'>
              <stop offset='0%' style={{ stopColor: 'rgba(239, 90, 60, 0)', stopOpacity: 1 }} />
              <stop offset='20%' style={{ stopColor: 'rgba(239, 90, 60, 0)', stopOpacity: 1 }} />
              <stop offset='100%' style={{ stopColor: 'rgba(239, 90, 60, 0)', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id='verticalGradient' x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' style={{ stopColor: 'rgba(239, 90, 60, 0.1)', stopOpacity: 1 }} />
              <stop offset='100%' style={{ stopColor: 'rgba(239, 90, 60, 0)', stopOpacity: 1 }} />
            </linearGradient>
            <pattern height='1' id='linearGradient' preserveAspectRatio='none' viewBox='0,0,1,1' width='1' x='0' y='0'>
              <rect fill='url(#horizontalGradient)' height='1' width='0.75' x='0' y='0' />
              <rect fill='url(#verticalGradient)' height='1' width='1' x='0' y='0' />
            </pattern>
            <mask height='100%' id='Mask' width='100%' x='0' y='0'>
              <rect fill='url(#RadialGradient)' height='100%' width='100%' x='0' y='0' />
            </mask>
            <mask id='CircleMask'>
              <rect fill='black' height='100%' width='100%' />
              <circle cx={highlightCx} cy={highlightCy} fill='white' r={HIGHLIGHT_RADIUS} />
            </mask>
          </defs>
          <g mask='url(#Mask)'>
            <g>{renderGrid(isHovered ? grayColorWithOpacity : grayColor)}</g>
            <g mask='url(#CircleMask)'>{renderGrid(isHovered ? grayColorWithOpacity : orangeColor)}</g>
            <g>{renderCrosses(isHovered ? grayColorWithOpacity : grayColor)}</g>
            <g mask='url(#CircleMask)'>{renderCrosses(isHovered ? grayColorWithOpacity : orangeColor)}</g>
            {!hideMotionLine && <g>{renderMiddleLineAndRectangle()}</g>}
          </g>
        </svg>
      </PatternContainer>
    </Centered>
  );
};

export default React.memo(DottedGrid);

import React, { FC, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { DropdownAnimation } from '../../constants/styles';

export const Tooltip: FC<{
  direction: 'left' | 'right';
  children: React.ReactNode;
}> = ({ direction, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const clickAwayRef = useRef<HTMLDivElement | null>(null);
  useClickAway(clickAwayRef, () => {
    setIsDropdownOpen(false);
  });

  const [{ y, opacity, pointerEvents, userSelect }, set] = useSpring(
    () => DropdownAnimation.hidden,
  );

  useEffect(() => {
    if (isDropdownOpen) {
      set(DropdownAnimation.visible);
    } else {
      set(DropdownAnimation.hidden);
    }
  }, [isDropdownOpen]);

  return (
    <TooltipContainer ref={clickAwayRef}>
      <TooltipButton onClick={() => setIsDropdownOpen(true)}>(?)</TooltipButton>
      <TooltipDropdownContainer
        direction={direction}
        style={{
          transform: y.to((v: unknown) => `translateY(${v}%`),
          opacity,
          pointerEvents,
          userSelect,
        }}
      >
        <TooltipDropdownContainerContent>
          {children}
        </TooltipDropdownContainerContent>
      </TooltipDropdownContainer>
    </TooltipContainer>
  );
};

const TooltipButton = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  height: 12px;
  color: rgba(0, 0, 0, 0.2);
  line-height: 12px;
  cursor: pointer;
`;

const TooltipContainer = styled.div`
  position: relative;
  height: 12px;
`;

const TooltipDropdownContainerContent = styled.div`
  padding: 10px;
`;

const TooltipDropdownContainer = animated(styled.div<{
  direction: 'left' | 'right';
}>`
  position: absolute;
  margin-top: 10px;
  z-index: 1100;
  ${(p) => `${p.direction}: 0`};
  background: white;
  min-width: 256px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  opacity: 0;
`);

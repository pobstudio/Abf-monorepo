import { FC, ReactNode, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import { FlexEnds } from '../flexs';
import { LabelAnchor, Text } from '../texts';

const PanelContainer = styled.div`
  position: relative;
`;

export const ExpandoContentContainer = styled('div')`
  margin-top: 16px;
`;

const PanelAlwaysShowContainer = styled(FlexEnds)``;

const PanelExpandoContainer = styled(animated.div)`
  position: relative;
  will-change: transform, opacity, height;
`;

const PanelExpandoAbsoluteContainer = styled.div`
  position: absolute;
  width: 100%;
`;

const PanelExpandoContent = styled.div`
  width: 100%;
`;

export interface DetailsPanelProps {
  title: string;
  children?: ReactNode;
  defaultIsExpanded?: boolean;
}

export const ExpandoGroup: FC<DetailsPanelProps> = ({
  title,
  children,
  defaultIsExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
  const [expandoContentRef, expandoContentBounds] = useMeasure();

  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: isExpanded ? expandoContentBounds.height : 0,
      opacity: isExpanded ? 1 : 0,
    },
  });

  return (
    <PanelContainer>
      <PanelAlwaysShowContainer>
        <Text>
          <strong>{title}</strong>
        </Text>
        <LabelAnchor
          style={{ cursor: 'pointer' }}
          onClick={() => setIsExpanded((s) => !s)}
        >
          {isExpanded ? 'COLLAPSE' : 'EXPAND'}
        </LabelAnchor>
      </PanelAlwaysShowContainer>
      <PanelExpandoContainer style={{ opacity, height }}>
        <PanelExpandoAbsoluteContainer ref={expandoContentRef as any}>
          <PanelExpandoContent>{children}</PanelExpandoContent>
        </PanelExpandoAbsoluteContainer>
      </PanelExpandoContainer>
    </PanelContainer>
  );
};

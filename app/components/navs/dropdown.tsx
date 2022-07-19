import { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { DropdownAnimation } from '../../constants/styles';
import { SecondaryAnchorButton } from '../inputs/button';
import { DocsDropdownLinkTree } from '../layouts/docs';
import { TutorialsDropdownLinkTree } from '../layouts/tutorials';
import {
  DropdownAnchor,
  DropdownContainer,
  DropdownContainerContent,
  DropdownExterior,
} from './common';

export const DocsDropdown: React.FC = () => {
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
    <DropdownExterior ref={clickAwayRef}>
      <DropdownAnchor onClick={() => setIsDropdownOpen(true)}>
        DOCS
      </DropdownAnchor>
      <DropdownContainer
        style={{
          transform: y.to((v: unknown) => `translateY(${v}%`),
          opacity,
          pointerEvents,
          userSelect,
        }}
      >
        <DropdownContainerContent>
          <DocsDropdownLinkTree />
          <div
            style={{
              marginTop: 14,
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          ></div>
          <JoinTheCorpsButton as="a" href={ROUTES.RECRUIT}>
            JOIN THE CORPS
          </JoinTheCorpsButton>
        </DropdownContainerContent>
      </DropdownContainer>
    </DropdownExterior>
  );
};

export const TutorialsDropdown: React.FC = () => {
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
    <DropdownExterior ref={clickAwayRef}>
      <DropdownAnchor onClick={() => setIsDropdownOpen(true)}>
        TRAIN
      </DropdownAnchor>
      <DropdownContainer
        style={{
          transform: y.to((v: unknown) => `translateY(${v}%`),
          opacity,
          pointerEvents,
          userSelect,
        }}
      >
        <DropdownContainerContent>
          <TutorialsDropdownLinkTree />
          <div
            style={{
              marginTop: 14,
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          ></div>
          <JoinTheCorpsButton as="a" href={ROUTES.RECRUIT}>
            JOIN THE CORPS
          </JoinTheCorpsButton>
        </DropdownContainerContent>
      </DropdownContainer>
    </DropdownExterior>
  );
};

export const DropdownAnchorGroupContainer = styled.div`
  > * + * {
    margin-top: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const JoinTheCorpsButton = styled(SecondaryAnchorButton)`
  margin-top: 14px;
  padding: 18px;
`;

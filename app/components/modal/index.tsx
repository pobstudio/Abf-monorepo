import { FC, useRef } from 'react';
import { animated, easings, useTransition } from 'react-spring';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { useModalStore } from '../../stores/modal';
import { CloseIcon } from '../icons/close';
import { BaseButton } from '../inputs/button';

export const BasicModal: FC = ({ children }) => {
  const isOpen = useModalStore((s) => s.isGenericModalOpen);
  const setIsOpen = useModalStore((s) => s.setIsGenericModalOpen);
  const toggleIsOpen = useModalStore((s) => s.toggleIsGenericModalOpen);
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-40px)' },
    config: {
      duration: 150,
      easing: easings.easeInOutQuart,
    },
  });
  const clickAwayRef = useRef<HTMLDivElement | null>(null);
  useClickAway(clickAwayRef, () => {
    console.log('hit');
    setIsOpen(true);
  });
  return (
    <>
      {transitions(
        (props, item) =>
          item && (
            <AnimatedModalContainer
              style={{
                opacity: props.opacity,
                display: props.opacity.to((o) => (o !== 0 ? 'flex' : 'none')),
              }}
              ref={clickAwayRef}
            >
              <AnimatedModalContentContainer style={props}>
                <ModalCloseButton
                  onClick={() => {
                    toggleIsOpen();
                  }}
                >
                  <CloseIcon />
                </ModalCloseButton>
                {children}
              </AnimatedModalContentContainer>
            </AnimatedModalContainer>
          ),
      )}
    </>
  );
};

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 1100;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  transition: all 150ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;
export const AnimatedModalContainer = animated(ModalContainer);

export const ModalCloseButton = styled(BaseButton)`
  opacity: 1;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ModalContentContainer = styled.div`
  background: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  width: 512px;
  padding: 50px;
  position: relative;
`;
export const AnimatedModalContentContainer = animated(ModalContentContainer);

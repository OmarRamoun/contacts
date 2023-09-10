import React, {useEffect, useCallback, useState} from 'react';

import styled from 'styled-components/native';

import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';
import {Icon} from '../icon';
import {TransitionContainer} from '../transition/transition-container';
import {AnimationState, FadeTransitionStyle} from '../transition/transition-shared';
import {Typography} from '../typography';

import type {ToastObject} from './toast-context';

export interface ToastProps extends ToastObject {
  onClose?: () => void;
}

const ToastOuterContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  border-radius: ${(props) => props.theme.radii.md}px;
  box-shadow: 0px 2px 4px ${(props) => props.theme.colors.boxShadow};
  margin: ${(props) => props.theme.space[1]}px auto;
`;

const StyledSubMessage = styled(Flex)`
  opacity: 0.7;
`;

const StyledClose = styled(Flex)<{hovered: boolean}>`
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.theme.space[12]}px;
  background-color: ${(props) => props.theme.colors.blackAlt};
  border-top-right-radius: ${(props) => props.theme.radii.md}px;
  border-bottom-right-radius: ${(props) => props.theme.radii.md}px;
  opacity: ${(props) => (props.hovered ? '0.7' : '1')};
`;

const Toast = ({message, subMessage, onClose, duration, backgroundColor = 'green'}: ToastProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration || 4000);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleStateChanged = useCallback(
    (newState?: AnimationState) => {
      if (newState === AnimationState.AnimatedOut && onClose) onClose();
    },
    [onClose],
  );

  return (
    <TransitionContainer transitionStyle={FadeTransitionStyle} isVisible={isVisible} onStateChange={handleStateChanged}>
      <ToastOuterContainer flexGrow={1} maxWidth="toastWidth" backgroundColor={backgroundColor}>
        <Flex p={3} flex={1}>
          <Flex>
            <Typography color="white" textStyle="h3">
              {message}
            </Typography>
          </Flex>

          {subMessage ? (
            <StyledSubMessage mt="1">
              <Typography color="white" textStyle="small">
                {subMessage}
              </Typography>
            </StyledSubMessage>
          ) : null}
        </Flex>

        {onClose ? (
          <ButtonInteraction onPress={() => setIsVisible(false)}>
            {({mouseProps, ...interactionProps}) => (
              <StyledClose {...mouseProps} {...interactionProps}>
                <Icon name="arrow-right" color="white" size="md" />
              </StyledClose>
            )}
          </ButtonInteraction>
        ) : null}
      </ToastOuterContainer>
    </TransitionContainer>
  );
};

export {Toast};

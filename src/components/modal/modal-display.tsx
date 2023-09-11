import React, {useCallback, useState, useMemo, useEffect} from 'react';
import type {LayoutChangeEvent, KeyboardEvent} from 'react-native';
import {TouchableWithoutFeedback, ScrollView, Keyboard, Dimensions} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import {Flex} from '../flex';
import {TransitionContainer} from '../transition/transition-container';
import {
  SPRING_CONFIGURATION_FAST_BOUNCE,
  FadeTransitionStyle,
  ScaleTransitionStyle,
} from '../transition/transition-shared';

import {useModalContext} from './modal-context';

interface ModalDimensions {
  width: number;
  height: number;
}

const SAFE_UNUSED_ID = -999;

const windowHeight = Dimensions.get('window').height;

const OuterWindow = styled(ScrollView)<{noPositionTop: boolean; keyboardHeight: number}>`
  position: absolute;
  display: flex;
  top: ${(props) => `${props.noPositionTop ? 0 : 40}px`};
  left: 50%;
  z-index: ${(props) => props.theme.zIndex.modal};
  max-height: ${({keyboardHeight}) =>
    `${keyboardHeight ? windowHeight - (keyboardHeight + 65) : windowHeight - 100}px`};
`;

const IndividualModalContainer = styled(Flex)<{
  hidden: boolean;
}>`
  max-width: 100%;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
`;

const Backdrop = styled(Flex)<{
  customBackgroundColour?: keyof DefaultTheme['colors'];
}>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors[props.customBackgroundColour || 'highlighted']};
`;

const getModalPosition = ({width, height}: ModalDimensions, centerVertically?: boolean) => {
  const defaultPosition = {
    transform: [
      {
        translateX: (width / 2) * -1,
      },
    ],
  };

  if (centerVertically) {
    if (windowHeight < height) return defaultPosition;

    return {
      transform: [
        {
          translateX: (width / 2) * -1,
        },
        {
          translateY: (windowHeight - height) / 2,
        },
      ],
      height,
    };
  }

  return defaultPosition;
};

export interface ModalDisplayProps {
  noPositionTop?: boolean;
}

const ModalDisplay = ({noPositionTop = false}: ModalDisplayProps) => {
  const {elements, closeAll, centerVertically} = useModalContext();

  const [modalDimensions, setModalDimensions] = useState<ModalDimensions>({
    width: 0,
    height: 0,
  });

  const lastId = useMemo(() => (elements.length ? elements[elements.length - 1].id : SAFE_UNUSED_ID), [elements]);

  const onModalLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      const {width, height} = evt.nativeEvent.layout;
      if (width === 0 || height === 0) return;

      if (width !== modalDimensions.width || height !== modalDimensions.height) {
        setModalDimensions({
          width,
          height,
        });
      }
    },
    [modalDimensions.height, modalDimensions.width],
  );

  const getBackgroundColour = useCallback(() => {
    const customBackgroundColours = elements.map((el) => el.customBackgroundColor).filter((el) => !!el);
    return customBackgroundColours.length ? customBackgroundColours[0] : undefined;
  }, [elements]);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleKeyboardShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const handleKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return (
    <TransitionContainer
      transitionStyle={FadeTransitionStyle}
      isVisible={elements.length > 0}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        bottom: 0,
      }}>
      <TouchableWithoutFeedback onPress={() => closeAll()}>
        <Backdrop customBackgroundColour={getBackgroundColour()} />
      </TouchableWithoutFeedback>

      {elements.map(({el, id, showsVerticalScrollIndicator}) => (
        <OuterWindow
          key={id}
          noPositionTop={noPositionTop}
          keyboardHeight={keyboardHeight}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
          style={getModalPosition(modalDimensions, !!centerVertically)}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
          <IndividualModalContainer onLayout={onModalLayout} hidden={id !== lastId}>
            <TransitionContainer
              transitionStyle={ScaleTransitionStyle}
              springConfig={SPRING_CONFIGURATION_FAST_BOUNCE}
              isVisible={lastId === id}
              unmountOnOut={false}>
              {el}
            </TransitionContainer>
          </IndividualModalContainer>
        </OuterWindow>
      ))}
    </TransitionContainer>
  );
};

export {ModalDisplay};

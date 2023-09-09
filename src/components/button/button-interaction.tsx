import React, {useState, useEffect, useCallback, useRef} from 'react';
import {PanResponder, Platform} from 'react-native';

import type {MouseProps} from '../box';

interface ButtonState {
  hovered: boolean;
  disabled?: boolean;
  pressed: boolean;
  mouseProps: MouseProps;
}

interface ButtonInteractionProps {
  children(state: ButtonState): React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  to?: string;
  replace?: boolean;
  back?: boolean;
}

const isWeb = Platform.OS === 'web';

const ButtonInteraction = ({children, onPress, disabled, to, replace, back}: ButtonInteractionProps) => {
  const activePressRef = useRef<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const onButtonPress = useCallback(() => {
    if (disabled) return;

    if (to) {
      onPress?.();
    } else if (onPress) {
      onPress();
    }
  }, [disabled, to, back, onPress, replace]);

  const onButtonPressDown = useCallback(() => {
    activePressRef.current = true;
    setPressed(true);
  }, []);

  const onButtonPressRelease = useCallback(() => {
    if (activePressRef.current) onButtonPress();
    setPressed(false);
  }, [onButtonPress]);

  const onButtonPressTerminate = useCallback(() => {
    activePressRef.current = false;
    setPressed(false);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: onButtonPressDown,
    onPanResponderRelease: onButtonPressRelease,
    onPanResponderTerminate: onButtonPressTerminate,
  });

  const mouseProps = {
    onMouseEnter: () => {
      if (!disabled) {
        setHovered(true);
        if (isWeb) document.body.style.cursor = 'pointer';
      }
    },
    onMouseLeave: () => {
      if (!disabled) {
        setHovered(false);
        if (isWeb) document.body.style.cursor = 'default';
      }
    },
    ...panResponder.panHandlers,
  };

  useEffect(() => {
    if (disabled) {
      setPressed(false);
      setHovered(false);
    }
  }, [disabled]);

  useEffect(
    () => () => {
      if (isWeb) document.body.style.cursor = 'default';
    },
    [],
  );

  return (
    <>
      {children({
        hovered,
        pressed,
        disabled,
        mouseProps: !onPress && !to ? {} : mouseProps,
      })}
    </>
  );
};

export {ButtonInteraction};

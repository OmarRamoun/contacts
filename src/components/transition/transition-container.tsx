import React, {useEffect, useState} from 'react';

import {awaitFrame} from '@utils/general';

import {useGenericTransition} from './transition-hook';
import type {TransitionContainerProps} from './transition-shared';
import {AnimatedBox, AnimationState} from './transition-shared';

const TransitionContainer = ({
  isVisible,
  children,
  onStateChange,
  style,
  springConfig,
  transitionStyle,
  unmountOnOut = true,
}: TransitionContainerProps) => {
  const [internalIsVisible, setInternalIsVisible] = useState<boolean>(isVisible);

  const {animatedValue, animationState} = useGenericTransition<string | number>({
    springConfig,
    ...transitionStyle.interpolation,
    state: internalIsVisible,
  });

  useEffect(() => {
    if (onStateChange) onStateChange(animationState);
  }, [animationState]);

  useEffect(() => {
    // eslint-disable-next-line
    awaitFrame().then(() => {
      setInternalIsVisible(!!isVisible);
    });
  }, [isVisible]);

  if (animationState === AnimationState.AnimatedOut && unmountOnOut) return null;

  return (
    <AnimatedBox
      style={{
        ...style,
        ...transitionStyle.style(animatedValue),
      }}
      pointerEvents={animationState === AnimationState.AnimatingOut ? 'none' : 'auto'}>
      {children}
    </AnimatedBox>
  );
};

export {TransitionContainer};

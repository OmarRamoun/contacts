import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Animated} from 'react-native';

import {AnimationState, TIMING_CONFIGURATION_FAST} from './transition-shared';

export interface TransitionHookProps<T> {
  from: T;
  to: T;
  springConfig?: {tension: number; friction: number};
  timingConfig?: {duration: number; delay?: number};
  state: boolean;
}

const useGenericTransition = <T extends string | number>({
  springConfig,
  timingConfig = TIMING_CONFIGURATION_FAST,
  from,
  to,
  state,
}: TransitionHookProps<T>) => {
  const animatedValue = useRef<Animated.Value>(new Animated.Value(0));

  const [activeState, setActiveState] = useState<AnimationState | undefined>();

  const onRest = useCallback(() => {
    setActiveState(state ? AnimationState.AnimatedIn : AnimationState.AnimatedOut);
  }, [state]);

  const onStart = useCallback(() => {
    setActiveState(state ? AnimationState.AnimatingIn : AnimationState.AnimatingOut);
  }, [state]);

  useEffect(() => {
    if (springConfig) {
      Animated.spring(animatedValue.current, {
        toValue: state ? 1 : 0,
        ...springConfig,
        useNativeDriver: false,
      }).start(onRest);
    } else {
      Animated.timing(animatedValue.current, {
        toValue: state ? 1 : 0,
        ...timingConfig,
        useNativeDriver: false,
      }).start(onRest);
    }

    onStart();
  }, [state]);

  return {
    animatedValue: animatedValue.current.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to] as number[] | string[],
    }),
    animationState: activeState,
  };
};

export {useGenericTransition};

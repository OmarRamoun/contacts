import type React from 'react';
import {Animated} from 'react-native';

enum AnimationState {
  AnimatingIn = 'AnimatingIn',
  AnimatedIn = 'AnimatedIn',
  AnimatingOut = 'AnimatingOut',
  AnimatedOut = 'AnimatedOut',
}

const SPRING_CONFIGURATION_SLOW_NOBOUNCE = {
  tension: 50,
  friction: 10,
};

const SPRING_CONFIGURATION_FAST_BOUNCE = {
  tension: 100,
  friction: 10,
};

const SPRING_CONFIGURATION_FAST_NOBOUNCE = {
  tension: 50,
  friction: 5,
};

const TIMING_CONFIGURATION_FAST = {
  duration: 250,
};

const TIMING_CONFIGURATION_SLOW = {
  duration: 500,
};

const AnimatedBox = Animated.View;

interface TransitionStyle<T extends string | number> {
  interpolation: {from: T; to: T};
  style: (animatedValue: Animated.AnimatedInterpolation<string | number>) => any;
}

const ScaleTransitionStyle: TransitionStyle<number> = {
  interpolation: {
    from: 0,
    to: 1,
  },
  style: (animatedValue: Animated.AnimatedInterpolation<string | number>) => ({
    transform: [{scale: animatedValue}],
  }),
};

const FadeTransitionStyle: TransitionStyle<number> = {
  interpolation: {
    from: 0,
    to: 1,
  },
  style: (animatedValue: Animated.AnimatedInterpolation<string | number>) => ({
    opacity: animatedValue,
  }),
};

export interface GenericTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  onStateChange?: (state?: AnimationState) => void;
  style?: Record<string, any>;
  springConfig?: {tension: number; friction: number};
}

export interface TransitionContainerProps extends GenericTransitionProps {
  transitionStyle: TransitionStyle<string | number>;
  unmountOnOut?: boolean;
}

export {
  AnimatedBox,
  AnimationState,
  FadeTransitionStyle,
  ScaleTransitionStyle,
  SPRING_CONFIGURATION_SLOW_NOBOUNCE,
  SPRING_CONFIGURATION_FAST_BOUNCE,
  SPRING_CONFIGURATION_FAST_NOBOUNCE,
  TIMING_CONFIGURATION_FAST,
  TIMING_CONFIGURATION_SLOW,
};

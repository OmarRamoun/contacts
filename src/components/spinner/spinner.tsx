import {useState, useEffect} from 'react';

import {Animated, Easing} from 'react-native';
import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import {Icon} from '../icon';

type SpinnerSizes = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  duration?: number;
  size?: SpinnerSizes;
  color?: keyof DefaultTheme['colors'];
  isForPDF?: boolean;
}

const sizeMap: {[key: string]: number} = {
  sm: 15,
  md: 25,
  lg: 40,
};

const IconContainer = styled(Animated.View)<{size: SpinnerSizes}>`
  width: ${(props) => sizeMap[props.size]}px;
  height: ${(props) => sizeMap[props.size]}px;
`;

const Spinner = ({isForPDF, duration = isForPDF ? 100 : 500, size = 'md', color = 'black'}: LoadingSpinnerProps) => {
  const [spinAnim] = useState(new Animated.Value(0));

  const rotationAngle = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: isForPDF ? ['0deg', '6000000deg'] : ['0deg', '360deg'],
  });

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: isForPDF ? 30000000 : 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    startAnimation();
  }, [duration, spinAnim]);

  return (
    <IconContainer size={size} style={{transform: [{rotate: rotationAngle}]}}>
      <Icon name="heart" size={size} color={color} />
    </IconContainer>
  );
};

export {Spinner};

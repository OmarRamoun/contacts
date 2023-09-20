// TODO: Implement using the new Pressable component from https://reactnative.dev/docs/pressable

import React from 'react';
import {Pressable as RNP} from 'react-native';
import type {ViewStyle} from 'react-native';

import {Box} from './box';
import type {BoxProps} from './box';
import {Typography} from './typography';

interface PressableProps extends BoxProps {
  to?: string;
  onPress?: () => void;
  children: React.ReactNode;
  onPressStyles?: ViewStyle;
}

const Pressable = ({onPress, children, onPressStyles, ...props}: PressableProps) => (
  <RNP onPress={onPress}>
    {({pressed}) => (
      <Box
        bg={pressed ? 'transBlack' : 'transparent'}
        borderRadius="md"
        justifyContent="space-between"
        p={2}
        mb={2}
        style={pressed ? onPressStyles : {}}
        {...props}>
        {typeof children === 'string' ? (
          <Typography textStyle="small" color="darkBlue">
            {children}
          </Typography>
        ) : (
          children
        )}
      </Box>
    )}
  </RNP>
);

export {Pressable};

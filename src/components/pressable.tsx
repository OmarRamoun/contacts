// TODO: Implement using the new Pressable component from https://reactnative.dev/docs/pressable

import React from 'react';
import type {ViewStyle} from 'react-native';

import {Box} from './box';
import type {BoxProps} from './box';
import {ButtonInteraction} from './button/button-interaction';
import {Typography} from './typography';

interface PressableProps extends BoxProps {
  to?: string;
  onPress?: () => void;
  children: React.ReactNode;
  onPressStyles?: ViewStyle;
}

const Pressable = ({onPress, to, children, onPressStyles, ...props}: PressableProps) => (
  <ButtonInteraction onPress={onPress} to={to}>
    {({mouseProps, pressed, ...interactionProps}) => (
      <Box
        bg={pressed ? 'transBlack' : 'transparent'}
        borderRadius="md"
        justifyContent="space-between"
        p={2}
        mb={2}
        style={pressed ? onPressStyles : {}}
        {...props}
        {...mouseProps}
        {...interactionProps}>
        {typeof children === 'string' ? (
          <Typography textStyle="small" color="darkBlue">
            {children}
          </Typography>
        ) : (
          children
        )}
      </Box>
    )}
  </ButtonInteraction>
);

export {Pressable};

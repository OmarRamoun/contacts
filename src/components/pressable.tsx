// TODO: Implement using the new Pressable component from https://reactnative.dev/docs/pressable
import React from 'react';

import {Box} from './box';
import {ButtonInteraction} from './button/button-interaction';
import {Typography} from './typography';

interface PressableProps {
  to?: string;
  onPress?: () => void;
  children: React.ReactNode;
}

const Pressable = ({onPress, to, children}: PressableProps) => (
  <ButtonInteraction onPress={onPress} to={to}>
    {({mouseProps, pressed, ...interactionProps}) => (
      <Box
        bg={pressed ? 'lightBlue1' : 'transparent'}
        borderRadius="md"
        justifyContent="space-between"
        p={2}
        mb={2}
        {...mouseProps}
        {...interactionProps}>
        <Typography textStyle="small" color="darkBlue">
          {children}
        </Typography>
      </Box>
    )}
  </ButtonInteraction>
);

export {Pressable};

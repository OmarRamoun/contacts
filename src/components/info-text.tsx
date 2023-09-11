import React from 'react';

import {theme} from '@styles';

import {ButtonInteraction} from './button/button-interaction';
import {Typography} from './typography';

interface InfoTextProps {
  text: string;
  underline?: boolean;
  onPress?: () => void;
}

const InfoText = ({text, underline, onPress}: InfoTextProps) => (
  <ButtonInteraction onPress={onPress}>
    {({mouseProps, hovered, ...interactionProps}) => (
      <Typography
        textStyle="extraSmall"
        color={hovered ? 'darkGrey' : 'inactiveGrey'}
        style={
          underline && {
            borderBottomWidth: 0.5,
            borderBottomColor: hovered ? theme.colors.darkGrey : theme.colors.inactiveGrey,
          }
        }
        {...mouseProps}
        {...interactionProps}>
        {text}
      </Typography>
    )}
  </ButtonInteraction>
);

export {InfoText};

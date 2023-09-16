import React from 'react';

import styled from 'styled-components/native';

import {theme} from '@styles';

import {ButtonInteraction} from './button/button-interaction';
import type {FlexProps} from './flex';
import {Flex} from './flex';
import type {IconList} from './icon';
import {Icon} from './icon';

interface BoxActionProps extends FlexProps {
  onPress: () => void;
  icon?: IconList;
  alt?: boolean;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
}

const getIconColor = (hovered: boolean, pressed: boolean, alt: boolean) => {
  if (alt) return hovered || pressed ? 'grey' : 'darkBlue';
  return hovered || pressed ? 'white' : theme.primaryColor.default;
};

const getActionBackgroundColor = (hovered: boolean, pressed: boolean, alt: boolean) => {
  if (alt) return 'white';
  return hovered || pressed ? theme.primaryColor.default : 'grey';
};

const ActionContainer = styled(Flex)<{
  hovered: boolean;
  pressed: boolean;
  alt: boolean;
}>`
  background-color: ${(props) => props.theme.colors[getActionBackgroundColor(props.hovered, props.pressed, props.alt)]};
`;

const BoxAction = ({onPress, icon = 'plus', alt, width, height, disabled = false, ...props}: BoxActionProps) => (
  <ButtonInteraction onPress={!disabled ? onPress : undefined}>
    {({mouseProps, hovered, pressed}) => (
      <ActionContainer
        alignItems="center"
        justifyContent="center"
        width={width}
        height={height}
        hovered={hovered}
        pressed={pressed}
        alt={!!alt}
        {...mouseProps}
        {...props}>
        <Icon name={icon} color={getIconColor(hovered, pressed, !!alt)} />
      </ActionContainer>
    )}
  </ButtonInteraction>
);

export {BoxAction};

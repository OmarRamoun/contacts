import React from 'react';

import styled from 'styled-components/native';

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

const getIconColor = (hovered: boolean, alt: boolean) => {
  if (alt) return hovered ? 'grey' : 'darkBlue';
  return hovered ? 'white' : 'darkBlue';
};

const getActionBackgroundColor = (hovered: boolean, alt: boolean) => {
  if (alt) return 'white';
  return hovered ? 'darkBlue' : 'grey';
};

const ActionContainer = styled(Flex)<{
  hovered: boolean;
  pressed: boolean;
  alt: boolean;
}>`
  background-color: ${(props) => props.theme.colors[getActionBackgroundColor(props.hovered, props.alt)]};
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
        <Icon name={icon} color={getIconColor(hovered, !!alt)} />
      </ActionContainer>
    )}
  </ButtonInteraction>
);

export {BoxAction};

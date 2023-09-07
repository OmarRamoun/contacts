import React from 'react';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {SpaceProps, ColorProps} from 'styled-system';
import {margin, color, padding} from 'styled-system';

import {Flex} from '../flex';
import type {IconList} from '../icon';
import {Icon} from '../icon';
import type {TypographyStyleProps} from '../typography';

import {renderChild} from './button-content';
import {ButtonInteraction} from './button-interaction';
import type {ButtonProps} from './button-shared';
import {textStyleMap} from './button-shared';

type ColorList = keyof DefaultTheme['colors'];

interface ButtonXlProps extends Omit<ButtonProps, 'underline'> {
  children: string | React.ReactNode;
  onPress?: () => void;
  icon: IconList;
  color?: ColorList;
  disabled?: boolean;
}

const OuterContainer = styled(Flex)<SpaceProps & ColorProps & {hovered: boolean; disabled?: boolean}>`
  ${margin}
  ${color}
  background-color: ${(props) =>
    props.hovered && !props.disabled ? props.theme.colors.grey : props.theme.colors.lightGrey1};
  border-radius: ${(props) => props.theme.radii.md}px;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const IconContainer = styled(Flex)<ColorProps>`
  ${color}
  ${padding}
`;

const TextContent = styled(Flex)`
  ${padding}
`;

const ButtonXl = ({children, onPress, icon, color: buttonColor, disabled, ...props}: ButtonXlProps) => {
  const textOptions: TypographyStyleProps = {
    textStyle: textStyleMap.lg,
    color: 'darkBlue',
  };

  return (
    <ButtonInteraction onPress={onPress} disabled={disabled}>
      {({mouseProps, ...interactionProps}) => (
        <OuterContainer
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="row"
          {...mouseProps}
          {...interactionProps}
          {...props}>
          <IconContainer backgroundColor={buttonColor || 'blue'} p={4}>
            <Icon color="white" name={icon} size="lg" />
          </IconContainer>
          <TextContent p={4}>{renderChild(children, textOptions)}</TextContent>
        </OuterContainer>
      )}
    </ButtonInteraction>
  );
};

export {ButtonXl};

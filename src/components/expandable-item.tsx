import type {ReactElement} from 'react';
import React, {useState} from 'react';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {MarginProps} from 'styled-system';

import {ButtonInteraction} from './button/button-interaction';
import {Flex} from './flex';
import {Icon} from './icon';
import {useGenericTransition} from './transition/transition-hook';
import {AnimatedBox} from './transition/transition-shared';
import {Typography} from './typography';

const StyledContainer = styled(Flex)<{hovered: boolean; borderRadius?: number; showSideBorder?: boolean}>`
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-right-width: ${(props) => (props.showSideBorder ? '1px' : '0')};
  border-left-width: ${(props) => (props.showSideBorder ? '1px' : '0')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)}px;
  border-color: ${(props) => props.theme.colors.grey};
  overflow: hidden;
  opacity: ${(props) => (props.hovered ? '0.7' : '1')};
`;

const RotateIcon = styled(AnimatedBox)`
  height: 25px;
  width: 25px;
`;

export const ExpandableItem = ({
  onPress,
  textProps,
  children,
  showSideBorder,
  borderRadius,
  overrideMargin,
}: {
  onPress: () => void;
  children: ReactElement;
  showSideBorder?: boolean;
  borderRadius?: number;
  overrideMargin?: {[key in keyof MarginProps]: number};
  textProps: {
    text: string;
    color?: keyof DefaultTheme['colors'];
    textStyle?: keyof DefaultTheme['textStyles'];
  };
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const {animatedValue: animatedTransformAngle} = useGenericTransition({
    from: '90deg',
    to: '-90deg',
    state: expanded,
  });

  return (
    <>
      <ButtonInteraction
        onPress={() => {
          setExpanded(!expanded);
          onPress();
        }}>
        {({mouseProps, ...interactionProps}) => (
          <StyledContainer
            showSideBorder={showSideBorder}
            borderRadius={borderRadius}
            bg="white"
            p={4}
            flexDirection="row"
            {...overrideMargin}
            {...mouseProps}
            {...interactionProps}>
            <Flex flex={1} justifyContent="center">
              <Typography textStyle={textProps.textStyle} color={textProps.color || 'black'}>
                {textProps.text}
              </Typography>
            </Flex>

            <Flex flex={1} justifyContent="center">
              <Flex flexDirection="row" justifyContent="flex-end">
                <RotateIcon style={{transform: [{rotate: animatedTransformAngle}]}}>
                  <Icon size="md" name="plus" color="black" />
                </RotateIcon>
              </Flex>
            </Flex>
          </StyledContainer>
        )}
      </ButtonInteraction>

      {expanded ? children : null}
    </>
  );
};

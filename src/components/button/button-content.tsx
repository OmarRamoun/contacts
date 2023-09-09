import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {TLengthStyledSystem} from 'styled-system';
import {border, layout, margin, opacity, padding} from 'styled-system';

import {theme} from '@styles';

import {Box} from '../box';
import {Flex} from '../flex';
import {Icon} from '../icon';
import {Line} from '../line';
import {Spinner} from '../spinner/spinner';
import type {TypographyStyleProps} from '../typography';
import {Typography} from '../typography';

import type {
  ButtonContentProps,
  ButtonInteractionInheritProps,
  ButtonSizes,
  ButtonStyleObject,
  ButtonTypes,
  ButtonViewProps,
} from './button-shared';
import {
  buttonHeightMap,
  buttonHoverTypes,
  buttonPaddingMap,
  buttonTypes,
  disabledButtonTypes,
  textStyleMap,
} from './button-shared';
import {getContainerPadding} from './button-utils';

const ButtonContainer = styled(Animated.View)<
  ButtonViewProps & {
    depth?: number;
    heightAttach: number;
    paddingKey: keyof DefaultTheme['button'];
    backgroundColorKey: keyof DefaultTheme['colors'];
    flexDirection?: ButtonContentProps['flexDirection'];
    iconLeft: boolean;
    overrideHorizontalPadding?: number;
    overrideVerticalPadding?: number;
    definedBorderColor?: keyof DefaultTheme['colors'];
    type?: number | string | TLengthStyledSystem;
    hovered: boolean;
    pressed: boolean;
  }
>`
  ${border}
  ${margin}
  ${padding}
  ${layout}
  ${opacity}
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align};
  flex-direction: ${(props) => (props.flexDirection || props.iconLeft ? 'row-reverse' : 'row')};
  background-color: ${(props) => props.theme.colors[props.backgroundColorKey]};
  border-radius: ${(props) => props.theme.radii.md}px;
  border-color: ${(props) =>
    props.definedBorderColor ? props.theme.colors[props.definedBorderColor] : props.theme.colors.clear};
  height: ${(props) => props.heightAttach}px;
  padding: ${(props) => getContainerPadding(props)}px 0;
  bottom: -${(props) => props.depth || 0}px;
  text-decoration: none;
  border-width: ${(props) => (props.definedBorderColor ? 2 : 0)}px;
`;

const IconContainer = styled(Box)<{
  flexDirection?: ButtonContentProps['flexDirection'];
}>`
  margin-left: ${(props) => (props.flexDirection === 'row-reverse' ? 0 : props.theme.button.iconMargin)}px;
  margin-right: ${(props) => (props.flexDirection === 'row-reverse' ? props.theme.button.iconMargin : 0)}px;
`;

const LoadingBox = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.radii.md}px;
`;

const ButtonShadowBox = styled(Flex)<{
  depth: number;
  backgroundColorKey?: keyof DefaultTheme['colors'];
  overrideVerticalPadding: number;
}>`
  position: absolute;
  background-color: ${(props) => props.theme.colors[props.backgroundColorKey || 'clear']};
  height: ${(props) => props.depth + props.theme.button.buttonLiftHeight - props.overrideVerticalPadding}px;
  bottom: 0px;
  width: 100%;
  border-radius: ${(props) => props.theme.radii.md}px;
`;

const renderChild = (child: React.ReactNode, textOptions: TypographyStyleProps) => {
  if (typeof child === 'string' || typeof child === 'number') {
    return (
      <Typography key={child} {...textOptions}>
        {child}
      </Typography>
    );
  }

  return child;
};

const getPadding = (size: ButtonSizes, type: ButtonTypes) => {
  if (type === 'tertiary' || type === 'tertiaryDestructive' || type === 'tertiaryDark') {
    return 'buttonPaddingTertiary';
  }

  return buttonPaddingMap[size];
};

const getButtonHeight = (heightKey: keyof DefaultTheme['sizes'], depth?: number, type?: ButtonTypes) => {
  if (type && type === 'close') return 32;
  return (theme.sizes[heightKey] as number) - (depth || 0);
};

const ButtonContent = ({
  children,
  hovered,
  pressed,
  buttonSize = 'md',
  type = 'primary',
  depth = 0,
  underline = false,
  icon,
  iconColor,
  overrideTextColor,
  overrideBackgroundColor,
  overrideTextStyle,
  disabled = false,
  loading = false,
  align = 'center',
  onDarkBackground,
  flexDirection,
  iconLeft = false,
  overrideHorizontalPadding,
  overrideVerticalPadding,
  iconSizeOverride,
  definedBorderColor,
  ...props
}: ButtonContentProps & ButtonInteractionInheritProps) => {
  const [borderValueAnim] = useState(new Animated.Value(0));

  const depthValue = borderValueAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-depth, 0],
  });

  useEffect(() => {
    Animated.timing(borderValueAnim, {
      toValue: pressed ? 1 : 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [pressed, borderValueAnim]);

  const {
    textColor,
    alternateColor,
    backgroundColor,
    opacity: buttonOpacity,
    shouldLift = true,
    ...styleProps
  }: ButtonStyleObject = {
    ...(disabled ? disabledButtonTypes[type] : buttonTypes[type]),
    ...(hovered && !(disabled || loading) ? buttonHoverTypes[type] : {}),
  };

  const textOptions = {
    textStyle: overrideTextStyle || textStyleMap[buttonSize],
    color: overrideTextColor || textColor,
  };

  return (
    <Flex flexDirection="column">
      <Flex {...props} style={{paddingBottom: shouldLift ? depth : 0}}>
        <ButtonContainer
          buttonSize={buttonSize}
          type={type}
          hovered={hovered}
          pressed={pressed}
          align={align}
          paddingKey={getPadding(buttonSize, type)}
          depth={depth}
          flexDirection={flexDirection}
          heightAttach={getButtonHeight(buttonHeightMap[buttonSize], depth, type)}
          backgroundColorKey={overrideBackgroundColor || backgroundColor || 'clear'}
          definedBorderColor={definedBorderColor}
          iconLeft={iconLeft}
          overrideHorizontalPadding={overrideHorizontalPadding}
          overrideVerticalPadding={overrideVerticalPadding}
          style={{
            transform: [{translateY: depthValue}],
            opacity: buttonOpacity || 1,
          }}
          {...styleProps}>
          {React.Children.toArray(children).map((child) => renderChild(child, textOptions))}

          {/* eslint-disable-next-line */}
          {icon ? (
            children ? (
              <IconContainer flexDirection={flexDirection} pr={iconLeft ? '3' : '0'} pl="1">
                <Icon
                  size={iconLeft ? 'sm' : iconSizeOverride || buttonSize}
                  name={icon}
                  color={iconColor || textColor}
                />
              </IconContainer>
            ) : (
              <Flex pl="1px" pb="2px">
                <Icon
                  size={iconLeft ? 'sm' : iconSizeOverride || buttonSize}
                  name={icon}
                  color={iconColor || textColor}
                />
              </Flex>
            )
          ) : null}

          {loading ? (
            <LoadingBox backgroundColor={overrideBackgroundColor || backgroundColor}>
              <Spinner size={buttonSize} color={textColor} />
            </LoadingBox>
          ) : null}
        </ButtonContainer>

        {depth && depth > 0 ? (
          <ButtonShadowBox
            overrideVerticalPadding={overrideVerticalPadding || 0}
            depth={depth}
            backgroundColorKey={alternateColor}
          />
        ) : null}
      </Flex>

      {underline ? <Line size="md" top={-5} colorOverride={onDarkBackground ? 'passThroughGrey' : undefined} /> : null}
    </Flex>
  );
};

export {ButtonContent, renderChild};

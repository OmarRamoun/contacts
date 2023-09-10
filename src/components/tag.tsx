import React from 'react';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {MarginProps} from 'styled-system';

import {theme} from '@styles';

import {ButtonInteraction} from './button/button-interaction';
import {Flex} from './flex';
import type {IconList} from './icon';
import {Icon} from './icon';
import {TouchableOpacity} from './touchable-opacity';
import {Typography} from './typography';

type TagSizes = 'sm' | 'md' | 'lg';
type TagHeights = 'tagHeight' | 'tagHeightMedium' | 'tagHeightLarge';

export interface TagObject {
  id: number;
  onIconPress?: () => void;
  onPress?: () => void;
  label: string;
  subtitle?: string;
  icon?: IconList;
  alt?: boolean;
  size?: TagSizes;
  avatarImage?: string | null;
  overrideBackgroundColor?: keyof DefaultTheme['colors'];
  customColor?: string;
  counter?: string | number;
}

interface TagProps extends Omit<TagObject, 'id'>, MarginProps {
  bordered?: boolean;
  borderColor?: string;
}

const sizeMap: {[key: string]: TagHeights} = {
  sm: 'tagHeight',
  md: 'tagHeightMedium',
  lg: 'tagHeightLarge',
};

const textStylesMap: {[key: string]: keyof DefaultTheme['textStyles']} = {
  sm: 'extraSmall',
  md: 'extraSmall',
  lg: 'small',
};

const getPaddingLeft = (key: TagHeights, hasAvatar: boolean) => {
  if (hasAvatar) return 5;
  if (key === 'tagHeight') return 10;
  if (key === 'tagHeightMedium') return 12;
  return 14;
};

const getPaddingRight = (key: TagHeights, hasIcon: boolean) => {
  if (hasIcon) return 5;
  if (key === 'tagHeight') return 10;
  if (key === 'tagHeightMedium') return 12;
  return 14;
};

const getBackgroundColor = (args: {
  colors: DefaultTheme['colors'];
  alt: boolean;
  override?: keyof DefaultTheme['colors'];
  customColor?: string;
}) => {
  const {colors, alt, override, customColor} = args;

  if (override) return colors[override];
  if (customColor) return customColor;
  if (alt) return colors.grey;
  return theme.primaryColor.default;
};

const StyledTagContainer = styled(Flex)<{
  alt: boolean;
  sizeKey: TagHeights;
  hasIcon: boolean;
  hasAvatar: boolean;
  overrideBackgroundColor?: keyof DefaultTheme['colors'];
  customColor?: string;
  bordered?: boolean;
  borderColor?: string;
}>`
  position: relative;
  background-color: ${(props) =>
    getBackgroundColor({
      colors: props.theme.colors,
      alt: props.alt,
      override: props.overrideBackgroundColor,
      customColor: props.customColor,
    })}
  height: ${(props) => props.theme.sizes[props.sizeKey]}px;
  border-radius: ${(props) => props.theme.sizes[props.sizeKey] / 2}px;
  padding-left: ${(props) => getPaddingLeft(props.sizeKey, props.hasAvatar)}px;
  padding-right: ${(props) => getPaddingRight(props.sizeKey, props.hasIcon)}px;
  ${(props) => props.bordered && `border-width: 2px; border-color: ${props.borderColor};`}
`;

const StyledIconFlex = styled(Flex)<{
  hovered: boolean;
}>`
  margin-left: 4px;
  opacity: ${(props) => (props.hovered ? 0.5 : 1)};
`;

const StyledCounter = styled(Flex)`
  position: absolute;

  align-items: center;
  justify-content: center;

  top: ${(props) => -(props.theme.sizes.tagCounter / 2)}px;
  right: ${(props) => -(props.theme.sizes.tagCounter / 3)}px;

  width: ${(props) => props.theme.sizes.tagCounter}px;
  height: ${(props) => props.theme.sizes.tagCounter}px;
  border-radius: ${(props) => props.theme.sizes.tagCounter}px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.lightGrey1};
  background-color: ${(props) => props.theme.primaryColor.default};
`;

const Tag = ({
  onIconPress,
  onPress,
  label,
  subtitle,
  icon,
  alt = false,
  size = 'sm',
  avatarImage,
  overrideBackgroundColor,
  counter,
  ...props
}: TagProps) => {
  const inferredSize = avatarImage ? 'lg' : size;
  const textColor: keyof DefaultTheme['colors'] = alt && !props.customColor ? 'darkBlue' : 'white';
  const textStyle = textStylesMap[inferredSize];

  return (
    <TouchableOpacity onPress={onPress}>
      <StyledTagContainer
        hasIcon={!!icon}
        hasAvatar={!!avatarImage}
        alt={alt}
        overrideBackgroundColor={overrideBackgroundColor}
        sizeKey={sizeMap[inferredSize]}
        flexDirection="row"
        alignItems="center"
        {...props}>
        <Flex flexDirection="column" justifyContent="center">
          <Typography textAlign="center" textStyle={textStyle} color={textColor}>
            {label}
          </Typography>
          {!subtitle ? null : (
            <Typography textStyle="extraSmall" color={theme.primaryColor.dark}>
              {subtitle}
            </Typography>
          )}
        </Flex>

        {icon ? (
          <ButtonInteraction onPress={onIconPress} disabled={!onIconPress}>
            {({mouseProps, hovered}) => (
              <StyledIconFlex hovered={hovered} {...mouseProps}>
                <Icon name={icon} color={textColor} size={inferredSize === 'sm' ? 'sm' : 'md'} />
              </StyledIconFlex>
            )}
          </ButtonInteraction>
        ) : null}

        {counter ? (
          <StyledCounter>
            <Typography color="white" textStyle="extraSmall">
              {counter}
            </Typography>
          </StyledCounter>
        ) : null}
      </StyledTagContainer>
    </TouchableOpacity>
  );
};

export {Tag};

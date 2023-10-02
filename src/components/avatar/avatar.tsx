import React, {useState} from 'react';
import {ImageBackground} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {ColorProps} from 'styled-system';
import {color} from 'styled-system';

import {theme} from '@styles';

import {Box} from '../box';
import type {FlexProps} from '../flex';
import {Flex} from '../flex';
import type {IconList} from '../icon';
import {Icon} from '../icon';
import {Typography} from '../typography';

type avatarSizes =
  | 'avatarSizeSmall'
  | 'avatarSizeMedium'
  | 'avatarSizeMediumLarge'
  | 'avatarSizeLarge'
  | 'avatarSizeXLarge';

interface MouseProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

type AvatarSizes = 'sm' | 'md' | 'mdlg' | 'lg' | 'xlg';

interface AvatarViewProps {
  editable?: boolean;
  borderWidth?: number;
}

interface AvatarProps extends MouseProps, FlexProps, AvatarViewProps {
  style?: any;
  size?: AvatarSizes | number;
  image?: string | null;
  backgroundColor?: keyof DefaultTheme['colors'];
  borderColor?: keyof DefaultTheme['colors'];
  icon?: IconList;
  iconColor?: keyof DefaultTheme['colors'];
  iconSize?: keyof DefaultTheme['sizes'];
  containImage?: boolean;
  initials?: string;
  imageOpacity?: number;
}

const avatarSizeMap: {
  [key: string]: avatarSizes;
} = {
  sm: 'avatarSizeSmall',
  md: 'avatarSizeMedium',
  mdlg: 'avatarSizeMediumLarge',
  lg: 'avatarSizeLarge',
  xlg: 'avatarSizeXLarge',
};

const AvatarView = styled(Flex)<
  MouseProps &
    FlexProps &
    AvatarViewProps &
    ColorProps & {
      size: number;
      borderColorKey?: keyof DefaultTheme['colors'];
    }
>`
  ${color}
  overflow: hidden;
  border-radius: ${(props) => props.size / 2}px;
  border-width: ${(props) => (props.borderColorKey ? props.borderWidth ?? 2 : 0)}px;
  border-color: ${(props) => (props.borderColorKey ? props.theme.colors[props.borderColorKey] : 'white')};
`;

const iconSizeMap = {
  sm: 'sm',
  md: 'md',
  mdlg: 'lg',
  lg: 'xlg',
  xlg: 'xxlg',
};

const Avatar = ({
  size = 'md',
  editable = false,
  iconColor = 'white',
  iconSize,
  image,
  backgroundColor,
  borderColor,
  borderWidth,
  icon,
  containImage,
  initials,
  imageOpacity,
  ...props
}: AvatarProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <AvatarView
      {...props}
      size={typeof size === 'number' ? size : theme.sizes[avatarSizeMap[size]]}
      height={typeof size === 'number' ? `${size}px` : `${theme.sizes[avatarSizeMap[size]]}px`}
      width={typeof size === 'number' ? `${size}px` : `${theme.sizes[avatarSizeMap[size]]}px`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      editable={editable}
      justifyContent="center"
      alignItems="center"
      backgroundColor={backgroundColor || 'grey'}
      borderColorKey={borderColor}
      borderWidth={borderWidth}>
      {image ? (
        <ImageBackground
          source={{uri: image}}
          resizeMode={containImage ? 'contain' : 'cover'}
          style={{width: '100%', height: '100%', opacity: imageOpacity}}
        />
      ) : null}

      {
        // eslint-disable-next-line
        !image ? (
          initials ? (
            <Typography
              textStyle={size === 'mdlg' || size === 'lg' || size === 'xlg' ? 'h1' : 'h3'}
              color="primaryDark"
              style={{opacity: 0.4}}>
              {initials.toUpperCase()}
            </Typography>
          ) : (
            <Icon
              name={icon || 'user-profile'}
              color={iconColor}
              size={iconSize || (typeof size === 'number' ? Math.round((size / 5) * 0.7) : iconSizeMap[size])}
            />
          )
        ) : null
      }

      {editable && (
        <Box
          backgroundColor={hovered ? 'highlightedActive' : 'highlighted'}
          width="100%"
          py={size === 'sm' || (typeof size === 'number' && size < 30) ? 1 : 2}
          style={{position: 'absolute', bottom: 0, left: 0}}>
          <Typography textStyle="small" textAlign="center">
            Edit
          </Typography>
        </Box>
      )}
    </AvatarView>
  );
};

export {Avatar};

import type {ReactNode} from 'react';
import {View} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {
  MarginProps,
  LayoutProps,
  BackgroundProps,
  ColorProps,
  PaddingProps,
  BorderProps,
  BorderColorProps,
  FlexboxProps,
  PositionProps,
} from 'styled-system';
import {layout, background, color, margin, padding, border, borderColor, flexbox, position} from 'styled-system';

export interface MouseProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

export interface BoxProps
  extends MarginProps,
    LayoutProps,
    ColorProps,
    BackgroundProps,
    BorderColorProps,
    PaddingProps,
    BorderProps,
    FlexboxProps,
    PositionProps,
    MouseProps {
  children?: ReactNode;
  backgroundColor?: keyof DefaultTheme['colors'] | string;
  color?: keyof DefaultTheme['colors'];
}

const Box = styled(View)<BoxProps>`
  ${layout}
  ${margin}
  ${color}
  ${padding}
  ${background}
  ${border}
  ${borderColor}
  ${flexbox}
  ${position}
`;

export {Box};

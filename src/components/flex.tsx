import type {ReactNode} from 'react';

import {View} from 'react-native';
import styled from 'styled-components/native';
import type {BackgroundProps, ColorProps, FlexboxProps, LayoutProps, MarginProps, PaddingProps} from 'styled-system';
import {background, color, flexbox, layout, margin, padding} from 'styled-system';

export interface FlexProps
  extends FlexboxProps,
    MarginProps,
    ColorProps,
    LayoutProps,
    PaddingProps,
    BackgroundProps,
    MarginProps {
  children?: ReactNode;
}

const Flex = styled(View)<FlexProps>`
  ${layout}
  ${margin}
    ${flexbox}
    ${padding}
    ${color}
    ${background}
`;

export {Flex};

import React from 'react';
import {Text} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {TypographyProps, LayoutProps} from 'styled-system';
import {typography, color, layout, textStyle} from 'styled-system';

export interface TypographyStyleProps {
  textStyle?: keyof DefaultTheme['textStyles'];
  color?: keyof DefaultTheme['colors'] | string;
}

const Typography = styled(Text)<TypographyProps & LayoutProps & TypographyStyleProps>`
  ${typography};
  ${layout};
  ${textStyle};
  ${color};
`;

Typography.defaultProps = {
  textStyle: 'body',
  color: 'black',
};

export {Typography};

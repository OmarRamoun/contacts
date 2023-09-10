import {Text} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {LayoutProps, TypographyProps} from 'styled-system';
import {color, layout, textStyle, typography} from 'styled-system';

import {theme} from '@styles';

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
  color: theme.primaryColor.default,
};

export {Typography};

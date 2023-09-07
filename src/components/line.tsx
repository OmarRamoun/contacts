import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {PositionProps} from 'styled-system';
import {position} from 'styled-system';

import {Flex} from './flex';

type LineSizes = 'xsm' | 'sm' | 'md' | 'lg';

export const sizeMap: {[key: string]: number} = {sm: 1, md: 3, lg: 5};

export const Line = styled(Flex)<
  PositionProps & {
    size?: LineSizes;
    vertical?: boolean;
    colorOverride?: keyof DefaultTheme['colors'];
  }
>`
  position: relative;
  ${position}
  align-self: stretch;
  width: ${(props) => (!props.vertical ? 'auto' : `${sizeMap[props.size || 'md']}px`)};
  height: ${(props) => (props.vertical ? '100%' : `${sizeMap[props.size || 'md']}px`)};
  border-radius: ${(props) => `${sizeMap[props.size || 'md']}px`};
  background-color: ${(props) =>
    props.colorOverride ? props.theme.colors[props.colorOverride] : props.theme.colors.grey};
`;

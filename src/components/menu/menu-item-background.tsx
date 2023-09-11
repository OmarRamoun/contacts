import React from 'react';

import styled from 'styled-components/native';
import type {ColorProps, LayoutProps} from 'styled-system';
import {layout, color} from 'styled-system';

import {useGenericTransition} from '../transition/transition-hook';
import {AnimatedBox} from '../transition/transition-shared';

const Background = styled(AnimatedBox)<ColorProps & LayoutProps>`
  ${layout}
  ${color}
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.highlighted};
`;

const MenuItemBackground = ({highlighted}: {highlighted: boolean}) => {
  const {animatedValue: animatedOpacity} = useGenericTransition({
    from: 0,
    to: 1,
    state: highlighted,
  });

  return <Background style={{opacity: animatedOpacity}} />;
};

export {MenuItemBackground};

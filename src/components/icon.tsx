import React from 'react';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import {space} from 'styled-system';

import {iconMap} from '@assets/build';
import {theme} from '@styles';

import {Box} from './box';
import {Flex} from './flex';

const sizeMap: {[key: string]: number} = {
  vsm: 2,
  sm: 3,
  smmd: 4,
  md: 5,
  mdLg: 7,
  lg: 8,
  xlg: 12,
};

export type IconList = keyof typeof iconMap;
export type IconSizes = keyof typeof sizeMap;

interface IconProps {
  name: IconList;
  size?: IconSizes | number;
  color?: keyof DefaultTheme['colors'];
}

const IconWrapper = styled(Flex)<{hovered: boolean}>`
  opacity: ${(props) => (props.hovered ? '0.7' : '1')};
`;

const StyledIconWrapper = styled(Box)`
  ${space}
`;

const Icon = ({name, size = 'md', color = theme.primaryColor.default}: IconProps) => {
  const iconColor = theme.colors[color];
  const IconComp = iconMap[name];

  const sizeNumber = (sizeMap[size] || size) as number;

  return (
    <StyledIconWrapper width={sizeNumber} height={sizeNumber}>
      <IconComp color={iconColor} width={sizeNumber * 5} height={sizeNumber * 5} />
    </StyledIconWrapper>
  );
};

const iconSizeMap = {...sizeMap};
export {Icon, IconWrapper, iconSizeMap};

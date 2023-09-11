import React from 'react';

import styled from 'styled-components/native';

import {Flex} from '../flex';
import {Typography} from '../typography';

import type {SelectOption} from './input-shared';

export interface InputButtonGroupItemProps extends SelectOption {
  hovered: boolean;
  pressed: boolean;
  first: boolean;
  last: boolean;
  selected: boolean;
}

const StyledContainer = styled(Flex)<{
  first: boolean;
  last: boolean;
  selected: boolean;
  pressed: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.selected ? props.theme.colors.blue : props.theme.colors.lightGrey1)};
  padding: 0 ${(props) => props.theme.space[4]}px;
  height: ${(props) => props.theme.sizes.buttonHeightSmall};
  border-top-left-radius: ${(props) => (props.first ? props.theme.radii.md : 0)};
  border-top-right-radius: ${(props) => (props.last ? props.theme.radii.md : 0)};
  border-bottom-left-radius: ${(props) => (props.first ? props.theme.radii.md : 0)};
  border-bottom-right-radius: ${(props) => (props.last ? props.theme.radii.md : 0)};
  border-right-width: ${(props) => (!props.last ? 2 : 0)};
  border-right-color: ${(props) => (props.selected ? props.theme.colors.blue : props.theme.colors.grey)};
  opacity: ${(props) => (props.pressed ? 0.5 : 1)};
`;

const InputButtonGroupItem = ({label, value, pressed, first, last, selected}: InputButtonGroupItemProps) => (
  <StyledContainer first={first} last={last} selected={selected} pressed={pressed}>
    <Typography color={selected ? 'white' : 'darkBlue'} textStyle="extraSmall">
      {label || value}
    </Typography>
  </StyledContainer>
);

export {InputButtonGroupItem};

import React from 'react';

import styled from 'styled-components/native';

import {Flex} from '../flex';
import {Typography} from '../typography';

interface ButtonGroupItemProps {
  children: string | number;
  first: boolean;
  last: boolean;
  selected: boolean;
  pressed: boolean;
}

const StyledContainer = styled(Flex)<{
  first: boolean;
  last: boolean;
  selected: boolean;
  pressed: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.selected ? props.theme.primaryColor.default : props.theme.colors.lightGrey1)};
  padding: 0 ${(props) => props.theme.space[4]}px;
  height: ${(props) => props.theme.sizes.buttonHeightSmall}px;
  border-top-left-radius: ${(props) => (props.first ? props.theme.radii.md : 0)}px;
  border-top-right-radius: ${(props) => (props.last ? props.theme.radii.md : 0)}px;
  border-bottom-left-radius: ${(props) => (props.first ? props.theme.radii.md : 0)}px;
  border-bottom-right-radius: ${(props) => (props.last ? props.theme.radii.md : 0)}px;
  border-right-width: ${(props) => (!props.last ? 2 : 0)}px;
  border-right-color: ${(props) => (props.selected ? props.theme.primaryColor.alt : props.theme.colors.grey)};
  opacity: ${(props) => (props.pressed ? 0.5 : 1)};
`;

const ButtonGroupItem = ({children, first, last, selected, pressed}: ButtonGroupItemProps) => (
  <StyledContainer first={first} last={last} selected={selected} pressed={pressed}>
    <Typography color={selected ? 'white' : 'darkBlue'} textStyle="extraSmall">
      {children}
    </Typography>
  </StyledContainer>
);

export {ButtonGroupItem};

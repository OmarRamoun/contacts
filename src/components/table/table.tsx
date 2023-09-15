import React from 'react';

import styled from 'styled-components/native';
import type {BackgroundColorProps} from 'styled-system';

import {Flex} from '../flex';

interface TableProps extends BackgroundColorProps {
  children: React.ReactNode;
  outlined?: boolean;
  rounded?: boolean;
  width?: string;
  hideBottomOutline?: boolean;
  flexGrow?: number;
}

const StyledTableContainer = styled(Flex)<{
  outlined: boolean;
  hideBottomOutline: boolean;
  rounded: boolean;
  flexGrow?: number;
}>`
  border-radius: ${(props) => (props.rounded ? props.theme.radii.xlg : 0)}px;
  border-width: ${(props) => (props.outlined ? '1px' : '0')};
  border-bottom-width: ${(props) => (props.outlined && !props.hideBottomOutline ? '1px' : '0')};
  border-bottom-right-radius: ${(props) => (props.rounded && !props.hideBottomOutline ? props.theme.radii.md : 0)}px;
  border-bottom-left-radius: ${(props) => (props.rounded && !props.hideBottomOutline ? props.theme.radii.md : 0)}px;
  border-color: ${(props) => props.theme.colors.grey};
  flex-grow: ${(props) => (typeof props.flexGrow === 'number' ? props.flexGrow : 1)};
  overflow: hidden;
  width: ${(props) => props.width || 'auto'};
`;

const Table = ({children, outlined, rounded = true, flexGrow, hideBottomOutline, ...props}: TableProps) => (
  <StyledTableContainer
    hideBottomOutline={!!hideBottomOutline}
    outlined={!!outlined}
    rounded={rounded}
    flexGrow={flexGrow}
    {...props}>
    {children}
  </StyledTableContainer>
);

export {Table};

import React from 'react';

import styled from 'styled-components/native';
import type {PaddingProps} from 'styled-system';
import {padding, color} from 'styled-system';

import {theme} from '@styles';

import {BoxAction} from '../box-action';
import {Flex} from '../flex';
import type {IconList} from '../icon';
import {Icon} from '../icon';

export interface TableHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
  alt?: boolean;
  onAction?: () => void;
  actionIcon?: IconList;
  fitContentForFeed?: boolean;
  overrideBackgroundColor?: boolean;
  showLeftColumn?: boolean;
  showShadow?: boolean;
  showBottomBorder?: boolean;
}

interface AccessoryProps extends PaddingProps {
  children: React.ReactNode;
  flexDirection?: 'row' | 'column';
  align?: 'center' | 'stretch' | 'flex-start' | 'flex-end';
}

interface LeftAccessoryProps extends AccessoryProps {
  showLeftColumn?: boolean;
  headerIcon?: IconList;
}

const HeaderContainer = styled(Flex)<{
  showBottomBorder?: boolean;
  fitContentForFeed?: boolean;
  overrideBackgroundColor?: boolean;
  showShadow: boolean;
}>`
  ${padding}
  ${color}
  min-height: ${(props) => props.theme.sizes.tableHeightHeader}px;
  height: ${(props) => (props.fitContentForFeed ? 'auto' : `${props.theme.sizes.tableHeightHeader}px`)};
  z-index: 10;
  border-bottom-width: ${(props) => (props.showBottomBorder ? 1 : 0)}px;
  border-bottom-color: ${(props) => props.theme.colors.grey};
  background-color: ${(props) => (props.overrideBackgroundColor ? props.theme.colors.lightGrey1 : 'white')};
  box-shadow: ${(props) => `0px 2px 2px rgba(0, 0, 0, ${props.showShadow ? '0.1' : '0'})`};
`;

const LeftAccessory = ({
  children,
  flexDirection = 'row',
  align = 'center',
  showLeftColumn = false,
  headerIcon,
  ...props
}: LeftAccessoryProps) => (
  <Flex
    px={!showLeftColumn ? '2' : '0'}
    flexGrow={1}
    flexDirection={flexDirection}
    alignItems={align}
    style={{zIndex: 10}}
    {...props}>
    {headerIcon ? (
      <Flex mr={1}>
        <Icon name={headerIcon} size="md" color={theme.primaryColor.default} />
      </Flex>
    ) : null}
    {children}
  </Flex>
);

const RightAccessory = ({children, flexDirection = 'row', align = 'center', ...props}: AccessoryProps) => (
  <Flex px="2" flexGrow={0} flexDirection={flexDirection} alignItems={align} style={{zIndex: 10}} {...props}>
    {children}
  </Flex>
);

const TableHeader = ({
  left = null,
  right = null,
  center = null,
  alt = false,
  onAction,
  actionIcon = 'plus',
  fitContentForFeed,
  overrideBackgroundColor = false,
  showLeftColumn = false,
  showShadow = false,
  showBottomBorder = true,
}: TableHeaderProps) => (
  <HeaderContainer
    flexDirection="row"
    flexGrow={0}
    alignItems="center"
    backgroundColor={alt ? 'white' : 'lightGrey1'}
    justifyContent="space-between"
    fitContentForFeed={fitContentForFeed}
    overrideBackgroundColor={overrideBackgroundColor}
    showShadow={showShadow}
    showBottomBorder={showBottomBorder}>
    {showLeftColumn && <Flex width="8px" height="100%" backgroundColor={theme.primaryColor.default} mr="12px" />}
    {left}
    {center}
    {right}

    {onAction ? (
      <Flex flexGrow={0} flexShrink={0} flexDirection="row" pb="1px">
        <BoxAction
          onPress={onAction}
          width="tableHeightHeader"
          height="tableHeightHeader"
          icon={actionIcon}
          alt={alt}
        />
      </Flex>
    ) : null}
  </HeaderContainer>
);

TableHeader.LeftAccessory = LeftAccessory;
TableHeader.RightAccessory = RightAccessory;

export {TableHeader};

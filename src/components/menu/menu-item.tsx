import React from 'react';

import styled from 'styled-components/native';
import type {PaddingProps, ColorProps, FlexboxProps} from 'styled-system';
import {padding, color} from 'styled-system';

import {Box} from '../box';
import {ButtonInteraction} from '../button/button-interaction';
import type {ButtonContentProps} from '../button/button-shared';
import {Flex} from '../flex';
import type {IconList, IconSizes} from '../icon';
import {Icon, iconSizeMap} from '../icon';
import {Typography} from '../typography';

import {MenuItemBackground} from './menu-item-background';

interface MenuItemButtonProps extends ColorProps, PaddingProps, FlexboxProps {
  hovered: boolean;
  highlighted: boolean;
}

interface MenuItemObject {
  icon?: IconList;
  iconSize?: IconSizes;
  small?: boolean;
  to?: string;
  label?: string;
}

interface MenuItemProps extends MenuItemObject, ButtonContentProps {
  right?: React.ReactNode;
  collapsed?: boolean;
  active: boolean;
  onPress?: () => void;
  isSubMenu?: boolean;
  newMessage?: boolean;
}

const StyledAbsoluteContainer = styled(Box)`
  position: absolute;
  z-index: 10;
  right: -2px;
  top: -1px;
  height: 8px;
  width: 8px;
`;

const StyledButton = styled(Flex)<MenuItemButtonProps>`
  ${padding}
  ${color}
  background-color: ${(props) =>
    props.hovered && !props.highlighted ? props.theme.colors.highlighted : props.theme.colors.none};
`;

const StyledOpaqueContainer = styled(Flex)<
  MenuItemButtonProps & {
    collapsed?: boolean;
    isSubMenu: boolean;
    iconSize?: IconSizes;
  }
>`
  opacity: ${(props) =>
    /* eslint-disable-next-line */
    props.hovered || props.highlighted ? 1 : !props.isSubMenu ? 0.7 : 0.3};
  margin-right: ${(props) => {
    if (props.collapsed) return props.theme.space[0];
    if (!props.iconSize) return props.theme.space[2];
    return props.theme.space[2] - (5 * (iconSizeMap[props.iconSize] - iconSizeMap.md)) / 2;
  }}px;
  margin-left: ${(props) => {
    if (!props.iconSize) return 0;
    return -(5 * (iconSizeMap[props.iconSize] - iconSizeMap.md)) / 2;
  }}px;
`;

const MenuItem = ({
  children,
  icon,
  small = false,
  collapsed = false,
  right,
  active,
  onPress,
  to,
  isSubMenu = false,
  iconSize,
  newMessage = false,
}: MenuItemProps) => (
  <ButtonInteraction to={to} onPress={onPress}>
    {({mouseProps, ...interactionProps}) => (
      <Flex>
        <MenuItemBackground highlighted={active} />

        <StyledButton
          {...mouseProps}
          {...interactionProps}
          py="2"
          /* eslint-disable-next-line */
          px={collapsed ? 0 : isSubMenu ? '3' : '2'}
          color="white"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          highlighted={active}>
          {icon && (
            <StyledOpaqueContainer
              hovered={interactionProps.hovered}
              highlighted={active}
              collapsed={collapsed}
              isSubMenu={isSubMenu}
              iconSize={iconSize || 'md'}>
              {newMessage && icon === 'inbox' && (
                <StyledAbsoluteContainer>
                  <Icon size="vsm" name="unread-message" />
                </StyledAbsoluteContainer>
              )}

              <Icon size={iconSize || 'md'} name={icon} color="white" />
            </StyledOpaqueContainer>
          )}

          {!collapsed && (
            <>
              <StyledOpaqueContainer
                flexGrow={1}
                hovered={interactionProps.hovered}
                highlighted={active}
                isSubMenu={isSubMenu}>
                <Typography textStyle={small ? 'buttonSmall' : 'buttonMedium'} color="white">
                  {children}
                </Typography>
              </StyledOpaqueContainer>

              <StyledOpaqueContainer
                hovered={interactionProps.hovered}
                highlighted={active}
                collapsed
                isSubMenu={isSubMenu}>
                {right}
              </StyledOpaqueContainer>
            </>
          )}
        </StyledButton>
      </Flex>
    )}
  </ButtonInteraction>
);

export {MenuItem, StyledOpaqueContainer};

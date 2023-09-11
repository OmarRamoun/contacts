import React, {useState} from 'react';

import styled from 'styled-components/native';

import {theme} from '@styles';

import {Box} from '../box';
import {Collapsible} from '../collapsible';
import type {IconList, IconSizes} from '../icon';
import {Icon} from '../icon';
import {useGenericTransition} from '../transition/transition-hook';
import {AnimatedBox} from '../transition/transition-shared';

import {MenuItem} from './menu-item';
import {MenuItemBackground} from './menu-item-background';

interface MenuSubmenuItemProps {
  icon?: IconList;
  iconSize?: IconSizes;
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
  toggleCollapsed: () => void;
  menuCount?: number;
}

const RotateIcon = styled(AnimatedBox)``;

const SubMenuContent = styled(Box)<{collapsed: boolean}>`
  position: ${(props) => (props.collapsed ? 'absolute' : 'relative')};
  background-color: ${(props) => (props.collapsed ? props.theme.colors.darkBlue : 'transparent')};
  left: ${(props) => (props.collapsed ? '100%' : '0')};
`;

const MenuSubmenuItem = ({
  children,
  icon,
  iconSize,
  title,
  collapsed,
  toggleCollapsed,
  menuCount,
}: MenuSubmenuItemProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const {animatedValue: animatedTransformAngle} = useGenericTransition({
    from: '90deg',
    to: '-90deg',
    state: expanded,
  });

  return (
    <Box mb="1">
      <MenuItem
        active={expanded}
        collapsed={collapsed}
        onPress={() => {
          setExpanded(!expanded);
          toggleCollapsed();
        }}
        icon={icon}
        iconSize={iconSize}
        right={
          <RotateIcon style={{transform: [{rotate: animatedTransformAngle}]}}>
            <Icon name="small-arrow" color="white" />
          </RotateIcon>
        }>
        {title}
      </MenuItem>

      <SubMenuContent collapsed={collapsed || false}>
        <MenuItemBackground highlighted={expanded} />

        <Collapsible
          duration={40}
          height={(menuCount || (Array.isArray(children) ? children : []).length) * theme.sizes.navSubMenuHeight}
          expanded={expanded}>
          {children}
        </Collapsible>
      </SubMenuContent>
    </Box>
  );
};

export {MenuSubmenuItem};

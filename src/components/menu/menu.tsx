import React, {useState, useEffect} from 'react';
import {ImageBackground, ScrollView} from 'react-native';

import {pngMap} from '@assets';

import {Box} from '../box';
import {ButtonInteraction} from '../button/button-interaction';
import {Flex} from '../flex';
import type {IconList, IconSizes} from '../icon';
import {Image} from '../image';

import type {AvatarDataTypes} from './menu-avatar-sidebar';
import {MenuCollapse} from './menu-collapse';
import {MenuItem} from './menu-item';
import {MenuSubmenuItem} from './menu-submenu';
import {MenuTitle} from './menu-title';

interface MenuSubItemProps {
  label: string;
  icon?: IconList;
  iconSize?: IconSizes;
  to?: string;
  exact?: boolean;
  replace?: boolean;
  autoHeight?: boolean;
  postmenuitems?: MenuSubItemProps[];
}

interface MenuItemProps extends MenuSubItemProps {
  type: 'item';
  subitems?: MenuSubItemProps[];
}

interface MenuTitleProps {
  type: 'title';
  label: string;
}

export type MenuItemOptions = Array<MenuItemProps | MenuTitleProps>;

interface MenuProps {
  items: MenuItemOptions;
  active: string;
  totalGroupsWithUnreadMessages?: number;
  eyfs2021?: boolean;
  eyfs2012?: boolean;
  avatarData?: AvatarDataTypes;
  isLargeSize?: boolean;
}

const isActive = (active: string, to: string, exact = false) => (exact ? active === to : active.startsWith(to));

const Menu = ({
  items,
  active = '',
  totalGroupsWithUnreadMessages = 0,
  eyfs2021,
  eyfs2012,
  avatarData,
  isLargeSize,
}: MenuProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuCount, setMenuCount] = useState<number>(0);
  const [collapsedMenus, setCollapsedMenus] = useState<string[]>(['Tracking', 'Monitoring']);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (!isLargeSize) setCollapsed(true);
  }, []);

  useEffect(() => {
    let count = 3;
    const total = eyfs2021 && eyfs2012 ? 4 : 2;

    if (eyfs2021) count += 1;

    if (collapsedMenus.length === 0) count += total;
    else count += total - collapsedMenus.length * (eyfs2021 && eyfs2012 ? 2 : 1);

    setMenuCount(count);
  }, [eyfs2012, eyfs2021, collapsedMenus]);

  return (
    <Flex height="100%" width={collapsed ? 12 : 29} backgroundColor="darkBlue">
      <ImageBackground source={pngMap.LogoImage} resizeMode="repeat" style={{width: '100%', height: '100%'}}>
        <ScrollView contentContainerStyle={{paddingBottom: 60}}>
          <Flex flexBasis="auto" flexGrow={0} height="20" alignItems="center" justifyContent="center">
            <ButtonInteraction>
              {({mouseProps, ...interactionProps}) => (
                <Box width={collapsed ? 5 : 12} height={collapsed ? 4 : 10} {...mouseProps} {...interactionProps}>
                  <Image src={pngMap.LogoImage} width={collapsed ? 5 : 12} scalingMode="contain" alt="" />
                </Box>
              )}
            </ButtonInteraction>
          </Flex>

          <Flex flexGrow={1} flexShrink={1}>
            {items.map((item) => {
              if (item.type === 'title') {
                return !collapsed ? <MenuTitle key={`title-${item.label}`}>{item.label}</MenuTitle> : null;
              }

              if (item.subitems) {
                return (
                  <MenuSubmenuItem
                    key={`menuItem-${item.label}`}
                    collapsed={collapsed}
                    icon={item.icon}
                    iconSize={item.iconSize}
                    title={item.label || ''}
                    toggleCollapsed={() => {
                      if (collapsed) toggleCollapsed();
                    }}
                    menuCount={item.autoHeight ? undefined : menuCount}>
                    {item.subitems.map((subitem) => {
                      if (subitem.postmenuitems) {
                        return (
                          <MenuSubmenuItem
                            key={`menuItem-${subitem.label}`}
                            collapsed={collapsed}
                            icon={subitem.icon}
                            iconSize={subitem.iconSize}
                            title={subitem.label || ''}
                            toggleCollapsed={() => {
                              if (collapsedMenus.includes(subitem.label)) {
                                setCollapsedMenus(collapsedMenus.filter((v) => v !== subitem.label));
                              } else {
                                setCollapsedMenus([...collapsedMenus, subitem.label]);
                              }

                              if (collapsed) toggleCollapsed();
                            }}>
                            {subitem.postmenuitems
                              .filter((postitem) => (postitem.label === 'DM12' ? eyfs2012 : eyfs2021))
                              .map((postitem) => (
                                <MenuItem
                                  collapsed={collapsed}
                                  isSubMenu
                                  active={isActive(active, postitem.to || '', postitem.exact)}
                                  key={`subitem-${postitem.label}`}
                                  to={postitem.to}
                                  {...postitem}>
                                  {postitem.label}
                                </MenuItem>
                              ))}
                          </MenuSubmenuItem>
                        );
                      }

                      return (
                        <MenuItem
                          collapsed={collapsed}
                          isSubMenu
                          active={!!subitem.to && isActive(active, subitem.to, item.exact)}
                          key={`subitem-${subitem.label}`}
                          to={subitem.to}
                          {...subitem}>
                          {subitem.label}
                        </MenuItem>
                      );
                    })}
                  </MenuSubmenuItem>
                );
              }

              return (
                <MenuItem
                  collapsed={collapsed}
                  active={isActive(active, item.to || '', item.exact)}
                  key={`item-${item.label}`}
                  newMessage={totalGroupsWithUnreadMessages > 0}
                  to={item.to}
                  {...item}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Flex>
        </ScrollView>

        <MenuCollapse avatarData={avatarData} />
      </ImageBackground>
    </Flex>
  );
};

export {Menu};

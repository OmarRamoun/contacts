import React, {useState} from 'react';
import {Platform, TouchableWithoutFeedback} from 'react-native';

import {theme} from '@styles';
import {getInitialsString} from '@utils';

import {ActionSheet, ActionSheetPosition} from '../action-sheet/action-sheet';
import {Avatar} from '../avatar/avatar';
import {Flex} from '../flex';
import {Icon} from '../icon';

import type {AvatarDataTypes} from './menu-avatar-sidebar';
import {MenuAvatarSidebar} from './menu-avatar-sidebar';

interface MenuCollapseProps {
  onPress: () => void;
  collapsed: boolean;
  avatarData?: AvatarDataTypes;
}

const MenuCollapse = ({onPress, collapsed, avatarData}: MenuCollapseProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const firstName = avatarData?.firstName || '';
  const lastName = avatarData?.lastName || '';

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Flex
      flexBasis="auto"
      flexGrow={0}
      height={collapsed ? 22 : 32}
      backgroundColor="highlighted"
      alignItems="center"
      justifyContent="center">
      {avatarData && (
        <ActionSheet
          visible={showSidebar}
          onClose={toggleSidebar}
          sheetWidth={Platform.OS === 'web' ? 280 : 260}
          overridePadding={{p: 0}}
          overrideBorderRadius="lg"
          overrideBackdropColor={theme.colors.highlighted}
          position={ActionSheetPosition.Right}
          side={ActionSheetPosition.Right}
          customContent={<MenuAvatarSidebar avatarData={avatarData} hideSidebar={toggleSidebar} />}>
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <Avatar
              image={avatarData?.avatarUrl}
              size={collapsed ? 52 : 80}
              initials={
                // prettier-ignore
                firstName ?? lastName ?? getInitialsString(firstName ?? '', lastName)
              }
              borderColor="primaryDark"
              borderWidth={collapsed ? 3 : 5}
              style={{
                shadowColor: theme.colors.boxShadow2,
                shadowOffset: {width: -3, height: 8},
                shadowRadius: 10,
                marginBottom: 18,
              }}
            />
          </TouchableWithoutFeedback>
        </ActionSheet>
      )}

      <TouchableWithoutFeedback onPress={onPress}>
        <Flex>
          <Icon name={collapsed ? 'show-sidebar' : 'hide-sidebar'} color="white" />
        </Flex>
      </TouchableWithoutFeedback>
    </Flex>
  );
};

export {MenuCollapse};

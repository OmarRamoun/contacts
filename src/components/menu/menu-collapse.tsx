import React, {useState} from 'react';
import {Platform} from 'react-native';

import {theme} from '@styles';

import {ActionSheet, ActionSheetPosition} from '../action-sheet/action-sheet';
import {Avatar} from '../avatar/avatar';
import {Flex} from '../flex';
import {TouchableWithoutFeedback} from '../touchable-without-feedback';

import type {AvatarDataTypes} from './menu-avatar-sidebar';
import {MenuAvatarSidebar} from './menu-avatar-sidebar';

interface MenuCollapseProps {
  avatarData?: AvatarDataTypes;
}

const MenuCollapse = ({avatarData}: MenuCollapseProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Flex>
      {avatarData && (
        <ActionSheet
          visible={showSidebar}
          onClose={toggleSidebar}
          sheetWidth={Platform.OS === 'web' ? 280 : 230}
          overridePadding={{p: 0}}
          overrideMargin={{mx: 2, my: 1}}
          overrideBorderRadius="xlg"
          overrideBackdropColor={theme.colors.highlighted}
          position={ActionSheetPosition.Right}
          side={ActionSheetPosition.Left}
          customContent={<MenuAvatarSidebar avatarData={avatarData} />}>
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <Avatar image={avatarData.avatarUrl} size="sm" borderColor={theme.primaryColor.default} />
          </TouchableWithoutFeedback>
        </ActionSheet>
      )}
    </Flex>
  );
};

export {MenuCollapse};

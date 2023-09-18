import React from 'react';
import {Platform} from 'react-native';

import styled from 'styled-components/native';

import {theme} from '@styles';
import {openURL} from '@utils/linking-utils';
import {getInitialsString} from '@utils/strings';

import {Avatar} from '../avatar/avatar';
import {Box} from '../box';
import type {FlexProps} from '../flex';
import {Flex} from '../flex';
import {InfoText} from '../info-text';
import {Pressable} from '../pressable';
import {Typography} from '../typography';

export interface AvatarDataTypes {
  organizationName: string;
  firstName: string | undefined;
  lastName: string | undefined;
  avatarUrl: string | undefined;
  menuItemsData: {
    text: string;
    to?: string;
    onPress?: () => void;
    soon?: boolean;
  }[];
  isAdmin: boolean;
  lastOptionHandler?: () => void;
  lastOptionText?: string;
}

interface SidebarProps extends FlexProps {
  avatarData: AvatarDataTypes;
  toggleMenu: () => void;
}

const StyledSidebar = styled(Box)`
  height: ${Platform.OS === 'web' ? '430px' : '320px'};
  flex-direction: column;
  justify-content: space-between;
  padding-horizontal: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
  box-shadow: 2px 2px 8px ${theme.colors.boxShadow};
`;

const MenuAvatarSidebar = ({avatarData, toggleMenu}: SidebarProps) => (
  <StyledSidebar>
    <Flex mx={2} mb={4} flexDirection="row" alignItems="center" justify-content="space-between">
      <Flex mr={2}>
        <Avatar
          image={avatarData.avatarUrl}
          initials={
            avatarData.firstName && avatarData.lastName && getInitialsString(avatarData.firstName, avatarData.lastName)
          }
          size={60}
          borderColor="darkBlue"
          borderWidth={4}
        />
      </Flex>

      <Flex justifyContent="space-between" flex={1}>
        <Flex mb={2} flexDirection="row" justifyContent="flex-start">
          <Typography textStyle="small" color="darkBlue" numberOfLines={1}>
            {avatarData.firstName && avatarData.firstName.length > 8
              ? `${avatarData.firstName.substring(0, 8)}...`
              : avatarData.firstName}
          </Typography>

          <Box ml={2} px={2} alignItems="center" color="white" bg="darkBlue" justifyContent="center" borderRadius="md">
            <Typography textStyle="extraSmall" color="white">
              {avatarData.isAdmin ? 'Admin' : 'User'}
            </Typography>
          </Box>
        </Flex>

        <Flex>
          <Typography textStyle="h3" color="darkBlue" numberOfLines={1}>
            {avatarData.organizationName}
          </Typography>
        </Flex>
      </Flex>
    </Flex>

    <Flex flex={4} flexDirection="column">
      <Flex flexDirection="column">
        {avatarData.menuItemsData.map((item, idx) => (
          <Pressable
            key={`sidebar-menu-item-${idx}`}
            to={item.to}
            onPress={
              !item.soon
                ? () => {
                    item?.onPress?.();
                    toggleMenu();
                    // eslint-disable-next-line
                  }
                : undefined
            }
            mb={0}>
            <Box bg="transparent" flexDirection="row" justifyContent="space-between" pb={0}>
              <Typography textStyle="small" color={item.soon ? 'grey' : 'darkBlue'}>
                {item.text}
              </Typography>

              {item.soon ? (
                <Box p="2px" px={1} bg="lightGrey1" borderRadius="md">
                  <Typography textStyle="extraSmall" color="darkBlueOpacityHalf">
                    Coming Soon
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Pressable>
        ))}
      </Flex>
    </Flex>

    <Flex>
      {avatarData.lastOptionText ? (
        <Pressable onPress={avatarData.lastOptionHandler} onPressStyles={{backgroundColor: theme.colors.pink2}}>
          <Typography textStyle="body" color="red">
            {avatarData.lastOptionText}
          </Typography>
        </Pressable>
      ) : null}

      <Flex mx={2} flexDirection="row" alignItems="center">
        <InfoText text="&copy; Built By " />
        <InfoText text="Omar Ramoun" underline onPress={() => openURL('https://omarramoun.com')} />
      </Flex>
    </Flex>
  </StyledSidebar>
);

export {MenuAvatarSidebar};

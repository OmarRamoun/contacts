import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Avatar, ExpandableItem, Flex, Icon, Pressable, Typography, useToastContext} from '@components';
import {theme} from '@styles';
import type {ContactItem, ViewNavigationProps} from '@types';
import {getInitialsString} from '@utils/strings';

interface ContactProps {
  expanded?: boolean;
  showTopBorder?: boolean;
  onPress: () => void;
  contact: ContactItem;
}

const Contact = ({expanded = false, showTopBorder, onPress, contact}: ContactProps) => {
  const navigation = useNavigation<ViewNavigationProps<'Home'>>();

  const {showOneToast} = useToastContext();

  return (
    <ExpandableItem
      {...{expanded, showTopBorder, onPress}}
      leftSlot={
        <Flex flexDirection="row" alignItems="center" p={2}>
          <Flex mr={2}>
            <Avatar
              image={contact?.avatar}
              initials={!contact.hasAvatar ? getInitialsString(contact.firstName, contact.lastName) : undefined}
            />
          </Flex>

          <Flex>
            <Typography>{`${contact?.firstName} ${contact?.lastName}`}</Typography>
          </Flex>
        </Flex>
      }>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-evenly">
        <Pressable
          p={4}
          borderRadius={8}
          onPress={() => showOneToast({message: 'This Feature is comming soon...', backgroundColor: 'blue'})}
          onPressStyles={{backgroundColor: theme.colors.grey}}>
          <Icon name="phone" />
        </Pressable>

        <Pressable
          p={4}
          borderRadius={8}
          onPress={() => showOneToast({message: 'This Feature is comming soon...', backgroundColor: 'blue'})}
          onPressStyles={{backgroundColor: theme.colors.grey}}>
          <Icon name="envelope" />
        </Pressable>

        <Pressable
          p={4}
          borderRadius={8}
          onPressStyles={{backgroundColor: theme.colors.grey}}
          onPress={() =>
            navigation.navigate('Info', {
              id: contact.id,
            })
          }>
          <Icon name="info-outline" />
        </Pressable>
      </Flex>
    </ExpandableItem>
  );
};

export {Contact};

import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Avatar, ExpandableItem, Flex, Icon, Pressable, Typography} from '@components';
import {theme} from '@styles';
import type {ContactItem, ViewNavigationProps} from '@types';

interface ContactProps {
  expanded: boolean;
  showTopBorder: boolean;
  onPress: () => void;
  contact: ContactItem;
}

const Contact = ({expanded, showTopBorder, onPress, contact}: ContactProps) => {
  const navigation = useNavigation<ViewNavigationProps<'Home'>>();

  return (
    <ExpandableItem
      expanded={expanded}
      showTopBorder={showTopBorder}
      onPress={onPress}
      leftSlot={
        <Flex flexDirection="row" alignItems="center" p={2}>
          <Flex mr={2}>
            <Avatar image={contact.avatar} />
          </Flex>

          <Flex>
            <Typography>{`${contact?.firstName} ${contact?.lastName}`}</Typography>
          </Flex>
        </Flex>
      }>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-evenly">
        <Pressable p={4} borderRadius={8} onPressStyles={{backgroundColor: theme.colors.grey}}>
          <Icon name="phone" />
        </Pressable>

        <Pressable p={4} borderRadius={8} onPressStyles={{backgroundColor: theme.colors.grey}}>
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

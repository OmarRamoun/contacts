import React, {useMemo, useState} from 'react';
import {BackHandler} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  Avatar,
  Button,
  EmptyState,
  ExpandableItem,
  Flex,
  Icon,
  InputContainer,
  InputText,
  Line,
  MenuCollapse,
  Pressable,
  SectionList,
  TouchableOpacity,
  Typography,
} from '@components';
import {clearContacts} from '@state/slices';
import type {RootState} from '@state/store';
import {theme} from '@styles';
import type {ContactItem, GroupedContacts, ViewNavigationProps} from '@types';

import {contactsBinarySearch} from './utils';

interface ContactProps {
  expanded: boolean;
  showTopBorder: boolean;
  onPress: () => void;
  contact: ContactItem;
}

const HomeView = () => {
  const [currentExpanded, setCurrentExpanded] = useState<ContactItem['id'] | null>(null);
  const [search, setSearch] = useState<string>('');

  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.value);

  const contactsSortedArray: GroupedContacts[] = useMemo(
    () =>
      Object.values(contacts)
        .reduce((acc: GroupedContacts[], contact: ContactItem) => {
          const initial = contact.firstName.charAt(0).toLowerCase();
          const existingGroup = acc.find((item) => item.title === initial);

          if (existingGroup) {
            existingGroup.data.push(contact);
          } else {
            acc.push({title: initial, data: [contact]});
          }

          return acc;
        }, [])
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((group) => ({
          title: group.title,
          data: group.data.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        })),
    [contacts],
  );

  const filterContacts = (searchTerm: string) => {
    if (searchTerm.length === 0) {
      return contactsSortedArray;
    }

    const filteredContacts = contactsSortedArray.map((group) => ({
      ...group,
      data: contactsBinarySearch(group.data, searchTerm),
    }));

    return filteredContacts.filter((group) => group.data.length > 0);
  };

  const filteredContacts = filterContacts(search);

  if (contactsSortedArray.length === 0) {
    <EmptyState
      text="No Contacts Found"
      bottom={
        <Flex>
          <Button onPress={() => undefined}>
            <Icon name="plus" />
            Add New Contact
          </Button>
        </Flex>
      }
    />;
  }

  return (
    <Flex flex={1} m={2}>
      <InputContainer
        style={{
          borderWidth: 0,
          shadowColor: theme.colors.shadowColor,
          elevation: 3,
        }}
        onFocusStyle={{borderWidth: 2, elevation: 20}}
        leftSlot={() => (
          <Flex ml={2}>
            {search.length > 0 ? (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Icon name="cross" size="md" />
              </TouchableOpacity>
            ) : (
              <Icon name="search" size="md" />
            )}
          </Flex>
        )}
        rightSlot={() => (
          <Flex mr={2}>
            <MenuCollapse
              avatarData={{
                organizationName: 'soso soso',
                firstName: 'omar',
                lastName: 'ramoun',
                avatarUrl: 'https://placekitten.com/200/200',
                isAdmin: true,
                menuItemsData: [
                  {
                    text: 'Delete',
                    soon: true,
                  },
                  {
                    text: 'Delete All',
                    onPress: () => dispatch(clearContacts()),
                  },
                  {
                    text: 'Settings',
                    /* onPress: () => navigation.navigate('Settings'), */
                  },
                ],
                lastOptionText: 'Exit',
                lastOptionHandler: () => BackHandler.exitApp(),
              }}
            />
          </Flex>
        )}>
        {({setFocused}) => (
          <InputText
            placeholder="Enter Search..."
            numberOfLines={1}
            autoCorrect={false}
            autoCapitalize="none"
            value={search}
            onChangeText={(text) => setSearch(text)}
            setFocused={setFocused}
            style={{flex: 1, paddingRight: 7, paddingLeft: 3}}
            maxLength={40}
          />
        )}
      </InputContainer>

      <Line mt={4} size="xsm" />

      <Flex m={2} mt={0} flex={1}>
        <SectionList
          canPaginate
          keyExtractor={(contact, index) => `contact-${contact.id}-${index}`}
          sections={filteredContacts}
          renderItem={({item: contact, index}) => (
            <Contact
              expanded={currentExpanded === contact.id}
              showTopBorder={index !== 0}
              onPress={() => {
                setCurrentExpanded((prevContactId) => (prevContactId === contact.id ? 0 : contact.id));
              }}
              contact={contact}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Flex flexDirection="row" alignItems="center" px={2} py={1} my={2}>
              <Flex>
                <Typography textStyle="sectionHeaderBold" color="darkGrey">
                  {title.toUpperCase()}
                </Typography>
              </Flex>

              <Flex ml={2} flex={1}>
                <Line size="sm" colorOverride="darkGrey" />
              </Flex>
            </Flex>
          )}
        />
      </Flex>
    </Flex>
  );
};

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
        <Pressable
          p={4}
          borderRadius={8}
          onPressStyles={{backgroundColor: theme.colors.grey}}
          onPress={() => undefined}>
          <Icon name="phone" />
        </Pressable>

        <Pressable
          p={4}
          borderRadius={8}
          onPressStyles={{backgroundColor: theme.colors.grey}}
          onPress={() => undefined}>
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

export {HomeView};

import React, {useMemo, useState} from 'react';
import {BackHandler} from 'react-native';

import {useDispatch} from 'react-redux';

import {
  Box,
  Button,
  EmptyState,
  Flex,
  Icon,
  InputContainer,
  InputText,
  Line,
  MenuCollapse,
  Spinner,
  TouchableOpacity,
} from '@components';
import {clearContacts} from '@state/slices';
import {theme} from '@styles';
import type {ViewNavigationProps} from '@types';

import {ContactsList} from './components/contacts-list';
import {RoundButton} from './components/round-button';
import {useHomeContext} from './home-context';
import {contactsBinarySearch} from './utils';

interface HomeViewProps {
  navigation?: ViewNavigationProps<'Home'>;
}

const HomeView = ({navigation}: HomeViewProps) => {
  const [search, setSearch] = useState<string>('');

  const {contactsSortedArray, loading} = useHomeContext();

  const dispatch = useDispatch();

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

  const filteredContacts = useMemo(() => filterContacts(search), [search, contactsSortedArray]);

  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center" flex={1}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex flex={1} m={2} mb={0}>
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
                    onPress: () => navigation?.navigate('Settings'),
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

      <Flex m={2} my={0} flex={1}>
        {filteredContacts?.length > 0 ? (
          <ContactsList contacts={filteredContacts} />
        ) : (
          <Box p="4">
            <EmptyState
              text="No Contacts Found"
              bottom={
                <Flex>
                  <Button depth={4} onPress={() => navigation?.navigate('Form', {type: 'add'})}>
                    <Icon name="plus" color="white" />
                    Add New Contact
                  </Button>
                </Flex>
              }
            />
          </Box>
        )}
      </Flex>

      <RoundButton
        position="absolute"
        bottom={3}
        right={1}
        onPress={() =>
          navigation?.navigate('Form', {
            type: 'add',
          })
        }
      />
    </Flex>
  );
};

export {HomeView};

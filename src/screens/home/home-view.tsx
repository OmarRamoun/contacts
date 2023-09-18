import React from 'react';
import {BackHandler} from 'react-native';

import {useDispatch} from 'react-redux';

import {Icon, InputContainer, InputText, Line, Flex, MenuCollapse, TouchableOpacity} from '@components';
import {clearContacts} from '@state/slices';
import {theme} from '@styles';
import type {ViewNavigationProps} from '@types';

import {ContactsList} from './components/contacts-list';
import {RoundButton} from './components/round-button';
import {useHomeContext} from './home-context';

interface HomeViewProps {
  navigation?: ViewNavigationProps<'Home'>;
}

const HomeView = ({navigation}: HomeViewProps) => {
  const {search, handleSearch} = useHomeContext();

  const dispatch = useDispatch();

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
              <TouchableOpacity onPress={() => handleSearch('')}>
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
            onChangeText={(text) => handleSearch(text)}
            setFocused={setFocused}
            style={{flex: 1, paddingRight: 7, paddingLeft: 3}}
            maxLength={40}
          />
        )}
      </InputContainer>

      <Line mt={4} size="xsm" />

      <Flex m={2} my={0} flex={1}>
        <ContactsList />
      </Flex>

      <RoundButton
        position="absolute"
        bottom={0}
        right={0}
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

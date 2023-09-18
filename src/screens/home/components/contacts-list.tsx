import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, Flex, EmptyState, SectionList, Line, Typography, Button, Icon} from '@components';
import type {ViewNavigationProps} from '@types';

import {useHomeContext} from '../home-context';

import {Contact} from './contact';

const ContactsList = () => {
  const {currentExpanded, setCurrentExpanded, data, canPaginate, setCanPaginate} = useHomeContext();
  const navigation = useNavigation<ViewNavigationProps<'Home'>>();

  return (
    <SectionList
      keyExtractor={(contact, index) => `contact-${contact.id}-${index}`}
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
      stickySectionHeadersEnabled
      onEndReached={() => setCanPaginate(false)}
      canPaginate={canPaginate}
      sections={data}
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
      ListEmptyComponent={
        <Box p="4">
          <EmptyState
            text="No Contacts Found"
            bottom={
              <Flex>
                <Button depth={4} onPress={() => navigation.navigate('Form', {type: 'add'})}>
                  <Icon name="plus" color="white" />
                  Add New Contact
                </Button>
              </Flex>
            }
          />
        </Box>
      }
    />
  );
};

export {ContactsList};

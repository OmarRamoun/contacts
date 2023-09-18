import React from 'react';

import {Flex, SectionList, Line, Typography} from '@components';
import type {GroupedContacts} from '@types';

import {useHomeContext} from '../home-context';

import {Contact} from './contact';

const ContactsList = ({contacts}: {contacts: GroupedContacts[]}) => {
  const {currentExpanded, setCurrentExpanded, canPaginate, setCanPaginate} = useHomeContext();

  return (
    <SectionList
      keyExtractor={(contact, index) => `contact-${contact.id}-${index}`}
      renderSectionHeader={({section: {title}}) => (
        <Flex flexDirection="row" alignItems="center" px={2} py={1} my={2} bg="bgGrey" style={{elevation: 1}}>
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
      sections={contacts}
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
    />
  );
};

export {ContactsList};

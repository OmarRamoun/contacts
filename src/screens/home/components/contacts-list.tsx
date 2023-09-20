import React, {useMemo, useState} from 'react';

import {Flex, SectionList, Line, Typography} from '@components';
import type {GroupedContacts} from '@types';

import {useHomeContext} from '../home-context';

import {Contact} from './contact';

const ContactsList = ({contacts}: {contacts: GroupedContacts[]}) => {
  const {currentExpanded, setCurrentExpanded} = useHomeContext();

  const MemoizedContact = useMemo(() => React.memo(Contact), [contacts]);

  const [loader, setLoader] = useState<boolean>(false);

  const onEndReached = () => {
    setLoader(true);
  };

  return (
    <SectionList
      removeClippedSubviews
      keyExtractor={(contact, index) => `contact-${contact.id}-${index}`}
      renderSectionHeader={(item) => (
        <Flex flexDirection="row" alignItems="center" px={2} py={1} my={2} bg="bgGrey" style={{elevation: 1}}>
          <Flex>
            <Typography textStyle="sectionHeaderBold" color="darkGrey">
              {item.toUpperCase()}
            </Typography>
          </Flex>

          <Flex ml={2} flex={1}>
            <Line size="sm" colorOverride="darkGrey" />
          </Flex>
        </Flex>
      )}
      /* stickySectionHeadersEnabled */
      onEndReached={onEndReached}
      canPaginate={loader}
      sections={contacts}
      renderElement={(contact, index) => (
        <MemoizedContact
          expanded={currentExpanded === contact.id}
          showTopBorder={index !== 1}
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

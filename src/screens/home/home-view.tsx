import React, {useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {
  Avatar,
  Button,
  EmptyState,
  ExpandableItem,
  Flex,
  Form,
  Icon,
  InputContainer,
  InputFormik,
  InputText,
  Line,
  MenuCollapse,
  Pressable,
  SectionList,
  Spinner,
  TouchableOpacity,
  Typography,
} from '@components';
import {useFormik} from '@lib';
import type {RootState} from '@state/store';
import {theme} from '@styles';
import type {ContactItem, GroupedContacts, ViewNavigationProps} from '@types';

interface ContactProps {
  currentExpanded: ContactItem['id'];
  setCurrentExpanded: React.Dispatch<React.SetStateAction<number>>;
  contact: ContactItem;
  index: number;
}

const HomeView = () => {
  const [currentExpanded, setCurrentExpanded] = useState<ContactItem['id']>(-1);
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

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => undefined,
  });

  if (!contacts) {
    return <Spinner />;
  }

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
      <Form ctx={formik}>
        <InputContainer
          style={{
            borderWidth: 0,
            shadowColor: theme.colors.shadowColor,
            elevation: 3,
          }}
          onFocusStyle={{borderWidth: 2, elevation: 20}}
          leftSlot={() => (
            <Flex ml={2}>
              {formik.dirty ? (
                <TouchableOpacity onPress={() => formik.resetForm()}>
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
                  nurseryName: 'soso soso',
                  firstName: 'omar',
                  lastName: 'ramoun',
                  avatarUrl: 'https://placekitten.com/200/200',
                  menuItemsData: [
                    {
                      text: 'Delete',
                      onPress: () => undefined,
                    },
                    {
                      text: 'Settings',
                      onPress: () => undefined,
                    },
                  ],
                  isAdmin: true,
                  lastOptionHandler: () => undefined,
                }}
              />
            </Flex>
          )}>
          {({setFocused}) => (
            <InputFormik name="search">
              <InputText
                placeholder="Enter Search..."
                numberOfLines={1}
                autoCorrect={false}
                autoCapitalize="none"
                onSubmit={() => formik.submitForm()}
                setFocused={setFocused}
                style={{flex: 1, paddingRight: 7, paddingLeft: 3}}
                maxLength={40}
              />
            </InputFormik>
          )}
        </InputContainer>
      </Form>

      <Line mt={4} size="xsm" />

      <Flex m={2} mt={0} flex={1}>
        <SectionList
          keyExtractor={(contact, index) => `contact-${contact.id}-${index}`}
          sections={contactsSortedArray}
          renderItem={({item: contact, index}) => (
            <Contact
              currentExpanded={currentExpanded}
              setCurrentExpanded={setCurrentExpanded}
              contact={contact}
              index={index}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Flex flexDirection="row" alignItems="center" px={2} py={1} my={2}>
              <Flex>
                <Typography textStyle="sectionHeaderBold" color="darkGrey">
                  {title}
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

const Contact = ({currentExpanded, setCurrentExpanded, contact, index}: ContactProps) => {
  const navigation = useNavigation<ViewNavigationProps<'Home'>>();

  return (
    <ExpandableItem
      expanded={currentExpanded === contact.id}
      showTopBorder={index !== 0}
      onPress={() => {
        setCurrentExpanded((prevContactId) => (prevContactId === contact.id ? 0 : contact.id));
      }}
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

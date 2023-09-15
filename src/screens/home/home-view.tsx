import React, {useState} from 'react';

import {
  Flex,
  Form,
  InputFormik,
  InputText,
  InputContainer,
  Typography,
  Icon,
  Line,
  SectionList,
  MenuCollapse,
  TouchableOpacity,
  Pressable,
  Avatar,
  ExpandableItem,
} from '@components';
import {useFormik} from '@lib';
import {theme} from '@styles';

interface ContactItem {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
}

interface ContactProps {
  currentExpanded: ContactItem['id'];
  setCurrentExpanded: React.Dispatch<React.SetStateAction<number>>;
  contact: ContactItem;
  index: number;
}

const DATA = [
  {
    title: 'A',
    data: [
      {
        id: 1,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'ahmd',
        lastName: 'good',
        phone: '+201093333333',
        email: 'ahmd@org.com',
        organization: 'org',
      },
      {
        id: 2,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'aska',
        lastName: 'good',
        phone: '+201093333333',
        email: 'aska@ramoun.com',
        organization: 'askas',
      },
      {
        id: 22,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'asked',
        lastName: 'good',
        phone: '+201093333333',
        email: 'aska@ramoun.com',
        organization: 'askas',
      },
    ],
  },
  {
    title: 'O',
    data: [
      {
        id: 3,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'Omar',
        lastName: 'Ramoun',
        phone: '+201093333333',
        email: 'omar@ramoun.com',
        organization: 'soso',
      },
      {
        id: 4,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'Omai',
        lastName: 'Ramoun',
        phone: '+201093333333',
        email: 'omai@ramoun.com',
        organization: 'soso',
      },
      {
        id: 44,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'Over',
        lastName: 'Ramoun',
        phone: '+201093333333',
        email: 'omai@ramoun.com',
        organization: 'soso',
      },
    ],
  },
  {
    title: 'M',
    data: [
      {
        id: 9,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'Mmar',
        lastName: 'Ramoun',
        phone: '+201093333333',
        email: 'omar@ramoun.com',
        organization: 'soso',
      },
      {
        id: 10,
        avatar: 'https://placekitten.com/200/200',
        firstName: 'Mmo',
        lastName: 'Ramoun',
        phone: '+201093333333',
        email: 'omai@ramoun.com',
        organization: 'soso',
      },
    ],
  },
];

const HomeView = () => {
  const [currentExpanded, setCurrentExpanded] = useState<ContactItem['id']>(-1);

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => undefined,
  });

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
          sections={DATA}
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

const Contact = ({currentExpanded, setCurrentExpanded, contact, index}: ContactProps) => (
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
      <Pressable p={4} borderRadius={8} onPressStyles={{backgroundColor: theme.colors.grey}} onPress={() => undefined}>
        <Icon name="phone" />
      </Pressable>

      <Pressable p={4} borderRadius={8} onPressStyles={{backgroundColor: theme.colors.grey}} onPress={() => undefined}>
        <Icon name="envelope" />
      </Pressable>

      <Pressable p={4} borderRadius={8} onPressStyles={{backgroundColor: theme.colors.grey}} onPress={() => undefined}>
        <Icon name="info-outline" />
      </Pressable>
    </Flex>
  </ExpandableItem>
);

export {HomeView};

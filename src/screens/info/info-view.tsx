import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {useSelector} from 'react-redux';

import {
  Flex,
  Box,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableItem,
  Typography,
  Icon,
  TouchableOpacity,
  Avatar,
  Pressable,
  ConfirmBox,
  StandardModal,
  Spinner,
} from '@components';
import type {RootState} from '@state/store';
import {theme} from '@styles';
import type {ViewNavigationProps, RouteNavigationProps, ContactItem} from '@types';

interface InfoViewProps {
  navigation?: ViewNavigationProps<'Info'>;
  route?: RouteNavigationProps<'Info'>;
}

const InfoView = ({navigation, route}: InfoViewProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {id: contactId}: {id?: ContactItem['id']} = route?.params ?? {};

  const contacts = useSelector((state: RootState) => state.contacts.value);

  const contact = contactId !== undefined ? contacts[contactId] : undefined;

  if (!contact) {
    return <Spinner />;
  }

  return (
    <>
      <Flex flex={1} m={2}>
        <Table outlined>
          <TableHeader
            showLeftColumn
            showShadow
            showBottomBorder
            actionIcon="back"
            onAction={() => navigation?.goBack()}
            left={
              <TableHeader.LeftAccessory showLeftColumn headerIcon="user-profile">
                <Typography>
                  {contact?.firstName} {contact?.lastName}
                </Typography>
              </TableHeader.LeftAccessory>
            }
            right={
              <TableHeader.RightAccessory>
                <TouchableOpacity onPress={() => navigation?.navigate('Form')}>
                  <Box bg="grey" p={2} borderRadius={8}>
                    <Icon name="edit-pencil" size="md" />
                  </Box>
                </TouchableOpacity>
              </TableHeader.RightAccessory>
            }
          />

          <Flex alignItems="center" justifyContent="center" m={5}>
            <Avatar size="lg" image={contact?.avatar} borderColor="black" borderWidth={5} />
          </Flex>

          <TableBody shouldScroll>
            <ScrollView>
              <TableItem
                title="First Name"
                subtitle={contact?.firstName}
                left={<Typography textStyle="h1">F</Typography>}
                right={
                  <Typography>
                    <Typography textStyle="h2">1</Typography>ST
                  </Typography>
                }
              />

              <TableItem
                title="Last Name"
                subtitle={contact?.lastName}
                left={<Typography textStyle="h1">L</Typography>}
                right={
                  <Typography>
                    <Typography textStyle="h2">L</Typography>ST
                  </Typography>
                }
              />

              <TableItem
                title="Phone"
                subtitle={contact?.phone}
                left={<Typography textStyle="h1">P</Typography>}
                right={<Icon name="phone" />}
                selected
              />

              <TableItem
                title="E-Mail"
                subtitle={contact?.email}
                left={<Typography textStyle="h1">E</Typography>}
                right={<Icon name="envelope" />}
              />

              <TableItem
                title="organization"
                subtitle={contact?.organization}
                left={<Typography textStyle="h1">O</Typography>}
                right={<Icon name="staff" />}
              />
            </ScrollView>
          </TableBody>

          <TableFooter padding={1}>
            <Pressable
              bg="redLightened"
              my={0}
              mx={0}
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              onPressStyles={{backgroundColor: theme.colors.lightPink}}
              onPress={() => setConfirmDelete(true)}>
              <Flex mr={1}>
                <Icon color="white" name="delete-two" />
              </Flex>
              <Typography color="white">Delete</Typography>
            </Pressable>
          </TableFooter>
        </Table>
      </Flex>

      <StandardModal show={confirmDelete}>
        <ConfirmBox onOk={() => setConfirmDelete(false)} onCancel={() => setConfirmDelete(false)} />
      </StandardModal>
    </>
  );
};

export {InfoView};

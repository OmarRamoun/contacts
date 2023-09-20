import React from 'react';
import {ScrollView} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

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
  Button,
  EmptyState,
  useToastContext,
} from '@components';
import {ANDROID, CONTACTS_WRITE_PERM_DETAILS} from '@constants/permissions';
import {deleteContact} from '@state/slices';
import type {RootState} from '@state/store';
import {theme} from '@styles';
import type {ViewNavigationProps, RouteNavigationProps, ContactItem} from '@types';
import {getPermissions} from '@utils/permissions';

interface InfoViewProps {
  navigation?: ViewNavigationProps<'Info'>;
  route?: RouteNavigationProps<'Info'>;
}

const InfoView = ({navigation, route}: InfoViewProps) => {
  const {id: contactId}: {id?: ContactItem['id']} = route?.params ?? {};

  const {showOneToast, showErrorToast} = useToastContext();

  const contacts = useSelector((state: RootState) => state.contacts.value);

  const dispatch = useDispatch();

  const contact = contactId !== undefined ? contacts[contactId] : undefined;

  const handleDelete = async () => {
    if (contact?.id) {
      try {
        await getPermissions(
          ANDROID.contactsWrite,
          () => dispatch(deleteContact(contact?.id)),
          CONTACTS_WRITE_PERM_DETAILS,
        );

        showOneToast({message: 'Contact Was Deleted Successfully', backgroundColor: 'green'});
        navigation?.goBack();
      } catch (error) {
        showErrorToast({message: 'Failed To Delete Contact. Check App Permissions'});
      }
    }
  };

  const handleStarred = async () => {
    if (contact?.id) {
      try {
        // TODO: Fix Starring Mehanism
        /* await getPermissions(
         * ANDROID.contactsWrite, () => dispatch(starContact(contact)), CONTACTS_WRITE_PERM_DETAILS
         * ); */
        showOneToast({message: 'This feature is comming soon...', backgroundColor: 'blue'});
      } catch (error) {
        showErrorToast({message: 'Could Not Add To Favorite. Check App Permissions'});
      }
    }
  };

  if (!contact) {
    return (
      <Flex>
        <EmptyState
          text="This Contact is Not Found"
          bottom={
            <Flex flex={1} alignItems="center" justifyContent="center">
              <Button depth={4} onPress={() => navigation?.navigate('Form', {type: 'add'})}>
                <Icon name="plus" color="white" />
                Add New Contact
              </Button>
            </Flex>
          }
        />
      </Flex>
    );
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
                <TouchableOpacity onPress={handleStarred}>
                  <Box p={2} mr={2} borderRadius={8}>
                    <Icon name="star" color={contact.isStarred ? 'black' : 'grey'} size="md" />
                  </Box>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation?.navigate('Form', {
                      type: 'edit',
                      id: contact?.id,
                    })
                  }>
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
              onPress={handleDelete}>
              <Flex mr={1}>
                <Icon color="white" name="delete-two" />
              </Flex>
              <Typography color="white">Delete</Typography>
            </Pressable>
          </TableFooter>
        </Table>
      </Flex>
    </>
  );
};

export {InfoView};

import React, {useState} from 'react';
import {ScrollView} from 'react-native';

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
} from '@components';
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

const data: ContactItem = {
  id: 1,
  avatar: 'https://placekitten.com/200/200',
  firstName: 'ahmd',
  lastName: 'good',
  phone: '+201093333333',
  email: 'ahmd@org.com',
  organization: 'org',
};

const InfoView = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <>
      <Flex flex={1} m={2}>
        <Table outlined>
          <TableHeader
            showLeftColumn
            showShadow
            showBottomBorder
            actionIcon="back"
            onAction={() => undefined}
            left={
              <TableHeader.LeftAccessory showLeftColumn headerIcon="user-profile">
                <Typography>
                  {data.firstName} {data.lastName}
                </Typography>
              </TableHeader.LeftAccessory>
            }
            right={
              <TableHeader.RightAccessory>
                <TouchableOpacity onPress={() => undefined}>
                  <Box bg="grey" p={2} borderRadius={8}>
                    <Icon name="edit-pencil" size="md" />
                  </Box>
                </TouchableOpacity>
              </TableHeader.RightAccessory>
            }
          />

          <Flex alignItems="center" justifyContent="center" m={5}>
            <Avatar size="lg" image={data.avatar} borderColor="black" borderWidth={5} />
          </Flex>

          <TableBody shouldScroll>
            <ScrollView>
              <TableItem
                title="First Name"
                subtitle={data.firstName}
                left={<Typography textStyle="h1">F</Typography>}
                right={
                  <Typography>
                    <Typography textStyle="h2">1</Typography>ST
                  </Typography>
                }
              />

              <TableItem
                title="Last Name"
                subtitle={data.lastName}
                left={<Typography textStyle="h1">L</Typography>}
                right={
                  <Typography>
                    <Typography textStyle="h2">L</Typography>ST
                  </Typography>
                }
              />

              <TableItem
                title="Phone"
                subtitle={data.phone}
                left={<Typography textStyle="h1">P</Typography>}
                right={<Icon name="phone" />}
                selected
              />

              <TableItem
                title="E-Mail"
                subtitle={data.email}
                left={<Typography textStyle="h1">E</Typography>}
                right={<Icon name="envelope" />}
              />

              <TableItem
                title="organization"
                subtitle={data.organization}
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

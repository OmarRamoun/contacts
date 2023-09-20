import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {
  Avatar,
  Button,
  ConfirmBox,
  FadeTransitionStyle,
  Flex,
  Form,
  Icon,
  InputField,
  InputFormik,
  StandardModal,
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TransitionContainer,
  Typography,
  SPRING_CONFIGURATION_FAST_BOUNCE,
  useToastContext,
} from '@components';
import {ANDROID, CONTACTS_WRITE_PERM_DETAILS} from '@constants/permissions';
import {useKeyboard} from '@hooks';
import {useFormik} from '@lib';
import {addContact, editContact} from '@state/slices';
import type {RootState} from '@state/store';
import type {ContactItem, RouteNavigationProps, ViewNavigationProps} from '@types';
import {getPermissions} from '@utils/permissions';

interface FormViewProps {
  navigation?: ViewNavigationProps<'Form'>;
  route?: RouteNavigationProps<'Form'>;
}

const FormView = ({navigation, route}: FormViewProps) => {
  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);

  const {keyboardShown} = useKeyboard();
  const {showOneToast, showErrorToast} = useToastContext();
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.value);

  const {type} = route?.params ?? {type: 'add'};

  const contactId = route?.params?.type === 'edit' ? (route?.params?.id as ContactItem['id']) : undefined;

  const newId = type === 'add' ? uuidv4() : null;

  const contact = contactId && contacts[contactId];

  const initialValue = {
    id: newId || '',
    avatar: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  };

  const formik = useFormik({
    initialValues: contact || initialValue,
    onSubmit: async () => {
      if (!formik.values.firstName || !formik.values.lastName || !formik.values.phone || !formik.values.email) {
        showErrorToast({message: 'Please fill in all fields'});
        return;
      }

      if (type === 'add' && formik.values?.id) {
        try {
          await getPermissions(
            ANDROID.contactsWrite,
            () => dispatch(addContact(formik.values)),
            CONTACTS_WRITE_PERM_DETAILS,
          );

          showOneToast({message: 'Contact Was Successfully Added', backgroundColor: 'green'});
        } catch (error) {
          showErrorToast({message: 'Failed To Add Contact. Check App Permissions'});
        }
      } else {
        try {
          await getPermissions(
            ANDROID.contactsWrite,
            () => dispatch(editContact(formik.values)),
            CONTACTS_WRITE_PERM_DETAILS,
          );

          showOneToast({message: 'Contact Was Successfully Updated', backgroundColor: 'green'});
        } catch (error) {
          showErrorToast({message: 'Failed To Update Contact. Check App Permissions'});
        }
      }

      navigation?.goBack();
    },
  });

  const handleCancel = () => (formik.dirty ? setConfirmCancel(true) : navigation?.goBack());

  return (
    <>
      <Flex flex={1} m={2}>
        <Table outlined>
          <TableHeader
            actionIcon="back"
            onAction={handleCancel}
            left={
              <TableHeader.LeftAccessory headerIcon={type === 'add' ? 'add' : 'edit'}>
                <Typography>{type === 'add' ? 'Add New Contact' : 'Edit Contact'}</Typography>
              </TableHeader.LeftAccessory>
            }
          />

          <TableBody shouldScroll>
            <ScrollView>
              <Flex alignItems="center" justifyContent="center" p={5} bg="darkBlueOpacity">
                <Avatar
                  editable
                  size="lg"
                  borderColor="black"
                  borderWidth={4}
                  image={type === 'add' ? undefined : formik.values.avatar}
                />
              </Flex>

              <Form ctx={formik} verticalSpacing={0}>
                <Flex p={3}>
                  <InputFormik name="firstName">
                    <InputField
                      numberOfLines={1}
                      title="First Name"
                      inputTextProps={{placeholder: 'e.g: John'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0} pb={0}>
                          <Typography>
                            <Typography textStyle="h2">1</Typography>
                            ST
                          </Typography>
                        </Flex>
                      )}
                    />
                  </InputFormik>
                </Flex>

                <Flex p={3}>
                  <InputFormik name="lastName">
                    <InputField
                      numberOfLines={1}
                      title="Last Name"
                      inputTextProps={{placeholder: 'e.g: Doe'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0} pb={0}>
                          <Typography>
                            <Typography textStyle="h2">L</Typography>ST
                          </Typography>
                        </Flex>
                      )}
                    />
                  </InputFormik>
                </Flex>

                <Flex p={3} bg="lightGrey1">
                  <InputFormik name="phone">
                    <InputField
                      numberOfLines={1}
                      title="Phone"
                      inputTextProps={{placeholder: 'e.g: +201093333333', keyboardType: 'phone-pad'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0}>
                          <Icon name="phone" />
                        </Flex>
                      )}
                    />
                  </InputFormik>
                </Flex>

                <Flex p={3}>
                  <InputFormik name="email">
                    <InputField
                      numberOfLines={1}
                      title="E-Mail"
                      inputTextProps={{placeholder: 'e.g: john@doe.com', keyboardType: 'email-address'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0}>
                          <Icon name="envelope" />
                        </Flex>
                      )}
                    />
                  </InputFormik>
                </Flex>
              </Form>
            </ScrollView>
          </TableBody>

          {!keyboardShown ? (
            <TransitionContainer
              transitionStyle={FadeTransitionStyle}
              isVisible={!keyboardShown}
              springConfig={SPRING_CONFIGURATION_FAST_BOUNCE}>
              <TableFooter padding={1}>
                <Button depth={4} onPress={() => formik.submitForm()}>
                  Save
                </Button>

                <Button depth={4} type="primaryDestructive" onPress={handleCancel}>
                  Cancel
                </Button>
              </TableFooter>
            </TransitionContainer>
          ) : null}
        </Table>
      </Flex>

      <StandardModal show={confirmCancel}>
        <ConfirmBox
          headerTitle="Are You Sure?"
          bodyTitle="All data will be lost."
          onOk={async () => {
            await formik.setValues(initialValue);
            setConfirmCancel(false);

            navigation?.goBack();
          }}
          onCancel={() => setConfirmCancel(false)}
        />
      </StandardModal>
    </>
  );
};

export {FormView};

import React from 'react';
import {ScrollView} from 'react-native';

import {
  Avatar,
  Button,
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
} from '@components';
import {useKeyboard} from '@hooks';
import {useFormik} from '@lib';
import type {ViewNavigationProps} from '@types';
/* interface ContactItem {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
} */

/* const data: ContactItem = {
  id: 1,
  avatar: 'https://placekitten.com/200/200',
  firstName: 'ahmd',
  lastName: 'good',
  phone: '+201093333333',
  email: 'ahmd@org.com',
  organization: 'org',
}; */

interface FormViewProps {
  navigation: ViewNavigationProps<'Form'>;
}

// TODO: don't send data through router

const FormView = ({navigation}: FormViewProps) => {
  const {keyboardShown, keyboardHeight} = useKeyboard();

  const formik = useFormik({
    initialValues: {
      firstName: '',
    },
    onSubmit: () => undefined,
  });

  return (
    <>
      <Flex flex={1} m={2}>
        <Table outlined>
          <TableHeader
            actionIcon="back"
            onAction={() => navigation.goBack()}
            left={
              <TableHeader.LeftAccessory headerIcon="add">
                <Typography>Add New Contact</Typography>
              </TableHeader.LeftAccessory>
            }
          />

          <Flex alignItems="center" justifyContent="center" p={5} bg="darkBlueOpacity">
            <Avatar editable size="lg" borderColor="black" borderWidth={4} />
          </Flex>

          <TableBody shouldScroll>
            <ScrollView>
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
                      inputTextProps={{placeholder: 'e.g: +201093333333'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0}>
                          <Icon name="phone" />
                        </Flex>
                      )}
                    />
                  </InputFormik>
                </Flex>

                <Flex p={3}>
                  <InputFormik name="phone">
                    <InputField
                      numberOfLines={1}
                      title="E-Mail"
                      inputTextProps={{placeholder: 'e.g: john@doe.com'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0}>
                          <Icon name="envelope" />
                        </Flex>
                      )}
                    />
                  </InputFormik>
                </Flex>

                <Flex p={3}>
                  <InputFormik name="phone">
                    <InputField
                      numberOfLines={1}
                      title="Orgnaization"
                      inputTextProps={{placeholder: 'e.g: Acme'}}
                      leftSlot={() => (
                        <Flex p={2} pr={0}>
                          <Icon name="staff" />
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
              springConfig={{
                tension: 300,
                friction: 5,
              }}>
              <TableFooter padding={1}>
                <Button depth={4} onPress={() => alert(keyboardHeight)}>
                  Save
                </Button>
                <Button depth={4} type="primaryDestructive" onPress={() => navigation.goBack()}>
                  Cancel
                </Button>
              </TableFooter>
            </TransitionContainer>
          ) : null}
        </Table>
      </Flex>

      <StandardModal show={false}>
        <Button>click</Button>
      </StandardModal>
    </>
  );
};

export {FormView};

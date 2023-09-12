import React, {useEffect, useState} from 'react';
import type {Animated} from 'react-native';
import {ScrollView} from 'react-native';

import {
  ActionSheet,
  Box,
  Button,
  ButtonGroup,
  Collapsible,
  ExpandableItem,
  Flex,
  Icon,
  Line,
  SpinnerOverlay,
  Status,
  Tabs,
  TabsPages,
  TouchableOpacity,
  TransitionContainer,
  Typography,
  TableHeader,
  TableFooter,
  TableBody,
  Table,
  Modal,
  ModalContent,
  useToastContext,
} from '@components';

export const items = [
  {
    label: 'Profile',
  },
  {
    label: 'Feed',
  },
  {
    label: 'Learning Journey',
  },
];

const HomeView = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showMyToast, setShowMyToast] = useState(false);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const {showOneToast} = useToastContext();

  useEffect(() => {
    if (showMyToast) {
      showOneToast({message: 'Contact Added', subMessage: 'hello', backgroundColor: 'black'});
      setShowMyToast(false);
    }
  }, [showMyToast]);

  return (
    <ScrollView>
      <Flex bg="white" flex={1} alignItems="center">
        <Flex marginTop={10}>
          <Typography textStyle="h1" textAlign="center">
            Welcome
          </Typography>
        </Flex>

        <Button depth={7} marginTop={10} onPress={() => setShowMyToast(true)}>
          Like 👍 Now!!
        </Button>

        <Flex mt={10}>
          <ButtonGroup
            options={[
              {label: 'hello', value: '1'},
              {label: 'omar', value: '2'},
              {label: 'hello', value: '3'},
            ]}
          />
        </Flex>

        <Flex mt={10}>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Status text="idk" />
          </TouchableOpacity>
        </Flex>

        <Flex mt={10}>
          {/* TODO: Modal is more flexible */}

          <Modal show={preview} onClose={() => setPreview(false)}>
            <ModalContent onClose={() => setPreview(false)} heading="that is custom" headerIcon="action-send" noPadding>
              <Flex bg="white" m={4} p={4}>
                <Typography>from modal</Typography>
              </Flex>
            </ModalContent>
          </Modal>
        </Flex>

        <Flex mt={10}>
          <ActionSheet
            visible={open}
            onClose={() => setOpen(false)}
            customContent={
              <Table outlined backgroundColor="blue">
                <TableHeader
                  left={
                    <TableHeader.LeftAccessory>
                      <Typography textStyle="bodyBold" color="darkBlue">
                        Are you sure want to close?
                      </Typography>
                    </TableHeader.LeftAccessory>
                  }
                  actionIcon="cross"
                />

                <TableBody>
                  <Typography textStyle="small" color="black">
                    Create a new password for your account.
                  </Typography>
                </TableBody>

                <TableFooter>
                  <Button loading={true} depth={4}>
                    <Typography>Submit</Typography>
                  </Button>
                </TableFooter>
              </Table>
            }>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <Icon color="red" name="circle" />
            </TouchableOpacity>
          </ActionSheet>
        </Flex>

        <Flex mt={10}>
          <TransitionContainer
            isVisible={false}
            transitionStyle={{
              interpolation: {
                from: 0,
                to: 100,
              },
              style: (animatedValue: Animated.AnimatedInterpolation<string | number>) => ({
                padding: animatedValue,
              }),
            }}>
            <Flex>
              <Typography>Text</Typography>
            </Flex>
          </TransitionContainer>
        </Flex>

        <Flex mt={10} bg="blue" height={30}>
          <Collapsible expanded={expanded} height={80} duration={40} bg="red">
            <Flex bg="yellow">
              <Typography>goooooooooooooooood</Typography>
              <Typography>goooooooooooooooood</Typography>
              <Typography>goooooooooooooooood</Typography>
              <Typography>goooooooooooooooood</Typography>
            </Flex>
          </Collapsible>
        </Flex>

        <Flex mt={10} bg="blue" width={70}>
          <ExpandableItem
            showSideBorder
            overrideMargin={{mx: 4}}
            borderRadius={4}
            textProps={{
              color: 'darkBlue',
              textStyle: 'h2',
              text: 'Click to Expand',
            }}
            onPress={() => false}>
            <Flex bg="pink" p={4}>
              <TouchableOpacity onPress={() => setPreview(true)}>
                <Typography>agree on the terms</Typography>
              </TouchableOpacity>
            </Flex>
          </ExpandableItem>
        </Flex>

        <Flex mt={10} mb={40}>
          <Tabs items={['One', 'Two']} activeTab={currentTab} onSelect={(tab) => setCurrentTab(tab)} underline={true} />

          <TabsPages active={currentTab}>
            <Box m="1">
              <Typography textStyle="body" color="darkBlue">
                One
              </Typography>
            </Box>
            <Box m="1">
              <Typography textStyle="body" color="darkBlue">
                Two
              </Typography>
            </Box>
          </TabsPages>
        </Flex>

        <Box position="absolute" bottom={0}>
          <Flex>
            <Flex mt={10} width={40} height={2}>
              <Line size="lg" colorOverride="red" />
            </Flex>

            <SpinnerOverlay
              bg="red"
              color="white"
              borderTopLeftRadius="4px"
              borderTopRightRadius="4px"
              width={200}
              height={100}
              loadingText="welcome"
            />
          </Flex>
        </Box>
      </Flex>
    </ScrollView>
  );
};

export {HomeView};

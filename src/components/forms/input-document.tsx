import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Easing, Linking, Platform, TouchableOpacity, View} from 'react-native';

import styled from 'styled-components/native';

import {theme} from '@styles';

import {Box} from '../box';
import {Flex} from '../flex';
import {Icon} from '../icon';
import {useToastContext} from '../toast/toast-context';
import {Typography} from '../typography';

const ShadowBox = styled(Box)`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

function DocumentPreviewDoc({
  animate,
  uri,
  type,
  fileName,
  remove,
}: {
  fileName?: string | null;
  uri?: string;
  type?: string | null;
  animate?: boolean;
  remove?: () => void;
  disableRemove?: boolean;
}) {
  const [height] = useState(new Animated.Value(0));

  const displayHeight = 40;
  const displayWidth = 165;

  const animateIn = useCallback(() => {
    if (!animate) return;

    Animated.timing(height, {
      toValue: 1,
      duration: 600,
      easing: Easing.elastic(1.2),
      useNativeDriver: false,
    }).start();
  }, [animate, height]);

  const _animateOut = useCallback(() => {
    if (!animate) return;

    Animated.timing(height, {
      toValue: 0,
      duration: 600,
      easing: Easing.elastic(1.2),
      useNativeDriver: false,
    }).start(() => {
      if (remove) remove();
    });
  }, [animate, height, remove]);

  const extraDimensions = type === 'Parent' ? theme.space[2] : theme.space[0];

  useEffect(() => {
    if (animate) animateIn();
  }, [animate, animateIn]);

  const styles = {
    width: displayWidth + (!animate && fileName ? 15 : 0),
    height: displayHeight + (!animate && fileName ? 5 : 0),
    margin: extraDimensions,
  };

  return (
    <>
      {animate && (
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 1,
            maxHeight: height.interpolate({
              inputRange: [0, 1],
              outputRange: [0, displayHeight + 2 * extraDimensions],
              extrapolate: 'clamp',
            }),
            opacity: height.interpolate({
              inputRange: [0.5, 1],
              outputRange: [0, 1],
            }),
          }}>
          <View style={styles}>
            {remove && <Icon name="cross" />}
            <Preview uri={uri} disableOnpress fileName={fileName} />
          </View>
        </Animated.View>
      )}
    </>
  );
}

function Preview(props: {fileName?: string | null; uri?: string; disableOnpress?: boolean}) {
  const {showErrorToast} = useToastContext();

  const onPressOpenLink = async (link?: string) => {
    if (props.disableOnpress || !link) return;

    const url = Platform.OS === 'android' ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${link}` : link;

    if (Platform.OS === 'web') {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
      return;
    }

    const canOpenInBroswer = await Linking.canOpenURL(url);
    if (canOpenInBroswer) await Linking.openURL(url);
    if (!canOpenInBroswer) showErrorToast({message: 'Unable to open this file.'});
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await onPressOpenLink(props.uri);
      }}
      style={{height: '100%', width: '100%'}}>
      <ShadowBox
        borderRadius="md"
        justifyContent="center"
        height="100%"
        width="100%"
        bg="white"
        backgroundColor="lightGrey1">
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          backgroundColor="lightGrey1"
          pl="3"
          pr="3">
          {props.fileName && (
            <>
              <Icon name="file" color="blueLightened" />

              <Typography
                color="blue"
                textStyle="small"
                numberOfLines={1}
                textAlign="center"
                onPress={() => onPressOpenLink(props.uri)}>
                {props.fileName}
              </Typography>
            </>
          )}
        </Flex>
      </ShadowBox>
    </TouchableOpacity>
  );
}

export {DocumentPreviewDoc, Preview};

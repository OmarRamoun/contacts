/* eslint-disable indent */
import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import type {LayoutChangeEvent} from 'react-native';
import {View, Dimensions, Keyboard, Platform} from 'react-native';

import styled from 'styled-components/native';
import type {PaddingProps, MarginProps} from 'styled-system';
import {padding} from 'styled-system';

import {useBackButton} from '@hooks';
import type {theme} from '@styles';

import {Button} from '../button/button';
import type {ButtonProps} from '../button/button-shared';
import type {FlexProps} from '../flex';
import {Flex} from '../flex';

import {ActionSheetContext} from './action-sheet-context';

export interface ActionSheetItems extends Omit<ButtonProps, 'children'> {
  label: string;
}

export enum ActionSheetPosition {
  Left,
  Right,
  Center,
}

interface ActionSheetProps extends FlexProps {
  items?: ActionSheetItems[];
  customContent?: React.ReactNode;
  children?: React.ReactNode;
  position?: ActionSheetPosition;
  side?: ActionSheetPosition;
  visible?: boolean;
  sheetWidth?: number | string;
  onClose?: () => void;
  disabled?: boolean;
  overrideMargin?: {[key in keyof MarginProps]: number};
  overridePadding?: {[key in keyof PaddingProps]: number};
  overrideBorderRadius?: keyof typeof theme.radii;
  overrideBackdropColor?: string;
}

const StyledActionSheetContainer = styled(Flex)<
  MarginProps & PaddingProps & Pick<ActionSheetProps, 'overrideBorderRadius'>
>`
  box-shadow: 0px 2px 4px ${(props) => props.theme.colors.boxShadow};
  border-radius: ${(props) => props.theme.radii[props.overrideBorderRadius ?? 'md']}px;
  padding: ${(props) => props.theme.space[2]}px ${(props) => props.theme.space[4]}px;
  background-color: ${(props) => props.theme.colors.white};
  ${padding}
`;

const getPosition = (args: {
  x: number;
  y: number;
  width: number;
  height: number;
  sheetPosition: ActionSheetPosition;
  sheetSide: ActionSheetPosition;
  sheetWidth: number;
  sheetHeight: number;
  screenHeight: number;
  isKeyboardActive: boolean;
}) => {
  const {x, y, height, sheetHeight, screenHeight} = args;

  const condition = args.isKeyboardActive
    ? y + height + sheetHeight < screenHeight
    : y + height + sheetHeight > screenHeight;

  if (args.sheetSide === ActionSheetPosition.Right) {
    return {
      x: x + args.width,
      y: condition ? y + height / 2 - sheetHeight : height,
    };
  }
  // prettier-ignore
  return {
      x: (() => {
        if (args.sheetPosition === ActionSheetPosition.Left) return x;
        if (args.sheetPosition === ActionSheetPosition.Right) return (x + args.width - args.sheetWidth);
        return (x + (args.width - args.sheetWidth) / 2);
      })(),
      y: condition ? y - sheetHeight : y + height,
    };
};

const convertWidth = (width: string | number, containerWidth: number) => {
  if (typeof width === 'number') return width;

  if (width.charAt(width.length - 1) === '%') {
    const perc = parseInt(width, 10) / 100;
    return perc * containerWidth;
  }

  return 100;
};

const ActionSheet = ({
  items,
  disabled,
  customContent,
  children,
  position: sheetPosition = ActionSheetPosition.Left,
  side: sheetSide = ActionSheetPosition.Center,
  visible,
  sheetWidth = 200,
  onClose,
  overrideMargin,
  overridePadding,
  overrideBorderRadius,
  overrideBackdropColor,
  ...props
}: ActionSheetProps) => {
  const sheetRef = useRef<View>(null);
  const actionSheetId = useRef<number>(-1);
  const {showElement, closeElement, isVisible, allocateId} = useContext(ActionSheetContext);
  const [actionSheetHeight, setActionSheetHeight] = useState<number>(0);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const onActionSheetLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      if (actionSheetHeight !== evt.nativeEvent.layout.height) {
        setActionSheetHeight(evt.nativeEvent.layout.height);
      }
    },
    [setActionSheetHeight, actionSheetHeight],
  );

  useBackButton(() => {
    if (visible) {
      onClose?.();
      return true;
    }

    return false;
  });

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardDidShow', () => setShowKeyboard(true)),
      Keyboard.addListener('keyboardDidHide', () => setShowKeyboard(false)),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  useEffect(() => {
    if (disabled) return;

    if (visible) {
      if (actionSheetId.current < 0) actionSheetId.current = allocateId();
      if (!sheetRef || !sheetRef.current) return;

      sheetRef.current.measure((_x, _y, width, height, px, py) => {
        // eslint-disable-line, prettier/prettier
        const actualWidth = convertWidth(sheetWidth, width);

        const Element = (
          <StyledActionSheetContainer
            width={`${actualWidth}px`}
            {...overridePadding}
            {...overrideMargin}
            overrideBorderRadius={overrideBorderRadius}
            onLayout={onActionSheetLayout}
            style={{
              ...Platform.select({
                ios: {
                  shadowColor: 'rgba(0, 0, 0, 1)',
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  shadowOffset: {
                    height: 5,
                    width: 5,
                  },
                },
                android: {
                  elevation: 5,
                },
              }),
            }}>
            {items
              ? items.map((item) => (
                  <Button type={item.type || 'tertiary'} {...item} align="space-between" key={item.label}>
                    {item.label}
                  </Button>
                ))
              : null}

            {customContent && !items ? customContent : null}
          </StyledActionSheetContainer>
        );

        showElement({
          id: actionSheetId.current,
          el: Element,
          overrideBackdropColor,
          position: getPosition({
            x: px,
            y: py,
            width,
            height,
            sheetPosition,
            sheetSide,
            sheetWidth: actualWidth,
            sheetHeight: actionSheetHeight,
            screenHeight: Dimensions.get('window').height,
            isKeyboardActive: showKeyboard,
          }),
          onClose,
        });
      });
    } else if (isVisible(actionSheetId.current)) {
      closeElement(actionSheetId.current);
    }
  }, [visible, actionSheetId, customContent, actionSheetHeight]);

  useEffect(() => () => closeElement(actionSheetId.current), []);

  return (
    <View ref={sheetRef} {...props} collapsable={false}>
      {children || null}
    </View>
  );
};

export {ActionSheet};

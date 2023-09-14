import {TextInput} from 'react-native';

import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import {textStyle as StyledSystemTextStyle} from 'styled-system';

import {theme} from '@styles';

import {Flex} from '../flex';
import type {TagObject} from '../tag';

import type {StyledInputContainerProps} from './input-shared';

export const getInputColor = (
  error: boolean,
  focused: boolean,
  disabled: boolean,
  fallback: keyof DefaultTheme['colors'] = 'grey',
  // TODO: refactor this function to accept args as object
): keyof DefaultTheme['colors'] => {
  // eslint-disable-line max-params, prettier/prettier
  if (error && !disabled) return 'red';
  if (focused && !disabled) return theme.primaryColor.alt;
  return fallback;
};

export const StyledInputContainer = styled(Flex)<StyledInputContainerProps>`
  flex-direction: row;
  align-items: ${(props) => props.alignItems || 'center'};
  min-height: ${(props) => props.theme.sizes.inputHeight}px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors[getInputColor(!!props.error, !!props.focused, !!props.disabled)]};
  border-radius: ${(props) => props.theme.radii.lg}px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const StyledTextInput = styled(TextInput)<{
  textStyle?: keyof DefaultTheme['textStyles'];
  rightSlot?: boolean;
}>`
  color: ${(props) => props.theme.colors.black};
  padding: ${(props) => props.theme.input.verticalPadding}px
    ${(props) => (props.rightSlot ? '55' : props.theme.input.horizontalPadding)}px
    ${(props) => props.theme.input.verticalPadding}px ${(props) => props.theme.input.horizontalPadding}px;
  box-shadow: none;
  flex-grow: 1;
  ${StyledSystemTextStyle}
`;

export function getInitialSelectValue<T>(value: T, multiple?: boolean) {
  if (typeof value !== 'undefined') return value;
  return multiple ? [] : undefined;
}

export const processIdToTag = (item: any, index: number): TagObject => ({
  id: typeof item === 'object' ? item.id || index : index,
  label: typeof item === 'object' ? item.name || item.title || '' : '',
  avatarImage: typeof item === 'object' ? item.image || '' : undefined,
});

export const processTagToId = (tag: TagObject): number | string => tag.id;

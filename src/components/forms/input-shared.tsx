import type React from 'react';

import type {DefaultTheme} from 'styled-components/native';

import type {FieldInputProps, FieldMetaProps, FieldHelperProps} from '@lib';

import type {FlexProps} from '../flex';
import type {TagObject} from '../tag';

export interface InputSharedProps<Value> {
  /**
   * Adding a title will wrap the input in a label
   */
  title?: string;

  /**
   * Disabled prop should lock the input from changing
   * value and any interactions should be reset
   */
  disabled?: boolean;

  /**
   * Error should visually change the input to an error
   * state
   */
  error?: boolean;

  /**
   * message that is displayed under the input describes
   * the error with the input
   */
  errorMessage?: string;

  /**
   * Callback for the value changing
   */
  onValueChange?: (value: Value) => void;

  /**
   * Initially setting the value, but not updating
   * passed mount. Non-controlled
   */
  initialValue?: Value;

  /**
   * A controlled like aspect of the form input
   */
  value?: Value;

  /**
   * If the input captures interaction but should
   * defer to a parent, set this to true
   */
  delegateInteraction?: boolean;

  /**
   * Pass through override to the flex attributes
   * of the label
   */
  labelFlexProps?: FlexProps;

  /**
   * Override the text style passed to the label
   */
  labelTextStyle?: keyof DefaultTheme['textStyles'];

  /**
   * Whether or not the label is going to be displayed
   * on a dark background
   */
  onDarkBackground?: boolean;

  /**
   * Formik properties passed to all inputs to
   * manage their formik states
   */
  field?: FieldInputProps<Value>;
  meta?: FieldMetaProps<Value>;
  helpers?: FieldHelperProps<Value>;
}

export interface InputSharedSlotProps {
  /**
   * Method to render custom content to the left
   */
  leftSlot?: (focused: boolean, error: boolean, disabled: boolean) => React.ReactNode;

  /**
   * Method to render custom content to the right
   */
  rightSlot?: (focused: boolean, error: boolean, disabled: boolean) => React.ReactNode;
}

export interface StyledInputContainerProps {
  error: boolean;
  focused: boolean;
  disabled: boolean;
}

export type SelectOption = {
  value: string | number;
  label?: string;
};

export type SelectValue = string | number | Array<string | number> | undefined;
export type SelectOptions = SelectOption[];

export type TagFieldValue = number[];

export interface InputTagFieldSearchProps {
  /**
   * The method to fire when requesting a search
   */
  onSearch?: (search: string) => void;

  /**
   * Callback for when requesting to add a tag
   */
  onAddTag?: (tag: TagObject) => void;

  /**
   * Callback for when clicking create tag
   */
  onCreateRequest?: (tagLabel: string) => void;

  /**
   * The text to search for
   */
  searchText: string | undefined;

  /**
   * Whether a search is being made
   */
  searchLoading?: boolean;

  /**
   * Tag objects returned from a search
   */
  searchTags?: TagObject[];
}

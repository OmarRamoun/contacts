import * as React from 'react';

import {ThemeProvider as TP} from 'styled-components/native';

const units = Array(201)
  .fill(0)
  .map((_, i) => i * 5);

const space = {
  ...units,
};

const input = {
  horizontalPadding: 12,
  verticalPadding: 10,
};

const button = {
  buttonLiftHeight: 5,
  iconMargin: 4,
  buttonPaddingTertiary: 0,
  buttonPaddingSmall: 15,
  buttonPaddingMedium: 20,
  buttonPaddingLarge: 20,
};

const sizes = {
  navSubMenuHeightNew: 55,
  navSubMenuHeight: 36,
  buttonHeightSmall: 32,
  buttonHeightMedium: 40,
  buttonHeightLarge: 48,
  buttonHeightXL: 85,
  avatarSizeSmall: 30,
  avatarSizeMedium: 45,
  avatarSizeMediumLarge: 87,
  avatarSizeLarge: 98,
  avatarSizeXLarge: 139,
  avatarCardWidth: 280,
  avatarCardHeight: 110,
  centeredContentMinWidth: 600,
  centeredContentMaxWidth: 872,
  modalWidth: 450,
  modalMinHeight: 200,
  modalSmallWidth: 340,
  modalLargeWidth: 665,
  modalLargeHeight: 750,
  modalLargerWidth: 850,
  modalLargerHeight: 600,
  tableHeightItem: 85,
  tableHeightHeader: 60,
  checkboxSize: 26,
  stepDotSize: 26,
  tagCounter: 24,
  tagHeight: 26,
  tagHeightMedium: 32,
  tagHeightLarge: 40,
  tagFieldHeight: 54,
  tagFieldMaxHeight: 85,
  toastWidth: 600,
  toggleHeight: 32,
  toggleHeightInner: 24,
  toggleWidth: 60,
  inputHeight: 40,
  mediaInputHeight: 145,
  mediaInputContentHeight: 105,
  mediaInputNumberSize: 24,
  calendarWidth: 230,
  calendarSheetWidth: 272,
  nativeCalendarSheetWidth: 400,
  nativeCalendarSheetHeight: 220,
  timeColumnHeight: 200,
  defaultImageThumbnail: 150,
  profileWidth: 100,
  imageCarouselImageWidth: 344,
  imageCarouselImageHeight: 258,
  modalPaddingY: 50,
  modalPaddingX: 20,
  roomSelectorWidth: 300,
  messageListOverrideHeight: 37,
};

type Sizes = {[key: string]: number} & typeof sizes;

const mergedSizes: Sizes = {
  ...(units as unknown as {[key: string]: number}),
  ...sizes,
};

const radii = {
  sm: 2,
  md: 4,
  lg: 10,
  xlg: 14,
  xxlg: 18,
  toggle: sizes.toggleHeightInner / 2,
};

const colors = {
  clear: 'rgba(0, 0, 0, 0)',
  blackAlt: '#444444',
  darkBlue: '#25293F',
  darkBlueBlockedModal: '#25293FB3',
  darkBlueOpacityHalf: '#25293F80',
  darkBlueOpacity: '#25293F33',
  lightGrey1: '#F1F3F8',
  inactiveGrey: '#B4B4B4',
  neutralGrey: '#D9DDE4',
  lightGrey2: '#FAFAFA',
  shadowColor: '#171717',
  secondaryYellow: '#FFF282',
  lightBlue: '#A1E3F2',
  lightBlue1: '#A1E3F24D',
  lightBlue2: '#DEF3F9',
  greyBlue: '#83c1d0',
  blue: '#12AED2',
  blueView: '#6BD8F1',
  blueDisabled: '#B8E7F1',
  blueLightened: '#3ABCDA',
  blueDarkened: '#119dbd',
  blueDarkenedDisabled: '#B7E2EB',
  blueDeep: '#4359CE',
  blueMore: '#0E99B9',
  mint: '#6EDED180',
  lightPink: '#FAA6AB',
  red: '#E46169',
  pinkAlert: '#E4616980',
  pinkClub: '#FF9F8A',
  redDarkened: '#AD4D53',
  redLightened: '#ED757C',
  darkGrey: '#737B86',
  grey: '#D9DDE4',
  bgGrey: '#F2F2F2',
  white: '#FFFFFF',
  black: '#000000',
  transBlack: '#00000020',
  orange: '#EE8E36',
  orangeLow: '#FFDA7980',
  green: '#20B326',
  secondaryGreen: '#AFDC5C',
  greenActive: '#AFDC5C80',
  greenLightened: '#4DC151',
  greenDarkened: '#1DA022',
  purple: '#C460C6',
  nappies: '#4359CE80',
  nap: '#EBBEEC80',
  inputDisabledText: '#B4B6C1',
  none: 'rgba(0, 0, 0, 0)',
  highlighted: 'rgba(0, 0, 0, 0.3)',
  highlightedActive: 'rgba(0, 0, 0, 0.4)',
  semiOpaqueWhite: 'rgba(255, 255, 255, 0.75)',
  semiOpaqueDarkBlue: 'rgba(37, 41, 63, 0.85)',
  semiDemiOpaqueDarkBlue: 'rgba(37, 41, 63, 0.7)',
  boxShadow: 'rgba(0, 0, 0, 0.1)',
  boxShadow2: 'rgba(0, 0, 0, 0.6)',
  passThroughGrey: 'rgba(217, 221, 228, 0.2)',
  primaryDark: '#3A5E6D',
  green3: '#DFF7C2',
  lightYellow: '#FCF9E4',
  pink2: '#FFC4D2',
  pink1: '#FFA7A7',
};

const zIndex = {
  modal: 20,
  modalTop: 25,
  actionSheet: 30,
  toast: 100,
};

const commonTextStyle = {
  fontFamily: 'Asap',
};

// TODO: Look into a better way to handle line height. React native doesn't
// support dynamic values, so we have to hard-code them all.
// https://github.com/styled-components/styled-components/issues/2546

const textStyles = {
  h1: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '32px',
    lineHeight: '38px',
  },
  h2: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '29px',
  },
  h3: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '19px',
  },
  h4: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '17px',
  },
  body: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
  },
  bodyBold: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '19px',
  },
  buttonSmall: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '14px',
  },
  buttonSmallLargeHeight: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '19px',
  },
  buttonMedium: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '17px',
  },
  buttonLarge: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '19px',
  },
  small: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px',
  },
  smallBold: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '17px',
  },
  extraSmall: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '14px',
  },
  metaXS: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '12px',
  },
  filterNumber: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '14px',
  },
  sectionHeader: {
    ...commonTextStyle,
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21px',
  },
  sectionHeaderBold: {
    ...commonTextStyle,
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '21px',
  },
};

const shadow = {
  subtle: '0 2px 4px rgba(0,0,0,0.1)',
};

const primaryColor: {
  default: keyof typeof colors;
  alt: keyof typeof colors;
  dark: keyof typeof colors;
} = {
  default: 'black',
  alt: 'blackAlt',
  dark: 'darkGrey',
};

const secondaryColor: {
  default: keyof typeof colors;
  alt: keyof typeof colors;
  dark: keyof typeof colors;
} = {
  default: 'blue',
  alt: 'blueDarkened',
  dark: 'darkBlue',
};

const theme = {
  textStyles,
  space,
  sizes: mergedSizes,
  colors,
  input,
  radii,
  button,
  zIndex,
  shadow,
  primaryColor,
  secondaryColor,
};

const ThemeProvider = (props: Omit<React.ComponentProps<typeof TP>, 'theme'>) => (
  <TP theme={theme}>{props.children}</TP>
);

export {theme, ThemeProvider};

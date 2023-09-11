import React, {useCallback, useEffect} from 'react';
import {Dimensions, BackHandler} from 'react-native';

import {theme} from '@styles';

import {Flex} from '../flex';
import type {FlexProps} from '../flex';

import type {ModalProps} from './modal';
import {Modal} from './modal';

interface StandardModalProps extends ModalProps {
  fullWidth?: boolean;
  contentProps?: FlexProps;
}

const getFullWidth = () => Dimensions.get('screen').width - theme.sizes.modalPaddingX * 2;

const StandardModal = ({
  children,
  fullWidth,
  contentProps = {},
  centerVertically = true,
  onClose,
  show,
  ...props
}: StandardModalProps) => {
  const handleBackButtonClick = useCallback(() => {
    if (show && onClose) {
      onClose();

      return true;
    }

    return false;
  }, [onClose, show]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [handleBackButtonClick]);

  return (
    <Modal onClose={onClose} show={show} centerVertically={centerVertically} {...props}>
      <Flex flexGrow={1} justifyContent="center">
        <Flex width={fullWidth ? getFullWidth() : undefined} maxWidth="parentModalMaxWidth" {...contentProps}>
          {children}
        </Flex>
      </Flex>
    </Modal>
  );
};

export {StandardModal};

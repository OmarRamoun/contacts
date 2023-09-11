import * as React from 'react';

import type {DefaultTheme} from 'styled-components/native';

import {Modal} from './modal';
import type {ModalContentProps} from './modal-content';
import {ModalContent} from './modal-content';

interface StandardModalProps extends ModalContentProps {
  show: boolean;
  onClose?: () => void;
  backdropCanClose?: boolean;
  centerVertically?: boolean;
  heading: string;
  customBackgroundColor?: keyof DefaultTheme['colors'];
  children: React.ReactElement;
}

const StandardModal = ({
  show,
  onClose,
  backdropCanClose,
  customBackgroundColor,
  centerVertically,
  children,
  ...props
}: StandardModalProps) => (
  <Modal
    customBackgroundColor={customBackgroundColor}
    backdropCanClose={backdropCanClose}
    show={show}
    centerVertically={centerVertically}
    onClose={onClose}>
    <ModalContent {...props} onClose={onClose}>
      {children}
    </ModalContent>
  </Modal>
);

export {StandardModal};

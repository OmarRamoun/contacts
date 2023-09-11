import * as React from 'react';

import type {DefaultTheme} from 'styled-components/native';

import {Modal} from './modal';
import type {ModalContentProps} from './modal-content';
import {ModalContent} from './modal-content';

interface FullModalProps extends ModalContentProps {
  show: boolean;
  onClose?: () => void;
  backdropCanClose?: boolean;
  centerVertically?: boolean;
  heading: string;
  customBackgroundColor?: keyof DefaultTheme['colors'];
  children: React.ReactElement;
}

const FullModal = ({
  show,
  onClose,
  backdropCanClose,
  customBackgroundColor,
  centerVertically,
  children,
  ...props
}: FullModalProps) => (
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

export {FullModal};
